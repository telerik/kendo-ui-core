---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI DropDownList component for {{ site.framework }}."
previous_url: /helpers/html-helpers/dropdownlist, /helpers/editors/dropdownlist/overview
slug: htmlhelpers_dropdownlist_aspnetcore
position: 0
---

# DropDownList Overview

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

* [Binding]({% slug htmlhelpers_dropdownlist_ajaxbinding_aspnetcore %})
* [Grouping]({% slug htmlhelpers_dropdownlist_grouping_aspnetcore %})
* [Virtualization]({% slug htmlhelpers_dropdownlist_virtualization_aspnetcore %})
* [Templates]({% slug htmlhelpers_dropdownlist_templates_aspnetcore %})
* [Accessibility]({% slug accessibility_aspnetcore_dropdownlist %})

## Events

You can subscribe to all DropDownList events. For a complete example on basic DropDownList events, refer to the [demo on using the events of the DropDownList](https://demos.telerik.com/{{ site.platform }}/dropdownlist/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().DropDownList()
        .Name("dropdownlist")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select("dropdownlist_select")
            .Change("dropdownlist_change")
        )
    )
```
{% if site.core %}
```TagHelper

@{ 
    var Items = new string[] { "Item1", "Item2", "Item3" };
}

<kendo-dropdownlist name="dropdownlist"
                    bind-to="Items"
                    on-select="dropdownlist_select"
                    on-change="dropdownlist_change">
</kendo-dropdownlist>
```
{% endif %}
```script.js
    <script>
    function dropdownlist_select() {
        // Handle the select event.
    }

    function dropdownlist_change() {
        // Handle the change event.
    }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().DropDownList()
        .Name("dropdownlist")
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

### Getting the current value

The following example demonstrates how to get the current value of a Kendo UI DropDownList in the Change Event handler.

```HtmlHelper
    @(Html.Kendo().DropDownList()
        .Name("dropdownlist")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
        .Change("dropdownlist_change")
        )
    )
```
{% if site.core %}
```TagHelper

@{ 
    var Items = new string[] { "Item1", "Item2", "Item3" };
}

<kendo-dropdownlist name="dropdownlist"
                    bind-to="Items"
                    on-change="dropdownlist_change">
</kendo-dropdownlist>
```
{% endif %}
```script.js
    <script>
        function dropdownlist_change(e) {
            console.log(e.sender.value());
        }
    </script>
```
## Referencing Existing Instances

To reference an existing Telerik UI DropDownList instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [DropDownList client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist#methods) to control its behavior.

        // Place the following after your Telerik UI DropDownList for {{ site.framework }} declaration.
        <script>
        $(function() {
        // The Name() of the DropDownList is used to get its client-side instance.
        var dropdownlist = $("#productDropDownList").data("kendoDropDownList");
        });
        </script>

## See Also

* [Basic Usage of the DropDownList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownlist)
{% if site.core %}
* [Basic Usage of the DropDownList TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/dropdownlist/tag-helper)
{% endif %}
* [Using the API of the DropDownList HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/dropdownlist/api)
* [Server-Side API](/api/dropdownlist)
