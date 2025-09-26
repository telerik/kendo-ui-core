---
title: ArcGauge
page_title: Configuration, methods and events of Kendo UI DataViz ArcGauge
description: Learn the configuration options for Arc Gauge widget, use methods properly.
res_type: api
component: gauges
---

# kendo.dataviz.ui.ArcGauge

## Configuration

### centerTemplate `String|Function`

The label template.
Template variables:
*   **value** - the value


<div class="meta-api-description">
Customize and control the center label of a circular gauge with dynamic, formatted text or HTML content that can include real-time values, measurement data, or statistics, enabling developers to inject variables, bind data, and format the display for dashboards or visual indicators. Configure, set, or enable customizable center text, labels, badges, or annotations inside radial gauges using template syntax or plain strings, supporting dynamic content generation and visual adjustments to reflect changing numeric values or metrics in the gauge's core area.
</div>

#### Example

    <div id="gauge"></div>
    <script>
     $("#gauge").kendoArcGauge({
        value: 30,
        centerTemplate: '#: value #%'
     });
    </script>

### color `String`

The color of the value pointer. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
Set or customize the pointer color of a circular gauge or dial indicator using any valid CSS color format like hex, rgb, or named colors to control or configure the visual appearance, highlight, or style of the value pointer on arc-shaped gauges, enabling developers to adjust, modify, or override the default pointer hue for precise, dynamic, or theme-consistent UI designs and dashboards that require color-coded value representation or emphasis on range indicators.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        color: "#ff6800"
    });
    </script>

### colors `Array`

The color ranges of the value pointer. The pointer color will be set to the color from the range that contains the current value.


<div class="meta-api-description">
Set up dynamic pointer color changes based on numeric value ranges, enabling the gauge needle or pointer to automatically switch colors according to predefined thresholds, value intervals, or numeric conditions. Control the color styling of the gauge indicator by specifying multiple ranges to highlight different value segments with distinct colors, allowing visual emphasis on low, medium, high, or custom value states. Configure conditional coloring, threshold-based color mapping, and value-based pointer color adjustments to reflect changes in measured data or status levels within the gauge display.
</div>

#### Example

    <div id="gauge"></div>
    <script>
     $("#gauge").kendoArcGauge({
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
Set or customize the pointer color for individual segments within a circular gauge, enabling distinct color coding per range to highlight specific value intervals or thresholds. Configure or adjust the pointer appearance dynamically for different slices of a radial gauge to visually separate ranges, enhance readability, emphasize particular levels, or match design themes. Enable fine-grained control over range-based pointer colors in an arc or radial gauge, supporting use cases such as color differentiation for alarm zones, progress ranges, or data segments in visual dashboards. Control and assign unique colors to pointers linked with specified gauge segments to improve visual distinction and clarity in circular data visualization components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 30,
        colors: [{
            to: 50,
            color: '#ff6800'
        }, {
            from: 50,
            color: '#37b400'
        }]
    });
    </script>

### colors.from `Number`

The lower range value of the applied color.


<div class="meta-api-description">
Set or configure the starting value or lower limit for a color segment, controlling where a specific color begins on a gauge or range indicator based on data thresholds or values. Adjust the minimum boundary for color transitions, define color stop positions by numeric ranges, customize color-coded sections for visualizing value ranges, enable dynamic coloring starting points, and control how colors map to threshold values or segments in radial or arc-style gauges. Customize how colors apply from specific numeric values to highlight thresholds, ranges, or value bands on circular or segmented scales.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 60,
        colors: [{
            from: 0,
            to: 50,
            color: '#0058e9'
        }, {
            from: 50,
            to: 100,
            color: '#f31700'
        }]
    });
    </script>

### colors.to `Number`

The upper range value of the applied color.


<div class="meta-api-description">
Set the maximum value limit for a color segment in a gauge, controlling where a specific color stops applying on a numerical scale, enabling configuration of color thresholds, ranges, segments, or stops in circular or arc-based gauges to visually represent value boundaries and transitions.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 30,
        colors: [{
            from: 0,
            to: 50,
            color: '#37b400'
        }, {
            from: 50,
            to: 100,
            color: '#ffc000'
        }]
    });
    </script>

### gaugeArea `Object`

The gauge area configuration options. This is the entire visible area of the gauge.


<div class="meta-api-description">
Adjust and customize the full visible region of a circular gauge including its size, layout, position, background, margins, padding, and overall styling to control how the gauge's display fits within the interface and how surrounding space is utilized. Enable configuring the entire gauge's visible area shape, dimension, alignment, and border or background appearance to tailor the gauge container and surrounding layout for different design requirements and responsive behavior. Set or style the full gauge region to control its spatial footprint, visual boundaries, and layout parameters that affect how the gauge integrates with other UI components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        gaugeArea: {
            background: "#f0f0f0",
            border: {
                color: "#333",
                width: 2
            }
        }
    });
    </script>

### gaugeArea.background `String`*(default: "white")*

The background of the gauge area. Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
Configure and customize the central drawing region’s background color of a circular gauge or arc meter by setting any valid CSS color format such as hex codes, RGB, RGBA, HSL, or named colors to control or change the gauge’s primary fill area behind the displayed values, enabling styling adjustments, theming, visual contrast, or branding for arc-based progress indicators and dial components during initialization or dynamic updates.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        gaugeArea: {
            background: "#e8f5e8"
        }
    });
    </script>

### gaugeArea.border `Object`

The border of the gauge area.


<div class="meta-api-description">
Customize the outline surrounding the gauge display area by setting border characteristics such as color, thickness, dash or solid line style, and transparency, enabling control over how the gauge perimeter appears visually, including configuring border styling options like stroke width, border opacity levels, patterns, and color settings for enhanced gauge area definition and edge rendering.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        gaugeArea: {
            border: {
                color: "#0058e9",
                width: 3,
                dashType: "dash"
            }
        }
    });
    </script>

