import {Component} from "@angular/core";

@Component({
    selector: "no-close-button-modal",
    template: `
<route-modal [cancelUrl]="['/']" [hideCloseButton]="true">
    <modal-header>
        <h1>I am first modal</h1>
    </modal-header>
    <modal-content>
        This modal has its own header, content and footer.
    </modal-content>
    <modal-footer>
        <button class="btn btn-primary" [routerLink]="['/']">okay!</button>
    </modal-footer>
</route-modal>
`
})
export class NoCloseButtonModal {

}
