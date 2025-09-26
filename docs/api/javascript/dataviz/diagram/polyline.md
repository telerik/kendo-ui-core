---
title: Polyline
res_type: api
---

# kendo.dataviz.diagram.Polyline

Represents a polyline.

## Configuration

### endCap `String|Object`

The end cap configuration or type name.


<div class="meta-api-description">
Control and customize the appearance of a polyline’s endpoint or line termination by setting or configuring the line’s end style, tip shape, cap type, or edge finish using predefined types or detailed configuration objects to define how line endings render in diagrams, including options for flat caps, round caps, square caps, or custom end decorations for precise visual styling and layout of connected line segments or paths.
</div>

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


<div class="meta-api-description">
Control and customize the interior style or color of a polyline’s end cap in diagrams by setting a solid color, gradient, pattern, or complex fill options to define how the end point of the line appears. Enable detailed styling for line terminations by configuring the end cap’s fill appearance, including simple color fills or advanced visual effects to enhance diagram endpoints. Adjust or specify the fill attributes of a line’s end cap to achieve desired visual effects like color shading, gradient transitions, or pattern overlays on the ends of polylines in graphical components.
</div>

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


<div class="meta-api-description">
Set or customize the fill color of the endpoint caps on lines or polylines to visually match stroke colors or convey different states such as active, selected, or disabled. Adjust or configure the fill of line endings using standard CSS color formats including hex codes, RGB or RGBA values, HSL values, or named color strings to control the appearance of polyline end caps in diagrams, maps, or vector graphics. Enable precise styling of polyline terminations for clarity, emphasis, or consistent theming by specifying endpoint fill colors that blend or contrast with line strokes and background elements.
</div>

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


<div class="meta-api-description">
Adjust and configure the transparency level, alpha, or opacity of the endpoint shapes' fill color on polylines or line endings in diagramming, drawing, or vector graphics tools by setting numeric values to control how solid, clear, or translucent the end cap fills appear, enabling customization of visual emphasis or subtlety on line terminations in user interfaces or graphical representations.
</div>

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


<div class="meta-api-description">
Customize the appearance of a line's end by configuring the stroke style, color, or pattern applied to the final cap of a polyline or path element, including options to set stroke width, color, opacity, and dash patterns for endings, enabling control over how line terminations are visually rendered, styled, or highlighted in graphics, maps, charts, or drawing components.
</div>

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


<div class="meta-api-description">
Set, customize, or configure the outline color for the endpoints or arrowheads of polyline shapes, controlling the stroke color applied to line terminations, tip outlines, or end caps to style the edges of lines, markers, or paths with specific color values that define how the polyline ends visually appear, including adjusting line extremity colors for improved contrast, design consistency, or emphasis in diagrams, maps, or graphical components.
</div>

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


<div class="meta-api-description">
Control and customize the dash pattern, stroke style, or outline appearance of a polyline’s end cap by setting the stroke dash type, enabling solid, dashed, dotted, or custom patterned line endings. Configure how the edge of a polyline’s stroke is rendered with varied dash styles for visually distinct line caps, including options to enable or disable dash patterns, specify dash segments, and adjust line ending decorations. This is useful for developers looking to set or modify dashed outlines, stroke dash arrays, line caps with patterned borders, or customize the visual style of line terminations in vector graphics and chart rendering contexts.
</div>

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


<div class="meta-api-description">
Adjust or configure the thickness, line weight, stroke width, or outline width of the end caps on polylines, including arrowheads, caps, or terminal segments in diagram lines or connectors. Control how bold, thin, or prominent the outline of line endings appear by setting the stroke thickness of polyline end caps, affecting visual styling, shape boundary lines, and terminal stroke appearance for arrows, markers, or line caps on diagrams and vector graphics.
</div>

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


<div class="meta-api-description">
Configure the style or shape that appears at the endpoint of a polyline, controlling how the line terminates visually with options like no cap, arrowhead, or filled circle; customize, set, enable, or change the line ending appearance, endpoint decoration, or terminal shape on line segments for diagrams, maps, or graphics rendering by selecting among different cap types that define the visual finish or endpoint marker such as arrow ends, circular ends, or no visible cap.
</div>

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


<div class="meta-api-description">
Set or configure the interior appearance of a polyline by controlling its fill color, opacity, gradients, image fills, or patterns, enabling customization of how the shape is rendered inside borders, including options for solid colors, transparent overlays, textured patterns, gradient effects, or image-based fills to achieve specific visual styles or thematic designs in diagrams and vector graphics.
</div>

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


