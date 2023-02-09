---
title: Validate Custom Dates in the DateTimePicker
page_title: Validate Custom Dates in the DateTimePicker
description: "Learn how to create custom date validation in a Kendo UI DateTimePicker widget."
slug: howto_validate_custom_dates_datetimepicker
previous_url: /controls/editors/datetimepicker/how-to/custom-date-validation
tags: telerik, kendo, jquery, datetimepicker, validate, custom, dates
component: datetimepicker
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® DateTimePicker for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I create custom date validation in the Kendo UI for jQuery DateTimePicker?

## Solution

The following example demonstrates how to achieve the desired scenario.

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
        background: url('../content/web/datepicker/todo.png') transparent no-repeat 0 0;
      }
    </style>
  </div>
```

## See Also

* [Using the API of the DateTimePicker (Demo)](https://demos.telerik.com/kendo-ui/datetimepicker/api)
* [JavaScript API Reference of the DateTimePicker](/api/javascript/ui/datetimepicker)
