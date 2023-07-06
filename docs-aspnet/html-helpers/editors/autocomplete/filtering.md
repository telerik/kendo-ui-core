---
title: Filtering
page_title: Filtering
description: "Learn how the data filtering in the Telerik UI AutoComplete component for {{ site.framework }} works."
slug: htmlhelpers_autocomplete_filtering_aspnetcore
position: 5
---

# Filtering Overview

The {{ site.framework }} AutoComplete provides options for filtering its data and displaying only a subset of the data.

## Server Filtering

When using Server Filtering a reduced portion of the whole dataset is returned from the server. Displaying a subset of the whole data is useful when working with large datasets that contain thousands of records. In such cases, you can improve performance and loading times by defining a minimum filter length by using the [MinLength](/api/kendo.mvc.ui.fluent/dropdownlistbuilder#minlengthsystemdouble) option. For example, if you set MinLength to 3, the {{ site.product_short }} AutoComplete will not send a request to the remote endpoint and start filtering the dataset until the user enters at least three characters.

> When you apply server filtering, only the source of the AutoComplete is filtered. To page and filter the dataset, use the [virtualization]({% slug htmlhelpers_dropdownlist_virtualization_aspnetcore %}) feature.

To configure the {{ site.product_short }} AutoComplete for Server Filtering:

1. Set the `ServerFiltering` option of the DataSource component to `true`.
1. Set the [`Filter`](/api/kendo.mvc.ui.fluent/dropdownlistbuilder#filterkendomvcuifiltertype) property of the AutoComplete.

The following example demonstrates how to configure AutoComplete for Server Filtering.

```HtmlHelper
    @(Html.Kendo().AutoComplete()
          .Name("products")
          .DataTextField("ProductName")
          .Filter(FilterType.Contains)
          .DataSource(source =>
          {
              source.Read(read =>
              {
                  read.Action("ServerFiltering_GetProducts", "AutoComplete")
                    .Data("onAdditionalData");
              })
              .ServerFiltering(true);
          })
    )
```
{% if site.core %}
```TagHelper
<kendo-autocomplete name="products"
                    datatextfield="ProductName"
                    filter="FilterType.Contains">
    <datasource server-filtering="true">
        <transport>
            <read url="@Url.Action("ServerFiltering_GetProducts", "AutoComplete")" data="onAdditionalData"/>
        </transport>
    </datasource>

</kendo-autocomplete>
```
{% endif %}
```script
    <script>
        function onAdditionalData() {
            return {
                text: $("#products").val()
            };
        }
    </script>
```
```Controller
    public JsonResult ServerFiltering_GetProducts(string text)
    {
        using (var northwind = GetContext())
        {
            var products = northwind.Products.Select(product => new ProductViewModel
            {
                ProductID = product.ProductID,
                ProductName = product.ProductName,
                UnitPrice = product.UnitPrice.Value,
                UnitsInStock = product.UnitsInStock.Value,
                UnitsOnOrder = product.UnitsOnOrder.Value,
                Discontinued = product.Discontinued
            });

            if (!string.IsNullOrEmpty(text))
            {
                products = products.Where(p => p.ProductName.Contains(text));
            }

            return Json(products.ToList());
        }
    }
```

## Client Filtering

For smaller sets of data, the {{ site.product_short }} AutoComplete also supports Client Filtering. To configure it, set the `ServerFiltering` property to `false`. This way the AutoComplete dataset will be filtered on the client without sending additional requests to a remote endpoint.

```HtmlHelper
    @(Html.Kendo().AutoComplete()
          .Name("products")
          .DataTextField("ProductName")
          .Filter(FilterType.Contains)
          .DataSource(source =>
          {
              source.Read(read =>
              {
                  read.Action("ServerFiltering_GetProducts", "AutoComplete");
              })
              .ServerFiltering(false);
          })
    )
```
{% if site.core %}
```TagHelper
<kendo-autocomplete name="products"
                    datatextfield="ProductName"
                    filter="FilterType.Contains">
    <datasource server-filtering="false">
        <transport>
            <read url="@Url.Action("ServerFiltering_GetProducts", "AutoComplete")" />
        </transport>
    </datasource>

</kendo-autocomplete>
```
{% endif %}
```Controller
    public JsonResult ServerFiltering_GetProducts()
    {
        using (var northwind = GetContext())
        {
            var products = northwind.Products.Select(product => new ProductViewModel
            {
                ProductID = product.ProductID,
                ProductName = product.ProductName,
                UnitPrice = product.UnitPrice.Value,
                UnitsInStock = product.UnitsInStock.Value,
                UnitsOnOrder = product.UnitsOnOrder.Value,
                Discontinued = product.Discontinued
            });

            return Json(products.ToList());
        }
    }
```

## See Also

* [Grouping by the AutoComplete HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/autocomplete/grouping)
* [Server-Side API](/api/autocomplete)
