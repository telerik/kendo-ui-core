---
title: Keyboard Navigation
page_title: jQuery Sortable Documentation - Keyboard Navigation
description: "Get started with the jQuery Sortable by Kendo UI and learn about the accessibility support it provides through its keyboard navigation functionality."
slug: keynav_kendoui_sortable
position: 2
---

# Keyboard Navigation

The keyboard navigation of the Sortable is always available.

For a complete example, refer to the [demo on keyboard navigation of the Sortable](https://demos.telerik.com/kendo-ui/sortable/keyboard-navigation).

> In the right-to-left (RTL) mode, the behavior of the left and right `Arrow` keys is reversed.

| SHORTCUT						          | DESCRIPTION				                                 |
|:---                           |:---                                                |
| `Enter`                       | Focuses the first focusable element within the item's content (if any). Focus is trapped and wrapped within the item content. |
| `Escape`                      | When focus is on an internal element within a Sortable item, returns the focus to the item wrapper. |
| `Right Arrow / Down Arrow`    | Sets the focus on the next available item. |
| `Left Arrow / Up Arrow`       | Sets the focus on the previously available item. |
| `Ctrl + Right Arrow / Down Arrow ` | Moves the focused item after the next item. |
| `Ctrl + Left Arrow / Up Arrow` | Moves the focused item before the previous item. |

## See Also

* [Keyboard Navigation by the Sortable (Demo)](https://demos.telerik.com/kendo-ui/sortable/keyboard-navigation)
* [Keyboard Support in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}#keyboard-navigation)
* [Accessibility in the Slider]({% slug jquery_slider_accessibility %})
