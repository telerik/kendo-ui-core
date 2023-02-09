---
title: Wrap Text in the Diagram
page_title: Wrap Text in the Diagram
description: "Learn how to use the layout element to wrap text in the Kendo UI Diagram widget."
slug: howto_wraptext_diagram
previous_url: /controls/diagrams-and-maps/diagram/how-to/text-wrapping
tags: kendo, jquery, diagram, wrap, text
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

How can I make long chunks of text fit in a shape of the Kendo UI for jQuery Diagram?

## Solution

The following example demonstrates how to use the [`Layout`](/api/javascript/dataviz/diagram/layout) element to make long chunks of text fit in a shape.

> The `Layout` element is available as of the Kendo UI Q3 2015 (2015.3.x) release.

```dojo

    <div id="diagram"></div>

    <script>
      $("#diagram").kendoDiagram({
        dataSource: new kendo.data.HierarchicalDataSource({
          data: [{
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer felis libero, lobortis ac rutrum quis, varius a velit. Donec lacus erat, cursus sed porta quis, adipiscing et ligula. Duis volutpat, sem pharetra accumsan pharetra, mi ligula cursus felis, ac aliquet leo diam eget risus. Integer facilisis, justo cursus venenatis vehicula, massa nisl tempor sem, in ullamcorper neque mauris in orci."
          }]
        }),
        shapeDefaults: {
          visual: visualTemplate
        }
      });

      function visualTemplate(options) {
        var diagram = kendo.dataviz.diagram;
        var dataItem = options.dataItem;
        var group = new diagram.Group();

        group.append(new diagram.Rectangle({
          width: 300,
          height: 200,
          stroke: {
            width: 0
          },
          fill: "#e8eff7"
        }));

        group.append(new diagram.Rectangle({
          width: 8,
          height: 200,
          fill: "#3399cc",
          stroke: {
            width: 0
          }
        }));

        var layout = new diagram.Layout(new diagram.Rect(15, 0, 280, 200), {
          alignContent: "center",
          spacing: 4
        });

        group.append(layout);

        var texts = dataItem.text.split(" ");
        for (var i = 0; i < texts.length; i++) {
          layout.append(new diagram.TextBlock({
            text: texts[i]
          }));
        }
        layout.reflow();

        return group;
      }
    </script>

```

## See Also

* [Basic Usage of the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/index)
* [JavaScript API Reference of the Diagram](/api/javascript/dataviz/ui/diagram)
* [How to Implement Local Data Editing]({% slug howto_editlocaladata_diagram %})
* [How to Show Shapes Tooltip]({% slug howto_shapestooltip_diagram %})
* [How to Use Scrollbars]({% slug howto_usescrollbar_diagram %})
