import {ListOf, ListItem} from './list-of';

interface FilterValue {
    label: string
    key: string
}

interface FiltersByKey {
    [index: string]: Filter;
}


export class Filter {
    key: string = '';
    fieldName: string = '';
    values: FilterValue[] = [];
    value: string = '';
    label: string = '';
    operator: string = 'eq';

    _value: string = '';

    constructor(filter: Filter) {
        Object.assign(this, filter);
    }
}


export class FilterListOf {
    public filters: Filter[] = [];
    public filtersByKey: FiltersByKey;

    private activeFilters: Filter[] = [];

    public add(filters: Filter[]) {
        filters.forEach((filter) => {
            this.filters.push(new Filter(filter))
        });
        this.indexFilters();
    }

    public applyToList(list: ListOf) {
        this.prepareFilters();
        list.items.map((item: ListItem)=> {
            item.visible = this.isListItemVisible(item)
        })
    }

    // Convert value as lowercase string
    // Select only active filters
    private prepareFilters(){
        this.activeFilters = this.filters.filter((filter: Filter)=> {
            let strVal = 'string' === typeof filter.value ? filter.value: (filter.value as any).toString();
            filter._value = strVal.toLocaleLowerCase();
            return !!filter.value
        })
    }

    private isListItemVisible(item: ListItem): boolean {
        var notPassed = this.activeFilters.filter((filter: Filter)=> {
            let value = item.original[filter.fieldName];
            return !this.isPass(value, filter);
        });
        return !notPassed.length
    }

    private isPass(value: any, filter:Filter): boolean {
        switch (filter.operator) {
            case 'like' :
                let val = 'string' === typeof value ? value : value.toString();
                return -1 !== val.indexOf(filter._value);

            default:
                return ('string' === typeof value ? value.toLowerCase() : value) === filter.value
        }
    }

    private indexFilters() {
        this.filtersByKey = {};
        this.filters.forEach((filter) => {
            this.filtersByKey[filter.key] = filter;
        });
    }

    private escapeRegExp(str: string){
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& - підстановка результату
    }
}