import {Injectable} from "@angular/core";
import {Filter} from "../models/filter-list-of"
import {Sorting} from "../models/sort-list-of"
import {InventoryArticle} from "../models/inventory-article"

export interface PluginOptions {
    mockAJAX: any

    articles: InventoryArticle[]

    filters: Filter[]
    sortings: Sorting[]

    changeWishUrl: string
    getDataUrl: string

    preorderConfirmationUrl: string

    currencyShortName: string
}

@Injectable()
export class PluginConfig {
    mockAJAX: any;

    articles: InventoryArticle[] = [];

    filters: Filter[] = [];
    sortings: Sorting[] = [];

    changeWishUrl: string = '';
    getDataUrl: string = '';

    preorderConfirmationUrl: string = '';

    currencyShortName: string = '';

    translations: any[] = [];
    onTranslate: any;

    constructor(options: PluginOptions) {
        Object.assign(this, options);
    }

    static buildTemplateUrl(path: string) {
        var base = (window && window['__it7_inventory_public_plugin__']) ? window['__it7_inventory_public_plugin__'] : 'app';
        return base.replace(/\/+$/,'') + '/' + path.replace(/^\/+/,'');
    }
}
