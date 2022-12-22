---
title: Cascading ComboBoxes
page_title: Cascading ComboBoxes
description: "Learn about the Cascading option of the Telerik UI ComboBox component for {{ site.framework }}."
slug: htmlhelpers_combobox_cascading_aspnetcore
position: 6
---

# Cascading

The cascading ComboBox is a series of two or more ComboBox components in which each ComboBox is filtered according to the selected options in the previous ComboBox.

## Basic Configuration

The child ComboBox cascades from the parent one if the `CascadeFrom` option is defined. The `CascadeFrom` option has to point to the parent ID.

```HtmlHelper
    @(Html.Kendo().ComboBox()
          .Name("categories")
          // options removed for clarity
    )

    @(Html.Kendo().ComboBox()
          .Name("products")
          // options removed for clarity
          .DataSource(source => {
              source.Read(read =>
              {
                  read.Action("GetCascadeProducts", "ComboBox")
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


<kendo-combobox name="categories">
</kendo-combobox>

<kendo-combobox name="products"
                enable="false"
                auto-bind="false"
                cascade-from="categories">
    <datasource>
        <transport>
            <read url="@Url.Action("GetCascadeProducts", "ComboBox")" data="filterProducts"/>
        </transport>
    </datasource>
</kendo-combobox>
```
{% endif %}
```JavaScript
    function filterProducts() {
        return {
            categories: $("#categories").val(),
            productFilter: $("#products").data("kendoComboBox").input.val()
        };
    }
```
```Controller
    public JsonResult GetCascadeProducts(int? categories, string productFilter)
    {
        using (var northwind = GetContext())
        {
            var products = northwind.Products.AsQueryable();

            if (categories != null)
            {
                products = products.Where(p => p.CategoryID == categories);
            }

            if (!string.IsNullOrEmpty(productFilter))
            {
                products = products.Where(p => p.ProductName.Contains(productFilter));
            }

            return Json(products.Select(p => new { ProductID = p.ProductID, ProductName = p.ProductName }).ToList());
        }
    }
```

For a runnable example, refer to the [demo on cascading comboboxes](https://demos.telerik.com/{{ site.platform }}/combobox/cascadingcombobox).

## Cascading on Custom Parent Input 

To allow custom input in the ComboBox, set the `CascadeOnCustomValue` of the parent ComboBox in а cascading scenario to `true`. As a result, cascading will be triggered upon custom input in the parent component. When `CascadeOnCustomValue` is set to its default `false` configuration, the child will not cascade and will be disabled upon setting custom input in the parent ComboBox. Cascading on custom values works only when `CascadeFromParentField` is not set for the child component or points to the `DataValueField` of the parent.

When the custom parent input is enabled, the child ComboBox takes the following actions during initialization:

1. Checks if the `cascadeFrom` property is set. If not, cascading is disabled.
1. Tries to find the parent ComboBox object. If the result is `null`, then the functionality is omitted.
1. Listens to any changes of the parent value.
1. If the parent does not have a value, the child is disabled. If the parent has a value, the child is enabled and filters its data accordingly. The filter options are similar to the ones demonstrated in the following example.

> * The cascading functionality works only when you define the `cascadeFrom` property and initialize the parent ComboBox.
> * The `filter` operator is always `"eq"`. To filter the data, the child ComboBox uses the `dataValueField` option of the parent ComboBox.

The following example shows how to implement the cascading functionality of the ComboBox based on custom parent input. 

```HtmlHelper
    @(Html.Kendo().ComboBox()
          .Name("categories")
          .CascadeOnCustomValue(true)
          // options removed for clarity
    )

    @(Html.Kendo().ComboBox()
          .Name("products")
          // options removed for clarity
          .DataSource(source => {
              source.Read(read =>
              {
                  read.Action("GetCascadeProducts", "ComboBox")
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


<kendo-combobox name="categories" cascade-on-custom-value="true">
</kendo-combobox>

<kendo-combobox name="products"
                enable="false"
                auto-bind="false"
                cascade-from="categories">
    <datasource>
        <transport>
            <read url="@Url.Action("GetCascadeProducts", "ComboBox")" data="filterProducts"/>
        </transport>
    </datasource>
</kendo-combobox>
```
{% endif %}

## See Also

* [Cascading ComboBoxes HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/combobox/serverfiltering)
* [Server-Side API](/api/combobox)
