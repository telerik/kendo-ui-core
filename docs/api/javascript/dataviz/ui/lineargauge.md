---
title: LinearGauge
page_title: Configuration, methods and events of Kendo UI DataViz LinearGauge
description: Manipulate the configuration options of linear gauge, change the border of the gauge area and its color, learn how to use methods.
res_type: api
component: gauges
---

# kendo.dataviz.ui.LinearGauge

## Configuration

### gaugeArea `Object`

The gauge area configuration options.
This is the entire visible area of the gauge.


<div class="meta-api-description">
How do I set up the overall visible area of a Kendo UI Linear Gauge? Set and control the overall visible canvas or container of a linear gauge, including background color or style, total width and height dimensions, padding around content, and border styling to manage spacing and appearance. Customize or configure the entire display area at initialization to define how much space the gauge occupies visually, adjust margins, control layout boundaries, and style the gauge’s outer region for precise visual presentation and user interface fitting. Enable setting the gauge’s full visual frame or bounding box properties to influence spacing, background design, and size constraints for a linear progress or measurement bar.
</div>

#### Example - set gaugeArea border width and color

    <div id="gauge-container">
      <div id="gauge"></div>
    </div>

    <script>
      $(function() {
        var value = $("#gauge-value").val();
        $("#gauge").kendoLinearGauge({
          pointer: {
            value: 28
          },
          gaugeArea: {
            border: {
              color: "green",
              width: "4px"
            }
          },
          scale: {
            majorUnit: 20,
            minorUnit: 2,
            min: -40,
            max: 60,
            vertical: true,
            ranges: [
              {
                from: -40,
                to: -20,
                color: "#2798df"
              }
            ]
          }
        });
      });
    </script>

    <style>
      #gauge-container {
        text-align: center;
        margin: 0 auto;
        background-size: contain;
        padding: 18px;
        width: 300px;
        height: 300px;
      }

      #gauge {
        height: 100%;
        display: inline-block;
        *display: inline;
        zoom: 1;
      }
    </style>

### gaugeArea.background `String`*(default: "white")*

The background of the gauge area.
Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
How do I change the background color of a linear gauge's gauge area in Kendo UI for jQuery? Configure or customize the background color of a linear gauge's gauge area using any valid CSS color format such as hex codes, RGB, RGBA, HSL, or named colors to control the visual styling and appearance of the gauge backdrop, enabling consistent theming and color adjustments during initialization or dynamic updates for enhanced UI design and seamless integration with different color schemes.
</div>

#### Example - set gaugeArea background color

    <div id="gauge-container">
      <div id="gauge"></div>
    </div>

    <script>
      $(function() {
        var value = $("#gauge-value").val();
        $("#gauge").kendoLinearGauge({
          pointer: {
            value: 28
          },
          gaugeArea: {
            background: "#c7d6d1",
          },
          scale: {
            majorUnit: 20,
            minorUnit: 2,
            min: -40,
            max: 60,
            vertical: true,
            ranges: [
              {
                from: -40,
                to: -20,
                color: "#2798df"
              }
            ]
          }
        });
      });
    </script>

    <style>
      #gauge-container {
        text-align: center;
        margin: 0 auto;
        background-size: contain;
        padding: 18px;
        width: 300px;
        height: 300px;
      }

      #gauge {
        height: 100%;
        display: inline-block;
        *display: inline;
        zoom: 1;
      }
    </style>


### gaugeArea.border `Object`

The border of the gauge area.


<div class="meta-api-description">
How do I customize the border of a Kendo UI linear gauge area? Set and customize the border around the linear gauge area including options to define color, thickness, style, dash patterns, and visibility to visually separate or highlight the gauge region within user interfaces, enable precise control over edge appearance to match design requirements, adjust border properties on initialization to create distinct outlines or subtle boundaries, control border styling such as solid, dashed, or dotted lines for better UI integration, and configure visual separators that enhance clarity and emphasize the gauge area in dashboards, charts, or component layouts.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 25
        },
        gaugeArea: {
            border: {
                color: "#4caf50",
                width: 2,
                dashType: "solid"
            }
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

### gaugeArea.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
How do I change the border color of a linear gauge's gauge area in Kendo UI? Configure the border color of the linear gauge’s gauge area to customize the frame appearance using any CSS-compatible color format such as hex codes, RGB, RGBA, or named color values, enabling control over the visual styling, theme matching, color adjustments, and frame highlighting for dashboards, data visualization components, or user interface design.
</div>

#### Example - set gaugeArea border color

    <div id="gauge-container">
      <div id="gauge"></div>
    </div>

    <script>
      $(function() {
        var value = $("#gauge-value").val();
        $("#gauge").kendoLinearGauge({
          pointer: {
            value: 28
          },
          gaugeArea: {
            border: {
              color: "green",
              width: "4px"
            }
          },
          scale: {
            majorUnit: 20,
            minorUnit: 2,
            min: -40,
            max: 60,
            vertical: true,
            ranges: [
              {
                from: -40,
                to: -20,
                color: "#2798df"
              }
            ]
          }
        });
      });
    </script>

    <style>
      #gauge-container {
        text-align: center;
        margin: 0 auto;
        background-size: contain;
        padding: 18px;
        width: 300px;
        height: 300px;
      }

      #gauge {
        height: 100%;
        display: inline-block;
        *display: inline;
        zoom: 1;
      }
    </style>

### gaugeArea.border.dashType `String`*(default: "solid")*

The dash type of the border.


<div class="meta-api-description">
How do I customize the border style of a linear gauge area in Kendo UI for jQuery? Configure the border style of the gauge area by setting the stroke pattern to solid, dashed, dotted, or other dash styles, enabling customization of the border appearance around the linear gauge. Adjust or control how the edges of the gauge area are visually rendered with varied dash patterns to achieve different border looks like dotted lines, dashed lines, or continuous strokes. Set or change the gauge area border line type during setup to emphasize or distinguish the gauge boundary with distinct stroke styles for design or clarity preferences. Customize the gauge outline by specifying border dash patterns to control whether the edge appears broken, connected, or with spaced dots for enhanced visual formatting.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 25
        },
        gaugeArea: {
            border: {
                color: "#ff9800",
                width: 3,
                dashType: "dash"
            }
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### gaugeArea.border.width `Number`*(default: 0)*

 The width of the border.


<div class="meta-api-description">
How to set the thickness of the border in Kendo UI Linear Gauge? Adjust or define the thickness, size, or width of the linear gauge’s outer edge or border area by specifying a numeric value to control how thick or thin the surrounding line or frame appears around the gauge component; customize, configure, or set the border edge thickness to enhance visual styling, control the outline prominence, or modify the rendered border line width for appearance and UI design purposes.
</div>

#### Example - set gaugeArea border width

    <div id="gauge-container">
      <div id="gauge"></div>
    </div>

    <script>
      $(function() {
        var value = $("#gauge-value").val();
        $("#gauge").kendoLinearGauge({
          pointer: {
            value: 28
          },
          gaugeArea: {
            border: {
              color: "green",
              width: 4
            }
          },
          scale: {
            majorUnit: 20,
            minorUnit: 2,
            min: -40,
            max: 60,
            vertical: true,
            ranges: [
              {
                from: -40,
                to: -20,
                color: "#2798df"
              }
            ]
          }
        });
      });
    </script>

    <style>
      #gauge-container {
        text-align: center;
        margin: 0 auto;
        background-size: contain;
        padding: 18px;
        width: 300px;
        height: 300px;
      }

      #gauge {
        height: 100%;
        display: inline-block;
        *display: inline;
        zoom: 1;
      }
    </style>

### gaugeArea.height `Number`

The height of the gauge area.  By default, the vertical gauge is 200px and
the horizontal one is 60px.


<div class="meta-api-description">
How do I adjust the height of a Kendo UI Linear Gauge? Adjust or configure the vertical size, height, or dimension of a linear gauge component to fit or resize within containers, layouts, or UI designs; control the gauge's vertical space allocation, scale the height dynamically, set explicit height values to manage the gauge's display area for both vertical and horizontal orientations, manage layout height constraints, and customize vertical sizing for responsiveness, embedding, or visual design purposes.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        gaugeArea: {
            height: 150
        },
        scale: {
            min: 0,
            max: 50,
            vertical: true
        }
    });
    </script>

### gaugeArea.margin `Number|Object`*(default: 5)*

 The margin of the gauge area.


<div class="meta-api-description">
How do I adjust the spacing around the gauge display area in a LinearGauge widget? Adjust or configure the spacing and padding around the gauge display area to fine-tune layout, control clearances, and manage the distance between the gauge’s visual elements and its container edges for optimal alignment and positioning; set margins or outer spacing to customize the gauge’s internal layout, border gaps, surrounding whitespace, or empty spaces to influence how the gauge content fits within its enclosing frame or parent container during rendering and initialization.
</div>

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 5px (by default)
    margin: { top: 1, left: 1 }

### gaugeArea.margin.top `Number`

The top margin of the gauge area.


