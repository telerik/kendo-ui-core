---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI BottomNavigation component for {{ site.framework }}."
slug: events_bottomnavigation
---

# Events

The BottomNavigation [exposes a `Select()` event](/api/Kendo.Mvc.UI.Fluent/BottomNavigationEventBuilder) that you can handle to customize the functions of the component. Using this event allows you to switch between the content of the BottomNavigation items.

For a complete example on basic BottomNavigation events, refer to the [demo on using the events of the BottomNavigation](https://demos.telerik.com/{{ site.platform }}/bottomnavigation/events).

```HtmlHelper
    @using Kendo.Mvc.UI

    <div class="demo-app" style="position:relative">
        @(Html.Kendo().BottomNavigation()
            .Name("bottomNavigation")
            .PositionMode(BottomNavigationPositionMode.Absolute)
            .HtmlAttributes( new { style="bottom:0;"})
            .Items(i=> {
                i.Add().Text("Profile").Data(new { view = "profile" }).Icon("user").Selected(true);
                i.Add().Text("Calendar").Data(new { view = "calendar" }).Icon("calendar-date");
            })
            .Events(e => e.Select("onSelect"))
        )
        <div id="profile" class="demo-view" style="display: initial;position:absolute;">
            <h3>Your Profile</h3>
        </div>
        <div id="calendar" style="display: none;position:absolute" class="demo-view">
            @(Html.Kendo().Calendar().Name("calendar-widget"))
        </div>
    </div>
    <script>
        function onSelect(e) {
            var id = e.data.view
            $(".demo-view").hide();
            $("#" + id).show();
        }
    </script>
    <style>
        .demo-app {
            margin: auto;
            width: 234px;
            height: 400px;
        }
    </style>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    @{
        var calendar = new { view = "calendar" };
        var profile = new { view = "profile" };
    }  

    <div class="demo-app" style="position:relative">

        <kendo-bottomnavigation name="bottomNavigation" on-select="onSelect" position-mode="BottomNavigationPositionMode.Absolute" style="bottom:0;">
            <bottomnavigation-items>
                <bottomnavigation-item context-data="@profile" text="Profile" icon="user" selected="true"></bottomnavigation-item>
                <bottomnavigation-item context-data="@calendar" text="Calendar" icon="calendar-date"></bottomnavigation-item>
            </bottomnavigation-items>
        </kendo-bottomnavigation>

        <div id="profile" class="demo-view" style="display: initial;position:absolute;">
            <h3>Your Profile</h3>
        </div>
        <div id="calendar" style="display: none;position:absolute" class="demo-view">
            <kendo-calendar name="calendar-widget"></kendo-calendar>
        </div>

    </div>

    <script>
    function onSelect(e) {
        var id = e.data.view
        $(".demo-view").hide();
        $("#" + id).show();
    }
    </script>
    <style>
    .demo-app {
        margin: auto;
        width: 234px;
        height: 400px;
    }
    </style>
```
{% endif %}

## Next Steps

* [Using the BottomNavigation Events (Demo)](https://demos.telerik.com/aspnet-core/bottomnavigation/events)
* [API for Configuring BottomNavigation events](/api/Kendo.Mvc.UI.Fluent/BottomNavigationEventBuilder)

## See Also

* [Using the API of the BottomNavigation for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/bottomnavigation/api)
* [BottomNavigation Server-Side API](/api/bottomnavigation)
* [BottomNavigation Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/bottomnavigation)
