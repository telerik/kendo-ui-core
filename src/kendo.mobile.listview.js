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

    var VirtualListViewItem = kendo.Class.extend({
        init: function(listView, dataItem) {
            var element = listView.append([dataItem]),
                height = element.outerHeight(true);

            element.css({position: 'absolute', 'top': 0 });
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
            this.element.css({position: 'absolute', 'top': 0 });
            this.bottom = this.top + this.element.outerHeight(true);
        },

        above: function(item) {
            if (item) {
                this.top = item.top - this.height;
                this.bottom = item.top;
                this.element.css("top", this.top + "px");
            }

        },

        below: function(item) {
            if (item) {
                this.top = item.bottom;
                this.bottom = this.height + this.top;
                this.element.css("top", this.top + "px");
            }
        },

        destroy: function() {
            // kendo.destroy()
        }
    });


    var VirtualListViewItemBinder = kendo.Class.extend({
        init: function(listView) {
            var that = this;

            that.listView = listView;
            that.options = listView.options;

            that.configure();
        },

        configure: function() {
            var that = this,
                options = that.options,
                scroller = that.listView.scroller();

            if (that.dataSource) {
                that._unbindDataSource();
            }

            that.listView.dataSource = that.dataSource = DataSource.create(options.dataSource);

            that.buffer = new kendo.data.Buffer(that.dataSource, 30);

            that.list = new VirtualList({
                buffer: that.buffer,
                item: function(dataItem) {
                    return new VirtualListViewItem(that.listView, dataItem);
                },

                height: function() {
                    return scroller.height();
                }
            });

            scroller.makeVirtual();

            scroller.bind('scroll', function(e) {
                that.list.update(e.scrollTop);
            });

            that.buffer.bind('resize', function(e) {
                scroller.virtualSize(0, that.list.itemHeight() * that.buffer.length);
            });

            if (options.autoBind) {
                that.dataSource.fetch();
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

            if (options.autoBind) {
                that.dataSource.fetch();
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

            that._style();

            if (this.options.endlessScroll) {
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

                that.trigger("itemChange", { item: dataItem, data: newItem, ns: ui });
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
                dataIDAttribute = ' data-uid="#=data.uid || ""#"',
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

    var VirtualList = kendo.Observable.extend({
        init: function(options) {
            var list = this;

            kendo.Observable.fn.init.call(list);

            list.buffer = options.buffer;
            list.height = options.height;
            list.item = options.item;
            list.items = [];

            list.buffer.bind("reset", function() {
                list.refresh();
            });
        },

        refresh: function() {
            var list = this,
                buffer = list.buffer;
                items = list.items;

            while(items.length) {
                items.pop().destroy();
            }

            list.bottom = 0;
            list.offset = buffer.offset;
            list.top = 0;

            var targetHeight = list.height() * 3,
                itemConstructor = list.item,
                prevItem,
                item;

            while (list.bottom < targetHeight) {
                item = itemConstructor(list.content(list.offset + items.length));
                item.below(prevItem);
                prevItem = item;
                items.push(item);
                list.bottom = item.bottom;
            }

            list.buffer.setItemCount(items.length);
        },

        itemHeight: function() {
            return (this.bottom - this.top) / this.items.length;
        },

        update: function(top, center) {
            var list = this,
                height = list.height(),
                items = list.items,
                initialOffset = list.offset,
                topThreshold = top,
                targetTop = top - height,
                bottomThreshold = top + height + 20,
                targetBottom = bottomThreshold + height,
                itemCount = items.length,
                item,
                bottomItem;

            if (list.top > topThreshold) {
                console.log('top threshold reached');
                while (list.top > targetTop) {
                    console.log('shifting to', list.offset);
                    if (list.offset === 0) {
                        break;
                    }

                    list.offset --;
                    item = items.pop();

                    item.update(list.content(list.offset));
                    item.above(items[0]);
                    items.unshift(item);
                    list.top = items[0].top;
                }
            }

            if (list.bottom < bottomThreshold) {
                console.log('bottom threshold reached', list.bottom, bottomThreshold, targetBottom);
                while (list.bottom < targetBottom) {
                    if (list.offset + itemCount === list.buffer.length - 1) {
                        break;
                    }

                    list.offset ++;
                    item = items.shift();

                    item.update(list.content(list.offset + itemCount));
                    item.below(items[items.length - 1]);
                    items.push(item);
                    list.bottom = items[items.length - 1].bottom;
                }
            }

            if (initialOffset != list.offset) {
                list.top = items[0].top;
                list.bottom = items[items.length - 1].bottom;

                list.trigger("resize", { top: list.top, bottom: list.bottom });
            }
        },

        content: function(index) {
            return this.buffer.at(index);
        }
    });

    kendo.mobile.ui.VirtualList = VirtualList;
    ui.plugin(ListView);
})(window.kendo.jQuery);
