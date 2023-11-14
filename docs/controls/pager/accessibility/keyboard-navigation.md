---
title: Keyboard Navigation
page_title: jQuery Pager Documentation - Keyboard Navigation
description: "Get started with the jQuery Pager by Kendo UI and learn about the accessibility support it provides through its keyboard navigation functionality."
slug: keynav_pager_jquery
position: 2
---

# Keyboard Navigation

To enable the Pager's keyboard navigation, set the [navigatable](/api/javascript/ui/pager/configuration/navigatable) property to `true`.

For a complete example, refer to the [demo on the Pager's keyboard navigation feature](https://demos.telerik.com/kendo-ui/pager/keyboard-navigation).

Kendo UI Pager supports the following keyboard shortcuts when the Pager wrapper is focused:

| SHORTCUT						| DESCRIPTION				                                            |
|:---                           |:---                                                                   |
| `Left Arrow`                  | Loads the previous page, if it exists.                                |
| `Right Arrow`                 | Loads the next page, if it exists.                                 |
| `Page Up`                     | Loads the previous page, if it exists.                                |
| `Page Down`                   | Loads the next page, if it exists.                                  |
| `Home`                        | Loads the first page, if the current page is not already the first one.                                             |
| `End`                         | Loads the last page, if the current page is not already the last one.                                             |
| `Enter`                       | Changes the focus to the first focusable Pager element.                                                     |

Kendo UI Pager supports the following keyboard shortcuts when a Pager element is focused:

| SHORTCUT						| DESCRIPTION				                                            |
|:---                           |:---                                                                   |
| `Tab`                         | Changes the focus to the next Pager element.                               |
| `Shift`+`Tab`                 | Changes the focus to the previous Pager element.                                 |
| `Enter`                       | Triggers the default action associated with this element.                                |
| `Escape`                      | Changes the focus to the Pager wrapper.                                  |

## See Also

* [Keyboard Navigation by the Pager (Demo)](https://demos.telerik.com/kendo-ui/pager/keyboard-navigation)
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in the Pager]({% slug accessibility_kendoui_pager_widget %})
