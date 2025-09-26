---
title: "drawing "
page_title: API reference for Kendo UI Drawing API static functions
res_type: api
---

# kendo.drawing

Helper functions declared in the kendo.drawing namespace.

## Methods

### align

Aligns drawing elements x axis position to a given rectangle.


<div class="meta-api-description">
Control horizontal alignment of drawing elements by configuring their x-axis position relative to a target rectangle, enabling snapping or repositioning shapes for consistent left, center, or right alignment across one or multiple objects. Set or update element coordinates to match the horizontal placement of a reference boundary, useful for arranging, aligning, or redistributing graphics in layouts. This method supports precise movement, alignment correction, and consistent horizontal grouping of drawn shapes or components after modifications or dynamic updates.
</div>

#### Parameters

##### elements `Array`

An array with the drawing elements that should be aligned.

##### rect `kendo.geometry.Rect`

The rectangle in which the elements should be aligned.

##### alignment `String`

Specifies how should the elements be aligned. The supported values are:

* "start" - the elements will be aligned to the rectangle origin.
* "center" - the elements will be aligned to the rectangle center.
* "end" - the elements will be aligned to the right side of the rectangle.

#### Example

    <div id="surface"></div>
    <script>
      var draw = kendo.drawing;
      var Rect = kendo.geometry.Rect;
      var rect = new Rect([200, 0], [300, 100]);
      var path = draw.Path.fromRect(new Rect([0, 0], [100, 100]));

      draw.align([path], rect, "center");

      var surface = draw.Surface.create($("#surface"));
      surface.draw(path);
      surface.draw(draw.Path.fromRect(rect));
    </script>

### drawDOM
Converts the given DOM element to a [Drawing API](/framework/drawing/overview) scene.

