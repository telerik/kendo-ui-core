---
title: Overview
page_title: FlatColorPicker Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI FlatColorPicker HtmlHelper for ASP.NET MVC."
slug: overview_flatcolorpickerhelper_aspnetmvc
position: 1
---

# FlatColorPicker HtmlHelper Overview

The Telerik UI FlatColorPicker HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI FlatColorPicker widget.

The FlatColorPicker is the HSV color selector which is used by default in the `kendo.ui.ColorPicker` popup when no palette is set.

* [Demo page for the FlatColorPicker](https://demos.telerik.com/aspnet-mvc/colorpicker/flatcolorpicker)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a FlatColorPicker.

    ```ASPX
        <%: Html.Kendo().FlatColorPicker()
            .Name("flatcolorpicker") // The name of the FlatColorPicker is mandatory. It specifies the "id" attribute of the FlatColorPicker.
            .Value("#ff0000") // Set the value of the FlatColorPicker.
        %>
    ```
    ```Razor
        @(Html.Kendo().FlatColorPicker()
            .Name("flatcolorpicker") // The name of the FlatColorPicker is mandatory. It specifies the "id" attribute of the FlatColorPicker.
            .Value("#ff0000") // Set the value of the FlatColorPicker.
        )
    ```

## Events

You can subscribe to all FlatColorPicker [events](/api/flatcolorpicker).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().FlatColorPicker()
        .Name("flatcolorpicker")
        .Events(e => e
            .Change("flatcolorpicker_change")
        )
    %>
    <script>
        function flatcolorpicker_change() {
            // Handle the change event.
        }
    </script>
```
```Razor
    @(Html.Kendo().FlatColorPicker()
        .Name("flatcolorpicker")
        .Events(e => e
            .Change("flatcolorpicker_change")
        )
    )
    <script>
        function flatcolorpicker_change() {
            // Handle the change event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```
    @(Html.Kendo().FlatColorPicker()
        .Name("flatcolorpicker")
        .Events(e => e
            .Change(@<text>
                function() {
                    // Handle the change event inline.
                }
            </text>)
        )
    )
```

## Referencing Existing Instances

To reference an existing Kendo UI FlatColorPicker instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [FlatColorPicker client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/flatcolorpicker#methods) to control its behavior.

    // Place the following after the FlatColorPicker for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the FlatColorPicker is used to get its client-side instance.
            var flatcolorpicker = $("#flatcolorpicker").data("kendoFlatColorPicker");
        });
    </script>

## See Also

* [Basic Usage of the FlatColorPicker HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/colorpicker/flatcolorpicker)
* [FlatColorPickerBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/FlatColorPickerBuilder)
* [FlatColorPicker Server-Side API](/api/flatcolorpicker)
