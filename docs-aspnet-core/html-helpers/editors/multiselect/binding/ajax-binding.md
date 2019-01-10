---
title:  Ajax Binding
page_title: Ajax Binding | Kendo UI MultiSelect HtmlHelper for ASP.NET Core
description: "Learn how to implement Ajax Binding with Kendo UI MultiSelect HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_multiselect_ajaxbinding_aspnetcore
position: 2
---

# Ajax Binding

Below are listed the steps for you to follow when configuring the Kendo UI MultiSelect for Ajax binding to the Northwind **Products** table which uses Linq to SQL.

> **Important**
>
> The `ToDataSourceResult()` extension method modifies the structure of the result and the widget is not able to bind to it. In this case, return a simple array of data.

1. Create an action method which renders the view.

    ###### Example

        public IActionResult Index()
        {
            return View();
        }

1. Create a new action method and pass the **Products** table as JSON result.

    ###### Example

        public JsonResult GetProducts()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return Json(northwind.Products, JsonRequestBehavior.AllowGet);
        }

1. Add an Ajax-bound MultiSelect.

    ###### Example

        @(Html.Kendo().MultiSelect()
            .Name("productMultiSelect") //The name of the MultiSelect is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the DropDownList as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the DropDownList as a value.
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("GetProducts", "Home"); //Set the Action and Controller names.
                })
                .ServerFiltering(true); //If true, the DataSource will not filter the data on the client.
            })
        )

## See Also

* [JavaScript API Reference of the MultiSelect](http://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect)
* [MultiSelect HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/multiselect/overview)
* [MultiSelect Official Demos](http://demos.telerik.com/aspnet-core/multiselect/index)
