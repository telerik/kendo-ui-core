---
title: RadialGauge
page_title: Configuration, methods and events of Kendo UI DataViz RadialGauge
description: Learn the configuration options for Radial Gauge widget, set the color and size of the border, use methods properly.
res_type: api
component: gauges
---

# kendo.dataviz.ui.RadialGauge

## Configuration

### gaugeArea `Object`

The gauge area configuration options.
This is the entire visible area of the gauge.


<div class="meta-api-description">
Adjust and customize the full visible section or display area of a radial gauge, including its size, layout, and visual boundaries, enabling control over how much space the gauge occupies and how it is rendered within the container. Set or modify the gauge’s drawing region, background space, and margin parameters to influence the overall appearance and visibility of the gauge interface. Enable configuration of the gauge’s display boundaries or area properties to optimize layout, scaling, and presentation in dashboards, reports, or widgets, allowing precise control over the component’s visual footprint and design aesthetics during initialization or dynamic updates.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        gaugeArea: {
            background: "#eeeeee",
            width: 300,
            height: 300,
            margin: 10
        },
        pointer: [{
            value: 65
        }]
    });
    </script>

### gaugeArea.background `String`*(default: "white")*

 The background of the gauge area.
Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
Control and customize the background color of the radial gauge area by setting any valid CSS color value, including hex codes like #fff or rgb formats such as rgb(255,255,255), to change or configure the gauge’s backdrop, enable seamless theme integration, adjust visual appearance, or style the gauge area’s background for consistency with your UI design, coloring, shading, or branding preferences.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        gaugeArea: {
            background: "#f0f0f0"
        },
        pointer: [{
            value: 50
        }]
    });
    </script>

### gaugeArea.border `Object`

The border of the gauge area.


<div class="meta-api-description">
Set and customize the outer edge or outline surrounding a circular gauge or dial component by controlling the frame's color, thickness, stroke pattern such as solid or dashed lines, and transparency level. Adjust the border style to enhance visual clarity, emphasize the gauge area, or match UI themes by configuring properties like border color, width, dash types, and opacity. Enable styling of the perimeter or contour of a radial or circular gauge display to create distinct borders, modify stroke attributes, or apply custom dash patterns and opacity settings for enhanced visual differentiation and appearance control.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        gaugeArea: {
            border: {
                color: "#cccccc",
                width: 2,
                dashType: "dash"
            }
        },
        pointer: [{
            value: 75
        }]
    });
    </script>

### gaugeArea.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
Customize or configure the outline color, stroke, or edge hue around a circular or radial progress indicator, gauge widget, or dial component by setting any CSS-compatible color value such as hexadecimal codes, RGB, RGBA, HSL, or named colors to control the visible border styling, frame tint, or perimeter color accent that defines the gauge’s outer boundary and enhances visual separation or emphasis on the radial gauge area’s circumference.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        gaugeArea: {
            border: {
                color: "#ff6600",
                width: 3
            }
        },
        pointer: [{
            value: 40
        }]
    });
    </script>

### gaugeArea.border.dashType `String`*(default: "solid")*

The dash type of the border.


<div class="meta-api-description">
Customize and control the gauge border stroke style by setting patterns such as solid lines, dashes, dots, dash-dot combinations, long dashes, or long dash-dot sequences to define how the outline appears. Adjust, configure, or enable different border stroke types to create distinctive radial gauge outlines, including various dashed or dotted border styles for visual clarity and highlighting. Set line patterns for gauge boundaries, customize the radial gauge edge appearance, and switch between solid or segmented stroke formats for stylistic or functional UI differentiation.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        gaugeArea: {
            border: {
                color: "#333333",
                width: 2,
                dashType: "dot"
            }
        },
        pointer: [{
            value: 60
        }]
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
Control and customize the transparency level, fade, or translucency of the circular gauge border area by setting its opacity value between fully invisible and completely solid, enabling subtle border effects or fully hidden edges, adjusting the gauge border's clarity, visibility, alpha channel, or see-through intensity to fit visual design needs and user interface aesthetics across different display contexts and styling requirements.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        gaugeArea: {
            border: {
                color: "#333333",
                width: 4,
                opacity: 0.5
            }
        },
        pointer: [{
            value: 45
        }]
    });
    </script>

### gaugeArea.border.width `Number`*(default: 0)*

The width of the border.


<div class="meta-api-description">
Adjust the thickness, size, or width of the circular gauge border by setting pixel-based numeric values to control how thick or thin the visual ring or outline around the radial gauge area appears. Configure, customize, or modify the border size of the gauge’s outer edge to enhance the styling or visual emphasis of the gauge boundary by increasing or decreasing the border line width. Enable precise control over the radial gauge’s outer frame thickness during setup or dynamic updates, influencing border thickness, stroke size, or line weight for the gauge area circle. Set, control, or tune the boundary line width for the radial visualization’s perimeter, affecting the overall gauge appearance and style.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        gaugeArea: {
            border: {
                color: "#000000",
                width: 5
            }
        },
        pointer: [{
            value: 80
        }]
    });
    </script>

### gaugeArea.height `Number`

The height of the gauge area.  By default, the vertical gauge is 200px and
the horizontal one is 60px.


<div class="meta-api-description">
Adjust or configure the vertical dimension, height, or size of a radial gauge’s display area to customize how tall or narrow the gauge rendering appears; set or control the gauge area height to optimize layout, scale, or fit within UI contexts, dashboards, or data visualization panels, enabling precise vertical size adjustments for radial gauges beyond default measurements or pixel values.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        gaugeArea: {
            height: 400
        },
        pointer: [{
            value: 30
        }]
    });
    </script>

### gaugeArea.margin `Number|Object`*(default: 5)*

The margin of the gauge area.


<div class="meta-api-description">
Adjusting the outer spacing or padding around a circular or radial gauge display to control the whitespace, margin, or buffer zone between the gauge and surrounding UI components or container edges, enabling developers to set, configure, or customize the gauge area's external spacing for precise alignment, layout management, and visual balance in dashboards, widgets, or data visualization interfaces.
</div>

#### Example

    <div id="gauge"></div>
    <script>
        $("#gauge").kendoRadialGauge({
            pointer: [{
                value: 20,
                gaugeArea:{
                    margin:50
                }
            }]
        });
    </script>

### gaugeArea.margin.top `Number`

The top margin of the gauge area.


<div class="meta-api-description">
Adjust or configure the vertical spacing or top padding above the gauge area in circular or radial gauge components, controlling the margin or gap between the top edge of the container and the gauge visualization for layout alignment, spacing, and positioning purposes. Enable precise top margin tuning, vertical offset adjustments, or padding above dial or radial indicators to achieve desired visual separation and proper alignment in dashboards, widgets, or UI elements that use radial or circular gauge displays. Set or customize the space above the gauge area to influence component layout, vertical spacing, and overall gauge placement within the interface.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        gaugeArea: {
            margin: {
                top: 30
            }
        },
        pointer: [{
            value: 55
        }]
    });
    </script>

### gaugeArea.margin.bottom `Number`

The bottom margin of the gauge area.


