---
title: Overview
page_title: Overview
description: "Discover the Telerik UI BottomNavigation component for {{ site.framework }} that provides built-in configuration options for its items and appearance."
slug: htmlhelpers_bottomnavigation_aspnetcore
position: 1
---

# {{ site.framework }} BottomNavigation Overview

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
            i.Add().Text("Inbox").Data(new { view = "inbox" }).Icon("envelop").Selected(true);
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
                <bottomnavigation-item context-data="@inbox" text="Inbox" icon="envelop" selected="true"></bottomnavigation-item>
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

* [Items]({% slug htmlhelpers_items_bottomnavigation_aspnetcore %})&mdash;The items configuration allows you to set various attributes like icons and text.
* [Appearance]({% slug htmlhelpers_appearance_bottomnavigation_aspnetcore %})&mdash;The built-in appearance configuration allows you to customize the component.
* [Templates]({% slug htmlhelpers_templates_bottomnavigation_aspnetcore %})&mdash;The templates give you control over the rendering of the BottomNavigation items.
* [Accessibility]({% slug htmlhelpers_accessibility_bottomnavigation_aspnetcore %})&mdash;The BottomNavigation supports accessibility standards like WAI-ARIA, Section 508, WCAG 2.2, and provides keyboard support.
* [Events]({% slug events_bottomnavigation %})&mdash;Use the `Select()` event to control the functions of the component.

## Next Steps

* [Getting Started with the BottomNavigation]({% slug bottomnavigation_getting_started %})
* [Basic Usage of the BottomNavigation HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bottomnavigation/index)
{% if site.core %}
* [Basic Usage of the BottomNavigation TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/bottomnavigation/tag-helper)
{% endif %}

## See Also

* [Using the API of the BottomNavigation for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bottomnavigation/api)
* [Knowledge Base Section](/knowledge-base)
