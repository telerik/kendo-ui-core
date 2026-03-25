---
title: Icons
page_title: jQuery SegmentedControl Documentation - Icons
description: "Get started with the jQuery SegmentedControl by Kendo UI and learn how to configure icons and text labels for the individual segment buttons."
components: ["segmentedcontrol"]
slug: icons_kendoui_segmentedcontrol_widget
position: 4
---

# Icons

Each segment button in the SegmentedControl can display a text label, an icon, or both. Use the `icon`, `iconClass`, and `text` item options to control each button's appearance individually.

## Text Labels

Set the `text` property on each item to show a visible label inside the button.

```html
<div id="segmentedControl"></div>

<script>
    $("#segmentedControl").kendoSegmentedControl({
        items: [
            { text: "Option 1", value: "option1" },
            { text: "Option 2", value: "option2" },
            { text: "Option 3", value: "option3" }
        ]
    });
</script>
```

## Icons from the Kendo UI Theme

Use the [`icon`](/api/javascript/ui/segmentedcontrol/configuration/items.icon) property to render a named icon from the built-in Kendo UI icon set inside a segment button. When no `text` is provided, the item's `value` is used as the button's accessible label.

```html
<div id="segmentedControl"></div>

<script>
    $("#segmentedControl").kendoSegmentedControl({
        items: [
            { icon: "bold", value: "bold" },
            { icon: "italic", value: "italic" },
            { icon: "underline", value: "underline" }
        ]
    });
</script>
```

## Icons with Text

Combine `icon` and `text` to display both inside the same segment button.

```html
<div id="segmentedControl"></div>

<script>
    $("#segmentedControl").kendoSegmentedControl({
        items: [
            { text: "Settings", icon: "gear", value: "settings" },
            { text: "Home", icon: "home", value: "home" },
            { text: "Profile", icon: "user", value: "profile" }
        ],
        selectedValue: "home"
    });
</script>
```

## Custom Icon Classes

Use [`iconClass`](/api/javascript/ui/segmentedcontrol/configuration/items.iconclass) to append one or more CSS class names to the icon element. This allows you to apply custom styles or integrate icons from external icon libraries.

```html
<div id="segmentedControl"></div>

<script>
    $("#segmentedControl").kendoSegmentedControl({
        items: [
            { text: "Settings", icon: "gear", iconClass: "custom-icon", value: "settings" },
            { text: "Home", icon: "home", value: "home" }
        ]
    });
</script>
```

## See Also

* [Basic Usage of the SegmentedControl (Demo)](https://demos.telerik.com/kendo-ui/segmentedcontrol/index)
* [JavaScript API Reference of the SegmentedControl](/api/javascript/ui/segmentedcontrol)
