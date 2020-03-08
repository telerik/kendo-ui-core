---
title: Export Only the Selected Grid Rows to PDF
description: An example on how to export to PDF only the selected rows of a Kendo UI Grid.
type: how-to
page_title: Export the Selected Rows to PDF | Kendo UI Grid for jQuery
slug: grid-pdf-export-selected-rows-only
tags: pdf, export, grid, selected rows
ticketid: 1135051
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
  <td>Created with the 2017.3.913 version</td>
 </tr>
</table>

## Description

How can I export only the selected rows of a Kendo UI Grid to PDF?

## Solution

1. In the [`pdfExport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/pdfexport) event handler, hide the rows that are not selected by using CSS.
1. When the export promise is done, show the hidden rows.

```dojo
<div id="example">

    <div class="box wide">
        <p style="margin-bottom: 1em"><b>Important:</b></p>

        <p style="margin-bottom: 1em">
            This page loads
            <a href="https://github.com/nodeca/pako">pako zlib library</a> (pako_deflate.min.js) to enable compression in the PDF. This is highly recommended as it improves performance and rises the limit on the size of the content that can be exported.
        </p>

        <p>
            The Standard PDF fonts do not include Unicode support. In order for the output to match what you see in the browser you must provide source files for TrueType fonts for embedding. Please read the documentation about
            <a href="https://docs.telerik.com/kendo-ui/framework/drawing/drawing-dom#custom-fonts-and-pdf">custom fonts</a> and
            <a href="https://docs.telerik.com/kendo-ui/framework/drawing/pdf-output#using-custom-fonts">drawing</a>.
        </p>
    </div>

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
            "DejaVu Sans": "https://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans.ttf",
            "DejaVu Sans|Bold": "https://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans-Bold.ttf",
            "DejaVu Sans|Bold|Italic": "https://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
            "DejaVu Sans|Italic": "https://kendo.cdn.telerik.com/2016.2.607/styles/fonts/DejaVu/DejaVuSans-Oblique.ttf",
            "WebComponentsIcons": "https://kendo.cdn.telerik.com/2017.1.223/styles/fonts/glyphs/WebComponentsIcons.ttf"
        });
    </script>

    <!-- Load Pako ZLIB library to enable PDF compression -->
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
        $(document).ready(function() {
            $("#grid").kendoGrid({
                toolbar: ["pdf"],
                pdf: {
                    allPages: false,
                    avoidLinks: true,
                    paperSize: "A4",
                    margin: {
                        top: "2cm",
                        left: "1cm",
                        right: "1cm",
                        bottom: "1cm"
                    },
                    landscape: true,
                    repeatHeaders: true,
                    template: $("#page-template").html(),
                    scale: 0.8
                },
                pdfExport: function(e) {
                    var rows = e.sender.table[0].rows;

                    for (var i = 0; i < rows.length; i++) {
                        var row = rows[i];
                        if (!$(row).hasClass("k-state-selected")) {
                            $(row).addClass("hiddenRow")
                        };
                    };
                    e.promise
                        .done(function() {
                            $(".hiddenRow").each(function() {
                                $(this).parents("tr").removeClass("hiddenRow");
                            });
                        });
                },
                selectable: "multiple row",
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
                        "style='background-image: url(https://demos.telerik.com/kendo-ui/content/web/Customers/#:data.CustomerID#.jpg);'></div>" +
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
        .hiddenRow {
            display: none;
        }

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
            box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(0, 0, 0, .2);
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
