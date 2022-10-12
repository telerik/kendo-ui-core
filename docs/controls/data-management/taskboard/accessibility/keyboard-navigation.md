---
title: Keyboard Navigation
page_title: Kendo UI for jQuery TaskBoard Documentation - Keyboard Navigation
description: "Get started with the Kendo UI for jQuery TaskBoard and learn about the accessibility support it provides through its keyboard navigation functionality."
slug: keynav_kendoui_taskboard_widget
position: 2
---

# Keyboard Navigation

The keyboard navigation of the TaskBoard is always available.

The Kendo UI TaskBoard supports the following keyboard shortcuts:

| SHORTCUT						| DESCRIPTION				                                                        |
|:---                 |:---                                                                                |
| `Tab`             | navigates to the TaskBoard|
| `Left Arrow`     | focuses the previous column or a card in the previous column|
| `Right Arrow`    | focuses the next column or a card in the next column|
| `Up Arrow`       | focuses the previous card|
| `Down Arrow`     | focuses the next card|
| `Enter`          | selects the focused card|
| `Delete`         | deletes the focused card|
| `Ctrl`+`e`       | puts the focused card or column in edit mode|
| `Ctrl`+`a`       | adds a new column or card|

For a complete example, refer to the [demo on keyboard navigation of the TaskBoard](https://demos.telerik.com/kendo-ui/taskboard/keyboard-navigation).

## Register Shortcut

Additional shortcuts can be registered in the TaskBoard, with the `registerShortcut` client-side API method.

The following example demonstrates how to register a shortcut for focusing the last card in the TaskBoard.

    var taskBoard = $("#taskBoard").data("kendoTaskBoard");

    taskBoard.registerShortcut("*", {
        keyCode: "q",
        ctrlKey: true
    }, {
        handler: function () {
            taskBoard.items().last().focus();
        }
    });

## See Also

* [Keyboard Navigation of the TaskBoard (Demo)](https://demos.telerik.com/kendo-ui/taskboard/keyboard-navigation)
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in the TaskBoard]({% slug accessibility_kendoui_taskboard_widget %})
