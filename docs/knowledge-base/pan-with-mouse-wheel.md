---
title: Pan the Diagram with the Mouse Wheel
page_title: Pan the Diagram with the Mouse Wheel
description: "Learn how to pan the Kendo UI Diagram with the mouse wheel."
slug: howto_pan_with_mouse_wheel
previous_url: /controls/diagrams-and-maps/diagram/how-to/pan-with-mouse-wheel
tags: kendo, jquery, diagram, pan, with, mouse, wheel
component: diagram
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Diagram for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I pan the Kendo UI Diagram when scrolling with the mouse?

## Solution

To achieve this behavior:

1. Handle the [`zoomStart` event](/api/javascript/dataviz/ui/diagram/events/zoomstart) of the Kendo UI Diagram.
2. Get the delta from the arguments, that is `e.meta.delta`.
3. Pan the Diagram with the new coordinates by using the [`pan` method](/api/javascript/dataviz/ui/diagram/methods/pan).

```dojo

<select id="panDirection">
  <option value="x">Pan Horizontally</option>
  <option value="y">Pan Vertically</option>
</select>

<div id="diagram"></div>

<script>  
var Point = kendo.dataviz.diagram.Point;

$("#diagram").kendoDiagram({
   shapes:[ { id:"1", x: 100, y: 100 },
     		   	{ id:"2", x: 300, y: 100 } ],
   connections:[ { from: "1", to: "2" }
   ],
    zoomStart: function(e){
      var zoomDirection = $("#panDirection").val();
      var diagram = e.sender,
          panPoint = diagram.pan();
      panPoint[zoomDirection] = panPoint[zoomDirection] + e.meta.delta;
      diagram.pan(panPoint);
      e.preventDefault();
  },
});
</script>

```

## See Also

* [Basic Usage of the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/index)
* [JavaScript API Reference of the Diagram](/api/javascript/dataviz/ui/diagram)
* [How to Implement Local Data Editing]({% slug howto_editlocaladata_diagram %})
* [How to Render External Content in Shapes]({% slug howto_renderexternalcontent_inshapes_diagram %})
* [How to Wrap Text]({% slug howto_wraptext_diagram %})
