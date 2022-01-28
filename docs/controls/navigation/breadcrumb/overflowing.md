---
title: Overflowing
page_title: jQuery Breadcrumb Documentation | Overflowing
description: "Get started with the jQuery Breadcrumb by Kendo UI and learn the overflowing functionality."
slug: overflowing_breadcrumb_widget
position: 6
---

# Overflowing 

When the width of the Breadcrumb is not enough to display the entire path, the widget will show only the items that fit the available space. The rest will be hidden. If you click one of the visible items, the value of the widget will change and reveal the previously hidden item.

The below example demonstrates the overflowing feature.

```dojo
    <nav id="breadcrumb" style="width:300px"></nav>

    <script>
        $("#breadcrumb").kendoBreadcrumb({
            items: [
                { type: "rootitem", href: "mysite.com", text: "Telerik UI", icon: "globe", showIcon: true, showText: true },
                { type: "item", href: "/navigation", text: "Navigation", icon: "cloud", showText: true, showIcon: false },
                { type: "item", href: "/breadcrumb1", text: "Folder1", showText: true },
                { type: "item", href: "/breadcrumb2", text: "Folder2", showText: true },
                { type: "item", href: "/breadcrumb3", text: "Folder3", showText: true },
                { type: "item", href: "/breadcrumb4", text: "Folder4", showText: true },
                { type: "item", href: "/breadcrumb5", text: "Folder5", showText: true },
                { type: "item", href: "/breadcrumb6", text: "Folder6", showText: true },
                { type: "item", href: "/breadcrumb7", text: "Folder7", showText: true },
                { type: "item", href: "/breadcrumb8", text: "Folder8", showText: true },
                { type: "item", href: "/breadcrumb9", text: "Folder9", showText: true },
                { type: "item", href: "/breadcrumb10", text: "Folder10", showText: true},
                ],
            editable:true
        });
    </script>
```

## See Also

* [JavaScript API Reference of the Breadcrumb](/api/javascript/ui/breadcrumb)