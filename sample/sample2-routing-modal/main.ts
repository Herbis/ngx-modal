import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {ROUTER_DIRECTIVES, RouterModule} from "@angular/router";
import {SimpleRouterModal} from "./SimpleRouterModal";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {Component, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HomeComponent} from "./HomeComponent";
import {NoCloseButtonModal} from "./NoCloseButtonModal";
import {NoSimpleCloseModal} from "./NoSimpleCloseModal";

@Component({
    selector: "app",
    template: `
<div class="container">

    <a [routerLink]="['simple-modal']">simple route modal</a><br/>
    <a [routerLink]="['no-close-button-modal']">modal without close button</a><br/>
    <a [routerLink]="['no-simple-close-modal']">modal that cannot be simply closed</a><br/>

    <router-outlet></router-outlet>
</div>
`,
    directives: [ROUTER_DIRECTIVES]
})
export class Sample2App {

}

@NgModule({

    imports: [
        BrowserModule,
        RouterModule.forRoot([
            { path: "", component: HomeComponent },
            { path: "simple-modal", component: SimpleRouterModal },
            { path: "no-close-button-modal", component: NoCloseButtonModal },
            { path: "no-simple-close-modal", component: NoSimpleCloseModal },
        ])
    ],
    declarations: [
        Sample2App,
        HomeComponent,
        SimpleRouterModal,
        NoCloseButtonModal,
        NoSimpleCloseModal
    ],
    bootstrap: [
        Sample2App
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
    ]
})
export class Sample2Module {

}

platformBrowserDynamic().bootstrapModule(Sample2Module);