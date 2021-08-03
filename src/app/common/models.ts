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
