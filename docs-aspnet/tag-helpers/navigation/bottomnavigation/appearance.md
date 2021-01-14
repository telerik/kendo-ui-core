---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the Telerik BottomNavigation TagHelper for {{ site.framework }}."
slug: taghelpers_appearance_bottomnavigation_aspnetcore
position: 3
---

# Appearance

The Telerik BottomNavigation TagHelper for {{ site.framework }} allows you to alter the appearance of the component by setting its [item-flow](/api/javascript/ui/bottomnavigation/configuration/itemflow), [theme-color](/api/javascript/ui/bottomnavigation/configuration/themeColor), [border](/api/javascript/ui/bottomnavigation/configuration/border), [shadow](/api/javascript/ui/bottomnavigation/configuration/shadow) and [fill](/api/javascript/ui/bottomnavigation/configuration/fill) options.

The example below demonstrates how to modify the appearance by using the above settings:

```tagHelper
    @addTagHelper *, Kendo.Mvc
    @{
        var home = new { view= "home"};
        var calendar = new { view = "calendar" };
        var profile = new { view = "profile" };
    }  
    <kendo-bottomnavigation
            name="bottomNavigation"
            position-mode="BottomNavigationPositionMode.Absolute"
            item-flow="BottomNavigationItemFlow.Horizontal"
            theme-color="BottomNavigationThemeColor.Secondary"
            fill="BottomNavigationFill.Solid"
            border="false"
            shadow="true">
        <bottomnavigation-items>
            <bottomnavigation-item context-data="@home" text="Home" icon="home" selected="true"></bottomnavigation-item>
            <bottomnavigation-item context-data="@calendar" text="Calendar" icon="calendar"></bottomnavigation-item>
            <bottomnavigation-item context-data="@profile" text="Profile" icon="user"></bottomnavigation-item>
        </bottomnavigation-items>
    </kendo-bottomnavigation>
```

## See Also

* [Basic Usage of the BottomNavigation TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/bottomnavigation/tag-helper)

