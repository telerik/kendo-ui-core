---
title: Correcting Reorder Issue in Kendo UI for jQuery ListBox
description: Learn how to retrieve reordered items correctly in Kendo UI for jQuery ListBox and resolve issues with drag-and-drop functionality.
type: how-to
page_title: Fixing Drag-and-Drop Reorder Issues in Kendo UI ListBox
meta_title: Fixing Drag-and-Drop Reorder Issues in Kendo UI ListBox
slug: correcting-reorder-issue-listbox-kendo-ui-jquery
tags: kendo-ui-for-jquery,listbox,drag-and-drop,reorder,filter
res_type: kb
ticketid: 1694717
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>
Kendo UI for jQuery ListBox
</td>
</tr>
<tr>
<td> Version </td>
<td>2025.2.702</td>
</tr>
</tbody>
</table>

## Description

When using the [Kendo UI for jQuery ListBox](https://docs.telerik.com/kendo-ui/api/javascript/ui/listbox) to reorder items through drag-and-drop or toolbar controls, the expected order of items is not reflected in the data retrieved from the `view()` method. This issue arises because the `view()` method does not account for the reordered state of items.

Additionally, filtering items in the ListBox may require converting a string array to JSON objects for compatibility with the filtering functionality.

This knowledge base article also answers the following questions:
- How can I retrieve reordered items correctly in the ListBox?
- Why is the ListBox filter not working with string-based data?
- How can I persist changes in the order of ListBox items?

## Solution

### Retrieving Reordered Items

To retrieve reordered items correctly after a drag-and-drop operation, use the following approach:

1. Access the ListBox instance using `data("kendoListBox")`.
2. Retrieve the reordered items using the `items()` method and map them to their respective data items.

Example implementation:
```javascript
var listBox = $("#GrupyTenantUpd-myLista").data("kendoListBox");
var reorderedItems = listBox.items().map((_, index) => listBox.dataItem(index));
console.log(reorderedItems);
```

This method ensures the correct order of items after reordering operations.

### Filtering Items in the ListBox

Convert the string-based data to JSON objects before applying the filter. Use the following approach:

1. Transform the array of strings into an array of JSON objects.
2. Apply the filter using the desired field and operator.

Example:
```javascript
var listData = ["Bedynski", "EKO", "Bilicz_cons", "INFO-KOR"];
var jsonData = listData.map(value => ({ Name: value }));

$("#GrupyTenantUpdSearchAll").on("input", function(e) {
    var listBox = $("#GrupyTenantUpd-allLista").data("kendoListBox");
    var searchString = $(this).val();
    listBox.dataSource.filter({
        field: "Name",
        operator: "contains",
        value: searchString
    });
});
```

### Saving Reordered Items

After retrieving reordered items, ensure their persistence by saving them to the backend or updating the data source. Use the [`splice()`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/data/observablearray/methods/splice) method to insert items at the desired index or the [`insert()`](/api/javascript/data/datasource/methods/insert) method for Kendo DataSource.

Example for saving reordered items:
```javascript
var listBox = $("#GrupyTenantUpd-myLista").data("kendoListBox");
var reorderedItems = listBox.items().map((_, index) => listBox.dataItem(index));

// Save reorderedItems to the backend or update the data source
listBox.dataSource.data(reorderedItems);
```

### Additional Recommendations

Ensure drag-and-drop functionality triggers the reorder event and updates the correct order in the ListBox. If the reorder event does not fire, verify the configuration and event binding.

## See Also

- [ListBox API Documentation](/api/javascript/ui/listbox)
- [ListBox Filtering Example](https://www.telerik.com/kendo-jquery-ui/documentation/knowledge-base/listbox-how-to-filter-items)
- [Reordering Items in ListBox](https://www.telerik.com/kendo-jquery-ui/documentation/knowledge-base/list-box-reordering-not-working)
