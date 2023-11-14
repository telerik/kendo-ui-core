---
title: Keyboard Navigation
page_title: jQuery PivotGridV2 Documentation - Keyboard Navigation
description: "Get started with the jQuery PivotGridV2 by Kendo UI and learn about the accessibility support it provides through its keyboard navigation functionality."
slug: keynav_kendoui_pivotgridv2
position: 2
---

# Keyboard Navigation

The keyboard navigation of the PivotGridV2 is always available.

For a complete example, refer to the [demo on using the keyboard navigation of the PivotGridV2](https://demos.telerik.com/kendo-ui/pivotgridv2/keyboard-navigation).

The PivotGridV2 supports its keyboard navigation functionality through the `navigatable` option. When set to `true`, you can initially select a row or cell and then move within the PivotGridV2 by using the `Arrow` keys.

The following example demonstrates how to enable the key navigation in the PivotGridV2.

    $("#pivotgrid").kendoPivotGridV2({
        navigatable: true
    });

The following example demonstrates how to enable the key navigation in the PivotConfiguratorV2.

    $("#configurator").kendoPivotConfiguratorV2({
        navigatable: true
    });

## Shortcuts

The Kendo UI PivotGridV2 supports the following keyboard shortcuts:

| SHORTCUT			  | DESCRIPTION				                                                                                            |
|:---                 |:---                                                                                                                 |
| `Right Arrow`       | Moves the focus one cell to the right. If the focus is on the right-most cell in the row, the focus does not move.  |
| `Left Arrow`        | Moves the focus one cell to the left. If the focus is on the left-most cell in the row, the focus does not move.    |
| `Up Arrow`          | Moves the focus one cell up. If the focus is on the top-most cell in the column, the focus does not move.           |
| `Down Arrow`        | Moves the focus one cell down. If the focus is on the bottom-most cell in the column, the focus does not move.      |
| `Home`              | Moves the focus to the first focusable cell in the row.                                                             |
| `End`               | Moves the focus to the last focusable cell in the row.                                                              |
| `Ctrl/Cmd + Home`   | Moves the focus to the first cell in the first row.                                                                 |
| `Ctrl/Cmd + End`    | Moves the focus to the last cell in the last row.                                                                   |
| `Enter/Space`       | Toggles the expanded state of an expandable header when such is focused.                                            |
| `o`                 | The small Latin letter "o". Opens the configurator when available.                                                  |
| `escape`            | Closes the configurator when it contains the focus.                                                                 |

The Kendo UI PivotConfiguratorV2 supports the following keyboard shortcuts:

| SHORTCUT			  | DESCRIPTION				                                                                                                         |
|:---                 |:---                                                                                                                              |
| `Escape`            | Closes the Configurator and returns focus to the last focused PivotGrid table cell (or the first cell).                          |
| `Tab`               | Focuses the next focusable element or the first focusable element, if the focus is on the last focusable element.                |
| `Shift + Tab`       | Focuses the previous focusable element or the last focusable element, if the focus is on the first focusable element.            |
| `Backspace/Delete`  | Applicable when a Chip is focused. Removes the Chip, and the previous focusable element is focused.                              |
| `Ctrl/Cmd + Shift + Left/Right Arrow`  | Applicable when a Chip is focused. Switches the Chip with the next/previous one from the same section (if one is available). |
| `Ctrl/Cmd + Shift + Up/Down Arrow`     | Applicable when a Chip is focused. Moves a Chip from the Rows section to the Columns one or vice-versa.       |
| `Alt + Down Arrow`                     | Opens the Chip menu for the focused Chip. Focus goes to the first menu element is trapped in the menu popup.  |

The Kendo UI PivotConfiguratorV2 Chip Menu supports the following keyboard shortcuts:

| SHORTCUT			  | DESCRIPTION				                                                                                                    |
|:---                 |:---                                                                                                                         |
| `Escape`            | Closes the menu and returns the focus to the Chip that triggered it.                                                        |
| `Tab`               | Focuses the next focusable menu element or the first focusable element, if the focus is on the last focusable element.      |
| `Shift + Tab`       | Focuses the previous focusable element or the last focusable element, if the focus is on the first focusable element.       |
| `Enter`             | Triggers the default action associated with the focused menu item.                                                          |

## See Also

* [Keyboard Navigation by the PivotGridV2 (Demo)](https://demos.telerik.com/kendo-ui/pivotgridv2/keyboard-navigation)
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in the PivotGridV2]({% slug keyboard_shortcuts_accessibility_support %})
