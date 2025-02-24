---
title: Cascading
page_title: Cascading MultiColumnComboBoxes
description: "Learn how to implement a series of two or more cascading Telerik UI for {{ site.framework }} MultiColumnComboBoxes."
slug: htmlhelpers_multicolumncombobox_cascading
position: 8
---

# Cascading

The cascading feature is a combination of two or more MultiColumnComboBox components, where each MultiColumnComboBox is filtered according to the selected option in the previous MultiColumnComboBox.

## Basic Concepts and Requirements

The child MultiColumnComboBox cascades from the parent one if the `CascadeFrom` option is defined. The `CascadeFrom` option must match the `id` attribute (the `Name` option) of the parent.

During the initialization of the child MultiColumnComboBox, the component performs the following actions:

* Checks if the `CascadeFrom` option is specified. If not, the cascading feature is disabled.
* Finds the parent MultiColumnComboBox object. If it fails, the functionality is omitted.
* Listens to any changes in the parent MultiColumnComboBox value. If the parent component does not have a value, the child is disabled. Otherwise, the child MultiColumnComboBox is enabled and it filters its data. 

When an option is selected in the parent MultiColumnComboBox, the child MultiColumnComboBox is activated and sends a `read` request to the remote endpoint by passing the value of the selected option.

The following example shows the payload of the request sent by the child MultiColumnComboBox.

```     
    filter[filters][0][field]: parentID // "parentID" is the Name() of the parent MultiColumnComboBox.
    filter[filters][0][operator]: eq
    filter[filters][0][value]: slectedOptionValue
    filter[logic]: and
```

> * The cascading functionality works only when you define the `CascadeFrom` property and initialize the parent MultiColumnComboBox.
> * The filter operator is always `"eq"`. 
> * To filter the data, the child MultiColumnComboBox uses the `DataValueField` option of the parent MultiColumnComboBox.

## Basic Configuration

The following example demonstrates how to define two MultiColumnComboBoxes, where the second one cascades from the first one. The value of the selected parent component's option is appended as a query string parameter of the request using the `Data` option of the DataSource.

```HtmlHelper
    // Parent component.
    @(Html.Kendo().MultiColumnComboBox()
        .Name("categories")
        .DataTextField("CategoryName")
        .DataValueField("CategoryId")
        .Columns(columns =>
        {
            columns.Add().Field("CategoryName").Title("Name");
            columns.Add().Field("CategoryId").Title("ID");
        })
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("ReadCategories", "MultiColumnComboBox");
            });
        })
    )

    // Child component.
    @(Html.Kendo().MultiColumnComboBox()
        .Name("products")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .Columns(columns =>
        {
            columns.Add().Field("ProductName").Title("Name");
            columns.Add().Field("ProductID").Title("ID");
        })
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("ReadProducts", "MultiColumnComboBox").Data("filterProducts");
            });
        })
        .Enable(false)
        .AutoBind(false)
        .CascadeFrom("categories")
    )

    <script>
        function filterProducts() {
            return {
                selectedCategory: $("#categories").val() // Pass the value of the parent component to the server.
            };
        }
    </script>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    // Parent component.
    <kendo-multicolumncombobox name="categories" datatextfield="CategoryName" datavaluefield="CategoryId">
        <multicolumncombobox-columns>
            <column field="CategoryName" title="Name">
            </column>
            <column field="CategoryId" title="ID">
            </column>
        </multicolumncombobox-columns>
        <datasource>
            <transport>
                <read url="@Url.Action("ReadCategories", "MultiColumnComboBox")" />
            </transport>
        </datasource>
    </kendo-multicolumncombobox>

    // Child component.
    <kendo-multicolumncombobox name="products" enable="false" auto-bind="false" cascade-from="categories" datatextfield="ProductName" datavaluefield="ProductID">
        <multicolumncombobox-columns>
            <column field="ProductName" title="Name">
            </column>
            <column field="ProductID" title="ID">
            </column>
        </multicolumncombobox-columns>
        <datasource>
            <transport>
                <read data="filterProducts" url="@Url.Action("ReadProducts", "MultiColumnComboBox")" />
            </transport>
        </datasource>
    </kendo-multicolumncombobox>

    <script>
        function filterProducts() {
            return {
                selectedCategory: $("#categories").val() // Pass the value of the parent component to the server.
            };
        }
    </script>
```
```Controller
        public JsonResult ReadCategories()
        {
            using (var northwind = GetContext())
            {
                return Json(northwind
                    .Categories.Select(c => new { CategoryId = c.CategoryID, CategoryName = c.CategoryName }).ToList()
                );
            }
        }

        public JsonResult ReadProducts(int? selectedCategory)
        {
            using (var northwind = GetContext())
            {
                var products = northwind.Products.AsQueryable();

                if (selectedCategory != null)
                {
                    products = products.Where(p => p.CategoryID == selectedCategory);
                }

                return Json(products.Select(p => new { ProductID = p.ProductID, ProductName = p.ProductName }).ToList());
            }
        }
```
{% else %}
```Controller
    public JsonResult ReadCategories()
    {
        var northwind = new DemoDBContext();
        return Json(northwind.Categories.Select(c => new { CategoryId = c.CategoryID, CategoryName = c.CategoryName }), JsonRequestBehavior.AllowGet);
    }

    public JsonResult ReadProducts(int? selectedCategory)
    {
        var northwind = new DemoDBContext();
        var products = northwind.Products.AsQueryable();
        if (selectedCategory != null)
        {
            products = products.Where(p => p.CategoryID == selectedCategory);
        }
        return Json(products.Select(p => new { ProductID = p.ProductID, ProductName = p.ProductName }), JsonRequestBehavior.AllowGet);
    }
```
{% endif %}

