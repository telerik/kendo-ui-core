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

        NS = ".kendoMobileListView",
        LAST_PAGE_REACHED = "lastPageReached",
        CLICK = "click",
        TRIGGER = "touchend click",
        TRIGGER_NS = TRIGGER.split(" ").join(NS + " ") + NS,

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

    var ListView = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            options = that.options;

            element
                .on("down", HIGHLIGHT_SELECTOR, "_highlight")
                .on("move up cancel", HIGHLIGHT_SELECTOR, "_dim")
                .on(TRIGGER, ITEM_SELECTOR, "_click");

            element.wrap(WRAPPER);
            that.wrapper = that.element.parent();

            that._footer();

            that._dataSource();

            that._bindScroller();

            that._fixHeaders();

            if (options.dataSource && that.options.autoBind) {
                that.dataSource.fetch();
            } else {
                that._style();
            }

            kendo.notify(that, ui);
        },

        events: [
            CLICK,
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
            scrollTreshold: 30,
            pullToRefresh: false,
            pullTemplate: "Pull to refresh",
            releaseTemplate: "Release to refresh",
            refreshTemplate: "Refreshing",
            pullOffset: 140
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

            that._unbindDataSource();
            that.stopEndlessScrolling();
            that.stopLoadMore();

            kendo.destroy(that.element);
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
                contents,
                data,
                item;

            if (e.action === "itemchange") {
                data = e.items[0];
                item = $(that.template(data));

                element.find("[data-" + kendo.ns + "uid=" + data.uid + "]").replaceWith(item);

                that.trigger("itemChange", {
                    item: item,
                    data: data,
                    ns: ui
                });

                that._style();
                return;
            }

            if (!that.template) {
                that._templates();
            }

            that._cacheDataItems(view);

            that.trigger("dataBinding");

            if (dataSource.group()[0]) {
                options.type = "group";
                contents = kendo.render(that.groupTemplate, view);
            } else {
                contents = kendo.render(that.template, view);
            }

            if (loading) {
                appendMethod = "append";
            } else if (options.appendOnRefresh) {
                appendMethod = "prepend";
            }

            contents = $(contents);
            element[appendMethod](contents);
            mobile.init(contents);

            if (loading) {
                that.loading = false;
                that._calcTreshold();
                that._toggleLoader(false);
            }

            if (options.pullToRefresh) {
                that._scroller().pullHandled();
            }

            that._hideLoading();

            that._shouldFixHeaders();
            that._style();

            that.trigger("dataBound", { ns: ui });
        },

        _cacheDataItems: function(view) {
            var that = this, item;

            if (!that.element[0].firstChild) {
                that._firstOrigin = that._first = view[0];
                that._last = view[view.length - 1];
            }

            if (that._pulled) {
                item = view[0];
                that._pulled = false;

                if (item) {
                    that._first = item;
                }
            }

            if (that.loading) {
                item = view[view.length - 1];

                if (item) {
                    that._last = item;
                }
            }
        },

        items: function() {
            if (this.options.type === "group") {
                return this.element.find(".km-list").children();
            } else {
                return this.element.children();
            }
        },

        stopEndlessScrolling: function() {
            var that = this,
                scroller = that._scroller();

           if (scroller && that._loadIcon) {
               that.loading = false;
               that._loadIcon.parent().hide();

               scroller.unbind("resize", that._scrollerResize)
                       .unbind("scroll", that._scrollerScroll);

               that.trigger(LAST_PAGE_REACHED);
           }
        },

        stopLoadMore: function() {
           var that = this;

           if (that._loadButton) {
               that.loading = false;
               that._loadButton
                   .off(TRIGGER_NS)
                   .parent().hide();

               that.trigger(LAST_PAGE_REACHED);
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

        _fixHeader: function(e) {
            var i = 0,
                that = this,
                scroller = that._scroller(),
                scrollTop = e.scrollTop,
                headers = that.headers,
                headerPair,
                offset,
                header;

            if (that.fixedHeaders) {
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
            }
        },

        _shouldFixHeaders: function() {
            this.fixedHeaders = this.options.type === "group" && this.options.fixedHeaders;
        },

        _cacheHeaders: function() {
            var that = this,
                headers = [];

            if (that.fixedHeaders) {
                that.element.find("." + GROUP_CLASS).each(function(_, header) {
                    header = $(header);
                    headers.unshift({
                        offset: header.position().top,
                        header: header
                    });
                });

                that.headers = headers;
                that._fixHeader({scrollTop: 0});
            }
        },

        _fixHeaders: function() {
            var that = this,
                scroller = that._scroller();

            that._shouldFixHeaders();

            if (scroller) {
                kendo.onResize(function(){
                    that._cacheHeaders();
                });

                scroller.bind("scroll", function(e) {
                    that._fixHeader(e);
                });
            }
        },

        _bindScroller: function() {
            var that = this,
                options = that.options,
                scroller = that._scroller();

            if (!scroller) {
                return;
            }

            if (options.pullToRefresh) {
                scroller.setOptions({
                    pullToRefresh: true,
                    pull: function() {
                        var callback = options.pullParameters,
                            params = { page: 1 };

                        if (callback) {
                            params = callback.call(that, that._first);
                        }

                        that._pulled = true;
                        that.dataSource.read(params);
                    },
                    pullTemplate: options.pullTemplate,
                    releaseTemplate: options.releaseTemplate,
                    refreshTemplate: options.refreshTemplate
                });
            }

            if (options.endlessScroll) {
                that._scrollHeight = scroller.element.height();
                that._scrollerResize = function() {
                    that._scrollHeight = scroller.element.height();
                    that._calcTreshold();
                },
                that._scrollerScroll = function(e) {
                    if (!that.loading && e.scrollTop + that._scrollHeight > that._treshold) {
                        that._nextPage();
                    }
                };

                scroller.setOptions({
                    resize: that._scrollerResize,
                    scroll: that._scrollerScroll
                });
            }
        },

        _calcTreshold: function() {
            var that = this,
                scroller = that._scroller();

            if (scroller) {
                that._treshold = scroller.scrollHeight() - that.options.scrollTreshold;
            }
        },

        _nextPage: function() {
            var that = this,
                options = that.options,
                callback = options.endlessScrollParameters || options.loadMoreParameters,
                params;

            that.loading = true;
            that._toggleLoader(true);

            if (callback) {
                params = callback.call(that, that._firstOrigin, that._last);
            }

            if (!that.dataSource.next(params)) {
                that.stopLoadMore();
                that.stopEndlessScrolling();
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
            if (e.which > 1 || e.isDefaultPrevented()) {
                return;
            }

            var that = this,
                dataItem,
                item = $(e.currentTarget),
                target = $(e.target),
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

            that._cacheHeaders();
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

        _footer: function() {
            var that = this,
                options = that.options,
                loadMore = options.loadMore,
                loadWrapper;

            if (loadMore || options.endlessScroll) {
                that._loadIcon = $('<span style="display:none" class="km-icon"></span>');
                loadWrapper = $('<span class="km-load-more"></span>').append(that._loadIcon);

                if (loadMore) {
                    that._loadButton = $('<button class="km-load km-button">' + options.loadMoreText + '</button>')
                                        .on(TRIGGER_NS, proxy(that._nextPage, that));

                    loadWrapper.append(that._loadButton);
                }

                that.wrapper.append(loadWrapper);
            }
        },

        _toggleLoader: function(toggle) {
            var that = this,
                icon = that._loadIcon,
                button = that._loadButton;

            if (button) {
                button.toggle(!toggle);
            }

            if (toggle) {
                icon.css("display", "block");
            } else {
                icon.hide();
            }
        },

        _scroller: function() {
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
        }
    });

    ui.plugin(ListView);
})(window.kendo.jQuery);
