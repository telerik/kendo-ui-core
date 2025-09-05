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
