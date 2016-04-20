---
title: Path
---

# kendo.dataviz.diagram.Path

Represents a path.

## Configuration

### data `String`

The SVG Path data. The format follows the standard [SVG format](http://www.w3.org/TR/SVG/paths.html#PathData).

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({ 
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
              fill: "red"
            }));
            return group;
          }
        }]
      });       
    </script>

### endCap `String|Object`

The end cap configuration or type name.

#### Example - configuring the end cap

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({ 
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Path({
              data: 'M 0,0 L100,100',
              endCap: {
                type: "ArrowEnd",
                fill: "red"
              }
            }));
            return group;
          }
        }]
      });       
    </script>

### endCap.fill `String|Object`

The end cap fill options or color.

### endCap.fill.color `String` *(default: "black")*

The end cap fill color.

### endCap.fill.opacity `Number`

The end cap fill opacity.

### endCap.stroke `String|Object`

The end cap stroke options or color.

### endCap.stroke.color `String`

The end cap stroke color.

### endCap.stroke.dashType `String`

The end cap stroke dash type.

### endCap.stroke.width `Number`

The end cap stroke width.

### endCap.type `String` *(default: "none")*

The end cap type.

The supported values are:

* "none": no cap
* "ArrowEnd": a filled arrow
* "FilledCircle": a filled circle

### fill `String|Object`

Defines the fill options of the path.

### fill.color `String`

Defines the fill color of the path.

### fill.opacity `Number` *(default: 1)*

Defines the fill opacity of the path.

### fill.gradient `Object`

Defines the gradient fill of the path.

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

### height `Number`

Sets the height of the path.

### startCap `String|Object`

The start cap configuration or type name.

#### Example - configuring the start cap

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({ 
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Path({
              data: 'M 0,0 L100,100',
              startCap: {
                type: "ArrowStart",
                fill: "red"
              }
            }));
            return group;
          }
        }]
      });       
    </script>

### startCap.fill `String|Object`

The start cap fill options or color.

### startCap.fill.color `String` *(default: "black")*

The start cap fill color.

### startCap.fill.opacity `Number`

The start cap fill opacity.

### startCap.stroke `String|Object`

The start cap stroke options or color.

### startCap.stroke.color `String`

The start cap stroke color.

### startCap.stroke.dashType `String`

The start cap stroke dash type.

### startCap.stroke.width `Number`

The start cap stroke width.

### startCap.type `String` *(default: "none")*

The start cap type.

The supported values are:

* "none": no cap
* "ArrowStart": a filled arrow
* "FilledCircle": a filled circle

### stroke `Object`

Defines the stroke configuration.

### stroke.color `String`

Defines the line color of the path.

### stroke.width `Number`

Defines the stroke width of the path.

### width `Number`

Sets the width of the path.

### x `Number`

The X position of the top-left corner of the path.

### y `Number`

The Y position of the top-left corner of the path.

## Fields

### drawingElement `kendo.drawing.Path`

The drawing element used to draw the path.

## Methods

### data

Gets or sets the SVG Path data.

#### Parameters

##### path `String`

The new SVG path.

#### Returns

`String` The current SVG path.

### visible

Gets or sets the visibilty of the current element.

#### Parameters

##### visible `Boolean`

The new visibility state.

#### Returns

`Boolean` True if the element is visible, false otherwise.
