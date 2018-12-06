---
title: Overview
page_title: DateInput | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI DateInput tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/date-input, /aspnet-core/helpers/tag-helpers/date-input
slug: taghelpers_dateinput_aspnetcore
position: 1
---

# DateInput Tag Helper Overview

The DateInput tag helper helps you configure the Kendo UI DateInput widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the DateInput by using the DateInput tag helper.

###### Example

    <kendo-dateinput name="dateinput1"></kendo-dateinput>

## Configuration

The DateInput tag helper configuration options are passed as attributes of the tag.

```tagHelper
<kendo-dateinput name="dateinput1" format="MMMM yyyy" value="DateTime.Now">
</kendo-dateinput>
```
```cshtml
@(Html.Kendo().DateInput()
    .Name("dateinput1")
    .Format("MMMM yyyy")
    .Value(DateTime.Now)
)
```


## Event Handling

You can subscribe to all DateInput [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/dateinput#events).

The following example demonstrates how to subscribe to events by a handler name.

```tagHelper
<kendo-dateinput name="dateinput" style='width: 100%;' on-change="onChangeHandler">
</kendo-dateinput>

<script>
    function onChangeHandler(e) {
        // add logic here
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


## Reference

### Existing Instances

To reference an existing Kendo UI DateInput instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [DateInput API](http://docs.telerik.com/kendo-ui/api/javascript/ui/dateinput#methods) to control its behavior.

###### Example

    //Put this after your Kendo UI DateInput for ASP.NET Core declaration.
    <script>
        $(function() {
            //Notice that the Name() of the DateInput is used to get its client-side instance.
            var dateInput = $("#dateinput").data("kendoDateInput");
        });
    </script>


## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
