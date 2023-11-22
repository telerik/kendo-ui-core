---
title: Items
page_title: Items
description: "Learn how to configure the items in the AppBar component for {{ site.framework }}."
slug: htmlhelpers_appbar_aspnetcore_items
position: 2
---

# Items

The `Items` represent the content of the AppBar. The `Items` configuration accepts a collection of objects that will be rendered inside the AppBar. The component provides two types of items:

* [Content Items](#content-items)
* [Spacer](#spacer)

## Content Items

You can configure the **Content Items** by using templates as per the following approaches:

* Use the `Template` option exposed by `ContentItem` to consume and render HTML. 
* Supply a [Kendo UI template](https://docs.telerik.com/kendo-ui/framework/templates/overview) to the item by using the `TemplateId` option. 

The following example showcases how to use both template options to define the AppBar items.

```HtmlHelper
    @(Html.Kendo().AppBar()
        .Name("appbar")
        .ThemeColor(AppBarThemeColor.Inherit)
        .Items(items=> {
            items.Add().Template("<a class='k-button k-button-solid-base k-button-solid k-button-md k-rounded-md' href='\\#'><span class='k-icon k-i-menu'></span></a>").Type(AppBarItemType.ContentItem);
            items.Add().TemplateId("search-template").Type(AppBarItemType.ContentItem);
        })
    )
    <script id="search-template" type="text/x-kendo-tmpl">
        <span class="k-textbox k-display-flex">
            <input autocomplete="off" placeholder="Search..." title="Search..." class="k-input">
            <span class="k-input-icon">
                <span class="k-icon k-i-search"></span>
            </span>
        </span>
    </script>

```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

   <kendo-appbar name="appbar" theme-color="AppBarThemeColor.Inherit" >
        <items>
            <appbar-item type="AppBarItemType.ContentItem" template="<a class='k-button k-button-solid-base k-button-solid k-button-md k-rounded-md' href='\\#'><span class='k-icon k-i-menu'></span></a>"></appbar-item>
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

The `Spacer` item creates a `span` element to add space and separate the content items from each other. 

```HtmlHelper
    @(Html.Kendo().AppBar()
        .Name("appbar")
        .Items(items=> {
            items.Add().Template("<a class='k-button k-button-solid-base k-button-solid k-button-md k-rounded-md' href='\\#'><span class='k-icon k-i-menu'></span></a>").Type(AppBarItemType.ContentItem);
            items.Add().Type(AppBarItemType.Spacer).Width("16px");
            items.Add().Template("<h3>AppBar Demo</h3>").Type(AppBarItemType.ContentItem);
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-appbar name="appbar">
        <items>
            <appbar-item type="AppBarItemType.ContentItem" template="<a class='k-button k-button-solid-base k-button-solid  k-button-md k-rounded-md' href='\\#'><span class='k-icon k-i-menu'></span></a>"></appbar-item>
            <appbar-item type="AppBarItemType.Spacer" width="16px"></appbar-item>
            <appbar-item type="AppBarItemType.ContentItem" template="<h3>AppBar Demo</h3>"></appbar-item>
        </items>   
    </kendo-appbar>
```
{% endif %}

## See Also

* [Overview of the AppBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/appbar/index)
* [Server-Side API](/api/appbar)
