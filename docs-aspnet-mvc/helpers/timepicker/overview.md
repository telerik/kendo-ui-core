---
title: Overview
page_title: Overview | Kendo UI TimePicker HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI TimePicker widget for ASP.NET MVC."
slug: overview_timepickerhelper_aspnetmvc
position: 1
---

# TimePicker HtmlHelper Overview

The TimePicker HtmlHelper extension is a server-side wrapper for the [Kendo UI TimePicker](https://demos.telerik.com/kendo-ui/timepicker/index) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI TimePicker.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a TimePicker.

###### Example

```tab-ASPX

        <%: Html.Kendo().TimePicker()
                .Name("timepicker") //The name of the TimePicker is mandatory. It specifies the "id" attribute of the widget.
                .Min(new DateTime(2010, 1, 1, 10, 0, 0)) //Set the min time of the TimePicker.
                .Max(new DateTime(2010, 1, 1, 20, 0, 0)) //Set the min date of the TimePicker.
                .Value(DateTime.Now) //Set the value of the TimePicker.
        %>
```
```tab-Razor

        @(Html.Kendo().TimePicker()
              .Name("timepicker") //The name of the TimePicker is mandatory. It specifies the "id" attribute of the widget.
              .Min(new DateTime(2010, 1, 1, 10, 0, 0)) //Set the min time of the TimePicker.
              .Max(new DateTime(2010, 1, 1, 20, 0, 0)) //Set the min date of the TimePicker.
              .Value(DateTime.Now) //Set the value of the TimePicker.
        )
```

## Event Handling

You can subscribe to all TimePicker [events](/api/javascript/ui/timepicker#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().TimePicker()
                .Name("timepicker")
                .Events(e => e
                    .Open("timepicker_open")
                    .Close("timepicker_close")
                    .Change("timepicker_change")
                )
        %>
        <script>
        function timepicker_open() {
            //Handle the open event.
        }

        function timepicker_close() {
            //Handle the close event.
        }

        function timepicker_change() {
            //Handle the change event.
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().TimePicker()
              .Name("timepicker")
              .Events(e => e
                    .Open("timepicker_open")
                    .Close("timepicker_close")
                    .Change("timepicker_change")
              )
        )
        <script>
        function timepicker_open() {
            //Handle the open event.
        }

        function timepicker_close() {
            //Handle the close event
        }

        function timepicker_change() {
            //Handle the change event.
        }
        </script>
```

### By Template Delegate

The example below demonstrates how to subscribe to events by a template delegate.

```tab-Razor

        @(Html.Kendo().TimePicker()
              .Name("timepicker")
              .Events(e => e
                  .Open(@<text>
                    function() {
                        //Handle the open event inline.
                    }
                  </text>)
                  .Change(@<text>
                    function() {
                        //Handle the change event inline.
                    }
                    </text>)
              )
        )
```

## Reference

### Existing Instances

You can reference an existing Kendo UI TimePicker instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [TimePicker API](/api/javascript/ui/timepicker#methods) to control its behavior.

###### Example

       //Put this after your Kendo UI TimePicker for ASP.NET MVC declaration.
        <script>
        $(function() {
            //Notice that the Name() of the TimePicker is used to get its client-side instance.
            var timepicker = $("#timepicker").data("kendoTimePicker");
        });
        </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the TimePicker:

* [ASP.NET MVC API Reference: TimePickerBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/TimePickerBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI TimePicker Widget]({% slug overview_kendoui_timepicker_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
