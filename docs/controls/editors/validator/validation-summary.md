---
title: Validation Summary
page_title: jQuery Validator Documentation | Validation Summary
description: "Get started with the jQuery Validator by Kendo UI and use the built-in validation summary functionality."
slug: validationsummary_kendoui_validator
position: 5
---

# Validation Summary

The Validator provides the ability to list validation errors in a separate container through the [`validationSummary`](/api/javascript/ui/validator/configuration/validationsummary) option. The listed errors link to the corresponding form elements and focus them upon clicking an error message from the validation summary list.

## Default

The default value of the `validationSummary` option is false and the validation summary element will not be rendered when the form is validated.

## Enable Summary

The option could be enabled by setting the `validationSummary` option to true. This will cause the Validator to render a container before the element on which the Validator is initialized:

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

## Specify Where To Render

The validation summary can be rendered in a container of choice by utilizing the [`validationSummary.container`](/api/javascript/ui/validator/configuration/validationsummary.container) option. For example, the summary could be displayed below the validated content with the following configuration:

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

## Customize Validation Messages

The default template of the validation summary could be changed through the [`validationSummary.template`](/api/javascript/ui/validator/configuration/validationsummary.template) option.

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

The `data-field` attribute is used to link the error message to the corresponding form control and focus it upon click.

## Programmatically Show/Hide the Summary

The visibility of the summary container could be controlled through the [`showValidationSummary()`](/api/javascript/ui/validator/methods/showvalidationsummary) and [`hideValidationSummary()`](/api/javascript/ui/validator/methods/hidevalidationsummary) methods.

Consider the following specifics when using these methods:

* `showValidationSummary()` will render error messages only if the form is already validated.

## Retrieve Summary Element from the Validator Instance

The DOM element of the summary could be retrieved through the Validator instance:

    <script>
        // attach a validator to the container and get a reference
        var validator = $("#myform").kendoValidator({
          validationSummary: true
        }).data("kendoValidator");

        console.log(validator.validationSummary);
    </script>

## See Also

* [Basic Usage of the Validator (Demo)](https://demos.telerik.com/kendo-ui/validator/index)
* [JavaScript API Reference of the Validator](/api/javascript/ui/validator)
