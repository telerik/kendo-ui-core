---
title: Overview
page_title: Scrolling Overview
description: "Get started with the Telerik UI Grid component for {{ site.framework }} and learn how to configure the scrolling functionality of the component."
slug: htmlhelpers_grid_aspnetcore_scrolling
position: 1
---

# Scrolling Overview

By default, the scrolling functionality of the Grid is disabled. 

{% if false == true %}
{% include cta-panel-small.html %}
{% endif %}

To enable the scrolling, set the `Scrollable()` option.

```HtmlHelper
    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Scrollable()
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
        <scrollable enabled="true"/>
    </kendo-grid>
```
{% endif %}

For more information about the scroll modes and scroll features of the Grid, refer to the articles on:
* [Virtual Scrolling]({% slug virtual_scrolling_aspnetcore_grid %})
* [Endless Scrolling]({% slug endless_scrolling_aspnetcore_grid %})
* [Scrolling to a Specific Row]({% slug scrolling_to_item_aspnetcore_grid %})

Depending on the enabled scroll mode, the rendering of the dimensions and layout of the Grid varies. For more information, refer to the following articles:
* [Height of the Grid]({% slug height_aspnetcore_grid %})
* [Width of the Grid]({% slug width_grid_aspnetcore %})
* [Rows]({% slug rows_aspnetcore_grid_widget %})
* [Hidden containers]({% slug hidden_containers_aspnetcore_grid %})
* [Responsive design]({% slug adaptive_rendering_gridhelper_aspnetcore %})

## Getting Started  

When scrolling is enabled, the component renders two tables by default&mdash;one for the header area and one for the scrollable data area. These two tables are important when you need to manually modify the Grid using JavaScript or CSS.

The following example shows the HTML output of a Grid with default scrolling or [endless scrolling modes]({% slug endless_scrolling_aspnetcore_grid %}) enabled.

```HTML    
    <div class="k-grid">
        <div class="k-grid-header">
            <div class="k-grid-header-wrap">
                <table class="k-grid-header-table">
                    ...
                </table>
            </div>
        </div>
        <div class="k-grid-container">
            <div class="k-grid-content k-auto-scrollable">
                <table class="k-grid-table">
                    ...
                </table>
            </div>
        </div>
    </div>
```

The following example demonstrates the HTML output of the Grid with [virtual scrolling enabled]({% slug virtual_scrolling_aspnetcore_grid %}).

```HTML
    <div class="k-grid">
        <div class="k-grid-header">
            <div class="k-grid-header-wrap">
                <table class="k-grid-header-table">
                    ...
                </table>
            </div>
        </div>
        <div class="k-grid-container">
            <div class="k-grid-content k-auto-scrollable">
                <div class="k-virtual-scrollable-wrap">
                    <table class="k-grid-table">
                        ...
                    </table>
                </div>
                <div class="k-scrollbar k-scrollbar-vertical">
                </div>
            </div>
        </div>
    </div>
```

> To achieve the highest level of accessibility through assistive technologies, the scrolling feature of the Grid must be disabled. For this reason, the scrolling of the Grid is disabled by default.

## Modifying the Scrollable Area

When scrolling is enabled, the Grid applies a default height of `400px` to its content area. You can change or remove the height of the scrollable area by setting an optional height style in the Grid's `Scrollable()` option.

```HtmlHelper
    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Scrollable(s => s.Height(400)) // Set a 400px-height to the "k-grid-content" element.
    )

    // Alternatively:

    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Scrollable(s => s.Height("auto")) // Remove the default height.
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid">
        <scrollable enabled="true"/>
    </kendo-grid>

    <style>
        /* Set a 400px-height to the "k-grid-content" element. */
        #grid .k-grid-content{
            height: 400px;
        }

        /* Alternatively, remove the default height. */
        /*
        #grid .k-grid-content{
            height: auto;
        }
        */
    </style>
```
{% endif %}

## Setting the Scrollbars

By default, the Grid does not display scrollbars when scrolling is enabled. To render scrollbars and achieve vertical or horizontal scrolling, define the following dimensions of the Grid. You can control vertical and horizontal scrolling independently.
* To achieve vertical scrolling, set the height of the Grid. Otherwise, it will expand vertically to show all rows.
* To achieve horizontal scrolling, explicitly define the width of all columns in pixels and make sure their sum exceeds the width of the Grid.

When scrolling is enabled, the vertical scrollbar of the Grid is always visible even if not needed, which simplifies the implementation and improves the performance of the component. 

To remove the vertical scrollbar, use CSS rules and make sure that neither the Grid nor its data area apply fixed heights so that they can shrink and expand according to the number of table rows. In the following example, the `#GridID` CSS selector applies the styles only to a particular Grid instance. To apply these styles in all Grid instances, replace the `#GridID` CSS selector with the `.k-grid` class. 

```CSS
    #GridID .k-grid-header {
       padding: 0 !important;
    }

    #GridID .k-grid-content {
       overflow-y: hidden;
    }
```

