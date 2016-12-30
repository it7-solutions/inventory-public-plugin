import {InventoryArticle} from "./inventory-article";
export class InventoryOrderItem {
    id: string = '';

    article_id: string = '';
    order_id: string = '';
    quantity: number = 0;

    _article: InventoryArticle;

    constructor(srcData: InventoryOrderItem) {
        Object.assign(this, srcData);
        this.id = '' + this.id;
        this.article_id = '' + this.article_id;
        this.order_id = '' + this.order_id;
    }

    public getCost(): number {
        return this._article ? (this.quantity * this._article.price) : 0;
    }
}