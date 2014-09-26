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
        this.dataSource =
            kendo.data.DataSource.create(options.dataSource instanceof kendo.data.DataSource ? options.dataSource.options : options.dataSource);
    },
    workbook: function() {
        var promise = this.dataSource.fetch();

        return promise.then($.proxy(function() {
            return new kendo.ooxml.Workbook({
                sheets: [
                    {
                       columns: this._columns(),
                       rows: this._rows(),
                       freezePane: this._freezePane()
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
                width: column.width
            };
        });
    }
});

})(kendo.jQuery, kendo);

return kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
