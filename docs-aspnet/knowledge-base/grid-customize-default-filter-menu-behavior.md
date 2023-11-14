---
title: Persist Filter Menu Value When a Grid Column is Filtered by a Single Value
description: How can I customize the default behavior of the Grid Filter Menu and persist the second input value when a column is filtered only by the second input?
type: how-to
page_title: Persist the Second Value in the Filter Menu When a Grid Column is Filtered Only by the Second Input
slug: grid-customize-default-filter-menu-behavior
tags: grid, filter, menu, value, persist, input
ticketid: 1579319
res_type: kb
component: grid
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2022.2.802</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>{{ site.product }} Grid</td>
		</tr>
	</tbody>
</table>

## Description

The default Grid Filter Menu has two input fields. At this stage, when a specified Grid column is filtered only by the second input, after reopening the Filter Menu, the filtered value is bound to the first input field. The second field remains empty.

How can I customize the default behavior of the Filter Menu and persist the single filtered value in the second input field?

## Solution

1. Handle the [`Filter`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideventbuilder#filtersystemstring) event of the Grid and store the number of the applied column filters in a global JavaScript variable `filteredValues`.
1. Handle the [`FilterMenuOpen`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideventbuilder#filtermenuopensystemstring) event of the grid. get references of both input fields, subscribe to their `Change` events, and store their values in global variables (`dtp1Value` and `dtp2Value`).
1. Check if the Grid is filtered by the second input field and update its value by using the global variable `dtp2Value`.


```Index.cshtml
    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}");
        })
        .Events(ev => ev.Filter("onFilter").FilterMenuOpen("onFilterMenuOpen"))
        //Other configuration
    )
```
```JavaScript
    <script>
        var filteredValues = 0;
        var dtp1Value;
        var dtp2Value;

        function onFilter(e) {
            //Check if the "OrderDate" column is filtered
            if (e.field == "OrderDate") { 
                if (e.filter != null) {
                    //Store the number of the applied column filters in a variable
                    filteredValues = e.filter.filters.length; 
                } else {
                    //Reset the variables
                    filteredValues = [];
                    dtp1Value = "";
                    dtp2Value = "";
                }
            }
        }

        function onFilterMenuOpen(e) {
            if (e.field == "OrderDate") {
                //Get a reference of the first DatePicker field
                var dtpWidget1 = $("input[title='Value']").data("kendoDatePicker");
                //Get a reference of the second DatePicker field
                var dtpWidget2 = $("input[title='Additional value']").data("kendoDatePicker");
                //Get a reference of the second DropDownList that holds the second filter operator
                var ddlWidget2 = $("select[title='Additional operator']").data("kendoDropDownList");

                //Handle the "change" event of the first DatePicker
                dtpWidget1.bind("change", function () {
                    if (this.value()) {
                        //Store its value
                        dtp1Value = this.value(); 
                    } else dtp1Value = ""; //Reset the variable
                });

                //Handle the "change" event of the second DatePicker
                dtpWidget2.bind("change", function () {
                    if (this.value()) {
                        //Store its value
                        dtp2Value = this.value(); 
                    } else dtp2Value = ""; //Reset the variable
                });

                //Check if the column "OrderDate" is filtered only by the second Filter Menu field
                if (filteredValues == 1 && dtp2Value && !dtp1Value) {
                    //Set respective value in the second DatePicker
                    dtpWidget2.value(new Date(dtp2Value)); 
                    dtpWidget2.trigger("change");

                    //Persist the second filter operator value
                    ddlWidget2.value(e.sender.dataSource.filter().filters[0].operator); 
                    ddlWidget2.trigger("change");

                    //Reset the value of the first DatePicker
                    dtpWidget1.value("");
                    dtpWidget1.trigger("change");
                }
            }
        }
    </script>
```

For a runnable example based on the code above, refer to [this REPL](https://netcorerepl.telerik.com/wckjQOGb25n0E3GK50).

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

* [Telerik REPL: Persist Filter Menu Value When a Grid Column is Filtered by a Single Value](https://netcorerepl.telerik.com/wckjQOGb25n0E3GK50)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
