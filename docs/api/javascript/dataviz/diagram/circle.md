---
title: Circle
res_type: api
---

# kendo.dataviz.diagram.Circle

Represents a circle.

## Configuration

### center `Object`

The center of the circle.


<div class="meta-api-description">
How do I set the exact center point of a circle in Kendo UI for jQuery Diagram? Set or retrieve the exact central point of a circle within a diagram for precise positioning, alignment, layout adjustments, or detecting user interactions such as clicks and drags. Control the circle’s placement by defining its center coordinates to enable accurate movement, snapping to grid, alignment with other diagram elements, recalculating positions during resizing, or dynamically updating during animations. Useful for developers wanting to configure circle origin points, manage interactive hit areas, or synchronize circle position with other shapes in a graphical interface or diagramming tool.
</div>

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


<div class="meta-api-description">
How to change the fill color of a circle in Kendo UI Diagram? Control and customize the background appearance of circular shapes by configuring fill colors, gradients, image textures, opacity levels, transparency, pattern fills, and visual styling options. Adjust or enable settings for solid fills, gradient transitions, image-based backgrounds, alpha transparency, patterned surfaces, or custom painting effects to define how a circle shape in a diagram or graphical component is rendered and visually presented. This customization supports setting fill attributes dynamically or through configuration objects to achieve desired visual effects, background styles, and shape rendering preferences.
</div>

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


<div class="meta-api-description">
How do I change the fill color of a circular shape in my Kendo UI Diagram? Control and customize the interior fill color of circular shapes in diagrams using any CSS-compatible color format such as hex codes, RGB, RGBA, or named colors to change the circle’s background appearance, set transparency levels, enable dynamic color adjustments, customize visual styling, or apply color theming for diagram elements to enhance visual distinction and clarity in graphical interfaces.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
      shapes: [{
        type: "circle",
        x: 100,
        y: 100,
        fill: {
          color: "#ff6358"
        }
      }]
    });
    </script>

### fill.opacity `Number` *(default: 1)*

Defines the fill opacity of the circle.


<div class="meta-api-description">
How do I adjust the transparency of a circle's fill color in Kendo UI Diagram? Adjust the transparency or alpha level of a circle's fill color to control the visibility and blending of the circle with background elements, enabling you to set, configure, or modify fill opacity for visual layering, semi-transparent effects, or customizing how much underlying content is visible through the circle's interior. This is useful when you want to make the fill partially see-through, tweak transparency settings, or manage fill color clarity for diagrams, shapes, or graphical elements that require various degrees of translucency and visual emphasis.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
      shapes: [{
        type: "circle",
        x: 100,
        y: 100,
        fill: {
          color: "#ff6358",
          opacity: 0.5
        }
      }]
    });
    </script>

### fill.gradient `Object`

Defines the gradient fill of the shape.


<div class="meta-api-description">
How to set up a radial gradient fill for a circle in Kendo UI Diagram? Configure the circle’s fill with gradient colors by setting gradient stops, directions, and types such as linear or radial to create smooth color transitions inside the shape, adjust color blending, control gradient orientation and spread, customize multi-color fills for circular diagrams, enable visual effects with blending modes, set gradient start and end points, and manipulate radial or linear gradients to enhance the appearance of round shapes in graphical components.
</div>

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


<div class="meta-api-description">
How to set gradient type for DiagramCircle fill in Kendo UI for jQuery? Configure and customize circle fill gradients by selecting the gradient style or type, enabling control over how colors blend within a circular shape, including options for linear gradients that transition directionally across the circle or radial gradients that blend outward from the center, allowing developers to set, switch, or adjust gradient rendering modes for diagram elements, fill effects, color transitions, and visual styling preferences that affect the appearance of circular fills with directional or center-focused color blending.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
      shapes: [{
        type: "circle",
        x: 100,
        y: 100,
        fill: {
          gradient: {
            type: "radial",
            stops: [
              { color: "#ff6358", offset: 0 },
              { color: "#ffd246", offset: 1 }
            ]
          }
        }
      }]
    });
    </script>

