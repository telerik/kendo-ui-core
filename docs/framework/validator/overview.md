---
title: Overview
page_title: Overview of Validator UI in Kendo UI framework
description: How to initialize jQuery Validator UI and trigger elements' validation.
---

# Kendo UI Validator Overview
The Kendo UI Validator offers an easy way to do client-side form validation. Built around the HTML5 form validation attributes, it supports variety of built-in validation rules, but also provides a convenient way for setting custom rules handling.

For a complete overview of the Validator's methods and configuration options, [review the Validator API Reference](/api/javascript/ui/validator).

## HTML5 form validation
One of the highly anticipated features in HTML5 is the arrival of new [HTML5 form validation attributes](https://developer.mozilla.org/en/HTML/Forms_in_HTML#Constraint_Validation). When used, these attributes set constraints on HTML inputs that will be enforced by the browser. Available constraints include:

- required
- pattern (regex)
- min/max
- [HTML5 data types](https://developer.mozilla.org/en/HTML/Element/input#attr-type) (email, url, number, etc.)

To use HTML5 form validation, these attributes are added to simple HTML input elements:

    <input type="email" required>

When a browser supports HTML5 validation, it will automatically attempt to validate the input matches the defined constraints before allow form submission. If a input element fails to meet the constraints, the browser will display a message for the user. HTML5 also provides a number of new JavaScript APIs that can be used for manual input validation handling, such as `checkValidity()`.

> It should go without saying, but an application should *never* rely on client-side validation as the only form of input validation. Client-side validation can help improve the user experience in an application, but it does not replace the need for server-side data validation on all user input.

### Problem with HTML5 forms
The ideas of HTML5 forms is great, but in practice there are a few problems today:

1. Old browsers offer no support for HTML5 form validation
2. Support for HTML5 forms in *modern* browsers [is incomplete](http://wufoo.com/html5/)
3. Browser create validation error messages are difficult/impossible to re-style

To address the realities of today's browser landscape, applications need to augment HTML5's form validation concepts with JavaScript. The Kendo UI Validator provides that solution.

## Basic Configuration of Kendo UI Validator
The Kendo UI Validator works with the standard HTML5 form validation attributes. It allows you to use the normal HTML5 constraint attributes and then automatically makes these attributes work in all browsers (IE7+) while giving you more customizability.

To use the Validator, start by defining an HTML form that includes one or more of these new attributes.

    <div id="myform">
        <input type="text" name="firstName" required />
        <input type="text" name="lastName" required />
        <button id="save" type="button">Save</button>
    </div>

Next, a Kendo UI Validator needs to be added to the page. In a JavaScript block on the page, add the following code:

    // Initialize the Kendo UI Validator on your "form" container
    // (NOTE: Does NOT have to be a HTML form tag)
    var validator = $("#myform").kendoValidator().data("kendoValidator");

    // Validate the input when the Save button is clicked
    $("#save").on("click", function() {
        if (validator.validate()) {
            // If the form is valid, the Validator will return true
            save();
        }
    });

With this simple configuration, the unchanged HTML5 form validation attributes will now work in old and new browsers, and an applicaiton will have complete control over the content and styling of validation error messages. When the "Save" button is clicked, if any inputs do not pass all constraints, the Kendo UI Validator will display the appropriate valdiation error message. [View the Kendo UI Validator live demo](http://demos.telerik.com/kendo-ui/web/validator/index.html).

## Default Validation Rules

### **required**- element should have a value

     <input type="text" name="firstName" required />

### **pattern**- constrains the value to match a specific regular expression

     <input type="text" name="twitter" pattern="https?://(?:www\.)?twitter\.com/.+i" />

### **max/min**- constrain the minimum and/or maximum numeric values that can be entered

     <input type="number" name="age" min="1" max="42" />

### **step**- when used in combination with the min and max attributes, constrains the granularity of values that can be entered

     <input type="number" name="age" min="1" max="100" step="2" />

### **url**- constrain the value to being a valid URL

     <input type="url" name="url" />

### **email**- constrain the value to being a valid email

     <input type="email" name="email" />

## Custom Validation Rules

Beside the built-in validation rules, with KendoUI Validator you can set custom rules through the [rules configuration option](/api/javascript/ui/validator#rules).

Important things to note about custom validation rules and messages:

- **Each custom rule will be run for each element in a form.** If there are multiple inputs in the form and the validation should only apply to a specific input, the custom validation code should check the input before validating. For example:

        custom: function (input) {
            if (input.is("[name=firstName]")) {
                return input.val() === "Test"
            } else {
                return true;
            }
        }

- If the custom validation returns `true`, the validation will pass (and vice versa)
- If there are multiple custom rules, the rules will run in order. The validation will stop at the first rule that fails and display the validation error message associated with that rule. A form will be valid only if all custom validation rules pass in addition to the standard HTML5 constraints.
- **Any HTML5 constraints applied to a form (required, type, etc.) will be checked *before* custom rules are evaluated.** Custom rules will not run until a input passes the basic HTML5 constraints.
- Custom messages must match the name of the custom rule. If a custom message is not provided for a custom rule, a simple error icon will be displayed.

> HTML5 also provides a way to set custom validation rules via `setCustomValidity()`, but as with other parts of HTML5, this will only work in modern browsers. To create custom rules that work in all browsers, use the Kendo UI Validator custom rule definitions.

## Error Messages

The KendoUI Validator provides a default messages which maps to the built-in validation rules. However, defining a custom messages as well as overriding the built-in ones is also possible.

> Note that it is required that the input element has a name attribute set, in order error messages to work correctly.

### Defining custom messages
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

Beside that build-in messages a custom messages can also be defined on a per-component basis, via the following attributes (in that order):

    1. `data-[rule]-msg` -- where [rule] is the failing validation rule
    2. `validationMessage`
    3. `title`

These attributes will be checked before applying the message from the `messages` configuration option.

#### Setting multiple `data-[rule]-msg` attributes allows a field to have different messages for each different validation rule.

    <form id="myform">
        <input type="url" required data-required-msg="You need to enter a URL" data-url-msg="This url is invalid">
        <button>Validate</button>
    </form>

    <script>
        $("#myform").kendoValidator();
    </script>

#### Using validationMessage attribute to specify a custom validation message

    <form id="myform">
        <input type="tel" pattern="\d{10}" validationMessage="Plase enter a ten digit phone number" value="123"> <br />
        <button>Validate</button>
    </form>

    <script>
        $("#myform").kendoValidator();
    </script>

Validation messages can also be defined for custom rules.

#### Defining validation messages for custom rules

    <form id="myform">
        <input name="username" /> <br />
        <input name="town" /> <br />
        <button>Validate</button>
    </form>

    <script>
        $("#myform").kendoValidator({
            rules: {
              customRule1: function(input) {
                  if (input.is("[name=username]")) {
                    return input.val() === "Tom";
                  }
                  return true;
              },
              customRule2: function(input){
                  if (input.is("[name=town]")) {
                    return input.val() === "New York";
                  }
                  return true;
              }
            },
            messages: {
                customRule1: "Your UserName must be Tom",
                customRule2: "Your town must be New York"
            }
        });
    </script>

### Customizing the tooltip position

Ideally Kendo Validator places its tooltips besides the validated input. However, if the input is later enhanced to a ComboBox, AutoComplete or other Kendo Widget, placing the
tooltip beside the input may cover important information or break the widget rendering. In this case, you can specify exactly where you want the tooltip to be placed by
adding a span with data-for attribute set to the validated input name and a class `.k-invalid-msg`.

#### Specific tooltip placement (the tooltip will remain outside of the AutoComplete widget after enhancement)

     <div id="myform">
         <input type="text" id="name" name="name" required>
         <span class="k-invalid-msg" data-for="name"></span>
     </div>

     <script>
         $("#name").kendoAutoComplete({
            dataSource: data,
            separator: ", "
        });

         $("#myform").kendoValidator();
     </script>

> The validation toolip element is bound to the input's **name** via data-for attribute.

The Kendo UI Validator is a powerful framework component and essential for any application that collects user input. [Review the API Docs](/api/javascript/ui/validator) for more configuration details and options.

