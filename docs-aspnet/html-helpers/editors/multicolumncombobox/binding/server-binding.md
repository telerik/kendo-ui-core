---
title:  Server Binding
page_title: Server Binding
description: "Learn how to implement server binding in the Telerik UI MultiColumnComboBox component for {{ site.framework }}."
previous_url: /helpers/editors/multicolumncombobox/binding/server-binding
slug: htmlhelpers_multicolumncombobox_serverbinding_aspnetcore
position: 4
---

# Server Binding

Local data is the data that is available on the client when the MultiColumnComboBox is initialized.

You can bind the MultiColumnComboBox locally on the server by passing the appropriate collection to the component's `BindTo()` method.

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

    ```HtmlHelper
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

* [Ajax Data Binding by the MultiColumnComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/serverfiltering)
* [Server-Side API](/api/multicolumncombobox)
