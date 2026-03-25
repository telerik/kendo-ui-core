---
title: Layout Modes
page_title: jQuery SegmentedControl Documentation - Layout Modes
description: "Get started with the jQuery SegmentedControl by Kendo UI and learn how to configure the compact and stretch layout modes to control segment widths."
components: ["segmentedcontrol"]
slug: layout_modes_kendoui_segmentedcontrol_widget
position: 3
---

# Layout Modes

The SegmentedControl supports two layout modes that determine how segment widths are calculated and how the component interacts with its container.

## Compact Mode

`compact` is the default layout mode. In this mode:

* Each segment's width is determined by its content (label, icon, and padding).
* Segments can have unequal widths.
* The total width of the component equals the combined widths of all segments.
* The component does not stretch to fill its container.

```html
<div id="segmentedControl"></div>

<script>
    $("#segmentedControl").kendoSegmentedControl({
        layoutMode: "compact",
        items: [
            { text: "Day", value: "day" },
            { text: "Week", value: "week" },
            { text: "Month", value: "month" }
        ],
        selectedValue: "day"
    });
</script>
```

## Stretch Mode

In `stretch` mode:

* The component expands to fill the full width of its container.
* All segments are equal width, regardless of their label length.
* Each segment's width is calculated as the container width divided by the number of segments.

```html
<div id="segmentedControl"></div>

<script>
    $("#segmentedControl").kendoSegmentedControl({
        layoutMode: "stretch",
        items: [
            { text: "Day", value: "day" },
            { text: "Week", value: "week" },
            { text: "Month", value: "month" }
        ],
        selectedValue: "day"
    });
</script>
```

## See Also

* [Basic Usage of the SegmentedControl (Demo)](https://demos.telerik.com/kendo-ui/segmentedcontrol/index)
* [JavaScript API Reference of the SegmentedControl](/api/javascript/ui/segmentedcontrol)
