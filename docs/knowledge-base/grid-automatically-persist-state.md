---
title: Automatically persist Grid state
description: Persist state of Grid on page close
type: how-to
page_title: Persit Grid state automatically | Kendo UI Grid
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

I would like to persist the sort, filter, group options automatically when the users leave the page. When they come back the Grid should look as it was left before closing the tab. 

## Solution

The state for the Grid is persisted in the [beforeunload event](https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload) handler. This way any operations performed by the users before leaving the page will be persisted. In order to restore the state you can use the [document.ready event](https://learn.jquery.com/using-jquery-core/document-ready/).

Furthermore the autoBind property for the Grid takes into account if there are already any persisted options. This prevents requesting the data multiple times.


````html
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

