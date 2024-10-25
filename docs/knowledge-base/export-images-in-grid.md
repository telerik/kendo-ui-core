---
title: Export images in grid
page_title: Export images in grid - Kendo UI for jQuery Data Grid
description: "Learn how to include images in the exported xlsx file."
slug: export-images-in-grid
tags: grid, images, excel, export
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

I have a Grid that contains images. I need to enable the application users to export documents from Grid. How can I customize the exported Excel document so that it includes the images?

## Solution

To include the images in the exported document, configure the [`drawings`](/api/javascript/ooxml/workbook/configuration/sheets.drawings) option to include the loaded images and additional settings for their position. For more information on how Excel documents works, refer to the [introductory help topic on Excel](/framework/excel/introduction#create-excel-document).

The following example demonstrates how to customize the Excel document so that it includes the images.

Note that the path to the images points to another domain. Since retrieving the images from another domain will be blocked by CORS, the example should be run locally, and the images should be present in the application to avoid being blocked by CORS:

```dojo
<base href="https://demos.telerik.com/kendo-ui/grid/basic-usage">
<script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>
<div id="example">
    <div id="grid"></div>

    <script>
        function loadBinary(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                callback(xhr.response, xhr.getResponseHeader("Content-Type"));
            };
            xhr.onerror = function () {
                callback(null);
            };
            xhr.open("GET", url);
            xhr.responseType = "arraybuffer";
            xhr.send();
        }
        $(document).ready(function () {
            $("#grid").kendoGrid({
                toolbar: ["excel"],
                excel: {
                    fileName: "Kendo UI Grid Export.xlsx",
                    proxyURL: "//demos.telerik.com/kendo-ui/service/export",
                    filterable: true
                },
                excelExport: function (e) {
                    e.preventDefault();
                    var sheet = e.workbook.sheets[0];
                    var images = {};
                    var drawings = [];
                    var id;

                    for (var i = 0; i < sheet.rows.length; i++) {
                        if (sheet.rows[i].type == "data" && sheet.rows[i].cells[0].value) {
                            // set the height of the row to accommodate the image
                            sheet.rows[i].height = 90;
                            id = sheet.rows[i].cells[0].value;
                            images[id] = `https://demos.telerik.com/kendo-ui/content/web/Customers/${id}.jpg`;
                            sheet.rows[i].cells[0].value = "";

                            drawings.push({
                                topLeftCell: "A" + (i+1),
                                width: 100,
                                height: 90,
                                image: id,
                                offsetX: 0,
                                offsetY: 0,
                            });
                        }
                    }

                    // Force loading of the images
                    Object.keys(images).forEach(function (id) {
                        var url = images[id];

                        loadBinary(url, function (data, contentType) {
                            images[id] = { type: contentType, data: data };
                        });
                    });

                    // set the width of the column so it can accommodate the image
                    sheet.columns[0].width = 100;

                    // in a real application the setTimout should be replaced with a promise
                    // that ensures that all the images are loaded
                    setTimeout(function () {
                        var workbook = new kendo.ooxml.Workbook({
                            images: images,
                            sheets: [{
                                columns: sheet.columns,
                                drawings: drawings,
                                rows: sheet.rows
                            }]
                        });

                        kendo.saveAs({
                            dataURI: workbook.toBlob(),
                            fileName: "Test.xlsx"
                        });
                    }, 2000);
                },
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                    },
                    schema: {
                        model: {
                            fields: {
                                OrderID: { type: "number" },
                                ShipCountry: { type: "string" },
                              	CustomerID: { type: "string" },
                              	ContactName: { type: "string" },
                                ShipName: { type: "string" },
                                ShipCity: { type: "string" },
                                ShipAddress: { type: "string" }
                            }
                        }
                    },
                    pageSize: 30
                },
                height: 540,
                pageable: true,
                columns: [{
                    template: "<div class='customer-photo'" +
                    "style='background-image: url(../content/web/Customers/#:data.CustomerID#.jpg);'></div>",
                    field: "CustomerID",
                    title: "Contact",
                    width: 80
                }, {
                    field: "ShipCountry",
                    title: "Ship Country",
                    width: 300
                }, {
                    field: "ShipCity",
                    title: "Ship City",
                    width: 300
                }, {
                    field: "ShipName",
                    title: "Ship Name",
                    width: 300
                }, {
                    field: "ShipAddress",
                    width: 400
                }]
            });
        });
    </script>
</div>

<style type="text/css">
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

    .customer-name {
        display: inline-block;
        vertical-align: middle;
        line-height: 32px;
        padding-left: 3px;
    }
</style>
```

## See Also

* [JavaScript API Reference of the Data Grid](/api/javascript/ui/grid)
