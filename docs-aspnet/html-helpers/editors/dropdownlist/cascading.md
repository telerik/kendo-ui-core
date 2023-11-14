---
title: Cascading DropDownLists
page_title: Cascading DropDownLists
description: "Learn how to implement a series of two or more Telerik UI DropDownList component for {{ site.framework }} and cascade them."
slug: htmlhelpers_dropdownlist_cascading_aspnetcore
position: 6
---

# Cascading DropDownLists

The cascading functionality is represented by a series of two or more DropDownLists in which each DropDownList is filtered according to the selected options in the previous DropDownList.

## Basic Concepts and Requirements
{% if site.core %}
The child DropDownList cascades from the parent one if the [`CascadeFrom`](/api/kendo.mvc.ui.fluent/dropdownlistbuilder#cascadefromsystemstring) property is defined. the `CascadeFrom` property has to point to the [`Name`]({% slug fundamentals_core %}#basic-configuration) of the parent DropDownList widget.
{% else %}
The child DropDownList cascades from the parent one if the [`CascadeFrom`](/api/kendo.mvc.ui.fluent/dropdownlistbuilder#cascadefromsystemstring) property is defined. the `CascadeFrom` property has to point to the [`Name`]({% slug fundamentals_aspnetmvc %}#basic-configuration) of the parent DropDownList widget.
{% endif %}

The following actions occur during initialization of the child DropDownList. The child {{ site.product_short }} DropDownList:
- checks if the `CascadeFrom` property is set. If not, cascading is disabled.
- tries to find the parent DropDownList object. If the result is `null`, then the functionality is omitted.
- listens to any changes of the parent value.
- is disabled if the parent does not have a value. If the parent has a value, the child is enabled and filters its data accordingly. The following example demonstrates the parameters of the request.

        filter[logic]: and
        filter[filters][0][field]: parentID
        filter[filters][0][operator]: eq
        filter[filters][0][value]:

Additional data can be sent with the request by [using the Data method]({% slug htmlhelpers_datasource_aspnetcore %}#pass-additional-data-to-action-methods) and providing the name of a JavaScript function which will return a JavaScript object with the additional data.

> * The cascading functionality works only when you define the `CascadeFrom` property and initialize the parent DropDownList.
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
```script
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
                .Select(c => new { CategoryId = c.CategoryID, CategoryName = c.CategoryName }).ToList());
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

            return Json(products.Select(p => new { ProductID = p.ProductID, ProductName = p.ProductName }).ToList());
        }
    }
```

## See Also

* [Grouping by the DropDownList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownlist/grouping)
* [Server-Side API](/api/dropdownlist)
