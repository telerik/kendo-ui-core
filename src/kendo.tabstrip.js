(function(f, define){
    define([ "./kendo.data" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "tabstrip",
    name: "TabStrip",
    category: "web",
    description: "The TabStrip widget displays a collection of tabs with associated tab content.",
    depends: [ "data" ],
    features: [ {
        id: "tabstrip-fx",
        name: "Animation",
        description: "Support for animation",
        depends: [ "fx" ]
    } ]
};

(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        keys = kendo.keys,
        map = $.map,
        each = $.each,
        trim = $.trim,
        extend = $.extend,
        isFunction = kendo.isFunction,
        template = kendo.template,
        outerWidth = kendo._outerWidth,
        outerHeight = kendo._outerHeight,
        Widget = ui.Widget,
        excludedNodesRegExp = /^(a|div)$/i,
        NS = ".kendoTabStrip",
        IMG = "img",
        HREF = "href",
        PREV = "prev",
        NEXT = "next",
        SHOW = "show",
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
        KEYBOARDNAVIGATABLEITEMS = ".k-item",
        HOVERABLEITEMS = ".k-tabstrip-items > " + NAVIGATABLEITEMS + ":not(." + ACTIVESTATE + ")",
        DEFAULTDISTANCE = 200,

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
            .attr("aria-disabled", "true")
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
                    .wrapAll("<span UNSELECTABLE='on' class='" + LINK + "'/>");
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

    function scrollButtonHtml(buttonClass, iconClass) {
        return "<span class='k-button k-button-icon k-bare k-tabstrip-" + buttonClass + "' unselectable='on'><span class='k-icon " + iconClass + "'></span></span>";
    }

    var TabStrip = Widget.extend({
        init: function(element, options) {
            var that = this, value;

            Widget.fn.init.call(that, element, options);

            that._animations(that.options);

            options = that.options;

            that._contentUrls = options.contentUrls || [];

            that._wrapper();

            that._isRtl = kendo.support.isRtl(that.wrapper);

            that._tabindex();

            that._updateClasses();

            that._dataSource();

            if (options.dataSource) {
                that.dataSource.fetch();
            }

            that._tabPosition();

            that._scrollable();

            if (that._contentUrls.length) {
                that.wrapper.find(".k-tabstrip-items > .k-item")
                    .each(function(index, item) {
                        var url = that._contentUrls[index];

                        if (typeof url === 'string') {
                            $(item).find(">." + LINK).data(CONTENTURL, url);
                        }
                    });
            } else {
                that._contentUrls.length = that.tabGroup.find("li.k-item").length;
            }

            that.wrapper
                .on(MOUSEENTER + NS + " " + MOUSELEAVE + NS, HOVERABLEITEMS, that._toggleHover)
                .on("focus" + NS, $.proxy(that._active, that))
                .on("blur" + NS, function() { that._current(null); });

            that._keyDownProxy = $.proxy(that._keydown, that);

            if (options.navigatable) {
                that.wrapper.on("keydown" + NS, that._keyDownProxy);
            }

            if (that.options.value) {
                value = that.options.value;
            }

            that.wrapper.children(".k-tabstrip-items")
                .on(CLICK + NS, ".k-state-disabled .k-link", false)
                .on(CLICK + NS, " > " + NAVIGATABLEITEMS, function (e) {
                    var wr = that.wrapper[0];
                    if (wr !== document.activeElement) {
                        var msie = kendo.support.browser.msie;
                        if (msie) {
                            try {
                                // does not scroll to the active element
                                wr.setActive();
                            } catch (j) {
                                wr.focus();
                            }
                        } else {
                            wr.focus();
                        }
                    }

                    if (that._click($(e.currentTarget))) {
                        e.preventDefault();
                    }
                });

            var selectedItems = that.tabGroup.children("li." + ACTIVESTATE),
                content = that.contentHolder(selectedItems.index());

            if (selectedItems[0] && content.length > 0 && content[0].childNodes.length === 0) {
                that.activateTab(selectedItems.eq(0));
            }

            that.element.attr("role", "tablist");

            if (that.element[0].id) {
                that._ariaId = that.element[0].id + "_ts_active";
            }
            that.value(value);
            kendo.notify(that);
        },

        _active: function () {
            var item = this.tabGroup.children().filter("." + ACTIVESTATE);

            item = item[0] ? item : this._endItem("first");
            if (item[0]) {
                this._current(item);
            }
        },

        _endItem: function(action) {
            return this.tabGroup.children(NAVIGATABLEITEMS)[action]();
        },

        _getItem: function(action) {
            return this.tabGroup.children(KEYBOARDNAVIGATABLEITEMS)[action]();
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
                item = this.tabGroup.children(KEYBOARDNAVIGATABLEITEMS)[endItem]();
            }

            if (item.hasClass(DISABLEDSTATE)) {
                item.addClass(FOCUSEDSTATE);
            }
            if (item.hasClass(DISABLEDSTATE) || item.hasClass(ACTIVESTATE)) {
                this._focused = item;
            }

            return item;
        },

        _current: function (candidate) {
            var that = this,
                focused = that._focused,
                id = that._ariaId;

            if (candidate === undefined) {
                return focused;
            }

            if (focused) {
                that.tabGroup.children("#" + id).removeAttr("id");
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
                isHorizontal = /top|bottom/.test(that.options.tabPosition),
                action;

            if (e.target != e.currentTarget) {
                return;
            }

            if (key === keys.DOWN && !isHorizontal) {
                action = NEXT;
            } else if (key === keys.UP && !isHorizontal) {
                action = PREV;
            } else if (key === keys.RIGHT && isHorizontal) {
                action = rtl ? PREV : NEXT;
            } else if (key === keys.LEFT && isHorizontal) {
                action = rtl ? NEXT : PREV;
            } else if (key == keys.ENTER || key == keys.SPACEBAR) {
                that._click(current);
                e.preventDefault();
            } else if (key == keys.HOME) {
                that._click(that._getItem("first"));
                e.preventDefault();
                return;
            } else if (key == keys.END) {
                that._click(that._getItem("last"));
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
            var that = this;

            that.options.dataSource = dataSource;
            that._dataSource();
            that.dataSource.fetch();
        },

        _animations: function(options) {
            if (options && ("animation" in options) && !options.animation) {
                options.animation = { open: { effects: {} }, close: { effects: {} } }; // No animation
            }
        },

        refresh: function(e) {
            var that = this,
                options = that.options,
                encoded = kendo.getter(options.dataEncodedField),
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

                if (options.dataEncodedField) {
                    tab.encoded = encoded(view[idx]);
                }

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

                if (e.field === options.dataUrlField) {
                    that._contentUrls[idx] = view[0].get(e.field);
                }
            } else {
                that.trigger("dataBinding");
                that.remove("li");
                that._contentUrls = [];
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
            var that = this,
                animation = that.options.animation;

            that._animations(options);

            if (options.contentUrls) {
                that._contentUrls = options.contentUrls;
            }

            options.animation = extend(true, animation, options.animation);

            if (options.navigatable) {
                that.wrapper.on("keydown" + NS,  that._keyDownProxy);
            } else {
                that.wrapper.off("keydown" + NS,  that._keyDownProxy);
            }

            Widget.fn.setOptions.call(that, options);
        },

        events: [
            SELECT,
            ACTIVATE,
            SHOW,
            ERROR,
            CONTENTLOAD,
            "change",
            "dataBinding",
            "dataBound"
        ],

        options: {
            name: "TabStrip",
            dataEncodedField: "",
            dataTextField: "",
            dataContentField: "",
            dataImageUrlField: "",
            dataUrlField: "",
            dataSpriteCssClass: "",
            dataContentUrlField: "",
            tabPosition: "top",
            animation: {
                open: {
                    effects: "expand:vertical fadeIn",
                    duration: 200
                },
                close: { // if close animation effects are defined, they will be used instead of open.reverse
                    duration: 200
                }
            },
            collapsible: false,
            navigatable: true,
            contentUrls: false,
            scrollable: {
                distance: DEFAULTDISTANCE
            }
        },

        destroy: function() {
            var that = this,
            scrollWrap = that.scrollWrap;

            Widget.fn.destroy.call(that);

            if (that._refreshHandler) {
                that.dataSource.unbind("change", that._refreshHandler);
            }

            that.wrapper.off(NS);
            that.wrapper.children(".k-tabstrip-items").off(NS);

            if (that._scrollableModeActive) {
                that._scrollPrevButton.off().remove();
                that._scrollNextButton.off().remove();
            }

            kendo.destroy(that.wrapper);
            scrollWrap.children(".k-tabstrip").unwrap();
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
            var contentUrls = that._contentUrls;

            element.each(function () {
                var item = $(this),
                    contentUrl = item.find("." + LINK).data(CONTENTURL) || contentUrls[item.index()],
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
                var contents = inserted.contents[idx];
                that.tabGroup.append(this);
                if (that.options.tabPosition == "bottom") {
                    that.tabGroup.before(contents);
                } else if (that._scrollableModeActive) {
                    that._scrollPrevButton.before(contents);
                } else {
                    that.wrapper.append(contents);
                }
                that.angular("compile", function(){ return { elements: [ contents ] }; });
            });

            updateFirstLast(that.tabGroup);
            that._updateContentElements();
            that.resize(true);

            return that;
        },

        _appendUrlItem: function(url) {
            this._contentUrls.push(url);
        },

        _moveUrlItem: function(from, to) {
            this._contentUrls.splice(to, 0, this._contentUrls.splice(from, 1)[0]);
        },

        _removeUrlItem: function(index) {
            this._contentUrls.splice(index, 1);
        },

        insertBefore: function (tab, referenceTab) {
            if ($(tab).is($(referenceTab))) {
                referenceTab = this.tabGroup.find(referenceTab).next();
            } else {
                referenceTab = this.tabGroup.find(referenceTab);
            }

            var that = this,
                inserted = that._create(tab),
                referenceContent = that.element.find("[id='" + referenceTab.attr("aria-controls") + "']");

            each(inserted.tabs, function (idx) {
                var contents = inserted.contents[idx];
                var fromIndex = inserted.newTabsCreated ? that._contentUrls.length - (inserted.tabs.length - idx) : $(contents).index() - 1;

                referenceTab.before(this);
                referenceContent.before(contents);

                that._moveUrlItem(fromIndex, $(this).index());
                that.angular("compile", function(){ return { elements: [ contents ] }; });
            });

            updateFirstLast(that.tabGroup);
            that._updateContentElements(inserted.newTabsCreated);
            that.resize(true);

            return that;
        },

        insertAfter: function (tab, referenceTab) {
            if ($(tab).is($(referenceTab))) {
                referenceTab = this.tabGroup.find(referenceTab).prev();
            } else {
                referenceTab = this.tabGroup.find(referenceTab);
            }

            var that = this,
                inserted = that._create(tab),
                referenceContent = that.element.find("[id='" + referenceTab.attr("aria-controls") + "']");

            each(inserted.tabs, function (idx) {
                var contents = inserted.contents[idx];
                var fromIndex = inserted.newTabsCreated ? that._contentUrls.length - (inserted.tabs.length - idx) : $(contents).index() - 1;

                referenceTab.after(this);
                referenceContent.after(contents);

                that._moveUrlItem(fromIndex, $(this).index());
                that.angular("compile", function(){ return { elements: [ contents ] }; });
            });

            updateFirstLast(that.tabGroup);
            that._updateContentElements(inserted.newTabsCreated);
            that.resize(true);

            return that;
        },

        remove: function (elements) {
            var that = this;
            var type = typeof elements;
            var contents;

            if (type === "string") {
                elements = that.tabGroup.find(elements);
            } else if (type === "number") {
                elements = that.tabGroup.children().eq(elements);
            }

            contents = elements.map(function () {
                var idx = $(this).index();
                var content = that.contentElement(idx);

                kendo.destroy(content);
                that._removeUrlItem(idx);

                return content;
            });

            elements.remove();
            contents.empty();
            contents.remove();

            that._updateContentElements();
            that.resize(true);

            return that;
        },

        _create: function (tab) {
            var that = this,
            tabs,
            contents,
            content,
            newTabsCreated = false;

            tab = tab instanceof kendo.data.ObservableArray ? tab.toJSON() : tab;

            if ($.isPlainObject(tab) || $.isArray(tab)) {
                tab = $.isArray(tab) ? tab : [tab];
                newTabsCreated = true;

                tabs = map(tab, function (value, idx) {
                            that._appendUrlItem(tab[idx].contentUrl || null);

                            return $(TabStrip.renderItem({
                                group: that.tabGroup,
                                item: extend(value, { index: idx })
                            }));
                        });

                contents = map( tab, function (value, idx) {
                            if (typeof value.content == "string" || value.contentUrl) {
                                return $(TabStrip.renderContent({
                                    item: extend(value, { index: idx })
                                }));
                            }
                        });
            } else {
                if (typeof tab == "string" && tab[0] != "<") {
                    tabs = that.element.find(tab);
                } else {
                    tabs = $(tab);
                }
                contents = $();
                tabs.each(function () {
                    if (/k-tabstrip-items/.test(this.parentNode.className)) {
                        var element = that.element.find("[id='" + this.getAttribute("aria-controls") + "']");
                        content = element;
                    } else {
                        content = $("<div class='" + CONTENT + "'/>");
                    }

                    contents = contents.add(content);
                });

                updateTabClasses(tabs);
            }

            return { tabs: tabs, contents: contents, newTabsCreated: newTabsCreated };
        },

        _toggleDisabled: function(element, enable) {
            element = this.tabGroup.find(element);
            element.each(function () {
                $(this)
                    .toggleClass(DEFAULTSTATE, enable)
                    .toggleClass(DISABLEDSTATE, !enable)
                    .attr("aria-disabled", !enable);
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
                that._updateContentElements(true);
            }
        },

        _elementId: function(element, idx) {
            var elementId = element.attr("id");
            var wrapperId = this.element.attr("id");

            if (!elementId || elementId.indexOf(wrapperId + "-") > -1) {
                var tabStripID = (wrapperId || kendo.guid()) + "-";

                return tabStripID + (idx + 1);
            }

            return elementId;
        },

        _updateContentElements: function(isInitialUpdate) {
            var that = this,
                contentUrls = that._contentUrls,
                items = that.tabGroup.children(".k-item"),
                contentElements = that.wrapper.children("div"),
                _elementId = that._elementId.bind(that);

            if (contentElements.length && (items.length > contentElements.length)) {
                contentElements.each(function(idx) {
                    var id = _elementId($(this), idx);
                    var item = items.filter("[aria-controls=" + (this.id || 0) + "]")[0];

                    if (!item && isInitialUpdate) {
                         item = items[idx];
                    }

                    if (item) {
                        item.setAttribute("aria-controls", id);
                    }

                    this.setAttribute("id", id);
                });
            } else {
                items.each(function(idx) {
                    var currentContent = contentElements.eq(idx);
                    var id = _elementId(currentContent, idx);

                    this.setAttribute("aria-controls", id);

                    if (!currentContent.length && contentUrls[idx]) {
                        $("<div class='" + CONTENT + "'/>").appendTo(that.wrapper).attr("id", id);
                    } else {
                        currentContent.attr("id", id);

                        if (!$(this).children(".k-loading")[0] && !contentUrls[idx]) {
                            $("<span class='k-loading k-complete'/>").prependTo(this);
                        }
                    }
                    currentContent.attr("role", "tabpanel");
                    currentContent.filter(":not(." + ACTIVESTATE + ")").attr("aria-hidden", true).attr("aria-expanded", false);
                    currentContent.filter("." + ACTIVESTATE).attr("aria-expanded", true);
                });
            }

            that.contentElements = that.contentAnimators = that.wrapper.children("div"); // refresh the contents

            that.tabsHeight = outerHeight(that.tabGroup) +
                              parseInt(that.wrapper.css("border-top-width"), 10) +
                              parseInt(that.wrapper.css("border-bottom-width"), 10);

            if (kendo.kineticScrollNeeded && kendo.mobile.ui.Scroller) {
                kendo.touchScroller(that.contentElements);
                that.contentElements = that.contentElements.children(".km-scroll-container");
            }
        },

        _wrapper: function() {
            var that = this;

            if (that.element.is("ul")) {
                that.wrapper = that.element.wrapAll("<div />").parent();
            } else {
                that.wrapper = that.element;
            }

            that.scrollWrap = that.wrapper.parent(".k-tabstrip-wrapper");

            if (!that.scrollWrap[0]) {
                that.scrollWrap = that.wrapper.wrapAll("<div class='k-tabstrip-wrapper' />").parent();
            }
        },

        _tabPosition: function() {
            var that = this,
                tabPosition = that.options.tabPosition;

            that.wrapper.addClass("k-floatwrap k-tabstrip-" + tabPosition);

            if (tabPosition == "bottom") {
                that.tabGroup.appendTo(that.wrapper);
            }

            that.resize(true);
        },

        _setContentElementsDimensions: function () {
            var that = this,
                tabPosition = that.options.tabPosition;

            if (tabPosition == "left" || tabPosition == "right") {
                var contentDivs = that.wrapper.children(".k-content"),
                    activeDiv = contentDivs.filter(":visible"),
                    marginStyleProperty = "margin-" + tabPosition,
                    tabGroup = that.tabGroup,
                    margin = outerWidth(tabGroup);

                var minHeight = Math.ceil(tabGroup.height()) -
                    parseInt(activeDiv.css("padding-top"), 10) -
                    parseInt(activeDiv.css("padding-bottom"), 10) -
                    parseInt(activeDiv.css("border-top-width"), 10) -
                    parseInt(activeDiv.css("border-bottom-width"), 10);

                setTimeout(function () {
                    contentDivs.css(marginStyleProperty, margin).css("min-height", minHeight);
                });
            }
        },

        _resize: function() {
            this._setContentElementsDimensions();
            this._scrollable();
        },

        _sizeScrollWrap: function (element) {
            if (element.is(":visible")) {
                var tabPosition = this.options.tabPosition;
                var h = Math.floor(outerHeight(element, true)) + (tabPosition === "left" || tabPosition === "right" ? 2 : this.tabsHeight);

                this.scrollWrap.css("height", h).css("height");
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
                index = item.index(),
                contentHolder = that.contentHolder(index),
                prevent, isAnchor,
                neighbours = item.parent().children(),
                oldFocusedTab = neighbours.filter("." + FOCUSEDSTATE);

            if (item.closest(".k-widget")[0] != that.wrapper[0]) {
                return;
            }

            if (item.is("." + DISABLEDSTATE + (!collapse ? ",." + ACTIVESTATE : ""))) {
                oldFocusedTab.removeClass(FOCUSEDSTATE);
                that._focused = item;

                item.addClass(FOCUSEDSTATE);
                that._current(item);

                if (that._scrollableModeActive) {
                    that._scrollTabsToItem(item);
                }
                return true;
            }

            isAnchor = link.data(CONTENTURL) || that._contentUrls[index] || (href && (href.charAt(href.length - 1) == "#" || href.indexOf("#" + that.element[0].id + "-") != -1));
            prevent = !href || isAnchor;

            if (that.tabGroup.children("[data-animating]").length) {
                return prevent;
            }

            if (that.trigger(SELECT, { item: item[0], contentElement: contentHolder[0] })) {
                return true;
            }

            if (prevent === false) {
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

        _scrollable: function() {
            var that = this,
                options = that.options,
                wrapperOffsetWidth,
                tabGroupScrollWidth,
                scrollPrevButton,
                scrollNextButton;

            if (that._scrollableAllowed()) {

                that.wrapper.addClass("k-tabstrip-scrollable");

                wrapperOffsetWidth = that.wrapper[0].offsetWidth;
                tabGroupScrollWidth = that.tabGroup[0].scrollWidth;

                if (tabGroupScrollWidth > wrapperOffsetWidth && !that._scrollableModeActive) {
                    that._nowScrollingTabs = false;
                    that._isRtl = kendo.support.isRtl(that.element);
                    var mouseDown = kendo.support.mobileOS ? "touchstart" : "mousedown";
                    var mouseUp = kendo.support.mobileOS ? "touchend" : "mouseup";

                    that.wrapper.append(scrollButtonHtml("prev", "k-i-arrow-60-left") + scrollButtonHtml("next", "k-i-arrow-60-right"));

                    scrollPrevButton = that._scrollPrevButton = that.wrapper.children(".k-tabstrip-prev");
                    scrollNextButton = that._scrollNextButton = that.wrapper.children(".k-tabstrip-next");

                    that.tabGroup.css({ marginLeft: outerWidth(scrollPrevButton) + 9, marginRight: outerWidth(scrollNextButton) + 12 });

                    scrollPrevButton.on(mouseDown + NS, function () {
                        that._nowScrollingTabs = true;
                        that._scrollTabsByDelta(options.scrollable.distance * (that._isRtl ? 1 : -1));
                    });

                    scrollNextButton.on(mouseDown + NS, function () {
                        that._nowScrollingTabs = true;
                        that._scrollTabsByDelta(options.scrollable.distance * (that._isRtl ? -1 : 1));
                    });

                    scrollPrevButton.add(scrollNextButton).on(mouseUp + NS, function () {
                        that._nowScrollingTabs = false;
                    });

                    that._scrollableModeActive = true;

                    that._toggleScrollButtons();
                } else if (that._scrollableModeActive && tabGroupScrollWidth <= wrapperOffsetWidth) {
                    that._scrollableModeActive = false;

                    that.wrapper.removeClass("k-tabstrip-scrollable");

                    that._scrollPrevButton.off().remove();
                    that._scrollNextButton.off().remove();
                    that.tabGroup.css({ marginLeft: "", marginRight: "" });
                } else if (!that._scrollableModeActive) {
                    that.wrapper.removeClass("k-tabstrip-scrollable");
                } else {
                    that._toggleScrollButtons();
                }
            }
        },

        _scrollableAllowed: function() {
            var options = this.options;

            if(options.scrollable && !options.scrollable.distance){
                options.scrollable = {distance: DEFAULTDISTANCE};
            }

            return options.scrollable && !isNaN(options.scrollable.distance) && (options.tabPosition == "top" || options.tabPosition == "bottom");
        },

        _scrollTabsToItem: function (item) {
            var that = this,
                tabGroup = that.tabGroup,
                currentScrollOffset = tabGroup.scrollLeft(),
                itemWidth = outerWidth(item),
                itemOffset = that._isRtl ? item.position().left : item.position().left - tabGroup.children().first().position().left,
                tabGroupWidth = tabGroup[0].offsetWidth,
                tabGroupPadding = Math.ceil(parseFloat(tabGroup.css("padding-left"))),
                itemPosition;

            if (that._isRtl) {
                if (itemOffset < 0) {
                    itemPosition = currentScrollOffset + itemOffset - (tabGroupWidth - currentScrollOffset) - tabGroupPadding;
                } else if (itemOffset + itemWidth > tabGroupWidth) {
                    itemPosition = currentScrollOffset + itemOffset - itemWidth + tabGroupPadding * 2;
                }
            } else {
                if (currentScrollOffset + tabGroupWidth < itemOffset + itemWidth) {
                    itemPosition = itemOffset + itemWidth - tabGroupWidth + tabGroupPadding * 2;
                } else if (currentScrollOffset > itemOffset) {
                    itemPosition = itemOffset - tabGroupPadding;
                }
            }

            tabGroup.finish().animate({ "scrollLeft": itemPosition }, "fast", "linear", function () {
                that._toggleScrollButtons();
            });
        },

        _scrollTabsByDelta: function (delta) {
            var that = this;
            var tabGroup = that.tabGroup;
            var scrLeft = tabGroup.scrollLeft();

            tabGroup.finish().animate({ "scrollLeft": scrLeft + delta }, "fast", "linear", function () {
                if (that._nowScrollingTabs && !jQuery.fx.off) {
                    that._scrollTabsByDelta(delta);
                } else {
                    that._toggleScrollButtons();
                }
            });
        },

        _toggleScrollButtons: function () {
            var that = this,
                ul = that.tabGroup,
                scrollLeft = ul.scrollLeft();

            that._scrollPrevButton.toggle(that._isRtl ? scrollLeft < ul[0].scrollWidth - ul[0].offsetWidth - 1 : scrollLeft !== 0);
            that._scrollNextButton.toggle(that._isRtl ? scrollLeft !== 0 : scrollLeft < ul[0].scrollWidth - ul[0].offsetWidth - 1);
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
            if (this.tabGroup.children("[data-animating]").length) { return; }

            item = this.tabGroup.find(item);

            var that = this,
                animationSettings = that.options.animation,
                animation = animationSettings.open,
                close = extend({}, animationSettings.close),
                hasCloseAnimation = close && "effects" in close,
                neighbours = item.parent().children(),
                oldTab = neighbours.filter("." + ACTIVESTATE),
                itemIndex = neighbours.index(item),
                isAnimationEnabled = animation && "duration" in animation && "effects" in animation;

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

            if (that.inRequest) {
                that.xhr.abort();
                that.inRequest = false;
            }

            if (contentAnimators.length === 0) {
                that.tabGroup.find("." + TABONTOP).removeClass(TABONTOP);
                item.addClass(TABONTOP) // change these directly to bring the tab on top.
                    .css("z-index");

                item.addClass(ACTIVESTATE);
                that._current(item);

                that.trigger("change");

                if (that._scrollableModeActive) {
                    that._scrollTabsToItem(item);
                }

                return false;
            }

            var visibleContents = contentAnimators.filter("." + ACTIVESTATE),
                contentHolder = that.contentHolder(itemIndex),
                contentElement = contentHolder.closest(".k-content");

            that.tabsHeight = outerHeight(that.tabGroup) +
                              parseInt(that.wrapper.css("border-top-width"), 10) +
                              parseInt(that.wrapper.css("border-bottom-width"), 10);

            that._sizeScrollWrap(visibleContents);

            if (contentHolder.length === 0) {
                visibleContents
                    .removeClass( ACTIVESTATE )
                    .attr("aria-hidden", true)
                    .kendoStop(true, true)
                    .kendoAnimate( close );
                return false;
            }

            item.attr("data-animating", true);

          var isAjaxContent = (item.children("." + LINK).data(CONTENTURL) || that._contentUrls[itemIndex] || false) && contentHolder.is(EMPTY),
                showContentElement = function () {
                    oldTab.removeAttr("aria-selected");
                    item.attr("aria-selected", true);

                    that._current(item);

                    that._sizeScrollWrap(contentElement);

                    contentElement
                        .addClass(ACTIVESTATE)
                        .removeAttr("aria-hidden")
                        .kendoStop(true, true)
                        .attr("aria-expanded", true)
                        .kendoAnimate( extend({ init: function () {
                            that.trigger(SHOW, { item: item[0], contentElement: contentHolder[0] });
                            kendo.resize(contentHolder);
                        } }, animation, {
                            complete: function () {
                                item.removeAttr("data-animating");

                                that.trigger(ACTIVATE, { item: item[0], contentElement: contentHolder[0] });
                                kendo.resize(contentHolder);

                                that.scrollWrap.css("height", "").css("height");

                                // Force IE and Edge rendering to fix visual glitches telerik/kendo-ui-core#2777.
                                if (isAnimationEnabled && (kendo.support.browser.msie || kendo.support.browser.edge)) {
                                    contentHolder.finish().animate({
                                        opacity: 0.9
                                    },"fast", "linear", function(){
                                        contentHolder.finish().animate({
                                            opacity: 1
                                        },"fast", "linear");
                                    });
                                }
                            }
                        } ) );
                },
                showContent = function() {
                    if (!isAjaxContent) {
                        showContentElement();
                        that.trigger("change");
                    } else {
                        item.removeAttr("data-animating");
                        that.ajaxRequest(item, contentHolder, function () {
                            item.attr("data-animating", true);
                            showContentElement();
                            that.trigger("change");
                        });
                    }

                    if (that._scrollableModeActive) {
                        that._scrollTabsToItem(item);
                    }

                };

            visibleContents
                    .removeClass(ACTIVESTATE);

            that.tabGroup.find("." + TABONTOP).removeClass(TABONTOP);
                    item.addClass(TABONTOP) // change these directly to bring the tab on top.
                        .css("z-index");

            if (kendo.size(animation.effects)) {
                oldTab.kendoAddClass(DEFAULTSTATE, { duration: animation.duration });
                item.kendoAddClass(ACTIVESTATE, { duration: animation.duration });
            } else {
                oldTab.addClass(DEFAULTSTATE);
                item.addClass(ACTIVESTATE);
            }

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

            var contentElements = this.contentElements && this.contentElements[0] && !kendo.kineticScrollNeeded ? this.contentElements : this.contentAnimators;
            var id = $(this.tabGroup.children()[itemIndex]).attr("aria-controls");

            if (contentElements) {
                for (var i = 0, len = contentElements.length; i < len; i++) {
                    if (contentElements.eq(i).closest(".k-content")[0].id == id) {
                        return contentElements[i];
                    }
                }
            }

            return undefined;
        },

        contentHolder: function (itemIndex) {
            var contentElement = $(this.contentElement(itemIndex)),
                scrollContainer = contentElement.children(".km-scroll-container");

            return kendo.support.touch && scrollContainer[0] ? scrollContainer : contentElement;
        },

        ajaxRequest: function (element, content, complete, url) {
            element = this.tabGroup.find(element);

            var that = this,
                xhr = $.ajaxSettings.xhr,
                link = element.find("." + LINK),
                data = {},
                halfWidth = element.width() / 2,
                fakeProgress = false,
                statusIcon = element.find(".k-loading").removeClass("k-complete");

            if (!statusIcon[0]) {
                statusIcon = $("<span class='k-loading'/>").prependTo(element);
            }

            var endState = halfWidth * 2 - statusIcon.width();

            var oldProgressAnimation = function() {
                statusIcon.animate({ marginLeft: (parseInt(statusIcon.css("marginLeft"), 10) || 0) < halfWidth ? endState : 0 }, 500, oldProgressAnimation);
            };

            if (kendo.support.browser.msie && kendo.support.browser.version < 10) {
                setTimeout(oldProgressAnimation, 40);
            }

             url = url || link.data(CONTENTURL) || that._contentUrls[element.index()] || link.attr(HREF);
            that.inRequest = true;

            var ajaxOptions = {
                type: "GET",
                cache: false,
                url: url,
                dataType: "html",
                data: data,
                xhr: function() {
                    var current = this,
                        request = xhr(),
                        event = current.progressUpload ? "progressUpload" : current.progress ? "progress" : false;

                    if (request) {
                        $.each([ request, request.upload ], function () {
                            if (this.addEventListener) {
                                this.addEventListener("progress", function(evt) {
                                    if (event) {
                                        current[event](evt);
                                    }
                                }, false);
                            }
                        });
                    }

                    current.noProgress = !(window.XMLHttpRequest && ('upload' in new XMLHttpRequest()));
                    return request;
                },

                progress: function(evt) {
                    if (evt.lengthComputable) {
                        var percent = parseInt((evt.loaded / evt.total * 100), 10) + "%";
                        statusIcon
                            .stop(true)
                            .addClass("k-progress")
                            .css({
                                "width": percent,
                                "marginLeft": 0
                            });
                    }
                },

                error: function (xhr, status) {
                    if (that.trigger("error", { xhr: xhr, status: status })) {
                        this.complete();
                    }
                },

                stopProgress: function () {
                    clearInterval(fakeProgress);
                    statusIcon
                        .stop(true)
                        .addClass("k-progress")
                        [0].style.cssText = "";
                },

                complete: function (xhr) {
                    that.inRequest = false;
                    if (this.noProgress) {
                        setTimeout(this.stopProgress, 500);
                    } else {
                        this.stopProgress();
                    }

                    if (xhr.statusText == "abort") {
                        statusIcon.remove();
                    }
                },

                success: function (data) {
                    statusIcon.addClass("k-complete");
                    try {
                        var current = this,
                            loaded = 10;

                        if (current.noProgress) {
                            statusIcon.width(loaded+"%");
                            fakeProgress = setInterval(function () {
                                current.progress({ lengthComputable: true, loaded: Math.min(loaded, 100), total: 100 });
                                loaded += 10;
                            }, 40);
                        }

                        that.angular("cleanup", function () { return { elements: content.get() }; });
                        kendo.destroy(content);
                        content.html(data);
                    } catch (e) {
                        var console = window.console;

                        if (console && console.error) {
                            console.error(e.name + ": " + e.message + " in " + url);
                        }
                        this.error(this.xhr, "error");
                    }

                    if (complete) {
                        complete.call(that, content);
                    }

                    that.angular("compile", function(){ return { elements: content.get() }; });

                    that.trigger(CONTENTLOAD, { item: element[0], contentElement: content[0] });
                }
            };

            if (typeof url === "object") {
                ajaxOptions = $.extend(true, {}, ajaxOptions, url);

                if (isFunction(ajaxOptions.url)) {
                    ajaxOptions.url = ajaxOptions.url();
                }
            }

            that.xhr = $.ajax(ajaxOptions);
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

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
