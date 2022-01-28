---
title: Programmatically Expand Node and Parents
description: An example on how to find and expand the node by given node text in the Kendo UI TreeView.
type: how-to
page_title: Expand Node Parents | Kendo UI TreeView for jQuery
slug: treeview-expand-node-parents-by-text
tags: treeview
ticketid: 1153697  
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI TreeView</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I expand all parent nodes by given child node text?

## Solution

1. Find the node by its text.
1. If the node has a parent, expand the parent.
1. Repeat the check for a parent node until you cover all existing parent nodes.

```dojo
<div class="demo-section k-content">
	<div id="treeview"></div>             
</div>
<div>
    <input type="text" id="text" placeholder="Ex. enter 'Robert King'"/>
    <button type="submit" onclick="expand()">Expand</button>
</div>
<script>
    var serviceRoot = "https://demos.telerik.com/kendo-ui/service";
    homogeneous = new kendo.data.HierarchicalDataSource({
        transport: {
          read: {
            url: serviceRoot + "/Employees",
            dataType: "jsonp"
          }
        },
        schema: {
          model: {
            id: "EmployeeId",
            hasChildren: "HasEmployees"
          }
        }
    });

    $("#treeview").kendoTreeView({
        dataSource: homogeneous,
        loadOnDemand: false,
        dataTextField: "FullName"
    });

    function expand(){
        var text = $('#text').val();     
        var treeview = $("#treeview").data("kendoTreeView");

        var item = treeview.findByText(text);

        if(item.length > 0){
          treeview.select(item)
          var parent = treeview.parent(item);
          while(parent && parent.length > 0){          	
            treeview.expand(parent);
            parent = treeview.parent(parent);
          }        
        }        
    }
</script>
```