<div class="meta-api-description">
How do I adjust the space above the gauge area in a Kendo UI Linear Gauge? Adjust the vertical spacing above the gauge area by setting the top margin to control layout alignment, padding, or offset within the linear gauge component, enabling precise customization of the distance between the top edge and the gauge elements such as scales, pointers, or labels, facilitating fine-tuning of component positioning, layout balance, and visual separation in dashboards, charts, or UI designs.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        gaugeArea: {
            margin: {
                top: 20
            }
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

### gaugeArea.margin.bottom `Number`

The bottom margin of the gauge area.


<div class="meta-api-description">
How do I set the bottom margin in Kendo UI LinearGauge? Control and customize the bottom spacing or padding below the gauge display area to manage the layout and visual separation between the gauge content and the container edge, enabling fine-tuning of component appearance and alignment by setting or adjusting the bottom margin, bottom padding, or space beneath the gauge drawing region during component configuration or initialization to achieve desired layout gaps and prevent overlap with edges or other UI elements.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        gaugeArea: {
            margin: {
                bottom: 15
            }
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

### gaugeArea.margin.left `Number`

The left margin of the gauge area.


<div class="meta-api-description">
How do I adjust the left margin in a Kendo UI LinearGauge component? Adjust or configure the horizontal left padding, spacing, or margin inside a linear gauge component to control the amount of empty space between the gauge visuals and the component’s left boundary, enabling precise layout tuning, alignment, or indentation of the gauge area from the left side, useful for UI customization, responsive design, or visual spacing adjustments within gauges.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        gaugeArea: {
            margin: {
                left: 25
            }
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

### gaugeArea.margin.right `Number`

The right margin of the gauge area.


<div class="meta-api-description">
How do I set the right margin of a linear gauge's display area in Kendo UI for jQuery? Control and adjust the right margin or spacing of a linear gauge’s display area to customize layout, set padding between the gauge and surrounding containers, tweak right-side whitespace, modify alignment with adjacent user interface elements, manage the right padding of the gauge area, and configure spacing to improve or fine-tune visual arrangement and responsiveness in dashboards or data visualization panels.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        gaugeArea: {
            margin: {
                right: 10
            }
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

### gaugeArea.width `Number`

The width of the gauge area.  By default the vertical gauge is 60px and
horizontal gauge is 200px.


<div class="meta-api-description">
How do I adjust the width of the linear gauge display area in Kendo UI? Adjust the width or horizontal size of the linear gauge display area by setting a specific pixel value to control how wide the gauge appears visually, enabling customization of the gauge track or scale width whether the gauge is oriented vertically or horizontally, allowing developers to configure the gauge layout space, set the measurement bar thickness, control the rendering width, and modify the gauge presentation dimensions for precise UI adjustments and responsive design requirements.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        gaugeArea: {
            width: 100
        },
        scale: {
            min: 0,
            max: 50,
            vertical: true
        }
    });
    </script>

### pointer `Array`

The pointer configuration options. It accepts an `Array` of pointers, each with it's own configuration options.


<div class="meta-api-description">
How to customize multiple needles in a linear Kendo UI gauge? Configure and control multiple gauge needles or indicators within a linear gauge by setting one or more pointer elements that define the position, value, style, appearance, and interactive behavior of each needle or marker; enable customizing needle properties such as color, shape, length, and dynamic updating, supporting arrays of pointers for displaying various values simultaneously, useful for visualizing multiple metrics, thresholds, or data points on the same linear scale with options to update, animate, or style each pointer independently.
</div>

#### Example - specify single pointer

    <div id="gauge"></div>
    <script>
	  $("#gauge").kendoLinearGauge({
        pointer: {
          value: 40
        }
      });
    </script>

#### Example - specify multiple pointers

	<div id="gauge"></div>
    <script>
	  $("#gauge").kendoLinearGauge({
        pointer: [{
          value: 20
        }, {
          value: 40
        }]
      });
    </script>

### pointer.border `Object`

The border of the pointer.


<div class="meta-api-description">
How do I customize the appearance of a linear gauge pointer's outline in Kendo UI for jQuery? Adjust and control the pointer outline appearance in linear gauges by setting the border color, thickness, width, stroke style, edge definition, or customizing the pointer’s frame and contour to achieve specific visual effects. Enable or configure the outline styling for gauge pointers including color settings, border width adjustments, line patterns, and stroke styles to refine visibility and styling of the indicator’s edge. Set or modify pointer outline properties such as border color, line thickness, style, and framing to emphasize or differentiate the gauge pointer visually in dashboards, charts, or measurement controls.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 25,
            border: {
                color: "#e91e63",
                width: 2,
                dashType: "solid"
            }
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

### pointer.border.color `String`

The color of the border.
Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
How to change pointer stroke color in Kendo UI LinearGauge using CSS color formats? Adjust the pointer stroke color in a linear gauge by configuring the border color using any valid CSS color format such as hex codes, rgb, rgba, hsl, or named colors to customize visual emphasis, match themes, accentuate pointer outlines, or control gauge appearance and styling for better UI consistency and design flexibility across different color schemes and design patterns.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 25,
            border: {
                color: "#2196f3",
                width: 1
            }
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

### pointer.border.dashType `String`*(default: "solid")*

The dash type of the border.


<div class="meta-api-description">
How to customize the pointer border dash style in Kendo UI Linear Gauge? Configure or customize the pointer border dash style, outline pattern, or stroke dash effect for the gauge needle or indicator in linear gauges, enabling control over how the pointer edge is drawn with dashed, dotted, solid, or custom dash patterns; adjust the border line style of the gauge pointer outline for enhanced visual distinction, border styling, or thematic consistency in dashboards and data visualizations by setting or modifying the pointer’s dash pattern, contour strokes, or segmented line effects around the pointer.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 25,
            border: {
                color: "#ff5722",
                width: 2,
                dashType: "dot"
            }
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### pointer.border.width `Number`*(default: 1)*

 The width of the border.


<div class="meta-api-description">
How do I adjust the thickness of a linear gauge's pointer border in Kendo UI? Adjust or configure the thickness, weight, size, or width of the pointer’s border or outline to control its visual prominence, edge clarity, or frame around the pointer indicator in linear gauges or progress bars, enabling customization of the pointer’s border stroke thickness or line width to make the pointer edges more or less pronounced.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 25,
            border: {
                color: "#9c27b0",
                width: 3
            }
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

### pointer.color `String`

The color of the pointer.


<div class="meta-api-description">
How do I change the color of the pointer in a Kendo UI LinearGauge? Control and customize the pointer fill color and outline in linear gauges by setting any valid CSS color format such as named colors, hexadecimal codes, RGB or RGBA values, enabling dynamic updates and styling adjustments for the gauge indicator's visual appearance, pointer highlight, marker color, or theme-based stroke modifications to match UI themes or enhance contrast and visibility in dashboards, charts, or graphical indicators.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 25,
            color: "#ff6b35"
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

### pointer.margin `Number|Object`*(default: 3)*

 The margin of the pointer.


<div class="meta-api-description">
How to adjust the spacing around a linear gauge pointer in Kendo UI for jQuery? Adjust the spacing or padding around a gauge pointer to control its distance from the scale, track, or adjacent elements; set, configure, or customize the outer margin or offset of the pointer to fine-tune its placement and avoid overlap, ensuring proper alignment and clear visual separation within linear gauge components using numeric values for margin size or spacing adjustments.
</div>

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 5px (by default)
    margin: { top: 1, left: 1 }

### pointer.opacity `Number`*(default: 1)*

 The opacity of the pointer.


<div class="meta-api-description">
How to make linear gauge pointer more transparent in Kendo UI? Adjust the transparency level or opacity of the pointer indicator in linear gauge visualizations by setting numeric values to control how transparent, translucent, or see-through the pointer appears. This setting enables customization of pointer visibility, opacity intensity, alpha blending, and transparency effect for gauges, allowing developers to configure or modify pointer clarity, faintness, or prominence within dashboards, UI components, or data displays during setup or runtime adjustments.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 25,
            color: "#f44336",
            opacity: 0.6
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

### pointer.shape `String`

The shape of the pointer.


<div class="meta-api-description">
How to customize the shape of a LinearGauge pointer in Kendo UI for jQuery? Configure the visual style and form of a gauge pointer by selecting or customizing the shape that defines its geometry, enabling developers to adjust needle or indicator appearance, change pointer design, set custom or predefined shapes, stylize the indicator for data visualization, control pointer rendering, modify gauge pointer visuals, or tailor the pointer’s look to fit UI themes and presentation requirements.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 25,
            shape: "arrow"
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

#### *"barIndicator"*

Specifies a filling bar indicator.

#### *"arrow"*

Specifies a arrow shape.

### pointer.size `Number`

The size of the pointer.


<div class="meta-api-description">
How do I adjust the size of the pointer in a Kendo UI Linear Gauge? Adjust the pointer’s dimensions, including its thickness, length, and overall size, to customize the visual appearance of the gauge indicator, enabling control over how prominent, large, or small the pointer looks within the linear gauge for styling, readability, emphasis, and tailored user interface design in dashboards or data visualization components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 25,
            shape: "arrow",
            size: 8
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

### pointer.track `Object`

The element arround/under the pointer.
(available only for 'barIndicator' shape)


<div class="meta-api-description">
How to style the track of a bar-style pointer in a Kendo UI Linear Gauge? Control the styling, rendering, and positioning of a background element beneath or surrounding a bar-style pointer in a linear gauge, enabling customization of the pointer’s track appearance, color, size, shape, and layout specifically for barIndicator-shaped pointers. Enable or configure visual track effects under pointer bars, adjust track placement and design elements to highlight or differentiate the pointer, and tailor the track background for clearer gauge visualization. This setting applies when using bar-like pointer shapes, allowing you to set or modify the pointer’s underlying track during gauge setup or initialization to enhance design, user interface clarity, or visual feedback in linear gauge components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 25,
            shape: "barIndicator",
            track: {
                color: "#e0e0e0",
                size: 5
            }
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

### pointer.track.border `Object`

The border of the track.


<div class="meta-api-description">
How to customize the border of a Linear Gauge pointer track in Kendo UI for jQuery? Customize and control the outline, border color, thickness, style, and dash pattern of the pointer's track in a linear gauge visualization, enabling precise styling and appearance adjustments during setup or runtime; adjust and set border properties to define the pointer’s track edge design, including solid or dashed outlines, border width, and coloration to enhance gauge pointer visibility and integration within dashboards or UI components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 25,
            shape: "barIndicator",
            track: {
                color: "#f5f5f5",
                border: {
                    color: "#9e9e9e",
                    width: 1,
                    dashType: "solid"
                }
            }
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

### pointer.track.border.color `String`

The color of the border. Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
How do I change the color of the LinearGauge pointer track border in Kendo UI for jQuery? Control and customize the color of the pointer track border using any valid CSS color format such as hex codes, RGB values, or named colors to align with your gauge's visual theme, enhance visibility, improve contrast for readability, and style the track outline for linear gauges. Adjust the border color to highlight, differentiate, or blend the pointer track within your UI, enabling precise design matching and dynamic color configurations for pointer tracks on linear gauges in various applications.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 25,
            shape: "barIndicator",
            track: {
                color: "#ffffff",
                border: {
                    color: "#2196f3",
                    width: 2
                }
            }
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

### pointer.track.border.dashType `String`*(default: "solid")*

The dash type of the border.


<div class="meta-api-description">
How to style the border of a linear gauge pointer track? Set or customize the stroke pattern of the pointer track border to create dashed, dotted, or solid outlines, allowing control over the visual style and emphasis of gauge pointers, including options to adjust line styles, border dash patterns, and track outlines for enhanced gauge display and design consistency in linear gauges.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 25,
            shape: "barIndicator",
            track: {
                color: "#ffffff",
                border: {
                    color: "#ff9800",
                    width: 2,
                    dashType: "dash"
                }
            }
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### pointer.track.border.width `Number`*(default: 1)*

 The width of the border.


<div class="meta-api-description">
How do I set the border width of the pointer track in a Kendo UI Linear Gauge? Control and customize the thickness or width of the outline around the pointer track in linear gauges, enabling you to set, configure, increase, or decrease the border weight or stroke size for pointer tracks to enhance visual clarity, design precision, and styling effects. Adjust how bold, thin, or prominent the border line appears, accommodating various UI requirements or aesthetic preferences related to gauge pointer highlighting, edge definition, or visual emphasis in linear measurement displays.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 25,
            shape: "barIndicator",
            track: {
                color: "#ffffff",
                border: {
                    color: "#4caf50",
                    width: 3
                }
            }
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

### pointer.track.color `String`

The color of the track.


<div class="meta-api-description">
How do I change the background color behind the pointer in a Kendo UI Linear Gauge? Customize the background color behind the pointer in a linear gauge by setting the track’s visual hue using standard CSS color formats such as hex codes, RGB, RGBA, or named colors; control and modify the pointer’s track color to enhance gauge appearance, adjust styling for visual clarity, match design themes, or highlight gauge progress with precise color settings behind the pointer element in measurement or progress indicators.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 25,
            shape: "barIndicator",
            track: {
                color: "#e3f2fd"
            }
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

### pointer.track.opacity `Number`

The opacity of the track.


<div class="meta-api-description">
How can I set the transparency of a linear gauge pointer track in Kendo UI? Control the transparency level or opacity of the gauge pointer’s track by specifying a numeric value to make the track fully visible, partially transparent, or completely hidden, enabling customization of the pointer’s visual emphasis, adjusting track brightness, blending, or clarity, and managing how strongly the pointer track stands out or blends with the gauge background for enhanced visibility or subtlety in linear gauge presentations.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 25,
            shape: "barIndicator",
            track: {
                color: "#ffeb3b",
                opacity: 0.5
            }
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

### pointer.track.size `Number`

The size of the track.


<div class="meta-api-description">
How can I adjust the thickness of the pointer track in a linear gauge? Control and adjust the thickness, width, or size of the pointer's background track in a linear gauge to customize visual emphasis, contrast, or styling; configure how thick or thin the pointer track appears for improved gauge readability, highlight, or design by setting its dimension or scale to match user interface needs or aesthetic preferences.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 25,
            shape: "barIndicator",
            track: {
                color: "#e8f5e8",
                size: 10
            }
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

### pointer.track.visible `Boolean`*(default: false)*

 The visibility of the track.


<div class="meta-api-description">
How do I make the pointer track visible on my Kendo UI Linear Gauge? Control the visibility of the pointer’s track on a linear gauge by enabling or disabling its display, toggling the pointer track on or off, showing or hiding the track line beneath the pointer, configuring whether the track is rendered within the gauge, and setting the pointer track’s presence for clear visual emphasis or minimal design. Use this setting to customize the pointer’s background path visibility, adjust the gauge’s appearance by displaying or concealing the pointer track element, and manage the pointer track indicator for precise user interface control.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 25,
            shape: "barIndicator",
            track: {
                color: "#f3e5f5",
                visible: true
            }
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

### pointer.value `Number`

The value of the gauge.


<div class="meta-api-description">
How do I set the value of a linear gauge pointer in Kendo UI for jQuery? Adjust or configure the pointer’s displayed measurement on a linear scale by setting or updating its numerical value to reflect current readings, data bindings, or dynamic inputs; control the pointer position to visualize specific measurements, real-time data changes, or initialization defaults, enabling the pointer to accurately represent values along the gauge’s range with precise placement and live updates for visual tracking and monitoring.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 35,
            color: "#3f51b5"
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

### renderAs `String`

Sets the preferred rendering engine.
If it is not supported by the browser, the Gauge will switch to the first available mode.

The supported values are:

* "svg" - renders the widget as inline SVG document, if available
* "canvas" - renders the widget as a Canvas element, if available.


<div class="meta-api-description">
How to configure rendering for Kendo UI linear gauge? Configure the rendering method for the linear gauge by selecting between vector-based SVG or pixel-based Canvas output, enabling control over graphics performance, compatibility, and visual quality; choose to render as scalable SVG inline graphics or use the Canvas element for efficient bitmap rendering, with automatic fallback to the available engine if the preferred format isn’t supported by the browser, allowing developers to set, switch, or prioritize rendering modes for better cross-browser display, optimization, and customization of the gauge visualization.
</div>

#### Example - Render as Canvas, if supported

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        renderAs: "canvas",
        pointer: {
            value: 50
        },
        scale: {
            min: 0,
            max: 100
        }
    });
    </script>

