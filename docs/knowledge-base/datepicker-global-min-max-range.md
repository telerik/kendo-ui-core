---
title: Setting Global Min and Max DatePicker Values
description: An example demonstrating how to change the max and min values globally for all DatePickers
type: how-to
page_title: Modifying Min and Max Values Globally | Kendo UI DatePicker for jQuery
slug: datepicker-global-min-max-range
tags: datepicker, global, min, max, range
ticketid: 1341901
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>DatePicker for Progress® Kendo UI®</td>
 </tr>

  <td>Product Version</td>
  <td>2018.3.911</td>
 </tr>
</table>


## Description

How can I change globally the min and max values for all Kendo UI DatePickers?  

## Solution

To globally set the [`min`](/api/javascript/ui/datepicker/configuration/min) and [`max`](/api/javascript/ui/datepicker/configuration/max) configurations for all Kendo UI DatePickers, add the following script.

```
<script>
  kendo.ui.DatePicker.fn.options.max = new Date(3999, 11, 31);
  kendo.ui.DatePicker.fn.options.min = new Date(1700, 0, 1);
</script>
```

The following example demonstrates the implementation of the suggested approach and sets the max value to December 31, 3999 and the min value to January 1, 1700 in two Kendo UI DatePickers.

```dojo
    <script>
      kendo.ui.DatePicker.fn.options.max = new Date(3999, 11, 31);
      kendo.ui.DatePicker.fn.options.min = new Date(1700, 0, 1);
    </script>

    <div id="example">
      <div class="demo-section k-content">
        <h4>Select date</h4>
        <input id="datepicker" />
        <input id="datepicker1" />
      </div>
      <script>
        $(document).ready(function() {
          $("#datepicker").kendoDatePicker();

          $("#datepicker1").kendoDatePicker({
            // min: new Date()  // Will overwrite the global setting.
          });
        });
      </script>            
    </div>
```

## Notes

If a DatePicker contains its own min or max configuration, the individual settings will prevail over the global values.
