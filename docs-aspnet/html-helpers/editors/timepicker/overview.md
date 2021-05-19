---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI TimePicker HtmlHelper for {{ site.framework }}."
previous_url: /helpers/editors/timepicker/overview
slug: overview_timepickerhelper_aspnetcore
position: 1
---

# TimePicker HtmlHelper Overview

The Telerik UI TimePicker HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI TimePicker widget.

The TimePicker enables users to select time values from a predefined list or enter new ones.

* [Demo page for the TimePicker](https://demos.telerik.com/{{ site.platform }}/timepicker/index)

## Initializing the TimePicker

The following example demonstrates how to how to define the TimePicker by using the TimePicker HtmlHelper.

```
    @(Html.Kendo().TimePicker()
        .Name("timepicker") // The name of the TimePicker is mandatory. It specifies the "id" attribute of the widget.
        .Value(DateTime.Now) // Set the value of the TimePicker.
    )
```

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

```
    @(Html.Kendo().TimePicker()
          .Name("timepicker")
          .Events(e => e
                .Open("timepicker_open")
                .Close("timepicker_close")
                .Change("timepicker_change")
          )
    )
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

```
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
* [Using the API of the TimePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timepicker/api)
* [Server-Side API](/api/timepicker)
