---
title:  Local Binding
page_title: Local Binding
description: "Learn how to bind the {{ site.product }}   MultiColumnComboBox component to a local dataset."
previous_url: /helpers/editors/multicolumncombobox/binding/server-binding
slug: htmlhelpers_multicolumncombobox_serverbinding_aspnetcore
position: 2
---

# Local Binding

Local data binding refers to binding the MultiColumnComboBox component to a dataset that is prepared on the server and made available during the initial page rendering. The data is retrieved server-side (from a database, service, or other data source) and then passed to the view, where the `BindTo()` method accepts the `IEnumerable` collection.

The local data binding approach is often used when dealing with small to medium-sized datasets since all records are available when the page is loaded. Also, when the client-side filtering of the MultiColumnComboBox is enabled and the complete dataset can be accessed on the client, no additional server requests are needed, which provides fast and responsive user interactions. However, for large datasets, consider using [Ajax data binding]({% slug htmlhelpers_multicolumncombobox_ajaxbinding_aspnetcore %}) to avoid increased initial page load times and memory usage.

To configure the MultiColumnComboBox for local data binding, follow the next steps:

1. Pass the data to the view through `ViewData`.

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

1. Add the MultiColumnComboBox to the view and bind it to the data collection that is saved in the `ViewData`.

    ```HtmlHelper
        @model MvcApplication1.Models.ProductViewModel

        @(Html.Kendo().MultiColumnComboBoxFor(m => m.ProductID)
            .DataValueField("ProductID")
            .DataTextField("ProductName")
            .Columns(columns =>
            {
                columns.Add().Field("ProductName").Title("Product Name").Width("200px");
                columns.Add().Field("ProductID").Title("Product ID").Width("200px");
            })
            .BindTo((System.Collections.IEnumerable)ViewData["products"])
        )
    ```
    {% if site.core %}
    ```TagHelper
        @model MvcApplication1.Models.ProductViewModel

        @{
           var data = (System.Collections.IEnumerable)ViewData["products"];
        }
        <kendo-multicolumncombobox for="@Model.ProductID" 
            bind-to="(dynamic)data"
            datatextfield="ProductName"
            datavaluefield="ProductID">
            <multicolumncombobox-columns>
                <column field="ProductName" title="Name" width="200px">
                </column>
                <column field="ProductID" title="ID" width="200px">
                </column>
            </multicolumncombobox-columns>
        </kendo-multicolumncombobox>
    ```
    {% endif %}

## See Also

* [Basic Usage of the MultiColumnComboBox for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/basic-usage)
* [Ajax Data Binding]({% slug htmlhelpers_multicolumncombobox_ajaxbinding_aspnetcore %})
* [Server-Side API of the MultiColumnComboBox HtmlHelper](/api/multicolumncombobox)
{% if site.core %}
* [Server-Side API of the MultiColumnComboBox TagHelper](/api/taghelpers/multicolumncombobox)
{% endif %}
