---
title: Asynchronously Clone TreeView Nodes and All Their Children
description: An example on how to asynchronously clone a Kendo UI TreeView node together with all its children.
type: how-to
page_title: Clone TreeView Nodes and All Their Children | Kendo UI TreeView for jQuery
slug: treeview-clone-node-async
tags: kendo, kendo-ui, treeview, clone, node, all, children
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2018.2.516</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>TreeView for Progress® Kendo UI®</td>
	</tr>
</table>

## Description

How can I copy a TreeView node along with all its children when `loadOnDemand` is set to `true`?

## Solution

Asynchronously load the child nodes in the child data source by using the [`load()`](https://docs.telerik.com/kendo-ui/api/javascript/data/node/methods/load) method of the node.

```dojo
<div id="content">
    <button id="cloneNode" class="k-button k-primary">Clone selected node and append it to the TreeView</button>
    <div id="treeview"></div>
</div>

<script>
$(document).ready(function() {
    var homogeneous = new kendo.data.HierarchicalDataSource({
        transport: {
            read: {
                url: "https://demos.telerik.com/kendo-ui/service/Employees",
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
        dataTextField: "FullName"
    });

    $("#cloneNode").on("click", function(e) {
        var tree = $("#treeview").data("kendoTreeView"),
            selected = tree.select();

        if (selected.length == 0) {
            alert("Select item first!");
            return;
        }

        var dataItem = tree.dataItem(selected);

        var load = function (item) {
            var that = this,
                chain = $.Deferred().resolve();

            chain = chain.then(function () {
                return item.load();
            }).then(function () {
                if (item.hasChildren) {
                    var childrenChain = $.Deferred().resolve();

                    item.children.data().forEach(function (child) {
                        (function (child) {
                            childrenChain = childrenChain.then(function () {
                                return load(child);
                            });
                        })(child);
                    });
                    return childrenChain;
                }
            });

            return chain;
        }

        var updateIds = function (dataItem) {
          dataItem.id = kendo.guid();

            if (dataItem.items) {
                dataItem.items.forEach(function (child) {
                    updateIds(child);
                })
            }
        }

        var item = dataItem.toJSON();
            item.hasChildren = true;

            tree.append(
                item,
                null,
                function (e) {
                    var dataItem = tree.dataItem(e);

                    load.bind(tree)(tree.dataItem(e)).then(function () {
                        updateIds(dataItem);
                    });
                }
            );

        load(dataItem);
    });
});
</script>
```

## See Also

* [API Reference of the TreeView](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview).
