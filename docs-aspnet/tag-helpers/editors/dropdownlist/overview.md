---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI DropDownList TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/dropdownlist, /helpers/tag-helpers/dropdownlist
slug: taghelpers_dropdownlist_aspnetcore
position: 1
---

# DropDownList TagHelper Overview

The Telerik UI DropDownList TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI DropDownList widget.

The DropDownList displays a list of values and allows for a single selection from the list. The user input is restricted within the predefined options.

* [Demo page for the DropDownList](https://demos.telerik.com/aspnet-core/dropdownlist/tag-helper)

## Initializing the DropDownList

The following example demonstrates how to define the DropDownList by using the DropDownList TagHelper.

        <kendo-dropdownlist name="products" filter="FilterType.StartsWith"></kendo-dropdownlist>

## Basic Configuration

The DropDownList TagHelper configuration options are passed as attributes of the tag.

```cshtml

    @(Html.Kendo().DropDownList()
          .Name("products")
          .DataTextField("ProductName")
          .DataValueField("ProductID")
          .HtmlAttributes(new { style = "width:100%;" })
          .Filter(FilterType.Contains)
          .DataSource(source => source
              .Read(read => read.Action("GetProducts", "Home"))
          )
    )
```
```tagHelper

    <kendo-dropdownlist name="products" filter="FilterType.Contains"
                        placeholder="Select product"
                        datatextfield="ProductName"
                        datavaluefield="ProductID"
                        style="width: 100%;">
        <datasource type="DataSourceTagHelperType.Custom">
            <transport>
                <read url="@Url.Action("GetProducts", "Home")" />
            </transport>
        </datasource>
    </kendo-dropdownlist>
```
```
    public JsonResult GetProducts(string text)
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

## See Also

* [Basic Usage of the DropDownList TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/dropdownlist/tag-helper)
* [Server-Side API](/api/dropdownlist)
