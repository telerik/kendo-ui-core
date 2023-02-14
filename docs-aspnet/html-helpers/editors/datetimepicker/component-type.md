---
title: Component Types
page_title: Telerik UI DateTimePicker Documentation - DateTimePicker Component Types
description: "Get started with the Telerik UI DateTimePicker and learn how to enable the modern component type."
slug: htmlhelpers_componenttype_datetimepicker_aspnetcore
position: 5
---

# Component Types

As of R2 2020 version of the Telerik UI for {{ site.framework }} suite, the DateTimePicker widget introduces a new component type. It aims to enhance the existing rendering and deliver a fresh and modern look and feel. 

By default, the DateTimePicker is initialized with the `classic` render mode. In order to set it to `modern`, configure the options of the widget as follows:

```HtmlHelper
    @(Html.Kendo().DateTimePicker()
            .Name("dateTimePicker")
            .ComponentType("modern")
    )
```
{% if site.core %}
```TagHelper
    <kendo-datetimepicker name="datetimepicker" component-type="modern"/>
```
{% endif %}

As a result, the appearance of the widget is alternated. 

![{{ site.product_short }} DateTimePicker comparison between the component types](../../../images/modern-classic-datetimepicker.png)

> The rendered selectors in the time picker of the Telerik UI DateTimePicker for {{ site.framework }} depend on the currently applied format. If the format is omitted, the default format from the application's culture is used. 

## See Also

* [Server-Side API](/api/datetimepicker)
