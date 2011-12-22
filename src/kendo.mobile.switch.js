(function($, undefined) {
    /**
    * @name kendo.ui.MobileSwitch.Description
    *
    * @section MobileSwitch widget is used inside a mobile view to display two exclusive choices.
    * The MobileSwitch shows the currently selected value. User slides the control to reveal the second value.
    * The MobileSwitch can be created from <code>input</code> of type <code>checkbox</code>.
    *
    * <h3>Getting Started</h3>
    * The Kendo MobileApplication will automatically initialize the MobileSwitch for every element with <code>role</code> data attribute set to <code>swtich</code> present in the views/layouts markup.
    * Alternatively, it can be initialized using a jQuery selector.
    * @exampleTitle Initialize Kendo MobileSwitch based on role data attribute
    * @example
    * <input type="checkbox" data-role="switch" />
    *
    * @exampleTitle Initialize Kendo MobileSwitch using a jQuery selector
    * @example
    * <input type="checkbox" id="switch" />
    * <script>
    * var switchWidget = $("#switch").kendoMobileSwitch();
    * </script>
    * @section <h3>Checking/Unchecking the MobileSwitch</h3>
    *
    * Checked state of the MobileSwitch depends on <code>checked</code> property of the constructor options or on the <code>checked</code> attribute of the <code>input</code>.
    *
    * @exampleTitle Initialize Kendo MobileSwitch from checked <code>input</code>
    * @example
    * <input type="checkbox" id="switch" checked="checked" />
    * <script>
    * var switchWidget = $("#switch").kendoMobileSwitch();
    * </script>
    *
    * @exampleTitle Initialize checked MobileSwitch using a jQuery selector
    * @example
    * <input type="checkbox" id="switch" />
    * <script>
    * var switchWidget = $("#switch").kendoMobileSwitch({ checked: true });
    * </script>
    *
    * @section <h3>Specifying the Text of the Labels</h3>
    *
    * @exampleTitle Customize Kendo MobileSwitch on/off labels
    * @example
    * <input type="checkbox" id="switch" />
    * <script>
    * var switchWidget = $("#switch").kendoMobileSwitch({ onLabel: "YES", offLabel: "NO" });
    * </script>
    */
    var kendo = window.kendo,
        ui = kendo.ui,
        MobileWidget = ui.MobileWidget,
        support = kendo.support,
        CHANGE = "change",
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

    var MobileSwitch = MobileWidget.extend(/** @lends kendo.ui.MobileSwitch.prototype */{
        /**
        * @constructs
        * @extends kendo.ui.MobileWidget
        * @param {DomElement} element DOM element.
        * @param {Object} options Configuration options.
        * @option {Boolean} [checked] <false> The checked state of the widget.
        * @option {String} [onLabel] <ON> The on label.
        * @option {String} [offLabel] <OFF> The off label.
        */
        init: function(element, options) {
            var that = this, width, checked, handleWidth;

            MobileWidget.fn.init.call(that, element, options);

            that._wrapper();
            that._background();
            that._handle();

            options = that.options;
            element = that.element.data(kendo.attr("role"), "switch");
            element[0].type = "checkbox";

            handleWidth = that.handle.outerWidth(true);
            that.halfWidth = handleWidth / 2;
            that.width = width = that.wrapper.outerWidth();
            that.snapPart = width - handleWidth;
            that.constrain = width - that.halfWidth;

            that._moveProxy = proxy(that._move, that);
            that._stopProxy = proxy(that._stop, that);

            that.bind([
                /**
                * Fires when the state of the widget changes
                * @name kendo.ui.MobileSwitch#change
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
            ], options);

            checked = options.checked;
            if (checked === undefined) {
                checked = element[0].checked;
            }

            that.toggle(checked);
        },

        options: {
            name: "MobileSwitch",
            selector: kendo.roleSelector("switch"),
            onLabel: "ON",
            offLabel: "OFF"
        },

        /**
        * Toggle the checked state of the widget.
        * @param {Boolean} check The checked state
        * @example
        * &lt;input data-role="switch" id="foo" /&gt;
        *
        * &lt;script&gt;
        *   $("#foo").data("kendoMobileSwitch").toggle(true);
        * &lt;/script&gt;
        */
        toggle: function(check) {
            var that = this,
                element = that.element[0];

            if (check === undefined) {
                check = !element.checked;
            }

            element.checked = check;

            that._position(check * that.snapPart, check ? 0 : that.origin);

            that.handle
                .toggleClass(SWITCHON, check)
                .toggleClass(SWITCHOFF, !check);
        },

        _active: function (e) {
            this.handle.toggleClass("km-state-active", e.type == MOUSEDOWN);
        },

        _location: function(e) {
            return kendo.touchLocation(e).x - this.wrapper.offset().left;
        },

        _move: function(e) {
            var that = this,
                location = limitValue(that._location(e), that.halfWidth, that.constrain),
                position = location - that.halfWidth;

            that._position(position, that.origin + position);
        },

        _position: function(position, margin) {
            var that = this;
            that.handle.css(TRANSFORMSTYLE, "translatex(" + position + "px)");
            that.background.css(MARGINLEFT, margin);
        },

        _start: function(e) {
            var that = this;

            that._initial = that._location(e);

            DOCUMENT
                .bind(MOUSEMOVE, that._moveProxy)
                .bind(MOUSEUP + " mouseleave", that._stopProxy); // Stop if leaving the simulator/screen

            prevent(e);
        },

        _stop: function(e) {
            var that = this,
                location = that._location(e),
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
                    .kendoAnimate({ effects: "slideMargin", offset: distance, reverse: !checked, axis: "left", duration: 200 });

                handle
                    .kendoStop(true, true)
                    .kendoAnimate({
                        effects: "slideTo",
                        duration: 200,
                        offset: distance + "px,0",
                        complete: function () {
                            that.element[0].checked = checked;
                            that.trigger(CHANGE, { checked: checked });
                        }
                    });
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
            var that = this,
                options = that.options;

            that.handle = $("<span class='km-switch-container'><span class='km-switch-handle' /></span>")
                            .appendTo(that.wrapper)
                            .children(".km-switch-handle")
                            .bind(MOUSEDOWN + " " + MOUSEUP, proxy(that._active, that));

            that.handle.append('<span class="km-switch-label-on">' + options.onLabel + '</span><span class="km-switch-label-off">' + options.offLabel + '</span>');
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper = element.parent("label");

            if (!wrapper[0]) {
                wrapper = element.wrap("<label />").parent();
            }

            that.wrapper = wrapper.addClass("km-switch")
                                  .bind(MOUSEDOWN, proxy(that._start, that));
        }
    });

    ui.plugin(MobileSwitch);

})(jQuery);
