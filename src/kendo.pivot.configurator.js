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


    function settingTargetFromNode(node) {
        var target = $(node).closest(".k-pivot-setting");

        if (target.length) {
            return target.data("kendoPivotSettingTarget");
        }
        return null;
    }

    var PivotConfigurator = Widget.extend({
        init: function(element, options) {
            Widget.fn.init.call(this, element, options);

            this.dataSource = kendo.data.PivotDataSource.create(options.dataSource);

            this._refreshHandler = $.proxy(this.refresh, this);
            this.dataSource.bind("change", this._refreshHandler);

            this._layout();

            this.refresh();

            kendo.notify(this);
        },

        events: [],

        options: {
            name: "PivotConfigurator",
            messages: {
                measures: "Drop Data Fields Here",
                columns: "Drop Column Fields Here",
                rows: "Drop Rows Fields Here"
            }
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
            var that = this;

            this.treeView = $("<div/>").appendTo(this.element)
                .kendoTreeView({
                    dataTextField: "name",
                    dragAndDrop: true,
                    autoBind: false,
                    dataSource: this._treeViewDataSource(),
                    dragstart: function(e) {
                        var dataItem = this.dataItem(e.sourceNode);
                        if (!dataItem.hasChildren) {
                            e.preventDefault();
                        }
                    },
                    drag: function(e) {
                        var status = "k-denied";

                        var setting = settingTargetFromNode(e.dropTarget);
                        if (setting && setting.validate(this.dataItem(e.sourceNode))) {
                            status = "k-add";
                        }

                        e.setStatusClass(status);
                    },
                    drop: function(e) {
                        e.preventDefault();

                        var setting = settingTargetFromNode(e.dropTarget);
                        var node = this.dataItem(e.sourceNode);

                        if (setting && setting.validate(node)) {
                            setting.add(node.defaultHierarchy || node.uniqueName);
                        }
                    }
                 })
                .data("kendoTreeView");

            this._targets();
        },

        _targets: function() {
            var element = this.element;

            var columns = $('<div class="k-pivot-configurator-settings" />').appendTo(element);
            var rows = $('<div class="k-pivot-configurator-settings" />').appendTo(element);
            var measures = $('<div class="k-pivot-configurator-settings" />').appendTo(element);

            this.columns = new kendo.ui.PivotSettingTarget(columns, {
                dataSource: this.dataSource,
                connectWith: rows,
                messages: {
                    empty: this.options.messages.columns
                }
            });

            this.rows = new kendo.ui.PivotSettingTarget(rows, {
                dataSource: this.dataSource,
                setting: "rows",
                connectWith: columns,
                messages: {
                    empty: this.options.messages.rows
                }
            });

            this.measures = new kendo.ui.PivotSettingTarget(measures, {
                dataSource: this.dataSource,
                setting: "measures",
                messages: {
                    empty: this.options.messages.measures
                }
            });
        },

        refresh: function() {
            var dataSource = this.dataSource;

            if (this._cube !== dataSource.cube() || this._catalog !== dataSource.catalog()) {
                this.treeView.dataSource.fetch();
            }

            this._catalog = this.dataSource.catalog();
            this._cube = this.dataSource.cube();
        },

        destroy: function() {
            Widget.fn.destroy.call(this);

            this.dataSource.unbind("change", this._refreshHandler);

            this.element = null;
            this._refreshHandler = null;
        }
    });

    ui.plugin(PivotConfigurator);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
