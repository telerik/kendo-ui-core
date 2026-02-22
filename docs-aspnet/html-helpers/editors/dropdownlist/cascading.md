---
title: Cascading DropDownLists
page_title: Cascading DropDownLists
description: "Learn how to implement a series of two or more Telerik UI DropDownList component for {{ site.framework }} and cascade them."
components: ["dropdownlist"]
slug: htmlhelpers_dropdownlist_cascading_aspnetcore
position: 6
---

# Cascading DropDownLists

The cascading functionality is represented by a series of two or more DropDownLists in which each DropDownList is filtered according to the selected options in the previous DropDownList.

## Basic Concepts and Requirements
{% if site.core %}
The child DropDownList cascades from the parent one if the [`CascadeFrom`](/api/kendo.mvc.ui.fluent/dropdownlistbuilder#cascadefromsystemstring) property is defined. The `CascadeFrom` property must point to the [`Name`]({% slug fundamentals_core %}#basic-configuration) of the parent DropDownList. If the `id` and `name` attributes of the parent DropDownList are different, set the value of the `id` attribute to the `CascadeFrom` option.
{% else %}
The child DropDownList cascades from the parent one if the [`CascadeFrom`](/api/kendo.mvc.ui.fluent/dropdownlistbuilder#cascadefromsystemstring) property is defined. The `CascadeFrom` property must point to the [`Name`]({% slug fundamentals_aspnetmvc %}#basic-configuration) of the parent DropDownList. If the `id` and `name` attributes of the parent DropDownList are different, set the value of the `id` attribute to the `CascadeFrom` option.
{% endif %}

The following actions occur during the initialization of the child DropDownList. The component:

* Checks if the `CascadeFrom` property is defined. If not, the cascading is disabled.
* Searches for the parent DropDownList object. If the result is `null`, the cascading functionality is omitted.
* Listens for changes of the parent value. If the parent does not have a value, the child DropDownList is disabled. If the parent DropDownList has a value, the child is enabled and the data is filtered.

The following example demonstrates the parameters of the request. By default, the DropDownList will initiate a [`GET`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/GET) request method.

        filter[logic]: and
        filter[filters][0][field]: parentID
        filter[filters][0][operator]: eq
        filter[filters][0][value]:

To send additional data through the request, use the [`Data()`](/api/kendo.mvc.ui.fluent/crudoperationbuilder#datasystemstring) method and provide the name of a JavaScript function that returns an object with the additional data.

> * The cascading functionality works only when you define the `CascadeFrom` property and initialize the parent DropDownList.
> * When the cascading DropDownList binds to remote data, ensure server filtering is enabled and the filtering logic is implemented on the server.
> * The filter operator is always `"eq"`. To filter the data, the child DropDownList uses the `DataValueField` option of the parent DropDownList.

The following example demonstrates how to configure the cascading functionality for the {{ site.product_short }} DropDownList:

```HtmlHelper
    <h4>Categories:</h4>
    @(Html.Kendo().DropDownList()
              .Name("categories")
              .HtmlAttributes(new { style = "width:100%" })
              .OptionLabel("Select category...")
              .DataTextField("CategoryName")
              .DataValueField("CategoryId")
              .DataSource(source =>
              {
                  source.Read(read =>
                  {
                      read.Action("Cascading_GetCategories", "DropDownList");
                  });
              })
    )

    <h4 style="margin-top: 2em;">Products:</h4>
    @(Html.Kendo().DropDownList()
              .Name("products")
              .HtmlAttributes(new { style = "width:100%" })
              .OptionLabel("Select product...")
              .DataTextField("ProductName")
              .DataValueField("ProductID")
              .DataSource(source =>
              {
                  source.Read(read =>
                  {
                      read.Action("Cascading_GetProducts", "DropDownList")
                          .Data("filterProducts");
                  })
                  .ServerFiltering(true);
              })
              .Enable(false)
              .AutoBind(false)
              .CascadeFrom("categories")
    )
```
{% if site.core %}
```TagHelper
<kendo-dropdownlist name="categories"
                    datatextfield="ContactName"
                    datavaluefield="CustomerID"
                    option-label="Select category...">

    <datasource>
        <transport>
            <read url="@Url.Action("Cascading_GetCategories", "DropDownList")" />
        </transport>
    </datasource>
</kendo-dropdownlist>

<kendo-dropdownlist name="products"
                    datatextfield="ProductName"
                    datavaluefield="ProductID"
                    option-label="Select product..."
                    enable="false"
                    auto-bind="false"
                    cascade-from="categories">

    <datasource server-filtering="true">
        <transport>
            <read url="@Url.Action("Cascading_GetProducts", "DropDownList")" data="filterProducts" />
        </transport>
    </datasource>
</kendo-dropdownlist>
```
{% endif %}
```JS script
    <script>
        function filterProducts() {
            return {
                categories: $("#categories").val()
            };
        }
    </script>
```
```Controller
    public JsonResult Cascading_GetCategories()
    {
        using (var northwind = GetContext())
        {
            return Json(northwind.Categories
                .Select(c => new { CategoryId = c.CategoryID, CategoryName = c.CategoryName }).ToList(){% if site.mvc %}, JsonRequestBehavior.AllowGet  {% endif %});
        }
    }

    public JsonResult Cascading_GetProducts(int? categories)
    {
        using (var northwind = GetContext())
        {
            var products = northwind.Products.AsQueryable();

            if (categories != null)
            {
                products = products.Where(p => p.CategoryID == categories);
            }

            return Json(products.Select(p => new { ProductID = p.ProductID, ProductName = p.ProductName }).ToList(){% if site.mvc %}, JsonRequestBehavior.AllowGet  {% endif %});
        }
    }
```

> As of the 2025 Q4 Release, the DropDownList will send an additional `cascadeFrom` parameter within the request's payload. This is applicable in scenarios where the [`Data()`](/api/kendo.mvc.ui.fluent/crudoperationbuilder#datasystemstring) configuration method is not explicitly invoked.

The following example demonstrates how to configure the cascading functionality for the {{ site.product_short }} DropDownList, by using the `cascadeFrom` request parameter:

```HtmlHelper
    <h4>Categories:</h4>
    @(Html.Kendo().DropDownList()
              .Name("categories")
              .HtmlAttributes(new { style = "width:100%" })
              .OptionLabel("Select category...")
              .DataTextField("CategoryName")
              .DataValueField("CategoryId")
              .DataSource(source =>
              {
                  source.Read(read =>
                  {
                      read.Action("Cascading_GetCategories", "DropDownList");
                  });
              })
    )

    <h4 style="margin-top: 2em;">Products:</h4>
    @(Html.Kendo().DropDownList()
              .Name("products")
              .HtmlAttributes(new { style = "width:100%" })
              .OptionLabel("Select product...")
              .DataTextField("ProductName")
              .DataValueField("ProductID")
              .DataSource(source =>
              {
                  source.Read(read =>
                  {
                      read.Action("Cascading_GetProducts", "DropDownList");
                  })
                  .ServerFiltering(true);
              })
              .Enable(false)
              .AutoBind(false)
              .CascadeFrom("categories")
    )
```
{% if site.core %}
```TagHelper
<kendo-dropdownlist name="categories"
                    datatextfield="ContactName"
                    datavaluefield="CustomerID"
                    option-label="Select category...">
    <datasource>
        <transport>
            <read url="@Url.Action("Cascading_GetCategories", "DropDownList")" />
        </transport>
    </datasource>
</kendo-dropdownlist>

<kendo-dropdownlist name="products"
                    datatextfield="ProductName"
                    datavaluefield="ProductID"
                    option-label="Select product..."
                    enable="false"
                    auto-bind="false"
                    cascade-from="categories">

    <datasource server-filtering="true">
        <transport>
            <read url="@Url.Action("Cascading_GetProducts", "DropDownList")"/>
        </transport>
    </datasource>
</kendo-dropdownlist>
```
{% endif %}

```Controller
    public JsonResult Cascading_GetCategories()
    {
        using (var northwind = GetContext())
        {
            return Json(northwind.Categories
                .Select(c => new { CategoryId = c.CategoryID, CategoryName = c.CategoryName }).ToList() {% if site.mvc %}, JsonRequestBehavior.AllowGet  {% endif %});
        }
    }

    public JsonResult Cascading_GetProducts(int? cascadeFrom)
    {
        using (var northwind = GetContext())
        {
            var products = northwind.Products.AsQueryable();

            if (cascadeFrom != null)
            {
                products = products.Where(p => p.CategoryID == cascadeFrom);
            }

            return Json(products.Select(p => new { ProductID = p.ProductID, ProductName = p.ProductName }).ToList() {% if site.mvc %}, JsonRequestBehavior.AllowGet  {% endif %});
        }
    }
```

## See Also

* [ASP.NET Core Cascading DropDownList](https://demos.telerik.com/{{ site.platform }}/dropdownlist/cascadingdropdownlist)
* [Grouping by the DropDownList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownlist/grouping)
* [Server-Side API](/api/dropdownlist)
