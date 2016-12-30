import {InventoryWish} from "./inventory-with";
import {InventoryOrderItem} from "./inventory-order-item";
export class InventoryArticle {
    id: string = '';

    name: string = '';
    description: string = '';
    price: number = 0; // Price in cents

    _wishes: InventoryWish[] = [];
    _orderItems: InventoryOrderItem[] = [];

    constructor(srcData: InventoryArticle) {
        Object.assign(this, srcData);
        this.id = '' + this.id;
    }

    public getWishQuantity(): number {
        // Return sum of quantity all Wishes
        return this._wishes.reduce((s: number, o: InventoryOrderItem) => s + o.quantity, 0);
    }

    public getCost(): number {
        return this.getWishQuantity() * this.price;
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