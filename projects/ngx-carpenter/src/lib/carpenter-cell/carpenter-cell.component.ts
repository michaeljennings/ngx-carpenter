import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'ngx-carpenter-cell',
  templateUrl: './carpenter-cell.component.html',
  styleUrls: ['./carpenter-cell.component.css']
})
export class CarpenterCellComponent implements OnChanges {
    /**
     * The row to load the cell value from.
     */
    @Input() public row: any;

    /**
     * The key to load from the row.
     */
    @Input() public field: string;

    /**
     * Occasionally you will want to style the contents of a column. Here
     * you can set a closure to be run on the row so you can manually
     * decide how to render the cell's value.
     */
    @Input() public presenter: (value) => any = null;

    /**
     * The cached value of the cell.
     */
    public value: any;

    ngOnChanges(changes: SimpleChanges): void {
        if (this.row && this.field) {
            // If the field contains a . then the user is trying to render
            // a nested property.
            if (this.field.includes('.')) {
                this.value = this.field.split('.').reduce((object, key) => {
                    return object[key];
                }, this.row);
            } else {
                this.value = this.row[this.field];
            }
        }
    }
}
