---
title: QRCode
page_title: Configuration, methods and events of Kendo UI DataViz QRCode
description: Learn the configuration options for QRCode widget, set its options, use methods properly.
res_type: api
component: qrcode
---

# kendo.dataviz.ui.QRCode

Represents the Kendo UI QRCode widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### background `String` *(default: "#fff")*

The background color of the QR code. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="qrCode"></div>
    <script>
    $("#qrCode").kendoQRCode({
      value: "https://demos.telerik.com/kendo-ui/dataviz/overview/index.html",
      background: "red"
    });
    </script>

### border `Object`

The border of the QR code.

### border.color `String`

The color of the border. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="qrCode"></div>
    <script>
    $("#qrCode").kendoQRCode({
      value: "https://demos.telerik.com/kendo-ui/dataviz/overview/index.html",
      border: {
        color: "#FF321C",
        width: 2
      }
    });
    </script>

### border.width `Number`

The width of the border in pixels. By default the border width is set to zero which means that the border will not appear.

#### Example

    <div id="qrCode"></div>
    <script>
    $("#qrCode").kendoQRCode({
      value: "https://demos.telerik.com/kendo-ui/dataviz/overview/index.html",
      border: {
        width: 5,
        color: "#FF7D05"
      }
    });
    </script>

### color `String` *(default: "#000")*

The color of the QR code. Accepts a valid CSS color string, including hex and rgb.

#### Example

    <div id="qrCode"></div>
    <script>
    $("#qrCode").kendoQRCode({
      value: "https://demos.telerik.com/kendo-ui/dataviz/overview/index.html",
      color: "#aa00bb"
    });
    </script>

### encoding `String` *(default: "ISO_8859_1")*

The encoding mode used to encode the value.

The possible values are:

