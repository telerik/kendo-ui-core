---
title: Path
res_type: api
---

# kendo.dataviz.diagram.Path

Represents a path.

## Configuration

### data `String`

The SVG Path data. The format follows the standard [SVG format](https://www.w3.org/TR/SVG/paths.html#PathData).


<div class="meta-api-description">
Set or update the shape geometry using SVG path data strings that include move, line, curve, arc, and close commands such as M, L, C, Q, A, and Z to define precise vector paths. Control and customize diagram shapes by specifying or modifying path commands in the standard SVG "d" attribute syntax, enabling dynamic drawing of lines, curves, bezier segments, arcs, and closed shapes. Configure shape outlines in vector graphics or diagram components by providing path strings that describe movements and geometric forms through common SVG path patterns and syntax. Adjust or animate diagram visuals by manipulating the coordinate-based path instructions to create complex shapes using familiar SVG path drawing commands and directives.
</div>

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


<div class="meta-api-description">
Control and customize the visual endpoint of a diagram path by configuring the shape, size, style, or type of the arrowhead, circle, square, or none to define how a connector or line finishes; adjust, set, enable, or configure the path’s terminal decoration to meet design needs, style paths with various end shapes, specify endpoint appearance for diagrams or flowcharts, and manage how lines conclude visually in UI or graphic components.
</div>

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


<div class="meta-api-description">
Set or customize the fill color, paint, or pattern applied to the endpoint decoration of a diagram path or connector arrow, including enabling solid colors, gradients, or complex fill options to style arrowheads, caps, or line ends; control the visual appearance of the end cap by specifying color strings, fill objects, or styling parameters to match themes or design requirements for diagram connectors, paths, or link endings.
</div>

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


<div class="meta-api-description">
Adjust or configure the interior fill color of the endpoint marker on diagram paths, specifying any valid CSS color or hexadecimal value to control how the end cap's inside area appears in line or connector visuals, enabling customization of path terminations, line endings, arrow tips, or shape finishes with various color options for graphical endpoints within diagrams or flowcharts.
</div>

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


<div class="meta-api-description">
Adjust the transparency or alpha level of shape end cap fills in diagrams by configuring the fill opacity, controlling visibility from fully opaque to partially transparent or completely invisible, enabling fine-tuned rendering of path endings with customizable transparency, alpha blending, or fade effects for shape outlines and connectors to achieve desired visual emphasis or subtlety in graphical paths.
</div>

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


<div class="meta-api-description">
Control and customize the outline appearance of the endpoint of a diagram path by setting stroke color, thickness, dash patterns, opacity, or detailed stroke options for the end cap. Enable or configure end cap border styles to highlight, differentiate, or visually emphasize the termination points on vector or diagram lines, including options to create solid or dashed strokes, adjust stroke width and opacity, or apply color styling for endpoint visuals during rendering or initialization. This covers modifying the path tip's line color, dash array, transparency, and stroke weight for precise styling of path closures or connectors in diagrams and vector graphics.
</div>

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


<div class="meta-api-description">
Control or customize the outline color, stroke shade, or border hue of line endings, arrow tips, connectors, or path terminations in diagrams and flowcharts, enabling setting, configuring, or changing the color of end caps on paths or connectors to adjust appearance, styling, or visual emphasis of arrows, pointers, or line tips and enhance diagram visuals by specifying the stroke or outline color that draws the finishing edges of connectors and lines.
</div>

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


<div class="meta-api-description">
Adjust, set, or customize the outline style of a path’s end cap by controlling the stroke pattern to create dashed, dotted, or solid line effects. Enable different stroke dash configurations on diagram connectors or shapes to modify how the endpoint caps appear visually, including toggling between continuous lines, spaced dashes, or pinpoint dots. Fine-tune or configure the appearance of end cap borders for diagrams, charts, or graphic paths by specifying dash spacing, style, or pattern attributes to achieve desired visual emphasis or styling. Control, apply, or modify the stroke dash style for diagram segment terminations to enhance visualization with various dashed line types.
</div>

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


<div class="meta-api-description">
Adjust or configure the thickness, weight, or size of the outline or stroke at the end of a line, arrowhead, or connector in diagram paths; control the visual boldness, prominence, or width of terminal shapes on path ends to customize how line endings appear in flowcharts, graphs, or diagram components; set or modify the stroke thickness for arrow tips, connectors, and line terminals to emphasize or reduce visibility of the path end decoration or cap styling.
</div>

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


<div class="meta-api-description">
Control or configure the shape or style displayed at the termination or endpoint of a connection line, path end, or connector in diagramming or flowchart tools, including options to set no decoration, a filled arrowhead, or a filled circular cap. Customize the visual endpoint appearance for lines or paths by enabling arrow ends, solid circles, or leaving the end open with no cap to clarify direction, indicate flow, or emphasize connection conclusions in diagrams and graphical flows. Adjust, set, or define the terminal line decoration, endpoint marker, or arrowhead style to improve diagram readability, connection semantics, or visual clarity for workflow, network, or relationship mappings.
</div>

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


<div class="meta-api-description">
Set or configure the background color, gradient, opacity, or fill style for a diagram path to control how the area inside the path is visually rendered, allowing customization of the path’s interior appearance with solid colors, transparent fills, gradients, or other fill patterns for enhanced diagram styling and visual distinction.
</div>

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


<div class="meta-api-description">
Define or change the interior fill color of a diagram path using various color formats like hex codes, RGB, RGBA, or named CSS colors; configure, assign, or customize how a path is visually filled or colored inside shapes, polygons, or connectors within diagrams, enabling setting or modifying fill hues, tints, transparencies, or color styles for graphical path areas during diagram rendering or initialization to achieve desired visual effects or match design themes.
</div>

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


<div class="meta-api-description">
Control and configure the transparency or alpha level of a shape's fill color within a diagram, adjusting how see-through or opaque the filled area appears, enabling fine-tuning of visual layering, blending effects, and visibility of overlapping shapes or backgrounds. Set or modify the fill transparency to enhance contrast, create subtle shading, manage fill visibility in complex diagrams, or blend fills with other diagram elements by changing the fill opacity value for paths and shapes. Adjusting fill alpha coverage supports customization of visual emphasis, translucency, and appearance in rendered diagram components and graphical paths.
</div>

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


<div class="meta-api-description">
Control and customize multi-color gradient fills for shapes or paths by setting gradient styles such as linear or radial types, adjusting color stops, specifying direction or rotation angles, and managing opacity levels to achieve smooth transitions and complex color blending effects, enabling vibrant and dynamic visual fills that enhance diagrams, vector graphics, or UI components with configurable gradient overlays and color blending options.
</div>

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


<div class="meta-api-description">
Configure or set gradient fill styles including linear and radial gradients for path fills in diagram visuals, enabling smooth color transitions and customizable gradient directions and spread. Control gradient types for paths to achieve different color blending effects such as linear shading or radial overlays in diagrams, charts, or vector graphics styling. Adjust gradient styles on shapes or paths to create dynamic fill effects with either linear gradients that transition along a direction or radial gradients that radiate from a center point, optimizing visual appeal and clarity in diagram components. Enable or switch between gradient fill modes for path elements to enhance diagrams, control color spread patterns, and customize fill appearance with versatile gradient options.
</div>

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


<div class="meta-api-description">
Adjust or configure the radial gradient center point within a diagram shape by specifying the origin coordinates of the gradient fill using relative positions inside the shape’s bounding box, enabling control over where the gradient radiates from, with coordinates normalized between top-left and bottom-right corners to customize gradient focus, shading distribution, or visual emphasis across the shape area.
</div>

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


<div class="meta-api-description">
Adjust, configure, or set the size and spread of radial gradient fills within diagram shapes by controlling the radius that determines how far the gradient effect extends from the center toward the edges of a shape’s bounding box; this enables precise customization of gradient intensity, coverage area, and visual depth inside shapes by scaling the radial fill's reach in vector graphics or diagram rendering contexts.
</div>

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


<div class="meta-api-description">
Configure or set the starting coordinates of a linear color gradient fill on a diagram path or shape by specifying the origin point of the gradient within the shape’s bounding box, using normalized relative values between 0 and 1 for horizontal and vertical position. Control or adjust gradient direction, placement, alignment, and transition origin by defining a two-element array representing the start position, such as top-left, center, or bottom-right. Enable precise gradient positioning or orientation to customize visual effects, shading, or color blending by manipulating the initial gradient stop location in scalable vector graphics or diagram components. This setting supports gradient fill customization, directional control, gradient origin tweaking, and coordinate-based gradient adjustment within diagrammatic shapes or paths.
</div>

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


<div class="meta-api-description">
Control and customize the endpoint position of a linear gradient fill inside a diagram shape by specifying normalized coordinates ranging from top-left (0, 0) to bottom-right (1, 1), enabling precise adjustment of gradient direction, orientation, angle, color stop placement, and transition boundaries within the shape’s bounding box for configuring smooth color blends, gradient vector endpoints, and gradient flow in diagrams or graphical elements.
</div>

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


<div class="meta-api-description">
Configure, set, or customize multiple color stops in a gradient fill to create smooth or complex color transitions along a Diagram path, defining precise positions, colors, and opacity levels for each stop to control gradient interpolation, shading, and blending effects within fills. Adjust arrays of gradient points to fine-tune color distribution, achieve seamless or multi-tone gradients, and enable rich visual styles across shapes or paths in diagrams, allowing developers to control how colors shift and blend smoothly or abruptly inside graphical objects.
</div>

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


<div class="meta-api-description">
Set or adjust the precise position of color stops within a gradient fill along a diagram path, controlling where each color transition occurs by specifying a normalized offset value from 0 to 1; this enables configuring smooth or stepped gradient effects by placing stops at exact points along the shape’s length, useful for customizing color flow, gradient blending, and visual emphasis on different segments within diagram elements.
</div>

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


<div class="meta-api-description">
Configure or set gradient stop colors for filling diagram paths using CSS color names, hex codes like #ff0000, or rgb() values such as rgb(255, 0, 0), enabling control over gradient transitions, fill hues, opacity, or clearing fill stops by specifying none, transparent, or empty values, allowing dynamic updates, customization, and precise color management of gradient stops within diagram components.
</div>

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


<div class="meta-api-description">
Adjust the transparency level of individual color points within a gradient used to fill diagram shapes by setting numeric opacity values ranging from fully transparent to fully opaque for each gradient stop; manage and configure the fade, visibility, or alpha channel of gradient segments to create subtle or bold color transitions, control the see-through effect or layering in vector paths, customize the intensity and blending of gradient fills layer by layer, and fine-tune gradient color transparency when initializing or modifying diagrams or vector graphics.
</div>

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


<div class="meta-api-description">
Adjust or set the vertical dimension, size, or height of a diagram path element to control its upward or downward scaling, resize the path's tallness, configure the vertical length or extent of a graphical line or route within a diagram, modify shape height, control element height during rendering or initialization, specify how tall or thick the path appears, and enable dynamic or fixed vertical sizing for visual diagram components.
</div>

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


<div class="meta-api-description">
Control and customize the starting endpoint shape of a diagram or flowchart path by specifying the initial cap style, including built-in predefined types or fully customized configurations to set arrowheads, circles, squares, or other marker shapes at the beginning of connecting lines. Adjust, configure, or enable different start line decorations for diagram edges, set unique start anchors or pointers, and define how the initial segment visually appears in workflow charts, node connectors, or graphical paths. Tailor the first path segment’s cap shape for improved diagram clarity, direction indication, or stylistic consistency using either simple type names or detailed shape configuration objects.
</div>

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


<div class="meta-api-description">
Control and customize the initial endpoint style of a diagram path by setting the fill color, gradient, or complex fill options for the starting cap, enabling developers to configure the appearance, color schemes, visual effects, and detailed stylings of path start points in diagrams or flowcharts, including solid fills, gradient overlays, and other structured color configurations to enhance the visual representation and distinguish starting nodes or connectors.
</div>

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


<div class="meta-api-description">
Control and configure the fill color of the starting endpoint of a path or connector, enabling customization of the initial marker or cap appearance with any color format such as CSS color strings or hex codes. Adjust, style, or set the initial cap's fill shade for diagram paths, connectors, arrows, or shapes to visually differentiate starting points, enhance UI visuals, or meet branding requirements. Customize the color used at the beginning of lines, connectors, or flowchart arrows by specifying fill colors to shape the start marker’s look, including solid colors, transparency, and shades through configuration or runtime updates.
</div>

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


<div class="meta-api-description">
Adjust or configure the transparency level, opacity, or alpha of the starting point fill color for a diagram path's start cap, enabling control over how visible, translucent, or opaque the path’s initial endpoint is rendered, including setting partial transparency or full opacity using numeric values between 0 and 1 to customize visual emphasis or subtlety on the path’s starting cap fill.
</div>

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


<div class="meta-api-description">
Control and customize the color, thickness, style, and appearance of the starting edge or outline of a diagram path by setting stroke properties, enabling configurations like solid or dashed lines, adjustable stroke color, width, and other outline attributes for the path's start cap. This feature supports applying color codes, stroke option objects, and detailed stroke styling to define how the beginning of a path is visually rendered, allowing developers to style, configure, or modify the initial stroke decoration and line aesthetics of graphical connections or shapes in diagrams, flowcharts, or vector paths.
</div>

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


<div class="meta-api-description">
Control and customize the starting endpoint outline color on diagram or flowchart connectors, adjusting the stroke color of path start caps to highlight, differentiate, or visually align beginning markers with your component’s theme or design language. Configure, set, or enable the outline color for starting line caps to emphasize path origins, match marker styles, or integrate with styling preferences in diagrams, graphs, or workflow visualizations.
</div>

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


<div class="meta-api-description">
Control and customize the dash pattern, stroke style, or dotted and dashed line appearance at the start of a path or line segment in diagram components, enabling setting or configuring the initial line cap's dash type or stroke pattern for shapes, connectors, or outlines during rendering or component setup, including options to modify how the start of lines or paths appear with various dashed, dotted, solid, or custom stroke styles for visual effects and path styling in diagrams and vector graphics applications.
</div>

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


<div class="meta-api-description">
Adjust, define, or set the thickness, weight, or width of the outline stroke at the beginning or starting point of a path or line in a diagram or graphical component. Enable control over how bold, thin, or prominent the line cap's edge appears at the start, influencing the visual style and emphasis of connectors, arrows, or flow lines. Configure stroke thickness, border width, or outline size specifically for the initial segment of a path to customize diagram appearance, styling, or presentation during rendering or initialization.
</div>

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


<div class="meta-api-description">
Control and customize the starting endpoint appearance of a diagram path by setting the cap style at the beginning of connectors or lines, enabling options like no cap, an arrowhead pointing forward, or a filled circular marker to visually denote path initiation, start markers, or directional indicators in flowcharts, graphs, or network diagrams.
</div>

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


<div class="meta-api-description">
Customize and configure the outline style of paths in diagrams by setting properties such as color, thickness, opacity, dash patterns, line joins, and end caps to control the visual border or stroke of shapes and connectors. Enable adjustments to the path border appearance including solid or dashed lines, transparency levels, and corner styles for precise styling of diagram elements. Set and modify stroke attributes to change path outlines, borders, edges, or line styles in diagrams, supporting varied design requirements like line weight, dash arrays, rounded or beveled corners, and line capping techniques.
</div>

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


<div class="meta-api-description">
Adjust, configure, or define the outline color of lines, connectors, or shapes within a diagram or graphical path by specifying the stroke color using various color formats like CSS color names, hex codes, RGB or RGBA values, enabling customization of the visual appearance of connectors, borders, or line paths for diagrams, charts, flowcharts, or vector graphics.
</div>

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


<div class="meta-api-description">
Adjust or define the thickness, line weight, or outline width of a diagram or shape's stroke, path border, or edge by specifying a numeric value to control how bold, thin, or prominent the path's outline appears when rendering or drawing. Configure, set, or customize the stroke thickness to control the visual weight of lines in diagrams, flowcharts, or vector graphics with precise control over the border width, line size, or contour thickness for enhanced styling, visibility, or emphasis.
</div>

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


<div class="meta-api-description">
Adjust or set the thickness, line weight, stroke width, or outline width of paths in diagrams to control how bold or thin connecting lines or edges appear, enabling customization of visual prominence, clarity, and styling of diagram paths or connectors during setup or configuration.
</div>

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


<div class="meta-api-description">
Adjust or set the horizontal position, offset, or X coordinate of a path within a diagram or canvas to control where the shape or line starts along the left-to-right axis; enables moving, aligning, animating, or positioning graphical paths horizontally within diagram layouts or coordinate spaces.
</div>

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


<div class="meta-api-description">
Control the vertical placement or positioning of a path within a diagram by specifying its Y coordinate or top-left corner's vertical offset, enabling precise movement, alignment, or adjustment along the vertical axis using numeric values, coordinates, or position settings to move shapes or paths up and down within graphical layouts or visual designs.
</div>

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


<div class="meta-api-description">
Configure and manipulate the visual rendering object responsible for displaying a path within diagram or vector graphic components, enabling access to the underlying shape or geometry primitives such as single paths or multipath elements. This allows developers to inspect, modify, or replace the graphical representation dynamically at runtime, control rendering behavior, update coordinates or shapes, and customize path visuals through direct object references to drawing elements used for drawing, rendering, or vector path management. Whether working with basic path elements, complex multi-segment paths, or customizing runtime visual components, this property supports querying and setting the graphical primitives that illustrate diagram connections or shapes.
</div>

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


<div class="meta-api-description">
Configure, set, or retrieve the SVG path commands that define and control the shape and geometry of a diagram path, including commands like M, L, C for moves, lines, curves, and arcs; update or bind the path data string programmatically for dynamic rendering, serialization, animation, or hit-testing of diagram shapes, enabling precise control over the visual path structure, shape manipulation, and interactive responsiveness by modifying or accessing the underlying vector path instructions.
</div>

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


<div class="meta-api-description">
Control visibility status of a path element in a diagram by checking its current display state or toggling its presence dynamically during runtime; enable, disable, show, hide, or query whether a specific diagram path is visible or hidden in interactive applications or automated rendering scenarios to manage element appearance, layout adjustments, or user-driven interactions affecting display properties programmatically.
</div>

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
