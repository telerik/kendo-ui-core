---
title: Connections
page_title: jQuery Diagram Documentation - Connections
description: "Learn how to configure and customize connections in the jQuery Diagram by Kendo UI, including stroke styles, routing types, and labels."
components: ["diagram"]
slug: connections_kendoui_diagram_widget
position: 6
---

# Connections

The Diagram provides extensive configuration options for connections that link shapes together, enabling you to customize their appearance, routing behavior, and labels. 

Connections are the lines that visually represent relationships between shapes in a diagram. The component supports various styling options, routing types, and label configurations to create professional and informative diagrams.

> All connection settings described in this article can be applied globally to all connections using the [`connectionDefaults`](/api/javascript/dataviz/ui/diagram/configuration/connectiondefaults) configuration. Individual connections will inherit these defaults unless explicitly overridden.

## Getting Started

To create connections between shapes, specify the [`from`](/api/javascript/dataviz/ui/diagram/configuration/connections.from) and [`to`](/api/javascript/dataviz/ui/diagram/configuration/connections.to) properties referencing the shape IDs.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Shape 1" } },
        { id: "2", x: 300, y: 100, content: { text: "Shape 2" } }
    ],
    connections: [
        { from: "1", to: "2" }
    ]
});
</script>
```

## Stroke Configuration

The [`stroke`](/api/javascript/dataviz/ui/diagram/configuration/connections.stroke) configuration controls the visual appearance of connection lines, including their color, width, and line style.

### Defining Color and Width

Use the [`stroke.color`](/api/javascript/dataviz/ui/diagram/configuration/connections.stroke#connectionsstrokecolor) and [`stroke.width`](/api/javascript/dataviz/ui/diagram/configuration/connections.stroke#connectionsstrokewidth) properties to customize the basic appearance of connections.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Shape 1" } },
        { id: "2", x: 300, y: 100, content: { text: "Shape 2" } }
    ],
    connections: [{
        from: "1",
        to: "2",
        stroke: {
            color: "#ff6358",
            width: 3
        }
    }]
});
</script>
```

The color accepts any valid CSS color value, and width is specified in pixels.

### Setting Dash Type

The [`stroke.dashType`](/api/javascript/dataviz/ui/diagram/configuration/selectable#selectablestrokedashtype) property allows you to create dashed or dotted connection lines. This is useful for representing different types of relationships.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Primary" } },
        { id: "2", x: 300, y: 100, content: { text: "Secondary" } }
    ],
    connections: [{
        from: "1",
        to: "2",
        stroke: {
            color: "#333",
            width: 2,
            dashType: "dash"
        }
    }]
});
</script>
```

The supported dash types include `"dash"`, `"dashDot"`, `"dot"`, `"longDash"`, `"longDashDot"`, `"longDashDotDot"`, and `"solid"`.

### Advanced Stroke Options

The stroke configuration also supports [`lineCap`](/api/javascript/dataviz/ui/diagram/configuration/connections.stroke#connectionsstrokelinecap) and [`lineJoin`](/api/javascript/dataviz/ui/diagram/configuration/connections.stroke#connectionsstrokelinejoin) properties for fine-tuning the appearance of connection endpoints and corners.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Shape 1" } },
        { id: "2", x: 300, y: 100, content: { text: "Shape 2" } }
    ],
    connections: [{
        from: "1",
        to: "2",
        stroke: {
            color: "#333",
            width: 4,
            lineCap: "round",
            lineJoin: "round"
        }
    }]
});
</script>
```

## Connection Types

The [`type`](/api/javascript/dataviz/ui/diagram/configuration/connections.type) property specifies how connections route between shapes. The default value is `"cascading"`.

### Cascading Connections

