import { Paginator as PaginatorContract } from 'ngx-carpenter/lib/contracts/paginator';
import { Link } from 'ngx-carpenter/lib/contracts/link';

export class Paginator<T = object> implements PaginatorContract {
    constructor(private paginationData: any) {}

    public getData(): T[] {
        return this.paginationData.data;
    }

    /**
     * Create the pagination links.
     *
     * @param {string} baseUrl
     * @returns {Array}
     */
    public links(baseUrl: string): Link[] {
        const from = 1;
        const to = this.paginationData.last_page;
        const current = this.paginationData.current_page;
        const range = this.range(from, to);
        const links: Link[] = [];
        let i: number;
        baseUrl = baseUrl || '';

        if (range.length > 6) {
            if (current < from + 4) {
                for (i = from; i < from + 5; i++) {
                    links.push(this.createLink(baseUrl, i, current == i));
                }

                links.push(this.createLink(false, '...', false));

                for (i = to - 1; i <= to; i++) {
                    links.push(this.createLink(baseUrl, i, current == i));
                }
            } else if (current > to - 4) {
                for (i = from; i < from + 2; i++) {
                    links.push(this.createLink(baseUrl, i, current == i));
                }

                links.push(this.createLink(false, '...', false));

                for (i = to - 4; i <= to; i++) {
                    links.push(this.createLink(baseUrl, i, current == i));
                }
            } else {
                links.push(this.createLink(baseUrl, from, false));
                links.push(this.createLink(false, '...', false));

                for (i = current - 2; i <= current + 2; i++) {
                    links.push(this.createLink(baseUrl, i, current == i));
                }

                links.push(this.createLink(false, '...', false));
                links.push(this.createLink(baseUrl, to, false));
            }
        } else {
            range.forEach((page) => {
                links.push(this.createLink(baseUrl, page, current == page));
            });
        }

        return links;
    }

    /**
     * @param {string | false} link
     * @param {number | string} page
     * @param {boolean} active
     * @returns {Link}
     */
    protected createLink (link: string|false, page: number|string, active: boolean): Link {
        const routerLink = typeof link === 'string'
            ? { link, extras: { queryParams: { page } } }
            : false;

        return { routerLink, active, page };
    }

    /**
     * @param {number} from
     * @param {number} to
     * @returns {Array}
     */
    protected range = function(from: number, to: number) {
        const range: Array<number> = [];
        let i: number;

        for (i = from; i <= to; i++) {
            range.push(i);
        }

        return range;
    };
}