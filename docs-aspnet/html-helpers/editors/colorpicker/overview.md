---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ColorPicker HtmlHelper for {{ site.framework }}."
previous_url: /helpers/editors/colorpicker/overview
slug: overview_colorpickerhelper_aspnetcore
position: 1
---

# ColorPicker HtmlHelper Overview

The Telerik UI ColorPicker HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ColorPicker widget.

The ColorPicker is a drop-down list for selecting colors.

* [Demo page for the ColorPicker](https://demos.telerik.com/{{ site.platform }}/colorpicker/index)

## Initializing the ColorPicker

The following example demonstrates how to define the ColorPicker by using the ColorPicker HtmlHelper.

```
    @(Html.Kendo().ColorPicker()
          .Name("colorpicker") // The name of the ColorPicker is mandatory. It specifies the "id" attribute of the widget.
          .Value("#ff0000") // Set the value of the ColorPicker.
    )
```

## Events

You can subscribe to all ColorPicker [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorpicker#events). For a complete example on basic ColorPicker events, refer to the [demo on using the events of the ColorPicker](https://demos.telerik.com/{{ site.platform }}/colorpicker/events).

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

To reference an existing Kendo UI ColorPicker instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ColorPicker client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorpicker#methods) to control its behavior.

        // Place the following after the ColorPicker for {{ site.framework }} declaration.
        <script>
        $(function() {
            // The Name() of the ColorPicker is used to get its client-side instance.
            var colorpicker = $("#colorpicker").data("kendoColorPicker");
        });
        </script>

## See Also

* [Basic Usage of the ColorPicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/colorpicker/index)
* [Server-Side API](/api/colorpicker)
