---
title: Display Selected Ranges in Tooltips
page_title: Display Selected Ranges in Tooltips | Kendo UI Spreadsheet
description: "Learn how to show a selected range from a Kendo UI Spreadsheet in a Kendo UI Tooltip when working in AngularJS applications."
slug: howto_display_the_selected_range_in_a_tooltip_spreadsheet_widget
---

# Display Selected Ranges in Tooltips

When working in AngularJS applications, your project might require you to show a selected range from a Kendo UI Spreadsheet in a Kendo UI Tooltip.  

To achieve this behavior:

1. Wrap the Spreadsheet in a [Kendo UI Tooltip]({% slug overview_kendoui_tooltip_widget %}).
2. Use the **k-spreadsheet-selection** class as a [`filter`](/api/javascript/ui/tooltip#configuration-filter) in the configuration options of the Tooltip.
3. Use the [`content`](/api/javascript/ui/tooltip#configuration-content) option to provide a function that will create the content for the Tooltip based on the current Spreadsheet selection.
4. Use the [`selection()`](/api/javascript/spreadsheet/sheet#methods-selection) method of the Spreadsheet to get the current selection (returns a range), and the Range [`values()`](/api/javascript/spreadsheet/range#methods-values) method to get the respective values.

The following example demonstrates how to display a selected range from the Spreadsheet in a Kendo UI Tooltip when working in AngularJS applications.

###### Example

```html

	<div id="example" ng-app="KendoDemos">
	  <div ng-controller="MyCtrl">
	    <kendo-tooltip k-options="ttOptions">
	      <kendo-spreadsheet k-scope-field="spreadsheet" options="ssOptions"></kendo-spreadsheet>
	    </kendo-tooltip>
	  </div>
	</div>

	<style>
	  .tooltip-result, .tooltip-result td {
	    border-collapse: collapse;
	    border: 1px solid white;
	    white-space: nowrap;
	  }
	</style>

	<script>
	  var crudServiceBaseUrl = "//demos.telerik.com/kendo-ui/service";
	  angular.module("KendoDemos", [ "kendo.directives" ])
	    .controller("MyCtrl", function($scope){

	    $scope.ttOptions = {
	      filter: 'div.k-spreadsheet-selection',
	      content: function(e){
	        var selectedValues = $scope.spreadsheet.activeSheet().selection().values();

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
	    };

	    $scope.ssOptions = {
	      columns: 20,
	      rows: 100,
	      toolbar: false,
	      sheetsbar: false,
	      sheets: [{
	        name: "Products",
	        dataSource: {
	          transport: {
	            read:  {
	              url: crudServiceBaseUrl + "/Products",
	              dataType: "jsonp"
	            },
	            update: {
	              url: crudServiceBaseUrl + "/Products/Update",
	              dataType: "jsonp"
	            },
	            destroy: {
	              url: crudServiceBaseUrl + "/Products/Destroy",
	              dataType: "jsonp"
	            },
	            create: {
	              url: crudServiceBaseUrl + "/Products/Create",
	              dataType: "jsonp"
	            }
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
	    };
	  })
	</script>
```

## See Also

Other articles on the Kendo UI Spreadsheet:

* [Spreadsheet JavaScript API Reference](/api/javascript/ui/spreadsheet)
* [How to Bind Charts to Sheet Data]({% slug howto_bindcharttosheet_spreadsheet_widget %})
* [How to Set Validation Rules to Column Ranges]({% slug howto_validationtocolumn_spreadsheet_widget %})
