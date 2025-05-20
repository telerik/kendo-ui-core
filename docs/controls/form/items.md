---
title: Items
page_title: Kendo UI for jQuery Form Documentation - Items
description: "Get started with the Kendo UI for jQuery Form and learn how to configure items."
slug: items_form_widget
position: 2
---

# Items

The `items` configuration options allows you to customize the appearance and behavior of the Form. If it is not set, the Form will render default editors based on the data provided in its `formData` configuration.

The following example shows the Form initialized with the `items` option not set.

```dojo
    <form id="form"></form>

    <script>
        $(document).ready(function () {
            $("#form").kendoForm({
                formData: {
                    Username: "",
                    Email: "",
                    Password: "",
                    Birth: new Date(),
                    Agree: false
                }
            });
        });
    </script>
```

Setting the `items` configuration maps the model fields and allows you to:

* customize the editors
* customize the labels and hints of the editors
* group the editors
* set validation rules for specific fields

## Configure Label

The following example shows how to set the `label` of an item. Enabling the `optional` setting, indicates that the field is optional (not required).

```dojo
    <form id="form"></form>

    <script>
        $(document).ready(function () {
            $("#form").kendoForm({
                formData: {
                    FirstName: "",
                    LastName: "",
                    Birth: new Date()
                },
                items: [
                    {
                        field: "FirstName",
                        label: "First Name:",
                        validation: { required: true }
                    },
                    {
                        field: "LastName",
                        label: "Last Name:",
                        validation: { required: true }
                    },
                    {
                        field: "Birth",
                        label: { text: "Date of Birth:", optional: true }
                    }
                ]
            });
        });
    </script>
```

## Configure Hint

The following example shows how to set the `hint` of an item. The hint is displayed below the editor of the field.

```dojo
    <form id="form"></form>

    <script>
        $(document).ready(function () {
            $("#form").kendoForm({
                formData: {
                    FirstName: "",
                    LastName: "",
                    Password: ""
                },
                items: [
                    {
                        field: "FirstName",
                        label: "First Name:",
                        validation: { required: true }
                    },
                    {
                        field: "LastName",
                        label: "Last Name:",
                        validation: { required: true }
                    },
                    {
                        field: "Password",
                        label: "Password:",
                        validation: { required: true },
                        hint: "Hint: enter alphanumeric characters only."
                    }
                ]
            });
        });
    </script>
```

## Configure Editor

With the `editor` option you can explicitly configure an editor to be used for a specific field. See the [editor](https://docs.telerik.com/kendo-ui/api/javascript/ui/form/configuration/items#itemseditor) configuration option in the client-side API documentation, for a list of the supported editors.

```dojo
    <form id="form"></form>

    <script>
        $(document).ready(function () {
            $("#form").kendoForm({
                formData: {
                    FirstName: "",
                    LastName: "",
                    Password: ""
                },
                items: [
                    {
                        field: "TextBox",
                        label: "TextBox:",
                        validation: { required: true }
                    },
                    {
                        field: "NumericTextBox",
                        editor: "NumericTextBox",
                        label: "NumericTextBox:",
                        validation: { required: true }
                    },
                    {
                        field: "MaskedTextBox",
                        editor: "MaskedTextBox",
                        label: "MaskedTextBox:",
                        validation: { required: true }
                    },
                    {
                        field: "DatePicker",
                        editor: "DatePicker",
                        label: "DatePicker:",
                        validation: { required: true }
                    },
                    {
                        field: "DateTimePicker",
                        editor: "DateTimePicker",
                        label: "DateTimePicker:",
                        validation: { required: true }
                    },
                    {
                        field: "Switch",
                        editor: "Switch",
                        label: "Switch:",
                        validation: { required: true }
                    },
                    {
                        field: "ComboBox", editor: "ComboBox", label: "ComboBox:", validation: { required: true },
                        editorOptions: {
                            placeholder: "Select product",
                            dataTextField: "ProductName",
                            dataValueField: "ProductID",
                            filter: "contains",
                            dataSource: {
                                type: "odata",
                                serverFiltering: true,
                                transport: {
                                    read: {
                                        url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
                                    }
                                }
                            }
                        }
                    }
                ]
            });
        });
    </script>
```

## Custom Editor

You can implement custom editor by using the editor option as a function as follows:

```dojo
    <form id="form"></form>

    <script>
        $(document).ready(function () {
            $("#form").kendoForm({
                formData: {
                    Description: "",
                },
                items: [{
                    field: "Description",
                    label: "Description:",
                    editor: function(container, options) {
                        $("<textarea class='k-textarea' name='" + options.field + "' required data-bind='value: " +  options.field + "'></textarea>")
                            .appendTo(container);
                    },
                    validation: { required: true }
                }],
            });
        });
    </script>
```

## Configure Upload Component as Editor

Starting with Q2 2025, you can use the [Upload]({% slug overview_kendoui_upload_widget %}) component as an editor type in the Form. This allows you to integrate file uploading capabilities directly within your forms.

To use the Upload as a form editor, specify `"Upload"` as the editor type in your form item configuration:

```dojo
    <form id="form"></form>

    <script>
        $(document).ready(function () {
            $("#form").kendoForm({
                formData: {
                    Username: "",
                    Email: "",
                    UploadedFile: null
                },
                items: [
                    {
                        field: "Username",
                        label: "Username:",
                        validation: { required: true }
                    },
                    {
                        field: "Email",
                        label: "Email:",
                        validation: { required: true, email: true }
                    },
                    {
                        field: "UploadedFile",
                        label: "Document:",
                        hint: "Accepted formats: .pdf, .docx, .txt",
                        editor: "Upload",
                        validation: { required: true },
                        editorOptions: {
                            multiple: false,
                            validation: {
                                allowedExtensions: [".pdf", ".docx", ".txt"],
                                maxFileSize: 10485760 // 10MB
                            }
                        }
                    }
                ],
                submit: function(e) {
                    e.preventDefault();
                    // Handle form submission with file
                    if (e.model.UploadedFile) {
                        console.log("Selected file:", e.model.UploadedFile.name);
                    }
                }
            });
        });
    </script>
```

For more information about using the Upload component with Form, including configuration options and examples of handling file uploads, refer to the [Form Integration article]({% slug form_integration_upload_component %}) in the Upload documentation.

## See Also

* [Items configuration of the Form (Demo)](https://demos.telerik.com/kendo-ui/form/items)
* [JavaScript API Reference of the Form](/api/javascript/ui/form)
