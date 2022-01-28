---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI BottomNavigation HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_bottomnavigation_aspnetcore
position: 1
---

# BottomNavigation HtmlHelper Overview

The Telerik BottomNavigation HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI BottomNavigation widget.

The BottomNavigation allows movement between primary destinations in an application. The main purpose of the component is to offer a navigation element whose options are represented by an icon and text.

Visit the [Demo page for the BottomNavigation](https://demos.telerik.com/{{ site.platform }}/bottomnavigation/index) to see it in action.

## Initializing the BottomNavigation

The following example demonstrates how to define the BottomNavigation by using the BottomNavigation HtmlHelper.

```Razor
    @(Html.Kendo().BottomNavigation()
        .Name("bottomnavigation")
    )
```

## Basic Configuration

The following example demonstrates the basic configuration for the BottomNavigation HtmlHelper.

```Razor
    @(Html.Kendo().BottomNavigation()
            .Name("bottomNavigation")
            .PositionMode(BottomNavigationPositionMode.Absolute)
            .HtmlAttributes( new { style="bottom:0;"})
            .Items(i=> {
                i.Add().Text("Inbox").Data(new { view = "inbox" }).Icon("email").Selected(true);
                i.Add().Text("Calendar").Data(new { view = "calendar" }).Icon("calendar-date");
                i.Add().Text("Profile").Data(new { view = "profile" }).Icon("user");
            })
    )

    <script>
    $(function() {
        // The Name() of the BottomNavigation is used to get its client-side instance.
        var bottomNavigation = $("#bottomNavigation").data("kendoBottomNavigation");
    });
    </script>
```

## Functionality and Features

* [Items]({% slug htmlhelpers_items_bottomnavigation_aspnetcore %}) - the configuration allows you to set various attributes like icons and text.
* [Appearance]({% slug htmlhelpers_appearance_bottomnavigation_aspnetcore %}) - the configuration allows you to modify the appearance of the component.
* [Templates]({% slug htmlhelpers_templates_bottomnavigation_aspnetcore %}) - the configuration allows you to customize how the items will be rendered.
* [Accessibility]({% slug htmlhelpers_accessibility_bottomnavigation_aspnetcore %}) - the BottomNavigation supports various accessibility standards.

## See Also

* [Basic Usage of the BottomNavigation HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bottomnavigation/index)
* [Using the API of the BottomNavigation HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bottomnavigation/api)
