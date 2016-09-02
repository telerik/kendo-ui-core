---
title: Edit Nodes via Form
page_title: Edit Nodes via Form | Kendo UI TreeView
description: "Learn how to allow users to edit nodes via a standalone form in a Kendo UI TreeView widget."
slug: howto_editnodesviaform_treeview
---

# Edit Nodes via Form

The example below demonstrates how to allow users to edit nodes via a standalone form in a Kendo UI TreeView widget.

###### Example

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

## See Also

Other articles on the Kendo UI TreeView:

* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
* [How to Check Nodes Programmatically]({% slug howto_checknodeprogramatically_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})

For more runnable examples on the Kendo UI TreeView, browse its [**How To** documentation folder]({% slug howto_editnodesviaform_angularjs_treeview %}).
