---
title: Customize Confirmation Window
page_title: Customize Confirmation Window
description: "An example on how to customize a confirmation dialog in the Telerik UI Grid for {{ site.framework }}."
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
  <td>Progress Telerik UI Grid for {{ site.framework }}</td>
 </tr>
  <tr>
  <td>Progress Тelerik UI version</td>
  <td>2021.3.1207</td>
 </tr>
</table>

## Description

How can I customize a confirmation dialog in the {{ site.product }} Grid?

## Solution

The following example demonstrates how to customize the default **Delete** confirmation alert box.

To achieve this behavior use the Window Component, a Kendo UI template and the `remove` dataSource method of the Grid:

    1. Add a custom Delete command to the Grid
    2. Define a Kendo Template to show customized message based on the dataItem being deleted
    3. In the handler of the custom command's click event initialize a Window and set its content
    4. Attach another click event to the confirmation button, then use the Grid's DataSource [remove method](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/remove) to delete the item


Refer to [this REPL sample](https://netcorerepl.telerik.com/cGuMPwON29unf7PH26) to review the behavior of the snippet below. 

```
    @(Html.Kendo().Window()
        .Name("window")
        .Title("Are you sure you want to delete this record?")
        .Visible(false)
        .Draggable()
        .Width(500)
        .Height(200)
    )
    <script type="text/x-kendo-template" id="windowTemplate">
        <p> Delete <strong>#= ProductName #</strong> ? </p>
        <p> We have #= UnitsInStock # units in stock. </p>
        <button class="k-button" id="yesButton">Yes</button>
        <button class="k-button" id="noButton"> No</button>
    </script>


    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()    
        .Name("Grid")    
        .Columns(columns => {        
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(140);
            columns.Bound(p => p.UnitsInStock).Width(140);
            columns.Bound(p => p.Discontinued).Width(100);
            columns.Command(command => {
                command.Edit();
                command.Custom("Delete").Click("onDelete");
            }).Width(110);
        })
        .ToolBar(toolbar => {
            toolbar.Create();
            toolbar.Save();        
        })
        .Editable(editable => editable.Mode(GridEditMode.InCell))
        .Pageable()
        .Navigatable()
        .Sortable()
        .Scrollable()
        .DataSource(dataSource => dataSource        
            .Custom()         
            .Batch(true)
            .PageSize(20)
            .Schema(schema => schema.Model(m => m.Id(p => p.ProductID)))
            .Transport(transport =>
            {
                transport.Read(read =>
                read.Url("https://demos.telerik.com/kendo-ui/service/products")
                    .DataType("jsonp")
                );
                transport.Create(create =>
                create.Url("https://demos.telerik.com/kendo-ui/service/products/create")
                        .DataType("jsonp")
                );
                transport.Update(update =>
                update.Url("https://demos.telerik.com/kendo-ui/service/products/update")
                        .DataType("jsonp")
                );
                transport.Destroy(destroy =>
                destroy.Url("https://demos.telerik.com/kendo-ui/service/products/destroy")
                        .DataType("jsonp")
                );
                transport.ParameterMap("parameterMap");
            })
        )
    )
    <script>
        var windowTemplate = kendo.template($("#windowTemplate").html());
        function parameterMap(options, operation) {
            if (operation !== "read" && options.models) {
                return { models: kendo.stringify(options.models) };
            }
        }
        function onDelete(e){
            //click event listener on the delete button
            e.preventDefault(); //prevent page scroll reset
            var tr = $(e.target).closest("tr"); //get the row for deletion
            var data = this.dataItem(tr); //get the row data so it can be referred later
            var window = $("#window").data("kendoWindow"); //get the client-side instance of the Window
            window.content(windowTemplate(data)); //send the row data object to the template and render it
            window.center().open();
            $("#yesButton").click(function(){
                var grid = $("#Grid").data("kendoGrid");
                grid.dataSource.remove(data)  //prepare a "destroy" request
                grid.dataSource.sync()  //actually send the request (might be ommited if the autoSync option is enabled in the dataSource)
                window.close();
            })
            $("#noButton").click(function(){
                window.close();
            })
        }           
    </script>
```

## See Also
* [Grid Custom data source (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/custom-datasource)
* [Window Basic Usage (Demo)](https://demos.telerik.com/{{ site.platform }}/window/basicusage)
* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
* [JavaScript API Reference of the Window](/api/javascript/ui/window)