### scale `Object`

Configures the scale.


<div class="meta-api-description">
How to customize the numeric range settings for a LinearGauge in Kendo UI? Adjust numeric range settings, define start and end points, set major and minor tick intervals, format labels with custom styles or formats, control visual scale appearance including color-coded ranges, and configure how measurement increments and markers display within a linear gauge or similar scale component. Enable detailed scale customization for data visualization by setting range boundaries, tick density, label formatting preferences, and segment coloring to tailor numeric scale presentation and improve clarity and readability. Support various numeric scale configurations such as linear ranges, segmented zones, tick mark styles, and label text adjustments to precisely control the visual and functional aspects of the displayed scale.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 100,
            majorUnit: 20,
            minorUnit: 5,
            vertical: true,
            reverse: false
        }
    });
    </script>

### scale.line `Object`

Configures the axis line.


<div class="meta-api-description">
How to customize the appearance of the axis line in a Kendo UI Linear Gauge? Control and customize the axis line appearance in a linear gauge by setting color, width, opacity, dash patterns, or toggling its visibility to adjust how the scale line looks and behaves, enabling styling of the gauge’s main axis, modifying line aesthetics, enabling or disabling the axis line display, and tailoring visual presentation parameters like stroke style and transparency.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            line: {
                color: "#2196f3",
                width: 2,
                visible: true
            }
        }
    });
    </script>

### scale.line.color `String`*(default: "black")*

The color of the lines. Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
How do I change the color of measurement lines in a Kendo UI Linear Gauge? Adjust or customize the stroke or outline color of measurement or tick marks on a linear gauge or scale, including setting the exact shade using hexadecimal, RGB, RGBA, HSL, or standard CSS named color values to control the visual appearance of scale lines, grid lines, or divisions that indicate increments, enabling developers to configure and style these lines during initialization or dynamically for precise color alignment and enhanced gauge readability or thematic consistency.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            line: {
                color: "#4caf50"
            }
        }
    });
    </script>

### scale.line.dashType `String`*(default: "solid")*

The dash type of the line.


<div class="meta-api-description">
How do I customize the appearance of a linear gauge's scale line using Kendo UI for jQuery? Customize and control the stroke style of a linear gauge’s scale line by configuring dash patterns such as solid, dashed, or dotted lines to highlight, differentiate, or style the gauge scale visually. Adjust line patterns to create various visual effects on scale lines, enabling thematic designs, emphasis, or subtle distinctions by setting dash types, stroke styles, or line textures for clear or decorative gauge presentations.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            line: {
                color: "#ff9800",
                dashType: "dash"
            }
        }
    });
    </script>

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### scale.line.visible `Boolean`*(default: true)*

