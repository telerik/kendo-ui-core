---
title: Tooltips
page_title: jQuery Diagram Documentation - Tooltips
description: "Learn how to configure and use tooltips in the jQuery Diagram by Kendo UI to display additional information for shapes and connections."
components: ["diagram"]
slug: tooltips_kendoui_diagram_widget
position: 5
---

# Tooltips

The Diagram supports tooltips that display additional information when users hover over shapes and connections.

Tooltips enhance the user experience by providing contextual information without cluttering the diagram with excessive visual elements. You can customize the appearance and behavior of tooltips for both shapes and connections.

## Getting Started

To enable tooltips, set the [`tooltip`](/api/javascript/dataviz/ui/diagram/configuration/tooltip) configuration option to `true` or provide a configuration object.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    tooltip: true,
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Shape 1" } }
    ]
});
</script>
```

When enabled, the Diagram will display default tooltips when hovering over shapes and connections.

## Configuring the Delay

The [`delay`](/api/javascript/dataviz/ui/diagram/configuration/tooltip.delay) option controls the time in milliseconds before the tooltip appears after the user hovers over a diagram item. The default delay is 200 milliseconds.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    tooltip: {
        delay: 1000
    },
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Tooltip appears after 1 second" } }
    ]
});
</script>
```

Increasing the delay can prevent tooltips from appearing during quick mouse movements across the diagram.

## Customizing Shape Tooltips

Use the [`shapeTemplate`](/api/javascript/dataviz/ui/diagram/configuration/tooltip.shapetemplate) option to define a custom template function for shape tooltips. The template function receives the shape data as a parameter and returns the tooltip content.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    tooltip: {
        shapeTemplate: function(e) {
            return "Shape: " + e.content.text;
        }
    },
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Sales" } },
        { id: "2", x: 300, y: 100, content: { text: "Marketing" } }
    ]
});
</script>
```

The template function can return HTML content to create rich tooltips with formatting and structure.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    tooltip: {
        shapeTemplate: function(e) {
            return "<div><strong>" + e.content.text + "</strong><br/>" +
                   "ID: " + e.id + "</div>";
        }
    },
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Department A" } }
    ]
});
</script>
```

## Customizing Connection Tooltips

Use the [`connectionTemplate`](/api/javascript/dataviz/ui/diagram/configuration/tooltip.connectiontemplate) option to define a custom template function for connection tooltips. This is particularly useful when connections have associated data.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    tooltip: {
        connectionTemplate: function(e) {
            return "Connection: " + e.dataItem.label;
        }
    },
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Shape 1" } },
        { id: "2", x: 300, y: 200, content: { text: "Shape 2" } }
    ],
    connections: [
        {
            from: "1",
            to: "2",
            dataItem: { label: "Connection from 1 to 2" }
        }
    ]
});
</script>
```

Connection tooltips can display relationship information, flow details, or any metadata associated with the connection.

## Using Both the ShapeTemplate and ConnectionTemplate Templates

You can configure both shape and connection templates simultaneously to provide comprehensive tooltip information throughout the diagram.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    tooltip: {
        delay: 500,
        shapeTemplate: function(e) {
            return "<strong>" + e.content.text + "</strong>";
        },
        connectionTemplate: function(e) {
            return "Link from " + e.from + " to " + e.to;
        }
    },
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Start" } },
        { id: "2", x: 300, y: 200, content: { text: "End" } }
    ],
    connections: [
        { from: "1", to: "2" }
    ]
});
</script>
```

## Arrow Function Syntax

You can use ES6 arrow function syntax for cleaner template definitions.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    tooltip: {
        shapeTemplate: (e) => `<div class="custom-tooltip">${e.content.text}</div>`,
        connectionTemplate: (e) => `Link: ${e.dataItem.label}`
    },
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "Node" } }
    ]
});
</script>
```

## Disabling Tooltips

To disable tooltips, set the `tooltip` option to `false`.

```dojo
<div id="diagram"></div>
<script>
$("#diagram").kendoDiagram({
    tooltip: false,
    shapes: [
        { id: "1", x: 100, y: 100, content: { text: "No tooltip" } }
    ]
});
</script>
```

## See Also

* [Basic Usage of the Diagram (Demo)](https://demos.telerik.com/kendo-ui/diagram/index)
* [JavaScript API Reference of the Diagram](/api/javascript/dataviz/ui/diagram)
* [Diagram Shapes](slug:shapes_kendoui_diagram)
* [Diagram Editing](slug:editing_kendoui_diagram_widget)
