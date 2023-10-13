---
title: Overview
page_title: Overview
description: "Discover the Telerik UI ComboBox component for {{ site.framework }} and its features like the built-in virtualization, customization, grouping and filtering."
previous_url: /helpers/html-helpers/combobox, /helpers/editors/combobox/overview
slug: htmlhelpers_combobox_aspnetcore
position: 0
---

# {{ site.framework }} ComboBox Overview

{% if site.core %}
The Telerik UI ComboBox TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI ComboBox widget.
{% else %}
The Telerik UI ComboBox HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ComboBox widget.
{% endif %}

The ComboBox displays a list of values and allows for a single selection from the list.

* [Demo page for the ComboBox HtmlHelper](https://demos.telerik.com/{{ site.platform }}/combobox/index)
{% if site.core %}
* [Demo page for the ComboBox TagHelper](https://demos.telerik.com/aspnet-core/combobox/tag-helper)
{% endif %}

## Initializing the ComboBox

The following example demonstrates how to define the ComboBox.

```HtmlHelper
    @(Html.Kendo().ComboBox()
        .Name("combobox")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .DataSource(source => {
            source.Read(read =>
            {
                read.Action("Products_Read", "ComboBox");
            });
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-combobox name="combobox"
                datatextfield="ProductName"
                datavaluefield="ProductID">
    <datasource>
        <transport>
            <read url="@Url.Action("Products_Read", "ComboBox")"/>
        </transport>
    </datasource>
</kendo-combobox>
```
{% endif %}
```Controller

    public class ComboBoxController : Controller
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

The following example demonstrates the basic configuration of the ComboBox.

{% if site.core %}
```HtmlHelper
    @(Html.Kendo().ComboBox()
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
    @addTagHelper *, <<Your Project Name Goes Here>>

    <kendo-combobox name="products" filter="FilterType.Contains"
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
    </kendo-combobox>
```
```Controller
    public JsonResult GetProducts()
    {
        return new JsonResult(new[] { new { ProductName = "ProductName 1", ProductID = 1} });
    }
```
{% else %}
```HtmlHelper
    @(Html.Kendo().ComboBox()
        .Name("combobox")
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
            // The Name() of the ComboBox is used to get its client-side instance.
            var combobox = $("#combobox").data("kendoComboBox");
            console.log(combobox);
        });
    </script>
```
{% endif %}

## Functionality and Features

|Feature|Description|
|------|------|
| [Binding]({% slug htmlhelpers_combobox_databinding_aspnetcore %})|You can bind the ComboBox to local arrays of data and to remote data services.
| [Appearance]({% slug appearance_combobox_aspnetcore %})|You can customize the appearance of the ComboBox by configuring its size, fill mode, and border radius.
| [Grouping]({% slug htmlhelpers_combobox_grouping_aspnetcore %})|In the ComboBox, you can display data items that are grouped by a specific model field.
| [Virtualization]({% slug htmlhelpers_combobox_virtualization_aspnetcore %})|The built-in virtualization of the ComboBox allows you to display large datasets.|
| [Filtering]({% slug htmlhelpers_combobox_filtering_aspnetcore %})| You can display only a subset of the available data by using the server-side filtering of the ComboBox.|
| [Templates]({% slug htmlhelpers_combobox_templates_aspnetcore %})|To take full control over the rendering of the ComboBox items, popup header, and popup footer, you can use the available templates.|
| [Cascading]({% slug htmlhelpers_combobox_cascading_aspnetcore %})|You can use a series of two or more cascaded ComboBoxes.|
| [Accessibility]({% slug accessibility_aspnetcore_combobox %})|The ComboBox is accessible by screen readers and provides WAI-ARIA, Section 508, WCAG 2.2, and keyboard support.|

>tip To learn more about the appearance, anatomy, and accessibility of the ComboBox, visit the [Progress Design System documentation](https://www.telerik.com/design-system/docs/components/combobox/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

## Next Steps

* [Getting Started with the ComboBox]({% slug aspnetcore_combobox_getting_started %})
* [Basic Usage of the ComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/combobox/index)
{% if site.core %}
* [Basic Usage of the ComboBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/combobox/tag-helper)
{% endif %}

## See Also

* [Using the API of the ComboBox for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/combobox/api)
* [Knowledge Base Section](/knowledge-base)
