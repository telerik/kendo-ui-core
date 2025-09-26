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


<div class="meta-api-description">
Configure or control the default display screen, initial panel, or starting interface by specifying either the view index number or the unique name string to determine which user interface or visual layout appears first upon initialization, enabling developers to set, select, activate, or switch the starting screen, tab, or content area for AI-driven prompts, UI components, or interactive views during component startup or when loading dynamic views in applications.
</div>

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


<div class="meta-api-description">
Configure and control the collection of response elements, messages, suggestions, or output items displayed in an AI prompt interface, enabling developers to set, update, bind, or customize which outputs appear within the prompt view. This includes managing arrays of outputs, dynamically adjusting rendered responses, handling prompt replies, controlling visible messages, and customizing prompt display content in conversational AI or chatbot applications. Use cases involve setting custom response lists, modifying displayed suggestions, updating output items on user interaction, and managing what the AI prompt reveals as output results in varied formats, contexts, or messaging frameworks.
</div>

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


<div class="meta-api-description">
Configure whether generated prompt results are automatically HTML-encoded to display as plain text or rendered as raw HTML with custom formatting; control encoding to enable or disable HTML escaping, sanitize output to prevent cross-site scripting (XSS) vulnerabilities, decide if markdown or HTML tags should be parsed and shown as formatted content or escaped for safety, set output rendering modes for secure or rich-text display, manage how AI-generated responses handle HTML entities, enable or disable safe text encoding versus raw HTML output, and control display behavior to balance security concerns with flexible formatting needs in prompt outputs.
</div>

#### Example

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



<div class="meta-api-description">
Set or customize the unique identifier for a generated prompt output to enable precise selection, referencing, or automation within the DOM; automatically create or assign IDs to outputs for targeting, querying, or manipulating specific prompt responses using custom or system-generated unique keys; control the identification of prompt results for scripting, integration, or UI interaction by configuring output element identifiers, data attributes, or selection hooks for flexible access to individual AI prompt outputs.
</div>

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


<div class="meta-api-description">
Retrieve or access the generated AI response content, including text or structured data outputs, produced after submitting a prompt, enabling reading, displaying, storing, analyzing, or further processing of the returned information from the AI prompt execution result.
</div>

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


<div class="meta-api-description">
Configure or capture the exact input text, instruction, query, or seed phrase used to generate an AI model's response, enabling developers to log, inspect, replay, or resend the original prompt that created a specific output within AI interactions. This covers saving, retrieving, or referencing the initial command or input string that drives AI reasoning or content generation, supporting debugging, auditing, prompt management, and repeated execution with consistent input across multiple AI responses.
</div>

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


<div class="meta-api-description">
Enable or disable voice dictation and speech recognition input, configure speech-to-text settings such as language selection, continuous transcription, real-time speech conversion, voice command input, and customizable options for controlling how spoken words are converted into text input, allowing flexible toggling of speech recognition features and tailored speech processing parameters for voice-enabled prompts or AI input components.
</div>

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


<div class="meta-api-description">
Configure voice input capture by selecting how speech-to-text processing integrates with your application, including options to enable real-time browser-based speech recognition or disable automatic transcription while still providing a microphone interface. Control microphone UI behavior and speech input handling by setting integration modes that support full speech recognition via Web Speech API or only display a mic button without converting spoken words to text, allowing customization of voice command processing, voice data capture, dictation, and audio input features based on user interaction and platform capabilities. Adjust settings to manage how voice commands are interpreted, whether to transcribe speech live in the browser, or to offer manual voice input without automatic speech-to-text conversion, optimizing conversational interfaces, voice accessibility features, and audio input workflows.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        speechToText: {
            integrationMode: "webSpeech"
        }
    });
    </script>

### speechToText.lang `String` *(default: "en-US")*

Specifies the language code for speech recognition.


<div class="meta-api-description">
Configure or specify the language and locale settings for speech recognition to control which language the speech-to-text engine processes, including setting language codes such as BCP-47 formats like 'en-US' or other regional variants to improve transcription accuracy, enable multilingual support, customize speech input recognition according to user language preferences, set recognition language for voice commands, dictate the spoken language the system listens for, adjust locale options for better speech-to-text results, and optimize voice transcription by defining the correct language environment.
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
Configure continuous voice recognition to keep the microphone active for ongoing speech-to-text transcription, enabling uninterrupted audio capture for real-time dictation, live speech commands, or multi-segment voice input, with options to either maintain open listening for continuous recognition or to halt processing after each detected phrase, supporting scenarios like prolonged speech processing, conversational voice interfaces, hands-free command sequences, and seamless audio-to-text conversion that requires persistent or segmented recognition control.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        speechToText: {
            continuous: true
        }
    });
    </script>

### speechToText.interimResults `Boolean` *(default: false)*

Specifies whether to return interim results during speech recognition.


<div class="meta-api-description">
Control or configure live streaming transcription outputs by enabling or disabling partial speech recognition results during voice input processing, allowing real-time display of intermediate transcriptions as someone speaks, useful for applications requiring immediate feedback before the final full transcript is available. Adjust settings to receive or suppress interim hypotheses that update dynamically during spoken phrase capture, supporting scenarios like live captioning, voice commands with continuous updates, or transcription services providing immediate partial text. Manage whether partial, in-progress speech recognition data is emitted or withheld while still processing, affecting how the system streams and updates text before the final, confirmed transcript is completed.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        speechToText: {
            interimResults: true
        }
    });
    </script>

### speechToText.maxAlternatives `Number` *(default: 1)*

Specifies the maximum number of alternatives to return from speech recognition.


<div class="meta-api-description">
Control and configure the maximum number of alternative speech recognition results or transcription hypotheses returned by a speech-to-text system, allowing you to limit n-best output hypotheses for optimizing bandwidth usage, reducing the number of recognition alternatives, managing multiple possible transcription options, customizing the amount of speech recognition candidates, and tailoring the output for improved post-processing and analysis in voice-to-text applications.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        speechToText: {
            maxAlternatives: 3
        }
    });
    </script>

### promptTextArea `Object`

Configuration options for the [Kendo UI TextArea](/api/javascript/ui/textarea) component used in the prompt view. Only specific properties from the Kendo UI TextArea are supported.


