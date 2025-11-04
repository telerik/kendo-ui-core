---
title: Validator
page_title: Validator configuration and methods | Kendo UI Framework
description: How to configure the Validator in Kendo UI Framework, get error messages and ensure the validation of the input elements in supported methods.
res_type: api
component: validation
---

# kendo.ui.Validator

Represents the Kendo UI Validator widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### errorTemplate `String`

The [template](/api/javascript/kendo/methods/template) which renders the validation message.

> The `errorTemplate` content must be enclosed in a single DOM element parent. There are no restrictions with regard to nested child elements.


<div class="meta-api-description">
How to customize error message layout in Kendo UI Validator? Customize validation error messages by defining a template that controls the displayed content, layout, and HTML structure of client-side validation feedback. Enable tailored error outputs by configuring custom message formatting, altering the visual presentation of validation notices, or embedding dynamic data within the validation response. Support for wrapping the entire error message in a single parent element allows flexible nesting of child elements, letting developers craft precisely styled validation alerts, error popups, or inline validation text with bespoke markup and structure. This approach covers scenarios where developers want to set, override, or refine validation feedback rendering for improved user experience, theming consistency, or enhanced interactive messaging.
</div>

#### Example

    <form id="myform">
        <input name="username" required /> <br />
        <button>Validate</button>
    </form>

    <script>
        $("#myform").kendoValidator({
            errorTemplate: ({ message }) => `<div class="custom-error">${message}</div>`
        });
    </script>

#### Define a custom error template
    <form id="myform">
        <input name="username" required /> <br />
        <button>Validate</button>
    </form>

    <script>
        $("#myform").kendoValidator({
            errorTemplate: ({ message }) => `<span>${message}</span>`
        });
    </script>


### messages `Object`

Set of messages (either strings or functions) which will be shown when given validation rule fails.
By setting already existing key the appropriate built-in message will be overridden.


<div class="meta-api-description">
How do I customize error messages in Kendo UI Validator? Customize, override, or configure validation feedback by defining, setting, or replacing error messages using static strings or dynamic functions that modify default validation text, enabling tailored user prompts, localized content, personalized message output, and flexible control over validation response wording for form inputs, error handling, and user guidance within validation logic.
</div>

#### Example

    <form id="myform">
        <input name="username" required /> <br />
        <input type="email" name="userEmail" required /> <br />
        <button>Validate</button>
    </form>

    <script>
        $("#myform").kendoValidator({
            messages: {
                required: "This field is mandatory",
                email: "Please enter a valid email address"
            }
        });
    </script>

#### Defining custom messages
    <form id="myform">
        <input name="username" required /> <br />
        <input type="email" name="userEmail" required data-message="My custom email message" /> <br />
        <button>Validate</button>
    </form>

    <script>
        $("#myform").kendoValidator({
             messages: {
                 // defines a message for the 'custom' validation rule
                 custom: "Please enter valid value for my custom rule",

                 // overrides the built-in message for the required rule
                 required: "My custom required message",

                 // overrides the built-in message for the email rule
                 // with a custom function that returns the actual message
                 email: function(input) {
                     return getMessage(input);
                 }
             },
             rules: {
               custom: function(input) {
                 if (input.is("[name=username]")) {
                     return input.val() === "Tom";
                 }
                 return true;
               }
             }
        });

        function getMessage(input) {
          return input.data("message");
        }
    </script>

### rules `Object`

Set of custom validation rules. Those rules will extend the [built-in ones](/documentation/controls/validator/rules).

Default rules:

- **required** - The rule requires that the element has a value.
- **pattern** - The rule constrains the value to match a specific regular expression.
- **max** - The rule constrains the maximum numeric values that can be entered.
- **min** - The rule constrains the minimum numeric values that can be entered.
- **step** - When used in combination with the min and max attributes, constrains the granularity of the values that can be entered.
- **url** - The rule constrains the value to a valid URL format.
- **email** - The rule constrains the value to a valid email format.
- **date** - The rule constrains the value to a valid date format. 


