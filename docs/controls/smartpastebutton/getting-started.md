---
title: Getting Started
page_title: jQuery SmartPasteButton Documentation - Getting Started
description: "Get started with the Kendo UI for jQuery SmartPasteButton and learn how to create, initialize, and configure the component."
components: ["smartpastebutton"]
slug: getting_started_kendoui_smartpastebutton_widget
position: 2
---

# Getting Started with the SmartPasteButton

This guide demonstrates how to get up and running with the Kendo UI for jQuery SmartPasteButton.

After the completion of this guide, you will achieve the following end result:

```dojo
<style>
    #customerForm {
        max-width: 360px;
    }

    #customerForm > div {
        margin-bottom: 8px;
    }

    label {
        display: block;
        font-size: 13px;
        margin-bottom: 2px;
    }

    input {
        width: 100%;
        padding: 4px 6px;
    }

    #smartPasteButton {
        margin-top: 6px;
    }

    .copy-text {
        margin-top: 12px;
        font-size: 13px;
        white-space: pre-line;
    }
</style>

<div class="copy-text">
    <strong>Copy this text:</strong>
    Full name: Alice Johnson
    Email: alice.johnson@company.com
    Phone: +1 (555) 987–6543
</div>

<form id="customerForm">
    <div>
        <label for="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" />
    </div>

    <div>
        <label for="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" />
    </div>

    <div>
        <label for="email">Email</label>
        <input id="email" name="email" type="email" />
    </div>

    <div>
        <label for="phone">Phone</label>
        <input id="phone" name="phone" type="tel" />
    </div>

    <button id="smartPasteButton" type="button">
        Smart Paste
    </button>
</form>

<script>
    $("#smartPasteButton").kendoSmartPasteButton({
        service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste"
    });
</script>
```

## 1. Create a Form

First, create an HTML form with the input fields you want to populate automatically:

```html
<form id="customerForm">
    <div>
        <label for="firstName">First Name:</label>
        <input id="firstName" name="firstName" type="text" />
    </div>
    <div>
        <label for="lastName">Last Name:</label>
        <input id="lastName" name="lastName" type="text" />
    </div>
    <div>
        <label for="email">Email:</label>
        <input id="email" name="email" type="email" />
    </div>
    <div>
        <label for="phone">Phone:</label>
        <input id="phone" name="phone" type="tel" />
    </div>
    <button id="smartPasteButton" type="button">Smart Paste</button>
</form>
```

## 2. Initialize the SmartPasteButton

In this step, you will initialize the SmartPasteButton from the `<button>` element.

```html
<script>
$("#smartPasteButton").kendoSmartPasteButton({
    service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste"
});
</script>
```

## 3. Configure the AI Service

The SmartPasteButton requires an AI service endpoint that processes clipboard content and returns structured data. For this example, we use the Telerik demo service at `https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste`.

```json
{
    "clipboardContent": "John Smith, Software Engineer at Acme Corp, john.smith@acme.com, (555) 123-4567",
    "formFields": [
        { "field": "firstName", "type": "string", "description": "First name" },
        { "field": "lastName", "type": "string", "description": "Last name" },
        { "field": "email", "type": "string", "description": "Email address" },
        { "field": "phone", "type": "string", "description": "Phone number" }
    ]
}
```

And return a response with field values:

```json
{
    "firstName": "John",
    "lastName": "Smith",
    "email": "john.smith@acme.com",
    "phone": "(555) 123-4567"
}
```

## Next Steps

* [Explore the SmartPasteButton events]({% slug events_kendoui_smartpastebutton_widget %})
* [Configure AI service integration]({% slug ai_service_integration_kendoui_smartpastebutton_widget %})
* [Customize the SmartPasteButton appearance and icons]({% slug appearance_kendoui_smartpastebutton_widget %})

## See Also

* [Basic Usage of the SmartPasteButton (Demo)](https://demos.telerik.com/kendo-ui/smartpastebutton/index)
* [JavaScript API Reference of the SmartPasteButton](/api/javascript/ui/smartpastebutton)
* [Knowledge Base Section](/knowledge-base)