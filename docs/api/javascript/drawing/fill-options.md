---
title: FillOptions
page_title: API reference for methods and fields of the Fill options
res_type: api
---

# kendo.drawing.FillOptions

Shape fill configuration options.

## Fields

### color `String`
The fill color in any of the following formats.

| Format         | Description
| ---            | --- | ---
| red            | [Basic](https://www.w3.org/TR/css3-color/#html4) or [Extended](https://www.w3.org/TR/css3-color/#svg-color) CSS Color name
| #ff0000        | Hex RGB value
| rgb(255, 0, 0) | RGB value

Specifying 'none', 'transparent' or '' (empty string) will clear the fill.

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    var surface = draw.Surface.create($("#surface"));

    var rect = new draw.Rect(new geom.Rect([10, 10], [100, 50]), {
        fill: {
            color: "#ff6347"  // Tomato color
        }
    });
    
    surface.draw(rect);
    </script>

### opacity `Number`
The fill opacity. Ranges from 0 (completely transparent) to 1 (completely opaque).

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var geom = kendo.geometry;
    var surface = draw.Surface.create($("#surface"));

    var rect = new draw.Rect(new geom.Rect([10, 10], [100, 50]), {
        fill: {
            color: "#0066cc",
            opacity: 0.5  // 50% transparency
        }
    });
    
    surface.draw(rect);
    </script>

