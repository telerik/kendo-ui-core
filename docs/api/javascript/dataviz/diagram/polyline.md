---
title: Polyline
res_type: api
---

# kendo.dataviz.diagram.Polyline

Represents a polyline.

## Configuration

### endCap `String|Object`

The end cap configuration or type name.

#### Example - configuring the end cap

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
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

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
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

### endCap.fill.color `String` *(default: "black")*

The end cap fill color.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              endCap: {
                type: "ArrowEnd",
                fill: {
                  color: "blue"
                }
              }
            }));
            return group;
          }
        }]
      });
    </script>

### endCap.fill.opacity `Number`

The end cap fill opacity.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              endCap: {
                type: "ArrowEnd",
                fill: {
                  color: "red",
                  opacity: 0.5
                }
              }
            }));
            return group;
          }
        }]
      });
    </script>

### endCap.stroke `String|Object`

The end cap stroke options or color.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              endCap: {
                type: "ArrowEnd",
                stroke: "green"
              }
            }));
            return group;
          }
        }]
      });
    </script>

### endCap.stroke.color `String`

The end cap stroke color.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              endCap: {
                type: "ArrowEnd",
                stroke: {
                  color: "purple"
                }
              }
            }));
            return group;
          }
        }]
      });
    </script>

### endCap.stroke.dashType `String`

The end cap stroke dash type.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              endCap: {
                type: "ArrowEnd",
                stroke: {
                  color: "black",
                  dashType: "dash"
                }
              }
            }));
            return group;
          }
        }]
      });
    </script>

### endCap.stroke.width `Number`

The end cap stroke width.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              endCap: {
                type: "ArrowEnd",
                stroke: {
                  color: "black",
                  width: 3
                }
              }
            }));
            return group;
          }
        }]
      });
    </script>

### endCap.type `String` *(default: "none")*

The end cap type.

The supported values are:

* "none": no cap
* "ArrowEnd": a filled arrow
* "FilledCircle": a filled circle

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              endCap: {
                type: "FilledCircle",
                fill: "orange"
              }
            }));
            return group;
          }
        }]
      });
    </script>

### fill `String|Object`

Defines the fill options of the polyline.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              fill: "lightblue"
            }));
            return group;
          }
        }]
      });
    </script>

### fill.color `String`

Defines the fill color of the polyline.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              fill: {
                color: "yellow"
              }
            }));
            return group;
          }
        }]
      });
    </script>

### fill.opacity `Number` *(default: 1)*

Defines the fill opacity of the polyline.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              fill: {
                color: "red",
                opacity: 0.3
              }
            }));
            return group;
          }
        }]
      });
    </script>

### fill.gradient `Object`

Defines the gradient fill of the polyline.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              fill: {
                gradient: {
                  type: "linear",
                  start: [0, 0],
                  end: [1, 1],
                  stops: [
                    { offset: 0, color: "red" },
                    { offset: 1, color: "blue" }
                  ]
                }
              }
            }));
            return group;
          }
        }]
      });
    </script>

### fill.gradient.type `String` *(default: "linear")*
The type of the gradient. Supported values are:

* linear
* radial

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              fill: {
                gradient: {
                  type: "radial",
                  center: [0.5, 0.5],
                  stops: [
                    { offset: 0, color: "white" },
                    { offset: 1, color: "black" }
                  ]
                }
              }
            }));
            return group;
          }
        }]
      });
    </script>

### fill.gradient.center `Array`
The center of the radial gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              fill: {
                gradient: {
                  type: "radial",
                  center: [0.3, 0.7],
                  stops: [
                    { offset: 0, color: "yellow" },
                    { offset: 1, color: "red" }
                  ]
                }
              }
            }));
            return group;
          }
        }]
      });
    </script>

### fill.gradient.radius `Number` *(default: 1)*
The radius of the radial gradient relative to the shape bounding box.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              fill: {
                gradient: {
                  type: "radial",
                  center: [0.5, 0.5],
                  radius: 0.8,
                  stops: [
                    { offset: 0, color: "green" },
                    { offset: 1, color: "blue" }
                  ]
                }
              }
            }));
            return group;
          }
        }]
      });
    </script>

### fill.gradient.start `Array`
The start point of the linear gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              fill: {
                gradient: {
                  type: "linear",
                  start: [0, 0.5],
                  end: [1, 0.5],
                  stops: [
                    { offset: 0, color: "purple" },
                    { offset: 1, color: "orange" }
                  ]
                }
              }
            }));
            return group;
          }
        }]
      });
    </script>

### fill.gradient.end `Array`
The end point of the linear gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              fill: {
                gradient: {
                  type: "linear",
                  start: [0, 0],
                  end: [0.5, 1],
                  stops: [
                    { offset: 0, color: "cyan" },
                    { offset: 1, color: "magenta" }
                  ]
                }
              }
            }));
            return group;
          }
        }]
      });
    </script>

### fill.gradient.stops `Array`
The array of gradient color stops.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              fill: {
                gradient: {
                  type: "linear",
                  start: [0, 0],
                  end: [1, 0],
                  stops: [
                    { offset: 0, color: "red" },
                    { offset: 0.5, color: "yellow" },
                    { offset: 1, color: "green" }
                  ]
                }
              }
            }));
            return group;
          }
        }]
      });
    </script>

