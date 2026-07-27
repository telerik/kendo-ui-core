---
title: Validating DateRangePicker on Blur in Kendo UI for jQuery
description: Learn how to validate the Kendo UI for jQuery DateRangePicker on blur to ensure proper date format and prevent saving invalid input.
type: how-to
page_title: Implementing Blur Validation for Kendo UI DateRangePicker
meta_title: Blur Validation for Kendo UI DateRangePicker
slug: daterangepicker-validation-on-blur
tags: daterangepicker, validation, blur, kendo ui for jquery, custom rules
res_type: kb
ticketid: 1688597
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>Kendo UI for jQuery DateRangePicker</td>
</tr>
<tr>
<td> Version </td>
<td> 2026.2.520 </td>
</tr>
</tbody>
</table>

## Description

I want to validate user input in the [Kendo UI for jQuery DateRangePicker](https://www.telerik.com/kendo-jquery-ui/documentation/controls/daterangepicker/overview) when the field loses focus (on blur). If the user enters an invalid date format (e.g., "12/month/year"), the input should not be accepted, and validation should clear the incorrect value.

This knowledge base article also answers the following questions:
- How can I validate the Kendo UI DateRangePicker on blur?
- How to clear invalid input in DateRangePicker after manual editing?
- How to ensure valid date format in Kendo UI for jQuery DateRangePicker?

## Solution

To validate the DateRangePicker on blur, follow these steps.

### Using [`kendo.parseDate`](/api/javascript/kendo/methods/parsedate) Method

1. Add a `blur` event handler for the DateRangePicker inputs.
2. Use the `kendo.parseDate` method to check if the input value is a valid date.
3. If the value is invalid and differs from the default empty mask, reset the input's value to `null`.

Here is the implementation:

```javascript
$("#daterangepicker input").on("blur", function () {
    // Get the current input value
    let val = this.value;

    // Parse the input value as a Date
    var date = kendo.parseDate(val, "dd-MM-yyyy");
    
    // Check if the value is invalid and not the default empty mask
    if ((!(date instanceof Date) || date == null) && val != $(this).data('kendoDateInput')._emptyMask) {
        // Reset the input value to null
        $(this).data('kendoDateInput').value(null);
    }
});
```

### Using Kendo Validator with a Custom Rule

If the DateRangePicker is part of a form, you can use the Kendo Validator with a custom rule to enforce input validation.

1. Create a custom validation rule that uses `kendo.parseDate` to validate the input.
2. Apply the validator to the form containing the DateRangePicker.

Here’s how to define the custom rule:

```javascript
$("#form").kendoValidator({
    rules: {
        validDate: function (input) {
            if (input.is("[name=daterangepicker]")) {
                let val = input.val();
                return kendo.parseDate(val, "dd-MM-yyyy") instanceof Date;
            }
            return true;
        }
    },
    messages: {
        validDate: "Please enter a valid date."
    }
});
```

Below you will find a runnable example:

```dojo
 <form class="myValidator">
      <p></p>
      <div id="daterangepicker"></div>
      <button type="submit">submit</button>
    </form>

    <script>
      $("#daterangepicker").kendoDateRangePicker({
        format: "dd-MM-yyyy",
        change: function () {
          validator.validate();
        },
      });

      var validator = $(".myValidator")
        .kendoValidator({
          validateOnBlur: true,
          rules: {
            myDate: function (input) {
              if (
                (input.is("[data-role='dateinput']") &&
                  input.val() != $(input).data("kendoDateInput")._emptyMask) ||
                input.val() == $(input).data("kendoDateInput")._emptyMask
              ) {
                var date = kendo.parseDate(input.val(), "dd-MM-yyyy");
                return date instanceof Date;
              }
              return true;
            },
          },
        })
        .data("kendoValidator");
    </script>
```

## See Also

- [Kendo UI for jQuery DateRangePicker Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/controls/daterangepicker/overview)
- [Kendo Validator Custom Rules](https://docs.telerik.com/kendo-ui/controls/editors/validator/rules#custom-rules)
