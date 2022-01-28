---
title: Scrolling
page_title: jQuery TreeList Documentation | Scrolling
description: "Get started with the jQuery TreeList by Kendo UI and configure its scrolling functionality."
slug: scrolling_kendoui_treelist
position: 5
---

# Scrolling

By default, scrolling in the TreeList is enabled.

> To achieve a maximum level of accessibility with assistive technologies for the TreeList, disable its scrolling feature.

The enabled scrolling functionality does not guarantee the rendering of scrollbars because scrolling requires you to define some of the TreeList dimensions:

* To achieve vertical scrolling, set a height to the TreeList. If the height is not defined, the TreeList will have to expand vertically to show all its rows.
* To achieve horizontal scrolling, you have to explicitly define the widths of all columns in pixels and their sum must exceed the width of the TreeList.

You can independently control vertical and horizontal scrolling.

When scrolling is enabled, the TreeList renders two tables&mdash;one for the header area and one for the scrollable data area. This ensures that the header area of the TreeList is always visible during vertical scrolling. Take the two tables into account when you need to manually make JavaScript or CSS updates to the Grid tables.

The implementation and specifics of the scrolling functionality in the TreeList and the Gird are identical. Therefore, for more information on the scrolling functionality of the TreeList, refer to the following articles

* [Controlling the appearance of the Grid]({% slug scrolling_kendoui_grid_widget %})
* [Setting 100% Height and Auto-Resizing the Grid]({% slug height_kendoui_grid_widget %})
* [Removing the Vertical Scrollbar in the Grid]({% slug scrolling_kendoui_grid_widget %})
* [Setting the Columns and Column Widths in the Grid]({% slug column_widths_kendoui_grid_widget %})
* [Implementing Locked Columns in the Grid]({% slug locked_columns_kendoui_grid_widget %})

The following example demonstrates how to enable the scrolling functionality in the TreeList.

    <div class="k-widget k-grid k-treelist">
        <div class="k-grid-header">
            <div class="k-grid-header-wrap">
                <table>...</table>
            </div>
        </div>
        <div class="k-grid-content">
            <table>...</table>
        </div>
    </div>

## See Also

* [Basic Usage of the TreeList (Demo)](https://demos.telerik.com/kendo-ui/treelist/index)
* [TreeList JavaScript API Reference](/api/javascript/ui/treelist)
