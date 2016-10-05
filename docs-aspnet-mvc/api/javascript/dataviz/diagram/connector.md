---
title: Connector
---

# kendo.dataviz.diagram.Connector

The Connector object is a visual intermediate between the Connection and the Shape, it represents the attachment point of a Connection to a Shape.

## Configuration

### width `Number` *(default: 8)*

Defines the width of the connector.

### height `Number` *(default: 8)*

Defines the height of the connector.

### hover `Object`

Defines the hover configuration.

### hover.fill `String|Object`

Defines the hover fill options of the connector.

### hover.fill.color `String`

Defines the hover fill color of the connector.

### hover.fill.opacity `Number` *(default: 1)*

Defines the hover fill opacity of the connector.

### hover.stroke `String|Object`

Defines the hover stroke options of the connector.

### hover.stroke.color `String` *(default: "Black")*

Defines the hover stroke color.

### hover.stroke.dashType `String`

The hover stroke dash type.

### hover.stroke.width `Number` *(default: 1)*

Defines the thickness or width of the connector's stroke on hover.

### fill `String|Object`

Defines the fill options of the connector.

### fill.color `String`

Defines the fill color of the connector.

### fill.opacity `Number` *(default: 1)*

Defines the fill opacity of the connector.

### stroke `String|Object`

Defines the stroke options of the connector.

### stroke.color `String` *(default: "Black")*

Defines the stroke color.

### stroke.dashType `String`

The stroke dash type.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### stroke.width `Number` *(default: 1)*

Defines the thickness or width of the connector's stroke.

## Fields

### connections `Array`

An array of [Connections](connection) that originate or terminate in this connector.

### shape `kendo.dataviz.diagram.Shape`

The [Shape](shape) that owns the connector.

## Methods

### position

Gets the position of the Connector.

#### Returns

`kendo.dataviz.diagram.Point` the current position of the connector.

