---
title: GradientStop
page_title: API reference for Kendo UI Drawing API GradientStop
res_type: api
---

# kendo.drawing.GradientStop : kendo.Class

Represents a gradient color stop.

## Constructor Parameters

### options `Object`
The configuration of this GradientStop.


<div class="meta-api-description">
How do I configure a gradient stop in Kendo UI for jQuery to set its color, position, and opacity? Set up and customize a gradient color point by specifying properties like color, position offset, opacity level, and various other stop-related settings when initializing a gradient stop element for drawing or graphic components. Control how each color transition point behaves within gradients by providing detailed configuration options through an initialization parameter, enabling precise adjustment of appearance, transparency, and placement along the gradient range. This includes defining color values, stop locations, alpha transparency, and other customizable attributes that affect how the gradient stop contributes to the overall gradient effect in rendering contexts or UI design workflows.
</div>

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var surface = draw.Surface.create($("#surface"));
    
    var gradientStop = new draw.GradientStop({
        offset: 0.5,
        color: "#ff0000",
        opacity: 0.8
    });
    
    console.log(gradientStop.options.color); // "#ff0000"
    </script>

## Configuration

### offset `Number`
The stop offset from the start of the element.
Ranges from 0 (start of gradient) to 1 (end of gradient).


<div class="meta-api-description">
How to adjust color stops in Kendo UI for jQuery gradient? Set or adjust the position of a color stop within a gradient by specifying a numeric value between zero and one to control where along the gradient line the color begins or changes, enabling precise placement of color transitions, stops, and offsets for creating smooth or sharp color blends in drawing or graphic elements, allowing developers to define fractional positions and control gradient progression from start to end coordinates.
</div>

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var surface = draw.Surface.create($("#surface"));
    
    var gradientStop = new draw.GradientStop({
        offset: 0.3, // 30% from the start
        color: "#0066cc"
    });
    
    console.log(gradientStop.options.offset); // 0.3
    </script>

### color `String`
The color in any of the following formats.

| Format         | Description
| ---            | --- | ---
| red            | [Basic](https://www.w3.org/TR/css3-color/#html4) or [Extended](https://www.w3.org/TR/css3-color/#svg-color) CSS Color name
| #ff0000        | Hex RGB value
| rgb(255, 0, 0) | RGB value

Specifying 'none', 'transparent' or '' (empty string) will clear the fill.


<div class="meta-api-description">
What is the correct format to specify colors for gradient stops in Kendo UI for jQuery? Specify or configure gradient stop colors using CSS color names, hex codes, RGB values, or transparent and none keywords to set, update, clear, or control color stops within gradients. Enable programmable manipulation of color points in gradients with formats like named colors (e.g., red), hexadecimal notation (#ff0000), and rgb() functions (rgb(255, 0, 0)), supporting flexible styling, dynamic updates, resetting fills, or clearing colors through empty strings or transparent values. Adjust, define, customize, or override gradient colors in drawing contexts with comprehensive color format support for precise visual control.
</div>

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var surface = draw.Surface.create($("#surface"));
    
    // Using different color formats
    var stop1 = new draw.GradientStop({
        offset: 0,
        color: "red" // CSS color name
    });
    
    var stop2 = new draw.GradientStop({
        offset: 0.5,
        color: "#00ff00" // Hex RGB value
    });
    
    var stop3 = new draw.GradientStop({
        offset: 1,
        color: "rgb(0, 0, 255)" // RGB value
    });
    
    console.log(stop1.options.color); // "red"
    console.log(stop2.options.color); // "#00ff00"
    console.log(stop3.options.color); // "rgb(0, 0, 255)"
    </script>

### opacity `Number`
The fill opacity.
Ranges from 0 (completely transparent) to 1 (completely opaque).


<div class="meta-api-description">
How do I set the opacity for a gradient stop in Kendo UI? Adjust or configure the transparency level, alpha, or fill opacity of a color stop within a gradient fill, controlling how see-through, transparent, translucent, or solid the gradient segment appears in drawing or graphic components; set or modify the opacity value ranging from fully invisible or transparent (0) to fully visible or opaque (1) to customize the visual blending, fade, or transparency effects in drawing shapes, backgrounds, or UI elements.
</div>

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var surface = draw.Surface.create($("#surface"));
    
    // Creating gradient stops with different opacity values
    var transparentStop = new draw.GradientStop({
        offset: 0,
        color: "#ff0000",
        opacity: 0 // Completely transparent
    });
    
    var semiTransparentStop = new draw.GradientStop({
        offset: 0.5,
        color: "#ff0000",
        opacity: 0.5 // Semi-transparent
    });
    
    var opaqueStop = new draw.GradientStop({
        offset: 1,
        color: "#ff0000",
        opacity: 1 // Completely opaque
    });
    
    console.log(transparentStop.options.opacity); // 0
    console.log(semiTransparentStop.options.opacity); // 0.5
    console.log(opaqueStop.options.opacity); // 1
    </script>

## Fields

### options `kendo.drawing.OptionsStore`
The configuration options of the gradient stop.


<div class="meta-api-description">
How to configure color and position of a gradient stop in Kendo UI for jQuery? Accessing or modifying the configuration settings of a gradient stop, including reading or updating properties that control its color, position, opacity, and behavior, programmatically managing the gradient stop’s parameters after creation, inspecting and adjusting rendering options or appearance details of individual gradient points within a gradient, configuring or customizing gradient stops in code for dynamic gradients, retrieving or setting stop-specific options that influence how gradients transition, working with the settings object tied to specific gradient locations, and controlling fine-grained attributes of gradient stops such as interpolation, offset, and color values.
</div>

#### Example

    <div id="surface"></div>
    <script>
    var draw = kendo.drawing;
    var surface = draw.Surface.create($("#surface"));
    
    var gradientStop = new draw.GradientStop({
        offset: 0.7,
        color: "#336699",
        opacity: 0.9
    });
    
    // Access the options store
    var options = gradientStop.options;
    console.log(options.offset); // 0.7
    console.log(options.color); // "#336699"
    console.log(options.opacity); // 0.9
    
    // The options store provides access to all configuration properties
    console.log(typeof options); // "object"
    </script>

