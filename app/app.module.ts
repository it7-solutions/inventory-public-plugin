import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

import {TranslationsModule} from './modules/translations/translations.module';
import {PluginComponent}  from './components/plugin.component';
import {It7ErrorService} from "./services/it7-error.service";
import {It7AjaxService} from "./services/it7-ajax.service";
import {PopupService} from "./services/popup.service";
import {DataManagerService} from "./services/data-manager.service";
import {InventoryArticlesService} from "./services/inventory-articles.service";
import {InventoryWishesService} from "./services/inventory-wishes.service";
import {InventoryOrdersService} from "./services/inventory-orders.service";
import {InventoryOrderItemsService} from "./services/inventory-order-irems.service";
import {BusyPopupComponent} from "./components/busy-popup.component";
import {WishesComponent} from './components/wishes.component';
import {OrdersComponent} from './components/orders.component';
import {DetailsPopupComponent} from "./components/details-popup.component";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        TranslationsModule
    ],
    declarations: [
        PluginComponent,
        WishesComponent,
        OrdersComponent,
        BusyPopupComponent,
        DetailsPopupComponent,
    ],
    bootstrap: [PluginComponent],
    providers: [
        PopupService,
        DataManagerService,
        It7ErrorService,
        It7AjaxService,
        InventoryArticlesService,
        InventoryWishesService,
        InventoryOrdersService,
        InventoryOrderItemsService
    ]
})
export class AppModule {
}
