import {NavigationExtras} from '@angular/router';

export class PaginationLink {
    /**
     * The router link to redirect to.
     */
    public link: string;

    /**
     * Any additional navigation parameters.
     */
    public extras: NavigationExtras;
}
