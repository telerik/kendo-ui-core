---
title: Templates
page_title: Templates
description: "Learn the basics when working with the BottomNavigation HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_templates_bottomnavigation_aspnetcore
position: 4
---

# Templates

The Telerik BottomNavigation HtmlHelper for {{ site.framework }} provides full control over the rendering of the items by using Kendo UI templates.

Visit the [Demo page for the BottomNavigation](https://demos.telerik.com/{{ site.platform }}/bottomnavigation/templates) to see it in action.

## Item Templates

The `Template` and `TemplateId` configurations manage the rendering of the BottomNavigation items.

```Razor
    @(Html.Kendo().BottomNavigation()
        .Name("bottomNavigation")                    
        .PositionMode(BottomNavigationPositionMode.Absolute)
        .HtmlAttributes(new { style = "bottom:0;" })
        .TemplateId("bottomnav-template")
        .Items(i =>
        {
            i.Add().Text("Inbox").Data(new { view = "inbox" }).Icon("email").Selected(true).HtmlAttributes(new { id = "Inbox" });
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

## See Also

* [Templates of the BottomNavigation HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bottomnavigation/templates)
* [Server-Side API](/api/bottomnavigation)
