---
title: Sending Additional Form Data in the Grid
description: "Learn how to pass a serialized form when fetching data in the Telerik UI for {{ site.framework }} Grid."
type: how-to
page_title: Sending Additional Form Data in the Grid
slug: grid-send-form-data
tags: grid, form, read, fetch, send, additional, data, telerik, core, mvc
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.1.117 version</td>
 </tr>
</table>


## Description

How can I pass a serialized form as an additional parameter to my controller when fetching data in the Telerik UI for {{ site.framework }} Grid?

## Solution

To achieve the desired results:

1. Provide a function handler by using the [`Data()`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/CrudOperationBuilder#datasystemstring) configuration option for the `Read` method of the Grid.
1. To get the form field as key-value pairs, utilize the [`serializeArray()`](http://api.jquery.com/serializeArray/) within the handler.
1. Traverse through each of the fields, and alter them into your required format, which will then be displayed as a JSON object.
1. Map the external fields to the JSON object.
1. Pass the JSON object in the return statement of the handler.

```Index.cshtml
    // Form
    <form id="userForm">
        <label for="FirstName">First name:</label>
        <input type="text" id="FirstName" name="FirstName" value="John">
        <label for="LastName">Last name:</label>
        <input type="text" id="LastName" name="LastName" value="Doe">
    </form>

    // Grid
    @(Html.Kendo().Grid<OrderViewModel>()
                .Name("grid")
                .Columns(columns =>
                {
                    columns.Bound(p => p.OrderID).Filterable(false);
                    columns.Bound(p => p.Freight);
                    columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}");
                    columns.Bound(p => p.ShipName);
                    columns.Bound(p => p.ShipCity);
                })
                .Pageable()
                .Filterable()
                .HtmlAttributes(new { style = "height:550px;" })
                .DataSource(dataSource => dataSource
                    .Ajax()
                    .PageSize(20)
                    .Read(read => read.Action("Orders_Read", "Grid").Data("dataHandler"))
                )
    )
```
```Script.js
    <script>
        function dataHandler(e){
            var formArray = $("#userForm").serializeArray(); // Serialize the form data as an array.

            var form = {};
            for (var i = 0; i < formArray.length; i++) {
                form[formArray[i]['name']] = formArray[i]['value']; // Map the current key-value pairs into the form variable   object.
            }

            return {
                model: form // Return the JSON object.
            }
        }
    </script>
```
```Controller.cs
    public class GridController : Controller
    {
         public ActionResult Orders_Read([DataSourceRequest] DataSourceRequest request, UserModel model)
         {
             // Custom read logic.
             var result = GetData();
             return Json(result.ToDataSourceResult(request));
         }
    }
```
```Model.cs
    public class UserModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
```

## See Also

* [Client-Side API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid](https://docs.telerik.com/{{ site.platform }}/api/grid)