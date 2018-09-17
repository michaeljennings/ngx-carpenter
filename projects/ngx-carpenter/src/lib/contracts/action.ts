export interface Action {
    class: string | string[];
    label: string;
    icon?: string;
    routerLink?: (row) => string;
    callback?: (row) => any;
}