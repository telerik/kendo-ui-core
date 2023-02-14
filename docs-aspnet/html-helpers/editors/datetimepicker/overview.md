---
title: Overview
page_title: Overview
description: "Learn the basics when working with the DateTimePicker component for {{ site.framework }}."
previous_url: /helpers/html-helpers/datetimepicker, /helpers/editors/datetimepicker/overview
slug: htmlhelpers_datetimepicker_aspnetcore
position: 1
---

# {{ site.framework }} DateTimePicker Overview

{% if site.core %}
The Telerik UI DataSource TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI DataSource widget.
{% else %}
The Telerik UI DateTimePicker HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI DateTimePicker widget.
{% endif %}

The DateTimePicker allows the user to select a value from a calendar, a time drop-down list, or through direct input.

* [Demo page for the DateTimePicker HtmlHelper](https://demos.telerik.com/{{ site.platform }}/datetimepicker/index)
{% if site.core %}
* [Demo page for the DateTimePicker TagHelper](https://demos.telerik.com/aspnet-core/datetimepicker/tag-helper)
{% endif %}

## Initializing the DateTimePicker

The following example demonstrates how to define the DateTimePicker.

> The DateTimePicker copies any styles and CSS classes from the input element to the wrapper element.

```HtmlHelper
    @(Html.Kendo().DateTimePicker()
        .Name("dateTimePicker")
    )
```
{% if site.core %}
```TagHelper
    <kendo-datetimepicker name="dateTimePicker"></kendo-datetimepicker>
```
{% endif %}

{% if site.core %}
## Basic Configuration

The DateTimePicker configuration options are passed as attributes.

```HtmlHelper
    @(Html.Kendo().DateTimePicker()
        .Name("end")
        .Value(DateTime.Today)
        .Min(DateTime.Today)
    )
```
```TagHelper
    <kendo-datetimepicker name="end" value="DateTime.Today"
        min="DateTime.Today">
    </kendo-datetimepicker>
```

The `ParseFormats` option is of type `string[]` and can be assigned either by a `ViewBag` property or by a property of the model.

```HtmlHelper
    @(Html.Kendo().DateTimePicker()
        .Name("datetimepicker")
        .ParseFormats(new string[] { "MMMM yyyy", "MMMM" })
    )
```

```TagHelper
    @{
        ViewBag.ParseDates = new string[] { "MMMM yyyy", "MMMM" };
    }

    <kendo-datetimepicker name="datetimepicker" parse-formats="ViewBag.ParseDates">
    </kendo-datetimepicker>
```
{% endif %}

## Functionality and Features

* [Disabled dates]({% slug disableddates_datetimepicker_aspnetcore %})
* [Selected dates]({% slug selecteddates_datetimepicker_aspnetcore %})
* [Start view and navigation depth]({% slug navdepth_datetimepicker_aspnetcore %})
* [Validation]({% slug validation_datetimepicker_aspnetcore %})
* [Date and time formatting]({% slug datetimeformatting_datetimepicker_aspnetcore %})
* [Calendar types]({% slug calendartypes_datetimepicker_aspnetcore %})
* [Week number column]({% slug weeknumcolumn_datetimepicker_aspnetcore %})
* [DateInput integration]({% slug dateinputintegration_datetimepicker_aspnetcore %})
* [Templates]({% slug templates_datetimepicker_aspnetcore %})
* [Globalization]({% slug globalization_datetimepicker_aspnetcore %})
* [Accessibility]({% slug accessibility_datetimepicker_aspnetcore %})

## Events

You can subscribe to all DateTimePicker [events](/api/datetimepicker). For a complete example on basic DateTimePicker events, refer to the [demo on using the events of the DateTimePicker](https://demos.telerik.com/{{ site.platform }}/datetimepicker/events).

The following example demonstrates how to subscribe to events by a handler name.

```HtmlHelper
    @(Html.Kendo().DateTimePicker()
      .Name("datetimepicker")
      .Events(e => e
            .Open("datetimepicker_open")
            .Close("datetimepicker_close")
            .Change("datetimepicker_change")
      )
    )
```
{% if site.core %}
```TagHelper
    <kendo-datetimepicker name="datetimepicker"
        on-open="datetimepicker_open"
        on-close="datetimepicker_close"
        on-change="datetimepicker_open"/>
```
{% endif %}
```JavaScript
    function datetimepicker_open() {
        // Handle the open event.
    }

    function datetimepicker_close() {
        // Handle the close event.
    }

    function datetimepicker_change() {
        // Handle the change event.
    }

```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```HtmlHelper
    @(Html.Kendo().DateTimePicker()
        .Name("datetimepicker")
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
    <kendo-datetimepicker name="datetimepicker"
        on-open='function(e)
        {
            // Handle the open event inline.
        }'
        on-change='function(e)
        {
            / Handle the change event inline.
        }'/>
```
{% endif %}

## Referencing Existing Instances

To reference an existing  DateTimePicker instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [DateTimePicker client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker#methods) to control its behavior.

The following example demonstrates how to access an existing DateTimePicker instance.

      // Place the following after your DateTimePicker for {{ site.framework }} declaration.
      <script>
      $(function() {
      // The Name() of the DateTimePicker is used to get its client-side instance.
          var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");
      });
      </script>

## See Also

* [Basic Usage of the DateTimePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datetimepicker/index)
{% if site.core %}
* [Basic Usage of the DateTimePicker TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/datetimepicker/tag-helper)
{% endif %}
* [Using the API of the DateTimePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datetimepicker/api)
* [Server-Side API](/api/datetimepicker)
