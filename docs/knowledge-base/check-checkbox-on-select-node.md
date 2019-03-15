---
title: Check and Uncheck Checkbox in TreeView on Node Selection
description: An example on how to check and uncheck a checkbox by selecting a node in a Kendo UI TreeView.
type: how-to
page_title: Check and Uncheck Checkboxes on Node Selection | Kendo UI TreeView
slug: check-checkbox-on-select-node
tags: check, checkbox, select, node, treeview
ticketid: 1135299
res_type: kb
component: treeview
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

How to check and uncheck checkboxes in a TreeView on selecting a node?

## Solution

In the handler of the TreeView `select` event, find the checkbox of the selected node and check or uncheck it accordingly by calling the `jQuery prop()` method.

```dojo
	<div id="treeview"></div>
    <script>
        $("#treeview").kendoTreeView({
            checkboxes: true,
            select: onSelect,
            dataSource: [{
                id: 1, text: "My Documents", expanded: true, items: [
                    {
                        id: 2, text: "Kendo UI Project", expanded: true, items: [
                            { id: 3, text: "about.html" },
                            { id: 4, text: "index.html"},
                            { id: 5, text: "logo.png"}
                        ]
                    },
                    {
                        id: 6, text: "New Website", expanded: true, items: [
                            { id: 7, text: "mockup.jpg" },
                            { id: 8, text: "Research.pdf"},
                        ]
                    },
                    {
                        id: 9, text: "Reports", expanded: true, items: [
                            { id: 10, text: "February.pdf" },
                            { id: 11, text: "March.pdf" },
                            { id: 12, text: "April.pdf" }
                        ]
                    }
                ]
            }]
        });

        function onSelect(e) {
 		   e.preventDefault();						
 		   var checkbox = $(e.node).find(":checkbox");
 		   var checked = checkbox.prop("checked");
 		   checkbox.prop("checked", !checked); 						 
        }
    </script>
```
