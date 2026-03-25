---
title: Events
page_title: SegmentedControl Events
description: "Learn how to handle the events of the Telerik UI SegmentedControl component for {{ site.framework }}."
components: ["segmentedcontrol"]
slug: htmlhelpers_segmentedcontrol_events
position: 2
---

# Events

The SegmentedControl exposes a [`Change()` event](/api/kendo.mvc.ui.fluent/segmentedcontroleventbuilder) that you can handle.

For a complete example on basic SegmentedControl events, refer to the [demo on using the events of the SegmentedControl](https://demos.telerik.com/{{ site.platform }}/segmentedcontrol/events).

The `Change` event fires when the user selects a different segment. The event handler receives the selected item's `value` and the full item data object.

```HtmlHelper
@using Kendo.Mvc.UI

@(Html.Kendo().SegmentedControl()
    .Name("segmentedControl")
    .Items(items =>
    {
        items.Add().Text("Option 1").Value("option1");
        items.Add().Text("Option 2").Value("option2");
        items.Add().Text("Option 3").Value("option3");
    })
    .SelectedValue("option1")
    .Events(ev => ev.Change("onChange"))
)

<script>
    function onChange(e) {
        console.log("Selected value: " + e.value);
    }
</script>
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-segmentedcontrol name="segmentedControl" selected-value="option1" on-change="onChange">
    <items>
        <item text="Option 1" value="option1"></item>
        <item text="Option 2" value="option2"></item>
        <item text="Option 3" value="option3"></item>
    </items>
</kendo-segmentedcontrol>

<script>
    function onChange(e) {
        console.log("Selected value: " + e.value);
    }
</script>
```
{% endif %}

## Next Steps

* [Using the SegmentedControl Events (Demo)](https://demos.telerik.com/{{ site.platform }}/segmentedcontrol/events)

## See Also

* [Using the API of the SegmentedControl for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/segmentedcontrol/api)
* [SegmentedControl Server-Side API for {{ site.framework }}](/api/segmentedcontrol)
* [SegmentedControl Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/segmentedcontrol)
