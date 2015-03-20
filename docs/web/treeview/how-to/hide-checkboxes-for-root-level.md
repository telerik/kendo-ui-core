---
title: Hide checkboxes for root level
page_title: Hide checkboxes for root level
description: Hide checkboxes for root level
---

# Hide checkboxes for root level

The example below demonstrates how to use the checkboxes.template configuration option in order to hide the checkboxes for the root level items.

#### Example

```html
    <div id="treeview"></div>

    <script>
      $("#treeview").kendoTreeView({
        checkboxes: {
          checkChildren: true,
          template:
            "# if (item.level() > 0) { #" +
                "<input type='checkbox' #= item.checked ? 'checked' : '' #>" +
            "# } #"
        },

        dataSource: [
          { id: 1, text: "My Documents", expanded: true, spriteCssClass: "rootfolder", items: [
            { id: 2, text: "Kendo UI Project", expanded: true, spriteCssClass: "folder", items: [
              { id: 3, text: "about.html", spriteCssClass: "html" },
              { id: 4, text: "index.html", spriteCssClass: "html" },
              { id: 5, text: "logo.png", spriteCssClass: "image" }
            ]
            },
            { id: 6, text: "New Web Site", expanded: true, spriteCssClass: "folder", items: [
              { id: 7, text: "mockup.jpg", spriteCssClass: "image" },
              { id: 8, text: "Research.pdf", spriteCssClass: "pdf" },
            ] }
          ] },
          { id: 9, text: "Reports", expanded: true, spriteCssClass: "folder", items: [
              { id: 10, text: "February.pdf", spriteCssClass: "pdf" },
              { id: 11, text: "March.pdf", spriteCssClass: "pdf" },
              { id: 12, text: "April.pdf", spriteCssClass: "pdf" }
            ] }
          ]
      });

    </script>
```
