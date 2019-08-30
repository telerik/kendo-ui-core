---
title: Model Binding
page_title: Model Binding | Telerik UI MultiColumnComboBox HtmlHelper for ASP.NET Core
description: "Implement model binding in the Telerik UI MultiColumnComboBox HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: modelbinding_multicolumncombobox_aspnetcore
position: 2
---

# Model Binding

You can implement model binding both with [local data](#local-data) and [remote data](#remote-data).

## Local Data

Local data is the data that is available on the client when the MultiColumnComboBox is initialized.

1. Pass the data to the view through `ViewData`.

        public IActionResult Index()
        {
            ViewData["products"] = GetProducts();

            return View(new ProductViewModel
            {
                ProductID = 4,
                ProductName = "ProductName4"
            });
        }

        private static IEnumerable<ProductViewModel> GetProducts()
        {
            var products = Enumerable.Range(0, 2000).Select(i => new ProductViewModel
            {
                ProductID = i,
                ProductName = "ProductName" + i
            });

            return products;
        }

1. Add the MultiColumnComboBox to the view and bind it to the data that is saved in the `ViewData`.

        @model MvcApplication1.Models.ProductViewModel

        @(Html.Kendo().MultiColumnComboBoxFor(m => m.ProductID)
            .DataValueField("ProductID")
            .DataTextField("ProductName")
            .Columns(columns =>
            {
                columns.Add().Field("ProductName").Title("Product Name").Width("200px")
                columns.Add().Field("ProductID").Title("Product ID").Width("200px");
            })
            .BindTo((System.Collections.IEnumerable)ViewData["products"])
        )

## Remote Data

You can configure the MultiColumnComboBox to get its data from a remote source by making an AJAX request.

1. Create an action that returns the data as a JSON result.

        public IActionResult Index()
        {
            return View(new ProductViewModel
            {
                ProductID = 4,
                ProductName = "ProductName4"
            });
        }

        public JsonResult GetProductsAjax()
        {
            var products = Enumerable.Range(0, 500).Select(i => new ProductViewModel
            {
                ProductID = i,
                ProductName = "ProductName" + i
            });

            return Json(products);
        }

1. Add the MultiColumnComboBox to the view and configure its DataSource to use remote data.

        @model MvcApplication1.Models.ProductViewModel

        @(Html.Kendo().MultiColumnComboBoxFor(m => m.ProductID)
            .Filter("contains")
            .DataTextField("ProductName")
            .DataValueField("ProductID")
            .Placeholder("Select product...")
            .Columns(columns =>
            {
                columns.Add().Field("ProductName").Title("Product Name").Width("200px")
                columns.Add().Field("ProductID").Title("Product ID").Width("200px");
            })
            .DataSource(source =>
            {
                source.Read(read =>
                {
                    read.Action("GetProductsAjax", "Home");
                })
                .ServerFiltering(false);
            })
        )

## See Also

* [Customizing the Data Source in the MultiColumnComboBox HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/multicolumncombobox/custom-datasource)
* [Server-Side API](/api/multicolumncombobox)
