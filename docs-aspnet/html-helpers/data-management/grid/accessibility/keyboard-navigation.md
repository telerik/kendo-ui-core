---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Get started with the {{ site.product_short }} Grid by Telerik UI and learn about the accessibility support it provides through its keyboard navigation functionality."
slug: keynav_aspnetcore_grid
position: 2
---

# Keyboard Navigation

The keyboard navigation of the Grid is always available.

For a complete example, refer to the [demo on using the keyboard navigation of the Grid](https://demos.telerik.com/{{ site.platform }}/grid/keyboard-navigation).  

The Grid supports its keyboard navigation functionality through the `Navigatable()` method. When enabled, you can initially select a row or cell and then move within the Grid by using the `Arrow` keys. The navigation occurs at a cell level regardless of what the `Selectable()` mode is. To select the current row or cell, press `Space`.

The following example demonstrates how to enable the key navigation in the Grid.

    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.EmployeeViewModel>()
        .Name("grid")
        /* Other configuration. */
        .Navigatable()
    )


The keyboard navigation of the Grid works by listening to the `keydown` events on the wrapper element of the helper. Its behavior is based on the assumption that whatever the user does is in accordance with the currently focused Grid cell and not with the focused element of the browser. If the data cells of the Grid contain hyperlinks that have to be activated through the keyboard:

1. Navigate to the respective Grid cell by using the `Arrow` keys.
1. Press `Enter` to focus the hyperlink inside the cell.
1. Press `Enter` again.

To return the focus on the table cell, press `Esc`. In order for the hyperlinks to be inaccessible through tabbing, set the `tabindex="-1"` attribute to the custom hyperlinks.

You can also avoid the procedure and bypass the keyboard navigation of the Grid, access the custom hyperlinks with tabbing, and activate them with `Enter`. To achieve this, prevent the `keydown` event bubbling of the custom hyperlinks. As a result, the `Enter` key-presses will be unnoticed by the Grid.

## See Also

* [Keyboard Navigation by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/keyboard-navigation)
* [Accessibility in {{ site.product }}]({% slug overview_accessibility %})