<div class="meta-api-description">
Set up and customize the multi-line text input area for prompts within AI-driven interfaces, enabling control over appearance, behavior, and supported configurations of rich text fields used for user input in prompt dialogs or components. Adjust settings like size, styling, input handling, and interaction features in text areas embedded in AI prompt views, tailoring how text is entered, displayed, and managed. Configure, enable, or modify properties related to prompt input fields that accept and display user-generated content, ensuring compatibility with predefined text area options and optimizing input experience in conversational or interactive AI environments.
</div>

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


<div class="meta-api-description">
Adjust and customize the input area's look and feel by setting how the background and border appear, enabling styles such as solid fill, outlined borders, minimal flat design, or completely transparent with no fill or border, to configure the visual presentation of text input fields, control UI appearance modes, switch between filled and bordered text boxes, or set minimalist and clean input areas with various design options for text entry components.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        promptTextArea: {
            fillMode: "outline"
        }
    });
    </script>

### promptTextArea.inputMode `String`

Specifies the input mode attribute for mobile keyboards.


<div class="meta-api-description">
Configure or set the virtual keyboard layout and input behavior for mobile devices by specifying input mode options like text, numeric, decimal, telephone, search, email, URL, or none to control which on-screen keyboard appears when users focus on a prompt textarea; this affects input type, keyboard features, and user input methods across mobile browsers and apps, enabling optimization for data entry formats such as numbers, emails, URLs, phone numbers, search queries, or freeform text input in prompt interfaces.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        promptTextArea: {
            inputMode: "text"
        }
    });
    </script>

### promptTextArea.label `Object`

Specifies the label configuration for the textarea.


<div class="meta-api-description">
Set or customize the label for a textarea input in user interface components, controlling the displayed text, toggling label visibility, and managing accessibility features such as ARIA labels and descriptions to ensure proper identification and usability for all users, including those using assistive technologies. Adjust label content, enable or disable label display, and define descriptive attributes to enhance form clarity, improve user experience, and meet accessibility standards during component initialization or configuration.
</div>

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

### promptTextArea.label.content `String`

Specifies the label text content.


<div class="meta-api-description">
Customize or set the visible label text for a prompt's input field in AI components, enabling control over the displayed text adjacent to or above the input area to improve user interface clarity and accessibility. Adjust, change, or configure the prompt text area's label to suit different UI contexts, support localization or accessibility needs, and enhance user experience by defining the descriptive label content shown alongside the text entry box in AI-driven forms or prompts.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        promptTextArea: {
            label: {
                content: "Your AI Prompt"
            }
        }
    });
    </script>

### promptTextArea.label.floating `Boolean`

Specifies whether the label floats above the input.


<div class="meta-api-description">
Control and configure a floating or dynamic label that moves above the input area when the text field is focused or contains user input, enabling enhanced form usability and visual clarity for prompt text areas, with options to enable, disable, or customize placeholder behaviors in text input components to improve user interaction and interface responsiveness across various UI states.
</div>

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


<div class="meta-api-description">
Control or set the maximum allowed number of characters a user can type or paste into a text input area or prompt field, enforcing character limits to manage input size, prevent overflow or truncation, validate user entries, and comply with backend or API restrictions. This includes configuring limits for prompt text areas, defining input length boundaries, restricting input characters for form controls, and handling scenarios where users attempt excessive input, ensuring inputs stay within specified length constraints for proper processing and validation.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        promptTextArea: {
            maxLength: 500
        }
    });
    </script>

### promptTextArea.maxRows `Number` *(default: null)*

Specifies the maximum number of visible rows to which the textarea can auto-resize. Used in combination with `resize: "auto"`.


<div class="meta-api-description">
Control the maximum height or number of visible lines for an auto-resizing textarea input to prevent it from growing beyond a set limit, ensuring the prompt or input field does not expand indefinitely when typing long content, enabling developers to set a fixed upper boundary on dynamic textarea height while auto-resize is enabled, manage input area size constraints, limit textarea vertical growth, configure maximum visible rows for user input fields, and control textarea expansion behavior in interactive prompts or text areas that adapt size automatically.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        promptTextArea: {
            resize: "auto",
            maxRows: 3
        }
    });
    </script>

### promptTextArea.overflow `String`

Specifies the overflow behavior. Available options: `"auto"`, `"hidden"`, `"visible"`, `"scroll"`.


<div class="meta-api-description">
Adjust and manage how text that surpasses the visible area in a prompt input or text field is displayed or hidden, including options to enable scrolling, hide overflow content, keep overflow visible, or automatically show scrollbars. Configure overflow behavior to control user input visibility, scrolling capability, content clipping, or dynamic scrollbar appearance within text areas or input components, ensuring flexible handling of excessive or multiline input text beyond container boundaries. Enable developers to set overflow modes like auto, hidden, visible, or scroll to tailor user interface text input behavior and optimize content presentation in prompt or chat input fields.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        promptTextArea: {
            overflow: "auto"
        }
    });
    </script>

### promptTextArea.placeholder `String`

Specifies the placeholder text for the textarea.


<div class="meta-api-description">
Configure the default text hint or placeholder inside the input area to guide users on what to type, such as example prompts, instructions, or accessibility tips for screen readers; control or customize the placeholder text of a textarea to improve user experience, input clarity, or assistive technology compatibility when the prompt field is empty or awaiting input.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        promptTextArea: {
            placeholder: "Type your AI prompt here..."
        }
    });
    </script>

### promptTextArea.resize `String`

Specifies the resize behavior. Available options: `"none"`, `"both"`, `"horizontal"`, `"vertical"`, `"auto"`.


<div class="meta-api-description">
Control or configure the resizing behavior of a text input area by enabling or disabling user ability to resize the prompt box in horizontal, vertical, or both directions, or allow automatic resizing determined by the browser; set constraints on whether the input field can be resized freely, fixed in size, or limited to one axis to customize user interaction with text areas for prompts, input forms, or editable fields.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        promptTextArea: {
            resize: "vertical"
        }
    });
    </script>

### promptTextArea.rows `Number`

Specifies the number of visible text lines.


