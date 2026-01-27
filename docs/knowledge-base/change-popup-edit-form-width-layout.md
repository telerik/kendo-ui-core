---
title: Adjust Popup Edit Form and Input Widths
page_title: Adjust Popup Edit Form and Input Widths - Kendo UI for jQuery Data Grid
description: "Learn how to adjust the width and height of the popup edit form in the Kendo UI Grid."
previous_url: /controls/data-management/grid/how-to/Editing/change-popup-edit-form-width-layout
slug: howto_increase_popup_edit_formand_textbox_grid
tags: grid, adjust, popup, edit, form, input, width, height
type: how-to
res_type: kb
components: ["grid"]
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Grid</td>
</tr>
<tr>
<td>Version</td>
<td>2025.4.1217</td>
</tr>
</tbody>


## Description

How can I adjust the width and height of the popup edit form in the Kendo UI Grid?

## Solution

To adjust the dimensions of the popup edit form:

1. Configure the popup window dimensions using the [`editable.window`](/api/javascript/ui/grid/configuration/editable.window) configuration.
2. Use the [`edit`](/api/javascript/ui/grid/events/edit) event to customize the form container width if needed.

The following example demonstrates how to set custom dimensions for the popup edit window in the Grid.

```dojo
<div id="grid"></div>

<script>
  $(document).ready(function () {
    var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core";
        dataSource = new kendo.data.DataSource({
          transport: {
            read:  {
              url: crudServiceBaseUrl + "/Products"
            },
            update: {
              url: crudServiceBaseUrl + "/Products/Update",
              type: "POST",
              contentType: "application/json"
            },
            destroy: {
              url: crudServiceBaseUrl + "/Products/Destroy",
              type: "POST",
              contentType: "application/json"
            },
            create: {
              url: crudServiceBaseUrl + "/Products/Create",
              type: "POST",
              contentType: "application/json"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return kendo.stringify(options.models);
              }
            }
          },
          batch: true,
          pageSize: 10,
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

    $("#grid").kendoGrid({
      dataSource: dataSource,
      pageable: true,
      height: 300,
      toolbar: ["create"],
      columns: [
        { field:"ProductName", title: "Product Name" },
        { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "120px" },
        { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
        { field: "Discontinued", width: "120px" },
        { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
      editable: {
  		mode: "popup",
  		window: {
  		    width: "600px",
  		    height: "300px",
  		}
	  },
      edit: function (e) {
      	$(e.container).find(".k-edit-form-container").css("width", "auto");
      }
    });
  });
</script>
```

## See Also

* [JavaScript API Reference of the Data Grid](/api/javascript/ui/grid)
