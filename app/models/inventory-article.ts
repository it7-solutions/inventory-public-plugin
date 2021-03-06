import {InventoryWish} from "./inventory-with";
import {InventoryOrderItem} from "./inventory-order-item";
export class InventoryArticle {
    id: string = '';

    name: string = '';
    description: string = '';
    price: number = 0; // Price in cents
    price_formatted: string = '';
    images_urls: string[] = [];
    max_for_prt: number = 0;
    category_id: string = '';
    locked: boolean = false;

    _forLiveFilter: string = '';
    _wishes: InventoryWish[] = [];
    _orderItems: InventoryOrderItem[] = [];
    _isMyWish: string = '';
    _categoryName: string = '';

    constructor(srcData: InventoryArticle) {
        Object.assign(this, srcData);
        this.id = '' + this.id;
        ('string' !== typeof this.name) && (this.name = '');
        ('string' !== typeof this.description) && (this.description = '');
        ('number' !== typeof this.price) && (this.price = 0);
        ('string' !== typeof this.price_formatted) && (this.price_formatted = '');
        this.category_id = '' + this.category_id;
        this._forLiveFilter = this.name.toLowerCase();
    }

    public getWishQuantity(): number {
        // Return sum of quantity all Wishes
        return this._wishes.reduce((s: number, o: InventoryWish) => s + o.quantity, 0);
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
        let isMaxQuantityOk = this.getTotalQuantity() < this.max_for_prt;
        let isLocked = this.locked || this.wishLocked();
        return !isLocked && isMaxQuantityOk;
    }

    public isCanDecrease() {
        let isMinQuantityOk = this.getWishQuantity() > 0;
        let isLocked = this.locked || this.wishLocked();
        return !isLocked && isMinQuantityOk;
    }

    public isHaveAdditionalInformation() {
        return !!this.description || this.images_urls.length > 0;
    }

    private wishLocked(): boolean {
        return this._wishes.length > 0 ? this._wishes[0].locked : false
    }
}