<div class="meta-api-description">
Adjust the number of visible lines for a multiline text input area to control its initial vertical height, define how much text content is displayed before scrolling activates, customize the size of a prompt box or input field by setting visible row count, configure the height of a text area for user input, manage textarea layout and scrolling behavior by specifying row quantity, set the vertical dimension of a prompt input area to optimize user experience and interface design, control multiline input display settings, define how many lines a text area shows initially to balance space and readability.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        promptTextArea: {
            rows: 3
        }
    });
    </script>

### promptTextArea.rounded `String`

Specifies the border radius. Available options: `"small"`, `"medium"`, `"large"`, `"full"`, `"none"`.


<div class="meta-api-description">
Adjust the border radius or corner rounding for a text input area in an AI prompt component by setting predefined options such as small, medium, large, full, or none, enabling customization of the input field’s visual curvature from sharp edges to fully rounded corners; control the shape and style of the prompt’s textbox appearance by configuring its corner radius, curvature level, or roundedness to match UI design preferences or enhance user experience in chat, form, or interactive prompt interfaces.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        promptTextArea: {
            rounded: "medium"
        }
    });
    </script>

### promptTextArea.size `String`

Specifies the size of the component. Available options: `"small"`, `"medium"`, `"large"`, `"none"`.


<div class="meta-api-description">
Adjust the input field size or dimensions for prompt text areas, configure or customize the scale, width, height, or visual footprint of text input components, control how large or small the user input box appears within AI prompt interfaces, set or toggle input area sizing options like compact, standard, expanded, or hidden states, optimize or modify text box display sizes for user prompts during setup or runtime, apply size presets such as small, medium, large, or disable it entirely, manage and style input area proportions for better UI fit and usability in prompt components.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        promptTextArea: {
            size: "large"
        }
    });
    </script>

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


<div class="meta-api-description">
Control and customize the set of action buttons displayed on each AI-generated output card, enabling standard functions like copy to clipboard, retry generation, positive or negative feedback rating, or spacing between buttons, while also allowing integration of custom command actions through configurable arrays of built-in keywords or detailed action objects that emit events with associated commands and output data—perfect for developers looking to adjust interactive output behavior, implement custom controls, manage output-related user commands, set up feedback mechanisms, or extend output card functionality with personalized buttons and event-driven triggers.
</div>

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


<div class="meta-api-description">
Configure, specify, or set a unique action identifier or command string to detect, route, or filter output events generated by AI prompt components, enabling mapping to specific handlers, triggering conditional logic, or dispatching actions based on stable command keys included in event payloads; control output action routing, event filtering by command name, and targeted response execution during AI prompt interactions and initialization for precise event handling and workflow customization.
</div>

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


<div class="meta-api-description">
Customize or configure the displayed text on action buttons such as confirm, submit, or proceed within AI prompt interfaces, allowing developers to set, change, or control button captions, labels, or titles to improve user clarity, interface readability, and user interaction feedback by specifying the string that appears on the prompt action buttons.
</div>

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


<div class="meta-api-description">
Control and customize the visual icon displayed on action buttons within interactive prompt components by specifying icon names or CSS classes, enabling developers to set, change, configure, or replace button icons using standard icon fonts or named icon identifiers like Kendo UI icons, ensuring consistent and clear iconography for user interface elements across actions such as search, submit, or other commands.
</div>

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        outputActions: [
            { command: "bookmark", text: "Bookmark", icon: "star" },
            { command: "share", text: "Share", icon: "share" }
        ]
    });
    </script>

### outputActions.fillMode `String`

Specifies the fill mode of the action button. Available options: `"solid"`, `"outline"`, `"flat"`, `"none"`.


<div class="meta-api-description">
Adjust button styling options to control visual emphasis and interactivity of action buttons in prompts, including setting solid colors, outlined borders, flat minimal styles, or fully transparent no-fill appearances; customize how buttons appear and behave by configuring fill-level, button emphasis, or visual themes to match UI design preferences, enabling developers to enable, set, or control button decoration such as filled, outlined, flat, or invisible styles within interactive prompts or user interface components.
</div>

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


<div class="meta-api-description">
Adjust the button corner radius style to customize action buttons with options for small, medium, large, full, or no rounding, enabling control over curved or sharp edges for UI elements such as clickable prompts, action triggers, and interactive controls to tailor the visual shape and border radius for design preferences or accessibility needs in button appearance and layout.
</div>

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


<div class="meta-api-description">
Control or customize the visual appearance, styling, and color scheme of action buttons by setting the theme or design color for interactive elements such as primary, secondary, success, warning, error, info, light, dark, inverse, base, or tertiary tones, enabling developers to configure button colors for various UI states, contexts, or branding requirements in prompts, dialogs, or user interface components.
</div>

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


<div class="meta-api-description">
Configure or customize the tooltip text, hover title, or mouseover label for the action button within the AI prompt interface, enabling localized, user-friendly descriptions and accessible titles for output actions. Control the button’s descriptive title attribute to enhance usability, set contextual hints, or display user-facing guidance in various languages for UI elements tied to AI prompt actions or outputs. Adjust, define, or localize the action button’s tooltip content that appears on hover to improve user interaction, accessibility, and clarity across different locales and interface states.
</div>

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


<div class="meta-api-description">
Control and configure how the output action from an AI prompt is displayed and functions by selecting the rendering type such as an interactive button for triggering actions or a non-interactive spacer that creates layout gaps. Customize output behaviors by setting action types to either clickable controls or invisible spacing elements, enabling flexible UI arrangements, interactive response triggers, or visual separation within AI-generated content output. Enable or disable interactive controls, switch between actionable buttons and layout spacers, and manage the presentation and interactivity of AI prompt results seamlessly across different interface designs.
</div>

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


<div class="meta-api-description">
Control and customize the final rendering of AI-generated responses by defining a template function that processes the complete streamed output text and data, enabling you to format, sanitize, wrap, or transform the content into HTML for display. This feature supports tailoring how AI outputs appear after streaming finishes, allowing developers to set HTML structures, inject styling, modify the output layout, or implement custom post-processing and presentation of generated text results. Configure output formatting, apply sanitization routines, control visual appearance, and adapt streamed AI content dynamically for integration in various frontend applications using a flexible templating approach.
</div>

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


