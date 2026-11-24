import { isFunction } from "../common.js";
import { LazyObservableArray } from "../lazy-observable-array.js";
const asGroupCollection = (items) => items;
export function fillLastGroup(originalGroup, newGroup) {
    let i;
    let currOriginal;
    let currentNew;
    if (newGroup.items && newGroup.items.length) {
        for (i = 0; i < newGroup.items.length; i++) {
            currOriginal = originalGroup.items[originalGroup.items.length - 1];
            currentNew = newGroup.items[i];
            if (currOriginal && currentNew) {
                if (currOriginal.hasSubgroups && currOriginal.value == currentNew.value) {
                    fillLastGroup(currOriginal, currentNew);
                }
                else if (currOriginal.field && currOriginal.value == currentNew.value) {
                    currOriginal.items.omitChangeEvent = true;
                    currOriginal.items.push.apply(currOriginal.items, currentNew.items);
                    currOriginal.items.omitChangeEvent = false;
                }
                else {
                    originalGroup.items.omitChangeEvent = true;
                    originalGroup.items.push.apply(originalGroup.items, [currentNew]);
                    originalGroup.items.omitChangeEvent = false;
                }
            }
            else if (currentNew) {
                originalGroup.items.omitChangeEvent = true;
                originalGroup.items.push.apply(originalGroup.items, [currentNew]);
                originalGroup.items.omitChangeEvent = false;
            }
        }
    }
}
export function mergeGroups(target, dest, skip, take) {
    let group;
    let idx = 0;
    let items;
    while (dest.length && take) {
        group = dest[idx];
        items = group.items;
        const length = items.length;
        if (target && target.field === group.field && target.value === group.value) {
            if (target.hasSubgroups && target.items.length) {
                mergeGroups(target.items[target.items.length - 1], asGroupCollection(group.items), skip, take);
            }
            else {
                items = items.slice(skip, skip + take);
                target.items = target.items.concat(items);
            }
            dest.splice(idx--, 1);
        }
        else if (group.hasSubgroups && items.length) {
            mergeGroups(group, asGroupCollection(items), skip, take);
            if (!group.items.length) {
                dest.splice(idx--, 1);
            }
        }
        else {
            items = items.slice(skip, skip + take);
            group.items = items;
            if (!group.items.length) {
                dest.splice(idx--, 1);
            }
        }
        if (items.length === 0) {
            skip -= length;
        }
        else {
            skip = 0;
            take -= items.length;
        }
        if (++idx >= dest.length) {
            break;
        }
    }
    if (idx < dest.length) {
        dest.splice(idx, dest.length - idx);
    }
}
export function flatGroups(groups, indexFunction) {
    let groupIndex;
    let itemIndex;
    let result = [];
    const sourceGroups = groups || [];
    const groupsLength = sourceGroups.length;
    let group;
    let items;
    const indexFn = isFunction(indexFunction) ? indexFunction : function (array, index) {
        return array[index];
    };
    for (groupIndex = 0; groupIndex < groupsLength; groupIndex++) {
        group = indexFn(sourceGroups, groupIndex);
        if (group.hasSubgroups) {
            result = result.concat(flatGroups(group.items));
        }
        else {
            items = group.items;
            for (itemIndex = 0; itemIndex < items.length; itemIndex++) {
                result.push(indexFn(items, itemIndex));
            }
        }
    }
    return result;
}
export function flattenGroups(data) {
    let idx;
    let result = [];
    let length;
    let items;
    let itemIndex;
    for (idx = 0, length = data.length; idx < length; idx++) {
        const group = data.at(idx);
        if (group?.items) {
            if (group.hasSubgroups) {
                result = result.concat(flattenGroups(group.items));
            }
            else {
                items = group.items;
                for (itemIndex = 0; itemIndex < items.length; itemIndex++) {
                    result.push(items.at(itemIndex));
                }
            }
        }
    }
    return result;
}
export function wrapGroupItems(data, model) {
    let idx;
    let length;
    let group;
    if (model) {
        for (idx = 0, length = data.length; idx < length; idx++) {
            group = data.at(idx);
            if (group?.items) {
                if (group.hasSubgroups) {
                    wrapGroupItems(group.items, model);
                }
                else {
                    group.items = new LazyObservableArray(group.items, model, group.items._events);
                }
            }
        }
    }
}
export function eachGroupItems(data, func) {
    let idx;
    for (idx = 0; idx < data.length; idx++) {
        if (data[idx].hasSubgroups) {
            if (eachGroupItems(data[idx].items, func)) {
                return true;
            }
        }
        else if (func(data[idx].items, data[idx])) {
            return true;
        }
    }
}
