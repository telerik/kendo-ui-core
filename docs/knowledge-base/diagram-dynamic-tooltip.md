---
title: Dynamic Tooltip in Diagram
description: An example on how to conditionally show a tooltip over shapes.
type: how-to
page_title: Custom Shape Tooltip | Kendo UI Diagram for jQuery
slug: diagram-dynamic-tooltip
tags: diagram, tooltip, shapes, custom, background, conditional, dynamic, show
ticketid: 1433776
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
  <td>2019.3.917</td>
 </tr>
</table>


## Description

I would like to show a tooltip for the shapes of the diagram. 

1. How to set the backgroundcolor of tooltip to match the shape color? 
1. Can I customize the tooltip to be used by shapes dynamically? 

## Solution

1.  You can assign the tooltip color dynamically via the content of the tooltip

  	```
         g.drawingElement.options.tooltip = {
            content: "<span style='background:" + dataItem.colorScheme + "; float:left;width:100%'>" + dataItem.title + "</span>",
            shared: true
        };
  	```

1. To show the tooltip on condition, include it in the shape visual function

  	```
        if(dataItem.hasChildren){ // add to shapes that meet the condition only
            g.drawingElement.options.tooltip = {
                content: "<span style='background:" + dataItem.colorScheme + "; float:left;width:100%'>" + dataItem.    title + "</span>",
                shared: true
            };
        }
  	```

The following example demonstrates how to show a tooltip conditionally with a dynamic background color that matches the shape color.

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
        
        if(dataItem.hasChildren){
          g.drawingElement.options.tooltip = {
            content: "<span style='background:" + dataItem.colorScheme + "; float:left;width:100%'>" + dataItem.title + "</span>",
            shared: true
          };
        }

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
          source: "https://demos.telerik.com/kendo-ui/content/dataviz/diagram/people/" + dataItem.image,
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
