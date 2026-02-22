---
title: PromptBox
page_title: Configuration, methods and events of Kendo UI PromptBox
description: Get started with code examples for the jQuery PromptBox by Kendo UI and learn how to use methods and which events to set once the widget is initialized.
res_type: api
component: promptbox
---

# kendo.ui.PromptBox

Represents the Kendo UI PromptBox component. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### actionButton `Object` _(default: null)_

Configures the **Action** button (send/stop) in the end affix. The button is always visible. When null or not configured, the button is enabled by default. Use `{ enable: false }` to disable it.

<div class="meta-api-description">
How do I configure the Action button in Kendo UI PromptBox? Configure the behavior of the Action button in the PromptBox component, enabling users to submit prompts or stop ongoing generation. Configure button appearance settings like size, fill mode, rounded corners, theme color, and custom icons for both send and loading states. Disable the button by setting enable to false.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        actionButton: {
            enable: true
        },
        placeholder: "Ask a question..."
    });
    </script>

#### Example - Customizing the action button

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        actionButton: {
            size: "large",
            rounded: "full",
            themeColor: "primary"
        },
        placeholder: "Type your message..."
    });
    </script>

### actionButton.enable `Boolean` _(default: true)_

Enables or disables the Action button.

<div class="meta-api-description">
How do I disable the Action button in Kendo UI PromptBox? Set enable to false to disable the Action button and prevent users from submitting prompts or stopping generation. This is useful when you want to control when users can interact with the button programmatically.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        actionButton: {
            enable: false
        },
        placeholder: "Action button is disabled..."
    });
    </script>

### actionButton.fillMode `String`

Defines the fill mode for the Action button.

<div class="meta-api-description">
How do I change the fill style of the Action button in Kendo UI PromptBox? Set the fill mode to customize the background appearance of the Action button. Available options typically include solid, flat, outline, and link fill modes.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        actionButton: {
            fillMode: "flat"
        },
        placeholder: "Flat fill mode..."
    });
    </script>

### actionButton.icon `String`

Defines the font icon name for the send state.

<div class="meta-api-description">
How do I customize the send icon in Kendo UI PromptBox Action button? Set a custom font icon to display on the Action button when in the normal (send) state. Use icon names from the Kendo UI icon library.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        actionButton: {
            icon: "paper-plane"
        },
        placeholder: "Custom send icon..."
    });
    </script>

### actionButton.loadingIcon `String`

Defines the font icon name for the loading/stop state.

<div class="meta-api-description">
How do I customize the loading/stop icon in Kendo UI PromptBox? Set a custom font icon to display on the Action button when in the loading state. This icon indicates that generation can be stopped.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        actionButton: {
            loadingIcon: "stop"
        },
        placeholder: "Custom loading icon..."
    });
    </script>

### actionButton.rounded `String`

Defines the border radius for the Action button.

<div class="meta-api-description">
How do I change the border radius of the Action button in Kendo UI PromptBox? Set the rounded option to control the corner radius of the Action button. Available options include small, medium, large, full, and none.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        actionButton: {
            rounded: "full"
        },
        placeholder: "Fully rounded button..."
    });
    </script>

### actionButton.size `String`

Defines the size of the Action button.

<div class="meta-api-description">
How do I change the size of the Action button in Kendo UI PromptBox? Set the size option to control the dimensions of the Action button. Available options include small, medium, large, and none.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        actionButton: {
            size: "large"
        },
        placeholder: "Large action button..."
    });
    </script>

### actionButton.themeColor `String`

Defines the theme color for the Action button.

<div class="meta-api-description">
How do I change the color of the Action button in Kendo UI PromptBox? Set the themeColor option to apply a predefined color scheme to the Action button. Available options include primary, secondary, tertiary, info, success, warning, error, dark, and light.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        actionButton: {
            themeColor: "primary"
        },
        placeholder: "Primary colored button..."
    });
    </script>

### enable `Boolean` _(default: true)_

If set to `false`, the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.

<div class="meta-api-description">
How do I disable the Kendo UI PromptBox? Set the enable option to false to prevent user interaction with the PromptBox, including typing, file selection, speech recognition, and action button clicks. The disabled state applies to all interactive elements within the component.
</div>

#### Example - disable the widget

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        enable: false,
        placeholder: "This PromptBox is disabled..."
    });
    </script>

### endAffixTemplate `Function`

Defines a custom template for the end affix area. The end affix is positioned after the input field and typically contains action buttons.

<div class="meta-api-description">
How do I add custom content to the end of Kendo UI PromptBox? Use the endAffixTemplate to add custom HTML content or components to the end affix area, which appears after the input field. This allows you to add custom buttons, icons, or other interactive elements alongside the default action buttons.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        endAffixTemplate: () => '<button class="k-button k-button-flat">Custom</button>',
        placeholder: "With custom end affix..."
    });
    </script>

