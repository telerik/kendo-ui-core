---
title: Appearance and Icons
page_title: jQuery SmartPasteButton Documentation - Appearance and Icons
description: "Learn how to customize the appearance and icons of the Kendo UI for jQuery SmartPasteButton including size, border radius, fill mode, theme color, and icon configuration."
components: ["smartpastebutton"]
slug: appearance_kendoui_smartpastebutton_widget
position: 4
---

# Appearance and Icons

The SmartPasteButton provides built-in styling options and icon customization to match your application design.

## Size

The SmartPasteButton supports different sizes through the `size` option:

```html
<button id="smartPasteButton" type="button">Smart Paste</button>

<script>
$("#smartPasteButton").kendoSmartPasteButton({
    size: "small",
    service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste"
});
</script>
```

The available size values are:
* `"small"`
* `"medium"` (default)
* `"large"`

### Size Example

```html
<button id="smallButton" type="button">Small Smart Paste</button>
<button id="mediumButton" type="button">Medium Smart Paste</button>
<button id="largeButton" type="button">Large Smart Paste</button>

<script>
$("#smallButton").kendoSmartPasteButton({
    size: "small",
    service: { url: "https://your-ai-service.com/api/smartpaste" }
});

$("#mediumButton").kendoSmartPasteButton({
    size: "medium",
    service: { url: "https://your-ai-service.com/api/smartpaste" }
});

$("#largeButton").kendoSmartPasteButton({
    size: "large",
    service: { url: "https://your-ai-service.com/api/smartpaste" }
});
</script>
```

## Border Radius

Customize the border radius using the `rounded` option:

```javascript
$("#smartPasteButton").kendoSmartPasteButton({
    rounded: "medium",
    service: {
        url: "https://your-ai-service.com/api/smartpaste"
    }
});
```

The available rounded values are:
* `"small"`
* `"medium"` (default)
* `"large"`
* `"full"`

### Border Radius Example

```html
<button id="roundedSmall" type="button">Small Rounded</button>
<button id="roundedMedium" type="button">Medium Rounded</button>
<button id="roundedLarge" type="button">Large Rounded</button>
<button id="roundedFull" type="button">Full Rounded</button>

<script>
$("#roundedSmall").kendoSmartPasteButton({
    rounded: "small",
    service: { url: "https://your-ai-service.com/api/smartpaste" }
});

$("#roundedMedium").kendoSmartPasteButton({
    rounded: "medium", 
    service: { url: "https://your-ai-service.com/api/smartpaste" }
});

$("#roundedLarge").kendoSmartPasteButton({
    rounded: "large",
    service: { url: "https://your-ai-service.com/api/smartpaste" }
});

$("#roundedFull").kendoSmartPasteButton({
    rounded: "full",
    service: { url: "https://your-ai-service.com/api/smartpaste" }
});
</script>
```

## Fill Mode

Control the button's fill mode using the `fillMode` option:

```javascript
$("#smartPasteButton").kendoSmartPasteButton({
    fillMode: "solid",
    service: {
        url: "https://your-ai-service.com/api/smartpaste"
    }
});
```

The available fillMode values are:
* `"solid"` (default)
* `"outline"`
* `"flat"`

### Fill Mode Example

```html
<button id="solidButton" type="button">Solid Fill</button>
<button id="outlineButton" type="button">Outline Fill</button>
<button id="flatButton" type="button">Flat Fill</button>

<script>
$("#solidButton").kendoSmartPasteButton({
    fillMode: "solid",
    service: { url: "https://your-ai-service.com/api/smartpaste" }
});

$("#outlineButton").kendoSmartPasteButton({
    fillMode: "outline",
    service: { url: "https://your-ai-service.com/api/smartpaste" }
});

$("#flatButton").kendoSmartPasteButton({
    fillMode: "flat",
    service: { url: "https://your-ai-service.com/api/smartpaste" }
});
</script>
```

## Theme Color

Apply theme colors using the `themeColor` option:

```javascript
$("#smartPasteButton").kendoSmartPasteButton({
    themeColor: "primary",
    service: {
        url: "https://your-ai-service.com/api/smartpaste"
    }
});
```

The available themeColor values are:
* `"base"`
* `"primary"` (default)
* `"secondary"`
* `"tertiary"`
* `"info"`
* `"success"`
* `"warning"`
* `"error"`
* `"dark"`
* `"light"`
* `"inverse"`

