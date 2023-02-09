---
title: DropDownTree get checked TreeView nodes recursively
description: Perform a recursive search of the TreeView to get checked nodes
type: how-to
page_title: DropDownTree get checked TreeView nodes recursively
slug: dropdowntree-get-checked-treeview-nodes
tags: dropdowntree, checked, treeview, node, recursion
ticketid: 1408344
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Spreadsheet for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2021.1.330</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description
How can I get all the checked nodes of the TreeView? I need to only get the parent, if all children are checked.

## Solution
- Define the **getCheckedItems** method
  1. Add a new method called `getCheckedItems` to the TreeView
  1. In its definition get the nodes of the TreeView by utilizing the `[view](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/view)` method of the `dataSource`
  1. Return **getCheckedNodes(nodes)**

- Define **getCheckedNodes**s
  1. Iterate over the array of nodes passed as a parameter
  1. If the node is checked push it into a new array of checked nodes
  1. Else check if it has children
  1. If yes set the variable **childCheckedNodes** to be equal to the getCheckedNodes() and use the `view` of the child node as a parameter
  1. If the recursive call returns any checked nodes concatenate the childCheckedNodes array to the **checkedNodes** array defined earlier
  1. return the **checkedNodes** array

- Show the results
  1. Iterate over the array returned by `getCheckedItems`
  1. If it has any items append their text to a DOM element

```dojo
<input id="dropdowntree" style="width: 400px;" />
    <hr/>
    <button id="clickme">Click Me</button>
    <div id="results">
      <h4>Checked Items</h4>
      <ul></ul>
    </div>
    <script>
        kendo.ui.TreeView.prototype.getCheckedItems = (function(){

        function getCheckedItems(){
          var nodes = this.dataSource.view();
          return getCheckedNodes(nodes);
        }

        function getCheckedNodes(nodes){
          var node, childCheckedNodes;
          var checkedNodes = [];
					console.log("Nodes",nodes)
          for (var i = 0; i < nodes.length; i++) {
            node = nodes[i];
            if (node.checked) {
              checkedNodes.push(node);
            }
            else{
              if (node.hasChildren) {
                console.log(node.children.view())
                childCheckedNodes = getCheckedNodes(node.children.view());
                if (childCheckedNodes.length > 0){
                  checkedNodes = checkedNodes.concat(childCheckedNodes);
                }
              }
            }
          }

          return checkedNodes;
        }

        return getCheckedItems;
      })();
      
      $("#dropdowntree").kendoDropDownTree({
        dataSource: [
          {
            text: "Furniture", value: 1, expanded: true, items: [
              { text: "Tables & Chairs", value: 11 },
              { text: "Sofas", value: 12 },
              { text: "Occasional Furniture", value: 13 }
            ]
          },
          {
            text: "Decor", value: 2, items: [
              { text: "Bed Linen",  value: 21 },
              { text: "Curtains & Blinds",  value: 22 },
              { text: "Carpets", value: 23 }
            ]
          }
        ],
        dataTextField: "text",
        dataValueField: "value",
        checkboxes: { checkChildren: true },
        tagMode: "single",
        loadOnDemand: true
      });
      
      // Get the TreeView inside the DropDownTree
      var dropDownTree = $("#dropdowntree").getKendoDropDownTree();
      var treeview = dropDownTree.treeview;
      
      // Button handler
      // --------------

      $("#clickme").click(function(e){
        e.preventDefault();
        var $res = $("#results ul");
        $res.html("");

        var items = treeview.getCheckedItems();

        if (items.length === 0){
          $("<li>(nothing checked)</li>").appendTo($res);
        } else {
          for (var i=0; i< items.length; i++){
            $("<li>" + items[i].text + "</li>").appendTo($res);
          }
        }
      });
    </script>
```


## Notes
This article is based on [this blogpost](https://www.telerik.com/blogs/how-to-get-the-checked-items-from-a-treeview-with-checkboxes)

