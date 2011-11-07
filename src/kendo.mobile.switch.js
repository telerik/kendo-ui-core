(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        mobile = kendo.mobile,
        support = kendo.support,
        touch = support.touch,
        os = support.mobileOS,
        TOGGLE = "toggle",
        SNAP = "snap",
        MOUSEDOWN = touch ? "touchstart" : "mousedown",
        MOUSEMOVE = touch ? "touchmove" : "mousemove",
        MOUSEUP = touch ? "touchend" : "mouseup",
        handleSelector = ".km-toggle-handle",
        bindSelectors = ".km-checkbox",
        TRANSFORMSTYLE = support.transitions.prefix + "Transform",
        extend = $.extend,
        proxy = $.proxy,
        switchAnimation = {
            all: {
                effects: "slideTo",
                duration: 200
            },
            android: {
                effects: {},
                duration: 0
            },
            meego: {
                animator: ".km-toggle-tip",
                effects: "slideTo",
                duration: 200
            }
        };
    switchAnimation = os.name in switchAnimation ? switchAnimation[os.name] : switchAnimation.all;

    function limitValue(value, minLimit, maxLimit) {
        return Math.max( minLimit, Math.min( maxLimit, value));
    }

    function getAxisLocation(e, element, axis) {
        return kendo.touchLocation(e)[axis] - element.offset()[axis == "x" ? "left" : "top"]
    }

    var SlidingHelper = ui.MobileWidget.extend({
        init: function (element, options) {
            var that = this;

            ui.MobileWidget.fn.init.call(that, element, options);

            if (!that.options.handle) return;

            that.axis = that.options.axis;

            that._startProxy = proxy(that._start, that);
            that._moveProxy = proxy(that._move, that);
            that._stopProxy = proxy(that._stop, that);

            element
                .bind(MOUSEDOWN, that._startProxy)
                .bind(MOUSEDOWN, proxy(that._prepare, that));
            that.bind([ SNAP ], options);
        },

        options: {
            axis: "x",
            snaps: 2
        },

        _start: function (e) {
            var that = this;

            that.width = that.element.width();
            that.animator = extend({ animator: that.animator }, that.options).animator;
            that.constrain = that.width - that.animator.outerWidth(true);
            that.location = limitValue(getAxisLocation(e, that.element, that.axis), 20, that.constrain + 20);

            $(document)
                .bind(MOUSEMOVE, that._moveProxy)
                .bind(MOUSEUP, that._stopProxy);
        },

        _move: function (e) {
            var that = this,
                axis = that.axis,
                location = getAxisLocation(e, that.element, that.axis);

            that.location = limitValue(location, 20, that.constrain + 20);
            that.animator[0].style[TRANSFORMSTYLE] = "translate" + axis + "(" + (that.location - 20) + "px)"; // TODO: remove the 20 :)
        },

        _stop: function () {
            var that = this,
                snapPart = that.width / (that.options.snaps - 1);

            that.trigger(SNAP, { snapTo: Math.round(that.location / snapPart) });

            $(document)
                .unbind(MOUSEMOVE, that._moveProxy)
                .unbind(MOUSEUP, that._stopProxy);
        }
    });

    var Toggle = SlidingHelper.extend({
        init: function (element, options) {
            var that = this;

            SlidingHelper.fn.init.call(that, element, options);

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
                that.element.removeClass("km-state-disabled");
                that.input.removeAttr("disabled");
                that.element.delegate("input[type=checkbox]", "change", that._toggleProxy)
                            .delegate(handleSelector, MOUSEDOWN + " " + MOUSEUP, that._triggerProxy);
                that.element.filter(bindSelectors).bind(MOUSEDOWN + " " + MOUSEUP, that._triggerProxy);
            } else {
                that.element.undelegate("input[type=checkbox]", "change", that._toggleProxy)
                            .undelegate(handleSelector, MOUSEDOWN + " " + MOUSEUP, that._triggerProxy);
                that.element.filter(bindSelectors).unbind(MOUSEDOWN + " " + MOUSEUP, that._triggerProxy);
                that.input.attr("disabled");
                that.element.addClass("km-state-disabled");
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
            this.handle.toggleClass("km-state-active", e.type == MOUSEDOWN);
        }

    });

    var MobileSwitch = Toggle.extend({
        init: function(element, options) {
            var that = this;
            element = $(element);

            if (element.is("input[type=checkbox]")) {
                element = element.wrap("<label />").parent();
            }

            Toggle.fn.init.call(that, element, extend(options, { handle: handleSelector }));

            element = that.element;
            options = that.options;

            that._wrap();
            that.enable(options.enable);

            that.bind(SNAP, proxy(that._snap, that));
        },

        options: {
            name: "MobileSwitch",
            enable: true
        },

        refresh: function() {
        },

        _toggle: function() {
            var that = this;

            that._prepare();
            that._snap({ snapTo: that.input[0].checked })
        },

        _prepare: function() {
            this.handle
                .removeClass("km-toggle-on")
                .removeClass("km-toggle-off");
        },

        _snap: function (e) {
            var that = this,
                handle = that.handle,
                checked = (e.snapTo == 1);

            if (!handle.data("animating")) {
                that.animator
                    .kendoStop(true, true)
                    .kendoAnimate(extend({
                        complete: function () {
                            handle.addClass("km-toggle-" + (checked ? "on" : "off"));
                            that.input[0].checked = checked;
                            that.trigger(TOGGLE, { checked: checked });
                        }
                    }, switchAnimation, {
                        offset: e.snapTo * (that.element.width() - that.animator.outerWidth(true)) + "px,0"
                    }));
            }
        },

        _wrap: function() {
            var that = this;

            if (that.element.is("label")) {
                that.element.addClass("km-toggle");
            }

            that.input = that.element.children("input[type=checkbox]");
            if (that.input.length) {
                that.input.data("kendo-role", "toggle");
            } else {
                that.input = $("<input type='checkbox' data-kendo-role='toggle' />").appendTo(that.element);
            }

            that.handle = that.element.children(".km-toggle-handle");

            if (!that.handle.length) {
                that.handle = $("<span class='km-toggle-handle km-toggle-" + (that.input[0].checked ? "on" : "off") + "' />")
                                    .appendTo(that.element)
                                    .append("<span class='km-toggle-tip' />");
            }
            that.animator = "animator" in switchAnimation ? that.handle.find(switchAnimation.animator) : that.handle;
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

            that._wrap();
            that.enable(options.enable);
        },

        options: {
            name: "MobileCheckBox",
            enable: true
        },

        refresh: function() {
        },

        _toggle: function() {
            var that = this;

            that.handle.toggleClass("km-checkbox-checked", that.input[0].checked);
            that.trigger(TOGGLE, { checked: that.input[0].checked });
        },

        _wrap: function() {
            var that = this;

            if (that.element.is("label"))
                that.element.addClass("km-checkbox");

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
