---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI MultiSelect component for {{ site.framework }}."
previous_url: /helpers/html-helpers/multiselect, /helpers/editors/multiselect/overview
slug: htmlhelpers_multiselect_aspnetcore
position: 1
---

# MultiSelect Overview

{% if site.core %}
The Telerik UI MultiSelect TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI MultiSelect widget.
{% else %}
The Telerik UI MultiSelect HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI MultiSelect widget.
{% endif %}

The MultiSelect displays a list of options and allows multiple selections from this list. The widget represents a richer version of the `<select>` element and provides support for local and remote data binding, item and tag templates, and configurable options for controlling the list behavior.

* [Demo page for the MultiSelect HtmlHelper](https://demos.telerik.com/{{ site.platform }}/multiselect/index)
{% if site.core %}
* [Demo page for the MultiSelect TagHelper](https://demos.telerik.com/aspnet-core/multiselect/tag-helper)
{% endif %}

## Initializing the MultiSelect

The following example demonstrates how to define the MultiSelect.

```HtmlHelper
    @(Html.Kendo().MultiSelect()
        .Name("multiselect")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .Value(new[] { 2, 7 })
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("Products_Read", "Home");
            })
            .ServerFiltering(true);
        })
    )
```
{% if site.core %}
```TagHelper
    <kendo-multiselect name="products" filter="FilterType.StartsWith"></kendo-multiselect>
```
{% endif %}
```Controller
    public class MultiSelectController : Controller
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

The following example demonstrates the basic configuration of the MultiSelect. To get a reference to an existing Telerik UI MultiSelect instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [MultiSelect client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect#methods) to control its behavior.

```HtmlHelper
@(Html.Kendo().MultiSelect()
    .Name("multiselect")
    .DataTextField("ProductName")
    .DataValueField("ProductID")
    .Placeholder("Select product...")
    .ItemTemplate("<span class=\"product-id-id\">#= ProductID #</span> #= ProductName #")
    .Value(new[] { 2, 7 })
    .Height(520)
    .TagMode(MultiSelectTagMode.Single)
    .DataSource(source =>
    {
        source.Read(read =>
        {
            read.Action("Products_Read", "Home");
        })
        .ServerFiltering(true);
    })
    .Events(events => events
        .Change("onChange")
        .Select("onSelect")
        .Deselect("onDeselect")
        .Open("onOpen")
        .Close("onClose")
        .DataBound("onDataBound")
        .Filtering("onFiltering")
    )
)

<script type="text/javascript">
    $(function () {
        // The Name() of the MultiSelect is used to get its client-side instance.
        var multiselect = $("#multiselect").data("kendoMultiSelect");
    });
</script>
```
{% if site.core %}
```TagHelper
    <kendo-multiselect name="products" filter="FilterType.Contains"
                       placeholder="Select product"
                       datatextfield="ProductName"
                       datavaluefield="ProductID"
                       style="width: 100%;">
        <datasource type="DataSourceTagHelperType.Custom">
            <transport>
                <read url="@Url.Action("GetProducts", "Home")" />
            </transport>
        </datasource>
    </kendo-multiselect>
```
{% endif %}

## Functionality and Features

* [Binding]({% slug htmlhelpers_multiselect_databinding_aspnetcore %})
* [Grouping]({% slug htmlhelpers_multiselect_grouping_aspnetcore %})
* [Virtualization]({% slug htmlhelpers_multiselect_virtualization_aspnetcore %})
* [Templates]({% slug htmlhelpers_multiselect_templates_aspnetcore %})
* [Accessibility]({% slug accessibility_aspnetcore_multiselect %})

## Events

You can subscribe to all MultiSelect [events](/api/multiselect). For a complete example on basic MultiSelect events, refer to the [demo on using the events of the MultiSelect](https://demos.telerik.com/{{ site.platform }}/multiselect/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().MultiSelect()
        .Name("multiselect")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select("multiselect_select")
            .Change("multiselect_change")
        )
    )
    <script>
        function multiselect_select() {
            // Handle the select event.
        }

        function multiselect_change() {
            // Handle the change event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().MultiSelect()
        .Name("multiselect")
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

### MultiSelect Down Arrow

To enable the down arrow for toggling the popup container as in the Telerik UI DropDownList, set the DownArrow() option:

```HtmlHelper
     @(Html.Kendo().MultiSelect()
        .Name("movies")
        .DownArrow()
        .BindTo(new List<SelectListItem>()
        {
            new SelectListItem() {
            Text = "12 Angry Men", Value ="1"
            },
            new SelectListItem() {
            Text = "Il buono, il brutto, il cattivo.", Value ="2"
            },
            new SelectListItem() {
            Text = "Inception", Value ="3"
            }
        })
    )
```

## See Also

* [Basic Usage by the MultiSelect HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multiselect/index)
{% if site.core %}
* [Basic Usage of the MultiSelect TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/multiselect/tag-helper)
{% endif %}
* [Using the API of the MultiSelect HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multiselect/api)
* [Server-Side API](/api/multiselect)