### fileSelectButton `Boolean|Object` _(default: false)_

Controls the visibility and configuration of the **File Select** button in the end affix. When enabled, users can attach files to their prompts.

<div class="meta-api-description">
How do I enable file attachments in Kendo UI PromptBox? Set the fileSelectButton option to true or provide an object with detailed settings to allow users to attach files to their prompts. Configure file restrictions, accept types, multiple file selection, and button appearance settings.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        fileSelectButton: true,
        placeholder: "Attach files...",
        fileSelect: function(e) {
            console.log("Files selected:", e.files);
        }
    });
    </script>

#### Example - File select with restrictions

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        fileSelectButton: {
            multiple: true,
            accept: "image/*",
            restrictions: {
                allowedExtensions: [".jpg", ".png", ".gif"],
                maxFileSize: 5242880
            }
        },
        placeholder: "Attach images (max 5MB)..."
    });
    </script>

### fileSelectButton.accept `String`

Defines the file types that can be selected using the file input.

<div class="meta-api-description">
How do I restrict file types in Kendo UI PromptBox file selection? Set the accept option to define which file types are allowed in the file selection dialog. Use MIME types like "image/*" or specific extensions.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        fileSelectButton: {
            accept: "image/*"
        },
        placeholder: "Select images only..."
    });
    </script>

### fileSelectButton.enable `Boolean` _(default: true)_

Enables or disables the File Select button.

<div class="meta-api-description">
How do I disable file selection in Kendo UI PromptBox? Set the enable option to false to disable file selection while keeping the button visible.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        fileSelectButton: {
            enable: false
        },
        placeholder: "File selection disabled..."
    });
    </script>

### fileSelectButton.multiple `Boolean` _(default: false)_

Enables multiple file selection.

<div class="meta-api-description">
How do I allow multiple file selection in Kendo UI PromptBox? Set the multiple option to true to allow users to select and attach multiple files at once.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        fileSelectButton: {
            multiple: true
        },
        placeholder: "Select multiple files..."
    });
    </script>

### fileSelectButton.restrictions `Object`

Defines file restrictions for the file selection.

<div class="meta-api-description">
How do I set file restrictions in Kendo UI PromptBox? Use the restrictions object to define allowed file extensions, maximum file size, and other validation rules for file attachments.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        fileSelectButton: {
            restrictions: {
                allowedExtensions: [".pdf", ".doc", ".docx"],
                maxFileSize: 10485760
            }
        },
        placeholder: "Select documents..."
    });
    </script>

### fileSelectButton.restrictions.allowedExtensions `Array`

Defines the allowed file extensions.

<div class="meta-api-description">
How do I limit file extensions in Kendo UI PromptBox? Set the allowedExtensions array to define which file types users can attach based on file extension.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        fileSelectButton: {
            restrictions: {
                allowedExtensions: [".jpg", ".jpeg", ".png"]
            }
        },
        placeholder: "Select images..."
    });
    </script>

### fileSelectButton.restrictions.maxFileSize `Number`

Defines the maximum file size in bytes.

<div class="meta-api-description">
How do I limit file size in Kendo UI PromptBox? Set the maxFileSize value to define the maximum allowed file size in bytes. Files exceeding this limit will be rejected during validation.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        fileSelectButton: {
            restrictions: {
                maxFileSize: 5242880
            }
        },
        placeholder: "Max file size: 5MB..."
    });
    </script>

### fileSelectButton.fillMode `String`

Defines the fill mode for the File Select button.

<div class="meta-api-description">
How do I change the fill style of the File Select button in Kendo UI PromptBox? Set the fillMode option to customize the background appearance of the button. Available options typically include solid, flat, outline, and link fill modes.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        fileSelectButton: {
            fillMode: "flat"
        },
        placeholder: "Flat file select button..."
    });
    </script>

### fileSelectButton.icon `String`

Defines the font icon name for the File Select button.

<div class="meta-api-description">
How do I customize the icon of the File Select button in Kendo UI PromptBox? Set the icon option to display a custom font icon on the button. Use icon names from the Kendo UI icon library.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        fileSelectButton: {
            icon: "folder-open"
        },
        placeholder: "Custom file icon..."
    });
    </script>

### fileSelectButton.rounded `String`

Defines the border radius for the File Select button.

<div class="meta-api-description">
How do I change the border radius of the File Select button in Kendo UI PromptBox? Set the rounded option to control the corner radius of the button. Available options include small, medium, large, full, and none.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        fileSelectButton: {
            rounded: "full"
        },
        placeholder: "Fully rounded file button..."
    });
    </script>

### fileSelectButton.size `String`

Defines the size of the File Select button.

<div class="meta-api-description">
How do I change the size of the File Select button in Kendo UI PromptBox? Set the size option to control the dimensions of the button. Available options include small, medium, large, and none.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        fileSelectButton: {
            size: "large"
        },
        placeholder: "Large file button..."
    });
    </script>

