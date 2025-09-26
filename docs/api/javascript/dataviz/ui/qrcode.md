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


<div class="meta-api-description">
Set or customize the background color behind a QR code to enhance contrast, improve scanner readability, adjust visual style, and ensure optimal scanning performance by specifying any valid CSS color format such as hex, RGB, or named colors; control the backdrop hue to match branding, reduce interference, or create visual appeal for QR code display in various applications or environments.
</div>

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


<div class="meta-api-description">
Customize and control the outer edge styling of QR code elements by setting border properties such as color, thickness, style, and padding to define the visual boundary, frame, or outline around the code, enabling configuration of how the QR code’s perimeter appears, adapts, or highlights in different contexts or designs.
</div>

#### Example

    <div id="qrCode"></div>
    <script>
    $("#qrCode").kendoQRCode({
      value: "https://demos.telerik.com/kendo-ui/",
      border: {
        color: "#000000",
        width: 3
      }
    });
    </script>

### border.color `String`

The color of the border. Accepts a valid CSS color string, including hex and rgb.


<div class="meta-api-description">
Customize the appearance of a QR code’s outline by setting its edge color using any valid CSS color format such as hexadecimal, RGB, or named colors. Adjust the border hue to match branding, emphasize the code’s frame, or create visual contrast by specifying the color as part of initial setup or dynamic configuration. Enable styling flexibility by controlling the QR code’s border shade, enabling developers to define, modify, or theme the perimeter color for better visibility, user interface integration, or aesthetic alignment.
</div>

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


<div class="meta-api-description">
Adjust the thickness or visibility of the QR code’s outer edge by setting the pixel width of the surrounding border, enabling you to customize how prominent or subtle the frame appears, including removing the border entirely by assigning zero width, controlling the margin size, configuring the padding area around the QR pattern, and specifying the frame thickness for styling, emphasis, or scanning clarity purposes.
</div>

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


<div class="meta-api-description">
Adjust the foreground color or primary hue of QR codes by specifying any valid CSS color format such as hex codes, RGB values, or named colors to customize appearance, align branding colors, enhance visibility, ensure sufficient contrast against backgrounds, configure styling to fit different themes or user interface designs, and control the QR code’s visual presentation for branding consistency or accessibility compliance.
</div>

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


<div class="meta-api-description">
Set or configure the character encoding used to represent data in a QR code, choosing between standard character sets like ISO-8859-1 for Latin-based alphabets or UTF-8 to support a wide range of Unicode characters including international symbols and emojis; adjust encoding to ensure compatibility with different QR code readers, data formats, or localization needs, and control how text data, special characters, or multilingual content is encoded and decoded within QR code generation and scanning processes.
</div>

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


<div class="meta-api-description">
Adjust the error correction level or redundancy in QR code generation to control how much data can be recovered after damage, corruption, or distortion, choosing from low to high correction levels such as 7%, 15%, 25%, or up to 30% data restoration, allowing developers to set, configure, or enable error resilience in QR codes to balance between data capacity and robustness against errors, interference, or partial obscuration during scanning and decoding processes.
</div>

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


<div class="meta-api-description">
Configure or set a custom image, logo, watermark, or graphic to appear layered over a QR code for branding, marketing, or added visual context; enable overlays with predefined layouts or upload your own picture to control the appearance of QR codes with personalized graphics while ensuring scanability by adjusting error correction levels as needed; these overlay options support blending brand icons, symbols, or thematic visuals on top of QR codes to enhance recognition, customize presentation, and maintain code readability across varied sizes and data volumes.
</div>

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


<div class="meta-api-description">
Adjust or configure the vertical size, height, or dimension of an overlay layer displayed on top of a QR code using pixel values; control, set, or specify how tall the overlay area should be when rendering QR codes, including resizing, scaling, or customizing the overlay height to fit design or UI requirements, ensuring proper overlay coverage and visual alignment above the QR code output with numeric height settings.
</div>

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


<div class="meta-api-description">
Select and configure the style of overlay displayed on a QR code, including options to enable a custom image overlay using an external URL or to activate a Swiss QR code format for specialized payment or identification use cases. This setting lets you control the visual overlay type, switch between rendering a user-provided image overlay versus generating a standardized Swiss QR code appearance, allowing customization and precise control over QR code overlays in various applications such as branding, payment processing, or identity verification. Adjust overlay formats, choose between image overlays or Swiss-specific QR codes, and manage overlay display preferences for QR code rendering scenarios.
</div>

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


