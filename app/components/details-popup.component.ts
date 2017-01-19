import {
    Component, EventEmitter, Input, OnInit, OnDestroy, Output, ViewChild, ElementRef,
    Renderer
} from '@angular/core';

import {PopupService, BasePopup} from '../services/popup.service';
import {PluginConfig} from "../services/plugin.config";

export class DetailsPopup extends BasePopup {
    constructor(
        public visible: boolean = true,
        public details: string,
        public x: number,
        public y: number
    ) {
        super('DetailsPopup');
    }
}

@Component({
    selector: 'details-popup',
    templateUrl: PluginConfig.buildTemplateUrl('/templates/details-popup.html')
})
export class DetailsPopupComponent {
    popup: DetailsPopup;
    styleLeft: string;
    styleTop: string;
    overlayWidth: string;
    overlayHeight: string;
    window: any;

    constructor(private popupService: PopupService//,
                //private window: Window
    ) {
        this.window = window;
        this.popupService.popup.subscribe(popup => this.checkPopup(popup));
    }

    // Call from template
    private onCloseClick() {
        this.hidePopup(this.popup);
    }

    private checkPopup(popup: BasePopup) {
        if (popup instanceof DetailsPopup) {
            if (popup.visible) {
                this.showPopup(popup as DetailsPopup);
            } else {
                this.hidePopup(popup as DetailsPopup);
            }
        }
    }

    private showPopup(popup: DetailsPopup) {
        this.popup = popup;
        this.setOverlay();
        this.centerPopup();
    }

    private hidePopup(popup: DetailsPopup) {
        this.popup = undefined;
    }

    private setOverlay() {
        this.overlayHeight = this.window.innerHeight + "px";
        this.overlayWidth = this.window.innerWidth + "px";
    }

    private centerPopup() {
        this.styleTop = (this.window.innerHeight - 290) / 2 + "px";
        this.styleLeft = (this.window.innerWidth - 554) / 2 + "px";
        // this.styleTop = this.popup.y + "px";
        // this.styleLeft = this.popup.x + "px";
    }
}
