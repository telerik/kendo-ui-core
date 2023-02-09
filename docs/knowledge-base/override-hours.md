---
title: Override Hours in the DateTimePicker Popup
page_title: Override Hours in the DateTimePicker Popup
description: "Learn how to override hours in the popup of the Kendo UI DateTimePicker widget."
slug: howto_override_hours_inpopup_datetimepicker
previous_url: /controls/editors/datetimepicker/how-to/override-hours
tags: telerik, kendo, jquery, datetimepicker, override, hours, in, popup
component: datetimepicker
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® DateTimePicker for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I override hours in the popup of the Kendo UI for jQuery DateTimePicker?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
<input id="datetimepicker" />
<script>
  $(function() {
    $("#datetimepicker").kendoDateTimePicker({
        value: new Date(2000, 10, 1),
        open: function(e) {
			if (e.view === "time") {
              e.sender.timeView.dataBind([
                new Date(1970, 0, 1, 9),
                new Date(1970, 0, 1, 11),
                new Date(1970, 0, 1, 13),
                new Date(1970, 0, 1, 15),
                new Date(1970, 0, 1, 17),
                new Date(1970, 0, 1, 19),
                new Date(1970, 0, 1, )
              ])
            }
        }
    });
  });
</script>
```

## See Also

* [Using the API of the DateTimePicker (Demo)](https://demos.telerik.com/kendo-ui/datetimepicker/api)
* [JavaScript API Reference of the DateTimePicker](/api/javascript/ui/datetimepicker)
