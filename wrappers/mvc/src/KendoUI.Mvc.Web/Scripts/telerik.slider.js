(function ($) {

    var $t = $.telerik,
        MOUSEDOWN = $t.isTouch ? "touchstart" : "mousedown",
        PRECISION = 3;

    $t.scripts.push("telerik.slider.js");

    $t.slider = function (element, options) {
        options = options || {};
        var $element = $(element);
        element.type = "text";
        this.element = element;
        options.val = round(parseValue($element.val()) || round(options.val));
        options.distance = options.maxValue - options.minValue;
        $.extend(this, options);
        options.position = this.orientation == "horizontal" ? "left" : "bottom";
        options.size = this.orientation == "horizontal" ? "width" : "height";
        options.outerSize = this.orientation == "horizontal" ? "outerWidth" : "outerHeight";
        options.orientation = this.orientation;
        createHtml(element, options);
        this.wrapper = $element.closest(".t-slider");
        this.trackDiv = this.wrapper.find(".t-slider-track");

        $t.slider.setTrackDivWidth(this.wrapper, options);

        this.maxSelection = this.trackDiv[options.size]();

        var sizeBetweenTicks = this.maxSelection / ((this.maxValue - this.minValue) / this.smallStep);
        var pixelWidths = $t.slider.calculateItemsWidth(this.wrapper, options, Math.floor(this.distance / this.smallStep));

        if (options.tickPlacement != "none" && sizeBetweenTicks >= 2) {
            this.trackDiv.before(createSliderItems(options));
            $t.slider.setItemsWidth(this.wrapper, this.trackDiv, pixelWidths, options);
            $t.slider.setItemsTitle(this.wrapper, options);
            $t.slider.setItemsLargeTick(this.wrapper, options);
        }

        $t.slider.calculateSteps.call(this, pixelWidths);

        var settings = {
            element: element,
            dragHandle: this.wrapper.find(".t-draghandle"),
            orientation: options.orientation,
            size: options.size,
            outerSize: options.outerSize,
            position: options.position,
            owner: this
        };

        this._setValueInRange(options.val);

        this[options.enabled ? 'enable' : 'disable']();

        new $t.slider.Selection(settings);
        this._drag = new $t.slider.Drag(settings);

        this.keyMap = {
            37: decreaseValue(options.smallStep), // left arrow
            40: decreaseValue(options.smallStep), // down arrow
            39: increaseValue(options.smallStep), // right arrow
            38: increaseValue(options.smallStep), // up arrow
            35: setValue(options.maxValue), // end
            36: setValue(options.minValue), // home
            33: increaseValue(options.largeStep), // page up
            34: decreaseValue(options.largeStep)  // page down
        };

        $t.bind(this, {
            slide: this.onSlide,
            change: this.onChange,
            load: this.onLoad
        });
    };

    $.extend($t.slider, {
        setTrackDivWidth: function (wrapper, options) {
            var trackDiv = wrapper.find('.t-slider-track');
            var trackDivPosition = round(trackDiv.css(options.position)) * 2;
            trackDiv[options.size]((wrapper[options.size]() - 2) - trackDivPosition);
        },

        setItemsWidth: function (wrapper, trackDiv, pixelWidths, options) {
            var itemsCount = Math.floor(options.distance / options.smallStep),
                items = wrapper.find(".t-tick"),
                sum = 0,
                maxSelection = trackDiv[options.size](),
                arr = $.extend([], pixelWidths);

            if (options.orientation == "horizontal") {
                for (var i = 0; i < items.length - 2; i++) {
                    $(items[i + 1])[options.size](arr[i]);
                }
            } else {
                arr = arr.reverse();

                for (var i = 2; i < items.length; i++) {
                    $(items[i - 1])[options.size](arr[i]);
                }
            }

            if (options.orientation == "horizontal") {
                $(items[0]).addClass("t-first")[options.size](arr[itemsCount]);
                $(items[items.length - 1]).addClass("t-last")[options.size](arr[itemsCount - 1]);
            } else {
                $(items[items.length - 1]).addClass("t-first")[options.size](arr[0]);
                $(items[0]).addClass("t-last")[options.size](arr[1]);
            }
            
            if (options.distance % options.smallStep != 0 && options.orientation == "vertical") {
                for (var i = 0; i < arr.length; i++) {
                    sum += pixelWidths[i];
                }

                wrapper.find(".t-slider-items").css("padding-top", 29 + (maxSelection - sum));
            }
        },

        setItemsTitle: function (wrapper, options) {
            var items = wrapper.find(".t-tick"),
                titleNumber = options.minValue;

            if (options.orientation == "horizontal") {
                for (var i = 0; i < items.length; i++) {
                    $(items[i]).attr("title", $t.formatString(options.tooltip.format || "{0}", round(titleNumber)));
                    titleNumber += options.smallStep;
                }
            } else {
                for (var i = items.length - 1; i >= 0; i--) {
                    $(items[i]).attr("title", $t.formatString(options.tooltip.format || "{0}", round(titleNumber)));
                    titleNumber += options.smallStep;
                }
            }
        },

        setItemsLargeTick: function (wrapper, options) {
            if ((1000 * options.largeStep) % (1000 * options.smallStep) == 0) {
                var items = wrapper.find(".t-tick"),
                    item = {},
                    step = round(options.largeStep / options.smallStep);

                if (options.orientation == "horizontal") {
                    for (var i = 0; i < items.length; i = round(i + step)) {
                        item = $(items[i]);

                        item.addClass("t-tick-large")
                            .html($("<span class='t-label'></span>").html(item.attr("title")));
                    }
                } else {
                    for (var i = items.length - 1; i >= 0; i = round(i - step)) {
                        item = $(items[i]);

                        item.addClass("t-tick-large")
                            .html($("<span class='t-label'></span>").html(item.attr("title")));

                        if (i != 0 && i != items.length - 1) {
                            item.css('line-height', item[options.size]() + 'px');
                        }
                    }
                }
            }
        },

        calculateItemsWidth: function (wrapper, options, itemsCount) {
            var trackDivSize = parseFloat(wrapper.find('.t-slider-track').css(options.size)) + 1,
                pixelStep = trackDivSize / options.distance;

            if ((options.distance / options.smallStep) - Math.floor(options.distance / options.smallStep) > 0) {
                trackDivSize -= ((options.distance % options.smallStep) * pixelStep);
            }

            var itemWidth = trackDivSize / itemsCount,
                pixelWidths = [];

            for (var i = 0; i < itemsCount - 1; i++) {
                pixelWidths[i] = itemWidth;
            }

            pixelWidths[itemsCount - 1] = pixelWidths[itemsCount] = itemWidth / 2;

            return this.roundWidths(pixelWidths);
        },

        roundWidths: function (pixelWidthsArray) {
            var balance = 0;

            for (i = 0; i < pixelWidthsArray.length; i++) {
                balance += (pixelWidthsArray[i] - Math.floor(pixelWidthsArray[i]));
                pixelWidthsArray[i] = Math.floor(pixelWidthsArray[i]);
            }

            balance = Math.round(balance);

            return this.addAdditionalSize(balance, pixelWidthsArray);
        },

        addAdditionalSize: function (additionalSize, pixelWidthsArray) {
            if (additionalSize == 0) {
                return pixelWidthsArray;
            }

            //set step size
            var step = parseFloat(pixelWidthsArray.length - 1) / parseFloat(additionalSize == 1 ? additionalSize : additionalSize - 1);

            for (var i = 0; i < additionalSize; i++) {
                pixelWidthsArray[parseInt(Math.round(step * i))] += 1;
            }

            return pixelWidthsArray;
        },

        getValueFromPosition: function (mousePosition, dragableArea, owner) {
            var step = Math.max(owner.smallStep * (owner.maxSelection / owner.distance), 0),
                position = 0,
                halfStep = (step / 2);

            if (owner.orientation == "horizontal") {
                position = mousePosition - dragableArea.startPoint;
            } else {
                position = dragableArea.startPoint - mousePosition;
            }

            if (owner.maxSelection - ((parseInt(owner.maxSelection % step) - 3) / 2) < position) {
                return owner.maxValue;
            }

            for (var i = 0; i < owner._pixelStepsArray.length; i++) {
                if (Math.abs(owner._pixelStepsArray[i] - position) - 1 <= halfStep) {
                    return round(owner._valuesArray[i]);
                }
            }
        },
        
        getDragableArea: function (trackDiv, maxSelection, orientation) {
            var offsetLeft = trackDiv.offset().left,
                offsetTop = trackDiv.offset().top;

            return {
                startPoint: orientation == "horizontal" ? offsetLeft : offsetTop + maxSelection,
                endPoint: orientation == "horizontal" ? offsetLeft + maxSelection : offsetTop
            };
        },

        calculateSteps: function (pixelWidths) {
            var that = this,
                val = that.minValue,
                selection = 0,
                itemsCount = Math.ceil(that.distance / that.smallStep),
                i = 1;

            itemsCount += (that.distance / that.smallStep) % 1 == 0 ? 1 : 0;
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
                that._valuesArray[i] = val += that.smallStep;

                i++;
            }

            var lastItem = that.distance % that.smallStep == 0 ? itemsCount - 1 : itemsCount;

            that._pixelStepsArray[lastItem] = that.maxSelection;
            that._valuesArray[lastItem] = that.maxValue;
        }
    });

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

    function parseValue(value) {
        return value.toString().replace($t.cultureInfo.numericdecimalseparator, ".");
    }

    function round(value) {
        value = (value + "").replace($t.cultureInfo.numericdecimalseparator, ".");
        value = parseFloat(value, 10);
        var power = Math.pow(10, PRECISION || 0);
        return Math.round(value * power) / power;
    }

    $t.slider.prototype = {
        enable: function () {
            this.wrapper
                .removeAttr("disabled")
                .removeClass("t-state-disabled")
                .addClass("t-state-default");

            var clickHandler = $.proxy(function (e) {
                if ($(e.target).hasClass("t-draghandle"))
                    return;

                this._drag.start(e);
            }, this);

            this.wrapper
                .find(".t-tick").bind(MOUSEDOWN, clickHandler)
                .end()
                .find(".t-slider-track").bind(MOUSEDOWN, clickHandler);

            var move = $.proxy(function (sign) {
                this._setValueInRange(this._nextValueByIndex(this._valueIndex + (sign * 1)));
            }, this);

            if (this.showButtons) {
                var mouseDownHandler = $.proxy(function(e, sign) {
                    if (e.which == 1) {
                        move(sign);

                        this.timeout = setTimeout($.proxy(function () {
                            this.timer = setInterval(function () {
                                move(sign)
                            }, 60);
                        }, this), 200);
                    }
                }, this);

                this.wrapper.find(".t-button")
                    .unbind("mousedown")
                    .unbind("mouseup")
                    .bind("mouseup", $.proxy(function (e) {
                        this._clearTimer();
                    }, this))
                    .unbind("mouseover")
                    .bind("mouseover", function (e) {
                        $(e.currentTarget).addClass("t-state-hover");
                    })
                    .unbind("mouseout")
                    .bind("mouseout", $.proxy(function (e) {
                        $(e.currentTarget).removeClass("t-state-hover");
                        this._clearTimer();
                    }, this))
                    .eq(0)
                    .bind("mousedown", $.proxy(function (e) {
                        mouseDownHandler(e, 1);
                        e.preventDefault();
                    }, this))
                    .end()
                    .eq(1)
                    .bind("mousedown", $.proxy(function (e) {
                        mouseDownHandler(e, -1);
                        e.preventDefault();
                    }, this))
            }

            this.wrapper
                .find(".t-draghandle").bind({
                    keydown: $.proxy(this._keydown, this)
                });

            this.enabled = true;
        },

        disable: function () {
            this.wrapper
                .attr("disabled", "disabled")
                .removeClass("t-state-default")
                .addClass("t-state-disabled");

            var preventDefault = $t.preventDefault;

            this.wrapper
                .find(".t-button")
                .unbind("mousedown")
                .bind("mousedown", preventDefault)
                .unbind("mouseup")
                .bind("mouseup", preventDefault)
                .unbind("mouseleave")
                .bind("mouseleave", preventDefault)
                .unbind("mouseover")
                .bind("mouseover", preventDefault);

            this.wrapper
                .find(".t-tick").unbind(MOUSEDOWN)
                .end()
                .find(".t-slider-track").unbind(MOUSEDOWN);

            this.wrapper
                .find(".t-draghandle")
                .unbind("keydown")
                .bind("keydown", preventDefault);

            this.enabled = false;
        },
        
        _nextValueByIndex: function (index) {
            var count = this._valuesArray.length;
            return this._valuesArray[Math.max(0, Math.min(index, count - 1))];
        },

        _update: function (val) {
            var change = this.value() != val;

            this.value(val);

            if (change) {
                $t.trigger(this.element, 'change', { value: this.val });
            }
        },

        value: function (val) {
            val = round(val);
            if (isNaN(val)) {
                return this.val;
            }

            if (val >= this.minValue && val <= this.maxValue) {
                if (this.val != val) {
                    $(this.element).attr("value", parseValue(round(val)));
                    this.val = val;
                    this.refresh();
                }
            }
        },

        refresh: function () {
            $t.trigger(this.element, 't:moveSelection', { value: this.val });
        },

        _clearTimer: function (e) {
            clearTimeout(this.timeout);
            clearInterval(this.timer);
        },

        _keydown: function (e) {
            if (e.keyCode in this.keyMap) {
                this._setValueInRange(this.keyMap[e.keyCode](this.val));
                e.preventDefault();
            }
        },

        _setValueInRange: function (val) {
            val = round(val);
            
            if (isNaN(val)) {
                this._update(this.minValue);
                return;
            }

            val = Math.max(val, this.minValue);
            val = Math.min(val, this.maxValue);
            this._update(val);
        }
    };

    $t.slider.Selection = function (options) {
        var $element = $(options.element),
            owner = options.owner;

        function moveSelection (val) {
            var selectionValue = val - owner.minValue,
                index = owner._valueIndex = Math.ceil(round(selectionValue / owner.smallStep)),
                selection = owner._pixelStepsArray[index],
                selectionDiv = owner.trackDiv.find(".t-slider-selection"),
                halfDragHanndle = parseInt(options.dragHandle[options.outerSize]() / 2, 10) + 1;

            selectionDiv[options.size](selection);
            options.dragHandle.css(options.position, selection - halfDragHanndle);
        }

        moveSelection(owner.val);

        var handler = function (e) {
            moveSelection(round(e.value));
        };

        $element.bind({ "change": handler, "slide": handler, "t:moveSelection": handler });
    };

    $t.slider.Drag = function (options) {
        options.dragHandleSize = options.dragHandle[options.outerSize]();
        
        $.extend(this, options);

        this.draggable = new $t.draggable({
            distance: 0,
            owner: options.dragHandle,
            scope: options.element.id,
            start: $.proxy(this._start, this),
            drag: $.proxy(this.drag, this),
            stop: $.proxy(this.stop, this)
        });
    };

    $t.slider.Drag.prototype = {
        start: function (e) {
            var location = $t.touchLocation(e);
            this.draggable._startDrag(e.currentTarget, location);
            this.draggable._start(e);
            this.draggable._drag(e); // distance is 0, we need to manually fire the slide.
        },

        _start: function (e) {
            if (!this.owner.enabled) {
                return false;
            }

            $(this.element).unbind('mouseover');

            this.val = round($(this.element).val());
            this.dragableArea = $t.slider.getDragableArea(this.owner.trackDiv, this.owner.maxSelection, this.orientation);
            this.step = Math.max(this.owner.smallStep * (this.owner.maxSelection / this.owner.distance), 0);

            this.selectionStart = this.owner.selectionStart;
            this.selectionEnd = this.owner.selectionEnd;
            this.oldVal = this.val;
            this.format = this.owner.tooltip.format || "{0}";

            if (this.type) {
                this.owner._setZIndex(this.type);
            }

            if (this.owner.tooltip.enabled) {
                this.tooltipDiv = $("<div class='t-widget t-tooltip'></div>").appendTo(document.body);

                if (this.type) {
                    var formattedSelectionStart = $t.formatString(this.format, this.selectionStart),
                        formattedSelectionEnd = $t.formatString(this.format, this.selectionEnd);

                    this.tooltipDiv.html(formattedSelectionStart + ' - ' + formattedSelectionEnd );
                } else {
                    var tooltipArrow = "t-callout-";

                    if (this.orientation == "horizontal") {
                        if (this.owner.tickPlacement == "topLeft") {
                            tooltipArrow += "n";
                        } else {
                            tooltipArrow += "s";
                        }                    } else {
                        if (this.owner.tickPlacement == "topLeft") {
                            tooltipArrow += "w";
                        } else {
                            tooltipArrow += "e";
                        }
                    }

                    this.tooltipInnerDiv = "<div class='t-callout " + tooltipArrow + "'></div>";
                    this.tooltipDiv.html($t.formatString(this.owner.tooltip.format || "{0}", this.val) + this.tooltipInnerDiv);
                }

                this.moveTooltip();
            }
        },

        drag: function (e) {
            var location = $t.touchLocation(e);

            if (this.orientation == "horizontal") {
                this.val = this.horizontalDrag(location.x);
            } else {
                this.val = this.verticalDrag(location.y);
            }

            if (this.oldVal != this.val) {
                this.oldVal = this.val;

                if (this.type) {
                    if (this.type == "firstHandle") {
                        if (this.val < this.selectionEnd) {
                            this.selectionStart = this.val;
                        } else {
                            this.selectionStart = this.selectionEnd = this.val;
                        }
                    } else {
                        if (this.val > this.selectionStart) {
                            this.selectionEnd = this.val;
                        } else {
                            this.selectionStart = this.selectionEnd = this.val;
                        }
                    }

                    $t.trigger(this.element, "slide", { values: [this.selectionStart, this.selectionEnd] });

                    if (this.owner.tooltip.enabled) {
                        var formattedSelectionStart = $t.formatString(this.format, this.selectionStart),
                            formattedSelectionEnd = $t.formatString(this.format, this.selectionEnd);

                        this.tooltipDiv.html(formattedSelectionStart + ' - ' + formattedSelectionEnd );
                    }
                } else {
                    $t.trigger(this.element, "slide", { value: this.val });

                    if (this.owner.tooltip.enabled) {
                        this.tooltipDiv.html($t.formatString(this.format, this.val) + this.tooltipInnerDiv);
                    }
                }

                if (this.owner.tooltip.enabled) {
                    this.moveTooltip();
                }
            }
        },

        stop: function (e) {
            if ($t.isTouch)
                e.preventDefault();
            
            if (e.keyCode == 27) { // ESC
                this.owner.refresh();
            } else {
                if (this.type) {
                    this.owner._update(this.selectionStart, this.selectionEnd);
                } else {
                    this.owner._update(this.val);
                }
            }

            if (this.owner.tooltip.enabled) {
                this.tooltipDiv.remove();
            }

            $(this.element).bind('mouseover');

            return false;
        },

        moveTooltip: function () {
            var that = this,
                top = 0,
                left= 0,
                margin = 4,
                callout = that.tooltipDiv.find(".t-callout");

            if (that.type) {
                var dragHandles = that.owner.wrapper.find(".t-draghandle"),
                    firstDragHandleOffset = dragHandles.eq(0).offset(),
                    secondDragHandleOffset = dragHandles.eq(1).offset();

                if (that.orientation == "horizontal") {
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

            if (that.orientation == "horizontal") {
                left -= Math.round((that.tooltipDiv.outerWidth() - that.dragHandle[that.outerSize]()) / 2);
                top -= that.tooltipDiv.outerHeight() + callout.height() + margin;
            } else {
                top -= Math.round((that.tooltipDiv.outerHeight() - that.dragHandle[that.outerSize]()) / 2);
                left -= that.tooltipDiv.outerWidth() + callout.width() + margin;
            }

            that.tooltipDiv.css({ top: top, left: left });
        },

        horizontalDrag: function (x) {
            var val = 0;

            if (this.dragableArea.startPoint < x && x < this.dragableArea.endPoint) {
                val = $t.slider.getValueFromPosition(x, this.dragableArea, this.owner);
            } else if (x >= this.dragableArea.endPoint) {
                val = this.owner.maxValue;
            } else {
                val = this.owner.minValue;
            }

            return val;
        },

        verticalDrag: function (y) {
            var val = 0;

            if (this.dragableArea.startPoint > y && y > this.dragableArea.endPoint) {
                val = $t.slider.getValueFromPosition(y, this.dragableArea, this.owner);
            } else if (y <= this.dragableArea.endPoint) {
                val = this.owner.maxValue;
            } else {
                val = this.owner.minValue;
            }

            return val;
        }
    };

    function createWrapper (options, element) {
        var $element = $(element),
            orientationCssClass = options.orientation == "horizontal" ? " t-slider-horizontal" : " t-slider-vertical",
            tickPlacementCssClass;

        if (options.tickPlacement == "bottomRight") {
            tickPlacementCssClass = " t-slider-bottomright";
        } else if (options.tickPlacement == "topLeft") {
            tickPlacementCssClass = " t-slider-topleft";
        }

        var style = options.style ? options.style : $element.attr("style");

        return new $t.stringBuilder()
                     .cat("<div class='t-widget t-slider")
                     .cat(orientationCssClass)
                     .catIf(" ", $element.attr("class"), $element.attr("class"))
                     .cat("'")
                     .catIf(" style='", style, "'", style)
                     .cat(">")
                     .cat("<div class='t-slider-wrap")
                     .catIf(" t-slider-buttons", options.showButtons)
                     .catIf(tickPlacementCssClass, tickPlacementCssClass)
                     .cat("'></div></div>")
                     .string();
    }

    function createButton (options, type) {
        var buttonCssClass,
            isHorizontal = options.orientation == "horizontal";

        if (type == "increase") {
            buttonCssClass = isHorizontal ? "t-arrow-next" : "t-arrow-up";
        } else {
            buttonCssClass = isHorizontal ? "t-arrow-prev" : "t-arrow-down";
        }

        return new $t.stringBuilder()
                     .cat("<a ")
                     .cat("class='t-button ")
                     .cat("t-button-" + type)
                     .cat("'><span class='t-icon ")
                     .cat(buttonCssClass)
                     .cat("' title='")
                     .cat(options[type + "ButtonTitle"])
                     .cat("'>")
                     .cat(options[type + "ButtonTitle"])
                     .cat("</span></a>")
                     .string();
    }

    function createSliderItems (options) {
        return new $t.stringBuilder()
                     .cat("<ul class='t-reset t-slider-items'>")
                     .rep("<li class='t-tick'>&nbsp;</li>", (Math.floor((options.distance / options.smallStep).toFixed(3), 10) + 1))
                     .cat("</ul>")
                     .string();
    }

    function createTrack ($element) {
        var dragHandleCount = $element.is("input") ? 1 : 2;

        return new $t.stringBuilder()
                     .cat("<div class='t-slider-track'>")
                     .cat("<div class='t-slider-selection'></div>")
                     .cat("<a href='javascript:void(0)' class='t-draghandle' title='Drag'>Drag</a>")
                     .catIf("<a href='javascript:void(0)' class='t-draghandle t-draghandle1' title='Drag'>Drag</a>", dragHandleCount > 1)
                     .cat("</div>")
                     .string();
    }

    function createHtml (element, options) {
        var $element = $(element);
        $element.val(options.val);
        $element.wrap(createWrapper(options, element)).hide();

        if (options.showButtons) {
            $element.before(createButton(options, "increase"))
                    .before(createButton(options, "decrease"));
        }

        $element.before(createTrack($element));
    }

    // jQuery extender
    $.fn.tSlider = function (options) {
        return $t.create(this, {
            name: "tSlider",
            init: function (element, options) {
                return new $t.slider(element, options);
            },
            options: options
        });
    };

    // default options
    $.fn.tSlider.defaults = {
        enabled: true,
        minValue: 0,
        maxValue: 10,
        smallStep: 1,
        largeStep: 5,
        showButtons: true,
        increaseButtonTitle: "Increase",
        decreaseButtonTitle: "Decrease",
        orientation: "horizontal",
        tickPlacement: "both",
        tooltip: { enabled: true, format: "{0}" }
    };

    //
    // RangeSlider
    //

    $t.rangeSlider = function (element, options) {
        var $element = $(element),
            inputs = $(element).find("input");
        options = options || {};
        inputs[0].type = "text";
        inputs[1].type = "text";
        options.selectionStart = round(parseValue(inputs.eq(0).val()) || options.selectionStart);
        options.selectionEnd = round(parseValue(inputs.eq(1).val()) || options.selectionEnd);

        this.values(options.selectionStart, options.selectionEnd);
        this.element = element;
        options.distance = options.maxValue - options.minValue;
        $.extend(this, options);
        options.position = this.orientation == "horizontal" ? "left" : "bottom";
        options.size = this.orientation == "horizontal" ? "width" : "height";
        options.outerSize = this.orientation == "horizontal" ? "outerWidth" : "outerHeight";

        createHtml(element, options);
        this.wrapper = $element.closest(".t-slider");
        this.trackDiv = this.wrapper.find(".t-slider-track");

        $t.slider.setTrackDivWidth(this.wrapper, options);
        this.maxSelection = this.trackDiv[options.size]();

        var sizeBetweenTicks = this.maxSelection / ((this.maxValue - this.minValue) / this.smallStep);
        var pixelWidths = $t.slider.calculateItemsWidth(this.wrapper, options, Math.floor(this.distance / this.smallStep));

        if (options.tickPlacement != "none" && sizeBetweenTicks >= 2) {
            this.trackDiv.before(createSliderItems(options));
            $t.slider.setItemsWidth(this.wrapper, this.trackDiv, pixelWidths, options);
            $t.slider.setItemsTitle(this.wrapper, options);
            $t.slider.setItemsLargeTick(this.wrapper, options);
        }

        $t.slider.calculateSteps.call(this, pixelWidths);

        this._correctValues(this.selectionStart, this.selectionEnd);

        var leftDrag = {
            element: element,
            type: "firstHandle",
            dragHandle: this.wrapper.find(".t-draghandle:first"),
            orientation: options.orientation,
            size: options.size,
            outerSize: options.outerSize,
            position: options.position,
            owner: this
        };

        this._firstHandleDrag = new $t.slider.Drag(leftDrag);
        new $t.rangeSlider.Selection(leftDrag);

        var rightDrag = {
            element: element,
            type: "lastHandle",
            outerSize: options.outerSize,
            dragHandle: this.wrapper.find(".t-draghandle:last"),
            orientation: options.orientation,
            size: options.size,
            position: options.position,
            owner: this
        };

        this._lastHandleDrag = new $t.slider.Drag(rightDrag);

        this[options.enabled ? 'enable' : 'disable']();

        this.keyMap = {
            37: decreaseValue(options.smallStep), // left arrow
            40: decreaseValue(options.smallStep), // down arrow
            39: increaseValue(options.smallStep), // right arrow
            38: increaseValue(options.smallStep), // up arrow
            35: setValue(options.maxValue), // end
            36: setValue(options.minValue), // home
            33: increaseValue(options.largeStep), // page up
            34: decreaseValue(options.largeStep)  // page down
        };

        $t.bind(this, {
            slide: this.onSlide,
            change: this.onChange,
            load: this.onLoad
        });
    };

    $t.rangeSlider.prototype = {
        enable: function () {
            this.wrapper
                .removeAttr("disabled")
                .removeClass("t-state-disabled")
                .addClass("t-state-default");

            var clickHandler = $.proxy(function (e) {
                if ($(e.target).hasClass("t-draghandle"))
                    return;

                var location = $t.touchLocation(e),
                    mousePosition = this.orientation == "horizontal" ? location.x : location.y,
                    dragableArea = $t.slider.getDragableArea(this.trackDiv, this.maxSelection, this.orientation),
                    val = $t.slider.getValueFromPosition(mousePosition, dragableArea, this);

                if (val < this.selectionStart) {
                    this._firstHandleDrag.start(e);
                } else if (val > this.selectionEnd) {
                    this._lastHandleDrag.start(e);
                } else {
                    if (val - this.selectionStart <= this.selectionEnd - val) {
                        this._firstHandleDrag.start(e);
                    } else {
                        this._lastHandleDrag.start(e);
                    }
                }
            }, this);

            this.wrapper
                .find(".t-tick").bind(MOUSEDOWN, clickHandler)
                .end()
                .find(".t-slider-track").bind(MOUSEDOWN, clickHandler);

            this.wrapper.find(".t-draghandle")
                .eq(0).bind({
                    keydown: $.proxy(function(e) {
                        this._keydown(e, true);
                    }, this)
                })
                .end()
                .eq(1).bind({
                    keydown: $.proxy(function(e) {
                        this._keydown(e, false);
                    }, this)
                });

            this.enabled = true;
        },

        disable: function () {
            this.wrapper
                .attr("disabled", "disabled")
                .removeClass("t-state-default")
                .addClass("t-state-disabled");

            this.wrapper
                .find(".t-tick").unbind(MOUSEDOWN)
                .end()
                .find(".t-slider-track").unbind(MOUSEDOWN);

            this.wrapper
                .find(".t-draghandle")
                .unbind("keydown")
                .bind("keydown", $t.preventDefault);

            this.enabled = false;
        },

        _keydown: function (e, isFirstHandle) {
            var selectionStartValue = this.selectionStart,
                selectionEndValue = this.selectionEnd;

            if (e.keyCode in this.keyMap) {
                if (isFirstHandle) {
                    selectionStartValue = this.keyMap[e.keyCode](selectionStartValue);

                    if (selectionStartValue > selectionEndValue) {
                        selectionEndValue = selectionStartValue;
                    }
                } else {
                    selectionEndValue = this.keyMap[e.keyCode](selectionEndValue);

                    if (selectionEndValue < selectionStartValue) {
                        selectionStartValue = selectionEndValue;
                    }
                }

                this._setValueInRange(selectionStartValue, selectionEndValue);
                e.preventDefault();
            }
        },

        _update: function (selectionStart, selectionEnd) {
            var values = this.values();

            var change = values[0] != selectionStart || values[1] != selectionEnd;

            this.values(selectionStart, selectionEnd);

            if (change) {
                $t.trigger(this.element, 'change', { values: [selectionStart, selectionEnd] });
            }
        },

        values: function (selectionStart, selectionEnd) {
            var values = [this.selectionStart, this.selectionEnd];

            selectionStart = round(selectionStart);
            if (isNaN(selectionStart)) {
                return values;
            }

            selectionEnd = round(selectionEnd);
            if (isNaN(selectionEnd)) {
                return values;
            }

            if (selectionStart >= this.minValue && selectionStart <= this.maxValue
            && selectionEnd >= this.minValue && selectionEnd <= this.maxValue && selectionStart <= selectionEnd) {
                if (this.selectionStart != selectionStart || this.selectionEnd != selectionEnd) {
                    $(this.element).find("input")
                                   .eq(0).attr("value", parseValue(round(selectionStart)))
                                   .end()
                                   .eq(1).attr("value", parseValue(round(selectionEnd)));

                    this.selectionStart = selectionStart;
                    this.selectionEnd = selectionEnd;
                    this.refresh();
                }
            }
        },

        refresh: function() {
            $t.trigger(this.element, 't:moveSelection', { values: [this.selectionStart, this.selectionEnd] });

            if (this.selectionStart == this.maxValue && this.selectionEnd == this.maxValue) {
                this._setZIndex("firstHandle");
            }
        },

        _setValueInRange: function (selectionStart, selectionEnd) {
            selectionStart = Math.max(selectionStart, this.minValue);
            selectionStart = Math.min(selectionStart, this.maxValue);

            selectionEnd = Math.max(selectionEnd, this.minValue);
            selectionEnd = Math.min(selectionEnd, this.maxValue);

            if (this.selectionStart == this.maxValue && this.selectionEnd == this.maxValue) {
                this._setZIndex("firstHandle");
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

            if (type == "firstHandle") {
                firstHandle.css(zIndex, "1");
                secondHandle.css(zIndex, "");
            } else {
                firstHandle.css(zIndex, "");
                secondHandle.css(zIndex, "1");
            }
        }
    };

    $t.rangeSlider.Selection = function (options) {
        var owner = options.owner;

        function moveSelection(values) {
            var selectionStartValue = values[0] - owner.minValue,
                selectionEndValue = values[1] - owner.minValue,
                selectionStartIndex = Math.ceil(round(selectionStartValue / owner.smallStep)),
                selectionEndIndex = Math.ceil(round(selectionEndValue / owner.smallStep)),
                selectionStart = owner._pixelStepsArray[selectionStartIndex],
                selectionEnd = owner._pixelStepsArray[selectionEndIndex],
                dragHandles = owner.wrapper.find(".t-draghandle"),
                halfHandle = parseInt(dragHandles.eq(0)[options.outerSize]() / 2, 10) + 1;

            dragHandles.eq(0).css(options.position, selectionStart - halfHandle)
                       .end()
                       .eq(1).css(options.position, selectionEnd - halfHandle);

            makeSelection(selectionStart, selectionEnd);
        }

        function makeSelection(selectionStart, selectionEnd) {
            var selection = 0,
                selectionPosition = 0,
                selectionDiv = owner.trackDiv.find(".t-slider-selection");

            selection = Math.abs(selectionStart - selectionEnd);
            selectionPosition = selectionStart < selectionEnd ? selectionStart : selectionEnd;

            selectionDiv[options.size](selection);
            selectionDiv.css(options.position, selectionPosition - 1);
        }

        moveSelection(owner.values());

        var handler = function (e) {
            moveSelection(e.values);
        };

        $(owner.element).bind({ "change": handler, "slide": handler, "t:moveSelection": handler  });
    };

    // jQuery extender
    $.fn.tRangeSlider = function (options) {
        return $t.create(this, {
            name: "tRangeSlider",
            init: function (element, options) {
                return new $t.rangeSlider(element, options);
            },
            options: options
        });
    };

    // default options
    $.fn.tRangeSlider.defaults = {
        enabled: true,
        minValue: 0,
        maxValue: 10,
        smallStep: 1,
        largeStep: 5,
        selectionStart: 0,
        selectionEnd: 10,
        orientation: "horizontal",
        tickPlacement: "both",
        tooltip: { enabled: true, format: "{0}" }
    };
})(jQuery);
