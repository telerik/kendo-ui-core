---
title: Prevent Multiple Selection in the DropDownTree
description: An example on how to prevent multiple selection in the Kendo UI Editor.
type: how-to
page_title: Prevent Multiple Selection | Kendo UI Editor
slug: dropdowntree-prevent-multiple-selection
tags: dropdowntree, prevent, multiple, selection
res_type: kb
component: dropdowntree
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Kendo UI DropDownTree</td>
 </tr>
 <tr>
  <td>Kendo UI version</td>
  <td>Created with the 2019.1.220 version</td>
 </tr>
</table>

## Description

How to prevent multiple selection in the DropDownTree?

## Solution

Handle the `check` event of the embedded TreeView. Save the UID of the checked node in a variable. On checking a new node, uncheck the previously checked node:

```dojo
    <div id="example"> 
        <input id="dropdowntree" />

        <script>
            var checkedUid = "";

            $("#dropdowntree").kendoDropDownTree({
                dataSource: [
                    {
                    text: "Root1", items: [
                        { text: "item1" },
                        { text: "item2" },
                        { text: "item3" }
                        ]
                    },
                    {
                    text: "Root2", items: [
                        { text: "item1" },
                        { text: "item2" },
                        { text: "item3" }
                        ]
                    }
                ],
                checkboxes: true,
                treeview: {
                    check: function(e) {
                        var dataItem = e.sender.dataItem(e.node);


                        if(dataItem.checked && checkedUid != "") {
                            var oldChecked = e.sender.findByUid(checkedUid);
                            e.sender.dataItem(oldChecked).set("checked", false);
                        }

                        if(dataItem.checked) {
                            checkedUid = dataItem.uid;
                        }
                        else {
                            checkedUid = "";
                        }
                    }
                }
            });
        </script>
    </div>
```

## See Also

* [DropDownTree API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdowntree)