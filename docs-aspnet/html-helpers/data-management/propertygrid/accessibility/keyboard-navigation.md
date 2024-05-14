---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Get started with the {{ site.product_short }} PropertyGrid by Telerik UI and learn about the component keyboard navigation functionality."
slug: keynav_aspnetcore_propertygrid
position: 2
---

# Keyboard Navigation

By default, the keyboard navigation of the PropertyGrid component is disabled.

Enable the PropertyGrid keyboard navigation functionality through the `Navigatable()` method. When the option is set to `true`, you can initially select a cell and then move within the PropertyGrid by using the `Arrow` keys. The navigation occurs at a cell level. To select the row of the currently focused cell, press `Space`.

The following example demonstrates how to enable the component keyboard navigation.

```HtmlHelper
    @(Html.Kendo().PropertyGrid<PropertyViewModel>()
        .Name("propertyGrid")
        /* Other configuration. */
        .Navigatable(true)
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-propertygrid name="propertyGrid" navigatable="true">
        <!-- Other configuration -->
    </kendo-propertygrid>
```
{% endif %}

For a complete example, refer to the [demo on using the keyboard navigation of the PropertyGrid](https://demos.telerik.com/{{ site.platform }}/propertygrid/keyboard-navigation).  

The PropertyGrid supports the following keyboard shortcuts:

* Actions Applied to the Data Table

| SHORTCUT                      | DESCRIPTION                                                                        |
|:---                 |:---                                                                                          |
| `Access key + w`    | Focuses the component.                                                                       |
| `Arrow Keys`        | Navigate over the cells.                                                                     |
| `Space`             | Selects the row holding the currently highlighted cell.                                      |
| `Enter ` or `F2`    | Puts the cell in edit mode.                                                                  |
| `Esc`               | Cancels the edit or, if an element inside a cell is focused, returns the focus to the table. |
| `Ctrl + Home`       | Focuses the first focusable element inside the body.                                         |
| `Ctrl + End`        | Focuses the last focusable element inside the body.                                          |
| `Alt + Right Arrow`        | Expands the currently selected item, either a group or a composite item.                                          |
| `Alt + Left Arrow`        | Collapses the currently selected item, either a group or a composite item.                                          |
| `Home`              | Focuses the first focusable cell in the row.                                                 |
| `End`               | Focuses the last focusable cell in the row.                                                  |

* Actions Applied to the ToolBar

| SHORTCUT         | DESCRIPTION                                                                                          |
|:---              |:---                                                                                                  |
| `Access key + w` | Focuses the component.                                                                               |
| `F10`            | Focuses the ToolBar.                                                                                 |
| `Right Arrow`    | Focuses the next focusable item.                                                                     |
| `Left Arrow`     | Focuses the previous focusable item.                                                                 |
| `Enter`          | Selects the focused button, or enters the inner template navigation if the template contains focusable items, or opens the CommandOverflow menu when an overflow anchor is focused.|
| `Space`          | Selects the focused button.                                                                          |
| `Home`           | Focuses the first focusable item.                                                                    |
| `End`            | Focuses the last focusable item.                                                                     |
| `Esc`            | If the inner template navigation is activated, moves the focus back to the PropertyGrid ToolBar item.|


## See Also

* [Keyboard Navigation by the PropertyGrid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/propertygrid/keyboard-navigation)
* [Accessibility in {{ site.product }}]({% slug overview_accessibility %})
