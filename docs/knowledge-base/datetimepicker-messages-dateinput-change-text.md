---
title: Set DateInput Messages of DateTimePicker
description: An example on how to configure the messages for the date input in the  Kendo UI DateTimePicker.
type: how-to
page_title: Change Text of DateTimePicker DateInput Messages | Kendo UI DateTimePicker for jQuery
slug: datetimepicker-messages-dateinput-change-text
tags: datetimepicker, messages, dateinput, change, text, year, month, day, hour, minute, second, dayperiod, datepicker
ticketid: 1350298
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>DateTimePicker for Progress® Kendo UI®</td>
 </tr>

  <td>Product Version</td>
  <td>2019.1.220</td>
 </tr>
</table>

## Description

How can I configure the messages of the date input in the Kendo UI DateTimePicker?

## Solution

1. Reference the date input by using the [`setOptions` method of the DateTimePicker](/api/javascript/ui/datetimepicker/methods/setoptions).
1. Change its [`messages`](/api/javascript/ui/dateinput/configuration/messages).

```dojo
    <input id="datetimepicker" title="datetimepicker" style="width: 100%;" />

    <script>
      $(document).ready(function () {
        $("#datetimepicker").kendoDateTimePicker({
          dateInput: true
        });

        var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");
        datetimepicker._dateInput.setOptions({
          messages:{
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

## See Also

* [setOptions - Documentation and API Reference ](https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker/methods/setoptions)
* [messages - Documentation and API Reference ](https://docs.telerik.com/kendo-ui/api/javascript/ui/dateinput/configuration/messages)
