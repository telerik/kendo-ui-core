---
title: Use Current Culture Default Date Format as Parse Format
page_title: Use Current Culture Default Date Format as Parse Format | Kendo UI DateTimePicker
description: "Learn how to use the default date format of the current culture as a parse format for the Kendo UI DateTimePicker widget."
slug: howto_use_current_culture_date_format_in_datetimepicker
---

# Use Current Culture Default Date Format as Parse Format

The default behavior of the DateTimePicker widget is to treat a value with no time part as invalid unless the corresponding format is provided in the `parseFormats` option.

The following example demonstrates how to add the default short date format of the current culture to the `parseFormats` array, so that when the time portion is removed from the DateTimePicker input, the value is still parsed as a valid date.

```dojo
<script src="https://kendo.cdn.telerik.com/2016.3.1118/js/cultures/kendo.culture.bg-BG.min.js"></script>
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
