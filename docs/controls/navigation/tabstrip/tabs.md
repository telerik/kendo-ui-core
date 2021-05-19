---
title: Tabs
page_title: jQuery TabStrip Documentation | Tabs
description: "Get started with the jQuery TabStrip by Kendo UI and learn how to dynamically add and remove tabs, implement scrollable and sortable tabs, control the tab position, and select tabs on initial load."
slug: tabs_tabstrip
position: 3
---

# Tabs

The TabStrip provides options for enhancing the behavior of its tabs.

* [Adding and removing tabs dynamically](#dynamic-tabs)
* [Rendering scrollable tabs](#scrollable-tabs)
* [Rendering sortable tabs](#sortable-tabs)
* [Positioning the tabs](#positioning-the-tabs)
* [Selecting tabs on initial load](#selecting-tabs-on-initial-load)

## Dynamic Tabs

The [TabStrip API](/api/javascript/ui/tabstrip) provides methods for dynamically adding or removing TabStrip tabs. To dynamically add a tab, provide the new item as a JSON object along with a reference item. A reference item is a target TabStrip tab HTML element that already exists in the TabStrip. The reference item will be used to determine the placement in the hierarchy of the new tab. To obtain a reference to the target item, you can use any valid jQuery selector. For an example, refer to the [demo on using the TabStrip API](https://demos.telerik.com/kendo-ui/tabstrip/api).

The following example demonstrates how to add a new TabStrip tab.

    <div id="tabstrip">
        <ul>
            <li>First Tab</li>
            <li>Second Tab</li>
        </ul>
        <div></div>
        <div></div>
    </div>

    <script>
        var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
        tabstrip.insertAfter(
            { text: "New Tab" },
            tabstrip.tabGroup.children("li:last")
        );
    </script>

## Scrollable Tabs

As of the Kendo UI 2015 Q2 (2015.2.624) release, the TabStrip supports scrollable tabs for the `"top"` and `"bottom"` options of the `tabPosition` configuration. By default, during initialization the widget checks if the tabs fit in the available horizontal space. If they do not fit, the TabStrip renders scroll buttons on its sides. To disable this behavior, [use the `scrollable` option](/api/javascript/ui/tabstrip/configuration/scrollable).

If the TabStrip has no fixed width and is placed in a fluid layout, you can set it to check again whether or not the tab scrolling is required. To enable tab scrolling in fluid containers, use the [`resize()` method](/using-kendo-in-responsive-web-pages#individual-widget-resizing)&mdash;for example, in `window.resize`. If the tab which was last selected becomes invisible because of the TabStrip shrinking, `resize` will also show the right scroll button. For more information, refer to the [TabStrip API](/api/javascript/ui/tabstrip).

For a complete example, refer to the [demo on implementing scrollable tabs in the TabStrip](https://demos.telerik.com/kendo-ui/tabstrip/scrollable-tabs).

## Sortable Tabs

You can also implement sortable (draggable) tabs which users are able to close when they are no longer required. For the complete example, refer to the [demo on implementing sortable and closable tabs in the TabStrip](https://demos.telerik.com/kendo-ui/tabstrip/sortable-closable).

## Positioning the Tabs

The TabStrip delivers options for setting the position of its tabs not only on top, but also to the right, left, and bottom. For the complete example, refer to the [demo on positioning the tabs of the TabStrip](https://demos.telerik.com/kendo-ui/tabstrip/tab-position).

## Selecting Tabs on Initial Load

You can also select a tab and display its associated content upon the initial load of the TabStrip.

To implement the tab selection on initial load, use either of the following approaches which produce the same result:

* Add a `"k-state-active"` class to the DOM element of the tab.
* Use `select()` to target and select a tab either by selector or index.

The following example demonstrates how to manually select a default tab by using HTML.

    <div id="tabstrip">
        <ul>
            <li class="k-state-active">First Tab</li>
            <li>Second Tab</li>
        </ul>
        <div></div>
        <div></div>
    </div>

The following example demonstrates how to initialize a TabStrip and select the first tab by element.

   <div id="tabstrip">
        <ul>
            <li class="k-state-active">First Tab</li>
            <li>Second Tab</li>
        </ul>
        <div></div>
        <div></div>
    </div>

    <script>
        $(document).ready(function(){
            var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
            tabstrip.select(tabstrip.tabGroup.children("li:first"));
        });
    </script>

The following example demonstrates how to initialize a TabStrip and select the first tab by index.

    <div id="tabstrip">
        <ul>
            <li class="k-state-active">First Tab</li>
            <li>Second Tab</li>
        </ul>
        <div></div>
        <div></div>
    </div>

    <script>
        $(document).ready(function(){
            var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
            tabstrip.select(0);
        });
    </script>

## See Also

* [Implementing Scrollable Tabs in the TabStrip (Demo)](https://demos.telerik.com/kendo-ui/tabstrip/scrollable-tabs)
* [Implementing Sortable and Closable Tabs in the TabStrip (Demo)](https://demos.telerik.com/kendo-ui/tabstrip/sortable-closable)
* [Positioning the Tabs of the TabStrip (Demo)](https://demos.telerik.com/kendo-ui/tabstrip/tab-position)
* [Using the TabStrip API (Demo)](https://demos.telerik.com/kendo-ui/tabstrip/api)
* [JavaScript API Reference of the TabStrip](/api/javascript/ui/tabstrip)
