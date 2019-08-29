---
title: Overview
page_title: AutoComplete Overview | Telerik UI for ASP.NET Core HTML Helpers
description: "Learn the basics when working with the Telerik UI AutoComplete HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/autocomplete
slug: htmlhelpers_autocomplete_aspnetcore
position: 1
---

# AutoComplete HtmlHelper Overview

The Telerik UI AutoComplete HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI AutoComplete widget.

The AutoComplete provides suggestions depending on the typed text and allows multiple value entries.

* [Demo page for the AutoComplete](https://demos.telerik.com/aspnet-core/autocomplete/index)

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

The following example demonstrates the basic configuration of the AutoComplete HtmlHelper and how to get the AutoComplete instance.

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
        function onAdditionalData() {
            return {
                text: $("#autocomplete").val()
            };
        }

        $(function () {
            // The Name() of the AutoComplete is used to get its client-side instance.
            var autocomplete = $("#autocomplete").data("kendoAutoComplete");
            console.log(autocomplete);
        });
    </script>
```

## Functionality and Features

* [Model binding]({% slug modelbinding_autocomplete_aspnetcore %})
* [Virtualization]({% slug virtualization_autocomplete_aspnetcore %})

## Events

For a complete example on basic AutoComplete events, refer to the [demo on using the events of the AutoComplete](https://demos.telerik.com/aspnet-core/autocomplete/events).

## See Also

* [Basic Usage of the AutoComplete HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/autocomplete/index)
* [Using the API of the AutoComplete HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/autocomplete/api)
* [Server-Side API](/api/autocomplete)
