---
title: Overview
page_title: Overview
description: "Get started with the Telerik UI AppBar component for {{ site.framework }}, and learn how to initialize the component."
slug: htmlhelpers_appbar_aspnetcore_overview
position: 1
---

# AppBar Overview

{% if site.core %}
The Telerik UI AppBar TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI AppBar widget.
{% else %}
The Telerik UI AppBar HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI AppBar widget.
{% endif %}

The AppBar component is mainly used for navigation. At the same time, it is template-driven, which makes it very flexible. To take full advantage of its functionality, you can include various [Content Items]({% slug htmlhelpers_appbar_aspnetcore_items %}) in the AppBar component, for example:
* Titles
* Icons
* Actions (such as redirect buttons or a search panel)

* [Demo page for the AppBar HtmlHelper](https://demos.telerik.com/{{ site.platform }}/appbar/index)
{% if site.core %}
* [Demo page for the AppBar TagHelper](https://demos.telerik.com/aspnet-core/appbar/tag-helper)
{% endif %}

## Initializing the AppBar

The following example demonstrates how to define the AppBar by using the AppBar HtmlHelper.

```HtmlHelper
    @(Html.Kendo().AppBar()
        .Name("appbar")
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
 
    <kendo-appbar name="appbar"> 
    </kendo-appbar>
```
{% endif %}

## Functionality and Features

* [Items]({% slug htmlhelpers_appbar_aspnetcore_items %})
* [Position]({% slug htmlhelpers_appbar_aspnetcore_position %})

{% if site.core %}
## Events

You can subscribe to the AppBar widget's events.

```HtmlHelper
    @(Html.Kendo().AppBar()
        .Name("appbar")
        .ThemeColor(AppBarThemeColor.Inherit)
        .Items(items=> {
            items.Add().Template("<a class='k-button' href='\\#'><span class='k-icon k-i-menu'></span></a>").Type(AppBarItemType.ContentItem);
            items.Add().Type(AppBarItemType.Spacer).Width("16px");
            items.Add().TemplateId("search-template").Type(AppBarItemType.ContentItem);
        })
        .Events(e=>e.Resize("onResize"))
    )
    <script id="search-template" type="text/x-kendo-tmpl">
        <span class="k-textbox k-input k-input-md k-rounded-md k-input-solid">
            <input autocomplete="off" placeholder="Search products" title="Search products" class="k-input-inner">
            <span class="k-input-suffix">
                <span class="k-input-icon k-icon k-i-search"></span>
            </span>
        </span>
    </script>
    
    <script>
        function onResize(e){
            //handle the AppBar widget's resize event
        };
    </script>
```
```TagHelper
    @addTagHelper *, Kendo.Mvc
  
    <kendo-appbar name="appbar" theme-color="AppBarThemeColor.Inherit" on-resize="onResize">
        <items>
            <appbar-item type="AppBarItemType.ContentItem" template="<a class='k-button' href='\\#'><span class='k-icon k-i-menu'></span></a>"></appbar-item>
            <appbar-item type="AppBarItemType.Spacer" width="16px"></appbar-item>
            <appbar-item type="AppBarItemType.ContentItem" template-id="search-template"></appbar-item>
        </items>   
    </kendo-appbar>
    <script id="search-template" type="text/x-kendo-tmpl">
        <span class="k-textbox k-input k-input-md k-rounded-md k-input-solid">
            <input autocomplete="off" placeholder="Search products" title="Search products" class="k-input-inner">
            <span class="k-input-suffix">
                <span class="k-input-icon k-icon k-i-search"></span>
            </span>
        </span>
    </script>

    <script>
        function onResize(e){
            //handle the AppBar widget's resize event
        };
    </script>
```
{% endif %}

## See Also

* [Basic Usage of the AppBar HtmlHelper for {{ site.platform }} (Demo)](https://demos.telerik.com/{{ site.platform }}/appbar/index)
{% if site.core %}
* [Basic Usage of the AppBar TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/appbar/tag-helper)
{% endif %}
