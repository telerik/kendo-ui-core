---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Learn Grid keyboard navigation in the {{ site.product }}, including focus and link activation."
components: ["grid"]
slug: keynav_aspnetcore_grid
position: 2
---

# Keyboard Navigation

The Grid provides built-in keyboard navigation for moving focus and selecting data from the keyboard.

For a complete example, see the [Grid keyboard navigation demo](https://demos.telerik.com/{{ site.platform }}/grid/keyboard-navigation).

## Enabling Keyboard Navigation

Enable keyboard navigation with the `Navigatable()` method. When this option is enabled, select a row or cell and move through the Grid with the `Arrow` keys. Navigation works at the cell level, regardless of the `Selectable()` mode. Press `Space` to select the current row or cell.

The following example enables keyboard navigation in the Grid.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.EmployeeViewModel>()
        .Name("grid")
        /* Other configuration. */
        .Navigatable()
    )
```

## Activating Hyperlinks in Grid Cells

Keyboard navigation listens for `keydown` events on the Grid wrapper element. The behavior depends on the currently focused Grid cell, not the currently focused browser element. If Grid data cells contain hyperlinks that you need to activate from the keyboard:

1. Navigate to the respective Grid cell by using the `Arrow` keys.
1. Press `Enter` to focus the hyperlink inside the cell.
1. Press `Enter` again to activate the hyperlink.

Press `Esc` to move focus back to the table cell. To keep custom hyperlinks out of the tab order, set `tabindex="-1"` on those links.

You can also bypass Grid keyboard navigation, use `Tab` to move to custom hyperlinks, and then press `Enter` to activate them. To do this, prevent `keydown` event bubbling on the custom hyperlinks so that the Grid does not process `Enter` key presses.

## See Also

* [Custom Keyboard Navigation in the Grid for {{ site.framework }}]({% slug custom_keyboard_navigation_grid_htmlhelper %})
{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Keyboard Navigation by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/keyboard-navigation)
* [Accessibility in {{ site.product }}]({% slug overview_accessibility %})
