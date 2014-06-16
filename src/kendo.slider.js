(function(f, define){
    define([ "./kendo.draganddrop" ], f);
})(function(){

var __meta__ = {
    id: "slider",
    name: "Slider",
    category: "web",
    description: "The Slider widget provides a rich input for selecting values or ranges of values.",
    depends: [ "draganddrop" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        Draggable = kendo.ui.Draggable,
        extend = $.extend,
        format = kendo.format,
        parse = kendo.parseFloat,
        proxy = $.proxy,
        isArray = $.isArray,
        math = Math,
        support = kendo.support,
        pointers = support.pointers,
        msPointers = support.msPointers,
        CHANGE = "change",
        SLIDE = "slide",
        NS = ".slider",
        MOUSE_DOWN = "touchstart" + NS + " mousedown" + NS,
        TRACK_MOUSE_DOWN = pointers ? "pointerdown" + NS : (msPointers ? "MSPointerDown" + NS : MOUSE_DOWN),
        MOUSE_UP = "touchend" + NS + " mouseup" + NS,
        TRACK_MOUSE_UP = pointers ? "pointerup" : (msPointers ? "MSPointerUp" + NS : MOUSE_UP),
        MOVE_SELECTION = "moveSelection",
        KEY_DOWN = "keydown" + NS,
        CLICK = "click" + NS,
        MOUSE_OVER = "mouseover" + NS,
        FOCUS = "focus" + NS,
        BLUR = "blur" + NS,
        DRAG_HANDLE = ".k-draghandle",
        TRACK_SELECTOR = ".k-slider-track",
        TICK_SELECTOR = ".k-tick",
        STATE_SELECTED = "k-state-selected",
        STATE_FOCUSED = "k-state-focused",
        STATE_DEFAULT = "k-state-default",
        STATE_DISABLED = "k-state-disabled",
        PRECISION = 3,
        DISABLED = "disabled",
        UNDEFINED = "undefined",
        TABINDEX = "tabindex",
        getTouches = kendo.getTouches;

    var SliderBase = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            options = that.options;

            that._distance = options.max - options.min;
            that._isHorizontal = options.orientation == "horizontal";
            that._isRtl = that._isHorizontal && kendo.support.isRtl(element);
            that._position = that._isHorizontal ? "left" : "bottom";
            that._sizeFn = that._isHorizontal ? "width" : "height";
            that._outerSize = that._isHorizontal ? "outerWidth" : "outerHeight";

            options.tooltip.format = options.tooltip.enabled ? options.tooltip.format || "{0}" : "{0}";

            that._createHtml();
            that.wrapper = that.element.closest(".k-slider");
            that._trackDiv = that.wrapper.find(TRACK_SELECTOR);

            that._setTrackDivWidth();

            that._maxSelection = that._trackDiv[that._sizeFn]();

            that._sliderItemsInit();

            that._tabindex(that.wrapper.find(DRAG_HANDLE));
            that[options.enabled ? "enable" : "disable"]();

            var rtlDirectionSign = kendo.support.isRtl(that.wrapper) ? -1 : 1;

            that._keyMap = {
                37: step(-1 * rtlDirectionSign * options.smallStep), // left arrow
                40: step(-options.smallStep), // down arrow
                39: step(+1 * rtlDirectionSign * options.smallStep), // right arrow
                38: step(+options.smallStep), // up arrow
                35: setValue(options.max), // end
                36: setValue(options.min), // home
                33: step(+options.largeStep), // page up
                34: step(-options.largeStep)  // page down
            };

            kendo.notify(that);
        },

        events: [
            CHANGE,
            SLIDE
        ],

        options: {
            enabled: true,
            min: 0,
            max: 10,
            smallStep: 1,
            largeStep: 5,
            orientation: "horizontal",
            tickPlacement: "both",
            tooltip: { enabled: true, format: "{0}" }
        },

        _resize: function() {
            this._setTrackDivWidth();
            this.wrapper.find(".k-slider-items").remove();

            this._maxSelection = this._trackDiv[this._sizeFn]();
            this._sliderItemsInit();
            this._refresh();
        },

        _sliderItemsInit: function() {
            var that = this,
                options = that.options;

            var sizeBetweenTicks = that._maxSelection / ((options.max - options.min) / options.smallStep);
            var pixelWidths = that._calculateItemsWidth(math.floor(that._distance / options.smallStep));

            if (options.tickPlacement != "none" && sizeBetweenTicks >= 2) {
                that._trackDiv.before(createSliderItems(options, that._distance));
                that._setItemsWidth(pixelWidths);
                that._setItemsTitle();
            }

            that._calculateSteps(pixelWidths);

            if (options.tickPlacement != "none" && sizeBetweenTicks >= 2 &&
                options.largeStep >= options.smallStep) {
                that._setItemsLargeTick();
            }
        },

        getSize: function() {
            return kendo.dimensions(this.wrapper);
        },

        _setTrackDivWidth: function() {
            var that = this,
                trackDivPosition = parseFloat(that._trackDiv.css(that._isRtl ? "right" : that._position), 10) * 2;

            that._trackDiv[that._sizeFn]((that.wrapper[that._sizeFn]() - 2) - trackDivPosition);
        },

        _setItemsWidth: function(pixelWidths) {
            var that = this,
                options = that.options,
                first = 0,
                last = pixelWidths.length - 1,
                items = that.wrapper.find(TICK_SELECTOR),
                i,
                paddingTop = 0,
                bordersWidth = 2,
                count = items.length,
                selection = 0;

            for (i = 0; i < count - 2; i++) {
                $(items[i + 1])[that._sizeFn](pixelWidths[i]);
            }

            if (that._isHorizontal) {
                $(items[first]).addClass("k-first")[that._sizeFn](pixelWidths[last - 1]);
                $(items[last]).addClass("k-last")[that._sizeFn](pixelWidths[last]);
            } else {
                $(items[last]).addClass("k-first")[that._sizeFn](pixelWidths[last]);
                $(items[first]).addClass("k-last")[that._sizeFn](pixelWidths[last - 1]);
            }

            if (that._distance % options.smallStep !== 0 && !that._isHorizontal) {
                for (i = 0; i < pixelWidths.length; i++) {
                    selection += pixelWidths[i];
                }

                paddingTop = that._maxSelection - selection;
                paddingTop += parseFloat(that._trackDiv.css(that._position), 10) + bordersWidth;

                that.wrapper.find(".k-slider-items").css("padding-top", paddingTop);
            }
        },

        _setItemsTitle: function() {
            var that = this,
                options = that.options,
                items = that.wrapper.find(TICK_SELECTOR),
                titleNumber = options.min,
                count = items.length,
                i = that._isHorizontal && !that._isRtl ? 0 : count - 1,
                limit = that._isHorizontal && !that._isRtl ? count : -1,
                increment = that._isHorizontal && !that._isRtl ? 1 : -1;

            for (; i - limit !== 0 ; i += increment) {
                $(items[i]).attr("title", format(options.tooltip.format, round(titleNumber)));
                titleNumber += options.smallStep;
            }
        },

        _setItemsLargeTick: function() {
            var that = this,
                options = that.options,
                items = that.wrapper.find(TICK_SELECTOR),
                i = 0, item, value;

            if ((1000 * options.largeStep) % (1000 * options.smallStep) === 0 || that._distance / options.largeStep >= 3) {
                if (!that._isHorizontal && !that._isRtl) {
                    items = $.makeArray(items).reverse();
                }

                for (i = 0; i < items.length; i++) {
                    item = $(items[i]);
                    value = that._values[i];
                    if (value % options.smallStep === 0 && value % options.largeStep === 0) {
                        item.addClass("k-tick-large")
                            .html("<span class='k-label'>" + item.attr("title") + "</span>");

                        if (i !== 0 && i !== items.length - 1) {
                            item.css("line-height", item[that._sizeFn]() + "px");
                        }
                    }
                }
            }
        },

        _calculateItemsWidth: function(itemsCount) {
            var that = this,
                options = that.options,
                trackDivSize = parseFloat(that._trackDiv.css(that._sizeFn)) + 1,
                pixelStep = trackDivSize / that._distance,
                itemWidth,
                pixelWidths,
                i;

            if ((that._distance / options.smallStep) - math.floor(that._distance / options.smallStep) > 0) {
                trackDivSize -= ((that._distance % options.smallStep) * pixelStep);
            }

            itemWidth = trackDivSize / itemsCount;
            pixelWidths = [];

            for (i = 0; i < itemsCount - 1; i++) {
                pixelWidths[i] = itemWidth;
            }

            pixelWidths[itemsCount - 1] = pixelWidths[itemsCount] = itemWidth / 2;
            return that._roundWidths(pixelWidths);
        },

        _roundWidths: function(pixelWidthsArray) {
            var balance = 0,
                count = pixelWidthsArray.length,
                i;

            for (i = 0; i < count; i++) {
                balance += (pixelWidthsArray[i] - math.floor(pixelWidthsArray[i]));
                pixelWidthsArray[i] = math.floor(pixelWidthsArray[i]);
            }

            balance = math.round(balance);

            return this._addAdditionalSize(balance, pixelWidthsArray);
        },

        _addAdditionalSize: function(additionalSize, pixelWidthsArray) {
            if (additionalSize === 0) {
                return pixelWidthsArray;
            }

            //set step size
            var step = parseFloat(pixelWidthsArray.length - 1) / parseFloat(additionalSize == 1 ? additionalSize : additionalSize - 1),
                i;

            for (i = 0; i < additionalSize; i++) {
                pixelWidthsArray[parseInt(math.round(step * i), 10)] += 1;
            }

            return pixelWidthsArray;
        },

        _calculateSteps: function(pixelWidths) {
            var that = this,
                options = that.options,
                val = options.min,
                selection = 0,
                itemsCount = math.ceil(that._distance / options.smallStep),
                i = 1,
                lastItem;

            itemsCount += (that._distance / options.smallStep) % 1 === 0 ? 1 : 0;
            pixelWidths.splice(0, 0, pixelWidths[itemsCount - 2] * 2);
            pixelWidths.splice(itemsCount -1, 1, pixelWidths.pop() * 2);

            that._pixelSteps = [selection];
            that._values = [val];

            if (itemsCount === 0) {
                return;
            }

            while (i < itemsCount) {
                selection += (pixelWidths[i - 1] + pixelWidths[i]) / 2;
                that._pixelSteps[i] = selection;
                that._values[i] = val += options.smallStep;

                i++;
            }

            lastItem = that._distance % options.smallStep === 0 ? itemsCount - 1 : itemsCount;

            that._pixelSteps[lastItem] = that._maxSelection;
            that._values[lastItem] = options.max;

            if (that._isRtl) {
                that._pixelSteps.reverse();
                that._values.reverse();
            }
        },

        _getValueFromPosition: function(mousePosition, dragableArea) {
            var that = this,
                options = that.options,
                step = math.max(options.smallStep * (that._maxSelection / that._distance), 0),
                position = 0,
                halfStep = (step / 2),
                i;

            if (that._isHorizontal) {
                position = mousePosition - dragableArea.startPoint;
                if (that._isRtl) {
                    position = that._maxSelection - position;
                }
            } else {
                position = dragableArea.startPoint - mousePosition;
            }

            if (that._maxSelection - ((parseInt(that._maxSelection % step, 10) - 3) / 2) < position) {
                return options.max;
            }

            for (i = 0; i < that._pixelSteps.length; i++) {
                if (math.abs(that._pixelSteps[i] - position) - 1 <= halfStep) {
                    return round(that._values[i]);
                }
            }
        },

        _getFormattedValue: function(val, drag) {
            var that = this,
                html = "",
                tooltip = that.options.tooltip,
                tooltipTemplate,
                selectionStart,
                selectionEnd;

            if (isArray(val)) {
                selectionStart = val[0];
                selectionEnd = val[1];
            } else if (drag && drag.type) {
                selectionStart = drag.selectionStart;
                selectionEnd = drag.selectionEnd;
            }

            if (drag) {
                tooltipTemplate = drag.tooltipTemplate;
            }

            if (!tooltipTemplate && tooltip.template) {
                tooltipTemplate = kendo.template(tooltip.template);
            }

            if (isArray(val) || (drag && drag.type)) {

                if (tooltipTemplate) {
                    html = tooltipTemplate({
                        selectionStart: selectionStart,
                        selectionEnd: selectionEnd
                    });
                } else {
                    selectionStart = format(tooltip.format, selectionStart);
                    selectionEnd = format(tooltip.format, selectionEnd);
                    html = selectionStart + " - " + selectionEnd;
                }
            } else {
                if (drag) {
                    drag.val = val;
                }

                if (tooltipTemplate) {
                    html = tooltipTemplate({
                        value: val
                    });
                } else {
                    html = format(tooltip.format, val);
                }
            }
            return html;
        },

        _getDraggableArea: function() {
            var that = this,
                offset = kendo.getOffset(that._trackDiv);

            return {
                startPoint: that._isHorizontal ? offset.left : offset.top + that._maxSelection,
                endPoint: that._isHorizontal ? offset.left + that._maxSelection : offset.top
            };
        },

        _createHtml: function() {
            var that = this,
                element = that.element,
                options = that.options,
                inputs = element.find("input");

            if (inputs.length == 2) {
                inputs.eq(0).val(options.selectionStart);
                inputs.eq(1).val(options.selectionEnd);
            } else {
                element.val(options.value);
            }

            element.wrap(createWrapper(options, element, that._isHorizontal)).hide();

            if (options.showButtons) {
                element.before(createButton(options, "increase", that._isHorizontal))
                       .before(createButton(options, "decrease", that._isHorizontal));
            }

            element.before(createTrack(options, element));
        },

        _focus: function(e) {
            var that = this,
                target = e.target,
                val = that.value(),
                drag = that._drag;

            if (!drag) {
                if (target == that.wrapper.find(DRAG_HANDLE).eq(0)[0]) {
                    drag = that._firstHandleDrag;
                    that._activeHandle = 0;
                } else {
                    drag = that._lastHandleDrag;
                    that._activeHandle = 1;
                }
                val = val[that._activeHandle];
            }

            $(target).addClass(STATE_FOCUSED + " " + STATE_SELECTED);

            if (drag) {
                that._activeHandleDrag = drag;

                drag.selectionStart = that.options.selectionStart;
                drag.selectionEnd = that.options.selectionEnd;

                drag._updateTooltip(val);
            }
        },

        _focusWithMouse: function(target) {
            target = $(target);

            var that = this,
                idx = target.is(DRAG_HANDLE) ? target.index() : 0;

            window.setTimeout(function(){
                that.wrapper.find(DRAG_HANDLE)[idx == 2 ? 1 : 0].focus();
            }, 1);

            that._setTooltipTimeout();
        },

        _blur: function(e) {
            var that = this,
                drag = that._activeHandleDrag;

            $(e.target).removeClass(STATE_FOCUSED + " " + STATE_SELECTED);

            if (drag) {
                drag._removeTooltip();
                delete that._activeHandleDrag;
                delete that._activeHandle;
            }
        },

        _setTooltipTimeout: function() {
            var that = this;
            that._tooltipTimeout = window.setTimeout(function(){
                var drag = that._drag || that._activeHandleDrag;
                if (drag) {
                    drag._removeTooltip();
                }
            }, 300);
        },

        _clearTooltipTimeout: function() {
            var that = this;
            window.clearTimeout(this._tooltipTimeout);
            var drag = that._drag || that._activeHandleDrag;
            if (drag && drag.tooltipDiv) {
                drag.tooltipDiv.stop(true, false).css("opacity", 1);
            }
        }
    });

    function createWrapper (options, element, isHorizontal) {
        var orientationCssClass = isHorizontal ? " k-slider-horizontal" : " k-slider-vertical",
            style = options.style ? options.style : element.attr("style"),
            cssClasses = element.attr("class") ? (" " + element.attr("class")) : "",
            tickPlacementCssClass = "";

        if (options.tickPlacement == "bottomRight") {
            tickPlacementCssClass = " k-slider-bottomright";
        } else if (options.tickPlacement == "topLeft") {
            tickPlacementCssClass = " k-slider-topleft";
        }

        style = style ? " style='" + style + "'" : "";

        return "<div class='k-widget k-slider" + orientationCssClass + cssClasses + "'" + style + ">" +
               "<div class='k-slider-wrap" + (options.showButtons ? " k-slider-buttons" : "") + tickPlacementCssClass +
               "'></div></div>";
    }

    function createButton (options, type, isHorizontal) {
        var buttonCssClass = "";

        if (type == "increase") {
            buttonCssClass = isHorizontal ? "k-i-arrow-e" : "k-i-arrow-n";
        } else {
            buttonCssClass = isHorizontal ? "k-i-arrow-w" : "k-i-arrow-s";
        }

        return "<a class='k-button k-button-" + type + "'><span class='k-icon " + buttonCssClass +
               "' title='" + options[type + "ButtonTitle"] + "'>" + options[type + "ButtonTitle"] + "</span></a>";
    }

    function createSliderItems (options, distance) {
        var result = "<ul class='k-reset k-slider-items'>",
            count = math.floor(round(distance / options.smallStep)) + 1,
            i;

        for(i = 0; i < count; i++) {
            result += "<li class='k-tick' role='presentation'>&nbsp;</li>";
        }

        result += "</ul>";

        return result;
    }

    function createTrack (options, element) {
        var dragHandleCount = element.is("input") ? 1 : 2,
            firstDragHandleTitle = dragHandleCount == 2 ? options.leftDragHandleTitle : options.dragHandleTitle;

        return "<div class='k-slider-track'><div class='k-slider-selection'><!-- --></div>" +
               "<a href='#' class='k-draghandle' title='" + firstDragHandleTitle + "' role='slider' aria-valuemin='" + options.min + "' aria-valuemax='" + options.max + "' aria-valuenow='" + (dragHandleCount > 1 ? (options.selectionStart || options.min) : options.value || options.min) + "'>Drag</a>" +
               (dragHandleCount > 1 ? "<a href='#' class='k-draghandle' title='" + options.rightDragHandleTitle + "'role='slider' aria-valuemin='" + options.min + "' aria-valuemax='" + options.max + "' aria-valuenow='" + (options.selectionEnd || options.max) + "'>Drag</a>" : "") +
               "</div>";
    }

    function step(stepValue) {
        return function (value) {
            return value + stepValue;
        };
    }

    function setValue(value) {
        return function () {
            return value;
        };
    }

    function formatValue(value) {
        return (value + "").replace(".", kendo.cultures.current.numberFormat["."]);
    }

    function round(value) {
        value = parseFloat(value, 10);
        var power = math.pow(10, PRECISION || 0);
        return math.round(value * power) / power;
    }

    function parseAttr(element, name) {
        var value = parse(element.getAttribute(name));
        if (value === null) {
            value = undefined;
        }
        return value;
    }

    function defined(value) {
        return typeof value !== UNDEFINED;
    }

    var Slider = SliderBase.extend({
        init: function(element, options) {
            var that = this,
                dragHandle;

            element.type = "text";
            options = extend({}, {
                value: parseAttr(element, "value"),
                min: parseAttr(element, "min"),
                max: parseAttr(element, "max"),
                smallStep: parseAttr(element, "step")
            }, options);

            element = $(element);

            if (options && options.enabled === undefined) {
                options.enabled = !element.is("[disabled]");
            }

            SliderBase.fn.init.call(that, element, options);
            options = that.options;
            if (!defined(options.value) || options.value === null) {
                options.value = options.min;
                element.val(options.min);
            }
            options.value = math.max(math.min(options.value, options.max), options.min);

            dragHandle = that.wrapper.find(DRAG_HANDLE);

            new Slider.Selection(dragHandle, that, options);
            that._drag = new Slider.Drag(dragHandle, "", that, options);
        },

        options: {
            name: "Slider",
            showButtons: true,
            increaseButtonTitle: "Increase",
            decreaseButtonTitle: "Decrease",
            dragHandleTitle: "drag",
            tooltip: { format: "{0:#,#.##}" },
            value: null
        },

        enable: function (enable) {
            var that = this,
                options = that.options,
                clickHandler,
                move;

            that.disable();
            if (enable === false) {
                return;
            }

            that.wrapper
                .removeClass(STATE_DISABLED)
                .addClass(STATE_DEFAULT);

            that.wrapper.find("input").removeAttr(DISABLED);

            clickHandler = function (e) {
                var touch = getTouches(e)[0];

                if (!touch) {
                    return;
                }

                var mousePosition = that._isHorizontal ? touch.location.pageX : touch.location.pageY,
                    dragableArea = that._getDraggableArea(),
                    target = $(e.target);

                if (target.hasClass("k-draghandle")) {
                    target.addClass(STATE_FOCUSED + " " + STATE_SELECTED);
                    return;
                }

                that._update(that._getValueFromPosition(mousePosition, dragableArea));

                that._focusWithMouse(e.target);

                that._drag.dragstart(e);
                e.preventDefault();
            };

            that.wrapper
                .find(TICK_SELECTOR + ", " + TRACK_SELECTOR)
                    .on(TRACK_MOUSE_DOWN, clickHandler)
                    .end()
                    .on(TRACK_MOUSE_DOWN, function() {
                        $(document.documentElement).one("selectstart", kendo.preventDefault);
                    })
                    .on(TRACK_MOUSE_UP, function() {
                        that._drag._end();
                    });

            that.wrapper
                .find(DRAG_HANDLE)
                .attr(TABINDEX, 0)
                .on(MOUSE_UP, function () {
                    that._setTooltipTimeout();
                })
                .on(CLICK, function (e) {
                    that._focusWithMouse(e.target);
                    e.preventDefault();
                })
                .on(FOCUS, proxy(that._focus, that))
                .on(BLUR, proxy(that._blur, that));

            move = proxy(function (sign) {
                var newVal = that._nextValueByIndex(that._valueIndex + (sign * 1));
                that._setValueInRange(newVal);
                that._drag._updateTooltip(newVal);
            }, that);

            if (options.showButtons) {
                var mouseDownHandler = proxy(function(e, sign) {
                    this._clearTooltipTimeout();
                    if (e.which === 1 || (support.touch && e.which === 0)) {
                        move(sign);

                        this.timeout = setTimeout(proxy(function () {
                            this.timer = setInterval(function () {
                                move(sign);
                            }, 60);
                        }, this), 200);
                    }
                }, that);

                that.wrapper.find(".k-button")
                    .on(MOUSE_UP, proxy(function (e) {
                        this._clearTimer();
                        that._focusWithMouse(e.target);
                    }, that))
                    .on(MOUSE_OVER, function (e) {
                        $(e.currentTarget).addClass("k-state-hover");
                    })
                    .on("mouseout" + NS, proxy(function (e) {
                        $(e.currentTarget).removeClass("k-state-hover");
                        this._clearTimer();
                    }, that))
                    .eq(0)
                    .on(MOUSE_DOWN, proxy(function (e) {
                        mouseDownHandler(e, 1);
                    }, that))
                    .click(false)
                    .end()
                    .eq(1)
                    .on(MOUSE_DOWN, proxy(function (e) {
                        mouseDownHandler(e, -1);
                    }, that))
                    .click(kendo.preventDefault);
            }

            that.wrapper
                .find(DRAG_HANDLE)
                .off(KEY_DOWN, false)
                .on(KEY_DOWN, proxy(this._keydown, that));

            options.enabled = true;
        },

        disable: function () {
            var that = this;

            that.wrapper
                .removeClass(STATE_DEFAULT)
                .addClass(STATE_DISABLED);

            $(that.element).prop(DISABLED, DISABLED);

            that.wrapper
                .find(".k-button")
                .off(MOUSE_DOWN)
                .on(MOUSE_DOWN, kendo.preventDefault)
                .off(MOUSE_UP)
                .on(MOUSE_UP, kendo.preventDefault)
                .off("mouseleave" + NS)
                .on("mouseleave" + NS, kendo.preventDefault)
                .off(MOUSE_OVER)
                .on(MOUSE_OVER, kendo.preventDefault);

            that.wrapper
                .find(TICK_SELECTOR + ", " + TRACK_SELECTOR).off(TRACK_MOUSE_DOWN).off(TRACK_MOUSE_UP);

            that.wrapper
                .find(DRAG_HANDLE)
                .attr(TABINDEX, -1)
                .off(MOUSE_UP)
                .off(KEY_DOWN)
                .off(CLICK)
                .off(FOCUS)
                .off(BLUR);

            that.options.enabled = false;
        },

        _update: function (val) {
            var that = this,
                change = that.value() != val;

            that.value(val);

            if (change) {
                that.trigger(CHANGE, { value: that.options.value });
            }
        },

        value: function (value) {
            var that = this,
                options = that.options;

            value = round(value);
            if (isNaN(value)) {
                return options.value;
            }

            if (value >= options.min && value <= options.max) {
                if (options.value != value) {
                    that.element.prop("value", formatValue(value));
                    options.value = value;
                    that._refreshAriaAttr(value);
                    that._refresh();
                }
            }
        },

        _refresh: function () {
            this.trigger(MOVE_SELECTION, { value: this.options.value });
        },

        _refreshAriaAttr: function(value) {
            var that = this,
                drag = that._drag,
                formattedValue;

            if (drag && drag._tooltipDiv) {
                formattedValue = drag._tooltipDiv.text();
            } else {
                formattedValue = that._getFormattedValue(value, null);
            }
            this.wrapper.find(DRAG_HANDLE).attr("aria-valuenow", value).attr("aria-valuetext", formattedValue);
        },

        _clearTimer: function () {
            clearTimeout(this.timeout);
            clearInterval(this.timer);
        },

        _keydown: function (e) {
            var that = this;

            if (e.keyCode in that._keyMap) {
                that._clearTooltipTimeout();
                that._setValueInRange(that._keyMap[e.keyCode](that.options.value));
                that._drag._updateTooltip(that.value());
                e.preventDefault();
            }
        },

        _setValueInRange: function (val) {
            var that = this,
                options = that.options;

            val = round(val);
            if (isNaN(val)) {
                that._update(options.min);
                return;
            }

            val = math.max(math.min(val, options.max), options.min);
            that._update(val);
        },

        _nextValueByIndex: function (index) {
            var count = this._values.length;
            if (this._isRtl) {
                index = count - 1 - index;
            }
            return this._values[math.max(0, math.min(index, count - 1))];
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.wrapper.off(NS)
                .find(".k-button").off(NS)
                .end()
                .find(DRAG_HANDLE).off(NS)
                .end()
                .find(TICK_SELECTOR + ", " + TRACK_SELECTOR).off(NS)
                .end();

            that._drag.draggable.destroy();
            that._drag._removeTooltip(true);
        }
    });

    Slider.Selection = function (dragHandle, that, options) {
        function moveSelection (val) {
            var selectionValue = val - options.min,
                index = that._valueIndex = math.ceil(round(selectionValue / options.smallStep)),
                selection = parseInt(that._pixelSteps[index], 10),
                selectionDiv = that._trackDiv.find(".k-slider-selection"),
                halfDragHanndle = parseInt(dragHandle[that._outerSize]() / 2, 10),
                rtlCorrection = that._isRtl ? 2 : 0;

            selectionDiv[that._sizeFn](that._isRtl ? that._maxSelection - selection : selection);
            dragHandle.css(that._position, selection - halfDragHanndle - rtlCorrection);
        }

        moveSelection(options.value);

        that.bind([CHANGE, SLIDE, MOVE_SELECTION], function (e) {
            moveSelection(parseFloat(e.value, 10));
        });
    };

    Slider.Drag = function (element, type, owner, options) {
        var that = this;
        that.owner = owner;
        that.options = options;
        that.element = element;
        that.type = type;

        that.draggable = new Draggable(element, {
            distance: 0,
            dragstart: proxy(that._dragstart, that),
            drag: proxy(that.drag, that),
            dragend: proxy(that.dragend, that),
            dragcancel: proxy(that.dragcancel, that)
        });

        element.click(false);
    };

    Slider.Drag.prototype = {
        dragstart: function(e) {
            // add reference to the last active drag handle.
            this.owner._activeDragHandle = this;
            // HACK to initiate click on the line
            this.draggable.userEvents.cancel();
            this.draggable.userEvents._start(e);
        },

        _dragstart: function(e) {
            var that = this,
                owner = that.owner,
                options = that.options;

            if (!options.enabled) {
                e.preventDefault();
                return;
            }

            // add reference to the last active drag handle.
            this.owner._activeDragHandle = this;

            owner.element.off(MOUSE_OVER);
            owner.wrapper.find("." + STATE_FOCUSED).removeClass(STATE_FOCUSED + " " + STATE_SELECTED);
            that.element.addClass(STATE_FOCUSED + " " + STATE_SELECTED);
            $(document.documentElement).css("cursor", "pointer");

            that.dragableArea = owner._getDraggableArea();
            that.step = math.max(options.smallStep * (owner._maxSelection / owner._distance), 0);

            if (that.type) {
                that.selectionStart = options.selectionStart;
                that.selectionEnd = options.selectionEnd;
                owner._setZIndex(that.type);
            } else {
                that.oldVal = that.val = options.value;
            }

            that._removeTooltip(true);
            that._createTooltip();
        },

        _createTooltip: function() {
            var that = this,
                owner = that.owner,
                tooltip = that.options.tooltip,
                html = '',
                wnd = $(window),
                tooltipTemplate, colloutCssClass;

            if (!tooltip.enabled) {
                return;
            }

            if (tooltip.template) {
                tooltipTemplate = that.tooltipTemplate = kendo.template(tooltip.template);
            }

            $(".k-slider-tooltip").remove(); // if user changes window while tooltip is visible, a second one will be created
            that.tooltipDiv = $("<div class='k-widget k-tooltip k-slider-tooltip'><!-- --></div>").appendTo(document.body);

            html = owner._getFormattedValue(that.val || owner.value(), that);

            if (!that.type) {
                colloutCssClass = "k-callout-" + (owner._isHorizontal ? 's' : 'e');
                that.tooltipInnerDiv = "<div class='k-callout " + colloutCssClass + "'><!-- --></div>";
                html += that.tooltipInnerDiv;
            }

            that.tooltipDiv.html(html);

            that._scrollOffset = {
                top: wnd.scrollTop(),
                left: wnd.scrollLeft()
            };

            that.moveTooltip();
        },

        drag: function (e) {
            var that = this,
                owner = that.owner,
                x = e.x.location,
                y = e.y.location,
                startPoint = that.dragableArea.startPoint,
                endPoint = that.dragableArea.endPoint,
                slideParams;

            e.preventDefault();

            if (owner._isHorizontal) {
                if (owner._isRtl) {
                    that.val = that.constrainValue(x, startPoint, endPoint, x < endPoint);
                } else {
                    that.val = that.constrainValue(x, startPoint, endPoint, x >= endPoint);
                }
            } else {
                that.val = that.constrainValue(y, endPoint, startPoint, y <= endPoint);
            }

            if (that.oldVal != that.val) {
                that.oldVal = that.val;

                if (that.type) {
                    if (that.type == "firstHandle") {
                        if (that.val < that.selectionEnd) {
                            that.selectionStart = that.val;
                        } else {
                            that.selectionStart = that.selectionEnd = that.val;
                        }
                    } else {
                        if (that.val > that.selectionStart) {
                            that.selectionEnd = that.val;
                        } else {
                            that.selectionStart = that.selectionEnd = that.val;
                        }
                    }
                    slideParams = {
                        values: [that.selectionStart, that.selectionEnd],
                        value: [that.selectionStart, that.selectionEnd]
                    };
                } else {
                    slideParams = { value: that.val };
                }

                owner.trigger(SLIDE, slideParams);
            }

            that._updateTooltip(that.val);
        },

        _updateTooltip: function(val) {
            var that = this,
                options = that.options,
                tooltip = options.tooltip,
                html = "";

            if (!tooltip.enabled) {
                return;
            }

            if (!that.tooltipDiv) {
                that._createTooltip();
            }

            html = that.owner._getFormattedValue(round(val), that);

            if (!that.type) {
                html += that.tooltipInnerDiv;
            }

            that.tooltipDiv.html(html);
            that.moveTooltip();
        },

        dragcancel: function() {
            this.owner._refresh();
            $(document.documentElement).css("cursor", "");
            return this._end();
        },

        dragend: function() {
            var that = this,
                owner = that.owner;

            $(document.documentElement).css("cursor", "");

            if (that.type) {
                owner._update(that.selectionStart, that.selectionEnd);
            } else {
                owner._update(that.val);
                that.draggable.userEvents._disposeAll();
            }

            return that._end();
        },

        _end: function() {
            var that = this,
                owner = that.owner;

            owner._focusWithMouse(that.element);

            owner.element.on(MOUSE_OVER);

            return false;
        },

        _removeTooltip: function(noAnimation) {
            var that = this,
                owner = that.owner;

            if (that.tooltipDiv && owner.options.tooltip.enabled && owner.options.enabled) {
                if (noAnimation) {
                    that.tooltipDiv.remove();
                    that.tooltipDiv = null;
                } else {
                    that.tooltipDiv.fadeOut("slow", function(){
                        $(this).remove();
                        that.tooltipDiv = null;
                    });
                }
            }
        },

        moveTooltip: function () {
            var that = this,
                owner = that.owner,
                top = 0,
                left = 0,
                element = that.element,
                offset = kendo.getOffset(element),
                margin = 8,
                viewport = $(window),
                callout = that.tooltipDiv.find(".k-callout"),
                width = that.tooltipDiv.outerWidth(),
                height = that.tooltipDiv.outerHeight(),
                dragHandles, sdhOffset, diff, anchorSize;

            if (that.type) {
                dragHandles = owner.wrapper.find(DRAG_HANDLE);
                offset = kendo.getOffset(dragHandles.eq(0));
                sdhOffset = kendo.getOffset(dragHandles.eq(1));

                if (owner._isHorizontal) {
                    top = sdhOffset.top;
                    left = offset.left + ((sdhOffset.left - offset.left) / 2);
                } else {
                    top = offset.top + ((sdhOffset.top - offset.top) / 2);
                    left = sdhOffset.left;
                }

                anchorSize = dragHandles.eq(0).outerWidth() + 2 * margin;
            } else {
                top = offset.top;
                left = offset.left;
                anchorSize = element.outerWidth() + 2 * margin;
            }

            if (owner._isHorizontal) {
                left -= parseInt((width - element[owner._outerSize]()) / 2, 10);
                top -= height + callout.height() + margin;
            } else {
                top -= parseInt((height - element[owner._outerSize]()) / 2, 10);
                left -= width + callout.width() + margin;
            }

            if (owner._isHorizontal) {
                diff = that._flip(top, height, anchorSize, viewport.outerHeight() + that._scrollOffset.top);
                top += diff;
                left += that._fit(left, width, viewport.outerWidth() + that._scrollOffset.left);
            } else {
                diff = that._flip(left, width, anchorSize, viewport.outerWidth() + that._scrollOffset.left);
                top += that._fit(top, height, viewport.outerHeight() + that._scrollOffset.top);
                left += diff;
            }

            if (diff > 0 && callout) {
                callout.removeClass();
                callout.addClass("k-callout k-callout-" + (owner._isHorizontal ? "n" : "w"));
            }

            that.tooltipDiv.css({ top: top, left: left });
        },

        _fit: function(position, size, viewPortEnd) {
            var output = 0;

            if (position + size > viewPortEnd) {
                output = viewPortEnd - (position + size);
            }

            if (position < 0) {
                output = -position;
            }

            return output;
        },

        _flip: function(offset, size, anchorSize, viewPortEnd) {
            var output = 0;

            if (offset + size > viewPortEnd) {
                output += -(anchorSize + size);
            }

            if (offset + output < 0) {
                output += anchorSize + size;
            }

            return output;
        },

        constrainValue: function (position, min, max, maxOverflow) {
            var that = this,
                val = 0;

            if (min < position && position < max) {
                val = that.owner._getValueFromPosition(position, that.dragableArea);
            } else {
                if (maxOverflow ) {
                    val = that.options.max;
                } else {
                    val = that.options.min;
                }
            }

            return val;
        }

    };

    kendo.ui.plugin(Slider);

    var RangeSlider = SliderBase.extend({
        init: function(element, options) {
            var that = this,
                inputs = $(element).find("input"),
                firstInput = inputs.eq(0)[0],
                secondInput = inputs.eq(1)[0];

            firstInput.type = "text";
            secondInput.type = "text";

            options = extend({}, {
                selectionStart: parseAttr(firstInput, "value"),
                min: parseAttr(firstInput, "min"),
                max: parseAttr(firstInput, "max"),
                smallStep: parseAttr(firstInput, "step")
            }, {
                selectionEnd: parseAttr(secondInput, "value"),
                min: parseAttr(secondInput, "min"),
                max: parseAttr(secondInput, "max"),
                smallStep: parseAttr(secondInput, "step")
            }, options);

            if (options && options.enabled === undefined) {
                options.enabled = !inputs.is("[disabled]");
            }

            SliderBase.fn.init.call(that, element, options);
            options = that.options;
            if (!defined(options.selectionStart) || options.selectionStart === null) {
                options.selectionStart = options.min;
                inputs.eq(0).val(options.min);
            }

            if (!defined(options.selectionEnd) || options.selectionEnd === null) {
                options.selectionEnd = options.max;
                inputs.eq(1).val(options.max);
            }

            var dragHandles = that.wrapper.find(DRAG_HANDLE);

            new RangeSlider.Selection(dragHandles, that, options);
            that._firstHandleDrag = new Slider.Drag(dragHandles.eq(0), "firstHandle", that, options);
            that._lastHandleDrag = new Slider.Drag(dragHandles.eq(1), "lastHandle" , that, options);
        },

        options: {
            name: "RangeSlider",
            leftDragHandleTitle: "drag",
            rightDragHandleTitle: "drag",
            tooltip: { format: "{0:#,#.##}" },
            selectionStart: null,
            selectionEnd: null
        },

        enable: function (enable) {
            var that = this,
                options = that.options,
                clickHandler;

            that.disable();
            if (enable === false) {
                return;
            }

            that.wrapper
                .removeClass(STATE_DISABLED)
                .addClass(STATE_DEFAULT);

            that.wrapper.find("input").removeAttr(DISABLED);

            clickHandler = function (e) {
                var touch = getTouches(e)[0];

                if (!touch) {
                    return;
                }

                var mousePosition = that._isHorizontal ? touch.location.pageX : touch.location.pageY,
                    dragableArea = that._getDraggableArea(),
                    val = that._getValueFromPosition(mousePosition, dragableArea),
                    target = $(e.target),
                    from, to, drag;

                if (target.hasClass("k-draghandle")) {
                    that.wrapper.find("." + STATE_FOCUSED).removeClass(STATE_FOCUSED + " " + STATE_SELECTED);
                    target.addClass(STATE_FOCUSED + " " + STATE_SELECTED);
                    return;
                }

                if (val < options.selectionStart) {
                    from = val;
                    to = options.selectionEnd;
                    drag = that._firstHandleDrag;
                } else if (val > that.selectionEnd) {
                    from = options.selectionStart;
                    to = val;
                    drag = that._lastHandleDrag;
                } else {
                    if (val - options.selectionStart <= options.selectionEnd - val) {
                        from = val;
                        to = options.selectionEnd;
                        drag = that._firstHandleDrag;
                    } else {
                        from = options.selectionStart;
                        to = val;
                        drag = that._lastHandleDrag;
                    }
                }

                drag.dragstart(e);
                that._setValueInRange(from, to);
                that._focusWithMouse(drag.element);
            };

            that.wrapper
                .find(TICK_SELECTOR + ", " + TRACK_SELECTOR)
                    .on(TRACK_MOUSE_DOWN, clickHandler)
                    .end()
                    .on(TRACK_MOUSE_DOWN, function() {
                        $(document.documentElement).one("selectstart", kendo.preventDefault);
                    })
                    .on(TRACK_MOUSE_UP, function() {
                        if (that._activeDragHandle) {
                            that._activeDragHandle._end();
                        }
                    });

            that.wrapper
                .find(DRAG_HANDLE)
                .attr(TABINDEX, 0)
                .on(MOUSE_UP, function () {
                    that._setTooltipTimeout();
                })
                .on(CLICK, function (e) {
                    that._focusWithMouse(e.target);
                    e.preventDefault();
                })
                .on(FOCUS, proxy(that._focus, that))
                .on(BLUR, proxy(that._blur, that));

            that.wrapper.find(DRAG_HANDLE)
                .off(KEY_DOWN, kendo.preventDefault)
                .eq(0).on(KEY_DOWN,
                    proxy(function(e) {
                        this._keydown(e, "firstHandle");
                    }, that)
                )
                .end()
                .eq(1).on(KEY_DOWN,
                    proxy(function(e) {
                        this._keydown(e, "lastHandle");
                    }, that)
                );

            that.options.enabled = true;
        },

        disable: function () {
            var that = this;

            that.wrapper
                .removeClass(STATE_DEFAULT)
                .addClass(STATE_DISABLED);

            that.wrapper.find("input").prop(DISABLED, DISABLED);

            that.wrapper
                .find(TICK_SELECTOR + ", " + TRACK_SELECTOR).off(TRACK_MOUSE_DOWN).off(TRACK_MOUSE_UP);

            that.wrapper
                .find(DRAG_HANDLE)
                .attr(TABINDEX, -1)
                .off(MOUSE_UP)
                .off(KEY_DOWN)
                .off(CLICK)
                .off(FOCUS)
                .off(BLUR);

            that.options.enabled = false;
        },

        _keydown: function (e, handle) {
            var that = this,
                selectionStartValue = that.options.selectionStart,
                selectionEndValue = that.options.selectionEnd,
                dragSelectionStart,
                dragSelectionEnd,
                activeHandleDrag;

            if (e.keyCode in that._keyMap) {

                that._clearTooltipTimeout();

                if (handle == "firstHandle") {
                    activeHandleDrag = that._activeHandleDrag = that._firstHandleDrag;
                    selectionStartValue = that._keyMap[e.keyCode](selectionStartValue);

                    if (selectionStartValue > selectionEndValue) {
                        selectionEndValue = selectionStartValue;
                    }
                } else {
                    activeHandleDrag = that._activeHandleDrag = that._lastHandleDrag;
                    selectionEndValue = that._keyMap[e.keyCode](selectionEndValue);

                    if (selectionStartValue > selectionEndValue) {
                        selectionStartValue = selectionEndValue;
                    }
                }

                that._setValueInRange(selectionStartValue, selectionEndValue);

                dragSelectionStart = Math.max(selectionStartValue, that.options.selectionStart);
                dragSelectionEnd = Math.min(selectionEndValue, that.options.selectionEnd);

                activeHandleDrag.selectionEnd = Math.max(dragSelectionEnd, that.options.selectionStart);
                activeHandleDrag.selectionStart = Math.min(dragSelectionStart, that.options.selectionEnd);

                activeHandleDrag._updateTooltip(that.value()[that._activeHandle]);

                e.preventDefault();
            }
        },

        _update: function (selectionStart, selectionEnd) {
            var that = this,
                values = that.value();

            var change = values[0] != selectionStart || values[1] != selectionEnd;

            that.value([selectionStart, selectionEnd]);

            if (change) {
                that.trigger(CHANGE, {
                    values: [selectionStart, selectionEnd],
                    value: [selectionStart, selectionEnd]
                });
            }
        },

        value: function(value) {
            if (value && value.length) {
                return this._value(value[0], value[1]);
            } else {
                return this._value();
            }
        },

        _value: function(start, end) {
            var that = this,
                options = that.options,
                selectionStart = options.selectionStart,
                selectionEnd = options.selectionEnd;

            if (isNaN(start) && isNaN(end)) {
                return [selectionStart, selectionEnd];
            } else {
                start = round(start);
                end = round(end);
            }

            if (start >= options.min && start <= options.max &&
                end >= options.min && end <= options.max && start <= end) {
                if (selectionStart != start || selectionEnd != end) {
                    that.element.find("input")
                        .eq(0).prop("value", formatValue(start))
                        .end()
                        .eq(1).prop("value", formatValue(end));

                    options.selectionStart = start;
                    options.selectionEnd = end;
                    that._refresh();
                    that._refreshAriaAttr(start, end);
                }
            }
        },

        values: function (start, end) {
            if (isArray(start)) {
                return this._value(start[0], start[1]);
            } else {
                return this._value(start, end);
            }
        },

        _refresh: function() {
            var that = this,
                options = that.options;

            that.trigger(MOVE_SELECTION, {
                values: [options.selectionStart, options.selectionEnd],
                value: [options.selectionStart, options.selectionEnd]
            });

            if (options.selectionStart == options.max && options.selectionEnd == options.max) {
                that._setZIndex("firstHandle");
            }
        },

        _refreshAriaAttr: function(start, end) {
            var that = this,
                dragHandles = that.wrapper.find(DRAG_HANDLE),
                drag = that._activeHandleDrag,
                formattedValue;

            formattedValue = that._getFormattedValue([start, end], drag);

            dragHandles.eq(0).attr("aria-valuenow", start);
            dragHandles.eq(1).attr("aria-valuenow", end);
            dragHandles.attr("aria-valuetext", formattedValue);
        },

        _setValueInRange: function (selectionStart, selectionEnd) {
            var options = this.options;

            selectionStart = math.max(math.min(selectionStart, options.max), options.min);

            selectionEnd = math.max(math.min(selectionEnd, options.max), options.min);

            if (selectionStart == options.max && selectionEnd == options.max) {
                this._setZIndex("firstHandle");
            }

            this._update(math.min(selectionStart, selectionEnd), math.max(selectionStart, selectionEnd));
        },

        _setZIndex: function (type) {
            this.wrapper.find(DRAG_HANDLE).each(function (index) {
                $(this).css("z-index", type == "firstHandle" ? 1 - index : index);
            });
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);

            that.wrapper.off(NS)
                .find(TICK_SELECTOR + ", " + TRACK_SELECTOR).off(NS)
                .end()
                .find(DRAG_HANDLE).off(NS);

            that._firstHandleDrag.draggable.destroy();
            that._lastHandleDrag.draggable.destroy();
        }
    });

    RangeSlider.Selection = function (dragHandles, that, options) {
        function moveSelection(value) {
            value = value || [];
            var selectionStartValue = value[0] - options.min,
                selectionEndValue = value[1] - options.min,
                selectionStartIndex = math.ceil(round(selectionStartValue / options.smallStep)),
                selectionEndIndex = math.ceil(round(selectionEndValue / options.smallStep)),
                selectionStart = that._pixelSteps[selectionStartIndex],
                selectionEnd = that._pixelSteps[selectionEndIndex],
                halfHandle = parseInt(dragHandles.eq(0)[that._outerSize]() / 2, 10),
                rtlCorrection = that._isRtl ? 2 : 0;

            dragHandles.eq(0).css(that._position, selectionStart - halfHandle - rtlCorrection)
                       .end()
                       .eq(1).css(that._position, selectionEnd - halfHandle - rtlCorrection);

            makeSelection(selectionStart, selectionEnd);
        }

        function makeSelection(selectionStart, selectionEnd) {
            var selection,
                selectionPosition,
                selectionDiv = that._trackDiv.find(".k-slider-selection");

            selection = math.abs(selectionStart - selectionEnd);

            selectionDiv[that._sizeFn](selection);
            if (that._isRtl) {
                selectionPosition = math.max(selectionStart, selectionEnd);
                selectionDiv.css("right", that._maxSelection - selectionPosition - 1);
            } else {
                selectionPosition = math.min(selectionStart, selectionEnd);
                selectionDiv.css(that._position, selectionPosition - 1);
            }
        }

        moveSelection(that.value());

        that.bind([ CHANGE, SLIDE, MOVE_SELECTION ], function (e) {
            moveSelection(e.values);
        });
    };

    kendo.ui.plugin(RangeSlider);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
