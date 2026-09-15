---
title: Display Multiple Rows in the Kendo UI Grid Toolbar
description: Learn how to display custom controls on multiple rows in the Kendo UI for jQuery Grid toolbar while keeping the toolbar above the Grid.
type: how-to
page_title: Display Multiple Rows in the Kendo UI Grid Toolbar - Kendo UI for jQuery
tags: kendo,ui,jquery,grid,toolbar,rows,template,css
res_type: kb
components: ["grid"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
 <tr>
  <td>Version</td>
  <td>2026.3.811</td>
 </tr>
</table>

## Description

How can I display multiple rows of controls in the Kendo UI Grid toolbar while keeping the toolbar above the Grid? I want to keep the built-in `create`, `save`, `group`, and `filter` commands, place custom actions in a separate section, and use CSS to control the layout instead of adding multiple toolbar instances or `<br>` elements.

This KB also answers the following questions:

* Can I create multiple toolbars in the Kendo UI Grid?
* How can I place custom Grid toolbar buttons on separate rows?
* How can I create a separate Quick actions section in the Kendo UI Grid toolbar?

## Solution

The Grid provides one toolbar region. To display multiple visual rows, keep the built-in commands in the toolbar configuration and add the custom controls in a single toolbar template. Use CSS to keep the native commands in their own toolbar area and place the custom controls in a separate Quick actions section.

1. Add the built-in `create` and `save` commands to the toolbar.
1. Add the custom controls to a toolbar template and wrap them in row elements.
1. Set the toolbar and row elements to use a block or Flexbox layout.

The following example demonstrates the layout with inventory actions. The built-in commands remain native Grid toolbar commands, while the custom actions are arranged in a responsive Quick actions section.

```dojo
<div id="grid"></div>

<script id="custom-toolbar-template" type="text/x-kendo-template">
    <div class="custom-toolbar-rows">
        <div class="custom-toolbar-heading">Quick actions</div>
        <div class="custom-toolbar-row">
            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base custom-toolbar-button" id="group-by-status">
                Group by Status
            </button>
        </div>
        <div class="custom-toolbar-row">
            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base custom-toolbar-button" id="show-active-items">
                Show Active Items
            </button>
        </div>
        <div class="custom-toolbar-row">
            <button type="button" class="k-button k-button-md k-button-solid k-button-solid-base custom-toolbar-button" id="clear-filters">
                Clear Filters
            </button>
        </div>
    </div>
</script>

<script>
    $(document).ready(function () {
        var grid = $("#grid").kendoGrid({
            toolbar: [
                { name: "create", text: "Add Inventory Item" },
                "save",
                "group",
                "filter",
                { template: kendo.template($("#custom-toolbar-template").html()) }
            ],
            columns: [
                { field: "item", title: "Item" },
                { field: "category", title: "Category" },
                { field: "status", title: "Status" },
                { field: "quantity", title: "Quantity" }
            ],
            dataSource: {
                data: [
                    { item: "Safety Gloves", category: "Protective Equipment", status: "Active", quantity: 125 },
                    { item: "Face Shield", category: "Protective Equipment", status: "Active", quantity: 48 },
                    { item: "Steel-Toe Boots", category: "Footwear", status: "Inactive", quantity: 0 }
                ],
                schema: {
                    model: {
                        id: "item"
                    }
                }
            },
            editable: true,
            filterable: true,
            groupable: true
        }).data("kendoGrid");

        $("#grid").on("click", "#group-by-status", function () {
            groupByStatus();
        });

        $("#grid").on("click", "#show-active-items", function () {
            showActiveItems();
        });

        $("#grid").on("click", "#clear-filters", function () {
            clearFilters();
        });

        function groupByStatus() {
            var grouped = grid.dataSource.group();
            grid.dataSource.group(grouped.length ? [] : { field: "status" });
        }

        function showActiveItems() {
            grid.dataSource.filter({ field: "status", operator: "eq", value: "Active" });
        }

        function clearFilters() {
            grid.dataSource.filter({});
        }
    });
</script>

<style>
    #grid > .k-grid-toolbar {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: 0.5rem;
        padding: 0.75rem;
    }

    #grid > .k-grid-toolbar > .k-toolbar-item:has(.custom-toolbar-rows) {
        flex: 1 0 100%;
        order: 1;
        width: 100%;
        border-top: 1px solid var(--kendo-color-border, #d9d9d9);
        margin-top: 0.25rem;
        padding-top: 0.75rem;
    }

    #grid > .k-grid-toolbar .custom-toolbar-rows {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 0.5rem;
        width: 100%;
    }

    #grid .custom-toolbar-heading {
        color: var(--kendo-color-subtle, #666);
        font-size: 0.875rem;
        font-weight: 600;
    }

    #grid .custom-toolbar-row {
        display: flex;
        align-items: center;
    }

    #grid .custom-toolbar-button {
        min-width: 10rem;
        padding-inline: 0.75rem;
    }

    @media (min-width: 40rem) {
        #grid > .k-grid-toolbar .custom-toolbar-rows {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        #grid .custom-toolbar-heading {
            grid-column: 1 / -1;
        }

        #grid .custom-toolbar-button {
            width: 100%;
        }
    }
</style>
```

## See Also

* [Grid Toolbar](slug:toolbar_kendoui_grid_widget)
* [Toolbar Templates](slug:toolbar_templates_kendoui_grid_component)
* [Grid `toolbar` configuration](/api/javascript/ui/grid/configuration/toolbar)
