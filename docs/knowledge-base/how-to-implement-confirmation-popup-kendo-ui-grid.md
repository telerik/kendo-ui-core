---
title: Implementing a Confirmation Popup for Canceling Editing in Kendo UI Grid
description: Learn how to prompt users with a confirmation dialog when they attempt to cancel editing in the Kendo UI Grid's popup editing mode.
type: how-to
page_title: How to Add a Confirmation Dialog on Canceling Edit in Kendo UI Grid
slug: how-to-implement-confirmation-popup-kendo-ui-grid
tags: kendo ui, grid, popup editing, confirmation dialog, cancel event
res_type: kb
components: ["grid"]
ticketid: 1666669
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Grid for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2024.3.1015</td>
</tr>
</tbody>
</table>

## Description

When using the Grid component in popup editing mode, it is sometimes necessary to confirm the user's intent to cancel the edit operation. This confirmation helps prevent accidental loss of data entered by the user. This article explains how to implement a confirmation popup window when canceling editing in the Grid's popup editing mode.

This KB article also answers the following questions:
- How can I prompt users for confirmation before canceling edits in a popup editor?
- What Grid event should I use to apply the logic to?
- How do I prevent the closing of a popup editor without user confirmation in the Kendo UI Grid?

## Solution

To achieve the desired functionality, handle the Grid's [`cancel`](/api/javascript/ui/grid/events/cancel) event. In the event handler, display a confirmation dialog using `window.confirm()`. If the user opts not to cancel the edit (clicks "Cancel" in the dialog), prevent the default action using `e.preventDefault()`.

1. Subscribe to the Grid's `cancel` event. You can do this in the Grid's configuration:

   ```javascript
   $("#grid").kendoGrid({
     // Other grid configurations
     cancel: function(e) {
       let confirmResult = window.confirm("Are you sure you want to leave? Any unsaved changes will not be saved.");
       if(!confirmResult) {
         e.preventDefault();
       }
     }
   });
   ```

2. In the `cancel` event handler, utilize `window.confirm()` to display a confirmation dialog. The message should clearly indicate to the user that proceeding will result in the loss of any unsaved changes.

3. If the user decides to continue with the cancellation (clicks "OK"), the default behavior proceeds, and the popup editor closes without saving changes. If the user opts not to cancel (clicks "Cancel" in the confirmation dialog), use `e.preventDefault()` to stop the popup from closing.

For a practical implementation, refer to the below Dojo demo. 

```dojo
<div id="example">
      <div id="grid"></div>

      <script>
        $(document).ready(function () {
         var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
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

          $("#grid").kendoGrid({
            dataSource: dataSource,
            pageable: true,
            height: 550,
            toolbar: ["create"],
            columns: [
              { field:"ProductName", title: "Product Name" },
              { field: "UnitPrice", title:"Unit Price", format: "{0:c}", width: "120px" },
              { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
              { field: "Discontinued", width: "120px"},
              { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
            editable: "popup",
            cancel: function(e) {
              let confirmResult = window.confirm("Are you sure you want to leave? Any unsaved changes will not be saved.");
              if(!confirmResult) {
                e.preventDefault();
              }
            }
          }).data("kendoGrid");
        });
      </script>
    </div>
```
## See Also

- [Grid Cancel Event Documentation](/api/javascript/ui/grid/events/cancel)
- [Kendo UI Grid Overview](/controls/data-management/grid/overview)
- [Kendo UI Grid Popup Editing](/controls/grid/editing/popup)
