---
title: Edit Records Using External Forms
page_title: Editing Records via External Forms | Kendo UI Grid for jQuery
description: "An example on how to edit records through an external form in the Kendo UI Grid widget for jQuery."
previous_url: /controls/data-management/grid/how-to/Editing/grid-external-form-editing
slug: howto_edit_records_using_external_forms_grid
tags: grid, records, external, forms
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

How can I configure the editing functionality of the Grid by using a custom UI form?

## Solution

The following example demonstrates how to achieve this behavior, create editors for the `string`, `number`, and `boolean` fields, and add validation.

```dojo
<div id="grid"></div>
<div id="editForm">
    <h2>Edit Form</h2>
    <ul>
        <li>
            <label for="ProductName">ProductName</label>
            <input type="text" class="k-textbox" name="ProductName" data-bind="value: selected.ProductName" required />
        </li>
        <li>
            <label for="UnitPrice">UnitPrice</label>
            <input data-role="numerictextbox" name="UnitPrice" data-bind="value: selected.UnitPrice" required min="1" />
            <span class="k-invalid-msg" data-for="UnitPrice"></span>
        </li>
        <li>
            <label for="UnitsInStock">UnitsInStock</label>
            <input data-role="numerictextbox" name="UnitsInStock" data-bind="value: selected.UnitsInStock" required min="0" />
            <span class="k-invalid-msg" data-for="UnitsInStock"></span>
        </li>
        <li>
            <label for="Discontinued"></label>
            <input type="checkbox" name="Discontinued" data-bind="checked: selected.Discontinued" />
            <span>Items is discontinued</span>
        </li>
        <li class="buttons">
            <button class="k-button btnSave" data-bind="events: { click: sync }">Save</button>
            <button class="k-button btnCancel" data-bind="events: { click: cancel }">Cancel</button>
        </li>
    </ul>
</div>
<script>
    var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service";
    var validator;
    var viewModel = kendo.observable({
        dataSource: new kendo.data.DataSource({
            transport: {
                read:  {
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
                parameterMap: function(options, operation) {
                    if (operation !== "read" && options.models) {
                        return {models: kendo.stringify(options.models)};
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
                        UnitPrice: { type: "number", validation: { required: true, min: 1} },
                        Discontinued: { type: "boolean" },
                        UnitsInStock: { type: "number", validation: { min: 0, required: true } }
                    }
                }
            },
            change: function () {
                viewModel.set("hasChanges", this.hasChanges());
            }
        }),
        selected: {},
        hasChanges: false,
        sync: function () {
            if(validator.validate()) {
                this.dataSource.sync();
            }
        },
        cancel: function () {
            this.dataSource.cancelChanges();
            validator.hideMessages();
        }
    });

    kendo.bind($("#editForm"), viewModel);
    validator = $("#editForm").kendoValidator().data("kendoValidator");

    var grid = $("#grid").kendoGrid({
        dataSource: viewModel.dataSource,
        pageable: true,
        height: 430,
        columns: [
            "ProductName",
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 110 },
            { field: "UnitsInStock", title: "Units In Stock", width: 110 },
            { field: "Discontinued", width: 110 }
        ],
        selectable: true,
        dataBound: function(e) {
            var row = this.tbody.find(">tr[data-uid=" + viewModel.selected.uid + "]");
            if(row) {
                this.select(row);
            }
        },
        change: function (e) {
            var model = this.dataItem(this.select());
            validator.hideMessages();
            viewModel.set("selected", model);
        }
    }).data("kendoGrid");

    $("#grid").data("kendoGrid").one("dataBound", function (e) {
        this.select(this.tbody.find(">tr:first"));
    });

</script>

<style scoped>
    #grid {
        width: 700px;
        float: left;
    }
    #editForm {
        width: 600px;
        margin: 20px;
        padding: 20px;
        float: left;
        border: 1px solid #c5c5c5;
        border-radius: 10px;
        font-size: 80%;
    }
    #editForm h2 {
        border-bottom: 1px solid #ccc;
        font-size: 1.4em;
        font-weight: normal;
        padding: 0;
        margin: 0;
    }
    #editForm ul {
        list-style-type: none;
    }
    #editForm ul li {
        margin: 10px;
    }
    #editForm ul label {
        font-weight: bold;
        display: inline-block;
        width: 90px;
        text-align: right;
    }
    #editForm label {
        display: block;
        margin-bottom: 10px;
    }
    #editForm .buttons {
        margin-top: 25px;
    }
    #editForm .k-button {
        width: 100px;
    }
</style>
```
