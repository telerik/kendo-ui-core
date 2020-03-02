---
title: Page Templates
page_title: Page Templates | Kendo UI Drawing Library
description: "Use page templates when you export content in PDF with the Kendo UI Drawing library."
previous_url: /framework/drawing/drawing-dom#header-and-footer-templates
slug: templates_drawing
position: 5
---

# Page Templates

When you request multi-page output through the `forcePageBreak` or `paperSize`, you can additionally specify a page template.

This template will be inserted into each page before producing the output. You can easily position it relatively to the page with CSS. The template can be a function, or a Kendo UI template, and it receives the number of the current page (`pageNum`) and the total number of pages (`totalPages`).

```dojo
    <script type="x/kendo-template" id="page-template">
        <div class="page-template">
            <div class="header">
                <div style="float: right">Page #:pageNum# of #:totalPages#</div>
                This is a header.
            </div>
            <div class="footer">
                This is a footer.
                Page #:pageNum# of #:totalPages#
            </div>
        </div>
    </script>

    <div id="grid"></div>

    <style>
        /*
            Make sure everything in the page template is absolutely positioned.
            All positions are relative to the page container.
        */
        .page-template > * {
            position: absolute;
            left: 20px;
            right: 20px;
            font-size: 90%;
        }
        .page-template .header {
            top: 20px;
            border-bottom: 1px solid #000;
        }
        .page-template .footer {
            bottom: 20px;
            border-top: 1px solid #000;
        }

        /*
            Use the DejaVu Sans font for display and embedding in the PDF file.
            The standard PDF fonts have no support for Unicode characters.
        */
        .k-grid {
            font-family: "DejaVu Sans", "Arial", sans-serif;
            width: 400px;
        }

    </style>

    <script>
        $("#grid").kendoGrid({
            dataSource: {
                type: "odata",
                transport: {
                    read: {
                        url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
                    }
                }
            },
            scrollable: false,
            columns: [{
              title: "Name",
              field: "ProductName"
            }, {
              title: "Units",
              field: "UnitsInStock"
            }],
            dataBound: function() {
              kendo.drawing.drawDOM("#grid", {
                  paperSize: "A4",
                  margin: "3cm",
                  template: $("#page-template").html()
              }).then(function(group){
                  kendo.drawing.pdf.saveAs(group, "filename.pdf");
              });
            }
        });
    </script>

    <script>
        // Import DejaVu Sans font for embedding

        // NOTE: Only required if the Kendo UI stylesheets are loaded
        // from a different origin, e.g. cdn.kendostatic.com
        kendo.pdf.defineFont({
            "DejaVu Sans"             : "https://kendo.cdn.telerik.com{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans.ttf",
            "DejaVu Sans|Bold"        : "https://kendo.cdn.telerik.com{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
            "DejaVu Sans|Bold|Italic" : "https://kendo.cdn.telerik.com{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
            "DejaVu Sans|Italic"      : "https://kendo.cdn.telerik.com{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
        });
    </script>
```

## See Also

* [Drawing Basic Shapes]({% slug basicshapes_drawingapi %})
* [Drawing DOM Elements]({% slug drawingofhtmlelements_drawingapi %})
* [Limitations and Browser Support for Kendo UI Drawing API]({% slug supportedbrowsers_drawingapi %})