Cascading connections automatically create a rectangular path between endpoints, which is particularly useful for tree layouts and hierarchical diagrams.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    shapes: [
        { id: "1", x: 20, y: 20, content: { text: "Parent" } },
        { id: "2", x: 300, y: 100, content: { text: "Child" } }
    ],
    connections: [{
        from: "1",
        to: "2",
        type: "cascading"
    }]
});
</script>
```

Cascading connections ignore any intermediate points and automatically calculate the optimal rectangular route.

### Polyline Connections

Polyline connections allow you to define custom paths by specifying intermediate points. This provides precise control over the connection routing.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    shapes: [
        { id: "1", x: 20, y: 20, content: { text: "State 1" } },
        { id: "2", x: 300, y: 100, content: { text: "State 2" } }
    ],
    connections: [{
        from: "1",
        to: "2",
        type: "polyline",
        points: [
            { x: 150, y: 20 },
            { x: 150, y: 150 }
        ]
    }]
});
</script>
```

## Connection Content

The `content` configuration enables you to add labels to connections with extensive styling and positioning options.

### Basic Text Label

Add a text label to a connection using the [`content.text`](/api/javascript/dataviz/ui/diagram/configuration/connections.content#connectionscontenttext) property.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Shape 1" } },
        { id: "2", x: 300, y: 100, content: { text: "Shape 2" } }
    ],
    connections: [{
        from: "1",
        to: "2",
        content: {
            text: "Connection Label"
        }
    }]
});
</script>
```

### Styling Label Text

Customize the appearance of connection labels with font properties and colors.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    shapes: [
        { id: "1", x: 20, y: 20, content: { text: "State 1" } },
        { id: "2", x: 300, y: 20, content: { text: "State 2" } }
    ],
    connections: [{
        from: "1",
        to: "2",
        content: {
            text: "Step 1",
            color: "purple",
            fontFamily: "Tahoma",
            fontSize: 16,
            fontStyle: "italic",
            fontWeight: 600
        }
    }]
});
</script>
```

### Label Background and Border

Add visual emphasis to connection labels by configuring background colors and borders.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Shape 1" } },
        { id: "2", x: 300, y: 100, content: { text: "Shape 2" } }
    ],
    connections: [{
        from: "1",
        to: "2",
        content: {
            text: "Important",
            background: "#ffeb3b",
            border: {
                color: "#000",
                width: 1,
                dashType: "solid"
            }
        }
    }]
});
</script>
```

The [`border.dashType`](/api/javascript/dataviz/ui/diagram/configuration/connections.content#connectionscontentborderdashtype) supports the same values as stroke dash types.

### Label Positioning

Control the position of connection labels relative to the connection path using the [`position`](/api/javascript/dataviz/ui/diagram/configuration/connections.content#connectionscontentposition) property.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Shape 1" } },
        { id: "2", x: 300, y: 100, content: { text: "Shape 2" } }
    ],
    connections: [{
        from: "1",
        to: "2",
        content: {
            text: "Connection",
            position: "inline"
        }
    }]
});
</script>
```

Set position to `"inline"` to place the label along the connection path, or use an object to specify vertical and horizontal alignment.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Shape 1" } },
        { id: "2", x: 300, y: 200, content: { text: "Shape 2" } }
    ],
    connections: [{
        from: "1",
        to: "2",
        content: {
            text: "Connection",
            position: {
                vertical: "bottom",
                horizontal: "left"
            }
        }
    }]
});
</script>
```

For horizontal connections, `vertical` supports `"top"` and `"bottom"`. For vertical connections, `horizontal` supports `"left"` and `"right"`.

### Label Padding

Configure padding around connection labels when using backgrounds or borders.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Shape 1" } },
        { id: "2", x: 300, y: 100, content: { text: "Shape 2" } }
    ],
    connections: [{
        from: "1",
        to: "2",
        content: {
            text: "Connection",
            background: "#ffeb3b",
            padding: 10
        }
    }]
});
</script>
```

