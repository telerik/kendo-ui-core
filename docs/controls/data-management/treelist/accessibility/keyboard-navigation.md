---
title: Keyboard Navigation
page_title: jQuery TreeList Documentation - Keyboard Navigation
description: "Get started with the jQuery TreeList by Kendo UI and learn about the accessibility support it provides through its keyboard navigation functionality."
slug: keynav_kendoui_treelist_widget
position: 2
---

# Keyboard Navigation

The TreeList supports its keyboard navigation functionality through the `navigatable` option. When set to `true`, you can initially select a row or cell and then move within the TreeList by using the `Arrow` keys. The navigation occurs at a cell level regardless of what the `selectable` mode is. To select the current row or cell, press `Space`.

For a complete example, refer to the [demo on using the keyboard navigation of the TreeList](https://demos.telerik.com/kendo-ui/treelist/keyboard-navigation).  

The following example demonstrates how to enable the keyboard navigation in the TreeList.

    $("#treelist").kendoTreeList({
         navigatable: true
         // List any other configuration options here.
    });

The keyboard navigation of the TreeList works by listening to the `keydown` events on the wrapper element of the widget. Its behavior is based on the assumption that whatever the user does is in accordance with the currently focused TreeList cell and not with the focused element of the browser. If the data cells of the TreeList contain hyperlinks that have to be activated through the keyboard:

1. Navigate to the respective TreeList cell by using the `Arrow` keys.
1. Press `Enter` to focus the hyperlink inside the cell.
1. Press `Enter` again.

To return the focus on the table cell, press `Esc`. In order for the hyperlinks to be inaccessible through tabbing, set the `tabindex="-1"` attribute to the custom hyperlinks.

You can also avoid the procedure and bypass the keyboard navigation of the TreeList, access the custom hyperlinks with tabbing, and activate them with `Enter`. To achieve this, prevent the `keydown` event bubbling of the custom hyperlinks. As a result, the `Enter` key-presses will be unnoticed by the TreeList.

## Pager Navigation

The Pager wrapper can be focused via the `Tab` key. But if the TreeList contains multiple focusable button elements (such as **Edit** and **Delete** buttons), pressing `Tab` will bring the focus to them. In such cases, it is recommended that the developer chooses a custom key/key combination which focuses the Pager wrapper.

    $(document.body).keydown(function (e) {
        // ALT KEY + S will focus the pager wrapper.
        if (e.altKey && e.keyCode == 83) {
            $("#treelist .k-pager").focus();
        }
    });

The Kendo UI TreeList's pager inherits all of the keyboard navigation functionalities from the [Kendo UI Pager]({% slug overview_kendoui_pager_widget %}).

For a complete list of all supported key combinations, refer to the [Pager's Keyboard Navigation]({% slug keynav_pager_jquery %}) article.

## See Also

* [Keyboard Navigation by the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/keyboard-navigation)
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in the TreeList]({% slug keyboard_shortcuts_accessibility_support %})