<div class="meta-api-description">
Customize rendering and layout of individual suggestion items in AI-powered prompt suggestion lists by defining templates, markup, or functions that control how each suggestion appears visually; configure presentation styles, inject HTML or dynamic content, format suggestion entries, and tailor appearance using string templates, callback functions, or templating engines to personalize suggestion display, enhance user interfaces, and modify suggestion item visuals and structure in autocomplete or AI prompt features.
</div>

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


<div class="meta-api-description">
Provide configurable quick suggestion strings or keyword hints that show as clickable options to populate or autofill the input prompt field, enabling users to easily select or insert preset phrases, recommended queries, example prompts, autocomplete suggestions, or shortcut commands for faster prompt creation, improved user interaction, and streamlined input generation.
</div>

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


<div class="meta-api-description">
Configure custom header buttons, controls, or commands by adding and managing toolbar items in the prompt’s header bar, enabling extension or customization of the interface with additional interactive elements appended after default toolbar controls, allowing you to set, enable, or control header toolbars dynamically with arrays of item configurations for flexible UI enhancement and integration of bespoke actions or buttons in the prompt’s top toolbar area.
</div>

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


<div class="meta-api-description">
Control and customize toolbar elements by specifying their roles as interactive buttons or non-interactive spacers within the interface, enabling configuration of clickable actions, layout spacing, and user interaction components for streamlined toolbar design. Adjust toolbar item types to set functionality as actionable controls, button triggers, or flexible gaps to organize layout flow and enhance UI responsiveness during component setup or customization. This includes defining elements that act as clickable triggers, operational buttons, or spatial dividers for visual separation and user input control within toolbars.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        toolbarItems: [
            { type: "button", text: "Custom Action", icon: "save" }
        ]
    });
    </script>

### toolbarItems.icon `String`
The icon name of the toolbar item.


<div class="meta-api-description">
Control and customize the toolbar action icon by specifying the icon name string, enabling you to set, configure, or change the visual symbol representing toolbar buttons, icons for commands, or actions within the AI prompt interface, helping users identify functionality through a specific, named icon used to display toolbar item symbols, shortcuts, or graphical buttons in the component.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        toolbarItems: [
            { type: "button", icon: "save", text: "Save" }
        ]
    });
    </script>

### toolbarItems.fillMode `String`
The fill mode of the toolbar item. Available options are `solid`, `outline`, `flat` or `none`.


<div class="meta-api-description">
Configure and customize toolbar button appearance with options to set fill style for UI elements, controlling visual emphasis, outline visibility, flat or solid coloring, minimal or bold presentation, and touch-friendly contrast for interactive toolbar items in prompt interfaces. Adjust rendering modes to create solid-filled, outlined, flat, or invisible button styles that enhance user interface clarity, accessibility, and aesthetic preferences in toolbars or control panels.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        toolbarItems: [
            { type: "button", fillMode: "outline", text: "Action" }
        ]
    });
    </script>

### toolbarItems.rounded `String`
The rounded mode of the toolbar item. Available options are `small`, `medium`, `large`, `full` or `none`.


<div class="meta-api-description">
Adjust the corner curvature of toolbar buttons to customize their visual appearance and enhance touch usability by selecting from various rounding levels such as minimal, moderate, pronounced, fully circular, or no rounding. Control the shape and edge smoothness of interactive toolbar elements to achieve desired style effects or improve finger-friendly design when configuring the toolbar layout or user interface components. Enable precise styling of button edges by specifying the amount of corner radius to match design preferences or accessibility requirements.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        toolbarItems: [
            { type: "button", rounded: "medium", text: "Action", fillMode: "outline" }
        ]
    });
    </script>

### toolbarItems.themeColor `String`
The theme color of the toolbar item. Available options are `base`, `primary`, `secondary`, `tertiary`, `success`, `warning`, `error`, `info`, `light`, `inverse` or `dark`.


<div class="meta-api-description">
Control and customize the toolbar item's appearance by configuring its color theme to convey different semantic meanings such as success, error, warning, info, or primary actions; adjust visual styling options including base, secondary, tertiary, light, dark, and inverse tones to ensure proper contrast, highlight importance, or match branding; set or override theme colors for toolbar buttons within an AI prompt interface during initialization or dynamically to influence user interface feedback, status indications, or aesthetic consistency across components.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        toolbarItems: [
            { type: "button", themeColor: "primary", text: "Action" }
        ]
    });
    </script>

### toolbarItems.click `Function`
The click event handler of the toolbar item.


<div class="meta-api-description">
Configure custom behavior to respond to toolbar button clicks, capture user interactions on toolbar items, implement event handlers that trigger specific logic when a toolbar element is clicked, manage click events for toolbar controls, detect and handle user actions on toolbar buttons, set up callbacks or listeners for toolbar item clicks, customize functionality triggered by clicking toolbar icons or buttons within UI components, execute code in response to toolbar click events, control and override default toolbar button behavior, and integrate click event processing for toolbar elements in interactive interfaces.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        toolbarItems: [
            { 
                type: "button", 
                text: "Custom Action",
                click: function(e) {
                    console.log("Custom action clicked!");
                }
            }
        ]
    });
    </script>

### service `String|Object`
The URL of the AI service to use for generating outputs.


<div class="meta-api-description">
Set or customize the AI backend endpoint, API URL, or service address for generating prompts and AI outputs, enabling connection, integration, or switching between various AI models, hosted services, or external AI providers; control where the prompt generation requests are sent, configure endpoint bindings, specify the service location for AI response generation, and adjust the target AI system for output creation.
</div>

#### Example
    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        service: "/api/llm"
    });
    </script>

### service.url `String`
The Url of the AI service to use for generating outputs.


<div class="meta-api-description">
Set or change the endpoint URL for connecting to AI services or proxies that handle prompt input and generate model-driven responses, enabling control over where prompts are sent, how requests are routed, and how output from AI models is received and integrated. This configuration supports specifying HTTP or HTTPS addresses for API calls, customizing the destination for AI-generated replies, updating service targets, and managing remote AI interaction points to influence response generation from various hosted or proxy-based AI systems.
</div>

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


