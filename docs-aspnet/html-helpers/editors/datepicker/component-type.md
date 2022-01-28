---
title: Component Types
page_title: Telerik UI DatePicker Documentation | DatePicker Component Types | Telerik UI
description: "Get started with the Telerik UI DatePicker and learn how to enable the modern component type."
slug: htmlhelpers_datepicker_aspnetcore_componenttype
position: 8
---

# Component Types

As of R2 2020 version of the Telerik UI for {{ site.framework }} suite, the DatePicker widget introduces a new component type. It aims to enhance the existing rendering and deliver a fresh and modern look and feel. 

By default, the DatePicker is initialized with the `classic` render mode. In order to set it to `modern`, configure the options of the widget as follows:

```
    @(Html.Kendo().DatePicker()
            .Name("datePicker")
            .ComponentType("modern")
    )
```

As a result, the appearance of the widget is alternated. 

![Comparison between the component types](../../../images/modern-classic-datepicker.png)

## See Also

* [Server-Side API](/api/datepicker)
