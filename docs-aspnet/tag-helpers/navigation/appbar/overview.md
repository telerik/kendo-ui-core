---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik AppBar TagHelper for ASP.NET Core."
slug: taghelpers_appbar_aspnetcore_overview
position: 1
---

# AppBar TagHelper Overview

The Telerik UI AppBar TagHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI AppBar widget.

The AppBar widget a navigational widget. It is template-driven, which makes it very flexible - it can render whatever you throw at it. To take full advantage of its functionality, you can include various Content Items in the AppBar widget

Visit the [Demo page for the AppBar](https://demos.telerik.com/aspnet-core/appbar/tag-helper) to see it in action.

## Basic Configuration

The following example demonstrates how to initialize the AppBar using the TagHelper wrapper.

```tagHelper
    @addTagHelper *, Kendo.Mvc
 
    <kendo-appbar name="appbar" theme-color="AppBarThemeColor.Inherit">
        <items>
            <appbar-item type="AppBarItemType.ContentItem" template="<a class='k-button' href='\\#'><span class='k-icon k-i-menu'></span></a>"></appbar-item>
            <appbar-item type="AppBarItemType.Spacer" width="16px"></appbar-item>
            <appbar-item type="AppBarItemType.ContentItem" template-id="search-template"></appbar-item>
        </items>   
    </kendo-appbar>
```

## Functionality and Features

* [Items]({% slug taghelpers_items_appbar_aspnetcore %}) - items can have various attributes like templates, classes and titles
* [Positioning]({% slug taghelpers_positioning_appbar_aspnetcore %}) - the AppBar supports different placements and also change its position when the page is scrolled

## Events

You can subscribe to the AppBar widget's events.

```tagHelper
    @addTagHelper *, Kendo.Mvc
  
    <kendo-appbar name="appbar" theme-color="AppBarThemeColor.Inherit" on-resize="onResize">
        <items>
            <appbar-item type="AppBarItemType.ContentItem" template="<a class='k-button' href='\\#'><span class='k-icon k-i-menu'></span></a>"></appbar-item>
            <appbar-item type="AppBarItemType.Spacer" width="16px"></appbar-item>
            <appbar-item type="AppBarItemType.ContentItem" template-id="search-template"></appbar-item>
        </items>   
    </kendo-appbar>

    <script>
        function onResize(e){
            //handle the AppBar widget's resize event
        };
    </script>
```

## See Also

* [Basic Usage of the AppBar TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/appbar/tag-helper)
