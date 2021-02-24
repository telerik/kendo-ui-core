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

There are two ways to use templates with **Content Items**. Both are exposed as options of `AppBarItemType.ContentItem`:
* Use the `template` option to consume and render HTML via an inline Kendo UI template.
* Use the `template-id` option to provide a `kendo.template` reference.

The following example shows how to utilize both options:

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

The `AppBarItemType.Spacer` is used to easily separate content items from one another. It returns a `span` element with no height or width. Therefore, if the `span` has no width set in pixels, it will take up all available space and push all remaining content items towards the end of the parent element. 

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
