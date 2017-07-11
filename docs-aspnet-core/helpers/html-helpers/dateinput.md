---
title: DateInput
page_title: DateInput | UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the DateInput HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_dateinput_aspnetcore
---

# DateInput HtmlHelper Overview

The DateInput HtmlHelper extension is a server-side wrapper for the [Kendo UI DateInput](https://demos.telerik.com/kendo-ui/dateinput/index) widget.

For more information on the HtmlHelper, refer to the article on the [DateInput HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/dateinput/overview).

## Configuration

The following example demonstrates the basic configuration for the DateInput.

###### Example

```
    @(Html.Kendo().DateInput()
        .Name("dateinput") //The name of the DateInput is mandatory. It specifies the "id" attribute of the widget.
        .Value(DateTime.Today) //Set the value of the DateInput.
    )
```

## Event Handling

You can subscribe to all DateInput [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/dateinput#events).

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```
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

## Reference

### Existing Instances

To reference an existing Kendo UI DateInput instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [DateInput API](http://docs.telerik.com/kendo-ui/api/javascript/ui/dateinput#methods) to control its behavior.

The following example demonstrates how to access an existing DateInput instance.

###### Example

        //Put this after your Kendo UI DateInput for ASP.NET Core declaration.
        <script>
        $(function() {
        //Notice that the Name() of the DateInput is used to get its client-side instance.
            var dateInput = $("#dateinput").data("kendoDateInput");
        });
        </script>

## See Also

* [Overview of the JavaScript Kendo UI DateInput Widget](http://docs.telerik.com/kendo-ui/controls/editors/dateinput/overview)
* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
