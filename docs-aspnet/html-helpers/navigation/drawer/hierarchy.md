---
title: Hierarchy
page_title: Hierarchy
description: "Find out how to create an item hierarchy using the Telerik UI Drawer component for {{ site.framework }}."
slug: hierarchy_drawer_aspnetcore
position: 6
---

# Hierarchy

The Kendo UI Drawer provides the built-in functionality to create a hierarchical structure. Visit the [Hierarchy demo](https://demos.telerik.com/{{ site.platform }}/drawer/hierarchy) for a live example.

## Configuration

To utilize the hierarchy functionality of the Telerik UI Drawer:

1. Add list elements with data-role attribute `drawer-item` and class `hidden` to the drawer's `Template` configuration.

    ```HtmlHelper
        @(Html.Kendo().Drawer()
            .Name("drawer")
            .Template(@"
                <ul>
                  <li data-role='drawer-item' class='k-selected'><span class='k-icon k-i-information'></span><span class='k-item-text' data-id='GettingStarted'>Getting Started</span><span class='k-spacer'></span><span class='k-icon k-i-arrow-chevron-right'></span></li> 
                  <li data-role='drawer-separator'></li> 
                  <li data-role='drawer-item' class='hidden'><span class='k-icon k-i-none'></span><span class='k-icon k-i-question'></span><span class='k-item-text' data-id='Kendo'>About Kendo UI</span></li> 
                  <li data-role='drawer-item' class='hidden'><span class='k-icon k-i-none'></span><span class='k-icon k-i-palette'></span><span class='k-item-text' data-id='ThemeSupport'>Supported Themes</span></li> 
                  <li data-role='drawer-separator'></li> 
                  <li data-role='drawer-item'><span class='k-icon k-i-zoom'></span><span class='k-item-text' data-id='Overview'>Overview</span><span class='k-spacer'></span><span class='k-icon k-i-arrow-chevron-right'></li> 
                  <li data-role='drawer-item' class='hidden'><span class='k-icon k-i-none'></span><span class='k-icon k-i-js'></span><span class='k-item-text' data-id='About'>About Kendo</span></li> 
                  <li data-role='drawer-item' class='hidden'><span class='k-icon k-i-none'></span><span class='k-icon k-i-style-builder'></span><span class='k-item-text' data-id='All'>All Kendo Components</span></li> 
                  <li data-role='drawer-separator'></li> 
                  <li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='k-item-text' data-id='Popular'>Most popular components</span></li> 
                </ul>
            ")
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-drawer name="drawer"
                on-item-click="onItemClick"
                template-id="template">
        </kendo-drawer>
        <script id="template" type="text/html">
            <ul>
                <li data-role='drawer-item' class='k-selected'><span class='k-icon k-i-information'></span><span class='k-item-text' data-id='GettingStarted'>Getting Started</span><span class='k-spacer'></span><span class='k-icon k-i-arrow-chevron-right'></span></li>
                <li data-role='drawer-separator'></li>
                <li data-role='drawer-item' class='hidden'><span class='k-icon k-i-none'></span><span class='k-icon k-i-question'></span><span class='k-item-text' data-id='Kendo'>About Kendo UI</span></li>
                <li data-role='drawer-item' class='hidden'><span class='k-icon k-i-none'></span><span class='k-icon k-i-palette'></span><span class='k-item-text' data-id='ThemeSupport'>Supported Themes</span></li>
                <li data-role='drawer-separator'></li>
                <li data-role='drawer-item'><span class='k-icon k-i-zoom'></span><span class='k-item-text' data-id='Overview'>Overview</span><span class='k-spacer'></span><span class='k-icon k-i-arrow-chevron-right'></li>
                <li data-role='drawer-item' class='hidden'><span class='k-icon k-i-none'></span><span class='k-icon k-i-js'></span><span class='k-item-text' data-id='About'>About Kendo</span></li>
                <li data-role='drawer-item' class='hidden'><span class='k-icon k-i-none'></span><span class='k-icon k-i-style-builder'></span><span class='k-item-text' data-id='All'>All Kendo Components</span></li>
                <li data-role='drawer-separator'></li>
                <li data-role='drawer-item'><span class='k-icon k-i-star'></span><span class='k-item-text' data-id='Popular'>Most popular components</span></li>
            </ul>
        </script>
    ```
    {% endif %}

1. Add the `ItemClick` event handler to the drawer's configuration.

    ```HtmlHelper
        @(Html.Kendo().Drawer()
            .Name("drawer")
            .Events(x => x.ItemClick("onItemClick"))
        )
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-drawer name="drawer"
              on-item-click="onItemClick">
        </kendo-drawer>
    ```
    {% endif %}

1. Define the `onItemClick` handling function.

    ```html
        <script>
            function onItemClick(e) {
                if (!e.item.hasClass("k-drawer-separator")) {
                    var drawerContainer = e.sender.drawerContainer;
                    var expandIcon = e.item.find("span.k-i-arrow-chevron-right");
                    var collapseIcon = e.item.find("span.k-i-arrow-chevron-down");
                    drawerContainer.find("#drawer-content > div").addClass("hidden");
                    drawerContainer.find("#drawer-content").find("#" + e.item.find(".k-item-text").attr("data-id")).removeClass("hidden");

                    /* If the expandIcon is visible, the sub-items are hidden. Clicking on the icon should remove the hidden class and reveal the items.*/
                    if (expandIcon.length) {
                        e.item.nextAll(".k-drawer-item:not(.k-drawer-separator):lt(2)").removeClass("hidden");
                        expandIcon.removeClass("k-i-arrow-chevron-right").addClass("k-i-arrow-chevron-down");
                    }

                    /* If the collapseIcon is visible, the sub-items are visible. Clicking on the icon should add the hidden class and hide the items. */
                    if (collapseIcon.length) {
                        e.item.nextAll(".k-drawer-item:not(.k-drawer-separator):lt(2)").addClass("hidden");
                        collapseIcon.addClass("k-i-arrow-chevron-right").removeClass("k-i-arrow-chevron-down");
                    }
                }
            }
        </script>
    ```

## See Also

* [Hierarchy by the Drawer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/drawer/hierarchy)
* [Server-Side API](/api/drawer)
