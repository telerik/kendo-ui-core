---
title: CircularGauge
page_title: Configuration, methods and events of Kendo UI DataViz CircularGauge
description: Learn the configuration options for Circular Gauge widget, use methods properly.
res_type: api
component: gauges
---

# kendo.dataviz.ui.CircularGauge

## Configuration

### centerTemplate `String|Function`

The label template.
Template variables:
*   **value** - the value


<div class="meta-api-description">
Customize and control the central label content and layout of a circular gauge using HTML, markup, or template syntax, enabling dynamic insertion of the current gauge value, setting up custom center displays, modifying the appearance and content of the gauge’s focal point, adjusting label templates, and designing personalized center elements to reflect live values or other data within the gauge’s core area.
</div>

#### Example

    <div id="gauge"></div>
    <script>
     $("#gauge").kendoCircularGauge({
        value: 30,
        centerTemplate: '#: value #%'
     });
    </script>

### color `String`

The color of the value pointer. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
Set or configure the pointer color for a circular gauge or dial indicator using any valid CSS color format such as hex codes, RGB, RGBA, HSL, or named colors to visually represent values, statuses, alerts, or themes dynamically. Control and customize the needle or value indicator hue to highlight specific readings, change colors based on conditions or states, adjust styling for accessibility or branding purposes, and update the gauge’s pointer appearance programmatically or via configuration settings for real-time feedback and intuitive visualization.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 30,
        color: "#ff6358"
    });
    </script>

### colors `Array`

The color ranges of the value pointer. The pointer color will be set to the color from the range that contains the current value.


<div class="meta-api-description">
Set up customizable color gradients, thresholds, or ranges that dynamically change the indicator or pointer colors based on numeric values or measurements within circular gauge visualizations. Configure value-to-color mappings, color-coded segments, or dynamic coloring rules to highlight different levels, zones, or intervals, enabling immediate visual feedback through color changes as values update in dials, meters, or radial gauges. Control how the gauge’s pointer or needle reflects underlying data by associating specific data ranges with designated colors, supporting color-based alerts, status indicators, or performance thresholds for intuitive real-time data monitoring.
</div>

#### Example

    <div id="gauge"></div>
    <script>
     $("#gauge").kendoCircularGauge({
        value: 30,
        colors: [{
            to: 25,
            color: '#0058e9'
        }, {
            from: 25,
            to: 50,
            color: '#37b400'
        }, {
            from: 50,
            to: 75,
            color: '#ffc000'
        }, {
            from: 75,
            color: '#f31700'
        }]
     });
    </script>

### colors.color `String`

The color of the pointer in the specified range.


<div class="meta-api-description">
Set or customize the pointer color for a designated segment or range in a circular gauge visualization, enabling you to specify the exact hue using CSS color formats such as hex codes, RGB, RGBA, or named colors to highlight or differentiate specific ranges, adjust visual styling for better data representation, or control the pointer’s appearance dynamically within that range when rendering gauges in dashboards, data displays, or UI components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 30,
        colors: [{
            to: 50,
            color: '#0058e9'
        }, {
            from: 50,
            color: '#37b400'
        }]
    });
    </script>

### colors.from `Number`

The lower range value of the applied color.


<div class="meta-api-description">
Set or configure the starting point, lower bound, or initial value for color segments, thresholds, or ranges on circular or radial gauges, enabling control over where specific colors begin or apply within the gauge's scale, allowing customization of color transitions, gradient boundaries, or indicator zones based on defined numeric values or limits.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 60,
        colors: [{
            from: 0,
            to: 50,
            color: '#0058e9'
        }, {
            from: 50,
            to: 100,
            color: '#37b400'
        }]
    });
    </script>

### colors.to `Number`

The upper range value of the applied color.


<div class="meta-api-description">
Set or configure the maximum value or upper limit of a color range within a circular gauge segment, control the endpoint where a specific color stops applying on the gauge scale, define the numeric boundary for color transition or range limitation, specify the threshold at which a color segment ends, adjust or customize the upper bound of color zones inside circular or radial gauges to visually segment data ranges by numeric scale endpoints, control color distribution by setting final gauge values for each color band or segment, limit color application range by defining the maximum gauge value associated with a color region, configure precise color cutoff points for gauge indicators and segment highlights.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 30,
        colors: [{
            from: 0,
            to: 25,
            color: '#0058e9'
        }, {
            from: 25,
            to: 75,
            color: '#37b400'
        }]
    });
    </script>

### gaugeArea `Object`

The gauge area configuration options. This is the entire visible area of the gauge.


<div class="meta-api-description">
Adjust the overall visible surface and layout of the circular gauge including setting the size, margins, spacing, and appearance of the entire gauge region; control the full gauge display area to customize how much space the gauge occupies, modify its boundary padding, and define the visual style or background that surrounds all gauge elements for better fitting, spacing, alignment, or integration with surrounding UI components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        gaugeArea: {
            background: "#f0f0f0",
            height: 300,
            width: 300,
            margin: 20
        }
    });
    </script>

### gaugeArea.background `String`*(default: "white")*

The background of the gauge area. Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
Control and customize the circular gauge's background fill color to style the gauge area with any CSS color value such as hex codes, RGB, or named colors, enabling you to set, configure, or change the gauge’s visual background for theming, differentiation, or design purposes. Use this feature to specify, adjust, or manage the circular dial area’s color fill during setup or customization to enhance appearance, branding, or contrast in dashboards, monitors, or data visualization components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        gaugeArea: {
            background: "#e8f4f8"
        }
    });
    </script>

### gaugeArea.border `Object`

The border of the gauge area.


<div class="meta-api-description">
Customize the outline and edge styling of a circular gauge by configuring border color, thickness, line style including solid or dashed patterns, and other visual border effects. Adjust the gauge’s perimeter appearance by setting the border properties to control how the gauge area edges display, enabling tailored border width, stroke type, and color attributes for precise visual customization of circular indicators. This covers scenarios such as modifying the gauge rim, enabling dashed or solid outlines, adjusting thickness for emphasis, or changing color to match themes, providing flexible control over the gauge boundary styling in various visualization and design contexts.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        gaugeArea: {
            border: {
                color: "#0058e9",
                width: 2
            }
        }
    });
    </script>

