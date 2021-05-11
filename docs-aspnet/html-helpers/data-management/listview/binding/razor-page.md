---
title:  Razor Pages
page_title: Configure a DataSource for the Telerik UI ListView for Remote Binding in Razor Pages.
description: "An example on how to configure the remote binding DataSource to populate the Telerik UI ListView HtmlHelper for {{ site.framework }} in Razor Pages using CRUD Operations."
slug: htmlhelpers_listview_razorpage_aspnetcore
position: 1
---

# Razor Page

### ListView CRUD Operations in Razor Pages

This article showcases how to perform CRUD operations with the ListView component in a Razor Pages scenario.

To set up the ListView component bindings, you need to configure the `Create`, `Read`, `Update`, `Delete` methods of its `DataSource` instance. The URLs in these methods must refer to the methods names in the PageModel. See the implementation details in the example below. For the complete project with Razor Pages examples, visit our [GitHub repository](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages).

```tab-RazorPage(csthml)
@page
@model Telerik.Examples.RazorPages.Pages.ListView.ListViewCrudOperationsModel
@{
    ViewData["Title"] = "ListViewCrudOperations";
}

@using Telerik.Examples.RazorPages.Models

@inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
@Html.AntiForgeryToken()

<h1>ListViewCrudOperations</h1>

/* Create a template that will be used to display each of the ListView items. */
<script type="text/x-kendo-tmpl" id="template">
    <div class="product-view k-widget">
        <dl>
            <dt>Product Name</dt>
            <dd>#:ProductName#</dd>
            <dt>Unit Price</dt>
            <dd>#:kendo.toString(UnitPrice, "c")#</dd>
            <dt>Units In Stock</dt>
            <dd>#:UnitsInStock#</dd>
            <dt>Discontinued</dt>
            <dd>#:Discontinued#</dd>
        </dl>
        <div class="edit-buttons">
            <a class="k-button k-edit-button" href="\\#"><span class="k-icon k-i-edit"></span></a>
            <a class="k-button k-delete-button" href="\\#"><span class="k-icon k-i-delete"></span></a>
        </div>
    </div>
</script>

<a class="k-button k-button-icontext k-add-button" href="#"><span class="k-icon k-i-add"></span>Add new record</a>
@(Html.Kendo().ListView<Product>()
    .Name("listview")
    .TagName("div")
    .ClientTemplateId("template") // Provide the id of the template from above.
    .Pageable()
    .Editable(editable => editable.TemplateName("ListViewEditor"))
    .DataSource(ds => ds
        .Ajax()
        .Model(model => {
            model.Id(p => p.ProductID);
        })
        .PageSize(18)
        .Create(create => create.Url("/ListView/ListViewCrudOperations?handler=Create").Data("forgeryToken")) // Specify the url to the OnPostCreate method.
        .Read(read => read.Url("/ListView/ListViewCrudOperations?handler=Read").Data("forgeryToken"))
        .Update(update => update.Url("/ListView/ListViewCrudOperations?handler=Update").Data("forgeryToken"))
        .Destroy(destroy => destroy.Url("/ListView/ListViewCrudOperations?handler=Destroy").Data("forgeryToken"))
    )
)

<script>
    function forgeryToken() {
        return kendo.antiForgeryTokens();
    }
    $(document).ready(function () {
        var listView = $("#listview").data("kendoListView");
        $(".k-add-button").click(function (e) {
            listView.add();
            e.preventDefault();
        });
    });
</script>

<style>
    .product-view {
        float: left;
        width: 50%;
        height: 300px;
        box-sizing: border-box;
        border-top: 0;
        position: relative;
    }
        .product-view:nth-child(even) {
            border-left-width: 0;
        }
        .product-view dl {
            margin: 10px 10px 0;
            padding: 0;
            overflow: hidden;
        }
        .product-view dt, dd {
            margin: 0;
            padding: 0;
            width: 100%;
            line-height: 24px;
            font-size: 18px;
        }
        .product-view dt {
            font-size: 11px;
            height: 16px;
            line-height: 16px;
            text-transform: uppercase;
            opacity: 0.5;
        }
        .product-view dd {
            height: 46px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
            .product-view dd .k-widget,
            .product-view dd .k-textbox {
                font-size: 14px;
            }
    #example .k-listview {
        border-width: 1px 0 0;
        padding: 0;
        overflow: hidden;
        min-height: 298px;
    }
    .edit-buttons {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: right;
        padding: 5px;
        background-color: rgba(0,0,0,0.1);
    }
    .k-pager-wrap {
        border-top: 0;
    }
    span.k-invalid-msg {
        position: absolute;
        margin-left: 6px;
    }
    .k-add-button {
        margin-bottom: 2em;
    }
    @@media only screen and (max-width : 620px) {
        .product-view {
            width: 100%;
        }
            .product-view:nth-child(even) {
                border-left-width: 1px;
            }
    }
</style> 
```

