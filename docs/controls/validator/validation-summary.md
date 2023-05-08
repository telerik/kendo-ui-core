---
title: Validation Summary
page_title: jQuery Validator Documentation - Validation Summary
description: "Get started with the jQuery Validator by Kendo UI and use the built-in validation summary functionality."
slug: validationsummary_kendoui_validator
position: 6
---

# Validation Summary

The Validator enables you to list validation errors in a separate container through the [`validationSummary`](/api/javascript/ui/validator/configuration/validationsummary) option. 

The listed errors link to the corresponding form elements and focus them upon clicking an error message from the validation summary list.

## Default Configuration

The default value of the `validationSummary` option is `false` which means that the validation summary element will not be rendered when the form is validated.

## Enabling the Summary

To enable the summary of validation messages, set the `validationSummary` option to `true`. As a result, the Validator will render a container before the element on which the component is initialized.

    <div id="myform">
        <input type="text" name="firstName" required />
        <input type="text" name="lastName" required />
        <button id="save" type="button">Save</button>
    </div>

    <script>
        $("#myform").kendoValidator({
            validationSummary: true
        });
    </script>

## Specifying the Summary Location 

You can render the summary of the validation messages in a container of your choice by utilizing the [`validationSummary.container`](/api/javascript/ui/validator/configuration/validationsummary.container) option. For example, you can display the validation summary under the validated content with the following configuration:

    <form id="myform">
        <input name="username" required /> <br />
        <button>Validate</button>
    </form>
    <div id="summary">

    <script>
        $("#myform").kendoValidator({
          validationSummary: {
            container: "#summary"
          }
        });
    </script>

## Customizing the Validation Messages

You can change the default template of the validation summary through the [`validationSummary.template`](/api/javascript/ui/validator/configuration/validationsummary.template) option. Note that the `data-field` attribute will link the error message to the corresponding form control and focus it on click.


    <form id="myform">
        <input name="username" required /> <br />
        <button>Validate</button>
    </form>

    <script type="x/kendo-template" id="summary-template">
        <ul>
            #for(var i = 0; i < errors.length; i += 1){#
                <li><a data-field="#=errors[i].field#" href="\\#">#= errors[i].message #</a></li>
            # } #
        </ul>
    </script>

    <script>
        $("#myform").kendoValidator({
          validationSummary: {
            template: kendo.template($("#summary-template").html())
          }
        });
    </script>


## Showing and Hiding the Summary Programmatically

To control the visibility of the summary container, use the [`showValidationSummary()`](/api/javascript/ui/validator/methods/showvalidationsummary) and [`hideValidationSummary()`](/api/javascript/ui/validator/methods/hidevalidationsummary) methods. 

However, note that `showValidationSummary()` will render error messages only if the form is already validated.

## Retrieving a Summary Element from the Validator Instance

You can retrieve the DOM element of the summary through the Validator instance.

    <script>
        // Attach a Validator to the container and get a reference.
        var validator = $("#myform").kendoValidator({
          validationSummary: true
        }).data("kendoValidator");

        console.log(validator.validationSummary);
    </script>

## See Also

* [Basic Usage of the Validator (Demo)](https://demos.telerik.com/kendo-ui/validator/index)
* [JavaScript API Reference of the Validator](/api/javascript/ui/validator)
