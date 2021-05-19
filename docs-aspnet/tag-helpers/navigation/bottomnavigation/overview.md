---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik BottomNavigation TagHelper for ASP.NET Core."
slug: taghelpers_bottomnavigation_aspnetcore_overview
position: 1
---

# BottomNavigation TagHelper Overview

The Telerik UI BottomNavigation TagHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI BottomNavigation widget.

The BottomNavigation is a UI component that allows movement between primary destinations in an application. The main purpose of the component is to offer a navigation element whose options are represented by an icon and text.

Visit the [Demo page for the BottomNavigation](https://demos.telerik.com/aspnet-core/bottomnavigation/tag-helper) to see it in action.

## Basic Configuration

The following example demonstrates how to initialize the BottomNavigation using the TagHelper wrapper.

```tagHelper
    @addTagHelper *, Kendo.Mvc
    @{
        var home = new { view= "home"};
        var calendar = new { view = "calendar" };
        var profile = new { view = "profile" };
    }  
    <kendo-bottomnavigation name="bottomNavigation" position-mode="BottomNavigationPositionMode.Absolute">
            <bottomnavigation-items>
                <bottomnavigation-item context-data="@home" text="Home" icon="home" selected="true"></bottomnavigation-item>
                <bottomnavigation-item context-data="@calendar" text="Calendar" icon="calendar"></bottomnavigation-item>
                <bottomnavigation-item context-data="@profile" text="Profile" icon="user"></bottomnavigation-item>
            </bottomnavigation-items>
    </kendo-bottomnavigation>
```

## Functionality and Features

* [Items]({% slug taghelpers_items_bottomnavigation_aspnetcore %}) - the configuration allows you to set various attributes like icons and text.
* [Appearance]({% slug taghelpers_appearance_bottomnavigation_aspnetcore %}) - the configuration allows you to modify the appearance of the component.
* [Templates]({% slug taghelpers_templates_bottomnavigation_aspnetcore %}) - the configuration allows you to customize how the items will be rendered.

## Events

You can subscribe to the BottomNavigation events.

```tagHelper
    @addTagHelper *, Kendo.Mvc
    @{
        var home = new { view= "home"};
        var calendar = new { view = "calendar" };
        var profile = new { view = "profile" };
    }   
    <kendo-bottomnavigation name="bottomNavigation" on-select="onSelect" position-mode="BottomNavigationPositionMode.Absolute">
        <bottomnavigation-items>
            <bottomnavigation-item context-data="@home" text="Home" icon="home" selected="true"></bottomnavigation-item>
            <bottomnavigation-item context-data="@calendar" text="Calendar" icon="calendar"></bottomnavigation-item>
            <bottomnavigation-item context-data="@profile" text="Profile" icon="user"></bottomnavigation-item>
        </bottomnavigation-items>
    </kendo-bottomnavigation>

    <script>
        function onSelect(e){
            //handle the BottomNavigation select event
        };
    
    </script>
```

## See Also

* [Basic Usage of the BottomNavigation TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/bottomnavigation/tag-helper)
