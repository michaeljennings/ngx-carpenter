export interface Action {
    label: string;
    class?: string | string[];
    icon?: string;
    routerLink?: (row) => string;
    callback?: (row) => any;
    group?: Action[];
}