---
title: InlineAIPrompt
page_title: Configuration, methods and events of Kendo UI InlineAIPrompt component
description: Configuration options, methods and events for the Kendo UI InlineAIPrompt component.
res_type: api
component: inlineaiprompt
---


# kendo.ui.InlineAIPrompt

Represents the Kendo UI InlineAIPrompt. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### enable `Boolean` *(default: true)*

Specifies whether the underlying TextArea widget will be disabled or not.


#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        enable: false
    });
    </script>

### readonly `Boolean` *(default: false)*

Specifies whether the underlying TextArea widget will be readonly or not.

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        readonly: false
    });
    </script>

### encodedPromptOutputs `Boolean` *(default: true)*

Specifies whether the prompt outputs are HTML-encoded before being displayed in the output view. When set to true (default), the output is encoded and displayed as plain text, preventing any HTML formatting or scripts from being rendered.

> **Important**: When set to `false`, the output is rendered as raw HTML, allowing for custom formatting (such as rendering markdown as HTML). If you set this to false, you **must ensure that the output is properly sanitized to prevent XSS attacks**.

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        encodedPromptOutputs: false,
        promptResponse: function(e) {
            // Convert markdown to HTML
            let htmlOutput = markdown.toHTML(e.response.output, "Maruku");
            // Sanitize the HTML output
            if (window.DOMPurify) {
                e.response.output = DOMPurify.sanitize(htmlOutput, { USE_PROFILES: { html: true } });
            }
        }
    });
    </script>

### placeholder `String` *(default: "")*

Specifies the placeholder text for the underlying TextArea widget.

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        placeholder: "Type in an AI prompt..."
    });
    </script>

### service `Object`
The AI service to use for generating outputs.

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        service: {
            url: "/api/llm"
        }
    });
    </script>

### service.url `String`
The Url of the AI service to use for generating outputs.

#### Example
    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        service: {
            url: "/api/llm"
        }
    });
    </script>

### service.headers `Object`
The headers to send with the AI service request.

#### Example
    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
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
    <div id="inlineaiprompt"></div>
    <script>
        $("#inlineaiprompt").kendoInlineAIPrompt({
            service: {
                url: "/api/llm",
                data: {
                    "key": "value"
                }
            }
        });
    </script>

#### Example
    <div id="inlineaiprompt"></div>
    <script>
        $("#inlineaiprompt").kendoInlineAIPrompt({
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

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        service: {
            url: "/api/llm",
            outputGetter: function(response) {
                return response.output;
            }
        }
    })
    </script>

### popup `Object`

The options that will be used for the popup initialization. For more details about the available options
refer to [Popup](/api/javascript/ui/popup) documentation.

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        popup: {
            height: "500px",
            width: "800px",
            animation: {
            close: {
              effects: "fadeOut zoom:out",
              duration: 300
            },
            open: {
              effects: "fadeIn zoom:in",
              duration: 300
            }
         }
       }
    })
    </script>

### popup.width `Number | String`

Specifies the width of the Popup.

### popup.height `Number | String`

Specifies the height of the Popup.

### popup.animation `Boolean | Object`

Configures the opening and closing animations of the popup. The same limitations apply as the originating widget's [`animation`](/api/javascript/ui/popup/configuration/animation) configuration.

### popup.appendTo `String|jQuery` *(default: document.body)*

Which element the popup will be appended to. The principles apply as per the widget's originating [`appendTo`](/api/javascript/ui/popup/configuration/appendto) configuration.

### speechToText `Boolean|Object` *(default: false)*

Configures speech-to-text functionality for the prompt input. When `true`, enables speech-to-text with default settings. When `false`, disables the feature. When an object, configures custom speech-to-text options.

#### Example - Enable with default settings

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        speechToText: true
    })
    </script>

#### Example  - Custom configuration
    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        speechToText: {
            integrationMode: "webSpeech",
            lang: "en-US",
            continuous: false,
            interimResults: true,
            maxAlternatives: 1
        }
    })
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

### responseTemplate `String | Function`

A template function for customizing the display of output content. This function is called when an output's and final content needs to be rendered.

The function receives an object with `output` (the output data) and `prompt` (the output prompt text) properties and should return HTML string.

    $("#inlineaiprompt").kendoInlineAIPrompt({
           responseTemplate: function(response) {
                return `
                    <p>Prompt:</p>
                    <br/>
                    <br/>
                    <p>${response.prompt}</p>
                    <br/>
                    <br/>
                    <p><strong>Output:</strong></p>
                    <br/>
                    <br/>
                    <p><strong>${response.output}</strong></p>
                `
           },
    })
    </script>



### isStreaming `Boolean` *(default: false)*

