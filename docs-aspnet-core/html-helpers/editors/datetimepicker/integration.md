---
title: DateInput Integration
page_title: DateInput Integration | Telerik UI DateTimePicker HtmlHelper for ASP.NET Core
description: "Get started with the Telerik UI DateTimePicker for ASP.NET and learn how to integrate it with the Telerik UI DateInput."
slug: dateinputintegration_datetimepicker_aspnetcore
position: 9
---

# DateInput Integration

The DatePicker provides integration options with the [Telerik UI DateInput for ASP.NET Core]({% slug htmlhelpers_dateinput_aspnetcore %}) for the input element it renders.

To use the DateInput as the input element in a DateTimePicker, enable the [`DateInput`](/api//Kendo.Mvc.UI.Fluent/DateTimePickerBuilder#dateinputsystemboolean) property of the DateTimePicker.

```
    @(Html.Kendo().DateTimePicker()
        .Name("dateTimePicker")
        .DateInput(true)
    )
```

## See Also

* [Server-Side API](/api/datetimepicker)
