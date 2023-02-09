---
title: Hide Grid Columns When the Browser Width Is Too Small
description: "An example demonstrating how to hide the Grid columns in the detail template when the width of the browser is too small."
type: how-to
page_title: Collapse Other Rows on Row Expand - Kendo UI Grid for jQuery
slug: grid-browser-resize-hides-columns-in-detail-template
tags: grid, hierarchy, collapse, expand, hide, columns, column, detail, template
ticketid: 1358601
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with the 2021.3.914 version</td>
 </tr>
</table>

## Description

How can I hide the Grid columns inside the [`detailTemplate`](/api/javascript/ui/grid/configuration/detailtemplate) when the width of the browser window becomes too small?

## Solution

1. Define the thresholds at which each individual column will be hidden. Refer to the `getThresholds` function in the example below.
1. Set these thresholds to the Grid by using the [`columns.media`](/api/javascript/ui/grid/configuration/columns.media) configuration. Refer to the `setThresholds` function in the example below.
1. Attach handlers for the [`dataBound`](/api/javascript/ui/grid/events/databound), [`columnHide`](/api/javascript/ui/grid/events/columnhide), and [`columnShow`](/api/javascript/ui/grid/events/columnshow) events to the Grid. The `columnHide` and `columnShow` handlers are responsible for hiding and showing the columns inside the `detailTemplate`. The `dataBound` handler is responsible for initializing the `detailTemplate`.
1. Handle the `resize` event of the JavaScript `window` object. If the Grid doesn't have any hidden columns when the browser window is resized, collapse all detail rows.
1. Use `CSS` to conditionally display the hierarchy column.

The following example demonstrates the full implementation of the suggested approach. It is recommended that you run the demo in fullscreen&mdash;copy the code and paste it in a new [`dojo`](https://dojo.telerik.com/); then, click **Full screen**.

```dojo
    <div id="grid"></div>

    <script type="text/x-kendo-template" id="template">
    	<div class="detail-columns-wrapper">
      	<span class="hidden" data-field="Title">Title - #=data.Title#</span></br>
        <span class="hidden" data-field="City">City - #=data.City#</span></br>
        <span class="hidden" data-field="Country">Country - #=data.Country#</span></br>
        <span class="hidden" data-field="LastName">Last Name - #=data.LastName#</span></br>
      	<span class="hidden" data-field="FirstName">First Name - #=data.FirstName#</span>
      </div>
    </script>

    <script>
        // The initialWidth is used to calculate the thresholds at which each column will be hidden.
        let initialWidth = 1000;

        $(document).ready(function () {
            var grid = $("#grid").kendoGrid({
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees"
                    },
                    pageSize: 20,
                    serverPaging: true,
                    serverSorting: true
                },
                height: 550,
                sortable: true,
                pageable: false,
                dataBound: dataBoundHandler,
                detailTemplate: kendo.template($("#template").html()),
                columnHide: columnHideHandler,
                columnShow: columnShowHandler,
                columns: [
                    {
                        field: "FirstName",
                        title: "First Name",
                        width: 120
                    },
                    {
                        field: "LastName",
                        title: "Last Name",
                        width: 120
                    },
                    {
                        field: "Country",
                        width: 120
                    },
                    {
                        field: "City",
                        width: 120
                    },
                    {
                        field: "Title",
                        width: 220
                    }
                ]
            }).data("kendoGrid");

            let columns = grid.options.columns;
            let columnsCount = columns.length;

            let thresholds = getThresholds(columns, columnsCount, grid, initialWidth);
            setThresholds(columns, columnsCount, grid, thresholds);

            /* Collapse the rows if there are no hidden columns. */
            $(window).on("resize", function () {
                let windowWidth = $(this).width();

                if (windowWidth > 780) {
                    $(".k-master-row").each(function () {
                        grid.collapseRow(this);
                    });
                }
            });

        });

        function columnHideHandler(e) {
            $(".detail-columns-wrapper").find("[data-field='" + e.column.field + "']").removeClass("hidden");
        }

        function columnShowHandler(e) {
            $(".detail-columns-wrapper").find("[data-field='" + e.column.field + "']").addClass("hidden");
        }

        function dataBoundHandler(e) {
            let grid = this;
            // Initialize all of the detail templates.
            $(".k-master-row").each(function () {
                grid.expandRow(this);
                grid.collapseRow(this)
            });

            // If the Grid is already shrunken when the page loads, find the hidden columns.
            let hiddenColumns = grid.columns.filter(f => f.matchesMedia == false);

            // Remove the "hidden" class from the span elements that have their column counterparts hidden.
            hiddenColumns.forEach(function (x, i) {
                $(".k-detail-row").find("[data-field='" + x.field + "']").removeClass("hidden");
            });
        }

        function setThresholds(columns, count, grid, thresholds) {
            // Start from 1 so the first column is always visible.
            for (let i = 1; i < count; i++) {
                columns[i].media = "(min-width: " + thresholds[i] + "px)";
            }

            grid.setOptions({
                columns: columns
            });
        }

        function getThresholds(columns, count, grid, initialWidth) {
            let thresholds = [];
            let acc = 0;

            // Get the thresholds at which the columns will be hidden. Modify the calculations in any way you see fit.
            // In this case the thresholds are calculated with the following formula: 
            // initialWidth - (width of the last visible column) - (combined width of all already hidden columns.)
            for (let i = 0; i < count; i++) {
                let threshold = initialWidth - (columns[count - 1 - i].width) - acc;
                acc += (columns[count - 1 - i].width);

                thresholds.push(threshold);
            }

            thresholds.reverse();

            return thresholds;
        }
    </script>

    <style>
        /* Used to remove the empty space when a column is removed. */
        #grid table {
            min-width: 100%;
        }

        .hidden {
            display: none;
        }

        /* Hide the hierarchy column. */
        colgroup col:nth-child(1) {
            width: 0px !important;
        }

        .k-i-expand {
            display: none !important;
        }

        /* Display the hierarchy column when the width of the browser window becomes less than 780px. */
        /* 780px is the initialWidth(1000px) - the width of the last column(220px)  */
        @media (max-width: 780px) {
            colgroup col:nth-child(1) {
                width: 32px !important;
            }

            .k-i-expand {
                display: block !important;
            }
        }
    </style>
```
