---
title: Customize Confirmation Window
page_title: Customize Confirmation Window | Kendo UI Grid for jQuery
description: "An example on how to customize a confirmation dialog in the Kendo UI Grid for jQuery."
previous_url: /web/grid/how-to/Editing/grid-custom-delete-confirmation-window, /controls/data-management/grid/how-to/Editing/custom-delete-confirmation-dialog
slug: howto_customize_delete_confirmation_dialog_grid
tags: grid, customize, confirmation, window
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I customize a confirmation dialog in the Kendo UI Grid for jQuery?

## Solution

The following example demonstrates how to customize the default **Delete** confirmation alert box.

To achieve this behavior, use the Kendo UI templates, the Window, and the `remove` dataSource method of Grid.

```dojo
<div id="grid"></div>
<div id="window"></div>

<script type="text/x-kendo-template" id="windowTemplate">
    <p> Delete <strong>#= ProductName #</strong> ? </p>
    <p> We have #= UnitsInStock # units in stock. </p>
    <button class="k-button" id="yesButton">Yes</button>
    <button class="k-button" id="noButton"> No</button>
</script>

<script>
    $(document).ready(function () {
        var windowTemplate = kendo.template($("#windowTemplate").html());
        var crudServiceBaseUrl = "https://demos.telerik.com/kendo-ui/service",
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
                        e.preventDefault(); //prevent page scroll reset
                        var tr = $(e.target).closest("tr"); //get the row for deletion
                        var data = this.dataItem(tr); //get the row data so it can be referred later
                        window.content(windowTemplate(data)); //send the row data object to the template and render it
                        window.center().open();

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

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
