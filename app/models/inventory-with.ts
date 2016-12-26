export class inventoryWish {
    id: string = '';

    article_id: string = '';
    quantity: number = 0;

    constructor(srcData: inventoryWish) {
        Object.assign(this, srcData);
        this.id = '' + this.id;
        this.article_id = '' + this.article_id;
    }
}