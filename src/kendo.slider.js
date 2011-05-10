(function ($, window) {
    var kendo = window.kendo,
        Component = kendo.ui.Component,
        Draggable = kendo.ui.Draggable,
        //events
        LOAD = "load",
        CHANGE = "change",
        SLIDE = "slide";

    function Slider(element, options) {
        var that = this;

        Component.apply(that, arguments);

        that.options = options = $.extend({}, that.options, options);

        that._distance = options.maxValue - options.minValue;
        that._isHorizontal = options.orientation == "horizontal";
        that._position = that._isHorizontal ? "left" : "bottom";
        that._size = that._isHorizontal ? "width" : "height";

        options.tooltip.format = options.tooltip.enabled ? options.tooltip.format || "{0}" : "{0}";

        that._createHtml();
        that.wrapper = that.element.closest(".t-slider");
        that._trackDiv = that.wrapper.find(".t-slider-track");

        that._setTrackDivWidth();

        that._maxSelection = that._trackDiv[that._size]();

        var sizeBetweenTicks = that._maxSelection / ((options.maxValue - options.minValue) / options.smallStep);

        if (that.options.tickPlacement != "none" && sizeBetweenTicks >= 2) {
            that._trackDiv.before(createSliderItems(options, that._distance));
            that._setItemsWidth();
            that._setItemsTitle();
            that._setItemsLargeTick();
        } else {
            that._pixelStepsArray = that._getPixelSteps();
        }

        that._setValueInRange(options.val);

        that[options.enabled ? "enable" : "disable"]();

        var dragHandle = that.wrapper.find(".t-draghandle");

        new Slider.Selection(dragHandle, that, options);
        new Slider.Drag(dragHandle, "", that, options);

        that.keyMap = {
            37: decreaseValue(options.smallStep), // left arrow
            40: decreaseValue(options.smallStep), // down arrow
            39: increaseValue(options.smallStep), // right arrow
            38: increaseValue(options.smallStep), // up arrow
            35: setValue(options.maxValue), // end
            36: setValue(options.minValue), // home
            33: increaseValue(options.largeStep), // page up
            34: decreaseValue(options.largeStep)  // page down
        };

        that.bind([LOAD, CHANGE, SLIDE], options);
    }

    $.extend(Slider.prototype, {
        _setTrackDivWidth: setTrackDivWidth,
        _setItemsWidth: setItemsWidth,
        _setItemsTitle: setItemsTitle,
        _setItemsLargeTick: setItemsLargeTick,
        _calculateItemsWidth: calculateItemsWidth,
        _roudWidths: roudWidths,
        _addAdditionalSize: addAdditionalSize,
        _getPixelSteps: getPixelSteps,
        _getValueFromPosition: getValueFromPosition,
        _getDragableArea: getDragableArea,
        _fixDragHandlePosition: fixDragHandlePosition,
        _createHtml: createHtml
    });

    function setTrackDivWidth () {
        var that = this;

        var trackDivPosition = parseFloat(that._trackDiv.css(that._position), 10) * 2;
        that._trackDiv[that._size]((that.wrapper[that._size]() - 2) - trackDivPosition);
    }

    function setItemsWidth () {
        var that = this,
            options = that.options,
            itemsCount = Math.floor(that._distance / options.smallStep),
            items = that.wrapper.find(".t-tick"),
            sum = 0;

        var pixelWidths = that._calculateItemsWidth(itemsCount);

        if (that._isHorizontal) {
            for (var i = 0; i < items.length - 2; i++) {
                $(items[i + 1])[that._size](pixelWidths[i]);
            }
        } else {
            pixelWidths = pixelWidths.reverse();

            for (var i = 2; i < items.length; i++) {
                $(items[i - 1])[that._size](pixelWidths[i]);
            }
        }

        if (that._isHorizontal) {
            $(items[0]).addClass("t-first")[that._size](pixelWidths[itemsCount]);
            $(items[items.length - 1]).addClass("t-last")[that._size](pixelWidths[itemsCount - 1]);
        } else {
            $(items[items.length - 1]).addClass("t-first")[that._size](pixelWidths[0]);
            $(items[0]).addClass("t-last")[that._size](pixelWidths[1]);
        }

        if (that._distance % options.smallStep != 0 && !that._isHorizontal) {
            for (var i = 0; i < pixelWidths.length; i++) {
                sum += pixelWidths[i];
            }

            that.wrapper.find(".t-slider-items").css("padding-top", 29 + (that._maxSelection - sum));
        }
    }

    function setItemsTitle () {
        var that = this,
            options = that.options,
            items = that.wrapper.find(".t-tick"),
            titleNumber = options.minValue;

        if (that._isHorizontal) {
            for (var i = 0; i < items.length; i++) {
                $(items[i]).attr("title", kendo.format(options.tooltip.format, parseFloat(titleNumber.toFixed(3), 10)));
                titleNumber += options.smallStep;
            }
        } else {
            for (var i = items.length - 1; i >= 0; i--) {
                $(items[i]).attr("title", kendo.format(options.tooltip.format, parseFloat(titleNumber.toFixed(3), 10)));
                titleNumber += options.smallStep;
            }
        }
    }

    function setItemsLargeTick () {
        var that = this,
            options = that.options;

        if ((1000 * options.largeStep) % (1000 * options.smallStep) == 0) {
            var items = that.wrapper.find(".t-tick"),
                item = {},
                step = parseFloat((options.largeStep / options.smallStep).toFixed(3), 10);

            if (that._isHorizontal) {
                for (var i = 0; i < items.length; i = parseFloat((i + step).toFixed(3), 10)) {
                    item = $(items[i]);

                    item.addClass("t-tick-large")
                        .html("<span class='t-label'>" + item.attr("title") + "</span>");
                }
            } else {
                for (var i = items.length - 1; i >= 0; i = parseFloat((i - step).toFixed(3), 10)) {
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

    function calculateItemsWidth (itemsCount) {
        var that = this,
            options = that.options,
            trackDivSize = parseFloat(that._trackDiv.css(that._size)) + 1,
            pixelStep = trackDivSize / that._distance;

        if ((that._distance / options.smallStep) - Math.floor(that._distance / options.smallStep) > 0) {
            trackDivSize -= ((that._distance % options.smallStep) * pixelStep);
        }

        var itemWidth = trackDivSize / itemsCount,
            pixelWidths = new Array();

        for (var i = 0; i < itemsCount - 1; i++) {
            pixelWidths[i] = itemWidth;
        }

        pixelWidths[itemsCount - 1] = pixelWidths[itemsCount] = itemWidth / 2;
        return that._roudWidths(pixelWidths);
    }

    function roudWidths (pixelWidthsArray) {
        var balance = 0;

        for (i = 0; i < pixelWidthsArray.length; i++) {
            balance += (pixelWidthsArray[i] - Math.floor(pixelWidthsArray[i]));
            pixelWidthsArray[i] = Math.floor(pixelWidthsArray[i]);
        }

        balance = Math.round(balance);

        return this._addAdditionalSize(balance, pixelWidthsArray);
    }

    function addAdditionalSize (additionalSize, pixelWidthsArray) {
        if (additionalSize == 0) {
            return pixelWidthsArray;
        }

        //set step size
        var step = parseFloat(pixelWidthsArray.length - 1) / parseFloat(additionalSize == 1 ? additionalSize : additionalSize - 1);

        for (var i = 0; i < additionalSize; i++) {
            pixelWidthsArray[parseInt(Math.round(step * i))] += 1;
        }

        return pixelWidthsArray;
    }

    function getPixelSteps () {
        var that = this,
            options = that.options,
            trackDivSize = parseInt(that._trackDiv.css(that._size)),
            pixelSteps = new Array(),
            pixelStep = parseFloat(((trackDivSize / that._distance) * options.smallStep).toFixed(5), 10),
            result = trackDivSize,
            i = 0;

        if (pixelStep == 0) {
            return pixelSteps;
        }

        while (result != 0) {
            pixelSteps[i] = pixelStep;
            result = parseFloat((result - pixelStep).toFixed(5), 10);
            i++;

            if (result <= pixelStep) {
                pixelSteps[i] = parseFloat(result.toFixed(5), 10);
                result = 0;
            }
        }

        return pixelSteps;
    }

    function getValueFromPosition (mousePosition, dragableArea) {
        var that = this,
            options = that.options,
            step = Math.max(options.smallStep * (that._maxSelection / that._distance), 0),
            position = 0,
            halfStep = (step / 2),
            val = 0;

        if (that._isHorizontal) {
            position = mousePosition - dragableArea.startPoint;
        } else {
            position = dragableArea.startPoint - mousePosition;
        }

        if (that._maxSelection - ((parseInt(that._maxSelection % step) - 3) / 2) < position) {
            return options.maxValue;
        }

        position += halfStep;

        if (position >= halfStep) {
            while (position > step) {
                position -= step;
                val += options.smallStep;
            }
        }

        return parseFloat((options.minValue + val).toFixed(3));
    }

    function getDragableArea () {
        var that = this,
            offsetLeft = that._trackDiv.offset().left,
            offsetTop = that._trackDiv.offset().top;

        return {
            startPoint: that._isHorizontal ? offsetLeft : offsetTop + that._maxSelection,
            endPoint: that._isHorizontal ? offsetLeft + that._maxSelection : offsetTop
        };
    }

    function fixDragHandlePosition (val, itemsUl) {
        var that = this,
            options = that.options,
            selectionValue = val - options.minValue,
            selection = 0;

        if (val == options.minValue || val == options.maxValue) {
            if (val == options.maxValue) {
                selection = that._maxSelection;
            }
        } else {
            var itemIndex = parseInt(((that._isHorizontal ? selectionValue : options.maxValue - val) / options.smallStep).toFixed(3)),
                item = $(itemsUl.find(".t-tick")[itemIndex]),
                itemSize = (item.hasClass("t-first") || item.hasClass("t-last")) ? item[that._size]() : item[that._size]() / 2,
                itemOffset = item.offset(),
                dragableArea = that._getDragableArea();

            if (that._isHorizontal) {
                selection = itemOffset.left - dragableArea.startPoint + itemSize;
            } else {
                selection = (dragableArea.startPoint - (itemOffset.top + itemSize)) + 1;
                if (!$.browser.mozilla) {
                    selection += (selection - Math.floor(selection)) > 0 ? 1 : 0;
                }
            }
        }

        return selection;
    }

    function increaseValue(step) {
        return function (value) {
            return value + step;
        }
    }

    function decreaseValue(step) {
        return function (value) {
            return value - step;
        }
    }

    function setValue(value) {
        return function () {
            return value;
        }
    }

    $.extend(Slider.prototype, {
        options: {
            enabled: true,
            minValue: 0,
            maxValue: 10,
            val: 0,
            smallStep: 1,
            largeStep: 5,
            showButtons: true,
            increaseButtonTitle: "Increase",
            decreaseButtonTitle: "Decrease",
            orientation: "horizontal",
            tickPlacement: "both",
            tooltip: { enabled: true, format: "{0}" }
        },

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
                .find(".t-tick").bind("click", clickHandler)
                .end()
                .find(".t-slider-track").bind("click", clickHandler);

            if (options.showButtons) {
                var mouseDownHandler = $.proxy(function(e, sign) {
                    if (e.which == 1) {
                        this._setValueInRange(options.val + (sign * options.smallStep));
                        this.timeout = setTimeout($.proxy(function () {
                            this.timer = setInterval($.proxy(function () {
                                this._setValueInRange(options.val + (sign * options.smallStep));
                            }, this), 60);
                        }, this), 200);
                    }
                }, that);

                that.wrapper.find(".t-button")
                    .unbind("mousedown")
                    .unbind("mouseup")
                    .bind("mouseup", $.proxy(function (e) {
                        this._clearTimer();
                    }, that))
                    .unbind("mouseover")
                    .bind("mouseover", function (e) {
                        $(e.currentTarget).addClass("t-state-hover");
                    })
                    .unbind("mouseout")
                    .bind("mouseout", $.proxy(function (e) {
                        $(e.currentTarget).removeClass("t-state-hover");
                        this._clearTimer();
                    }, that))
                    .eq(0)
                    .bind("mousedown", $.proxy(function (e) {
                        mouseDownHandler(e, 1);
                    }, that))
                    .end()
                    .eq(1)
                    .bind("mousedown", $.proxy(function (e) {
                        mouseDownHandler(e, -1);
                    }, that));
            }

            that.wrapper
                .find(".t-draghandle").bind({
                    keydown: $.proxy(this._keydown, that)
                });

            options.enabled = true;
        },

        disable: function () {
            var that = this;

            that.wrapper
                .attr("disabled", "disabled")
                .removeClass("t-state-default")
                .addClass("t-state-disabled");

            var preventDefault = function(event) {
                                    event.preventDefault();
                                 };

            that.wrapper
                .find(".t-button")
                .unbind("mousedown")
                .bind("mousedown", preventDefault)
                .unbind("mouseup")
                .bind("mouseup", preventDefault)
                .unbind("mouseleave")
                .bind("mouseleave", preventDefault)
                .unbind("mouseover")
                .bind("mouseover", preventDefault);

            that.wrapper
                .find(".t-tick").unbind("click")
                .end()
                .find(".t-slider-track").unbind("click");

            that.wrapper
                .find(".t-draghandle")
                .unbind("keydown")
                .bind("keydown", preventDefault)

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

            val = parseFloat(parseFloat(val, 10).toFixed(3), 10);
            if (isNaN(val)) {
                return options.val;
            }

            if (val >= options.minValue && val <= options.maxValue) {
                if (options.val != val) {
                    that.element.val(val);
                    options.val = val;
                    that.refresh();
                }
            }
        },

        refresh: function () {
            this.trigger("moveSelection", { value: this.options.val });
        },

        _clearTimer: function (e) {
            clearTimeout(this.timeout);
            clearInterval(this.timer);
        },

        _keydown: function (e) {
            if (e.keyCode in this.keyMap) {
                this._setValueInRange(this.keyMap[e.keyCode](this.options.val));
                e.preventDefault();
            }
        },

        _setValueInRange: function (val) {
            var that = this;

            val = parseFloat(parseFloat(val, 10).toFixed(3), 10);
            if (isNaN(val)) {
                that._update(that.options.minValue);
                return;
            }

            val = Math.max(val, that.options.minValue);
            val = Math.min(val, that.options.maxValue);
            that._update(val);
        }
    });

    Slider.Selection = function (dragHandle, that, options) {
        function moveSelection (val) {
            var selectionValue = val - options.minValue,
                itemsUl = that.wrapper.find(".t-slider-items"),
                i = 0,
                selection = 0;

            if (itemsUl.length != 0) {
                selection = that._fixDragHandlePosition(val, itemsUl, options);
            } else {
                if (that._pixelStepsArray.length == 0) {
                    selection = 0;
                } else {
                    while (selectionValue > 0) {
                        selectionValue = parseFloat((selectionValue - options.smallStep).toFixed(5), 10);
                        selection += that._pixelStepsArray[i];
                        i++;
                    }
                }
            }

            var selectionDiv = that._trackDiv.find(".t-slider-selection"),
                halfDragHanndle = parseInt(dragHandle[that._size]() / 2, 10) + 1;

            selectionDiv[that._size](selection);
            dragHandle.css(that._position, selection - halfDragHanndle);
        }

        moveSelection(that.value());

        var handler = function (e) {
            moveSelection(parseFloat(e.value, 10));
        };

        that.bind([CHANGE, SLIDE, "moveSelection"], handler);
    }

    Slider.Drag = function (dragHandle, type, owner, options) {
        var that = this;
        that.owner = owner;
        that.options = options;
        that.dragHandle = dragHandle;
        that.dragHandleSize = dragHandle[owner._size]();
        that.type = type;

        new Draggable(dragHandle, {
            dragstart: $.proxy(that.dragstart, that),
            drag: $.proxy(that.drag, that),
            dragend: $.proxy(that.dragend, that)
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
            that.step = Math.max(options.smallStep * (owner._maxSelection / owner._distance), 0);

            if (that.type) {
                that.selectionStart = options.selectionStart;
                that.selectionEnd = options.selectionEnd;
                owner._setZIndex(options.type);
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
                        if (options.tickPlacement == "topLeft") {
                            tooltipArrow += "n";
                        } else {
                            tooltipArrow += "s";
                        }
                    } else {
                        if (options.tickPlacement == "topLeft") {
                            tooltipArrow += "w";
                        } else {
                            tooltipArrow += "e";
                        }
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

            if (e.keyCode == 27) { // ESC
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
                top = 0,
                left = 0;

            if (that.type) {
                var dragHandles = owner.wrapper.find(".t-draghandle"),
                    firstDragHandleOffset = dragHandles.eq(0).offset(),
                    secondDragHandleOffset = dragHandles.eq(1).offset();

                if (owner._isHorizontal) {
                    top = secondDragHandleOffset.top;
                    left = firstDragHandleOffset.left + ((secondDragHandleOffset.left - firstDragHandleOffset.left) / 2);
                } else {
                    top = firstDragHandleOffset.top + ((secondDragHandleOffset.top - firstDragHandleOffset.top) / 2);
                    left = secondDragHandleOffset.left;
                }
            } else {
                var dragHandleOffset = that.dragHandle.offset();

                top = dragHandleOffset.top;
                left = dragHandleOffset.left;
            }

            var halfTooltipDiv = that.tooltipDiv[owner._size]() / 2;

            if (owner._isHorizontal) {
                left -= halfTooltipDiv;

                if (owner.options.tickPlacement != "topLeft") {
                    top -= 43;
                } else {
                    top += 33;
                }
            } else {
                top -= halfTooltipDiv;

                if (owner.options.tickPlacement != "topLeft") {
                    left -= that.tooltipDiv.width() + 23;
                } else {
                    left += 31;
                }
            }

            that.tooltipDiv.css({ top: top, left: left });
        },

        horizontalDrag: function (mousePosition) {
            var that = this,
                val = 0;

            if (that.dragableArea.startPoint < mousePosition.pageX && mousePosition.pageX < that.dragableArea.endPoint) {
                val = that.owner._getValueFromPosition(mousePosition.pageX, that.dragableArea);
            } else if (mousePosition.pageX >= that.dragableArea.endPoint) {
                val = that.options.maxValue;
            } else {
                val = that.options.minValue;
            }

            return val;
        },

        verticalDrag: function (mousePosition) {
            var that = this,
                val = 0;

            if (that.dragableArea.startPoint > mousePosition.pageY && mousePosition.pageY > that.dragableArea.endPoint) {
                val = that.owner._getValueFromPosition(mousePosition.pageY, that.dragableArea);

            } else if (mousePosition.pageY <= that.dragableArea.endPoint) {
                val = that.options.maxValue;
            } else {
                val = that.options.minValue;
            }

            return val;
        }
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
            count = Math.floor((distance / options.smallStep).toFixed(3), 10) + 1;

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

    function createHtml () {
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

    kendo.ui.plugin("Slider", Slider, Component);

    //
    // RangeSlider
    //

    function RangeSlider(element, options) {
        var that = this;

        Component.apply(that, arguments);

        that.options = options = $.extend({}, that.options, options);

        that._distance = options.maxValue - options.minValue;
        that._isHorizontal = options.orientation == "horizontal";
        that._position = that._isHorizontal ? "left" : "bottom";
        that._size = that._isHorizontal ? "width" : "height";
        options.tooltip.format = options.tooltip.enabled ? options.tooltip.format || "{0}" : "{0}";

        that._createHtml();
        that.wrapper = that.element.closest(".t-slider");
        that._trackDiv = that.wrapper.find(".t-slider-track");

        that._setTrackDivWidth();

        that._maxSelection = that._trackDiv[that._size]();

        var sizeBetweenTicks = that._maxSelection / ((options.maxValue - options.minValue) / options.smallStep);

        if (that.options.tickPlacement != "none" && sizeBetweenTicks >= 2) {
            that._trackDiv.before(createSliderItems(options, that._distance));
            that._setItemsWidth();
            that._setItemsTitle();
            that._setItemsLargeTick();
        } else {
            that._pixelStepsArray = that._getPixelSteps();
        }

        that._correctValues(options.selectionStart, options.selectionEnd);

        var dragHandles = that.wrapper.find(".t-draghandle");

        new RangeSlider.Selection(dragHandles, that, that.options);
        new Slider.Drag(dragHandles.eq(0), "leftHandle", that, that.options);
        new Slider.Drag(dragHandles.eq(1), "rightHandle" , that, that.options);

        that[options.enabled ? "enable" : "disable"]();

        that.keyMap = {
            37: decreaseValue(options.smallStep), // left arrow
            40: decreaseValue(options.smallStep), // down arrow
            39: increaseValue(options.smallStep), // right arrow
            38: increaseValue(options.smallStep), // up arrow
            35: setValue(options.maxValue), // end
            36: setValue(options.minValue), // home
            33: increaseValue(options.largeStep), // page up
            34: decreaseValue(options.largeStep)  // page down
        };

        that.bind([LOAD, CHANGE, SLIDE], options);
    }

    $.extend(RangeSlider.prototype, {
        _setTrackDivWidth: setTrackDivWidth,
        _setItemsWidth: setItemsWidth,
        _setItemsTitle: setItemsTitle,
        _setItemsLargeTick: setItemsLargeTick,
        _calculateItemsWidth: calculateItemsWidth,
        _roudWidths: roudWidths,
        _addAdditionalSize: addAdditionalSize,
        _getPixelSteps: getPixelSteps,
        _getValueFromPosition: getValueFromPosition,
        _getDragableArea: getDragableArea,
        _fixDragHandlePosition: fixDragHandlePosition,
        _createHtml: createHtml
    });

    $.extend(RangeSlider.prototype, {
        options: {
            enabled: true,
            minValue: 0,
            maxValue: 10,
            selectionStart: 0,
            selectionEnd: 10,
            smallStep: 1,
            largeStep: 5,
            orientation: "horizontal",
            tickPlacement: "both",
            tooltip: { enabled: true, format: "{0}" }
        },

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
                .find(".t-tick").bind("click", clickHandler)
                .end()
                .find(".t-slider-track").bind("click", clickHandler);

            that.wrapper.find(".t-draghandle")
                .eq(0).bind({
                    keydown: $.proxy(function(e) {
                        this._keydown(e, true);
                    }, that)
                })
                .end()
                .eq(1).bind({
                    keydown: $.proxy(function(e) {
                        this._keydown(e, false);
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
                .find(".t-tick").unbind("click")
                .end()
                .find(".t-slider-track").unbind("click");

            that.wrapper
                .find(".t-draghandle")
                .unbind("keydown")
                .bind("keydown", function(event) { event.preventDefault(); });

            that.enabled = false;
        },

        _keydown: function (e, isLeftHandle) {
            var that = this,
                selectionStartValue = that.options.selectionStart,
                selectionEndValue = that.options.selectionEnd;

            if (e.keyCode in that.keyMap) {
                if (isLeftHandle) {
                    selectionStartValue = that.keyMap[e.keyCode](selectionStartValue);

                    if (selectionStartValue > selectionEndValue) {
                        selectionEndValue = selectionStartValue;
                    }
                } else {
                    selectionEndValue = that.keyMap[e.keyCode](selectionEndValue);

                    if (selectionEndValue < selectionStartValue) {
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
            } else if (arguments.length == 1 && arguments[0] instanceof Array) {
                selectionStart = arguments[0][0];
                selectionEnd = arguments[0][1];
            } else {
                selectionStart = parseFloat(parseFloat(arguments[0], 10).toFixed(3), 10);
                selectionEnd = parseFloat(parseFloat(arguments[1], 10).toFixed(3), 10);
            }

            if (selectionStart >= options.minValue && selectionStart <= options.maxValue
            && selectionEnd >= options.minValue && selectionEnd <= options.maxValue && selectionStart <= selectionEnd) {
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
                options = this.options;

            that.trigger("moveSelection", { values: [options.selectionStart, options.selectionEnd] });

            if (options.selectionStart == options.maxValue && options.selectionEnd == options.maxValue) {
                that._setZIndex("leftHandle");
            }
        },

        _setValueInRange: function (selectionStart, selectionEnd) {
            var options = this.options;

            selectionStart = Math.max(selectionStart, options.minValue);
            selectionStart = Math.min(selectionStart, options.maxValue);

            selectionEnd = Math.max(selectionEnd, options.minValue);
            selectionEnd = Math.min(selectionEnd, options.maxValue);

            if (options.selectionStart == options.maxValue && options.slectionEnd == options.maxValue) {
                that._setZIndex("leftHandle");
            }

            this._update(selectionStart, selectionEnd);
        },

        _correctValues: function (selectionStartValue, selectionEndValue) {
            if (selectionStartValue >= selectionEndValue) {
                this._setValueInRange(selectionEndValue, selectionStartValue);
            } else {
                this._setValueInRange(selectionStartValue, selectionEndValue);
            }
        },

        _setZIndex: function (type) {
            var dragHandles = this.wrapper.find(".t-draghandle"),
                firstHandle = dragHandles.eq(0),
                secondHandle = dragHandles.eq(1),
                zIndex = "z-index";

            if (type == "leftHandle") {
                firstHandle.css(zIndex, "1");
                secondHandle.css(zIndex, "");
            } else {
                firstHandle.css(zIndex, "");
                secondHandle.css(zIndex, "1");
            }
        }
    });

    RangeSlider.Selection = function (dragHandles, that, options) {
        function moveSelection(values) {
            var selectionStartValue = values[0] - options.minValue,
                selectionEndValue = values[1] - options.minValue,
                itemsUl = that.wrapper.find(".t-slider-items"),
                selectionStart = 0,
                selectionEnd = 0,
                i = 0;

            if (itemsUl.length != 0) {
                selectionStart = that._fixDragHandlePosition(values[0], itemsUl);
                selectionEnd = that._fixDragHandlePosition(values[1], itemsUl);
            } else {
                while (selectionStartValue > 0) {
                    selectionStartValue = parseFloat((selectionStartValue - options.smallStep).toFixed(5), 10);
                    selectionStart += that._pixelStepsArray[i];
                    i++;
                }

                i = 0;
                while (selectionEndValue > 0) {
                    selectionEndValue = parseFloat((selectionEndValue - options.smallStep).toFixed(5), 10);
                    selectionEnd += that._pixelStepsArray[i];
                    i++;
                }
            }

            var halfHandle = parseInt(dragHandles.eq(0)[that._size]() / 2, 10) + 1;

            dragHandles.eq(0).css(that._position, selectionStart - halfHandle)
                       .end()
                       .eq(1).css(that._position, selectionEnd - halfHandle);

            makeSelection(selectionStart, selectionEnd);
        }

        function makeSelection(selectionStart, selectionEnd) {
            var selection = 0,
                selectionPosition = 0;

            if (selectionStart < selectionEnd) {
                selection = selectionEnd - selectionStart;
                selectionPosition = selectionStart;
            } else {
                selection = selectionStart - selectionEnd;
                selectionPosition = selectionEnd;
            }

            var selectionDiv = that._trackDiv.find(".t-slider-selection");
            selectionDiv[that._size](selection);
            selectionDiv.css(that._position, selectionPosition - 1);
        }

        var inputs = that.element.find("input");

        moveSelection(that.values());

        var handler = function (e) {
            moveSelection(e.values);
        };

        that.bind([ CHANGE, SLIDE, "moveSelection" ], handler);
    }

    kendo.ui.plugin("RangeSlider", RangeSlider, Component);

})(jQuery, window);
