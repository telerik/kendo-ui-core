---
title: Expanding PanelBar Items on the Client-Side
description: Explore the examples on how to expand the locally or remotely loaded Items of a PanelBar for {{ site.product }}.
type: how-to
page_title: Expanding PanelBar Items on the Client-Side
slug: panelbar-expand-items-on-client-side
tags: panelbar, expand, items, client, local data, remote date, recursively
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress {{ site.product }} PanelBar</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.3.913 version</td>
 </tr>
</table>


## Description

How can I iterate and expand the items of the PanelBar?

## Solution

To expand the PanelBar items, you can use either of the following approaches:

* Use jQuery selectors to access the Html elements created by the PanelBar&mdash;this approach is useful when [binding local data](https://demos.telerik.com/aspnet-core/panelbar/local-data-binding) and statically defined items.

* Iterate the items and their children recursively and expand them&mdash;this approach is useful when [binding to remote data](https://demos.telerik.com/aspnet-core/panelbar/remote-data-binding) and the expanded state of the item is determined by its data.

### Expanding Static Items

1. Wait until the document has loaded completely.
1. Get the client-side instance of the PanelBar.
1. Select the elements with the `.k-item` class.
1. Iterate through the elements and pass each item to the [expand method](https://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar/methods/expand).

```JavaScript
     $(document).ready(function(){
        var panelbar = $("#panelbar").data("kendoPanelBar");
        var items =$("ul#panelbar>.k-item");
        items.each((index, item)=>{
            panelbar.expand(item)
        })
    })
```
For a runnable example, refer to the [Telerik REPL example on expanding static items](https://netcorerepl.telerik.com/wmkNnaFE54AeFwDf36)

### Recursive Expanding of Items Populated through Remote Data-Binding 

1. Define the `expandItems` and `iterateChildren` functions:
* `expandItems` goes through an array of `dataItems` and expands those that have children and aren't expanded.
* `iterateChildren` goes through all the items that have children and applies the `expandItems` function.
{% if site.core %}
  When these functions are executed in the [`DataBound` event](https://docs.telerik.com/aspnet-core/api/Kendo.Mvc.UI.Fluent/PanelBarEventBuilder#databoundsystemstring) handler of the PanelBar, a recursion occurs. It terminates when all the items of the component are iterated and expanded.
{% else %}
  When these functions are executed in the [`DataBound` event](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/PanelBarEventBuilder#databoundsystemstring) handler of the PanelBar, a recursion occurs. It terminates when all the items of the component are iterated and expanded.
{% endif %}
* (Optional) Add another condition that determines whether the item is expanded based on its previous state or its data values.

```HtmlHelper
    .Events(e=>e.DataBound("onDataBound"))
```
```JavaScript
    function onDataBound(e){
        var data = e.sender.dataSource.data();
        expandItems(data,e.sender)
        iterateChildren(data,e.sender)
    }

    function iterateChildren(data, panelbar){
        data.forEach(dataItem=>{
            if(dataItem.hasChildren && dataItem.children._data && dataItem.children._data.length>0){
                expandItems(dataItem.children._data,panelbar);
            }
        })
    }
    
    function expandItems(data,panelbar){
        data.forEach(dataItem=>{
            if(dataItem.hasChildren && dataItem.expanded !=true){
                panelbar.expand($("li[data-uid='"+dataItem.uid+"']"))
            }
        })
    }
```

For a runnable example, refer to the [Telerik REPL example of the recursive expansion approach](https://netcorerepl.telerik.com/mQaXmMFO50mvlnre08).

## See Also

* [Client-Side API Reference of the PanelBar](https://docs.telerik.com/kendo-ui/api/javascript/ui/panelbar)