<div class="meta-api-description">
Set or configure the interior color, fill color, or background shade of a polyline shape or line segment inside diagrams or vector graphics. Control and customize how the inside area of connected line paths appears by assigning solid colors, dynamic color bindings, or color updates for styling, theming, or visual distinction of polyline fills in diagramming, charting, or graphical components. Change, style, or theme the inside fill decoration of polyline figures using color properties to highlight, differentiate, or visually enhance vector line interiors.
</div>

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


<div class="meta-api-description">
Adjust, set, or configure the transparency and alpha level of a shape's interior fill within a diagram or vector graphic, controlling how faint, see-through, or solid the polygon or polyline's internal area appears for layering effects, emphasis, highlighting, or blending with background elements. Modify fill visibility, opacity, translucency, or transparency degree of the shape's fill region to enhance visual hierarchy, enable subtle overlays, or control color intensity inside connected lines or paths. Enable fine-tuning of interior fill shading and see-through properties to customize graphical emphasis, adjust visual weight, or manage overlapping shapes in diagrams, charts, or vector illustrations.
</div>

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


<div class="meta-api-description">
Set and customize multi-color gradient fills for lines by defining gradient types like linear or radial, adjusting color stops to control color transitions, specifying direction or angle for gradient orientation, and controlling opacity levels to create smooth, visually appealing color blends on polyline shapes. Configure gradient fill appearance, enable gradient color effects, apply smooth color blending, and adjust gradient parameters for advanced line styling and dynamic color variations in graphical components.
</div>

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


<div class="meta-api-description">
Control and customize the fill appearance of shapes and lines by selecting gradient styles such as linear or radial, enabling configuration of fill direction, color blending, gradient spread, and smooth transitions. Configure gradient types to adjust how colors flow across fills, including options to create straight directional gradients or circular, radiating gradients, enhancing visual effects and styling. Set and enable different fill gradient modes to influence the fill rendering behavior for vector graphics, shape backgrounds, or diagram components, ensuring versatile color shading and blending techniques to achieve desired graphic aesthetics.
</div>

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


<div class="meta-api-description">
Adjust or configure the origin point and position of a radial gradient fill within a polyline or shape using fractional coordinates relative to the shape's bounding box, enabling control over where the gradient's focal center starts, such as specifying top-left, center, bottom-right, or any custom point inside the shape for visual styling, shading, or highlighting effects in diagrams or vector graphics.
</div>

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


<div class="meta-api-description">
Adjust the size and scaling of a radial gradient fill within a polygon or polyline by setting the gradient’s radius relative to the shape’s bounding area or bounding box, enabling control over how the circular gradient expands or contracts inside the shape’s fill area. Configure the gradient magnitude to fit, cover, or proportionally scale with the shape’s dimensions, customize the gradient radius to control the spread and intensity of the radial color transition within vector shapes or polygon fills, and enable precise gradient sizing that reacts dynamically as shape bounds change or resize.
</div>

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


<div class="meta-api-description">
Configure or set the initial position, origin, or starting coordinates of a linear gradient fill inside a polyline shape, controlling where the color transition begins within the shape's bounding box using relative two-value arrays like [x, y]; this enables alignment, customization, direction control, gradient offset adjustment, and precise mapping of linear color gradients for diagram polylines, allowing developers to define gradient vector origins for fills with flexible coordinate referencing from top-left to bottom-right.
</div>

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


<div class="meta-api-description">
Control or configure the endpoint coordinates for a linear gradient fill on a polyline shape, specifying the final position of the gradient vector relative to the shape's bounding box using normalized values from 0 to 1, such as setting the gradient’s stop point to the top-left, bottom-right, or any custom position within the shape; this enables precise adjustment of color transitions along the line fill by defining gradient endpoints with two numerical values representing horizontal and vertical placement within the element’s bounds, useful for customizing shading direction, gradient vector termination, or gradient alignment in diagrams and vector graphics.
</div>

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


<div class="meta-api-description">
Set and customize multiple color stops or points to control gradient fill transitions within shapes, adjusting the exact positions and colors along the gradient for smooth or sharp color blending effects. Configure gradient steps, define offset markers with associated colors, manage color arrays in gradients, and fine-tune the flow of colors where one color fades into another on shape fills. Control how shapes transition between colors using gradient stops by specifying colors and positions, enabling detailed color blending, gradient ramp settings, and precise gradient adjustments for shapes in diagrams or vector graphics. Adjust or enable multi-point gradient fills by setting colors at various gradient positions to create visual effects ranging from subtle shifts to vibrant gradients.
</div>

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


