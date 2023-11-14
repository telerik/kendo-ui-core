---
title: Column Menu
page_title: jQuery TreeList Documentation - Column Menu
description: "Get started with the jQuery TreeList by Kendo UI and learn how to enable its column menu."
slug: columnmenu_kendoui_treelist_widget
position: 9
---

# Column Menu

The TreeList provides a built-in option for triggering column operations through a menu.

To enable the Column Menu implementation, use [`columnMenu:true`](/api/javascript/ui/treelist/configuration/columnmenu). As a result, the column headers of the TreeList render a column menu, which allows the user to sort, filter, reorder, or change the visibility of a column. The Column Menu also detects when a specific column operation is disabled through the column definition and does not render it. For a runnable example, refer to the [demo on implementing a Column Menu in the TreeList](https://demos.telerik.com/kendo-ui/treelist/column-menu).

> When the [`columnMenu`](/api/javascript/ui/treelist/configuration/columnmenu) configuration is set to `true`, the TreeList fires the [`columnMenuInit`](/api/javascript/ui/treelist/events/columnmenuinit) and [`columnMenuOpen`](/api/javascript/ui/treelist/events/columnmenuopen) events instead of [`filterMenuInit`](/api/javascript/ui/treelist/events/filtermenuinit) and [`filterMenuOpen`](/api/javascript/ui/treelist/events/filtermenuopen).

For more information about the available configuration properties, see the [Column Menu API reference](/api/javascript/ui/treelist/configuration/columnmenu).

## Column Reordering

As of Kendo UI R2 SP1 2023,the TreeList's Column Menu provides an option to change the position of the target column by using **Move next** and **Move previous** buttons.

```dojo
      <div id="treelist"></div>
      <script>
        $(document).ready(function () {
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

          var dataSource = new kendo.data.TreeListDataSource({
            transport: {
              read: {
                url: crudServiceBaseUrl + "/EmployeeDirectory",
                dataType: "jsonp"
              }
            },
            schema: {
              model: {
                id: "EmployeeId",
                parentId: "ReportsTo",
                fields: {
                  EmployeeId: { type: "number", nullable: false },
                  ReportsTo: { nullable: true, type: "number" }
                }
              }
            }
          });

          $("#treelist").kendoTreeList({
            dataSource: dataSource,
            columnMenu: true,
            reorderable:true,            
            columns: [
              { field: "FirstName", expandable: true, title: "First Name", width: 250 },
              { field: "LastName", title: "Last Name" },
              { field: "Position" },
              { field: "Extension", title: "Ext", format: "{0:#}", filterable: false }
            ]
          });
        });
      </script>
```

## See Also

* [Column Menu by the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/column-menu)
* [JavaScript API Reference of the TreeList](/api/javascript/ui/treelist)
* [Kendo UI Knowledge Base](/knowledge-base)
