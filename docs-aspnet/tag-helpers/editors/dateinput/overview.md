---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI DateInput TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/date-input, /helpers/tag-helpers/date-input
slug: taghelpers_dateinput_aspnetcore
position: 1
---

# DateInput TagHelper Overview

The Telerik UI DateInput TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI DateInput widget.

The DateInput represents an input field that recognizes and formats scheduling values such as dates.

* [Demo page for the DateInput](https://demos.telerik.com/aspnet-core/dateinput/tag-helper)

## Initializing the DateInput

The following example demonstrates how to define the DateInput by using the DateInput TagHelper.

    <kendo-dateinput name="dateinput1"></kendo-dateinput>

## Basic Configuration

The DateInput TagHelper configuration options are passed as attributes of the tag.

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

## Events

You can subscribe to all DateInput events.

The following example demonstrates how to subscribe to events by a handler name.

```tagHelper
<kendo-dateinput name="dateinput" style='width: 100%;' on-change="onChangeHandler">
</kendo-dateinput>

<script>
    function onChangeHandler(e) {
        // Add your logic here.
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

## Referencing Existing Instances

To reference an existing Kendo UI DateInput instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [DateInput client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/dateinput#methods) to control its behavior.

    // Place the following after the DateInput for ASP.NET Core declaration.
    <script>
        $(function() {
            // The Name() of the DateInput is used to get its client-side instance.
            var dateInput = $("#dateinput").data("kendoDateInput");
        });
    </script>

## See Also

* [Basic Usage of the DateInput TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/dateinput/tag-helper)
* [Server-Side API](/api/dateinput)
