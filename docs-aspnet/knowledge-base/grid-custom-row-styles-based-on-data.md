---
title: Apply Custom Styles to Grid Rows Based on Model Data
page_title: Apply Custom Styles to Grid Rows Based on Model Data
description: "Apply custom row styles based on the model data when using the {{ site.product }} Grid to Excel."
previous_url: /helpers/data-management/grid/how-to/Appearance/custom-row-styles-based-on-data, /html-helpers/data-management/grid/how-to/Appearance/custom-row-styles-based-on-data, /helpers/data-management/grid/how-to/editing/external-editor-for-batch-editable-grid, /html-helpers/data-management/grid/how-to/editing/external-editor-for-batch-editable-grid
slug: howto_applycustomrrowstylesmodeldata_gridaspnetmv
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

How can I apply custom styles to the Grid rows based on the Model data?

## Solution

You can achieve this requirement using the following key steps:

1. Handle the [`onDataBound`](/api/kendo.mvc.ui.fluent/grideventbuilder#databoundsystemfunc) event of the Grid:

    ```HtmlHelper
    .Events(e => e.DataBound("onDataBound"))
    ```
    {% if site.core %}
    ```TagHelper
    <kendo-grid name="grid" on-data-bound="onDataBound">
    </kendo-grid>
    ```
    {% endif %}

1. Within the `DataBound` event handler, loop through the data items of the DataSource and add a custom `class` to the respective row element based on the value of the **EmployeeId** field:

    ```JS
    function onDataBound(e) {
        var grid = $("#grid").data("kendoGrid");
        var gridData = grid.dataSource.view();

        for (var i = 0; i < gridData.length; i++) {
            // Get the item's "uid".
            var currentUid = gridData[i].uid;
            // If the record fits the custom condition
            if (gridData[i].EmployeeId % 2 == 0) {
                // Find the row based on the "uid" and add the custom class.
                var currenRow = grid.table.find("tr[data-uid='" + currentUid + "']");
                $(currenRow).addClass("customClass");
            }
        }
    }
    ```

1. Apply the desired styles to the custom `class`:

    ```CSS
        .customClass {
            background-color: #d88 !important;
        }
    ```

To review the complete example, refer to the ASP.NET MVC project on [applying custom styles to the Grid rows based on Model data](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridRowsBackgroundConditional).{% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

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