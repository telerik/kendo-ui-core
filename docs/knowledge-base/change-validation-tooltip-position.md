---
title: Change Validation Message Position
page_title: Change Validation Message Position | Kendo UI Grid for jQuery
description: "An example on how to change the validation message position in a popup edit form when working with the Kendo UI Grid."
previous_url: /controls/data-management/grid/how-to/Editing/change-validation-tooltip-position
slug: howto_change_validation_message_position_grid
tags: grid, validation, message, position
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I change the validation message position in a popup edit form when working with the Kendo UI Grid?

## Solution

By design, validation messages inside the Grid are tooltips that are displayed over adjacent content.

The following example demonstrates how to change this behavior and display the validation messages at a specific position in the popup edit form of the Grid.

The approach relies on the following milestones:
* Usage of a [popup edit form template](/api/javascript/ui/grid/configuration/editable.template).
* The validation messages are put in [placeholders]({% slug overview_kendoui_validator_widget %}#customization-of-tooltip-position) that are wrapped in custom parents and positioned with the help of custom CSS styles.
* The [width of the popup edit form may need to be increased]({% slug howto_increase_popup_edit_formand_textbox_grid %}).

```dojo
<style>

  /* increase the popup edit form's width to make space for validator messages */
  .k-edit-form-container {
    width: 500px;
  }

  /* add side padding */
  .k-edit-form-container dl {
    padding: 0 1em;
  }

  /* increase line height in accordance with validator messages' height */
  .k-edit-form-container dd {
    line-height: 3em;
  }

  /* override absolute positioning styles of the validator messages */
  .validator-msg,
  .validator-msg .k-tooltip {
    position: static;
    display: inline-block;
  }

  /* hide validator tooltip callouts */
  .validator-msg .k-tooltip .k-callout {
    display: none;
  }

</style>

<script id="edit-template" type="text/x-kendo-template">
    <dl>
      <dt><label for="ProductName">Product Name</label></dt>
      <dd><input class="k-textbox" data-bind="value:ProductName" name="ProductName" required="required" />
      <div class="validator-msg"><span data-for="ProductName" class="k-invalid-msg"></span></div></dd>

      <dt><label for="UnitPrice">Unit Price</label></dt>
      <dd><input data-role="numerictextbox" data-min="1" data-bind="value:UnitPrice" name="UnitPrice" required="required" />
      <div class="validator-msg"><span data-for="UnitPrice" class="k-invalid-msg"></span></div></dd>
    </dl>
</script>

<div id="grid"></div>

<script>
$(function () {
  var crudServiceBaseUrl = "//demos.telerik.com/kendo-ui/service",
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
        pageSize: 5,
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
    toolbar: ["create"],
    columns: [{ field:"ProductName", title: "Product Name" },
      { field: "UnitPrice", title:"Unit Price", format: "{0:c}" },
      { command: ["edit", "destroy"], title: "&nbsp;" }],
    editable: {
      mode:"popup",
      template: $("#edit-template").html()
    }
  });
});
</script>

```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
