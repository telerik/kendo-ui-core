(function($, undefined) {
    /**
    * @name kendo.mobile.ui.Switch.Description
    *
    * @section The mobile Switch widget is used to display two exclusive choices.
    * <p>When initialized, it shows the currently selected value. User slides the control to reveal the second value.
    * The mobile Switch can be created from <code>input</code> element of type <code>checkbox</code>.</p>
    *
    * <h3>Getting Started</h3>
    *
    * <p> The Kendo Mobile Application will automatically initialize a mobile Switch for every element with <code>role</code> data attribute set to <code>swtich</code> present in the views/layouts markup.
    * Alternatively, it can be initialized using a jQuery selector.</p>
    * @exampleTitle Initialize mobile Switch based on role data attribute
    * @example
    * <input type="checkbox" data-role="switch" />
    *
    * @exampleTitle Initialize mobile Switch using a jQuery selector
    * @example
    * <input type="checkbox" id="switch" />
    * <script>
    * var switchWidget = $("#switch").kendoMobileSwitch();
    * </script>
    * @section <h3>Checking/Unchecking the Mobile Switch</h3>
    *
    * <p>The checked state of the mobile Switch depends on the <code>checked</code> property of the widget's constructor options
    * or the <code>checked</code> attribute of the widget's element.</p>
    *
    * @exampleTitle Initialize Kendo mobile Switch from checked <code>input</code>
    * @example
    * <input type="checkbox" id="switch" checked="checked" />
    * <script>
    * var switchWidget = $("#switch").kendoMobileSwitch();
    * </script>
    *
    * @exampleTitle Initialize checked mobile Switch using a jQuery selector
    * @example
    * <input type="checkbox" id="switch" />
    * <script>
    * var switchWidget = $("#switch").kendoMobileSwitch({ checked: true });
    * </script>
    *
    * @section <h3>Specifying the Text of the Labels</h3>
    *
    * @exampleTitle Customize Kendo mobile Switch on/off labels
    * @example
    * <input type="checkbox" id="switch" />
    * <script>
    * var switchWidget = $("#switch").kendoMobileSwitch({ onLabel: "YES", offLabel: "NO" });
    * </script>
    */
    var kendo = window.kendo,
        ui = kendo.mobile.ui,
        Widget = ui.Widget,
        support = kendo.support,
        CHANGE = "change",
        SWITCHON = "km-switch-on",
        SWITCHOFF = "km-switch-off",
        MARGINLEFT = "margin-left",
        ACTIVE_STATE = "km-state-active",
        TRANSFORMSTYLE = support.transitions.css + "transform",
        DOCUMENT = $(document),
        extend = $.extend,
        proxy = $.proxy;

    function limitValue(value, minLimit, maxLimit) {
        return Math.max(minLimit, Math.min(maxLimit, value));
    }

    var Switch = Widget.extend(/** @lends kendo.mobile.ui.Switch.prototype */{
        /**
        * @constructs
        * @extends kendo.mobile.ui.Widget
        * @param {DomElement} element DOM element.
        * @param {Object} options Configuration options.
        * @option {Boolean} [checked] <false> The checked state of the widget.
        * @option {String} [onLabel] <ON> The ON label.
        * @option {String} [offLabel] <OFF> The OFF label.
        */
        init: function(element, options) {
            var that = this, width, checked, handleWidth;

            Widget.fn.init.call(that, element, options);

            that._wrapper();
            that._swipe();
            that._background();
            that._handle();

            element = that.element.data(kendo.attr("role"), "switch");
            element[0].type = "checkbox";

            width = that.wrapper.width();
            handleWidth = that.handle.outerWidth(true);

            that.constrain = width - handleWidth;
            that.snapPoint = width / 2 - handleWidth / 2;
            that._animateBackground = true;

            checked = that.options.checked;
            if (checked === null) {
                checked = element[0].checked;
            }

            that.check(checked);
            kendo.notify(that, kendo.mobile.ui);
        },

        events: [
            /**
            * Fires when the state of the widget changes
            * @name kendo.mobile.ui.Switch#change
            * @event
            * @param {Event} e
            * @param {Object} e.checked The checked state of the widget.
            *
            * @exampleTitle Handle change event
            * @example
            * <input type="checkbox" id="switch" data-role="switch" />
            *
            * <script>
            *  $("#switch").data("kendoMobileSwitch").bind("change", function(e) {
            *      //handle change event
            *  }
            * </script>
            */
            CHANGE
        ],

        options: {
            name: "Switch",
            onLabel: "ON",
            offLabel: "OFF",
            checked: null
        },

        /**
        * Gets/Sets the checked state of the widget.
        * @param {Boolean} check Whether to turn the widget on or off.
        * @returns {Boolean} The checked state of the widget.
        * @example
        * <input data-role="switch" id="foo" />;
        *
        * <script>
        *   // get a referene to the switch
        *   var switch = $("#foo").data("kendoMobileSwitch");
        *
        *   // get the checked state of the switch.
        *   var checked = switch.check();
        *
        *   // set the checked state of the switch.
        *   switch.check(true);
        * </script>
        */
        check: function(check) {
            var that = this,
                element = that.element[0];

            if (check === undefined) {
                return element.checked;
            }

            that._position(check ? that.constrain : 0);
            element.checked = check;
            that.wrapper
                .toggleClass(SWITCHON, check)
                .toggleClass(SWITCHOFF, !check);
        },

        /**
        * Toggle the checked state of the widget.
        * @example
        * <input data-role="switch" id="foo" />;
        *
        * <script>
        *   // get a referene to the switch
        *   var switch = $("#foo").data("kendoMobileSwitch");
        *
        *   // toggle the checked state of the switch.
        *   switch.toggle();
        * </script>
        */
        toggle: function() {
            var that = this;

            that.check(!that.element[0].checked);
        },

        _move: function(e) {
            var that = this;
            e.preventDefault();
            that._position(limitValue(that.position + e.x.delta, 0, that.constrain));
        },

        _position: function(position) {
            var that = this;

            that.position = position;
            that.handle.css(TRANSFORMSTYLE, "translatex(" + position + "px)");

            if (that._animateBackground) {
                that.background.css(MARGINLEFT, that.origin + position);
            }
        },

        _start: function(e) {
            this.swipe.capture();
            this.handle.addClass(ACTIVE_STATE);
        },

        _stop: function(e) {
            var that = this;

            that.handle.removeClass(ACTIVE_STATE);
            that._toggle(that.position > that.snapPoint);
        },

        _toggle: function (checked) {
            var that = this,
                handle = that.handle,
                element = that.element[0],
                value = element.checked,
                duration = 200,
                distance;

            that.wrapper
                .toggleClass(SWITCHON, checked)
                .toggleClass(SWITCHOFF, !checked);

            that.position = distance = checked * that.constrain;

            if (that._animateBackground) {
                that.background
                    .kendoStop(true, true)
                    .kendoAnimate({ effects: "slideMargin", offset: distance, reverse: !checked, axis: "left", duration: duration, ease: "linear" });
            }

            handle
                .kendoStop(true, true)
                .kendoAnimate({
                    effects: "slideTo",
                    duration: duration,
                    offset: distance + "px,0",
                    complete: function () {
                        if (value !== checked) {
                            element.checked = checked;
                            that.trigger(CHANGE, { checked: checked });
                        }
                    }
                });
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
            var that = this,
                options = that.options;

            that.handle = $("<span class='km-switch-container'><span class='km-switch-handle' /></span>")
                            .appendTo(that.wrapper)
                            .children(".km-switch-handle");

            that.handle.append('<span class="km-switch-label-on">' + options.onLabel + '</span><span class="km-switch-label-off">' + options.offLabel + '</span>');
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper = element.parent("span.km-swith");

            if (!wrapper[0]) {
                wrapper = element.wrap('<span class="km-switch"/>').parent();
            }

            that.wrapper = wrapper;
        },

        _swipe: function() {
            var that = this;

            that.swipe = new kendo.mobile.Swipe(that.wrapper, {
                tap: function() {
                    that._toggle(!that.element[0].checked);
                },
                start: proxy(that._start, that),
                move: proxy(that._move, that),
                end: proxy(that._stop, that)
            });
        }
    });

    ui.plugin(Switch);
})(jQuery);
