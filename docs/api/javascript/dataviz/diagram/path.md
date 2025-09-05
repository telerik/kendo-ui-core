---
title: Path
res_type: api
---

# kendo.dataviz.diagram.Path

Represents a path.

## Configuration

### data `String`

The SVG Path data. The format follows the standard [SVG format](https://www.w3.org/TR/SVG/paths.html#PathData).

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

#### Example

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
                fill: {
                  color: "red",
                  opacity: 0.8
                }
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
            group.append(new kendo.dataviz.diagram.Path({
              data: 'M 0,0 L100,100',
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
            group.append(new kendo.dataviz.diagram.Path({
              data: 'M 0,0 L100,100',
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
            group.append(new kendo.dataviz.diagram.Path({
              data: 'M 0,0 L100,100',
              endCap: {
                type: "ArrowEnd",
                fill: "red",
                stroke: {
                  color: "blue",
                  width: 2
                }
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
            group.append(new kendo.dataviz.diagram.Path({
              data: 'M 0,0 L100,100',
              endCap: {
                type: "ArrowEnd",
                stroke: {
                  color: "green"
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
            group.append(new kendo.dataviz.diagram.Path({
              data: 'M 0,0 L100,100',
              endCap: {
                type: "ArrowEnd",
                stroke: {
                  color: "blue",
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
            group.append(new kendo.dataviz.diagram.Path({
              data: 'M 0,0 L100,100',
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
            group.append(new kendo.dataviz.diagram.Path({
              data: 'M 0,0 L100,100',
              endCap: {
                type: "FilledCircle"
              }
            }));
            return group;
          }
        }]
      });
    </script>

### fill `String|Object`

Defines the fill options of the path.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
              fill: {
                color: "red",
                opacity: 0.7
              }
            }));
            return group;
          }
        }]
      });
    </script>

### fill.color `String`

Defines the fill color of the path.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
              fill: {
                color: "#ff6600"
              }
            }));
            return group;
          }
        }]
      });
    </script>

### fill.opacity `Number` *(default: 1)*

Defines the fill opacity of the path.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
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

Defines the gradient fill of the path.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
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
            group.append(new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
              fill: {
                gradient: {
                  type: "radial",
                  center: [0.5, 0.5],
                  radius: 1,
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
            group.append(new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
              fill: {
                gradient: {
                  type: "radial",
                  center: [0.3, 0.3],
                  radius: 0.8,
                  stops: [
                    { offset: 0, color: "white" },
                    { offset: 1, color: "purple" }
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
            group.append(new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
              fill: {
                gradient: {
                  type: "radial",
                  center: [0.5, 0.5],
                  radius: 0.6,
                  stops: [
                    { offset: 0, color: "orange" },
                    { offset: 1, color: "brown" }
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
            group.append(new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
              fill: {
                gradient: {
                  type: "linear",
                  start: [0, 0],
                  end: [1, 0],
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
            group.append(new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
              fill: {
                gradient: {
                  type: "linear",
                  start: [0, 0],
                  end: [1, 1],
                  stops: [
                    { offset: 0, color: "pink" },
                    { offset: 1, color: "purple" }
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
            group.append(new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
              fill: {
                gradient: {
                  type: "linear",
                  start: [0, 0],
                  end: [1, 1],
                  stops: [
                    { offset: 0, color: "red", opacity: 1 },
                    { offset: 0.5, color: "yellow", opacity: 0.8 },
                    { offset: 1, color: "blue", opacity: 0.6 }
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
            group.append(new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
              fill: {
                gradient: {
                  type: "linear",
                  start: [0, 0],
                  end: [1, 1],
                  stops: [
                    { offset: 0.25, color: "red" },
                    { offset: 0.75, color: "blue" }
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
            group.append(new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
              fill: {
                gradient: {
                  type: "linear",
                  start: [0, 0],
                  end: [1, 1],
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
            group.append(new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
              fill: {
                gradient: {
                  type: "linear",
                  start: [0, 0],
                  end: [1, 1],
                  stops: [
                    { offset: 0, color: "red", opacity: 1 },
                    { offset: 0.5, color: "green", opacity: 0.5 },
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

### height `Number`

Sets the height of the path.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
              fill: "red",
              height: 150
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

#### Example

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
                fill: {
                  color: "green",
                  opacity: 0.9
                }
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
            group.append(new kendo.dataviz.diagram.Path({
              data: 'M 0,0 L100,100',
              startCap: {
                type: "ArrowStart",
                fill: {
                  color: "orange"
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
            group.append(new kendo.dataviz.diagram.Path({
              data: 'M 0,0 L100,100',
              startCap: {
                type: "FilledCircle",
                fill: {
                  color: "red",
                  opacity: 0.4
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
            group.append(new kendo.dataviz.diagram.Path({
              data: 'M 0,0 L100,100',
              startCap: {
                type: "ArrowStart",
                fill: "red",
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

### startCap.stroke.color `String`

The start cap stroke color.

#### Example

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
                stroke: {
                  color: "#ff6600"
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
            group.append(new kendo.dataviz.diagram.Path({
              data: 'M 0,0 L100,100',
              startCap: {
                type: "ArrowStart",
                stroke: {
                  color: "blue",
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
            group.append(new kendo.dataviz.diagram.Path({
              data: 'M 0,0 L100,100',
              startCap: {
                type: "ArrowStart",
                stroke: {
                  color: "black",
                  width: 4
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
            group.append(new kendo.dataviz.diagram.Path({
              data: 'M 0,0 L100,100',
              startCap: {
                type: "FilledCircle",
                fill: "purple"
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
            group.append(new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
              fill: "red",
              stroke: {
                color: "black",
                width: 2,
                dashType: "dash"
              }
            }));
            return group;
          }
        }]
      });
    </script>

### stroke.color `String`

Defines the line color of the path.

#### Example - setting the stroke color

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
              fill: "red",
              stroke: {
                color: "blue" // Stroke color
              }
            }));
            return group;
          }
        }]
      });
    </script>

### stroke.width `Number`

Defines the stroke width of the path.

#### Example - setting the stroke width

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
              fill: "red",
              stroke: {
                color: "blue",
                width: 5 // Stroke width
              }
            }));
            return group;
          }
        }]
      });
    </script>

### width `Number`

Sets the width of the path.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
              fill: "red",
              width: 200
            }));
            return group;
          }
        }]
      });
    </script>

### x `Number`

The X position of the top-left corner of the path.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
              fill: "red",
              x: 50
            }));
            return group;
          }
        }]
      });
    </script>

### y `Number`

The Y position of the top-left corner of the path.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            group.append(new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
              fill: "red",
              y: 30
            }));
            return group;
          }
        }]
      });
    </script>

## Fields

### drawingElement `kendo.drawing.Path`

The drawing element used to draw the path.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            var path = new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
              fill: "red"
            });
            group.append(path);
            console.log("Drawing element:", path.drawingElement);
            return group;
          }
        }]
      });
    </script>

## Methods

### data

Gets or sets the SVG Path data.

#### Parameters

##### path `String`

The new SVG path.

#### Returns

`String` The current SVG path.

#### Example

    <div id="diagram"></div>
    <script>
      $("#diagram").kendoDiagram({
        shapes: [{
          visual: function() {
            var group = new kendo.dataviz.diagram.Group();
            var path = new kendo.dataviz.diagram.Path({
              data: "M 0 0 L 50 50",
              fill: "red"
            });
            group.append(path);
            
            // Set new path data
            path.data("M 10 10 L 90 90");
            
            // Get current path data
            console.log("Current path data:", path.data());
            
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
            var path = new kendo.dataviz.diagram.Path({
              data: "M 80 0 C 100 0 100 0 100 20 L 100 80 C 100 100 100 100 80 100 L 20 100 C 0 100 0 100 0 80 L 0 20 C 0 0 0 0 20 0Z",
              fill: "red"
            });
            group.append(path);
            
            // Hide the path
            path.visible(false);
            
            // Show the path again
            setTimeout(function() {
              path.visible(true);
              console.log("Path is visible:", path.visible());
            }, 1000);
            
            return group;
          }
        }]
      });
    </script>
