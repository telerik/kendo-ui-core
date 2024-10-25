---
title: Export Options
page_title: jQuery Sankey Diagram Documentation - Export
description: "Learn how to export the Kendo UI for the jQuery Sankey Diagram to either an Image, SVG, or a PDF and customize the export."
slug: export_kendoui_sankeychart
position: 4
---

# Export Options

The KendoReact Sankey diagram allows you to export its contents as an Image, SVG, or PDF file.

Regardless of the required export format, you can use the [`exportVisual`](/api/javascript/dataviz/ui/sankey/methods/exportVisual) method to export the visuals of the Sankey component. The component exports the visuals as an Image, SVG, or PDF by using the [Drawing]({% slug overview_kendoui_drawingapi %}) library and saves them using the [`saveAs`](/api/javascript/kendo/methods/saveas) method.

## Export to Image

Export the Sankey visual as an Image by using the [`exportImage`](/api/javascript/dataviz/ui/sankey/methods/exportImage) method and save it using the [`saveAs`](/api/javascript/kendo/methods/saveas) method.

By default, the exported image is of the same size as the Sankey DOM element. If required, you can export the file to a different resolution. If you change the image size, the image quality will not be affected because the rendering of the Sankey chart is based on vector graphics.

## Export to SVG

Export the Sankey visual as an SVG by using the [`exportSVG`](/api/javascript/dataviz/ui/sankey/methods/exportSVG) method and save it using the [`saveAs`](/api/javascript/kendo/methods/saveas) method.


## Export to PDF

Export the Sankey visual as a PDF by using the [`exportPDF`](/api/javascript/dataviz/ui/sankey/methods/exportPDF) method and save it using the [`saveAs`](/api/javascript/kendo/methods/saveas) method.


### Fitting to Paper Size

If the rendered Sankey Diagram is bigger than the exported PDF paper size, then the chart is clipped. To avoid this behavior, either:

* Set the `exportVisual` size, or
* Scale the drawing element, which is returned by the `exportVisual` method.

## Customize the Export

You can customize the export using the [`exportVisual`](/api/javascript/dataviz/ui/sankey/methods/exportVisual) method. The following options are available:
- `width`&mdash;Set the width of the exported visual.
- `height`&mdash;Set the height of the exported visual.
- `options`&mdash;Sankey options to be used for the exported visual.

```dojo
    <div id="sankey" style="width: 500px; height: 200px;"></div>
    <script>
        $("#sankey").kendoSankey({
            data: {
                nodes: [
                    { id: 1, label: { text: "Node 1" } },
                    { id: 2, label: { text: "Node 2" } },
                    { id: 3, label: { text: "Node 3" } }
                ],
                links: [
                    { sourceId: 1, targetId: 3, value: 2 },
                    { sourceId: 2, targetId: 3, value: 1 }
                ]
            }
        });

        var sankey = $("#sankey").getKendoSankey();
        var visual = sankey.exportVisual({ width: 800, height: 600 });
        console.log(visual);
    </script>
```

## See Also

* [Sankey Export(Demo)](https://demos.telerik.com/kendo-ui/sankey-charts/export)
* [JavaScript API Reference of the Sankey](/api/javascript/dataviz/ui/sankey)