<div class="meta-api-description">
Control and customize the vertical spacing or padding below the gauge display area to adjust how far the radial gauge's visuals sit from the bottom edge or container boundary, enabling fine-tuned layout alignment, margin adjustment, and spacing optimization within the component’s display zone. Set, modify, or configure the distance between the gauge graphics and the enclosing element's lower edge to manage visual clearance, avoid overlap, or create balanced bottom margin space, useful for UI layout refinement and spatial tuning in dashboards and data visualization panels.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        gaugeArea: {
            margin: {
                bottom: 25
            }
        },
        pointer: [{
            value: 70
        }]
    });
    </script>

### gaugeArea.margin.left `Number`

The left margin of the gauge area.


<div class="meta-api-description">
Control and customize the left spacing or padding around a radial gauge's display area by adjusting the left margin or offset within the gauge container. This setting helps prevent visual clipping, aligns the radial gauge horizontally, and manages layout positioning by increasing or decreasing the empty space on the left side of the gauge area. Developers can set, configure, or tweak left margin values to achieve precise placement and spacing within UI components, ensuring the gauge fits properly without overlap or cutoff. Adjusting left side margin, padding, or layout offset supports flexible design alignment and spacing control for radial gauge visual presentations.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        gaugeArea: {
            margin: {
                left: 40
            }
        },
        pointer: [{
            value: 35
        }]
    });
    </script>

### gaugeArea.margin.right `Number`

The right margin of the gauge area.


<div class="meta-api-description">
Control or set the right-side spacing, padding, or margin of a radial gauge's display area to manage layout alignment, prevent visual clipping, adjust white space on the gauge's right edge, configure the distance between gauge content and container boundaries, modify horizontal spacing for styling or responsiveness, and fine-tune how elements inside the gauge area align or fit within the right margin during initialization or runtime adjustments.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        gaugeArea: {
            margin: {
                right: 35
            }
        },
        pointer: [{
            value: 85
        }]
    });
    </script>

### gaugeArea.width `Number`

The width of the gauge area.  By default the vertical gauge is 60px
and horizontal gauge is 200px.


<div class="meta-api-description">
Adjust or configure the width of the gauge area to control the horizontal or vertical size, layout, and spacing of the radial gauge component; set custom width dimensions to resize the gauge's container, affecting its overall display width, alignment, and visual proportions in various UI layouts or dashboards.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        gaugeArea: {
            width: 350
        },
        pointer: [{
            value: 42
        }]
    });
    </script>

### pointer `Array`

The pointer configuration options. It accepts an `Array` of pointers, each with it's own configuration options.


<div class="meta-api-description">
Customize and control multiple needle indicators on radial gauges by setting an array of pointers, each individually configurable for appearance, style, behavior, position, color, size, animation, and interactivity. Enable diverse gauge readings with flexible pointers, adjusting their visual properties and dynamic responses to represent different data points, thresholds, or metrics. Configure multiple gauge needles with specific settings for each to display various values or statuses simultaneously on circular dials, allowing precise control over pointer customization, layering, and behavior in dashboards, meters, or instrument panels.
</div>

#### Example - specify single pointer
    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
        value: 20
        }]
    });
    </script>

#### Example - specify multiple pointers
	<div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
        value: 20
        }, {
        value: 40
        }]
    });
    </script>

### pointer.cap `Object`

The cap configuration options.


<div class="meta-api-description">
Adjust and configure the pointer tip style on circular or radial gauges by controlling the cap’s size, shape (such as round or flat), color, background, border styling, visibility toggling, and overall appearance; customize the pointer’s end decoration for better visual clarity, design consistency, or thematic styling in dashboards, meters, or instrumentation interfaces, enabling precise control over pointer aesthetics and rendering effects.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 60,
            cap: {
                color: "#ff0000",
                size: 0.8
            }
        }]
    });
    </script>

### pointer.cap.color `String`

The color of the cap.
Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
Customize the end tip color of the gauge pointer by specifying any valid CSS color format such as hex codes, rgb, rgba, hsl, or named colors to control and style the pointer cap appearance on radial gauges. Adjust, set, or configure the visible pointer end color dynamically during setup to match themes, highlight readings, or enhance UI feedback with precise color control of the pointer’s cap element.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 75,
            cap: {
                color: "#00aa00"
            }
        }]
    });
    </script>

### pointer.cap.size `Number`

The size of the cap in percents. (from 0 to 1)


<div class="meta-api-description">
Adjust the size or scale of the circular end cap on a radial gauge pointer by configuring its relative dimension as a percentage or proportional value between zero and one, enabling control over the pointer’s visual emphasis, removal of the end cap, or adjustment for desired aesthetics and clarity in gauge displays, with options to set minimal, partial, or full cap coverage to customize the pointer’s tip appearance in dashboards, monitoring tools, or data visualization components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 50,
            cap: {
                color: "#0066cc",
                size: 0.6
            }
        }]
    });
    </script>

### pointer.color `String`

The color of the pointer.
Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
Customize the pointer's appearance by selecting and configuring its color to emphasize specific values, align with design themes, or enhance visibility; this includes the ability to specify colors using various CSS color formats such as hexadecimal codes, RGB, RGBA, HSL, and named color keywords to precisely control the visual styling or highlight sections of a circular gauge indicator.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 65,
            color: "#ff6600"
        }]
    });
    </script>

### pointer.length `Number`

The pointer length (in percent) that is based on the distance to the scale.
The default length of `1` indicates that the pointer exactly reaches the scale.
Accepts values between `0.1` and `1.5`.


<div class="meta-api-description">
Adjust, configure, or set the pointer length of a radial gauge needle as a customizable percentage of the distance from the center to the scale, allowing precise control over the needle’s reach or extension. Scale the needle length from much shorter to slightly longer than the radius by specifying numeric values between 0.1 and 1.5, enabling fine-tuning of the gauge’s visual pointer size or adjusting how far the needle extends toward or beyond the gauge markings for improved readability, styling, or custom gauge designs. Modify the radial gauge pointer’s length dynamically to optimize display, alignment, or layout needs in dashboards, monitoring interfaces, or real-time data visualization components.
</div>

#### Example - specify pointers with different lengths
    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 10,
            color: '#ffd246',
            length: 0.5
        }, {
            value: 20,
            color: '#28b4c8',
            length: 0.75
        }, {
            value: 30,
            color: '#78d237',

            // Default length
            // length: 1
        }]
    });
    </script>

### pointer.value `Number`

The value of the gauge.


