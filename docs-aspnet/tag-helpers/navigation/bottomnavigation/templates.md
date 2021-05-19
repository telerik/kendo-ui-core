---
title: Templates
page_title: Templates
description: "Learn the basics when working with the Telerik BottomNavigation TagHelper for {{ site.framework }}."
slug: taghelpers_templates_bottomnavigation_aspnetcore
position: 4
---

# Templates

The Telerik BottomNavigation TagHelper for {{ site.framework }} provides full control over the rendering of the items by using Kendo UI templates.

Visit the [Demo page for the BottomNavigation](https://demos.telerik.com/{{ site.platform }}/bottomnavigation/templates) to see it in action.

## Item Templates

The `Template` and `TemplateId` configurations manage the rendering of the BottomNavigation items.

```tagHelper
    @addTagHelper *, Kendo.Mvc
    @{
        var home = new { view= "home"};
        var calendar = new { view = "calendar" };
        var profile = new { view = "profile" };
    }  
    <kendo-bottomnavigation name="bottomNavigation" position-mode="BottomNavigationPositionMode.Absolute" template-id="bottomnav-template">
            <bottomnavigation-items>
                <bottomnavigation-item context-data="@home" text="Home" icon="home" selected="true"></bottomnavigation-item>
                <bottomnavigation-item context-data="@calendar" text="Calendar" icon="calendar"></bottomnavigation-item>
                <bottomnavigation-item context-data="@profile" text="Profile" icon="user"></bottomnavigation-item>
            </bottomnavigation-items>
    </kendo-bottomnavigation>
    <script id="bottomnav-template" type="text/x-kendo-template">
        <span class="k-icon k-i-#= icon #"> </span>
        <span> #= text # </span>
        <span id="badge-#=text#"></span>
    </script>
```

## See Also

* [Basic Usage of the BottomNavigation TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/bottomnavigation/tag-helper)
