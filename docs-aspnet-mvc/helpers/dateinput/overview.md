---
title: Overview
page_title: DateInput | Telerik UI for ASP.NET MVC HtmlHelpers
description: "Get started with the server-side wrapper for the Kendo UI DateInput widget for ASP.NET MVC."
slug: overview_dateinputhelper_aspnetmvc
position: 1
---

# DateInput HtmlHelper Overview

The DateInput HtmlHelper extension is a server-side wrapper for the [Kendo UI DateInput](https://demos.telerik.com/kendo-ui/dateinput/index) widget.

## Configuration

Below are listed the steps for you to follow when configuring the Kendo UI DateInput.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

1. Create a new action method which renders the view.

    ###### Example

        public ActionResult Index()
        {
            return View();
        }

1. Add a DateInput.

    ```ASPX
        <%: Html.Kendo().DateInput()
            .Name("dateinput") //The name of the DateInput is mandatory. It specifies the "id" attribute of the widget.
            .Value(DateTime.Today) //Set the value of the DateInput.
        %>
    ```
    ```Razor
        @(Html.Kendo().DateInput()
            .Name("dateinput") //The name of the DateInput is mandatory. It specifies the "id" attribute of the widget.
            .Value(DateTime.Today) //Set the value of the DateInput.
        )
    ```

## Event Handling

You can subscribe to all DateInput [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/dateinput#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().DateInput()
        .Name("dateinput")
        .Events(e => e
            .Change("dateInput_change")
        )
    %>
    <script>
        function dateInput_change() {
            //Handle the change event
        }
    </script>
```
```Razor
    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .Events(e => e
            .Change("dateInput_change")
        )
    )
    <script>
        function dateInput_change() {
            //Handle the change event
        }
    </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

```
    @(Html.Kendo().DateInput()
      .Name("dateinput")
      .Events(e => e
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

To reference an existing Kendo UI DateInput instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [DateInput API](http://docs.telerik.com/kendo-ui/api/javascript/ui/dateinput#methods) to control its behavior.

###### Example

    //Put this after your Kendo UI DateInput for ASP.NET MVC declaration.
    <script>
        $(function() {
            //Notice that the Name() of the DateInput is used to get its client-side instance.
            var dateInput = $("#dateinput").data("kendoDateInput");
        });
    </script>

## See Also

* [Telerik UI for ASP.NET MVC API Reference: DateInputBuilder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/DateInputBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI DatePicker Widget](http://demos.telerik.com/kendo-ui/datepicker/index)
* [Overview of the Kendo UI DateTimePicker Widget](http://demos.telerik.com/kendo-ui/datetimepicker/index)
* [Overview of the Kendo UI TimePicker Widget](http://demos.telerik.com/kendo-ui/datetimepicker/index)
* [Telerik UI for ASP.NET MVC API Reference Folder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