The visibility of the lines.


<div class="meta-api-description">
How do I show or hide scale lines in a Kendo UI Linear Gauge? Control the visibility of scale lines on a linear gauge to show, hide, enable, disable, or toggle these indicator lines for precise customization of the gauge’s scale appearance. Configure whether the scale tick marks or reference lines are rendered or omitted on initialization, adjusting the gauge’s visual layout and clarity by turning scale line display on or off with true or false settings. Manage scale line presence to influence gauge readability, styling, and overall rendering behavior, supporting developer needs for conditional rendering, UI refinement, or dynamic updates to scale line visibility.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            line: {
                visible: false
            }
        }
    });
    </script>

### scale.line.width `Number`*(default: 1)*

The width of the line..


<div class="meta-api-description">
How to change the thickness of a linear gauge scale line in Kendo UI for jQuery? Adjust the thickness or width of the scale line in a linear gauge, controlling how bold, thin, or prominent the scale border appears in visualizations and UI components; configure, set, or customize the line thickness, border size, or scale stroke width to refine appearance, improve readability, or match design requirements in dashboards, charting libraries, or graphical interfaces that utilize linear scale indicators and measurement bars.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            line: {
                color: "#9c27b0",
                width: 3
            }
        }
    });
    </script>

### scale.labels `Object`

Configures the scale labels.


<div class="meta-api-description">
How to customize the display of scale labels on a Kendo UI Linear Gauge? Control and customize the display of scale labels on a linear gauge by setting text content, formatting styles like font and color, adjusting label placement and visibility, applying custom templates or format strings, and managing how numeric or categorical labels appear along the scale, enabling configuration of label appearance, layout, styling, and formatting for clear and tailored visualization of gauge scales.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            labels: {
                color: "#2196f3",
                font: "12px Arial",
                visible: true
            }
        }
    });
    </script>

### scale.labels.background `String`

The background color of the labels.
Any valid CSS color string will work here, including hex and rgb


<div class="meta-api-description">
How do I change the background color behind scale labels in a Kendo UI Linear Gauge? Adjust or configure the background color behind scale labels to enhance visibility, contrast, and readability on linear gauges, supporting any CSS color format like named colors, hex codes, rgb or rgba values, and CSS custom properties; customize label backgrounds to improve clarity in various theming, styling, and UI design scenarios where controlling label backdrop color aids in better visualization and user interface refinement.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            labels: {
                background: "#fff3e0",
                color: "#e65100"
            }
        }
    });
    </script>

### scale.labels.border `Object`

The border of the labels.


<div class="meta-api-description">
How do I customize the borders of scale labels in a Kendo UI linear gauge? Configure and customize the outlines or borders of scale labels on a linear gauge by setting properties like border color, width, stroke style, and thickness to control label separation, visibility, and emphasis; adjust label edges for better clarity, styling, or visual distinction within gauge scales, enabling flexible control over label outlines, borders, strokes, and border appearance to enhance readability and presentation of scale labels in various visualization contexts.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            labels: {
                background: "#ffffff",
                border: {
                    color: "#2196f3",
                    width: 1,
                    dashType: "solid"
                }
            }
        }
    });
    </script>

### scale.labels.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
How do I change the color of the outline around scale labels in a Kendo UI Linear Gauge? Control and customize the color of the outline or border around scale labels on a linear gauge, enabling adjustment of label border colors using any CSS-compatible color format such as hex codes, RGB, RGBA, HSL, or named colors to enhance visibility, highlight labels, or match design themes; configure the label box stroke color to emphasize, differentiate, or style numeric or textual scale markings within the gauge’s scale area.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            labels: {
                border: {
                    color: "#4caf50",
                    width: 2
                }
            }
        }
    });
    </script>

### scale.labels.border.dashType `String`*(default: "solid")*

The dash type of the border.


<div class="meta-api-description">
How to customize the stroke pattern of scale label outlines in a linear gauge? Control and customize the stroke pattern or border style of scale label outlines on a linear gauge component, including setting dashed, dotted, or solid line styles to adjust how label edges appear, enabling developers to configure, style, or modify label borders with various dash types during initialization or runtime for enhanced visual distinction and presentation of scale markers.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            labels: {
                border: {
                    color: "#ff9800",
                    width: 1,
                    dashType: "dash"
                }
            }
        }
    });
    </script>

#### *"solid"*

Specifies a solid line.

#### *"dot"*

Specifies a line consisting of dots.

#### *"dash"*

Specifies a line consisting of dashes.

#### *"longDash"*

Specifies a line consisting of a repeating pattern of long-dash.

#### *"dashDot"*

Specifies a line consisting of a repeating pattern of dash-dot.

#### *"longDashDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot.

#### *"longDashDotDot"*

Specifies a line consisting of a repeating pattern of long-dash-dot-dot.

### scale.labels.border.width `Number`*(default: 0)*

 The width of the border.


<div class="meta-api-description">
How do I adjust the width of the border around scale labels in a Kendo UI linear gauge? Control and customize the thickness, size, or width of the border around scale labels in a linear gauge, enabling adjustment of the label outlines for enhanced visual emphasis, clearer delineation, or consistent styling. Configure numeric values to increase or decrease the boundary thickness of scale labels, set label border widths for better readability or design uniformity, and tailor the edge thickness to match interface themes or user interface requirements. Enable fine-tuning of label framing thickness to highlight or subdue scale markings, ensuring precise control over the visual weight and border prominence of gauge labels in various display contexts and design systems.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            labels: {
                border: {
                    color: "#e91e63",
                    width: 2
                }
            }
        }
    });
    </script>

### scale.labels.color `String`

The text color of the labels.
Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
How can I change the color of scale labels in a Kendo UI Linear Gauge? Adjust or customize the color of scale label text in a linear gauge or similar components by specifying any valid CSS color value such as hex codes, RGB, RGBA, HSL, or named colors. Control, set, configure, or change the label font hues, text appearance, or label coloring to match design themes, improve readability, or highlight specific value markers on gauge scales. Support for color customization enables fine-tuning label visuals in dashboards, charts, or UI components that render numeric scales. Use color customization for scale markers, labels, or tick text to better integrate with overall styling or accessibility requirements.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            labels: {
                color: "#9c27b0"
            }
        }
    });
    </script>

### scale.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.


<div class="meta-api-description">
How to customize font styles for scale labels in Kendo UI Linear Gauge? Adjust and configure the typography, font family, size, style, weight, and appearance of scale labels on a linear gauge, enabling control over label text design, styling, and readability for gauge scales. Set, customize, or modify scale label fonts for linear measurement indicators, gauge tick labels, numeric scale text, and axis labels to ensure precise visual presentation and branding consistency across different user interfaces and dashboards. Control text styling properties such as bold, italic, font size, and specific typefaces applied to labels that annotate the scale, enhancing clarity, emphasis, and overall UI aesthetics in linear gauge components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            labels: {
                font: "16px Verdana",
                color: "#3f51b5"
            }
        }
    });
    </script>

### scale.labels.format `String`

The format of the labels.


<div class="meta-api-description">
How to customize numeric formats for scale labels in a Kendo UI Linear Gauge? Adjust or customize the appearance and formatting of scale labels on a linear gauge by setting numeric formats, date/time patterns, precision levels, display units, decimal places, currency symbols, or custom string templates to control how values are shown on the gauge’s scale axis, enabling tailored label rendering for clearer data visualization and presentation in dashboards, reports, and user interfaces.
</div>

#### Example

    <div id="linear-gauge"></div>
    <script>
    $("#linear-gauge").kendoLinearGauge({
        scale: {
            labels: {
                // set the format to currency
                format: "C"
            }
        }
    });
    </script>

### scale.labels.margin `Number|Object`*(default: 5)*

 The margin of the labels.


<div class="meta-api-description">
How do I adjust the spacing between scale labels in a Kendo UI Linear Gauge? Adjust or configure the spacing and distance around scale labels in a linear gauge, controlling the margin to increase or decrease the gap between labels and nearby elements such as ticks, scale lines, or other labels. Manage label padding, set label offsets, control label separation, and customize how close or far labels appear relative to the scale ticks or adjacent labels in linear gauge visualizations. Optimize the label layout by modifying margins to prevent overlap, improve readability, and fine-tune label positioning within the gauge scale interface.
</div>

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 5px (by default)
    margin: { top: 1, left: 1 }

### scale.labels.margin.top `Number`

The top margin of the labels.


<div class="meta-api-description">
How do I adjust the space above linear gauge scale labels in Kendo UI for jQuery? Control the vertical spacing above gauge scale labels by setting the top margin to increase or decrease the gap above numerical or textual labels on a linear scale, enabling precise adjustment of label positioning, layout customization, label padding, and alignment for clearer visualization and improved readability in charts or dashboards.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            labels: {
                margin: {
                    top: 10
                }
            }
        }
    });
    </script>

### scale.labels.margin.bottom `Number`

The bottom margin of the labels.


