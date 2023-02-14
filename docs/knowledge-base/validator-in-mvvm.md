---
title: Add the Validator to MVVM
page_title: Add the Validator to MVVM 
description: "Learn how to fully integrate the Kendo UI Validator in an MVVM scenario."
slug: howto_addvalidatormvvm_validator
previous_url: /controls/editors/validator/how-to/validator-in-mvvm
tags: telerik, kendo, jquery, validator, add, to, mvvm
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

How can I fully integrate the Kendo UI Validator in an MVVM scenario?

## Solution

To achieve the desired scenario, use the [`change`](/api/javascript/data/observableobject/events/change) event of the `Observable` and the [`validate`](/api/javascript/ui/validator/methods/validate) method of the Validator.

```dojo
<div id="example">
      <div class="demo-section k-content" data-bind="visible: confirmed">
        Thank you for your registration, <span data-bind="text: firstName"></span> <span data-bind="text: lastName"></span>
        <br /><br />
        <button data-bind="click: startOver" class="k-button k-primary">Start Over</button>
      </div>
      <div class="demo-section k-content wide">
        <div>
          <form>
            <ul id="fieldlist">
              <li><label for="fname">First Name:</label> <input id="fname" name="fname" data-bind="value: firstName"required validationMessage="First name is required"/></li>
              <li><label for="lname">Last Name:</label> <input id="lname" name="lname" data-bind="value: lastName" required validationMessage="Last name is required"/></li>
              <li><label for="gender">Gender:</label> <select id="gender" data-role='dropdownlist' data-bind="source: genders, value: gender"></select></li>
              <li> <label for="agree">License Agreement</label> <input type="checkbox" id="agree" name="agree" data-bind="checked: agreed" required validationMessage="You should agree the licence agreement"/> I have read the licence agreement</li>
            </ul>
            <button id='register' data-bind="click: register" >Register</button>
            <button id='start' data-bind="click: startOver" type="button">Start Over</button>
          </form>
        </div>
      </div>
      <script>
        var kendoValidator;
        $(document).ready(function() {
          $("#fname").kendoTextBox();
          $("#lname").kendoTextBox();
          $("#register").kendoButton();
          $("#start").kendoButton();
          var viewModel = kendo.observable({
            firstName: "John",
            lastName: "Doe",
            genders: ["Male", "Female"],
            gender: "Male",
            agreed: false,
            confirmed: false,
            register: function(e) {
              e.preventDefault();
              if (kendoValidator.validate()) {
                // If the form is valid, the Validator will return true
                this.set("confirmed", true);
              }
            },
            startOver: function() {
              this.set("confirmed", false);
              this.set("agreed", false);
              this.set("gender", "Male");
              this.set("firstName", "John");
              this.set("lastName", "Doe");
            }
          });
          kendo.bind($("#example"), viewModel);
          $("form").kendoValidator({
            validateOnBlur: false // Disable the default validation on blur
          });
          // Get the Validator instance.
          kendoValidator = $("form").getKendoValidator();
          viewModel.bind("change", function(e) {
            // Validate on model change.
            kendoValidator.validate();
          });
        });
      </script>
      <style>
        .demo-section > div {
          float: left;
          margin-bottom: 2em;
        }
        #fieldlist {
          margin: 0;
          padding: 0;
        }
        #fieldlist li {
          list-style: none;
          padding-bottom: 1.5em;
          text-align: left;
        }
        #fieldlist label {
          display: block;
          padding-bottom: .3em;
          font-weight: bold;
          text-transform: uppercase;
          font-size: 12px;
        }
        .prettyprint {
          background-color: #fff;
          border: 1px solid #ccc;
          overflow: auto;
          padding: 5px;
        }
      </style>
    </div>
```

## See Also

* [Basic Usage of the Validator (Demo)](https://demos.telerik.com/kendo-ui/validator/index)
* [JavaScript API Reference of the Validator](/api/javascript/ui/validator)
