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

            options.value = that._validateValue(options.value);

            that._wrapper();

            that._progressAnimation();

            that._updateProgress();

            that._isStarted = that._isFinished = false;
        },

        setOptions: function(options) {
            var that = this;
            
            Widget.fn.setOptions.call(that, options);
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
            type: PROGRESSTYPE.VALUE, // or percent
            chunkCount: DEFAULTCHUNKCOUNT,
            showStatus: true,
            animation: {}
        },

        _wrapper: function() {
            var that = this,
                container = that.wrapper = that.element,
                options = that.options,
                orientation = options.orientation,
                progressStatus;

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

                    if (options.type === PROGRESSTYPE.VALUE) {
                        progressStatus.text(options.value);
                    } else {
                        progressStatus.text(that._calculatePercentage(options.value) + "%");
                    }
                }
            }
        },

        value: function(value) {
            return this._value(value);
        },

        _value: function(value){
            var that = this,
                options = that.options,
                rounded;

            if (value === undefined) {
                return options.value;
            } else if (typeof value !== BOOLEAN) {
                rounded = math.round(value);

                if (!isNaN(rounded) && rounded != options.value) {
                    that.wrapper.removeClass(KPROGRESSBARINDETERMINATE);
                    options.value = that._validateValue(rounded);

                    that._change();
                }
            } else if (!value) {
                that.wrapper.addClass(KPROGRESSBARINDETERMINATE);
                options.value = value;
            }
        },

        _validateValue: function(value) {
            var that = this,
                options = that.options;

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
            var that = this,
                options = that.options;

            if(!that._isStarted) {
                that.trigger(START, { value: options.value });

                that._isStarted = true;
            }

            that._updateProgress();
        },

        _updateProgress: function() {
            var that = this,
                options = that.options,
                percentage = that._calculatePercentage();

            if (options.type === PROGRESSTYPE.CHUNK) {
                that._updateChunks(percentage);
                that._onProgressUpdateAlways(options.value);
            } else {
                if (options.value != options.min) {
                    that._updateProgressWrapper(percentage);
                }
            }
        },

        _updateChunks: function(percentage) {
            var that = this,
                options = that.options,
                chunkCount = options.chunkCount,
                percentagesPerChunk =  parseInt((HUNDREDPERCENT / chunkCount) * 100, 10) / 100,
                percentageParsed = parseInt(percentage * 100, 10) / 100,
                completedChunks = math.floor(percentageParsed / percentagesPerChunk);

            that.wrapper.find("li.k-item:lt(" + completedChunks + ")")
                        .removeClass(KUPCOMINGCHUNK)
                        .addClass(KCOMPLETEDCHUNK);
        },

        _updateProgressWrapper: function(percentage) {
            var that = this,
                options = that.options,
                progressWrapper = that.wrapper.find("." + KPROGRESSWRAPPER),
                animationDuration = that._isStarted ? that._animation.duration : 0,
                animationCssOptions = { };

            if (progressWrapper.length === 0) {
                progressWrapper = that._addRegularProgressWrapper();
            }

            animationCssOptions[that._progressProperty] = percentage + "%";
            progressWrapper.animate(animationCssOptions, {
                duration: animationDuration,
                progress: proxy(that._onProgressAnimate, that),
                complete: proxy(that._onProgressAnimateComplete, that),
                always: proxy(that._onProgressUpdateAlways, that, options.value)
            });
        },

        _onProgressAnimate: function(e) {
            var that = this,
                options = that.options,
                progressInPercent = math.round(parseFloat(e.elem.style[that._progressProperty], 10)),
                progressStatusHolder = that.wrapper.find("." + KPROGRESSSTATUS),
                progressValue;

            //same as in _calculatePercentage. expose if needed
            var onePercent = math.abs((options.max - options.min) / 100);

            if (options.showStatus) {
                if (options.type === PROGRESSTYPE.VALUE) {
                    progressValue = math.floor(options.min + (progressInPercent * onePercent));

                    progressStatusHolder.text(progressValue);
                } else {
                    progressStatusHolder.text(progressInPercent + "%");
                }
            }
        },

        _onProgressAnimateComplete: function() {
            var that = this,
                options = that.options,
                progressWrapper = that.wrapper.find("." + KPROGRESSWRAPPER),
                progressStatusHolder = that.wrapper.find("." + KPROGRESSSTATUS),
                progressWrapperWidth = parseFloat(progressWrapper[0].style.width);

            if (options.type !== PROGRESSTYPE.CHUNK && progressWrapperWidth > 98) {
                progressWrapper.addClass(KPROGRESSBARCOMPLETE);
            }

            if (options.showStatus) {
                if (options.type === PROGRESSTYPE.VALUE) {
                    progressStatusHolder.text(options.value);
                } else {
                    progressStatusHolder.text(math.floor(that._calculatePercentage(options.value)) + "%");
                }
            }
        },

        _onProgressUpdateAlways: function(currentValue) {
            var that = this,
                options = that.options;

            if (that._isStarted) {
                that.trigger(CHANGE, { value: currentValue });
            }

            if (currentValue === options.max && that._isFinished === false) {
                that.trigger(COMPLETE, { value: options.max });
                that._isFinished = true;
            }
        },

        enable: function(enable) {
            var that = this,
                options = that.options;

            options.enable = typeof(enable) === "undefined" ? true : enable;
            that.wrapper.toggleClass(KSTATEDISABLED, !options.enable);
        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);
        },

        _addChunkProgressWrapper: function () {
            var that = this,
                options = that.options,
                container = that.wrapper,
                chunkSize = proxy(that._calculateChunkSize, that),
                html = "",
                chunks;

            if (options.chunkCount <= 1) {
                options.chunkCount = DEFAULTCHUNKCOUNT;
            }

            html += "<ul class='k-reset'>";
            for (var i = options.chunkCount - 1; i >= 0; i--) {
                html += "<li class='k-item k-state-default'></li>";
            }
            html += "</ul>";

            chunks = container.append(html).find(".k-item").css(that._progressProperty, chunkSize);
            chunks.first().addClass("k-first")
                  .end()
                  .last().addClass("k-last");
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
            var that = this,
                size = that.wrapper.css(that._progressProperty);

            that.wrapper.find("." + KPROGRESSWRAPPER).append(templates.progressStatus)
                        .find(".k-progress-status-wrap").css(that._progressProperty, size);
        },

        _calculateChunkSize: function() {
            var that = this,
                container = that.wrapper,
                chunkCount = that.options.chunkCount;

            return (parseInt(container.css(that._progressProperty), 10) - (chunkCount - 1)) / chunkCount;
        },

        _calculatePercentage: function() {
            var that = this,
                options = that.options,
                value = options.value,
                min = options.min,
                max = options.max,
                onePercent = math.abs((max - min) / 100),
                percentValue = math.abs((value - min) / onePercent);

                // console.log("One percent: " + onePercent);
                // console.log("Percentage: " + percentValue);

            return percentValue;

            //return (math.abs(value - min) / (max - min)) * 100;
        },

        _progressAnimation: function() {
            var that = this,
                options = that.options,
                animation = options.animation;

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