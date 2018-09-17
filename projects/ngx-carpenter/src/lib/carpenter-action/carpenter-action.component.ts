import { Component, Input } from '@angular/core';
import { Action } from '../contracts/action';

@Component({
    selector: 'ngx-carpenter-action',
    templateUrl: './carpenter-action.component.html',
    styleUrls: ['./carpenter-action.component.css']
})
export class CarpenterActionComponent {
    /**
     * The action to render.
     */
    @Input() public action: Action;

    /**
     * The row we are rendering the action against.
     */
    @Input() public row: any;
}
