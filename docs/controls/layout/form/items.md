---
title: Items
page_title: Kendo UI for jQuery Form Documentation | Items
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
                    Password: "",
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
                    Password: "",
                    Birth: new Date()
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

## See Also

* [Items configuration of the Form (Demo)](https://demos.telerik.com/kendo-ui/form/items)
* [JavaScript API Reference of the Form](/api/javascript/ui/form)