<div class="meta-api-description">
How do I extend the default validation logic in Kendo UI for jQuery? Configure, define, or extend input, field, and form validation by setting custom validation logic, rules, functions, or messages that supplement or override default validators. Enable adding personalized validation criteria, registering new rule names, adjusting validation behavior dynamically, controlling how inputs are checked, and customizing error or feedback messages to tailor validation workflows. Support a mix of built-in and user-defined validation strategies, modify existing validation patterns, and integrate flexible rule sets for comprehensive form and data validation needs.
</div>

#### Example

    <form class="myValidator">
      <p><input type="number" name="age" min="0" max="100" step="5"></p>
      <p><input type="url" name="WebAddress" placeholder="http://example.com" ></p>
      <button id="validate" class="k-button k-primary" type="button">Validate</button>
    </form>

    <script>
      $('#validate').click(function(){
        var validator = $(".myValidator").kendoValidator({
        }).data("kendoValidator");
        validator.validate();
      })
    </script>

#### Example - defining custom rules

    <form id="myform">
        <input name="username"/> <br />
        <input name="town" /> <br />
        <button>Validate</button>
    </form>

    <script>
        $("#myform").kendoValidator({
          rules: {
            customRule1: function(input){
              // all of the input must have a value
              return $.trim(input.val()) !== "";
            },
            customRule2: function(input) {
              //only 'Tom' will be valid value for the username input
              if (input.is("[name=username]")) {
                return input.val() === "Tom";
              }
              return true;
            }
          },
          messages: {
            customRule1: "All fields are required",
            customRule2: "Your UserName must be Tom"
          }
        });
    </script>

### validationSummary `Boolean|Object` *(default: false)*

Determines if validation summary will be displayed. Default value is `false`.


<div class="meta-api-description">
How can I display all validation errors at once in a Kendo UI form? Control the display of a collective list or overview of validation errors on a form, enabling users to toggle or configure whether multiple field validation messages are summarized in one place versus shown individually; manage, enable, disable, or set a consolidated error report, validation error aggregation, summary visibility, or grouped validation feedback for all form input validations to provide clear error indication and improve user experience by showing or hiding combined validation results.
</div>

#### Example

    <form id="myform">
        <input name="username" required /> <br />
        <button>Validate</button>
    </form>

    <script>
        $("#myform").kendoValidator({
          validationSummary: true
        });
    </script>

### validationSummary.container `String|jQuery`

Defines the element in which the validation summary will be rendered. By default, the validation summary is rendered before the element on which the Validator is initialized.


<div class="meta-api-description">
How do I customize the container for Kendo UI validation error messages? Control where validation error messages, validation summaries, or form validation feedback are displayed by specifying a custom container element for rendering validation results; configure, set, or assign the output location of aggregated validation messages to a specific HTML element or container instead of the default placement near the input or form field, enabling better organization, custom layout, or repositioning of validation summaries, error notifications, or user input warnings within the page structure.
</div>

#### Example

    <form id="myform">
        <input name="username" required /> <br />
        <button>Validate</button>
    </form>
    <div id="summary"></div>

    <script>
        $("#myform").kendoValidator({
          validationSummary: {
            container: "#summary"
          }
        });
    </script>

### validationSummary.template `String|Function`

Specifies the template for rendering the validation summary.


<div class="meta-api-description">
How to customize validation error message display in Kendo UI Validator? Configure and customize how aggregated validation error messages are displayed by defining a template that controls the layout, formatting, and markup of the validation summary. Enable structured presentations of multiple validation errors, including formatted lists, custom HTML elements, additional explanatory text, or styled message groupings to enhance error clarity and user feedback. Set or adjust the summary format during setup to create tailored error summaries, modify the appearance of validation feedback, format error collections, embed contextual information around validation messages, or style error reporting output according to specific UI requirements.
</div>

#### Parameters

##### errors `Array`

The validation errors.

#### Example

    <form id="myform">
        <input name="username" required /> <br />
        <button>Validate</button>
    </form>

    <script>
        $("#myform").kendoValidator({
          validationSummary: {
            template: ({ errors }) => `<ul>${errors.map(error => '<li><a data-field="' + error.field +'" href="#">' + error.message + '</a></li>')}</ul>`
          }
        });
    </script>

### validateOnBlur `Boolean`

