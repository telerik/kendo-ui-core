---
title: Overview
page_title: Overview | Kendo UI DatePicker HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI DatePicker widget for ASP.NET MVC."
slug: overview_datepickerhelper_aspnetmvc
position: 1
---

# DatePicker HtmlHelper Overview

The DatePicker HtmlHelper extension is a server-side wrapper for the [Kendo UI DatePicker](https://demos.telerik.com/kendo-ui/datepicker/index) widget.

## Configuration

Below are listed the steps for you to follow when configuring the Kendo UI DatePicker.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

    ###### Example

            public ActionResult Index()
            {
                return View();
            }

1. Add a DatePicker.

    ###### Example

    ```tab-ASPX

            <%: Html.Kendo().DatePicker()
                .Name("datepicker") //The name of the DatePicker is mandatory. It specifies the "id" attribute of the widget.
                .Min(new DateTime(1900, 1, 1)) //Set the min date of the DatePicker.
                .Max(new DateTime(2099, 12, 31)) //Set the min date of the DatePicker.
                .Value(DateTime.Today) //Set the value of the DatePicker.
            %>
    ```
    ```tab-Razor

            @(Html.Kendo().DatePicker()
                .Name("datepicker") //The name of the DatePicker is mandatory. It specifies the "id" attribute of the widget.
                .Min(new DateTime(1900, 1, 1)) //Set the min date of the DatePicker.
                .Max(new DateTime(2099, 12, 31)) //Set the min date of the DatePicker.
                .Value(DateTime.Today) //Set the value of the DatePicker.
            )
    ```

## Event Handling

You can subscribe to all DatePicker [events](../../../kendo-ui/api/javascript/ui/datepicker#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```tab-ASPX

        <%: Html.Kendo().DatePicker()
            .Name("datepicker")
            .Events(e => e
                .Open("datepicker_open")
                .Close("datepicker_close")
                .Change("datepicker_change")
            )
        %>
        <script>
        function datepicker_open() {
            //Handle the open event
        }

        function datepicker_close() {
            //Handle the close event
        }

        function datepicker_change() {
            //Handle the change event
        }
        </script>
```
```tab-Razor

        @(Html.Kendo().DatePicker()
          .Name("datepicker")
          .Events(e => e
                .Open("datepicker_open")
                .Close("datepicker_close")
                .Change("datepicker_change")
          )
        )
        <script>
        function datepicker_open() {
            //Handle the open event
        }

        function datepicker_close() {
            //Handle the close event
        }

        function datepicker_change() {
            //Handle the change event
        }
        </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

```tab-Razor

    @(Html.Kendo().DatePicker()
      .Name("datepicker")
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

To reference an existing Kendo UI DatePicker instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [DatePicker API](../../../kendo-ui/api/javascript/ui/datepicker#methods) to control its behavior.

###### Example

        //Put this after your Kendo UIDatePicker for ASP.NET MVC declaration.
        <script>
        $(function() {
        //Notice that the Name() of the DatePicker is used to get its client-side instance.
        var datepicker = $("#datepicker").data("kendoDatePicker");
        });
        </script>

## See Also

* [ASP.NET MVC API Reference: DatePickerBuilder](/api/Kendo.Mvc.UI.Fluent/DatePickerBuilder)
* [How to Create Masked DatePickers in ASP.NET MVC Apps]({% slug howto_create_masked_datepickers_datepickaspnetmvc %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI DatePicker Widget](http://docs.telerik.com/kendo-ui/controls/editors/datepicker/overview)
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
