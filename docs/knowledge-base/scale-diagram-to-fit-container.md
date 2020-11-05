---
title: Scale Diagram to Fit Container upon Resizing
description: An example on how to scale Kendo UI Diagram to fit its container upon resizing
type: how-to
page_title: Scale Diagram to Fit its Container upon Resizing | Kendo UI Diagram for jQuery
slug: scale-diagram-to-fit-container-upon-resizing
tags: diagram, scale, resize
ticketid: 1492478
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Diagram</td>
	</tr>
</table>


## Description

How can I scale Kendo UI Diagram to fit its container upon resizing?

## Solution

Create a method to dynamically calculate the Diagram viewport dimensions and scale the Diagram accordingly. Use the [`zoom()`](/api/javascript/dataviz/ui/diagram/methods/zoom) method of the Diagram.

```dojo
<div class="diagram-wrapper">
      <div id="diagram"></div>
</div>

    <script>
      $("#diagram").kendoDiagram({
        shapes:[
          {
            id:"1",
            content:{
              text: "State 1"
            },
            x: 20,
            y: 20
          },
          {
            id:"2",
            content: {
              text: "State 2"
            },
            x: 650,
            y: 20
          }
        ],
        connections:[
          {
            from: "1",
            to: "2"
          }
        ]
      });

      function ResizeDiagram() {
        var diagram = $("#diagram").data("kendoDiagram"); //get instance of the Diagram
        var boundingbox = diagram.boundingBox();
        var viewport = diagram.viewport();

        var vpW = viewport.width; //get Diagram viewport width
        var vpH = viewport.height; //get Diagram viewport height
        var bbW = boundingbox.width; //get Diagram boundingbox width
        var bbH = boundingbox.height; //get Diagram boundingbox height

        var ratioW = vpW / bbW;
        var ratioH = vpH / bbH;
        
        //zoom Diagram based on width ratio and height ratio
        if (ratioW < ratioH) {
          diagram.zoom(ratioW * .95);
        }
        else {
          diagram.zoom(ratioH * .95);
        }
      }

      $(window).on("resize", function () {
        ResizeDiagram();
      });
    </script>
```
## See Also

* [Diagram Overview](https://docs.telerik.com/kendo-ui/controls/diagrams-and-maps/diagram/overview)
* [Persist Shape Properties](https://docs.telerik.com/kendo-ui/controls/diagrams-and-maps/diagram/how-to/persist-shape-properties)
* [Diagram Layout](https://docs.telerik.com/kendo-ui/controls/diagrams-and-maps/diagram/layout)
