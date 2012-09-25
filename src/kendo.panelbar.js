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
        ERROR = "error",
        CLICK = "click",
        ITEM = ".k-item",
        IMAGE = "k-image",
        FIRST = "k-first",
        EXPAND = "expand",
        SELECT = "select",
        CONTENT = "k-content",
        ACTIVATE = "activate",
        COLLAPSE = "collapse",
        CONTENTURL = "contentUrl",
        MOUSEENTER = "mouseenter",
        MOUSELEAVE = "mouseleave",
        CONTENTLOAD = "contentLoad",
        ACTIVECLASS = ".k-state-active",
        GROUPS = "> .k-panel",
        CONTENTS = "> .k-content",
        FOCUSEDCLASS = "k-state-focused",
        SELECTEDCLASS = ".k-state-selected",
        DISABLEDCLASS = ".k-state-disabled",
        HIGHLIGHTEDCLASS = ".k-state-highlighted",
        clickableItems = ITEM + ":not(.k-state-disabled) > .k-link",
        disabledItems = ITEM + ".k-state-disabled > .k-link",
        selectableItems = "> li > .k-state-selected, .k-panel > li > .k-state-selected",
        //fix this
        highlightableItems = "> .k-state-highlighted, .k-panel > .k-state-highlighted",
        focusedItems = "li > .k-state-focused",
        defaultState = "k-state-default",
        VISIBLE = ":visible",
        EMPTY = ":empty",
        SINGLE = "single",

        templates = {
            content: template(
                "<div class='k-content'#= contentAttributes(data) #>#= content(item) #</div>"
            ),
            group: template(
                "<ul class='#= groupCssClass(group) #'#= groupAttributes(group) #>" +
                    "#= renderItems(data) #" +
                "</ul>"
            ),
            itemWrapper: template(
                "<#= tag(item) # class='#= textClass(item, group) #'#= contentUrl(item) ##= textAttributes(item) #>" +
                    "#= image(item) ##= sprite(item) ##= text(item) #" +
                    "#= arrow(data) #" +
                "</#= tag(item) #>"
            ),
            item: template(
                "<li class='#= wrapperCssClass(group, item) #'>" +
                    "#= itemWrapper(data) #" +
                    "# if (item.items) { #" +
                    "#= subGroup({ items: item.items, panelBar: panelBar, group: { expanded: item.expanded } }) #" +
                    "# } #" +
                "</li>"
            ),
            image: template("<img class='k-image' alt='' src='#= imageUrl #' />"),
            arrow: template("<span class='#= arrowClass(item) #'></span>"),
            sprite: template("<span class='k-sprite #= spriteCssClass #'></span>"),
            empty: template("")
        },

        rendering = {
            wrapperCssClass: function (group, item) {
                var result = "k-item",
                    index = item.index;

                if (item.enabled === false) {
                    result += " k-state-disabled";
                } else if (item.expanded === true) {
                    result += " k-state-active";
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
                return item.url ? "a" : "span";
            },
            groupAttributes: function(group) {
                return group.expanded !== true ? " style='display:none'" : "";
            },
            groupCssClass: function(group) {
                return "k-group k-panel";
            },
            contentAttributes: function(content) {
                return content.item.expanded !== true ? " style='display:none'" : "";
            },
            content: function(item) {
                return item.content ? item.content : item.contentUrl ? "" : "&nbsp;";
            },
            contentUrl: function(item) {
                return item.contentUrl ? kendo.attr("content-url") + '="' + item.contentUrl + '"' : "";
            }
        };

    function updateItemClasses (item, panelElement) {
        item = $(item).addClass("k-item");

        item
            .children(IMG)
            .addClass(IMAGE);
        item
            .children("a")
            .addClass(LINK)
            .children(IMG)
            .addClass(IMAGE);
        item
            .filter(":not([disabled]):not([class*=k-state])")
            .addClass("k-state-default");
        item
            .filter("li[disabled]")
            .addClass("k-state-disabled")
            .removeAttr("disabled");
        item
            .filter(":not([class*=k-state])")
            .children("a")
            .filter(":focus")
            .parent()
            .addClass(ACTIVECLASS.substr(1));
        item
            .find(">div")
            .addClass(CONTENT)
            .css({ display: "none" });

        item.each(function() {
            var item = $(this);

            if (!item.children("." + LINK).length) {
                item
                    .contents()      // exclude groups, real links, templates and empty text nodes
                    .filter(function() { return (!this.nodeName.match(excludedNodesRegExp) && !(this.nodeType == 3 && !$.trim(this.nodeValue))); })
                    .wrapAll("<span class='" + LINK + "'/>");
            }
        });

        panelElement
            .find(" > li > ." + LINK)
            .addClass("k-header");
    }

    function updateArrow (items) {
        items = $(items);

        items.children(".k-link").children(".k-icon").remove();

        items
            .filter(":has(.k-panel),:has(.k-content)")
            .children(".k-link:not(:has([class*=k-i-arrow]))")
            .each(function () {
                var item = $(this),
                    parent = item.parent();

                item.append("<span class='k-icon " + (parent.hasClass(ACTIVECLASS.substr(1)) ? "k-i-arrow-n k-panelbar-collapse" : "k-i-arrow-s k-panelbar-expand") + "'/>");
            });
    }

    function updateFirstLast (items) {
        items = $(items);

        items.filter(".k-first:not(:first-child)").removeClass(FIRST);
        items.filter(".k-last:not(:last-child)").removeClass(LAST);
        items.filter(":first-child").addClass(FIRST);
        items.filter(":last-child").addClass(LAST);
    }

    function updateSelected (element, link) {
        element.find(selectableItems).removeClass(SELECTEDCLASS.substr(1));
        element.find(highlightableItems).removeClass(HIGHLIGHTEDCLASS.substr(1));

        link.addClass(SELECTEDCLASS.substr(1));
        link.parentsUntil(element, ITEM).filter(":has(.k-header)").addClass(HIGHLIGHTEDCLASS.substr(1));
    }

    var PanelBar = Widget.extend({
        init: function(element, options) {
            var that = this,
                content;

            Widget.fn.init.call(that, element, options);

            element = that.wrapper = that.element;
            options = that.options;

            if (options.dataSource) {
                that.element.empty();
                that.append(options.dataSource, element);
            }

            that._tabindex();
            that._updateClasses();

            if (options.animation === false) {
                options.animation = { expand: { show: true, effects: {} }, collapse: { hide:true, effects: {} } };
            }

            element
                .on(CLICK + NS, clickableItems, $.proxy(that._click, that))
                .on(MOUSEENTER  + NS + " " + MOUSELEAVE + NS, clickableItems, that._toggleHover)
                .on(CLICK + NS, disabledItems, false)
                .on("keydown" + NS, $.proxy(that._keydown, that))
                .on("focus" + NS, function() {
                    that._current(that._active());
                })
                .on("blur" + NS, function() {
                    that._current(null);
                });

            if (options.contentUrls) {
                element.find("> .k-item")
                    .each(function(index, item) {
                        $(item).find("." + LINK).data(CONTENTURL, options.contentUrls[index]);
                    });
            }

            content = element.find("li" + ACTIVECLASS + " > ." + CONTENT);

            if (content.length > 0) {
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
                    duration: 200,
                    show: true
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

                    element.find(HIGHLIGHTEDCLASS).removeClass(HIGHLIGHTEDCLASS.substr(1));
                    item.addClass(HIGHLIGHTEDCLASS.substr(1));

                    if (!useAnimation) {
                        animBackup = that.options.animation;
                        that.options.animation = { expand: { show: true, effects: {} }, collapse: { hide:true, effects: {} } };
                    }

                    if (!that._triggerEvent(EXPAND, item)) {
                        that._toggleItem(item, false, null);
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
                    item.removeClass(HIGHLIGHTEDCLASS.substr(1));

                    if (!useAnimation) {
                        animBackup = that.options.animation;
                        that.options.animation = { expand: { show: true, effects: {} }, collapse: { hide:true, effects: {} } };
                    }

                    if (!that._triggerEvent(COLLAPSE, item)) {
                        that._toggleItem(item, true, null);
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
                .toggleClass(DISABLEDCLASS.substr(1), !enable);
        },

        select: function (element) {
            var that = this;
            element = that.element.find(element);

            if (arguments.length === 0) {
                return that.element.find(selectableItems).parent();
            }

            element.each(function (index) {
                var item = $(this),
                    link = item.children("." + LINK);

                if (item.is(DISABLEDCLASS)) {
                    return that;
                }

                updateSelected(that.element, link);
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

        append: function (item, referenceItem) {
            referenceItem = this.element.find(referenceItem);

            var inserted = this._insert(item, referenceItem, referenceItem.length ? referenceItem.find(GROUPS) : null);

            each(inserted.items, function (idx) {
                inserted.group.append(this);

                var contents = inserted.contents[idx];
                if (contents) {
                    $(this).append(contents);
                }

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

            each(inserted.items, function (idx) {
                referenceItem.before(this);

                var contents = inserted.contents[idx];
                if (contents) {
                    $(this).append(contents);
                }

                updateFirstLast(this);
            });

            updateFirstLast(referenceItem);
            inserted.group.height("auto");

            return this;
        },

        insertAfter: function (item, referenceItem) {
            referenceItem = this.element.find(referenceItem);

            var inserted = this._insert(item, referenceItem, referenceItem.parent());

            each(inserted.items, function (idx) {
                referenceItem.after(this);

                var contents = inserted.contents[idx];
                if (contents) {
                    $(this).append(contents);
                }

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

        _active: function() {
            var item = this.select();

            if (!item[0]) {
                return this._first();
            } else {
                return item.eq(0); //if select return list ??????
            }
        },

        _first: function() {
            //do not get item which is disabled
            return this.element.find("li:has(span.k-link):first");
        },

        _last: function() {
            //do not get item which is disabled
            return this.element.find("li:has(span.k-link):last");
        },

        _current: function(candidate) {
            var that = this,
                focused = that._focused;

            if (candidate === undefined) {
                return focused;
            }

            if (focused) {
                focused.children(".k-link").removeClass(FOCUSEDCLASS);
            }

            if (candidate) {
                candidate.children(".k-link").addClass(FOCUSEDCLASS);
            }

            that._focused = candidate;
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                current = that._current();

            if (key == keys.DOWN) {
                that._current(that._nextItem(current));
                e.preventDefault();
            }

            if (key == keys.UP) {
                that._current(that._prevItem(current));
                e.preventDefault();
            }

            if (key == keys.ENTER || key == keys.SPACE) {
                if (current.children(".k-group:visible")[0]) {
                    that.collapse(current);
                } else {
                    that.expand(current);
                }
            }
        },

        _nextItem: function(item) {
            if (!item) {
                return this._first();
            }

            var group = item.children(".k-group"),
                next = item.next();

            if (group.is(":visible")) { //or add expanded attr
                next = group.children("li:first");
            }

            if (!next[0]) {
                next = item.parent(".k-group").parent("li.k-item").next();
            }

            if (!next[0]) {
                return this._first();
            }

            if (next.hasClass("k-state-disabled")) {
                next = this._nextItem(next);
            }

            return next;
        },

        _prevItem: function(item) {
            if (!item) {
                return this._last();
            }

            var prev = result = item.prev(),
                group;

            if (!prev[0]) {
                group = item.parent(".k-group");
                if (group[0]) {
                    prev = group.parent("li.k-item");
                } else {
                    prev = this._last();
                }
            } else {
                while(result[0]) {
                    result = result.children(".k-group:visible").children("li:last");
                    if (result[0]) {
                        prev = result;
                    }
                }
            }

            if (prev.hasClass("k-state-disabled")) {
                prev = this._prevItem(prev);
            }

            return prev;
        },

        _insert: function (item, referenceItem, parent) {
            var that = this,
                items, contents = [];

            if (!referenceItem || !referenceItem.length) {
                parent = that.element;
            }

            var plain = $.isPlainObject(item),
                groupData = {
                    firstLevel: parent.hasClass("k-panelbar"),
                    expanded: parent.parent().hasClass("k-state-active"),
                    length: parent.children().length
                };

            if (referenceItem && !parent.length) {
                parent = $(PanelBar.renderGroup({ group: groupData })).appendTo(referenceItem);
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
                contents = $.map(plain ? [ item ] : item, function (value, idx) {
                            if (value.content || value.contentUrl) {
                                return $(PanelBar.renderContent({
                                    item: extend(value, { index: idx })
                                }));
                            } else {
                                return false;
                            }
                        });
            } else {
                items = $(item);

                updateItemClasses(items, that.element);
            }

            return { items: items, group: parent, contents: contents };
        },

        _toggleHover: function(e) {
            var target = $(e.currentTarget);

            if (!target.parents("li" + DISABLEDCLASS).length) {
                target.toggleClass("k-state-hover", e.type == MOUSEENTER);
            }
        },

        _updateClasses: function() {
            var that = this;

            that.element.addClass("k-widget k-reset k-header k-panelbar");

            var panels = that.element
                                .find("li > ul")
                                .not(function () {
                                        return $(this).parentsUntil(".k-panelbar", "div").length;
                                    })
                                .addClass("k-group k-panel")
                                .add(that.element);

            var items = panels
                            .find("> li:not(" + ACTIVECLASS + ") > ul")
                            .css({ display: "none" })
                            .end()
                            .find("> li");

            items.each(function () {
                updateItemClasses(this, that.element);
            });

            updateArrow(items);
            updateFirstLast(items);
        },

        _click: function (e) {
            var that = this,
                target = $(e.currentTarget),
                element = that.element;

            if (target.parents("li" + DISABLEDCLASS).length) {
                return;
            }

            if (target.closest(".k-widget")[0] != element[0]) {
                return;
            }

            var link = target.closest("." + LINK),
                item = link.closest(ITEM);

            updateSelected(element, link);

            var contents = item.find(GROUPS).add(item.find(CONTENTS)),
                href = link.attr(HREF),
                isAnchor = link.data(CONTENTURL) || (href && (href.charAt(href.length - 1) == "#" || href.indexOf("#" + that.element[0].id + "-") != -1));

            if (contents.data("animating")) {
                return;
            }

            if (that._triggerEvent(SELECT, item)) {
                e.preventDefault();
            }

            if (isAnchor || contents.length) {
                e.preventDefault();
            } else {
                return;
            }

            if (that.options.expandMode == SINGLE) {
                if (that._collapseAllExpanded(item)) {
                    return;
                }
            }

            if (contents.length) {
                var visibility = contents.is(VISIBLE);

                if (!that._triggerEvent(!visibility ? EXPAND : COLLAPSE, item)) {
                    that._toggleItem(item, visibility, e);
                }
            }
        },

        _toggleItem: function (element, isVisible, e) {
            var that = this,
                childGroup = element.find(GROUPS);

            if (childGroup.length) {

                this._toggleGroup(childGroup, isVisible);

                if (e) {
                    e.preventDefault();
                }
            } else {

                var content = element.find("> ."  + CONTENT);

                if (content.length) {
                    if (e) {
                        e.preventDefault();
                    }

                    if (!content.is(EMPTY)) {
                        that._toggleGroup(content, isVisible);
                    } else {
                        that._ajaxRequest(element, content, isVisible);
                    }
                }
            }
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
                .toggleClass(defaultState, visibility)
                .toggleClass(ACTIVECLASS.substr(1), !visibility)
                .find("> .k-link > .k-icon")
                    .toggleClass("k-i-arrow-n", !visibility)
                    .toggleClass("k-panelbar-collapse", !visibility)
                    .toggleClass("k-i-arrow-s", visibility)
                    .toggleClass("k-panelbar-expand", visibility);

            if (visibility) {
                animation = extend( hasCollapseAnimation ? collapse
                                    : extend({ reverse: true }, animation), { show: false, hide: true });
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

            if (item.find("> ." + LINK).hasClass("k-header")) {
                var groups = item.find(GROUPS).add(item.find(CONTENTS));

                if (groups.is(VISIBLE)) {
                    stopExpand = true;
                }

                if (!(groups.is(VISIBLE) || groups.length === 0)) {
                    children = $(that.element).children();
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
            }
        },

        _ajaxRequest: function (element, contentElement, isVisible) {

            var that = this,
                statusIcon = element.find(".k-panelbar-collapse, .k-panelbar-expand"),
                link = element.find("." + LINK),
                loadingIconTimeout = setTimeout(function () {
                    statusIcon.addClass("k-loading");
                }, 100),
                data = {};

            $.ajax({
                type: "GET",
                cache: false,
                url: link.data(CONTENTURL) || link.attr(HREF),
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

                success: function (data, textStatus) {
                    contentElement.html(data);
                    that._toggleGroup(contentElement, isVisible);

                    that.trigger(CONTENTLOAD, { item: element[0], contentElement: contentElement[0] });
                }
            });
        },

        _triggerEvent: function (eventName, element) {
            var that = this;

            return that.trigger(eventName, { item: element[0] });
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

})(jQuery);
