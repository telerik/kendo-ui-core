---
title: Hide button with CSS
page_title: Hide button with CSS
description: Hide button with CSS
---

# Hide button with CSS

The example below demonstrates how to hide the default Kendo UI DatePicker using CSS

#### Example:

```html
    <input id="datepicker" value="10/10/2011" style="width:150px;" />
    <script>
      $(document).ready(function() {
        $("#datepicker").kendoDatePicker();
      });
    </script>
    <style>
      .k-datepicker .k-select {
        display: none;
      }

      .k-datepicker .k-picker-wrap {
        padding: 0;
      }

      .k-datepicker .k-input {
        border-radius: 3px;
      }
    </style>
```