Determines if validation will be triggered when element loses focus. Default value is true.


<div class="meta-api-description">
How does Kendo UI's Validator trigger validation on form fields when a user loses focus? Configure input validation to automatically run when a user moves away from a form field, enabling or disabling checks as the element loses focus or triggers blur events, allowing control over whether validation fires on focusout, blur, or when tabbing between inputs, useful for real-time error display or delayed validation strategies during form interactions and user input workflows.
</div>

#### Example

    <form id="myform">
        <input name="username"/> <br />
        <button onclick="event.preventDefault()">Validate</button>
    </form>

    <script>
        $("#myform").kendoValidator({
          validateOnBlur: false
        });
    </script>

## Methods

### errors

Get the error messages if any.


<div class="meta-api-description">
How do I access error messages from Kendo UI Validator? Access and retrieve current validation failure messages, error details, or validation feedback for purposes such as displaying user-friendly error prompts, logging validation issues, inspecting validation results programmatically, extracting validation state messages for UI summaries, highlighting invalid fields, collecting errors for debugging or analytics, or processing validation output for custom workflows. This method enables reading all active validation errors, messages, or warnings generated during input checking, schema validation, or form processing, suitable for diverse use cases including error reporting, display, and tracking validation status.
</div>

#### Example

    <div id="myform">
        <input name="username" required /> <br />
        <button id="save">Save</button>
        <div id="errors"></div>
    </div>

    <script>
        // attach a validator to the container and get a reference
        var validatable = $("#myform").kendoValidator().data("kendoValidator");

        $("#save").click(function() {
          //validate the input elements and check if there are any errors
          if (validatable.validate() === false) {
            // get the errors and write them out to the "errors" html container
            var errors = validatable.errors();
            $(errors).each(function() {
              $("#errors").html(this);
            });
          }
        });
    </script>

#### Returns

`Array` Messages for the failed validation rules.

### hideMessages

Hides the validation messages.


<div class="meta-api-description">
How do I hide all validation messages in Kendo UI Validator? Control or disable the display of validation messages, error notifications, or inline validation text within user interfaces by programmatically hiding or suppressing all visible validation feedback after initialization; manage the visibility of inline errors, validation summaries, error prompts, or warning messages dynamically without changing validation rules, enabling developers to clear or hide client-side or server-side validation text, suppress error indicators, and customize when and how validation messages appear or disappear during form interaction or validation cycles.
</div>

#### Example

    <form id="myform">
        <input name="username" required /> <br />
        <button>Save</button>
        <button id="hide" type="button">Hide Messages</button>
    </form>

    <script>
        // attach a validator to the container and get a reference
        var validator = $("#myform").kendoValidator().data("kendoValidator");

        //hide the validation messages when hide button is clicked
        $("#hide").click(function() {
            validator.hideMessages();
        });
    </script>

### hideValidationSummary

Hides the validation summary.


<div class="meta-api-description">
How to hide validation error summary in Kendo UI Validator? Control the display of aggregated validation error messages by programmatically hiding the summary list that shows all validation errors in a form or component while keeping validation rules active and intact; configure or enable suppressing the overall error summary shown by the validator to clean up the user interface without disabling individual validations, set or toggle the visibility of the collective error feedback block dynamically through code after initialization, and manage whether the full list of validation issues is visible or hidden during user input or form processing.
</div>

#### Example

    <form id="myform">
        <input name="username" required /> <br />
        <button>Save</button>
        <button id="hide" type="button">Hide Summary</button>
    </form>

    <script>
        // attach a validator to the container and get a reference
        var validator = $("#myform").kendoValidator({
          validationSummary: true
        }).data("kendoValidator");

        // trigger validation to display the validation summary
        validator.validate();

        //hide the validation summary when hide button is clicked
        $("#hide").click(function() {
            validator.hideValidationSummary();
        });
    </script>

### showValidationSummary

Shows the validation summary.


<div class="meta-api-description">
How do I display a combined summary of validation errors using Kendo UI Validator? Display or reveal a combined summary of form validation errors, show all current validation messages collected by the validator component, enable or configure a centralized error overview area that aggregates individual field errors, trigger or control the visibility of the validation summary section after running validation checks, present users with a clear list of form input issues or error messages, expose or activate the validation error report area in the user interface, manage or update the display of validation feedback to help users identify and fix input mistakes comprehensively, and facilitate a holistic view of form validation results by making the summary visible programmatically.
</div>

