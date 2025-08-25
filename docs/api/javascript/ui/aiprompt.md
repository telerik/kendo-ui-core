---
title: AIPrompt
page_title: Configuration, methods and events of Kendo UI AIPrompt component
description: Configuration options, methods and events for the Kendo UI AIPrompt component.
res_type: api
component: aiprompt
---

# kendo.ui.AIPrompt

Represents the Kendo UI AIPrompt. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### activeView `Number|String` *(default: 0)*

Specifies the index of the active view or the name of the view.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        activeView: 1,
        promptOutputs: [{ prompt: "create object 1", output: "Description 1" }]
    });
    </script>

### promptOutputs `Array`

An array of prompt outputs to display in the prompt view.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        activeView: 1,
        promptOutputs: [
            { prompt: "create object 1", output: "Description 1" },
            { prompt: "create object 2", output: "Description 2" }
        ]
    });
    </script>

### encodedPromptOutputs `Boolean` *(default: true)*

Specifies whether the prompt outputs are HTML-encoded before being displayed in the output view. When set to true (default), the output is encoded and displayed as plain text, preventing any HTML formatting or scripts from being rendered.

> **Important**: When set to `false`, the output is rendered as raw HTML, allowing for custom formatting (such as rendering markdown as HTML). If you set this to false, you **must ensure that the output is properly sanitized to prevent XSS attacks**.

    <div id="aiprompt"></div>
    <script src="https://cdn.jsdelivr.net/npm/dompurify@3.2.5/dist/purify.min.js"></script>
    <script src="https://unpkg.com/markdown@0.5.0/lib/markdown.js"></script>
    <script>
        $("#aiprompt").kendoAIPrompt({
            service: "/api/llm",
            encodedPromptOutputs: false,
            promptResponse: function(e) {
                // Convert markdown to HTML
                let htmlOutput = markdown.toHTML(e.output, "Maruku");
                // Sanitize the HTML output
                if (window.DOMPurify) {
                    e.output = DOMPurify.sanitize(htmlOutput, { USE_PROFILES: { html: true } });
                }
            }
        });
    </script>


### promptOutputs.id `String`

The id of the prompt output. If none is provided, the id will be generated as a `kendo.guid()`. The ID is rendered as data-id attribute in the prompt output.


#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        activeView: 1,
        promptOutputs: [
            { id: "test-" + kendo.guid(), prompt: "create object 1", output: "Description 1" },
            { prompt: "create object 2", output: "Description 2" }
        ]
    });
    </script>

### promptOutputs.output `String`

The output content generated from the prompt.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        activeView: 1,
        promptOutputs: [
            { prompt: "create object 1", output: "Description 1" },
            { prompt: "create object 2", output: "Description 2" }
        ]
    });
    </script>

### promptOutputs.prompt `String`

The prompt text used to generate this output.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        activeView: 1,
        promptOutputs: [
            { prompt: "create object 1", output: "Description 1" },
            { prompt: "create object 2", output: "Description 2" }
        ]
    });
    </script>

### speechToText `Boolean|Object` *(default: false)*

Configures speech-to-text functionality for the prompt input. When `true`, enables speech-to-text with default settings. When `false`, disables the feature. When an object, configures custom speech-to-text options.

#### Example - Enable with default settings
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        speechToText: true
    });
    </script>

#### Example - Custom configuration
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        speechToText: {
            integrationMode: "webSpeech",
            lang: "en-US",
            continuous: false,
            interimResults: true,
            maxAlternatives: 1
        }
    });
    </script>

#### Example - Disable speech-to-text
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        speechToText: false
    });
    </script>

### speechToText.integrationMode `String` *(default: "webSpeech")*

Specifies the integration mode for speech recognition. Available modes:
- `"webSpeech"` - Uses the Web Speech API
- `"none"` - Provides button without actual speech recognition

### speechToText.lang `String` *(default: "en-US")*

Specifies the language code for speech recognition.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        speechToText: {
            lang: "es-ES"
        }
    });
    </script>

### speechToText.continuous `Boolean` *(default: false)*

Specifies whether to continue listening after a result is received.

