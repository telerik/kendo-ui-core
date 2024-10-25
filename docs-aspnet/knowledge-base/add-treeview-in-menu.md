---
title: Integrating Kendo TreeView in a Menu Item for ASP.NET MVC Applications
description: Learn how to replace a top-level menu item with a Kendo TreeView in ASP.NET MVC applications for enhanced navigation and user experience.
type: how-to
page_title: How to Replace Menu Items with TreeView in Kendo UI for ASP.NET MVC
slug: how-to-integrate-kendo-treeview-in-menu-item-aspnet-mvc
tags: kendo ui, asp.net mvc, menu, treeview, integration, navigation
res_type: kb
ticketid: 1634883
---

## Environment

| Product | Progress® Kendo UI® Menu for ASP.NET MVC |
| --- | --- |
| Version | 2024.2.514 |

## Description

I want to replace the "Administration" item in my application's top menu with a Kendo TreeView. The TreeView should display all nodes expanded when a user tabs to or hovers over the "Administration" option. How can I achieve this integration in an ASP.NET MVC application using Kendo UI components?

This KB article also answers the following questions:
- How can I embed a Kendo UI TreeView inside a menu in ASP.NET MVC?
- How do I control the expansion of TreeView nodes on hover in a Kendo UI Menu?
- How can I dynamically add items to a TreeView in an ASP.NET MVC application?

## Solution

To integrate a Kendo TreeView within a Kendo UI Menu item in an ASP.NET MVC application, follow these steps:

1. Add a div element with a unique ID, such as "administration", as the last item in your Kendo UI Menu. Ensure to set the `Encoded` option to `false` to allow HTML rendering.

```csharp
items.Add().Text("<div id='administration'></div>").Encoded(false);
```

2. Initialize the TreeView within the `document.ready` function using jQuery. Add nodes to the TreeView, including the "Administration" node and its children.

```javascript
$(document).ready(function() {
    $("#administration").kendoTreeView({
        dataSource: [
            { text: "Administration" }
        ]
    });
    
    var treeview = $("#administration").data("kendoTreeView");
    treeview.append({ text: "bar" });
    treeview.append([{ text: "qux" }, { text: "cat" }, { text: "baz"}]);
    treeview.append(treeview.findByText("bar"), treeview.findByText("Administration"));
    treeview.append(treeview.findByText("qux"), treeview.findByText("Administration"));
    treeview.append(treeview.findByText("cat"), treeview.findByText("Administration"));
    treeview.append(treeview.findByText("baz"), treeview.findByText("Administration"));

    // Collapse the TreeView by default
    treeview.collapse(treeview.findByText("Administration"));
});
```

3. To handle hover actions, use the jQuery `mouseenter` and `mouseleave` functions to expand or collapse the TreeView.

```javascript
$(".k-last").mouseenter(function() {
    var treeview = $("#administration").data("kendoTreeView");
    treeview.expand(treeview.findByText("Administration"));
});

$(".k-last").mouseleave(function() {
    var treeview = $("#administration").data("kendoTreeView");
    treeview.collapse(treeview.findByText("Administration"));
});
```

4. Apply the following CSS for better alignment and color of the menu items.

```css
<style>
    .k-menu-link {
        align-items: start;
    }

    .k-in {
        color: #1274AC;
    }
</style>
```

For integrating TreeView with a Menu bound to a sitemap and loading TreeView in server-side C# code, dynamically replace the last node of your sitemap with the TreeView implementation described above. Use server-side logic to populate the TreeView's nodes similarly to how you would for a hierarchical data structure.

To see a full implementation of the aforementioned approach refer to the following [REPL example on how to add a TreeView as item of a Menu](
https://netcorerepl.telerik.com/myOLcRPH44J5JsFJ29).

## Notes

- Ensure that the TreeView container (`<div id='administration'></div>`) is correctly placed within the Menu structure.
- The TreeView's collapse and expand behavior is controlled through JavaScript. Ensure that the corresponding events are correctly handled to prevent unexpected behavior.
- Review the console for any JavaScript errors and ensure that all event handlers are correctly implemented.

## See Also

- [ASP.NET MVC Menu Overview](https://docs.telerik.com/aspnet-mvc/html-helpers/navigation/menu/overview)
- [ASP.NET MVC TreeView Overview](https://docs.telerik.com/aspnet-mvc/html-helpers/navigation/treeview/overview)
- [jQuery Document Ready](https://learn.jquery.com/using-jquery-core/document-ready/)
- [TreeView Collapse Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/treeview/methods/collapse)