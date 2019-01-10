---
title:  Server Binding
page_title: Server Binding | Kendo UI MultiSelect HtmlHelper for ASP.NET Core
description: "Learn how to implement server binding in the Kendo UI MultiSelect HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_multiselect_serverbinding_aspnetcore
position: 3
---

# Server Binding

Below are listed the steps for you to follow when configuring the Kendo UI MultiSelect for server binding to the Northwind **Products** table which uses Linq to SQL.

1. Create a new action method and pass the **Products** table as the model.

    ###### Example

        public IActionResult Index()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return View(northwind.Products);
        }

1. Make your view strongly typed.

    ###### Example

        @model IEnumerable<MvcApplication1.Models.Product>


1. Add a server bound MultiSelect.

    ###### Example

        @(Html.Kendo().MultiSelect()
            .Name("productDropDownList") //The name of the MultiSelect is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the MultiSelect as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the MultiSelect as a value.
            .BindTo(Model)   //Pass the list of Products to the MultiSelect.
        )

## See Also

* [JavaScript API Reference of the MultiSelect](http://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect)
* [MultiSelect HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/multiselect/overview)
* [MultiSelect Official Demos](http://demos.telerik.com/aspnet-core/multiselect/index)
