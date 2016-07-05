---
title: Rendering Modes for Data Visualization
page_title: Rendering Modes for Data Visualization | Kendo UI Styles and Appearance
description: "Learn how to configure the rendering modes for data visualization in Kendo UI."
previous_url: /dataviz/rendering
slug: renderingmodesfor_datavisualization_kendouistyling
position: 4
---

# Rendering Modes for Data Visualization

The [Kendo UI Gauges, Charts, Barcodes, Diagrams, and Maps](http://demos.telerik.com/kendo-ui/) widgets support the following rendering targets:

* SVG
* VML
* Canvas

## Mode Selection

The rendering mode is automatically chosen based on availability. The order is SVG > VML > Canvas for all widgets rendering data visualization except for the Barcode and QRCode. These components do not require interactivity and default to Canvas rendering. You can set the preferred rendering mode in the [`renderAs`](/api/dataviz/chart#configuration-renderAs) option.

The example below demonstrates how to configure the preferred rendering mode to Canvas by using the `renderAs` option.

###### Example

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

## Include Only What You Need

The rendering modules are available as separate files:

* `kendo.dataviz.svg(.min).js`
* `kendo.dataviz.vml(.min).js`
* `kendo.dataviz.canvas(.min).js`

You must include at least one, the rest are optional.

> **Important**  
>
> The Canvas and SVG modules are required by the [`imageDataURL`](/api/dataviz/chart#methods-imageDataURL) and [`svg`](/api/dataviz/chart#methods-svg) methods.

For more information on how to add only the functionalities you want to your project, refer to the [articles on the JavaScript dependencies]({% slug javascript_prerequisites_kendoui_installation %}) and the [Custom Download Builder](http://www.telerik.com/download/custom-download) (requires login).

## Known Limitations

Some rendering modes impose limitations on the available features. Below is a short list of the known issues.

### SVG

* None

### VML

* Gradient overlays are not supported for Kendo UI Donut Charts.
* Reduced performance, especially in Internet Explorer 8 version.

### Canvas

* Dashed lines are not supported in the Internet Explorer.

## See Also

Other articles on styling, appearance, and rendering of Kendo UI widgets:

* [Themes and Appearance of the Kendo UI Widgets]({% slug themesandappearnce_kendoui_desktopwidgets %})
* [Responsive Web Design]({% slug responsivewebdesign_integration_kendoui %})
* [Web Font Icons]({% slug webfonticons_kendoui_desktopwidgets %})
* [How to Change Themes on the Client]({% slug howto_changethemes_ontheclient_styleskendoui %})
* [ThemeBuilder Overview]({% slug themebuilder_overview_kendouistyling %})
* [Troubleshooting]({% slug commonissues_troubleshooting_kendouistyling %})
* [Themes and Appearance of the Kendo UI Hybrid Widgets](/controls/hybrid/styling)
