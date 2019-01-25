---
title: Locked Columns
page_title: jQuery Grid Documentation | Locked Columns | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI supporting locked columns that are visible at all times while the user scrolls the Grid horizontally."
slug: locked_columns_kendoui_grid_widget
position: 3
---

# Locked Columns

Locked (frozen) columns allow part of the columns to be visible at all times while the user scrolls the Grid horizontally.

When you implement custom code and rely on selectors or target the Grid table, consider that the Grid creates separate tables for its locked and scrollable sections. The locked columns are inside a `.k-grid-content-locked` element and the scrollable content is inside a `.k-grid-content` one.

The Grid allows you to lock columns on one side of the table. For the feature to work properly, provide the following configuration settings:

* Enable [scrolling](#scrolling).
* Lock at least one column initially.
* Define the height of the Grid.
* Set explicit pixel widths to all columns to allow the Grid to adjust the layout of the frozen and non-frozen table parts.
* Make sure that the total width of all locked columns is equal to or less than the width of the Grid minus three times the width of the scrollbar.
* Make sure that the Grid is not [initialized inside a hidden container](#hidden-containers).

These settings ensure that at least one non-locked column is always visible and that it is possible to scroll the non-locked columns horizontally. Note that if the horizontal space intended for it is not enough, the horizontal scrollbar does not appear.

Frozen columns cannot be touch-scrolled, because they are wrapped in a container with an `overflow:hidden` style. To work around this limitation on desktop devices, use the `mousewheel` event. However, no workaround exists for touch devices.

Frozen columns rely on synchronizing the row height of the frozen and non-frozen parts of the Grid. Some browsers, such as Internet Explorer 9 and Firefox, require a `line-height` style set in pixels. Otherwise, the synchronization might not work properly possibly because of sub-pixel quirks.

###### Example

    div.k-grid td
    {
        line-height: 18px;
    }

> **Important**
> * The [JavaScript API of the Grid](/api/javascript/ui/grid) allows you to lock and unlock columns on the fly. However, this is possible only if at least one column is initially locked during initialization. The HTML output and script behavior of the Grid are very different when frozen columns are used. That is why the widget cannot switch between frozen and unfrozen mode after initialization.
> * The locked columns can be positioned only on the left side of the Grid. Positioning them on the right side is not supported.
> * The row template and detail features are not supported in combination with column locking. It is possible to lock a column at the topmost level only, if you use [multi-column headers](http://demos.telerik.com/kendo-ui/grid/multicolumnheaders).

## See Also

* [Grid JavaScript API Reference](/api/javascript/ui/grid)
* [Kendo UI Knowledge Base](/knowledge-base)
