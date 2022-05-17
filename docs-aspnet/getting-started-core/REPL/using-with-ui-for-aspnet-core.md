---
title: Using Telerik REPL with UI for ASP.NET Core
page_title: Using Telerik REPL with UI for ASP.NET Core
description: Explore the features of the Telerik REPL server playground tool and the integration with the UI for ASP.NET Core demos.
slug: using_repl_with_demos_aspnetcore
permalink: /getting-started/repl/integration-with-demos
position: 3
---

# Using Telerik REPL with UI for ASP.NET Core

The Telerik REPL for ASP.NET Core is integrated with the {{site.product}} Demos and allows you to open and edit them. The models used in the demos are included and you can use them to bind the components to data.

## Running an Existing Telerik UI for ASP.NET Core Demo in the Telerik REPL

To run a demo in the Telerik REPL navigate to the **[{{site.product}} Demos website](https://demos.telerik.com/aspnet-core/)** > **Select the desired demo** > **Click on the Edit in Telerik REPL button**

   ![Run Demo](../../getting-started-core/repl/images/repl-run-demo.png)

## Using Predefined Models

Using Telerik REPL is simple and creating an example requires just a few steps.

The Telerik REPL provides [predefined models]({% slug using_predefined_models_repl_aspnetcore %}) and controllers available in the Telerik UI for ASP.NET Core demos. If you need to test a local binding scenario with your own data, you can use the available models to generate data using the approach demonstrated in the examples below:

```Grid
    @using Kendo.Mvc.Examples.Models
    @{
        var data = Enumerable.Range(1,30).Select(x=>new ProductViewModel()
        {
            ProductID = x,
            ProductName = "Product " + x,
            UnitPrice = x *10,
            UnitsInStock = x % 3,
            Discontinued = x % 2 == 0 ? true : false
        });
    }

    @(Html.Kendo().Grid(data)
        .Name("Grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName).Title("Product Name");
            columns.Bound(p => p.UnitPrice).Title("Unit Price").Width(130);
            columns.Bound(p => p.UnitsInStock).Title("Units In Stock").Width(130);
            columns.Bound(p => p.Discontinued).Width(130);
        })
        .Pageable()
        .Sortable()
        .Scrollable(scr=>scr.Height(250)) 
        .Filterable()    
        .DataSource(dataSource => dataSource        
            .Ajax()
            .PageSize(10)
            .ServerOperation(false)        
        )
    )
```
```ListBox
    @{
        var attendees = new List<SelectListItem>
        {
            new SelectListItem(){ Value = "1", Text = "Steven White" },
            new SelectListItem(){ Value = "2", Text = "Nancy King" },
            new SelectListItem(){ Value = "3", Text = "Nancy Davolio" },
            new SelectListItem(){ Value = "4", Text = "Michael Leverling" },
            new SelectListItem(){ Value = "5", Text = "Andrew Callahan" },
            new SelectListItem(){ Value = "6", Text = "Michael Suyama" },
        };
    }

    @(Html.Kendo().ListBox()
        .Name("optional")
        .Toolbar(toolbar =>
        {
            toolbar.Position(ListBoxToolbarPosition.Right);
            toolbar.Tools(tools => tools
                .MoveUp()
                .MoveDown()
                .TransferTo()
                .TransferFrom()
                .TransferAllTo()
                .TransferAllFrom()
                .Remove()
            );
        })
        .ConnectWith("selected")
        .BindTo(attendees)
    )

    @(Html.Kendo().ListBox()
        .Name("selected")
        .BindTo(new List<SelectListItem>())
        .Selectable(ListBoxSelectable.Multiple)
    )

    <style>
        .k-listbox {
                width: 230px;
                height: 350px;
            }
    </style>
```
