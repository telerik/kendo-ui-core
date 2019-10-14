---
title: Validate Custom Dates
page_title: Validate Custom Dates | Kendo UI DateTimePicker
description: "Learn how to create custom date validation in a Kendo UI DateTimePicker widget."
slug: howto_validate_custom_dates_datetimepicker
---

# Validate Custom Dates

The following example demonstrates how to create a custom date validation in the DateTimePicker.

```dojo
  <div id="example">
    <div id="to-do">
      <input id="datetimepicker" name="datetimepicker" style="width:200px;" required />
      <span class="k-invalid-msg" data-for="datetimepicker"></span>
    </div>

    <script>
      $(document).ready(function () {
        // Create DateTimePicker from the input HTML element.
        $("#datetimepicker").kendoDateTimePicker({
          value:new Date(),
          parseFormats: ["MM/dd/yyyy"]
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

## See Also

* [Using the API of the DateTimePicker (Demo)](https://demos.telerik.com/kendo-ui/datetimepicker/api)
* [JavaScript API Reference of the DateTimePicker](/api/javascript/ui/datetimepicker)