* "ISO\_8859\_1" - supports all characters from the [ISO/IEC 8859-1](https://en.wikipedia.org/wiki/ISO/IEC_8859-1) character set.
* "UTF_8" - supports all [Unicode](https://en.wikipedia.org/wiki/List_of_Unicode_characters) characters.

> *Important:* The UTF-8 encoding is not included in the specifications and is not supported by all readers.

#### Example

    <div id="qrCode"></div>
    <script>
    $("#qrCode").kendoQRCode({
      value: "丠",
      encoding: "UTF_8"
    });
    </script>

### errorCorrection `String` *(default: "L")*

The error correction level used to encode the value.

The possible values are:

* "L" - approximately 7% of the codewords can be restored.
* "M" - approximately 15% of the codewords can be restored.
* "Q" - approximately 25% of the codewords can be restored.
* "H" - approximately 30% of the codewords can be restored.

#### Example

    <div id="qrCode"></div>
    <script>
    $("#qrCode").kendoQRCode({
      value: "https://demos.telerik.com/kendo-ui/dataviz/overview/index.html",
      errorCorrection: "H"
    });
    </script>

### overlay `Object`

The overlay configuration which alows you to choose from predefined layouts or insert a custom image.

> **Note:** Always test if the code reads correctly with the overlay. Depending on the length of the value and the size of the overlay, you might need to raise the [errorCorrection](/api/javascript/dataviz/ui/qrcode/configuration/errorcorrection) to "M" or "H".

#### Example

    <div id="qrCode"></div>
    <script>
    $("#qrCode").kendoQRCode({
       value: "https://demos.telerik.com/kendo-ui/content/shared/images/site/kendoka-cta.svg",
       overlay:{
           url: 'https://demos.telerik.com/kendo-ui/content/shared/images/site/kendoka-cta.svg',
           width: 40
       },
       errorCorrection: "M"
     });
    </script>

### overlay.height `Number`

The height of the overlay in pixels.

#### Example

    <div id="qrCode"></div>
    <script>
    $("#qrCode").kendoQRCode({
       value: "https://demos.telerik.com/kendo-ui/content/shared/images/site/kendoka-cta.svg",
       overlay:{
           url: 'https://demos.telerik.com/kendo-ui/content/shared/images/site/kendoka-cta.svg',
           height: 40
       },
       errorCorrection: "M"
     });
    </script>

### overlay.type `String` *(default: "custom")*

Available options are `image` and `swiss`. When set to `image` you have to specify the url source of the image. If set to `swiss` a Swiss QR Code is created.

#### Example

    <div id="qrCode"></div>
    <script>
    $("#qrCode").kendoQRCode({
       value: "https://demos.telerik.com/kendo-ui/content/shared/images/site/kendoka-cta.svg",
       overlay:{
          type: "swiss"
       },
       errorCorrection: "M"
     });
    </script>

### overlay.imageUrl `String`

The URL of the displayed overlay image.

#### Example

    <div id="qrCode"></div>
    <script>
    $("#qrCode").kendoQRCode({
       value: "https://demos.telerik.com/kendo-ui/content/shared/images/site/kendoka-cta.svg",
       overlay:{
           url: 'https://demos.telerik.com/kendo-ui/content/shared/images/site/kendoka-cta.svg',
           height: 40
       },
       errorCorrection: "M"
     });
    </script>

### overlay.width `Number`

The width of the overlay in pixels.

#### Example

    <div id="qrCode"></div>
    <script>
    $("#qrCode").kendoQRCode({
       value: "https://demos.telerik.com/kendo-ui/content/shared/images/site/kendoka-cta.svg",
       overlay:{
           url: 'https://demos.telerik.com/kendo-ui/content/shared/images/site/kendoka-cta.svg',
           width: 40
       },
       errorCorrection: "M"
     });
    </script>

### padding `Number` *(default: 0)*

Sets the minimum distance in pixels that should be left between the border and the QR modules.

#### Example

    <div id="qrCode"></div>
    <script>
    $("#qrCode").kendoQRCode({
      value: "https://demos.telerik.com/kendo-ui/dataviz/overview/index.html",
      size: 240,
      padding: 10
    });
    </script>

### renderAs `String` *(default: "svg")*

Sets the preferred rendering engine.
If it is not supported by the browser, the QRCode will switch to the first available mode.

The supported values are:

* "canvas" - renders the widget as a Canvas element, if available.
* "svg" - renders the widget as inline SVG document, if available

### Example - Render as SVG, if supported

    <div id="qrCode"></div>
    <script>
    $("#qrCode").kendoQRCode({
      value: "https://demos.telerik.com/kendo-ui/dataviz/overview/index.html",
      renderAs: "svg"
    });
    </script>

### size `Number|String`

Specifies the size of a QR code in pixels (i.e. "200px"). Numeric values are treated as pixels.
If no size is specified, it will be determined from the element width and height.
In case the element has width or height of zero, a default value of 200 pixels will be used.

#### Example

    <div id="qrCode"></div>
    <script>
    $("#qrCode").kendoQRCode({
      value: "https://demos.telerik.com/kendo-ui/dataviz/overview/index.html",
      size: 300
    });
    </script>

#### Example

    <div id="qrCode"></div>
    <script>
    $("#qrCode").kendoQRCode({
      value: "https://demos.telerik.com/kendo-ui/dataviz/overview/index.html",
      size: "300px"
    });
    </script>

### value `Number|String`

Sets the value of the QRCode. More about the the value of the QRCode can be found in the [Encoding](/controls/barcodes/qrcode/encodings) documentation article.

#### Example

    <div id="qrCode"></div>
    <script>
    $("#qrCode").kendoQRCode({
      value: "https://demos.telerik.com/kendo-ui/dataviz/overview/index.html"
    });
    </script>

## Methods

### destroy

Prepares the QRCode for safe removal from the DOM.

Removes data entries in order to avoid memory leaks.

#### Example

    var qrCode = $("#qrCode").data("kendoQRCode");
    qrCode.destroy();

### exportImage
Exports the QRCode as an image.
The result can be saved using [kendo.saveAs](/api/javascript/kendo/methods/saveas).

The export operation is asynchronous and returns a [promise](https://api.jquery.com/Types/#Promise).
The promise will be resolved with a PNG image encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

#### Parameters

##### options `Object` *(optional)*
Parameters for the exported image.

##### options.width `String`
The width of the exported image. Defaults to the QRCode width.

##### options.height `String`
The height of the exported image. Defaults to the QRCode height.

#### Returns
`Promise` A promise that will be resolved with a PNG image encoded as a Data URI.

#### Example - Exporting a QRCode to an image
    <div id="qrCode"></div>
    <script>
        $("#qrCode").kendoQRCode({
            value: "mailto:clientservice@kendoui.com"
        });

        var qrCode = $("#qrCode").getKendoQRCode();
        qrCode.exportImage().done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "QRCode.png"
            });
        });
    </script>


### exportPDF
Exports the QRCode as a PDF file.
The result can be saved using [kendo.saveAs](/api/javascript/kendo/methods/saveas).

