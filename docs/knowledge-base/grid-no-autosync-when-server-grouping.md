---
title: AutoSync Does Not Work in Grid When Using Server Grouping
description: When the Grid is grouped using server-side grouping, AutoSync does not work during editing
type: troubleshooting
page_title: Grid Cannot AutoSync Changes if it is Grouped Using Server-Side Grouping
slug: grid-no-autosync-when-server-grouping
tags: grid, editing, grouping
ticketid: 1145291, 1144037
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Grid</td>
	</tr>
</table>


## Description

I have the `autoSync` option set to `true` in the Grid. If I enable server-side grouping and group the Grid by a column, the auto-sync functionality stops working.

## Steps to Reproduce

1. Create a Grid with `editable: true` and `groupable: true` settings.
1. Set `autoSync: true` and `serverGrouping: true` in the Grid DataSource.
1. Group the Grid by a column.
1. Try to change a cell value in the Grid.

The Grid does not sync the changed value to the server. Auto-sync starts working if you un-group the Grid.

## Cause
This is a limitation in the Grid widget. The default `"incell"` editing mode combined with the DataSource `autoSync: true` setting is not supported when using server-side grouping in the Grid.

## Suggested Workarounds

There are a couple of workarounds that you can try:

### Disable server operations

The most straightforward workaround is to disable server-side grouping by setting `serverGrouping: false` in the Grid `dataSource` configuration. For the MVC Grid, you need to set `ServerOperations(false)` in the `DataSource` configuration. 

This workaround, could lead to decrease in client-side performance of the Grid, especially if handling large amounts of data.

### Save values manually

Another option is to manually call the Grid [`saveChanges()`](/api/javascript/ui/grid#methods-saveChanges) method in the [`cellClose`](/api/javascript/ui/grid#events-cellClose) event, when the Grid is grouped:

```
    function onCellClose(e) {
        var grid = e.sender;
        if (grid.dataSource.group().length > 0) {
            grid.saveChanges();
        }
    }
```

This ensures that changes made in the Grid cell before it was closed will be sent to the server.