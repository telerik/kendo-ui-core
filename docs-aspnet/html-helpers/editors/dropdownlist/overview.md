---
title: Overview
page_title: Overview
description: "Discover the Telerik UI DropDownList component for {{ site.framework }} and its features like virtualization, grouping, data binding options, and more."
previous_url: /helpers/html-helpers/dropdownlist, /helpers/editors/dropdownlist/overview
slug: htmlhelpers_dropdownlist_aspnetcore
position: 0
---

# {{ site.framework }} DropDownList Overview

{% if site.core %}
The Telerik UI DropDownList TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI DropDownList widget.
{% else %}
The Telerik UI DropDownList HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI DropDownList widget.
{% endif %}

The DropDownList displays a list of values and allows for a single selection from the list. The user input is restricted within the predefined options.

* [Demo page for the DropDownList HtmlHelper](https://demos.telerik.com/{{ site.platform }}/dropdownlist/index)
{% if site.core %}
* [Demo page for the DropDownList TagHelper](https://demos.telerik.com/aspnet-core/dropdownlist/tag-helper)
{% endif %}

## Initializing the DropDownList

The following example demonstrates how to define the DropDownList.

```HtmlHelper
    @(Html.Kendo().DropDownList()
        .Name("dropdownlist")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .DataSource(source => {
            source.Read(read =>
            {
                read.Action("Products_Read", "DropDownList");
            });
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-dropdownlist name="dropdownlist"
                    datatextfield="ProductName"
                    datavaluefield="ProductID">
    <datasource>
        <transport>
            <read url="@Url.Action("Products_Read", "DropDownList")" />
        </transport>
    </datasource>
</kendo-dropdownlist>
```
{% endif %}
```Controller

    public class DropDownListController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult Products_Read()
        {
            var result = Enumerable.Range(0, 50).Select(i => new ProductViewModel
            {
                ProductID = "" + i,
                ProductName = "Product " + i
            });

            return Json(result);
        }
    }
```

## Basic Configuration

The DropDownList configuration options are passed as attributes.

{% if site.core %}
```HtmlHelper
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
```TagHelper
    <kendo-dropdownlist name="products" filter="FilterType.Contains"
                        placeholder="Select product"
                        datatextfield="ProductName"
                        datavaluefield="ProductID"
                        style="width: 100%;">
        <datasource>
            <transport>
                <read url="@Url.Action("GetProducts", "Home")" />
            </transport>
        </datasource>
    </kendo-dropdownlist>
```
```Controller
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
{% else %}
```HtmlHelper
    @(Html.Kendo().DropDownList()
        .Name("dropdownlist")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .HtmlAttributes(new { style = "width:100%" })
        .Filter("contains")
        .MinLength(3)
        .Height(290)
        .HeaderTemplate(
            "<div class=\"dropdown-header k-widget k-header\">" +
                "<span>Products</span>" +
            "</div>")
        .FooterTemplate("Total <strong>#: instance.dataSource.total() #</strong> items found")
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Products_Read2", "DropDownList");
            })
            .ServerFiltering(false);
        })
        .Events(e => e
            .Change("onChange")
            .Select("onSelect")
            .Open("onOpen")
            .Close("onClose")
            .DataBound("onDataBound")
            .Filtering("onFiltering")
        )
    )

    <script type="text/javascript">
        $(function () {
            // The Name() of the DropDownList is used to get its client-side instance.
            var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
            console.log(dropdownlist);
        });
    </script>
```
{% endif %}

## Functionality and Features

* [Binding]({% slug htmlhelpers_dropdownlist_ajaxbinding_aspnetcore %})—The DropDownList supports multiple data binding approaches: server, model, custom, and ajax binding. 
* [Grouping]({% slug htmlhelpers_dropdownlist_grouping_aspnetcore %})—You can bind the DropDownList to grouped data sources.
* [Virtualization]({% slug htmlhelpers_dropdownlist_virtualization_aspnetcore %})—The virtualization feature of the DropDownList allows you to display large datasets.
* [Templates]({% slug htmlhelpers_dropdownlist_templates_aspnetcore %})—To control how the items, selected value, or a pop-up header are rendered, you can use the available templates.
* [Accessibility]({% slug accessibility_aspnetcore_dropdownlist %})—The DropDownList is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.

>tip To learn more about the appearance, anatomy, and accessibility of the DropDownList, visit the [Progress Design System documentation](https://www.telerik.com/design-system/docs/components/dropdownlist/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

## Next Steps

* [Getting Started with the DropDownList]({% slug aspnetcore_dropdownlist_getting_started %})
* [Basic Usage of the DropDownList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownlist/index)
{% if site.core %}
* [Basic Usage of the DropDownList TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/dropdownlist/tag-helper)
{% endif %}

## See Also

* [Using the API of the DropDownList for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownlist/api)
* [Knowledge Base Section](/knowledge-base)
