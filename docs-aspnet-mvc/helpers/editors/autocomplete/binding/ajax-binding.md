---
title: Ajax Binding
page_title: Ajax Binding | Telerik UI AutoComplete HtmlHelper for ASP.NET MVC
description: "Learn how to implement Ajax binding with Telerik UI AutoComplete HtmlHelper for ASP.NET MVC."
slug: ajaxbinding_autocomplete_aspnetmvc
position: 2
---

# Ajax Binding

During the Ajax binding the AutoComplete makes Ajax requests to get the data.

To configure the AutoComplete for Ajax binding to the Northwind **Products** table by using Linq to SQL:

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

1. Add an Ajax-bound AutoComplete.

  > The `ToDataSourceResult()` extension method modifies the structure of the result and the AutoComplete is not able to bind to it. In this case, return a simple array of data.

    ```ASPX
        <%: Html.Kendo().AutoComplete()
            .Name("productAutoComplete") // The name of the AutoComplete is mandatory. It specifies the "id" attribute of the AutoComplete.
            .DataTextField("ProductName") // Specify which property of the Product to be used by the AutoComplete.
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
        @(Html.Kendo().AutoComplete()
          .Name("productAutoComplete") // The name of the AutoComplete is mandatory. It specifies the "id" attribute of the AutoComplete.
          .DataTextField("ProductName") // Specify which property of the Product to be used by the AutoComplete.
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

* [Server-Side API](/api/autocomplete)
