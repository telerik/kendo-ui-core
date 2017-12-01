---
title: Validate whether value is in correct format
description: An example on how to validate whether value is in correct format of the Kendo UI DatePicker and DateTimePicker widgets.
type: how-to
page_title: Validate whether value is in correct format| Kendo UI DatePicker
slug: datepicker-validate-whether-value-is-in-correct-format
tags: kendo, ui, datepicker, datetimepicker, validate, format,correct, value,input
ticketid: 
res_type: kb
component: datepicker
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI DatePicker</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Tested up to version 2017.3.1026</td>
 </tr>
</table>
 

## Description

Can I validate whether the input of the user is in the correct format?

## Solution

A possible solution is to use the [Kendo Validator](https://docs.telerik.com/kendo-ui/controls/editors/validator/overview) and create a custom validation rule which validates the format of the date.

### DatePicker

The following example demonstrates the full implementation of the approach.

```html
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
            //implement your custom date validation
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
              // return the message text
              return input.attr("data-val-datevalidation");
            }
          }
        });
      })
    </script>
```

## See Also

* [DatePicker API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker)
* [DateTimePicker API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker)
* [Calendar API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/calendar)