### Theme Color Example

```html
<button id="primaryButton" type="button">Primary</button>
<button id="secondaryButton" type="button">Secondary</button>
<button id="successButton" type="button">Success</button>
<button id="warningButton" type="button">Warning</button>
<button id="errorButton" type="button">Error</button>

<script>
$("#primaryButton").kendoSmartPasteButton({
    themeColor: "primary",
    service: { url: "https://your-ai-service.com/api/smartpaste" }
});

$("#secondaryButton").kendoSmartPasteButton({
    themeColor: "secondary",
    service: { url: "https://your-ai-service.com/api/smartpaste" }
});

$("#successButton").kendoSmartPasteButton({
    themeColor: "success",
    service: { url: "https://your-ai-service.com/api/smartpaste" }
});

$("#warningButton").kendoSmartPasteButton({
    themeColor: "warning",
    service: { url: "https://your-ai-service.com/api/smartpaste" }
});

$("#errorButton").kendoSmartPasteButton({
    themeColor: "error",
    service: { url: "https://your-ai-service.com/api/smartpaste" }
});
</script>
```

## Combined Styling

You can combine multiple appearance options for comprehensive styling:

```javascript
$("#smartPasteButton").kendoSmartPasteButton({
    size: "large",
    rounded: "medium",
    fillMode: "solid",
    themeColor: "primary",
    service: {
        url: "https://your-ai-service.com/api/smartpaste"
    }
});
```

## Custom CSS

For additional customization beyond the built-in options, you can apply custom CSS:

```html
<style>
.custom-smart-paste {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    font-weight: bold;
    transition: transform 0.2s ease;
}

.custom-smart-paste:hover {
    transform: translateY(-1px);
}

.custom-smart-paste.k-state-processing {
    background-color: #f0f0f0;
    opacity: 0.7;
}
</style>

<button id="customButton" type="button" class="custom-smart-paste">
    Custom Smart Paste
</button>

<script>
$("#customButton").kendoSmartPasteButton({
    size: "medium",
    rounded: "medium", 
    fillMode: "solid",
    themeColor: "primary",
    service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste"
});
</script>
```

## Icons

The SmartPasteButton displays icons to provide visual context for its functionality. You can customize both the default icon and the cancel icon that appears during processing.

### Default Icon

The SmartPasteButton uses the `paste-sparkle` icon by default. You can customize this using the `icon` option:

```html
<button id="smartPasteButton" type="button">Smart Paste</button>

<script>
$("#smartPasteButton").kendoSmartPasteButton({
    icon: "paste-sparkle",
    service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste"
});
</script>
```

### Cancel Icon

The cancel icon appears when the SmartPasteButton is in processing state, allowing users to cancel the operation. Customize it using the `cancelIcon` option:

```javascript
$("#smartPasteButton").kendoSmartPasteButton({
    icon: "paste-sparkle",
    cancelIcon: "x", // Default cancel icon
    service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste"
});
```

### Built-in Icon Options

```html
<button id="button1" type="button">Paste Sparkle</button>
<button id="button2" type="button">Paste</button>
<button id="button3" type="button">Magic Wand</button>

<script>
$("#button1").kendoSmartPasteButton({
    icon: "paste-sparkle",
    service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste"
});

$("#button2").kendoSmartPasteButton({
    icon: "paste",
    service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste"
});

$("#button3").kendoSmartPasteButton({
    icon: "magic-wand",
    service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste"
});
</script>
```

### Icon with Text

You can combine icons with text labels:

```html
<button id="iconTextButton" type="button">Smart Paste</button>

<script>
$("#iconTextButton").kendoSmartPasteButton({
    icon: "paste-sparkle",
    text: "Smart Paste",
    service: "https://demos.telerik.com/service/v2/ai/smartpaste/smartpaste"
});
</script>
```

## See Also

* [Appearance of the SmartPasteButton (Demo)](https://demos.telerik.com/kendo-ui/smartpastebutton/appearance)
* [Getting Started with the SmartPasteButton]({% slug getting_started_kendoui_smartpastebutton_widget %})
* [SmartPasteButton Events]({% slug events_kendoui_smartpastebutton_widget %})
* [JavaScript API Reference of the SmartPasteButton](/api/javascript/ui/smartpastebutton)
* [Knowledge Base Section](/knowledge-base)