### gaugeArea.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
Set or customize the outline color of a circular gauge’s main display area to highlight sections, match brand colors, change border appearance, or enhance visual contrast using any CSS-compatible color format such as hex codes (#ff0000), RGB or RGBA values, or standard color names. This controls the gauge perimeter color at setup, enabling configuring, styling, or theming the gauge frame for dashboards, data visualization, or UI components. Adjust the gauge border color to create emphasis, differentiate segments, or align with design schemes via color specification options supporting both opaque and transparent color settings.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        gaugeArea: {
            border: {
                color: "#ff6358",
                width: 1
            }
        }
    });
    </script>

### gaugeArea.border.dashType `String`*(default: "solid")*

The dash type of the border.


<div class="meta-api-description">
Configure and customize the border line style around a circular gauge area by setting different stroke patterns such as solid lines, dashed lines, dotted outlines, or various dash styles to control the visual appearance, including border patterns, line styles, stroke types, and border decorations for gauge frames. Adjust or enable segmented, broken, or continuous border effects for gauge background edges, allowing precise control over how the gauge boundary is rendered in dashboards, data visualization components, or UI elements that use circular progress indicators or radial meters to highlight or emphasize the gauge perimeter with line styling options.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        gaugeArea: {
            border: {
                dashType: "dash",
                color: "#0058e9",
                width: 2
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

### gaugeArea.border.opacity `Number` *(default: 1)*

The opacity of the border. By default the border is opaque.


<div class="meta-api-description">
Adjust and control the transparency level, alpha channel, or translucency of the circular gauge’s outer border to make the edge more visible, faint, solid, clear, or semi-transparent; customize how strong or subtle the ring or frame appears around the gauge area by setting opacity, fade, or visibility of the outline’s color including enabling partial or full transparency or disabling opacity for a solid border effect during setup or dynamic styling.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        gaugeArea: {
            border: {
                color: "#0058e9",
                width: 2,
                opacity: 0.5
            }
        }
    });
    </script>

### gaugeArea.border.width `Number`*(default: 0)*

The width of the border.


<div class="meta-api-description">
Adjust the thickness, width, or size of the circular gauge’s outer border or outline by setting numeric values to control how thin or thick the gauge area’s edge appears, enabling customization of the gauge frame style, border weight, and visual emphasis to fit design preferences, user interface styling, or graphical appearance requirements for better visual definition or subtlety.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        gaugeArea: {
            border: {
                color: "#0058e9",
                width: 3
            }
        }
    });
    </script>

### gaugeArea.height `Number`

The height of the gauge area.


<div class="meta-api-description">
Adjust or configure the vertical dimension, height, or size of a circular gauge’s display area to control layout, spacing, alignment, or rendering of scales, pointers, and visual components. Set or modify the gauge area height to manage how tall the gauge appears on screen, optimize visual proportions, customize layout constraints, control vertical spacing, enable precise sizing of the gauge’s display region, and fine-tune the overall gauge positioning or scaling within user interfaces or dashboards.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        gaugeArea: {
            height: 400,
            width: 300
        }
    });
    </script>

### gaugeArea.margin `Number|Object`*(default: 5)*

The margin of the gauge area.


<div class="meta-api-description">
Configure or adjust the outer spacing, padding, or buffer around the circular gauge visualization area to control the distance between the gauge's rendered arcs and the container edges, influencing layout alignment, preventing clipping issues, managing whitespace, and fine-tuning the gauge’s positioning within its bounding box or UI component.
</div>

#### Example

    <div id="gauge"></div>
    <script>
        $("#gauge").kendoCircularGauge({
            value: 20,
            gaugeArea:{
                margin: 50
            }
        });
    </script>

### gaugeArea.margin.top `Number`

The top margin of the gauge area.


<div class="meta-api-description">
Control the vertical spacing or padding above the circular gauge area by configuring the top margin to adjust layout alignment, create space for titles, labels, headers, or adjacent elements, and shift the gauge upward or downward within its container. This setting helps fine-tune vertical positioning, margin sizes, and spacing around the gauge to optimize visual arrangement and prevent overlap, useful for layout customization, UI adjustments, and responsive design. Adjust or set the top padding, space, offset, or gap above the gauge area to manage vertical layout and element placement effectively.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        gaugeArea: {
            margin: {
                top: 30,
                bottom: 10,
                left: 10,
                right: 10
            }
        }
    });
    </script>

### gaugeArea.margin.bottom `Number`

The bottom margin of the gauge area.


<div class="meta-api-description">
Adjust or set the space below the circular gauge's display area to prevent overlapping or clipping with other elements, customize bottom padding or gaps around the gauge for layout alignment, control vertical margin below the gauge visualization to ensure proper spacing within dashboards or UI containers, configure margin or buffer zone beneath the gauge drawing region for design precision, and enable fine-tuning of bottom spacing during initial setup to enhance overall component arrangement and prevent content obstruction.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        gaugeArea: {
            margin: {
                top: 10,
                bottom: 40,
                left: 10,
                right: 10
            }
        }
    });
    </script>

### gaugeArea.margin.left `Number`

The left margin of the gauge area.


<div class="meta-api-description">
Adjust, set, or configure the left spacing, margin, or padding of a circular gauge's main display area to control the horizontal offset, layout alignment, and visual positioning on the left side. Manage the left margin to fine-tune gauge placement, ensure proper spacing from adjacent elements, align the gauge area within containers, or control whitespace and offset for responsive or fixed layouts. Enable precise control over left-side gaps, edge distances, or left alignment spacing to customize the gauge’s visual fit and balance within user interfaces or dashboard components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        gaugeArea: {
            margin: {
                top: 10,
                bottom: 10,
                left: 35,
                right: 10
            }
        }
    });
    </script>

### gaugeArea.margin.right `Number`

The right margin of the gauge area.


<div class="meta-api-description">
Adjust the right-side spacing within the circular gauge area to control padding, set margins, increase or decrease the gap between the gauge visuals and the right boundary of the component, prevent clipping or overlap with adjacent elements, customize layout alignment for consistent positioning in dashboards or UI designs, fine-tune the horizontal offset on the gauge’s right edge, and configure proper clearance during setup to ensure clear visibility and spatial balance relative to surrounding content and container edges.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        gaugeArea: {
            margin: {
                top: 10,
                bottom: 10,
                left: 10,
                right: 25
            }
        }
    });
    </script>

### gaugeArea.width `Number`

