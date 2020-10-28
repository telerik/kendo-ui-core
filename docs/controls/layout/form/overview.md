---
title: Overview
page_title: Kendo UI for jQuery Form Documentation | Form Overview
description: "Get started with the Kendo UI for jQuery Form and learn about its features and how to initialize the widget."
slug: overview_kendoui_form_widget
position: 1
---

# Form Overview

The Kendo UI Form widget allows you to generate and manage forms. Through a variety of configuration options, it makes creating and customizing forms a seamless experience. Achieve the desired form appearance by using default or custom editors, choose layout and orientation, display the editors in groups and columns, and configure validation.

* [Demo page for the Form](https://demos.telerik.com/kendo-ui/form/index) 

## Initializing the Form

To initialize the Form, use the `<form>` tag.

The following example demonstrates how to initialize the Form from an existing `<form>` element. The `items` option is set, and it allows configuring Kendo UI widgets as form field editors.

```dojo
    <form id="form"></form>

    <script>
        $(document).ready(function () {
            $("#form").kendoForm({
                validatable: { validationSummary: true },
                orientation: "vertical",
                formData: {
                    TextBox: "John Doe",
                    NumericTextBox: 2,
                    MaskedTextBox: 21313,
                    DatePicker: new Date(),
                    DateTimePicker: new Date(),
                    Switch: true,
                    DropDownList: 1
                },
                items: [
                    {
                        field: "TextBox",
                        label: "TextBox",
                        validation: { required: true }
                    },
                    {
                        field: "NumericTextBox",
                        editor: "NumericTextBox",
                        label: "NumericTextBox",
                        validation: { required: true }
                    },
                    {
                        field: "MaskedTextBox",
                        editor: "MaskedTextBox",
                        label: "MaskedTextBox",
                        validation: { required: true }
                    },
                    {
                        field: "DatePicker",
                        editor: "DatePicker",
                        label: "Date Picker:",
                        validation: { required: true }
                    },
                    {
                        field: "DateTimePicker",
                        editor: "DateTimePicker",
                        label: "Date Time Picker:",
                        validation: { required: true }
                    },
                    {
                        field: "Switch",
                        editor: "Switch",
                        label: "Switch",
                        validation: { required: true }
                    },
                    {
                        field: "DropDownList", editor: "DropDownList", label: "DropDownList", validation: { required: true }, editorOptions: {
                            optionLabel: "Select item...",
                            dataSource: [
                                { Name: "Item1", Id: 1 },
                                { Name: "Item2", Id: 2 }
                            ],
                            dataTextField: "Name",
                            dataValueField: "Id"
                        }
                    }
                ]
            });
        });
    </script>
```

## Referencing Existing Instances

To get a reference to an existing Form instance:

1. Use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) method.
1. Once a reference is established, use the [Form API](/api/javascript/ui/form) to control its behavior.

        var form = $("#form").data("kendoForm");

## Functionality and Features

* [Items]({% slug items_form_widget %})
* [Layout]({% slug layout_form_widget %})
* [Groups]({% slug groups_form_widget %})
* [Orientation]({% slug orientation_form_widget %})
* [Validation]({% slug validation_form_widget %})
* [Accessibility]({% slug accessibility_kendoui_form_widget %})

## See Also

* [Basic Usage of the Form (Demo)](https://demos.telerik.com/kendo-ui/form/index)
* [JavaScript API Reference of the Form](/api/javascript/ui/form)
