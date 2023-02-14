---
title: Set the DateInput Messages of the DateTimePicker
page_title: Set the DateInput Messages of the DateTimePicker
description: "An example on how to set the {{ site.product }} DateInput messages of the DateTimePicker."
slug: datetimepicker-dateinput-messages-change
tags: telerik, dateinput, messages, datetimepicker, placeholder
component: datetimepicker
type: how-to
res_type: kb
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


```Index.cshtml

    @(Html.Kendo().DatePicker()
            .Name("datepicker")
            .DateInput()
            .HtmlAttributes(new { style = "width: 100%", title = "datepicker" })
    )

```
```Script.js

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

## See Also 

* [API Reference of the DateTimePicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker)