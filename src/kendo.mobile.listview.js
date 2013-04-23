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


    var ListView = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            options = that.options;

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

            element.css("-ms-touch-action", "auto");

            element.wrap(WRAPPER);
            that.wrapper = that.element.parent();

            that._dataSource();

            if (that.options.pullToRefresh) {
                that._refreshHandler = new RefreshHandler(this);
            }

            that._headerFixer = new HeaderFixer(this);

            that._filterable();

            if (options.dataSource && that.options.autoBind) {
                that.dataSource.fetch();
            } else {
                that._style();
            }

            kendo.notify(that, ui);
        },

        events: [
            CLICK,
            "dataBound",
            STYLED,
            LAST_PAGE_REACHED
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
            this._dataSource();
            if (this.options.autoBind) {
                dataSource.fetch();
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

        refresh: function(e) {
            e = e || {};

            var that = this,
                element = that.element,
                options = that.options,
                dataSource = that.dataSource,
                view = dataSource.view(),
                loading = that.loading,
                appendMethod = "html",
                action = e.action,
                items = e.items,
                grouped = options.type === "group",
                idx = 0,
                contents,
                groups,
                length,
                data,
                item,
                currentItem;

            if (action === "itemchange") {
                data = items[0];
                currentItem = element.find("[data-" + kendo.ns + "uid=" + data.uid + "]");

                if (currentItem[0]) {
                    item = $(that.template(data));

                    currentItem.replaceWith(item);

                    that.trigger("itemChange", {
                        item: item,
                        data: data,
                        ns: ui
                    });
                }

                that._style();
                return;
            } else if (action === "add" && !grouped) {
                length = items.length;

                for (; idx < length; idx++) {
                    item = $(that.template(items[idx]));
                    item.appendTo(element);
                    mobile.init(item);
                }

                that._style();
                return;
            } else if (action === "remove" && !grouped) {
                length = items.length;

                for (; idx < length; idx++) {
                    element.find("[data-" + kendo.ns + "uid=" + items[idx].uid + "]").remove();
                }

                return;
            }

            if (!that.template) {
                that._templates();
            }

            that.trigger("dataBinding", { view: view });

            groups = dataSource.group();

            if (groups && groups[0]) {
                options.type = "group";
                contents = kendo.render(that.groupTemplate, view);
            } else {
                contents = kendo.render(that.template, view);
            }

            if (loading) {
                appendMethod = "append";
            } else if (options.appendOnRefresh && !that._filter) {
                appendMethod = "prepend";
            }

            that._filter = false;

            contents = $(contents);

            if (appendMethod === "html") {
                kendo.destroy(element.children());
            }
            element[appendMethod](contents);
            mobile.init(contents);

            that._hideLoading();

            that._style();

            that.trigger("dataBound", { ns: ui });
        },

        items: function() {
            if (this.options.type === "group") {
                return this.element.find(".km-list").children();
            } else {
                return this.element.children();
            }
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

        _unbindDataSource: function() {
            var that = this;

            that.dataSource.unbind(CHANGE, that._refreshHandler)
                           .unbind(PROGRESS, that._progressHandler);
        },

        _dataSource: function() {
            var that = this,
                options = that.options;

            if (that.dataSource && that._refreshHandler) {
                that._unbindDataSource();
            } else {
                that._refreshHandler = proxy(that.refresh, that);
                that._progressHandler = proxy(that._showLoading, that);
            }

            that.dataSource = DataSource.create(options.dataSource)
                                        .bind(CHANGE, that._refreshHandler);

            if (!options.pullToRefresh && !options.loadMore && !options.endlessScroll) {
                that.dataSource.bind(PROGRESS, that._progressHandler);
            }
        },

        _templates: function() {
            var that = this,
                template = that.options.template,
                headerTemplate = that.options.headerTemplate,
                dataIDAttribute =  ' data-uid="#=data.uid || ""#"',
                templateProxy = {},
                groupTemplateProxy = {};

            if (typeof template === FUNCTION) {
                templateProxy.template = template;
                template = "#=this.template(data)#";
            }

            groupTemplateProxy.template = that.template = proxy(kendo.template("<li" + dataIDAttribute + ">" + template + "</li>"), templateProxy);

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

            if (grouped) {
                element
                    .children()
                    .children("ul")
                    .addClass("km-list");

                element.children("li").each(function() {
                    var li = $(this),
                        groupHeader = li.contents().first();
                    li.addClass("km-group-container");
                    if (!groupHeader.is("ul") && !groupHeader.is("div." + GROUP_CLASS)) {
                        groupHeader.wrap(GROUP_WRAPPER);
                    }
                });
            }

            that._enhanceItems();

            if (!element.parents(".km-listview")[0]) {
                element.closest(".km-content").toggleClass("km-insetcontent", inset); // iOS has white background when the list is not inset.
            }

            that.trigger(STYLED);
        },

        _enhanceItems: function() {
            this.items().each(function() {
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

        scroller: function() {
            var that = this, view;

            if (!that._scrollerInstance) {
                view = that.view();
                that._scrollerInstance = view && view.scroller;
            }

            return that._scrollerInstance;
        },

        _showLoading: function() {
            var view = this.view();
            if (view && view.loader) {
                view.loader.show();
            }
        },

        _hideLoading: function() {
            var view = this.view();
            if (view && view.loader) {
                view.loader.hide();
            }
        },

        _filterable: function() {
            var that = this,
                filterable = that.options.filterable,
                events = "change paste";

            if (filterable) {

                that.element.before(SEARCH_TEMPLATE({
                    placeholder: filterable.placeholder || "Search..."
                }));

                if (filterable.autoFilter !== false) {
                    events += " keyup";
                }

                that.searchInput = that.wrapper.find("input[type=search]")
                    .closest("form").on("submit" + NS, function(e) {
                        e.preventDefault();
                    })
                    .end()
                    .on("focus" + NS, function() {
                        that._oldFilter = that.searchInput.val();
                    })
                    .on(events.split(" ").join(NS + " ") + NS, proxy(that._filterChange, that));

                that.clearButton = that.wrapper.find(".km-filter-reset")
                    .on(CLICK, proxy(that._clearFilter, that))
                    .hide();
            }
        },

        _search: function(expr) {
            this._filter = true;
            this.clearButton[expr ? "show" : "hide"]();
            this.dataSource.filter(expr);
        },

        _filterChange: function(e) {
            var that = this;
            if (e.type == "paste" && that.options.filterable.autoFilter !== false) {
                setTimeout(function() {
                    that._applyFilter();
                }, 1);
            } else {
                that._applyFilter();
            }
        },

        _applyFilter: function() {
            var that = this,
                filterable = that.options.filterable,
                value = that.searchInput.val(),
                expr = value.length ? {
                    field: filterable.field,
                    operator: filterable.operator || "startsWith",
                    ignoreCase: filterable.ignoreCase,
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

    ui.plugin(ListView);
})(window.kendo.jQuery);
