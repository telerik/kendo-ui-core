---
title: Exporting Drawings to Images
page_title: Exporting Drawings to Images | Kendo UI Drawing Library
description: "Export drawings to images by using the Kendo UI Drawing library."
slug: exportpng_kendoui_drawingapi
position: 5
---

# Exporting Drawings to Images

The Drawing library supports the export of drawings to bitmap images in a PNG file format.

```dojo
    <button class="k-button k-primary" onclick="exportImg()">Export Image</button>
    <script>
        var draw = kendo.drawing;
        var geom = kendo.geometry;

        var rect = new geom.Rect([5, 5], [240, 240]);
        var path = draw.Path.fromRect(rect).stroke("red", 5);

        var root = new draw.Group();
        root.append(path);

        function exportImg(){
        	draw.exportImage(root, { width: "250px", height: "250px" }).done(function(data) {
            	kendo.saveAs({
                	dataURI: data,
                	fileName: "frame.png"
            	});
        	});
        }
    </script>
```

## See Also

* [Drawing Basic Shapes]({% slug basicshapes_drawingapi %})
* [Drawing DOM Elements]({% slug drawingofhtmlelements_drawingapi %})
* [Exporting Drawings to PDF]({% slug pdfderawingexport_drawingapi %})
* [Exporting Drawings to SVG]({% slug exportpng_kendoui_drawingapi %})
* [Supported Browsers and Known Limitations for Kendo UI Drawing API]({% slug supportedbrowsers_drawingapi %})