<div class="meta-api-description">
Configure and control custom HTTP headers such as Authorization, Content-Type, or other key-value pairs to be included with AI service requests, enabling custom authentication, content negotiation, or additional metadata injection when sending requests to the AI endpoint. Support setting, modifying, or overriding standard and custom headers to ensure proper communication and integration with AI APIs, facilitating scenarios involving token-based access, custom tracing headers, or specialized content types. This encompasses specifying header name/value pairs dynamically or statically in various formats to customize request behavior and security.
</div>

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


<div class="meta-api-description">
Configure custom payloads or request data to include specific context, parameters, or user inputs when calling AI services through prompt components, enabling control over the data sent with AI requests by setting serializable content like JSON, customizing what information is passed to AI models, embedding additional metadata or dynamic input values, managing how AI interprets and responds based on tailored request payloads, and adjusting or injecting relevant request details for advanced AI interactions.
</div>

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


<div class="meta-api-description">
Configure a custom function to retrieve and transform AI-generated results from the raw response by extracting specific fields, parsing JSON outputs, concatenating streaming data segments, normalizing proprietary or vendor-specific response formats, handling nested structures, or converting data into strings, objects, or arrays. This setup enables precise control over how the AI service output is processed, filtered, and formatted for further use in applications, allowing developers to define tailored extraction logic, customize response handling pipelines, and adapt to various API response shapes during initialization or runtime configuration.
</div>

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


<div class="meta-api-description">
Control displaying a tooltip on output card subtitles that reveals the complete AI prompt text behind the generated result, enabling users to view, inspect, or glance at the full prompt expression in a hover or focus interaction. Enable or disable hover tooltips for subtitle text to provide context, enhance transparency, or assist debugging by showing detailed prompt information directly within output cards, supporting scenarios where users want to review, understand, or verify the exact input prompt that produced the displayed AI output. This setting helps configure interface elements to show subtitle hover hints, prompt previews, or detailed prompt descriptions embedded in UI components.
</div>

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


<div class="meta-api-description">
Enable or disable the display of ratings or feedback scores on AI-generated response cards to control whether users see output evaluations, feedback options, or quality indicators on the result interface. Adjust visibility of output quality marks, review scores, or user rating prompts shown alongside AI responses, configuring presentation of output assessments and evaluation controls. Manage showing or hiding user ratings, feedback buttons, or result score indicators directly on AI-generated output cards, with options to set visibility of output ratings or action elements during component setup or customization.
</div>

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


<div class="meta-api-description">
Configure and control the collection of display panels or interfaces that are available for rendering and interaction by specifying a list or array of view settings. This enables setting up, customizing, ordering, enabling, disabling, and managing multiple presentation layouts or screens that the AI prompt or component can show, switch between, and render dynamically. Adjust the set of visible views, define the sequence and availability of different UI perspectives, and organize the display options for flexible user interface presentation and navigation during initialization or setup.
</div>

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


<div class="meta-api-description">
Customize the text label or caption displayed on a toolbar button within a specific component view, enabling developers to set, change, or localize the button’s visible title or name during initialization or runtime. This includes configuring, controlling, or modifying the button text for user interface elements, toolbar actions, or view-specific controls, supporting scenarios like internationalization, branding, and dynamic label updates for better user experience and clarity in the toolbar interaction.
</div>

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


<div class="meta-api-description">
Control or customize the icon displayed on a toolbar button within a view by specifying an icon name, identifier, or CSS class, enabling you to configure, set, or change button visuals, toolbar icons, UI button graphics, or view action icons for tailored interface appearance and user interaction.
</div>

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


<div class="meta-api-description">
Configure and control the rendering mode, display layout, and functional role of the AI prompt interface by setting the view type to input prompts, output results, command lists, or fully customizable views, enabling flexible initialization and dynamic presentation styles that adapt to user interaction, interface requirements, or bespoke rendering needs for hybrid input-output scenarios, command-driven workflows, or tailored UI behavior.
</div>

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


<div class="meta-api-description">
Assign, set, or configure a unique identifier for a specific view within a component to reference, identify, select, switch between, or bind to that particular view instance; control and manage distinct views by their individual names to prevent conflicts or duplicates and enable precise targeting of views for dynamic rendering, lookup operations, or conditional display logic in user interfaces.
</div>

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


<div class="meta-api-description">
Control how content is rendered within the AI prompt interface by configuring templates, including setting raw HTML strings, using functions that generate dynamic markup based on provided data or models, or applying templating systems like Kendo templates for flexible, data-driven view customization and dynamic UI content generation.
</div>

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


<div class="meta-api-description">
Customize and control the footer area of a view by setting, defining, or configuring the footer content and layout using templates, strings, functions, or template engines. Enable dynamic footer rendering, specify custom footer designs, or supply code snippets and functions to alter the footer structure, content, and appearance during view setup or initialization. Adjust footer templates to tailor the look and behavior of the view’s bottom section in UI components, leveraging various templating methods and customization options for comprehensive footer control.
</div>

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


<div class="meta-api-description">
Configure post-render setup by defining a callback function that runs after a dynamic content view finishes rendering, enabling initialization of UI elements, data binding, event listener attachment, DOM manipulation, and custom template integration within interactive prompt interfaces. Set or customize initialization routines, hook into component lifecycle events, control view population, and programmatically adjust rendered content layout or behavior immediately after rendering completes. Facilitate automated setup tasks, view customization, and interactive element preparation using initialization handlers designed for templated content components operating within prompt views.
</div>

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


<div class="meta-api-description">
Control, customize, and arrange the list of available commands or actions displayed in the AI prompt interface, enabling developers to set which commands appear, reorder them, add new commands, or remove existing ones to tailor the prompt view behavior, user interactions, and initialization sequence dynamically; manage the command set for prompt customization, command ordering, visibility control, and action configuration to optimize user experience and workflow within the prompt environment.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        views: [{
            type: "commands",
            promptCommands: [
                { id: "summarize", text: "Summarize", icon: "list-unordered" },
                { id: "translate", text: "Translate", icon: "globe" }
            ]
        }]
    });
    </script>

