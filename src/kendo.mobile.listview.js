(function(f, define){
    define([ "./kendo.data", "./kendo.userevents", "./kendo.mobile.button" ], f);
})(function(){

var __meta__ = {
    id: "mobile.listview",
    name: "ListView",
    category: "mobile",
    description: "The Kendo Mobile ListView widget is used to display flat or grouped list of items.",
    depends: [ "data", "userevents", "mobile.button" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        Node = window.Node,
        mobile = kendo.mobile,
        ui = mobile.ui,
        DataSource = kendo.data.DataSource,
        Widget = ui.DataBoundWidget,
        ITEM_SELECTOR = ".km-list > li, > li:not(.km-group-container)",
        HIGHLIGHT_SELECTOR = ".km-listview-link, .km-listview-label",
        ICON_SELECTOR = "[" + kendo.attr("icon") + "]",
        proxy = $.proxy,
        attrValue = kendo.attrValue,
        GROUP_CLASS = "km-group-title",
        ACTIVE_CLASS = "km-state-active",
        GROUP_WRAPPER = '<div class="' + GROUP_CLASS + '"><div class="km-text"></div></div>',
        GROUP_TEMPLATE = kendo.template('<li><div class="' + GROUP_CLASS + '"><div class="km-text">#= this.headerTemplate(data) #</div></div><ul>#= kendo.render(this.template, data.items)#</ul></li>'),
        WRAPPER = '<div class="km-listview-wrapper" />',
        SEARCH_TEMPLATE = kendo.template('<form class="km-filter-form"><div class="km-filter-wrap"><input type="search" placeholder="#=placeholder#"/><a href="\\#" class="km-filter-reset" title="Clear"><span class="km-icon km-clear"></span><span class="km-text">Clear</span></a></div></form>'),
        NS = ".kendoMobileListView",
        STYLED = "styled",
        DATABOUND = "dataBound",
        DATABINDING = "dataBinding",
        ITEM_CHANGE = "itemChange",
        CLICK = "click",
        CHANGE = "change",
        PROGRESS = "progress",
        FUNCTION = "function",

        whitespaceRegExp = /^\s+$/,
        buttonRegExp = /button/;

    function whitespace() {
        return this.nodeType === Node.TEXT_NODE && this.nodeValue.match(whitespaceRegExp);
    }

    function addIcon(item, icon) {
        if (icon && !item[0].querySelector(".km-icon")) {
            item.prepend('<span class="km-icon km-' + icon + '"/>');
        }
    }

    function enhanceItem(item) {
        addIcon(item, attrValue(item, "icon"));
        addIcon(item, attrValue(item.children(ICON_SELECTOR), "icon"));
    }

    function enhanceLinkItem(item) {
        var parent = item.parent(),
            itemAndDetailButtons = item.add(parent.children(kendo.roleSelector("detailbutton"))),
            otherNodes = parent.contents().not(itemAndDetailButtons).not(whitespace);

        if (otherNodes.length) {
            return;
        }

        item.addClass("km-listview-link")
            .attr(kendo.attr("role"), "listview-link");

        addIcon(item, attrValue(parent, "icon"));
        addIcon(item, attrValue(item, "icon"));
    }

    function enhanceCheckBoxItem(label) {
        if (!label[0].querySelector("input[type=checkbox],input[type=radio]")) {
            return;
        }

        var item = label.parent();

        if (item.contents().not(label).not(function() { return this.nodeType == 3; })[0]) {
            return;
        }

        label.addClass("km-listview-label");

        label.children("[type=checkbox],[type=radio]").addClass("km-widget km-icon km-check");
    }

    function putAt(element, top) {
        $(element).css('transform', 'translate3d(0px, ' + top + 'px, 0px)');
    }

    var HeaderFixer = kendo.Class.extend({
        init: function(listView) {
            var scroller = listView.scroller();

            if (!scroller) {
                return;
            }

            this.options = listView.options;
            this.element = listView.element;
            this.scroller = listView.scroller();
            this._shouldFixHeaders();

            var headerFixer = this;

            var cacheHeaders = function() {
                headerFixer._cacheHeaders();
            };

            listView.bind("resize", cacheHeaders);

            listView.bind(STYLED, cacheHeaders);
            listView.bind(DATABOUND, cacheHeaders);

            scroller.bind("scroll", function(e) {
                headerFixer._fixHeader(e);
            });
        },

        _fixHeader: function(e) {
            if (!this.fixedHeaders) {
                return;
            }

            var i = 0,
                scroller = this.scroller,
                headers = this.headers,
                scrollTop = e.scrollTop,
                headerPair,
                offset,
                header;

            do {
                headerPair = headers[i++];
                if (!headerPair) {
                    header = $("<div />");
                    break;
                }
                offset = headerPair.offset;
                header = headerPair.header;
            } while (offset + 1 > scrollTop);

            if (this.currentHeader != i) {
                scroller.fixedContainer.html(header.clone());
                this.currentHeader = i;
            }
        },

        _shouldFixHeaders: function() {
            this.fixedHeaders = this.options.type === "group" && this.options.fixedHeaders;
        },

        _cacheHeaders: function() {
            this._shouldFixHeaders();

            if (!this.fixedHeaders) {
                return;
            }

            var headers = [], offset = this.scroller.scrollTop;

            this.element.find("." + GROUP_CLASS).each(function(_, header) {
                header = $(header);
                headers.unshift({
                    offset: header.position().top + offset,
                    header: header
                });
            });

            this.headers = headers;
            this._fixHeader({ scrollTop: offset });
        }
    });

    var DEFAULT_PULL_PARAMETERS = function() {
        return { page: 1 };
    };

    var RefreshHandler = kendo.Class.extend({
        init: function(listView) {
            var handler = this,
                options = listView.options,
                scroller = listView.scroller(),
                pullParameters = options.pullParameters || DEFAULT_PULL_PARAMETERS;

            this.listView = listView;
            this.scroller = scroller;

            listView.bind("_dataSource", function(e) {
                handler.setDataSource(e.dataSource);
            });

            scroller.setOptions({
                pullToRefresh: true,
                pull: function() {
                    if (!handler._pulled) {
                        handler._pulled = true;
                        handler.dataSource.read(pullParameters.call(listView, handler._first));
                    }
                },
                messages: {
                    pullTemplate: options.messages.pullTemplate,
                    releaseTemplate: options.messages.releaseTemplate,
                    refreshTemplate: options.messages.refreshTemplate
                }
            });
        },

        setDataSource: function(dataSource) {
            var handler = this;

            this._first = dataSource.view()[0];
            this.dataSource = dataSource;

            dataSource.bind("change", function() {
                handler._change();
            });

            dataSource.bind("error", function() {
                handler._change();
            });
        },

        _change: function() {
            var scroller = this.scroller,
                dataSource = this.dataSource;

            if (this._pulled) {
                scroller.pullHandled();
            }

            if (this._pulled || !this._first) {
                var view = dataSource.view();

                if (view[0]) {
                    this._first = view[0];
                }
            }

            this._pulled = false;
        }
    });

    var VirtualList = kendo.Observable.extend({
        init: function(options) {
            var list = this;

            kendo.Observable.fn.init.call(list);

            list.buffer = options.buffer;
            list.height = options.height;
            list.item = options.item;
            list.items = [];
            list.footer = options.footer;

            list.buffer.bind("reset", function() {
                list.refresh();
            });

        },

        refresh: function() {
            var buffer = this.buffer,
                items = this.items,
                endReached = false;

            while(items.length) {
                items.pop().destroy();
            }

            this.offset = buffer.offset;

            var itemConstructor = this.item,
                prevItem,
                item;

            for (var idx = 0; idx < buffer.viewSize; idx ++) {
                if (idx === buffer.total()) {
                    endReached = true;
                    break;
                }
                item = itemConstructor(this.content(this.offset + items.length));
                item.below(prevItem);
                prevItem = item;
                items.push(item);
            }

            this.itemCount = items.length;

            this.trigger("reset");

            this._resize();

            if (endReached) {
                this.trigger("endReached");
            }
        },

        totalHeight: function() {
            if (!this.items[0]) {
                return 0;
            }

            var list = this,
                items = list.items,
                top = items[0].top,
                bottom = items[items.length - 1].bottom,
                averageItemHeight = (bottom - top) / list.itemCount,
                remainingItemsCount = list.buffer.length - list.offset - list.itemCount;

            return (this.footer ? this.footer.height : 0) + bottom + remainingItemsCount * averageItemHeight;
        },

        batchUpdate: function(top) {
            var height = this.height(),
                items = this.items,
                item,
                initialOffset = this.offset;

            if (!items[0]) {
                return;
            }

            if (this.lastDirection) { // scrolling up
                while(items[items.length - 1].bottom > top + height * 2) {
                    if (this.offset === 0) {
                        break;
                    }

                    this.offset --;
                    item = items.pop();
                    item.update(this.content(this.offset));
                    item.above(items[0]);
                    items.unshift(item);
                }
            } else { // scrolling down
                while (items[0].top < top - height) {
                    var nextIndex = this.offset + this.itemCount; // here, it should be offset + 1 + itemCount - 1.

                    if (nextIndex === this.buffer.total()) {
                        this.trigger("endReached");
                        break;
                    }

                    if (nextIndex === this.buffer.length) {
                        break;
                    }

                    item = items.shift();
                    item.update(this.content(this.offset + this.itemCount));
                    item.below(items[items.length - 1]);
                    items.push(item);
                    this.offset ++;
                }
            }

            if (initialOffset !== this.offset) {
                this._resize();
            }
        },

        update: function(top) {
            var list = this,
                items = this.items,
                item,
                firstItem,
                lastItem,
                height = this.height(),
                itemCount = this.itemCount,
                padding = height / 2,
                up = (this.lastTop || 0) > top,
                topBorder = top - padding,
                bottomBorder = top + height + padding;

            if (!items[0]) {
                return;
            }

            this.lastTop = top;
            this.lastDirection = up;

            if (up) { // scrolling up
               if (items[0].top > topBorder &&  // needs reorder
                   items[items.length - 1].bottom > bottomBorder + padding && // enough padding below
                   this.offset > 0 // we are not at the top
                  )
               {
                    this.offset --;
                    item = items.pop();
                    firstItem = items[0];
                    item.update(this.content(this.offset));
                    items.unshift(item);

                    item.above(firstItem);
                    list._resize();
               }
            } else { // scrolling down
                if (
                    items[items.length - 1].bottom < bottomBorder && // needs reorder
                    items[0].top < topBorder - padding // enough padding above
                )
                {
                    var nextIndex = this.offset + itemCount; // here, it should be offset + 1 + itemCount - 1.

                    if (nextIndex === this.buffer.total()) {
                        this.trigger("endReached");
                    } else if (nextIndex !== this.buffer.length) {
                        item = items.shift();
                        lastItem = items[items.length - 1];
                        items.push(item);
                        item.update(this.content(this.offset + this.itemCount));
                        list.offset ++;

                        item.below(lastItem);
                        list._resize();
                    }
                }
            }
        },

        content: function(index) {
            return this.buffer.at(index);
        },

        destroy: function() {
            this.unbind();
        },

        _resize: function() {
            var items = this.items,
                top = 0,
                bottom = 0,
                firstItem = items[0],
                lastItem = items[items.length - 1];

            if (firstItem) {
                top = firstItem.top;
                bottom = lastItem.bottom;
            }

            this.trigger("resize", { top: top, bottom: bottom });

            if (this.footer) {
                this.footer.below(lastItem);
            }
        }
    });

    // export for testing purposes
    kendo.mobile.ui.VirtualList = VirtualList;

    var VirtualListViewItem = kendo.Class.extend({
        init: function(listView, dataItem) {
            var element = listView.append([dataItem], true)[0],
                height = element.offsetHeight;

            $.extend(this, {
                top: 0,
                element: element,
                listView: listView,
                height: height,
                bottom: height
            });
        },

        update: function(dataItem) {
            this.element = this.listView.setDataItem(this.element, dataItem);
        },

        above: function(item) {
            if (item) {
                this.height = this.element.offsetHeight;
                this.top = item.top - this.height;
                this.bottom = item.top;
                putAt(this.element, this.top);
            }
        },

        below: function(item) {
            if (item) {
                this.height = this.element.offsetHeight;
                this.top = item.bottom;
                this.bottom = this.top + this.height;
                putAt(this.element, this.top);
            }
        },

        destroy: function() {
            kendo.destroy(this.element);
            $(this.element).remove();
        }
    });

    var LOAD_ICON = '<div><span class="km-icon"></span><span class="km-loading-left"></span><span class="km-loading-right"></span></div>';
    var VirtualListViewLoadingIndicator = kendo.Class.extend({
        init: function(listView) {
            this.element = $('<li class="km-load-more km-scroller-refresh" style="display: none"></li>').appendTo(listView.element);
            this._loadIcon = $(LOAD_ICON).appendTo(this.element);
        },

        enable: function() {
            this.element.show();
            this.height = this.element.outerHeight(true);
        },

        disable: function() {
            this.element.hide();
            this.height = 0;
        },

        below: function(item) {
            if (item) {
                this.top = item.bottom;
                this.bottom = this.height + this.top;
                putAt(this.element, this.top);
            }
        }
    });

    var VirtualListViewPressToLoadMore = VirtualListViewLoadingIndicator.extend({
        init: function(listView, buffer) {

            this._loadIcon = $(LOAD_ICON).hide();
            this._loadButton = $('<a class="km-load">' + listView.options.messages.loadMoreText + '</a>').hide();
            this.element = $('<li class="km-load-more" style="display: none"></li>').append(this._loadIcon).append(this._loadButton).appendTo(listView.element);

            var loadMore = this;

            this._loadButton.kendoMobileButton().data("kendoMobileButton").bind("click", function() {
                loadMore._hideShowButton();
                buffer.next();
            });

            buffer.bind("resize", function() {
                loadMore._showLoadButton();
            });

            this.height = this.element.outerHeight(true);
            this.disable();
        },

        _hideShowButton: function() {
            this._loadButton.hide();
            this.element.addClass("km-scroller-refresh");
            this._loadIcon.css('display', 'block');
        },

        _showLoadButton: function() {
            this._loadButton.show();
            this.element.removeClass("km-scroller-refresh");
            this._loadIcon.hide();
        }
    });

    var VirtualListViewItemBinder = kendo.Class.extend({
        init: function(listView) {
            var binder = this;

            this.chromeHeight = listView.wrapper.children().not(listView.element).outerHeight() || 0;
            this.listView = listView;
            this.scroller = listView.scroller();
            this.options = listView.options;

            listView.bind("_dataSource", function(e) {
                binder.setDataSource(e.dataSource, e.empty);
            });

            listView.bind("resize", function() {
                if (!binder.list.items.length) {
                    return;
                }

                binder.scroller.reset();
                binder.buffer.range(0);
                binder.list.refresh();
            });

            this.scroller.makeVirtual();

            this.scroller.bind("scroll", function(e) {
                binder.list.update(e.scrollTop);
            });

            this.scroller.bind("scrollEnd", function(e) {
                binder.list.batchUpdate(e.scrollTop);
            });
        },

        destroy: function() {
            this.list.unbind();
            this.buffer.unbind();
        },

        setDataSource: function(dataSource, empty) {
            var binder = this,
                options = this.options,
                listView = this.listView,
                scroller = listView.scroller(),
                pressToLoadMore = options.loadMore,
                pageSize,
                buffer,
                footer;

            this.dataSource = dataSource;

            pageSize = dataSource.pageSize() || options.virtualViewSize;

            if (!pageSize && !empty) {
                throw new Error("the DataSource does not have page size configured. Page Size setting is mandatory for the mobile listview virtual scrolling to work as expected.");
            }

            if (this.buffer) {
                this.buffer.destroy();
            }

            buffer = new kendo.data.Buffer(dataSource, Math.floor(pageSize / 2), pressToLoadMore);

            if (pressToLoadMore) {
                footer = new VirtualListViewPressToLoadMore(listView, buffer);
            } else {
                footer = new VirtualListViewLoadingIndicator(listView);
            }

            if (this.list) {
                this.list.destroy();
            }

            var list = new VirtualList({
                buffer: buffer,
                footer: footer,
                item: function(dataItem) { return new VirtualListViewItem(listView, dataItem); },
                height: function() { return scroller.height(); }
            });

            list.bind("resize", function() {
                binder.updateScrollerSize();
                listView.updateSize();
            });

            list.bind("reset", function() {
                binder.footer.enable();
            });

            list.bind("endReached", function() {
                footer.disable();
                binder.updateScrollerSize();
            });

            buffer.bind("expand", function() {
                list.lastDirection = false; // expand down
                list.batchUpdate(scroller.scrollTop);
            });

            $.extend(this, {
                buffer: buffer,
                scroller: scroller,
                list: list,
                footer: footer
            });
        },

        updateScrollerSize: function() {
            this.scroller.virtualSize(0, this.list.totalHeight() + this.chromeHeight);
        },

        refresh: function() {
            this.list.refresh();
        },

        reset: function() {
            this.buffer.range(0);
            this.list.refresh();
        }
    });

    var ListViewItemBinder = kendo.Class.extend({
        init: function(listView) {
            var binder = this;
            this.listView = listView;
            this.options = listView.options;

            var itemBinder = this;

            this._refreshHandler = function(e) {
                itemBinder.refresh(e);
            };

            this._progressHandler = function() {
                listView.showLoading();
            };

            listView.bind("_dataSource", function(e) {
                binder.setDataSource(e.dataSource);
            });
        },

        destroy: function() {
            this._unbindDataSource();
        },

        reset: function() { },

        refresh: function(e) {
            var action = e && e.action,
                dataItems = e && e.items,
                listView = this.listView,
                dataSource = this.dataSource,
                prependOnRefresh = this.options.appendOnRefresh,
                view = dataSource.view(),
                groups = dataSource.group(),
                groupedMode = groups && groups[0],
                item;

            if (action === "itemchange") {
                item = listView.findByDataItem(dataItems)[0];
                if (item) {
                    listView.setDataItem(item, dataItems[0]);
                }
                return;
            }

            var removedItems, addedItems, addedDataItems;
            var adding = (action === "add" && !groupedMode) || (prependOnRefresh && !listView._filter);
            var removing = action === "remove" && !groupedMode;

            if (adding) {
                // no need to unbind anything
                removedItems = [];
            } else if (removing) {
                // unbind the items about to be removed;
                removedItems = listView.findByDataItem(dataItems);
            }

            if (listView.trigger(DATABINDING, { action: action || "rebind", items: dataItems, removedItems: removedItems, index: e && e.index })) {
                if (this._shouldShowLoading()) {
                    listView.hideLoading();
                }
                return;
            }

            if (action === "add" && !groupedMode) {
                var index = view.indexOf(dataItems[0]);
                if (index > -1) {
                    addedItems = listView.insertAt(dataItems, index);
                    addedDataItems = dataItems;
                }
            } else if (action === "remove" && !groupedMode) {
                addedItems = [];
                listView.remove(dataItems);
            } else if (groupedMode) {
                listView.replaceGrouped(view);
            }
            else if (prependOnRefresh && !listView._filter) {
                addedItems = listView.prepend(view);
                addedDataItems = view;
            }
            else {
                listView.replace(view);
            }

            if (this._shouldShowLoading()) {
                listView.hideLoading();
            }

            listView.trigger(DATABOUND, { ns: ui, addedItems: addedItems, addedDataItems: addedDataItems });
        },

        setDataSource: function(dataSource) {
            if (this.dataSource) {
                this._unbindDataSource();
            }

            this.dataSource = dataSource;
            dataSource.bind(CHANGE, this._refreshHandler);

            if (this._shouldShowLoading()) {
                this.dataSource.bind(PROGRESS, this._progressHandler);
            }
        },

        _unbindDataSource: function() {
            this.dataSource.unbind(CHANGE, this._refreshHandler).unbind(PROGRESS, this._progressHandler);
        },

        _shouldShowLoading: function() {
            var options = this.options;
            return !options.pullToRefresh && !options.loadMore && !options.endlessScroll;
        }
    });

    var ListViewFilter = kendo.Class.extend({
        init: function(listView) {
            var filter = this,
                filterable = listView.options.filterable,
                events = "change paste",
                that = this;

            this.listView = listView;
            this.options = filterable;

            listView.element.before(SEARCH_TEMPLATE({ placeholder: filterable.placeholder || "Search..." }));

            if (filterable.autoFilter !== false) {
                events += " keyup";
            }

            this.element = listView.wrapper.find(".km-search-form");

            this.searchInput = listView.wrapper.find("input[type=search]")
                .closest("form").on("submit" + NS, function(e) {
                    e.preventDefault();
                })
                .end()
                .on("focus" + NS, function() {
                    filter._oldFilter = filter.searchInput.val();
                })
                .on(events.split(" ").join(NS + " ") + NS, proxy(this._filterChange, this));

            this.clearButton = listView.wrapper.find(".km-filter-reset")
                .on(CLICK, proxy(this, "_clearFilter"))
                .hide();

             this._dataSourceChange = $.proxy(this._refreshInput, this);
             listView.bind("_dataSource", function(e) {
                 e.dataSource.bind("change", that._dataSourceChange);
             });
        },

        _refreshInput: function() {
            var appliedFilters = this.listView.dataSource.filter();
            var searchInput = this.listView._filter.searchInput;
            if (appliedFilters) {
                searchInput.val(appliedFilters.filters[0].value);
            } else {
                searchInput.val("");
            }
        },

        _search: function(expr) {
            this._filter = true;
            this.clearButton[expr ? "show" : "hide"]();
            this.listView.dataSource.filter(expr);
        },

        _filterChange: function(e) {
            var filter = this;
            if (e.type == "paste" && this.options.autoFilter !== false) {
                setTimeout(function() {
                    filter._applyFilter();
                }, 1);
            } else {
                this._applyFilter();
            }
        },

        _applyFilter: function() {
            var options = this.options,
                value = this.searchInput.val(),
                expr = value.length ? {
                    field: options.field,
                    operator: options.operator || "startswith",
                    ignoreCase: options.ignoreCase,
                    value: value
                } : null;

            if (value === this._oldFilter) {
                return;
            }

            this._oldFilter = value;
            this._search(expr);
        },

        _clearFilter: function(e) {
            this.searchInput.val("");
            this._search(null);

            e.preventDefault();
        }
    });

    var ListView = Widget.extend({
        init: function(element, options) {
            var listView = this;

            Widget.fn.init.call(this, element, options);

            element = this.element;

            options = this.options;

            // support for legacy typo in configuration options: scrollTreshold -> scrollThreshold.
            if (options.scrollTreshold) {
                options.scrollThreshold = options.scrollTreshold;
            }

            element
                .on("down", HIGHLIGHT_SELECTOR, "_highlight")
                .on("move up cancel", HIGHLIGHT_SELECTOR, "_dim");

            this._userEvents = new kendo.UserEvents(element, {
                filter: ITEM_SELECTOR,
                allowSelection: true,
                tap: function(e) {
                    listView._click(e);
                }
            });

            // HACK!!! to negate the ms touch action from the user events.
            element.css("-ms-touch-action", "auto");

            element.wrap(WRAPPER);

            this.wrapper = this.element.parent();

            this._headerFixer = new HeaderFixer(this);

            this._itemsCache = {};
            this._templates();

            this.virtual = options.endlessScroll || options.loadMore;

            this._style();

            if (this.options.filterable) {
                this._filter = new ListViewFilter(this);
            }

            if (this.virtual) {
                this._itemBinder = new VirtualListViewItemBinder(this);
            } else {
                this._itemBinder = new ListViewItemBinder(this);
            }

            if (this.options.pullToRefresh) {
                this._pullToRefreshHandler = new RefreshHandler(this);
            }

            this.setDataSource(options.dataSource);

            this._enhanceItems(this.items());

            kendo.notify(this, ui);
        },

        events: [
            CLICK,
            DATABINDING,
            DATABOUND,
            ITEM_CHANGE
        ],

        options: {
            name: "ListView",
            style: "",
            type: "flat",
            autoBind: true,
            fixedHeaders: false,
            template: "#:data#",
            headerTemplate: '<span class="km-text">#:value#</span>',
            appendOnRefresh: false,
            loadMore: false,
            endlessScroll: false,
            scrollThreshold: 30,
            pullToRefresh: false,
            messages: {
                loadMoreText: "Press to load more",
                pullTemplate: "Pull to refresh",
                releaseTemplate: "Release to refresh",
                refreshTemplate: "Refreshing"
            },
            pullOffset: 140,
            filterable: false,
            virtualViewSize: null
        },

        refresh: function() {
            this._itemBinder.refresh();
        },

        reset: function() {
            this._itemBinder.reset();
        },

        setDataSource: function(dataSource) {
            // the listView should have a ready datasource for MVVM to function properly. But an empty datasource should not empty the element
            var emptyDataSource = !dataSource;
            this.dataSource = DataSource.create(dataSource);

            this.trigger("_dataSource", { dataSource: this.dataSource, empty: emptyDataSource });

            if (this.options.autoBind && !emptyDataSource) {
                this.items().remove();
                this.dataSource.fetch();
            }
        },

        destroy: function() {
            Widget.fn.destroy.call(this);
            kendo.destroy(this.element);
            this._userEvents.destroy();
            if (this._itemBinder) {
                this._itemBinder.destroy();
            }

            this.element.unwrap();
            delete this.element;
            delete this.wrapper;
            delete this._userEvents;
        },

        items: function() {
            if (this.options.type === "group") {
                return this.element.find(".km-list").children();
            } else {
                return this.element.children().not('.km-load-more');
            }
        },

        scroller: function() {
            if (!this._scrollerInstance) {
                this._scrollerInstance = this.element.closest(".km-scroll-wrapper").data("kendoMobileScroller");
            }

            return this._scrollerInstance;
        },

        showLoading: function() {
            var view = this.view();
            if (view && view.loader) {
                view.loader.show();
            }
        },

        hideLoading: function() {
            var view = this.view();
            if (view && view.loader) {
                view.loader.hide();
            }
        },

        insertAt: function(dataItems, index, triggerChange) {
            var listView = this;
            return listView._renderItems(dataItems, function(items) {
                if (index === 0) {
                    listView.element.prepend(items);
                }
                else if (index === -1) {
                    listView.element.append(items);
                } else {
                    listView.items().eq(index - 1).after(items);
                }

                if (triggerChange) {
                    for (var i = 0; i < items.length; i ++) {
                        listView.trigger(ITEM_CHANGE, { item: items.eq(i), data: dataItems[i], ns: ui });
                    }
                }
            });
        },

        append: function(dataItems, triggerChange) {
            return this.insertAt(dataItems, -1, triggerChange);
        },

        prepend: function(dataItems, triggerChange) {
            return this.insertAt(dataItems, 0, triggerChange);
        },

        replace: function(dataItems) {
            this.options.type = "flat";
            this._angularItems("cleanup");
            this.element.empty();
            this._style();
            return this.insertAt(dataItems, 0);
        },

        replaceGrouped: function(groups) {
            this.options.type = "group";
            this._angularItems("cleanup");
            this.element.empty();
            var items = $(kendo.render(this.groupTemplate, groups));

            this._enhanceItems(items.children("ul").children("li"));
            this.element.append(items);
            mobile.init(items);
            this._style();
            this._angularItems("compile");
        },

        remove: function(dataItems) {
            var items = this.findByDataItem(dataItems);
            this.angular("cleanup", function(){
                return { elements: items };
            });
            kendo.destroy(items);
            items.remove();
        },

        findByDataItem: function(dataItems) {
            var selectors = [];

            for (var idx = 0, length = dataItems.length; idx < length; idx ++) {
                selectors[idx] = "[data-" + kendo.ns + "uid=" + dataItems[idx].uid + "]";
            }

            return this.element.find(selectors.join(","));
        },

        // item is a DOM element, not jQuery object.
        setDataItem: function(item, dataItem) {
            var listView = this,
                replaceItem = function(items) {
                    var newItem = $(items[0]);
                    kendo.destroy(item);
                    $(item).replaceWith(newItem);
                    listView.trigger(ITEM_CHANGE, { item: newItem, data: dataItem, ns: ui });
                };

            return this._renderItems([dataItem], replaceItem)[0];
        },

        updateSize: function() {
            this._size = this.getSize();
        },

        _renderItems: function(dataItems, callback) {
            var items = $(kendo.render(this.template, dataItems));

            this.angular("compile", function(){
                return {
                    elements: items,
                    data: dataItems.map(function(data){
                        return { dataItem: data };
                    })
                };
            });

            callback(items);
            mobile.init(items);
            this._enhanceItems(items);

            return items;
        },

        _dim: function(e) {
            this._toggle(e, false);
        },

        _highlight: function(e) {
            this._toggle(e, true);
        },

        _toggle: function(e, highlight) {
            if (e.which > 1) {
                return;
            }

            var clicked = $(e.currentTarget),
                item = clicked.parent(),
                role = attrValue(clicked, "role") || "",
                plainItem = (!role.match(buttonRegExp)),
                prevented = e.isDefaultPrevented();

            if (plainItem) {
                item.toggleClass(ACTIVE_CLASS, highlight && !prevented);
            }
        },

        _templates: function() {
            var template = this.options.template,
                headerTemplate = this.options.headerTemplate,
                dataIDAttribute = ' data-uid="#=arguments[0].uid || ""#"',
                templateProxy = {},
                groupTemplateProxy = {};

            if (typeof template === FUNCTION) {
                templateProxy.template = template;
                template = "#=this.template(data)#";
            }

            this.template = proxy(kendo.template("<li" + dataIDAttribute + ">" + template + "</li>"), templateProxy);

            groupTemplateProxy.template = this.template;

            if (typeof headerTemplate === FUNCTION) {
                groupTemplateProxy._headerTemplate = headerTemplate;
                headerTemplate = "#=this._headerTemplate(data)#";
            }

            groupTemplateProxy.headerTemplate = kendo.template(headerTemplate);

            this.groupTemplate = proxy(GROUP_TEMPLATE, groupTemplateProxy);
        },

        _click: function(e) {
            if (e.event.which > 1 || e.event.isDefaultPrevented()) {
                return;
            }

            var dataItem,
                item = e.target,
                target = $(e.event.target),
                buttonElement = target.closest(kendo.roleSelector("button", "detailbutton", "backbutton")),
                button = kendo.widgetInstance(buttonElement, ui),
                id = item.attr(kendo.attr("uid"));

            if (id) {
                dataItem = this.dataSource.getByUid(id);
            }

            if (this.trigger(CLICK, {target: target, item: item, dataItem: dataItem, button: button})) {
                e.preventDefault();
            }
        },

        _styleGroups: function() {
            var rootItems = this.element.children();

            rootItems.children("ul").addClass("km-list");

            rootItems.each(function() {
                var li = $(this),
                    groupHeader = li.contents().first();

                li.addClass("km-group-container");
                if (!groupHeader.is("ul") && !groupHeader.is("div." + GROUP_CLASS)) {
                    groupHeader.wrap(GROUP_WRAPPER);
                }
            });
        },

        _style: function() {
            var options = this.options,
                grouped = options.type === "group",
                element = this.element,
                inset = options.style === "inset";

            element.addClass("km-listview")
                .toggleClass("km-list", !grouped)
                .toggleClass("km-virtual-list", this.virtual)
                .toggleClass("km-listinset", !grouped && inset)
                .toggleClass("km-listgroup", grouped && !inset)
                .toggleClass("km-listgroupinset", grouped && inset);

            if (!element.parents(".km-listview")[0]) {
                element.closest(".km-content").toggleClass("km-insetcontent", inset); // iOS has white background when the list is not inset.
            }

            if (grouped) {
                this._styleGroups();
            }

            this.trigger(STYLED);
        },

        _enhanceItems: function(items) {
            items.each(function() {
                var item = $(this),
                    child,
                    enhanced = false;

                item.children().each(function() {
                    child = $(this);
                    if (child.is("a")) {
                        enhanceLinkItem(child);
                        enhanced = true;
                    } else if (child.is("label")) {
                        enhanceCheckBoxItem(child);
                        enhanced = true;
                    }
                });

                if (!enhanced) {
                    enhanceItem(item);
                }
            });
        }
    });

    ui.plugin(ListView);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
