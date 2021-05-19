---
title: Editing
page_title: Editing
description: "Learn how to enable editing and alter the Breadcrumb value."
slug: htmlhelpers_breadcrumb_aspnetcore_editing
position: 4
---

# Editing

The path set through the Breadcrumb widget can be edited if the `Editable` configuration is enabled. When clicking in an empty area of the component or on the current page, the Breadcrumb will enter into editing mode. That will also happen when `enter` is pressed if the Breadcrumb is focused.

Editing mode shows an input field containing the current value of the widget. Users are allowed to type a new path.

The below example demonstrates how to enable editing of the Breadcrumb.

```Razor
    @(Html.Kendo().Breadcrumb()
        .Name("breadcrumb")
        .Items(items =>
        {
            items.Add()
                .Type(BreadcrumbItemType.RootItem)
                .Href("https://demos.telerik.com/kendo-ui/")
                .Text("All Components")
                .ShowText(true)
                .Icon("home");
            items.Add()
                .Type(BreadcrumbItemType.Item)
                .Href("/breadcrumb")
                .Text("Breadcrumb");
            items.Add()
                .Type(BreadcrumbItemType.Item)
                .Href("/editing")
                .Text("Editing");
        })
        .Editable(true)
    )
```

## See Also

* [Editing of the Breadcrumb HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/breadcrumb/editing)
