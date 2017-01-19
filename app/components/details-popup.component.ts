import {Component} from '@angular/core';

import {PopupService, BasePopup} from '../services/popup.service';
import {PluginConfig} from "../services/plugin.config";
import {InventoryArticle} from "../models/inventory-article";

export class DetailsPopup extends BasePopup {
    constructor(
        public visible: boolean = true,
        public article: InventoryArticle
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
    currentImageIndex: number = 0;

    constructor(
        private config: PluginConfig,
        private popupService: PopupService
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
    }

    // Call from template
    private isShowImages() {
        return this.popup.article.images_urls.length > 0;
    }

    // Call from template
    private isShowLotImages() {
        return this.popup.article.images_urls.length > 1;
    }

    // Call from template
    private getImageUrl(i: number): string {
        return this.popup.article.images_urls.length > i ? this.popup.article.images_urls[i] : '';
    }

    // Call from template
    private getCurrentImageUrl(): string {
        let haveThisIndex = this.popup.article.images_urls.length > this.currentImageIndex;
        return  haveThisIndex ? this.popup.article.images_urls[this.currentImageIndex] : '';
    }

    // Call from template
    private onImageClick(i: number) {
        let haveThisIndex = this.popup.article.images_urls.length > i;
        this.currentImageIndex = i;
    }
}
