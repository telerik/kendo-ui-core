(function(f, define){
    define([ "./kendo.data", "./kendo.ooxml" ], f);
})(function(){

/* global JSZip */

var __meta__ = {
    id: "ooxml",
    name: "Excel export",
    category: "framework",
    advanced: true,
    depends: [ "ooxml", "data" ]
};

(function($, kendo){

kendo.data.ExcelExporter = kendo.Class.extend({
    init: function(options) {
        this.columns = options.columns || [];
        this.options = options;
        var dataSource = options.dataSource;
        if (dataSource instanceof kendo.data.DataSource) {
            this.dataSource = new dataSource.constructor($.extend(
                {},
                dataSource.options,
                {
                    page: dataSource.page(),
                    filter: dataSource.filter()
                }));
        } else {
            this.dataSource = kendo.data.DataSource.create(dataSource);
        }
    },
    workbook: function() {
        var promise = this.dataSource.fetch();

        return promise.then($.proxy(function() {
            return new kendo.ooxml.Workbook({
                sheets: [
                    {
                       columns: this._columns(),
                       rows: this._rows(),
                       freezePane: this._freezePane(),
                       filter: this.options.filter
                    }
                ]
            });
        }, this));
    },
    _rows: function() {
        var rows = [];

        if (this.columns.length) {
            rows.push({
                cells: $.map(this.columns, function(column) {
                    return {
                        value: column.title || column.field
                    };
                })
            });
        }

        rows.push.apply(rows, $.map(this.dataSource.view(), $.proxy(function(dataItem) {
            return {
                cells: $.map(this.columns, $.proxy(this._cell, this, dataItem))
            };
        }, this)));

        return rows;
    },
    _freezePane: function() {
        return {
            rowSplit: 1
        };
    },
    _cell: function(dataItem, column) {
        if (column.field) {
            return {
                value: dataItem.get(column.field)
            };
        }
    },
    _columns: function() {
        return $.map(this.columns, function(column) {
            return {
                width: column.width,
                autoWidth: column.width ? false : true
            };
        });
    }
});

})(kendo.jQuery, kendo);

return kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
