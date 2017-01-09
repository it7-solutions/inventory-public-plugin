import {Component, Output} from '@angular/core';
import {PluginConfig} from "../services/plugin.config";
import {ListOf} from "../models/list-of";
import {FilterListOf, Filter} from "../models/filter-list-of";
import {SortListOf} from '../models/sort-list-of';
import {It7ErrorService} from "../services/it7-error.service";
import {InventoryOrdersService} from "../services/inventory-orders.service";
import {InventoryOrder} from "../models/inventory-order";

@Component({
    selector: 'orders',
    templateUrl: PluginConfig.buildTemplateUrl('templates/orders.html')
})
export class OrdersComponent {
    private orderList: ListOf;

    constructor(
        private config: PluginConfig,
        private err: It7ErrorService,
        private orders: InventoryOrdersService
    ) {
        this.orderList = new ListOf();
    }

    ngOnInit() {
        this.orders.onUpdate.subscribe(sessions => this.onArticlesUpdate(sessions));
        this.onArticlesUpdate(this.orders.list);
    }

    private onArticlesUpdate(list: InventoryOrder[]) {
        this.orderList.update(list);
    }

    // Call from template
    public formatPrice(price: number): string {
        return ""+(price/100);
    }
}
