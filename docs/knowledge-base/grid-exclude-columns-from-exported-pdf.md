---
title: Exclude Certain Columns from the Exported PDF File
description: An example on how to exclude certain columns from the exported PDF file when working with the Kendo UI Grid.
type: how-to
page_title: Exclude Certain Columns from the Exported PDF File | Kendo UI Grid
slug: grid-exclude-columns-from-exported-pdf
tags: grid, export, pdf, exclude, remove, column, columns, exported, file,
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with version 2018.1.221</td>
 </tr>
</table>

## Description

How can I exclude certain columns from the exported PDF file in a Kendo UI Grid?

## Solution

### Option 1 - Use the k-pdf-export class and CSS

To hide a grid column only during the PDF export, you can just use a CSS rule and reduce the width of the target column to 0. This is because the Kendo UI Drawing API adds [`the "k-pdf-export" class`](/framework/drawing/drawing-dom#the) on all elements on the page and you can target specific elements easily this way:

```
<style>
  .k-pdf-export colgroup > col:nth-child(4) {
    width:0; /* hides only the 4th column during PDF export */
  }
</style>
```

###### Example - hide the last column during PDF Export only with CSS

```dojo
<style>
      .page-template {
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
        text-align: center;
        font-size: 18px;
      }

      .page-template .footer {
        position: absolute;
        bottom: 30px;
        left: 30px;
        right: 30px;
      }

      .k-pdf-export colgroup > col:nth-child(4) {
        width:0;
      }
    </style>
  </head>
  <body>

    <!-- Load Pako Deflate library to enable PDF compression -->
    <script src="https://kendo.cdn.telerik.com/2019.1.220/js/pako_deflate.min.js"></script>

    <div id="grid"></div>
    <script type="x/kendo-template" id="page-template">
        <div class="page-template">
            <div class="header">
                Kendo UI Grid Export
      </div>
          <div class="footer">
              <div style="float: right">Page #: pageNum # of #: totalPages #</div>
      </div>
      </div>
    </script>

    <script>
      $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
          fileName: "Kendo UI Grid Export.pdf",
          paperSize: "A4",
          allPages: true,
          avoidLinks: true,
          margin: { top: "1.5cm", right: "0.5cm", bottom: "1cm", left: "0.5cm" },
          landscape: true,
          repeatHeaders: true,
          template: $("#page-template").html(),
          scale: 0.6
        },
        dataSource: {
          type: "odata",
          transport: {
            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
          },
          pageSize: 10
        },
        sortable: true,
        scrollable: true,
        pageable: true,
        filterable: true,
        columnMenu: true,
        columns: [
          { field: "ProductName", title: "Product Name1" },
          { field: "UnitsOnOrder", title: "Units On Order1" },
          { field: "UnitsInStock", title: "Units In Stock1" },
          { command: "custom" }
        ]
      });
    </script>
```

### Option 2 - Use the showColum() and hideColumn() grid methods

1. Hide the columns by using the [`hideColumn`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/hidecolumn) method within the [`pdfExport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/pdfexport) event handler.
1. When the export is done, display the hidden column by using the [`showColumn`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/showcolumn) method.

```dojo
    <div id="example">
      <div id="grid"></div>
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
            dataSource: {
              type: "odata",
              transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
              },
              pageSize: 20
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

          var exportFlag = false;

          $("#grid").data("kendoGrid").bind("pdfExport", function (e) {
            if (!exportFlag) {
              e.sender.hideColumn(1);
              e.preventDefault();
              exportFlag = true;

              e.sender.saveAsPDF().then(function(){
                e.sender.showColumn(1);
                exportFlag = false;
              });

            }
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
