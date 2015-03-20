---
title: Persist expanded state
page_title: Persist expanded state
description: Persist expanded state
---

# Persist expanded state

The example below demonstrates how to persist the expanded nodes in a cookie and restore them upon page refresh.

#### Example:

```html
  <div id="treeview"></div>
  <button onclick="reloadPage()">Reload Page</button>
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
      $.cookie('expanded', kendo.stringify(expandedItemsIds));
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

    var expanded = $.cookie('expanded');
    if (expanded) {
      $.removeCookie('expanded');
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