<div class="meta-api-description">
Control the URL or source of an image to overlay a logo, watermark, or custom graphic on top of a generated QR code, enabling configuration of branding, personalization, or visual enhancements by setting or updating the overlay image link, specifying where the overlay graphic is loaded from, or customizing the appearance of QR codes with layered images for style, identification, or marketing purposes.
</div>

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


<div class="meta-api-description">
Adjust or configure the width dimension of a QR code overlay by specifying pixel values to control how wide the overlay appears when rendered, enabling precise sizing during setup or customization. This setting governs the horizontal size of the overlay layer superimposed on a QR code, allowing developers to set, change, or fine-tune the width for layout, design, or responsiveness needs in rendering QR code graphics with overlays. Control, define, or specify numeric values for the overlay's width to ensure the overlay fits stylistic or spatial requirements within the generated QR code display.
</div>

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


<div class="meta-api-description">
Adjust the margin or whitespace around a QR code by configuring the minimum pixel distance between the QR modules and the edge of the component, controlling the quiet zone to optimize scanner readability and visual layout. This setting lets you set or customize padding, margins, or spacing to ensure clear boundaries, improve code scanning accuracy, and manage the empty area or buffer zone surrounding the QR pattern. Whether you need to increase or decrease the border gap, tweak layout spacing, or define the peripheral blank area for better rendering and device recognition, specifying this numeric measurement in pixels controls the overall quiet zone size for the QR code.
</div>

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



<div class="meta-api-description">
Control or set the QR code output format by choosing between Canvas and SVG rendering engines, specify preferred rendering mode to switch between scalable vector graphics and pixel-based canvas elements, enable fallback behavior to automatic rendering mode detection based on browser support, configure rendering type for better visual quality or compatibility by selecting inline SVG or HTML5 canvas, adjust QR code display method for performance or styling needs, manage output format preferences like canvas element or SVG embedding, select rendering technology for QR generation including vector or raster options, switch rendering modes dynamically when certain engines are unsupported, and customize the way QR codes are drawn or displayed on web platforms.
</div>

#### Example - Render as SVG, if supported

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


<div class="meta-api-description">
Adjust or specify the dimensions of a QR code image in pixels by configuring its width and height, controlling the rendered size for scanning or display purposes, setting exact sizes using numeric pixel values or CSS units, overriding default or container-based sizing behavior, ensuring appropriate resolution for QR code readability by defining fixed or responsive sizes, scaling the QR code graphic for different screen densities or device requirements, managing output size to fit layout constraints or printing needs, handling default sizing when no explicit dimensions are provided, and enabling precise control over QR code image width and height for embedding or exporting scenarios.
</div>

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

Sets the value of the QRCode. More about the the value of the QRCode can be found in the [Encoding](/controls/qrcode/encodings) documentation article.


<div class="meta-api-description">
Configure or set the data content, text string, or URL that will be encoded into the QR code, controlling the information embedded and displayed when scanned. Enable customization of the QR code payload by specifying plain text, links, or other data formats to ensure the correct data is represented, set or update the encoded value to generate dynamic QR codes, and define what the QR code conveys for scanning apps or devices. Adjust or assign the string, content, or data input that shapes the QR code's output, including how to embed links, messages, or identifiers within the code.
</div>

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


<div class="meta-api-description">
Clear, remove, or dispose of a QR code instance to free memory and prevent leaks by deleting associated data, clearing internal references, and preparing the component for safe removal or replacement in the DOM; deactivate or dismantle the QR code element to avoid lingering state, clean up event listeners, release resources, and ensure no residual information persists after detaching or dynamically updating the QR code in web applications.
</div>

#### Example

    var qrCode = $("#qrCode").data("kendoQRCode");
    qrCode.destroy();

### exportImage
Exports the QRCode as an image.
The result can be saved using [kendo.saveAs](/api/javascript/kendo/methods/saveas).

The export operation is asynchronous and returns a [promise](https://api.jquery.com/Types/#Promise).
The promise will be resolved with a PNG image encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).


<div class="meta-api-description">
Export or generate a QR code image as a PNG file for downloading, saving, or embedding by converting the QR code into a base64-encoded PNG data URI asynchronously, enabling programmatic control over image output, file export, and persistence in applications; supports promises for handling the export process, allowing integration with file-saving utilities or download triggers, as well as configuration for export formats, image generation, and storing QR code visuals for use in web or mobile environments.
</div>

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