### fileSelectButton.themeColor `String`

Defines the theme color for the File Select button.

<div class="meta-api-description">
How do I change the color of the File Select button in Kendo UI PromptBox? Set the themeColor option to apply a predefined color scheme to the button. Available options include primary, secondary, tertiary, info, success, warning, error, dark, and light.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        fileSelectButton: {
            themeColor: "primary"
        },
        placeholder: "Primary colored file button..."
    });
    </script>

### fillMode `String`

Defines the fill mode for the PromptBox container.

<div class="meta-api-description">
How do I change the fill style of Kendo UI PromptBox? Set the fillMode option to customize the background appearance of the PromptBox container. Available options include solid, flat, outline, and none.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        fillMode: "outline",
        placeholder: "Outlined PromptBox..."
    });
    </script>

### loading `Boolean` _(default: false)_

Sets the loading state of the Action button. When true, the button displays a stop icon and allows users to cancel ongoing generation.

<div class="meta-api-description">
How do I show loading state in Kendo UI PromptBox? Set the loading option to true to indicate that generation is in progress. This changes the Action button icon to a stop icon, allowing users to cancel the operation.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    var promptbox = $("#promptbox").kendoPromptBox({
        placeholder: "Generating response...",
        loading: true
    }).data("kendoPromptBox");

    setTimeout(function() {
        promptbox.loading(false);
    }, 3000);
    </script>

### maxTextAreaHeight `Number`

Sets the maximum height of the textarea in pixels. The textarea resizes automatically until it reaches this height. When the content exceeds this height, a scrollbar appears.

<div class="meta-api-description">
How do I limit the height of Kendo UI PromptBox textarea? Set the maxTextAreaHeight option to define the maximum pixel height for the auto-expanding textarea. When content exceeds this height, a scrollbar appears instead of further expansion.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        mode: "auto",
        maxTextAreaHeight: 200,
        placeholder: "Textarea will not exceed 200px..."
    });
    </script>

### messages `Object`

Defines the localization messages for the PromptBox.

<div class="meta-api-description">
How do I localize Kendo UI PromptBox? Use the messages object to customize or translate the text displayed in the PromptBox, including button tooltips, aria labels, and placeholder text.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        messages: {
            placeholder: "Escribe tu mensaje...",
            actionButton: "Enviar",
            actionButtonLoading: "Detener"
        }
    });
    </script>

### messages.placeholder `String` _(default: "")_

Sets the placeholder text for the input field.

<div class="meta-api-description">
How do I set placeholder text in Kendo UI PromptBox messages? Use the messages.placeholder to define the hint text displayed when the input is empty.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        messages: {
            placeholder: "Type your question here..."
        }
    });
    </script>

### messages.actionButton `String` _(default: "Send")_

Sets the tooltip and aria-label for the send button.

<div class="meta-api-description">
How do I change the send button tooltip in Kendo UI PromptBox? Use the messages.actionButton to customize the tooltip text that appears when hovering over the send button.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        messages: {
            actionButton: "Submit Message"
        }
    });
    </script>

### messages.actionButtonLoading `String` _(default: "Stop")_

Sets the tooltip and aria-label for the stop button.

<div class="meta-api-description">
How do I change the stop button tooltip in Kendo UI PromptBox? Use the messages.actionButtonLoading to customize the tooltip text that appears when hovering over the stop button during loading state.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        messages: {
            actionButtonLoading: "Cancel Generation"
        }
    });
    </script>

### mode `String` _(default: "auto")_

Sets the mode of the PromptBox. Available options are "single", "multi", and "auto".

- `single` - Displays a single-line input field
- `multi` - Displays a multi-line textarea with configurable rows
- `auto` - Starts as a single line and expands automatically as the user types

<div class="meta-api-description">
How do I configure the input mode in Kendo UI PromptBox? Set the mode option to control how the input field behaves. Use "single" for a compact single-line input, "multi" for a fixed multi-line textarea, or "auto" for an automatically expanding input that grows with content.
</div>

#### Example - Single line mode

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        mode: "single",
        placeholder: "Single line input..."
    });
    </script>

#### Example - Multi line mode

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        mode: "multi",
        rows: 5,
        placeholder: "Multi-line input..."
    });
    </script>

#### Example - Auto expanding mode

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        mode: "auto",
        maxTextAreaHeight: 300,
        placeholder: "Start typing and watch it expand..."
    });
    </script>

### placeholder `String` _(default: "")_

Sets the placeholder text displayed in the PromptBox when it is empty.

<div class="meta-api-description">
How do I set a placeholder in Kendo UI PromptBox? Set the placeholder option to display hint text in the input field when it is empty. This helps guide users on what type of input is expected.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        placeholder: "Ask me anything..."
    });
    </script>

### readonly `Boolean` _(default: false)_

Sets the read-only state of the PromptBox. When set to true, the PromptBox content cannot be modified but remains accessible.

