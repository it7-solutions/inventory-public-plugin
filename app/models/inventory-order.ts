import {InventoryOrderItem} from "./inventory-order-item";

export class InventoryOrder {
    id: string = '';

    status: string = '';
    download_invoice_url: string = '';
    download_receipt_url: string = '';

    _orderItems: InventoryOrderItem[] = [];

    constructor(srcData: InventoryOrder) {
        Object.assign(this, srcData);
        this.id = '' + this.id;
    }

    public getTotalCost(): number {
        // Return sum of cost all OrderItems
        return this._orderItems.reduce((s: number, o: InventoryOrderItem) => s + o.getCost(), 0);
    }
}