---
title: Clipboard
page_title: jQuery Grid Documentation - Clipboard Support
description: "Learn how to enable the clipboard functionality of the jQuery Grid of Kendo UI that allows you to copy and paste content from Excel to the Grid and vice-versa"
slug: clipboard_kendoui_grid_component
position: 19
---

# Clipboard

By using the Grid clipboard functionality, you enable the user to perform the following copy and paste operations:

* Copy and paste cells from Excel to the Grid.
* Copy and paste cells both between different Grids and within the same Grid.
* Copy and paste cells from the Grid to Excel.

The paste operation supports two interaction modes:

* [Replace](#replace-mode)&mdash;Replaces the Grid cell content with the copied content.
* [Insert](#insert-mode)&mdash;Inserts the copied content as a new Grid row.

## Getting Started

To enable the clipboard feature, configure the Grid with the following settings:

* Add the [`allowCopy: true`](/api/javascript/ui/grid/configuration/allowcopy) option to allow copying the selected cells into the clipboard.
* Add the [`allowPaste: true`](/api/javascript/ui/grid/configuration/allowpaste) option enable the paste operation.
* Make the Grid [selectable]({% slug selection_kendoui_grid_widget %}).
* Enable the Grid keyboard navigation (add the [`navigatable: true`](/api/javascript/ui/grid/configuration/navigatable) option) because the pasting works through the `CTRL+V` keyboard shortcut.
* Include the `paste` [`toolbar`](/api/javascript/ui/grid/configuration/toolbar) command to display a dropdown control with the paste modes.

The following example demonstrates how to configure the Grid clipboard functionality that allows you to copy and paste content from Excel to the Grid and the other way around.

```dojo
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["paste"], // Creates a dropdownlist that enables you to switch between replace and insert modes.
        selectable: "multiple cell",
        allowPaste: true,
        allowCopy: true,
        navigatable: true,
        columns: [
            { field: "productName" },
            { field: "category" }
        ],
        dataSource: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
        ]
    });
    </script>
```

When pasting content to the Grid, the value of each cell will be parsed based on the data type of the respective column field. For example, if a `string` value must be pasted into a cell, whose column binds to a numeric field, the result will be an empty cell (the parser returns `null`).

If you enable the Grid [`Context Menu`]({% slug context_menu_kendoui_grid %}), the **Paste (use CTRL/⌘ + V)** will appear in the menu as a disabled option to inform the users they must use the `CTRL+V` key combination to trigger the paste operation.

## Replace Mode

To activate the Replace mode, select the **Paste (Replace)** option in the Toolbar command of the Grid.

```
    $("#grid").kendoGrid({
        toolbar: ["paste"], // Creates a dropdownlist that enables you to switch between replace and insert modes.
        ...
    })
```

When the Replace mode is enabled, the paste operation will execute as follows:

* If a single cell is pasted into the Grid, it will replace the content of all currently selected Grid cells. For example, if the copied value is `ABC` and three Grid cells are selected, pressing `CTRL+V` will replace the content of the three cells with `ABC`.
* If multiple cells are pasted into the Grid, the component will replace the content of the same number of Grid cells. The update always starts from the first selected cell. For example, when copying two cells from Excel and selecting ten cells in the Grid, pressing `CTRL+V` will replace the content of the first two selected cells.
* At least one Grid cell must be selected to execute the paste operation. Based on the number of the copied cells, the Grid will automatically update the cells whose content must be replaced.

## Insert Mode

To activate the Insert mode select the **Paste (Insert)** option in the Toolbar command of the Grid.

```
    $("#grid").kendoGrid({
        toolbar: ["paste"], // Creates a dropdownlist that enables you to switch between replace and insert modes.
        ...
    })
```

When the Insert mode is enabled, the paste operation will create a new Grid row with the copied content. The row will be inserted after the first selected Grid cell.

## Events

The Data Grid exposes a [`paste`](/api/javascript/ui/grid/events/paste) event. The event fires after the user pastes data by using the built-in paste functionality and it contains the following event fields:

* `items`&mdash;The pasted data from the last paste operation.
* `type`&mdash;The Replace or Insert paste mode.

The following example demonstrates how to subscribe to the `paste` event.

```dojo
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["paste"],
        selectable: "multiple cell",
        allowPaste: true,
        allowCopy: true,
        navigatable: true,
        columns: [
            { field: "productName" },
            { field: "category" }
        ],
        dataSource: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
        ],
        paste: function() {
            console.log("Paste fired!")
        }
    });
    </script>
```

## See Also

* [Copy to Excel by using the jQuery Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/copy-to-excel)
* [Paste from Excel by using the jQuery Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/paste-from-excel)
* [Select and Export to Excel by using the jQuery Grid (Demo)](https://demos.telerik.com/kendo-ui/grid/selection-export)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [Knowledge Base Section](/knowledge-base)
