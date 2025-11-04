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



<div class="meta-api-description">
How do I enable user interaction with the inline AI prompt input in Kendo UI? Control whether users can interact with or edit the inline AI prompt input area by enabling or disabling the input field, configuring the component to accept or block text entry, setting the text area as editable or read-only, managing user input permissions, toggling input activation, programmatically allowing or preventing typing or modifications within the inline prompt, adjusting interactive states for inline AI text inputs, and setting input availability at initialization for dynamic control over user text entry.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        enable: false
    });
    </script>

### readonly `Boolean` *(default: false)*

Specifies whether the underlying TextArea widget will be readonly or not.


<div class="meta-api-description">
How do I set an inline AI prompt to read-only in Kendo UI for jQuery? control or configure editing permissions for an embedded text input area, set or enforce read-only mode to prevent user modifications, enable or disable user interaction with text fields, restrict content changes in inline AI prompts or text components, manage whether text areas are editable or locked, specify boolean flags to toggle writable or readonly states during initialization, implement input protection to block user edits, ensure text content remains unchanged by disabling editing capabilities, configure access rights to text input sections in interface components, and govern text modification options within inline text prompts or fields.
</div>

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


<div class="meta-api-description">
How to configure encoded prompt outputs in Kendo UI InlineAIPrompt component? Control how prompt outputs display by configuring output encoding options that determine whether the text appears as plain HTML-encoded content or as raw HTML allowing custom formatting and embedded markup like markdown rendering. Enable or disable HTML encoding to switch between safe text display that prevents injection or script execution versus rich, formatted output with full HTML rendering, remembering to sanitize raw HTML outputs to avoid security risks such as XSS. Customize output presentation by setting encoding flags that govern whether the interface renders escaped text for safe display or interprets and renders HTML tags, useful for developers seeking flexible inline prompt output behaviors, secure display configurations, or advanced output rendering for interactive content.
</div>

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


<div class="meta-api-description">
How do I set a custom placeholder in an InlineAIPrompt control? Configure the input field’s hint text, placeholder text, or input prompt shown inside the text area, enabling you to set custom guidance, example text, or accessibility hints that appear before user input. Control or customize the gray prompt message or default inline instructions that guide users on what to type or expected input format in chat boxes, AI prompts, or text fields. Enable setting placeholder content to improve user experience by showing temporary, faded input tips, help text, or contextual clues within editable areas before any text is entered. Use this to define or update the initial, inline placeholder string or label used in text input components for conversational UI, AI prompt inputs, or any textarea-based user interface elements.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        placeholder: "Type in an AI prompt..."
    });
    </script>

### service `Object`
The AI service to use for generating outputs.


<div class="meta-api-description">
How do I change the AI service in Kendo UI's InlineAIPrompt? Select or configure the AI engine, provider, or backend that handles prompt processing and output generation, enabling seamless switching between different AI models, APIs, services, or endpoints for inline AI tasks. Control which artificial intelligence implementation processes the prompt, route requests to preferred AI platforms, customize service connections, and adjust provider settings to optimize or swap generation sources based on needs, integrations, or performance preferences.
</div>

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


<div class="meta-api-description">
How do I set up the URL for connecting to an external AI service in Kendo UI's InlineAIPrompt? Configure the URL or endpoint address for connecting to an external AI service or model to send prompts and receive generated responses, enabling integration with remote language models via HTTP or HTTPS APIs, setting the target server address for prompt processing, specifying where the AI component should forward input queries for inference, controlling the external AI service location used for generating output, and directing the system to call a particular AI API endpoint for executing prompt requests and retrieving results.
</div>

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


<div class="meta-api-description">
How do I add custom HTTP headers to InlineAIPrompt service calls for authentication? Configure custom HTTP headers for AI service calls to include authorization tokens, API keys, bearer tokens, content types, or any additional metadata needed for request authentication or customization when sending prompts through InlineAIPrompt. Control, set, or enable header fields such as Authorization, Content-Type, or custom key-value pairs to ensure proper communication, security, and integration with AI-driven APIs and services during inline prompt interactions.
</div>

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


<div class="meta-api-description">
How to add custom data to AI requests with Kendo UI InlineAIPrompt? Add custom data, metadata, or extra parameters such as JSON objects or strings to AI requests by attaching additional payloads with the service data field, enabling you to pass contextual information, configure AI calls, include supplementary options, or send arbitrary content alongside the prompt for enhanced processing and tailored responses within AI service initialization and request handling.
</div>

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


<div class="meta-api-description">
How do I handle different AI service response formats with Kendo UI's InlineAIPrompt? Configure how to extract and process the main content or usable result from raw AI service responses by defining a custom function to parse, map, or normalize different provider-specific response formats such as nested JSON, arrays of choices, text fields, or other complex data structures, enabling consistent output retrieval, transformation, filtering, error handling, or customization for display or further processing according to varied API response shapes and developer needs.
</div>

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


