---
title: Overview
page_title: SegmentedControl Overview
description: "Discover the Telerik UI SegmentedControl component for {{ site.framework }} that provides a set of selectable buttons for toggling between mutually exclusive options."
components: ["segmentedcontrol"]
slug: htmlhelpers_segmentedcontrol_aspnetcore_overview
position: 0
---

# {{ site.framework }} SegmentedControl Overview

{% if site.core %}
The Telerik UI SegmentedControl TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI SegmentedControl component.
{% else %}
The Telerik UI SegmentedControl HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI SegmentedControl component.
{% endif %}

The SegmentedControl renders a group of buttons that allow the user to select a single option from a set of mutually exclusive choices. Each button represents one segment and can display a text label, an icon, or both.

* [Demo page for the SegmentedControl](https://demos.telerik.com/{{ site.platform }}/segmentedcontrol/index)

## Initializing the SegmentedControl

The following example demonstrates how to initialize the SegmentedControl.

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
)
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-segmentedcontrol name="segmentedControl" selected-value="option1">
    <items>
        <item text="Option 1" value="option1"></item>
        <item text="Option 2" value="option2"></item>
        <item text="Option 3" value="option3"></item>
    </items>
</kendo-segmentedcontrol>
```
{% endif %}

## Functionality and Features

* [Getting Started]({% slug htmlhelpers_segmentedcontrol_getting_started %})&mdash;Follow a step-by-step tutorial to set up the SegmentedControl for the first time.
* [Layout Modes]({% slug htmlhelpers_segmentedcontrol_layout_modes %})&mdash;Choose between `Compact` mode, where each segment sizes to its content, and `Stretch` mode, where all segments share the container width equally.
* [Icons]({% slug htmlhelpers_segmentedcontrol_icons %})&mdash;Enhance segment buttons with icons from the Kendo UI theme, custom CSS classes, or a combination of icons and text labels.
* [Events]({% slug htmlhelpers_segmentedcontrol_events %})&mdash;Handle the `Change` event to execute custom logic when the user selects a different segment.
* [Keyboard Navigation]({% slug keynav_aspnetcore_segmentedcontrol %})&mdash;The SegmentedControl supports keyboard navigation for moving focus between buttons and activating the selected segment.

>tip To learn more about the appearance, anatomy, and accessibility of the SegmentedControl, visit the [Progress Design System documentation](https://www.telerik.com/design-system/docs/components/segmentedcontrol/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

## Next Steps

* [Getting Started with the SegmentedControl for {{ site.framework }}]({% slug htmlhelpers_segmentedcontrol_getting_started %})
* [Basic Usage of the SegmentedControl HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/segmentedcontrol/index)
* [Server-Side API of the SegmentedControl HtmlHelper for {{ site.framework }}](/api/segmentedcontrol)
* [JavaScript API Reference of the SegmentedControl](https://docs.telerik.com/kendo-ui/api/javascript/ui/segmentedcontrol)

## See Also

* [Applying the SegmentedControl API (Demo)](https://demos.telerik.com/{{ site.platform }}/segmentedcontrol/api)
* [Basic Events in the SegmentedControl (Demo)](https://demos.telerik.com/{{ site.platform }}/segmentedcontrol/events)
* [Knowledge Base Section](/knowledge-base)
