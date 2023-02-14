---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI FlatColorPicker component for {{ site.framework }}."
previous_url: /helpers/editors/flatcolorpicker/overview
slug: overview_flatcolorpickerhelper_aspnetcore
position: 1
---

# {{ site.framework }} FlatColorPicker Overview

{% if site.core %}
The Telerik UI FlatColorPicker TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI FlatColorPicker widget.
{% else %}
The Telerik UI FlatColorPicker HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI FlatColorPicker widget.
{% endif %}

The FlatColorPicker is the HSV color selector which is used by default in the `kendo.ui.ColorPicker` popup when no palette is set.

* [Demo page for the FlatColorPicker](https://demos.telerik.com/{{ site.platform }}/colorpicker/flatcolorpicker)

## Initializing the FlatColorPicker

The following example demonstrates how to define the FlatColorPicker.

```HtmlHelper
    @(Html.Kendo().FlatColorPicker()
          .Name("flatcolorpicker") // The name of the FlatColorPicker is mandatory. It specifies the "id" attribute of the widget.
          .Value("#ff0000") // Set the value of the FlatColorPicker.
    )
```

## Events

You can subscribe to all FlatColorPicker [events](/api/flatcolorpicker).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
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
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers

<script>
        function change(e) {
             console.log("Change in picker #" + this.element.attr("id") + " :: " + e.value);
        }
</script>

<kendo-flatcolorpicker name="flatColorPicker" value="#00f" on-change="change">
</kendo-flatcolorpicker>
```
{% endif %}

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
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

* [Basic Usage of the FlatColorPicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/flatcolorpicker)
* [Server-Side API](/api/flatcolorpicker)
