---
title: Layout
page_title: API reference for Kendo UI Drawing API Layout
---

# kendo.drawing.Layout : kendo.drawing.Group

Represents a group that can arrange its children within a rectangle.

#### Example - creating a layout

    <div id="surface" style="height: 300px;"></div>
    <script>
      var draw = kendo.drawing;
      var Rect = kendo.geometry.Rect;
      var Path = draw.Path;
      var rect = new Rect([200, 0], [200, 200]);
      var pathRect = new Rect([0, 0], [100, 100]);
      var layout = new draw.Layout(rect);

      var pathA = Path.fromRect(pathRect);
      var pathB = Path.fromRect(pathRect);
      var pathC = Path.fromRect(pathRect);

      layout.append(pathA, pathB, pathC);
      layout.reflow();

      var surface = draw.Surface.create($("#surface"));
      surface.draw(layout);
    </script>

## Constructor Parameters

### rect `kendo.geometry.Rect`

The rectangle within which the children should be arranged

### options `Object`

The configuration options of the layout.

## Configuration

### alignContent `String` *(default: "start")*

Specifies the alignment of the content. The supported values are:

* `"start"` - aligns the content to the rectangle origin
* `"center"` - aligns the content to the rectangle center
* `"end"` - aligns the content to the rectangle end

#### Example

    <div id="surface" style="height: 300px;"></div>
    <script>
      var draw = kendo.drawing;
      var Rect = kendo.geometry.Rect;
      var Path = draw.Path;
      var rect = new Rect([200, 0], [200, 300]);
      var pathRect = new Rect([0, 0], [100, 100]);
      var layout = new draw.Layout(rect, {
        	alignContent: "center"
      });

      var pathA = Path.fromRect(pathRect);
      var pathB = Path.fromRect(pathRect);
      var pathC = Path.fromRect(pathRect);

      layout.append(pathA, pathB, pathC);
      layout.reflow();

      var surface = draw.Surface.create($("#surface"));
      surface.draw(layout);
      surface.draw(Path.fromRect(rect));
    </script>

### alignItems `String` *(default: "start")*

Specifies the alignment of the items based on the largest one. The supported values are:

* `"start"` - aligns the items to the start of the largest element.
* `"center"` - aligns the items to the center of the largest element.
* `"end"` - aligns the items to the end of the largest element

#### Example

    <div id="surface" style="height: 300px;"></div>
    <script>
      var draw = kendo.drawing;
      var Rect = kendo.geometry.Rect;
      var Path = draw.Path;
      var rect = new Rect([200, 0], [300, 300]);
      var layout = new draw.Layout(rect, {
        	alignItems: "center"
      });

      var pathA = Path.fromRect(new Rect([0, 0], [100, 100]));
      var pathB = Path.fromRect(new Rect([0, 0], [100, 50]));
      var pathC = Path.fromRect(new Rect([0, 0], [100, 70]));

      layout.append(pathA, pathB, pathC);
      layout.reflow();

      var surface = draw.Surface.create($("#surface"));
      surface.draw(layout);
      surface.draw(Path.fromRect(rect));
    </script>

### justifyContent `String` *(default: "start")*

Specifies how should the content be justified. The supported values are:

* `"start"` - aligns the items to the rectangle origin
* `"center"` - aligns the items to the rectangle center
* `"end"` - aligns the items to the rectangle end

#### Example

    <div id="surface" style="height: 300px;"></div>
    <script>
      var draw = kendo.drawing;
      var Rect = kendo.geometry.Rect;
      var Path = draw.Path;
      var rect = new Rect([200, 0], [250, 300]);
      var pathRect = new Rect([0, 0], [100, 100]);
      var layout = new draw.Layout(rect, {
        justifyContent: "center"
      });

      var pathA = Path.fromRect(pathRect);
      var pathB = Path.fromRect(pathRect);
      var pathC = Path.fromRect(pathRect);

      layout.append(pathA, pathB, pathC);
      layout.reflow();

      var surface = draw.Surface.create($("#surface"));
      surface.draw(layout);
      surface.draw(Path.fromRect(rect));
    </script>

