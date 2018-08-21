---
title: Overview
page_title: ColorPicker | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI ColorPicker HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_colorpickerhelper_aspnetcore
position: 1
---

# ColorPicker HtmlHelper Overview

The ColorPicker HtmlHelper extension is a server-side wrapper for the [Kendo UI ColorPicker](https://demos.telerik.com/kendo-ui/colorpicker/index) widget.

## Configuration

Add the ColorPicker.

###### Example

```
    @(Html.Kendo().ColorPicker()
          .Name("colorpicker") //The name of the ColorPicker is mandatory. It specifies the "id" attribute of the widget.
          .Value("#ff0000") //Set the value of the ColorPicker.
    )
```

## Event Handling

You can subscribe to all ColorPicker [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorpicker#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

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
        // the ColorPicker instance is available as e.sender or this
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

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

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

## Reference

### Existing Instances

To reference an existing Kendo UI ColorPicker instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ColorPicker API](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorpicker#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI ColorPicker for ASP.NET Core declaration.
        <script>
        $(function() {
            //Notice that the Name() of the ColorPicker is used to get its client-side instance.
            var colorpicker = $("#colorpicker").data("kendoColorPicker");
        });
        </script>

## See Also

* [Overview of UI for ASP.NET Core ColorPalette]({% slug overview_colorpalettehelper_aspnetcore %})
* [UI for ASP.NET Core ColorPicker live demo](https://demos.telerik.com/aspnet-core/colorpicker/index)
* [Overview of the Kendo UI ColorPicker Widget](http://docs.telerik.com/kendo-ui/controls/editors/colorpicker/overview)
* [Overview of the UI for ASP.NET Core FlatColorPicker HtmlHelper]({% slug overview_flatcolorpickerhelper_aspnetcore %})
