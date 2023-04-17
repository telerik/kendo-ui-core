---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI DatePicker component for {{ site.framework }}."
previous_url: /helpers/html-helpers/datepicker, /helpers/editors/datepicker/overview
slug: htmlhelpers_datepicker_aspnetcore
position: 0
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

|Feature|Description|
|-------|-----------|
| [Disabled dates]({% slug htmlhelpers_datepicker_aspnetcore_disableddates %}) | The DatePicker allows you to disable specific days that are not intended for user interaction. |
| [Selected dates]({% slug htmlhelpers_datepicker_aspnetcore_selecteddates %}) | The DatePicker allows you to render a pre-selected date upon loading. |
| [Start view and navigation depth]({% slug htmlhelpers_datepicker_aspnetcore_navdepth %}) | You can also set the initial view the DatePicker renders and define the navigation depth of its views. |
| [Validation]({% slug htmlhelpers_datepicker_aspnetcore_validation %}) | The DatePicker keeps its input value unchanged even when the typed date is invalid. |
| [Calendar types]({% slug htmlhelpers_datepicker_aspnetcore_calendartypes %}) | Even though, by default, the DatePicker supports only the Gregorian calendar, you can still work around this behavior and render other calendar types. |
| [Week number column]({% slug htmlhelpers_datepicker_aspnetcore_weeknumbercolumn %}) | The DatePicker provides options for rendering a column which displays the number of the weeks within the current Month view. |
| [DateInput integration]({% slug htmlhelpers_datepicker_aspnetcore_dateinputintegration %}) | The fluent integration between the DatePicker and the DateInput allows you to take advantage of the natively available features of both components. |
| [Templates]({% slug htmlhelpers_datepicker_aspnetcore_templates %}) | You can customize the content and look and feel of the DatePicker by utilizing templates. |
| [Accessibility]({% slug htmlhelpers_datepicker_aspnetcore_accessibility %}) | The DatePicker is accessible for screen readers, supports WAI-ARIA attributes, delivers keyboard shortcuts for faster navigation, and allows you to render it in a right-to-left direction. |

## Next Steps

* [Getting Started with the DatePicker]({% slug datepicker_getting_started %})
* [Basic Usage of the DatePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datepicker/index)
{% if site.core %}
* [Basic Usage of the DatePicker TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/datepicker/tag-helper)
{% endif %}

## See Also

* [Using the API of the DatePicker HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datepicker/api)
* [Server-Side API](/api/datepicker)
* [Knowledge Base Section](/knowledge-base)