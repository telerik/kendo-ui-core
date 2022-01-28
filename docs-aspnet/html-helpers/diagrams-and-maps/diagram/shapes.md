---
title: Shapes
page_title: Shapes
description: "Get started with the Telerik UI Diagram for {{ site.framework }} and use its shape configuration options."
slug: htmlhelpers_diagram_aspnetcore_shapes_connections
position: 5
---

# Shapes

The Diagram enables you to add various shapes by using its [API reference on shapes](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/diagram/shape).

## Getting Started

To add a rectangular shape to the Diagram, call the `diagram.addShape();` method which renders a rectangle in the upper-left corner of the Diagram surface. To change the initial position, call the `addShape()` method with an additional `Point` parameter.

    var Point = kendo.dataviz.diagram.Point;
    diagram.addShape(new Point(100,220));

To specify additional properties for the Diagram, use the `options` parameter. The following example demonstrates how to set the background color of the shape.

    diagram.addShape(new Point(100,220), { background: "red" });

The `addShape()` method also accepts a `shape` instance and enables you to add a new shape.

    var Point = kendo.dataviz.diagram.Point;
    var shapeInstance = new kendo.diagram.Shape();
    var shape = diagram.addShape(shape);
    shape.position(new Point(100,220));

## Adding Connections

To connect the shapes, use the `connect()` method.

    var Point = kendo.dataviz.diagram.Point;
    var shape1 = diagram.addShape(new Point(100,100));
    var shape2 = diagram.addShape(new Point(300,100));
    var connection = diagram.connect(shape1, shape2);

## See Also

* [Using the API of the Diagram HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/diagram/api)
* [Server-Side API](/api/diagram)
