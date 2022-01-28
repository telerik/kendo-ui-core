---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI AutoComplete HtmlHelper for {{ site.framework }}."
previous_url: /helpers/html-helpers/autocomplete, /helpers/editors/autocomplete/overview
slug: htmlhelpers_autocomplete_aspnetcore
position: 1
---

# AutoComplete HtmlHelper Overview

The Telerik UI AutoComplete HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI AutoComplete widget.

The AutoComplete provides suggestions depending on the typed text and allows multiple value entries.

* [Demo page for the AutoComplete](https://demos.telerik.com/{{ site.platform }}/autocomplete/index)

## Initializing the AutoComplete

The following example demonstrates how to define the AutoComplete by using the AutoComplete HtmlHelper.

```Razor
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

The following example demonstrates the basic configuration of the AutoComplete HtmlHelper.

```
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

## Functionality and Features

* [Data binding]({% slug htmlhelpers_autocomplete_databinding_aspnetcore %})
* [Grouping]({% slug htmlhelpers_autocomplete_grouping_aspnetcore %})
* [Templates]({% slug htmlhelpers_autocomplete_templates_aspnetcore %})
* [Virtualization]({% slug virtualization_autocomplete_aspnetcore %})
* [Accessibility]({% slug accessibility_aspnetcore_autocomplete %})

## Events

For a complete example on basic AutoComplete events, refer to the [demo on using the events of the AutoComplete](https://demos.telerik.com/{{ site.platform }}/autocomplete/events).

## Referencing Existing Instances

To reference an existing AutoComplete instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [AutoComplete client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/autocomplete#methods) to control its behavior.

```
    // Place the following after your Telerik UI AutoComplete for {{ site.framework }} declaration.
    <script>
        $(document).ready(function() {
            // The Name() of the AutoComplete is used to get its client-side instance.
            var autocomplete = $("#autocomplete").data("kendoAutoComplete");
        });
    </script>
```

## See Also

* [Basic Usage of the AutoComplete HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/autocomplete/index)
* [Using the API of the AutoComplete HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/autocomplete/api)
* [Server-Side API](/api/autocomplete)
