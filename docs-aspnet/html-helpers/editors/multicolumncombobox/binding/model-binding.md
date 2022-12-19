---
title: Model Binding
page_title: Model Binding
description: "Learn how to implement model binding with Telerik UI MultiColumnComboBox component for {{ site.framework }}."
previous_url: /helpers/editors/multicolumncombobox/binding/model-binding
slug: modelbinding_multicolumncombobox_aspnetmvc
position: 6
---

# Model Binding

You can implement model binding both with [local data](#local-data) and [remote data](#remote-data).

## Local Data

Local data is the data that is available on the client when the MultiColumnComboBox is initialized.

1. Pass the data to the view through the `ViewData`.

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

## Remote Data

You can configure the MultiColumnComboBox to get its data from a remote source by making an AJAX request.

1. Create an action that returns the data as a JSON result.

        public ActionResult Index()
        {
            return View(new ProductViewModel
            {
                ProductID = 4,
                ProductName = "ProductName4"
            });
        }
        {% if site.mvc %}
        public JsonResult GetProductsAjax()
        {
            var products = Enumerable.Range(0, 500).Select(i => new ProductViewModel
            {
                ProductID = i,
                ProductName = "ProductName" + i
            });

            return Json(products, JsonRequestBehavior.AllowGet);
        }
        {% else %}
        public JsonResult GetProductsAjax()
        {
            var products = Enumerable.Range(0, 500).Select(i => new ProductViewModel
            {
                ProductID = i,
                ProductName = "ProductName" + i
            });

            return Json(products, JsonRequestBehavior.AllowGet);
        }
        {% endif %}

1. Add the MultiColumnComboBox to the view and configure its DataSource to use remote data.

    ```HtmlHelper
        @model MvcApplication1.Models.ProductViewModel

        @(Html.Kendo().MultiColumnComboBoxFor(m => m.ProductID)
            .Filter("contains")
            .DataTextField("ProductName")
            .DataValueField("ProductID")
            .Columns(columns =>
            {
                columns.Add().Field("ProductName").Title("Product Name").Width("200px")
                columns.Add().Field("ProductID").Title("Product ID").Width("200px");
            })
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
    ```
    {% if site.core %}
    ```TagHelper
        @model MvcApplication1.Models.ProductViewModel

        <kendo-multicolumncombobox for="@Model.ProductID" 
            filter="FilterType.Contains"
            datatextfield="ProductName"
            datavaluefield="ProductID"
            placeholder="Select product">
            <multicolumncombobox-columns>
                <column field="ProductName" title="Name" width="200px">
                </column>
                <column field="ProductID" title="ID" width="200px">
                </column>
            </multicolumncombobox-columns>
            <datasource server-operation="false">
                <transport>
                    <read url="@Url.Action("GetProductsAjax", "Home")" />
                </transport>
            </datasource>
        </kendo-multicolumncombobox>
    ```
    {% endif %}

## See Also

* [Basic Usage of the MultiColumnComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/index)
* [MultiColumnComboBoxBuilder Server-Side API](/api/Kendo.Mvc.UI.Fluent/MultiColumnComboBoxBuilder)
* [MultiColumnComboBox Server-Side API](/api/multicolumncombobox)
