---
title: Persist Dirty Fields in the Local Storage
description: An example on how to persist dirty fields data in the localStorage when working with the Kendo UI Grid.
type: how-to
page_title: Save Dirty Data in Local Storage | Kendo UI Grid
slug: grid-persist-dirty-data-localstorage
tags: grid, dirty, editing, localstorage, persist
ticketid: 1147441
res_type: kb
component: grid
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2017.3 1026</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI Grid</td>
	</tr>
</table>


## Description

How can I save the dirty content of the Grid in the `localStorage` and restore it when the page reloads?

## Solution

1. In the [`save`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/save) event handler of the Grid, save the fields data in an object in the `localStorage`.
1. In the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event handler of the Grid, set the saved values.

```dojo
<div id="grid"></div>
<script>
    $(document).ready(function() {

        var lsChanges = localStorage["kendo-changes"];
        var changes = {};
        var firstDB = true;
        if (lsChanges) {
            changes = JSON.parse(lsChanges);
        }


        $("#grid").kendoGrid({
            columns: [{
                    field: "name"
                },
                {
                    field: "age"
                },
                {
                    command: "destroy"
                }
            ],
            dataSource: {
                data: [{
                        id: 1,
                        name: "Jane Doe",
                        age: 30
                    },
                    {
                        id: 2,
                        name: "John Doe",
                        age: 33
                    }
                ],
                schema: {
                    model: {
                        id: "id"
                    }
                }
            },
            editable: true,
            sortable: true,
            dataBound: function(e) {
                if (firstDB) {
                    firstDB = false;
                    var items = e.sender.items();

                    items.each(function() {
                        var row = $(this);
                        var dataItem = e.sender.dataItem(row);

                        if (changes[dataItem.id]) {
                            for (prop in changes[dataItem.id]) {
                                var cell = row.find("td").eq(getColumnIndexes(e.sender, prop));
                                dataItem[prop] = changes[dataItem.id][prop];
                                dataItem.dirty = true;
                                dataItem.dirtyFields[prop] = true;
                            }
                        }
                    });

                    e.sender.refresh();
                }
            },
            save: function(e) {
                for (prop in e.values) {
                    if (!changes[e.model.id]) {
                        changes[e.model.id] = {};
                    }
                    changes[e.model.id][prop] = e.values[prop];
                    localStorage["kendo-changes"] = kendo.stringify(changes);
                }
            }
        });


        function getColumnIndexes(grid, columnName) {
            var columns = {};
            var cellIndex = -1;
            grid.columns.forEach(function(el, index) {
                if (el.field == columnName) {
                    cellIndex = index;
                }
            })
            return cellIndex;
        }
    });
</script>
```
