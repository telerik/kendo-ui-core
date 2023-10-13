---
title: Overview
page_title: Overview
description: "Learn more about the Telerik UI AutoComplete component for {{ site.framework }} and its various features like virtualization, data binding options, and accessibility support."
previous_url: /helpers/html-helpers/autocomplete, /helpers/editors/autocomplete/overview
slug: htmlhelpers_autocomplete_aspnetcore
position: 0
---

# {{ site.framework }} AutoComplete Overview

{% if site.core %}
The Telerik UI AutoComplete TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI AutoComplete widget.
{% else %}
The Telerik UI AutoComplete HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI AutoComplete widget.
{% endif %}

The AutoComplete provides suggestions depending on the typed text and allows multiple value entries.

* [Demo page for the AutoComplete HtmlHelper](https://demos.telerik.com/{{ site.platform }}/autocomplete/index)
{% if site.core %}
* [Demo page for the AutoComplete TagHelper](https://demos.telerik.com/aspnet-core/autocomplete/tag-helper)
{% endif %}

## Initializing the AutoComplete

The following example demonstrates how to define the AutoComplete.

```HtmlHelper
    @(Html.Kendo().AutoComplete()
        .Name("autocomplete")
        .DataTextField("ProductName")
        .Filter("contains")
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Products_Read", "AutoComplete")
                    .Data("onAdditionalData");
            })
            .ServerFiltering(true);
        })
    )

    <script type="text/javascript">
        function onAdditionalData() {
            return {
                text: $("#autocomplete").val()
            };
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-autocomplete name="products" filter="FilterType.StartsWith"></kendo-autocomplete>
```
{% endif %}
```Controller

    public class AutoCompleteController : Controller
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

## Basic Configuration

The following example demonstrates the basic configuration of the AutoComplete.

{% if site.core %}
```HtmlHelper

    @(Html.Kendo().AutoComplete()
          .Name("products2")
          .DataTextField("ProductName")
          .Filter("contains")
          .MinLength(3)
          .HtmlAttributes(new { style = "width:100%" })
          .DataSource(source =>
          {
              source
                  .Read(read =>
                  {
                      read.Action("GetProducts", "Home")
                      .Data("onAdditionalData");
                  })
                  .ServerFiltering(true);
          })
    )

    <script>
        function onAdditionalData() {
            return {
                text: $("#products").val() // sends the typed value from the AutoComplete to the server
            };
        }
    </script>
```
```TagHelper

    <kendo-autocomplete name="products" filter="FilterType.Contains"
                        datatextfield="ProductName"
                        min-length="3" style="width: 100%;">
        <datasource type="DataSourceTagHelperType.Custom" server-filtering="true">
            <transport>
                <read url="@Url.Action("GetProducts", "Home")" data="onAdditionalData" />
            </transport>
        </datasource>
    </kendo-autocomplete>

    <script>
        function onAdditionalData() {
            return {
                text: $("#products").val() // sends the typed value from the AutoComplete to the server
            };
        }
    </script>
```
```Controller
    public JsonResult GetProducts(string text)
    {
        // filter the data based on the text value
        // return an IEnumerable collection to the view     
        return Json(products.ToList());
    }
```
{% else %}
```HtmlHelper
    @(Html.Kendo().AutoComplete()
        .Name("autocomplete")
        .DataTextField("ProductName")
        .Placeholder("Type a product name")
        .Template("#= ProductID # | For: #= ProductName #")
        .HeaderTemplate("<div class=\"dropdown-header k-widget k-header\">" +
                            "<span>Products</span>" +
                        "</div>")
        .FooterTemplate("Total <strong>#: instance.dataSource.total() #</strong> items found")
        .Filter("contains")
        .MinLength(3)
        .HtmlAttributes(new { style = "width:100%" })
        .Height(520)
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Products_Read", "Home")
                    .Data("onAdditionalData");
            })
            .ServerFiltering(true);
        })
    )

    <script type="text/javascript">
        function onAdditionalData() {
            return {
                text: $("#autocomplete").val()
            };
        }
    </script>
```
{% endif %}

## Functionality and Features

* [Data binding]({% slug htmlhelpers_autocomplete_databinding_aspnetcore %})—The AutoComplete supports multiple data binding approaches: server, model, custom, and ajax binding. 
* [Grouping]({% slug htmlhelpers_autocomplete_grouping_aspnetcore %})—You can group the data that is displayed in the AutoComplete.
* [Templates]({% slug htmlhelpers_autocomplete_templates_aspnetcore %})—To take full control over the rendering of the AutoComplete items, popup header, and popup footer, you can use the available templates.
* [Virtualization]({% slug virtualization_autocomplete_aspnetcore %})—The built-in virtualization allows you to display large datasets.
* [Accessibility]({% slug accessibility_aspnetcore_autocomplete %})—The AutoComplete is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

## Next Steps

* [Getting Started with the AutoComplete]({% slug aspnetcore_autocomplete_getting_started %})
* [Basic Usage of the AutoComplete HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/autocomplete/index)
{% if site.core %}
* [Basic Usage of the AutoComplete TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/autocomplete/tag-helper)
{% endif %}

## See Also

* [Using the API of the AutoComplete for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/autocomplete/api)
* [Knowledge Base Section](/knowledge-base)