<div class="meta-api-description">
How do I make Kendo UI PromptBox read-only? Set the readonly option to true to prevent users from modifying the input content while still allowing them to select and copy text.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        readonly: true,
        value: "This text cannot be edited..."
    });
    </script>

### rows `Number` _(default: 1)_

Sets the number of visible text lines in the textarea. Applies only when the mode is set to "multi".

<div class="meta-api-description">
How do I set the number of rows in Kendo UI PromptBox? Set the rows option to define the initial number of visible text lines in multi-line mode. This determines the initial height of the textarea.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        mode: "multi",
        rows: 3,
        placeholder: "Three visible rows..."
    });
    </script>

### speechToTextButton `Boolean|Object` _(default: true)_

Configures the **Speech to Text** button in the end affix. The button is always visible. When null or not configured, the button is enabled by default. Use `{ enable: false }` to disable it.

<div class="meta-api-description">
How do I enable speech recognition in Kendo UI PromptBox? Provide an object with detailed settings to configure speech recognition, allowing users to dictate text using their microphone. Configure speech recognition settings like language, continuous mode, and interim results. Disable the button by setting enable to false.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        speechToTextButton: {
            enable: true
        },
        placeholder: "Click the microphone to speak...",
        speechToTextResult: function(e) {
            console.log("Speech result:", e.transcript);
        }
    });
    </script>

#### Example - Disable speech to text button

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        speechToTextButton: {
            enable: false
        },
        placeholder: "Speech recognition disabled..."
    });
    </script>

### speechToTextButton.enable `Boolean` _(default: true)_

Enables or disables the Speech to Text button.

<div class="meta-api-description">
How do I disable speech recognition in Kendo UI PromptBox? Set the enable option to false to disable speech recognition while keeping the button visible.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        speechToTextButton: {
            enable: false
        },
        placeholder: "Speech recognition disabled..."
    });
    </script>

### speechToTextButton.continuous `Boolean` _(default: false)_

Enables continuous speech recognition mode. When enabled, recognition continues until manually stopped.

<div class="meta-api-description">
How do I enable continuous speech recognition in Kendo UI PromptBox? Set the continuous option to true to keep the speech recognition service running until manually stopped, capturing multiple phrases in succession.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        speechToTextButton: {
            continuous: true
        },
        placeholder: "Continuous speech mode..."
    });
    </script>

### speechToTextButton.lang `String` _(default: "en-US")_

Sets the language for speech recognition. Use standard language codes.

<div class="meta-api-description">
How do I set the speech recognition language in Kendo UI PromptBox? Set the lang option to define the language for speech recognition. Use standard language codes like "en-US", "es-ES", "fr-FR", etc.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        speechToTextButton: {
            lang: "es-ES"
        },
        placeholder: "Habla en espanol..."
    });
    </script>

### speechToTextButton.interimResults `Boolean` _(default: false)_

Enables interim (partial) speech recognition results.

<div class="meta-api-description">
How do I get interim speech results in Kendo UI PromptBox? Set the interimResults option to true to receive partial transcriptions while the user is still speaking.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        speechToTextButton: {
            interimResults: true
        },
        placeholder: "Shows interim results..."
    });
    </script>

### speechToTextButton.maxAlternatives `Number` _(default: 1)_

Sets the maximum number of alternative transcriptions to return.

<div class="meta-api-description">
How do I get alternative speech transcriptions in Kendo UI PromptBox? Set the maxAlternatives option to receive multiple possible transcriptions for ambiguous speech.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        speechToTextButton: {
            maxAlternatives: 3
        },
        placeholder: "Multiple alternatives..."
    });
    </script>

### speechToTextButton.fillMode `String`

Defines the fill mode for the Speech to Text button.

<div class="meta-api-description">
How do I change the fill style of the Speech to Text button in Kendo UI PromptBox? Set the fillMode option to customize the background appearance of the button. Available options typically include solid, flat, outline, and link fill modes.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        speechToTextButton: {
            fillMode: "flat"
        },
        placeholder: "Flat speech button..."
    });
    </script>

### speechToTextButton.icon `String`

Defines the font icon name for the Speech to Text button.

<div class="meta-api-description">
How do I customize the icon of the Speech to Text button in Kendo UI PromptBox? Set the icon option to display a custom font icon on the button. Use icon names from the Kendo UI icon library.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        speechToTextButton: {
            icon: "microphone"
        },
        placeholder: "Custom speech icon..."
    });
    </script>

### speechToTextButton.rounded `String`

Defines the border radius for the Speech to Text button.

<div class="meta-api-description">
How do I change the border radius of the Speech to Text button in Kendo UI PromptBox? Set the rounded option to control the corner radius of the button. Available options include small, medium, large, full, and none.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        speechToTextButton: {
            rounded: "full"
        },
        placeholder: "Fully rounded speech button..."
    });
    </script>

