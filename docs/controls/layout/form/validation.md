---
title: Validation
page_title: Kendo UI for jQuery Form Documentation | Validation | Kendo UI
description: "Get started with the Kendo UI for jQuery Form and learn about its validation configuration."
slug: validation_form_widget
position: 7
---

# Validation

The Form has a built-in validator. Validation is triggered on form submission, but the Form can be configured to display a validation message when an editor is focused, then blurred without setting its value. 

The following example shows how to enable validation on blur. 

```dojo
    <form id="form"></form>

    <script>
        $(document).ready(function () {
            $("#form").kendoForm({
                validatable: {
                    validateOnBlur: true,
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

## See Also

* [JavaScript API Reference of the Form](/api/javascript/ui/from)
