---
title: Expand Selected Nodes Asynchronously
page_title: Expand Selected Nodes Asynchronously | Kendo UI TreeView
description: "Learn how to asynchronously expand the selected node of the Kendo UI TreeView."
slug: howto_asynchronous_expand_selected_node
---

# Expand Selected Nodes Asynchronously

The TreeView enables you to expand the selected node when `loadOnDemand` is set to `true`.

Load the child nodes asynchronously in the child data source by using the [`load()`](https://docs.telerik.com/kendo-ui/api/javascript/data/node/methods/load) method of the node.

###### Example

```dojo
<div id="container">
    <button id='expandNode' class="k-button k-primary">Expand selected node</button>
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

* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
* [How to Check Nodes Programmatically]({% slug howto_checknodeprogramatically_treeview %})
* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})

For more runnable examples on the Kendo UI TreeView, browse its [**How To** documentation folder]({% slug howto_bindcheckedstatecustommodelfields_angulartreeview %}).
