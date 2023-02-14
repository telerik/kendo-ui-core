---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI ButtonGroup component for {{ site.framework }}."
slug: events_buttongroup_aspnetcore
position: 7
---

# Events

The ButtonGroup exposes a [`Select()` event](/api/Kendo.Mvc.UI.Fluent/ButtonGroupEventBuilder) that you can handle.

For a complete example on basic ButtonGroup events, refer to the [demo on using the events of the ButtonGroup](https://demos.telerik.com/{{ site.platform }}/buttongroup/events).

```HtmlHelper
    @using Kendo.Mvc.UI

        @(Html.Kendo().ButtonGroup()
        .Name("player")
        .Items(t =>
        {
            t.Add().Text("Month");
            t.Add().Text("Quarter");
            t.Add().Text("Year");
        })
        .Events(ev => ev.Select("onSelect"))
        )

    <script>
        function onSelect(e) {
            console.log("selected index:" + e.indices);
        }
    </script>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

        <kendo-buttongroup name="player"
                        on-select="onSelect">
            <buttongroup-items>
                <item text="Month"></item>
                <item text="Quarter"></item>
                <item text="Year"></item>
            </buttongroup-items>
        </kendo-buttongroup>

    <script>
        function onSelect(e) {
            console.log("selected index:" + e.indices);
        }
    </script>
```

{% endif %}

## Next Steps

* [Using the ButtonGroup Events (Demo)](https://demos.telerik.com/aspnet-core/buttongroup/events)

## See Also

* [Using the API of the ButtonGroup HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/buttongroup/api)
* [ButtonGroup Server-Side API for {{ site.framework }}](/api/buttongroup)
* [ButtonGroup Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/buttongroup)