### fill.gradient.stops.offset `Number`
The stop offset from the start of the element.
Ranges from 0 (start of gradient) to 1 (end of gradient).

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              fill: {
                gradient: {
                  type: "linear",
                  start: [0, 0],
                  end: [1, 0],
                  stops: [
                    { offset: 0, color: "blue" },
                    { offset: 0.3, color: "white" },
                    { offset: 1, color: "red" }
                  ]
                }
              }
            }));
            return group;
          }
        }]
      });
    </script>

### fill.gradient.stops.color `String`
The color in any of the following formats.

| Format         | Description
| ---            | --- | ---
| red            | [Basic](https://www.w3.org/TR/css3-color/#html4) or [Extended](https://www.w3.org/TR/css3-color/#svg-color) CSS Color name
| #ff0000        | Hex RGB value
| rgb(255, 0, 0) | RGB value

Specifying 'none', 'transparent' or '' (empty string) will clear the fill.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              fill: {
                gradient: {
                  type: "linear",
                  start: [0, 0],
                  end: [1, 0],
                  stops: [
                    { offset: 0, color: "#ff0000" },
                    { offset: 0.5, color: "rgb(0, 255, 0)" },
                    { offset: 1, color: "blue" }
                  ]
                }
              }
            }));
            return group;
          }
        }]
      });
    </script>

### fill.gradient.stops.opacity `Number`
The fill opacity.
Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              fill: {
                gradient: {
                  type: "linear",
                  start: [0, 0],
                  end: [1, 0],
                  stops: [
                    { offset: 0, color: "red", opacity: 1 },
                    { offset: 0.5, color: "yellow", opacity: 0.5 },
                    { offset: 1, color: "blue", opacity: 0.2 }
                  ]
                }
              }
            }));
            return group;
          }
        }]
      });
    </script>

### startCap `String|Object`

The start cap configuration or type name.

#### Example - configuring the start cap

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          x: 10,
          y: 10,
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
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

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              startCap: {
                type: "ArrowStart",
                fill: "green"
              }
            }));
            return group;
          }
        }]
      });
    </script>

### startCap.fill.color `String` *(default: "black")*

The start cap fill color.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              startCap: {
                type: "ArrowStart",
                fill: {
                  color: "purple"
                }
              }
            }));
            return group;
          }
        }]
      });
    </script>

### startCap.fill.opacity `Number`

The start cap fill opacity.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              startCap: {
                type: "ArrowStart",
                fill: {
                  color: "orange",
                  opacity: 0.7
                }
              }
            }));
            return group;
          }
        }]
      });
    </script>

### startCap.stroke `String|Object`

The start cap stroke options or color.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              startCap: {
                type: "ArrowStart",
                stroke: "red"
              }
            }));
            return group;
          }
        }]
      });
    </script>

### startCap.stroke.color `String`

The start cap stroke color.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              startCap: {
                type: "ArrowStart",
                stroke: {
                  color: "navy"
                }
              }
            }));
            return group;
          }
        }]
      });
    </script>

### startCap.stroke.dashType `String`

The start cap stroke dash type.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              startCap: {
                type: "ArrowStart",
                stroke: {
                  color: "black",
                  dashType: "dot"
                }
              }
            }));
            return group;
          }
        }]
      });
    </script>

### startCap.stroke.width `Number`

The start cap stroke width.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              startCap: {
                type: "ArrowStart",
                stroke: {
                  color: "black",
                  width: 2
                }
              }
            }));
            return group;
          }
        }]
      });
    </script>

### startCap.type `String` *(default: "none")*

The start cap type.

The supported values are:

* "none": no cap
* "ArrowStart": a filled arrow
* "FilledCircle": a filled circle

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              startCap: {
                type: "FilledCircle",
                fill: "cyan"
              }
            }));
            return group;
          }
        }]
      });
    </script>

### stroke `Object`

Defines the stroke configuration.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              stroke: {
                color: "red",
                width: 2
              }
            }));
            return group;
          }
        }]
      });
    </script>

### stroke.color `String`

Defines the line color of the polyline.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              stroke: {
                color: "green"
              }
            }));
            return group;
          }
        }]
      });
    </script>

### stroke.width `Number`

Defines the stroke width of the polyline.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}],
              stroke: {
                color: "blue",
                width: 4
              }
            }));
            return group;
          }
        }]
      });
    </script>

## Fields

### drawingElement `kendo.drawing.Path`

The drawing element used to draw the polyline.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            var polyline = new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}]
            });
            group.append(polyline);
            
            // Access the drawing element
            console.log("Drawing element:", polyline.drawingElement);
            
            return group;
          }
        }]
      });
    </script>

## Methods

### points

Gets or sets the polyline points.

#### Parameters

##### points `Array`

The new points.

#### Returns

`Array` The current points.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            var polyline = new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}]
            });
            group.append(polyline);
            
            // Get current points
            var currentPoints = polyline.points();
            console.log("Current points:", currentPoints);
            
            // Set new points
            polyline.points([{x: 10, y: 10}, {x: 60, y: 10}, {x: 110, y: 110}]);
            
            return group;
          }
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

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            var polyline = new kendo.dataviz.diagram.Polyline({
              points: [{x: 0, y: 0}, {x: 50, y: 0}, {x: 100, y: 100}]
            });
            group.append(polyline);
            
            // Check current visibility
            var isVisible = polyline.visible();
            console.log("Polyline is visible:", isVisible);
            
            // Hide the polyline
            polyline.visible(false);
            
            return group;
          }
        }]
      });
    </script>
