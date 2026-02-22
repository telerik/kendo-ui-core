---
title: Access Current Model in the Grid Popup
page_title: Access Current Model in the Grid Popup
description: "Access the currently editable data item in the Popup editor template of the {{ site.product }} Grid in ASP.NET MVC applications."
previous_url: /helpers/data-management/grid/how-to/editing/access-current-model-in-popup, /html-helpers/data-management/grid/how-to/editing/access-current-model-in-popup
slug: howto_accesscurrentmodelpopup_gridaspnetmv
component: grid
type: how-to
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2025.1.227</td>
 </tr>
</table>

## Description

How can I access the currently editable data item in the Popup editor template of the {{ site.product }} Grid?

## Solution

You can implement this requirement as follows:

1. Enable the Popup editing of the Grid and define its custom editor template:

    ```HtmlHelper
    .Editable(editable => editable.Mode(GridEditMode.PopUp).TemplateName("CustomPopUpEditor").AdditionalViewData(new {GridName = GridName}))
    ```
    
2. Access the additional data in the custom Popup editor template:

    ```HtmlHelper
    @{
        string ChildGridName = "PopupGrid";
    }

    <script>
        function getCurrentParentId() {
            var uid = $("#@ChildGridName").closest("[data-uid]").data("uid");
            var parentGrid = $("#@ViewData["GridName"]").data("kendoGrid");
            var model = parentGrid.dataSource.getByUid(uid);
            return { parrentGridRecordId: model.OrderID };
        }
    </script>

    @(Html.Kendo().Grid<Telerik.Examples.Mvc.Areas.GridEditingPopUpAccessModel.Models.Order>()
        .Name(ChildGridName)
        .Columns(columns => {
            columns.Bound(p => p.OrderID);
            columns.Bound(p => p.OrderDescription);
            columns.Bound(p => p.OrderDate);
        })
        .Pageable()
        .Scrollable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .ServerOperation(false)
            .Model(model => {
                model.Id(p => p.OrderID);
            })
            .Read(read => read.Action("ForeignKeyColumn_Read", "Home").Data("getCurrentParentId"))
        )
    )
    ```

To see the complete example, refer to the [ASP.NET MVC application](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/GridEditingPopUpAccessModel) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master). 

## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})
* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)
* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})
* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)

## See Also

* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

