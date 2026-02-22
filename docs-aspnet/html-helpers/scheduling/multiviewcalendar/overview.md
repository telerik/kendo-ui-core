---
title: Overview
page_title: Overview
description: "The Telerik UI MultiViewCalendar component for {{ site.framework }} provides a styled UI Calendar with the capability of displaying multiple Views at the same time."
components: ["multiviewcalendar"]
previous_url: /helpers/scheduling/multiviewcalendar/overview
slug: overview_multiviewcalendar_htmlhelper_aspnetcore
position: 0
---

# {{ site.framework }} MultiViewCalendar Overview

{% if site.core %}
The Telerik UI MultiViewCalendar TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI MultiViewCalendar widget.
{% else %}
The Telerik UI MultiViewCalendar HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI MultiViewCalendar widget.
{% endif %}

The MultiViewCalendar renders a graphical Gregorian calendar with multiple horizontal views.

* [Demo page for the MultiViewCalendar HtmlHelper](https://demos.telerik.com/{{ site.platform }}/multiviewcalendar/index)
{% if site.core %}
* [Demo page for the MultiViewCalendar TagHelper](https://demos.telerik.com/aspnet-core/multiviewcalendar)
{% endif %}

## Initializing the MultiViewCalendar

1. Make sure you followed all the steps from the [introductory article on {{ site.product }}](https://docs.telerik.com/{{ site.platform }}/introduction).

1. Create a new action method which renders the view.

    ```C#
    public ActionResult Index()
    {
        return View();
    }
    ```

1. Add a MultiViewCalendar.

    ```HtmlHelper
    @(Html.Kendo().MultiViewCalendar()
        .Name("MultiViewCalendar") // The name of the MultiViewCalendar is mandatory. It specifies the "id" attribute of the widget.
        .Min(new DateTime(2010, 1, 1, 10, 0, 0)) // Set the min time of the MultiViewCalendar.
        .Max(new DateTime(2010, 1, 1, 20, 0, 0)) // Set the min date of the MultiViewCalendar.
        .Value(DateTime.Now) // Set the value of the MultiViewCalendar.
    )
    ```
    {% if site.core %}
    ```TagHelper
    <kendo-multiviewcalendar name="multiviewcalendar"
      min="new DateTime(2010, 1, 1, 10, 0, 0)"
      max="new DateTime(2010, 1, 1, 20, 0, 0)"
      value="DateTime.Now">
    </kendo-multiviewcalendar>
    ```
    {% endif %}

## Functionality and Features

* [Active view]({% slug active_view_multiviewcalendar_htmlhelper_aspnetcore %})&mdash;You can select one of the predefined Views of the MultiViewCalendar.
* [Multiple views]({% slug multiple_views_multiviewcalendar_htmlhelper_aspnetcore %})&mdash;The MultiViewCalendar allows you to define the number of views and months that are displayed at a time.
* [Selection]({% slug selection_multiviewcalendar_htmlhelper_aspnetcore %})&mdash;The component allows you to select multiple dates by using the multiple-view selection mode.
* [Day template]({% slug day_template_multiviewcalendar_htmlhelper_aspnetcore %})&mdash;The MultiViewCalendar enables you to customize the rendered day for the `month` view.
* [Disable dates]({% slug disabled_dates_multiviewcalendar_htmlhelper_aspnetcore %})&mdash;The MultiViewCalendar allows you to disable certain days which are not intended to be selected by the end user such as weekends, national holidays, and others.
* [Week column]({% slug week_column_multiviewcalendar_htmlhelper_aspnetcore %})&mdash;You can choose to render a column which displays the number of the weeks within the current `month` view.
* [Keyboard navigation]({% slug keyboard_navigation_multiviewcalendar_htmlhelper_aspnetcore %})&mdash;The keyboard navigation of the MultiViewCalendar is always available.
* [Century cells format]({% slug htmlhelpers_century_cells_format_multiviewcalendar_aspnetcore %})&mdash;The component exposes two formats for the century cells.
* [Reverse selection]({% slug reverse_selection_multiviewcalendar_htmlhelper_aspnetcore %})&mdash;The component allows you to pick an end date which is before the start date.
* [Show other month days]({% slug htmlhelpers_show_other_month_days_multiviewcalendar_aspnetcore %})&mdash;The component allows you to control if the days from the previous/next months will be displayed.

## Next Steps

* [Getting Started with the MultiViewCalendar]({% slug aspnetcore_multiviewcalendar_getting_started %})
* [Basic Usage of the MultiViewCalendar for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multiviewcalendar/index)
{% if site.core %}
* [MultiViewCalendar in Razor Pages]({% slug razorpages_multiviewcalendar_aspnetcore %})
{% endif %}

## See Also

* [Using the API of the MultiViewCalendar (Demo)](https://demos.telerik.com/{{ site.platform }}/multiviewcalendar/api)
* [Knowledge Base Section](/knowledge-base)
