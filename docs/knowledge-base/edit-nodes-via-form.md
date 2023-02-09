---
title: Edit TreeView Nodes with a Form
page_title: Edit TreeView Nodes with a Form
description: "Learn how to allow users to edit nodes by using a standalone form in the Kendo UI for jQuery TreeView widget."
slug: howto_editnodesviaform_treeview
previous_url: /controls/navigation/treeview/how-to/editing/edit-nodes-via-form
tags: telerik, kendo, jquery, treeview, edit, nodes, with, standalone, form
component: treeview
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® TreeView for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I enable users to edit the nodes of the Kendo UI for jQuery TreeView?

## Solution

The following example demonstrates how to achieve this behavior by using a standalone form.

```dojo
  <!-- TreeView -->
  <div class="box-col" id="tree">
    <h4>Employees</h4>
    <div data-role="treeview" data-text-field="name"
         data-bind="source: treeData, events: { select: change }"></div>
  </div>

  <!-- edit form -->
  <div class="box-col" id="edit-form" data-bind="visible: selectedItem.name">
    <h4>Editing employee: <span data-bind="text: selectedItem.name"></span></h4>

    <label>Name: <input data-bind="value: selectedItem.name"
                        data-role="textbox"></label>
    <label>Age: <input data-bind="value: selectedItem.age"
                       data-role="numerictextbox"
                       data-format="#"></label>
  </div>

  <script>
    kendo.bind("body", {
        selectedItem: {},
        change: function(e) {
            this.set("selectedItem", e.sender.dataItem(e.node));
        },
        treeData: new kendo.data.HierarchicalDataSource({
            data: [
                { name: "John Smith", age: 34 },
                { name: "Jane Doe", age: 30, expanded: true, items: [
                    { name: "Peter Smith", age: 34 },
                    { name: "Gordon Brown", age: 28 }
                ] },
                { name: "Maxwell Smith", age: 48 }
            ]   
        })  
    });
  </script>
  <style>
    .k-treeview .k-in {
      padding: 5px;
    }
    label {
      display: block;
    }
    .box-col { float: left; width: 250px; }
  </style>
```

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
