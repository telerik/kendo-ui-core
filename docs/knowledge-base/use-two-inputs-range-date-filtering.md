---
title: Use Grid Filtering with Kendo UI DateTimePickers in Row Modes
page_title: Range Date Filtering | Kendo UI Grid for jQuery
description: "An example on how to create range filtering for dates in the Kendo UI Grid for jQuery by using two Kendo UI DateTimePickers in row filtering modes."
previous_url: /controls/data-management/grid/how-to/use-two-inputs-range-date-filtering, /controls/data-management/grid/how-to/filtering/use-two-inputs-range-date-filtering
slug: howto_gridfiltering_rangedatefiltering_grid
tags: use, grid, range, data, filtering, datetimepickers, row, modes
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can I create range filtering for dates in the Kendo UI Grid for jQuery by using two Kendo UI DateTimePickers in row filtering modes?

## Solution

Your project might require you to create range filtering for dates in the Grid by using two Kendo UI DateTimePickers in row filtering modes.

To see how the following example works, filter the date column in a range. As a result, the Grid filters the data in the given range.

```dojo
<script src="https://demos.telerik.com/kendo-ui/content/shared/js/people.js"></script>

<div id="example">
    <div id="grid"></div>

    <script>
        $(document).ready(function () {
            $("#grid").kendoGrid({
                dataSource: {
                    data: createRandomData(50),
                    schema: {
                        model: {
                            fields: {
                                City: { type: "string" },
                                Title: { type: "string" },
                                BirthDate: { type: "date" }
                            }
                        }
                    },
                    pageSize: 15
                },
                height: 550,
                scrollable: true,
                filterable: {
                    extra: false,
                    mode: "row"
                },
                pageable: true,
                columns: [
                    {
                        title: "Name",
                        template: "#=FirstName# #=LastName#"
                    },
                    {
                        field: "BirthDate",
                        title: "Birth Date",
                        format: "{0:MM/dd/yyyy}",
                        filterable: {
                            cell: { template: betweenFilter }

                        }
                    },
                    {
                        field: "City",
                        filterable: {
                            cell: { template: cityFilter }

                        }
                    }
                ]
            });
        });

        function cityFilter(args) {
            args.element.kendoDropDownList({
                dataSource: cities,
                optionLabel: "--Select Value--"
            });
        }
        function betweenFilter(args) {
            var filterCell = args.element.parents(".k-filtercell");

            filterCell.empty();
            filterCell.html('<span style="display:flex; justify-content:center;"><span>From:</span><input  class="start-date"/><span>To:</span><input  class="end-date"/></span>');

            $(".start-date", filterCell).kendoDatePicker({
                change: function (e) {
                    var startDate = e.sender.value(),
                        endDate = $("input.end-date", filterCell).data("kendoDatePicker").value(),
                        dataSource = $("#grid").data("kendoGrid").dataSource;

                    if (startDate & endDate) {
                        var filter = { logic: "and", filters: [] };
                        filter.filters.push({ field: "BirthDate", operator: "gte", value: startDate });
                        filter.filters.push({ field: "BirthDate", operator: "lte", value: endDate });
                        dataSource.filter(filter);
                    }
                }
            });
            $(".end-date", filterCell).kendoDatePicker({
                change: function (e) {
                    var startDate = $("input.start-date", filterCell).data("kendoDatePicker").value(),
                        endDate = e.sender.value(),
                        dataSource = $("#grid").data("kendoGrid").dataSource;

                    if (startDate & endDate) {
                        var filter = { logic: "and", filters: [] };
                        filter.filters.push({ field: "BirthDate", operator: "gte", value: startDate });
                        filter.filters.push({ field: "BirthDate", operator: "lte", value: endDate });
                        dataSource.filter(filter);
                    }
                }
            });

        }
    </script>
</div>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
