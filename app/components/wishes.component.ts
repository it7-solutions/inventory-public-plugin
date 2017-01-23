import {Component, Output} from '@angular/core';
import {PluginConfig} from "../services/plugin.config";
import {ListOf, ListItem} from "../models/list-of";
import {FilterListOf, Filter} from "../models/filter-list-of";
import {SortListOf} from '../models/sort-list-of';
import {It7ErrorService} from "../services/it7-error.service";
import {InventoryArticlesService} from "../services/inventory-articles.service";
import {InventoryArticle} from "../models/inventory-article";
import {DataManagerService} from "../services/data-manager.service";
import {InventoryWishesService} from "../services/inventory-wishes.service";
import {InventoryWish} from "../models/inventory-with";
import {PopupService} from "../services/popup.service";
import {DetailsPopup} from "./details-popup.component";

@Component({
    selector: 'wishes',
    templateUrl: PluginConfig.buildTemplateUrl('templates/wishes.html')
})
export class WishesComponent {
    private articleList: ListOf;
    private filters:FilterListOf;

    constructor(private config: PluginConfig,
                private err: It7ErrorService,
                private dm: DataManagerService,
                private articles: InventoryArticlesService,
                private wishes: InventoryWishesService,
                private popupService: PopupService,
    ) {
        this.articleList = new ListOf();

        // Init Filters from config
        this.filters = new FilterListOf();
        this.filters.add(config.filters);
    }

    ngOnInit() {
        this.articles.onUpdate.subscribe(sessions => this.onArticlesUpdate(sessions));
        this.onArticlesUpdate(this.articles.list);
    }

    // From template event
    public onKeywordChange(event:any) {
        var input:any = event.target;
        var filter = this.filters.filtersByKey['forLiveFilter'];
        if(filter) {
            filter.value = input.value.toString();
            this.applyFilter();
        } else {
            console && console.error && console.error('Not found instance of class "Filter" for live filter.');
        }
    }

    // From template event
    public onFilterChange(event:any) {
        //var select = event.target;
        var filter = this.filters.filtersByKey['myWishesOnly'];
        if(filter) {
            filter.value = filter.value ? '' : 'yes';
            this.applyFilter();
        } else {
            console && console.error && console.error('Not found instance of class "Filter" for My Wish filter.');
        }
    }

    // From template event
    public onIncreaseClick(item: ListItem) {
        let article: InventoryArticle = item.original;
        if(article.isCanIncrease()){
            this.dm.changeWish({article_id: article.id, quantity: article.getWishQuantity() + 1});
        }
    }

    // From template event
    public onDecreaseClick(item: ListItem) {
        let article: InventoryArticle = item.original;
        if(article.isCanDecrease()){
            this.dm.changeWish({article_id: article.id, quantity: article.getWishQuantity() - 1});
        }
    }

    // Call from template
    public onArticleDetailsClick(event: MouseEvent, article: InventoryArticle){
        this.popupService.showPopup(new DetailsPopup(true, article));
    }

    private onArticlesUpdate(list: InventoryArticle[]) {
        this.articleList.update(list);
        this.applyFilter();
    }

    private applyFilter(){
        this.filters.applyToList(this.articleList);
    }

    // Call from template
    public getTotalCost(): string {
        return this.dm.wishes_total_formatted;
    }

}
