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
        proxy = $.proxy,
        attrValue = kendo.attrValue,
        GROUP_CLASS = "km-group-title",
        ACTIVE_CLASS = "km-state-active",
        GROUP_WRAPPER = '<div class="' + GROUP_CLASS + '"><div class="km-text"></div></div>',
        GROUP_TEMPLATE = kendo.template('<li><div class="' + GROUP_CLASS + '"><div class="km-text">#= this.headerTemplate(data) #</div></div><ul>#= kendo.render(this.template, data.items)#</ul></li>'),
        WRAPPER = '<div class="km-listview-wrapper" />',
        SEARCH_TEMPLATE = kendo.template('<form class="km-filter-form"><div class="km-filter-wrap"><input type="search" placeholder="#=placeholder#"/><a href="\\#" class="km-filter-reset" title="Clear"><span class="km-icon km-clear"></span><span class="km-text">Clear</span></a></div></form>'),
        NS = ".kendoMobileListView",
        LAST_PAGE_REACHED = "lastPageReached",
        STYLED = "styled",
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
        if (icon) {
            item.prepend('<span class="km-icon km-' + icon + '"/>');
        }
    }

    function enhanceItem(item) {
        addIcon(item, attrValue(item, "icon"));
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
    }

    function enhanceCheckBoxItem(label) {
        if (!label.children("input[type=checkbox],input[type=radio]").length) {
            return;
        }

        var item = label.parent();

        if (item.contents().not(label).not(function() { return this.nodeType == 3; })[0]) {
            return;
        }

        label.addClass("km-listview-label");
    }

    function putAt(element, top) {
        element.css('transform', 'translate3d(0px, ' + top + 'px, 0px)');
    }

    var HeaderFixer = kendo.Class.extend({
        init: function(listView) {
            var that = this,
                scroller = listView.scroller();

            if (!scroller) {
                return;
            }

            that.options = listView.options;
            that.element = listView.element;
            that.scroller = listView.scroller();
            that._shouldFixHeaders();

            var cacheHeaders = function() {
                that._cacheHeaders();
            };

            kendo.onResize(cacheHeaders);

            listView.bind(STYLED, cacheHeaders)

            scroller.bind("scroll", function(e) {
                that._fixHeader(e);
            });
        },

        _fixHeader: function(e) {
            if (!this.fixedHeaders) {
                return;
            }

            var i = 0,
                that = this,
                scroller = that.scroller,
                scrollTop = e.scrollTop,
                headers = that.headers,
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

            if (that.currentHeader != i) {
                scroller.fixedContainer.html(header.clone());
                that.currentHeader = i;
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

            var headers = [];

            this.element.find("." + GROUP_CLASS).each(function(_, header) {
                header = $(header);
                headers.unshift({
                    offset: header.position().top,
                    header: header
                });
            });

            this.headers = headers;
            this._fixHeader({scrollTop: 0});
        },
    });

    var DEFAULT_PULL_PARAMETERS = function() {
        return { page: 1 };
    };

    var RefreshHandler = kendo.Class.extend({
        init: function(listView) {
            var that = this,
                scroller = listView.scroller(),
                options = listView.options,
                dataSource = listView.dataSource,
                pullParameters = options.pullParameters || DEFAULT_PULL_PARAMETERS;

            that._first = dataSource.view()[0];

            scroller.setOptions({
                pullToRefresh: true,
                pull: function() {
                    that._pulled = true;
                    dataSource.read(pullParameters.call(listView, that._first));
                },
                pullTemplate: options.pullTemplate,
                releaseTemplate: options.releaseTemplate,
                refreshTemplate: options.refreshTemplate
            });

            dataSource.bind("change", function() {
                if (that._pulled) {
                    scroller.pullHandled();
                }

                if (that._pulled || !that._first) {
                    var view = dataSource.view();

                    if (view[0]) {
                        that._first = view[0];
                    }
                }

                that._pulled = false;
            });
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
                items = this.items;

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
                item = itemConstructor(this.content(this.offset + items.length));
                item.below(prevItem);
                prevItem = item;
                items.push(item);
                this.bottom = item.bottom;
            }

            this.itemCount = items.length;

            this.trigger("reset");
            this.trigger("resize", { top: this.top, bottom: this.bottom });
        },

        totalHeight: function() {
            var list = this,
                averageItemHeight = (list.bottom - list.top) / list.itemCount,
                remainingItemsCount = list.buffer.length - list.offset - list.itemCount;

            return (this.footer ? this.footer.height : 0) + this.bottom + remainingItemsCount * averageItemHeight;
        },

        update: function(top, force) {
            var list = this,
                height = list.height(),
                items = list.items,

                initialOffset = list.offset,
                initialTop = list.top,
                initialBottom = list.bottom,

                topThreshold = top,
                targetTop = top - height * 3,

                bottomThreshold = top + height,
                targetBottom = bottomThreshold + height * 3,

                itemCount = list.itemCount,

                padding = 200,
                item,
                bottomItem,
                lastTop = this.lastTop || 0,
                up = force ? this.lastDirection : lastTop > top,

                topBorder = top - padding,
                bottomBorder = top + height + padding;

            this.lastTop = top;
            this.lastDirection = up;

            if (up) { // scrolling up
               if (this.top > topBorder || force) {
                    while(this.bottom > bottomBorder) {
                        console.log('popping', list.offset);
                        if (list.offset === 0) {
                            break;
                        }

                        list.offset --;
                        item = items.pop();

                        item.update(list.content(list.offset));
                        item.above(items[0]);
                        items.unshift(item);
                        list.top = item.top;
                        list.bottom = items[items.length - 1].bottom;
                    }
               }
            } else { // scrolling down
                if (this.bottom < bottomBorder || force) {
                    while (this.top < topBorder) {
                        var nextIndex = list.offset + itemCount; // here, it should be offset + 1 + itemCount - 1.

                        if (nextIndex === list.buffer.total()) {
                            list.trigger("endReached");
                            break;
                        }

                        if (nextIndex === list.buffer.length) {
                            break;
                        }

                        item = items.shift();

                        item.update(list.content(nextIndex));
                        item.below(items[items.length - 1]);
                        items.push(item);
                        list.top = items[0].top;
                        list.bottom = item.bottom;

                        list.offset ++;
                    }
                }
            }

            if (initialOffset !== list.offset) {
                list.trigger("resize", { top: list.top, bottom: list.bottom });
            }
        },

        content: function(index) {
            return this.buffer.at(index);
        }
    });

    var VirtualListViewItem = kendo.Class.extend({
        init: function(listView, dataItem) {
            var element = listView.append([dataItem]),
                height = element.outerHeight(true);

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
            this.height = this.element.outerHeight(true);
            this.bottom = this.top + this.height;
            putAt(this.element, this.top);
        },

        above: function(item) {
            if (item) {
                this.top = item.top - this.height;
                this.bottom = item.top;
                putAt(this.element, this.top);
            }
        },

        below: function(item) {
            if (item) {
                this.top = item.bottom;
                this.bottom = this.top + this.height;
                putAt(this.element, this.top);
            }
        },

        destroy: function() {
            // kendo.destroy()
        }
    });

    var VirtualListViewLoadingIndicator = kendo.Class.extend({
        init: function(listView) {
            this.element = $('<li class="endless-scroll-loading"></li>').appendTo(listView.element);
            this._loadIcon = $('<span style="display:none" class="km-icon"></span>').appendTo(this.element);
            this.height = this.element.outerHeight(true);
        },

        enable: function() {
            this._loadIcon.show();
        },

        disable: function() {
            this._loadIcon.hide();
        },

        below: function(item) {
            if (item) {
                this.top = item.bottom;
                this.bottom = this.height + this.top;
                putAt(this.element, this.top);
            }
        },
    });

    var VirtualListViewPressToLoadMore = VirtualListViewLoadingIndicator.extend({
        init: function(listView, buffer) {
            var that = this;

            that._loadWrapper = $('<span class="km-load-more"></span>');
            that._loadIcon = $('<span style="display:none" class="km-icon"></span>');
            that._loadButton = $('<a class="km-load">' + listView.options.loadMoreText + '</a>');

            that._loadWrapper.append(that._loadIcon).append(that._loadButton);

            that.element = $('<li class="press-to-load-more"></li>').append(that._loadWrapper).appendTo(listView.element);

            that._loadButton.kendoMobileButton().data('kendoMobileButton').bind('click', function() {
                that._hideShowButton();
                buffer.next();
            });

            buffer.bind('resize', function() {
                that._showLoadButton();
            });

            that.height = that.element.outerHeight(true);
        },

        enable: function() {
            this._showLoadButton();
        },

        disable: function() {
            this._loadButton.hide();
            this._loadIcon.hide();
            this.element.find('.km-load-more').removeClass('km-scroller-refresh');
        },

        _hideShowButton: function() {
            this._loadButton.hide();
            this._loadIcon.css('display', 'block');
            this.element.find('.km-load-more').addClass('km-scroller-refresh');
        },

        _showLoadButton: function() {
            this._loadButton.show();
            this._loadIcon.hide();
            this.element.find('.km-load-more').removeClass('km-scroller-refresh');
        }
    });

    var VirtualListViewItemBinder = kendo.Class.extend({
        init: function(listView) {
            this.listView = listView;
            this.options = listView.options;
            this.configure();
        },

        configure: function() {
            var that = this,
                options = that.options,
                pressToLoadMore = that.options.loadMore,
                scroller = that.listView.scroller(),
                footer;

            if (that.dataSource) {
                that._unbindDataSource();
            }

            that.listView.dataSource = that.dataSource = DataSource.create(options.dataSource);

            that.buffer = new kendo.data.Buffer(that.dataSource, Math.floor(options.dataSource.pageSize() / 2), pressToLoadMore);

            if (pressToLoadMore) {
                footer = new VirtualListViewPressToLoadMore(that.listView, that.buffer);
            } else {
                footer = new VirtualListViewLoadingIndicator(that.listView);
            }

            that.list = new VirtualList({
                buffer: that.buffer,
                footer: footer,
                item: function(dataItem) { return new VirtualListViewItem(that.listView, dataItem); },
                height: function() { return scroller.height(); }
            });

            if (scroller) {
                scroller.makeVirtual();

                scroller.bind("scroll", function(e) {
                    that.list.update(e.scrollTop);
                });

                scroller.bind("scrollEnd", function(e) {
                    that.list.update(e.scrollTop, true);
                });

                that.list.bind("resize", function() {
                    scroller.virtualSize(0, that.list.totalHeight());
                });

                that.list.bind("reset", function() {
                    footer.enable();
                });

                that.list.bind("endReached", function() {
                    footer.disable();
                });

                that.buffer.bind('expand', function() {
                    that.list.update(scroller.scrollTop);
                });
            }
        },

        _unbindDataSource: function() {
            // TODO:
        }
    });

    var ListViewItemBinder = kendo.Class.extend({
        init: function(listView) {
            var that = this;

            that.listView = listView;
            that.options = listView.options;

            that._refreshHandler = function(e) {
                that.refresh(e);
            }

            that._progressHandler = function(e) {
                listView.showLoading();
            }

            that.configure();
        },

        refresh: function(e) {
            var action = e.action,
                dataItems = e.items,
                listView = this.listView,
                dataSource = this.dataSource,
                prependOnRefresh = this.options.appendOnRefresh,
                view = dataSource.view(),
                groups = dataSource.group(),
                groupedMode = groups && groups[0];

            listView.trigger('dataBinding');

            if (action === "itemchange") {
                listView.setDataItem(listView.findByDataItem(dataItems)[0], dataItems[0]);
            } else if (action === "add") {
                listView.append(dataItems);
            } else if (action === "remove") {
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

            listView.trigger('dataBound', { ns: ui });
        },

        configure: function() {
            var that = this,
                options = that.options;

            if (that.dataSource) {
                that._unbindDataSource();
            }

            that.listView.dataSource = that.dataSource = DataSource.create(options.dataSource).bind(CHANGE, that._refreshHandler);

            if (that._shouldShowLoading()) {
                that.dataSource.bind(PROGRESS, that._progressHandler);
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
            var that = this,
                filterable = listView.options.filterable,
                events = "change paste";

            that.listView = listView;
            that.options = filterable;

            listView.element.before(SEARCH_TEMPLATE({ placeholder: filterable.placeholder || "Search..." }));

            if (filterable.autoFilter !== false) {
                events += " keyup";
            }

            that.searchInput = listView.wrapper.find("input[type=search]")
                .closest("form").on("submit" + NS, function(e) {
                    e.preventDefault();
                })
                .end()
                .on("focus" + NS, function() {
                    that._oldFilter = that.searchInput.val();
                })
                .on(events.split(" ").join(NS + " ") + NS, proxy(that._filterChange, that));

            that.clearButton = listView.wrapper.find(".km-filter-reset")
                .on(CLICK, proxy(that._clearFilter, that))
                .hide();

        },

        _search: function(expr) {
            this._filter = true;
            this.clearButton[expr ? "show" : "hide"]();
            this.listView.dataSource.filter(expr);
        },

        _filterChange: function(e) {
            var that = this;
            if (e.type == "paste" && that.options.autoFilter !== false) {
                setTimeout(function() {
                    that._applyFilter();
                }, 1);
            } else {
                that._applyFilter();
            }
        },

        _applyFilter: function() {
            var that = this,
                options = that.options,
                value = that.searchInput.val(),
                expr = value.length ? {
                    field: options.field,
                    operator: options.operator || "startsWith",
                    ignoreCase: options.ignoreCase,
                    value: value
                } : null;

            if (value === that._oldFilter) {
                return;
            }

            that._oldFilter = value;
            that._search(expr);
        },

        _clearFilter: function(e) {
            this.searchInput.val("");
            this._search(null);

            e.preventDefault();
        }
    });

    var ListView = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            options = that.options;

            // support for legacy typo in configuration options: scrollTreshold -> scrollThreshold.
            if (options.scrollTreshold) {
                options.scrollThreshold = options.scrollTreshold;
            }

            element
                .on("down", HIGHLIGHT_SELECTOR, "_highlight")
                .on("move up cancel", HIGHLIGHT_SELECTOR, "_dim");

            that._userEvents = new kendo.UserEvents(element, {
                filter: ITEM_SELECTOR,
                allowSelection: true,
                tap: function(e) {
                    that._click(e);
                }
            });

            // HACK!!! to negate the ms touch action from the user events.
            element.css("-ms-touch-action", "auto");

            element.wrap(WRAPPER);

            that.wrapper = that.element.parent();

            that._headerFixer = new HeaderFixer(this);

            that._templates();

            that.virtual = options.endlessScroll || options.loadMore;

            that._style();

            if (that.virtual) {
                this._itemBinder = new VirtualListViewItemBinder(this);
            } else {
                this._itemBinder = new ListViewItemBinder(this);
            }

            if (options.dataSource && options.autoBind) {
                that.dataSource.fetch();
            }

            if (this.options.pullToRefresh) {
                this._pullToRefreshHandler = new RefreshHandler(this);
            }

            if (this.options.filterable) {
                this._filter = new ListViewFilter(this);
            }

            that._enhanceItems(that.items());

            kendo.notify(that, ui);
        },

        events: [
            CLICK,
            "dataBound"
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

        setOptions: function(options) {
            Widget.fn.setOptions.call(this, options);
        },

        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;
            this._itemBinder.configure();

            if (this.options.autoBind) {
                this.dataSource.fetch();
            }
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            kendo.destroy(that.element);
            that._userEvents.destroy();
            delete that.element;
            delete that.wrapper;
            delete that._userEvents;
        },

        items: function() {
            if (this.options.type === "group") {
                return this.element.find(".km-list").children();
            } else {
                return this.element.children();
            }
        },

        scroller: function() {
            if (!this._scrollerInstance) {
                var view = this.view();
                this._scrollerInstance = view && view.scroller;
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

            this._enhanceItems(items);
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

        setDataItem: function(item, dataItem) {
            var that = this;

            return $(this._renderItems([dataItem], function(items) {
                var newItem = $(items[0]);
                kendo.destroy(item);
                $(item).replaceWith(newItem);

                that.trigger("itemChange", { item: newItem, data: dataItem, ns: ui });
            })[0]);
        },

        _insert: function(dataItems, method) {
            var that = this;
            return that._renderItems(dataItems, function(items) {
                that.element[method](items);
            });
        },

        _renderItems: function(dataItems, callback) {
            var items = $(kendo.render(this.template, dataItems));
            callback(items);
            this._enhanceItems(items);
            mobile.init(items);

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
            var that = this,
                template = that.options.template,
                headerTemplate = that.options.headerTemplate,
                dataIDAttribute = ' data-uid="#=arguments[0].uid || ""#"',
                templateProxy = {},
                groupTemplateProxy = {};

            if (typeof template === FUNCTION) {
                templateProxy.template = template;
                template = "#=this.template(data)#";
            }

            that.template = proxy(kendo.template("<li" + dataIDAttribute + ">" + template + "</li>"), templateProxy);

            groupTemplateProxy.template = that.template;

            if (typeof headerTemplate === FUNCTION) {
                groupTemplateProxy._headerTemplate = headerTemplate;
                headerTemplate = "#=this._headerTemplate(data)#";
            }

            groupTemplateProxy.headerTemplate = kendo.template(headerTemplate);

            that.groupTemplate = proxy(GROUP_TEMPLATE, groupTemplateProxy);
        },

        _click: function(e) {
            if (e.event.which > 1 || e.isDefaultPrevented()) {
                return;
            }

            var that = this,
                dataItem,
                item = e.target,
                target = $(e.event.target),
                buttonElement = target.closest(kendo.roleSelector("button", "detailbutton", "backbutton")),
                button = kendo.widgetInstance(buttonElement, ui),
                id = item.attr(kendo.attr("uid"));

            if (id) {
                dataItem = that.dataSource.getByUid(id);
            }

            if (that.trigger(CLICK, {target: target, item: item, dataItem: dataItem, button: button})) {
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
            var that = this,
                options = that.options,
                grouped = options.type === "group",
                element = that.element,
                inset = options.style === "inset";

            element.addClass("km-listview")
                .toggleClass("km-list", !grouped)
                .toggleClass("km-virtual-list", that.virtual)
                .toggleClass("km-listinset", !grouped && inset)
                .toggleClass("km-listgroup", grouped && !inset)
                .toggleClass("km-listgroupinset", grouped && inset);

            if (!element.parents(".km-listview")[0]) {
                element.closest(".km-content").toggleClass("km-insetcontent", inset); // iOS has white background when the list is not inset.
            }

            if (grouped) {
                that._styleGroups();
            }
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
        },
    });

    kendo.mobile.ui.VirtualList = VirtualList;
    ui.plugin(ListView);
})(window.kendo.jQuery);
