---
title: Enable Grid Operations for Grid Object Column
description: An example on how to enable the Grid operations (sorting, filtering, grouping) for a column which represents a compound object with Telerik UI for ASP.NET Core.
type: how-to
page_title: Enable Grid Operations for Compound Object Column
slug: grid-enable-operations-for-object-column
tags: aspnet, core, dotnet-core, kendo, kendo-ui, grid, columns, operations, filtering, sorting
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Telerik® UI for ASP.NET Core</td>
 </tr>
</table>

## Description

How can I enable sorting, filtering, and grouping for a column which holds complex object values by using the Grid HtmlHelper?

## Solution

- Enable the sorting, grouping, and filtering through the `.Sortable()`, `.Groupable()`, and `.Filterable()` methods.
- The `Product` Model has a `Category` property, which is a Model with `CategoryID` and `CategoryName` properties. Bind the column to the `CategoryName` property.

```View
@model ProjectName.Models

@(Html.Kendo().Grid<Product>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(product => product.ProductID);
        columns.Bound(product => product.Category.CategoryName);
    })
    .Pageable()
    .Sortable()
    .Filterable()
    .Groupable()
    .DataSource(dataSource => dataSource
        .Ajax()
        .Read(read => read.Action("Read", "Grid"))
    )
)
```
```Models
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

public class Product
{
    public int ProductID  { get; set; }
    public Category Category { get; set; }
}

public class Category
{
    public int CategoryID { get; set; }

    public string CategoryName { get; set; }
}
```
```Controller
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjectName.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc;

public class GridController : Controller
{
        private static ICollection<Product> products;

        public GridController()
        {
            if (products == null)
            {
                var random = new Random();
                products = Enumerable.Range(1, 100).Select(x => new Product
                {
                    ProductID = x,
                    Category = new Category
                    {
                        CategoryID = x,
                        CategoryName = "Category" + x
                    }

                }).ToList();
            }
        }
        public IActionResult GridController()
        {
            return View();
        }

        public ActionResult Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(products.ToDataSourceResult(request));
        }
    }
```

For the complete implementation on how to enable sorting, filtering, and grouping in a Kendo UI Grid for ASP.NET Core when a Grid column represents complex object values, refer to [this GitHub project](https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/Grid/EnableOperationsForObjectColumn.cshtml) demonstrates how to.

## See Also

* [API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
