---
title: Shape
---

# kendo.dataviz.diagram.Shape

The Shape object represents a visual node in the graph or diagram.

## Configuration

### id `String`

The unique identifier for a Shape.

### editable `Boolean|Object` *(default: true)*

Defines the shape editable options.

### editable.connect `Boolean`

Specifies whether the connectors should appear on hover.

### path `String`

The path option of a Shape is a description of a custom geometry. The format follows the standard SVG format (http://www.w3.org/TR/SVG/paths.html#PathData "SVG Path data.").

### stroke `Object`

Defines the stroke configuration.

### stroke.color `String`

Defines the color of the shape's stroke.

### stroke.width `Number` *(default: 1)*

Defines the thickness or width of the shape's stroke.

### stroke.dashType `String`

The dash type of the shape.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line

### type `String` *(default: "rectangle")*

Specifies the type of the Shape using any of the built-in shape type.

* "rectangle": this is the default option, representing a SVG Rectangle
* "circle" : a SVG circle/ellipse

### x `Number` *(default: 0)*

Defines the x-coordinate of the shape when added to the diagram.

### y `Number` *(default: 0)*

Defines the y-coordinate of the shape when added to the diagram.

### minWidth `Number` *(default: 20)*

Defines the minimum width the shape should have, i.e. it cannot be resized to a value smaller than the given one.

### minHeight `Number` *(default: 20)*

Defines the minimum height the shape should have, i.e. it cannot be resized to a value smaller than the given one.

### width `Number` *(default: 100)*

Defines the width of the shape when added to the diagram.

### height `Number` *(default: 100)*

Defines the height of the shape when added to the diagram.

### fill `String|Object`

Defines the fill options of the shape.

### fill.color `String`

Defines the fill color of the shape.

### fill.opacity `Number` *(default: 1)*

Defines the fill opacity of the shape.

### fill.gradient `Object`

Defines the gradient fill of the shape.

### fill.gradient.type `String` *(default: "linear")*
The type of the gradient. Supported values are:

* linear
* radial

Note that support for radial gradients in VML (IE8 and below) is limited.
Not all configurations are guaranteed to work.

### fill.gradient.center `Array`
The center of the radial gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

### fill.gradient.radius `Number` *(default: 1)*
The radius of the radial gradient relative to the shape bounding box.

### fill.gradient.start `Array`
The start point of the linear gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

### fill.gradient.end `Array`
The end point of the linear gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

### fill.gradient.stops `Array`
The array of gradient color stops.

### fill.gradient.stops.offset `Number`
The stop offset from the start of the element.
Ranges from 0 (start of gradient) to 1 (end of gradient).

### fill.gradient.stops.color `String`
The color in any of the following formats.

| Format         | Description
| ---            | --- | ---
| red            | [Basic](http://www.w3.org/TR/css3-color/#html4) or [Extended](http://www.w3.org/TR/css3-color/#svg-color) CSS Color name
| #ff0000        | Hex RGB value
| rgb(255, 0, 0) | RGB value

Specifying 'none', 'transparent' or '' (empty string) will clear the fill.

### fill.gradient.stops.opacity `Number`
The fill opacity.
Ranges from 0 (completely transparent) to 1 (completely opaque).

### hover `Object`

Defines the hover configuration.

### hover.fill `String|Object`

Defines the hover fill options of the shape.

### hover.fill.color `String`

Defines the hover fill color of the shape.

### hover.fill.opacity `Number` *(default: 1)*

Defines the hover fill opacity of the shape.

### connectors `Array`

Defines the connectors the shape owns.

### connectors.name `String`

The connector name. Predefined names include:

* "top" - top connector.
* "right" - right connector.
* "bottom" - bottom connector.
* "bottomRight" - bottom right connector.
* "left" - left connector.
* "auto" - auto connector.

### connectors.description `String`

The connector description.

### connectors.position `Function`

The function that positions the connector.

### rotation `Object`

The shape rotation settings.

### rotation.angle `Number` *(default: 0)*

The rotation angle.

### content `Object`

Defines the shapes content settings.

### content.text `String`

The text displayed in the shape.

### content.align `String`

The alignment of the text inside the shape.

### selectable `Boolean` *(default: true)*

Specifies if the shape can be selected.

### visual `Function`

A function returning a visual element to render for this shape.

## Fields

### connectors `Array`

The connectors defined on this shape.

### dataItem `Object`

The data item that this shape is bound to, if any.

### shapeVisual `Object`

The visual element representing the shape.

This is either the result returned from
[shape.visual](/api/javascript/dataviz/ui/diagram#configuration-shapeDefaults.visual)
or a [predefined type](/api/javascript/dataviz/ui/diagram#configuration-shapes.type).

### visual `kendo.dataviz.diagram.Group`

A container for the [shapeVisual](#fields-shapeVisual) element.

Positioning and transformations are applied on this container.

## Methods

### position

Get or set method returning the current global position or sets the position specified.

#### Parameters

##### point `kendo.dataviz.diagram.Point`

Either the location to set or if no parameter given returns the current location.

### clone

Returns a clone (with a different id) of the shape.

#### Returns

`kendo.dataviz.diagram.Shape` A clone of the current shape.

### select

Selects or deselects the shape.

#### Parameters

##### value `Boolean`

Use 'true' to select the shape or 'false' to deselect it.

### connections

Returns the connections attached to the shape. You can optionally specify to return only the incoming or outgoing connections.

#### Parameters

##### type `String`

If not parameter specified all connections are returned, if "in" then only the incoming (i.e. towards the shape) are returned, if "out" the only the outgoing (i.e. away from the shape) are returned.

### getConnector

Fetches a (default or custom) Connector defined on the Shape by its name.

### getPosition

Returns the middle positions of the sides of the bounds or the center of the shape's bounds. This method is useful when defining custom connectors where a position function relative to the shape's coordinate system is required.

#### Parameters

##### side `String`

One of the four sides of a bound; "left", "right", "top", "bottom". If none specified the center of the shape's bounds will be returned.

### redraw

Renders the shape with the given options. It redefines the options and redraws the shape accordingly.

#### Parameters

##### options `Object`
The object containing a subset of options to change. Follows the same structure as the [configuration](#configuration).

##### Example - Redraw shape with new options

    <div id="diagram"></div>
    <script>
        $("#diagram").kendoDiagram({
          dataSource: {
              data: [{ "items": [{ items: [{}] }] }],
              schema: { model: { children: "items" } }
          },
          layout: {
              type: "tree"
          },
          dataBound: function(e) {
              e.sender.shapes[0].redraw({
                  fill: {
                      color: "green"
                  }
              });
          }
        });
    </script>

