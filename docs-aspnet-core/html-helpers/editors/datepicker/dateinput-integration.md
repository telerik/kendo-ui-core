---
title: DateInput Integration
page_title: DateInput Integration | Telerik UI DatePicker HtmlHelper for ASP.NET Core
description: "Get started with the Telerik UI for ASP.NET Core DatePicker and learn how to integrate it with the Telerik UI for ASP.NET Core DateInput."
slug: htmlhelpers_datepicker_aspnetcore_dateinputintegration
position: 8
---

# DateInput Integration

The DatePicker provides integration options with the [Telerik UI for ASP.NET Core DateInput]({% slug htmlhelpers_dateinput_aspnetcore %}) for the input element it renders.

To use the DateInput as the input element in a DatePicker, enable the [`DateInput`](/api//Kendo.Mvc.UI.Fluent/DatePickerBuilder#dateinputsystemboolean) property of the DatePicker.

```Razor
    @(Html.Kendo().DatePicker()
        .Name("datepicker")
        .DateInput()
        .Value("10/10/2019")
    )
```

## See Also

* [Basic Usage of the DatePicker HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/datepicker/index)
* [Server-Side API](/api/datepicker)
