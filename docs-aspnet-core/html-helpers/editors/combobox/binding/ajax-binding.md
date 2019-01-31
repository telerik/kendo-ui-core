---
title: Ajax Binding
page_title: Ajax Binding | Kendo UI ComboBox HtmlHelper for ASP.NET Core
description: "Learn how to implement Ajax Binding with Kendo UI ComboBox HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_combobox_ajaxbinding_aspnetcore
position: 2
---

# Ajax Binding

Below are listed the steps for you to follow when configuring the Kendo UI ComboBox for Ajax binding to the Northwind **Products** table which uses Linq to SQL.

> **Important**
>
> The `ToDataSourceResult()` extension method modifies the structure of the result and the widget is not able to bind to it. In this case, return a simple array of data.

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

1. Add an Ajax-bound ComboBox.

    ###### Example

        @(Html.Kendo().ComboBox()
            .Name("productDropDownList") //The name of the ComboBox is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the ComboBox as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the ComboBox as a value.
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

## See Also

* [JavaScript API Reference of the ComboBox](http://docs.telerik.com/kendo-ui/api/javascript/ui/combobox)
* [ComboBox HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/combobox/overview)
* [ComboBox Official Demos](http://demos.telerik.com/aspnet-core/combobox/index)
