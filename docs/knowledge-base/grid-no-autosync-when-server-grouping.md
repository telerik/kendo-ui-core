---
title: AutoSync Does Not Work in Grid When Using Server Grouping
description: When the Kendo UI Grid is grouped by using the server-side grouping, the AutoSync does not work during editing.
type: troubleshooting
page_title: Grid Cannot AutoSync Changes If It Is Grouped by Using Server-Side Grouping | Kendo UI Grid for jQuery
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

1. Create a Grid with the `editable: true` and `groupable: true` settings.
1. In the DataSource of the Grid, set `autoSync: true` and `serverGrouping: true`.
1. Group the Grid by columns.
1. Try to change a cell value in the Grid.

The Grid does not sync the changed value with the server. The auto-sync starts working if you ungroup the Grid.

## Cause

This behavior is a limitation in the Grid. The default `"incell"` editing mode combined with the `autoSync: true` DataSource setting is not supported when you use server-side grouping in the Grid.

## Suggested Workarounds

You can either:
* [Disable server operations](#disabling-server-operations), or
* [Save values manually](#saving-values-manually).

### Disabling Server Operations

In the `dataSource` configuration of the Grid, set `serverGrouping: false`. For the Kendo UI Grid for ASP.NET MVC, set `ServerOperations(false)` in the `DataSource` configuration.

> This approach might decrease client-side performance especially when the Grid handles large amounts of data.

### Saving Values Manually

When the Grid is grouped, manually call the [`saveChanges()`](/api/javascript/ui/grid/methods/savechanges) method of the Grid in the [`cellClose`](/api/javascript/ui/grid/events/cellclose) event. This approach guarantees that the changes which are made in the cell before it was closed will be sent to the server.

```
    function onCellClose(e) {
        var grid = e.sender;
        if (grid.dataSource.group().length > 0) {
            grid.saveChanges();
        }
    }
```
