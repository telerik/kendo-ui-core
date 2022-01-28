---
title: Open Root Nodes of the TreeList
description: Expand the root nodes of the Kendo UI TreeList when the page is loaded.
type: how-to
page_title: Expand the Parent Nodes | Kendo UI TreeList
slug: treelist-rootnodes-expand-when-load
position: 
tags: treelist, expand, load, parent, node, rootnode, open
ticketid: 1432660
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.3.917</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>TreeList for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description
How can I expand all the root nodes of the Kendo UI TreeList when the component is loaded?

## Solution
Use the [rootNodes](https://docs.telerik.com/kendo-ui/api/javascript/data/treelistdatasource/methods/rootnodes) method to get the array of all the root nodes and perform the [expand](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist/methods/expand) method on it. For example:

```javascript
var treelist1 = $("#treeList").data("kendoTreeList");
var data = treelist1.dataSource.rootNodes();
for(let i = 0; i < data.length; i++){
  var row = treelist1.content.find("tr[data-uid=" + data[i].uid + "]")
  treelist1.expand(row);
}
```

#### Example
```dojo
<div id="treeList"></div>
<script>
  $("#treeList").kendoTreeList({
    columns: [
      { field: "name" },
      { field: "age" }
    ],
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

  var treelist1 = $("#treeList").data("kendoTreeList");
  var data = treelist1.dataSource.rootNodes();
  for(let i = 0; i < data.length; i++){
    var row = treelist1.content.find("tr[data-uid=" + data[i].uid + "]")
    treelist1.expand(row);
  }
</script>
```

## See Also
- [rootNodes](https://docs.telerik.com/kendo-ui/api/javascript/data/treelistdatasource/methods/rootnodes)
- [expand](https://docs.telerik.com/kendo-ui/api/javascript/ui/treelist/methods/expand)