<div class="meta-api-description">
How can I adjust the space between the scale labels and the bottom of a linear gauge in Kendo UI for jQuery? Adjust vertical spacing below scale labels for linear gauges by setting the bottom margin in pixels to control label placement, avoid overlapping with ticks or adjacent interface elements, fine-tune label alignment and positioning, customize label margins during initialization or runtime, manage label distance from scale marks, and configure label layout to enhance readability and prevent clutter in gauge visualizations.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            labels: {
                margin: {
                    bottom: 8
                }
            }
        }
    });
    </script>

### scale.labels.margin.left `Number`

The left margin of the labels.


<div class="meta-api-description">
How to adjust the left margin of scale labels in a Kendo UI LinearGauge? Adjust the left margin or left padding of scale labels within a gauge or linear scale component to control label spacing, alignment, and positioning, ensuring labels do not overlap or crowd the left side; set or configure left spacing during initialization or dynamically to shift labels inward or outward, manage label layout, fine-tune horizontal label offset, control distance from the label’s left edge to surrounding elements, and customize label indentation or horizontal padding for clearer, well-aligned scale markings in chart or gauge visualizations.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            labels: {
                margin: {
                    left: 12
                }
            }
        }
    });
    </script>

### scale.labels.margin.right `Number`

The right margin of the labels.


<div class="meta-api-description">
How do I adjust the right margin of labels in a Kendo UI Linear Gauge? Adjust, configure, or set the horizontal spacing or right-side padding of scale labels on gauges, controlling the margin to prevent label overlap, fine-tune alignment, or ensure proper spacing to the right of each numeric or text label within linear or scale-based visual components during initialization or runtime.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            labels: {
                margin: {
                    right: 6
                }
            }
        }
    });
    </script>

### scale.labels.padding `Number | Object`*(default: 0)*

 The padding of the labels.


<div class="meta-api-description">
How to adjust label spacing in Kendo UI Linear Gauge scales? Adjust spacing or margin around scale labels, control padding between label text and edges, set or customize label spacing to prevent overlap or crowding on linear gauge scales, configure label layout and alignment for clarity, adjust label margins or inner spacing in scale displays, control visual separation around each label to improve readability, fine-tune buffer space inside or outside label boundaries for linear scales, manage label padding to ensure neat label presentation and avoid collision in gauge interfaces.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            labels: {
                padding: 5,
                background: "#f5f5f5"
            }
        }
    });
    </script>

### scale.labels.padding.top `Number`

The top padding of the labels.


<div class="meta-api-description">
How do I adjust the space above labels in a Kendo UI Linear Gauge? Adjust the vertical spacing or top margin above scale labels in a linear gauge or chart by configuring the top padding for label placement, enabling control over label alignment, distance from the scale line, or spacing to prevent overlap and improve readability. Customize or set the upper padding around numeric or textual scale markers to refine label layout, optimize label position vertically, control whitespace above labels, and enhance gauge visualization formatting. This customization supports tuning label display, vertical offset, or padding above scale annotations in gauges, meters, or linear indicator components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            labels: {
                padding: {
                    top: 4
                },
                background: "#e8f5e8"
            }
        }
    });
    </script>

### scale.labels.padding.bottom `Number`

The bottom padding of the labels.


<div class="meta-api-description">
How do I adjust the padding below labels in a Kendo UI Linear Gauge scale? Adjust vertical spacing below gauge scale labels to customize label layout, control padding beneath scale text, manage distance to avoid overlaps, fine-tune label positioning on linear gauges, set bottom margin or whitespace under scale labels for clarity and readability, configure label padding space along the gauge scale to improve visual separation, enable precise vertical offset of labels to enhance overall gauge appearance and prevent label crowding or clipping.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            labels: {
                padding: {
                    bottom: 6
                },
                background: "#fff3e0"
            }
        }
    });
    </script>

### scale.labels.padding.left `Number`

The left padding of the labels.


<div class="meta-api-description">
How to adjust left padding of scale labels in Kendo UI Linear Gauge? Configure and control the horizontal left padding or spacing of scale labels on a gauge or linear scale to adjust alignment, prevent label overlap, set distance between label text and container edges, fine-tune label positioning and layout spacing, customize label indentation, and manage horizontal gaps on scales or charts for clearer, neater displays and precise visual adjustments.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            labels: {
                padding: {
                    left: 8
                },
                background: "#f3e5f5"
            }
        }
    });
    </script>

### scale.labels.padding.right `Number`

The right padding of the labels.


<div class="meta-api-description">
How do I adjust the spacing between scale labels on a Kendo UI Linear Gauge? Adjust and configure the horizontal spacing and alignment of scale labels by setting the right padding or margin on the right side of labels within a linear gauge or similar UI component, enabling control over label positioning, spacing adjustments, text padding, layout fine-tuning, and visual alignment for improved readability and aesthetics in gauge scales or chart axes.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            labels: {
                padding: {
                    right: 7
                },
                background: "#e1f5fe"
            }
        }
    });
    </script>

### scale.labels.template `String|Function`

The label template.
Template variables:


*   **value** - the value


<div class="meta-api-description">
How to customize label display on a Kendo UI Linear Gauge scale? Adjust, format, or transform scale labels on a linear gauge by setting custom templates that control how each numeric label value is displayed, enabling developers to format, style, localize, or manipulate label text output dynamically based on the label’s numeric content; supports defining template expressions or functions to customize label rendering, text formatting, value substitution, and conditional display for enhanced control over gauge scale labeling.
</div>

#### Example

    <div id="linear-gauge"></div>
    <script>
      // gauge initialization
    $("#linear-gauge").kendoLinearGauge({
        scale: {
            labels: {
                // labels template
                template: "#= value #%"
            }
        }
    });
    </script>

### scale.labels.visible `Boolean`*(default: true)*

 The visibility of the labels.


<div class="meta-api-description">
How to hide numeric labels on a Kendo UI linear gauge scale? Control the visibility of numeric or textual labels along the scale in a linear gauge, enabling you to show, hide, enable, disable, toggle, or configure tick mark annotations or value tags on the gauge’s scale for clearer visualization or minimalistic display. Adjust label rendering for scale ticks, customize display of measurement indicators, and set whether scale marks include descriptive labels or remain unlabeled depending on user preference, dashboard design, or data presentation needs. This covers use cases like turning off clutter by hiding scale labels, enabling label visibility for precise reading, or dynamically toggling scale annotations in UI controls and data visualization tools.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            labels: {
                visible: false
            }
        }
    });
    </script>

### scale.majorTicks `Object`

Configures the scale major ticks.


<div class="meta-api-description">
How can I customize the appearance of major tick marks on a Kendo UI LinearGauge scale? Control and customize the appearance and behavior of large tick marks on a linear scale by setting their visibility, spacing intervals or steps between ticks, size or length dimensions, color, thickness, line style, and alignment precisely with the numeric or value scale. Adjust how major ticks are rendered, positioned, and spaced on the gauge or scale to achieve specific layout, design, or measurement accuracy preferences, including enabling or disabling ticks, configuring tick density, spacing frequency, and visual style for clear scale demarcation, step increments, or measurement markers tailored to various display or data visualization needs.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            majorTicks: {
                color: "#2196f3",
                size: 10,
                width: 2,
                visible: true
            }
        }
    });
    </script>

### scale.majorTicks.color `String`

The color of the major ticks.
Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
How do I change the color of major tick marks on a Kendo UI Linear Gauge's scale? Adjust or customize the coloring of prominent tick marks along a linear gauge’s scale by setting or modifying the major tick color with any valid CSS color format such as hex codes, RGB values, or named colors. Enable styling, theming, or visual differentiation of the primary scale markers, change the accent or highlight colors of major ticks for better visibility or design consistency, configure the main tick line colors, and control how these key scale indicators appear in dashboards or data visualization components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            majorTicks: {
                color: "#4caf50"
            }
        }
    });
    </script>

### scale.majorTicks.size `Number`

The major tick size.
This is the length of the line in pixels that is drawn to indicate the tick on the scale.


<div class="meta-api-description">
How do I change the size of major tick marks in a Kendo UI Linear Gauge? Adjust the length, size, or pixel value of primary or major tick marks on a linear scale or gauge to control how long the major divisions appear visually; set, configure, or customize the thickness, extent, or measurement in pixels for main scale ticks, big ticks, or significant markings on the gauge's axis or ruler for precise display of value intervals during initialization or runtime to enhance readability and scale clarity.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            majorTicks: {
                size: 12,
                color: "#ff9800"
            }
        }
    });
    </script>

### scale.majorTicks.visible `Boolean`*(default: true)*

 The visibility of the major ticks.


<div class="meta-api-description">
How to make major tick marks visible in Kendo UI LinearGauge scale? Toggle the visibility of primary or major tick marks on a linear gauge scale, enabling configuration to show or hide prominent scale divisions, set or control the display of main graduation marks, adjust the appearance of key scale indicators, manage the rendering of central tick lines, enable or disable major scale ticks during initialization or runtime, customize whether primary scale ticks appear on the gauge for clearer measurement references, and configure the visibility of main notches or markers that segment the scale for easier reading and precise value interpretation.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            majorTicks: {
                visible: false
            }
        }
    });
    </script>

### scale.majorTicks.width `Number`*(default: 0.5)*

 The width of the major ticks.


