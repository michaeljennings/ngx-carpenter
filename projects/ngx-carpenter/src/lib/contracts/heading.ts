export interface Heading {
    label: string;
    property: string;
    unsortable?: boolean;
    presenter?: (value) => any;
}