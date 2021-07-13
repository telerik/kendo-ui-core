---
title: Filter Only Leaf Nodes In DropDownTree
description: An example on how to filter only leaf nodes in DropDownTree .
type: how-to
page_title: Filter Only Leaf Nodes DropDownTree | Kendo UI DropDownTree for jQuery
slug: dropdowntree-filter-only-leaf-nodes
tags: kendo, kendoui, dropdowntree, filter
res_type: kb
component: dropdowntree
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI DropDownTree</td>
 </tr>
</table>

## Description

How can I perform filtering only on the leaf nodes of Kendo DropDownTree?

## Solution

1. Subscribe to the `filtering` event of the DropDownTree.
1. Check the applied filter.
1. Prevent the default behavior.
1. Filter only the leaf ndoes from the dataSource 

```dojo
<div id="cap-view" class="demo-section k-content">
    <h4>Select one or more items</h4>
    <input id="dropdowntree" style="width: 100%;" />
</div>
<style>
    .highlighted-item {
      background-color: yellowgreen;
    }
</style>
<script>
  	$(document).ready(function () {
    // create kendoDropDownTree from input HTML element
    $("#dropdowntree").kendoDropDownTree({
      	placeholder: "Select ...",
      	filter: "contains",
      	filtering: function (e) {
        	var filter = e.filter;

        	e.preventDefault()

        	e.sender._filtering = true;
        	e.sender.dataSource.filter([
          		{ field: "hasChildren", operator: "eq", value: false },
          			filter
        		]);

      	},
      	dataSource: [
        	{
        	  text: "USA", expanded: true,  items: [
        	    {
        	      text: "Alabama", items: [
        	        { text: "Birmingham" },
        	        { text: "Alabama Child"}
        	      ]
        	    }
        	  ]
        	},
        	{
        	  text: "UK", items: [
        	    { text: "Birmingham" }
        	  ]
        	}
      	]
    });
  });
</script>
```

## See Also

* [API Reference of the DropDownTree](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdowntree).
