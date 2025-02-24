---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI ColorPicker component for {{ site.framework }}."
slug: events_colorpicker
position: 8
---

# Events

The ColorPicker for {{ site.framework }} exposes the [`Change()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/colorpickereventbuilder#changesystemstring), [`Select()`](https://docs.telerik.com/{{ site.platform }}api/kendo.mvc.ui.fluent/colorpickereventbuilder#selectsystemstring), [`Open()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/colorpickereventbuilder#opensystemstring), and the [`Close()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/colorpickereventbuilder#closesystemstring) events that you can use to further manipulate the component or other HTML elements as per your requirements.

For a complete example on ColorPicker events, refer to the [demo on using the events of the ColorPicker](https://demos.telerik.com/{{ site.platform }}/colorpicker/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
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
{% if site.core %}
```TagHelper
        <kendo-colorpicker name="colorpicker" on-select="colorpicker_select" on-change="colorpicker_change" on-open="colorpicker_open" on-close="colorpicker_close">
		</kendo-colorpicker>

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
{% endif %}

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
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
{% if site.core %}
```TagHelper
    <kendo-colorpicker name="colorpicker" 
                       on-select="function(){
                          // Handle the select event.
                       }" 
                       on-change="function(){
                           // Handle the change event.
                       }"
                       on-open="function(){
                           // Handle the open event.
                       }" 
                       on-close="function(){
                           // Handle the close event.
                       }">
    </kendo-colorpicker>
```
{% endif %}

## Next Steps

* [Using the ColorPicker Events (Demo)](https://demos.telerik.com/{{ site.platform }}/colorpicker/events)

## See Also

* [Using the API of the ColorPicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/colorpicker/api)
* [ColorPicker Server-Side API for {{ site.framework}}](/api/colorpicker)
* [ColorPicker Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/colorpicker)

