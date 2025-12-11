---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Get started with the {{ site.product }} ToolBar and learn about the accessibility support it provides through its keyboard navigation functionality."
components: ["toolbar"]
slug: keynav_aspnetcore_toolbar
position: 2
---

# Keyboard Navigation

The keyboard navigation of the {{ site.product }} ToolBar is always available.

For a complete example, refer to the [demo on keyboard navigation of the ToolBar](https://demos.telerik.com/{{ site.platform }}/toolbar/keyboard-navigation).

## Managing the Focus

The ToolBar is a single tab stop component. All focus movements inside the ToolBar are managed according to the logic of the roving tabindex. When the user navigates through the tabs, the ToolBar focuses on either the first tool or the tool that was focused on last.

## Keyboard Shortcuts

For scenarios where inputs or ComboBoxes appear in the ToolBar, you must wrap them in focusable wrappers. To activate the inner component navigation, the user must press `Enter`. To return the focus to the wrapper and activate again the ToolBar navigation, the user must press `Esc`.

The ToolBar supports the following keyboard shortcuts:

| SHORTCUT | DESCRIPTION |
|:---   |:--- |
| `Tab` |  If the `NavigateOnTab()` option is enabled, focuses the next focusable item. |
| `Shift` + `Tab` |  If the `NavigateOnTab()` option is enabled, focuses the previous focusable item. |
| `Right Arrow` | (Default) If the `NavigateOnTab()` option is disabled, focuses the next focusable item. Focuses the first element if the end of the ToolBar is reached. |
| `Left Arrow` | (Default) If the `NavigateOnTab()` option is disabled, focuses the previous focusable item. Focuses the last element if the beginning of the ToolBar is reached. |
| `Enter` or `Space` | Clicks the currently focused button, or enters the inner template navigation if the template contains focusable items. |
| `Home` | Focuses the first focusable item. |
| `End` | Focuses the last focusable item. |
| `Esc` | If the inner template navigation is activated, moves the focus back to the ToolBar item. |

The following keyboard shortcuts are applicable to the SplitButton, DropDownButton, or CommandOverflow:

| SHORTCUT | DESCRIPTION |
|:---   |:--- |
| `Alt` + `Down Arrow` |  Opens the currently active SplitButton, DropDownButton, or CommandOverflow. |
| `Down Arrow` |  Focuses the next menu item of the SplitButton, DropDownButton, or CommandOverflow. |
| `Up Arrow` |  Focuses the previous menu item of the SplitButton, DropDownButton, or CommandOverflow. |
| `Alt` + `Up Arrow` or `Esc` |  Closes the currently active SplitButton, DropDownButton, or CommandOverflow. |
| `Enter` or `Space` |  Clicks the currently focused button. |

## See Also

* [Keyboard Navigation by the ToolBar for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/toolbar/keyboard-navigation)
* [Accessibility in {{ site.product }}]({% slug overview_accessibility %})
