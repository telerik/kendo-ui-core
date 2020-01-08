---
title:  Ajax Binding
page_title: Ajax Binding
description: "Learn how to implement Ajax Binding with Telerik UI AutoComplete HtmlHelper for {{ site.framework }}."
previous_url: /helpers/editors/autocomplete/binding/ajax-binding
slug: htmlhelpers_autocomplete_ajaxbinding_aspnetcore
position: 2
---

# Ajax Binding

The AutoComplete provides support for remote data binding by using a `DataSource` configuration object. You can configure the AutoComplete to get its data from a remote source by making an AJAX request.

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

1. Add the AutoComplete to the view and configure its DataSource to use remote data.

            @model MvcApplication1.Models.ProductViewModel

            @(Html.Kendo().AutoCompleteFor(m => m.ProductName)
                .Filter("contains")
                .DataTextField("ProductName")
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

* [Local Data Binding]({% slug htmlhelpers_autocomplete_serverbinding_aspnetcore %})
* [Server-Side API](/api/dropdownlist)
