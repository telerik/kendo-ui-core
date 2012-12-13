kendo_module({
    id: "combobox",
    name: "ComboBox",
    category: "web",
    description: "The ComboBox widget allows the selection from pre-defined values or entering a new value.",
    depends: [ "list" ]
});

(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget;

    var MultiSelect = Widget.extend({

        init: function(element, options) {

        },

        options: {
            name: "MultiSelect"
        },

        destroy: function() {

        }
    });

    ui.plugin(MultiSelect);

})(window.kendo.jQuery);
