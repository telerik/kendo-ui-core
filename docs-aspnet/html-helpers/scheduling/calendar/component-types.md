---
title: Component Types
page_title: Telerik UI Calendar Documentation | Calendar Component Types | Telerik UI
description: "Get started with the Telerik UI Calendar and learn how to enable the modern component type."
slug: htmlhelpers_componenttype_calendar_aspnetcore 
position: 7
---

# Component Types

As of R2 2020 version of the Telerik UI for {{ site.framework }} suite, the Calendar widget introduces a new component type. It aims to enhance the existing rendering and deliver a fresh and modern look and feel. 

By default, the Calendar is initialized with the `classic` render mode. In order to set it to `modern`, configure the options of the widget as follows:

```
    @(Html.Kendo().Calendar()
        .Name("calendar")
        .ComponentType("modern")
    )
```

As a result, the appearance of the widget is alternated. 

![Comparison between the component types](../../../images/classic-modern-calendar-rendering.png)

## See Also

* [Server-Side API](/api/calendar)
