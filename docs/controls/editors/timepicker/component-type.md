---
title: Component Types
page_title: jQuery TimePicker Documentation | TimePicker Component Types
description: "Get started with the jQuery TimePicker by Kendo UI and learn how to enable the modern component type."
slug: componenttypes_timepicker
position: 5
---

# Component Types

As of R2 2020 version of the Kendo UI suite, the TimePicker widget introduces a new component type. It aims to enhance the existing rendering and deliver a fresh and modern look and feel. 

By default, the TimePicker is initialized with the `classic` render mode. In order to set it to `modern`, configure the options of the widget as follows:

```
    $("#timepicker").kendoTimePicker({
        componentType:"modern"
    });
```

As a result, the appearance of the widget is alternated. 

![Comparison between the content types](../../../images/modern-classic-timepicker.png)

> The rendered selectors in the Kendo UI TimePicker depend on the currently applied format. If the format is omitted, the default format from the application's culture is used. 

## See Also

* [JavaScript API Reference of the DatePicker](/api/javascript/ui/timepicker)