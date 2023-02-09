---
title: Adjust the Path Origin of the Diagram
page_title: Adjust the Path Origin of the Diagram
description: "Learn how to adjust a path or the origin of an element when using a custom visual in the Kendo UI Diagram."
slug: howto_adjustpathorigin_diagram
previous_url: /controls/diagrams-and-maps/diagram/how-to/adjust-path-origin
tags: kendo, jquery, diagram, adjust, path, origin
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

How can I adjust the position of any path at the origin of the Kendo UI for jQuery Diagram?

## Solution

The following example demonstrates how to position any path at the origin of the Diagram.

```dojo

    <div id="diagram"></div>

    <script>
      var diagram = $("#diagram").kendoDiagram({}).getKendoDiagram();

      diagram.addShape({
        visual: function() {
          var group = new kendo.dataviz.diagram.Group();
          var path = new kendo.dataviz.diagram.Path({
            data: "M100,100 L 200,200 100,300 z"
          });
          group.append(path);

          var bbox = group.drawingElement.bbox();

          if (bbox.origin.x !== 0 || bbox.origin.y !== 0) {
            group.position(-bbox.origin.x, -bbox.origin.y);
          }
          return group;
        }
      });
    </script>

```

## See Also

* [Basic Usage of the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/index)
* [JavaScript API Reference of the Diagram](/api/javascript/dataviz/ui/diagram)
* [How to Implement Local Data Editing]({% slug howto_editlocaladata_diagram %})
* [How to Render External Content in Shapes]({% slug howto_renderexternalcontent_inshapes_diagram %})
* [How to Wrap Text]({% slug howto_wraptext_diagram %})
