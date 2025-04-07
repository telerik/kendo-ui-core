---
title: Keyboard Navigation
page_title: jQuery PropertyGrid Documentation - Keyboard Navigation
description: "Get started with the jQuery PropertyGrid by Kendo UI and learn about the accessibility support it provides through its keyboard navigation functionality."
slug: keynav_propertygrid_jquery
position: 2
---

# Keyboard Navigation

The PropertyGrid gets its keyboard navigation functionality through the `navigatable` option. When set to `true`, you can initially select a row or cell and then move within the PropertyGrid by using the `Arrow` keys.

The Kendo UI for jQuery PropertyGrid supports the following keyboard shortcuts applied to the PropertyGrid Data Table:

| SHORTCUT						| DESCRIPTION				                                                        |
|:---                           |:---                                                                                |
| `Arrow keys`                  | Navigate over the cells|
| `Space`                       | Selects the row holding the currently highlighted cell|
| `Enter` or `F2`               | Puts the item in the edit mode|
| `Esc`                         | Cancels the edit or, if an element inside a cell is focused, returns the focus to the table|
| `Ctrl`+`Home`                 | Focuses the first focusable element inside the body|
| `Ctrl`+`End`                  | Focuses the last focusable element inside the body|
| `Home`                        | Focuses the first focusable cell in the row|
| `End`                         | Focuses the last focusable cell in the row|
| `Shift`+`Tab`                 | Navigates to the previous item|
| `Shift`+`Tab`                 | Navigates to the previous item|
| `Shift`+`Tab`                 | Navigates to the previous item|

The Kendo UI for jQuery supports the following keyboard shortcuts applied to the PropertyGrid ToolBar:

| SHORTCUT						| DESCRIPTION				                                                        |
|:---                           |:---                                                                                |
| `F10`                         | Focuses the ToolBar|
| `Right Arrow`                 | Focuses the next focusable item|
| `Left Arrow`                  | Focuses the previous focusable item|
| `Enter`                       | Selects the focused button, or enters the inner template navigation if the template contains focusable items, or opens CommandOverflow menu when overflow anchor is focused|
| `Space`                       | Selects the focused button|
| `Home`                        | Focuses the first focusable item|
| `End`                         | Focuses the last focusable item|
| `Esc`                         | Moves the focus back to the PropertyGrid ToolBar item|

For a complete example, refer to the [demo on keyboard navigation of the PropertyGrid](https://demos.telerik.com/kendo-ui/propertygrid/keyboard-navigation).

## See Also

* [Keyboard Navigation by the PropertyGrid (Demo)](https://demos.telerik.com/kendo-ui/propertygrid/keyboard-navigation)
* [Keyboard Support in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}#keyboard-navigation)
* [Accessibility in the PropertyGrid]({% slug jquery_propertygrid_accessibility %})
