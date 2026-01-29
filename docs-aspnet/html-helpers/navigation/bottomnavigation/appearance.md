---
title: Appearance
page_title: Appearance
description: "Learn how to customize the appearance of the BottomNavigation component for {{ site.framework }}."
components: ["bottomnavigation"]
slug: htmlhelpers_appearance_bottomnavigation_aspnetcore
position: 3
---

# Appearance

In this article, you will find information about the styling options of the {{ site.product }} BottomNavigation that allow you to customize the overall component appearance based on your needs and preferences.

For a complete example, refer to the [Appearance Demo of the BottomNavigation](https://demos.telerik.com/{{ site.platform }}/bottomnavigation/appearance).

## Options

The BottomNavigation component provides the following styling options:

- [`ItemFlow()`](#itemflow)&mdash;Sets the position of the labels against the items.
- [`ThemeColor()`](#themecolor)&mdash;Specifies the color applied to the component.
- [`Border()`](#border)&mdash;Toggles the border of the BottomNavigation.
- [`Fill()`](#fill)&mdash;Defines how the color is applied to the BottomNavigation.
- [`Shadow()`](#shadow)&mdash;Sets the shadow of the component.
- [`PositionMode()`](#positionmode)&mdash;Determines the CSS position of the BottomNavigation in the page.

### ItemFlow

To control the position of the text labels against the items, set the [`ItemFlow`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/bottomnavigationbuilder#itemflowkendomvcuibottomnavigationitemflow) option to `Vertical` or `Horizonatal`.

```HtmlHelper
    @(Html.Kendo().BottomNavigation()
        .Name("bottomNavigation")
        .ItemFlow(BottomNavigationItemFlow.Vertical)
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
    @{
        var home = new { view = "home" };
        var calendar = new { view = "calendar" };
        var profile = new { view = "profile" };
    }

    <kendo-bottomnavigation name="bottomNavigation" item-flow="BottomNavigationItemFlow.Vertical">
        <bottomnavigation-items>
            <bottomnavigation-item context-data="@home" text="Home" icon="home" selected="true"></bottomnavigation-item>
            <bottomnavigation-item context-data="@calendar" text="Calendar" icon="calendar-date"></bottomnavigation-item>
            <bottomnavigation-item context-data="@profile" text="Profile" icon="user"></bottomnavigation-item>
        </bottomnavigation-items>
    </kendo-bottomnavigation>
```
{% endif %}

### ThemeColor

The [`ThemeColor`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/bottomnavigationbuilder#themecolorkendomvcuibottomnavigationthemecolor) configuration provides a variety of colors that can be applied to the component. The available options are:

- `Default`
- `Primary`
- `Secondary`
- `Tertiary`
- `Info`
- `Success`
- `Warning`
- `Error`
- `Dark`
- `Light`
- `Inverse`
- `Inherit` (no coloring will be applied)

The default `ThemeColor` is `Primary`.

```HtmlHelper
    @(Html.Kendo().BottomNavigation()
        .Name("bottomNavigation")
        .ThemeColor(BottomNavigationThemeColor.Info)
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
    @{
        var home = new { view = "home" };
        var calendar = new { view = "calendar" };
        var profile = new { view = "profile" };
    }

    <kendo-bottomnavigation name="bottomNavigation" theme-color="BottomNavigationThemeColor.Info">
        <bottomnavigation-items>
            <bottomnavigation-item context-data="@home" text="Home" icon="home" selected="true"></bottomnavigation-item>
            <bottomnavigation-item context-data="@calendar" text="Calendar" icon="calendar-date"></bottomnavigation-item>
            <bottomnavigation-item context-data="@profile" text="Profile" icon="user"></bottomnavigation-item>
        </bottomnavigation-items>
    </kendo-bottomnavigation>
```
{% endif %}

### Border

You can toggle the visibility of the border around the BottomNavigation through the [`Border()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/bottomnavigationbuilder#bordersystemboolean) option. By default, the border is visible.

```HtmlHelper
    @(Html.Kendo().BottomNavigation()
        .Name("bottomNavigation")
        .Border(false)
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
    @{
        var home = new { view = "home" };
        var calendar = new { view = "calendar" };
        var profile = new { view = "profile" };
    }

    <kendo-bottomnavigation name="bottomNavigation" border="false">
        <bottomnavigation-items>
            <bottomnavigation-item context-data="@home" text="Home" icon="home" selected="true"></bottomnavigation-item>
            <bottomnavigation-item context-data="@calendar" text="Calendar" icon="calendar-date"></bottomnavigation-item>
            <bottomnavigation-item context-data="@profile" text="Profile" icon="user"></bottomnavigation-item>
        </bottomnavigation-items>
    </kendo-bottomnavigation>
```
{% endif %}

### Fill

The [`Fill()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/bottomnavigationbuilder#fillkendomvcuibottomnavigationfill) method specifies how the color is applied to the component. The default fill mode of the BottomNavigation is `Flat`.

```HtmlHelper
    @(Html.Kendo().BottomNavigation()
        .Name("bottomNavigation")
        .Fill(BottomNavigationFill.Solid)
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
    @{
        var home = new { view = "home" };
        var calendar = new { view = "calendar" };
        var profile = new { view = "profile" };
    }

    <kendo-bottomnavigation name="bottomNavigation" fill="BottomNavigationFill.Solid">
        <bottomnavigation-items>
            <bottomnavigation-item context-data="@home" text="Home" icon="home" selected="true"></bottomnavigation-item>
            <bottomnavigation-item context-data="@calendar" text="Calendar" icon="calendar-date"></bottomnavigation-item>
            <bottomnavigation-item context-data="@profile" text="Profile" icon="user"></bottomnavigation-item>
        </bottomnavigation-items>
    </kendo-bottomnavigation>
```
{% endif %}

### Shadow

By default, the BottomNavigation does not have a [`box-shadow`](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow) CSS property. You can add a shadow effect by using the [`Shadow()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/bottomnavigationbuilder#shadowsystemboolean) option.

```HtmlHelper
    @(Html.Kendo().BottomNavigation()
        .Name("bottomNavigation")
        .Shadow(true)
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
    @{
        var home = new { view = "home" };
        var calendar = new { view = "calendar" };
        var profile = new { view = "profile" };
    }

    <kendo-bottomnavigation name="bottomNavigation" shadow="true">
        <bottomnavigation-items>
            <bottomnavigation-item context-data="@home" text="Home" icon="home" selected="true"></bottomnavigation-item>
            <bottomnavigation-item context-data="@calendar" text="Calendar" icon="calendar-date"></bottomnavigation-item>
            <bottomnavigation-item context-data="@profile" text="Profile" icon="user"></bottomnavigation-item>
        </bottomnavigation-items>
    </kendo-bottomnavigation>
```
{% endif %}

### PositionMode

The CSS position of the BottomNavigation in the document can be defined through the [`PositionMode()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/bottomnavigationbuilder#positionmodekendomvcuibottomnavigationpositionmode) method. The default position of the component is `Fixed`.

```HtmlHelper
    @(Html.Kendo().BottomNavigation()
        .Name("bottomNavigation")
        .PositionMode(BottomNavigationPositionMode.Absolute)
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
    @{
        var home = new { view = "home" };
        var calendar = new { view = "calendar" };
        var profile = new { view = "profile" };
    }

    <kendo-bottomnavigation name="bottomNavigation" position-mode="BottomNavigationPositionMode.Absolute">
        <bottomnavigation-items>
            <bottomnavigation-item context-data="@home" text="Home" icon="home" selected="true"></bottomnavigation-item>
            <bottomnavigation-item context-data="@calendar" text="Calendar" icon="calendar-date"></bottomnavigation-item>
            <bottomnavigation-item context-data="@profile" text="Profile" icon="user"></bottomnavigation-item>
        </bottomnavigation-items>
    </kendo-bottomnavigation>
```
{% endif %}

The following values are available for the `PositionMode` option:

- `Absolute`
- `Fixed`
- `Sticky`

## See Also

* [Appearance of the BottomNavigation HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bottomnavigation/appearance)
* [Server-Side API](/api/bottomnavigation)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/bottomnavigation)