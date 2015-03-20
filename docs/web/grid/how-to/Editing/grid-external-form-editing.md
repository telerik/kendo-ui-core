---
title: Edit records using an external form
page_title: Edit records using an external form
description: Kendo UI Grid example that demonstrates how to edit Grid records using an external form
---

# Edit Kendo UI Grid records using an external form

This example demonstrates how to configure editing with custom UI form, create editors for `string`, `number` and `boolean` field and add validation.

#### Example

```html
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
    var crudServiceBaseUrl = "http://demos.kendoui.com/service";
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

## Related resources:

- [Observable Object](http://docs.telerik.com/kendo-ui/framework/mvvm/observableobject)
- [MVVM value binding](http://docs.telerik.com/kendo-ui/framework/mvvm/bindings/value)
- [Kendo Validator](http://docs.telerik.com/kendo-ui/framework/validator/overview)
- [Data Source methods](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods)
