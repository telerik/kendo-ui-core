---
title: Override hours in the popup
page_title: Override hours in the popup
description: Example that shows how to override hours in the popup
---

# How to override hours in the popup

Example that shows how to override hours in the popup

#### Example:

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