<div class="meta-api-description">
Control the exact placement of color stops within a polyline fill gradient by specifying the normalized position from the start to the end of the gradient, enabling precise adjustment of gradient transitions, configuring color distribution along shapes, setting gradient stop points for custom color blending, and fine-tuning visual effects in diagrams or vector graphics to achieve smooth or stepped color changes aligned with specific offsets between zero and one.
</div>

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


<div class="meta-api-description">
Configure and control the color of gradient stops in polyline fills using CSS color names, hex codes like #ff0000, rgb() functions such as rgb(255,0,0), or keywords like transparent and none to set, change, clear, adjust, or customize gradient colors for diagrams, vector shapes, or path fills, enabling precise color transitions, gradient effects, color stops management, and visual styling for lines and shapes in graphics or UI rendering scenarios.
</div>

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


<div class="meta-api-description">
Control the transparency level of gradient color stops within shapes or lines by adjusting fill opacity from fully transparent to fully opaque, enabling customization of gradient shading intensity, layered color blending, alpha channel settings, and smooth transitions in the visual appearance of polylines or diagram elements, to achieve precise control over gradient fade effects, transparency blending, and layered fill styling in graphical rendering.
</div>

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


<div class="meta-api-description">
Set or customize the marker, tip, or decoration at the beginning of a line, configuring the starting endpoint style for polylines with options to enable different arrowheads, dots, squares, or other cap shapes. Control or adjust the start marker appearance by specifying predefined type names or detailed configuration objects to define shapes, sizes, or styles of the line’s starting point, ensuring the line terminates visually as an arrow, circle, or custom symbol. Define, select, or modify the initial cap of connected lines, paths, or polylines in diagrams and graphics, including setting markers for indicating direction, endpoints, or stylistic embellishments at the polyline’s start.
</div>

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


<div class="meta-api-description">
Set or configure the fill appearance, color, or style of the beginning endpoint of a polyline by specifying solid colors, gradient fills, patterns, or complex fill options to customize the visual presentation of the polyline’s start cap, enabling control over its shading, transparency, and decorative fill attributes for lines or strokes.
</div>

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


<div class="meta-api-description">
Configure the starting endpoint fill color of a polyline's cap or arrowhead to customize its appearance using any standard CSS color format like hex codes, RGB values, or color names; adjust this property to visually distinguish the start marker, highlight direction, match themes, indicate statuses, or emphasize path beginnings in diagrams, flowcharts, or vector graphics, enabling control over the initial cap’s fill styling for clearer visualization and design consistency.
</div>

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


<div class="meta-api-description">
Adjust the transparency or alpha level of the start marker’s fill on a polyline to control how opaque or see-through the line’s starting cap interior looks, enabling customization of the start shape’s fill visibility, opacity settings, fill transparency, and alpha blending when configuring or styling the beginning of a line or vector shape to make the start cap more or less transparent according to visual design or rendering preferences.
</div>

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


<div class="meta-api-description">
Set or customize the outline stroke properties for the beginning edge of a polyline or path, including color, width, dash pattern, opacity, and stroke style. Control how the starting cap of a line segment appears by specifying stroke color values, stroke width measurements, dash arrays, and transparency settings. Enable fine-tuned border styling for the start point of polylines, paths, or line components by adjusting stroke options such as solid colors, dashed lines, and opacity levels. Configure or override the stroke rendering at the initial point of continuous line drawings to achieve desired visual styles with customizable border thickness, hues, and dash patterns. Adjust start-end line cap stroke appearance in vector graphics, geometric shapes, or map polylines to define the start line decoration’s outline color, weight, dash effects, and transparency.
</div>

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


<div class="meta-api-description">
Set or customize the color of the starting endpoint outline or border for polylines, enabling control over the initial cap’s stroke appearance using various CSS color formats such as hex codes, RGB, RGBA, or named colors. Adjust, configure, or style the line’s beginning stroke color to emphasize, highlight, or differentiate the start of a polyline in diagrams and vector shapes, ensuring precise color control for visual clarity, theming, and design consistency.
</div>

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


