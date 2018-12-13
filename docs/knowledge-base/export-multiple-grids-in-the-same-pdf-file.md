---
title: Export Multiple Grids in the Same PDF File
description: An example on how to export multiple Kendo UI Grids in the same PDF file.
type: how-to
page_title: Export Multiple Grids in the Same PDF File | Kendo UI Grid
slug: export-multiple-grids-in-the-same-pdf-file
tags: kendo ui, mvc, pdf, multiple, grids, same, file, grid
ticketid: 1131735
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
   <td>Created with version 2017.3.913</td>
  </tr>
</table>

## Description

How can I export many Grids in the same PDF file?

## Solution

1. Export one of the Grids by using the `_drawPDF` function.
1. In the callback of the promise, export the other Grids.
1. Append the result to the export of the initially exported Grid.

```dojo
        <div id="example">


            <a id='export' class='k-button'>Export both grids </a>

            <div id="grid"></div>
            <div id="grid2"></div>

            <script src="https://kendo.cdn.telerik.com/2017.3.913/js/pako_deflate.min.js"></script>

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

                $("#grid2").kendoGrid({
                    pdf: {
                    allPages: true,
                    avoidLinks: true,
                    paperSize: "A4",
                    margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" },
                    landscape: true,
                    repeatHeaders: true,
                    template: $("#page-template").html(),
                    scale: 0.7
                    },
                    dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
                    },
                    schema:{
                        model: {
                        fields: {
                            UnitsInStock: { type: "number" },
                            ProductName: { type: "string" },
                            UnitPrice: { type: "number" },
                            UnitsOnOrder: { type: "number" },
                            UnitsInStock: { type: "number" }
                        }
                        }
                    },
                    pageSize: 7
                    },
                    pageable: true,
                    groupable: true,
                    filterable: true,
                    columnMenu: true,
                    reorderable: true,
                    resizable: true,
                    columns: [
                    { width: 300, field: "ProductName", title: "Product Name" },
                    { width: 300, field: "UnitPrice", title: "Unit Price"},
                    { width: 300, field: "UnitsOnOrder", title: "Units On Order"},
                    { width: 300, field: "UnitsInStock", title: "Units In Stock" }
                    ]
                });

                $('#export').on('click', function(){
                    var grid1 = $('#grid').data('kendoGrid');
                    var grid2 = $('#grid2').data('kendoGrid');

                    var progress = $.Deferred();

                    grid1._drawPDF(progress)
                    .then(function(firstGrid) {
                    grid2._drawPDF(progress)
                        .then(function(secondGrid){
                        secondGrid.children.forEach(function(x){
                        firstGrid.children.push(x);
                        })
                        return kendo.drawing.exportPDF(firstGrid, { multiPage: true });

                    }).done(function(dataURI) {
                        kendo.saveAs({
                        dataURI: dataURI,
                        fileName: "test.pdf"
                        });
                        progress.resolve();
                    })           

                    })

                })
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
