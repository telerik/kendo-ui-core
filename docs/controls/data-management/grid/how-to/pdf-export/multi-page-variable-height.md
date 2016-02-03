---
title: Export Multiple Pages with Variable Row Height
page_title: Export Multiple Pages with Variable Row Height | Kendo UI Grid Widget
description: "Learn how to export multiple pages of a Kendo UI Grid in PDF with a varying row height."
slug: howto_export_multiple_pageswith_variable_rowheight_pdf_grid
---

# Export Multiple Pages with Variable Row Height

You can split pages based on actual row hight by using external paging.

The built-in [multi-page PDF export functionality](/api/javascript/ui/grid#configuration-pdf.allPages) splits pages by record count according to the page definition at the data source level. However, this might not be desired if you have a grid with varying row-height. If so, render the grid in full and use the [page breaking](/framework/drawing/drawing-dom#automatic-page-breaking-q1-2015) functionality of the export module.

> **Important**  
> Run the demo in the Dojo to ensure fonts are properly embedded.

The example below demonstrates how to export a multi-page Grid with a variable row height. 
It also adds a header and footer using a [page template](/framework/drawing/drawing-dom#configuration-Page).

###### Example

```html
    <button id="export">Export to PDF</button>
    <div id="grid"></div>

    <script id="rowTemplate" type="text/x-kendo-tmpl">
        <tr data-uid="#: uid #">
            <td class="details">
                <span class="name">#: FirstName# #: LastName# </span>
            </td>
            <td class="employeeID">
                #: EmployeeID #
            </td>
        </tr>
    </script>

    <script id="altRowTemplate" type="text/x-kendo-tmpl">
        <tr class="k-alt" data-uid="#: uid #">
            <td class="details">
                <span class="name">#: FirstName# #: LastName# </span>
                #= EmployeeID === 4 ? "<div style='height: 200px;'></div>" : "" #
            </td>
            <td class="employeeID">
                #: EmployeeID #
            </td>
        </tr>
    </script>

    <script id="page-template" type="text/x-kendo-tmpl">
      <div class="page-template">
        <div class="header">
          <div style="float: right">Page #:pageNum# of #:totalPages#</div>
          This is a header.
        </div>
        <div class="footer">
          This is a footer.
        </div>
      </div>
    </script>

    <style>
        /*
            Use the DejaVu Sans font for display and embedding in the PDF file.
            The standard PDF fonts have no support for Unicode characters.
        */
        .k-grid {
            font-family: "DejaVu Sans", "Arial", sans-serif;
            width: 600px;
        }

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
    </style>

    <script>
        // Import DejaVu Sans font for embedding

        // NOTE: Only required if the Kendo UI stylesheets are loaded
        // from a different origin, e.g. cdn.kendostatic.com
        kendo.pdf.defineFont({
            "DejaVu Sans"             : "http://cdn.kendostatic.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans.ttf",
            "DejaVu Sans|Bold"        : "http://cdn.kendostatic.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
            "DejaVu Sans|Bold|Italic" : "http://cdn.kendostatic.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
            "DejaVu Sans|Italic"      : "http://cdn.kendostatic.com/2014.3.1314/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
        });
    </script>

    <!-- Load Pako ZLIB library to enable PDF compression -->
    <script src="http://cdn.kendostatic.com/2015.2.624/js/pako_deflate.min.js"></script>

    <script>
        $("#grid").kendoGrid({
            dataSource: {
                type: "odata",
                transport: {
                    read: {
                        url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees",
                    }
                }
            },
            columns: [
            { title: "Details", width: 350 },
            { title: "EmployeeID" }
            ],
            rowTemplate: kendo.template($("#rowTemplate").html()),
            altRowTemplate: kendo.template($("#altRowTemplate").html()),
            scrollable: false
        });

        // Export handler
        $("#export").on("click", function() {
            kendo.drawing.drawDOM("#grid", {
                paperSize: "A4",
                landscape: true,
                margin: "2cm",
                template: $("#page-template").html()
            })
            .then(function(group){
                kendo.drawing.pdf.saveAs(group, "multipage.pdf")
            });
        });
    </script>
```

## See Also

Other articles on Kendo UI Grid and how-to examples related to its export in PDF:

* [JavaScript API Reference](/api/javascript/ui/grid)
* [How to Customize Page Layout]({% slug howto_customize_page_layout_pdf_grid %})
* [How to Export All Pages]({% slug howto_export_all_pagesto_pdf_grid %})
* [How to Export All Pages and Full Page Content]({% slug howto_export_allpagesand_full_page_content_pdf_grid %})
