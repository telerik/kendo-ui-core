---
title: Add a Background to the Kendo UI Diagram
description: "Add a background to the Diagram widget."
type: how-to
page_title: Add a Background to the Kendo UI Diagram - Kendo UI Diagram for jQuery
slug: diagram-background
tags: diagram, color, image, background, gradient
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® Diagram for jQuery</td>
		</tr>
	</tbody>
</table>

## Description

How can I add a background color or image to the Kendo UI Diagram?

## Solution

Use CSS and apply a background to the diagram `div` element.

```html
  <style>
    #diagram {
    /* background: center no-repeat url('../content/shared/styles/world-map.png'); */ /* Apply background image */
    /* background: yellow; */ /* Apply background color */
       background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(139,148,45,1) 35%, rgba(0,212,255,1) 100%); /* Apply background gradient */
    }
  </style>
```

```dojo
<base href="https://demos.telerik.com/kendo-ui/diagram/index">

<style>
    #diagram {
        /* background: center no-repeat url('../content/shared/styles/world-map.png'); */
        /* Apply background image */
        /* background: yellow; */
        /* Apply background color */
        background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(139, 148, 45, 1) 35%, rgba(0, 212, 255, 1) 100%);
        /* Apply background image */
    }
</style>

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
            source: "../content/dataviz/diagram/people/" + dataItem.image,
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
            }
        });

        var diagram = $("#diagram").getKendoDiagram();
        diagram.bringIntoView(diagram.shapes);
    }

    $(document).ready(createDiagram);
</script>
```
