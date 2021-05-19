---
title: Attach Methods to Data Items
page_title: Attach Methods to Data Items | Kendo UI TreeView
description: "Learn how to attach methods to data items at different levels of the Kendo UI TreeView widget and use them in a template."
slug: howto_attache_methodsto_dataitems_treeview
---

# Attach Methods to Data Items

The following example demonstrates how to attach TreeView methods to data items at different levels and then use them in a template.

```dojo
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

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