### speechToText.interimResults `Boolean` *(default: false)*

Specifies whether to return interim results during speech recognition.

### speechToText.maxAlternatives `Number` *(default: 1)*

Specifies the maximum number of alternatives to return from speech recognition.

### promptTextArea `Object`

Configuration options for the [Kendo UI TextArea](/api/javascript/ui/textarea) component used in the prompt view. Only specific properties from the Kendo UI TextArea are supported.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        promptTextArea: {
            resize: "vertical",
            rows: 4,
            placeholder: "Enter your AI prompt here...",
            fillMode: "outline",
            rounded: "medium",
            size: "large",
            maxLength: 1000,
            label: {
                content: "AI Prompt",
                floating: true
            }
        }
    });
    </script>

### promptTextArea.fillMode `String`

Specifies the fill mode of the textarea. Available options: `"solid"`, `"outline"`, `"flat"`, `"none"`.

### promptTextArea.inputMode `String`

Specifies the input mode attribute for mobile keyboards.

### promptTextArea.label `Object`

Specifies the label configuration for the textarea.

### promptTextArea.label.content `String`

Specifies the label text content.

### promptTextArea.label.floating `Boolean`

Specifies whether the label floats above the input.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        promptTextArea: {
            label: {
                content: "Enter your prompt",
                floating: true
            }
        }
    });
    </script>

### promptTextArea.maxLength `Number`

Specifies the maximum number of characters allowed in the textarea.

### promptTextArea.overflow `String`

Specifies the overflow behavior. Available options: `"auto"`, `"hidden"`, `"visible"`, `"scroll"`.

### promptTextArea.placeholder `String`

Specifies the placeholder text for the textarea.

### promptTextArea.resize `String`

Specifies the resize behavior. Available options: `"none"`, `"both"`, `"horizontal"`, `"vertical"`.

### promptTextArea.rows `Number`

Specifies the number of visible text lines.

### promptTextArea.rounded `String`

Specifies the border radius. Available options: `"small"`, `"medium"`, `"large"`, `"full"`, `"none"`.

### promptTextArea.size `String`

Specifies the size of the component. Available options: `"small"`, `"medium"`, `"large"`, `"none"`.

### outputActions `Array` *(default: ["copy", "retry"])*

An array of action configurations for the output cards. Can contain strings for built-in actions or objects with custom action properties.

**Built-in actions:**
- `"copy"` - Copy output content to clipboard
- `"retry"` - Retry generating the output
- `"rating"` - Expands to both positive and negative rating buttons
- `"ratingPositive"` - Renders the positive rating button
- `"ratingNegative"` - Renders the negative rating button
- `"spacer"` - Adds spacing between action buttons

Custom actions trigger the `outputAction` event with the action command and output data.

#### Example - Built-in actions
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        outputActions: ["copy", "retry", "rating"]
    });
    </script>

#### Example - Custom actions
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        outputActions: [
            "copy",
            "retry",
            { command: "export", text: "Export", icon: "download" },
            "spacer",
            { command: "share", text: "Share", icon: "share" }
        ],
        outputAction: function(e) {
            if (e.command === "export") {
                // Handle export action
                // e.output contains the text content directly
                console.log("Exporting output ID:", e.outputId);
                console.log("Content:", e.output);
                console.log("Original prompt:", e.prompt);
            } else if (e.command === "share") {
                // Handle share action
                console.log("Sharing output:", e.output);
            }
        }
    });
    </script>

### outputActions.command `String`

The command identifier for the action. This is used to identify the action when the `outputAction` event is triggered.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        outputActions: [
            { command: "export", text: "Export", icon: "download" }
        ]
    });
    </script>

### outputActions.text `String`

The text displayed on the action button.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        outputActions: [
            { command: "export", text: "Export to PDF", icon: "download" }
        ]
    });
    </script>

### outputActions.icon `String`

The icon name for the action button. Uses Kendo UI icon names.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        outputActions: [
            { command: "bookmark", text: "Bookmark", icon: "bookmark" },
            { command: "share", text: "Share", icon: "share" }
        ]
    });
    </script>

### outputActions.fillMode `String`

