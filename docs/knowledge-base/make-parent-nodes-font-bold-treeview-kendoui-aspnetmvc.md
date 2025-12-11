---
title: Making Parent Nodes Font Bold in a TreeView
description: Learn how to make the parent nodes font bold in a TreeView using Progress Kendo UI for ASP.NET MVC.
type: how-to
page_title: How to Make Parent Nodes Font Bold in a TreeView | Kendo UI TreeView for ASP.NET MVC
slug: make-parent-nodes-font-bold-treeview-kendoui-aspnetmvc
tags: treeview, font, bold, Kendo UI, ASP.NET MVC
res_type: kb
components: ["treeview"]
---

## Environment

| Product | Version |
| --- | --- |
| Progress® Kendo UI® TreeView for ASP.NET MVC | 2023.2.606 |

## Description

I want to make the parent nodes font bold in a TreeView using Progress Kendo UI for ASP.NET MVC.

## Solution

To achieve the desired behavior, follow these steps:

1. Add the following code to the `document.ready` scope:

```javascript
$(document).ready(function () {
    var allGroups = $("[aria-expanded]");

    for (var i = 0; i < allGroups.length; i++) {
        var currDivItem = $(allGroups[i]).find("div").eq(0);

        $(currDivItem).css("font-weight", "bold");
    }
});
```

This code selects all nodes with aria labels, retrieves the first div element of each parent node, and changes its CSS to make the font bold.

Now, when the TreeView is rendered, the parent nodes will have bold font.

## Notes

- Make sure to include the jQuery library in your project for this approach to work.
- You can customize the font weight by modifying the value in the `css` method.