<div class="meta-api-description">
control or update the numeric reading displayed by a radial gauge needle, set or initialize the pointer’s position on a circular scale, adjust the gauge indicator dynamically at runtime to reflect different values, configure the needle’s value to represent measurements or metrics, enable real-time updates of the pointer placement relative to the gauge axis, manipulate the gauge reading via code or component properties, programmatically change the gauge indicator value for visualization purposes, set the radial gauge needle to a specific numeric point, synchronize the pointer position with data inputs, and refine or calibrate the gauge display by adjusting its numeric indicator value.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 85
        }],
        scale: {
            min: 0,
            max: 100
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
Configure the rendering mode of a radial gauge by selecting between scalable vector graphics (SVG) or HTML5 Canvas output to control visual quality and performance. Enable or set the gauge to render using SVG for crisp, resolution-independent graphics or switch to Canvas for faster pixel-based drawing, with automatic fallback if the preferred rendering technology is unsupported by the browser. Control display options by specifying preferred rendering engines like "svg" or "canvas" to optimize compatibility, rendering speed, or appearance on different platforms and devices while ensuring the gauge gracefully defaults to the best available method. Adjust, select, or toggle the rendering backend to match project requirements, balancing quality and performance in diverse browser environments.
</div>

#### Example - Render as Canvas, if supported

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
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
Configure or adjust the numerical range settings including minimum and maximum limits, customize the angular span or rotation from start to end positions, define the intervals for major and minor scale units, set the frequency and style of ticks and labels, control the distribution and layout of numerical markers, tailor the visual appearance of scale elements such as colors and fonts, and manage ranges or segments along the gauge to reflect different value zones. Developers seeking to set, tune, or control numeric boundaries, angular parameters, tick marks, label formatting, and range highlights within circular gauge components will find solutions for scale customization, numeric interval configuration, gauge indicator measurement scaling, and appearance adjustments under this configurable scale property.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 40
        }],
        scale: {
            min: 0,
            max: 100,
            startAngle: -45,
            endAngle: 225,
            majorUnit: 20,
            minorUnit: 5
        }
    });
    </script>

### scale.endAngle `Number`*(default: 210)*

 The end angle of the gauge.
The gauge is rendered clockwise(0 degrees are the 180 degrees in the polar coordinate system)


<div class="meta-api-description">
Adjust the finishing angle of a circular gauge’s scale, controlling where the gauge arc terminates in degrees to customize the visual range or segment of the dial; set or configure the gauge’s end rotation point for clockwise rendering, enabling precise control over the angular span and endpoint position for radial indicators, ensuring the gauge arc completes at the desired degree mark within polar coordinates and can be tailored for partial or full circle gauge displays.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 70
        }],
        scale: {
            endAngle: 180
        }
    });
    </script>

### scale.labels `Object`

Configures the scale labels.


<div class="meta-api-description">
Control and customize the display of scale text on a radial gauge by configuring label visibility, text format patterns, templates, rotation angles, positioning, spacing or step intervals, and other styling or layout settings that define how scale numbers and markers appear around the gauge dial. Adjust label arrangement, style, formatting strings, orientation, step increments, and placement to fine-tune how numeric or categorical scale indicators are rendered for clear visualization, precise formatting, and tailored gauge presentations in dashboards, charts, or UI components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 25
        }],
        scale: {
            labels: {
                color: "#333333",
                font: "14px Arial",
                visible: true,
                position: "outside"
            }
        }
    });
    </script>

### scale.labels.background `String`

The background color of the labels.
Any valid CSS color string will work here, including hex and rgb


<div class="meta-api-description">
Adjust or configure the background color behind scale labels in circular or radial gauge components to enhance visibility, contrast, or highlight specific measurement values using any standard CSS color format such as hex codes, RGB, RGBA, HSL, or named colors, enabling customization of label appearance for improved readability or design consistency in dashboards, data visualizations, or UI controls.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 55
        }],
        scale: {
            labels: {
                background: "#ffffcc"
            }
        }
    });
    </script>

### scale.labels.border `Object`

The border of the labels.


<div class="meta-api-description">
Control and customize the visual appearance and styling of scale label borders, including setting outline color, thickness, dash patterns, stroke style, and border width around radial gauge labels. Configure label outlines for clarity, emphasis, or aesthetic purposes by adjusting border styling attributes such as color shading, line weight, dashed or solid lines, and detailed border customization. Enable or modify label border decorations to improve readability, highlight scale markers, or apply specific design themes to gauge labels. Set and fine-tune the border display options on scale labels for radial or circular gauge components, ensuring precise control over their graphical outlines and enhancing visual distinction. Adjust and apply various border properties to scale labels for tailored UI presentation, including border colors, line styles, thickness, and dash effects.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 80
        }],
        scale: {
            labels: {
                border: {
                    color: "#999999",
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
Control and customize the color of the borders around scale labels on circular or radial gauges, enabling theme matching, visual emphasis on ticks, annotations, or scale markings, with support for any valid CSS color formats including hex codes, RGB, RGBA, HSL, and named colors to enhance readability and styling of gauge label borders in dashboards, data visualizations, or UI components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 45
        }],
        scale: {
            labels: {
                border: {
                    color: "#ff0000",
                    width: 2
                }
            }
        }
    });
    </script>

### scale.labels.border.dashType `String`*(default: "solid")*

The dash type of the border.


<div class="meta-api-description">
Configure the pattern of the border stroke around scale labels on a radial gauge, enabling control over the outline style such as solid, dashed, dotted, or custom dash patterns, to customize label borders visually by setting border dash types for enhanced gauge label styling, border appearance adjustments, and stroke pattern modifications in visualization components or data display gauges.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 30
        }],
        scale: {
            labels: {
                border: {
                    color: "#333333",
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

### scale.labels.border.opacity `Number` *(default: 1)*

The opacity of the border. By default the border is opaque.


<div class="meta-api-description">
Control the transparency or visibility of label borders on circular or radial gauges, adjusting the opacity level of scale tick or label outlines from fully transparent to fully opaque with numeric values between 0 and 1, enabling subtle or prominent border effects for gauge scales, dial labels, or indicator markings, configurable at setup or initialization to fine-tune the appearance and styling of gauge labels and their outlines for better visual emphasis or minimalism in dashboards, charts, or instrumentation displays.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 60
        }],
        scale: {
            labels: {
                border: {
                    color: "#000000",
                    width: 3,
                    opacity: 0.5
                }
            }
        }
    });
    </script>

### scale.labels.border.width `Number`*(default: 0)*

 The width of the border.


<div class="meta-api-description">
Control the thickness, size, or width of label borders around gauge scale markings, customize how thick or thin the outline appears on scale label borders, adjust border thickness or stroke width for labels on circular or radial gauges, define or set border width to enhance label visibility or styling, configure border line thickness around numeric or textual scale labels, manage the outline weight for scale label borders on radial indicators, specify thickness of label boundary lines to improve clarity or design on gauge scales, fine-tune or adjust label edging thickness for better scale readability and presentation.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 75
        }],
        scale: {
            labels: {
                border: {
                    color: "#666666",
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
Adjust or configure the color of scale label text on circular or radial gauges to enhance visual clarity, readability, or theme consistency by specifying any valid CSS color format such as hex codes, RGB, RGBA, HSL, or named colors. Control label appearance, customize text color for better contrast or branding, and set precise color values for scale markings on radial meters or gauges to improve user interface aesthetics and ensure labels stand out clearly against the gauge background or surrounding elements.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 50
        }],
        scale: {
            labels: {
                color: "#0066cc"
            }
        }
    });
    </script>

### scale.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.


