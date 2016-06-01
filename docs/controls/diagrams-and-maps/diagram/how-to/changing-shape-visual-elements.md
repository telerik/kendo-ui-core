---
title: Change Shape Visual Elements Dynamically
page_title: Change Shape Visual Elements Dynamically | Kendo UI Diagram
description: "Learn how to find a particular element from the shape visual and dynamically change it in a Kendo UI Diagram."
slug: howto_changeshapevisualelements_dynamically_diagram
---

# Change Shape Visual Elements Dynamically

The example below demonstrates how to find a particular element from the shape visual and dynamically change it in a Kendo UI Diagram widget, i.e. change the rectangle fill and stroke options on `hover`.

###### Example

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

## See Also

Other articles on Kendo UI Diagram:

* [JavaScript API Reference](/api/javascript/dataviz/ui/diagram)
* [How to Drag and Drop on Shapes]({% slug howto_draganddrop_onshapes_diagram %})
* [How to Implement Local Data Editing]({% slug howto_editlocaladata_diagram %})
* [How to Render External Content in Shapes]({% slug howto_renderexternalcontent_inshapes_diagram %})
* [How to Show Shapes Tooltip]({% slug howto_shapestooltip_diagram %})
* [How to Use Scrollbars]({% slug howto_usescrollbar_diagram %})
* [How to Wrap Text]({% slug howto_wraptext_diagram %})
