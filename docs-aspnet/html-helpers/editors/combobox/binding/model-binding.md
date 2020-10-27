---
title:  Model Binding
page_title: Model Binding
description: "Learn how to implement Model Binding with Telerik UI ComboBox HtmlHelper for {{ site.framework }}."
previous_url: /helpers/editors/combobox/binding/model-binding
slug: htmlhelpers_combobox_modelbinding_aspnetcore
position: 6
---

# Model Binding

You can implement model binding in the ComboBox with both [local data](#local-data) and [remote data](#remote-data).

## Local Data

Local data is the data that is available on the client when the ComboBox is initialized.

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


1. Add the ComboBox to the view and bind it to the data that is saved in the `ViewData`.

        @model MvcApplication1.Models.ProductViewModel

        @(Html.Kendo().ComboBoxFor(m => m.ProductID)
            .DataValueField("ProductID")
            .DataTextField("ProductName")
            .BindTo((System.Collections.IEnumerable)ViewData["products"])
        )


## Remote Data

You can configure the ComboBox to get its data from a remote source by making an AJAX request.

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

            return Json(products, JsonRequestBehavior.AllowGet);
        }


1. Add the ComboBox to the view and configure its DataSource to use remote data.

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

* [Server-Side API](/api/combobox)
