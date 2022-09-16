---
title: Display a LinearGauge in a Popover When Click on a Grid Cell
description: How can I display a Popover with a LinearGauge that renders a Grid cell value on click?
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
			<td>Grid for Progress® Telerik® {{ site.product_short }}</td>
		</tr>
	</tbody>
</table>

## Description

How can I display a Popover with a LinearGauge that renders a Grid cell value when the user clicks on it?

## Solution

1. Add a custom class to the Grid columns that should display the LinearGauge when a specified cell is clicked.

    ```
        columns.Bound(p => p.Freight).HtmlAttributes(new { @class = "lGaugeCol"});
    ```

1. Create a [Popover component](https://demos.telerik.com/{{ site.platform }}/popover/index) and handle its [Show](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/PopoverEventBuilder#showsystemstring) and [Hide](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/PopoverEventBuilder#hidesystemstring) events.

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

1. Initialize the [LinearGauge](https://demos.telerik.com/{{ site.platform }}/linear-gauge) in the Show event handler of the Popover.

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

1. Destroy the LinearGauge in the Hide event handler of the Popover.

    ```
        function onHide(e) {
            var gauge = $("#gauge").data("kendoLinearGauge");
            gauge.destroy();
        }
    ```

For the complete implementation of the suggested approach, refer to [this REPL example](https://netcorerepl.telerik.com/mwkVvyPp311T2IIJ53).


## See Also
 * [Popover Overview](https://docs.telerik.com/{{ site.platform }}/html-helpers/layout/popover/overview)
 * [LinearGauge Overview](https://docs.telerik.com/{{ site.platform }}/html-helpers/gauges/lineargauge/overview)
 * [LinearGauge Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/lineargauge)
