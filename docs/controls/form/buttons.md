---
title: Buttons
page_title: Kendo UI for jQuery Form Documentation - Buttons
description: "Get started with the Kendo UI for jQuery Form and learn how to configure the buttons."
components: ["form"]
slug: buttons_form_widget
position: 7
---

# Buttons

The Buttons functionality of the Kendo UI for jQuery Form allows you to alter both the Submit and Clear buttons.

## Setting the Buttons Template

The Form allows you to specify a template which will be used for the rendering of the Form buttons.

```dojo
    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            buttonsTemplate: "<button>Submit</button>"
        });
    </script>
```

## Toggling the Clear Button

As of the 2025 Q1 release, the Form enables you to toggle the visibility state of the Clear Button.

```dojo
    <form id="myForm"></form>

    <script>
        $("#myForm").kendoForm({
            formData: {
                ID: 1,
                Name: "Ivan",
                Address: "Sofia"
            },
            clearButton: false,
        });
    </script>
```

## See Also

* [API of the Form (Demo)](https://demos.telerik.com/kendo-ui/form/api)
* [JavaScript API Reference of the Form](/api/javascript/ui/form)