The width of the gauge area.


<div class="meta-api-description">
Control and adjust the visible width or size of a circular or radial gauge’s drawing area to customize layout and alignment, set fixed or flexible widths, constrain or expand the gauge display, fine-tune the horizontal dimension for responsiveness or resizing, configure gauge area boundaries, and manage how much space the gauge occupies within interfaces or containers, including options to set or modify the gauge’s visible width to match design or functional requirements.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        gaugeArea: {
            width: 350,
            height: 300
        }
    });
    </script>

### opacity `Number`

The opacity of the value pointer.


<div class="meta-api-description">
Adjust the transparency, visibility, or alpha level of the CircularGauge value pointer by setting its opacity to control how faint, clear, or fully visible the pointer appears. Customize the pointer’s transparency with numeric values to make it dimmed, semi-transparent, or completely opaque, enabling precise control over the pointer’s visual prominence, fade effect, and subtlety in gauge displays.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        opacity: 0.7
    });
    </script>

### renderAs `String`

Sets the preferred rendering engine.
If it is not supported by the browser, the Gauge will switch to the first available mode.

The supported values are:

* "svg" - renders the widget as inline SVG document, if available
* "canvas" - renders the widget as a Canvas element, if available.


<div class="meta-api-description">
Control or configure how the circular gauge displays by selecting the rendering mode or engine, choosing between SVG for scalable, crisp vector graphics or Canvas for pixel-based drawing; enable or set the rendering technology to optimize performance and compatibility across browsers, with automatic fallback to supported modes if the preferred option isn’t available, allowing developers to switch display methods, specify inline SVG output, or use HTML5 Canvas rendering for customized visuals, graphical performance tuning, or addressing rendering environment constraints in different user agents or platforms.
</div>

#### Example - Render as Canvas, if supported

    <div id="gauge"></div>
    <script>
        $("#gauge").kendoCircularGauge({
            renderAs: "canvas",
            value: 50
        });
    </script>

### scale `Object`

Configures the scale.


<div class="meta-api-description">
Configure numeric scale parameters to map values to specific angles, customize start and end angles of gauges, set minimum and maximum values, define major and minor tick intervals, control tick marks and label formatting, adjust range segments, and modify visual line styles on circular gauges for precise value-to-angle representation and tailored gauge visualization.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 75,
        scale: {
            min: 0,
            max: 100,
            majorUnit: 20,
            minorUnit: 5
        }
    });
    </script>

### scale.labels `Object`

Configures the scale labels.


<div class="meta-api-description">
Customize and control the appearance, formatting, visibility, positioning, spacing, and text content of numeric or textual labels displayed along a circular gauge scale, enabling configuration of label styles, formats, intervals, and alignment for indicator scales, dials, or progress rings in visual gauge components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            labels: {
                visible: true,
                color: "#0058e9",
                font: "14px Arial"
            }
        }
    });
    </script>

### scale.labels.background `String`

The background color of the labels.
Any valid CSS color string will work here, including hex and rgb


<div class="meta-api-description">
Set or customize the background color behind scale labels in radial or circular gauges using any valid CSS color format such as hex codes, rgb, rgba, hsl, or named colors to enhance label visibility, contrast, and readability on circular scales. Adjust or style label backgrounds to improve clarity, highlight specific values, control appearance against various gauge backgrounds, and optimize label display in dashboards, widgets, or data visualization components with circular or radial progress indicators or meters.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            labels: {
                background: "#e8f4f8"
            }
        }
    });
    </script>

### scale.labels.border `Object`

The border of the labels.


<div class="meta-api-description">
Adjust and customize the outline and edges of scale labels on circular gauges by setting border color, thickness, style, and edge rendering for label boundaries, enabling control over label highlights, outlines, strokes, and visual separation on gauge scales, including options to define label border appearance, decorate label frames, or modify label contour lines to enhance readability and visual distinction of scale markings.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            labels: {
                border: {
                    color: "#0058e9",
                    width: 1
                }
            }
        }
    });
    </script>

### scale.labels.border.color `String`

The color of the border. Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
Customize the outline color of the scale labels displayed around a circular gauge by specifying any valid CSS color format such as hexadecimal codes, RGB or RGBA values, HSL, or named color keywords to style and differentiate label borders; control, configure, or set the label border shades to enhance gauge readability, visibility, or thematic consistency during gauge initialization or styling adjustments.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            labels: {
                border: {
                    color: "#ff6358",
                    width: 2
                }
            }
        }
    });
    </script>

### scale.labels.border.dashType `String`*(default: "solid")*

The dash type of the border.


<div class="meta-api-description">
Control and customize the border style of scale labels in circular gauges by configuring dashed or dotted patterns, including solid, dash, dot, or other predefined stroke styles to achieve various border effects around label edges. Enable, set, or adjust dash patterns to create distinct label border appearances, whether you want continuous lines, segmented dashes, or spaced dots, enhancing the visual style and clarity of gauge scale labels. Customize border strokes for scale labels by specifying line dash types to define how label borders render, allowing detailed control over label outlines in circular gauge visualizations.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            labels: {
                border: {
                    dashType: "dot",
                    color: "#0058e9",
                    width: 1
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

### scale.labels.border.opacity `Number` *(default: 1)*

The opacity of the border. By default the border is opaque.


<div class="meta-api-description">
Control the transparency or alpha level of the border around scale labels in circular gauge charts, enabling you to set the label border visibility from fully transparent to fully opaque. Customize the border opacity to make scale labels stand out clearly or blend subtly with the gauge background, adjusting visibility to suit different styling, clarity, or design needs. Manage label border transparency for readability, aesthetic preference, or emphasis by configuring the opacity level of the circular gauge scale label borders.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            labels: {
                border: {
                    color: "#0058e9",
                    width: 2,
                    opacity: 0.6
                }
            }
        }
    });
    </script>

### scale.labels.border.width `Number`*(default: 0)*

 The width of the border.


<div class="meta-api-description">
Adjust or set the thickness, thickness level, or stroke width of the outline or border surrounding scale labels on circular or radial gauges to enhance label visibility, emphasize text, customize visual appearance, configure label borders, increase or decrease label border thickness for better readability, control the line width around gauge label edges, modify label outlines for styling or clarity, and manage the border stroke size that frames the text on circular measurement indicators.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            labels: {
                border: {
                    color: "#0058e9",
                    width: 3
                }
            }
        }
    });
    </script>