The operation is asynchronous and returns a [promise](https://api.jquery.com/Types/#Promise).

The promise will be resolved with the root [Group](/api/javascript/drawing/group) of the scene.


<div class="meta-api-description">
Transform or render a live HTML or DOM element into a vector graphics scene, enabling asynchronous conversion of webpage content, HTML structures, or UI elements into a manipulatable drawing graph, with a promise-based interface to handle the result once ready, allowing inspection, traversal, or modification of the scene’s group hierarchy and node structure, supporting workflows that require capturing DOM visuals, integrating HTML with canvas or SVG representations, or dynamically generating graphics from existing page elements.
</div>

#### Parameters

##### element `jQuery`
The root DOM element to draw.

##### options `Object`
Configuration options

##### options.avoidLinks `Boolean|String` *(default: false)*
A flag indicating whether to produce clickable hyperlinks in the exported PDF file.

It's also possible to pass a CSS selector as argument. All matching links will be ignored.

##### options.forcePageBreak `String`
An optional CSS selector that specifies the elements that should cause page breaks.

See [Multi-page PDF output](slug://multipagecontent_drawing).

##### options.paperSize `String` *(default: "auto")*
The paper size for [automatic page breaking](slug://multipagecontent_drawing#automatic-page-breaking).
The default "auto" means paper size is determined by content.

Supported values:

* A predefined size: "A4", "A3" etc
* An array of two numbers specifying the width and height in points (1pt = 1/72in)
* An array of two strings specifying the width and height in units.
  Supported units are "mm", "cm", "in" and "pt".

##### options.margin `String|Object`
Specifies the margins of the page (numbers or strings with units). Supported
units are "mm", "cm", "in" and "pt" (default).

##### options. margin.bottom `Number|String` *(default: 0)*
The bottom margin. Numbers are considered as "pt" units.

##### options. margin.left `Number|String` *(default: 0)*
The left margin. Numbers are considered as "pt" units.

##### options. margin.right `Number|String` *(default: 0)*
The right margin. Numbers are considered as "pt" units.

##### options. margin.top `Number|String` *(default: 0)*
The top margin. Numbers are considered as "pt" units.

##### options.template `String`
The [page template](slug://templates_drawing) for multi-page output.

#### Returns
`Promise` A promise that will be resolved with the root Group of the scene.

#### Example - Exporting a DOM element to an image

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var draw = kendo.drawing;

        draw.drawDOM($("#calendar"))
        .then(function(root) {
            // Chaining the promise via then
            return draw.exportImage(root);
        })
        .done(function(data) {
            // Here 'data' is the Base64-encoded image file
            kendo.saveAs({
                dataURI: data,
                fileName: "calendar.png"
            });
        });
    </script>

#### Example - Exporting a DOM element to a PDF file (via Base64-encoded string)

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var draw = kendo.drawing;

        draw.drawDOM($("#calendar"))
        .then(function(root) {
            // Chaining the promise via then
            return draw.exportPDF(root, {
                paperSize: "A4",
                landscape: true
            });
        })
        .done(function(data) {
            // Here 'data' is the Base64-encoded PDF file
            kendo.saveAs({
                dataURI: data,
                fileName: "calendar.pdf"
            });
        });
    </script>

#### Example - Exporting a DOM element to a PDF Base64-encoded string and send it to the server via jQuery.post()

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var draw = kendo.drawing;

        draw.drawDOM($("#calendar"))
        .then(function(root) {
            // Chaining the promise via then
            return draw.exportPDF(root, {
                paperSize: "A4",
                landscape: true
            });
        })
        .done(function(dataURI) {
            //Extracting the base64-encoded string and the contentType
            var data = {};
            var parts = dataURI.split(";base64,");
            data.contentType = parts[0].replace("data:", "");
            data.base64 = parts[1];

            //Sending the data via jQuery.post method
            //jQuery.post("url/to/save/pdf", data)
        });
    </script>

#### Example - Exporting a DOM element to a PDF file (direct)

    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var draw = kendo.drawing;

        draw.drawDOM($("#calendar"))
        .done(function(root) {
            // Here the PDF file is saved directly
            // without creating an intermediate
            // Base64-encoded version of its content
            draw.pdf.saveAs(root, "calendar.pdf");
        });
    </script>


### exportImage
Exports a group of drawing elements as an image.

The group will be positioned at [0, 0] in the exported image. It's dimensions will be used as default dimensions for the image.

The export operation is asynchronous and returns a [promise](https://api.jquery.com/Types/#Promise).

The promise will be resolved with a PNG image encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

> *Important*
>
> Scene images must be of same origin or [CORS-enabled](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image).


<div class="meta-api-description">
Export drawing elements or groups as PNG images by generating a rasterized snapshot positioned at the origin with dimensions matching the selected content, enabling asynchronous exporting for saving, downloading, embedding, or displaying within web applications. This method supports converting vector or grouped canvas drawings into base64-encoded Data URIs ideal for image sources, file downloads, or further processing, while ensuring cross-origin restrictions like CORS compliance are considered for seamless export and use in different contexts. Whether you want to capture, serialize, share, or create downloadable PNG snapshots of visual elements, this approach handles image export, promise-based asynchronous workflows, and image encoding for broad compatibility.
</div>

#### Parameters

##### group `kendo.drawing.Group`
The root group containing all elements to export.

##### options `Object`
Parameters for the exported image.

##### options.width `Number`
The width of the exported image. Defaults to the scene width.

##### options.height `Number`
The height of the exported image. Defaults to the scene height.

##### options.cors `String` *(default: "anonymous")*
Specifies how [cross-origin images](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image)
should be requested.

Requesting images without CORS will "taint" the canvas. It will still be visible on the page, but all
script access to it is disabled to prevent information disclosure.

By default they're requested anonymously. Available options are:
* "anonymous" - do not send user credentials as part of the request
* "use-credentials" - send credentials as part of the request
* false - fetch images without CORS, possibly tainting the canvas

See [crossorigin attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-crossorigin)
for more details.

#### Returns
`Promise` A promise that will be resolved with a PNG image encoded as a Data URI.

#### Example - Exporting a drawing to an image
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect([5, 5], [240, 240]);
        var path = draw.Path.fromRect(rect).stroke("red", 5);

        var root = new draw.Group();
        root.append(path);

        draw.exportImage(root, { width: "250px", height: "250px" }).done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "frame.png"
            });
        });
    </script>

#### Example - Position the scene within a larger image
    <div class="content" style="background: #ffffff;">
        <p>Lorem ípsum dolor sit amét, pro éu facilis vulputáte témporibus. Eu méi modus requé. Unum gloriátur has et. Modo stet vix ei, apéirian iñsolens plátoñem has ex. Cum eí oporteat inímicus, prí soluta torquatos témporibus éu.</p>
        <p>Ut eos assúm mazim vócent, cu gloríatur expetéñdis pro. Héñdrerit ádversarium reprehendunt eos ad, dúo an noster feugiat cotidieque. Vocent erroribus repudiáre ad meí. Oratio soluta eripuit sed éx. Vis et meliore appellañtur, át has discere convenire ocurreret. Eos at mazim melius aliquip, aperiam alterum commuñé pro id, zril soluta efficiantur in sit. Duis mundi duo ex, pér offendit probatus suavítate iñ.</p>
        <p>Nec id fácilis similique, audiam moderatius ad eum. Persecuti liberavisse eum ex. Qui anímal audiré et, éum vitae coñsul dolorum eu, ín sed partem antíopam. Velít suscipit te usu. Mea ea melius scripta.</p>
        <p>Illum delenit neglegentúr te cum, in errór inimicus disseñtias mel, placérat ocurreret ea vix. Vix ea latine voluptatum. Cúm eu albucius democritum coñsetetur, vix eu dicat deleniti, omñes ínimicus nám no. Nihil molestiae vel ex.</p>
        <p>Eú ñominavi placerat his, eu vix timeam qualisque. Príma recusabo torquatós eos ad, ín meí próbo aequé. Ex ñoñumy vóluptua accommodare seá, sit át sanctus detráxit, ín eos case probatus tractatos. Id sit nihíl coñtentíones, ñec ut audiré elaboraret, quo alia ferri múñere ét.</p>
    </div>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var contentSize = new geom.Rect([0, 0], [800, 600]);
        var imageSize = new geom.Rect([0, 0], [1200, 800]);

        draw.drawDOM($(".content")).then(function (group) {
            // Fill the background and set the dimensions for the exported image
            var background = draw.Path.fromRect(imageSize, {
                fill: {
                    color: "#ffffff",
                },
                stroke: null
            });

            // Fit content to size, if needed
            draw.fit(group, contentSize);

            // Note that the following methods accept arrays
            draw.align([group], imageSize, "center");
            draw.vAlign([group], imageSize, "center");

            // Bundle it all together
            var wrap = new draw.Group();
            wrap.append(background, group);

            // export the image and crop it for our desired size
            return draw.exportImage(wrap, {
                cors: "anonymous"
            });
        })
        .done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "frame.png"
            });
        });
    </script>

