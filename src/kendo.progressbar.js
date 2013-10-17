kendo_module({
    id: "progressbar",
    name: "ProgressBar",
    category: "web",
    description: "The ProgressBar offers rich functionality for displaying and tracking progress",
    depends: [ "core" ]
});

(function ($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        HORIZONTAL = "horizontal",
        VERTICAL = "vertical",
        FORWARD = "forward",
        BACKWARD = "backward",
        DEFAULTMIN = 0,
        DEFAULTMAX = 100,
        DEFAULTVALUE = 0,
        DEFAULTCHUNKCOUNT = 5,
        KPROGRESSBAR = "k-progressbar",
        KPROGRESSBARREVERSE = "k-progressbar-reverse",
        KPROGRESSBARINDETERMINATE = "k-progressbar-indeterminate",
        KPROGRESSBARCOMPLETE = "k-complete",
        KPROGRESSWRAPPER = "k-state-selected",
        KPROGRESSSTATUS = "k-progress-status",
        KCOMPLETEDCHUNK = "k-state-selected",
        KUPCOMINGCHUNK = "k-state-default",
        KSTATEDISABLED = "k-state-disabled",
        PROGRESSTYPE = {
            VALUE: "value",
            PERCENT: "percent",
            CHUNK: "chunk"
        },
        CHANGE = "change",
        COMPLETE = "complete",
        START = "start",
        BOOLEAN = "boolean",
        math = Math,
        extend = $.extend,
        proxy = $.proxy,
        HUNDREDPERCENT = 100,
        DEFAULTANIMATIONDURATION = 2000,
        templates = {
            progressStatus: "<span class='k-progress-status-wrap'><span class='k-progress-status'></span></span>"
        };

    var ProgressBar = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(this, element, options);

            options = that.options;

            that._progressProperty = (options.orientation === HORIZONTAL) ? "width" : "height";

            that._isStarted = that._isFinished = false;

            that._progressDirection = FORWARD;

            options.value = that._validateValue(options.value);

            that._validateType(options.type);

            that._wrapper();

            that._progressAnimation();

            if ((options.value !== options.min) && (options.value !== false)) {
               that._updateProgress();
            }
        },

        setOptions: function(options) {
            var that = this;
            
            Widget.fn.setOptions.call(that, options);

            that._progressAnimation();

            that._validateValue();

            that._updateProgress();
        },

        events: [
            CHANGE,
            COMPLETE,
            START
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
            animation: { }
        },

        _validateType: function(currentType){
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
            var progressStatus;
            var initialStatusValue;

            container.addClass("k-widget " + KPROGRESSBAR);

            container.addClass(KPROGRESSBAR + "-" + ((orientation === HORIZONTAL) ? HORIZONTAL : VERTICAL));

            if(options.enable === false) {
                container.addClass(KSTATEDISABLED);
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
                if (options.showStatus){
                    progressStatus = that.wrapper.prepend(templates.progressStatus)
                                                 .find("." + KPROGRESSSTATUS);

                    initialStatusValue = (options.value !== false) ? options.value : options.min;

                    if (options.type === PROGRESSTYPE.VALUE) {
                        progressStatus.text(initialStatusValue);
                    } else {
                        progressStatus.text(that._calculatePercentage(initialStatusValue) + "%");
                    }
                }
            }
        },

        value: function(value) {
            return this._value(value);
        },

        _value: function(value){
            var that = this;
            var options = that.options;
            var rounded;

            if (value === undefined) {
                return options.value;
            } else if (!that.wrapper.hasClass(KSTATEDISABLED)) {

                if (typeof value !== BOOLEAN) {
                    rounded = math.round(value);

                    if (!isNaN(rounded)) {
                        rounded = that._validateValue(rounded);

                        if (rounded !== options.value) {
                            that.wrapper.removeClass(KPROGRESSBARINDETERMINATE);

                            options.value = rounded;

                            that._change();
                        }
                    }
                } else if (!value) {
                    that.wrapper.addClass(KPROGRESSBARINDETERMINATE);
                    options.value = value;
                }
            }
        },

        _validateValue: function(value) {
            var that = this;
            var options = that.options;

            if (value !== false) {
                if (value <= options.min) {
                    return options.min;
                } else if (value >= options.max) {
                    return options.max;
                }
            }

            return value;
        },

        _change: function() {
            var that = this;
            var options = that.options;

            if(!that._isStarted) {
                that.trigger(START, { value: options.value });

                that._isStarted = true;
            }

            that._updateProgress();
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
        },

        _updateChunks: function(percentage) {
            var that = this;
            var options = that.options;
            var chunkCount = options.chunkCount;
            var percentagesPerChunk =  parseInt((HUNDREDPERCENT / chunkCount) * 100, 10) / 100;
            var percentageParsed = parseInt(percentage * 100, 10) / 100;
            var completedChunksCount = math.floor(percentageParsed / percentagesPerChunk);
            var completedChunks;
            var chunkContainer = that.wrapper.find("ul.k-reset");

            if((options.orientation === HORIZONTAL && !(options.reverse)) ||
               (options.orientation === VERTICAL && options.reverse)) {
                completedChunks = that.wrapper.find("li.k-item:lt(" + completedChunksCount + ")");
            } else {
                completedChunks = that.wrapper.find("li.k-item:gt(-" + (completedChunksCount + 1) + ")");
            }

            that.wrapper.find("." + KCOMPLETEDCHUNK)
                        .removeClass(KCOMPLETEDCHUNK)
                        .addClass(KUPCOMINGCHUNK);

            completedChunks.removeClass(KUPCOMINGCHUNK)
                           .addClass(KCOMPLETEDCHUNK);

            chunkContainer.toggleClass(KCOMPLETEDCHUNK, options.value === options.max);
        },

        _updateProgressWrapper: function(percentage) {
            var that = this;
            var options = that.options;
            var progressWrapper = that.wrapper.find("." + KPROGRESSWRAPPER);
            var animationDuration = that._isStarted ? that._animation.duration : 0;
            var animationCssOptions = { };

            if (progressWrapper.length === 0) {
                progressWrapper = that._addRegularProgressWrapper();
            }

            animationCssOptions[that._progressProperty] = percentage + "%";
            progressWrapper.animate(animationCssOptions, {
                duration: animationDuration,
                start: proxy(that._onProgressAnimateStart, that),
                progress: proxy(that._onProgressAnimate, that),
                complete: proxy(that._onProgressAnimateComplete, that, options.value),
                always: proxy(that._onProgressUpdateAlways, that, options.value)
            });
        },

        _onProgressAnimateStart: function() {
            var that = this;
            var options = that.options;

            if (that._oldValue !== undefined) {
                that._progressDirection = (options.value >= that._oldValue) ? FORWARD : BACKWARD;
            }

            that.wrapper.find("." + KPROGRESSWRAPPER).show();
        },

        _onProgressAnimate: function(e) {
            var that = this;
            var options = that.options;
            var oldValue = (that._oldValue !== undefined) ? that._oldValue : options.min;
            var progressInPercent = parseFloat(e.elem.style[that._progressProperty], 10);
            var progressStatusHolder = that.wrapper.find("." + KPROGRESSSTATUS);
            var progressWrapper = that.wrapper.find("." + KPROGRESSWRAPPER);
            var progressStatusWrapSize;
            var progressValue;

            if (options.showStatus) {
                progressStatusWrapSize = 10000 / parseFloat(progressWrapper[0].style[that._progressProperty]);

                progressWrapper.find(".k-progress-status-wrap").css(that._progressProperty, progressStatusWrapSize + "%");

                if (options.type === PROGRESSTYPE.VALUE) {
                    progressValue = math.floor(options.min + (progressInPercent * that._onePercent));

                    if (((that._progressDirection === BACKWARD && progressValue <= oldValue) ||
                         (that._progressDirection === FORWARD && progressValue >= oldValue))) {

                        progressStatusHolder.text(progressValue);
                    }
                } else {
                    progressInPercent = math.round(progressInPercent);
                    if (progressInPercent < HUNDREDPERCENT) {
                        progressStatusHolder.text(progressInPercent + "%");
                    }
                }
            }

            if (options.type !== PROGRESSTYPE.CHUNK && progressInPercent <= 98) {
                that.wrapper.find("." + KPROGRESSWRAPPER).removeClass(KPROGRESSBARCOMPLETE);
            }
        },

        _onProgressAnimateComplete: function(currentValue) {
            var that = this;
            var options = that.options;
            var progressWrapper = that.wrapper.find("." + KPROGRESSWRAPPER);
            var progressStatusHolder = that.wrapper.find("." + KPROGRESSSTATUS);
            var progressWrapperSize = parseFloat(progressWrapper[0].style[that._progressProperty]);

            if (options.type !== PROGRESSTYPE.CHUNK && progressWrapperSize > 98) {
                progressWrapper.addClass(KPROGRESSBARCOMPLETE);
            }

            if (options.showStatus) {
                if (options.type === PROGRESSTYPE.VALUE) {
                    progressStatusHolder.text(currentValue);
                } else {
                    progressStatusHolder.text(math.floor(that._calculatePercentage(currentValue)) + "%");
                }
            }

            if (currentValue === options.min) {
                progressWrapper.hide();
            }
        },

        _onProgressUpdateAlways: function(currentValue) {
            var that = this;
            var options = that.options;

            that._oldValue = currentValue;

            if (that._isStarted) {
                that.trigger(CHANGE, { value: currentValue });
            }

            if (currentValue === options.max && that._isFinished === false && that._isStarted) {
                that.trigger(COMPLETE, { value: options.max });
                that._isFinished = true;
            }
        },

        enable: function(enable) {
            var that = this;
            var options = that.options;

            options.enable = typeof(enable) === "undefined" ? true : enable;
            that.wrapper.toggleClass(KSTATEDISABLED, !options.enable);
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);
        },

        _addChunkProgressWrapper: function () {
            var that = this;
            var options = that.options;
            var container = that.wrapper;
            var chunkSize = HUNDREDPERCENT / options.chunkCount;
            var html = "";

            if (options.chunkCount <= 1) {
                options.chunkCount = DEFAULTCHUNKCOUNT;
            }

            html += "<ul class='k-reset'>";
            for (var i = options.chunkCount - 1; i >= 0; i--) {
                html += "<li class='k-item k-state-default'></li>";
            }
            html += "</ul>";

            container.append(html).find(".k-item").css(that._progressProperty, chunkSize + "%")
                     .first().addClass("k-first")
                     .end()
                     .last().addClass("k-last");

            that._normalizeChunkSize();
        },

        _normalizeChunkSize: function() {
            var that = this;
            var options = that.options;
            var lastChunk = that.wrapper.find(".k-item:last");
            var currentSize = parseFloat(lastChunk[0].style[that._progressProperty]);
            var difference = HUNDREDPERCENT - (options.chunkCount * currentSize);

            if (difference > 0) {
                lastChunk.css(that._progressProperty, (currentSize + difference) + "%");
            }
        },

        _addRegularProgressWrapper: function() {
            var that = this;

            that.wrapper.append("<div class='" + KPROGRESSWRAPPER + "'></div>");

            if (that.options.showStatus) {
                that._addProgressStatus();
            }

            return $("." + KPROGRESSWRAPPER, that.wrapper);
        },

        _addProgressStatus: function() {
            var that = this;
            var size = that.wrapper.css(that._progressProperty);

            that.wrapper.find("." + KPROGRESSWRAPPER).append(templates.progressStatus)
                        .find(".k-progress-status-wrap").css(that._progressProperty, size);
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