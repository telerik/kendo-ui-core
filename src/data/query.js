import { ASCENDING, FUNCTION, dateRegExp, extend, grep, isArray, isEmptyObject, isFunction, stableSort } from "./common.js";
import { utilsService } from "../core/services/utils.service.js";
import { propertyAccessService } from "../core/services/property-access.service.js";
import { filterExprNoEval } from "./filter-expression-no-eval.js";
import { Comparer, StableComparer } from "./comparer.js";
import { flatGroups } from "./utils/groups.js";
function isCompositeFilterDescriptor(filter) {
    return Array.isArray(filter.filters);
}
export const map = function (array, callback) {
    let idx;
    const length = array.length;
    const result = new Array(length);
    for (idx = 0; idx < length; idx++) {
        result[idx] = callback(array[idx], idx, array);
    }
    return result;
};
const operatorMap = {
    "==": "eq",
    equals: "eq",
    isequalto: "eq",
    equalto: "eq",
    equal: "eq",
    "!=": "neq",
    ne: "neq",
    notequals: "neq",
    isnotequalto: "neq",
    notequalto: "neq",
    notequal: "neq",
    "<": "lt",
    islessthan: "lt",
    lessthan: "lt",
    less: "lt",
    "<=": "lte",
    le: "lte",
    islessthanorequalto: "lte",
    lessthanequal: "lte",
    ">": "gt",
    isgreaterthan: "gt",
    greaterthan: "gt",
    greater: "gt",
    ">=": "gte",
    isgreaterthanorequalto: "gte",
    greaterthanequal: "gte",
    ge: "gte",
    notsubstringof: "doesnotcontain",
    isnull: "isnull",
    isempty: "isempty",
    isnotempty: "isnotempty"
};
export const operators = (function () {
    function quote(str) {
        if (typeof str == "string") {
            str = str.replace(/[\r\n]+/g, "");
        }
        return JSON.stringify(str);
    }
    function textOp(impl) {
        return function (a, b, ignore, accentFoldingFiltering) {
            const stringValue = String(b);
            b = stringValue;
            if (ignore) {
                a = "(" + a + " + '').toString()" + (accentFoldingFiltering ? ".toLocaleLowerCase('" + accentFoldingFiltering + "')" : ".toLowerCase()");
                b = accentFoldingFiltering ? stringValue.toLocaleLowerCase(accentFoldingFiltering) : stringValue.toLowerCase();
            }
            return impl(a, quote(b), ignore);
        };
    }
    function operator(op, a, b, ignore, accentFoldingFiltering) {
        if (b != null) {
            if (typeof b === "string") {
                const date = dateRegExp.exec(b);
                if (date) {
                    b = new Date(+date[1]);
                }
                else if (ignore) {
                    const stringValue = b;
                    b = quote(accentFoldingFiltering ? stringValue.toLocaleLowerCase(accentFoldingFiltering) : stringValue.toLowerCase());
                    a = "((" + a + " || '')+'')" + (accentFoldingFiltering ? ".toLocaleLowerCase('" + accentFoldingFiltering + "')" : ".toLowerCase()");
                }
                else {
                    b = quote(b);
                }
            }
            if (b.getTime) {
                //b looks like a Date
                a = "(" + a + "&&" + a + ".getTime?" + a + ".getTime():" + a + ")";
                b = b.getTime();
            }
        }
        return a + " " + op + " " + b;
    }
    function getMatchRegexp(pattern) {
        let rx;
        let esc;
        let i;
        // take a pattern, as supported by Excel match filter, and
        // convert it to the equivalent JS regular expression.
        // Excel patterns support:
        //
        //   * - match any sequence of characters
        //   ? - match a single character
        //
        // to match a literal * or ?, they must be prefixed by a tilde (~)
        for (rx = "/^", esc = false, i = 0; i < pattern.length; ++i) {
            const ch = pattern.charAt(i);
            if (esc) {
                rx += "\\" + ch;
            }
            else if (ch == "~") {
                esc = true;
                continue;
            }
            else if (ch == "*") {
                rx += ".*";
            }
            else if (ch == "?") {
                rx += ".";
            }
            else if (".+^$()[]{}|\\/\n\r\u2028\u2029 ".indexOf(ch) >= 0) {
                rx += "\\" + ch;
            }
            else {
                rx += ch;
            }
            esc = false;
        }
        return rx + "$/";
    }
    return {
        quote: function (value) {
            if (value && value.getTime) {
                return "new Date(" + value.getTime() + ")";
            }
            return quote(value);
        },
        eq: function (a, b, ignore, accentFoldingFiltering) {
            return operator("==", a, b, ignore, accentFoldingFiltering);
        },
        neq: function (a, b, ignore, accentFoldingFiltering) {
            return operator("!=", a, b, ignore, accentFoldingFiltering);
        },
        gt: function (a, b, ignore) {
            return operator(">", a, b, ignore);
        },
        gte: function (a, b, ignore) {
            return operator(">=", a, b, ignore);
        },
        lt: function (a, b, ignore) {
            return operator("<", a, b, ignore);
        },
        lte: function (a, b, ignore) {
            return operator("<=", a, b, ignore);
        },
        startswith: textOp(function (a, b) {
            return a + ".lastIndexOf(" + b + ", 0) == 0";
        }),
        doesnotstartwith: textOp(function (a, b) {
            return a + ".lastIndexOf(" + b + ", 0) == -1";
        }),
        endswith: textOp(function (a, b) {
            const n = b ? b.length - 2 : 0;
            return a + ".indexOf(" + b + ", " + a + ".length - " + n + ") >= 0";
        }),
        doesnotendwith: textOp(function (a, b) {
            const n = b ? b.length - 2 : 0;
            return a + ".indexOf(" + b + ", " + a + ".length - " + n + ") < 0";
        }),
        contains: textOp(function (a, b) {
            return a + ".indexOf(" + b + ") >= 0";
        }),
        doesnotcontain: textOp(function (a, b) {
            return a + ".indexOf(" + b + ") == -1";
        }),
        matches: textOp(function (a, b) {
            b = b.substring(1, b.length - 1);
            return getMatchRegexp(b) + ".test(" + a + ")";
        }),
        doesnotmatch: textOp(function (a, b) {
            b = b.substring(1, b.length - 1);
            return "!" + getMatchRegexp(b) + ".test(" + a + ")";
        }),
        isempty: function (a) {
            return a + " === ''";
        },
        isnotempty: function (a) {
            return a + " !== ''";
        },
        isnull: function (a) {
            return "(" + a + " == null)";
        },
        isnotnull: function (a) {
            return "(" + a + " != null)";
        },
        isnullorempty: function (a) {
            return "(" + a + " === null) || (" + a + " === '')";
        },
        isnotnullorempty: function (a) {
            return "(" + a + " !== null) && (" + a + " !== '')";
        }
    };
})();
export class Query {
    static fn;
    // Continue to support legacy unsafe-eval for the spreadsheet
    static filterExpr(expression, options = {
        noEval: false
    }) {
        if (options.noEval) {
            // using no-eval for most cases
            return filterExprNoEval(expression);
        }
        const expressions = [];
        const logic = {
            and: " && ",
            or: " || "
        };
        let idx;
        let length;
        let filter;
        let expr;
        const fieldFunctions = [];
        const operatorFunctions = [];
        let field;
        let operator;
        const filters = expression.filters;
        for (idx = 0, length = filters.length; idx < length; idx++) {
            filter = filters[idx];
            field = filter.field;
            operator = filter.operator;
            if (isCompositeFilterDescriptor(filter)) {
                expr = Query.filterExpr(filter);
                //Nested function fields or operators - update their index e.g. __o[0] -> __o[1]
                filter = expr.expression.replace(/__o\[(\d+)\]/g, function (match, index) {
                    index = +index;
                    return "__o[" + (operatorFunctions.length + index) + "]";
                }).replace(/__f\[(\d+)\]/g, function (match, index) {
                    index = +index;
                    return "__f[" + (fieldFunctions.length + index) + "]";
                });
                operatorFunctions.push.apply(operatorFunctions, expr.operators);
                fieldFunctions.push.apply(fieldFunctions, expr.fields);
            }
            else {
                if (typeof field === FUNCTION) {
                    expr = "__f[" + fieldFunctions.length + "](d)";
                    fieldFunctions.push(field);
                }
                else {
                    expr = propertyAccessService.expr(field);
                }
                if (typeof operator === FUNCTION) {
                    filter = "__o[" + operatorFunctions.length + "](" + expr + ", " + operators.quote(filter.value) + ")";
                    operatorFunctions.push(operator);
                }
                else {
                    filter = operators[(String(operator || "eq")).toLowerCase()](expr, filter.value, filter.ignoreCase !== undefined ? filter.ignoreCase : true, expression.accentFoldingFiltering);
                }
            }
            expressions.push(filter);
        }
        return {
            expression: "(" + expressions.join(logic[expression.logic]) + ")",
            fields: fieldFunctions,
            operators: operatorFunctions
        };
    }
    static process(data, options = {}, inPlace) {
        options = options || {};
        const group = options.group;
        const customGroupSort = anyGroupDescriptorHasCompare(normalizeGroup(group || []));
        let query = new Query(data);
        const groupDescriptorsWithoutCompare = normalizeGroupWithoutCompare(group || []);
        const normalizedSort = normalizeSort(options.sort || []) || [];
        const sort = customGroupSort ? normalizedSort : groupDescriptorsWithoutCompare.concat(normalizedSort);
        let groupDescriptorsWithoutSort;
        let total;
        const filterCallback = options.filterCallback;
        const filter = options.filter;
        let skip = options.skip;
        const take = options.take;
        if (sort && inPlace) {
            query = query.sort(sort, undefined, undefined, inPlace);
        }
        if (filter) {
            query = query.filter(filter);
            if (filterCallback) {
                query = filterCallback(query);
            }
            total = query.toArray().length;
        }
        if (sort) {
            if (!inPlace) {
                query = query.sort(sort);
            }
            if (group) {
                data = query.toArray();
            }
        }
        if (customGroupSort) {
            query = query.group(group, data, options);
            if (skip !== undefined && take !== undefined && !options.groupPaging) {
                query = new Query(flatGroups(query.toArray())).range(skip, take);
                groupDescriptorsWithoutSort = map(groupDescriptorsWithoutCompare, function (groupDescriptor) {
                    return extend({}, groupDescriptor, {
                        skipItemSorting: true
                    });
                });
                query = query.group(groupDescriptorsWithoutSort, data, options);
            }
        }
        else {
            if (skip !== undefined && take !== undefined) {
                total = query.data.length;
                if (skip + take > total && options.virtual) {
                    skip -= skip + take - total;
                    skip = skip < 0 ? 0 : skip;
                }
                query = query.range(skip, take);
            }
            if (group && (!isEmptyObject(group) || group.length !== 0)) {
                query = query.group(group, data, options);
            }
        }
        return {
            total: total,
            data: query.toArray()
        };
    }
    static normalizeFilter(expression) {
        if (expression && !isEmptyObject(expression)) {
            if (isArray(expression) || !expression.filters) {
                expression = {
                    logic: "and",
                    filters: isArray(expression) ? expression : [expression]
                };
            }
            normalizeOperator(expression);
            return expression;
        }
    }
    static compareFilters(expr1, expr2) {
        let idx;
        expr1 = normalizeDescriptor(expr1);
        expr2 = normalizeDescriptor(expr2);
        if (expr1.logic !== expr2.logic) {
            return false;
        }
        let f1;
        let f2;
        let filters1 = (expr1.filters || []).slice();
        let filters2 = (expr2.filters || []).slice();
        if (filters1.length !== filters2.length) {
            return false;
        }
        filters1 = filters1.sort(fieldComparer);
        filters2 = filters2.sort(fieldComparer);
        for (idx = 0; idx < filters1.length; idx++) {
            f1 = filters1[idx];
            f2 = filters2[idx];
            if (f1.logic && f2.logic) {
                if (!compareFilters(f1, f2)) {
                    return false;
                }
            }
            else if (!compareDescriptor(f1, f2)) {
                return false;
            }
        }
        return true;
    }
    static normalizeGroup(field, dir, compare, skipItemSorting) {
        const descriptor = typeof field === "string" ? {
            field: field,
            dir: dir,
            compare: compare,
            skipItemSorting: skipItemSorting
        } : field;
        const descriptors = isArray(descriptor) ? descriptor : descriptor !== undefined ? [descriptor] : [];
        return map(descriptors, function (d) {
            return {
                field: d.field,
                dir: d.dir || "asc",
                aggregates: d.aggregates,
                compare: d.compare,
                skipItemSorting: d.skipItemSorting
            };
        });
    }
    static normalizeSort(field, dir) {
        if (field) {
            const descriptor = typeof field === "string" ? {
                field: field,
                dir: dir
            } : field;
            const descriptors = isArray(descriptor) ? descriptor : [descriptor];
            return grep(descriptors, function (d) {
                return !!d.dir;
            });
        }
        return [];
    }
    constructor(data = []) {
        this.data = data || [];
    }
    toArray() {
        return this.data;
    }
    range(index, count) {
        return new Query(this.data.slice(index, index + count));
    }
    skip(count) {
        return new Query(this.data.slice(count));
    }
    take(count) {
        return new Query(this.data.slice(0, count));
    }
    select(selector) {
        return new Query(map(this.data, selector));
    }
    order(selector, dir, inPlace) {
        const sort = {
            dir: dir
        };
        if (selector) {
            if (typeof selector === "object" && "compare" in selector && selector.compare) {
                sort.compare = selector.compare;
            }
            else {
                sort.field = selector;
            }
        }
        if (inPlace) {
            return new Query(this.data.sort(Comparer.create(sort)));
        }
        return new Query(this.data.slice(0).sort(Comparer.create(sort)));
    }
    orderBy(selector, inPlace) {
        return this.order(selector, "asc", inPlace);
    }
    orderByDescending(selector, inPlace) {
        return this.order(selector, "desc", inPlace);
    }
    sort(field, dir, comparer, inPlace) {
        let idx;
        let length;
        const descriptors = normalizeSort(field, dir) || [];
        const comparers = [];
        comparer = comparer || Comparer;
        if (descriptors.length) {
            for (idx = 0, length = descriptors.length; idx < length; idx++) {
                comparers.push(comparer.create(descriptors[idx]));
            }
            return this.orderBy({
                compare: comparer.combine(comparers)
            }, inPlace);
        }
        return this;
    }
    filter(expressions) {
        const data = this.data;
        let result = [];
        const normalizedExpressions = normalizeFilter(expressions);
        if (!normalizedExpressions || normalizedExpressions.filters.length === 0) {
            return this;
        }
        const compiled = Query.filterExpr(normalizedExpressions, {
            noEval: true
        });
        result = data.filter(compiled);
        return new Query(result);
    }
    group(descriptors = [], allData, options) {
        descriptors = normalizeGroup(descriptors || []);
        allData = allData || this.data;
        const that = this;
        let result = new Query(that.data);
        let descriptor;
        const getFilteredData = (g, data) => {
            data = data || new Query(allData).filter([{
                    field: g.field,
                    operator: "eq",
                    value: g.value,
                    ignoreCase: false
                }]);
            return data;
        };
        if (descriptors.length > 0) {
            descriptor = descriptors[0];
            if (options && options.groupPaging) {
                result = new Query(allData).groupAllData(descriptor, allData).select(function (group) {
                    let cachedFilteredData;
                    const items = descriptors.length > 1 ? new Query(group.items).group(descriptors.slice(1), getFilteredData(group, cachedFilteredData).toArray(), options).toArray() : group.items;
                    return {
                        field: group.field,
                        value: group.value,
                        hasSubgroups: descriptors.length > 1,
                        items: items,
                        aggregates: descriptor.aggregates && descriptor.aggregates.length ? getFilteredData(group, cachedFilteredData).aggregate(descriptor.aggregates) : {},
                        uid: utilsService.guid(),
                        itemCount: items.length,
                        subgroupCount: items.length
                    };
                });
            }
            else {
                result = result.groupBy(descriptor).select(function (group) {
                    let cachedFilteredData;
                    return {
                        field: group.field,
                        value: group.value,
                        items: descriptors.length > 1 ? new Query(group.items).group(descriptors.slice(1), getFilteredData(group, cachedFilteredData).toArray()).toArray() : group.items,
                        hasSubgroups: descriptors.length > 1,
                        aggregates: descriptor.aggregates && descriptor.aggregates.length ? getFilteredData(group, cachedFilteredData).aggregate(descriptor.aggregates) : {}
                    };
                });
            }
        }
        return result;
    }
    groupBy(descriptor) {
        const that = this;
        if (isEmptyObject(descriptor) || !this.data.length) {
            return new Query([]);
        }
        const field = descriptor.field;
        const sorted = descriptor.skipItemSorting ? this.data : this._sortForGrouping(field, descriptor.dir || "asc");
        const accessor = propertyAccessService.accessor(field);
        let item;
        let groupValue = accessor.get(sorted[0]);
        let group = {
            field: field,
            value: groupValue,
            items: []
        };
        let currentValue;
        let idx;
        let len;
        let result = [group];
        for (idx = 0, len = sorted.length; idx < len; idx++) {
            item = sorted[idx];
            currentValue = accessor.get(item);
            if (!groupValueComparer(groupValue, currentValue)) {
                groupValue = currentValue;
                group = {
                    field: field,
                    value: groupValue,
                    items: []
                };
                result.push(group);
            }
            group.items.push(item);
        }
        result = that._sortGroups(result, descriptor);
        return new Query(result);
    }
    groupAllData(descriptor, allData) {
        if (isEmptyObject(descriptor) || (this.data && !this.data.length)) {
            return new Query([]);
        }
        const field = descriptor.field;
        const sorted = descriptor.skipItemSorting ? allData : new Query(allData).sort(field, descriptor.dir || "asc", StableComparer).toArray();
        const accessor = propertyAccessService.accessor(field);
        let item;
        let groupValue = accessor.get(sorted[0]);
        let group = {
            field: field,
            value: groupValue,
            items: []
        };
        let currentValue;
        let idx;
        let len;
        let result = [group];
        for (idx = 0, len = sorted.length; idx < len; idx++) {
            item = sorted[idx];
            currentValue = accessor.get(item);
            if (!groupValueComparer(groupValue, currentValue)) {
                groupValue = currentValue;
                group = {
                    field: field,
                    value: groupValue,
                    items: []
                };
                result.push(group);
            }
            group.items.push(item);
        }
        result = this._sortGroups(result, descriptor);
        return new Query(result);
    }
    aggregate(aggregates) {
        let idx;
        let len;
        const result = {};
        const state = {};
        if (aggregates && aggregates.length) {
            for (idx = 0, len = this.data.length; idx < len; idx++) {
                calculateAggregate(result, aggregates, this.data[idx], idx, len, state);
            }
        }
        return result;
    }
    _sortForGrouping(field, dir) {
        let idx;
        let length;
        let data = this.data;
        if (!stableSort) {
            for (idx = 0, length = data.length; idx < length; idx++) {
                data[idx].__position = idx;
            }
            data = new Query(data).sort(field, dir, StableComparer).toArray();
            for (idx = 0, length = data.length; idx < length; idx++) {
                delete data[idx].__position;
            }
            return data;
        }
        return this.sort(field, dir).toArray();
    }
    _sortGroups(groups, descriptor) {
        let result = groups;
        if (descriptor && isFunction(descriptor.compare)) {
            result = new Query(result).order({
                compare: descriptor.compare
            }, descriptor.dir || ASCENDING).toArray();
        }
        return result;
    }
}
Query.fn = Query.prototype;
export function normalizeSort(field, dir) {
    if (field) {
        const descriptor = typeof field === "string" ? {
            field: field,
            dir: dir
        } : field;
        const descriptors = isArray(descriptor) ? descriptor : [descriptor];
        return grep(descriptors, function (d) {
            return !!d.dir;
        });
    }
}
export function sortFields(sorts, dir) {
    let i;
    const sortObject = {};
    if (sorts) {
        const descriptor = typeof sorts === "string" ? {
            field: sorts,
            dir: dir
        } : sorts;
        const descriptors = isArray(descriptor) ? descriptor : [descriptor];
        for (i = 0; i < descriptors.length; i++) {
            sortObject[String(descriptors[i].field)] = {
                dir: descriptors[i].dir,
                index: i + 1
            };
        }
    }
    return sortObject;
}
export function normalizeOperator(expression) {
    let idx;
    let length;
    let filter;
    let operator;
    const filters = expression.filters;
    if (filters) {
        for (idx = 0, length = filters.length; idx < length; idx++) {
            filter = filters[idx];
            operator = filter.operator;
            if (operator && typeof operator === "string") {
                const normalizedOperator = operator.toLowerCase();
                filter.operator = operatorMap[normalizedOperator] || normalizedOperator;
            }
            normalizeOperator(filter);
        }
    }
}
export function normalizeFilter(expression) {
    if (expression && !isEmptyObject(expression)) {
        if (isArray(expression) || !expression.filters) {
            expression = {
                logic: "and",
                filters: isArray(expression) ? expression : [expression]
            };
        }
        normalizeOperator(expression);
        return expression;
    }
}
export function compareDescriptor(f1, f2) {
    if (f1.logic || f2.logic) {
        return false;
    }
    return f1.field === f2.field && f1.value === f2.value && f1.operator === f2.operator;
}
export function normalizeDescriptor(filter) {
    filter = filter || {};
    if (isEmptyObject(filter)) {
        return {
            logic: "and",
            filters: []
        };
    }
    return normalizeFilter(filter);
}
export function fieldComparer(a, b) {
    if (b.logic || String(a.field) > String(b.field)) {
        return 1;
    }
    else if (String(a.field) < String(b.field)) {
        return -1;
    }
    else {
        return 0;
    }
}
export function hasNotFetchedItems(items, start, end) {
    for (let idx = start; idx < end; idx++) {
        if (items[idx].notFetched) {
            return true;
        }
    }
    return false;
}
export function compareFilters(expr1, expr2) {
    let idx;
    expr1 = normalizeDescriptor(expr1);
    expr2 = normalizeDescriptor(expr2);
    if (expr1.logic !== expr2.logic) {
        return false;
    }
    let f1;
    let f2;
    let filters1 = (expr1.filters || []).slice();
    let filters2 = (expr2.filters || []).slice();
    if (filters1.length !== filters2.length) {
        return false;
    }
    filters1 = filters1.sort(fieldComparer);
    filters2 = filters2.sort(fieldComparer);
    for (idx = 0; idx < filters1.length; idx++) {
        f1 = filters1[idx];
        f2 = filters2[idx];
        if (f1.logic && f2.logic) {
            if (!compareFilters(f1, f2)) {
                return false;
            }
        }
        else if (!compareDescriptor(f1, f2)) {
            return false;
        }
    }
    return true;
}
export function normalizeAggregate(expressions) {
    return isArray(expressions) ? expressions : [expressions];
}
export function normalizeGroup(field, dir, compare, skipItemSorting) {
    const descriptor = typeof field === "string" ? {
        field: field,
        dir: dir,
        compare: compare,
        skipItemSorting: skipItemSorting
    } : field;
    const descriptors = isArray(descriptor) ? descriptor : descriptor !== undefined ? [descriptor] : [];
    return map(descriptors, function (d) {
        return {
            field: d.field,
            dir: d.dir || "asc",
            aggregates: d.aggregates,
            compare: d.compare,
            skipItemSorting: d.skipItemSorting
        };
    });
}
export function normalizeGroupWithoutCompare(field, dir, compare) {
    let i;
    const descriptors = normalizeGroup(field, dir, compare);
    for (i = 0; i < descriptors.length; i++) {
        delete descriptors[i].compare;
    }
    return descriptors;
}
export function anyGroupDescriptorHasCompare(groupDescriptors) {
    let i;
    const descriptors = isArray(groupDescriptors) ? groupDescriptors : [groupDescriptors];
    for (i = 0; i < descriptors.length; i++) {
        if (descriptors[i] && isFunction(descriptors[i].compare)) {
            return true;
        }
    }
    return false;
}
export function groupValueComparer(a, b) {
    if (a?.getTime && b?.getTime) {
        return a.getTime() === b.getTime();
    }
    return a === b;
}
export const functions = {
    sum: function (accumulator, item, accessor) {
        const value = accessor.get(item);
        if (!isNumber(accumulator)) {
            accumulator = value;
        }
        else if (isNumber(value)) {
            accumulator += value;
        }
        return accumulator;
    },
    count: function (accumulator) {
        return Number(accumulator || 0) + 1;
    },
    average: function (accumulator, item, accessor, index, length, state) {
        const value = accessor.get(item);
        const aggregateState = state || {};
        if (aggregateState.count === undefined) {
            aggregateState.count = 0;
        }
        if (!isNumber(accumulator)) {
            accumulator = value;
        }
        else if (isNumber(value)) {
            accumulator += value;
        }
        if (isNumber(value)) {
            aggregateState.count = Number(aggregateState.count) + 1;
        }
        if (index == length - 1 && isNumber(accumulator)) {
            accumulator = accumulator / Number(aggregateState.count);
        }
        return accumulator;
    },
    max: function (accumulator, item, accessor) {
        const value = accessor.get(item);
        if (!isNumber(accumulator) && !isDate(accumulator)) {
            accumulator = value;
        }
        if (isNumber(accumulator) && isNumber(value) && accumulator < value) {
            accumulator = value;
        }
        else if (isDate(accumulator) && isDate(value) && accumulator.getTime() < value.getTime()) {
            accumulator = value;
        }
        return accumulator;
    },
    min: function (accumulator, item, accessor) {
        const value = accessor.get(item);
        if (!isNumber(accumulator) && !isDate(accumulator)) {
            accumulator = value;
        }
        if (isNumber(accumulator) && isNumber(value) && accumulator > value) {
            accumulator = value;
        }
        else if (isDate(accumulator) && isDate(value) && accumulator.getTime() > value.getTime()) {
            accumulator = value;
        }
        return accumulator;
    }
};
export function calculateAggregate(accumulator, aggregates = [], item, index, length, state) {
    aggregates = aggregates || [];
    let idx;
    let aggr;
    let functionName;
    const len = aggregates.length;
    for (idx = 0; idx < len; idx++) {
        aggr = aggregates[idx];
        functionName = aggr.aggregate;
        const field = aggr.field;
        accumulator[field] = accumulator[field] || {};
        state[field] = state[field] || {};
        state[field][functionName] = state[field][functionName] || {};
        accumulator[field][functionName] = functions[functionName.toLowerCase()](accumulator[field][functionName], item, propertyAccessService.accessor(field), index, length, state[field][functionName]);
    }
}
export function isNumber(val) {
    return typeof val === "number" && !isNaN(val);
}
export function isDate(val) {
    return Boolean(val?.getTime);
}
export function toJSON(array) {
    let idx;
    const length = array.length;
    const result = new Array(length);
    for (idx = 0; idx < length; idx++) {
        result[idx] = array[idx].toJSON();
    }
    return result;
}
