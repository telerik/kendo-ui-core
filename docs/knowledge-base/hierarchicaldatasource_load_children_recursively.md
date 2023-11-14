---
title: Recursively Load Child Items of HierarchicalDataSource  
page_title: Recursively Load All Child Items - Kendo UI for jQuery HierarchicalDataSource
description: "Learn how to recursively load all child items of the Kendo UI HierarchicalDataSource for jQuery."
slug: recursively_load_child_items_hierarchicaldatasource
tags: hierarchicaldatasource, recursively, child, items
component: hierarchicaldatasource
type: how-to
ticketid: 1524867
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® HierarchicalDataSource for jQuery</td>
 </tr>
</table>

## Description

In this article, you will find out how to recursively load all child data items of a HierarchicalDataSource.

## Solution

* Create a recursive function, which first checks if the current node is not loaded and respectively loads the node. Then, iterate over the collection that contains the children of that node and call the recursive function for each child.
```js
function loadNode(node) {
    if(!node.loaded()) {
      node.load().then(function(){
            for (var i = 0; i < node.collection.length; i++) {
                loadNode(node.collection[i]);
            }
      });
    }
}
```
* In a separate function, iterate over all parent data items from the [`view`](/api/javascript/data/datasource/methods/view) of the HierarchicalDataSource and call the recursive function for each parent.
```js
function loadAllNodes() {
    for (var i = 0; i < dataSource.view().length; i++) {
        loadNode(dataSource.view()[i]);
    }
}
```
* Call the second function in the [`fetch`](/api/javascript/data/datasource/methods/fetch) method of the HierarchicalDataSource to read the data items.
```js
dataSource.fetch(function () {
    loadAllNodes();
});
```

The following example demonstrates the full implementation of the suggested approach:

```dojo
<script>
    var dataSource = new kendo.data.HierarchicalDataSource({
            data: [
                {
                    text: "foo", 
                    id: "1",
                    hasChildren: true,
                    collection: [
                        { 
                            text: "bar", 
                            id: "2",
                            collection: [
                              { text: "foobar", id: "5" }
                            ]
                        }
                    ]
                },
                {
                    text: "foo2", 
                    id: "3",
                    hasChildren: true,
                    collection: [
                        { 
                            text: "bar2", 
                            id: "4" 
                        }
                    ]
                }
            ],
            schema: {
                model: {
                    id: "id",                 
                    children: "collection"
                }
            }
          });

    dataSource.fetch(function () {
        loadAllNodes();
        console.log(dataSource.get("2"));
        console.log(dataSource.get("4"));
    });

    function loadAllNodes() {
      for (var i = 0; i < dataSource.view().length; i++) {
            loadNode(dataSource.view()[i]);
        }
    }

    function loadNode(node) {
      if(!node.loaded()) {
        node.load().then(function(){
          for (var i = 0; i < node.collection.length; i++) {
                loadNode(node.collection[i]);
            }
        });
      }
    }   
  </script>
```

## See Also
* [JavaScript API Reference of the HierarchicalDataSource](/api/javascript/data/hierarchicaldatasource)