### speechToTextButton.size `String`

Defines the size of the Speech to Text button.

<div class="meta-api-description">
How do I change the size of the Speech to Text button in Kendo UI PromptBox? Set the size option to control the dimensions of the button. Available options include small, medium, large, and none.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        speechToTextButton: {
            size: "large"
        },
        placeholder: "Large speech button..."
    });
    </script>

### speechToTextButton.themeColor `String`

Defines the theme color for the Speech to Text button.

<div class="meta-api-description">
How do I change the color of the Speech to Text button in Kendo UI PromptBox? Set the themeColor option to apply a predefined color scheme to the button. Available options include primary, secondary, tertiary, info, success, warning, error, dark, and light.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        speechToTextButton: {
            themeColor: "primary"
        },
        placeholder: "Primary colored speech button..."
    });
    </script>

### startAffixTemplate `Function`

Defines a custom template for the start affix area. The start affix is positioned before the input field.

<div class="meta-api-description">
How do I add custom content at the start of Kendo UI PromptBox? Use the startAffixTemplate to add custom HTML content or components to the start affix area, which appears before the input field. This allows you to add custom icons, labels, or other elements.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        startAffixTemplate: () => '<span class="k-icon k-i-star"></span>',
        placeholder: "With start affix..."
    });
    </script>

### title `String` _(default: "")_

Sets the title attribute of the input or textarea element.

<div class="meta-api-description">
How do I set a tooltip on Kendo UI PromptBox input? Set the title option to add a tooltip that appears when hovering over the input element.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        title: "Type your prompt here",
        placeholder: "Hover to see tooltip..."
    });
    </script>

### topAffixTemplate `Function`

Defines a custom template for the top affix area. The top affix is positioned at the top of the content area in multi-line mode only.

<div class="meta-api-description">
How do I add content above the PromptBox input in multi-line mode? Use the topAffixTemplate to add custom HTML content to the top of the content area. This template is only rendered when the mode is set to "multi".
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        mode: "multi",
        topAffixTemplate: () => '<div class="prompt-label">Your Message:</div>',
        placeholder: "Enter your message..."
    });
    </script>

### value `String` _(default: "")_

Sets the value of the PromptBox.

<div class="meta-api-description">
How do I set or get the value of Kendo UI PromptBox? Use the value option to set the initial text content of the PromptBox, or use the value() method to get or set the value programmatically.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        value: "Pre-filled message",
        placeholder: "Enter your message..."
    });
    </script>

## Methods

### destroy

Prepares the PromptBox for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks.

<div class="meta-api-description">
How do I properly remove Kendo UI PromptBox from the page? Call the destroy method before removing the PromptBox element from the DOM to clean up event handlers, data attributes, and child widgets to prevent memory leaks.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    var promptbox = $("#promptbox").kendoPromptBox({
        placeholder: "This will be destroyed..."
    }).data("kendoPromptBox");

    promptbox.destroy();

    $("#promptbox").remove();
    </script>

### enable

Enables or disables the PromptBox.

<div class="meta-api-description">
How do I enable or disable Kendo UI PromptBox programmatically? Call the enable method with true or false to change the disabled state of the PromptBox at runtime.
</div>

#### Parameters

##### enable `Boolean`

Set to `true` to enable the PromptBox, or `false` to disable it.

#### Example

    <div id="promptbox"></div>
    <button id="toggle">Toggle</button>
    <script>
    var promptbox = $("#promptbox").kendoPromptBox({
        placeholder: "Toggle enabled state..."
    }).data("kendoPromptBox");

    var enabled = true;
    $("#toggle").click(function() {
        enabled = !enabled;
        promptbox.enable(enabled);
    });
    </script>

### focus

Sets focus to the PromptBox input element.

<div class="meta-api-description">
How do I programmatically focus Kendo UI PromptBox? Call the focus method to set keyboard focus to the input element, allowing the user to start typing immediately.
</div>

#### Example

    <div id="promptbox"></div>
    <button id="focus-btn">Focus</button>
    <script>
    var promptbox = $("#promptbox").kendoPromptBox({
        placeholder: "Click button to focus..."
    }).data("kendoPromptBox");

    $("#focus-btn").click(function() {
        promptbox.focus();
    });
    </script>

### blur

Removes focus from the PromptBox input element.

<div class="meta-api-description">
How do I programmatically blur Kendo UI PromptBox? Call the blur method to remove keyboard focus from the input element.
</div>

#### Example

    <div id="promptbox"></div>
    <button id="blur-btn">Blur</button>
    <script>
    var promptbox = $("#promptbox").kendoPromptBox({
        placeholder: "Click button to blur..."
    }).data("kendoPromptBox");

    promptbox.focus();

    $("#blur-btn").click(function() {
        promptbox.blur();
    });
    </script>

### files

Gets or sets the attached files in the PromptBox. When called without arguments, returns the current files array. When called with an array, sets the attached files.

