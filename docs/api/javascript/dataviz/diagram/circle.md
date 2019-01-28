---
title: Circle
res_type: api
---

# kendo.dataviz.diagram.Circle

Represents a circle.

## Configuration

### center `Object`

The center of the circle.

#### x `Number`

The X position of the circle center.

#### y `Number`

The Y position of the circle center.

#### Example - setting the center of the Circle

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group({
          autoSize: true
        });
        var r = new diagram.Circle({
          center: {x: 40, y: 40},
          radius: 40
        });
        g.append(r);

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: "1",
          content: {
            text: "Monday"
          },
          visual: getVisual
        }]
      });
    </script>

### fill `String|Object`

Defines the fill options of the circle.

#### Example - setting the Circle fill options

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group({
          autoSize: true
        });
        var r = new diagram.Circle({
          center: {x: 40, y: 40},
          radius: 40
        });
        g.append(r);

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: "1",
          content: {
            text: "Monday"
          },
          visual: getVisual
        }]
      });
    </script>

### fill.color `String`

Defines the fill color of the circle.

### fill.opacity `Number` *(default: 1)*

Defines the fill opacity of the circle.

### fill.gradient `Object`

Defines the gradient fill of the shape.

#### Example - setting a gradient fill

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group({
          autoSize: true
        });
        var r = new diagram.Circle({
          center: {x: 40, y: 40},
          radius: 40,
          fill: {
            gradient: {
              type: "linear",
              stops: [{
                color: "green",
                offset: 0,
                opacity: 0.5
              }, {
                color: "yellow",
                offset: 1,
                opacity: 1
              }]
            }
          }
        });
        g.append(r);

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: "1",
          content: {
            text: "Monday"
          },
          visual: getVisual
        }]
      });
    </script>

### fill.gradient.type `String` *(default: "linear")*
The type of the gradient. Supported values are:

* linear
* radial

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

### radius `Number`

The radius of the circle.

#### Example - setting the radius of the Circle

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group({
          autoSize: true
        });
        var r = new diagram.Circle({
          center: {x: 40, y: 40},
          radius: 40
        });
        g.append(r);

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: "1",
          content: {
            text: "Monday"
          },
          visual: getVisual
        }]
      });
    </script>

### stroke `Object`

Defines the stroke configuration.

#### Example - setting the Circle stroke options

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group({
          autoSize: true
        });
        var r = new diagram.Circle({
          center: {x: 40, y: 40},
          radius: 40,
          fill: {
            color: "#add8e6"
          },
          stroke: {
            color: "#800080",
            width: 2
          }
        });
        g.append(r);

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: "1",
          content: {
            text: "Monday"
          },
          visual: getVisual
        }]
      });
    </script>

### stroke.color `String`

Defines the stroke color of the circle.

### stroke.width `Number`

Defines the stroke width of the circle.

## Fields

### drawingElement `kendo.drawing.Circle`

The drawing element used to draw the circle.

#### Example - accessing the Circle drawing element

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group({
          autoSize: true
        });
        var r = new diagram.Circle({
          center: {x: 40, y: 40},
          radius: 40,
          fill: {
            color: "#add8e6"
          }
        });

        r.drawingElement.options.fill.color = "#ff7f50";
        g.append(r);

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: "1",
          content: {
            text: "Monday"
          },
          visual: getVisual
        }]
      });
    </script>

## Methods

### position
Get or sets the element position.

#### Parameters

##### offset `kendo.dataviz.diagram.Point`
The offset of the element.

#### Example - changing the Circle position

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group({
          autoSize: true
        });
        var r = new diagram.Circle({
          center: {x: 40, y: 40},
          radius: 40,
          fill: {
            color: "#add8e6"
          }
        });

        r.position(new kendo.dataviz.diagram.Point(10, 10));
        g.append(r);

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: "1",
          content: {
            text: "Monday"
          },
          visual: getVisual
        }]
      });
    </script>

### rotate
Rotates the element with the specified parameters.

#### Parameters

##### angle `Number`
The angle of rotation in decimal degrees.
Measured in clockwise direction with 0 pointing "right".
Negative values or values greater than 360 will be normalized.

##### center `kendo.dataviz.diagram.Point`
The center of rotation.

#### Example - rotating the Circle element

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group({
          autoSize: true
        });
        var r = new diagram.Circle({
          center: {x: 40, y: 40},
          radius: 40,
          fill: {
            gradient: {
              type: "linear",
              stops: [{
                color: "green",
                offset: 0,
                opacity: 0.5
              }, {
                color: "yellow",
                offset: 1,
                opacity: 1
              }]
            }
          }
        });

        r.rotate(45, new kendo.dataviz.diagram.Point(40, 40));
        g.append(r);

        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: "1",
          content: {
            text: "Monday"
          },
          visual: getVisual
        }]
      });
    </script>

### visible
Gets or sets the visibility of the current element.

#### Parameters

##### visible `Boolean`
The new visibility state.

#### Returns
`Boolean` True if the element is visible, false otherwise.

#### Example - hiding a Circle element

    <div id="diagram"></div>
    <script>
      var diagram = kendo.dataviz.diagram;
      function getVisual(data) {
        var g = new diagram.Group({
          autoSize: true
        });
        var r1 = new diagram.Circle({
          center: {x: 40, y: 40},
          radius: 40,
          fill: {
            color: "green"
          }
        });

        var r2 = new diagram.Circle({
          center: {x: 40, y: 40},
          radius: 40,
          fill: {
            color: "red"
          }
        });

        r2.visible(false);

        g.append(r1);
        g.append(r2);
        return g;
      };

      $("#diagram").kendoDiagram({
        layout: "tree",
        shapes: [{
          id: "1",
          content: {
            text: "Monday"
          },
          visual: getVisual
        }]
      });
    </script> 