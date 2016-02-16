---
title: drawing
page_title: API reference for Kendo UI Drawing API static functions
---

# kendo.drawing

Helper functions declared in the kendo.drawing namespace.

## Methods

### align

Aligns drawing elements x axis position to a given rectangle.

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

The operation is asynchronous and returns a [promise](http://api.jquery.com/Types/#Promise).

The promise will be resolved with the root [Group](drawing/group) of the scene.

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

See [Multi-page PDF output](/framework/drawing/drawing-dom#multi-page-pdf-output).

##### options.paperSize `String` *(default: "auto")*
The paper size for [automatic page breaking](/framework/drawing/drawing-dom#automatic-page-breaking-q1-2015).
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
The [page template](/framework/drawing/drawing-dom#page-template-headers-and-footers) for multi-page output.

#### Returns
`Promise` A promise that will be resolved with the root Group of the scene.

#### Example - Exporting a DOM element to an image
    <div id="calendar"></div>
    <script>
        $("#calendar").kendoCalendar();

        var draw = kendo.drawing;

        draw.drawDOM($("#calendar"))
        .then(function(root) {
            return draw.exportImage(root);
        })
        .done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "calendar.png"
            });
        });
    </script>


### exportImage
Exports a group of drawing elements as an image.

The group will be positioned at [0, 0] in the exported image. It's dimensions will be used as default dimensions for the image.

The export operation is asynchronous and returns a [promise](http://api.jquery.com/Types/#Promise).

The promise will be resolved with a PNG image encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

> *Important*
>
> Scene images must be of same origin or [CORS-enabled](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image).

#### Parameters

##### group `kendo.drawing.Group`
The root group containing all elements to export.

##### options `Object`
Parameters for the exported image.

##### options.width `String`
The width of the exported image. Defaults to the scene width.

##### options.height `String`
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

The export operation is asynchronous and returns a [promise](http://api.jquery.com/Types/#Promise).

The promise will be resolved with a PDF file encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

> Scene images must be of same origin or [CORS-enabled](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image).

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

The export operation is asynchronous and returns a [promise](http://api.jquery.com/Types/#Promise).

The promise will be resolved with a SVG document encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

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
