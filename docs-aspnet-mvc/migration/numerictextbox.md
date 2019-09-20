---
title: NumericTextBox
page_title: Migrating the NumericTextBox Extension | Telerik UI for ASP.NET MVC
description: "Handle the Telerik UI ASP.NET MVC server-side API for migrating the NumericTextBox Extension."
previous_url: /migration/widgets/numerictextbox
slug: numerictextbox_migrationextensions_aspnetmvc
---

# Migrating the NumericTextBox Extension

To migrate the Telerik UI NumericTextBox Extension for ASP.NET MVC to Telerik UI for ASP.NET MVC, use the available and updated API.

* The following example demonstrates the change when setting the `IncrementStep` configuration.

    ```Previous

        Html.Telerik().NumericTextBox().IncrementStep(1)
    ```
    ```Current

        Html.Kendo().NumericTextBox().Step(1)
    ```

* The following example demonstrates the change when setting the min value.

    ```Previous

        Html.Telerik().NumericTextBox().MinValue(1)
    ```
    ```Current

        Html.Kendo().NumericTextBox().Min(1)

    ```

* The following example demonstrates the change when setting the max value.

    ```Previous

        Html.Telerik().NumericTextBox().MaxValue(1)
    ```
    ```Current

        Html.Kendo().NumericTextBox().Max(1)
    ```

* The following example demonstrates the change when setting an empty message.

    ```Previous

        Html.Telerik().NumericTextBox().EmptyMessage(“Enter”)
    ```
    ```Current

        Html.Kendo().NumericTextBox().Placeholder(“Enter”)
    ```

* The `ButtonTitleUp` and `ButtonTitleDown` are not implemented.
* The following example demonstrates the change when setting the `DecimalDigits` setting.

    ```Previous

        Html.Telerik().NumericTextBox().DecimalDigits(3)
    ```
    ```Current

        Html.Kendo().NumericTextBox().Decimals(3)
    ```

* The `NumberGroupSize`, `NumberGroupSeparator`, `NegativePatternIndex`, `DecimalSeparator`, and `CurrencySymbol` are not implemented. Use the `Format()` and `Culture()` methods instead.
* The following example demonstrates the change when working with the events.

    ```Previous

        var datePicker = $("#DatePicker").data("tTextBox");
        datePicker.disable();
    ```
    ```Current

        var datePicker = $("#datepicker").data("kendoNumericTextBox");
        datePicker.enable(false);
    ```

## See Also

* [Migrating the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrating from Telerik UI Extensions (Overview of Changes)]({% slug overview_migrationextensions_aspnetmvc %})
