---
title: Override Hours in the Popup
page_title: Override Hours in the Popup | Kendo UI DateTimePicker
description: "Learn how to override hours in the popup of the Kendo UI DateTimePicker widget."
slug: howto_override_hours_inpopup_datetimepicker
---

# Override Hours in the Popup

The following example demonstrates how to override hours in the popup of the DateTimePicker.

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
