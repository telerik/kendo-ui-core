---
title:  Server Binding
page_title: Server Binding | Kendo UI ComboBox HtmlHelper for ASP.NET Core
description: "Learn how to implement server binding in the Kendo UI ComboBox HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_combobox_serverbinding_aspnetcore
position: 3
---

# Server Binding

Below are listed the steps for you to follow when configuring the Kendo UI ComboBox for server binding to the Northwind **Products** table which uses Linq to SQL.

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


1. Add a server bound ComboBox.

    ###### Example

        @(Html.Kendo().ComboBox()
            .Name("productComboBox") //The name of the ComboBox is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") //Specify which property of the Product to be used by the ComboBox as a text.
            .DataValueField("ProductID") //Specify which property of the Product to be used by the ComboBox as a value.
            .BindTo(Model)   //Pass the list of Products to the ComboBox.
            .SelectedIndex(10) //Select an item with index 10. Note that the indexes are zero-based.
        )

## See Also

* [JavaScript API Reference of the ComboBox](http://docs.telerik.com/kendo-ui/api/javascript/ui/combobox)
* [ComboBox HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/combobox/overview)
* [ComboBox Official Demos](http://demos.telerik.com/aspnet-core/combobox/index)
