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
        SWITCHON = "km-switch-on",
        SWITCHOFF = "km-switch-off",
        MARGINLEFT = "margin-left",
        MOUSEDOWN = support.mousedown,
        MOUSEUP = support.mouseup,
        MOUSEMOVE = support.mousemove,
        TRANSFORMSTYLE = support.transitions.css + "transform",
        DOCUMENT = $(document),
        extend = $.extend,
        proxy = $.proxy;

    function prevent(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function limitValue(value, minLimit, maxLimit) {
        return Math.max( minLimit, Math.min( maxLimit, value));
    }

    var MobileSwitch = MobileWidget.extend({
        init: function(element, options) {
            var that = this, handleWidth;

            MobileWidget.fn.init.call(that, element, options);

            that._wrapper();
            that._background();
            that._handle();

            element = that.element.data(kendo.attr("role"), "switch");
            options = that.options;

            //constants (refactor)
            handleWidth = that.handle.outerWidth(true);
            that.halfWidth = that.handle.outerWidth() / 2;
            that.width = that.wrapper.outerWidth();
            that.snapPart = that.width - handleWidth;
            that.constrain = that.width - handleWidth + that.halfWidth;

            //proxies
            that._moveProxy = proxy(that._move, that);
            that._stopProxy = proxy(that._stop, that);

            that.bind([
                CHANGE
            ], options);

            that.toggle(element[0].checked);
        },

        options: {
            name: "MobileSwitch",
            selector: kendo.roleSelector("switch")
        },

        //toggle() without params does not work
        toggle: function(toggle) {
            var that = this,
                element = that.element,
                checked = !element[0].checked;

            if (toggle !== undefined) {
                checked = toggle;
            }

            that.background.css(MARGINLEFT, checked ? 0 : that.origin);
            that.handle
                .toggleClass(SWITCHON, checked)
                .toggleClass(SWITCHOFF, !checked)
                .css(TRANSFORMSTYLE, "translate(" + checked * that.snapPart + "px,0)");
        },

        _getAxisLocation: function(e) {
            return kendo.touchLocation(e).x - this.wrapper.offset().left;
        },

        _move: function(e) {
            var that = this,
                location = limitValue(that._getAxisLocation(e), that.halfWidth, that.constrain),
                position = location - that.halfWidth;

            //create _position(handlePos, background-pos);

            that.handle.css(TRANSFORMSTYLE, "translatex(" + position + "px)");
            that.background.css(MARGINLEFT, that.origin + position);
        },

        _start: function(e) {
            var that = this;

            that._initial = that._getAxisLocation(e);

            DOCUMENT
                .bind(MOUSEMOVE, that._moveProxy)
                .bind(MOUSEUP + " mouseleave", that._stopProxy); // Stop if leaving the simulator/screen

            prevent(e);
        },

        _stop: function(e) {
            var that = this,
                location = that._getAxisLocation(e),
                check;

            if (Math.abs(that._initial - location) <= 2) {
                check = !that.element[0].checked;
            } else {
                check = location > (that.width / 2);
            }

            that._toggle(check);

            DOCUMENT
                .unbind(MOUSEMOVE, that._moveProxy)
                .unbind(MOUSEUP + " mouseleave", that._stopProxy);

            prevent(e);
        },

        _trigger: function (e) {
            this.handle.toggleClass("km-state-active", e.type == MOUSEDOWN);
        },

        _toggle: function (checked) {
            var that = this,
                handle = that.handle,
                distance;

            handle
                .toggleClass(SWITCHON, checked)
                .toggleClass(SWITCHOFF, !checked);

            if (!handle.data("animating")) {
                distance = checked * that.snapPart;

                that.background
                    .kendoStop(true, true)
                    .kendoAnimate({ effects: "slideMargin", offset: distance, reverse: !checked, axis: "left", duration: 150 });

                handle
                    .kendoStop(true, true)
                    .kendoAnimate(extend({
                        effects: "slideTo",
                        duration: 150,
                        offset: distance + "px,0",
                        complete: function () {
                            that.element.checked = checked;
                            that.trigger(CHANGE, { checked: checked });
                        }
                    }));
            }
        },

        _background: function() {
            var that = this,
                background;

            background = $("<span class='km-switch-wrapper'><span class='km-switch-background'></span></span>")
                            .appendTo(that.wrapper)
                            .children(".km-switch-background");

            that.origin = parseInt(background.css(MARGINLEFT), 10);
            background.data("origin", that.origin);
            that.background = background;
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
        }
    });

    ui.plugin(MobileSwitch);

})(jQuery);
