---
title: Barcode
page_title: Configuration, methods and events of Kendo UI DataViz Barcode
description: Manipulate the configuration options of Barcode, configure the color of the bars/text and change the value.
---

# kendo.dataviz.ui.Barcode

## Configuration

### renderAs `String` *(default: "svg")*

Sets the preferred rendering engine.
If it is not supported by the browser, the Barcode will switch to the first available mode.

The supported values are:

* "canvas" - renders the widget as a Canvas element, if available.
* "svg" - renders the widget as inline SVG document, if available
* "vml" - renders the widget as VML, if available

#### Example - Render as SVG, if supported

    <div id="barcode"></div>
    <script>
    $("#barcode").kendoBarcode({
      width: 300,
      value:"123456",
      renderAs: "svg"
    });
    </script>

### background `String` *(default: "white")*

The background of the barcode area.
Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="barcode"></div>
    <script>
    $("#barcode").kendoBarcode({
      width: 300,
      value: "HELLO WORLD",
      background: "#2eb3a6"
    });
    </script>

### border `Object`

The border of the barcode area.

#### Example - set the border of the barcode

    <div id="barcode"></div>
    <script>
    $("#barcode").kendoBarcode({
      value:"123456",
      width: 300,
      border: {
        width: 2,
        dashType: "solid",
        color: "black"
      }
    });
    </script>

### border.color `String` *(default: "black")*

The color of the border. Any valid CSS color string will work here, including hex and rgb.

### border.dashType `String` *(default: "solid")*

The dash type of the border.

### border.width `Number` *(default: 0)*

The width of the border.

### checksum `Boolean` *(default: false)*

If set to `true` the barcode will not display the checksum digit next to the value in the text area.

#### Example

    <div id="barcode"></div>
    <script>
    $("#barcode").kendoBarcode({
      type: "ean8",
      value: "1234567",
      checksum: true
    });
    </script>

### color `String` *(default: "black")*

The color of the bar elements.
Any valid CSS color string will work here, including hex and rgb.

#### Example

    <div id="barcode"></div>
    <script>
    $("#barcode").kendoBarcode({
      type: "ean13",
      value: "123456789987",
      color: "#10c4b2"
    });
    </script>

### height `Number` *(default: 100)*

The height of the barcode in pixels.  By default the height is 100.

#### Example

    <div id="barcode"></div>
    <script>
    $("#barcode").kendoBarcode({
      type: "ean13",
      value: "123456789987",
      color: "#10c4b2",
      width: 300
    });
    </script>

### padding `Object`

The padding of the barcode.

#### Example - set the padding of the barcode

    <div id="barcode"></div>
    <script>
    $("#barcode").kendoBarcode({
      value:"123456",
      width: 300,
      padding: {
        top: 20,
        left: 5,
        right: 5,
        bottom: 5
      }
    });
    </script>

### padding.bottom `Number` *(default: 0)*

The bottom padding of the barcode.

### padding.left `Number` *(default: 0)*

The left padding of the barcode.

### padding.right `Number` *(default: 0)*

The right padding of the barcode.

### padding.top `Number` *(default: 0)*

The top padding of the barcode.

### text `Object`

Can be set to a JavaScript object which represents the text configuration.

#### Example

    <div id="barcode"></div>
    <script>
    $("#barcode").kendoBarcode({
      value:"123456",
      width: 300,
      text:{
        color: "red",
        font: "20px sans-serif"
      }
    });
    </script>

### text.color `String` *(default: "black")*

The color of the text. Any valid CSS color string will work here, including hex and rgb.

### text.font `String` *(default: "16px Consolas, Monaco, Sans Mono, monospace, sans-serif")*

The font of the text.

### text.margin `Object`

The margin of the text

#### Example - set the margin of the text.

    <div id="barcode"></div>
    <script>
    $("#barcode").kendoBarcode({
      value:"123456",
      width: 300,
      text:{
        margin : {
          top: 3
        }
      }
    });
    </script>

### text.margin.bottom `Number` *(default: 0)*

The bottom margin of the text.

### text.margin.left `Number` *(default: 0)*

The left margin of the text.

### text.margin.right `Number` *(default: 0)*

The right margin of the text.

### text.margin.top `Number` *(default: 0)*

The top margin of the text.

### text.visible `Boolean` *(default:true)*

If set to false the barcode will not display the value as a text below the barcode lines.

#### Example

    <div id="barcode"></div>
    <script>
    $("#barcode").kendoBarcode({
      value:"123456",
      text:{
        visible: false
      }
    });
    </script>

### type `String` *(default: "code39")*

The symbology (encoding) the barcode will use.

The supported values are:

* EAN8
* EAN13
* UPCE
* UPCA
* Code11
* Code39
* Code39Extended
* Code93
* Code93Extended
* Code128
* Code128A
* Code128B
* Code128C
* GS1-128
* MSImod10
* MSImod11
* MSImod1010
* MSImod1110
* POSTNET

#### Example

    <div id="barcode"></div>
    <script>
    $("#barcode").kendoBarcode({
      type: "code128",
      value:"Hello World",
      width: 400
    });
    </script>

### value `String`

The initial value of the Barcode

#### Example

    <div id="barcode"></div>
    <script>
    $("#barcode").kendoBarcode({
      value:"12345",
      width: 300
    });
    </script>

### width `Number` *(default: 300)*

The width of the barcode in pixels.  By default the width is 300.

#### Example

    <div id="barcode"></div>
    <script>
    $("#barcode").kendoBarcode({
      type: "code128",
      value:"Hi",
      width: 200
    });
    </script>