### scale.labels.color `String`

The text color of the labels.
Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
Control and customize the text color of scale labels on circular gauges or dials, enabling you to set label font colors using any CSS-compatible color format such as hex codes, RGB, RGBA, HSL, or named colors to align with themes, highlight data statuses, or improve readability by configuring or styling label colors dynamically during initialization or runtime.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            labels: {
                color: "#ff6358"
            }
        }
    });
    </script>

### scale.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.


<div class="meta-api-description">
Adjust, configure, or set the typography, font style, family, size, weight, and appearance of labels on a circular gauge scale to control label readability, clarity, and visual design, enabling customization of how scale labels look including font type, boldness, italicization, and size to enhance user interface presentation and ensure legible numerical or textual information on radial gauge displays.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            labels: {
                font: "16px Georgia, serif"
            }
        }
    });
    </script>

### scale.labels.format `String`

The format of the labels.


<div class="meta-api-description">
Customize and control the display format of scale labels on circular gauge components by setting format strings or patterns that define numeric, percentage, currency, or date/time representations; configure how label values appear through formatting options such as precision, decimals, units, or localized formats to tailor scale tick labels, enabling developers to specify parsing and rendering rules, adjust label presentation, or format numbers and dates dynamically within gauges for clearer, context-specific visualizations.
</div>

#### Example

    <div id="gauge"></div>
    <script>
        $("#gauge").kendoCircularGauge({
            value: 50,
            scale: {
                min: 0,
                max: 100,
                labels: {
                    visible: true,
                    // set the format to currency
                    format: "C"
                }
            }
        });
    </script>

### scale.labels.margin `Number|Object`*(default: 0)*

The margin of the labels.


<div class="meta-api-description">
Adjust or configure the outer spacing and margin around scale labels for circular gauge displays, enabling control over label padding, distance, or separation from the scale ticks or gauge edges, to customize label layout, positioning, and visual spacing for clarity and styling during initialization and rendering of circular meter or dial components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            labels: {
                margin: 10
            }
        }
    });
    </script>

### scale.labels.margin.top `Number`

The top margin of the labels.


<div class="meta-api-description">
Set or modify the vertical spacing above gauge scale labels to control label alignment and positioning, configure top margin or padding of scale labels for fine-tuning layout and readability, adjust spacing to prevent label overlap or improve clarity, control vertical offset for labels on circular dials or radial gauges, customize label placement by increasing or decreasing space above scale text to optimize visual appearance and user interface design.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            labels: {
                margin: {
                    top: 15,
                    bottom: 5,
                    left: 5,
                    right: 5
                }
            }
        }
    });
    </script>

### scale.labels.margin.bottom `Number`

The bottom margin of the labels.


<div class="meta-api-description">
Adjust, set, or configure the vertical spacing, padding, or margin below scale labels in circular gauges, controlling the bottom space beneath each label to fine-tune label placement, improve readability, or customize the layout when rendering circular gauge scale markings, ticks, or numeric indicators, useful for managing label distance from the gauge arc or dial for precise alignment or visual clarity.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            labels: {
                margin: {
                    top: 5,
                    bottom: 12,
                    left: 5,
                    right: 5
                }
            }
        }
    });
    </script>

### scale.labels.margin.left `Number`

The left margin of the labels.


<div class="meta-api-description">
Adjust horizontal spacing or padding on the left side of scale labels in a circular gauge, control label indentation or offset from gauge ticks, arcs, or edges, set or modify left margin for better label alignment and readability around the gauge dial, customize label positioning to prevent overlap or improve visual balance, configure spacing between labels and the gauge components ensuring clear label placement.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            labels: {
                margin: {
                    top: 5,
                    bottom: 5,
                    left: 10,
                    right: 5
                }
            }
        }
    });
    </script>

### scale.labels.margin.right `Number`

The right margin of the labels.


<div class="meta-api-description">
Control and adjust the horizontal spacing or padding to the right side of scale labels within circular gauge components, enabling configuration of the right margin to create extra space between label text and adjacent gauge elements, which helps manage label layout, prevent overlaps, improve visual clarity, and fine-tune label positioning for optimal gauge presentation and readability in dashboards, charts, or UI controls.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            labels: {
                margin: {
                    top: 5,
                    bottom: 5,
                    left: 5,
                    right: 8
                }
            }
        }
    });
    </script>

### scale.labels.padding `Number | Object`*(default: 0)*

 The padding of the labels.


<div class="meta-api-description">
Adjust the spacing or padding around scale labels in a circular gauge to control the distance between label text and nearby elements such as ticks or edges, enabling customization of label layout, overlap prevention, hit area sizing, and precise alignment by setting padding values typically measured in pixels; configure label margins, spacing, or buffer zones to optimize readability, visual clarity, and interactive target zones for labels on circular scales.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            labels: {
                padding: 8
            }
        }
    });
    </script>

### scale.labels.padding.top `Number`

The top padding of the labels.


<div class="meta-api-description">
Adjust or configure the vertical space above scale labels in a circular gauge or dial visualization by setting numerical top padding values in pixels to enhance label alignment, spacing, readability, or positioning; control the distance between gauge markings and their numeric or textual labels for improved clarity, aesthetics, or layout customization when displaying circular data indicators or meter scales.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            labels: {
                padding: {
                    top: 10,
                    bottom: 3,
                    left: 3,
                    right: 3
                }
            }
        }
    });
    </script>

### scale.labels.padding.bottom `Number`

The bottom padding of the labels.


<div class="meta-api-description">
Set or adjust the space beneath scale labels on a circular gauge to control label spacing, bottom padding, margin, or gap for improved readability and layout; customize label positioning, fine-tune vertical padding below scale text, increase or decrease distance under labels, configure label bottom spacing for clear visualization and neat arrangement on gauge scales.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            labels: {
                padding: {
                    top: 3,
                    bottom: 8,
                    left: 3,
                    right: 3
                }
            }
        }
    });
    </script>

### scale.labels.padding.left `Number`

The left padding of the labels.


