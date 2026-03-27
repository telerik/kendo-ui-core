---
title: Connections
page_title: Connections
description: "Learn how to configure and customize connections in the Telerik UI Diagram for {{ site.framework }}, including stroke styles, routing types, and labels."
components: ["diagram"]
slug: htmlhelpers_diagram_aspnetcore_connections
position: 9
---

# {{ site.framework }} Diagram Connections

The Diagram provides extensive configuration options for connections that link shapes together, enabling you to customize their appearance, routing behavior, and labels.

Connections are the lines that visually represent relationships between shapes in a diagram. The component supports various styling options, routing types, and label configurations to create professional and informative diagrams.

> All connection settings described in this article can be applied globally to all connections using the `ConnectionDefaults` configuration. Individual connections will inherit these defaults unless explicitly overridden.

## Getting Started

To create connections between shapes, use the `Connections` configuration and specify the `From` and `To` properties referencing the shape IDs.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(100).Y(100).Content(c => c.Text("Shape 1"));
            shapes.Add().Id("2").X(300).Y(100).Content(c => c.Text("Shape 2"));
        })
        .Connections(connections =>
        {
            connections.Add()
                .From(f => f.Id("1"))
                .To(t => t.Id("2"));
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <shapes>
            <shape id="1" x="100" y="100">
                <content text="Shape 1" />
            </shape>
            <shape id="2" x="300" y="100">
                <content text="Shape 2" />
            </shape>
        </shapes>
        <connections>
            <connection>
                <from id="1" />
                <to id="2" />
            </connection>
        </connections>
    </kendo-diagram>
```
{% endif %}

## Stroke Configuration

The `Stroke` configuration controls the visual appearance of connection lines, including their color, width, and line style.

### Defining Color and Width

Use the `Color` and `Width` options of the `Stroke` configuration to customize the basic appearance of connections.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(100).Y(100).Content(c => c.Text("Shape 1"));
            shapes.Add().Id("2").X(300).Y(100).Content(c => c.Text("Shape 2"));
        })
        .Connections(connections =>
        {
            connections.Add()
                .From(f => f.Id("1"))
                .To(t => t.Id("2"))
                .Stroke(s => s.Color("#ff6358").Width(3));
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <shapes>
            <shape id="1" x="100" y="100">
                <content text="Shape 1" />
            </shape>
            <shape id="2" x="300" y="100">
                <content text="Shape 2" />
            </shape>
        </shapes>
        <connections>
            <connection>
                <from id="1" />
                <to id="2" />
                <stroke color="#ff6358" width="3" />
            </connection>
        </connections>
    </kendo-diagram>
```
{% endif %}

The color accepts any valid CSS color value, and width is specified in pixels.

### Advanced Stroke Options

The stroke configuration also supports `LineCap` and `LineJoin` properties for fine-tuning the appearance of connection endpoints and corners.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(100).Y(100).Content(c => c.Text("Shape 1"));
            shapes.Add().Id("2").X(300).Y(100).Content(c => c.Text("Shape 2"));
        })
        .Connections(connections =>
        {
            connections.Add()
                .From(f => f.Id("1"))
                .To(t => t.Id("2"))
                .Stroke(s => s
                    .Color("#333")
                    .Width(4)
                    .LineCap(DiagramStrokeLineCap.Round)
                    .LineJoin(DiagramStrokeLineJoin.Round)
                );
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <shapes>
            <shape id="1" x="100" y="100">
                <content text="Shape 1" />
            </shape>
            <shape id="2" x="300" y="100">
                <content text="Shape 2" />
            </shape>
        </shapes>
        <connections>
            <connection>
                <from id="1" />
                <to id="2" />
                <stroke color="#333" width="4" line-cap="Round" line-join="Round" />
            </connection>
        </connections>
    </kendo-diagram>
```
{% endif %}

## Connection Types

The `Type` property specifies how connections route between shapes. The default value is `Cascading`.

### Cascading Connections

Cascading connections automatically create a rectangular path between endpoints, which is particularly useful for tree layouts and hierarchical diagrams.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(20).Y(20).Content(c => c.Text("Parent"));
            shapes.Add().Id("2").X(300).Y(100).Content(c => c.Text("Child"));
        })
        .Connections(connections =>
        {
            connections.Add()
                .From(f => f.Id("1"))
                .To(t => t.Id("2"))
                .Type(DiagramConnectionType.Cascading);
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <shapes>
            <shape id="1" x="20" y="20">
                <content text="Parent" />
            </shape>
            <shape id="2" x="300" y="100">
                <content text="Child" />
            </shape>
        </shapes>
        <connections>
            <connection type="@DiagramConnectionType.Cascading">
                <from id="1" />
                <to id="2" />
            </connection>
        </connections>
    </kendo-diagram>
```
{% endif %}

Cascading connections ignore any intermediate points and automatically calculate the optimal rectangular route.

### Polyline Connections

Polyline connections allow you to define custom paths by specifying intermediate points. This provides precise control over the connection routing.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(20).Y(20).Content(c => c.Text("State 1"));
            shapes.Add().Id("2").X(300).Y(100).Content(c => c.Text("State 2"));
        })
        .Connections(connections =>
        {
            connections.Add()
                .From(f => f.Id("1"))
                .To(t => t.Id("2"))
                .Type(DiagramConnectionType.Polyline)
                .Points(points =>
                {
                    points.Add().X(150).Y(20);
                    points.Add().X(150).Y(150);
                });
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <shapes>
            <shape id="1" x="20" y="20">
                <content text="State 1" />
            </shape>
            <shape id="2" x="300" y="100">
                <content text="State 2" />
            </shape>
        </shapes>
        <connections>
            <connection type="@DiagramConnectionType.Polyline">
                <from id="1" />
                <to id="2" />
                <points>
                    <point x="150" y="20" />
                    <point x="150" y="150" />
                </points>
            </connection>
        </connections>
    </kendo-diagram>
```
{% endif %}

## Connection Content

The `Content` configuration enables you to add labels to connections with extensive styling and positioning options.

### Basic Text Label

Add a text label to a connection using the `Text` option.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(100).Y(100).Content(c => c.Text("Shape 1"));
            shapes.Add().Id("2").X(300).Y(100).Content(c => c.Text("Shape 2"));
        })
        .Connections(connections =>
        {
            connections.Add()
                .From(f => f.Id("1"))
                .To(t => t.Id("2"))
                .Content(c => c.Text("Connection Label"));
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <shapes>
            <shape id="1" x="100" y="100">
                <content text="Shape 1" />
            </shape>
            <shape id="2" x="300" y="100">
                <content text="Shape 2" />
            </shape>
        </shapes>
        <connections>
            <connection>
                <from id="1" />
                <to id="2" />
                <content text="Connection Label" />
            </connection>
        </connections>
    </kendo-diagram>
```
{% endif %}

### Styling Label Text

Customize the appearance of connection labels with font properties and colors.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(20).Y(20).Content(c => c.Text("State 1"));
            shapes.Add().Id("2").X(300).Y(20).Content(c => c.Text("State 2"));
        })
        .Connections(connections =>
        {
            connections.Add()
                .From(f => f.Id("1"))
                .To(t => t.Id("2"))
                .Content(c => c
                    .Text("Step 1")
                    .Color("purple")
                    .FontFamily("Tahoma")
                    .FontSize(16)
                    .FontStyle("italic")
                    .FontWeight("600")
                );
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <shapes>
            <shape id="1" x="20" y="20">
                <content text="State 1" />
            </shape>
            <shape id="2" x="300" y="20">
                <content text="State 2" />
            </shape>
        </shapes>
        <connections>
            <connection>
                <from id="1" />
                <to id="2" />
                <content text="Step 1"
                         color="purple"
                         font-family="Tahoma"
                         font-size="16"
                         font-style="italic"
                         font-weight="600" />
            </connection>
        </connections>
    </kendo-diagram>
```
{% endif %}

### Label Background and Border

Add visual emphasis to connection labels by configuring background colors and borders.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(100).Y(100).Content(c => c.Text("Shape 1"));
            shapes.Add().Id("2").X(300).Y(100).Content(c => c.Text("Shape 2"));
        })
        .Connections(connections =>
        {
            connections.Add()
                .From(f => f.Id("1"))
                .To(t => t.Id("2"))
                .Content(c => c
                    .Text("Important")
                    .Background("#ffeb3b")
                    .Border(b => b.Color("#000").Width(1))
                );
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <shapes>
            <shape id="1" x="100" y="100">
                <content text="Shape 1" />
            </shape>
            <shape id="2" x="300" y="100">
                <content text="Shape 2" />
            </shape>
        </shapes>
        <connections>
            <connection>
                <from id="1" />
                <to id="2" />
                <content text="Important" background="#ffeb3b">
                    <border color="#000" width="1" />
                </content>
            </connection>
        </connections>
    </kendo-diagram>
```
{% endif %}

### Label Positioning

Control the position of connection labels relative to the connection path using the `Position` configuration.

Set position to `"inline"` to place the label along the connection path, or use an object to specify vertical and horizontal alignment.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(100).Y(100).Content(c => c.Text("Shape 1"));
            shapes.Add().Id("2").X(300).Y(200).Content(c => c.Text("Shape 2"));
        })
        .Connections(connections =>
        {
            connections.Add()
                .From(f => f.Id("1"))
                .To(t => t.Id("2"))
                .Content(c => c
                    .Text("Connection")
                    .Position(pos => pos
                        .Vertical(DiagramConnectionPositionVertical.Bottom)
                        .Horizontal(DiagramConnectionPositionHorizontal.Right)
                    )
                );
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <shapes>
            <shape id="1" x="100" y="100">
                <content text="Shape 1" />
            </shape>
            <shape id="2" x="300" y="200">
                <content text="Shape 2" />
            </shape>
        </shapes>
        <connections>
            <connection>
                <from id="1" />
                <to id="2" />
                <content text="Connection">
                    <position vertical="@DiagramConnectionPositionVertical.Bottom"
                             horizontal="@DiagramConnectionPositionHorizontal.Right" />
                </content>
            </connection>
        </connections>
    </kendo-diagram>
```
{% endif %}

### Label Padding

Configure the padding around connection labels using the `Padding` configuration.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(100).Y(100).Content(c => c.Text("Shape 1"));
            shapes.Add().Id("2").X(300).Y(100).Content(c => c.Text("Shape 2"));
        })
        .Connections(connections =>
        {
            connections.Add()
                .From(f => f.Id("1"))
                .To(t => t.Id("2"))
                .Content(c => c
                    .Text("Padded Label")
                    .Background("#e0e0e0")
                    .Padding(p => p.Top(6).Right(8).Bottom(6).Left(8))
                );
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <shapes>
            <shape id="1" x="100" y="100">
                <content text="Shape 1" />
            </shape>
            <shape id="2" x="300" y="100">
                <content text="Shape 2" />
            </shape>
        </shapes>
        <connections>
            <connection>
                <from id="1" />
                <to id="2" />
                <content text="Padded Label" background="#e0e0e0">
                    <padding top="6" right="8" bottom="6" left="8" />
                </content>
            </connection>
        </connections>
    </kendo-diagram>
```
{% endif %}

### Label Offset

Use the `Offset` option to control the distance (in pixels) between the label and the connection path.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(100).Y(100).Content(c => c.Text("Shape 1"));
            shapes.Add().Id("2").X(300).Y(200).Content(c => c.Text("Shape 2"));
        })
        .Connections(connections =>
        {
            connections.Add()
                .From(f => f.Id("1"))
                .To(t => t.Id("2"))
                .Content(c => c
                    .Text("Offset Label")
                    .Offset(16)
                    .Position(pos => pos
                        .Vertical(DiagramConnectionPositionVertical.Top)
                        .Horizontal(DiagramConnectionPositionHorizontal.Right)
                    )
                );
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <shapes>
            <shape id="1" x="100" y="100">
                <content text="Shape 1" />
            </shape>
            <shape id="2" x="300" y="200">
                <content text="Shape 2" />
            </shape>
        </shapes>
        <connections>
            <connection>
                <from id="1" />
                <to id="2" />
                <content text="Offset Label" offset="16">
                    <position vertical="@DiagramConnectionPositionVertical.Top"
                             horizontal="@DiagramConnectionPositionHorizontal.Right" />
                </content>
            </connection>
        </connections>
    </kendo-diagram>
```
{% endif %}

### Label Templates

Use templates to render dynamic label content. The template receives a `dataItem` field when a data source field has been specified.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(20).Y(20).Content(c => c.Text("State 1"));
            shapes.Add().Id("2").X(300).Y(20).Content(c => c.Text("State 2"));
        })
        .Connections(connections =>
        {
            connections.Add()
                .From(f => f.Id("1"))
                .To(t => t.Id("2"))
                .Content(c => c
                    .TemplateHandler("connectionLabelTemplate")
                );
        })
    )

    <script>
        function connectionLabelTemplate() {
            return "Iteration on " + kendo.toString(new Date(), "MM/dd/yyyy");
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <shapes>
            <shape id="1" x="20" y="20">
                <content text="State 1" />
            </shape>
            <shape id="2" x="300" y="20">
                <content text="State 2" />
            </shape>
        </shapes>
        <connections>
            <connection>
                <from id="1" />
                <to id="2" />
                <content template-handler="connectionLabelTemplate" />
            </connection>
        </connections>
    </kendo-diagram>

    <script>
        function connectionLabelTemplate() {
            return "Iteration on " + kendo.toString(new Date(), "MM/dd/yyyy");
        }
    </script>
```
{% endif %}

## Connector Direction

Specify which connector on a shape the connection attaches to by using the `FromConnector` and `ToConnector` options.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(100).Y(100).Content(c => c.Text("Shape 1"));
            shapes.Add().Id("2").X(300).Y(100).Content(c => c.Text("Shape 2"));
        })
        .Connections(connections =>
        {
            connections.Add()
                .From(f => f.Id("1"))
                .To(t => t.Id("2"))
                .FromConnector("right")
                .ToConnector("left");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <shapes>
            <shape id="1" x="100" y="100">
                <content text="Shape 1" />
            </shape>
            <shape id="2" x="300" y="100">
                <content text="Shape 2" />
            </shape>
        </shapes>
        <connections>
            <connection from-connector="right" to-connector="left">
                <from id="1" />
                <to id="2" />
            </connection>
        </connections>
    </kendo-diagram>
```
{% endif %}

The valid values are `"top"`, `"right"`, `"bottom"`, `"left"`, and `"auto"`. The default is `"auto"`.

## Corner Radius

Round the corners of connection paths using the `CornerRadius` option.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(100).Y(100).Content(c => c.Text("Shape 1"));
            shapes.Add().Id("2").X(300).Y(200).Content(c => c.Text("Shape 2"));
        })
        .Connections(connections =>
        {
            connections.Add()
                .From(f => f.Id("1"))
                .To(t => t.Id("2"))
                .CornerRadius(10);
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <shapes>
            <shape id="1" x="100" y="100">
                <content text="Shape 1" />
            </shape>
            <shape id="2" x="300" y="200">
                <content text="Shape 2" />
            </shape>
        </shapes>
        <connections>
            <connection corner-radius="10">
                <from id="1" />
                <to id="2" />
            </connection>
        </connections>
    </kendo-diagram>
```
{% endif %}

## End Caps

Configure the appearance of connection endpoints using the `EndCap` and `StartCap` options. Supported cap types include `"none"`, `"ArrowEnd"`, `"ArrowStart"`, and `"FilledCircle"`.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(100).Y(100).Content(c => c.Text("Shape 1"));
            shapes.Add().Id("2").X(300).Y(100).Content(c => c.Text("Shape 2"));
        })
        .Connections(connections =>
        {
            connections.Add()
                .From(f => f.Id("1"))
                .To(t => t.Id("2"))
                .EndCap(ec => ec
                    .Type("ArrowEnd")
                    .Fill(f => f.Color("#333"))
                );
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <shapes>
            <shape id="1" x="100" y="100">
                <content text="Shape 1" />
            </shape>
            <shape id="2" x="300" y="100">
                <content text="Shape 2" />
            </shape>
        </shapes>
        <connections>
            <connection>
                <from id="1" />
                <to id="2" />
                <end-cap type="ArrowEnd">
                    <fill color="#333" />
                </end-cap>
            </connection>
        </connections>
    </kendo-diagram>
```
{% endif %}

## Hover Styling

Define special styling that applies when users hover over connections.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(100).Y(100).Content(c => c.Text("Shape 1"));
            shapes.Add().Id("2").X(300).Y(100).Content(c => c.Text("Shape 2"));
        })
        .Connections(connections =>
        {
            connections.Add()
                .From(f => f.Id("1"))
                .To(t => t.Id("2"))
                .Hover(h => h.Stroke(s => s.Color("#0056b3")));
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <shapes>
            <shape id="1" x="100" y="100">
                <content text="Shape 1" />
            </shape>
            <shape id="2" x="300" y="100">
                <content text="Shape 2" />
            </shape>
        </shapes>
        <connections>
            <connection>
                <from id="1" />
                <to id="2" />
                <hover>
                    <stroke color="#0056b3" />
                </hover>
            </connection>
        </connections>
    </kendo-diagram>
```
{% endif %}

## Editing Options

Control the editing behavior of connections using the `Editable` configuration. Set `Editable` to `false` to disable editing for specific connections, or configure the `Tools` to specify available editing tools.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(100).Y(100).Content(c => c.Text("Shape 1"));
            shapes.Add().Id("2").X(300).Y(100).Content(c => c.Text("Shape 2"));
        })
        .Connections(connections =>
        {
            connections.Add()
                .From(f => f.Id("1"))
                .To(t => t.Id("2"))
                .Editable(e => e
                    .Points(p => p.Snap(6))
                );
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <shapes>
            <shape id="1" x="100" y="100">
                <content text="Shape 1" />
            </shape>
            <shape id="2" x="300" y="100">
                <content text="Shape 2" />
            </shape>
        </shapes>
        <connections>
            <connection>
                <from id="1" />
                <to id="2" />
                <editable>
                    <points snap="6" />
                </editable>
            </connection>
        </connections>
    </kendo-diagram>
```
{% endif %}

## See Also

* [Connections Demo of the Diagram for {{ site.framework }}](https://demos.telerik.com/{{ site.platform }}/diagram/connections)
* [Basic Usage of the Diagram for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/diagram)
* [Server-Side API Reference of the Diagram for {{ site.framework }}](/api/diagram)

