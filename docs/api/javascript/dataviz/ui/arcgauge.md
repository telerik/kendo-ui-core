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

### colors `Array`

The color ranges of the value pointer. The pointer color will be set to the color from the range that contains the current value.

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

### colors.from `Number`

The lower range value of the applied color.

### colors.to `Number`

The upper range value of the applied color.

### gaugeArea `Object`

The gauge area configuration options. This is the entire visible area of the gauge.

### gaugeArea.background `String`*(default: "white")*

The background of the gauge area. Any valid CSS color string will work here, including hex and rgb.

### gaugeArea.border `Object`

The border of the gauge area.

### gaugeArea.border.color `String`*(default: "black")*

The color of the border. Any valid CSS color string will work here, including hex and rgb.

### gaugeArea.border.dashType `String`*(default: "solid")*

The dash type of the border.

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

### gaugeArea.border.width `Number`*(default: 0)*

The width of the border.

### gaugeArea.height `Number`

The height of the gauge area.

### gaugeArea.margin `Number|Object`*(default: 5)*

The margin of the gauge area.

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

### gaugeArea.margin.bottom `Number`

The bottom margin of the gauge area.

### gaugeArea.margin.left `Number`

The left margin of the gauge area.

### gaugeArea.margin.right `Number`

The right margin of the gauge area.

### gaugeArea.width `Number`

The width of the gauge area.

### opacity `Number`

The opacity of the value pointer.

### renderAs `String`

Sets the preferred rendering engine.
If it is not supported by the browser, the Gauge will switch to the first available mode.

The supported values are:

* "svg" - renders the widget as inline SVG document, if available
* "canvas" - renders the widget as a Canvas element, if available.

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

### scale.endAngle `Number`*(default: 180)*

The end angle of the gauge.
The gauge is rendered clockwise(0 degrees are the 180 degrees in the polar coordinate system)

### scale.labels `Object`

Configures the scale labels.

### scale.labels.background `String`

The background color of the labels.
Any valid CSS color string will work here, including hex and rgb

### scale.labels.border `Object`

The border of the labels.

### scale.labels.border.color `String`

The color of the border. Any valid CSS color string will work here, including hex and rgb.

### scale.labels.border.dashType `String`*(default: "solid")*

The dash type of the border.

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

### scale.labels.border.width `Number`*(default: 0)*

 The width of the border.

### scale.labels.color `String`

The text color of the labels.
Any valid CSS color string will work here, including hex and rgb.

### scale.labels.font `String`*(default: "12px Arial,Helvetica,sans-serif")*

The font style of the labels.

### scale.labels.format `String`

The format of the labels.

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

### scale.labels.margin.top `Number`

The top margin of the labels.

### scale.labels.margin.bottom `Number`

The bottom margin of the labels.

### scale.labels.margin.left `Number`

The left margin of the labels.

### scale.labels.margin.right `Number`

The right margin of the labels.

### scale.labels.padding `Number | Object`*(default: 0)*

 The padding of the labels.

### scale.labels.padding.top `Number`

The top padding of the labels.

### scale.labels.padding.bottom `Number`

The bottom padding of the labels.

### scale.labels.padding.left `Number`

The left padding of the labels.

### scale.labels.padding.right `Number`

The right padding of the labels.

### scale.labels.position `String`*(default: "inside")*

The labels positions.

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

### scale.majorTicks `Object`

Configures the scale major ticks.

### scale.majorTicks.color `String`

The color of the major ticks.

### scale.majorTicks.size `Number`

The major tick size.
This is the length of the line in pixels that is drawn to indicate the tick on the scale.

### scale.majorTicks.visible `Boolean`*(default: false)*

The visibility of the major ticks.

### scale.majorTicks.width `Number`*(default: 0.5)*

 The width of the major ticks.

### scale.majorUnit `Number`

The interval between major divisions.

### scale.max `Number`*(default: 100)*

The maximum value of the scale.

### scale.min `Number`*(default: 0)*

The minimum value of the scale.

### scale.minorTicks `Object`

Configures the scale minor ticks.

### scale.minorTicks.color `String`

The color of the minor ticks.
Any valid CSS color string will work here, including hex and rgb.

### scale.minorTicks.size `Number`

The minor tick size.
This is the length of the line in pixels that is drawn to indicate the tick on the scale.

### scale.minorTicks.visible `Boolean`*(default: false)*

The visibility of the minor ticks.

### scale.minorTicks.width `Number`*(default: 0.5)*

The width of the minor ticks.

### scale.minorUnit `Number`

The interval between minor divisions.

### scale.rangeLineCap `String`*(default: "round")*

The lineCap style of the ranges.

The supported values are:

* `"butt"`
* `"round"`
* `"square"`

### scale.rangePlaceholderColor `String`

The default color for the ranges.

### scale.rangeSize `Number`

The width of the range indicators.

### scale.rangeDistance `Number`

The distance from the range indicators to the ticks.

### scale.reverse `Boolean`*(default: false)*

Reverses the scale direction - values are increase anticlockwise.

### scale.startAngle `Number`*(default: 0)*

The start angle of the gauge.
The gauge is rendered clockwise(0 degrees are the 180 degrees in the polar coordinate system)

### theme `String`

The gauge theme. This can be either a built-in theme or "sass".
When set to "sass" the gauge will read the variables from the [Sass-based themes]({% slug sassbasedthemes_kendoui %}).

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

### transitions `Boolean`*(default: true)*

A value indicating if transition animations should be played.

### value `Number`

The gauge value.

## Methods

### destroy

Prepares the Gauge for safe removal from the DOM.

Detaches event handlers and removes data entries in order to avoid memory leaks.

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

The export operation is asynchronous and returns a [promise](http://api.jquery.com/Types/#Promise).
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

The export operation is asynchronous and returns a [promise](http://api.jquery.com/Types/#Promise).
The promise will be resolved with a PDF file encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

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

The export operation is asynchronous and returns a [promise](http://api.jquery.com/Types/#Promise).
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

Returns the [SVG](http://www.w3.org/Graphics/SVG/) representation of the gauge.
The returned string is a self-contained SVG document that can be used as is or
converted to other formats using tools like [Inkscape](https://inkscape.org/en) and
[ImageMagick](http://www.imagemagick.org/).
Both programs provide command-line interface suitable for server-side processing.

> This method is obsoleted by [exportSVG](/api/javascript/dataviz/ui/arcgauge/methods/exportsvg), but will remain fully functional.

#### Example

    <div id="gauge"></div>
    <script>
        $("#gauge").kendoArcGauge({
            value: 50
        });
        var gauge = $("#gauge").data("kendoArcGauge");
        var svg = gauge.svg();
        console.log(svg); // displays the SVG string
    </script>

### imageDataURL

Returns a PNG image of the gauge encoded as a [Data URL](https://developer.mozilla.org/en-US/docs/data_URIs).

> This method is obsoleted and replaced by [exportImage](/api/javascript/dataviz/ui/arcgauge/methods/exportimage), but will remain fully functional.

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

        // See: http://goo.gl/qlg5dd
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
        $("#gauge").kendoArcGauge({
            value: 50
        });

        setTimeout(function(){
            $("#gauge").data("kendoArcGauge").value(20);
        },1000);
    </script>
