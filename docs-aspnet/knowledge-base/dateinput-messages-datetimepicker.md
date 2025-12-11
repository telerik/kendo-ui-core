---
title: Setting the DateInput Messages of the DateTimePicker
page_title: Setting the DateInput Messages of the DateTimePicker
description: An example on how to set the {{ site.product }} DateInput messages of the DateTimePicker.
slug: datetimepicker-dateinput-messages-change
tags: telerik, dateinput, messages, datetimepicker, placeholder
component: datetimepicker
type: how-to
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} DateTimePicker</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.802 version</td>
 </tr>
</table>

## Description

How can I configure the messages of the date input in the {{ site.product }} DateTimePicker?

## Solution

To achieve the desired scenario, reference the `dateInput` of the DateTimePicker and use the [`setOptions`](https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker/methods/setoptions) method of the DateTimePicker to change its messages. 


```Razor Index.cshtml

    @(Html.Kendo().DatePicker()
            .Name("datepicker")
            .DateInput()
            .HtmlAttributes(new { style = "width: 100%", title = "datepicker" })
    )

```
```JS script.js

    <script>
        $(document).ready(function () {
            var datetimepicker = $("#OrderDate").data("kendoDatePicker");
            datetimepicker._dateInput.setOptions({
                messages: {
                    "year": "YYYY",
                    "month": "MM",
                    "day": "DD"
                }
            });
        })
    </script>

```

For the complete implementation of the suggested approach, refer to the [Telerik REPL example on setting the date input messages of the DateTimePicker](https://netcorerepl.telerik.com/cwPlmlFH31nEdqv650).


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

* [Telerik REPL: Setting the Date Input Messages of the DateTimePicker](https://netcorerepl.telerik.com/cwPlmlFH31nEdqv650)
* [Client-Side API Reference of the DateTimePicker for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker)
* [Server-Side API Reference of the DateTimePicker for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/datetimepicker)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
