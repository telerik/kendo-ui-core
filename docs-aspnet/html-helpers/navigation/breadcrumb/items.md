---
title: Items
page_title: Items
description: "Learn how to configure the items of the widget."
slug: htmlhelpers_breadcrumb_aspnetcore_items
position: 2
---

# Items

The `items` configuration allows you to set specific attributes to the Breadcrumb items. You can set the text and the icon of an element and determine whether they would be visible or not. The configuration also allows you to add classes for the different elements which are rendered when initializing the widget.

The following example demonstrates how the attributes of the Breadcrumb items can be set through the *items* configuration.

```HtmlHelper
    @(Html.Kendo().Breadcrumb()
        .Name("breadcrumb")
        .Items(items =>
        {
            items.Add()
                .Type(BreadcrumbItemType.RootItem)
                .Href("https://demos.telerik.com/kendo-ui/")
                .Text("All Components")
                .ShowText(true)
                .Icon("home")
                .ShowIcon(true)
                .ItemClass("root")
                .IconClass("root")
                .LinkClass("root");
            items.Add()
                .Type(BreadcrumbItemType.Item)
                .Href("/breadcrumb")
                .Text("Breadcrumb")
                .ShowText(true)
                .ItemClass("item")
                .IconClass("item")
                .LinkClass("item");
            items.Add()
                .Type(BreadcrumbItemType.Item)
                .Href("/index")
                .Text("Basic Usage")
                .ShowText(true)
                .ItemClass("item")
                .IconClass("item")
                .LinkClass("item");
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-breadcrumb name="breadcrumb">
        <kendo-breadcrumb-items>
            <kendo-breadcrumb-item type="BreadcrumbItemType.RootItem" text="All Components" href="https://demos.telerik.com/kendo-ui/" show-text="true" icon="home" show-icon="true"></kendo-breadcrumb-items>
            <kendo-breadcrumb-item type="BreadcrumbItemType.Item" text="Breadcrumb" href="/breadcrumb"></kendo-breadcrumb-item>
            <kendo-breadcrumb-item type="BreadcrumbItemType.Item" text="Tag Helper" href="/tag-helper"></kendo-breadcrumb-item>
        </kendo-breadcrumb-items>
    </kendo-breadcrumb>
```
{% endif %}


## See Also

* [Basic Usage of the Breadcrumb HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/breadcrumb/index)
