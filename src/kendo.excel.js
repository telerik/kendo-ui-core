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
                    filter: dataSource.filter(),
                    pageSize: dataSource.pageSize(),
                    sort: dataSource.sort(),
                    group: dataSource.group()
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
    _dataRows: function(dataItems, level) {
        var rows = $.map(dataItems, $.proxy(function(dataItem) {
            var cells = new Array(level);
            var groups = this.dataSource.group();

            if (groups.length && dataItem.items) {
                cells.push( {
                    value: dataItem.field + ": " + dataItem.value,
                    colSpan: this.columns.length + groups.length - level
                } );

                var rows = this._dataRows(dataItem.items, level + 1);

                rows.unshift({
                    type: "group",
                    cells: cells
                });

                return rows;
            } else {
                return {
                    type: "data",
                    cells: cells.concat($.map(this.columns, $.proxy(this._cell, this, dataItem)))
                };
            }
        }, this));

        return rows;
    },
    _rows: function() {
        var groups = this.dataSource.group();

        var rows = this._dataRows(this.dataSource.view(), 0);

        if (this.columns.length) {
            rows.unshift({
                type: "header",
                cells: new Array(groups.length).concat($.map(this.columns, function(column) {
                    return {
                        value: column.title || column.field
                    };
                }))
            });
        }

        return rows;
    },
    _freezePane: function() {
        var colSplit = $.grep(this.columns, function(column) {
            return column.locked;
        }).length;

        return {
            rowSplit: 1,
            colSplit: colSplit? colSplit + this.dataSource.group().length : 0
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
        var columns = $.map(new Array(this.dataSource.group().length), function() {
            return { width: 10 };
        });

        return columns.concat($.map(this.columns, function(column) {
            return {
                width: column.width,
                autoWidth: column.width ? false : true
            };
        }));
    }
});

})(kendo.jQuery, kendo);

return kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