<div class="meta-api-description">
Adjust and configure the font style, family, size, weight, and style of scale labels on circular gauges to enhance readability and align with branding requirements by setting typography parameters, specifying CSS-compatible font strings or equivalent formats that control label appearance on radial or round gauge dials for clear, customizable numeric or textual scales.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 35
        }],
        scale: {
            labels: {
                font: "16px 'Arial Black'"
            }
        }
    });
    </script>

### scale.labels.format `String`

The [`format`](/globalization/intl/numberformatting) of the labels.


<div class="meta-api-description">
Customize the appearance of scale labels by configuring number formatting, including decimal precision, percentage styles, currency formats, or custom numeric patterns to control how values display on radial or circular gauges. Enable precise label formatting using format strings like standard numeric formats ("n0" for integers, "p1" for percentages) or tailor label output with custom formats to enhance readability and match specific localization or presentation needs on dial, gauge, or meter controls. Adjust, set, or control the textual representation of scale values by applying formatting for decimals, percentages, currency symbols, and other common or complex numeric patterns to present gauge readings clearly and consistently.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        renderAs: "canvas",
        pointer: {
        value: 50
        },
        scale: {
        min: 0,
        max: 100,
        labels: {
            // set the format to currency
            format: "C"
        }
        }
    });
    </script>

### scale.labels.margin `Number|Object`*(default: 0)*

The margin of the labels.


<div class="meta-api-description">
Control and adjust the spacing, padding, or margin around scale labels on circular or radial gauges to set the distance between label text and nearby ticks, gauge elements, or container edges, enabling better label layout, preventing overlap or crowding, customizing label positioning, refining visual clarity, and managing label-to-element spacing in configurable gauge scales for precise control over label placement and gauge appearance.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 65
        }],
        scale: {
            labels: {
                margin: {
                    top: 10,
                    bottom: 5,
                    left: 8,
                    right: 8
                }
            }
        }
    });
    </script>

### scale.labels.margin.top `Number`

The top margin of the labels.


<div class="meta-api-description">
Control or adjust the vertical spacing or distance above scale labels within circular gauges, setting the top margin or padding to fine-tune label alignment and positioning in radial scales, modify the whitespace above numeric or text marks on dial displays, configure how much space appears above each scale label for clarity, balance, or improved readability in gauge visualizations, customize label offsets or margins on analog meter scales, and manage the top padding around scale annotations to ensure proper layout and aesthetic presentation in radial gauge components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 40
        }],
        scale: {
            labels: {
                margin: {
                    top: 15
                }
            }
        }
    });
    </script>

### scale.labels.margin.bottom `Number`

The bottom margin of the labels.


<div class="meta-api-description">
Control vertical spacing below the scale labels by setting the bottom margin to adjust the gap, offset, or padding between label text and surrounding elements in circular or radial gauge components. Configure, customize, or set the distance underneath scale number labels to improve layout alignment, label positioning, visual clarity, and spacing in dial gauges or radial indicators. Enable precise control over how far labels extend downward from the gauge scale, allowing adjustment of the vertical offset or whitespace to prevent overlap with other UI elements, ensuring neat and readable gauge displays with flexible margin settings.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 85
        }],
        scale: {
            labels: {
                margin: {
                    bottom: 12
                }
            }
        }
    });
    </script>

### scale.labels.margin.left `Number`

The left margin of the labels.


<div class="meta-api-description">
Configure the horizontal spacing, left padding, or margin offset of scale labels around circular gauges to control their precise left-side alignment, positioning, or distance from scale ticks, edges, or markers; adjust label placement, indentation, or offset for radial indicator scales to fine-tune layout, prevent overlap, and customize label arrangement relative to the gauge's circumference or scale markings.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 25
        }],
        scale: {
            labels: {
                margin: {
                    left: 20
                }
            }
        }
    });
    </script>

### scale.labels.margin.right `Number`

The right margin of the labels.


<div class="meta-api-description">
Adjust or set the horizontal spacing, padding, or right-side margin of scale labels on a radial gauge control to control the distance between the labels and the gauge edge, surrounding elements, or tick marks; configure label alignment, label positioning, and spacing to optimize label placement, readability, and layout on circular or radial charts or gauges, including fine-tuning label margins, offsets, or gaps on the right side to prevent label overlap or clipping in visual displays.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 70
        }],
        scale: {
            labels: {
                margin: {
                    right: 18
                }
            }
        }
    });
    </script>

### scale.labels.padding `Number | Object`*(default: 0)*

 The padding of the labels.


<div class="meta-api-description">
Customize label spacing around scale markers by setting padding to control the distance between label text and surrounding elements, enabling adjustment of inner margins for improved readability, balanced label positioning, tick label separation, layout fine-tuning, and visual clarity on circular or radial gauges, dial interfaces, or gauge components where precise label-to-edge spacing and consistent label distribution are important for clear data representation and user-friendly display configuration.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 55
        }],
        scale: {
            labels: {
                padding: {
                    top: 8,
                    bottom: 8,
                    left: 10,
                    right: 10
                }
            }
        }
    });
    </script>

### scale.labels.padding.top `Number`

The top padding of the labels.


<div class="meta-api-description">
Adjust vertical spacing above scale labels by setting the top padding for gauge scale text, enabling control over label positioning, spacing adjustment above numeric or textual scale markers, fine-tuning label layout through pixel values, customizing label distance from the scale line, modifying vertical margins or offsets for better readability or alignment in circular or radial gauge components, configuring top padding to increase or decrease space above scale annotations, and managing label spacing to enhance visual clarity and user interface precision in radial measurement displays.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 45
        }],
        scale: {
            labels: {
                padding: {
                    top: 12
                }
            }
        }
    });
    </script>

### scale.labels.padding.bottom `Number`

The bottom padding of the labels.


<div class="meta-api-description">
Adjust vertical spacing below radial gauge scale labels by configuring the bottom padding to control label positioning, improve readability, manage label layout spacing, fine-tune label distance from the gauge scale, set custom bottom margin or padding beneath labels, optimize label separation for better visual clarity, and adjust the vertical offset of scale labels on circular gauges.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 80
        }],
        scale: {
            labels: {
                padding: {
                    bottom: 15
                }
            }
        }
    });
    </script>

### scale.labels.padding.left `Number`

The left padding of the labels.


<div class="meta-api-description">
Adjust the horizontal spacing or left margin of the scale labels around a circular or radial gauge to control how far the text labels are offset from the gauge’s numbers, marks, or dial. Modify the indentation, left-side padding, label distance, or label offset for numeric or text ticks displayed along the gauge’s scale, enabling customization of label positioning relative to the gauge visuals, ensuring clear readability and precise alignment. Configure or set the left padding of scale labels to manage the gap between labels and the gauge’s circular edge or markings in dashboards, meters, or instrument panel visualizations.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 35
        }],
        scale: {
            labels: {
                padding: {
                    left: 14
                }
            }
        }
    });
    </script>

### scale.labels.padding.right `Number`

The right padding of the labels.


