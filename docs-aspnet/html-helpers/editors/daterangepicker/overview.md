---
title: Overview
page_title: Overview
description: "Learn the basics when working with the  DateRangePicker component for {{ site.framework }}."
components: ["daterangepicker"]
previous_url: /helpers/html-helpers/daterangepicker, /helpers/editors/daterangepicker/overview
slug: htmlhelpers_daterangepicker_aspnetcore
position: 0
---

# {{ site.framework }} DateRangePicker Overview

{% if site.core %}
The Telerik UI DateRangePicker TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI DateRangePicker widget.
{% else %}
The Telerik UI DateRangePicker HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI DateRangePicker widget.
{% endif %}


The DateRangePicker is a container for holding start and end date inputs. It allows the user to select a date range from a calendar or through a direct input. The helper also supports custom templates for its `month` view, configuration options for minimum and maximum dates, a start view, and a depth for navigation.

* [Demo page for the DateRangePicker HtmlHelper](https://demos.telerik.com/{{ site.platform }}/daterangepicker/index)
{% if site.core %}
* [Demo page for the DateRangePicker TagHelper](https://demos.telerik.com/aspnet-core/daterangepicker/tag-helper)
{% endif %}
## Basic Configuration

The following example demonstrates the basic configuration for the DateRangePicker.

```HtmlHelper
    @(Html.Kendo().DateRangePicker()
        .Name("daterangepicker") // The name of the DateRangePicker is mandatory. It specifies the "id" attribute of the DateRangePicker.
        .Min(new DateTime(1900, 1, 1)) // Sets the min date of the DateRangePicker.
        .Max(new DateTime(2099, 12, 31)) // Sets the min date of the DateRangePicker.
        .Range(r => r.Start(DateTime.Now).End(DateTime.Now.AddDays(10))) // Sets the range of the DateRangePicker.
    )
```
{% if site.core %}
```TagHelper
     <kendo-daterangepicker name="daterangepicker" 
                            min="new DateTime(1900, 1, 1)"
                            max="new DateTime(2099, 12, 31)">
             <range start="DateTime.Now" end="DateTime.Now.AddDays(10)"/>
     </kendo-daterangepicker>
```
{% endif %}

{% if site.core %}
@[template](/_contentTemplates/core/declarative-initialization-note.md#declarative-initialization-note)
{% endif %}

{% if site.core %}
## DateOnly compatability

As of the 2024 Q4 Release the {{ site.framework }} DateRangePicker is compatible with the [`DateOnly`](https://learn.microsoft.com/en-us/dotnet/api/system.dateonly?view=net-8.0) type. Following this release you can also set the `Start` and `End` range of the component to a `DateOnly` property:

```HtmlHelper
    @(Html.Kendo().DateRangePicker()
        .Name("daterangepicker") 
        .Range(r => r.Start(new DateOnly(2024,5,6)).End(new DateOnly(2024,5,6).AddDays(10))) // Sets the range of the DateRangePicker.
    )
```
```TagHelper
     <kendo-daterangepicker name="daterangepicker">
             <range start="new DateOnly(2024,5,6)" end="new DateOnly(2024,5,6).AddDays(10)"/>
     </kendo-daterangepicker>
```
{% endif %}

## Functionality and Features

| Feature | Description |
|---------|-------------|
| [Disabled dates]({% slug disableddates_daterangepicker_aspnetcore %})|The DateRangePicker allows you to disable specific days that shouldn't be selected by the end user, such as weekends and national holidays.|
| [Selected dates]({% slug selecteddates_daterangepicker_aspnetcore %})|The DateRangePicker allows you to define the minimum and maximum dates it displays and also render a pre-selected date range.|
| [Start view and navigation depth]({% slug navdepth_daterangepicker_aspnetcore %})|The DateRangePicker enables you to set the initially rendered view and define the navigation depth of the views.|
| [Validation]({% slug validation_daterangepicker_aspnetcore %})|The DateRangePicker does not automatically update the typed text when the typed text is invalid. Such changes in the input value may lead to unexpected behavior.|
| [Date formatting]({% slug dateformatting_daterangepicker_aspnetcore %})|The DateRangePicker allows you to define its date formatting.|
| [Calendar types]({% slug calendartypes_daterangepicker_aspnetcore %})|The DateRangePicker works with `Date` objects which support only the [Gregorian](https://en.wikipedia.org/wiki/Gregorian_calendar) calendar.|
| [Week number column]({% slug weeknumcolumn_daterangepicker_aspnetcore %})|The DateRangePicker provides options for rendering a column which displays the number of the weeks within the current `Month` view.|
| [Globalization]({% slug globalization_daterangepicker_aspnetcore %})|The DateRangePicker comes with globalization support that allows you to use the component in apps all over the world.|
| [Accessibility]({% slug htmlhelpers_daterangepicker_accessibility %})|The DateRangePicker is accessible for screen readers, supports WAI-ARIA attributes, and delivers [keyboard shortcuts]({% slug keynav_daterangepicker_aspnetcore %}) for faster navigation.|
| [Reverse Selection]({% slug reverse_selection_daterangepicker_aspnetcore %})|The component allows you to pick an end date which is before the start date.|
| [Buttons]({% slug buttons_daterangepicker_aspnetcore %})|Learn more about the buttons supported by the component.|
| [Automatic Correction]({% slug htmlhelpers_daterangepicker_autocorrect_aspnetcore %})| You can configure whether the component will autocorrect the user's input when the `Min` and `Max` values are set. |

## Referencing Existing Instances

To reference an existing DateRangePicker instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method. Once a reference has been established, use the [DateRangePicker client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker#methods) to control its behavior.

The following example demonstrates how to access an existing DateRangePicker instance.

        // Place the following after the DateRangePicker for {{ site.framework }} declaration.
        <script>
        $(function() {
        // The Name() of the DateRangePicker is used to get its client-side instance.
            var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");
        });
        </script>

## Next Steps

* [Getting Started with the DateRangePicker]({% slug daterangepicker_getting_started %})
* [Basic Usage of the DateRangePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/daterangepicker/index)
{% if site.core %}
* [Basic Usage of the DateRangePicker TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/daterangepicker/tag-helper)
* [DateRangePicker in Razor Pages]({% slug htmlhelpers_daterangepicker_razorpage_aspnetcore %})
{% endif %}

## See Also

* [Using the API of the DateRangePicker for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/daterangepicker/api)
* [Knowledge Base Section](/knowledge-base)
