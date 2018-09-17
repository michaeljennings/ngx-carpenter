import { PaginationLink } from './pagination-link';

export interface Link {
    routerLink: PaginationLink|false;
    active: boolean;
    page: string | number;
}
