---
title: DateTimePicker
page_title: DateTimePicker | UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the DateTimePicker HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_datetimepicker_aspnetcore
---

# DateTimePicker HtmlHelper Overview

The DateTimePicker HtmlHelper extension is a server-side wrapper for the [Kendo UI DateTimePicker](https://demos.telerik.com/kendo-ui/datetimepicker/index) widget.

For more information on the HtmlHelper, refer to the article on the [DateTimePicker HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/datetimepicker/overview).

## Configuration

The following example demonstrates the basic configuration for the DateTimePicker.

###### Example

```tab-Razor

        @(Html.Kendo().DateTimePicker()
            .Name("datetimepicker") //The name of the DateTimePicker is mandatory. It specifies the "id" attribute of the widget.
            .Min(new DateTime(2010, 1, 1, 10, 0, 0)) //Set the min time of the DateTimePicker.
            .Max(new DateTime(2010, 1, 1, 20, 0, 0)) //Set the min date of the DateTimePicker.
            .Value(DateTime.Now) //Set the value of the DateTimePicker.
        )
```

## Event Handling

You can subscribe to all DateTimePicker [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker#events).

The following example demonstrates how to subscribe to events by a handler name.

###### Example

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

## Reference

### Existing Instances

To reference an existing Kendo UI DateTimePicker instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [DateTimePicker API](http://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker#methods) to control its behavior.

The following example demonstrates how to access an existing DateTimePicker instance.

###### Example

      //Put this after your Kendo UI DateTimePicker for ASP.NET Core declaration.
      <script>
      $(function() {
      //Notice that the Name() of the DateTimePicker is used to get its client-side instance.
          var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");
      });
      </script>

## See Also

* [Overview of the JavaScript Kendo UI DateTimePicker Widget](http://docs.telerik.com/kendo-ui/controls/editors/datetimepicker/overview)
* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})