Sets the widget in a streaming mode.

> **Important**: When set to `true`, the `responseTemplate` configuration will not be applicable.

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        isStreaming: true
    })
    </script>

### systemPrompt `Function`

Sets the systemPrompt's format which will be send to the specified AI Service. Exposes both a `context` and `prompt` metadata.

#### Parameters

##### context `String`

The context that complements the user's request. E.g: "Make the text funnier". 

##### prompt `String`

The User's prompt.

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        service: {
            url: "api/llm"
        },
        systemPrompt: (context, prompt) => `You are an advanced AI language assistant.
                                A user has selected a portion of their text and provided a query regarding how they want it modified.
                                Your task is to accurately respond to their request while preserving the original intent of the text.
                                Follow the instructions strictly and provide only the requested output unless explicitly asked to explain your changes.

                                Selected Text:
                                ${context}

                                User's Request:
                                ${prompt}

                                Response:`
    })
    </script>

### commands `Array`

The commands to display in the Prompt's Context Menu.

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        commands: [
                      {
                        id: "funnier",
                        text: "Make the text funnier with a lot of sarcasm",
                        icon: "star",
                        prompt: (selection) => `Make the following text funnier: ${selection}`
                      },
                      {
                        id: "change-tone",
                        text: "Change tone",
                        icon:() => {return kendo.ui.icon({icon: "minus", type:"svg" }) },
                        items: [
                            {
                                id: "change-tone-neutral",
                                text: "Neutral",
                                prompt: (selection) => `Adjust the tone of the following text to be more neutral while preserving its original meaning and intent.

                                        Selected Text:
                                        ${selection}`
                            },
                            {
                                id: "change-tone-friendly",
                                text: "Friendly",
                                prompt: (selection) => `Adjust the tone of the following text to be more friendly while preserving its original meaning and intent.

                                        Selected Text:
                                        ${selection}`
                            },
                            {
                                id: "change-tone-casual",
                                text: "Casual",
                                prompt: (selection) => `Adjust the tone of the following text to be more casual while preserving its original meaning and intent.

                                        Selected Text:
                                        ${selection}`
                            }
                        ]
                    }
        ]
    })
    </script>

### commands.id `String`

The id of the command item.

### commands.text `String`

The text of the command item.

### commands.icon `String`

The icon name of the command item.

### commands.prompt `Function`

The prompt that will be composed for the command.

### commands.items `Object`

Allows nesting commands in a hierarchical manner.

### outputActions `Array` *(default: ["copy", "retry", "discard"])*

An array of action configurations for the output cards. Can contain strings for built-in actions or objects with custom action properties.

**Built-in actions:**
- `"copy"` - Copy output content to clipboard.
- `"retry"` - Retry generating the output.
- `"discard"` - Clears the output content and closes the popup.

Custom actions trigger the `outputAction` event with the action command and output data.

#### Parameters

##### action `String`

The output action that has initiated the given operation.

##### content `String`

The currently present output content.

#### Example - Built-in actions
    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        outputActions: ["copy", "retry", "rating"]
    });
    </script>

#### Example - Custom actions
    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        outputActions: [
            "copy",
            "retry",
            { command: "export", text: "Export", icon: "download" },
            { command: "share", text: "Share", icon: "share" }
        ],
        outputAction: function(e) {
            if (e.action === "export") {
                // Handle export action
                console.log("Content:", e.content);
            } else if (e.command === "share") {
                // Handle share action
                console.log("Sharing output:", e.content);
            }
        }
    });
    </script>

### outputActions.command `String`

The command identifier for the action. This is used to identify the action when the `outputAction` event is triggered.

#### Example
    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        outputActions: [
            { command: "export", text: "Export", icon: "download" }
        ]
    });
    </script>


### outputActions.text `String`

The text displayed on the action button.

#### Example
    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        outputActions: [
            { command: "export", text: "Export to PDF", icon: "download" }
        ]
    });
    </script>

### outputActions.icon `String`

The icon name for the action button. Uses Kendo UI icon names.

#### Example
    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        outputActions: [
            { command: "bookmark", text: "Bookmark", icon: "bookmark" },
            { command: "share", text: "Share", icon: "share" }
        ]
    });
    </script>

### outputActions.fillMode `String`

Specifies the fill mode of the action button. Available options: `"solid"`, `"outline"`, `"flat"`, `"none"`.

#### Example
    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        outputActions: [
            { command: "primary", text: "Primary", fillMode: "solid" },
            { command: "secondary", text: "Secondary", fillMode: "outline" }
        ]
    });
    </script>

### outputActions.rounded `String`

