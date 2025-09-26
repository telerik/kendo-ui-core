---
title: Layout
page_title: API reference for Kendo UI Drawing API Layout
res_type: api
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

The rectangle within which the children should be arranged.


<div class="meta-api-description">
Set or configure the bounding rectangle that defines the layout area for positioning and aligning child elements within a container, specifying the x and y coordinates along with width and height to control how children are arranged, clipped, or constrained inside a defined rectangular space. This includes configuring the placement boundaries, controlling layout dimensions, adjusting spatial constraints for child elements, and setting the frame that governs alignment and clipping behavior during layout calculations.
</div>

#### Example

    <div id="surface" style="height: 300px;"></div>
    <script>
      var draw = kendo.drawing;
      var Rect = kendo.geometry.Rect;
      var Path = draw.Path;
      
      // Define the layout rectangle
      var layoutRect = new Rect([50, 50], [200, 150]);
      var layout = new draw.Layout(layoutRect);

      var pathA = Path.fromRect(new Rect([0, 0], [80, 60]));
      var pathB = Path.fromRect(new Rect([0, 0], [80, 60]));
      
      layout.append(pathA, pathB);
      layout.reflow();

      var surface = draw.Surface.create($("#surface"));
      surface.draw(layout);
      // Draw the layout rectangle for reference
      surface.draw(Path.fromRect(layoutRect));
    </script>

### options `Object`

The configuration options of the layout.


<div class="meta-api-description">
Set or customize the initial layout configuration for placing and arranging drawing components by specifying parameters that control spacing between elements, alignment choices, orientation directions, algorithm types for layout computation, and various layout rules or constraints applied at creation time. Enable defining how items are organized, positioned, and spaced within the drawing area by passing options that dictate default behaviors, alignment settings, element distribution, layout algorithms, and spatial relationships when initializing the layout structure. Control and configure layout initialization parameters to fine-tune automatic placement, alignment preferences, orientation modes, and spacing rules, ensuring the drawing elements are arranged according to specified constraints and desired visual hierarchy during creation.
</div>

#### Example

    <div id="surface" style="height: 300px;"></div>
    <script>
      var draw = kendo.drawing;
      var Rect = kendo.geometry.Rect;
      var Path = draw.Path;
      var rect = new Rect([200, 0], [200, 200]);
      
      // Create layout with configuration options
      var layout = new draw.Layout(rect, {
          alignContent: "center",
          alignItems: "center",
          spacing: 5,
          lineSpacing: 10
      });

      var pathA = Path.fromRect(new Rect([0, 0], [80, 40]));
      var pathB = Path.fromRect(new Rect([0, 0], [80, 40]));
      var pathC = Path.fromRect(new Rect([0, 0], [80, 40]));

      layout.append(pathA, pathB, pathC);
      layout.reflow();

      var surface = draw.Surface.create($("#surface"));
      surface.draw(layout);
    </script>

## Configuration

### alignContent `String` *(default: "start")*

Specifies the alignment of the content. The supported values are:

* `"start"` - aligns the content to the rectangle origin.
* `"center"` - aligns the content to the rectangle center.
* `"end"` - aligns the content to the rectangle end.


<div class="meta-api-description">
Control and configure content alignment within a drawing or layout area by setting how elements are positioned horizontally or vertically inside the container, such as aligning content to the start, center, or end points of the layout rectangle. Adjust, set, or enable alignment options to precisely position graphical or UI elements within a given drawing space or component boundary, ensuring content is arranged towards the origin, centered in the middle, or anchored at the far edge for flexible layout control in visual or graphic presentations.
</div>

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
* `"end"` - aligns the items to the end of the largest element.


<div class="meta-api-description">
Control the alignment of child elements in a container relative to the largest item by configuring whether items line up at the start, center, or end of that biggest element, enabling consistent vertical or horizontal positioning based on the maximum size within the layout. Adjust or set alignment options to align children along the leading edge, center axis, or trailing edge of the largest component, ensuring uniform distribution and relative placement in drawing or UI compositions. Manage how contained items stack or align in relation to the biggest sibling, facilitating layout precision and design consistency through start, center, or end alignment modes.
</div>

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

* `"start"` - aligns the items to the rectangle origin.
* `"center"` - aligns the items to the rectangle center.
* `"end"` - aligns the items to the rectangle end.


<div class="meta-api-description">
Adjust horizontal alignment, distribution, or positioning of elements within a container or layout area by configuring how content is justified inside a drawing or UI block to align items to the start, middle, or end of the available space; control placement using options like left alignment, center alignment, or right alignment to manage spacing and layout flow for consistent arrangement across various design or interface components where item justification affects visual structure, alignment behavior, or content grouping within bounded rectangles or frames.
</div>

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


