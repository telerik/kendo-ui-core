---
title: Place Edit/Update buttons to Grid toolbar
description: Example on how to use toolbar template with edit and update commands
type: how-to
page_title: Edit/Update commands in toolbar | Kendo UI Grid
slug: grid-edit-command-toolbar
tags: grid, toolbar, edit, update, command, template, custom, replace, move, 
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with version 2017.3.1026</td>
 </tr>
</table>

## Description

I want to limit the number of columns in the Grid. To save space I want to move the Edit and Update buttons to the Grid toolbar. 

## Solution

1. Enable selection for the Grid.
1. Define a toolbar template that will hold all custom buttons used for editing. 
1. Handle the click event for the buttons to enter/exit edit mode. 

````html
<style>
    .updateCancelContainer {
        display: none;
    }
</style>

<div id="grid"></div>

<script type="text/x-kendo-template" id="template">
    <div class="editBtnContainer">
        <a href="\\#" class="k-button k-button-icontext k-grid-custom" title="Edit">Edit</a>
    </div>
    <div class="updateCancelContainer">
        <a role="button" class="k-button k-button-icontext k-grid-update" href="\\#">
        <span class="k-icon k-i-check"></span>Update</a>
        <a role="button" class="k-button k-button-icontext k-grid-cancel" href="\\#">
        <span class="k-icon k-i-cancel"></span>Cancel</a>
    </div>
</script>

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
            toolbar: kendo.template($("#template").html()),
            selectable: "single",
            columns: [
                "ProductName",
                { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: "120px" },
                { field: "UnitsInStock", title: "Units In Stock", width: "120px" },
                { field: "Discontinued", width: "120px", editor: customBoolEditor },
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

        $(".k-grid-update").on("click", function (e) {
            e.preventDefault();
            var grid = $("#grid").getKendoGrid();
            grid.dataSource.sync();
            $(".editBtnContainer, .updateCancelContainer").toggle();
        });

        $(".k-grid-cancel").on("click", function (e) {
            e.preventDefault();
            var grid = $("#grid").getKendoGrid();
            grid.cancelChanges();
            $(".editBtnContainer, .updateCancelContainer").toggle();
        });

    });

    function customBoolEditor(container, options) {
        var guid = kendo.guid();
        $('<input class="k-checkbox" id="' + guid + '" type="checkbox" name="Discontinued" data-type="boolean" data-bind="checked:Discontinued">').appendTo(container);
        $('<label class="k-checkbox-label" for="' + guid + '">​</label>').appendTo(container);
    }
</script>
````
