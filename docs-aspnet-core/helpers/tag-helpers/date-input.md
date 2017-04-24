---
title: DateInput
page_title: DateInput | UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the DateInput tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/date-input
slug: taghelpers_dateinput_aspnetcore
---

# DateInput Tag Helper

The DateInput tag helper helps you configure the Kendo UI DateInput widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the DateInput by using the DateInput tag helper.

###### Example

        <kendo-dateinput name="dateinput1"></kendo-dateinput>

## Configuration

The DateInput tag helper configuration options are passed as attributes of the tag.

###### Example

```tab-cshtml

        @(Html.Kendo().DateInput()
                .Name("dateinput1")
                .Format("MMMM yyyy")
                .Value(DateTime.Now)
        )
```
```tab-tagHelper

        <kendo-dateinput name="dateinput1" format="MMMM yyyy" value="DateTime.Now">
        </kendo-dateinput>
```

## Event Handling

You can subscribe to all DateInput [events](../../../kendo-ui/api/javascript/ui/dateinput#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```tab-Razor

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

```tab-Razor

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

To reference an existing Kendo UI DateInput instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [DateInput API](../../../kendo-ui/api/javascript/ui/dateinput#methods) to control its behavior.

###### Example

        //Put this after your Kendo UI DateInput for ASP.NET Core declaration.
        <script>
        $(function() {
        //Notice that the Name() of the DateInput is used to get its client-side instance.
        var dateInput = $("#dateinput").data("kendoDateInput");
        });
        </script>


## See Also

* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
