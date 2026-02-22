---
title: Overview
page_title: jQuery SmartPasteButton Documentation - SmartPasteButton Overview
description: "Try now the Kendo UI for jQuery SmartPasteButton component that intelligently extracts structured data from clipboard content and automatically fills form fields using AI processing."
components: ["smartpastebutton"]
slug: overview_kendoui_smartpastebutton_widget
position: 1
---

# {{ site.product }} SmartPasteButton Overview

The SmartPasteButton is an AI-powered component that extracts structured data from clipboard content and automatically fills form fields. When users paste unstructured text from emails, documents, or other sources, the SmartPasteButton sends the content to an AI service, which processes the text and returns structured field values that are intelligently distributed to relevant form fields.

The SmartPasteButton works with regular HTML forms using standard input elements (text, email, tel, etc.) as well as Kendo UI form components, providing an intelligent way to reduce manual data entry and improve form completion efficiency.

## How It Works

The component follows this workflow:

1. **Retrieves the active form fields** - Automatically detects form controls within its form context
2. **Shapes the data into FormFields** - Creates metadata that will be passed to the AI Service
3. **AI Service processes the data** - Returns FieldValues which are intelligently distributed to relevant fields

### FormField Structure

The SmartPasteButton extracts form metadata in the following format:

* `FormField.Field` — Points to the identifier of the retrieved DOM element
* `FormField.Type` — Points to the field type (e.g., `input[type="text"]`, `kendo-input`)
* `FormField.Description` — **Critical for AI accuracy** - Additional description passed to the AI Service for constraints, context, and field relationships
* `FormField.AllowedValues` — Constrained values that the AI Service must choose from (for dropdowns, radio groups)

**Example request to AI service:**
```json
[
    {
        "field": "email",
        "description": "Email Address",
        "type": "string"
    },
    {
        "field": "country",
        "description": "Select Country",
        "type": "fixed-choices",
        "allowedValues": ["USA", "Canada", "Mexico"]
    }
]
```

### Field Types

* `string` — For HTML text inputs. Expects plain text values
* `number` — For HTML number inputs. Expects numeric values without formatting  
* `boolean` — For HTML checkboxes and switches. Expects `true` or `false` values
* `fixed-choices` — For HTML select elements and radio buttons. Expects values from `allowedValues`
* `kendo-input` — For Kendo UI components. Expects values in component-specific format (Date objects for DatePicker, etc.)

### Contextual Descriptions

Use detailed descriptions to provide validation context and improve AI accuracy:

```javascript
formFields: [
    {
        field: "age",
        type: "number",
        description: "Age in years. Value must be between 18 and 100."
    },
    {
        field: "deliveryDate", 
        type: "kendo-input",
        description: "Preferred delivery date. Must be a future weekday."
    }
]
```

## Explicit Field Configuration

While automatic detection works for most scenarios, you can provide explicit field configurations using the `formFields` option for precise control:

```dojo
<style>
    .editor-body-text {
        border: 1px solid #dcdcdc;
        padding: 10px;
        margin-bottom: 8px;
        font-size: 14px;
        line-height: 1.4;
    }

    #copyButton {
        margin-bottom: 12px;
    }

    #form1 {
        max-width: 300px;
    }

        #form1 .k-textbox,
        #form1 .k-maskedtextbox {
            margin-bottom: 8px;
            display: block;
        }

    #smartPaste {
        margin-top: 6px;
    }
</style>

<div class="editor-body-text" id="editorContent">
    Ashley Johnson is a UX Designer with 8 years of experience in Portland, Oregon.
    She’s reliable, and great at making complex ideas simple.
    Her approach ensures smooth teamwork and great results.
    Reach her at (555) 248-9173.
</div>

<button id="copyButton">Copy Text</button>


<form id="form1">
    <input id="fullName" />
    <input id="city" />
    <input id="phone_number" placeholder="e.g. XXXXXXXX" />

    <button id="smartPaste"></button>
</form>

<script>
    $(document).ready(function () {
        $("#copyButton").kendoButton({
            click: onClick
        });

        $("#fullName").kendoTextBox({
            label: "Full Name",
            placeholder: "Full Name"
        });

        $("#city").kendoTextBox({
            label: "City",
            placeholder: "City"
        });

        $("#phone_number").kendoMaskedTextBox({
            label: "Phone Number",
            mask: "(000) 000-00-00",
        });

        $("#smartPaste").kendoSmartPasteButton({
            text: "Smart Paste",
            service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste",
        });
    });

    function onClick(e) {
        const element = document.getElementById("editorContent");
        const range = document.createRange();
        range.selectNodeContents(element);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        navigator.clipboard.writeText(selection.toString());
        $(e.sender.element).find(".k-button-text").text("Text Copied");
    }
</script>
```

