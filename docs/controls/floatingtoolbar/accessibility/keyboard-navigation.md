---
title: Keyboard Navigation
page_title: jQuery FloatingToolBar Documentation - Keyboard Navigation
description: "Navigate FloatingToolBar commands and reposition a draggable toolbar with the keyboard."
components: ["floatingtoolbar"]
slug: keyboard_navigation_kendoui_floatingtoolbar_widget
position: 2
---

# Keyboard Navigation

The hosted ToolBar supports keyboard navigation between its commands. When `draggable` is `true`, the FloatingToolBar also renders a drag handle that can be used to reposition the toolbar without a pointer.

## Navigate the Toolbar

Use `Tab` to move focus into and out of the toolbar. Within the toolbar, use the left and right arrow keys to move between commands. `Home` and `End` move focus to the first and last command. Use `Enter` or `Space` to activate a focused command.

## Move the Toolbar

1. Tab to the drag handle.
2. Press `M` to enter keyboard Move mode.
3. Press an arrow key to move the toolbar by 10 pixels in that direction. The live region announces each movement.
4. Press `Enter` or `M` to commit the position. Press `Escape` to restore the position from before Move mode.

`Alt+W` is not a built-in FloatingToolBar shortcut. To add such a shortcut, handle the `keydown` event of the document and call the widget's `focus()` method.

## Next Steps

* [Accessibility of the FloatingToolBar]({% slug accessibility_kendoui_floatingtoolbar_widget %})

## See Also

* [Accessibility]({% slug accessibility_kendoui_floatingtoolbar_widget %})
* [JavaScript API Reference](/api/ui/floatingtoolbar)