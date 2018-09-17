import { Component, Input } from '@angular/core';
import { Link } from '../contracts/link';
import { Router } from '@angular/router';
import { PaginationLink } from '../contracts/pagination-link';

@Component({
    selector: 'ngx-carpenter-pagination-controls',
    templateUrl: './carpenter-pagination-controls.component.html',
    styleUrls: ['./carpenter-pagination-controls.component.css']
})
export class CarpenterPaginationControlsComponent {
    /**
     * Any classes to be applied to the pagination wrapper.
     */
    @Input() public class = '';

    /**
     * The pagination links to display.
     */
    @Input() public links: Link[] = [];

    constructor(private router: Router) {
    }

    /**
     * Change the current page.
     */
    public changePage(link: PaginationLink) {
        link.extras.fragment = 'top';

        this.router.navigate([link.link], link.extras);
    }
}
