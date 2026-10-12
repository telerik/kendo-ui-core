---
title: Overflow
page_title: jQuery FloatingToolBar Documentation - Overflow
description: "Configure menu, scrolling, and per-item overflow for the jQuery FloatingToolBar by Kendo UI."
components: ["floatingtoolbar"]
slug: overflow_kendoui_floatingtoolbar_widget
position: 5
---

# Overflow

The FloatingToolBar forwards its `overflow` configuration to the hosted ToolBar. By default, overflowing commands move to a menu. Set `overflow.mode` to `menu`, `scroll`, `section`, or `none` to choose another behavior.

* `menu` moves overflowing commands into a menu button.
* `scroll` keeps commands in the toolbar and provides horizontal scrolling. Configure `scrollButtons`, `scrollButtonsPosition`, and `scrollDistance` for the scroll controls.
* `section` groups commands into expandable sections.
* `none` disables overflow handling. Commands may be clipped when they do not fit.

```html
<div id="floatingtoolbar"></div>

<script>
    $("#floatingtoolbar").kendoFloatingToolBar({
        visible: true,
        overflow: {
            mode: "scroll",
            scrollButtons: "auto",
            scrollButtonsPosition: "split",
            scrollDistance: 120
        },
        items: [
            { type: "button", text: "Track", icon: "map-marker-target" },
            { type: "button", text: "Comment", icon: "comment" },
            { type: "button", text: "Print", icon: "print" },
            { type: "button", text: "Share", icon: "share" }
        ]
    });
</script>
```

## Control Overflow Per Item

Set an item's `overflow` to `auto` (the default), `always`, or `never`. `always` places the item in the overflow menu even when there is room on the toolbar. `never` keeps the item on the toolbar. This is useful for keeping primary actions visible while placing secondary actions behind the menu.

```js
items: [
    { type: "button", text: "Chat", icon: "comment", overflow: "always" },
    { type: "button", text: "Leave", icon: "cancel", overflow: "never" }
]
```

Set `showText: "overflow"` to keep an item's icon on the toolbar and show its text label in the overflow menu.

## Next Steps

* [Events of the FloatingToolBar]({% slug events_kendoui_floatingtoolbar_widget %})
* [Keyboard Navigation of the FloatingToolBar]({% slug keyboard_navigation_kendoui_floatingtoolbar_widget %})
* [Accessibility of the FloatingToolBar]({% slug accessibility_kendoui_floatingtoolbar_widget %})

## See Also

* [ToolBar Items API](/api/ui/toolbar/configuration/items)
* [JavaScript API Reference](/api/ui/floatingtoolbar)