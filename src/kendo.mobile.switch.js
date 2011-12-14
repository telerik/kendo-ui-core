(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        MobileWidget = ui.MobileWidget,
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
        switchAnimation = {
            manimator: ".km-switch-background",
            animator: handleSelector,
            effects: "slideTo",
            duration: 150
        };

    function preventDefault(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function limitValue(value, minLimit, maxLimit) {
        return Math.max( minLimit, Math.min( maxLimit, value));
    }

    var MobileSwitch = MobileWidget.extend({
        init: function(element, options) {
            var that = this;
            element = $(element);

            if (element.is("input[type=checkbox]")) {
                element = element.wrap("<label />").parent();
            }

            options = extend(options, {handle: handleSelector});

            MobileWidget.fn.init.call(that, element, options);

            element = that.element;
            options = that.options;

            that._wrap();

            //refactor
            that.width = element.outerWidth();
            that.handle = element.find(options.handle);
            that.halfWidth = that.handle.outerWidth() / 2;
            that.snapPart = (that.width - that.halfWidth * 2);
            that.constrain = that.width - that.handle.outerWidth(true) + that.halfWidth;
            that.animator = element.find(switchAnimation.animator);
            that.manimator = element.find(switchAnimation.manimator);
            that._moveProxy = $.proxy(that._move, that);
            that._stopProxy = $.proxy(that._stop, that);
            that._toggleProxy = proxy(that._toggle, that);
            that._triggerProxy = proxy(that._trigger, that);

            element.bind(MOUSEDOWN, $.proxy(that._start, that));

            that.bind([
                SLIDE, //these events are not triggered
                TOGGLE
            ], options);

            that.enable(options.enable);
        },

        options: {
            name: "MobileSwitch",
            enable: true,
            selector: kendo.roleSelector("switch"),
            manimator: ".km-switch-background",
            animator: handleSelector
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

        toggle: function(toggle) {
            var that = this,
                input = that.input,
                checked = input[0].checked;

            if (toggle != checked && !that.handle.data("animating") && that.options.enable) {
                input[0].checked = typeof(toggle) === "boolean" ? toggle : !checked;
                input.trigger("change");
            }
        },

        _getAxisLocation: function(e) {
            return kendo.touchLocation(e).x - this.element.offset().left;
        },

        _move: function(e) {
            var that = this,
                location = limitValue(that._getAxisLocation(e), that.halfWidth, that.constrain),
                position = location - that.halfWidth;

            that.animator.css(TRANSFORMSTYLE, "translatex(" + position + "px)"); // TODO: remove halfWidth
            that.manimator.css("margin-left", that.origin + position);
        },

        _start: function(e) {
            preventDefault(e);

            var that = this;

            that._initial = that._getAxisLocation(e);

            that.origin = that.manimator.data("origin");

            if (!that.origin && that.origin !== 0) { //check for undefined
               that.origin = parseInt(that.manimator.css("margin-left"), 10);
               that.manimator.data("origin", that.origin);
            }

            $(document) //cache it
                .bind(MOUSEMOVE, that._moveProxy)
                .bind(MOUSEUP + " mouseleave", that._stopProxy); // Stop if leaving the simulator/screen
        },

        _stop: function(e) {
            preventDefault(e);

            var that = this,
                location = that._getAxisLocation(e),
                value;

            if (Math.abs(that._initial - location) <= 2) {
                value = !that.input[0].checked;
            } else {
                value = location > (that.width / 2);
            }

            that._snap(value);

            $(document)
                .unbind(MOUSEMOVE, that._moveProxy)
                .unbind(MOUSEUP + " mouseleave", that._stopProxy);
        },

        _trigger: function (e) {
            this.handle.toggleClass("km-state-active", e.type == MOUSEDOWN);
        },

        _toggle: function() {
            var that = this;

            if (that.options.enable) {
                that._snap(that.input[0].checked)
            }
        },

        _snap: function (value) { //snap expects true or false (checked and etc);
            var that = this,
                handle = that.handle,
                checked = (value == 1), distance;

            handle
                .removeClass("km-switch-on")
                .removeClass("km-switch-off")
                .addClass("km-switch-" + (checked ? "on" : "off"));

            if (!handle.data("animating")) {
                distance = value * (that.element.outerWidth() - that.handle.outerWidth(true));

                that.mAnimator
                    .kendoStop(true, true)
                    .kendoAnimate({ effects: "slideMargin", offset: distance, reverse: !value, axis: "left", duration: 150 });

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

            that.animator = that.element.find(switchAnimation.animator);
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

})(jQuery);
