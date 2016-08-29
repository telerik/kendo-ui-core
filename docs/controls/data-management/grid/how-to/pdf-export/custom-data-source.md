---
title: Customize Data Source
page_title: Customize Data Source | Kendo UI Grid
description: "Learn how to customize the data source options of a Kendo UI Grid for PDF export."
slug: howto_customize_data_source_pdf_grid
---

# Customize Data Source

The PDF Export functionality normally uses the configured Data Source to fetch all data pages.

If this behavior is not desirable, customize the Data Source by using a different Data Source instance during the export in PDF.

The example below demonstrates how to switch to client paging during PDF export.

###### Example

```html
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
      "DejaVu Sans"             : "http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans.ttf",
      "DejaVu Sans|Bold"        : "http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
      "DejaVu Sans|Bold|Italic" : "http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
      "DejaVu Sans|Italic"      : "http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf"
    });
  </script>

  <!-- Load Pako ZLIB library to enable PDF compression -->
  <script src="http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/pako_deflate.min.js"></script>

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

Other articles on the Kendo UI Grid and how-to examples related to its export in PDF:

* [JavaScript API Reference: kendo.drawing](/api/javascript/drawing)
* [JavaScript API Reference: kendo.geometry](/api/javascript/geometry)
* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [How to Customize Page Layout]({% slug howto_customize_page_layout_pdf_grid %})
* [How to Export All Pages]({% slug howto_export_all_pagesto_pdf_grid %})
* [How to Export All Pages and Full Page Content]({% slug howto_export_allpagesand_full_page_content_pdf_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_create_custom_editors_grid %}).
