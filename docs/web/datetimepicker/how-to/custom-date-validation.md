---
title: Custom date validation
page_title: Custom date validation
description: Example that shows how to create custom date validation
---

# How to create custom date validation

Example that shows how to create custom date validation

#### Example:

```html
  <div id="example">
    <div id="to-do">
      <input id="datetimepicker" name="datetimepicker" style="width:200px;" required />
      <span class="k-invalid-msg" data-for="datetimepicker"></span>
    </div>


    <script>
      $(document).ready(function () {
        // create DateTimePicker from input HTML element
        $("#datetimepicker").kendoDateTimePicker({
          value:new Date(),
          parseFormats: ["MM/dd/yyyy"],
          change: function(e) {

          }
        });

        var validator = $("#example").kendoValidator({
          rules: {
            datepicker: function(input) {
              if (input.is("[data-role=datetimepicker]")) {
                return input.data("kendoDateTimePicker").value();
              } else {
                return true;
              }
            }
          },
          messages: {
            datepicker: "Please enter valid date!" 
          }
        }).data("kendoValidator");



      });
    </script>
    <style scoped>
      #to-do {
        height: 52px;
        width: 221px;
        margin: 30px auto;
        padding: 91px 0 0 188px;
        background: url('../content/web/datepicker/todo.png') transparent no-repeat 0 0;
      }
    </style>
  </div>
```