## Cascading on Custom Parent Input

To allow custom input in the MultiColumnComboBox, set the `CascadeOnCustomValue` of the parent MultiColumnComboBox in a cascading scenario to `true`. As a result, the cascading will trigger upon custom input in the parent component. When the `CascadeOnCustomValue` is set to its default `false` configuration, the child component will not cascade and it will be disabled upon setting custom input in the parent MultiColumnComboBox. The cascading on custom values works only when the `CascadeFromParentField` is not set for the child component or points to the `DataValueField` of the parent.

The following example shows how to implement the cascading functionality of the MultiColumnComboBox based on custom parent input.

```HtmlHelper
	@(Html.Kendo().MultiColumnComboBox()
        .Name("categories")
        .HtmlAttributes(new { style = "width:100%;" })
        .Placeholder("Select category...")
        .DataTextField("CategoryName")
        .DataValueField("CategoryId")
        .CascadeOnCustomValue(true)
        .Columns(columns =>
        {
            columns.Add().Field("CategoryName").Title("Name");
            columns.Add().Field("CategoryId").Title("ID");
        })
        .Filter(FilterType.Contains)
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("ReadCategories", "MultiColumnComboBox");
            }).ServerFiltering(true);
        })
    )

    @(Html.Kendo().MultiColumnComboBox()
        .Name("products")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .Columns(columns =>
        {
            columns.Add().Field("ProductName").Title("Name");
            columns.Add().Field("ProductID").Title("ID");
        })
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("ReadProducts", "MultiColumnComboBox").Data("filterProducts");
            });
        })
        .Enable(false)
        .AutoBind(false)
        .CascadeFrom("categories")
    )

    <script>
        function filterProducts() {
            return {
                selectedCategory: $("#categories").val()
            };
        }
    </script>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-multicolumncombobox name="categories" cascade-on-custom-value="true" datatextfield="CategoryName" datavaluefield="CategoryId" filter="FilterType.Contains">
        <multicolumncombobox-columns>
            <column field="CategoryName" title="Name">
            </column>
            <column field="CategoryId" title="ID">
            </column>
        </multicolumncombobox-columns>
        <datasource server-filtering="true">
            <transport>
                <read url="@Url.Action("ReadCategories", "MultiColumnComboBox")" />
            </transport>
        </datasource>
    </kendo-multicolumncombobox>

    <kendo-multicolumncombobox name="products" enable="false" auto-bind="false" cascade-from="categories" datatextfield="ProductName" datavaluefield="ProductID">
        <multicolumncombobox-columns>
            <column field="ProductName" title="Name">
            </column>
            <column field="ProductID" title="ID">
            </column>
        </multicolumncombobox-columns>
        <datasource>
            <transport>
                <read data="filterProducts" url="@Url.Action("ReadProducts", "MultiColumnComboBox")" />
            </transport>
        </datasource>
    </kendo-multicolumncombobox>

    <script>
        function filterProducts() {
            return {
                selectedCategory: $("#categories").val()
            };
        }
    </script>
```
```Controller
    public JsonResult ReadCategories(string text)
    {
        using (var northwind = GetContext())
        {
            var categories = northwind.Categories.AsQueryable();

            if (!string.IsNullOrEmpty(text))
            {
                categories = categories.Where(p => p.CategoryName.Contains(text));
            }

            return Json(categories.Select(c => new { CategoryId = c.CategoryId, CategoryName = c.CategoryName }).ToList());
        }
    }

    public JsonResult ReadProducts(string selectedCategory)
    {
        using (var northwind = GetContext())
        {
            var products = northwind.Products.AsQueryable();

            if (!string.IsNullOrEmpty(selectedCategory))
            {
                products = products.Where(p => p.CategoryName.Contains(selectedCategory));
            }

            return Json(products.Select(p => new { ProductID = p.ProductID, ProductName = p.ProductName }).ToList());
        }
    }
```
{% else %}
```Controller
    public JsonResult ReadCategories(string text)
    {
        var northwind = new DemoDBContext();
        var categories = northwind.Categories.AsQueryable();
        if (!string.IsNullOrEmpty(text))
        {
            categories = categories.Where(p => p.CategoryName.Contains(text));
        }
        return Json(categories.Select(c => new { CategoryId = c.CategoryId, CategoryName = c.CategoryName }), JsonRequestBehavior.AllowGet);
    }

    public JsonResult ReadProducts(string selectedCategory)
    {
        var northwind = new DemoDBContext();
        var products = northwind.Products.AsQueryable();
        if (!string.IsNullOrEmpty(selectedCategory))
        {
            products = products.Where(p => p.CategoryName.Contains(selectedCategory));
        }
        return Json(products.Select(p => new { ProductID = p.ProductID, ProductName = p.ProductName }), JsonRequestBehavior.AllowGet);
    }
```
{% endif %}

## See Also

* [Cascading MultiColumnComboBoxes (Demo)](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/cascadingmulticolumncombobox)
* [Server-Side API](https://docs.telerik.com/{{ site.platform }}/api/multicolumncombobox)