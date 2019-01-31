---
title: Overview
page_title: ComboBox | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI ComboBox HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/combobox
slug: htmlhelpers_combobox_aspnetcore
position: 0
---

# ComboBox HtmlHelper Overview

The ComboBox HtmlHelper extension is a server-side wrapper for the [Kendo UI ComboBox](http://demos.telerik.com/kendo-ui/combobox/index) widget.

It allows you to configure the Kendo UI ComboBox widget from server-side code. The [ComboBox](http://docs.telerik.com/kendo-ui/controls/editors/combobox/overview) displays a list of values and allows for a single selection from the list. The user input is restricted within the predefined options.

For more information on the HtmlHelper, refer to the article on the [ComboBox HtmlHelper for ASP.NET MVC](https://docs.telerik.com/aspnet-mvc/helpers/combobox/overview).

## Basic Usage

The following example demonstrates how to define the ComboBox by using the ComboBox HtmlHelper.

```Razor
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

## Configuration

The following example demonstrates the basic configuration of the ComboBox HtmlHelper and how to get the ComboBox instance.

```
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
            //Notice that the Name() of the ComboBox is used to get its client-side instance.
            var combobox = $("#combobox").data("kendoComboBox");
            console.log(combobox);
        });
    </script>
```

## Event Handling

You can subscribe to all ComboBox [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/combobox#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

        @(Html.Kendo().ComboBox()
          .Name("combobox")
          .BindTo(new string[] { "Item1", "Item2", "Item3" })
          .Events(e => e
                .Select("combobox_select")
                .Change("combobox_change")
          )
        )
        <script>
        function combobox_select() {
            //Handle the select event.
        }

        function combobox_change() {
            //Handle the change event.
        }
        </script>

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

        @(Html.Kendo().ComboBox()
          .Name("combobox")
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

* [JavaScript API Reference of the ComboBox](http://docs.telerik.com/kendo-ui/api/javascript/ui/combobox)
* [ComboBox HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/combobox/overview)
* [ComboBox Official Demos](http://demos.telerik.com/aspnet-core/combobox/index)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
