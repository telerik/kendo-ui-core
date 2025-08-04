import "./kendo.core.js";
import "./kendo.button.js";

    export const __meta__ = {
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
            DATA_GROUP = "data-group",
            ID = "id";

        var ToggleButton = Button.extend({
            init: function(element, options) {
                var that = this;

                Button.fn.init.call(that, element, options);

                element = that.wrapper = that.element;
                options = that.options;


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
                selected: false,
                toggleIcon: '',
                applySelectedState: true,
                applyToggleIcon: false,
            },

            toggle: function(toggle) {
                let that = this;
                if (toggle === undefined) {
                    toggle = !this._selected;
                }

                this._selected = toggle;

                if (toggle === true) {
                    this.element.attr(ARIA_PRESSED, true);
                    if (this.options.applySelectedState) {
                        this.element.addClass(SELECTED);
                    }

                    if (this.options.applyToggleIcon && this.options.toggleIcon) {
                        that._updateIcon(that.options.toggleIcon);
                    }

                } else if (toggle === false) {
                    this.element.attr(ARIA_PRESSED, false);

                    if (this.options.applySelectedState) {
                        this.element.removeClass(SELECTED);
                    }

                    if (this.options.applyToggleIcon) {
                        that._updateIcon(that.options.icon);
                    }
                }
            },

            _updateIcon: function(icon) {
                let that = this;
                let iconElement = that.element.find(".k-icon, .k-svg-icon");

                if (iconElement.length) {
                    kendo.ui.icon(iconElement, { icon: icon });
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
export default kendo;