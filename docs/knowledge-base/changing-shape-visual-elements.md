---
title: Change Diagram Shape Visual Elements Dynamically
page_title: Change the Shape Visual Elements of the Diagram Dynamically
description: "Learn how to find a particular element from the shape visual and dynamically change it in a Kendo UI Diagram."
slug: howto_changeshapevisualelements_dynamically_diagram
previous_url: /controls/diagrams-and-maps/diagram/how-to/changing-shape-visual-elements
tags: kendo, jquery, diagram, change, shape visual, elements, dynamically
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

How can I find a particular element from the shape visual in the Kendo UI for jQuery Diagram and dynamically change it?

## Solution

The following example demonstrates how to achieve the desired scenario, which means that you will have to change the rectangle fill and stroke options on `hover`.

```dojo

    <div id="diagram"></div>
    <script>

      function createDiagram() {
        $("#diagram").kendoDiagram({
          mouseEnter: function (e) {
            if (e.item instanceof kendo.dataviz.diagram.Shape) {
              e.item.shapeVisual.children[0].redraw({
                fill: "black",
                stroke: {
                  width: 3,
                  color: "red"
                }
              });
            }
          },
          mouseLeave: function (e) {
            if (e.item instanceof kendo.dataviz.diagram.Shape) {
              e.item.shapeVisual.children[0].redraw({
                stroke: {
                  width: 0,
                  color: "none"
                },
                fill: e.item.dataItem.colorScheme,
              });
            }
          },
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
      }

      $(document).ready(createDiagram);

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

        g.append(new dataviz.diagram.Rectangle({
          width: 210,
          height: 75,
          stroke: {
            width: 0
          },
          fill: dataItem.colorScheme
        }));

        g.append(new dataviz.diagram.TextBlock({
          text: dataItem.firstName + " " + dataItem.lastName,
          x: 85,
          y: 20,
          fill: "#fff"
        }));

        g.append(new dataviz.diagram.TextBlock({
          text: dataItem.title,
          x: 85,
          y: 40,
          fill: "#fff"
        }));

        g.append(new dataviz.diagram.Image({
          source: "https://demos.telerik.com/kendo-ui/content/dataviz/diagram/people/" + dataItem.image,
          x: 3,
          y: 3,
          width: 68,
          height: 68
        }));

        return g;
      }

    </script>

```

## See Also

* [Basic Usage of the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/index)
* [JavaScript API Reference of the Diagram](/api/javascript/dataviz/ui/diagram)
* [How to Implement Local Data Editing]({% slug howto_editlocaladata_diagram %})
* [How to Use Scrollbars]({% slug howto_usescrollbar_diagram %})
* [How to Wrap Text]({% slug howto_wraptext_diagram %})