<div class="meta-api-description">
How to customize animation for opening and closing of an inline AIPrompt popup in Kendo UI? Control and customize the appearance and behavior of a floating or modal popup triggered inline, including how to set its position on the screen, enable or disable animations for opening and closing, configure modal versus non-modal interactions, adjust timing or delays for display, and manage user interactions such as clicks or focus outside to control visibility. Developers can configure popup initialization parameters to fine-tune placement, visual effects, interaction modes, and lifecycle events for embedded or inline interface elements that require contextual prompt displays, tooltips, or dynamic overlays. This enables flexible adjustments to popup behavior like controlling where it appears relative to target elements, how it enters and exits the viewport, whether it blocks background interaction, and when it opens or closes based on user interaction or programmatic triggers.
</div>

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


<div class="meta-api-description">
How do I adjust the width of the popup in an inline AI prompt using Kendo UI? Adjust the horizontal dimension, width, or size of a popup overlay, tooltip, or modal window in inline AI prompt interfaces to control layout spacing, alignment, and visual structure. Set or configure the popup container’s width dynamically or statically to optimize user interface composition, ensure proper fit within the viewport, prevent overflow, and manage space allocation for inline AI input prompts, tooltips, or contextual message boxes. Enable customization of popup width for responsive design, seamless integration, alignment consistency, and tailored presentation during runtime or initialization of inline prompt components.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        popup: {
            width: 400
        }
    });
    </script>

### popup.height `Number | String`

Specifies the height of the Popup.


<div class="meta-api-description">
How do I set the height of an AI prompt popup in Kendo UI for jQuery? Adjust or configure the vertical size, height, or visible dimension of an AI prompt popup window or dialog to control how tall the popup appears on screen, enabling customization of layout, scrolling behavior, overflow handling, and user interface space allocation for inline AI suggestion panels or inline prompt components. This setting helps manage the popup’s display height, limiting or expanding its visible portion to fit design requirements or user preferences, accommodating different content lengths, and controlling user interaction areas within embedded AI assistant interfaces or inline prompt dialogs.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        popup: {
            height: 300
        }
    });
    </script>

### popup.animation `Boolean | Object`

Configures the opening and closing animations of the popup. The same limitations apply as the originating widget's [`animation`](/api/javascript/ui/popup/configuration/animation) configuration.


<div class="meta-api-description">
How can I customize the animation effects for popup overlays in Kendo UI's Inline AIPrompt component? Control and customize the animation effects for popup overlays including entry and exit transitions, duration timing, easing curves, fade-ins, slide-ins, and other opening and closing visual behaviors. Configure how popup elements animate on display and dismissal, adjusting animation speed, style, and smoothness to create dynamic or subtle visual cues for user interactions. Enable setting animation parameters for layered interface prompts or modal windows, optimizing appearance and disappearance effects to tailor user experience with flexible motion control. Define transitions that govern popup visibility changes, including built-in or custom animation sequences that dictate popup show and hide behavior consistently across UI components.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        popup: {
            animation: {
                open: { effects: "fade:in", duration: 300 },
                close: { effects: "fade:out", duration: 200 }
            }
        }
    });
    </script>

### popup.appendTo `String|jQuery` *(default: document.body)*

Which element the popup will be appended to. The principles apply as per the widget's originating [`appendTo`](/api/javascript/ui/popup/configuration/appendto) configuration.


<div class="meta-api-description">
How to customize the positioning of Kendo UI's inline AI prompt popup in my application? Configure where the inline AI prompt popup is rendered in the DOM by specifying the target container element for appending, enabling control over popup placement, layering, and stacking context by attaching it to elements such as the document body, a parent container, or a custom wrapper. Developers can set or change the target node to manage z-index conflicts, positioning relative to components, or to isolate styles and behavior by choosing different DOM anchors where the popup appears, ensuring flexible integration in various UI structures. This includes options to override default append targets, control overlay hierarchies, and tailor the popup’s attachment for responsive layouts or complex nested interfaces.
</div>

#### Example

    <div id="container"></div>
    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        popup: {
            appendTo: "#container"
        }
    });
    </script>

### speechToText `Boolean|Object` *(default: false)*

Configures speech-to-text functionality for the prompt input. When `true`, enables speech-to-text with default settings. When `false`, disables the feature. When an object, configures custom speech-to-text options.


<div class="meta-api-description">
How do I enable voice recognition in Kendo UI InlineAIPrompt component? Enable or disable voice recognition and live transcription for input fields, configure speech-to-text settings including language selection, continuous or real-time listening, interim text updates, and customize microphone input behavior for voice-driven interactions, dictation, or hands-free control within prompt components, supporting flexible speech input options for natural language processing and voice command features.
</div>

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


<div class="meta-api-description">
How do I configure speech-to-text integration mode in Kendo UI's Inline AIPrompt widget? Configure speech recognition mode to enable live browser-based voice input using the Web Speech API or to activate a microphone interface that functions as a visual control without capturing audio, allowing control over enabling, disabling, or simulating speech-to-text functionality, speech input integration, voice recognition settings, microphone interaction options, audio capture on or off, testing UI behavior without actual recording, and toggling between active speech transcription or passive audio interface modes.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        speechToText: {
            integrationMode: "webSpeech"
        }
    });
    </script>

