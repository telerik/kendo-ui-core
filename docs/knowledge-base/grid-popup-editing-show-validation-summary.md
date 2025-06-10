---
title: Show Validation Summary in Grid Popup Editing Window
description: "Learn how to show validation summary instead of tooltips in Grid popup window."
type: how-to
page_title: Show Validation Summary in Grid Popup Editing Window
slug: grid-popup-editing-show-validation-summary
tags: kendoui, grid, edit, popup, validation, summary 
ticketid: 1607760
res_type: kb
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® Grid for jQuery</td>
		</tr>
	</tbody>
</table>


## Description

How can I display the validation summary instead of tooltips in the Grid popup edit window?

## Solution

To achieve the desired scenario: 

1. Add an [`edit`](/api/javascript/ui/grid/events/edit) event handler to generate the Validation summary and append it to a predefined HTML element in your popup editing window.
1. Hide the validation tooltip with CSS.


```dojo
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
            edit: function(e) {
              var validator = e.container.find(".k-edit-form-container").data("kendoValidator");
              e.container.prepend("<span id='errors' style='color:red;'></span>")
              validator.bind("validate", function (e) {
                var errors = this.errors();
                if (errors.length) {
                  var html = "<ul>";
                  for (var i = 0; i < errors.length; i++) {
                    html += "<li>" + errors[i] + "</li>";
                  }
                  html += "</ul>";
                  $("#errors").html($(html));
                }
              });
            }
          });
        });
      </script>
    <style>
      .k-invalid-msg {
        display: none;
      }
    </style>
```

## See Also

* [Kendo UI for jQuery Grid Overview (Demo)](https://demos.telerik.com/kendo-ui/grid/index)
* [jQuery Grid Overview (Documentation)]({% slug overview_kendoui_grid_widget %})
* [JavaScript API of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
