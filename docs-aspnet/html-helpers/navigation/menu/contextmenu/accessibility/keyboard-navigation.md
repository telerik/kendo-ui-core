---
title:  Keyboard Navigation
page_title: Keyboard Navigation
description: "Learn how to use the keyboard navigation functionality of the Telerik UI ContextMenu component for {{ site.framework }}."
components: ["menu"]
previous_url: /html-helpers/navigation/menu/contextmenu/keyboard-navigation
slug: htmlhelpers_contextmenu_keyboardnavigation_aspnetcore
position: 2
---

# Keyboard Navigation

The keyboard navigation of the ContextMenu is always available.

For a runnable example, refer to the [demo on using the keyboard navigation of the ContextMenu](https://demos.telerik.com/{{ site.platform }}/menu/context-menu-keyboard-navigation).

When the ContextMenu is focused, the first root item is activated.

The ContextMenu supports the following keyboard shortcuts:

| SHORTCUT | DESCRIPTION |
| -------- | -------- |
| `Home` | Focuses the first item. |
| `End`  | Focuses the last item.  |
| `Left Arrow` | When a root item is focused, opens the item group and focuses the last child.<br/> When a child item is focused, closes the item group and focuses the parent item. |
| `Right Arrow` | If the item has children, opens the item and focuses the first child.<br/>For child items without children, focuses and opens the next root item. |
| `Up Arrow`         | Focuses the previous item. |
| `Down Arrow`       | Focuses the next item. |
| `Enter` or `Space` | Selects the focused item.<br/>If the item has children, opens the item group and focuses the first child.<br/>If the item does not have children and has a URL, navigates to the specified URL. |
| `Shift` + `Tab` | Tabs away from the ContextMenu on the next focusable page element. |
| `Shift` + `F10` | When the target element is focused, the command opens the ContextMenu. |
| `Esc` | Closes the innermost open group. If no item group is opened, closes the ContextMenu. |

## See Also

* [Keyboard Navigation by the ContextMenu for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/menu/context-menu-keyboard-navigation)
* [Accessibility in {{ site.product }}]({% slug overview_accessibility %})
