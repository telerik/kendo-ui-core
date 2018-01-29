(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "popup",
    name: "Pop-up",
    category: "framework",
    depends: [ "core" ],
    advanced: true
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        Class = kendo.Class,
        support = kendo.support,
        getOffset = kendo.getOffset,
        outerWidth = kendo._outerWidth,
        outerHeight = kendo._outerHeight,
        OPEN = "open",
        CLOSE = "close",
        DEACTIVATE = "deactivate",
        ACTIVATE = "activate",
        CENTER = "center",
        LEFT = "left",
        RIGHT = "right",
        TOP = "top",
        BOTTOM = "bottom",
        ABSOLUTE = "absolute",
        HIDDEN = "hidden",
        BODY = "body",
        LOCATION = "location",
        POSITION = "position",
        VISIBLE = "visible",
        EFFECTS = "effects",
        ACTIVE = "k-state-active",
        ACTIVEBORDER = "k-state-border",
        ACTIVEBORDERREGEXP = /k-state-border-(\w+)/,
        ACTIVECHILDREN = ".k-picker-wrap, .k-dropdown-wrap, .k-link",
        MOUSEDOWN = "down",
        DOCUMENT_ELEMENT = $(document.documentElement),
        proxy = $.proxy,
        WINDOW = $(window),
        SCROLL = "scroll",
        cssPrefix = support.transitions.css,
        TRANSFORM = cssPrefix + "transform",
        extend = $.extend,
        NS = ".kendoPopup",
        styles = ["font-size",
                  "font-family",
                  "font-stretch",
                  "font-style",
                  "font-weight",
                  "line-height"];

    function contains(container, target) {
        if (!container || !target) {
            return false;
        }
        return container === target || $.contains(container, target);
    }

    var Popup = Widget.extend({
        init: function(element, options) {
            var that = this, parentPopup;

            options = options || {};

            if (options.isRtl) {
                options.origin = options.origin || BOTTOM + " " + RIGHT;
                options.position = options.position || TOP + " " + RIGHT;
            }

            Widget.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            that.collisions = options.collision ? options.collision.split(" ") : [];
            that.downEvent = kendo.applyEventMap(MOUSEDOWN, kendo.guid());

            if (that.collisions.length === 1) {
                that.collisions.push(that.collisions[0]);
            }

            parentPopup = $(that.options.anchor).closest(".k-popup,.k-group").filter(":not([class^=km-])"); // When popup is in another popup, make it relative.

            options.appendTo = $($(options.appendTo)[0] || parentPopup[0] || document.body);

            that.element.hide()
                .addClass("k-popup k-group k-reset")
                .toggleClass("k-rtl", !!options.isRtl)
                .css({ position : ABSOLUTE })
                .appendTo(options.appendTo)
                .attr("aria-hidden", true)
                .on("mouseenter" + NS, function() {
                    that._hovered = true;
                })
                .on("wheel" + NS, function(e) {
                    var list = $(e.target).find(".k-list");
                    var scrollArea = list.parent();
                    if (list.length && list.is(":visible") && ((scrollArea.scrollTop() === 0 && e.originalEvent.deltaY < 0) ||
                        (scrollArea.scrollTop() === scrollArea.prop('scrollHeight') - scrollArea.prop('offsetHeight') && e.originalEvent.deltaY > 0))) {
                           e.preventDefault();
                    }
                })
                .on("mouseleave" + NS, function() {
                    that._hovered = false;
                });

            that.wrapper = $();

            if (options.animation === false) {
                options.animation = { open: { effects: {} }, close: { hide: true, effects: {} } };
            }

            extend(options.animation.open, {
                complete: function() {
                    that.wrapper.css({ overflow: VISIBLE }); // Forcing refresh causes flickering in mobile.
                    that._activated = true;
                    that._trigger(ACTIVATE);
                }
            });

            extend(options.animation.close, {
                complete: function() {
                    that._animationClose();
                }
            });

            that._mousedownProxy = function(e) {
                that._mousedown(e);
            };

            if (support.mobileOS.android) {
                that._resizeProxy = function(e) {
                    setTimeout(function() {
                        that._resize(e);
                    }, 600); //Logic from kendo.onResize
                };
            } else {
                that._resizeProxy = function(e) {
                    that._resize(e);
                };
            }

            if (options.toggleTarget) {
                $(options.toggleTarget).on(options.toggleEvent + NS, $.proxy(that.toggle, that));
            }
        },

        events: [
            OPEN,
            ACTIVATE,
            CLOSE,
            DEACTIVATE
        ],

        options: {
            name: "Popup",
            toggleEvent: "click",
            origin: BOTTOM + " " + LEFT,
            position: TOP + " " + LEFT,
            anchor: BODY,
            appendTo: null,
            collision: "flip fit",
            viewport: window,
            copyAnchorStyles: true,
            autosize: false,
            modal: false,
            adjustSize: {
                width: 0,
                height: 0
            },
            animation: {
                open: {
                    effects: "slideIn:down",
                    transition: true,
                    duration: 200
                },
                close: { // if close animation effects are defined, they will be used instead of open.reverse
                    duration: 100,
                    hide: true
                }
            }
        },

        _animationClose: function() {
            var that = this;
            var location = that.wrapper.data(LOCATION);

            that.wrapper.hide();

            if (location) {
                that.wrapper.css(location);
            }

            if (that.options.anchor != BODY) {
                that._hideDirClass();
            }

            that._closing = false;
            that._trigger(DEACTIVATE);
        },

        destroy: function() {
            var that = this,
                options = that.options,
                element = that.element.off(NS),
                parent;

            Widget.fn.destroy.call(that);

            if (options.toggleTarget) {
                $(options.toggleTarget).off(NS);
            }

            if (!options.modal) {
                DOCUMENT_ELEMENT.unbind(that.downEvent, that._mousedownProxy);
                that._toggleResize(false);
            }

            kendo.destroy(that.element.children());
            element.removeData();

            if (options.appendTo[0] === document.body) {
                parent = element.parent(".k-animation-container");

                if (parent[0]) {
                    parent.remove();
                } else {
                    element.remove();
                }
            }
        },

        open: function(x, y) {
            var that = this,
                fixed = { isFixed: !isNaN(parseInt(y,10)), x: x, y: y },
                element = that.element,
                options = that.options,
                animation, wrapper,
                anchor = $(options.anchor),
                mobile = element[0] && element.hasClass("km-widget");

            if (!that.visible()) {
                if (options.copyAnchorStyles) {
                    if (mobile && styles[0] == "font-size") {
                        styles.shift();
                    }
                    element.css(kendo.getComputedStyles(anchor[0], styles));
                }

                if (element.data("animating") || that._trigger(OPEN)) {
                    return;
                }

                that._activated = false;

                if (!options.modal) {
                    DOCUMENT_ELEMENT.unbind(that.downEvent, that._mousedownProxy)
                                .bind(that.downEvent, that._mousedownProxy);

                    // this binding hangs iOS in editor
                    // all elements in IE7/8 fire resize event, causing mayhem
                    that._toggleResize(false);
                    that._toggleResize(true);
                }

                that.wrapper = wrapper = kendo.wrap(element, options.autosize)
                                        .css({
                                            overflow: HIDDEN,
                                            display: "block",
                                            position: ABSOLUTE
                                        })
                                        .attr("aria-hidden", false);

                if (support.mobileOS.android) {
                    wrapper.css(TRANSFORM, "translatez(0)"); // Android is VERY slow otherwise. Should be tested in other droids as well since it may cause blur.
                }

                wrapper.css(POSITION);

                if ($(options.appendTo)[0] == document.body) {
                    wrapper.css(TOP, "-10000px");
                }

                that.flipped = that._position(fixed);
                animation = that._openAnimation();

                if (options.anchor != BODY) {
                    that._showDirClass(animation);
                }

                element.data(EFFECTS, animation.effects)
                       .kendoStop(true)
                       .kendoAnimate(animation)
                       .attr("aria-hidden", false);
            }
        },

        _location: function(isFixed) {
            var that = this,
                element = that.element,
                options = that.options,
                wrapper,
                anchor = $(options.anchor),
                mobile = element[0] && element.hasClass("km-widget");

            if (options.copyAnchorStyles) {
                if (mobile && styles[0] == "font-size") {
                    styles.shift();
                }
                element.css(kendo.getComputedStyles(anchor[0], styles));
            }

            that.wrapper = wrapper = kendo.wrap(element, options.autosize)
                                    .css({
                                        overflow: HIDDEN,
                                        display: "block",
                                        position: ABSOLUTE
                                    });

            if (support.mobileOS.android) {
                wrapper.css(TRANSFORM, "translatez(0)"); // Android is VERY slow otherwise. Should be tested in other droids as well since it may cause blur.
            }

            wrapper.css(POSITION);

            if ($(options.appendTo)[0] == document.body) {
                wrapper.css(TOP, "-10000px");
            }

            that._position(isFixed || {});

            var offset = wrapper.offset();
            return {
                width: kendo._outerWidth(wrapper),
                height: kendo._outerHeight(wrapper),
                left: offset.left,
                top: offset.top
            };
        },

        _openAnimation: function() {
            var animation = extend(true, {}, this.options.animation.open);
            animation.effects = kendo.parseEffects(animation.effects, this.flipped);

            return animation;
        },

        _hideDirClass: function() {
            var anchor = $(this.options.anchor);
            var direction = ((anchor.attr("class") || "").match(ACTIVEBORDERREGEXP) || ["", "down"])[1];
            var dirClass = ACTIVEBORDER + "-" + direction;

            anchor
                .removeClass(dirClass)
                .children(ACTIVECHILDREN)
                .removeClass(ACTIVE)
                .removeClass(dirClass);

            this.element.removeClass(ACTIVEBORDER + "-" + kendo.directions[direction].reverse);
        },

        _showDirClass: function(animation) {
            var direction = animation.effects.slideIn ? animation.effects.slideIn.direction : "down";
            var dirClass = ACTIVEBORDER + "-" + direction;

            $(this.options.anchor)
                .addClass(dirClass)
                .children(ACTIVECHILDREN)
                .addClass(ACTIVE)
                .addClass(dirClass);

            this.element.addClass(ACTIVEBORDER + "-" + kendo.directions[direction].reverse);
        },

        position: function() {
            if (this.visible()) {
                this.flipped = this._position();
                //this._hideDirClass();
                //this._showDirClass(this._openAnimation());
            }
        },

        toggle: function() {
            var that = this;

            that[that.visible() ? CLOSE : OPEN]();
        },

        visible: function() {
            return this.element.is(":" + VISIBLE);
        },

        close: function(skipEffects) {
            var that = this,
                options = that.options, wrap,
                animation, openEffects, closeEffects;

            if (that.visible()) {
                wrap = (that.wrapper[0] ? that.wrapper : kendo.wrap(that.element).hide());

                that._toggleResize(false);

                if (that._closing || that._trigger(CLOSE)) {
                    that._toggleResize(true);
                    return;
                }

                // Close all inclusive popups.
                that.element.find(".k-popup").each(function () {
                    var that = $(this),
                        popup = that.data("kendoPopup");

                    if (popup) {
                        popup.close(skipEffects);
                    }
                });

                DOCUMENT_ELEMENT.unbind(that.downEvent, that._mousedownProxy);

                if (skipEffects) {
                    animation = { hide: true, effects: {} };
                } else {
                    animation = extend(true, {}, options.animation.close);
                    openEffects = that.element.data(EFFECTS);
                    closeEffects = animation.effects;

                    if (!closeEffects && !kendo.size(closeEffects) && openEffects && kendo.size(openEffects)) {
                        animation.effects = openEffects;
                        animation.reverse = true;
                    }

                    that._closing = true;
                }

                that.element
                        .kendoStop(true)
                        .attr("aria-hidden", true);
                wrap
                    .css({ overflow: HIDDEN }) // stop callback will remove hidden overflow
                    .attr("aria-hidden", true);
                that.element.kendoAnimate(animation);

                if (skipEffects) {
                    that._animationClose();
                }
            }
        },

        _trigger: function(ev) {
            return this.trigger(ev, { type: ev });
        },

        _resize: function(e) {
            var that = this;

            if (support.resize.indexOf(e.type) !== -1) {
                clearTimeout(that._resizeTimeout);
                that._resizeTimeout = setTimeout(function() {
                    that._position();
                    that._resizeTimeout = null;
                }, 50);
            } else {
                if (!that._hovered || (that._activated && that.element.hasClass("k-list-container"))) {
                    that.close();
                }
            }
        },

        _toggleResize: function(toggle) {
            var method = toggle ? "on" : "off";
            var eventNames = support.resize;

            if (!(support.mobileOS.ios || support.mobileOS.android)) {
                eventNames += " " + SCROLL;
            }

            this._scrollableParents()[method](SCROLL, this._resizeProxy);
            WINDOW[method](eventNames, this._resizeProxy);
        },

        _mousedown: function(e) {
            var that = this,
                container = that.element[0],
                options = that.options,
                anchor = $(options.anchor)[0],
                toggleTarget = options.toggleTarget,
                target = kendo.eventTarget(e),
                popup = $(target).closest(".k-popup"),
                mobile = popup.parent().parent(".km-shim").length;

            popup = popup[0];
            if (!mobile && popup && popup !== that.element[0]){
                return;
            }

            // This MAY result in popup not closing in certain cases.
            if ($(e.target).closest("a").data("rel") === "popover") {
                return;
            }

            if (!contains(container, target) && !contains(anchor, target) && !(toggleTarget && contains($(toggleTarget)[0], target))) {
                that.close();
            }
        },

        _fit: function(position, size, viewPortSize) {
            var output = 0;

            if (position + size > viewPortSize) {
                output = viewPortSize - (position + size);
            }

            if (position < 0) {
                output = -position;
            }

            return output;
        },

        _flip: function(offset, size, anchorSize, viewPortSize, origin, position, boxSize) {
            var output = 0;
                boxSize = boxSize || size;

            if (position !== origin && position !== CENTER && origin !== CENTER) {
                if (offset + boxSize > viewPortSize) {
                    output += -(anchorSize + size);
                }

                if (offset + output < 0) {
                    output += anchorSize + size;
                }
            }
            return output;
        },

        _scrollableParents: function() {
            return $(this.options.anchor)
                       .parentsUntil("body")
                       .filter(function(index, element) {
                           return kendo.isScrollable(element);
                       });
        },

        _position: function(fixed) {
            var that = this,
                //element = that.element.css(POSITION, ""), /* fixes telerik/kendo-ui-core#790, comes from telerik/kendo#615 */
                element = that.element,
                wrapper = that.wrapper,
                options = that.options,
                viewport = $(options.viewport),
                zoomLevel = support.zoomLevel(),
                isWindow = !!((viewport[0] == window) && window.innerWidth && (zoomLevel <= 1.02)),
                anchor = $(options.anchor),
                origins = options.origin.toLowerCase().split(" "),
                positions = options.position.toLowerCase().split(" "),
                collisions = that.collisions,
                siblingContainer, parents,
                parentZIndex, zIndex = 10002,
                idx = 0,
                docEl = document.documentElement,
                length, viewportOffset, viewportWidth, viewportHeight;

            if (options.viewport === window) {
                viewportOffset = {
                    top: (window.pageYOffset || document.documentElement.scrollTop || 0),
                    left: (window.pageXOffset || document.documentElement.scrollLeft || 0)
                };
            } else {
                viewportOffset = viewport.offset();
            }

            if (isWindow) {
                viewportWidth = window.innerWidth;
                viewportHeight = window.innerHeight;
            } else {
                viewportWidth = viewport.width();
                viewportHeight = viewport.height();
            }

            if (isWindow && docEl.scrollHeight - docEl.clientHeight > 0) {
                 var sign = options.isRtl ? -1 : 1;

                 viewportWidth -= sign * kendo.support.scrollbar();
            }

            siblingContainer = anchor.parents().filter(wrapper.siblings());

            if (siblingContainer[0]) {
                parentZIndex = Math.max(Number(siblingContainer.css("zIndex")), 0);

                // set z-index to be more than that of the container/sibling
                // compensate with more units for window z-stack
                if (parentZIndex) {
                    zIndex = parentZIndex + 10;
                } else {
                    parents = anchor.parentsUntil(siblingContainer);
                    for (length = parents.length; idx < length; idx++) {
                        parentZIndex = Number($(parents[idx]).css("zIndex"));
                        if (parentZIndex && zIndex < parentZIndex) {
                            zIndex = parentZIndex + 10;
                        }
                    }
                }
            }

            wrapper.css("zIndex", zIndex);

            if (fixed && fixed.isFixed) {
                wrapper.css({ left: fixed.x, top: fixed.y });
            } else {
                wrapper.css(that._align(origins, positions));
            }

            var pos = getOffset(wrapper, POSITION, anchor[0] === wrapper.offsetParent()[0]),
                offset = getOffset(wrapper),
                anchorParent = anchor.offsetParent().parent(".k-animation-container,.k-popup,.k-group"); // If the parent is positioned, get the current positions

            if (anchorParent.length) {
                pos = getOffset(wrapper, POSITION, true);
                offset = getOffset(wrapper);
            }

            offset.top -= viewportOffset.top;
            offset.left -= viewportOffset.left;

            if (!that.wrapper.data(LOCATION)) { // Needed to reset the popup location after every closure - fixes the resize bugs.
                wrapper.data(LOCATION, extend({}, pos));
            }

            var offsets = extend({}, offset),
                location = extend({}, pos),
                adjustSize = options.adjustSize;

            if (collisions[0] === "fit") {
                location.top += that._fit(offsets.top, outerHeight(wrapper) + adjustSize.height, viewportHeight / zoomLevel);
            }

            if (collisions[1] === "fit") {
                location.left += that._fit(offsets.left, outerWidth(wrapper) + adjustSize.width, viewportWidth / zoomLevel);
            }

            var flipPos = extend({}, location);
            var elementHeight = outerHeight(element);
            var wrapperHeight =  outerHeight(wrapper);

            if (!wrapper.height() && elementHeight) {
                wrapperHeight = wrapperHeight + elementHeight;
            }

            if (collisions[0] === "flip") {
                location.top += that._flip(offsets.top, elementHeight, outerHeight(anchor), viewportHeight / zoomLevel, origins[0], positions[0], wrapperHeight);
            }

            if (collisions[1] === "flip") {
                location.left += that._flip(offsets.left, outerWidth(element), outerWidth(anchor), viewportWidth / zoomLevel, origins[1], positions[1], outerWidth(wrapper));
            }

            element.css(POSITION, ABSOLUTE);
            wrapper.css(location);

            return (location.left != flipPos.left || location.top != flipPos.top);
        },

        _align: function(origin, position) {
            var that = this,
                element = that.wrapper,
                anchor = $(that.options.anchor),
                verticalOrigin = origin[0],
                horizontalOrigin = origin[1],
                verticalPosition = position[0],
                horizontalPosition = position[1],
                anchorOffset = getOffset(anchor),
                appendTo = $(that.options.appendTo),
                appendToOffset,
                width = outerWidth(element),
                height = outerHeight(element) || outerHeight(element.children().first()),
                anchorWidth = outerWidth(anchor),
                anchorHeight = outerHeight(anchor),
                top = anchorOffset.top,
                left = anchorOffset.left,
                round = Math.round;

            if (appendTo[0] != document.body) {
                appendToOffset = getOffset(appendTo);
                top -= appendToOffset.top;
                left -= appendToOffset.left;
            }


            if (verticalOrigin === BOTTOM) {
                top += anchorHeight;
            }

            if (verticalOrigin === CENTER) {
                top += round(anchorHeight / 2);
            }

            if (verticalPosition === BOTTOM) {
                top -= height;
            }

            if (verticalPosition === CENTER) {
                top -= round(height / 2);
            }

            if (horizontalOrigin === RIGHT) {
                left += anchorWidth;
            }

            if (horizontalOrigin === CENTER) {
                left += round(anchorWidth / 2);
            }

            if (horizontalPosition === RIGHT) {
                left -= width;
            }

            if (horizontalPosition === CENTER) {
                left -= round(width / 2);
            }

            return {
                top: top,
                left: left
            };
        }
    });

    ui.plugin(Popup);

    var stableSort = kendo.support.stableSort;
    var tabKeyTrapNS = "kendoTabKeyTrap";
    var focusableNodesSelector = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex], *[contenteditable]";
    var TabKeyTrap = Class.extend({
        init: function(element) {
            this.element = $(element);
            this.element.autoApplyNS(tabKeyTrapNS);
        },

        trap: function() {
            this.element.on("keydown", proxy(this._keepInTrap, this));
        },

        removeTrap: function() {
            this.element.kendoDestroy(tabKeyTrapNS);
        },

        destroy: function() {
            this.element.kendoDestroy(tabKeyTrapNS);
            this.element = undefined;
        },

        shouldTrap: function () {
            return true;
        },

        _keepInTrap: function(e) {
            if (e.which !== 9 || !this.shouldTrap() || e.isDefaultPrevented()) {
                return;
            }

            var elements = this._focusableElements();
            var sortedElements = this._sortFocusableElements(elements);
            var next = this._nextFocusable(e, sortedElements);

            this._focus(next);

            e.preventDefault();
        },
        _focusableElements: function(){
            var elements = this.element.find(focusableNodesSelector).filter(function(i, item){
                return item.tabIndex >= 0 && $(item).is(':visible') && !$(item).is('[disabled]');
            });

            if (this.element.is("[tabindex]")) {
                elements.push(this.element[0]);
            }

            return elements;
        },
        _sortFocusableElements: function(elements){
            var sortedElements;

            if (stableSort) {
                sortedElements = elements.sort(function(prev, next) {
                    return prev.tabIndex - next.tabIndex;
                });
            } else {
                var attrName = "__k_index";
                elements.each(function(i, item){
                    item.setAttribute(attrName, i);
                });

                sortedElements = elements.sort(function(prev, next) {
                    return prev.tabIndex === next.tabIndex ?
                        parseInt(prev.getAttribute(attrName), 10) - parseInt(next.getAttribute(attrName), 10) :
                        prev.tabIndex - next.tabIndex;
                });

                elements.removeAttr(attrName);
            }

            return sortedElements;
        },
        _nextFocusable: function(e, elements){
            var count = elements.length;
            var current = elements.index(e.target);

            return elements.get((current + (e.shiftKey ? -1 : 1)) % count);
        },
        _focus: function(element){
            if (element.nodeName == "IFRAME") {
                element.contentWindow.document.body.focus();
                return;
            }

            element.focus();

            if (element.nodeName == "INPUT" && element.setSelectionRange && this._haveSelectionRange(element)) {
                element.setSelectionRange(0, element.value.length);
            }
        },
        _haveSelectionRange: function(element){
            var elementType = element.type.toLowerCase();

            return elementType === "text" || elementType === "search" ||
            elementType === "url" || elementType === "tel" ||
            elementType === "password";
        }
    });
    ui.Popup.TabKeyTrap = TabKeyTrap;
})(window.kendo.jQuery);



return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