### fill.gradient.center `Array`
The center of the radial gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.


<div class="meta-api-description">
How to adjust the position of a radial gradient fill in a Kendo UI diagram circle? Adjust or set the central position of a radial gradient fill within a circular shape, controlling the focal point by specifying normalized coordinates relative to the shape's bounding area; this enables customization of gradient alignment, allowing you to shift or move the gradient center from top-left through center to bottom-right within the circle, supporting precise gradient positioning, gradient offset control, radial gradient origin adjustments, and fine-tuning of color spread inside circle diagrams or similar shapes.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
      shapes: [{
        type: "circle",
        x: 100,
        y: 100,
        fill: {
          gradient: {
            type: "radial",
            center: [0.5, 0.3],
            stops: [
              { color: "#ff6358", offset: 0 },
              { color: "#ffd246", offset: 1 }
            ]
          }
        }
      }]
    });
    </script>

### fill.gradient.radius `Number` *(default: 1)*
The radius of the radial gradient relative to the shape bounding box.


<div class="meta-api-description">
How to adjust the size of a radial gradient fill in Kendo UI Diagrams? Adjust, set, or control the radius of a radial gradient fill within a diagram shape to define how far the gradient spreads from the center to the edges, scaling the gradient size relative to the shape’s bounding box, enabling customization of gradient intensity, coverage, and visual transition inside shapes, useful for configuring gradient scale, appearance, and fill styling in vector graphics or diagramming contexts.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
      shapes: [{
        type: "circle",
        x: 100,
        y: 100,
        fill: {
          gradient: {
            type: "radial",
            radius: 0.8,
            stops: [
              { color: "#ff6358", offset: 0 },
              { color: "#ffd246", offset: 1 }
            ]
          }
        }
      }]
    });
    </script>

### fill.gradient.start `Array`
The start point of the linear gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.


<div class="meta-api-description">
How to set the start point of a linear gradient fill in Kendo UI diagram? Set or customize the starting point of a linear gradient fill within a diagram or shape by specifying normalized coordinates that control where the gradient begins relative to the shape’s bounding box, using a coordinate system where the top-left corner is zero and bottom-right corner is one; this enables configuring gradient direction, positioning, transition origins, or controlling color flow inside shapes, adjusting fill effects for visual styling or design, and defining gradient anchors during initialization or runtime for precise graphical rendering.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
      shapes: [{
        type: "circle",
        x: 100,
        y: 100,
        fill: {
          gradient: {
            type: "linear",
            start: [0, 0],
            end: [1, 1],
            stops: [
              { color: "#ff6358", offset: 0 },
              { color: "#ffd246", offset: 1 }
            ]
          }
        }
      }]
    });
    </script>

### fill.gradient.end `Array`
The end point of the linear gradient.

Coordinates are relative to the shape bounding box.
For example [0, 0] is top left and [1, 1] is bottom right.


<div class="meta-api-description">
How do I set the end point of a linear gradient fill in Kendo UI Diagram's circle shapes? Control and customize the endpoint of a linear gradient fill within diagram shapes by specifying normalized coordinates that define where the gradient ends relative to the shape’s bounding box, allowing precise adjustment of shading transitions and color stops from top-left to bottom-right positions using flexible [x, y] values between 0 and 1 for gradients applied to circle diagrams or similar vector shapes.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
      shapes: [{
        type: "circle",
        x: 100,
        y: 100,
        fill: {
          gradient: {
            type: "linear",
            start: [0, 0],
            end: [0.8, 0.8],
            stops: [
              { color: "#ff6358", offset: 0 },
              { color: "#ffd246", offset: 1 }
            ]
          }
        }
      }]
    });
    </script>

### fill.gradient.stops `Array`
The array of gradient color stops.


