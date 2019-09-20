---
title: DatePicker
page_title: Migrating the DatePicker Extension | Telerik UI for ASP.NET MVC
description: "Handle the Telerik UI ASP.NET MVC server-side API for migrating the DatePicker Extension."
previous_url: /migration/widgets/datepicker
slug: datepicker_migrationextensions_aspnetmvc
---

# Migrating the DatePicker Extension

To migrate the Telerik UI DatePicker Extension for ASP.NET MVC to Telerik UI for ASP.NET MVC, use the available and updated API.

* The following example demonstrates the change when setting the min date.

    ```Previous

        Html.Telerik().DatePicker().Name("DatePicker").MinDate(DateTime.Now)
    ```
    ```Current

        Html.Kendo().DatePicker().Name("DatePicker").Min(DateTime.Now)
    ```

* The following example demonstrates the change when setting the max date.

    ```Previous

        Html.Telerik().DatePicker().Name("DatePicker").MaxDate(DateTime.Now)
    ```
    ```Current

        Html.Kendo().DatePicker().Name("DatePicker").Max(DateTime.Now)
    ```

* The following example demonstrates the change when defining the footer.

    ```Previous

        Html.Telerik().DatePicker().Name("DatePicker").TodayButton(“d”)
    ```
    ```Current

        Html.Kendo().DatePicker().Name("DatePicker").Footer(“#= kendo.toString(data, ‘MM/dd/yyyy’)”)
    ```

* The following example demonstrates the change when using the `ShowButton` configuration.

    ```Previous

        Html.Telerik().DatePicker().Name("DatePicker").ShowButton(false)
    ```
    ```Current

        Not Supported
    ```

* The following example demonstrates the change when using the `ButtonTitle` configuration.

    ```Previous

        Html.Telerik().DatePicker().Name("DatePicker").ButtonTitle(“choose date”)

    ```
    ```Current

        Not Supported
    ```

* The following example demonstrates the change when using the `OpenOnFocus` configuration.

    ```Previous

        Html.Telerik().DatePicker().Name("DatePicker").OpenOnFocus(true)
    ```
    ```Current

        Not Supported
    ```

* The following example demonstrates the change when setting the `DateTime.MinValue` configuration and show `nothing`.

    ```Previous

        Html.Telerik().DatePicker().Name("DatePicker").Value(DateTime.MinValue)
    ```
    ```Current

        Html.Kendo().DatePicker().Name("DatePicker").Value(value == DateTime.MinValue ? null : value)
    ```

* The following example demonstrates the change when using the `disable` event.

    ```Previous

        var datePicker = $("#DatePicker").data("tDatePicker");
        datePicker.disable();
    ```
    ```Current

        var datePicker = $("#datepicker").data("kendoDatePicker");
        datePicker.enable(false);
    ```

## See Also

* [Migrating the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrating from Telerik UI Extensions (Overview of Changes)]({% slug overview_migrationextensions_aspnetmvc %})
