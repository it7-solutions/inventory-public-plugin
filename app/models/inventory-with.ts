export class InventoryWish {
    id: string = '';

    article_id: string = '';
    quantity: number = 0;
    total: number = 0;
    total_formatted: string = '';

    constructor(srcData: InventoryWish) {
        Object.assign(this, srcData);
        this.id = '' + this.id;
        this.article_id = '' + this.article_id;
    }
}