### exportPDF
Exports a group of drawing elements as a PDF file.

The group will be positioned at [0, 0] in the exported file. It's dimensions will be used as default dimensions for the image.

The export operation is asynchronous and returns a [promise](https://api.jquery.com/Types/#Promise).

The promise will be resolved with a PDF file encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

> Scene images must be of same origin or [CORS-enabled](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image).


<div class="meta-api-description">
Export or save multiple drawing elements as a PDF file with precise control over positioning and dimensions, enabling asynchronous export that returns a promise resolving to a PDF encoded data URI. Use this to generate downloadable PDF documents from groups of shapes, layers, or scene components, ensuring same-origin or CORS-enabled resources are handled properly. Configure PDF output size, coordinate alignment at the origin, and embed vector or raster graphics for printing or sharing, supporting workflows for file exporting, document generation, and data serialization in web or app environments.
</div>

#### Parameters

##### group `kendo.drawing.Group`
The root group containing all elements to export.

##### options `kendo.drawing.PDFOptions`
Parameters for the exported PDF file.

#### Returns
`Promise` A promise that will be resolved with a PDF file encoded as a Data URI.

#### Example - Exporting a drawing to a PDF file
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect([5, 5], [240, 240]);
        var path = draw.Path.fromRect(rect).stroke("red", 5);

        var root = new draw.Group();
        root.append(path);

        draw.exportPDF(root, { paperSize: "A5", landscape: true }).done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "frame.pdf"
            });
        });
    </script>

### exportSVG
Exports a group of drawing elements as an SVG document.

The group will be positioned at [0, 0] in the exported file. It's dimensions will be used as default dimensions for the image.

The export operation is asynchronous and returns a [promise](https://api.jquery.com/Types/#Promise).

The promise will be resolved with a SVG document encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).


<div class="meta-api-description">
Generate or create an SVG file from a chosen set of vector shapes or drawing elements, enabling exporting, saving, or downloading scalable vector graphics as a standalone document; configure the output to position the graphic at the top-left corner coordinates [0, 0] with dimensions matching the selected group, handle asynchronous operations that return promises resolving to SVG content encoded as a data URI for embedding or further processing, support workflows for exporting drawings, converting canvas elements to SVG, extracting vector markup, and obtaining SVG representations programmatically.
</div>

#### Parameters

##### group `kendo.drawing.Group`
The root group containing all elements to export.

##### options `Object` *optional*
Export options.

##### options.raw `Boolean` *(default: false)*
Resolves the promise with the raw SVG document without the Data URI prefix.

#### Returns
`Promise` A promise that will be resolved with a SVG document encoded as a Data URI.