Specifies the fill mode of the action button. Available options: `"solid"`, `"outline"`, `"flat"`, `"none"`.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        outputActions: [
            { command: "primary", text: "Primary", fillMode: "solid" },
            { command: "secondary", text: "Secondary", fillMode: "outline" }
        ]
    });
    </script>

### outputActions.rounded `String`

Specifies the border radius of the action button. Available options: `"small"`, `"medium"`, `"large"`, `"full"`, `"none"`.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        outputActions: [
            { command: "rounded", text: "Rounded", rounded: "full" }
        ]
    });
    </script>

### outputActions.themeColor `String`

Specifies the theme color of the action button. Available options: `"base"`, `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"error"`, `"info"`, `"light"`, `"inverse"`, `"dark"`.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        outputActions: [
            { command: "danger", text: "Delete", themeColor: "error" },
            { command: "success", text: "Approve", themeColor: "success" }
        ]
    });
    </script>

### outputActions.title `String`

Specifies the title attribute (tooltip) for the action button.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        outputActions: [
            { command: "help", icon: "question", title: "Get help with this output" }
        ]
    });
    </script>

### outputActions.type `String`

Specifies the type of the action. Available options: `"button"`, `"spacer"`. Default is `"button"`.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        outputActions: [
            { command: "export", text: "Export" },
            { type: "spacer" },
            { command: "delete", text: "Delete", themeColor: "error" }
        ]
    });
    </script>

### outputTemplate `String | Function`

A template function for customizing the display of output content. This function is called when an output has finished streaming and final content needs to be rendered.

The function receives an object with `output` (the output data) and `content` (the output text) properties and should return HTML string.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        outputTemplate: function({ output, content }) {
            return `<div class="custom-output">
                <h4>AI Response:</h4>
                <p>${content}</p>
                <small>Generated at: ${new Date().toLocaleString()}</small>
            </div>`;
        }
    });
    </script>

### promptSuggestionItemTemplate `String|Function`

The template of the prompt suggestion item. It can be a string, a function or a Kendo Template.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        promptSuggestions: [
            "Act as [actor] and write [format] about [subject] in [100 words]",
            "Suggest post about [subject] that will be used in [social media].",
        ],
        // add k-prompt-suggestion class to reuse the built-in click functionality
        promptSuggestionItemTemplate: function({ suggestion }) {
            return `<div class="k-prompt-suggestion my-custom-suggestion-item">
                <span class="my-custom-suggestion-item-text">${suggestion}</span>
            </div>`;
        }
    });
    </script>

### promptSuggestions `Array` *(default: [])*

An array of prompt suggestions as strings to display in the prompt view. The suggestions can be clicked to populate the prompt input.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        promptSuggestions: [
            "Act as [actor] and write [format] about [subject] in [100 words]",
            "Suggest post about [subject] that will be used in [social media].",
        ]
    });
    </script>

### toolbarItems `Array`

An array of toolbar items to display in the header Toolbar. They will be rendered after the items generated from the configurations of the views.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        toolbarItems: [
            // add 'Spacer' item move the Close button to the right
            { type: "spacer" },
            // add a 'Close' round icon button
            { type: "button", icon: "x", fillMode: "flat", rounded: "full", themeColor: "primary", click: function(e) { console.log("Close button clicked", e); } }
        ]
    });
    </script>

### toolbarItems.type `String`
The type of the toolbar item. Available options are `button` or `spacer`.

### toolbarItems.icon `String`
The icon name of the toolbar item.

### toolbarItems.fillMode `String`
The fill mode of the toolbar item. Available options are `solid`, `outline`, `flat` or `none`.

### toolbarItems.rounded `String`
The rounded mode of the toolbar item. Available options are `small`, `medium`, `large`, `full` or `none`.

### toolbarItems.themeColor `String`
The theme color of the toolbar item. Available options are `base`, `primary`, `secondary`, `tertiary`, `success`, `warning`, `error`, `info`, `light`, `inverse` or `dark`.

### toolbarItems.click `Function`
The click event handler of the toolbar item.

### service `String|Object`
The URL of the AI service to use for generating outputs.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        service: "/api/llm"
    });
    </script>

