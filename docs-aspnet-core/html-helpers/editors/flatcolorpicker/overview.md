---
title: Overview
page_title: FlatColorPicker | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI FlatColorPicker HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_flatcolorpickerhelper_aspnetcore
position: 1
---

# FlatColorPicker HtmlHelper Overview

The FlatColorPicker HtmlHelper extension is a server-side wrapper for the [Kendo UI FlatColorPicker](http://docs.telerik.com/kendo-ui/api/javascript/ui/flatcolorpicker) widget.

## Configuration

Add the FlatColorPicker.

###### Example

```
    @(Html.Kendo().FlatColorPicker()
          .Name("flatcolorpicker") //The name of the FlatColorPicker is mandatory. It specifies the "id" attribute of the widget.
          .Value("#ff0000") //Set the value of the FlatColorPicker.
    )
```

## Event Handling

You can subscribe to all FlatColorPicker [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/flatcolorpicker#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

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

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

```
      @(Html.Kendo().FlatColorPicker()
            .Name("flatcolorpicker")
            .Events(e => e
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

To reference an existing Kendo UI FlatColorPicker instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [FlatColorPicker API](https://docs.telerik.com/kendo-ui/api/javascript/ui/flatcolorpicker#methods) to control its behavior.

###### Example

      //Put this after your Kendo UI FlatColorPicker for ASP.NET Core declaration.
      <script>
      $(function() {
          //Notice that the Name() of the FlatColorPicker is used to get its client-side instance.
          var flatcolorpicker = $("#flatcolorpicker").data("kendoFlatColorPicker");
      });
      </script>

## See Also

* [FlatColorPicker JavaScript API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/flatcolorpicker)
* [Overview of the Kendo UI jQuery ColorPicker Widget](http://docs.telerik.com/kendo-ui/controls/editors/colorpicker/overview)
* [Overview of UI for ASP.NET Core ColorPicker]({% slug overview_colorpickerhelper_aspnetcore %})
* [Overview of UI for ASP.NET Core ColorPalette]({% slug overview_colorpalettehelper_aspnetcore %})
