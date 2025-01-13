---
title: Grid Grouping with Responsive Columns
description: "Learn how to group the responsive columns for the {{ site.product }} Data Grid component."
type: how-to
page_title: Group The {{ site.product }} Grid Responsive Columns
slug: grid-group-responsive-columns
tags: grid, responsive, grouping, column, design, min, width, minimum, media, query, columns
ticketid: 1538994
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.1.425 version</td>
 </tr>
</table> 

## Description
When I utilize the approach suggested in the [Grid Responsive Columns Demo](https://demos.telerik.com/{{ site.platform }}/grid/responsive-columns) I lose the ability to group the Grid's columns. How can I solve this?

## Solution

The ability to group the Grid is lost when the **responsive-column-template** is in use because the original columns of the Grid are no longer displayed. To workaround this you can define a MultiSelect Component over the Grid and subscribe to its [`Change Еvent`](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui.fluent/multiselecteventbuilder#changesystemstring) to group the Grid by its selected values.

1. Bind the MultiSelect to a **List** of the Grid columns' names.

    ```HtmlHelper
    @(Html.Kendo().MultiSelect()
            .Name("group")
            .Placeholder("Group by...")
            .BindTo(new List<string>() {
                "ContactName",
                "ContactTitle",
                "CompanyName",
                "Country"
            })
            .Events(e => e.Change("onChange"))
    )
    ```

2. In the **onChange** handler create an object from the selected [`values`](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/methods/value) of the MultiSelect and push that into an array. Then pass that array to dataSource's [`group method`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/group).

    ```JavaScript
        function onChange(e){
            var grid = $("#grid").getKendoGrid(); 
            var groupedBy = [];
            var values = e.sender.value();
            if(values.length>0){
                values.forEach(value=>{
                    groupedBy.push({field:value})
                })
            }
            grid.dataSource.group(groupedBy)
        }
    ```

3. Subscribe to the `resize` event of the Web API's Window to show the MultiSelect when the Grid's columns collapse and also ensure that columns that have been grouped are persisted in the new responsive layout.

    ```JavaScript
        $(window).on("resize",function(e){
            if(parseInt($(".k-body").css("width"),10)<450){
                $(".k-grouping-header").css("display","none");
                $(".group").css("display","block");
                var grid = $("#grid").getKendoGrid(); 
                var ms = $("#group").getKendoMultiSelect();
                var groups = grid.dataSource.group();
                if(groups.length>0){
                    groups.forEach(group=>{
                        ms.value([ms.value(),group.field])
                    })
                }
            }else{
                $(".k-grouping-header").css("display","block");
                $(".group").css("display","none");
            }
        })
    ```

To explore the complete behavior, see the Telerik REPL example on how to [enable Grid Grouping when Responsive Columns are employed](https://netcorerepl.telerik.com/cllvvsvf38K7h8Bt48).

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
{% if site.core %}
* [Get Started with the Telerik REPL for ASP.NET Core](https://www.telerik.com/aspnet-core-ui/repl)
{% endif %}
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)