<div class="meta-api-description">
Control and customize the horizontal spacing before scale labels on circular gauges by setting the left padding to adjust label alignment, positioning, and layout precision. This setting enables developers to configure the left margin or indent of numeric or textual scale indicators, helping to fine-tune label placement for clarity, avoid overlap, and improve visual balance. Adjusting the left padding works in conjunction with vertical and right-side spacing controls to precisely set offset, spacing, margin, or indentation values around labels, optimizing readability, appearance, and gauge annotation layout during initialization or runtime configuration.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            labels: {
                padding: {
                    top: 3,
                    bottom: 3,
                    left: 6,
                    right: 3
                }
            }
        }
    });
    </script>

### scale.labels.padding.right `Number`

The right padding of the labels.


<div class="meta-api-description">
Adjust, set, or configure the right-side spacing or padding of scale labels to prevent overlap with ticks, marks, or the outer edge of a circular gauge or dial. Control label placement, margin, or distance on the right to improve readability, layout alignment, and visual clarity of gauge scales. Enable fine-tuning of label positioning to avoid cluttering or collisions with gauge boundaries, ensuring labels do not intersect with ticks or gauge edges in circular or radial measurement displays.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            labels: {
                padding: {
                    top: 3,
                    bottom: 3,
                    left: 3,
                    right: 7
                }
            }
        }
    });
    </script>

### scale.labels.position `String`*(default: "inside")*

The labels positions.


<div class="meta-api-description">
Control and configure the placement of numeric or text labels around a circular gauge's scale to enhance readability and alignment, choosing positions such as inside, outside, or custom offsets relative to the gauge arc; adjust label spacing and orientation to align precisely with tick marks or scale divisions, optimize visual layout for clarity, and manage how scale indicators appear in circular meter or dial components for improved user interface design and presentation.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            labels: {
                position: "outside"
            }
        }
    });
    </script>

#### *"inside"*

The labels are positioned inside.

#### *"outside"*

The labels are positioned outside.

### scale.labels.template `String|Function`

The label template.
Template variables:
*   **value** - the value


<div class="meta-api-description">
Configure and customize the display of scale labels on circular gauges by defining templates that format, interpolate, or control label content dynamically during initialization. Enable personalized label rendering by supplying custom formatting functions or template strings that access scale values and other variables, allowing adjustments to label appearance, text, number formatting, value display, or localization. Tailor label output for different precision, units, or styling needs, and modify how numeric or string values appear along the gauge scale to fit specific UI or data representation requirements. This supports varied use cases such as formatting percentages, decimal places, conditional label content, or embedding complex expressions in gauge labels.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            min: 0,
            max: 100,
            labels: {
                visible: true,
                // set the format to currency
                template: "#= value #%"
            }
        }
    });
    </script>

### scale.labels.visible `Boolean`*(default: false)*

 The visibility of the labels.


<div class="meta-api-description">
Show or hide numeric or text scale labels on a circular gauge, controlling the visibility of measurement markers, tick labels, or value indicators to customize the gauge’s appearance, toggle label display for clarity, reduce visual clutter, enable or disable label rendering for better readability, adjust whether scale numbers or annotations appear around the circular dial, and configure label visibility settings in gauge components to meet UI design preferences or user interface requirements.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            labels: {
                visible: true
            }
        }
    });
    </script>

### scale.majorTicks `Object`

Configures the scale major ticks.


<div class="meta-api-description">
Customize and configure the prominent tick marks on a circular gauge scale by controlling their size, color, width, spacing, interval, step, and visibility to achieve precise measurement labeling, adjust layout placement, and enhance readability of scale markers. Adjust major scale ticks to set the frequency and appearance of primary graduations, enable or disable visibility, fine-tune spacing between ticks for clarity, and modify styling aspects like thickness and color to fit design requirements or improve visual hierarchy on radial dials. Optimize the gauge scale’s primary divisions by setting major tick intervals, controlling step increments, and customizing their display to meet exact layout and measurement needs in circular instrumentation or dial visualization contexts.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            majorTicks: {
                visible: true,
                color: "#0058e9",
                size: 10
            }
        }
    });
    </script>

### scale.majorTicks.color `String`

The color of the major ticks.


<div class="meta-api-description">
Adjust or customize the primary tick mark color on a circular gauge scale to enhance visual contrast, align with design themes, brand colors, or user interface styling by specifying color values in various formats such as hex codes, RGB, RGBA, or standard color names, enabling control over the appearance of major scale ticks for better readability and aesthetic integration.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            majorTicks: {
                color: "#ff6358"
            }
        }
    });
    </script>

### scale.majorTicks.size `Number`

The major tick size.
This is the length of the line in pixels that is drawn to indicate the tick on the scale.


<div class="meta-api-description">
Adjust the length, thickness, or size of primary tick marks on a circular gauge scale to control their visual prominence, spacing, and appearance. Configure major ticks’ length in pixels for customizing the gauge’s primary indicators, enabling clear differentiation of major value steps, improving readability, or matching design aesthetics by scaling or resizing the tick lines on the circumference. Control how far major ticks extend from the scale, set the dimension of primary scale marks, and fine-tune the gauge’s indication style by modifying major tick length attributes or parameters.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            majorTicks: {
                size: 12
            }
        }
    });
    </script>

### scale.majorTicks.visible `Boolean`*(default: false)*

The visibility of the major ticks.


<div class="meta-api-description">
Control the display of prominent tick marks on a circular gauge scale by enabling or disabling the visibility of major scale markers, allowing customization of the gauge’s primary graduation indicators, configuring whether the main ticks appear or are hidden, adjusting the gauge scale to show key measurement points, toggling the visibility of prominent scale divisions, setting up major tick rendering for clearer or simplified gauge readings, showing or hiding significant gauge ticks to enhance visualization or reduce clutter, setting the primary scale marks’ presence according to user preference, and managing major graduation marks on the dial for precise or minimalistic display styles.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            majorTicks: {
                visible: true
            }
        }
    });
    </script>

### scale.majorTicks.width `Number`*(default: 0.5)*

The width of the major ticks.


<div class="meta-api-description">
Adjust the thickness, size, or width of major tick marks on circular gauges by configuring how bold, thick, or prominent the primary scale indicators appear; control the visual weight or stroke width of main ticks to customize gauge readability, highlight major divisions, or refine gauge styling by increasing or decreasing the line thickness of primary tick marks on the dial or scale, enabling precise adjustments to major tick visual prominence and scale detailing for better display clarity and emphasis.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            majorTicks: {
                width: 2
            }
        }
    });
    </script>