<div class="meta-api-description">
How do I get or set attached files in Kendo UI PromptBox? Call the files method without parameters to get the currently attached files array, or pass an array to set the attached files programmatically.
</div>

#### Parameters

##### files `Array` _(optional)_

An array of file objects to set. If omitted, returns the current files array.

#### Returns

`Array` The array of attached files when called without arguments.

#### Example - getting files

    <div id="promptbox"></div>
    <button id="get-files">Get Files</button>
    <script>
    var promptbox = $("#promptbox").kendoPromptBox({
        fileSelectButton: true,
        placeholder: "Attach files..."
    }).data("kendoPromptBox");

    $("#get-files").click(function() {
        var files = promptbox.files();
        console.log("Attached files:", files);
    });
    </script>

#### Example - setting files

    <div id="promptbox"></div>
    <script>
    var promptbox = $("#promptbox").kendoPromptBox({
        fileSelectButton: true,
        placeholder: "Attach files..."
    }).data("kendoPromptBox");

    promptbox.files([
        { name: "document.pdf", size: 1024 },
        { name: "image.png", size: 2048 }
    ]);
    </script>

### clearFiles

Clears all attached files from the PromptBox.

<div class="meta-api-description">
How do I clear all attached files in Kendo UI PromptBox? Call the clearFiles method to remove all currently attached files from the component.
</div>

#### Example

    <div id="promptbox"></div>
    <button id="clear-files">Clear Files</button>
    <script>
    var promptbox = $("#promptbox").kendoPromptBox({
        fileSelectButton: true,
        placeholder: "Attach files..."
    }).data("kendoPromptBox");

    $("#clear-files").click(function() {
        promptbox.clearFiles();
    });
    </script>

### isMultiline

Returns whether the PromptBox is currently in multiline state. This is primarily useful in "auto" mode to determine if the textarea has expanded beyond a single line.

<div class="meta-api-description">
How do I check if Kendo UI PromptBox is in multiline state? Call the isMultiline method to determine if the auto-expanding textarea has grown beyond a single line. This is useful for adjusting UI layout based on the input size.
</div>

#### Returns

`Boolean` True if the PromptBox is in multiline state, false otherwise.

#### Example

    <div id="promptbox"></div>
    <button id="check">Check Multiline</button>
    <script>
    var promptbox = $("#promptbox").kendoPromptBox({
        mode: "auto",
        placeholder: "Type to expand..."
    }).data("kendoPromptBox");

    $("#check").click(function() {
        console.log("Is multiline:", promptbox.isMultiline());
    });
    </script>

### loading

Gets or sets the loading state of the PromptBox. When called without arguments, returns the current loading state. When called with a boolean, sets the loading state.

<div class="meta-api-description">
How do I show or hide loading state in Kendo UI PromptBox? Call the loading method with true to indicate that generation is in progress, which changes the Action button to display a stop icon. Call with false to return to the normal send state. Call without arguments to get the current loading state.
</div>

#### Parameters

##### value `Boolean` _(optional)_

Set to `true` to show loading state, or `false` to hide it. If omitted, returns the current loading state.

#### Returns

`Boolean` The current loading state when called without arguments.

#### Example - setting loading state

    <div id="promptbox"></div>
    <script>
    var promptbox = $("#promptbox").kendoPromptBox({
        placeholder: "Send a message..."
    }).data("kendoPromptBox");

    promptbox.loading(true);

    setTimeout(function() {
        promptbox.loading(false);
    }, 3000);
    </script>

#### Example - getting loading state

    <div id="promptbox"></div>
    <script>
    var promptbox = $("#promptbox").kendoPromptBox({
        placeholder: "Send a message..."
    }).data("kendoPromptBox");

    promptbox.loading(true);
    console.log(promptbox.loading()); // true
    </script>

### setOptions

Sets the options of the PromptBox.

<div class="meta-api-description">
How do I change Kendo UI PromptBox options at runtime? Call the setOptions method with an object containing the options to update. This allows you to dynamically change configuration settings after initialization.
</div>

#### Parameters

##### options `Object`

The configuration options to set.

#### Example

    <div id="promptbox"></div>
    <button id="update">Update Options</button>
    <script>
    var promptbox = $("#promptbox").kendoPromptBox({
        placeholder: "Original placeholder..."
    }).data("kendoPromptBox");

    $("#update").click(function() {
        promptbox.setOptions({
            placeholder: "Updated placeholder!",
            mode: "multi",
            rows: 3
        });
    });
    </script>

### readonly

Gets or sets the read-only state of the PromptBox.

<div class="meta-api-description">
How do I make Kendo UI PromptBox read-only? Call the readonly method with true to prevent the user from editing the input while still allowing selection and scrolling. Call with false to make it editable again. Call without parameters to get the current state.
</div>

#### Parameters

##### value `Boolean` _(optional)_

