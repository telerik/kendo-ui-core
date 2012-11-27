kendo_module({
    id: "tabstrip",
    name: "TabStrip",
    category: "web",
    description: "The TabStrip widget displays a collection of tabs with associated tab content.",
    depends: [ "data" ]
});

(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        keys = kendo.keys,
        map = $.map,
        each = $.each,
        trim = $.trim,
        extend = $.extend,
        template = kendo.template,
        Widget = ui.Widget,
        excludedNodesRegExp = /^(a|div)$/i,
        NS = ".kendoTabStrip",
        IMG = "img",
        HREF = "href",
        PREV = "prev",
        LINK = "k-link",
        LAST = "k-last",
        CLICK = "click",
        ERROR = "error",
        EMPTY = ":empty",
        IMAGE = "k-image",
        FIRST = "k-first",
        SELECT = "select",
        ACTIVATE = "activate",
        CONTENT = "k-content",
        CONTENTURL = "contentUrl",
        MOUSEENTER = "mouseenter",
        MOUSELEAVE = "mouseleave",
        CONTENTLOAD = "contentLoad",
        DISABLEDSTATE = "k-state-disabled",
        DEFAULTSTATE = "k-state-default",
        ACTIVESTATE = "k-state-active",
        FOCUSEDSTATE = "k-state-focused",
        HOVERSTATE = "k-state-hover",
        TABONTOP = "k-tab-on-top",
        NAVIGATABLEITEMS = ".k-item:not(." + DISABLEDSTATE + ")",
        CLICKABLEITEMS = ".k-tabstrip-items > " + NAVIGATABLEITEMS,
        HOVERABLEITEMS = ".k-tabstrip-items > " + NAVIGATABLEITEMS + ":not(." + ACTIVESTATE + ")",
        DISABLEDLINKS = ".k-tabstrip-items > .k-state-disabled .k-link",

        templates = {
            content: template(
                "<div class='k-content'#= contentAttributes(data) # role='tabpanel'>#= content(item) #</div>"
            ),
            itemWrapper: template(
                "<#= tag(item) # class='k-link'#= contentUrl(item) ##= textAttributes(item) #>" +
                    "#= image(item) ##= sprite(item) ##= text(item) #" +
                "</#= tag(item) #>"
            ),
            item: template(
                "<li class='#= wrapperCssClass(group, item) #' role='tab' #=item.active ? \"aria-selected='true'\" : ''#>" +
                    "#= itemWrapper(data) #" +
                "</li>"
            ),
            image: template("<img class='k-image' alt='' src='#= imageUrl #' />"),
            sprite: template("<span class='k-sprite #= spriteCssClass #'></span>"),
            empty: template("")
        },

        rendering = {
            wrapperCssClass: function (group, item) {
                var result = "k-item",
                    index = item.index;

                if (item.enabled === false) {
                    result += " k-state-disabled";
                } else {
                    result += " k-state-default";
                }

                if (index === 0) {
                    result += " k-first";
                }

                if (index == group.length-1) {
                    result += " k-last";
                }

                return result;
            },
            textAttributes: function(item) {
                return item.url ? " href='" + item.url + "'" : "";
            },
            text: function(item) {
                return item.encoded === false ? item.text : kendo.htmlEncode(item.text);
            },
            tag: function(item) {
                return item.url ? "a" : "span";
            },
            contentAttributes: function(content) {
                return content.active !== true ? " style='display:none' aria-hidden='true' aria-expanded='false'" : "";
            },
            content: function(item) {
                return item.content ? item.content : item.contentUrl ? "" : "&nbsp;";
            },
            contentUrl: function(item) {
                return item.contentUrl ? kendo.attr("content-url") + '="' + item.contentUrl + '"' : "";
            }
        };

    function updateTabClasses (tabs) {
        tabs.children(IMG)
            .addClass(IMAGE);

        tabs.children("a")
            .addClass(LINK)
            .children(IMG)
            .addClass(IMAGE);

        tabs.filter(":not([disabled]):not([class*=k-state-disabled])")
            .addClass(DEFAULTSTATE);

        tabs.filter("li[disabled]")
            .addClass(DISABLEDSTATE)
            .removeAttr("disabled");

        tabs.filter(":not([class*=k-state])")
            .children("a")
            .filter(":focus")
            .parent()
            .addClass(ACTIVESTATE + " " + TABONTOP);

        tabs.attr("role", "tab");
        tabs.filter("." + ACTIVESTATE)
            .attr("aria-selected", true);


        tabs.each(function() {
            var item = $(this);

            if (!item.children("." + LINK).length) {
                item
                    .contents()      // exclude groups, real links, templates and empty text nodes
                    .filter(function() { return (!this.nodeName.match(excludedNodesRegExp) && !(this.nodeType == 3 && !trim(this.nodeValue))); })
                    .wrapAll("<a class='" + LINK + "'/>");
            }
        });

    }

    function updateFirstLast (tabGroup) {
        var tabs = tabGroup.children(".k-item");

        tabs.filter(".k-first:not(:first-child)").removeClass(FIRST);
        tabs.filter(".k-last:not(:last-child)").removeClass(LAST);
        tabs.filter(":first-child").addClass(FIRST);
        tabs.filter(":last-child").addClass(LAST);
    }

    var TabStrip = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that._animations(that.options);

            if (that.element.is("ul")) {
                that.wrapper = that.element.wrapAll("<div />").parent();
            } else {
                that.wrapper = that.element;
            }

            options = that.options;

            that.wrapper
                .on(CLICK + NS, DISABLEDLINKS, false)
                .on("touchend" + NS + " click" + NS, CLICKABLEITEMS, function(e) {
                    if (that._click($(e.currentTarget))) {
                        e.preventDefault();
                    }
                })
                .on(MOUSEENTER + NS + " " + MOUSELEAVE + NS, HOVERABLEITEMS, that._toggleHover)
                .on("keydown" + NS, $.proxy(that._keydown, that))
                .on("focus" + NS, $.proxy(that._active, that))
                .on("blur" + NS, function() { that._current(null); });

            that._isRtl = kendo.support.isRtl(that.wrapper);

            that._tabindex();

            that._updateClasses();

            that._dataSource();

            if (options.dataSource) {
                that.dataSource.fetch();
            }

            if (that.options.contentUrls) {
                that.wrapper.find(".k-tabstrip-items > .k-item")
                    .each(function(index, item) {
                        $(item).find(">." + LINK).data(CONTENTURL, that.options.contentUrls[index]);
                    });
            }

            var selectedItems = that.tabGroup.children("li." + ACTIVESTATE),
                content = that.contentHolder(selectedItems.index());

            if (content.length > 0 && content[0].childNodes.length === 0) {
                that.activateTab(selectedItems.eq(0));
            }

            that.element.attr("role", "tablist");

            if (that.element[0].id) {
                that._ariaId = that.element[0].id + "_ts_active";
            }

            kendo.notify(that);
        },

        _active: function() {
            var item = this.tabGroup.children().filter("." + ACTIVESTATE);
            this._current(item[0] ? item : this._endItem("first"));
        },

        _endItem: function(action) {
            return this.tabGroup.children(NAVIGATABLEITEMS)[action]();
        },

        _item: function(item, action) {
            var endItem;
            if (action === PREV) {
                endItem = "last";
            } else {
                endItem = "first";
            }

            if (!item) {
                return this._endItem(endItem);
            }

            item = item[action]();

            if (!item[0]) {
                item = this._endItem(endItem);
            }

            if (item.hasClass(DISABLEDSTATE)) {
                item = this._item(item, action);
            }

            return item;
        },

        _current: function(candidate) {
            var that = this,
                focused = that._focused,
                id = that._ariaId;

            if (candidate === undefined) {
                return focused;
            }

            if (focused) {
                if (focused[0].id === id) {
                    focused.removeAttr("id");
                }
                focused.removeClass(FOCUSEDSTATE);
            }

            if (candidate) {
                if (!candidate.hasClass(ACTIVESTATE)) {
                    candidate.addClass(FOCUSEDSTATE);
                }

                that.element.removeAttr("aria-activedescendant");

                id = candidate[0].id || id;

                if (id) {
                    candidate.attr("id", id);
                    that.element.attr("aria-activedescendant", id);
                }
            }

            that._focused = candidate;
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                current = that._current(),
                rtl = that._isRtl,
                action;

            if (e.target != e.currentTarget) {
                return;
            }

            if (key == keys.DOWN || key == keys.RIGHT) {
                action = rtl ? PREV : "next";
            } else if (key == keys.UP || key == keys.LEFT) {
                action = rtl ? "next" : PREV;
            } else if (key == keys.ENTER || key == keys.SPACEBAR) {
                that._click(current);
                e.preventDefault();
            } else if (key == keys.HOME) {
                that._click(that._endItem("first"));
                e.preventDefault();
                return;
            } else if (key == keys.END) {
                that._click(that._endItem("last"));
                e.preventDefault();
                return;
            }

            if (action) {
                that._click(that._item(current, action));
                e.preventDefault();
            }
        },

        _dataSource: function() {
            var that = this;

            if (that.dataSource && that._refreshHandler) {
                that.dataSource.unbind("change", that._refreshHandler);
            } else {
                that._refreshHandler = $.proxy(that.refresh, that);
            }

            that.dataSource = kendo.data.DataSource.create(that.options.dataSource)
                                .bind("change", that._refreshHandler);
        },

        setDataSource: function(dataSource) {
            this.options.dataSource = dataSource;
            this._dataSource();
            dataSource.fetch();
        },

        _animations: function(options) {
            if (options && ("animation" in options) && !options.animation) {
                options.animation = { open: { effects: {} }, close: { effects: {} } }; // No animation
            }
        },

        refresh: function(e) {
            var that = this,
                options = that.options,
                text = kendo.getter(options.dataTextField),
                content = kendo.getter(options.dataContentField),
                contentUrl = kendo.getter(options.dataContentUrlField),
                image = kendo.getter(options.dataImageUrlField),
                url = kendo.getter(options.dataUrlField),
                sprite = kendo.getter(options.dataSpriteCssClass),
                idx,
                tabs = [],
                tab,
                action,
                view = that.dataSource.view(),
                length;


            e = e || {};
            action = e.action;

            if (action) {
               view = e.items;
            }

            for (idx = 0, length = view.length; idx < length; idx ++) {
                tab = {
                    text: text(view[idx])
                };

                if (options.dataContentField) {
                    tab.content = content(view[idx]);
                }

                if (options.dataContentUrlField) {
                    tab.contentUrl = contentUrl(view[idx]);
                }

                if (options.dataUrlField) {
                    tab.url = url(view[idx]);
                }

                if (options.dataImageUrlField) {
                    tab.imageUrl = image(view[idx]);
                }

                if (options.dataSpriteCssClass) {
                    tab.spriteCssClass = sprite(view[idx]);
                }

                tabs[idx] = tab;
            }

            if (e.action == "add") {
                if (e.index < that.tabGroup.children().length) {
                    that.insertBefore(tabs, that.tabGroup.children().eq(e.index));
                } else {
                    that.append(tabs);
                }
            } else if (e.action == "remove") {
                for (idx = 0; idx < view.length; idx++) {
                   that.remove(e.index);
                }
            } else if (e.action == "itemchange") {
                idx = that.dataSource.view().indexOf(view[0]);
                if (e.field === options.dataTextField) {
                    that.tabGroup.children().eq(idx).find(".k-link").text(view[0].get(e.field));
                }
            } else {
                that.trigger("dataBinding");
                that.remove("li");
                that.append(tabs);
                that.trigger("dataBound");
            }
        },

        value: function(value) {
            var that = this;

            if (value !== undefined) {
                if (value != that.value()) {
                   that.tabGroup.children().each(function() {
                        if ($.trim($(this).text()) == value) {
                            that.select(this);
                        }
                   });
                }
            } else {
                return that.select().text();
            }
        },

        items: function() {
            return this.tabGroup[0].children;
        },

        setOptions: function(options) {
            var animation = this.options.animation;

            this._animations(options);

            options.animation = extend(true, animation, options.animation);

            Widget.fn.setOptions.call(this, options);
        },

        events: [
            SELECT,
            ACTIVATE,
            ERROR,
            CONTENTLOAD,
            "change",
            "dataBinding",
            "dataBound"
        ],

        options: {
            name: "TabStrip",
            dataTextField: "",
            dataContentField: "",
            dataImageUrlField: "",
            dataUrlField: "",
            dataSpriteCssClass: "",
            dataContentUrlField: "",
            animation: {
                open: {
                    effects: "expand:vertical fadeIn",
                    duration: 200
                },
                close: { // if close animation effects are defined, they will be used instead of open.reverse
                    duration: 200
                }
            },
            collapsible: false
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            if (that._refreshHandler) {
                that.dataSource.unbind("change", that._refreshHandler);
            }

            that.wrapper.off(NS);
            kendo.destroy(that.wrapper);
        },

        select: function (element) {
            var that = this;

            if (arguments.length === 0) {
                return that.tabGroup.children("li." + ACTIVESTATE);
            }

            if (!isNaN(element)) {
                element = that.tabGroup.children().get(element);
            }

            element = that.tabGroup.find(element);
            $(element).each(function (index, item) {
                item = $(item);
                if (!item.hasClass(ACTIVESTATE) && !that.trigger(SELECT, { item: item[0], contentElement: that.contentHolder(item.index())[0] })) {
                    that.activateTab(item);
                }
            });

            return that;
        },

        enable: function (element, state) {
            this._toggleDisabled(element, state !== false);

            return this;
        },

        disable: function (element) {
            this._toggleDisabled(element, false);

            return this;
        },

        reload: function (element) {
            element = this.tabGroup.find(element);
            var that = this;

            element.each(function () {
                var item = $(this),
                    contentUrl = item.find("." + LINK).data(CONTENTURL),
                    content = that.contentHolder(item.index());

                if (contentUrl) {
                    that.ajaxRequest(item, content, null, contentUrl);
                }
            });

            return that;
        },

        append: function (tab) {
            var that = this,
                inserted = that._create(tab);

            each(inserted.tabs, function (idx) {
                that.tabGroup.append(this);
                that.wrapper.append(inserted.contents[idx]);
            });

            updateFirstLast(that.tabGroup);
            that._updateContentElements();

            return that;
        },

        insertBefore: function (tab, referenceTab) {
            var that = this,
                inserted = that._create(tab),
                referenceContent = $(that.contentElement(referenceTab.index()));

            each(inserted.tabs, function (idx) {
                referenceTab.before(this);
                referenceContent.before(inserted.contents[idx]);
            });

            updateFirstLast(that.tabGroup);
            that._updateContentElements();

            return that;
        },

        insertAfter: function (tab, referenceTab) {
            var that = this,
                inserted = that._create(tab),
                referenceContent = $(that.contentElement(referenceTab.index()));

            each(inserted.tabs, function (idx) {
                referenceTab.after(this);
                referenceContent.after(inserted.contents[idx]);
            });

            updateFirstLast(that.tabGroup);
            that._updateContentElements();

            return that;
        },

        remove: function (elements) {
            var that = this,
                type = typeof elements,
                contents = $();

            if (type === "string") {
                elements = that.tabGroup.find(elements);
            } else if (type === "number") {
                elements = that.tabGroup.children().eq(elements);
            }

            elements.each(function () {
                contents.push(that.contentElement($(this).index()));
            });
            elements.remove();
            contents.remove();

            that._updateContentElements();

            return that;
        },

        _create: function (tab) {
            var plain = $.isPlainObject(tab),
                that = this, tabs, contents;

            if (plain || $.isArray(tab)) {
                tab = $.isArray(tab) ? tab : [tab];

                tabs = map(tab, function (value, idx) {
                            return $(TabStrip.renderItem({
                                group: that.tabGroup,
                                item: extend(value, { index: idx })
                            }));
                        });

                contents = map( tab, function (value, idx) {
                            if (value.content || value.contentUrl) {
                                return $(TabStrip.renderContent({
                                    item: extend(value, { index: idx })
                                }));
                            }
                        });
            } else {
                tabs = $(tab);
                contents = $("<div class='" + CONTENT + "'/>");

                updateTabClasses(tabs);
            }

            return { tabs: tabs, contents: contents };
        },

        _toggleDisabled: function(element, enable) {
            element = this.tabGroup.find(element);
            element.each(function () {
                $(this)
                    .toggleClass(DEFAULTSTATE, enable)
                    .toggleClass(DISABLEDSTATE, !enable);
            });
        },

        _updateClasses: function() {
            var that = this,
                tabs, activeItem, activeTab;

            that.wrapper.addClass("k-widget k-header k-tabstrip");

            that.tabGroup = that.wrapper.children("ul").addClass("k-tabstrip-items k-reset");

            if (!that.tabGroup[0]) {
                that.tabGroup = $("<ul class='k-tabstrip-items k-reset'/>").appendTo(that.wrapper);
            }

            tabs = that.tabGroup.find("li").addClass("k-item");

            if (tabs.length) {
                activeItem = tabs.filter("." + ACTIVESTATE).index();
                activeTab = activeItem >= 0 ? activeItem : undefined;

                that.tabGroup // Remove empty text nodes
                    .contents()
                    .filter(function () { return (this.nodeType == 3 && !trim(this.nodeValue)); })
                    .remove();
            }

            if (activeItem >= 0) {
                tabs.eq(activeItem).addClass(TABONTOP);
            }

            that.contentElements = that.wrapper.children("div");

            that.contentElements
                .addClass(CONTENT)
                .eq(activeTab)
                .addClass(ACTIVESTATE)
                .css({ display: "block" });

            if (tabs.length) {
                updateTabClasses(tabs);

                updateFirstLast(that.tabGroup);
                that._updateContentElements();
            }
        },

        _updateContentElements: function() {
            var that = this,
                contentUrls = that.options.contentUrls || [],
                tabStripID = that.element.attr("id"),
                contentElements = that.wrapper.children("div");

            that.tabGroup.find(".k-item").each(function(idx) {
                var currentContent = contentElements.eq(idx),
                    id = tabStripID + "-" + (idx+1);

                this.setAttribute("aria-controls", id);

                if (!currentContent.length && contentUrls[idx]) {
                    $("<div id='"+ id +"' class='" + CONTENT + "'/>").appendTo(that.wrapper);
                } else {
                    currentContent.attr("id", id);
                }
                currentContent.attr("role", "tabpanel");
                currentContent.filter(":not(." + ACTIVESTATE + ")").attr("aria-hidden", true).attr("aria-expanded", false);
                currentContent.filter("." + ACTIVESTATE).attr("aria-expanded", true);
            });

            that.contentElements = that.contentAnimators = that.wrapper.children("div"); // refresh the contents

            if (kendo.kineticScrollNeeded && kendo.mobile.ui.Scroller) {
                kendo.touchScroller(that.contentElements);
                that.contentElements = that.contentElements.children(".km-scroll-container");
            }
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass(HOVERSTATE, e.type == MOUSEENTER);
        },

        _click: function (item) {
            var that = this,
                link = item.find("." + LINK),
                href = link.attr(HREF),
                collapse = that.options.collapsible,
                contentHolder = that.contentHolder(item.index()),
                prevent, isAnchor;

            if (item.closest(".k-widget")[0] != that.wrapper[0]) {
                return;
            }

            if (item.is("." + DISABLEDSTATE + (!collapse ? ",." + ACTIVESTATE : ""))) {
                return true;
            }

            if (that.tabGroup.children("[data-animating], [data-in-request]").length) {
                return;
            }

            if (that.trigger(SELECT, { item: item[0], contentElement: contentHolder[0] })) {
                return true;
            }

            isAnchor = link.data(CONTENTURL) || (href && (href.charAt(href.length - 1) == "#" || href.indexOf("#" + that.element[0].id + "-") != -1));

            if (!href || isAnchor) {
                prevent = true;
            } else {
                return;
            }

            if (collapse && item.is("." + ACTIVESTATE)) {
                that.deactivateTab(item);
                return true;
            }

            if (that.activateTab(item)) {
                prevent = true;
            }

            return prevent;
        },

        deactivateTab: function (item) {
            var that = this,
                animationSettings = that.options.animation,
                animation = animationSettings.open,
                close = extend({}, animationSettings.close),
                hasCloseAnimation = close && "effects" in close;
            item = that.tabGroup.find(item);

            close = extend( hasCloseAnimation ? close : extend({ reverse: true }, animation), { hide: true });

            if (kendo.size(animation.effects)) {
                item.kendoAddClass(DEFAULTSTATE, { duration: animation.duration });
                item.kendoRemoveClass(ACTIVESTATE, { duration: animation.duration });
            } else {
                item.addClass(DEFAULTSTATE);
                item.removeClass(ACTIVESTATE);
            }

            item.removeAttr("aria-selected");

            that.contentAnimators
                    .filter("." + ACTIVESTATE)
                    .kendoStop(true, true)
                    .kendoAnimate( close )
                    .removeClass(ACTIVESTATE)
                    .attr("aria-hidden", true);
        },

        activateTab: function (item) {
            item = this.tabGroup.find(item);

            var that = this,
                animationSettings = that.options.animation,
                animation = animationSettings.open,
                close = extend({}, animationSettings.close),
                hasCloseAnimation = close && "effects" in close,
                neighbours = item.parent().children(),
                oldTab = neighbours.filter("." + ACTIVESTATE),
                itemIndex = neighbours.index(item);

            close = extend( hasCloseAnimation ? close : extend({ reverse: true }, animation), { hide: true });
            // deactivate previously active tab
            if (kendo.size(animation.effects)) {
                oldTab.kendoRemoveClass(ACTIVESTATE, { duration: close.duration });
                item.kendoRemoveClass(HOVERSTATE, { duration: close.duration });
            } else {
                oldTab.removeClass(ACTIVESTATE);
                item.removeClass(HOVERSTATE);
            }

            // handle content elements
            var contentAnimators = that.contentAnimators;

            if (contentAnimators.length === 0) {
                oldTab.removeClass(TABONTOP);
                item.addClass(TABONTOP) // change these directly to bring the tab on top.
                    .css("z-index");

                item.addClass(ACTIVESTATE);
                that._current(item);

                that.trigger("change");

                return false;
            }

            var visibleContents = contentAnimators.filter("." + ACTIVESTATE),
                contentHolder = that.contentHolder(itemIndex),
                contentElement = contentHolder.closest(".k-content");

            if (contentHolder.length === 0) {
                visibleContents
                    .removeClass( ACTIVESTATE )
                    .attr("aria-hidden", true)
                    .kendoStop(true, true)
                    .kendoAnimate( close );
                return false;
            }

            item.attr("data-animating", true);

            var isAjaxContent = (item.children("." + LINK).data(CONTENTURL) || false) && contentHolder.is(EMPTY),
                showContentElement = function () {
                    oldTab.removeClass(TABONTOP);
                    item.addClass(TABONTOP) // change these directly to bring the tab on top.
                        .css("z-index");

                    if (kendo.size(animation.effects)) {
                        oldTab.kendoAddClass(DEFAULTSTATE, { duration: animation.duration });
                        item.kendoAddClass(ACTIVESTATE, { duration: animation.duration });
                    } else {
                        oldTab.addClass(DEFAULTSTATE);
                        item.addClass(ACTIVESTATE);
                    }
                    oldTab.removeAttr("aria-selected");
                    item.attr("aria-selected", true);

                    that._current(item);

                    contentElement
                        .addClass(ACTIVESTATE)
                        .removeAttr("aria-hidden")
                        .kendoStop(true, true)
                        .attr("aria-expanded", true)
                        .kendoAnimate( extend({ init: function () {
                            that.trigger(ACTIVATE, { item: item[0], contentElement: contentHolder[0] });
                        } }, animation, { complete: function () { item.removeAttr("data-animating"); } } ) );
                },
                showContent = function() {
                    if (!isAjaxContent) {
                        showContentElement();
                        that.trigger("change");
                    } else {
                        that.ajaxRequest(item, contentHolder, function () {
                            showContentElement();
                            that.trigger("change");
                        });
                    }
                };

            visibleContents
                    .removeClass(ACTIVESTATE);

            visibleContents.attr("aria-hidden", true);
            visibleContents.attr("aria-expanded", false);

            if (visibleContents.length) {
                visibleContents
                    .kendoStop(true, true)
                    .kendoAnimate(extend( {
                        complete: showContent
                   }, close ));
            } else {
                showContent();
            }

            return true;
        },

        contentElement: function (itemIndex) {
            if (isNaN(itemIndex - 0)) {
                return undefined;
            }

            var contentElements = this.contentElements && this.contentElements[0] && !kendo.kineticScrollNeeded ? this.contentElements : this.contentAnimators,
                idTest = new RegExp("-" + (itemIndex + 1) + "$");

            if (contentElements) {
                for (var i = 0, len = contentElements.length; i < len; i++) {
                    if (idTest.test(contentElements.closest(".k-content")[i].id)) {
                        return contentElements[i];
                    }
                }
            }

            return undefined;
        },

        contentHolder: function (itemIndex) {
            var contentElement = $(this.contentElement(itemIndex));

            return kendo.support.touch ? contentElement.children(".km-scroll-container") : contentElement;
        },

        ajaxRequest: function (element, content, complete, url) {
            element = this.tabGroup.find(element);
            if (element.find(".k-loading").length) {
                return;
            }

            var that = this,
                link = element.find("." + LINK),
                data = {},
                statusIcon = null,
                loadingIconTimeout = setTimeout(function () {
                    statusIcon = $("<span class='k-icon k-loading'/>").prependTo(link);
                }, 100);

            element.attr("data-in-request", true);

            $.ajax({
                type: "GET",
                cache: false,
                url: url || link.data(CONTENTURL) || link.attr(HREF),
                dataType: "html",
                data: data,

                error: function (xhr, status) {
                    element.removeAttr("data-animating");
                    if (that.trigger("error", { xhr: xhr, status: status })) {
                        this.complete();
                    }
                },

                complete: function () {
                    element.removeAttr("data-in-request");

                    clearTimeout(loadingIconTimeout);
                    if (statusIcon !== null) {
                        statusIcon.remove();
                    }
                },

                success: function (data, textStatus) {
                    content.html(data);

                    if (complete) {
                        complete.call(that, content);
                    }

                    that.trigger(CONTENTLOAD, { item: element[0], contentElement: content[0] });
                }
            });
        }
    });

    // client-side rendering
    extend(TabStrip, {
        renderItem: function (options) {
            options = extend({ tabStrip: {}, group: {} }, options);

            var empty = templates.empty,
                item = options.item;

            return templates.item(extend(options, {
                image: item.imageUrl ? templates.image : empty,
                sprite: item.spriteCssClass ? templates.sprite : empty,
                itemWrapper: templates.itemWrapper
            }, rendering));
        },

        renderContent: function (options) {
            return templates.content(extend(options, rendering));
        }
    });

    kendo.ui.plugin(TabStrip);

})(window.kendo.jQuery);