### speechToText.lang `String` *(default: "en-US")*

Specifies the language code for speech recognition.


<div class="meta-api-description">
How do I set the language for speech-to-text in Kendo UI's InlineAIPrompt component? Configure or specify the speech recognition language or locale to enable accurate voice input, transcription, and speech-to-text conversion in the desired language variant, such as setting language codes like "en-US" or "fr-FR" for controlling the speech-to-text engine’s recognition accuracy, matching user language preferences, enabling voice commands, supporting multilingual audio transcription, language detection, localization of speech input, and adjusting recognition settings for different spoken dialects or regional accents.
</div>

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


<div class="meta-api-description">
How do I set Kendo UI's InlineAIPrompt to continuously capture audio for ongoing speech recognition? Enable or disable continuous audio capture and speech recognition to keep the microphone active for ongoing voice input, control whether the system listens persistently or stops after processing a single speech result, configure real-time transcription to handle streaming audio without interruption, set the speech recognition mode to continuous or single-shot, manage voice input sessions by maintaining or terminating audio capture automatically after each transcription, adjust settings for uninterrupted dictation or pause between phrases, optimize voice command handling with persistent microphone listening, set up seamless speech-to-text conversion with ongoing audio processing, and determine if voice recognition runs continuously or resets after each response.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        speechToText: {
            continuous: true
        }
    });
    </script>

### speechToText.interimResults `Boolean` *(default: false)*

Specifies whether to return interim results during speech recognition.


<div class="meta-api-description">
How can I enable live speech recognition updates in Kendo UI's InlineAIPrompt? Enable live streaming transcription and real-time partial speech recognition results that update dynamically as the user talks, providing immediate, ongoing transcripts rather than waiting for complete or final speech-to-text processing. Configure continuous, interim transcription output for interactive voice input scenarios, allowing partial, incremental speech-to-text feedback to appear instantly, supporting use cases where developers want in-progress transcripts, live dictation previews, or immediate speech recognition updates during audio input.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        speechToText: {
            interimResults: true
        }
    });
    </script>

### speechToText.maxAlternatives `Number` *(default: 1)*

Specifies the maximum number of alternatives to return from speech recognition.


<div class="meta-api-description">
How do I configure Kendo UI inline AIPrompt to return multiple speech-to-text transcription results? Control the maximum number of alternative speech-to-text transcription results returned by a recognizer, enabling configuration of multiple hypothesis outputs for improved recognition accuracy, confidence scoring, user interface choice selection, or further processing. Adjust the limit on alternative transcriptions to capture varied interpretations of audio input, support comparison of recognition options, optimize downstream natural language processing, and enhance speech recognition flexibility by setting thresholds on the quantity of returned hypotheses from voice-to-text systems in conversational AI, voice command parsing, or transcription workflows.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        speechToText: {
            maxAlternatives: 3
        }
    });
    </script>

### responseTemplate `String | Function`

A template function for customizing the display of output content. This function is called when an output's and final content needs to be rendered.

The function receives an object with `output` (the output data) and `prompt` (the output prompt text) properties and should return HTML string.


<div class="meta-api-description">
How to customize AI response display in Kendo UI InlineAIPrompt? Customize the way generated AI responses are displayed by defining a function that formats, transforms, or modifies the final AI output content before rendering, enabling control over output presentation using dynamic templates, HTML generation, or string manipulation based on the AI's result and the associated prompt text, supporting use cases like custom rendering, output transformation, response formatting, or integration of AI results into tailored UI components.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        responseTemplate: (data) => `<div class="custom-response"><strong>Prompt:</strong> ${data.prompt}<br><strong>Response:</strong> ${data.output}</div>`
    });
    </script>

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


<div class="meta-api-description">
How to enable incremental AI-generated content display in Kendo UI for jQuery inline aiprompt? Control whether responses are delivered incrementally or all at once by enabling streaming mode for real-time, progressive output updating in user interfaces, allowing partial AI-generated content to appear as it processes instead of waiting for full completion. Configure live, continuous data flow from models to render or update UI components dynamically with partial incremental output, useful for scenarios where immediate feedback or stepwise text generation is needed. Streaming can be toggled to optimize responsiveness and user experience by providing on-the-fly content rendering and partial results display while bypassing static response templates, suitable for live chat, dynamic prompts, or interactive assistant features.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        isStreaming: true
    })
    </script>

### systemPrompt `Function`

Sets the systemPrompt's format which will be send to the specified AI Service. Exposes both a `context` and `prompt` metadata.


