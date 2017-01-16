import {InventoryWish} from "./inventory-with";
import {InventoryOrderItem} from "./inventory-order-item";
export class InventoryArticle {
    id: string = '';

    name: string = '';
    description: string = '';
    price: number = 0; // Price in cents
    price_formatted: string = '';

    _forLiveFilter: string = '';
    _wishes: InventoryWish[] = [];
    _orderItems: InventoryOrderItem[] = [];
    _isMyWish: string = '';

    constructor(srcData: InventoryArticle) {
        Object.assign(this, srcData);
        this.id = '' + this.id;
        this._forLiveFilter = this.name.toLowerCase();
    }

    public getWishQuantity(): number {
        // Return sum of quantity all Wishes
        return this._wishes.reduce((s: number, o: InventoryOrderItem) => s + o.quantity, 0);
    }

    public getCost(): string {
        return this._wishes.length > 0 ? this._wishes[0].total_formatted : '';
    }

    public getOrderedQuantity(): number {
        // Return sum of quantity all OrderItems
        return this._orderItems.reduce((s: number, o: InventoryOrderItem) => s + o.quantity, 0);
    }

    // Ordered + Wised
    public getTotalQuantity(): number {
        return this.getWishQuantity() + this.getOrderedQuantity();
    }

    public isCanIncrease() {
        return true;
    }

    public isCanDecrease() {
        return this.getWishQuantity() > 0;
    }
}