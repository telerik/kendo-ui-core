---
title: Expand and Collapse All Nodes in the TreeList
page_title: Expand and Collapse All Nodes in the TreeList - Kendo UI for jQuery
description: "Learn how to expand or collapse all nodes of the Kendo UI for jQuery TreeList on initial load and from toolbar buttons."
type: how-to
slug: treelist-expand-collapse-all-nodes
tags: telerik, kendo, jquery, treelist, expand, collapse, all, nodes, toolbar, hierarchy
res_type: kb
components: ["treelist"]
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® TreeList for jQuery</td>
		</tr>
		<tr>
			<td>Version</td>
			<td>{{ site.cdnVersion }}</td>
		</tr>
	</tbody>
</table>

## Description

How can I expand all nodes of the Kendo UI for jQuery TreeList, including the nested levels, when the TreeList loads and from a button in its toolbar? How can I collapse all nodes again?

This KB also answers the following questions:

- Is there a method that expands the whole TreeList hierarchy at once?
- How can I add an expand all button to the TreeList toolbar?

## Solution

The TreeList [`expand`](/api/ui/treelist/methods/expand) and [`collapse`](/api/ui/treelist/methods/collapse) methods work with a single row. The TreeList does not provide a method that expands or collapses the whole hierarchy at once.

### Expand All Nodes on Initial Load

Set the `expanded` field of every data item that has children to `true`. The TreeList renders these items expanded.

### Expand or Collapse All Nodes on Demand

To expand or collapse all nodes after the TreeList is rendered, use the following approach:

1. Add buttons to the [`toolbar`](/api/ui/treelist/configuration/toolbar) of the TreeList.
1. In the `click` handler of a button, get the TreeList items by using the [`items`](/api/ui/treelist/methods/items) method and keep the ones whose [data item](/api/ui/treelist/methods/dataitem) has children and is not in the requested state.
1. Call `expand` or `collapse` for one of these rows and repeat until no such rows remain. The TreeList re-renders after each call, so the remaining rows are determined again on every pass, and the nested levels are included.

The example binds the TreeList to local data. For [remote data binding]({% slug databinding_kendoui_treelist %}), the children load when a node is expanded, and the `expand` method returns a promise that is resolved once the data is loaded.

The following example demonstrates how to expand and collapse all nodes from the TreeList toolbar. The second TreeList expands all nodes on initial load.

```dojo
<div id="treeList"></div>
<div id="treeList2"></div>
<script>
  function toggleAll(treeList, expand) {
    var pending = treeList.items().filter(function() {
      var dataItem = treeList.dataItem(this);
      return dataItem.hasChildren && dataItem.expanded !== expand;
    });

    if (pending.length) {
      if (expand) {
        treeList.expand(pending.first());
      } else {
        treeList.collapse(pending.last());
      }
      toggleAll(treeList, expand);
    }
  }

  $("#treeList").kendoTreeList({
    columns: [
      { field: "name" },
      { field: "age" }
    ],
    toolbar: "<button id='expandAll' class='k-button'>Expand all</button><button id='collapseAll' class='k-button'>Collapse all</button>",
    dataSource: [
      { id: 1, parentId: null, name: "Jane Doe", age: 22 },
      { id: 2, parentId: 1, name: "John Doe", age: 24 },
      { id: 3, parentId: 1, name: "Jenny Doe", age: 3 },
      { id: 4, parentId: 2, name: "test user", age: 34 },
      { id: 5, parentId: null, name: "User1", age: 24 },
      { id: 6, parentId: 5, name: "User2", age: 13 },
      { id: 7, parentId: 6, name: "User4", age: 30 }
    ]
  });

  $("#treeList").on("click", "#expandAll", function() {
    toggleAll($("#treeList").data("kendoTreeList"), true);
  });

  $("#treeList").on("click", "#collapseAll", function() {
    toggleAll($("#treeList").data("kendoTreeList"), false);
  });

  $("#treeList2").kendoTreeList({
    columns: [
      { field: "name" }
    ],
    dataSource: [
      { id: 1, parentId: null, name: "Jane Doe", expanded: true },
      { id: 2, parentId: 1, name: "John Doe", expanded: true },
      { id: 4, parentId: 2, name: "test user" },
      { id: 5, parentId: null, name: "User1", expanded: true },
      { id: 6, parentId: 5, name: "User2", expanded: true },
      { id: 7, parentId: 6, name: "User4" }
    ]
  });
</script>
```

## See Also

* [TreeList Overview]({% slug overview_kendoui_treelist_widget %})
* [Open Root Nodes of the TreeList]({% slug treelist-rootnodes-expand-when-load %})
* [`expand` Method of the TreeList](/api/ui/treelist/methods/expand)
* [`collapse` Method of the TreeList](/api/ui/treelist/methods/collapse)
* [JavaScript API Reference of the TreeList](/api/ui/treelist)
