---
title: Prevent invalid values
page_title: Prevent invalid values
description: Example that shows how to prevent invalid values in Kendo UI DateTimePicker
---

# How to prevent invalid values

Example that shows how to prevent invalid values

#### Example:

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
