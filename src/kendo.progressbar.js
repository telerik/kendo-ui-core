import "./kendo.core.js";

var __meta__ = {
    id: "progressbar",
    name: "ProgressBar",
    category: "web",
    description: "The ProgressBar offers rich functionality for displaying and tracking progress",
    depends: [ "core" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        HORIZONTAL = "horizontal",
        VERTICAL = "vertical",
        DEFAULTMIN = 0,
        DEFAULTMAX = 100,
        DEFAULTVALUE = 0,
        DEFAULTCHUNKCOUNT = 5,
        KPROGRESSBAR = "k-progressbar",
        KPROGRESSBARREVERSE = "k-progressbar-reverse",
        KPROGRESSBARINDETERMINATE = "k-progressbar-indeterminate",
        KPROGRESSBARCOMPLETE = "k-complete",
        KPROGRESSWRAPPER = "k-selected",
        KPROGRESSSTATUS = "k-progress-status",
        LABEL_POSITION_END = "k-progress-end",
        KCOMPLETEDCHUNK = "k-selected",
        STATEDISABLED = "k-disabled",
        PROGRESS_VALUE = "k-progressbar-value",
        CHUNK_ITEM = "k-progressbar-chunk",
        PROGRESSTYPE = {
            VALUE: "value",
            PERCENT: "percent",
            CHUNK: "chunk"
        },
        CHANGE = "change",
        COMPLETE = "complete",
        BOOLEAN = "boolean",
        math = Math,
        extend = $.extend,
        HUNDREDPERCENT = 100,
        DEFAULTANIMATIONDURATION = 400,
        PRECISION = 3,
        templates = {
            progressStatus: "<span class='k-progress-status-wrap " + LABEL_POSITION_END + "'><span class='k-progress-status'></span></span>",
            announceElement: '<span aria-live="polite" class="k-sr-only k-progress-announce"></span>'
        };

    var ProgressBar = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(this, element, options);

            options = that.options;

            that._progressProperty = (options.orientation === HORIZONTAL) ? "width" : "height";

            that._fields();

            options.value = that._validateValue(options.value);

            that._validateType(options.type);

            that._wrapper();

            if (options.ariaRole) {
                that._aria();
            }

            that._progressAnimation();

            if ((options.value !== options.min) && (options.value !== false)) {
               that._updateProgress();
            }
        },

        setOptions: function(options) {
            var that = this,
                wrapper = that.wrapper;

            Widget.fn.setOptions.call(that, options);

            if (options.hasOwnProperty("reverse")) {
                wrapper.toggleClass("k-progressbar-reverse", options.reverse);
            }

            if (options.hasOwnProperty("enable")) {
                that.enable(options.enable);
            }

            if (options.ariaRole) {
                that._aria();
            }

            that._progressAnimation();

            that._validateValue();

            that._updateProgress();
        },

        events: [
            CHANGE,
            COMPLETE
        ],

        options: {
            name: "ProgressBar",
            orientation: HORIZONTAL,
            reverse: false,
            min: DEFAULTMIN,
            max: DEFAULTMAX,
            value: DEFAULTVALUE,
            enable: true,
            type: PROGRESSTYPE.VALUE,
            chunkCount: DEFAULTCHUNKCOUNT,
            showStatus: true,
            animation: { },
            label: null,
            labelId: null,
            ariaRole: false
        },

        _aria: function() {
            var that = this,
                options = that.options,
                wrapper = that.wrapper;

            wrapper.attr({
                "role": "progressbar",
                "aria-valuemin": options.min,
                "aria-valuemax": options.max
            });

            if (!!options.labelId) {
                wrapper.attr("aria-labelledby", options.labelId);
            } else if (!!options.label) {
                wrapper.attr("aria-label", options.label);
            }

            that.announce = $(templates.announceElement);
            that.announce.appendTo($("body"));

            if (options.value !== false) {
                wrapper.attr("aria-valuenow", options.value);

                that.announce.text(that._calculatePercentage().toFixed() + "%");
            }
        },

        _fields: function() {
            var that = this;

            that._isStarted = false;

            that.progressWrapper = that.progressStatus = $();
        },

        _validateType: function(currentType) {
            var isValid = false;

            $.each(PROGRESSTYPE, function(k, type) {
                if (type === currentType) {
                    isValid = true;
                    return false;
                }
            });

            if (!isValid) {
                throw new Error(kendo.format("Invalid ProgressBar type '{0}'", currentType));
            }
        },

        _wrapper: function() {
            var that = this;
            var container = that.wrapper = that.element;
            var options = that.options;
            var orientation = options.orientation;
            var initialValue = (options.value !== false) ? options.value : options.min;

            container.addClass(KPROGRESSBAR);

            container.addClass(KPROGRESSBAR + "-" + ((orientation === HORIZONTAL) ? HORIZONTAL : VERTICAL));

            if (options.enable === false) {
                container.addClass(STATEDISABLED);
            }

            if (options.reverse) {
                container.addClass(KPROGRESSBARREVERSE);
            }

            if (options.value === false) {
                container.addClass(KPROGRESSBARINDETERMINATE);
            }

            if (options.type === PROGRESSTYPE.CHUNK) {
                that._addChunkProgressWrapper();
            } else {
                if (options.showStatus) {
                    that.progressStatus = that.wrapper.prepend(templates.progressStatus)
                                              .find("." + KPROGRESSSTATUS);

                    if (options.type === PROGRESSTYPE.VALUE) {
                        that.progressStatus.text(initialValue);
                    } else {
                        that.progressStatus.text(that._calculatePercentage(initialValue).toFixed() + "%");
                    }
                }
            }
        },

        value: function(value) {
            return this._value(value);
        },

        _value: function(value) {
            var that = this;
            var options = that.options;
            var validated;

            if (value === undefined) {
                return options.value;
            } else {
                if (typeof value !== BOOLEAN) {
                    value = that._roundValue(value);

                    if (!isNaN(value)) {
                        validated = that._validateValue(value);

                        if (validated !== options.value) {
                            that.wrapper.removeClass(KPROGRESSBARINDETERMINATE);

                            options.value = validated;

                            that._isStarted = true;

                            that._updateProgress();
                        }
                    }
                } else if (!value) {
                    that.wrapper.addClass(KPROGRESSBARINDETERMINATE);
                    that.wrapper.removeAttr("aria-valuenow");
                    options.value = false;

                    if (that.announce) {
                        that.announce.text("");
                    }
                }
            }
        },

        _roundValue: function(value) {
             value = parseFloat(value);

             var power = math.pow(10, PRECISION);

             return kendo._round(value * power) / power;
        },

        _validateValue: function(value) {
            var that = this;
            var options = that.options;

            if (value !== false) {
                if (value <= options.min || value === true) {
                    return options.min;
                } else if (value >= options.max) {
                    return options.max;
                }
            } else if (value === false) {
                return false;
            }

            if (isNaN(that._roundValue(value))) {
                return options.min;
            }

            return value;
        },

        _updateProgress: function() {
            var that = this;
            var options = that.options;
            var percentage = that._calculatePercentage();

            if (options.type === PROGRESSTYPE.CHUNK) {
                that._updateChunks(percentage);
                that._onProgressUpdateAlways(options.value);
            } else {
                that._updateProgressWrapper(percentage);
            }

            if (options.ariaRole) {
                that.wrapper.attr("aria-valuenow", that.options.value);

                if (that.announce) {
                    that.announce.text(percentage.toFixed() + "%");
                }
            }
        },

        _updateChunks: function(percentage) {
            var that = this;
            var options = that.options;
            var chunkCount = options.chunkCount;
            var percentagesPerChunk = parseInt((HUNDREDPERCENT / chunkCount) * 100, 10) / 100;
            var percentageParsed = parseInt(percentage * 100, 10) / 100;
            var completedChunksCount = math.floor(percentageParsed / percentagesPerChunk);
            var completedChunks;

            if ((options.orientation === HORIZONTAL && !(options.reverse)) ||
               (options.orientation === VERTICAL && options.reverse)) {
                completedChunks = that.wrapper.find("li." + CHUNK_ITEM).slice(0, completedChunksCount);
            } else if (completedChunksCount === 0) {
                completedChunks = kendo.jQuery();
            } else {
                completedChunks = that.wrapper.find("li." + CHUNK_ITEM).slice(completedChunksCount * -1);
            }

            that.wrapper.find("." + KCOMPLETEDCHUNK)
                        .removeClass(KCOMPLETEDCHUNK + " " + PROGRESS_VALUE);

            completedChunks.addClass(KCOMPLETEDCHUNK + " " + PROGRESS_VALUE);
        },

        _updateProgressWrapper: function(percentage) {
            var that = this;
            var options = that.options;
            var progressWrapper = that.wrapper.find("." + KPROGRESSWRAPPER);
            var animationDuration = that._isStarted ? that._animation.duration : 0;
            var animationCssOptions = { };

            if (progressWrapper.length === 0) {
                that._addRegularProgressWrapper();
            }

            animationCssOptions[that._progressProperty] = percentage + "%";
            that.progressWrapper.animate(animationCssOptions, {
                duration: animationDuration,
                start: that._onProgressAnimateStart.bind(that),
                progress: that._onProgressAnimate.bind(that),
                complete: that._onProgressAnimateComplete.bind(that, options.value),
                always: that._onProgressUpdateAlways.bind(that, options.value)
            });
        },

        _onProgressAnimateStart: function() {
            this.progressWrapper.show();
        },

        _onProgressAnimate: function(e) {
            var that = this;
            var options = that.options;
            var progressInPercent = parseFloat(e.elem.style[that._progressProperty], 10);
            var progressStatusWrapSize;

            if (options.showStatus) {
                progressStatusWrapSize = 10000 / parseFloat(that.progressWrapper[0].style[that._progressProperty]);

                that.progressWrapper.find(".k-progress-status-wrap").css(that._progressProperty, progressStatusWrapSize + "%");
            }

            if (options.type !== PROGRESSTYPE.CHUNK && progressInPercent <= 98) {
                that.progressWrapper.removeClass(KPROGRESSBARCOMPLETE);
            }
        },

        _onProgressAnimateComplete: function(currentValue) {
            var that = this;
            var options = that.options;
            var progressWrapperSize = parseFloat(that.progressWrapper[0].style[that._progressProperty]);
            var progressValue;

            if (options.type !== PROGRESSTYPE.CHUNK && progressWrapperSize > 98) {
                that.progressWrapper.addClass(KPROGRESSBARCOMPLETE);
            }

            if (options.showStatus) {
                if (options.type === PROGRESSTYPE.VALUE) {
                    progressValue = currentValue;
                } else if (options.type == PROGRESSTYPE.PERCENT) {
                    progressValue = that._calculatePercentage(currentValue).toFixed() + "%";
                } else {
                    progressValue = math.floor(that._calculatePercentage(currentValue)) + "%";
                }
                that.progressStatus.text(progressValue);
            }

            if (currentValue === options.min) {
                that.progressWrapper.hide();
            }
        },

        _onProgressUpdateAlways: function(currentValue) {
            var that = this;
            var options = that.options;

            if (that._isStarted) {
                that.trigger(CHANGE, { value: currentValue });
            }

            if (currentValue === options.max && that._isStarted) {
                that.trigger(COMPLETE, { value: options.max });
            }
        },

        enable: function(enable) {
            var that = this;
            var options = that.options;

            options.enable = typeof(enable) === "undefined" ? true : enable;
            that.wrapper.toggleClass(STATEDISABLED, !options.enable);
        },

        destroy: function() {
            var that = this;

            if (that.announce) {
                that.announce.remove();
            }

            Widget.fn.destroy.call(that);
        },

        _addChunkProgressWrapper: function() {
            var that = this;
            var options = that.options;
            var container = that.wrapper;
            var chunkSize = HUNDREDPERCENT / options.chunkCount;
            var html = "";

            if (options.chunkCount <= 1) {
                options.chunkCount = 1;
            }

            that.element.addClass("k-chunk-progressbar");
            html += "<ul class='k-reset k-progressbar-chunks'>";
            for (var i = options.chunkCount - 1; i >= 0; i--) {
                html += "<li class='" + CHUNK_ITEM + "'></li>";
            }
            html += "</ul>";

            container.append(html).find("." + CHUNK_ITEM).css(that._progressProperty, chunkSize + "%")
                     .first().addClass("k-first")
                     .end()
                     .last().addClass("k-last");

            that._normalizeChunkSize();
        },

        _normalizeChunkSize: function() {
            var that = this;
            var options = that.options;
            var lastChunk = that.wrapper.find("." + CHUNK_ITEM).last();
            var currentSize = parseFloat(lastChunk[0].style[that._progressProperty]);
            var difference = HUNDREDPERCENT - (options.chunkCount * currentSize);

            if (difference > 0) {
                lastChunk.css(that._progressProperty, (currentSize + difference) + "%");
            }
        },

        _addRegularProgressWrapper: function() {
            var that = this;

            that.progressWrapper = $("<div class='" + KPROGRESSWRAPPER + " " + PROGRESS_VALUE + "'></div>").appendTo(that.wrapper);

            if (that.options.showStatus) {
                that.progressWrapper.append(templates.progressStatus);

                that.progressStatus = that.wrapper.find("." + KPROGRESSSTATUS);
            }
        },

        _calculateChunkSize: function() {
            var that = this;
            var chunkCount = that.options.chunkCount;
            var chunkContainer = that.wrapper.find("ul.k-reset");

            return (parseInt(chunkContainer.css(that._progressProperty), 10) - (chunkCount - 1)) / chunkCount;
        },

        _calculatePercentage: function(currentValue) {
            var that = this;
            var options = that.options;
            var value = (currentValue !== undefined) ? currentValue : options.value;
            var min = options.min;
            var max = options.max;
            that._onePercent = math.abs((max - min) / 100);

            return math.abs((value - min) / that._onePercent);
        },

        _progressAnimation: function() {
            var that = this;
            var options = that.options;
            var animation = options.animation;

            if (animation === false) {
                that._animation = { duration: 0 };
            } else {
                that._animation = extend({
                    duration: DEFAULTANIMATIONDURATION
                }, options.animation);
            }
        }
    });

    kendo.ui.plugin(ProgressBar);
})(window.kendo.jQuery);

