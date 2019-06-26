---
title: Overview
page_title: ComboBox Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI ComboBox HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/combobox
slug: htmlhelpers_combobox_aspnetcore
position: 0
---

# ComboBox HtmlHelper Overview

The [ComboBox](http://docs.telerik.com/kendo-ui/controls/editors/combobox/overview) displays a list of values and allows for a single selection from the list.

The user input is restricted within the predefined options.

The ComboBox HtmlHelper extension is a server-side wrapper for the [Kendo UI ComboBox](http://demos.telerik.com/kendo-ui/combobox/index) widget. For more information on the ComboBox HtmlHelper for ASP.NET MVC, refer to the [UI for ASP.NET MVC documentation](https://docs.telerik.com/aspnet-mvc/helpers/combobox/overview).

## Initializing the ComboBox

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

## Basic Configuration

The following example demonstrates the basic configuration of the ComboBox HtmlHelper.

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
            // The Name() of the ComboBox is used to get its client-side instance.
            var combobox = $("#combobox").data("kendoComboBox");
            console.log(combobox);
        });
    </script>
```

## Functionality and Features

* [Binding]({% slug htmlhelpers_combobox_databinding_aspnetcore %})
* [Grouping]({% slug htmlhelpers_combobox_grouping_aspnetcore %})
* [Virtualization]({% slug htmlhelpers_combobox_virtualization_aspnetcore %})
* [Templates]({% slug htmlhelpers_combobox_templates_aspnetcore %})

## Events

You can subscribe to all ComboBox [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/combobox#events). For a complete example on basic ComboBox events, refer to the [demo on using the events of the ComboBox](https://demos.telerik.com/aspnet-core/combobox/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

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

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

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

* [Basic Usage of the ComboBox HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/combobox)
* [Using the API of the ComboBox HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/combobox/api)
* [JavaScript API Reference of the ComboBox](http://docs.telerik.com/kendo-ui/api/javascript/ui/combobox)