<div class="meta-api-description">
How to customize system prompts in Kendo UI inlineaiprompt? Control and customize system-level instructions sent to AI services by configuring how system prompts, contextual metadata, and prompt text are formatted, structured, serialized, and packaged in requests. Enable setting detailed system instructions, manage surrounding context, embed structured metadata like context and prompt fields, and adjust the delivery format to influence AI response behavior. Configure, enable, or set system instruction templates, control prompt payload composition, manage serialization methods, and tailor how context information is combined with prompts for precise AI interaction.
</div>

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


<div class="meta-api-description">
How to customize the command list in the Kendo UI inline AI prompt's context menu? Configure and customize the command list displayed in the inline AI prompt’s context menu, enabling control over which actions appear, their order, and availability; manage adding or removing entries, assign keyboard shortcuts, set up event handlers, and tailor context menu behavior for prompt-specific interactions, allowing customization of menu commands, shortcuts, responsive actions, and user workflows within inline AI prompting environments.
</div>

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


<div class="meta-api-description">
How do I assign a unique identifier to command items in Kendo UI Inline AIPrompt? Assign or configure a unique identifier for command items to enable precise referencing, updating, triggering, removing, or finding commands within interactive prompts or AI-driven command interfaces, supporting programmatic control, event handling, and dynamic command management during initialization or runtime.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        commands: [{
            id: "summarize",
            text: "Summarize",
            icon: "file-text"
        }]
    });
    </script>

### commands.text `String`

The text of the command item.


<div class="meta-api-description">
How do I customize the command text in Kendo UI's InlineAIPrompt? Configure the display name, caption, or label text for command items within an inline AI prompt interface, enabling control over the visible wording or title shown to users for each command action; supports dynamic updates and bindings to customize or change the command text string, control UI command labels, set button captions, modify command names, and manage the textual representation of commands in a collection for integrated AI-driven interactions.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        commands: [{
            id: "translate",
            text: "Translate to Spanish",
            icon: "translate"
        }]
    });
    </script>

### commands.icon `String`

The icon name of the command item.


<div class="meta-api-description">
How do I customize the icons for command buttons in an inline AI prompt? Set or customize the visual representation of command buttons by specifying icon names, icon classes, or image identifiers to display graphical symbols next to commands, including configuring which icon appears for inline commands, menu options, or toolbar items using common icon frameworks, CSS classes, or custom icon sets, enabling control over the appearance of interactive elements in user interfaces, and allowing developers to assign, change, or override icons for better clarity, branding, or accessibility in inline AI prompts or command palettes.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        commands: [{
            id: "explain",
            text: "Explain",
            icon: "info-circle"
        }]
    });
    </script>

### commands.prompt `Function`

The prompt that will be composed for the command.


<div class="meta-api-description">
How do I customize the command input prompt in an inline AI interaction using Kendo UI for jQuery? Configure and customize the text, templates, or dynamic content that forms the command input or user prompt within an inline AI interaction, enabling control over how the prompt is phrased, assembled, or generated at runtime for commands. This includes setting or adjusting prompt wording, template variables, and dynamic prompt construction to tailor the AI’s request or command invocation text in real time or within templates, supporting flexible, programmable, or context-aware prompt generation for inline AI components.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        commands: [{
            id: "summarize",
            text: "Summarize",
            icon: "file-text",
            prompt: (context) => `Please summarize the following text: ${context.selectedText}`
        }]
    });
    </script>

### commands.items `Object`

Allows nesting commands in a hierarchical manner.


<div class="meta-api-description">
How do I configure nested command items in an inline AI prompt? Configure hierarchical nested command items, subcommands, and grouped multi-level menus for dynamic inline AI prompts, enabling complex command trees, menu structures, and nested actionable elements within inline prompt components, set up during initialization for flexible command organization and interaction control.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        commands: [{
            id: "translate",
            text: "Translate",
            icon: "translate",
            items: [
                { id: "translate-es", text: "Spanish", prompt: (context) => `Translate to Spanish: ${context.selectedText}` },
                { id: "translate-fr", text: "French", prompt: (context) => `Translate to French: ${context.selectedText}` }
            ]
        }]
    });
    </script>

### outputActions `Array` *(default: ["copy", "retry", "discard"])*

An array of action configurations for the output cards. Can contain strings for built-in actions or objects with custom action properties.

**Built-in actions:**
- `"copy"` - Copy output content to clipboard.
- `"retry"` - Retry generating the output.
- `"discard"` - Clears the output content and closes the popup.

Custom actions trigger the `outputAction` event with the action command and output data.


<div class="meta-api-description">
How to customize output actions in Kendo UI for jQuery InlineAIPrompt component? Control, configure, and customize which interactive actions appear on AI-generated output cards, including built-in options like copying content to the clipboard, retrying the generation process, discarding or clearing output, and closing popups, as well as defining and enabling custom commands or behaviors through action arrays containing strings or detailed objects; manage user interactions with output such as copying text, retrying failed or unsatisfactory results, discarding outputs, and handling custom event-driven commands to fully tailor output card functionality and user experience.
</div>

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


