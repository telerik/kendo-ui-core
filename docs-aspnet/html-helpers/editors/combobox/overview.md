---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ComboBox HtmlHelper for {{ site.framework }}."
previous_url: /helpers/html-helpers/combobox, /helpers/editors/combobox/overview
slug: htmlhelpers_combobox_aspnetcore
position: 0
---

# ComboBox HtmlHelper Overview

The Telerik UI ComboBox HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ComboBox widget.

The ComboBox displays a list of values and allows for a single selection from the list.

* [Demo page for the ComboBox](https://demos.telerik.com/{{ site.platform }}/combobox/index)

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
* [Accessibility]({% slug accessibility_aspnetcore_combobox %})

## Events

You can subscribe to all ComboBox [events](/api/combobox). For a complete example on basic ComboBox events, refer to the [demo on using the events of the ComboBox](https://demos.telerik.com/{{ site.platform }}/combobox/events).

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
            // Handle the select event.
        }

        function combobox_change() {
            // Handle the change event.
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

## See Also

* [Basic Usage of the ComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/combobox)
* [Using the API of the ComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/combobox/api)
* [Server-Side API](/api/combobox)
