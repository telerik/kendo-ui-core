---
title: Use FontAwesome Icons
page_title: Use FontAwesome Icons | Kendo UI TreeView
description: "Learn how to use FontAwesome icons in the Kendo UI TreeView widget."
slug: howto_usefontawesomeicons_treeview
---

# Use FontAwesome Icons

The example below demonstrates how to use [FontAwesome icons](http://fortawesome.github.io/Font-Awesome/icons/) as TreeView sprite icons.

###### Example

```html
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">

    <style>
      .fa.k-sprite,
      .fa.k-sprite::before {
        font-size: 12px;
        line-height: 12px;
        vertical-align: middle;
      }
    </style>

    <div id="treeview"></div>
    <script>
      $("#treeview").kendoTreeView({
        dataSource: [
          { text: "Flying objects", spriteCssClass: "fa fa-sitemap", expanded: true, items: [
            { text: "Paper plane", spriteCssClass: "fa fa-paper-plane" },
            { text: "Plane", spriteCssClass: "fa fa-plane" },
            { text: "Space shuttle", spriteCssClass: "fa fa-space-shuttle" }
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
* [How to Hide Checkboxes for Root Level]({% slug howto_hidecheckboxesforrootlevel_treeview %})
* [How to Persist Expanded State]({% slug howto_persistexpandedstate_treeview %})
* [How to Render Multiple TreeViews Using HTML Source Binding]({% slug howto_rendermultipleusing_htmlsourcebinding_mvvm_treeview %})
* [How to Scroll to Selected Item]({% slug howto_scrolltoselecteditem_treeview %})

For more runnable examples on the Kendo UI TreeView, browse its [**How To** documentation folder]({% slug howto_editnodesviaform_angularjs_treeview %}).
