import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarpenterComponent } from './carpenter/carpenter.component';
import { CarpenterCellComponent } from './carpenter-cell/carpenter-cell.component';
import { CarpenterActionComponent } from './carpenter-action/carpenter-action.component';
import { PathStorageService } from './services/path-storage.service';
import { SessionStorageService } from './services/session-storage.service';
import { CarpenterPaginationControlsComponent } from './carpenter-pagination-controls/carpenter-pagination-controls.component';
import { CarpenterPreloaderComponent } from './carpenter-preloader/carpenter-preloader.component';
import { BsDropdownModule } from 'ngx-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        BsDropdownModule.forRoot(),
    ],
    declarations: [
        CarpenterComponent,
        CarpenterCellComponent,
        CarpenterActionComponent,
        CarpenterPaginationControlsComponent,
        CarpenterPreloaderComponent
    ],
    providers: [
        PathStorageService,
        SessionStorageService,
    ],
    exports: [
        CarpenterComponent,
        CarpenterCellComponent,
        CarpenterActionComponent,
    ]
})
export class NgxCarpenterModule {

}