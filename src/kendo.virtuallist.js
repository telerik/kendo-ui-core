(function(f, define){
    define([ "./kendo.data" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
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
        proxy = $.proxy,

        WRAPPER = "k-virtual-wrap",
        VIRTUALLIST = "k-virtual-list",
        CONTENT = "k-virtual-content",
        LIST = "k-list",
        HEADER = "k-group-header",
        VIRTUALITEM = "k-virtual-item",
        ITEM = "k-item",
        HEIGHTCONTAINER = "k-height-container",
        GROUPITEM = "k-group",

        SELECTED = "k-state-selected",
        FOCUSED = "k-state-focused",
        HOVER = "k-state-hover",
        CHANGE = "change",
        CLICK = "click",
        LISTBOUND = "listBound",
        ITEMCHANGE = "itemChange",

        ACTIVATE = "activate",
        DEACTIVATE = "deactivate",

        VIRTUAL_LIST_NS = ".VirtualList";

    function lastFrom(array) {
        return array[array.length - 1];
    }

    function toArray(value) {
        return value instanceof Array ? value : [value];
    }

    function isPrimitive(dataItem) {
        return typeof dataItem === "string" || typeof dataItem === "number" || typeof dataItem === "boolean";
    }

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

    function getDefaultItemHeight() {
        var mockList = $('<div class="k-popup"><ul class="k-list"><li class="k-item"><li></ul></div>'),
            lineHeight;
        mockList.css({
            position: "absolute",
            left: "-200000px",
            visibility: "hidden"
        });
        mockList.appendTo(document.body);
        lineHeight = parseFloat(kendo.getComputedStyles(mockList.find(".k-item")[0], ["line-height"])["line-height"]);
        mockList.remove();

        return lineHeight;
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
        if (kendo.support.browser.msie && kendo.support.browser.version < 10) {
            element.style.top = y + "px";
        } else {
            element.style.webkitTransform = 'translateY(' + y + "px)";
            element.style.transform = 'translateY(' + y + "px)";
        }
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
            .attr("data-uid", data.item ? data.item.uid : "")
            .attr("data-offset-index", data.index)
            .html(itemTemplate(data.item || {}));

        element.toggleClass(FOCUSED, data.current);
        element.toggleClass(SELECTED, data.selected);
        element.toggleClass("k-first", data.newGroup);
        element.toggleClass("k-loading-item", !data.item);

        if (data.index !== 0 && data.newGroup) {
            $("<div class=" + GROUPITEM + "></div>")
                .appendTo(element)
                .html(templates.groupTemplate(data.group));
        }

        if (data.top !== undefined) {
            position(element[0], data.top);
        }

        this.angular("compile", function() {
            return { elements: [ element ], data: [ { dataItem: data.item, group: data.group, newGroup: data.newGroup } ]};
        });
    }

    function mapChangedItems(selected, itemsToMatch) {
        var itemsLength = itemsToMatch.length;
        var selectedLength = selected.length;
        var dataItem;
        var found;
        var i, j;

        var changed = [];
        var unchanged = [];

        if (selectedLength) {
            for (i = 0; i < selectedLength; i++) {
                dataItem = selected[i];
                found = false;

                for (j = 0; j < itemsLength; j++) {
                    if (dataItem === itemsToMatch[j]) {
                        found = true;
                        changed.push({ index: i, item: dataItem });
                        break;
                    }
                }

                if (!found) {
                    unchanged.push(dataItem);
                }
            }
        }

        return {
            changed: changed,
            unchanged: unchanged
        };
    }

    var VirtualList = DataBoundWidget.extend({
        init: function(element, options) {
            var that = this;

            that.bound(false);
            that._fetching = false;

            Widget.fn.init.call(that, element, options);

            if (!that.options.itemHeight) {
                that.options.itemHeight = getDefaultItemHeight();
            }

            options = that.options;

            that.element.addClass(LIST + " " + VIRTUALLIST).attr("role", "listbox");
            that.content = that.element.wrap("<div unselectable='on' class='" + CONTENT + "'></div>").parent();
            that.wrapper = that.content.wrap("<div class='" + WRAPPER + "'></div>").parent();
            that.header = that.content.before("<div class='" + HEADER + "'></div>").prev();

            that.element.on("mouseenter" + VIRTUAL_LIST_NS, "li:not(.k-loading-item)", function() { $(this).addClass(HOVER); })
                        .on("mouseleave" + VIRTUAL_LIST_NS, "li", function() { $(this).removeClass(HOVER); });

            that._values = toArray(that.options.value);
            that._selectedDataItems = [];
            that._selectedIndexes = [];
            that._rangesList = {};
            that._activeDeferred = null;
            that._promisesList = [];
            that._optionID = kendo.guid();

            that.setDataSource(options.dataSource);

            that.content.on("scroll" + VIRTUAL_LIST_NS, kendo.throttle(function() {
                that._renderItems();
                that._triggerListBound();
            }, options.delay));

            that._selectable();
        },

        options: {
            name: "VirtualList",
            autoBind: true,
            delay: 100,
            height: null,
            listScreens: 4,
            threshold: 0.5,
            itemHeight: null,
            oppositeBuffer: 1,
            type: "flat",
            selectable: false,
            value: [],
            dataValueField: null,
            template: "#:data#",
            placeholderTemplate: "loading...",
            groupTemplate: "#:data#",
            fixedGroupTemplate: "fixed header template",
            valueMapper: null
        },

        events: [
            CHANGE,
            CLICK,
            LISTBOUND,
            ITEMCHANGE,
            ACTIVATE,
            DEACTIVATE
        ],

        setOptions: function(options) {
            Widget.fn.setOptions.call(this, options);

            if (this._selectProxy && this.options.selectable === false) {
                this.element.off(CLICK, "." + VIRTUALITEM, this._selectProxy);
            } else if (!this._selectProxy && this.options.selectable) {
                this._selectable();
            }

            this.refresh();
        },

        items: function() {
            return $(this._items);
        },

        destroy: function() {
            this.wrapper.off(VIRTUAL_LIST_NS);
            this.dataSource.unbind(CHANGE, this._refreshHandler);
            Widget.fn.destroy.call(this);
        },

        setDataSource: function(source) {
            var that = this;
            var dataSource = source || {};
            var value;

            dataSource = $.isArray(dataSource) ? {data: dataSource} : dataSource;
            dataSource = kendo.data.DataSource.create(dataSource);

            if (that.dataSource) {
                that.dataSource.unbind(CHANGE, that._refreshHandler);

                that._clean();
                that.bound(false);

                that._deferValueSet = true;
                value = that.value();

                that.value([]);
                that.mute(function() {
                    that.value(value);
                });
            } else {
                that._refreshHandler = $.proxy(that.refresh, that);
            }

            that.dataSource = dataSource.bind(CHANGE, that._refreshHandler);

            that.setDSFilter(dataSource.filter());

            if (dataSource.view().length !== 0) {
                that.refresh();
            } else if (that.options.autoBind) {
                dataSource.fetch();
            }
        },

        skip: function() {
            return this.dataSource.currentRangeStart();
        },

        _triggerListBound: function () {
            var that = this;
            var skip = that.skip();

            if (that.bound() && !that._selectingValue && that._skip !== skip) {
                that._skip = skip;
                that.trigger(LISTBOUND);
            }
        },

        _getValues: function(dataItems) {
            var getter = this._valueGetter;

            return $.map(dataItems, function(dataItem) {
                return getter(dataItem);
            });
        },

        refresh: function(e) {
            var that = this;
            var action = e && e.action;
            var isItemChange = action === "itemchange";
            var filtered = this.isFiltered();
            var result;

            if (that._mute) { return; }

            that._deferValueSet = false;

            if (!that._fetching) {
                if (filtered) {
                    that.focus(0);
                }

                that._createList();
                if (!action && that._values.length && !filtered && !that.options.skipUpdateOnBind) {
                    that._selectingValue = true;
                    that.value(that._values, true).done(function() {
                        that.bound(true);
                        that._selectingValue = false;
                        that._triggerListBound();
                    });
                } else {
                    that.bound(true);
                    that._triggerListBound();
                }
            } else {
                if (that._renderItems) {
                    that._renderItems(true);
                }

                that._triggerListBound();
            }

            if (isItemChange || action === "remove") {
                result = mapChangedItems(that._selectedDataItems, e.items);
                if (result.changed.length) {
                    if (isItemChange) {
                        that.trigger("selectedItemChange", {
                            items: result.changed
                        });
                    } else {
                        that.value(that._getValues(result.unchanged));
                    }
                }
            }

            that._fetching = false;
        },

        removeAt: function(position) {
            this._selectedIndexes.splice(position, 1);
            this._values.splice(position, 1);

            return {
                position: position,
                dataItem: this._selectedDataItems.splice(position, 1)[0]
            };
        },

        setValue: function(value) {
            this._values = toArray(value);
        },

        value: function(value, _forcePrefetch) {
            var that = this;

            if (value === undefined) {
                return that._values.slice();
            }

            if (value === null) {
                value = [];
            }

            value = toArray(value);

            if (that.options.selectable === "multiple" && that.select().length && value.length) {
                that.select(-1);
            }

            if (!that._valueDeferred || that._valueDeferred.state() === "resolved") {
                that._valueDeferred = $.Deferred();
            }

            if (!value.length) {
                that.select(-1);
            }

            that._values = value;

            if ((that.bound() && !that._mute && !that._deferValueSet) || _forcePrefetch) {
                that._prefetchByValue(value);
            }

            return that._valueDeferred;
        },

        _prefetchByValue: function(value) {
            var that = this,
                dataView = that._dataView,
                valueGetter = that._valueGetter,
                item, match = false,
                forSelection = [];

            //try to find the items in the loaded data
            for (var i = 0; i < value.length; i++) {
                for (var idx = 0; idx < dataView.length; idx++) {
                    item = dataView[idx].item;
                    if (item) {
                        match = isPrimitive(item) ? value[i] === item : value[i] === valueGetter(item);

                        if (match) {
                            forSelection.push(dataView[idx].index);
                        }
                    }
                }
            }

            if (forSelection.length === value.length) {
                that._values = [];
                that.select(forSelection);
                return;
            }

            //prefetch the items
            if (typeof that.options.valueMapper === "function") {
                that.options.valueMapper({
                    value: (this.options.selectable === "multiple") ? value : value[0],
                    success: function(indexes) {
                        if (indexes === undefined || indexes === -1 || indexes === null) {
                            indexes = [];
                        } else {
                            indexes = toArray(indexes);
                        }

                        if (!indexes.length) {
                            indexes = [-1];
                        } else {
                            that._values = [];
                            that._selectedIndexes = [];
                            that._selectedDataItems = [];
                        }

                        that.select(indexes);
                    }
                });
            } else {
                throw new Error("valueMapper is not provided");
            }
        },

        deferredRange: function(index) {
            var dataSource = this.dataSource;
            var take = this.itemCount;
            var ranges = this._rangesList;
            var result = $.Deferred();
            var defs = [];

            var low = Math.floor(index / take) * take;
            var high = Math.ceil(index / take) * take;

            var pages = high  === low ? [ high ] : [ low, high ];

            $.each(pages, function(_, skip) {
                var end = skip + take;
                var existingRange = ranges[skip];
                var deferred;

                if (!existingRange || (existingRange.end !== end)) {
                    deferred = $.Deferred();
                    ranges[skip] = { end: end, deferred: deferred };

                    dataSource._multiplePrefetch(skip, take, function() {
                        deferred.resolve();
                    });
                } else {
                    deferred = existingRange.deferred;
                }

                defs.push(deferred);
            });

            $.when.apply($, defs).then(function() {
                result.resolve();
            });

            return result;
        },

        prefetch: function(indexes) {
            var that = this,
                take = this.itemCount,
                isEmptyList = !that._promisesList.length;

            if (!that._activeDeferred) {
                that._activeDeferred = $.Deferred();
                that._promisesList = [];
            }

            $.each(indexes, function(_, index) {
                var rangeStart = Math.floor(index / take) * take;
                that._promisesList.push(that.deferredRange(rangeStart));
            });

            if (isEmptyList) {
                $.when.apply($, that._promisesList).done(function() {
                    that._activeDeferred.resolve();
                    that._activeDeferred = null;
                    that._promisesList = [];
                });
            }

            return that._activeDeferred;
        },

        _findDataItem: function(index) {
            var view = this.dataSource.view(),
                group;

            //find in grouped view
            if (this.options.type === "group") {
                for (var i = 0; i < view.length; i++) {
                    group = view[i].items;
                    if (group.length <= index) {
                        index = index - group.length;
                    } else {
                        return group[index];
                    }
                }
            }

            //find in flat view
            return view[index];
        },

        selectedDataItems: function() {
            return this._selectedDataItems.slice();
        },

        scrollTo: function(y) {
            this.content.scrollTop(y); //works only if the element is visible
        },

        scrollToIndex: function(index) {
            this.scrollTo(index * this.options.itemHeight);
        },

        focus: function(candidate) {
            var element,
                index,
                data,
                current,
                itemHeight = this.options.itemHeight,
                id = this._optionID,
                triggerEvent = true;

            if (candidate === undefined) {
                current = this.element.find("." + FOCUSED);
                return current.length ? current : null;
            }

            if (typeof candidate === "function") {
                data = this.dataSource.flatView();
                for (var idx = 0; idx < data.length; idx++) {
                    if (candidate(data[idx])) {
                        candidate = idx;
                        break;
                    }
                }
            }

            if (candidate instanceof Array) {
                candidate = lastFrom(candidate);
            }

            if (isNaN(candidate)) {
                element = $(candidate);
                index = parseInt($(element).attr("data-offset-index"), 10);
            } else {
                index = candidate;
                element = this._getElementByIndex(index);
            }

            if (index === -1) {
                this.element.find("." + FOCUSED).removeClass(FOCUSED);
                this._focusedIndex = undefined;
                return;
            }

            if (element.length) { /*focus rendered item*/
                if (element.hasClass(FOCUSED)) {
                    triggerEvent = false;
                }
                if (this._focusedIndex !== undefined) {
                    current = this._getElementByIndex(this._focusedIndex);
                    current
                        .removeClass(FOCUSED)
                        .removeAttr("id");

                    if (triggerEvent) {
                        this.trigger(DEACTIVATE);
                    }
                }

                this._focusedIndex = index;

                element
                    .addClass(FOCUSED)
                    .attr("id", id);

                var position = this._getElementLocation(index);

                if (position === "top") {
                    this.scrollTo(index * itemHeight);
                } else if (position === "bottom") {
                    this.scrollTo((index * itemHeight + itemHeight) - this.screenHeight);
                } else if (position === "outScreen") {
                    this.scrollTo(index * itemHeight);
                }

                if (triggerEvent) {
                    this.trigger(ACTIVATE);
                }
            } else { /*focus non rendered item*/
                this._focusedIndex = index;
                this.items().removeClass(FOCUSED);
                this.scrollToIndex(index);
            }
        },

        focusIndex: function() {
            return this._focusedIndex;
        },

        focusFirst: function() {
            this.scrollTo(0);
            this.focus(0);
        },

        focusLast: function() {
            var lastIndex = this.dataSource.total();
            this.scrollTo(this.heightContainer.offsetHeight);
            this.focus(lastIndex);
        },

        focusPrev: function() {
            var index = this._focusedIndex;
            var current;

            if (!isNaN(index) && index > 0) {
                index -= 1;
                this.focus(index);

                current = this.focus();
                if (current && current.hasClass("k-loading-item")) {
                    index += 1;
                    this.focus(index);
                }

                return index;
            } else {
                index = this.dataSource.total() - 1;
                this.focus(index);
                return index;
            }
        },

        focusNext: function() {
            var index = this._focusedIndex;
            var lastIndex = this.dataSource.total() - 1;
            var current;

            if (!isNaN(index) && index < lastIndex) {
                index += 1;
                this.focus(index);

                current = this.focus();
                if (current && current.hasClass("k-loading-item")) {
                    index -= 1;
                    this.focus(index);
                }

                return index;
            } else {
                index = 0;
                this.focus(index);
                return index;
            }
        },

        _triggerChange: function(removed, added) {
            removed = removed || [];
            added = added || [];

            if (removed.length || added.length) {
                this.trigger(CHANGE, {
                    removed: removed,
                    added: added
                });
            }
        },

        select: function(candidate) {
            var that = this,
                indices,
                singleSelection = that.options.selectable !== "multiple",
                prefetchStarted = !!that._activeDeferred,
                filtered = this.isFiltered(),
                isAlreadySelected,
                deferred,
                result,
                removed = [];

            if (candidate === undefined) {
                return that._selectedIndexes.slice();
            }

            indices = that._getIndecies(candidate);
            isAlreadySelected = singleSelection && !filtered && lastFrom(indices) === lastFrom(this._selectedIndexes);
            removed = that._deselectCurrentValues(indices);

            if (removed.length || !indices.length || isAlreadySelected) {
                that._triggerChange(removed);

                if (that._valueDeferred) {
                    that._valueDeferred.resolve();
                }
                return;
            }

            if (indices.length === 1 && indices[0] === -1) {
                indices = [];
            }

            result = that._deselect(indices);
            removed = result.removed;
            indices = result.indices;

            if (singleSelection) {
                that._activeDeferred = null;
                prefetchStarted = false;
                if (indices.length) {
                    indices = [lastFrom(indices)];
                }
            }

            var done = function() {
                var added = that._select(indices);

                that.focus(indices);
                that._triggerChange(removed, added);

                if (that._valueDeferred) {
                    that._valueDeferred.resolve();
                }
            };

            deferred = that.prefetch(indices);

            if (!prefetchStarted) {
                if (deferred) {
                    deferred.done(done);
                } else {
                    done();
                }
            }
        },

        bound: function(bound) {
            if (bound === undefined) {
                return this._listCreated;
            }

            this._listCreated = bound;
        },

        mute: function(callback) {
            this._mute = true;
            proxy(callback(), this);
            this._mute = false;
        },

        setDSFilter: function(filter) {
            this._lastDSFilter = $.extend({}, filter);
        },

        isFiltered: function() {
            if (!this._lastDSFilter) {
                this.setDSFilter(this.dataSource.filter());
            }

            return !kendo.data.Query.compareFilters(this.dataSource.filter(), this._lastDSFilter);
        },

        skipUpdate: $.noop,

        _getElementByIndex: function(index) {
            return this.items().filter(function(idx, element) {
                return index === parseInt($(element).attr("data-offset-index"), 10);
            });
        },

        _clean: function() {
            this.result = undefined;
            this._lastScrollTop = undefined;
            this._skip = undefined;
            $(this.heightContainer).remove();
            this.heightContainer = undefined;
            this.element.empty();
        },

        _height: function() {
            var hasData = !!this.dataSource.view().length,
                height = this.options.height,
                itemHeight = this.options.itemHeight,
                total = this.dataSource.total();

            if (!hasData) {
                height = 0;
            } else if (height/itemHeight > total) {
                height = total * itemHeight;
            }

            return height;
        },

        _screenHeight: function() {
            var height = this._height(),
                content = this.content;

            content.height(height);
            this.screenHeight = height;
        },

        _getElementLocation: function(index) {
            var scrollTop = this.content.scrollTop(),
                screenHeight = this.screenHeight,
                itemHeight = this.options.itemHeight,
                yPosition = index * itemHeight,
                yDownPostion = yPosition + itemHeight,
                screenEnd = scrollTop + screenHeight,
                position;

            if (yPosition === (scrollTop - itemHeight) || (yDownPostion > scrollTop && yPosition < scrollTop)) {
                position = "top";
            } else if (yPosition === screenEnd || (yPosition < screenEnd && screenEnd < yDownPostion)) {
                position = "bottom";
            } else if ((yPosition >= scrollTop) && (yPosition <= scrollTop + (screenHeight - itemHeight))) {
                position = "inScreen";
            } else {
                position = "outScreen";
            }

            return position;
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
            var items = [],
                item,
                itemHeight = this.options.itemHeight + "px";

            while(count-- > 0) {
                item = document.createElement("li");
                item.tabIndex = -1;
                item.className = VIRTUALITEM + " " + ITEM;
                item.setAttribute("role", "option");
                item.style.height = itemHeight;
                item.style.minHeight = itemHeight;
                element.appendChild(item);

                items.push(item);
            }

            return items;
        },

        _saveInitialRanges: function() {
            var ranges = this.dataSource._ranges;
            var deferred = $.Deferred();
            deferred.resolve();

            this._rangesList = {};
            for (var i = 0; i < ranges.length; i++) {
                this._rangesList[ranges[i].start] = { end: ranges[i].end, deferred: deferred };
            }
        },

        _createList: function() {
            var that = this,
                content = that.content.get(0),
                options = that.options,
                dataSource = that.dataSource;

            if (that.bound()) {
                that._clean();
            }

            that._saveInitialRanges();
            that._screenHeight();
            that._buildValueGetter();
            that.itemCount = getItemCount(that.screenHeight, options.listScreens, options.itemHeight);

            if (that.itemCount > dataSource.total()) {
                that.itemCount = dataSource.total();
            }

            that._templates();
            that._items = that._generateItems(that.element[0], that.itemCount);

            that._setHeight(options.itemHeight * dataSource.total());
            that.options.type = (dataSource.group() || []).length ? "group" : "flat";

            if (that.options.type === "flat") {
                that.header.hide();
            } else {
                that.header.show();
            }

            that.getter = that._getter(function() {
                that._renderItems(true);
            });

            that._onScroll = function(scrollTop, force) {
                var getList = that._listItems(that.getter);
                return that._fixedHeader(scrollTop, getList(scrollTop, force));
            };

            that._renderItems = that._whenChanged(
                scrollCallback(content, that._onScroll),
                syncList(that._reorderList(that._items, $.proxy(render, that)))
            );

            that._renderItems();
            that._calculateGroupPadding(that.screenHeight);
        },

        _setHeight: function(height) {
            var currentHeight,
                heightContainer = this.heightContainer;

            if (!heightContainer) {
                heightContainer = this.heightContainer = appendChild(this.content[0], HEIGHTCONTAINER);
            } else {
                currentHeight = heightContainer.offsetHeight;
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

        _getter: function() {
            var lastRequestedRange = null,
                dataSource = this.dataSource,
                lastRangeStart = dataSource.skip(),
                type = this.options.type,
                pageSize = this.itemCount,
                flatGroups = {};

            if (dataSource.pageSize() < pageSize) {
                this.mute(function() {
                    dataSource.pageSize(pageSize);
                });
            }

            return function(index, rangeStart) {
                var that = this;
                if (!dataSource.inRange(rangeStart, pageSize)) {
                    if (lastRequestedRange !== rangeStart) {
                        lastRequestedRange = rangeStart;
                        lastRangeStart = rangeStart;

                        if (that._getterDeferred) {
                            that._getterDeferred.reject();
                        }

                        that._getterDeferred = that.deferredRange(rangeStart);
                        that._getterDeferred.then(function() {
                            var firstItemIndex = that._indexConstraint(that.content[0].scrollTop);

                            that._getterDeferred = null;

                            if (rangeStart <= firstItemIndex && firstItemIndex <= (rangeStart + pageSize)) {
                                that._fetching = true;
                                dataSource.range(rangeStart, pageSize);
                            }
                        });
                    }

                    return null;
                } else {
                    if (lastRangeStart !== rangeStart) {
                        this.mute(function() {
                            dataSource.range(rangeStart, pageSize);
                            lastRangeStart = rangeStart;
                        });
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
                        result = dataSource.view()[index - rangeStart];
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

            if (firstVisibleDataItem && firstVisibleDataItem.item) {
                var firstVisibleGroup = firstVisibleDataItem.group;

                if (firstVisibleGroup !== group) {
                    this.header[0].innerHTML = firstVisibleGroup || "";
                    this.currentVisibleGroup = firstVisibleGroup;
                }
            }

            return list;
        },

        _itemMapper: function(item, index, value) {
            var listType = this.options.type,
                itemHeight = this.options.itemHeight,
                currentIndex = this._focusedIndex,
                selected = false,
                current = false,
                newGroup = false,
                group = null,
                match = false,
                valueGetter = this._valueGetter;

            if (listType === "group") {
                if (item) {
                    newGroup = index === 0 || (this._currentGroup && this._currentGroup !== item.group);
                    this._currentGroup = item.group;
                }

                group = item ? item.group : null;
                item = item ? item.item : null;
            }

            if (!this.isFiltered() && value.length && item) {
                for (var i = 0; i < value.length; i++) {
                    match = isPrimitive(item) ? value[i] === item : value[i] === valueGetter(item);
                    if (match) {
                        value.splice(i , 1);
                        selected = true;
                        break;
                    }
                }
            }

            if (currentIndex === index) {
                current = true;
            }

            return {
                item: item ? item : null,
                group: group,
                newGroup: newGroup,
                selected: selected,
                current: current,
                index: index,
                top: index * itemHeight
            };
        },

        _range: function(index) {
            var itemCount = this.itemCount,
                value = this._values.slice(),
                items = [],
                item;

            this._view = {};
            this._currentGroup = null;

            for (var i = index, length = index + itemCount; i < length; i++) {
                item = this._itemMapper(this.getter(i, index), i, value);
                items.push(item);
                this._view[item.index] = item;
            }

            this._dataView = items;
            return items;
        },

        _getDataItemsCollection: function(scrollTop, lastScrollTop) {
            var items = this._range(this._listIndex(scrollTop, lastScrollTop));
            return {
                index: items.length ? items[0].index : 0,
                top: items.length ? items[0].top : 0,
                items: items
            };
        },

        _listItems: function() {
            var screenHeight = this.screenHeight,
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

                reorder(range, range2, that.bound());

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

            return Math.min(Math.max(total - itemCount, 0), Math.max(0, Math.floor(position / itemHeight )));
        },

        _listIndex: function(scrollTop, lastScrollTop) {
            var buffers = this._bufferSizes(),
                position;

            position = scrollTop - ((scrollTop > lastScrollTop) ? buffers.down : buffers.up);

            return this._indexConstraint(position);
        },

        _selectable: function() {
            if (this.options.selectable) {
                this._selectProxy = $.proxy(this, "_clickHandler");
                this.element.on(CLICK + VIRTUAL_LIST_NS, "." + VIRTUALITEM, this._selectProxy);
            }
        },

        _getIndecies: function(candidate) {
            var result = [], data;

            if (typeof candidate === "function") {
                data = this.dataSource.flatView();
                for (var idx = 0; idx < data.length; idx++) {
                    if (candidate(data[idx])) {
                        result.push(idx);
                        break;
                    }
                }
            }

            if (typeof candidate === "number") {
                result.push(candidate);
            }

            if (candidate instanceof jQuery) {
                candidate = parseInt(candidate.attr("data-offset-index"), 10);
                if (!isNaN(candidate)) {
                    result.push(candidate);
                }
            }

            if (candidate instanceof Array) {
                result = candidate;
            }

            return result;
        },

        _deselect: function(indices) {
            var removed = [],
                selectedIndex,
                dataItem,
                selectedIndexes = this._selectedIndexes,
                position = 0,
                selectable = this.options.selectable,
                removedindexesCounter = 0,
                item;

            indices = indices.slice();

            if (selectable === true || !indices.length) { //deselect everything

                for (var idx = 0; idx < selectedIndexes.length; idx++) {
                    if (selectedIndexes[idx] !== undefined) {
                        this._getElementByIndex(selectedIndexes[idx]).removeClass(SELECTED);

                        removed.push({
                            index: selectedIndexes[idx],
                            position: idx,
                            dataItem: this._selectedDataItems[idx]
                        });
                    }
                }

                this._values = [];
                this._selectedDataItems = [];
                this._selectedIndexes = [];
            } else if (selectable === "multiple") {
                for (var i = 0; i < indices.length; i++) {
                    position = $.inArray(indices[i], selectedIndexes);
                    selectedIndex = selectedIndexes[position];

                    if (selectedIndex !== undefined) {
                        item = this._getElementByIndex(selectedIndex);

                        if (!item.hasClass("k-state-selected")) {
                            continue;
                        }

                        item.removeClass(SELECTED);
                        this._values.splice(position, 1);
                        this._selectedIndexes.splice(position, 1);
                        dataItem = this._selectedDataItems.splice(position, 1)[0];

                        indices.splice(i, 1);

                        removed.push({
                            index: selectedIndex,
                            position: position + removedindexesCounter,
                            dataItem: dataItem
                        });

                        removedindexesCounter++;
                        i--;
                    }
                }
            }

            return {
                indices: indices,
                removed: removed
            };
        },

        _deselectCurrentValues: function(indices) {
            var children = this.element[0].children;
            var value, index, position;
            var values = this._values;
            var removed = [];
            var idx = 0;
            var j;

            if (this.options.selectable !== "multiple" || !this.isFiltered()) {
                return [];
            }

            if (indices[0] === -1) {
                $(children).removeClass("k-state-selected");
                removed = $.map(this._selectedDataItems.slice(0), function(dataItem, idx) {
                   return {
                      dataItem: dataItem,
                      position: idx
                   };
                });
                this._selectedIndexes = [];
                this._selectedDataItems = [];
                this._values = [];
                return removed;
            }

            for (; idx < indices.length; idx++) {
                position = -1;
                index = indices[idx];
                value = this._valueGetter(this._view[index].item);

                for (j = 0; j < values.length; j++) {
                    if (value == values[j]) {
                        position = j;
                        break;
                    }
                }

                if (position > -1) {
                    removed.push(this.removeAt(position));
                    $(children[index]).removeClass("k-state-selected");
                }
            }

            return removed;
        },

        _select: function(indexes) {
            var that = this,
                singleSelection = this.options.selectable !== "multiple",
                dataSource = this.dataSource,
                dataItem, oldSkip,
                take = this.itemCount,
                valueGetter = this._valueGetter,
                added = [];

            if (singleSelection) {
                that._selectedIndexes = [];
                that._selectedDataItems = [];
                that._values = [];
            }

            oldSkip = dataSource.skip();

            $.each(indexes, function(_, index) {
                var page = index < take ? 1 : Math.floor(index / take) + 1;
                var skip = (page - 1) * take;

                that.mute(function() {
                    dataSource.range(skip, take); //switch the range to get the dataItem

                    dataItem = that._findDataItem([index - skip]);
                    that._selectedIndexes.push(index);
                    that._selectedDataItems.push(dataItem);
                    that._values.push(isPrimitive(dataItem) ? dataItem : valueGetter(dataItem));

                    added.push({
                        index: index,
                        dataItem: dataItem
                    });

                    that._getElementByIndex(index).addClass(SELECTED);

                    dataSource.range(oldSkip, take); //switch back the range
                });
            });

            return added;
        },

        _clickHandler: function(e) {
            var item = $(e.currentTarget);

            if (!e.isDefaultPrevented() && item.attr("data-uid")) {
                this.trigger(CLICK, { item: item });
            }
        },

        _buildValueGetter: function() {
            this._valueGetter = kendo.getter(this.options.dataValueField);
        },

        _calculateGroupPadding: function(height) {
            var firstItem = this.items().first(),
                groupHeader = this.header,
                padding = 0;

            if (groupHeader[0] && groupHeader[0].style.display !== "none") {
                if (height !== "auto") {
                    padding = kendo.support.scrollbar();
                }

                padding += parseFloat(firstItem.css("border-right-width"), 10) + parseFloat(firstItem.children(".k-group").css("right"), 10);

                groupHeader.css("padding-right", padding);
            }
        }

    });

    kendo.ui.VirtualList = VirtualList;
    kendo.ui.plugin(VirtualList);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
