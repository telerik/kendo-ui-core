---
title: Rows
page_title: Rows
description: "Get started with the Telerik UI Grid HtmlHelper for {{ site.framework }} and learn how to handle the most common scenarios when configuring the behavior of its rows."
slug: rows_aspnetcore_grid_widget
position: 3
---

# Rows

The Grid enables you to handle the appearance of its rows by [using the `id` of the data item](#getting-rows-by-model-id), [adding custom rows](#adding-custom-rows), [utilizing row templates](#using-row-templates), and [disabling the hover effect](#disabling-the-hover-effect).  

## Getting Rows by Model Id

To get a table row in the Grid by the ID of the data item:

1. Make sure the [Id field is defined in the model configuration](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/DataSourceModelDescriptorFactory) of the data source of the Grid.
2. Retrieve the row model, the model UID, and the Grid table row consecutively.

    var grid = $("#grid").data("kendoGrid"); // Get the Grid instance.
    var dataItem = grid.dataSource.get(10249); // The get() method of the dataSource only works when the model id is set.
    var tableRow = $("[data-uid='" + dataItem.uid + "']"); // Get the row by its unique data-uid attribute. This UID is rendered by the Grid automatically.

## Adding Custom Rows

You can manually add a table row with a user-friendly message when the DataSource does not return any data, for example, as a result of filtering. For more information, refer to the article on [row templates]({% slug row_templates_aspnetcore_grid %}).

The following example demonstrates how to add a table row in the [`DataBound()`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/GridEventBuilder#databoundsystemstring) event handler of the Grid.

    @(Html.Kendo().Grid<AspNetCoreGrid.Models.OrderViewModel>()
        .Name("grid")
        .Filterable()
        /* Other configuration. */
        .Events(e=>e.DataBound("onGridDataBound"))
    )

    function onGridDataBound(e) {
        if (!e.sender.dataSource.view().length) {
            var colspan = e.sender.thead.find("th:visible").length,
                emptyRow = '<tr><td colspan="' + colspan + '">... no records ...</td></tr>';
            e.sender.tbody.parent().width(e.sender.thead.width()).end().html(emptyRow);
        }
    }

## Using Row Templates

For more information, refer to the article on [row templates]({% slug row_templates_aspnetcore_grid %}).

## Disabling the Hover Effect

Hover is a UI state which provides better visualization across long table rows and when the Grid is in its edit mode. However, if your project requires you to avoid the `hover` state, use either of the following approaches:

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

## See Also

* [Using Row Templates in the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/rowtemplate)
* [Row Templates in the Grid HtmlHelper for {{ site.framework }}]({% slug row_templates_aspnetcore_grid %})
* [Server-Side API](/api/grid)
