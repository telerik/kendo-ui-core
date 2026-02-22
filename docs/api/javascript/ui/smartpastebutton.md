---
title: SmartPasteButton
page_title: Configuration, methods and events of Kendo UI SmartPasteButton
description: 'Configuration steps for the SmartPasteButton widget.'
res_type: api
component: smartpastebutton
---

# kendo.ui.SmartPasteButton

Represents the Kendo UI SmartPasteButton widget. Inherits from [Button](/api/javascript/ui/button).

The SmartPasteButton enables users to paste unstructured text and have it intelligently distributed into relevant form fields using AI processing.

## Configuration

### enable `Boolean` *(default: true)*

Specifies whether the SmartPasteButton widget will be enabled or disabled.

<div class="meta-api-description">
How do I enable or disable user interaction with the Smart Paste Button in Kendo UI? Control whether users can interact with or click the smart paste button by enabling or disabling the button, configuring the component to accept or block user clicks, setting the button as interactive or non-interactive, managing user interaction permissions, toggling button activation, programmatically allowing or preventing clicks or modifications within the smart paste interface, adjusting interactive states for smart paste buttons, and setting button availability at initialization for dynamic control over user paste operations.
</div>

#### Example

    <form id="form">
        <input name="firstName" />
        <input name="lastName" />
        <button id="smartPasteButton"></button>
    </form>

    <script>
    $("#smartPasteButton").kendoSmartPasteButton({
        enable: false,
        service: {
            url: "https://your-ai-service.com/api/parse"
        }
    });
    </script>

### cancelIcon `String` *(default: "x")*

Specifies the icon displayed when the button is in listening/processing state.

<div class="meta-api-description">
How do I customize the cancel icon displayed in Kendo UI SmartPasteButton during processing? Configure the icon shown when the smart paste button is actively processing or listening for clipboard content, enabling control over the visual indicator used during the cancellation state, allowing customization of the stop or cancel symbol, setting the icon that appears when users can cancel the paste operation, and managing the visual feedback provided during AI processing or clipboard reading operations within smart paste functionality.
</div>

#### Example

    <form id="form">
        <input name="firstName" />
        <button id="smartPasteButton"></button>
    </form>

    <script>
    $("#smartPasteButton").kendoSmartPasteButton({
        cancelIcon: "stop",
        service: {
            url: "https://your-ai-service.com/api/parse"
        }
    });
    </script>

### icon `String` *(default: "clipboard")*

Specifies the icon displayed on the button in its default state.

<div class="meta-api-description">
How do I change the default icon for Kendo UI SmartPasteButton? Customize the visual symbol or icon displayed on the smart paste button when it's in the ready state, enabling control over the button's appearance, setting custom icons to match design requirements, configuring the visual indicator that represents the paste functionality, and managing the default icon shown when the button is available for user interaction before any paste operations begin.
</div>

#### Example

    <form id="form">
        <input name="firstName" />
        <button id="smartPasteButton"></button>
    </form>

    <script>
    $("#smartPasteButton").kendoSmartPasteButton({
        icon: "paste",
        service: {
            url: "https://your-ai-service.com/api/parse"
        }
    });
    </script>

### fillMode `String` *(default: "solid")*

Sets a value controlling the way the color is applied to the SmartPasteButton. Valid values are `"solid"`, `"outline"`, `"flat"`, and `"link"`.

<div class="meta-api-description">
How do I customize the visual style and fill mode of a Kendo UI SmartPasteButton? Control the button's color treatment and visual presentation by choosing between solid backgrounds, outlined borders, flat appearances, or link-style rendering, enabling customization of button styling to match design systems, themes, or visual preferences while maintaining consistency with other UI elements and ensuring proper integration within forms or application interfaces.
</div>

#### Example

    <form id="form">
        <input name="firstName" />
        <button id="smartPasteButton"></button>
    </form>

    <script>
    $("#smartPasteButton").kendoSmartPasteButton({
        fillMode: "outline",
        service: {
            url: "https://your-ai-service.com/api/parse"
        }
    });
    </script>

### rounded `String` *(default: "medium")*

