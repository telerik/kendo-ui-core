---
title: Export ListView to Excel
page_title: Export ListView to Excel - Kendo UI for jQuery ListView
description: "Learn how to export the Kendo UI ListView for jQuery to Excel."
slug: export_listview_to_excel
tags: listview, export, excel
component: listview
type: how-to
ticketid: 1619053
res_type: kb
---

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ListView for jQuery</td>
 </tr>
</table>

## Description

How can I implement a functionality for exporting the ListView component to Excel?

## Solution

* Create a global array that will store the header structure of the rows based on the ListView data.

```js
var rows = [{
    cells: [
      // The first cell.
      { value: "ProductID" },
      // The second cell.
      { value: "UnitPrice" },
      // The third cell.
      { value: "ProductName" }
    ]
}];
```

* Add a new external button and handle its [`click`] event. In the event handler, get an instance of the ListView component and access its DataSource. Then, fetch the remote data and by using the callback of the [`fetch()`](/api/javascript/data/datasource/methods/fetch) method, loop through the items, and push the data to the rows array.

```js
 $('#btn').on('click', function(){
    var listViewDS = $("#listView").data("kendoListView").dataSource;

    listViewDS.fetch(function () {
      var data = this.data();
      for (var i = 0; i < data.length; i++) {
        // Push single row for every record.
        rows.push({
          cells: [
            { value: data[i].ProductID },
            { value: data[i].ProductName },
            { value: data[i].UnitPrice }
          ]
        });
      }
    });
})
```

* Instantiate a kendo.ooxml.Workbook component. The workbook has an array of sheets, where you can set their width and title, and set the rows property to the already created rows array. After that, call the [`toDataURL()`](/api/javascript/ooxml/workbook/methods/todataurl) method of the workbook to get the output Excel file as a data URI. 

```js
var workbook = new kendo.ooxml.Workbook({
    sheets: [
      {
        columns: [
          // Column settings (width).
          { autoWidth: true },
          { autoWidth: true },
          { autoWidth: true }
        ],
        // The title of the sheet.
        title: "Products",
        // The rows of the sheet.
        rows: rows
      }
    ]
});
// Save the file as an Excel file with the xlsx extension.
kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Test.xlsx" });
```
The following example demonstrates a full implementation of the described approach:

```dojo
<div id="example">
    <button id="btn">Export</button>
    <div id="listView"></div>

    <script type="text/x-kendo-template" id="template">
        <div class="product">
            <img src="../content/web/foods/#= ProductID #.jpg" alt="Kendo UI for jQuery ListView #: ProductName #" />
            <h3>#:ProductName#</h3>
            <p>#:kendo.toString(UnitPrice, "c")#</p>
        </div>
    </script>

    <script>
        $(function () {
            var rows = [{
                cells: [
                    // The first cell.
                    { value: "ProductID" },              
                    // The second cell.
                    { value: "ProductName" },
                    // The third cell.
                    { value: "UnitPrice" }
                ]
            }];

            $('#btn').on('click', function(){
                var listViewDS = $("#listView").data("kendoListView").dataSource;

                listViewDS.fetch(function () {
                    var data = this.data();
                    for (var i = 0; i < data.length; i++) {
                    // Push single row for every record.
                        rows.push({
                            cells: [
                              { value: data[i].ProductID },
                              { value: data[i].ProductName },
                              { value: data[i].UnitPrice }
                            ]
                        });
                    }
                });

                var workbook = new kendo.ooxml.Workbook({
                    sheets: [{
                        columns: [
                          // Column settings (width).
                          { autoWidth: true },
                          { autoWidth: true },
                          { autoWidth: true }
                        ],
                        // The title of the sheet.
                        title: "Products",
                        // The rows of the sheet.
                        rows: rows
                    }]
                });

                // Save the file as an Excel file with the xlsx extension.
                kendo.saveAs({ dataURI: workbook.toDataURL(), fileName: "Test.xlsx" });
            })

            $("#listView").kendoListView({
              dataSource: {            
                transport: {
                    read: {
                        url: "https://demos.telerik.com/kendo-ui/service/Products",
                        dataType: "jsonp"
                    }
                },
                pageSize: 21
              },
              template: kendo.template($("#template").html()),
              pageable: true
            });
        });
    </script>

    <style>
        #listView {
          padding: 10px 5px;
          margin-bottom: -1px;
          min-height: 510px;
        }

        .k-listview-content {
          overflow: hidden;
        }

        .product {
          float: left;
          position: relative;
          width: 111px;
          height: 170px;
          margin: 0 5px;
          padding: 0;
        }

        .product img {
          width: 110px;
          height: 110px;
        }

        .product h3 {
          margin: 0;
          padding: 3px 5px 0 0;
          max-width: 96px;
          overflow: hidden;
          line-height: 1.1em;
          font-size: .9em;
          font-weight: normal;
          text-transform: uppercase;
          color: #999;
        }

        .product p {
          visibility: hidden;
        }

        .product:hover p {
          visibility: visible;
          position: absolute;
          width: 110px;
          height: 110px;
          top: 0;
          margin: 0;
          padding: 0;
          line-height: 110px;
          vertical-align: middle;
          text-align: center;
          color: #fff;
          background-color: rgba(0,0,0,0.75);
          transition: background .2s linear, color .2s linear;
          -moz-transition: background .2s linear, color .2s linear;
          -webkit-transition: background .2s linear, color .2s linear;
          -o-transition: background .2s linear, color .2s linear;
        }

        .k-listview:after {
          content: ".";
          display: block;
          height: 0;
          clear: both;
          visibility: hidden;
        }
    </style>
</div>
```

## See Also
* [JavaScript API Reference of the ListView](/api/javascript/ui/listview)
* [JavaScript API Reference of the Workbook](/api/javascript/ooxml/workbook)


