(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = {
    id: "panelbar",
    name: "PanelBar",
    category: "web",
    description: "The PanelBar widget displays hierarchical data as a multi-level expandable panel bar.",
    depends: [ "core" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        keys = kendo.keys,
        extend = $.extend,
        each = $.each,
        template = kendo.template,
        Widget = ui.Widget,
        excludedNodesRegExp = /^(ul|a|div)$/i,
        NS = ".kendoPanelBar",
        IMG = "img",
        HREF = "href",
        LAST = "k-last",
        LINK = "k-link",
        LINKSELECTOR = "." + LINK,
        ERROR = "error",
        ITEM = ".k-item",
        GROUP = ".k-group",
        VISIBLEGROUP = GROUP + ":visible",
        IMAGE = "k-image",
        FIRST = "k-first",
        EXPAND = "expand",
        SELECT = "select",
        CONTENT = "k-content",
        ACTIVATE = "activate",
        COLLAPSE = "collapse",
        MOUSEENTER = "mouseenter",
        MOUSELEAVE = "mouseleave",
        CONTENTLOAD = "contentLoad",
        ACTIVECLASS = "k-state-active",
        GROUPS = "> .k-panel",
        CONTENTS = "> .k-content",
        FOCUSEDCLASS = "k-state-focused",
        DISABLEDCLASS = "k-state-disabled",
        SELECTEDCLASS = "k-state-selected",
        SELECTEDSELECTOR = "." + SELECTEDCLASS,
        HIGHLIGHTCLASS = "k-state-highlight",
        ACTIVEITEMSELECTOR = ITEM + ":not(.k-state-disabled)",
        clickableItems = "> " + ACTIVEITEMSELECTOR + " > " + LINKSELECTOR + ", .k-panel > " + ACTIVEITEMSELECTOR + " > " + LINKSELECTOR,
        disabledItems = ITEM + ".k-state-disabled > .k-link",
        selectableItems = "> li > " + SELECTEDSELECTOR + ", .k-panel > li > " + SELECTEDSELECTOR,
        defaultState = "k-state-default",
        ARIA_DISABLED = "aria-disabled",
        ARIA_EXPANDED = "aria-expanded",
        ARIA_HIDDEN = "aria-hidden",
        ARIA_SELECTED = "aria-selected",
        VISIBLE = ":visible",
        EMPTY = ":empty",
        SINGLE = "single",

        templates = {
            content: template(
                "<div role='region' class='k-content'#= contentAttributes(data) #>#= content(item) #</div>"
            ),
            group: template(
                "<ul role='group' aria-hidden='true' class='#= groupCssClass(group) #'#= groupAttributes(group) #>" +
                    "#= renderItems(data) #" +
                "</ul>"
            ),
            itemWrapper: template(
                "<#= tag(item) # class='#= textClass(item, group) #' #= contentUrl(item) ##= textAttributes(item) #>" +
                    "#= image(item) ##= sprite(item) ##= text(item) #" +
                    "#= arrow(data) #" +
                "</#= tag(item) #>"
            ),
            item: template(
                "<li role='menuitem' #=aria(item)#class='#= wrapperCssClass(group, item) #'>" +
                    "#= itemWrapper(data) #" +
                    "# if (item.items) { #" +
                    "#= subGroup({ items: item.items, panelBar: panelBar, group: { expanded: item.expanded } }) #" +
                    "# } else if (item.content || item.contentUrl) { #" +
                    "#= renderContent(data) #" +
                    "# } #" +
                "</li>"
            ),
            image: template("<img class='k-image' alt='' src='#= imageUrl #' />"),
            arrow: template("<span class='#= arrowClass(item) #'></span>"),
            sprite: template("<span class='k-sprite #= spriteCssClass #'></span>"),
            empty: template("")
        },

        rendering = {
            aria: function(item) {
                var attr = "";

                if (item.items || item.content || item.contentUrl) {
                    attr += ARIA_EXPANDED + "='" + (item.expanded ? "true" : "false") + "' ";
                }

                if (item.enabled === false) {
                    attr += ARIA_DISABLED + "='true'";
                }

                return attr;
            },

            wrapperCssClass: function (group, item) {
                var result = "k-item",
                    index = item.index;

                if (item.enabled === false) {
                    result += " " + DISABLEDCLASS;
                } else if (item.expanded === true) {
                    result += " " + ACTIVECLASS;
                } else {
                    result += " k-state-default";
                }

                if (index === 0) {
                    result += " k-first";
                }

                if (index == group.length-1) {
                    result += " k-last";
                }

                if (item.cssClass) {
                    result += " " + item.cssClass;
                }

                return result;
            },

            textClass: function(item, group) {
                var result = LINK;

                if (group.firstLevel) {
                    result += " k-header";
                }

                return result;
            },
            textAttributes: function(item) {
                return item.url ? " href='" + item.url + "'" : "";
            },
            arrowClass: function(item) {
                var result = "k-icon";

                result += item.expanded ? " k-i-arrow-n k-panelbar-collapse" : " k-i-arrow-s k-panelbar-expand";

                return result;
            },
            text: function(item) {
                return item.encoded === false ? item.text : kendo.htmlEncode(item.text);
            },
            tag: function(item) {
                return item.url || item.contentUrl ? "a" : "span";
            },
            groupAttributes: function(group) {
                return group.expanded !== true ? " style='display:none'" : "";
            },
            groupCssClass: function() {
                return "k-group k-panel";
            },
            contentAttributes: function(content) {
                return content.item.expanded !== true ? " style='display:none'" : "";
            },
            content: function(item) {
                return item.content ? item.content : item.contentUrl ? "" : "&nbsp;";
            },
            contentUrl: function(item) {
                return item.contentUrl ? 'href="' + item.contentUrl + '"' : "";
            }
        };

    function updateArrow (items) {
        items = $(items);

        items.children(LINKSELECTOR).children(".k-icon").remove();

        items
            .filter(":has(.k-panel),:has(.k-content)")
            .children(".k-link:not(:has([class*=k-i-arrow]))")
            .each(function () {
                var item = $(this),
                    parent = item.parent();

                item.append("<span class='k-icon " + (parent.hasClass(ACTIVECLASS) ? "k-i-arrow-n k-panelbar-collapse" : "k-i-arrow-s k-panelbar-expand") + "'/>");
            });
    }

    function updateFirstLast (items) {
        items = $(items);

        items.filter(".k-first:not(:first-child)").removeClass(FIRST);
        items.filter(".k-last:not(:last-child)").removeClass(LAST);
        items.filter(":first-child").addClass(FIRST);
        items.filter(":last-child").addClass(LAST);
    }

    var PanelBar = Widget.extend({
        init: function(element, options) {
            var that = this,
                content;

            Widget.fn.init.call(that, element, options);

            element = that.wrapper = that.element.addClass("k-widget k-reset k-header k-panelbar");
            options = that.options;

            if (element[0].id) {
                that._itemId = element[0].id + "_pb_active";
            }

            that._tabindex();

            that._initData(options);

            that._updateClasses();

            that._animations(options);

            element
                .on("click" + NS, clickableItems, function(e) {
                    if (that._click($(e.currentTarget))) {
                        e.preventDefault();
                    }
                })
                .on(MOUSEENTER  + NS + " " + MOUSELEAVE + NS, clickableItems, that._toggleHover)
                .on("click" + NS, disabledItems, false)
                .on("keydown" + NS, $.proxy(that._keydown, that))
                .on("focus" + NS, function() {
                    var item = that.select();
                    that._current(item[0] ? item : that._first());
                })
                .on("blur" + NS, function() {
                    that._current(null);
                })
                .attr("role", "menu");

            content = element.find("li." + ACTIVECLASS + " > ." + CONTENT);

            if (content[0]) {
                that.expand(content.parent(), false);
            }

            kendo.notify(that);
        },

        events: [
            EXPAND,
            COLLAPSE,
            SELECT,
            ACTIVATE,
            ERROR,
            CONTENTLOAD
        ],
        options: {
            name: "PanelBar",
            animation: {
                expand: {
                    effects: "expand:vertical",
                    duration: 200
                },
                collapse: { // if collapse animation effects are defined, they will be used instead of expand.reverse
                    duration: 200
                }
            },
            expandMode: "multiple"
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            this.element.off(NS);

            kendo.destroy(this.element);
        },

        _initData: function(options) {
            var that = this;

            if (options.dataSource) {
                that.element.empty();
                that.append(options.dataSource, that.element);
            }
        },

        setOptions: function(options) {
            var animation = this.options.animation;

            this._animations(options);

            options.animation = extend(true, animation, options.animation);

            if ("dataSource" in options) {
                this._initData(options);
            }

            Widget.fn.setOptions.call(this, options);
        },

        expand: function (element, useAnimation) {
            var that = this,
                animBackup = {};
            useAnimation = useAnimation !== false;
            element = this.element.find(element);

            element.each(function (index, item) {
                item = $(item);
                var groups = item.find(GROUPS).add(item.find(CONTENTS));

                if (!item.hasClass(DISABLEDCLASS) && groups.length > 0) {

                    if (that.options.expandMode == SINGLE && that._collapseAllExpanded(item)) {
                        return that;
                    }

                    element.find("." + HIGHLIGHTCLASS).removeClass(HIGHLIGHTCLASS);
                    item.addClass(HIGHLIGHTCLASS);

                    if (!useAnimation) {
                        animBackup = that.options.animation;
                        that.options.animation = { expand: { effects: {} }, collapse: { hide: true, effects: {} } };
                    }

                    if (!that._triggerEvent(EXPAND, item)) {
                        that._toggleItem(item, false);
                    }

                    if (!useAnimation) {
                        that.options.animation = animBackup;
                    }
                }
            });

            return that;
        },

        collapse: function (element, useAnimation) {
            var that = this,
                animBackup = {};
            useAnimation = useAnimation !== false;
            element = that.element.find(element);

            element.each(function (index, item) {
                item = $(item);
                var groups = item.find(GROUPS).add(item.find(CONTENTS));

                if (!item.hasClass(DISABLEDCLASS) && groups.is(VISIBLE)) {
                    item.removeClass(HIGHLIGHTCLASS);

                    if (!useAnimation) {
                        animBackup = that.options.animation;
                        that.options.animation = { expand: { effects: {} }, collapse: { hide: true, effects: {} } };
                    }

                    if (!that._triggerEvent(COLLAPSE, item)) {
                        that._toggleItem(item, true);
                    }

                    if (!useAnimation) {
                        that.options.animation = animBackup;
                    }
                }

            });

            return that;
        },

        _toggleDisabled: function (element, enable) {
            element = this.element.find(element);
            element
                .toggleClass(defaultState, enable)
                .toggleClass(DISABLEDCLASS, !enable)
                .attr(ARIA_DISABLED, !enable);
        },

        select: function (element) {
            var that = this;

            if (element === undefined) {
                return that.element.find(selectableItems).parent();
            }

            element = that.element.find(element);

            if (!element.length) {
                this._updateSelected(element);
            } else {
                element
                    .each(function () {
                        var item = $(this),
                            link = item.children(LINKSELECTOR);

                        if (item.hasClass(DISABLEDCLASS)) {
                            return that;
                        }

                        if (!that._triggerEvent(SELECT, item)) {
                            that._updateSelected(link);
                        }
                    });
            }

            return that;
        },

        clearSelection: function() {
            this.select($());
        },

        enable: function (element, state) {
            this._toggleDisabled(element, state !== false);

            return this;
        },

        disable: function (element) {
            this._toggleDisabled(element, false);

            return this;
        },

        append: function (item, referenceItem) {
            referenceItem = this.element.find(referenceItem);

            var inserted = this._insert(item, referenceItem, referenceItem.length ? referenceItem.find(GROUPS) : null);

            each(inserted.items, function () {
                inserted.group.append(this);
                updateFirstLast(this);
            });

            updateArrow(referenceItem);
            updateFirstLast(inserted.group.find(".k-first, .k-last"));
            inserted.group.height("auto");

            return this;
        },

        insertBefore: function (item, referenceItem) {
            referenceItem = this.element.find(referenceItem);

            var inserted = this._insert(item, referenceItem, referenceItem.parent());

            each(inserted.items, function () {
                referenceItem.before(this);
                updateFirstLast(this);
            });

            updateFirstLast(referenceItem);
            inserted.group.height("auto");

            return this;
        },

        insertAfter: function (item, referenceItem) {
            referenceItem = this.element.find(referenceItem);

            var inserted = this._insert(item, referenceItem, referenceItem.parent());

            each(inserted.items, function () {
                referenceItem.after(this);
                updateFirstLast(this);
            });

            updateFirstLast(referenceItem);
            inserted.group.height("auto");

            return this;
        },

        remove: function (element) {
            element = this.element.find(element);

            var that = this,
                parent = element.parentsUntil(that.element, ITEM),
                group = element.parent("ul");

            element.remove();

            if (group && !group.hasClass("k-panelbar") && !group.children(ITEM).length) {
                group.remove();
            }

            if (parent.length) {
                parent = parent.eq(0);

                updateArrow(parent);
                updateFirstLast(parent);
            }

            return that;
        },

        reload: function (element) {
            var that = this;
            element = that.element.find(element);

            element.each(function () {
                var item = $(this);

                that._ajaxRequest(item, item.children("." + CONTENT), !item.is(VISIBLE));
            });
        },

        _first: function() {
            return this.element.children(ACTIVEITEMSELECTOR).first();
        },

        _last: function() {
            var item = this.element.children(ACTIVEITEMSELECTOR).last(),
                group = item.children(VISIBLEGROUP);

            if (group[0]) {
                return group.children(ACTIVEITEMSELECTOR).last();
            }
            return item;
        },

        _current: function(candidate) {
            var that = this,
                focused = that._focused,
                id = that._itemId;

            if (candidate === undefined) {
                return focused;
            }

            that.element.removeAttr("aria-activedescendant");

            if (focused) {
                if (focused[0].id === id) {
                    focused.removeAttr("id");
                }

                focused
                    .children(LINKSELECTOR)
                    .removeClass(FOCUSEDCLASS);
            }

            if (candidate) {
                id = candidate[0].id || id;

                candidate.attr("id", id)
                         .children(LINKSELECTOR)
                         .addClass(FOCUSEDCLASS);

                that.element.attr("aria-activedescendant", id);
            }

            that._focused = candidate;
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                current = that._current();

            if (e.target != e.currentTarget) {
                return;
            }

            if (key == keys.DOWN || key == keys.RIGHT) {
                that._current(that._nextItem(current));
                e.preventDefault();
            } else if (key == keys.UP || key == keys.LEFT) {
                that._current(that._prevItem(current));
                e.preventDefault();
            } else if (key == keys.ENTER || key == keys.SPACEBAR) {
                that._click(current.children(LINKSELECTOR));
                e.preventDefault();
            } else if (key == keys.HOME) {
                that._current(that._first());
                e.preventDefault();
            } else if (key == keys.END) {
                that._current(that._last());
                e.preventDefault();
            }
        },

        _nextItem: function(item) {
            if (!item) {
                return this._first();
            }

            var group = item.children(VISIBLEGROUP),
                next = item.nextAll(":visible").first();

            if (group[0]) {
                next = group.children("." + FIRST);
            }

            if (!next[0]) {
                next = item.parent(VISIBLEGROUP).parent(ITEM).next();
            }

            if (!next[0]) {
                next = this._first();
            }

            if (next.hasClass(DISABLEDCLASS)) {
                next = this._nextItem(next);
            }

            return next;
        },

        _prevItem: function(item) {
            if (!item) {
                return this._last();
            }

            var prev = item.prevAll(":visible").first(),
                result;

            if (!prev[0]) {
                prev = item.parent(VISIBLEGROUP).parent(ITEM);
                if (!prev[0]) {
                    prev = this._last();
                }
            } else {
                result = prev;
                while (result[0]) {
                    result = result.children(VISIBLEGROUP).children("." + LAST);
                    if (result[0]) {
                        prev = result;
                    }
                }
            }

            if (prev.hasClass(DISABLEDCLASS)) {
                prev = this._prevItem(prev);
            }

            return prev;
        },

        _insert: function (item, referenceItem, parent) {
            var that = this,
                items,
                plain = $.isPlainObject(item),
                isReferenceItem = referenceItem && referenceItem[0],
                groupData;

            if (!isReferenceItem) {
                parent = that.element;
            }

            groupData = {
                firstLevel: parent.hasClass("k-panelbar"),
                expanded: parent.parent().hasClass(ACTIVECLASS),
                length: parent.children().length
            };

            if (isReferenceItem && !parent.length) {
                parent = $(PanelBar.renderGroup({ group: groupData })).appendTo(referenceItem);
            }

            if (item instanceof kendo.Observable) {
                item = item.toJSON();
            }

            if (plain || $.isArray(item)) { // is JSON
                items = $.map(plain ? [ item ] : item, function (value, idx) {
                            if (typeof value === "string") {
                                return $(value);
                            } else {
                                return $(PanelBar.renderItem({
                                    group: groupData,
                                    item: extend(value, { index: idx })
                                }));
                            }
                        });

                if (isReferenceItem) {
                    referenceItem.attr(ARIA_EXPANDED, false);
                }
            } else {
                if (typeof item == "string" && item.charAt(0) != "<") {
                    items = that.element.find(item);
                } else {
                    items = $(item);
                }
                that._updateItemsClasses(items);
            }

            return { items: items, group: parent };
        },

        _toggleHover: function(e) {
            var target = $(e.currentTarget);

            if (!target.parents("li." + DISABLEDCLASS).length) {
                target.toggleClass("k-state-hover", e.type == MOUSEENTER);
            }
        },

        _updateClasses: function() {
            var that = this,
                panels, items;

            panels = that.element
                         .find("li > ul")
                         .not(function () { return $(this).parentsUntil(".k-panelbar", "div").length; })
                         .addClass("k-group k-panel")
                         .attr("role", "group");

            panels.parent()
                  .attr(ARIA_EXPANDED, false)
                  .not("." + ACTIVECLASS)
                  .children("ul")
                  .attr(ARIA_HIDDEN, true)
                  .hide();

            items = that.element.add(panels).children();

            that._updateItemsClasses(items);
            updateArrow(items);
            updateFirstLast(items);
        },

        _updateItemsClasses: function(items) {
            var length = items.length,
                idx = 0;

            for(; idx < length; idx++) {
                this._updateItemClasses(items[idx], idx);
            }
        },

        _updateItemClasses: function(item, index) {
            var selected = this._selected,
                contentUrls = this.options.contentUrls,
                url = contentUrls && contentUrls[index],
                root = this.element[0],
                wrapElement, link;

            item = $(item).addClass("k-item").attr("role", "menuitem");

            if (kendo.support.browser.msie) {  // IE10 doesn't apply list-style: none on invisible items otherwise.
                item.css("list-style-position", "inside")
                    .css("list-style-position", "");
            }

            item
                .children(IMG)
                .addClass(IMAGE);

            link = item
                    .children("a")
                    .addClass(LINK);

            if (link[0]) {
                link.attr("href", url); //url can be undefined

                link.children(IMG)
                    .addClass(IMAGE);
            }

            item
                .filter(":not([disabled]):not([class*=k-state])")
                .addClass("k-state-default");

            item
                .filter("li[disabled]")
                .addClass("k-state-disabled")
                .attr(ARIA_DISABLED, true)
                .removeAttr("disabled");

            item
                .children("div")
                .addClass(CONTENT)
                .attr("role", "region")
                .attr(ARIA_HIDDEN, true)
                .hide()
                .parent()
                .attr(ARIA_EXPANDED, false);

            link = item.children(SELECTEDSELECTOR);
            if (link[0]) {
                if (selected) {
                    selected.removeAttr(ARIA_SELECTED)
                            .children(SELECTEDSELECTOR)
                            .removeClass(SELECTEDCLASS);
                }

                link.addClass(SELECTEDCLASS);
                this._selected = item.attr(ARIA_SELECTED, true);
            }

            if (!item.children(LINKSELECTOR)[0]) {
                wrapElement = "<span class='" + LINK + "'/>";
                if (contentUrls && contentUrls[index] && item[0].parentNode == root) {
                    wrapElement = '<a class="k-link k-header" href="' + contentUrls[index] + '"/>';
                }

                item
                    .contents()      // exclude groups, real links, templates and empty text nodes
                    .filter(function() { return (!this.nodeName.match(excludedNodesRegExp) && !(this.nodeType == 3 && !$.trim(this.nodeValue))); })
                    .wrapAll(wrapElement);
            }

            if (item.parent(".k-panelbar")[0]) {
                item
                    .children(LINKSELECTOR)
                    .addClass("k-header");
            }
        },

        _click: function (target) {
            var that = this,
                element = that.element,
                prevent, contents, href, isAnchor;

            if (target.parents("li." + DISABLEDCLASS).length) {
                return;
            }

            if (target.closest(".k-widget")[0] != element[0]) {
                return;
            }

            var link = target.closest(LINKSELECTOR),
                item = link.closest(ITEM);

            that._updateSelected(link);

            contents = item.find(GROUPS).add(item.find(CONTENTS));
            href = link.attr(HREF);
            isAnchor = href && (href.charAt(href.length - 1) == "#" || href.indexOf("#" + that.element[0].id + "-") != -1);
            prevent = !!(isAnchor || contents.length);

            if (contents.data("animating")) {
                return prevent;
            }

            if (that._triggerEvent(SELECT, item)) {
                prevent = true;
            }

            if (prevent === false) {
                return;
            }

            if (that.options.expandMode == SINGLE) {
                if (that._collapseAllExpanded(item)) {
                    return prevent;
                }
            }

            if (contents.length) {
                var visibility = contents.is(VISIBLE);

                if (!that._triggerEvent(!visibility ? EXPAND : COLLAPSE, item)) {
                    prevent = that._toggleItem(item, visibility);
                }
            }

            return prevent;
        },

        _toggleItem: function (element, isVisible) {
            var that = this,
                childGroup = element.find(GROUPS),
                link = element.find(LINKSELECTOR),
                url = link.attr(HREF),
                prevent, content;

            if (childGroup.length) {
                this._toggleGroup(childGroup, isVisible);
                prevent = true;
            } else {
                content = element.children("."  + CONTENT);

                if (content.length) {
                    prevent = true;

                    if (!content.is(EMPTY) || url === undefined) {
                        that._toggleGroup(content, isVisible);
                    } else {
                        that._ajaxRequest(element, content, isVisible);
                    }
                }
            }
            return prevent;
        },

        _toggleGroup: function (element, visibility) {
            var that = this,
                animationSettings = that.options.animation,
                animation = animationSettings.expand,
                collapse = extend({}, animationSettings.collapse),
                hasCollapseAnimation = collapse && "effects" in collapse;

            if (element.is(VISIBLE) != visibility) {
                return;
            }

            element
                .parent()
                .attr(ARIA_EXPANDED, !visibility)
                .attr(ARIA_HIDDEN, visibility)
                .toggleClass(ACTIVECLASS, !visibility)
                .find("> .k-link > .k-icon")
                    .toggleClass("k-i-arrow-n", !visibility)
                    .toggleClass("k-panelbar-collapse", !visibility)
                    .toggleClass("k-i-arrow-s", visibility)
                    .toggleClass("k-panelbar-expand", visibility);

            if (visibility) {
                animation = extend( hasCollapseAnimation ? collapse
                                    : extend({ reverse: true }, animation), { hide: true });
            } else {
                animation = extend( { complete: function (element) {
                    that._triggerEvent(ACTIVATE, element.closest(ITEM));
                } }, animation );
            }

            element
                .kendoStop(true, true)
                .kendoAnimate( animation );
        },

        _collapseAllExpanded: function (item) {
            var that = this, children, stopExpand = false;

            var groups = item.find(GROUPS).add(item.find(CONTENTS));

            if (groups.is(VISIBLE)) {
                stopExpand = true;
            }

            if (!(groups.is(VISIBLE) || groups.length === 0)) {
                children = item.siblings();
                children.find(GROUPS).add(children.find(CONTENTS))
                        .filter(function () { return $(this).is(VISIBLE); })
                        .each(function (index, content) {
                            content = $(content);

                            stopExpand = that._triggerEvent(COLLAPSE, content.closest(ITEM));
                            if (!stopExpand) {
                                that._toggleGroup(content, true);
                            }
                        });
            }

            return stopExpand;
        },

        _ajaxRequest: function (element, contentElement, isVisible) {

            var that = this,
                statusIcon = element.find(".k-panelbar-collapse, .k-panelbar-expand"),
                link = element.find(LINKSELECTOR),
                loadingIconTimeout = setTimeout(function () {
                    statusIcon.addClass("k-loading");
                }, 100),
                data = {},
                url = link.attr(HREF);

            $.ajax({
                type: "GET",
                cache: false,
                url: url,
                dataType: "html",
                data: data,

                error: function (xhr, status) {
                    statusIcon.removeClass("k-loading");
                    if (that.trigger(ERROR, { xhr: xhr, status: status })) {
                        this.complete();
                    }
                },

                complete: function () {
                    clearTimeout(loadingIconTimeout);
                    statusIcon.removeClass("k-loading");
                },

                success: function (data) {
                    function getElements(){
                        return { elements: contentElement.get() };
                    }
                    try {
                        that.angular("cleanup", getElements);
                        contentElement.html(data);
                        that.angular("compile", getElements);
                    } catch (e) {
                        var console = window.console;

                        if (console && console.error) {
                            console.error(e.name + ": " + e.message + " in " + url);
                        }
                        this.error(this.xhr, "error");
                    }

                    that._toggleGroup(contentElement, isVisible);

                    that.trigger(CONTENTLOAD, { item: element[0], contentElement: contentElement[0] });
                }
            });
        },

        _triggerEvent: function (eventName, element) {
            var that = this;

            return that.trigger(eventName, { item: element[0] });
        },

        _updateSelected: function(link) {
            var that = this,
                element = that.element,
                item = link.parent(ITEM),
                selected = that._selected;

            if (selected) {
                selected.removeAttr(ARIA_SELECTED);
            }

            that._selected = item.attr(ARIA_SELECTED, true);

            element.find(selectableItems).removeClass(SELECTEDCLASS);
            element.find("> ." + HIGHLIGHTCLASS + ", .k-panel > ." + HIGHLIGHTCLASS).removeClass(HIGHLIGHTCLASS);

            link.addClass(SELECTEDCLASS);
            link.parentsUntil(element, ITEM).filter(":has(.k-header)").addClass(HIGHLIGHTCLASS);
            that._current(item[0] ? item : null);
        },

        _animations: function(options) {
            if (options && ("animation" in options) && !options.animation) {
                options.animation = { expand: { effects: {} }, collapse: { hide: true, effects: {} } };
            }
        }

    });

    // client-side rendering
    extend(PanelBar, {
        renderItem: function (options) {
            options = extend({ panelBar: {}, group: {} }, options);

            var empty = templates.empty,
                item = options.item;

            return templates.item(extend(options, {
                image: item.imageUrl ? templates.image : empty,
                sprite: item.spriteCssClass ? templates.sprite : empty,
                itemWrapper: templates.itemWrapper,
                renderContent: PanelBar.renderContent,
                arrow: item.items || item.content || item.contentUrl ? templates.arrow : empty,
                subGroup: PanelBar.renderGroup
            }, rendering));
        },

        renderGroup: function (options) {
            return templates.group(extend({
                renderItems: function(options) {
                    var html = "",
                        i = 0,
                        items = options.items,
                        len = items ? items.length : 0,
                        group = extend({ length: len }, options.group);

                    for (; i < len; i++) {
                        html += PanelBar.renderItem(extend(options, {
                            group: group,
                            item: extend({ index: i }, items[i])
                        }));
                    }

                    return html;
                }
            }, options, rendering));
        },

        renderContent: function (options) {
            return templates.content(extend(options, rendering));
        }
    });

    kendo.ui.plugin(PanelBar);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
