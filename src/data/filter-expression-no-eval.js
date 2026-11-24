import { propertyAccessService } from "../core/services/property-access.service.js";
import { utilsService } from "../core/services/utils.service.js";
const getter = propertyAccessService.getter.bind(propertyAccessService);
const isBlank = utilsService.isBlank.bind(utilsService);
const isPresent = utilsService.isPresent.bind(utilsService);
const isNumeric = utilsService.isNumeric.bind(utilsService);
const isFunction = utilsService.isFunction.bind(utilsService);
const asString = (value) => String(value);
const asOptionalString = (value) => String(value || "");
const asOrderedValue = (value) => value;
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
    isnullorempty: a => isBlank(a) || a === "",
    isnotnullorempty: a => isPresent(a) && a !== "",
    contains: (a, b) => asString(a).indexOf(asString(b)) >= 0,
    doesnotcontain: (a, b) => asString(a).indexOf(asString(b)) === -1,
    doesnotendwith: (a, b) => asString(a).indexOf(asString(b), asOptionalString(a).length - asOptionalString(b).length) < 0,
    doesnotstartwith: (a, b) => asString(a).lastIndexOf(asString(b), 0) === -1,
    endswith: (a, b) => asString(a).indexOf(asString(b), asOptionalString(a).length - asOptionalString(b).length) >= 0,
    eq: (a, b) => a === b,
    gt: (a, b) => asOrderedValue(a) > asOrderedValue(b),
    gte: (a, b) => asOrderedValue(a) >= asOrderedValue(b),
    isempty: a => a === "",
    isnotempty: a => a !== "",
    doesnotmatch: (a, b) => !getMatchRegExp(asString(b)).test(asString(a)),
    isnotnull: a => isPresent(a),
    isnull: a => isBlank(a),
    lt: (a, b) => asOrderedValue(a) < asOrderedValue(b),
    lte: (a, b) => asOrderedValue(a) <= asOrderedValue(b),
    matches: (a, b) => getMatchRegExp(asString(b)).test(asString(a)),
    neq: (a, b) => a != b,
    startswith: (a, b) => asString(a).lastIndexOf(asString(b), 0) === 0
};
const dateRegExp = /^\/Date\((.*?)\)\/$/;
const getMatchRegExp = (pattern) => {
    let rx = "^";
    let esc = false;
    for (let i = 0; i < pattern.length; ++i) {
        const ch = pattern.charAt(i);
        if (esc) {
            rx += "\\" + ch;
        }
        else if (ch === "~") {
            esc = true;
            continue;
        }
        else if (ch === "*") {
            rx += ".*";
        }
        else if (ch === "?") {
            rx += ".";
        }
        else if (".+^$()[]{}|\\/\n\r\u2028\u2029\u00A0".indexOf(ch) >= 0) {
            rx += "\\" + ch;
        }
        else {
            rx += ch;
        }
        esc = false;
    }
    return new RegExp(rx + "$");
};
const convertValue = (value, ignoreCase, accentFoldingFiltering) => {
    if (typeof value === "string") {
        const date = dateRegExp.exec(value);
        if (date) {
            return new Date(+date[1]).getTime();
        }
        else if (ignoreCase) {
            return accentFoldingFiltering ? value.toLocaleLowerCase(accentFoldingFiltering) : value.toLowerCase();
        }
    }
    else if (value instanceof Date) {
        return value.getTime();
    }
    return value;
};
const typedGetter = (prop, value, ignoreCase, accentFoldingFiltering) => {
    if (!isPresent(value)) {
        return prop;
    }
    let acc = prop;
    if (typeof value === "string") {
        const date = dateRegExp.exec(value);
        if (date) {
            value = new Date(+date[1]);
        }
        else {
            acc = item => {
                const x = prop(item);
                if (typeof x === "string" && ignoreCase) {
                    return accentFoldingFiltering ? x.toLocaleLowerCase(accentFoldingFiltering) : x.toLowerCase();
                }
                else {
                    return isNumeric(x) ? String(x) : x;
                }
            };
        }
    }
    if (value instanceof Date) {
        return item => {
            const x = acc(item);
            return x instanceof Date ? x.getTime() : x;
        };
    }
    return acc;
};
const transformFilter = ({ field, ignoreCase, value, operator = "eq", accentFoldingFiltering }) => {
    const resolvedField = field ?? (item => item);
    const resolvedIgnoreCase = ignoreCase ?? true;
    const itemProp = typedGetter(isFunction(resolvedField) ? resolvedField : getter(resolvedField, true), value, resolvedIgnoreCase, accentFoldingFiltering);
    const normalizedValue = convertValue(value, resolvedIgnoreCase, accentFoldingFiltering);
    const op = typeof operator === "function" ? operator : operatorsMap[operator];
    return item => op(itemProp(item), normalizedValue, resolvedIgnoreCase);
};
const isCompositeFilterDescriptor = (source) => {
    return !!source && Array.isArray(source.filters);
};
const transformCompositeFilter = (filter) => {
    const accentFoldingFiltering = filter.accentFoldingFiltering;
    const combiner = logic[filter.logic || "and"];
    const filters = filter.filters.filter((entry) => isPresent(entry));
    return filters
        .map(x => (isCompositeFilterDescriptor(x) ? transformCompositeFilter(extendAccentFolding(x, accentFoldingFiltering)) : transformFilter(extendAccentFolding(x, accentFoldingFiltering))))
        .reduce(combiner.concat, combiner.identity);
};
const extendAccentFolding = (filter, accentFoldingFiltering) => {
    return isPresent(accentFoldingFiltering) ? Object.assign(filter, { accentFoldingFiltering }) : filter;
};
export const filterExprNoEval = function (expr) {
    return transformCompositeFilter(expr);
};
