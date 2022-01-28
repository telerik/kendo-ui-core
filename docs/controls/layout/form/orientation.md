---
title: Orientation
page_title: Kendo UI for jQuery Form Documentation | Orientation
description: "Get started with the Kendo UI for jQuery Form and learn about its orientation options."
slug: orientation_form_widget
position: 6
---

# Orientation

The Form can render labels above or to the left of their respective editors. This behavior is controlled with the `orientation` configuration option. 

To configure orientation, use either of the following settings:

* `vertical`
* `horizontal`

## Vertical Mode

By default, the Form uses `vertical` orientation mode and renders the labels above their editors.

```dojo
    <form id="form"></form>
  
    <script>
        $(document).ready(function () {
            $("#form").kendoForm({
                orientation: "vertical",
                formData: {
                    Username: "",
                    Email: "",
                    Password: "",
                    Birth: new Date(),
                    Agree: false
                },
                items: [{
                    type: "group",
                    label: "Registration Form",
                    items: [
                        { field: "Username", label: "Username:", validation: { required: true } },
                        { field: "Email", label: "Email", validation: { required: true } },
                        { field: "Password", label: "Password:", validation: { required: true }, hint: "Hint: enter alphanumeric characters only." },
                        { field: "Birth", label: { text: "Date of birth:", optional: true } },
                        { field: "Agree", label: "Agree to Terms", validation: { required: true } },
                    ]
                }]
            });
        });
    </script>
```

## Horizontal Mode

Set the `orientation` option to `horizontal`, if you want to render labels to the left of their editors. 

```dojo
    <form id="form"></form>
  
    <script>
        $(document).ready(function () {
            $("#form").kendoForm({
                orientation: "horizontal",
                formData: {
                    Username: "",
                    Email: "",
                    Password: "",
                    Birth: new Date(),
                    Agree: false
                },
                items: [{
                    type: "group",
                    label: "Registration Form",
                    items: [
                        { field: "Username", label: "Username:", validation: { required: true } },
                        { field: "Email", label: "Email", validation: { required: true, email: true } },
                        { field: "Password", label: "Password:", validation: { required: true }, hint: "Hint: enter alphanumeric characters only." },
                        { field: "Birth", label: { text: "Date of birth:", optional: true } },
                        { field: "Agree", label: "Agree to Terms", validation: { required: true } },
                    ]
                }]
            });
        });
    </script>
```

## See Also

* [Orientation of the Form (Demo)](https://demos.telerik.com/kendo-ui/form/orientation)
* [JavaScript API Reference of the Form](/api/javascript/ui/form)
