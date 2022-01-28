---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the BottomNavigation HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_appearance_bottomnavigation_aspnetcore
position: 3
---

# Appearance

The Telerik BottomNavigation HtmlHelper for {{ site.framework }} allows you to alter the appearance of the component by setting its [ItemFlow](/api/javascript/ui/bottomnavigation/configuration/itemflow), [ThemeColor](/api/javascript/ui/bottomnavigation/configuration/themeColor), [Border](/api/javascript/ui/bottomnavigation/configuration/border), [Shadow](/api/javascript/ui/bottomnavigation/configuration/shadow) and [Fill](/api/javascript/ui/bottomnavigation/configuration/fill) options.

The example below demonstrates how to modify the appearance by using the above settings:

```Razor
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

## See Also

* [Appearance of the BottomNavigation HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bottomnavigation/appearance)
* [Server-Side API](/api/bottomnavigation)