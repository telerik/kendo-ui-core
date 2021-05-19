---
title: Localization
page_title: jQuery DatePicker Documentation | DatePicker Localization
description: "Get started with the jQuery DatePicker by Kendo UI and translate its messages for different culture locales."
slug: localization_datepicker
position: 3
---

# Localization

The DatePicker provides options for localizing its user interface by utilizing its [`culture`](/api/javascript/ui/datepicker/configuration/culture) property.

To enable the desired culture, add a reference to the script file before the widget is initialized and include the desired culture in the settings of the widget.

```dojo
  <script src="https://kendo.cdn.telerik.com/2019.2.514/js/cultures/kendo.culture.de-DE.min.js"></script>
    <input id="datepicker" />
    <script>
      $("#datepicker").kendoDatePicker({
        culture:"de-DE",
        value: new Date()
      });
    </script>
```

## See Also

* [RTL Support by the DatePicker (Demo)](https://demos.telerik.com/kendo-ui/datepicker/right-to-left-support)
* [Localization in Kendo UI for jQuery]({% slug overview_kendoui_globalization %})
* [JavaScript API Reference of the DatePicker](/api/javascript/ui/datepicker)
