---
title: Dynamically changing shape visual elements
page_title: Dynamically changing shape visual elements
description: Dynamically changing shape visual elements
---

# Dynamically changing shape visual elements

This example demonstrates how to find particular element from the shape visual and dynamically change it.

#### Example - change rectangle fill and stroke options on hover

```html

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
          source: "http://demos.telerik.com/kendo-ui/content/dataviz/diagram/people/" + dataItem.image,
          x: 3,
          y: 3,
          width: 68,
          height: 68
        }));

        return g;
      }

    </script>

```
