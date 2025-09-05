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

