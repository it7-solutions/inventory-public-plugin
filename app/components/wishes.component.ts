import {Component, Output} from '@angular/core';
import {PluginConfig} from "../services/plugin.config";
import {ListOf, ListItem} from "../models/list-of";
import {FilterListOf, Filter} from "../models/filter-list-of";
import {SortListOf} from '../models/sort-list-of';
import {AgendaSessionsService} from "../services/agenda-sessions.service";
import {MyAgendaService} from "../services/my-agenda.service";
import {AgendaSession} from "../models/agenda-session";
import {It7ErrorService} from "../services/it7-error.service";
import {ValidationService} from '../services/validation.service';
import {InventoryArticlesService} from "../services/inventory-articles.service";
import {InventoryArticle} from "../models/inventory-article";
import {DataManagerService} from "../services/data-manager.service";
import {InventoryWishesService} from "../services/inventory-wishes.service";
import {InventoryWish} from "../models/inventory-with";

@Component({
    selector: 'wishes',
    templateUrl: PluginConfig.buildTemplateUrl('templates/wishes.html')
})
export class WishesComponent {
    private articleList: ListOf;

    constructor(private config: PluginConfig,
                private err: It7ErrorService,
                private dm: DataManagerService,
                private articles: InventoryArticlesService,
                private wishes: InventoryWishesService
    ) {
        this.articleList = new ListOf();
    }

    ngOnInit() {
        this.articles.onUpdate.subscribe(sessions => this.onArticlesUpdate(sessions));
        this.onArticlesUpdate(this.articles.list);
    }

    // From template event
    public onIncreaseClick(item: ListItem) {
        let article: InventoryArticle = item.original;
        if(article.isCanIncrease()){
            this.dm.changeWish({article_id: article.id, quantity: article.getWishQuantity() + 1});
            console.log('increase', article);
        }
    }

    // From template event
    public onDecreaseClick(item: ListItem) {
        let article: InventoryArticle = item.original;
        if(article.isCanDecrease()){
            this.dm.changeWish({article_id: article.id, quantity: article.getWishQuantity() - 1});
            console.log('decrease', article);
        }
    }

    private onArticlesUpdate(list: InventoryArticle[]) {
        this.articleList.update(list);
    }

    // Call from template
    public formatPrice(price: number): string {
        return ""+(price/100);
    }

    // Call from template
    public getTotalCost(): number {
        // Return sum of quantity all wished Articles
        return this.articles.list.reduce((s: number, o: InventoryArticle) => s + o.getCost(), 0);
    }

}
