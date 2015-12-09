---
title: Validator
page_title: Validator configuration and methods | Kendo UI Framework
description: How to configure the Validator in Kendo UI Framework, get error messages and ensure the validation of the input elements in supported methods.
---

# kendo.ui.Validator

## Configuration

### errorTemplate `String`

The [template](/api/javascript/kendo#methods-template) which renders the validation message.

#### Defining custom error template
    <form id="myform">
        <input name="username" required /> <br />
        <button>Validate</button>
    </form>

    <script>
        $("#myform").kendoValidator({
            errorTemplate: "<span>#=message#</span>"
        });
    </script>


### messages `Object`

Set of messages (either strings or functions) which will be shown when given validation rule fails.
By setting already existing key the appropriate built-in message will be overridden.

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

Set of custom validation rules. Those rules will extend the [built-in ones](/framework/validator/overview#default-validation-rules).

#### Defining custom rules

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


### validateOnBlur `Boolean`

Determines if validation will be triggered when element loses focus. Default value is true.

#### Example

    <form id="myform">
        <input name="username"/> <br />
        <button>Validate</button>
    </form>

    <script>
        $("#myform").kendoValidator({
          validateOnBlur: false
        });
    </script>

## Methods

### errors

Get the error messages if any.

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

### validate

Validates the input element(s) against the declared validation rules.

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

## Events

### validate

Fired when validation completes.

The event handler function context (available via the `this` keyword) will be set to the data source instance.

#### Event Data

##### e.sender `kendo.ui.Validator`

The validator instance which fired the event.

##### e.valid `Boolean`

True if validation is passed, otherwise false.

#### Example - subscribe to the "validate" event during initialization

      <form>
        <input name="username" required /> <br />
        <button id="save">Save</button>
      </form>

      <script>
        // attach a validator to the container
        $("form").kendoValidator({
            validate: function(e) {
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
            console.log("valid" + e.valid);
        });
      </script>
