---
title: Override Hours in the Popup
page_title: Override Hours in the Popup | Kendo UI DateTimePicker
description: "Learn how to override hours in the popup of the Kendo UI DateTimePicker widget."
slug: howto_override_hours_inpopup_datetimepicker
---

# Override Hours in the Popup

The example below demonstrates how to override hours in the popup.

###### Example

```html
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
                new Date(1970, 0, 1, 21)
              ])
            }
        }
    });
  });
</script>
```

## See Also

Other articles on Kendo UI DateTimePicker:

* [DateTimePicker JavaScript API Reference](/api/javascript/ui/datetimepicker)
* [How to Prevent Invalid Values]({% slug howto_prevent_invalid_values_datetimepicker %})
* [How to Validate Custom Dates]({% slug howto_validate_custom_dates_datetimepicker %})
* [How to Limit Navigation to Months]({% slug howto_limit_navigation_tomonths_datetimepicker %})
