---
title: Events
page_title: jQuery SmartPasteButton Documentation - Events
description: "Learn how to handle the events of the Kendo UI for jQuery SmartPasteButton and monitor AI request lifecycle and error handling."
components: ["smartpastebutton"]
slug: events_kendoui_smartpastebutton_widget
position: 5
---

# Events

The SmartPasteButton exposes events that allow you to monitor the AI request lifecycle and handle errors.

## Handling Events

You can subscribe to events during initialization or after the component is created:

```javascript
// During initialization
$("#smartPasteButton").kendoSmartPasteButton({
    service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste",
    requestStart: function(e) {
        console.log("Processing started for content:", e.content);
    },
    requestEnd: function(e) {
        console.log("Processing completed with values:", e.fieldValues);
    },
    error: function(e) {
        console.log("Error occurred: " + e.error);
    }
});

// After initialization
var smartPasteButton = $("#smartPasteButton").data("kendoSmartPasteButton");
smartPasteButton.bind("requestStart", function(e) {
    console.log("Request started via bind");
});
```

## Available Events

### requestStart

Fires when the SmartPasteButton begins processing a paste operation. Use this event to show loading indicators or disable UI elements.

```html
<form id="customerForm">
    <div id="loadingIndicator" style="display: none;">Processing...</div>
    <div>
        <label for="firstName">First Name:</label>
        <input id="firstName" name="firstName" type="text" />
    </div>
    <div>
        <label for="lastName">Last Name:</label>
        <input id="lastName" name="lastName" type="text" />
    </div>
    <button id="smartPasteButton" type="button">Smart Paste</button>
</form>

<script>
$("#smartPasteButton").kendoSmartPasteButton({
    service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste",
    requestStart: function(e) {
        console.log("Processing started for content:", e.content);
        console.log("Form fields being processed:", e.formFields);
        
        // Show loading indicator
        $("#loadingIndicator").show();
        
        // Disable form inputs during processing
        $("#customerForm input").prop("disabled", true);
        
        // Update button text
        this.element.text("Processing...");
    }
});
</script>
```

#### Event Data

- `e.sender` - The SmartPasteButton widget instance
- `e.formFields` - Array of form fields configuration being sent to the AI service
- `e.content` - The clipboard content being processed

### requestEnd

Fires when the SmartPasteButton completes processing a paste operation. Use this event to hide loading indicators and re-enable UI elements.

```javascript
$("#smartPasteButton").kendoSmartPasteButton({
    service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste",
    requestEnd: function(e) {
        console.log("Processing completed with values:", e.fieldValues);
        
        // Hide loading indicator
        $("#loadingIndicator").hide();
        
        // Re-enable form inputs
        $("#customerForm input").prop("disabled", false);
        
        // Reset button text
        this.element.text("Smart Paste");
        
        // Show success message
        $("#successMessage").text("Form filled successfully!").fadeIn();
    }
});
```

#### Event Data

- `e.sender` - The SmartPasteButton widget instance
- `e.fieldValues` - Object containing the processed field values returned by the AI service

```javascript
requestEnd: function(e) {
    // e.fieldValues contains the field values returned by the AI service
    console.log("Populated fields:", e.fieldValues);
    
    // Example fieldValues structure:
    // {
    //   "firstName": "John",
    //   "lastName": "Smith", 
    //   "email": "john.smith@example.com"
    // }
}
```

### error

Fires when an error occurs during SmartPasteButton processing. Use this event to handle and display error messages to users.

#### Event Data

- `e.sender` - The SmartPasteButton widget instance
- `e.error` - String containing the error message describing what went wrong

```javascript
$("#smartPasteButton").kendoSmartPasteButton({
    service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste",
    error: function(e) {
        console.error("SmartPasteButton error:", e.error);
        
        // Hide loading indicator
        $("#loadingIndicator").hide();
        
        // Re-enable form inputs
        $("#customerForm input").prop("disabled", false);
        
        // Reset button text
        this.element.text("Smart Paste");
        
        // Show user-friendly error message
        var errorMessage = "Failed to process clipboard content. Please try again.";
        if (e.error.includes("service")) {
            errorMessage = "AI service is temporarily unavailable. Please try again later.";
        }
        
        $("#errorMessage").text(errorMessage).fadeIn();
        
        // Auto-hide error after 5 seconds
        setTimeout(function() {
            $("#errorMessage").fadeOut();
        }, 5000);
    }
});
```

## Complete Example with All Events

```html
<form id="customerForm">
    <div id="loadingIndicator" style="display: none;">
        Processing clipboard content...
    </div>
    <div id="successMessage" style="display: none; color: green;"></div>
    <div id="errorMessage" style="display: none; color: red;"></div>
    
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
    <button id="smartPasteButton" type="button">Smart Paste</button>
</form>

<script>
$("#smartPasteButton").kendoSmartPasteButton({
    service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste",
    requestStart: function(e) {
        console.log("Processing started for content:", e.content);
        $("#loadingIndicator").show();
        $("#customerForm input").prop("disabled", true);
        this.element.text("Cancel");
    },
    requestEnd: function(e) {
        console.log("AI request completed", e.fieldValues);
        $("#loadingIndicator").hide();
        $("#customerForm input").prop("disabled", false);
        this.element.text("Smart Paste");
        $("#successMessage").text("Form filled successfully!").fadeIn();
    },
    error: function(e) {
        console.error("SmartPasteButton error:", e.error);
        $("#loadingIndicator").hide();
        $("#customerForm input").prop("disabled", false);
        this.element.text("Smart Paste");
        $("#errorMessage").text("Failed to process clipboard content: " + e.error).fadeIn();
    }
});
</script>
```

## See Also

* [Events of the SmartPasteButton (Demo)](https://demos.telerik.com/kendo-ui/smartpastebutton/events)
* [AI Service Integration]({% slug ai_service_integration_kendoui_smartpastebutton_widget %})
* [Getting Started with the SmartPasteButton]({% slug getting_started_kendoui_smartpastebutton_widget %})
* [JavaScript API Reference of the SmartPasteButton](/api/javascript/ui/smartpastebutton)
* [Knowledge Base Section](/knowledge-base)