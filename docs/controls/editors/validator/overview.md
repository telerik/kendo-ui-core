---
title: Overview
page_title: jQuery Validator Documentation | Validator Overview
description: "Get started with the jQuery Validator by Kendo UI and learn how to create, initialize, and enable the widget."
previous_url: /framework/validator/overview
slug: overview_kendoui_validator_widget
position: 1
---

# Validator Overview

The Kendo UI Validator widget offers an easy way to do client-side form validation.

Built around the HTML5 form validation attributes, it supports a variety of built-in validation rules and provides a convenient way for setting custom-rule handling. The Validator is a powerful framework component and essential for any application that collects user input.

* [Demo page for the Validator](https://demos.telerik.com/kendo-ui/validator/index)

## Basic Usage

The Validator works with the standard [HTML5 `form` validation attributes]({% slug forms_kendoui_validator %}). It allows you to use the normal HTML5 constraint attributes and then automatically makes these attributes work in all browsers (Internet Explorer 7 and later) while providing you with more possibilities for customization.

To use the Validator, define an HTML form that includes one or more of these new attributes.

    <div id="myform">
        <input type="text" name="firstName" required />
        <input type="text" name="lastName" required />
        <button id="save" type="button">Save</button>
    </div>

You need to add a Validator to the page. Add the code from the following example in a JavaScript block on the page.

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

## Functionality and Features

* [Forms validation]({% slug forms_kendoui_validator %})
* [Validation rules]({% slug rules_kendoui_validator %})
* [Tooltip]({% slug tooltip_kendoui_validator %})

## See Also

* [Basic Usage of the Validator (Demo)](https://demos.telerik.com/kendo-ui/validator/index)
* [JavaScript API Reference of the Validator](/api/javascript/ui/validator)
