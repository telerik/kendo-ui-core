---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI MultiColumnComboBox component for {{ site.framework }}."
previous_url: /helpers/html-helpers/multicolumncombobox, /helpers/editors/multicolumncombobox/overview
slug: htmlhelpers_multicolumncombobox_aspnetcore
position: 0
---

# {{ site.framework }} MultiColumnComboBox Overview

{% if site.core %}
The Telerik UI MultiColumnComboBox TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI MultiColumnComboBox widget.
{% else %}
The Telerik UI MultiColumnComboBox HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI MultiColumnComboBox widget.
{% endif %}

The MultiColumnComboBox visualizes large sets of data in a grid-like table.

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
        public ActionResult Index()
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

            return Json(result, JsonRequestBehavior.AllowGet);
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

| Feature | Description |
|---------|-------------|
| [Data Binding]({% slug htmlhelpers_multicolumncombobox_databinding_aspnetcore %})|The MultiColumnComboBox provides a set of options for binding it to data.|
| [Appearance]({% slug appearance_multicolumncombobox %})|Customize the component appearance based on your requirements.|
| [Columns]({% slug columns_multicolumncombobox_aspnetcore %})|The MultiColumnComboBox allows you to predefine the columns that will be rendered in its drop-down list.|
| [Adaptive Mode]({% slug htmlhelpers_multicolumncombobox_adaptive_mode_aspnetcore %})|Enable the mobile-friendly rendering of the MultiColumnComboBox popup. |
| [Virtualization]({% slug virtualization_multicolumncombobox_aspnetcore %})|Configure the MultiColumnComboBox to use virtualization.|
| [Filtering]({% slug filtering_multicolumncombobox_aspnetcore %})| Enable the filtering functionality of the component.|
| [Grouping]({% slug grouping_multicolumncombobox_aspnetmvc %})| Bind the MultiColumnComboBox to a grouped DataSource. |
| [Floating Label]({% slug htmlhelpers_multicolumncombobox_floatinglabel_aspnetcore %})| Modify the rendering of the component label.|
| [Cascading]({% slug htmlhelpers_multicolumncombobox_cascading %})| Use a series of two or more cascaded MultiColumnComboBoxes.|
| [Prefix and Suffix]({% slug prefix_suffix_multicolumncombobox %})| Enhance the component look and feel by adding prefix and suffix adornments.|
| [Events]({% slug events_multicolumncombobox_aspnetcore %})| Handle the component events and implement any custom functionality.|
| [Accessibility]({% slug accessibility_aspnetcore_multicolumncombobox %})|The MultiColumnComboBox is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.|
| [Cascading]({% slug htmlhelpers_multicolumncombobox_cascading %})|The cascading MultiColumnComboBox is a series of two or more MultiColumnComboBoxes in which each MultiColumnComboBox is filtered according to the selected options that are based on the DataValueField in the previous MultiColumnComboBox.|
| [Templates](https://docs.telerik.com/{{ site.platform }}/html-helpers/editors/multicolumncombobox/templates)|The  MultiColumnComboBox provides capability to fully customize the content presented to the user.|

## Next Steps

* [Getting Started with the MultiColumnComboBox]({% slug multicolumncombobox_getting_started %})
* [Basic Usage of the MultiColumnComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/index)
{% if site.core %}
* [Basic Usage of the MultiColumnComboBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/multicolumncombobox/tag-helper)
* [MultiColumnComboBox in Razor Pages]({% slug htmlhelpers_multicolumncombobox_razorpage_aspnetcore %})
{% endif %}

## See Also

* [Using the API of the MultiColumnComboBox for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/api)
* [Knowledge Base Section](/knowledge-base)
