---
title: StrokeOptions
page_title: API reference for Kendo UI Drawing API Stroke options
res_type: api
---

# kendo.drawing.StrokeOptions

Shape stroke configuration options.

## Fields

### color `String`
The stroke color in any of the following formats.

| Value          | Description
| ---            | --- | ---
| red            | [Basic](https://www.w3.org/TR/css3-color/#html4) or [Extended](https://www.w3.org/TR/css3-color/#svg-color) CSS Color name
| #ff0000        | Hex RGB value
| rgb(255, 0, 0) | RGB value

Specifying 'none', 'transparent' or '' (empty string) will clear the stroke.


<div class="meta-api-description">
Configure or update the outline color, border color, stroke color, or line color of a drawing or shape by setting the color value with CSS color names, hex color codes, RGB function values like rgb(), or extended CSS color formats for precise styling and visual customization. Control pen color or border hue using strings such as 'red', hex codes like '#ff0000', or rgb numeric values. Enable setting, changing, or clearing the stroke color by using keywords like 'none', 'transparent', or an empty string to remove the outline effect, ideal for manipulating line highlights, shape borders, or drawing edges in various graphical or UI components.
</div>

#### Example - Creating a drawing surface
    <div id="surface"></div>
    <script>
      var draw = kendo.drawing;
      var path = renderPath();

      function renderPath() {
        var path = new kendo.drawing.Path({
          stroke: {
            color: '#E4141B'
          }
        });

        var start = new kendo.geometry.Point(100, 100);
        for (var i = 0; i < 15; i++) {
          path.lineTo(start.clone().translate(i * 20, 0));
        }

        return path;
      }

      var surface = draw.Surface.create($("#surface"));

      surface.draw(path);

    </script>

### dashType `String` *(default: "solid")*
The stroke dash type.

| Value            |                                              | Description
| ---              | :---:                                        | ---
| `dash`           | ![Kendo UI for jQuery dash](images/stroke-dash.png)              | a line consisting of dashes
| `dashDot`        | ![Kendo UI for jQuery dashDot](images/stroke-dash-dot.png)          | a line consisting of a repeating pattern of dash-dot
| `dot`            | ![Kendo UI for jQuery dot](images/stroke-dot.png)               | a line consisting of dots
| `longDash`       | ![Kendo UI for jQuery longDash](images/stroke-long-dash.png)         | a line consisting of a repeating pattern of long-dash
| `longDashDot`    | ![Kendo UI for jQuery longDashDot](images/stroke-long-dash-dot.png)     | a line consisting of a repeating pattern of long-dash dot
| `longDashDotDot` | ![Kendo UI for jQuery longDashDotDot](images/stroke-long-dash-dot-dot.png) | a line consisting of a repeating pattern of long-dash dot-dot
| `solid`          | ![Kendo UI for jQuery solid](images/stroke-solid.png)             | a solid line


<div class="meta-api-description">
Configure, customize, or retrieve stroke dash patterns including solid, dashed, dotted, long dash, dash-dot, long-dash-dot, and complex repeating sequences to define the visual style of lines and paths in drawing or canvas components, enabling control over line appearance such as solid lines, intermittent dashes, dotted sequences, or elaborate dash and dot combinations for flexible and detailed stroke rendering and pattern repetition in graphics, vector drawings, or shape outlines.
</div>

#### Example - Creating a drawing surface
    <div id="surface"></div>
    <script>
      var draw = kendo.drawing;
      var path = renderPath();

      function renderPath() {
        var path = new kendo.drawing.Path({
          stroke: {
            color: '#E4141B',
            dashType: "dash"
          }
        });

        var start = new kendo.geometry.Point(100, 100);
        for (var i = 0; i < 15; i++) {
          path.lineTo(start.clone().translate(i * 20, 0));
        }

        return path;
      }

      var surface = draw.Surface.create($("#surface"));

      surface.draw(path);

    </script>

### lineCap `String` *(default: "butt")*
The stroke line cap style.

| Value    |                                     | Description
| ---      | :---:                               | ---
| `butt`   | ![Kendo UI for jQuery dash](images/line-cap-butt.png)   | a flat edge with no cap
| `round`  | ![Kendo UI for jQuery dash](images/line-cap-round.png)  | a rounded cap
| `square` | ![Kendo UI for jQuery dash](images/line-cap-square.png) | a square cap


<div class="meta-api-description">
Configure the style of stroke line endings on shapes, paths, connectors, or vector graphics by setting line cap options such as flat edges with no caps, rounded ends, or squared edges to control how lines terminate in drawings, charts, annotations, or vector art, enabling precise visual customization of stroke boundaries and endpoint styles for consistent rendering across graphical elements.
</div>

#### Example - Creating a drawing surface
    <div id="surface"></div>
    <script>
      var draw = kendo.drawing;
      var path = renderPath();

      function renderPath() {
        var path = new kendo.drawing.Path({
          stroke: {
            color: '#E4141B',
            width: 20,
            lineCap: "round"
          }
        });

        var start = new kendo.geometry.Point(100, 100);
        for (var i = 0; i < 15; i++) {
          path.lineTo(start.clone().translate(i * 20, 0));
        }

        return path;
      }

      var surface = draw.Surface.create($("#surface"));

      surface.draw(path);

    </script>

### lineJoin `String` *(default: "miter")*
The stroke line join style.

| Value   |                                     | Description
| ---     | :---:                               | ---
| `bevel` | ![Kendo UI for jQuery dash](images/line-join-bevel.png) | a beveled join
| `miter` | ![Kendo UI for jQuery dash](images/line-join-miter.png) | a square join
| `round` | ![Kendo UI for jQuery dash](images/line-join-round.png) | a rounded join


<div class="meta-api-description">
Control the appearance of corners where lines meet in stroked shapes by setting the join style to bevel, miter, or round to achieve sharp edges, squared corners, or smooth rounded joins; configure stroke line joins for drawing outlines, shape borders, and path intersections by choosing between beveled corners, pointed square corners, or curved rounded corners to customize stroke rendering, corner smoothing, and line connection styles in vector graphics or canvas shapes.
</div>

#### Example - Creating a drawing surface
    <div id="surface"></div>
    <script>
      var draw = kendo.drawing;
      var path = renderPath();

      function renderPath() {
        var path = new kendo.drawing.Path({
          stroke: {
            color: '#E4141B',
            lineJoin: "round"
          }
        });

        var start = new kendo.geometry.Point(100, 100);
        for (var i = 0; i < 15; i++) {
          path.lineTo(start.clone().translate(i * 20, 0));
        }

        return path;
      }

      var surface = draw.Surface.create($("#surface"));

      surface.draw(path);

    </script>

### opacity `Number`
The stroke opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).


