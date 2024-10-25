---
title: Selecting Week Days in the DatePicker
page_title: Selecting Week Days in the DatePicker
description: An example on how to select days of the week from the {{ site.product }} DatePicker.
slug: datepicker-select-days-of-week
tags: telerik, datepicker, select, days, week, depth, calendar
component: datepicker
type: how-to
ticketid: 1580901
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} DatePicker</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.3.913 version</td>
 </tr>
</table>

## Description

How can I select the days of the week from the {{ site.product }} DatePicker?

## Solution

1. Hide the initially rendered days of the week within the Popup Calendar of the DatePicker for {{ site.product }}.
1. Create a flag variable which will hold the days of the week.
1. To select the days of the week, handle the [`.MonthTemplate()`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/datepickerbuilder#monthtemplatesystemstring) and pass the current date as an argument.
1. Within the function handler, parse the date argument to a [`Date`](https://www.w3schools.com/js/js_dates.asp) object. To get the current day, use the [`.getDay()`](https://www.w3schools.com/jsref/jsref_getday.asp) method and obtain it from the previously defined flag variable.

```Index.cshtml
    @(Html.Kendo().DatePicker()
          .Name("datepicker")
          .Value(DateTime.Today)
          .Footer("Today - #=kendo.toString(data, 'd') #")
          .MonthTemplate(month => month.Content("#= getDays(date) #"))
    )
```
```Script.js
    <script>
        var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; // Create a flag variable for the days of the week.

        function getDays(date){
            var parsedDate = new Date(date); // Parse the date argument.

            var weekday = weekdays[parsedDate.getDay()]; // Get the current week day from the previously defined flag variable.

            return weekday;
        }  
    </script>
```
```Styles.css
    <style>
    /* Popup window size week headers.*/
    .k-calendar-thead > .k-calendar-tr
    {
        display:none;
    }

    /* Popup window size. */
    .k-calendar .k-calendar-view {
        width: 330px;
        padding: 0px;
        font-size:10px;
    }
    </style>

```
For the complete implementation of the suggested approach, refer to the [Telerik REPL example on selecting the days of the week within the DatePicker](https://netcorerepl.telerik.com/mGbauybw5279RlE740).


## More {{ site.framework }} DatePicker Resources

* [{{ site.framework }} DatePicker Documentation]({%slug htmlhelpers_datepicker_aspnetcore%})

* [{{ site.framework }} DatePicker Demos](https://demos.telerik.com/{{ site.platform }}/datepicker/index)

{% if site.core %}
* [{{ site.framework }} DatePicker Product Page](https://www.telerik.com/aspnet-core-ui/date-and-time-pickers)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} DatePicker Product Page](https://www.telerik.com/aspnet-mvc/datepicker)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Telerik REPL: Select the Current Days of the Week in the DatePicker](https://netcorerepl.telerik.com/mGbauybw5279RlE740)
* [Client-Side API Reference of the DatePicker for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker)
* [Server-Side API Reference of the DatePicker for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/datepicker)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
