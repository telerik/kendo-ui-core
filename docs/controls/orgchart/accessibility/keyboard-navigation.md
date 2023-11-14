---
title: Keyboard Navigation
page_title: Kendo UI for jQuery OrgChart Documentation - Keyboard Navigation
description: "Get started with the Kendo UI for jQuery OrgChart and learn about the accessibility support it provides through its keyboard navigation functionality."
slug: keynav_kendoui_orgchart_widget
position: 2
---

# Keyboard Navigation

The keyboard navigation of the OrgChart is always available.

The Kendo UI OrgChart supports the following keyboard shortcuts:

| SHORTCUT						| DESCRIPTION				                                                        |
|:---              |:---                                                                                |
| `Left Arrow`     | Moves the focus to the previous focusable node without without opening or closing a node.|
| `Right Arrow`    | Moves the focus to the next focusable node without opening or closing a node.|
| `Up Arrow`       | When the focus is on an open node, closes the node. When the focus is on an end node or a closed node, moves the focus to its parent node.|
| `Down Arrow`     | When the focus is on a closed node, opens the node. When the focus is on an open node, moves the focus to the first child node.|
| `Enter`          | In editable OrgCharts opens the ContextMenu for the focused node. Upon closing the menu, the focus will move back to the item. In grouped OrgCharts moves the focus to the first node in the group.|
| `Esc   `         | In editable OrgCharts closes the ContextMenu. In grouped OrgCharts moves the focus from the focused node in the group back to the group.|
| `Home`           | Moves the focus to the first focusable node without opening or closing a node.|
| `End`            | Moves the focus to the last focusable node without opening or closing a node.|

For a complete example, refer to the [demo on keyboard navigation of the OrgChart](https://demos.telerik.com/kendo-ui/orgchart/keyboard-navigation).

## See Also

* [Keyboard Navigation of the OrgChart (Demo)](https://demos.telerik.com/kendo-ui/orgchart/keyboard-navigation)
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in the OrgChart]({% slug accessibility_kendoui_orgchart_widget %})