Set to `true` to make the PromptBox read-only, or `false` to make it editable. If omitted, returns the current state.

#### Returns

`Boolean` The current read-only state when called without parameters.

#### Example

    <div id="promptbox"></div>
    <button id="toggle-readonly">Toggle Readonly</button>
    <script>
    var promptbox = $("#promptbox").kendoPromptBox({
        placeholder: "Toggle readonly state..."
    }).data("kendoPromptBox");

    $("#toggle-readonly").click(function() {
        var isReadonly = promptbox.readonly();
        promptbox.readonly(!isReadonly);
    });
    </script>

### value

Gets or sets the value of the PromptBox.

<div class="meta-api-description">
How do I get or set the text value in Kendo UI PromptBox? Call the value method without parameters to get the current value, or pass a string to set a new value.
</div>

#### Parameters

##### value `String`

The value to set. If omitted, the method returns the current value.

#### Returns

`String` The value of the PromptBox when called without parameters.

#### Example - Get value

    <div id="promptbox"></div>
    <button id="get-value">Get Value</button>
    <script>
    var promptbox = $("#promptbox").kendoPromptBox({
        value: "Hello world",
        placeholder: "Type something..."
    }).data("kendoPromptBox");

    $("#get-value").click(function() {
        alert("Current value: " + promptbox.value());
    });
    </script>

#### Example - Set value

    <div id="promptbox"></div>
    <button id="set-value">Set Value</button>
    <script>
    var promptbox = $("#promptbox").kendoPromptBox({
        placeholder: "Will be updated..."
    }).data("kendoPromptBox");

    $("#set-value").click(function() {
        promptbox.value("New value set programmatically");
    });
    </script>

## Events

### blur

Fires each time the PromptBox loses focus.

<div class="meta-api-description">
How do I handle blur events in Kendo UI PromptBox? Bind to the blur event to execute code when the PromptBox loses focus, useful for validation, saving drafts, or UI updates.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        placeholder: "Type and click away...",
        blur: function(e) {
            console.log("PromptBox lost focus");
        }
    });
    </script>

### focus

Fires each time the PromptBox receives focus.

<div class="meta-api-description">
How do I handle focus events in Kendo UI PromptBox? Bind to the focus event to execute code when the PromptBox receives focus, useful for showing hints, clearing placeholders, or tracking user interaction.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        placeholder: "Click to focus...",
        focus: function(e) {
            console.log("PromptBox received focus");
        }
    });
    </script>

### input

Fires each time the user types in the input field.

<div class="meta-api-description">
How do I detect typing in Kendo UI PromptBox? Bind to the input event to capture every keystroke and input change, useful for real-time validation, character counting, or auto-save functionality.
</div>

#### Event Data

##### e.value `String`

The current value of the input field.

#### Example

    <div id="promptbox"></div>
    <div id="char-count">0 characters</div>
    <script>
    $("#promptbox").kendoPromptBox({
        placeholder: "Type to see character count...",
        input: function(e) {
            $("#char-count").text(e.value.length + " characters");
        }
    });
    </script>

### inputBlur

Fires each time the internal input element loses focus.

<div class="meta-api-description">
How do I detect when the input element loses focus in Kendo UI PromptBox? Bind to the inputBlur event to capture when the internal input (not the wrapper) loses focus.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        placeholder: "Focus and blur the input...",
        inputBlur: function(e) {
            console.log("Input element lost focus");
        }
    });
    </script>

### inputFocus

Fires each time the internal input element receives focus.

<div class="meta-api-description">
How do I detect when the input element receives focus in Kendo UI PromptBox? Bind to the inputFocus event to capture when the internal input element (not the wrapper) receives focus.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        placeholder: "Focus the input...",
        inputFocus: function(e) {
            console.log("Input element received focus");
        }
    });
    </script>

### valueChange

Fires when the value changes through user input (not programmatic changes).

<div class="meta-api-description">
How do I detect user-initiated value changes in Kendo UI PromptBox? Bind to the valueChange event to capture value changes that occur through user interaction, excluding programmatic changes via the value() method.
</div>

#### Event Data

##### e.oldValue `String`

The previous value of the input field before the change.

##### e.newValue `String`

The new value of the input field after the change.

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        placeholder: "Type something...",
        valueChange: function(e) {
            console.log("Value changed from:", e.oldValue, "to:", e.newValue);
        }
    });
    </script>

### multilineStateChange

Fires when the PromptBox transitions between single-line and multi-line states in `auto` mode.

<div class="meta-api-description">
How do I detect when Kendo UI PromptBox expands or collapses? Bind to the multilineStateChange event to capture when the PromptBox transitions between single-line and multi-line display modes in auto mode.
</div>

#### Event Data

##### e.isMultiline `Boolean`

Indicates whether the PromptBox is now in multi-line state.

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        mode: "auto",
        placeholder: "Type multiple lines to expand...",
        multilineStateChange: function(e) {
            console.log("Is now multiline:", e.isMultiline);
        }
    });
    </script>

