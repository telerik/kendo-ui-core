---
title: Overview
page_title: Overview | Kendo UI DateTimePicker HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI DateTimePicker widget for ASP.NET MVC."
slug: overview_datetimepickerhelper_aspnetmvc
position: 1
---

# DateTimePicker HtmlHelper Overview

The DateTimePicker HtmlHelper extension is a server-side wrapper for the [Kendo UI DateTimePicker](https://demos.telerik.com/kendo-ui/datetimepicker/index) widget.

## Configuration

Below are listed the steps for you to follow when configuring the Kendo UI DateTimePicker.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

    ###### Example

            public ActionResult Index()
            {
                return View();
            }

1. Add a DateTimePicker.

    ###### Example

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

You can subscribe to all DateTimePicker [events](../../../kendo-ui/api/javascript/ui/datetimepicker#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

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

The following example demonstrates how to subscribe to events by a template delegate.

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

To reference an existing Kendo UI DateTimePicker instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [DateTimePicker API](../../../kendo-ui/api/javascript/ui/datetimepicker#methods) to control its behavior.

###### Example

      //Put this after your Kendo UI DateTimePicker for ASP.NET MVC declaration.
      <script>
      $(function() {
      //Notice that the Name() of the DateTimePicker is used to get its client-side instance.
      var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");
      });
      </script>

## See Also

* [ASP.NET MVC API Reference: DateTimePickerBuilder](/api/Kendo.Mvc.UI.Fluent/DateTimePickerBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI DateTimePicker Widget](http://docs.telerik.com/kendo-ui/controls/editors/datetimepicker/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
