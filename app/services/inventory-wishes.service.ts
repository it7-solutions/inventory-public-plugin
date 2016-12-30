import {Injectable} from "@angular/core";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {InventoryWish} from '../models/inventory-with';

@Injectable()
export class InventoryWishesService {
    public list: InventoryWish[] = [];
    private _onUpdate: BehaviorSubject<InventoryWish[]>;
    public onUpdate: Observable<InventoryWish[]>;

    constructor() {
        this._onUpdate = new BehaviorSubject(this.list);
        this.onUpdate = this._onUpdate.asObservable();
    }

    public update(src: InventoryWish[]) {
        this.list.splice(0, this.list.length);
        src.forEach((item: InventoryWish) => {
            this.list.push(new InventoryWish(item))
        });
        this._onUpdate.next(this.list);
    }
}