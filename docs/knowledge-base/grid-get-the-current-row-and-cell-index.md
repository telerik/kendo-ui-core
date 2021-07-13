---
title: Grid Does Not Recognize Mouse Clicks on Touch-Screen Devices
description: When using the Kendo UI Grid in Chrome or Firefox on a hybrid device (touch screen), the Grid fails to recognize the mouse clicks.
type: troubleshooting
page_title: Cannot Get Row and Cell Index on Hybrid Devices | Kendo UI Grid for jQuery
slug: grid-get-the-current-row-and-cell-index
tags: grid, cell, index, row, current, position, tap, touch, click
ticketid: 1148726
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2020.3 1021</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Grid for Progress® Kendo UI®</td>
	</tr>
</table>

## Description

When I use the Grid in Chrome or Firefox while on a hybrid device (touch screen), the Grid fails to recognize mouse clicks&mdash;the current cell cannot be found and it is either undefined, or if coming from somewhere else in the Grid, the current cell is still the previous cell.

## Cause

The incorrect focus on mobile devices is a [known issue](https://github.com/telerik/kendo-ui-core/issues/3631).

## Suggested Workarounds

1. Add a `touchstart` and `click` event handlers to the [`tbody`](/api/javascript/ui/grid/fields/tbody) element of the Grid.
1. Get the current cell with jQuery.

```
if(kendo.support.touch){
 var grid = $("#grid").data("kendoGrid");
 grid.tbody.on("touchstart click", function(e){
    var currentCell = $(e.target);
  });  
}
```

The following example demonstrates how to fully implement the suggested workaround.

```dojo
<div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function () {
          var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
              dataSource = new kendo.data.DataSource({
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
                  },
                  parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                      return {models: kendo.stringify(options.models)};
                    }
                  }
                },
                batch: true,
                pageSize: 20,
                schema: {
                  model: {
                    id: "ProductID",
                    fields: {
                      ProductID: { editable: false, nullable: true },
                      ProductName: { validation: { required: true } },
                      UnitPrice: { type: "number", validation: { required: true, min: 1} },
                      Discontinued: { type: "boolean" },
                      UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                    }
                  }
                }
              });

          var grid = $("#grid").kendoGrid({
            dataSource: dataSource,
            navigatable: true,
            pageable: true,
            height: 550,
            toolbar: ["create", "save", "cancel"],
            columns: [
              "ProductName",
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120 },
              { field: "UnitsInStock", title: "Units In Stock", width: 120 },
              { field: "Discontinued", width: 120 },
              { command: "destroy", title: "&nbsp;", width: 150 }],
            editable: true,

          }).data("kendoGrid").tbody.on("touchstart click", function(e){
            $("body").append("<div>" + $(e.target).html() + "</div>");
        	});
        })
      </script>
    </div>
```
