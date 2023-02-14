---
title: Add a Red Border and Hide the Tooltip in the Validator
page_title: Add Red Border and Hide Tooltip in the Validator
description: "Learn how to add a red border and hide the tooltip in the Kendo UI Validator."
slug: howto_addredborderandhidetooltip_validator
previous_url: /framework/validator/how-to/add-red-border, /controls/editors/validator/how-to/add-red-border
tags: telerik, kendo, jquery, validator, add, red, border, hide, tooltip
component: validator
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Validator for jQuery</td>
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

How can I hide the validation tooltip and add borders around `input` elements and widgets that failed to validate?

## Solution

The following example demonstrates how to achieve this behavior and add a red border around the non-validated elements.

```dojo
    <style>
      #tickets {
        width: 510px;
        height: 323px;
        margin: 0 auto;
        padding: 10px 20px 20px 170px;
        background: url('../content/web/validator/ticketsOnline.png') transparent no-repeat 0 0;
      }
      #tickets h3 {
        font-weight: normal;
        font-size: 1.4em;
        border-bottom: 1px solid #ccc;
        margin: 10px 0 0;
        padding: 0;
      }
      #tickets ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
      }
      #tickets li {
        margin: 10px 0 0 0;
      }
      label {
        display: inline-block;
        width: 90px;
        text-align: right;
      }
      .required {
        font-weight: bold;
      }
      .accept, .status {
        padding-left: 90px;
      }
      .valid {
        color: green;
      }
      .invalid {
        color: red;
      }
      span.k-tooltip {
        margin-left: 6px;
      }
      .k-input.k-invalid {
        border: 1px solid red;
      }
    </style>
      <form id="tickets">
        <h3>Book Tickets</h3>
        <ul>
          <li>
            <label for="fullname" class="required">Your Name</label>
            <input type="text" id="fullname" name="fullname" class="k-textbox" placeholder="Full name" required validationMessage="Enter {0}" style="width: 200px;" />
          </li>
          <li>
            <label for="search" class="required">Movie</label>
            <input type="search" id="search" name="search" required validationMessage="Select movie" style="width: 200px;"/><span class="k-invalid-msg" data-for="search"></span>
          </li>
          <li>
            <label for="time">Start time</label>
            <input id="datetime" name="datetime" required data-required-msg="Select date!" style="width: 200px;"/>
            <span class="k-invalid-msg" data-for="datetime"></span>
          </li>
          <li  class="accept">
            <button id="submit" type="submit">Submit</button>
          </li>
          <li class="status">
          </li>
        </ul>
      </form>
    <script>
      $(document).ready(function() {
        var data = [
          "12 Angry Men",
          "Il buono, il brutto, il cattivo.",
          "Inception",
          "One Flew Over the Cuckoo's Nest",
          "Pulp Fiction",
          "Schindler's List",
          "The Dark Knight",
          "The Godfather",
          "The Godfather: Part II",
          "The Shawshank Redemption"
        ];
        $("#submit").kendoButton();
        $("#fullname").kendoTextBox();
        $("#search").kendoAutoComplete({
          dataSource: data,
          separator: ", "
        });
        $("#datetime").kendoDatePicker();
        var validator = $("#tickets").kendoValidator({
          validate: function(e) {
            $("span.k-invalid-msg").hide();
          }
        }).data("kendoValidator"),
            status = $(".status");
        $("form").submit(function(event) {
          event.preventDefault();
          if (validator.validate()) {
            status.text("Hooray! Your tickets has been booked!")
              .removeClass("invalid")
              .addClass("valid");
          } else {
            status.text("Oops! There is invalid data in the form.")
              .removeClass("valid")
              .addClass("invalid");
          }
        });
      });
    </script>
```

## See Also

* [Basic Usage of the Validator (Demo)](https://demos.telerik.com/kendo-ui/validator/index)
* [JavaScript API Reference of the Validator](/api/javascript/ui/validator)
