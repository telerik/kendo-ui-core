---
title: Prevent Multiple Selection in the DropDownTree
description: Learn how to prevent multiple selection in the Kendo UI Editor.
type: how-to
page_title: Prevent Multiple Selection - Kendo UI Editor for jQuery
slug: dropdowntree-prevent-multiple-selection
tags: dropdowntree, prevent, multiple, selection
res_type: kb
component: dropdowntree
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® DropDownTree for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with the 2019.1.220 version</td>
 </tr>
</table>

## Description

How can I prevent multiple selection in the DropDownTree?

## Solution

1. Handle the `check` event of the embedded TreeView.
1. Save the UID of the checked node in a variable.
1. On checking a new node, uncheck the previously checked node.

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

* [DropDownTree API Reference](/api/javascript/ui/dropdowntree)
