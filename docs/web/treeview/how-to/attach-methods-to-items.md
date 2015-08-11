---
title: Attach methods to data items
page_title: Attach methods to data items
description: Attach methods to data items
---

# Attach methods to data items

The example below demonstrates how to attach methods to data items at different levels and use them in a template.

#### Example


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
