---
title: MultiSelect
page_title: MultiSelect | UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the MultiSelect HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_multiselect_aspnetcore
---

# MultiSelect HtmlHelper Overview

The MultiSelect HtmlHelper extension is a server-side wrapper for the [Kendo UI MultiSelect](http://demos.telerik.com/kendo-ui/multiselect/index).

It allows you to configure the Kendo UI MultiSelect widget from server-side code. The [MultiSelect](http://docs.telerik.com/kendo-ui/controls/editors/multiselect/overview) displays a list of options and allows multiple selections from this list. The widget represents a richer version of the `<select>` element and provides support for local and remote data binding, item and tag templates, and configurable options for controlling the list behavior.

For more information on the HtmlHelper, refer to the article on the [MultiSelect HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/multiselect/overview).

## Basic Usage

The following example demonstrates how to define the MultiSelect by using the MultiSelect HtmlHelper.

###### Example

```tab-Razor
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
```tab-Controller
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

## Configuration

The following example demonstrates the basic configuration of the MultiSelect HtmlHelper and how to get the MultiSelect instance.

```tab-Razor
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
            //Notice that the Name() of the MultiSelect is used to get its client-side instance.
            var multiselect = $("#multiselect").data("kendoMultiSelect");
            console.log(multiselect);
        });
    </script>
```

## See Also

* [JavaScript API Reference of the MultiSelect](http://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect)
* [MultiSelect HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/multiselect/overview)
* [MultiSelect Official Demos](http://demos.telerik.com/aspnet-core/multiselect/index)
* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
