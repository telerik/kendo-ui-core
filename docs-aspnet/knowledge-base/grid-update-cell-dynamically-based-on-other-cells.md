---
title: Updating Grid Cell Dynamically based on the Values of Multiple Cells
description: How can I dynamically update a specified non-editable Grid cell, whose value is a calculation based on other Grid editable cells?
type: how-to
page_title: Updating Grid Cell Dynamically based on the Values of Multiple Cells
slug: grid-update-cell-dynamically-based-on-other-cells
tags: grid, incell, editable, dynamically, automatically, cell, calculation, telerik, core, mvc
res_type: kb
ticketid: 1629412
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.3.1114 version</td>
 </tr>
</table>

## Description

How can I dynamically update a specified non-editable cell, whose value is a calculation based on other editable cells, when using Telerik UI for {{ site.framework }} Grid in InCell editable mode?

## Solution

The InCell editable Grid contains the following columns:

* <b>CreditAmount</b>&mdash;An editable column.
* <b>DebitAmount</b>&mdash;A non-editable column.
* <b>TransactionAmount</b>&mdash;A non-editable column which value equals subtraction of the <b>DebitAmount</b> from the <b>CreditAmount</b> value (<b>CreditAmount</b> - <b>DebitAmount</b>).

Follow the next steps to update the <b>TransactionAmount</b> when the <b>CreditAmount</b> changes.

1. Add a custom class to the <b>CreditAmount</b> column and disable the <b>TransactionAmount</b> by using the `k-disabled` class.

    ```HtmlHelper
        @(Html.Kendo().Grid<GridViewModel>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(p => p.CreditAmount).HtmlAttributes(new { @class="creditAmountCell"});
                columns.Bound(p => p.DebitAmount);
                columns.Bound(p => p.TransactionAmount).HtmlAttributes(new { @class = "k-disabled", style = "opacity: 1"});                         
            })
            .Editable(e => e.Mode(GridEditMode.InCell))
            ...
            .DataSource(dataSource => dataSource
                .Ajax()
                .Model(m => 
                {
                    m.Id("OrderID");
                    m.Field(p => p.OrderID).Editable(false);
                    m.Field(p => p.DebitAmount).Editable(false);
                })
                ...
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-grid name="grid">
            <columns>
                <column field="CreditAmount" html-attributes='new Dictionary<string,object> { ["class"] = "creditAmountCell" }'/>
                <column field="DebitAmount"/>
                <column field="TransactionAmount" html-attributes='new Dictionary<string,object> { ["class"] = "k-disabled", ["style"] = "opacity: 1" }'/>
            </columns>
            <editable mode="incell"/>
            <!-- Other configuration -->
            <datasource type="DataSourceTagHelperType.Ajax">
                <schema>
                    <model id="OrderID">
                        <fields>
                            <field name="OrderID" type="number" editable="false"></field>
                            <field name="DebitAmount" type="number" editable="false"></field>
                        </fields>
                    </model>
                </schema>
                <!-- Other configuration -->
            </datasource>
        </kendo-grid>
    ```
    {% endif %}

1. Handle the `CellClose` event of the Grid that triggers when a specified cell in edit mode is going to be closed.
1. Check if the closed cell contains the custom class of the <b>CreditAmount</b> column and if its value has changed.
1. Use [`set()`](https://docs.telerik.com/kendo-ui/api/javascript/data/observableobject/methods/set) method to update the <b>TransactionAmount</b> column.

    ```HtmlHelper
        @(Html.Kendo().Grid<GridViewModel>()
            .Name("grid")
            .Events(ev => ev.CellClose("onCellClose"))
            ...
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-grid name="grid" on-cell-close="onCellClose">
            <!-- Other configuration -->
        </kendo-grid>
    ```
    {% endif %}
    ```Script
        <script>
            function onCellClose(e) {
                var closedCreditAmountCell = $(e.container).hasClass("creditAmountCell");
                if (closedCreditAmountCell && e.model.dirtyFields["CreditAmount"] == true) { // Check if "CreditAmount" cell is updated.
                    let creditAmountValue = e.model.CreditAmount; // Get the new CreditAmount value.
                    let debitAmountValue = e.model.DebitAmount; // Get the respective DebitAmount value.
                    setTimeout(() => {
                        e.model.set("TransactionAmount", (creditAmountValue - debitAmountValue)); // Update the "TransactionAmount" cell.
                    }, 100);
                }
            }
        </script>
    ```

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/grid)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

