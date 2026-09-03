---
title: Sparkline
page_title: Configuration, methods and events of Kendo UI DataViz Sparkline
description: Learn how to configure Kendo UI Javascript sparkline widget in a few easy steps, use and change methods and events.
res_type: api
component: sparkline
---

# kendo.dataviz.ui.Sparkline

## Configuration

### axisDefaults `Object`

Default options for all chart axes.


<div class="meta-api-description">
How do I configure default axis settings for Sparkline in Kendo UI? Configure and control default axis settings to ensure uniform appearance and behavior across all chart axes in sparklines, including setting axis labels, line styles, major and minor unit intervals, range boundaries, and visual customization, enabling centralized axis formatting without repeating individual axis configuration and simplifying consistent axis scaling, labeling, and styling for compact inline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        axisDefaults: {
            color: "#ff0000",
            visible: true
        }
    });
    </script>

### categoryAxis `Array`

The category axis configuration options.


<div class="meta-api-description">
How to customize category labels in Kendo UI sparkline? Control and customize the horizontal axis categories for sparklines, including setting category labels, ordering, scale types such as numeric or date, and adjusting tick intervals or base units for time-based data; configure axis appearance and behavior like label display, category sorting, axis scaling, line and tick styling, and how category values are interpreted to optimize chart clarity and presentation.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            categories: ["A", "B", "C", "D", "E"],
            color: "#ff0000",
            visible: true
        }
    });
    </script>

### categoryAxis.axisCrossingValue `Object | Date | Array`

Category index at which the first value axis crosses this axis. (Only for object)

Category indicies at which the value axes cross the category axis. (Only for array)

**Note:**Specify an index greater than or equal to the number
of categories to denote the far end of the axis.


<div class="meta-api-description">
How to position the value axis intersection in a Kendo UI sparkline at a specific category index? Set or adjust the crossing point where the value axis intersects the category axis in sparklines, enabling you to position the baseline or zero line dynamically by specifying a single index or multiple indices for multi-axis charts; this controls the alignment or offset of data values relative to categories, letting you configure axis intersection points, shift where axes cross, set baseline positions, and manage layout for single or multiple value axes, accommodating use cases like starting the value axis at a particular category, aligning charts with varying category counts, or placing the crossing at the far end of the category axis to influence visual emphasis and data interpretation.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            axisCrossingValue: 2,
            categories: ["A", "B", "C", "D", "E"]
        }
    });
    </script>

### categoryAxis.categories `Array`

Array of category names.


<div class="meta-api-description">
How do I customize axis labels in a Kendo UI sparkline? Customize or set specific labels on the horizontal or category axis of a sparkline by providing a list or array of text categories or names that correspond to each data point, enabling control over axis tick labels, overriding default numeric or index-based labels, associating custom strings with data points, mapping categories to chart elements, configuring axis naming conventions, binding descriptive labels for clarity, and adjusting category display to improve readability or contextual meaning in small trend charts or inline data visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            categories: ["Q1", "Q2", "Q3", "Q4", "Q5"]
        }
    });
    </script>

### categoryAxis.color `String`

Color to apply to all axis elements. Any valid CSS color string will work here, including hex and rgb.
Individual color settings for line and labels take priority.


<div class="meta-api-description">
How do I change the color of category axis elements in a Kendo UI sparkline? Control and customize the color appearance of all category axis elements in a sparkline or small chart by setting a global color value using standard CSS color formats like hex codes, rgb, or named colors. Configure and override the default axis line, tick marks, and label colors to unify or differentiate the axis styling across the entire category axis. Enable consistent visual theming of category axis elements in sparklines, charts, or graphs by applying a universal color setting that can be prioritized or superseded by more specific label or line color adjustments. Adjust, style, or change the axis colors the way developers seek for dashboard visual harmony, ensuring axis elements match branding or UI themes using flexible color controls.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            color: "#ff0000"
        }
    });
    </script>

### categoryAxis.field `String`

The data field containing the category name.


<div class="meta-api-description">
How do I specify the field for category labels in a Kendo UI Sparkline? Specify or configure the data attribute, key, or property from your dataset that supplies the category labels or categories for the Sparkline’s horizontal axis, such as dates, group names, labels, or categories, enabling control over which field from your data objects is used to display the axis categories, map the label source, or define which property provides the grouping or category values along the axis in sparklines.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        dataSource: {
            data: [
                { category: "Q1", value: 1 },
                { category: "Q2", value: 2 },
                { category: "Q3", value: 3 }
            ]
        },
        categoryAxis: {
            field: "category"
        },
        series: [{
            field: "value"
        }]
    });
    </script>

### categoryAxis.justified `Boolean`*(default: false)*

Positions categories and series points on major ticks. This removes the empty space before and after the series.

This option is ignored if either bar or column series are plotted on the axis.


<div class="meta-api-description">
How to align category labels with major tick marks in a Kendo UI Sparkline chart? Control the alignment of category labels and data points on a chart's horizontal axis to ensure categories and series markers line up precisely with major tick marks, eliminating leading or trailing gaps around the plotted data. Configure horizontal axis justification or equal spacing to achieve a tight fit of data points to axis intervals, enhancing visual clarity and preventing unwanted padding before or after series points. Adjust axis label positioning, alignment, or justification to ensure consistent distribution of categories for line graphs, sparklines, or time series charts, especially when displaying sequential data points along the X-axis, while noting that this alignment setting is not applicable to bar or column chart types.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            justified: true
        }
    });
    </script>

### categoryAxis.labels `Object`

Configures the axis labels.


<div class="meta-api-description">
How to customize category axis label appearance in Kendo UI sparklines? Control and customize category axis label appearance and behavior in sparklines by configuring text content, font styles, colors, rotation angles, alignment, visibility toggles, repeated label skipping or stepping, label density, and custom label templates to define layout and formatting. Adjust label positioning, orientation, and display options to optimize readability and aesthetics on the categorical axis in compact charts, enabling fine-tuned label rendering, formatting controls, and visual customization during chart setup or dynamic updates for clear categorical data representation.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                visible: true,
                color: "#ff0000",
                font: "12px Arial"
            }
        }
    });
    </script>

### categoryAxis.labels.background `String`

The background color of the labels. Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
How do I customize the background color of category axis labels in a Kendo UI sparkline? Control and customize the background color of category axis labels in sparklines by specifying any valid CSS color format such as hex codes, RGB, RGBA, HSL, or named colors to enhance label visibility, adjust transparency levels, improve contrast against various chart backgrounds, or seamlessly integrate label styling with overall theme colors and branding preferences during chart setup.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                background: "#ffe0e0"
            }
        }
    });
    </script>

### categoryAxis.labels.border `Object`

The border of the labels.


<div class="meta-api-description">
How do I customize the border around category axis labels in a Kendo UI for jQuery Sparkline? Control and customize the border appearance around category axis labels in sparklines by setting properties for color, thickness, style, and dash patterns to highlight, differentiate, frame, or visually separate labels. Adjust label outlines on the category axis for emphasis, clarity, or visual grouping by configuring border colors, widths, and dash styles to enhance readability, distinctness, or decorative framing of axis text. Enable precise border styling to distinguish category axis labels in small charts, including options for solid or dashed lines, color customization, and width adjustments for label perimeter emphasis.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                border: {
                    color: "#ff0000",
                    width: 2,
                    dashType: "dash"
                }
            }
        }
    });
    </script>

### categoryAxis.labels.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
How do I customize the color of the border around category axis labels in a Kendo UI sparkline? Control and customize the color of the border around category axis labels in sparklines by specifying any valid CSS color format such as hex codes, RGB, RGBA, HSL, or named colors; configure, set, or style the outline, edge, or frame color to enhance label visibility, improve chart aesthetics, highlight label boundaries, or match branding guidelines by adjusting the border color property for category axis text elements in compact trend or line charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                border: {
                    color: "#00ff00"
                }
            }
        }
    });
    </script>

### categoryAxis.labels.border.dashType `String`*(default: "solid")*

The dash type of the border.


<div class="meta-api-description">
How do I customize the border stroke pattern for category axis labels in a Kendo UI sparkline? Customize and configure the border stroke pattern of chart category axis labels to set solid lines, dashed lines, dotted edges, or custom dash styles; control the outline appearance of axis labels by adjusting the type of dash pattern around label borders, enabling tailored visual styling and enhanced readability for category ticks in sparklines or similar charts by defining how label edges are drawn with continuous or segmented strokes, including options to modify dash sequences, line breaks, and border dash effects for axis label frames.
</div>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                border: {
                    dashType: "dash"
                }
            }
        }
    });
    </script>

### categoryAxis.labels.border.width `Number`*(default: 0)*

The width of the border.


<div class="meta-api-description">
How can I adjust the border width of category axis labels in Kendo UI sparklines? Set or adjust the thickness, size, or weight of borders around category axis labels in sparklines to control label visibility, emphasis, or styling; configure border width to make axis labels more prominent, clearer, or subtle by increasing or decreasing the label outline thickness for category markers, ticks, or text bounding boxes in chart axis presentation and visualization.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                border: {
                    width: 2
                }
            }
        }
    });
    </script>

### categoryAxis.labels.color `String`

The text color of the labels. Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
How do I change the color of category axis labels on a Kendo UI sparkline? Control and customize the text color of category axis labels on sparklines, enabling the setting or styling of label font colors using any valid CSS color formats such as hex codes, RGB, RGBA, or named colors, to enhance data visualization clarity and presentation; configure, change, adjust, or apply specific colors to the category axis text to match themes, improve readability, set label appearance, or highlight categories in sparkline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                color: "#0000ff"
            }
        }
    });
    </script>

### categoryAxis.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.


<div class="meta-api-description">
How to customize font settings for category axis labels in Kendo UI sparklines? Customize and control the typography of category axis text in sparklines by configuring font family, size, weight, style, and other font properties for axis labels, enabling styling, formatting, and appearance adjustments of the category labels on the chart’s horizontal or categorical axis. Adjust label text font settings to enhance readability, match design themes, set bold or italic styles, increase or decrease font size, and define the overall look of axis labels in compact sparkline visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                font: "16px Verdana"
            }
        }
    });
    </script>

### categoryAxis.labels.format `String`

The format of the labels.


<div class="meta-api-description">
How do I format category axis labels in Kendo UI sparklines to display numbers with two decimal places? Control and customize the display of labels on the category axis in sparklines by specifying format strings that define numeric, percentage, date, or custom patterns, enabling consistent presentation of axis labels according to requirements such as decimal precision, date formats, or localization. Configure label formatting for category axes using standard or custom format patterns like number formats (e.g., integer, decimal, percent) or date/time formats to ensure clear, readable, and correctly formatted axis label values in compact trend visualizations. Enable precise adjustment of category axis label appearance by setting formatting strings compatible with common conventions to display dates in formats like MM/dd/yyyy or numbers with specific decimal places, supporting user scenarios involving date parsing, numeric rounding, percentage display, and custom string layouts on axis labels in sparkline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                format: "{0:N2}"
            }
        }
    });
    </script>

### categoryAxis.labels.margin `Number | Object`*(default: 0)*

The margin of the labels.


<div class="meta-api-description">
How do I adjust the margin around category axis labels in a Kendo UI sparkline? Adjust the spacing, padding, or margin around category axis labels to control the distance between labels and the axis, enabling customization of label placement, alignment, or separation in sparklines and small charts; configure or set label margins to optimize readability, prevent overlap, manage label layout, and fine-tune the visual spacing between category labels and the chart axis or adjacent components during design or initialization.
</div>

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 0px (by default)
    margin: { top: 1, left: 1 }

### categoryAxis.labels.mirror `Boolean`

Mirrors the axis labels and ticks.
If the labels are normally on the left side of the axis,
mirroring the axis will render them to the right.


<div class="meta-api-description">
How to mirror category axis labels on a Kendo UI sparkline? Control and configure category axis labels to flip or invert their position on sparklines, enabling mirrored placement of axis labels and tick marks on the opposite side for better visualization alignment or readability; adjust label orientation and tick positioning to switch label sides, reverse label direction, or reflect axis annotations across the sparkline’s category axis for customized chart display and improved data presentation.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                mirror: true
            }
        }
    });
    </script>

### categoryAxis.labels.padding `Number | Object`*(default: 0)*

The padding of the labels.


<div class="meta-api-description">
How do I adjust label spacing in Kendo UI sparkline category axis? Configure the spacing and margin around horizontal axis labels to control label distance, position, and separation in sparklines or charts. Adjust padding to prevent label overlap, improve readability for dense or clustered category data, and fine-tune label alignment on the category axis. Enable customization of label gaps, spacing, and offsets to optimize display of category names or ticks in compact or detailed visualizations.
</div>

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }

### categoryAxis.labels.rotation `Number`*(default: 0)*

The rotation angle of the labels.


<div class="meta-api-description">
How to rotate category axis labels in Kendo UI Sparkline? Adjust or configure the angle, tilt, or slant of category axis labels to enhance visibility, prevent overlap, or accommodate lengthy text in sparklines. Enable label rotation to customize how text is displayed along the axis, set numeric degrees to control label orientation, and optimize the axis label appearance for better readability or compact spacing in charts. Fine-tune or specify the label angle for category axes to prevent clutter, manage label alignment, or format labels to fit within constrained spaces on sparkline visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                rotation: 45
            }
        }
    });
    </script>

### categoryAxis.labels.skip `Number`*(default: 1)*

Number of labels to skip.
Skips rendering the first n labels.


<div class="meta-api-description">
How do I control label overcrowding on Kendo UI sparklines? Control how many initial category axis labels to omit or hide to reduce overcrowding and improve clarity on sparklines, enabling customization of label frequency by skipping the first N labels, managing label density, preventing overlap, and adjusting visual clutter along the axis by setting a specific number of leading labels to not display for clearer, cleaner minimal charts or compact trend visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                skip: 2
            }
        }
    });
    </script>

### categoryAxis.labels.step `Number`*(default: 1)*

Label rendering step.
Every n-th label is rendered where n is the step


<div class="meta-api-description">
How often can I render category axis labels in a Kendo UI sparkline chart? Adjust the frequency or interval of category axis labels in sparkline charts to manage label density and reduce visual clutter by specifying how often labels appear, such as rendering every second or third label. Configure the step size to skip intermediate axis labels, control axis label repetition, set label intervals for clearer category display, enable selective label rendering, and customize how densely labels populate the category axis. This helps optimize readability and presentation by controlling label sparsity, label skipping, or label sampling on the horizontal axis of compact charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                step: 2
            }
        }
    });
    </script>

### categoryAxis.labels.template `String | Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value
* dataItem - the data item, in case a field has been specified. If the category does not have a corresponding item in the data then an empty object will be passed.
* format - the default format of the label
* culture - the default culture (if set) on the label
* index - the 0-based index of the current label
* count - the total number of labels on the axis


<div class="meta-api-description">
How to customize category axis labels in a Kendo UI Sparkline? Customize and control the display of category axis labels by defining a flexible template for formatting text, localizing content, and binding labels directly to data items. Adjust label rendering with access to key fields such as the category value, associated data entries, label formatting patterns, culture-specific localization settings, label position index, and total label count, enabling precise configuration and dynamic label content generation. This approach supports formatting, data-driven label customization, localization options, indexing, and counts to tailor axis labeling in sparklines or similar visualizations for enhanced readability, consistent styling, and integration with underlying data sources.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                template: (data) => `Category: ${data.value}`
            }
        }
    });
    </script>

### categoryAxis.labels.visible `Boolean`*(default: true)*

The visibility of the labels.


<div class="meta-api-description">
How can I hide category axis labels on a sparkline? Control the display of category axis labels on sparklines by enabling or disabling their visibility to show, hide, toggle, or suppress labels for cleaner visuals or clearer emphasis on data points along the horizontal axis, adjusting label presence to reduce clutter or highlight categories in compact inline charts, customizing whether axis text is rendered or concealed based on presentation needs or user preferences.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            labels: {
                visible: false
            }
        }
    });
    </script>

### categoryAxis.line `Object`

Configures the axis line. This will also effect major and minor ticks, but not gridlines.


<div class="meta-api-description">
How to customize category axis line in Sparkline? Configure and customize the style, visibility, and behavior of the category axis line in a sparkline or compact chart, including how the axis line displays major and minor ticks, controlling axis line color, thickness, dash patterns, and whether the axis line is enabled or disabled, without influencing gridlines or background lines, enabling tailored axis line appearance for minimal charts, sparklines, or inline graphs and precise control over axis line rendering, display options, and tick mark presentation.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            line: {
                color: "#ff0000",
                width: 2,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.line.color `String`*(default: "black")*

The color of the lines. Any valid CSS color string will work here, including hex and rgb.

**Note:**This will also effect the major and minor ticks, but not the grid lines.


<div class="meta-api-description">
How do I change the color of category axis lines in a Kendo UI sparkline chart? Customize or configure the color of category axis lines and ticks in sparkline charts by specifying any valid CSS color format including hex, RGB, RGBA, HSL, or named colors, controlling stroke appearance for axis lines, major ticks, and minor ticks while excluding grid line color adjustments, enabling developers to set, change, or style axis line hues for better visualization, theming, or accessibility in small inline charts or compact data visuals.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            line: {
                color: "#00ff00"
            }
        }
    });
    </script>

### categoryAxis.line.dashType `String`*(default: "solid")*

The dash type of the line.


<div class="meta-api-description">
How can I customize the appearance of the category axis line in a Kendo UI sparkline with different dash patterns? Adjust the appearance of the category axis line in sparklines by configuring its dash pattern, enabling you to set different line styles such as solid, dashed, dotted, or dash-dot to customize the axis border or grid line look, controlling how the line segments and gaps appear along the category axis for enhanced chart styling and visualization, including options to fine-tune or switch between continuous lines and varied dashed patterns to influence the visual emphasis or separation of axis marks in charts and graphs.
</div>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            line: {
                dashType: "dash"
            }
        }
    });
    </script>

### categoryAxis.line.visible `Boolean`*(default: true)*

The visibility of the lines.


<div class="meta-api-description">
How do I hide grid lines in Kendo UI sparklines? Enable or disable the display of vertical or horizontal grid lines along the category axis in sparklines, controlling the visibility of axis border lines or tick marks that define categories, customize whether the category axis line is shown or hidden to improve chart clarity, set line rendering for category axis boundaries to highlight or suppress axis visual elements, toggle category axis line display for minimalist or detailed sparkline designs, configure axis line visibility to adjust how category divisions appear on compact charts, manage rendering of category axis border lines to either emphasize or remove categorical separators in sparkline visualizations, control visibility of lines marking category positions or intervals to tailor axis appearance for data presentation needs.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            line: {
                visible: false
            }
        }
    });
    </script>

### categoryAxis.line.width `Number`*(default: 1)*

The width of the line. This will also effect the major and minor ticks, but
not the grid lines.


<div class="meta-api-description">
How do I set the width of the category axis line in a Kendo UI sparkline? Adjust the thickness, stroke width, or line weight of the horizontal or category axis line in sparklines, including the size of major and minor tick marks along that axis, enabling customization of axis visibility and prominence without altering grid line thickness or style.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            line: {
                width: 3
            }
        }
    });
    </script>

### categoryAxis.majorGridLines `Object`

Configures the major grid lines.
These are the lines that are an extension of the major ticks through the body of the chart.


<div class="meta-api-description">
How do I customize the major grid lines on the category axis in a Kendo UI Sparkline? Control the visibility, style, color, width, and dash pattern of major grid lines aligned with primary ticks on the category axis within sparklines, enabling customization of the chart’s background grid for enhanced readability and visual clarity. Adjust, enable, or disable the prominent vertical or horizontal grid lines that mark major intervals along the category axis, set their appearance to match design needs, configure lines extending across the plotting area from main tick marks, and tailor gridline aesthetics such as stroke thickness and pattern for improved data alignment or emphasis in compact charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorGridLines: {
                color: "#ff0000",
                width: 2,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.majorGridLines.color `String`*(default: "black")*

The color of the lines. Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
How to change the color of major grid lines in a sparkline category axis? Control and customize the color of the main vertical or horizontal grid lines on a chart’s category axis for sparklines, enabling you to adjust the appearance, visibility, and contrast of these lines to match themes, enhance readability, highlight specific data divisions, or improve visual clarity by specifying any CSS color format such as hex codes, RGB values, or named colors, useful for styling gridlines, configuring axis appearance, setting grid line colors for better emphasis, and tailoring chart visuals to fit design requirements or developer preferences.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorGridLines: {
                color: "#00ff00"
            }
        }
    });
    </script>

### categoryAxis.majorGridLines.dashType `String`*(default: "solid")*

The dash type of the grid lines.


<div class="meta-api-description">
How to configure dash style for major grid lines in a Kendo UI Sparkline category axis? Configure the stroke style or pattern of major grid lines on a chart’s category axis by setting line types such as solid, dashed, dotted, or custom dash patterns to enhance grid line visibility, readability, and emphasis; control the appearance of axis grid strokes for visual clarity, style customization, and improved data presentation by adjusting line dash effects and grid line formatting on category axes.
</div>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorGridLines: {
                dashType: "dash"
            }
        }
    });
    </script>

### categoryAxis.majorGridLines.visible `Boolean`*(default: false)*

The visibility of the lines.


<div class="meta-api-description">
How do I show/hide major grid lines on a Kendo UI sparkline's category axis? Control the display of major grid lines on the category axis of a sparkline chart by enabling or disabling their visibility to improve readability, layout, and visual distinction of categorical data points. Configure or toggle the presence of primary grid lines along the horizontal or category axis to make categorical data alignment clearer, adjust chart appearance, and customize visual guides in sparklines with simple boolean settings for showing or hiding main axis lines. Optimize chart clarity by showing or hiding primary category axis gridlines, useful when managing graphical density, category segmentation, or improving visual grid reference for sparklines with categorical axes.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorGridLines: {
                visible: true
            }
        }
    });
    </script>

### categoryAxis.majorGridLines.width `Number`*(default: 1)*

The width of the lines.


<div class="meta-api-description">
How do I set the thickness of major grid lines in a Kendo UI sparkline category axis? Adjust or configure the thickness, width, or line weight of major grid lines on the category axis for sparklines, controlling how bold, thin, or prominent these primary grid lines appear in the chart’s horizontal or categorical dimension; set, customize, or modify the category axis major grid line thickness to enhance visibility, styling, or visual emphasis in sparkline visualizations or mini-charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorGridLines: {
                width: 3
            }
        }
    });
    </script>

### categoryAxis.majorGridLines.step `Number` *(default: 1)*

The step of the category axis major grid lines.


<div class="meta-api-description">
How to adjust major grid line spacing in Kendo UI Sparkline category axis? Adjust the interval, frequency, or spacing of major grid lines along the category axis to control how often grid lines appear on a chart or sparkline; configure, set, or define numeric steps to determine the gap between grid lines for clearer data visualization, enabling precise customization of axis tick marks, gridline density, or axis divisions for better readability, layout control, or design consistency in charts that use category axes.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorGridLines: {
                step: 2
            }
        }
    });
    </script>

### categoryAxis.majorGridLines.skip `Number` *(default: 0)*

The skip of the category axis major grid lines.


<div class="meta-api-description">
How to control the interval of major grid lines in a Kendo UI sparkline category axis? Configure the frequency and interval of major grid lines along the category axis in sparklines by setting how many grid lines to skip between each displayed line, enabling precise control over visual density and clarity on time or category scales, useful for customizing axis appearance, reducing clutter, controlling spacing, and improving readability by adjusting the number of skipped grid lines according to numeric values for grid line rendering intervals on sparklines’ horizontal or category axes.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorGridLines: {
                skip: 1
            }
        }
    });
    </script>

### categoryAxis.majorTicks `Object`

The major ticks of the axis.


<div class="meta-api-description">
How to customize major tick marks on a categorical axis in Kendo UI sparkline chart? Control and customize the main tick marks along the categorical axis of a sparkline chart by setting parameters related to their visibility, spacing, size, placement, and styling. Adjust how the primary axis ticks appear, including enabling or disabling them, modifying their length, thickness, color, and position to fit different chart designs and readability requirements. Configure options for axis markers that define the major intervals along category labels, allowing precise tuning of their display characteristics to enhance data visualization clarity and match various style preferences in compact trend graphs. Fine-tune the primary ticks on categorical axes for sparklines to optimize their visual weight, alignment, frequency, and overall presentation for analytic or UI-focused use cases.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorTicks: {
                size: 8,
                color: "#ff0000",
                width: 2,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.majorTicks.size `Number`*(default: 4)*

The axis major tick size. This is the length of the line in pixels that is drawn to indicate the tick
on the chart.


<div class="meta-api-description">
How do I adjust the length of major tick marks along the category axis in a Kendo UI sparkline chart? Adjust the length of major tick marks along the horizontal or category axis in a sparkline chart by specifying the size in pixels for the tick lines; customize, set, or configure the tick length to make the axis ticks longer or shorter, control visual spacing on the category axis, enhance readability through tick size adjustments, modify the pixel length of axis markers for clearer data points, and tailor the appearance of major tick indicators to fit chart design preferences or presentation requirements.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorTicks: {
                size: 10
            }
        }
    });
    </script>

### categoryAxis.majorTicks.visible `Boolean`*(default: true)*

The visibility of the major ticks.


<div class="meta-api-description">
How to show major tick marks in category axis of Kendo UI Sparkline? Control the visibility and display of primary tick marks along the category axis in sparklines, including options to show or hide major tick indicators, enable or disable rendering of major category ticks for clearer axis labeling, adjust category axis major tick presentation, and configure the appearance of major division markers on the category scale to customize chart readability and layout.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorTicks: {
                visible: false
            }
        }
    });
    </script>

### categoryAxis.majorTicks.color `String` *(default: "black")*

The color of the category axis major ticks lines. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
How do I change the color of major tick marks on a category axis in a Kendo UI sparkline? Adjust the color of major tick marks on the category axis to customize the primary tick line appearance in sparklines, enabling control over styling with any CSS-compatible color formats such as hex, RGB, or named colors. This setting helps configure the visual presentation of main category axis ticks, allowing developers to set, change, or style prominent tick lines for clarity, emphasis, or theming within minimal charts or inline data visualizations. Modify or enable distinct colors for major tick lines on the categorical axis for better differentiation, improved readability, or to match branding and UI design requirements in sparkline components.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorTicks: {
                color: "#0000ff"
            }
        }
    });
    </script>

### categoryAxis.majorTicks.width `Number` *(default: 1)*

The width of the major ticks in pixels.


<div class="meta-api-description">
How do I adjust the width of major tick marks in a Kendo UI sparkline category axis? Control and customize the thickness, thickness level, size, or width of major tick marks along the category axis in sparklines to enhance chart readability, visual emphasis, and styling; configure or set the pixel width of primary tick marks on horizontal, vertical, or categorical axes to fine-tune axis marker prominence, clarity, or spacing for better data presentation, axis labeling precision, and user interface design in sparkline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorTicks: {
                width: 3
            }
        }
    });
    </script>

### categoryAxis.majorTicks.step `Number` *(default: 1)*

The step of the category axis major ticks.


<div class="meta-api-description">
How often do major tick marks appear on a sparkline's category axis? Adjust the spacing and frequency of major tick marks on a chart’s category axis by specifying the interval or step size, enabling control over how often ticks appear relative to data categories, configuring label density, tick intervals, and axis granularity, setting numeric values to increase or decrease the number of categories between each major tick, managing visual clutter, improving axis readability, and customizing tick mark cadence in line with category distribution and display preferences.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorTicks: {
                step: 2
            }
        }
    });
    </script>

### categoryAxis.majorTicks.skip `Number` *(default: 0)*

The skip of the category axis major ticks.


<div class="meta-api-description">
How to adjust major tick mark spacing on a sparkline's category axis? Adjust the interval, spacing, or frequency of major tick marks along a chart’s category axis by configuring how many ticks to skip or omit between visible marks; customize tick density, control label crowding, set the number of ticks to render or hide, and manage category axis divisions to create clearer, less cluttered sparklines or charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            majorTicks: {
                skip: 1
            }
        }
    });
    </script>

### categoryAxis.minorGridLines `Object`

Configures the minor grid lines.  These are the lines that are an extension of the minor ticks through
the body of the chart.

Note that minor grid lines are not visible by default, therefore none of these settings will take effect with the minor grid lines visibility being set to**true**.


<div class="meta-api-description">
How to control the appearance of minor grid lines in a Kendo UI sparkline category axis? Control the appearance, visibility, styling, spacing, and behavior of minor grid lines that extend from minor ticks along the category axis in sparkline charts; enable or disable these subtle grid lines to enhance chart readability, customize their display properties such as color, thickness, and spacing, and configure how minor tick-related grid lines appear on the horizontal axis to better visualize detailed intervals or subdivisions within the chart.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorGridLines: {
                color: "#ff0000",
                width: 1,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorGridLines.color `String`*(default: "black")*

The color of the lines. Any valid CSS color string will work here, including hex and
rgb.

Note that this setting has no effect if the visibility of the minor
grid lines is not set to**true**.


<div class="meta-api-description">
How do I change the color of minor grid lines in a Kendo UI sparkline category axis? Control and customize the color of the minor grid lines along the category axis in sparklines by setting line colors with any valid CSS color format such as hex codes, RGB, RGBA, or named colors to achieve specific styling or visual emphasis. Adjust the appearance of fine grid subdivisions to enhance chart readability, highlight minor divisions, or configure the axis aesthetics in data visualizations, with the option effectively applied only when the minor grid lines are enabled or visible. This setting supports use cases involving color theming, design consistency, customization of chart background details, and precise control over graphical axis elements for better user interface design or data presentation clarity.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorGridLines: {
                color: "#00ff00",
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorGridLines.dashType `String`*(default: "solid")*

The dash type of the grid lines.


<div class="meta-api-description">
How to customize the appearance of minor grid lines in a Kendo UI sparkline's category axis? Adjust or configure the style and appearance of minor grid lines on a chart’s category axis by setting different dash patterns such as solid, dashed, dotted, or customized stroke types to highlight or reduce the emphasis of the grid lines within sparklines, enabling control over visual differentiation of minor axis markers, grid styling, line textures, and axis detail customization for clearer data presentation and user interface design.
</div>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorGridLines: {
                dashType: "dash",
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorGridLines.visible `Boolean`*(default: false)*

The visibility of the lines.


<div class="meta-api-description">
How do I hide minor grid lines in a Kendo UI sparkline's category axis? Control the visibility and display of minor grid lines along the category axis in sparklines to customize axis detailing, reduce visual clutter, enhance grid clarity, or highlight major axis divisions by toggling the presence of smaller grid markers; adjust or enable minor horizontal or vertical grid line rendering to refine chart background density and improve readability or styling of compact inline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorGridLines: {
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorGridLines.width `Number`

The width of the lines.

Note that this setting has no effect if the visibility of the minor
grid lines is not set to**true**.


<div class="meta-api-description">
How do I adjust the thickness of minor grid lines in Kendo UI Sparkline's category axis? Adjust or define the thickness, stroke width, or line weight of the minor grid lines along the horizontal or category axis in sparklines to customize the visual density of axis divisions; control, configure, or set how thick or thin these fine grid lines appear on chart axes, especially when needing subtle or prominent minor tick marks or grid strokes in minimalistic or detailed sparkline visualizations, considering that changes apply only if minor grid lines are enabled or visible in the chart’s rendering settings.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorGridLines: {
                width: 2,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorGridLines.step `Number` *(default: 1)*

The step of the category axis minor grid lines.


<div class="meta-api-description">
How to adjust the minor grid lines in Kendo UI Sparkline category axis? Adjust spacing and frequency of minor grid lines or ticks along the horizontal or category axis, configure intervals between minor axis lines, set how often minor gridlines appear based on category count or index intervals, control density and visual rhythm of chart axis ticks, define step size or gap between smaller division lines on the axis, fine-tune minor tick intervals for sparklines or category-based charts, enable custom spacing of secondary gridlines, modify visual grouping or segmentation on the category axis by controlling minor line frequency, optimize minor tick step for clearer data segmentation or granularity on axis.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorGridLines: {
                step: 2,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorGridLines.skip `Number` *(default: 0)*

The skip of the category axis minor grid lines.


<div class="meta-api-description">
How to skip minor grid lines on category axis in Kendo UI sparkline? Control and configure the spacing, frequency, and density of minor grid lines along the category axis of a sparkline or similar chart, enabling you to skip or omit a set number of minor ticks or lines between displayed grid lines to reduce visual clutter or enhance readability; adjust how many minor interval lines are rendered by setting a skip count or step value that determines the intervals between minor grid lines shown, allowing customization of grid line distribution, spacing control, line intervals, and fine-tuning of axis grid density for clearer data visualization and presentation.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorGridLines: {
                skip: 1,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorTicks `Object`

The minor ticks of the axis.


<div class="meta-api-description">
How do I customize minor tick marks in Kendo UI Sparkline category axis? Control and customize the minor tick marks along the category axis of sparklines, including how to enable or disable them, adjust their spacing and intervals, set visibility preferences, modify size and length, and style the appearance for clear and precise axis labeling and segmentation when configuring sparkline charts or inline data visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorTicks: {
                size: 5,
                color: "#ff0000",
                width: 2,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorTicks.size `Number`*(default: 3)*

The axis minor tick size. This is the length of the line in pixels that is drawn to indicate the tick
on the chart.


<div class="meta-api-description">
How to adjust the length of minor tick marks on a sparkline category axis? Set or adjust the length, size, or pixel dimensions of minor tick marks on the category axis of a sparkline chart, controlling how long the smaller tick indicators appear along the axis; configure, customize, or modify the minor tick length to improve chart readability, visual precision, or axis detail by specifying the pixel size of these minor ticks during chart setup or rendering.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorTicks: {
                size: 6,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorTicks.visible `Boolean`*(default: false)*

The visibility of the minor ticks.


<div class="meta-api-description">
How to hide minor ticks in Kendo UI sparkline category axis? Control the display of small or minor tick marks between main category axis labels in sparklines by enabling or disabling their visibility, configure whether to show or hide subtle intermediate ticks along the horizontal or categorical axis, adjust rendering of these finer minor markers that appear between primary ticks to refine axis granularity and improve visual detail, set visibility of minor ticks for better axis scale indication or cleaner chart appearance, customize minor tick presence on category axes to enhance readability, precision, or minimalist design in small inline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorTicks: {
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorTicks.color `String` *(default: "black")*

The color of the category axis minor ticks lines. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
How do I change the color of minor ticks in a Kendo UI Sparkline chart? Adjust or customize the color, hue, shade, or styling of the smaller tick marks, minor divisions, or sub-grid lines along the horizontal or vertical category axis of a sparkline chart to improve visual clarity, theme consistency, or highlight subtle data intervals using standard CSS color formats such as hex codes, RGB, or named colors. Enable control over the appearance of these less prominent ticks to match branding, enhance chart readability, or differentiate minor axis markers from major ticks by setting color values through configuration, styling, or design parameters. Change or define the coloration of minor axis markers in tiny trendline charts to refine axis detailing or emphasize subdivisions with flexible color inputs useful for UI customization and data visualization aesthetics.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorTicks: {
                color: "#0000ff",
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorTicks.width `Number` *(default: 1)*

The width of the minor ticks in pixels.


<div class="meta-api-description">
How do I adjust the thickness of minor tick marks in a Kendo UI sparkline category axis? Adjust the thickness, stroke width, or pixel size of minor tick marks along the category axis in sparklines to customize their visibility and prominence; control, set, or configure the width of small tick indicators on the horizontal or categorical scale, fine-tuning the appearance of minor grid lines or axis markers for better readability, subtle detailing, or enhanced visual distinction in compact data charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorTicks: {
                width: 3,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorTicks.step `Number` *(default: 1)*

The step of the category axis minor ticks.


<div class="meta-api-description">
How do I control the spacing between minor tick marks on a Kendo UI Sparkline's category axis? Control the interval and spacing between minor tick marks along the category axis to adjust how densely the ticks appear, enabling fine-tuning of axis granularity, tick frequency, or label distribution to reduce visual clutter or enhance readability; configure, set, or customize the numeric step value determining the gap between minor ticks for sparklines, charts, or category-based axes to optimize axis detail, improve data visualization clarity, or manage tick mark density according to display needs.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorTicks: {
                step: 2,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.minorTicks.skip `Number` *(default: 0)*

The skip of the category axis minor ticks.


<div class="meta-api-description">
How do I control the spacing of minor ticks on a Kendo UI sparkline's category axis? Adjust the spacing and density of minor ticks along the category axis in sparklines by configuring how many minor tick marks to omit or skip, enabling control over tick intervals, step size, frequency, and visual clutter reduction for clearer axis labeling and improved readability, supporting customization of minor tick visibility to match design or data presentation needs.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            minorTicks: {
                skip: 1,
                visible: true
            }
        }
    });
    </script>

### categoryAxis.name `String`*(default: "primary")*

The unique axis name.


<div class="meta-api-description">
How do I set a unique identifier for a category axis in Kendo UI Sparkline? Set or assign a unique identifier or label to a chart’s category axis to enable precise reference, selection, configuration, or management within settings, event handling, data bindings, or scripting. This identifier helps distinguish between multiple axes by name, allowing developers to target specific category axes for customization, updating, or interaction control during visualization initialization or runtime adjustments. Use unique axis names to control axis properties, apply axis-specific options, respond to axis-related events, and implement axis-level logic in charts or sparklines with multiple axes present.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            name: "customCategoryAxis"
        }
    });
    </script>

### categoryAxis.plotBands `Array`

The plot bands of the category axis.


<div class="meta-api-description">
How do I create shaded background ranges on my Kendo UI sparkline category axis? Control and customize shaded or highlighted background ranges along the category axis to emphasize specific sections or category intervals, configure multiple plot bands to mark distinct ranges behind ticks and labels, define and enable visual bands that highlight category segments for improved data interpretation, set colored or transparent bands on the axis to draw attention to particular category groups, ranges, or zones, adjust category axis backgrounds for clearer differentiation between categories or data clusters.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            plotBands: [{
                from: 1,
                to: 3,
                color: "#ff0000",
                opacity: 0.3
            }]
        }
    });
    </script>

### categoryAxis.plotBands.from `Number`

The start position of the plot band in axis units.


<div class="meta-api-description">
How do I set the starting point of a highlighted range in a Kendo UI sparkline category axis plot band? Specify or configure the starting point, beginning value, or initial position of a highlighted range, band, or region along a chart's category axis to emphasize a particular section or interval on a timeline, categories, or discrete axis; set the lower bound or start coordinate for axis plot bands, area shading, or highlight zones to visually separate or mark ranges within sparkline visualizations, charts, or graphs, often used in combination with an end or "to" value to control the extent and placement of highlighted areas across categorical or time-based axis units.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            plotBands: [{
                from: 1,
                to: 3,
                color: "#ff0000"
            }]
        }
    });
    </script>

### categoryAxis.plotBands.to `Number`

The end position of the plot band in axis units.


<div class="meta-api-description">
How do I set the end position of a plot band in a Kendo UI sparkline category axis? Control and configure the end position of a highlighted range or plot band along a category axis by specifying the exact axis value where the band stops, enabling precise alignment with the axis units, adjusting the endpoint of shading or color bands on charts or sparklines, setting or modifying the finishing boundary of range highlights, and customizing the visual extent of plot bands for data visualization to match specific data points or categories on the axis scale.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            plotBands: [{
                from: 0,
                to: 2,
                color: "#00ff00"
            }]
        }
    });
    </script>

### categoryAxis.plotBands.color `String`

The color of the plot band.


<div class="meta-api-description">
How to change the color of plot bands on a sparkline category axis? Configure or customize the fill color for highlighting specific category ranges or backgrounds on the horizontal axis of a sparkline chart, enabling control over visual emphasis of axis segments or bands by setting the color that fills plot band areas along the category axis. Adjust or enable colored shading behind certain category groupings or intervals to improve the visibility and differentiation of data sections on the axis, using color settings to define the background for axis plot bands in sparkline visualizations. This feature helps mark important ranges, separate groups, or emphasize axis segments with customizable fill colors applied as highlights behind categories on the chart’s baseline axis.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            plotBands: [{
                from: 1,
                to: 3,
                color: "#0000ff"
            }]
        }
    });
    </script>

### categoryAxis.plotBands.opacity `Number`

The opacity of the plot band.


<div class="meta-api-description">
How do I adjust the transparency of plot bands in a Kendo UI Sparkline category axis? Adjust the transparency level or visual opacity of background highlight bands on a chart’s horizontal or category axis, enabling control over how faint or bold shaded regions appear behind data points for enhanced visual emphasis or subtlety. Configure the alpha channel, set fill transparency, fine-tune the shading intensity of plot bands or highlighted intervals along categorical axis labels, and customize how translucent or solid band overlays appear beneath sparkline data for improved clarity, focus, or design customization during chart rendering.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            plotBands: [{
                from: 1,
                to: 3,
                color: "#ff0000",
                opacity: 0.5
            }]
        }
    });
    </script>

### categoryAxis.reverse `Boolean`*(default: false)*

Reverses the axis direction -
categories are listed from right to left and from top to bottom.


<div class="meta-api-description">
How to flip category axis labels in Kendo UI sparkline? Invert or flip the order of category axis labels and data points to enable right-to-left or top-to-bottom display orientation, reverse the sequence of categories, control the rendering direction on the axis, customize axis layout for reversed or inverted data flows, switch category sorting order for sparklines, adjust axis direction for localization, enable opposite order visualization, configure axis orientation to show categories backward or flipped, and set the category axis to present data in reverse chronological or custom order.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            reverse: true
        }
    });
    </script>

### categoryAxis.title `Object`

The title of the category axis.


<div class="meta-api-description">
How do I customize the category axis title in a Kendo UI sparkline? Configure or set the label for the horizontal or category axis in a sparkline, enabling customization of the axis title text to describe category values clearly; control, update, or bind the axis label dynamically or statically to improve chart readability, context, and presentation, allowing users to define descriptive axis headings, customize category axis captions, or modify the axis title programmatically during initialization or runtime.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                color: "#ff0000",
                font: "14px Arial"
            }
        }
    });
    </script>

### categoryAxis.title.background `String`

The background color of the title. Any valid CSS color string will work here, including
hex and rgb.


<div class="meta-api-description">
How to customize the background color of category axis title in a Kendo UI sparkline chart? Customize or adjust the background color behind the category axis label or title in a sparkline chart, setting or configuring the backdrop shade using any valid CSS color format such as hex codes, RGB values, or color names to visually style, highlight, or differentiate the axis title area in compact inline charts, enabling control over the look, readability, or emphasis of the axis heading background in data visualizations or dashboard components.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                background: "#ffe0e0"
            }
        }
    });
    </script>

### categoryAxis.title.border `Object`

The border of the title.


<div class="meta-api-description">
How do I customize the border of the category axis title in a Kendo UI sparkline? Control and customize the border appearance around the axis title in sparklines by setting properties such as border color, stroke width, line style, and edge rendering for the horizontal category axis label. Adjust, configure, or enable border outlines, edges, or frames on the category axis title, specifying visual styles like thickness and color to enhance chart labeling and axis title visibility according to design requirements or UI preferences.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                border: {
                    color: "#ff0000",
                    width: 2,
                    dashType: "dash"
                }
            }
        }
    });
    </script>

### categoryAxis.title.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including
hex and rgb.


<div class="meta-api-description">
How do I change the border color of the category axis title in a Sparkline chart? Customize or configure the outline color, stroke, or border of the category axis title in a Sparkline chart using any valid CSS color format such as hex codes, RGB, RGBA, or named colors. Control the appearance, style, or theme of the axis title’s border to enhance visual clarity, differentiate segments, or match branding requirements by setting the color precisely. Enable adjustments to the title’s frame color for category axes in sparklines to improve chart readability or highlight specific sections, supporting developers looking to style, theme, or personalize axis title borders with flexible color options.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                border: {
                    color: "#00ff00"
                }
            }
        }
    });
    </script>

### categoryAxis.title.border.dashType `String`*(default: "solid")*

The dash type of the border.


<div class="meta-api-description">
How can I customize the border style of the category axis title in a Kendo UI Sparkline? Customize the outline style of the axis title border by setting the dash pattern, enabling dotted, dashed, or solid line effects for clear visual distinction in charts and sparklines; configure the border style for category axis titles to adjust line appearance, thickness patterns, or dash types to enhance readability, styling, and presentation of chart titles during rendering or dynamic updates.
</div>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                border: {
                    dashType: "dash"
                }
            }
        }
    });
    </script>

### categoryAxis.title.border.width `Number`*(default: 0)*

The width of the border.


<div class="meta-api-description">
How to set the width of the border around the category axis title in a Kendo UI sparkline? Control and customize the thickness, size, or weight of the border surrounding the category axis title text or label on sparklines, enabling emphasis or subtle framing of the axis heading. Adjust the border line width, outline thickness, or stroke size around the category axis title to enhance visibility, styling, or visual separation of the axis label in minimal charts or small timeline visuals. Configure, set, or fine-tune how bold or thin the border line appears around the category label title for clear categorization or decorative purposes on inline charts or compact data visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                border: {
                    width: 3
                }
            }
        }
    });
    </script>

### categoryAxis.title.color `String`

The text color of the title. Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
How do I change the color of the category axis title in a Kendo UI Sparkline? Control the text color of the category axis title in sparklines by specifying any valid CSS color format such as hex codes, RGB or RGBA values, HSL notation, or named colors to customize, style, or configure the axis label appearance, enabling developers to set, change, or adjust the visual color of the axis title text for improved chart readability and thematic consistency.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                color: "#0000ff"
            }
        }
    });
    </script>

### categoryAxis.title.font `String`*(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.


<div class="meta-api-description">
How do I change the font of category axis titles in a Kendo UI sparkline? Customize and control the font style, typography, font family, size, weight, color, and appearance of category axis titles in sparklines, including setting and configuring text styling for axis labels, adjusting font attributes for clearer chart categorization, enabling tailored font formatting for axis titles, and modifying text presentation to enhance readability and visual hierarchy in sparkline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                font: "18px Verdana"
            }
        }
    });
    </script>

### categoryAxis.title.margin `Number|Object`*(default: 5)*

The margin of the title.


<div class="meta-api-description">
How do I adjust the margin around the category axis title in a Kendo UI sparkline chart? Adjust or configure the spacing, padding, or margin around the label or title of the category axis in a sparkline chart to control the distance between the axis title and adjacent elements, manage layout alignment, fine-tune visual separation, set empty space for clarity, and improve overall chart readability by customizing how the category axis title is positioned relative to the axis and nearby content.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                margin: 10
            }
        }
    });
    </script>

### categoryAxis.title.position `String`*(default: "center")*

The position of the title.


<div class="meta-api-description">
How do I adjust the position of the category axis title in a Kendo UI Sparkline chart? Adjust the placement or alignment of the category axis title within a Sparkline chart to control its position relative to the category axis, enabling customization of layout, readability, and visual hierarchy; configure, set, move, or align the axis title placement to optimize display, improve clarity, and manage title location during initialization or runtime changes.
</div>

#### *"top"*

The axis title is positioned on the top (applicable to vertical axis)

#### *"bottom"*

The axis title is positioned on the bottom (applicable to vertical axis)

#### *"left"*

The axis title is positioned on the left (applicable to horizontal axis)

#### *"right"*

The axis title is positioned on the right (applicable to horizontal axis)

#### *"center"*

The axis title is positioned in the center

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                position: "left"
            }
        }
    });
    </script>

### categoryAxis.title.rotation `Number`*(default: 0)*

The rotation angle of the title.


<div class="meta-api-description">
How do I rotate the category axis title in a Kendo UI sparkline? Adjust or configure the angle, tilt, or orientation of the category axis title text in sparklines to align, rotate, or position the label for better readability or stylistic presentation; set or control the numeric rotation degree to modify how the title is displayed along the horizontal axis, enabling customization of text direction, slant, or angle to fit different design needs, improve visual clarity, or match chart formatting preferences.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                rotation: 45
            }
        }
    });
    </script>

### categoryAxis.title.text `String`

The text of the title.


<div class="meta-api-description">
How do I customize the category axis title in a Kendo UI Sparkline chart? Configure or update the text label displayed on the category axis of a Sparkline chart, enabling customization or setting of the axis title, axis label, or category heading to clearly identify data categories or groups; control, change, or set the descriptive title string appearing alongside the category axis to improve chart readability, labeling, and context in small inline graphs or visual summary charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Custom Category Title"
            }
        }
    });
    </script>

### categoryAxis.title.visible `Boolean`*(default: true)*

The visibility of the title.


<div class="meta-api-description">
How to hide category axis title in Kendo UI sparkline chart? Control the display of the category axis title on sparklines by enabling or disabling its visibility, showing or hiding the label that identifies the category axis in small charts, toggling the axis title presentation programmatically or through settings, adjusting whether the category axis heading or name appears on mini line or bar charts, managing the presence of the axis title text to clarify data grouping, and configuring the title visibility to improve chart readability or minimize clutter in compact visualization components.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        categoryAxis: {
            title: {
                text: "Categories",
                visible: false
            }
        }
    });
    </script>

### categoryAxis.type `String`*(default: "category")*

The axis type.


<div class="meta-api-description">
How to configure the category axis type in Kendo UI Sparkline for date-based data? Control how category data on the horizontal axis is interpreted and scaled by selecting whether categories are processed as dates, numeric values, or categorical labels, influencing parsing methods, axis tick generation, label formatting, sorting order, and data binding behavior. Enable configuration of axis type to handle time series, numerical ranges, or discrete groups for sparklines, adjusting how category values are read, displayed, sorted, and formatted to fit various data visualization scenarios, including date-driven timelines, continuous numeric scales, or unordered category sets. Adjusting this axis type setting helps with precise control over how category axes respond to different data types, ensuring proper scaling, tick marks, label parsing, and overall rendering of category-related information in small inline charts or sparklines.
</div>

#### *"category"*

Discrete category axis.

#### *"date"*

Specialized axis for displaying chronological data.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            categories: [
                new Date("2023/01/01"),
                new Date("2023/01/02"),
                new Date("2023/01/03")
            ]
        },
        series: [{
            data: [10, 15, 8]
        }]
    });
    </script>

### categoryAxis.autoBaseUnitSteps `Object`

Specifies the discrete**baseUnitStep**values when
either**baseUnit**is set to "fit" or**baseUnitStep**is set to "auto".

The default configuration is as follows:

* `minutes: [1, 2, 5, 15, 30]`
* `hours: [1, 2, 3, 6, 12]`
* `days: [1, 2, 3]`
* `weeks: [1, 2]`
* `months: [1, 2, 3, 6]`
* `years: [1, 2, 3, 5, 10, 25, 50]`

Each setting can be overriden individually.


<div class="meta-api-description">
How to customize time intervals in Kendo UI Sparkline category axis? Control and customize discrete time interval options for category axes in sparklines by configuring numeric step arrays for various time units such as minutes, hours, days, weeks, months, and years. Adjust or override defaults to enable automatic or fit-based base unit step sizing, fine-tune time granularity, set preferred increments for time-based axis scaling, customize step intervals for dynamic time series data, define candidate step arrays for automatic time unit fitting, and modify discrete base unit steps to optimize axis representation across different time ranges and zoom levels.
</div>

#### Example

    $("#sparkline").kendoSparkline({
        categoryAxis: {
            categories: [
                new Date("2012/02/01 00:00:00"),
                new Date("2012/02/02 00:00:00"),
                new Date("2012/02/20 00:00:00")
            ],
            baseUnitStep: "auto",
            autoBaseUnitSteps: {
                days: [3]
            }
        },
        ...
    });

### categoryAxis.baseUnit `String`

The base time interval for the axis.
The default baseUnit is determined automatically from the minimum difference
between subsequent categories. Available options:

* minutes
* hours
* days
* weeks
* months
* years
***fit**

Setting**baseUnit**to "fit" will set such base unit and**baseUnitStep**
that the total number of categories does not exceed**maxDateGroups**.

Series data is aggregated for the specified base unit by using the
**series.aggregate**function.


<div class="meta-api-description">
How to set the time interval granularity for date axis in Kendo UI Sparkline? Control and configure the time interval grouping or granularity for date and time axes by setting fixed base units like minutes, hours, days, weeks, months, or years to aggregate and group series data points; enable automatic or custom scaling to fit date groups within limits using options that adjust base units and steps, allowing users to aggregate time series data by selecting or controlling base time intervals, date grouping strategies, time granularity levels, and dynamic or fixed date range buckets for sparkline or chart category axes.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            baseUnit: "days",
            categories: [
                new Date("2023/01/01"),
                new Date("2023/01/02"),
                new Date("2023/01/03"),
                new Date("2023/01/04")
            ]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.baseUnitStep `Object`*(default: 1)*

Sets the step (interval) between categories in base units.
Specifiying "auto" will set the step to such value that the total number of categories does not exceed**maxDateGroups**.

This option is ignored if**baseUnit**is set to "fit".


<div class="meta-api-description">
How do I adjust the spacing between category labels on a Kendo UI Sparkline's horizontal axis? Adjust the spacing or interval between category labels or data points on the Sparkline's horizontal axis by setting a numeric step size, controlling how frequently categories appear, configuring the step count to limit or expand category grouping, enabling automatic calculation of the interval to optimize label density and prevent overcrowding based on maximum allowed groups, managing category axis granularity to improve readability, specifying fixed or dynamic steps for time-based or categorical data, and overriding default grouping behavior except when automatic fitting is enabled.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            baseUnit: "days",
            baseUnitStep: 2,
            categories: [
                new Date("2023/01/01"),
                new Date("2023/01/03"),
                new Date("2023/01/05"),
                new Date("2023/01/07")
            ]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>


### categoryAxis.labels.culture `String`

Culture to use for formatting the dates. See [Globalization](/framework/globalization/overview) for more information.
It uses the global culture by default.


<div class="meta-api-description">
How do I change the date format for category axis labels in a Kendo UI Sparkline? Configure or customize the locale, language, or cultural settings for date and time labels on the category axis of sparklines, enabling control over regional formats, calendar systems, and localized date expressions. Adjust or set the culture code to influence date label formatting, display language, and number localization in sparkline charts, supporting internationalization and globalization scenarios. This setting determines how date axis labels appear according to specific cultural conventions, including date orders, month names, and day formats, useful for adapting sparklines to different user locales or regional preferences.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            labels: {
                culture: "de-DE"
            },
            categories: [
                new Date("2023/01/01"),
                new Date("2023/02/01"),
                new Date("2023/03/01")
            ]
        },
        series: [{
            data: [10, 15, 8]
        }]
    });
    </script>

### categoryAxis.labels.dateFormats `Object`

Date format strings


<div class="meta-api-description">
How do I customize date formats for category axis labels in Kendo UI sparklines? Configure and customize date label formats on category axes for sparklines by setting specific patterns for day, month, and year levels, enabling precise control over how date values appear in axis labels, including custom date string formats, formatting options for dates in charts, axis label date style adjustments, tailoring output for varying date granularities, and fine-tuning timeline or time series date displays on category axes.
</div>

#### *"hours"*

"HH:mm"

#### *"days"*

"M/d"

#### *"weeks"*

"M/d"

#### *"months"*

"MMM 'yy"

#### *"years"*

"yyyy"

The Chart will choose the appropriate format for the current `baseUnit`.
Setting the labels**format**option will override these defaults.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            baseUnit: "months",
            labels: {
                dateFormats: {
                    months: "MMM yyyy"
                }
            },
            categories: [
                new Date("2023/01/01"),
                new Date("2023/02/01"),
                new Date("2023/03/01")
            ]
        },
        series: [{
            data: [10, 15, 8]
        }]
    });
    </script>

### categoryAxis.max `Object`

The last date displayed on the axis.
By default, the minimum date is the same as the last category.
This is often used in combination with the**min**and**roundToBaseUnit**configuration options to
set up a fixed date range.


<div class="meta-api-description">
How do I set the maximum value on a time-based category axis in Kendo UI sparklines? Control or configure the upper limit, end date, or maximum value on a time-based category axis in sparklines, enabling you to set the final visible date for data points, control the temporal range displayed, fix or adjust the timeline endpoint, define the maximum boundary for the x-axis dates, limit the range of dates shown, set the upper date bound for charts with time categories, specify the last date on a category axis, align or snap the end date with data points, restrict visible data range on a time axis, and combine with minimum date or rounding options to establish precise fixed time intervals or date spans in sparkline visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            max: new Date("2023/03/31"),
            categories: [
                new Date("2023/01/01"),
                new Date("2023/02/01"),
                new Date("2023/03/01")
            ]
        },
        series: [{
            data: [10, 15, 8]
        }]
    });
    </script>

### categoryAxis.min `Object`

The first date displayed on the axis.
By default, the minimum date is the same as the first category.
This is often used in combination with the**max**and**roundToBaseUnit**configuration options to
set up a fixed date range.


<div class="meta-api-description">
How do I set the minimum value on the category axis in a Kendo UI Sparkline? Control and configure the starting point or earliest date shown on a time-based or category axis in a compact chart or sparkline, setting a fixed beginning boundary for the axis scale to customize or lock the displayed range of dates or categories. Adjust and define the minimum value on the horizontal axis to control which initial data point or time mark appears first, enabling consistent, precise visualization of date intervals or categorical ranges. Combine with options for setting the maximum limit or rounding to base units for exact date range control, timeline anchoring, start date fixing, or axis range stabilization when displaying temporal data or categorical sequences in miniature chart views.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            min: new Date("2022/12/01"),
            categories: [
                new Date("2023/01/01"),
                new Date("2023/02/01"),
                new Date("2023/03/01")
            ]
        },
        series: [{
            data: [10, 15, 8]
        }]
    });
    </script>

### categoryAxis.roundToBaseUnit `Boolean`*(default: true)*

By default, the first and last dates will be rounded off to the nearest base unit.
Specifying**false**for this option will disable this behavior.

This option is most useful in combination with explicit**min**and**max**dates.

It will be ignored if either bar or column series are plotted on the axis.


<div class="meta-api-description">
How do I control date rounding on the category axis in a Kendo UI sparkline when using fixed minimum and maximum dates? Configure how the date axis in sparklines handles rounding of the starting and ending category dates by enabling or disabling automatic adjustment to the nearest base time unit, allowing precise control over date boundaries especially when fixed minimum and maximum dates are defined for the horizontal axis. This setting helps maintain exact endpoints for time-based data displays in line charts or line-type sparklines, ensuring that the axis does not snap or extend beyond specified date ranges, while noting that this rounding behavior is ignored for bar or column chart types. Adjusting this feature supports scenarios where exact temporal limits are critical and users need to control whether dates align strictly with calendar units or preserve raw date values on the sparkline category axis.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            roundToBaseUnit: false,
            min: new Date("2023/01/15"),
            max: new Date("2023/03/15"),
            categories: [
                new Date("2023/01/01"),
                new Date("2023/02/01"),
                new Date("2023/03/01")
            ]
        },
        series: [{
            data: [10, 15, 8]
        }]
    });
    </script>

### categoryAxis.weekStartDay `Number`*(default: kendo.days.Sunday)*

Specifies the week start day when**baseUnit**is set to "weeks".
Use the *kendo.days* constants to specify the day by name.

* kendo.days.Sunday (0)
* kendo.days.Monday (1)
* kendo.days.Tuesday (2)
* kendo.days.Wednesday (3)
* kendo.days.Thursday (4)
* kendo.days.Friday (5)
* kendo.days.Saturday (6)


<div class="meta-api-description">
How to configure the starting day of the week for weekly category axes in Kendo UI Sparkline? Configure the starting day of the week for weekly category axes in time-based charts, controlling how weekly intervals, grouping, and category alignment are calculated based on different calendar conventions. Specify which day—such as Sunday, Monday, or any other weekday—signals the beginning of the week to accurately segment data into week-long periods when using weekly date units. Adjust the anchor point for weekly time series, enable localization of week definitions, set custom start days for week-based aggregations, and control week-aligned category axes to match regional or business calendar practices. This setting impacts how weekly data buckets are computed, displayed, and interpreted across various weekly timeline visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            baseUnit: "weeks",
            weekStartDay: kendo.days.Monday,
            categories: [
                new Date("2023/01/01"),
                new Date("2023/01/08"),
                new Date("2023/01/15")
            ]
        },
        series: [{
            data: [10, 15, 8]
        }]
    });
    </script>


### categoryAxis.maxDateGroups `Number`*(default: 10)*

Specifies the maximum number of groups (categories) to produce when
either**baseUnit**is set to "fit" or**baseUnitStep**is set to "auto".


<div class="meta-api-description">
How do I limit the number of date groups on a Kendo UI sparkline's category axis? Control and limit the maximum number of date-based categories or groups generated on a sparkline’s category axis when date auto-grouping is enabled, especially when time intervals are set to adapt automatically or fit dynamically. Configure, set, or adjust how many date segments, time buckets, or grouped date points appear on a sparkline chart’s horizontal axis for optimizing display density, reducing clutter, or improving readability in scenarios where data spans varying time ranges. Manage the count of date intervals created when base units are flexible, automatically stepping, or fitted to data, enabling developers to configure, fine-tune, or cap the number of date categories to customize time series visualization granularity and grouping behavior in sparklines with date axes.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            baseUnit: "fit",
            maxDateGroups: 5,
            categories: [
                new Date("2023/01/01"),
                new Date("2023/01/15"),
                new Date("2023/02/01"),
                new Date("2023/02/15"),
                new Date("2023/03/01"),
                new Date("2023/03/15")
            ]
        },
        series: [{
            data: [10, 15, 8, 12, 6, 9]
        }]
    });
    </script>

### categoryAxis.maxDivisions `Number`

The maximum number of ticks and labels to display. Applicabable for date category axis.

This option is ignored in all other cases.


<div class="meta-api-description">
How to limit tick marks on category axis for date-based sparklines in Kendo UI? Set or adjust the highest number of ticks, labels, or divisions displayed on a date-based category axis to control label density and improve readability for time series or date-related sparklines, enabling configuration of maximum tick marks, limiting label overcrowding, and managing how date categories are segmented along the axis for clearer visualization in charts that represent dates or times.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            maxDivisions: 3,
            categories: [
                new Date("2023/01/01"),
                new Date("2023/02/01"),
                new Date("2023/03/01"),
                new Date("2023/04/01"),
                new Date("2023/05/01")
            ]
        },
        series: [{
            data: [10, 15, 8, 12, 6]
        }]
    });
    </script>

### categoryAxis.visible `Boolean`*(default: false)*

The visibility of the axis.


<div class="meta-api-description">
How can I hide category axis labels in Kendo UI sparklines? Control the display of the category axis in sparklines by enabling or disabling the visibility of category labels, ticks, and axis lines for clearer or minimal visual presentations. Configure, toggle, show, hide, or set the axis visibility dynamically during initialization or runtime to manage how category information is rendered, whether for detailed labeling, comparison, or simplified charts without axes. Adjust the axis presence to customize chart readability, user interface, or data emphasis by controlling the rendering of categorical axis elements.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            visible: true,
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair `Object`

The crosshair configuration options.


<div class="meta-api-description">
How to customize crosshair in Kendo UI sparkline category axis? Configure and customize the category axis crosshair to enable a vertical or horizontal guide line that appears on hover or navigation within sparklines or charts, controlling its visibility, color, width, opacity, dash style, tracking behavior, and optional tooltip display to help inspect, highlight, align, and compare data points accurately across categories during interactive chart exploration or data analysis.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                color: "red",
                width: 2,
                opacity: 0.8,
                dashType: "dash"
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.color `String`

The color of the crosshair.


<div class="meta-api-description">
How to change the color of the crosshair line in a Kendo UI sparkline category axis? Adjust the color or hue of the category axis crosshair line or marker within sparklines to enhance visibility, contrast, or align with custom themes and styles, enabling developers to configure, customize, control, or set crosshair appearance for clearer data point identification, highlighting, or visual distinction along the horizontal axis in compact charts or mini graphs.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                color: "blue"
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.width `Number`

The width of the crosshair.


<div class="meta-api-description">
How to change the thickness of the crosshair in a Kendo UI sparkline? Adjust or configure the thickness, line width, or stroke size of the vertical or category axis crosshair indicator for enhanced data point tracking and hover highlight visibility in interactive sparklines or mini charts, enabling precise control over how bold or thin the crosshair line appears when users move the cursor, set, change, or style the crosshair thickness dynamically to improve clarity and emphasis on category axis values in visual data representation.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                width: 3
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.opacity `Number`

The opacity of the crosshair.


<div class="meta-api-description">
How can I adjust the visibility of the crosshair in a Kendo UI sparkline chart? Set or modify the transparency level, alpha, or opacity of the crosshair indicator on the horizontal or categorical axis in sparkline charts to control its visibility, prominence, brightness, dimming, or subtlety during hover interactions, mouseovers, or value inspection, enabling fine adjustment of visual emphasis, contrast, focus, clarity, or highlight for better data analysis and UI customization.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                opacity: 0.5
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.dashType `Number`

The dash type of the crosshair.


<div class="meta-api-description">
How do I customize the appearance of the crosshair line on a category axis in a Kendo UI sparkline? Configure and customize the style and pattern of the category axis crosshair line in sparklines by setting or controlling its stroke appearance, including options for solid lines, dashed lines, dotted lines, and combinations like dash-dot. Adjust or enable different dash styles for the crosshair to improve visual clarity and highlight specific data points on the category axis. Change or set the line pattern to solid, dash, dot, dash-dot, or other stroke types to tailor the crosshair’s look for better data presentation and focus when hovering or analyzing charts. Control, customize, or define the crosshair line style on category axes in sparklines to enhance readability and alignment with design preferences or interaction feedback.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                dashType: "dot"
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.visible `Boolean`*(default: false)*

The dash type of the crosshair.


<div class="meta-api-description">
How can I customize the appearance of the crosshair line in a Kendo UI sparkline's category axis? Configure the visibility and styling of the crosshair line on the category axis of sparklines, enabling control over the stroke pattern such as solid, dashed, or dotted lines to highlight categories during hover or interaction; set whether the crosshair is shown or hidden, customize its appearance for clarity in data points along the category axis, and adjust visual cues for precise category tracking in compact trend charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip `Object`

The crosshair tooltip configuration options.


<div class="meta-api-description">
How to customize the tooltip shown when hovering over the category axis in Kendo UI Sparkline? Control and customize the display, visibility, formatting, content, styling, layout, positioning, and appearance of tooltips shown on the category axis crosshair in sparklines, including enabling or disabling the tooltip, setting text templates or formats, managing hover tooltip behavior, adjusting tooltip styles and content dynamically, and configuring how axis category information is presented within the tooltip for better user interaction and data insight when users hover over or focus on the category axis in minimal chart visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    background: "lightblue",
                    color: "darkblue"
                }
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip.background `String`

The background color of the tooltip.


<div class="meta-api-description">
How to customize the background color of the tooltip in a Kendo UI sparkline category axis crosshair? Control and customize the background color of the tooltip displayed on the category axis crosshair in sparklines, enabling adjustments to tooltip appearance for better visibility, theme matching, or improved contrast using any CSS-compatible color format such as hex codes, RGB, RGBA, HSL, or predefined color names. Adjust, set, configure, or style the tooltip background to enhance the clarity and aesthetics of crosshair tooltips on sparkline charts, ensuring seamless integration with various UI themes and improving user interaction feedback through color customization options.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    background: "yellow"
                }
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip.border `Object`

The border configuration options.


<div class="meta-api-description">
How to customize the border of the crosshair tooltip in Kendo UI sparkline category axis? Customize and control the appearance of the border around the tooltip that appears on the category axis crosshair in sparklines, including setting the border color, thickness, style, dash pattern, and visual details for enhancing the tooltip’s outline. Adjust the outline or frame of the crosshair’s tooltip to match design preferences, configure border styling options like solid or dashed lines, width values, and color codes to achieve the desired visual emphasis or clarity for the category axis indicator in sparkline charts. Enable developers to set precise border visuals for the category axis hover tooltip to improve readability or match UI themes by defining border attributes in a detailed configuration object.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    border: {
                        color: "red",
                        width: 2
                    }
                }
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip.border.color `String`*(default: "black")*

The color of the border.


<div class="meta-api-description">
How do I change the color of the border around the crosshair tooltip in a Kendo UI sparkline? Adjust or customize the color of the border surrounding the tooltip that appears when hovering over the category axis crosshair in sparklines, enabling control over the tooltip’s outline using any standard CSS color formats such as hex codes, RGB, RGBA, or named colors. This allows developers to style, set, configure, or change the crosshair tooltip border color for better visual clarity, thematic consistency, or enhanced user interface design in inline charts and compact data visualizations involving category axes.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    border: {
                        color: "green"
                    }
                }
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip.border.width `Number`*(default: 0)*

The width of the border.


<div class="meta-api-description">
How do I set the border width of the crosshair tooltip on a category axis in a Kendo UI sparkline? Adjust the thickness, size, or pixel width of the border outlining the crosshair tooltip on the category axis in sparklines; customize, configure, or set the visual weight, border lines, or edge thickness of the tooltip frame that appears over the category axis crosshair for clearer focus, enhanced visibility, or refined styling in charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    border: {
                        width: 3
                    }
                }
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip.color `String`

The text color of the tooltip.


<div class="meta-api-description">
How do I change the color of the crosshair tooltip on a sparkline chart's category axis? Adjust or set the text color of the crosshair tooltip on a chart’s category axis to enhance readability, improve visual contrast, customize branding colors, or fine-tune the tooltip appearance when hovering over category-axis labels in sparkline charts or similar data visualizations. This feature helps control and configure the tooltip text hue for category-axis crosshairs, enabling developers to style or match the tooltip text color to application themes or user interface designs when displaying contextual data values along the category axis in concise graphical lines or miniature charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    color: "white",
                    background: "black"
                }
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.


<div class="meta-api-description">
How do I change the font used in the crosshair tooltip on a Kendo UI Sparkline category axis? Customize and control the typography styling, font family, size, weight, style, and color of the text displayed within the crosshair tooltip on the sparkline category axis, enabling configuration of tooltip font appearance, text readability, and visual emphasis for the axis crosshair indicator in sparklines.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    font: "14px Arial"
                }
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.crosshair.tooltip.format `String`

The tooltip format.


<div class="meta-api-description">
How to customize the format of tooltip values in a Kendo UI sparkline's category axis crosshair? Customize the display format of tooltip values on the category axis crosshair in sparklines by configuring numerical or date format strings, controlling how axis labels, timestamps, or data points appear when hovering, setting precision, date/time patterns, number formats, or currency styles to adjust tooltip presentation, enable clear and concise value representation, and tailor the crosshair label output for better readability and context during data inspection or interactive analysis within sparklines.
</div>

#### Example

    //sets format of the tooltip
    format: "C"

### categoryAxis.crosshair.tooltip.padding `Number|Object`

The padding of the tooltip.


<div class="meta-api-description">
How do I adjust the padding around the category axis crosshair tooltip in a Kendo UI sparkline? Adjust the inner margin or spacing around the tooltip displayed on the category axis crosshair in sparklines, controlling how much empty space surrounds the tooltip text and content, allowing customization of tooltip padding, internal gaps, or buffer area to enhance readability and layout during chart rendering. This setting enables developers to set or configure the tooltip's internal padding for axis crosshairs, fine-tune spacing, modify tooltip layout around category indicators, and control the empty space inside the tooltip shown on sparklines when hovering or interacting with the category axis crosshair.
</div>

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }

### categoryAxis.crosshair.tooltip.template `String|Function`

The tooltip template.
Template variables:

*  **value**- the point value (either a number or an object)


<div class="meta-api-description">
How do I customize the tooltip for crosshair events in Kendo UI Sparkline category axis? Customize or configure the content, format, and appearance of crosshair tooltips on the category axis in sparklines by defining or setting templates that control how tooltip information is rendered or displayed, enabling access to point values for dynamic or conditional formatting, allowing developers to tailor tooltip text, labels, or layouts based on data values, numbers, or objects, and effectively control or style tooltip content shown during hover or crosshair events on category axes.
</div>

#### Example

    $("#sparkline").kendoSparkline({
         type: "area",
         data: [200, 450, 300, 125],
         categoryAxis: {
             crosshair: {
                 tooltip: {
                     template: "|#= value #|"
                 }
             }
         }
    });

### categoryAxis.crosshair.tooltip.visible `Boolean`*(default: false)*

A value indicating if the tooltip should be displayed.


<div class="meta-api-description">
How do I control tooltip visibility in Kendo UI sparkline category axis crosshair? Control the visibility of tooltips that appear when hovering or interacting with the category axis crosshair on sparklines, including enabling or disabling tooltip pop-ups, showing or hiding hover labels, configuring whether crosshair labels or hints are displayed along the axis, managing crosshair interaction feedback, and setting the display of dynamic tooltips or info boxes that appear when the user moves over category axis points in minimal or compact charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true
                }
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.notes `Object`

The category axis notes configuration.


<div class="meta-api-description">
How to customize notes on category axis in Kendo UI Sparkline? Control and customize annotations, labels, markers, and notes on the category axis of sparklines to highlight or call out specific segments or data points. Configure visibility, text content, icons, placement, styling, and appearance of axis notes to emphasize particular categories or data categories on small inline charts. Set and adjust axis note labels, icons, positions, formatting, and display options to enhance data readability and provide contextual insights along the sparkline’s category axis. Enable or disable notes, modify text and icon styles, and position annotations accurately to create clear, focused categorical highlights in micro-chart visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            notes: {
                position: "top",
                icon: {
                    background: "red",
                    size: 10
                },
                label: {
                    text: "Important note"
                },
                data: [{
                    value: "Q2",
                    text: "Peak quarter"
                }]
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.notes.position `String`

The position of the category axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.


<div class="meta-api-description">
How to position notes in a Kendo UI sparkline chart category axis? Control the placement of note markers and labels along the category axis in a sparkline chart, enabling customization to position annotations or comments above, below, to the left, or to the right of the axis line, which helps in adjusting the visual layout by setting note indicators on different sides of the category scale, allowing developers to configure, align, or shift axis-related notes or markers to top, bottom, left, or right locations for better clarity, emphasis, or design preferences in compact inline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            notes: {
                position: "bottom",
                data: [{
                    value: "Q2",
                    text: "Bottom note"
                }]
            },
            categories: ["Q1", "Q2", "Q3", "Q4"]
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### categoryAxis.notes.icon `Object`

The icon of the notes.


<div class="meta-api-description">
How to customize the icon for notes on the category axis in a Kendo UI sparkline chart? Configure and customize the visual marker or symbol displayed for annotations and notes on the category axis of a sparkline chart, enabling the setting of icon names, CSS classes, image URLs, or other icon formats to control how note indicators appear along the horizontal axis. This property supports use cases such as changing annotation icons, styling axis note visuals, setting custom markers for category labels, enabling personalized symbols for axis notes, and adjusting the note icon appearance to improve chart readability or match design themes. It covers scenarios involving icon customization for data point highlights, axis comments, category axis note decoration, and user-defined note iconography in sparkline visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q2",
                    text: "Q2 Note"
                }],
                icon: {
                    background: "red",
                    type: "circle",
                    size: 15
                }
            }
        }
    });
    </script>

### categoryAxis.notes.icon.background `String`

The background color of the notes icon.


<div class="meta-api-description">
How do I change the color of notes in my sparkline category axis? Customize and control the background color of annotation icons along the category axis in sparklines, enabling developers to set, configure, or modify note icon backgrounds using any valid CSS color format such as hex codes, RGB, RGBA, HSL, HSLA, or named colors, to visually distinguish or highlight annotations, adjust visual styling during initialization or runtime, and tailor the appearance of data point notes for clearer data representation, emphasis, or branding in charting and visualization contexts.
</div>

#### Example - set the category axis notes icon background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          icon: {
            background: "red"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.icon.border `Object`

The border of the icon.


<div class="meta-api-description">
How to customize the border of category axis note icons in a Kendo UI sparkline? Set and customize the border appearance around category axis note icons in sparklines, including options to adjust the outline color, thickness, dash patterns, and stylize the edge of the note markers. Control the stroke settings to highlight, differentiate, or emphasize category axis annotations with configurable border styles for improved visualization and clarity of note icons on sparkline charts. Enable precise border customization to enhance the display of category axis notes by controlling outline aesthetics such as solid or dashed lines, varying widths, and color adjustments.
</div>

#### Example - set the category axis notes icon border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.icon.border.color `String`

The border color of the icon.


<div class="meta-api-description">
How do I set the border color of note icons on a category axis in Kendo UI sparkline? Control and customize the outline color, stroke color, or border color of icons displayed as notes on the category axis of sparklines by setting CSS color values such as hex codes, RGB, RGBA, or named colors; configure the appearance, adjust the note icon's edge color, modify the highlight or boundary color for clearer visualization, and enable precise styling of category axis annotations and markers on sparkline charts.
</div>

#### Example - set the category axis notes icon border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.icon.border.width `Number`

The border width of the icon.


<div class="meta-api-description">
How do I adjust the border width of note icons in a Kendo UI sparkline category axis? Adjust the thickness, size, or width of the icon border around notes on the category axis in sparklines, enabling customization of the outline or stroke weight of note indicators to enhance visibility, styling, or emphasis on the category axis notes' icons in small chart components.
</div>

#### Example - set the category axis notes icon border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.icon.size `Number`

The size of the icon.


<div class="meta-api-description">
How do I adjust the size of category axis note icons in a Kendo UI Sparkline? Adjust or control the dimensions, scale, or visual size of the category axis note icons on sparklines to increase or decrease emphasis, customize icon visibility and prominence, set icon pixel height or width for notes along the category axis, configure icon scaling or resizing for clarity or subtlety in data visualization, enable or change icon proportions for annotations on sparklines, modify the visual footprint of note markers to fit design needs, and control how large or small note icons appear to improve readability or aesthetics in Sparkline charts.
</div>

#### Example - set the category axis notes icon size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          icon: {
            size: 30
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.icon.type `String` *(default: "circle")*

The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.


<div class="meta-api-description">
How do I change the shape of notes on my Kendo UI sparkline category axis? Configure or customize the marker shape for notes displayed on the category axis in small inline charts by selecting or setting the icon style such as circular, square, or triangular shapes; control the visual representation, marker design, or note indicators on axis categories using different icons to highlight data points or annotations, enabling tailored axis note symbols for enhanced chart readability and visual distinction.
</div>

#### Example - set the category axis notes icon shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          icon: {
            shape: "triangle"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.icon.visible `Boolean` *(default: "true")*

The icon visibility.


<div class="meta-api-description">
How to show/hide note icons on category axis in Kendo UI Sparkline? Toggle the visibility of note icons on the category axis in sparklines by enabling or disabling the display of small markers or annotations along the axis, allowing you to show, hide, or configure indicators that highlight specific data points, events, or notes on the categorical timeline or axis labels for clearer visualization and contextual insights.
</div>

#### Example - set the category axis notes icon visibility

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          icon: {
            visible: false
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label `Object`

The label of the notes.


<div class="meta-api-description">
How do I customize category axis notes labels in Kendo UI Sparkline? Set, customize, or control the displayed text for labels on category axis notes in sparklines, including configuring annotated values, modifying note annotations, editing note label content, and adjusting the text that appears for axis notes or markers on the category axis; supports changing, updating, or specifying the note labels shown alongside category axis points in small trend charts or embedded visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q2",
                    text: "Q2 Label Note"
                }],
                label: {
                    background: "yellow",
                    color: "black",
                    visible: true
                }
            }
        }
    });
    </script>

### categoryAxis.notes.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
How do I change the background color of note labels on a sparkline category axis? Control and customize the background color behind note labels on category axes within sparklines, enabling developers to highlight, emphasize, or differentiate category axis annotations using any valid CSS color format such as hex codes, RGB, or named colors. Adjust styling, set label backgrounds for contrast, modify note marker appearance, and enhance readability or visual distinction for category axis notes in minimal inline data charts or sparkline visualizations through flexible color configuration.
</div>

#### Example - set the category axis label background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            background: "red"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.border `Object`

The border of the label.


<div class="meta-api-description">
How to customize the border of note labels on a sparkline's category axis? Customize and control the outline, edge styling, and border appearance of note labels along the category axis in sparklines, enabling you to set, style, or configure label borders for improved visual distinction, label emphasis, or enhanced readability; ideal for adjusting note label frames, outlines, or edges on category axes, including configuring border width, color, and style for category axis note annotations within sparkline charts.
</div>

#### Example - set the category axis label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            border: {
              color: "green",
              dashType: "dashDot",
              width: 1
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
How do I change the color of note labels on a sparkline category axis? Set or configure the border color of note labels on the category axis in sparklines, enabling customization of label outlines with any valid CSS color format such as hex, RGB, or named colors, useful for styling, highlighting, or differentiating axis notes in data visualizations and charts.
</div>

#### Example - set the category axis label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            border: {
              color: "green"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line


<div class="meta-api-description">
How to customize dash patterns for category axis note labels in a Kendo UI Sparkline chart? Customize and configure the style of outline strokes around category axis note labels in Sparkline charts by setting different dash patterns, including solid lines, dotted lines, dashed lines, combinations like dash-dot, long dash, long dash with dots, or long dash with double dots, enabling precise control over border appearance for annotations on category axes, useful for highlighting, styling, or differentiating note label edges in data visualizations and sparkline components.
</div>

#### Example - set the category axis label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            border: {
              dashType: "dashDot",
              width: 1
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.


<div class="meta-api-description">
How can I set the width of the border around category axis notes in a Kendo UI sparkline? Control and customize the thickness, size, or pixel width of the outline or border around annotation labels on the horizontal or category axis in sparklines, enabling setting, adjusting, or configuring label borders to enhance visibility, styling, or emphasis of notes on category axes with options to enable or disable border rendering by specifying numeric pixel values for the label’s edge thickness.
</div>

#### Example - set the category axis label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            border: {
              width: 1
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.color `String`

The text color of the label. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
How to change color of category axis notes in Kendo UI sparkline? Customize the text color of labels on category axis annotations, notes, or markers in sparklines by configuring or setting the color using any CSS-compatible format such as hex codes, RGB values, named colors, or color variables. Control, change, or style the note label font color on the axis to improve readability, highlight data points, or match theming preferences, allowing developers to define or override default label colors for category axis notes, markers, or annotations in lightweight charts and inline data visualizations.
</div>

#### Example - set the category axis label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            color: "#aa00bb"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the label.


<div class="meta-api-description">
How do I customize the font of note labels on a sparkline's category axis? Adjust the typography, font family, size, weight, style, and appearance of note labels on the category axis in sparklines, enabling customization of label fonts for better readability, styling, or branding on small inline charts. Control and configure text formatting, font customization, and label design for axis notes to tailor the visual presentation of category axis annotations in sparkline data visualizations.
</div>

#### Example - set the chart series label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            font: "20px sans-serif"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value


<div class="meta-api-description">
How do I customize category axis note labels in a Kendo UI Sparkline? Customize, format, bind, or transform data labels on chart axes and category notes with flexible templating for category axis note labels, enabling dynamic rendering of category values, tailored text outputs, and personalized visual annotations in sparklines or small charts, supporting customized label templates, display formatting, value insertion, and label transformation for enhanced data visualization and interactive note styling.
</div>

#### Example - set the category axis notes label template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            template: "Year: #: value #"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category notes label. By default the category notes label are visible.


<div class="meta-api-description">
How do I show/hide category axis note labels in a Kendo UI sparkline? Control the visibility of category axis note labels on sparklines by enabling or disabling the display of text annotations tied to specific categories, allowing you to show, hide, toggle, or configure whether descriptive labels for category markers or notes appear on the chart’s category axis, useful for highlighting, annotating, or emphasizing certain data points with boolean options to set label visibility on or off.
</div>

#### Example - hide the category axis notes label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            visible: false
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.


<div class="meta-api-description">
How can I rotate note labels on a sparkline's category axis? Adjust or set the angle, tilt, or orientation of note labels on the horizontal axis in sparklines, enabling rotation of category axis annotations to improve label readability, alignment, or visual layout control by specifying numeric rotation degrees, configuring how text labels on category axis notes appear angled or straight for better presentation or space management when rendering sparkline charts.
</div>

#### Example - rotate the category axis notes label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            rotation: 90
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.format `String` *(default: "{0}")*

The format used to display the notes label. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.


<div class="meta-api-description">
How to customize label format for category axis notes in Kendo UI Sparkline? Customize and control the display format of labels attached to annotations or notes on the category axis within sparklines by specifying patterns that determine how category values appear, using placeholder-driven string templates compatible with formatting syntax like kendo.format; this enables setting dynamic text representations, adjusting numeric, date, or string presentation styles, and configuring label output to match various localization, styling, or data display requirements on category axis notes.
</div>

#### Example - set the category axis notes label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          label: {
            format: "Category slot: {0}"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.label.position `String` *(default: "inside")*

The position of the labels.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.


<div class="meta-api-description">
How do I position annotation labels on the horizontal axis in a Kendo UI sparkline chart? Adjust the placement and alignment of annotation labels near data points on the horizontal axis in sparkline charts, allowing control over whether note text appears inside, overlapping, or outside the marker icon for clearer visualization, label positioning, layout customization, text placement, annotation styling, configuring note label location relative to axis marks, setting labels inside or outside note indicators, and fine-tuning where descriptive labels sit in relation to sparkline category axis markers.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q2",
                    text: "Q2 Note"
                }],
                label: {
                    position: "outside"
                }
            }
        }
    });
    </script>

### categoryAxis.notes.line `Object`

The line of the notes.


<div class="meta-api-description">
How do I customize the appearance of annotation lines on a sparkline's category axis? Configure and customize the appearance of the annotation lines on the category axis of sparklines, including options to set line color, thickness, dash patterns, and toggling visibility to highlight or emphasize specific data points or notes within small inline charts. Adjust the styling of axis note lines to improve chart readability, enable or disable these visual cues, and fine-tune line properties for annotations on categorical axes in sparkline components during setup or runtime control.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q2",
                    text: "Q2 Note"
                }],
                line: {
                    width: 3,
                    color: "blue",
                    length: 20
                }
            }
        }
    });
    </script>

### categoryAxis.notes.line.width `Number`

The line width of the notes.


<div class="meta-api-description">
How do I adjust the thickness of connector lines in Kendo UI sparkline category axis notes? Adjust the thickness, stroke width, or line weight of connector lines linking annotation notes or markers to the category axis in sparklines, enabling precise control over the visual prominence and styling of note indicators, lines, or callouts on the sparkline’s horizontal axis by specifying pixel values or numeric measurements for note line width during chart setup or configuration.
</div>

#### Example - set the category axis notes line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          line: {
            width: 4
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.line.color `String`

The line color of the notes.


<div class="meta-api-description">
How do I change the color of notes lines in a sparkline category axis? Customize the color of lines connecting or highlighting annotations, markers, or notes along a chart’s category axis in sparklines, enabling control over the stroke hue for category axis notes, axis annotation line colors, and stylizing or configuring the visual appearance of note lines on minimal, inline charts. Adjust the line color for category axis notes to emphasize or differentiate axis annotations, set highlight colors for note indicators, or style the connector lines for labeled points within compact sparkline visualizations.
</div>

#### Example - set the category axis notes color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          line: {
            color: "#aa00bb"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.line.length `Number`

The line length of the notes.


<div class="meta-api-description">
How do I adjust the length of connector lines in sparkline category axis notes? Adjust or configure the length, size, distance, or extension of connector lines linking category axis labels or markers to their notes or annotations in sparklines, controlling how far the note leader lines stretch from the axis for improved clarity, spacing, or readability; customize, set, or modify the leader line length or note line distance on category axes to enhance visual alignment, annotation positioning, or note visibility when displaying compact data trends on sparklines.
</div>

#### Example - set the category axis notes color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          line: {
            length: 20
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### categoryAxis.notes.data `Array`

The items of the notes.


<div class="meta-api-description">
How do I add custom notes to my sparkline category axis in Kendo UI for jQuery? Configure and customize annotations, markers, or notes on the category axis of a sparkline chart by providing an array of note objects that specify details such as text labels, icons, positions, and styles. Enable adding, setting, or binding custom notes, comments, or annotations to specific categories or points along the axis to enhance clarity, highlight data, or provide contextual information. Control how category axis notes display, position, and appear in a sparkline visualization through structured data inputs that define individual note properties, suitable for initialization, updates, or dynamic rendering.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q1",
                    text: "First Quarter"
                }, {
                    value: "Q3", 
                    text: "Third Quarter"
                }]
            }
        }
    });
    </script>

### categoryAxis.notes.data.value `Object`

The value of the note.


<div class="meta-api-description">
How do I specify which data value to attach notes or annotations to in a Kendo UI sparkline category axis? Configure or set the specific data value or category identifier used to pinpoint and attach annotations, labels, or notes on the category axis of a sparkline chart, enabling you to control where these highlight markers appear based on exact data points, categories, or values along the axis. This includes binding notes to particular categories, data entries, or positions to customize visualization highlights, emphasize specific points, or annotate certain segments within the category axis for clearer data storytelling or detailed insights in sparkline visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q2",
                    text: "Second Quarter Note"
                }]
            }
        }
    });
    </script>

### categoryAxis.notes.data.position `String`

The position of the category axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.


<div class="meta-api-description">
How to position notes on category axis in Kendo UI sparkline? Adjusting the placement of axis annotations or notes relative to category labels or data points enables precise control over positioning options such as top, bottom, left, or right alignment, helping to customize how annotations appear on chart axes for enhanced readability, clarity, or visual emphasis in sparklines, allowing developers to configure note placement, align comments or markers near axis categories, and control the spatial orientation of labels and data indicators on graphs.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q2",
                    text: "Bottom Note",
                    position: "bottom"
                }]
            }
        }
    });
    </script>

### categoryAxis.notes.data.icon `Object`

The icon of the note.


<div class="meta-api-description">
How do I customize the visual icons for data annotations on a category axis in Kendo UI Sparkline? Customize and control the visual icons or glyphs used as markers for data annotations on the category axis in sparklines, including setting specific symbols or shapes to highlight notes attached to category data points. Enable configuration of custom symbols, change annotation markers, set unique icons for data point notes, and adjust visual emphasis indicators on category axis labels or ticks. This covers use cases for modifying annotation visuals, personalizing chart notes, embedding distinct icons for category axis data annotations, and improving chart readability through tailored category axis data note markers.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q2",
                    text: "Custom Icon Note",
                    icon: {
                        background: "green",
                        type: "triangle",
                        size: 20
                    }
                }]
            }
        }
    });
    </script>

### categoryAxis.notes.data.icon.background `String`

The background color of the note icon.


<div class="meta-api-description">
How do I change the background color of note icons on a Kendo UI sparkline's category axis? Adjust and customize the fill color behind data note icons on the category axis in sparklines, specifying any CSS-compatible color format such as hex codes, RGB, RGBA, or named colors to highlight or visually style note markers associated with category axis labels, enabling control over icon backgrounds for enhanced data annotation visibility and presentation in sparkline charts.
</div>

#### Example - set the category axis note icon background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              background: "red"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.icon.border `Object`

The border of the icon.


<div class="meta-api-description">
How do I change the border style of note icons in a Kendo UI sparkline category axis? Control and customize the outline, edge styling, or border appearance of annotation or note icons on a chart's category axis, including setting the color, thickness, dash patterns, or other border attributes for data point markers or annotation symbols; configure the shape outline for visual emphasis or differentiation of notes within sparklines, adjusting parameters like stroke color, line width, and dash style to enhance icon visibility and distinctiveness on the axis during chart setup.
</div>

#### Example - set the category axis note icon border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              border: {
                width: 2,
                color: "red"
              }
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.icon.border.color `String`

The border color of the icon.


<div class="meta-api-description">
How to customize the color of note icon borders in a Kendo UI sparkline category axis? Set or customize the outline color of icons used for data notes on the horizontal or category axis in sparklines, enabling emphasis or subtle distinction of note markers by adjusting note icon borders, outlines, or edge colors. Control, configure, or style the border hue of note indicators along category axes to highlight, differentiate, or soften the appearance of annotations or data point notes within sparkline charts, supporting use cases where visual emphasis on note icons is required through border color adjustments.
</div>

#### Example - set the category axis note icon border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              border: {
                width: 2,
                color: "red"
              }
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.icon.border.width `Number`

The border width of the icon.


<div class="meta-api-description">
How do I adjust the border width of icons in sparkline category axis notes? Adjust or set the thickness, size, or width of the border outlining the icons displayed on category axis note data within sparklines, enabling control over icon border appearance, edge thickness, border line size, or stroke width for visual customization of axis annotations, notes, or data markers in sparkline charts.
</div>

#### Example - set the category axis note icon border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              border: {
                width: 2,
                color: "red"
              }
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.icon.size `Number`

The size of the icon.


<div class="meta-api-description">
How do I set the size of data note icons in a Kendo UI sparkline category axis? Adjust and control the dimensions, scale, and size of data note icons on the category axis in sparklines, enabling customization of icon appearance, scaling up or down their visual footprint, configuring icon pixel size, altering how large or small the icons render within the chart axis, setting icon shape sizing parameters, managing icon display measurements, tuning icon dimensions for clarity or emphasis, and tailoring icon visual prominence on the category axis for better data highlight or annotation purposes.
</div>

#### Example - set the category axis note icon size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              size: 30
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.icon.type `String` *(default: "circle")*

The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.


<div class="meta-api-description">
How do I customize the icon type for category axis notes in a Kendo UI sparkline? Configure and customize the shape or style of data point markers for category axis notes in sparklines, including options to set marker icons as circles, squares, triangles, or other geometric shapes to visually differentiate note points on a chart; control or change the marker appearance for better data visualization, highlight specific categories with distinct symbols, adjust marker geometry for category axis annotations, choose between various marker types for clarity in data representation, and tailor note indicators on the category axis to improve chart readability and user interaction.
</div>

#### Example - set the category axis note icon shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              shape: "triangle"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.icon.visible `Boolean` *(default: "true")*

The icon visibility.


<div class="meta-api-description">
How do I show or hide icons for notes on a sparkline's category axis? Control the visibility and display of icons representing note data points on the category axis of sparklines, enabling or disabling the rendering of these small graphical indicators to highlight specific category-related annotations. Adjust, toggle, configure, or set boolean flags to show or hide these visual markers on the chart’s category axis notes, useful for emphasizing or decluttering annotation icons linked to data categories within sparkline charts.
</div>

#### Example - set the category axis note icon visibility

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              visible: false
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label `Object`

The label of the note.


<div class="meta-api-description">
How to customize labels for notes on category axis markers in a sparkline using Kendo UI? Control and customize the visible text labels for notes or annotations tied to category axis data points in sparklines, enabling you to set, edit, or configure descriptive, short text tags that highlight or explain specific category-axis items, data points, or values. This includes labeling notes on category axis markers, attaching comments, captions, or highlights to category axis data elements, and managing how textual annotations appear on the category axis in mini charts or sparklines for better context, explanation, or emphasis.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q2",
                    text: "Second Quarter",
                    label: {
                        background: "yellow",
                        color: "black",
                        template: "Note: #: value #"
                    }
                }]
            }
        }
    });
    </script>

### categoryAxis.notes.data.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
How to change the background color of category axis note labels in a Kendo UI Sparkline? Customize and control the background color behind category axis note labels in sparklines by setting any valid CSS color value such as hex codes, RGB, or named colors; configure label backdrops to enhance readability and styling of note data on category axes, adjust label backgrounds for better contrast or branding, set color fills behind note text on category axis notes, and manage visual appearance of annotations or data highlights on sparklines using customizable background color settings.
</div>

#### Example - set the category axis note label background

    <div id="chart"></div>
    <script>
      $("#chart").kendoChart({
        series: [{
          data: [1, 2, 3]
        }],
        categoryAxis: {
          notesdata: {
            data: [{
              value: 1,
              label: {
                background: "red"
              }
            }]
          }
        }
      });
    </script>

### categoryAxis.notes.data.label.border `Object`

The border of the label.


<div class="meta-api-description">
How do I customize the border around data labels on a Sparkline's category axis? Customize the outline or frame around data labels on the category axis of a Sparkline, including adjusting border color, thickness, dash patterns, style, and appearance to highlight or differentiate note labels, define border visibility and emphasis, control label framing for data points on the axis, set or configure stroke and border properties for category axis note labels, and manage how borders appear around annotation text to improve clarity and visual separation in charts.
</div>

#### Example - set the category axis note label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                color: "green",
                dashType: "dashDot",
                width: 1
              }
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
How to change the color of category axis notes labels in Kendo UI Sparkline? Adjust or customize the outline color of data point labels within category axis annotations or notes on sparklines, specifying border hues using CSS-compatible color formats such as hex codes, RGB values, or named colors; control label visuals for highlighted data markers, configure the stroke or edge color of annotation text backgrounds on category axes, and enable styling of note label borders to enhance clarity, emphasis, or design consistency in sparkline charts.
</div>

#### Example - set the category axis note label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                color: "green"
              }
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line


<div class="meta-api-description">
How do I customize the border style of category axis notes in a Kendo UI sparkline chart? Adjust, customize, or set the stroke style pattern for borders around data labels on category axis notes in sparkline charts, including options to enable solid, dotted, dashed, dash-dot, long dash, and complex repeating dash-dot-dot border lines; control the label outline appearance by configuring border dash styles to influence visual emphasis, outline patterns, or stylistic presentation of annotation labels in chart axes, catering to needs for solid continuous lines or various segmented dash motifs for highlighting or differentiating note labels within sparklines.
</div>

#### Example - set the category axis note label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                dashType: "dashDot",
                width: 1
              }
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.


<div class="meta-api-description">
How do I adjust the border width around data labels on a sparkline's category axis? Adjust the thickness or pixel width of borders around data labels on the category axis in sparklines, enabling control over how prominent or subtle label outlines appear, including settings to enable, disable, increase, or decrease the border line width to customize label visibility and styling on the axis.
</div>

#### Example - set the category axis note label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                width: 1
              }
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.color `String`

The text color of the note label. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
How do I change the color of note labels in a Kendo UI sparkline's category axis? Set or customize the text color for labels tied to note data points along a sparkline's category axis using any valid CSS color format such as hex, rgb, rgba, hsl, or named colors; control, configure, or style note label font hues to enhance visibility, match themes, or adjust appearance for category axis annotations, ensuring precise color adjustments for note markers, data label highlights, or axis note text in sparklines.
</div>

#### Example - set the category axis note label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              color: "#aa00bb"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the note label.


<div class="meta-api-description">
How do I customize the font of data labels on category axis notes in Kendo UI Sparkline? Control and customize the typography, including font family, size, weight, and style, of data labels on category axis notes in sparklines to enhance readability and visual appearance. Adjust, configure, or enable specific font settings for note label text to match design requirements, improve clarity, or align with branding guidelines for chart annotations along the category axis. Fine-tune text styling for data note labels on sparklines by setting font properties that determine their size, boldness, italicization, and overall font appearance during initialization or dynamic updates.
</div>

#### Example - set the category axis note label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              font: "20px sans-serif"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the category value


<div class="meta-api-description">
How do I customize note labels in a sparkline's category axis using the template property? Create and customize labels for note data on the category axis in sparklines by configuring templates that control how category values are displayed, allowing developers to set dynamic, formatted, or personalized text for axis notes, handle rendering of specific data points, and integrate tailored labels for improved visualization and clarity on the category dimension within sparkline charts.
</div>

#### Example - set the category axis note label template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              template: "Year: #: value #"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the category notes label. By default the category notes label are visible.


<div class="meta-api-description">
How to hide data note labels on category axis in Kendo UI sparkline chart? Control the visibility of labels on category axis data notes within sparklines, enabling developers to show or hide annotations for specific data points along the category axis, toggle display of category note labels for clearer or more concise visualization, configure the presence of descriptive tags on category axis markers, set label visibility to enhance readability or reduce clutter in sparkline charts, and manage annotation label display dynamically to customize data point highlighting on the category axis.
</div>

#### Example - hide the category axis note label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              visible: false
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.


<div class="meta-api-description">
How do I rotate data note labels on the category axis in a Kendo UI sparkline? Control and customize the angle of data note labels on the category axis in sparklines by setting the rotation degree to improve label readability and optimize layout spacing. Adjust, configure, or enable label rotation with numerical values to tilt, slant, or orient data labels for better visualization clarity along the categorical axis. Manage the orientation of category axis note labels to prevent overlap, enhance presentation, and tailor label display for compact or crowded sparkline charts. Set precise rotation angles to control label alignment and positioning in sparkline category axes for clear data annotation and improved axis readability.
</div>

#### Example - rotate the category axis note label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              rotation: 90
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.format `String` *(default: "{0}")*

The format used to display the note label. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the category value.


<div class="meta-api-description">
How to format category axis note labels in Kendo UI Sparkline? Control and customize the display of category axis note labels on sparklines by specifying format strings that define how category values appear, enabling patterns for representing category data with placeholders, configuring label formats for clearer or localized numeric, date, or text rendering, setting up custom string templates for category annotations, adjusting how category values are shown on sparkline notes through formatting tokens, enabling precise label presentation, formatting category axis note text according to developer-defined templates, and tailoring label content to match varied display requirements or data types on the sparkline category axis.
</div>

#### Example - set the category axis note label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              format: "Category slot: {0}"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.text `String`

The label note text.


<div class="meta-api-description">
How to customize label text for annotations in category axis of Kendo UI sparkline? Set, customize, or override the label text for annotations on data notes along the category axis in sparklines, enabling control over the displayed note content or text annotations tied to specific points, categories, or axis values to enhance data visualization clarity, modify note labels, and tailor the information shown on category axis markers or data highlights.
</div>

#### Example - set the category axis label note text

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              text: "A"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.label.position `String` *(default: "inside")*

The position of the category axis note label.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.


<div class="meta-api-description">
How do I position data note labels in relation to icons on a Kendo UI sparkline category axis? Set or configure the placement of data note labels on the category axis in a sparkline chart, enabling adjustment of label positions relative to their icons for better visualization and readability; users can control whether labels appear inside or outside the icons, customize label alignment on the axis, or tweak note label locations to enhance layout, clarity, or presentation of category axis annotations in minimalist charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q2",
                    text: "Outside Label",
                    label: {
                        position: "outside"
                    }
                }]
            }
        }
    });
    </script>

### categoryAxis.notes.data.line `Object`

The line of the note.


<div class="meta-api-description">
How can I customize the appearance of note connectors in a Kendo UI sparkline? Customize the appearance of connectors linking data notes to points along the category axis in sparklines by setting properties like color, thickness, dash pattern, and visibility to control line style for enhanced chart clarity and visual differentiation; configure and style note connector lines to highlight data annotations, adjust line design, enable or disable the connector lines, and tailor the look of notes attached to category axis values for improved data visualization and presentation.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5, 4, 3, 2],
        categoryAxis: {
            notes: {
                data: [{
                    value: "Q2",
                    text: "Custom Line Note",
                    line: {
                        width: 5,
                        color: "red",
                        length: 30
                    }
                }]
            }
        }
    });
    </script>

### categoryAxis.notes.data.line.width `Number`

The line width of the note.


<div class="meta-api-description">
How do I adjust the line width of data note connectors in a sparkline's category axis? Adjust or set the thickness, stroke width, or line weight of connector lines linking data notes or annotations on a chart’s category axis, enabling customization of visual emphasis, contrast, or styling for note lines in sparklines and data visualizations. Control or configure pixel-based line dimensions to highlight, enhance, or fine-tune the appearance of annotation lines connecting data points, ensuring clarity and tailored visual impact in axis note connectors.
</div>

#### Example - set the category axis note line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            line: {
              width: 4
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.line.color `String`

The line color of the note.


<div class="meta-api-description">
How to customize the color of note lines in category axis data notes for a sparkline? Adjust or specify the stroke color of lines connecting category axis data notes in sparklines, controlling the appearance and visibility of annotations on the category axis by setting or customizing the note line color using any CSS-compatible color format such as hex codes, RGB, RGBA, or named colors; useful for highlighting, differentiating, or theming note lines to improve chart readability, visual emphasis, or style consistency within mini charts or inline data visualizations.
</div>

#### Example - set the category axis note color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            line: {
              color: "#aa00bb"
            }
          }]
        }
      }
    });
    </script>

### categoryAxis.notes.data.line.length `Number`

The line length of the note.


<div class="meta-api-description">
How do I adjust the length of connector lines in sparklines? Adjust and control the length or size of connector lines linking data notes or annotations to category axis markers in sparklines, specifying how far these lines extend from note points, allowing customization of note line distance, connector line length, annotation line sizing, and visual spacing of data labels or markers on category axes for clear, readable charts.
</div>

#### Example - set the category axis note color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      categoryAxis: {
        notes: {
          data: [{
            value: 1,
            line: {
              length: 20
            }
          }]
        }
      }
    });
    </script>

### chartArea `Object`

The chart area configuration options.
This is the entire visible area of the chart.


<div class="meta-api-description">
How do I adjust the visible plotting area of a Sparkline chart using the Kendo UI for jQuery API? Adjust the visible plotting area, layout, and drawable region of the Sparkline chart by configuring background colors, margins, borders, width, height, spacing, and overall appearance. Control the chart’s canvas size and layout parameters to customize the drawing area, set padding or borders around the plot, manage the chart's dimensions, and tailor how the chart renders its visual space for optimized display and spacing in dashboards or visualizations. Customize the plot area settings to influence layout, rendering boundaries, visual spacing, and background styling within the sparkline visualization context.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        chartArea: {
            background: "#f0f0f0",
            opacity: 0.8,
            border: {
                color: "#ff0000",
                width: 2
            }
        }
    });
    </script>

### chartArea.background `String`*(default: "white")*

The background color of the chart area.


<div class="meta-api-description">
How to set the background color of a Sparkline chart in Kendo UI for jQuery? Control and customize the fill color behind the Sparkline chart's data area by setting the background to any valid CSS color format such as hex codes, RGB, RGBA, named colors, or transparent values. Adjust, configure, or enable the visual backdrop of the Sparkline chart area to match themes, improve readability, or highlight data presentation through flexible color settings applied during setup or runtime. This functionality supports defining solid colors, semi-transparent hues, or fully transparent backgrounds to tailor the chart's appearance according to styling preferences, visual design requirements, and user interface consistency in data visualization applications.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        chartArea: {
            background: "#ffe0e0"
        }
    });
    </script>

### chartArea.opacity `Number`*(default: 1)*

The background opacity of the chart area.


<div class="meta-api-description">
How to adjust the transparency of the background in a Kendo UI sparkline chart? Adjust the background transparency or opacity level of the chart area in sparklines to control how much the chart area blends with underlying layers or page background, enabling developers to set or configure clear, semi-transparent, or fully opaque backgrounds for sparkline visualizations, customize appearance by controlling chartArea background visibility, fine-tune visual layering effects, or modify the transparency setting during initialization or runtime to enhance readability, contrast, or design integration within dashboards or reports.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        chartArea: {
            opacity: 0.5
        }
    });
    </script>

### chartArea.border `Object`

The border of the chart area.


<div class="meta-api-description">
How to customize the border of a Kendo UI sparkline chart area? Customize the outline of the chart background by setting border color, thickness, and dash patterns to frame or highlight the chart area visually; control the perimeter styling including solid or dashed lines and adjustable widths to enhance contrast or separate the chart region; configure the edge appearance for better visibility, emphasis, or design consistency in sparkline visualizations by managing the outer stroke style, color shading, and line format around the chart’s plotting zone.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        chartArea: {
            border: {
                color: "#00ff00",
                width: 3,
                dashType: "dash"
            }
        }
    });
    </script>

### chartArea.border.color `String`*(default: "black")*

The color of the border.


<div class="meta-api-description">
How do I change the border color of the chart area in a Kendo UI sparkline? Control and customize the outline color of the plot region in sparklines by specifying the border hue using any CSS-compatible color format such as named colors, hexadecimal codes, RGB, or RGBA values. Enable configuring the visual boundary or frame appearance around the chart area to enhance clarity or match design themes, allowing setting, adjusting, or styling the sparkline’s chart frame color for better presentation and user interface integration. Adjust the edge color of the plotting area border to emphasize or distinguish the chart segment in dashboards, reports, or minimal inline graphs using flexible color styling options.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        chartArea: {
            border: {
                color: "#0000ff"
            }
        }
    });
    </script>

### chartArea.border.dashType `String`*(default: "solid")*

The dash type of the border.


<div class="meta-api-description">
How do I customize the border style of a Sparkline chart area using Kendo UI for jQuery? Adjust, configure, or set the border style pattern of a chart area’s outline to solid, dashed, dotted, dash-dot, or other stroke effects, enabling customization of border appearance to highlight or delineate chart regions, control visual emphasis with varied line patterns, and tailor the border stroke formatting for sparklines or small inline charts in dashboards, reports, or data visualizations.
</div>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        chartArea: {
            border: {
                dashType: "dash"
            }
        }
    });
    </script>

### chartArea.border.width `Number`*(default: 0)*

The width of the border.


<div class="meta-api-description">
How do I adjust the width of the border in a Kendo UI Sparkline chart area? Adjust the thickness, size, or width of the border surrounding the Sparkline chart area by specifying a numeric value to control how bold, thin, or prominent the chart border appears. Enable customization of the chart area edge by setting or configuring border width to refine visual emphasis, outline clarity, or framing in sparklines, including options to increase, reduce, or precisely control the boundary thickness around the chart region for better style, highlight, or separation in data visualization.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        chartArea: {
            border: {
                width: 3
            }
        }
    });
    </script>

### chartArea.height `Number`*(default: 400)*

The height of the chart area.


<div class="meta-api-description">
How do I set the vertical height of a sparkline chart's plotting area in Kendo UI? Adjust or configure the vertical height of a chart's plotting area to control how tall the visualization appears within its container, enabling resizing for better alignment in different layouts, managing the space allocated for axes and data series, and optimizing the visual spacing and proportions of compact inline charts or sparklines.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        chartArea: {
            height: 300
        }
    });
    </script>

### chartArea.margin `Number|Object`*(default: 2)*

The margin of the chart area.


<div class="meta-api-description">
How do I adjust the whitespace around the chart plotting area in a Kendo UI Sparkline? Adjust the outer whitespace around the chart plotting area to control spacing between lines, markers, or labels and the edges, enabling customization of margins or padding around the visual region to prevent overlap and improve clarity. Configure the area surrounding the graphical elements to maintain consistent gaps, set edge buffers, manage inner spacing around the plotting canvas, and fine-tune the visual boundary to optimize readability and appearance during rendering or initialization. This setting helps to control or set the distance between the sparkline content and its container borders for better alignment, preventing clipping or crowding of chart components.
</div>

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 5px (by default)
    margin: { top: 1, left: 1 }

### chartArea.width `Number`*(default: 600)*

 The width of the chart area.


<div class="meta-api-description">
How do I adjust the width of a sparkline chart area in Kendo UI for jQuery? Set or adjust the horizontal size, width, or span of the chart area or plotting region in a sparkline visualization to control how much space the sparkline occupies horizontally, influencing layout, alignment, spacing, and rendering boundaries within the container or component; configure the horizontal drawing area dimensions to fit specific design constraints, responsive layouts, or custom UI requirements when displaying inline charts or data trends.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 4, 5],
        chartArea: {
            width: 500
        }
    });
    </script>

### data `Array`

The data for the default sparkline series.

Will be discarded if series are supplied.


<div class="meta-api-description">
How do I set data for a Kendo UI sparkline in jQuery? Set or bind the numerical values, data points, or collections that populate the default series in a sparkline or mini chart, enabling control over chart data input, feeding arrays, lists, or object data structures for rendering trends, small series, or inline visualizations; note that when explicit series data is configured separately, this underlying data array or collection is overridden and ignored.
</div>

#### Example

    $("#sparkline").kendoSparkline({
        data: [1, 2, 3, 5]
    });

    // Same as:
    $("#sparkline").kendoSparkline([1, 2, 3, 5]);

### dataSource `Object`

DataSource configuration or instance.


<div class="meta-api-description">
How to bind data to Kendo UI sparkline chart? Bind sparkline charts to local arrays, remote services, or database endpoints by configuring data sources, including options to set data transport methods, schema mappings, filtering, sorting, and real-time updates. Enable dynamic loading, refreshing, and synchronization of chart data using custom data providers or predefined data source instances, supporting both client-side and server-side data operations, change tracking, and integration with various backends or APIs for flexible data-driven visualizations.
</div>

#### Example

    $("#sparkline").kendoSparkline({
        dataSource: {
            transport: {
                 read: "spain-electricity.json"
            }
        },
        series: [{
            field: "value"
        }],
        categoryAxis: {
            field: "year"
        }
    });

    // Alternative configuration
    var dataSource = new kendo.data.DataSource({
        transport: {
             read: "spain-electricity.json"
        }
    });

    $("#sparkline").kendoSparkline({
        dataSource: dataSource,
        series: [{
            field: "value"
        }],
        categoryAxis: {
            field: "year"
        }
    });

### autoBind `Boolean`*(default: true)*

Indicates whether the chart will call read on the data source initially.


<div class="meta-api-description">
How does Kendo UI sparkline autoBind property work? Configure automatic data loading on initialization to control whether the sparkline fetches and renders data immediately or defers loading for manual or programmatic data binding, enabling options to enable or disable the initial data source read operation, manage lazy or explicit data fetch strategies, control when data is pulled from the source, and decide if the component auto-invokes data retrieval methods at startup or waits for explicit triggers to bind data.
</div>

#### Example
    $("#sparkline").kendoSparkline({
        dataSource: chartDataSource,
        autoBind: false
    });

    // ...
    chartDataSource.read();

### plotArea `Object`

The plot area configuration options. This is the area containing the plotted series.


<div class="meta-api-description">
How do I customize the area where data is plotted in a Kendo UI sparkline chart? Adjust, customize, or control the area in which data series are rendered within a sparkline chart, including setting the layout boundaries, managing spacing between plotted points, defining background colors or patterns, applying borders or outlines, and styling the container that frames the visual data representation for tailored display and improved clarity.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        plotArea: {
            background: "lightgray",
            opacity: 0.8,
            border: {
                color: "red",
                width: 2,
                dashType: "dash"
            },
            margin: 10
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### plotArea.background `String`*(default: "white")*

 The background color of the plot area.


<div class="meta-api-description">
How to set background color for sparkline plot area using CSS-compatible formats? Control and configure the background fill color of a sparkline's plot area using any CSS-compatible color format such as hex codes, RGB, RGBA, or named colors to customize appearance, enhance contrast, align with dark or light themes, or dynamically style data visualization backgrounds. Whether setting, adjusting, or theming the sparkline plot area's backdrop, this property enables precise color customization to integrate seamlessly within dashboards, reports, or interactive charts, supporting use cases for styling, theming, and visual clarity in minimalist inline graphs.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        plotArea: {
            background: "lightblue"
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### plotArea.opacity `Number`*(default: 1)*

 The background opacity of the plot area.


<div class="meta-api-description">
How do I set the background transparency for my sparkline's plot area? Adjust the background transparency or opacity level of the chart's plot area to control visual contrast, emphasis, and readability within sparklines or small inline charts, enabling customization of background fill visibility, intensity, and subtlety to highlight or mute the plot area behind data points, lines, or markers.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        plotArea: {
            background: "red",
            opacity: 0.5
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### plotArea.border `Object`

The border of the plot area.


<div class="meta-api-description">
How do I customize the border of a sparkline's plot area in Kendo UI for jQuery? Control and configure the outline surrounding the chart’s data display area by setting border color, thickness, dash patterns, or styles to highlight or distinguish the plotting region within sparklines, enabling customization of visual separation, emphasis, or framing of the graph area during initial setup or dynamic updates.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        plotArea: {
            border: {
                color: "blue",
                width: 3,
                dashType: "dot"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### plotArea.border.color `String`*(default: "black")*

 The color of the border.


<div class="meta-api-description">
How do I change the color of the border around a sparkline chart's plot area? Control or customize the outline color, stroke, or border shade of the sparkline chart’s plotting area by specifying colors using hex codes, CSS color names, or RGB values, enabling you to style or theme the plot boundary, adjust visual emphasis, set the frame color around the graph area, or modify the sparkline chart’s border appearance during initialization or dynamic updates.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        plotArea: {
            border: {
                color: "green",
                width: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### plotArea.border.dashType `String`*(default: "solid")*

 The dash type of the border.


<div class="meta-api-description">
How do I customize the plot area border in Kendo UI Sparkline to use a dashed style? Set or customize the border style of the plot area with various dash patterns like solid, dashed, dotted, or custom dash sequences to control the visual outline of the graph area. Adjust, configure, or enable different border line styles around the plot region using string identifiers that specify dash types, enabling fine-tuned styling of chart borders during setup or dynamically. Whether you want a continuous solid line, spaced dashes, or dot patterns outlining the visualization region, this controls how the plot area's edges appear with flexible stroke settings and border design options.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        plotArea: {
            border: {
                dashType: "longDash",
                width: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12]
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

### plotArea.border.width `Number`*(default: 0)*

 The width of the border.


<div class="meta-api-description">
How do I set the thickness of the border in a sparkline plot area using Kendo UI for jQuery? Adjust the thickness, width, or size of the border surrounding the plot area to control visual emphasis, customize outline clarity, enhance chart styling, or match design themes. Enable setting or configuring border thickness for sparkline charts to highlight edges, create distinct boundaries, emphasize plot regions, or fine-tune graphical presentation with precise control over outline weight. This includes options for making borders thicker or thinner to suit aesthetic preferences, improve visibility, or align with user interface designs and branding guidelines.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        plotArea: {
            border: {
                width: 5,
                color: "orange"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### plotArea.margin `Number|Object`*(default: 5)*

 The margin of the plot area.


<div class="meta-api-description">
How to adjust the space around a sparkline chart's plot area in Kendo UI? Adjust spacing or set padding around a chart’s plot region to control the distance between the visualization lines, markers, or labels and the container edges, preventing clipping or overlap and enabling precise layout customization, fine-tuning the white space around sparkline graphs or small data plots, managing chart boundaries, and ensuring all visual elements remain visible within the component area.
</div>

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 5px (by default)
    margin: { top: 1, left: 1 }

### pointWidth `Number`*(default: 5)*

The width to allocate for each data point.


<div class="meta-api-description">
How do I set the width of individual data points in a Kendo UI sparkline chart? Adjusting the width or thickness of individual data points or bars in a sparkline chart impacts spacing, density, layout, and potential overlap, enabling control over how tightly packed or spread out each mark appears. Developers seeking to customize visual thickness, configure point spacing, set bar widths, control mark size, or optimize chart density and layout for better readability or compactness will find this essential for managing point rendering and presentation. This includes use cases for fine-tuning data point dimensions to prevent overlap, enhance clarity, or achieve specific visual styles in sparkline or miniature bar charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        pointWidth: 10,
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### renderAs `String`

Sets the preferred rendering engine.
If it is not supported by the browser, the Sparkline will switch to the first available mode.

The supported values are:

* "svg" - renders the widget as inline SVG document, if available
* "canvas" - renders the widget as a Canvas element, if available.


<div class="meta-api-description">
How do I configure the rendering method for Kendo UI sparkline charts? Set or configure the rendering method for inline sparkline charts by selecting between scalable vector graphics (SVG) or HTML Canvas output, enabling control over how mini line charts are drawn and displayed; automatically fallback to a supported rendering mode if the preferred option is not available in the user’s browser environment, accommodating preferences for vector-based sharpness or pixel-based performance, and supporting developers who want to customize visualization rendering, optimize compatibility, or influence rendering engine choice in various browsers and devices.
</div>

#### Example - Render as Canvas, if supported

    <span id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        renderAs: "canvas",
        type: "column",
        data: [1, 2, 3, 4]
    });
    </script>

### series `Array`

Array of series definitions.

The series type is determined by the value of the type field.
If a type value is missing, the type is assumed to be the one specified in `seriesDefaults`.

Each series type has a different set of options.

>**Info:**Some options accept function as argument. They will be evaluated for each point (supplied as parameter). The theme/seriesDefaults value will be used if no value is returned.


<div class="meta-api-description">
How to configure different series types in Kendo UI Sparkline? Define or configure the data series for sparklines by specifying an array of series objects where each item sets the series type or inherits default types, enabling control over chart types like line, bar, or area within sparklines. Customize individual series with specific options including per-point function callbacks to dynamically compute properties, fallback behaviors when types or values are omitted, and flexible series configuration to tailor appearance and behavior of each sparkline segment. Use this approach to set, adjust, enable, or override sparkline data input formats, series types, styling, and dynamic value computations for customized inline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "line",
            data: [10, 15, 8, 12],
            color: "blue"
        }, {
            type: "column",
            data: [5, 7, 3, 6],
            color: "red"
        }]
    });
    </script>

### series.type `String`*(default: "line")*

The type of the series. Available types:

* area
* column (synonym: bar)
* line
* pie
* bullet


<div class="meta-api-description">
How do I change the type of chart displayed in a Kendo UI sparkline? Set or configure the chart type to control how each data series is rendered in compact inline charts, choosing from visualization styles like area graphs, column or bar charts, line plots, pie slices, or bullet indicators to customize the geometry, appearance, and emphasis of sparklines; enable switching between different chart types to adjust visual data representation, alter series display styles, or select the series rendering format for minimal space trend visualization.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "area",
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### series.dashType `String`*(default: "solid")*

The series line dash type.

**Applicable only to line series**


<div class="meta-api-description">
How to customize line stroke pattern in Sparkline series? Configure or set the stroke pattern of line charts with options to enable solid, dashed, dotted, or custom dash styles for series lines in compact visualizations, controlling the appearance and style of line strokes within tiny graphs, allowing developers to customize line segment patterns, line dash arrays, and stroke styles specifically for line-based sparkline series to highlight trends, emphasize data points, or differentiate series through varied dash effects.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "line",
            dashType: "dash",
            data: [10, 15, 8, 12]
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

### series.data `Array`

Array of data items. The data item type can be either a:

* Array of objects. Each point is bound to the specified series fields.
* Array of numbers. Available for area, bar, column, pie and line series.


<div class="meta-api-description">
How do I set data for a Sparkline series in Kendo UI? Bind or set the data source for chart series using arrays of numeric values or objects with customizable fields, enabling dynamic input for area, bar, column, pie, and line sparkline charts, supporting various data formats for series points, configuring series data arrays, feeding series with value lists or structured data points, controlling the underlying numeric or object collection that drives sparkline visualizations, enabling flexible series data assignment for different chart types and data structures.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            data: [10, 15, 8, 12, 6, 18]
        }]
    });
    </script>

### series.explodeField `String`

The data field containing a Boolean value that indicates if the sector is exploded.

**Available for pie series**


<div class="meta-api-description">
How to configure which pie chart segments explode in Kendo UI for jQuery Sparkline widget? Configure which segments or slices in a pie chart appear separated or "exploded" by linking to a Boolean data attribute that flags individual data points for emphasis or visual distinction. Control slice explosion by specifying a true/false field that marks which portions should stand out or detach from the main pie, enabling highlighting or spotlighting specific data entries within pie series visualizations. Enable dynamic segmentation, selective slice highlighting, or conditional explosion effects based on underlying data properties to customize the chart’s visual emphasis for pie or donut charts. Adjust appearance by binding the explode behavior to data-driven conditions that determine which pie sectors extend outward for clearer differentiation and presentation focus.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "pie",
            explodeField: "exploded",
            data: [
                { value: 10, exploded: false },
                { value: 15, exploded: true },
                { value: 8, exploded: false }
            ]
        }]
    });
    </script>

### series.currentField `String`

The data field containing the current value.

**Available for bullet and verticalBullet series.**


<div class="meta-api-description">
How do I configure the current field in Kendo UI for jQuery Sparkline series? Configure or specify the data attribute that holds the current value for bullet or verticalBullet chart types within a sparkline visualization, enabling control over which data field is interpreted as the present measurement; set or define the data key representing the active or latest value for these series, so the sparkline accurately reflects the targeted metric from your dataset, applicable when mapping current data points, controlling data binding for time-sensitive or real-time indicators, and customizing which field serves as the main value reference for visual bullet markers or vertical indicators in sparkline components.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "bullet",
            currentField: "current",
            data: [
                { current: 10, target: 15 },
                { current: 8, target: 12 }
            ]
        }]
    });
    </script>

### series.targetField `String`

The data field containing the target value.

**Available for bullet and verticalBullet series.**

**Available for pie series**


<div class="meta-api-description">
How to set target values for Kendo UI sparkline series? Specify or set the data field that holds the goal, target, or benchmark value for a sparkline series to enable visualization or comparison of actual versus target metrics by binding a specific field name from your dataset; this mapping controls which value is referenced as the target in bullet, vertical bullet, or pie sparkline charts and supports configuring, enabling, or customizing target values for trend analysis, performance tracking, or goal-oriented visualizations within your data series.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "bullet",
            targetField: "target",
            currentField: "current",
            data: [
                { current: 10, target: 15 },
                { current: 8, target: 12 }
            ]
        }]
    });
    </script>

### series.field `String`

The data field containing the series value.


<div class="meta-api-description">
What field should I specify in Kendo UI Sparkline to bind series data? Configure the data source for sparkline values by specifying the exact field or property name within your dataset that holds the numeric series data, enabling chart rendering from a particular data attribute, binding sparkline points to a specific value column, defining which data property drives the sparkline’s plotted series, selecting the numeric field to visualize trends or patterns in inline charts, mapping the sparkline to the data item’s value key, setting the property name that contains the sequence of numbers for the sparkline’s line or bars, directing the chart to pull series data from a designated field, controlling which attribute from your objects feeds the sparkline with numeric data, and enabling dynamic association of the sparkline series with the appropriate numeric field in your underlying data model.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            field: "value",
            data: [
                { value: 10 },
                { value: 15 },
                { value: 8 }
            ]
        }]
    });
    </script>

### series.name `String`

The series name.

The name can also be a [template](/api/framework/kendo#methods-template) which sets the name of the series when bound to grouped data source.

The fields which can be used in the template are:

*   series - the series options
*   group - the data group
*   group.field - the name of the field used for grouping
*   group.value - the field value for this group.


<div class="meta-api-description">
How to customize series names in Kendo UI for jQuery sparkline charts? Configure or customize the label, title, or identifier shown for a data series in sparkline charts, enabling you to define a fixed name or dynamically generate names using templates with access to series details, group information, grouping field names, and group values; control how each series is named in grouped data scenarios, set descriptive or contextual series labels, and tailor series naming conventions for clarity, filtering, legend display, and improved visualization understanding across dynamic or static datasets.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            name: "Sales Data",
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### series.highlight `Object`

Configures the appearance of highlighted points.


<div class="meta-api-description">
How to customize highlight appearance for individual data points in a Kendo UI sparkline series? Control and customize the visual emphasis of individual data points in a sparkline by configuring highlight appearance parameters like color, size, border thickness, opacity, and visibility for points triggered by hover, selection, or focus. Adjust how points stand out to enhance interactivity, highlight key data moments, set emphasis states, or style selected points dynamically within the sparkline series. Enable precise point highlighting and state-based styling options to differentiate data by modifying highlight effects including point illumination, opacity changes, border decoration, or color adjustments for user interaction and data visualization emphasis.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            highlight: {
                visible: true,
                color: "yellow",
                opacity: 0.8,
                border: {
                    width: 2,
                    color: "red"
                }
            },
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### series.highlight.border `Object`

The border of highlighted points. The color is computed automatically from the base point color.

**Applicable to pie series.**


<div class="meta-api-description">
How do I customize the border of highlighted points in a Kendo UI for jQuery sparkline? Adjust or customize the border styling around highlighted or selected points in pie chart sparklines to enhance visibility and emphasis during hover, selection, or focus interactions, including control over border color, thickness, and appearance that dynamically adapts from the base slice color to improve point or slice distinction, highlight effects, and user interaction feedback for pie series data visualization.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "pie",
            highlight: {
                border: {
                    width: 3,
                    color: "blue",
                    opacity: 0.7
                }
            },
            data: [10, 15, 8]
        }]
    });
    </script>

### series.highlight.border.width `Number`

The width of the border.


<div class="meta-api-description">
How do I adjust the width of the highlight border around series points in Kendo UI sparklines? Adjust the thickness, width, or thickness value of the highlight border around series points in sparklines to control the stroked outline’s pixel size and visual emphasis; configure, set, or customize the border line thickness for highlighted data points to enhance visibility and styling, including changing border width to emphasize selected or hovered data series in minimal inline charts or trend visuals.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "pie",
            highlight: {
                border: {
                    width: 4
                }
            },
            data: [10, 15, 8]
        }]
    });
    </script>

### series.highlight.border.color `String`

The border color.


<div class="meta-api-description">
How do I customize the border color of highlighted series in a Kendo UI sparkline chart? Configure or customize the outline, stroke, or border color that appears around data points or entire series when hovered over, selected, or highlighted in sparkline charts to enhance visual emphasis, contrast, and user interaction feedback; control the color for highlighted strokes or outlines that help distinguish focused or active chart elements, enabling better visibility and styling of emphasized data regions during mouseover or selection states.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "pie",
            highlight: {
                border: {
                    color: "orange"
                }
            },
            data: [10, 15, 8]
        }]
    });
    </script>

### series.highlight.border.opacity `Number`

The border opacity.


<div class="meta-api-description">
How to adjust opacity of highlight border in Kendo UI Sparkline? Adjust the transparency level of the highlight border around data points when hovering or selecting in sparklines, enabling control over how visible or subtle the border appears by setting a numeric opacity value from fully transparent to fully opaque, allowing customization of highlight effects for better visual emphasis or subtlety in small inline charts and data point focus states.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "pie",
            highlight: {
                border: {
                    opacity: 0.5
                }
            },
            data: [10, 15, 8]
        }]
    });
    </script>

### series.highlight.color `String`

The highlight color.

**Available only for pie series**


<div class="meta-api-description">
How to change the highlight color in a Kendo UI sparkline pie chart? Control and customize the highlight color that emphasizes individual slices or segments in pie charts and pie series visualizations, enabling you to set or adjust the accent color used whenever a data point or slice is hovered over, selected, or focused to enhance visual differentiation and user interaction feedback in your pie or donut charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            type: "pie",
            highlight: {
                color: "lightgreen"
            },
            data: [10, 15, 8]
        }]
    });
    </script>

### series.highlight.opacity `Number`

The opacity of the highlighted points.

**Applicable to pie series.**


<div class="meta-api-description">
How do I adjust the opacity of highlighted segments in a Kendo UI Sparkline series? Adjust the transparency level, alpha, or opacity of highlighted segments or points within a pie chart series to control their emphasis and visibility during interactions or hover states, enabling customization of how strongly selected or focused slices appear by setting their fade, intensity, or clarity in sparkline visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        series: [{
            data: [10, 15, 8, 12],
            highlight: {
                opacity: 0.5
            }
        }]
    });
    </script>

### series.highlight.visible `Boolean`

A value indicating if the series points should be highlighted.


<div class="meta-api-description">
How can I customize point highlights in Kendo UI for jQuery Sparkline? Control the visibility of highlight markers on data points within a sparkline or mini chart, enabling or disabling emphasis on individual series points to show or hide point highlights during rendering or initialization; customize whether points are visually distinguished, emphasized, or marked to improve clarity, enable point focus, highlight trends, or toggle series point markers on or off.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        series: [{
            highlight: {
                visible: false
            },
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### series.aggregate `String|Function` *(default: "max")*

The aggregate function to apply for date series.

This function is used when a category (an year, month, etc.) contains two or more points.
The function return value is displayed instead of the individual points.

The supported values are:

* "avg" - the average of all values for the date period.
* "count" - the number of values for the date period.
* "max" - the highest value for the date period.
* "min" - the lowest value for the date period.
* "sum" - the sum of all values for the date period. Defaults to 0 if no data points are defined.
* "sumOrNull" - the sum of all values for the date period. Defaults to `null` if no data points are defined.
* "first" - the first value
* function(values, series, dataItems, category) - user-defined aggregate function. Returns single value or data item.
* object  - (compound aggregate)**Applicable to "candlestick" and ohlc "series"**. Specifies the aggregate for each data item field.


<div class="meta-api-description">
How do I aggregate data points with the same date category in a Kendo UI Sparkline series? Control how time-series data points with the same date category such as year or month are combined by configuring aggregation methods like average, count, maximum, minimum, sum, or custom user-defined functions that calculate summary values per period; enable summing with fallback to zero or null, retrieve the first occurrence, or apply compound aggregation for complex series types like candlestick or OHLC, which determines how multiple data entries are merged into a single representative value for visualization and analysis across grouped time intervals.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        categoryAxis: {
            type: "date",
            categories: [
                new Date("2023/01/01"),
                new Date("2023/01/01"),
                new Date("2023/01/02"),
                new Date("2023/01/02")
            ]
        },
        series: [{
            aggregate: "avg",
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### series.axis `String`*(default: "primary")*

The name of the value axis to use.

**Applicable to area, bar, column and line series**


<div class="meta-api-description">
How do I configure the axis for a series in a Kendo UI Sparkline? Set or configure the numeric value axis for a chart series by specifying the axis name to link or bind data points to a particular vertical or horizontal scale, enabling precise control over which axis the series like line, bar, column, or area charts use for their values. This includes selecting or targeting a specific named value axis for rendering series data, customizing axis bindings to display multiple series with distinct scales, adjusting series alignment to different numeric axes, and managing multi-axis chart setups by assigning each series to its corresponding named value axis for accurate data representation and visualization control.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
     $("#sparkline").kendoSparkline({
        valueAxis: [{ name: "first" }],
        series: [
          {
            type: "column",
            data: [200, 450, 300, 125],
            color: function (point) {
              if (point.value > 300) {
                // Colorize matching points
                return "#f00";
              }

              // Use default theme color
            },
            axis: "first",
          },
        ],
      });
    </script>

### series.border `Object`

The border of the points.

**Applicable to bar, column and pie series**


<div class="meta-api-description">
How to customize the borders of individual data points in a Kendo UI sparkline? Control and customize the outlines, strokes, and edge styling of individual data points in small inline charts such as bar, column, and pie types by configuring border appearance on series points. Adjust the thickness, color, visibility, and emphasis of point edges to highlight, differentiate, or style chart markers for enhanced visual clarity and focus in sparklines and microcharts. Enable fine-tuning of point border rendering to create distinct outlines, customize stroke effects, define edge contrast, and manage how point boundaries appear across different series types in compact data visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12],
            border: {
                color: "blue",
                width: 2,
                dashType: "dash"
            }
        }]
    });
    </script>

### series.border.color `String|Function`

The color of the border.  It defaults to the color of the current series.


<div class="meta-api-description">
How can I change the color of the border in a Kendo UI Sparkline series? Set or customize the outline, stroke, or border color for a sparkline data series to enhance visibility or differentiate segments by specifying a distinct color value; override default matching series colors with custom hues, adjust the series border appearance, enable or configure border color settings for sparkline charts, control line or edge coloring around data points, and fine-tune the stroke color to emphasize series boundaries or improve chart styling.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12],
            border: {
                color: "red"
            }
        }]
    });
    </script>

### series.border.dashType `String|Function`*(default: "solid")*

The dash type of the border.


<div class="meta-api-description">
How can I customize the border line pattern of a sparkline series in Kendo UI for jQuery? Control and customize the border line pattern of a sparkline series by setting the stroke style to solid, dashed, dotted, or various dash patterns, enabling customization of the series outline appearance, border styling options, line stroke types, dash effects, and border visual design through configuration settings, useful for adjusting outline styles, dash arrays, border line patterns, and enabling distinctive series border customization in sparkline charts.
</div>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12],
            border: {
                dashType: "dash",
                width: 2
            }
        }]
    });
    </script>

### series.border.opacity `Number|Function`

The border opacity.


<div class="meta-api-description">
How do I set the opacity of a series border in Kendo UI for jQuery Sparkline chart? Adjust, configure, or set the transparency, alpha, opacity level, or border visibility of series outlines, edges, or strokes in a Sparkline chart to control how strong or subtle the border appears around data points or series elements. Enable fine-tuning of border translucency for visual emphasis, design customization, or to reduce visual noise by adjusting border transparency, fade, or strength. Manage border opacity to make series edges more or less prominent in inline charts, sparklines, or microcharts, influencing how series boundaries are rendered, highlighted, or blended with backgrounds.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12],
            border: {
                opacity: 0.6,
                width: 3
            }
        }]
    });
    </script>

### series.border.width `Number|Function`*(default: 1)*

The width of the border.


<div class="meta-api-description">
How do I adjust the thickness of a sparkline series border? Adjust the thickness, stroke width, or outline weight of a chart series border or line in sparklines by configuring numeric values to set how bold or thin the series edges appear, controlling the visual emphasis of series outlines or shapes. This enables customization of border width, line stroke weight, or series edge thickness in sparkline charts for enhanced styling, visibility, and differentiation between data series in compact inline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12],
            border: {
                width: 4,
                color: "green"
            }
        }]
    });
    </script>

### series.categoryField `String`

The data field containing the point category name.

**Applicable to pie series.**


<div class="meta-api-description">
How to specify the field for category names in Kendo UI Sparkline? Bind or configure the data field that defines category names or group labels in pie charts and sparklines, enabling the mapping of slice labels, tooltips, or grouped data points by category. Set or specify the field representing categories, segments, or group identifiers to control how data points are labeled, displayed, or grouped within pie or sparkline visualizations, supporting accurate labeling, categorization, and tooltip information based on category names. Customize which data attribute identifies each pie slice or sparkline segment’s category for clear, meaningful grouping and annotation in charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        dataSource: [
            { category: "Apples", value: 10 },
            { category: "Oranges", value: 15 },
            { category: "Bananas", value: 8 }
        ],
        series: [{
            categoryField: "category",
            field: "value"
        }]
    });
    </script>

### series.color `String|Function`

The series base color. The supported values are:

* CSS color string, including hex and rgb
* function(point) - user-defined function that will be evaluated for each point. Returning `undefined` will assume the default series color.


<div class="meta-api-description">
How to customize the color of individual points in a Kendo UI sparkline chart? Configure or customize the base color for a sparkline chart series by setting a CSS-compatible color string like hex or RGB, or dynamically control individual point colors using a callback function that determines color per data point, enabling tailored color schemes, conditional styling, per-point highlighting, gradient effects, or fallback to default series colors when no custom color is specified, supporting use cases involving static color assignment, dynamic color generation based on data values, or advanced visual differentiation within the sparkline visualization.
</div>

#### Example

    $("#sparkline").kendoSparkline({
         series: [{
             type: "column",
             data: [200, 450, 300, 125],
             color: "#ff0000"
         }]
    });
    </script>

#### Example

    <span id="sparkline"></span>
    <script>
    $("#sparkline").kendoSparkline({
         series: [{
             type: "column",
             data: [200, 450, 300, 125],
             color: function(point) {
                if (point.value > 300) {
                    // Colorize matching points
                    return "#f00";
                }

                // Use default theme color
             }
         }]
    });
    </script>

### series.colorField `String`

The data field containing the point color.

**Applicable for bar, column and pie series.**


<div class="meta-api-description">
How to dynamically set colors for individual points in Kendo UI sparklines? Enable dynamic point-specific colors in sparklines by configuring a data field that determines each individual data item's color, allowing sets of bars, columns, or pie slices to display with unique colors sourced directly from your dataset. This feature supports per-data-point color customization, data-driven color binding, and styling of series elements based on underlying field values, helping to control and configure color variation across sparkline charts for enhanced visual differentiation and clarity.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        dataSource: [
            { value: 10, color: "red" },
            { value: 15, color: "blue" },
            { value: 8, color: "green" }
        ],
        series: [{
            field: "value",
            colorField: "color"
        }]
    });
    </script>

### series.connectors `Object`

The label connectors options.

**Applicable to pie series.**


<div class="meta-api-description">
How do I customize the label connector lines in Kendo UI sparklines? Configure and control label connector lines for pie chart data points to enhance readability and visual linkage between labels and slices, including adjusting connector line color, thickness, length, visibility, placement, styling, and display settings in compact inline charts like sparklines. Manage label connectors to ensure clear association of textual data with pie segments, enabling fine-tuning of connector appearance and behavior for better chart annotation and user-friendly visual representation within small graphical components.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        series: [{
            data: [10, 15, 8, 12],
            connectors: {
                color: "red",
                width: 2,
                padding: 8
            }
        }]
    });
    </script>

### series.connectors.color `String`

The color of the connector line.


<div class="meta-api-description">
How do I customize the color of connector lines in a Kendo UI sparkline? Control and customize the color of the lines connecting data points in sparklines by specifying any valid CSS color format such as named colors, hex codes, RGB or RGBA values, enabling clear visual links between data points. Configure connector stroke colors dynamically during setup or runtime to enhance chart appearance, improve data trend visibility, and tailor connector line styling to match themes or design requirements. Adjust connector line colors for better contrast, data emphasis, or to distinguish series elements across multiple sparklines.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        series: [{
            data: [10, 15, 8, 12],
            connectors: {
                color: "blue"
            }
        }]
    });
    </script>

### series.connectors.padding `Number`*(default: 4)*

The padding between the connector line and the label, and connector line and pie chart.


<div class="meta-api-description">
How do I adjust the gap between connector lines and their labels in a Kendo UI Sparkline? Adjust the gap between connector lines and their labels as well as the spacing from the pie chart to prevent overlap or clutter in visual elements like sparklines or pie charts; configure, set, or control the minimum padding to manage distance between connectors and labels for clearer data visualization, ensuring connector labels do not collide with lines or chart segments while fine-tuning layout, spacing, label readability, and connector positioning within compact or crowded charts and dashboards.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        series: [{
            data: [10, 15, 8, 12],
            connectors: {
                padding: 10
            }
        }]
    });
    </script>

### series.connectors.width `Number`*(default: 1)*

The width of the connector line.


<div class="meta-api-description">
How to adjust the thickness of connector lines in a Kendo UI sparkline chart? Adjust the thickness, stroke width, or line weight of connector lines linking data points in a sparkline chart or series, enabling customization of connector line appearance, connector stroke size, line thickness control between points, or visual prominence of connectors in small inline charts. This setting influences how bold, thin, or prominent the lines connecting sparkline data points appear, useful for configuring, modifying, or styling the connector line width in sparkline visualizations for better clarity, emphasis, or aesthetic alignment in data trend displays.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        series: [{
            data: [10, 15, 8, 12],
            connectors: {
                width: 3
            }
        }]
    });
    </script>

### series.gap `Number`*(default: 1.5)*

The distance between category clusters.

**Applicable for bar and column series.**


<div class="meta-api-description">
How do I control the gap between grouped bars in a sparkline chart? Control or adjust the spacing and gap size between grouped bars or column clusters in a sparkline chart to manage chart density, bar separation, and visual readability in bar or column series, enabling configuration of the distance between category clusters for clearer or more compact data presentation, tuning the layout without modifying the underlying data values or affecting overall series alignment.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12],
            gap: 0.5
        }]
    });
    </script>

### series.labels `Object`

Configures the series data labels.


<div class="meta-api-description">
How can I customize data value labels in Kendo UI for jQuery sparklines? Customize and control the display of data value labels for each data point in a series within sparklines, including options to show or hide labels, format numbers or dates, adjust label position and angle, apply text styling such as font, color, background, and borders, and create custom label content using templates or formatting functions. Enable precise configuration of point labels to improve chart readability, tailor label layout and appearance, format values for different data types, and manage labeling behavior through initialization settings or dynamic updates. This covers use cases like formatting percentage labels, rotating labels for better fit, styling labels to match themes, hiding labels on dense data points, and customizing label text beyond default value display.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                background: "yellow",
                color: "black"
            }
        }]
    });
    </script>

### series.labels.align `String`*(default: "circle")*

Defines the alignment of the labels.

**Available for pie series.**


<div class="meta-api-description">
How do I align labels in Kendo UI for jQuery sparkline series? Control and customize the positioning and horizontal or vertical alignment of text labels for data series in compact pie charts, enabling precise label placement, text justification, and arrangement during rendering or data binding. Adjust label alignment settings to configure how series names or values appear relative to pie slices, ensuring readable, well-organized labels with options to set left, center, right, or other alignment preferences for pie chart segment annotations. This setting is essential for fine-tuning label positioning to match visual design, improve clarity, and control text layout within small graphical representations of data distributions in pie chart formats.
</div>

#### *"circle"*

The labels are positioned in circle around the chart.

#### *"column"*

The labels are positioned in columns to the left and right of the chart.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                align: "column",
                visible: true
            }
        }]
    });
    </script>

### series.labels.background `String|Function`

The background color of the labels.


<div class="meta-api-description">
How do I change the background color of labels in a Kendo UI Sparkline? Configure or customize the background color behind label text in small inline charts to enhance label visibility, contrast, and readability across various chart themes and backgrounds. Adjust or set the fill color for labels in sparkline or mini charts to ensure text stands out clearly whether you want a transparent, solid, or themed backdrop behind data point labels. Control label background hues to improve clarity, match chart color schemes, or visually separate label text from complex or colorful chart elements in compact visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                background: "lightblue"
            }
        }]
    });
    </script>

### series.labels.border `Object`

The border of the labels.


<div class="meta-api-description">
How to customize border styling for sparkline series data labels? Customize and control the border styling of data labels on chart series to enhance label visibility, readability, and emphasis by setting properties like border color, thickness, line style, and dash patterns. Enable or configure label outlines for sparkline charts or other series visualizations to highlight specific data points, adjust label framing, or improve contrast around data labels with flexible options for border appearance and formatting. Adjust label edge styling to make series values stand out in small charts, line graphs, or compact sparkline displays by defining border characteristics during initialization or dynamic updates.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                border: {
                    color: "red",
                    width: 2,
                    dashType: "dash"
                }
            }
        }]
    });
    </script>

### series.labels.border.color `String|Function`*(default: "black")*

 The color of the border.


<div class="meta-api-description">
How do I change the color of the border around data labels in a Kendo UI for jQuery sparkline? Customize or set the outline color, stroke color, or border shade for data labels on chart series in sparklines using any valid CSS color formats such as hex codes, RGB, RGBA, or named colors; control label border appearance, adjust highlight edges, configure label outlines, and style small chart series annotations with precise color settings for enhanced visual clarity and consistency.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                border: {
                    color: "green"
                }
            }
        }]
    });
    </script>

### series.labels.border.dashType `String|Function`*(default: "solid")*

 The dash type of the border.


<div class="meta-api-description">
How do I customize the border style of sparkline series labels in Kendo UI for jQuery? Configure or customize the patterned or dashed borders around chart or graph series labels, control the style of label outlines with dash patterns such as solid, dotted, dashed, or other line styles, enable or set border dash types to visually distinguish data series labels, adjust label border styles for sparklines or small charts, control the appearance of label edges by specifying line dash sequences or styles for emphasis or clarity in data visualization, manage label border formatting to improve readability or highlight specific data points within sparkline components or similar UI elements.
</div>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                border: {
                    dashType: "dot",
                    width: 2
                }
            }
        }]
    });
    </script>

### series.labels.border.width `Number|Function`*(default: 0)*

 The width of the border.


<div class="meta-api-description">
How do I adjust the border width of data labels in a Kendo UI Sparkline series? Adjust or configure the thickness, width, or thickness level of the outline, edge, or border surrounding data labels or series labels in sparklines, controlling how bold, thin, or prominent the label borders appear when rendering charts or graphs. Enable customization of label outlines, fine-tune border line thickness around series data points, set or modify the thickness of label edges for improved visibility, or style the boundary width of data labels displayed on sparkline series to enhance clarity and visual distinction in compact chart elements.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                border: {
                    width: 3,
                    color: "blue"
                }
            }
        }]
    });
    </script>

### series.labels.color `String|Function`

The text color of the labels.


<div class="meta-api-description">
How to set custom color for sparkline data point labels? Customize the text color of data point labels within chart series by specifying any valid CSS color format such as hex codes, RGB, RGBA, HSL, or named colors to control label appearance, enhance readability, and maintain visual consistency across sparklines or similar compact charts. Adjust, configure, or set label colors for all data points in a series, enable theming, apply global or series-wide styling to data labels, and override default or inherited styles while ensuring label visibility and customization in data visualizations or summary trend graphics.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                color: "red"
            }
        }]
    });
    </script>

### series.labels.distance `Number`*(default: 35)*

The distance of the labels.

**Available for pie series.**


<div class="meta-api-description">
How do I adjust the distance of labels in my Kendo UI Sparkline pie chart? Adjust and configure the spacing or offset of labels in pie chart slices, control how far or near the text annotations appear relative to each segment for better readability, customize label positioning distance to avoid overlap or improve clarity, set or modify label offsets on pie slices to enhance visual layout, manage the gap between series labels and their corresponding pie sections, enable fine-tuning of label proximity in pie series charts, optimize label placement to prevent clutter and improve user interpretation, control label distance for effective pie chart visualization, configure text label alignment and spacing in pie slices to suit different design needs, adjust how close or distant series labels are displayed around pie chart elements for improved presentation.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                distance: 50
            }
        }]
    });
    </script>

### series.labels.font `String|Function`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.


<div class="meta-api-description">
How do I customize the font settings for sparkline series labels in Kendo UI? Adjust or specify the typography settings for data series labels in sparklines by configuring font family, size, weight, style, and line height to ensure label text appearance aligns with design requirements, enabling customization of label readability, style consistency, and visual emphasis in chart series presentations through font configuration options.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                font: "16px Arial"
            }
        }]
    });
    </script>

### series.labels.format `String|Function`

The format of the labels.


<div class="meta-api-description">
How do I customize the appearance of data labels on a Kendo UI sparkline series? Configure how data labels appear on sparkline chart series by specifying custom format strings that define numeric, date, currency, percentage, or custom pattern display for each data point’s label, enabling precise control over label text presentation, formatting options, and localization styles within sparkline visualizations.
</div>

#### Example

    //sets format of the labels
    format: "C"

### series.labels.margin `Number|Object`*(default: { left: 5, right: 5})*

The margin of the labels.


<div class="meta-api-description">
How do I adjust the space between labels and markers in a Kendo UI Sparkline chart? Adjust the spacing or padding around data point labels in a compact line or area chart to control the distance between labels and adjacent markers, chart borders, or neighboring text, enabling customization of label offset, separation, and layout in minimal, inline visualization components where clarity and visual balance are essential.
</div>

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and bottom margin to 1px
    // margin left and right are with 5px (by default)
    margin: { top: 1, bottom: 1 }

### series.labels.padding `Number|Object`*(default: 0)*

 The padding of the labels.


<div class="meta-api-description">
How do I adjust the spacing around sparkline chart data labels using the padding property? Adjust spacing around small chart data labels by configuring the padding or margin to control how close label text appears relative to chart elements, enabling developers to set uniform or side-specific spacing to improve readability, prevent overlap, and refine label layout in sparkline series or mini charts.
</div>

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }

### series.labels.position `String|Function`*(default: "above")*

Defines the position of the labels.


<div class="meta-api-description">
How to position data point labels in Kendo UI sparkline series? Control the placement and alignment of data point labels in sparkline charts by configuring label positioning options such as inside, outside, top, bottom, left, or right relative to each series point, enabling customization of label layout, readability, and visual clarity for data series annotations, markers, or values.
</div>

#### *"above"*

The label is positioned at the top of the marker.

**Applicable for area and line series.**

#### *"center"*

The label is positioned at the point center.

**Applicable for bar, column, pie series.**

#### *"insideEnd"*

The label is positioned inside, near the end of the point.

**Applicable for bar, column, pie series.**

#### *"insideBase"*

The label is positioned inside, near the base of the bar.

**Applicable for bar and column series.**

#### *"outsideEnd"*

The label is positioned outside, near the end of the bar.

**Applicable for bar, column, pie series.
Not applicable for stacked series.**

#### *"right"*

The label is positioned to the right of the marker.

**Applicable for area and line series.**

#### *"below"*

The label is positioned at the bottom of the marker.

**Applicable for area and line series.**

#### *"left"*

The label is positioned to the left of the marker.

**Applicable for area and line series.**

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                position: "below"
            }
        }]
    });
    </script>

### series.labels.template `String | Function`

The [template](/api/framework/kendo#methods-template) which renders the chart series label.

The fields which can be used in the template are:

*   category - the category name. Available for area, bar, column, bubble, donut, line and pie series.
*   dataItem - the original data item used to construct the point. Will be null if binding to array.
*   percentage - the point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.
*   series - the data series
*   value - the point value. Can be a number or object containing each bound field.


<div class="meta-api-description">
How can I customize series labels in a sparkline chart using the template property? Configure and customize series labels in sparkline charts by defining templates that format and render each label with dynamic data, binding to key properties like category names for area, bar, column, bubble, donut, line, and pie charts, enabling display of original data items, numerical or object values, series information, and percentage values specifically for donut, pie, and 100% stacked charts, allowing flexible control over label content, appearance, and data-driven formatting to match diverse visualization needs and developer customization scenarios.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true,
                template: (data) => `Value: ${data.value}`
            }
        }]
    });
    </script>

### series.labels.visible `Boolean|Function`*(default: false)*

 The visibility of the labels.


<div class="meta-api-description">
How to hide data point labels in a Kendo UI sparkline chart? Toggle visibility of data point labels in a sparkline chart to show or hide value annotations for each series, enabling or disabling numerical or textual labels that annotate individual data points, with options to configure label rendering at initialization or dynamically control label display for enhanced data readability, clarity, or minimalistic presentation in compact inline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            labels: {
                visible: true
            }
        }]
    });
    </script>

### series.line `String | Object`

Line options.

**Applicable to area series.**


<div class="meta-api-description">
How can I customize the appearance of an area series line in a Kendo UI sparkline? Configure and customize the outline appearance of area charts by setting line colors, stroke thickness, dash styles, and toggling visibility to control the stroke or border of area series in sparklines. Adjust line styling for area series to highlight boundaries, control the line's look and feel, tailor the outline's color and width, enable or disable the boundary line, and apply various dash patterns or solid strokes to suit design or visualization requirements. This setting is key for developers aiming to fine-tune area chart edges, define series line rendering, or modify stroke attributes within compact sparkline visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "area",
        series: [{
            data: [10, 15, 8, 12],
            line: {
                color: "blue",
                width: 3,
                style: "smooth"
            }
        }]
    });
    </script>

### series.line.color `String`

The line color.


<div class="meta-api-description">
How do I change the color of a sparkline chart line in Kendo UI for jQuery? Adjust or customize the stroke or border color of a sparkline chart line by setting any valid CSS color value including hex codes, RGB or RGBA formats, and named color strings to control line appearance, override default palettes, highlight specific data series, differentiate trends within mini charts, change line hues for emphasis, style sparklines with custom colors, configure series line shading, and enable precise color control on compact visualization lines.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "area",
        series: [{
            data: [10, 15, 8, 12],
            line: {
                color: "red"
            }
        }]
    });
    </script>

### series.line.opacity `Number`*(default: 1)*

The line opacity.


<div class="meta-api-description">
How can I adjust the transparency of a line in my Kendo UI sparkline? Adjust the transparency or opacity level of a chart or graph line to make it more or less visible, set alpha transparency for line elements using numeric values from fully transparent (0) to fully opaque (1), control the intensity or clarity of line colors by modifying their fade or see-through effect, customize line appearance for better visual distinction or subtlety in sparkline or series data visualization, and fine-tune line visibility and contrast by configuring opacity or alpha blending in graphical renderings.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "area",
        series: [{
            data: [10, 15, 8, 12],
            line: {
                opacity: 0.5
            }
        }]
    });
    </script>

### series.line.width `String`*(default: 0.5)*

The line width.


<div class="meta-api-description">
How do I adjust the thickness of a line in a Kendo UI sparkline series? Adjust the thickness, weight, or stroke width of a chart or graph line to make series lines bolder, thinner, thicker, or lighter in visual presentation. Configure line width, line stroke size, or line boldness in sparkline graphics, time series plots, or small inline charts to control how prominently the line appears. Enable line thickness customization, set the visual line weight, and modify series line rendering for clearer or subtler line displays in data visualizations and embedded mini charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "area",
        series: [{
            data: [10, 15, 8, 12],
            line: {
                width: 4
            }
        }]
    });
    </script>

### series.line.style `String`*(default: "normal")*

The supported values are:

* "normal" - The values will be connected with straight line.
* "step" - The values will be connected with a line with right angle.
* "smooth" - The values will be connected with a smooth line.

> The default value is "normal".

> The `style` option is supported when [series.type](/api/javascript/dataviz/ui/sparkline#configuration-series.type) is set to "area".


<div class="meta-api-description">
How to style line connections in Kendo UI sparkline series? Configure the appearance of line connections in a series, enabling you to set or toggle between straight linear links, stepped right-angle joins, or smooth curved lines to control how data points are visually connected on area charts or similar series types. Adjust line interpolation style, connection geometry, or line join behavior by choosing from linear, stepped, or smooth options to customize data visualization flow and transitions between data points for enhanced readability, stepped progression, or fluid trends in sparkline or area series.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "area",
        series: [{
            data: [10, 15, 8, 12],
            line: {
                style: "smooth"
            }
        }]
    });
    </script>

### series.markers `Object`

Marker options.

**Applicable to area and line series**


<div class="meta-api-description">
How do I customize the appearance of data point markers in Kendo UI for jQuery sparkline series? Control and customize the visibility, size, color, shape, and border style of data point markers in compact area and line charts to highlight key values, emphasize individual points, or improve clarity and readability of sparkline visualizations by configuring how markers appear on series lines or areas in minimal chart spaces.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            markers: {
                visible: true,
                background: "blue",
                size: 8,
                type: "circle"
            }
        }]
    });
    </script>

### series.markers.background `String|Function`

The background color of the current series markers.


<div class="meta-api-description">
How do I change the background color of markers in a Kendo UI sparkline series? Customize or configure the fill color, background color, or highlight color for data point markers in a sparkline chart series to emphasize or distinguish specific points, control marker visibility and style, set marker backgrounds to match branding or design, enable or change marker colors dynamically, adjust marker fills for better data presentation, and ensure clear visual emphasis on key series points within small inline charts or graphs.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            markers: {
                visible: true,
                background: "green"
            }
        }]
    });
    </script>

### series.markers.border `Object|Function`

The border of the markers.


<div class="meta-api-description">
How do I customize the border around data point markers in a Kendo UI sparkline chart? Adjust or configure the outline, stroke, or border thickness and color around data point markers in sparkline charts to enhance marker visibility, edge definition, contrast, and styling. Control the appearance of marker edges by setting border properties for series markers to customize chart readability and highlight individual points with distinct outlines for better data presentation and visual clarity on sparklines.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            markers: {
                visible: true,
                border: {
                    color: "red",
                    width: 2
                }
            }
        }]
    });
    </script>

### series.markers.border.color `String|Function`*(default: "black")*

 The color of the border.


<div class="meta-api-description">
How to change the border color of sparkline markers? Set or customize the outline color, stroke color, or border shade of data point markers in a sparkline chart to enhance visibility, emphasize individual series markers, define marker edges, adjust marker border styling, configure marker outlines for series data points, control marker perimeter color, or modify sparkline marker borders for improved chart readability and visual distinction.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            markers: {
                visible: true,
                border: {
                    color: "blue"
                }
            }
        }]
    });
    </script>

### series.markers.border.width `Number|Function`*(default: 0)*

 The width of the border.


<div class="meta-api-description">
How do I adjust the border width of marker outlines in a Kendo UI Sparkline chart? Adjust and configure the thickness, size, or width of marker outlines or borders within sparkline charts to enhance visual clarity, emphasis, or contrast. Control the marker border line thickness, set the stroke width of markers, modify outline size for markers in a data series, and customize border thickness to make markers stand out more prominently or appear subtle in sparkline visualizations. Enable fine-tuning of marker edge width to improve marker visibility or styling by changing border thickness on data point markers.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            markers: {
                visible: true,
                border: {
                    width: 3
                }
            }
        }]
    });
    </script>

### series.markers.size `Number|Function`*(default: 6)*

 The marker size.


<div class="meta-api-description">
How can I adjust the size of data point markers in a Kendo UI sparkline chart? Control and adjust the pixel dimensions or diameter of data point markers in a sparkline chart to enhance visibility, emphasize specific series points, customize marker scale, set the exact size for each marker, increase or decrease marker prominence, configure marker radius or width for optimal clarity, and fine-tune the visual representation of individual data points by specifying marker size using numeric pixel values.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            markers: {
                visible: true,
                size: 12
            }
        }]
    });
    </script>

### series.markers.type `String|Function`*(default: "circle")*

Configures the markers shape type.


<div class="meta-api-description">
How to customize marker types in Kendo UI for jQuery sparkline series? Configure or customize the shape and style of data point markers in a sparkline or mini chart by setting marker types such as circle, square, triangle, diamond, or other shapes to highlight, emphasize, or differentiate series values visually. Control marker appearance for data visualization, trend analysis, and value emphasis by selecting specific marker formats or symbols to improve clarity and readability in line charts, sparklines, or series plots. Adjust, enable, or modify marker shapes to suit design preferences, enhance data point distinction, or tailor the visual representation of series data across various charting, graphing, or analytics components.
</div>

#### *"square"*

The marker shape is square.

#### *"triangle"*

The marker shape is triangle.

#### *"circle"*

The marker shape is circle.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            markers: {
                visible: true,
                type: "triangle"
            }
        }]
    });
    </script>

### series.markers.visible `Boolean|Function`*(default: false)*

 The markers visibility.


<div class="meta-api-description">
How to hide markers in a Kendo UI Sparkline series? Enable or disable the display of data point symbols or markers on a sparkline series to highlight individual values or emphasize specific points within a line or area chart; control visibility of series markers to customize appearance, toggle markers for better data clarity or minimalism, show or hide point indicators for emphasizing trends or specific measurements, adjust marker rendering during data binding, updating, or styling operations, and configure marker visibility to enhance visual analysis or simplify sparkline presentations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            markers: {
                visible: true
            }
        }]
    });
    </script>

### series.markers.rotation `Number|Function`

The rotation angle of the markers.


<div class="meta-api-description">
How do I rotate data point markers in a Kendo UI Sparkline chart? Set or adjust the angle of rotation for data point markers in a sparkline chart, enabling control over marker orientation, tilt, or spin to highlight specific points, customize the visual style of markers, create angled or rotated marker shapes, align markers with design elements, or enhance the clarity and aesthetics of chart data points by changing their direction or alignment.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            markers: {
                visible: true,
                type: "triangle",
                rotation: 45
            }
        }]
    });
    </script>

### series.missingValues `String`

The behavior for handling missing values. The supported values are:

* "gap" - the plot stops before the missing point and continues after it.
* "interpolate" - the value is interpolated from neighboring points.
* "zero" - the value is assumed to be zero.

> The default value is "interpolate", except for "area" and stacked series which default to "zero".

> The `missingValues` option is supported when [series.type](/api/javascript/dataviz/ui/sparkline#configuration-series.type) is set to "area", "line", "scatterLine", "radarLine", "radarArea", "polarLine" or "polarArea".


<div class="meta-api-description">
How to handle missing data points in Kendo UI Sparkline series? Control handling of missing or null data points in time series or chart data by configuring whether to skip gaps, interpolate values between existing points, or treat absent entries as zero; adjust how line, area, scatter, radar, or polar charts fill missing values to avoid breaks or discontinuities, apply smoothing or zero-filling techniques, manage gaps in series visualization, and customize plotting behavior to accommodate incomplete datasets in various chart types where series data may be partial or have null entries.
</div>

#### Example - set the missing values behavior
    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [ {
        type: "line",
        missingValues: "gap",
        data: [1, 3, null, 4, 5]
      }]
    });
    </script>

### series.style `String` *(default: "normal")*

The supported values are:

* "normal" - The values will be connected with straight line.
* "step" - The values will be connected with a line with right angle.
* "smooth" - The values will be connected with a smooth line.

> The default value is "normal".

> The `style` option is supported when [series.type](/api/javascript/dataviz/ui/sparkline#configuration-series.type) is set to "line".


<div class="meta-api-description">
How can I customize the line style between data points in a Kendo UI Sparkline series? Adjust or configure the method for connecting data points in a line series to customize the interpolation style between points, including options for straight lines, stepped right-angle connectors, or smooth curved transitions, enabling control over line appearance and flow in charts or sparklines for better data visualization and presentation.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            style: "smooth"
        }]
    });
    </script>

### series.negativeColor `String`

Color to use for bars with negative values.

**Applicable only to bar and column series.**


<div class="meta-api-description">
How to change the color of negative values in a Kendo UI sparkline? Control and customize the color used specifically for negative values or bars in data visualizations like sparklines or column charts, enabling clear differentiation and emphasis of negative data points through setting or configuring alternate fill colors, negative data highlighting, bar coloring, conditional color adjustments for values below zero, and customizing appearance for improved readability and visual contrast within bar or column series components.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, -5, 8, -12],
            negativeColor: "red"
        }]
    });
    </script>

### series.opacity `Number`

The series opacity.


<div class="meta-api-description">
How do I adjust the transparency of individual series in a Kendo UI sparkline? Adjust the transparency level or opacity of chart series to make individual data lines or bars fully visible, semi-transparent, or completely hidden by setting numeric values typically between 0 and 1, enabling fine control over the visual prominence and layering of multiple data series in sparklines or mini charts, useful for highlighting, fading out, blending, or emphasizing specific series in data visualizations and dashboards.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12],
            opacity: 0.7
        }]
    });
    </script>

### series.overlay `Object`

The effects overlay.


<div class="meta-api-description">
How can I customize the visual effect layers on my sparkline series in Kendo UI for jQuery? Configure and control visual overlays on data series by enabling customizable effect layers that appear above sparkline graphs, allowing you to adjust, replace, or enhance default series visuals with overlays that highlight, emphasize, or embellish data trends for improved readability, styling, and presentation in sparklines.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12],
            overlay: {
                gradient: "glass"
            }
        }]
    });
    </script>

### series.overlay.gradient `String`

The gradient name.

Available options:

***glass**(bar and column series)
***roundedBevel**(pie series)
***sharpBevel**(pie series)
***none**


<div class="meta-api-description">
How can I customize the visual overlay gradients for series in a Kendo UI sparkline? Configure and customize the visual overlay gradients for chart series such as bars, columns, or pie slices by selecting from various gradient styles like glass, rounded bevel, sharp bevel, or no overlay to enhance the appearance and highlight effects in sparklines; control and apply gradient overlays to series elements to achieve different shading, lighting, or styling effects on graphical data representations within charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12],
            overlay: {
                gradient: "glass"
            }
        }]
    });
    </script>

### series.padding `Number`

The padding around the chart (equal on all sides).

**Available for pie series.**


<div class="meta-api-description">
How do I adjust the padding around pie chart slices in a Kendo UI sparkline? Control and customize the outer spacing or margins around pie chart slices in lightweight inline charts by configuring equal padding on all sides, adjusting the blank area surrounding the chart to create more or less distance between the pie slices and the chart boundary without altering slice shapes or label positions, enabling fine-tuned visual spacing in compact pie graphs or mini donut charts embedded in dashboards, reports, or other interfaces.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        series: [{
            data: [10, 15, 8, 12],
            padding: 20
        }]
    });
    </script>

### series.size `Number`

The size (or radius) of the series in pixels.
If not specified, the available space is split evenly between the series.

**Available for only.**


<div class="meta-api-description">
How to set the size of data points in a Kendo UI Sparkline series? Adjust or configure the marker size, radius, or pixel dimensions of data points within a Sparkline chart or series, controlling how large or small each point appears visually; set or modify point radius for series markers, control the spacing or distribution of point sizes when multiple series exist, customize series dot size for better visibility or compactness within sparkline visualizations, and enable precise sizing of individual series points to enhance chart readability or fit specific design requirements.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        series: [{
            data: [10, 15, 8, 12],
            size: 150
        }]
    });
    </script>

### series.startAngle `Number`*(default: 90)*

The start angle of the first segment.

**Available for pie series.**


<div class="meta-api-description">
How do I adjust the starting point of pie slices in a Kendo UI Sparkline? Control and adjust the initial rotation angle of the first slice in a pie chart or pie series to set where the chart begins its drawing, enabling customization of slice placement, orientation, label alignment, and legend positioning. Configure or set the start rotation to shift the starting point of pie segments, rotate slices for better visual alignment, and fine-tune the display of chart elements. This feature supports precise control over the initial angular offset of pie slices, useful for adjusting presentation, emphasis on specific data segments, or matching specific design requirements.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        series: [{
            data: [10, 15, 8, 12],
            startAngle: 180
        }]
    });
    </script>

### series.spacing `Number`*(default: 0.4)*

Space between points as proportion of the point width.

**Available for bar and column series.**


<div class="meta-api-description">
How do I adjust the gap between bars in a Kendo UI sparkline chart? Adjust spacing or horizontal gap between bars or columns in a sparkline chart by setting the space between data points as a ratio relative to the width of each bar or column; configure, customize, or control the distance or padding between series elements to optimize visual separation and layout for bar and column data series in inline charts and mini graphs.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12],
            spacing: 0.8
        }]
    });
    </script>

### series.stack `Boolean|String|Object` *(default: false)*

A Boolean value indicating if the series should be stacked.
A string value is interpreted as [series.stack.group](/api/javascript/dataviz/ui/sparkline#configuration-series.stack.group).

> The `stack` options is supported when [series.type](/api/javascript/dataviz/ui/sparkline#configuration-series.type) is set to "bar", "column", "line", "area", "verticalLine", "verticalArea", "radarLine", "radarArea" and "radarColumn".

> Stack settings of the first series are applied to the rest of the series.


<div class="meta-api-description">
How do I enable stacked display in Kendo UI for jQuery Sparkline series? Control stacking of multiple data series in sparklines to visually combine values by enabling or disabling stacked display, using true/false or specifying a stack group identifier. Configure whether bars, columns, lines, areas, vertical lines or areas, radar lines, radar areas, and radar columns are layered on top of each other to create cumulative, grouped, or overlaid charts. Adjust stack grouping to synchronize series stacking behavior, allowing seamless aggregation or separation of series for comparing totals, trends, or distributions in compact inline charts. Enable stack mode to overlay series intensities and visually sum series values for clearer comparative analysis within sparkline visualizations.
</div>

#### Example - configure stack series

    <span id="sparkline"></span>
    <script>
    $("#sparkline").kendoSparkline({
      series: [
        { stack: true, data: [ 1, 2 , 3] },
        { data: [ 4, 5 , 6] }
      ]
    });
    </script>

### series.stack.type `String` *(default: "normal")*

The type of stack to plot. The following types are supported:

* "normal" - the value of the stack is the sum of all points in the category (or group)
* "100%" - the value of the stack is always 100% (1.00). Points within the category (or group) are represented as percentages.


<div class="meta-api-description">
How do I configure my stacked sparkline chart to show absolute totals instead of relative percentages? Configure stacking behavior for charts to control how multiple series combine and display values within grouped categories, enabling either absolute stacked totals where each segment sums up to the cumulative value or relative stacking where segments represent proportions as percentages of the total 100%, allowing customization of data visualization to show raw sums or normalized percentage distributions for better comparison of parts within whole groups.
</div>

#### Example - configure 100% stacked series

    <span id="sparkline"></span>
    <script>
    $("#sparkline").kendoSparkline({
      series: [
        { stack: { type: "100%" }, data: [ 1, 2 ] },
        { data: [ 10, 20 ] }
      ]
    });
    </script>

### series.stack.group `String`

Indicates that the series should be stacked in a group with the specified name.

> The `group` option is supported when [series.type](/api/javascript/dataviz/ui/sparkline#configuration-series.type) is set to "bar" or "column".


<div class="meta-api-description">
How do I stack bar series in a Kendo UI Sparkline using named groups? Control grouping and stacking of bar or column series by assigning them to specific named stacks that accumulate values together, enabling combined visual representation of multiple series whose data should be aggregated vertically or horizontally in sparkline charts, allowing configuration of stacked groups for comparing cumulative totals, setting series stacking groups, enabling multi-series stack grouping, and organizing columns or bars into cohesive stacks for clearer trend or distribution analysis.
</div>

#### Example - configure stack groups

    <span id="sparkline"></span>
    <script>
    $("#sparkline").kendoSparkline({
      seriesDefaults: {
        type: "column"
      },
      series: [
        { stack: { group: "a" }, data: [ 1, 2 ] },
        { stack: { group: "a" }, data: [ 3, 4 ] },
        { stack: { group: "b" }, data: [ -1, -2 ] },
        { stack: { group: "b" }, data: [ -3, -4 ] }
      ]
    });
    </script>

### series.tooltip `Object`

The data point tooltip configuration options.


<div class="meta-api-description">
How do I customize the tooltips for individual series points in a Kendo UI sparkline chart? Control and customize data point tooltips for sparkline charts by configuring content display, formatting styles, visibility toggles, position settings, and template customization to define how and when tooltips appear on individual series points. Enable precise control over tooltip text, appearance, dynamic positioning, conditional visibility, and format adjustments for data highlights and user interactions, ensuring tooltips present relevant, well-formatted information in sparkline visualizations, supporting use cases involving interactive chart exploration, hover states, custom labels, and responsive tooltip behavior.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            tooltip: {
                visible: true,
                background: "yellow",
                color: "black"
            }
        }]
    });
    </script>

### series.tooltip.background `String`

The background color of the tooltip. The default is determined from the series color.


<div class="meta-api-description">
How do I change the background color of a sparkline series tooltip in Kendo UI for jQuery? Configure and customize the tooltip background color for sparkline chart series to enhance visibility, ensure optimal contrast, and align with branding guidelines in popup tooltips. Control, set, or adjust the fill color behind tooltip text using CSS color values, including hex codes, RGBA, or named colors, to create distinctive hover or focus states. Enable color overrides for tooltip backgrounds apart from default series colors, improving clarity in data visualization popups. Modify or change tooltip backgrounds for specific series in sparklines to match themes, improve readability, or highlight key data points in user interfaces and dashboards.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            tooltip: {
                visible: true,
                background: "lightblue"
            }
        }]
    });
    </script>

### series.tooltip.border `Object`

The border configuration options.


<div class="meta-api-description">
How do I customize the border of a sparkline series tooltip in Kendo UI for jQuery? Customize and configure the tooltip border around data points in a sparkline series by setting color, thickness, style, and appearance options to control how the tooltip outline looks and behaves during rendering. Enable or adjust border properties to tailor the visual emphasis of tooltips on chart series points, including modifying stroke width, border color, and line style for hover or active states, ensuring clear boundary definition and improved tooltip visibility in sparkline charts. Adjust border styling to fit UI themes, enhance readability, or highlight specific data points dynamically, supporting varied design requirements and interactive data visualization behaviors.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            tooltip: {
                visible: true,
                border: {
                    color: "red",
                    width: 2
                }
            }
        }]
    });
    </script>

### series.tooltip.border.color `String`*(default: "black")*

The color of the border.


<div class="meta-api-description">
How do I change the border color of tooltips in a Kendo UI sparkline chart? Adjust or configure the border color around data point tooltips on sparkline charts to customize visual highlights for series information, change the outline hue of hover or focus tooltip boxes on individual series points, set or modify the stroke color framing the tooltip popup for clearer data emphasis, control the appearance and border shade of informational overlays shown when mousing over or selecting series elements, and customize the tooltip border styling during chart initialization for enhanced readability or theming consistency.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            tooltip: {
                visible: true,
                border: {
                    color: "green"
                }
            }
        }]
    });
    </script>

### series.tooltip.border.width `Number`*(default: 0)*

The width of the border.


<div class="meta-api-description">
How do I adjust the border width of tooltips in a Kendo UI Sparkline chart? Adjust, configure, or set the thickness, size, or width of the outline or border surrounding the tooltip displayed for each series in a sparkline chart or mini graph. Control how bold, thin, or prominent the tooltip border appears when hovering or focusing on data points within a sparkline, enabling customization of the tooltip’s edge to enhance visibility, styling, or user interface clarity in compact charts. Modify the numeric value representing the border’s thickness to optimize tooltip presentation, including scenarios involving tooltip highlight, series data emphasis, or visual boundary adjustments in inline or micro charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            tooltip: {
                visible: true,
                border: {
                    width: 3
                }
            }
        }]
    });
    </script>

### series.tooltip.color `String`

The text color of the tooltip. The default is the same as the series labels color.


<div class="meta-api-description">
How do I change the color of tooltips in a Kendo UI Sparkline series? Customize the text color of point tooltips within a Sparkline series by configuring the label appearance to override default colors, using any valid CSS color format such as hex codes, RGB values, or named colors. Adjust tooltip text styling to enhance readability or match design themes, control label color settings dynamically for data points, and set or change tooltip font hues independently from the series label colors to improve visual clarity in charts, graphs, or inline data displays.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            tooltip: {
                visible: true,
                color: "red"
            }
        }]
    });
    </script>

### series.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.


<div class="meta-api-description">
How to customize the font in sparkline series tooltips with Kendo UI? Control and customize the tooltip text appearance in sparkline series by setting font styles including font family, size, weight, and style through CSS font strings like "12px Arial", enabling precise adjustment of tooltip text rendering, styling, typography, and text formatting for enhanced visualization and readability in data charts and mini-graphs.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            tooltip: {
                visible: true,
                font: "16px Arial"
            }
        }]
    });
    </script>

### series.tooltip.format `String`

The tooltip format. Format variables depend on the series type:

* Area, bar, column, line and pie
    *  **0**- value


<div class="meta-api-description">
How can I customize the tooltip format in a Kendo UI sparkline series? Customize and control the display of tooltip text for individual data points within a sparkline or mini chart series by setting formats, templates, or patterns that specify how values, labels, and placeholders appear on hover or focus. Enable fine-grained formatting using placeholder variables or tokens that dynamically represent data values, aggregate metrics, or series-specific information, allowing formatting of numeric values, percentages, or categories depending on the chart type such as line, area, bar, column, or pie. Configure the tooltip content presentation to suit different use cases including concise value display, detailed breakdowns, or tailored textual information that corresponds to the data visualization and enhances readability and user understanding during data exploration or interaction.
</div>

#### Example

    //sets format of the tooltip
    format: "{0:C}--{1:C}"

### series.tooltip.padding `Number|Object`

The padding of the tooltip.


<div class="meta-api-description">
How to adjust the padding inside Sparkline series tooltips in Kendo UI for jQuery? Adjust the inner spacing inside Sparkline series tooltips by configuring the padding that defines how much space surrounds the tooltip content and separates it from the tooltip border, enabling control over tooltip margins for better readability, visual balance, and layout customization. Modify or set the distance between tooltip text and edges to enhance clarity, prevent crowding, and refine the appearance of hover information on Sparkline charts, supporting flexible spacing adjustments to optimize user interface and tooltip display.
</div>

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }

### series.tooltip.template `String|Function`

The tooltip template.
Template variables:

*  **value**- the point value (either a number or an object)
*  **category**- the category name
*  **series**- the data series
*  **dataItem**- the original data item used to construct the point.
        Will be null if binding to array.


<div class="meta-api-description">
How to customize sparkline tooltip display in Kendo UI for jQuery? Customize or configure the display of tooltips for individual points in a sparkline chart by setting a template that controls how details like numeric values, categories, series names, or underlying data objects are presented. Enable detailed formatting or dynamic content in small inline charts by defining templates that can reference point values, categories, series metadata, and original source data items, allowing flexible labeling, value transformation, or contextual information display within the tooltip. This supports scenarios such as showing custom text, combining multiple data fields, adjusting formatting based on data type, or integrating relevant data properties for enhanced user interaction and clarity in sparkline visualizations.
</div>

#### Example

    $("#sparkline").kendoSparkline({
         series: [{
             type: "area",
             data: [200, 450, 300, 125],
             tooltip: {
                 visible: true,
                 template: "#= value #"
             }
         }]
    });

### series.tooltip.visible `Boolean`*(default: true)*

 A value indicating if the tooltip should be displayed.


<div class="meta-api-description">
How to make tooltips visible in Kendo UI Sparkline series? Control the visibility of tooltips on individual data points within a sparkline or mini-chart series, enabling users to toggle, show, hide, enable, or disable hover or focus popups that display detailed information for each series point. Adjust configurations to manage tooltip display behavior for sparkline data series, customizing whether informational popups appear when hovering, tapping, or interacting with chart points to provide dynamic feedback, context, or data insights during visualization.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            tooltip: {
                visible: false
            }
        }]
    });
    </script>

### series.width `Number`*(default: 0.5)*

The line width.

**Available for line series**


<div class="meta-api-description">
How do I adjust the line thickness of a sparkline chart in Kendo UI for jQuery? Adjust line thickness, stroke weight, or width for sparkline charts to make the lines bolder, thinner, or visually lighter, controlling how thick or thin the sparkline’s line series appears. Configure, set, or customize the rendered line width or stroke size for line-based sparklines, affecting the visual emphasis and clarity of the trend line on initialization or rendering. Enable developers to modify the line stroke thickness for sparkline line series to enhance visibility, line weight, or stylistic preferences in small inline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            width: 3
        }]
    });
    </script>

### series.target `Object`

The target of the bullet chart.


<div class="meta-api-description">
How to set a target value for series visualization in Kendo UI sparkline charts? Define or configure a benchmark, goal, or target value for series visualization in bullet charts, enabling clear comparison and highlighting of how the data series measures against predetermined objectives, thresholds, or reference points. This setting controls the placement of target markers in sparkline or bullet chart components, helping users track progress, performance goals, reference values, or key metrics by visually contrasting series measurements with specified targets or goals.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "bullet",
        series: [{
            data: [10, 15, 8, 12],
            target: {
                line: {
                    width: 2
                },
                color: "red"
            }
        }]
    });
    </script>

### series.target.line `Object`

The target line.


<div class="meta-api-description">
How do I customize the appearance of the target indicator line in a Kendo UI sparkline chart? Customize and control the appearance of a target indicator line in sparkline charts by setting options for visibility, color, thickness, dash patterns, and styling to emphasize goal values or benchmarks within data series, enabling configurations for highlight lines, reference markers, target thresholds, and guiding line visualization in compact trend graphics.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "bullet",
        series: [{
            data: [10, 15, 8, 12],
            target: {
                line: {
                    width: 3
                }
            }
        }]
    });
    </script>

### series.target.line.width `Object|Function`

The width of the line.


<div class="meta-api-description">
How do I adjust the thickness of target lines in a Kendo UI sparkline chart? Control and customize the thickness or stroke width of indicator or target lines within sparkline charts by setting numeric pixel values that adjust line weight, enabling developers to increase, decrease, or fine-tune the visual prominence of target markers or reference lines for data comparison, highlighting specific thresholds or goals, and enhancing chart readability and emphasis.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "bullet",
        series: [{
            data: [10, 15, 8, 12],
            target: {
                line: {
                    width: 4
                }
            }
        }]
    });
    </script>

### series.target.color `String|Function`

The target color.


<div class="meta-api-description">
How do I change the color of target indicators in a Kendo UI sparkline? Customize and control the color of target indicators, threshold lines, or markers within sparklines to highlight key target values distinctly from other data points, enabling setting and configuring visual emphasis through any CSS-compatible color formats such as hex codes, RGB, RGBA, or named color values to enhance clarity in data visualization and differentiate targets in trend lines or mini charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "bullet",
        series: [{
            data: [10, 15, 8, 12],
            target: {
                color: "green"
            }
        }]
    });
    </script>

### series.target.border `Object|Function`

The border of the target.


<div class="meta-api-description">
How do I customize the border of target points in a Kendo UI sparkline series? Customize or control the outline, stroke color, width, and dash style of target points or markers within a sparkline or mini chart series to highlight, emphasize, or visually match specific data targets or indicators, enabling tailored border styling for key reference markers in compact trend visualizations, configuring the look and feel of target outlines to fit design requirements or improve visual distinction in sparkline data representations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "bullet",
        series: [{
            data: [10, 15, 8, 12],
            target: {
                border: {
                    color: "blue",
                    width: 2,
                    dashType: "dash"
                }
            }
        }]
    });
    </script>

### series.target.border.color `String|Function`*(default: "black")*

The color of the border.


<div class="meta-api-description">
How do I customize the border color of target markers in a Kendo UI Sparkline series? Control and customize the outline or stroke color for data series targets within sparklines, enabling clear visual emphasis on markers, hover effects, selection highlights, or focused points in small inline charts. Configure or set the border color for specific series targets to enhance contrast, visibility, or styling of target indicators, outlines, or edges in compact data visualizations, allowing fine-tuning of marker borders for dynamic interactive states or default appearance in sparkline components.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "bullet",
        series: [{
            data: [10, 15, 8, 12],
            target: {
                border: {
                    color: "red"
                }
            }
        }]
    });
    </script>

### series.target.border.dashType `String|Function`*(default: "solid")*

The dash type of the border.


<div class="meta-api-description">
How to customize the border dash pattern for target outlines in a Kendo UI sparkline chart? Customize the border dash pattern for target outlines in sparkline charts by setting the stroke style to solid, dashed, dotted, or various dash sequences, enabling styling of the series target border appearance, controlling the border line type or pattern for target indicators in sparklines, and adjusting the visual representation of the target boundary with different dash effects or line textures for enhanced chart customization.
</div>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "bullet",
        series: [{
            data: [10, 15, 8, 12],
            target: {
                border: {
                    dashType: "dash",
                    color: "red",
                    width: 2
                }
            }
        }]
    });
    </script>

### series.target.border.width `Number`*(default: 0)*

The width of the border.


<div class="meta-api-description">
How to set the border width of target markers in Kendo UI Sparkline? Adjust the thickness, stroke width, or outline size of a series target marker border in sparklines by setting a numeric value to control how thick or thin the marker's edge appears. Enable, configure, or customize the border width to emphasize or de-emphasize target markers visually within compact line or area charts, controlling the marker outline thickness for clarity, highlight, or styling purposes during chart setup or rendering.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "bullet",
        series: [{
            data: [10, 15, 8, 12],
            target: {
                border: {
                    width: 3
                }
            }
        }]
    });
    </script>

### series.notes `Object`
The series notes configuration.


<div class="meta-api-description">
How to customize note markers and labels for individual data points in a Kendo UI Sparkline series? Control annotations on individual chart data points by configuring note markers and labels, including visibility toggles, positioning options, custom text or icons, template usage, and styling details for highlighting or labeling specific values in small inline charts or sparklines. Enable or set series-level notes to emphasize particular data points with customized markers, icons, labels, or tooltips, adjusting how and where notes appear for better data storytelling, readability, or visual cues during initialization or dynamic updates. Optimize data visualization by managing series annotations that highlight trends, outliers, or important metrics with flexible styling, content, and layout control in sparkline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                icon: {
                    background: "orange"
                }
            }
        }]
    });
    </script>

### series.notes.icon `Object`
The icon of the notes.


<div class="meta-api-description">
How do I customize the appearance of note markers in a Kendo UI Sparkline series? Control and customize the appearance of note markers on data series points in sparklines by setting or configuring icons, including using classes, images, markup, or configuration objects to change the icon’s size, shape, graphic style, or visual representation for annotations and notes on chart points. This enables adjusting note indicators, annotations, or markers with flexible icon settings to enhance visualization clarity or branding for series data highlights.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                icon: {
                    background: "red",
                    size: 16,
                    type: "circle",
                    border: {
                        color: "black",
                        width: 1
                    }
                }
            }
        }]
    });
    </script>

### series.notes.position `String`
The position of the series note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.


<div class="meta-api-description">
How do I position notes in a Kendo UI sparkline chart? Adjust or configure the placement of annotations or labels associated with data points in a sparkline chart by setting their orientation relative to the specific point, such as positioning notes above, below, to the left, or to the right of the plotted value to improve readability, highlight key data insights, or customize the visual layout for better presentation and analysis.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                position: "top",
                data: [{
                    value: 15,
                    text: "Peak Value"
                }]
            }
        }]
    });
    </script>

### series.notes.icon.background `String`
The background color of the notes icon.


<div class="meta-api-description">
How do I change the background color of note icons in a Kendo UI sparkline series? Adjust or configure the fill color, background shade, or color theme of note icons within a sparkline data series, allowing customization of the icon's visual backdrop using any valid CSS color format such as hexadecimal, RGB, RGBA, or named colors. Enable setting or changing the note icon background during chart or sparkline setup to highlight, style, or differentiate data points, notes, or annotations in sparkline charts by modifying their icon background colors, backgrounds, or fills for enhanced visual emphasis or branding consistency.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                icon: {
                    background: "lightblue"
                }
            }
        }]
    });
    </script>

### series.notes.icon.border `Object`
The border of the icon.


<div class="meta-api-description">
How do I customize the border of note icons in a Kendo UI Sparkline series? Adjust or set the outline styling of small data point markers within a sparkline chart by controlling the border color, thickness, dash style, stroke pattern, and various edge or outline effects for note icons linked to data series. Enable customization of the note marker frames to highlight, differentiate, or emphasize specific data points with precise control over the icon’s contour, edge styling, stroke dash types, and color attributes. Configure visual boundaries around note indicators to enhance chart readability, apply distinct border patterns, thickness settings, and color changes for clearer data annotations or callouts in compact trend lines.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                icon: {
                    border: {
                        color: "red",
                        width: 2
                    }
                }
            }
        }]
    });
    </script>

### series.notes.icon.border.color `String`
The border color of the icon.


<div class="meta-api-description">
How do I change the color of the border around note icons in a Kendo UI Sparkline series? Customize the outline color of note markers on a Sparkline chart by setting the border color for series note icons using any standard CSS color format such as hex codes, RGB, RGBA, or named colors. Control, configure, or style the stroke color around the note icon to highlight or differentiate data points, annotations, or callouts in your Sparkline series with vivid or subtle border hues. Adjust, set, or enable the icon’s border color for better visual emphasis on series notes, making it easy to match themes, improve visibility, or follow design guidelines during chart initialization or dynamic updates.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                icon: {
                    border: {
                        color: "green",
                        width: 2
                    }
                }
            }
        }]
    });
    </script>

### series.notes.icon.border.width `Number`
The border width of the icon.


<div class="meta-api-description">
How to set the border width of an annotation icon in a Kendo UI sparkline series? Control and customize the thickness, size, or edge width of annotation icons or note outlines in inline chart series, enabling adjustment of the border line weight or frame thickness around note markers to enhance visibility, styling, or emphasis in sparkline visualizations. Configure or set the icon border width to define how bold, thin, or prominent the outline appears for note symbols attached to data points, improving clarity and design consistency in chart annotations and series markers. Adjust border thickness to modify the appearance of note icons on small, embedded charts for better highlighting or subtle emphasis depending on styling preferences or UI requirements.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                icon: {
                    border: {
                        color: "red",
                        width: 3
                    }
                }
            }
        }]
    });
    </script>

### series.notes.icon.size `Number`
The size of the icon.


<div class="meta-api-description">
How to change the size of note icons in Kendo UI Sparkline series? Adjust the dimensions, scale, or size of note icons displayed on data points within sparkline charts or small inline graphs, enabling customization of the visual appearance of annotation markers or series notes. Control, set, configure, or change the icon size to make note markers larger or smaller for better visibility or fitting design requirements in time series, trend lines, or data visualization elements. This detail customizes how note markers attached to series data points appear, helping to highlight, emphasize, or label specific values on compact charts or graphs.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                icon: {
                    size: 20
                }
            }
        }]
    });
    </script>

### series.notes.icon.type `String` *(default: "circle")*
The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.
* "cross" - the marker shape is cross.


<div class="meta-api-description">
How do I customize the shape of note icons in a Kendo UI Sparkline chart? Configure or customize the shape of note icons or markers in a Sparkline chart, selecting from various geometric styles such as circular, square, triangular, or cross-shaped markers to highlight data points or annotations; control the visual indicator style for notes, set marker geometry for annotations, change the icon form for note markers in sparklines, choose different note marker shapes for emphasis or distinct visualization, and specify the note symbol appearance in small inline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                icon: {
                    type: "square"
                }
            }
        }]
    });
    </script>

### series.notes.icon.visible `Boolean` *(default: "true")*
The icon visibility.


<div class="meta-api-description">
How to show annotation icons in Kendo UI sparkline chart series? Control the visibility of annotation icons in sparkline charts by configuring whether note markers or symbols appear on data points, enabling or disabling the display of series notes, toggling icons for series annotations, showing or hiding note indicators on sparklines, adjusting chart marker visibility for annotations, and setting boolean flags to manage the presence of note icons within sparkline series data visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                icon: {
                    visible: false
                }
            }
        }]
    });
    </script>

### series.notes.label `Object`
The label of the notes.


<div class="meta-api-description">
How do I customize the labels for notes on a Sparkline series? Control or customize the text content displayed next to notes or markers on a data series within a sparkline chart, including setting static labels or dynamic values that appear with series annotations, configuring note labels for better data highlighting, enabling descriptive tags or markers on series points, adjusting the annotation text for clarity, and binding data-bound text to series notes for improved chart context and user readability.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    background: "yellow",
                    color: "black",
                    font: "12px Arial"
                }
            }
        }]
    });
    </script>

### series.notes.label.background `String`
The background color of the label. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
How to customize the background color of note labels in Kendo UI sparklines? Control or customize the fill color behind note labels on series data points within sparklines, adjusting the background hue of annotations, highlights, or callouts to enhance visibility or match design themes. This setting supports any valid CSS color input such as hex codes, RGB, or named colors, enabling developers to style note label backdrops on mini charts, inline data visuals, or compact trend indicators with precision and flexibility. Modify, configure, or set the label background color for series notes to improve readability, emphasize important data points, or conform to branding requirements in graphical data representations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    background: "lightgreen"
                }
            }
        }]
    });
    </script>

### series.notes.label.border `Object`
The border of the label.


<div class="meta-api-description">
How to customize the border of annotation labels in a Kendo UI Sparkline chart? Control and customize the outline or border of annotation labels on data points within a Sparkline chart, including setting the border color, width, thickness, style, dash pattern, or stroke properties for note labels attached to series markers or points. Adjust the label border appearance to highlight or differentiate annotation notes, configure the shape and style of label edges on series notes, and fine-tune visual emphasis by modifying properties like color, line thickness, solid or dashed lines for labels connected to series notes or data annotations in small inline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    border: {
                        color: "red",
                        width: 2,
                        dashType: "solid"
                    }
                }
            }
        }]
    });
    </script>

### series.notes.label.border.color `String` *(default: "black")*
The color of the border. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
How do I change the color of note labels in a Kendo UI Sparkline chart? Customize the outline color of annotation labels within compact data trend visualizations by specifying any valid CSS color format such as hex codes, RGB, RGBA, or named colors to control the appearance and styling of note label borders in sparkline charts, enabling fine-tuning of highlight borders, emphasis around text annotations, label outlines, and visual contrast adjustments for annotation emphasis or aesthetic customization in inline chart elements.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    border: {
                        color: "blue"
                    }
                }
            }
        }]
    });
    </script>

### series.notes.label.border.dashType `String` *(default: "solid")*
The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line


<div class="meta-api-description">
How do I style the border of note labels in a Kendo UI Sparkline series? Configure the border line style for note labels in Sparkline series by selecting from various dash patterns such as dashed lines, dotted lines, combinations like dash-dot, long dash, long dash with dot or double dots, or a solid continuous line, enabling control over the outline appearance of annotations, callouts, or markers on the graph with customizable border stroke styles for enhanced visual distinction and styling flexibility across different note label borders.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    border: {
                        dashType: "dash",
                        color: "red",
                        width: 2
                    }
                }
            }
        }]
    });
    </script>

### series.notes.label.border.width `Number` *(default: 0)*
The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.


<div class="meta-api-description">
How do I adjust the border width of label notes in a Kendo UI sparkline series? Adjust or configure the thickness, width, size, or pixel value of the outline, stroke, or border around labels or annotations within a sparkline chart’s series notes, enabling control over label framing, edge prominence, or highlighting by setting numeric border dimensions for better visual emphasis, clarity, or styling of note label outlines in data visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    border: {
                        width: 3,
                        color: "red"
                    }
                }
            }
        }]
    });
    </script>

### series.notes.label.color `String`
The text color of the label. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
How do I change the color of annotation labels in a Kendo UI sparkline? Customize or configure the text color of annotation labels within tiny inline charts to enhance readability, contrast, and visual styling using any valid CSS color format such as hex codes, RGB values, or color names, enabling precise control over the appearance of note labels in compact data visualizations and sparklines.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    color: "blue"
                }
            }
        }]
    });
    </script>

### series.notes.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*
The font style of the label.


<div class="meta-api-description">
How to customize font style for note labels in Kendo UI Sparkline series? Control and customize the typography of note labels within compact inline charts by configuring font family, size, weight, style, and other text styling properties to fine-tune the appearance of labels attached to data markers or annotations, enabling tailored label visuals in sparklines or small-scale data visualizations with precise font styling for readability, emphasis, or branding purposes.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    font: "16px Arial, sans-serif"
                }
            }
        }]
    });
    </script>

### series.notes.label.template `String|Function`
The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the point value


<div class="meta-api-description">
How do I customize the labels in a Sparkline series note? Customize and control the display of series note labels in Sparklines by defining personalized templates that format and render label content dynamically, enabling developers to set up tailored label markup based on data point values or other series information, configure label appearance during chart initialization, and use template expressions or functions to produce flexible, context-sensitive annotations that reflect data insights, customize labels for specific points or conditions, and support dynamic label content generation in small inline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    template: (data) => `Value: ${data.value}`
                }
            }
        }]
    });
    </script>

### series.notes.label.visible `Boolean` *(default: true)*
If set to `true` the chart will display the series notes label. By default the series notes label are visible.


<div class="meta-api-description">
How to hide data point annotations in a Kendo UI sparkline chart? Configure the display of data point annotations and labels within a sparkline chart's series notes by enabling or disabling the visibility of the note labels, controlling whether textual markers or comments attached to specific data points are shown or hidden, adjusting label presence for clearer visualization, toggling note annotations visibility for focused or simplified views, setting label display on or off for series data highlights, customizing annotation label appearance to emphasize important data notes, showing or suppressing textual notes tied to series data points in compact inline charts, managing visibility settings for note labels that provide context or alerts within sparkline graphs, and controlling whether descriptive tags or labels appear alongside series notes to assist with data interpretation or debugging.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    visible: false
                }
            }
        }]
    });
    </script>

### series.notes.label.rotation `Number` *(default: 0)*
The rotation angle of the label. By default the label are not rotated.


<div class="meta-api-description">
How can I rotate sparkline series notes labels to prevent overlap in tight spaces? Adjust the angle or orientation of small annotation labels on a data series in sparklines, enabling developers to set custom rotation degrees for note text to improve readability, prevent overlap, and enhance visual clarity in charts; this is useful for configuring label alignment, tilting text to fit tight spaces, controlling note label direction, or customizing how annotations appear on sparkline series data points.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    rotation: 45
                }
            }
        }]
    });
    </script>

### series.notes.label.format `String` *(default: "{0}")*
The format used to display the notes label. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the axis value.


<div class="meta-api-description">
How do I customize the display format of annotation labels in a Kendo UI sparkline chart? Customize the display format of annotation labels in sparkline charts by setting formatting patterns that define how axis values appear within note text, enabling precise control over number, date, or custom string presentations using placeholder-based templates; adjust, set, or configure label text styles to control data point notes, tooltip-like annotations, or inline markers with flexible formatting strings supporting localization, numeric precision, currency, percentages, or date-time formats for enhanced chart data readability and presentation.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    format: "Value: {0}"
                }
            }
        }]
    });
    </script>

### series.notes.label.position `String` *(default: "inside")*
The position of the labels.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.


<div class="meta-api-description">
How to position note labels for series in Kendo UI sparklines? Adjust or configure the placement of note labels for data series in sparklines by setting the label position relative to the note icon, enabling options to position the label inside the icon area or outside it for clearer annotation visibility and layout customization, useful for controlling label alignment, placement, and display around data markers in compact charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                label: {
                    position: "outside"
                }
            }
        }]
    });
    </script>

### series.notes.line `Object`
The line of the notes.


<div class="meta-api-description">
How to customize the line style of notes in Kendo UI sparkline charts? Configure the connector line linking data points to their annotations in sparkline charts, controlling the style, visibility, color, thickness, and other visual aspects of the note lines that highlight or emphasize specific data values; enable customization of the notes' connecting lines to improve clarity, adjust appearance, set line properties for annotation connectors, and control how notes are visually attached to data points within sparkline or mini charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                line: {
                    width: 3,
                    color: "red",
                    length: 20
                }
            }
        }]
    });
    </script>

### series.notes.line.width `Number`
The line width of the notes.


<div class="meta-api-description">
How do I adjust the line width of annotation leader lines in a Kendo UI sparkline series? Adjust, configure, or set the thickness, stroke width, or line weight of annotation leader lines or connector lines linked to data point notes, callouts, or series annotations in sparklines to enhance visual clarity, emphasize note connections, improve readability, and customize the appearance of lines linking notes or labels to data points within chart series.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                line: {
                    width: 4
                }
            }
        }]
    });
    </script>

### series.notes.line.color `String`
The line color of the notes.


<div class="meta-api-description">
How do I change the color of note connector lines in a Kendo UI sparkline chart? Set or modify the color of connector lines for annotations or notes within data series to highlight, customize, or match the theme of sparkline charts, enabling control over the visual style, line appearance, and color settings of series note connectors for better differentiation, clarity, or emphasis in chart annotations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                line: {
                    color: "green"
                }
            }
        }]
    });
    </script>

### series.notes.line.length `Number`
The length of the connecting lines in pixels.


<div class="meta-api-description">
How do I adjust the length of connector lines in Kendo UI Sparkline series notes? Adjust the length or pixel size of connector lines linking data points to their notes in sparklines, enabling customization of the spacing or distance between a specific data marker and its annotation. Configure or set the connector line length to control visual clarity, alignment, and note positioning relative to chart points, useful for tweaking note placement, readability, and overlap in compact or dense data visualizations. This setting governs how far the note’s leader line extends from each series data point, allowing developers to manage the pixel distance between markers and their descriptive labels in sparkline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12],
            notes: {
                data: [{
                    value: 15,
                    text: "Peak Value"
                }],
                line: {
                    length: 30
                }
            }
        }]
    });
    </script>

### series.zIndex `Number`
An optional Z-index that can be used to change the default stacking order of series.

The series with the highest Z-index will be placed on top.

Series with no Z-index will use the default stacking order based on series type.
For example line series will be on top with bar and area following below.


<div class="meta-api-description">
How do I control the drawing order of series in a Kendo UI sparkline? Adjust or set the drawing order, layering, or stacking priority of overlapping chart series by configuring their z-index values, controlling which graph elements appear above others in sparklines or mini charts. Manage the overlay sequence when multiple data series intersect, specify custom render order for lines, bars, and areas, and override default stacking to highlight particular series by assigning higher or lower stacking priorities. Enable fine-grained control over visual layering, ordering series rendering precedence, or controlling which series draws on top to improve chart clarity and emphasis in combined or overlapping data visualizations.
</div>

#### Example - Change the series stacking order
    <div id="sparkline"></div>
    <script>
        $("#sparkline").kendoSparkline({
          series: [{
            type: "line",
            zIndex: 1,
            color: "grey",
            data: [1, 2, 1, 1, 2, 1]
          }, {
            type: "line",
            color: "blue",
            zIndex: 3,
            data: [2, 2, 2, 2, 2, 2]
          }, {
            type: "area",
            color: "red",
            zIndex: 2,
            data: [0, 2, 0, 0, 2, 0]
          }]
        });
    </script>

### seriesColors `Array`

The default colors for the chart's series. When all colors are used, new colors are pulled from the start again.


<div class="meta-api-description">
How to customize series colors in Kendo UI sparkline chart? Configure or customize the default color palette for data series in sparkline charts by setting an ordered array of colors that apply to each series sequentially, enabling control over the visual styling of multiple series with automatic cycling through colors when the list is shorter than the number of series, useful for consistent theming, differentiating data lines, and ensuring color reuse in compact or multi-series sparklines.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        seriesColors: ["red", "blue", "green", "orange"],
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults `Object`

Default values for each series.


<div class="meta-api-description">
How do I globally customize the appearance of multiple series in a Kendo UI sparkline chart? Configure default appearance and behavior settings for all data series within a sparkline chart, including setting common visual styles, line types, colors, markers, and interaction options that apply globally to every series unless individually customized. Control the baseline formatting, data point rendering, default styles for series elements, and global series properties to standardize or streamline multi-series presentations, enabling consistent display of trends, patterns, or values across all series while allowing per-series overrides. Adjust default plotting configurations, visualization preferences, and series-wide parameters to manage how sparkline data sequences are rendered, styled, and interacted with by default.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        seriesDefaults: {
            color: "blue",
            line: {
                width: 3
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.area `Object`

The area configuration options.
The default options for all area series. For more details see the series options.


<div class="meta-api-description">
How do I customize default area series behavior in Kendo UI for jQuery sparklines? Set default styling and behavior for all area chart segments within sparklines, including control over area fill, line smoothness, marker display and customization, stacking of multiple area series, and general appearance settings that affect shape, color, transparency, and layout. Enable configuration of common area series parameters like fill opacity, border thickness, point markers visibility, stacking order, and interaction behaviors to uniformly manage how area visuals render and respond across all instances. Adjust foundational area chart properties to influence visual representation and interactivity consistently, supporting customization needs for concise trend visualization, comparative stacking, and marker emphasis in embedded sparkline graphs.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "area",
        seriesDefaults: {
            area: {
                color: "lightblue",
                opacity: 0.7
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.bar `Object`

The default options for all bar series. For more details see the series options.


<div class="meta-api-description">
How do I configure default bar chart settings for all series in a Kendo UI sparkline? Configure default appearance and behavior settings for all bar chart series within a sparkline, including shared properties like bar colors, spacing between bars, tooltip customization, styling options, and visual defaults that apply across every bar data series at initialization. Enable control over common bar chart elements such as fill color, gap width, hover effects, and tooltip display for consistent styling and interaction across multiple bar series in a sparkline visualization, supporting uniform bar formatting and user interface settings without repetitive configuration in individual series. Adjust baseline design parameters affecting all bar segments collectively, ensuring streamlined customization for grouped bar charts in compact sparkline displays.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "bar",
        seriesDefaults: {
            bar: {
                color: "orange",
                border: {
                    width: 1,
                    color: "black"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.border `Object`

The border of the series.


<div class="meta-api-description">
How do I customize the border appearance of series in a Kendo UI Sparkline? Control and customize the outline appearance of data series by setting border color, stroke thickness, and dash patterns to define the visual edge, stroke style, and framing of chart elements; adjust the border styling to enhance visual clarity, differentiate series, or match design themes by configuring properties like line color, width, and dash type commonly used to style series outlines in sparklines and similar charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        seriesDefaults: {
            border: {
                color: "red",
                width: 2,
                dashType: "dash"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.border.color `String`*(default: "black")*

The color of the border.


<div class="meta-api-description">
How to change the color of the border around each series in a Kendo UI Sparkline chart? Configure or set the border color around each data series in a sparkline chart to customize the visual outline, enhance contrast, improve visibility, define series separation, apply branding colors, adjust styling, specify color codes for series borders, highlight specific data series, or control the edge color for individual series within the sparkline visualization.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        seriesDefaults: {
            border: {
                color: "green"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.border.dashType `String`*(default: "solid")*

The dash type of the border.


<div class="meta-api-description">
How to customize the default series border stroke pattern in a Kendo UI sparkline chart? Control and configure the default series border stroke patterns to customize the outline style with options like solid, dashed, dotted, or other dash types for better visual emphasis, border styling, or series differentiation in sparkline charts. Adjust, set, or enable various dash patterns to fine-tune the appearance of series borders, enhance chart visuals, or tailor the border design for clearer data presentation and improved graphical contrast within sparkline components.
</div>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        seriesDefaults: {
            border: {
                dashType: "dash",
                color: "red",
                width: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.border.width `Number`*(default: 0)*

 The width of the border.


<div class="meta-api-description">
How to set default thickness of borders around chart series in Kendo UI Sparkline? Configure the default thickness or stroke width of borders around chart series, adjust or set the line weight for data series outlines, control how thick or thin the edge lines appear on sparkline graphs, specify numeric values to increase or decrease the border size for series rendering, define the default border line width that frames each data series, customize the visual weight of series edges in sparklines, modify the outline thickness used during series drawing, enable precise control of stroke width for seamless border styling on series, set the border thickness for better visibility or subtle outlines in sparkline components, control the graphical border’s line weight applied to all series by default.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        seriesDefaults: {
            border: {
                width: 3,
                color: "blue"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.column `Object`

The column configuration options.
The default options for all column series. For more details see the series options.


<div class="meta-api-description">
How to set default styles for column charts in Kendo UI sparklines? configure default styles and behaviors for all column charts or bar segments within sparklines including base appearance settings, common visual properties, default formatting, and shared column-specific options that apply to every column series by default during initialization; control aspects like default colors, widths, spacing, or display preferences affecting grouped or individual column data series in mini charts, enabling consistent and centralized setup of column-type sparkline series with customizable default visual and functional parameters for streamlined chart rendering and uniform presentation across multiple column series components or data points.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            column: {
                color: "purple",
                border: {
                    width: 1,
                    color: "black"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.gap `Number`*(default: 1.5)*

 The distance between category clusters.


<div class="meta-api-description">
How do I adjust the gap between data points in a compact Kendo UI Sparkline? Adjust the spacing between grouped data points or category clusters in compact charts to control visual density, cluster separation, or point gaps. Configure the distance between data groupings to improve readability, tune the gap size between clusters, and customize the overall layout in sparklines or mini charts. Enable setting, increasing, or decreasing the gap between categories or clustered points to manage chart clarity, spacing, or distribution for better visual grouping and data distinction.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            gap: 0.5
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.labels `Object`

Configures the series data labels.


<div class="meta-api-description">
How to customize labels on Kendo UI for jQuery Sparkline series? Customize and control the display of value labels on sparkline series by configuring their visibility, text content, numeric or string formatting, positioning, and styling. Adjust label appearance with options for colors, fonts, backgrounds, borders, and templates to bind label text dynamically to data values or categories. Enable or disable labels, set their format patterns, position labels around data points, and apply customized label layouts for clear visualization of series data in sparklines. Configure label content and presentation to improve readability and highlight important information within compact sparkline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true,
                background: "yellow",
                color: "black"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.labels.background `String`

The background color of the labels. Any valid CSS color string will work here,
including hex and rgb.


<div class="meta-api-description">
How do I change the background color of labels in a Kendo UI sparkline series? Control and customize the background color behind series labels in sparklines using any valid CSS color format such as named colors, hexadecimal codes, RGB, RGBA, or HSL to enhance visual clarity and distinction of data points. Adjust, configure, or set label background styling to highlight values, improve readability, emphasize specific series information, or differentiate data visually in minimal charts. Enable consistent or dynamic coloring of label backgrounds for clearer data presentation and easier interpretation of trend lines and value markers within sparklines.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true,
                background: "lightblue"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.labels.border `Object`

The border of the labels.


<div class="meta-api-description">
How do I configure the border style for sparkline data point labels using Kendo UI for jQuery? Customize the appearance of sparkline data point labels by configuring the label border style, including setting border color, width, and shape to control the outline of series labels. Enable or adjust label borders for better visibility and design consistency, manage label boundary styling for sparkline charts, and fine-tune label outlines to match your chart’s theme or enhance readability. This covers scenarios of setting default border properties on series labels, modifying label decorations, and controlling label edge appearance within sparklines to ensure clarity, emphasis, or visual separation.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true,
                border: {
                    color: "red",
                    width: 2,
                    dashType: "solid"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.labels.border.color `String`*(default: "black")*

 The color of the border.


<div class="meta-api-description">
How to set default border color for sparkline series labels? Configure the default border color of series labels in sparklines by specifying any CSS-compatible color format such as hexadecimal, RGB, RGBA, or named colors, enabling precise control over label outline appearance for all series labels by default, including initial setup and customization of label borders, outlining styles, and visual enhancements around data labels in sparkline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true,
                border: {
                    color: "green"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.labels.border.dashType `String`*(default: "solid")*

 The dash type of the border.



<div class="meta-api-description">
How do I customize the border style around sparkline series labels? Configure the border stroke style around chart series labels, including options for solid, dashed, dotted, or custom dash patterns to customize label outlines in sparklines or small charts. Control label border dash types for visual customization, styling consistency, or emphasis, enabling flexible appearance adjustments for data label edges in series defaults. Adjust outline dash textures for series label borders to enhance readability, match themes, or highlight data points with different border line styles around chart labels.
</div>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true,
                border: {
                    dashType: "dash",
                    color: "red",
                    width: 2
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.labels.border.width `Number`*(default: 0)*

 The width of the border.


<div class="meta-api-description">
How can I adjust the thickness of data labels' borders in a Kendo UI sparkline chart? Adjust the thickness, size, or width of the outline and border around data labels on sparkline chart series to enhance label visibility, readability, and emphasis by configuring pixel value settings for label border thickness, enabling customization of label edge weight, thickness, or stroke width in chart labeling, controlling how bold or subtle the label borders appear on sparklines, and setting the label outline size for clearer data point annotation and visual distinction.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true,
                border: {
                    width: 3,
                    color: "blue"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.labels.color `String`

The text color of the labels. Any valid CSS color string will work here, including hex
and rgb.


<div class="meta-api-description">
How do I set the default color of data labels in a Kendo UI Sparkline series? Control and customize the default text color of data labels in chart series by setting the label color using any valid CSS color format such as hex codes, RGB, RGBA, HSL, named colors, or CSS variables; this enables configuring label appearance for sparkline or chart series, adjusting label visibility, enhancing contrast, styling label fonts, or theming data labels consistently across all series during initialization or setup.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true,
                color: "red"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.
labels


<div class="meta-api-description">
How do I customize the font style of series labels in a Kendo UI sparkline? Customize and control the typography, font style, font family, font size, font weight, and font appearance of series labels in a sparkline or small inline chart, enabling adjustment of label text styling and formatting for better readability and visual consistency; configure how series label fonts appear by setting font attributes like boldness, italics, and font type for enhanced data label presentation in sparklines or line mini-charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true,
                font: "16px Arial, sans-serif"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.labels.format `String`

The format of the labels.


<div class="meta-api-description">
How do I customize the format of series labels in a Kendo UI sparkline? Configure the display format for series labels to customize how numeric, date, percentage, or currency values appear on sparklines, enabling precise control over label text representation, including number formatting, date styles, percentage precision, currency symbols, and custom format strings to enhance readability and presentation in charts, graphs, or data visualizations.
</div>

#### Example

    //sets format of the labels
    format: "C"

### seriesDefaults.labels.margin `Number|Object`*(default: 0)*

 The margin of the labels.


<div class="meta-api-description">
How do I adjust the margin between sparkline labels and the chart in Kendo UI? Adjust or configure the spacing, padding, or margin around chart series labels to control the distance between label text and adjacent sparkline elements, managing label positioning to prevent overlap, customize label layout, fine-tune label boundaries, modify label offsets, set label spacing for clarity, and optimize label readability within sparkline or data visualization components during rendering or initialization.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true,
                margin: 5
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.labels.padding `Number|Object`*(default: 0)*

 The padding of the labels.


<div class="meta-api-description">
How do I adjust the space between data point labels in a Kendo UI Sparkline to prevent text clipping? Adjust or configure the spacing inside data point labels for sparklines by setting padding values that determine how much space surrounds label text within its border, enabling prevention of text clipping, improving label clarity, readability, and overall layout refinement, controlling the distance between labels and edges, fine-tuning label positioning, and customizing the visual appearance of data labels in tiny charts.
</div>

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }

### seriesDefaults.labels.template `String | Function`

The label template.
Template variables:


*  **value**- the point value
*  **category**- the category name
*  **series**- the data series
*  **dataItem**- the original data item used to construct the point.
        Will be null if binding to array.


<div class="meta-api-description">
How can I customize the labels on my Kendo UI sparkline chart? Adjust and design label content on each chart point by setting a custom template that can display or format the point’s numeric value, category label, series name, or the underlying original data object, enabling flexible options for showing data labels within sparklines, with support for inserting dynamic variables like point value, category, series identifier, or raw data source, making it easy to configure, style, or bind labels according to specific data and visualization requirements.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true,
                template: (data) => `Value: ${data.value}`
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.labels.visible `Boolean`*(default: false)*

 The visibility of the labels.


<div class="meta-api-description">
How to control label visibility in Kendo UI sparklines? Control the display of data point labels in sparklines by configuring label visibility settings to show or hide default series labels, enabling label toggling, customizing whether value or category labels appear on series points, managing label display during chart rendering, and setting label visibility flags to true or false for dynamic or static label presentation across sparkline data series.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            labels: {
                visible: true
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.line `Object`

The line configuration options.
The default options for all line series. For more details see the series options.


<div class="meta-api-description">
How do I set default styling for all line-based series in a Kendo UI sparkline? Configure default styling, appearance, and behavior settings for all line-based data series in sparklines, including line color, width, smoothness, and interaction options; set global line series properties that control visual aspects and default behaviors across multiple line charts, enabling unified customization of line graph elements such as stroke style, line tension, and rendering preferences within compact trend visualizations, ensuring consistent look and feel for all line data presentations by adjusting default line configurations applied to each series in the component.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        seriesDefaults: {
            line: {
                color: "red",
                width: 3,
                style: "smooth"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.overlay `Object`

The effects overlay.


<div class="meta-api-description">
How to customize the visual effects overlay on data series in Kendo UI Sparkline? Control and customize the visual effects overlay on data series in sparklines by enabling, configuring, or adjusting shading, highlights, glows, or transparency effects on series elements; set how chart lines or bars render additional graphical overlays, manage appearance enhancements for individual or grouped series, and fine-tune effect intensity, blending modes, or styling to improve visual emphasis and clarity in compact data visualizations, with options to enable or disable overlays and configure their behavior dynamically.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            overlay: {
                gradient: "glass"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.pie `Object`

The pie configuration options.
The default options for all pie series. For more details see the series options.


<div class="meta-api-description">
How do I set default styles for pie chart slices in a Kendo UI sparkline? Set and customize the default styling, appearance, and behavior for all pie chart slices or segments within a sparkline or mini pie visualization, controlling properties like slice colors, labels, labels position, size, rotation, start angle, end angle, and other pie-specific options globally so they apply consistently across every pie series unless individually overridden. Enable configuration of universal pie chart characteristics, such as inner radius, outer radius, slice spacing, explode distance, and default animation settings, to streamline pie chart visuals in sparkline components. Adjust or control default data rendering, tooltip formatting, highlight behavior, border width, shadows, and pie slice interactions to maintain uniform pie chart behavior and styling across multiple pie series presentations. This supports scenarios where developers want to set fundamental pie chart options once for all series, including how slices look, behave, and respond to user input, without repeating configuration for each series.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "pie",
        seriesDefaults: {
            pie: {
                border: {
                    width: 2,
                    color: "black"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.spacing `Number`*(default: 0.4)*

 Space between bars.


<div class="meta-api-description">
How to adjust the gap between bars in a Kendo UI sparkline chart? Adjust, set, or configure the spacing or gap between bars in a sparkline chart to control visual density, bar separation, and readability; customize how close or far apart the bars appear for better layout and presentation; enable fine-tuning of bar intervals, padding, or margins between adjacent bar elements when initializing or rendering bar series in a sparkline component.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            spacing: 0.1
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.stack `Boolean|Object` *(default: false)*

A Boolean value indicating if the series should be stacked.

> The `stack` options is supported when [series.type](/api/javascript/dataviz/ui/sparkline#configuration-series.type) is set to "bar", "column", "line", "area", "verticalLine", "verticalArea", "radarLine", "radarArea" and "radarColumn".


<div class="meta-api-description">
How to stack multiple data series in a Kendo UI Sparkline chart? Configure whether to layer multiple data series on top of each other in a Sparkline chart to create stacked bar, column, line, area, vertical line, vertical area, radar line, radar area, or radar column visualizations. Enable or disable stacking to control the aggregation and visual presentation of series values combined in the chart, useful for emphasizing cumulative totals or comparative contributions within a single category, and applicable when using various chart types including bars, columns, lines, areas, vertical and radar variations. Adjust stacking behavior to customize how series overlap or stack in compact inline charts for clearer data trends and stacked composition insights.
</div>

#### Example - configure stack series

    <span id="sparkline"></span>
    <script>
    $("#sparkline").kendoSparkline({
      seriesDefaults: {
        stack: true
      },
      series: [
        { data: [ 1, 2 , 3] },
        { data: [ 4, 5 , 6] }
      ]
    });
    </script>

### seriesDefaults.stack.type `String` *(default: "normal")*

The type of stack to plot. The following types are supported:

* "normal" - the value of the stack is the sum of all points in the category (or group)
* "100%" - the value of the stack is always 100% (1.00). Points within the category (or group) are represented as percentages.


<div class="meta-api-description">
How do I configure stacking in Kendo UI for jQuery sparkline charts? Configure how grouped or categorical data stacks in sparkline charts by setting the stacking mode for series, including options to sum values normally or display data as proportional percentages where each stack totals 100%, enabling control over cumulative or relative data visualization, adjusting the method of stacking series for clearer comparison of aggregated points, toggling between absolute value stacks and normalized percentage stacks to present either raw totals or part-to-whole relationships, adapting the rendering of stacked series to represent sums or percentage-based distributions within categories or groups in compact inline charts.
</div>

#### Example - configure 100% stacked series

    <span id="sparkline"></span>
    <script>
    $("#sparkline").kendoSparkline({
      seriesDefaults: {
        stack: { type: "100%" }
      },
      series: [
        { data: [ 1, 2 ] },
        { data: [ 10, 20 ] }
      ]
    });
    </script>

### seriesDefaults.type `String`

The type of the series. Available types:

* area
* column (synonym: bar)
* line
* pie
* bullet


<div class="meta-api-description">
What is the default chart type for all data series in a Kendo UI sparkline? Configure the default chart type or visualization style for all data series in a sparkline, enabling you to set or change how series are displayed across the entire sparkline component. Control or specify series rendering modes by choosing from area charts, columns or bars, line graphs, pie charts, or bullet visuals, allowing you to switch or customize the graphical representation of data points, trend lines, or categories. Adjust the default rendering to influence the overall appearance, style, or format of each series in sparklines, useful for quickly toggling between line, pie, column/bar, area, or bullet types to fit various data visualization needs and preferences.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        seriesDefaults: {
            type: "column"
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.tooltip `Object`

The data point tooltip configuration options.


<div class="meta-api-description">
How to customize default tooltip settings for sparkline series data points? Customize and control the appearance and behavior of data-point tooltips in sparklines by setting visibility options, formatting numeric or text content, applying HTML or string templates, adjusting styling such as background colors, borders, padding, and overall layout. Enable or disable tooltips, format the displayed values precisely, design custom tooltip templates for better data presentation, and style tooltip elements to match themes or branding. Configure default tooltip settings affecting all series data points including visibility toggles, text or numeric formats, content templates, visual styles like colors and borders, and spacing around tooltip text for enhanced clarity and user interaction in sparkline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            tooltip: {
                visible: true,
                background: "yellow",
                color: "black"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.tooltip.background `String`

The background color of the tooltip. The default is determined from the series color.


<div class="meta-api-description">
How can I change the default background color of tooltips in Kendo UI sparklines? Adjust or customize the background color of tooltips for series in sparklines to enhance visibility, style, or branding by setting default tooltip backgrounds that override automatic color selections derived from series colors; this includes configuring tooltip appearance, modifying hover or info bubble backgrounds, and controlling the visual presentation of sparkline data point tooltips across charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            tooltip: {
                visible: true,
                background: "lightblue"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.tooltip.border `Object`

The border configuration options.


<div class="meta-api-description">
How do I customize the border of a sparkline chart's tooltip? Control and customize the appearance of tooltip borders in sparkline chart series by setting options like border color, thickness, style, and dash patterns to define the outline around data point tooltips, enabling developers to configure tooltip outlines, adjust border visuals, set stroke width and color, and modify how tooltip edges appear for better data point highlighting and enhanced visual clarity in minimal inline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            tooltip: {
                visible: true,
                border: {
                    color: "red",
                    width: 2
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.tooltip.border.color `String`*(default: "black")*

 The color of the border.


<div class="meta-api-description">
How do I change the default border color of tooltips in a Kendo UI sparkline? Customize or configure the default tooltip border color around data points in sparklines, controlling the outline shade visible when hovering over series values, with options to set hex codes, rgba values, or named color strings to style and visually distinguish tooltip edges, enabling developers to change or enable specific border colors for tooltips across all series by configuring the default appearance during initialization or runtime.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            tooltip: {
                visible: true,
                border: {
                    color: "green"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.tooltip.border.width `Number`*(default: 0)*

 The width of the border.


<div class="meta-api-description">
How do I adjust the border width of tooltips in Kendo UI sparklines by default? Adjust or configure the thickness, width, or size of the tooltip border outline for default series in sparklines to enhance or customize the hover information display. Control the tooltip’s border line weight or stroke for better emphasis, styling, or visual clarity on series tooltips when hovering or interacting with data points in sparkline charts. Set, modify, or change the tooltip border thickness around data series tooltips to influence the appearance and visibility of tooltip edges in compact inline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            tooltip: {
                visible: true,
                border: {
                    width: 3,
                    color: "blue"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.tooltip.color `String`

The text color of the tooltip. The default is the same as the series labels color.


<div class="meta-api-description">
How do I change the color of tooltips in Kendo UI Sparkline series? Adjust or customize the tooltip text color in sparkline charts by specifying any CSS color format such as named colors, hex codes, or rgb/rgba values to enhance visibility, readability, and match or override the default series label colors, enabling precise control over tooltip appearance, styling, and consistency across data series tooltips in visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            tooltip: {
                visible: true,
                color: "#ff0000"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

 The tooltip font.


<div class="meta-api-description">
How do I change the font in sparkline series hover labels? Adjusting tooltip text font, typeface, size, weight, style, and typography for series hover labels in sparklines enables control over tooltip appearance, customization of hover label fonts, configuration of tooltip text styling, setting font-family or font-weight for tooltip content, modifying font size and style of tooltip series text, and enhancing tooltip readability and visual presentation during user interaction with sparkline data points.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            tooltip: {
                visible: true,
                font: "16px Arial, sans-serif"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### seriesDefaults.tooltip.format `String`

The tooltip format.


<div class="meta-api-description">
How to customize the format of tooltip values in Kendo UI Sparkline? Configure the display format of tooltip values in sparklines to customize how numbers, percentages, dates, or combined data appear when hovering over chart points. Enable setting specific format strings to control numeric precision, date styles, or composite value layouts, adjust tooltip content formatting for clearer data presentation, modify or specify tooltip value representation, and tailor how data labels appear dynamically in interactive charts. This includes formatting for currency, decimals, percentages, timestamps, or custom patterns to enhance data readability and user insight during visualization.
</div>

#### Example

    //sets format of the tooltip
    format: "C"

### seriesDefaults.tooltip.padding `Number|Object`

The padding of the tooltip.


<div class="meta-api-description">
How to adjust inner spacing in Kendo UI sparkline chart tooltips? Adjusting the inner spacing or padding of a chart tooltip controls the whitespace between the tooltip’s content and its border, enabling customization of the touch target size, readability, and overall layout when displaying values, labels, or custom HTML inside the tooltip. Configuring tooltip padding helps refine the user interface by increasing or decreasing the space within the tooltip container, improving clarity and interaction on sparkline charts or other visual data elements. This setting is useful for developers looking to customize spacing, set consistent visual alignment, or optimize tooltips for different content types and screen sizes.
</div>

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }

### seriesDefaults.tooltip.template `String|Function`

The tooltip template.
Template variables:


*  **value**- the point value
*  **category**- the category name
*  **series**- the data series
*  **dataItem**- the original data item used to construct the point.
        Will be null if binding to array.


<div class="meta-api-description">
How to customize the tooltip content in a Kendo UI sparkline? Customize or format tooltip content for individual data points in sparklines using template expressions or HTML, enabling control over the displayed text, styling, and information shown on hover or focus. Configure dynamic tooltips by injecting variables such as point value, category label, series details, and the original data item into the content. This enables tailored tooltip presentation, including conditional formatting, rich text, or custom layouts for each sparkline marker. Adjust the display to enhance clarity, provide context, or highlight specific data attributes directly within the small inline charts, ensuring tooltips match complex data visualization needs and user interaction patterns.
</div>

#### Example

    $("#sparkline").kendoSparkline({
        data: [200, 450, 300, 125],
         seriesDefaults: {
             tooltip: {
                 visible: true,
                 template: "#= value #"
             }
         }
    });

### seriesDefaults.tooltip.visible `Boolean`*(default: false)*

 A value indicating if the tooltip should be displayed.


<div class="meta-api-description">
How to show data point tooltips in Kendo UI Sparkline series? Configure the display of data point tooltips within sparklines by enabling or disabling interactive hover popups that show series information, controlling visibility of quick data summaries, setting boolean flags to show or hide small on-chart hints for each data point, managing whether tooltips appear for series in mini inline charts, and adjusting the presence of contextual popup labels that provide immediate details when hovering or focusing on sparkline series elements during initialization or runtime.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        seriesDefaults: {
            tooltip: {
                visible: true
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### theme `String`

The sparkline theme. This can be either a built-in theme or "sass".
When set to "sass" the sparkline will read the variables from the [Sass-based themes]({% slug sassbasedthemes_kendoui %}).

The supported values are:

* "sass" - special value, see notes
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
How to change the visual style of my Kendo UI sparkline widget? Adjust, modify, or configure the visual appearance and styling of sparklines by selecting from a range of predefined themes or enabling Sass variable-based customization, allowing control over the color scheme, design, and look-and-feel with options such as "black," "blueopal," "bootstrap," "default," "highcontrast," "metro," "metroblack," "moonlight," "silver," "uniform," or activating dynamic styling through Sass theme variables for advanced customization and seamless integration with Sass-enabled projects, enabling users to switch, enable, set, or apply different visual styles, predefined templates, or custom Sass-driven themes to meet design requirements and accessibility needs.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        theme: "bootstrap",
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### tooltip `Object`

The data point tooltip configuration options.


<div class="meta-api-description">
How do I customize the tooltips in Kendo UI Sparkline? Configure and customize interactive hover tooltips for individual data points in sparkline charts, controlling visibility toggling, dynamic content formatting, custom templates, precise positioning, styling options, and display behavior to enhance data readability and user experience during point-level mouseover or touch interactions.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        tooltip: {
            visible: true,
            background: "lightblue",
            color: "darkblue",
            font: "14px Arial",
            border: {
                color: "blue",
                width: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### tooltip.background `String`

The background color of the tooltip. The default is determined from the series color.


<div class="meta-api-description">
How to change the background color of a sparkline tooltip in Kendo UI for jQuery? Customize or configure the background color of sparkline tooltips to enhance visibility, contrast, and readability in charts or graphs by setting a specific color value, controlling the appearance of tooltip overlays, adjusting tooltip backgrounds for better UI clarity, and overriding default series-based colors for tooltips in sparklines. This setting enables developers to enable or change hover or focus tooltip backgrounds, improve user experience with distinct tooltip styling, and manage visual emphasis on data point labels or info popups within compact data visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        tooltip: {
            visible: true,
            background: "yellow"
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### tooltip.border `Object`

The border configuration options.


<div class="meta-api-description">
How do I customize the border of a sparkline tooltip in Kendo UI for jQuery? Customize and control the appearance of tooltip outlines by setting border color, width, style, dash patterns, and radius to refine the visual styling of inline charts. Enable detailed configuration of tooltip outlines for sparklines, including adjusting edges, shapes, thickness, and decorative border effects to enhance readability and design. Set and modify tooltip frame styling options such as stroke color, line weight, dashed or solid lines, and corner rounding to tailor the look and feel of chart hover info displays in interactive visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        tooltip: {
            visible: true,
            border: {
                color: "red",
                width: 3
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### tooltip.border.color `String`*(default: "black")*

 The color of the border.


<div class="meta-api-description">
How do I change the color of the border around a sparkline tooltip? Control and customize the border color surrounding tooltip popups in sparklines by specifying any valid CSS color format such as hexadecimal codes, RGB or RGBA values, HSL, or common named colors to align with design themes, highlight specific data points, or improve visual emphasis and clarity in charts. Adjust, configure, or enable border color styling for tooltip overlays to enhance user interaction cues, provide clear value indication, or match branding requirements in small inline data visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        tooltip: {
            visible: true,
            border: {
                color: "green"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### tooltip.border.width `Number`*(default: 0)*

 The width of the border.


<div class="meta-api-description">
How do I adjust the border width of a sparkline tooltip in Kendo UI for jQuery? Adjust the thickness, weight, or size of the tooltip border for sparklines to customize or style the tooltip outline, control the visual emphasis on the tooltip edge, set or modify the border width to make the tooltip's frame thicker or thinner, and configure how prominent or subtle the tooltip border appears in the sparkline visualization for better clarity or aesthetic preference.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        tooltip: {
            visible: true,
            border: {
                width: 4
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### tooltip.color `String`

The text color of the tooltip. The default is the same as the series labels color.


<div class="meta-api-description">
How do I customize the color of the tooltip in a Kendo UI sparkline? Control and customize the tooltip text color, foreground color, or font color in sparklines to improve readability, match or contrast with series labels, adjust tooltip text appearance, set highlight colors for tooltip text, change tooltip font color, and enable precise color configuration for tooltip text in small inline charts or visual data summaries.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        tooltip: {
            visible: true,
            color: "white",
            background: "black"
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

 The tooltip font.


<div class="meta-api-description">
How can I customize the font style of tooltips in Kendo UI sparklines? Customize and control the typography of tooltip text in sparklines by configuring font family, size, weight, style, and full CSS font properties to adjust the appearance of tooltip labels, enabling precise font styling, enabling font customization for tooltip content, setting text aesthetics, modifying tooltip font styling on initialization, and controlling how tooltip text looks across different sparkline charts with flexible font configuration options.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        tooltip: {
            visible: true,
            font: "16px Georgia"
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### tooltip.format `String`

The tooltip format.


<div class="meta-api-description">
How to customize tooltip format in Kendo UI Sparkline? Customize and control the display format of values in interactive sparkline tooltips by specifying pattern strings for numbers, dates, currencies, or decimal precision to tailor how data points appear on hover or focus. Adjust tooltip labels to show formatted numeric data, date/time stamps, currency symbols, or precise decimal places using format strings or custom patterns. Enable granular formatting for sparkline tooltip content to enhance readability and presentation style through configurable display options during setup or runtime.
</div>

#### Example

    //sets format of the tooltip
    format: "C"

### tooltip.padding `Number|Object`

The padding of the tooltip.


<div class="meta-api-description">
How do I adjust the padding in a Kendo UI sparkline tooltip? Adjust or configure the inner spacing and margins of tooltip content in sparklines by setting padding values for top, right, bottom, and left sides to control visual spacing, layout balance, alignment, and appearance of value labels or annotations within the tooltip; fine-tune tooltip box padding to improve readability, prevent content overlap, customize tooltip layout spacing, and ensure consistent spacing around tooltip text or markers in small chart overlays.
</div>

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }

### tooltip.template `String|Function`

The tooltip template.
Template variables:


*  **value**- the point value
*  **category**- the category name
*  **series**- the data series
*  **dataItem**- the original data item used to construct the point.
        Will be null if binding to array.


<div class="meta-api-description">
How to customize the content of tooltips in Kendo UI sparklines? Configure and customize the content and layout of interactive tooltips for data points in sparklines by defining HTML templates or template strings that can display dynamic information such as the point’s numeric value, category label, series details, or the original underlying data object; enable tailored tooltip presentations by using variables to inject specific data attributes, control the tooltip formatting, customize display for individual data items or entire series, and adjust how point information is rendered during hover or focus events, supporting rich, flexible, and contextual tooltip content generation for sparkline visualizations.
</div>

#### Example

    $("#sparkline").kendoSparkline({
         data: [200, 450, 300, 125],
         tooltip: {
             template: "#= value #"
         }
    });

### tooltip.visible `Boolean`*(default: true)*

A value indicating if the tooltip should be displayed.


<div class="meta-api-description">
How to enable tooltips on a Kendo UI sparkline? Enable or disable the display of tooltips on sparklines to control whether hover or focus triggers show informational pop-up hints, mouseover details, or interactive data labels. Configure visibility settings to show or hide small inline tooltips, adjust whether informational overlays appear on sparkline charts, and set parameters that manage tooltip presentation for data visualization previews, summary insights, or quick data value feedback in minimal graphical elements. Whether you want to activate, deactivate, hide, or reveal tooltip pop-ups within compact trend lines, this setting governs the presence of dynamic tooltip content during user interaction with sparkline components.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        tooltip: {
            visible: true
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### tooltip.shared `Boolean`*(default: false)*

A value indicating if the tooltip should be shared.


<div class="meta-api-description">
How do I control tooltips on Kendo UI sparklines to show shared data for multiple series? Control how tooltips are displayed on sparklines by enabling either a single combined tooltip that aggregates information for all data points at the same category across multiple series or individual tooltips for each separate point, with options to configure shared or distinct hover details, toggle unified versus point-specific data display in tooltips, customize tooltip grouping behavior, and set whether to show merged aggregated tooltips or independent details per series point during chart interaction.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        tooltip: {
            visible: true,
            shared: true
        },
        series: [{
            data: [10, 15, 8, 12]
        }, {
            data: [5, 8, 12, 6]
        }]
    });
    </script>

### tooltip.sharedTemplate `String`

The shared tooltip template.
Template variables:

*  **points**- the category points
*  **category**- the category name


<div class="meta-api-description">
How to customize the tooltip for a Kendo UI sparkline that shows multiple data points? Control how to display a unified tooltip that merges multiple data points into a single view for sparklines, enabling customization of the tooltip’s content using HTML or JavaScript templates, where you can format or arrange information such as all points within a category or the category label itself, support for combining values into one interactive overlay, and options to tailor the tooltip appearance and data presentation for grouped or shared data visualization scenarios.
</div>

#### Example

    <div id="sparkline"></div>

    <script>
    $("#sparkline").kendoSparkline({
      	chartArea: {
          width: 300,
          height: 200
        },
        type: "bar",
      	categoryAxis: {
          categories: [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014]
        },
      	seriesDefaults: {
          data: [
            16, 17, 18, 19, 20, 21, 21, 22, 23, 22
        	],
          name: "value"
        },
        tooltip: {
            shared: true,
    			  sharedTemplate: "#= category # </br>" +
    				"# for (var i = 0; i < points.length; i++) { #" +
    				    "#= points[i].series.name #: #= points[i].value # </br>" +
    				"# } #"
        }
    });
    </script>

### transitions `Boolean`*(default: false)*

A value indicating if transition animations should be played.


<div class="meta-api-description">
How do I enable animations in Kendo UI sparkline charts? Enable or disable animated transitions and visual effects when a sparkline chart renders or updates, controlling smooth or instant changes during data refreshes, chart redraws, and dynamic updates; configure animation playback, toggle transition effects, set motion behavior for data-driven visual changes, and manage how the sparkline smoothly interpolates between states on updates or disables animations for immediate redraws.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        transitions: true,
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### type `String`*(default: "line")*

The default series type.


<div class="meta-api-description">
How do I change the default chart style for a Kendo UI sparkline? Configure or customize the default chart style, series visualization, or rendering mode for sparklines, controlling how data is graphically displayed when no specific series type is set. Adjust or set the baseline chart type, graph representation, or visualization format to influence the appearance and default behavior of compact data series, including options for changing rendering styles, plot types, or graph layouts in minimal inline charts. This impacts how the sparkline component interprets, renders, and visually presents data trends by selecting or modifying the default graph or series style such as line, bar, area, or other chart types.
</div>

#### Example

    $("#sparkline").kendoSparkline({
        type: "bar",
        data: [1, 2, 3, 5]
    });

### valueAxis `Array`

The value axis configuration options.


<div class="meta-api-description">
How do I customize the numeric axis settings in a Kendo UI Sparkline? Adjust numeric axis settings to define value range limits, set minimum and maximum scale boundaries, control tick marks and intervals, customize number label formats and styles, toggle axis visibility, and modify scaling behavior on sparkline charts. Enable precise configuration of numeric scales, axis labels, tick spacing, range clamping, and stylistic elements to tailor data visualization appearance, scaling behavior, and readability in compact trendline graphs through fine-tuned axis control and value formatting options.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        valueAxis: {
            min: 0,
            max: 20,
            color: "blue",
            labels: {
                visible: true,
                color: "red"
            },
            line: {
                visible: true,
                width: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.axisCrossingValue `Object | Date | Array`

Value at which the category axis crosses this axis. (Only for object)

Value indicies at which the category axes cross the value axis. (Only for array)

Date at which the category axis crosses this axis. (Only for date)


<div class="meta-api-description">
How can I control where the horizontal axis intersects the vertical axis in a Kendo UI sparkline chart? Configure the exact point where the horizontal or category axis intersects the vertical or value axis in a sparkline chart by setting the crossing position using a specific numeric value, a list of category index positions, or an exact date object; control the intersection to customize axis alignment, enable precise control over where the category axis meets the value axis for flexible visualization setups, adjust axis crossing points dynamically based on numeric inputs, arrays of indices, or time-based data, and set or shift the baseline intersection for sparklines to tailor chart appearance and data representation according to specific user-defined pivot values or categorical positions.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        valueAxis: {
            axisCrossingValue: 5
        },
        series: [{
            data: [2, 8, 12, 4, 15]
        }]
    });
    </script>

### valueAxis.color `String`

Color to apply to all axis elements.
Individual color settings for line and labels take priority. Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
How do I set the color of all value axis components in a Kendo UI sparkline chart? Control and customize the color styling of all value axis components in a sparkline chart, including axis lines, tick marks, and numerical labels, by specifying any valid CSS color format such as hex, rgb, or named colors; this global color setting applies universally unless overridden by more specific configurations like individual line or label color properties, enabling developers to configure, set, or adjust the appearance of value axis elements for better visual consistency, theme matching, or emphasis within compact inline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        valueAxis: {
            color: "green",
            labels: {
                visible: true
            },
            line: {
                visible: true
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels `Object`

Configures the axis labels.


<div class="meta-api-description">
How do I customize the numeric labels on a Kendo UI sparkline's value axis? Control and customize numeric axis labels for sparklines by configuring text content, formatting options, visibility toggles, rotation angles, spacing intervals including step or skip settings, custom label templates, and styling attributes like font type, color schemes, and margin spacing to precisely manage how value labels appear on the value axis with options to adjust appearance, readability, and layout.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        valueAxis: {
            labels: {
                visible: true,
                background: "lightgray",
                color: "blue",
                font: "12px Arial",
                format: "C",
                rotation: 45
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels.background `String`

The background color of the labels. Any valid CSS color string will work here, including
hex and rgb


<div class="meta-api-description">
How to change the background color of numerical axis labels in Kendo UI Sparkline? Set or customize the background color, fill, or shading of numerical axis labels in sparklines, enabling control over label appearance to improve readability and visual distinction by applying any CSS-compatible color format such as hexadecimal, RGB, or named colors. Adjust the value axis label backgrounds during initialization or at runtime configurations to highlight, differentiate, or style axis markers, ticks, or labels on the chart, supporting use cases like enhancing contrast, theming, or aligning with UI design preferences. This feature supports developers wanting to enable, configure, or modify label backgrounds for better clarity or branding in minimal line charts with numeric axes.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                background: "yellow"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels.border `Object`

The border of the labels.


<div class="meta-api-description">
How do I customize the border around value axis labels in a sparkline? Customize the border appearance around the value axis labels in sparklines by configuring the label edges including color, thickness, line style, dash patterns, stroke width, and outline options for enhanced axis label visibility and styling. Adjust, set, control, or style the boundary lines surrounding numeric or value labels along the sparkline’s axis, tailoring label borders with flexible design settings such as solid, dashed, or dotted lines to improve chart readability and presentation. Enable fine-tuned control over axis label outlines to match themes, highlight data points, or differentiate labels with custom border colors and widths on small inline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                border: {
                    color: "red",
                    width: 2,
                    dashType: "solid"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including
hex and rgb.


<div class="meta-api-description">
How do I change the color of the border around axis labels on a sparkline value axis? Customize the color of the border or outline around axis labels on a sparkline value axis by specifying any valid CSS color format such as hex codes, RGB, RGBA, HSL, or named colors, enabling fine-tuned control over label styling, appearance, and visibility for data visualization axes; useful for setting, adjusting, configuring, or theming label borders to improve readability, contrast, or match a design palette during chart or sparkline setup and rendering.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                border: {
                    color: "blue"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels.border.dashType `String`*(default: "solid")*

The dash type of the border.


<div class="meta-api-description">
How do I customize the border dash pattern for value axis labels in Kendo UI sparklines? Adjust or configure the stroke pattern, dash style, or line type for the borders surrounding value axis labels in sparklines, enabling customization of label outlines, border dash patterns, dashed or dotted lines, and styling of axis label edges in compact trend charts to control visual emphasis on value axis annotations and enhance label border appearance during chart setup or rendering.
</div>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                border: {
                    width: 2,
                    color: "blue",
                    dashType: "dash"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels.border.width `Number`*(default: 0)*

The width of the border.


<div class="meta-api-description">
How do I adjust the border width of numeric labels on a Kendo UI sparkline's value axis? Adjust the thickness or width of the outline or border around numeric labels displayed on the value axis of a sparkline chart by setting the label border width, enabling control over label edge thickness, label border size, or label outline thickness on axis values, customizing the border line weight, line thickness, or frame size around the value axis labels for precise visual styling, configuring label perimeter width for clearer or finer label edges, setting pixel measurements to define how bold or subtle the label borders appear, and modifying the surrounding label boundary thickness to enhance label readability or visual emphasis on the value axis.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                border: {
                    width: 3,
                    color: "green"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels.color `String`

The text color of the labels. Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
How to change the color of numerical axis labels in a Kendo UI sparkline? Control and customize the text color of numerical or value axis labels in sparklines by specifying any valid CSS color format such as hex codes, RGB, RGBA, HSL, or named colors to enhance label visibility, contrast, readability, or to align with your app’s design theme, allowing you to style and configure how the axis labels appear in charts or mini-graphs for better user interface consistency and visual clarity.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                color: "#ff6600"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.


<div class="meta-api-description">
How to customize font settings for numerical axis labels in Kendo UI Sparkline? Customize the appearance of numerical or value axis labels on compact trend charts by configuring font settings such as typeface, size, weight, style, and line spacing using standard CSS font syntax. Adjust font properties to control label readability, typography, and visual emphasis on graph value indicators, enabling precise styling of axis label text in sparklines or miniature charts. This includes setting font families, pixel or rem sizes, boldness, italics, and line height to match design requirements or improve data visualization clarity on small-scale axis markings.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                font: "14px Georgia, serif"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels.format `String`

The format of the labels.


<div class="meta-api-description">
How do I format numeric labels on the value axis of a Kendo UI Sparkline chart? Customize the formatting of numeric or date labels on the vertical or value axis of a sparkline chart by setting patterns, format strings, or localization rules to control how axis labels appear, display as percentages, decimals, currency, dates, or custom formats, and adjust label style for clearer data representation in visualizations, charts, or dashboards.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                format: "{0}%"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels.margin `Number|Object`*(default: 0)*

The margin of the labels.


<div class="meta-api-description">
How do I adjust the margin around value axis labels in a sparkline? Adjust or configure the spacing, padding, or margin around numeric or value axis labels in sparklines to control the distance between the axis labels and their neighboring elements or axis line, enabling better label offset, improved readability, avoidance of label overlap or crowding, customization of label positioning on the value axis, and fine-tuning of label layout during chart rendering or initialization.
</div>

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 0px (by default)
    margin: { top: 1, left: 1 }

### valueAxis.labels.mirror `Boolean`

Mirrors the axis labels and ticks.
If the labels are normally on the left side of the axis,
mirroring the axis will render them to the right.


<div class="meta-api-description">
How to mirror axis labels in Kendo UI Sparkline? Control the positioning of axis labels and tick marks by flipping or mirroring them to the opposite side of the value axis, enabling you to switch label placement from left to right or vice versa, adjust label alignment and tick orientation, configure mirrored value axis labels for clearer data visualization, customize the display side of numeric labels on a chart axis, and invert label and tick locations to optimize chart readability or layout preferences.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                mirror: true
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels.padding `Number | Object`*(default: 0)*

The padding of the labels.


<div class="meta-api-description">
How do I adjust the padding around labels on a Kendo UI sparkline value axis? Control or customize the spacing, margin, or buffer area around numerical or value axis labels on sparklines to improve label clarity, prevent overlap, and enhance readability by adjusting label padding, gap, inner spacing, or distance between the label text and adjacent chart elements. Fine-tune label layout, set or modify whitespace around axis text, and configure label offsets to better align value markers and avoid clutter in compact or dense sparkline displays.
</div>

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }

### valueAxis.labels.rotation `Number`*(default: 0)*

The rotation angle of the labels.


<div class="meta-api-description">
How to rotate value axis labels on a Kendo UI sparkline? Control and customize the rotation angle of numeric or value axis labels on sparklines to enhance label readability, prevent overlap, tilt or slant axis text, adjust label orientation, or configure angled text for compact or dense data displays. This setting enables developers to set precise numeric rotation degrees for vertical, diagonal, or custom label alignment, optimizing label visibility in small inline charts or data visualizations where horizontal space is limited. Whether adjusting label tilt to reduce clutter, applying angled text for clarity, or fine-tuning label positioning for compact sparkline presentations, this feature supports dynamic configuration of how value axis labels are displayed.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                rotation: 45
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels.skip `Number`*(default: 1)*

Number of labels to skip.
Skips rendering the first n labels.


<div class="meta-api-description">
How can I suppress initial labels on a Sparkline's value axis to avoid clutter? Control the density and visibility of numeric labels on the vertical or value axis by setting how many initial labels to skip, hide, or omit in order to minimize clutter, avoid overlapping axis text, adjust label frequency or spacing, and customize the axis label rendering for cleaner, more readable miniature charts or sparklines, enabling developers to configure label suppression, reduce visual noise, and fine-tune the count of leading axis value labels displayed in compact chart components.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                skip: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25, 18]
        }]
    });
    </script>

### valueAxis.labels.step `Number`*(default: 1)*

Label rendering step.
Every n-th label is rendered where n is the step


<div class="meta-api-description">
How often do labels appear on the value axis of a Kendo UI Sparkline chart? Adjust the frequency of displayed labels along the numeric axis of a sparkline chart by specifying the interval at which labels appear, such as showing every second, third, or nth label to minimize overcrowding and improve readability. This setting enables controlling label density, managing axis label clutter, customizing label skipping patterns, and tuning axis annotation granularity for compact data visualizations that require clear but concise value axis labeling. It is useful for optimizing the visual balance between detail and simplicity on compact line charts where axis labels can overlap or become difficult to read if shown too frequently.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                step: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25, 18]
        }]
    });
    </script>

### valueAxis.labels.template `String | Function`

The label template.
Template variables:

*  **value**- the value


<div class="meta-api-description">
How do I customize labels on the value axis of a sparkline in Kendo UI for jQuery? Control and customize the labels on the value axis of sparklines by defining templates that format, transform, or render numeric values dynamically, enabling developers to set specific text representations, apply conditional formatting, modify label appearance based on data values, or incorporate calculated expressions for axis labeling in compact charts, ensuring precise, contextual display of numerical information on the vertical scale.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: true,
                template: (data) => `Val: ${data.value}`
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.labels.visible `Boolean`*(default: true)*

The visibility of the labels.


<div class="meta-api-description">
How do I display numeric labels on the value axis in a Kendo UI sparkline chart? Control the display and visibility of numeric labels along the vertical or value axis in a sparkline chart, enabling or disabling axis value annotations, toggling the visibility of numeric indicators on the value scale, configuring whether the numerical labels on the value axis are shown or hidden, managing label rendering for value axis ticks, setting up axis labels to appear or disappear in minimal sparkline visualizations, customizing whether axis values are visible for clearer data interpretation, adjusting label visibility for streamlined or detailed numeric presentation on the sparkline’s value axis, controlling the presence of value axis captions to enhance or simplify chart readability, and enabling or disabling value axis label rendering for compact or expanded chart contexts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            labels: {
                visible: false
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.line `Object`

Configures the axis line. This will also affect the major and minor ticks, but not the grid lines.


<div class="meta-api-description">
How to customize the appearance of the value axis line in a Kendo UI sparkline? Control and customize the appearance, styling, and behavior of the numeric value axis line in sparklines including adjusting line color, thickness, visibility, and layout options that also influence major and minor tick marks but exclude grid lines; configure axis line attributes to enhance readability, align with design requirements, set up axis line display and formatting during initialization, and fine-tune the value axis presentation for concise data visualization.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            line: {
                color: "blue",
                width: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.line.color `String`*(default: "black")*

The color of the line. This will also effect the major and minor ticks, but
not the grid lines.


<div class="meta-api-description">
How to change the color of the value axis line in a Kendo UI sparkline chart? Customize the color of the vertical scale’s axis line and its major and minor tick marks to control the appearance and styling of numeric value indicators on a sparkline chart, enabling you to configure axis line hues, change tick colors, adjust axis visuals, set the value scale line color, and enhance readability of data trends without altering grid line styling or other chart elements.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            line: {
                color: "#ff0000"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.line.dashType `String`*(default: "solid")*

The dash type of the line.


<div class="meta-api-description">
How do I set the dash type for the value axis line in a Kendo UI sparkline? Configure or customize the stroke pattern, dash style, or line type for the vertical or numerical axis line in sparklines, including options such as solid, dashed, dotted, or other dash patterns; set or adjust how the value axis line appears visually by controlling its dash pattern for enhanced chart readability, styling, and presentation during initialization or runtime, enabling fine-tuning of the line's appearance on value or measure axes in compact inline charts.
</div>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            line: {
                dashType: "dash",
                color: "blue"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.line.visible `Boolean`*(default: true)*

The visibility of the line.


<div class="meta-api-description">
How do I hide the value axis line in a Kendo UI sparkline? Toggle visibility of the value axis line in sparklines, controlling whether the vertical or horizontal axis stroke is displayed or hidden to emphasize data points or create cleaner, minimal charts. Enable or disable the axis baseline line rendering to customize chart appearance, adjust visual emphasis on value scales, or simplify presentation by removing axis lines. Configure axis stroke visibility for clearer data visualization, turning on or off the axis border to highlight or de-emphasize the numerical scale in minimalist or detailed sparkline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            line: {
                visible: false
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.line.width `Number`*(default: 1)*

The width of the line. This will also effect the major and minor ticks, but
not the grid lines.


<div class="meta-api-description">
How do I set the thickness of the axis line in a Kendo UI sparkline chart? Adjust the thickness or weight of the vertical or horizontal axis line in a sparkline chart by setting the line width, impacting how bold or thin the value axis appears, including the rendering size of major and minor tick marks along this axis but excluding any changes to the grid line thickness, useful for customizing axis visibility, clarity, and emphasis in small-scale data visualizations or inline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            line: {
                width: 3,
                color: "green"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.majorGridLines `Object`

Configures the major grid lines. These are the lines that are an extension of the major ticks through the
body of the chart.


<div class="meta-api-description">
How do I customize the appearance of major grid lines in a Kendo UI Sparkline value axis? Control and customize the major grid lines along the value axis in sparklines, including toggling visibility, adjusting color, thickness, style patterns like solid or dashed, and configuring how these lines span across major tick marks on the chart. Enable or disable these grid lines for clearer data visualization, set their appearance to match design requirements, and manage grid line behavior to improve chart readability and data comparison by configuring properties related to line color, width, dash type, and visibility on the vertical value axis. Adjust grid line settings to highlight key values, enhance chart aesthetics, and support detailed data analysis in sparklines.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorGridLines: {
                visible: true,
                color: "#dddddd",
                width: 1
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.majorGridLines.color `String`*(default: "black")*

The color of the lines.


<div class="meta-api-description">
How do I change the color of the primary grid lines in a Kendo UI sparkline? Adjust or specify the color of the primary grid lines on the value axis in sparklines to control visual contrast, enhance readability, customize theme appearance, change major grid line hues, set line colors for value scales, configure axis grid styling, modify color settings for value axis lines, enable color themes for grid markers, and apply color customization for major vertical or horizontal reference lines on small charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorGridLines: {
                visible: true,
                color: "#0000ff"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.majorGridLines.visible `Boolean`*(default: false)*

The visibility of the lines.


<div class="meta-api-description">
How do I show or hide major grid lines in a Kendo UI sparkline chart's value axis? Control the visibility of major grid lines along the value axis in a sparkline chart by enabling or disabling the display of these horizontal or vertical lines to improve readability and visual alignment, allowing you to show grid markers for precise value estimation or hide them for a cleaner, simpler presentation. Adjust or configure the presence of these prominent grid lines on the numeric axis, turn on or off major tick guides, or set the value axis grid indicators to appear or disappear based on preference or design requirements, supporting customization of chart backgrounds with toggled major grid visuals for enhanced data clarity and aesthetic control.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorGridLines: {
                visible: true
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.majorGridLines.width `Number`*(default: 1)*

The width of the lines.


<div class="meta-api-description">
How do I adjust the thickness of major grid lines in a Kendo UI sparkline? Adjust the thickness, weight, or stroke size of major grid lines along the vertical or value axis in small inline charts or sparklines to customize visual density, clarity, and styling of axis grid lines; configure line width for axis demarcations, set grid line boldness or thinness to improve readability, control the rendering thickness of primary horizontal or vertical grid lines on value scales, and fine-tune how strong or subtle the main grid lines appear in compact data visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorGridLines: {
                visible: true,
                width: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.majorGridLines.step `Number` *(default: 1)*

The step of the value axis major grid lines.


<div class="meta-api-description">
How to control the spacing of major grid lines in a Kendo UI sparkline chart? Control the spacing, interval, and frequency of major grid lines or tick marks on a chart’s value axis by configuring how often grid lines appear, adjusting grid density, setting steps between axis ticks, managing visual divisions or increments on the value axis, customizing the distance or gap between primary grid lines, regulating tick intervals for clearer data visualization, fine-tuning axis marking frequency, or specifying the step size for major grid lines to optimize readability and layout on compact charts such as sparklines.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorGridLines: {
                visible: true,
                step: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.majorGridLines.skip `Number` *(default: 0)*

The skip of the value axis major grid lines.


<div class="meta-api-description">
How to control the frequency of major grid lines in a Kendo UI sparkline? Control the frequency of major grid lines displayed along the value axis by configuring how many of these lines to skip, enabling adjustment of grid line density for clearer or less cluttered visualizations. This setting lets you specify an integer to draw every Nth major grid line, with values like 0 or 1 ensuring all lines are shown, while higher numbers reduce the number of grid lines, helping to customize axis appearance, optimize chart readability, and manage visual spacing in data plots or sparklines by setting intervals or intervals to omit grid lines on the y-axis or vertical scale.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorGridLines: {
                visible: true,
                skip: 1
            }
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.majorTicks `Object`

The major ticks of the axis.


<div class="meta-api-description">
How to customize major tick marks on value axis in Kendo UI Sparkline? Control and customize major tick marks along the value axis of sparklines, including settings for tick size, color, visibility, spacing intervals, step frequency, and appearance. Adjust how major ticks are displayed, configured for optimal readability and design, with options to enable, disable, or fine-tune ticks for data visualization clarity. Tailor the spacing, style, and rendering behavior of value axis ticks to match chart requirements and improve axis scale representation, supporting use cases for interval adjustment, visual emphasis, and axis labeling control.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorTicks: {
                visible: true,
                size: 6,
                color: "blue"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.majorTicks.size `Number`*(default: 4)*

The axis major tick size. This is the length of the line in pixels that is drawn to indicate the tick on the chart.


<div class="meta-api-description">
How do I change the length of main tick marks on a Kendo UI Sparkline's value axis? Adjust the length or size of the main tick marks on the numerical axis of a sparkline or small chart by setting the pixel length of major ticks, control visually how long the primary scale lines appear along the value axis, customize or modify tick mark dimensions to enhance readability or match design preferences, regulate the appearance and spacing of prominent ticks on the chart's value scale, configure the measurement of major axis ticks for precise graphical representation, set or fine-tune the length parameters of major tick indicators on compact data visualizations, tailor the size of primary ticks to improve axis clarity or emphasize value graduations, define or change how extended the main scaling marks are to align with chart styling and data interpretation needs.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorTicks: {
                visible: true,
                size: 8
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.majorTicks.visible `Boolean`*(default: true)*

The visibility of the major ticks.


<div class="meta-api-description">
How to make major tick marks visible in a Kendo UI sparkline chart? Control the visibility of primary tick marks along the vertical or value axis of a sparkline chart by enabling or disabling major tick lines and corresponding markers, configuring whether significant axis intervals are displayed for clearer data reference, showing or hiding these scale indicators to customize the chart’s readability, set to true or false depending on whether you want the main axis ticks visible for better visualization, and toggle major tick visibility to manage how axis graduations appear for precision in graphical data representation.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorTicks: {
                visible: false
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.majorTicks.color `String` *(default: "black")*

The color of the value axis major ticks lines. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
How to change the color of major tick marks in a Kendo UI sparkline? Control and customize the color of the primary tick marks along the value axis in sparklines by setting the appearance of major ticks, enabling configuration of their line color using any valid CSS color format such as hex codes, RGB, or named colors; this supports styling, theming, and visual clarity of numeric axis markers, letting developers adjust axis tick line hues to match design requirements, improve readability, highlight data scales, or differentiate elements in minimal charts through precise color settings on vertical or horizontal axes.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorTicks: {
                visible: true,
                color: "#ff0000"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.majorTicks.width `Number` *(default: 1)*

The width of the major ticks in pixels.


<div class="meta-api-description">
How do I adjust the width of major tick marks on a Kendo UI sparkline value axis? Adjust the thickness or stroke width of major tick marks on the value axis to customize their visual prominence, spacing, and style by setting numeric pixel values that control how thick, bold, or narrow the ticks appear. Enable fine-tuning of the major ticks’ size for clearer data axis readability, improved chart aesthetics, and precise control over line weight on sparkline or small-scale data visualization axes. Modify or configure the width, thickness, or pixel size of these primary tick markers to affect their rendering and impact on value axis scaling and graph interpretation.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorTicks: {
                visible: true,
                width: 3
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.majorTicks.step `Number` *(default: 1)*

The step of the value axis major ticks.


<div class="meta-api-description">
How to adjust major tick spacing in Kendo UI Sparkline value axis? Adjust the spacing or frequency of major tick marks along a chart's numeric value axis by setting the interval or step size between ticks, enabling control over how often major ticks appear on the scale; configure, define, or set the numeric increment between major axis ticks to customize axis labeling density, step intervals, or tick mark spacing for clearer data visualization or precise axis scaling.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorTicks: {
                visible: true,
                step: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.majorTicks.skip `Number` *(default: 0)*

The skip of the value axis major ticks.


<div class="meta-api-description">
How do I configure Kendo UI sparkline to skip certain major ticks on its value axis? Configure how many major tick marks on the value axis to omit or skip in a sparkline chart, adjusting the frequency or interval of displayed ticks to reduce clutter, control label density, manage axis readability, set spacing between major tick lines, customize tick rendering intervals, enable skipping every Nth tick for cleaner visuals, and fine-tune the axis scale presentation by selectively displaying major ticks on the value axis.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorTicks: {
                visible: true,
                skip: 1
            }
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.majorUnit `Number`

The interval between major divisions.


<div class="meta-api-description">
How do I adjust the interval between major ticks on a Sparkline's value axis? Adjusting the numeric interval between major ticks, grid lines, and labels on a chart's value axis to control spacing and granularity, setting how frequently axis divisions appear, configuring the distance between major marks for clearer data scaling, defining the step size for axis increments, controlling the major tick interval to customize label placement and grid visibility, enabling precise axis division adjustments for improved readability, setting fixed or variable numeric gaps on the value axis, managing how spread apart key axis indicators display to influence chart scaling and detail level.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            majorUnit: 5
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.max `Number`*(default: 1)*

The maximum value of the axis.
This is often used in combination with the**min**configuration option.


<div class="meta-api-description">
How do I set a maximum value for the y-axis in a Kendo UI sparkline? Set or configure the upper limit, maximum range, or highest value boundary of a chart or graph's numeric axis to control scaling, axis bounds, or data visualization limits. Adjust or fix the top end of a value axis to clamp, restrict, or define maximum data points displayed on sparklines or small inline charts, ensuring consistent axis ranges or overriding automatic scaling behaviors for better comparison and readability across datasets. Manage or control axis maximum values for precise chart layout, axis normalization, or range customization in data visualizations and graphical elements.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            max: 30
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.min `Number`*(default: 0)*

The minimum value of the axis.
This is often used in combination with the**max**configuration option.


<div class="meta-api-description">
How do I set the minimum value limit for a sparkline's value axis in Kendo UI? Control and configure the minimum limit or lower bound of the value axis scale for sparklines, enabling customization of the axis baseline, setting fixed or dynamic ranges, adjusting minimum display values, configuring axis minimum thresholds, defining axis start points, and coordinating with upper bounds to maintain consistent or constrained data visualization scales in inline charts and compact trend indicators.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            min: 5
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.minorGridLines `Object`

Configures the minor grid lines.  These are the lines that are an extension of the minor ticks through the


<div class="meta-api-description">
How to customize minor grid lines on a sparkline's value axis? Set, customize, and control the visibility, color, width, dash style, spacing, and step intervals of the minor grid lines on the value axis of sparklines, enabling precise configuration of these subtle gridline extensions that run parallel to minor ticks across the chart area, ideal for enhancing plot readability, alignment, and visual styling of axis subdivisions in data visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorGridLines: {
                visible: true,
                color: "#eeeeee",
                width: 1
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.minorGridLines.color `String`*(default: "black")*

The color of the lines.

Note that this has no effect if the visibility of the minor grid lines is not set to**true**.


<div class="meta-api-description">
How do I change the color of minor grid lines in a Sparkline value axis? Set or customize the color of subtle value axis minor grid lines in sparklines to enhance visual clarity, adjust styling, theme the faint grid lines for better contrast, control the appearance of minor tick marks on the value axis, enable or configure the line color for fine grid divisions, define the minor grid line hues that appear only when minor grid lines are visible, modify or style auxiliary axis lines to improve chart readability, and manage the color settings for low-level grid lines along the Sparkline’s value scale for precise visual guidance.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorGridLines: {
                visible: true,
                color: "#cccccc"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.minorGridLines.dashType `String`*(default: "solid")*

The dash type of the minor grid lines.


<div class="meta-api-description">
How do I customize the appearance of minor grid lines in a Kendo UI sparkline chart? Customize the stroke pattern, style, or appearance of minor grid lines on the vertical or value axis of a sparkline chart by configuring dash patterns such as solid, dotted, dashed, or custom dashed lines to enhance chart readability, visually separate grid lines, and control minor tick line styling for better data visualization clarity and user interface customization.
</div>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorGridLines: {
                visible: true,
                dashType: "dot",
                color: "#aaaaaa"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

body of the chart.

Note that minor grid lines are not visible by default, therefore none of these settings will take effect without the minor grid lines visibility being set to**true**.

### valueAxis.minorGridLines.visible `Boolean`*(default: false)*

The visibility of the lines.


<div class="meta-api-description">
How to show minor grid lines on a sparkline's value axis? Control the visibility of minor grid lines along the numerical or value axis in sparklines, enabling you to show, hide, enable, or disable subtle grid markers that help with detailed value scale reference and precise data reading. Adjust, configure, or toggle the display of fine or minor horizontal or vertical lines on the value scale to improve chart readability, assist in value comparison, and customize the axis background grid density for better visualization in sparklines and small inline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorGridLines: {
                visible: true
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.minorGridLines.width `Number`*(default: 1)*

The width of the lines.

Note that this settings has no effect if the visibility of the minor grid lines is not set to**true**.


<div class="meta-api-description">
How do I adjust the width of minor grid lines in a Kendo UI sparkline chart? Adjust the thickness or pixel width of the thin grid lines displayed along the minor divisions of the value axis, controlling how fine or bold these subtle horizontal or vertical reference lines appear when enabled. Configure, set, or customize the narrow minor grid line stroke weight to enhance chart readability, improve visual guidance on detailed scales, or emphasize fine granularity in data axis markers. Enable or control the width of the smaller grid segments that appear between major ticks on the value axis, useful for precise measurement contexts, detailed data inspection, or refined axis styling in sparklines and compact charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorGridLines: {
                visible: true,
                width: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.minorGridLines.step `Number` *(default: 1)*

The step of the value axis minor grid lines.


<div class="meta-api-description">
How do I control the density of minor grid lines in a Sparkline chart's value axis? Configure the spacing and frequency of minor grid lines along the numeric value axis to adjust how densely or sparsely the minor grid ticks appear, enabling precise control over the intervals between them for detailed or simplified visual divisions on sparkline charts, with options to set custom numeric steps that determine every how many units a minor grid line is drawn, allowing developers to fine-tune grid density, scale granularity, and chart readability by specifying the numeric gap or step size between these auxiliary grid lines on a value axis.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorGridLines: {
                visible: true,
                step: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.minorGridLines.skip `Number` *(default: 0)*

The skip of the value axis minor grid lines.


<div class="meta-api-description">
How to adjust the frequency of minor grid lines on a sparkline's value axis? Adjust the density and spacing of minor grid lines on the value axis by configuring how many minor grid lines to omit or skip during rendering to reduce clutter, control visual detail, fine-tune axis gridline frequency, customize interval gaps between minor ticks, and optimize the axis line appearance for clearer or less crowded chart visuals on sparklines or similar value-based graphs.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorGridLines: {
                visible: true,
                skip: 1
            }
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.minorTicks `Object`

The minor ticks of the axis.


<div class="meta-api-description">
How can I customize the minor tick marks on my sparkline's value axis in Kendo UI for jQuery? Control and customize the display of minor tick marks on a sparkline’s value axis by adjusting their visibility, frequency, spacing, and styling, enabling precise configuration of small interval markers between major axis ticks, fine-tuning the axis scale presentation, setting how minor gridlines or tick lines appear, and managing detailed axis segmentation for clearer data visualization in sparklines or small charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorTicks: {
                visible: true,
                size: 5,
                color: "green"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.minorTicks.size `Number`*(default: 3)*

The axis minor tick size. This is the length of the line in pixels that is drawn to indicate the tick on the chart.


<div class="meta-api-description">
How do I adjust the size of minor tick marks on a Kendo UI sparkline value axis? Adjust or configure the length, size, or pixel measurement of minor tick marks on a value axis for sparklines to control the appearance, visibility, and spacing of smaller tick lines; set or customize the minor ticks’ width, height, or scale to enhance or fine-tune the axis detail, including enabling, disabling, or scaling these short tick lines to impact readability and graphical precision on compact inline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorTicks: {
                visible: true,
                size: 6
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.minorTicks.color `String` *(default: "black")*

The color of the value axis minor ticks lines. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
How do I change the color of minor tick marks on a Kendo UI sparkline axis? Set or customize the color of minor tick marks on the numerical or value axis of sparklines, adjusting the hue, shade, or transparency of the small tick lines for enhanced visual contrast, theming consistency, or improved readability and accessibility in charts, graphs, or data visualizations by specifying valid CSS color formats like hex codes, RGB, RGBA, HSL, or named colors to control styling, appearance, or highlight minor intervals on the axis.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorTicks: {
                visible: true,
                color: "#ff0000"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.minorTicks.width `Number` *(default: 1)*

The width of the minor ticks in pixels.


<div class="meta-api-description">
How do I adjust the size of minor tick marks on a sparkline value axis? Adjust the thickness, width, or pixel size of minor tick marks on the value axis of a sparkline chart, enabling control over the visual prominence and spacing of smaller tick indicators along the numeric scale; customize, configure, or set the minor ticks’ line weight, stroke weight, or thickness for precise axis detailing and improved readability in data visualization.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorTicks: {
                visible: true,
                width: 3
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.minorTicks.visible `Boolean`*(default: false)*

The visibility of the minor ticks.


<div class="meta-api-description">
How to show minor tick marks on sparkline axis in Kendo UI for jQuery? Control the display of minor tick marks on a numeric or value axis in sparklines, enabling you to toggle visibility for finer axis granularity, adjust minor tick rendering on charts, configure the presence or absence of subtle tick indicators, enhance scale readability by showing or hiding small interval markers, set or disable minor ticks for detailed axis segmentation, and customize axis precision presentation to suit different visualization needs or user preferences.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorTicks: {
                visible: true
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.minorTicks.step `Number` *(default: 1)*

The step of the value axis minor ticks.


<div class="meta-api-description">
How to set minor tick spacing on a Kendo UI sparkline value axis? Configure the spacing or interval between minor tick marks on the numeric axis to adjust the density and distribution of smaller tick lines, enabling precise control over minor scale divisions, fine-grained axis segmentation, and customizable step sizes for value scales, including setting uniform gaps or increments for sub-tick marks on charts, graphs, or sparklines to enhance readability and axis detail levels.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorTicks: {
                visible: true,
                step: 2
            }
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.minorTicks.skip `Number` *(default: 0)*

The skip of the value axis minor ticks.


<div class="meta-api-description">
How can I adjust the minor tick frequency in Kendo UI for jQuery sparklines to reduce visual clutter? Adjust the spacing or frequency of minor tick marks along the value axis in sparklines to reduce visual noise or increase tick density, controlling how many minor intervals are omitted between displayed minor ticks; configure the count of minor tick steps to skip, enabling customization of axis granularity, tick mark distribution, or axis labeling detail in compact charts or data visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorTicks: {
                visible: true,
                skip: 1
            }
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.minorUnit `Number`

The interval between minor divisions.
It defaults to 1/5th of the majorUnit.


<div class="meta-api-description">
How do I adjust the minor tick intervals on a sparkline's value axis? Control or configure the interval spacing, frequency, or position of minor ticks, subdivisions, or gridlines on a value axis in sparklines or mini charts by setting a numeric unit to define the gap between minor divisions. Enable fine-tuning of axis scale precision, adjust the minor tick intervals relative to the major tick or major unit spacing for customizing numeric scales, axis labeling granularity, or gridline density during sparkline initialization or setup. Set or modify the minor tick unit to influence how densely ticks or minor gridlines appear on chart axes, improving readability or visual data segmentation in inline charts, data visualizations, or compact microcharts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            minorUnit: 2
        },
        series: [{
            data: [10, 15, 8, 12, 20, 25]
        }]
    });
    </script>

### valueAxis.name `Object`*(default: "primary")*

The unique axis name.


<div class="meta-api-description">
How do I assign a unique identifier to a specific value axis in Kendo UI sparklines? Assign a unique identifier to a specific value axis for clear referencing, configuration, or mapping within sparklines, enabling control over axis-based settings, series association, or targeted API interactions with distinct axis names that ensure unmistakable identification and linkage in charting or data visualization contexts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            name: "customAxis"
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.narrowRange `Boolean`*(default: true)*

Prevents the automatic axis range from snapping to 0.


<div class="meta-api-description">
How to prevent automatic inclusion of zero in Kendo UI sparkline value axis range? Control axis scaling behavior to enable or disable automatic inclusion of zero in the value axis range, allowing customization of axis bounds to either snap to zero for consistent baseline alignment or restrict to the actual data range for tighter min and max values; configure axis scaling precision, range snapping, boundary constraints, and automatic or manual min/max axis limits to optimize chart readability and layout when displaying data trends in compact visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            narrowRange: false
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.plotBands `Array`

The plot bands of the value axis.


<div class="meta-api-description">
How to create shaded bands in Kendo UI Sparkline valueAxis? Define and customize shaded bands or highlighted ranges along the vertical or value axis of a Sparkline chart to emphasize specific intervals, thresholds, or value ranges. Enable, configure, or control colored or visual bands that mark distinct portions of the data scale, such as warning zones, target zones, or key performance ranges. Adjust plot bands to visually differentiate segments on the value axis, highlight critical values, or set color-coded intervals for quick interpretation of data distribution, trends, or significant ranges. Use to create visual emphasis on sections of the value axis by specifying start and end points for bands that appear behind the Sparkline line, improving clarity and highlighting important numeric ranges or thresholds.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            plotBands: [{
                from: 10,
                to: 20,
                color: "#ffcccc",
                opacity: 0.5
            }]
        },
        series: [{
            data: [5, 15, 8, 25, 12]
        }]
    });
    </script>

### valueAxis.plotBands.from `Number`

The start position of the plot band in axis units.


<div class="meta-api-description">
How do I set the starting point of a highlight range on a Kendo UI Sparkline's value axis? Configure the starting point of a highlight range or shaded area on a chart's value axis by specifying the precise position where a plot band begins, enabling emphasis on particular data intervals or thresholds; set the initial boundary in axis units to control where the visual band appears on the graph, which can be useful for marking significant values, ranges, or alert zones in sparkline or miniature charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            plotBands: [{
                from: 5,
                to: 15,
                color: "#ccffcc"
            }]
        },
        series: [{
            data: [5, 15, 8, 25, 12]
        }]
    });
    </script>

### valueAxis.plotBands.to `Number`

The end position of the plot band in axis units.


<div class="meta-api-description">
How do I set the end boundary of a highlighted range in a Kendo UI sparkline? Configure the upper limit or end boundary of a highlighted range or plot band on a value axis, specifying where the colored or marked area finishes along the numeric scale; control the endpoint of axis-based bands or ranges in charts, graphs, or sparklines by setting this value to define the maximum value or stopping coordinate of visual emphasis on the axis metric, enabling precise customization of data range highlights and axis overlays.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            plotBands: [{
                from: 10,
                to: 20,
                color: "#ffcccc"
            }]
        },
        series: [{
            data: [5, 15, 8, 25, 12]
        }]
    });
    </script>

### valueAxis.plotBands.color `String`

The color of the plot band.


<div class="meta-api-description">
How do I change the color of plot bands in a Kendo UI sparkline value axis? Configure or customize the fill color for highlighting specific numeric ranges or value intervals on charts or sparklines, enabling control over the background shading or band color that emphasizes segments along the value axis, with options to set, adjust, or specify the color used for plot bands to visually distinguish data ranges, enhance readability, or indicate thresholds and zones within the axis scale.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            plotBands: [{
                from: 10,
                to: 20,
                color: "#0000ff"
            }]
        },
        series: [{
            data: [5, 15, 8, 25, 12]
        }]
    });
    </script>

### valueAxis.plotBands.opacity `Number`

The opacity of the plot band.


<div class="meta-api-description">
How to set the transparency level of plot bands in a Kendo UI Sparkline? Adjust the transparency or opacity level of plot bands on the value axis to control how prominently shaded or highlighted regions appear behind chart data, enabling customization of visual emphasis by setting numeric transparency values that manage the intensity and visibility of these background bands relative to series lines, gridlines, and overall chart clarity, useful for emphasizing ranges, thresholds, or zones with adjustable see-through effects and fine-tuning the background layering in sparklines or compact charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            plotBands: [{
                from: 10,
                to: 20,
                color: "#ff0000",
                opacity: 0.3
            }]
        },
        series: [{
            data: [5, 15, 8, 25, 12]
        }]
    });
    </script>

### valueAxis.reverse `Boolean`*(default: false)*

Reverses the axis direction -
values increase from right to left and from top to bottom.


<div class="meta-api-description">
How do I reverse the value axis in a Kendo UI Sparkline chart? Control the orientation of numeric values on the axis by reversing or flipping the value direction so that data points, labels, and tick marks increase or decrease from right to left or top to bottom. Adjust or invert the default ascending or descending order of value scales in sparkline charts, enabling customized visual flow for data representation, reversed scaling, axis inversion, or mirrored numeric progression in compact inline graphs and data trends. Enable or configure the value axis to display reversed numeric order for better readability, alternative sorting, or specific visualization needs.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            reverse: true
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title `Object`

The title of the value axis.


<div class="meta-api-description">
How do I customize the title of a sparkline's value axis in Kendo UI for jQuery? Set or customize the label, caption, or heading for the numeric scale on a chart’s value axis to improve clarity of displayed data points, enabling users to identify what the numbers represent, configure axis title text, styling, or wording, adjust descriptive tags for value scales in sparklines or compact charts, and ensure the value axis clearly communicates the plotted measurements or metrics for better data comprehension and presentation.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                color: "blue",
                font: "14px Arial"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title.background `String`

The background color of the title. Any valid CSS color string will work here, including
hex and rgb.


<div class="meta-api-description">
How do I change the background color behind the value axis title in a Kendo UI Sparkline? Set or customize the background color behind the axis title to improve readability, enhance contrast, or align with brand colors using any valid CSS color format such as hex, rgb, or named colors. Control and style the fill behind the value axis label, enabling you to highlight, differentiate, or visually separate the title area in sparklines with solid background colors that match design themes or accessibility requirements. Configure the solid color behind the axis title to optimize visual clarity, branding consistency, or UI contrast in charts and data visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                background: "#f0f0f0"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title.border `Object`

The border of the title.


<div class="meta-api-description">
How do I style the border around the axis title in a Kendo UI sparkline? Customize the border styling around the axis title on miniature charts by configuring color, width, style, thickness, outline, and other border attributes for the numeric or value axis label in sparklines, enabling precise control over the title’s edge appearance, including setting or disabling outlines, adjusting border colors, widths, and line styles to match themes or enhance visibility on compact data visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                border: {
                    color: "blue",
                    width: 2,
                    dashType: "solid"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title.border.color `String`*(default: "black")*

The color of the border.


<div class="meta-api-description">
How do I change the border color of the axis title in a Kendo UI sparkline? Adjust or customize the color of the border surrounding the label or title on a numerical or value axis in a chart or graph, enabling emphasis, styling, or visual distinction of axis headings using any valid CSS color formats such as hexadecimal codes, RGB, RGBA, or named colors, allowing developers to set, change, control, or configure the stroke color around the axis title border within visual components or data visualizations for improved clarity, design customization, and user interface enhancement.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                border: {
                    color: "#ff0000",
                    width: 1
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title.border.dashType `String`*(default: "solid")*

The dash type of the border.


<div class="meta-api-description">
How do I customize the border style of the axis title on a Kendo UI sparkline? Adjust border style patterns such as solid lines, dashed lines, dotted lines, or custom dash configurations for the axis title border on sparklines, enabling control over visual emphasis, line styling, and title decoration. Customize, set, or enable different border dash types for axis labels and titles to enhance chart readability or match specific design requirements, including options like solid, dash, dot, or patterned borders that define the stroke style around value axis titles in miniature charts or sparklines.
</div>

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

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                border: {
                    color: "blue",
                    width: 2,
                    dashType: "dash"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title.border.width `Number`*(default: 0)*

The width of the border.


<div class="meta-api-description">
How do I adjust the width of the border surrounding the value axis title in a Kendo UI sparkline? Adjust and configure the thickness, thickness level, or width of the border surrounding the value axis title in sparklines to control the visual prominence or styling of the axis label boundary, enabling customization of border size, edge width, or frame thickness around the title for enhanced axis title appearance or emphasis in charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                border: {
                    color: "green",
                    width: 3
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title.color `String`

The text color of the title. Any valid CSS color string will work here, including hex and rgb.


<div class="meta-api-description">
How do I change the color of the axis title in a Kendo UI sparkline chart? Adjust, configure, or customize the color of the text used for the vertical or value axis title in a sparkline chart by specifying any valid CSS color format such as hexadecimal codes, RGB, RGBA, HSL, or named colors to ensure the axis label matches your chart’s theme, design, or accessibility requirements and to enhance visual clarity, readability, and overall presentation consistency for data visualization elements.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                color: "#ff6600"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title.font `String`*(default: "16px Arial,Helvetica,sans-serif")*

The font style of the title.


<div class="meta-api-description">
How do I customize the font for the value axis title in a Kendo UI Sparkline? Customize and control the typography of the value axis title by setting font properties like font family, size, weight, style, and other text appearance options to enhance readability, visual hierarchy, and style for numeric or data axis labels in inline charts or sparklines. Enable precise font adjustments, including bold, italic, or custom size settings, to tailor the axis title’s look and improve clarity and design consistency within compact data visualizations. Adjust fonts for axis labels to meet branding, accessibility, or user interface design needs in sparkline charts and similar compact graphical components.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                font: "18px Georgia, serif"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title.margin `Number | Object`*(default: 5)*

The margin of the title.


<div class="meta-api-description">
How do I adjust the spacing around the title on a sparkline chart's value axis in Kendo UI for jQuery? Adjust the spacing or padding around the axis title on a chart’s value axis by setting uniform or individual margins to control the distance between the title text and nearby axis labels, chart edges, or other elements. Configure how much empty space surrounds the value axis heading using pixel values or detailed offsets for top, right, bottom, and left sides to fine-tune layout, improve readability, or customize the visual separation of axis titles within sparkline charts or other data visualizations. Enable margin adjustments to set clear boundaries around axis labels and their titles for better alignment and presentation across different display resolutions or design requirements.
</div>

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 0px (by default)
    margin: { top: 1, left: 1 }

### valueAxis.title.padding `Number | Object`*(default: 0)*

The padding of the title.


<div class="meta-api-description">
How to adjust the padding around the title in a sparkline chart's value axis? Adjust or configure the spacing and inner margin around the numerical axis title in a sparkline chart to control padding between the title text and adjacent elements such as axis labels, tick marks, or borders, enabling customization of layout, visual clarity, and readability of the value axis heading in compact data visualizations.
</div>

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // padding right and bottom are with 0px (by default)
    padding: { top: 1, left: 1 }

### valueAxis.title.position `String`*(default: "center")*

The position of the title.


<div class="meta-api-description">
How do I position the value axis title in a Kendo UI sparkline? Control and configure the placement of the value axis title in sparklines to enhance label clarity by setting its position relative to the axis, such as above, below, left, or right, enabling customization for better readability and visual alignment of value axis captions during chart initialization or dynamic updates.
</div>

#### *"top"*

The axis title is positioned on the top (applicable to vertical axis).

#### *"bottom"*

The axis title is positioned on the bottom (applicable to vertical axis).

#### *"left"*

The axis title is positioned on the left (applicable to horizontal axis).

#### *"right"*

"The axis title is positioned on the right (applicable to horizontal axis).

#### *"center"*

"The axis title is positioned in the center.

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                position: "top"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title.rotation `Number`*(default: 0)*

The rotation angle of the title.


<div class="meta-api-description">
How can I adjust the rotation of the value axis title in a Kendo UI sparkline chart? Set or adjust the angle, tilt, or orientation of the value axis title in a sparkline chart to customize its appearance, controlling how the title text rotates or pivots along the value axis; configure the rotation in degrees to achieve horizontal, vertical, diagonal, or any desired title alignment for enhanced readability, label styling, and visual presentation.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                rotation: 90
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title.text `String`

The text of the title.


<div class="meta-api-description">
How to change the title of the value axis in a Kendo UI sparkline chart? Set or update the label, heading, or caption displayed on the value axis of a sparkline chart by specifying the exact text string shown along the numeric axis; control, customize, configure, or change the value axis title to clearly describe or identify the data scale, numeric range, measurement units, or value representation, either during initial setup or through dynamic programmatic updates, enabling clear and precise axis annotation, naming, or titling for improved data visualization context and user understanding.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Custom Title"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.title.visible `Boolean`*(default: true)*

The visibility of the title.


<div class="meta-api-description">
How do I hide the title on the vertical axis of a Kendo UI Sparkline chart? Show or hide the label or title on the vertical axis of a small inline chart, toggle visibility of the value axis heading, enable or disable axis title display to improve chart readability, configure the appearance and presence of the vertical axis name, control whether the axis label is visible for better spacing and clarity, set or update the visibility of the value axis title dynamically in sparkline visualizations, manage axis title display options to enhance chart interpretation and layout.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            title: {
                text: "Values",
                visible: false
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.visible `Boolean`*(default: false)*

The visibility of the axis.


<div class="meta-api-description">
How to hide the value axis in a Kendo UI sparkline chart? Enable or disable the display of the vertical or value axis in sparklines to show numeric scales, control axis visibility dynamically, toggle axis rendering on or off, manage layout space reserved for the value scale, configure whether the numeric or value axis appears alongside the sparkline chart, set the axis to be visible or hidden at initialization or runtime, adjust axis display to improve clarity or save space, and customize how numeric labels and scales are rendered in compact inline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            visible: true
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair `Object`

The crosshair configuration options.


<div class="meta-api-description">
How do I customize the crosshair line in a Kendo UI sparkline to snap to data points on hover? Control and customize the vertical or horizontal indicator line that follows the value axis in a sparkline or small chart, including enabling or disabling the crosshair feature, adjusting its color, width, opacity, and dash styles for precise visual styling. Configure interactions such as snapping the crosshair to data points, displaying informative tooltips on hover, and managing behavior during user mouse or touch events to enhance data readability and user feedback. Adjust crosshair effects on the value axis to improve tracking and alignment of values within compact charts, enabling better visual guidance and interactive data exploration.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                color: "red",
                width: 2,
                opacity: 0.8
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.color `String`

The color of the crosshair.


<div class="meta-api-description">
How do I change the color of the crosshair line in a Kendo UI sparkline? Set or customize the color of the crosshair line on a chart's vertical or value axis to enhance visibility, highlight specific data points, or align with your chart’s theme and styling. Control the crosshair’s line color used during mouse hover, data tracking, or highlighting interactions on the value axis to improve the clarity and user experience of interactive charts, sparklines, or data visualizations by adjusting the line’s appearance to match your design preferences or visual requirements.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                color: "#0000ff"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.width `Number`

The width of the crosshair.


<div class="meta-api-description">
How do I change the width of the value-axis crosshair in a Kendo UI Sparkline chart? Adjust the thickness, line width, or stroke weight of the value-axis crosshair in Sparkline charts to make the crosshair more visible, prominent, or subtle; configure the crosshair line's width to control its visual emphasis, whether you want a thin, medium, or thick crosshair line overlaying the value axis, enhancing precision reading or focus during chart interactions, and enabling customization of the crosshair’s appearance for clarity or style consistency in data visualization.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                width: 3
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.opacity `Number`

The opacity of the crosshair.


<div class="meta-api-description">
How do I adjust the opacity of the crosshair in a Kendo UI Sparkline? Adjust the transparency, opacity level, or visibility of the value axis crosshair in sparklines by setting a numeric value between fully transparent and fully opaque, allowing control over how prominently or subtly the crosshair appears to enhance focus, clarity, or visual emphasis on chart data points, enabling customization of crosshair brightness, intensity, or alpha for better data analysis and user interface tuning.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                opacity: 0.5
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.dashType `Number`

The dash type of the crosshair.


<div class="meta-api-description">
How do I customize the appearance of the crosshair line on a sparkline's value axis? Customize the style of the vertical or horizontal crosshair line on the value axis by setting its dash pattern, enabling control over whether the crosshair appears as a solid line, dashed line, dotted line, or any custom stroke pattern to enhance visual clarity and user interaction. Adjust or configure the crosshair line’s dash style to improve readability, highlight data points, or match specific design requirements in sparklines, toggling between continuous and segmented line appearances to suit varied chart presentation needs or user preferences during rendering or runtime.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                dashType: "dash"
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.visible `Boolean`*(default: true)*

The dash type of the crosshair.


<div class="meta-api-description">
How to show crosshair line on value axis in Kendo UI sparkline? Control the visibility and dash style of the crosshair line on the value axis in sparklines, including setting whether the crosshair appears and customizing its dash pattern such as solid, dashed, dotted, or other line styles to highlight values or guide data reading. Adjust and configure the crosshair line rendering on the value axis, enabling developers to enable, disable, customize, or style the crosshair's look for better visual cues, data focus, axis highlighting, or interactive feedback when hovering or focusing on data points.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: false
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.tooltip `Object`

The crosshair tooltip configuration options.


<div class="meta-api-description">
How to customize the crosshair tooltip in Kendo UI Sparkline? Customize the tooltip shown on the value axis crosshair in sparklines by setting text, templates, formats, visibility, style, and content for interactive feedback when hovering or focusing on the chart’s values. Control how crosshair tooltips appear and what information they display, configure dynamic or static text, enable or disable the tooltip display, and adjust formatting for better data presentation and user interaction in minimal inline charts. Adjust crosshair tooltip behavior, appearance, and content to enhance value axis data insight during user interactions, including hover, focus, and real-time updates in sparkline visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    background: "#ffffff",
                    color: "#000000"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.tooltip.background `String`

The background color of the tooltip.


<div class="meta-api-description">
How to customize the background color of the crosshair tooltip in a Kendo UI sparkline chart? Set or customize the background color of the crosshair tooltip that appears when hovering over the value axis in a sparkline chart, enabling control over tooltip visibility and contrast through CSS color formats such as hex codes, RGB, RGBA, or named colors, useful for matching themes, enhancing readability, improving user interaction feedback, adjusting hover tooltip styling, or fine-tuning visual emphasis on data points within compact line charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    background: "#f0f0f0"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.tooltip.border `Object`

The border configuration options.


<div class="meta-api-description">
How do I customize the border of the value axis crosshair tooltip in a Kendo UI Sparkline? Customize and control the border styling of the tooltip displayed on the value axis crosshair in sparklines, including setting the border color, thickness, line style, stroke appearance, edge spacing, and visual outline around the crosshair indicator, enabling you to adjust or configure the tooltip’s surrounding frame for clearer data point highlighting and enhanced axis interaction visuals in charts or sparkline components.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    border: {
                        color: "blue",
                        width: 2
                    }
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.tooltip.border.color `String`*(default: "black")*

The color of the border.


<div class="meta-api-description">
How do I change the border color of the crosshair tooltip in a Kendo UI sparkline? Customize the border color of the crosshair tooltip along the value axis in sparklines by setting or configuring the tooltip's border appearance using any CSS color format; control and modify the outline color for the crosshair tooltip visuals within the numeric or value scale, including changing highlight borders, adjusting tooltip edge colors, or styling the border around value axis hover indicators to improve data point emphasis or UI consistency.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    border: {
                        color: "#ff0000"
                    }
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.tooltip.border.width `Number`*(default: 0)*

The width of the border.


<div class="meta-api-description">
How do I adjust the width of the numeric tooltip border in a Kendo UI Sparkline? Adjust the thickness, size, or width of the numeric tooltip border around the crosshair on a Sparkline’s value axis, enabling control over the outline emphasis, border styling, or visual prominence of the tooltip displayed when hovering or interacting with the chart axis, useful for customizing tooltip border size, configuring crosshair highlight thickness, and setting the outline width for improved readability or visual clarity in data visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    border: {
                        width: 2,
                        color: "blue"
                    }
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.tooltip.color `String`

The text color of the tooltip.


<div class="meta-api-description">
How do I change the color of the crosshair tooltip in a Kendo UI sparkline? Customize the crosshair tooltip text color on the value axis in sparklines by specifying any valid CSS color format such as hex codes, RGB, RGBA, HSL, or named colors, enabling precise control over tooltip appearance during chart interactions. This setting helps to configure, set, or override the text color for tooltips that appear when hovering over or crosshair-tracking values, supporting visual customization, theming, and accessibility preferences for better data readability in sparkline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    color: "#0000ff"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.tooltip.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The tooltip font.


<div class="meta-api-description">
How do I customize the font of the crosshair tooltip in a Kendo UI sparkline? Customize and control the font appearance of the crosshair tooltip text on the value axis in sparklines by setting font family, size, weight, style, and other typography attributes; configure tooltip text styling for enhanced readability, consistent theme integration, or emphasis in charts, enabling developers to specify how crosshair indicators display textual data with precision and design flexibility in small inline charts and data visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true,
                    font: "14px Georgia, serif"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.crosshair.tooltip.format `String`

The tooltip format.


<div class="meta-api-description">
How to format numeric values in Kendo UI sparkline crosshair tooltips? Customize or control the display format of numeric or date values shown in the tooltip that appears on the value axis crosshair of sparklines, enabling you to set or configure number formats like decimals, currency, percentage, or date patterns such as month/day/year. Adjust how data points are presented within crosshair tooltips by specifying formatting strings or templates, helping to enable clear, readable, and context-appropriate value representations during data visualization interactions. This includes options for precision, locale-specific formatting, and custom patterns to tailor tooltip value display for enhanced user experience and data interpretation.
</div>

#### Example

    //sets format of the tooltip
    format: "C"

### valueAxis.crosshair.tooltip.padding `Number|Object`

The padding of the tooltip.


<div class="meta-api-description">
How do I adjust the padding inside the crosshair tooltip on a Kendo UI Sparkline value axis? Adjust the internal spacing or margin inside the value axis crosshair tooltip on a sparkline chart, configuring the distance between the tooltip content and its edges to enhance readability, customize appearance, or control padding area for better visual clarity in interactive charts and data visualizations.
</div>

#### Example

    // sets the top, right, bottom and left padding to 3px.
    padding: 3

    // sets the top and left padding to 1px
    // right and bottom padding are left at their default values
    padding: { top: 1, left: 1 }

### valueAxis.crosshair.tooltip.template `String|Function`

The tooltip template.
Template variables:

*  **value**- the point value (either a number or an object)


<div class="meta-api-description">
How do I customize the tooltip template for the value axis crosshair in a Kendo UI sparkline? Customize the content, layout, and formatting of tooltips that appear when hovering over the value axis crosshair in sparklines, enabling control over how numeric or data point values are displayed, formatted, and rendered within the tooltip markup for enhanced data visualization, including setting templates to define tooltip appearance, content structure, and dynamic value representation on the value axis crosshair indicator.
</div>

#### Example

    // chart initialization
    $("#sparkline").kendoSparkline({
         data: [200, 450, 300, 125],
         valueAxis: {
             crosshair: {
                 visible: true,
                 tooltip: {
                     visible: true,
                     template: "value: #= value #"
                 }
             }
         }
    });

### valueAxis.crosshair.tooltip.visible `Boolean`*(default: false)*

A value indicating if the tooltip should be displayed.


<div class="meta-api-description">
How to show numeric values with crosshair on Kendo UI sparkline value axis? Control showing or hiding the value axis crosshair tooltip on sparklines to display exact numeric data points, enabling or disabling the interactive hover indicator that reveals precise metric values along the vertical axis, configure visibility of the tooltip that appears with the crosshair line for data precision, toggle the indicator that displays numeric details when hovering over the value axis crosshair, set or unset the boolean option to present or suppress the tooltip that enhances readability of specific values in sparkline charts.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            crosshair: {
                visible: true,
                tooltip: {
                    visible: true
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.notes `Object`

The value axis notes configuration.


<div class="meta-api-description">
How do I customize the notes on a Sparkline chart's value axis? Customize and control annotations or notes along the value axis of a Sparkline chart by setting labels, text content, icons, positioning, visibility, and visual styling such as colors and fonts, enabling tailored data point highlights, axis markings, or explanatory remarks; configure how annotations appear and behave on the vertical scale to enhance readability, emphasize specific values, or integrate dynamic data-bound notes, with options to enable, disable, position, style, or update these elements during chart setup or rendering.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            notes: {
                position: "left",
                icon: {
                    background: "red"
                },
                data: [{
                    value: 15,
                    text: "Target"
                }]
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.notes.position `String`

The position of the value axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.


<div class="meta-api-description">
How do I position annotations in a Kendo UI sparkline value axis? Control and configure the placement of annotations, labels, or notes relative to the vertical or numeric axis in sparklines, allowing positioning above, below, left, or right of the value axis to enhance data visualization clarity and customize how informational notes align with value scales in compact charts. Adjust the note location on the value axis for clearer highlights, callouts, or commentary on data points by setting its orientation at the top, bottom, left side, or right side of the axis, enabling precise note alignment in sparkline visualizations for improved readability and contextual emphasis.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            notes: {
                position: "top",
                data: [{
                    value: 15,
                    text: "Peak"
                }]
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.notes.icon `Object`

The icon of the notes.


<div class="meta-api-description">
How do I customize the icons for notes on a Kendo UI sparkline's value axis? Control and customize the symbols or markers that appear on the value axis annotations, enabling the selection or configuration of icons, shapes, or visual indicators for notes or comments displayed along the numeric or data axis of sparklines, including options to set specific icons for highlighting, labeling, or marking key data points on the value scale in compact charts, allowing developers to configure and style axis notes icons for clearer data visualization and enhanced user interface cues in small trend graphics.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [10, 15, 8, 12, 18, 6, 14],
        valueAxis: {
            notes: {
                icon: {
                    background: "lightblue",
                    border: {
                        color: "blue",
                        width: 2
                    }
                },
                data: [{ value: 12 }]
            }
        }
    });
    </script>

### valueAxis.notes.icon.background `String`

The background color of the notes icon.


<div class="meta-api-description">
How to change color of note icon background in Kendo UI sparkline value axis? Adjust or set the background color for annotation icons on the value axis of sparklines to highlight important data points, change note icon backgrounds for better visibility, customize chart markers for emphasis, configure color styling of notes indicators along the vertical axis, control icon backgrounds for annotations to match themes or branding, and enable tailored visual cues for data remarks on sparkline graphs using standard CSS color inputs.
</div>

#### Example - set the value axis notes icon background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          icon: {
            background: "red"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.icon.border `Object`

The border of the icon.


<div class="meta-api-description">
How do I customize the border of note icons on a sparkline's value axis? Configure and customize the border styling of small indicator icons on the value axis in sparklines, including setting the border color, thickness, width, dash pattern, stroke style, outline, or edge appearance to enhance visual emphasis or contrast. Adjust border attributes such as color, line weight, dash type, stroke style, or outline patterns to highlight, emphasize, or visually differentiate note marker icons on charts and inline graphs. Enable control over the outline or frame of note icons on value axes, specifying border color schemes, widths in pixels, dashed or solid lines, and other border styles to suit custom visual designs or thematic requirements in data visualization components.
</div>

#### Example - set the value axis notes icon border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.icon.border.color `String`

The border color of the icon.


<div class="meta-api-description">
How do I change the border color of note icons on a sparkline's value axis? Customize, configure, or set the outline color, border color, edge hue, stroke shade, or frame tint of annotation note icons displayed on the sparkline's value axis, controlling the visual styling of highlight markers or note indicators along the axis using any valid CSS color format such as hex codes, RGB/RGBA values, or named colors, enabling precise control over the note icon border appearance for enhanced data visualization annotations and axis labeling effects.
</div>

#### Example - set the value axis notes icon border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.icon.border.width `Number`

The border width of the icon.


<div class="meta-api-description">
How to set the border width of note icons on a sparkline's value axis? Adjust the thickness, size, or width of the outlines or borders around note icons on a chart's value axis to customize their visibility, clarity, and style; configure, set, or control the numeric border thickness of these icon outlines within sparklines or other compact visual data elements to enhance emphasis, contrast, or design appearance.
</div>

#### Example - set the value axis notes icon border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          icon: {
            border: {
              width: 2,
              color: "red"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.icon.size `Number`

The size of the icon.


<div class="meta-api-description">
How to adjust icon size in Sparkline value axis notes? Adjust the dimensions or scale of icons representing annotations or notes along a chart’s value axis, enabling control over icon height, width, or overall size to visually enhance or reduce note markers on sparklines or small data trend visualizations, including settings to customize or configure icon appearance in axis labels or data point highlights for improved clarity or emphasis in charts.
</div>

#### Example - set the value axis notes icon size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          icon: {
            size: 30
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.icon.type `String` *(default: "circle")*

The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.


<div class="meta-api-description">
How do I customize the shape of annotation markers in a sparkline value axis? Control and customize the shape of annotation markers or note icons on the value axis of sparklines, enabling the selection between circle, square, or triangle markers for highlighting specific data points, configuring the appearance of value axis notes, setting marker styles for value axis annotations, and adjusting note icon forms to improve data visualization clarity and emphasis in sparkline charts.
</div>

#### Example - set the value axis notes icon shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          icon: {
            shape: "triangle"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.icon.visible `Boolean` *(default: "true")*

The icon visibility.


<div class="meta-api-description">
How do I hide the annotation icon on the value axis in a Kendo UI Sparkline? Control the display or concealment of the annotation marker, symbol, or icon along the numeric or value axis in sparklines, enabling you to toggle visibility for notes, comments, flags, or indicators on the axis. Configure, enable, disable, show, or hide the annotation icons on the numeric scale to highlight key points or suppress visual markers, customize axis note symbols, manage annotation visibility for value ranges, and adjust indicator markers used for highlighting or flagging specific values in compact sparkline charts.
</div>

#### Example - set the value axis notes icon visibility

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          icon: {
            visible: false
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label `Object`

The label of the notes.


<div class="meta-api-description">
How to customize labels for annotations on sparkline value axis? Customize, set, or configure the text and appearance of labels for annotations or notes on the vertical or value axis of sparklines, controlling how note labels are displayed, formatted, or shown alongside the value axis markers or points, enabling adjustments to note label content, visibility, styling, and placement on the value axis, useful for highlighting specific data points, setting custom text labels for notes, or managing annotation label presentation in sparklines.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            notes: {
                data: [{
                    value: 15,
                    text: "Target"
                }],
                label: {
                    background: "#ffff00",
                    color: "#000000",
                    position: "outside"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.notes.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
How to change the background color of notes on a sparkline chart's value axis? Customize the background color or fill of labels for notes displayed on the value axis of a sparkline chart, using any valid CSS color formats including hexadecimal codes, RGB values, and standard color names; control the appearance of annotation label backgrounds to improve contrast, visibility, emphasis, or stylistic consistency in small inline charts, enabling developers to set or change background fills dynamically, adjust note highlight colors, and style value axis markers for enhanced data visualization and annotation clarity.
</div>

#### Example - set the value axis label background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            background: "red"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.border `Object`

The border of the label.


<div class="meta-api-description">
How to customize the border of note labels in Kendo UI for jQuery sparklines? Customize or configure the visual outline, stroke, or frame of value axis note labels in sparklines, including adjusting border color, thickness, dash patterns, and solid or dashed styles to control how the note label edge appears without affecting the text content, enabling fine-tuned styling and presentation of axis annotation highlights.
</div>

#### Example - set the value axis label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            border: {
              color: "green",
              dashType: "dashDot",
              width: 1
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
How do I customize the border color of note labels on a sparkline's value axis? Adjust or customize the border color surrounding annotation labels on the value axis of a sparkline chart, specifying the stroke hue for note label outlines to enhance visual clarity or match design themes, using standard CSS color formats such as hex codes, RGB values, or color names to control and style the edge color of value axis note annotations and their borders for clearer data emphasis, highlighting, or distinct labeling in small inline charts.
</div>

#### Example - set the value axis label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            border: {
              color: "green"
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line


<div class="meta-api-description">
How do I set different border styles for note labels in a Kendo UI sparkline? Control and customize the border style of note labels by setting different stroke patterns including solid lines, dashed lines, dotted lines, and complex repeating dash-dot or long dash with dot sequences, enabling precise configuration of border appearance for chart annotations, labels, or highlight outlines in sparklines or similar data visualizations; adjust dash types such as dash, dashDot, dot, longDash, longDashDot, longDashDotDot, or solid to achieve various border effects suited for emphasis, readability, or style preferences in graphical interfaces.
</div>

#### Example - set the value axis label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            border: {
              dashType: "dashDot",
              width: 1
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.


<div class="meta-api-description">
How do I set the border width for annotation labels on a sparkline's value axis? Adjust the thickness or width of the outline or border around annotation labels on a chart’s numeric axis, enabling you to set pixel-based border size for notes or highlight labels on value axes; control how prominent or subtle the label borders appear by configuring integer border widths to enhance visibility or keep them hidden, modify label edges on sparkline or small inline charts, and manage the appearance of annotation outlines with customizable thickness settings for better readability and visual emphasis.
</div>

#### Example - set the value axis label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            border: {
              width: 1
            }
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.color `String`

The text color of the label. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
How do I change the color of note labels on a Kendo UI sparkline? Adjust the text color of labels for value axis annotations on sparklines by configuring the label's font color using any valid CSS color format, including hexadecimal codes, RGB or RGBA values, and standard CSS color names, enabling customization and styling of note labels on charts to highlight, differentiate, or match visual themes for value axis notes in minimal inline charts.
</div>

#### Example - set the value axis label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            color: "#aa00bb"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the label.


<div class="meta-api-description">
How do I customize the font for notes labels on a sparkline's value axis? Adjusting or defining the typography, font style, font family, font size, font weight, font style, or CSS font string used for labels attached to notes on the vertical value axis in sparklines, enabling developers to customize the text appearance, style, and formatting of axis annotation labels, control boldness, sizing, and font type to match design requirements, and configure how annotations or notes are visually presented along the value scale in sparkline charts through font customization parameters.
</div>

#### Example - set the chart series label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            font: "20px sans-serif"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the value value


<div class="meta-api-description">
How can I customize the labels on the value axis of a Kendo UI Sparkline chart using templating? Customize or create dynamic labels for annotations on the value axis of a sparkline chart by defining templates that control how note labels display using templating syntax; use variables representing note values to format, style, or conditionally render descriptive or data-driven text for axis annotations, enabling flexible configuration of label content, appearance, and contextual information tied to specific numeric points or markers on the chart’s value scale.
</div>

#### Example - set the value axis notes label template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            template: "Year: #: value #"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the value axis notes label. By default the value axis notes label are visible.


<div class="meta-api-description">
How to make sparkline value axis note labels visible? Control the visibility of labels on value axis notes in sparklines by enabling or disabling the value axis note labels, showing or hiding annotations on the value axis, toggling label display for data point notes, configuring whether text labels appear alongside value axis markers, setting boolean flags to show value axis notes, customizing annotation visibility on the axis, managing label presence for value axis comments or notes, adjusting the display of note labels during sparkline initialization or runtime, and controlling axis note visibility with true or false values to suit visualization clarity and presentation preferences.
</div>

#### Example - hide the value axis notes label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            visible: false
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.


<div class="meta-api-description">
How to rotate value axis notes in Kendo UI Sparkline? Adjust, set, or configure the angle of the numeric labels or annotations along the value axis in sparklines, including controlling label rotation degrees to tilt, rotate, or orient value axis notes for better readability, alignment, or presentation. Enable custom rotation by specifying numeric degree values to pivot value axis note labels, modify their orientation for compact display, or optimize label positioning on sparkline charts. Manage axis note label rotation to improve visualization clarity, angle text labels on the value axis, or customize label alignment by rotating text annotations on sparklines from horizontal to various tilted positions.
</div>

#### Example - rotate the value axis notes label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            rotation: 90
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.format `String` *(default: "{0}")*

The format used to display the notes label. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the axis value.


<div class="meta-api-description">
How do I format axis note labels on a Kendo UI sparkline to display dates in a specific way? Control and customize the display format of axis note labels on sparklines by specifying how values appear as numbers, dates, currencies, or other formatted strings using format patterns or placeholders like "{0}". Configure, set, or adjust label formatting for axis annotations to represent values in various styles such as numeric formatting, date/time, currency symbols, or custom patterns. Enable formatting rules for sparkline axis note labels to ensure consistent and clear data presentation, supporting diverse localization and display preferences for axis value annotations.
</div>

#### Example - set the value axis notes label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          label: {
            format: "value slot: {0}"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.label.position `String` *(default: "inside")*

The position of the labels.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.


<div class="meta-api-description">
How to position value axis note labels in sparklines relative to the icon? Adjust and set the placement or alignment of value axis note labels in sparklines to appear either inside or outside the note icon, enabling customization of label positioning relative to the icon for improved visibility, layout control, annotation styling, or user interface arrangement within compact charts or mini graphs.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            notes: {
                data: [{
                    value: 15,
                    text: "Target"
                }],
                label: {
                    position: "outside"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.notes.line `Object`

The line of the notes.


<div class="meta-api-description">
How to style annotation lines on the vertical value axis in Kendo UI Sparkline? Adjust and control the styling, color, thickness, dash pattern, and other visual aspects of annotation lines on the vertical data axis in sparklines to highlight or emphasize important points, customize note indicators, tailor line appearance for clarity, configure line visuals for value axis markers, set line attributes like width and style for notes, and modify how annotation lines on the value axis are rendered to enhance data readability and design.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            notes: {
                data: [{
                    value: 15,
                    text: "Target"
                }],
                line: {
                    width: 3,
                    color: "blue"
                }
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.notes.line.width `Number`

The line width of the notes.


<div class="meta-api-description">
How do I adjust the width of note connector lines on a sparkline's value axis? Adjust the thickness, weight, or line width of connector lines linking notes on a sparkline's value axis to customize visual emphasis or styling; control or set the numeric width for note connector lines to make them thinner or thicker, modify connector line appearance, or highlight data points with precise line sizing on sparkline annotations.
</div>

#### Example - set the value axis notes line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          line: {
            width: 4
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.line.color `String`

The line color of the notes.


<div class="meta-api-description">
How do I customize the color of connector lines between notes on a sparkline's value axis? Control and customize the color of connector lines linking notes on the value axis of sparklines, allowing you to set, change, or configure the stroke color for annotation lines that highlight specific data points or comments on the value axis, supporting scenarios where developers need to style, adjust, or enhance the visibility of note connectors within compact line charts or mini-graphs.
</div>

#### Example - set the value axis notes color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          line: {
            color: "#aa00bb"
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.line.length `Number`

The line length of the notes.


<div class="meta-api-description">
How do I adjust the length of connector lines for value axis notes in Kendo UI Sparkline? Adjust or configure the length and extension of connector lines linking annotation notes to the value axis in sparklines, controlling how far note indicator lines stretch for value markers, setting or modifying the distance that note lines span from data points along the value axis, customizing or enabling precise note line length for clearer visual alignment of value axis labels and annotations, managing the length and reach of annotation connectors on value axis scales, tuning the connector line size for value axis notes to improve readability, controlling the span or extent of note connector lines that highlight values on the sparkline’s vertical scale, specifying how long or short the annotation pointer lines appear relative to the value axis, setting the distance that value axis note lines occupy to align notes visually with relevant data points, and configuring the visual length of lines that connect value axis notes to better match the data display context.
</div>

#### Example - set the value axis notes color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          line: {
            length: 20
          },
          data: [{ value: 1 }]
        }
      }
    });
    </script>

### valueAxis.notes.data `Array`

The items of the notes.


<div class="meta-api-description">
How to customize individual notes on a sparkline chart's value axis? Configure, add, or customize individual annotation items, markers, or notes displayed along the value axis of a sparkline chart, including setting their content, positioning, order, visibility, and styles for enhanced axis labeling or highlighting specific values. This supports controlling notes data, annotations on value axis lines, axis markers, or axis commentary to emphasize points on the sparkline’s numeric scale, enabling flexible placement and management of axis-related notes or labels for more insightful visualization and data storytelling.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [10, 15, 8, 12, 18, 6, 14],
        valueAxis: {
            notes: {
                data: [
                    { value: 8, icon: { background: "red" } },
                    { value: 18, icon: { background: "green" } },
                    { value: 6, icon: { background: "orange" } }
                ]
            }
        }
    });
    </script>

### valueAxis.notes.data.value `Object`

The value of the note.


<div class="meta-api-description">
How do I set the position of notes on a Kendo UI sparkline value axis? Set or configure the numeric position, data point, or specific value along the sparkline’s vertical axis where annotations, notes, or markers should appear, enabling precise control over the placement of labels or comments tied to particular data values on the value axis. Control, specify, or define the target location for notes based on data coordinates or numeric positions within the sparkline’s value axis, useful for highlighting, marking, or annotating exact points or measurements during chart initialization or runtime. Adjust, position, or link annotations to the corresponding numeric value on the sparkline’s value axis to ensure notes or comments align accurately with the relevant data point or axis coordinate in visualizations or data displays.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        data: [10, 15, 8, 12, 18, 6, 14],
        valueAxis: {
            notes: {
                data: [
                    { value: 12 },
                    { value: 15 },
                    { value: 8 }
                ]
            }
        }
    });
    </script>

### valueAxis.notes.data.position `String`

The position of the value axis note.

* "top" - The note is positioned on the top.
* "bottom" - The note is positioned on the bottom.
* "left" - The note is positioned on the left.
* "right" - The note is positioned on the right.


<div class="meta-api-description">
How do I align annotation notes in Kendo UI Sparkline? Configure the placement or alignment of annotation notes along the vertical or horizontal value axis in sparklines, controlling whether the note appears above, below, left, or right of the axis line. Adjust the label or marker positioning relative to the data axis to highlight specific values with options to set note location for better visualization, readability, and context in compact charts or small inline graphs. Enable precise control over where notes or data point annotations sit in relation to the axis line for enhanced clarity in minimal chart elements.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            notes: {
                data: [{
                    value: 15,
                    text: "Target",
                    position: "left"
                }]
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.notes.data.icon `Object`

The icon of the note.


<div class="meta-api-description">
How do I customize the icon for data notes on a Kendo UI Sparkline's value axis? Set, change, or customize the icon marker for data notes along the value axis in sparklines, enabling control over the visual appearance, style, and symbol used to represent annotations or highlighted points on the chart’s vertical scale; configure note icons to personalize markers, replace default indicators, adjust note visuals on the numeric axis, and enhance the clarity or emphasis of specific data points within the sparkline’s value axis notes.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            notes: {
                data: [{
                    value: 15,
                    text: "Target",
                    icon: {
                        background: "red",
                        size: 20,
                        type: "circle"
                    }
                }]
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.notes.data.icon.background `String`

The background color of the note icon.


<div class="meta-api-description">
How to customize the background color of note icons on a Sparkline value axis? Control or customize the background color behind note icons on a value axis in sparklines, setting fill colors using hex codes, RGB/RGBA values, named colors, or CSS variables to highlight, style, or differentiate note markers; configure and adjust note icon backgrounds for enhanced visualization, emphasis, and clarity within Sparkline charts, enabling precise color theming, visual highlighting, or custom styling of data annotation icons on the value axis.
</div>

#### Example - set the value axis note icon background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              background: "red"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.icon.border `Object`

The border of the icon.


<div class="meta-api-description">
How to customize the border of data note icons on a sparkline's value axis? Configure and customize the border style, color, width, and dash pattern of data note icons on the value axis in sparklines, enabling control over the visual outline of markers or annotations for value axis data points, including setting stroke properties, border thickness, dashed or solid lines, and color adjustments for enhanced clarity and design consistency on chart data notes.
</div>

#### Example - set the value axis note icon border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              border: {
                width: 2,
                color: "red"
              }
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.icon.border.color `String`

The border color of the icon.


<div class="meta-api-description">
How to change the border color of sparkline value axis notes icons? Adjust or configure the border color, outline hue, or stroke shade of the icons displayed on value axis notes in sparklines to customize the visual style, highlight note markers, emphasize data annotations, control appearance consistency, and enhance readability by setting or modifying the note icon edges along the value axis data indicators.
</div>

#### Example - set the value axis note icon border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              border: {
                width: 2,
                color: "red"
              }
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.icon.border.width `Number`

The border width of the icon.


<div class="meta-api-description">
How to set the width of the border around data point icons in a Kendo UI sparkline's value axis notes? Adjust or configure the thickness, width, or size of the outline, edge, or border around data point icons or markers in a chart’s value axis notes, controlling how bold, thin, or prominent the icon frame appears in sparklines by setting numeric values for icon border thickness or stroke thickness.
</div>

#### Example - set the value axis note icon border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              border: {
                width: 2,
                color: "red"
              }
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.icon.size `Number`

The size of the icon.


<div class="meta-api-description">
How do I adjust the size of data note icons on a Kendo UI sparkline chart? Adjust or configure the size, scale, dimension, or display size of icons representing data notes on the value axis of a sparkline chart to customize visual appearance, control icon spacing, set icon proportions, resize note markers, and ensure graphical consistency with chart design and layout requirements for better readability and user interface alignment.
</div>

#### Example - set the value axis note icon size

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              size: 30
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.icon.type `String` *(default: "circle")*

The icon shape.

The supported values are:
* "circle" - the marker shape is circle.
* "square" - the marker shape is square.
* "triangle" - the marker shape is triangle.


<div class="meta-api-description">
How do I change the shape of data point icons on a Kendo UI sparkline's value axis? Set or customize the shape or marker style of data point icons on a graph's numeric axis notes, selecting from geometric forms like circle, square, or triangle to represent value axis annotations visually; control or configure marker type, shape, icon geometry, note markers, data point indicators, or annotation symbols on the value axis in sparklines or small charts.
</div>

#### Example - set the value axis note icon shape

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              shape: "triangle"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.icon.visible `Boolean` *(default: "true")*

The icon visibility.


<div class="meta-api-description">
How do I show or hide data point icons in a Kendo UI sparkline value axis? Toggle visibility of data point icons or markers on the value axis of sparklines, enabling control over displaying, hiding, or configuring annotation icons that highlight specific data notes, markers, or flagged values within compact charts; adjust or set visibility to manage emphasis on annotated or highlighted data elements, customize icon presence for data notes on value scales, and refine visual cues on inline graphs to emphasize key metrics or flagged points.
</div>

#### Example - set the value axis note icon visibility

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            icon: {
              visible: false
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label `Object`

The label of the note.


<div class="meta-api-description">
How do I customize the label or note displayed alongside data points on a sparkline's value axis? Configure or set the annotation text, label, or note displayed alongside data points on a sparkline's value axis, enabling customization of text content including static strings, dynamic bindings, or formatted labels for data notes or markers on the vertical scale. Enable developers to control and customize the display of textual annotations near data markers on charts, supporting plain text, bound expressions, or rich formatting to highlight, describe, or annotate specific value axis data points, notes, or indicators in sparklines.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            notes: {
                data: [{
                    value: 15,
                    text: "Target",
                    label: {
                        background: "#ffff00",
                        color: "#000000",
                        position: "outside"
                    }
                }]
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.notes.data.label.background `String`

The background color of the label. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
How do I change the background color of data labels on a sparkline value axis? Adjust the background color behind data labels for annotations or notes on the value axis of a sparkline chart to improve visibility, highlight specific points, and ensure better contrast against varying chart backgrounds by setting or customizing label backgrounds with any CSS-compatible color format such as hex codes, RGB, or color names, enabling enhanced readability and emphasis for numerical markers or callouts along the value axis in sparkline visualizations.
</div>

#### Example - set the value axis note label background

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notesdata: {
          data: [{
            value: 1,
            label: {
              background: "red"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.border `Object`

The border of the label.


<div class="meta-api-description">
How to style the border of data label borders in Kendo UI sparklines? Adjust the outline styling, thickness, color, and visibility of labels attached to data notes on the vertical scale or numeric axis in sparklines, enabling customization of the border around value axis annotations, note markers, or data label frames to enhance readability, highlight specific points, or match visual themes in charts and mini graphs.
</div>

#### Example - set the value axis note label border

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                color: "green",
                dashType: "dashDot",
                width: 1
              }
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.border.color `String` *(default: "black")*

The color of the border. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
How do I change the color of the borders around data-point note labels on a Kendo UI Sparkline? Control and customize the outline color of data-point note labels on sparklines by setting the border color using any valid CSS color format, including hex codes, RGB values, or color names. Enable styling of the note label borders to enhance visibility, highlight specific data points, or match design themes by specifying border colors like "#ff0000", "rgb(255,0,0)", or other CSS-compatible strings. Adjust the label border hues to emphasize or differentiate notes within the value axis area, and configure this setting to fit varied UI requirements, aesthetics, or accessibility needs related to data annotations on compact charts.
</div>

#### Example - set the value axis note label border color

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                color: "green"
              }
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.border.dashType `String` *(default: "solid")*

The dash type of the border.

The following dash types are supported:

* "dash" - a line consisting of dashes
* "dashDot" - a line consisting of a repeating pattern of dash-dot
* "dot" - a line consisting of dots
* "longDash" - a line consisting of a repeating pattern of long-dash
* "longDashDot" - a line consisting of a repeating pattern of long-dash-dot
* "longDashDotDot" - a line consisting of a repeating pattern of long-dash-dot-dot
* "solid" - a solid line


<div class="meta-api-description">
How do I customize the border style of data label outlines on a Sparkline's value axis notes? Customize or set the border stroke style pattern for data label outlines on chart value axis notes by configuring the line dash style, choosing from options like dashed lines, dot patterns, dash-dot repeats, long dash variations, or solid strokes to control the visual border appearance, enabling design adjustments for chart annotations, label emphasis, or axis note highlighting with flexible border styling presets.
</div>

#### Example - set the value axis note label border dash type

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                dashType: "dashDot",
                width: 1
              }
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.border.width `Number` *(default: 0)*

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.


<div class="meta-api-description">
How do I adjust the border width of data labels on a sparkline's value axis? Adjust or configure the thickness, size, or width of the outline or border around data labels on the value axis notes in sparklines; control how thick or thin the border appears by specifying pixel values, enabling or disabling the border by setting positive numbers or zero for no border, customizing the visual emphasis or styling of note labels on charts, modifying label framing or edge thickness for clearer data presentation or enhanced visibility in sparkline value axis annotations.
</div>

#### Example - set the value axis note label border width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              border: {
                width: 1
              }
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.color `String`

The text color of the note label. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
How do I change the color of notes in a Kendo UI sparkline? Customize the color of text labels on data point annotations within sparklines to enhance readability, visibility, and contrast by specifying colors using CSS formats like hex, RGB, or named color values. Control, configure, or set annotation label hues to highlight specific values, improve data visualization clarity, adjust label appearance for accessibility, and ensure note labels stand out or blend as needed in compact charts or inline data summaries. Enable styling of sparkline data labels to match themes, emphasize important points, or differentiate note text through precise color adjustments.
</div>

#### Example - set the value axis note label color as a hex string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              color: "#aa00bb"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.font `String` *(default: "12px Arial,Helvetica,sans-serif")*

The font style of the note label.


<div class="meta-api-description">
How to customize font styles for value axis notes in a Kendo UI Sparkline? Customize the typography of data labels linked to value axis notes in sparklines by configuring font attributes such as typeface, size, weight, style, and appearance. Adjust the font family, control label readability, set bold or italic styles, and manage font sizing for note data labels on the value axis to enhance visualization clarity, label emphasis, and overall design consistency in sparkline charts. Enable detailed control over note label text formatting including font customization to meet specific styling, branding, or accessibility requirements within chart annotations.
</div>

#### Example - set the value axis note label font

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              font: "20px sans-serif"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.template `String|Function`

The [template](/api/framework/kendo#methods-template) which renders the labels.

The fields which can be used in the template are:

* value - the axis value


<div class="meta-api-description">
How can I customize the labels on the value axis of a Kendo UI sparkline to display specific data? Customize label rendering on the value axis of sparklines by defining templates to format, bind data, or apply conditional logic for note labels, enabling tailored display of axis values with dynamic text or HTML output, configuring how axis annotations appear with flexible, programmable label content based on the underlying numeric or categorical axis data.
</div>

#### Example - set the value axis note label template as a string

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              template: "Year: #: value #"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.visible `Boolean` *(default: true)*

If set to `true` the chart will display the value axis notes label. By default the value axis notes label are visible.


<div class="meta-api-description">
How can I show/hide value axis note labels on a Kendo UI sparkline chart? Control the visibility of data point annotations and value axis note labels on sparklines, enabling you to show or hide labels that annotate values along the axis. Configure whether value axis notes and data labels appear on sparkline charts, toggle display of numeric labels or comments tied to data points, enable or disable axis note labeling for clearer or cleaner chart presentations, manage visibility of annotations linked to the sparkline’s value axis to emphasize or de-emphasize details, and set label display preferences for highlighting or hiding contextual data information on the value axis.
</div>

#### Example - hide the value axis note label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              visible: false
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.rotation `Number` *(default: 0)*

The rotation angle of the label. By default the label are not rotated.


<div class="meta-api-description">
How can I rotate data labels on a Kendo UI sparkline value axis? Adjust the angle or orientation of data note labels on the value axis of a sparkline chart to enhance clarity, improve label alignment with chart components, rotate text for better readability, or customize label display by specifying the degree of rotation from zero degrees to any desired angle, enabling fine control over label positioning, formatting, and visual arrangement within sparkline visualizations.
</div>

#### Example - rotate the value axis note label

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              rotation: 90
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.format `String` *(default: "{0}")*

The format used to display the note label. Uses [kendo.format](/api/framework/kendo#methods-format). Contains one placeholder ("{0}") which represents the axis value.


<div class="meta-api-description">
How to customize the format of data note labels in a Kendo UI sparkline? Customize and configure the display format of text labels for data notes along a sparkline's vertical or value axis, enabling control over numeric, date, and custom label rendering through format strings compatible with standard formatting conventions that include placeholders for dynamic axis values. Adjust how values, units, percentages, or custom text appear on chart annotations, specifying patterns to set precision, localization, or styling for axis note labels in compact trend lines or data visualizations. Enable formatting configurations for axis note texts to influence the visual presentation of scale markers, leveraging common developer terms such as formatting strings, dynamic placeholders, numeric/date pattern controls, and label customization for insightful data display.
</div>

#### Example - set the value axis note label format

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              format: "value slot: {0}"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.text `String`

The label note text.


<div class="meta-api-description">
How to customize the labels for value axis annotations in a Kendo UI sparkline chart? Set or customize the text content for annotations, labels, or notes attached to data points on the value axis in a sparkline chart, enabling control over how specific point details, messages, or comments appear next to value markers. This property helps configure, define, or override the displayed string for value-axis data labels, supporting use cases like adding custom notes, descriptive text, or context-sensitive information on individual data points within the sparkline visualization. Adjust, format, or specify the exact label shown for value axis notes to highlight, annotate, or clarify data values in small, inline charts.
</div>

#### Example - set the value axis label note text

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            label: {
              text: "A"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.label.position `String` *(default: "inside")*

The position of the value axis note label.

* "inside" - the label is positioned inside of the icon.
* "outside" - the label is positioned outside of the icon.


<div class="meta-api-description">
How to control the placement of note labels on the value axis in a Kendo UI sparkline chart? Adjust the placement or alignment of note labels on the value axis relative to their icons, enabling control over whether labels appear inside, overlaying the icon, or outside, adjacent to the icon; this setting helps customize label positioning for clarity, readability, and visual organization in sparkline charts by configuring, setting, or controlling label location around value axis notes.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            notes: {
                data: [{
                    value: 15,
                    text: "Target",
                    label: {
                        position: "outside"
                    }
                }]
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.notes.data.line `Object`

The line of the note.


<div class="meta-api-description">
How to customize the line connecting annotation notes to value axis points in a Kendo UI Sparkline? Control and customize the connector line linking annotation notes to value axis points in sparklines, including settings for color, thickness, dash style, visibility, line style, stroke, and appearance to tailor how note lines are displayed, rendered, or hidden in sparkline charts with flexible options for styling, formatting, and visual emphasis of note connectors on value axes.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        valueAxis: {
            notes: {
                data: [{
                    value: 15,
                    text: "Target",
                    line: {
                        width: 3,
                        color: "red"
                    }
                }]
            }
        },
        series: [{
            data: [10, 15, 8, 12]
        }]
    });
    </script>

### valueAxis.notes.data.line.width `Number`

The line width of the note.


<div class="meta-api-description">
How do I adjust the line thickness of data notes in a Kendo UI sparkline? Adjust or control the thickness, thickness level, or numeric width of lines for data notes on the vertical or value axis in sparklines, enabling customization of line weight, stroke size, or line border width for annotations or markers attached to data points; configure or set line thickness to enhance visibility, style, or emphasis of notes within miniature charts, including fine-tuning the data note border line dimension on the value axis of sparklines for clearer data visualization and presentation.
</div>

#### Example - set the value axis note line width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            line: {
              width: 4
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.line.color `String`

The line color of the note.


<div class="meta-api-description">
How do I change the color of annotation note lines in a Kendo UI sparkline value axis? Adjust or configure the color of connector lines linking annotation notes to data points on the value axis in sparklines, including setting stroke color for visibility and style using any CSS-compatible color format, controlling note line appearance for clear data callouts, customizing line hues for enhanced annotation emphasis, or changing colors to match themes and improve readability in compact charts with annotated value axes.
</div>

#### Example - set the value axis note color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            line: {
              color: "#aa00bb"
            }
          }]
        }
      }
    });
    </script>

### valueAxis.notes.data.line.length `Number`

The line length of the note.


<div class="meta-api-description">
How to adjust connector line length in Kendo UI sparklines? Adjust and configure the length or extension of connector lines linking data annotations to value axis points in sparklines, controlling the visual spacing, appearance, and distance of note lines from data markers, enabling customization of annotation connector size, line length, and note positioning for clearer data highlight and enhanced chart readability.
</div>

#### Example - set the value axis note color width

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
      series: [{
        data: [1, 2, 3]
      }],
      valueAxis: {
        notes: {
          data: [{
            value: 1,
            line: {
              length: 20
            }
          }]
        }
      }
    });
    </script>

## Methods

### destroy

Prepares the Sparkline for safe removal from the DOM.

Detaches event handlers and removes data entries in order to avoid memory leaks.


<div class="meta-api-description">
How do I safely remove a Kendo UI sparkline chart from my webpage? Remove or delete a sparkline chart element from the webpage and release all related memory, event handlers, listeners, data bindings, and internal references to prevent memory leaks and allow full cleanup and garbage collection. Use this method to safely detach the sparkline from the DOM, stop all associated activity, unbind events, and ensure no lingering references remain that could impact performance or cause conflicts. This operation handles complete disposal and resource freeing for sparkline visualizations or components, enabling developers to effectively remove or reset charts without residual overhead.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    var sparkline = $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12]
        }]
    }).data("kendoSparkline");
    
    sparkline.destroy();
    </script>

### exportImage
Exports the chart as an image.

Inherited from [Chart.exportImage](/api/javascript/dataviz/ui/chart/methods/exportimage)


<div class="meta-api-description">
How do I export a Kendo UI sparkline as an image file? Generate or save the current sparkline visualization as an image file, enabling export, download, printing, or embedding in documents and reports, with options to customize format, resolution, or other export settings; invoke the method to capture the rendered sparkline graphic for use in presentations, web pages, or offline storage, supporting various output controls similar to chart image export features.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    var sparkline = $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12]
        }]
    }).data("kendoSparkline");
    
    sparkline.exportImage().then(function(dataURI) {
        // Display the exported image or save it
        console.log(dataURI);
    });
    </script>

#### Parameters

##### options `Object` *(optional)*
Parameters for the exported image.

##### options.width `String`
The width of the exported image. Defaults to the chart width.

##### options.height `String`
The height of the exported image. Defaults to the chart height.

#### Returns
`Promise` A promise that will be resolved with a PNG image encoded as a Data URI.


### exportPDF
Exports the chart as a PDF file.

Inherited from [Chart.exportPDF](/api/javascript/dataviz/ui/chart/methods/exportpdf)


<div class="meta-api-description">
How can I export a Kendo UI sparkline chart to a PDF file? Generate or download a PDF snapshot of the sparkline chart by triggering client-side PDF export functionality, enabling users to save, print, or share the visual representation of the sparkline as a portable document. This method supports options for customizing PDF output, such as layout, size, and format, facilitating seamless export of chart visuals for reporting, documentation, or offline use. Control, initiate, or configure sparkline chart export specifically to PDF format, capturing the current rendering and ensuring a high-quality file output suitable for presentations, analytics, or archival purposes.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    var sparkline = $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12]
        }]
    }).data("kendoSparkline");
    
    sparkline.exportPDF().then(function(dataURI) {
        // Download or display the PDF
        kendo.saveAs({
            dataURI: dataURI,
            fileName: "sparkline.pdf"
        });
    });
    </script>

#### Parameters

##### options `kendo.drawing.PDFOptions` *(optional)*
Parameters for the exported PDF file.

#### Returns
`Promise` A promise that will be resolved with a PDF file encoded as a Data URI.


### exportSVG
Exports the chart as an SVG document.

Inherited from [Chart.exportSVG](/api/javascript/dataviz/ui/chart/methods/exportsvg)


<div class="meta-api-description">
How to export Kendo UI sparkline chart as SVG? Convert or save the sparkline chart as a scalable vector graphic by exporting its SVG markup, enabling you to generate, download, share, embed, print, or process the vector output of the chart; serialize the sparkline rendering into SVG format for use in web pages, documents, or other applications, supporting exporting, saving, extracting, retrieving, or embedding the graphic as an SVG file or markup for flexible vector-based usage.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    var sparkline = $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12]
        }]
    }).data("kendoSparkline");
    
    sparkline.exportSVG().then(function(dataURI) {
        // Display or save the SVG
        console.log(dataURI);
    });
    </script>

#### Parameters

##### options `Object` *(optional)*
Export options.

##### options.raw `Boolean` *(default: false)*
Resolves the promise with the raw SVG document without the Data URI prefix.

#### Returns
`Promise` A promise that will be resolved with a SVG document encoded as a Data URI.


### refresh

Reloads the data and repaints the chart.


<div class="meta-api-description">
How do I update a Kendo UI sparkline chart with new data? Trigger updating or reloading of the displayed sparkline chart to reflect any changes in the underlying data, whether updated locally via arrays, data sources, or refreshed remotely; invoking this method forces the sparkline to re-fetch data, redraw visuals, re-render the chart, and ensure the displayed trends, values, or data points are current after programmatic modifications, dynamic data updates, or live data refreshes.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    var sparkline = $("#sparkline").kendoSparkline({
        type: "column",
        series: [{
            data: [10, 15, 8, 12]
        }]
    }).data("kendoSparkline");
    
    // Update data and refresh
    sparkline.options.series[0].data = [20, 25, 18, 22];
    sparkline.refresh();
    </script>

### setDataSource

Sets the dataSource of an existing Chart and rebinds it.


<div class="meta-api-description">
How do I update the data in a Kendo UI sparkline chart dynamically? Change or update the data source for a sparkline chart dynamically by configuring, setting, or rebinding the underlying dataset at runtime to reflect new or updated values without recreating the chart component; modify the bound data programmatically to refresh or replace chart content, control the data input for visual trends, and ensure the sparkline updates automatically with new data sets, enabling seamless runtime data swapping, refreshing chart visuals, and adjusting the data binding as needed within applications.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    var sparkline = $("#sparkline").kendoSparkline({
        type: "column"
    }).data("kendoSparkline");
    
    var dataSource = new kendo.data.DataSource({
        data: [
            { value: 10 },
            { value: 15 },
            { value: 8 },
            { value: 12 }
        ]
    });
    
    sparkline.setDataSource(dataSource);
    </script>

#### Parameters

##### dataSource `kendo.data.DataSource`

### setOptions

Sets the widget options. Changes are cumulative.


<div class="meta-api-description">
How can I dynamically update settings for my Kendo UI sparkline chart? Modify or update real-time sparkline chart settings dynamically by configuring appearance, data mappings, styles, behaviors, or interactivity options programmatically without full reinitialization. Adjust visual properties, change data bindings, tweak display parameters, enable incremental updates to chart configurations, and merge new options with existing ones to ensure seamless cumulative customization and responsive control over sparkline rendering and performance during runtime.
</div>

#### Parameters

##### options `Object`

The chart settings to update.

#### Example - change the chart theme
    <span id="sparkline"></span>
    <script>
    $("#sparkline").kendoSparkline({
      theme: "black",
      data: [1, 2, 3]
    });

    var sparkline = $("#sparkline").data("kendoSparkline");
    sparkline.setOptions({ theme: "uniform" });
    </script>

### svg

Returns the [SVG](https://www.w3.org/Graphics/SVG/) representation of the chart.
The returned string is a self-contained SVG document that can be used as is or
converted to other formats using tools like [Inkscape](https://inkscape.org/en) and
[ImageMagick](https://www.imagemagick.org/).
Both programs provide command-line interface suitable for server-side processing.

> This method is obsoleted by [exportSVG](/api/javascript/dataviz/ui/sparkline/methods/exportsvg), but will remain fully functional.


<div class="meta-api-description">
How to export Kendo UI sparkline chart as SVG file? Generate or retrieve a complete standalone SVG string representation of a sparkline chart that can be saved as an independent .svg file, embedded inline within HTML, or used as a source for conversion and exporting workflows; enable exporting, downloading, embedding, or server-side processing of the chart graphic as vector-based SVG for subsequent transformation into other formats like PNG, JPEG, or PDF using command-line tools such as Inkscape or ImageMagick, supporting chart visualization export, integration into web applications, and automated image pipelines.
</div>

#### Returns

`String` the SVG representation of the sparkline.

#### Example

    <span id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        data: [1, 2, 3, 4]
    });
    var sparkline = $("#sparkline").data("kendoSparkline");
    var svg = sparkline.svg();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(svg); // displays the SVG string
    </script>

### imageDataURL

Returns a PNG image of the sparkline encoded as a [Data URL](https://developer.mozilla.org/en-US/docs/data_URIs).

> This method is deprecated and replaced by [exportImage](/api/javascript/dataviz/ui/sparkline/methods/exportimage).


<div class="meta-api-description">
How to programmatically convert Kendo UI sparkline chart to base64-encoded image string? Generate or extract a base64-encoded PNG image string representing the sparkline chart for purposes like saving snapshots, embedding visuals in web pages, printing graphics, or uploading image data. This method converts the sparkline visualization into a Data URL format suitable as the src attribute in image tags or for transferring image content in code, facilitating export or snapshot workflows. Users often seek ways to capture sparkline images programmatically, convert charts to portable image formats, or encode small graphic data inline for embedding or storage.
</div>

#### Returns

`String` A data URL with `image/png` MIME type. Will be `null` if the browser does not support the `canvas` element.

#### Example - show a snapshot of the Sparkline

    <span id="sparkline"></div>
    <a download="export.png" id="export" class="k-button">Export PNG</a>
    <script>
    $("#sparkline").kendoSparkline({
        type: "column",
        data: [1, 2, 3, 4]
    });

    $("#export").on("click", function() {
      var sparkline = $("#sparkline").data("kendoSparkline");
      var imageDataURL = sparkline.imageDataURL();

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

## Events

### axisLabelClick

Fires when an axis label is clicked.


<div class="meta-api-description">
How do I trigger an event when a user clicks on an axis label in a Kendo UI sparkline? Detect, capture, or respond to user interactions or clicks specifically on chart axis labels within sparklines to enable custom behaviors like navigation, filtering data, drill-down actions, or showing contextual menus triggered by axis label selections; implement event listeners or handlers for label click events to control UI reactions, link clicks to data queries, or enhance user engagement through interactive axis element clicks in sparklines.
</div>

#### Example

    function onAxisLabelClick(e) {
        alert("Clicked " + e.axis.type + " axis label with value: " + e.value);
    }

#### Event Data

##### e.axis `Object`

The axis that the label belongs to.

##### e.value `Object`

The label value or category name.

##### e.text `Object`

The label text.

##### e.index `Object`

The label sequential index or category index.

##### e.dataItem `Object`

The original data item used to generate the label.
**Applicable only for data bound category axis.**

##### e.element `Object`

The DOM element of the label.

### dataBound

Fires when the sparkline has received data from the data source
and is about to render it.


<div class="meta-api-description">
What event is triggered after data loading completes in a Kendo UI sparkline? Trigger actions or functions immediately after data loading completes and just before visual rendering starts to update charts, refresh components, compute calculated fields, or attach UI elements; handle events fired post data retrieval to respond to new datasets, manipulate display elements based on fresh data, synchronize dependent views, or initiate reactive updates on data change within sparkline or similar data visualizations.
</div>

#### Example

    function onDataBound(e) {
        // Series data is now available
    }

### dragStart

Fires when the user has used the mouse or a swipe gesture to drag the sparkline.

The drag operation can be aborted by calling `e.preventDefault()`.


<div class="meta-api-description">
How to handle drag start event on Kendo UI Sparkline chart? Detect when users begin dragging a sparkline chart using mouse or touch gestures, enabling customization of drag interactions, intercepting drag initiation, updating dynamic visuals during drag start, handling swipe or click-and-drag inputs, triggering events on drag commencement, controlling or preventing default drag behavior, monitoring user gestures for sparkline movement, and managing drag cancellation by blocking or overriding the drag action at the initial drag phase.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12, 18, 5]
        }],
        dragStart: function(e) {
            console.log("Drag started");
            // Optionally prevent drag: e.preventDefault();
        }
    });
    </script>

#### Event Data

##### e.axisRanges `Object`

A hastable containing the initial range (min and max values) of *named* axes.
The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the drag action.

### drag

Fires as long as the user is dragging the sparkline using the mouse or swipe gestures.


<div class="meta-api-description">
How to capture drag interactions on a Kendo UI sparkline chart? Capture continuous pointer or touch movement during drag interactions over a sparkline chart to track user input in real-time, enabling live updates such as dynamic tooltips, interactive selection highlighting, hover feedback, panning gestures, or custom drag-and-drop behavior; supports monitoring every cursor or finger movement for smooth interaction handling, responsive UI feedback, and precise control during mouse drag or touch swipe operations.
</div>

#### Event Data

##### e.axisRanges `Object`

A hastable containing the suggested current range (min and max values) of *named* axes.
The axis name is used as a key.

Note that the axis ranges are not updated automatically. You need to call
set_options with either the suggested or custom min/max values for them to take effect.

#### Example

    $("#sparkline").kendoSparkline({
        valueAxis: {
            name: "price"
        },
        drag: onDrag
        ...
    }

    function onDrag(e) {
        var minPrice = e.axisRanges.price.min;
    }

##### e.originalEvent `Object`

The original user event that triggered the drag action.

### dragEnd

Fires when the user stops dragging the sparkline.


<div class="meta-api-description">
How to capture drag completion events in Kendo UI sparkline chart? Detect when a user finishes dragging or moving elements within a sparkline chart by capturing drag completion events, enabling updates to application state, committing final selections or positions, tracking drag stop actions, handling drag release, and triggering subsequent functions or workflows after a drag operation ends.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12, 18, 5]
        }],
        dragEnd: function(e) {
            console.log("Drag ended");
            console.log("Final axis ranges:", e.axisRanges);
        }
    });
    </script>

#### Event Data

##### e.axisRanges `Object`

A hastable containing the final range (min and max values) of *named* axes.
The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the drag action.

### paneRender

Fires when a pane is rendered because the chart is rendered, or the chart performs panning or zooming, or because the chart is exported with different options. The event can be used to render custom visuals in the panes.


<div class="meta-api-description">
How to customize pane rendering in Kendo UI sparkline chart? Customize and control dynamic pane rendering events triggered during initial chart display, panning, zooming, or exporting by capturing rendering moments within sparklines to add overlays, annotations, or custom SVG and Canvas graphics, synchronize pane visuals with external data sources or other UI components, and respond interactively to view changes, enabling developers to intercept and manipulate pane redraw cycles, implement custom visuals, or integrate real-time pane content updates across varied chart states and export scenarios.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12]
        }],
        paneRender: function(e) {
            console.log("Pane rendered:", e.name);
        }
    });
    </script>

#### Event Data

##### pane `kendo.dataviz.ChartPane`

The chart pane that was rendered.

##### name `String`

The pane name.

##### index `Number`

The pane index.

##### e.sender `kendo.dataviz.ui.Sparkline`

The widget instance which fired the event.

### plotAreaClick

Fires when plot area is clicked.


<div class="meta-api-description">
How do I handle clicks on the plot area of a Kendo UI Sparkline chart? Detect and handle user clicks within the chart's plot area by capturing events when the graph background is clicked, enabling developers to trigger custom actions, manage interactive features such as selection or navigation, access detailed event information including mouse coordinates and native DOM click data, and implement dynamic responses like showing tooltips, activating drill-downs, or initiating contextual behaviors based on click input inside the visual chart region.
</div>

#### Example

    function onPlotAreaClick(e) {
        alert("Clicked X axis value: " + e.x);
    }

#### Event Data

##### e.value `Object`

The data point value.
Available only for categorical charts (bar, line, area and similar).

##### e.category `Object`

The data point category.
Available only for categorical charts (bar, line, area and similar).

##### e.element `Object`

The DOM element of the plot area.

##### e.x `Object`

The X axis value or array of values for multi-axis charts.

##### e.y `Object`

The X axis value or array of values for multi-axis charts.

### plotAreaHover

Fired when the user hovers the plot area.


<div class="meta-api-description">
How do I handle hover events on a Sparkline plot area in Kendo UI for jQuery? Detect and handle user pointer movements over the small chart area to trigger custom hover interactions, such as displaying tooltips outside the chart, highlighting specific plot regions, executing custom logic on mouse or touch hover, and capturing event details to link pointer positions or gestures with your application’s interactive features.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12]
        }],
        plotAreaHover: function(e) {
            console.log("Plot area hovered at category:", e.category);
        }
    });
    </script>

#### Event Data

##### e.category `Object`

The data point category.

##### e.element `Object`

The DOM element of the plot area.

##### e.originalEvent `Object`

The original browser event that triggered the hover action.

##### e.sender `kendo.dataviz.ui.Sparkline`

The widget instance which fired the event.

##### e.value `Object`

The data point value.

### plotAreaLeave

Fired when the cursor leaves the plotArea.


<div class="meta-api-description">
How to detect when mouse exits Kendo UI sparkline chart area? Detect when the mouse, pointer, or cursor exits or leaves the chart area, plot region, or graph boundary, enabling detection of hover end, pointer out, or mouse leave events on small inline charts, Kendo sparklines, or data visualizations to trigger UI updates, remove highlight styles, hide tooltips, or manage state changes when interaction with the plotted area stops or ends.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12]
        }],
        plotAreaLeave: function(e) {
            console.log("Left plot area");
        }
    });
    </script>

#### Event Data

##### e.sender `kendo.dataviz.ui.Sparkline`

### seriesClick

Fires when chart series are clicked.


<div class="meta-api-description">
How do I handle click events on individual series in a Kendo UI Sparkline? Capture and respond to user interactions with chart data segments by detecting click events on individual sparkline series elements, enabling developers to configure event handlers that receive detailed contextual information about the clicked data point and series, facilitating dynamic UI updates like selection, drilldown into finer data levels, navigation to related views, or display of additional details, supporting use cases such as interactive data exploration, custom analytics workflows, and responsive interface behavior based on user input within sparkline visualizations.
</div>

#### Example

    function onSeriesClick(e) {
        alert("Clicked value: " + e.value);
    }

#### Event Data

##### e.value `Object`

The data point value.

##### e.category `Object`

The data point category

##### e.series `Object`

The clicked series.

##### e.series.type `String`

The series type

##### e.series.name `String`

The series name

##### e.series.data `Array`

The series data points

##### e.dataItem `Object`

The original data item (when binding to dataSource).

##### e.element `Object`

The DOM element of the data point.

##### e.percentage `Object`

The point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.

### seriesHover

Fires when chart series are hovered. The data that is available when the event is fired is listed below.


<div class="meta-api-description">
How can I capture mouse hover events over individual data series in a Kendo UI sparkline chart? Detect and respond to user pointer or mouse hover actions over individual chart data series by capturing events that provide access to hovered series data, index, and interaction context, enabling dynamic updates, custom tooltips, highlighting, interactive UI changes, or custom code execution on series mouseover or pointer movements in sparkline or line charts, supporting scenarios like inspecting hovered points, triggering visual feedback, or integrating external component updates based on user hover behavior over chart series.
</div>

#### Example

    <h4>Climate control history</h4>
    <span id="hum-log"></span>
    <script>
      function createSparklines() {
        $("#hum-log").kendoSparkline({
          type: "area",
          data: [
            71, 70, 69, 68, 65, 60, 55, 55, 50, 52,
            73, 72, 72, 71, 68, 63, 57, 58, 53, 55,
            63, 59, 61, 64, 58, 53, 48, 48, 45, 45,
            63, 64, 63, 67, 58, 56, 53, 59, 51, 54
          ],
          tooltip: {
            format: "{0} %"
          },
          seriesHover: onSeriesHover
        });
      }

      function onSeriesHover(e) {
        console.log("Hovered value: " + e.value);
      }

      $(document).ready(createSparklines);
    </script>

#### Event Data

##### e.value `Object`

The data point value.

##### e.category `Object`

The data point category

##### e.series `Object`

The clicked series.

##### e.series.type `String`

The series type

##### e.series.name `String`

The series name

##### e.series.data `Array`

The series data points

##### e.dataItem `Object`

The original data item (when binding to dataSource).

##### e.element `Object`

The DOM element of the data point.

##### e.percentage `Object`

The point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.

### seriesOver

Fired when the cursor is over the chart series.


<div class="meta-api-description">
How do I detect when the user hovers over a series in a Kendo UI sparkline? Detect and handle mouse hover or cursor movement over chart series in sparkline visualizations, enabling developers to trigger custom code such as highlighting data points, displaying dynamic tooltips, updating linked UI elements, or executing interactive behaviors when a user moves or places the pointer above a data series. This covers scenarios like configuring hover detection, managing mouseover events on sparkline graphs, binding event handlers to series elements, controlling interactive responses to pointer events on data visualizations, and implementing real-time updates based on cursor position for enhanced user engagement and interactivity in chart components.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12]
        }],
        seriesOver: function(e) {
            console.log("Series over:", e.value, "at category:", e.category);
        }
    });
    </script>

#### Event Data

##### e.category `Object`

The data point category

##### e.dataItem `Object`

The original data item (when binding to dataSource).

##### e.element `Object`

The DOM element of the data point.

##### e.originalEvent `Object`

The original browser event that triggered the hover action.

##### e.percentage `Object`

The point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.

##### e.sender `kendo.dataviz.ui.Sparkline`

The widget instance which fired the event.

##### e.series `Object`

The clicked series.

##### e.series.type `String`

The series type

##### e.series.name `String`

The series name

##### e.series.data `Array`

The series data points

##### e.stackValue `Object`

The cumulative point value on the stack. Available only for stackable series.

##### e.value `Object`

The data point value.

### seriesLeave

Fired when the cursor leaves a chart series.


<div class="meta-api-description">
How can I detect when the user's cursor leaves a specific series in my Kendo UI sparkline chart? Detect when the pointer or cursor exits a chart series area to handle post-hover interactivity such as hiding tooltips, removing highlights, resetting visual states, triggering cleanup operations, or capturing analytics events when user hover ends on sparkline data segments; configure event listeners to respond to pointer leave actions on series elements, access event details like series metadata and pointer event data, and manage user interface feedback or interaction logic tied to the end of a hovered series in sparkline visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12]
        }],
        seriesLeave: function(e) {
            console.log("Left series:", e.value, "at category:", e.category);
        }
    });
    </script>

#### Event Data

##### e.category `Object`

The data point category

##### e.dataItem `Object`

The original data item (when binding to dataSource).

##### e.element `Object`

The DOM element of the data point.

##### e.originalEvent `Object`

The original browser event that triggered the hover action.

##### e.percentage `Object`

The point value represented as a percentage value. Available only for donut, pie and 100% stacked charts.

##### e.sender `kendo.dataviz.ui.Sparkline`

The widget instance which fired the event.

##### e.series `Object`

The clicked series.

##### e.series.type `String`

The series type

##### e.series.name `String`

The series name

##### e.series.data `Array`

The series data points

##### e.stackValue `Object`

The cumulative point value on the stack. Available only for stackable series.

##### e.value `Object`

The data point value.

### zoomStart

Fires when the user has used the mousewheel to zoom the chart.

The zoom operation can be aborted by calling `e.preventDefault()`.


<div class="meta-api-description">
How do I intercept mouse wheel zoom actions on Kendo UI sparkline charts? Capture and control mouse wheel zoom actions on small inline charts by intercepting zoom initiation events, enabling detection and optional prevention of zoom gestures, supporting conditions to disable zoom, update interface states during zoom attempts, manage or cancel scaling interactions triggered by wheel input, handle event callbacks for zoom start on sparkline charts, and implement custom logic for intercepting, blocking, or responding to user zoom gestures via mouse wheel scrolling on compact data visualizations.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12, 18, 5, 22, 14]
        }],
        zoomStart: function(e) {
            console.log("Zoom started");
            // Optionally prevent zoom: e.preventDefault();
        }
    });
    </script>

#### Event Data

##### e.axisRanges `Object`

A hastable containing the initial range (min and max values) of *named* axes.
The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the zoom action.

### zoom

Fires as long as the user is zooming the chart using the mousewheel.


<div class="meta-api-description">
How do I detect continuous zoom actions in Kendo UI sparkline charts? Listen for continuous zoom actions triggered by mousewheel scrolling to detect and respond to user zoom gestures on sparkline charts, enabling real-time updates, dynamic visual scaling, throttled event handling for performance optimization, synchronization of linked components during zoom interactions, and customizable reactions to progressive zoom levels as users scroll or pinch to zoom continuously.
</div>

#### Event Data

##### e.axisRanges `Object`

A hastable containing the suggested current range (min and max values) of *named* axes.
The axis name is used as a key.

Note that the axis ranges are not updated automatically. You need to call
set_options with either the suggested or custom min/max values for them to take effect.

#### Example

    $("#sparkline").kendoSparkline({
        valueAxis: {
            name: "price"
        },
        zoom: onZoom
        ...
    }

    function onZoom(e) {
        var minPrice = e.axisRanges.price.min;
    }

##### e.delta `Number`

A number that indicates the zoom amount and direction.

A negative delta indicates "zoom in", while a positive "zoom out".

##### e.originalEvent `Object`

The original user event that triggered the zoom action.

This event can be used to prevent the default mousewheel action (scroll).

#### Example

    function onZoom(e) {
        // Prevent window scroll
        e.originalEvent.preventDefault();
    }

### zoomEnd

Fires when the user stops zooming the chart.


<div class="meta-api-description">
How to detect when zooming on a Kendo UI sparkline chart is finished? Detect when zooming on a sparkline chart finishes to trigger actions after user interaction such as pinch zoom, drag selection, or mouse wheel zoom ends; capture the event signaling the completion of zooming to update interfaces, reset or adjust axis ranges, reload or fetch data based on the current zoom window, save zoom levels for persistence, and respond to changes in zoom state during interactive chart navigation or exploration.
</div>

#### Example

    <div id="sparkline"></div>
    <script>
    $("#sparkline").kendoSparkline({
        type: "line",
        series: [{
            data: [10, 15, 8, 12, 18, 5, 22, 14]
        }],
        zoomEnd: function(e) {
            console.log("Zoom ended");
            console.log("Final axis ranges:", e.axisRanges);
        }
    });
    </script>

#### Event Data

##### e.axisRanges `Object`

A hastable containing the final range (min and max values) of *named* axes.
The axis name is used as a key.

##### e.originalEvent `Object`

The original user event that triggered the zoom action.