### gaugeArea.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
Control and customize the outline color of the gauge area by specifying the border hue with any CSS-compatible color format such as hex codes, RGB, RGBA, HSL, or standard color names. Adjust, configure, or style the gauge's perimeter to match UI themes, enhance visual clarity, or highlight data distinctions by setting the outline color of the gauge area border according to branding, accessibility needs, or dynamic styling requirements. Enable theme consistency, customize the appearance, or set contrast through precise border coloring techniques for circular or arc-based gauge components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        gaugeArea: {
            border: {
                color: "#ff6800",
                width: 2
            }
        }
    });
    </script>

### gaugeArea.border.dashType `String`*(default: "solid")*

The dash type of the border.


<div class="meta-api-description">
Configure and customize the border pattern and stroke style of the gauge area outline using options like dashed, dotted, or solid lines to control the visual appearance and styling of the ArcGauge border. Adjust the border stroke pattern to create distinct edge styles, set the dash type for the gauge area’s perimeter line, or enable various dotted or dashed border effects for enhanced design flexibility and user interface customization.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        gaugeArea: {
            border: {
                color: "#333",
                width: 2,
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

### gaugeArea.border.opacity `Number` *(default: 1)*

The opacity of the border. By default the border is opaque.


<div class="meta-api-description">
Control the transparency level of the gauge area border by adjusting its opacity or alpha value to customize border visibility, blend the border seamlessly with backgrounds, create subtle or prominent outlines, set border transparency for visual emphasis or minimalism, and configure how solid or see-through the border appears in the arc gauge component.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        gaugeArea: {
            border: {
                color: "#333",
                width: 3,
                opacity: 0.5
            }
        }
    });
    </script>

### gaugeArea.border.width `Number`*(default: 0)*

The width of the border.


<div class="meta-api-description">
Control and configure the thickness, size, or width of the visible outline or border around the gauge area in circular or arc-shaped gauge components, adjusting the border stroke thickness to enhance visibility, styling, or visual emphasis, including setting numeric values for border thickness, defining the border line width for rendering, and customizing edge prominence or gauge container boundaries in data visualization gauges.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        gaugeArea: {
            border: {
                color: "#0058e9",
                width: 4
            }
        }
    });
    </script>

### gaugeArea.height `Number`

The height of the gauge area.


<div class="meta-api-description">
Adjust or configure the vertical height, size, or dimension of the gauge display area, control the reserved space for the arc gauge’s background and arc visualization, set or customize the vertical layout height to fit design or UI constraints, enable precise control over how much vertical space the arc gauge occupies, modify the gauge container height to influence rendering, scale or resize the gauge area’s vertical extent during initialization or runtime, determine and manage the height allocation for the gauge arc and background to impact overall component sizing and placement within interfaces.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        gaugeArea: {
            height: 300
        }
    });
    </script>

### gaugeArea.margin `Number|Object`*(default: 5)*

The margin of the gauge area.


<div class="meta-api-description">
Control and customize the outer spacing or padding around the gauge display to fine-tune layout, adjust whitespace, and manage the distance between the circular gauge area and its container edges. Configure margins or outer gaps to influence how the gauge fits within its component or user interface, enabling precise alignment, spacing adjustments, and visual balance in dashboards or data visualizations. Set or modify the space around the gauge circle to optimize presentation, avoid overlap, and enhance the overall component layout and responsiveness.
</div>

#### Example

    <div id="gauge"></div>
    <script>
        $("#gauge").kendoArcGauge({
            value: 20,
            gaugeArea:{
                margin: 50
            }
        });
    </script>

### gaugeArea.margin.top `Number`

The top margin of the gauge area.


<div class="meta-api-description">
Adjust or configure the vertical spacing or padding above the circular gauge area, set the top margin or distance between the gauge's upper edge and its containing element, control layout alignment and offset for the top portion of the gauge visualization, manage spacing above the dial or indicator to fine-tune positioning, customize top margin parameters to modify how the gauge sits vertically within its container.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        gaugeArea: {
            margin: {
                top: 30
            }
        }
    });
    </script>

### gaugeArea.margin.bottom `Number`

The bottom margin of the gauge area.


<div class="meta-api-description">
Adjust the bottom margin inside a circular gauge or dial component to manage vertical spacing below the visual gauge area, enabling control over layout alignment, preventing visual clipping at the bottom edge, creating extra room for labels, text annotations, legends, or nearby UI elements. Configure padding, spacing, or offset beneath the gauge to tailor the gauge container's lower boundary, ensuring proper content fit and balanced design for dashboards, data visualization panels, or interactive widgets requiring precise margin control below the arc or radial meter.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        gaugeArea: {
            margin: {
                bottom: 40
            }
        }
    });
    </script>

### gaugeArea.margin.left `Number`

The left margin of the gauge area.


<div class="meta-api-description">
Set or control the left spacing or padding between the gauge and the container edge to adjust layout alignment, margin, or offset on the left side of the circular gauge area, enabling precise positioning of arcs, labels, or other elements within the gauge display for improved visual arrangement and spacing customization.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        gaugeArea: {
            margin: {
                left: 25
            }
        }
    });
    </script>

### gaugeArea.margin.right `Number`

The right margin of the gauge area.


<div class="meta-api-description">
Adjust the right margin spacing or padding around the circular gauge display to control the gap between the gauge content and its container, preventing overlap or clipping on the right edge. Configure, set, or customize the horizontal right margin in pixels for layout tuning, whitespace adjustment, or visual alignment of the circular arc visualization. Control right-side whitespace, border spacing, or buffer area to refine positioning and ensure the gauge fits within its parent container or UI element without truncation or crowding. Optimize right margin size to balance content visibility and overall dashboard or widget layout aesthetics.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        gaugeArea: {
            margin: {
                right: 35
            }
        }
    });
    </script>

### gaugeArea.width `Number`

The width of the gauge area.


