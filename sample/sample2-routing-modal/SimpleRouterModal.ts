import {Component} from "@angular/core";
import {RouteModal} from "../../src/RouteModal";
import {ROUTER_DIRECTIVES} from "@angular/router";

@Component({
    selector: "simple-router-modal",
    template: `
<route-modal [cancelUrl]="['../']">
    <modal-header>
        <h1>I am first modal</h1>
    </modal-header>
    <modal-content>
        This modal has its own header, content and footer.
    </modal-content>
    <modal-footer>
        <button class="btn btn-primary" [routerLink]="['../']">okay!</button>
    </modal-footer>
</route-modal>
`,
    directives: [
        RouteModal,
        ROUTER_DIRECTIVES
    ]
})
export class SimpleRouterModal {

}