### scale.majorUnit `Number`

The interval between major divisions.


<div class="meta-api-description">
Adjust or define the numeric interval spacing for primary scale divisions to control the frequency and placement of major ticks and labels on circular or radial gauges, enabling customization of the visual intervals and labeling density on the gauge scale; this setting governs how often major marks appear, influencing tick intervals, label steps, and the distribution of key scale markers for clear and precise gauge readings.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
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
Configure or set the maximum value that defines the upper limit for the gauge scale to control the highest displayable measurement, adjust the numeric boundary that influences tick marks, visual ranges, pointer placement, and ensure values are clamped within this range during setup. This setting governs how the gauge maps input values to its scale, enabling tuning of the display cap, controlling maximum thresholds, and managing scale boundaries for accurate visualization and range calculation.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            max: 200
        }
    });
    </script>

### scale.min `Number`*(default: 0)*

The minimum value of the scale.


<div class="meta-api-description">
Define or adjust the minimum numeric limit or lower boundary of a circular gauge’s scale to establish the starting point for displayed values, control and set the smallest measurable or visible data point, configure the scale’s lower range to affect pointer positions, intervals, and range visualization, enable setting the initial scale minimum during initialization or dynamically update it to influence how values are represented and rendered within the gauge’s circular scale, specify or constrain the low end of the scale range for accurate measurement, display, and data binding scenarios.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            min: -10,
            max: 100
        }
    });
    </script>

### scale.minorTicks `Object`

Configures the scale minor ticks.


<div class="meta-api-description">
Adjust and customize the visibility, interval spacing, size, width, color, and positioning of minor tick marks on a circular gauge scale to enhance detail and precision in gauge readings. Configure and control minor tick increments, fine-tune their alignment relative to major ticks, set styling options such as color and thickness, and determine the frequency or step between these smaller scale marks to improve gauge scale readability, visualization, and user interface presentation. Enable or disable minor ticks, modify their appearance for clearer indication of intermediate values, and tailor their layout to fit various circular gauge configurations and design requirements.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            minorTicks: {
                visible: true,
                color: "#0058e9",
                size: 5
            }
        }
    });
    </script>

### scale.minorTicks.color `String`

The color of the minor ticks.
Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
Adjust or customize the hue, shade, or tint of the small tick marks displayed between major scale divisions on a circular gauge or dial, using any valid CSS color format such as hexadecimal codes, RGB or RGBA values, HSL notation, or standard color names to control appearance, theme, styling, or visual differentiation of the gauge’s finer gradations and divisions for clearer data visualization, interface customization, user experience tailoring, or matching color schemes in charts, dashboards, meters, speedometers, and similar circular instruments.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            minorTicks: {
                color: "#ff6358"
            }
        }
    });
    </script>

### scale.minorTicks.size `Number`

The minor tick size.
This is the length of the line in pixels that is drawn to indicate the tick on the scale.


<div class="meta-api-description">
Adjusting the length of smaller scale markings or minor tick lines on a circular gauge, configuring the pixel size for these ticks, setting or changing how long each minor tick appears, controlling the measurement of small interval indicators, customizing the tick mark dimensions, modifying the length of minor scale markers, specifying the pixel size for minor ticks, enabling fine control over minor tick visuals, customizing tick appearance for precise scale detailing, and setting the length of small incremental scale lines on a gauge.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            minorTicks: {
                size: 8
            }
        }
    });
    </script>

### scale.minorTicks.visible `Boolean`*(default: false)*

The visibility of the minor ticks.


<div class="meta-api-description">
Control the visibility of small incremental marks between main scale divisions on circular gauges, enabling configuration of finer graduations or subtle tick lines to enhance or simplify the gauge's visual detail. Adjust, toggle, show, or hide minor tick marks to improve readability, customize styling, and refine the presentation of intermediate scale indicators for more precise measurement displays or cleaner gauge appearance.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            minorTicks: {
                visible: true
            }
        }
    });
    </script>

### scale.minorTicks.width `Number`*(default: 0.5)*

The width of the minor ticks.


<div class="meta-api-description">
Adjust or configure the thickness, size, or stroke width of the smaller scale marks or minor tick marks on a circular gauge or dial to enhance clarity, visibility, or subtlety in the gauge's measurement indicators. Customize or set how thick, narrow, or bold the minor tick lines appear around the circumference for precise control over the visual weight, styling, and appearance of these smaller incremental ticks on radial scales, meters, or gauges.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            minorTicks: {
                width: 1.5
            }
        }
    });
    </script>

### scale.minorUnit `Number`

The interval between minor divisions.


<div class="meta-api-description">
Control the spacing and frequency of smaller tick marks or minor divisions on a circular gauge or dial by setting the numeric interval between these subtle scale increments, enabling customization of tick mark density, incremental measurement detail, fine-grained scale granularity, and visual precision for gauges, meters, or instruments that display intermediate values between major units; adjust or configure minor intervals to set how often these lesser ticks appear, optimizing the display for readability, accuracy, and measurement clarity in dashboards, control panels, or data visualization components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            min: 0,
            max: 100,
            minorUnit: 2.5
        }
    });
    </script>

### scale.rangePlaceholderColor `String`

The default color for the ranges.


<div class="meta-api-description">
Adjust or set the default or fallback color used for scale segments or range sections on a circular gauge's scale when specific range colors are not defined, enabling control over the visual styling, appearance, or theme of gauge ranges, placeholders, or unassigned color segments; useful for defining or customizing the background hue, fallback coloring, or base color for scale ranges when individual segments lack explicit colors, and helpful for configuring consistent or default coloration in circular gauge scale displays, range coloring, and color management.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            rangePlaceholderColor: "#e0e0e0"
        }
    });
    </script>

### scale.rangeSize `Number`

The width of the range indicators.


<div class="meta-api-description">
Adjust the thickness, width, or size of colored range bands, arcs, or indicators on a circular gauge or dial to emphasize specific value ranges, control visual prominence, enhance readability, customize the size of scale segments, and fine-tune how broad or narrow each range appears within the gauge display for better scale visualization and user interpretation.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            rangeSize: 20
        }
    });
    </script>

### scale.rangeDistance `Number`

The distance from the range indicators to the ticks.


