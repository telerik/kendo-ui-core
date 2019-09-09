---
title: Overview
page_title: MultiColumnComboBox Overview | Telerik UI for ASP.NET Core HTML Helpers
description: "Learn the basics when working with the Telerik UI MultiColumnComboBox HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/multicolumncombobox
slug: htmlhelpers_multicolumncombobox_aspnetcore
position: 1
---

# MultiColumnComboBox HtmlHelper Overview

The Telerik UI MultiColumnComboBox HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI MultiColumnComboBox widget.

The MultiColumnComboBox visualizes huge sets of data in a grid-like table.

* [Demo page for the MultiColumnComboBox](https://demos.telerik.com/aspnet-core/multicolumncombobox/index)

## Initializing the MultiColumnComboBox

The following example demonstrates how to define the MultiColumnComboBox HtmlHelper.

```Razor
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

## Basic Configuration

The following example demonstrates the basic configuration of the MultiColumnComboBox HtmlHelper.

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

## Functionality and Features

* [Data binding]({% slug htmlhelpers_multicolumncombobox_databinding_aspnetcore %})
* [Columns]({% slug columns_multicolumncombobox_aspnetcore %})
* [Filtering]({% slug filtering_multicolumncombobox_aspnetcore %})
* [Virtualization]({% slug virtualization_multicolumncombobox_aspnetcore %})
* [Accessibility]({% slug accessibility_aspnetcore_multicolumncombobox %})

## Events

For a complete example on basic MultiColumnComboBox events, refer to the [demo on using the events of the MultiColumnComboBox](https://demos.telerik.com/aspnet-core/multicolumncombobox/events).

## Referencing Existing Instances

To reference an existing MultiColumnComboBox instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [MultiColumnComboBox API](https://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox) to control its behavior.

```
    // Place the following after your Telerik UI MultiColumnComboBox for ASP.NET Core declaration.
    <script>
        $(document).ready(function() {
            // The Name() of the MultiColumnComboBox is used to get its client-side instance.
            var mccombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
        });
    </script>
```

## See Also

* [Basic Usage of the MultiColumnComboBox HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/multicolumncombobox/index)
* [Using the API of the MultiColumnComboBox HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/multicolumncombobox/api)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/multicolumncombobox)
* [Server-Side API](/api/multicolumncombobox)
