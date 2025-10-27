---
title: Local Binding
page_title: Local Binding
description: "Learn how to bind the {{ site.product }} AutoComplete component to a local dataset."
previous_url: /helpers/editors/autocomplete/binding/server-binding
slug: htmlhelpers_autocomplete_serverbinding_aspnetcore
position: 1
---

# Local Binding

Local data binding refers to binding the AutoComplete component to a dataset that is prepared on the server and made available during the initial page rendering. The data is retrieved server-side (from a database, service, or other data source) and then passed to the view, where the `BindTo()` method accepts the `IEnumerable` collection.

The local data binding approach is often used when dealing with small to medium-sized datasets since all records are available when the page is loaded. Also, when the client-side filtering of the AutoComplete is enabled and the complete dataset can be accessed on the client, no additional server requests are needed, which provides fast and responsive user interactions. However, for large datasets, consider using [Ajax data binding]({% slug htmlhelpers_autocomplete_ajaxbinding_aspnetcore %}) to avoid increased initial page load times and memory usage.

To configure the AutoComplete for local data binding, follow the next steps:

1. Pass the data collection to the view through `ViewData`.

    ```C#
    public ActionResult Index()
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
        var products = Enumerable.Range(1, 2000).Select(i => new ProductViewModel
        {
            ProductID = i,
            ProductName = "ProductName" + i
        });

        return products;
    }
    ```

1. Add the AutoComplete to the view and bind it to the data collection that is saved in `ViewData`.

    ```HtmlHelper
        @model MvcApplication1.Models.ProductViewModel

        @(Html.Kendo().AutoCompleteFor(m => m.ProductName)
            .DataTextField("ProductName")
            .BindTo((System.Collections.IEnumerable)ViewData["products"])
        )
    ```
    {% if site.core %}
    ```TagHelper
    @model MvcApplication1.Models.ProductViewModel

    <kendo-autocomplete for="ProductName"
        dataTextField="ProductName"
        bind-to='(IEnumerable<ProductViewModel>)ViewData["products"]'>
    </kendo-autocomplete>
    ```
    {% endif %}

## See Also

* [Basic Usage of the AutoComplete for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/autocomplete/basic-usage)
* [Ajax Data Binding]({% slug htmlhelpers_autocomplete_ajaxbinding_aspnetcore %})
* [Server-Side API of the AutoComplete HtmlHelper](/api/autocomplete)
{% if site.core %}
* [Server-Side API of the AutoComplete TagHelper](/api/taghelpers/autocomplete)
{% endif %}
