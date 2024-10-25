---
title: Items
page_title: Items
description: "Learn how to configure the items of the BottomNavigation component."
slug: htmlhelpers_items_bottomnavigation_aspnetcore
position: 2
---

# Items

The `Items` configuration allows you to set specific attributes of the BottomNavigation items. You can set their text (optionally) and icon. The configuration also allows you to add classes for the different items that are rendered when initializing the component. You can also set the selected and enabled state for the items.

> **Note:** When the `Items.Url` configuration is set, the items will be rendered as `<a>` tags. Otherwise, they will be rendered as `<span>` tags.

The following example demonstrates how to set the attributes of the BottomNavigation items through the `Items` configuration:

```HtmlHelper
    @(Html.Kendo().BottomNavigation()
        .Name("bottomNavigation")
        .PositionMode(BottomNavigationPositionMode.Absolute)
        .Items(i=> {
            i.Add().Url("#home").Data(new { view = "home" }).Icon("home").Enabled(false).CssClass("custom-css-class");
            i.Add().Url("#calendar").Data(new { view = "calendar" }).Template("<span class='k-bottom-nav-item-icon k-icon k-i-calendar-date'></span>").Icon("calendar-date").CssClass("custom-css-class");
            i.Add().Url("#profile").Data(new { view = "profile" }).Icon("user").CssClass("custom-css-class").Selected(true);
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
    <kendo-bottomnavigation name="bottomNavigation" position-mode="BottomNavigationPositionMode.Absolute">
            <bottomnavigation-items>
                <bottomnavigation-item context-data="@home" url="#home" enabled="false" icon="home" css-class="custom-css-class"></bottomnavigation-item>
                <bottomnavigation-item context-data="@calendar" url="#calendar" template="<span class='k-bottom-nav-item-icon k-icon k-i-calendar-date'></span>" icon="calendar-date" css-class="custom-css-class"></bottomnavigation-item>
                <bottomnavigation-item context-data="@profile" url="#profile" icon="user" css-class="custom-css-class" selected="true" ></bottomnavigation-item>
            </bottomnavigation-items>
    </kendo-bottomnavigation>
```
{% endif %}

## See Also

* [Items of the BottomNavigation HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bottomnavigation/items)
* [Server-Side API](/api/bottomnavigation)
