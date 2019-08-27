---
title: Localization
page_title: Localization | Telerik UI TimePicker HtmlHelper for ASP.NET Core
description: "Get started with the Telerik UI TimePicker for ASP.NET Core and translate its messages for different culture locales."
slug: localization_timepicker_aspnetcore
position: 2
---

# Localization

The TimePicker provides options for localizing its user interface by utilizing its [`Culture`](/api//Kendo.Mvc.UI.Fluent/TimePickerBuilder#culturesystemstring) property.

To enable the desired culture, add a reference to the script file before the TimePicker is initialized and include the desired culture in the settings of the helper.

```
    <script src="https://kendo.cdn.telerik.com/2019.2.619/js/cultures/kendo.culture.de-DE.min.js"></script>

    @(Html.Kendo().TimePicker()
        .Name("TimePicker")
        .Culture("de-DE")
    )
```

## See Also

* [Globalization Support by the TimePicker HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/timepicker/globalization)
* [Server-Side API](/api/timepicker)
