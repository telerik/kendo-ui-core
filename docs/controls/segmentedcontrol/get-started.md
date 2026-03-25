---
title: Getting Started
page_title: jQuery SegmentedControl Documentation - Getting Started with the SegmentedControl
description: "Get started with the jQuery SegmentedControl by Kendo UI and learn how to create, initialize, and configure the widget."
components: ["segmentedcontrol"]
slug: getting_started_kendoui_segmentedcontrol_widget
position: 2
---

# Getting Started with the SegmentedControl

This guide demonstrates how to get up and running with the Kendo UI for jQuery SegmentedControl.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <div id="segmentedControl"></div>

    <script>
        $("#segmentedControl").kendoSegmentedControl({
            items: [
                { text: "Day", icon: "calendar", value: "day" },
                { text: "Week", icon: "clock", value: "week" },
                { text: "Month", icon: "calendar-date", value: "month" }
            ],
            selectedValue: "week",
            change: function(e) {
                console.log("Selected: " + e.value);
            }
        });
    </script>
```

## 1. Create a Div Element

First, create an empty `<div>` element on the page from which the SegmentedControl will be initialized.

```html
<div id="segmentedControl"></div>
```

## 2. Initialize the SegmentedControl

Initialize the SegmentedControl from the `<div>` element. All configuration options are provided in the script statement.

```html
<div id="segmentedControl"></div>

<script>
    // Target the div element by using jQuery and then call the kendoSegmentedControl() method.
    $("#segmentedControl").kendoSegmentedControl();
</script>
```

## 3. Add Items

Use the [`items`](/api/javascript/ui/segmentedcontrol/configuration/items) option to define the selectable segments. Each item requires a `text` and a `value`.

```html
<div id="segmentedControl"></div>

<script>
    $("#segmentedControl").kendoSegmentedControl({
        items: [
            { text: "Day", value: "day" },
            { text: "Week", value: "week" },
            { text: "Month", value: "month" }
        ]
    });
</script>
```

## 4. Add Icons

Use the [`icon`](/api/javascript/ui/segmentedcontrol/configuration/items.icon) option on each item to display a Kendo UI theme icon alongside the label.

```html
<div id="segmentedControl"></div>

<script>
    $("#segmentedControl").kendoSegmentedControl({
        items: [
            { text: "Day", icon: "calendar", value: "day" },
            { text: "Week", icon: "clock", value: "week" },
            { text: "Month", icon: "calendar-date", value: "month" }
        ]
    });
</script>
```

## 5. Set a Default Selection

Use [`selectedValue`](/api/javascript/ui/segmentedcontrol/configuration/selectedvalue) to pre-select one of the items when the component first renders.

```html
<div id="segmentedControl"></div>

<script>
    $("#segmentedControl").kendoSegmentedControl({
        items: [
            { text: "Day", icon: "calendar", value: "day" },
            { text: "Week", icon: "clock", value: "week" },
            { text: "Month", icon: "calendar-date", value: "month" }
        ],
        selectedValue: "week"
    });
</script>
```

## 6. Handle the Change Event

Subscribe to the [`change`](/api/javascript/ui/segmentedcontrol/events/change) event to execute custom logic when the user selects a different segment.

```html
<div id="segmentedControl"></div>

<script>
    $("#segmentedControl").kendoSegmentedControl({
        items: [
            { text: "Day", icon: "calendar", value: "day" },
            { text: "Week", icon: "clock", value: "week" },
            { text: "Month", icon: "calendar-date", value: "month" }
        ],
        selectedValue: "week",
        change: function(e) {
            console.log("Selected: " + e.value);
        }
    });
</script>
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the SegmentedControl](https://demos.telerik.com/kendo-ui/segmentedcontrol/index)

## See Also

* [JavaScript API Reference of the SegmentedControl](/api/javascript/ui/segmentedcontrol)
* [Knowledge Base Section](/knowledge-base)