<div class="meta-api-description">
How to add custom color stops to a gradient fill in Kendo UI Diagram circle? Configure and customize the array of gradient color stops that control the progression and positioning of colors in a circular fill gradient. Adjust or define multiple color stops with specific colors and offsets to create smooth or complex color transitions, blending hues seamlessly within a diagram circle’s fill area. Enable precise control over gradient shading, color blending points, transition timing, and stop ordering for tailored visual effects in circle fills, including options to add, modify, or reorder color stop entries to achieve various gradient styles. This feature supports dynamic gradient customization by specifying color offsets and stop colors for smooth radial or linear shading within circular diagram elements.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
      shapes: [{
        type: "circle",
        x: 100,
        y: 100,
        fill: {
          gradient: {
            type: "linear",
            stops: [
              { color: "#ff6358", offset: 0, opacity: 1 },
              { color: "#ffd246", offset: 0.5, opacity: 0.8 },
              { color: "#28b4c8", offset: 1, opacity: 0.6 }
            ]
          }
        }
      }]
    });
    </script>

### fill.gradient.stops.offset `Number`
The stop offset from the start of the element.
Ranges from 0 (start of gradient) to 1 (end of gradient).


<div class="meta-api-description">
How do I adjust the position of color stops in a circular gradient fill for my Kendo UI Diagram? Adjust or configure the position of a color stop within a circular gradient fill by setting its relative location along the gradient axis, using values between 0 and 1 to define precise placement from the beginning to the end of the gradient range, allowing control over how colors transition and blend inside a radial or circular fill pattern in diagrams or graphics.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
      shapes: [{
        type: "circle",
        x: 100,
        y: 100,
        fill: {
          gradient: {
            type: "linear",
            stops: [
              { color: "#ff6358", offset: 0 },
              { color: "#ffd246", offset: 0.3 },
              { color: "#28b4c8", offset: 1 }
            ]
          }
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
How do I set the fill color of gradient stops in a Kendo UI Diagram Circle using CSS-compatible color formats? Adjust or define the fill color of gradient stops within circular diagrams using CSS-compatible color formats such as named colors, hex codes, or rgb values, enabling precise control over gradient transitions and enabling clearing or disabling the fill with keywords like 'none' or 'transparent'. This covers use cases including customizing gradient shading, setting exact color stops for smooth color blending on circle shapes, configuring fill styles with both basic and extended CSS color names, and toggling fill visibility through clearing or transparent settings in graphic or data visualization contexts.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
      shapes: [{
        type: "circle",
        x: 100,
        y: 100,
        fill: {
          gradient: {
            type: "linear",
            stops: [
              { color: "red", offset: 0 },
              { color: "#ff6358", offset: 0.5 },
              { color: "rgb(40, 180, 200)", offset: 1 }
            ]
          }
        }
      }]
    });
    </script>

### fill.gradient.stops.opacity `Number`
The fill opacity.
Ranges from 0 (completely transparent) to 1 (completely opaque).


<div class="meta-api-description">
How to adjust opacity of individual gradient color stops in a Kendo UI Diagram element? Control and adjust the transparency level of individual gradient color stops used in shape fills, enabling precise opacity settings from fully transparent to fully opaque to create smooth fades, subtle shading effects, or solid colors within diagram elements. Customize gradient stop visibility by setting opacity values between 0 and 1 to fine-tune the visual layering, blending, and intensity of colors within complex vector illustrations or shape styles. Enable nuanced control over gradient transparency for effects such as partial transparency, fading colors, semi-transparent overlays, or crisp opaque fills in graphical components and diagrams.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
      shapes: [{
        type: "circle",
        x: 100,
        y: 100,
        fill: {
          gradient: {
            type: "linear",
            stops: [
              { color: "#ff6358", offset: 0, opacity: 1 },
              { color: "#ffd246", offset: 0.5, opacity: 0.5 },
              { color: "#28b4c8", offset: 1, opacity: 0.2 }
            ]
          }
        }
      }]
    });
    </script>

### radius `Number`

The radius of the circle.


<div class="meta-api-description">
How do I set the radius of a circle in Kendo UI diagram? Adjust or control the size of a circular shape in a diagram by setting its radius value, specifying the numeric measure that determines how large the circle appears within the diagram's coordinate system, enabling configuration of circle dimensions during setup, scaling circle size dynamically, customizing circle radius in layouts, or defining the circle’s extent for rendering and visual presentation.
</div>

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


