---
title: Overview
page_title: ColorPicker Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI ColorPicker HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_colorpickerhelper_aspnetcore
position: 1
---

# ColorPicker HtmlHelper Overview

The ColorPicker enables the user to select and submit color values.

The ColorPicker HtmlHelper extension is a server-side wrapper for the [Kendo UI ColorPicker](https://demos.telerik.com/kendo-ui/colorpicker/index) widget. For more information on the ColorPicker HtmlHelper for ASP.NET MVC, refer to the [UI for ASP.NET MVC documentation](https://docs.telerik.com/aspnet-mvc/helpers/colorpicker/overview).

## Initializing the ColorPicker

The following example demonstrates how to define the ColorPicker by using the ColorPicker HtmlHelper.

```
    @(Html.Kendo().ColorPicker()
          .Name("colorpicker") //The name of the ColorPicker is mandatory. It specifies the "id" attribute of the widget.
          .Value("#ff0000") //Set the value of the ColorPicker.
    )
```

## Events

You can subscribe to all ColorPicker [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorpicker#events). For a complete example on basic ColorPicker events, refer to the [demo on using the events of the ColorPicker](https://demos.telerik.com/aspnet-core/colorpicker/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```
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
        // The ColorPicker instance is available as an e.sender or this.
        function colorpicker_open(e) {
            // Handle the open event.
        }

        function colorpicker_close(e) {
            // Handle the close event.
        }

        function colorpicker_select(e) {
            // Handle the select event.
        }

        function colorpicker_change(e) {
            // Handle the change event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```
    @(Html.Kendo().ColorPicker()
          .Name("colorpicker")
          .Events(e => e
              .Open(@<text>
                function(e) {
                    //Handle the open event inline.
                }
              </text>)
              .Close(@<text>
                function(e) {
                    //Handle the close event inline.
                }
                </text>)
              .Select(@<text>
                function(e) {
                    //Handle the select event inline.
                }
                </text>)
              .Change(@<text>
                function(e) {
                    //Handle the change event inline.
                }
                </text>)
          )
    )
```

## Referencing Existing Instances

To reference an existing Kendo UI ColorPicker instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ColorPicker API](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorpicker#methods) to control its behavior.

        // Place this after your Kendo UI ColorPicker for ASP.NET Core declaration.
        <script>
        $(function() {
            // The Name() of the ColorPicker is used to get its client-side instance.
            var colorpicker = $("#colorpicker").data("kendoColorPicker");
        });
        </script>

## See Also

* [Basic Usage of the ColorPicker HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/colorpicker/index)
* [JavaScript API Reference of the ColorPicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorpicker)