<div class="meta-api-description">
How do I adjust the thickness of major tick marks on a Kendo UI linear gauge? Adjust the thickness, width, or boldness of primary tick marks or major scale lines on linear gauges to enhance visibility, clarity, or visual styling. Configure, control, or set the numeric value that determines how thick or thin the major ticks appear, improving readability, customization, and precise display of scale graduations on linear measurement components. This feature supports modifying the prominence of main scale indicators for better user experience, calibration marks, or graphic design preferences.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            majorTicks: {
                width: 3,
                color: "#9c27b0"
            }
        }
    });
    </script>

### scale.majorUnit `Number`

The interval between major divisions.


<div class="meta-api-description">
How to set the interval between major ticks in Kendo UI Linear Gauge? Adjust or configure the numeric interval, step size, or spacing between major ticks, divisions, or labels on a linear scale to customize the distribution and frequency of primary tick marks and their corresponding labels. Control, set, or define how often major scale markers appear, enabling precise tuning of label intervals, tick spacing, and division steps for linear measurement displays or gauges. This setting helps in modifying the distance between prominent scale markers to improve readability, visualization clarity, or match specific measurement units.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 100,
            majorUnit: 25
        }
    });
    </script>

### scale.max `Number`*(default: 100)*

 The maximum value of the scale.


<div class="meta-api-description">
How do I set the maximum value for a linear gauge's scale in Kendo UI? Configure or set the maximum numeric value or upper bound for a gauge’s scale to control the highest limit displayed on the linear gauge, influencing the scale range, tick marks, pointer positions, and visual range boundaries. Adjust, define, or update the top end of the measurement scale to set the scale’s max value, maximum threshold, or upper limit for rendering scale elements, ticks, markers, pointers, or progress indicators programmatically or at initialization to customize the displayed data range or measurement boundaries.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 75
        },
        scale: {
            min: 0,
            max: 80
        }
    });
    </script>

### scale.min `Number`*(default: 0)*

 The minimum value of the scale.


<div class="meta-api-description">
How do I set the minimum value on a Kendo UI linear gauge scale? Define the minimum numeric value or lower bound of a linear gauge or scale to establish the starting point of the displayed range, control tick mark placement, adjust label boundaries, set the initial value limits, configure the scale start, clamp values at the lower end, customize range settings, and influence how data is visually mapped from the minimum threshold upward. This setting helps set or limit the smallest measurable or visible number on continuous scales, sliders, or progress indicators, enabling precise control over range initialization and coordinate mapping for visualization and data input components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 25
        },
        scale: {
            min: 10,
            max: 50
        }
    });
    </script>

### scale.minorTicks `Object`

Configures the scale minor ticks.


<div class="meta-api-description">
How can I customize the appearance of minor ticks in a Kendo UI Linear Gauge scale? Configure and customize small tick marks along the linear gauge's scale by controlling their visibility, spacing, frequency, size, color, step intervals, and appearance settings. Adjust minor tick marks to fine-tune gauge scale detail, enable or disable them, set spacing intervals, control styling such as color and length, and modify how frequent and prominent these sub-divisions appear on linear measurement displays, rulers, or progress bars for precise scale calibration and visual clarity.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            minorTicks: {
                color: "#9e9e9e",
                size: 5,
                width: 1,
                visible: true
            }
        }
    });
    </script>

### scale.minorTicks.color `String`

The color of the minor ticks.
Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
How do I change the color of minor ticks on a Kendo UI Linear Gauge? Adjust the color of small or minor tick marks on a linear gauge, enabling customization of gauge tick appearance to align with branding, themes, or design preferences by specifying any valid CSS color format such as hexadecimal, RGB, or named colors. Control and configure the aesthetic of subtle scale markings for enhanced visual distinction, including setting or changing tick mark colors during setup, initialization, or runtime styling. Enable consistent styling of minor scale graduations by defining tick color to improve readability, contrast, and integration within diverse user interfaces, dashboards, or data visualization layouts.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            minorTicks: {
                color: "#607d8b"
            }
        }
    });
    </script>

### scale.minorTicks.size `Number`

The minor tick size.
This is the length of the line in pixels that is drawn to indicate the tick on the scale.


<div class="meta-api-description">
How do I adjust the size of minor tick marks in a Kendo UI LinearGauge? Adjust, configure, or set the length, size, or pixel measurement of minor tick marks, subdivisions, or small scale indicators on a linear gauge or scale visualization to control their visual prominence, spacing, and appearance. Enable customization of minor scale ticks, small step markers, or incremental tick lengths to enhance readability, detail, or precision in gauge displays or progress bars. Control the pixel length, thickness, or extent of minor graduations, fine markers, or small ticks to influence how subtle intervals are rendered along a scale or measurement axis.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            minorTicks: {
                size: 3,
                color: "#795548"
            }
        }
    });
    </script>

### scale.minorTicks.visible `Boolean`*(default: true)*

 The visibility of the minor ticks.


<div class="meta-api-description">
How can I show minor ticks on a Kendo UI Linear Gauge? Control the visibility and display of small incremental tick marks along a linear gauge’s scale, enabling or disabling fine-grained measurement indicators such as minor ticks or sub-divisions for enhanced precision, detail, or granularity on scales, rulers, or progress bars, with options to show, hide, render, or suppress these smaller ticks during setup or configuration to customize the appearance and readability of measurement intervals, graduations, or scale markers on linear gauge components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            minorTicks: {
                visible: false
            }
        }
    });
    </script>

### scale.minorTicks.width `Number`*(default: 0.5)*

 The width of the minor ticks.


<div class="meta-api-description">
How to adjust the thickness of minor tick marks in a Kendo UI Linear Gauge? Set or customize the thickness, line width, or stroke size of minor tick marks on a linear gauge or scale to adjust their visual weight, density, and clarity for better readability and precise display. Control how thick or thin the small scale increments appear, enabling fine-tuning of minor tick line size for aesthetic balance, visual distinction, and optimal scaling precision in gauges, meters, or measurement controls. Adjusting minor tick thickness helps with clarity in detailed readings, improves user interface design, and allows dynamic configuration of small uniform scale markers on linear indicators.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            minorTicks: {
                width: 2,
                color: "#ffc107"
            }
        }
    });
    </script>

### scale.minorUnit `Number`

The interval between minor divisions.


<div class="meta-api-description">
How do I adjust the interval of minor tick marks on a Kendo UI Linear Gauge scale? Configure the interval and spacing of minor tick marks on a linear scale to adjust the density of small divisions between major increments, controlling the frequency and placement of subtle scale markings for enhanced visual accuracy and detailed measurement granularity. Set, customize, or fine-tune the numeric step size between minor ticks to manage how finely the scale subdivisions appear, enabling precise calibration of minor units on linear gauges or similar scale components. Adjust this setting to control scale detail, tick distribution, or tick interval spacing during initialization or runtime setups to improve readability, layout, or measurement precision in applications requiring scaled visualizations.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            majorUnit: 10,
            minorUnit: 2
        }
    });
    </script>

### scale.mirror `Boolean`

Mirrors the scale labels and ticks.
If the labels are normally on the left side of the scale, mirroring the scale will render them to the right.


<div class="meta-api-description">
How do I reverse scale labels in Kendo UI LinearGauge? Adjust the orientation and positioning of scale labels and tick marks by reversing or reflecting them to the opposite side of a gauge or axis, enabling control over label placement such as displaying ticks and numbers on the right instead of the left, flipping scale markings for mirrored layouts, configuring the visual alignment of scales for better readability in charts, and customizing the direction and side of measurement indicators in linear gauges or similar graphical components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            mirror: true,
            vertical: true
        }
    });
    </script>

### scale.ranges `Array`

The ranges of the scale.


<div class="meta-api-description">
How to customize colored segments in Kendo UI Linear Gauge scale? Define and customize colored segments or zones along a linear scale to visually highlight specific value intervals, thresholds, or ranges on gauges, enabling control over start and end points, colors, and styling for each segment. Configure and set up multiple colored bands, markers, or range highlights that represent critical, safe, warning, or alert ranges to enhance data visualization and status indication on linear gauges. Adjust and enable segmented scale coloring to represent variable thresholds, limits, performance levels, or categorized ranges within a continuous linear measurement display.
</div>

#### Example

    <div id="linear-gauge"></div>
    <script>
        $("#linear-gauge").kendoLinearGauge({
          scale: {
            ranges: [{
              from: 10,
              to: 20,
              color: "green"
            }]
          }
        });
    </script>

### scale.ranges.from `Number`

The start position of the range in scale units.


<div class="meta-api-description">
How do I set the starting point of a colored range on a Kendo UI LinearGauge? Configure the starting point of a colored or highlighted segment on a linear scale by specifying the initial value or threshold where a range begins within measurement units, enabling control over gradient stops, color intervals, and range boundaries for visualizing data thresholds, limits, or zones on a gauge or progress indicator.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            ranges: [{
                from: 0,
                to: 20,
                color: "#4caf50"
            }]
        }
    });
    </script>

### scale.ranges.to `Number`

The end position of the range in scale units.


<div class="meta-api-description">
How do I control the end position of a colored range on a Kendo UI LinearGauge? Control or configure the end position or upper limit of a colored range, band, or threshold on a linear scale gauge by setting the final value where the highlight, indicator, or scale segment stops. Adjust or define the upper bound, maximum point, or terminal value of a range on a linear gauge’s scale to specify precisely where color coding, thresholds, or range markers conclude within the gauge units. Enable fine-tuned scale range endings, set range boundaries, and customize where visual segments finish on linear measurement scales in dashboards, monitoring widgets, or data visualizations.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            ranges: [{
                from: 20,
                to: 40,
                color: "#ff9800"
            }]
        }
    });
    </script>