<div class="meta-api-description">
How do I specify a unique command identifier for an inline AI prompt in Kendo UI? Configure or set a unique command identifier string to specify and distinguish the triggered action within inline AI prompt components, enabling easy recognition, routing, filtering, matching, or handling of user interactions and output events by associating each action with a distinct command name or key in event payloads.
</div>

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


<div class="meta-api-description">
How can I customize the text on action buttons in an Inline AI Prompt? Customize the visible text or label displayed on action buttons within interactive prompt components to control call-to-action captions, button names, or user-facing tags for accessibility and localization purposes, enabling developers to define, set, configure, or change the exact wording or string that users see on buttons during inline AI interactions or workflows.
</div>

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


<div class="meta-api-description">
How to customize the icon on an inline AI prompt output action button in Kendo UI for jQuery? Control and customize the graphical symbol or glyph shown on action buttons within an inline AI prompt interface by specifying icon identifiers, enabling configuration of visual button markers using standard icon sets or CSS classes such as search, settings, or other UI glyphs. Adjust, set, or override the displayed icon for output action buttons to match desired UI elements, enhance user interaction cues, or visually represent specific functions. Use recognizable icon names, icon strings, or CSS icon classes to define which symbol appears on inline action controls, supporting consistent styling and intuitive interface feedback. Manage iconography on inline prompt buttons to improve visual clarity, branding, or user guidance in workflows that output actions or commands.
</div>

#### Example
    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        outputActions: [
            { command: "bookmark", text: "Bookmark", icon: "star" },
            { command: "share", text: "Share", icon: "share" }
        ]
    });
    </script>

### outputActions.fillMode `String`

Specifies the fill mode of the action button. Available options: `"solid"`, `"outline"`, `"flat"`, `"none"`.


<div class="meta-api-description">
How do I customize the appearance of interactive buttons within an inline AI prompt using Kendo UI for jQuery? Customize and control the appearance of interactive buttons within AI prompt interfaces by setting fill styles such as solid fills, outlined borders, flat design without shadows, or completely transparent backgrounds. Adjust button visual designs for background color intensity, border visibility, shadow or elevation effects, and overall fill treatments to match UI themes or accessibility preferences. Enable different button looks ranging from fully colored solid buttons, minimal outline-only buttons, flat buttons without depth, or no fill for seamless integration in prompts and action menus. Configure styles to influence user interactions, interface prominence, or visual hierarchy in form controls, inline prompts, and dynamic action components.
</div>

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


<div class="meta-api-description">
How to set button corner radius for output actions in Kendo UI InlineAIPrompt? Adjust button shape styling by configuring border radius for action buttons, enabling choices between small, medium, large, full pill-shaped, or square corners to customize UI button roundness, shape, or curvature for inline AI prompt actions; set or control button corner radius with predefined size options to achieve consistent visual appearance, including rounded or sharp edges for action elements in interactive prompts, allowing developers to tailor button aesthetics by specifying roundness levels for output action controls within inline AI interfaces.
</div>

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


<div class="meta-api-description">
How do I customize the appearance of interactive buttons within an inline AI prompt using Kendo UI for jQuery? Customize and control the appearance of interactive buttons within AI prompt interfaces by setting fill styles such as solid fills, outlined borders, flat design without shadows, or completely transparent backgrounds. Adjust button visual designs for background color intensity, border visibility, shadow or elevation effects, and overall fill treatments to match UI themes or accessibility preferences. Enable different button looks ranging from fully colored solid buttons, minimal outline-only buttons, flat buttons without depth, or no fill for seamless integration in prompts and action menus. Configure styles to influence user interactions, interface prominence, or visual hierarchy in form controls, inline prompts, and dynamic action components.
</div>

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


<div class="meta-api-description">
How do I customize the color of action buttons in an inline AI prompt using Kendo UI? Adjust, configure, or customize the color scheme and visual emphasis of action buttons within prompts by selecting from a range of semantic theme colors including primary, secondary, tertiary, success, warning, error, info, light, dark, base, or inverse tones to control the button’s appearance, highlight, or style for varying UI contexts, alert levels, or user interaction cues in inline AI prompt interfaces.
</div>

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


<div class="meta-api-description">
How do I customize the hover tooltip text for action buttons in an inline AI prompt interface? Configure or customize the hover tooltip text, mouse-over descriptions, or focus hints for action buttons in inline AI prompt interfaces, enabling descriptive labels or brief explanations that appear when users point to or focus on the button element. Control and set the HTML title attribute or accessible tooltip content to provide contextual guidance, improve user experience, enhance accessibility, and clarify the button's function through customizable, configurable text displayed on hover or keyboard focus interactions within inline action prompts.
</div>

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