### fileRemove

Fires each time the user removes a file attachment.

<div class="meta-api-description">
How do I handle file removal in Kendo UI PromptBox? Bind to the fileRemove event to capture when users remove attached files, useful for updating file lists, server-side cleanup, or UI updates.
</div>

#### Event Data

##### e.file `Object`

The file that was removed.

##### e.files `Array`

The remaining attached files after removal.

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        fileSelectButton: true,
        placeholder: "Attach and remove files...",
        fileRemove: function(e) {
            console.log("Removed file:", e.file.name);
            console.log("Remaining files:", e.files.length);
        }
    });
    </script>

### fileSelect

Fires each time the user selects files using the File Select button.

<div class="meta-api-description">
How do I handle file selection in Kendo UI PromptBox? Bind to the fileSelect event to capture when users select files to attach, useful for validation, preview generation, or upload processing.
</div>

#### Event Data

##### e.files `Array`

The array of selected files.

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        fileSelectButton: true,
        placeholder: "Attach files...",
        fileSelect: function(e) {
            e.files.forEach(function(file) {
                console.log("Selected:", file.name, "Size:", file.size);
            });
        }
    });
    </script>

### promptAction

Fires when the action button is clicked (send or stop). Check `e.actionType` to determine the action.

<div class="meta-api-description">
How do I intercept submit/stop actions in Kendo UI PromptBox? Bind to the promptAction event to capture when users click the send or stop button. Use `e.actionType` to determine if it's a "send" or "stop" action.
</div>

#### Event Data

##### e.actionType `String`

The type of action: "send" (submitting message) or "stop" (stopping generation).

##### e.value `String`

The message text (when actionType is "send").

##### e.files `Array`

The array of attached files (when actionType is "send").

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        placeholder: "Send a message...",
        promptAction: function(e) {
            if (e.actionType === "send") {
                console.log("Sending message:", e.value);
                if (e.value.length < 5) {
                    e.preventDefault();
                    alert("Message too short!");
                }
            } else if (e.actionType === "stop") {
                console.log("Stop requested");
            }
        }
    });
    </script>

### speechToTextClick

Fires each time the user clicks the Speech to Text button.

<div class="meta-api-description">
How do I detect Speech to Text button clicks in Kendo UI PromptBox? Bind to the speechToTextClick event to capture button clicks, useful for custom speech handling or analytics.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        speechToTextButton: true,
        placeholder: "Click the microphone...",
        speechToTextClick: function(e) {
            console.log("Speech to text button clicked");
        }
    });
    </script>

### speechToTextEnd

Fires when the speech recognition service disconnects.

<div class="meta-api-description">
How do I detect when speech recognition ends in Kendo UI PromptBox? Bind to the speechToTextEnd event to capture when the speech recognition service stops listening, useful for UI updates or processing results.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        speechToTextButton: true,
        placeholder: "Speak and release...",
        speechToTextEnd: function(e) {
            console.log("Speech recognition ended");
        }
    });
    </script>

### speechToTextError

Fires when a speech recognition error occurs.

<div class="meta-api-description">
How do I handle speech recognition errors in Kendo UI PromptBox? Bind to the speechToTextError event to capture errors from the speech recognition service, useful for displaying error messages or fallback handling.
</div>

#### Event Data

##### e.error `String`

The error type or message from the speech recognition service.

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        speechToTextButton: true,
        placeholder: "Try speech recognition...",
        speechToTextError: function(e) {
            console.log("Speech recognition error:", e.error);
            alert("Speech recognition failed: " + e.error);
        }
    });
    </script>

### speechToTextResult

Fires when the speech recognition service returns a result.

<div class="meta-api-description">
How do I get speech recognition results in Kendo UI PromptBox? Bind to the speechToTextResult event to capture transcribed text from the speech recognition service, receiving both interim and final results.
</div>

#### Event Data

##### e.transcript `String`

The transcribed text from speech recognition.

##### e.isFinal `Boolean`

Indicates whether this is a final result.

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        speechToTextButton: true,
        placeholder: "Speak your message...",
        speechToTextResult: function(e) {
            console.log("Transcript:", e.transcript);
            console.log("Is final:", e.isFinal);
        }
    });
    </script>

### speechToTextStart

Fires when the speech recognition service begins listening.

<div class="meta-api-description">
How do I detect when speech recognition starts in Kendo UI PromptBox? Bind to the speechToTextStart event to capture when the speech recognition service begins listening, useful for UI feedback or analytics.
</div>

#### Example

    <div id="promptbox"></div>
    <script>
    $("#promptbox").kendoPromptBox({
        speechToTextButton: true,
        placeholder: "Click microphone to start...",
        speechToTextStart: function(e) {
            console.log("Speech recognition started - listening...");
        }
    });
    </script>
