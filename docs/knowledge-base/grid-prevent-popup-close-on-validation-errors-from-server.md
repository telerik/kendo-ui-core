---
title: Prevent Grid Popup Editor from Closing on Validation Errors
description: An example on how to keep the Kendo UI Grid popup editor open after an error occurs on the server.
type: how-to
page_title: Keep Popup Open on Server Error | Kendo UI Grid for jQuery
slug: grid-prevent-popup-close-on-validation-errors-from-server
tags: grid, edit, popup, prevent, cancel, stop, close, edit, insert, create, modal, reopen, keep, open, validation, fail, errors
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>2020.3.1021</td>
 </tr>
</table>

## Description

I am returning errors from server and catch it in kendo datasource error event.  Once the client input validation is successful, we still have to validate on the backend, and the popup should still remain open if the validation fails on the server end to allow the user to fix the errors otherwise it's frustrating to re-enter the data. Do you have a solution for this? How can I keep the popup editor of the Grid open?

## Solution

1. Specify which part of the response contains the errors [`schema.errors`](/api/javascript/data/datasource/configuration/schema#schemaerrors).
1. Add an [`error`](/api/javascript/data/datasource/events/error) handler in the data source. It will be triggered when the field which contains the errors is **present** in the response.
1. Prevent the grid to bind with the [`one()`](/api/javascript/observable/methods/one) method. This will keep the popup open and notify the user that there are errors.

```
    error: function(e) {
          grid.one("dataBinding", function (ev) {
            ev.preventDefault();
            var message = "Errors:\n";            
            $.each(e.errors, function (idx, error) {             
               message += "Code: "
                 + error.code
                 + " | Reason: " + error.reason
              	 + "\n";
            });
            kendo.alert(message);
          });
        }
```

###### Sample error response

```
    "errors": [{
		"code": "400",
		"reason": "Custom error!"
	}]
```

###### Example - the update response contains errors which trigger the error event of the dataSource

```dojo
<div id="grid"></div>
    <script>
      var dataSource = new kendo.data.DataSource({
        transport: {
          read:{
            url: "https://www.mocky.io/v2/5ce682093300004b3573161e"
          },
          update: {
            url: "https://www.mocky.io/v2/5ce686e33300006200731647",
          }
        },
        schema: {
          data: "items",
          total:"total",
          errors: "errors",
          model:{
            id: "id",
            fields:{
              id: { editable: false },
              name: { type: "string" }
            }
          }
        },
        error: function(e) {
          grid.one("dataBinding", function (ev) {
            ev.preventDefault();
            var message = "Errors:\n";            
            $.each(e.errors, function (idx, error) {             
               message += "Code: "
                 + error.code
                 + " | Reason: " + error.reason
              	 + "\n";
            });
            kendo.alert(message);
          });
        }
      });

      var grid = $("#grid").kendoGrid({
        dataSource:dataSource,
        columns:["id", "name", {command: ["edit"]}],
        editable:{ mode : "popup"}
      }).data("kendoGrid");
    </script>
```

## See Also

* [Prevent Grid Popup Editor from Closing on Update and Create]({% slug grid-prevent-popup-close-on-edit %})
