---
title: Overview
page_title: Overview | Kendo UI DateInput
description: "Learn how to initialize the Kendo UI DateInput widget and configure its options."
slug: overview_kendoui_dateinput_widget
position: 1
---

# DateInput Overview

The [Kendo UI DateInput widget](http://demos.telerik.com/kendo-ui/dateinput/index) allows users to enter date and time through direct input.

The DateInput provides separate sections for days, months, years, hours, and minutes. DateInput also supports customizing the date and time formats.

## Getting Started

### Initialize the DateInput

To initialize the DateInput, use the following example.

```dojo
    <input id="dateInput" />

    <script>
      $(document).ready(function(){
        $("#dateInput").kendoDateInput();
      });
    </script>
```

## Configuration

The DateInput provides configuration options that can be set during initialization. The available properties are:

* Selected date
* Format definition
* Enabled and read-only state

### Selected date, Format

The following example demonstrates how to create a non-editable DateInput with a selected date. The date is displayed in a predefined format.

###### Example

```dojo
    <input id="dateInput" />

    <script>
      $(document).ready(function(){
        $("#dateInput").kendoDateInput({
          value: new Date(),
          format: "dd/MM/yyyy",
          readonly: true
        });
      });
    </script>
```

## Validation

The input in each section of the component is always valid for the relevant section. For example, you cannot enter 23 in the month section. As a result, the value in DateInput is always a valid date.

## Integration with Other Editor Widgets

You can integrate the DateInput with:

* DatePickers
* DateTimePickers
* TimePickers

The following example demonstrates how to integrate the DateInput with the DatePicker by enabling the `dateInput` property of the DatePicker.

###### Example

```dojo
    <input id="datepicker" />

    <script>
      $("#datepicker").kendoDatePicker({
        dateInput: true
      });
    </script>
```

## Localization

The DateInput enables you to modify the text that is displayed in the placeholders based on your requirements.

###### Example

```dojo
    <input id="dateinput" />

    <script>
      $("#dateinput").kendoDateInput({
        format: "dd / MMMM / yyyy",
        messages:{
          month:"____",
          year:"____",
          day:"__",
        }
      });
    </script>
```

## See Also

* [Overview of the ASP.NET MVC HtmlHelper Extension for the DateInput Widget](/aspnet-mvc/helpers/dateinput/overview)
* [Overview of the DateInput JSP Tag]({% slug overview_dateinput_uiforjsp %})
* [Overview of the DateInput PHP Class](/php/widgets/dateinput/overview)
* [DateInput JavaScript API Reference](/api/javascript/ui/dateinput)

Articles on the Kendo UI Calendar:

* [Overview of the Calendar Widget]({% slug overview_kendoui_calendar_widget %})
* [How to Control the Header Format]({% slug howto_control_header_format_calendar %})
* [Calendar JavaScript API Reference](/api/javascript/ui/calendar)

Articles on the Kendo UI DatePicker:

* [Overview of the DatePicker Widget]({% slug overview_kendoui_datepicker_widget %})
* [How to Set the First Weekday]({% slug howto_set_first_weekday_datepicker %})
* [How to Create Date Masking]({% slug howto_create_date_masking_datepicker %})
* [How to Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [How to Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
* [DatePicker JavaScript API Reference](/api/javascript/ui/datepicker)

Articles on the Kendo UI TimePicker:

* [Overview of the TimePicker Widget]({% slug overview_kendoui_timepicker_widget %})
* [TimePicker JavaScript API Reference](/api/javascript/ui/timepicker)

Articles on the Kendo UI DateTimePicker:

* [Overview of the DateTimePicker Widget]({% slug overview_kendoui_datetimepicker_widget %})
* [How to Prevent Invalid Values]({% slug howto_prevent_invalid_values_datetimepicker %})
* [How to Validate Custom Dates]({% slug howto_validate_custom_dates_datetimepicker %})
* [How to Limit Navigation to Months]({% slug howto_limit_navigation_tomonths_datetimepicker %})
* [How to Override Hours in the Popup]({% slug howto_override_hours_inpopup_datetimepicker %})
* [DateTimePicker JavaScript API Reference](/api/javascript/ui/datetimepicker)
