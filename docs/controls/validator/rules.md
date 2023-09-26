---
title: Validation Rules
page_title: jQuery Validator Documentation - Validation Rules
description: "Get started with the jQuery Validator by Kendo UI and use the default validation rules or implement your custom rules and error messages."
slug: rules_kendoui_validator
position: 4
---

# Validation Rules

The Validator provides options for you to [use the default validation rules it supports](#default-rules) or [implement custom validation rules](#custom-rules) and [custom messages](#custom-messages).   

## Default Rules

The Kendo Validator supports the following HTML5 validation rules.

* The `required` rule requires that the element has a value.

```dojo
    <form class="myValidator">
      <p><input type="text" name="firstName" required=""  validationMessage="First Name is required"></p>
      <button id="validate" class="k-button k-primary" type="button">Validate</button>
    </form>

    <script>
      $('#validate').click(function(){
        var validator = $(".myValidator").kendoValidator().data("kendoValidator");
        validator.validate();
      })
    </script>
```

* The `pattern` rule constrains the value to match a specific regular expression.

```dojo
    <form class="myValidator">
      <p><input type="text" pattern="[a-z0-9]+" validationMessage="Use only lower case letters or numbers"></p>
      <button id="validate" class="k-button k-primary" type="button">Validate</button>
    </form>

    <script>
      $('#validate').click(function(){
        var validator = $(".myValidator").kendoValidator().data("kendoValidator");
        validator.validate();
      })
    </script>
```

* The `max/min` rule constrains the minimum and maximum numeric values that can be entered.

```dojo
    <form class="myValidator">
      <p><input type="number" name="age" min="18" max="42"></p>
      <button id="validate" class="k-button k-primary" type="button">Validate</button>
    </form>

    <script>
      $('#validate').click(function(){
        var validator = $(".myValidator").kendoValidator({
          messages:{
            min:"Number must be greater than 18",
            max:"Number must be less than 42"
          }
        }).data("kendoValidator");
        validator.validate();
      })
    </script>
```

* The `step` rule, when used in combination with the `min` and `max` attributes, constrains the granularity of the values that can be entered.

```dojo
    <form class="myValidator">
      <p><input type="number" name="age" min="0" max="100" step="5"></p>
      <button id="validate" class="k-button k-primary" type="button">Validate</button>
    </form>

    <script>
      $('#validate').click(function(){
        var validator = $(".myValidator").kendoValidator({
          messages:{
            min:"Number must be greater than 0",
            max:"Number must be less than 100",
            step:"Number must be divisible by 5"
          }
        }).data("kendoValidator");
        validator.validate();
      })
    </script>
```

* The `url` rule constrains the value to a valid URL format.

```dojo
    <form class="myValidator">
      <p><input type="url" name="WebAddress" placeholder="http://example.com" ></p>
      <button id="validate" class="k-button k-primary" type="button">Validate</button>
    </form>

    <script>
      $('#validate').click(function(){
        var validator = $(".myValidator").kendoValidator().data("kendoValidator");
        validator.validate();
      })
    </script>
```

* The `email` rule constrains the value to a valid email format.

```dojo
    <form class="myValidator">
      <p><input type="email" name="email"></p>
      <button id="validate" class="k-button k-primary" type="button">Validate</button>
    </form>
    <script>
      $('#validate').click(function(){
        var validator = $(".myValidator").kendoValidator({
          messages:{
            email: "Enter a valid email address!"
          }
        }).data("kendoValidator");
        validator.validate();
      })
    </script>
```

* The `date` rule constrains the value to a valid date format. To validate the input, use [`kendo.parseDate`](/api/javascript/kendo/methods/parsedate). Input elements of type `<input type="date" name="date" />` and `<input data-type="date" name="date" />`are supported.

```dojo
    <form class="myValidator">
      <p><input type="date" name="date"></p>
      <button id="validate" class="k-button k-primary" type="button">Validate</button>
    </form>

    <script>
      $('#validate').click(function(){
        var validator = $(".myValidator").kendoValidator({
          rules:{
            date:function(input){
              if(input.is("[name=date]") && kendo.parseDate(input.val())< new Date()){
                return false;
              }
              return true;
            }
          },
          messages:{
            date: "Select a future date"
          }
        }).data("kendoValidator");
        validator.validate();
      })
    </script>
```

## Custom Rules

You can set custom rules with the Validator by using its [`rules` configuration option](/api/javascript/ui/validator/configuration/rules).

When you implement your custom validation rules, consider the following specifics:

* Each custom rule is executed for each element in a form. If multiple inputs are available in the form and the validation has to apply only to a specific input, the custom validation code has to check the input before validating.

        custom: function (input) {
            if (input.is("[name=firstName]")) {
                return input.val() === "Test"
            } else {
                return true;
            }
        }

* If the custom validation returns `true`, the validation will pass, and vice versa.
* If multiple custom rules are available, the rules will run in order. The validation will stop at the first rule that fails and will display an associated with that rule error message. A form is valid only if all custom validation rules pass in addition to the standard HTML5 constraints.
* Any HTML5 constraints that are applied to a form (`required`, `type`, and so on) are checked before custom rules are evaluated. Custom rules will not run until an input passes the basic HTML5 constraints.
* Custom messages must match the name of the custom rule. If a custom message is not provided for a custom rule, a simple error icon is displayed.

> HTML5 also provides a way to set custom validation rules through `setCustomValidity()`. However, as with other parts of HTML5, this rule only works in modern browsers. To create custom rules that work in all browsers, use the Kendo UI Validator custom rule definitions.

## Custom Messages

By default, the Validator provides built-in messages which map to built-in validation rules. However, the widget also allows you to define custom messages which override the built-in messages. You can set the validation messages for Kendo Validator by using its [`messages` configuration option](/api/javascript/ui/validator/configuration/messages)

> For the custom error messages to work properly, you are required to set a `name` attribute to the `input` element.

The following example demonstrates how to define custom messages when the validation rules are not fulfilled.

```dojo
    <form id="myform">
        <input name="username" required /> <br />
        <input type="email" name="userEmail" required data-message="My custom email message" /> <br />
        <button>Validate</button>
    </form>

    <script>
        $("#myform").kendoValidator({
             messages: {
                 // Defines a message for the custom validation rule.
                 custom: "Please enter valid value for my custom rule",

                 // Overrides the built-in message for the required rule.
                 required: "My custom required message",

                 // Overrides the built-in message for the email rule
                 // with a custom function that returns the actual message.
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
```

## Custom Message Attributes

Besides the available built-in messages, you can also define a custom message on a per component basis by using the following attributes in the following order:

1. `data-[rule]-msg` where `[rule]` is the failing validation rule
2. `validationMessage`
3. `title`

These attributes will be checked before applying the message from the `messages` configuration option.

The following example demonstrates how the set multiple `data-[rule]-msg` attributes so that they allow a field to have different messages for each different validation rule.

```dojo
    <form id="myform">
        <input type="url" required data-required-msg="You need to enter a URL" data-url-msg="This url is invalid">
        <button>Validate</button>
    </form>

    <script>
        $("#myform").kendoValidator();
    </script>
```

The following example demonstrates how to use the `validationMessage` attribute to specify a custom validation message.

```dojo
    <form id="myform">
        <input type="tel" pattern="\d{10}" validationMessage="Plase enter a ten digit phone number" value="123"> <br />
        <button>Validate</button>
    </form>

    <script>
        $("#myform").kendoValidator();
    </script>
```

Validation messages can also be defined for custom rules.

```dojo
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
```

## See Also

* [Basic Usage of the Validator (Demo)](https://demos.telerik.com/kendo-ui/validator/index)
* [JavaScript API Reference of the Validator](/api/javascript/ui/validator)
