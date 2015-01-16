(function(f, define){
    define([ "./kendo.popup" ], f);
})(function(){

var __meta__ = {
    id: "menu",
    name: "Menu",
    category: "web",
    description: "The Menu widget displays hierarchical data as a multi-level menu.",
    depends: [ "popup" ]
};

(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        activeElement = kendo._activeElement,
        touch = (kendo.support.touch && kendo.support.mobileOS),
        MOUSEDOWN = "mousedown",
        CLICK = "click",
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
        ACTIVATE = "activate",
        DEACTIVATE = "deactivate",
        POINTERDOWN = "touchstart" + NS + " MSPointerDown" + NS + " pointerdown" + NS,
        pointers = kendo.support.pointers,
        msPointers = kendo.support.msPointers,
        allPointers = msPointers || pointers,
        MOUSEENTER = pointers ? "pointerover" : (msPointers ? "MSPointerOver" : "mouseenter"),
        MOUSELEAVE = pointers ? "pointerout" : (msPointers ? "MSPointerOut" : "mouseleave"),
        mobile = touch || allPointers,
        DOCUMENT_ELEMENT = $(document.documentElement),
        KENDOPOPUP = "kendoPopup",
        DEFAULTSTATE = "k-state-default",
        HOVERSTATE = "k-state-hover",
        FOCUSEDSTATE = "k-state-focused",
        DISABLEDSTATE = "k-state-disabled",
        menuSelector = ".k-menu",
        groupSelector = ".k-menu-group",
        popupSelector = groupSelector + ",.k-animation-container",
        allItemsSelector = ":not(.k-list) > .k-item",
        disabledSelector = ".k-item.k-state-disabled",
        itemSelector = ".k-item:not(.k-state-disabled)",
        linkSelector = ".k-item:not(.k-state-disabled) > .k-link",
        exclusionSelector = ":not(.k-item.k-separator)",
        nextSelector = exclusionSelector + ":eq(0)",
        lastSelector = exclusionSelector + ":last",
        templateSelector = "> div:not(.k-animation-container,.k-list-container)",
        touchPointerTypes = { "2": 1, "touch": 1 },

        templates = {
            content: template(
                "<div class='k-content #= groupCssClass() #' tabindex='-1'>#= content(item) #</div>"
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
                    "# } else if (item.content || item.contentUrl) { #" +
                    "#= renderContent(data) #" +
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

                if (item.cssClass) {
                    result += " " + item.cssClass;
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
                return "k-group k-menu-group";
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

        item.find("> .k-link > [class*=k-i-arrow]:not(.k-sprite)").remove();

        item.filter(":has(.k-menu-group)")
            .children(".k-link:not(:has([class*=k-i-arrow]:not(.k-sprite)))")
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

            that._initData(options);

            that._updateClasses();

            that._animations(options);

            that.nextItemZIndex = 100;

            that._tabindex();

            that._focusProxy = proxy(that._focusHandler, that);

            element.on(POINTERDOWN, itemSelector, that._focusProxy)
                   .on(CLICK + NS, disabledSelector, false)
                   .on(CLICK + NS, itemSelector, proxy(that._click , that))
                   .on("keydown" + NS, proxy(that._keydown, that))
                   .on("focus" + NS, proxy(that._focus, that))
                   .on("focus" + NS, ".k-content", proxy(that._focus, that))
                   .on(POINTERDOWN + " " + MOUSEDOWN + NS, ".k-content", proxy(that._preventClose, that))
                   .on("blur" + NS, proxy(that._removeHoverItem, that))
                   .on("blur" + NS, "[tabindex]", proxy(that._checkActiveElement, that))
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
            ACTIVATE,
            DEACTIVATE,
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
            hoverDelay: 100,
            popupCollision: undefined
        },

        _initData: function(options) {
            var that = this;

            if (options.dataSource) {
                that.angular("cleanup", function(){
                    return {
                        elements: that.element.children()
                    };
                });
                that.element.empty();
                that.append(options.dataSource, that.element);
                that.angular("compile", function(){
                    return {
                        elements: that.element.children()
                    };
                });
            }
        },

        setOptions: function(options) {
            var animation = this.options.animation;

            this._animations(options);

            options.animation = extend(true, animation, options.animation);

            if ("dataSource" in options) {
                this._initData(options);
            }

            this._updateClasses();

            Widget.fn.setOptions.call(this, options);
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.element.off(NS);

            if (that._documentClickHandler) {
                $(document).unbind("click", that._documentClickHandler);
            }

            kendo.destroy(that.element);
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

            var inserted = this._insert(item, referenceItem, referenceItem.length ? referenceItem.find("> .k-menu-group, > .k-animation-container > .k-menu-group") : null);

            each(inserted.items, function () {
                inserted.group.append(this);
                updateArrow(this);
            });

            updateArrow(referenceItem);
            updateFirstLast(inserted.group.find(".k-first, .k-last").add(inserted.items));

            return this;
        },

        insertBefore: function (item, referenceItem) {
            referenceItem = this.element.find(referenceItem);

            var inserted = this._insert(item, referenceItem, referenceItem.parent());

            each(inserted.items, function () {
                referenceItem.before(this);
                updateArrow(this);
                updateFirstLast(this);
            });

            updateFirstLast(referenceItem);

            return this;
        },

        insertAfter: function (item, referenceItem) {
            referenceItem = this.element.find(referenceItem);

            var inserted = this._insert(item, referenceItem, referenceItem.parent());

            each(inserted.items, function () {
                referenceItem.after(this);
                updateArrow(this);
                updateFirstLast(this);
            });

            updateFirstLast(referenceItem);

            return this;
        },

        _insert: function (item, referenceItem, parent) {
            var that = this,
                items, groups;

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
                items = $($.map(plain ? [ item ] : item, function (value, idx) {
                            if (typeof value === "string") {
                                return $(value).get();
                            } else {
                                return $(Menu.renderItem({
                                    group: groupData,
                                    item: extend(value, { index: idx })
                                })).get();
                            }
                        }));
            } else {
                if (typeof item == "string" && item.charAt(0) != "<") {
                    items = that.element.find(item);
                } else {
                    items = $(item);
                }

                groups = items.find("> ul")
                                .addClass("k-menu-group")
                                .attr("role", "menu");

                items = items.filter("li");

                items.add(groups.find("> li")).each(function () {
                    updateItemClasses(this);
                });
            }

            return { items: items, group: parent };
        },

        remove: function (element) {
            element = this.element.find(element);

            var that = this,
                parent = element.parentsUntil(that.element, allItemsSelector),
                group = element.parent("ul:not(.k-menu)");

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
                    var ul = li.find(".k-menu-group:first:hidden"),
                        popup;

                    if (ul[0] && that._triggerEvent({ item: li[0], type: OPEN }) === false) {

                        if (!ul.find(".k-menu-group")[0] && ul.children(".k-item").length > 1) {
                            var windowHeight = $(window).height(),
                                setScrolling = function(){
                                    ul.css({maxHeight: windowHeight - (ul.outerHeight() - ul.height()) - kendo.getShadows(ul).bottom, overflow: "auto"});
                                };

                            if (kendo.support.browser.msie && kendo.support.browser.version <= 7) {
                                setTimeout(setScrolling, 0); // timeout required by IE7
                            } else {
                                setScrolling();
                            }
                        } else {
                            ul.css({maxHeight: "", overflow: ""});
                        }

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
                                activate: function() { that._triggerEvent({ item: this.wrapper.parent(), type: ACTIVATE }); },
                                deactivate: function(e) {
                                    e.sender.element // Restore opacity after fade.
                                        .removeData("targetTransform")
                                        .css({ opacity: "" });
                                    that._triggerEvent({ item: this.wrapper.parent(), type: DEACTIVATE });
                                },
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

                                    if (!that._triggerEvent({ item: li[0], type: CLOSE })) {
                                        li.css(ZINDEX, li.data(ZINDEX));
                                        li.removeData(ZINDEX);

                                        if (touch) {
                                            li.removeClass(HOVERSTATE);
                                            that._removeHoverItem();
                                        }
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

        close: function (items, dontClearClose) {
            var that = this,
                element = that.element;

            items = element.find(items);

            if (!items.length) {
                items = element.find(">.k-item");
            }

            items.each(function () {
                var li = $(this);

                if (!dontClearClose && that._isRootItem(li)) {
                    that.clicked = false;
                }

                clearTimeout(li.data(TIMER));

                li.data(TIMER, setTimeout(function () {
                    var popup = li.find(".k-menu-group:not(.k-list-container):not(.k-calendar-container):first:visible").data(KENDOPOPUP);

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
                target.toggleClass(HOVERSTATE, isEnter || e.type == "mousedown" || e.type == "click");
            }

            this._removeHoverItem();
        },

        _preventClose: function() {
            if (!this.options.closeOnClick) {
                this._closurePrevented = true;
            }
        },

        _checkActiveElement: function(e) {
            var that = this,
                hoverItem = $(e ? e.currentTarget : this._hoverItem()),
                target = that._findRootParent(hoverItem)[0];

            if (!this._closurePrevented) {
                setTimeout(function() {
                    if (!document.hasFocus() || (!contains(target, kendo._activeElement()) && e && !contains(target, e.currentTarget))) {
                        that.close(target);
                    }
                }, 0);
            }

            this._closurePrevented = false;
        },

        _removeHoverItem: function() {
            var oldHoverItem = this._hoverItem();

            if (oldHoverItem && oldHoverItem.hasClass(FOCUSEDSTATE)) {
                oldHoverItem.removeClass(FOCUSEDSTATE);
                this._oldHoverItem = null;
            }
        },

        _updateClasses: function() {
            var element = this.element,
                nonContentGroupsSelector = ".k-menu-init div ul",
                items;

            element.removeClass("k-menu-horizontal k-menu-vertical");
            element.addClass("k-widget k-reset k-header k-menu-init " + MENU).addClass(MENU + "-" + this.options.orientation);

            element.find("li > ul")
                   .filter(function() {
                       return !kendo.support.matchesSelector.call(this, nonContentGroupsSelector);
                   })
                   .addClass("k-group k-menu-group")
                   .attr("role", "menu")
                   .attr("aria-hidden", element.is(":visible"))
                   .end()
                   .find("li > div")
                   .addClass("k-content")
                   .attr("tabindex", "-1"); // Capture the focus before the Menu

            items = element.find("> li,.k-menu-group > li");

            element.removeClass("k-menu-init");

            items.each(function () {
                updateItemClasses(this);
            });
        },

        _mouseenter: function (e) {
            var that = this,
                element = $(e.currentTarget),
                hasChildren = (element.children(".k-animation-container").length || element.children(groupSelector).length);

            if (e.delegateTarget != element.parents(menuSelector)[0]) {
                return;
            }

            if ((!that.options.openOnClick || that.clicked) && !touch && !((pointers || msPointers) &&
                e.originalEvent.pointerType in touchPointerTypes && that._isRootItem(element.closest(allItemsSelector)))) {
                if (!contains(e.currentTarget, e.relatedTarget) && hasChildren) {
                    that.open(element);
                }
            }

            if (that.options.openOnClick && that.clicked || mobile) {
                element.siblings().each(proxy(function (_, sibling) {
                    that.close(sibling, true);
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

            if (!that.options.openOnClick && !touch && !((pointers || msPointers) &&
                e.originalEvent.pointerType in touchPointerTypes) &&
                !contains(e.currentTarget, e.relatedTarget || e.target) && hasChildren &&
                !contains(e.currentTarget, kendo._activeElement())) {
                    that.close(element);
            }
        },

        _click: function (e) {
            var that = this, openHandle,
                options = that.options,
                target = $(kendo.eventTarget(e)),
                nodeName = target[0] ? target[0].nodeName.toUpperCase() : "",
                formNode = (nodeName == "INPUT" || nodeName == "SELECT" || nodeName == "BUTTON" || nodeName == "LABEL"),
                link = target.closest("." + LINK),
                element = target.closest(allItemsSelector),
                href = link.attr("href"), childGroup, childGroupVisible,
                targetHref = target.attr("href"),
                sampleHref = $("<a href='#' />").attr("href"),
                isLink = (!!href && href !== sampleHref),
                isLocalLink = isLink && !!href.match(/^#/),
                isTargetLink = (!!targetHref && targetHref !== sampleHref),
                shouldCloseTheRootItem = (options.openOnClick && childGroupVisible && that._isRootItem(element));

            if (target.closest(templateSelector, element[0]).length) {
                return;
            }

            if (element.hasClass(DISABLEDSTATE)) {
                e.preventDefault();
                return;
            }

            if (!e.handled && that._triggerEvent({ item: element[0], type: SELECT }) && !formNode) { // We shouldn't stop propagation and shoudn't prevent form elements.
                e.preventDefault();
            }

            e.handled = true;

            childGroup = element.children(popupSelector);
            childGroupVisible = childGroup.is(":visible");

            if (options.closeOnClick && (!isLink || isLocalLink) && (!childGroup.length || shouldCloseTheRootItem)) {
                element.removeClass(HOVERSTATE).css("height"); // Force refresh for Chrome
                that._oldHoverItem = that._findRootParent(element);
                that.close(link.parentsUntil(that.element, allItemsSelector));
                that.clicked = false;
                if ("MSPointerUp".indexOf(e.type) != -1) {
                    e.preventDefault();
                }
                return;
            }

            if (isLink && e.enterKey) {
                link[0].click();
            }

            if ((!that._isRootItem(element) || !options.openOnClick) && !kendo.support.touch && !((pointers || msPointers) && that._isRootItem(element.closest(allItemsSelector)))) {
                return;
            }

            if (!isLink && !formNode && !isTargetLink) {
                e.preventDefault();
            }

            that.clicked = true;
            openHandle = childGroup.is(":visible") ? CLOSE : OPEN;
            if (!options.closeOnClick && openHandle == CLOSE) {
                return;
            }
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
                hoverItem = that._hoverItem(),
                active = activeElement();

            if (target != that.wrapper[0] && !$(target).is(":kendoFocusable")) {
                e.stopPropagation();
                $(target).closest(".k-content").closest(".k-menu-group").closest(".k-item").addClass(FOCUSEDSTATE);
                that.wrapper.focus();
                return;
            }

            if (active === e.currentTarget) {
                if (hoverItem.length) {
                    that._moveHover([], hoverItem);
                } else if (!that._oldHoverItem) {
                    that._moveHover([], that.wrapper.children().first());
                }
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
                    that._click({ target: target[0], preventDefault: function () {}, enterKey: true });
                    that._moveHover(hoverItem, that._findRootParent(hoverItem));
                }
            } else if (key == keys.TAB) {
                target = that._findRootParent(hoverItem);
                that._moveHover(hoverItem, target);
                that._checkActiveElement();
                return;
            }

            if (target && target[0]) {
                e.preventDefault();
                e.stopPropagation(); // needed to handle ESC in column menu only when a root item is focused
            }
        },

        _hoverItem: function() {
            return this.wrapper.find(".k-item.k-state-hover,.k-item.k-state-focused").filter(":visible");
        },

        _itemBelongsToVertival: function (item) {
            var menuIsVertical = this.wrapper.hasClass("k-menu-vertical");

            if (!item.length) {
                return menuIsVertical;
            }
            return item.parent().hasClass("k-menu-group") || menuIsVertical;
        },

        _itemHasChildren: function (item) {
            if (!item.length) {
                return false;
            }
            return item.children("ul.k-menu-group, div.k-animation-container").length > 0;
        },

        _moveHover: function (item, nextItem) {
            var that = this,
                id = that._ariaId;

            if (item.length && nextItem.length) {
                item.removeClass(FOCUSEDSTATE);
            }

            if (nextItem.length) {
                if (nextItem[0].id) {
                    id = nextItem[0].id;
                }

                nextItem.addClass(FOCUSEDSTATE);
                that._oldHoverItem = nextItem;

                if (id) {
                    that.element.removeAttr("aria-activedescendant");
                    $("#" + id).removeAttr("id");
                    nextItem.attr("id", id);
                    that.element.attr("aria-activedescendant", id);
                }
            }
        },

        _findRootParent: function (item) {
            if (this._isRootItem(item)) {
                return item;
            } else {
                return item.parentsUntil(menuSelector, "li.k-item").last();
            }
        },

        _isRootItem: function (item) {
            return item.parent().hasClass(MENU);
        },

        _itemRight: function (item, belongsToVertical, hasChildren) {
            var that = this,
                nextItem,
                parentItem;

            if (item.hasClass(DISABLEDSTATE)) {
                return;
            }

            if (!belongsToVertical) {
                nextItem = item.nextAll(nextSelector);
                if (!nextItem.length) {
                    nextItem = item.prevAll(lastSelector);
                }
            } else if (hasChildren) {
                that.open(item);
                nextItem = item.find(".k-menu-group").children().first();
            } else if (that.options.orientation == "horizontal") {
                parentItem = that._findRootParent(item);
                that.close(parentItem);
                nextItem = parentItem.nextAll(nextSelector);
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
                nextItem = item.prevAll(nextSelector);
                if (!nextItem.length) {
                    nextItem = item.nextAll(lastSelector);
                }
            } else {
                nextItem = item.parent().closest(".k-item");
                that.close(nextItem);
                if (that._isRootItem(nextItem) && that.options.orientation == "horizontal") {
                    nextItem = nextItem.prevAll(nextSelector);
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
                    nextItem = item.find(".k-menu-group").children().first();
                }
            } else {
                nextItem = item.nextAll(nextSelector);
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
                nextItem = item.prevAll(nextSelector);
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
        },

        _triggerEvent: function(e) {
            var that = this;

            return that.trigger(e.type, { type: e.type, item: e.item });
        },

        _focusHandler: function (e) {
            var that = this,
                item = $(kendo.eventTarget(e)).closest(allItemsSelector);

            setTimeout(function () {
                that._moveHover([], item);
                if (item.children(".k-content")[0]) {
                    item.parent().closest(".k-item").removeClass(FOCUSEDSTATE);
                }
            }, 200);
        },

        _animations: function(options) {
            if (options && ("animation" in options) && !options.animation) {
                options.animation = { open: { effects: {} }, close: { hide: true, effects: {} } };
            }
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
                renderContent: Menu.renderContent,
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

    var ContextMenu = Menu.extend({
        init: function(element, options) {
            var that = this;

            Menu.fn.init.call(that, element, options);

            that.target = $(that.options.target);

            that._popup();
            that._wire();
        },
        options: {
            name: "ContextMenu",
            filter: null,
            showOn: "contextmenu",
            orientation: "vertical",
            alignToAnchor: false,
            target: "body"
        },

        events: [
            OPEN,
            CLOSE,
            ACTIVATE,
            DEACTIVATE,
            SELECT
        ],

        setOptions: function(options) {
            var that = this;

            Menu.fn.setOptions.call(that, options);

            that.target.off(that.showOn + NS, that._showProxy);

            if (that.userEvents) {
                that.userEvents.destroy();
            }

            that.target = $(that.options.target);
            if (options.orientation && that.popup.wrapper[0]) {
                that.popup.element.unwrap();
            }

            that._wire();

            Menu.fn.setOptions.call(this, options);
        },

        destroy: function() {
            var that = this;

            that.target.off(that.options.showOn + NS);
            DOCUMENT_ELEMENT.off(kendo.support.mousedown + NS, that._closeProxy);

            if (that.userEvents) {
                that.userEvents.destroy();
            }

            Menu.fn.destroy.call(that);
        },

        open: function(x, y) {
            var that = this;

            x = $(x)[0];

            if (contains(that.element[0], $(x)[0])) { // call parent open for children elements
                Menu.fn.open.call(that, x);
            } else {
                if (that._triggerEvent({ item: that.element, type: OPEN }) === false) {
                    if (that.popup.visible() && that.options.filter) {
                        that.popup.close(true);
                    }

                    if (y !== undefined) {
                        that.popup.wrapper.hide();
                        that.popup.open(x, y);
                    } else {
                        that.popup.options.anchor = (x ? x : that.popup.anchor) || that.target;
                        that.popup.open();
                    }

                    DOCUMENT_ELEMENT.off(that.popup.downEvent, that.popup._mousedownProxy);
                    DOCUMENT_ELEMENT
                        .on(kendo.support.mousedown + NS, that._closeProxy);
                }
            }

            return that;
        },

        close: function() {
            var that = this;

            if (contains(that.element[0], $(arguments[0])[0])) {
                Menu.fn.close.call(that, arguments[0]);
            } else {
                if (that.popup.visible()) {
                    if (that._triggerEvent({ item: that.element, type: CLOSE }) === false) {
                        that.popup.close();
                        DOCUMENT_ELEMENT.off(kendo.support.mousedown + NS, that._closeProxy);
                        that.unbind(SELECT, that._closeTimeoutProxy);
                    }
                }
            }
        },

        _showHandler: function (e) {
            var ev = e, offset,
                that = this,
                options = that.options;

            if (e.event) {
                ev = e.event;
                ev.pageX = e.x.location;
                ev.pageY = e.y.location;
            }

            if (contains(that.element[0], e.relatedTarget || e.target)) {
                return;
            }

            that._eventOrigin = ev;

            ev.preventDefault();
            ev.stopImmediatePropagation();

            that.element.find("." + FOCUSEDSTATE).removeClass(FOCUSEDSTATE);

            if ((options.filter && kendo.support.matchesSelector.call(ev.currentTarget, options.filter)) || !options.filter) {
                if (options.alignToAnchor) {
                    that.open(ev.currentTarget);
                } else {
                    that.popup.options.anchor = ev.currentTarget;

                    if (that._targetChild) {
                        offset = that.target.offset();
                        that.open(ev.pageX - offset.left, ev.pageY - offset.top);
                    } else {
                        that.open(ev.pageX, ev.pageY);
                    }
                }
            }
        },

        _closeHandler: function (e) {
            var that = this,
				options = that.options,
                target = $(e.relatedTarget || e.target),
				sameTarget = target.closest(that.target.selector)[0] == that.target[0],
                children = target.closest(itemSelector).children(popupSelector),
                containment = contains(that.element[0], target[0]);

            that._eventOrigin = e;

            var normalClick = e.which !== 3;

            if (that.popup.visible() && ((normalClick && sameTarget) || !sameTarget) && ((that.options.closeOnClick && !children[0] && containment) || !containment)) {
                    if (containment) {
                        this.unbind(SELECT, this._closeTimeoutProxy);
                        that.bind(SELECT, that._closeTimeoutProxy);
                    } else {
                        that.close();
                    }
            }
        },

        _wire: function() {
            var that = this,
                options = that.options,
                target = that.target;

            that._showProxy = proxy(that._showHandler, that);
            that._closeProxy = proxy(that._closeHandler, that);
            that._closeTimeoutProxy = proxy(that.close, that);

            if (target[0]) {
                if (kendo.support.mobileOS && options.showOn == "contextmenu") {
                    that.userEvents = new kendo.UserEvents(target, {
                        filter: options.filter,
                        allowSelection: false
                    });

                    target.on(options.showOn + NS, false);
                    that.userEvents.bind("hold", that._showProxy);
                } else {
                    if (options.filter) {
                        target.on(options.showOn + NS, options.filter, that._showProxy);
                    } else {
                        target.on(options.showOn + NS, that._showProxy);
                    }
                }
            }
        },

        _triggerEvent: function(e) {
            var that = this,
                anchor = $(that.popup.options.anchor)[0],
                origin = that._eventOrigin;

            that._eventOrigin = undefined;

            return that.trigger(e.type, extend({ type: e.type, item: e.item || this.element[0], target: anchor }, origin ? { event: origin } : {} ));
        },

        _popup: function() {
            var that = this;

            that._triggerProxy = proxy(that._triggerEvent, that);

            that.popup = that.element
                            .addClass("k-context-menu")
                            .kendoPopup({
                                anchor: that.target || "body",
                                copyAnchorStyles: that.options.copyAnchorStyles,
                                collision: that.options.popupCollision || "fit",
                                animation: that.options.animation,
                                activate: that._triggerProxy,
                                deactivate: that._triggerProxy
                            }).data("kendoPopup");

            that._targetChild = contains(that.target[0], that.popup.element[0]);
        }
    });

    ui.plugin(Menu);
    ui.plugin(ContextMenu);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