<div class="meta-api-description">
Control the horizontal dimension, width, or size of the gauge's display region or drawing area in an ArcGauge component, enabling customization of how wide the gauge visually appears or renders on the screen. This setting lets developers adjust, configure, set, or define the gauge area width to fit layouts, scale the component horizontally, manage space allocation, or tailor the visual presentation of the gauge's graphical area during initialization or at runtime. Whether you need to increase, decrease, or fix the horizontal span of the active gauge region, this property relates to specifying the pixel width or measurement that determines how broad the gauge area is drawn within its container or user interface.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        gaugeArea: {
            width: 400
        }
    });
    </script>

### opacity `Number`

The opacity of the value pointer.


<div class="meta-api-description">
Adjust the transparency level of a gauge pointer to make it more or less visible by setting opacity, controlling how faint, translucent, or fully opaque the indicator appears. Configure or set the pointer’s see-through effect to highlight or de-emphasize its visibility, fine-tuning the gauge needle’s prominence in a chart or dashboard. Enable fading or solid display of the value marker to manage visual emphasis, with options ranging from transparent to fully visible for customization of appearance in data visualization components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
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
Configure or set the rendering engine for the ArcGauge visualization to prefer SVG or Canvas output, enabling control over whether the gauge is drawn as scalable vector graphics or through the HTML Canvas element; automatically falling back to the supported rendering method if the preferred option is not supported by the browser. Optimize graphics rendering by choosing between vector-based SVG rendering for crisp, resolution-independent images or pixel-based Canvas rendering for potentially faster performance and compatibility, allowing developers to specify, enable, control, or switch rendering modes dynamically for best display results across different browsers and devices.
</div>

#### Example - Render as Canvas, if supported

    <div id="gauge"></div>
    <script>
        $("#gauge").kendoArcGauge({
            renderAs: "canvas",
            value: 50
        });
    </script>

### scale `Object`

Configures the scale.


<div class="meta-api-description">
Adjust and customize the gauge scale settings by defining minimum and maximum values, controlling start and end angles, setting the number and style of major and minor tick marks, configuring labels and their placement, and specifying value ranges or segments. Enable fine-tuning of the dial’s measurement scale to match specific data boundaries, visual styles, and labeling preferences, allowing configuration of scale appearance, behavior, limits, ticks, and labels dynamically or at initialization time. Perfect for scenarios requiring precise control over gauge limits, angle spans, tick distribution, range segmentation, and numeric labeling patterns within circular metric visualizations.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            min: 0,
            max: 100,
            startAngle: -90,
            endAngle: 90,
            majorTicks: {
                color: "#333"
            }
        }
    });
    </script>

### scale.endAngle `Number`*(default: 180)*

The end angle of the gauge.
The gauge is rendered clockwise(0 degrees are the 180 degrees in the polar coordinate system)


<div class="meta-api-description">
Adjust or configure the finishing position of a circular or arc-shaped gauge by setting the end angle in degrees to control where the scale or arc stops, enabling precise placement and rotation of the arc display. This includes options to define the final angle of the arc clockwise from the starting point, reposition the gauge’s visible range, limit the arc’s sweep, or customize the gauge segment for different visual presentations by specifying the ending degree relative to the polar coordinate system, useful for tailoring gauge appearance, creating partial circles, or adjusting scale coverage in data visualization.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            endAngle: 270
        }
    });
    </script>

### scale.labels `Object`

Configures the scale labels.


<div class="meta-api-description">
Adjust the settings for scale labels around a circular or arc-shaped gauge, including how to format numbers or text, control label visibility, rotate positions for better alignment, apply custom templates for label content, and style labels with CSS for consistent appearance and readability. Configure label display options such as showing or hiding scale indicators, formatting numeric or textual values, setting angle or orientation, customizing text with templates or placeholders, and applying styling for font, color, and layout to enhance gauge visualization. Control the appearance and behavior of numeric or textual scale markers on an arc gauge by setting formatting rules, toggling visibility, rotating labels for better fit, using templated content for dynamic label text, and customizing style through CSS. Enable precise tuning of the visual presentation of measurement ticks or scale labels along an arc, including orientation fixes, format pattern adjustments, showing or hiding labels, custom text rendering with templates, and styling for font size, color, and spacing for clear, well-aligned scale indicators.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            labels: {
                color: "#0058e9",
                font: "14px Arial",
                background: "#f0f0f0"
            }
        }
    });
    </script>

### scale.labels.background `String`

The background color of the labels.
Any valid CSS color string will work here, including hex and rgb


<div class="meta-api-description">
Customize the background color behind scale labels in circular or arc-shaped gauges by setting any valid CSS color value, including hexadecimal codes, RGB, RGBA, HSL, or named colors to enhance label visibility, improve contrast, or match themes. Control and adjust label backgrounds to optimize readability, highlight specific label ranges, or align with UI design requirements across dashboards, charts, and visual components. Configure background styling for scale labels to blend seamlessly with gauge indicators, ensuring clear differentiation and aesthetic consistency in data visualization and user interface elements.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            labels: {
                background: "#ffffe0"
            }
        }
    });
    </script>

### scale.labels.border `Object`

The border of the labels.


<div class="meta-api-description">
Adjust and customize the border appearance around scale labels in circular or arc gauges by configuring options like color, thickness, width, and dash style to style label outlines, control label edge visuals, define borders for numeric or textual scale markers, set label frame attributes, and enhance readability by specifying border patterns or line styles for label decorations.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            labels: {
                border: {
                    color: "#37b400",
                    width: 2,
                    dashType: "solid"
                }
            }
        }
    });
    </script>

### scale.labels.border.color `String`

The color of the border. Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
Customize or configure the border color around gauge scale labels using any CSS color format such as hex codes, RGB, RGBA, HSL, named colors, or fully transparent. Control, set, or style the outline of numeric or textual labels attached to a circular arc gauge's scale for improved visual distinction, highlighting, or theming in dashboards, charts, or user interfaces. Adjust label border shading, color customization, and appearance to enhance readability, emphasize scale divisions, or match design requirements in data visualization components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            labels: {
                border: {
                    color: "#ff6800",
                    width: 1
                }
            }
        }
    });
    </script>

### scale.labels.border.dashType `String`*(default: "solid")*

The dash type of the border.