Specifies the border radius of the action button. Available options: `"small"`, `"medium"`, `"large"`, `"full"`, `"none"`.

#### Example
    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        outputActions: [
            { command: "rounded", text: "Rounded", rounded: "full" }
        ]
    });
    </script>

    
### outputActions.fillMode `String`

Specifies the theme color of the action button. Available options: `"base"`, `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"error"`, `"info"`, `"light"`, `"inverse"`, `"dark"`.

#### Example
    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        outputActions: [
            { command: "danger", text: "Delete", themeColor: "error" },
            { command: "success", text: "Approve", themeColor: "success" }
        ]
    });
    </script>

### outputActions.themeColor `String`

Specifies the theme color of the action button. Available options: `"base"`, `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"error"`, `"info"`, `"light"`, `"inverse"`, `"dark"`.

#### Example
    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        outputActions: [
            { command: "danger", text: "Delete", themeColor: "error" },
            { command: "success", text: "Approve", themeColor: "success" }
        ]
    });
    </script>

### outputActions.title `String`

Specifies the title attribute (tooltip) for the action button.

#### Example
    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        outputActions: [
            { command: "help", icon: "question", title: "Get help with this output" }
        ]
    });
    </script>

### messages `Object`

The text messages displayed in the prompt send and stop output retrieval buttons.

### messages.promptSend `String` *(default: "Prompt Send")*

The text of the prompt send button that will be used to as aria labels.

### messages.stopOutputRetrieval `String` *(default: "Stop Output Retrieval")*

The text of the stop output retrieval button that will be used to as aria labels.

### messages.commandsMenu `String` *(default: "Commands Menu")*

The text of the prompt context menu that will render the commands.

### messages.retryOutputAction `String` *(default: "Retry")*

The text of the default retry output command.

### messages.copyOutputAction `String` *(default: "Copy")*

The text of the default copy output command.

### messages.discardOutputAction `String` *(default: "Discard")*

The text of the default discard output command.

## Methods

### open

Opens the popup at the given x and y coordinates.

> **Important**: If no coordinates are provided, then the popup will be opened in close proximity to its container.

#### Parameters

##### x `Number`

Indicates the horizontal position.

##### y `Number`

Indicates the vertical position.

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    var inlineAiPrompt = $("#inlineaiprompt").kendoInlineAIPrompt().data("kendoInlineAIPrompt");
    inlineAiPrompt.open();
    </script>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    var inlineAiPrompt = $("#inlineaiprompt").kendoInlineAIPrompt().data("kendoInlineAIPrompt");
    inlineAiPrompt.open(500, 300);
    </script>

### close

Closes the popup.

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    var inlineAiPrompt = $("#inlineaiprompt").kendoInlineAIPrompt().data("kendoInlineAIPrompt");
    inlineAiPrompt.open();
    inlineAiPrompt.close();
    </script>

### startStreaming

> **Important**: Applicable when the `isStreaming` configuration is explicitly set to `true`.

Prepares the prompt animation for streaming.


### stopStreaming

> **Important**: Applicable when the `isStreaming` configuration is explicitly set to `true`.

Stops the prompt animation for streaming.

### updatePromptOutputContent

Updates the prompt output content.

> **Important**: Applicable when the `isStreaming` configuration is explicitly set to `true`.

#### Parameters

#### content `String`

The content that will be passed onto the output response card.

### readonly

Toggles the read-only state of the underlying TextArea widget.

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    var inlineAiPrompt = $("#inlineaiprompt").kendoInlineAIPrompt().data("kendoInlineAIPrompt");
    inlineAiPrompt.readonly(true);
    </script>

### enable

Enables/Disables the underlying TextArea widget.

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    var inlineAiPrompt = $("#inlineaiprompt").kendoInlineAIPrompt().data("kendoInlineAIPrompt");
    inlineAiPrompt.enable(false);
    </script>

### value

Sets the prompt value within the underlying TextArea widget.

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    var inlineAiPrompt = $("#inlineaiprompt").kendoInlineAIPrompt().data("kendoInlineAIPrompt");
    inlineAiPrompt.value("Give me the latest details about the stock market.");
    </script>

## Events

### promptRequest

Triggered before a request has been initiated to the specified service.

### promptResponse 

Triggered once a response has been sent back from the specified service.

### promptRequestCancel 

Triggered when a prompt request is cancelled, typically by clicking the stop generation button during streaming operations.

### commandExecute

Triggered once a command is selected.

### outputAction

This event will be fired with the button options that will be received, after the command has finished. Currently, these would be the `Copy`, `Retry`, and `Discard` options.

### show 

Triggered once the component has been opened programmatically.

### hide

Triggered once the component has been closed programmatically.