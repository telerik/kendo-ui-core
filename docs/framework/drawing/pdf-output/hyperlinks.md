---
title: Disabling Hyperlinks
page_title: Disabling Hyperlinks | Kendo UI Drawing Library
description: "Prevent the default behavior and disable hyperlinks when you export content in PDF with the Kendo UI Drawing library."
previous_url: /framework/drawing/drawing-dom#hyperlinks
slug: hyperlinks_drawing
position: 8
---

# Disabling Hyperlinks

By default, the [`drawDOM`](/api/javascript/drawing/methods/drawdom) method creates clickable hyperlinks in the generated PDF document.

You can disable this behavior with the `avoidLinks` option.

```dojo
    <div id="content">
        This is <a href="https://www.telerik.com">a non-clickable link</a>.
    </div>
    <script>
        var draw = kendo.drawing;

        draw.drawDOM($("#content"), {
            avoidLinks: true,
            paperSize: "A4"
        })
        .then(function(root) {
            return draw.exportPDF(root);
        })
        .done(function(data) {
            kendo.saveAs({
                dataURI: data,
                fileName: "avoid-links.pdf"
            });
        });
    </script>
```

## See Also

* [Exporting Drawings to PDF]({% slug pdfderawingexport_drawingapi %})
* [PDF Output]({% slug pdfderawingexport_drawingapi %})
