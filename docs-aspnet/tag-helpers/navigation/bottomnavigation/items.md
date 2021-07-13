---
title: Items
page_title: Items
description: "Learn how to configure the items of the BottomNavigation component."
slug: taghelpers_items_bottomnavigation_aspnetcore
position: 2
---

# Items

The `items` configuration allows you to set specific attributes of the BottomNavigation items. You can set their text (optionally) and icon. The configuration also allows you to add classes for the different items that are rendered when initializing the component. You can also set the selected and enabled state for the items.

> **Note:** When the `url` configuration is set, the items will be rendered as `<a>` tags. Otherwise, they will be rendered as `<span>` tags.

The following example demonstrates how to set the attributes of the BottomNavigation items through the `items` configuration:

```tagHelper
    @addTagHelper *, Kendo.Mvc
    @{
        var home = new { view= "home"};
        var calendar = new { view = "calendar" };
        var profile = new { view = "profile" };
    }  
    <kendo-bottomnavigation name="bottomNavigation" position-mode="BottomNavigationPositionMode.Absolute">
            <bottomnavigation-items>
                <bottomnavigation-item context-data="@home" url="#home" text="Home" enabled="false" icon="home" selected="true" css-class="custom-css-class"></bottomnavigation-item>
                <bottomnavigation-item context-data="@calendar" url="#calendar" template="<span class='k-bottom-nav-item-icon k-icon k-i-calendar-date'></span>" text="Calendar" icon="calendar" css-class="custom-css-class"></bottomnavigation-item>
                <bottomnavigation-item context-data="@profile" url="#profile" selected="true" text="Profile" icon="user" css-class="custom-css-class"></bottomnavigation-item>
            </bottomnavigation-items>
    </kendo-bottomnavigation>
```

## See Also

* [Basic Usage of the BottomNavigation TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/bottomnavigation/tag-helper)
