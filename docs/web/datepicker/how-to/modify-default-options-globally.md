---
title: Modify default options globally
page_title: Modify default options globally
description: Modify default options globally
---

# Modify default options globally

The example below demonstrates how to modify the default widget options globally.

#### Example:

```html
    <input id="datepicker" value="10/10/2011" style="width:150px;" />
    <br />
    <br />
    <input id="monthpicker" value="November 2011" style="width:150px" />
    <script>
      kendo.ui.DatePicker.fn.options.parseFormats = ["MMMM yyyy"];
    </script>
    <script>
      $(document).ready(function() {
        // create DatePicker from input HTML element
        var datepicker = $("#datepicker").kendoDatePicker().getKendoDatePicker();

        $("#monthpicker").kendoDatePicker({
          // defines the start view
          start: "year",

          // defines when the calendar should return date
          depth: "year",

          // display month and year in the input
          format: "MMMM yyyy"
        });
        console.log(datepicker.options.parseFormats); // display the set options
      });
    </script>
```
