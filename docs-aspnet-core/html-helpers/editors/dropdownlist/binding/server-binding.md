---
title:  Server Binding
page_title: Server Binding | Kendo UI DropDownList HtmlHelper for ASP.NET Core
description: "Learn how to implement server binding in the Kendo UI DropDownList HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_dropdownlist_serverbinding_aspnetcore
position: 2
---

# Server Binding

Below are listed the steps for you to follow when configuring the Kendo UI DropDownList for server binding to the Northwind **Products** table which uses Linq to SQL.

1. Create a new action method and pass the **Products** table as the model.

    ###### Example

        public ActionResult Index()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return View(northwind.Products);
        }

1. Make your view strongly typed.

    ###### Example

        @model IEnumerable<MvcApplication1.Models.Product>


1. Add a server bound DropDownList.

    ###### Example

        @(Html.Kendo().DropDownList()
            .Name("productDropDownList") //The name of the DropDownList is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the DropDownList as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the DropDownList as a value.
            .BindTo(Model)   //Pass the list of Products to the DropDownList.
            .SelectedIndex(10) //Select an item with index 10. Note that the indexes are zero-based.
        )

## See Also

* [JavaScript API Reference of the DropDownList](http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
* [DropDownList HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/dropdownlist/overview)
* [DropDownList Official Demos](http://demos.telerik.com/aspnet-core/dropdownlist/index)
