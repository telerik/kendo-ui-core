---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI FlatFlatColorPicker component for {{ site.framework }}."
slug: events_flatcolorpicker
position: 6
---

# Events

The FlatColorPicker for {{ site.framework }} exposes the [`Change()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/flatcolorpickereventbuilder#changesystemstring) event that you can use to further manipulate the component or other HTML elements as per your requirements.

For a complete example on FlatColorPicker events, refer to the [demo on using the events of the FlatColorPicker](https://demos.telerik.com/{{ site.platform }}/flatcolorpicker/events).

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
        // The FlatColorPicker instance is available as an e.sender or this.
        function flatcolorpicker_change(e) {
            // Handle the change event.
        }
    </script>
```
{% if site.core %}
```TagHelper
        <kendo-flatcolorpicker name="flatcolorpicker" on-change="flatcolorpicker_change" >
		</kendo-flatcolorpicker>

    <script>
        // The FlatColorPicker instance is available as an e.sender or this.
        function flatcolorpicker_change(e) {
            // Handle the change event.
        }
    </script>
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
                    //Handle the change event inline.
                }
                </text>)
          )
    )
```
{% if site.core %}
```TagHelper
    <kendo-flatcolorpicker name="flatcolorpicker" 
                       on-change="function(){
                           // Handle the change event.
                       }">
    </kendo-flatcolorpicker>
```
{% endif %}

## Next Steps

* [Using the FlatColorPicker Events (Demo)](https://demos.telerik.com/{{ site.platform }}/flatcolorpicker/events)

## See Also

* [Using the API of the FlatColorPicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/flatcolorpicker/api)
* [FlatColorPicker Server-Side API for {{ site.framework}}](/api/flatcolorpicker)
* [FlatColorPicker Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/flatcolorpicker)

