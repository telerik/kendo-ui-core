---
title: Add Page Breaks by Group When Exporting the Grid to PDF
description: An example on how to add a new page for each group when exporting the Kendo UI Grid to PDF.
type: how-to
page_title: Add New Page for Each Group When Exporting the Grid to PDF | Kendo UI Grid for jQuery
previous_url: /knowledge-base/how-to-page-break-by-group-grid-pdf-export
slug: page-break-by-group-grid-pdf-export
tags: kendo, grid, pdf, export, group, page, break
ticketid: 1120369
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>

## Description

I am exporting a Kendo UI Grid to PDF. How can I add a page break by group, which will change depending on what the user selects? 

## Solution

To get the Kendo UI PDF Export to break at each group, use the [`forcePageBreak`]({% slug multipagecontent_drawing %}#manual-page-breaking) selector in the PDF options of the Grid:

```
pdf: { 
  forcePageBreak: ".k-grouping-row:not(:first-child)"
}
```

```dojo
    <div id="example">
      <div id="grid"></div>

      <style>
        /*
        Use the DejaVu Sans font for display and embedding in the PDF file.
        The standard PDF fonts have no support for Unicode characters.
        */
        .k-grid {
          font-family: "DejaVu Sans", "Arial", sans-serif;
        }
      </style>
      <script>
        /*
            This demo renders the grid in "DejaVu Sans" font family, which is
            declared in kendo.common.css. It also declares the paths to the
            fonts below using <tt>kendo.pdf.defineFont</tt>, because the
            stylesheet is hosted on a different domain.
        */
        kendo.pdf.defineFont({
          "DejaVu Sans"             : "https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans.ttf",
          "DejaVu Sans|Bold"        : "https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
          "DejaVu Sans|Bold|Italic" : "https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
          "DejaVu Sans|Italic"      : "https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
          "WebComponentsIcons"      : "https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/glyphs/WebComponentsIcons.ttf"
        });
      </script>

      <!-- Load Pako ZLIB library to enable PDF compression -->
      <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/pako_deflate.min.js"></script>

      <script type="x/kendo-template" id="page-template">
      <div class="page-template">
        <div class="header">
          <div style="float: right">Page #: pageNum # of #: totalPages #</div>
          Multi-page grid with automatic page breaking
        </div>
        <div class="watermark">KENDO UI</div>
        <div class="footer">
          Page #: pageNum # of #: totalPages #
        </div>
        </div>
      </script>

      <script>
        $(document).ready(function () {
          $("#grid").kendoGrid({
            toolbar: ["pdf"],
            groupable:true,
            pdf: {
              forcePageBreak: ".k-grouping-row:not(:first-child)",
              allPages: true,
              avoidLinks: true,
              paperSize: "A4",
              margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
              landscape: true,
              repeatHeaders: true,
              template: $("#page-template").html(),
              scale: 0.8
            },
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
              },
              pageSize: 91,
              group:{field:"Country"}
            },
            height: 550,
            sortable: true,
            pageable: {
              refresh: true,
              pageSizes: true,
              buttonCount: 5
            },
            columns: [{
              template: "<div class='customer-photo'" +
              "style='background-image: url(../content/web/Customers/#:data.CustomerID#.jpg);'></div>" +
              "<div class='customer-name'>#: ContactName #</div>",
              field: "ContactName",
              title: "Contact Name",
              width: 240
            }, {
              field: "ContactTitle",
              title: "Contact Title"
            }, {
              field: "CompanyName",
              title: "Company Name"
            }, {
              field: "Country",
              width: 150
            }]
          });
        });
      </script>

      <style>
        /* Page Template for the exported PDF */
        .page-template {
          font-family: "DejaVu Sans", "Arial", sans-serif;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
        .page-template .header {
          position: absolute;
          top: 30px;
          left: 30px;
          right: 30px;
          border-bottom: 1px solid #888;
          color: #888;
        }
        .page-template .footer {
          position: absolute;
          bottom: 30px;
          left: 30px;
          right: 30px;
          border-top: 1px solid #888;
          text-align: center;
          color: #888;
        }
        .page-template .watermark {
          font-weight: bold;
          font-size: 400%;
          text-align: center;
          margin-top: 30%;
          color: #aaaaaa;
          opacity: 0.1;
          transform: rotate(-35deg) scale(1.7, 1.5);
        }

        /* Content styling */
        .customer-photo {
          display: inline-block;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-size: 32px 35px;
          background-position: center center;
          vertical-align: middle;
          line-height: 32px;
          box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(0,0,0,.2);
          margin-left: 5px;
        }
        kendo-pdf-document .customer-photo {
          border: 1px solid #dedede;
        }
        .customer-name {
          display: inline-block;
          vertical-align: middle;
          line-height: 32px;
          padding-left: 3px;
        }
      </style>
    </div>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
