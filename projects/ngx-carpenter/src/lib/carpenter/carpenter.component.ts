import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Heading } from '../contracts/heading';
import { Action } from '../contracts/action';
import { Paginator } from '../contracts/paginator';
import { PathStorageService } from '../services/path-storage.service';
import { copy } from '../helpers/objects';

@Component({
    selector: 'ngx-carpenter',
    templateUrl: './carpenter.component.html',
    styleUrls: ['./carpenter.component.css']
})
export class CarpenterComponent implements OnInit, DoCheck {
    /**
     * The headings for each column in the table.
     */
    @Input() public headings: Heading[] = [];

    /**
     * The rows to be displayed in the table.
     */
    @Input() public rows: any[];

    /**
     * A paginated list of items to display in the table.
     */
    @Input() public paginator: Paginator;

    /**
     * The actions to be rendered for each row.
     */
    @Input() public actions: Action[] = [];

    /**
     * A flag indicating that the data is being loaded.
     */
    @Input() public loading = false;

    /**
     * Any filters being applied to the table data.
     */
    @Input() public request: any = {};

    /**
     * The base href to apply to each link in the paginated links.
     */
    @Input() public baseHref: string;

    /**
     * Fired when a filter is changed or the page changes so the user can
     * reload rows.
     */
    @Output() public fetchRows = new EventEmitter<any>();

    /**
     * Fired when the request changes.
     */
    @Output() public requestChange = new EventEmitter<any>();

    /**
     * The cached version of the previous request so we can check if the
     * request has changed.
     */
    private previousRequest: any;

    constructor(protected pathStorage: PathStorageService, protected route: ActivatedRoute) {
    }

    public ngOnInit() {
        if ( ! this.baseHref) {
            throw Error('You must set the baseHref property.');
        }

        const request = this.pathStorage.get(this.requestKey());

        if (request) {
            this.request = request;
            this.requestChange.emit(request);
        }

        this.route.queryParams.subscribe((params) => {
            this.request.page = params['page'] || 1;

            this.fetchRows.emit(this.request);
        });
    }

    public ngDoCheck(): void {
        if (this.previousRequest) {
            const prev = JSON.stringify(this.previousRequest);
            const next = JSON.stringify(this.request);

            if (prev != next) {
                this.previousRequest = copy(this.request);
                this.cacheRequest(copy(this.request));

                setTimeout(() => {
                    this.fetchRows.emit(this.request);
                });
            }
        } else {
            this.previousRequest = copy(this.request);
        }
    }

    /**
     * Add the sort parameters to the request for the heading and then
     * first the fetch rows event.
     */
    public sortColumn(heading: Heading): void {
        if (this.request.sort && this.request.sort.column === heading.property) {
            if (this.request.sort.order == 'desc') {
                delete this.request.sort;
            } else {
                this.request.sort.order = 'desc';
            }
        } else {
            this.request.sort = {
                column: heading.property,
                order: 'asc'
            };
        }

        this.cacheRequest(copy(this.request));

        this.fetchRows.emit(this.request);
    }

    /**
     * Cache the new request object for the table.
     */
    protected cacheRequest(request): void {
        this.cache(this.requestKey(), copy(request));
    }

    /**
     * Cache an item in the path storage.
     */
    protected cache(key: string, value: any): void {
        this.pathStorage.set(key, value);
    }

    /**
     * Create the key to store the request against in the session storage.
     */
    protected requestKey(): string {
        return `${this.baseHref}-filters`;
    }
}
