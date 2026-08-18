---
title: Creating a MultiSelect with Quantity Input in Kendo UI for jQuery
description: Learn how to create a MultiSelect with quantity input using Kendo UI for jQuery by combining the MultiSelect and NumericTextBox components.
type: how-to
page_title: MultiSelect with Numeric Input in Kendo UI for jQuery
meta_title: MultiSelect with Quantity Input in Kendo UI for jQuery
slug: multiselect-with-quantity-input-kendo-ui-jquery
tags: kendo-ui, jquery, multiselect, numerictextbox, custom-component
res_type: kb
ticketid: 1717800
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> Kendo UI for jQuery MultiSelect, <br/> Kendo UI for jQuery NumericTextBox </td>
</tr>
<tr>
<td> Version </td>
<td> 2026.3.811</td>
</tr>
</tbody>
</table>

## Description

There is no single Kendo UI for jQuery component that provides both MultiSelect and quantity input functionality out of the box. However, it is possible to create a custom solution by combining the [Kendo UI for jQuery MultiSelect](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect) for item selection and the [Kendo UI for jQuery NumericTextBox](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox) for quantity input. This approach allows you to track selected items and their corresponding quantities, displaying a summary of the selection.

This knowledge base article also answers the following questions:
- How to implement a dropdown with quantity input using Kendo UI for jQuery?
- How to combine MultiSelect and NumericTextBox to manage item quantities?
- How to create a custom MultiSelect with quantity functionality in Kendo UI for jQuery?

## Solution

To achieve a MultiSelect with quantity input, follow these steps:

1. Initialize the Kendo UI for jQuery MultiSelect with `autoClose` set to `false` to keep the dropdown open for multiple selections.
2. Use the `change` event of the MultiSelect to dynamically render a quantity panel with a NumericTextBox for each selected item.
3. Track the quantities of selected items in an object.
4. Update a summary text displaying selected items and their quantities.

Below is an implementation example:

```html
<label for="multiselect">Products</label>
<select id="multiselect"></select>
<div id="quantity-panel"></div>
<label for="order-summary">Generated text</label>
<input id="order-summary" class="summary-input" type="text" readonly placeholder="Selections will appear here" />

<style>
#multiselect,
.summary-input {
  width: 100%;
}

#quantity-panel {
  margin-top: 0.75rem;
}

.qty-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.45rem 0;
  border-bottom: 1px solid #e8e3d9;
}

.qty-row:last-child {
  border-bottom: none;
}

.qty-label {
  flex: 1;
}

.qty-row .k-numerictextbox {
  width: 5.5rem;
}
</style>
```

```javascript
$(document).ready(() => {
    let quantities = {};
    let multiselect = $("#multiselect").kendoMultiSelect({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Apple", value: "apple" },
            { text: "Banana", value: "banana" },
            { text: "Pineapple", value: "pineapple" }
        ],
        placeholder: "Select products...",
        autoClose: false,
        change() {
            renderQuantityPanel();
            updateSummary();
        }
    }).data("kendoMultiSelect");

    function renderQuantityPanel() {
        let panel = $("#quantity-panel").empty();
        let items = multiselect.dataItems();

        if (!items.length) return;

        items.forEach((item) => {
            let { value: id, text: name } = item;

            let row = $('<div class="qty-row"></div>');
            row.append(`<span class="qty-label">${kendo.htmlEncode(name)}</span>`);
            let input = $('<input class="qty-input" />');

            row.append(input);
            panel.append(row);

            input.kendoNumericTextBox({
                min: 1,
                max: 999,
                value: quantities[id] || 1,
                format: "n0",
                decimals: 0,
                restrictDecimals: true,
                change() {
                    quantities[id] = this.value() || 1;
                    updateSummary();
                },
                spin() {
                    quantities[id] = this.value() || 1;
                    updateSummary();
                }
            });

            if (!quantities[id]) quantities[id] = 1;
        });
    }

    function updateSummary() {
        let parts = multiselect.dataItems().map((item) => {
            let qty = quantities[item.value] || 1;
            return `${qty} x ${item.text}`;
        });

        $("#order-summary").val(parts.join(", "));
    }
});
```

This setup demonstrates how to combine the MultiSelect and NumericTextBox to achieve the desired functionality.

## See Also

- [Kendo UI for jQuery MultiSelect Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect)
- [Kendo UI for jQuery NumericTextBox Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox)
- [Kendo UI for jQuery Getting Started](https://docs.telerik.com/kendo-ui/getting-started/)
