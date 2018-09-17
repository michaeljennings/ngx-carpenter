import { Component } from '@angular/core';
import { Heading } from 'ngx-carpenter/lib/contracts/heading';
import { Action } from 'ngx-carpenter/lib/contracts/action';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ngx-carpenter-app';
    headings: Heading[] = [
        {
            label: 'Name',
            property: 'name'
        },
        {
            label: 'Description',
            property: 'description'
        },
    ];
    rows = [
        {
            name: 'New Product',
            description: 'Awesome product description'
        },
        {
            name: 'Other Product',
            description: 'Another awesome product description'
        },
    ];
    actions: Action[] = [
        {
            label: 'Options',
            class: 'btn-primary btn-xs',
            group: [
                {
                    label: 'Edit',
                    callback: (row) => {
                        alert(`Edit "${row.name}"`);
                    }
                }
            ]
        },
        {
            label: "Archive",
            class: 'btn btn-xs btn-danger',
            callback: (row) => {
                alert(`Archived "${row.name}"`);
            }
        }
    ]
}
