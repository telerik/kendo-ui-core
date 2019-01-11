---
title:  Model Binding
page_title: Model Binding | Kendo UI ComboBox HtmlHelper for ASP.NET Core
description: "Learn how to implement Model Binding with Kendo UI ComboBox HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_combobox_modelbinding_aspnetcore
position: 5
---

# Model Binding

You can implement model binding in the ComboBox with both [local data](#local-data) and [remote data](#remote-data), and in combination with [virtualization](#virtualization).

## Local Data

Local data is the data that is available on the client when the ComboBox is initialized.

1. Pass the data to the view through `ViewData`.

    ###### Example

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


1. Add the ComboBox to the view and bind it to the data that is saved in the `ViewData`.

    ###### Example


        @model MvcApplication1.Models.ProductViewModel

        @(Html.Kendo().ComboBoxFor(m => m.ProductID)
            .DataValueField("ProductID")
            .DataTextField("ProductName")
            .BindTo((System.Collections.IEnumerable)ViewData["products"])
        )


## Remote Data

You can configure the ComboBox to get its data from a remote source by making an AJAX request.

1. Create an action that returns the data as a JSON result.

    ###### Example

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

            return Json(products, JsonRequestBehavior.AllowGet);
        }


1. Add the ComboBox to the view and configure its DataSource to use remote data.

    ###### Example



        @model MvcApplication1.Models.ProductViewModel


        @(Html.Kendo().ComboBoxFor(m => m.ProductID)
            .Filter("contains")
            .DataTextField("ProductName")
            .DataValueField("ProductID")
            .Placeholder("Select product...")
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

* [JavaScript API Reference of the ComboBox](http://docs.telerik.com/kendo-ui/api/javascript/ui/combobox)
* [ComboBox HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/combobox/overview)
* [ComboBox Official Demos](http://demos.telerik.com/aspnet-core/combobox/index)
