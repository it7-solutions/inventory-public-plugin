import {Injectable} from "@angular/core";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {InventoryOrder} from '../models/inventory-order';

@Injectable()
export class InventoryOrdersService {
    public list: InventoryOrder[] = [];
    private _onUpdate: BehaviorSubject<InventoryOrder[]>;
    public onUpdate: Observable<InventoryOrder[]>;

    constructor() {
        this._onUpdate = new BehaviorSubject(this.list);
        this.onUpdate = this._onUpdate.asObservable();
    }

    public update(src: InventoryOrder[]) {
        this.list.splice(0, this.list.length);
        src.forEach((item: InventoryOrder) => {
            this.list.push(new InventoryOrder(item))
        });
        this._onUpdate.next(this.list);
    }
}