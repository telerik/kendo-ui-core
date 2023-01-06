import "../kendo.core.js";

/*
This code is copied/inspired by the internal @progress/kendo-data-query repo:
https://github.com/telerik/kendo-data-query/tree/develop/src/filtering

!!!
1. If updates are to be synced consider the accentFoldingFiltering,
   which at the moment is not present as a feature in the data-query-package.

2. Double-check available operators as well.

3. Make sure objs are strings -> i.e., replace (a || "") to (a + '')
!!!

In future, if we consider reusing the code directly we should revise the above omissions.
*/

const logic = {
    "or": {
        concat: (acc, fn) => a => acc(a) || fn(a),
        identity: () => false
    },
    "and": {
        concat: (acc, fn) => a => acc(a) && fn(a),
        identity: () => true
    }
};

const operatorsMap = {
    isnullorempty: (a) => kendo.isBlank(a) || a === '',
    isnotnullorempty: (a) => kendo.isPresent(a) && a !== '',
    contains: (a, b) => (a + '').indexOf(b) >= 0,
    doesnotcontain: (a, b) => (a + '').indexOf(b) === -1,
    doesnotendwith: (a, b) => (a + '').indexOf(b, (a || "").length - (b || "").length) < 0,
    doesnotstartwith: (a, b) => (a + '').lastIndexOf(b, 0) === -1,
    endswith: (a, b) => (a + '').indexOf(b, (a || "").length - (b || "").length) >= 0,
    eq: (a, b) => a === b,
    gt: (a, b) => a > b,
    gte: (a, b) => a >= b,
    isempty: (a) => a === '',
    isnotempty: (a) => a !== '',
    isnotnull: (a) => kendo.isPresent(a),
    isnull: (a) => kendo.isBlank(a),
    lt: (a, b) => a < b,
    lte: (a, b) => a <= b,
    neq: (a, b) => a != b,
    startswith: (a, b) => (a + '').lastIndexOf(b, 0) === 0
};

const dateRegExp = /^\/Date\((.*?)\)\/$/;

const convertValue = (value, ignoreCase, accentFoldingFiltering) => {
    if (value != null && kendo.isString(value)) {
        const date = dateRegExp.exec(value);
        if (date) {
            return new Date(+date[1]).getTime();
        } else if (ignoreCase) {
            return accentFoldingFiltering ? value.toLocaleLowerCase(accentFoldingFiltering) : value.toLowerCase();
        }
    } else if (value != null && kendo.isDate(value)) {
        return value.getTime();
    }
    return value;
};

const typedGetter = (prop, value, ignoreCase, accentFoldingFiltering) => {
    if (!kendo.isPresent(value)) {
        return prop;
    }

    let acc = prop;

    if (kendo.isString(value)) {
        const date = dateRegExp.exec(value);
        if (date) {
            value = new Date(+date[1]);
        } else {
            acc = a => {
                const x = prop(a);
                if (typeof x === 'string' && ignoreCase) {
                    return accentFoldingFiltering ? x.toLocaleLowerCase(accentFoldingFiltering) : x.toLowerCase();
                } else {
                    return kendo.isNumeric(x) ? x + "" : x;
                }
            };
        }
    }

    if (kendo.isDate(value)) {
        return a => {
            const x = acc(a);
            return kendo.isDate(x) ? x.getTime() : x;
        };
    }
    return acc;
};

const transformFilter = ({ field, ignoreCase, value, operator = 'eq', accentFoldingFiltering }) => {
    field = !kendo.isPresent(field) ? a => a : field;

    ignoreCase = kendo.isPresent(ignoreCase) ? ignoreCase : true;

    const itemProp = typedGetter(
        kendo.isFunction(field) ? field : kendo.getter(field, true),
        value,
        ignoreCase,
        accentFoldingFiltering
    );

    value = convertValue(value, ignoreCase, accentFoldingFiltering);

    const op = kendo.isFunction(operator) ? operator : operatorsMap[operator];

    return a => op(itemProp(a), value, ignoreCase);
};

const isCompositeFilterDescriptor = (source) => kendo.isPresent(source.filters);

const transformCompositeFilter = (filter) => {
    const accentFoldingFiltering = filter.accentFoldingFiltering;
    const combiner = logic[filter.logic || 'and'];
    return filter.filters
        .filter(kendo.isPresent)
        .map(x => (isCompositeFilterDescriptor(x) ? transformCompositeFilter(extendAccentFolding(x, accentFoldingFiltering)) : transformFilter(extendAccentFolding(x, accentFoldingFiltering))))
        .reduce(combiner.concat, combiner.identity);
};

const extendAccentFolding = (filter, accentFoldingFiltering) => (kendo.isPresent(accentFoldingFiltering) ? Object.assign(filter, { accentFoldingFiltering }) : filter);

export const filterExprNoEval = function(expr) {
    return transformCompositeFilter(expr);
};