### views.promptCommands.id `String`

The id of the command item.


<div class="meta-api-description">
Assign, set, or reference a unique identifier to individual commands within a collection for precise targeting, identification, or manipulation of specific prompt commands in event handlers, data bindings, or API interactions; use this to enable tracking, updating, invoking, or removing particular commands by their distinct ID when managing command lists, integrating with automation, or customizing command behavior programmatically.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
       views: [{
            type: "commands",
            promptCommands: [
                { id: "summarize", text: "Summarize", icon: "list-unordered" },
                { id: "translate", text: "Translate", icon: "globe" }
            ]
        }]
    });
    </script>

### views.promptCommands.text `String`

The text of the command item.


<div class="meta-api-description">
Customize, localize, or configure the displayed label, caption, or visible text of command items within prompt interfaces to control how users see and interact with prompt commands, enabling tailored wording, translations, or interface text adjustments for better clarity, user experience, and localization support in AI-driven prompts or command menus.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        views: [{
            type: "commands",
            promptCommands: [
                { id: "summarize", text: "Summarize", icon: "list-unordered" },
                { id: "translate", text: "Translate", icon: "globe" }
            ]
        }]
    });
    </script>

### views.promptCommands.icon `String`

The icon name of the command item.


<div class="meta-api-description">
Control the visual representation of command items by specifying or updating the icon identifier, enabling customization of icons shown in prompts or command menus, including selecting built-in icon sets or integrating custom graphics. Adjust, set, or configure the command icon to match user interfaces, command lists, or prompt displays, ensuring appropriate visual cues for actions or commands within interactive components. This covers icon assignment, icon changing, visual customization for command entries, and the flexibility to use various icon types to enhance user interaction clarity and aesthetics.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        views: [{
            type: "commands",
            promptCommands: [
                { id: "summarize", text: "Summarize", icon: "list-unordered" },
                { id: "translate", text: "Translate", icon: "globe" }
            ]
        }]
    });
    </script>

### messages `Object`

The text messages displayed in the component. Use this option to customize or localize the messages.


<div class="meta-api-description">
Customize, localize, or configure the text strings, prompts, labels, and messages displayed within user interface components by setting or overriding default messages, enabling support for different languages, adjusting prompt content, controlling notification wording, and tailoring feedback or instructions shown in AI-powered prompt elements to match specific localization, branding, or user experience requirements across various contexts.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        messages: {
            promptView: "Ask AI Assistant",
            outputView: "AI Response",
            generateOutput: "Generate Response"
        }
    });
    </script>

### messages.commandsView `String` *(default: "")*

The text of the commands view button in the ToolBar.


<div class="meta-api-description">
Customize or configure the toolbar button label for the commands view in AI prompt interfaces, enabling you to set or change the text displayed on the commands button within the prompt UI, control how toolbar commands are presented, modify button captions for better clarity or localization, update the command view's button wording to match user preferences or branding, and tailor the interface language specifically for the commands panel in AI prompt toolbars.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        messages: {
            commandsView: "Commands"
        }
    });
    </script>

### messages.copyOutput `String` *(default: "Copy")*

The text of the copy output button in the output element.


<div class="meta-api-description">
Control and customize the label text displayed on the copy button for AI prompt outputs, allowing developers to set, localize, or modify the copy button caption used to copy generated results, output data, or AI responses. Adjust or configure the copy action text, output clipboard prompts, or user-facing copy labels to fit different languages, contexts, or UI needs in applications handling AI-generated content.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        messages: {
            copyOutput: "Copy to Clipboard"
        }
    });
    </script>

### messages.customView `String` *(default: "Custom View")*

The text of the custom view button in the ToolBar.


<div class="meta-api-description">
Customize or localize the label text for the custom view button in the AI prompt toolbar, control the button name display, set or change the text shown on the customView toggle, configure button captions for different languages, adjust or translate the label for the toolbar’s custom view control, enable tailored button labels, modify UI button text for accessibility or regional settings, rename the interactive custom view trigger, and personalize the displayed name of the customView button in the interface.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        messages: {
            customView: "Custom"
        }
    });
    </script>

### messages.generateOutput `String` *(default: "Generate")*

The text of the generate output button in the prompt view footer.


<div class="meta-api-description">
Set or customize the label text for action buttons in AI prompt interfaces, control the text shown on footer buttons, configure button captions in message prompts, modify the displayed output label, change footer call-to-action text, personalize user interface button names, adjust the generated output button wording, tailor prompt response buttons, enable dynamic footer button labeling, and update message-driven output control text in AI interaction components.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        messages: {
            generateOutput: "Generate AI Response"
        }
    });
    </script>

### messages.outputRetryTitle `String` *(default: "Generated with AI")*

The title of the output card when the output is generated after clicking the retry button of an output.


<div class="meta-api-description">
Control and customize the title text shown on the output card when a user clicks retry, enabling localization and configuration of the retry message display within AI prompt interactions, including setting retry titles, modifying output headers, adjusting retry labels, and managing user feedback text after retry attempts in multi-language contexts.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        messages: {
            outputRetryTitle: "Regenerated Content"
        }
    });
    </script>

### messages.outputTitle `String` *(default: "Generated with AI")*

The title of the output card when the output is generated.


<div class="meta-api-description">
Control and customize the displayed heading or label on the AI prompt result card by setting, changing, translating, or localizing the output title text shown after AI responses; adapt the output header for different languages, user interfaces, or contextual display needs; modify or configure the card’s result title to suit branding, accessibility, or UI preferences dynamically across environments.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        messages: {
            outputTitle: "AI Generated Content"
        }
    });
    </script>

### messages.outputView `String` *(default: "Output")*

The text of the output view button in the ToolBar.


<div class="meta-api-description">
Customize or configure the text label, caption, or language of the toolbar button that controls the output view in AI prompt interfaces, enabling localization, translation, or adjustment of the displayed output toggle or display button text to match different languages, user preferences, or UI requirements in applications using AI prompts or chat interfaces.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        messages: {
            outputView: "AI Output"
        }
    });
    </script>

### messages.promptPlaceholder `String` *(default: "Ask or generate content with AI")*

