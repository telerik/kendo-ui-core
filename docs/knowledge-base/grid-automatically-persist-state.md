---
title: Persist the State of the Grid Automatically
description: An example on how to persist the state of the Kendo UI Grid on page close.
type: how-to
page_title: Persist State Automatically | Kendo UI Grid for jQuery
slug: grid-automatically-persist-state
tags: grid, state, persisting, persist, automatic, leave, page, save, restore, changes, options, keep, recreate, retain, load
ticketid: 1138864
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>


## Description

How can I automatically persist the sort, filter, and group Grid options when the user leaves the page and keep the look of the Grid the same as the user closed the tab?

## Solution

The state of the Grid is persisted in the [`beforeunload`](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload) event handler. This way, any operation which the user performs before leaving the page is persisted. To restore the Grid state, use the [`document.ready`](https://learn.jquery.com/using-jquery-core/document-ready/) event.

The `autoBind` property of the Grid is able to detect any options that are already persisted, which prevents the multiple requests of data.

````dojo
<div id="grid"></div>

<script>
$(document).ready(function () {

    var options = localStorage["grid-options"];

    $("#grid").kendoGrid({
    // prevent requesting data multiple times if there are persisted options
        autoBind: !options,
        dataSource: {
            type: "odata",
            transport: {
            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
            },
            pageSize: 20
        },
        height: 550,
        groupable: true,
        sortable: true,
        reorderable: true,
        resizable: true,
        columnMenu: true,
        filterable: {
            mode: "row"
        },
        pageable: {
            refresh: true,
            pageSizes: true,
            buttonCount: 5
        },
        columns: [{
            field: "ContactName",
            title: "Contact Name",
            width: 250,
            locked: true
        }, {
            field: "ContactTitle",
            title: "Contact Title",
            width: 350
        }, {
            field: "CompanyName",
            title: "Company Name",
            width: 350
        }, {
            field: "Country",
            width: 450
        }]
    });

    var grid = $("#grid").data("kendoGrid");

    if (options) {
        grid.setOptions(JSON.parse(options));
    }

    window.onbeforeunload = function() {
        localStorage["grid-options"] = kendo.stringify(grid.getOptions());

        return;
    }
});
</script>
````
