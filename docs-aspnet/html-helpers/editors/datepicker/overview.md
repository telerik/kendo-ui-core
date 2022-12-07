---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI DatePicker component for {{ site.framework }}."
previous_url: /helpers/html-helpers/datepicker, /helpers/editors/datepicker/overview
slug: htmlhelpers_datepicker_aspnetcore
position: 1
---

# {{ site.framework }} DatePicker Overview

{% if site.core %}
The Telerik UI DatePicker TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI DatePicker widget.
{% else %}
The Telerik UI DatePicker HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI DatePicker widget.
{% endif %}

The DatePicker enables the user to select a date from a calendar or through a direct input. It provides options for using custom templates for its **Month** view, setting minimum and maximum dates, a start view, and a depth for navigation.

* [Demo page for the DatePicker HtmlHelper](https://demos.telerik.com/{{ site.platform }}/datepicker/index)
{% if site.core %}
* [Demo page for the DatePicker TagHelper](https://demos.telerik.com/aspnet-core/datepicker/tag-helper)
{% endif %}

## Basic Configuration

The following example demonstrates the basic configuration for the DatePicker.

```HtmlHelper
    @(Html.Kendo().DatePicker()
        .Name("datepicker") // The name of the DatePicker is mandatory. It specifies the "id" attribute of the widget.
        .Min(new DateTime(1900, 1, 1)) // Sets the min date of the DatePicker.
        .Max(new DateTime(2099, 12, 31)) // Sets the max date of the DatePicker.
        .Value(DateTime.Today) // Sets the value of the DatePicker.
    )
```
{% if site.core %}
```TagHelper
    <kendo-datepicker name="datepicker"
        min="new DateTime(1900, 1, 1)" 
        max="new DateTime(2099, 12, 31)"
        value="DateTime.Today">
    </kendo-datepicker>
```
{% endif %}

## Functionality and Features

* [Disabled dates]({% slug htmlhelpers_datepicker_aspnetcore_disableddates %})
* [Selected dates]({% slug htmlhelpers_datepicker_aspnetcore_selecteddates %})
* [Start view and navigation depth]({% slug htmlhelpers_datepicker_aspnetcore_navdepth %})
* [Validation]({% slug htmlhelpers_datepicker_aspnetcore_validation %})
* [Calendar types]({% slug htmlhelpers_datepicker_aspnetcore_calendartypes %})
* [Week number column]({% slug htmlhelpers_datepicker_aspnetcore_weeknumbercolumn %})
* [DateInput integration]({% slug htmlhelpers_datepicker_aspnetcore_dateinputintegration %})
* [Templates]({% slug htmlhelpers_datepicker_aspnetcore_templates %})
* [Accessibility]({% slug htmlhelpers_datepicker_aspnetcore_accessibility %})

## Events

You can subscribe to all DatePicker [events](/api/datepicker). For a complete example on DatePicker events, refer to the [demo on handling DatePicker events](https://demos.telerik.com/{{ site.platform }}/datepicker/events).

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().DatePicker()
      .Name("datepicker")
      .Events(e => e
            .Open("datepicker_open")
            .Close("datepicker_close")
            .Change("datepicker_change")
      )
    )
```
{% if site.core %}
```TagHelper
    <kendo-datepicker name="datepicker"
        on-open="datepicker_open"
        on-close="datepicker_close"
        on-change="datepicker_change"/>
```
{% endif %}
```script.js
    function datepicker_open() {
        // Handle the open event.
    }

    function datepicker_close() {
        // Handle the close event.
    }

    function datepicker_change() {
        // Handle the change event.
    }
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().DatePicker()
      .Name("datepicker")
      .Events(e => e
          .Open(@<text>
            function() {
                // Handle the open event inline.
            }
          </text>)
          .Change(@<text>
            function() {
                // Handle the change event inline.
            }
            </text>)
      )
    )
```
{% if site.core %}
```TagHelper
    <kendo-datepicker name="datepicker"
        on-open='function(e)
        {
            // Handle the open event inline.
        }'
        on-change='function(e)
        {
            // Handle the change event inline.
        }'/>
```
{% endif %}

## Referencing Existing Instances

To reference an existing Telerik UI DatePicker instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [DatePicker client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker#methods) to control its behavior.

        // Place the following after your Telerik UI DatePicker for {{ site.framework }} declaration.
        <script>
        $(function() {
        // The Name() of the DatePicker is used to get its client-side instance.
            var datepicker = $("#datepicker").data("kendoDatePicker");

            //Use the "value" API method to get the DatePicker's value.
            console.log(datepicker.value());
        });
        </script>

## See Also

* [Basic Usage of the DatePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datepicker/index)
{% if site.core %}
* [Basic Usage of the DatePicker TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/datepicker/tag-helper)
{% endif %}
* [Using the API of the DatePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datepicker/api)
* [Server-Side API](/api/datepicker)