Specify uniform padding as a number, or use an object for individual side padding.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Shape 1" } },
        { id: "2", x: 300, y: 100, content: { text: "Shape 2" } }
    ],
    connections: [{
        from: "1",
        to: "2",
        content: {
            text: "Connection",
            background: "#ffeb3b",
            padding: {
                top: 10,
                right: 15,
                bottom: 10,
                left: 15
            }
        }
    }]
});
</script>
```

### Label Offset

The [`offset`](/api/javascript/dataviz/ui/diagram/configuration/connectiondefaults.content#connectiondefaultscontentoffset) property controls the distance in pixels between the label and the connection path. The default value is 5 pixels.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Shape 1" } },
        { id: "2", x: 300, y: 100, content: { text: "Shape 2" } }
    ],
    connections: [{
        from: "1",
        to: "2",
        content: {
            text: "Connection",
            offset: 15
        }
    }]
});
</script>
```

### Label Templates

Use the [`content.template`](/api/javascript/dataviz/ui/diagram/configuration/connections.content#connectionscontenttemplate) property to create dynamic labels based on connection data.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    shapes: [
        { id: "1", x: 20, y: 20, content: { text: "State 1" } },
        { id: "2", x: 300, y: 20, content: { text: "State 2" } }
    ],
    connections: [{
        from: "1",
        to: "2",
        content: {
            template: function() {
                return "Iteration on " + kendo.toString(new Date(), "MM/dd/yyyy");
            }
        }
    }]
});
</script>
```

### Connector Direction

Specify which connector points to a shape with the [`fromConnector`](/api/javascript/dataviz/ui/diagram/configuration/connections.fromconnector) and [`toConnector`](/api/javascript/dataviz/ui/diagram/configuration/connections.toconnector) properties.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Shape 1" } },
        { id: "2", x: 300, y: 100, content: { text: "Shape 2" } }
    ],
    connections: [{
        from: "1",
        to: "2",
        fromConnector: "right",
        toConnector: "left"
    }]
});
</script>
```

The valid values are `"top"`, `"right"`, `"bottom"`, `"left"`, and `"auto"`. The default is `"auto"`.

### Corner Radius

Round the corners of connection paths using the [`cornerRadius`](/api/javascript/dataviz/ui/diagram/configuration/connections.cornerradius) property.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Shape 1" } },
        { id: "2", x: 300, y: 200, content: { text: "Shape 2" } }
    ],
    connections: [{
        from: "1",
        to: "2",
        cornerRadius: 10
    }]
});
</script>
```

### End Caps

Configure the appearance of connection endpoints using the [`endCap`](/api/javascript/dataviz/ui/diagram/configuration/connections.endcap) property.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Shape 1" } },
        { id: "2", x: 300, y: 100, content: { text: "Shape 2" } }
    ],
    connections: [{
        from: "1",
        to: "2",
        endCap: {
            type: "ArrowEnd",
            fill: { color: "#333" }
        }
    }]
});
</script>
```

### Hover Styling

Define special styling that applies when users hover over connections.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Shape 1" } },
        { id: "2", x: 300, y: 100, content: { text: "Shape 2" } }
    ],
    connections: [{
        from: "1",
        to: "2",
        hover: {
            stroke: {
                color: "#0056b3",
                width: 3
            }
        }
    }]
});
</script>
```

### Editing Options

Control the editing behavior of connections using the [`editable`](/api/javascript/dataviz/ui/diagram/configuration/connections.editable) property.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Shape 1" } },
        { id: "2", x: 300, y: 100, content: { text: "Shape 2" } }
    ],
    connections: [{
        from: "1",
        to: "2",
        editable: {
            tools: ["delete"]
        }
    }]
});
</script>
```

Set [`editable`](/api/javascript/dataviz/ui/diagram/configuration/connections.editable) to `false` to disable editing for specific connections, or configure the [`tools`](/api/javascript/dataviz/ui/diagram/configuration/connections.editable#connectionseditabletools) array to specify available editing tools.

## See Also

* [Basic Usage of the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/index)
* [JavaScript API Reference of the Diagram](/api/javascript/dataviz/ui/diagram)
* [Diagram Shapes](slug:shapes_kendoui_diagram)
* [Diagram Tooltips](slug:tooltips_kendoui_diagram_widget)
