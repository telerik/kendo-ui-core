---
title: Overview
page_title: Overview
description: "Learn the basics when working with the DateTimePicker component for {{ site.framework }}."
previous_url: /helpers/html-helpers/datetimepicker, /helpers/editors/datetimepicker/overview
slug: htmlhelpers_datetimepicker_aspnetcore
position: 0
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

## Model Binding

The DateTimePicker component respects DataAnnotations when the `DateTimePickerFor(m=>m.Property)` method is used. Besides the `[Required]` attribute, the `[DisplayFormat]` and `[Range]` attributes are also supported. The [`Format`](/api/kendo.mvc.ui.fluent/datetimepickerbuilder#formatsystemstring) configuration will be set to the provided DisplayFormat and the [`Min`](/api/kendo.mvc.ui.fluent/datetimepickerbuilder#minsystemstring) and [`Max`](/api/kendo.mvc.ui.fluent/datetimepickerbuilder#maxsystemstring) configurations will be set based on the range provided.

```HtmlHelper
    @(Html.Kendo().DateTimePickerFor(m=>m.MyDateTimeProperty))
```
{% if site.core %}
```TagHelper
    <kendo-datetimepicker for="MyDateTimeProperty"
    </kendo-datetimepicker>
```
{% endif %}
```C#
    [Required]
    [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
    [Range(typeof(DateTime), minimum:"01/01/2023", maximum:"31/12/2023")]
    public DateTime MyDateTimeProperty{ get; set; }
```

## Functionality and Features

| Feature | Description |
|---------|-------------|
| [Disabled dates]({% slug disableddates_datetimepicker_aspnetcore %})|The DateTimePicker allows you to disable specific days that shouldn't be selected by the end user, such as weekends and national holidays.|
| [Selected dates]({% slug selecteddates_datetimepicker_aspnetcore %})|The DateTimePicker allows you to render a pre-selected date and also define the minimum and maximum dates it displays.|
| [Start view and navigation depth]({% slug navdepth_datetimepicker_aspnetcore %})|The DateTimePicker enables you to set the rendered initial view and define the navigation depth of the views.|
| [Validation]({% slug validation_datetimepicker_aspnetcore %})|The DateTimePicker does not automatically update the typed text when the typed text is invalid. Such changes in the input value may lead to unexpected behavior.|
| [Date and time formatting]({% slug datetimeformatting_datetimepicker_aspnetcore %})|The DateTimePicker allows you to define its date and time formatting.|
| [Calendar types]({% slug calendartypes_datetimepicker_aspnetcore %})|By default, the DatePicker works with `Date` objects which support only the [Gregorian](https://en.wikipedia.org/wiki/Gregorian_calendar) calendar.|
| [Week number column]({% slug weeknumcolumn_datetimepicker_aspnetcore %})|The DateTimePicker provides options for rendering a column which displays the number of the weeks within the current `Month` view.|
| [Templates]({% slug templates_datetimepicker_aspnetcore %})|The DateTimePicker provides options for using and customizing its templates.|
| [Globalization]({% slug globalization_datetimepicker_aspnetcore %})|The DateTimePicker comes with globalization support that allows you to use the component in apps all over the world.|
| [Accessibility]({% slug accessibility_datetimepicker_aspnetcore %})|The DateRangePicker is accessible for screen readers, supports WAI-ARIA attributes, and delivers [keyboard shortcuts]({% slug keynav_daterangepicker_aspnetcore %}) for faster navigation.|
| [Automatic Correction]({% slug htmlhelpers_datetimepicker_autocorrect_aspnetcore %})| You can configure whether the component will autocorrect the user's input when the `Min` and `Max` values are set. |

## Next Steps

* [Getting Started with the DateTimePicker]({% slug datetimepicker_getting_started %})
* [Basic Usage of the DateTimePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datetimepicker/index)
{% if site.core %}
* [Basic Usage of the DateTimePicker TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/datetimepicker/tag-helper)
* [DateTimePicker in Razor Pages]({% slug razorpages_datetimepicker_aspnetcore %})
{% endif %}

## See Also

* [Using the API of the DateTimePicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datetimepicker/api)
* [Knowledge Base Section](/knowledge-base)
