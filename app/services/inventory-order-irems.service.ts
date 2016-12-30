import {Injectable} from "@angular/core";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {InventoryOrderItem} from '../models/inventory-order-item';

@Injectable()
export class InventoryOrderItemsService {
    public list: InventoryOrderItem[] = [];
    private _onUpdate: BehaviorSubject<InventoryOrderItem[]>;
    public onUpdate: Observable<InventoryOrderItem[]>;

    constructor() {
        this._onUpdate = new BehaviorSubject(this.list);
        this.onUpdate = this._onUpdate.asObservable();
    }

    public update(src: InventoryOrderItem[]) {
        this.list.splice(0, this.list.length);
        src.forEach((item: InventoryOrderItem) => {
            this.list.push(new InventoryOrderItem(item))
        });
        this._onUpdate.next(this.list);
    }
}