### service.url `String`
The Url of the AI service to use for generating outputs.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        service: {
            url: "/api/llm"
        }
    });
    </script>

### service.headers `Object`
The headers to send with the AI service request.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        service: {
            url: "/api/llm",
            headers: {
                "Authorization": "Bearer token"
            }
        }
    });
    </script>

### service.data `Object|Function`
The data to send with the AI service request.

#### Example
    <div id="aiprompt"></div>
    <script>
        $("#aiprompt").kendoAIPrompt({
            service: {
                url: "/api/llm",
                data: {
                    "key": "value"
                }
            }
        });
    </script>

#### Example
    <div id="aiprompt"></div>
    <script>
        $("#aiprompt").kendoAIPrompt({
            service: {
                url: "/api/llm",
                data: function(prompt, isRetry, history) {
                    return {
                        "messages": [{
                            type: messageTypes.user,
                            text: prompt
                        }],
                        "key": "value"
                    }
                }
            }
        });
    </script>

### service.outputGetter `Function`
The function to get the output from the AI service response.

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        service: {
            url: "/api/llm",
            outputGetter: function(response) {
                return response.output;
            }
        }
    })
    </script>

### showOutputSubtitleTooltip `Boolean` *(default: false)*

Controls whether the subtitle of the card in the output view displays a tooltip containing the full content of the subtitle, which is the prompt used to generate the output.

#### Example
    <div id="aiprompt"></div>
    <script>
        $("#aiprompt").kendoAIPrompt({
            activeView: 1,
            showOutputSubtitleTooltip: true,
            promptOutputs: [
                { prompt: "A very long subtitle that will be shown in a tooltip", output: "Description 1" },
                { prompt: "Another long subtitle for tooltip demonstration", output: "Description 2" }
            ]
        });
    </script>


### showOutputRating `Boolean` *(default: true)*

Specifies if the output rating should be displayed on the output card.
> **Note:** This property is deprecated. Use the `outputActions` configuration instead.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        activeView: 1,
        showOutputRating: false,
        promptOutputs: [
            { prompt: "create object 1", output: "Description 1" },
            { prompt: "create object 2", output: "Description 2" },
        ]
    });
    </script>

### views `Array`

An array of view configurations.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        views: [
            {
                type: 'prompt',
                promptSuggestions: [
                    "Act as [actor] and write [format] about [subject] in [100 words]",
                    "Suggest post about [subject] that will be used in [social media].",
                ],
            },
            "output",
            {
                type: 'commands',
                promptCommands: [

                    { id: "1", text: "Simplify", icon: "min-width" },
                    { id: "2", text: "Extend", icon: "arrows-left-right" },
                ]
            },

            {
                name: "custom",
                type: "custom",
                buttonIcon: "pencil",
                buttonText: "Custom View from Options",
                viewTemplate: () => "<div class='custom-view'>Custom View</div>",
                footerTemplate: () => `<div class="k-actions k-actions-start k-actions-horizontal k-prompt-actions">
                            <button ref-custom-button>Click me</button>
                        </div>`,
                initializeComponents: function() {
                    var that = this;

                    that.element.find("[ref-custom-button]").kendoButton({
                        click: function(e) {
                            console.log("Custom button clicked", e);
                        }
                    });
                }
            }]
    })
    </script>

### views.buttonText `String`

The text of the Toolbar button rendered for the view.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        views: [
            {
                type: 'prompt',
                promptSuggestions: [
                    "Act as [actor] and write [format] about [subject] in [100 words]",
                    "Suggest post about [subject] that will be used in [social media].",
                ],
            },
            "output",
            {
                type: 'commands',
                promptCommands: [

                    { id: "1", text: "Simplify", icon: "min-width" },
                    { id: "2", text: "Extend", icon: "arrows-left-right" },
                ]
            },

            {
                name: "custom",
                type: "custom",
                buttonIcon: "pencil",
                buttonText: "Custom View from Options",
                viewTemplate: () => "<div class='custom-view'>Custom View</div>",
                footerTemplate: () => `<div class="k-actions k-actions-start k-actions-horizontal k-prompt-actions">
                            <button ref-custom-button>Click me</button>
                        </div>`,
                initializeComponents: function() {
                    var that = this;

                    that.element.find("[ref-custom-button]").kendoButton({
                        click: function(e) {
                            console.log("Custom button clicked", e);
                        }
                    });
                }
            }]
    })
    </script>

