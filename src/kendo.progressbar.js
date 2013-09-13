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
        KPROGRESSWRAPPER = "k-state-selected",
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
        //NUMBER = "number",
        BOOLEAN = "boolean",
        math = Math,
        extend = $.extend,
        HUNDREDPERCENT = 100,
        DEFAULTANIMATIONDURATION = 2000,
        templates = {
            progressStatus: "<span class='k-progress-status-wrap'><span class='k-progress-status'>0 %</span></span>"
        };

    var ProgressBar = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(this, element, options);

            options = that.options;

            that._progressProperty = (options.orientation === HORIZONTAL) ? "width" : "height";

            that._wrapper();

            options.value = that._validateValue(options.value);

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
            type: PROGRESSTYPE.VALUE,
            chunkCount: DEFAULTCHUNKCOUNT,
            showStatus: true,
            animation: {}
        },

        _wrapper: function() {
            var that = this,
                container = that.wrapper = that.element,
                options = that.options,
                orientation = options.orientation;

            container.addClass("k-widget " + KPROGRESSBAR);

            container.addClass(KPROGRESSBAR + "-" + ((orientation === HORIZONTAL) ? HORIZONTAL : VERTICAL));

            if (options.reverse) {
                container.addClass(KPROGRESSBARREVERSE);
            }

            if (options.type === PROGRESSTYPE.CHUNK) {
                that._addChunkProgressWrapper();
            } else {
                if (options.showStatus){
                    that.wrapper.prepend(templates.progressStatus);
                }
            }
        },

        value: function(value) {
            var that = this,
                options = that.options,
                rounded;

            if (value === undefined) {
                return options.value;
            } else if (typeof value !== BOOLEAN) {
                rounded = math.round(value);

                if (!isNaN(rounded) && rounded != options.value) {
                    //set numeric value
                    options.value = that._validateValue(rounded);

                    that._change();
                    that._updateProgress();
                }
            } else if (!value) {
                //set indeterminate state
                options.value = value;
            }
        },

        _validateValue: function(value) {
            var that = this,
                options = that.options;

            if (value <= options.min) {
                return options.min;
            } else if (value >= options.max) {
                return options.max;
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

            that.trigger(CHANGE, { value: options.value });

            if (options.value === options.max) {
                that.trigger(COMPLETE, { value: options.max });
            }
        },

        _updateProgress: function() {
            var that = this,
                options = that.options,
                percentage = that._calculatePercentage();

            if (options.type === PROGRESSTYPE.CHUNK) {
                that._updateChunks(percentage);
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
                animation = options.animation,
                progressWrapper = that.wrapper.find("." + KPROGRESSWRAPPER),
                //progressProperty = that._progressProperty,
                animationCssOptions = { };

            if (progressWrapper.length === 0) {
                progressWrapper = that._addRegularProgressWrapper();
            }

            //TODO check if it's setting initial value or updating it
            animationCssOptions[that._progressProperty] = percentage + "%";
            progressWrapper.animate(animationCssOptions, that._isStarted ? animation : { duration: 0 });
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
                chunkSize = $.proxy(that._calculateChunkSize, that),
                html = "",
                chunks;

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
                max = options.max;

            return (math.abs(value - min) / (max - min)) * 100;
        },

        _progressAnimation: function() {
            var that = this,
                options = that.options,
                animation = options.animation;

            if (animation === false) {
                options.animation = { duration: 0 };
            } else {
                options.animation = extend({
                    duration: DEFAULTANIMATIONDURATION
                }, options.animation);
            }
        }
    });

    kendo.ui.plugin(ProgressBar);
})(window.kendo.jQuery);