<div class="meta-api-description">
Control and customize the horizontal spacing or right padding around scale labels within circular gauges, adjusting the distance between label text and nearby ticks, markers, or gauge layout components. This setting enables fine-tuning of label positioning for readability and visual balance by increasing or decreasing the space on the right side of labels, useful for aligning text, avoiding overlap with adjacent elements, or tailoring label margins in radial or circular gauge visualizations. Adjusting the right padding for scale labels helps configure label spacing, layout alignment, and clear separation from gauge ticks or other graphical elements in radial data displays.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 90
        }],
        scale: {
            labels: {
                padding: {
                    right: 16
                }
            }
        }
    });
    </script>

### scale.labels.position `String`*(default: "inside")*

The labels positions.


<div class="meta-api-description">
Adjust, configure, or set the placement of scale labels around a circular gauge to control their positioning relative to ticks and dial, including options to place labels inside the gauge area, outside along the perimeter, or centered on the scale; this enables customization of label alignment, improves visibility, readability, and layout for radial or circular gauges, and allows fine-tuning of label positions for better presentation and user interface clarity in data visualization components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 65
        }],
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
Control and customize the appearance and formatting of tick labels on a circular or radial gauge scale by providing a flexible labeling template that supports dynamic value substitution, localization, formatting options, text transformation, and conditional logic for each scale mark or tick. Enable precise presentation of numeric or categorical values around the gauge's dial, define how scale numbers or labels are displayed and styled, customize label output during rendering or initialization, and support various formats such as percentages, units, or localized strings to improve readability and adapt labels to different languages or contexts. Adjust label templates to transform raw scale values into meaningful, formatted text or styled elements that align with user interface requirements or branding guidelines.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        renderAs: "canvas",
        pointer: {
        value: 50
        },
        scale: {
        min: 0,
        max: 100,
        labels: {
            // set the format to currency
            template: "#= value #%"
        }
        }
    });
    </script>

### scale.labels.visible `Boolean`*(default: true)*

 The visibility of the labels.


<div class="meta-api-description">
Control the visibility of scale labels on a radial gauge by toggling their display, enabling users to show or hide numeric or text labels around the gauge’s scale, configure label rendering on initialization, set whether scale markers or indicators include readable labels, manage label presence for clarity or minimalism in gauge design, adjust label display settings to customize the gauge’s appearance, and enable or disable scale label visibility to meet user interface requirements or preferences.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 40
        }],
        scale: {
            labels: {
                visible: false
            }
        }
    });
    </script>

### scale.majorTicks `Object`

Configures the scale major ticks.


<div class="meta-api-description">
Control and customize the visibility, frequency, spacing, and appearance of major tick marks on a circular or radial scale, including setting intervals or steps between ticks, adjusting their length or size, choosing colors or styling options, and determining placement or alignment on a gauge or dial. Enable or configure how prominent scale markers or divisions are displayed on radial instruments, dashboard widgets, or circular meters, ensuring ticks highlight key measurement points with adjustable spacing, thickness, and color settings to fit design and functional needs. Adjust major tick intervals and visual styles to enhance readability, precision indication, or aesthetic presentation of round gauges and circular progress indicators.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 70
        }],
        scale: {
            majorTicks: {
                color: "#ff0000",
                size: 10,
                width: 2,
                visible: true
            }
        }
    });
    </script>

### scale.majorTicks.color `String`

The color of the major ticks.


<div class="meta-api-description">
Set or customize the color of prominent tick marks on circular gauges to enhance visibility, match design themes, highlight key values, or improve readability. Configure the appearance of main scale markers using color settings to control emphasis, contrast, styling, and visual clarity of major graduations on radial or analog dials. Adjust or override default colors of primary tick indicators for better integration with UI palettes or to draw attention to particular measurement points on circular scales.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 50
        }],
        scale: {
            majorTicks: {
                color: "#00aa00"
            }
        }
    });
    </script>

### scale.majorTicks.size `Number`

The major tick size.
This is the length of the line in pixels that is drawn to indicate the tick on the scale.


<div class="meta-api-description">
Adjust the length, size, or dimensions of major tick marks on circular or radial gauges, controlling how prominent or subtle the main scale indicators appear in pixels; configure, set, or customize the length of the primary tick lines that mark significant intervals or divisions on round meter scales to highlight or reduce their visibility for clearer reading or aesthetic preference.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 30
        }],
        scale: {
            majorTicks: {
                size: 15
            }
        }
    });
    </script>

### scale.majorTicks.visible `Boolean`*(default: true)*

 The visibility of the major ticks.
Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
Control the display, visibility, or rendering of primary tick marks on a circular gauge or dial by enabling or disabling major ticks to customize appearance; configure whether these main scale indicators are shown or hidden on radial or circular progress visuals, allowing fine-tuning of gauge graduations, intervals, or step marks for clarity and readability in dashboards, meters, or instrumentation interfaces, supporting toggling and styling of significant tick lines that denote major measurement points or scale divisions.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 85
        }],
        scale: {
            majorTicks: {
                visible: false
            }
        }
    });
    </script>

### scale.majorTicks.width `Number`*(default: 0.5)*

The width of the major ticks.


<div class="meta-api-description">
Set or configure the thickness, stroke width, or boldness of the main or primary tick marks on a circular or radial gauge scale to control their visibility, prominence, or subtlety; options to adjust major scale tick thickness help customize the gauge appearance by making large ticks thicker, narrower, bolder, or lighter during initialization or runtime styling to improve readability, visual emphasis, or design consistency.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 60
        }],
        scale: {
            majorTicks: {
                width: 3
            }
        }
    });
    </script>

### scale.majorUnit `Number`

The interval between major divisions.


<div class="meta-api-description">
Control and configure the interval spacing between major tick marks or primary divisions on a circular or radial gauge by setting the numeric step that defines how frequently main scale marks and labels appear, enabling adjustment of the scale granularity, visual segmentation, and labeling density for better readability and precision in radial meter displays.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 75
        }],
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
Set or adjust the highest numeric value displayed on a circular or radial gauge to control the upper limit or endpoint of the scale, influencing how tick marks, labels, indicator ranges, and pointer positions are calculated and rendered. Configure, define, or customize the maximum scale boundary, top value, or upper threshold to ensure accurate representation of measurement ranges, limits, or maximum readings on dial-style meters, speedometers, or analog displays. Enable scaling, boundary setting, or limit capping for gauges in dashboards, visualizations, or embedded widgets, affecting how data values align with the gauge's endpoint and impact visual feedback.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 180
        }],
        scale: {
            max: 200
        }
    });
    </script>

### scale.min `Number`*(default: 0)*

 The minimum value of the scale.


<div class="meta-api-description">
Control and define the minimum numeric value or starting point of a circular gauge’s measurement scale to set gauge range boundaries, limit pointer movement, customize scale start, adjust tick marks and labels beginning, configure the lowest scale value, establish the scale’s minimum threshold, set pointer minimum limit, and tailor the gauge’s displayed numeric range from the bottom end for precise measurement visualization.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 40
        }],
        scale: {
            min: 20,
            max: 100
        }
    });
    </script>

### scale.minorTicks `Object`

Configures the scale minor ticks.


