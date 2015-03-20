---
title: Customize the delete confirmation dialog
page_title: Customize the delete confirmation dialog
description: Kendo UI Grid example that demonstrates how to customize the delete confirmation dialog using Kendo UI templates, Kendo UI Window widget and the remove method of the Grid's dataSource.
---

# Customize the delete confirmation dialog of Kendo UI Grid

The following example demonstrates how customize the delete 

#### Example:

```html
<div id="grid"></div>
<div id="window"></div>

<script type="text/x-kendo-template" id="windowTemplate">
    Delete <strong>#= ProductName #</strong> ? </p> 
    We have #= UnitsInStock # units in stock. </p> 
    <button class="k-button" id="yesButton">Yes</button>
    <button class="k-button" id="noButton"> No</button>
</script>

<script>
    $(document).ready(function () {
        var windowTemplate = kendo.template($("#windowTemplate").html());
        var crudServiceBaseUrl = "http://demos.kendoui.com/service",
        dataSource = new kendo.data.DataSource({
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
            }
        });

        var window = $("#window").kendoWindow({
            title: "Are you sure you want to delete this record?",
            visible: false, //the window will not appear before its .open method is called
            width: "400px",
            height: "200px",
        }).data("kendoWindow");


        var grid = $("#grid").kendoGrid({
            dataSource: dataSource,
            pageable: true,
            height: 430,
            toolbar: ["create"],
            columns: [
            "ProductName",
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}"},
            { field: "UnitsInStock", title:"Units In Stock"},
            { field: "Discontinued"},
            { command: [
                {name: "edit"},
                {name: "Delete",  
                    click: function(e){  //add a click event listener on the delete button
                        var tr = $(e.target).closest("tr"); //get the row for deletion
                        var data = this.dataItem(tr); //get the row data so it can be referred later
                        window.content(windowTemplate(data)); //send the row data object to the template and render it
                        window.open().center();  

                        $("#yesButton").click(function(){
                            grid.dataSource.remove(data)  //prepare a "destroy" request 
                            grid.dataSource.sync()  //actually send the request (might be ommited if the autoSync option is enabled in the dataSource)
                            window.close();
                        })
                        $("#noButton").click(function(){
                            window.close();
                        })
                    }                              
                }
                ]}],
            editable: {
                mode: "inline"
            }
        }).data("kendoGrid");
    });
</script>
```
