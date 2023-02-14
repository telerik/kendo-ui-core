---
title: Validate If Value Is in the Correct Format
description: Learn how to validate whether value is in the correct format in the Kendo UI DatePicker and DateTimePicker widgets.
type: how-to
page_title: Validate Whether Value Is in the Correct Format - Kendo UI DatePicker for jQuery
slug: datepicker-validate-whether-value-is-in-correct-format
tags: kendo, ui, datepicker, datetimepicker, validate, format,correct, value,input
res_type: kb
component: date-time-pickers
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® DatePicker for jQuery</td>
  <td>Progress® Kendo UI® DateTimePicker for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Tested up to version 2017.3.1026</td>
 </tr>
</table>
 

## Description

How can I validate whether the input of the user in the DatePicker is in the correct format?

## Solution

Use the [Kendo UI Validator](https://docs.telerik.com/kendo-ui/controls/editors/validator/overview) and create a custom validation rule which validates the format of the date.

```dojo
    <h2>Use client-side validation:</h2>
    <form id="form">
      <input data-role="datepicker"
             name="date"
             data-bind="value: selectedDate"
             id="date"
             style="width: 20%">
      <span class="k-invalid-msg" data-for="date"></span>
    </form>

    <script>


      $(function () {

        var viewModel = kendo.observable({
          selectedDate: new Date(),

        });
        kendo.bind($("#form"), viewModel);


        $("#form").kendoValidator({
          rules: {
            // Implement your custom date validation.
            dateValidation: function (input, params) {

              if (input.is("[name='date']") && input.val() != "") {
                input.attr("data-datevalidation-msg", "Not a valid date in MM/dd/yyyy format!");

                var date = kendo.parseDate(input.val(), "MM/dd/yyyy");
                if (date) {
                  return true;
                }
                return false;
              }
              return true;                    
            }
          },
          messages: { //custom rules messages
            datevalidation: function (input) {
              // Return the message text.
              return input.attr("data-val-datevalidation");
            }
          }
        });
      })
    </script>
```

## See Also

* [API Reference of the DatePicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker)
* [API Reference of the DateTimePicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker)
* [API Reference of the Calendar](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar)
