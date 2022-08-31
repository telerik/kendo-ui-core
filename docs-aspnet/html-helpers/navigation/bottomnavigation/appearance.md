---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the BottomNavigation component for {{ site.framework }}."
slug: htmlhelpers_appearance_bottomnavigation_aspnetcore
position: 3
---

# Appearance

The Telerik BottomNavigation for {{ site.framework }} allows you to alter the appearance of the component by setting its [ItemFlow](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/BottomNavigationBuilder#itemflowkendomvcuibottomnavigationitemflow), [ThemeColor](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/BottomNavigationBuilder#themecolorkendomvcuibottomnavigationthemecolor), [Border](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/BottomNavigationBuilder#bordersystemboolean), [Shadow](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/BottomNavigationBuilder#shadowsystemboolean) and [Fill](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/BottomNavigationBuilder#fillkendomvcuibottomnavigationfill) options.

The example below demonstrates how to modify the appearance by using the above settings:

```HtmlHelper
    @(Html.Kendo().BottomNavigation()
        .Name("bottomNavigation")
        .PositionMode(BottomNavigationPositionMode.Absolute)
        .ItemFlow( BottomNavigationItemFlow.Horizontal)
        .Fill( BottomNavigationFill.Solid)
        .Border(false)
        .Shadow(true)
        .ThemeColor( BottomNavigationThemeColor.Dark)
        .HtmlAttributes(new { style = "bottom:0;" })
        .Items(i =>
        {
            i.Add().Text("Home").Data(new { view = "home" }).Icon("home").Selected(true);
            i.Add().Text("Calendar").Data(new { view = "calendar" }).Icon("calendar-date");
            i.Add().Text("Profile").Data(new { view = "profile" }).Icon("user");
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @{
        var home = new { view= "home" };
        var calendar = new { view = "calendar" };
        var profile = new { view = "profile" };
    }  
    <kendo-bottomnavigation
        name="bottomNavigation"
        position-mode="BottomNavigationPositionMode.Absolute"
        item-flow="BottomNavigationItemFlow.Horizontal"
        fill="BottomNavigationFill.Solid"
        border="false"
        shadow="true"
        theme-color="BottomNavigationThemeColor.Dark"
        style="bottom:0;">
        <bottomnavigation-items>
            <bottomnavigation-item context-data="@home" text="Home" icon="home" selected="true"></bottomnavigation-item>
            <bottomnavigation-item context-data="@calendar" text="Calendar" icon="calendar-date"></bottomnavigation-item>
            <bottomnavigation-item context-data="@profile" text="Profile" icon="user"></bottomnavigation-item>
        </bottomnavigation-items>
    </kendo-bottomnavigation>
```
{% endif %}

## See Also

* [Appearance of the BottomNavigation HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bottomnavigation/appearance)
* [Server-Side API](/api/bottomnavigation)