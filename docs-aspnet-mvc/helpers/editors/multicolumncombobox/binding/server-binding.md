---
title: Server Binding
page_title: Server Binding | Telerik UI MultiColumnComboBox HtmlHelper for ASP.NET MVC
description: "Learn how to implement server binding with Telerik UI MultiColumnComboBox HtmlHelper for ASP.NET MVC."
slug: serverbinding_multicolumncombobox_aspnetmvc
position: 3
---

# Server Binding

During the server data-binding mode, the data is serialized to the client and no Ajax requests are made.

To configure the MultiColumnComboBox for server binding to the Northwind **Products** table by using Linq to SQL:

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method and pass the **Products** table as the model.

        public ActionResult Index()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return View(northwind.Products);
        }

1. Make your view strongly typed.

    ```Razor
        @model IEnumerable<MvcApplication1.Models.Product>
    ```
    ```ASPX
        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
            Inherits="System.Web.Mvc.ViewPage<IEnumerable<MvcApplication1.Models.Product>>" %>
    ```

1.  Add a server-bound MultiColumnComboBox.

    ```Razor
        @(Html.Kendo().MultiColumnComboBox()
            .Name("productMultiColumnComboBox") // The name of the MultiColumnComboBox is mandatory. It specifies the "id" attribute of the MultiColumnComboBox.
            .Columns(columns =>
            {
                columns.Add().Field("ProductName").Title("Product Name").Width("200px")
                columns.Add().Field("ProductID").Title("Product ID").Width("200px");
            })
            .DataTextField("ProductName") // Specify which property of the Product to be used by the MultiColumnComboBox as a text.
            .DataValueField("ProductID") // Specify which property of the Product to be used by the MultiColumnComboBox as a value.
            .BindTo(Model)   // Pass the list of Products to the MultiColumnComboBox.
            .SelectedIndex(10) // Select an item with index 10. Note that the indexes are zero-based.
        )
    ```
    ```ASPX
        <%: Html.Kendo().MultiColumnComboBox()
            .Name("productMultiColumnComboBox") // The name of the MultiColumnComboBox is mandatory. It specifies the "id" attribute of the MultiColumnComboBox.
            .DataTextField("ProductName") // Specify which property of the Product to be used by the MultiColumnComboBox as a text.
            .DataValueField("ProductID") // Specify which property of the Product to be used by the MultiColumnComboBox as a value.
            .Columns(columns =>
            {
                columns.Add().Field("ProductName").Title("Product Name").Width("200px")
                columns.Add().Field("ProductID").Title("Product ID").Width("200px");
            })
            .BindTo(Model)   // Pass the list of Products to the MultiColumnComboBox.
            .SelectedIndex(10) // Select an item with index 10. Note that the indexes are zero-based.
        %>
    ```

## See Also

* [Basic Usage of the MultiColumnComboBox HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/multicolumncombobox/index)
* [MultiColumnComboBoxBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MultiColumnComboBoxBuilder)
* [MultiColumnComboBox Server-Side API](/api/multicolumncombobox)
