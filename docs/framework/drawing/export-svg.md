---
title: Exporting Drawings to SVG
page_title: Exporting Drawings to SVG | Kendo UI Drawing Library
description: "Export drawings to SVG by using the Kendo UI Drawing library."
slug: exportingtosvg_drawing
position: 6
---

# Exporting Drawings to SVG

The Drawing library supports the export of drawings to a Scalable Vector Graphics (SVG) document.

The SVG format is a text-based, resolution-independent image format. It is well-suited for post-processing and archiving.

```dojo
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect([5, 5], [240, 240]);
        var path = draw.Path.fromRect(rect).stroke("red", 5);

        var root = new draw.Group();
        root.append(path);

        draw.exportSVG(root).done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "frame.svg"
            });
        });
    </script>
```

## See Also

* [Drawing Basic Shapes]({% slug basicshapes_drawingapi %})
* [Drawing DOM Elements]({% slug drawingofhtmlelements_drawingapi %})
* [Exporting Drawings to PDF]({% slug pdfderawingexport_drawingapi %})
* [Exporting Drawings to Images]({% slug exportpng_kendoui_drawingapi %})
* [Supported Browsers and Known Limitations for Kendo UI Drawing API]({% slug supportedbrowsers_drawingapi %})
