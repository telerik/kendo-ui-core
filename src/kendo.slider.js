(function ($, window) {
    var kendo = window.kendo,
        Component = kendo.ui.Component,
        Draggable = kendo.ui.Draggable,
        keys = kendo.keys,
        extend = $.extend,
        proxy = $.proxy,
        math = Math,
        //events
        LOAD = "load",
        CHANGE = "change",
        SLIDE = "slide",
        CLICK = "click",
        MOVE_SELECTION = "moveSelection",
        //css selectors
        DRAGHANDLE_SELECTOR = ".t-draghandle",
        TRACK_SELECTOR = ".t-slider-track",
        TICK_SELECTOR = ".t-tick",
        //constants
        PRECISION = 3;

    function initSlider () {
        var that = this,
            options = that.options;

        that._distance = options.max - options.min;
        that._isHorizontal = options.orientation == "horizontal";
        that._position = that._isHorizontal ? "left" : "bottom";
        that._size = that._isHorizontal ? "width" : "height";

        options.tooltip.format = options.tooltip.enabled ? options.tooltip.format || "{0}" : "{0}";

        that._createHtml();
        that.wrapper = that.element.closest(".t-slider");
        that._trackDiv = that.wrapper.find(TRACK_SELECTOR);

        that._setTrackDivWidth();

        that._maxSelection = that._trackDiv[that._size]();

        var sizeBetweenTicks = that._maxSelection / ((options.max - options.min) / options.smallStep);
        var pixelWidths = that._calculateItemsWidth(math.floor(that._distance / options.smallStep));

        if (that.options.tickPlacement != "none" && sizeBetweenTicks >= 2) {
            that._trackDiv.before(createSliderItems(options, that._distance));
            that._setItemsWidth(pixelWidths);
            that._setItemsTitle();
            that._setItemsLargeTick();
        }

        that._calculateSteps(pixelWidths);

        that[options.enabled ? "enable" : "disable"]();

        that._keyMap = {
            37: step(-options.smallStep), // left arrow
            40: step(-options.smallStep), // down arrow
            39: step(+options.smallStep), // right arrow
            38: step(+options.smallStep), // up arrow
            35: setValue(options.max), // end
            36: setValue(options.min), // home
            33: step(+options.largeStep), // page up
            34: step(-options.largeStep)  // page down
        };

        that.bind([LOAD, CHANGE, SLIDE], options);
    }

    function createWrapper (options, element, isHorizontal) {
        var orientationCssClass = isHorizontal ? " t-slider-horizontal" : " t-slider-vertical",
            style = options.style ? options.style : element.attr("style"),
            cssClasses = element.attr("class") ? (" " + element.attr("class")) : "",
            tickPlacementCssClass = "";

        if (options.tickPlacement == "bottomRight") {
            tickPlacementCssClass = " t-slider-bottomright";
        } else if (options.tickPlacement == "topLeft") {
            tickPlacementCssClass = " t-slider-topleft";
        }

        style = style ? " style='" + style + "'" : "";

        return "<div class='t-widget t-slider" + orientationCssClass + cssClasses + "'" + style + ">" +
               "<div class='t-slider-wrap" + (options.showButtons ? " t-slider-buttons" : "") + tickPlacementCssClass +
               "'></div></div>";
    }

    function createButton (options, type, isHorizontal) {
        var buttonCssClass = "";

        if (type == "increase") {
            buttonCssClass = isHorizontal ? "t-arrow-next" : "t-arrow-up";
        } else {
            buttonCssClass = isHorizontal ? "t-arrow-prev" : "t-arrow-down";
        }

        return "<a class='t-button t-button-" + type + "'><span class='t-icon " + buttonCssClass +
               "' title='" + options[type + "ButtonTitle"] + "'>" + options[type + "ButtonTitle"] + "</span></a>";
    }

    function createSliderItems (options, distance) {
        var result = "<ul class='t-reset t-slider-items'>",
            count = math.floor(round(distance / options.smallStep, PRECISION)) + 1;

        for(i = 0; i < count; i++) {
            result += "<li class='t-tick'>&nbsp;</li>";
        }

        result += "</ul>";

        return result;
    }

    function createTrack (element) {
        var dragHandleCount = element.is("input") ? 1 : 2;

        return "<div class='t-slider-track'><div class='t-slider-selection'><!-- --></div>" +
               "<a href='javascript:void(0)' class='t-draghandle' title='Drag'>Drag</a>" +
               (dragHandleCount > 1 ? "<a href='javascript:void(0)' class='t-draghandle' title='Drag'>Drag</a>" : "") +
               "</div>";
    }

    function _createHtml () {
        var that = this,
            element = that.element,
            options = that.options;

        element.val(options.val);

        element.wrap(createWrapper(options, element, that._isHorizontal)).hide();

        if (options.showButtons) {
            element.before(createButton(options, "increase", that._isHorizontal))
                   .before(createButton(options, "decrease", that._isHorizontal));
        }

        element.before(createTrack(element));
    }

    var defaultOptions = {
        enabled: true,
        min: 0,
        max: 10,
        smallStep: 1,
        largeStep: 5,
        orientation: "horizontal",
        tickPlacement: "both",
        tooltip: { enabled: true, format: "{0}" }
    };

    var Slider = Component.extend({
        init: function(element, options) {
            var that = this;
            Component.fn.init.call(that, element, options);
            options = that.options;
            initSlider.call(that);

            that._setValueInRange(that.options.val);

            var dragHandle = that.wrapper.find(DRAGHANDLE_SELECTOR);

            new Slider.Selection(dragHandle, that, that.options);
            new Slider.Drag(dragHandle, "", that, that.options);
        },

        options: extend({
            val: 0,
            showButtons: true,
            increaseButtonTitle: "Increase",
            decreaseButtonTitle: "Decrease"
        }, defaultOptions),

        enable: function () {
            var that = this,
                options = that.options;

            that.wrapper
                .removeAttr("disabled")
                .removeClass("t-state-disabled")
                .addClass("t-state-default");

            var clickHandler = function (e) {
                var mousePosition = that._isHorizontal ? e.pageX : e.pageY,
                    dragableArea = that._getDragableArea();

                that._update(that._getValueFromPosition(mousePosition, dragableArea));
            }

            that.wrapper
                .find(TICK_SELECTOR).bind(CLICK, clickHandler)
                .end()
                .find(TRACK_SELECTOR).bind(CLICK, clickHandler);

            var move = proxy(function (e, sign) {
                var index = math.ceil(options.val / options.smallStep);

                if (index >= that._valuesArray.length - 1 || index <= 0) {
                    this._setValueInRange(options.val + (sign * options.smallStep));
                } else {
                    this._setValueInRange(this._valuesArray[index + (sign * 1)]);
                }
            }, that);

            if (options.showButtons) {
                var mouseDownHandler = proxy(function(e, sign) {
                    if (e.which == 1) {
                        move(e, sign)

                        this.timeout = setTimeout(proxy(function () {
                            this.timer = setInterval(function () {
                                move(e, sign)
                            }, 60);
                        }, this), 200);
                    }
                }, that);

                that.wrapper.find(".t-button")
                    .bind("mouseup", proxy(function (e) {
                        this._clearTimer();
                    }, that))
                    .bind("mouseover", function (e) {
                        $(e.currentTarget).addClass("t-state-hover");
                    })
                    .bind("mouseout", proxy(function (e) {
                        $(e.currentTarget).removeClass("t-state-hover");
                        this._clearTimer();
                    }, that))
                    .eq(0)
                    .bind("mousedown", proxy(function (e) {
                        mouseDownHandler(e, 1);
                    }, that))
                    .end()
                    .eq(1)
                    .bind("mousedown", proxy(function (e) {
                        mouseDownHandler(e, -1);
                    }, that));
            }

            that.wrapper
                .find(DRAGHANDLE_SELECTOR).bind({
                    keydown: proxy(this._keydown, that)
                });

            options.enabled = true;
        },

        disable: function () {
            var that = this;

            that.wrapper
                .attr("disabled", "disabled")
                .removeClass("t-state-default")
                .addClass("t-state-disabled");

            that.wrapper
                .find(".t-button")
                .unbind("mousedown")
                .bind("mousedown", false)
                .unbind("mouseup")
                .bind("mouseup", false)
                .unbind("mouseleave")
                .bind("mouseleave", false)
                .unbind("mouseover")
                .bind("mouseover", false);

            that.wrapper
                .find(TICK_SELECTOR).unbind(CLICK)
                .end()
                .find(TRACK_SELECTOR).unbind(CLICK);

            that.wrapper
                .find(DRAGHANDLE_SELECTOR)
                .unbind("keydown")
                .bind("keydown", false)

            that.options.enabled = false;
        },

        _update: function (val) {
            var that = this,
                change = that.value() != val;

            that.value(val);

            if (change) {
                that.trigger(CHANGE, { value: that.options.val });
            }
        },

        value: function (val) {
            var that = this,
                options = that.options;

            val = round(val, PRECISION);
            if (isNaN(val)) {
                return options.val;
            }

            if (val >= options.min && val <= options.max) {
                if (options.val != val) {
                    that.element.val(val);
                    options.val = val;
                    that.refresh();
                }
            }
        },

        refresh: function () {
            this.trigger(MOVE_SELECTION, { value: this.options.val });
        },

        _clearTimer: function (e) {
            clearTimeout(this.timeout);
            clearInterval(this.timer);
        },

        _keydown: function (e) {
            var that = this;

            if (e.keyCode in that._keyMap) {
                that._setValueInRange(that._keyMap[e.keyCode](that.options.val));
                e.preventDefault();
            }
        },

        _setValueInRange: function (val) {
            var that = this,
                options = that.options;

            val = round(val, PRECISION);
            if (isNaN(val)) {
                that._update(options.min);
                return;
            }

            val = math.max(math.min(val, options.max), options.min);
            that._update(val);
        }
    });

    function _setTrackDivWidth () {
        var that = this,
            trackDivPosition = parseFloat(that._trackDiv.css(that._position), 10) * 2;

        that._trackDiv[that._size]((that.wrapper[that._size]() - 2) - trackDivPosition);
    }

    function _setItemsWidth (pixelWidths) {
        var that = this,
            options = that.options,
            itemsCount = math.floor(that._distance / options.smallStep),
            items = that.wrapper.find(TICK_SELECTOR),
            i;

        for (i = 0; i < items.length - 2; i++) {
            $(items[i + 1])[that._size](pixelWidths[i]);
        }

        if (that._isHorizontal) {
            $(items[0]).addClass("t-first")[that._size](pixelWidths[itemsCount]);
            $(items[items.length - 1]).addClass("t-last")[that._size](pixelWidths[itemsCount - 1]);
        } else {
            $(items[items.length - 1]).addClass("t-first")[that._size](pixelWidths[itemsCount - 1]);
            $(items[0]).addClass("t-last")[that._size](pixelWidths[itemsCount]);
        }

        if (that._distance % options.smallStep != 0 && !that._isHorizontal) {
            var paddingTop = 0,
                bordersWidth = 2,
                selection = 0;
            for (i = 0; i < pixelWidths.length; i++) {
                selection += pixelWidths[i];
            }

            paddingTop = that._maxSelection - selection;
            paddingTop += parseFloat(that._trackDiv.css(that._position), 10) + bordersWidth;

            that.wrapper.find(".t-slider-items").css("padding-top", paddingTop);
        }
    }

    function _setItemsTitle () {
        var that = this,
            options = that.options,
            items = that.wrapper.find(TICK_SELECTOR),
            titleNumber = options.min,
            i = that._isHorizontal ? 0 : items.length - 1,
            limit = that._isHorizontal ? items.length : -1,
            increment = that._isHorizontal ? 1 : -1;

        for (; i - limit != 0 ; i += increment) {
            $(items[i]).attr("title", kendo.format(options.tooltip.format, round(titleNumber, PRECISION)));
            titleNumber += options.smallStep;
        }
    }

    function _setItemsLargeTick () {
        var that = this,
            options = that.options
            i;

        if ((1000 * options.largeStep) % (1000 * options.smallStep) == 0) {
            var items = that.wrapper.find(TICK_SELECTOR),
                item = {},
                step = round(options.largeStep / options.smallStep, PRECISION);

            if (that._isHorizontal) {
                for (i = 0; i < items.length; i = round(i + step, PRECISION)) {
                    item = $(items[i]);

                    item.addClass("t-tick-large")
                        .html("<span class='t-label'>" + item.attr("title") + "</span>");
                }
            } else {
                for (i = items.length - 1; i >= 0; i = round(i - step, PRECISION)) {
                    item = $(items[i]);

                    item.addClass("t-tick-large")
                        .html("<span class='t-label'>" + item.attr("title") + "</span>");

                    if (i != 0 && i != items.length - 1) {
                        item.css("line-height", item[that._size]() + "px");
                    }
                }
            }
        }
    }

    function _calculateItemsWidth (itemsCount) {
        var that = this,
            options = that.options,
            trackDivSize = parseFloat(that._trackDiv.css(that._size)) + 1,
            pixelStep = trackDivSize / that._distance;

        if ((that._distance / options.smallStep) - math.floor(that._distance / options.smallStep) > 0) {
            trackDivSize -= ((that._distance % options.smallStep) * pixelStep);
        }

        var itemWidth = trackDivSize / itemsCount,
            pixelWidths = [];

        for (var i = 0; i < itemsCount - 1; i++) {
            pixelWidths[i] = itemWidth;
        }

        pixelWidths[itemsCount - 1] = pixelWidths[itemsCount] = itemWidth / 2;
        return that._roudWidths(pixelWidths);
    }

    function _roudWidths (pixelWidthsArray) {
        var balance = 0;

        for (i = 0; i < pixelWidthsArray.length; i++) {
            balance += (pixelWidthsArray[i] - math.floor(pixelWidthsArray[i]));
            pixelWidthsArray[i] = math.floor(pixelWidthsArray[i]);
        }

        balance = math.round(balance);

        return this._addAdditionalSize(balance, pixelWidthsArray);
    }

    function _addAdditionalSize (additionalSize, pixelWidthsArray) {
        if (additionalSize == 0) {
            return pixelWidthsArray;
        }

        //set step size
        var step = parseFloat(pixelWidthsArray.length - 1) / parseFloat(additionalSize == 1 ? additionalSize : additionalSize - 1);

        for (var i = 0; i < additionalSize; i++) {
            pixelWidthsArray[parseInt(math.round(step * i))] += 1;
        }

        return pixelWidthsArray;
    }

    function _calculateSteps (pixelWidths) {
        var that = this,
            options = that.options,
            val = options.min,
            selection = 0,
            itemsCount = pixelWidths.length;
            i = 1;

        pixelWidths.splice(0, 0, pixelWidths.pop() * 2);
        pixelWidths.splice(itemsCount, 1, pixelWidths.pop() * 2);

        that._pixelStepsArray = [selection];
        that._valuesArray = [val];

        if (itemsCount == 0) {
            return;
        }

        while (i < itemsCount) {
            selection += (pixelWidths[i - 1] + pixelWidths [i]) / 2;
            that._pixelStepsArray[i] = selection;
            that._valuesArray[i] = val += options.smallStep;

            i++;
        }

        var lastItem = options.max % options.smallStep == 0 ? itemsCount - 1 : itemsCount;

        that._pixelStepsArray[lastItem] = that._maxSelection;
        that._valuesArray[lastItem] = options.max;
    }

    function _getValueFromPosition (mousePosition, dragableArea) {
        var that = this,
            options = that.options,
            step = math.max(options.smallStep * (that._maxSelection / that._distance), 0),
            position = 0,
            halfStep = (step / 2),
            val = 0;

        if (that._isHorizontal) {
            position = mousePosition - dragableArea.startPoint;
        } else {
            position = dragableArea.startPoint - mousePosition;
        }

        if (that._maxSelection - ((parseInt(that._maxSelection % step) - 3) / 2) < position) {
            return options.max;
        }

        for (var i = 0; i < that._pixelStepsArray.length; i++) {
            if (math.abs(that._pixelStepsArray[i] - position) - 1 <= halfStep) {
                return round(that._valuesArray[i], PRECISION);
            }
        }
    }

    function _getDragableArea () {
        var that = this,
            offsetLeft = that._trackDiv.offset().left,
            offsetTop = that._trackDiv.offset().top;

        return {
            startPoint: that._isHorizontal ? offsetLeft : offsetTop + that._maxSelection,
            endPoint: that._isHorizontal ? offsetLeft + that._maxSelection : offsetTop
        };
    }

    function step(step) {
        return function (value) {
            return value + step;
        }
    }

    function setValue(value) {
        return function () {
            return value;
        }
    }

    function round(value, precision) {
        value = parseFloat(value, 10);
        var power = Math.pow(10, precision || 0);
        return Math.round(value * power) / power;
    }

    Slider.Selection = function (dragHandle, that, options) {
        function moveSelection (val) {
            var selectionValue = val - options.min,
                index = math.ceil(selectionValue / options.smallStep),
                selection = that._pixelStepsArray[index],
                selectionDiv = that._trackDiv.find(".t-slider-selection"),
                halfDragHanndle = parseInt(dragHandle[that._size]() / 2, 10) + 1;

            selectionDiv[that._size](selection);
            dragHandle.css(that._position, selection - halfDragHanndle);
        }

        moveSelection(that.value());

        var handler = function (e) {
            moveSelection(parseFloat(e.value, 10));
        };

        that.bind([CHANGE, SLIDE, MOVE_SELECTION], handler);
    }

    Slider.Drag = function (dragHandle, type, owner, options) {
        var that = this;
        that.owner = owner;
        that.options = options;
        that.dragHandle = dragHandle;
        that.dragHandleSize = dragHandle[owner._size]();
        that.type = type;

        new Draggable(dragHandle, {
            dragstart: proxy(that.dragstart, that),
            drag: proxy(that.drag, that),
            dragend: proxy(that.dragend, that)
        });
    };

    Slider.Drag.prototype = {
        dragstart: function (e) {
            var that = this,
                owner = that.owner,
                options = that.options;

            if (!options.enabled) {
                return false;
            }

            owner.element.unbind("mouseover");
            that.dragableArea = owner._getDragableArea();
            that.step = math.max(options.smallStep * (owner._maxSelection / owner._distance), 0);

            if (that.type) {
                that.selectionStart = options.selectionStart;
                that.selectionEnd = options.selectionEnd;
                owner._setZIndex(that.type);
            } else {
                that.oldVal = that.val = options.val;
            }

            if (options.tooltip.enabled) {
                that.tooltipDiv = $("<div class='t-widget t-tooltip'><!-- --></div>").appendTo(document.body);

                if (that.type) {
                    var formattedSelectionStart = kendo.format(options.tooltip.format, that.selectionStart),
                        formattedSelectionEnd = kendo.format(options.tooltip.format, that.selectionEnd);

                    that.tooltipDiv.html(formattedSelectionStart + " - " + formattedSelectionEnd );
                } else {
                    var tooltipArrow = "t-callout-";

                    if (owner._isHorizontal) {
                        tooltipArrow += options.tickPlacement == "topLeft" ? "n" : "s";
                    } else {
                        tooltipArrow += options.tickPlacement == "topLeft" ? "w" : "e";
                    }

                    that.tooltipInnerDiv = "<div class='t-callout " + tooltipArrow + "'><!-- --></div>";
                    that.tooltipDiv.html(kendo.format(options.tooltip.format, that.val) + that.tooltipInnerDiv);
                }

                that.moveTooltip(that.tooltipDiv);
            }
        },

        drag: function (e) {
            var that = this,
                owner = that.owner,
                options = that.options;

            if (owner._isHorizontal) {
                that.val = that.horizontalDrag(e);
            } else {
                that.val = that.verticalDrag(e);
            }

            if (that.oldVal != that.val) {
                that.oldVal = that.val;

                if (that.type) {
                    if (that.type == "leftHandle") {
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

                    owner.trigger(SLIDE, { values: [that.selectionStart, that.selectionEnd] });

                    if (options.tooltip.enabled) {
                        var formattedSelectionStart = kendo.format(options.tooltip.format, that.selectionStart),
                            formattedSelectionEnd = kendo.format(options.tooltip.format, that.selectionEnd);

                        that.tooltipDiv.html(formattedSelectionStart + " - " + formattedSelectionEnd );
                    }
                } else {
                    owner.trigger(SLIDE, { value: that.val });

                    if (options.tooltip.enabled) {
                        that.tooltipDiv.html(kendo.format(options.tooltip.format, that.val) + that.tooltipInnerDiv);
                    }
                }

                if (options.tooltip.enabled) {
                    that.moveTooltip();
                }
            }
        },

        dragend: function (e) {
            var that = this,
                owner = that.owner;

            if (e.keyCode == kendo.keys.ESC) {
                owner.refresh();
            } else {
                if (that.type) {
                    owner._update(that.selectionStart, that.selectionEnd);
                } else {
                    owner._update(that.val);
                }
            }

            if (owner.options.tooltip.enabled) {
                that.tooltipDiv.remove();
            }

            owner.element.bind("mouseover");

            return false;
        },

        moveTooltip: function () {
            var that = this
                owner = that.owner,
                positionTop = 0,
                positionLeft = 0;

            if (that.type) {
                var dragHandles = owner.wrapper.find(DRAGHANDLE_SELECTOR),
                    firstDragHandleOffset = dragHandles.eq(0).offset(),
                    secondDragHandleOffset = dragHandles.eq(1).offset();

                if (owner._isHorizontal) {
                    positionTop = secondDragHandleOffset.top;
                    positionLeft = firstDragHandleOffset.left + ((secondDragHandleOffset.left - firstDragHandleOffset.left) / 2);
                } else {
                    positionTop = firstDragHandleOffset.top + ((secondDragHandleOffset.top - firstDragHandleOffset.top) / 2);
                    positionLeft = secondDragHandleOffset.left;
                }
            } else {
                var dragHandleOffset = that.dragHandle.offset();

                positionTop = dragHandleOffset.top;
                positionLeft = dragHandleOffset.left;
            }

            var halfTooltipDiv = that.tooltipDiv[owner._size]() / 2 + 1,
                margin = 10,
                dragHandleOffset = that.dragHandle.offset();

            if (owner._isHorizontal) {
                positionLeft -= halfTooltipDiv;

                if (owner.options.tickPlacement != "topLeft") {
                    positionTop = dragHandleOffset.top - that.dragHandle.height() - that.tooltipDiv.height();
                } else {
                    positionTop = dragHandleOffset.top + that.dragHandle.height() + margin;
                }
            } else {
                positionTop -= halfTooltipDiv;

                if (owner.options.tickPlacement != "topLeft") {
                    positionLeft = dragHandleOffset.left - that.dragHandle.width() - that.tooltipDiv.width() - 2;
                } else {
                    positionLeft = dragHandleOffset.left + that.dragHandle.width() + margin;
                }
            }

            that.tooltipDiv.css({ top: positionTop, left: positionLeft });
        },

        horizontalDrag: function (mousePosition) {
            var that = this,
                val = 0;

            if (that.dragableArea.startPoint < mousePosition.pageX && mousePosition.pageX < that.dragableArea.endPoint) {
                val = that.owner._getValueFromPosition(mousePosition.pageX, that.dragableArea);
            } else if (mousePosition.pageX >= that.dragableArea.endPoint) {
                val = that.options.max;
            } else {
                val = that.options.min;
            }

            return val;
        },

        verticalDrag: function (mousePosition) {
            var that = this,
                val = 0;

            if (that.dragableArea.startPoint > mousePosition.pageY && mousePosition.pageY > that.dragableArea.endPoint) {
                val = that.owner._getValueFromPosition(mousePosition.pageY, that.dragableArea);
            } else if (mousePosition.pageY <= that.dragableArea.endPoint) {
                val = that.options.max;
            } else {
                val = that.options.min;
            }

            return val;
        }
    }

    kendo.ui.plugin("Slider", Slider);

    //
    // RangeSlider
    //

    var RangeSlider = Component.extend({
        init: function(element, options) {
            var that = this;
            Component.fn.init.call(that, element, options);
            options = that.options;
            initSlider.call(that);

            that._setValueInRange(options.selectionStart, options.selectionEnd);

            var dragHandles = that.wrapper.find(DRAGHANDLE_SELECTOR);

            new RangeSlider.Selection(dragHandles, that, options);
            new Slider.Drag(dragHandles.eq(0), "leftHandle", that, options);
            new Slider.Drag(dragHandles.eq(1), "rightHandle" , that, options);
        },

        options: extend({
            selectionStart: 0,
            selectionEnd: 10
        }, defaultOptions),

        enable: function () {
            var that = this,
                options = that.options;

            that.wrapper
                .removeAttr("disabled")
                .removeClass("t-state-disabled")
                .addClass("t-state-default");

            var clickHandler = function (e) {
                var mousePosition = that._isHorizontal ? e.pageX : e.pageY,
                    dragableArea = that._getDragableArea(),
                    val = that._getValueFromPosition(mousePosition, dragableArea);

                if (val < options.selectionStart) {
                    that._setValueInRange(val, options.selectionEnd);
                } else if (val > that.selectionEnd) {
                    that._setValueInRange(options.selectionStart, val);
                } else {
                    if (val - options.selectionStart <= options.selectionEnd - val) {
                        that._setValueInRange(val, options.selectionEnd);
                    } else {
                        that._setValueInRange(options.selectionStart, val);
                    }
                }
            };

            that.wrapper
                .find(TICK_SELECTOR).bind(CLICK, clickHandler)
                .end()
                .find(TRACK_SELECTOR).bind(CLICK, clickHandler);

            that.wrapper.find(DRAGHANDLE_SELECTOR)
                .eq(0).bind({
                    keydown: proxy(function(e) {
                        this._keydown(e, "leftHandle");
                    }, that)
                })
                .end()
                .eq(1).bind({
                    keydown: proxy(function(e) {
                        this._keydown(e, "rightHandle");
                    }, that)
                });

            that.enabled = true;
        },

        disable: function () {
            var that = this,
                options = that.options;

            that.wrapper
                .attr("disabled", "disabled")
                .removeClass("t-state-default")
                .addClass("t-state-disabled");

            that.wrapper
                .find(TICK_SELECTOR).unbind(CLICK)
                .end()
                .find(TRACK_SELECTOR).unbind(CLICK);

            that.wrapper
                .find(DRAGHANDLE_SELECTOR)
                .unbind("keydown")
                .bind("keydown", false);

            that.enabled = false;
        },

        _keydown: function (e, handle) {
            var that = this,
                selectionStartValue = that.options.selectionStart,
                selectionEndValue = that.options.selectionEnd;

            if (e.keyCode in that._keyMap) {
                if (handle == "leftHandle") {
                    selectionStartValue = that._keyMap[e.keyCode](selectionStartValue);

                    if (selectionStartValue > selectionEndValue) {
                        selectionEndValue = selectionStartValue;
                    }
                } else {
                    selectionEndValue = that._keyMap[e.keyCode](selectionEndValue);

                    if (selectionStartValue > selectionEndValue) {
                        selectionStartValue = selectionEndValue;
                    }
                }

                that._setValueInRange(selectionStartValue, selectionEndValue);
                e.preventDefault();
            }
        },

        _update: function (selectionStart, selectionEnd) {
            var that = this,
                values = that.values();

            var change = values[0] != selectionStart || values[1] != selectionEnd;

            that.values(selectionStart, selectionEnd);

            if (change) {
                that.trigger(CHANGE, { values: [selectionStart, selectionEnd] });
            }
        },

        values: function () {
            var that = this,
                options = that.options,
                selectionStart = 0,
                selectionEnd = 0;

            if (arguments.length == 0) {
                return [options.selectionStart, options.selectionEnd];
            } else if (arguments.length == 1 && $.isArray(arguments[0])) {
                selectionStart = arguments[0][0];
                selectionEnd = arguments[0][1];
            } else {
                selectionStart = round(arguments[0], PRECISION);
                selectionEnd = round(arguments[1], PRECISION);
            }

            if (selectionStart >= options.min && selectionStart <= options.max
            && selectionEnd >= options.min && selectionEnd <= options.max && selectionStart <= selectionEnd) {
                if (options.selectionStart != selectionStart || options.selectionEnd != selectionEnd) {
                    that.element.find("input")
                                .eq(0).val(selectionStart)
                                .end()
                                .eq(1).val(selectionEnd);

                    options.selectionStart = selectionStart;
                    options.selectionEnd = selectionEnd;
                    that.refresh();
                }
            }
        },

        refresh: function() {
            var that = this,
                options = that.options;

            that.trigger(MOVE_SELECTION, { values: [options.selectionStart, options.selectionEnd] });

            if (options.selectionStart == options.max && options.selectionEnd == options.max) {
                that._setZIndex("leftHandle");
            }
        },

        _setValueInRange: function (selectionStart, selectionEnd) {
            var options = this.options;

            selectionStart = math.max(math.min(selectionStart, options.max), options.min);

            selectionEnd = math.max(math.min(selectionEnd, options.max), options.min);

            if (selectionStart == options.max && selectionEnd == options.max) {
                this._setZIndex("leftHandle");
            }

            this._update(math.min(selectionStart, selectionEnd), math.max(selectionStart, selectionEnd));
        },

        _setZIndex: function (type) {
            this.wrapper.find(DRAGHANDLE_SELECTOR).each(function (index) {
                $(this).css("z-index", type == "leftHandle" ? 1 - index : index);
            });
        }
    });

    RangeSlider.Selection = function (dragHandles, that, options) {
        function moveSelection(values) {
            var selectionStartValue = values[0] - options.min,
                selectionEndValue = values[1] - options.min,
                selectionStartIndex = math.ceil(selectionStartValue / options.smallStep),
                selectionEndIndex = math.ceil(selectionEndValue / options.smallStep),
                selectionStart = that._pixelStepsArray[selectionStartIndex],
                selectionEnd = that._pixelStepsArray[selectionEndIndex],
                halfHandle = parseInt(dragHandles.eq(0)[that._size]() / 2, 10) + 1;

            dragHandles.eq(0).css(that._position, selectionStart - halfHandle)
                       .end()
                       .eq(1).css(that._position, selectionEnd - halfHandle);

            makeSelection(selectionStart, selectionEnd);
        }

        function makeSelection(selectionStart, selectionEnd) {
            var selection = 0,
                selectionPosition = 0,
                selectionDiv = that._trackDiv.find(".t-slider-selection");

            selection = math.abs(selectionStart - selectionEnd);
            selectionPosition = selectionStart < selectionEnd ? selectionStart : selectionEnd;

            selectionDiv[that._size](selection);
            selectionDiv.css(that._position, selectionPosition - 1);
        }

        var inputs = that.element.find("input");

        moveSelection(that.values());

        var handler = function (e) {
            moveSelection(e.values);
        };

        that.bind([ CHANGE, SLIDE, MOVE_SELECTION ], handler);
    }

    var methods = {
        _setTrackDivWidth: _setTrackDivWidth,
        _setItemsWidth: _setItemsWidth,
        _setItemsTitle: _setItemsTitle,
        _setItemsLargeTick: _setItemsLargeTick,
        _calculateItemsWidth: _calculateItemsWidth,
        _roudWidths: _roudWidths,
        _addAdditionalSize: _addAdditionalSize,
        _calculateSteps: _calculateSteps,
        _getValueFromPosition: _getValueFromPosition,
        _getDragableArea: _getDragableArea,
        _createHtml: _createHtml
    };

    extend(Slider.prototype, methods);
    extend(RangeSlider.prototype, methods);

    kendo.ui.plugin("RangeSlider", RangeSlider);

})(jQuery, window);
