---
title: Prevent Zoom in Diagram
description: An example on how to prevent the user from zooming in Diagram.
type: how-to
page_title: Prevent Zoom in Diagram | Kendo UI Diagram for jQuery
slug: diagram-prevent-zoom
tags: diagram, prevent, zoom, zooming, disallow, stop
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
 <tr>
  <td>Created with version</td>
  <td>2020.2.617</td>
 </tr>
</table>


## Description

I am trying to disable zoom on a diagram I am building. I set the `zoom` property to 0 and it works. Unfortunately, it crashes the PDF export with the following error: 

`Cannot output NAN to PDF`

## Solution

The issue seems to be with values that are equal to or less than zero. I logged a [public issue](https://github.com/telerik/kendo-ui-core/issues/6142) so we can fix this internaly. Menawhile, you can use the [`zoomRate`](/api/javascript/dataviz/ui/diagram/configuration/zoomrate) property set to 0 instead.

```dojo
    <button id="exportBtn">Export</button>
    <div id="diagram"></div>
    <script>
        $("#exportBtn").on("click", function(){
            var diagram = $("#diagram").getKendoDiagram();
            diagram.exportPDF({
              paperSize: "A4",
              landscape: true
            }).done(function(data) {
              kendo.saveAs({
                dataURI: data,
                fileName: "diagram.pdf"
              });
            });
        });

        $("#diagram").kendoDiagram({
          dataSource: {
            data: [{ "items": [{ items: [{}] }] }],
            schema: { model: { children: "items" } }
          },
          zoomRate:0,
          layout: {
            type: "tree"
          }
        });
    </script>
```
