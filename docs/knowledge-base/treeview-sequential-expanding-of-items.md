---
title: Expand TreeView Items Sequentially with loadOnDemand
description: An example on how to sequentially expand TreeView items with loadOnDemand
type: how-to
page_title: Sequentially Expand Items with loadOnDemand | Kendo UI TreeView for jQuery
slug: treeview-sequentially-expand-items-with-loadondemand
tags: kendo, kendo-ui, treeview, sequentially, expand, items, loadondemand
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

How can I sequentially expand all TreeView items when `loadOnDemand` is set to `true`?

## Solution

Subscribe to the `dataBound` event of the TreeView and [`expand()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview/methods/expand) all currently loaded nodes.

```dojo
<div id="content">
    <div id="treeview"></div>
    <button id="expandItems" class="k-button k-primary">Expand all items</button>
</div>

<script>
$(document).ready(function() {
    var OrderDetails = {
        type: "odata",
        transport: {
            read: {
                url: function(options) {
                    return kendo.format(
                        "//demos.telerik.com/kendo-ui/service/Northwind.svc/Products({0})/Order_Details",
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
                        "//demos.telerik.com/kendo-ui/service/Northwind.svc/Categories({0})/Products",
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
                url: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
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
        dataSource: Categories,
        dataBound: function(e){
            if (e.node) {
                this.expand(e.node.find('.k-item'));
            }
        },
        dataTextField: ["CategoryName", "ProductName", "OrderID"]
    });

    $("#expandItems").on("click", function(e) {
        $("#treeview").data().kendoTreeView.expand($('.k-item'));
    });
});
</script>
```

## See Also

* [API Reference of the TreeView](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview).
