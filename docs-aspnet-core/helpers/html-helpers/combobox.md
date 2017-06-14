---
title: ComboBox
page_title: ComboBox | UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the ComboBox HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_combobox_aspnetcore
---

# ComboBox HtmlHelper Overview

The ComboBox HtmlHelper extension is a server-side wrapper for the [Kendo UI ComboBox](http://demos.telerik.com/kendo-ui/combobox/index).

It enables you to configure the Kendo UI ComboBox widget from server-side code. The [ComboBox](http://docs.telerik.com/kendo-ui/controls/editors/combobox/overview) enables the user to enter custom values through the keyboard. It represents a richer version of the ```<select>``` element and provides support for local and remote data binding, item templates, and configurable options for controlling the list behavior.

For more information on the HtmlHelper, refer to the article on the [ComboBox HtmlHelper for ASP.NET MVC](http://demos.telerik.com/aspnet-mvc/combobox/index).

## Basic Usage

The following example demonstrates how to define the ComboBox by using the ComboBox HtmlHelper.

###### Example

```tab-Razor

    @(Html.Kendo().ComboBox()
        .Name("combobox")
        .Placeholder("Select product")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .Filter(FilterType.StartsWith)
        .DataSource(source => {
            source.Read(read =>
            {
                read.Action("Products_Read", "ComboBox");
            })
            .ServerFiltering(true);
        })
    )

```
```tab-Controller

    public class ComboBoxController : Controller
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

## Configuration

The following example demonstrates the basic configuration of the ComboBox HtmlHelper and how to get the ComboBox instance.

```tab-Razor

    @(Html.Kendo().ComboBox()
        .Name("combobox")
        .Placeholder("Select product")
        .DataTextField("ProductName")
        .DataValueField("ProductID")
        .HtmlAttributes(new { style = "width:100%;" })
        .Filter("contains")
        .AutoBind(true)
        .MinLength(3)
        .Height(400)
        .DataSource(source => source
            .Read(read => read.Action("Products_Read", "ComboBox"))
            .ServerFiltering(true)
        )
        .Events(events => events
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
            //Notice that the Name() of the ComboBox is used to get its client-side instance.
            var combobox = $("#combobox").data("kendoComboBox");
            console.log(combobox);
        });
    </script>

```

## See Also

* [JavaScript API Reference of the ComboBox](http://docs.telerik.com/kendo-ui/api/javascript/ui/combobox)
* [ComboBox HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/combobox/overview)
* [ComboBox Official Demos](http://demos.telerik.com/aspnet-core/combobox/index)
* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})