<div class="meta-api-description">
How can I customize the button text labels for sending and stopping outputs in my Kendo UI inline AI prompt interface? Customize, configure, or set the button text labels for sending and stopping outputs in AI prompt interfaces, localize or translate user interface messages for inline AI prompts, control and personalize prompt interaction texts, modify button captions for start and halt actions in prompts, support multilingual adaptations of AI prompt controls, adjust wording for sending and stopping AI-generated content, tailor interface message strings for inline AI prompts, enable different language and phrasing options for prompt buttons, manage localization and customization of interactive prompt message texts, adapt control labels to fit specific language or user preferences.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        messages: {
            promptSend: "Send Message",
            stopOutputRetrieval: "Stop Generation"
        }
    });
    </script>

### messages.promptSend `String` *(default: "Prompt Send")*

The text of the prompt send button that will be used to as aria labels.


<div class="meta-api-description">
How to customize the send button label in Kendo UI inline AI prompts for better accessibility? Configure or customize the accessible label text for the send button in inline AI prompts, enabling localization, internationalization, and screen reader support for the prompt send action, so users can set, update, or control descriptive aria-label attributes that improve usability and accessibility in different languages and contexts.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        messages: {
            promptSend: "Submit Prompt"
        }
    });
    </script>

### messages.stopOutputRetrieval `String` *(default: "Stop Output Retrieval")*

The text of the stop output retrieval button that will be used to as aria labels.


<div class="meta-api-description">
How to customize the screen reader text for stopping AI output retrieval in Kendo UI inlineaiprompt? Control or customize the accessibility label and screen reader text for the button that interrupts or halts the ongoing output generation or response retrieval in an inline AI prompt interface, allowing developers to set or configure descriptive aria-label attributes that improve user experience for assistive technologies, voice control, or keyboard navigation when stopping or canceling AI response streaming or output fetching processes.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        messages: {
            stopOutputRetrieval: "Cancel Generation"
        }
    });
    </script>

### messages.commandsMenu `String` *(default: "Commands Menu")*

The text of the prompt context menu that will render the commands.


<div class="meta-api-description">
How do I customize the command menu in an inline AI prompt with Kendo UI for jQuery? Customize, translate, or localize the text labels and menu items within the command options of an inline AI prompt interface, enabling control over the displayed wording for commands, contextual actions, or interactive options in the prompt's command menu, supporting different languages, terminology customization, and adjustments to the prompt’s command labeling for improved user experience and internationalization.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        messages: {
            commandsMenu: "AI Commands"
        }
    });
    </script>

### messages.retryOutputAction `String` *(default: "Retry")*

The text of the default retry output command.


<div class="meta-api-description">
How to customize the retry button text in Kendo UI for jQuery Inline AI Prompt component? Customize the retry button text or label for inline AI prompts, control and localize the retry output message displayed to users, set or configure the retry action wording, modify the prompt’s retry message string for various languages or contexts, adjust, translate, or personalize the feedback shown when retrying AI-generated results, tailor the retry output action text to suit different UI needs or developer requirements, update the retry prompt message dynamically, change or override default retry button captions, and manage retry-related user interface messaging flexibly.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        messages: {
            retryOutputAction: "Try Again"
        }
    });
    </script>

### messages.copyOutputAction `String` *(default: "Copy")*

The text of the default copy output command.


<div class="meta-api-description">
How can I customize the copy button label in an inline AI prompt using Kendo UI for jQuery? Customize, configure, or localize the default copy button label, copy command text, or action prompt for copying generated output within inline AI prompt interfaces, enabling control over the displayed copy output button text, edit or translate the copy action label, set custom copy output messages, and adjust how users see or interact with the copy output command in AI-powered inline prompts or text generation tooltips.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        messages: {
            copyOutputAction: "Copy Text"
        }
    });
    </script>

### messages.discardOutputAction `String` *(default: "Discard")*

The text of the default discard output command.


<div class="meta-api-description">
How to customize the discard output action label in Kendo UI for jQuery Inline AI Prompt? Configure or customize the text label, message, or prompt shown when canceling, discarding, or rejecting output in inline AI interactions or prompts, enabling control over the discard, cancel, ignore, or reject command wording in different languages or locales, useful for setting localized user interface strings or display messages for output dismissal actions in conversational AI, chatbots, or inline assistant outputs.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        messages: {
            discardOutputAction: "Remove"
        }
    });
    </script>

## Methods

### open

Opens the popup at the given x and y coordinates.

> **Important**: If no coordinates are provided, then the popup will be opened in close proximity to its container.


<div class="meta-api-description">
How can I control where an inline AIPrompt appears on a webpage? Control the precise positioning of an interactive popup or overlay by specifying exact horizontal and vertical screen coordinates, enabling placement anywhere on the page unit by setting numeric X and Y values; use this method to launch or display the prompt at custom locations rather than default or container-relative positions, facilitating fine-grained control over where the popup appears based on pixel or coordinate inputs, with fallback behavior when no coordinates are supplied to position near the associated container element.
</div>

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


<div class="meta-api-description">
How can I programmatically close an inline AI prompt in Kendo UI for jQuery? Programmatically hide or dismiss an inline AI prompt overlay or input interface by invoking a method that closes the prompt, terminates any visible user input UI, ends the current prompt session, and returns the component to a hidden or inactive state; frequently used to control prompt visibility, cancel or abort the prompt display, close popup dialogs, hide overlays, or remove AI-driven interactive UI elements on demand.
</div>

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


