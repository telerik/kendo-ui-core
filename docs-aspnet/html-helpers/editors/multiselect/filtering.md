---
title: Filtering
page_title: Filtering
description: "Learn how to filter data on the server for the Telerik UI MultiSelect component for {{ site.framework }}."
slug: htmlhelpers_multiselect_filtering_aspnetcore
position: 5
---

# Filtering Overview

The {{ site.framework }} MultiSelect provides options for filtering its data and displaying only a subset of the data.

## Server Filtering

When using Server Filtering a reduced portion of the whole dataset is returned from the server. Displaying a subset of the whole data is useful when working with large datasets containing thousands of records. In such cases, you can improve the performance and loading times by defining a minimum filter length by using the [MinLength](/api/kendo.mvc.ui.fluent/multiselectbuilder#minlengthsystemdouble) option. For example, if you set MinLength to 3, the {{ site.product_short }} MultiSelect will not send a request to the remote endpoint and start the filtering process until the user enters at least three characters.

> When you apply server filtering, only the source of the MultiSelect is filtered. To page and filter the dataset, use the [virtualization]({% slug htmlhelpers_multiselect_virtualization_aspnetcore %}) feature.

To configure the {{ site.product_short }} MultiSelect for Server Filtering:

1. Set the `ServerFiltering` option of the DataSource component to `true`.
1. Set the [`Filter`](/api/kendo.mvc.ui.fluent/multiselectbuilder#filterkendomvcuifiltertype) property of the MultiSelect.

The following example demonstrates how to configure MultiSelect for Server Filtering.

```HtmlHelper
    @(Html.Kendo().MultiSelect()
          .Name("products")
          .DataTextField("ProductName")
          .DataValueField("ProductID")
          .Filter(FilterType.Contains)
          .DataSource(source =>
          {
              source.Read(read =>
              {
                  read.Action("ServerFiltering_GetProducts", "MultiSelect");
              })
              .ServerFiltering(true);
          })
    )
```
{% if site.core %}
```TagHelper
    <kendo-multiselect name="products"
                       datatextfield="ProductName"
                       datavaluefield="ProductID"
                       filter="FilterType.Contains">
       <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
           <transport>
                <read url="@Url.Action("ServerFiltering_GetProducts", "MultiSelect")" />
           </transport>
       </datasource>
    </kendo-multiselect>
```
{% endif %}
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

For smaller sets of data, the {{ site.product_short }} MultiSelect also supports Client Filtering. To configure it, set the ServerFiltering property to false. This way the MultiSelect dataset will be filtered on the client without sending additional requests to remote endpoint.

```HtmlHelper
    @(Html.Kendo().MultiSelect()
          .Name("products")
          .DataTextField("ProductName")
          .DataValueField("ProductID")
          .Filter(FilterType.Contains)
          .DataSource(source =>
          {
              source.Read(read =>
              {
                  read.Action("ServerFiltering_GetProducts", "MultiSelect");
              })
              .ServerFiltering(false);
          })
    )
```
{% if site.core %}
```TagHelper
    <kendo-multiselect name="products"
                       datatextfield="ProductName"
                       datavaluefield="ProductID"
                       filter="FilterType.Contains">
       <datasource type="DataSourceTagHelperType.Custom" server-filtering="false">
           <transport>
                <read url="@Url.Action("ServerFiltering_GetProducts", "MultiSelect")" />
           </transport>
       </datasource>
    </kendo-multiselect>
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

* [Server Filtering by the MultiSelect HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multiselect/serverfiltering)
* [client Filtering by the MultiSelect HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multiselect/serverfiltering)
* [Server-Side API](/api/multiselect)
