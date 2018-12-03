---
title:  Ajax Binding
page_title: DropDownList | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn how to implement Ajax Binding with Kendo UI DropDownList HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_dropdownlist_ajaxbinding_aspnetcore
position: 1
---


# Ajax Binding

Below are listed the steps for you to follow when configuring the Kendo UI DropDownList for Ajax binding to the Northwind **Products** table using Linq to SQL.

1. Create an action method which renders the view.

    ###### Example

        public ActionResult Index()
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

1. Add an Ajax-bound DropDownList.

    ###### Example

        @(Html.Kendo().DropDownList()
            .Name("productDropDownList") //The name of the DropDownList is mandatory. It specifies the "id" attribute of the widget.
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
            .SelectedIndex(0) //Select the first item.
        )


> **Important**
>
> The `ToDataSourceResult()` extension method modifies the structure of the result and the widget is not able to bind to it. In this case, return a simple array of data.