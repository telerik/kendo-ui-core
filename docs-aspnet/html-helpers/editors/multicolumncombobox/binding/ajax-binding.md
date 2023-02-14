---
title: Ajax Binding
page_title: Ajax Binding
description: "Learn how to implement Ajax Binding with Telerik UI MultiColumnComboBox component for {{ site.framework }}."
previous_url: /helpers/editors/multicolumncombobox/binding/ajax-binding
slug: htmlhelpers_multicolumncombobox_ajaxbinding_aspnetcore
position: 2
---

# Ajax Binding

The MultiColumnComboBox provides support for remote data binding by using a `DataSource` configuration object. You can configure the MultiColumnComboBox to get its data from a remote source by making an AJAX request.

1. Create an action that returns the data as a JSON result.

        public IActionResult Index()
        {
            return View();
        }
        {% if site.core %}
        public JsonResult GetProductsAjax()
        {
            var products = Enumerable.Range(0, 500).Select(i => new ProductViewModel
            {
                ProductID = i,
                ProductName = "ProductName" + i
            });

            return Json(products);
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

        @(Html.Kendo().MultiColumnComboBox()
            .Name("multicolumncombobox")
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
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-multicolumncombobox name="products" filter="FilterType.Contains"
                            placeholder="Select product"
                            datatextfield="ProductName"
                            datavaluefield="ProductID" >
            <multicolumncombobox-columns>
                <column field="ProductName" title="Name" width="200px">
                </column>
                <column field="ProductID" title="ID" width="200px">
                </column>
            </multicolumncombobox-columns>
            <datasource type="DataSourceTagHelperType.Ajax" server-operation="false">
                <transport>
                    <read url="@Url.Action("GetProductsAjax", "Home")" />
                </transport>
            </datasource>
        </kendo-multicolumncombobox>
    ```
    {% endif %}

## See Also

* [Local Data Binding]({% slug htmlhelpers_multicolumncombobox_serverbinding_aspnetcore %})
* [Server-Side API](/api/multicolumncombobox)
