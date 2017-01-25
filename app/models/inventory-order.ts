import {InventoryOrderItem} from "./inventory-order-item";

export class InventoryOrder {
    id: string = '';

    status: string = '';
    total: number = 0;
    total_formatted: string = '';
    invoice_status_formatted: string = '';
    order_status_formatted: string = '';
    download_invoice_url: string = '';
    download_receipt_url: string = '';

    _orderItems: InventoryOrderItem[] = [];

    constructor(srcData: InventoryOrder) {
        Object.assign(this, srcData);
        this.id = '' + this.id;
    }

    public getTotalCost(): string {
        return this.total_formatted;
    }
}