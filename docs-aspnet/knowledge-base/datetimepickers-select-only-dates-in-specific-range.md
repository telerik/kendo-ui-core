---
title: Enabling Only Dates in a Specific Date Range using DateTime Picker in {{ site.framework }}
description: Learn how to utilize the DisableDates handler functionality of the DateTimePicker in {{ site.framework }} to restrict the selection of dates.
type: how-to
page_title: Selecting Dates between Current Date and Next 30 Days using DateTime Picker in {{ site.framework }}
slug: datetimepickers-select-only-dates-in-specific-range
tags: datetimepicker, date-selection, disable-dates, specific, date-range, restrict, rules
ticketid: 1634938
res_type: kb
components: ["general"]
---

## Environment
| Product | Date/Time Pickers for {{ site.framework }} |
| Version | 2023.3.1114 |

## Description
I want to select a DateTime between the current date and the following 30 days using the DateTime Picker in {{ site.framework }}. I would like to restrict the selection to only dates within this range and disable dates outside of it.

## Solution
To achieve this, you need to utilize the [DisableDates handler functionality](https://docs.telerik.com/aspnet-core/api/kendo.mvc.ui.fluent/datepickerbuilder#disabledatessystemstring) of the DateTimePicker in {{ site.framework }}. 

Modify the JavaScript logic of the [DateTimePicker Disabled Dates Demo](https://demos.telerik.com/{{ site.platform}}/datetimepicker/disable-dates) with the code below:

```javascript
function disableDates(date) {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    var endDate = new Date();
    var monthIndex = (new Date().getMonth() + 1) % 12;
    if (monthIndex == 0) {
        endDate.setYear(endDate.getFullYear() + 1);
    }
    endDate.setMonth(monthIndex);

    if (date && compareDates(date, currentDate, endDate)) {
        return false;
    } else {
        return true;
    }
}

function compareDates(date, startDateRange, endDateRange) {
    if (date.getTime() > startDateRange.getTime() && date.getTime() < endDateRange.getTime()) {
        return true;
    } else {
        return false;
    }
}
```

See the suggested behavior in action in [this Telerik REPL example](https://netcorerepl.telerik.com/mdlmPXvg01qEsg0c37).


## Notes
- This solution uses JavaScript logic to disable the dates outside the specified range.
- The code provided compares the selected date with the current date and the end date (current date + 30 days) to determine if it falls within the range.
- You may need to adjust the logic to fit the specific restriction rules of the scenario at hand.

## More {{ site.framework }} DateTimePicker Resources

* [{{ site.framework }} DateTimePicker Documentation]({%slug htmlhelpers_datetimepicker_aspnetcore%})

* [{{ site.framework }} DateTimePicker Demos](https://demos.telerik.com/{{ site.platform }}/datetimepicker/index)

{% if site.core %}
* [{{ site.framework }} DateTimePicker Product Page](https://www.telerik.com/aspnet-core-ui/date-and-time-pickers)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} DateTimePicker Product Page](https://www.telerik.com/aspnet-mvc/datetimepicker)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the DateTimePicker for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker)
* [Server-Side API Reference of the DateTimePicker for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/datetimepicker)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
