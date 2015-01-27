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
        CONTENT = "k-virtual-content",
        HEADER = "k-virtual-header",
        VIRTUALITEM = "k-virtual-item",
        HEIGHTCONTAINER = "k-height-container",
        GROUPITEM = "k-group",

        SELECTED = "k-state-selected",
        CHANGE = "change",
        CLICK = "click",
        LISTBOUND = "listBound",
        ITEMCHANGE = "itemChange";

    function getItemCount(screenHeight, listScreens, itemHeight) {
        return Math.ceil(screenHeight * listScreens / itemHeight);
    }

    function appendChild(parent, className, tagName) {
        var element = document.createElement(tagName || "div");
        if (className) {
            element.className = className;
        }
        parent.appendChild(element);

        return element;
    }

    function bufferSizes(screenHeight, listScreens, opposite) { //in pixels
        return {
            down: screenHeight * opposite,
            up: screenHeight * (listScreens - 1 - opposite)
        };
    }

    function listValidator(options, screenHeight) {
        var downThreshold = (options.listScreens - 1 - options.threshold) * screenHeight;
        var upThreshold = options.threshold * screenHeight;

        return function(list, scrollTop, lastScrollTop) {
            if (scrollTop > lastScrollTop) {
                return scrollTop - list.top < downThreshold;
            } else {
                return list.top === 0 || scrollTop - list.top > upThreshold;
            }
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

    function map2(callback, templates) {
        return function(arr1, arr2) {
            for (var i = 0, len = arr1.length; i < len; i++) {
                callback(arr1[i], arr2[i], templates);
                if (arr2[i].item) {
                    this.trigger(ITEMCHANGE, { item: $(arr1[i]), data: arr2[i].item, ns: kendo.ui });
                }
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

    function render(element, data, templates) {
        var itemTemplate = templates.template;

        element = $(element);

        if (!data.item) {
            itemTemplate = templates.placeholderTemplate;
        }

        this.angular("cleanup", function() {
            return { elements: [ element ]};
        });

        element
            .html(itemTemplate(data.item || {}))
            .attr("data-uid", data.item ? data.item.uid : "");

        element.toggleClass(SELECTED, data.selected);

        if (data.newGroup) {
            $("<div class=" + GROUPITEM + "></div>")
                .appendTo(element)
                .html(templates.groupTemplate({ group: data.group }));
        }

        position(element[0], data.top);

        this.angular("compile", function() {
            return { elements: [ element ], data: [ { dataItem: data.item, group: data.group, newGroup: data.newGroup } ]};
        });
    }

    var VirtualList = DataBoundWidget.extend({
        init: function(element, options) {
            var that = this;
            that._listCreated = false;

            Widget.fn.init.call(that, element, options);

            element = that.element;
            element.addClass(VIRTUALLIST);

            options = that.options;

            that.wrapper = element;
            that.header = appendChild(element[0], HEADER);
            that.content = appendChild(element[0], CONTENT, "ul");

            that._value = that.options.value instanceof Array ? that.options.value : [that.options.value];
            that._selectedDataItems = [];

            for (var i = 0; i < that._value.length; i++) {
                that._selectedDataItems.push(null);
            }

            that.setDataSource(options.dataSource);

            element.on("scroll", function() {
                that._renderItems();
            });

            that._selectProxy = $.proxy(that, "_select");
            element.on(CLICK, "." + VIRTUALITEM, this._selectProxy);

            if (!that._listCreated) {
                kendo.ui.progress(element, true);
            }
        },

        options: {
            name: "VirtualList",
            autoBind: true,
            height: null,
            listScreens: 4,
            threshold: 0.5,
            itemHeight: 40,
            oppositeBuffer: 1,
            type: "flat",
            selectable: true,
            value: [],
            dataValueField: null,
            template: "#:data#",
            placeholderTemplate: "loading...",
            groupTemplate: "#:group#",
            fixedGroupTemplate: "fixed header template"
        },

        events: [
            CHANGE,
            LISTBOUND,
            ITEMCHANGE
        ],

        setOptions: function(options) {
            Widget.fn.setOptions.call(this, options);
        },

        items: function() {
            return $(this._items);
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            this.element.unbind("scroll");
        },

        setDataSource: function(source) {
            var that = this,
                dataSource = source || {};

            dataSource = $.isArray(dataSource) ? {data: dataSource} : dataSource;

            that.dataSource = kendo.data.DataSource.create(dataSource);

            if (that.dataSource.view().length !== 0) {
                that.refresh();
            } else if (that.options.autoBind) {
                that.dataSource.fetch(function() {
                    kendo.ui.progress(that.element, false);
                    that.refresh();
                });
            }
        },

        _unbindDataSource: function() {
            var that = this;
        },

        refresh: function() {
            if (this.dataSource.data().length) {
                this._createList();
                this._listCreated = true;
            }

            //TODO: find a better place and name for the event
            this.trigger("listBound");
        },

        value: function(value) {
            if (value) {
                this._value = value instanceof Array ? value : [value];
                this._selectedDataItems = [];

                for (var i = 0; i < this._value.length; i++) {
                    this._selectedDataItems.push(null);
                }

                if (this._renderItems) {
                    this._renderItems(true);
                }
            } else {
                return this._value;
            }
        },

        selectedDataItems: function() {
            return this._selectedDataItems;
        },

        scrollTo: function(y) {
            this.element.scrollTop(y);
        },

        scrollToIndex: function(index) {
            this.scrollTo(index * this.options.itemHeight);
        },

        _setup: function() {
            var that = this;

            that._screenHeight();
            that.itemCount = getItemCount(that.screenHeight, that.options.listScreens, that.options.itemHeight);

            that._templates();
            that._items = that._generateItems(that.content, that.itemCount);
        },

        _screenHeight: function() {
            var height = this.options.height,
                element = this.element;

            if (height) {
                element.height(height);
            } else {
                height = element.height();
            }

            this.screenHeight = height;
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
                items.push(appendChild(element, VIRTUALITEM, "li"));
            }

            return items;
        },

        _createList: function() {
            var element = this.element.get(0),
                options = this.options,
                dataSource = this.dataSource;

            this._setup();

            this.options.type = !!dataSource.group().length ? "group" : "flat";
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
                syncList(this._reorderList(this._items, $.proxy(render, this)))
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
                lastRangeStart = dataSource.skip(),
                type = this.options.type,
                pageSize = this.itemCount,
                flatGroups = {},
                mute = false;

            dataSource.bind("change", function(e) {
                if (!mute) {
                    dataAvailableCallback();
                }
            });

            return function(index, rangeStart) {
                if (!dataSource.inRange(rangeStart, pageSize)) {
                    if (lastRequestedRange !== rangeStart) {
                        lastRequestedRange = rangeStart;
                        lastRangeStart = rangeStart;
                        dataSource.range(rangeStart, pageSize);
                    }

                    return null;
                } else {
                    if (lastRangeStart !== rangeStart) {
                        mute = true;
                        dataSource.range(rangeStart, pageSize);
                        lastRangeStart = rangeStart;
                        mute = false;
                    }


                    var result;
                    if (type === "group") { //grouped list
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

                        result = flatGroups[rangeStart][index - rangeStart];
                    } else { //flat list
                        result = dataSource.at(index - rangeStart);
                    }

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

        _itemMapper: function(item, index) {
            var listType = this.options.type,
                itemHeight = this.options.itemHeight,
                valueField = this.options.dataValueField,
                value = this._value,
                selected = false,
                newGroup = false,
                group = null,
                nullIndex = -1;

            if (value.length && item) {
                for (var i = 0; i < value.length; i++) {
                    if (value[i] === item[valueField]) {
                        if($.inArray(item, this._selectedDataItems) === -1) { /*check if item is not already added*/
                            nullIndex = this._selectedDataItems.indexOf(null);
                            if (nullIndex > -1) {
                                this._selectedDataItems.splice(nullIndex, 1, item);
                            } else {
                                this._selectedDataItems.push(item);
                            }
                        }

                        selected = true;
                        break;
                    }
                }
            }

            if (listType === "group") {
                if (item) {
                    newGroup = index === 0 || (this._currentGroup && this._currentGroup !== item.group);
                    this._currentGroup = item.group;
                }

                group = item ? item.group : null;
                item = item ? item.item : null;
            }

            return {
                item: item ? item : null,
                group: group,
                newGroup: newGroup,
                selected: selected,
                index: index,
                top: index * itemHeight
            };
        },

        _range: function(index) {
            var itemCount = this.itemCount,
                items = [];

            for (var i = index, length = index + itemCount; i < length; i++) {
                items.push(this._itemMapper(this.getter(i, index), i));
            }

            return items;
        },

        _getDataItemsCollection: function(scrollTop, lastScrollTop) {
            var items = this._range(this._listIndex(scrollTop, lastScrollTop));
            return {
                index: items[0].index,
                top: items[0].top,
                items: items
            };
        },

        _listItems: function(getter) {
            var screenHeight = this.screenHeight,
                itemCount = this.itemCount,
                options = this.options;

            var theValidator = listValidator(options, screenHeight);

            return $.proxy(function(value, force) {
                var result = this.result,
                    lastScrollTop = this._lastScrollTop;

                if (force || !result || !theValidator(result, value, lastScrollTop)) {
                    result = this._getDataItemsCollection(value, lastScrollTop);
                }

                this._lastScrollTop = value;
                this.result = result;

                return result;
            }, this);
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
            var that = this;
            var length = list.length;
            var currentOffset = -Infinity;
            reorder = $.proxy(map2(reorder, this.templates), this);

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

                reorder(range, range2, that._listCreated);

                currentOffset = offset;
            };
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
        },

        _select: function(e) {
            var singleSelection = this.options.selectable !== "multiple",
                target = $(e.target),
                valueField = this.options.dataValueField,
                dataItem = this.dataSource.getByUid(target.attr("data-uid")),
                selectedValue;

            if (dataItem) {
                selectedValue = dataItem[valueField];
            }

            if (selectedValue !== undefined) {
                if (target.hasClass(SELECTED)) {
                    target.removeClass(SELECTED);

                    this._value = singleSelection ? [] : this._value.filter(function(i) { return i != selectedValue; });
                    this._selectedDataItems = singleSelection ? [] : this._selectedDataItems.filter(function(i) { return i[valueField] != selectedValue; });
                } else {

                    if (singleSelection) {
                        this.items().removeClass(SELECTED);
                        this._value = [selectedValue];
                        this._selectedDataItems = [dataItem];
                    } else {
                        this._value.push(selectedValue);
                        this._selectedDataItems.push(dataItem);
                    }

                    target.addClass(SELECTED);
                }
            }

            this.trigger(CHANGE);
        }

    });

    kendo.ui.VirtualList = VirtualList;
    kendo.ui.plugin(VirtualList);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
