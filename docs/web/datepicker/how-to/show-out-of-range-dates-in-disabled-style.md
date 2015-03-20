---
title: Show out of range dates in disabled style
page_title: Show out of range dates in disabled style
description: Show out of range dates in disabled style
---

# Show out of range dates in disabled style

The example below demonstrates how to show the dates that are out of min/max range using *k-disabled* class.

#### Example:

```html
    <input id="datepicker" style="width:200px;" />
    <script>
      $(document).ready(function() {
        $("#datepicker").kendoDatePicker({
          value: new Date(2014, 10, 20),
          min: new Date(2014, 10, 10),
          max: new Date(2014, 11, 10),
          month: {
            empty: '<span class="k-state-disabled">#= data.value #</span>'
          }
        });
      });
    </script>
```
