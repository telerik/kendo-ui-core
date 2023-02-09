---
title: Expand Asynchronously the Selected TreeView Nodes 
page_title: Expand Asynchronously the Selected TreeView Nodes
description: "Learn how to asynchronously expand the selected node of the Kendo UI for jQuery TreeView."
previous_url: /controls/navigation/treeview/how-to/nodes/node-async-expand
slug: howto_asynchronous_expand_selected_node
tags: telerik, kendo, jquery, treeview, expand, selected, nodes, asynchronously
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

How can I expand a selected node in the Kendo UI for jQuery TreeView?

## Solution

The TreeView enables you to expand the selected node when `loadOnDemand` is set to `true`. To achieve the desired scenario, load the child nodes asynchronously in the child data source by using the [`load()`](https://docs.telerik.com/kendo-ui/api/javascript/data/node/methods/load) method of the node.

```dojo
<div id="container">
    <button id='expandNode' class="k-button k-button-md k-button-rectangle k-rounded-md k-button-solid k-button-solid-primary">Expand selected node</button>
    <div id="treeview"></div>
</div>

<script>
    $(document).ready(function() {
        var OrderDetails = {
            type: "odata",
            transport: {
                read: {
                    url: function(options) {
                        return kendo.format(
                            "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products({0})/Order_Details",
                            options.ProductID
                        );
                    }
                }
            },
            schema: {
                model: {
                    hasChildren: function() {
                        return false;
                    }
                }
            }
        };

        var Products = {
            type: "odata",
            schema: {
                model: {
                    id: "ProductID",
                    hasChildren: "Order_Details",
                    children: OrderDetails
                }
            },
            transport: {
                read: {
                    url: function(options) {
                        return kendo.format(
                            "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories({0})/Products",
                            options.CategoryID
                        );
                    }
                }
            }
        };

        var Categories = new kendo.data.HierarchicalDataSource({
            type: "odata",
            transport: {
                read: {
                    url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
                }
            },
            schema: {
                model: {
                    hasChildren: "Products",
                    id: "CategoryID",
                    children: Products
                }
            }
        });

        $("#treeview").kendoTreeView({
            loadOnDemand:true,
            dataSource: Categories,
            dataTextField: ["CategoryName", "ProductName", "OrderID"]
        });

        $("#expandNode").on("click", function(e) {
            var tree = $("#treeview").data("kendoTreeView"),
                selected = tree.select(),
                dataItem = tree.dataItem(selected);

            var load = function (item) {
                var that = this,
                    chain = $.Deferred().resolve();

                chain = chain.then(function () {
                    that.expand(that.findByUid(item.uid));
                    return item.load();
                }).then(function () {
                    if (item.hasChildren) {
                        var childrenChain = $.Deferred().resolve();

                        item.children.data().forEach(function (child) {
                            (function (child) {
                                childrenChain = childrenChain.then(function () {
                                    return load.bind(that)(child);
                                })
                            })(child)
                        })

                        return childrenChain;
                    }
                });

                return chain;
            }

            if (selected.length == 0) {
                alert("Select item first!");
                return;
            }

            load.bind(tree)(dataItem);
        });
    });
</script>
```

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