The placeholder text of the textarea input of the prompt view.


<div class="meta-api-description">
Set or customize the placeholder text in input fields to provide localized hints, default messages, or example prompts guiding users on what to type, configure placeholder attributes for textareas to improve user experience, enable dynamic or context-sensitive placeholder content, control input prompts’ initial display text, and adjust placeholder strings for internationalization, user instructions, or UI clarity in prompt interfaces.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        messages: {
            promptPlaceholder: "Enter your question or request..."
        }
    });
    </script>

### messages.promptSuggestions `String` *(default: "Prompt Suggestions")*

The text of the prompt suggestions toggle button in the prompt view.


<div class="meta-api-description">
Configure or customize the label text, toggle button wording, or display message for enabling, showing, or hiding prompt suggestions, autocomplete prompts, AI-generated hint prompts, or intelligent input recommendations within the prompt interface, adjusting localization or translations for suggestion toggles in AI-driven input components and chatbot or assistant message prompts.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        messages: {
            promptSuggestions: "Quick Prompts"
        }
    });
    </script>

### messages.promptView `String` *(default: "Ask AI")*

The text of the prompt view button in the ToolBar.


<div class="meta-api-description">
Customize, translate, or configure the toolbar button text for prompt views within AI prompt interfaces, enabling localization, language adaptation, and user-specific phrasing for interface elements in prompts. Adjust or set the prompt view labels, button captions, or display text shown on toolbar elements during AI interactions, supporting multiple languages, regional settings, or personalized wording for improved usability and accessibility across diverse user groups. Enable contextual or dynamic modification of prompt-related buttons on toolbars to match localized content, user preferences, or application-specific terminology for AI-powered prompt features.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        messages: {
            promptView: "Chat with AI"
        }
    });
    </script>

### messages.retryGeneration `String` *(default: "Retry")*

The text of the retry generation button in the output card.


<div class="meta-api-description">
Customize, localize, or set the text label for retry buttons, prompts, or actions related to regenerating AI-generated content, responses, or outputs in user interfaces; control how retry or regeneration commands appear in different languages or regions, adjust button captions for retry attempts after AI output failures, and configure messaging to improve user understanding when requesting new AI output generation within prompt or chat components.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        messages: {
            retryGeneration: "Try Again"
        }
    });
    </script>

### messages.ratePositive `String` *(default: "")*

The text of the positive rating button in the output card.


<div class="meta-api-description">
Customize, configure, or set the label text for the positive feedback button in AI prompt response interfaces to support localization, internationalization, or adjustment of approval or like button wording, enabling control over user interaction elements such as thumbs-up, upvote, or positive rating prompts in AI-generated output cards or chat messages.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        messages: {
            ratePositive: "Good response"
        }
    });
    </script>

### messages.rateNegative `String` *(default: "")*

The text of the negative rating button in the output card.


<div class="meta-api-description">
Customize or configure the text label for the negative feedback button in AI prompt result cards, enabling localization and translation of the downvote or dislike option, adjust or set the wording for negative rating prompts, control the phrasing of user feedback buttons that indicate dissatisfaction or poor quality responses, and ensure that negative response options reflect appropriate language or terminology for different regions, languages, or usage contexts.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        messages: {
            rateNegative: "Poor response"
        }
    });
    </script>

### messages.stopGeneration `String` *(default: "Stop Generation")*

The aria-label and title of the stop generation button that appears during streaming operations.


<div class="meta-api-description">
Control and customize the accessible text labels such as aria-label and title for stop or cancel buttons during AI prompt streaming or data generation to improve localization, accessibility, screen reader support, internationalization of stop actions, and user interface adaptability in different languages or contexts when interrupting or halting ongoing AI content creation or streaming processes.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        messages: {
            stopGeneration: "Stop AI Generation"
        }
    });
    </script>

## Methods

### activeView

Changes the active view. If no argument is provided, the method returns the index of the active view.


<div class="meta-api-description">
Control or retrieve the current visible interface in a multi-view component by switching or querying the displayed screen using an index number; enable programmatic navigation between different views or pages inside a UI element by setting or getting the active view position, returning the current view’s numeric identifier when no parameters are provided, facilitating dynamic view management, screen toggling, or interface state detection within applications.
</div>

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


<div class="meta-api-description">
Add or append new AI prompt responses, outputs, or generated results to the existing collection of prompt outputs for rendering, display, or processing. Configure, push, or inject additional output items into the internal list or output queue of AI prompt responses, enabling multiple or incremental answers, suggestions, or completion data to be managed, accessed, or inspected. Support extending generated content dynamically by adding prompt outputs programmatically or via the active output view’s handling methods, facilitating real-time updates, output streaming, or multi-part completions in AI-driven interfaces or workflows.
</div>

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


<div class="meta-api-description">
Retrieve or access the list, array, or collection of UI views or components associated with an AI prompt instance; enable querying, iterating over, inspecting, or managing individual view elements and their current states; control or read view data for tasks such as rendering conditionally, updating UI dynamically, debugging interface behavior, or programmatically manipulating view properties; get all related visual elements or view representations tied to an AI prompt to interact with or monitor their status and content.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    var aiprompt = $("#aiprompt").kendoAIPrompt().data("kendoAIPrompt");
    var views = aiprompt.getViews();
    console.log("Available views:", views);
    </script>

#### Returns

`Array` An array of views of the AIPrompt.

### updatePromptOutputContent

Updates the content of a specific prompt output or the most recent output. This method is typically used during streaming operations to update content in real-time.


<div class="meta-api-description">
Control and modify streaming or incremental AI prompt responses by updating live or partial output content dynamically, enabling real-time changes to the latest or specified prompt result during continuous data flow. Facilitate progressive, chunk-by-chunk response updates, append or replace segments of AI-generated text on the fly, support live rendering for interactive experiences, and manage incremental output content efficiently within prompt streaming operations. Adjust output content immediately as new data arrives, handle partial updates for ongoing AI responses, and customize prompt outputs programmatically to reflect the most current state of response generation.
</div>

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


