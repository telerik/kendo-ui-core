---
title: Data Visualization Modes
page_title: Data Visualization Modes | Kendo UI Styles and Appearance
description: "Learn how to configure the rendering modes for data visualization in Kendo UI."
previous_url: /dataviz/rendering
slug: renderingmodesfor_datavisualization_kendouistyling
position: 5
---

# Data Visualization Modes

The [Kendo UI Gauges, Charts, Barcodes, Diagrams, and Maps](http://demos.telerik.com/kendo-ui/) widgets support the SVG and Canvas rendering targets.

## Mode Selection

The rendering mode is automatically chosen based on availability. The order is SVG > Canvas for all widgets rendering data visualization except for the Barcode and QRCode. These components do not require interactivity and default to Canvas rendering. You can set the preferred rendering mode in the [`renderAs`](/api/dataviz/chart#configuration-renderAs) option.

The following example demonstrates how to configure the preferred rendering mode to Canvas by using the `renderAs` option.

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

## Including Only What You Need

The rendering modules are available under the following separate files. You are required to include at least one of them.

* `kendo.dataviz.svg(.min).js`
* `kendo.dataviz.canvas(.min).js`

> The Canvas and SVG modules are required by the [`imageDataURL`](/api/dataviz/chart#methods-imageDataURL) and [`svg`](/api/dataviz/chart#methods-svg) methods.

For more information on how to add only the functionalities you want to your project, refer to the [articles on the JavaScript dependencies]({% slug javascript_prerequisites_kendoui_installation %}) and the [Custom Download Builder](http://www.telerik.com/download/custom-download) (requires login).

## Known Limitations

* SVG&mdash;Impose no rendering limitations.
* Canvas&mdash;Dashed lines are not supported in Internet Explorer.

## See Also

* [Themes and Appearance of the Kendo UI Widgets]({% slug themesandappearnce_kendoui_desktopwidgets %})
* [Responsive Web Design]({% slug responsivewebdesign_integration_kendoui %})
* [Web Font Icons]({% slug webfonticons_kendoui_desktopwidgets %})
* [How to Change Themes on the Client]({% slug howto_changethemes_ontheclient_styleskendoui %})
* [Sass ThemeBuilder Overview]({% slug sassbasedthemes_kendoui %}#sass-theme-builder)
* [Less ThemeBuilder Overview]({% slug themesandappearnce_kendoui_desktopwidgets %}#less-theme-builder)
* [Themes and Appearance of the Kendo UI Hybrid Widgets]({% slug forms_hybridkendoui %})
