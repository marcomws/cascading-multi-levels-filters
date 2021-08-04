export class StandardFilterGroup {
  level: number;
  selectedFilter: StandardFilter;
  filters: StandardFilter[];
  isIndependent?: boolean;
}

export class StandardFilter {
  id: any;
  name: string;
  parentID?: any;
  isDefault?: boolean;
}

export class ResponseJson {
  country: CountryJson[];
  city: CityJson[];
  zip_code: ZipCodeJson[];
  purpose: string[];
}

export class CountryJson {
  id: string;
  country_name: string;
}

export class CityJson {
  id: string;
  country_id: string;
  city_name: string;
}

export class ZipCodeJson {
  id: string;
  city_id: string;
  zip_code: string;
}
