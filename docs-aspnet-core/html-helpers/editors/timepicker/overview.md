---
title: Overview
page_title: TimePicker | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI TimePicker HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: overview_timepickerhelper_aspnetcore
position: 1
---

# TimePicker HtmlHelper Overview

The TimePicker HtmlHelper extension is a server-side wrapper for the [Kendo UI TimePicker](https://demos.telerik.com/kendo-ui/timepicker/index) widget.

## Getting Started

### Configuration

Add the TimePicker.

###### Example

```
    @(Html.Kendo().TimePicker()
        .Name("timepicker") //The name of the TimePicker is mandatory. It specifies the "id" attribute of the widget.
        .Value(DateTime.Now) //Set the value of the TimePicker.
    )
```

## Event Handling

You can subscribe to all TimePicker [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/timepicker#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

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
            //Handle the open event.
        }

        function timepicker_close(e) {
            //Handle the close event
        }

        function timepicker_change(e) {
            //Handle the change event.
        }
    </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```
    @(Html.Kendo().TimePicker()
          .Name("timepicker")
          .Events(e => e
              .Open(@<text>
                function(e) {
                    //Handle the open event inline.
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

## Reference

### Existing Instances

To reference an existing Kendo UI TimePicker instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [TimePicker API](https://docs.telerik.com/kendo-ui/api/javascript/ui/timepicker#methods) to control its behavior.

###### Example

```
    // Put this after your Kendo UI TimePicker for ASP.NET Core declaration.
    <script>
        $(function() {
            //Notice that the Name() of the TimePicker is used to get its client-side instance.
            var timepicker = $("#timepicker").data("kendoTimePicker");
        });
    </script>
```

## See Also

* [Overview of the Kendo UI jQuery TimePicker Widget](http://docs.telerik.com/kendo-ui/controls/editors/timepicker/overview)
* [UI for ASP.NET Core TimePicker live demos](https://demos.telerik.com/aspnet-core/timepicker)
