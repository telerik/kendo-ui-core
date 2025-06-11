---
title: Iterating and Checking Items in Kendo UI for jQuery Grid FilterMultiCheck
description: Learn how to programmatically iterate through and check items in a Kendo UI for jQuery Grid FilterMultiCheck component.
type: how-to
page_title: Programmatically Check Items in Kendo UI for jQuery Grid FilterMultiCheck
slug: iterate-check-items-kendo-ui-jquery-grid-filtermulticheck
tags: kendo, ui, jquery, grid, filtermulticheck, iterate, check, items
res_type: kb
ticketid: 1682081
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
<td>2025.1.227</td>
</tr>
</tbody>
</table>

## Description

It is necessary to iterate through a Kendo UI for jQuery Grid FilterMultiCheck component and manually check items based on their text or value. How can this be achieved since Kendo UI does not provide a built-in method for directly modifying the selected checkboxes within the FilterMultiCheck?

This knowledge base article also answers the following questions:
- How to programmatically select checkboxes in a Kendo UI for jQuery Grid FilterMultiCheck?
- How to automatically check specific items in FilterMultiCheck based on their values?
- How can I manipulate the checked state of items in a FilterMultiCheck component?

## Solution

To iterate and manually check items in a Kendo UI for jQuery Grid FilterMultiCheck component based on their text or value, follow the steps outlined below. Note that while Kendo UI does not support direct manipulation of checkboxes within the FilterMultiCheck, you can achieve the desired result by using jQuery to target the checkboxes after the filter menu has rendered. This can be done in the [`filterMenuInit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/filtermenuinit) event handler.

1. Subscribe to the [`filterMenuInit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/filtermenuinit) event of the Kendo UI for jQuery Grid. 

2. Verify the field being filtered matches your criteria (e.g., 'UnitPrice' or 'UnitsInStock').

3. Use jQuery to find the filter menu for the specific field and obtain a reference to it.

4. Define the values that should be checked within the filter menu.

5. Loop through each checkbox in the filter menu and check those whose associated label values match the predefined values.

```javascript
filterMenuInit: function (e) {
            // Check if the field being filtered is either 'UnitPrice' or 'UnitsInStock'
            if (e.field === "UnitPrice" || e.field === "UnitsInStock") {
              // Find the filter menu for the specific field (UnitPrice or UnitsInStock) using the header's data-field attribute
              let filterMenu = this.thead.find("[data-field=" + e.field + "]").data("kendoFilterMultiCheck");
              // Define an array of values that should be checked in the filter menu
              let valuesToCheck = [18, 40];

              if (filterMenu) {
                // Loop through each checkbox input inside the filter menu
                $(".k-multicheck-wrap input[type='checkbox']").each(
                  function () {
                    // Get the label value next to the checkbox, remove the dollar sign, and convert it to a float
                    var label = parseFloat(
                      $(this).parent().next("span").text().replace("$", ""),
                    );

                    // Check if the label value is included in the 'valuesToCheck' array
                    if (valuesToCheck.includes(label)) {
                      $(this).prop("checked", true);
                    }
                  },
                );
              }
            }
          },
```

For a practical implementation, refer to the below runnable demo: [Kendo UI for jQuery Grid FilterMultiCheck Demo]

```dojo
<div id="client"></div>
    <script>
      $(document).ready(function () {
        var crudServiceBaseUrl =
          "https://demos.telerik.com/service/v2/core/";
        $("#client").kendoGrid({
          dataSource: {
            transport: {
              read: {
                url: crudServiceBaseUrl + "/Products"
              },
              parameterMap: function (options, operation) {
                if (operation !== "read" && options.models) {
                  return kendo.stringify(options.models);
                }
              },
            },
            batch: true,
            pageSize: 20,
            schema: {
              model: {
                id: "ProductID",
                fields: {
                  ProductID: { editable: false, nullable: true },
                  ProductName: { validation: { required: true } },
                  UnitPrice: {
                    type: "number",
                    validation: { required: true, min: 1 },
                  },
                  Discontinued: { type: "boolean" },
                  UnitsInStock: {
                    type: "number",
                    validation: { min: 0, required: true },
                  },
                },
              },
            },
          },
          filterMenuInit: function (e) {
            // Check if the field being filtered is either 'UnitPrice' or 'UnitsInStock'
            if (e.field === "UnitPrice" || e.field === "UnitsInStock") {
              // Find the filter menu for the specific field (UnitPrice or UnitsInStock) using the header's data-field attribute
              let filterMenu = this.thead.find("[data-field=" + e.field + "]").data("kendoFilterMultiCheck");
              // Define an array of values that should be checked in the filter menu
              let valuesToCheck = [18, 40];

              if (filterMenu) {
                // Loop through each checkbox input inside the filter menu
                $(".k-multicheck-wrap input[type='checkbox']").each(
                  function () {
                    // Get the label value next to the checkbox, remove the dollar sign, and convert it to a float
                    var label = parseFloat(
                      $(this).parent().next("span").text().replace("$", ""),
                    );

                    // Check if the label value is included in the 'valuesToCheck' array
                    if (valuesToCheck.includes(label)) {
                      $(this).prop("checked", true);
                    }
                  },
                );
              }
            }
          },
          filterable: true,
          pageable: true,
          height: 550,
          toolbar: ["create", "save", "cancel"],
          columns: [
            { field: "ProductName", filterable: { multi: true } },
            {
              field: "UnitPrice",
              title: "Unit Price",
              format: "{0:c}",
              width: 120,
              filterable: { multi: true },
            },
            {
              field: "UnitsInStock",
              title: "Units In Stock",
              width: 120,
              filterable: { multi: true },
            },
            {
              field: "Discontinued",
              width: 120,
              filterable: {
                multi: true,
                dataSource: [{ Discontinued: true }, { Discontinued: false }],
              },
            }
          ]
        });
      });
    </script>
```

## See Also

- [Kendo UI for jQuery Grid Documentation](https://docs.telerik.com/kendo-ui/controls/grid/overview)
- [Grid API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)

