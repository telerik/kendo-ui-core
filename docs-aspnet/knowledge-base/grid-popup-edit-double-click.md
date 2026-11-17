---
title: Open the Grid Popup Editor on a Row Double-Click
page_title: Open the Grid Popup Editor on a Row Double-Click
description: "Learn how to open and reopen the Grid popup editor on a row double-click in {{ site.framework }} with JavaScript."
type: how-to
slug: grid-popup-edit-double-click
tags: grid, popup, editing, double-click, dblclick, row, taghelper
res_type: kb
components: ["grid"]
---

## Environment

* Product: {{ site.product }} Grid
* Framework: {{ site.framework }}
* Client-side version tested: 2026.3.1015
* Browser tested: Chromium

## Description

How can I open the Grid popup editor by double-clicking a data row and reopen it after dismissing the popup?

The Grid fluent `Events(...)` configuration does not include a double-click event. Bind the DOM `dblclick` event and call the client-side `editRow` method instead.

## Solution

The following example assumes that you have [configured {{ site.product }}]({% if site.core %}{% slug gettingstartedtelerik_aspnetcore %}{% else %}{% slug gettingstartedtelerik_cli_aspnetmvc %}{% endif %}) in your application.

1. Enable Popup editing and define a model ID for the Grid.
1. Attach a delegated `dblclick` handler to the Grid element after initialization.
1. Handle only data rows in that Grid's own table body. Ignore events from nested Grids.
1. Pass the double-clicked row to [`editRow`](https://docs.telerik.com/kendo-ui/api/ui/grid/methods/editrow).

Create the model:

```C#
    namespace SampleApp.Models
    {
        public class PopupProduct
        {
            public int ProductID { get; set; }
            public string ProductName { get; set; } = string.Empty;
        }
    }
```

Add the model namespace and sample data to the Razor view:

```Razor
    @using Kendo.Mvc.UI
    @using SampleApp.Models

    @{
        var products = new[]
        {
            new PopupProduct { ProductID = 1, ProductName = "Chai" },
            new PopupProduct { ProductID = 2, ProductName = "Chang" }
        };
    }
```

Choose one of the following Grid declarations:

```HtmlHelper
    @(Html.Kendo().Grid(products)
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(product => product.ProductID);
            columns.Bound(product => product.ProductName);
            columns.Command(command => command.Edit());
        })
        .Editable(editable => editable.Mode(GridEditMode.PopUp))
        .Selectable(selectable => selectable.Mode(GridSelectionMode.Single))
        .Sortable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .ServerOperation(false)
            .Model(model =>
            {
                model.Id(product => product.ProductID);
                model.Field(product => product.ProductID).Editable(false);
            })
        )
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
        <datasource type="DataSourceTagHelperType.Ajax" data="@products" server-operation="false">
            <schema>
                <model id="ProductID">
                    <fields>
                        <field name="ProductID" type="number" editable="false" />
                        <field name="ProductName" type="string" />
                    </fields>
                </model>
            </schema>
        </datasource>
        <columns>
            <column field="ProductID" />
            <column field="ProductName" />
            <column>
                <commands>
                    <column-command name="edit" />
                </commands>
            </column>
        </columns>
        <editable mode="popup" />
        <selectable mode="single" />
        <sortable enabled="true" />
    </kendo-grid>
```
{% endif %}

Place this script after the chosen Grid declaration:

```JavaScript
    <script>
        $(document).ready(function () {
            var grid = $("#grid").data("kendoGrid");

            grid.element.on("dblclick", "tbody > tr[data-uid]", function (e) {
                if (this.parentNode === grid.tbody[0] &&
                    $(e.target).closest(".k-grid")[0] === grid.element[0]) {
                    grid.editRow($(this));
                }
            });
        });
    </script>
```

Double-click a data row, close the popup, and double-click the same row again. The popup reopens even if the row remains selected.

The handler uses the clicked row rather than the selection `Change` event. Delegation keeps it active when sorting or rebinding replaces the rows.

The built-in **Edit** command remains available for keyboard users. Row selection is optional for the double-click handler.

This sample uses local data and does not persist edits to a server. For persistence, configure the read and update endpoints described in [Popup Editing]({% slug popupediting_grid_aspnetcore %}).

## See Also

* [Grid Events]({% slug grid_events %})
* [Grid Local Binding]({% slug htmlhelpers_grid_aspnetcore_localbinding %})
* [Grid editRow Method](https://docs.telerik.com/kendo-ui/api/ui/grid/methods/editrow)
