---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI BottomNavigation component for {{ site.framework }}."
slug: htmlhelpers_bottomnavigation_aspnetcore
position: 1
---

# BottomNavigation Overview

{% if site.core %}
The Telerik UI BottomNavigation TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI BottomNavigation widget.
{% else %}
The Telerik BottomNavigation HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI BottomNavigation widget.
{% endif %}

The BottomNavigation allows movement between primary destinations in an application. The main purpose of the component is to offer a navigation element whose options are represented by an icon and text.

* [Demo page for the BottomNavigation HtmlHelper](https://demos.telerik.com/{{ site.platform }}/bottomnavigation/index)
{% if site.core %}
* [Demo page for the BottomNavigation TagHelper](https://demos.telerik.com/aspnet-core/bottomnavigation/tag-helper)
{% endif %}

## Initializing the BottomNavigation

The following example demonstrates how to define the BottomNavigation.

```HtmlHelper
    @(Html.Kendo().BottomNavigation()
        .Name("bottomnavigation")
    )
```
{% if site.core %}
```TagHelper
       <kendo-bottomnavigation name="bottomnavigation">
       </kendo-bottomnavigation>
```
{% endif %}

## Basic Configuration

The following example demonstrates the basic configuration for the BottomNavigation.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @{
        var inbox = new { view= "inbox" };
        var calendar = new { view = "calendar" };
        var profile = new { view = "profile" };
    }  
    <kendo-bottomnavigation name="bottomNavigation" position-mode="BottomNavigationPositionMode.Absolute" style="bottom:0;">
            <bottomnavigation-items>
                <bottomnavigation-item context-data="@inbox" text="Inbox" icon="email" selected="true"></bottomnavigation-item>
                <bottomnavigation-item context-data="@calendar" text="Calendar" icon="calendar-date"></bottomnavigation-item>
                <bottomnavigation-item context-data="@profile" text="Profile" icon="user"></bottomnavigation-item>
            </bottomnavigation-items>
    </kendo-bottomnavigation>

    <script>
        $(function() {
            // The Name() of the BottomNavigation is used to get its client-side instance.
            var bottomNavigation = $("#bottomNavigation").data("kendoBottomNavigation");
        });
    </script>
```
{% endif %}

## Functionality and Features

* [Items]({% slug htmlhelpers_items_bottomnavigation_aspnetcore %}) - the configuration allows you to set various attributes like icons and text.
* [Appearance]({% slug htmlhelpers_appearance_bottomnavigation_aspnetcore %}) - the configuration allows you to modify the appearance of the component.
* [Templates]({% slug htmlhelpers_templates_bottomnavigation_aspnetcore %}) - the configuration allows you to customize how the items will be rendered.
* [Accessibility]({% slug htmlhelpers_accessibility_bottomnavigation_aspnetcore %}) - the BottomNavigation supports various accessibility standards.

## See Also

* [Basic Usage of the BottomNavigation HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bottomnavigation/index)
{% if site.core %}
* [Basic Usage of the BottomNavigation TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/bottomnavigation/tag-helper)
{% endif %}
* [Using the API of the BottomNavigation HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bottomnavigation/api)
