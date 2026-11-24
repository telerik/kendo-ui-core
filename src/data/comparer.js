import { getter, isFunction } from "./common.js";
const identitySelector = value => value;
const toSelector = (field) => {
    if (typeof field === "string") {
        return getter(field);
    }
    return isFunction(field) ? field : identitySelector;
};
const hasLocaleCompare = (value) => {
    if (typeof value === "string") {
        return true;
    }
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const candidate = value;
    return typeof candidate.localeCompare === "function";
};
const isDateLike = (value) => {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const candidate = value;
    return typeof candidate.getTime === "function";
};
const asOrderedValue = (value) => value;
const getPosition = (value) => value.__position;
const compareLocaleValues = (valueA, valueB) => {
    if (typeof valueA === "string") {
        return valueA.localeCompare(String(valueB));
    }
    return valueA.localeCompare(valueB);
};
const compareSelectedValues = (valueA, valueB) => {
    if (valueA == null && valueB == null) {
        return 0;
    }
    if (valueA == null) {
        return -1;
    }
    if (valueB == null) {
        return 1;
    }
    if (hasLocaleCompare(valueA)) {
        return compareLocaleValues(valueA, valueB);
    }
    const left = asOrderedValue(valueA);
    const right = asOrderedValue(valueB);
    return left > right ? 1 : left < right ? -1 : 0;
};
const normalizeStableValues = (valueA, valueB) => {
    if (isDateLike(valueA) && isDateLike(valueB)) {
        return [valueA.getTime(), valueB.getTime()];
    }
    return [valueA, valueB];
};
const compareByField = (field) => {
    const selector = toSelector(field);
    return (a, b) => compareSelectedValues(selector(a), selector(b));
};
const createComparer = (sort) => {
    const compare = sort.compare ?? compareByField(sort.field);
    if (sort.dir === "desc") {
        return (a, b) => compare(b, a, true);
    }
    return compare;
};
const combineComparers = (comparers) => {
    return (a, b) => {
        let result = comparers[0](a, b);
        let idx;
        let length;
        for (idx = 1, length = comparers.length; idx < length; idx++) {
            result = result || comparers[idx](a, b);
        }
        return result;
    };
};
const stableAsc = (field) => {
    const selector = toSelector(field);
    return (a, b) => {
        let [valueA, valueB] = normalizeStableValues(selector(a), selector(b));
        if (valueA === valueB) {
            return getPosition(a) - getPosition(b);
        }
        if (valueA == null) {
            return -1;
        }
        if (valueB == null) {
            return 1;
        }
        if (hasLocaleCompare(valueA)) {
            return compareLocaleValues(valueA, valueB);
        }
        const left = asOrderedValue(valueA);
        const right = asOrderedValue(valueB);
        return left > right ? 1 : -1;
    };
};
const stableDesc = (field) => {
    const selector = toSelector(field);
    return (a, b) => {
        let [valueA, valueB] = normalizeStableValues(selector(a), selector(b));
        if (valueA === valueB) {
            return getPosition(a) - getPosition(b);
        }
        if (valueA == null) {
            return 1;
        }
        if (valueB == null) {
            return -1;
        }
        if (hasLocaleCompare(valueB)) {
            return compareLocaleValues(valueB, valueA);
        }
        const left = asOrderedValue(valueA);
        const right = asOrderedValue(valueB);
        return left < right ? 1 : -1;
    };
};
export const Comparer = {
    selector: toSelector,
    compare: compareByField,
    create: createComparer,
    combine: combineComparers
};
export const StableComparer = {
    ...Comparer,
    asc: stableAsc,
    desc: stableDesc,
    create(sort) {
        return sort.dir === "desc" ? stableDesc(sort.field) : stableAsc(sort.field);
    }
};
