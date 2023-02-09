---
title: Prevent Invalid DateTimePicker Values
page_title: Prevent Invalid DateTimePicker Values
description: "Learn how to prevent invalid values in a Kendo UI DateTimePicker widget."
slug: howto_prevent_invalid_values_datetimepicker
previous_url: /controls/editors/datetimepicker/how-to/prevent-invalid-values
tags: telerik, kendo, jquery, datetimepicker, prevent, invalid, values
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

How can I prevent invalid values in the Kendo UI for jQuery DateTimePicker?

## Solution

To achieve the desired scenario:

1. Attach a handler to the [`change`](/api/javascript/ui/datetimepicker/events/change) event of the `DateTimePicker`.

1. Check if the new value of the `DateTimePicker` is `null`, which will indicate whether the entered value is invalid or not.

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
