---
title: Overview
page_title: ColorPalette | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI ColorPalette HtmlHelper for ASP.NET MVC."
slug: overview_colorpalettehelper_aspnetmvc
position: 1
---

# ColorPalette HtmlHelper Overview

The Telerik UI ColorPalette HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI ColorPalette widget.

The ColorPalette provides suggestions depending on the typed text and allows multiple value entries.

* [Demo page for the ColorPalette](https://demos.telerik.com/aspnet-mvc/colorpicker/palette)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a ColorPalette.

    ```ASPX
        <%: Html.Kendo().ColorPalette()
                .Name("colorpalette") // The name of the ColorPalette is mandatory. It specifies the "id" attribute of the ColorPalette.
                .Value("#ff0000") // Set the value of the ColorPalette.
        %>
    ```
    ```Razor
        @(Html.Kendo().ColorPalette()
                .Name("colorpalette") // The name of the ColorPalette is mandatory. It specifies the "id" attribute of the ColorPalette.
                .Value("#ff0000") // Set the value of the ColorPalette.
        )
    ```

## Events

You can subscribe to all ColorPalette [events](/api/colorpalette).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().ColorPalette()
            .Name("colorpalette")
            .Events(e => e
                .Change("colorpalette_change")
            )
    %>
    <script>
        function colorpalette_change() {
            // Handle the change event.
        }
    </script>
```
```Razor
    @(Html.Kendo().ColorPalette()
            .Name("colorpalette")
            .Events(e => e
                .Change("colorpalette_change")
            )
    )
    <script>
        function colorpalette_change() {
            // Handle the change event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```Razor
    @(Html.Kendo().ColorPalette()
            .Name("colorpalette")
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

To reference an existing ColorPalette instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ColorPalette client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/colorpalette#methods) to control its behavior.

    // Place the following after the ColorPalette for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the ColorPalette is used to get its client-side instance.
            var colorpalette = $("#colorpalette").data("kendoColorPalette");
        });
    </script>

## See Also

* [Basic Usage of the ColorPalette HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/colorpicker/palette)
* [Using the Palette Presets in the ColorPalette HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/colorpicker/palette-presets)
* [ColorPaletteBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/ColorPaletteBuilder)
* [ColorPalette Server-Side API](/api/colorpalette)
