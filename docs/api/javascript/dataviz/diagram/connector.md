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

### fill `String|Object`

Defines the fill options of the connector.

### fill.color `String`

Defines the fill color of the connector.

### fill.opacity `Number` *(default: 1)*

Defines the fill opacity of the connector.

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

