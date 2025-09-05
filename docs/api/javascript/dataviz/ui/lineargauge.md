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

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 5px (by default)
    margin: { top: 1, left: 1 }

### gaugeArea.margin.top `Number`

The top margin of the gauge area.

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

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 5px (by default)
    margin: { top: 1, left: 1 }

### pointer.opacity `Number`*(default: 1)*

 The opacity of the pointer.

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

#### Example

    // sets the top, right, bottom and left margin to 3px.
    margin: 3

    // sets the top and left margin to 1px
    // margin right and bottom are with 5px (by default)
    margin: { top: 1, left: 1 }

### scale.labels.margin.top `Number`

The top margin of the labels.

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

#### Example

    var gauge = $("#linear-gauge").data("kendoLinearGauge");
    gauge.redraw();

### resize

Adjusts the widget layout to match the size of the container.

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

#### Example

    $("#linear-gauge").data("kendoLinearGauge").value(20);