### views.buttonIcon `String`

The icon name of the Toolbar button rendered for the view.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        views: [
            {
                type: 'prompt',
                promptSuggestions: [
                    "Act as [actor] and write [format] about [subject] in [100 words]",
                    "Suggest post about [subject] that will be used in [social media].",
                ],
            },
            "output",
            {
                type: 'commands',
                promptCommands: [

                    { id: "1", text: "Simplify", icon: "min-width" },
                    { id: "2", text: "Extend", icon: "arrows-left-right" },
                ]
            },

            {
                name: "custom",
                type: "custom",
                buttonIcon: "pencil",
                buttonText: "Custom View from Options",
                viewTemplate: () => "<div class='custom-view'>Custom View</div>",
                footerTemplate: () => `<div class="k-actions k-actions-start k-actions-horizontal k-prompt-actions">
                            <button ref-custom-button>Click me</button>
                        </div>`,
                initializeComponents: function() {
                    var that = this;

                    that.element.find("[ref-custom-button]").kendoButton({
                        click: function(e) {
                            console.log("Custom button clicked", e);
                        }
                    });
                }
            }]
    })
    </script>

### views.type `String`

The type of the view. Available built-in options are `prompt`, `output`, `commands` or `custom`.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        views: [
            {
                type: 'prompt',
                promptSuggestions: [
                    "Act as [actor] and write [format] about [subject] in [100 words]",
                    "Suggest post about [subject] that will be used in [social media].",
                ],
            },
            "output",
            {
                type: 'commands',
                promptCommands: [

                    { id: "1", text: "Simplify", icon: "min-width" },
                    { id: "2", text: "Extend", icon: "arrows-left-right" },
                ]
            },

            {
                name: "custom",
                type: "custom",
                buttonIcon: "pencil",
                buttonText: "Custom View from Options",
                viewTemplate: () => "<div class='custom-view'>Custom View</div>",
                footerTemplate: () => `<div class="k-actions k-actions-start k-actions-horizontal k-prompt-actions">
                            <button ref-custom-button>Click me</button>
                        </div>`,
                initializeComponents: function() {
                    var that = this;

                    that.element.find("[ref-custom-button]").kendoButton({
                        click: function(e) {
                            console.log("Custom button clicked", e);
                        }
                    });
                }
            }]
    })
    </script>

### views.name `String`

The name of the view. It is used to identify the view. It should be unique.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        views: [
            {
                type: 'prompt',
                promptSuggestions: [
                    "Act as [actor] and write [format] about [subject] in [100 words]",
                    "Suggest post about [subject] that will be used in [social media].",
                ],
            },
            "output",
            {
                type: 'commands',
                promptCommands: [

                    { id: "1", text: "Simplify", icon: "min-width" },
                    { id: "2", text: "Extend", icon: "arrows-left-right" },
                ]
            },

            {
                name: "custom",
                type: "custom",
                buttonIcon: "pencil",
                buttonText: "Custom View from Options",
                viewTemplate: () => "<div class='custom-view'>Custom View</div>",
                footerTemplate: () => `<div class="k-actions k-actions-start k-actions-horizontal k-prompt-actions">
                            <button ref-custom-button>Click me</button>
                        </div>`,
                initializeComponents: function() {
                    var that = this;

                    that.element.find("[ref-custom-button]").kendoButton({
                        click: function(e) {
                            console.log("Custom button clicked", e);
                        }
                    });
                }
            }]
    })
    </script>

### views.viewTemplate `String|Function`