The export operation is asynchronous and returns a [promise](https://api.jquery.com/Types/#Promise).
The promise will be resolved with a PDF file encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

#### Parameters

##### options `kendo.drawing.PDFOptions` *(optional)*
Parameters for the exported PDF file.

#### Returns
`Promise` A promise that will be resolved with a PDF file encoded as a Data URI.

#### Example - Exporting a QRCode to a PDF file
    <div id="qrCode"></div>
    <script>
        $("#qrCode").kendoQRCode({
            value: "mailto:clientservice@kendoui.com"
        });

        var qrCode = $("#qrCode").getKendoQRCode();
        qrCode.exportPDF({ paperSize: "A5", landscape: true }).done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "QRCode.pdf"
            });
        });
    </script>


### exportSVG
Exports the QRCode as an SVG document.
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

#### Example - Exporting a QRCode to an SVG document
    <div id="qrCode"></div>
    <script>
        $("#qrCode").kendoQRCode({
            value: "mailto:clientservice@kendoui.com"
        });

        var qrCode = $("#qrCode").getKendoQRCode();
        qrCode.exportSVG().done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "QRCode.svg"
            });
        });
    </script>

### imageDataURL

Returns a PNG image of the qrcode encoded as a [Data URL](https://developer.mozilla.org/en-US/docs/data_URIs).

> This method is deprecated and replaced by [exportImage](/api/javascript/dataviz/ui/qrcode/methods/exportimage).

#### Returns

`String` A data URL with `image/png` MIME type. Will be `null` if the browser does not support the `canvas` element.

#### Example - show a snapshot of the QRCode

    <div id="qrcode"></div>
    <a download="export.png" id="export" class="k-button">Export PNG</a>
    <script>
    $("#qrcode").kendoQRCode({
      value: "Some text"
    });

    $("#export").on("click", function() {
      var qrcode = $("#qrcode").data("kendoQRCode");
      var imageDataURL = qrcode.imageDataURL();

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

### redraw

Redraws the QR code using the current value and options.

> The [`setOptions`](setOptions) method sets new options to the QRCode and redraws it att he same time. Calling `redraw()` int his case is not necessary.

#### Example - set background property and redraw QRCode

    <div id="qrCode"></div>
    <script>
      $("#qrCode").kendoQRCode({
        value: "mailto:clientservice@telerik.com",
      });

      var qrCode = $("#qrCode").data("kendoQRCode");
      qrCode.options.background="#FFB821"
      qrCode.redraw();
    </script>

### resize

Adjusts the widget layout to match the size of the container.

#### Example

    <div id="qrcode" style="width: 150px; height: 150px;"></div>
    <script>
        $("#qrcode").kendoQRCode({
          value: "FOO"
        });

        $("#qrcode")
           .css({ width: "600px", height: "300px" })
           .data("kendoQRCode").resize();
    </script>

#### Parameters

##### force `Boolean` *optional*

Defines whether the widget should proceed with resizing even if the element dimensions have not changed.

### setOptions

Sets new options to the QRCode and redraws it.

#### Parameters

##### options `Object`

An object with the new options. All [configuration](/api/javascript/dataviz/ui/qrcode#configuration) options can be set.

#### Example

    <div id="qrCode"></div>
    <script>
      $("#qrCode").kendoQRCode({
        value: "mailto:clientservice@telerik.com",
      });

      var qrCode = $("#qrCode").data("kendoQRCode");
      qrCode.setOptions({
        errorCorrection: "H",
        size: 200,
        background: "#FFB821",
        border: {
          width: 5,
          color: "#FF7D05"
        }
      });
    </script>

### svg

Returns the [SVG](https://www.w3.org/Graphics/SVG/) representation of the qrcode. The returned string is a self-contained SVG document that can be used as is or converted to other formats using tools like [Inkscape](https://inkscape.org/en) and
[ImageMagick](https://www.imagemagick.org/). Both programs provide command-line interface suitable for server-side processing.

> This method is obsoleted by [exportSVG](/api/javascript/dataviz/ui/qrcode/methods/exportsvg), but will remain fully functional.

#### Returns

`String` the SVG representation of the qrcode.

#### Example - get the SVG representation of the qrcode

    <div id="qrcode"></div>
    <script>
    $("#qrcode").kendoQRCode({
      value:"Some value"
    });
    var qrcode = $("#qrcode").data("kendoQRCode");
    var svg = qrcode.svg();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(svg); // displays the SVG string
    </script>

### value

Change the value of the QR code.

#### Parameters

##### options `String|Number`

The new value to be set.

#### Example

    <div id="qrCode"></div>
    <script>
      $("#qrCode").kendoQRCode({
        value: "https://demos.telerik.com/kendo-ui/dataviz/overview/index.html"
      });

      var qrCode = $("#qrCode").data("kendoQRCode");
      qrCode.value("Hello");
    </script>

