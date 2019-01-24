---
title: Select or Deselect All Rows with Select All Header Checkbox
page_title: jQuery Grid Documentation | Select or Deselect All Checkboxes | Kendo UI
description: "Get started with the jQuery Grid by Kendo UI and learn how to select or deselect all rows with a Select All header checkbox."
slug: howto_select_deselect_all_rowswith_checkboxes_grid
---

# Select or Deselect All Rows with Select All Header Checkbox

The following example demonstrates how to select or deselect all rows in a Grid by checking the **Select All** column header of the template checkbox.

You can also select multiple rows by using the checkboxes and apply custom styling of the checkboxes.

###### Example

```dojo
<div id="grid"></div>
<button id="showSelection">Show selected IDs</button>
<script>
    $(document).ready(function () {
        //DataSource definition
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
            dataSource = new kendo.data.DataSource({
                transport: {
                    read: {
                        url: crudServiceBaseUrl + "/Products",
                        dataType: "jsonp"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/Products/Update",
                        dataType: "jsonp"
                    },
                    destroy: {
                        url: crudServiceBaseUrl + "/Products/Destroy",
                        dataType: "jsonp"
                    },
                    create: {
                        url: crudServiceBaseUrl + "/Products/Create",
                        dataType: "jsonp"
                    },
                    parameterMap: function (options, operation) {
                        if (operation !== "read" && options.models) {
                            return {
                                models: kendo.stringify(options.models)
                            };
                        }
                    }
                },
                batch: true,
                pageSize: 20,
                schema: {
                    model: {
                        id: "ProductID",
                        fields: {
                            ProductID: {
                                editable: false,
                                nullable: true
                            },
                            ProductName: {
                                validation: {
                                    required: true
                                }
                            },
                            UnitPrice: {
                                type: "number",
                                validation: {
                                    required: true,
                                    min: 1
                                }
                            },
                            Discontinued: {
                                type: "boolean"
                            },
                            UnitsInStock: {
                                type: "number",
                                validation: {
                                    min: 0,
                                    required: true
                                }
                            }
                        }
                    }
                }
            });

        //Grid definition
        var grid = $("#grid").kendoGrid({
            dataSource: dataSource,
            pageable: true,
            height: 430,
            //define dataBound event handler
            dataBound: onDataBound,
            toolbar: ["create"],
            columns: [
                //define template column with checkbox and attach click event handler
                {
                    title: 'Select All',
                    headerTemplate: "<input type='checkbox' id='header-chb' class='k-checkbox header-checkbox'><label class='k-checkbox-label' for='header-chb'></label>",
                    template: function (dataItem) {
                        return "<input type='checkbox' id='" + dataItem.ProductID + "' class='k-checkbox row-checkbox'><label class='k-checkbox-label' for='" + dataItem.ProductID + "'></label>";
                    },
                    width: 80
                },
                "ProductName", {
                    field: "UnitPrice",
                    title: "Unit Price",
                    format: "{0:c}",
                    width: "100px"
                }, {
                    field: "UnitsInStock",
                    title: "Units In Stock",
                    width: "100px"
                }, {
                    field: "Discontinued",
                    width: "100px"
                }, {
                    command: ["edit", "destroy"],
                    title: "&nbsp;",
                    width: "172px"
                }
            ],
            editable: "inline"
        }).data("kendoGrid");

        //bind click event to the checkbox
        grid.table.on("click", ".row-checkbox", selectRow);

        $('#header-chb').change(function (ev) {
            var checked = ev.target.checked;
            $('.row-checkbox').each(function (idx, item) {
                if (checked) {
                    if (!($(item).closest('tr').is('.k-state-selected'))) {
                        $(item).click();
                    }
                } else {
                    if ($(item).closest('tr').is('.k-state-selected')) {
                        $(item).click();
                    }
                }
            });
        });

        $("#showSelection").bind("click", function () {
            var checked = [];
            for (var i in checkedIds) {
                if (checkedIds[i]) {
                    checked.push(i);
                }
            }

            alert(checked);
        });
    });

    var checkedIds = {};

    //on click of the checkbox:
    function selectRow() {
        var checked = this.checked,
            row = $(this).closest("tr"),
            grid = $("#grid").data("kendoGrid"),
            dataItem = grid.dataItem(row);

        checkedIds[dataItem.id] = checked;

        if (checked) {
            //-select the row
            row.addClass("k-state-selected");

            var checkHeader = true;

            $.each(grid.items(), function (index, item) {
                if (!($(item).hasClass("k-state-selected"))) {
                    checkHeader = false;
                }
            });

            $("#header-chb")[0].checked = checkHeader;
        } else {
            //-remove selection
            row.removeClass("k-state-selected");
            $("#header-chb")[0].checked = false;
        }
    }

    //on dataBound event restore previous selected rows:
    function onDataBound(e) {
        var view = this.dataSource.view();
        for (var i = 0; i < view.length; i++) {
            if (checkedIds[view[i].id]) {
                this.tbody.find("tr[data-uid='" + view[i].uid + "']")
                    .addClass("k-state-selected")
                    .find(".k-checkbox")
                    .attr("checked", "checked");
            }
        }
    }
</script>
</body>
```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [How to Make Selection with Checkbox Column]({% slug howto_make_selection_checkbox_column_grid %})
* [How to Persist Row Selection while Paging, Sorting, and Filtering]({% slug howto_persist_row_selection_paging_sorting_filtering_grid %})
* [How to Prevent Selection for Checkbox Cells]({% slug howto_prevent_selection_checkbox_cells_grid %})

For more runnable examples on the Kendo UI Grid, browse its [**How To** documentation folder]({% slug howto_adjust_row_heights_template_locked_columns_grid %}).
