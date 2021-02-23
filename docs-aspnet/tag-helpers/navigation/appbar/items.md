---
title: Items
page_title: Items
description: "Learn how to configure the items of the AppBar component."
slug: taghelpers_items_appbar_aspnetcore
position: 2
---

# Items

The `items` represent the content of the AppBar. The [`items`](/api/javascript/ui/appbar/configuration/items) configuration accepts a collection of objects that will be rendered inside the AppBar widget. There are two types of items that developers can choose from:

* [Content Items](#content-items)
* [Spacer](#spacer)

## Content Items

There are two approaches to using templates with **Content Items**:
* You can use the the `template` option exposed by `AppBarItemType.ContentItem` to consume and render HTML. 
* You can supply a `kendo.template` reference to the configuration.

The following example shows how to utilize both approaches:

```tagHelper
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

## Spacer

The `AppBarItemType.Spacer` item could be utilized to easily separate the content items from one another.

```tagHelper
    @addTagHelper *, Kendo.Mvc

      <kendo-appbar name="appbar" theme-color="AppBarThemeColor.Inherit" >
        <items>
            <appbar-item type="AppBarItemType.ContentItem" template="<h3 class='title'>All Products</h3>"></appbar-item>
            <appbar-item type="AppBarItemType.Spacer" width="16px"></appbar-item>
            <appbar-item type="AppBarItemType.ContentItem" template="<a class='k-button k-clear-search' href='\\#'>Clear search</a>"></appbar-item>
        </items>   
    </kendo-appbar>
```

## See Also

* [Basic Usage of the AppBar TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/appbar/tag-helper)