```tab-PageModel(cshtml.cs)
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;
using System.Linq;
using Telerik.Examples.RazorPages.Models;

namespace Telerik.Examples.RazorPages.Pages.ListView
{
    public class ListViewCrudOperationsModel : PageModel
    {
        public static IList<Product> products;

        // Add sample data that will be used by the ListView.
        public void OnGet()
        {
            if (products == null)
            {
                products = new List<Product>();

                Enumerable.Range(1, 50).ToList().ForEach(i => products.Add(new Product
                {
                    ProductID = i,
                    ProductName = "Product Name " + i,
                    UnitPrice = i * 10,
                    UnitsInStock = i * 3,
                    Discontinued = i % 2 == 0
                }));
            }
        }

        public JsonResult OnPostRead([DataSourceRequest] DataSourceRequest request)
        {
            return new JsonResult(products.ToDataSourceResult(request));
        }

        public JsonResult OnPostCreate([DataSourceRequest] DataSourceRequest request, Product product)
        {
            // Assign an Id to the newly created item.
            product.ProductID = products.Count + 2;
            products.Add(product);

            return new JsonResult(new[] { product }.ToDataSourceResult(request, ModelState));
        }

        public JsonResult OnPostUpdate([DataSourceRequest] DataSourceRequest request, Product product)
        {
            products.Where(x => x.ProductID == product.ProductID).Select(x => product);

            return new JsonResult(new[] { product }.ToDataSourceResult(request, ModelState));
        }

        public JsonResult OnPostDestroy([DataSourceRequest] DataSourceRequest request, Product product)
        {
            products.Remove(products.FirstOrDefault(x => x.ProductID == product.ProductID));

            return new JsonResult(new[] { product }.ToDataSourceResult(request, ModelState));
        }
    }
}
```

```tab-Product.cs
namespace Telerik.Examples.RazorPages.Models
{
    public class Product
    {
        public int ProductID { get; set; }

        public int CategoryID { get; set; }

        public string ProductName { get; set; }

        public decimal UnitPrice { get; set; }

        public int UnitsInStock { get; set; }

        public bool Discontinued { get; set; }
    }
}
```

```tab-ListViewEditor.cshtml
@model Telerik.Examples.RazorPages.Models.Product 

<div class="product-view k-widget">
    <div class="edit-buttons">
        <a class="k-button k-button-icontext k-update-button" href="\\#"><span class="k-icon k-i-check"></span></a>
        <a class="k-button k-button-icontext k-cancel-button" href="\\#"><span class="k-icon k-i-cancel"></span></a>
    </div>
    <dl>
        <dt>Product Name</dt>
        <dd>
            @(Html.EditorFor(p=>p.ProductName))
            <span data-for="ProductName" class="k-invalid-msg"></span>
        </dd>
        <dt>Unit Price</dt>
        <dd>
            @(Html.EditorFor(p=>p.UnitPrice))
            <span data-for="UnitPrice" class="k-invalid-msg"></span>
        </dd>
        <dt>Units In Stock</dt>
        <dd>
            @(Html.EditorFor(p=>p.UnitsInStock))
            <span data-for="UnitsInStock" class="k-invalid-msg"></span>
        </dd>
        <dt>Discontinued</dt>
        <dd>@(Html.EditorFor(p=>p.Discontinued))</dd>
    </dl>
</div>
```

* [Server-Side API](/api/listview)