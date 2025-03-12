---
title: Exporting Grid Rows to Excel with Group Paging
description: This article provides a workaround for exporting Grid rows to Excel when using group paging in the Grid with server operations.
type: how-to
page_title: How to Export Grid Rows to Excel with Group Paging
slug: export-grid-rows-excel-group-paging
tags: grid, export, excel, group paging
res_type: kb
---
## Environment
| Product | Version |
| --- | --- |
| Grid for Progress Kendo UI | 2019.3.917 |

## Description

I want to export Grid rows to Excel, but when using group paging in the Grid with server operations, the exported file only includes the top-level grouping titles and not the actual rows. Even when opening some of the rows, they are still not exported. 

## Solution

Exporting a [`group-paged Grid to Excel with server operations`](https://demos.telerik.com/kendo-ui/grid/grouppaging) is not officially supported. The Excel export component creates its own dataSource and is not aware of the current state of the expanded groups. This means that the exported dataSource is not able to fetch the correct ranges of data.

However, there is a workaround available that allows you to export a group-paged Grid to Excel. Please note that this is not an official approach and it requires overriding internal logic, so side effects may occur.

The example below demonstrates how to achieve the desired scenario.

```dojo
 <div id="grid"></div>
    <script>
      $(document).ready(function () {
        $("#grid").kendoGrid({
          sortable: true,
          columns: [{
            title: "Customer ID",
            width: "100px",
            field: "customerID"
          }, {
            title: "Country",
            width: "100px",
            field: "country"
          }, {
            title: "Company Name",
            width: "100px",
            field: "companyName"
          }, {
            title: "City",
            width: "100px",
            field: "city"
          }, {
            title: "Postal Code",
            width: "100px",
            field: "postalCode"
          }],
          filterable: true,
          scrollable: {
            virtual: true,
            height: "400px"
          },
          toolbar: ["excel"],
          dataSource: {
            type: 'aspnetmvc-ajax',
            transport: {
              read: {
                url: "https://demos.telerik.com/aspnet-core/service/api/customers"
              }
            },
            pageSize: 50,
            page: 1,
            groupPaging: true,
            total: 0,
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            serverGrouping: true,
            serverAggregates: true,
            group: [{
              field: "city",
              dir: "asc"
            }, {
              field: "companyName",
              dir: "asc"
            }],
            schema: {
              data: "data",
              total: "total",
              errors: "errors"
            }
          },
          excelExport: function(e) {
            e.preventDefault();
            var that = this;
            var excel = this.options.excel || {};

            var options = {
              columns: that.columns,
              dataSource: that.dataSource,
              allPages: excel.allPages,
              filterable: excel.filterable,
              hierarchy: excel.hierarchy,
              collapsible: excel.collapsible
            }

            var book = new kendo.excel.ExcelExporter($.extend({}, options, null, {
              data: that.dataSource.view(),
              groups: that.dataSource.group(),
              aggregates: that.dataSource.aggregates()
            })).workbook();

            var workbook = new kendo.ooxml.Workbook(book);

            if (!workbook.options) {
              workbook.options = {};
            }
            workbook.options.skipCustomHeight = true;

            workbook.toDataURLAsync().then(function (dataURI) {
              kendo.saveAs({
                dataURI: dataURI,
                fileName: book.fileName || excel.fileName,
                proxyURL: excel.proxyURL,
                forceProxy: excel.forceProxy
              });
            });
          }
        });

        kendo.excel.ExcelExporter.fn._dataRow = function (dataItem, level, depth) {
          var this$1 = this;

          var cells = this._createPaddingCells(level);

          // grouped
          if (dataItem.itemCount && depth) {
            cells = cells.concat(this._groupHeaderCells(dataItem, level, depth));
            var rows = dataItem.items ? this._dataRows(dataItem.items, level + 1) : [];

            rows.unshift({
              type: "group-header",
              cells: cells,
              level: this.collapsible ? level : null
            });

            return rows.concat(this._footer(dataItem, level));
          }

          var dataCells = [];

          for (var cellIdx = 0; cellIdx < this.columns.length; cellIdx++) {
            dataCells[cellIdx] = this$1._cell(dataItem, this$1.columns[cellIdx]);
          }

          if (this.hierarchy) {
            dataCells[0].colSpan = depth - level + 1;
          }

          return [{
            type: "data",
            cells: cells.concat(dataCells),
            level: this.collapsible ? level : null
          }];
        }

        kendo.excel.ExcelExporter.fn._groupHeaderCells = function (dataItem, level, depth) {
          var cells = [];

          var column = this.allColumns.filter(function (column) {
            return column.field === dataItem.field;
          })[0] || {};

          var title = column && column.title ? column.title : dataItem.field;
          var template = column ? column.groupHeaderTemplate || column.groupHeaderColumnTemplate : null;
          var group = $.extend({
            title: title,
            field: dataItem.field,
            value: column && column.values ? column.values[dataItem.value] : dataItem.value,
            aggregates: dataItem.aggregates,
            items: dataItem.items
          }, dataItem.aggregates[dataItem.field]);

          var value = template ? template(group) : (title + ": " + (dataItem.value));

          cells.push($.extend({
            value: value,
            background: "#dfdfdf",
            color: "#333",
            colSpan: (this.hasGroupHeaderColumn ? 1 : this.columns.length) + depth - level
          }, column.groupHeaderCellOptions));

          if (this.hasGroupHeaderColumn) {
            this.columns.forEach(function (column, index) {
              if (index > 0) {
                cells.push($.extend({
                  background: "#dfdfdf",
                  color: "#333",
                  value: column.groupHeaderColumnTemplate ?
                  column.groupHeaderColumnTemplate($.extend({ group: group }, group, dataItem.aggregates[column.field])) :
                  undefined
                }, column.groupHeaderCellOptions));
              }
            });
          }

          return cells;
        }
      });
    </script>
```

## Notes
Keep in mind that this workaround is not officially supported and may have side effects. Use it at your own discretion.

## See Also

* [JavaScript API Reference of the Kendo UI for jQuery Grid](/api/javascript/ui/grid)
* [Grid Group Paging of Remote Data(Demo)](https://demos.telerik.com/kendo-ui/grid/grouppaging)