<div class="meta-api-description">
How to start streaming output for inline AI prompts using Kendo UI for jQuery? Initiate or trigger real-time streaming output, live token display, or typing animation effects during interactive prompt responses by enabling and starting incremental result rendering, live update flows, or on-the-fly content streaming to visualize partial or streaming AI-generated text dynamically within the interface, useful when continuous or streaming mode is active and animation states need configuring for progressive data presentation from AI components.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    var inlineAiPrompt = $("#inlineaiprompt").kendoInlineAIPrompt({
        isStreaming: true
    }).data("kendoInlineAIPrompt");
    
    inlineAiPrompt.startStreaming();
    </script>


### stopStreaming

> **Important**: Applicable when the `isStreaming` configuration is explicitly set to `true`.

Stops the prompt animation for streaming.


<div class="meta-api-description">
How do I stop live streaming in an InlineAIPrompt component? Control or halt the live streaming animation, visual updates, or frame rendering of an AI prompt interface while keeping the component active and initialized; stop or disable ongoing streaming displays, streaming mode animations, or live UI refreshes during active streaming sessions, especially when streaming is enabled or configured to true, ensuring the prompt animation ceases without unmounting or resetting the component.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    var inlineAiPrompt = $("#inlineaiprompt").kendoInlineAIPrompt({
        isStreaming: true
    }).data("kendoInlineAIPrompt");
    
    inlineAiPrompt.stopStreaming();
    </script>

### updatePromptOutputContent

Updates the prompt output content.

> **Important**: Applicable when the `isStreaming` configuration is explicitly set to `true`.


<div class="meta-api-description">
How do I dynamically update the live streaming output in a Kendo UI inline AI prompt? Change or modify live streaming output text in a prompt interface, dynamically update or refresh streamed content while data is flowing, control real-time prompt display updates during active streaming sessions, adjust or override ongoing output shown in a prompt component, update partial or incremental AI-generated responses on the fly, manipulate streamed prompt output content programmatically after initialization, enable runtime changes to what appears in a streaming prompt area, interact with streamed content display when streaming mode is enabled, edit or replace prompt output content during continuous data streams, handle live output modification in user prompts configured for streaming.
</div>

#### Parameters

#### content `String`

The content that will be passed onto the output response card.

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    var inlineAiPrompt = $("#inlineaiprompt").kendoInlineAIPrompt({
        isStreaming: true
    }).data("kendoInlineAIPrompt");
    
    inlineAiPrompt.updatePromptOutputContent("Updated response content");
    </script>

### readonly

Toggles the read-only state of the underlying TextArea widget.


<div class="meta-api-description">
How do I make a Kendo UI inline AIPrompt read-only in jQuery? Control the ability to enable or disable user input by toggling the text area between editable and read-only modes, lock or unlock typing to prevent or allow content changes, programmatically switch editing states, restrict or restore user modifications on embedded text components, and manage interactive text input dynamically by setting or clearing read-only permissions on text fields.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    var inlineAiPrompt = $("#inlineaiprompt").kendoInlineAIPrompt().data("kendoInlineAIPrompt");
    inlineAiPrompt.readonly(true);
    </script>

### enable

Enables/Disables the underlying TextArea widget.


<div class="meta-api-description">
How can I programmatically enable or disable user interaction in a Kendo UI inline AI prompt? Control user interaction by enabling or disabling text input and focus within an inline AI prompt or text editor component, allowing toggling of the editable state through methods that manage whether users can type, interact, or focus on the input area; configure, set, or switch the editable mode programmatically to allow or prevent user typing, input activation, or interaction with the text widget or textarea in real-time after initialization.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    var inlineAiPrompt = $("#inlineaiprompt").kendoInlineAIPrompt().data("kendoInlineAIPrompt");
    inlineAiPrompt.enable(false);
    </script>

### value

Sets the prompt value within the underlying TextArea widget.


<div class="meta-api-description">
How do I dynamically update the prompt text in an inline AI Prompt using jQuery? Configure or modify the input content displayed in an inline AI prompt’s text area by programmatically setting or updating the prompt text value, enabling you to prefill, replace, or refresh the current text dynamically from code so that the visible input and any subsequent reading or interaction reflect the latest updated prompt content.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    var inlineAiPrompt = $("#inlineaiprompt").kendoInlineAIPrompt().data("kendoInlineAIPrompt");
    inlineAiPrompt.value("Give me the latest details about the stock market.");
    </script>

## Events

### promptRequest

Triggered before a request has been initiated to the specified service.