### lineSpacing `Number` *(default: 0)*

Specifies the distance between the lines for wrapped layout.

#### Example

    <div id="surface" style="height: 300px;"></div>
    <script>
      var draw = kendo.drawing;
      var Rect = kendo.geometry.Rect;
      var Path = draw.Path;
      var rect = new Rect([200, 0], [250, 300]);
      var pathRect = new Rect([0, 0], [100, 100]);
      var layout = new draw.Layout(rect, {
        lineSpacing: 10
      });

      var pathA = Path.fromRect(pathRect);
      var pathB = Path.fromRect(pathRect);
      var pathC = Path.fromRect(pathRect);

      layout.append(pathA, pathB, pathC);
      layout.reflow();

      var surface = draw.Surface.create($("#surface"));
      surface.draw(layout);
      surface.draw(Path.fromRect(rect));
    </script>

### spacing `Number` *(default: 0)*

Specifies the distance between the elements.

#### Example

    <div id="surface" style="height: 300px;"></div>
    <script>
      var draw = kendo.drawing;
      var Rect = kendo.geometry.Rect;
      var Path = draw.Path;
      var rect = new Rect([200, 0], [250, 300]);
      var pathRect = new Rect([0, 0], [100, 100]);
      var layout = new draw.Layout(rect, {
        spacing: 10
      });

      var pathA = Path.fromRect(pathRect);
      var pathB = Path.fromRect(pathRect);

      layout.append(pathA, pathB);
      layout.reflow();

      var surface = draw.Surface.create($("#surface"));
      surface.draw(layout);
      surface.draw(Path.fromRect(rect));
    </script>

### orientation `String` *(default: "horizontal")*

Specifies layout orientation. The supported values are:

* "horizontal" - the elements are arranged horizontally
* "vertical" - the elements are arranged vertically

#### Example

    <div id="surface" style="height: 300px;"></div>
    <script>
      var draw = kendo.drawing;
      var Rect = kendo.geometry.Rect;
      var Path = draw.Path;
      var rect = new Rect([200, 0], [250, 300]);
      var pathRect = new Rect([0, 0], [100, 100]);
      var layout = new draw.Layout(rect, {
        orientation: "vertical"
      });

      var pathA = Path.fromRect(pathRect);
      var pathB = Path.fromRect(pathRect);

      layout.append(pathA, pathB);
      layout.reflow();

      var surface = draw.Surface.create($("#surface"));
      surface.draw(layout);
      surface.draw(Path.fromRect(rect));
    </script>

### wrap `Boolean` *(default: true)*

Specifies the behavior when the elements size exceeds the rectangle size. If set to true, the elements will be moved to the next "line". If set to false, the layout will be scaled so that the elements fit in the rectangle.

#### Example

    <div id="surface" style="height: 300px;"></div>
    <script>
      var draw = kendo.drawing;
      var Rect = kendo.geometry.Rect;
      var Path = draw.Path;
      var rect = new Rect([200, 0], [250, 300]);
      var pathRect = new Rect([0, 0], [100, 100]);
      var layout = new draw.Layout(rect, {
        wrap: false
      });

      var pathA = Path.fromRect(pathRect);
      var pathB = Path.fromRect(pathRect);
			var pathC = Path.fromRect(pathRect);
      layout.append(pathA, pathB, pathC);
      layout.reflow();

      var surface = draw.Surface.create($("#surface"));
      surface.draw(layout);
      surface.draw(Path.fromRect(rect));
    </script>


## Methods

### rect
Gets or sets the layout rectangle.

#### Parameters

##### rect `kendo.geometry.Rect`
The layout rectangle.

#### Returns
`kendo.geometry.Rect` The current rectangle.

### reflow
Arranges the elements based on the current options.