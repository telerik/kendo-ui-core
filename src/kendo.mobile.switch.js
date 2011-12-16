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
        TRANSFORMSTYLE = support.transitions.css + "transform",
        extend = $.extend,
        proxy = $.proxy;

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

            MobileWidget.fn.init.call(that, element, options);

            that._wrapper();
            that._background();
            that._handle();

            that._check(); //rename

            element = that.element.data(kendo.attr("role"), "switch");
            options = that.options;

            //constants
            that.width = that.wrapper.outerWidth();
            that.halfWidth = that.handle.outerWidth() / 2;
            that.constrain = that.width - that.handle.outerWidth(true) + that.halfWidth;

            //proxies
            that._moveProxy = proxy(that._move, that);
            that._stopProxy = proxy(that._stop, that);

            that.bind([
                CHANGE
            ], options);
        },

        options: {
            name: "MobileSwitch",
            selector: kendo.roleSelector("switch")
        },

        //refactor
        toggle: function(toggle) {
            var that = this,
                input = that.element,
                checked = input[0].checked;

            if (toggle != checked && !that.handle.data("animating")) {
                input[0].checked = typeof(toggle) === "boolean" ? toggle : !checked;
                input.trigger("change");
            }
        },

        _getAxisLocation: function(e) {
            return kendo.touchLocation(e).x - this.wrapper.offset().left;
        },

        _move: function(e) {
            var that = this,
                location = limitValue(that._getAxisLocation(e), that.halfWidth, that.constrain),
                position = location - that.halfWidth;

            that.handle.css(TRANSFORMSTYLE, "translatex(" + position + "px)");
            that.background.css("margin-left", that.origin + position);
        },

        _start: function(e) {
            preventDefault(e);

            var that = this;

            that._initial = that._getAxisLocation(e);

            that.origin = that.background.data("origin");

            if (!that.origin && that.origin !== 0) { //check for undefined
               that.origin = parseInt(that.background.css("margin-left"), 10);
               that.background.data("origin", that.origin);
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

            //consider better way!
            if (Math.abs(that._initial - location) <= 2) {
                value = !that.element[0].checked;
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

        //refactor and rename ?
        _snap: function (value) { //snap expects true or false (checked and etc);
            var that = this,
                handle = that.handle,
                checked = (value == 1), distance;

            handle
                .removeClass("km-switch-on") //combine those ? or toggle
                .removeClass("km-switch-off")
                .addClass("km-switch-" + (checked ? "on" : "off"));

            if (!handle.data("animating")) {
                distance = value * (that.wrapper.outerWidth() - that.handle.outerWidth(true)); //this maybe is the snap part... cache it!

                that.background
                    .kendoStop(true, true)
                    .kendoAnimate({ effects: "slideMargin", offset: distance, reverse: !value, axis: "left", duration: 150 });

                that.handle
                    .kendoStop(true, true)
                    .kendoAnimate(extend({
                        effects: "slideTo",
                        duration: 150,
                        offset: distance + "px,0",
                        complete: function () {
                            that.element.checked = checked;
                            that.trigger(TOGGLE, { checked: checked }); //should remove it ??!??!
                        }
                    }));
            }
        },

        _background: function() {
            var that = this;

            that.background = $("<span class='km-switch-wrapper'><span class='km-switch-background'></span></span>")
                                .appendTo(that.wrapper)
                                .children(".km-switch-background");
        },

        _handle: function() {
            var that = this;

            that.handle = $("<span class='km-switch-container'><span class='km-switch-handle' /></span>")
                            .appendTo(that.wrapper)
                            .children(".km-switch-handle")
                            .bind(MOUSEDOWN + " " + MOUSEUP, proxy(that._trigger, that));
        },

        _wrapper: function() {
            var that = this;

                that.wrapper = that.element.wrap("<label />")
                                    .parent()
                                    .addClass("km-switch")
                                    .bind(MOUSEDOWN, proxy(that._start, that));
        },

        _check: function() {
            var that = this,
                element = that.element,
                checked = element[0].checked,
                wrapper = that.wrapper,
                background = that.background,
                handle = that.handle.addClass("km-switch-" + (checked ? "on" : "off"));

            if (checked) {
                handle.css(TRANSFORMSTYLE, "translate(" + (wrapper.outerWidth() - handle.outerWidth()) + "px,0)");
                background
                    .data("origin", parseInt(background.css("margin-left"), 10))
                    .css("margin-left", 0);
            }
        }
    });

    ui.plugin(MobileSwitch);

})(jQuery);
