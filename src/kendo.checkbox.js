(function(f, define) {
    define([ "./kendo.toggleinputbase", "./kendo.html.input" ], f);
})(function() {

var __meta__ = { // jshint ignore:line
    id: "checkbox",
    name: "CheckBox",
    category: "web",
    description: "The CheckBox widget is used to display boolean value input.",
    depends: [ "toggleinputbase", "html.input" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        ToggleInputBase = ui.ToggleInputBase;

    var CheckBox = ToggleInputBase.extend({
        options: {
            name: "CheckBox",
            checked: null,
            enabled: true,
            encoded: true,
            label: null,
            rounded: "medium",
            size: "medium"
        },

        RENDER_INPUT: kendo.html.renderCheckBox,
        NS: ".kendoCheckBox",

        // alias for check, NG support
        value: function(value) {
            if (typeof value === "string") {
                value = (value === "true");
            }

            return this.check.apply(this, [value]);
        }
    });

    kendo.cssProperties.registerPrefix("CheckBox", "k-checkbox-");

    kendo.cssProperties.registerValues("CheckBox", [{
        prop: "rounded",
        values: kendo.cssProperties.roundedValues.concat([['full', 'full']])
    }]);

    ui.plugin(CheckBox);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3) { (a3 || a2)(); });
