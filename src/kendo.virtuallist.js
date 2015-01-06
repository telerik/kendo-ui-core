(function(f, define){
    define([ "./kendo.data" ], f);
})(function(){

var __meta__ = {
    id: "virtuallist",
    name: "VirtualList",
    category: "framework",
    depends: [ "data" ],
    hidden: true
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        DataBoundWidget = ui.DataBoundWidget,

        VIRTUALLIST = "k-virtual-list",
        WRAPPER = "k-wrapper",
        HEADER = "k-header",
        VIRTUALITEM = "k-virtual-item",
        HEIGHTCONTAINER = "k-height-container",
        GROUPITEM = "k-group";

    function getItemCount(screenHeight, listScreens, itemHeight) {
        return Math.ceil(screenHeight * listScreens / itemHeight);
    }

    function appendChild(parent, className) {
        var element = document.createElement("div");
        if (className) {
            element.className = className;
        }
        parent.appendChild(element);

        return element;
    }

    function itemAt(dataSource, pageSize, dataAvailableCallback) {
        var lastRequestedRange = null;
        var flatGroups = {};

        var mute = false;

        dataSource.bind("change", function() {
            if (!mute) {
                dataAvailableCallback();
            }
        });

        return function(index, rangeStart) {
            if (!dataSource.inRange(rangeStart, pageSize)) {
                if (lastRequestedRange !== rangeStart) {
                    lastRequestedRange = rangeStart;
                    dataSource.range(rangeStart, pageSize);
                }

                return null;
            } else {
                if (dataSource.skip() !== rangeStart) {
                    mute = true;
                    dataSource.range(rangeStart, pageSize);
                    mute = false;
                }

                if (!flatGroups[rangeStart]) {
                    var flatGroup = flatGroups[rangeStart] = [];
                    var groups = dataSource.view();
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
        };
    }

    function bufferSizes(screenHeight, listScreens, opposite) { //in pixels
        return {
            down: screenHeight * opposite,
            up: screenHeight * (listScreens - 1 - opposite)
        };
    }

    function indexConstraint(itemCount, itemHeight, total) {
        return function(position) {
            return Math.min(total - itemCount, Math.max(0, Math.floor(position / itemHeight )));
        };
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
            };
        };
    }

    function itemMapper(height) {
        return function() {
            var group = null;

            return function(item, index) {
                var newGroup;
                if (item) {
                    newGroup = index === 0 || (group && group !== item.group);
                    group = item.group;
                }

                return {
                    item: item ? item.item : null,
                    group: item ? item.group : null,
                    index: index,
                    top: index * height,
                    newGroup: newGroup
                };
            };
        };
    }

    function range(itemAt1, count, mapper) {
        return function(index) {
            var map = mapper();
            var items = [];

            for (var i = index, length = index + count; i < length; i++) {
                items.push(map(itemAt1(i, index), i));
            }

            return items;
        };
    }

    function listValidator(listScreens, screenHeight, threshold) {
        var downThreshold = (listScreens - 1 - threshold) * screenHeight;
        var upThreshold = threshold * screenHeight;

        return function(list, scrollTop, lastScrollTop) {
            if (scrollTop > lastScrollTop) {
                return scrollTop - list.top < downThreshold;
            } else {
                return list.top === 0 || scrollTop - list.top > upThreshold;
            }
        };
    }

    function cache(getter, validator) {
        var result = null;
        var lastValue;

        return function(value, force) {
            if (force || !result || !validator(result, value, lastValue)) {
                result = getter(value, lastValue);
            }

            lastValue = value;
            return result;
        };
    }

    function scrollCallback(element, callback) {
        return function(force) {
            return callback(element.scrollTop, force);
        };
    }

    function syncList(reorder) {
        return function(list, force) {
            reorder(list.items, list.index, force);
            return list;
        };
    }

    function position(element, y) {
        element.style.webkitTransform = 'translateY(' + y + "px)";
        element.style.transform = 'translateY(' + y + "px)";
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
        };
    }

    function map2(callback, templates) {
        return function(arr1, arr2) {
            for (var i = 0, len = arr1.length; i < len; i++) {
                callback(arr1[i], arr2[i], templates);
            }
        };
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

    function range(itemAt1, count, mapper) {
        return function(index) {
            var map = mapper();
            var items = [];

            for (var i = index, length = index + count; i < length; i++) {
                items.push(map(itemAt1(i, index), i));
            }

            return items;
        };
    }

    var VirtualList = DataBoundWidget.extend({
        init: function(element, options) {
            var that = this,
                screenHeight = that.screenHeight = element.height(),
                itemCount;

            Widget.fn.init.call(that, element, options);

            options = that.options;
            itemCount = that.itemCount = getItemCount(screenHeight, options.listScreens, options.itemHeight);

            that.element.addClass(VIRTUALLIST);
            that.header = appendChild(element[0], HEADER);

            that._templates();
            that._items = that._generateItems(appendChild(element[0], WRAPPER), itemCount);

            that.setDataSource(options.dataSource);

            if (options.autoBind) {
                that.dataSource.read();
            }

            element.on("scroll", function() {
                that._renderItems();
            });

            if (!that.wrapper) {
                kendo.ui.progress(that.element, true);
            }
        },

        options: {
            name: "VirtualList",
            autoBind: true,
            listScreens: 4,
            threshold: 0.5,
            itemHeight: 40,
            oppositeBuffer: 1,
            template: "#:data#",
            placeholderTemplate: "loading...",
            groupTemplate: "#:group#",
            fixedGroupTemplate: "fixed header template"
        },

        setOptions: function(options) {
            Widget.fn.setOptions.call(this, options);
        },

        items: function() {
            return this._items;
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
        },

        setDataSource: function(source) {
            var that = this,
                dataSource = source || {};

            dataSource = $.isArray(dataSource) ? {data: dataSource} : dataSource;

            that.dataSource = kendo.data.DataSource.create(dataSource)
                                    .one("change", function() {
                                        kendo.ui.progress(that.element, false);
                                        that._createList();
                                    });
        },

        _templates: function() {
            var templates = {
                template: this.options.template,
                placeholderTemplate: this.options.placeholderTemplate,
                groupTemplate: this.options.groupTemplate,
                fixedGroupTemplate: this.options.fixedGroupTemplate
            };

            for (var key in templates) {
                if (typeof templates[key] !== "function") {
                    templates[key] = kendo.template(templates[key]);
                }
            }

            this.templates = templates;
        },

        _generateItems: function(element, count) {
            var items = [];

            while(count-- > 0) {
                items.push(appendChild(element, VIRTUALITEM));
            }

            return items;
        },

        _createList: function() {
            var element = this.element.get(0),
                options = this.options,
                itemCount = this.itemCount,
                dataSource = this.dataSource;

            this._setHeight(options.itemHeight * dataSource.total());

            var that = this;
            this.getter = this._getter(function() {
                that._renderItems(true);
            });

            this._onScroll = function(scrollTop, force) {
                var getList = that._listItems(that.getter);
                return that._fixedHeader(scrollTop, getList(scrollTop, force));
            };

            this._renderItems = this._whenChanged(
                scrollCallback(element, this._onScroll),
                syncList(this._reorderList(this._items, this._render))
            );

            this._renderItems();
        },

        _setHeight: function(height) {
            var currentHeight,
                heightContainer = this.heightContainer;

            if (!heightContainer) {
                heightContainer = this.heightContainer = appendChild(this.element[0], HEIGHTCONTAINER);
            } else {
                currentHeight = heightContainer.height();
            }

            if (height !== currentHeight) {
                heightContainer.innerHTML = "";

                while (height > 0) {
                    var padHeight = Math.min(height, 250000); //IE workaround, should not create elements with height larger than 250000px
                    appendChild(heightContainer).style.height = padHeight + "px";
                    height -= padHeight;
                }
            }
        },

        _getter: function(dataAvailableCallback) {
            var lastRequestedRange = null,
                dataSource = this.dataSource,
                pageSize = this.itemCount,
                flatGroups = {},
                mute = false;

            dataSource.bind("change", function() {
                if (!mute) {
                    dataAvailableCallback();
                }
            });

            return function(index, rangeStart) {
                if (!dataSource.inRange(rangeStart, pageSize)) {
                    if (lastRequestedRange !== rangeStart) {
                        lastRequestedRange = rangeStart;
                        dataSource.range(rangeStart, pageSize);
                    }

                    return null;
                } else {
                    if (dataSource.skip() !== rangeStart) {
                        mute = true;
                        dataSource.range(rangeStart, pageSize);
                        mute = false;
                    }

                    if (!flatGroups[rangeStart]) {
                        var flatGroup = flatGroups[rangeStart] = [];
                        var groups = dataSource.view();
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
            };
        },

        _fixedHeader: function(scrollTop, list) {
            var group = this.currentVisibleGroup,
                itemHeight = this.options.itemHeight,
                firstVisibleDataItemIndex = Math.floor((scrollTop - list.top) / itemHeight),
                firstVisibleDataItem = list.items[firstVisibleDataItemIndex];

            if (firstVisibleDataItem.item) {
                var firstVisibleGroup = firstVisibleDataItem.group;

                if (firstVisibleGroup !== group) {
                    this.header.innerHTML = "";
                    appendChild(this.header, GROUPITEM).innerHTML = firstVisibleGroup;
                    this.currentVisibleGroup = firstVisibleGroup;
                }
            }

            return list;
        },

        _listItems: function(getter) {
            var screenHeight = this.screenHeight,
                itemCount= this.itemCount,
                options = this.options;

            return cache(
                listAt(
                    listIndex(
                        indexConstraint(
                            itemCount,
                            options.itemHeight,
                            options.dataSource.total()
                        ),
                        this._bufferSizes()
                    ),
                    range(
                        getter,
                        itemCount,
                        itemMapper(options.itemHeight)
                    )
                ),
                listValidator(options.listScreens, screenHeight, options.threshold)
            );
        },

        _whenChanged: function(getter, callback) {
            var current;

            return function(force) {
                var theNew = getter(force);

                if (theNew !== current) {
                    current = theNew;
                    callback(theNew, force);
                }
            };
        },

        _reorderList: function(list, reorder) {
            var length = list.length;
            var currentOffset = -Infinity;
            reorder = map2(reorder, this.templates);

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
            };
        },

        _render: function (element, item, templates) {
            var itemTemplate = templates.template;

            element = $(element);

            if (!item.item) {
                itemTemplate = templates.placeholderTemplate;
            }

            if (!element.children().length) { // new render
                element.html(itemTemplate(item.item || {}));
                if (item.newGroup) {
                    $("<div class=" + GROUPITEM + "></div>")
                        .appendTo(element)
                        .html(templates.groupTemplate({ group: item.group }));
                }
            } else {
                element.children().first().html(itemTemplate(item.item || {}));

                if (item.newGroup) {
                    if (element.children().length === 2) {
                        element.find("." + GROUPITEM)
                            .html(templates.groupTemplate({ group: item.group }));
                    } else {
                        $("<div class=" + GROUPITEM + "></div>")
                            .appendTo(element)
                            .html(templates.groupTemplate({ group: item.group }));
                    }
                } else {
                    if (element.children().length === 2) {
                        element.find("." + GROUPITEM).remove();
                    }
                }
            }

            position(element[0], item.top);
        },

        _bufferSizes: function() {
            var options = this.options;

            return bufferSizes(this.screenHeight, options.listScreens, options.oppositeBuffer);
        },

        _indexConstraint: function(position) {
            var itemCount = this.itemCount,
                itemHeight = this.options.itemHeight,
                total = this.dataSource.total();

            return Math.min(total - itemCount, Math.max(0, Math.floor(position / itemHeight )));
        },

        _listIndex: function(scrollTop, lastScrollTop) {
            var buffers = this._bufferSizes(),
                position;

            position = scrollTop - ((scrollTop > lastScrollTop) ? buffers.down : buffers.up);

            return this._indexConstraint(position);
        }

    });

    kendo.ui.VirtualList = VirtualList;

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
