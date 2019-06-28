---
title: Sort Multiple Checkbox Filter
page_title: Sort Multiple Checkbox Filter | Kendo UI Grid for jQuery
description: "An example on how to sort the multiple checkbox filter while using the Kendo UI Grid for jQuery."
previous_url: /controls/data-management/grid/how-to/sort-multi-checkbox-filter, /kendo-mvc/web/grid/how-to/sort-multi-checkbox-filter, /kendo-ui-mvc/controls/data-management/grid/how-to/sort-multi-checkbox-filter, /controls/data-management/grid/how-to/filtering/sort-multi-checkbox-filter
slug: howto_sort_multiple_checkbox_filter_grid
tags: sort, multiple, checkbox, filter, using, grid
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I sort the multiple checkbox filter while using the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to sort the Kendo UI multiple checkbox filter while using the Grid.

```dojo

	<div id="client"></div>
      <script>
        $(document).ready(function() {
          var telerikWebServiceBase = "https://demos.telerik.com/kendo-ui/service/";
          $("#client").kendoGrid({
            dataSource: {
              transport: {
                read:  {
                  url: telerikWebServiceBase + "/Products",
                  dataType: "jsonp"
                },
                update: {
                  url: telerikWebServiceBase + "/Products/Update",
                  dataType: "jsonp"
                },
                destroy: {
                  url: telerikWebServiceBase + "/Products/Destroy",
                  dataType: "jsonp"
                },
                create: {
                  url: telerikWebServiceBase + "/Products/Create",
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
            },
            filterMenuInit: function(e) {
              if (e.field === "UnitPrice" || e.field === "UnitsInStock") {
                var filterMultiCheck = this.thead.find("[data-field=" + e.field + "]").data("kendoFilterMultiCheck")
                filterMultiCheck.container.empty();
                filterMultiCheck.checkSource.sort({field: e.field, dir: "asc"});

                // uncomment the following line to handle any grouping from the original dataSource:
	        // filterMultiCheck.checkSource.group(null);

                filterMultiCheck.checkSource.data(filterMultiCheck.checkSource.view().toJSON());
                filterMultiCheck.createCheckBoxes();
              }
            },
            filterable: true,
            pageable: true,
            height: 550,
            toolbar: ["create", "save", "cancel"],
            columns: [
              { field: "ProductName", filterable: { multi: true } },
              { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 120, filterable: { multi: true } },
              { field: "UnitsInStock", title: "Units In Stock", width: 120, filterable: { multi: true } },
              { field: "Discontinued", width: 120, filterable: { multi: true, dataSource: [{ Discontinued: true }, { Discontinued: false }]} },
              { command: "destroy", title: "&nbsp;", width: 150}],
            editable: true
          });
        });
      </script>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
