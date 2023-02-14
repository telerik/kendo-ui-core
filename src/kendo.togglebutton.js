import "./kendo.core.js";
import "./kendo.button.js";

    var __meta__ = {
        id: "togglebutton",
        name: "ToggleButton",
        category: "web",
        description: "The ToggleButton widget displays styled buttons with selected state.",
        depends: ["core", "button"]
    };

    (function($, undefined) {
        var kendo = window.kendo,
            Button = kendo.ui.Button,
            CLICK = "click",
            TOGGLE = "toggle",
            NS = ".kendoToggleButton",
            ARIA_PRESSED = "aria-pressed",
            SELECTED = "k-selected",
            TOGGLE_BUTTON = "k-toggle-button",
            DATA_GROUP = "data-group",
            ID = "id";

        var ToggleButton = Button.extend({
            init: function(element, options) {
                var that = this;

                Button.fn.init.call(that, element, options);

                element = that.wrapper = that.element;
                options = that.options;

                element.addClass(TOGGLE_BUTTON);

                that._selected = options.selected === true ? true : false;
                that.toggle(that._selected);

                if (options.group) {
                    element.attr(DATA_GROUP, options.group);
                }

                kendo.notify(that);
            },

            destroy: function() {
                var that = this;

                that.wrapper.off(NS);
                Button.fn.destroy.call(that);
            },

            events: [
                CLICK,
                TOGGLE
            ],

            options: {
                name: "ToggleButton",
                group: undefined,
                selected: false
            },

            toggle: function(toggle) {
                if (toggle === undefined) {
                    toggle = !this._selected;
                }

                this._selected = toggle;

                if (toggle === true) {
                    this.element.attr(ARIA_PRESSED, true);
                    this.element.addClass(SELECTED);
                } else if (toggle === false) {
                    this.element.attr(ARIA_PRESSED, false);
                    this.element.removeClass(SELECTED);
                }
            },

            _click: function(e) {
                if (this.options.enable) {
                    if (this.trigger(CLICK, {
                        event: e,
                        id: this.element.attr(ID),
                        target: this.element
                    })) {
                        e.preventDefault();
                    } else {
                        this.toggle();

                        this.trigger(TOGGLE, {
                            event: e,
                            checked: this._selected,
                            group: this.options.group,
                            id: this.element.attr(ID),
                            target: this.element
                        });
                    }
                }
            }
        });

        kendo.cssProperties.registerPrefix("ToggleButton", "k-button-");

        kendo.cssProperties.registerValues("ToggleButton", [{
            prop: "fillMode",
            values: kendo.cssProperties.fillModeValues.concat(["link"])
        }, {
            prop: "rounded",
            values: kendo.cssProperties.roundedValues.concat([['full', 'full']])
        }]);

        kendo.ui.plugin(ToggleButton);

    })(window.kendo.jQuery);