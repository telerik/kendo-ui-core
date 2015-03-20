---
title: NumericTextBox
page_title: API documentation for Kendo UI jQuery NumericTextBox control with ASP.NET MVC
description: Documentation and code examples about server-side and client-side API for Kendo UI NumericTextBox component.
---

# Server-Side API

**IncrementStep**:

#### Old

    Html.Telerik().NumericTextBox().IncrementStep(1)

#### New
    
    Html.Kendo().NumericTextBox().Step(1)

Min/Max value:

#### Old

    Html.Telerik().NumericTextBox().MinValue(1)
    Html.Telerik().NumericTextBox().MaxValue(1)

#### New

    Html.Kendo().NumericTextBox().Min(1)
    Html.Kendo().NumericTextBox().Max(1)

Empty message:

#### Old

    Html.Telerik().NumericTextBox().EmptyMessage(“Enter”)

#### New

    Html.Kendo().NumericTextBox().Placeholder(“Enter”)

ButtonTitleUp and ButtonTitleDown:

Not implemented.

DecimalDigits:

#### Old
    
    Html.Telerik().NumericTextBox().DecimalDigits(3)

#### New

    Html.Kendo().NumericTextBox().Decimals(3)
    
**NumberGroupSize**, **NumberGroupSeparator**, **NegativePatternIndex**, **DecimalSeparator**, **CurrencySymbol**:

Not implemented in Kendo. Can use **Format()** and **Culture()** methods to achieve the same result.

# Client-Side API

## Events

All Events No Longer Have the “On” Prefix.

All Widgets No Longer Have The OnLoad Event. Please Use **$(document).ready()** Instead.

Disable and enable:

#### Old

    var datePicker = $("#DatePicker").data("tTextBox");
    datePicker.disable();

#### New
    
    var datePicker = $("#datepicker").data("kendoNumericTextBox");
    datePicker.enable(false);