The following example shows how to activate the horizontal scrollbar of the Grid. The sum of the column widths exceeds the width of the Grid.

```HtmlHelper
    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Scrollable()
        .Width(800)
        .Columns(columns => {
            columns.Bound(p => p.OrderID).Width(150);
            columns.Bound(p => p.Freight).Width(200);
            columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}").Width(200);
            columns.Bound(p => p.ShipName).Width(200);
            columns.Bound(p => p.ShipCity).Width(200);
        })
        ... // Additional configuration.
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid" width="800">
        <scrollable enabled="true"/>
        <columns>
            <column field="OrderID" width="150"/>
            <column field="Freight" width="200"/>
            <column field="OrderDate" width="200" format="{0:MM/dd/yyyy}"/>
            <column field="ShipName" width="200"/>
            <column field="ShipCity" width="200"/>
        </columns>
        <!-- Additional configuration.-->
    </kendo-grid>
```
{% endif %}

## Restoring the Scroll Position

In some scenarios, the scroll position of the Grid can be reset when the component rebinds. To prevent the restoration of the scroll position:

1. Save the scroll position in the [`DataBinding`](/api/kendo.mvc.ui.fluent/grideventbuilder#databindingsystemstring) event handler.
1. Restore the scroll position in the [`DataBound`](/api/kendo.mvc.ui.fluent/grideventbuilder#databoundsystemstring) event handler.

The scrollable container is `div.k-grid-content`. You can retrieve it with jQuery through the `wrapper` object (the outermost object of the component)  of the Grid reference.  If virtual scrolling is enabled, the scrollable data container is `div.k-virtual-scrollable-wrap` and the container is scrolled only horizontally.

```HtmlHelper
    @(Html.Kendo().Grid<OrderViewModel>()
        .Name("grid")
        .Scrollable()
        .Events(events=>events
            .DataBound("onGridDataBound")
            .DataBinding("onGridDataBinding")
        )
        ... // Additional configuration.
    )

    <script>
        $(function () {
            // Initialize the variable which will hold the scroll positions.
            var scrollOffset = {
                left: 0,
                top: 0
            };

            // Save the scroll position before the new data is rendered.
            function onGridDataBinding(e) {
                var container = e.sender.wrapper.children(".k-grid-content"); // Or ".k-virtual-scrollable-wrap".
                scrollOffset.left = container.scrollLeft();
                scrollOffset.top = container.scrollTop(); // Use only if virtual scrolling is disabled.
            }

            // Restore the scroll position after the new data is rendered.
            function onGridDataBound(e) {
                var container = e.sender.wrapper.children(".k-grid-content"); // Or ".k-virtual-scrollable-wrap".
                container.scrollLeft(scrollOffset.left);
                container.scrollTop(scrollOffset.top); // Use only if virtual scrolling is disabled.
            }
        });
    </script>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid" on-data-binding="onGridDataBinding" on-data-bound="onGridDataBound">
        <scrollable enabled="true"/>
        <!-- Additional configuration.-->
    </kendo-grid>

    <script>
        $(function () {
            // Initialize the variable which will hold the scroll positions.
            var scrollOffset = {
                left: 0,
                top: 0
            };

            // Save the scroll position before the new data is rendered.
            function onGridDataBinding(e) {
                var container = e.sender.wrapper.children(".k-grid-content"); // Or ".k-virtual-scrollable-wrap".
                scrollOffset.left = container.scrollLeft();
                scrollOffset.top = container.scrollTop(); // Use only if virtual scrolling is disabled.
            }

            // Restore the scroll position after the new data is rendered.
            function onGridDataBound(e) {
                var container = e.sender.wrapper.children(".k-grid-content"); // Or ".k-virtual-scrollable-wrap".
                container.scrollLeft(scrollOffset.left);
                container.scrollTop(scrollOffset.top); // Use only if virtual scrolling is disabled.
            }
        });
    </script>
```
{% endif %}

## Adjusting Scrollbar and Page Layout on Zoom

When a web page is zoomed, the browser changes the content size of all pages except for the scrollbars. It leads to misalignment between the header and the data areas in Grids with enabled scrolling functionality. To adjust the layout, execute the following JavaScript logic on `$(window).resize()`.

> If the Grid is in the right-to-left (RTL) mode, use the `padding-left` instead of the `padding-right` CSS attribute.

    $(function () {
        $(window).resize(function (e) {
            var grid = $('#GridID').data("kendoGrid"); // Get a reference to the Grid.
            grid.thead.closest(".k-grid-header").css("padding-right", kendo.support.scrollbar(true));
        });
    });

## See Also

* [Scrolling a Grid HtmlHelper for {{ site.framework }} with Locked Columns (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/frozen-columns)
* [Virtual Scrolling a Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/virtualization-remote-data)
* [Endless Scrolling a Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/endless-scrolling-remote)
* [Scrolling the Grid HtmlHelper for {{ site.framework }} to a Specific Item (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/scroll-to-item)
* [Server-Side API](/api/grid)
