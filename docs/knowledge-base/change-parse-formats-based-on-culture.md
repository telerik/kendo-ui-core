---
title: Use the Current DateTimePicker Culture Default Date Format as a Parse Format
page_title: Use the Current DateTimePicker Culture Default Date Format as a Parse Format
description: "Learn how to use the default date format of the current culture as a parse format for the Kendo UI DateTimePicker widget."
slug: howto_use_current_culture_date_format_in_datetimepicker
previous_url: /controls/editors/datetimepicker/how-to/change-parse-formats-based-on-culture
tags: telerik, kendo, jquery, datetimepicker, use, current, default, culture, format, as, parse, format
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

How can I use the current default culture format as a parse format for the Kendo UI for jQuery DateTimePicker?

## Solution

The default behavior of the DateTimePicker widget is to treat a value with no time part as invalid unless the corresponding format is provided in the `parseFormats` option.

The following example demonstrates how to add the default short date format of the current culture to the `parseFormats` array, so that when the time portion is removed from the DateTimePicker input, the value is still parsed as a valid date.

```dojo
<script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/cultures/kendo.culture.bg-BG.min.js"></script>
<input id="datetimepicker" />
<script>
  kendo.culture('bg-BG');
  $("#datetimepicker").kendoDateTimePicker({
    parseFormats: [kendo.culture().calendar.patterns['d']],
    change: function(e){
		console.log(this.value());
    }
  });
</script>
```

## See Also

* [Using the API of the DateTimePicker (Demo)](https://demos.telerik.com/kendo-ui/datetimepicker/api)
* [JavaScript API Reference of the DateTimePicker](/api/javascript/ui/datetimepicker)