Sets a value controlling the border radius of the SmartPasteButton. Valid values are `"small"`, `"medium"`, `"large"`, and `"full"`.

<div class="meta-api-description">
How do I adjust the corner rounding of a Kendo UI SmartPasteButton? Control the button's corner radius and rounded appearance by selecting from predefined rounding levels, enabling customization of button shape from sharp corners to fully rounded buttons, setting visual styling that matches design requirements, and ensuring consistent button appearance with other UI components through standardized rounding options.
</div>

#### Example

    <form id="form">
        <input name="firstName" />
        <button id="smartPasteButton"></button>
    </form>

    <script>
    $("#smartPasteButton").kendoSmartPasteButton({
        rounded: "large",
        service: {
            url: "https://your-ai-service.com/api/parse"
        }
    });
    </script>

### size `String` *(default: "medium")*

Sets a value controlling the size of the SmartPasteButton. Valid values are `"small"`, `"medium"`, and `"large"`.

<div class="meta-api-description">
How do I change the size of a Kendo UI SmartPasteButton? Control the button's dimensions, padding, and overall visual scale by selecting from predefined size options, enabling customization of button proportions to fit different layouts, ensuring proper visual hierarchy, matching design specifications, and maintaining consistency with other form elements or UI components through standardized sizing options.
</div>

#### Example

    <form id="form">
        <input name="firstName" />
        <button id="smartPasteButton"></button>
    </form>

    <script>
    $("#smartPasteButton").kendoSmartPasteButton({
        size: "large",
        service: {
            url: "https://your-ai-service.com/api/parse"
        }
    });
    </script>

### text `String` *(default: null)*

Specifies the text displayed on the button. If not set, the button will display only an icon.

<div class="meta-api-description">
How do I set custom text on a Kendo UI SmartPasteButton? Configure the visible label or caption displayed on the smart paste button alongside or instead of icons, enabling customization of button text to provide clear user guidance, set descriptive labels that explain the paste functionality, configure multilingual support for button text, and ensure accessibility by providing text alternatives that describe the button's purpose and action to users.
</div>

#### Example

    <form id="form">
        <input name="firstName" />
        <button id="smartPasteButton"></button>
    </form>

    <script>
    $("#smartPasteButton").kendoSmartPasteButton({
        text: "Smart Paste",
        service: {
            url: "https://your-ai-service.com/api/parse"
        }
    });
    </script>

### formFields `Array` *(default: null)*

Specifies custom form field configurations for AI processing. If not provided, the button will automatically detect form fields.

<div class="meta-api-description">
How do I configure custom form field mappings for Kendo UI SmartPasteButton? Define specific form field configurations to control how the AI service processes and distributes pasted content, enabling customization of field detection, type specification, validation rules, and mapping logic for intelligent paste operations, ensuring accurate content distribution based on field semantics, data types, and business requirements rather than relying solely on automatic field detection.
</div>

#### formFields.field `String`

The name of the form field that corresponds to a form element.

#### formFields.type `String`

The expected data type of the form field.

#### formFields.description `String`

A description of the form field that helps the AI service understand its purpose.

#### formFields.allowedValues `Array`

An array of allowed values that restricts the AI service to only use specific values for this field.

#### Example

    <form id="form">
        <input name="firstName" />
        <input name="lastName" />
        <input name="email" />
        <select name="category">
            <option value="">Select category</option>
            <option value="business">Business</option>
            <option value="personal">Personal</option>
            <option value="urgent">Urgent</option>
        </select>
        <button id="smartPasteButton"></button>
    </form>

    <script>
    $("#smartPasteButton").kendoSmartPasteButton({
        formFields: [
            { field: "firstName", type: "string", description: "Person's first name" },
            { field: "lastName", type: "string", description: "Person's last name" },
            { field: "email", type: "email", description: "Email address" },
            { field: "category", type: "string", description: "Contact category", allowedValues: ["business", "personal", "urgent"] }
        ],
        service: {
            url: "https://your-ai-service.com/api/parse"
        }
    });
    </script>

### service `Object` *(default: null)*

The AI service configuration for processing pasted content.

