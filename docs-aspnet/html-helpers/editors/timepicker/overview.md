---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI TimePicker component for {{ site.framework }}."
previous_url: /helpers/editors/timepicker/overview
slug: overview_timepickerhelper_aspnetcore
position: 1
---

# {{ site.framework }} TimePicker Overview

{% if site.core %}
The Telerik UI TimePicker TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI TimePicker widget.
{% else %}
The Telerik UI TimePicker HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI TimePicker widget.
{% endif %}

The TimePicker enables users to select time values from a predefined list or enter new ones.

* [Demo page for the TimePicker](https://demos.telerik.com/{{ site.platform }}/timepicker/index)
{% if site.core %}
* [Demo page for the TimePicker](https://demos.telerik.com/aspnet-core/timepicker/tag-helper)
{% endif %}

## Initializing the TimePicker

The following example demonstrates how to how to define the TimePicker.

```HtmlHelper
    @(Html.Kendo().TimePicker()
        .Name("timepicker") // The name of the TimePicker is mandatory. It specifies the "id" attribute of the widget.
        .Value(DateTime.Now) // Set the value of the TimePicker.
    )
```
{% if site.core %}
```TagHelper
    <kendo-timepicker name="timepicker" value="DateTime.Now"></kendo-timepicker>
```

## Basic Configuration

The TimePicker TagHelper configuration options are passed as attributes.

```HtmlHelper

        @(Html.Kendo().TimePicker()
                .Name("end")
                .Value("8:30 AM")
                .Min("8:00 AM")
                .Max("7:30 AM")
        )
```
```TagHelper

        <kendo-timepicker name="end" value="new DateTime(1900, 1, 1, 8, 30, 0)"
            min="new DateTime(1900, 1, 1, 8, 0, 0)" max="new DateTime(1900, 1, 1, 7, 30, 0)">
        </kendo-timepicker>
```

{% endif %}

## Functionality and Features

* [Selected times]({% slug htmlhelpers_timepicker_aspnetcore_selectedtimes %})
* [Formats]({% slug formats_timepicker_aspnetcore %})
* [Validation]({% slug htmlhelpers_timepicker_aspnetcore_validation %})
* [Globalization]({% slug globalization_timepicker_aspnetcore %})
* [Accessibility]({% slug accessibility_timepicker_aspnetcore %})

## Events

You can subscribe to all TimePicker events. For a complete example on basic TimePicker events, refer to the [demo on using the events of the TimePicker](https://demos.telerik.com/{{ site.platform }}/timepicker/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().TimePicker()
          .Name("timepicker")
          .Events(e => e
                .Open("timepicker_open")
                .Close("timepicker_close")
                .Change("timepicker_change")
          )
    )
```
{% if site.core %}
```TagHelper
    <kendo-timepicker name="timepicker"
        on-open="timepicker_open"
        on-close="timepicker_close"
        on-change="timepicker_change"/>
```
{% endif %}
```script
    <script>
        function timepicker_open(e) {
            // Handle the open event.
        }

        function timepicker_close(e) {
            // Handle the close event.
        }

        function timepicker_change(e) {
            // Handle the change event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().TimePicker()
          .Name("timepicker")
          .Events(e => e
              .Open(@<text>
                function(e) {
                    // Handle the open event inline.
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
    <kendo-timepicker name="timepicker"
        on-open='function(e)
        {
            // Handle the open event inline.
        }'
        on-change='function(e)
        {
            // Handle the change event inline.
        }'/>
```
{% endif %}

## Referencing Existing Instances

To reference an existing Telerik UI TimePicker instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [TimePicker client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/timepicker#methods) to control its behavior.

```
    // Place the following after the TimePicker for {{ site.framework }} declaration.
    <script>
        $(function() {
            // The Name() of the TimePicker is used to get its client-side instance.
            var timepicker = $("#timepicker").data("kendoTimePicker");
        });
    </script>
```

## See Also

* [Basic Usage by the TimePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timepicker)
{% if site.core %}
* [Basic Usage of the TimePicker TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/timepicker/tag-helper)
{% endif %}
* [Using the API of the TimePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timepicker/api)
* [Server-Side API](/api/timepicker)
