---
title: Calendar
page_title: Migrating the Calendar Extension | Telerik UI for ASP.NET MVC
description: "Handle the Telerik UI ASP.NET MVC server-side API for migrating the Calendar Extension."
previous_url: /migration/widgets/calendar
slug: calendar_migrationextensions_aspnetmvc
---

# Migrating the Calendar Extension

To migrate the Telerik UI Calendar Extension for ASP.NET MVC to Telerik UI for ASP.NET MVC, use the available and updated API.

* The following example demonstrates the change when working with the events.

    ```Previous

        Html.Telerik().Calendar().Name("Calendar").ClientEvents( events => events.OnChange(“change”))
    ```
    ```Current

        Html.Kendo().Calendar().Name("Calendar").Events( events => events.Change(“change”))
    ```

* The following example demonstrates the change when setting the min date.

    ```Previous

        Html.Telerik().Calendar().Name("Calendar").MinDate(DateTime.Now)
    ```
    ```Current

        Html.Telerik().Calendar().Name("Calendar").MaxDate(DateTime.Now)
    ```

* The following example demonstrates the change when setting the max date.

    ```Previous

        Html.Kendo().Calendar().Name("Calendar").Min(DateTime.Now)
    ```
    ```Current

        Html.Kendo().Calendar().Name("Calendar").Max(DateTime.Now)
    ```

* The following example demonstrates the change when setting the footer.

    ```Previous

        Html.Telerik().Calendar().Name("Calendar").TodayButton(“d”)</code></td>
    ```
    ```Current

        Html.Kendo().Calendar().Name("Calendar").Footer(“#= kendo.toString(data, ‘MM/dd/yyyy’)”)
    ```

## See Also

* [Migrating the AutoComplete Extension]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrating from Telerik UI Extensions (Overview of Changes)]({% slug overview_migrationextensions_aspnetmvc %})
