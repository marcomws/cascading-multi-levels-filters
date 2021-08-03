import { DEFAULT_FILTERS } from "./constants";
import { StandardFilter, StandardFilterGroup } from "./models";

/**
 * Inspired by LinQ firstOrDefault method
 * @param arr generic array
 * @param [condition] custom condition
 * @returns default item, else first one
 */
export const FIRST_OR_DEFAULT = <T extends { isDefault?: boolean }>(
    arr: T[],
    condition?: (item: T) => boolean
): T => {
    if (arr?.length > 0) {
        const firstMatch = arr.find((item) => (condition ? condition(item) : item.isDefault));
        return firstMatch || arr[0];
    }

    return undefined;
}

/**
 * removes duplicates from generic array
 * @param arr generic array
 * @param [condition] custom condition
 * @returns array without duplicates
 *
 * @example // complex array example
 * REMOVECONDITIONALDUPLICATES(arr, (a, b) => {
 *      if (a[key]) { return a[key] === b[key]; }
 *      else return a === b;
 * });
 */
 export const REMOVE_CONDITIONAL_DUPLICATES = <T>(
  arr: T[],
  condition?: (a: T, b: T) => boolean
): T[] => {
  if (arr && arr.length > 0) {
    return arr.reduce(
      (unique: T[], a: T) =>
        unique.findIndex(b => (condition ? condition(a, b) : a === b)) > -1
          ? unique
          : [...unique, a],
      []
    );
  } else {
    return [];
  }
}

export const GET_CHILDREN_FILTERS = (
    allGroups: StandardFilterGroup[],
    filterGroup: StandardFilterGroup
): StandardFilter[] => {
    const parentGroup = allGroups.find((g) => g.level === filterGroup.level - 1);

    const validFilters = filterGroup.filters.filter(
        (f) =>
            filterGroup.isIndependent ||
            !parentGroup ||
            f.parentID === parentGroup.selectedFilter.id
    );

    return validFilters;
}

export const GET_CHILD_FILTER = (
    allGroups: StandardFilterGroup[],
    filterGroup: StandardFilterGroup
): StandardFilter => {
    const validFilters = GET_CHILDREN_FILTERS(allGroups, filterGroup);

    const validChild = FIRST_OR_DEFAULT<StandardFilter>(validFilters);

    return validChild;
}

export const CREATE_BLANK_FILTERS = (
    allGroups: StandardFilterGroup[],
    filterGroup: StandardFilterGroup,
    blankFilterText: string,
    exceptLevel?: number
): StandardFilter[] => {
    const blankFilters: StandardFilter[] = [];

    if (filterGroup.level === exceptLevel) {
        // do nothing
    } else {
        const parentGroup = allGroups.find(
            (g) => g.level === filterGroup.level - 1
        );

        if (!parentGroup || filterGroup.isIndependent) {
            blankFilters.push({
                id: "",
                name: blankFilterText,
            });
        } else {
            if (parentGroup.filters) {
                parentGroup.filters.forEach((p) => {
                    blankFilters.push({
                        id: "",
                        name: blankFilterText,
                        parentID: p.id,
                    });
                });
            }
        }
    }

    return [...blankFilters, ...filterGroup.filters];
}

export const SET_DEFAULT_FILTERS = (
    filterGroup: StandardFilterGroup
): StandardFilter[] => {
    const updatedFilters: StandardFilter[] = filterGroup.filters;
    const isDefault = (f: StandardFilter) => DEFAULT_FILTERS.some((d) => f.parentID === d.parentID && f.id === d.id);

    updatedFilters.forEach((f) => (f.isDefault = isDefault(f)));

    return updatedFilters;
}