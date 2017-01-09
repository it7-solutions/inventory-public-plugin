import {Component, Output} from '@angular/core';
import {PluginConfig} from "../services/plugin.config";
import {ListOf} from "../models/list-of";
import {FilterListOf, Filter} from "../models/filter-list-of";
import {SortListOf} from '../models/sort-list-of';
import {It7ErrorService} from "../services/it7-error.service";
import {DataManagerService} from "../services/data-manager.service";

@Component({
    selector: 'inventory-public-plugin',
    templateUrl: PluginConfig.buildTemplateUrl('templates/plugin.html')
})
export class PluginComponent {

    private wishesTabVisible: boolean = false;
    private ordersTabVisible: boolean = false;

    constructor(
        config: PluginConfig,
        private err: It7ErrorService,
        private dm: DataManagerService
    ) {
        dm.updateData();
        this.showWishesTab();
    }

    // -- Template events

    public onWishesClick() {
        this.showWishesTab();
    }

    public onOrdersClick() {
        this.showOrdersTab();
    }

    private showWishesTab() {
        this.wishesTabVisible = true;
        this.ordersTabVisible = false;
    }

    private showOrdersTab() {
        this.wishesTabVisible = false;
        this.ordersTabVisible = true;
    }
}
