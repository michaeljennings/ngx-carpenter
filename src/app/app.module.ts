import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxCarpenterModule } from 'ngx-carpenter';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        NgxCarpenterModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
