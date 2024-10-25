---
title: Selected Rows Relations in Hierarchical Grids
description: Subscribe to the Change event of the hierarchical Grids and establish a relation between their selected rows.
type: how-to
page_title: Related Selected Rows in Hierarchical Grids
slug: grid-hierarchical-selected-rows-relations
tags: detail, template, hierarchical, grid, selectable, relation, child, parent, checkbox
ticketid: 1632302
res_type: kb
---

## Environment
<table>
    <tbody>
        <tr>
            <td>Product Version</td>
            <td>2023.3.1114</td>
        </tr>
        <tr>
            <td>Product</td>
            <td>{{ site.product }} Grid</td>
        </tr>
    </tbody>
</table>


## Description
I have a parent and a child Grid configured with a [Detail Template]({% slug clientdetailtemplate_grid_aspnetcore%}). When the user selects a row in the child Grid, the checkbox of the parent row must become indeterminate. If all child rows are selected, the parent row must be selected, as well.

## Solution
1. Subscribe to the [Change Event](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideventbuilder#changesystemstring) of both Grids.

    ```HtmlHelper
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.EmployeeViewModel>()
                .Name("grid")
                .ClientDetailTemplateId("template")
                //omitted for brevity
                .Events(events => events.Change("onChangeParent"))
        )

        <script id="template" type="text/kendo-tmpl">
            @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
                .Name("grid_#=EmployeeID#")
                //omitted for brevity 
                .Events(e=>e.Change("onChangeChild"))
                .ToClientTemplate()
                )
        </script>
    ```

2. Within the event handler of the parent Grid, get all selected rows by using the [`select()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/select) method, iterate the rows, access their [`dataItems`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/dataitem), and use the row Id to select the child Grid of each selected row. Then select all child Grid rows.

    ```JavaScript
        function onChangeParent(e){
            var selected = e.sender.select();
            selected.each((ind,row)=>{
                var dataItem = e.sender.dataItem(row);
                var childGrid = $("#grid_"+dataItem.EmployeeID).data("kendoGrid");
                childGrid.select("tr")
            })
        }
    ```

3. Within the event handler of the child Grid, get the parent row with jQuery. Then, use the following logic to either select the parent's checkbox, to make it [indeterminate](https://developer.mozilla.org/en-US/docs/Web/CSS/:indeterminate) or to deselect it based on the number of rows selected in the child.

    ```JavaScript
        function onChangeChild(e){
            var masterRow = $(e.sender.element).closest(".k-detail-row").siblings(".k-master-row").first();
            var checkbox = masterRow.find(".k-select-checkbox");
            if(e.sender.select().length==e.sender.items().length){
                checkbox[0].indeterminate=false;
                checkbox.prop("checked",true);
            }else if(e.sender.select().length>0 ){           
                checkbox[0].indeterminate=true;
            }else{
                checkbox[0].indeterminate=false;
                checkbox.prop("checked",false);
            }
        }
    ```

Review the behavior of the suggested approach in [this REPL sample](https://netcorerepl.telerik.com/wHlbwhbf4967dtBt27).

## Notes
The suggested example will work only for detail rows that have been expanded and initialized.
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
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
