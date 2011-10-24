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
        bindSelectors = ".k-checkbox",
        extend = $.extend,
        proxy = $.proxy;

    var Toggle = ui.MobileWidget.extend({
        init: function (element, options) {
            var that = this;
            element = $(element);

            ui.MobileWidget.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            that._toggleProxy = proxy(that._toggle, that);
            that._triggerProxy = proxy(that._trigger, that);

            that.bind([
                TOGGLE
            ], options);
        },

        enable: function(enable) {
            enable = typeof enable === "boolean" ? enable : true;

            var that = this;

            if (enable) {
                that.input.removeAttr("disabled");
                that.element.delegate("input[type=checkbox]", "change", that._toggleProxy)
                            .delegate(handleSelector, MOUSEDOWN + " " + MOUSEUP, that._triggerProxy);
                that.element.filter(bindSelectors).bind(MOUSEDOWN + " " + MOUSEUP, that._triggerProxy);
            } else {
                that.element.undelegate("input[type=checkbox]", "change", that._toggleProxy)
                            .undelegate(handleSelector, MOUSEDOWN + " " + MOUSEUP, that._triggerProxy);
                that.element.filter(bindSelectors).unbind(MOUSEDOWN + " " + MOUSEUP, that._triggerProxy);
                that.input.attr("disabled");
            }
        },

        disable: function() {
            this.enable(false);
        },

        toggle: function(toggle) {
            var input = this.input,
                checked = input[0].checked;

            if (toggle != checked && !this.handle.data("animating") && !input.attr("disabled")) {
                input[0].checked = typeof(toggle) === "boolean" ? toggle : !checked;
                input.trigger("change");
            }
        },

        _trigger: function (e) {
            this.handle.toggleClass("k-state-active", e.type == MOUSEDOWN);
        }

    });

    var MobileSwitch = Toggle.extend({
        init: function(element, options) {
            var that = this;
            element = $(element);

            if (element.is("input[type=checkbox]")) {
                element = element.wrap("<label />").parent();
            }

            Toggle.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            that._wrapper();
            that.enable(options.enable);

            that.animation = {
                all: {
                    effects: "slideTo:right",
                    duration: 200,
                    offset: 60
                },
                android: {
                    effects: {},
                    duration: 0
                },
                meego: {
                    animator: ".k-toggle-tip",
                    effects: "slideTo:right",
                    duration: 200,
                    offset: 30
                }
            };
        },

        options: {
            name: "MobileSwitch",
            enabled: true
        },

        refresh: function() {
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
                            that.trigger(TOGGLE, { checked: that.input[0].checked });
                        }
                    }, that.animation, extra ));
            }
        },

        _wrapper: function() {
            var that = this;

            if (that.element.is("label")) {
                that.element.addClass("k-toggle");
            }

            that.input = that.element.children("input[type=checkbox]");
            if (that.input.length) {
                that.input.data("kendo-role", "toggle");
            } else {
                that.input = $("<input type='checkbox' data-kendo-role='toggle' />").appendTo(that.element);
            }

            that.handle = that.element.children(".k-toggle-handle");

            if (!that.handle.length) {
                that.handle = $("<span class='k-toggle-handle k-toggle-" + (that.input[0].checked ? "on" : "off") + "' />")
                                    .appendTo(that.element)
                                    .append("<span class='k-toggle-tip' />");
            }
        }

    });

    ui.plugin(MobileSwitch);

    var MobileCheckBox = Toggle.extend({
        init: function(element, options) {
            var that = this;
            element = $(element);

            if (element.is("input[type=checkbox]")) {
                element = element.wrap("<label />").parent();
            }

            Toggle.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            that._wrapper();
            that.enable(options.enable);
        },

        options: {
            name: "MobileCheckBox",
            enabled: true
        },

        refresh: function() {
        },

        _toggle: function() {
            var that = this;

            that.handle.toggleClass("k-checkbox-checked", that.input[0].checked);
            that.trigger(TOGGLE, { checked: that.input[0].checked });
        },

        _wrapper: function() {
            var that = this;

            if (that.element.is("label"))
                that.element.addClass("k-checkbox");

            that.input = that.element.children("input[type=checkbox]");
            if (that.input.length)
                that.input.data("kendo-role", "checkbox");
            else
                that.input = $("<input type='checkbox' data-kendo-role='checkbox' />").appendTo(that.element);

            that.handle = that.element;
        }

    });

    ui.plugin(MobileCheckBox);
})(jQuery);
