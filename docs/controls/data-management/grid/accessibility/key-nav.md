---
title: Keyboard Navigation
page_title: jQuery Grid Documentation | Keyboard Navigation | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn about the accessibility support it provides through its keyboard navigation functionality."
slug: keynav_kendoui_grid_widget
position: 2
---

# Keyboard Navigation

The keyboard navigation of the Grid is always available.

The Grid supports its keyboard navigation functionality through the `navigatable` option. When set to `true`, you can initially select a row or cell and then move within the Grid by using the `Arrow` keys. The navigation occurs at a cell level regardless of what the `selectable` mode is. To select the current row or cell, press `Space`.

The following example demonstrates how to enable the key navigation in the Grid.

###### Example

    $("#grid").kendoGrid({
         navigatable: true
         // Other configuration.
    });

The keyboard navigation of the Grid works by listening to the `keydown` events on the wrapper element of the widget. Its behavior is based on the assumption that whatever the user does is in accordance with the currently focused Grid cell and not with the focused element of the browser. If the data cells of the Grid contain hyperlinks that have to be activated through the keyboard:

1. Navigate to the respective Grid cell by using the `Arrow` keys.
1. Press `Enter` to focus the hyperlink inside the cell.
1. Press `Enter` again.

To return the focus on the table cell, press `Esc`. In order for the hyperlinks to be inaccessible through tabbing, set the `tabindex="-1"` attribute to the custom hyperlinks.

You can also avoid the procedure and bypass the keyboard navigation of the Grid, access the custom hyperlinks with tabbing, and activate them with `Enter`. To achieve this, prevent the `keydown` event bubbling of the custom hyperlinks. As a result, the `Enter` key-presses will be unnoticed by the Grid.

## See Also

* [Keyboard Navigation by the Grid (Demo)](http://demos.telerik.com/kendo-ui/web/grid/navigation.html)
* [Keyboard Support in Kendo UI for jQuery]({% slug keyboard_shortcuts_accessibility_support %})
* [Accessibility in the Grid]({% slug keyboard_shortcuts_accessibility_support %})
