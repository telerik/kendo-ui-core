---
title: Hiding Selected Items in MultiSelect Component
description: Learn how to hide selected items in the dropdown list of the MultiSelect component.
type: how-to
page_title: Hide Selected Items in MultiSelect Dropdown
slug: hide-selected-items-multiselect
tags: multiselect,kendo-ui,open-event,filter,selected-items
res_type: kb
components: ["multiselect"]
ticketid: 1686703
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>MultiSelect for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2025.2.520</td>
</tr>
</tbody>
</table>

## Description

I want to hide the selected items from the dropdown list in the MultiSelect component. Currently, the selected items are highlighted, but I need them to be excluded from the list instead.

This knowledge base article also answers the following questions:
- How to filter out selected items in Kendo UI MultiSelect?
- How to remove selected items dynamically in MultiSelect dropdown?
- How to use the open event to filter items in MultiSelect?

## Solution

To hide selected items from the dropdown list in the [MultiSelect](/controls/multiselect/overview) component, use the [`open`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/multiselect/events/open) event to dynamically filter the dropdown list each time it is shown. The following code demonstrates this approach:

```javascript
open: function(e) {
    var multiselect = e.sender;
    var selectedValues = multiselect.value();
    var dataSource = multiselect.dataSource;

    // Show all items first
    dataSource.filter(null);

    // Then filter out selected items
    dataSource.filter({
        logic: "and",
        filters: selectedValues.map(function(value) {
            return {
                field: "value",
                operator: "neq",
                value: value
            };
        })
    });
}
```

### Explanation
1. Attach the `open` event to the MultiSelect component.
2. Retrieve the selected values using the `value()` method.
3. Reset the filter by setting it to `null` to ensure all items are initially visible.
4. Apply a filter to exclude the selected items. This is achieved using the `filter` method with a condition that removes items matching the selected values.

### Example
A full demonstration can be found in the following Dojo example.

```dojo
<select id="multiSelect" multiple="multiple">
</select>
<script>
$("#multiSelect").kendoMultiSelect({
    dataTextField: "text",
    dataValueField: "value",
    dataSource: [
        { text: "Item 1", value: 1 },
        { text: "Item 2", value: 2 },
        { text: "Item 3", value: 3 },
        { text: "Item 4", value: 4 }
    ],
    value: [2], // Preselected item
    open: function(e) {
        var multiselect = e.sender;
        var selectedValues = multiselect.value();
        var dataSource = multiselect.dataSource;

        // Show all items first
        dataSource.filter(null);

        // Then filter out selected items
        dataSource.filter({
            logic: "and",
            filters: selectedValues.map(function(value) {
                return {
                    field: "value",
                    operator: "neq",
                    value: value
                };
            })
        });
    }
});
</script>
```

## See Also

- [MultiSelect Overview Documentation](/controls/multiselect/overview)
- [Open Event API Reference](/api/javascript/ui/multiselect/events/open)
- [Filtering in Kendo UI DataSource](/api/javascript/data/datasource/methods/filter)
