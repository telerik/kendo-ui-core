---
title: Edit the Cell Values of the Grid with a Popover Editor
description: "Learn how to edit the cell values of the Kendo UI for jQuery Grid with a popover editor."
type: how-to
page_title: Edit the Grid Cell Values with a Popover Editor
slug: grid-popover-editor
tags: kendoui, grid, edit, cell, values, popover, editor 
ticketid: 1359627
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

How can I open a Kendo UI for jQuery Popover when a Grid cell value is clicked and, then, show an editor inside the Popover?

## Solution

To achieve the desired scenario: 

1. Define a template function that will be used for the Grid columns. This function will accept the `dataItem` of the row as well as the name of the column field.
1. Assign the function to the Grid columns by using the [`columns.template`](/api/javascript/ui/grid/configuration/columns.template) configuration.
1. Initialize the Popover component.
1. The [`header`](/api/javascript/ui/popover/configuration/header) for the Popover will be generated dynamically. The following example uses the title of the column as a title for the Popover.
1. The [`body`](/api/javascript/ui/popover/configuration/body) of the Popover will depend on the type of components that you want to initialize inside the Popover. For example, for numeric columns, you will likely want to have an `input` element in the body because the NumericTextBox component is initialized from such.
1. The column specific components will be initialized inside the [`show`](/api/javascript/ui/popover/events/show) event of the Popover. The example shows a possible initialization; however, you can implement your own logic if required.

The following example demonstrates the full implementation of the suggested approach:

```dojo
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/products.js"></script>

    <style>
      .popover-editor {
        cursor: pointer;
      }
    </style>

    <div id="grid"></div>

    <script>
      // Create the popover editor.
      const popoverEditor = (dataItem, field) => {
        let value = dataItem[field];

        return `<span class='popover-editor' field='${field}' val='${value}' style='color:blue;'>${value}</span>`;
      };

      $(document).ready(function() {
        $("#grid").kendoGrid({
          dataSource: {
            data: products,
            schema: {
              model: {
                fields: {
                  ProductName: { type: "string" },
                  UnitPrice: { type: "number" },
                  UnitsInStock: { type: "number" },
                  Discontinued: { type: "boolean" }
                }
              }
            },
            pageSize: 20
          },
          height: 550,
          scrollable: true,
          sortable: true,
          filterable: true,
          pageable: {
            input: true,
            numeric: false
          },
          // Add the popover editor as a column.template.
          columns: [
            { field: "ProductName", width: 250, template: (dataItem) => popoverEditor(dataItem, "ProductName") },
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "130px", template: (dataItem) => popoverEditor(dataItem, "UnitPrice") },
            { field: "UnitsInStock", title: "Units In Stock", width: "130px", template: (dataItem) => popoverEditor(dataItem, "UnitsInStock") },
            { field: "Discontinued", width: "130px", template: (dataItem) => popoverEditor(dataItem, "Discontinued") }
          ]
        });
      });

      // Initialize the Popover. You can modify the editors for each field in the "show" event handler.
      (() => {
        $("#grid").kendoPopover({
          showOn: "click",
          filter: ".popover-editor",
          width: "300px",
          height: "58px",
          position: "right",
          header: function (e) {
            let index = e.target.closest("td").index();
            let title = $("#grid th:eq("+index+")").find(".k-column-title").text() + " editor";

            return title;
          },
          body: (e) => `<input uid='${e.target.closest("tr").data("uid")}' field='${e.target.attr("field")}' value=${e.target.attr("val")} />`,
          show: (e) => {
            let input = e.sender.popup.element.find("input"),
                uid = input.attr("uid"),
                field = input.attr("field"),
                row = $("[data-uid='"+uid+"']"),
                dataItem = $("#grid").data("kendoGrid").dataItem(row);

            if(field === "ProductName") {
              input.kendoTextBox({ change: (e) => dataItem.set(field, e.sender.value()) });
            }

            if(field === "UnitPrice") {
              // The NumericTextBoxes must be blurred before initialized.
              input.blur();
              input.kendoNumericTextBox({ change: (e) => dataItem.set(field, e.sender.value()) });
            }

            if(field === "UnitsInStock") {
              // The NumericTextBoxes must be blurred before initialized.
              input.blur();
              input.kendoNumericTextBox({ change: (e) => dataItem.set(field, e.sender.value()) });
              
            }

            if(field === "Discontinued") {
              input.kendoCheckBox({ change: (e) => dataItem.set(field, e.checked), checked: input.attr("value") === "true" });
            }
          }
        });
      })();
    </script>
```