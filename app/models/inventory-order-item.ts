export class inventoryOrderItem {
    id: string = '';

    article_id: string = '';
    order_id: string = '';
    quantity: number = 0;

    constructor(srcData: inventoryOrderItem) {
        Object.assign(this, srcData);
        this.id = '' + this.id;
        this.article_id = '' + this.article_id;
        this.order_id = '' + this.order_id;
    }
}