#### Example - Exporting a drawing to an SVG document
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect([5, 5], [240, 240]);
        var path = draw.Path.fromRect(rect).stroke("red", 5);

        var root = new draw.Group();
        root.append(path);

        draw.exportSVG(root).done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "frame.svg"
            });
        });
    </script>

### fit

Scales uniformly an element so that it fits in a given rectangle. No scaling will be applied if the element is already small enough to fit in the rectangle.


<div class="meta-api-description">
Scale and resize graphical elements or shapes uniformly to precisely fit within a specified rectangle or bounding box while preserving their original aspect ratio, enabling proportional adjustment without distortion, controlling element dimensions to match target sizes, ensuring shapes or groups maintain their scale integrity inside defined areas, adjusting size while preventing enlargement if already fitting, configuring element scaling to optimize layout or design space, setting scale factors for graphics to conform to container bounds, enabling responsive resizing of visual components to fit designated frames or regions, and managing uniform scaling for consistent appearance across variable display sizes or design constraints.
</div>

#### Parameters

##### element `kendo.drawing.Element`

The drawing element that should be fitted.

##### rect `kendo.geometry.Rect`

The rectangle in which the elements should be fitted.

#### Example

    <div id="surface"></div>
    <script>
      var draw = kendo.drawing;
      var Rect = kendo.geometry.Rect;

      var group = new draw.Group();
      var rect = new Rect([0, 0], [200, 100]);
      var path = draw.Path.fromRect(new Rect([0, 0], [300, 300]), {
        fill: {
          color: "#ff0000"
        }
      });
      group.append(path, draw.Path.fromRect(rect));

      draw.fit(path, rect);

      var surface = draw.Surface.create($("#surface"));
      surface.draw(group);
    </script>

### stack

Stacks drawing elements horizontally.


<div class="meta-api-description">
Control horizontal arrangement or layout of drawing elements by stacking shapes, groups, or paths side-by-side along the x-axis in document order; configure sequential placement, alignment, or distribution of child components for composing horizontal sequences, enabling adjacent positioning of elements in a drawing or graphic composition, useful for arranging elements in a line, aligning multiple drawing parts horizontally, or managing the order and spacing of grouped visual objects.
</div>

#### Parameters

##### elements `Array`

An array with the drawing elements that should be stacked.

#### Example

    <div id="surface"></div>
    <script>
      var draw = kendo.drawing;
      var Rect = kendo.geometry.Rect;
      var Path = draw.Path;
      var pathRect = new Rect([0, 0], [100, 100]);

      var pathA = Path.fromRect(pathRect);
      var pathB = Path.fromRect(pathRect);
      var pathC = Path.fromRect(pathRect);

      draw.stack([pathA, pathB, pathC]);

      var surface = draw.Surface.create($("#surface"));
      surface.draw(new draw.Group().append(pathA, pathB, pathC));
    </script>

### vAlign

Aligns drawing elements y axis position to a given rectangle.


<div class="meta-api-description">
Adjust vertical positioning, set or control y-axis alignment, and align drawing elements relative to a specified rectangular boundary by configuring vertical placement within a given container or coordinate space. Enable precise vertical alignment of graphical components by programmatically setting their y-coordinates to match, center, top-align, bottom-align, or distribute elements inside or along the vertical edges of a defined rectangle or layout area. Use vertical alignment techniques to position shapes, images, or drawing objects consistently with a referenced boundary, supporting dynamic repositioning and layout adjustments in graphical compositions or user interfaces.
</div>

#### Parameters

##### elements `Array`

An array with the drawing elements that should be aligned.

##### rect `kendo.geometry.Rect`

The rectangle in which the elements should be aligned.

##### alignment `String`

Specifies how should the elements be aligned. The supported values are:

* "start" - the elements will be aligned to the rectangle origin.
* "center" - the elements will be aligned to the rectangle center.
* "end" - the elements will be aligned to the bottom side of the rectangle.

#### Example

    <div id="surface" style="height: 300px;"></div>
    <script>
      var draw = kendo.drawing;
      var Rect = kendo.geometry.Rect;
      var rect = new Rect([0, 0], [100, 300]);
      var path = draw.Path.fromRect(new Rect([0, 0], [100, 100]));

      draw.vAlign([path], rect, "center");

      var surface = draw.Surface.create($("#surface"));
      surface.draw(path);
      surface.draw(draw.Path.fromRect(rect));
    </script>

### vStack

Stacks drawing elements vertically.


