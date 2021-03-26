---
title: Rows
page_title: jQuery Grid Documentation | Rows
description: "Get started with the jQuery Grid by Kendo UI and learn how to handle the most common scenarios when configuring the behavior of its rows."
slug: rows_kendoui_grid_widget
position: 3
---

# Rows

The Grid enables you to handle the appearance of its rows by [using the `id` of the data item](#getting-rows-by-id), [adding custom rows](#adding-custom-rows), [utilizing row templates](#using-row-templates), and [disabling the hover effect](#disabling-the-hover-effect).  

## Getting Rows by ID

To get a table row in the Grid by the ID of the data item:

1. Make sure the [ID field is defined in the model configuration](/api/javascript/data/model) of the data source of the Grid.
2. Retrieve the row model, the model UID, and the Grid table row consecutively.

        var rowModel = gridObject.dataSource.get(10249); // get method of the Kendo UI dataSource object
        var modelUID = rowModel.get("uid"); // get method of the Kendo UI Model object
        var tableRow = $("[data-uid='" + modelUID + "']"); // the data-uid attribute is applied to the desired table row element. This UID is rendered by the Grid automatically.

## Adding Custom Rows

You can manually add a table row with a user-friendly message when the DataSource does not return any data, for example, as a result of filtering. For more information, refer to the article on [row templates]({% slug row_templates_kendoui_grid_widget %}).

The following example demonstrates how to add a table row in the [`dataBound`](/api/javascript/ui/grid/events/databound) event handler of the Grid.

    function onGridDataBound(e) {
        if (!e.sender.dataSource.view().length) {
            var colspan = e.sender.thead.find("th:visible").length,
                emptyRow = '<tr><td colspan="' + colspan + '">... no records ...</td></tr>';
            e.sender.tbody.parent().width(e.sender.thead.width()).end().html(emptyRow);
        }
    }

## Using Row Templates

For more information, refer to the article on [row templates]({% slug row_templates_kendoui_grid_widget %}).

## Disabling the Hover Effect

As of the Kendo UI Q1 2016 release, all Kendo UI themes feature styles for row hovering. Hover is a UI state which provides better visualization across long table rows and when the Grid is in editing mode.

However, if your project requires you to avoid the `hover` state, use either of the following approaches:
* Open the Kendo UI theme CSS file (for example, `kendo.default.min.css`) and remove the following CSS rule.

      ```
      .k-grid tr:hover {
          /* ...background styles here... */
        }
      ```

* Override the `hover` styling by using the CSS code from the following example. The `#f1f1f1` value corresponds to the background color of the `.k-alt` table rows. To find the correct value for the Kendo UI theme that you are applying, use the DOM inspector of the browser. Alternatively, set a background color value of your preference.

    ```
    .k-grid tr:not(.k-state-selected):hover {
        background: none;
        color: inherit;
    }

    .k-grid tr.k-alt:not(.k-state-selected):hover {
        background: #f1f1f1;
    }
    ```

## KB Articles on Rows

* [Customizing Rows and Cells Based on Data Item Values]({% slug howto_customize_rowsand_cells_basedon_dataitem_values_grid %})
* [Allowing Single Rows in Master Grids to be Expanded]({% slug howto_allowonlyasingleexpandedrow_grid %})
* [Find Out More in the Knowledge Base](/knowledge-base)

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
