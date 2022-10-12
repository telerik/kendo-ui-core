---
title: Form Integration
page_title: jQuery Signature Documentation - Signature Form Integration
description: "Learn how to integrate the Signature inside a Kendo UI for jQuery Form."
slug: form_integration_kendoui_signature_widget
position: 3
---

# Signature Form Integration

The Kendo UI for jQuery Signature allows you to integrate it inside a Kendo UI for jQuery Form. Furthermore, you can validate the Signature before the form is submitted.

To integrate the Signature inside a Kendo UI Form widget, set the [`items.editor`](/api/javascript/ui/form/configuration/items#itemseditor) property of the form field to `Signature`.

```javascript
$("#exampleform").kendoForm({
                orientation: "vertical",
                formData: {
                    Signature: ""
                },
                items: [{
                    type: "group",
                    label: "Registration Form",
                    items: [
                        // Set the editor to "Signature".
                        { field: "Signature", label: "Signature:", editor: "Signature", validation: { required: true } }
                    ]
                }],
            });
```

## See Also

* [Form Integration of the Signature (Demo)](https://demos.telerik.com/kendo-ui/signature/form-integration)
* [JavaScript API Reference of the Signature](/api/javascript/ui/signature)