### scale.ranges.opacity `Number`

The opacity of the range.


<div class="meta-api-description">
How to set transparency for specific ranges in a LinearGauge scale? Adjust the transparency level of a gauge scale segment to highlight or fade specific value ranges, enabling control over how visible or subdued parts of the scale appear by setting numerical opacity values typically between fully transparent and fully opaque; use this to configure visual emphasis, layering effects, visibility strength, or subtle shading on measurement intervals within linear or bar gauges for clearer data presentation and readability.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            ranges: [{
                from: 10,
                to: 30,
                color: "#f44336",
                opacity: 0.7
            }]
        }
    });
    </script>

### scale.ranges.color `String`

The color of the range.
Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
How to set different colors for various ranges on a Kendo UI Linear Gauge scale? Customize the fill color of distinct value ranges or segments on a linear gauge scale to visually highlight or differentiate bands using any CSS-compatible color input such as hex codes, RGB, RGBA, HSL, named color keywords, or CSS variables; configure or set the color appearance of gauge ranges to enhance readability, improve data visualization, or match design themes by controlling range palette, shading, and fill styling for specific measurement intervals.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            ranges: [{
                from: 35,
                to: 50,
                color: "#9c27b0"
            }]
        }
    });
    </script>

### scale.rangePlaceholderColor `String`

The default color for the ranges.


<div class="meta-api-description">
How do I set the default fill color for scale range placeholders in a Kendo UI linear gauge? Configure the default fill color for scale range placeholders in a linear gauge, controlling the background or fallback color applied when specific ranges lack individual colors, enabling customization of the visual appearance, adjusting placeholder shades, setting fallback or default colors for ranges, modifying scale decorations, and managing how uncolored segments appear within the gauge’s range visualization.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            ranges: [{
                from: 10,
                to: 20,
                color: "#2196f3"
            }],
            rangePlaceholderColor: "#e0e0e0"
        }
    });
    </script>

### scale.rangeSize `Number`

The width of the range indicators.


<div class="meta-api-description">
How do I adjust the thickness of range indicators in a Kendo UI linear gauge? Adjust the thickness, width, or size of range indicators along the scale to customize the visual prominence of scale segments or ranges in a linear gauge. Configure or set the dimension, breadth, or visual weight of scale ranges to control how thick or wide the colored or highlighted sections appear, supporting use cases involving scaling, styling, appearance tweaking, or emphasizing ranges within gauge components. Enable precise control over the range bar thickness to enhance clarity, readability, or aesthetic design of scales and range markers in linear gauges or similar visualization tools.
</div>

#### Example

    <div id="linear-gauge"></div>
    <script>
        $("#linear-gauge").kendoLinearGauge({
          scale: {
            ranges: [{
              from: 10,
              to: 20,
              color: "green"
            }],
            rangeSize: 20
          }
        });
    </script>

### scale.reverse `Boolean`*(default: false)*

Reverses the axis direction - values increase from right to left and from top to bottom.


<div class="meta-api-description">
How do I reverse the numeric direction of a linear gauge scale in Kendo UI for jQuery? Adjust or invert the numeric direction of a linear gauge or scale axis to switch the progression of values from standard left-to-right or bottom-to-top orientation to right-to-left or top-to-bottom, enabling customization for reversed layouts, flipped scales, inverted numeric ordering, or right-to-left reading order in visual gauges and linear indicators.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            reverse: true
        }
    });
    </script>

### scale.vertical `Boolean`

The position of the gauge.


<div class="meta-api-description">
How do I adjust the scale orientation in a Kendo UI Linear Gauge to display vertically? Adjust the orientation and placement of the scale along the vertical axis inside a linear gauge, enabling control over whether the scale appears aligned vertically, positioned upright, rotated, or flipped within the gauge's layout. Configure the scale's vertical alignment, set the direction of measurement markings in a top-to-bottom or bottom-to-top manner, enable precise vertical scaling orientation, and control how the scale’s labels and ticks are oriented along the height of the gauge. This supports customization of vertical scale positioning, alignment adjustments for readability, and setting the scale to display in vertical mode or rotate accordingly within the linear gauge component.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50,
            vertical: false
        }
    });
    </script>

### theme `String` *(default: "sass")*

The gauge theme. With versions prior to R1 2023 this can be either the respective LESS theme from the list below or "sass".
When set to "sass" the gauge will read the variables from the [Sass-based themes]({% slug sassbasedthemes_kendoui %}).

Note: Since Q2 2024 release, the default value for the `theme` property is "sass" instead of "default". It is recommended to use "sass" with version Q2 2024 or later.

The supported values are:

* "sass"
* "black"
* "blueopal"
* "bootstrap"
* "default"
* "highcontrast"
* "metro"
* "metroblack"
* "moonlight"
* "silver"
* "uniform"


<div class="meta-api-description">
How do I change the theme of a Kendo UI Linear Gauge? Control and configure the visual style, appearance, and design theme of a linear gauge component by selecting predefined color schemes, styling templates, or design frameworks such as Sass or LESS themes. Enable switching between different UI skins like black, blueopal, bootstrap, highcontrast, metro, moonlight, silver, or uniform to customize colors, spacing, and overall component look and feel on initialization. Customize or override default visual parameters by applying Sass-based styling variables or legacy LESS themes to achieve consistent branding, accessibility modes, or aesthetic preferences. Set or change the gauge’s theme for adaptive styling, user interface theming, color palettes, responsive layout, and design system integration consistent with modern frontend frameworks and component libraries.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        theme: "bootstrap",
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

### transitions `Boolean`*(default: true)*

A value indicating if transition animations should be played.


<div class="meta-api-description">
How to disable animations in Kendo UI Linear Gauge updates? Configure or disable animated transitions for linear gauge updates, controlling smooth animations during value changes, redraws, or UI refreshes; optimize user interface responsiveness by enabling fluid motion effects or improve application performance by turning off animation playback for update rendering and visual changes.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        transitions: false,
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50
        }
    });
    </script>

## Methods

### allValues

Allows setting or getting multiple Gauge values at once.


<div class="meta-api-description">
How do I update multiple pointer values on a linear gauge at once? Retrieve or configure multiple pointer values on a linear gauge simultaneously by accessing, setting, or updating an array of values in one operation, enabling batch updates, synchronization of gauge indicators, reading current pointers, or applying programmatic changes across all gauge markers for scenarios like animations, data bindings, or multi-pointer adjustments.
</div>

#### Parameters

##### values `Array`
An array of values to be set.

#### Returns
`Array` An array of the Gauge pointer values will be returned if no parameter is passed.

#### Example - setting multiple values
    <div id="gauge"></div>
    <script>
	$("#gauge").kendoLinearGauge({
        pointer: [{
            value: 20
        }, {
            value: 40
        }]
    });

    var gauge = $("#gauge").data("kendoLinearGauge");
    gauge.allValues([60, 10]);
    </script>

#### Example - retrieving all values
    <div id="gauge"></div>
    <script>
	$("#gauge").kendoLinearGauge({
        pointer: [{
            value: 20
        }, {
            value: 40
        }]
    });

    var gauge = $("#gauge").data("kendoLinearGauge");
    var allValues = gauge.allValues();
    </script>

### destroy

Prepares the Gauge for safe removal from the DOM.

Detaches event handlers and removes data entries in order to avoid memory leaks.


<div class="meta-api-description">
How do I properly remove a Kendo UI LinearGauge widget from my web page to avoid memory leaks? remove or disable a visual gauge widget and properly clean up its resources by terminating event listeners, clearing internal data, and freeing allocated memory to avoid residual effects or memory leaks when dynamically removing or replacing the gauge element in a web application; this encompasses safely detaching handlers, resetting state, and ensuring no leftover references persist after the component lifecycle ends to maintain optimal application performance during component teardown, reinitialization, or DOM manipulations involving gauge removal or replacement.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 30
        },
        scale: {
            min: 0,
            max: 50
        }
    });

    var gauge = $("#gauge").data("kendoLinearGauge");
    gauge.destroy();
    </script>

### exportImage
Exports the Gauge as an image.
The result can be saved using [kendo.saveAs](/api/javascript/kendo/methods/saveas).

The export operation is asynchronous and returns a [promise](https://api.jquery.com/Types/#Promise).
The promise will be resolved with a PNG image encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).


<div class="meta-api-description">
How to export Kendo UI linear gauge as image? Generate or create a PNG image export of the linear gauge visualization for downloading, saving, archiving, or further image manipulation by asynchronously rendering the gauge into a base64-encoded data URI format; enable exporting gauge graphics as image files, retrieve image data suitable for saving, sharing, or embedding, and convert the visual gauge output into downloadable bitmap formats using promises or asynchronous calls.
</div>

#### Parameters

##### options `Object` *(optional)*
Parameters for the exported image.

##### options.width `String`
The width of the exported image. Defaults to the Gauge width.

##### options.height `String`
The height of the exported image. Defaults to the Gauge height.

#### Returns
`Promise` A promise that will be resolved with a PNG image encoded as a Data URI.

