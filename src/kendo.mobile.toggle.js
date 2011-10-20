(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        mobile = kendo.mobile,
        support = kendo.support,
        touch = support.touch,
        os = support.mobileOS,
        TOGGLE = "toggle",
        MOUSEDOWN = touch ? "touchstart" : "mousedown",
        MOUSEUP = touch ? "touchend" : "mouseup",
        handleSelector = ".k-toggle-handle",
        extend = $.extend,
        proxy = $.proxy;

    var ToggleButton = ui.MobileWidget.extend({
        init: function(element, options) {
            var that = this;
            element = $(element);

            if (element.is("input[type=checkbox]")) {
                element = element.wrap("<label />").parent();
            }

            ui.MobileWidget.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            that._wrapper();

            that._enable();

            that.animation = {
                all: {
                    effects: "slideTo:left",
                    duration: 200,
                    offset: 60
                },
                android: {
                    effects: {},
                    duration: 0
                },
                meego: {
                    animator: ".k-toggle-tip",
                    effects: "slideTo:left",
                    duration: 200,
                    offset: 30
                }
            };

            element.delegate("input[type=checkbox]", "change", proxy(that._toggle, that));
            element.delegate(handleSelector, MOUSEDOWN, proxy(that._trigger, that));
            element.delegate(handleSelector, MOUSEUP, proxy(that._trigger, that));

            that.bind([
                TOGGLE
            ], options);
        },

        options: {
            enable: true
        },

        enable: function(enable) {
            this._enable(enable);
        },

        toggle: function(toggle) {
            var input = this.input,
                checked = input[0].checked;

            if (toggle != checked && !this.handle.data("animating")) {
                input[0].checked = typeof(toggle) === "boolean" ? toggle : !checked;
                input.trigger("change");
            }
        },

        refresh: function() {
        },

        _enable: function () {

        },

        _trigger: function (e) {
            this.handle.toggleClass("k-toggle-clicked", e.type == MOUSEDOWN);
        },

        _toggle: function(e) {
            var that = this,
                extra = os.name in that.animation ? that.animation[os.name] : that.animation.all,
                handle = that.handle,
                animator = "animator" in extra ? handle.children(extra["animator"]) : handle,
                back = that.input[0].checked;

            if (!handle.data("animating")) {
                handle
                    .removeClass("k-toggle-on")
                    .removeClass("k-toggle-off");

                animator
                    .kendoStop(true, true)
                    .kendoAnimate(extend({
                        reverse: back,
                        complete: function () {
                            handle.addClass("k-toggle-" + (back ? "on" : "off"));
                        }
                    }, that.animation, extra ));
            }
        },

        _wrapper: function() {
            var that = this;

            if (that.element.is("label"))
                that.element.addClass("k-toggle");

            that.input = that.element.children("input[type=checkbox]");
            if (that.input.length)
                that.input.data("kendo-role", "toggle");
            else
                that.input = $("<input type='checkbox' data-kendo-role='toggle' />").appendTo(that.element);

            that.handle = that.element.children(".k-toggle-handle");

            if (!that.handle.length) {
                that.handle = $("<span class='k-toggle-handle k-toggle-" + (that.input[0].checked ? "on" : "off") + "' />")
                                    .appendTo(that.element)
                                    .append("<span class='k-toggle-tip' />");
            }
        }

    });

    ui.plugin("ToggleButton", ToggleButton);
})(jQuery);