The template of the view content. It can be a string, a function or a Kendo Template.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        views: [
            {
                type: 'prompt',
                promptSuggestions: [
                    "Act as [actor] and write [format] about [subject] in [100 words]",
                    "Suggest post about [subject] that will be used in [social media].",
                ],
            },
            "output",
            {
                type: 'commands',
                promptCommands: [

                    { id: "1", text: "Simplify", icon: "min-width" },
                    { id: "2", text: "Extend", icon: "arrows-left-right" },
                ]
            },

            {
                name: "custom",
                type: "custom",
                buttonIcon: "pencil",
                buttonText: "Custom View from Options",
                viewTemplate: () => "<div class='custom-view'>Custom View</div>",
                footerTemplate: () => `<div class="k-actions k-actions-start k-actions-horizontal k-prompt-actions">
                            <button ref-custom-button>Click me</button>
                        </div>`,
                initializeComponents: function() {
                    var that = this;

                    that.element.find("[ref-custom-button]").kendoButton({
                        click: function(e) {
                            console.log("Custom button clicked", e);
                        }
                    });
                }
            }]
    })
    </script>

### views.footerTemplate `String|Function`

The template of the view footer. It can be a string, a function or a Kendo Template.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        views: [
            {
                type: 'prompt',
                promptSuggestions: [
                    "Act as [actor] and write [format] about [subject] in [100 words]",
                    "Suggest post about [subject] that will be used in [social media].",
                ],
            },
            "output",
            {
                type: 'commands',
                promptCommands: [

                    { id: "1", text: "Simplify", icon: "min-width" },
                    { id: "2", text: "Extend", icon: "arrows-left-right" },
                ]
            },

            {
                name: "custom",
                type: "custom",
                buttonIcon: "pencil",
                buttonText: "Custom View from Options",
                viewTemplate: () => "<div class='custom-view'>Custom View</div>",
                footerTemplate: () => "<div class='custom-footer'>Custom Footer</div>",
                initializeComponents: function() {
                    console.log("initialize components in custom view");
                }
            }]
    })
    </script>

### views.initializeComponents `Function`

A function that is executed when the view is rendered. It is used to initialize the components of the view with a custom content template.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        views: [
            {
                type: 'prompt',
                promptSuggestions: [
                    "Act as [actor] and write [format] about [subject] in [100 words]",
                    "Suggest post about [subject] that will be used in [social media].",
                ],
            },
            "output",
            {
                type: 'commands',
                promptCommands: [

                    { id: "1", text: "Simplify", icon: "min-width" },
                    { id: "2", text: "Extend", icon: "arrows-left-right" },
                ]
            },

            {
                name: "custom",
                type: "custom",
                buttonIcon: "pencil",
                buttonText: "Custom View from Options",
                viewTemplate: () => "<div class='custom-view'>Custom View</div>",
                footerTemplate: () => `<div class="k-actions k-actions-start k-actions-horizontal k-prompt-actions">
                            <button ref-custom-button>Click me</button>
                        </div>`,
                initializeComponents: function() {
                    var that = this;

                    that.element.find("[ref-custom-button]").kendoButton({
                        click: function(e) {
                            console.log("Custom button clicked", e);
                        }
                    });
                }
            }]
    })
    </script>

### views.promptCommands `Array`

The commands to display in the prompt view.

### views.promptCommands.id `String`

The id of the command item.

### views.promptCommands.text `String`

The text of the command item.

### views.promptCommands.icon `String`

The icon name of the command item.

### messages `Object`

The text messages displayed in the component. Use this option to customize or localize the messages.

### messages.commandsView `String` *(default: "")*

The text of the commands view button in the ToolBar.

### messages.copyOutput `String` *(default: "Copy")*

The text of the copy output button in the output element.

### messages.customView `String` *(default: "Custom View")*

The text of the custom view button in the ToolBar.

### messages.generateOutput `String` *(default: "Generate")*

The text of the generate output button in the prompt view footer.

### messages.outputRetryTitle `String` *(default: "Generated with AI")*

The title of the output card when the output is generated after clicking the retry button of an output.

### messages.outputTitle `String` *(default: "Generated with AI")*

The title of the output card when the output is generated.

### messages.outputView `String` *(default: "Output")*

The text of the output view button in the ToolBar.

### messages.promptPlaceholder `String` *(default: "Ask or generate content with AI")*

The placeholder text of the textarea input of the prompt view.

