
// utils
function cache(getter, validator) {
    var result = null;
    var lastValue;

    return function(value, force) {
        if (force || !result || !validator(result, value, lastValue)) {
            result = getter(value, lastValue);
        }

        lastValue = value;
        return result;
    }
}

function whenChanged(getter, callback) {
    var current;

    return function(force) {
        var theNew = getter(force);

        if (theNew !== current) {
            current = theNew;
            callback(theNew, force);
        }
    }
}

function range(itemAt, count, mapper) {
    return function(index) {
        var map = mapper();
        var items = [];

        for (var i = index, length = index + count; i < length; i++) {
            items.push(map(itemAt(i, index), i));
        }

        return items;
    }
}

function map2(callback) {
    return function(arr1, arr2) {
        for (var i = 0, len = arr1.length; i < len; i++) {
            callback(arr1[i], arr2[i]);
        }
    }
}

function reshift(items, diff) {
    var range;

    if (diff > 0) { // down
        range = items.splice(0, diff);
        items.push.apply(items, range);
    } else { // up
        range = items.splice(diff, -diff);
        items.unshift.apply(items, range);
    }

    return range;
}

function reorderList(list, reorder) {
    var length = list.length;
    var currentOffset = -Infinity;
    reorder = map2(reorder);

    return function(list2, offset, force) {
        var diff = offset - currentOffset;
        var range, range2;

        if (force || Math.abs(diff) >= length) { // full reorder
            range = list;
            range2 = list2;
        } else { // partial reorder
            range = reshift(list, diff);
            range2 = diff > 0 ? list2.slice(-diff) : list2.slice(0, -diff);
        }

        reorder(range, range2);

        currentOffset = offset;
    }
}

function scombine(func1, func2) {
    return function(arg, arg2) {
        return func1(arg, func2(arg, arg2));
    }
}

// domain

function listValidator(listScreens, screenHeight, threshold) {
    var downThreshold = (listScreens - 1 - threshold) * screenHeight;
    var upThreshold = threshold * screenHeight;

    return function(list, scrollTop, lastScrollTop) {
        if (scrollTop > lastScrollTop) {
            return scrollTop - list.top < downThreshold;
        } else {
            return list.top === 0 || scrollTop - list.top > upThreshold;
        }
    }
}

// in pixels
function bufferSizes(screenHeight, listScreens, opposite) {
    return {
        down: screenHeight * opposite,
        up: screenHeight * (listScreens - 1 - opposite)
    };
}

function itemCount(screenHeight, listScreens, itemHeight) {
    return Math.ceil(screenHeight * listScreens / itemHeight);
}

function indexConstraint(itemCount, itemHeight, total) {
    return function(position) {
        return Math.min(total - itemCount, Math.max(0, Math.floor(position / itemHeight )));
    }
}

function listIndex(constrain, buffers) {
    return function(scrollTop, lastScrollTop) {
        return constrain(scrollTop - ((scrollTop > lastScrollTop) ? buffers.down : buffers.up));
    };
}

function listAt(index, range) {
    return function(scrollTop, lastScrollTop) {
        var items = range(index(scrollTop, lastScrollTop));
        return {
            index: items[0].index,
            top: items[0].top,
            items: items
        }
    }
}

function itemMapper(height) {
    return function() {
        var group = null;

        return function(item, index) {
            var newGroup;
            if (item) {
                newGroup = index == 0 || (group && group !== item.group);
                group = item.group;
            }

            return {
                item: item ? item.item : null,
                group: item ? item.group : null,
                index: index,
                top: index * height,
                newGroup: newGroup
            };
        }
    }
}

function listItems(screenHeight, itemCount, getter, options) {
    return cache(
        listAt(
            listIndex(
                indexConstraint(
                    itemCount,
                    options.itemHeight,
                    options.source.total()
                ),
                bufferSizes(
                    screenHeight,
                    options.listScreens,
                    options.oppositeBuffer
                )
            ),
            range(
                getter,
                itemCount,
                itemMapper(options.itemHeight)
            )
        ),
        listValidator(options.listScreens, screenHeight, options.threshold)
    );
}

// Rendering

function position(element, y) {
    element.style.webkitTransform = 'translateY(' + y + "px)";
    element.style.transform = 'translateY(' + y + "px)";
}

function div(theParent, className) {
    var element = document.createElement('div');
    if (className) {
        element.className = className;
    }
    theParent.appendChild(element);

    return element;
}

function fill(element, count) {
    var items = [];
    while(count-- > 0) {
        items.push(div(element));
    }

    return items;
}

function heightPad(element) {
    var currentHeight, heightContainer;

    return function setHeight(height) {
        if (!heightContainer) {
            heightContainer = div(element, "height-container");
        }

        if (currentHeight !== height) {
            heightContainer.innerHTML = "";

            while (height > 0) {
                var padHeight = Math.min(height, 250000);
                div(heightContainer).style.height = padHeight + "px";
                height -= padHeight;
            }

            currentHeight = height;
        }
    }
}

