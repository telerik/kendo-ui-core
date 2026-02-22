---
title: Keyboard Navigation  
page_title: jQuery SmartPasteButton Documentation - Keyboard Navigation
description: "Get started with the jQuery SmartPasteButton by Kendo UI and learn about the accessibility support it provides through its keyboard navigation functionality."
components: ["smartpastebutton"]
slug: keynav_smartpastebutton
position: 7
---

# Keyboard Navigation

The keyboard navigation of the SmartPasteButton is always available and provides convenient shortcuts for users to trigger AI-powered paste operations without using the mouse.

## Default Keyboard Shortcuts

The SmartPasteButton supports standard keyboard navigation patterns:

* **Tab** - Moves focus to the SmartPasteButton
* **Enter** or **Space** - Activates the SmartPasteButton and triggers the paste operation
* **Shift+Tab** - Moves focus to the previous focusable element

## Custom Keyboard Shortcuts

You can implement custom keyboard shortcuts to provide alternative ways to access the SmartPasteButton functionality. A common pattern is to use the **Alt+W** combination:

```html
<div id="smartPasteContainer">
    <form id="responsiveForm"></form>
</div>

<script>
    $(document).ready(function () {
        $("#responsiveForm").kendoForm({
            orientation: "vertical",
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
                    field: "StreetAddress",
                    label: "Address",
                    editor: "TextBox",
                    editorOptions: {
                        placeholder: "e.g. 123 Main Street"
                    }
                }
            ],
            smartPaste: {
                text: "Smart Paste",
                service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste"
            }
        });

        // Custom keyboard shortcut: Alt+W to focus SmartPasteButton
        $(document).keydown(function (e) {
            if (e.altKey && e.keyCode === 87) { // Alt + W
                $(".k-smart-paste-button").focus();
            }
        });
    });
</script>
```

## Focus Management

The SmartPasteButton integrates seamlessly with form focus flow:

```javascript
// Programmatically focus the SmartPasteButton
$(".k-smart-paste-button").focus();

// Handle focus events
$(".k-smart-paste-button").on("focus", function() {
    console.log("SmartPasteButton received focus");
});

$(".k-smart-paste-button").on("blur", function() {
    console.log("SmartPasteButton lost focus");  
});
```

## Accessibility Best Practices

When implementing keyboard navigation for the SmartPasteButton:

1. **Provide clear visual focus indicators** - Ensure the focused SmartPasteButton is clearly visible
2. **Use logical tab order** - Position the SmartPasteButton appropriately in the form's tab sequence
3. **Implement custom shortcuts carefully** - Document any custom keyboard shortcuts for users
4. **Test with screen readers** - Verify that the SmartPasteButton announces its purpose and state correctly

## Screen Reader Support

The SmartPasteButton provides appropriate ARIA attributes for screen reader compatibility:

```html
<!-- The SmartPasteButton renders with accessibility attributes -->
<button class="k-smart-paste-button" 
        role="button" 
        aria-disabled="false" 
        tabindex="0">
    Smart Paste
</button>
```

For a complete example, refer to the [demo on keyboard navigation of the SmartPasteButton](https://demos.telerik.com/kendo-ui/smartpastebutton/keyboard-navigation).

## See Also

* [Keyboard Navigation by the SmartPasteButton (Demo)](https://demos.telerik.com/kendo-ui/smartpastebutton/keyboard-navigation)
* [Events]({% slug events_kendoui_smartpastebutton_widget %})
* [Overview]({% slug overview_kendoui_smartpastebutton_widget %})
* [Keyboard Support in Kendo UI for jQuery]({% slug overview_accessibility_support_kendoui %}#keyboard-navigation)
* [JavaScript API Reference of the SmartPasteButton](/api/javascript/ui/smartpastebutton)
* [Knowledge Base Section](/knowledge-base)