<div class="meta-api-description">
How to intercept and modify outgoing requests in Kendo UI's Inline AI Prompts? Configure code execution or event handling just before initiating a service call with Inline AI prompts, enabling interception of outgoing requests to inspect, modify, or log payloads, headers, metadata, or other data before communication with the AI service. Developers often seek ways to run pre-request logic, validate or augment request parameters, manipulate headers, prepare contextual data, or track request details prior to sending calls in AI integrations and prompt workflows. This functionality supports scenarios involving customizing or monitoring AI prompt service requests, debugging payload content, adding authentication tokens, or setting dynamic data before triggering external AI requests.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        promptRequest: function(e) {
            console.log("Prompt request initiated:", e.data);
        }
    });
    </script>

### promptResponse 

Triggered once a response has been sent back from the specified service.


<div class="meta-api-description">
How do I handle responses from an AI service in a Kendo UI inline AI prompt? Manage and respond to AI-generated replies or service outputs after sending prompts through an inline AI component, capturing and handling returned data or messages from external AI or machine learning services. This includes listening for asynchronous responses, processing or parsing AI answers, updating user interfaces or application state based on service replies, saving or persisting returned results for future use, and enabling workflows that depend on chained or sequential prompt-response interactions with AI systems. This event-driven mechanism supports integration with conversational AI responses, dynamic content updates, real-time feedback looping, and automation triggered by AI-generated output, making it essential for controlling and reacting to AI service communications within applications.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        promptResponse: function(e) {
            console.log("Prompt response received:", e.response);
        }
    });
    </script>

### promptRequestCancel 

Triggered when a prompt request is cancelled, typically by clicking the stop generation button during streaming operations.


<div class="meta-api-description">
How to handle cancellation of ongoing AI requests in Kendo UI InlineAIPrompt component? Handle interruptions or cancellations during AI prompt generation to detect when a streaming prompt is stopped, allowing aborting ongoing requests, preserving partial or incomplete results, updating user interface elements like stop buttons or loading indicators, managing cleanup tasks, rolling back or resetting state after prompt halts, enabling retry or restart options, responding to user-initiated stops, and ensuring graceful handling of prompt generation cancellation events for seamless user experience in interactive AI applications.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        promptRequestCancel: function(e) {
            console.log("Prompt request was cancelled");
        }
    });
    </script>

### commandExecute

Triggered once a command is selected.


<div class="meta-api-description">
How do I capture the command selection event in Kendo UI Inline AI Prompt? Detect and respond to user selections within an inline AI prompt interface by capturing the event triggered upon command activation, enabling developers to listen for chosen commands and execute related actions such as running business logic, updating user interfaces, performing navigation or routing, and triggering analytics or telemetry. Capture event details to identify which command was selected along with any associated data or payload to customize behavior dynamically when users interact with AI-driven prompts. This facilitates command handling, event-driven programming, interaction tracking, and customized response execution in applications that integrate inline AI prompt components.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        commandExecute: function(e) {
            console.log("Command executed:", e.command);
        }
    });
    </script>

### outputAction

This event will be fired with the button options that will be received, after the command has finished. Currently, these would be the `Copy`, `Retry`, and `Discard` options.


<div class="meta-api-description">
How do I handle AI-generated command completions with selectable actions in Kendo UI InlineAIPrompt? Capture and handle events triggered by AI-generated command completions that present selectable actions such as copy, retry, or discard; manage user interactions with these options to update interfaces, perform clipboard copying, initiate retries, or track telemetry, enabling seamless control over response behaviors, action buttons, and UI responses following AI prompt results.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        outputAction: function(e) {
            console.log("Output action executed:", e.action);
        }
    });
    </script>

### show 

Triggered once the component has been opened programmatically.


<div class="meta-api-description">
How can I execute code when a Kendo UI InlineAIPrompt is opened programmatically? Detect when the component opens programmatically and execute code on open events, trigger custom logic or initialization routines immediately after a programmatic display, listen for events signaling the interface has appeared to run focus control, analytics tracking, state updates, or setup tasks following programmatic activation, handle callbacks that respond to automated UI openings, capture and respond to events when the prompt is shown via API calls, manage post-open workflows including user interface focus adjustments and analytics firing right after the component is revealed through code, configure event listeners to respond to dynamic opening of interface elements and execute subsequent actions automatically.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        show: function(e) {
            console.log("InlineAIPrompt opened");
        }
    });
    </script>

### hide

Triggered once the component has been closed programmatically.


<div class="meta-api-description">
How do I detect when an Inline AIPrompt is programmatically hidden? Detect and respond to programmatic closure of interactive prompt components by monitoring events triggered when the prompt interface is hidden or dismissed without user interaction, enabling workflows such as saving drafts, resetting form inputs, restoring user focus, updating interface states, cleaning up resources, or initiating subsequent processes after the prompt is closed through code rather than user action, supporting scenarios where automation or UI logic controls prompt visibility and requires synchronization with the application state.
</div>

#### Example

    <div id="inlineaiprompt"></div>
    <script>
    $("#inlineaiprompt").kendoInlineAIPrompt({
        hide: function(e) {
            console.log("InlineAIPrompt closed");
        }
    });
    </script>