<div class="meta-api-description">
How to customize the stroke of a circular shape in Kendo UI Diagram? Control and customize the circular shape's border by setting stroke color, line width, opacity levels, dash patterns, and various border styling options to achieve precise outline appearance. Adjust the circle’s edge rendering with flexible stroke configurations including solid, dashed, or dotted lines, specifying transparency and thickness for visual emphasis or subtlety. Enable detailed circle outline styling for diagrams, flowcharts, or graphical interfaces by defining stroke attributes that influence the circle’s perimeter look across different rendering contexts. Configure shape borders to highlight or differentiate circular nodes and elements using comprehensive stroke properties that govern border color intensity, stroke weight, and decorative line styles.
</div>

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


<div class="meta-api-description">
How do I change the color of the outline in a Kendo UI diagram circle? Set, customize, or modify the outline color of circular shapes in diagrams to highlight borders, emphasize nodes, differentiate elements by color, indicate selection or status, style shape edges, control stroke hues, and synchronize or change border colors for visual clarity and state representation in graphical interfaces.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
      shapes: [{
        type: "circle",
        x: 100,
        y: 100,
        stroke: {
          color: "#ff6358",
          width: 2
        }
      }]
    });
    </script>

### stroke.width `Number`

Defines the stroke width of the circle.


<div class="meta-api-description">
How do I adjust the thickness of a circle's outline in Kendo UI diagrams? Adjust or configure the thickness, weight, or width of a circle’s outline or stroke in diagrams and graphical shapes, controlling how bold, thin, or prominent the circle border appears by setting a numeric pixel value. Enable customization of the circle’s line thickness to emphasize or de-emphasize shapes, fine-tune visual appearance, or modify the stroke width for diagram rendering and graphical design. Set, change, or control the outline thickness for circular shapes to achieve different visual effects, highlighting boundaries with varied pixel weights, border sizes, or stroke widths in diagramming or drawing applications.
</div>

#### Example

    <div id="diagram"></div>
    <script>
    $("#diagram").kendoDiagram({
      shapes: [{
        type: "circle",
        x: 100,
        y: 100,
        stroke: {
          color: "#ff6358",
          width: 4
        }
      }]
    });
    </script>

## Fields

### drawingElement `kendo.drawing.Circle`

The drawing element used to draw the circle.


<div class="meta-api-description">
How to access and manipulate the graphical shape of a circle in Kendo UI Diagrams? Access and control the core graphical shape used to render the circular element in diagrams, enabling inspection, attribute modification, event handler attachment, and transformation application. This feature supports querying or customizing the visual appearance, interaction handling such as hit-testing or pointer events, and integration with drawing APIs for advanced styling or animation of the circle shape. It allows developers to configure or override default rendering behavior, manipulate rendering primitives directly, and extend diagram visuals through direct access to the underlying drawable element after initialization.
</div>

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


<div class="meta-api-description">
How do I set the position of a circular element in a Kendo UI Diagram? Retrieve or set the coordinates of a circular diagram element, repositioning or moving it within the layout by specifying new X and Y values, passing position objects, or accessing current location data; control placement, adjust alignment, animate movement, update layout programmatically, or query the element’s exact position for dynamic interface design and interactive diagram manipulations.
</div>

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


<div class="meta-api-description">
How do I animate rotating a diagram element in Kendo UI by code? Apply a rotation transform to a diagram element programmatically by specifying the rotation angle, pivot point or center coordinates, and optional animation options such as duration and easing to control how the element spins or twists on its axis within a visual layout or graphics interface, enabling dynamic orientation changes, interactive rotations, or smooth animated turning effects on shapes and nodes after initialization.
</div>

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


<div class="meta-api-description">
How do I check if a diagram element is visible in Kendo UI? Control, check, or toggle the display state of a diagram element by setting or retrieving its visibility flag, enabling you to determine if the element is currently shown or hidden, adjust its rendering presence, manage user interaction availability, query visibility status as true or false, and dynamically show or conceal elements within the graphical diagram environment.
</div>

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
