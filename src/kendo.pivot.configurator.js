(function(f, define){
    define([ "./kendo.dom" ], f);
})(function(){

var __meta__ = {
    id: "pivotgrid.configurator",
    name: "PivotConfigurator",
    category: "web",
    description: "The PivotConfigurator widget allows the user to select data slices displayed in PivotGrid",
    depends: [ "pivotgrid", "dropdownlist", "treeview" ]
};

/*jshint eqnull: true*/
(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        Widget = ui.Widget;

    var PivotConfigurator = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this.dataSource = kendo.data.PivotDataSource.create(options.dataSource);

            this._layout();

            kendo.notify(this);
        },

        events: [],

        options: {
            name: "PivotConfigurator"
        },

        _treeViewDataSource: function() {
            var that = this;

            return kendo.data.HierarchicalDataSource.create({
                schema: {
                    model: {
                        id: "uniqueName",
                        hasChildren: function(item) {
                            return !("hierarchyUniqueName" in item) && !("aggregator" in item);
                        }
                    }
                },
                transport: {
                    read: function(options) {
                        var promise;
                        if ($.isEmptyObject(options.data)) {
                            promise = that.dataSource.schemaDimensions();
                        } else {
                            //Hack to get the actual node as the HierarchicalDataSource does not support passing it
                            var node = that.treeView.dataSource.get(options.data.uniqueName);

                            if (node.type == 2) { //measure
                                promise = that.dataSource.schemaMeasures();
                            } else if (node.dimensionUniqueName) { // hierarchy
                                promise = that.dataSource.schemaLevels(options.data.uniqueName);
                            } else { // dimension
                                promise = that.dataSource.schemaHierarchies(options.data.uniqueName);
                            }
                        }
                        promise.done(options.success)
                            .fail(options.error);
                    }
                }
            });
        },

        _layout: function() {
            var element = this.element;

            this.treeView = $("<div/>").appendTo(element)
                .kendoTreeView({
                    dataTextField: "name",
                    autoBind: false,
                    dataSource: this._treeViewDataSource()
                 })
                .data("kendoTreeView");
        },

        refresh: function() {
        }
    });

    ui.plugin(PivotConfigurator);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
