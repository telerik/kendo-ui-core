---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI FlatColorPicker HtmlHelper for {{ site.framework }}."
previous_url: /helpers/editors/flatcolorpicker/overview
slug: overview_flatcolorpickerhelper_aspnetcore
position: 1
---

# FlatColorPicker HtmlHelper Overview

The Telerik UI FlatColorPicker HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI FlatColorPicker widget.

The FlatColorPicker is the HSV color selector which is used by default in the `kendo.ui.ColorPicker` popup when no palette is set.

* [Demo page for the FlatColorPicker](https://demos.telerik.com/{{ site.platform }}/colorpicker/flatcolorpicker)

## Initializing the FlatColorPicker

The following example demonstrates how to define the FlatColorPicker by using the FlatColorPicker HtmlHelper.

```
    @(Html.Kendo().FlatColorPicker()
          .Name("flatcolorpicker") // The name of the FlatColorPicker is mandatory. It specifies the "id" attribute of the widget.
          .Value("#ff0000") // Set the value of the FlatColorPicker.
    )
```

## Events

You can subscribe to all FlatColorPicker [events](/api/flatcolorpicker).

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

To reference an existing Telerik UI FlatColorPicker instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [FlatColorPicker client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/flatcolorpicker#methods) to control its behavior.

      // Place the following after your Telerik UI FlatColorPicker for {{ site.framework }} declaration.
      <script>
      $(function() {
          // The Name() of the FlatColorPicker is used to get its client-side instance.
          var flatcolorpicker = $("#flatcolorpicker").data("kendoFlatColorPicker");
      });
      </script>

## See Also

* [Basic Usage of the FlatColorPicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/colorpicker/flatcolorpicker)
* [Server-Side API](/api/flatcolorpicker)
