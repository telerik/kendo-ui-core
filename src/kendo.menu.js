kendo_module({
    id: "menu",
    name: "Menu",
    category: "web",
    description: "The Menu widget displays hierarchical data as a multi-level menu.",
    depends: [ "popup" ]
});

(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        touch = (kendo.support.touch && kendo.support.mobileOS),
        mobile = touch || kendo.support.pointers,
        MOUSEDOWN = kendo.support.mousedown,
        CLICK = kendo.support.click,
        extend = $.extend,
        proxy = $.proxy,
        each = $.each,
        template = kendo.template,
        keys = kendo.keys,
        Widget = ui.Widget,
        excludedNodesRegExp = /^(ul|a|div)$/i,
        NS = ".kendoMenu",
        IMG = "img",
        OPEN = "open",
        MENU = "k-menu",
        LINK = "k-link",
        LAST = "k-last",
        CLOSE = "close",
        TIMER = "timer",
        FIRST = "k-first",
        IMAGE = "k-image",
        SELECT = "select",
        ZINDEX = "zIndex",
        MOUSEENTER = kendo.support.pointers ? "MSPointerOver" : "mouseenter",
        MOUSELEAVE = kendo.support.pointers ? "MSPointerOut" : "mouseleave",
        KENDOPOPUP = "kendoPopup",
        DEFAULTSTATE = "k-state-default",
        HOVERSTATE = "k-state-hover",
        FOCUSEDSTATE = "k-state-focused",
        DISABLEDSTATE = "k-state-disabled",
        groupSelector = ".k-group",
        ACTIVESTATE = "k-state-active",
        allItemsSelector = ":not(.k-list) > .k-item",
        disabledSelector = ".k-item.k-state-disabled",
        itemSelector = ".k-item:not(.k-state-disabled)",
        linkSelector = ".k-item:not(.k-state-disabled) > .k-link",
        templateSelector = "div:not(.k-animation-container,.k-list-container)",

        templates = {
            content: template(
                "<div class='k-content k-group'>#= content(item) #</div>"
            ),
            group: template(
                "<ul class='#= groupCssClass(group) #'#= groupAttributes(group) # role='menu' aria-hidden='true'>" +
                    "#= renderItems(data) #" +
                "</ul>"
            ),
            itemWrapper: template(
                "<#= tag(item) # class='#= textClass(item) #'#= textAttributes(item) #>" +
                    "#= image(item) ##= sprite(item) ##= text(item) #" +
                    "#= arrow(data) #" +
                "</#= tag(item) #>"
            ),
            item: template(
                "<li class='#= wrapperCssClass(group, item) #' role='menuitem' #=item.items ? \"aria-haspopup='true'\": \"\"#" +
                    "#=item.enabled === false ? \"aria-disabled='true'\" : ''#>" +
                    "#= itemWrapper(data) #" +
                    "# if (item.items) { #" +
                    "#= subGroup({ items: item.items, menu: menu, group: { expanded: item.expanded } }) #" +
                    "# } #" +
                "</li>"
            ),
            image: template("<img class='k-image' alt='' src='#= imageUrl #' />"),
            arrow: template("<span class='#= arrowClass(item, group) #'></span>"),
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

                if (group.firstLevel && index === 0) {
                    result += " k-first";
                }

                if (index == group.length-1) {
                    result += " k-last";
                }

                return result;
            },

            textClass: function() {
                return LINK;
            },

            textAttributes: function(item) {
                return item.url ? " href='" + item.url + "'" : "";
            },

            arrowClass: function(item, group) {
                var result = "k-icon";

                if (group.horizontal) {
                    result += " k-i-arrow-s";
                } else {
                    result += " k-i-arrow-e";
                }

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

            groupCssClass: function() {
                return "k-group";
            },

            content: function(item) {
                return item.content ? item.content : "&nbsp;";
            }
        };

    function getEffectDirection(direction, root) {
        direction = direction.split(" ")[!root+0] || direction;
        return direction.replace("top", "up").replace("bottom", "down");
    }

    function parseDirection(direction, root, isRtl) {
        direction = direction.split(" ")[!root+0] || direction;
        var output = { origin: ["bottom", (isRtl ? "right" : "left")], position: ["top", (isRtl ? "right" : "left")] },
            horizontal = /left|right/.test(direction);

        if (horizontal) {
            output.origin = [ "top", direction ];
            output.position[1] = kendo.directions[direction].reverse;
        } else {
            output.origin[0] = direction;
            output.position[0] = kendo.directions[direction].reverse;
        }

        output.origin = output.origin.join(" ");
        output.position = output.position.join(" ");

        return output;
    }

    function contains(parent, child) {
        try {
            return $.contains(parent, child);
        } catch (e) {
            return false;
        }
    }

    function updateItemClasses (item) {
        item = $(item);

        item.addClass("k-item")
            .children(IMG)
            .addClass(IMAGE);
        item
            .children("a")
            .addClass(LINK)
            .children(IMG)
            .addClass(IMAGE);
        item
            .filter(":not([disabled])")
            .addClass(DEFAULTSTATE);
        item
            .filter(".k-separator:empty")
            .append("&nbsp;");
        item
            .filter("li[disabled]")
            .addClass(DISABLEDSTATE)
            .removeAttr("disabled")
            .attr("aria-disabled", true);
        item
            .children("a")
            .filter(":focus")
            .parent()
            .addClass(ACTIVESTATE);

        if (!item.filter("[role]").length) {
            item.attr("role", "menuitem");
        }

        if (!item.children("." + LINK).length) {
            item
                .contents()      // exclude groups, real links, templates and empty text nodes
                .filter(function() { return (!this.nodeName.match(excludedNodesRegExp) && !(this.nodeType == 3 && !$.trim(this.nodeValue))); })
                .wrapAll("<span class='" + LINK + "'/>");
        }

        updateArrow(item);
        updateFirstLast(item);
    }

    function updateArrow (item) {
        item = $(item);

        item.find("> .k-link > .k-icon").remove();

        item.filter(":has(.k-group)")
            .children(".k-link:not(:has([class*=k-i-arrow]))")
            .each(function () {
                var item = $(this),
                    parent = item.parent().parent();

                item.append("<span class='k-icon " + (parent.hasClass(MENU + "-horizontal") ? "k-i-arrow-s" : "k-i-arrow-e") + "'/>");
            });
    }

    function updateFirstLast (item) {
        item = $(item);

        item.filter(".k-first:not(:first-child)").removeClass(FIRST);
        item.filter(".k-last:not(:last-child)").removeClass(LAST);
        item.filter(":first-child").addClass(FIRST);
        item.filter(":last-child").addClass(LAST);
    }

    var Menu = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.wrapper = that.element;
            options = that.options;

            if (options.dataSource) {
                that.element.empty();
                that.append(options.dataSource, element);
            }

            that._updateClasses();

            if (options.animation === false) {
                options.animation = { open: { effects: {} }, close: { hide: true, effects: {} } };
            }

            that.nextItemZIndex = 100;

            that._tabindex();

            element.on("touchstart", function (e) {
                        that.element[0].blur();
                        that.element[0].focus();
                        setTimeout(function () {
                            that._moveHover([], $(kendo.eventTarget(e)).closest(allItemsSelector));
                        }, 200); // Focus happens after click in WebKit.
                    })
                    .on("MSPointerDown", function (e) {
                        that._oldHoverItem = $(e.target).closest(allItemsSelector);
                    })
                   .on(CLICK + NS, disabledSelector, false)
                   .on(CLICK + NS, itemSelector, proxy(that._click , that))
                   .on("keydown" + NS, proxy(that._keydown, that))
                   .on("focus" + NS, proxy(that._focus, that))
                   .on("blur" + NS, proxy(that._removeHoverItem, that))
                   .on(MOUSEENTER + NS, itemSelector, proxy(that._mouseenter, that))
                   .on(MOUSELEAVE + NS, itemSelector, proxy(that._mouseleave, that))
                   .on(MOUSEENTER + NS + " " + MOUSELEAVE + NS + " " +
                       MOUSEDOWN + NS + " " + CLICK + NS, linkSelector, proxy(that._toggleHover, that));

            if (options.openOnClick) {
                that.clicked = false;
                that._documentClickHandler = proxy(that._documentClick, that);
                $(document).click(that._documentClickHandler);
            }

            element.attr("role", "menubar");

            if (element[0].id) {
                that._ariaId = kendo.format("{0}_mn_active", element[0].id);
            }

            kendo.notify(that);
        },

        events: [
            OPEN,
            CLOSE,
            SELECT
        ],

        options: {
            name: "Menu",
            animation: {
                open: {
                    duration: 200
                },
                close: { // if close animation effects are defined, they will be used instead of open.reverse
                    duration: 100
                }
            },
            orientation: "horizontal",
            direction: "default",
            openOnClick: false,
            closeOnClick: true,
            hoverDelay: 100
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.element.off(NS);

            if (that._documentClickHandler) {
                $(document).unbind(that._documentClickHandler);
            }
        },

        enable: function (element, enable) {
            this._toggleDisabled(element, enable !== false);

            return this;
        },

        disable: function (element) {
            this._toggleDisabled(element, false);

            return this;
        },

        append: function (item, referenceItem) {
            referenceItem = this.element.find(referenceItem);

            var inserted = this._insert(item, referenceItem, referenceItem.length ? referenceItem.find("> .k-group, .k-animation-container > .k-group") : null);

            each(inserted.items, function (idx) {
                inserted.group.append(this);

                var contents = inserted.contents[idx];
                if (contents) {
                    $(this).append(contents);
                }

                updateArrow(this);
            });

            updateArrow(referenceItem);
            updateFirstLast(inserted.group.find(".k-first, .k-last").add(inserted.items));

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

                updateArrow(this);
                updateFirstLast(this);
            });

            updateFirstLast(referenceItem);

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

                updateArrow(this);
                updateFirstLast(this);
            });

            updateFirstLast(referenceItem);

            return this;
        },

        _insert: function (item, referenceItem, parent) {
            var that = this,
                items, groups, contents = [];

            if (!referenceItem || !referenceItem.length) {
                parent = that.element;
            }

            var plain = $.isPlainObject(item),
                groupData = {
                    firstLevel: parent.hasClass(MENU),
                    horizontal: parent.hasClass(MENU + "-horizontal"),
                    expanded: true,
                    length: parent.children().length
                };

            if (referenceItem && !parent.length) {
                parent = $(Menu.renderGroup({ group: groupData })).appendTo(referenceItem);
            }

            if (plain || $.isArray(item)) { // is JSON
                items = $.map(plain ? [ item ] : item, function (value, idx) {
                            if (typeof value === "string") {
                                return $(value);
                            } else {
                                return $(Menu.renderItem({
                                    group: groupData,
                                    item: extend(value, { index: idx })
                                }));
                            }
                        });
                contents = $.map(plain ? [ item ] : item, function (value, idx) {
                            if (value.content || value.contentUrl) {
                                return $(Menu.renderContent({
                                    item: extend(value, { index: idx })
                                }));
                            } else {
                                return false;
                            }
                        });
            } else {
                items = $(item);
                groups = items.find("> ul")
                                .addClass("k-group")
                                .attr("role", "menu");

                items = items.filter("li");

                items.add(groups.find("> li")).each(function () {
                    updateItemClasses(this);
                });
            }

            return { items: items, group: parent, contents: contents };
        },

        remove: function (element) {
            element = this.element.find(element);

            var that = this,
                parent = element.parentsUntil(that.element, allItemsSelector),
                group = element.parent("ul");

            element.remove();

            if (group && !group.children(allItemsSelector).length) {
                var container = group.parent(".k-animation-container");
                if (container.length) {
                    container.remove();
                } else {
                    group.remove();
                }
            }

            if (parent.length) {
                parent = parent.eq(0);

                updateArrow(parent);
                updateFirstLast(parent);
            }

            return that;
        },

        open: function (element) {
            var that = this,
                options = that.options,
                horizontal = options.orientation == "horizontal",
                direction = options.direction,
                isRtl = kendo.support.isRtl(that.wrapper);
            element = that.element.find(element);

            if (/^(top|bottom|default)$/.test(direction)) {
                if (isRtl) {
                    direction = horizontal ? (direction + " left").replace("default", "bottom") : "left";
                } else {
                    direction = horizontal ? (direction + " right").replace("default", "bottom") : "right";
                }
            }

            element.siblings()
                   .find(">.k-popup:visible,>.k-animation-container>.k-popup:visible")
                   .each(function () {
                       var popup = $(this).data("kendoPopup");

                       if (popup) {
                           popup.close();
                       }
                   });

            element.each(function () {
                var li = $(this);

                clearTimeout(li.data(TIMER));

                li.data(TIMER, setTimeout(function () {
                    var ul = li.find(".k-group:first:hidden"), popup;

                    if (ul[0] && that.trigger(OPEN, { item: li[0] }) === false) {
                        li.data(ZINDEX, li.css(ZINDEX));
                        li.css(ZINDEX, that.nextItemZIndex ++);

                        popup = ul.data(KENDOPOPUP);
                        var root = li.parent().hasClass(MENU),
                            parentHorizontal = root && horizontal,
                            directions = parseDirection(direction, root, isRtl),
                            effects = options.animation.open.effects,
                            openEffects = effects !== undefined ? effects : "slideIn:" + getEffectDirection(direction, root);

                        if (!popup) {
                            popup = ul.kendoPopup({
                                origin: directions.origin,
                                position: directions.position,
                                collision: options.popupCollision !== undefined ? options.popupCollision : (parentHorizontal ? "fit" : "fit flip"),
                                anchor: li,
                                appendTo: li,
                                animation: {
                                    open: extend(true, { effects: openEffects }, options.animation.open),
                                    close: options.animation.close
                                },
                                close: function (e) {
                                    var li = e.sender.wrapper.parent();

                                    if (!that.trigger(CLOSE, { item: li[0] })) {
                                        li.css(ZINDEX, li.data(ZINDEX));
                                        li.removeData(ZINDEX);
                                    } else {
                                        e.preventDefault();
                                    }
                                }
                            }).data(KENDOPOPUP);
                        } else {
                            popup = ul.data(KENDOPOPUP);
                            popup.options.origin = directions.origin;
                            popup.options.position = directions.position;
                            popup.options.animation.open.effects = openEffects;
                        }
                        ul.removeAttr("aria-hidden");
                        popup.open();
                    }

                }, that.options.hoverDelay));
            });

            return that;
        },

        close: function (items) {
            var that = this,
                element = that.element;

            items = element.find(items);

            if (!items.length) {
                items = element.find(">.k-item");
            }

            items.each(function () {
                var li = $(this);

                clearTimeout(li.data(TIMER));

                li.data(TIMER, setTimeout(function () {
                    var popup = li.find(".k-group:first:visible").data(KENDOPOPUP);

                    if (popup) {
                        popup.close();
                        popup.element.attr("aria-hidden", true);
                    }
                }, that.options.hoverDelay));
            });

            return that;
        },

        _toggleDisabled: function (items, enable) {
            this.element.find(items).each(function () {
                $(this)
                    .toggleClass(DEFAULTSTATE, enable)
                    .toggleClass(DISABLEDSTATE, !enable)
                    .attr("aria-disabled", !enable);
            });
        },

        _toggleHover: function(e) {
            var target = $(kendo.eventTarget(e) || e.target).closest(allItemsSelector),
                isEnter = e.type == MOUSEENTER || MOUSEDOWN.indexOf(e.type) !== -1;

            if (!target.parents("li." + DISABLEDSTATE).length) {
                target.toggleClass(HOVERSTATE, isEnter);
            }

            this._removeHoverItem();
        },

        _removeHoverItem: function() {
            var oldHoverItem = this._oldHoverItem;

            if (oldHoverItem && oldHoverItem.hasClass(FOCUSEDSTATE)) {
                oldHoverItem.removeClass(FOCUSEDSTATE);
                this._oldHoverItem = null;
            }
        },

        _updateClasses: function() {
            var element = this.element,
                items;

            element.addClass("k-widget k-reset k-header " + MENU).addClass(MENU + "-" + this.options.orientation);

            element.find("li > ul").addClass("k-group").attr("role", "menu").attr("aria-hidden", element.is(":visible"));

            items = element.find("> li,.k-group > li");

            items.each(function () {
                updateItemClasses(this);
            });
        },

        _mouseenter: function (e) {
            var that = this,
                element = $(e.currentTarget),
                hasChildren = (element.children(".k-animation-container").length || element.children(groupSelector).length);

            if (e.delegateTarget != element.parents(".k-menu")[0]) {
                return;
            }

            if (!that.options.openOnClick || that.clicked) {
                if (!contains(e.currentTarget, e.relatedTarget) && hasChildren) {
                    that.open(element);
                }
            }

            if (that.options.openOnClick && that.clicked || mobile) {
                element.siblings().each(proxy(function (_, sibling) {
                    that.close(sibling);
                }, that));
            }
        },

        _mouseleave: function (e) {
            var that = this,
                element = $(e.currentTarget),
                hasChildren = (element.children(".k-animation-container").length || element.children(groupSelector).length);

            if (element.parentsUntil(".k-animation-container", ".k-list-container,.k-calendar-container")[0]) {
                e.stopImmediatePropagation();
                return;
            }

            if (!that.options.openOnClick && !touch && !(kendo.support.pointers && e.originalEvent.pointerType == 2) && !contains(e.currentTarget, e.relatedTarget) && hasChildren) {
                that.close(element);
            }
        },

        _click: function (e) {
            var that = this, openHandle,
                options = that.options,
                target = $(kendo.eventTarget(e)),
                nodeName = target[0] ? target[0].nodeName.toUpperCase() : "",
                formNode = (nodeName == "INPUT" || nodeName == "SELECT" || nodeName == "BUTTON"),
                link = target.closest("." + LINK),
                element = target.closest(allItemsSelector),
                href = link.attr("href"), childGroup, childGroupVisible,
                isLink = (!!href && href.charAt(href.length - 1) != "#");

            if (element.children(templateSelector)[0]) {
                return;
            }

            if (element.hasClass(DISABLEDSTATE)) {
                e.preventDefault();
                return;
            }

            if (!e.handled && that.trigger(SELECT, { item: element[0] }) && !formNode) { // We shouldn't stop propagation and shoudn't prevent form elements.
                e.preventDefault();
            }

            e.handled = true;

            childGroup = element.children(groupSelector + ",.k-animation-container");
            childGroupVisible = childGroup.is(":visible");

            if (options.closeOnClick && !isLink && (!childGroup.length || (options.openOnClick && childGroupVisible))) {
                element.removeClass(HOVERSTATE).css("height"); // Force refresh for Chrome
                that._oldHoverItem = that._findRootParent(element);
                that.close(link.parentsUntil(that.element, allItemsSelector));
                that.clicked = false;
                if ("touchend MSPointerUp".indexOf(e.type) != -1) {
                    e.preventDefault();
                }
                return;
            }

            if ((!element.parent().hasClass(MENU) || !options.openOnClick) && !kendo.support.touch) {
                return;
            }

            if (!isLink && !formNode) {
                e.preventDefault();
            }

            that.clicked = true;
            openHandle = childGroup.is(":visible") ? CLOSE : OPEN;
            that[openHandle](element);
        },

        _documentClick: function (e) {
            if (contains(this.element[0], e.target)) {
                return;
            }

            this.clicked = false;
        },

        _focus: function (e) {
            var that = this,
                target = e.target,
                hoverItem = that._hoverItem();

            if (target == that.wrapper[0] && hoverItem.length) {
                that._moveHover([], hoverItem);
            } else if (target == that.wrapper[0] && !that._oldHoverItem) {
                that._moveHover([], that.wrapper.children().first());
            }
        },

        _keydown: function (e) {
            var that = this,
                key = e.keyCode,
                hoverItem = that._oldHoverItem,
                target,
                belongsToVertical,
                hasChildren,
                isRtl = kendo.support.isRtl(that.wrapper);

            if (e.target != e.currentTarget && key != keys.ESC) {
                return;
            }

            if (!hoverItem) {
                hoverItem  = that._oldHoverItem = that._hoverItem();
            }

            belongsToVertical = that._itemBelongsToVertival(hoverItem);
            hasChildren = that._itemHasChildren(hoverItem);

            if (key == keys.RIGHT) {
                target = that[isRtl ? "_itemLeft" : "_itemRight"](hoverItem, belongsToVertical, hasChildren);
            } else if (key == keys.LEFT) {
                target = that[isRtl ? "_itemRight" : "_itemLeft"](hoverItem, belongsToVertical, hasChildren);
            } else if (key == keys.DOWN) {
                target = that._itemDown(hoverItem, belongsToVertical, hasChildren);
            } else if (key == keys.UP) {
                target = that._itemUp(hoverItem, belongsToVertical, hasChildren);
            } else if (key == keys.ESC) {
                target = that._itemEsc(hoverItem, belongsToVertical);
            } else if (key == keys.ENTER || key == keys.SPACEBAR) {
                target = hoverItem.children(".k-link");
                if (target.length > 0) {
                    that._click({ target: target[0], preventDefault: function () {} });
                    that._moveHover(hoverItem, that._findRootParent(hoverItem));
                }
            } else if (key == keys.TAB) {
                target = that._findRootParent(hoverItem);
                that.close(target);
                that._moveHover(hoverItem, target);

                return;
            }

            if (target && target[0]) {
                e.preventDefault();
                e.stopPropagation(); // needed to handle ESC in column menu only when a root item is focused
            }
        },

        _hoverItem: function() {
            return this.wrapper.find("li.k-item.k-state-hover").filter(":visible");
        },

        _itemBelongsToVertival: function (item) {
            var menuIsVertical = this.wrapper.hasClass("k-menu-vertical");

            if (!item.length) {
                return menuIsVertical;
            }
            return item.parent().hasClass("k-group") || menuIsVertical;
        },

        _itemHasChildren: function (item) {
            if (!item.length) {
                return false;
            }
            return item.children("ul.k-group, div.k-animation-container").length > 0;
        },

        _moveHover: function (item, nextItem) {
            var that = this,
                id = that._ariaId;

            if (item.length && nextItem.length) {
                item.removeClass(FOCUSEDSTATE);
                if (item[0].id === id) {
                    item.removeAttr("id");
                }
            }

            if (nextItem.length) {
                if (nextItem[0].id) {
                    id = nextItem[0].id;
                }

                nextItem.addClass(FOCUSEDSTATE);
                that._oldHoverItem = nextItem;

                if (id) {
                    that.element.removeAttr("aria-activedescendant");
                    nextItem.attr("id", id);
                    that.element.attr("aria-activedescendant", id);
                }
            }
        },

        _findRootParent: function (item) {
            if (item.parent().hasClass("k-menu")) {
                return item;
            } else {
                return item.parentsUntil(".k-menu", "li.k-item").last();
            }
        },

        _isRootItem: function (item) {
            return item.parent().hasClass("k-menu");
        },

        _itemRight: function (item, belongsToVertical, hasChildren) {
            var that = this,
                nextItem,
                parentItem;

            if (!belongsToVertical) {
                nextItem = item.next();
                if (nextItem.is(".k-separator")) {
                    nextItem = nextItem.next();
                }
                if (!nextItem.length) {
                    nextItem = item.parent().children().first();
                }
            } else if (hasChildren) {
                that.open(item);
                nextItem = item.find(".k-group").children().first();
            } else if (that.options.orientation == "horizontal") {
                parentItem = that._findRootParent(item);
                that.close(parentItem);
                nextItem = parentItem.next();
                if (nextItem.is(".k-separator")) {
                    nextItem = nextItem.next();
                }
            }

            if (nextItem && !nextItem.length) {
                nextItem = that.wrapper.children(".k-item").first();
            } else if (!nextItem) {
                nextItem = [];
            }

            that._moveHover(item, nextItem);
            return nextItem;
        },

        _itemLeft: function (item, belongsToVertical) {
            var that = this,
                nextItem;

            if (!belongsToVertical) {
                nextItem = item.prev();
                if (nextItem.is(".k-separator")) {
                    nextItem = nextItem.prev();
                }
                if (!nextItem.length) {
                    nextItem = item.parent().children().last();
                }
            } else {
                nextItem = item.parent().closest(".k-item");
                that.close(nextItem);
                if (that._isRootItem(nextItem) && that.options.orientation == "horizontal") {
                    nextItem = nextItem.prev();
                    if (nextItem.is(".k-separator")) {
                        nextItem = nextItem.prev();
                    }
                }
            }

            if (!nextItem.length) {
                nextItem = that.wrapper.children(".k-item").last();
            }

            that._moveHover(item, nextItem);
            return nextItem;
        },

        _itemDown: function (item, belongsToVertical, hasChildren) {
            var that = this,
                nextItem;

            if (!belongsToVertical) {
                if (!hasChildren || item.hasClass(DISABLEDSTATE)) {
                    return;
                } else {
                    that.open(item);
                    nextItem = item.find(".k-group").children().first();
                }
            } else {
                nextItem = item.next();
                if (nextItem.is(".k-separator")) {
                    nextItem = nextItem.next();
                }
            }

            if (!nextItem.length && item.length) {
                nextItem = item.parent().children().first();
            } else if (!item.length) {
                nextItem = that.wrapper.children(".k-item").first();
            }

            that._moveHover(item, nextItem);
            return nextItem;
        },

        _itemUp: function (item, belongsToVertical) {
            var that = this,
                nextItem;

            if (!belongsToVertical) {
                return;
            } else {
                nextItem = item.prev();
                if (nextItem.is(".k-separator")) {
                    nextItem = nextItem.prev();
                }
            }

            if (!nextItem.length && item.length) {
                nextItem = item.parent().children().last();
            } else if (!item.length) {
                nextItem = that.wrapper.children(".k-item").last();
            }

            that._moveHover(item, nextItem);
            return nextItem;
        },

        _itemEsc: function (item, belongsToVertical) {
            var that = this,
                nextItem;

            if (!belongsToVertical) {
                return item;
            } else {
                nextItem = item.parent().closest(".k-item");
                that.close(nextItem);
                that._moveHover(item, nextItem);
            }

            return nextItem;
        }

    });

    // client-side rendering
    extend(Menu, {
        renderItem: function (options) {
            options = extend({ menu: {}, group: {} }, options);

            var empty = templates.empty,
                item = options.item;

            return templates.item(extend(options, {
                image: item.imageUrl ? templates.image : empty,
                sprite: item.spriteCssClass ? templates.sprite : empty,
                itemWrapper: templates.itemWrapper,
                arrow: item.items || item.content ? templates.arrow : empty,
                subGroup: Menu.renderGroup
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
                        html += Menu.renderItem(extend(options, {
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

    kendo.ui.plugin(Menu);

})(window.kendo.jQuery);
