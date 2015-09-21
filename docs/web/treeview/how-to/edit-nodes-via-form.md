---
title: Edit nodes via form
page_title: Edit nodes via form
description: Edit nodes via form
---

# Edit nodes via form

The example below demonstrates how to allow users to edit nodes via a standalone form

#### Example:

```html
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
                        class="k-textbox"></label>
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
