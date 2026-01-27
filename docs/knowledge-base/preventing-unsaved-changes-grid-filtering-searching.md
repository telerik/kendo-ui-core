---
title: Preventing Unsaved Changes During Grid Filtering and Searching
description: Learn how to detect unsaved changes and prevent losing edits when performing filtering or searching in the UI for ASP.NET Core Grid.
type: how-to
page_title: Handling Unsaved Changes in Grid Filtering and Searching
meta_title: Handling Unsaved Changes in Grid Filtering and Searching
slug: preventing-unsaved-changes-grid-filtering-searching
tags: grid, ui-for-asp-net-core, datasource, haschanges, filter-event, searchbox, unsaved-changes
res_type: kb
ticketid: 1708432
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> 
Grid for UI for ASP.NET Core
</td>
</tr>
<tr>
<td> Version </td>
<td> 2025.4.1321 </td>
</tr>
</tbody>
</table>

## Description

When using the [Grid](https://www.telerik.com/aspnet-core-ui/documentation/html-helpers/data-management/grid/overview) for UI for ASP.NET Core with `.ServerOperation(true)`, filtering or searching refreshes the data and clears any unsaved client-side edits. Preventing the user from losing changes during these actions requires detecting unsaved changes and prompting the user before proceeding.

This knowledge base article also answers the following questions:
- How do I prevent losing changes during Grid filtering?
- How can I handle unsaved changes when searching in the Grid?
- How to detect and prompt for unsaved changes in the Grid?

## Solution

To achieve this, intercept the Grid’s filtering and searching actions, detect unsaved changes using the DataSource `.hasChanges()` method, and prompt the user. Cancel the operation if necessary.

### Implementation

Use the following JavaScript code to handle unsaved changes during filtering and searching:

```javascript
function onFilter(e) {
    var grid = e.sender;
    if (grid.dataSource.hasChanges()) {
        if (!confirm("You have unsaved changes. Do you want to continue and lose those changes?")) {
            e.preventDefault(); // Cancel the filter operation
        }
    }
}

$(document).ready(function () {
    var grid = $('#grid').data('kendoGrid');
    
    // Intercept search event (assuming default search toolbar)
    $("#grid .k-toolbar .k-searchbox").on("keydown", function (e) {
        if (grid.dataSource.hasChanges()) {
            if (!confirm("You have unsaved changes. Do you want to continue and lose those changes?")) {
                e.preventDefault(); // Prevent search
                $('.k-searchbox').val(""); // Optionally clear the input
            }
        }
    });
});
```

### Key Points
1. Attach the `onFilter` function to the Grid’s [`filter`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/grid/events/filter) event.
2. Add a `keydown` event handler to the search box.
3. Use the [`.hasChanges()`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/data/datasource/methods/haschanges) method to check for unsaved edits.
4. Prompt the user and cancel the operation if necessary.

## See Also

- [Grid Overview](https://www.telerik.com/aspnet-core-ui/documentation/html-helpers/data-management/grid/overview)
- [Repl Example](https://netcorerepl.telerik.com/cgaFmKki50HcKOTB56)
