---
title: Tools
page_title: jQuery PromptBox Documentation - Tools
description: "Learn how to configure different tools for the Kendo UI for jQuery PromptBox component."
slug: tools_kendoui_promptbox
position: 2
components: ["promptbox"]
---

# PromptBox Tools

The PromptBox provides several built-in tools that enhance functionality and user experience.

These tools include the Action Button for submitting prompts, the File Select Button for attaching files, and the Speech-to-Text Button for voice input. In case you need additional tools, refer to the [PromptBox Adornments]({% slug adornments_kendoui_promptbox %}) article.

## Action Button

The action button submits the prompt. Customize its [appearance]({% slug appearance_kendoui_promptbox %}) and behavior by setting the [`actionButton`](/api/javascript/ui/promptbox/configuration/actionbutton) option.

The button supports loading state for better user feedback during prompt submission and icon customizations for each state.

```javascript
    $("#promptbox").kendoPromptBox({
        actionButton: {
            icon: "sparkles",
            fillMode: "flat"
        }
    });
```

## Speech-to-Text Button

The speech-to-text button enables you to input prompts with voice commands. Customize its [appearance]({% slug appearance_kendoui_promptbox %}) and behavior by setting the [`speechToTextButton`](/api/javascript/ui/promptbox/configuration/speechtotextbutton) option to a configuration object. The button provides visual feedback during the speech recognition process.

```javascript
    $("#promptbox").kendoPromptBox({
        speechToTextButton: {
            enable: true
        }
    });
```

## File Select Button

The file select button allows you to attach files to prompts. Customize its [appearance]({% slug appearance_kendoui_promptbox %}), behavior and file restrictions by setting the [`fileSelectButton`](/api/javascript/ui/promptbox/configuration/fileselectbutton) option.

To enable file attachments in the PromptBox, set the [`fileSelectButton`](/api/javascript/ui/promptbox/configuration/fileselectbutton) option to `true` or use a configuration object for further customization.

```javascript
    $("#promptbox").kendoPromptBox({
        fileSelectButton: {
            multiple: true,
            restrictions: {
                 allowedExtensions: [".jpg", ".png"]
            }
        }
    });
```

### Attaching Multiple Files

You can allow users to attach multiple files by setting the `multiple` option of the `fileSelectButton` configuration.

```javascript
    $("#promptbox").kendoPromptBox({
        fileSelectButton: {
            multiple: true
        }
    });
```

### File Size Restrictions

You can restrict the maximum file size for attachments by setting the `maxFileSize` option of the `fileSelectButton.restrictions` configuration.

```javascript
    $("#promptbox").kendoPromptBox({
        fileSelectButton: {
            restrictions: {
                maxFileSize: 1048576
            }
        }
    });
```

### File Type Restrictions

You can restrict the allowed file types for attachments by setting the `allowedExtensions` option of the `fileSelectButton.restrictions` configuration.

```javascript
    $("#promptbox").kendoPromptBox({
        fileSelectButton: {
             restrictions: {
                allowedExtensions: [".png", ".jpg", ".jpeg"]
             }
        }
    });
```

## See Also

* [PromptBox Adornments]({% slug adornments_kendoui_promptbox %})
* [JavaScript API Reference of the PromptBox](/api/javascript/ui/promptbox)
