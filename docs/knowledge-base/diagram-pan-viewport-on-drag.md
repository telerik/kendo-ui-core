---
title: Pan when dragging shapes in Diagram
description: An example on how to pan the viewport when dragging shapes in the Kendo UI Diagram.
type: how-to
page_title: Pan viewport when dragging past boundary | Kendo UI Diagram for jQuery
slug: diagram-pan-viewport-on-drag
tags: diagram, pan, shapes, auto, move, drag, dragging, view, viewport
ticketid: 1148503
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
  <td>Created with Version</td>
  <td>2017.3 1026</td>
 </tr>
</table>


## Description

I have a large diagram that I would like to pan the viewport when a user drags a shape onto/past a visible boundary. Do you have any ideas on how I might go about adding this feature to the diagram?

## Solution

1. Add a handler to the [`drag`](/api/javascript/dataviz/ui/diagram/events/drag) event
1. Use the current pan and add the new point dependent on the direction in which the dragging is taking place

  	```
      drag: function (e) {                  
            var selection = this.boundingBox(e.shapes);
            var mTLPoint = new kendo.dataviz.diagram.Point(selection.x, selection.y);
            var mBRPoint = new kendo.dataviz.diagram.Point((selection.x + selection.width, (selection.y + selection.height));
            var vTLPoint = this.modelToView(mTLPoint);
            var vBRPoint = this.modelToView(mBRPoint);
            var vVPPoint = this.modelToView(new kendo.dataviz.diagram.Point(this.viewport(.x, this.viewport().y));
            var vph = this.viewport().height;
            var vpw = this.viewport().width;
            var pan = this.pan();

            if (vTLPoint.y <= 0) {
                // Pan up
                this.pan(this.pan().plus(new kendo.dataviz.diagram.Point(0,  vTLPoint.y)));
            }

            if (vBRPoint.y >= vph) {
                // Pan down
                this.pan(pan.plus(new kendo.dataviz.diagram.Point(0, vBRPoint.y - vph)));
            }

            if (vTLPoint.x <= 0) {   
                // Pan left
                this.pan(this.pan().plus(new kendo.dataviz.diagram.Point(vTLPoint.x, 0)));
            }

            if (vBRPoint.x >= vpw) {
                // Pan right
                this.pan(this.pan().plus(new kendo.dataviz.diagram.Point(vBRPoint.x - vpw, 0)));
            }
        }
  	```

```dojo
    <div id="example">
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

        function createDiagram() {
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
                },
              drag: function (e) {
                  
                  var selection = this.boundingBox(e.shapes);
                  var mTLPoint = new kendo.dataviz.diagram.Point(selection.x, selection.y);
                  var mBRPoint = new kendo.dataviz.diagram.Point((selection.x + selection.width), (selection.y + selection.height));
                  var vTLPoint = this.modelToView(mTLPoint);
                  var vBRPoint = this.modelToView(mBRPoint);
                  var vVPPoint = this.modelToView(new kendo.dataviz.diagram.Point(this.viewport().x, this.viewport().y));
                  var vph = this.viewport().height;
                  var vpw = this.viewport().width;
                  var pan = this.pan();

                  if (vTLPoint.y <= 0) {
                      // Pan up
                      this.pan(this.pan().plus(new kendo.dataviz.diagram.Point(0,  vTLPoint.y)));
                  }

                  if (vBRPoint.y >= vph) {
                      // Pan down
                      this.pan(pan.plus(new kendo.dataviz.diagram.Point(0, vBRPoint.y - vph)));
                  }

                  if (vTLPoint.x <= 0) {   
                      // Pan left
                      this.pan(this.pan().plus(new kendo.dataviz.diagram.Point(vTLPoint.x, 0)));
                  }

                  if (vBRPoint.x >= vpw) {
                      // Pan right
                      this.pan(this.pan().plus(new kendo.dataviz.diagram.Point(vBRPoint.x - vpw, 0)));
                  }
              }
            });

            var diagram = $("#diagram").getKendoDiagram();
            diagram.bringIntoView(diagram.shapes);
        }

        $(document).ready(createDiagram);
    </script>
</div>
```
