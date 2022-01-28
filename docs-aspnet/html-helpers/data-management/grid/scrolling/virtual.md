---
title: Virtual Scrolling
page_title: Virtual Scrolling
description: "Get started with the Telerik UI Grid HtmlHelper for {{ site.framework }} and learn how to enable virtual scrolling as an alternative to paging."
slug: virtual_scrolling_aspnetcore_grid
position: 2
---

# Virtual Scrolling

Virtual scrolling is an alternative to paging.

For runnable examples, refer to the [demo on virtualization of remote data by the Grid](https://demos.telerik.com/{{ site.platform }}/grid/virtualization-remote-data).

## Getting Started

When virtual scrolling is enabled, the Grid loads data from its remote data source while the user scrolls vertically.

        @(Html.Kendo().Grid<AspNetCoreGrid.Models.OrderViewModel>()
            .Name("grid")
            .HtmlAttributes(new { style = "height: 380px;" })
            .Scrollable(scrollable => scrollable.Virtual(true))
        )

In virtual scrolling, the HTML output is different from the standard scrolling functionality&mdash;the data table of the Grid is not placed inside a scrollable container. The scrollbar belongs to a separate `div.k-scrollbar` which affects scenarios when the data rows have to be manually scrolled to a particular position.

        <div class="k-widget k-grid">
            <div class="k-grid-header">
                <div class="k-grid-header-wrap">
                    <table>...</table>
                </div>
            </div>
            <div class="k-grid-content">
                <div class="k-virtual-scrollable-wrap">
                    <table>...</table>
                </div>
                <div class="k-scrollbar k-scrollbar-vertical">
                    ...<!-- div elements which generate a scrollbar -->...
                </div>
            </div>
        </div>

When the user scrolls a Grid in its virtual-scrolling mode, the Grid renders the table rows for the reached scroll position on the fly. If the Gris uses local data or if its remote data has already been loaded and cached, the rendering rate and performance of the widget depend on:
* The page size.
* The Grid height.
* The scrolling speed.
* The total number of data items.

If the total number of items is large and the scrolling is fast, the table of the Grid can be re-rendered frequently. If, additionally, the page size is huge, the user might observe issues with the smoothness of the scrolling. In such cases, reduce the page size and increase the Grid height to improve the scrolling performance.

## Setting the Scrollbar

Virtual scrolling relies on a fake scrollbar. Its size is not determined by the browser but is calculated based on the average row height of the data that is already loaded. As a result, variable row heights may cause unexpected behavior such as an inability to scroll to the last rows on the last page. To ensure that all table rows have the same heights, use either of the following options:
* Disable text wrapping, or
* Set an explicit, large-enough row height as demonstrated in the following example.

        .k-virtual-scrollable-wrap tr
        {
            height: 3em;
        }

        // Or

        .k-virtual-scrollable-wrap td
        {
            white-space: nowrap;
        }

## Using on Mobile

On mobile devices where a scrollbar that can be grabbed and dragged is not visible, virtual scrolling of a large number of data items (for example thousands) might hinder the easy access to all table rows because the large number of data items will require a great deal of touch scrolling. On the other hand, using virtual scrolling with a very small number of items (for example, less than 200) does not make much sense. Virtual scrolling on touch devices relies on drag-and-drop events, which are slower than native scrolling. This might lead to performance issues.

## Known Limitations

> When virtual scrolling is not supported or recommended and depending on the number of data items, either revert to standard paging or to non-virtual scrolling without paging.

* Horizontal scrolling is not virtualized.
* Either enable virtual scrolling or paging. Do not apply both features at the same time.
* Virtual scrolling is not compatible with hierarchy. Editing is supported as of R3 2017. [Group paging]({% slug htmlhelpers_grid_aspnet_grouping %}) is supported as of R2 2020.
* Virtual scrolling relies on calculating the average row height based on already loaded data. Having a large variance of row heights or an unknown number of rows that are not bound to data (such as group headers) might cause unexpected behavior.
* Provide for a page size of the Grid that is large enough, so that the table rows do not fit in the scrollable data area. Otherwise the vertical virtual scrollbar will not be created. The page size of the Grid must be over three times larger than the number of visible table rows in the data area.
* A scrollable Grid with a set height needs to be visible when initialized. In this way the Grid adjusts the height of its scrollable data area in accordance with the total height of the widget. In certain scenarios the Grid might be invisible when initialized - for example, when placed inside an initially inactive TabStrip tab or in another widget. In such cases use either of the following options:
    * Initialize the Grid while its element is still visible.
    * Initialize the Grid in a suitable event of the parent widget - for example, in the `Activate()` event handler of the TabStrip.
* Because of height-related browser limitations (which cannot be avoided), virtual scrolling works with up to one or two million records. The exact number of records depends on the browser and the row height. If you use a row count that is larger than the browser can handle, unexpected widget behavior or JavaScript errors might occur. In such cases, revert to standard paging.
* Refreshing or replacing the Grid data in the virtual mode has to be accompanied by resetting the position of the virtual scrollbar to zero&mdash;for example, by using `$('#GridID .k-scrollbar').scrollTop(0);`. In some scenarios, you might also need to call the [`refresh()` method](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/refresh).
* Programmatic scrolling to a particular Grid row is not supported when virtual scrolling is enabled, because it is not possible to reliably predict the exact scroll offset of the row.
* When the Grid is `navigatable`, keyboard navigation supports only the `Up Arrow` and `Down Arrow` keys. The `Page Up` and `Page Down` key scrolling is not supported.

## See Also

* [Virtualization of Remote Data by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/virtualization-remote-data)
* [Server-Side API](/api/grid)
