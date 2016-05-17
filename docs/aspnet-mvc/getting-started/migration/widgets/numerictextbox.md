---
title: NumericTextBox
page_title: NumericTextBox | Migrate from Telerik Extensions
description: "Handle ASP.NET MVC server-side API for the Kendo UI NumericTextBox widget."
slug: numerictextbox_migrationextensions_aspnetmvc
---

# NumericTextBox Migration

This article demonstrates the ASP.NET MVC server-side API for the Kendo UI NumericTextBox widget.

## Server-Side API

### IncrementStep

```tab-Previous

    Html.Telerik().NumericTextBox().IncrementStep(1)
```
```tab-Current

    Html.Kendo().NumericTextBox().Step(1)
```

### Min Value

```tab-Previous

    Html.Telerik().NumericTextBox().MinValue(1)
```
```tab-Current

    Html.Kendo().NumericTextBox().Min(1)

```

### Max Value

```tab-Previous

    Html.Telerik().NumericTextBox().MaxValue(1)
```
```tab-Current

    Html.Kendo().NumericTextBox().Max(1)
```

### Empty Message

```tab-Previous

    Html.Telerik().NumericTextBox().EmptyMessage(“Enter”)
```
```tab-Current

    Html.Kendo().NumericTextBox().Placeholder(“Enter”)
```

### ButtonTitleUp and ButtonTitleDown

Not implemented.

### DecimalDigits

```tab-Previous

    Html.Telerik().NumericTextBox().DecimalDigits(3)
```
```tab-Current

    Html.Kendo().NumericTextBox().Decimals(3)
```

The `NumberGroupSize`, `NumberGroupSeparator`, `NegativePatternIndex`, `DecimalSeparator`, and `CurrencySymbol` are not implemented in Kendo UI. Use the `Format()` and `Culture()` methods instead to achieve the same result.

## Client-Side API

### Events

None of the events has the `On` prefix anymore.

None of the widgets features the `OnLoad` event anymore. Use the `$(document).ready()` instead.

### Enable and Disable

```tab-Previous

    var datePicker = $("#DatePicker").data("tTextBox");
    datePicker.disable();
```
```tab-Current

    var datePicker = $("#datepicker").data("kendoNumericTextBox");
    datePicker.enable(false);
```

## See Also

Other articles on migrating from Telerik Extensions:

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})
* [Migrate the Chart]({% slug chart_migrationextensions_aspnetmvc %})

To see the articles on migrating Кendo UI controls from Telerik Extensions, browse [this section]({% slug combobox_migrationextensions_aspnetmvc %}).