<div class="meta-api-description">
Control and customize the appearance, visibility, spacing, frequency, density, and styling of small incremental marks or subdivisions on circular gauges, enabling precise adjustments of minor scale divisions, tick marks, or fine graduations to enhance readability, accuracy, and detailed measurement representation on radial or analog gauge components during setup or runtime configuration.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 55
        }],
        scale: {
            minorTicks: {
                color: "#0066cc",
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
Customize and control the appearance of small tick marks on a circular gauge by defining their color using any valid CSS color format such as hex codes, RGB, or named colors. Enable styling options to set, change, or update the minor tick colors on a radial or circular scale, adjusting visual details like subtle marks or fine divisions on gauge scales for better readability or thematic matching. Configure the minor ticks’ color dynamically or at initialization to highlight, differentiate, or harmonize scale elements, supporting use cases involving custom gauge themes, UI consistency, or improved data visualization through precise color settings of secondary scale indicators.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 80
        }],
        scale: {
            minorTicks: {
                color: "#666666"
            }
        }
    });
    </script>

### scale.minorTicks.size `Number`

The minor tick size.
This is the length of the line in pixels that is drawn to indicate the tick on the scale.


<div class="meta-api-description">
Adjust the length or size of small tick marks on a circular gauge scale to control their visibility and spacing, enabling customization of the minor graduations or subdivisions on a radial dial display. Modify the pixel length of subtle scale indicators to enhance detail precision, fine-tune measurement increments, or visually emphasize minor divisions between major ticks on a round gauge component. This setting helps configure how long the minor marks appear, allowing developers to set, scale, or resize small tick lines for better readability, accurate measurement visualization, and aesthetic control over the dial's fine scale markers.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 25
        }],
        scale: {
            minorTicks: {
                size: 8
            }
        }
    });
    </script>

### scale.minorTicks.visible `Boolean`*(default: true)*

 The visibility of the minor ticks.


<div class="meta-api-description">
Control the visibility or display of smaller incremental tick marks on a circular or radial gauge scale by enabling or disabling minor tick marks, allowing customization of detailed scale increments for improved readability, precise measurement visualization, or stylistic adjustments. Adjust or configure the showing, hiding, rendering, or presence of minor divisions or ticks on the gauge to match display preferences, clarity needs, or design requirements. Enable fine-grain scale notches, small markers, or minor graduation lines to provide detailed reference points or suppress them for a cleaner gauge interface during initialization or runtime.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 95
        }],
        scale: {
            minorTicks: {
                visible: false
            }
        }
    });
    </script>

### scale.minorTicks.width `Number`*(default: 0.5)*

 The width of the minor ticks.


<div class="meta-api-description">
Adjust the thickness or line width of small tick marks on a circular gauge scale to control their visual prominence, style, and clarity, including configuring minor tick thickness, setting the width of scale subdivisions, customizing the weight of minor scale ticks for better visibility, and controlling the line size of secondary tick marks to enhance rendering and improve gauge readability.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 45
        }],
        scale: {
            minorTicks: {
                width: 2
            }
        }
    });
    </script>

### scale.minorUnit `Number`

The interval between minor divisions.


<div class="meta-api-description">
Control the interval and spacing between small scale subdivisions or subticks on a circular gauge, enabling customization of how frequently minor tick marks or divisions appear between major scale units, adjust the granularity of minor intervals, set the distance between minor ticks, configure subtick frequency on radial or circular meter scales, and fine-tune the visualization of smaller incremental marks for precise gauge readings and detailed scale calibration.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 35
        }],
        scale: {
            majorUnit: 20,
            minorUnit: 5
        }
    });
    </script>

### scale.ranges `Array`

The ranges of the scale.


<div class="meta-api-description">
Set and customize multiple color-coded segments or intervals along a circular gauge scale to visually highlight specific value ranges or thresholds, control start and end points for each segment, adjust colors and styles for emphasis, configure discrete or continuous colored zones, enable dynamic or static range highlighting, and map value intervals to distinct visual ranges for improved readability, alerts, or data segmentation on radial or circular meters.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        renderAs: "canvas",
        pointer: {
        value: 50
        },
        scale: {
        min: 0,
        max: 100,
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
Set or adjust the starting point, initial value, or lower bound of a gauge scale segment, range, or threshold to define where a colored region, indicator, or segment begins within a radial gauge’s measurement units. Configure, position, or bind the range start dynamically to customize scale divisions, highlight key intervals, thresholds, or alert zones by specifying the exact value where the range initiates on the gauge scale. Enable precise control over the onset of colored bands, scale partitions, or indicator ranges to reflect measurement limits, warning zones, or visual markers starting values.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 65
        }],
        scale: {
            ranges: [{
                from: 50,
                to: 80,
                color: "orange"
            }]
        }
    });
    </script>

### scale.ranges.to `Number`

The end position of the range in scale units.


<div class="meta-api-description">
Configure or adjust the upper boundary, maximum value, or end point of a numeric range or interval on a radial gauge or circular scale for setting thresholds, limits, or colored zones. Define the high value of a range within scale units to control where the highlighted segment finishes, enabling precise customization of progress bars, meters, or data visualizations that display defined upper limits, cutoff points, or alert boundaries. Set, modify, or specify the terminal scale number for colored ranges, intervals, or gauge segments used to emphasize specific value zones, ranges, or measurement boundaries in dashboards, charts, and UI indicators.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 30
        }],
        scale: {
            ranges: [{
                from: 20,
                to: 40,
                color: "yellow"
            }]
        }
    });
    </script>

### scale.ranges.opacity `Number`

The opacity of the range.


<div class="meta-api-description">
Adjust or configure the transparency level, alpha, or opacity of gauge scale segments or ranges to control their visibility, visual layering, translucency, or fade effect within radial or circular gauges by setting a numeric transparency value from fully transparent to fully opaque, enabling fine-tuned display customization, blending, or overlay effects on scale segments, ranges, or colored sections for enhanced graphical representation and visual clarity.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 75
        }],
        scale: {
            ranges: [{
                from: 60,
                to: 90,
                color: "red",
                opacity: 0.7
            }]
        }
    });
    </script>

### scale.ranges.color `String`

The color of the range.
Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
Adjust or define the fill color for segments or ranges in circular gauges, enabling customization and visual emphasis through any CSS-compatible color format such as hex codes, RGB values, or named colors, to highlight value intervals, emphasize thresholds, or style portions of radial indicators and dials with flexible color settings that respond to design or functional requirements within range-based gauge components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 45
        }],
        scale: {
            ranges: [{
                from: 30,
                to: 60,
                color: "#00ff00"
            }]
        }
    });
    </script>

### scale.rangePlaceholderColor `String`

The default color for the ranges.


<div class="meta-api-description">
Configure the default fallback color for gauge scale segments lacking explicit color settings to ensure consistent visual styling, customize placeholder hues for radial gauge ranges, control the default appearance of uncolored scale sections, set or override the background shade for ranges without assigned colors, and manage range color defaults to maintain theme alignment and uniform gauge presentation during setup or dynamic updates.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 70
        }],
        scale: {
            rangePlaceholderColor: "#cccccc",
            ranges: [{
                from: 0,
                to: 50,
                color: "blue"
            }]
        }
    });
    </script>

