---
title: TimePicker
page_title: Migrating the TimePicker Extension | Telerik UI for ASP.NET MVC
description: "Handle the Telerik UI ASP.NET MVC server-side API for migrating the TimePicker Extension."
previous_url: /migration/widgets/timepicker
slug: timepicker_migrationextensions_aspnetmvc
---

# Migrating the TimePicker Extension

To migrate the Telerik UI TimePicker Extension for ASP.NET MVC to Telerik UI for ASP.NET MVC, use the available and updated API.

* The following example demonstrates the change when setting the min date.

    ```Previous

        Html.Telerik().Calendar().Name("Calendar").MinDate(DateTime.Now)

    ```
    ```Current

        Html.Kendo().Calendar().Name("Calendar").Min(DateTime.Now)

    ```

* The following example demonstrates the change when setting the max date.

    ```Previous

          Html.Telerik().Calendar().Name("Calendar").MaxDate(DateTime.Now)
    ```
    ```Current

          Html.Kendo().Calendar().Name("Calendar").Max(DateTime.Now)
    ```

* The following example demonstrates the change when setting the footer.

    ```Previous

        Html.Telerik().Calendar().Name("Calendar").TodayButton(“d”)
    ```
    ```Current

        Html.Kendo().Calendar().Name("Calendar").Footer(“#= kendo.toString(data, ‘MM/dd/yyyy’)”)
    ```

* The following example demonstrates the change when setting the `disable` event.

    ```Previous

        var datePicker = $("#DatePicker").data("tTimePicker");
        datePicker.disable();
    ```
    ```Current

        var datePicker = $("#datepicker").data("kendoTimePicker");
        datePicker.enable(false);
    ```

## See Also

* [Migrating the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrating from Telerik UI Extensions (Overview of Changes)]({% slug overview_migrationextensions_aspnetmvc %})
