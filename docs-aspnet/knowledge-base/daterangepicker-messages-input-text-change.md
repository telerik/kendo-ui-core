---
title: Setting Messages in Start and End DateInputs for DateRangePicker
description: An example demonstrating how to change the input placeholders for the start and end dateInputs
type: how-to
page_title: Changing Default Messages
slug: daterangepicker-messages-input-text-change
tags: daterangepicker, messages, input, text, change, month, day, year, hour, minute, second, dayperiod, placeholder
ticketid: 1417334
res_type: kb
components: ["general"]
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>DateRangePicker for Progress® Telerik® UI for ASP.NET Core</td>
 </tr>

  <td>Product Version</td>
  <td>2019.2.514</td>
 </tr>
</table>

## Description

How can I change the default **day/month/year** placeholder text in the {{ site.product }} DateRangePicker?

## Solution

To change the start and end input messages, reference the DateRangePicker and set the message options of the `_startDateInput` and `_endDateInput`:

```HTML dojo
    <div id="dateRangePicker"></div>
    
    <script>
      $(function () {
        var dateRangePicker = $("#dateRangePicker").kendoDateRangePicker().data("kendoDateRangePicker");

        dateRangePicker._startDateInput.setOptions({
          messages: {
            "year": "yyyy",
            "month": "mm",
            "day": "dd",
            "hour": "hh",
            "minute": "mm",
            "second": "ss",
            "dayperiod": "am/pm",
          }
        });

        dateRangePicker._endDateInput.setOptions({
          messages: {
            "year": "yyyy",
            "month": "mm",
            "day": "dd",
            "hour": "hh",
            "minute": "mm",
            "second": "ss",
            "dayperiod": "am/pm",
          }
        });
      });
    </script>
```

## More {{ site.framework }} DateRangePicker Resources

* [{{ site.framework }} DateRangePicker Documentation]({%slug htmlhelpers_daterangepicker_aspnetcore%})

* [{{ site.framework }} DateRangePicker Demos](https://demos.telerik.com/{{ site.platform }}/daterangepicker/index)

{% if site.core %}
* [{{ site.framework }} DateRangePicker Product Page](https://www.telerik.com/aspnet-core-ui/core-daterangepicker)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} DateRangePicker Product Page](https://www.telerik.com/aspnet-mvc/mvc-daterangepicker)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the DateRangePicker for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker)
* [Server-Side API Reference of the DateRangePicker for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/daterangepicker)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
