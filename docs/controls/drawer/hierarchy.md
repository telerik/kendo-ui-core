---
title: Hierarchy
page_title: jQuery Drawer Documentation - Hierarchy
description: "Get started with the jQuery Drawer by Kendo UI and find out how to use it's hierarchy functionality."
components: ["drawer"]
slug: hierarchy_kendoui_drawer
position: 5
---

# Hierarchy

The Kendo UI Drawer provides the built-in functionality to create a hierarchical structure. Visit the [Hierarchy demo](https://demos.telerik.com/kendo-ui/drawer/hierarchy) for a live example.

## Configuration

To utilize the hierarchy functionality of the Kendo UI Drawer:

1. Add list elements with data-role attribute `drawer-item` and class `hidden` to the drawer [`template`](/api/javascript/ui/drawer/configuration/template). Use the `data-level` attribute to specify the hierarchy level of each item.

    ```javascript
    $("#drawer").kendoDrawer({
     template: `<ul>
        <li data-role='drawer-item' data-level='0'>${kendo.ui.icon("info-circle")}<span class='k-item-text' data-id='GettingStarted'>Getting Started</span><span class='k-spacer'></span><span class='k-drawer-toggle'>${kendo.ui.icon("chevron-right")}</span></li>
        <li data-role='drawer-separator'></li>
        <li data-role='drawer-item' data-level='1' class='k-hidden'>${kendo.ui.icon("question-circle")}<span class='k-item-text' data-id='Kendo'>About Kendo UI</span></li>
        <li data-role='drawer-item' data-level='1' class='k-hidden'>${kendo.ui.icon("palette")}<span class='k-item-text' data-id='ThemeSupport'>Supported Themes</span></li>
        <li data-role='drawer-separator'></li>
        <li data-role='drawer-item' data-level='0' class='k-selected'>${kendo.ui.icon("search")}<span class='k-item-text' data-id='Overview'>Overview</span><span class='k-spacer'></span><span class='k-drawer-toggle'>${kendo.ui.icon("chevron-down")}</span></li>
        <li data-role='drawer-item' data-level='1'>${kendo.ui.icon("js")}<span class='k-item-text' data-id='About'>About Kendo</span></li>
        <li data-role='drawer-item' data-level='1'>${kendo.ui.icon("building-blocks")}</span><span class='k-item-text' data-id='All'>All Kendo Components</span></li>
        <li data-role='drawer-separator'></li>
        <li data-role='drawer-item' data-level='0'>${kendo.ui.icon("star")}<span class='k-item-text' data-id='Popular'>Most popular components</span></li>
      </ul>`,
    });
    ```

    The hierarchy levels are determined by the Kendo themes and currently support levels from `0` to `5`. If no `data-level` attribute is specified, the Drawer will automatically set it to `0`. Setting `data-level='6'` or higher will have no visual effect as only levels 0-5 are styled by the themes.

1. In the [`itemClick`](/api/javascript/ui/drawer/events/itemclick) event of the drawer handle the expansion and collapse of the hierarchical items.

    ```javascript
    $("#drawer").kendoDrawer({
        itemClick: (e) => {
            if (!e.item.hasClass("k-drawer-separator")) {
                var drawerContainer = e.sender.drawerContainer;
                var expandIcon = e.item.find("span.k-svg-i-chevron-right");
                var collapseIcon = e.item.find("span.k-svg-i-chevron-down");
                drawerContainer.find("#drawer-content > div").addClass("k-hidden");
                drawerContainer.find("#drawer-content").find("#" + e.item.find(".k-item-text").attr("data-id")).removeClass("k-hidden");

                if (expandIcon.length) {
                    e.item.nextAll(".k-drawer-item:not(.k-drawer-separator):lt(2)").removeClass("k-hidden");
                    expandIcon.replaceWith(kendo.ui.icon("chevron-down"));
                }

                /* If the collapseIcon is visible, the sub-items are visible. Clicking on the icon should add the hidden class and hide the items. */
                if (collapseIcon.length) {
                    e.item.nextAll(".k-drawer-item:not(.k-drawer-separator):lt(2)").addClass("k-hidden");
                    collapseIcon.replaceWith(kendo.ui.icon("chevron-right"));
                }
            }
        }
    });
    ```

## See Also

* [Drawer Hierarchy (Demo)](https://demos.telerik.com/kendo-ui/drawer/hierarchy)
* [JavaScript API Reference of the Drawer](/api/javascript/ui/drawer)