Use explicit configuration when you need to:
- Specify exact data types for fields (particularly `number` types)
- Include only specific form fields while excluding others
- Provide detailed descriptions to help AI understand field purposes
- Define allowed values for select fields or radio button groups

## Functionality and Features

* [Getting Started]({% slug getting_started_kendoui_smartpastebutton_widget %})&mdash;Step-by-step guide to create and initialize the SmartPasteButton with automatic or explicit field detection.
* [AI service integration]({% slug ai_service_integration_kendoui_smartpastebutton_widget %})&mdash;Configure AI service endpoints to process clipboard content and return structured data for form population.
* [Events]({% slug events_kendoui_smartpastebutton_widget %})&mdash;Handle AI request lifecycle through component events to display loading indicators, process responses, or handle errors.
* [Appearance and Icons]({% slug appearance_kendoui_smartpastebutton_widget %})&mdash;Customize size, border radius, fill mode, theme color, and icon configuration using predefined appearance options.
* [Error Handling]({% slug error_handling_smartpastebutton %})&mdash;Implement proper error handling for AI service failures, network issues, and form validation scenarios.
* [Keyboard Navigation]({% slug keynav_smartpastebutton %})&mdash;Navigate and interact with the SmartPasteButton using keyboard shortcuts and accessibility features.

## Supported Kendo UI Components

The SmartPasteButton supports seamless integration with the following Kendo UI components:

| Component | Documentation |
|-----------|---------------|
| AutoComplete | [AutoComplete Overview]({% slug overview_kendoui_autocomplete_widget %}) |
| ComboBox | [ComboBox Overview]({% slug overview_kendoui_combobox_widget %}) |
| DateInput | [DateInput Overview]({% slug overview_kendoui_dateinput_widget %}) |
| DatePicker | [DatePicker Overview]({% slug overview_kendoui_datepicker_widget %}) |
| DateRangePicker | [DateRangePicker Overview]({% slug overview_kendoui_daterangepicker_widget %}) |
| DateTimePicker | [DateTimePicker Overview]({% slug overview_kendoui_datetimepicker_widget %}) |
| DropDownList | [DropDownList Overview]({% slug overview_kendoui_dropdownlist_widget %}) |
| DropDownTree | [DropDownTree Overview]({% slug overview_kendoui_dropdowntree_widget %}) |
| Form | [Form Overview]({% slug overview_kendoui_form_widget %}) |
| MaskedTextBox | [MaskedTextBox Overview]({% slug overview_kendoui_maskedtextbox_widget %}) |
| MultiColumnComboBox | [MultiColumnComboBox Overview]({% slug overview_kendoui_multicolumncombobox_widget %}) |
| MultiSelect | [MultiSelect Overview]({% slug overview_kendoui_multiselect_widget %}) |
| NumericTextBox | [NumericTextBox Overview]({% slug overview_kendoui_numerictextbox_widget %}) |
| RadioGroup | [RadioGroup Overview]({% slug overview_kendoui_radiogroup_widget %}) |
| Rating | [Rating Overview]({% slug overview_kendoui_rating_widget %}) |
| Switch | [Switch Overview]({% slug overview_kendoui_switch_widget %}) |
| TextArea | [TextArea Overview]({% slug overview_kendoui_textarea_widget %}) |
| TextBox | [TextBox Overview]({% slug overview_kendoui_textbox_widget %}) |
| TimeDurationPicker | [TimeDurationPicker Overview]({% slug overview_kendoui_timedurationpicker_widget %}) |
| TimePicker | [TimePicker Overview]({% slug overview_kendoui_timepicker_widget %}) |

## Next Steps

* [Getting Started with the Kendo UI SmartPasteButton for jQuery]({% slug getting_started_kendoui_smartpastebutton_widget %})
* [Basic Usage of the SmartPasteButton (Demo)](https://demos.telerik.com/kendo-ui/smartpastebutton/index)
* [SmartPasteButton Events (Demo)](https://demos.telerik.com/kendo-ui/smartpastebutton/events)

## See Also

* [SmartPasteButton API (Demo)](https://demos.telerik.com/kendo-ui/smartpastebutton/api)
* [SmartPasteButton Appearance (Demo)](https://demos.telerik.com/kendo-ui/smartpastebutton/appearance)
* [JavaScript API Reference of the SmartPasteButton](/api/javascript/ui/smartpastebutton)
* [Knowledge Base Section](/knowledge-base)