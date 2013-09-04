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
        KPROGRESSBAR = "k-progressbar",
        KPROGRESSBARREVERSE = "k-progressbar-reverse",
        PROGRESSTYPE = {
            VALUE: "value",
            PERCENT: "percent",
            CHUNK: "chunk"
        },
        CHANGE = "change",
        COMPLETE = "complete",
        START = "start",
        NUMBER = "number",
        BOOLEAN = "boolean"

        templates = {
            regularProgressWrapper: "<div class='k-state-selected'></div>",
            chunkProgressWrapper: "<ul class='k-reset'></ul>",
            chunk: "<li class='k-item'></li>",
            progressStatus: "<span class='k-progress-status-wrap'><span class='k-progress-status'></span></span>"
        };

    var ProgressBar = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(this, element, options);

            var container = that.wrapper = that.element;

            var options = that.options;

            that._wrapper();

            if (options.type == PROGRESSTYPE.CHUNK) {

            } 

            if (options.showStatus) {
                that._addProgressStatus();
            }
        },

        // setOptions: function(options) {
        //     var that = this;
        //     Widget.fn.setOptions.call(that, options);
        // },

        events: [
            CHANGE,
            COMPLETE,
            START
        ],

        options: {
            name: "ProgressBar",
            orientation: HORIZONTAL,
            reverse: false,
            min: 0,
            max: 100,
            value: 50,
            enable: true,
            type: PROGRESSTYPE.VALUE,
            //chunkCount,
            showStatus: true //rename?
        },

        value: function(value) {
            var that = this,
                options = that.options;

            if (value === undefined) {
                return options.value;
            } else if (typeof value === NUMBER) {
                //set value
                // if (options.min <= value && value <= options.max && value != options.value) {}
            } else if (typeof value === BOOLEAN) {
                //set indeterminate state
            }
        },

        enable: function() {

        },

        destroy: function() {
            var that = this;

            Widget.fn.destroy.call(that);
        },

        _wrapper: function() {
            var that = this,
                options = that.options,
                orientation = options.orientation,
                container = that.wrapper;

            container.addClass("k-widget " + KPROGRESSBAR);
            container.addClass("k-progressbar-" + orientation);

            if (options.reverse) {
                container.addClass(KPROGRESSBARREVERSE);
            }

            //that._addProgressWrapper();
        },

        _addProgressWrapper: function() {
            var that = this,
                options = that.options;

            if (options.type == PROGRESSTYPE.CHUNK) {
                that.wrapper.append(templates.chunkProgressWrapper);
            } else {
                that.wrapper.append(templates.regularProgressWrapper);
            }
        },

        _addProgressStatus: function() {
            var that = this,
                options = that.options,
                container = that.wrapper;

            that.wrapper.prepend(templates.progressStatus);
        }
    });

    kendo.ui.plugin(ProgressBar);
})(window.kendo.jQuery);