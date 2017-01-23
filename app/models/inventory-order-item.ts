import {InventoryArticle} from "./inventory-article";
export class InventoryOrderItem {
    id: string = '';

    type: string = 'article'; // 'article' | 'custom'
    article_id: string = '';
    article_name: string = '';
    order_id: string = '';
    quantity: number = 0;
    price: number = 0;
    price_formatted: string = '';
    total: number = 0;
    total_formatted: string = '';

    _article: InventoryArticle;

    constructor(srcData: InventoryOrderItem) {
        Object.assign(this, srcData);
        this.id = '' + this.id;
        this.article_id = '' + this.article_id;
        this.order_id = '' + this.order_id;
        ('string' !== typeof this.article_name) && (this.article_name = ''); // prevent null
    }

    public getCost(): string {
        return this.total_formatted;
    }

    public isBaseOnArticle(): boolean {
        return 'article' === this.type;
    }
}