---
title: Determine the Current Cell in the Grid
description: How to Get the Row and Cell Indices of a Focused Cell
type: troubleshooting
page_title: Get Row and Cell Index in the Kendo UI Grid - for Hybrid and Web Apps
slug: grid-get-the-current-row-and-cell-index
position: 
tags: grid, cell, index, row, current, position, tap, touch, click
ticketid: 1148726
res_type: kb
---

## Environment
<table>
	<tr>
		<td>Product Version</td>
		<td>2017.3 1026</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Grid for Progress® Kendo UI®</td>
	</tr>
</table>

## Description

Using the Kendo Grid in both Chrome and Firefox while on a hybrid device (touch screen) fails to recognize mouse clicks in the grid.  The most obvious things are that the "Current" cell can not be found, it is either undefined, or if coming from somewhere else in the grid, current is still the old cell.

## Cause\Possible Cause(s)

 The incorrect focus on mobile devices is a known issue

[https://github.com/telerik/kendo-ui-core/issues/3631](https://github.com/telerik/kendo-ui-core/issues/3631)

There is a workaround in the issue, also a runnable example and explanations below

## Suggested Workarounds

Add a `touchstart` and `click` event handlers to the [tbody](/api/javascript/ui/grid/fields/tbody) of the grid and get the current cell with jQuery:

```
if(kendo.support.touch){
 var grid = $("#grid").data("kendoGrid");
 grid.tbody.on("touchstart click", function(e){
    var currentCell = $(e.target);
  });  
}
```

###### Example

```html
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
              { field: "Discontinued", width: 120, editor: customBoolEditor },
              { command: "destroy", title: "&nbsp;", width: 150 }],
            editable: true,
           
          }).data("kendoGrid").tbody.on("touchstart click", function(e){
            $("body").append("<div>" + $(e.target).html() + "</div>");
        	});
        })

        function customBoolEditor(container, options) {
          $('<input class="k-checkbox" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
          $('<label class="k-checkbox-label">​</label>').appendTo(container);
        }
      </script>
    </div>
```