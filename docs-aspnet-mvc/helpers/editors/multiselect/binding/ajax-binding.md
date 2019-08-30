---
title: Ajax Binding
page_title: Ajax Binding | Telerik UI MultiSelect HtmlHelper for ASP.NET MVC
description: "Learn how to implement Ajax binding with Telerik UI MultiSelect HtmlHelper for ASP.NET MVC."
slug: ajaxbinding_multiselect_aspnetmvc
position: 2
---

# Ajax Binding

During the Ajax binding the MultiSelect makes Ajax requests to get the data.

To configure the MultiSelect for Ajax binding to the Northwind **Products** table by using Linq to SQL:

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

1. Add an Ajax-bound MultiSelect.

  > The `ToDataSourceResult()` extension method modifies the structure of the result and the MultiSelect is not able to bind to it. In this case, return a simple array of data.

    ```ASPX
        <%: Html.Kendo().MultiSelect()
            .Name("productMultiSelect") // The name of the MultiSelect is mandatory. It specifies the "id" attribute of the MultiSelect.
            .DataTextField("ProductName") // Specify which property of the Product to be used by the MultiSelect as a text.
            .DataValueField("ProductID") // Specify which property of the Product to be used by the MultiSelect as a value.
            .Filter(FilterType.Contains)
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("GetProducts", "Home"); // Set the Action and Controller names.
                })
                .ServerFiltering(true); // If true, the DataSource will not filter the data on the client.
            })
        %>
    ```
    ```Razor
        @(Html.Kendo().MultiSelect()
            .Name("productMultiSelect") // The name of the MultiSelect is mandatory. It specifies the "id" attribute of the MultiSelect.
            .DataTextField("ProductName") // Specify which property of the Product to be used by the MultiSelect as a text.
            .DataValueField("ProductID") // Specify which property of the Product to be used by the MultiSelect as a value.
            .Filter(FilterType.Contains)
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("GetProducts", "Home"); // Set the Action and Controller names.
                })
                .ServerFiltering(true); // If true, the DataSource will not filter the data on the client.
            })
        )
    ```

## See Also

* [Basic Usage of the MultiSelect HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/multiselect)
* [MultiSelectBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MultiSelectBuilder)
* [MultiSelect Server-Side API](/api/multiselect)
