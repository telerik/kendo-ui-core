---
title: Column Menu
page_title: jQuery Grid Documentation - Column Menu
description: "Get started with the jQuery Grid by Kendo UI and learn how to enable its column menu."
slug: columnmenu_kendoui_grid_widget
position: 5
---

# Column Menu

The Grid provides a built-in option for triggering column operations through a menu.

To enable the column menu implementation, set [`columnMenu:true`](/api/javascript/ui/grid/configuration/columnmenu). As a result, the column headers of the Grid render a column menu, which allows the user to sort, filter, or change the visibility of a column. The column menu also detects when a specific column operation is disabled through the column definition and excludes the corresponding UI from its rendering. For a runnable example, refer to the [demo on implementing a column menu in the Grid](https://demos.telerik.com/kendo-ui/grid/column-menu).

> When the [`columnMenu`](/api/javascript/ui/grid/configuration/columnmenu) configuration is set to true, the Grid fires the [`columnMenuInit`](/api/javascript/ui/grid/events/columnmenuinit) and [`columnMenuOpen`](/api/javascript/ui/grid/events/columnmenuopen) events instead of [`filterMenuInit`](/api/javascript/ui/grid/events/filtermenuinit) and [`filterMenuOpen`](/api/javascript/ui/grid/events/filtermenuopen).

Further information about the available columnMenu configuration properties can be obtained from this [`API article`](/api/javascript/ui/grid/configuration/columnmenu).

## Column Reordering

As of Kendo UI R2 SP1 2023, the Grid's Column Menu provides an option to change the position of the target column by using **Move next** and **Move previous** buttons. To see this functionality in action, check the [Grid Column Menu demo](https://demos.telerik.com/kendo-ui/grid/column-menu).

## Column Grouping

As of Kendo UI R2 SP1 2023, the Grid's Column Menu provides an option that allows users to select the target column for grouping or ungrouping the Grid. To display the option item in the Column Menu, set the [`groupable`](/api/javascript/ui/grid/configuration/groupable) configuration to `true`.

```dojo
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        columnMenu:true,
        groupable:true,
        pageable: true,
        dataSource: {
          data: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 },
            { name: "Mike Doe", age: 31 },
            { name: "Tom Doe", age: 35 },
            { name: "Danny Doe", age: 37 }
          ],
          pageSize: 2, // The number of items displayed per page
          page: 2 // Page 2 will be opened by default when the Grid loads.
        }
      });
    </script>
```

## Sort

By default, the Grid column titles in the child column menu are not sorted. They have the same order as the columns in the Grid. To sort the column titles in the child menu, use the `columns.sort` configuration with `asc` or `desc` as the value..

```
    columnMenu: {
        columns: {
            sort: "asc"
        }
    }
```

## Group

The `columnMenu` configuration setting accepts a `columns.groups` array that enables grouping of the columns in the menu. The array should contain objects with a `title` property which will be the title of the columns in that group and a `columns` array with the model fields that are part of the group. The menu will automatically use the titles from the grid columns for the columns options if they are defined.

```
    columnMenu: {
        columns: {
          groups: [
            { title: "Personal Information", columns: ["age", "firstName", "lastName"] },
            { title: "Address", columns: ["streetName", "streetNumber", "city", "postalCode"] }
          ]
        }
    }
```

## Column Menu Types

As of R1 2021 version of the Kendo UI suite, the Grid component introduces the `modern` render mode that aims to deliver a fresh look and feel. It aims to enhance the existing rendering and deliver a fresh and modern look and feel. 

By default, the column menu of the Grid is initialized in the `classic` render mode. To set it to `modern`, configure the options of the component as follows:

```
    $("#grid").kendoGrid({
        columnMenu:{
            componentType:"modern"
        }
    });
```

## Disabling Column Menu for Specific Columns

As of R3 2022, the Kendo UI Grid enables the developer to disable the columnMenu for specific columns.

To take advantage of this feature, use the [`columns.columnMenu`](/api/javascript/ui/grid/configuration/columns.columnMenu) property.

## KB Articles on Column Menu

* [Using Checkboxes inside the Column Menu]({% slug howto_use_checkboxes_inside_column_menu_grid %})
* [Find Out More in the Knowledge Base](/knowledge-base)

## See Also

* [Column Menu by the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/column-menu)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
