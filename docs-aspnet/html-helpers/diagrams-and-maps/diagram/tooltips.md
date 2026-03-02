---
title: Tooltips
page_title: Tooltips
description: "Learn how to configure and use tooltips in the Telerik UI Diagram for {{ site.framework }} to display additional information for shapes and connections."
components: ["diagram"]
slug: htmlhelpers_diagram_aspnetcore_tooltips
position: 8
---

# Tooltips

The Diagram supports tooltips that display additional information when users hover over shapes and connections.

Tooltips enhance the user experience by providing contextual information without cluttering the diagram with excessive visual elements. You can customize the appearance and behavior of tooltips for both shapes and connections.

## Getting Started

To enable tooltips, set the `Tooltip` configuration to `true` or provide a configuration object.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Tooltip(true)
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(100).Y(100).Content(c => c.Text("Shape 1"));
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <tooltip enabled="true" />
        <shapes>
            <shape id="1" x="100" y="100">
                <content text="Shape 1" />
            </shape>
        </shapes>
    </kendo-diagram>
```
{% endif %}

When enabled, the Diagram will display default tooltips when hovering over shapes and connections.

## Configuring the Delay

The `Delay` option controls the time in milliseconds before the tooltip appears after the user hovers over a diagram item. The default delay is 200 milliseconds.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Tooltip(tooltip => tooltip
            .Delay(1000)
        )
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(100).Y(100)
                .Content(c => c.Text("Tooltip appears after 1 second"));
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <tooltip delay="1000" />
        <shapes>
            <shape id="1" x="100" y="100">
                <content text="Tooltip appears after 1 second" />
            </shape>
        </shapes>
    </kendo-diagram>
```
{% endif %}

Increasing the delay can prevent tooltips from appearing during quick mouse movements across the diagram.

## Customizing Shape Tooltips

Use the `ShapeTemplate` option to define a custom template function for shape tooltips. The template function receives the shape data as a parameter and returns the tooltip content.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Tooltip(tooltip => tooltip
            .ShapeTemplate("function(e) { return 'Shape: ' + e.content.text; }")
        )
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(100).Y(100).Content(c => c.Text("Sales"));
            shapes.Add().Id("2").X(300).Y(100).Content(c => c.Text("Marketing"));
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <tooltip shape-template="function(e) { return 'Shape: ' + e.content.text; }" />
        <shapes>
            <shape id="1" x="100" y="100">
                <content text="Sales" />
            </shape>
            <shape id="2" x="300" y="100">
                <content text="Marketing" />
            </shape>
        </shapes>
    </kendo-diagram>
```
{% endif %}

The template function can return HTML content to create rich tooltips with formatting and structure.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Tooltip(tooltip => tooltip
            .ShapeTemplate("function(e) { return '<div><strong>' + e.content.text + '</strong><br/>ID: ' + e.id + '</div>'; }")
        )
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(100).Y(100).Content(c => c.Text("Department A"));
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <tooltip shape-template="function(e) { return '<div><strong>' + e.content.text + '</strong><br/>ID: ' + e.id + '</div>'; }" />
        <shapes>
            <shape id="1" x="100" y="100">
                <content text="Department A" />
            </shape>
        </shapes>
    </kendo-diagram>
```
{% endif %}

## Customizing Connection Tooltips

Use the `ConnectionTemplate` option to define a custom template function for connection tooltips. This is particularly useful when connections have associated data.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Tooltip(tooltip => tooltip
            .ConnectionTemplate("function(e) { return 'Connection: ' + e.dataItem.label; }")
        )
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(100).Y(100).Content(c => c.Text("Shape 1"));
            shapes.Add().Id("2").X(300).Y(200).Content(c => c.Text("Shape 2"));
        })
        .Connections(connections =>
        {
            connections.Add().From("1").To("2");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <tooltip connection-template="function(e) { return 'Connection: ' + e.dataItem.label; }" />
        <shapes>
            <shape id="1" x="100" y="100">
                <content text="Shape 1" />
            </shape>
            <shape id="2" x="300" y="200">
                <content text="Shape 2" />
            </shape>
        </shapes>
        <connections>
            <diagram-connection from="1" to="2"></diagram-connection>
        </connections>
    </kendo-diagram>
```
{% endif %}

Connection tooltips can display relationship information, flow details, or any metadata associated with the connection.

## Using Both the ShapeTemplate and ConnectionTemplate Templates

You can configure both shape and connection templates simultaneously to provide comprehensive tooltip information throughout the diagram.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Tooltip(tooltip => tooltip
            .Delay(500)
            .ShapeTemplate("function(e) { return '<strong>' + e.content.text + '</strong>'; }")
            .ConnectionTemplate("function(e) { return 'Link from ' + e.from + ' to ' + e.to; }")
        )
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(100).Y(100).Content(c => c.Text("Start"));
            shapes.Add().Id("2").X(300).Y(200).Content(c => c.Text("End"));
        })
        .Connections(connections =>
        {
            connections.Add().From("1").To("2");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <tooltip delay="500" 
                 shape-template="function(e) { return '<strong>' + e.content.text + '</strong>'; }"
                 connection-template="function(e) { return 'Link from ' + e.from + ' to ' + e.to; }" />
        <shapes>
            <shape id="1" x="100" y="100">
                <content text="Start" />
            </shape>
            <shape id="2" x="300" y="200">
                <content text="End" />
            </shape>
        </shapes>
        <connections>
            <diagram-connection from="1" to="2"></diagram-connection>
        </connections>
    </kendo-diagram>
```
{% endif %}

## Arrow Function Syntax

You can use ES6 arrow function syntax for cleaner template definitions.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Tooltip(tooltip => tooltip
            .ShapeTemplate("(e) => `<div class='custom-tooltip'>${e.content.text}</div>`")
            .ConnectionTemplate("(e) => `Link: ${e.dataItem.label}`")
        )
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(100).Y(100).Content(c => c.Text("Node"));
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <tooltip shape-template="(e) => `<div class='custom-tooltip'>${e.content.text}</div>`"
                 connection-template="(e) => `Link: ${e.dataItem.label}`" />
        <shapes>
            <shape id="1" x="100" y="100">
                <content text="Node" />
            </shape>
        </shapes>
    </kendo-diagram>
```
{% endif %}

## Disabling Tooltips

To disable tooltips, set the `Tooltip` option to `false`.

```HtmlHelper
    @(Html.Kendo().Diagram()
        .Name("diagram")
        .Tooltip(false)
        .Shapes(shapes =>
        {
            shapes.Add().Id("1").X(100).Y(100).Content(c => c.Text("No tooltip"));
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-diagram name="diagram">
        <tooltip enabled="false" />
        <shapes>
            <shape id="1" x="100" y="100">
                <content text="No tooltip" />
            </shape>
        </shapes>
    </kendo-diagram>
```
{% endif %}

## See Also

* [Basic Usage of the Diagram for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/diagram)
* [Server-Side API Reference of the Diagram for {{ site.framework }}](/api/diagram)
* [Diagram Shapes for {{ site.framework }}](slug:htmlhelpers_diagram_aspnetcore_shapes_connections)
* [Diagram Editing for {{ site.framework }}](slug:htmlhelpers_diagram_aspnetcore_editing)