<div class="meta-api-description">
Configure and control the dash pattern or stroke style applied to the beginning outline of a polyline's start cap, enabling customization of dashed, dotted, or solid lines for the start edge of a polyline shape in diagrams or vector graphics. Adjust or set the starting stroke's dash type to modify how the outline appears for the first segment cap, including patterns like dashes, dots, or custom stroke intervals, to enhance shape rendering and visual styling. Enable different stroke dash effects on the starting cap boundary of lines or polylines within diagramming components, controlling outline repetition and spacing for the polyline's leading edge.
</div>

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


<div class="meta-api-description">
Adjust or configure the thickness, weight, or width of the initial line segment or arrowhead at the beginning of a polyline shape, controlling how bold, thin, or prominent the starting border or stroke appears. Set or change the line thickness, stroke size, edge weight, or border width for the start cap of a multi-segment path or polyline to customize its visual emphasis, line start appearance, or arrowhead stroke dimension in diagrams, flowcharts, or vector graphics rendering. Manage how wide or narrow the line's start tip, arrow, or initial segment stroke is displayed by specifying numeric thickness values, typically in pixels, to alter the start cap’s border weight or line prominence during drawing or component initialization. Enable fine control over the entry point stroke width on polylines for styling, graphic emphasis, or arrow size adjustment in visualization, mapping, or vector-based UI components.
</div>

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


<div class="meta-api-description">
Configure or set the styling of the starting endpoint of a line or polyline to customize its appearance, including options to enable no cap, a filled arrowhead pointing at the start, or a filled circular marker for emphasis or directional indication; control the endpoint shape to visually signify line origins, direction cues, or highlight line starts in diagrams, flowcharts, or graphical paths by selecting from various start marker styles such as none, arrow heads, or circular dots.
</div>

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


<div class="meta-api-description">
Set or customize the visual style of connected lines by controlling color, thickness, dash patterns, transparency, line endings, and corner shapes to define how multi-segment paths or polylines appear. Adjust stroke attributes like stroke color, stroke width, dash style, opacity levels, line cap shapes such as round or square, and line joins including bevel or miter to precisely style complex line routes, outlines, or connectors in diagrams, graphics, or vector shapes. Enable flexible line styling, configure line appearance parameters, control stroke visuals for polylines in diagrams or graphical interfaces, and fine-tune border or path presentation with detailed stroke properties affecting line consistency, visibility, and aesthetics.
</div>

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


<div class="meta-api-description">
Set or customize the outline color, line color, or stroke color of a polyline shape to control its border appearance in a diagram or vector graphic; adjust, configure, or define the stroke hue, color values, or line styling to change how the polyline's edges render visually, enabling modifications to highlight, differentiate, or style the shape's perimeter in charts, maps, or graphic elements.
</div>

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


<div class="meta-api-description">
Adjust line thickness, stroke weight, border size, or outline width for polylines by configuring the stroke width to emphasize, highlight, or fine-tune visual appearance in diagrams, maps, or vector graphics; customize line boldness, thickness, or contour size to achieve precise styling effects and control how polyline edges render across different rendering contexts and display resolutions.
</div>

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


<div class="meta-api-description">
Access or customize the underlying graphical element responsible for rendering a polyline shape in a diagram or canvas, enabling you to manipulate drawing attributes, styles, event listeners, or hit-testing behavior at runtime. This includes modifying visual properties, controlling interactive responses, dynamically updating the polyline’s appearance, and hooking into rendering primitives for custom drawing logic or visual effects after the initial setup. Developers often seek to configure or enhance how polylines are drawn, controlled, or reacted to within graphical interfaces, making this a key way to programmatically adjust or respond to the core shape’s rendered output.
</div>

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


<div class="meta-api-description">
Access, modify, or update the ordered list of coordinate points that form a polyline shape in a diagram or graphic component, enabling dynamic control over the path by retrieving current vertex positions or setting new ones to change the line’s shape; use this to programmatically adjust, move, edit, reshape, redraw, or bind vertices for real-time updates in diagrams, flowcharts, or vector graphics where precise point manipulation along connected segments is required.
</div>

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


<div class="meta-api-description">
Control or query the display state of a polyline shape within a diagram by checking if it is currently shown or hidden, toggling its rendering visibility on or off, managing whether the polyline is visible to users, enabling or disabling hit-testing interaction by setting visibility flags, retrieving the active visibility status as a true or false value, configuring graphical elements to appear or disappear programmatically, and adjusting visibility settings for conditional display or user interface updates.
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
