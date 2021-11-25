---
title: Prevent Invalid Values
page_title: Prevent Invalid Values | Kendo UI DateTimePicker
description: "Learn how to prevent invalid values in a Kendo UI DateTimePicker widget."
slug: howto_prevent_invalid_values_datetimepicker
---

# Prevent Invalid Values

The following example demonstrates how to prevent invalid values in a Kendo UI DateTimePicker.

## Solution

1. Attach a handler to the [`change`](/api/javascript/ui/datetimepicker/events/change) event of the `DateTimePicker`.
1. Check if the new value of the `DateTimePicker` is null. This will indicate whether the entered value is invalid or not.
1. Execute any other custom logic.

```dojo
  <div id="example">
    <div class="demo-section k-header" style="width: 400px;">
      <h4>Select date</h4>
      <input id="datetimepicker" style="width: 200px;"/>
    </div>
    <div class="box">                
      <h4>Console log</h4>
      <div class="console"></div>
    </div>
    <script>
      $(document).ready(function() {
        function onOpen() {
          $(".console").append("<p>Open<p>");
        }

        function onClose() {
          $(".console").append("<p>Close<p>");
        }

        function onChange() {
          // If an invalid value has been entered, the datetimepicker will set its value to null. Use this information to handle the invalid state.
          if (this.value() === null) {
            $(".console").append("<p>Error! Invalid Date! Setting back to the previous date!</p>");
            this.value(lastValidDate);
          } else {
            lastValidDate = this.value();
            $(".console").append("<p>Change :: " + kendo.toString(this.value(), 'd') + "<p>");
          }
        }

        $("#datetimepicker").kendoDateTimePicker({
          change: onChange,
          close: onClose,
          open: onOpen,
          value: new Date()
        });
      });
    </script>            
  </div>
```

## See Also

* [Using the API of the DateTimePicker (Demo)](https://demos.telerik.com/kendo-ui/datetimepicker/api)
* [JavaScript API Reference of the DateTimePicker](/api/javascript/ui/datetimepicker)
