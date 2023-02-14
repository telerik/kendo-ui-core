import "./kendo.core.js";
import "./kendo.badge.js";
import "./kendo.html.button.js";

    var __meta__ = {
        id: "button",
        name: "Button",
        category: "web",
        description: "The Button widget displays styled buttons.",
        depends: ["core", "badge", "html.button"]
    };

    (function($, undefined) {
        var kendo = window.kendo,
            Widget = kendo.ui.Widget,
            html = kendo.html,
            ui = kendo.ui,
            keys = kendo.keys,
            CLICK = "click",
            MOUSEDOWN = kendo.support.mousedown,
            MOUSEUP = kendo.support.mouseup,
            MOUSEOUT = "mouseout",
            NS = ".kendoButton",
            DISABLED = "disabled",
            DISABLEDSTATE = "k-disabled",
            FOCUSEDSTATE = "k-focus",
            ACTIVESTATE = "k-active";

        var BUTTON_DEFAULTS = {
            icon: "",
            iconClass: "",
            spriteCssClass: "",
            imageUrl: "",
            badge: null
        };
        kendo.setDefaults("button", BUTTON_DEFAULTS);

        var Button = Widget.extend({
            init: function(element, options) {
                var that = this;

                Widget.fn.init.call(that, element, options);

                element = that.wrapper = that.element;
                options = that.options;

                html.renderButton(element, $.extend({}, options));

                element.attr("role", "button");

                options.enable = options.enable && options.enabled && !element.attr(DISABLED);
                that.enable(options.enable);

                if (options.enable) {
                    that._tabindex();
                }

                that._badge();

                element
                    .on(CLICK + NS, that._click.bind(that))
                    .on("focus" + NS, that._focus.bind(that))
                    .on("blur" + NS, that._blur.bind(that))
                    .on("keydown" + NS, that._keydown.bind(that))
                    .on("keyup" + NS, that._removeActive.bind(that))
                    .on(MOUSEDOWN + NS, that._addActive.bind(that))
                    .on(MOUSEUP + NS + " " + MOUSEOUT + NS, that._removeActive.bind(that));

                kendo.notify(that);
            },

            destroy: function() {
                var that = this;

                that.wrapper.off(NS);

                if (that.badge) {
                    that.badge.destroy();
                }

                Widget.fn.destroy.call(that);
            },

            events: [
                CLICK
            ],

            options: {
                name: "Button",
                enable: true,
                enabled: true,
                icon: "",
                iconClass: "",
                spriteCssClass: "",
                imageUrl: "",
                badge: null,
                size: "medium",
                shape: "rectangle",
                rounded: "medium",
                fillMode: "solid",
                themeColor: "base"
            },

            _isNativeButton: function() {
                return this.element.prop("tagName").toLowerCase() == "button";
            },

            _click: function(e) {
                if (this.options.enable) {
                    if (this.trigger(CLICK, {
                        event: e,
                        id: this.element.attr("id"),
                        target: this.element
                    })) {
                        e.preventDefault();
                    }
                }
            },

            _focus: function() {
                if (this.options.enable) {
                    this.element.addClass(FOCUSEDSTATE);
                }
            },

            _blur: function() {
                var that = this;
                that.element.removeClass(FOCUSEDSTATE);
                setTimeout(function() {
                    that.element.removeClass(ACTIVESTATE);
                });
            },

            _keydown: function(e) {
                var that = this;
                if (e.keyCode == keys.ENTER || e.keyCode == keys.SPACEBAR) {
                    that._addActive();

                    if (!that._isNativeButton()) {
                        if (e.keyCode == keys.SPACEBAR) {
                            e.preventDefault();
                        }
                        that._click(e);
                    }
                }
            },

            _removeActive: function() {
                this.element.removeClass(ACTIVESTATE);
            },

            _addActive: function() {
                if (this.options.enable) {
                    this.element.addClass(ACTIVESTATE);
                }
            },

            enable: function(enable) {
                var that = this,
                    element = that.element;

                if (enable === undefined) {
                    enable = true;
                }

                enable = !!enable;
                that.options.enable = enable;
                element.toggleClass(DISABLEDSTATE, !enable)
                    .attr("aria-disabled", !enable)
                    .attr(DISABLED, !enable);

                if (enable) {
                    that._tabindex();
                }

                // prevent 'Unspecified error' in IE when inside iframe
                try {
                    element.trigger("blur");
                } catch (err) {}
            },

            _badge: function(options) {
                var that = this;
                var badgeOptions = options || that.options.badge;
                var badgeEelement;

                if (badgeOptions === null || badgeOptions === undefined) {
                    return;
                }

                if (badgeOptions.constructor !== Object) {
                    badgeOptions = { text: badgeOptions };
                }

                if (badgeOptions.position === undefined || badgeOptions.position === "") {
                    badgeOptions.position = "edge";

                    if (badgeOptions.align === undefined || badgeOptions.align === "") {
                        badgeOptions.align = "top end";
                    }
                }

                badgeOptions._classNames = ["k-button-badge"];

                that.element.addClass("k-badge-container");

                badgeEelement = $('<span />').appendTo(that.element);
                that.badge = new ui.Badge(badgeEelement, badgeOptions);
            }
        });

        if (Button.fn.hasOwnProperty("defaults") === false) {
            Object.defineProperty(Button.fn, "defaults", {
                get: function() {
                    return kendo.defaults.button;
                }
            });
        }

        kendo.cssProperties.registerPrefix("Button", "k-button-");

        kendo.cssProperties.registerValues("Button", [{
            prop: "fillMode",
            values: kendo.cssProperties.fillModeValues.concat(["link"])
        }, {
            prop: "rounded",
            values: kendo.cssProperties.roundedValues.concat([['full', 'full']])
        }]);

        kendo.ui.plugin(Button);

    })(window.kendo.jQuery);

