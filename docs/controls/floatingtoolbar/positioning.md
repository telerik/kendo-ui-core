---
title: Positioning
page_title: jQuery FloatingToolBar Documentation - Positioning
description: "Position the jQuery FloatingToolBar by Kendo UI by aligning it in a container or anchoring it to a target element."
components: ["floatingtoolbar"]
slug: positioning_kendoui_floatingtoolbar_widget
position: 3
---

# Positioning

The FloatingToolBar can be positioned relative to its closest positioned ancestor or anchored to a target element. Set `anchor` to use anchored mode; leave it unset to use free-position mode.

## Align Within a Container

In free-position mode, `containerAlign` accepts horizontal values `left`, `center`, and `right`, and vertical values `top`, `center`, and `bottom`. The toolbar uses the closest ancestor whose CSS `position` is `relative`, `absolute`, `fixed`, or `sticky`. If no such ancestor exists, it uses the document body.

```html
<div id="toolbar-container" style="position: relative; height: 240px;">
    <div id="floatingtoolbar"></div>
</div>

<script>
    $("#floatingtoolbar").kendoFloatingToolBar({
        visible: true,
        containerAlign: { horizontal: "right", vertical: "bottom" },
        margin: { horizontal: -12, vertical: -16 },
        items: [{ type: "button", text: "Edit", icon: "pencil" }]
    });
</script>
```

The `margin` values are pixel offsets. The widget applies them to the popup wrapper as CSS top and left margins.

## Anchor to an Element

Set `anchor` to a selector, DOM element, or jQuery object. The `position` option accepts `top`, `bottom`, `left`, or `right`. Popup collision handling can flip or fit the toolbar when the requested side does not have enough room.

```html
<p id="shipment">Shipment SH-20418 is ready for review.</p>
<div id="floatingtoolbar"></div>

<script>
    $("#floatingtoolbar").kendoFloatingToolBar({
        visible: true,
        anchor: "#shipment",
        position: "bottom",
        margin: { vertical: 8 },
        items: [{ type: "button", text: "Review", icon: "eye" }]
    });
</script>
```

When `anchor` is set, `containerAlign` is ignored. Change the target after initialization with `setAnchor()`. Call `setAnchor()` with no argument to return to container positioning. Use `setPosition({ top, left })` to set explicit free-position coordinates.

## Next Steps

* [Appearance of the FloatingToolBar]({% slug appearance_kendoui_floatingtoolbar_widget %})
* [Overflow in the FloatingToolBar]({% slug overflow_kendoui_floatingtoolbar_widget %})
* [Events of the FloatingToolBar]({% slug events_kendoui_floatingtoolbar_widget %})
* [Keyboard Navigation of the FloatingToolBar]({% slug keyboard_navigation_kendoui_floatingtoolbar_widget %})
* [Accessibility of the FloatingToolBar]({% slug accessibility_kendoui_floatingtoolbar_widget %})

## See Also

* [JavaScript API Reference](/api/ui/floatingtoolbar)