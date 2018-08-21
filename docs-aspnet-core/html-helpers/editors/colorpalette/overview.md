---
title: Overview
page_title: ColorPalette | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI ColorPalette HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_colorpalettehelper_aspnetcore
position: 1
---

# ColorPalette HtmlHelper Overview

The ColorPalette HtmlHelper extension is a server-side wrapper for the [Kendo UI ColorPalette](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorpalette) widget.

## Configuration

Add the ColorPalette.

###### Example

```
    @(Html.Kendo().ColorPalette()
          .Name("colorpalette") //The name of the ColorPalette is mandatory. It specifies the "id" attribute of the widget.
          .Value("#ff0000") //Set the value of the ColorPalette.
    )
```

## Event Handling

You can subscribe to all ColorPalette [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorpalette#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```
    @(Html.Kendo().ColorPalette()
        .Name("colorpalette")
        .Events(e => e
            .Change("colorpalette_change")
        )
    )
    <script>
        function colorpalette_change(e) {
            // Handle the change event.
            var colorpalette = this;
            console.log(colorpalette.value());
        }
    </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

```
    @(Html.Kendo().ColorPalette()
          .Name("colorpalette")
          .Events(e => e
              .Change(@<text>
                function(e) {
                    // Handle the change event inline.
                    console.log(e.sender.value());
                }
                </text>)
          )
    )
```

## Reference

### Existing Instances

To reference an existing Kendo UI ColorPalette instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ColorPalette API](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorpalette#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI ColorPalette for ASP.NET Core declaration.
        <script>
            $(function() {
                //Notice that the Name() of the ColorPalette is used to get its client-side instance.
                var colorpalette = $("#colorpalette").data("kendoColorPalette");
            });
        </script>

## See Also

* [Overview of UI for ASP.NET Core ColorPicker]({% slug overview_colorpickerhelper_aspnetcore %})
* [Overview of the Kendo UI jQuery ColorPicker Widget](http://docs.telerik.com/kendo-ui/controls/editors/colorpicker/overview)
* [Overview of the UI for ASP.NET Core FlatColorPicker HtmlHelper]({% slug overview_flatcolorpickerhelper_aspnetcore %})
