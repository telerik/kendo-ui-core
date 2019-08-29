---
title: Overview
page_title: ColorPicker | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI ColorPicker HtmlHelper for ASP.NET MVC."
slug: overview_colorpickerhelper_aspnetmvc
position: 1
---

# ColorPicker HtmlHelper Overview

The Telerik UI ColorPicker HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI ColorPicker widget.

The ColorPicker provides suggestions depending on the typed text and allows multiple value entries.

* [Demo page for the ColorPicker](https://demos.telerik.com/aspnet-mvc/colorpicker)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a ColorPicker.

    ```ASPX
        <%: Html.Kendo().ColorPicker()
                .Name("colorpicker") // The name of the ColorPicker is mandatory. It specifies the "id" attribute of the ColorPicker.
                .Value("#ff0000") // Set the value of the ColorPicker.
        %>
    ```
    ```Razor
        @(Html.Kendo().ColorPicker()
                .Name("colorpicker") // The name of the ColorPicker is mandatory. It specifies the "id" attribute of the ColorPicker.
                .Value("#ff0000") // Set the value of the ColorPicker.
        )
    ```

## Events

You can subscribe to all ColorPicker [events](/api/colorpicker). For a complete example on basic ColorPicker events, refer to the [demo on using the events of the ColorPicker](https://demos.telerik.com/aspnet-mvc/colorpicker/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().ColorPicker()
            .Name("colorpicker")
            .Events(e => e
                .Open("colorpicker_open")
                .Close("colorpicker_close")
                .Select("colorpicker_select")
                .Change("colorpicker_change")
            )
    %>
    <script>
        function colorpicker_open() {
            // Handle the open event.
        }

        function colorpicker_close() {
            // Handle the close event.
        }

        function colorpicker_select() {
            // Handle the select event.
        }

        function colorpicker_change() {
            // Handle the change event.
        }
    </script>
```
```Razor
    @(Html.Kendo().ColorPicker()
          .Name("colorpicker")
          .Events(e => e
                .Open("colorpicker_open")
                .Close("colorpicker_close")
                .Select("colorpicker_select")
                .Change("colorpicker_change")
          )
    )
    <script>
        function colorpicker_open() {
            // Handle the open event.
        }

        function colorpicker_close() {
            // Handle the close event.
        }

        function colorpicker_select() {
            // Handle the select event.
        }

        function colorpicker_change() {
            // Handle the change event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().ColorPicker()
          .Name("colorpicker")
          .Events(e => e
              .Open(@<text>
                function() {
                    // Handle the open event inline.
                }
              </text>)
              .Close(@<text>
                function() {
                    // Handle the close event inline.
                }
                </text>)
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

## Referencing Existing Instances

To reference an existing ColorPicker instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ColorPicker client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/colorpicker#methods) to control its behavior.

    // Place the following after the ColorPicker for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the ColorPicker is used to get its client-side instance.
            var colorpicker = $("#colorpicker").data("kendoColorPicker");
        });
    </script>

## See Also

* [Basic Usage of the ColorPicker HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/colorpicker)
* [ColorPickerBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/ColorPickerBuilder)
* [ColorPicker Server-Side API](/api/colorpicker)
