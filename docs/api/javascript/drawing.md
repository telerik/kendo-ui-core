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

The export operation is asynchronous and returns a [promise](http://api.jquery.com/Types/#Promise).

The promise will be resolved with a PNG image encoded as a [Data URI](https://developer.mozilla.org/en-US/docs/data_URIs).

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


### exportPDF
Exports a group of drawing elements as a PDF file.

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
