---
title: Rows
page_title: jQuery Grid Documentation | Rows | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to handle the most common scenarios when configuring the behavior of its rows."
slug: rows_kendoui_grid_widget
position: 4
---

# Rows

The Grid enables you to handle the appearance of its rows by using the `id` of the data item, adding custom rows, and utilizing row templates.  

## Model IDs

To get a table row in the Grid by the ID of the data item:

1. Make sure the [ID field is defined in the model configuration](/api/javascript/data/model) of the Grid dataSource.
2. Retrieve the row model, the model UID, and the Grid table row consecutively:

###### Example

    var rowModel = gridObject.dataSource.get(10249); // get method of the Kendo UI dataSource object
    var modelUID = rowModel.get("uid"); // get method of the Kendo UI Model object
    var tableRow = $("[data-uid='" + modelUID + "']"); // the data-uid attribute is applied to the desired table row element. This UID is rendered by the Grid automatically.

## Custom Rows When No Records Are Loaded

You can manually add a table row with a user-friendly message when the dataSource does not return any data, for example, as a result of filtering.

The following example demonstrates how to add a table row in the [`dataBound`](/api/javascript/ui/grid/events/databound) event handler of the Grid.

###### Example

    function onGridDataBound(e) {
        if (!e.sender.dataSource.view().length) {
            var colspan = e.sender.thead.find("th:visible").length,
                emptyRow = '<tr><td colspan="' + colspan + '">... no records ...</td></tr>';
            e.sender.tbody.parent().width(e.sender.thead.width()).end().html(emptyRow);
        }
    }

## Row Templates

For more information on using row templates, refer to the [walkthrough article]({% slug walkthrough_kendoui_grid_widget %}#templates).

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
