---
title: Error Handling
page_title: jQuery SmartPasteButton Documentation - Error Handling  
description: "Learn how to implement proper error handling when using the jQuery SmartPasteButton by Kendo UI with AI services and form validation."
components: ["smartpastebutton"]
slug: error_handling_smartpastebutton
position: 6
---

# Error Handling

When using the SmartPasteButton, there are situations where the clipboard content may not contain sufficient information for all form fields. This guide demonstrates how form validation is triggered when required fields cannot be populated from the extracted data.

## Form Validation Behavior

When the SmartPasteButton processes clipboard content but cannot extract data for required form fields, the standard form validation will trigger to ensure data integrity:

```html
<div id="smartPasteContainer">
    <form id="responsiveForm"></form>
</div>

<script>
    $(document).ready(function () {
        $("#responsiveForm").kendoForm({
            orientation: "vertical",
            validatable: {
                validationSummary: false,
            },
            items: [
                {
                    field: "FullName",
                    label: "Full Name",
                    editor: "TextBox",
                    editorOptions: {
                        placeholder: "e.g. John Doe"
                    }
                },
                {
                    field: "City",
                    label: "City",
                    editor: "TextBox",
                    editorOptions: {
                        placeholder: "e.g. London"
                    }
                },
                {
                    field: "Phone",
                    label: "Phone Number",
                    editor: "MaskedTextBox",
                    validation: { required: true },
                    editorOptions: {
                        mask: "(000) 000-00-00"
                    }
                }
            ],
            smartPaste: {
                text: "Smart Paste",
                service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste"
            }
        });
    });
</script>
```

## Validation Behavior

When you paste content like "Ashley Johnson, Portland" into the form above, the SmartPasteButton will:

1. **Extract available data**: Successfully populate the "Full Name" field with "Ashley Johnson" and "City" field with "Portland"
2. **Handle missing data**: The "Phone Number" field cannot be populated because the clipboard content doesn't contain phone information  
3. **Trigger validation**: Since the Phone field is marked as `required`, the form validation will highlight this field as invalid

## Required Field Validation

The SmartPasteButton respect existing form validation rules. If a required field cannot be populated from the clipboard content:

- The field will remain empty
- Form validation will trigger when the user interacts with the form or attempts to submit
- Visual indicators (red borders, error messages) will appear for unfilled required fields
- Users can then manually complete the missing information

## Validation Configuration

Configure form validation behavior alongside the SmartPasteButton:
```javascript
$("#responsiveForm").kendoForm({
    orientation: "vertical",
    validatable: {
        validationSummary: false, // Disable validation summary
        validateOnBlur: true,     // Validate fields when focus is lost
    },
    items: [
        {
            field: "Email",
            label: "Email Address",
            editor: "TextBox",
            validation: { 
                required: true,
                email: true
            }
        },
        {
            field: "Phone",
            label: "Phone Number",
            editor: "MaskedTextBox", 
            validation: { required: true },
            editorOptions: {
                mask: "(000) 000-0000"
            }
        }
    ],
    smartPaste: {
        text: "Smart Paste",
        service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste"
    }
});
```

## Handling Incomplete Data

When the SmartPasteButton encounters clipboard content that doesn't contain all required information:

- **Partial population**: Available fields are filled with extracted data
- **Empty required fields**: Required fields that cannot be populated remain empty
- **Validation triggers**: Standard form validation rules apply to unfilled required fields
- **User completion**: Users must manually complete any missing required information

## Best Practices

1. **Clear field labels**: Use descriptive labels to help the AI service identify relevant data
2. **Appropriate validation**: Set validation rules that make sense for your business logic
3. **User guidance**: Provide clear instructions about what information is needed
4. **Fallback options**: Always allow manual data entry when AI extraction is insufficient

## Testing with Sample Data

You can test the validation behavior with various clipboard content:

**Complete data example:**
```
John Smith
john.smith@email.com
(555) 123-4567
```

**Incomplete data example (triggers validation):**
```
Sarah Wilson
Portland, OR
```

In the incomplete example, the phone field validation will trigger because the required phone number cannot be extracted from the clipboard content.
            },
            items: [
                {
                    field: "FullName",
                    label: "Full Name",
                    editor: "TextBox",
For a complete example that demonstrates form validation behavior when clipboard content is incomplete, refer to the [demo on error handling of the SmartPasteButton](https://demos.telerik.com/kendo-ui/smartpastebutton/error-handling).

## See Also

* [Error Handling by the SmartPasteButton (Demo)](https://demos.telerik.com/kendo-ui/smartpastebutton/error-handling)
* [Events]({% slug events_kendoui_smartpastebutton_widget %})
* [AI Service Integration]({% slug ai_service_integration_kendoui_smartpastebutton_widget %})
* [Overview]({% slug overview_kendoui_smartpastebutton_widget %})
* [JavaScript API Reference of the SmartPasteButton](/api/javascript/ui/smartpastebutton)
* [Knowledge Base Section](/knowledge-base)