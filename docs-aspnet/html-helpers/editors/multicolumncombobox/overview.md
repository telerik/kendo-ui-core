---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI MultiColumnComboBox component for {{ site.framework }}."
previous_url: /helpers/html-helpers/multicolumncombobox, /helpers/editors/multicolumncombobox/overview
slug: htmlhelpers_multicolumncombobox_aspnetcore
position: 1
---

# {{ site.framework }} MultiColumnComboBox Overview

{% if site.core %}
The Telerik UI MultiColumnComboBox TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI MultiColumnComboBox widget.
{% else %}
The Telerik UI MultiColumnComboBox HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI MultiColumnComboBox widget.
{% endif %}

The MultiColumnComboBox visualizes huge sets of data in a grid-like table.

* [Demo page for the MultiColumnComboBox HtmlHelper](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/index)
{% if site.core %}
* [Demo page for the MultiColumnComboBox TagHelper](https://demos.telerik.com/aspnet-core/multicolumncombobox/tag-helper)
{% endif %}
## Initializing the MultiColumnComboBox

The following example demonstrates how to define the MultiColumnComboBox.

{% if site.core %}
```HtmlHelper

    @(Html.Kendo().MultiColumnComboBox()
          .Name("products")
          .Placeholder("Select product")
          .DataTextField("ProductName")
          .DataValueField("ProductID")
          .HtmlAttributes(new { style = "width:100%;" })
          .Filter(FilterType.Contains)
          .AutoBind(false)
          .MinLength(3)
          .DataSource(source => source
              .Read(read => read.Action("GetProducts", "Home"))
          )
    )
```
```TagHelper

    <kendo-multicolumncombobox name="products" filter="FilterType.Contains"
                        placeholder="Select product"
                        datatextfield="ProductName"
                        datavaluefield="ProductID"
                        auto-bind="false"
                        min-length="3" style="width: 100%;">
        <datasource type="DataSourceTagHelperType.Custom">
            <transport>
                <read url="@Url.Action("GetProducts", "Home")" />
            </transport>
        </datasource>
    </kendo-multicolumncombobox>
```
{% else %}
```HtmlHelper
    @(Html.Kendo().MultiColumnComboBox()
        .Name("multicolumncombobox")
        .Placeholder("Select product")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .Columns(columns =>
        {
            columns.Add().Field("ProductName").Title("Product Name").Width("200px")
            columns.Add().Field("ProductID").Title("Product ID").Width("200px");
        })
        .Filter(FilterType.StartsWith)
        .DataSource(source => {
            source.Read(read =>
            {
                read.Action("Products_Read", "MultiColumnComboBox");
            })
            .ServerFiltering(true);
        })
    )

```
```Controller

    public class MultiColumnComboBoxController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult Products_Read(string text)
        {
            var result = GetProducts();

            if (!string.IsNullOrEmpty(text))
            {
                result = result.Where(p => p.ProductName.Contains(text)).ToList();
            }

            return Json(result);
        }

        private static IEnumerable<ProductViewModel> GetProducts()
        {
            var result = Enumerable.Range(0, 50).Select(i => new ProductViewModel
            {
                ProductID = "" + i,
                ProductName = "Product " + i
            });

            return result;
        }
    }
```
{% endif %}

## Basic Configuration

The following example demonstrates the basic configuration of the MultiColumnComboBox.

```HtmlHelper
    @(Html.Kendo().MultiColumnComboBox()
        .Name("multicolumncombobox")
        .Placeholder("Select product")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .Columns(columns =>
        {
            columns.Add().Field("ProductName").Title("Product Name").Width("200px")
            columns.Add().Field("ProductID").Title("Product ID").Width("200px");
        })
        .HtmlAttributes(new { style = "width:100%;" })
        .Filter("contains")
        .AutoBind(true)
        .MinLength(3)
        .Height(400)
        .DataSource(source => source
            .Read(read => read.Action("Products_Read", "MultiColumnComboBox"))
            .ServerFiltering(true)
        )
    )
```
{% if site.core %}
```TagHelper
     <kendo-multicolumncombobox auto-bind="false" height="400" datatextfield="ProductName" datavaluefield="ProductID" min-length="3" placeholder="Select product" filter="FilterType.Contains" name="products" style="width:100%;">
        <multicolumncombobox-columns>
            <column field="ProductName" title="Name" width="200px">
            </column>
            <column field="ProductID" title="ID" width="200px">
            </column>
        </multicolumncombobox-columns>
        <datasource server-filtering="true">
            <transport>
                <read url="@Url.Action("Products_Read", "MultiColumnComboBox")" />
            </transport>
        </datasource>
    </kendo-multicolumncombobox>
```
{% endif %}

## Functionality and Features

* [Data binding]({% slug htmlhelpers_multicolumncombobox_databinding_aspnetcore %})
* [Columns]({% slug columns_multicolumncombobox_aspnetcore %})
* [Filtering]({% slug filtering_multicolumncombobox_aspnetcore %})
* [Virtualization]({% slug virtualization_multicolumncombobox_aspnetcore %})
* [Accessibility]({% slug accessibility_aspnetcore_multicolumncombobox %})

## Events

For a complete example on basic MultiColumnComboBox events, refer to the [demo on using the events of the MultiColumnComboBox](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/events).

## Referencing Existing Instances

To reference an existing MultiColumnComboBox instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [MultiColumnComboBox client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox#methods) to control its behavior.

```
    // Place the following after your Telerik UI MultiColumnComboBox for {{ site.framework }} declaration.
    <script>
        $(document).ready(function() {
            // The Name() of the MultiColumnComboBox is used to get its client-side instance.
            var mccombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
        });
    </script>
```

## See Also

* [Basic Usage of the MultiColumnComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/index)
{% if site.core %}
* [Basic Usage of the MultiColumnComboBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/multicolumncombobox/tag-helper)
{% endif %}
* [Using the API of the MultiColumnComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/api)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox)
* [Server-Side API](/api/multicolumncombobox)
