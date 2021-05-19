---
title: Prevent Invalid Values
page_title: Prevent Invalid Values | Kendo UI DateTimePicker
description: "Learn how to prevent invalid values in a Kendo UI DateTimePicker widget."
slug: howto_prevent_invalid_values_datetimepicker
---

# Prevent Invalid Values

The following example demonstrates how to prevent invalid values in a Kendo UI DateTimePicker.

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
          $(".console").append("<p>Change :: " + kendo.toString(this.value(), 'd') + "<p>");

          // If you do not want to wire the input change event, uncomment.
          /*if (this.value() === null) {
                       this.value("");
                      }*/
        }

        $("#datetimepicker").kendoDateTimePicker({
          change: onChange,
          close: onClose,
          open: onOpen,
          value: new Date()
        });

        // If you do not want to use widget, change the event.
        $("#datetimepicker").on("change", function() {
          var input = $(this);
          var widget = input.data("kendoDateTimePicker");

          if (widget && widget.value() === null && input.val()) {
            widget.value("");
          }
        });
      });
    </script>            
  </div>
```

## See Also

* [Using the API of the DateTimePicker (Demo)](https://demos.telerik.com/kendo-ui/datetimepicker/api)
* [JavaScript API Reference of the DateTimePicker](/api/javascript/ui/datetimepicker)
