---
title: Overview
page_title: MultiSelect | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI MultiSelect HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/multiselect
slug: htmlhelpers_multiselect_aspnetcore
position: 1
---

# MultiSelect HtmlHelper Overview

The MultiSelect HtmlHelper extension is a server-side wrapper for the [Kendo UI MultiSelect](http://demos.telerik.com/kendo-ui/multiselect/index) widget.

It allows you to configure the Kendo UI MultiSelect widget from server-side code. The [MultiSelect](http://docs.telerik.com/kendo-ui/controls/editors/multiselect/overview) displays a list of options and allows multiple selections from this list. The widget represents a richer version of the `<select>` element and provides support for local and remote data binding, item and tag templates, and configurable options for controlling the list behavior.

## Basic Usage

The following example demonstrates how to define the MultiSelect by using the MultiSelect HtmlHelper.

```Razor
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

## Configuration

The following example demonstrates the basic configuration of the MultiSelect HtmlHelper. To get a reference to an existing Kendo UI MultiSelect instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [MultiSelect API](http://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect#methods) to control its behavior.

```
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
    });
</script>
```

## Event Handling

You can subscribe to all MultiSelect [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

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
            //Handle the select event.
        }

        function multiselect_change() {
            //Handle the change event.
        }
    </script>


### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

    @(Html.Kendo().MultiSelect()
        .Name("multiselect")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select(@<text>
                function() {
                    //Handle the select event inline.
                }
            </text>)
            .Change(@<text>
                function() {
                    //Handle the change event inline.
                }
            </text>)
        )
    )

## See Also

* [JavaScript API Reference of the MultiSelect](http://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect)
* [MultiSelect HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/multiselect/overview)
* [MultiSelect Official Demos](http://demos.telerik.com/aspnet-core/multiselect/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