### messages.promptSuggestions `String` *(default: "Prompt Suggestions")*

The text of the prompt suggestions toggle button in the prompt view.

### messages.promptView `String` *(default: "Ask AI")*

The text of the prompt view button in the ToolBar.

### messages.retryGeneration `String` *(default: "Retry")*

The text of the retry generation button in the output card.

### messages.ratePositive `String` *(default: "")*

The text of the positive rating button in the output card.

### messages.rateNegative `String` *(default: "")*

The text of the negative rating button in the output card.

### messages.stopGeneration `String` *(default: "Stop Generation")*

The aria-label and title of the stop generation button that appears during streaming operations.

## Methods

### activeView

Changes the active view. If no argument is provided, the method returns the index of the active view.

#### Example
    <div id="aiprompt"></div>
    <script>
    var aiprompt = $("#aiprompt").kendoAIPrompt().data("kendoAIPrompt");
    aiprompt.activeView(1);
    setTimeout(() => {
        aiprompt.activeView("prompt")
    }, 1000);
    </script>

#### Parameters

##### view `Number|String`

The index of the active view or the name of the view to show. If no argument is provided, the method returns the index of the active view.

### addPromptOutput

Adds a prompt output to the `promptOutputs` collection. If the active view is `OutputView`, calls the view's `addPromptOutput` method.

#### Parameters

##### promptOutput `Object`

The prompt output to add. The output should have the following properties:

- `output` - The output content generated from the prompt.
- `prompt` - The prompt text used to generate this output.
- `id` - *Optional* - The id of the prompt output. If none is provided, the id will be generated as a `kendo.guid()`. The ID is rendered as data-id attribute in the prompt output.
- `isLoading` - *Optional* - Whether the output is in loading state (shows skeleton). Default: `false`
- `isStreaming` - *Optional* - Whether the output is being streamed. Default: `false`
- `isRetry` - *Optional* - Whether this output is from a retry operation. Default: `false`

#### Example
    <div id="aiprompt"></div>
    <script>
    var aiprompt = $("#aiprompt").kendoAIPrompt({ activeView: 1 }).data("kendoAIPrompt");
    aiprompt.addPromptOutput({ prompt: "create object 1", output: "Description 1" });
    </script>

#### Example - Adding streaming output
    <div id="aiprompt"></div>
    <script>
    var aiprompt = $("#aiprompt").kendoAIPrompt({ activeView: 1 }).data("kendoAIPrompt");

    // Add output in loading state for streaming
    var outputId = kendo.guid();
    aiprompt.addPromptOutput({
        id: outputId,
        prompt: "Generate a story",
        output: "",
        isLoading: true,
        isStreaming: true
    });

    // Start streaming - this will show the stop button
    aiprompt.startStreaming();

    // Simulate streaming updates
    setTimeout(() => {
        aiprompt.updatePromptOutputContent("Once upon a time...", outputId);
    }, 1000);

    setTimeout(() => {
        aiprompt.updatePromptOutputContent("Once upon a time, there was a brave knight...", outputId);
        aiprompt.stopStreaming(); // Stop streaming and show final content
    }, 3000);
    </script>

### getViews

Returns an array of views of the AIPrompt.

#### Returns

`Array` An array of views of the AIPrompt.

### updatePromptOutputContent

Updates the content of a specific prompt output or the most recent output. This method is typically used during streaming operations to update content in real-time.

#### Parameters

##### content `String`

The new content to display.

##### outputIdOrElement `String|Object` *(optional)*

The output ID (string) or output element/object to update. If not provided, updates the most recent output.

#### Example
    <div id="aiprompt"></div>
    <script>
    var aiprompt = $("#aiprompt").kendoAIPrompt().data("kendoAIPrompt");

    // Update most recent output
    aiprompt.updatePromptOutputContent("Updated content");

    // Update specific output by ID
    aiprompt.updatePromptOutputContent("Updated content", "output-id-123");
    </script>

### startStreaming

Starts streaming mode for the component. This shows the stop generation button and sets up the UI for real-time content updates.

#### Example
    <div id="aiprompt"></div>
    <script>
    var aiprompt = $("#aiprompt").kendoAIPrompt().data("kendoAIPrompt");
    aiprompt.startStreaming();
    </script>

