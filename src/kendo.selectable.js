import "./kendo.core.js";
import "./kendo.userevents.js";

export const __meta__ = {
    id: "selectable",
    name: "Selectable",
    category: "framework",
    depends: [ "core", "userevents" ],
    advanced: true
};

(function($, undefined) {
    let kendo = window.kendo,
        Widget = kendo.ui.Widget,
        support = kendo.support,
        abs = Math.abs,
        ARIASELECTED = "aria-selected",
        SELECTED = "k-selected",
        ACTIVE = "k-selecting",
        SELECTABLE = "k-selectable",
        CHANGE = "change",
        CHANGING = "changing",
        NS = ".kendoSelectable",
        UNSELECT = "unselect",
        UNSELECTING = "k-unselecting",
        HOVER = "k-hover",
        MID = "k-range-mid",
        SPLITEND = "k-range-split-end",
        SPLITSTART = "k-range-split-start",
        RANGESTART = "k-range-start",
        RANGEEND = "k-range-end",
        START = "start",
        END = "end",
        NONE = "none",
        MOUSEENTER = "mouseenter",
        MOUSELEAVE = "mouseleave",
        TOUCHSTART = "touchstart",
        TOUCHMOVE = "touchmove",
        TOUCHEND = "touchend",
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

    const Selectable = Widget.extend({
        init: function(element, options) {
            let that = this,
                multiple,
                dragToSelect,
                selectableClass;

            Widget.fn.init.call(that, element, options);

            selectableClass = that.selectableClass = that.options.selectableClass || SELECTABLE;

            that._marquee = $("<div class='k-marquee'><div class='k-marquee-color'></div></div>");
            that._lastActive = null;
            that.element.addClass(selectableClass);

            that.relatedTarget = that.options.relatedTarget;

            multiple = that.options.multiple;
            dragToSelect = that.options.dragToSelect;

            that.userEvents = new kendo.UserEvents(that.element, {
                global: true,
                allowSelection: true,
                filter: (!supportEventDelegation ? "." + selectableClass + " " : "") + that.options.filter,
                tap: that._tap.bind(that),
                touchAction: multiple ? "none" : "pan-x pan-y"
            });

            if (multiple) {
                if (dragToSelect) {
                    that.userEvents
                        .bind("hold", that._hold.bind(that))
                        .bind("start", that._start.bind(that))
                        .bind("move", that._move.bind(that))
                        .bind("end", that._end.bind(that));
                }
                that.userEvents
                   .bind("select", that._select.bind(that));
            }
        },

        events: [CHANGE, CHANGING, UNSELECT],

        options: {
            name: "Selectable",
            filter: ">*",
            inputSelectors: INPUTSELECTOR,
            multiple: false,
            holdToDrag: false,
            dragToSelect: true,
            relatedTarget: $.noop,
            ignoreOverlapped: false,
            addIdToRanges: false,
            toggleable: false,
            selectableClass: ""
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
            let target = $(e.target),
                that = this,
                options = that.options,
                ctrlKey = e.event.ctrlKey || e.event.metaKey,
                multiple = that.options.multiple,
                shiftKey = multiple && e.event.shiftKey,
                selectedClass = that.options.selectedClass || SELECTED,
                selected,
                whichCode = e.event.which,
                buttonCode = e.event.button;

            //in case of hierarchy or right-click
            if (!that._isElement(target.closest("." + that.selectableClass)) || whichCode && whichCode == 3 || buttonCode && buttonCode == 2) {
                return;
            }

            if (!this._allowSelection(e.event.target)) {
                return;
            }

            if (that.trigger(CHANGING, { target: target, originalEvent: e.event })) {
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
                    if (selected && (ctrlKey || options.toggleable)) {
                        that._unselect(target);
                        that._notify(CHANGE, e);
                    } else if (ctrlKey || options.toggleable) {
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

        _hold: function(e) {
            if (this.options.holdToDrag) {
                // serves as a drag hint to indicate start of selection
                this._tap(e);
            }

            this._activated = true;
        },

        _isActivated: function() {
            return this.options.holdToDrag ? this._activated : true;
        },

        _start: function(e) {
            let that = this,
                target = $(e.target),
                selectedClass = that.options.selectedClass || SELECTED,
                selected = target.hasClass(selectedClass),
                currentElement,
                ctrlKey = e.event.ctrlKey || e.event.metaKey;

            if (!that._isActivated() || !this._allowSelection(e.event.target)) {
                return;
            }

            if (that.trigger(CHANGING, { target: target, originalEvent: e.event })) {
                that.userEvents.cancel();
                return;
            }

            that._downTarget = target;

            //in case of hierarchy
            if (!that._isElement(target.closest("." + that.selectableClass))) {
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

            if (!that._isActivated()) {
                return;
            }

            that._marquee.css(position);

            that._invalidateSelectables(position, (e.event.ctrlKey || e.event.metaKey));

            e.preventDefault();
        },

        _end: function(e) {
            var that = this,
            rangeSelectedAttr = kendo.attr("range-selected"),
            uid = kendo.guid();

            if (!that._isActivated()) {
                return;
            }

            that._activated = false;

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
                    if (this._allowPreventDefault(e.event.target)) {
                        e.preventDefault();
                    }
                }
            }
        },

        _allowPreventDefault: function(target) {
            var disallowedSelectors = ".k-table-td";
            // Required for the paste event in the Grid to work in Chrome.
            return !$(target).is(disallowedSelectors) || !this.options.allowPaste;
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

    const RangeSelectable = Widget.extend({
        init: function(element, options) {
            let that = this,
            ns,
            cellSelectorValid;

            Widget.fn.init.call(that, element, options);

            that.widget = options.widget;
            ns = options.ns;
            cellSelectorValid = options.filter;

            that.userEvents = new kendo.UserEvents(that.element, {
                global: true,
                allowSelection: true,
                filter: that.options.filter,
                tap: that._tap.bind(that),
                touchAction: NONE
            });

            if (support.touch) {
                element.on(TOUCHSTART + ns, cellSelectorValid, that._mouseEnter.bind(that))
                    .on(TOUCHEND + ns + " " + TOUCHMOVE + ns, cellSelectorValid, that._mouseLeave.bind(that));
            } else {
                element.on(MOUSEENTER + ns, cellSelectorValid, that._mouseEnter.bind(that))
                    .on(MOUSELEAVE + ns, cellSelectorValid, that._mouseLeave.bind(that));
            }
        },

        events: [CHANGE],

        options: {
            name: "RangeSelectable",
            filter: ">*",
            inputSelectors: INPUTSELECTOR,
            resetOnStart: false,
            multiple: false,
            dragToSelect: true,
            cellSelector: "*",
            ns: "",
            reverse: false,
            relatedTarget: $.noop
        },

        destroy: function() {
            let that = this;

            Widget.fn.destroy.call(that);

            that.userEvents.destroy();
            that.widget = null;

            that._lastActive = that.element = that.userEvents = that._start = that._end = null;
        },

        _allowSelection: function(target) {
            if ($(target).is(this.options.inputSelectors)) {
                this.userEvents.cancel();
                return false;
            }

            return true;
        },

        _mouseEnter: function(e) {
            let that = this,
                cell = $(e.currentTarget),
                range;

            cell.addClass(HOVER);

            range = that.widget?.selectRange();

            if (!range) {
                return;
            }

            if (that.options.resetOnStart && range.end) {
                return;
            }

            if (range.target === START && that._end) {
                that.range(cell, that._end, true, that.options.reverse);
            }

            if (range.target === END) {
                that.range(that._start, cell, true, that.options.reverse);
            }
        },

        _mouseLeave: function(e) {
            $(e.currentTarget).removeClass(HOVER);
        },

        start: function(element, preventFlagUpdate) {
            if (element === undefined || element === null) {
                return this._start;
            }

            element.addClass(SELECTED + " " + RANGESTART).attr(ARIASELECTED, true);

            if (!preventFlagUpdate) {
                this._start = element;
            }
        },

        end: function(element, preventFlagUpdate) {
            if (element === undefined || element === null) {
                return this._start;
            }

            element.addClass(SELECTED + " " + RANGEEND).attr(ARIASELECTED, true);

            if (!preventFlagUpdate) {
                this._end = element;
            }
        },

        mid: function(elements) {
            let tables = this.element.find("table"),
                options = this.options;

            elements.addClass(MID).attr(ARIASELECTED, true);
            tables.each(function() {
                let that = $(this);
                let lastCell = that.find(options.cellSelectorValid).last();
                let firstCell = that.find(options.cellSelectorValid).first();

                if (lastCell.hasClass(MID)) {
                    lastCell.addClass(SPLITEND);
                }

                if (firstCell.hasClass(MID)) {
                    firstCell.addClass(SPLITSTART);
                }
            });
        },

        clear: function(clearVariables) {
            let options = this.options;
            this.element.find(options.cellSelector)
                .removeClass(MID + " " + SPLITEND + " " + SPLITSTART);

            this.clearStartEnd();

            if (clearVariables) {
                this._start = this._end = null;
            }
        },

        clearStartEnd: function() {
            let that = this, options = that.options;
            that.element.find(options.cellSelector).removeClass(RANGESTART + " " + SELECTED + " " + RANGEEND).removeAttr(ARIASELECTED);
        },

        selectFrom: function(start) {
            let that = this,
                options = this.options,
                items,
                startIdx;

            items = that.element.find(options.cellSelector);

            startIdx = $.inArray($(start)[0], items);

            that.clear();
            that.start(start);

            items = items.filter(function(index) {
                return index > startIdx;
            });
            that.mid(items);
        },

        selectTo: function(end) {
            let that = this,
                options = this.options,
                items,
                endIdx;

            items = that.element.find(options.cellSelector);

            endIdx = $.inArray($(end)[0], items);

            that.clear();

            items = items.filter(function(index) {
                return index < endIdx;
            });
            that.mid(items);
            that.end($(end));
        },

        range: function(start, end, preventFlagUpdate, invert) {
            let that = this,
                options = this.options,
                items,
                startIdx,
                endIdx;

            if (start === undefined) {
                return { start: that._start, end: that._end };
            }

            that._clearFlags();

            items = that.element.find(options.cellSelector);

            startIdx = $.inArray($(start)[0], items);
            endIdx = $.inArray($(end)[0], items);

            if (!start || (start && !start.length)) {
                that._useStart = true;
            }

            that.clear();

            if (start) {
                that.start($(start), preventFlagUpdate);
            }

            items = items.filter(function(index) {
               if (endIdx < 0 || (!start && startIdx < 0)) {
                   return;
               }

                return (index > startIdx && index < endIdx) || options.reverse && (index < startIdx && index > endIdx);
            });

            that.mid(items);

            if (end) {
                that.end($(end), preventFlagUpdate);
            } else {
                that._useEnd = true;
            }

            if (startIdx > endIdx && invert) {
                that.clearStartEnd();
                that.start($(end), true);
                that.end($(start), true);
            }
        },

        change: function() {
            this.trigger(CHANGE);
        },

        _clearFlags: function() {
            this._useStart = this._useEnd = false;
        },

        _tap: function(e) {
            let target = $(e.target),
                that = this,
                range = that.widget.selectRange() || {},
                start = range.start,
                end = range.end,
                currentDate = kendo.calendar.toDateObject($(target).find("span")),
                options = that.options,
                resetOnStart = options.resetOnStart;

            that._lastActive = target;

            if (!start && !end) {
                that.clear(true);
                if (range.target === START) {
                    that.start(target);
                }

                if (range.target === END) {
                    that.end(target);
                }

                that._clearFlags();
                that.trigger(CHANGE);
                return;
            }

            if (!start && end) {
                if (range.target === END) {
                    that.end(target);
                } else {
                    if (+currentDate > +range.end && !options.reverse) {
                        that.clear(true);
                        that.start(target);
                    } else {
                        that.range(target, that._end, false, true);
                    }
                }
                that.trigger(CHANGE);
                that._clearFlags();
                return;
            }

            if (start && !end) {
                if (range.target === END && !options.reverse && +start > +currentDate) {
                    that.clear(true);

                    if (resetOnStart) {
                        that.start(target);
                    } else {
                        that.end(target);
                    }
                } else if (range.target === START) {
                    that.start(target);
                } else {
                    that.range(that._start, target, false, true);
                }
                that.trigger(CHANGE);
                that._clearFlags();
                return;
            }

            if (start && end) {
                if (!options.reverse) {
                    if (+start > +currentDate && range.target === END) {
                        that.clear(true);
                        if (resetOnStart) {
                            that.start(target);
                            that.end(null);
                            range.target = START;
                        } else {
                            that.start(null);
                            that.end(target);
                        }
                        that.trigger(CHANGE);
                        return;
                    }

                    if (+start < +currentDate && range.target === START) {
                        if (+currentDate > +range.end) {
                            that.clear(true);
                            that.start(target);
                            that.end(null);
                        } else {
                            that.range(target, that._end);
                        }
                        that.trigger(CHANGE);
                        return;
                    }

                    if (range.target === START) {
                        that.range(target, that._end);
                    }

                    if (range.target === END) {
                        that.range(that._start, target);
                    }

                    that.trigger(CHANGE);
                    return;
                }

                if (resetOnStart) {
                    if (range.target === START) {
                        that.range(target, that._end, false, true);
                    } else {
                        that.range(that._start, target, false, true);
                    }
                } else {
                    if (range.target === START) {
                        that.start(target);
                    } else {
                        that.end(target);
                    }
                }

                that.trigger(CHANGE);
            }
        }
    });

    Selectable.parseOptions = function(selectable) {
        var selectableMode = selectable.mode || selectable;
        var asLowerString = typeof selectableMode === "string" && selectableMode.toLowerCase();
        return {
            multiple: asLowerString && asLowerString.indexOf("multiple") > -1,
            cell: asLowerString && asLowerString.indexOf("cell") > -1,
            range: asLowerString && asLowerString.indexOf("range") > -1,
            single: asLowerString && asLowerString.indexOf("single") > -1
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
    kendo.ui.plugin(RangeSelectable);

})(window.kendo.jQuery);
export default kendo;

