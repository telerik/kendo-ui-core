---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ComboBox component for {{ site.framework }}."
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

* [Binding]({% slug htmlhelpers_combobox_databinding_aspnetcore %})
* [Appearance]({% slug appearance_combobox_aspnetcore %})
* [Grouping]({% slug htmlhelpers_combobox_grouping_aspnetcore %})
* [Virtualization]({% slug htmlhelpers_combobox_virtualization_aspnetcore %})
* [Filtering]({% slug htmlhelpers_combobox_filtering_aspnetcore %})
* [Templates]({% slug htmlhelpers_combobox_templates_aspnetcore %})
* [Cascading]({% slug htmlhelpers_combobox_cascading_aspnetcore %})
* [Accessibility]({% slug accessibility_aspnetcore_combobox %})

## Events

You can subscribe to all ComboBox [events](/api/combobox). For a complete example on basic ComboBox events, refer to the [demo on using the events of the ComboBox](https://demos.telerik.com/{{ site.platform }}/combobox/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().ComboBox()
        .Name("combobox")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select("combobox_select")
            .Change("combobox_change")
        )
    )
```
{% if site.core %}
```TagHelper
@{ 
    var items = new string[] { "Item 1", "Item 2", "Item 3" };
}
<kendo-combobox name="combobox"
                bind-to="items"
                on-select="combobox_select"
                on-change="combobox_change">
</kendo-combobox>
```
{% endif %}
```script
    <script>
    function combobox_select() {
        // Handle the select event.
    }

    function combobox_change() {
        // Handle the change event.
    }

    $(document).ready(function() {
        var comboBoxWidget = $("#combobox").data("kendoComboBox"); //Get an instance of the ComboBox.
        comboBoxWidget.value("Item3"); //Set the value of the ComboBox programmatically when the page has finished loading.
        comboBoxWidget.trigger("change"); //Trigger the "change" event manually (the value() method does not trigger it). Refer to the client-side API for further details.
    });
    </script>
```
### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().ComboBox()
        .Name("combobox")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select(@<text>
            function() {
                // Handle the select event inline.
            }
            </text>)
            .Change(@<text>
            function() {
                // Handle the change event inline.
            }
            </text>)
        )
    )
```

## See Also

* [Basic Usage of the ComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/combobox)
{% if site.core %}
* [Basic Usage of the ComboBox TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/combobox/tag-helper)
{% endif %}
* [Using the API of the ComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/combobox/api)
* [Server-Side API](/api/combobox)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox)
