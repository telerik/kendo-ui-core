---
title: How To Display Selected Ranges from Spreadsheet in Tooltips
description: "Learn how to display the data from the selected cells in the Spreadsheet in Kendo UI Tooltip."
type: how-to
page_title: Display Selected Ranges in Tooltips - Kendo UI Spreadsheet for jQuery
slug: spreadsheet_display_selected_ranges_tooltip
tags: spreadsheet, tooltip, selected, range
res_type: kb
component: spreadsheet, tooltip
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Spreadsheet for jQuery</td>
  <td>Progress® Kendo UI® Tooltip for jQuery</td>
 </tr>
</table>

## Description

How can I get the data of the selected range in the Spreadsheet and display it in Kendo UI for jQuery Tooltip?

## Solution

1. Use the Tooltip [`filter`](/api/javascript/ui/tooltip/configuration/filter) configuration option to display the Tooltip only over the selected range.
1. In the [`content`](/api/javascript/ui/tooltip/configuration/content) function of the Tooltip get the values of the selected cells using the [`Range values()`](/api/javascript/spreadsheet/range/methods/values) method.
1. Use the returned array with values to format the content of the Tooltip and return it as a content result. 

```dojo
    <style>
      .k-tooltip-content{
        width: 300px;
      }
    </style>

    <div id="spreadsheet" style="width: 100%"></div>
    <script>
      $(function() {
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

        var dataSource = new kendo.data.DataSource({
          transport: {
            read: onRead
          },              
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
          columns: 20,
          rows: 100,
          toolbar: false,
          sheetsbar: false,
          sheets: [{
            name: "Products",
            dataSource: dataSource,
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

        $("#spreadsheet").kendoTooltip({
          filter: 'div.k-spreadsheet-selection',
          content: function(e){
            var spreadsheet = $('#spreadsheet').data('kendoSpreadsheet')
            var selectedValues = spreadsheet.activeSheet().selection().values();

            var result = '<table class="tooltip-result"><thead>Selection:</thead>';
            selectedValues.forEach(function(item){
              result += '<tr>'
              item.forEach(function(subItem){
                result += ('<td>' + subItem + '</td>');
              })
              result += '</tr>'
            });

            result += '</table>';
            return result;
          },
          show: function(e){
            e.sender.refresh();
          }
        });


        function onRead(options) {
          $.ajax({
            url: crudServiceBaseUrl + "/Products",
            dataType: "jsonp",
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
```

## See Also

* [Spreadsheet API Reference](/api/javascript/ui/spreadsheet)
* [Tooltip API Reference](/api/javascript/ui/tooltip)