## Methods

### exportImage
Exports the barcode as an image.
The result can be saved using [kendo.saveAs](/api/javascript/kendo#methods-saveAs).

The export operation is asynchronous and returns a [promise](http://api.jquery.com/Types/#Promise).
The promise will be resolved with a PNG image encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

#### Parameters

##### options `Object` *(optional)*
Parameters for the exported image.

##### options.width `String`
The width of the exported image. Defaults to the barcode width.

##### options.height `String`
The height of the exported image. Defaults to the barcode height.

#### Returns
`Promise` A promise that will be resolved with a PNG image encoded as a Data URI.

#### Example - Exporting a barcode to an image
    <div id="barcode"></div>
    <script>
        $("#barcode").kendoBarcode({
          value: "BAR",
          width: 300
        });

        var barcode = $("#barcode").getKendoBarcode();
        barcode.exportImage().done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "barcode.png"
            });
        });
    </script>


### exportPDF
Exports the barcode as a PDF file.
The result can be saved using [kendo.saveAs](/api/javascript/kendo#methods-saveAs).

The export operation is asynchronous and returns a [promise](http://api.jquery.com/Types/#Promise).
The promise will be resolved with a PDF file encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

#### Parameters

##### options `kendo.drawing.PDFOptions` *(optional)*
Parameters for the exported PDF file.

#### Returns
`Promise` A promise that will be resolved with a PDF file encoded as a Data URI.

#### Example - Exporting a barcode to a PDF file
    <div id="barcode"></div>
    <script>
        $("#barcode").kendoBarcode({
          value: "BAR",
          width: 300
        });

        var barcode = $("#barcode").getKendoBarcode();
        barcode.exportPDF({ paperSize: "A5", landscape: true }).done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "barcode.pdf"
            });
        });
    </script>


### exportSVG
Exports the barcode as an SVG document.
The result can be saved using [kendo.saveAs](/api/javascript/kendo#methods-saveAs).

The export operation is asynchronous and returns a [promise](http://api.jquery.com/Types/#Promise).
The promise will be resolved with a SVG document encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

#### Parameters

##### options `Object` *(optional)*
Export options.

##### options.raw `Boolean` *(default: false)*
Resolves the promise with the raw SVG document without the Data URI prefix.

#### Returns
`Promise` A promise that will be resolved with a SVG document encoded as a Data URI.

#### Example - Exporting a barcode to an SVG document
    <div id="barcode"></div>
    <script>
        $("#barcode").kendoBarcode({
          value: "BAR",
          width: 300
        });

        var barcode = $("#barcode").getKendoBarcode();
        barcode.exportSVG().done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "barcode.svg"
            });
        });
    </script>

### imageDataURL

Returns a PNG image of the barcode encoded as a [Data URL](https://developer.mozilla.org/en-US/docs/data_URIs).

> This method is deprecated and replaced by [exportImage](#methods-exportImage).

#### Returns

`String` A data URL with `image/png` MIME type. Will be `null` if the browser does not support the `canvas` element.

#### Example - show a snapshot of the Barcode

    <div id="barcode"></div>
    <a download="export.png" id="export" class="k-button">Export PNG</a>
    <script>
    $("#barcode").kendoBarcode({
      value: "FOO",
      width: 300
    });

    $("#export").on("click", function() {
      var barcode = $("#barcode").data("kendoBarcode");
      var imageDataURL = barcode.imageDataURL();

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

### redraw

Redraws the barcode.

#### Example

    <div id="barcode"></div>
    <script>
    $("#barcode").kendoBarcode({
      value: "FOO",
      width: 300
    });

    $("#barcode")
       .data("kendoBarcode").redraw();
    </script>

### resize

Adjusts the widget layout to match the size of the container.

#### Example

    <div id="barcode" style="width: 300px; height: 150px;"></div>
    <script>
    $("#barcode").kendoBarcode({
      value: "FOO",
      width: 300
    });

    $("#barcode")
       .css("width", "600px")
       .data("kendoBarcode").resize();
    </script>

#### Parameters

##### force `Boolean` *optional*

Defines whether the widget should proceed with resizing even if the element dimensions have not changed.

### svg

Returns the [SVG](http://www.w3.org/Graphics/SVG/) representation of the barcode. The returned string is a self-contained SVG document that can be used as is or converted to other formats using tools like [Inkscape](http://inkscape.org/) and
[ImageMagick](http://www.imagemagick.org/). Both programs provide command-line interface suitable for server-side processing.

> This method is obsoleted by [exportSVG](#methods-exportSVG), but will remain fully functional.

#### Returns

`String` the SVG representation of the barcode.

#### Example - get the SVG representation of the barcode

    <div id="barcode"></div>
    <script>
    $("#barcode").kendoBarcode({
      value: "FOO",
      width: 300
    });
    var barcode = $("#barcode").data("kendoBarcode");
    var svg = barcode.svg();
    console.log(svg); // displays the SVG string
    </script>

### value

Gets/Sets the value of the barcode.

#### Example

    <div id="barcode"></div>
    <script>
    $('#barcode').kendoBarcode({
        width: 300,
        value: "123456"
    });
    // get a reference to the barcode widget
    var barcode = $("#barcode").data("kendoBarcode");

    // get the value of the barcode.
    var value = barcode.value();
    console.log(value);

    // sets the value of the barcode and redraws it.
    barcode.value("1234567");
    </script>

#### Parameters

##### value `Number | String`

The value to set.

#### Returns

`String` The value of the barcode.

