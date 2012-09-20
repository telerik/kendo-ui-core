(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
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
        CLICKABLEITEMS = ".k-tabstrip-items > .k-item:not(.k-state-disabled)",
        HOVERABLEITEMS = ".k-tabstrip-items > .k-item:not(.k-state-disabled):not(.k-state-active)",
        DISABLEDLINKS = ".k-tabstrip-items > .k-state-disabled .k-link",
        DISABLEDSTATE = "k-state-disabled",
        DEFAULTSTATE = "k-state-default",
        ACTIVESTATE = "k-state-active",
        HOVERSTATE = "k-state-hover",
        TABONTOP = "k-tab-on-top",

        templates = {
            content: template(
                "<div class='k-content'#= contentAttributes(data) #>#= content(item) #</div>"
            ),
            itemWrapper: template(
                "<#= tag(item) # class='k-link'#= contentUrl(item) ##= textAttributes(item) #>" +
                    "#= image(item) ##= sprite(item) ##= text(item) #" +
                "</#= tag(item) #>"
            ),
            item: template(
                "<li class='#= wrapperCssClass(group, item) #'>" +
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
                return content.active !== true ? " style='display:none'" : "";
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
                .on(CLICK + NS, CLICKABLEITEMS, $.proxy(that._click, that))
                .on(MOUSEENTER + NS +" " + MOUSELEAVE + NS, HOVERABLEITEMS, that._toggleHover)
                .on(CLICK + NS, DISABLEDLINKS, false);

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

            var selectedItems = that.wrapper.find("li." + ACTIVESTATE),
                content = $(that.contentElement(selectedItems.parent().children().index(selectedItems)));

            if (content.length > 0 && content[0].childNodes.length === 0) {
                that.activateTab(selectedItems.eq(0));
            }

            kendo.notify(that);
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
                options.animation = { open: { effects: {}, show: true }, close: { effects: {} } }; // No animation
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
                    duration: 200,
                    show: true
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
                return that.wrapper.find("li." + ACTIVESTATE);
            }

            if (!isNaN(element)) {
                element = that.tabGroup.children().get(element);
            }

            element = that.element.find(element);
            $(element).each(function (index, item) {
                item = $(item);
                if (!item.hasClass(ACTIVESTATE) && !that.trigger(SELECT, { item: item[0], contentElement: that.contentElement(item.index()) })) {
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
                    content = $(that.contentElement(item.index()));

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

            tabs.eq(activeItem).addClass(TABONTOP);

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

                if (!currentContent.length && contentUrls[idx]) {
                    $("<div id='"+ id +"' class='" + CONTENT + "'/>").appendTo(that.wrapper);
                } else {
                    currentContent.attr("id", id);
                }
            });

            that.contentElements = that.contentAnimators = that.wrapper.children("div"); // refresh the contents

            if (kendo.support.touch && kendo.mobile.ui.Scroller) {
                kendo.touchScroller(that.contentElements);
                that.contentElements = that.contentElements.children(".km-scroll-container");
            }
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass(HOVERSTATE, e.type == MOUSEENTER);
        },

        _click: function (e) {
            var that = this,
                item = $(e.currentTarget),
                link = item.find("." + LINK),
                href = link.attr(HREF),
                collapse = that.options.collapsible,
                content = $(that.contentElement(item.index()));

            if (item.closest(".k-widget")[0] != that.wrapper[0]) {
                return;
            }

            if (item.is("." + DISABLEDSTATE + (!collapse ? ",." + ACTIVESTATE : ""))) {
                e.preventDefault();
                return;
            }

            if (that.tabGroup.children("[data-animating], [data-in-request]").length) {
                return;
            }

            if (that.trigger(SELECT, { item: item[0], contentElement: content[0] })) {
                e.preventDefault();
            } else {
                var isAnchor = link.data(CONTENTURL) || (href && (href.charAt(href.length - 1) == "#" || href.indexOf("#" + that.element[0].id + "-") != -1));

                if (!href || isAnchor) {
                    e.preventDefault();
                } else {
                    return;
                }

                if (collapse && item.is("." + ACTIVESTATE)) {
                    that.deactivateTab(item);
                    e.preventDefault();

                    return;
                }

                if (that.activateTab(item)) {
                    e.preventDefault();
                }
            }
        },

        deactivateTab: function (item) {
            var that = this,
                animationSettings = that.options.animation,
                animation = animationSettings.open,
                close = extend({}, animationSettings.close),
                hasCloseAnimation = close && "effects" in close;
            item = that.tabGroup.find(item);

            close = extend( hasCloseAnimation ? close : extend({ reverse: true }, animation), { show: false, hide: true });

            if (kendo.size(animation.effects)) {
                item.kendoAddClass(DEFAULTSTATE, { duration: animation.duration });
                item.kendoRemoveClass(ACTIVESTATE, { duration: animation.duration });
            } else {
                item.addClass(DEFAULTSTATE);
                item.removeClass(ACTIVESTATE);
            }

            that.contentAnimators
                    .filter("." + ACTIVESTATE)
                    .kendoStop(true, true)
                    .kendoAnimate( close )
                    .removeClass(ACTIVESTATE);
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

            close = extend( hasCloseAnimation ? close : extend({ reverse: true }, animation), { show: false, hide: true });
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

                that.trigger("change");

                return false;
            }

            var visibleContents = contentAnimators.filter("." + ACTIVESTATE),
                content = $(that.contentElement(itemIndex));

            if (content.length === 0) {
                visibleContents
                    .removeClass( ACTIVESTATE )
                    .kendoStop(true, true)
                    .kendoAnimate( close );
                return false;
            }

            item.attr("data-animating", true);

            var isAjaxContent = (item.children("." + LINK).data(CONTENTURL) || false) && content.is(EMPTY),
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

                    content
                        .closest(".k-content")
                        .addClass(ACTIVESTATE)
                        .kendoStop(true, true)
                        .kendoAnimate( extend({ init: function () {
                            that.trigger(ACTIVATE, { item: item[0], contentElement: content[0] });
                        } }, animation, { complete: function () {
                                                        item.removeAttr("data-animating");
                                                    } } ) );
                },
                showContent = function() {
                    if (!isAjaxContent) {
                        showContentElement();
                        that.trigger("change");
                    } else {
                        that.ajaxRequest(item, content, function () {
                            showContentElement();
                            that.trigger("change");
                        });
                    }
                };

            visibleContents
                    .removeClass(ACTIVESTATE);

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

            var contentElements = this.contentElements && this.contentElements[0] && !kendo.support.touch ? this.contentElements : this.contentAnimators,
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

})(jQuery);
