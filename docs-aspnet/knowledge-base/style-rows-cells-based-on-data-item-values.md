---
title: Style Grid Table Rows and Cells Based on Values
page_title: Style Grid Table Rows and Cells by Data Item Values
description: "An example on how to customize the tables cells and rows styles of the Telerik UI Grid for {{ site.framework }} based on data items values."
slug: howto_customize_rowsand_cells_basedon_dataitem_values_grid
tags: customize, grid, rows, cells, basedon, data, item, value
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Telerik® UI Grid for UI for {{ site.framework }}</td>
 </tr>
  <tr>
  <td>Progress Тelerik UI version</td>
  <td>2021.3.1207</td>
 </tr>
</table>

## Description

How can I customize the cells and rows of the  {{ site.product }} Grid on data items values?

## Solution

Grid templates enable you to customize and style the content *inside* the table cells. However, your project might require the customization of the tables cells or rows of the Grid. Naturally, the custom styling is likely based on the values of the data items.

Although the demos apply custom CSS classes, you can still use the demonstrated approaches even if you apply inline styles or other HTML attributes.

To customize the rows and cells based on the values of the data items, utilize any of the following approaches:
* [Iterate the table rows](#iterating-the-table-rows)
* [Iterate the data items](#iterating-the-data-items)
* [Use a row template](#using-a-row-template)

## Iterate the Table Rows

The usage of the `dataBound` handler and the iteration of the table rows is suitable only if you intend to customize all Grid rows. The approach loops through all Grid rows and, based on the values they contain, determines which custom-class names will be applied to them.

Refer to the [following REPL](https://netcorerepl.telerik.com/ccuPvWbJ55wNDdBy48) for a live demo of the approach.

```
    //Grid definition also available in the *Custom data source Demo*
    @model IEnumerable<Kendo.Mvc.Examples.Models.ProductViewModel>
    @using Kendo.Mvc.UI

    @(Html.Kendo().Grid(Model)
        .Name("Grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName).Title("Product Name");
            columns.Bound(p => p.UnitPrice).Title("Unit Price").Width(130);
            columns.Bound(p => p.UnitsInStock).Title("Units In Stock").Width(130);
            columns.Bound(p => p.Discontinued).Width(130);
        })
        .Pageable()
        .Sortable()
        .Scrollable(scr=>scr.Height(430)) 
        .Filterable()
        .Events(e=>e.Databound("databound")) 
        .DataSource(dataSource => dataSource        
            .Ajax()
            .PageSize(20)
            .ServerOperation(false)        
        )
    )
     <style>
      .k-grid {
        width: 500px;
      }

      .discontinued {
        font-weight: bold;
        color: #f00;
      }
      .critical {
        background-color: #fdd;
      }

      .warning {
        background-color: #fda;
      }

      .ok {
        background-color: #ced;
      }
    </style>
    <script>
      function getUnitsInStockClass(units) {
        if (units < 5) {
          return "critical";
        } else if (units < 10) {
          return "warning";
        } else {
          return "ok";
        }
      }

      function dataBound(e) {
        // get the index of the UnitsInStock cell
        var columns = e.sender.columns;
        var columnIndex = this.wrapper.find(".k-grid-header [data-field=" + "UnitsInStock" + "]").index();

        // iterate the table rows and apply custom row and cell styling
        var rows = e.sender.tbody.children();
        for (var j = 0; j < rows.length; j++) {
          var row = $(rows[j]);
          var dataItem = e.sender.dataItem(row);

          var units = dataItem.get("UnitsInStock");
          var discontinued = dataItem.get("Discontinued");

          if (discontinued) {
            row.addClass("discontinued");
          }

          var cell = row.children().eq(columnIndex);
          cell.addClass(getUnitsInStockClass(units));
        }
      }
    </script>
```

## Iterate the Data Items

The usage of the `dataBound` handler and the iteration of the data items is suitable only if you intend to customize part of the Grid rows. The approach loops through all data items of the Grid and accesses just the rows which match certain conditions.

Refer to the [following REPL](https://netcorerepl.telerik.com/QGaPlMPA01Ynhx8P04) for a live demo of the approach.

```
    //Grid definition also available in the *Custom data source Demo*
    @model IEnumerable<Kendo.Mvc.Examples.Models.ProductViewModel>
    @using Kendo.Mvc.UI

    @(Html.Kendo().Grid(Model)
        .Name("Grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName).Title("Product Name");
            columns.Bound(p => p.UnitPrice).Title("Unit Price").Width(130);
            columns.Bound(p => p.UnitsInStock).Title("Units In Stock").Width(130);
            columns.Bound(p => p.Discontinued).Width(130);
        })
        .Pageable()
        .Sortable()
        .Scrollable(scr=>scr.Height(430)) 
        .Filterable()
        .Events(e=>e.Databound("databound")) 
        .DataSource(dataSource => dataSource        
            .Ajax()
            .PageSize(20)
            .ServerOperation(false)        
        )
    )
    <style>
    .k-grid {
        width: 500px;
    }

    .discontinued {
        font-weight: bold;
        color: #f00;
    }
    </style>
    <script>
      function(e) dataBound{
        // get the index of the UnitsInStock cell
        var columns = e.sender.columns;
        var columnIndex = this.wrapper.find(".k-grid-header [data-field=" + "UnitsInStock" + "]").index();

        // iterate the data items and apply row styles where necessary
        var dataItems = e.sender.dataSource.view();
        for (var j = 0; j < dataItems.length; j++) {
          var discontinued = dataItems[j].get("Discontinued");

          var row = e.sender.tbody.find("[data-uid='" + dataItems[j].uid + "']");
          if (discontinued) {
            row.addClass("discontinued");
          }
        }
      }
    </script>

```

## Use a Row Template

The usage of a row template is suitable only if you do not intend to use hierarchy, grouping, editing, and frozen columns&mdash;the Grid does not support the simultaneous application of these features and row templates. The approach directly adds template expressions to the `rowTemplate` and `altRowTemplate` definitions and determines which custom CSS classes will be applied to a given row or cell.

Refer to the [following REPL](https://netcorerepl.telerik.com/mcuFlNuC05ge5RKB30) for a live demo of the approach.

```
      //Grid definition also available in the *Custom data source Demo*
      @model IEnumerable<Kendo.Mvc.Examples.Models.ProductViewModel>
      @using Kendo.Mvc.UI

      @(Html.Kendo().Grid(Model)
          .Name("Grid")
          .Columns(columns =>
          {
              columns.Bound(p => p.ProductName).Title("Product Name");
              columns.Bound(p => p.UnitPrice).Title("Unit Price").Width(130);
              columns.Bound(p => p.UnitsInStock).Title("Units In Stock").Width(130);
              columns.Bound(p => p.Discontinued).Width(130);
          })
          .ClientAltRowTemplate("#=rowTemplateString#")
          .ClientRowTemplate("#=altRowTemplateString#")
          .Pageable()
          .Sortable()
          .Scrollable(scr=>scr.Height(430)) 
          .Filterable()
          .Events(e=>e.Databound("databound")) 
          .DataSource(dataSource => dataSource        
              .Ajax()
              .PageSize(20)
              .ServerOperation(false)        
          )
      )
      <style>
        .k-grid {
          width: 500px;
        }

        .discontinued {
          font-weight: bold;
          color: #f00;
        }
        .critical {
          background-color: #fdd;
        }

        .warning {
          background-color: #fda;
        }

        .ok {
          background-color: #ced;
        }
      </style>
      <script>

        var rowTemplateString = '<tr class="#: Discontinued ? "discontinued" : "" #" data-uid="#: uid #">' +
            '<td>#: ProductName #</td>' +
            '<td class="#: getUnitsInStockClass(UnitsInStock) #">#: UnitsInStock #</td>' +
            '<td>#: Discontinued #</td>' +
            '</tr>';
        
        var altRowTemplateString = rowTemplateString.replace('tr class="', 'tr class="k-alt ');

        function getUnitsInStockClass(units) {
          if (units < 5) {
            return "critical";
          } else if (units < 10) {
            return "warning";
          } else {
            return "ok";
          }
        }
      </script>
```

## See Also
* [Grid Custom data source (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/custom-datasource)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
