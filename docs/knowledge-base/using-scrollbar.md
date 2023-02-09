---
title: Use Scrollbars in the Diagram
page_title: Use Scrollbars in the Diagram
description: "Learn how to use a scrollbar for a Kendo UI Diagram widget."
slug: howto_usescrollbar_diagram
previous_url: /controls/diagrams-and-maps/diagram/how-to/using-scrollbar
tags: kendo, jquery, diagram, add, implement, use, scrollbars
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

How can I implement scrollbars in the Kendo UI for jQuery Diagram?

## Solution

The following example demonstrates how to use a scrollbar as a Diagram element.

```dojo

    <div style="overflow:auto; width: 1000px; height: 300px;">
      <div id="diagram"></div>
    </div>

    <script>
      $("#diagram").kendoDiagram({
        dataSource: new kendo.data.HierarchicalDataSource({
          data: diagramNodes()
        }),
        layout: {
          type: "tree",
          horizontalSeparation: 30,
          verticalSeparation: 20
        },
        shapeDefaults: {
          width: 40,
          height: 40
        },
        editable: false,
        pannable: false,
        zoomRate: 0,
        dataBound: function () {
          var bbox = this.boundingBox();
          this.wrapper.width(bbox.width + bbox.x + 50);
          this.wrapper.height(bbox.height + bbox.y + 50);
          this.resize();
        }
      });

      function diagramNodes() {
        var root = { name: "0", items: [] };
        addNodes(root, [3, 3, 3, 3]);
        return [root];
      }

      function addNodes(root, levels) {
        if (levels.length > 0) {
          for (var i = 0; i < levels[0]; i++) {
            var node = { name: "0", items: [] };
            root.items.push(node);

            addNodes(node, levels.slice(1));
          }
        }
      }
    </script>

```

## See Also

* [Basic Usage of the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/index)
* [JavaScript API Reference of the Diagram](/api/javascript/dataviz/ui/diagram)
* [How to Implement Local Data Editing]({% slug howto_editlocaladata_diagram %})
* [How to Render External Content in Shapes]({% slug howto_renderexternalcontent_inshapes_diagram %})
* [How to Wrap Text]({% slug howto_wraptext_diagram %})