<div class="meta-api-description">
Enable live incremental AI output streaming, start real-time partial response generation, configure interactive streaming mode for AI prompts, control streaming state with start, stop, and cancel options, manage dynamic content updates and progressive output display during AI generation, set up continuous AI response streaming with user interface updates and partial data appending, handle mid-stream interruptions and progress visualization for interactive AI replies, activate streaming for real-time AI content rendering and user feedback, orchestrate AI output flow with start streaming functions for responsive and interruptible text generation.
</div>

#### Example
    <div id="aiprompt"></div>
    <script>
    var aiprompt = $("#aiprompt").kendoAIPrompt().data("kendoAIPrompt");
    aiprompt.startStreaming();
    </script>

### stopStreaming

Stops streaming mode for the component. This hides the stop generation button, shows regular action buttons, and applies final content templates.


<div class="meta-api-description">
Control the termination of live content generation by stopping incremental streaming outputs, halting partial or real-time updates, disabling streaming status indicators, restoring standard interface elements and action controls, finalizing and rendering complete generated content, managing the transition from active streaming mode to static display, and applying final formatting or templates to the output.
</div>

#### Example
    <div id="aiprompt"></div>
    <script>
    var aiprompt = $("#aiprompt").kendoAIPrompt().data("kendoAIPrompt");
    aiprompt.stopStreaming();
    </script>

## Events

### commandExecute

Triggered when a command item from the Commands view is clicked. The panel bar dataItem of the selected item is available through the event argument.


<div class="meta-api-description">
Capture and respond to user interactions with command items or menu entries in a command list or panel, enabling custom behavior when users click, tap, or select commands; detect and handle events triggered on command execution to run custom functions, navigate within the app, log user actions, or modify UI flow based on the clicked item's data or properties; control and intercept command activations for dynamic responses, workflows, or analytics by accessing event details tied to the selected command element.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        commandExecute: function(e) {
            console.log("Command executed:", e.item);
        }
    });
    </script>

### promptRequest

Triggered when the prompt view Generate output button is clicked. The prompt text is available through the event argument. Suitable to make a request to the AI service to receive an output. Use the `addPromptOutput` method to add the generated output to the `promptOutputs` collection.

The `prompt`, `output`, `history` and `isRetry` properties are available in the event argument. When the output is generated after clicking the retry button of an output, the `isRetry` property is `true` and the `output` property is the output content of the output card. The history property is an array of prompt outputs generated before the current output.

You can prevent the default behavior of the `promptRequest` event by calling `e.preventDefault()` in the event handler.


<div class="meta-api-description">
Triggering an event when sending prompt text to an AI service, such as clicking a generate button to request AI-generated content, supports capturing the current prompt, previous outputs, conversation history, and retry status for managing context, threading, or re-fetching results; developers can intercept, customize, cancel, or extend request flows for integration with custom AI endpoints, batching, throttling, or alternative APIs, while adding generated responses dynamically to output collections and handling retry logic to control prompt submission and output generation processes.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        promptRequest: function(e) {
            // Make request to AI service
            // Or call e.preventDefault()
            $.ajax({
                url: "/api/ai-generate",
                method: "POST",
                data: { prompt: e.prompt },
                success: function(response) {
                    e.sender.addPromptOutput({
                        output: response.output,
                        prompt: e.prompt
                    });
                }
            });
        }
    });
    </script>

### promptResponse

Triggered when the AI service response is received. The response data is available through the event argument. Triggered only when the `serviceUrl` option is set.

You can prevent the default behavior of the `promptResponse` event by calling `e.preventDefault()` in the event handler.


<div class="meta-api-description">
Capture and manage AI-generated replies triggered upon receiving responses from AI services, enabling developers to intercept, process, log, transform, or customize the returned data payload from prompts; this event activates only when connected to a configured AI endpoint, allowing control over default behaviors by preventing standard processing through event cancellation, supporting use cases like monitoring, modifying, or integrating AI response content dynamically within applications.
</div>

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


<div class="meta-api-description">
Detect and respond to changes when users rate or update feedback on generated outputs, capturing events triggered by rating buttons or similar controls, tracking output identifiers alongside their new rating values, and enabling real-time handling of user feedback or rating adjustments on AI-generated content, with consideration for event deprecation and preference for newer output-related action events to monitor changes in output evaluation or user interaction with rating mechanisms.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        outputRatingChange: function(e) {
            console.log("Rating changed for output:", e.outputId, "New rating:", e.rating);
        }
    });
    </script>

### outputCopy

> **Note:** This event is deprecated. Use the [`outputAction`](#outputaction) event instead.

Triggered when the copy output button of an output is clicked. The `prompt` and the `output` object are available through the event argument.


<div class="meta-api-description">
Listen for user interactions when the copy button on AI-generated output is clicked to track copy actions, capture clipboard events, detect copy triggers, monitor user copying behavior, or customize how clipboard data is handled and processed. This event enables capturing details about the original prompt and corresponding generated content being copied, supporting use cases like analytics on copy usage, custom feedback displays, or integrations that respond to copy events from AI outputs. It helps implement event-driven responses to copy operations on AI prompt results, including identifying the source prompt, copying output content, and managing UI notifications or clipboard modifications triggered by user copy activity.
</div>

#### Example

    <div id="aiprompt"></div>
    <script>
    $("#aiprompt").kendoAIPrompt({
        outputCopy: function(e) {
            console.log("Output copied:", e.output);
        }
    });
    </script>

### outputAction

Triggered when an action button on an output card is clicked. This event is fired for both built-in and custom actions.


<div class="meta-api-description">
Capture and handle user interactions with action buttons on AI-generated output cards by detecting clicks and triggering events for both default and custom actions, enabling developers to execute custom code, manage response flows, control button behaviors, inspect event details, override defaults, and integrate action responses dynamically within applications or workflows.
</div>

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
        outputActions: ["copy", "retry", { command: "bookmark", icon: "star" }],
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


<div class="meta-api-description">
Detect when an AI prompt generation is stopped or aborted by the user, enabling you to respond to cancellation events such as pressing a stop button or halting the AI output stream; this event lets you intercept prompt request interruptions to terminate streaming processes, stop loading indicators, manage cleanup tasks, and handle user-triggered termination of ongoing AI completions or generation flows effectively.
</div>

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

