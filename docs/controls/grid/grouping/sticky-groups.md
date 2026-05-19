---
title: Sticky Groups
page_title: jQuery Grid Documentation - Sticky Groups
description: "Learn how to enable sticky group headers and footers in the jQuery Grid by Kendo UI to keep group context visible while scrolling."
components: ["grid"]
slug: sticky_groups_kendoui_grid_widget
position: 4
---

# Sticky Groups

The Kendo UI Grid supports sticky group headers and footers. When the user scrolls through grouped data, the sticky group headers remain visible at the top of the Grid and the sticky group footers remain visible at the bottom, providing continuous context about which group the currently visible rows belong to.

## Getting Started

To enable sticky group headers, set the [`groupable.stickyHeaders`](/api/javascript/ui/grid/configuration/groupable.stickyheaders) option to `true`. To enable sticky group footers, set the [`groupable.stickyFooters`](/api/javascript/ui/grid/configuration/groupable.stickyfooters) option to `true`. The Grid must have the [`scrollable`](/api/javascript/ui/grid/configuration/scrollable) option enabled and a [`height`](/api/javascript/ui/grid/configuration/height) set for the sticky behavior to work.

    $("#grid").kendoGrid({
        height: 400,
        scrollable: true,
        groupable: {
            enabled: true,
            stickyHeaders: true,
            stickyFooters: true
        },
        dataSource: {
            data: products,
            group: {
                field: "category",
                aggregates: [
                    { field: "productName", aggregate: "count" }
                ]
            }
        },
        columns: [
            { field: "productName", title: "Product Name", groupFooterTemplate: "Count: #=count#" },
            { field: "category", title: "Category" },
            { field: "unitPrice", title: "Unit Price", format: "{0:c}" }
        ]
    });

> Sticky group footers require the columns to have a `groupFooterTemplate` defined and the DataSource to have `aggregates` configured.

## Features

The sticky groups functionality works with:

* **Nested groups**&mdash;When the Grid is grouped by multiple fields, sticky headers and footers are rendered for each grouping level.
* **Locked (frozen) columns**&mdash;Sticky group rows span both the locked and scrollable sections of the Grid.
* **Virtual scrolling**&mdash;Sticky headers and footers are supported when the Grid uses virtual scrolling (`scrollable: { virtual: true }`).
* **Keyboard navigation**&mdash;When the Grid is [`navigatable`](/api/javascript/ui/grid/configuration/navigatable), the sticky group headers and footers can be focused and navigated with the keyboard.

## Runtime Toggle

You can enable or disable the sticky behavior at runtime by calling the [`setOptions`](/api/javascript/ui/grid/methods/setoptions) method:

    var grid = $("#grid").data("kendoGrid");
    grid.setOptions({
        groupable: {
            stickyHeaders: false,
            stickyFooters: false
        }
    });

## See Also

* [Sticky Groups Demo](https://demos.telerik.com/kendo-ui/grid/sticky-groups)
* [Grouping Overview]({% slug grouping_kendoui_grid_widget %})
* [Grouping with Aggregates]({% slug aggregates_kendoui_grid_widget %})
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
