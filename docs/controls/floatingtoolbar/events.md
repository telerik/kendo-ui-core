---
title: Events
page_title: jQuery FloatingToolBar Documentation - Events
description: "Handle visibility, movement, and keyboard events from the jQuery FloatingToolBar by Kendo UI."
components: ["floatingtoolbar"]
slug: events_kendoui_floatingtoolbar_widget
position: 6
---

# Events

The FloatingToolBar exposes events for visibility changes, pointer and keyboard movement, and key handling. Configure them during initialization or subscribe to them on the widget instance.

```html
<div id="floatingtoolbar"></div>

<script>
    $("#floatingtoolbar").kendoFloatingToolBar({
        visible: true,
        draggable: true,
        items: [{ type: "button", text: "Save", icon: "save" }],
        show: function (e) {
            console.log("Toolbar shown", e.sender);
        },
        hide: function (e) {
            console.log("Toolbar hidden", e.sender);
        },
        dragStart: function (e) {
            console.log("Move started", e.top, e.left);
        },
        move: function (e) {
            console.log("Position", e.top, e.left);
        },
        dragEnd: function (e) {
            console.log("Move ended", e.top, e.left);
        }
    });
</script>
```

The `show` and `hide` events fire before their respective visibility transitions and can be canceled with `e.preventDefault()`. `dragStart` can also be canceled. `move` fires when the toolbar moves through dragging, keyboard Move mode, or `setPosition`; `dragEnd` fires when pointer dragging or keyboard Move mode ends. `kendoKeydown` lets you observe or override the widget's keyboard handling by using `e.preventKendoKeydown`.

## Next Steps

* [Keyboard Navigation of the FloatingToolBar]({% slug keyboard_navigation_kendoui_floatingtoolbar_widget %})
* [Accessibility of the FloatingToolBar]({% slug accessibility_kendoui_floatingtoolbar_widget %})

## See Also

* [JavaScript API Reference](/api/ui/floatingtoolbar#events)