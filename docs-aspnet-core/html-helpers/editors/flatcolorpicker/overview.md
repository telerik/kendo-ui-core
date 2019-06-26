---
title: Overview
page_title: FlatColorPicker Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI FlatColorPicker HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_flatcolorpickerhelper_aspnetcore
position: 1
---

# FlatColorPicker HtmlHelper Overview

The FlatColorPicker is the HSV color selector which is used by default in the `kendo.ui.ColorPicker` popup when no palette is set.

The FlatColorPicker HtmlHelper extension is a server-side wrapper for the [Kendo UI FlatColorPicker](http://docs.telerik.com/kendo-ui/api/javascript/ui/flatcolorpicker) widget. For more information on the FlatColorPicker HtmlHelper for ASP.NET MVC, refer to the [UI for ASP.NET MVC documentation](https://docs.telerik.com/aspnet-mvc/helpers/flatcolorpicker/overview).

## Initializing the FlatColorPicker

The following example demonstrates how to define the FlatColorPicker by using the FlatColorPicker HtmlHelper.

```
    @(Html.Kendo().FlatColorPicker()
          .Name("flatcolorpicker") // The name of the FlatColorPicker is mandatory. It specifies the "id" attribute of the widget.
          .Value("#ff0000") // Set the value of the FlatColorPicker.
    )
```

## Events

You can subscribe to all FlatColorPicker [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/flatcolorpicker#events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```
      @(Html.Kendo().FlatColorPicker()
            .Name("flatcolorpicker")
            .Events(e => e
                  .Change("flatcolorpicker_change")
            )
      )
      <script>
          function flatcolorpicker_change(e) {
              //Handle the change event.
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
                  function(e) {
                      // Handle the change event inline.
                  }
                  </text>)
            )
      )
```

## Referencing Existing Instances

To reference an existing Kendo UI FlatColorPicker instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [FlatColorPicker API](https://docs.telerik.com/kendo-ui/api/javascript/ui/flatcolorpicker#methods) to control its behavior.

      // Place this after your Kendo UI FlatColorPicker for ASP.NET Core declaration.
      <script>
      $(function() {
          // The Name() of the FlatColorPicker is used to get its client-side instance.
          var flatcolorpicker = $("#flatcolorpicker").data("kendoFlatColorPicker");
      });
      </script>

## See Also

* [Basic Usage of the FlatColorPicker HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/colorpicker/flatcolorpicker)
* [JavaScript API Reference of the FlatColorPicker](http://docs.telerik.com/kendo-ui/api/javascript/ui/flatcolorpicker)
