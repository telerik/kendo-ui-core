---
title: Filtering
page_title: Filtering
description: "Learn filtering capabilities of the Telerik UI ComboBox component for {{ site.framework }}."
components: ["combobox"]
slug: htmlhelpers_combobox_filtering_aspnetcore
position: 5
---

# Filtering

The Telerik UI ComboBox for {{ site.framework }} allows the users to filter the available items by their text so they can find the one they need.

By default, the filtration is turned off. It can be performed over string values only (either the component's data has to be a collection of strings, or the filtering will be applied over the field, configured in the `DataTextField` option).

To enable the ComboBox filtering, set the desired filter operator through the [`Filter()`](/api/kendo.mvc.ui.fluent/comboboxbuilder#filtersystemstring) method. The supported options are `contains`, `startswith` and `endswith`. When the filtering is enabled, the user can decide where the actual filtering happens:

* [Client-side Filtering](#client-filtering)
* [Server-side Filtering](#server-filtering)

## Client Filtering

By design, the ComboBox uses client-side filtering and no specific option must be set. The actual operation is performed through JavaScript directly on the client. No requests are being made to the server.

```HtmlHelper
    @(Html.Kendo().ComboBox()
        .Name("products")
        .Filter(FilterType.Contains)
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("GetProducts", "ComboBox");
            })
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-combobox name="products"
        datatextfield="ProductName"
        datavaluefield="ProductID"
        filter="FilterType.Contains">
        <datasource>
            <transport>
                <read url="@Url.Action("GetProducts", "ComboBox")" />
            </transport>
        </datasource>
    </kendo-combobox>
```
```Controller
    public JsonResult GetProducts()
    {
        using (var northwind = GetContext())
        {
            var products = northwind.Products.Select(product => new ProductViewModel
            {
                ProductID = product.ProductID,
                ProductName = product.ProductName
            });
            return Json(products.ToList());
        }
    }
```
{% else %}
```Controller
    public JsonResult GetProducts()
    {
        var northwind = new DemoDBContext();
        var products = northwind.Products.Select(product => new ProductViewModel
        {
            ProductID = product.ProductID,
            ProductName = product.ProductName
        });

        return Json(products, JsonRequestBehavior.AllowGet);
    }
```
{% endif %}

For a runnable example, visit to the [Client Filtering Demo of the ComboBox](https://demos.telerik.com/{{ site.platform }}/combobox/clientfiltering).

## Server Filtering

To enable server filtering, set the `ServerFiltering` option of the DataSource to `true`. As a result, the data filtering will be performed server-side. The ComboBox triggers a Read request and sends the entered filter value along with the respective filter operator to the server. The data is filtered on the server, and the ready-to-use subset is returned back to the component.

By default, when the ComboBox is configured for server filtering, the filter value is automatically appended to the request query string through the `text` parameter. By accessing the `text` parameter within the Read Action method in the Controller, you can filter the data on the server and return the filtered data collection to the component.

```HtmlHelper
    @(Html.Kendo().ComboBox()
        .Name("products")
        .Filter(FilterType.Contains)
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .DataSource(source =>
        {
            source.Read(read => read.Action("ServerFiltering_GetProducts", "ComboBox"))
                .ServerFiltering(true);
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-combobox name="products"
        datatextfield="ProductName"
        datavaluefield="ProductID"
        filter="FilterType.Contains">
        <datasource server-filtering="true">
            <transport>
                <read url="@Url.Action("ServerFiltering_GetProducts", "ComboBox")" />
            </transport>
        </datasource>
    </kendo-combobox>
```
```Controller
    public JsonResult ServerFiltering_GetProducts(string text)
    {
        using (var northwind = GetContext())
        {
            var products = northwind.Products.Select(product => new ProductViewModel
            {
                ProductID = product.ProductID,
                ProductName = product.ProductName
            });

            if (!string.IsNullOrEmpty(text))
            {
                products = products.Where(p => p.ProductName.Contains(text));
            }

            return Json(products.ToList());
        }
    }
```
{% else %}
```Controller
    public JsonResult ServerFiltering_GetProducts(string text)
    {
        var northwind = new DemoDBContext();
        var products = northwind.Products.Select(product => new ProductViewModel
        {
            ProductID = product.ProductID,
            ProductName = product.ProductName
        });

        if (!string.IsNullOrEmpty(text))
        {
            products = products.Where(p => p.ProductName.Contains(text));
        }

        return Json(products, JsonRequestBehavior.AllowGet);
    }
```
{% endif %}

For a runnable example, visit to the [Server Filtering Demo of the ComboBox](https://demos.telerik.com/{{ site.platform }}/combobox/serverfiltering).

Also, to define a minimum number of characters the user must type before triggering the Read request, specify the [`MinLength()`](/api/kendo.mvc.ui.fluent/comboboxbuilder#minlengthsystemdouble) option. For example, if you set the `MinLength()` to `3`, the ComboBox will not start filtering the dataset until the user enters at least three characters.

```HtmlHelper
    @(Html.Kendo().ComboBox()
        .Name("products")
        .Filter(FilterType.Contains)
        .MinLength(3)
        .AutoBind(false) // Disable the initial Read request during the ComboBox initialization.
        // Additional configuration.
    )
```
{% if site.core %}
```TagHelper
    <kendo-combobox name="products"
        filter="FilterType.Contains"
        min-length="3"
        auto-bind="false">
        <!-- Additional configuration. -->
    </kendo-combobox>
```
{% endif %}

## See Also

* [Client Filtering of the ComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/combobox/clientfiltering)
* [Server Filtering of the ComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/combobox/serverfiltering)
* [Server-Side HtmlHelper API of the ComboBox](/api/combobox)
{% if site.core %}
* [Server-Side TagHelper API of the ComboBox](/api/taghelpers/combobox)
{% endif %}
