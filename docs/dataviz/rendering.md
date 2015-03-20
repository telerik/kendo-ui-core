---
title: Rendering
page_title: Understanding the different rendering modes in Kendo UI Javascript DataViz suite
description: How to configure the rendering modes in the Kendo UI DataViz suite.
---

# Notes on rendering

The **Kendo UI** DataViz widgets supports the following rendering targets:

* SVG
* VML
* Canvas

## Mode selection

The rendering mode will be chosen automatically based on availability.

The order is SVG -> VML -> Canvas for all widgets except Barcode and QRCode.
These components do not require interactivity and will default to Canvas rendering.

You can set the preferred rendering mode in the
[renderAs](/api/dataviz/chart#configuration-renderAs) option.

### Example: Set preferred rendering mode to Canvas

    <div id="chart"></div>
    <script>
    $("#chart").kendoChart({
        renderAs: "canvas",
        series:[{
            type: "line",
            data: [1, 2, 3, 4]
        }]
    });
    </script>

## Including only what you need

The rendering modules are available as separate files:

* kendo.dataviz.svg(.min).js
* kendo.dataviz.vml(.min).js
* kendo.dataviz.canvas(.min).js

You must include at least one, the rest are optional.

> The Canvas and SVG modules are required by the [imageDataURL](/api/dataviz/chart#methods-imageDataURL) and [svg](/api/dataviz/chart#methods-svg) methods.

See also:

* [JavaScript dependencies](/javascript-dependencies)
* [Custom Download Builder](http://www.telerik.com/download/custom-download) (requires login)

## Limitations

Some rendering modes impose limitations on the available features.
This is a short list of the known issues:

### SVG

* None

### VML

* Gradient overlays are not supported for donut charts.
* Reduced performance, especially in IE8.

### Canvas

* Interactive features are not available with the exception of shared tooltips.
* Dashed lines are not supported in IE.

