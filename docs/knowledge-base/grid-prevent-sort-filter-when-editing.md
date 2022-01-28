---
title: Prevent Sorting and Filtering While Grid Is in Edit Mode
description: An example on how to prevent the filter and sort operations in the Kendo UI Grid when an item is created or edited.
type: how-to
page_title: Prevent Sorting and Filtering While Editing | Kendo UI Grid for jQuery
slug: grid-prevent-sort-filter-when-editing
tags: grid, prevent, sort, filter, edit, create, insert
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

How can I disable sorting and filtering for a Grid with inline editing while the users are editing or creating a record?

## Solution

Handle the `mousedown` event for the Grid header. In the handler, check if an edited Grid row exists and cancel the action if necessary.

````dojo
<div id="grid"></div>

<script>
    $(document).ready(function () {
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
                            return { models: kendo.stringify(options.models) };
                        }
                    }
                },
                batch: true,
                pageSize: 20,
                schema: {
                    model: {
                        id: "ProductID",
                        fields: {
                            ProductID: { editable: false, nullable: true },
                            ProductName: { validation: { required: true } },
                            UnitPrice: { type: "number", validation: { required: true, min: 1 } },
                            Discontinued: { type: "boolean" },
                            UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                        }
                    }
                }
            });

        $("#grid").kendoGrid({
            dataSource: dataSource,
            pageable: true,
            height: 550,
            toolbar: ["create"],
            sortable: true,
            filterable: true,
            columns: [
                "ProductName",
                { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
                { field: "UnitsInStock", title: "Units In Stock", width: "120px" },
                { field: "Discontinued", width: "120px" },
                { command: ["edit", "destroy"], title: "&nbsp;", width: "250px" }],
            editable: "inline"
        });

        $(".k-grid").on("mousedown", ".k-grid-header th", function (e) {
            // prevent sorting/filtering for the current Grid only
            var grid = $(this).closest(".k-grid");
            var editRow = grid.find(".k-grid-edit-row");

            // prevent sorting/filtering while any Grid is being edited
            //var editRow = $(".k-grid-edit-row");

            if (editRow.length > 0) {
                alert("Please complete the editing operation before sorting or filtering");
                e.preventDefault();
            }
        });
    });
</script>
````
