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


<div class="meta-api-description">
Configure and control the fill color of drawing shapes using various CSS color formats, including named colors like red, hex RGB codes such as #ff0000, and rgb() function values like rgb(255, 0, 0), enabling precise color customization or transparency effects by specifying values like none, transparent, or empty strings to clear fills; this field supports setting, adjusting, enabling, or disabling fill paints, and facilitates dynamic paint changes, color overrides, and fill styling for shapes in graphical contexts.
</div>

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


<div class="meta-api-description">
Adjust or configure the transparency level, alpha value, or fill opacity for shapes, drawings, or graphical components by specifying a numeric value from fully transparent (0) to fully opaque (1), enabling control over translucency, semi-transparent overlays, color blending with RGBA, or solid fill appearance for visual elements.
</div>

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

