---
title: Events
page_title: TimeDurationPicker Events
description: "Learn how to handle the events of the Telerik UI TimeDurationPicker component for {{ site.framework }}."
slug: htmlhelpers_timedurationpickerhelper_events
position: 7
---

# TimeDurationPicker Events

You can subscribe to the `Open`, `Close`, and `Change` [TimeDurationPicker events](/api/Kendo.Mvc.UI.Fluent/TimeDurationPickerEventBuilder) and further customize the functionality of the component.

For a complete example on basic TimeDurationPicker events, refer to the [demo on using the events of the TimeDurationPicker](https://demos.telerik.com/{{ site.platform }}/timedurationpicker/events).

## Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().TimeDurationPicker()
        .Name("timeDurationPicker")
        .Columns(c =>
        {
            c.Hours().Format("## hours ");
            c.Minutes().Format(" ## minutes");
        })
        .Events(e => e.Open("onOpen").Close("onClose").Change("onChange"))
    )
```
{% if site.core %}
```TagHelper
        <kendo-timedurationpicker name="timedurationpicker" on-open="onOpen" on-close="onClose" on-change="onChange">
            <timedurationpicker-columns>
                <timedurationpicker-column name="hours" format="## hours "></timedurationpicker-column>
                <timedurationpicker-column name="minutes" format=" ## minutes"></timedurationpicker-column>
            </timedurationpicker-columns>
        </kendo-timedurationpicker>
```
{% endif %}
```script
    <script>
        function timedurationpicker_open(e) {
            // Handle the open event.
        }

        function timedurationpicker_close(e) {
            // Handle the close event.
        }

        function timedurationpicker_change(e) {
            // Handle the change event.
        }
    </script>
```

## Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().TimeDurationPicker()
          .Name("timedurationpicker")
          .Events(e => e
              .Open(@<text>
                function(e) {
                    // Handle the open event inline.
                }
              </text>)
			  .Close(@<text>
                function(e) {
                    // Handle the close event inline.
                }
              </text>)
              .Change(@<text>
                function(e) {
                    // Handle the change event inline.
                }
                </text>)
          )
    )
```
{% if site.core %}
```TagHelper
    <kendo-timedurationpicker name="timedurationpicker"
        on-open='function(e)
        {
            // Handle the open event inline.
        }'
		on-close='function(e)
        {
            // Handle the close event inline.
        }'
        on-change='function(e)
        {
            // Handle the change event inline.
        }'/>
```
{% endif %}

## Next Steps

* [Using the TimeDurationPicker Events (Demo)](https://demos.telerik.com/{{ site.platform }}/timedurationpicker/events)

## See Also

* [Using the API of the TimeDurationPicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timedurationpicker/api)
* [Configuring the TimeDurationPicker Columns]({% slug htmlhelpers_timedurationpickerhelper_columns %})
