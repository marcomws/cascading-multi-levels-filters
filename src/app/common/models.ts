import { NgClass } from '@angular/common';

export interface StandardFilterGroup {
  level: number;
  selectedFilter: StandardFilter;
  filters: StandardFilter[];
  isIndependent?: boolean;
}

export interface StandardFilter {
  id: any;
  name: string;
  parentID?: any;
  isDefault?: boolean;
}

export interface ResponseJson {
  country: CountryJson[];
  city: CityJson[];
  zip_code: ZipCodeJson[];
  purpose: string[];
}

export interface CountryJson {
  id: string;
  country_name: string;
}

export interface CityJson {
  id: string;
  country_id: string;
  city_name: string;
}

export interface ZipCodeJson {
  id: string;
  city_id: string;
  zip_code: string;
}

export interface ItemSelectionParams<T> {
  pageTitle?: string;
  selectionList: T[];
  selectedItem: T;
  propsToShow?: ItemSelectionValues<keyof T, keyof T>[];
  itemId?: (keyof T)[];
}

export interface ItemSelection<T> {
  id: string;
  name: string;
  values?: ItemSelectionValues<string, string>[];
  data: T;
}

export interface ItemSelectionValues<T, R> {
  lable?: string;
  valuePrefix?: R;
  value: T;
  valueSuffix?: R;
  valuePipe?: (value: any) => any;
  ngClass?: string | string[] | Set<string> | { [klass: string]: any };
}
