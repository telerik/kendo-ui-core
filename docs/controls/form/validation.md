---
title: Validation
page_title: Kendo UI for jQuery Form Documentation - Validation
description: "Get started with the Kendo UI for jQuery Form and learn about its validation configuration."
slug: validation_form_widget
position: 7
---

# Validation

The Form has a built-in validator. Validation of all Form fields is triggered on form submission. By default, the Form displays a validation message when an editor is focused, then blurred without setting its value. 

The following example shows how to disable the built-in validation on blur.

```dojo
    <form id="form"></form>

    <script>
        $(document).ready(function () {
            $("#form").kendoForm({
                validatable: {
                    validateOnBlur: false,
                },
                formData: {
                    ID: 1,
                    Name: "",
                    Address: ""
                },
                items: [
                    {
                        field: "Name",
                        label: "Name:",
                        validation: { required: true }
                    }, 
                    {
                        field: "Address",
                        label: "Address:",
                         validation: { 
                          required: { 
                            message: "Custom required validation message" 
                          }
                        }
                    }
                ]
            });
        });
    </script>
```

## Validation Summary

The Form can display a list of all validation errors. The validation summary is rendered as a unordered list of messages. By default, this option is disabled. 

The following example shows how to enable validation summary in the Form. 

```dojo
    <form id="form"></form>

    <script>
        $(document).ready(function () {
            $("#form").kendoForm({
                validatable: {
                    validationSummary: true
                },
                formData: {
                    ID: 1,
                    Name: "",
                    Address: ""
                },
                items: [
                    {
                        field: "Name",
                        label: "Name:",
                        validation: { required: true }
                    }, 
                    {
                        field: "Address",
                        label: "Address:",
                        validation: { required: true }
                    }
                ]
            });
        });
    </script>
```

You can set the `validationSummary.Container` option, if you want to use an element as a container for the validation messages. This allows you to specify where the messages will be displayed, for example, above the Form, below it, or elsewhere on the page. 

```dojo
    <div class="summary-container"></div>

    <form id="form"></form>

    <script>
        $(document).ready(function () {
            $("#form").kendoForm({
                validatable: {
                    validationSummary: { container: ".summary-container" }
                },
                formData: {
                    ID: 1,
                    Name: "",
                    Address: ""
                },
                items: [
                    {
                        field: "Name",
                        label: "Name:",
                        validation: { required: true }
                    }, 
                    {
                        field: "Address",
                        label: "Address:",
                        validation: { required: true }
                    }
                ]
            });
        });
    </script>
```

## Error Message Template

You can customize validation error messages with templates.

The following example shows how to define a template with the `errorTemplate` option. 

```dojo
    <form id="form"></form>

    <script>
        $(document).ready(function () {
            $("#form").kendoForm({
                validatable: {
                    errorTemplate: "<span><strong>#=message#</strong></span>"
                },
                formData: {
                    ID: 1,
                    Name: "",
                    Address: ""
                },
                items: [
                    {
                        field: "Name",
                        label: "Name:",
                        validation: { required: true }
                    }, 
                    {
                        field: "Address",
                        label: "Address:",
                        validation: { required: true }
                    }
                ]
            });
        });
    </script>
```

## Custom Validation

You can implement your own validation logic by using the `validation` option, similarly to the way custom rules can be used in the Validator (see [Custom Rules](https://docs.telerik.com/kendo-ui/controls/validator/rules#custom-rules) for more details).

The following example demonstrates custom validation of the `RetireDate` field. 

```dojo
    <form id="form"></form>

    <script>
        $(document).ready(function () {
            $("#form").kendoForm({
                formData: {
                    FirstName: "John",
                    LastName: "Doe",
                    HireDate: new Date(2020, 0, 1),
                    RetireDate: new Date(2020, 0, 1)
                },
                items: [{
                    type: "group",
                    label: "Employee Information",
                    items: [
                        { field: "FirstName", label: "First Name:", validation: { required: true } },
                        { field: "LastName", label: "LastName:", validation: { required: { message: "test" }}, hint: "Hint: enter alphanumeric characters only." },
                        { field: "HireDate", label: { text: "Hire Date:" }, validation: { required: true }, },
                        {
                            field: "RetireDate",
                            label: { text: "Retire Date:" },
                            validation: {
                                required: true,
                                greaterdate: function (input) {
                                    if (input.is("[name='RetireDate']") && input.val() != "") {
                                        var date = kendo.parseDate(input.val()),
                                            hireDate = kendo.parseDate($("[name='HireDate']").val());
                                        input.attr("data-greaterdate-msg", "Retire Date should be after Hire Date");
                                        return hireDate == null || hireDate.getTime() < date.getTime();
                                    }

                                    return true;
                                }
                            }
                        }
                    ]
                }],
            });
        });
    </script>
```

## Using the Validator Instance

The Kendo Ui Form utilizes the [Kendo UI Validator component](https://demos.telerik.com/kendo-ui/validator) internally. This behavior facilitates use cases, in which you may need to use the [Validator API](/api/javascript/ui/form)&mdash;for example, to programmatically trigger validation.

```dojo
    <form id="myForm"></form>

    <script>
        var form = $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "",
                Address: ""
            },
            items: [{
                field: "Name",
                label: "Name:",
                validation: { required: true }
            }, {
                field: "Address",
                label: "Address:",
                validation: { required: true }
            }]
        }).data("kendoForm");

        form.validator.validateInput("[name='Name']");
        form.validator.validateInput("[name='Address']");
    </script>
```

## See Also

* [Validation of the Form (Demo)](https://demos.telerik.com/kendo-ui/form/validation)
* [JavaScript API Reference of the Form](/api/javascript/ui/form)
