(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "mobile.loader",
    name: "Loader",
    category: "mobile",
    description: "Mobile Loader",
    depends: [ "core" ],
    hidden: true
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Widget = ui.Widget,
        CAPTURE_EVENTS = $.map(kendo.eventMap, function(value) { return value; }).join(" ").split(" ");

    var Loader = Widget.extend({
        init: function(container, options) {
            var that = this,
                element = $('<div class="km-loader"><span class="km-loading km-spin"></span><span class="km-loading-left"></span><span class="km-loading-right"></span></div>');

            Widget.fn.init.call(that, element, options);

            that.container = container;
            that.captureEvents = false;

            that._attachCapture();

            element.append(that.options.loading).hide().appendTo(container);
        },

        options: {
            name: "Loader",
            loading: "<h1>Loading...</h1>",
            timeout: 100
        },

        show: function() {
            var that = this;

            clearTimeout(that._loading);

            if (that.options.loading === false) {
                return;
            }

            that.captureEvents = true;
            that._loading = setTimeout(function() {
                that.element.show();
            }, that.options.timeout);
        },

        hide: function() {
            this.captureEvents = false;
            clearTimeout(this._loading);
            this.element.hide();
        },

        changeMessage: function(message) {
            this.options.loading = message;
            this.element.find(">h1").html(message);
        },

        transition: function() {
            this.captureEvents = true;
            this.container.css("pointer-events", "none");
        },

        transitionDone: function() {
            this.captureEvents = false;
            this.container.css("pointer-events", "");
        },

        _attachCapture: function() {
            var that = this;
            that.captureEvents = false;

            function capture(e) {
                if (that.captureEvents) {
                    e.preventDefault();
                }
            }

            for (var i = 0; i < CAPTURE_EVENTS.length; i ++) {
                that.container[0].addEventListener(CAPTURE_EVENTS[i], capture, true);
            }
        }
    });

    ui.plugin(Loader);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