<div class="meta-api-description">
Adjust or configure the border stroke style of scale labels in circular gauge components by setting customizable dash patterns such as solid lines, dashed lines, dotted lines, or complex dash-dot combinations; this controls how the label borders appear visually, enabling users to modify or style label outlines with different dash effects or line patterns for enhanced gauge readability and aesthetics.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            labels: {
                border: {
                    color: "#333",
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
Adjust the transparency, alpha level, or opacity of border edges around scale labels in circular or arc-shaped gauges, customizing label outlines to be fully visible, semi-transparent, or hidden by setting border opacity for scale markings in radial meters or arc indicators. Control how faint or bold the label borders appear on arc gauges, enabling you to make label outlines less prominent or fully solid, enhancing visual clarity or blending by modifying border transparency settings applied to scale text in curved gauge components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            labels: {
                border: {
                    color: "#333",
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
Adjust, set, or control the thickness, width, or stroke size of the outline or border around scale labels in circular gauge or arc gauge visuals to emphasize label visibility, manage label prominence, and customize the visual weight or style of numeric or textual indicators on radial scales during component setup or initialization.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
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
Adjust the text color, font hue, or label tint of scale markings on circular gauges by setting or customizing the appearance of numerical or descriptive scale labels with any valid CSS color format, including hex codes, RGB values, color names, or HSL, enabling fine control over label visibility, style, and contrast within arcs, ring meters, speedometers, or radial indicator components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            labels: {
                color: "#37b400"
            }
        }
    });
    </script>

### scale.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.


<div class="meta-api-description">
Adjust the typography settings for scale labels including font family, size, weight, color, and style to customize label appearance on circular or radial gauges; configure and control label fonts using CSS font strings or supported font objects to set the text style, ensuring readable, visually consistent, and properly styled scale markers or numeric indicators on arc or radial gauge scales during initialization or runtime.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            labels: {
                font: "16px Verdana"
            }
        }
    });
    </script>

### scale.labels.format `String`

The format of the labels.


<div class="meta-api-description">
Customize and control the display format of gauge labels by setting numeric, date, or custom formatting patterns for values shown on arc-shaped gauges, enabling precise configuration of how labels appear, including adjusting decimal places, percentage signs, currency symbols, or any tailored string patterns to enhance readability and match localization or design requirements in dashboards or data visualization interfaces.
</div>

#### Example

    <div id="gauge"></div>
    <script>
        $("#gauge").kendoArcGauge({
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
Control and adjust the spacing or padding around scale labels in circular or arc-shaped gauges to prevent label overlap, improve readability, and manage the distance between labels and the gauge arc, enabling customization of label layout, alignment, margin, and positioning for clean presentation and better data visualization in dashboards or UI components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
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
Adjust or configure the vertical spacing above scale labels in an ArcGauge or circular gauge, controlling the top margin or padding to fine-tune label positioning, alignment, and distance from the scale or gauge elements. Enable setting the upper margin above numeric or text labels on the gauge scale to improve readability, avoid overlap, and customize label layout. Control or increase the space between the top edge of scale labels and the gauge arc, dial, or axis for precise visual arrangement in dashboards, widgets, or UI components displaying circular meter readings or progress indicators.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
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
Adjust the vertical spacing below scale labels in radial gauge controls by setting the bottom margin or padding under the labels to control their distance from the gauge face or surrounding elements. Customize, configure, or set the lower margin space for scale labels on circular or arc-shaped gauges to ensure proper label positioning, prevent overlap, and improve readability by controlling how far labels extend below their baseline in visualizations, meters, or dial components. Enable precise layout tuning by managing bottom offset or margin for numeric or textual scale marks on arc or radial gauge interfaces used in dashboards, UI controls, or data visualization widgets.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            labels: {
                margin: {
                    bottom: 20
                }
            }
        }
    });
    </script>

### scale.labels.margin.left `Number`

The left margin of the labels.


<div class="meta-api-description">
Adjust horizontal spacing or left offset of scale labels on gauge controls, customize label margins on the left side to control alignment and positioning of labels along the scale, configure left padding or indentation for numeric or textual labels on circular or arc-shaped gauges, fine-tune label layout to prevent overlap or improve readability on the left edge, set left margin distance for scale marker labels to modify visual spacing within arc or circular meters.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
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
Control the spacing or padding on the right side of circular gauge or arc chart labels to fine-tune label positioning, prevent overlap with the gauge visuals or adjacent interface elements, adjust label margins, set horizontal label offsets, and customize label alignment by specifying numeric values for right margin or right padding on scale labels around the gauge arc.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
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
Adjust spacing and padding around scale label text within circular or arc-based gauges to control label placement, distance from bounding boxes, and avoid overlapping or collisions; optimize label alignment, clarity, and readability by setting or configuring label padding, margin, or buffer in visual arc gauge components, ensuring clean separation between scale numbers or text and their surrounding area for improved display and better layout customization.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
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
Adjust the vertical spacing or top margin above labels on circular gauge scales to fine-tune label alignment and readability by configuring top padding or inset around scale text, enabling control over label positioning relative to the gauge arcs. Set or customize distance, spacing, offset, or padding above tick marks, numeric indicators, or scale descriptions on arc-based gauges and dial components for precise layout and improved visual hierarchy in dashboards, charts, and UI elements.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            labels: {
                padding: {
                    top: 10
                }
            }
        }
    });
    </script>

### scale.labels.padding.bottom `Number`

The bottom padding of the labels.


<div class="meta-api-description">
Adjust the vertical space or bottom margin below scale labels to set how far label text is separated from the gauge arc or adjacent components, enabling control over label padding, spacing, and alignment for improved layout, readability, and visual balance in gauge displays.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            labels: {
                padding: {
                    bottom: 8
                }
            }
        }
    });
    </script>

### scale.labels.padding.left `Number`

The left padding of the labels.


<div class="meta-api-description">
Control and customize the left spacing or margin before scale labels in a circular or radial gauge to adjust label positioning, create padding between label text and adjacent elements, shift labels horizontally for better alignment or visual balance, configure indentation or offset to separate labels from chart edges, and fine-tune the whitespace on the left side of scale indicators for improved readability or layout spacing in arc-based or dial-style gauges.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            labels: {
                padding: {
                    left: 6
                }
            }
        }
    });
    </script>