<div class="meta-api-description">
Stack multiple graphic or drawing elements vertically in a single column by arranging child components from top to bottom in a sequential vertical layout, enabling grouping, alignment, and collective transformations of stacked elements, configuring vertical stacking order, composing elements in a columnar fashion, controlling layout flow for multiple visual items, and organizing content with top-down stacking to simplify relative positioning and combined manipulations.
</div>

#### Parameters

##### elements `Array`

An array with the drawing elements that should be stacked.

#### Example

    <div id="surface" style="height:300px;"></div>
    <script>
      var draw = kendo.drawing;
      var Rect = kendo.geometry.Rect;
      var Path = draw.Path;
      var pathRect = new Rect([0, 0], [100, 100]);

      var pathA = Path.fromRect(pathRect);
      var pathB = Path.fromRect(pathRect);
      var pathC = Path.fromRect(pathRect);

      draw.vStack([pathA, pathB, pathC]);

      var surface = draw.Surface.create($("#surface"));
      surface.draw(new draw.Group().append(pathA, pathB, pathC));
    </script>

### vWrap

Stacks drawing elements vertically. Multiple stacks will be used if the elements height exceeds the given rectangle height.


<div class="meta-api-description">
Arrange and control vertical stacking of elements within a confined area by enabling top-to-bottom flow that dynamically creates new columns when content height exceeds the container, supporting vertical wrapping, multi-column layouts, tiled arrangements, content overflow handling, column-based element distribution, layout organization in vertical direction, responsive vertical flow of items, and automatic column creation for stacked graphical or UI components.
</div>

#### Parameters

##### elements `Array`

An array with the drawing elements that should be wrapped.

##### rect `kendo.geometry.Rect`

The rectangle in which the elements should be wrapped.

#### Returns
`Array` An array with the stacks. Each stack is an `Array` holding the stack drawing elements.

#### Example

    <div id="surface" style="height:300px;"></div>
    <script>
      var draw = kendo.drawing;
      var Rect = kendo.geometry.Rect;
      var Path = draw.Path;
      var rect = new Rect([0, 0], [250, 250])
      var pathRect = new Rect([0, 0], [100, 100]);
      var group = new draw.Group();
      var pathA = Path.fromRect(pathRect);
      var pathB = Path.fromRect(pathRect);
      var pathC = Path.fromRect(pathRect);

      var stacks = draw.vWrap([pathA, pathB, pathC], rect);
      for (var idx = 0; idx < stacks.length; idx++) {
        var stackGroup = new draw.Group();
        stackGroup.append.apply(stackGroup, stacks[idx]);
        group.append(stackGroup);
      }
      draw.stack(group.children);

      group.append(Path.fromRect(rect));

      var surface = draw.Surface.create($("#surface"));
      surface.draw(group);
    </script>

### wrap

Stacks drawing elements horizontally. Multiple stacks will be used if the elements width exceeds the given rectangle width.


<div class="meta-api-description">
Arrange shapes or drawing elements horizontally inside a bounded area by stacking them left to right, automatically wrapping overflow elements onto new lines or rows when their combined widths surpass the container’s width; control layout flow, line wrapping, flow layout, multi-row stacking, horizontal stacking, overflow handling, wrap drawing elements, position shapes within a rectangle, flow elements dynamically in drawing or graphics components, set elements to wrap within bounds, and reorganize shapes to fit space constraints in visual layouts.
</div>

#### Parameters

##### elements `Array`

An array with the drawing elements that should be wrapped.

##### rect `kendo.geometry.Rect`

The rectangle in which the elements should be wrapped.

#### Returns
`Array` An array with the stacks. Each stack is an `Array` holding the stack drawing elements.

#### Example

    <div id="surface" style="height:300px;"></div>
    <script>
      var draw = kendo.drawing;
      var Rect = kendo.geometry.Rect;
      var Path = draw.Path;
      var rect = new Rect([0, 0], [250, 250])
      var pathRect = new Rect([0, 0], [100, 100]);
      var group = new draw.Group();
      var pathA = Path.fromRect(pathRect);
      var pathB = Path.fromRect(pathRect);
      var pathC = Path.fromRect(pathRect);

      var stacks = draw.wrap([pathA, pathB, pathC], rect);
      for (var idx = 0; idx < stacks.length; idx++) {
        var stackGroup = new draw.Group();
        stackGroup.append.apply(stackGroup, stacks[idx]);
        group.append(stackGroup);
      }
      draw.vStack(group.children);

      group.append(Path.fromRect(rect));

      var surface = draw.Surface.create($("#surface"));
      surface.draw(group);
    </script>
