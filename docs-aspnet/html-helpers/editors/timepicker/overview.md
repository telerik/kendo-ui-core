---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI TimePicker component for {{ site.framework }}."
previous_url: /helpers/editors/timepicker/overview
slug: overview_timepickerhelper_aspnetcore
position: 0
---

# {{ site.framework }} TimePicker Overview

{% if site.core %}
The Telerik UI TimePicker TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI TimePicker widget.
{% else %}
The Telerik UI TimePicker HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI TimePicker widget.
{% endif %}

The TimePicker enables users to select time values from a predefined list or enter new ones.

* [Demo page for the TimePicker](https://demos.telerik.com/{{ site.platform }}/timepicker/index)
{% if site.core %}
* [Demo page for the TimePicker](https://demos.telerik.com/aspnet-core/timepicker/tag-helper)
{% endif %}

## Initializing the TimePicker

The following example demonstrates how to how to define the TimePicker.

```HtmlHelper
    @(Html.Kendo().TimePicker()
        .Name("timepicker") // The name of the TimePicker is mandatory. It specifies the "id" attribute of the widget.
        .Value(DateTime.Now) // Set the value of the TimePicker.
    )
```
{% if site.core %}
```TagHelper
    <kendo-timepicker name="timepicker" value="DateTime.Now"></kendo-timepicker>
```
{% endif %}

{% if site.core %}
@[template](/_contentTemplates/core/declarative-initialization-note.md#declarative-initialization-note)
{% endif %}

## Basic Configuration

The TimePicker TagHelper configuration options are passed as attributes.

```HtmlHelper

        @(Html.Kendo().TimePicker()
                .Name("end")
                .Value("8:30 AM")
                .Min("8:00 AM")
                .Max("7:30 AM")
        )
```
{% if site.core %}
```TagHelper

        <kendo-timepicker name="end" value="new DateTime(1900, 1, 1, 8, 30, 0)"
            min="new DateTime(1900, 1, 1, 8, 0, 0)" max="new DateTime(1900, 1, 1, 7, 30, 0)">
        </kendo-timepicker>
```
{% endif %}

## Model Binding

The TimePicker component respects DataAnnotation attributes when using the `TimePickerFor(m => m.Property)` declaration. Besides the `[Required]` attribute, the TimePicker also supports the `[DisplayFormat]` and `[Range]` attributes. The [`Format`](/api/kendo.mvc.ui.fluent/timepickerbuilder#formatsystemstring) configuration will be set based on the specified `DisplayFormat`. The [`Min`](/api/kendo.mvc.ui.fluent/timepickerbuilder#minsystemstring) and [`Max`](/api/kendo.mvc.ui.fluent/timepickerbuilder#maxsystemstring) options will be set based on the `[Range]` attribute.

```HtmlHelper
    @(Html.Kendo().TimePickerFor(m => m.MyDateTimeProperty))
```
{% if site.core %}
```TagHelper

    <kendo-timepicker for="MyDateTimeProperty">
    </kendo-timepicker>
```
{% endif %}
```C#
        [Required]
        [DisplayFormat(DataFormatString = "{0:HH:mm:ss tt}", ApplyFormatInEditMode = true)]
        [Range(typeof(DateTime), minimum: "01/01/2023 03:00:00 AM", maximum: "12/31/2023 10:00:00 AM")]
        public DateTime MyDateTimeProperty{ get; set; }
```

{% if site.core %}
## TimeOnly compatability

As of the 2024 Q4 Release the {{ site.framework }} TimePicker is compatible with the [`TimeOnly`](https://learn.microsoft.com/en-us/dotnet/api/system.timeonly?view=net-8.0) type. Following this release you can also set the value of the component to a `TimeOnly` property:

```HtmlHelper
    @(Html.Kendo().TimePicker().Name("timeOnly").Value(new TimeOnly(10,20,30)))
```
```TagHelper
    <kendo-timepicker name="timeOnly" value="new TimeOnly(10,20,30)"></kendo-timepicker>
```
{% endif %}

## Functionality and Features

|Feature|Description|
|-------|-----------|
| [Adaptive Mode]({% slug htmlhelpers_timepicker_adaptive_mode_aspnetcore %}) | The TimePicker supports an adaptive mode that provides a mobile-friendly rendering of its popup. |
| [Component Type]({% slug htmlhelpers_componenttype_timepicker_aspnetcore %}) | The TimePicker allows you to choose from both a standard and a modern rendering appearance.  |
| [Floating Labels]({% slug htmlhelpers_timepicker_floatinglabel_aspnetcore %}) | You can explicitly set a floating label which floats above the field and remains visible. |
| [Selected time]({% slug htmlhelpers_timepicker_aspnetcore_selectedtimes %}) | The TimePicker allows you to render a pre-selected time and also define the minimum and maximum time it displays. |
| [Focused time]({% slug htmlhelpers_timepicker_aspnetcore_focusedtime %}) |The TimePicker allows you to define focused time when the pop-up is opened. |
| [Interval]({% slug htmlhelpers_timepicker_interval_aspnetcore %}) | You can configure the interval between the time values. |
| [Formats]({% slug formats_timepicker_aspnetcore %}) | The TimePicker allows you to define its time formatting. |
| [Validation]({% slug htmlhelpers_timepicker_aspnetcore_validation %}) | The TimePicker is designed to keep its input value unchanged even when the typed time is invalid. |
| [Globalization]({% slug globalization_timepicker_aspnetcore %}) | The globalization process combines the translation of component messages (localization) with adapting them to specific cultures. |
| [Accessibility]({% slug htmlhelpers_timepicker_accessibility %}) | The TimePicker is accessible for screen readers, supports WAI-ARIA attributes, delivers keyboard shortcuts for faster navigation, and allows you to render it in a right-to-left direction. |
| [Automatic Correction]({% slug htmlhelpers_timepicker_autocorrect_aspnetcore %})| You can configure whether the component will autocorrect the user's input when the `Min` and `Max` values are set. |

## Next Steps

* [Configuring the Floating Label of the TimePicker]({% slug htmlhelpers_timepicker_floatinglabel_aspnetcore %})
* [Customizing the Appearance of the TimePicker]({% slug appearance_timepicker %})
* [Using Validation with the TimePicker]({% slug htmlhelpers_timepicker_aspnetcore_validation %})

## See Also

* [Using the API of the TimePicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/timepicker/api)
* [Knowledge Base Section](/knowledge-base)