<div class="meta-api-description">
Generate, create, or export QR code data into a PDF document, convert QR content to a downloadable PDF file, asynchronously produce and retrieve a QR code as a PDF encoded in a Data URI format, enable saving or downloading QR code scans as PDF files, trigger PDF generation for QR code visuals, handle PDF export operations with promise-based async control, configure or initiate QR code to PDF workflows for storage or distribution, obtain PDF output from QR code components for offline use, save or share QR code information in PDF format, manage QR code exports with file saving utilities like kendo.saveAs.
</div>

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


<div class="meta-api-description">
Export or generate a scalable vector graphic version of a QR code as an SVG file, enabling saving, downloading, embedding, or transferring the image in a resolution-independent format. This asynchronous operation delivers a promise that resolves to an SVG document encoded as a data URI, suitable for use with file-saving utilities, embedding in web pages, or exporting for further processing. Developers can invoke export functions to obtain the QR code’s SVG representation for integration, storage, or distribution, supporting workflows that require high-quality, scalable images of QR codes.
</div>

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


<div class="meta-api-description">
Generate or retrieve a base64-encoded PNG data URL of a QR code image for embedding directly in HTML image sources, CSS background images, or transmitting as inline base64 payloads, enabling seamless integration of QR code visuals within web pages or applications. This includes converting QR code graphics into inline data URIs suitable for dynamic rendering, embedding without external files, or easy transport over APIs, supporting use cases like configuring image tags, setting CSS backgrounds, or exporting QR code images as encoded strings.
</div>

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

> The [`setOptions`](/api/javascript/dataviz/ui/qrcode/methods/setoptions) method sets new options to the QRCode and redraws it att he same time. Calling `redraw()` int his case is not necessary.


<div class="meta-api-description">
Update or refresh the QR code display dynamically to reflect any changes made to its data content, appearance, or configuration settings by programmatically forcing a complete redraw of the visual QR code output. This function enables you to re-render the code after modifying its underlying value, altering styling options, adjusting size or colors, or applying new configurations to ensure the displayed QR code stays in sync with current properties without relying solely on automatic updates. It supports use cases such as real-time data updates, interactive QR code customization, and manual control over the rendering cycle.
</div>

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


<div class="meta-api-description">
Adjust, refresh, or update the QR code display dynamically to fit new container dimensions after resizing, layout shifts, style changes, or DOM updates by recalculating size, alignment, and rendering parameters on demand. Control and configure automatic or manual resizing, re-measuring the parent element or wrapper to ensure the QR code scales correctly and remains visually precise after window resizes, CSS modifications, or responsive design changes without losing fidelity or alignment. Enable the QR code component to adapt to container size fluctuations by triggering recalculation of module sizing and repositioning for seamless, crisp QR rendering whenever the surrounding layout or styling is altered.
</div>

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


<div class="meta-api-description">
Update or modify QR code settings dynamically by configuring parameters such as size, color, error correction level, content data, styling, and appearance without restarting or reloading the component. Enable real-time changes to QR code attributes, adjust rendering options on the fly, customize visual properties, refresh QR code output instantly, apply new configuration objects programmatically, and control QR code updates interactively within your application. This method supports seamless runtime adjustments, allowing developers to set or override QR code options efficiently and immediately reflect changes in the rendered QR image.
</div>

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


<div class="meta-api-description">
Generate or retrieve the QR code’s vector graphic in SVG format, enabling extraction of a complete, standalone SVG string that can be saved, embedded directly in web pages, or processed further by converting to other image formats such as PNG or PDF using command-line tools like Inkscape or ImageMagick for server or batch workflows; useful for exporting scalable QR code graphics, integrating QR codes in HTML, automating image format transformations, retrieving raw SVG data, or scripting QR code generation in various development environments.
</div>

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


<div class="meta-api-description">
Modify or update the data encoded within a QR code dynamically during runtime, including changing the text, string, or payload without recreating the entire QR code element. Enable runtime re-encoding and refreshing of the QR code display by setting or configuring the current content value, allowing live updates to the QR code’s encoded information, such as URLs, text snippets, or serialized data. Control the QR code content programmatically after initialization to redefine the scan target or embedded data, supporting on-the-fly adjustments, dynamic content changes, or interactive QR code applications.
</div>

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

