---
title: Overview
page_title: Overview | Kendo UI DateTimePicker HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI DateTimePicker widget for ASP.NET MVC."
slug: overview_datetimepickerhelper_aspnetmvc
position: 1
---

# DateTimePicker HtmlHelper Overview

The DateTimePicker HtmlHelper extension is a server-side wrapper for the [Kendo UI DateTimePicker](https://demos.telerik.com/kendo-ui/datetimepicker/index) widget.

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI DateTimePicker.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create a new action method which renders the view.

###### Example

        public ActionResult Index()
        {
            return View();
        }

**Step 3** Add a DateTimePicker.

```tab-ASPX

        <%: Html.Kendo().DateTimePicker()
            .Name("datetimepicker") //The name of the DateTimePicker is mandatory. It specifies the "id" attribute of the widget.
            .Min(new DateTime(2010, 1, 1, 10, 0, 0)) //Set the min time of the DateTimePicker.
            .Max(new DateTime(2010, 1, 1, 20, 0, 0)) //Set the min date of the DateTimePicker.
            .Value(DateTime.Now) //Set the value of the DateTimePicker.
        %>
```
```tab-Razor

        (Html.Kendo().DateTimePicker()
            .Name("datetimepicker") //The name of the DateTimePicker is mandatory. It specifies the "id" attribute of the widget.
            .Min(new DateTime(2010, 1, 1, 10, 0, 0)) //Set the min time of the DateTimePicker.
            .Max(new DateTime(2010, 1, 1, 20, 0, 0)) //Set the min date of the DateTimePicker.
            .Value(DateTime.Now) //Set the value of the DateTimePicker.
        )
```

## Event Handling

You can subscribe to all DateTimePicker [events](/api/javascript/ui/datetimepicker#events).

### By Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().DateTimePicker()
            .Name("datetimepicker")
            .Events(e => e
                .Open("datetimepicker_open")
                .Close("datetimepicker_close")
                .Change("datetimepicker_change")
            )
        %>
        <script>
        function datetimepicker_open() {
            //Handle the open event.
        }

        function datetimepicker_close() {
            //Handle the close event.
        }

        function datetimepicker_change() {
            //Handle the change event.
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().DateTimePicker()
          .Name("datetimepicker")
          .Events(e => e
                .Open("datetimepicker_open")
                .Close("datetimepicker_close")
                .Change("datetimepicker_change")
          )
        )
        <script>
        function datetimepicker_open() {
            //Handle the open event.
        }

        function datetimepicker_close() {
            //Handle the close event.
        }

        function datetimepicker_change() {
            //Handle the change event.
        }
        </script>
```
### By Template Delegate

The example below demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

    @(Html.Kendo().DateTimePicker()
      .Name("datetimepicker")
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

You can reference an existing Kendo UI DateTimePicker instance via [`jQuery.data()`](http://api.jquery.com/jQuery.data/). Once a reference is established, use the [DateTimePicker API](/api/javascript/ui/datetimepicker#methods) to control its behavior.

###### Example

      //Put this after your Kendo UI DateTimePicker for ASP.NET MVC declaration.
      <script>
      $(function() {
      //Notice that the Name() of the DateTimePicker is used to get its client-side instance.
      var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");
      });
      </script>

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the DateTimePicker:

* [ASP.NET MVC API Reference: DateTimePickerBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/DateTimePickerBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI DateTimePicker Widget]({% slug overview_kendoui_datetimepicker_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
