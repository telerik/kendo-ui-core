---
title: Required Switch
page_title: jQuery Switch Documentation - Required Switch
description: "Get started with the jQuery Switch by Kendo UI and learn how to make it mandatory by using the Kendo UI Validator."
components: ["switch"]
slug: validation_kendoui_switch_widget
position: 8
---

# Required Switch

The Switch is created from an `input` element of type `checkbox`. To require the user to turn the Switch on before a form is submitted, use the [Kendo UI Validator]({% slug overview_kendoui_validator_widget %}) with the `required` attribute of the `input` element.

To make the Switch mandatory:

1. Add the `required` attribute and a `name` attribute to the `input` element.
1. Optionally, set the message that the Validator displays through the `validationMessage` attribute.
1. Initialize the Switch.
1. Initialize the Validator on the `form` element.

When the Switch is off, the Validator displays the validation message and prevents the form from being submitted. When the Switch is on, the form is submitted.

The following example demonstrates how to require the Switch to be turned on.

    <form id="form">
        <input type="checkbox" id="accept" name="Accept" required validationMessage="Acceptance is required" />
        <label for="accept">Accept the terms</label>
        <button type="submit" class="k-button">Submit</button>
    </form>
    <p id="result"></p>

    <script>
        $("#accept").kendoSwitch();
        $("#form").kendoValidator();

        $("#form").on("submit", function(e) {
            e.preventDefault();
            $("#result").text("The form is valid.");
        });
    </script>

## See Also

* [Overview of the Validator]({% slug overview_kendoui_validator_widget %})
* [Getting Started with the Validator]({% slug getting_started_kendoui_validator_widget %})
* [Basic Usage of the Switch (Demo)](https://demos.telerik.com/kendo-ui/switch/index)
* [JavaScript API Reference of the Switch](/api/ui/switch)
