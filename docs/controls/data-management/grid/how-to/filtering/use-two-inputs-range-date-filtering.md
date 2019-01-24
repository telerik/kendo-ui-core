---
title: Use Grid Filtering with Kendo UI DateTimePickers in Row Modes
page_title: jQuery Grid Documentation | Range Date Filtering | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to create range filtering for dates by using two Kendo UI DateTimePickers in row filtering modes."
previous_url: /controls/data-management/grid/how-to/use-two-inputs-range-date-filtering
slug: howto_gridfiltering_rangedatefiltering_grid
---

# Use Grid Filtering with Kendo UI DateTimePickers in Row Modes

Your project might require you to create range filtering for dates in the Grid by using two Kendo UI DateTimePickers in row filtering modes.

To see how the following example works, filter the date column in a range. As a result, the Grid filters the data in the given range.

###### Example

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
* [How to Add Cascading DropDownList Editors]({% slug howto_add_cascading_dropdown_list_editors_grid %})
* [How to Copy Data from Excel]({% slug howto_copy_datafrom_excel_grid %})
* [How to Drag and Drop Rows between Grids]({% slug howto_dragand_drop_rows_between_twogrids_grid %})
* [How to Enable ForeignKey Column Sorting by Text]({% slug howto_enable_foreignkey_sotringby_text_grid %})
* [How to Implement Stable Sort in Chrome]({% slug howto_implement_stable_sortin_chrome_grid %})
* [How to Initialize Data Attribute with Detail Template]({% slug howto_initialize_data_attributewith_detail_template_grid %})
* [How to Load and Append More Records While Scrolling Down]({% slug howto_loadand_append_morerecords_while_scrollingdown_grid %})
* [How to Perform CRUD Operations with Local Storage Data]({% slug howto_perform_crud_operationswith_local_storage_data_grid %})
* [How to Persist Expanded Rows after Refresh]({% slug howto_persist_expanded_rows_afetrrefresh_grid %})
* [How to Set Cell Color Based on ForeignKey Values]({% slug howto_set_cell_color_basedon_foreignkey_values_grid %})
* [How to Show Tooltip for Column Records]({% slug howto_show_tooltipfor_column_records_grid %})
* [How to Update Toolbar Content Using MVVM Binding]({% slug howto_update_toolbar_content_using_mvvmbinding_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
