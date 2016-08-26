---
title: Attach Methods to Data Items
page_title: Attach Methods to Data Items | Kendo UI TreeView
description: "Learn how to attach methods to data items at different levels of the Kendo UI TreeView widget and use them in a template."
slug: howto_attache_methodsto_dataitems_treeview
---

# Attach Methods to Data Items

The example below demonstrates how to attach methods to data items at different levels of the Kendo UI TreeView widget and use them in a template.

###### Example


```html
    <div id="treeview"></div>

    <script>
      var SubCategory = {
        displayName: function() {
          return this.SubCategoryName;
        }
      };

      var Category = {
        displayName: function() {
          return this.CategoryName;
        },
        children: {
          schema: {
            data: "subcategories",
            model: SubCategory
          }
        }
      };

      $("#treeview").kendoTreeView({
        template: "#: item.displayName() #",
        dataSource: {
          data: [
            { CategoryName: "Reds", status: "online", subcategories: [
              { SubCategoryName: "Yellow" },
              { SubCategoryName: "Orange" },
              { SubCategoryName: "Red" }
            ] },
            { CategoryName: "Blues", status: "offline", subcategories: [
              { SubCategoryName: "Green" },
              { SubCategoryName: "Turquose" },
              { SubCategoryName: "Blue" }
            ] }
          ],
          schema: {
            model: Category
          }
        }
      });
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
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})

For more runnable examples on the Kendo UI TreeView, browse its [**How To** documentation folder]({% slug howto_editnodesviaform_angularjs_treeview %}).
