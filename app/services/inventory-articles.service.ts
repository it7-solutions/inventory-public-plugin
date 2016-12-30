import {Injectable} from "@angular/core";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

import {InventoryArticle} from '../models/inventory-article';

@Injectable()
export class InventoryArticlesService {
    public list: InventoryArticle[] = [];
    private _onUpdate: BehaviorSubject<InventoryArticle[]>;
    public onUpdate: Observable<InventoryArticle[]>;

    constructor() {
        this._onUpdate = new BehaviorSubject(this.list);
        this.onUpdate = this._onUpdate.asObservable();
    }

    public update(src: InventoryArticle[]) {
        this.list.splice(0, this.list.length);
        src.forEach((item: InventoryArticle) => {
            this.list.push(new InventoryArticle(item))
        });
        this._onUpdate.next(this.list);
    }

    public fireUpdate(){
        this._onUpdate.next(this.list);
    }
}