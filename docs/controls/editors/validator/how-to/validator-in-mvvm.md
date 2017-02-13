---
title: Add the Validator to MVVM
page_title: Add the Validator to MVVM | Kendo UI Validator
description: "Learn how to fully integrate the Kendo UI Validator in an MVVM scenario."
slug: howto_addvalidatormvvm_validator
---

# Add the Validator to MVVM

The example below demonstrates how to fully integrate the Kendo UI Validator in an MVVM scenario by using the [`change` event](/api/javascript/data/observableobject#events-change) of the Observable and the [`validate` method](/api/javascript/ui/validator#methods-validate) of the Validator.

###### Example

```html
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
                  <li><label for="fname">First Name:</label> <input id="fname" name="fname" data-bind="value: firstName" class="k-textbox" required validationMessage="First name is required"/></li>
                  <li><label for="lname">Last Name:</label> <input id="lname" name="lname" data-bind="value: lastName" class="k-textbox" required validationMessage="Last name is required"/></li>
                  <li><label for="gender">Gender:</label> <select id="gender" data-bind="source: genders, value: gender"></select></li>
                  <li> <label for="agree">License Agreement</label> <input type="checkbox" id="agree" name="agree" data-bind="checked: agreed" required validationMessage="You should agree the licence agreement"/> I have read the licence agreement</li>
              </ul>
              <button data-bind="click: register" class="k-button k-primary">Register</button>
              <button data-bind="click: startOver" class="k-button k-primary" type="button">Start Over</button>
          </form>
      </div>
  </div>
  <script>
      var kendoValidator;

      $(document).ready(function() {
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

          // Get the validator instance
          kendoValidator = $("form").getKendoValidator();

          viewModel.bind("change", function(e) {
              // validate on model change
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

Other articles on the Kendo UI Validator:

* [Validator JavaScript API Reference](/api/javascript/ui/validator)
* [How to Show Tooltip on Mouse Over]({% slug howto_showtooltiponmouseover_validator %})
* [How to Use Use MutationObserver to Add Red Border and Hide Tooltip]({% slug howto_usemutationobserver_addborderandhidetooltip_validator %})
* [How to Use Templates to Customize Tooltips]({% slug howto_usetemplatestocustomizetooltips_validator %})
* [How to Validate Radio Buttons with Only One Error Message]({% slug howto_validateradiowithonemessage_validator %})

For more runnable examples on the Kendo UI Validator widget, browse its [**How To** documentation folder]({% slug howto_remote_validation %}).