### stopStreaming

Stops streaming mode for the component. This hides the stop generation button, shows regular action buttons, and applies final content templates.

#### Example
    <div id="aiprompt"></div>
    <script>
    var aiprompt = $("#aiprompt").kendoAIPrompt().data("kendoAIPrompt");
    aiprompt.stopStreaming();
    </script>

## Events

### commandExecute

Triggered when a command item from the Commands view is clicked. The panel bar dataItem of the selected item is available through the event argument.

### promptRequest

Triggered when the prompt view Generate output button is clicked. The prompt text is available through the event argument. Suitable to make a request to the AI service to receive an output. Use the `addPromptOutput` method to add the generated output to the `promptOutputs` collection.

The `prompt`, `output`, `history` and `isRetry` properties are available in the event argument. When the output is generated after clicking the retry button of an output, the `isRetry` property is `true` and the `output` property is the output content of the output card. The history property is an array of prompt outputs generated before the current output.

You can prevent the default behavior of the `promptRequest` event by calling `e.preventDefault()` in the event handler.

### promptResponse

Triggered when the AI service response is received. The response data is available through the event argument. Triggered only when the `serviceUrl` option is set.

You can prevent the default behavior of the `promptResponse` event by calling `e.preventDefault()` in the event handler.

#### Event Data

##### e.output `Object`

The output object containing the AI service response data with the following properties:

- `output` - The generated text content from the AI service
- `prompt` - The original prompt text that was sent to the AI service
- `id` - The unique identifier for the output
- `isRetry` - Whether this is a retry operation
- `activeView` - The index of the view to activate after adding the output
- `isLoading` - Whether the output is in loading state
- `isStreaming` - Whether the output is being streamed

##### e.prompt `String`

The original prompt text that was sent to the AI service.

##### e.outputId `String`

The unique identifier for the output.

##### e.isRetry `Boolean`

Whether this is a retry operation.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        service: "/api/llm",
        promptResponse: function(e) {
            console.log("AI Response received:");
            console.log("Output object:", e.output);
            console.log("Generated content:", e.output.output);
            console.log("Output ID:", e.outputId);
            console.log("Original prompt:", e.prompt);
            console.log("Is retry:", e.isRetry);
        }
    });
    </script>

### outputRatingChange

> **Note:** This event is deprecated. Use the [`outputAction`](#outputaction) event instead.

Triggered when the rating of an output is changed through the rate buttons of an output. The output id and the new rating are available through the event argument.

### outputCopy

> **Note:** This event is deprecated. Use the [`outputAction`](#outputaction) event instead.

Triggered when the copy output button of an output is clicked. The `prompt` and the `output` object are available through the event argument.

### outputAction

Triggered when an action button on an output card is clicked. This event is fired for both built-in and custom actions.

#### Event Data

##### e.command `String`

The command identifier of the clicked action.

##### e.outputId `String`

The unique identifier of the output associated with the action.

##### e.output `String`

The output text content associated with the action.

##### e.prompt `String`

The prompt text that was used to generate the output.

##### e.button `jQuery`

The jQuery element of the clicked button.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        outputActions: ["copy", "retry", { command: "bookmark", icon: "bookmark" }],
        outputAction: function(e) {
            console.log("Action:", e.command, "Output ID:", e.outputId, "Output:", e.output, "Prompt:", e.prompt);

            if (e.command === "bookmark") {
                // Handle custom bookmark action
                console.log("Bookmarking output with ID:", e.outputId);
                console.log("Output content:", e.output);
                console.log("Original prompt:", e.prompt);
                return false; // Prevent default handling
            }
            // Return true or don't return to allow default handling
        }
    });
    </script>

### promptRequestCancel

Triggered when a prompt request is cancelled, typically by clicking the stop generation button during streaming operations.

#### Event Data

##### e.output `Object` *(optional)*

The output object being generated when the cancellation occurred.

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        promptRequestCancel: function(e) {
            console.log("Request cancelled for output:", e.output);
            // Abort any ongoing API requests here
        }
    });
    </script>

