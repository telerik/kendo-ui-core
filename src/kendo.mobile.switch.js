(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        support = kendo.support,
        touch = support.touch,
        os = support.mobileOS,
        TOGGLE = "toggle",
        CHANGE = "change",
        SLIDE = "slide",
        MOUSEDOWN = support.mousedown,
        MOUSEUP = support.mouseup,
        MOUSEMOVE = support.mousemove,
        handleSelector = ".km-switch-handle",
        bindSelectors = ".km-checkbox",
        TRANSFORMSTYLE = support.transitions.css + "transform",
        extend = $.extend,
        proxy = $.proxy,
        slideAnimation = {
            manimator: ".km-slider-background",
            animator: ".km-slider-handle"
        },
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
        var initial, width, halfWidth, constrain, location, lastValue,
            handle, animator, manimator, origin, snapPart,
            options = owner.options,
            max = options.max,
            axis = options.axis,
            axisProperty = axis == "x" ? "left" : "top";

        element.bind(MOUSEDOWN, start);

        function setPosition(e, location) {
            location = limitValue(location, halfWidth, constrain + halfWidth);

            var position = location - halfWidth;
            animator.css(TRANSFORMSTYLE, "translate" + axis + "(" + position + "px)"); // TODO: remove halfWidth
            manimator.css("margin-" + axisProperty, origin + position);

            return Math.round(position / snapPart);
        }

        function getAxisLocation(e, element) {
            return kendo.touchLocation(e)[axis] - element.offset()[axisProperty];
        }

        function start(e) {
            preventDefault(e);

            initial = getAxisLocation(e, element);
            width = element.outerWidth();
            handle = element.find(options.handle);
            halfWidth = handle.outerWidth() / 2;
            snapPart = (width - halfWidth*2) / (max - 1);
            constrain = width - handle.outerWidth(true);
            animator = element.find(extend({ animator: "animator" in switchAnimation ? switchAnimation.animator : options.handle }, options).animator);
            manimator = element.find(extend({ manimator: switchAnimation.manimator }, options).manimator);
            location = limitValue(initial, halfWidth, constrain + halfWidth);
            origin = manimator.data("origin");
            if (!origin && origin !== 0) {
                origin = parseInt(manimator.css("margin-left"), 10);
                manimator.data("origin", origin);
            }

            $(document)
                .bind(MOUSEMOVE, move)
                .bind(MOUSEUP + " mouseleave", stop); // Stop if leaving the simulator/screen
        }

        function move(e) {
            var value = setPosition(e, getAxisLocation(e, element));
            if (value != lastValue)
                owner.trigger(SLIDE, { value: value });
            lastValue = value;
        }

        function stop(e) {
            preventDefault(e);

            if (max == 2 && Math.abs(initial - getAxisLocation(e, element)) <= 2) {
                owner.trigger(CHANGE, { value: !owner.input[0].checked });
            } else {
                owner.trigger(CHANGE, { value: setPosition(e, getAxisLocation(e, element)) });
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

            that.bind([ CHANGE, SLIDE ], options);
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

            that.bind(CHANGE, proxy(that._snap, that));
        },

        options: {
            name: "MobileSwitch",
            enable: true,
            selector: kendo.roleSelector("switch"),
            manimator: ".km-switch-background",
            animator: handleSelector
        },

        _toggle: function() {
            var that = this;

            if (that.options.enable) {
                that._snap({ value: that.input[0].checked })
            }
        },

        _snap: function (e) {
            var that = this,
                handle = that.handle,
                checked = (e.value == 1), distance;

            handle
                .removeClass("km-switch-on")
                .removeClass("km-switch-off")
                .addClass("km-switch-" + (checked ? "on" : "off"));

            if (!handle.data("animating")) {
                distance = e.value * (that.element.outerWidth() - that.handle.outerWidth(true));

                that.mAnimator
                    .kendoStop(true, true)
                    .kendoAnimate({ effects: "slideMargin", offset: distance, reverse: !e.value, axis: "left", duration: 150 });

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
                input = $("<input type='checkbox' " + kendo.attr("role") +  "='switch' />").appendTo(that.element);
            }


            if (!handle.length) {
                handle = $("<span class='km-switch-container'><span class='km-switch-handle' /></span>")
                                    .appendTo(that.element)
                                    .children(handleSelector);
            }

            handle.parent().before("<span class='km-switch-wrapper'><span class='km-switch-background'></span></span>");

            that.animator = "animator" in switchAnimation ? that.element.find(switchAnimation.animator) : handle;
            that.mAnimator = that.element.find(switchAnimation.manimator);

            var checked = input[0].checked;
            handle.addClass("km-switch-" + (checked ? "on" : "off"));
            if (checked) {
                that.animator.css(TRANSFORMSTYLE, "translate(" + (that.element.outerWidth() - handle.outerWidth()) + "px,0)");
                that.mAnimator
                    .data("origin", parseInt(that.mAnimator.css("margin-left"), 10))
                    .css("margin-left", 0);
            }

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
                input = $("<input type='checkbox' " + kendo.attr("role") + "='checkbox' />").appendTo(that.element);

            that.input = input;
            that.handle = that.element;
        }

    });

    ui.plugin(MobileCheckBox);

    var MobileSlider = SlidingHelper.extend({
        init: function(element, options) {
            var that = this;

            SlidingHelper.fn.init.call(that, element, extend(options, slideAnimation, { handle: slideAnimation.animator }));

            that._wrap();
            that.bind([ CHANGE, SLIDE ], that.options);
        },

        options: {
            name: "MobileSlider",
            enable: true,
            max: 100
        },

        _wrap: function() {
            var that = this, handle, marginElement,
                element = that.element;

            if (that.element.is("span"))
                that.element.addClass("km-slider");

            if (!element.data("kendo-role"))
                element.data("kendo-role", "slider");
            else
                $("<span " + kendo.attr("role") + "='slider' class='km-slider'><span class='km-slider-handle'></span></span>").appendTo(that.element);

            handle = element.find(slideAnimation.animator);

            if (!handle.length) {
                handle = $("<span class='km-slider-container'><span class='km-slider-handle' /></span>")
                                    .appendTo(element)
                                    .children(slideAnimation.animator);
            }

            handle.parent().before("<span class='km-slider-wrapper'><span class='km-slider-background'></span></span>");

            marginElement = that.element.find(slideAnimation.manimator);
            marginElement.data("margin", parseInt(marginElement.css("margin-left"), 10));

            that.handle = handle;
        }

    });

    ui.plugin(MobileSlider);
})(jQuery);
