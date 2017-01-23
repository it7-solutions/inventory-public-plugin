import {Injectable} from "@angular/core";
import 'rxjs/add/operator/toPromise';

import {PluginConfig} from './plugin.config';
import {It7ErrorService} from "./it7-error.service";
import {It7AjaxService} from './it7-ajax.service'
import {PopupService} from "./popup.service";
import {BusyPopup} from "../components/busy-popup.component";
import {InventoryArticlesService} from "./inventory-articles.service";
import {InventoryWishesService} from "./inventory-wishes.service";
import {InventoryOrdersService} from "./inventory-orders.service";
import {InventoryOrderItemsService} from "./inventory-order-irems.service";
import {InventoryOrderItem} from "../models/inventory-order-item";
import {InventoryOrder} from "../models/inventory-order";


@Injectable()
export class DataManagerService {
    public wishes_total_formatted: string = '';
    private popup: BusyPopup;

    constructor(
        private config: PluginConfig,
        private err: It7ErrorService,
        private it7Ajax: It7AjaxService,
        private popupService: PopupService,
        private articles: InventoryArticlesService,
        private wishes: InventoryWishesService,
        private orders: InventoryOrdersService,
        private orderItems: InventoryOrderItemsService
    ){
        // Init Articles from config
        this.articles.update(this.config.articles);

        // Create MyAgenda from sessions
        //this.myAgenda.updateFromSessions(this.agendaSessions.sessions);
    }


    updateData() {
        this.showLoading();
        let data = JSON.stringify({});
        return this.it7Ajax
            .post(this.config.getDataUrl, {data})
            .then(
                res => {
                    this.hideLoading();
                    this.checkAndUpdateList(res);
                    return res;
                }
            )
    }

    changeWish(data: Object) {
        this.showLoading();
        data = JSON.stringify(data);
        return this.it7Ajax
            .post(this.config.changeWishUrl, {data})
            .then(
                res => {
                    this.hideLoading();
                    this.checkAndUpdateList(res);
                    return res;
                }
            )
    }

    // -- Private

    private checkAndUpdateList(res: any){
        console.log('checkAndUpdateList', res);
        // if(res && 'string' === typeof res.status && 'ok' !== res.status.toLowerCase()) {
        //     if(res.message){
        //         this.err.fire(res.message);
        //     } else {
        //         this.err.fire('Request to the server was not satisfied. Status ' + res.status);
        //     }
        // }
        if (res && Array.isArray(res.wishes) && Array.isArray(res.orders) && Array.isArray(res.order_items)) {
            this.wishes_total_formatted = res.wishes_total_formatted;
            this.wishes.update(res.wishes as any);
            this.orders.update(res.orders as any);
            this.orderItems.update(res.order_items as any);
            this.updateArticles();
        } else {
            this.err.fire('Parse error: Incompatible format wishes or orders.');
        }
    }

    private updateArticles() {
        // Index Articles
        // Clear isMyWish flag
        // Clear link for Wishes and OrderItems
        let articlesById = {};
        this.articles.list.forEach(a => {
            articlesById[a.id] = a;
            a._isMyWish = '';
            a._wishes = [];
            a._orderItems = [];
        });
        // Index Orders
        let ordersById = {};
        this.orders.list.forEach(o => {
            ordersById[o.id] = o;
        });


        // Insert Wish link into Articles
        // SetUp isMyWish flag (if quantity > 0)
        this.wishes.list.forEach(w => {
            let article = articlesById[w.article_id];
            if (article) {
                if(w.quantity > 0) {
                    article._isMyWish = 'yes';
                }
                article._wishes.push(w);
            } else {
                this.err.fire('Parse error: Wish #' + w.id + ' related to nonexistent Article #' + w.article_id + '.');
            }
        });

        // Insert OrderItems link into Article
        // Insert OrderItems link into Order
        this.orderItems.list.forEach(oi => {
            if(oi.isBaseOnArticle()){
                // Insert links
                // OrderItem to Article
                let article = articlesById[oi.article_id];
                if (article) {
                    // To Article
                    article._orderItems.push(oi);
                }
            }
            // Insert link
            // OrderItem to Order
            let order: InventoryOrder = ordersById[oi.order_id];
            if (order) {
                order._orderItems.push(oi);
            } else {
                this.err.fire('Parse error: OrderItem #' + oi.id + ' related to nonexistent Order #' + oi.order_id + '.');
            }
        });

        // Send signal - Articles updated
        this.articles.fireUpdate();
    }

    private showLoading(){
        this.popup = new BusyPopup();
        this.popupService.showPopup(this.popup);
    }

    private hideLoading(): any{
        if(this.popup){
            this.popup.visible = false;
            this.popupService.showPopup(this.popup);
            this.popup = undefined;
        }
    }
}

