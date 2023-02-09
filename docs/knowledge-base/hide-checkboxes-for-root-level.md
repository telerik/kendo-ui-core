---
title: Hide Checkboxes for Root-Level TreeView Items
page_title: Hide Checkboxes for Root-Level TreeView Items
description: "Learn how to use the checkboxes.template configuration option to hide checkboxes for root level items in a Kendo UI for jQuery TreeView widget."
slug: howto_hidecheckboxesforrootlevel_treeview
previous_url: /controls/navigation/treeview/how-to/templates/hide-checkboxes-for-root-level
tags: telerik, kendo, jquery, treeview, hide, checkboxes, for, root, level, items
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

How can I hide the checkboxes for the root level items in the Kendo UI for jQuery TreeView?

## Solution

The following example demonstrates how to achieve this behavior by using the `checkboxes.template` configuration option.

```dojo
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
            { id: 6, text: "New Website", expanded: true, spriteCssClass: "folder", items: [
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

* [Basic Usage of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/index)
* [Using the API of the TreeView (Demo)](https://demos.telerik.com/kendo-ui/treeview/api)
* [JavaScript API Reference of the TreeView](/api/javascript/ui/treeview)