<div class="meta-api-description">
How do I configure the AI service for Kendo UI SmartPasteButton? Set up the artificial intelligence service connection that processes clipboard content and generates intelligent field mappings, enabling configuration of AI endpoints, authentication, request formatting, and response handling for smart paste operations, ensuring secure and reliable integration with AI services that parse unstructured text and distribute it to appropriate form fields based on semantic understanding and field context.
</div>

#### Example

    <form id="form">
        <input name="firstName" />
        <input name="lastName" />
        <button id="smartPasteButton"></button>
    </form>

    <script>
    $("#smartPasteButton").kendoSmartPasteButton({
        service: {
            url: "https://your-ai-service.com/api/parse",
            headers: {
                "Authorization": "Bearer YOUR_API_KEY"
            }
        }
    });
    </script>

### service.url `String`

The URL of the AI service endpoint for processing paste operations.

<div class="meta-api-description">
How do I set the AI service URL for Kendo UI SmartPasteButton? Configure the endpoint address for the AI service that processes clipboard content and returns intelligent field mappings, enabling connection to remote AI APIs, setting the target server for content parsing, specifying the service location for smart paste operations, and directing requests to the appropriate AI processing endpoint for semantic text analysis and form field distribution.
</div>

#### Example

    <form id="form">
        <input name="firstName" />
        <button id="smartPasteButton"></button>
    </form>

    <script>
    $("#smartPasteButton").kendoSmartPasteButton({
        service: {
            url: "https://api.example.com/smart-paste"
        }
    });
    </script>

### service.headers `Object`

HTTP headers to include with AI service requests.

<div class="meta-api-description">
How do I add authentication headers to SmartPasteButton AI service requests? Configure custom HTTP headers for AI service communication including authorization tokens, API keys, content types, or other metadata required for secure and proper request handling, enabling authentication with AI services, setting custom headers for API requirements, configuring authorization for AI endpoints, and ensuring secure communication during smart paste operations.
</div>

#### Example

    <form id="form">
        <input name="firstName" />
        <button id="smartPasteButton"></button>
    </form>

    <script>
    $("#smartPasteButton").kendoSmartPasteButton({
        service: {
            url: "https://api.example.com/smart-paste",
            headers: {
                "Authorization": "Bearer YOUR_TOKEN",
                "Content-Type": "application/json"
            }
        }
    });
    </script>

### service.data `Object|Function`

Additional data to send with AI service requests.

<div class="meta-api-description">
How do I include custom data in SmartPasteButton AI requests? Add supplementary data, context, or parameters to AI service calls beyond the standard clipboard content and form fields, enabling inclusion of user preferences, application context, metadata, or custom configuration that helps the AI service better understand the parsing requirements and improve intelligent field mapping accuracy during paste operations.
</div>

#### Example - Static data

    <form id="form">
        <input name="firstName" />
        <button id="smartPasteButton"></button>
    </form>

    <script>
    $("#smartPasteButton").kendoSmartPasteButton({
        service: {
            url: "https://api.example.com/smart-paste",
            data: {
                locale: "en-US",
                context: "customer-form"
            }
        }
    });
    </script>

#### Example - Dynamic data

    <form id="form">
        <input name="firstName" />
        <button id="smartPasteButton"></button>
    </form>

    <script>
    $("#smartPasteButton").kendoSmartPasteButton({
        service: {
            url: "https://api.example.com/smart-paste",
            data: function() {
                return {
                    timestamp: new Date().toISOString(),
                    userId: getCurrentUserId()
                };
            }
        }
    });
    </script>

## Methods

### setOptions

Updates the configuration options of the SmartPasteButton.

#### Parameters

##### options `Object`

The new configuration options to apply.

#### Example

    <form id="form">
        <input name="firstName" />
        <button id="smartPasteButton"></button>
    </form>

    <script>
    var smartPasteButton = $("#smartPasteButton").kendoSmartPasteButton({
        service: {
            url: "https://api.example.com/smart-paste"
        }
    }).data("kendoSmartPasteButton");

    smartPasteButton.setOptions({
        text: "Updated Text",
        size: "large"
    });
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes data associated with the widget.

