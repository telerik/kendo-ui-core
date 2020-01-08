---
title: Scrolling
page_title: Scrolling
description: "Get started with the Telerik UI TreeList HtmlHelper for {{ site.framework }} and learn how to configure its scrolling functionality."
slug: htmlhelpers_treelist_aspnetcore_scrolling
position: 8
---

# Scrolling

By default, scrolling in the TreeList is enabled.

> To achieve a maximum level of accessibility with assistive technologies for the TreeList, disable its scrolling feature.

The enabled scrolling functionality does not guarantee the rendering of scrollbars because scrolling requires you to define some of the TreeList dimensions:

* To achieve vertical scrolling, set a height to the TreeList. If the height is not defined, the TreeList will have to expand vertically to show all its rows.
* To achieve horizontal scrolling, you have to explicitly define the widths of all columns in pixels and their sum must exceed the width of the TreeList.

You can independently control vertical and horizontal scrolling.

When scrolling is enabled, the TreeList renders two tables&mdash;one for the header area and one for the scrollable data area. This ensures that the header area of the TreeList is always visible during vertical scrolling. Take the two tables into account when you need to manually make JavaScript or CSS updates to the Grid tables.

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

* [Server-Side API](/api/treelist)