### scale.rangeSize `Number`

The width of the range indicators.


<div class="meta-api-description">
Adjust the thickness or width of colored scale segments, scale range indicators, or gauge range bands to customize the prominence or subtlety of scale ranges within circular or radial gauges, enabling control over how wide the highlighted areas appear for better visual emphasis or clarity on radial measurement displays.
</div>

#### Example

    <div id="gauge"></div>
    <script>
      $("#gauge").kendoRadialGauge({
        pointer: {
          value: 50
        },
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

### scale.rangeDistance `Number`

The distance from the range indicators to the ticks.


<div class="meta-api-description">
Adjust or configure the spacing, gap, or distance between the gauge's range indicators and tick marks to create visual separation, improve clarity, and customize how close or far the ranges appear relative to the scale ticks; this is useful for controlling layout, enhancing gauge readability, setting offsets, or managing the proximity of range bands and tick marks in radial or circular gauges and instruments.
</div>

#### Example

    <div id="gauge"></div>
    <script>
      $("#gauge").kendoRadialGauge({
        pointer: {
          value: 50
        },
        scale: {
          ranges: [{
            from: 10,
            to: 20,
            color: "green"
          }],
          rangeDistance: 10
        }
      });
    </script>

### scale.reverse `Boolean`*(default: false)*

Reverses the scale direction - values are increase anticlockwise.


<div class="meta-api-description">
Control the direction of circular gauges by enabling or disabling counterclockwise progression, invert the scale orientation so values rise anticlockwise, reverse the rotation of ticks, needles, and value indicators on radial or circular dials, set the gauge to progress in the opposite direction for custom visualization, configure the scale flow to be anticlockwise instead of clockwise for different data representation, toggle reversed scale layouts for compass-style or unconventional gauge designs, adjust needle movement and tick distribution to follow an inverse angular path, enable flipped or mirrored radial scales for specialized dashboards, switch the numbering and indicator flow to anticlockwise progression for tailored user interfaces or unique gauge behaviors.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 60
        }],
        scale: {
            reverse: true
        }
    });
    </script>

### scale.startAngle `Number`*(default: -30)*

 The start angle of the gauge.
The gauge is rendered clockwise(0 degrees are the 180 degrees in the polar coordinate system)


<div class="meta-api-description">
Control the initial angle or starting point of a circular or radial gauge scale by specifying the rotation in degrees, enabling customization of where the scale begins and its orientation on the gauge dial; developers often seek to adjust the start angle to align the gauge with specific designs, set the scale’s zero point at a desired position, rotate the scale clockwise or counterclockwise, or configure the gauge to match polar coordinate conventions and achieve precise visual alignment.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 40
        }],
        scale: {
            startAngle: 0
        }
    });
    </script>

### theme `String` *(default: "sass")*

The gauge theme. With versions prior to R1 2023 this can be either the respective LESS theme from the list below or "sass".
When set to "sass" the gauge will read the variables from the [Sass-based themes]({% slug sassbasedthemes_kendoui %}).

Note: Since Q2 2024 release, the default value for the `theme` property is "sass" instead of "default". It is recommended to use "sass" with version Q2 2024 or later.


<div class="meta-api-description">
Control and customize the visual appearance and styling of the gauge by selecting or switching between predefined named LESS themes or enabling Sass-based design tokens, allowing the component to load theme variables, overrides, and custom styles through Sass configurations; configure the theme setting to apply consistent design schemes, switch between legacy LESS options or modern Sass themes, adapt styling dynamically for different versions or design systems, and manage visual theming, appearance presets, color schemes, and overrides to achieve desired gauge looks in diverse UI frameworks and design token environments.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 50
        }],
        theme: "bootstrap"
    });
    </script>

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
Enable or disable smooth animated transitions and motion effects during rendering or value changes in circular gauge components, controlling whether needle movement, range shifts, and scale updates animate or update instantly, useful for tuning performance, reducing visual motion, disabling animations for accessibility, managing UI responsiveness, or customizing gauge update behavior.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
            value: 80
        }],
        transitions: false
    });
    </script>

## Methods

### allValues

Allows setting or getting multiple Gauge values at once.


<div class="meta-api-description">
Retrieve or update all values in a radial gauge simultaneously by getting the complete array of current readings or setting multiple numeric inputs at once to control or batch-update the multi-value display, enabling efficient management of several gauge indicators together, configuring the gauge with a collection of values, reading all active measurements, or resetting multiple pointers in a single operation.
</div>

#### Parameters

##### values `Array` *(optional)*
An array of values to be set.

#### Returns
`Array` An array of the Gauge pointer values will be returned if no parameter is passed.

#### Example - setting multiple values
    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
        value: 20
        }, {
        value: 40
        }]
    });

    setTimeout(function(){
        var gauge = $("#gauge").data("kendoRadialGauge");
        gauge.allValues([60, 10]);
    },1000)

    </script>

#### Example - retrieving all values
    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: [{
        value: 20
        }, {
        value: 40
        }]
    });

    var gauge = $("#gauge").data("kendoRadialGauge");
    var allValues = gauge.allValues();
    </script>

### destroy

Prepares the Gauge for safe removal from the DOM.

Detaches event handlers and removes data entries in order to avoid memory leaks.


<div class="meta-api-description">
Remove or uninstall a circular gauge widget from the webpage, clear all associated event listeners, detach data bindings such as jQuery or other frameworks, clean up internal references to prevent memory leaks, disable interactions and visuals linked to the gauge, safely dispose of the component to free browser resources and prepare the element for complete removal from the document object model, ensuring proper cleanup of all event handlers and state to avoid lingering memory use or artifacts after dismantling the gauge.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: {
        value: 50
        },
        scale: {
        min: 0,
        max: 100
        }
    });
    setTimeout(function(){
        kendo.destroy($("#gauge"));
        $("#gauge").remove();
    },1000)
    </script>

### exportImage
Exports the Gauge as an image.
The result can be saved using [kendo.saveAs](/api/javascript/kendo/methods/saveas).

The export operation is asynchronous and returns a [promise](https://api.jquery.com/Types/#Promise).
The promise will be resolved with a PNG image encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).


<div class="meta-api-description">
Export the radial gauge visualization as an image, generate a PNG file or data URI from the gauge display, save or download the gauge snapshot synchronously or asynchronously, capture the current gauge rendering as a portable image format, convert the gauge view to a PNG image encoded as a base64 string, export or save the gauge graphic output for reports, share, or offline use, retrieve an image representation of the gauge for use in files or web contexts, obtain a downloadable picture of the gauge that can be processed with promises or asynchronous methods, handle export results with thenable functions to manage or store the graphic output.
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
        $("#gauge").kendoRadialGauge({
            pointer: {
                value: 50
            },
            scale: {
                min: 0,
                max: 100
            }
        });

        var gauge = $("#gauge").data("kendoRadialGauge");
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
Generate or create a PDF file from a radial gauge visualization that can be downloaded, saved locally, shared via email or messaging, or printed; convert gauge output into a portable document format asynchronously, providing a downloadable Data URI or file link for embedding or exporting gauge graphics, charts, or dial displays into PDF format for reporting, documentation, or presentation purposes; enable exporting gauge data as a PDF file with promise-based asynchronous handling for smooth integration in web applications and automated workflows.
</div>

