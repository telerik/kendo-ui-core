(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget,
        SPAN = "<span/>";

    var DateTimePicker = Widget.extend(/** @lends kendo.ui.DateTimePicker.prototype */{
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            that._wrapper();

            that._icons();

            that._views();

            that.element.addClass("k-input");
        },

        options: {
            name: "DateTimePicker",
            value: null,
            format: "",
            timeFormat: "",
            min: new Date(1900, 0, 1),
            max: new Date(2099, 11, 31),
            interval: 30,
            height: 200
        },

        events: {

        },

        close: function(view) {
            if (view !== "time") {
                view = "date";
            }

            this[view + "View"].close();
        },

        open: function(view) {
            if (view !== "time") {
                view = "date";
            }

            this[view + "View"].open();
        },

        toggle: function(view) {
            if (view !== "time") {
                view = "date";
            }

            this[view + "View"].toggle();
        },

        _views: function() {
            var that = this,
                close = function(e) {
                    if (that.trigger("close")) {
                        e.preventDefault();
                    }
                },
                open = function(e) {
                    if (that.trigger("open")) {
                        e.preventDefault();
                    }
                };

            that.dateView = new kendo.DateView($.extend(that.options, {
                anchor: that.wrapper,
                change: function() {
                    // calendar is the current scope
                    //that._change(this.value());
                    //that.close();
                },
                close: close,
                open: open
            }));

            that.timeView = new kendo.TimeView($.extend(that.options, {
                anchor: that.wrapper,
                format: that.options.timeFormat,
                change: function(value, trigger) { },
                close: close,
                open: open
            }));
        },

        _icons: function() {
            var that = this,
                element = that.element,
                icons;

            icons = element.next("span.k-select");

            if (!icons[0]) {
                icons = $('<span unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-icon-calendar">select</span><span unselectable="on" class="k-icon k-icon-clock">select</span></span>').insertAfter(element);
                icons = icons.children();
            }

            that._dateIcon = icons.eq(0).click(function() {
                that.toggle("date");
            });
            that._timeIcon = icons.eq(1).click(function() {
                that.toggle("time");
            });
        },

        _wrapper: function() {
            var that = this,
            element = that.element,
            wrapper;

            wrapper = element.parents(".k-datetimepicker");

            if (!wrapper[0]) {
                wrapper = element.wrap(SPAN).parent().addClass("k-picker-wrap k-state-default");
                wrapper = wrapper.wrap(SPAN).parent();
            }

            wrapper[0].style.cssText = element[0].style.cssText;
            element.css({
                width: "100%",
                height: element[0].style.height
            });

            that.wrapper = wrapper.addClass("k-widget k-datetimepicker k-header");
            that._inputWrapper = $(wrapper[0].firstChild);
        }
    });

    ui.plugin(DateTimePicker);

})(jQuery);
