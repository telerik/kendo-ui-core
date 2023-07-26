import "./kendo.core.js";
import "./kendo.userevents.js";

var __meta__ = {
    id: "selectable",
    name: "Selectable",
    category: "framework",
    depends: [ "core", "userevents" ],
    advanced: true
};

(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        abs = Math.abs,
        ARIASELECTED = "aria-selected",
        SELECTED = "k-selected",
        ACTIVE = "k-selecting",
        SELECTABLE = "k-selectable",
        CHANGE = "change",
        NS = ".kendoSelectable",
        UNSELECT = "unselect",
        UNSELECTING = "k-unselecting",
        INPUTSELECTOR_ICONSSELECTOR_FONT = "span.k-icon.k-i-caret-alt-down,span.k-icon.k-i-caret-alt-up,.k-icon.k-i-caret-alt-down,.k-icon.k-i-caret-alt-right,.k-icon.k-i-caret-alt-left",
        INPUTSELECTOR_ICONSSELECTOR_SVG = INPUTSELECTOR_ICONSSELECTOR_FONT.replaceAll('k-i', 'k-svg-i'),
        INPUTSELECTOR_SVG_PARTS = INPUTSELECTOR_ICONSSELECTOR_SVG.split(",").map((selector) => selector + " *").join(","),
        INPUTSELECTOR = `input,a,textarea,.k-multiselect-wrap,select,button,${INPUTSELECTOR_ICONSSELECTOR_FONT},${INPUTSELECTOR_ICONSSELECTOR_SVG},${INPUTSELECTOR_SVG_PARTS},.k-button>span,.k-button>span *,.k-button>img,label.k-checkbox-label.k-no-text,span.k-numeric-wrap,.k-focusable`,
        msie = kendo.support.browser.msie,
        supportEventDelegation = false,
        extend = $.extend;

        (function($) {
            (function() {
                $('<div class="parent"><span></span></div>')
                .on("click", ">*", function() {
                    supportEventDelegation = true;
                })
                .find("span")
                .trigger("click")
                .end()
                .off();
            })();
        })($);

    var Selectable = Widget.extend({
        init: function(element, options) {
            var that = this,
                multiple,
                dragToSelect;

            Widget.fn.init.call(that, element, options);

            that._marquee = $("<div class='k-marquee'><div class='k-marquee-color'></div></div>");
            that._lastActive = null;
            that.element.addClass(SELECTABLE);

            that.relatedTarget = that.options.relatedTarget;

            multiple = that.options.multiple;
            dragToSelect = that.options.dragToSelect;

            that.userEvents = new kendo.UserEvents(that.element, {
                global: true,
                allowSelection: true,
                filter: (!supportEventDelegation ? "." + SELECTABLE + " " : "") + that.options.filter,
                tap: that._tap.bind(that),
                touchAction: multiple ? "none" : "pan-x pan-y"
            });

            if (multiple) {
                if (dragToSelect) {
                    that.userEvents
                        .bind("start", that._start.bind(that))
                        .bind("move", that._move.bind(that))
                        .bind("end", that._end.bind(that));
                }
                that.userEvents
                   .bind("select", that._select.bind(that));
            }
        },

        events: [CHANGE, UNSELECT],

        options: {
            name: "Selectable",
            filter: ">*",
            inputSelectors: INPUTSELECTOR,
            multiple: false,
            dragToSelect: true,
            relatedTarget: $.noop,
            ignoreOverlapped: false,
            addIdToRanges: false
        },

        _isElement: function(target) {
            var elements = this.element;
            var idx, length = elements.length, result = false;

            target = target[0];

            for (idx = 0; idx < length; idx ++) {
                if (elements[idx] === target) {
                    result = true;
                    break;
                }
            }

            return result;
        },

        _tap: function(e) {
            var target = $(e.target),
                that = this,
                ctrlKey = e.event.ctrlKey || e.event.metaKey,
                multiple = that.options.multiple,
                shiftKey = multiple && e.event.shiftKey,
                selectedClass = that.options.selectedClass || SELECTED,
                selected,
                whichCode = e.event.which,
                buttonCode = e.event.button;

            //in case of hierarchy or right-click
            if (!that._isElement(target.closest("." + SELECTABLE)) || whichCode && whichCode == 3 || buttonCode && buttonCode == 2) {
                return;
            }

            if (!this._allowSelection(e.event.target)) {
                return;
            }

            selected = target.hasClass(selectedClass);

            target = target.add(that.relatedTarget(target));

            if (!multiple) {
                if (selected && ctrlKey) {
                    that._unselect(target);
                    that._notify(CHANGE, e);
                } else if (!selected) {
                    that.clear();
                    that.value(target, e);
                    that._notify(CHANGE, e);
                }
            } else {
                if (shiftKey) {
                    if (!that._lastRange || !compareElements(that._lastRange, target)) {
                        that.selectRange(that._firstSelectee(), target, e);
                        that._notify(CHANGE, e);
                    }
                    that._lastRange = target;
                } else {
                    that._lastRange = null;
                    if (selected && ctrlKey) {
                        that._unselect(target);
                        that._notify(CHANGE, e);
                    } else if (ctrlKey) {
                        that.value(target, e);
                        that._notify(CHANGE, e);
                    } else if (!selected || that.value().length > 1) {
                        that.clear();
                        that.value(target, e);
                        that._notify(CHANGE, e);
                    }

                    that._lastActive = that._downTarget = target;
                }
            }
        },

        _start: function(e) {
            var that = this,
                target = $(e.target),
                selectedClass = that.options.selectedClass || SELECTED,
                selected = target.hasClass(selectedClass),
                currentElement,
                ctrlKey = e.event.ctrlKey || e.event.metaKey;

            if (!this._allowSelection(e.event.target)) {
                return;
            }

            that._downTarget = target;

            //in case of hierarchy
            if (!that._isElement(target.closest("." + SELECTABLE))) {
                that.userEvents.cancel();
                return;
            }

            if (that.options.useAllItems) {
                that._items = that.element.find(that.options.filter);
            } else {
                currentElement = target.closest(that.element);
                that._items = currentElement.find(that.options.filter);
            }

            e.sender.capture();

            that._marquee
                .appendTo(document.body)
                .css({
                    left: e.x.client + 1,
                    top: e.y.client + 1,
                    width: 0,
                    height: 0
                });

            if (!ctrlKey) {
                that.clear();
            }

            target = target.add(that.relatedTarget(target));
            if (selected) {
                that._selectElement(target, true);
                if (ctrlKey) {
                    target.addClass(UNSELECTING);
                }
            }
        },

        _move: function(e) {
            var that = this,
                position = {
                    left: e.x.startLocation > e.x.location ? e.x.location : e.x.startLocation,
                    top: e.y.startLocation > e.y.location ? e.y.location : e.y.startLocation,
                    width: abs(e.x.initialDelta),
                    height: abs(e.y.initialDelta)
                };

            that._marquee.css(position);

            that._invalidateSelectables(position, (e.event.ctrlKey || e.event.metaKey));

            e.preventDefault();
        },

        _end: function(e) {
            var that = this,
            rangeSelectedAttr = kendo.attr("range-selected"),
            uid = kendo.guid();

            that._marquee.remove();

            that._unselect(that.element
                .find(that.options.filter + "." + UNSELECTING))
                .removeClass(UNSELECTING);


            var target = that.element.find(that.options.filter + "." + ACTIVE);
            target = target.add(that.relatedTarget(target));

            if (that.options.addIdToRanges) {
                for (var i = 0; i < that._currentlyActive.length; i++) {
                    $(that._currentlyActive[i]).attr(rangeSelectedAttr, uid);
                }
            }

            if (!that._lastRange || !compareElements(that._lastRange, target)) {
                that.value(target, e);
                that._notify(CHANGE, e);
            }
            that._lastRange = target;
            that._lastActive = that._downTarget;
            that._items = null;
        },

        _invalidateSelectables: function(position, ctrlKey) {
            var idx,
                length,
                target = this._downTarget[0],
                items = this._items,
                selectedClass = this.options.selectedClass || SELECTED,
                related,
                toSelect;

            this._currentlyActive = [];

            for (idx = 0, length = items.length; idx < length; idx ++) {
                toSelect = items.eq(idx);
                related = toSelect.add(this.relatedTarget(toSelect));

                if (collision(toSelect, position)) {
                    if (toSelect.hasClass(selectedClass)) {
                        if (ctrlKey && target !== toSelect[0]) {
                            related.removeClass(selectedClass).addClass(UNSELECTING);
                        }
                    } else if (!toSelect.hasClass(ACTIVE) && !toSelect.hasClass(UNSELECTING) && !this._collidesWithActiveElement(related, position)) {
                        related.addClass(ACTIVE);
                    }
                    this._currentlyActive.push(related[0]);
                } else {
                    if (toSelect.hasClass(ACTIVE)) {
                        related.removeClass(ACTIVE);
                    } else if (ctrlKey && toSelect.hasClass(UNSELECTING)) {
                        related.removeClass(UNSELECTING).addClass(selectedClass);
                    }
                }
            }
        },

        _collidesWithActiveElement: function(element, marqueeRect) {
            if (!this.options.ignoreOverlapped) {
                return false;
            }

            var activeElements = this._currentlyActive;
            var elemRect = element[0].getBoundingClientRect();
            var activeElementRect;
            var collision = false;
            var isRtl = kendo.support.isRtl(element);
            var leftRight = isRtl ? "right" : "left";
            var tempRect = {};

            marqueeRect.right = marqueeRect.left + marqueeRect.width;
            marqueeRect.bottom = marqueeRect.top + marqueeRect.height;

            for (var i = 0; i < activeElements.length; i++) {
                activeElementRect = activeElements[i].getBoundingClientRect();
                if (overlaps(elemRect, activeElementRect)) {
                    tempRect[leftRight] = leftRight === "left" ? activeElementRect.right : activeElementRect.left;
                    elemRect = extend({}, elemRect, tempRect);
                    if (elemRect.left > elemRect.right) {
                        return true;
                    }
                    collision = !overlaps(elemRect, marqueeRect);
                }
            }
            return collision;
        },

        value: function(val) {
            var that = this,
                selectElement = that._selectElement.bind(that);

            if (val) {
                val.each(function() {
                    selectElement(this);
                });

                return;
            }

            return that.element.find(that.options.filter + "." + (that.options.selectedClass || SELECTED));
        },

        selectedRanges: function() {
            var that = this;
            var rangeSelectedAttr = kendo.attr("range-selected");
            var map = {};

            that.element.find("[" + rangeSelectedAttr + "]").each(function(_, elem) {
                var rangeId = $(elem).attr(rangeSelectedAttr);
                var mapLocation = map[rangeId];

                if (!mapLocation) {
                    mapLocation = map[rangeId] = [];
                }

                mapLocation.push($(elem));
            });

            return map;
        },

        selectedSingleItems: function() {
            var that = this;
            var rangeSelectedAttr = kendo.attr("range-selected");

            return that.element.find(that.options.filter + "." + (that.options.selectedClass || SELECTED) + ":not([" + rangeSelectedAttr + "])").toArray().map(function(elem) {
                return $(elem);
            });
        },

        _firstSelectee: function() {
            var that = this,
                selected;

            if (that._lastActive !== null) {
                return that._lastActive;
            }

            selected = that.value();
            return selected.length > 0 ?
                    selected[0] :
                    that.element.find(that.options.filter)[0];
        },

        _selectElement: function(element, preventNotify) {
            var toSelect = $(element),
                selectedClass = this.options.selectedClass || SELECTED,
                isPrevented = !preventNotify && this._notify("select", { element: element });

            toSelect.removeClass(ACTIVE);
            if (!isPrevented) {
                 toSelect.addClass(selectedClass);

                if (this.options.aria) {
                    toSelect.attr(ARIASELECTED, true);
                }
            }
        },

        _notify: function(name, args) {
            args = args || { };
            return this.trigger(name, args);
        },

        _unselect: function(element) {
            if (this.trigger(UNSELECT, { element: element })) {
                return;
            }

            var rangeSelectedAttr = kendo.attr("range-selected");

            element.removeClass(this.options.selectedClass || SELECTED).removeAttr(rangeSelectedAttr);

            if (this.options.aria) {
                element.attr(ARIASELECTED, false);
            }

            return element;
        },

        _select: function(e) {
            if (this._allowSelection(e.event.target)) {
                if (!msie || (msie && !$(kendo._activeElement()).is(this.options.inputSelectors))) {
                    e.preventDefault();
                }
            }
        },

        _allowSelection: function(target) {
            if ($(target).is(this.options.inputSelectors)) {
                this.userEvents.cancel();
                this._downTarget = null;
                return false;
            }

            return true;
        },

        resetTouchEvents: function() {
            this.userEvents.cancel();
        },

        clear: function() {
            var items = this.element.find(this.options.filter + "." + (this.options.selectedClass || SELECTED));
            this._unselect(items);
        },

        selectRange: function(start, end) {
            var that = this,
                idx,
                tmp,
                items;

            that.clear();

            if (that.element.length > 1) {
                items = that.options.continuousItems();
            }

            if (!items || !items.length) {
                items = that.element.find(that.options.filter);
            }

            start = $.inArray($(start)[0], items);
            end = $.inArray($(end)[0], items);

            if (start > end) {
                tmp = start;
                start = end;
                end = tmp;
            }

            if (!that.options.useAllItems) {
                end += that.element.length - 1;
            }

            for (idx = start; idx <= end; idx ++ ) {
                that._selectElement(items[idx], true);
            }
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.element.off(NS);

            that.userEvents.destroy();

            that._marquee = that._lastActive = that.element = that.userEvents = null;
        }
    });

    Selectable.parseOptions = function(selectable) {
        var selectableMode = selectable.mode || selectable;
        var asLowerString = typeof selectableMode === "string" && selectableMode.toLowerCase();
        return {
            multiple: asLowerString && asLowerString.indexOf("multiple") > -1,
            cell: asLowerString && asLowerString.indexOf("cell") > -1
        };
    };

    function compareElements(element, toCompare) {

        if (element.length !== toCompare.length) {
            return false;
        }

        for (var i = 0; i < element.length; i++) {
            if (element[i] !== toCompare[i]) {
                return false;
            }
        }

        return true;
    }

    function collision(element, position) {
        if (!element.is(":visible")) {
            return false;
        }

        var elementPosition = kendo.getOffset(element),
            right = position.left + position.width,
            bottom = position.top + position.height;

        elementPosition.right = elementPosition.left + kendo._outerWidth(element);
        elementPosition.bottom = elementPosition.top + kendo._outerHeight(element);

        return !(elementPosition.left > right ||
            elementPosition.right < position.left ||
            elementPosition.top > bottom ||
            elementPosition.bottom < position.top);
    }

    function overlaps(firstRect, secondRect) {
        return !(firstRect.right <= secondRect.left ||
            firstRect.left >= secondRect.right ||
            firstRect.bottom <= secondRect.top ||
            firstRect.top >= secondRect.bottom);
    }

    kendo.ui.plugin(Selectable);

})(window.kendo.jQuery);
export default kendo;