<div class="meta-api-description">
Configure the spacing or offset distance between gauge ranges and scale ticks to adjust how close or far the range indicators appear from the tick marks on a circular scale, controlling the visual separation, layout, and alignment of scale components, enabling precise tuning of gauge appearance by setting the gap or padding between ranges and ticks for better readability and design customization.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            rangeDistance: 10
        }
    });
    </script>

### scale.reverse `Boolean`*(default: false)*

Reverses the scale direction - values are increase anticlockwise.


<div class="meta-api-description">
Adjust the direction of the gauge scale to reverse or flip the value progression, enabling an anticlockwise or counterclockwise layout where numbers, tick marks, labels, and pointers move in the opposite direction from the default clockwise orientation. Configure and enable a reversed scale to invert the numerical ordering for visualization, allowing control over the gauge’s orientation so that values increase backward, supporting customized dial presentations, needle movement, and label sequencing in various layouts or non-standard measurement systems.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            reverse: true
        }
    });
    </script>

### scale.startAngle `Number`*(default: 0)*

The start angle of the gauge.
The gauge is rendered clockwise(0 degrees are the 180 degrees in the polar coordinate system)


<div class="meta-api-description">
Configure the starting point or initial position of a circular gauge’s scale by setting the angle where the scale begins, using degrees to define the rotation. Adjust or control the orientation of the gauge’s scale by specifying the precise starting angle clockwise, enabling rotation of the scale’s zero or first tick mark to any desired degree position for custom alignment, visualization, or design purposes. This is useful for controlling where the measurement or indicator scale on a radial or polar coordinate gauge initiates, allowing developers to set, shift, or rotate the scale start point to match application requirements or to synchronize with other visual elements in circular or dial-based UI components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        scale: {
            startAngle: 45
        }
    });
    </script>

### theme `String` *(default: "sass")*

The gauge theme. With versions prior to R1 2023 this can be either the respective LESS theme from the list below or "sass".
When set to "sass" the gauge will read the variables from the [Sass-based themes]({% slug sassbasedthemes_kendoui %}).


<div class="meta-api-description">
Adjust or configure the visual appearance, styling, and design system of the circular gauge by selecting or switching themes, including legacy LESS-based themes or modern Sass-based style variables, enabling developers to control color schemes, UI consistency, and stylesheet application for different visual preferences or branding requirements across web components or dashboards.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        theme: "bootstrap"
    });
    </script>

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

### transitions `Boolean`*(default: true)*

A value indicating if transition animations should be played.


<div class="meta-api-description">
Control or configure animation effects for circular gauge rendering and updates by enabling or disabling smooth transition animations, allowing adjustment of motion sensitivity, animation playback, or performance optimization through toggling dynamic visual changes during gauge value changes or redraws. Manage visual transition effects to enhance user experience or reduce motion impact by turning on or off animated interpolation, easing, and dynamic rendering adjustments in circular gauge components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50,
        transitions: false
    });
    </script>

### value `Number`

The gauge value.


<div class="meta-api-description">
Set or update the current numeric measurement shown on a circular gauge, controlling the displayed value that the gauge’s needle or pointer reflects on its scale; this numeric input can be configured dynamically, initialized for default readings, or bound to data sources to represent real-time or updated measurement values, enabling precise control over the gauge’s displayed measurement or indicator number.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 75
    });
    </script>

## Methods

### destroy

Prepares the Gauge for safe removal from the DOM.

Detaches event handlers and removes data entries in order to avoid memory leaks.


<div class="meta-api-description">
Remove or completely dispose of the circular gauge visualization by detaching event listeners, unbinding all associated handlers, clearing internal data, releasing stored references, and freeing up memory to avoid leaks when the gauge is no longer needed; safely clean up and destroy the component programmatically to fully release resources, prevent errors during DOM removal, and ensure garbage collection of all gauge-related objects and event bindings.
</div>

#### Example

    <div id="gauge"></div>
    <script>
        $("#gauge").kendoCircularGauge({
            value: 50
        });
        setTimeout(function(){
            kendo.destroy($("#gauge"));
            $("#gauge").remove();
        },1000);
    </script>

### exportImage
Exports the Gauge as an image.
The result can be saved using [kendo.saveAs](/api/javascript/kendo/methods/saveas).

The export operation is asynchronous and returns a [promise](https://api.jquery.com/Types/#Promise).
The promise will be resolved with a PNG image encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).


<div class="meta-api-description">
Generate or save a snapshot of a circular gauge as a PNG image, export the chart or gauge display asynchronously, capture the current visual state for download or further processing, produce an image encoded as a data URI for embedding or saving, convert the gauge rendering into a portable bitmap format, retrieve a promise-based image export from the gauge component, enable exporting or downloading of the gauge visualization, create downloadable image files from the gauge for reporting or sharing, extract and handle image data programmatically, or convert gauge visuals into base64-encoded PNG data for custom saving workflows.
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
        $("#gauge").kendoCircularGauge({
            value: 50
        });

        var gauge = $("#gauge").data("kendoCircularGauge");
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
Generate or save the circular gauge visualization as a PDF file, export or download the gauge rendering in PDF format for reporting, archival, sharing, or printing purposes, convert and output the gauge display asynchronously to a PDF document encoded as a data URI, trigger PDF export operations programmatically with promise-based handling for saving or sending gauge snapshots, capture and persist the gauge image or chart in PDF for offline use or integration into documents or presentations.
</div>

#### Parameters

##### options `kendo.drawing.PDFOptions` *(optional)*
Parameters for the exported PDF file.

#### Returns
`Promise` A promise that will be resolved with a PDF file encoded as a Data URI.

#### Example - Exporting a gauge to a PDF file
    <div id="gauge"></div>
    <script>
        $("#gauge").kendoCircularGauge({
            value: 50
        });

        var gauge = $("#gauge").data("kendoCircularGauge");
        gauge.exportPDF({ paperSize: "A4", landscape: true }).done(function(data) {
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
Export or save the circular gauge as a scalable vector graphic by invoking a method that asynchronously generates an SVG representation encoded as a Data URI, suitable for downloading, exporting, or embedding. Enable exporting the gauge visualization to an SVG file format for sharing, saving, or further editing, with support for asynchronous operation and integration with file-saving utilities. Convert the gauge display into an SVG document exportable as a downloadable file or usable in web applications, supporting promises for async workflows, file exports, or embedding vector-based graphics. Generate and retrieve an SVG version of the gauge rendering for export, download, or save operations, compatible with data URI schemes and enabling flexible usage scenarios such as file export, vector graphic saving, or external processing.
</div>

#### Parameters

##### options `Object` *(optional)*
Export options.

##### options.raw `Boolean` *(default: false)*
Resolves the promise with the raw SVG document without the Data URI prefix.

#### Returns
`Promise` A promise that will be resolved with a SVG document encoded as a Data URI.

#### Example - Exporting a gauge to an SVG document
    <div id="gauge"></div>
    <script>
        $("#gauge").kendoCircularGauge({
            value: 50
        });

        var gauge = $("#gauge").data("kendoCircularGauge");
        gauge.exportSVG().done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "gauge.svg"
            });
        });
    </script>

