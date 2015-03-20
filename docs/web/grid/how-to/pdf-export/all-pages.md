---
title: Export All Pages
page_title: Export a PDF including all Grid pages
description: This article demonstrates how to export the full Grid content in a PDF file
---

# Export a PDF including all Grid pages

This example demonstrates how to export the full Grid content in a PDF file.

This includes all data pages as well as scrolled content.
The content will be scaled to fit in the specified page size.

The full code of the example follows with additional discussion in the comments.

> This snippet requires Kendo UI Q3'14 SP1 (2014.3.1314) or newer

## Example - Full Grid PDF Export
```html
<div id="grid"></div>
<script>
// Import Drawing API namespaces
var draw = kendo.drawing;
var geom = kendo.geometry;

function fullExport(e) {
    // Stop the built-in export
    e.preventDefault();

    // Clone the Grid HTML offscreen
    var wrapper = this.wrapper;
    var shadow = $("<div class='k-export-wrap'>")
                 .css("width", wrapper.width());

    // Prepend the export container
    wrapper.before(shadow);

    // This group will be our document containing all pages
    var doc = new draw.Group();

    this.dataSource.bind("change", function handler() {
        var dataSource = this;

        // Copy the current page view to the export container
        shadow.empty().append(wrapper.clone());

        draw.drawDOM(shadow)
            .done(function(group) {
                // Format the current page
                var pageNum = dataSource.page();
                var totalPages = dataSource.totalPages();

                var page = formatPage(group, {
                    page: pageNum,
                    total: totalPages
                });

                doc.append(page);

                if (pageNum < totalPages) {
                    // Move to the next page
                    dataSource.page(pageNum + 1);
                } else {
                    // Last page processed reached
                    dataSource.unbind("change", handler);
                    shadow.remove();
                    saveReport(doc);
                }
            });
    });

    // Read the first page
    this.dataSource.fetch();
}

function saveReport(doc) {
    draw.exportPDF(doc, {
        paperSize: "A4",
        landscape: true,
        margin    : "1cm",
        multiPage : true
    }).done(function(data) {
        // Save the PDF file
        kendo.saveAs({
            dataURI: data,
            fileName: "Report.pdf",
            proxyURL: "http://demos.telerik.com/kendo-ui/service/export"
        });
    });
}

$("#grid").kendoGrid({
    pdfExport: fullExport,
    toolbar: ["pdf"],
    dataSource: {
        type: "odata",
        transport: {
            read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
        },
        schema: {
            model: {
                fields: {
                    OrderID: { type: "number" },
                    Freight: { type: "number" },
                    ShipName: { type: "string" },
                    OrderDate: { type: "date" },
                    ShipCity: { type: "string" }
                }
            }
        },
        pageSize: 30,
        serverPaging: true,
    },
    pageable: true,
    scrollable: true,
    height: 550,
    columns: [
        {
            field:"OrderID",
            filterable: false
        },
        "Freight",
        {
            field: "OrderDate",
            title: "Order Date",
            format: "{0:MM/dd/yyyy}"
        }, {
            field: "ShipName",
            title: "Ship Name"
        }, {
            field: "ShipCity",
            title: "Ship City"
        }
    ]
});

// PDF Output is fixed at 72 DPI
// This gives us a fixed mm/px ratio
var MM_TO_PX = 2.8347;

// A4 Sheet with 1 cm borders, landscape
var PAPER_RECT = new geom.Rect(
    [0, 0], [(297 - 20) * MM_TO_PX, (210 - 20) * MM_TO_PX]
);

function formatPage(content) {
    // Fit the content in the available space
    content = fit(content, PAPER_RECT)

    // Center the content
    content = hAlign(content, PAPER_RECT, "center")

    // Add a frame to fix the page size
    var frame = draw.Path.fromRect(PAPER_RECT, {
        stroke: null
    });

    var page = new draw.Group();
    page.append(frame, content);

    return page;
}

// Transform the content to fit into the specified size
function fit(content, rect) {
    var bbox = content.clippedBBox();
    var size = rect.size;
    var scale = Math.min(
        size.width / bbox.width(),
        size.height / bbox.height()
    );

    // We apply the actual transformation on a wrapper
    // so its applied before any existing transformations
    var wrap = new draw.Group({
        transform: geom.transform().scale(scale, scale)
    });

    wrap.append(content);

    return wrap;
}

// Horizontally aligns an element within a rectangle
// Supported aligments are "left", "center" and "right"
function hAlign(element, rect, pos) {
    var offset = 0;
    var anchor = "topLeft";

    if (pos === "center") {
        anchor = "center";
    } else if (pos === "right") {
        anchor = "topRight";
    }

    var offset = rect[anchor]().x - element.clippedBBox()[anchor]().x;

    // We apply the actual transformation on a wrapper
    // so its applied before any existing transformations
    var wrap = new draw.Group({
        transform: geom.transform().translate(offset, 0)
    });

    wrap.append(element);

    return wrap;
}
</script>

<!-- Load Pako ZLIB library to enable PDF compression -->
<script src="http://cdn.kendostatic.com/2014.3.1314/js/pako_deflate.min.js"></script>

<style scoped>
    /*
        We'll use the DejaVu Sans font for both display and embedding in the PDF file.
        The standard PDF fonts have no support for Unicode characters.
    */
    .k-grid {
        font-family: "DejaVu Sans", "Arial", sans-serif;
    }

    /* Off-screen container used during export */
    .k-export-wrap {
        position: absolute;
        overflow: visible;
        left: -5000px;
    }

    .k-export-wrap .k-grid {
        float: left;
    }

    /* Remove all sizes and scrolling */
    .k-export-wrap .k-grid,
    .k-export-wrap .k-grid-content {
        height: auto !important;
        overflow: visible;
    }

    /* Remove empty space reserved above the scrollbar */
    .k-export-wrap .k-grid-header {
        padding-right: 0 !important;
    }

    /* Hide the Grid header during export */
    .k-export-wrap .k-grid-toolbar
    {
        display: none;
    }
</style>
```
