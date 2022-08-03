---
title: Localization
page_title: Localization
description: "Get started with the Telerik UI Calendar for {{ site.framework }} and translate its messages for different culture locales."
slug: localization_calendar_aspnetcore
position: 2
---

# Localization

The Calendar provides options for localizing its user interface by utilizing its [`Culture`](/api/Kendo.Mvc.UI.Fluent/CalendarBuilder#culturesystemstring) property.

To enable the desired culture, add a reference to the script file before the Calendar is initialized and include the desired culture in the settings of the helper.

```HtmlHelper
    <script src="https://kendo.cdn.telerik.com/2022.2.621/js/cultures/kendo.culture.de-DE.min.js"></script>
    @(Html.Kendo().Calendar()
        .Name("calendar")
        .Culture("de-DE")
    )
```
{% if site.core %}
```TagHelper
    <script src="https://kendo.cdn.telerik.com/2022.2.621/js/cultures/kendo.culture.de-DE.min.js"></script>
    <kendo-calendar name="calendar" culture="de-DE">
    </kendo-calendar>
```
{% endif %}

## See Also

* [Server-Side API](/api/calendar)
