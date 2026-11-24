export function replaceInRanges(ranges, data, item, observable) {
    let idx;
    for (idx = 0; idx < ranges.length; idx++) {
        if (ranges[idx].data === data) {
            break;
        }
        if (replaceInRange(ranges[idx].data, item, observable)) {
            break;
        }
    }
}
export function replaceInRange(items, item, observable) {
    let idx;
    let length;
    for (idx = 0, length = items.length; idx < length; idx++) {
        if (items[idx] && items[idx].hasSubgroups) {
            return replaceInRange(items[idx].items || [], item, observable);
        }
        else if (items[idx] === item || items[idx] === observable) {
            items[idx] = observable;
            return true;
        }
    }
}
export function replaceWithObservable(view, data, ranges, type, serverGrouping) {
    let viewIndex;
    let length;
    let idx;
    for (viewIndex = 0, length = view.length; viewIndex < length; viewIndex++) {
        const item = view[viewIndex];
        if (!item || item instanceof type) {
            continue;
        }
        if (item.hasSubgroups !== undefined && !serverGrouping) {
            replaceWithObservable(item.items || [], data, ranges, type, serverGrouping);
        }
        else {
            for (idx = 0; idx < data.length; idx++) {
                if (data[idx] === item) {
                    view[viewIndex] = data.at(idx);
                    replaceInRanges(ranges, data, item, view[viewIndex]);
                    break;
                }
            }
        }
    }
}
export function removeModel(data, model) {
    if (!data) {
        return;
    }
    const length = data.length;
    let dataItem;
    let idx;
    for (idx = 0; idx < length; idx++) {
        dataItem = data[idx];
        if (dataItem.uid && dataItem.uid == model.uid) {
            data.splice(idx, 1);
            return dataItem;
        }
    }
}
export function indexOfPristineModel(data, model) {
    if (model) {
        return indexOf(data, function (item) {
            return Boolean(item.uid && item.uid == model.uid) || (item[model.idField] === model.id && model.id !== model._defaultId);
        });
    }
    return -1;
}
export function indexOfModel(data, model) {
    if (model) {
        return indexOf(data, function (item) {
            return Boolean(item.uid == model.uid);
        });
    }
    return -1;
}
export function indexOf(data, comparer) {
    let idx;
    let length;
    if (!data) {
        return -1;
    }
    for (idx = 0, length = data.length; idx < length; idx++) {
        if (comparer(data[idx])) {
            return idx;
        }
    }
    return -1;
}
