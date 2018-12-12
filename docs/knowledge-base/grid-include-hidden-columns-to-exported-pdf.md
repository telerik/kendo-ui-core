---
title: Include the Hidden Columns in the Exported PDF File
description: An example on how to include the hidden columns in the exported PDF file in a Kendo UI Grid.
type: how-to
page_title: Export Hidden Columns in PDF | Kendo UI Grid
slug: grid-include-hidden-columns-to-exported-pdf
tags: grid, export, pdf, iclude, hidden, column, columns, exported, file, add, insert
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

How can I include the hidden columns in the exported PDF file of the Grid?

## Solution

1. Show the hidden columns by using the [`showColumn`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/showcolumn) method within the [`pdfExport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/pdfexport) event handler.
1. When the PDF export is done, hide the columns that are not intended to be visible by using the [`hideColumn`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/hidecolumn) method.

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
              title: "Contact Title",
              hidden:true
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
              e.sender.showColumn(1);
              e.preventDefault();
              exportFlag = true;

              e.sender.saveAsPDF().then(function(){
                e.sender.hideColumn(1);
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
