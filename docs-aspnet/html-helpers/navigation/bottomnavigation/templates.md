---
title: Templates
page_title: Templates
description: "Learn the basics when working with the BottomNavigation component for {{ site.framework }}."
slug: htmlhelpers_templates_bottomnavigation_aspnetcore
position: 4
---

# Templates

The Telerik BottomNavigation for {{ site.framework }} provides full control over the rendering of the items by using Kendo UI templates.

Visit the [Demo page for the BottomNavigation](https://demos.telerik.com/{{ site.platform }}/bottomnavigation/templates) to see it in action.

## Item Templates

The `Template` and `TemplateId` configurations manage the rendering of the BottomNavigation items.

```HtmlHelper
    @(Html.Kendo().BottomNavigation()
        .Name("bottomNavigation")
        .PositionMode(BottomNavigationPositionMode.Absolute)
        .HtmlAttributes(new { style = "bottom:0;" })
        .TemplateId("bottomnav-template")
        .Items(i =>
        {
            i.Add().Text("Inbox").Data(new { view = "inbox" }).Icon("envelop").Selected(true).HtmlAttributes(new { id = "Inbox" });
            i.Add().Text("Calendar").Data(new { view = "calendar" }).Icon("calendar-date").HtmlAttributes(new { id = "Calendar" });
            i.Add().Text("Profile").Data(new { view = "profile" }).Icon("user").HtmlAttributes(new { id = "Profile" });
        })
    )

    <script id="bottomnav-template" type="text/x-kendo-template">
        <span class="k-icon k-i-#= icon #"> </span>
        <span> #= text # </span>
        <span id="badge-#=text#"></span>
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

    <kendo-bottomnavigation name="bottomNavigation" position-mode="BottomNavigationPositionMode.Absolute" style="bottom:0;" template-id="bottomnav-template">
            <bottomnavigation-items>
                <bottomnavigation-item
                    context-data="@inbox"
                    text="Inbox"
                    icon="envelop"
                    selected="true"
                    html-attributes='new Dictionary<string,object> { ["id"] = "Inbox" }'>
                </bottomnavigation-item>
                <bottomnavigation-item
                    context-data="@calendar"
                    text="Calendar"
                    icon="calendar-date"
                    html-attributes='new Dictionary<string,object> { ["id"] = "Calendar" }'>
                </bottomnavigation-item>
                <bottomnavigation-item
                    context-data="@profile"
                    text="Profile"
                    icon="user"
                    html-attributes='new Dictionary<string,object> { ["id"] = "Profile" }'>
                </bottomnavigation-item>
            </bottomnavigation-items>
    </kendo-bottomnavigation>

    <script id="bottomnav-template" type="text/x-kendo-template">
        <span class="k-icon k-i-#= icon #"> </span>
        <span> #= text # </span>
        <span id="badge-#=text#"></span>
    </script>
```
{% endif %}

## See Also

* [Templates of the BottomNavigation HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bottomnavigation/templates)
* [Server-Side API](/api/bottomnavigation)