#### Example - Exporting a Gauge to an image

    <div id="gauge"></div>
    <script>
        $("#gauge").kendoLinearGauge({
	        pointer: {
	            value: 50
	        },
	        scale: {
	            min: 0,
	            max: 100
	        }
	    });

        var gauge = $("#gauge").data("kendoLinearGauge");
        gauge.exportImage().done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "gauge.png"
            });
        });
    </script>

### exportPDF
Exports the Gauge as a PDF file.
The result can be saved using [kendo.saveAs](/api/javascript/kendo/methods/saveas).

The export operation is asynchronous and returns a [promise](https://api.jquery.com/Types/#Promise).
The promise will be resolved with a PDF file encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).


<div class="meta-api-description">
How to save Kendo UI linear gauge chart as a PDF? Export or save the visual representation of a linear gauge chart as a PDF document, supporting asynchronous operations that return a promise resolving to a PDF encoded as a Data URI for easy downloading, archival, or sharing; configure and trigger PDF generation from rendered gauge data using export or save functions, enabling seamless conversion of gauge visuals into portable document format files for reporting, print-ready output, or external use.
</div>

#### Parameters

##### options `kendo.drawing.PDFOptions` *(optional)*
Parameters for the exported PDF file.

#### Returns
`Promise` A promise that will be resolved with a PDF file encoded as a Data URI.

#### Example - Exporting a chart to a PDF file

    <div id="gauge"></div>
    <script>
        $("#gauge").kendoLinearGauge({
	        pointer: {
	            value: 50
	        },
	        scale: {
	            min: 0,
	            max: 100
	        }
	    });

        var gauge = $("#gauge").data("kendoLinearGauge");
        gauge.exportPDF({ paperSize: "A5", landscape: true }).done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "gauge.pdf"
            });
        });
    </script>


### exportSVG
Exports the Gauge as an SVG document.
The result can be saved using [kendo.saveAs](/api/javascript/kendo/methods/saveas).

The export operation is asynchronous and returns a [promise](https://api.jquery.com/Types/#Promise).
The promise will be resolved with a SVG document encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).


<div class="meta-api-description">
How to export a linear gauge visualization as an SVG file using Kendo UI for jQuery? Export, download, save, or serialize a linear gauge visualization as scalable vector graphics (SVG) format, enabling retrieval of the gauge’s vector markup for inspection, manipulation, or embedding; supports asynchronous operations returning promises with SVG data encoded as Data URIs suitable for file saving, export workflows, or embedding in web pages and applications.
</div>

#### Parameters

##### options `Object` *(optional)*
Export options.

##### options.raw `Boolean` *(default: false)*
Resolves the promise with the raw SVG document without the Data URI prefix.

#### Returns
`Promise` A promise that will be resolved with a SVG document encoded as a Data URI.

#### Example - Exporting a chart to an SVG document

    <div id="gauge"></div>
    <script>
        $("#gauge").kendoLinearGauge({
	        pointer: {
	            value: 50
	        },
	        scale: {
	            min: 0,
	            max: 100
	        }
	    });

        var gauge = $("#gauge").data("kendoLinearGauge");
        gauge.exportSVG().done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "gauge.svg"
            });
        });
    </script>

#### Example

    kendo.destroy($("#linear-gauge"));
    $("#linear-gauge").remove();

### redraw

Redraws the gauge.


<div class="meta-api-description">
How do I update a Kendo UI LinearGauge in real-time? Force a manual refresh, redraw, or re-render of the gauge to immediately apply updated configuration, data changes, scale adjustments, pointer moves, range modifications, or layout updates; trigger a visual update when dynamic properties change, after resizing the container, or when external styles and DOM alterations affect the rendering, enabling instant refresh without recreating or reinitializing the entire gauge component.
</div>

#### Example

    var gauge = $("#linear-gauge").data("kendoLinearGauge");
    gauge.redraw();

### resize

Adjusts the widget layout to match the size of the container.


<div class="meta-api-description">
How to programmatically resize a Kendo UI LinearGauge component after window resizing? Adjust or update the component’s layout and graphics to fit new container sizes, trigger layout recalculation and re-rendering after window resizing, container dimension changes, CSS modifications, or visibility toggling, refresh the gauge display without resetting data or settings, dynamically control resizing behavior to maintain accurate geometry and visual alignment when the surrounding environment changes, invoke resize functionality to realign the gauge with altered space constraints or responsive design needs, manage display scaling and layout updates programmatically to ensure proper fit and appearance, handle dynamic resizing events that affect the component’s rendering and sizing without full reinitialization or data loss.
</div>

#### Example

    <div id="gauge" style="width: 50px; height: 100px;"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 50
        },
        scale: {
            min: 0,
            max: 100
        }
    });

    $("#gauge")
       .css("height", "200px")
       .data("kendoLinearGauge").resize();
    </script>

#### Parameters

##### force `Boolean` *optional*

Defines whether the widget should proceed with resizing even if the element dimensions have not changed.

### setOptions

Sets the current gauge options.


<div class="meta-api-description">
How can I dynamically update a linear gauge's settings in Kendo UI for jQuery? Modify or update the linear gauge settings dynamically by applying new configurations such as scales, pointers, color schemes, ranges, labels, and other display parameters at runtime. Enable customization and real-time adjustments to gauge appearance and behavior by setting options through a method that accepts an options object to control and override the current visual and functional properties of an existing gauge instance. Adjust gauge features, refresh the display, change pointer styles, configure scales, and fine-tune visual elements on the fly to customize and control the linear gauge presentation without recreating the component.
</div>

#### Parameters

##### options `Object`

The gauge settings to update.

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: [{
            value: 20
        }]
    });

    $("#gauge").data("kendoLinearGauge").setOptions({ theme: 'metro' });
    </script>

### svg

Returns the [SVG](https://www.w3.org/Graphics/SVG/) representation of the gauge.
The returned string is a self-contained SVG document that can be used as is or
converted to other formats using tools like [Inkscape](https://inkscape.org/en) and
[ImageMagick](https://www.imagemagick.org/).
Both programs provide command-line interface suitable for server-side processing.

> This method is obsoleted by [exportSVG](/api/javascript/dataviz/ui/lineargauge/methods/exportsvg), but will remain fully functional.


<div class="meta-api-description">
How can I generate an SVG string for a Kendo UI linear gauge? Generate, create, or obtain a complete standalone SVG graphic output of a linear gauge for exporting, saving, embedding in web pages, printing, or converting to other image formats using tools like Inkscape or ImageMagick via command-line for server-side automation, enabling seamless export of vector graphics as a self-contained SVG string representation suitable for graphic processing, integration, or further conversion workflows.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 50
        },
        scale: {
            min: 0,
            max: 100
        }
    });
    var gauge = $("#gauge").data("kendoLinearGauge");
    var svg = gauge.svg();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(svg); // displays the SVG string
    </script>

### imageDataURL

Returns a PNG image of the gauge encoded as a [Data URL](https://developer.mozilla.org/en-US/docs/data_URIs).

> This method is obsoleted and replaced by [exportImage](/api/javascript/dataviz/ui/lineargauge/methods/exportimage), but will remain fully functional.


<div class="meta-api-description">
How to convert Kendo UI linear gauge to base64 image string? Generate a base64-encoded PNG image snapshot of a linear gauge component for embedding, downloading, or using as an image source by converting the current gauge visualization into a data URL format. This functionality enables capturing the chart or gauge as a sharable or storable image string, supporting use cases like exporting visuals to HTML image tags, saving snapshots for reports, or dynamically rendering graphics without server-side processing, with outputs compatible with image embedding, inline display, or further manipulation within applications.
</div>

#### Returns

`String` A data URL with `image/png` MIME type. Will be `null` if the browser does not support the `canvas` element.

#### Example - show a snapshot of the gauge

    <div id="gauge"></div>
    <a download="export.png" id="export" class="k-button">Export PNG</a>
    <script>
    $("#gauge").kendoLinearGauge({
        pointer: {
            value: 50
        },
        scale: {
            min: 0,
            max: 100
        }
    });

    $("#export").on("click", function() {
      var gauge = $("#gauge").data("kendoLinearGauge");
      var imageDataURL = gauge.imageDataURL();

      if (navigator.msSaveBlob) {
        var blob = toBlob(imageDataURL, "image/png");
        navigator.msSaveBlob(blob, this.getAttribute("download"));
      } else {
        this.href = imageDataURL;
      }
    });

    // See: https://goo.gl/qlg5dd
    function toBlob(base64, type) {
      var rawData = base64.substring(base64.indexOf("base64,") + 7);
      var data = atob(rawData);
      var arr = new Uint8Array(data.length);

      for (var i = 0; i < data.length; ++i) {
        arr[i] = data.charCodeAt(i);
      }

      return new Blob([ arr.buffer ], { type: type });
    }
    </script>

### value

Change the value of the gauge.


<div class="meta-api-description">
How do I update the value displayed on a Kendo UI Linear Gauge dynamically? Set, update, change, or control the numeric measurement displayed on a linear gauge, dynamically adjusting the scale, pointer, and visual indicators to reflect new values in real time; programmatically configure or bind this value to respond to data inputs, modify gauge readings, and visually represent updated measurements for monitoring, tracking, or interactive data visualization scenarios.
</div>

#### Example

    $("#linear-gauge").data("kendoLinearGauge").value(20);
