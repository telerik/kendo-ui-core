---
title: Allowing ContextMenu Commands for Files Only in ListView
description: Learn how to display context menu commands only for files and not folders in the right pane of the {{ site.product }} component.
type: how-to
page_title: Displaying ContextMenu Commands for Files Only in {{ site.product }} ListView | {{ site.product }}
slug: filemanager-displaying-contextmenu-commands-for-files-only-in-listview
tags: filemanager, asp.net mvc, asp.net core, contextmenu, commands, files, folders, listview
res_type: kb
---

## Environment

| Product | Version |
|---------|---------|
| Progress® {{ site.product }} | 2023.3.1114 |

## Description

How can I configure the {{ site.product }} to only allow a context menu command to work for files in the right pane?

## Solution

To display ContextMenu commands only for files and not folders in the right pane/ListView of the {{ site.product_short }} FileManager, follow the steps below:

1. Define the [ContextMenu's Open event handler.](https://docs.telerik.com/kendo-ui/api/javascript/ui/contextmenu/events/open)
2. Check if the target is the TreeView (left pane) by determining if it [has the `k-treeview-item` class.](https://api.jquery.com/hasClass/)
3. Determine if the target is a folder by checking if [the `k-svg-i-folder` icon exists.](https://api.jquery.com/find/)
4. Make a reference to the specific command item [using the data attribute.](https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors)
5. Conditionally [disable the listItem from the Kendo UI ContextMenu.](https://docs.telerik.com/kendo-ui/api/javascript/ui/contextmenu/methods/enable)

```HtmlHelper
@(Html.Kendo().FileManager().Name("filemanager")
    .ContextMenu(context => context.Items(items =>
    {
        items.Add("rename");
    }).Open("onOpen"))  //Add Open Event
    //...
)
```

```javascript
function onOpen(e) {
    //Check if the target is from the TreeView
    var isTreeView = $(e.target).hasClass("k-treeview-item");

    //find the folder
    var isFolder = $(e.target).find("span.k-svg-i-folder").length;

    //find the command List Item - rename in this case
    var renameCommand = $(e.sender.wrapper).find("li[data-command='RenameCommand']");

    //If it's a folder or TreeView Item
    if (isFolder || isTreeView) {

        //Disable the listItem
        this.enable(renameCommand , false);
    } else {

        //Otherwise, enable it
        this.enable(renameCommand , true);
    }
}
```
Please refer to [this sample](https://netcorerepl.telerik.com/GyYbFMGv27nRO4NS19) for a visual representation of the approach.
