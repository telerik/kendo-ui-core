---
title: Capturing Sort Events in Kendo UI Spreadsheet
description: How to capture sort events in the Spreadsheet component when a user changes the sort order.
type: how-to
page_title: How to Implement Sort Event Handling in Kendo UI Spreadsheet
slug: how-to-capture-sort-events-in-kendo-ui-spreadsheet
tags: kendo-ui, spreadsheet, event-handling, sorting
res_type: kb
ticketid: 1669478
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Spreadsheet for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2024.3.1015</td>
</tr>
</tbody>
</table>

## Description
I need to trigger a sort event in the [Spreadsheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet) component when a user changes the sort order by using the built-in sort feature. Currently, the Spreadsheet does not natively provide sort or filter events.

This KB article also answers the following questions:
- How can I detect when a user sorts data in the Spreadsheet?
- What approach can I use to capture sort actions in the Spreadsheet?
- Is there a way to execute custom logic after sorting in the Spreadsheet?

## Solution
To achieve the detection of sort events in the Spreadsheet when the user changes the sort order, you can handle the click event on the filter icons. Then, bind click event listeners to the sorting actions ('Sort from A to Z' and 'Sort from Z to A') and execute the necessary logic.

The following example demonstrates how to bind event listeners for sorting actions:

```javascript
$('.k-spreadsheet-filter').on('click', function(){
    var current = this;
    $('li[data-dir="asc"]').click({param1: current}, function(ev){
         alert('Sort ASC');
    });

    $('li[data-dir="desc"]').click({param1: current}, function(ev){
         alert('Sort DESC');
    });
});
```

The above code snippet captures both ascending and descending sort actions performed by the user and demonstrates a simple alert as a placeholder for any custom logic you might want to implement.

For a practical demonstration, refer to the example below:

```dojo
<div id="spreadsheet" style="width: 100%"></div>
    <script>
      $(function() {
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core";

        var dataSource = new kendo.data.DataSource({
          transport: {
            read: onRead,
            submit: onSubmit
          },
          batch: true,               
          sort: {field: "ProductID", dir: 'desc'},
          schema: {
            model: {
              id: "ProductID",
              fields: {
                ProductID: { type: "number" },
                ProductName: { type: "string" },
                UnitPrice: { type: "number" },
                Discontinued: { type: "boolean" },
                UnitsInStock: { type: "number" }
              }
            }
          }
        });

        $("#spreadsheet").kendoSpreadsheet({   
          dataBound: function(){
            $('.k-spreadsheet-filter').on('click', function(){

              var current = this;
              $('li[data-dir="asc"]').click({param1: current}, function(ev){
                alert('Sort ASC')
              })

              $('li[data-dir="desc"]').click({param1: current}, function(ev){
                alert('Sort DESC')
              })
            })
          },
          columns: 20,
          rows: 100,
          toolbar: false,
          sheetsbar: false,               
          sheets: [{
            name: "Products",
            dataSource: dataSource,
            filter: {
              ref: "A1:E79",
              columns:[]
            },
            rows: [{
              height: 40,
              cells: [
                {
                  bold: "true",
                  background: "#9c27b0",
                  textAlign: "center",
                  color: "white"
                },{
                  bold: "true",
                  background: "#9c27b0",
                  textAlign: "center",
                  color: "white"
                },{
                  bold: "true",
                  background: "#9c27b0",
                  textAlign: "center",
                  color: "white"
                },{
                  bold: "true",
                  background: "#9c27b0",
                  textAlign: "center",
                  color: "white"
                },{
                  bold: "true",
                  background: "#9c27b0",
                  textAlign: "center",
                  color: "white"
                }]
            }],
            columns: [
              { width: 100 },
              { width: 415 },
              { width: 145 },
              { width: 145 },
              { width: 145 }
            ]
          }]
        });



        function onSubmit(e) {
          $.ajax({
            url: crudServiceBaseUrl + "/Products/Submit",
            data: kendo.stringify(e.data),
            contentType: "application/json",
            success: function (result) {
              e.success(result.Updated, "update");
              e.success(result.Created, "create");
              e.success(result.Destroyed, "destroy");
            },
            error: function (xhr, httpStatusMessage, customErrorMessage) {
              alert(xhr.responseText);
            }
          });
        }

        function onRead(options) {
          $.ajax({
            url: crudServiceBaseUrl + "/Products",
            success: function (result) {
              options.success(result);
            },
            error: function (result) {
              options.error(result);
            }
          });
        }
      });
    </script>
    </div>
```

## See Also

- [Kendo UI Spreadsheet Overview](https://docs.telerik.com/kendo-ui/controls/data-management/spreadsheet/overview)
- [Kendo UI Spreadsheet API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
