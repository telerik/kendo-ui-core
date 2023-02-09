---
title: Show a Tooltip for Diagram Shapes
page_title: Show a Tooltip for Diagram Shapes
description: "Learn how to use the drawing tooltip to show a tooltip for the Kendo UI Diagram shapes."
slug: howto_shapestooltip_diagram
previous_url: /controls/diagrams-and-maps/diagram/how-to/drawing-tooltip
tags: kendo, jquery, diagram, show, tooltip, for, shapes
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

How can I implement a tooltip for the shapes of the Kendo UI for jQuery Diagram?

## Solution

The following example demonstrates how to use the [drawing tooltip options](/api/javascript/drawing/tooltip-options) to show a tooltip for the shapes.

> The tooltip options are available as of the Kendo UI Q2 2016 (2016.2.x) release.

```dojo

    <div id="diagram"></div>
    <script>
      var data = [{
        firstName: "Antonio",
        lastName: "Moreno",
        image: "antonio.jpg",
        title: "Team Lead",
        colorScheme: "#1696d3",
        items: [{
          firstName: "Elizabeth",
          image: "elizabeth.jpg",
          lastName: "Brown",
          title: "Design Lead",
          colorScheme: "#ef6944",
          items: [{
            firstName: "Ann",
            lastName: "Devon",
            image: "ann.jpg",
            title: "UI Designer",
            colorScheme: "#ef6944"
          }]
        }, {
          firstName: "Diego",
          lastName: "Roel",
          image: "diego.jpg",
          title: "QA Engineer",
          colorScheme: "#ee587b",
          items: [{
            firstName: "Fran",
            lastName: "Wilson",
            image: "fran.jpg",
            title: "QA Intern",
            colorScheme: "#ee587b"
          }]
        }, {
          firstName: "Felipe",
          lastName: "Izquiedro",
          image: "felipe.jpg",
          title: "Senior Developer",
          colorScheme: "#75be16",
          items: [{
            firstName: "Daniel",
            lastName: "Tonini",
            image: "daniel.jpg",
            title: "Developer",
            colorScheme: "#75be16"
          }]
        }]
      }];

      function visualTemplate(options) {
        var dataviz = kendo.dataviz;
        var g = new dataviz.diagram.Group();
        var dataItem = options.dataItem;

        g.drawingElement.options.tooltip = {
          content: dataItem.title,
          shared: true
        };

        g.append(new dataviz.diagram.Rectangle({
          width: 210,
          height: 75,
          stroke: {
            width: 0
          },
          fill: {
            gradient: {
              type: "linear",
              stops: [{
                color: dataItem.colorScheme,
                offset: 0,
                opacity: 0.5
              }, {
                color: dataItem.colorScheme,
                offset: 1,
                opacity: 1
              }]
            }
          }
        }));

        g.append(new dataviz.diagram.TextBlock({
          text: dataItem.firstName + " " + dataItem.lastName,
          x: 85,
          y: 30,
          fill: "#fff"
        }));

        g.append(new dataviz.diagram.Image({
          source: "../content/dataviz/diagram/people/" + dataItem.image,
          x: 3,
          y: 3,
          width: 68,
          height: 68
        }));

        return g;
      }

      $("#diagram").kendoDiagram({
        dataSource: new kendo.data.HierarchicalDataSource({
          data: data,
          schema: {
            model: {
              children: "items"
            }
          }
        }),
        layout: {
          type: "layered"
        },
        shapeDefaults: {
          visual: visualTemplate
        },
        connectionDefaults: {
          stroke: {
            color: "#979797",
            width: 2
          }
        }
      });

      var diagram = $("#diagram").getKendoDiagram();
      diagram.bringIntoView(diagram.shapes);     
    </script>

```

## See Also

* [Basic Usage of the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/index)
* [JavaScript API Reference of the Diagram](/api/javascript/dataviz/ui/diagram)
* [How to Implement Local Data Editing]({% slug howto_editlocaladata_diagram %})
* [How to Render External Content in Shapes]({% slug howto_renderexternalcontent_inshapes_diagram %})
* [How to Wrap Text]({% slug howto_wraptext_diagram %})
