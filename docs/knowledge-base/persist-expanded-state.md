---
title: Persist the Expanded State of the TreeView
page_title: Persist the Expanded State of the TreeView
description: "Learn how to persist the expanded nodes in a cookie and restore them upon page refresh in a Kendo UI for jQuery TreeView widget."
slug: howto_persistexpandedstate_treeview
previous_url: /controls/navigation/treeview/how-to/integration/persist-expanded-state
tags: telerik, kendo, jquery, treeview, persist, the, expanded, state
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

How can I persist the expanded state of nodes in a cookie in the Kendo UI for jQuery TreeView?

## Solution

The following example demonstrates how to achieve this behavior and then restore the nodes upon refreshing the page in a TreeView.

```dojo
  <div id="treeview"></div>
  <button onclick="reloadPage()">Reload Page</button>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/js-cookie/2.0.3/js.cookie.min.js"></script>
  <script>
    function saveExpanded() {
      var treeview = $("#treeview").data("kendoTreeView");
      var expandedItemsIds = {};
      treeview.element.find(".k-item").each(function () {
        var item = treeview.dataItem(this);
        if (item.expanded) {
            expandedItemsIds[item.id] = true;
        }
      });
      Cookies.set('expanded', kendo.stringify(expandedItemsIds));
    }

    function setExpanded(data, expanded) {
      for (var i = 0; i < data.length; i++) {
        if (expanded[data[i].id]) {
          data[i].expanded = true;
        }
        if (data[i].items && data[i].items.length) {
          setExpanded(data[i].items, expanded);
        }
      }
    }

    function reloadPage() {
      saveExpanded();
      window.location.reload();
    }

    var data = [
      { id: 1, text: "Furniture", items: [
        { id: 2,text: "Tables & Chairs" },
        { id: 3,text: "Sofas" },
        { id: 4,text: "Occasional Furniture" }
      ] },
      { id: 5,text: "Decor", items: [
        { id: 6,text: "Bed Linen" },
        { id: 7,text: "Curtains & Blinds" },
        { id: 8,text: "Carpets" }
      ]}
    ];

    var expanded = Cookies.get('expanded');
    if (expanded) {
      Cookies.remove('expanded');
      expanded = JSON.parse(expanded);
      setExpanded(data, expanded);
    }

    var inlineDefault = new kendo.data.HierarchicalDataSource({
      data: data
    });

    $("#treeview").kendoTreeView({
      dataSource: inlineDefault
    });
  </script>
```

## See Also

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