### scale.labels.padding.right `Number`

The right padding of the labels.


<div class="meta-api-description">
Control and adjust the horizontal space or right-side padding of scale labels on circular or radial gauges to prevent label overlap, enhance alignment, fine-tune spacing, and customize label positioning on gauge scales. Configure the right padding area of labels for clear separation, avoid clipping or crowding on the right edge, and manage label offsets within gauge scales or arc indicators, optimizing layout and visual clarity for scale text placement and label spacing on chart or dashboard gauge components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            labels: {
                padding: {
                    right: 12
                }
            }
        }
    });
    </script>

### scale.labels.position `String`*(default: "inside")*

The labels positions.


<div class="meta-api-description">
Control the placement and alignment of numeric or text labels around a circular gauge scale by configuring label positions relative to the arc and tick marks, enabling precise adjustment of labels inside, outside, or along the gauge arc for enhanced readability, clearer visualization of scale values, better label alignment in radial or angular layouts, and customization of label orientation and spacing to match design requirements and improve data interpretation on circular dashboards and speedometer-style indicators.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            labels: {
                position: "outside",
                visible: true
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
Customize, format, or bind scale labels on circular or radial gauges by configuring label text templates, enabling transformation or dynamic display of numeric or value-based labels on gauge scales, modifying label markup to control appearance, content, and data binding for scale indicators, adjusting how scale values appear with custom formatting or template-driven replacements, setting up dynamic or static label text rendering on gauge scales, controlling labeling on arc-based or dial gauges through template expressions that adapt label content based on the associated scale values.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
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
Control the display, visibility, and rendering of numeric or textual labels along a circular or radial gauge scale by enabling or disabling scale markings, tick labels, or value indicators on the gauge's perimeter. Configure whether scale annotations, graduations, or numeric captions are shown or hidden on arc-shaped progress indicators, circular meters, or radial measurement components during initialization or runtime appearance settings. Adjust label visibility on curved gauge scales for customizing UI readouts, meter legends, or measurement ticks to enhance clarity or minimize clutter in dashboard widgets, data visualization controls, or instrumentation displays.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
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
Adjust and customize the primary tick marks on a circular gauge by setting their visibility, interval spacing, length, thickness, color, and positioning to control how major scale divisions appear on the gauge. Configure main tick steps, style, and layout parameters for the gauge scale to enable precise control over the appearance and frequency of large tick indicators, including options for color customization, width, and alignment to suit various design and readability preferences. Optimize the display and arrangement of key scale ticks on the arc gauge to ensure clear measurement intervals, allowing developers to specify and fine-tune major marker spacing, size, and styling for enhanced visual clarity and accurate value representation.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            majorTicks: {
                color: "#0058e9",
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
Adjust or set the color of the primary tick marks on a circular gauge scale to customize the visual appearance of major ticks, enabling alignment with theme colors, styling preferences, or branding requirements. This control lets developers change the hue, shade, or tint of large scale markers for enhanced readability, contrast, or aesthetic consistency in radial or arc-based gauges. Whether configuring the major ticks’ color for light or dark modes, matching specific color palettes, or ensuring clear differentiation from minor ticks and backgrounds, this setting supports flexible customization of key scale indicators across various gauge designs.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            majorTicks: {
                color: "#37b400",
                visible: true
            }
        }
    });
    </script>

### scale.majorTicks.size `Number`

The major tick size.
This is the length of the line in pixels that is drawn to indicate the tick on the scale.


<div class="meta-api-description">
Adjust, configure, or set the length and size of prominent major tick marks on circular or arc-shaped gauges to control the visual length of scale indicator lines, specifying the pixel measurement for these primary ticks for clearer or subtler emphasis on scale graduations, enabling customization of how far major scale markers extend along the gauge arc to enhance readability, appearance, or precision in graphical user interfaces displaying measurement scales.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            majorTicks: {
                size: 15,
                visible: true
            }
        }
    });
    </script>

### scale.majorTicks.visible `Boolean`*(default: false)*

The visibility of the major ticks.


<div class="meta-api-description">
Control visibility of primary tick marks or main scale indicators on a circular gauge, toggle display of major scale divisions or prominent measurement markers, configure showing or hiding large ticks along the gauge arc, enable or disable key scale marks for clearer visualization, set whether bold numeric ticks appear on the gauge scale, adjust visibility of significant graduation lines on the arc dial, manage presence of main partition ticks used for reading values, switch major tick marks on or off to customize display, show or hide important scale notches that help measure values accurately, and control the appearance of the main angular ticks that segment the gauge background.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
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
Adjust or configure the thickness, stroke width, or visual line weight of primary or major tick marks along a circular or arc-shaped gauge scale, enabling control over the prominence, size, and boldness of these scale indicators for clearer readings or enhanced visual styling in customizable radial or dial gauges.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            majorTicks: {
                width: 3,
                visible: true
            }
        }
    });
    </script>

### scale.majorUnit `Number`

The interval between major divisions.


<div class="meta-api-description">
Adjust numeric intervals for major tick marks on a circular gauge's scale to control the frequency and spacing of primary divisions and their labels, configuring the scale segmentation to define how often main graduation marks appear on the dial, set the distance between large ticks for clear value grouping, customize scale increments to refine gauge readability, enable precise control over major scale steps on radial or arc meters, and determine the interval for prominent scale markers to tailor visualization granularity.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            majorUnit: 20,
            majorTicks: {
                visible: true
            }
        }
    });
    </script>

### scale.max `Number`*(default: 100)*

The maximum value of the scale.


<div class="meta-api-description">
Set or adjust the highest value or peak limit of a gauge’s scale to control the maximum measurable or displayable range, defining the upper boundary for tick marks, value ranges, needle positions, and arc indicators, enabling customization of scale limits, maximum thresholds, top scale values, and range end points for visual data representation and measurement boundaries in dial or arc-based gauges.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            max: 200
        }
    });
    </script>

