(function(f, define){
    define([ "./kendo.popup" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
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
        DELAY = 30,
        SCROLLSPEED = 50,
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
        MOUSEENTER = pointers ? "pointerenter" : (msPointers ? "MSPointerEnter" : "mouseenter"),
        MOUSELEAVE = pointers ? "pointerleave" : (msPointers ? "MSPointerLeave" : "mouseleave"),
        MOUSEWHEEL = "DOMMouseScroll" + NS + " mousewheel" + NS,
        RESIZE = kendo.support.resize + NS,
        SCROLLWIDTH = "scrollWidth",
        SCROLLHEIGHT = "scrollHeight",
        OFFSETWIDTH = "offsetWidth",
        OFFSETHEIGHT = "offsetHeight",
        POPUP_ID_ATTR = "group",
        POPUP_OPENER_ATTR = "groupparent",
        DOCUMENT_ELEMENT = $(document.documentElement),
        KENDOPOPUP = "kendoPopup",
        DEFAULTSTATE = "k-state-default",
        HOVERSTATE = "k-state-hover",
        FOCUSEDSTATE = "k-state-focused",
        DISABLEDSTATE = "k-state-disabled",
        SELECTEDSTATE = "k-state-selected",
        menuSelector = ".k-menu",
        groupSelector = ".k-menu-group",
        animationContainerSelector = ".k-animation-container",
        popupSelector = groupSelector + "," + animationContainerSelector,
        allItemsSelector = ":not(.k-list) > .k-item",
        disabledSelector = ".k-item.k-state-disabled",
        itemSelector = ".k-item:not(.k-state-disabled)",
        linkSelector = ".k-item:not(.k-state-disabled) > .k-link",
        exclusionSelector = ":not(.k-item.k-separator)",
        nextSelector = exclusionSelector + ":eq(0)",
        lastSelector = exclusionSelector + ":last",
        templateSelector = "div:not(.k-animation-container,.k-list-container)",
        scrollButtonSelector = ".k-menu-scroll-button",
        touchPointerTypes = { "2": 1, "touch": 1 },

        templates = {
            content: template(
                "<div #= contentCssAttributes(item) # tabindex='-1'>#= content(item) #</div>"
            ),
            group: template(
                "<ul class='#= groupCssClass(group) #'#= groupAttributes(group) # role='menu' aria-hidden='true'>" +
                    "#= renderItems(data) #" +
                "</ul>"
            ),
            itemWrapper: template(
                "<#= tag(item) # class='#= textClass(item) #'#= textAttributes(item) #>" +
                    "#= image(data) ##= sprite(item) ##= text(item) #" +
                    "#= arrow(data) #" +
                "</#= tag(item) #>"
            ),
            item: template(
                "<li class='#= wrapperCssClass(group, item) #' #= itemCssAttributes(item) # role='menuitem'  #=item.items ? \"aria-haspopup='true'\": \"\"#" +
                    "#=item.enabled === false ? \"aria-disabled='true'\" : ''#>" +
                    "#= itemWrapper(data) #" +
                    "# if (item.items) { #" +
                    "#= subGroup({ items: item.items, menu: menu, group: { expanded: item.expanded } }) #" +
                    "# } else if (item.content || item.contentUrl) { #" +
                    "#= renderContent(data) #" +
                    "# } #" +
                "</li>"
            ),
            scrollButton: template(
                "<span class='k-button k-button-icon k-menu-scroll-button k-scroll-#= direction #' unselectable='on'>" +
                "<span class='k-icon k-i-arrow-60-#= direction #'></span></span>"
            ),
            image: template("<img #= imageCssAttributes(item) # alt='' src='#= item.imageUrl #' />"), // class='k-image'
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

                if(item.attr && item.attr.hasOwnProperty("class")) {
                    result += " " + item.attr["class"];
                }

                if(item.selected) {
                    result += " " + SELECTEDSTATE;
                }

                return result;
            },

            itemCssAttributes: function (item) {
                var result = "";
                var attributes = item.attr || {};

                for (var attr in attributes) {
                    if(attributes.hasOwnProperty(attr) && attr !== "class") {
                        result += attr + "=\"" + attributes[attr] + "\" ";
                    }
                }

                return result;
            },

            imageCssAttributes: function (item) {
                var result = "";
                var attributes = item.imageAttr || {};

                if (!attributes['class']) {
                    attributes['class'] = IMAGE;
                } else {
                    attributes['class'] += " " + IMAGE;
                }

                for (var attr in attributes) {
                    if(attributes.hasOwnProperty(attr)) {
                        result += attr + "=\"" + attributes[attr] + "\" ";
                    }
                }

                return result;
            },

            contentCssAttributes: function (item) {
                var result = "";
                var attributes = item.contentAttr || {};
                var defaultClasses = "k-content k-group k-menu-group";

                if (!attributes['class']) {
                    attributes['class'] = defaultClasses;
                } else {
                    attributes['class'] += " " + defaultClasses;
                }

                for (var attr in attributes) {
                    if(attributes.hasOwnProperty(attr)) {
                        result += attr + "=\"" + attributes[attr] + "\" ";
                    }
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
                    result += " k-i-arrow-60-down";
                } else {
                    result += " k-i-arrow-60-right";
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
            .filter(".k-separator")
            .empty()
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
                    arrowCssClass = getArrowCssClass(item);

                item.append("<span class='k-icon " + arrowCssClass + "'/>");
            });
    }

    function getArrowCssClass (item) {
        var arrowCssClass,
            parent = item.parent().parent(),
            isRtl = kendo.support.isRtl(parent);

        if (parent.hasClass(MENU + "-horizontal")) {
            arrowCssClass = " k-i-arrow-60-down";
        } else {
            if (isRtl) {
                arrowCssClass = " k-i-arrow-60-left";
            }
            else {
                arrowCssClass = " k-i-arrow-60-right";
            }
        }
        return arrowCssClass;
    }

    function updateFirstLast (item) {
        item = $(item);

        item.filter(".k-first:not(:first-child)").removeClass(FIRST);
        item.filter(".k-last:not(:last-child)").removeClass(LAST);
        item.filter(":first-child").addClass(FIRST);
        item.filter(":last-child").addClass(LAST);
    }

    function storeItemSelectEventHandler (element, options) {
        var selectHandler = getItemSelectEventHandler(options);
        if(selectHandler) {
            setItemData(element, selectHandler);
        }

        if (options.items) {
            $(element).children("ul").children("li").each(function(i){
                storeItemSelectEventHandler(this, options.items[i]);
            });
        }
    }

    function setItemData (element, selectHandler) {
        $(element).children(".k-link").data({
            selectHandler : selectHandler
        });
    }

    function getItemSelectEventHandler (options) {
        var selectHandler = options.select,
            isFunction = kendo.isFunction;

        if (selectHandler && isFunction(selectHandler)) {
            return selectHandler;
        }
        return null;
    }

    function popupOpenerSelector(id){
        return id ? "li[data-groupparent='" + id + "']" : "li[data-groupparent]";
    }
    function popupGroupSelector(id) {
        return id ? "ul[data-group='" + id + "']" : "ul[data-group]";
    }
    function getChildPopups (currentPopup, overflowWrapper) {
        var childPopupOpener = currentPopup.find(popupOpenerSelector());
        var result = [];
        childPopupOpener.each(function(i, opener){
            opener = $(opener);
            var popupId = opener.data(POPUP_OPENER_ATTR);
            var popup = currentPopup;
            while(popupId) {
                popup = overflowWrapper.find(popupGroupSelector(popupId) + ":visible");
                if (popup.length) {
                    result.push(popup);
                }
                opener = popup.find(popupOpenerSelector());
                popupId = opener.data(POPUP_OPENER_ATTR);
            }
        });

        return result;
    }

    function popupParentItem(popupElement, overflowWrapper) {
        var popupId = popupElement.data(POPUP_ID_ATTR);
        return popupId ? overflowWrapper.find(popupOpenerSelector(popupId)) : $([]);
    }

    function itemPopup(item, overflowWrapper) {
        var popupId = item.data(POPUP_OPENER_ATTR);
        return popupId ? overflowWrapper.children(animationContainerSelector).children(popupGroupSelector(popupId)) : $([]);
    }

    function overflowMenuParents(current, overflowWrapper) {
        var parents = [];
        var getParents = function(item){
            while (item.parentNode && !overflowWrapper.is(item.parentNode)) {
                parents.push(item.parentNode);
                item = item.parentNode;
            }
        };
        var elem = current[0] || current;
        getParents(elem);
        var last = parents[parents.length - 1];
        while($(last).is(animationContainerSelector)){
            var popupElement = $(last).children("ul");
            elem = popupParentItem(popupElement, overflowWrapper)[0];
            if (!elem) {
                break;
            }
            parents.push(elem);
            getParents(elem);
            last = parents[parents.length - 1];
        }
        return parents;
    }

    function mousewheelDelta(e) {
        var delta = 0;

        if (e.wheelDelta) {
            delta = -e.wheelDelta / 120;
            delta = delta > 0 ? Math.ceil(delta) : Math.floor(delta);
        }

        if (e.detail) {
            delta = Math.round(e.detail / 3);
        }

        return delta;
    }

    function parentsScroll(current, scrollDirection) {
        var scroll = 0;
        var parent = current.parentNode;
        while(parent && !isNaN(parent[scrollDirection])) {
            scroll += parent[scrollDirection];
            parent = parent.parentNode;
        }
        return scroll;
    }

    function isPointerTouch(e){
        return allPointers && e.originalEvent.pointerType in touchPointerTypes;
    }

    function isTouch(e){
        var ev = e.originalEvent;
        return touch && /touch/i.test(ev.type || "");
    }

    function removeSpacesBetweenItems(ul){
        ul.contents().filter(function(){ return this.nodeName != "LI"; }).remove();
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

            that._initOverflow(options);

            that._attachMenuEventsHandlers();

            if (options.openOnClick) {
                that.clicked = false;
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
            scrollable: false,
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

        _attachMenuEventsHandlers: function() {
            var that = this;
            var element = that.element;
            var options = that.options;
            var overflowWrapper = that._overflowWrapper();

            (overflowWrapper || element).on(POINTERDOWN, itemSelector, proxy(that._focusHandler, that))
                   .on(CLICK + NS, disabledSelector, false)
                   .on(CLICK + NS, itemSelector, proxy(that._click , that))
                   .on(POINTERDOWN + " " + MOUSEDOWN + NS, ".k-content", proxy(that._preventClose, that))
                   .on(MOUSEENTER + NS, itemSelector, proxy(that._mouseenter, that))
                   .on(MOUSELEAVE + NS, itemSelector, proxy(that._mouseleave, that))
                   .on(MOUSEENTER + NS + " " + MOUSELEAVE + NS + " " +
                       MOUSEDOWN + NS + " " + CLICK + NS, linkSelector, proxy(that._toggleHover, that));

            element.on("keydown" + NS, proxy(that._keydown, that))
                   .on("focus" + NS, proxy(that._focus, that))
                   .on("focus" + NS, ".k-content", proxy(that._focus, that))
                   .on("blur" + NS, proxy(that._removeHoverItem, that))
                   .on("blur" + NS, "[tabindex]", proxy(that._checkActiveElement, that));

            if (overflowWrapper) {
                overflowWrapper
                    .on(MOUSELEAVE + NS, popupSelector, proxy(that._mouseleavePopup, that))
                    .on(MOUSEENTER + NS, popupSelector, proxy(that._mouseenterPopup, that));
            }

            if (options.openOnClick) {
                that._documentClickHandler = proxy(that._documentClick, that);
                $(document).click(that._documentClickHandler);
            }
        },

        _detachMenuEventsHandlers: function() {
            var that = this;
            var overflowWrapper = that._overflowWrapper();

            if (overflowWrapper) {
                overflowWrapper.off(NS);
            }

            that.element.off(NS);

            if (that._documentClickHandler) {
                $(document).unbind("click", that._documentClickHandler);
            }
        },

        _initOverflow: function(options) {
            var that = this;
            var isHorizontal = options.orientation == "horizontal";
            var backwardBtn, forwardBtn;

            if (options.scrollable) {
                that._openedPopups = {};
                that._scrollWrapper = that.element.wrap("<div class='k-menu-scroll-wrapper " + options.orientation + "'></div>").parent();
                if (isHorizontal) {
                    removeSpacesBetweenItems(that.element);
                }

                backwardBtn = $(templates.scrollButton({direction: isHorizontal ? "left" : "up"}));
                forwardBtn = $(templates.scrollButton({direction: isHorizontal ? "right": "down"}));
                backwardBtn.add(forwardBtn).appendTo(that._scrollWrapper);

                that._initScrolling(that.element, backwardBtn, forwardBtn, isHorizontal);

                var initialWidth = that.element.outerWidth();
                var initialCssWidth = that.element[0].style.width;
                initialCssWidth = initialCssWidth === "auto" ? "" : initialCssWidth;

                if (isHorizontal) {
                    $(window).on(RESIZE, kendo.throttle(function(){
                        that._setOverflowWrapperWidth(initialWidth, initialCssWidth);
                        that._toggleScrollButtons(that.element, backwardBtn, forwardBtn, isHorizontal);
                    }, 100));
                }

                that._setOverflowWrapperWidth(initialWidth, initialCssWidth);
                that._toggleScrollButtons(that.element, backwardBtn, forwardBtn, isHorizontal);
            }
        },

        _overflowWrapper: function(){
            return this._scrollWrapper || this._popupsWrapper;
        },

        _setOverflowWrapperWidth: function(initialWidth, initialCssWidth) {
            var that = this;
            var wrapperCssWidth = that._scrollWrapper.css("width");

            that._scrollWrapper.css({width: ""});
            var wrapperWidth = that._scrollWrapper.outerWidth();
            that._scrollWrapper.css({ width: wrapperCssWidth });

            var menuWidth = that.element.outerWidth();
            var borders = that.element[0].offsetWidth - that.element[0].clientWidth;

            if (menuWidth != wrapperWidth) {
                var width = initialCssWidth ? Math.min(initialWidth, wrapperWidth) : wrapperWidth;
                that.element.width(width - borders);
                that._scrollWrapper.width(width);
            }
        },

        _reinitOverflow: function(options) {
            var that = this;
            var overflowChanged = ((options.scrollable && !that.options.scrollable) || (!options.scrollable && that.options.scrollable)) ||
                (options.scrollable && that.options.scrollable && options.scrollable.distance != that.options.scrollable.distance) ||
                options.orientation != that.options.orientation;

            if (overflowChanged) {
                that._detachMenuEventsHandlers();
                that._destroyOverflow();
                that._initOverflow(options);
                that._attachMenuEventsHandlers();
            }
        },

        _destroyOverflow: function() {
            var that = this;
            var overflowWrapper = that._overflowWrapper();
            if(overflowWrapper) {
                overflowWrapper.off(NS);
                overflowWrapper.find(scrollButtonSelector).off(NS).remove();
                overflowWrapper.children(animationContainerSelector).each(function(i, popupWrapper){
                    var ul = $(popupWrapper).children(groupSelector);
                    ul.off(MOUSEWHEEL);
                    var popupParentLi = popupParentItem(ul, overflowWrapper);
                    if (popupParentLi.length) {
                        popupParentLi.append(popupWrapper);
                    }
                });

                overflowWrapper.find(popupOpenerSelector()).removeAttr("data-groupparent");
                overflowWrapper.find(popupGroupSelector()).removeAttr("data-group");
                that.element.off(MOUSEWHEEL);
                $(window).off(RESIZE);
                overflowWrapper.contents().unwrap();

                that._scrollWrapper = that._popupsWrapper = that._openedPopups = undefined;
            }
        },

        _initScrolling: function(scrollElement, backwardBtn, forwardBtn, isHorizontal) {
            var that = this;
            var scrollable = that.options.scrollable;
            var distance =  $.isNumeric(scrollable.distance) ? scrollable.distance : SCROLLSPEED;
            var mouseWheelDistance = distance / 2;
            var backward = "-=" + distance;
            var forward = "+=" + distance;
            var backwardDouble = "-=" + distance * 2;
            var forwardDouble = "+=" + distance * 2;
            var scrolling = false;
            var touchEvents = false;

            var scroll = function(value) {
                var scrollValue = isHorizontal ? {"scrollLeft": value} : { "scrollTop": value };
                scrollElement.finish().animate(scrollValue, "fast", "linear", function () {
                    if (scrolling) {
                        scroll(value);
                    }
                });
                that._toggleScrollButtons(scrollElement, backwardBtn, forwardBtn, isHorizontal);
            };

            var mouseenterHandler = function(e) {
                if (!scrolling && !touchEvents) {
                    scroll(e.data.direction);
                    scrolling = true;
                }
            };

            var mousedownHandler = function(e) {
                var scrollValue = isHorizontal ? {"scrollLeft": e.data.direction} : { "scrollTop": e.data.direction };
                touchEvents = isTouch(e) || isPointerTouch(e);
                scrollElement.stop().animate(scrollValue, "fast", "linear", function(){
                    if (!touchEvents) {
                        $(e.currentTarget).trigger(MOUSEENTER);
                    } else {
                         that._toggleScrollButtons(scrollElement, backwardBtn, forwardBtn, isHorizontal);
                         scrolling = true;
                    }
                });
                scrolling = false;

                e.stopPropagation();
                e.preventDefault();
            };

            backwardBtn.on(MOUSEENTER + NS, {direction: backward}, mouseenterHandler)
                .on(kendo.eventMap.down + NS, {direction: backwardDouble}, mousedownHandler);

            forwardBtn.on(MOUSEENTER + NS, {direction: forward}, mouseenterHandler)
                .on(kendo.eventMap.down + NS, {direction: forwardDouble}, mousedownHandler);

            backwardBtn.add(forwardBtn)
                .on(MOUSELEAVE + NS, function() {
                    scrollElement.stop();
                    scrolling = false;
                    that._toggleScrollButtons(scrollElement, backwardBtn, forwardBtn, isHorizontal);
                });

            scrollElement.on(MOUSEWHEEL, function(e){
                if (!e.ctrlKey && !e.shiftKey && !e.altKey) {
                    var wheelDelta = mousewheelDelta(e.originalEvent);
                    var scrollSpeed = Math.abs(wheelDelta) * mouseWheelDistance;
                    var value = (wheelDelta > 0 ? "+=" : "-=") + scrollSpeed;
                    var scrollValue = isHorizontal ? {"scrollLeft": value} : {"scrollTop": value };

                    that._closeChildPopups(scrollElement);

                    scrollElement.finish().animate(scrollValue, "fast", "linear", function(){
                        that._toggleScrollButtons(scrollElement, backwardBtn, forwardBtn, isHorizontal);
                    });
                    e.preventDefault();
                }
            });
        },

        _toggleScrollButtons: function(scrollElement, backwardBtn, forwardBtn, horizontal) {
            var currentScroll = horizontal ? scrollElement.scrollLeft() : scrollElement.scrollTop();
            var scrollSize = horizontal ? SCROLLWIDTH : SCROLLHEIGHT;
            var offset = horizontal ? OFFSETWIDTH : OFFSETHEIGHT;

            backwardBtn.toggle(currentScroll !== 0);
            forwardBtn.toggle(currentScroll < scrollElement[0][scrollSize] - scrollElement[0][offset] - 1);
        },

        setOptions: function(options) {
            var animation = this.options.animation;

            this._animations(options);

            options.animation = extend(true, animation, options.animation);

            if ("dataSource" in options) {
                this._initData(options);
            }

            this._updateClasses();
            this._reinitOverflow(options);

            Widget.fn.setOptions.call(this, options);
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that._detachMenuEventsHandlers();

            that._destroyOverflow();

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

            each(inserted.items, function (i) {
                inserted.group.append(this);
                updateArrow(this);
                storeItemSelectEventHandler(this, item[i] || item);
            });

            updateArrow(referenceItem);
            updateFirstLast(inserted.group.find(".k-first, .k-last").add(inserted.items));

            return this;
        },

        insertBefore: function (item, referenceItem) {
            referenceItem = this.element.find(referenceItem);

            var inserted = this._insert(item, referenceItem, referenceItem.parent());

            each(inserted.items, function (i) {
                referenceItem.before(this);
                updateArrow(this);
                updateFirstLast(this);
                storeItemSelectEventHandler(this, item[i] || item);
            });

            updateFirstLast(referenceItem);

            return this;
        },

        insertAfter: function (item, referenceItem) {
            referenceItem = this.element.find(referenceItem);

            var inserted = this._insert(item, referenceItem, referenceItem.parent());

            each(inserted.items, function (i) {
                referenceItem.after(this);
                updateArrow(this);
                updateFirstLast(this);
                storeItemSelectEventHandler(this, item[i] || item);
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
                var container = group.parent(animationContainerSelector);
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
            var that = this;
            var options = that.options;
            var horizontal = options.orientation == "horizontal";
            var direction = options.direction;
            var isRtl = kendo.support.isRtl(that.wrapper);
            var overflowWrapper = that._overflowWrapper();
            element = (overflowWrapper || that.element).find(element);

            if (/^(top|bottom|default)$/.test(direction)) {
                if (isRtl) {
                    direction = horizontal ? (direction + " left").replace("default", "bottom") : "left";
                } else {
                    direction = horizontal ? (direction + " right").replace("default", "bottom") : "right";
                }
            }

            var visiblePopups = ">.k-popup:visible,>.k-animation-container>.k-popup:visible";
            var closePopup = function () {
                var popup = $(this).data(KENDOPOPUP);
                if (popup) {
                    popup.close(true);
                }
            };

            element.siblings()
                   .find(visiblePopups)
                   .each(closePopup);

            if (overflowWrapper) {
                element.find(visiblePopups).each(closePopup);
                overflowWrapper.find("." + FOCUSEDSTATE).removeClass(FOCUSEDSTATE);
            }

            element.each(function () {
                var li = $(this);

                clearTimeout(li.data(TIMER));

                li.data(TIMER, setTimeout(function () {
                    var ul = li.find(".k-menu-group:first:hidden");
                    var popup;
                    var overflowPopup;

                    if  (!ul[0] && overflowWrapper) {
                        overflowPopup = that._getPopup(li);
                        ul = overflowPopup && overflowPopup.element;
                    }
                    if (ul.is(":visible")) {
                        return;
                    }

                    if (ul[0] && that._triggerEvent({ item: li[0], type: OPEN }) === false) {

                        if (!ul.find(".k-menu-group")[0] && ul.children(".k-item").length > 1) {
                            var windowHeight = $(window).height(),
                                setScrolling = function(){
                                    ul.css({maxHeight: windowHeight - (kendo._outerHeight(ul) - ul.height()) - kendo.getShadows(ul).bottom, overflow: "auto"});
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
                        var nextZindex = that.nextItemZIndex++;
                        li.css(ZINDEX, nextZindex);

                        if (that.options.scrollable) {
                            li.parent().siblings(scrollButtonSelector).css({zIndex: ++nextZindex});
                        }

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
                                appendTo: overflowWrapper || li,
                                animation: {
                                    open: extend(true, { effects: openEffects }, options.animation.open),
                                    close: options.animation.close
                                },
                                open: proxy(that._popupOpen, that),
                                close: function (e) {
                                    var li = e.sender.wrapper.parent();

                                    if (overflowWrapper) {
                                        var popupId = e.sender.element.data(POPUP_ID_ATTR);
                                        if (popupId) {
                                            li = (overflowWrapper || that.element).find(popupOpenerSelector(popupId));
                                        }
                                        e.sender.wrapper.children(scrollButtonSelector).hide();
                                    }

                                    if (!that._triggerEvent({ item: li[0], type: CLOSE })) {
                                        li.css(ZINDEX, li.data(ZINDEX));
                                        li.removeData(ZINDEX);

                                        if (that.options.scrollable) {
                                            li.parent().siblings(scrollButtonSelector).css({zIndex: ""});
                                        }

                                        if (touch || allPointers) {
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

                        that._configurePopupOverflow(popup, li);

                        popup.open();

                        that._initPopupScrolling(popup);
                    }

                }, that.options.hoverDelay));
            });

            return that;
        },

        _configurePopupOverflow: function(popup, popupOpener) {
            var that = this;
           if (that.options.scrollable) {
                that._wrapPopupElement(popup);
                if (!popupOpener.attr("data-groupparent")) {
                    var groupId = new Date().getTime();
                    popupOpener.attr("data-groupparent", groupId);
                    popup.element.attr("data-group", groupId);
                }
           }
        },

        _wrapPopupElement: function(popup){
            if (!popup.element.parent().is(animationContainerSelector)) {
                popup.wrapper = kendo.wrap(popup.element, popup.options.autosize)
                    .css({
                        overflow: "hidden",
                        display: "block",
                        position: "absolute"
                    });
            }
        },

        _initPopupScrolling: function(popup, isHorizontal, skipMouseEvents) {
            var that = this;

            if (that.options.scrollable && popup.element[0].scrollHeight > popup.element[0].offsetHeight) {
                that._initPopupScrollButtons(popup, isHorizontal, skipMouseEvents);
            }
        },

        _initPopupScrollButtons: function(popup, isHorizontal, skipMouseEvents) {
            var that = this;
            var scrollButtons = popup.wrapper.children(scrollButtonSelector);
            var animation = that.options.animation;
            var timeout = ((animation && animation.open && animation.open.duration) || 0) + DELAY;
            setTimeout(function() {
                if (!scrollButtons.length) {
                    var backwardBtn = $(templates.scrollButton({direction: isHorizontal ? "left" : "up"}));
                    var forwardBtn = $(templates.scrollButton({direction: isHorizontal ? "right": "down"}));

                    scrollButtons = backwardBtn.add(forwardBtn).appendTo(popup.wrapper);

                    that._initScrolling(popup.element, backwardBtn, forwardBtn, isHorizontal);
                    if (!skipMouseEvents) {
                        scrollButtons.on(MOUSEENTER + NS, function() {
                            var overflowWrapper = that._overflowWrapper();
                            $(getChildPopups(popup.element, overflowWrapper)).each(function(i, p){
                                var popupOpener = overflowWrapper.find(popupOpenerSelector(p.data(POPUP_ID_ATTR)));
                                that.close(popupOpener);
                            });
                        })
                        .on(MOUSELEAVE + NS, function(){
                            setTimeout(function(){
                                if ($.isEmptyObject(that._openedPopups)) {
                                    that._closeParentPopups(popup.element);
                                }
                            }, DELAY);
                        });
                    }
                }
                that._toggleScrollButtons(popup.element, scrollButtons.first(), scrollButtons.last(), isHorizontal);
            }, timeout);
        },

        _popupOpen: function(e) {
            if (this.options.scrollable) {
                this._setPopupHeight(e.sender);
            }
        },

        _setPopupHeight: function(popup, isFixed){
            var popupElement = popup.element;
            var popups = popupElement.add(popupElement.parent(animationContainerSelector));

            popups.height((popupElement.hasClass(MENU) && this._initialHeight) || "");

            var location = popup._location(isFixed);
            var windowHeight = $(window).height();
            var popupOuterHeight = location.height;
            var popupOffsetTop = isFixed ? 0 : Math.max(location.top, 0);
            var scrollTop = isFixed ? 0 : parentsScroll(this._overflowWrapper()[0], "scrollTop");
            var bottomScrollbar = window.innerHeight - windowHeight;
            var maxHeight = windowHeight - kendo.getShadows(popupElement).bottom + bottomScrollbar;
            var canFit = maxHeight + scrollTop > popupOuterHeight + popupOffsetTop;

            if (!canFit) {
                var height = Math.min(maxHeight, maxHeight - popupOffsetTop + scrollTop);
                popups.css({overflow: "hidden", height: height + "px"});
            }
        },

        close: function (items, dontClearClose) {
            var that = this;
            var overflowWrapper = that._overflowWrapper();
            var element = (overflowWrapper || that.element);

            items = element.find(items);

            if (!items.length) {
                items = element.find(">.k-item");
            }

            var hasChildPopupsHovered = function(currentPopup){
                var result = false;
                if ($.isEmptyObject(that._openedPopups)) {
                    return result;
                }
                $(getChildPopups(currentPopup, overflowWrapper)).each(function(i, popup){
                    result = !!that._openedPopups[popup.data(POPUP_ID_ATTR).toString()];
                    return !result;
                });
                return result;
            };

            var isPopupMouseLeaved = function(opener) {
                var groupId = opener.data(POPUP_OPENER_ATTR);
                return (!overflowWrapper || !groupId || !that._openedPopups[groupId.toString()]);
            };

            items.each(function () {
                var li = $(this);

                if (!dontClearClose && that._isRootItem(li)) {
                    that.clicked = false;
                }

                clearTimeout(li.data(TIMER));

                li.data(TIMER, setTimeout(function () {
                    var popup = that._getPopup(li);
                    if (popup && (isPopupMouseLeaved(li) || that._forceClose)) {
                        if (!that._forceClose && hasChildPopupsHovered(popup.element)) {
                            return;
                        }

                        popup.close();
                        popup.element.attr("aria-hidden", true);

                        if (overflowWrapper) {
                            if (that._forceClose && items.last().is(li[0])) {
                                delete that._forceClose;
                            }
                        }
                    }
                }, that.options.hoverDelay));
            });

            return that;
        },

        _getPopup: function(li) {
            var that = this;
            var popup = li.find(".k-menu-group:not(.k-list-container):not(.k-calendar-container):first:visible").data(KENDOPOPUP);
            var overflowWrapper = that._overflowWrapper();

            if (!popup && overflowWrapper) {
                var groupId = li.data(POPUP_OPENER_ATTR);
                if (groupId) {
                    var popupElement = overflowWrapper.find(popupGroupSelector(groupId));
                    popup = popupElement.data(KENDOPOPUP);
                }
            }
            return popup;
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
            var that = this;
            var element = $(e.currentTarget);
            var hasChildren = that._itemHasChildren(element);
            var popupId = element.data(POPUP_OPENER_ATTR) || element.parent().data(POPUP_ID_ATTR);
            var pointerTouch = isPointerTouch(e);

            if (popupId) {
                that._openedPopups[popupId.toString()] = true;
            }

            if (e.delegateTarget != element.parents(menuSelector)[0] && e.delegateTarget != element.parents(".k-menu-scroll-wrapper,.k-popups-wrapper")[0]) {
                return;
            }

            if ((!that.options.openOnClick || that.clicked) && !touch &&
                !(pointerTouch && that._isRootItem(element.closest(allItemsSelector)))) {
                if (!contains(e.currentTarget, e.relatedTarget) && hasChildren) {
                    that.open(element);
                }
            }

            if (that.options.openOnClick && that.clicked || touch) {
                element.siblings().each(proxy(function (_, sibling) {
                    that.close(sibling, true);
                }, that));
            }
        },

        _mouseleave: function (e) {
            var that = this;
            var element = $(e.currentTarget);
            var popupOpener = element.data(POPUP_OPENER_ATTR);
            var hasChildren = (element.children(animationContainerSelector).length || element.children(groupSelector).length) || popupOpener;
            var $window = $(window);

            if (popupOpener) {
                delete that._openedPopups[popupOpener.toString()];
            }

            if (element.parentsUntil(animationContainerSelector, ".k-list-container,.k-calendar-container")[0]) {
                e.stopImmediatePropagation();
                return;
            }

            if (!that.options.openOnClick && !touch && !isPointerTouch(e) &&
                !contains(e.currentTarget, e.relatedTarget || e.target) && hasChildren &&
                !contains(e.currentTarget, kendo._activeElement())) {
                    that.close(element);
                    return;
            }

            // Detect if cursor goes outside the viewport of the browser
            if( (!e.toElement && !e.relatedTarget) ||
                e.clientX < 0 || e.clientY < 0 ||
                e.clientY > $window.height() ||
                e.clientX > $window.width()){
                that.close(element);
            }
        },

        _mouseenterPopup: function(e){
            var that = this;
            var popupElement = $(e.currentTarget);

            if (popupElement.parent().is(animationContainerSelector)) {
                 return;
            }

            popupElement = popupElement.children("ul");
            var popupId = popupElement.data(POPUP_ID_ATTR);

            if (popupId) {
                that._openedPopups[popupId.toString()] = true;
            }
        },

        _mouseleavePopup: function (e) {
            var that = this;
            var popupElement = $(e.currentTarget);

            if (!isPointerTouch(e) && popupElement.is(animationContainerSelector)) {
                that._closePopups(popupElement.children("ul"));
            }
        },

        _closePopups: function(rootPopup) {
            var that = this;
            var overflowWrapper = that._overflowWrapper();
            var popupId = rootPopup.data(POPUP_ID_ATTR);

            if (popupId) {
                delete that._openedPopups[popupId.toString()];
                var groupParent = overflowWrapper.find(popupOpenerSelector(popupId));

                setTimeout(function() {
                    if (that.options.openOnClick) {
                        that._closeChildPopups(rootPopup);
                    } else {
                        if ($.isEmptyObject(that._openedPopups)) {
                            var innerPopup = that._innerPopup(rootPopup);
                            that._closeParentPopups(innerPopup);
                        } else {
                            that.close(groupParent, true);
                        }
                    }
                }, 0);
            }
        },

        _closeChildPopups: function(current){
            var that = this;
            var overflowWrapper = that._overflowWrapper();
            $(getChildPopups(current, overflowWrapper)).each(function(){
                var popupOpener = overflowWrapper.find(popupOpenerSelector(this.data(POPUP_ID_ATTR)));
                that.close(popupOpener, true);
            });
        },

        _innerPopup: function(current) {
            var overflowWrapper = this._overflowWrapper();
            var popups = getChildPopups(current, overflowWrapper);
            return popups[popups.length - 1] || current;
        },

        _closeParentPopups: function (current) {
            var that = this;
            var overflowWrapper = that._overflowWrapper();
            var popupId = current.data(POPUP_ID_ATTR);
            var popupOpener = overflowWrapper.find(popupOpenerSelector(popupId));
            popupId = popupOpener.parent().data(POPUP_ID_ATTR);
            that.close(popupOpener, true);
            while (popupId && !that._openedPopups[popupId]) {
                if (popupOpener.parent().is(menuSelector)) {
                    break;
                }
                popupOpener = overflowWrapper.find(popupOpenerSelector(popupId));
                that.close(popupOpener, true);
                popupId = popupOpener.parent().data(POPUP_ID_ATTR);
            }
        },

        _click: function (e) {
            var that = this, openHandle,
                options = that.options,
                target = $(kendo.eventTarget(e)),
                targetElement = target[0],
                nodeName = target[0] ? target[0].nodeName.toUpperCase() : "",
                formNode = (nodeName == "INPUT" || nodeName == "SELECT" || nodeName == "BUTTON" || nodeName == "LABEL"),
                link = target.closest("." + LINK),
                element = target.closest(allItemsSelector),
                itemElement = element[0],
                href = link.attr("href"), childGroup, childGroupVisible,
                targetHref = target.attr("href"),
                sampleHref = $("<a href='#' />").attr("href"),
                isLink = (!!href && href !== sampleHref),
                isLocalLink = isLink && !!href.match(/^#/),
                isTargetLink = (!!targetHref && targetHref !== sampleHref),
                overflowWrapper = that._overflowWrapper(),
                shouldCloseTheRootItem;

            while (targetElement && targetElement.parentNode != itemElement) {
                targetElement = targetElement.parentNode;
            }

            if ($(targetElement).is(templateSelector)) {
                return;
            }

            if (element.hasClass(DISABLEDSTATE)) {
                e.preventDefault();
                return;
            }

            if (!e.handled && that._triggerSelect(target, itemElement) && !formNode) { // We shouldn't stop propagation and shoudn't prevent form elements.
                e.preventDefault();
            }

            e.handled = true;

            childGroup = element.children(popupSelector);
            if (overflowWrapper) {
                var childPopupId = element.data(POPUP_OPENER_ATTR);
                if (childPopupId) {
                    childGroup = overflowWrapper.find(popupGroupSelector(childPopupId));
                }
            }
            childGroupVisible = childGroup.is(":visible");
            shouldCloseTheRootItem = options.openOnClick && childGroupVisible && that._isRootItem(element);

            if (options.closeOnClick && (!isLink || isLocalLink) && (!childGroup.length || shouldCloseTheRootItem)) {
                element.removeClass(HOVERSTATE).css("height"); // Force refresh for Chrome
                that._oldHoverItem = that._findRootParent(element);
                var item = that._parentsUntil(link, that.element, allItemsSelector);
                that._forceClose = !!overflowWrapper;
                that.close(item);
                that.clicked = false;
                if ("MSPointerUp".indexOf(e.type) != -1) {
                    e.preventDefault();
                }
                return;
            }

            if (isLink && e.enterKey) {
                link[0].click();
            }

            if ((!that._isRootItem(element) || !options.openOnClick) && !kendo.support.touch && !(allPointers && that._isRootItem(element.closest(allItemsSelector)))) {
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

        _parentsUntil: function(context, top, selector) {
            var overflowWrapper = this._overflowWrapper();
            if (!overflowWrapper) {
                return context.parentsUntil(top, selector);
            } else {
                var parents = overflowMenuParents(context, overflowWrapper);
                var result = [];
                $(parents).each(function(){
                    var parent = $(this);
                    if (parent.is(top)) {
                        return false;
                    }
                    if (parent.is(selector)) {
                        result.push(this);
                    }
                });
                return $(result);
            }
        },

        _triggerSelect: function (target, itemElement) {
            var selectHandler = target.data("selectHandler"),
                itemSelectEventData;

            if (selectHandler) {
                itemSelectEventData = this._getEventData(target);
                selectHandler.call(this, itemSelectEventData);
            }

            var isSelectItemDefaultPrevented = itemSelectEventData && itemSelectEventData.isDefaultPrevented();
            var isSelectDefaultPrevented = this._triggerEvent({ item: itemElement, type: SELECT });
            return isSelectItemDefaultPrevented || isSelectDefaultPrevented;
        },

        _getEventData: function (target) {
            var eventData = {
                sender: this,
                target: target,
                _defaultPrevented: false,
                preventDefault: function () {
                    this._defaultPrevented = true;
                },
                isDefaultPrevented: function () {
                    return this._defaultPrevented;
                }
            };
            return eventData;
        },

        _documentClick: function (e) {
            var that = this;

            if (contains((that._overflowWrapper() || that.element)[0], e.target)) {
                return;
            }

            that.clicked = false;
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
            if (!item || !item.length || !item[0].nodeType) {
                return false;
            }
            return item.children("ul.k-menu-group, div.k-animation-container").length > 0 ||
                (!!item.data(POPUP_OPENER_ATTR) && !!this._overflowWrapper().children(popupGroupSelector(item.data(POPUP_OPENER_ATTR))));
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
                that._scrollToItem(nextItem);
            }
        },

        _findRootParent: function (item) {
            if (this._isRootItem(item)) {
                return item;
            } else {
                return this._parentsUntil(item, menuSelector, "li.k-item").last();
            }
        },

        _isRootItem: function (item) {
            return item.parent().hasClass(MENU);
        },

        _itemRight: function (item, belongsToVertical, hasChildren) {
            var that = this,
                nextItem,
                parentItem,
                overflowWrapper;

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
                nextItem = that._childPopupElement(item).children().first();
            } else if (that.options.orientation == "horizontal") {
                parentItem = that._findRootParent(item);
                overflowWrapper = that._overflowWrapper();
                if (overflowWrapper) {
                    var rootPopup = itemPopup(parentItem, overflowWrapper);
                    that._closeChildPopups(rootPopup);
                }
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
                nextItem,
                overflowWrapper;

            if (!belongsToVertical) {
                nextItem = item.prevAll(nextSelector);
                if (!nextItem.length) {
                    nextItem = item.nextAll(lastSelector);
                }
            } else {
                nextItem = item.parent().closest(".k-item");
                overflowWrapper = that._overflowWrapper();
                if (!nextItem.length && overflowWrapper) {
                    nextItem = popupParentItem(item.parent(), overflowWrapper);
                }
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
                    nextItem = that._childPopupElement(item).children().first();
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

        _scrollToItem: function(item){
            var that = this;
            if (that.options.scrollable && item && item.length) {
                var ul = item.parent();
                var isHorizontal = ul.hasClass(MENU) ? that.options.orientation == "horizontal" : false;
                var scrollDir = isHorizontal ? "scrollLeft" : "scrollTop";
                var getSize = isHorizontal ? kendo._outerWidth : kendo._outerHeight;
                var currentScrollOffset = ul[scrollDir]();
                var itemSize = getSize(item);
                var itemOffset = item[0][isHorizontal ? "offsetLeft" : "offsetTop"];
                var ulSize = getSize(ul);
                var scrollButtons = ul.siblings(scrollButtonSelector);
                var scrollButtonSize = scrollButtons.length ? getSize(scrollButtons.first()) : 0;
                var itemPosition;

                if (currentScrollOffset + ulSize < itemOffset + itemSize + scrollButtonSize) {
                    itemPosition = itemOffset + itemSize - ulSize + scrollButtonSize;
                } else if (currentScrollOffset > itemOffset - scrollButtonSize) {
                    itemPosition = itemOffset - scrollButtonSize;
                }

                if (!isNaN(itemPosition)) {
                    var scrolling = {};
                    scrolling[scrollDir] = itemPosition;
                    ul.finish().animate(scrolling, "fast", "linear", function () {
                        that._toggleScrollButtons(ul, scrollButtons.first(), scrollButtons.last(), isHorizontal);
                    });
                }
            }
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

        _childPopupElement: function(item) {
            var popupElement = item.find(".k-menu-group");
            var wrapper = this._overflowWrapper();
            if (!popupElement.length && wrapper) {
                popupElement = itemPopup(item, wrapper);
            }
            return popupElement;
        },

        _triggerEvent: function(e) {
            var that = this;

            return that.trigger(e.type, { type: e.type, item: e.item });
        },

        _focusHandler: function (e) {
            var that = this,
                item = $(kendo.eventTarget(e)).closest(allItemsSelector);

            if (item.hasClass(DISABLEDSTATE)) {
                return;
            }

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

            that._marker = kendo.guid().substring(0, 8);

            that.target = $(that.options.target);

            that._popup();
            that._wire();
        },

        _initOverflow: function(options){
            var that = this;
            if (options.scrollable && !that._overflowWrapper()) {
                that._openedPopups = {};

                that._popupsWrapper = (that.element.parent().is(animationContainerSelector) ? that.element.parent() : that.element)
                    .wrap("<div class='k-popups-wrapper " + options.orientation + "'></div>").parent();

                if (that.options.orientation == "horizontal") {
                    removeSpacesBetweenItems(that.element);
                }

                if (options.appendTo) {
                    options.appendTo.append(that._popupsWrapper);
                }

                that._initialHeight = that.element[0].style.height;
                that._initialWidth = that.element[0].style.width;
            }
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

            that.target.off(that.showOn + NS + that._marker, that._showProxy);

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

            that.target.off(that.options.showOn + NS + that._marker);
            DOCUMENT_ELEMENT.off(kendo.support.mousedown + NS + that._marker, that._closeProxy);

            if (that.userEvents) {
                that.userEvents.destroy();
            }

            Menu.fn.destroy.call(that);
        },

        open: function(x, y) {
            var that = this;

            x = $(x)[0];

            if (contains(that.element[0], $(x)[0]) || that._itemHasChildren($(x))) { // call parent open for children elements
                Menu.fn.open.call(that, x);
            } else {
                if (that._triggerEvent({ item: that.element, type: OPEN }) === false) {
                    if (that.popup.visible() && that.options.filter) {
                        that.popup.close(true);
                        that.popup.element.kendoStop(true);
                    }

                    if (y !== undefined) {
                        var overflowWrapper = that._overflowWrapper();
                        if (overflowWrapper) {
                            var offset = overflowWrapper.offset();
                            x -= offset.left;
                            y -= offset.top;
                        }
                        that.popup.wrapper.hide();
                        that._configurePopupScrolling(x, y);
                        that.popup.open(x, y);
                    } else {
                        that.popup.options.anchor = (x ? x : that.popup.anchor) || that.target;
                        that.popup.element.kendoStop(true);
                        that._configurePopupScrolling();
                        that.popup.open();
                    }

                    DOCUMENT_ELEMENT.off(that.popup.downEvent, that.popup._mousedownProxy);
                    DOCUMENT_ELEMENT
                        .on(kendo.support.mousedown + NS + that._marker, that._closeProxy);
                }
            }

            return that;
        },

        _configurePopupScrolling: function(x, y){
            var that = this;
            var popup = that.popup;
            var isHorizontal = that.options.orientation == "horizontal";

            if (that.options.scrollable) {
                that._wrapPopupElement(popup);

                popup.element.parent().css({
                    position: "",
                    height: ""
                });

                popup.element.css({
                    visibility: "hidden",
                    display: "",
                    position: ""
                });

                if (isHorizontal) {
                    that._setPopupWidth(popup, isNaN(x) ? undefined : {isFixed: true, x: x, y: y});
                } else {
                    that._setPopupHeight(popup, isNaN(x) ? undefined : {isFixed: true, x: x, y: y});
                }

                popup.element.css({
                    visibility: "",
                    display: "none",
                    position: "absolute"
                });

                that._initPopupScrollButtons(popup, isHorizontal, true);
                popup.element.siblings(scrollButtonSelector).hide();
            }
        },

        _setPopupWidth: function(popup, isFixed){
            var popupElement = popup.element;
            var popups = popupElement.add(popupElement.parent(animationContainerSelector));

            popups.width(this._initialWidth || "");

            var location = popup._location(isFixed);
            var windowWidth = $(window).width();
            var popupOuterWidth = location.width;
            var popupOffsetLeft = Math.max(location.left, 0);
            var scrollLeft = isFixed ? 0 : parentsScroll(this._overflowWrapper()[0], "scrollLeft");
            var shadow = kendo.getShadows(popupElement);
            var maxWidth = windowWidth - shadow.left - shadow.right;
            var canFit = maxWidth + scrollLeft > popupOuterWidth + popupOffsetLeft;

            if (!canFit) {
                popups.css({overflow: "hidden", width: (maxWidth - popupOffsetLeft + scrollLeft) + "px"});
            }
        },

        close: function() {
            var that = this;

            if (contains(that.element[0], $(arguments[0])[0]) || that._itemHasChildren(arguments[0])) {
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
                    that.popup.options.anchor = ev.currentTarget;
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
                target = $(e.relatedTarget || e.target),
                sameTarget = target.closest(that.target.selector)[0] == that.target[0],
                item = target.closest(itemSelector),
                children = that._itemHasChildren(item),
                overflowWrapper = that._overflowWrapper(),
                containment = contains(that.element[0], target[0]) || (overflowWrapper && contains(overflowWrapper[0], target[0]));

            that._eventOrigin = e;

            var normalClick = e.which !== 3;

            if (that.popup.visible() && ((normalClick && sameTarget) || !sameTarget) && ((that.options.closeOnClick && !children && containment) || !containment)) {
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

                    target.on(options.showOn + NS + that._marker, false);
                    that.userEvents.bind("hold", that._showProxy);
                } else {
                    if (options.filter) {
                        target.on(options.showOn + NS + that._marker, options.filter, that._showProxy);
                    } else {
                        target.on(options.showOn + NS + that._marker, that._showProxy);
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
            var overflowWrapper = that._overflowWrapper();

            that._triggerProxy = proxy(that._triggerEvent, that);

            that.popup = that.element
                            .addClass("k-context-menu")
                            .kendoPopup({
                                anchor: that.target || "body",
                                copyAnchorStyles: that.options.copyAnchorStyles,
                                collision: that.options.popupCollision || "fit",
                                animation: that.options.animation,
                                activate: that._triggerProxy,
                                deactivate: that._triggerProxy,
                                appendTo: overflowWrapper || that.options.appendTo,
                                close: !overflowWrapper ? $.noop : function(e) {
                                    $(getChildPopups(e.sender.element, overflowWrapper)).each(function(i, p) {
                                        var popup = p.data(KENDOPOPUP);
                                        if (popup) {
                                            popup.close(true);
                                        }
                                    });
                                }
                            }).data(KENDOPOPUP);

            that._targetChild = contains(that.target[0], that.popup.element[0]);
        }
    });

    ui.plugin(Menu);
    ui.plugin(ContextMenu);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
