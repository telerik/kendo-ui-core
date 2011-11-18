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
        handleSelector = ".km-switch-handle",
        bindSelectors = ".km-checkbox",
        TRANSFORMSTYLE = support.transitions.css + "transform",
        extend = $.extend,
        proxy = $.proxy,
        switchAnimation = {
            all: {
                manimator: ".km-switch-background",
                animator: handleSelector,
                effects: "slideTo",
                duration: 150
            },
            android: {
                effects: {},
                duration: 0
            }
        };
    switchAnimation = os.name in switchAnimation ? switchAnimation[os.name] : switchAnimation.all;

    function preventDefault(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function limitValue(value, minLimit, maxLimit) {
        return Math.max( minLimit, Math.min( maxLimit, value));
    }

    function Axis(element, owner) {
        var initial, width, halfWidth, constrain, location, handle, animator, manimator, margin,
            options = owner.options,
            axis = options.axis,
            axisProperty = axis == "x" ? "left" : "top";

        element.bind(MOUSEDOWN, start);

        function getAxisLocation(e, element) {
            return kendo.touchLocation(e)[axis] - element.offset()[axisProperty];
        }

        function start(e) {
            preventDefault(e);

            initial = getAxisLocation(e, element);
            width = element.outerWidth();
            handle = element.find(options.handle);
            halfWidth = handle.outerWidth() / 2;
            constrain = width - handle.outerWidth(true);
            animator = element.find(extend({ animator: "animator" in switchAnimation ? switchAnimation.animator : options.handle }, options).animator);
            manimator = element.find(extend({ manimator: switchAnimation.manimator }, options).manimator);
            location = limitValue(initial, halfWidth, constrain + halfWidth);
            margin = manimator.data("margin");

            $(document)
                .bind(MOUSEMOVE, move)
                .bind(MOUSEUP + " mouseleave", stop); // Stop if leaving the simulator/screen
        }

        function move(e) {
            location = limitValue(getAxisLocation(e, element), halfWidth, constrain + halfWidth);
            animator.css(TRANSFORMSTYLE, "translate" + axis + "(" + (location - halfWidth) + "px)"); // TODO: remove halfWidth
            manimator.css("margin-" + axisProperty, margin + location - halfWidth);
        }

        function stop(e) {
            var max = options.max,
                snapPart = width / (max - 1);

            preventDefault(e);

            if (Math.abs(initial - getAxisLocation(e, element)) > 2) {
                owner.trigger(SNAP, { snapTo: Math.round(location / snapPart) });
            } else if (max == 2) {
                owner.trigger(SNAP, { snapTo: !owner.input[0].checked });
            }

            $(document)
                .unbind(MOUSEMOVE, move)
                .unbind(MOUSEUP + " mouseleave", stop);
        }
    }

    var SlidingHelper = ui.MobileWidget.extend({
        init: function (element, options) {
            var that = this;

            ui.MobileWidget.fn.init.call(that, element, options);

            if (!that.options.handle) return;

            Axis(that.element, that);

            that.bind([ SNAP ], options);
        },

        options: {
            axis: "x",
            max: 2
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

            that.options.enable = enable;
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
            var that = this,
                input = that.input,
                checked = input[0].checked;

            if (toggle != checked && !that.handle.data("animating") && that.options.enable) {
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

            that._wrap();
            that.enable(that.options.enable);

            that.bind(SNAP, proxy(that._snap, that));
        },

        options: {
            name: "MobileSwitch",
            enable: true,
            manimator: ".km-switch-background",
            animator: handleSelector
        },

        _toggle: function() {
            var that = this;

            if (that.options.enable) {
                that._snap({ snapTo: that.input[0].checked })
            }
        },

        _snap: function (e) {
            var that = this,
                handle = that.handle,
                checked = (e.snapTo == 1), distance;

            handle
                .removeClass("km-switch-on")
                .removeClass("km-switch-off")
                .addClass("km-switch-" + (checked ? "on" : "off"));

            if (!handle.data("animating")) {
                distance = e.snapTo * (that.element.outerWidth() - that.handle.outerWidth(true));

                that.marginator
                    .kendoStop(true, true)
                    .kendoAnimate({ effects: "slideMargin", offset: distance, axis: "left", duration: 150 });
                that.animator
                    .kendoStop(true, true)
                    .kendoAnimate(extend({
                        complete: function () {
                            that.input[0].checked = checked;
                            that.trigger(TOGGLE, { checked: checked });
                        }
                    }, switchAnimation, {
                        offset: distance + "px,0"
                    }));
            }
        },

        _wrap: function() {
            var that = this,
                input = that.element.children("input[type=checkbox]"),
                handle = that.element.children(handleSelector);

            if (that.element.is("label")) {
                that.element.addClass("km-switch");
            }

            if (input.length) {
                input.data("kendo-role", "switch");
            } else {
                input = $("<input type='checkbox' data-kendo-role='switch' />").appendTo(that.element);
            }


            if (!handle.length) {
                handle = $("<span class='km-switch-container'><span class='km-switch-handle' /></span>")
                                    .appendTo(that.element)
                                    .children(handleSelector);
            }

            that.marginator = handle.parent().before("<span class='km-switch-wrapper'><span class='km-switch-background'></span></span>").find(switchAnimation.manimator);
            that.animator = "animator" in switchAnimation ? that.element.find(switchAnimation.animator) : handle;
            that.marginator.data("margin", parseInt(that.marginator.css("margin-left"), 10));

            that.input = input;
            that.handle = handle;
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

            that._wrap();
            that.enable(that.options.enable);
        },

        options: {
            name: "MobileCheckBox",
            enable: true
        },

        _toggle: function() {
            var that = this;

            if (that.options.enable) {
                that.handle.toggleClass("km-checkbox-checked", that.input[0].checked);
                that.trigger(TOGGLE, { checked: that.input[0].checked });
            }
        },

        _wrap: function() {
            var that = this,
                input = that.element.children("input[type=checkbox]");

            if (that.element.is("label"))
                that.element.addClass("km-checkbox");

            if (input.length)
                input.data("kendo-role", "checkbox");
            else
                input = $("<input type='checkbox' data-kendo-role='checkbox' />").appendTo(that.element);

            that.input = input;
            that.handle = that.element;
        }

    });

    ui.plugin(MobileCheckBox);

    var MobileSlider = SlidingHelper.extend({
        init: function(element, options) {
            var that = this;

            SlidingHelper.fn.init.call(that, element, extend(options, { handle: handleSelector }));

            that._wrap();
        },

        options: {
            name: "MobileSlider",
            enable: true,
            max: 100,
            manimator: ".km-slider-background",
            animator: ".km-slider-handle"
        },

        _wrap: function() {
            var that = this, handle,
                element = that.element;

            if (that.element.is("span"))
                that.element.addClass("km-slider");

            if (!element.data("kendo-role"))
                element.data("kendo-role", "slider");
            else
                $("<span data-kendo-role='slider' class='km-slider'><span class='km-slider-handle'></span></span>").appendTo(that.element);

            handle = element.find(".km-slider-handle");

            if (!handle.length) {
                handle = $("<span class='km-slider-container'><span class='km-slider-handle' /></span>")
                                    .appendTo(element)
                                    .children(".km-slider-handle");
            }

            var marginator = handle.parent().before("<span class='km-slider-wrapper'><span class='km-slider-background'></span></span>").find(that.options.manimator);
            marginator.data("margin", parseInt(marginator.css("margin-left"), 10));
            that.handle = handle;
        }

    });

    ui.plugin(MobileSlider);
})(jQuery);
