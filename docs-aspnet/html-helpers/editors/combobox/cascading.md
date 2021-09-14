---
title: Cascading ComboBoxes
page_title: Cascading ComboBoxes
description: "Learn about the Cascading option of the Telerik UI ComboBox HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_combobox_cascading_aspnetcore
position: 6
---

# Cascading

The cascading ComboBox is a series of two or more ComboBox widgets in which each ComboBox is filtered according to the selected options in the previous ComboBox.

## Basic configuration

The child ComboBox cascades from the parent one if the `CascadeFrom` option is defined. The `CascadeFrom` option has to point to the parent ID.

```cshtml
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


The child ComboBox takes the following actions during initialization:

* Checks if the cascadeFrom property is set. If not, cascading is disabled.
* Tries to find the parent ComboBox object. If the result is null, then the functionality is omitted.
* Listens to any changes of the parent value.
* If the parent does not have a value, the child is disabled. If the parent has a value, the child is enabled and filters its data accordingly. The filter options are similar to the ones demonstrated in the following example.

> * The cascading functionality works only when you define the cascadeFrom property and initialize the parent ComboBox.
> * The filter operator is always "eq". To filter the data, the child ComboBox uses the dataValueField option of the parent ComboBox.

## See Also

* [Cascading ComboBoxes HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/combobox/serverfiltering)
* [Server-Side API](/api/combobox)
