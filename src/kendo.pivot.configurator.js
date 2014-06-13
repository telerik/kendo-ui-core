(function(f, define){
    define([ "./kendo.dom" ], f);
})(function(){

var __meta__ = {
    id: "pivotgrid.configurator",
    name: "PivotConfigurator",
    category: "web",
    description: "The PivotConfigurator widget allows the user to select data slices displayed in PivotGrid",
    depends: [ "pivotgrid", "dropdownlist", "treeview", "sortable" ]
};

/*jshint eqnull: true*/
(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget;

    var PivotConfigurator = Widget.extend({
        init: function(element, options) {

            Widget.fn.init.call(this, element, options);

            kendo.notify(this);
        },

        events: [],

        options: {
            name: "PivotConfigurator"
        },

        refresh: function() {
        }
    });

    ui.plugin(PivotConfigurator);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
