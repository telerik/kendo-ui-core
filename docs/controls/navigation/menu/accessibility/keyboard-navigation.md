---
title: Keyboard Navigation
page_title: jQuery Menu Documentation | Keyboard Navigation
description: "Get started with the jQuery Menu by Kendo UI and learn about the accessibility support it provides through its keyboard navigation functionality."
slug: keynav_menu_jquery
position: 2
---

# Keyboard Navigation

The keyboard navigation of the Menu is always available.

When the Menu is focused, its first root item is activated. For a complete example, refer to the [demo on keyboard navigation of the Menu](https://demos.telerik.com/kendo-ui/menu/keyboard-navigation).

Kendo UI Menu supports the following keyboard shortcuts:

| SHORTCUT						| DESCRIPTION				                                                        |
|:---                 |:---                                                                                |
| `Home`              | Focuses the first item.                                                            |
| `End`               | Focuses the last item.                                                             |
| `Left Arrow`        | <ul><li>Moves the active item on the root level of horizontal Menus to the left.</li> <li>Closes an item group.</li></ul> |
| `Right Arrow`       | <ul><li>Moves the active item on the root level of horizontal Menus to the right.</li> <li>Opens an item group of a vertical Menu.</li> <li>If the previous active item has been inside an item group, moves the active state to the next root item of a horizontal Menu.</li></ul>        |
| `Up Arrow`          | Moves the active item of vertical Menu item groups upwards.                       |
| `Down Arrow`        | <ul><li>Moves the active item of vertical Menu item groups downwards.</li> <li>Opens an item group of a horizontal Menu.</li></ul> |
| `Enter`             | Selects or navigates the focused item.                                             |
| `Space`             | Selects or navigates the focused item.                                             |
| `Esc`               | Closes an item group.                                                              |
| (`Shift`+) `Tab`    | Blurs the Menu and moves the focus to the next (previous) focusable page element.  |

## See Also

* [Keyboard Navigation by the Menu (Demo)](https://demos.telerik.com/kendo-ui/menu/keyboard-navigation)
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in the Menu]({% slug accessibility_menu_jquery %})
