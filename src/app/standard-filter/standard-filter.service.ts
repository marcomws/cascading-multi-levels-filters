import { Injectable } from '@angular/core';
import {
  CREATE_BLANK_FILTERS,
  GET_CHILD_FILTER,
  REMOVE_CONDITIONAL_DUPLICATES,
  SET_DEFAULT_FILTERS
} from '../common/helpers';
import { StandardFilter, StandardFilterGroup } from '../common/models';
import { ResponseJson } from '../common/models';
import RESPONSE from '../../assets/filters-response.json';

@Injectable({
  providedIn: 'root'
})
export class StandardFilterService {
  constructor() {}

  public getFilters(): ResponseJson {
    return RESPONSE.filters as ResponseJson;
  }

  public prepareFilters(
    gs: StandardFilterGroup[],
    addBlank?: boolean,
    blankFilterText: string = '',
    exceptLevel?: number
  ): StandardFilterGroup[] {
    const _removeDuplicates = (group: StandardFilterGroup): StandardFilter[] =>
      REMOVE_CONDITIONAL_DUPLICATES<StandardFilter>(
        group.filters,
        (a, b) => a.parentID == b.parentID && a.name == b.name
      );

    let result: StandardFilterGroup[] = [];

    gs.forEach(g => {
      const groupIndex = result.findIndex(_g => _g.level === g.level);
      if (groupIndex === -1) {
        g.filters.push(g.selectedFilter);
        result.push(g);
      } else {
        result[groupIndex].filters.push(g.selectedFilter);
      }
    });

    if (addBlank) {
      result.forEach(g => (g.filters = _removeDuplicates(g)));
      // CREATE_BLANK_FILTERS needs clean @result
      result.forEach(g => {
        g.filters = CREATE_BLANK_FILTERS(
          result,
          g,
          blankFilterText,
          exceptLevel
        );
        g.filters = SET_DEFAULT_FILTERS(g);
        g.selectedFilter = GET_CHILD_FILTER(result, g);
      });
    } else {
      result.forEach(g => {
        g.filters = _removeDuplicates(g);
        g.filters = SET_DEFAULT_FILTERS(g);
        g.selectedFilter = GET_CHILD_FILTER(result, g);
      });
    }

    return result;
  }
}
