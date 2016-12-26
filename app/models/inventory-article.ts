export class inventoryArticle {
    id: string = '';

    name: string = '';
    description: string = '';
    price: number = 0;

    constructor(srcData: inventoryArticle) {
        Object.assign(this, srcData);
        this.id = '' + this.id;
    }
}