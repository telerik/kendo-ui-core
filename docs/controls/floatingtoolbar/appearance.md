---
title: Appearance
page_title: jQuery FloatingToolBar Documentation - Appearance
description: "Customize the size and fill mode of the jQuery FloatingToolBar by Kendo UI and label it for assistive technology."
components: ["floatingtoolbar"]
slug: appearance_kendoui_floatingtoolbar_widget
position: 4
---

# Appearance

The FloatingToolBar forwards its `size` and `fillMode` options to the hosted ToolBar and its items.

## Size

Set `size` to `small`, `medium`, or `large`. When omitted, the active theme resolves the size to `medium`.

## Fill Mode

Set `fillMode` to `solid`, `outline`, or `flat`. When omitted, the active theme resolves the fill mode to `solid`.

```html
<div id="floatingtoolbar"></div>

<script>
    $("#floatingtoolbar").kendoFloatingToolBar({
        visible: true,
        size: "large",
        fillMode: "outline",
        items: [
            { type: "button", text: "Bold", icon: "bold", togglable: true },
            { type: "button", text: "Italic", icon: "italic", togglable: true }
        ]
    });
</script>
```

## Accessible Name

Use `ariaLabel` to set the accessible name on the hosted ToolBar. Provide a name that describes the commands, such as `Text formatting` or `Call controls`.

```js
$("#floatingtoolbar").kendoFloatingToolBar({
    ariaLabel: "Shipment actions",
    items: [{ type: "button", text: "Track", icon: "map-marker-target" }]
});
```

## Next Steps

* [Overflow in the FloatingToolBar]({% slug overflow_kendoui_floatingtoolbar_widget %})
* [Events of the FloatingToolBar]({% slug events_kendoui_floatingtoolbar_widget %})
* [Keyboard Navigation of the FloatingToolBar]({% slug keyboard_navigation_kendoui_floatingtoolbar_widget %})
* [Accessibility of the FloatingToolBar]({% slug accessibility_kendoui_floatingtoolbar_widget %})

## See Also

* [Accessibility]({% slug accessibility_kendoui_floatingtoolbar_widget %})