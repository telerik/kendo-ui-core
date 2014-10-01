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
                       filter: this._filter()
                    }
                ]
            });
        }, this));
    },
    _filter: function() {
        if (!this.options.filter) {
            return null;
        }

        var groups = this.dataSource.group();

        return {
            from: groups.length,
            to: groups.length + this.columns.length - 1
        };
    },
    _dataRows: function(dataItems, level) {
        var rows = $.map(dataItems, $.proxy(function(dataItem) {
            var cells = $.map(new Array(level), function() {
                return {
                    background: "#dfdfdf",
                    color: "#333"
                };
            });

            var groups = this.dataSource.group();

            if (groups.length && dataItem.items) {
                var column = $.grep(this.columns, function(column) {
                    return column.field == dataItem.field;
                })[0];

                var title = column && column.title ? column.title : dataItem.field;

                cells.push( {
                    value: title + ": " + dataItem.value,
                    background: "#dfdfdf",
                    color: "#333",
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
                cells: $.map(new Array(groups.length), function() {
                    return {
                        background: "#7a7a7a",
                        color: "#fff"
                    };
                }).concat($.map(this.columns, function(column) {
                    return {
                        background: "#7a7a7a",
                        color: "#fff",
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
            return { width: 20 };
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
