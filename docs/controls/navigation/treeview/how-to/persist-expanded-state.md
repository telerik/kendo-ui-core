---
title: Persist Expanded State
page_title: Persist Expanded State | Kendo UI TreeView
description: "Learn how to persist the expanded nodes in a cookie and restore them upon page refresh in a Kendo UI TreeView widget."
slug: howto_persistexpandedstate_treeview
---

# Persist Expanded State

The example below demonstrates how to persist the expanded nodes in a cookie and restore them upon page refresh in a Kendo UI TreeView widget.

###### Example

```html
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

How-to examples on Kendo UI TreeView in AngularJS:

* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_angularjs_treeview %})
* [How to Scroll to Item]({% slug howto_scrolltoitem_angularjs_treeview %})
* [How to Toggle Nodes with Single Click]({% slug howto_togglenodeswithsingleclick_angularjs_treeview %})

Articles and other how-to examples on Kendo UI TreeView:

* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
* [How to Attach Methods to Data Items]({% slug howto_attache_methodsto_dataitems_treeview %})
* [How to Check Nodes Programatically]({% slug howto_checknodeprogramatically_treeview %})
* [How to Combine Local Data with Remote Loading]({% slug howto_combinelocaldatawithremoteloading_treeview %})
* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_treeview %})
* [How to Expand All Nodes upon Check]({% slug howto_expandallnodes_uponcheck_treeview %})
* [How to Expand Nodes during Drag]({% slug howto_expandnodesduringdrag_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Prevent Dragging Nodes to Deep Levels]({% slug howto_preventdragging_nodestodeeplevels_treeview %})
* [How to Prevent Dragging Nodes to Root Level]({% slug howto_preventdragging_nodestorootlevel_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Show Lines between Nodes]({% slug howto_showlinesbetweennodes_treeview %})
* [How to Show Node Context Menu]({% slug howto_shiwnodecontextmenu_treeview %})
* [How to Sort Child Nodes]({% slug howto_sortchildnodes_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})
