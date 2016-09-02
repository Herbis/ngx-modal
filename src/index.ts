import {Modal} from "./Modal";
import {RouteModal} from "./RouteModal";
import {CommonModule} from "@angular/common";
import {NgModule, Component} from "@angular/core";

export * from "./Modal";
export * from "./RouteModal";

@Component({
    selector: "modal-header",
    template: `<ng-content></ng-content>`
})
export class ModalHeader {

}

@Component({
    selector: "modal-content",
    template: `<ng-content></ng-content>`
})
export class ModalContent {

}

@Component({
    selector: "modal-footer",
    template: `<ng-content></ng-content>`
})
export class ModalFooter {

}

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        Modal,
        RouteModal,
        ModalHeader,
        ModalContent,
        ModalFooter,
    ],
    exports: [
        Modal,
        RouteModal,
        ModalHeader,
        ModalContent,
        ModalFooter,
    ],
})
export class ModalModule {

}