### scale.min `Number`*(default: 0)*

The minimum value of the scale.


<div class="meta-api-description">
Adjust or define the minimum limit, lower bound, or smallest value for a gauge or dial scale to control the starting point of measurements, set the range floor for ticks, pointers, or indicators, establish minimum thresholds for rendering or normalization, clamp values to prevent underflow, and configure the base scale boundary during initialization or runtime to influence display, data mapping, or visual range constraints on arc or circular gauges.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            min: -50
        }
    });
    </script>

### scale.minorTicks `Object`

Configures the scale minor ticks.


<div class="meta-api-description">
Adjust, configure, or customize the small tick marks on a gauge's scale by setting parameters like spacing, visibility, size, style, and appearance for the minor ticks or subdivisions on measurement arcs, dials, or gauges to enhance readability and precision in visual components, allowing control over how frequently minor markers appear, their dimensions, and display during gauge setup, initialization, or rendering processes in dashboards, instrumentation, or data visualization tools.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            minorTicks: {
                color: "#999",
                size: 5,
                visible: true
            }
        }
    });
    </script>

### scale.minorTicks.color `String`

The color of the minor ticks.
Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
Control and customize the color of smaller tick marks located between main divisions on a circular or arc-shaped gauge, enabling setting of minor scale tick colors with any CSS-compatible value such as hex codes, RGB, RGBA, HSL, or named colors to style gauge indicators precisely for improved visual clarity, theming, or branding in dashboards, data visualizations, or UI components where detailed scale marking differentiation is needed.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            minorTicks: {
                color: "#ffc000",
                visible: true
            }
        }
    });
    </script>

### scale.minorTicks.size `Number`

The minor tick size.
This is the length of the line in pixels that is drawn to indicate the tick on the scale.


<div class="meta-api-description">
Adjust the length, size, or pixel measurement of minor tick marks, minor scale ticks, or small tick lines on a circular gauge or arc gauge component, enabling control over how long or short the minor subdivisions appear on the gauge’s scale. Customize the dimension, length, thickness, or spacing indicators of these smaller ticks for precision styling and visualization of detailed scale increments on radial or arc gauges.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            minorTicks: {
                size: 8,
                visible: true
            }
        }
    });
    </script>

### scale.minorTicks.visible `Boolean`*(default: false)*

The visibility of the minor ticks.


<div class="meta-api-description">
Control the display of minor tick marks along a circular gauge or arc scale by enabling or disabling finer graduations to customize visual detail and precision; adjust the visibility of small division marks on the arc to either show detailed increments for closer measurement or hide them for a cleaner, simplified scale appearance, allowing you to configure the presence of subtle scale markers that aid in reading intermediate values on curved or semicircular meter interfaces.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
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
Adjusting the thickness, line weight, or width of minor tick marks on a circular or arc-shaped gauge, controlling how thin or thick the smaller tick lines appear along the gauge scale, configuring the detail level and visual style of minor subdivisions, setting numeric values to customize minor tick stroke width for clearer readability or design preference, modifying visual elements of gauge scales including minor tick thickness, tuning the gauge’s minor marker line weight to enhance display precision or aesthetics, enabling control over subtle scale indicators by changing minor tick width settings, tailoring the gauge’s fine tick marks for improved detail or user interface clarity.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            minorTicks: {
                width: 2,
                visible: true
            }
        }
    });
    </script>

### scale.minorUnit `Number`

The interval between minor divisions.


<div class="meta-api-description">
Adjust or configure the spacing and frequency of minor tick marks or subdivisions on a circular gauge or dial scale by setting intervals between minor increments, enabling control over the granularity, resolution, or density of smaller scale divisions; modify minor unit size to increase or decrease the number of minor ticks, fine-tune tick intervals for better visualization, customize scale detail levels, and manage how closely minor marks appear on arc or radial gauges.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            minorUnit: 5,
            minorTicks: {
                visible: true
            }
        }
    });
    </script>

### scale.rangeLineCap `String`*(default: "round")*

The lineCap style of the ranges.


<div class="meta-api-description">
Control or customize the shape and style of stroke endings on the scale ranges, such as setting line caps to round, square, or butt, to influence how the edges of range lines appear in circular or arc gauges, enabling precise visual adjustments of stroke terminations, overlaps, and end caps for gauge scales, including configuring line endings appearance during initialization or runtime rendering to achieve desired aesthetics and clarity in data visualization components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            rangeLineCap: "butt"
        }
    });
    </script>

The supported values are:

* `"butt"`
* `"round"`
* `"square"`

### scale.rangePlaceholderColor `String`

The default color for the ranges.


<div class="meta-api-description">
Configure the default fallback color for gauge scale segments when individual range colors are undefined, enabling control over the baseline appearance of scale ranges in arc gauges by specifying a CSS-compatible color value; this setting helps customize or override default range colors, manage missing or unspecified segment hues, and ensures consistent visual styling for arcs lacking explicit color definitions in dashboards, charts, or data visualizations.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            rangePlaceholderColor: "#e0e0e0"
        }
    });
    </script>

### scale.rangeSize `Number`

The width of the range indicators.


<div class="meta-api-description">
Adjust the thickness or width of colored range bands on a circular gauge to control how prominently different value segments appear, customize the visual size of range indicators, configure the breadth or span of these arcs for better clarity or emphasis, set or modify the range band thickness to enhance gauge readability, control the gauge’s segment width to match design preferences, scale the radial ranges’ size for improved visualization of value thresholds, enable precise tuning of range band dimensions for aesthetic or functional purposes, adjust the segment thickness to highlight specific ranges, modify the arc width for finer or broader range representation, and tailor the gauge’s colored bands’ thickness to fit user interface design needs.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            rangeSize: 10
        }
    });
    </script>

### scale.rangeDistance `Number`

The distance from the range indicators to the ticks.


