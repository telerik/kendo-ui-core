---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Get started with the Telerik UI for {{ site.framework }} TaskBoard and learn about the accessibility support it provides through its keyboard navigation functionality."
components: ["taskboard"]
slug: htmlhelpers_taskboard_aspnetcore_keynav
position: 2
---

# Keyboard Navigation

The keyboard navigation of the TaskBoard is always available.

The {{ site.framework }} TaskBoard supports the following keyboard shortcuts:

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

For a complete example, refer to the [TaskBoard Keyboard Navigation (Demo)](https://demos.telerik.com/{{ site.platform }}/taskboard/keyboard-navigation).

## Register Shortcut

Additional shortcuts can be registered in the TaskBoard, with the `registerShortcut` client-side API method.

The following example demonstrates how to register a shortcut for focusing the last card in the TaskBoard.

    $(document).ready(function() {
        var taskBoard = $("#taskBoard").data("kendoTaskBoard");

        taskBoard.registerShortcut("*", {
            keyCode: "q",
            ctrlKey: true
        }, {
            handler: function () {
                taskBoard.items().last().focus();
            }
        });
    });
    

## See Also

* [Keyboard Navigation of the TaskBoard (Demo)](https://demos.telerik.com/{{ site.platform }}/taskboard/keyboard-navigation)
* [Accessibility Compliance in {{ site.product }}]({% slug compliance_accessibility %})
