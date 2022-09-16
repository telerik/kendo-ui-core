---
title: Items
page_title: Items
description: "Learn how to configure the items in the AppBar component for {{ site.framework }}."
slug: htmlhelpers_appbar_aspnetcore_items
position: 2
---

# Items

The `Items` represent the content of the AppBar. The `Items` configuration accepts a collection of objects that will be rendered inside the AppBar widget. There are two types of items that developers can choose from:

* [Content Items](#content-items)
* [Spacer](#spacer)

## Content Items

There are two approaches to using templates with **Content Items**:
* You can use the `Template` option exposed by `ContentItem` to consume and render HTML. 
* You can supply a `kendo.template` to the configuration by using the `TemplateId` option. 
The following example shows how to utilize both of them:

```HtmlHelper
    @(Html.Kendo().AppBar()
        .Name("appbar")
        .ThemeColor(AppBarThemeColor.Inherit)
        .Items(items=> {
            items.Add().Template("<a class='k-button' href='\\#'><span class='k-icon k-i-menu'></span></a>").Type(AppBarItemType.ContentItem);
            items.Add().TemplateId("search-template").Type(AppBarItemType.ContentItem);
        })
    )

```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

   <kendo-appbar name="appbar" theme-color="AppBarThemeColor.Inherit" >
        <items>
            <appbar-item type="AppBarItemType.ContentItem" template="<a class='k-button' href='\\#'><span class='k-icon k-i-menu'></span></a>"></appbar-item>
            <appbar-item type="AppBarItemType.ContentItem" template-id="search-template"></appbar-item>
        </items>   
    </kendo-appbar>

    <script id="search-template" type="text/x-kendo-tmpl">
        <span class="k-textbox k-display-flex">
            <input autocomplete="off" placeholder="Search..." title="Search..." class="k-input">
            <span class="k-input-icon">
                <span class="k-icon k-i-search"></span>
            </span>
        </span>
    </script>
```
{% endif %}

## Spacer

The `Spacer` item could be utilized to easily separate the content items from each other.

```HtmlHelper
    @(Html.Kendo().AppBar()
        .Name("appbar")
        .Items(items=> {
            items.Add().Template("<a class='k-button' href='\\#'><span class='k-icon k-i-menu'></span></a>").Type(AppBarItemType.ContentItem);
            items.Add().Type(AppBarItemType.Spacer).Width("16px");
            items.Add().Template("<h3>AppBar Demo</h3>").Type(AppBarItemType.ContentItem);
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

      <kendo-appbar name="appbar" theme-color="AppBarThemeColor.Inherit" >
        <items>
            <appbar-item type="AppBarItemType.ContentItem" template="<h3 class='title'>All Products</h3>"></appbar-item>
            <appbar-item type="AppBarItemType.Spacer" width="16px"></appbar-item>
            <appbar-item type="AppBarItemType.ContentItem" template="<a class='k-button k-clear-search' href='\\#'>Clear search</a>"></appbar-item>
        </items>   
    </kendo-appbar>
```
{% endif %}

## See Also

* [Overview of the AppBar (Demo)](https://demos.telerik.com/{{ site.platform }}/appbar/index)
* [Server-Side API](/api/appbar)
