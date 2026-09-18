---
title: Apply Custom Validation to a Grid Numeric Column Editor
description: Learn how to apply custom validation to a numeric Kendo UI for jQuery Grid column editor through schema model validation.
type: how-to
meta_title: Custom Validation for a Grid Column Editor
slug: custom-validation-for-grid-column-editor
tags: kendo ui for jquery, grid, validation, custom editor, numerictextbox
res_type: kb
components: ["grid"]
---

## Environment

| Product | Version |
| --- | --- |
| Kendo UI for jQuery Grid | 2026.3.811 |

## Description

I want to apply a custom validation function to a numeric field in a Kendo UI for jQuery Grid that uses a custom column editor. The value must be greater than 10.

This KB also answers the following questions:

- How can I validate a numeric Grid column that uses a custom editor?
- How can I add a custom validation rule to a Grid field in the `schema.model` configuration?
- How can I validate a numeric custom editor in an inline-editable Kendo UI Grid?

## Solution

Define the custom validation rule in the `validation` configuration of the numeric field in the DataSource `schema.model`. The `columns.editor` function creates the input for the custom editor, while the Grid applies the model validation when editing and saving the field.

The following example validates that `Price` is greater than 10. To test it, edit a row and enter `10` or `10.50` in the `Price` field. Enter `10.51` to pass validation.

```dojo
<div id="example">
  <div id="grid"></div>

  <script>
    $(document).ready(function () {
      var dataSource = new kendo.data.DataSource({
        data: [
          { Id: 1, Name: "Product A", Price: 20 },
          { Id: 2, Name: "Product B", Price: 25 }
        ],
        schema: {
          model: {
            id: "Id",
            fields: {
              Name: {
                validation: { required: true }
              },
              Price: {
                  type: "number",
                  validation: {
                    required: true,
                    min: 0,
                    pricevalidation: function (input) {
                      if (input.is("[name='Price']") && input.val() !== "") {
                        input.attr(
                          "data-pricevalidation-msg",
                          "Price must be greater than 10"
                        )
                        return parseFloat(input.val()) > 10
                      }

                      return true
                    }
                  }
              }
            }
          }
        }
      })

      $("#grid").kendoGrid({
        dataSource: dataSource,
        columns: [
          "Name",
          {
            field: "Price",
            title: "Price",
            format: "{0:c}",
            editor: function (container, options) {
              $(
                '<input name="' + options.field + '" required="required" />'
              )
                .appendTo(container)
                .kendoNumericTextBox()
            }
          },
          {
            command: "edit",
            title: "Edit"
          }
        ],
        editable: "inline"
      })
    })
  </script>
</div>
```

## See Also

- [DataSource Schema Model Configuration](/api/data/datasource)
- [Grid Configuration](/api/ui/grid)
- [Custom Validation in the Grid](https://demos.telerik.com/kendo-ui/grid/editing-custom-validation)
