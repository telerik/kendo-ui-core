---
title: Ajax Binding
page_title: Ajax Binding | Telerik UI MultiColumnComboBox HtmlHelper for ASP.NET MVC
description: "Learn how to implement Ajax binding with Telerik UI MultiColumnComboBox HtmlHelper for ASP.NET MVC."
slug: ajaxbinding_multicolumncombobox_aspnetmvc
position: 2
---

# Ajax Binding

During the Ajax binding the MultiColumnComboBox makes Ajax requests to get the data.

To configure the MultiColumnComboBox for Ajax binding to the Northwind **Products** table by using Linq to SQL:

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create an action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Create a new action method and pass the **Products** table as JSON result.

      public JsonResult GetProducts()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return Json(northwind.Products, JsonRequestBehavior.AllowGet);
        }

1. Add an Ajax-bound MultiColumnComboBox.

  > The `ToDataSourceResult()` extension method modifies the structure of the result and the MultiColumnComboBox is not able to bind to it. In this case, return a simple array of data.

    ```Razor
        @(Html.Kendo().MultiColumnComboBox()
            .Name("productMultiColumnComboBox") // The name of the MultiColumnComboBox is mandatory. It specifies the "id" attribute of the MultiColumnComboBox.
            .DataTextField("ProductName") // Specify which property of the Product to be used by the MultiColumnComboBox as a text.
            .DataValueField("ProductID") // Specify which property of the Product to be used by the MultiColumnComboBox as a value.
            .Filter(FilterType.Contains)
            .Columns(columns =>
            {
                columns.Add().Field("ProductName").Title("Product Name").Width("200px")
                columns.Add().Field("ProductID").Title("Product ID").Width("200px");
            })
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("GetProducts", "Home"); // Set the Action and Controller names.
                })
                .ServerFiltering(true); // If true, the DataSource will not filter the data on the client.
            })
            .SelectedIndex(0) // Select the first item.
        )
    ```
    ```ASPX
        <%: Html.Kendo().MultiColumnComboBox()
            .Name("productMultiColumnComboBox") // The name of the MultiColumnComboBox is mandatory. It specifies the "id" attribute of the MultiColumnComboBox.
            .DataTextField("ProductName") // Specify which property of the Product to be used by the MultiColumnComboBox as a text.
            .DataValueField("ProductID") // Specify which property of the Product to be used by the MultiColumnComboBox as a value.
            .Filter(FilterType.Contains)
            .Columns(columns =>
            {
                columns.Add().Field("ProductName").Title("Product Name").Width("200px")
                columns.Add().Field("ProductID").Title("Product ID").Width("200px");
            })
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("GetProducts", "Home"); // Set the Action and Controller names.
                })
                .ServerFiltering(true); // If true, the DataSource will not filter the data on the client.
            })
            .SelectedIndex(0) // Select the first item.
        %>
    ```

## See Also

* [Basic Usage of the MultiColumnComboBox HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/multicolumncombobox/index)
* [MultiColumnComboBoxBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MultiColumnComboBoxBuilder)
* [MultiColumnComboBox Server-Side API](/api/multicolumncombobox)