<div class="meta-api-description">
Control and adjust the vertical space or gap between lines of wrapped text or elements within a drawing or layout, fine-tuning line height, leading, or spacing to improve readability and appearance of multi-line text blocks or wrapped content. Set or configure line intervals, spacing between wrapped lines, line pitch, or distance between rows in layouts where text or components flow onto multiple lines, enabling customization of text flow, line breaks, and visual separation in wrapped or multiline presentations.
</div>

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


<div class="meta-api-description">
Adjust the gap or distance between shapes, elements, or child components within a drawing or diagram layout to control how tightly or loosely items are arranged, modify spacing between grouped or individual objects, set or fine-tune the padding or margins around elements to influence visual separation and layout density, control empty space between graphical elements without resizing them, and configure the spacing to optimize arrangement for clarity, readability, or design aesthetics in diagrams, shapes, or drawing interfaces.
</div>

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

* "horizontal" - the elements are arranged horizontally.
* "vertical" - the elements are arranged vertically.


<div class="meta-api-description">
Configure the flow direction of child elements within a container by setting the layout orientation to horizontal or vertical, enabling side-by-side alignment or stacked top-to-bottom arrangement for flexible element positioning, controlling whether items line up in a row or a column, adjusting content flow direction for responsive design, and managing layout behavior to organize elements either horizontally or vertically according to design needs.
</div>

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


<div class="meta-api-description">
Adjust how graphical elements are arranged when the total size surpasses the container area, enabling configurations for automatic line breaks or scaling down the entire group while maintaining their relative positions. Set whether contained items wrap onto new rows or columns versus uniformly resizing to fit within boundaries, control overflow behavior for layouts with multiple components, manage layout responsiveness when elements exceed space, enable wrapping to prevent overlap by shifting elements to subsequent lines, or alternatively scale down all content proportionally to fit inside a fixed rectangle, letting developers choose between layout wrapping, overflow handling, dynamic resizing, and preserving spatial relationships during layout overflow situations.
</div>

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


<div class="meta-api-description">
Retrieve or modify the layout rectangle of a drawing or graphical component by accessing or setting its bounding box, layout bounds, or frame dimensions. Control, update, or query the size and position of the drawing area to recalculate layout, adjust visual boundaries, resize, reposition, or refresh component layout parameters. Enable fetching current rectangular coordinates or apply new dimensions to configure the drawing’s spatial layout and visual container boundaries.
</div>

#### Parameters

##### rect `kendo.geometry.Rect`
The layout rectangle.

#### Returns
`kendo.geometry.Rect` The current rectangle.

#### Example

    <div id="surface" style="height: 400px;"></div>
    <script>
      var draw = kendo.drawing;
      var Rect = kendo.geometry.Rect;
      var Path = draw.Path;
      var initialRect = new Rect([200, 0], [200, 200]);
      var pathRect = new Rect([0, 0], [100, 100]);
      var layout = new draw.Layout(initialRect);

      var pathA = Path.fromRect(pathRect);
      var pathB = Path.fromRect(pathRect);
      layout.append(pathA, pathB);
      layout.reflow();

      // Get the current rectangle
      var currentRect = layout.rect();
      console.log("Current rectangle:", currentRect);

      // Set a new rectangle
      var newRect = new Rect([200, 220], [300, 150]);
      layout.rect(newRect);
      layout.reflow();

      var surface = draw.Surface.create($("#surface"));
      surface.draw(layout);
      surface.draw(Path.fromRect(currentRect));
      surface.draw(Path.fromRect(newRect));
    </script>

### reflow
Arranges the elements based on the current options.


<div class="meta-api-description">
Trigger layout recalculation and rearrangement for graphical elements to update positions, sizes, spacing, alignment, and organization dynamically after changes or configuration updates, enabling redraw of shapes, connectors, groups, and canvas without restarting or reinitializing the entire drawing component, useful for refreshing layout, applying new options, forcing re-layout, and ensuring visual consistency after programmatic modifications or UI adjustments.
</div>

#### Example

    <div id="surface" style="height: 400px;"></div>
    <script>
      var draw = kendo.drawing;
      var Rect = kendo.geometry.Rect;
      var Path = draw.Path;
      var rect = new Rect([200, 0], [300, 300]);
      var pathRect = new Rect([0, 0], [100, 100]);
      var layout = new draw.Layout(rect, {
        orientation: "horizontal",
        spacing: 5
      });

      var pathA = Path.fromRect(pathRect);
      var pathB = Path.fromRect(pathRect);
      var pathC = Path.fromRect(pathRect);
      
      layout.append(pathA, pathB, pathC);

      // Initial arrangement with horizontal orientation
      layout.reflow();
      var surface = draw.Surface.create($("#surface"));
      surface.draw(layout);

      // Change orientation and reflow to rearrange elements
      setTimeout(function() {
        layout.options.set("orientation", "vertical");
        layout.reflow(); // Rearrange elements vertically
        surface.clear();
        surface.draw(layout);
        surface.draw(Path.fromRect(rect));
      }, 2000);
    </script>
