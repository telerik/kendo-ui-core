---
title: Display a LinearGauge in a Popover When Clicking on a Grid Cell
description: How can I display a Popover with a LinearGauge that renders a Grid cell value on click? Find the solution in the Knowledge Base section of the {{ site.product }} documentation.
type: how-to
page_title: Display a LinearGauge in a Popover When Click on a Grid Cell
slug: grid-linear-gauge-in-popover
tags: grid, linear, gauge, popover
res_type: kb
ticketid: 1571483
component: grid, linearGauge, popover
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2022.2.621</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Progress® Telerik® {{ site.product_short }} Grid</td>
		</tr>
	</tbody>
</table>

## Description

How can I display a [Popover](https://docs.telerik.com/{{ site.platform }}/html-helpers/layout/popover/overview) with a [LinearGauge](https://docs.telerik.com/{{ site.platform }}/html-helpers/gauges/lineargauge/overview) that renders a Grid cell value when the user clicks on it?

## Solution

1. Add a custom class to the Grid columns that will display the LinearGauge when a specified cell is clicked.

    ```
        columns.Bound(p => p.Freight).HtmlAttributes(new { @class = "lGaugeCol"});
    ```

1. Create a [Popover component](https://demos.telerik.com/{{ site.platform }}/popover/index) and handle its [`Show`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/popovereventbuilder#showsystemstring) and [`Hide`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/popovereventbuilder#hidesystemstring) events.

    ```
        @(Html.Kendo().Popover()
            .For("#grid") //Specify the Name() of the Grid.
            .Filter("tr td.lGaugeCol") //Filter by the table data elements with the custom class.
            .Animation(an => an.Open(op => op.Duration(0)).Close(cl => cl.Duration(0)))
            .ShowOn(PopoverShowOn.Click)
            .HeaderHandler("getHeader")
            .BodyHandler("getBody")
            .Width(300)
            .Events(ev=>ev.Show("onShow").Hide("onHide")) //Handle the Show/Hide events of the Popover.
        )

    ```

1. Pass the header and the body of the Popover by using JavaScript functions.

    ```
        <script>
            var clickedDataItem;
            function getHeader(e){
                var grid = $("#grid").getKendoGrid(); //Get a reference of the Grid.
                var dataItem = grid.dataItem($(event.target).closest("tr")); //Select the dataItem of the Grid row.
                clickedDataItem = dataItem; //Store the current dataItem.
                return "Order " + dataItem.OrderID + " details"; //Return the text of the Popover header.
            }

            function getBody(e){
                var html = "<div id='gauge'></div>"; //Create an element to initialize the LinerGauge widget.
                return html;      
            }
        </script>

    ```

1. Initialize the [LinearGauge](https://demos.telerik.com/{{ site.platform }}/linear-gauge) in the `Show` event handler of the Popover.

    ```
        function onShow(e){
            createGauge(clickedDataItem.Freight); //Pass the value of the Model property to the createGauge() function.
        }

        function createGauge(gaugeValue){
            $("#gauge").kendoLinearGauge({ //Initialize the LinearGauge widget.
                scale:{
                    vertical: false,
                    min:0,
                    max:400
                },
                pointer: [{
                    value: gaugeValue //Set the value based on the current dataItem.
                }]
            });
        }

    ```

1. Destroy the LinearGauge in the `Hide` event handler of the Popover.

    ```
        function onHide(e) {
            var gauge = $("#gauge").data("kendoLinearGauge");
            gauge.destroy();
        }
    ```

For the complete implementation of the suggested approach, refer to [this REPL example](https://netcorerepl.telerik.com/mwkVvyPp311T2IIJ53).

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

* [Telerik REPL: Display a LinearGauge in a Popover When Clicking a Grid Cell](https://netcorerepl.telerik.com/mwkVvyPp311T2IIJ53)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