#### Parameters

##### options `kendo.drawing.PDFOptions` *(optional)*
Parameters for the exported PDF file.

#### Returns
`Promise` A promise that will be resolved with a PDF file encoded as a Data URI.

#### Example - Exporting a chart to a PDF file
    <div id="gauge"></div>
    <script>
        $("#gauge").kendoRadialGauge({
            pointer: {
                value: 50
            },
            scale: {
                min: 0,
                max: 100
            }
        });

        var gauge = $("#gauge").data("kendoRadialGauge");
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
Generate a scalable vector graphics file of the radial gauge for purposes like downloading, printing, embedding in web pages, or exporting visual data representations; serialize the chart to SVG format asynchronously with a promise that returns a data URI string containing the full SVG content for use in saving, sharing, or embedding the gauge image, enabling developers to capture the exact graphical output in vector form from code, automate export workflows, and integrate with file-saving utilities or front-end display requirements.
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
        $("#gauge").kendoRadialGauge({
            pointer: {
                value: 50
            },
            scale: {
                min: 0,
                max: 100
            }
        });

        var gauge = $("#gauge").data("kendoRadialGauge");
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
trigger an immediate refresh or re-render of a radial gauge's visual display after programmatically changing its values, ranges, size, layout, or configuration settings; update gauge graphics, redraw visuals, reset layout computations, and refresh on-screen elements dynamically without reinitializing or recreating the entire gauge component, ensuring that programmatic adjustments reflect instantly in the user interface when controlling, modifying, or animating gauge properties.
</div>

#### Example
    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: {
        value: 50
        },
        scale: {
        min: 0,
        max: 100
        }
    });
    setTimeout(function(){
        var gauge = $("#gauge").data("kendoRadialGauge");
        gauge.redraw();
    },1000)
    </script>

### resize

Adjusts the widget layout to match the size of the container.


<div class="meta-api-description">
Adjust or update the gauge layout to fit changes in container size, resize or reflow the radial gauge when the surrounding element’s dimensions change, force recalculation of rendering parameters to realign ticks, labels, arcs, and other gauge elements, trigger redrawing and layout recalibration after DOM size modifications, CSS adjustments, window resizing, or displaying hidden elements, ensure the gauge visually adapts to dynamic container resizing and responsive design updates.
</div>

#### Example
    <div id="gauge" style="width: 100px; height: 100px;"></div>
    <script>
        $("#gauge").kendoRadialGauge({
            pointer: {
                value: 50
            },
            scale: {
                min: 0,
                max: 100
            }
        });

        $("#gauge")
        .css({ width: "200px", height: "200px" })
        .data("kendoRadialGauge").resize();
    </script>

#### Parameters

##### force `Boolean` *optional*

Defines whether the widget should proceed with resizing even if the element dimensions have not changed.

### setOptions

Sets the current gauge options.


<div class="meta-api-description">
Change, update, modify, or configure the settings and appearance of a radial gauge dynamically during runtime by applying new options, adjusting scale parameters, pointers, ranges, colors, styles, and other visual or functional properties without recreating the gauge instance. Enable live customization or refresh of gauge configurations through a method that accepts a complete or partial options object to control all elements such as scales, ticks, colors, thresholds, and indicators, supporting real-time updates to the gauge’s display and behavior in response to user inputs or data changes.
</div>

#### Parameters

##### options `Object`

The gauge settings to update.

#### Example

    <div id="gauge"></div>
    <script>
        $("#gauge").kendoRadialGauge({
            pointer: [{
                value: 50
            }]
        });

        $("#gauge").data("kendoRadialGauge").setOptions({ theme: 'metro' });
    </script>

### svg

Returns the [SVG](https://www.w3.org/Graphics/SVG/) representation of the gauge.
The returned string is a self-contained SVG document that can be used as is or
converted to other formats using tools like [Inkscape](https://inkscape.org/en) and
[ImageMagick](https://www.imagemagick.org/).
Both programs provide command-line interface suitable for server-side processing.

> This method is obsoleted by [exportSVG](/api/javascript/dataviz/ui/radialgauge/methods/exportsvg), but will remain fully functional.


<div class="meta-api-description">
Convert or export the radial gauge visualization into a complete, standalone SVG format for purposes such as saving locally, embedding in web pages, printing, or transforming into other graphic formats using external tools like Inkscape or ImageMagick. Generate a full SVG string output representing the gauge as a self-contained vector image document that can be utilized directly or processed server-side through command-line utilities for format conversions, integration, or embedding workflows requiring scalable, interoperable graphics. This approach supports developer needs for exporting, saving, embedding, printing, converting, or scripting automated vector graphic manipulations of radial gauge displays, ensuring flexible handling of rendered gauge visuals across platforms and pipelines.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: {
            value: 50
        },
        scale: {
            min: 0,
            max: 100
        }
    });
    var gauge = $("#gauge").data("kendoRadialGauge");
    var svg = gauge.svg();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(svg); // displays the SVG string
    </script>

### imageDataURL

Returns a PNG image of the gauge encoded as a [Data URL](https://developer.mozilla.org/en-US/docs/data_URIs).

> This method is obsoleted and replaced by [exportImage](/api/javascript/dataviz/ui/radialgauge/methods/exportimage), but will remain fully functional.


<div class="meta-api-description">
Generate or obtain a base64-encoded PNG data URL representing the rendered radial gauge image for embedding, exporting, downloading, uploading, or sharing the gauge visualization as an inline image string; retrieve the graphic output as a Data URI format suitable for in-browser display, server uploads, or client-side saving, enabling conversion of the gauge's current rendering into a compact image source that can be easily integrated or transferred.
</div>

#### Returns

`String` A data URL with `image/png` MIME type. Will be `null` if the browser does not support the `canvas` element.

#### Example - show a snapshot of the gauge

    <div id="gauge"></div>
    <a download="export.png" id="export" class="k-button">Export PNG</a>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: {
            value: 50
        },
        scale: {
            min: 0,
            max: 100
        }
    });

    $("#export").on("click", function() {
    var gauge = $("#gauge").data("kendoRadialGauge");
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
Change or set the numeric measurement displayed on a radial gauge dynamically during runtime, programmatically updating the pointer, scale indicators, and visualization instantly to reflect new values in live data scenarios, interactive controls, or real-time monitoring. Adjust, modify, or push numeric readings to the gauge on the fly to control what measurement is shown, enabling continuous updates, user-driven value changes, or data-bound refreshes in dashboards, widgets, or instrumentation displays.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoRadialGauge({
        pointer: {
        value: 50
        },
        scale: {
        min: 0,
        max: 100
        }
    });
    setTimeout(function(){
        $("#gauge").data("kendoRadialGauge").value(20);
    },1000)
    </script>