#### Example

    <form id="myform">
        <input name="username" required /> <br />
        <button>Save</button>
        <button id="hide" type="button">Show Summary</button>
    </form>

    <script>
        // attach a validator to the container and get a reference
        var validator = $("#myform").kendoValidator({
          validationSummary: false
        }).data("kendoValidator");

        // trigger validation
        validator.validate();

        //show the validation summary when show button is clicked
        $("#hide").click(function() {
            validator.showValidationSummary();
        });
    </script>

### validate

Validates the input element(s) against the declared validation rules.


<div class="meta-api-description">
How do I trigger validation checks for form fields with Kendo UI's Validator component? Check or run validation on form fields, inputs, or controls by configuring rules, triggering validation checks, enabling form input verification, and assessing whether one or multiple elements meet their specified constraints or criteria. Control and update validation state, enforce input correctness, show error messages or warnings for invalid entries, and confirm if the form or selected inputs pass all defined checks, returning true or false based on validation success for single or batch input validation scenarios.
</div>

#### Example

      <div id="myform">
        <input name="username" required /> <br />
        <button id="save">Save</button>
      </div>

      <script>
        // attach a validator to the container and get a reference
        var validatable = $("#myform").kendoValidator().data("kendoValidator");

        //validate the state on button click
        $("#save").click(function() {
          //validate the input elements and check if there are any errors
          if (validatable.validate()) {
            //save the form
          }
        });
      </script>

#### Returns

`Boolean` `true` if all validation rules passed successfully.

Note that if a HTML form element is set as validation container, the form submits will be automatically prevented if validation fails.

### validateInput

Validates the input element against the declared validation rules.


<div class="meta-api-description">
How do I programmatically validate an individual input field in Kendo UI for jQuery? Trigger validation for an individual input field by programmatically running validation checks, enforcing or verifying specific form elements, validating single inputs without processing the whole form, running custom validation on targeted fields, evaluating input values against defined validation criteria, updating validation state and error messages for particular inputs, applying validation styling and feedback on isolated fields, checking input correctness on demand, controlling validation flow to focus on specific form elements, and implementing fine-grained input validation management.
</div>

#### Example
    <div id="myform">
        <input name="username" required /> <br />
        <input name="location" required /> <br />

        <button>Validate only userName field</button>
    </div>

    <script>
        // attach a validator to the container and get a reference
        var validator = $("#myform").kendoValidator().data("kendoValidator");

        //validate the userName input state on button click
        $("button").click(function() {
          if (!validator.validateInput($("input[name=username]"))) {
            alert("UserName is not valid!");
          } else {
            alert("UserName is valid!");
          }
        });
    </script>

#### Parameters

##### input `Element|jQuery`

Input element to be validated.

#### Returns

`Boolean` `true` if all validation rules passed successfully.

### reset

Clears the registered errors and hides the validation messages and validation summary.


<div class="meta-api-description">
How do I programmatically clear Kendo UI form validation errors after submission? clear validation errors programmatically, reset form validation state, remove recorded validation messages and errors, hide all validation UI feedback including summaries, reset validator after form submission or save, clear validation results to start fresh, erase validation errors and messages, reset validation status for forms, clear error state for inputs, refresh validation feedback and messages to initial state
</div>

#### Example - set sortable feature of the Grid to true

    <div id="myform">
        <input name="username" required /> <br />
        <input name="location" required /> <br />

        <button>Validate</button>
    </div>

    <script>
        // attach a validator to the container and get a reference
        var validator = $("#myform").kendoValidator({
          validationSummary: true
        }).data("kendoValidator");

        //trigger validation
        validator.validate();

        //reset
        validator.reset();
    </script>

### setOptions

Sets the options of the Validator. Use this method if you want to enable/disable a particular option dynamically.

When `setOptions` is called, the Validator widget will be destroyed and recreated with the new options.


