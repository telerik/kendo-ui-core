---
title: Select or Deselect All Rows with Select All Header Checkbox
page_title: Select or Deselect All Checkboxes - Kendo UI Grid for jQuery
description: "Learn how to select or deselect all rows in the Kendo UI Grid for jQuery with a Select All header checkbox."
previous_url: /controls/data-management/grid/how-to/Selection/select-deselect-all-checkbox
slug: howto_select_deselect_all_rowswith_checkboxes_grid
tags: select, deselect, all, grid, rows, with, selectall, header, checkbox
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
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

How can I select or deselect all rows on the current page of the Kendo UI Grid for jQuery with a **Select All** header checkbox?

## Solution

The following example demonstrates how to select or deselect all rows on the current page of the Grid by checking the **Select All** column header of the template checkbox. To select all checkboxes across all Grid pages, refer to the [dedicated KB scenario]({% slug checkbox-selection-select-all-rows-all-pages %}).

You can also select multiple rows by using the checkboxes and applying custom styling to the checkboxes.

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
                    headerTemplate: "<input type='checkbox' id='header-chb' class='k-checkbox k-checkbox-md k-rounded-md header-checkbox'>",
                    template: function (dataItem) {
                        return "<input type='checkbox' id='" + dataItem.ProductID + "' class='k-checkbox k-checkbox-md k-rounded-md row-checkbox'>";
                    },
                    width: 80,
                    attributes: {class: "k-text-center"},
                  	headerAttributes: {class: "k-text-center"},
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
                    if (!($(item).closest('tr').is('.k-selected'))) {
                        $(item).click();
                    }
                } else {
                    if ($(item).closest('tr').is('.k-selected')) {
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
            row.addClass("k-selected");

            var checkHeader = true;

            $.each(grid.items(), function (index, item) {
                if (!($(item).hasClass("k-selected"))) {
                    checkHeader = false;
                }
            });

            $("#header-chb")[0].checked = checkHeader;
        } else {
            //-remove selection
            row.removeClass("k-selected");
            $("#header-chb")[0].checked = false;
        }
    }

    //on dataBound event restore previous selected rows:
    function onDataBound(e) {
        var view = this.dataSource.view();
        for (var i = 0; i < view.length; i++) {
            if (checkedIds[view[i].id]) {
                this.tbody.find("tr[data-uid='" + view[i].uid + "']")
                    .addClass("k-selected")
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
