---
title: Removing AutoComplete Popup from Kendo UI Grid Filter Row
description: Learn how to disable the AutoComplete popup in the filter row of a Kendo UI jQuery Grid to use a simple filter box instead.
type: how-to
page_title: How to Disable AutoComplete Popup in Kendo UI Grid Filter Row
slug: disable-autocomplete-popup-kendo-ui-grid
tags: kendo ui, grid, autocomplete, filter row, disable popup
res_type: kb
components: ["autocomplete", "grid"]
ticketid: 1683935
---

## Description

I want to use a filter box in the Kendo UI Grid filter row but without the AutoComplete popup feature. Is there a straightforward method to achieve this?

This knowledge base article also answers the following questions:
- How can I disable the AutoComplete popup in the Kendo UI Grid filter row?
- Can I prevent the AutoComplete popup from appearing in the filter row of a Kendo UI Grid?

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® jQuery AutoComplete, <br/>
Progress® Kendo UI® jQuery Grid</td>
</tr>
</tbody>
</table>

## Solution

To disable the AutoComplete popup in the filter row of the Kendo UI Grid, bind the [`open`](/api/javascript/ui/autocomplete/events/open) event of the AutoComplete to prevent its default action. This can be achieved within the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event of the Grid. The following example demonstrates how to accomplish this:

```javascript
dataBound: function (e) {
    $('.k-filtercell [title="Ship Name"].k-input-inner')
      .data("kendoAutoComplete")
      .bind("open", function (e) {
        e.preventDefault();
      });               
},
```

This code snippet finds the AutoComplete widget used within the filter row of the Grid (identified by the `title` attribute) and binds an event handler to its `open` event. By calling `e.preventDefault()` within the event handler, the opening of the AutoComplete suggestion box is prevented, allowing the use of a simple filter box without the popup.

For a practical demonstration, refer to this example: [
```dojo
 <div id="grid"></div>
      <script>
        $(document).ready(function () {
          $("#grid").kendoGrid({
            dataBound: function (e) {
              $('.k-filtercell [title="Ship Name"].k-input-inner')
                .data("kendoAutoComplete")
                .bind("open", function (e) {
                  e.preventDefault();
                });               
            },
            dataSource: {
              type: "odata-v4",
              transport: {
                read: "https://demos.telerik.com/service/v2/odata/Orders",
              },
              schema: {
                model: {
                  fields: {
                    OrderID: { type: "number" },
                    Freight: { type: "number" },
                    ShipName: { type: "string" },
                    OrderDate: { type: "date" },
                    ShipCity: { type: "string" },
                  },
                },
              },
              pageSize: 20,
              serverPaging: true,
              serverFiltering: true,
            },
            height: 550,
            filterable: {
              mode: "row",
            },
            pageable: true,
            columns: [
              {
                field: "OrderID",
                width: 225,
                filterable: {
                  cell: {
                    showOperators: false,
                  },
                },
              },
              {
                field: "ShipName",
                width: 500,
                title: "Ship Name",
                filterable: {
                  cell: {
                    operator: "contains",
                    suggestionOperator: "contains",
                  },
                },
              },
              {
                field: "Freight",
                width: 255,
                filterable: {
                  cell: {
                    operator: "gte",
                  },
                },
              },
              {
                field: "OrderDate",
                width: 255,
                title: "Order Date",
                format: "{0:MM/dd/yyyy}",
              },
            ],
          });
        });
      </script>
```

## See Also

- [Kendo UI Grid Documentation](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview)
- [Kendo UI AutoComplete Documentation](https://docs.telerik.com/kendo-ui/controls/editors/autocomplete/overview)
- [Grid API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
- [AutoComplete API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/autocomplete)
