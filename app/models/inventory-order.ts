export class inventoryOrder {
    id: string = '';

    status: string = '';

    constructor(srcData: inventoryOrder) {
        Object.assign(this, srcData);
        this.id = '' + this.id;
    }
}