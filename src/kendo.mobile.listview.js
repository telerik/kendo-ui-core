kendo_module({
    id: "mobile.listview",
    name: "ListView",
    category: "mobile",
    description: "The Kendo Mobile ListView widget is used to display flat or grouped list of items.",
    depends: [ "data", "mobile.application", "userevents" ]
});

(function($, undefined) {
    var kendo = window.kendo,
        Node = window.Node,
        mobile = kendo.mobile,
        ui = mobile.ui,
        DataSource = kendo.data.DataSource,
        Widget = ui.Widget,
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
        DATA_BOUND = "dataBound",
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

            kendo.onResize(cacheHeaders);

            listView.bind(STYLED, cacheHeaders);
            listView.bind(DATA_BOUND, cacheHeaders);

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
            } while (offset > scrollTop);

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
                    handler._pulled = true;
                    handler.dataSource.read(pullParameters.call(listView, handler._first));
                },
                pullTemplate: options.pullTemplate,
                releaseTemplate: options.releaseTemplate,
                refreshTemplate: options.refreshTemplate
            });
        },

        setDataSource: function(dataSource) {
            var handler = this;

            this._first = dataSource.view()[0];
            this.dataSource = dataSource;

            dataSource.bind("change", function() {
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

            list.bind("resize", function() {
                if (list.footer) {
                    list.footer.below(list.items[list.items.length - 1]);
                }
            });
        },

        refresh: function() {
            var buffer = this.buffer,
                items = this.items,
                endReached = false;

            while(items.length) {
                items.pop().destroy();
            }

            this.bottom = 0;
            this.offset = buffer.offset;
            this.top = 0;

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
                this.bottom = item.bottom;
            }

            this.itemCount = items.length;

            this.trigger("reset");
            this.trigger("resize", { top: this.top, bottom: this.bottom });
            if (endReached) {
                this.trigger("endReached");
            }
        },

        totalHeight: function() {
            var list = this,
                averageItemHeight = (list.bottom - list.top) / list.itemCount,
                remainingItemsCount = list.buffer.length - list.offset - list.itemCount;

            return (this.footer ? this.footer.height : 0) + this.bottom + remainingItemsCount * averageItemHeight;
        },

        batchUpdate: function(top) {
            var height = this.height(),
                initialOffset = this.offset;

            if (this.lastDirection) { // scrolling up
                while(this.bottom > top + height * 2) {
                    if (this.offset === 0) {
                        break;
                    }

                    this.reOrder(true);
                }
            } else { // scrolling down
                while (this.top < top - height) {
                    var nextIndex = this.offset + this.itemCount; // here, it should be offset + 1 + itemCount - 1.

                    if (nextIndex === this.buffer.total()) {
                        this.trigger("endReached");
                        break;
                    }

                    if (nextIndex === this.buffer.length) {
                        break;
                    }

                    this.reOrder(false);
                }
            }

            if (initialOffset !== this.offset) {
                this.trigger("resize", { top: this.top, bottom: this.bottom });
            }
        },

        reOrder: function(up) {
            var items = this.items,
                item;

            if (up) {
                this.offset --;
                item = items.pop();
                item.update(this.content(this.offset));
                item.above(items[0]);
                items.unshift(item);
            } else {
                item = items.shift();
                item.update(this.content(this.offset + this.itemCount));
                item.below(items[items.length - 1]);
                items.push(item);
                this.offset ++;
            }

            this.top = items[0].top;
            this.bottom = items[items.length - 1].bottom;
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

            this.lastTop = top;
            this.lastDirection = up;

            if (up) { // scrolling up
               if (this.top > topBorder &&  // needs reorder
                   this.bottom > bottomBorder + padding && // enough padding below
                   this.offset > 0 // we are not at the top
                  )
               {
                    this.offset --;
                    item = items.pop();
                    firstItem = items[0];
                    item.update(this.content(this.offset));
                    items.unshift(item);

                    kendo.effects.animationFrame(function() {
                        item.above(firstItem);
                        list.top = items[0].top;
                        list.bottom = items[items.length - 1].bottom;
                        list.trigger("resize", { top: list.top, bottom: list.bottom });
                    });
               }
            } else { // scrolling down
                if (
                    this.bottom < bottomBorder && // needs reorder
                    this.top < topBorder - padding // enough padding above
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

                        kendo.effects.animationFrame(function() {
                            item.below(lastItem);
                            list.top = items[0].top;
                            list.bottom = items[items.length - 1].bottom;
                            list.trigger("resize", { top: list.top, bottom: list.bottom });
                        });
                    }
                }
            }
        },

        content: function(index) {
            return this.buffer.at(index);
        }
    });

    // export for testing purposes
    kendo.mobile.ui.VirtualList = VirtualList;

    var VirtualListViewItem = kendo.Class.extend({
        init: function(listView, dataItem) {
            var element = listView.append([dataItem])[0],
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
            this.height = this.element.outerHeight(true);
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
            this._loadButton = $('<a class="km-load">' + listView.options.loadMoreText + '</a>').hide();
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
            this.listView = listView;
            this.options = listView.options;
            listView.bind("_dataSource", function(e) {
                binder.setDataSource(e.dataSource);
            });
        },

        destroy: function() {
            this.list.unbind();
            this.buffer.unbind();
            kendo.unbindResize(this._resizeHandler);
        },

        setDataSource: function(dataSource) {
            var options = this.options,
                listView = this.listView,
                scroller = listView.scroller(),
                pressToLoadMore = options.loadMore,
                footer;

            if (this.dataSource) {
                this._unbindDataSource();
            }

            this.dataSource = dataSource;

            var buffer = new kendo.data.Buffer(dataSource, Math.floor(dataSource.pageSize() / 2), pressToLoadMore);

            if (pressToLoadMore) {
                footer = new VirtualListViewPressToLoadMore(listView, buffer);
            } else {
                footer = new VirtualListViewLoadingIndicator(listView);
            }

            var list = new VirtualList({
                buffer: buffer,
                footer: footer,
                item: function(dataItem) { return new VirtualListViewItem(listView, dataItem); },
                height: function() { return scroller.height(); }
            });

            if (scroller) {
                scroller.makeVirtual();

                scroller.bind("scroll", function(e) {
                    list.update(e.scrollTop);
                });

                scroller.bind("scrollEnd", function(e) {
                    list.batchUpdate(e.scrollTop);
                });

                list.bind("resize", function() {
                    kendo.effects.animationFrame(function() {
                        scroller.virtualSize(0, list.totalHeight());
                    });
                });

                list.bind("reset", function() {
                    footer.enable();
                });

                list.bind("endReached", function() {
                    footer.disable();
                });

                this._resizeHandler = kendo.onResize(function() {
                    scroller.reset();

                    if (listView.element.is(":visible")) {
                        buffer.range(0);
                        list.refresh();
                    } else {
                        list._needsRefresh = true;
                    }
                });

                listView.view().bind("show", function() {
                    if (list._needsRefresh) {
                        setTimeout(function() {
                            list.refresh();
                        });
                        list._needsRefresh = false;
                    }
                });

                buffer.bind("expand", function() {
                    list.lastDirection = false; // expand down
                    list.batchUpdate(scroller.scrollTop);
                });
            }

            $.extend(this, {
                buffer: buffer,
                list: list,
                footer: footer
            });
        },

        refresh: function() {
            this.list.refresh();
        },

        _unbindDataSource: function() {
            // TODO:
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
        },

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
                // the itemchange may come from a child collection
                item = listView.findByDataItem(dataItems)[0];
                if (item) {
                    listView.setDataItem(item, dataItems[0]);
                }
                return;
            }

            listView.trigger("dataBinding");

            if (action === "add" && !groupedMode) {
                listView.append(dataItems);
            } else if (action === "remove" && !groupedMode) {
                listView.remove(dataItems);
            } else if (groupedMode) {
                listView.replaceGrouped(view);
            }
            else if (prependOnRefresh && !listView._filter) {
                listView.prepend(view);
            }
            else {
                listView.replace(view);
            }

            if (this._shouldShowLoading()) {
                listView.hideLoading();
            }

            listView.trigger(DATA_BOUND, { ns: ui });
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
                events = "change paste";

            this.listView = listView;
            this.options = filterable;

            listView.element.before(SEARCH_TEMPLATE({ placeholder: filterable.placeholder || "Search..." }));

            if (filterable.autoFilter !== false) {
                events += " keyup";
            }

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
                    operator: options.operator || "startsWith",
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

            if (this.virtual) {
                this._itemBinder = new VirtualListViewItemBinder(this);
            } else {
                this._itemBinder = new ListViewItemBinder(this);
            }

            if (this.options.pullToRefresh) {
                this._pullToRefreshHandler = new RefreshHandler(this);
            }

            if (this.options.filterable) {
                this._filter = new ListViewFilter(this);
            }

            this.setDataSource(options.dataSource);

            this._enhanceItems(this.items());

            kendo.notify(this, ui);
        },

        events: [
            CLICK,
            DATA_BOUND
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
            loadMoreText: "Press to load more",
            endlessScroll: false,
            scrollThreshold: 30,
            pullToRefresh: false,
            pullTemplate: "Pull to refresh",
            releaseTemplate: "Release to refresh",
            refreshTemplate: "Refreshing",
            pullOffset: 140,
            filterable: false
        },

        refresh: function() {
            this._itemBinder.refresh();
        },

        setOptions: function(options) {
            Widget.fn.setOptions.call(this, options);
        },

        setDataSource: function(dataSource) {
            // the listView should have a ready datasource for MVVM to function properly. But an empty datasource should not empty the element
            var emptyDataSource = !dataSource;
            this.dataSource = DataSource.create(dataSource);

            this.trigger("_dataSource", { dataSource: this.dataSource });

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

        append: function(dataItems) {
            return this._insert(dataItems, 'append');
        },

        prepend: function(dataItems) {
            return this._insert(dataItems, 'prepend');
        },

        replace: function(dataItems) {
            this.element.empty();
            return this._insert(dataItems, 'append');
        },

        replaceGrouped: function(groups) {
            this.options.type = "group";
            this.element.empty();
            var items = $(kendo.render(this.groupTemplate, groups));

            this._enhanceItems(items.children("ul").children("li"));
            mobile.init(items);

            this.element.append(items);
            this._style();
        },

        remove: function(dataItems) {
            var items = this.findByDataItem(dataItems);
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
                    $(item).replaceWith(newItem);
                    listView.trigger("itemChange", { item: newItem, data: dataItem, ns: ui });
                };

            return this._renderItems([dataItem], replaceItem)[0];
        },

        _insert: function(dataItems, method) {
            var listView = this;
            return this._renderItems(dataItems, function(items) {
                listView.element[method](items);
                for (var idx = 0; idx < items.length; idx ++) {
                    listView.trigger("itemChange", { item: [items[idx]], data: dataItems[idx], ns: ui });
                }
            });
        },

        _renderItems: function(dataItems, callback) {
            var items = $(kendo.render(this.template, dataItems));
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