<div class="meta-api-description">
Adjust line transparency, control stroke alpha levels, set stroke visibility between fully transparent and fully opaque, configure stroke translucency or opacity for drawing lines, modify stroke layering by changing opacity values from 0 to 1, enable semi-transparent or solid stroke effects, fine-tune line see-through settings, customize stroke clarity and visual weight, set stroke fade or intensity, and manage how visible or hidden drawing strokes appear through alpha channel adjustments.
</div>

#### Example - Creating a drawing surface
    <div id="surface"></div>
    <script>
      var draw = kendo.drawing;
      var path = renderPath();

      function renderPath() {
        var path = new kendo.drawing.Path({
          stroke: {
            color: '#E4141B',
            opacity: 0.5
          }
        });

        var start = new kendo.geometry.Point(100, 100);
        for (var i = 0; i < 15; i++) {
          path.lineTo(start.clone().translate(i * 20, 0));
        }

        return path;
      }

      var surface = draw.Surface.create($("#surface"));

      surface.draw(path);

    </script>

### width `Number`
The stroke width in pixels.


<div class="meta-api-description">
Adjust or configure the thickness, weight, or width of strokes, lines, borders, or outlines for shapes and drawings by setting pixel values to control how thick or thin the rendered lines appear. Modify line thickness, stroke size, pen width, or border weight to customize drawing appearance, enable precise control over shape outlines, and set the degree of line boldness or thinness in graphical components. Tailor stroke dimensions for visual styling, shape rendering, or line drawing with flexible pixel-based width settings.
</div>

#### Example - Creating a drawing surface
    <div id="surface"></div>
    <script>
      var draw = kendo.drawing;
      var path = renderPath();

      function renderPath() {
        var path = new kendo.drawing.Path({
          stroke: {
            color: '#E4141B',
            width: 20
          }
        });

        var start = new kendo.geometry.Point(100, 100);
        for (var i = 0; i < 15; i++) {
          path.lineTo(start.clone().translate(i * 20, 0));
        }

        return path;
      }

      var surface = draw.Surface.create($("#surface"));

      surface.draw(path);

    </script>