### redraw

Redraws the gauge.


<div class="meta-api-description">
Trigger or force a visual refresh and re-rendering of the circular gauge to update its appearance after changes in data, configuration, layout, or styles. Recalculate geometry, scales, pointers, ranges, and visual elements dynamically without full component initialization. Useful for programmatically refreshing or resizing the gauge, ensuring the displayed indicators, arcs, and visuals reflect the latest state and options. Invoke to instantly update graphical elements after updates to values, settings, or container dimensions. Control the gauge’s redraw cycle to maintain accurate and current visual output in real time.
</div>

#### Example
    <div id="gauge"></div>
    <script>
    $("#gauge").kendoCircularGauge({
        value: 50
    });
    setTimeout(function(){
        var gauge = $("#gauge").data("kendoCircularGauge");
        gauge.redraw();
    },1000)
    </script>

### resize

Adjusts the widget layout to match the size of the container.


<div class="meta-api-description">
Adjust or update the gauge rendering to fit new container dimensions by triggering a recalculation and redraw of all graphical elements, geometry, scaling, and layout to ensure accurate display after container resizing, dynamic layout adjustments, CSS size changes, or visibility toggles, enabling synchronization of the gauge’s visual presentation with any changes in its parent element’s size or when re-displaying it after being hidden.
</div>

#### Example
    <div id="gauge" style="width: 100px; height: 100px;"></div>
    <script>
        $("#gauge").kendoCircularGauge({
            value: 50
        });

        $("#gauge").css({ width: "200px", height: "200px" })
            .data("kendoCircularGauge").resize();
    </script>

#### Parameters

##### force `Boolean` *optional*

Defines whether the widget should proceed with resizing even if the element dimensions have not changed.

### setOptions

Sets the current gauge options.


<div class="meta-api-description">
Update or modify the gauge’s appearance and behavior dynamically by applying new configuration settings at runtime, including adjusting scales, ranges, needles, colors, animations, layouts, or other visual and functional parameters without recreating the control, enabling seamless real-time customization, reconfiguration, runtime option changes, applying settings programmatically, interactive updates, and live tuning of gauge properties through an options object that conforms to the expected structure.
</div>

#### Parameters

##### options `Object`

The gauge settings to update.

#### Example

    <div id="gauge"></div>
    <script>
        $("#gauge").kendoCircularGauge({
            value: 50
        });

        $("#gauge").data("kendoCircularGauge").setOptions({ theme: 'black' });
    </script>

### svg

Returns the [SVG](https://www.w3.org/Graphics/SVG/) representation of the gauge.
The returned string is a self-contained SVG document that can be used as is or
converted to other formats using tools like [Inkscape](https://inkscape.org/en) and
[ImageMagick](https://www.imagemagick.org/).
Both programs provide command-line interface suitable for server-side processing.

> This method is obsoleted by [exportSVG](/api/javascript/dataviz/ui/circulargauge/methods/exportsvg), but will remain fully functional.


<div class="meta-api-description">
Generate or retrieve a complete standalone SVG markup string for circular gauge visualizations to enable export, vector printing, server-side rendering, file conversion, or integration with vector graphic tools like Inkscape or ImageMagick; obtain scalable vector graphics strings usable for direct embedding, transformation into other formats via command-line processing, automation workflows, or offline rendering, with options supporting legacy method compatibility and flexible export strategies for dashboards, reports, or custom vector-based presentations.
</div>

#### Example

    <div id="gauge"></div>
    <script>
        $("#gauge").kendoCircularGauge({
            value: 50
        });
        var gauge = $("#gauge").data("kendoCircularGauge");
        var svg = gauge.svg();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(svg); // displays the SVG string
    </script>

### imageDataURL

Returns a PNG image of the gauge encoded as a [Data URL](https://developer.mozilla.org/en-US/docs/data_URIs).

> This method is obsoleted and replaced by [exportImage](/api/javascript/dataviz/ui/circulargauge/methods/exportimage), but will remain fully functional.


<div class="meta-api-description">
Generate or retrieve a PNG snapshot of the gauge’s current visual state as a base64-encoded Data URL suitable for exporting, downloading, embedding in HTML, capturing the gauge rendering, converting to an image format, or programmatically uploading the gauge’s visual output. This method enables extracting a rasterized image representation of the circular gauge display for saving or sharing, supporting use cases like saving gauge snapshots, exporting gauge visuals in PNG format, or embedding gauge images directly in web pages and applications.
</div>

#### Returns

`String` A data URL with `image/png` MIME type. Will be `null` if the browser does not support the `canvas` element.

#### Example - show a snapshot of the gauge

    <div id="gauge"></div>
    <a download="export.png" id="export" class="k-button">Export PNG</a>
    <script>
        $("#gauge").kendoCircularGauge({
            value: 50
        });

        $("#export").on("click", function() {
            var gauge = $("#gauge").data("kendoCircularGauge");
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

Gets or sets the value of the gauge.


<div class="meta-api-description">
Retrieve, set, or update the numeric measurement shown on a circular gauge widget, programmatically controlling the current indicator value or reading its real-time measurement; adjust, modify, or bind the displayed value dynamically to reflect live data changes, programmatically control the gauge reading, synchronize the component state with external sources, or query the current numeric setting for use in calculations, monitoring, or interactive updates to the gauge display and its internal representation.
</div>

#### Example

    <div id="gauge"></div>
    <script>
        $("#gauge").kendoCircularGauge({
            value: 50
        });

        setTimeout(function(){
            $("#gauge").data("kendoCircularGauge").value(20);
        },1000);
    </script>
