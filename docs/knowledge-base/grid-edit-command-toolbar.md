---
title: Place Edit or Update Buttons to Grid Toolbar
description: Learn how to use the toolbar template with the edit and update commands in the Kendo UI Grid.
type: how-to
page_title: Implement the Edit or Update Commands in the Toolbar - Kendo UI for jQuery Data Grid
slug: grid-edit-command-toolbar
tags: grid, toolbar, edit, update, command, template, custom, replace, move,
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2020.3.1021</td>
 </tr>
</table>

## Description

How can I limit the number of columns in the Grid and move the **Edit** and **Update** buttons to the toolbar to save space?

## Solution

1. Enable selection for the Grid.
1. Define a toolbar template that will hold all custom buttons used for editing.
1. Handle the click event for the buttons to enter/exit edit mode.

````dojo
<style>
    .updateCancelContainer {
        display: none;
    }
</style>

<div id="grid"></div>

<script type="text/x-kendo-template" id="template">
    <div class="editBtnContainer">
         <button type="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-custom">Edit</button>          

    </div>
    <div class="updateCancelContainer">
    		<a role="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-save-command" href="\\#"> 
        <span class="k-icon k-i-check k-button-icon"></span>Update</a>
        <a role="button" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-cancel-command" href="\\#">
        <span class="k-icon k-i-cancel k-button-icon"></span>Cancel</a>
    </div>
</script>

<script>
    $(document).ready(function () {
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core",
            dataSource = new kendo.data.DataSource({
                transport: {
                    read:  {
                        url: crudServiceBaseUrl + "/Products"
                    },
                    update: {
                        url: crudServiceBaseUrl + "/Products/Update",
                        type: "POST",
                        contentType: "application/json"
                    },
                    destroy: {
                        url: crudServiceBaseUrl + "/Products/Destroy",
                        type: "POST",
                        contentType: "application/json"
                    },
                    create: {
                        url: crudServiceBaseUrl + "/Products/Create",
                        type: "POST",
                        contentType: "application/json"
                    },
                    parameterMap: function(options, operation) {
                        if (operation !== "read" && options.models) {
                            return kendo.stringify(options.models);
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
            toolbar: kendo.template($("#template").html()),
            selectable: "single",
            columns: [
                "ProductName",
                { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
                { field: "UnitsInStock", title: "Units In Stock", width: "120px" },
                { field: "Discontinued", width: "120px" },
            ],
            editable: "inline"
        });

        $(".k-grid-custom.k-button").on("click", function (e) {
            e.preventDefault();
            var grid = $("#grid").getKendoGrid();
            var selectedRow = grid.select()[0];
            if (selectedRow) {
                grid.editRow(selectedRow);

                $(".editBtnContainer, .updateCancelContainer").toggle();
            }
        });

        $(".k-grid-save-command").on("click", function (e) {
            e.preventDefault();
            var grid = $("#grid").getKendoGrid();
            grid.dataSource.sync();
            $(".editBtnContainer, .updateCancelContainer").toggle();
        });

        $(".k-grid-cancel-command").on("click", function (e) {
            e.preventDefault();
            var grid = $("#grid").getKendoGrid();
            grid.cancelChanges();
            $(".editBtnContainer, .updateCancelContainer").toggle();
        });

    });
</script>
````
