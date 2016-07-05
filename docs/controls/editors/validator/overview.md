---
title: Overview
page_title: Overview | Kendo UI Validator
description: "Learn how to initialize the Kendo UI Validator and configure its behavior."
previous_url: /framework/validator/overview
slug: overview_kendoui_validator_widget
position: 1
---

# Validator Overview

The [Kendo UI Validator widget](http://demos.telerik.com/kendo-ui/validator/index) offers an easy way to do client-side form validation. Built around the HTML5 form validation attributes, it supports variety of built-in validation rules and provides a convenient way for setting custom-rule handling. The Kendo UI Validator is a powerful framework component and essential for any application that collects user input.

For a complete overview of the its methods and configuration options, [review the Kendo UI Validator API Reference](/api/javascript/ui/validator).

## HTML5 Forms Validation

### Usage of HTML5 Attributes

One of the highly anticipated features in HTML5 is the arrival of new [HTML5 form validation attributes](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms_in_HTML#Constraint_Validation). When used, these attributes set constraints on HTML inputs, which are enforced by the browser. The available constraints include:

- required
- pattern (regex)
- min/max
- [HTML5 data types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input#attr-type) (email, URL, number, etc.)

To use HTML5 form validation, these attributes are added to simple HTML input elements, as shown below.

###### Example

    <input type="email" required>

When a browser supports HTML5 validation, it automatically attempts to validate if the input matches the defined constraints before it allows the form submission. If an input element fails to meet the constraints, the browser displays a message for the user. HTML5 also provides a number of new JavaScript APIs that can be used for manual input validation handling, such as `checkValidity()`.

> **Important**
>
> An application should never rely on client-side validation as the only form of input validation. Client-side validation can help improve the user experience in an application, but it does not replace the need for server-side data validation on all user input.

### Browser Issues

The ideas of the HTML5 forms is great, but in practice there are a few problems today:

1. Old browsers offer no support for HTML5 form validation.
2. The support for HTML5 forms in modern browsers [is incomplete](http://www.wufoo.com/html5/).
3. The validation error messages created by the browser are difficult or impossible to re-style.

To address the realities of today's browser landscape, applications need to augment HTML5 form validation concepts by using JavaScript. The Kendo UI Validator provides that solution.

## Getting Started

The Validator works with the standard HTML5 form validation attributes. It allows you to use the normal HTML5 constraint attributes and then automatically makes these attributes work in all browsers (Internet Explorer 7 and later) while providing you with more possibilities for customization.

### Create the Setup

To use the Validator, start by defining an HTML form that includes one or more of these new attributes, as demonstrated in the example below.

###### Example

    <div id="myform">
        <input type="text" name="firstName" required />
        <input type="text" name="lastName" required />
        <button id="save" type="button">Save</button>
    </div>

### Initialize the Validator

A Kendo UI Validator needs to be added to the page. In a JavaScript block on the page, add the code from the example below.

###### Example

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

With this simple configuration, the unchanged HTML5 form validation attributes now work in old and new browsers, and an application has complete control over the content and styling of validation error messages. When the **Save** button is clicked, if an input fails any of the constraints, the Kendo UI Validator displays the appropriate validation error message.

For detailed information, refer to the [Kendo UI Validator live demo](http://demos.telerik.com/kendo-ui/validator/index).

## Validation Rules

### Default Rules for Validation

The `required` rule requires that the element has a value.

###### Example

     <input type="text" name="firstName" required />

The `pattern` rule constrains the value to match a specific regular expression.

###### Example

     <input type="text" name="twitter" pattern="https?://(?:www\.)?twitter\.com/.+i" />

The `max/min` rule constrains the minimum and maximum numeric values that can be entered.

###### Example

     <input type="number" name="age" min="1" max="42" />

The `step` rule, when used in combination with the `min` and `max` attributes, constrains the granularity of the values that can be entered.

###### Example

     <input type="number" name="age" min="1" max="100" step="2" />

The `url` rule constrains the value to a valid URL format.

###### Example

     <input type="url" name="url" />

The `email` rule constrains the value to a valid email format.

###### Example

     <input type="email" name="email" />

The `date` rule constrains the value to a valid date format. Use [`kendo.parseDate`](/api/javascript/kendo#methods-parseDate) to validate the input.

###### Example

     <input type="date" name="date" />

or

     <input data-type="date" name="date" />

### Custom Rules for Validation

Besides the built-in validation rules, you can set custom rules with the Kendo UI Validator through the [`rules` configuration option](/api/javascript/ui/validator#rules).

#### Important Notes

Below are some important things to note about custom validation rules and messages:

* Each custom rule will be run for each element in a form. If there are multiple inputs in the form and the validation should only apply to a specific input, the custom validation code should check the input before validating.

###### Example

        custom: function (input) {
            if (input.is("[name=firstName]")) {
                return input.val() === "Test"
            } else {
                return true;
            }
        }

* If the custom validation returns `true`, the validation will pass and vice versa.
* If there are multiple custom rules, the rules run in order. The validation will stop at the first rule that fails and display the validation error message associated with that rule. A form is valid only if all custom validation rules pass in addition to the standard HTML5 constraints.
* Any HTML5 constraints, applied to a form (required, type, etc.), are checked before custom rules are evaluated. Custom rules will not run until an input passes the basic HTML5 constraints.
* Custom messages must match the name of the custom rule. If a custom message is not provided for a custom rule, a simple error icon is displayed.

> **Important**
>
> HTML5 also provides a way to set custom validation rules via `setCustomValidity()`, but as with other parts of HTML5, this rule only works in modern browsers. To create custom rules that work in all browsers, use the Kendo UI Validator custom rule definitions.

## Error Messages

### Definition of Custom Error Messages

The Kendo UI Validator provides default messages which map to the built-in validation rules. However, defining a custom message as well as overriding the built-in one is also possible.

> **Important**
>
> In order for the error messages to work properly, you are required to set a name attribute to the input element.

The example below demonstrates how to define custom messages when the validation rules are not fulfilled.

###### Example

    <form id="myform">
        <input name="username" required /> <br />
        <input type="email" name="userEmail" required data-message="My custom email message" /> <br />
        <button>Validate</button>
    </form>

    <script>
        $("#myform").kendoValidator({
             messages: {
                 // defines a message for the custom validation rule
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

### Application of Custom Message Attributes

Besides these build-in messages, a custom message can also be defined on a per-component basis and via the following attributes order-wise:

1. `data-[rule]-msg`, where `[rule]` is the failing validation rule.
2. `validationMessage`
3. `title`

These attributes will be checked before applying the message from the `messages` configuration option.

The example below demonstrates how the set multiple `data-[rule]-msg` attributes allow a field to have different messages for each different validation rule.

###### Example

    <form id="myform">
        <input type="url" required data-required-msg="You need to enter a URL" data-url-msg="This url is invalid">
        <button>Validate</button>
    </form>

    <script>
        $("#myform").kendoValidator();
    </script>

The example below demonstrates how to use the `validationMessage` attribute to specify a custom validation message.

###### Example

    <form id="myform">
        <input type="tel" pattern="\d{10}" validationMessage="Plase enter a ten digit phone number" value="123"> <br />
        <button>Validate</button>
    </form>

    <script>
        $("#myform").kendoValidator();
    </script>

Validation messages can also be defined for custom rules, as demonstrated in the example below.

###### Example

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

## Validator Tooltip

### Customization of Tooltip Position

Ideally, the Kendo UI Validator places its tooltips besides the validated input. However, if the input is later enhanced to a ComboBox, AutoComplete or other Kendo Widget, placing the tooltip beside the input may cover important information or break the widget rendering. In this case, you can specify exactly where you want the tooltip to be placed by adding a span with data-for attribute set to the validated input name and a class `.k-invalid-msg`.

The example below demonstrates a specific Tooltip placement. The Tooltip will remain outside the AutoComplete widget after enhancement.

###### Example  

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

> **Important**
>
> The validation Tooltip element is bound to the input `name` via the `data-for` attribute.

## See Also

Articles and how-to examples on the Kendo UI Validator:

* [Validator JavaScript API Reference](/api/javascript/ui/validator)
* [How to Show Tooltip on Mouse Over]({% slug howto_showtooltiponmouseover_validator %})
* [How to Use Templates to Customize Tooltips]({% slug howto_usetemplatestocustomizetooltips_validator %})

For more runnable examples on the Kendo UI Validator widget, browse its [**How To** documentation folder]({% slug howto_addredborderandhidetooltip_validator %}).