<div class="meta-api-description">
Control the spacing or gap between visual range markers and axis ticks in circular gauges, adjust the distance separating range indicators from tick marks to customize layout clarity, set or configure how far range bands or colored arcs appear from scale ticks, fine-tune the padding or margin between indicator segments and axis graduations to enhance readability in radial or arc-based gauges, manipulate separation to balance compactness and clarity when displaying range bands adjacent to scale ticks, optimize positioning of range highlights relative to tick marks for better visual distinction in semicircle or circular meter components.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            rangeDistance: 5
        }
    });
    </script>

### scale.reverse `Boolean`*(default: false)*

Reverses the scale direction - values are increase anticlockwise.


<div class="meta-api-description">
Control the gauge dial orientation by reversing the scale direction to make values increase counterclockwise or anticlockwise instead of clockwise, enabling inversion or mirroring of the needle movement, flipping the arc progression, setting needle rotation direction, adjusting scale winding, and configuring gauge behavior for custom visual orientation or alternative measurement flow.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            reverse: true
        }
    });
    </script>

### scale.startAngle `Number`*(default: 0)*

The start angle of the gauge.
The gauge is rendered clockwise(0 degrees are the 180 degrees in the polar coordinate system)


<div class="meta-api-description">
Set or configure the starting angle or initial position of a circular or arc-shaped gauge scale to control where the arc begins visually, adjusting the beginning point for ticks or markers on the dial, specifying the angle in degrees with clockwise rotation considered, enabling customization of gauge orientation, rotation, or alignment for dashboards, data visualizations, or UI components that use polar or circular coordinate systems.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        scale: {
            startAngle: -90
        }
    });
    </script>

### theme `String` *(default: "sass")*

The gauge theme. With versions prior to R1 2023 this can be either the respective LESS theme from the list below or "sass".
When set to "sass" the gauge will read the variables from the [Sass-based themes]({% slug sassbasedthemes_kendoui %}).

Note: Since Q2 2024 release, the default value for the `theme` property is "sass" instead of "default". It is recommended to use "sass" with version Q2 2024 or later.


<div class="meta-api-description">
Configure the visual styling system and appearance mode for the ArcGauge display, selecting between legacy LESS themes or modern Sass-based themes to control colors, design, and overall look and feel. Adjust the component’s theming approach by setting style frameworks, switching from older LESS variables to Sass variables for enhanced customization and compatibility, especially with product versions from Q2 2024 onward where Sass themes are the default. This setting lets you enable, switch, or control the ArcGauge’s color schemes, theme engines, styling methodologies, and visual presentation layers according to your preferences or project requirements.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
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
Control the activation or deactivation of smooth animations and transitional effects for circular progress indicators to manage how changes to values, ranges, or visual elements are displayed, allowing users to toggle animated updates on or off to balance between visual fluidity and application performance, customize transition timing or enable gradual value shifts, and adjust whether motion effects play during dynamic updates or instant state changes.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 65,
        transitions: false
    });
    </script>

### value `Number`

The gauge value.


<div class="meta-api-description">
Adjust or specify the numeric measurement displayed by a circular gauge indicator, controlling the arc's fill extent and visual representation within the gauge component. Enable setting, updating, or binding this value programmatically to reflect real-time metrics, sensor readings, progress tracking, or current status updates. Control the gauge’s numeric output, chart value, display level, or measurement dynamically to visualize percentages, ranges, or numeric data as an arc segment. Support scenarios for configuring the indicator’s filled portion, modifying the gauge reading, or animating changes to represent varying data inputs seamlessly.
</div>

#### Example

    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 75
    });
    </script>

## Methods

### destroy

Prepares the Gauge for safe removal from the DOM.

Detaches event handlers and removes data entries in order to avoid memory leaks.


<div class="meta-api-description">
Terminate or clean up an arc gauge widget by disposing of its internal event listeners, detaching data bindings, and releasing memory to prevent leaks when the component is no longer needed, such as before removing or replacing its associated DOM elements; this process ensures safe teardown of the gauge’s resources, handler unbinding, and garbage collection readiness, helping manage lifecycle cleanup, component disposal, or controlled removal in dynamic UI updates or memory optimization scenarios.
</div>

