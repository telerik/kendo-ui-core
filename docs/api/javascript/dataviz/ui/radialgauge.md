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
