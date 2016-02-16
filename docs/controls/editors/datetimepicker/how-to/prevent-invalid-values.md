---
title: Prevent Invalid Values
page_title: Prevent Invalid Values | Kendo UI DateTimePicker
description: "Learn how to prevent invalid values in a Kendo UI DateTimePicker widget."
slug: howto_prevent_invalid_values_datetimepicker
---

# Prevent Invalid Values

The example below demonstrates how to prevent invalid values in a Kendo UI DateTimePicker widget.

###### Example

```html
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
          kendoConsole.log("Open");
        }

        function onClose() {
          kendoConsole.log("Close");
        }

        function onChange() {
          kendoConsole.log("Change :: " + kendo.toString(this.value(), 'd'));

          //uncomment if you do not want to wire the input change event
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

        //if you don't want to use widget change event
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

Other articles on Kendo UI DateTimePicker:

* [DateTimePicker JavaScript API Reference](/api/javascript/ui/datetimepicker)
* [How to Validate Custom Dates]({% slug howto_validate_custom_dates_datetimepicker %})
* [How to Limit Navigation to Months]({% slug howto_limit_navigation_tomonths_datetimepicker %})
* [How to Override Hours in the Popup]({% slug howto_override_hours_inpopup_datetimepicker %})
