---
title: Create a Custom Validation Summary
description: How to Create a Custom Validation Summary
type: how-to
page_title: How to Create a Custom Validation Summary | Kendo UI Validator for jQuery
slug: validator-create-custom-summary
position: 
tags: 
ticketid: 
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Validator for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description

This sample demonstrates how you can display the Validation errors in your custom HTML format.

## Solution

```dojo
    <div id="example">
      <div class="demo-section k-content">

        <form id="projectInputForm" class="k-form k-form-vertical">
          <ul class="k-form-group">
            <li class="k-form-field">
              <label for="fullname" class="k-form-label">Your Name</label>
              <span class="k-form-field-wrap">
                <input type="text" id="fullname" name="fullname" class="k-textbox" placeholder="Full name" required validationMessage="Enter {0}" />
              </span>
            </li>
            <li class="k-form-field">
              <label for="search" class="k-form-label">Movie</label>
              <span class="k-form-field-wrap">
                <input type="search" id="search" name="search" required validationMessage="Select movie" />
                <span class="k-invalid-msg" data-for="search"></span>
              </span>
            </li>
            <li class="k-form-field">
              <label for="date" class="k-form-label">Date</label>
              <span class="k-form-field-wrap">
                <input type="text" id="date" name="date"
                       min="5/6/2017" data-max-msg="Enter date after '5/6/2017''"
                       pattern="\d+\/\d+\/\d+" validationMessage="Enter full date" />
                <span class="k-invalid-msg" data-for="date"></span>
              </span>
            </li>
            <li class="k-form-field">
              <label for="time" class="k-form-label">Start time</label>
              <span class="k-form-field-wrap">
                <select name="time" id="time" required data-required-msg="Select start time">
                  <option>14:00</option>
                  <option>15:30</option>
                  <option>17:00</option>
                  <option>20:15</option>
                </select>
                <span class="k-invalid-msg" data-for="time"></span>
              </span>
            </li>
            <li class="k-form-field">
              <label for="amount" class="k-form-label">Amount</label>
              <span class="k-form-field-wrap">
                <input id="amount" name="amount" type="text" min="1" max="10" value="1" required data-max-msg="Enter value between 1 and 10" />
                <span class="k-invalid-msg" data-for="amount"></span>
              </span>
            </li>
            <li class="k-form-field">
              <label for="email" class="k-form-label">Email</label>
              <span class="k-form-field-wrap">
                <input type="email" id="email" name="email" class="k-textbox" placeholder="e.g. myname@example.net"  required data-email-msg="Email format is not valid" />
              </span>
            </li>
            <li class="k-form-field">
              <label for="tel" class="k-form-label">Phone</label>
              <span class="k-form-field-wrap">
                <input type="tel" id="tel" name="tel" class="k-textbox" pattern="\d{10}" placeholder="Enter a ten digit number" required
                       validationMessage="Enter at least ten digits" />
              </span>
            </li>
            <li class="k-form-field">
              <label for="rating" class="k-form-label">Rating</label>
              <span class="k-form-field-wrap">
                <input id="rating" name="rating" required validationMessage="Select a rating" />
                <span class="k-invalid-msg" data-for="rating"></span>
              </span>
            </li>
            <li class="k-form-field">
              <span class="k-form-label">Terms of Service</span>
              <span class="k-form-field-wrap">
                <label>
                  <input type="checkbox" name="Accept" required validationMessage="Acceptance is required" />
                  I accept the terms of service.
                </label>
              </span>
            </li>
            <li class="k-form-buttons">
              <button class="k-button k-primary" onclick='buttonClick();'>Submit</button>
            </li>
          </ul>
        </form>

        <div id="validation-summary">
        </div>
      </div>
    </div>


    <style>
    </style>

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

        $("#search").kendoAutoComplete({
          dataSource: data,
          separator: ", "
        });

        $("#time").kendoDropDownList({
          optionLabel: "--Start time--"
        });

        $("#amount").kendoNumericTextBox();

        $("#date").kendoDateInput();

        $("#rating").kendoRating();
      });

      function buttonClick(){
        var validator = $("#projectInputForm").kendoValidator().data("kendoValidator");
        var StatusWindow = $("#validation-summary");


        if (validator.validate()) {
          // simulate ajax request and successfull result
          StatusWindow.html("<div class='k-messagebox k-messagebox-success'>Success</div>");
        } else {

          var errors = showErrors(validator._errors);
          StatusWindow.html(errors);
        }
      };

      function showErrors (errors) {
        var html = "<ul>";

        for(var error in errors){
          html += "<li>" + errors[error] + "</li>";
        }

        return html+"</ul>";
      }
    </script>
      
``` 