#### Example

    <form id="form">
        <input name="firstName" />
        <button id="smartPasteButton"></button>
    </form>

    <script>
    var smartPasteButton = $("#smartPasteButton").kendoSmartPasteButton({
        service: {
            url: "https://api.example.com/smart-paste"
        }
    }).data("kendoSmartPasteButton");

    smartPasteButton.destroy();
    </script>

## Events

### requestStart

Fired when the SmartPasteButton begins processing a paste operation.

#### Event Data

##### e.sender `kendo.ui.SmartPasteButton`

The widget instance which fired the event.

##### e.formFields `Array`

The form fields configuration being sent to the AI service.

##### e.content `String`

The clipboard content being processed.

#### Example - subscribe to the "requestStart" event during initialization

    <form id="form">
        <input name="firstName" />
        <button id="smartPasteButton"></button>
    </form>

    <script>
    $("#smartPasteButton").kendoSmartPasteButton({
        service: {
            url: "https://api.example.com/smart-paste"
        },
        requestStart: function(e) {
            console.log("Processing started for content:", e.content);
        }
    });
    </script>

#### Example - subscribe to the "requestStart" event after initialization

    <form id="form">
        <input name="firstName" />
        <button id="smartPasteButton"></button>
    </form>

    <script>
    function onRequestStart(e) {
        console.log("Processing started");
    }

    $("#smartPasteButton").kendoSmartPasteButton({
        service: {
            url: "https://api.example.com/smart-paste"
        }
    });

    var smartPasteButton = $("#smartPasteButton").data("kendoSmartPasteButton");
    smartPasteButton.bind("requestStart", onRequestStart);
    </script>

### requestEnd

Fired when the SmartPasteButton completes processing a paste operation.

#### Event Data

##### e.sender `kendo.ui.SmartPasteButton`

The widget instance which fired the event.

##### e.fieldValues `Object`

The processed field values returned by the AI service.

#### Example - subscribe to the "requestEnd" event during initialization

    <form id="form">
        <input name="firstName" />
        <button id="smartPasteButton"></button>
    </form>

    <script>
    $("#smartPasteButton").kendoSmartPasteButton({
        service: {
            url: "https://api.example.com/smart-paste"
        },
        requestEnd: function(e) {
            console.log("Processing completed with values:", e.fieldValues);
        }
    });
    </script>

#### Example - subscribe to the "requestEnd" event after initialization

    <form id="form">
        <input name="firstName" />
        <button id="smartPasteButton"></button>
    </form>

    <script>
    function onRequestEnd(e) {
        console.log("Processing completed");
    }

    $("#smartPasteButton").kendoSmartPasteButton({
        service: {
            url: "https://api.example.com/smart-paste"
        }
    });

    var smartPasteButton = $("#smartPasteButton").data("kendoSmartPasteButton");
    smartPasteButton.bind("requestEnd", onRequestEnd);
    </script>

### error

Fired when an error occurs during SmartPasteButton processing.

#### Event Data

##### e.sender `kendo.ui.SmartPasteButton`

The widget instance which fired the event.

##### e.error `String`

The error message describing what went wrong.

#### Example - subscribe to the "error" event during initialization

    <form id="form">
        <input name="firstName" />
        <button id="smartPasteButton"></button>
    </form>

    <script>
    $("#smartPasteButton").kendoSmartPasteButton({
        service: {
            url: "https://your-ai-service.com/api/parse"
        },
        error: function(e) {
            console.log("Error occurred: " + e.error);
        }
    });
    </script>

#### Example - subscribe to the "error" event after initialization

    <form id="form">
        <input name="firstName" />
        <button id="smartPasteButton"></button>
    </form>

    <script>
    function onError(e) {
        alert("Processing failed: " + e.error);
    }

    $("#smartPasteButton").kendoSmartPasteButton({
        service: {
            url: "https://your-ai-service.com/api/parse"
        }
    });

    var smartPasteButton = $("#smartPasteButton").data("kendoSmartPasteButton");
    smartPasteButton.bind("error", onError);
    </script>