<div class="meta-api-description">
How can I dynamically update validation settings in Kendo UI Validator? Update or modify validation settings dynamically during runtime by configuring options such as enabling or disabling validation rules, changing validation criteria, adjusting how inputs are checked, resetting the validation state with new parameters, refreshing event handlers and DOM bindings associated with validation, reinitializing validation logic on the fly, reconfiguring validator behavior without recreating the entire component manually, applying new validation configurations programmatically, switching validation modes or constraints in an interactive or adaptive system, and controlling the validation lifecycle through runtime updates that reset and rebuild the validation process with updated settings.
</div>

#### Parameters

##### options `Object`

The configuration options to be set.

#### Example - set validateOnBlur option of the Validator to true

    <div id="myform">
        <input name="username" required /> <br />
        <input name="location" required /> <br />

        <button>Validate</button>
    </div>

    <script>
        // attach a validator to the container and get a reference
        var validator = $("#myform").kendoValidator().data("kendoValidator");

        //update options
        validator.setOptions({ validateOnBlur: false });
    </script>

## Events

### validate

Fired when the validation of the form completes.

> The validate event *will not* fire while chaning individual input values.

The event handler function context (available via the `this` keyword) will be set to the data source instance.


<div class="meta-api-description">
How to trigger custom actions after Kendo UI Validator completes form validation? Trigger actions after form validation completes to run custom post-validation logic such as updating user interface elements, submitting form data, displaying or handling validation results and messages, or executing follow-up workflows when all form inputs have been validated. This event activates only once the entire form’s validation process finishes, not during incremental changes to individual fields, enabling control over batch validation outcomes, form readiness checks, and final data processing steps with the handler context linked to the data source instance for integrated state access.
</div>

#### Event Data

##### e.sender `kendo.ui.Validator`

The validator instance which fired the event.

##### e.valid `Boolean`

True if validation is passed, otherwise false.

##### errors `Array`

The validation errors.

#### Example - subscribe to the "validate" event during initialization

      <form>
        <input name="username" required /> <br />
        <button id="save">Save</button>
      </form>

      <script>
        // attach a validator to the container
        $("form").kendoValidator({
            validate: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("valid" + e.valid);
            }
        });
      </script>

#### Example - subscribe to the "validate" event after initialization

      <form>
        <input name="username" required /> <br />
        <button id="save">Save</button>
      </form>

      <script>
        // attach a validator to the container and get a reference
        var validatable = $("form").kendoValidator().data("kendoValidator");

        validatable.bind("validate", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("valid" + e.valid);
        });
      </script>

### validateInput

Fired when the validation state of an input changes from valid to invalid or vice versa.

The event handler function context (available via the `this` keyword) will be set to the validator instance.


<div class="meta-api-description">
How do I trigger actions when input validation status changes with Kendo UI's `validateInput` event? Detect and respond to changes in form input validity by triggering actions when input validation status switches between valid and invalid, enabling dynamic UI updates such as showing or hiding error messages, toggling form submission buttons, running validation logic, synchronizing component or application state, subscribing to validation events, handling real-time input correctness feedback, controlling input-based workflows, and integrating custom behavior based on field validity changes.
</div>

#### Event Data

##### e.sender `kendo.ui.Validator`

The validator instance which fired the event.

##### e.input `jQuery`

The object of the validated input.

##### e.valid `Boolean`

True if validation is passed, otherwise false.

##### e.field `String`

The name of the validated input.

##### e.error `String`

The error message text.

#### Example - subscribe to the "validateInput" event during initialization

      <form>
        <input name="username" required /> <br />
        <button id="save">Save</button>
      </form>

      <script>
        // attach a validator to the container
        $("form").kendoValidator({
            validateInput: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("input " + e.input.attr("name") + " changed to valid: " + e.valid);
            }
        });
      </script>

#### Example - subscribe to the "validateInput" event after initialization

      <form>
        <input name="username" required /> <br />
        <button id="save">Save</button>
      </form>

      <script>
        // attach a validator to the container and get a reference
        var validatable = $("form").kendoValidator().data("kendoValidator");

        validatable.bind("validateInput", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("input " + e.input.attr("name") + " changed to valid: " + e.valid);
        });
      </script>
