---
title: Setting Default Paste Behavior to 'Replace' in Kendo UI for jQuery Grid Toolbar
description: Learn how to programmatically set the paste functionality to 'replace' in Kendo UI for jQuery Grid to enhance usability and avoid manual selection.
type: how-to
page_title: Programmatically Set Paste as Replace in Kendo UI for jQuery Grid Toolbar
slug: set-paste-replace-kendo-ui-grid
tags: kendo, ui, jQuery, grid, paste, replace, programmatically, databound, toolbar
res_type: kb
components: ["grid"]
ticketid: 1672367
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI Grid for jQuery</td>
</tr>
<tr>
<td>Version</td>
<td>2025.1.211</td>
</tr>
</tbody>
</table>

## Description

When implementing the Kendo UI Grid for jQuery in a web application, it is often required to paste data into the grid. The need arises to set the paste action to 'replace' programmatically, avoiding the default 'insert' action and eliminating the user's need to select the paste mode manually.

This knowledge base article also answers the following questions:
- How can I change the default paste action in Kendo UI Grid for jQuery?
- Is it possible to set the paste mode to 'replace' without user intervention in Kendo UI Grid?
- How do I programmatically configure the paste functionality in a Kendo UI Grid?

## Solution

To set the paste functionality to 'replace' programmatically in the Kendo UI Grid for jQuery, utilize the [`dataBound`](/api/javascript/ui/grid/events/databound) event. Within this event, access the paste dropdown list and modify its data source to include only the 'replace' option. Then, set the dropdown list's value to 'replace'.

```javascript
dataBound: function() {
    var ddl = $(".k-grid-paste-action[data-role='dropdownlist']").getKendoDropDownList(); // Access the DropDownList
    ddl.dataSource.data([{text: "Paste (Replace)", value: "replace"}]); // Update the DropDownList data
    ddl.value("replace"); // Set the default option to 'replace'
}
```

Refer to the following Dojo example for a practical implementation.

```dojo
<div id="grid"></div>
<script>
$("#grid").kendoGrid({
    toolbar: ["paste"], // Creates a dropdownlist that enables you to switch between replace and insert modes.
    selectable: "multiple cell",
    allowPaste: true,
    columns: [
        { field: "productName" },
        { field: "category" }
    ],
    dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
    ],
  dataBound: function() {
    var ddl = $(".k-grid-paste-action[data-role='dropdownlist']").getKendoDropDownList(); // get a reference to the DropDownList
    ddl.dataSource.data([{text: "Paste (Replace)", value: "replace"}]); // update its data
    ddl.value("replace"); // set the default option
  }
});
</script>
```

Additionally, if you believe this feature should be a part of the Kendo UI Grid for jQuery built-in functionality, consider voting for the feature request at this link: [Default Paste Mode Feature Request](https://feedback.telerik.com/aspnet-core-ui/1670766-default-paste-mode).

## See Also

- [Grid dataBound event API](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound)
- [DropDownList Overview](https://docs.telerik.com/kendo-ui/controls/editors/dropdownlist/overview)
- [Feature Request for Default Paste Mode](https://feedback.telerik.com/aspnet-core-ui/1670766-default-paste-mode)