#### Example

    <div id="gauge"></div>
    <script>
        $("#gauge").kendoArcGauge({
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
Export or save a circular gauge or radial meter visualization as a PNG file by generating an image snapshot asynchronously, enabling bitmap export of gauge components, converting the gauge display into a downloadable or shareable PNG Data URI format, retrieving gauge renderings programmatically with promises for further processing or file saving, capturing the visual state of arc or radial progress indicators as image files, facilitating export of live gauge graphics for reports or user downloads, creating image exports of radial or circular progress displays through asynchronous methods, and handling the encoded PNG output to save, share, or embed gauge visuals in applications.
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
        $("#gauge").kendoArcGauge({
            value: 50
        });

        var gauge = $("#gauge").data("kendoArcGauge");
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
Generate or create a PDF file from the gauge visualization, export and save the current gauge display as a downloadable PDF document, initiate asynchronous PDF export of the gauge chart, retrieve the PDF output encoded as a Data URI for further processing or downloading, convert the gauge rendering into a portable document format for reporting or sharing, use promise-based methods to export the gauge view into PDF, configure export functionality to produce printable or shareable gauge snapshots, trigger PDF generation of the gauge data visualization for persistence or external use, enable saving the gauge state or image in PDF format with data URI encoding, control and automate PDF creation from the ArcGauge component’s displayed values and graphical elements.
</div>

#### Parameters

##### options `kendo.drawing.PDFOptions` *(optional)*
Parameters for the exported PDF file.

#### Returns
`Promise` A promise that will be resolved with a PDF file encoded as a Data URI.

#### Example - Exporting a gauge to a PDF file
    <div id="gauge"></div>
    <script>
        $("#gauge").kendoArcGauge({
            value: 50
        });

        var gauge = $("#gauge").data("kendoArcGauge");
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
Export the circular gauge visualization as a scalable vector graphic file for saving, downloading, printing, sharing, or further editing in vector-based design tools. Support asynchronous export operations that output the gauge rendering as an SVG data URI string, enabling seamless integration with file saving functions and workflows for exporting graphics from charts, metrics, or dashboard components. Configure, trigger, or control the conversion of the gauge display into a high-resolution, editable SVG format for use in reports, web assets, or graphical processing pipelines.
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
        $("#gauge").kendoArcGauge({
            value: 50
        });

        var gauge = $("#gauge").data("kendoArcGauge");
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
Trigger an immediate refresh or re-rendering of the gauge's visual display to update layout, pointer positions, scales, and styling after programmatically modifying properties, resizing, adjusting configuration, or applying CSS changes at runtime without rebuilding or reinitializing the entire gauge component; enable dynamic updates, force repaint, or manually refresh the gauge to reflect current values and state changes instantly.
</div>

#### Example
    <div id="gauge"></div>
    <script>
    $("#gauge").kendoArcGauge({
        value: 50
    });
    setTimeout(function(){
        var gauge = $("#gauge").data("kendoArcGauge");
        gauge.redraw();
    },1000)
    </script>

### resize

Adjusts the widget layout to match the size of the container.


<div class="meta-api-description">
Trigger reflow or re-render of the circular gauge visualization when the container's size, layout, or visibility changes, ensuring the gauge adapts to dynamic CSS updates, DOM modifications, or responsive design adjustments. Enable automatic or manual resizing, refreshing, or recalculating the gauge's dimensions and visual layout to maintain accurate rendering after container resizing, display toggling, or parent element moves. Use commands to force the gauge to update, recalculate bounds, and realign graphics to current container width, height, or visibility state, supporting use cases like window resizing, hidden-to-visible transitions, or layout shifts.
</div>

#### Example
    <div id="gauge" style="width: 100px; height: 100px;"></div>
    <script>
        $("#gauge").kendoArcGauge({
            value: 50
        });

        $("#gauge").css({ width: "200px", height: "200px" })
            .data("kendoArcGauge").resize();
    </script>

#### Parameters

##### force `Boolean` *optional*

Defines whether the widget should proceed with resizing even if the element dimensions have not changed.

### setOptions

Sets the current gauge options.


<div class="meta-api-description">
Update or modify the configuration, settings, or parameters of an ArcGauge dynamically during runtime by applying new or customized options to an existing gauge instance, enabling control over appearance, behavior, and data representation without reinitializing, allowing developers to change styling, ranges, labels, colors, scale, or other gauge features on the fly, adaptively adjusting the visualization based on user interactions, state changes, or updated input values by setting or overriding current properties and options dynamically within the running application.
</div>

#### Parameters

##### options `Object`

The gauge settings to update.

#### Example

    <div id="gauge"></div>
    <script>
        $("#gauge").kendoArcGauge({
            value: 50
        });

        $("#gauge").data("kendoArcGauge").setOptions({ theme: 'black' });
    </script>

### svg

Returns the [SVG](https://www.w3.org/Graphics/SVG/) representation of the gauge.
The returned string is a self-contained SVG document that can be used as is or
converted to other formats using tools like [Inkscape](https://inkscape.org/en) and
[ImageMagick](https://www.imagemagick.org/).
Both programs provide command-line interface suitable for server-side processing.

> This method is obsoleted by [exportSVG](/api/javascript/dataviz/ui/arcgauge/methods/exportsvg), but will remain fully functional.


<div class="meta-api-description">
Generate or retrieve a complete, standalone SVG string of the arc gauge visualization for exporting or saving as a vector document, enabling direct use or conversion to other formats like PNG or PDF through tools such as Inkscape or ImageMagick, useful for server-side rendering, automated exports, batch processing, or integrating scalable graphics in web and backend environments, supporting commands to extract or output SVG data for further manipulation or format transformation, even in legacy flows where older methods remain functional alongside newer export options.
</div>

#### Example

    <div id="gauge"></div>
    <script>
        $("#gauge").kendoArcGauge({
            value: 50
        });
        var gauge = $("#gauge").data("kendoArcGauge");
        var svg = gauge.svg();
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(svg); // displays the SVG string
    </script>

### imageDataURL

Returns a PNG image of the gauge encoded as a [Data URL](https://developer.mozilla.org/en-US/docs/data_URIs).

> This method is obsoleted and replaced by [exportImage](/api/javascript/dataviz/ui/arcgauge/methods/exportimage), but will remain fully functional.


<div class="meta-api-description">
Get the rendered image of a gauge or dial component as a PNG Data URL string that can be used to embed the image in HTML, set as the source of an image element, open the rendered snapshot in a new browser tab, save or download the gauge visualization, or transmit the image data via HTTP POST to a server for storage or further processing. Extract the current visual representation of the gauge widget as a base64-encoded Data URL for easy embedding, sharing, exporting, or exporting snapshots for reports, dashboards, or remote storage. This method captures the gauge's rendered output as an encoded PNG image string suitable for web embedding, downloading, or programmatic image handling workflows.
</div>

#### Returns

`String` A data URL with `image/png` MIME type. Will be `null` if the browser does not support the `canvas` element.

#### Example - show a snapshot of the gauge

    <div id="gauge"></div>
    <a download="export.png" id="export" class="k-button">Export PNG</a>
    <script>
        $("#gauge").kendoArcGauge({
            value: 50
        });

        $("#export").on("click", function() {
            var gauge = $("#gauge").data("kendoArcGauge");
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
Retrieve or modify the current measurement shown on the ArcGauge by using its method that gets the existing numeric reading or sets a new value to update the gauge's display. This function enables reading the displayed metric for monitoring, adjusting the gauge value dynamically, synchronizing with application data, controlling the numeric indicator, and programmatically setting or fetching the measurement for real-time updates or user interaction handling. Whether you need to pull the current state or push new data to reflect changes, this method provides flexible access to the gauge’s numeric representation.
</div>

#### Example

    <div id="gauge"></div>
    <script>
        $("#gauge").kendoArcGauge({
            value: 50
        });

        setTimeout(function(){
            $("#gauge").data("kendoArcGauge").value(20);
        },1000);
    </script>
