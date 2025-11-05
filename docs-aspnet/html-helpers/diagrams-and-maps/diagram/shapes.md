---
title: Shapes
page_title: Shapes
description: "Get started with the Telerik UI Diagram for {{ site.framework }} and use its shape configuration options."
slug: htmlhelpers_diagram_aspnetcore_shapes_connections
position: 7
---

# Shapes

The Diagram enables you to add various shapes by using its [API reference on shapes](https://docs.telerik.com/kendo-ui/api/javascript/dataviz/diagram/shape).

## Getting Started

To add a shape to the Diagram, you can use Razor or JavaScript approach.

### Razor

You can initialize the Shapes using the `Shapes` method of the Diagram HtmlHelper.
```HtmlHelper
    .Shapes(shapes =>
    {
        shapes.Add()
            .Id("1")
            .Type(FlowchartShapeType.Terminator)
            .Content(c => c.Text("Start"))
            .Fill(f => f.Color("#CFE2FF"))
            .Stroke(s => s.Color("#9EC5FE").Width(4))
            .X(218)
            .Y(50)
            .Width(300)
            .Height(100);

        shapes.Add()
            .Id("2")
            .Type(FlowchartShapeType.Process)
            .Content(c => c.Text("Define Requirements"))
            .Fill(f => f.Color("#E2D9F3"))
            .Stroke(s => s.Color("#C5B3E6").Width(4))
            .Width(150)
            .Height(100)
            .X(268)
            .Y(218);
      })
```
{% if site.core %}
```TagHelper
            <shapes>
                <shape id="1"
                              flowchart-shape-type="FlowchartShapeType.Terminator"
                              x="218"
                              y="50"
                              width="300"
                              height="100">
                    <content text="Start" />
                    <fill color="#CFE2FF" />
                    <stroke color="#9EC5FE" width="4" />
                </shape>
                <shape id="2"
                              flowchart-shape-type="FlowchartShapeType.Process"
                              x="268"
                              y="218"
                              width="150"
                              height="100">
                    <content text="Define Requirements" />
                    <fill color="#E2D9F3" />
                    <stroke color="#C5B3E6" width="4" />
                </shape>
              </shapes>
```
{% endif %}}

### JavaScript

Call the `diagram.addShape();` method which renders a rectangle in the upper-left corner of the Diagram surface. To change the initial position, call the `addShape()` method with an additional `Point` parameter.

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

To add connections between shapes, use the Connections collection.
```HtmlHelper
    .Connections(connections =>
    {
        connections.Add()
            .From(f=>f.Id("1"))
            .To(t=>t.Id("2"))
            .Content(c => c.Text("Yes").FontWeight("bold"))
            .FromConnector("right");
     })
```
{% if site.core %}
```TagHelper
            <connections>
                <connection from-connector="right">
                    <from id="1" />
                    <to id="2" />
                    <content text="Yes" font-weight="bold" />
                </connection>
              </connections>
```
{% endif %}}

If you prefer the JavaScript approach, use the `connect()` method.

    var Point = kendo.dataviz.diagram.Point;
    var shape1 = diagram.addShape(new Point(100,100));
    var shape2 = diagram.addShape(new Point(300,100));
    var connection = diagram.connect(shape1, shape2);

## See Also

* [Using the API of the Diagram HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/diagram/api)
* [Worklfow Diagram (Demo)](https://demos.telerik.com/{{ site.platform }}/diagram/workflow-diagram)
* [Server-Side API](/api/diagram)
