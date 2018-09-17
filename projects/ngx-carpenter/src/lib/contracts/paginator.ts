import { Link } from './link';

export interface Paginator<T = Object> {
    getData(): T[];
    links(baseHref: string): Link[];
}