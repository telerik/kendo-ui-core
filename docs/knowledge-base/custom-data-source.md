---
title: Customize Data Source
page_title: Customize Data Source | Kendo UI Grid for jQuery
description: "An example on how to customize the data source options for PDF export of the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/pdf-export/custom-data-source
slug: howto_customize_data_source_pdf_grid
tags: grid, customize, datasource
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I customize the data source options for the PDF export of the Kendo UI Grid for jQuery?

## Solution

To fetch all data pages, the PDF Export functionality uses the configured Data Source.

If your project requires you to avoid this behavior, customize the Data Source by using a different Data Source instance during the export in PDF.

The following example demonstrates how to switch to client paging during PDF export.

```dojo
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
      "DejaVu Sans|Italic"      : "https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
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
    <div class="footer">
      Page #: pageNum # of #: totalPages #
    </div>
    </div>
  </script>

  <script>
    // Main Data Source with server paging
    var dataSource = new kendo.data.DataSource({
      type: "odata",
      transport: {
        read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
      },
      pageSize: 20,
      serverPaging: true
    });

    // Export Data Source with client paging
    var dataSourceClientPaging = new kendo.data.DataSource({
      type: "odata",
      transport: {
        read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
      },
      pageSize: 20
    });

    function onPdfExport(e) {
      dataSourceClientPaging.fetch();
      e.sender.setDataSource(dataSourceClientPaging);

      e.promise.always(function() {
        e.sender.setDataSource(dataSource);
      });
    }

    $(document).ready(function () {
      $("#grid").kendoGrid({
        pdfExport: onPdfExport,
        dataSource: dataSource,
        toolbar: ["pdf"],
        pdf: {
          allPages: true,
          avoidLinks: true,
          paperSize: "A4",
          margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
          landscape: true,
          repeatHeaders: true,
          template: $("#page-template").html(),
          scale: 0.8
        },
        height: 550,
        sortable: true,
        pageable: {
          refresh: true,
          pageSizes: true,
          buttonCount: 5
        },
        columns: [{
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
  </style>

```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
