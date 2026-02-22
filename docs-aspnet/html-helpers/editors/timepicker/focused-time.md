---
title: Focused Time
page_title: Focused Time
description: "Get started with the {{ site.product }} TimePicker and learn how to set the focused time when the user opens the pop-up."
components: ["timepicker"]
slug: htmlhelpers_timepicker_aspnetcore_focusedtime
position: 4
---

# Focused Time

The TimePicker allows you to define focused time when the time chooser pop-up is opened. This will provide a convenient way for the user to easily select a highlighted time slot. Also, the pop-up container list is automatically scrolled according to this time item.

The following example demonstrates how apply the FocusedTime setting. By default, the TimePicker focuses the default time of 12:00 AM. However, a common requirement is to have the focused time to be 8:00 AM. 

```HtmlHelper
   @(Html.Kendo().TimePicker()
       .Name("timepicker")
       .DateInput()
       .FocusTime(new DateTime(2023, 5, 5, 8, 0, 0))
   )
```
{% if site.core %}
```TagHelper
            <kendo-timepicker name="timepicker"
                              date-input="true" focus-time="new DateTime(2023, 5, 5, 8, 0, 0)">
            </kendo-timepicker>
```
{% endif %}

## See Also

* [Server-Side API](/api/timepicker)
