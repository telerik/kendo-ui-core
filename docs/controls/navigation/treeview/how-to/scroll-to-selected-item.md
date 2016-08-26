---
title: Scroll to Selected Item
page_title: Scroll to Selected Item | Kendo UI TreeView
description: "Learn how to scroll the Kendo UI TreeView viewport to the selected node."
slug: howto_scrolltoselecteditem_treeview
---

# Scroll to Selected Item

The example below demonstrates how to scroll the Kendo UI TreeView viewport to the selected node.

###### Example

```html
    <div id="tree"></div>

    <script>
      // setup: generate data, select item
      var data = [];
      for (var i = 0; i < 1000; i++) {
        data.push({ text: "Item " + i });
      }
      $("#tree").kendoTreeView({
        dataSource: data
      });
      var treeview = $("#tree").data("kendoTreeView");
      treeview.select(treeview.findByText("Item 500"));

      // scroll to selected item
      var itemScrollTop = treeview.select()[0].offsetTop;
      $("html,body").animate({ scrollTop: itemScrollTop });
    </script>
```

## See Also

Other articles on the Kendo UI TreeView:

* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
* [How to Check Nodes Programmatically]({% slug howto_checknodeprogramatically_treeview %})
* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})

For more runnable examples on the Kendo UI TreeView, browse its [**How To** documentation folder]({% slug howto_editnodesviaform_angularjs_treeview %}).
