---
title: Hide Checkboxes for Root Level
page_title: Hide Checkboxes for Root Level | Kendo UI TreeView
description: "Learn how to use the checkboxes.template configuration option to hide checkboxes for root level items in a Kendo UI TreeView widget."
slug: howto_hidecheckboxesforrootlevel_treeview
---

# Hide Checkboxes for Root Level

The example below demonstrates how to use the `checkboxes.template` configuration option to hide the checkboxes for the root level items in a Kendo UI TreeView widget.

###### Example

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

## See Also

Other articles on the Kendo UI TreeView:

* [TreeView JavaScript API Reference](/api/javascript/ui/treeview)
* [How to Check Nodes Programmatically]({% slug howto_checknodeprogramatically_treeview %})
* [How to Edit Nodes via Form]({% slug howto_editnodesviaform_treeview %})
* [How to Filter Out Search Results]({% slug howto_filetroutserachresults_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})
* [How to Use FontAwesome Icons]({% slug howto_usefontawesomeicons_treeview %})

For more runnable examples on the Kendo UI TreeView, browse its [**How To** documentation folder]({% slug howto_editnodesviaform_angularjs_treeview %}).
