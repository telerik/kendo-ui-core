---
title: Column Menu
page_title: jQuery Grid Documentation | Column Menu
description: "Get started with the jQuery Grid by Kendo UI and learn how to enable its column menu."
slug: columnmenu_kendoui_grid_widget
position: 5
---

# Column Menu

The Grid provides a built-in option for triggering column operations through a menu.

To enable the column-menu implementation, set [`columnMenu:true`](/api/javascript/ui/grid/configuration/columnmenu). As a result, the column headers of the Grid render a column menu which allows the user to sort, filter, or change the visibility of the column. The column menu also detects when a specific column operation is disabled through the column definition and excludes the corresponding UI from its rendering. For a runnable example, refer to the [demo on implementing a column menu in the Grid](https://demos.telerik.com/kendo-ui/grid/column-menu).

## Sort

To sort the columns in the column menu, use the `columns.sort` configuration with `asc` or `desc` as the value. The columns are not sorted by default, they have the same order as the columns in the grid:

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

## KB Articles on Column Menu

* [Using Checkboxes inside the Column Menu]({% slug howto_use_checkboxes_inside_column_menu_grid %})
* [Find Out More in the Knowledge Base](/knowledge-base)

## See Also

* [Column Menu by the Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/column-menu)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
