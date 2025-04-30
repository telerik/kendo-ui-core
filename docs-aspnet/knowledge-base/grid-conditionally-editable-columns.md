---
title: Make Grid Columns Conditionally Editable 
page_title: Make Grid Columns Conditionally Editable 
description: "Learn how to configure the {{ site.product }} Grid columns to be editable based on condition."
previous_url: /helpers/data-management/grid/how-to/editing/conditionally-editable-columns, /html-helpers/data-management/grid/how-to/editing/conditionally-editable-columns
slug: howto_conditionallyeditablecolumns_gridaspnetmv
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product version</td>
  <td>2025.1.227</td>
 </tr>
</table>

## Description

How can I make specific Grid columns editable or non-editable based on condition?

## Solution

The columns in the {{ site.product }} Grid provide the [`Editable`](/api/kendo.mvc.ui.fluent/gridboundcolumnbuilder#editablesystemstring) property that accepts a JavaScript function name.

By default, the current `dataItem` is passed to the JavaScript method as an argument. You can use this argument to access the values of the respective model.

The following example demonstrates how to enable or disable the editing of the **ProductName** column based on the value of the **ProductID** field.

1. Add the `Editable` property for a Grid column and specify the name of the JavaScript method.

    ```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName).Editable("productNameEditable");
            ... // Other columns.
        })
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model => model.Id(p => p.ProductID))
            ... // Settings omitted for brevity.
        )
        ... // Settings omitted for brevity.
    )
    ```
    {% if site.core %}
    ```TagHelper
    <kendo-grid name="grid">
        <columns>
            <column field="ProductName" editable="productNameEditable"></column>
            <!-- Other columns. -->
        </columns>
        <datasource type="DataSourceTagHelperType.Ajax">
            <schema>
                <model id="OrderID">
                </model>
            </schema>
            <!-- Settings omitted for brevity. -->
        </datasource>
        <!-- Settings omitted for brevity. -->
    </kendo-grid>
    ```
    {% endif %}

1. Add logic in the JavaScript function to determine if the column must be editable.

    ```JS
    <script>
        function productNameEditable(dataItem) {
            // Do not allow editing of "ProductName" field for the record with "ProductID" that equals "3".
            return dataItem.ProductID != 3;
        }
    </script>
    ```

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

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
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
