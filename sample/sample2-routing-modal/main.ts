import {bootstrap} from "@angular/platform-browser-dynamic";
import {Component} from "@angular/core";
import {provideRouter, ROUTER_DIRECTIVES} from "@angular/router";
import {SimpleRouterModal} from "./SimpleRouterModal";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
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

bootstrap(Sample2App, [
    provideRouter([
        { path: "", component: HomeComponent },
        { path: "simple-modal", component: SimpleRouterModal },
        { path: "no-close-button-modal", component: NoCloseButtonModal },
        { path: "no-simple-close-modal", component: NoSimpleCloseModal },
    ]),
    { provide: LocationStrategy, useClass: HashLocationStrategy },
]).catch(err => console.error(err));