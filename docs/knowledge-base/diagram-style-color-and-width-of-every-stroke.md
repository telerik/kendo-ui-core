---
title: Style the strokes in Diagram
description: An example on how to change the color and the width for every stroke in Diagram.
type: how-to
page_title: Style the strokes in Diagram | Kendo UI Diagram for jQuery
slug: diagram-custom-style-strokes
tags: diagram, editing, stroke, style
ticketid: 1498173
res_type: kb
component: diagram
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Diagram</td>
 </tr>
</table>


## Description

How can I design the color and width of every stroke in Kendo UI Diagram?

## Solution

1. Add an additional property to the data object in connectionDataSource.
2. Use the [change event](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/ui/diagram/events/change) of the Diagram. 
3. Loop through all strokes and set their color and width using the [redraw](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/diagram/shape/methods/redraw) method.


The following example demonstrates how to change the color and width of every stroke in Diagram:

```dojo
        <div id="diagram"></div>
	<script>
		$("#diagram").kendoDiagram({
			dataSource: [
			  { id: "one", name: "One" },
			  { id: "two", name: "Two" },
			  { id: "five", name: "Five" },
			],
			connectionsDataSource: [
			  { from: "one", to: "two", label: "plus one", color: "1" },
			  { from: "one", to: "five", label: "plus three", color: "2" }
			],
			change: function (e) {

				var connColor;
        var connWidth;

				for (var idx = 0; idx < e.added.length; idx++) {
					if (e.added[idx] instanceof kendo.dataviz.diagram.Connection) {
						connColor = e.added[idx].dataItem.color == "1" ? "#ff0000" : "#00ff00"
            connWidth = e.added[idx].dataItem.color == "1" ? 5 : 15
						e.added[idx].redraw({
							stroke: {
								color: connColor,
                width: connWidth
							}
						})
					}
				}
			},
			layout: {
				type: "tree",
				subtype: "right"
			},
			shapeDefaults: {
				type: "circle",
				content: {
					template: "#= name #"
				},
				width: 70,
				height: 70,
				hover: {
					fill: "Orange"
				}
			},
			connectionDefaults: {
				stroke: {
					color: "#979797",
					width: 1
				},
				type: "polyline",
				startCap: "FilledCircle",
				endCap: "ArrowEnd",
				content: {
					template: "#= label#"
				}
			},

			autoBind: true
		});
	</script>
```
