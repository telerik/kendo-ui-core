---
title: Buttons
page_title: Buttons
description: "Get started with the Telerik UI DateRangePicker for {{ site.framework }} and learn how to control the Calendar Popup behavior and leverage built-in buttons that will help you enhance the component's appearance."
slug: buttons_daterangepicker_aspnetcore
position: 7
---

# Buttons

The {{ site.product }} DateRangePicker exposes the ability to employ additional buttons within the date input of component. And control the behavior of how the Calendar Popup will be opened.

## Calendar Button

The {{ site.product }} DateRangePicker allows you to deliberately render a calendar button that will appear inside the. This allows you to dictate the behavior of how the Calendar Popup will be triggered.

```HtmlHelper
        @(Html.Kendo().DateRangePicker()
            .Name("daterangepicker")
            .CalendarButton(true)
        )
```

{% if site.core %}
```TagHelper
        <kendo-daterangepicker name="daterangepicker"
                               calendar-button="true">
        </kendo-daterangepicker>
```
{% endif %}

## Clear Button

The {{ site.product }} DateRangePicker allows render an additional button within the date input. The button allows you to clear to entered input value through manual interaction.

```HtmlHelper
        @(Html.Kendo().DateRangePicker()
            .Name("daterangepicker")
            .ClearButton(true)
        )
```

{% if site.core %}
```TagHelper
        <kendo-daterangepicker name="daterangepicker"
                               clear-button="true">
        </kendo-daterangepicker>
```
{% endif %}


## See Also

* [Show Other Month Days MultiViewCalendar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/daterangepicker/buttons)
* [Server-Side API](/api/daterangepicker)