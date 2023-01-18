---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI TabStrip component for {{ site.framework }}."
slug: events_tabstrip_aspnetcore
position: 7
---

# Events

The Telerik UI TabStrip for {{ site.framework }} exposes multiple [events](/api/Kendo.Mvc.UI.Fluent/TabStripEventBuilder) that allow you to control and customize the behavior of the UI component.

For a complete example on basic TabStrip events, refer to the [demo on using the events of the TabStrip](https://demos.telerik.com/{{ site.platform }}/tabstrip/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
@(Html.Kendo().TabStrip()
    .Name("tabstrip")
    .Items(tabstrip =>
    {
        tabstrip.Add().Text("Paris")
            .LoadContentFrom(Url.Action("Paris", "Home"));

        tabstrip.Add().Text("Sofia")
            .LoadContentFrom(Url.Action("Sofia", "Home"));
    })
    .Events(events => events
        .Show("onShow")
        .Select("onSelect")
        .Activate("onActivate")
        .ContentLoad("onContentLoad")
        .Error("onError")
    )
)
```
{% if site.core %}
```TagHelper
<kendo-tabstrip name="tabstrip"
                on-show="onShow"
                on-select="onSelect"
                on-activate="onActivate"
                on-content-load="onContentLoad"
                on-error="onError">
    <items>
        <tabstrip-item text="Paris"
                       content-url="@Url.Action("Paris", "Home")">
            
        </tabstrip-item>
        <tabstrip-item text="Sofia"
                        content-url="@Url.Action("Sofia", "Home")">
           
        </tabstrip-item>
    </items>
</kendo-tabstrip>

```
{% endif %}
```script
<script type="text/javascript">
    function onShow(e) {
        console.log("Shown: " + $(e.item).find("> .k-link").text());
    }

    function onSelect(e) {
        console.log("Selected: " + $(e.item).find("> .k-link").text());
    }

    function onActivate(e) {
        console.log("Activated: " + $(e.item).find("> .k-link").text());
    }

    function onContentLoad(e) {
        console.log("Content loaded in <b>"+ $(e.item).find("> .k-link").text() + "</b>");
    }

    function onError(e) {
        console.error("Loading failed with " + e.xhr.statusText + " " + e.xhr.status);
    }
</script>
```

## Next Steps

* [Using the TabStrip Events (Demo)](https://demos.telerik.com/{{ site.platform }}/tabstrip/events)

## See Also

* [Using the API of the TabStrip HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tabstrip/api)
* [TabStrip Server-Side API](/api/tabstrip)
* [TabStrip Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip)
