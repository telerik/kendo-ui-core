---
title: Overview
page_title: jQuery FloatingToolBar Documentation - Accessibility
description: "Configure accessible names and keyboard movement for the jQuery FloatingToolBar by Kendo UI."
components: ["floatingtoolbar"]
slug: accessibility_kendoui_floatingtoolbar_widget
position: 1
---

# Accessibility

The FloatingToolBar hosts the accessible Kendo UI ToolBar component. Give the toolbar a purpose-specific accessible name with `ariaLabel`, especially when its tools are icon-only.

```js
$("#floatingtoolbar").kendoFloatingToolBar({
    ariaLabel: "Call controls",
    items: [
            { type: "button", text: "Chat", showText: "overflow", icon: "comment" },
            { type: "button", text: "Mute microphone", showText: "overflow", icon: "microphone-outline" }
    ]
});
```

When `draggable` is enabled, the drag handle is exposed as a keyboard-operable button and uses a polite live region to announce keyboard movement. Customize the handle label and movement announcements with `messages.dragHandle`, `messages.movedUp`, `messages.movedDown`, `messages.movedLeft`, and `messages.movedRight`.

```js
$("#floatingtoolbar").kendoFloatingToolBar({
    draggable: true,
    ariaLabel: "Document actions",
    messages: {
        dragHandle: "Reposition document actions",
        movedUp: "Toolbar moved up",
        movedDown: "Toolbar moved down",
        movedLeft: "Toolbar moved left",
        movedRight: "Toolbar moved right"
    },
    items: [{ type: "button", text: "Save", icon: "save" }]
});
```

See the [keyboard navigation guide]({% slug keyboard_navigation_kendoui_floatingtoolbar_widget %}) for the keys used to navigate commands and move the toolbar.

## See Also

* [Kendo UI for jQuery Accessibility Overview]({% slug overview_accessibility_support_kendoui %})