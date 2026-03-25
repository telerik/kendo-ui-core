---
title: Layout Modes
page_title: SegmentedControl Layout Modes
description: "Learn how to configure the layout mode of the Telerik UI SegmentedControl component for {{ site.framework }} to control segment widths and container behavior."
components: ["segmentedcontrol"]
slug: htmlhelpers_segmentedcontrol_layout_modes
position: 3
---

# Layout Modes

The SegmentedControl supports two layout modes that control how segment widths are calculated and how the component fits within its container.

## Compact Mode

`Compact` is the default layout mode. In this mode:

* Each segment's width is determined by its content (label, icon, and padding).
* Segments can have unequal widths.
* The component's total width is the combined width of all its segments.
* The component does not stretch to fill its container.

```HtmlHelper
@using Kendo.Mvc.UI

@(Html.Kendo().SegmentedControl()
    .Name("segmentedControl")
    .LayoutMode(SegmentedButtonLayoutMode.Compact)
    .Items(items =>
    {
        items.Add().Text("Day").Value("day");
        items.Add().Text("Week").Value("week");
        items.Add().Text("Month").Value("month");
    })
    .SelectedValue("day")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-segmentedcontrol name="segmentedControl"
                        layout-mode="SegmentedButtonLayoutMode.Compact"
                        selected-value="day">
    <items>
        <item text="Day" value="day"></item>
        <item text="Week" value="week"></item>
        <item text="Month" value="month"></item>
    </items>
</kendo-segmentedcontrol>
```
{% endif %}

## Stretch Mode

In `Stretch` mode:

* The component expands to fill the full width of its container.
* All segments are equal width, regardless of label length.
* Each segment's width is calculated as the container width divided by the number of segments.

```HtmlHelper
@using Kendo.Mvc.UI

@(Html.Kendo().SegmentedControl()
    .Name("segmentedControl")
    .LayoutMode(SegmentedButtonLayoutMode.Stretch)
    .Items(items =>
    {
        items.Add().Text("Day").Value("day");
        items.Add().Text("Week").Value("week");
        items.Add().Text("Month").Value("month");
    })
    .SelectedValue("day")
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-segmentedcontrol name="segmentedControl"
                        layout-mode="SegmentedButtonLayoutMode.Stretch"
                        selected-value="day">
    <items>
        <item text="Day" value="day"></item>
        <item text="Week" value="week"></item>
        <item text="Month" value="month"></item>
    </items>
</kendo-segmentedcontrol>
```
{% endif %}

## See Also

* [SegmentedControl Overview (Demo)](https://demos.telerik.com/{{ site.platform }}/segmentedcontrol/index)
* [SegmentedControl Server-Side API for {{ site.framework }}](/api/segmentedcontrol)
* [SegmentedControl Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/segmentedcontrol)
