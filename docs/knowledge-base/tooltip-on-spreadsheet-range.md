---
title: Display Spreadsheet Selected Ranges in Tooltips
page_title: Display Selected Spreadsheet Ranges in Tooltips
description: "Learn how to show a selected range from a Kendo UI Spreadsheet in a Kendo UI Tooltip."
previous_url: /controls/data-management/spreadsheet/how-to/AngularJS/show-selected-range-in-tooltip, /controls/data-management/spreadsheet/how-to/show-selected-range-in-tooltip
slug: tooltip_on_spreadsheet_range
tags: spreadsheet, tooltip, range, selection
component: tooltip, spreadsheet
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Tooltip for jQuery</td>
  <td>Progress® Kendo UI® Spreadsheet for jQuery</td>
 </tr>
</table>

## Description

How can I show a selected range from a Kendo UI Spreadsheet in a Kendo UI Tooltip?

## Solution

1. Wrap the Spreadsheet in a [Kendo UI Tooltip]({% slug overview_kendoui_tooltip_widget %}).
2. Use the `k-spreadsheet-selection` class as a [`filter`](/api/javascript/ui/tooltip/configuration/filter) in the configuration options of the Tooltip.
3. Use the [`content`](/api/javascript/ui/tooltip/configuration/content) option to provide a function that will create the content for the Tooltip based on the current Spreadsheet selection.
4. Use the [`selection()`](/api/javascript/spreadsheet/sheet/methods/selection) method of the Spreadsheet to get the current selection (returns a range), and the Range [`values()`](/api/javascript/spreadsheet/range/methods/values) method to get the respective values.

The following example demonstrates how to display a selected range from the Spreadsheet in a Kendo UI Tooltip.


```dojo

    <div id="example">
      <div id="spreadsheet" style="width: 100%"></div>
      <script>
        $(function() {
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";

          var dataSource = new kendo.data.DataSource({
            transport: {
              read: onRead
            },
            batch: true,           
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


          var tooltip = $("#spreadsheet").kendoTooltip({
            filter: 'div.k-spreadsheet-selection',
            width: 380,
            content: function(e){

              var spreadsheet = $("#spreadsheet").data('kendoSpreadsheet')

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
          }).data("kendoTooltip");

        });
      </script>
    </div>
```

## See Also

* [Tooltip JavaScript API Reference](/api/javascript/ui/tooltip)
* [Spreadsheet JavaScript API Reference](/api/javascript/ui/spreadsheet)
* [Range API Reference](/api/javascript/spreadsheet/range)