function render(element, item) {
    if (!item.item) {
        item.item = { text: "loading... " + item.index };
    }

    if (!element.childNodes.length) { // new render
        div(element).innerHTML = item.item.text;
        if (item.newGroup) {
            div(element, "group").innerHTML = item.group;
        }
    } else {
        element.childNodes[0].innerHTML = item.item.text;

        if (item.newGroup) {
            if (element.childNodes.length === 2) {
                element.childNodes[1].innerHTML = item.group;
            } else {
                div(element, "group").innerHTML = item.group;
            }
        } else {
            if (element.childNodes.length === 2) {
                element.removeChild(element.childNodes[1]);
            }
        }
    }

    position(element, item.top);
}

function syncList(reorder) {
    return function(list, force) {
        reorder(list.items, list.index, force);
        return list;
    };
}

function scrollCallback(element, callback) {
    return function(force) {
        return callback(element.scrollTop, force);
    }
}

function fixedHeader(element, itemHeight) {
    var header = div(element, "header")

    var theGroup = null;

    return function(scrollTop, list) {
        var firstVisibleItemIndex = Math.floor((scrollTop - list.top) / itemHeight);
        var firstVisibleItem = list.items[firstVisibleItemIndex];

        if (firstVisibleItem.item) {
            var firstVisibleGroup = firstVisibleItem.group;

            if (firstVisibleGroup !== theGroup) {
                header.innerHTML = "";
                div(header, "group").innerHTML = firstVisibleGroup;
                theGroup = firstVisibleGroup;
            }
        }

        return list;
    }
}

function virtualList(element, options) {
    var screenHeight = element.offsetHeight;
    var theItemCount = itemCount(screenHeight, options.listScreens, options.itemHeight);
    var elements = fill(div(element, "wrapper"), theItemCount);

    var renderItems;

    options.source.one("change", function() {

        var getter = itemAt(options.source, theItemCount, function() {
            renderItems(true);
        });

        heightPad(element)(options.itemHeight * options.source.total());

        var onScroll = scombine(
            fixedHeader(element, options.itemHeight),
            listItems(screenHeight, theItemCount, getter, options)
        );

        renderItems = whenChanged(
            scrollCallback(element, onScroll),
            syncList(reorderList(elements, render))
        );

        renderItems();
    });

    options.source.read();

    element.addEventListener("scroll", function(e) {
        renderItems();
    });
}

function itemAt(source, pageSize, dataAvailable) {
    var lastRequestedRange = null;
    var flatGroups = {};

    var mute = false;

    source.bind("change", function() {
        if (!mute) {
            dataAvailable();
        }
    });

    return function(index, rangeStart) {
        if (!source.inRange(rangeStart, pageSize)) {
            if (lastRequestedRange !== rangeStart) {
                lastRequestedRange = rangeStart;
                source.range(rangeStart, pageSize);
            }

            return null;
        } else {
            if (source.skip() !== rangeStart) {
                mute = true;
                source.range(rangeStart, pageSize);
                mute = false;
            }

            if (!flatGroups[rangeStart]) {
                var flatGroup = flatGroups[rangeStart] = [];
                var groups = source.view();
                for (var i = 0, len = groups.length; i < len; i++) {
                    var group = groups[i];
                    for (var j = 0, groupLength = group.items.length; j < groupLength; j++) {
                        flatGroup.push({ item: group.items[j], group: group.value });
                    }
                }
            }

            var result = flatGroups[rangeStart][index - rangeStart];
            return result;
        }
    }
}


// example


function groupedData(options) {
    var groupsDict = {};
    var groups = [];

    for (var i = options.skip, len = options.skip + options.take; i < len; i++) {
        var key = Math.floor(i / 30) * 30;
        var group;

        if (!groupsDict[key]) {
            groupsDict[key] = {
                field: "number",
                items: [],
                hasSubgroups: false,
                value: key + " - " + (key + 30)
            }

            groups.push(groupsDict[key]);
        }

        groupsDict[key].items.push({
            text: " Item " + i
        });
    }

    return groups;
}

var ds = new kendo.data.DataSource({
    transport: {
        read: function(options) {
            setTimeout(function() {
                options.success({ groups: groupedData(options.data), hasSubgroups: false, total: 100000 });
            }, 900);
        }
    },

    serverGrouping: true,
    serverPaging: true,
    pageSize: 10,
    group: { field: "text" },
    schema: {
        groups: function(response) {
            return response.groups;
        },
        total: "total"
    }
});

// items will be drawn to build a list 4 times taller than the screen. Increase number to decrease redraws
var LIST_SCREENS = 4;

// when less than THRESHOLD * SCREEN_SIZE remains at the scroll direction, the list will be updated
var THRESHOLD = 0.5;

// one screen will be kept at the opposite scroll direction
var OPPOSITE_BUFFER = 1;

var ITEM_HEIGHT = 40;

var vl = virtualList(document.getElementById("container"), {
    source: ds,
    listScreens: LIST_SCREENS,
    threshold: THRESHOLD,
    itemHeight: ITEM_HEIGHT,
    oppositeBuffer: OPPOSITE_BUFFER
});
