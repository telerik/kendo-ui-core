---
title: Editor
page_title: Configuration, methods and events of Kendo UI Editor
description: Help guide for proper configuration of Editor UI widget, and how to use methods and events.
res_type: api
component: editor
---

# kendo.ui.Editor

Represents the Kendo UI Editor widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### ai `Object`

Defines the configuration options for the AI tools in the Editor.


<div class="meta-api-description">
How do I customize AI editing tools in Kendo UI Editor? Set and customize AI-driven editing capabilities by enabling or disabling intelligent tools, selecting AI models and endpoints, providing authentication credentials, creating or adjusting prompt templates, managing feature toggles or rate limits, and specifying tool-specific settings to tailor the behavior and performance of AI-assisted content editing within the Editor environment.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        service: {
          url: "/api/llm"
        }
      }
    });
    </script>

### ai.aiPrompt `Object|Boolean`

Defines the configuration options for the side panel AI Prompt tool in the Editor. If set to `false`, the side panel AI Prompt tool is disabled.


<div class="meta-api-description">
How do I enable or disable the AI prompt assistant in a Kendo UI Editor for jQuery? Configure, enable, disable, or customize the side panel AI prompt assistant tool within the editor by adjusting settings that control its behavior, availability, and interaction options. Manage prompt generation features, toggle the AI-driven suggestions panel on or off, set parameters to tailor AI responses, fine-tune assistant options, and control automated prompt assistance accessibility, ensuring flexible integration of AI prompt tools in the editing workspace.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        aiPrompt: {
          // configuration options for the AI prompt
        }
      }
    });
    </script>

### ai.aiPrompt.systemPrompt `Function`
Defines the system prompt for the side panel AI Prompt tool. The function accepts the following arguments:

- `context` - The selected text in the editor.
- `prompt` - The user prompt.


<div class="meta-api-description">
How to customize AI system instructions in Kendo UI Editor using the systemPrompt property? Customize and configure the AI system instructions that guide the behavior and responses of the Editor side panel AI prompt tool, enabling you to control or modify the baseline context sent to the AI based on the current editor selection and user input; set or adjust system-level prompts dynamically by defining a function that receives the editor’s selected text and user query, allowing precise tailoring of AI interactions, prompt engineering, system command customization, contextual prompt adaptation, and fine-tuning system messages that influence AI output generation within the editor environment.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        aiPrompt: {
          systemPrompt: (context, prompt) => `You are an advanced AI language assistant.
                                A user has selected a portion of their text and provided a query regarding how they want it modified.
                                Your task is to accurately respond to their request while preserving the original intent of the text.
                                Follow the instructions strictly and provide only the requested output unless explicitly asked to explain your changes.

                                Selected Text:
                                ${context}

                                User's Request:
                                ${prompt}

                                Response:`
        }
      }
    });
    </script>

### ai.aiPrompt.commands `Array`

Defines the commands for the side panel AI Prompt tool. The commands are displayed in the side panel AI Prompt dropdown.


<div class="meta-api-description">
How to customize the AI prompt commands in Kendo UI Editor? Configure and customize the set of AI prompt commands displayed in the editor’s AI prompt dropdown, enabling addition, removal, or rearrangement of prompt templates, actions, or keyboard shortcuts to tailor the side panel’s available commands for quick invocation, managing which commands appear in the AI prompt interface during editor initialization, and controlling user access to specific prompts or shortcuts within the AI assistant dropdown menu.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        aiPrompt: {
          commands: [
            {
              id: "1",
              text: "Make the text funnier",
              icon: "star",
              prompt: (context) => `Make the following text funnier: ${context}`
            }
          ]
        }
      }
    });
    </script>

### ai.aiPrompt.commands.text `String`

The text of the command.


<div class="meta-api-description">
How to customize the textual content of AI prompt commands in Kendo UI Editor? Configure or customize the textual content of AI prompt commands within the editor, controlling both the visible label shown to users and the exact text sent for AI processing or interpretation; this setting enables defining, adjusting, or modifying command display names, input strings, and command payloads to influence AI behavior, response generation, or trigger specific AI functions, supporting refinement of prompts, command personalization, content management, and seamless interaction flows in AI-driven editor environments.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        ai: {
            aiPrompt: {
                commands: [{
                    text: "Summarize"
                }]
            }
        }
    });
    </script>

### ai.aiPrompt.commands.id `String`

The id of the command.


<div class="meta-api-description">
How do I uniquely identify and reference AI prompt commands in a Kendo UI Editor? Configure or assign a unique identifier for AI prompt commands to enable referencing, registering, executing, or managing commands programmatically within the editor environment. This identifier acts as a distinct key for binding, looking up, or controlling AI-driven command workflows, allowing developers to set, retrieve, or handle specific prompt commands through code, initialization settings, or dynamic interaction patterns involving command ID assignment, command execution triggers, or command referencing mechanisms in AI editor integrations.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        ai: {
            aiPrompt: {
                commands: [{
                    id: "summarize",
                    text: "Summarize"
                }]
            }
        }
    });
    </script>

### ai.aiPrompt.commands.icon `String`

The icon of the command.


<div class="meta-api-description">
How do I customize the visual representation of AI prompt commands in Kendo UI's Editor component? Configure or customize the visual representation for AI prompt commands within the editor by setting an icon, glyph, or image that visually indicates the command’s function; this includes using font icons, SVG graphics, CSS-based symbols, or images to clearly symbolize actions on command buttons, enabling intuitive command identification, interface customization, and enhanced user experience by controlling how commands are visually conveyed in AI-driven prompts and editor tools.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        ai: {
            aiPrompt: {
                commands: [{
                    icon: "gear",
                    text: "Summarize"
                }]
            }
        }
    });
    </script>

### ai.aiPrompt.commands.prompt `Function`

The prompt for the command. The function accepts the following arguments:

- `context` - The text in the editor.


<div class="meta-api-description">
How do I customize the AI prompt generation in Kendo UI Editor using the `prompt` command? Customize or set the dynamic input text for AI command generation by configuring how editor content is transformed into prompts; define or programmatically build prompts using functions that receive the current editor text context, enabling you to generate, rewrite, summarize, extend, or modify the input request sent to AI systems, allowing flexible control over AI-driven content creation and interaction within the editor environment.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        ai: {
            aiPrompt: {
                commands: [{
                    text: "Summarize",
                    prompt: function(context) {
                        return "Please summarize the following text: " + context;
                    }
                }]
            }
        }
    });
    </script>

### ai.aiPrompt.promptSuggestions `Array`

Defines the suggestions for the side panel AI Prompt tool. The suggestions are displayed in the side panel AIPrompt tool.


<div class="meta-api-description">
How can I customize the suggestion list in the AI prompt tool's side panel in Kendo UI for jQuery? Configure and customize the AI prompt tool's suggestion list in the editor side panel to tailor prompt hints, preset inputs, autocomplete options, or suggestion labels for improved user guidance. Enable control over which suggestions appear to deliver contextually relevant prompts, quick access to commonly used phrases, or dynamically generated recommendations. Adjust and manage the side panel prompt entries to enhance user experience with custom, adaptive, or predefined AI prompt completions, helping users find appropriate prompts, examples, or labels efficiently during content creation or coding tasks.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        ai: {
            aiPrompt: {
                promptSuggestions: [
                    "Summarize this text",
                    "Improve grammar",
                    "Make it more formal",
                    "Translate to Spanish"
                ]
            }
        }
    });
    </script>


### ai.commands `Array`

Defines the shared fast commands for the side panel AI Prompt tool and the inline popup prompt tool. The commands are displayed in the side panel AI Prompt view and the context menu of the inline popup tool.

The commands can be configured separately in the `ai.aiPrompt.commands` and `ai.inlineAIPrompt.commands` properties.


<div class="meta-api-description">
How to customize the AI prompt commands in Kendo UI Editor? Configure and customize the set of AI prompt commands displayed in the editor’s AI prompt dropdown, enabling addition, removal, or rearrangement of prompt templates, actions, or keyboard shortcuts to tailor the side panel’s available commands for quick invocation, managing which commands appear in the AI prompt interface during editor initialization, and controlling user access to specific prompts or shortcuts within the AI assistant dropdown menu.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        commands: [
          {
            id: "1",
            text: "Make the text funnier",
            icon: "star",
            prompt: (context) => `Make the following text funnier: ${context}`
          }
        ]
      }
    });
    </script>

### ai.commands.text `String`

The text of the command.


<div class="meta-api-description">
How to customize command titles in Kendo UI editor? Control or customize the label, caption, or displayed text of commands, buttons, or menu items in the editor interface, enabling dynamic naming, localization, translation, and UI adjustments for toolbars, context menus, or command palettes; configure how command titles appear visually to users, set custom strings for commands, and tailor interface text for different languages or user preferences.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        ai: {
            commands: [{
                text: "Proofread"
            }]
        }
    });
    </script>

### ai.commands.id `String`

The id of the command.


<div class="meta-api-description">
How to set a unique identifier for an AI command in Kendo UI Editor? Set or specify the unique identifier for a custom or built-in AI command within the editor interface to enable precise command registration, invocation, mapping, binding of keyboard shortcuts, or UI buttons, supporting scenarios like referencing commands programmatically, configuring shortcut assignments, linking actions to interface elements, and managing command execution across initialization and runtime with a stable command key for plugin or extension development.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        ai: {
            commands: [{
                id: "proofread",
                text: "Proofread"
            }]
        }
    });
    </script>

### ai.commands.icon `String`

The icon of the command.


<div class="meta-api-description">
How do I customize the icon for a specific command in Kendo UI Editor? Customize the toolbar or menu button appearance by configuring the visual icon tied to a command, using a string identifier such as an icon name, CSS class, or symbol to define and control how the icon is displayed within the editor’s interface, including setting, changing, or styling command icons for improved UX and intuitive command recognition.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        ai: {
            commands: [{
                icon: "spell-checker",
                text: "Proofread"
            }]
        }
    });
    </script>

### ai.commands.prompt `Function`

The prompt for the command. The function accepts the following arguments:

- `context` - The text in the editor.


<div class="meta-api-description">
How to customize the input prompt for AI commands in a Kendo UI editor? Configure or customize the input prompt text dynamically when triggering AI-powered commands within a text editor, enabling control over the messages, instructions, or content sent to AI services by leveraging the current editor content as context; this includes generating, modifying, enriching, or tailoring prompts based on the live text to optimize AI responses, customize natural language inputs, set parameters for AI commands, or inject contextual data before execution, supporting various use cases like text completion, rewriting, summarization, or command-specific instructions.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        ai: {
            commands: [{
                text: "Proofread",
                prompt: function(context) {
                    return "Please proofread and correct any errors in the following text: " + context;
                }
            }]
        }
    });
    </script>

### ai.inlineAIPrompt `Object|Boolean`

Defines the configuration options for the inline AI Prompt tool in the Editor. If set to `false`, the inline AI Prompt tool is disabled.


<div class="meta-api-description">
How do I enable/disabled inline AI suggestions in Kendo UI Editor? Control and customize inline artificial intelligence suggestions within the text editor, enabling or disabling real-time AI prompt displays, adjusting how AI-generated completions or recommendations appear as you type, managing inline suggestion behavior, configuring automatic prompt triggers, and setting preferences for dynamic, context-aware content generation assistance integrated directly into the editing interface.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        inlineAIPrompt: {
          // configuration options
        }
      }
    });
    </script>

### ai.inlineAIPrompt.systemPrompt `Function`
Defines the system prompt for the inline AI Prompt tool. The function accepts the following arguments:

- `context` - The selected text in the editor.
- `prompt` - The user prompt.


<div class="meta-api-description">
How do I customize AI system instructions for inline prompt tools in Kendo UI Editor? Control and customize the underlying AI system instructions for inline prompt tools by configuring the system-level directive that guides AI responses based on the current editor context and user input. Enable setting or modifying the base AI behavior for inline text editing by providing a dynamic function that receives the selected text and user query, allowing developers to tailor how the AI interprets and generates suggestions or completions. This flexibility supports advanced use cases like contextual adaptation, prompt engineering, or dynamic system prompt injection to influence AI output during text editing workflows.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        inlineAIPrompt: {
          systemPrompt: (context, prompt) => `You are an advanced AI language assistant.
                                A user has selected a portion of their text and provided a query regarding how they want it modified.
                                Your task is to accurately respond to their request while preserving the original intent of the text.
                                Follow the instructions strictly and provide only the requested output unless explicitly asked to explain your changes.


          Selected Text:
                                ${context}


          User's Request:
          ${prompt}

          Response:`
        }
      }
    });
    </script>

### ai.inlineAIPrompt.commands `Array`

Defines the commands for the inline AI Prompt tool. The commands are displayed in the inline AI Prompt dropdown.


<div class="meta-api-description">
How do I customize the AI-driven commands in the Kendo UI Editor inline prompt dropdown? Customize and manage the list of AI-driven commands accessible from the inline AI prompt dropdown in the editor, including setting which commands are available, how they are labeled, triggered, or executed during editing sessions. Enable, configure, or restrict AI prompt commands dynamically to tailor user interactions, define command actions and handlers, control visibility and invocation methods, and configure these settings at initialization for seamless integration of AI-assisted editing features within the inline prompt interface. This supports use cases such as adding custom AI commands, modifying command behavior, adjusting the command menu options, and streamlining how users activate AI-generated suggestions directly in the editor environment.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        inlineAIPrompt: {
          commands: [
            {
              id: "funnier",
              text: "Make the text funnier",
              icon: "star",
              prompt: (context) => `Make the following text funnier: ${context}`
            }
          ]
        }
      }
    });
    </script>

### ai.inlineAIPrompt.commands.text `String`

The text of the command.


<div class="meta-api-description">
How do I customize the trigger text for inline AI commands in Kendo UI Editor? Configure or set the trigger text, label, or command phrase that activates the inline AI prompt or inline artificial intelligence command within an editor environment, enabling customization of the exact string that appears and is submitted when users invoke inline AI features, facilitating control over how inline AI actions are called, recognized, or bound through text commands or keywords in real-time content editing workflows.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        ai: {
            inlineAIPrompt: {
                commands: [{
                    text: "Enhance"
                }]
            }
        }
    });
    </script>

### ai.inlineAIPrompt.commands.id `String`

The id of the command.


<div class="meta-api-description">
How do I assign a unique ID to inline AI prompt commands in Kendo UI for jQuery Editor? Assigning a unique identifier to inline AI prompt commands enables precise referencing, execution, and management within the Editor, facilitating command mapping, handler association, user interaction tracking, command lookup, activation control, and seamless integration of AI-driven actions by setting or configuring distinctive IDs that link commands to their corresponding handlers or trigger points during editing workflows.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        ai: {
            inlineAIPrompt: {
                commands: [{
                    id: "enhance",
                    text: "Enhance"
                }]
            }
        }
    });
    </script>

### ai.inlineAIPrompt.commands.icon `String`

The icon of the command.


<div class="meta-api-description">
How do I customize the icon for inline AI prompt commands in Kendo UI Editor? Control and customize the visual symbol, glyph, or icon shown alongside inline AI prompt commands within the editor interface, enabling you to set, change, or configure the command's graphical representation for buttons, labels, or toolbar elements, helping users identify or distinguish specific AI-driven actions or shortcuts through icons, visuals, or symbolic imagery.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        ai: {
            inlineAIPrompt: {
                commands: [{
                    icon: "sparkline",
                    text: "Enhance"
                }]
            }
        }
    });
    </script>

### ai.inlineAIPrompt.commands.prompt `Function`

The prompt for the command. The function accepts the following arguments:

- `context` - The selected text in the editor.


<div class="meta-api-description">
How do I dynamically customize the AI command prompt in Kendo UI Editor based on user selection? Set, configure, or customize the text prompt dynamically for inline AI commands within the editor by controlling how prompt content is generated from the current selection or context. Enable customizable prompt generation based on the selected text, providing options to create, modify, or transform prompt inputs at runtime using functions that process or analyze editor selection data. Adjust, compute, or tailor AI command prompts interactively depending on the highlighted content, with support for dynamic prompt creation driven by the current editing context or user input, useful for adaptive, context-aware AI text generation and inline command customization.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        ai: {
            inlineAIPrompt: {
                commands: [{
                    text: "Enhance",
                    prompt: function(context) {
                        return "Please enhance the following text: " + context;
                    }
                }]
            }
        }
    });
    </script>

### ai.pane `Object`

Defines the configuration options for the Splitter Pane containing the side panel AI Prompt. This allows you to control the pane's size, minimum size, collapsibility, and collapsed state.


<div class="meta-api-description">
How do I control the width of the AI Prompt panel in Kendo UI Editor? Configure and control the AI Prompt side panel within the editor by setting the panel’s width, minimum width, collapsible behavior, and default collapsed or expanded state, enabling dynamic resizing, toggling visibility, and programmatic management of the prompt panel’s display and layout in the editing interface.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        pane: {
          min: "370px",
          size: "370px",
          collapsible: true,
          collapsed: true
        }
      }
    });
    </script>

### ai.pane.min `String`

Sets the minimum size of the pane.


<div class="meta-api-description">
How do I prevent an AI editing pane from shrinking too small with Kendo UI for jQuery Editor? Set or control the minimum size, limit, or smallest dimension of an AI editing pane or panel to prevent it from shrinking too small, collapse completely, or disrupt layout, enabling configuration of pane resizing constraints, maintaining consistent UI proportions, and managing how the editor’s AI interface scales or resizes during use or initialization.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        ai: {
            pane: {
                min: "200px"
            }
        }
    });
    </script>

### ai.pane.size `String`

Sets the size of the pane.


<div class="meta-api-description">
How do I configure the size of an AI panel in Kendo UI Editor? Control and configure the dimensions of the AI sidebar or panel within an editor interface by setting its visible width or height, enabling customization of how much screen space the AI tools, controls, and content occupy; adjust, resize, or set the layout allocation for AI features during initialization or dynamically to optimize workspace, manage panel proportions, balance editor and AI component visibility, and tailor the user interface to prioritize AI assistance or coding space according to developer preferences and workflow needs.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        ai: {
            pane: {
                size: "350px"
            }
        }
    });
    </script>

### ai.pane.collapsible `Boolean`

Enables the collapsibility of the pane.


<div class="meta-api-description">
How to toggle editor pane visibility in Kendo UI for jQuery? Enable or disable the ability to toggle, collapse, expand, hide, or show the side panel or editor pane to save screen space, control visibility, and manage the user interface by configuring whether the editor area can be dynamically minimized or maximized during use. This setting governs interactive pane collapsing or expansion functionality, allowing developers to set if users can fold or unfold the editor sidebar or sections to optimize layout, navigation, and workspace customization.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        ai: {
            pane: {
                collapsible: true
            }
        }
    });
    </script>

### ai.pane.collapsed `Boolean`

Sets the collapsed of the pane.


<div class="meta-api-description">
How to collapse a pane in Kendo UI Editor by default? Control the visibility and expanded or collapsed state of user interface panels, enabling configuration and dynamic toggling of panel display to show or hide content areas, set initial pane collapse or expansion states, programmatically open or close interface sections, manage sidebar or editor pane visibility, adjust layout presentation by collapsing or expanding UI panels, and customize user interface component state for improved workflow and screen space management.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        ai: {
            pane: {
                collapsed: false
            }
        }
    });
    </script>

### ai.service `String|Object`

The URL of the AI service to use for generating outputs.


<div class="meta-api-description">
How do I configure the URL endpoint for AI-powered content generation in Kendo UI Editor? Configure and set the URL endpoint for AI-powered content generation within the Editor, enabling integration with hosted AI model APIs, proxy servers, or custom artificial intelligence backends to control where and how automated outputs are generated. This setting defines the service address the Editor contacts to request AI-generated content, supporting scenarios like connecting to external AI services, routing through proxies, or linking to personalized machine learning model endpoints, allowing developers to enable, customize, or specify the source of AI-driven text creation and enhance content automation workflows.
</div>

#### Example
    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        service: "/api/llm"
      }
    });
    </script>

### ai.service.url `String`
The Url of the AI service to use for generating outputs.


<div class="meta-api-description">
How to configure the AI service endpoint URL in the Kendo UI Editor? Configure the HTTP or HTTPS endpoint URL to direct where AI generation requests are sent and responses received, enabling integration with a specific AI service for content creation, output generation, or model inference; set, update, or customize the connection target for the Editor's AI backend service, specify the remote API address for calling AI models, and control the endpoint used for automated content generation or prediction results.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        service: {
          url: "/api/llm"
        }
      }
    });
    </script>


### ai.service.headers `Object`

The headers to send with the AI service request.


<div class="meta-api-description">
How do I add authentication tokens to Kendo UI Editor's AI service requests? Add or configure custom HTTP headers for AI service requests sent by the editor to include authentication tokens, API keys, authorization credentials, content-type specifications, metadata, or other custom header information. Control, set, or inject key-value pairs in headers for every outgoing AI service call, ensure requests carry necessary security tokens or content format instructions, enable passing bearer tokens, OAuth credentials, or custom metadata, and update or override these headers dynamically during initialization or configuration changes to manage request authentication, content negotiation, and additional HTTP header requirements.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        service: {
            url: "/api/llm",
            headers: {
                "Authorization": "Bearer token"
            }
        }
      }
    });
    </script>

### ai.service.data `Object|Function`

The data to send with the AI service request.


<div class="meta-api-description">
How to customize extra parameters for AI-driven editor features in Editor.ai service data? Customize and extend AI service requests by configuring extra parameters, payloads, or metadata to be included in the request body when calling AI-driven editor features, enabling control over additional data sent during initialization or runtime for more precise or enriched interactions with the AI service.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        service: {
            url: "/api/llm",
            data: {
                "key": "value"
            }
        }
      }
    });
    </script>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
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
      }
    });
    </script>

### ai.service.outputGetter `Function`

The function to get the output from the AI service response.


<div class="meta-api-description">
How do I configure Kendo UI for jQuery to handle diverse AI service responses and extract specific content from raw output? Configure a custom function to extract, parse, map, or transform content from raw AI service responses, enabling precise retrieval of text, nested fields, JSON payloads, or completion data for insertion or use within the editor; control how to interpret diverse, variable API response formats, shape response parsing logic, manipulate or select specific output segments, and handle differing response structures to ensure correct, usable content is obtained from AI service replies.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      ai: {
        service: {
            url: "/api/llm",
            outputGetter: function(response) {
                return response.output;
            }
        }
      }
    });
    </script>

### deserialization `Object`

Fine-tune deserialization in the Editor widget. Deserialization is the process of parsing the HTML string input from the value() method or from the viewHtml dialog into editable content.


<div class="meta-api-description">
How can I customize the way HTML content is parsed and transformed into the editable data model in a Kendo UI Editor? Control and customize how HTML content is parsed and transformed into the editable data model, including managing tag interpretation, attribute handling, content sanitization, HTML string processing, and applying custom parsing or transformation rules for content loaded from source or edited via HTML views. Enable fine-grained configuration for converting raw HTML into structured editor data, adjust deserialization behavior to handle different HTML formats, sanitize input to prevent unwanted tags or attributes, set parsing strategies during initialization, and tailor how HTML strings are decoded into the editor’s internal representation to support rich text editing workflows.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        deserialization: {
            custom: function(html) {
                return html.replace(/(<\/?)b(\s?)/, "$1strong$2");
            }
        }
    });
    </script>

### deserialization.custom `Function`

Callback that allows custom deserialization to be plugged in. The method accepts string as the only parameter and is expected to return the modified content as string as well.


<div class="meta-api-description">
How do I modify incoming HTML content when importing it into a Kendo UI Editor using the deserialization custom callback? Customize how incoming content is parsed and transformed before insertion by configuring callbacks that handle deserialization, enabling control over processing raw input strings, sanitizing or modifying HTML content during import, adjusting how text or markup is converted into editor models, and implementing specialized parsing logic for content import workflows. This includes setting up functions to intercept and alter source content, performing custom transformations, filtering, cleanup, or format conversion to tailor how external data, HTML, or serialized strings are interpreted and incorporated into the editing environment.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            deserialization: {
                custom: function(html) {
                    return html.replace(/(<\/?)b(\s?)/, "$1strong$2");
                }
            }
        });
    </script>

### domain `String`

Relaxes the same-origin policy when using the iframe-based editor.
This is done automatically for all cases except when the policy is relaxed by document.domain = document.domain.
In that case, this property must be used to allow the editor to function properly across browsers.
This property has been introduced in internal builds after 2014.1.319.


<div class="meta-api-description">
How to configure cross-origin settings for iframe-based editors using kendo UI editor.domain property? Control and customize cross-origin settings for iframe-based editors by configuring domain properties to manage same-origin policy relaxation when using document.domain assignments, enabling seamless editor interaction across different browser security models and cross-site scripting scenarios, facilitating compatibility in environments where automatic cross-origin detection fails, adjusting iframe domain parameters to allow secure editing sessions, and ensuring consistent functionality for web editing tools operating within cross-domain contexts or embedded frames.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    document.domain = document.domain;

    $("#editor").kendoEditor({
      domain: document.domain
    });
    </script>

### encoded `Boolean` *(default: true)*

Indicates whether the Editor should submit encoded HTML tags. By default, the submitted value is encoded.


<div class="meta-api-description">
How to configure Kendo UI Editor to send HTML content as encoded text? Configure whether the editor sends content as raw HTML or as encoded text, enabling control over HTML tag encoding during submission, posting, or data binding. Adjust settings to toggle between encoding HTML entities for safe output or allowing unencoded, literal HTML to pass through, useful for managing security, rendering behavior, or content formatting. Manage how the editor handles HTML tags in user input, deciding if tags are escaped or preserved verbatim when saving or transmitting data. Enable or disable automatic HTML encoding to balance between preventing injection issues and supporting rich text with embedded tags. Choose encoding preferences for content processing, sanitization, or integration with other systems that expect either escaped or raw HTML in editor output.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      value: "<p>foo</p>",
      encoded: false
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log($("#editor").val()); // logs "<p>foo</p>"
    </script>

### immutables `Boolean|Object` *(default: false)*

If enabled, the editor disables the editing and command execution in elements marked with editablecontent="false" attribute.


<div class="meta-api-description">
How to enable read-only mode for specific sections within a Kendo UI Editor? Control and restrict user modifications within specific sections or elements by disabling editing capabilities and blocking command execution on content marked as non-editable or immutable, such as elements flagged with editablecontent="false". Configure the editor to recognize and enforce immutable areas during initialization, preventing cursor input, text changes, commands, or interactive alterations within these protected regions, enabling use cases like read-only blocks, locked content zones, or safeguarding vital UI components from modifications while allowing normal editing elsewhere. Set, enable, or configure immutability constraints to maintain content integrity inside designated elements, ensuring consistent behavior for developers seeking to disable editing and command processing within certain parts of the editor content.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        "bold", "italic", "underline", "justifyLeft", "justifyCenter", "justifyRight", "insertUnorderedList", "insertOrderedList", "indent", "outdent", "createLink", "unlink", "insertImage", "createTable", "viewHtml"
      ],
      value: '<p>editable content</p><p contenteditable="false">content, which <span style="color:red;">can not</span> be changed</p><p contenteditable="false">immutable content</p>',
      immutables: true
    });
    </script>

### immutables.deserialization `Function`

Callback that allows custom deserialization of an immutable element. The callback accepts two arguments. The DOM element representing the immutable element in the html view and the immutable DOM element, which will be restored.


<div class="meta-api-description">
How do I customize immutable DOM node behavior when deserializing content in a Kendo UI editor? Configure or enable custom deserialization processes for immutable elements when restoring or loading content within an editor or rich text component, allowing inspection, transformation, or replacement of immutable DOM nodes during content restoration or deserialization steps. This includes controlling how immutable parts of the DOM are parsed, processed, or overridden when converting HTML content back into the editor's internal model, supporting use cases such as customizing immutable node behavior, handling special content types, or modifying immutable structures on restore. Developers often need to set callbacks or handlers that receive the original DOM nodes and provide transformed or substituted nodes during the deserialization or content load phase to manage immutable elements effectively. This enables advanced content restoration, immutable node manipulation, custom parsing logic, or specialized handling of non-editable sections during editor state recovery or paste operations.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        "bold", "italic", "underline", "justifyLeft", "justifyCenter", "justifyRight", "insertUnorderedList", "insertOrderedList", "indent", "outdent", "createLink", "unlink", "insertImage", "createTable", "viewHtml"
      ],
      value: '<p>editable content</p><p contenteditable="false">content, which <span style="color:red;">can not</span> be changed</p><p contenteditable="false">editable content</p>',
      immutables: {
        deserialization: function(node, immutable) {
          immutable.style.backgroundColor = "red";
        }
      }
    });
    </script>

### immutables.serialization `String|Function`

Kendo template or a callback that allows custom serialization of an immutable element. The callback accepts DOM element as only parameter and is expected to return the HTML source of a DOM element.


<div class="meta-api-description">
How can I customize the HTML output of immutable elements in Kendo UI Editor? Control and customize the conversion of immutable elements to HTML output by configuring serialization with a template or callback that transforms DOM elements into HTML strings, enabling tailored rendering, saving, exporting, or retrieving of editor content using custom serialization logic, templates, or functions to define how specific elements are serialized into HTML markup during content processing or output generation.
</div>

#### Example - specify serialization as a kendo template

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        "bold", "italic", "underline", "justifyLeft", "justifyCenter", "justifyRight", "insertUnorderedList", "insertOrderedList", "indent", "outdent", "createLink", "unlink", "insertImage", "createTable", "viewHtml"
      ],
      value: '<p>editable content</p><p contenteditable="false">content, which <span style="color:red;">can not</span> be changed</p><p contenteditable="false">immutable content</p>',
      immutables: {
          serialization: "<#= data.nodeName # data=\"immutable-element\"></#= data.nodeName #>"
      }
    });
    </script>

#### Example - specify serialization as a function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        "bold", "italic", "underline", "justifyLeft", "justifyCenter", "justifyRight", "insertUnorderedList", "insertOrderedList", "indent", "outdent", "createLink", "unlink", "insertImage", "createTable", "viewHtml"
      ],
      value: '<p>editable content</p><p contenteditable="false">content, which <span style="color:red;">can not</span> be changed</p><p contenteditable="false">immutable content</p>',
      immutables: {
        serialization: function(node) {
          var tagName = node.tagName;
          return "<" + tagName + ">" + "</" + tagName + ">";
        }
      }
    });
    </script>

### inlineHeight `Number`

This property enables you to configure height for the Editor when the component is in [`inline`](https://demos.telerik.com/kendo-ui/editor/inline-editing) mode.

> This configuration is required when you want to use the `formattingMarks` tool in an inline editor.


<div class="meta-api-description">
How do I set a fixed size for inline text editing areas in Kendo UI Editor? Adjust the vertical height or set a fixed size for inline text editing areas to control the visible editing region, manage content overflow, enable or disable scrolling within inline editors, customize layout and presentation for embedded or in-place text input fields, maintain consistent inline editor dimensions during content editing or binding operations, ensure proper display and usability when activating formatting tools or rich text features within inline editing contexts, and configure the editable area height for seamless integration in page layouts and user interfaces.
</div>

#### Example

    <div id="editor">
        <h2>
            Comprehensive HTML5/JavaScript framework <br />
            for modern web and mobile app development
        </h2>
        <p>
            Kendo UI is everything professional developers need
            to build HTML5 sites and mobile apps. Today, productivity
            of an average HTML/jQuery developer is hampered by
            assembling a Frankenstein framework of disparate
            JavaScript libraries and plug-ins.
        </p>
        <p>
            Kendo UI has it all: rich jQuery-based widgets,
            a simple and consistent programming interface,
            a rock-solid DataSource, validation, internationalization,
            a MVVM framework, themes, templates and the list goes on.
        </p>
    </div>

    <script>
      $("#editor").kendoEditor({
        inlineHeight: 200
      });
    </script>

### messages `Object`

Defines the text of the labels that are shown within the editor. Used primarily for localization.


<div class="meta-api-description">
How do I customize button names in the Kendo UI Editor? Customize, configure, or set localized labels, user interface text, and display messages for the Editor’s UI elements, including button names, prompts, tooltips, instructions, and other interface wording; control how the editor’s textual elements appear in different languages or customized text sets, enabling translation, localization, internationalization, or custom wording of all editor labels and messages to tailor the editing interface presentation and user experience.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        bold: "Bold",
        italic: "Italic",
        underline: "Underline",
        strikethrough: "Strikethrough",
        superscript: "Superscript",
        subscript: "Subscript",
        justifyCenter: "Center text",
        justifyLeft: "Align text left",
        justifyRight: "Align text right",
        justifyFull: "Justify",
        insertUnorderedList: "Insert unordered list",
        insertOrderedList: "Insert ordered list",
        indent: "Indent",
        outdent: "Outdent",
        createLink: "Insert hyperlink",
        unlink: "Remove hyperlink",
        insertImage: "Insert image",
        insertFile: "Insert file",
        insertHtml: "Insert HTML",
        fontName: "Select font family",
        fontNameInherit: "(inherited font)",
        fontSize: "Select font size",
        fontSizeInherit: "(inherited size)",
        formatBlock: "Format",
        formatting: "Format",
        style: "Styles",
        viewHtml: "View HTML",
        overwriteFile: "A file with name \"{0}\" already exists in the current directory. Do you want to overwrite it?",
        imageWebAddress: "Web address",
        imageAltText: "Alternate text",
        fileWebAddress: "Web address",
        fileTitle: "Title",
        linkWebAddress: "Web address",
        linkText: "Text",
        linkToolTip: "ToolTip",
        linkOpenInNewWindow: "Open link in new window",
        dialogInsert: "Insert",
        dialogUpdate: "Update",
        dialogCancel: "Cancel",
        dialogCancel: "Cancel",
        createTable: "Create table",
        addColumnLeft: "Add column on the left",
        addColumnRight: "Add column on the right",
        addRowAbove: "Add row above",
        addRowBelow: "Add row below",
        deleteRow: "Delete row",
        deleteColumn: "Delete column"
      }
    });
    </script>


### messages.accessibilityTab `String` *(default: 'Advanced')*

The title of the tab containing advanced and accessibility configurations in the Table Wizard dialog.


<div class="meta-api-description">
How to change the accessibility tab title in Kendo UI Editor? Customize or localize the title text for the accessibility and advanced settings tab within the Editor’s Table Wizard dialog, enabling control over the display label used for accessibility options, advanced configuration panels, or tab headers in table editing interfaces, supporting internationalization, UI text adjustments, and user-friendly naming for assistive technology or language preferences.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        accessibilityTab: "Advanced"
      }
    });
    </script>

### messages.addColumnLeft `String` *(default: "Add column on the left")*

The title of the tool that adds table columns on the left of the selection.


<div class="meta-api-description">
How do I customize the message for adding a new column on the left in Kendo UI Editor? Customize or configure the label, tooltip, or text displayed for the action that inserts or adds a new column on the left side of a table within an editor interface, enabling users to control the naming, wording, or message shown when triggering table column insertion to the left, including adjusting the prompt for adding adjacent columns on the left side of tabular data.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        addColumnLeft: "Add column on the left"
      }
    });
    </script>

### messages.addColumnRight `String` *(default: "Add column on the right")*

The title of the tool that adds table columns on the right of the selection.


<div class="meta-api-description">
How to customize the "Add Column Right" button text in Kendo UI Editor? Customize or translate the label, tooltip, or title text for adding a new table column to the right side in a text editor or rich content editor, enabling localization, internationalization, language adjustments, or UI text customization for the insert column right function, column insertion controls, or table editing tools seen in spreadsheet editors, document editors, and content management interfaces.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        addColumnRight: "Add column on the right"
      }
    });
    </script>

### messages.addRowAbove `String` *(default: "Add row above")*

The title of the tool that adds table rows above the selection.


<div class="meta-api-description">
How do I customize the "Add Row Above" button in Kendo UI Editor? Configure or customize the label, tooltip, or button text for inserting a new table row above the currently selected row in the editor’s toolbar, enabling users to add rows above existing ones, control table structure editing by prepending rows, modify UI messages for table row insertion above selection, and set accessible titles or descriptions for the add-above-row function in data grids or rich text tables.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        addRowAbove: "Add row above"
      }
    });
    </script>

### messages.addRowBelow `String` *(default: "Add row below")*

The title of the tool that adds table rows below the selection.


<div class="meta-api-description">
How do I localize the "Add Row Below" button in a Kendo UI Editor? Configure or customize the label, text, or title displayed for the toolbar button or action that inserts a new table row beneath the current one, including localization and translated names, enabling users to change, set, or control how the insert row below feature is named or presented in different languages or contexts within the editor interface.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        addRowBelow: "Add row below"
      }
    });
    </script>

### messages.alignCenter `String` *(default: 'Align Center')*

The title of the tool that aligns the cell text.


<div class="meta-api-description">
How do I change the "center align" button label in Kendo UI Editor? Set or customize the label, caption, or tooltip text for the text alignment control that centers content within an editor toolbar, enabling localization, translation, or adjustment of the button name used to align text horizontally to the middle or center position in rich text, HTML, or WYSIWYG editors.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({

      messages: {
        alignCenter: "Align Center"
      }
    });
    </script>

### messages.alignCenterBottom `String` *(default: 'Align Center Bottom')*

The title of the tool that aligns the cell text.


<div class="meta-api-description">
How do I customize the label for aligning content to the bottom center in a Kendo UI Editor? Customize or set the label, title, or tooltip text for the action that aligns table cell content or text to the vertical bottom and horizontal center within editing toolbars or UI components, enabling localization or customization of alignment controls for center-bottom positioning in grid or table editors, text alignment settings, or content formatting interfaces.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignCenterBottom: "Align Center Bottom"
      }
    });
    </script>

### messages.alignCenterMiddle `String` *(default: 'Align Center Middle')*

The title of the tool that aligns the cell text.


<div class="meta-api-description">
How to customize the label for center-middle alignment option in Kendo UI Editor? Customize, configure, or translate the label, tooltip, or title for the center-middle text alignment option in a text editor or spreadsheet cell, enabling users to identify and control horizontal and vertical centering of content. Adjust localization, naming, or display text for the alignment tool that centers text both vertically in the middle and horizontally in the center, supporting multilanguage setups, UI customization, or accessibility improvements for cell alignment controls. This includes setting labels for commands or features that align cell or text content so it appears perfectly centered across rows and columns in editable grids or document editors.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignCenterMiddle: "Align Center Middle"
      }
    });
    </script>

### messages.alignCenterTop `String` *(default: 'Align Center Top')*

The title of the tool that aligns the cell text.


<div class="meta-api-description">
How to customize the "top center" alignment option label in a Kendo UI Editor? Customize, translate, or set the label, tooltip, or title for the alignment option that centers text horizontally and aligns it to the top within cells. Enable localization, configure display text, control the user interface message for the tool that adjusts cell content alignment to center and top positions. Support multiple languages, modify prompt text, or redefine the wording related to the top-center text alignment feature in editors or grid components.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignCenterTop: "Align Center Top"
      }
    });
    </script>

### messages.alignLeft `String` *(default: 'Align Left')*

The title of the tool that aligns the cell text.


<div class="meta-api-description">
How can I configure the alignment control in Kendo UI Editor to align text to the left? Configure the text alignment control to position content flush to the left edge, customize the label or tooltip displayed for the left alignment option, localize or translate the alignment button name for various languages, set or modify the descriptive title indicating left-align functionality in text editors or grid cells, and enable clarity on the interface element that aligns text content to the start or left side within editable tables or documents.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignLeft: "Align Left"
      }
    });
    </script>

### messages.alignLeftBottom `String` *(default: 'Align Left Bottom')*

The title of the tool that aligns the cell text.


<div class="meta-api-description">
How do I customize the "align left bottom" label in Kendo UI Editor? Configure or customize the text label, tooltip, or title displayed in the editor interface for the function that aligns content or cell text to the bottom left position, enabling developers to localize or change the interface wording for the align-left-bottom alignment command, setting the user-facing string that indicates alignment of text or content positioned horizontally to the left and vertically at the bottom within cells or editable areas.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignLeftBottom: "Align Left Bottom"
      }
    });
    </script>

### messages.alignLeftMiddle `String` *(default: 'Align Left Middle')*

The title of the tool that aligns the cell text.


<div class="meta-api-description">
How do I customize the "Align Left Middle" option in Kendo UI Editor? Customize or configure the text alignment option for positioning cell content horizontally to the left and vertically centered, control or set the label or title displayed for the tool that aligns text to left middle in editors, adjust or rename the alignment tool for left-middle positioning of cell text, enable clear or descriptive tooltips or messages for left-middle text alignment controls, manage the naming or display text of the function that applies left horizontal and middle vertical alignment in grid or table cells.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignLeftMiddle: "Align Left Middle"
      }
    });
    </script>

### messages.alignLeftTop `String` *(default: 'Align Left Top')*

The title of the tool that aligns the cell text.


<div class="meta-api-description">
How do I customize the label for aligning content to the top-left corner in Kendo UI editor cells? Configure or customize the label, title, or tooltip text for the alignment control that positions content to the top-left corner within editor cells or text areas, enabling clear identification and accessibility of the left and top alignment option in user interfaces for text formatting, cell content placement, or UI element positioning tools used in editors and content management environments.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignLeftTop: "Align Left Top"
      }
    });
    </script>

### messages.alignRemove `String` *(default: 'Remove Alignment')*

The title of the tool that removes the cell text's alignment.


<div class="meta-api-description">
How to change the "Align Remove" button text in Kendo UI Editor? Customize or localize the label, title, or tooltip text for the button that clears or removes text alignment settings from table cells in the editor, enabling control over language, wording, or terminology for the interface element responsible for resetting or clearing cell alignment formatting such as left, center, right, or justify alignment in rich text editors or content management systems.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignRemove: "Remove Alignment"
      }
    });
    </script>

### messages.alignRight `String` *(default: 'Align Right')*

The title of the tool that aligns the cell text.


<div class="meta-api-description">
How do I customize the button label for right-aligning text in a Kendo UI Editor? Configure or customize the toolbar button label for right-aligning text in cell content, including setting localized or translated button titles, controlling the alignment control’s display text, renaming or defining the user-facing name for the cell text alignment option, adjusting UI messages for right text alignment actions, and enabling context-specific or language-specific labels for the toolbar’s text alignment feature.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignRight: "Align Right"
      }
    });
    </script>

### messages.alignRightBottom `String` *(default: 'Align Right Bottom')*

The title of the tool that aligns the cell text.


<div class="meta-api-description">
How do I customize the tooltip for aligning cell content to the bottom right corner in a Kendo UI Editor? Customize or translate the label, tooltip, or title text for the command that aligns text content to the bottom right corner within editable grid or spreadsheet cells, including configuring localization, changing UI strings, setting alignment button descriptions, and adapting interface messages for text positioning controls that move cell content to the right and bottom edges.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignRightBottom: "Align Right Bottom"
      }
    });
    </script>

### messages.alignRightMiddle `String` *(default: 'Align Right Middle')*

The title of the tool that aligns the cell text.


<div class="meta-api-description">
How can I customize the label for the right-middle alignment command in Kendo UI Editor? Configure or customize the label and display text for the command that aligns content or text within a cell to the right center position, enabling control over the toolbar button or menu item name that triggers right-middle alignment in an editor or grid. Adjust, rename, or localize the interface text associated with the command that horizontally aligns text to the right while vertically centering it within table cells, spreadsheet cells, or editable regions to improve clarity, usability, and localization for end users.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignRightMiddle: "Align Right Middle"
      }
    });
    </script>

### messages.alignRightTop `String` *(default: 'Align Right Top')*

The title of the tool that aligns the cell text.


<div class="meta-api-description">
How to customize the alignment control in Kendo UI Editor's toolbar for aligning cell content to top right? Configure or customize the toolbar label, button tooltip, or interface text for aligning cell content to the top right corner within an editor’s table or grid, enabling localization, translation, or setting custom messages for the alignment control that adjusts cell text positioning vertically at the top and horizontally to the right.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignRightTop: "Align Right Top"
      }
    });
    </script>

### messages.auto `String` *(default: 'Auto')*

The placeholder for the numeric inputs in the Table Wizard dialogs.


<div class="meta-api-description">
How do I customize the auto-generated placeholder in Kendo UI's table editor dialogs for numeric input fields? Set or customize placeholder text for numeric input fields in table editor dialogs, control default hints or autofill prompts for number entries, configure automatic placeholder messages in editable tables, enable descriptive or guiding text for number input boxes within editor wizards, adjust numeric field placeholders dynamically to improve form usability, specify default autofill text or hints shown in numeric inputs, tailor the placeholder displayed when entering numbers in editable grid dialogs, manage auto-generated placeholder content for numeric fields, and refine user prompts or input cues for numerical data entry in editor interfaces.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        auto: "Auto"
      }
    });
    </script>

### messages.tableAlignLeft `String` *(default: 'Table Align Left')*

The title of the tool that aligns the table.


<div class="meta-api-description">
How to customize the tooltip for aligning tables to the left in Kendo UI Editor? Customize or configure the tooltip text, label, or title for the left alignment option in table editing features within an editor interface, enabling developers to localize, rename, or change the description shown when hovering or selecting the align-left table control. This includes setting, updating, or overriding the visible string associated with aligning tables to the left in content editors, rich text editors, or any user interface that supports table formatting commands focused on left alignment actions.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        tableAlignLeft: "Table Align Left"
      }
    });
    </script>

### messages.tableAlignCenter `String` *(default: 'Table Align Center')*

The title of the tool that aligns the table.


<div class="meta-api-description">
How do I change the label for center aligning tables in Kendo UI editor? Configure or set the label, caption, or tooltip text for the center alignment option in table editing tools, customize the displayed name or localized string for centering tables within a rich text or WYSIWYG editor, control how the center-table alignment button or command is named in user interfaces, adjust or override the default text shown for centering table content, localize or translate the center table alignment description for various languages or regions in the editor settings.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        tableAlignCenter: "Table Align Center"
      }
    });
    </script>

### messages.tableAlignRight `String` *(default: 'Table Align Right')*

The title of the tool that aligns the table.


<div class="meta-api-description">
How do I customize the "Align right" option in Kendo UI's editor component? Set or customize the label, tooltip, or button text for right-aligning tables within a rich text editor or content editing tool, enabling control over how the right alignment option for tables is displayed, titled, or described in the user interface; configure, rename, or localize the prompt, command, or UI element that triggers right table alignment to improve usability and match interface language preferences or accessibility requirements.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        tableAlignRight: "Table Align Right"
      }
    });
    </script>

### messages.alignment `String` *(default: 'Alignment')*

The title of the tool that aligns the cell text.


<div class="meta-api-description">
How to customize the alignment tool messages in Kendo UI Editor? Customize or translate the label, title, or tooltip for the cell text alignment feature within an editor interface, enabling the control or configuration of alignment tool messages, captions, or prompts shown to users when setting text alignment in table cells, including adjusting language, wording, or localization of alignment options such as left, center, right, or justify for cell content.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        alignment: "Alignment"
      }
    });
    </script>

### messages.applyFormat `String` *(default: 'Apply format')*

The title of the format painter tool button that applies the copied format.


<div class="meta-api-description">
How can I translate the "Apply Format" button label in a Kendo UI rich text editor? Customize or translate the label, tooltip, or title text of the format painter or format copy button in a rich text editor interface, enabling localization and internationalization of the format application feature, adjusting the displayed message for applying copied formatting styles, configuring the language or wording for the button that pastes or applies text styling, controlling the user-facing string shown when using the format brush, and setting or overriding the format painter’s description to match different languages or terminology preferences in UI components.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        applyFormat: "Apply the format that has been copied"
      }
    });
    </script>

### messages.applyToColumn `String` *(default: 'apply to column')*

The hint for the Width input in the Cell properties Table Wizard dialog.


<div class="meta-api-description">
How do I customize the tooltip in Kendo UI Editor's width input field? Set or customize the placeholder text, hint, or tooltip shown inside the width input field when configuring table cell properties or adjusting column widths in an editor or table wizard interface. Control the displayed guidance or default prompt in the input box that defines column width settings, enabling clearer instructions or contextual help for users editing table columns or cells. Adjust the descriptive text appearing inside width input controls to improve user understanding or interaction when specifying column size, dimension, or layout parameters in table editing scenarios.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        applyToColumn: "apply to column"
      }
    });
    </script>

### messages.applyToRow `String` *(default: 'apply to row')*

The hint for the Height input in the Cell properties Table Wizard dialog.


<div class="meta-api-description">
How can I customize the "Apply to row" message in Kendo UI Editor? Customize or translate the input prompt, placeholder, or tooltip for setting row height in table editing interfaces, enabling control over the text that guides users when adjusting the height of table rows in an editor or wizard. This includes configuring label hints, localized messages, or instructional text related to row height properties within cell or table property editors, supporting user guidance for height adjustments in customizable, multilingual, or accessible editor environments.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        applyToRow: "apply to row"
      }
    });
    </script>

### messages.associateCellsWithHeaders `String` *(default: 'Associate cells with headers')*

The title of the Associate cells with headers tool.


<div class="meta-api-description">
How to customize the label for associating cells with headers in Kendo UI Editor? Configure or customize the label, title, or text displayed for the tool that links or associates table cells with their corresponding headers in the editor interface, allowing localization, translation, or customization of the user-visible name for this functionality that connects cells to headers, adjusts accessibility labels, or changes UI strings controlling how users understand cell-header association in tables within the editor component.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        associateCellsWithHeaders: "Associate cells with headers"
      }
    });
    </script>

### messages.backColor `String` *(default: "Background color")*

The title of the tool that changes the text background color.


<div class="meta-api-description">
How do I customize the "Background Color" label in Kendo UI Editor? Set or customize the label, title, or tooltip text for the background color picker or background color tool in a rich text or WYSIWYG editor, enabling control over the user interface language, localization, or accessibility text for color background options, customize prompts or messages related to changing or applying background colors behind text blocks or elements within the editor toolbar.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        backColor: "Background color"
      }
    });
    </script>

### messages.background `String` *(default: 'Background')*

The title of the tool that changes the text background of the tables/cells.


<div class="meta-api-description">
How do I customize the background color button label in Kendo UI editor? Configure or customize the toolbar button label used to modify the background color or shading of table cells and entire tables within the editor interface, control or set the title text that appears for the background color toggle or selector in table editing tools, enable descriptive or localized names for the background styling button in rich text editor toolbars, adjust or rename the UI element responsible for changing cell or table background fills, and manage the display text to improve clarity when users interact with table background color options or features.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        background: "Background"
      }
    });
    </script>

### messages.bold `String` *(default: "Bold")*

The title of the tool that makes text bold.


<div class="meta-api-description">
How do I customize the "Bold" button in the Kendo UI editor toolbar? Configure the tooltip, label, or accessible title for the text bolding control in the editor toolbar to customize or translate the button that applies bold formatting, ensuring the UI reflects localized or personalized descriptions for enabling, setting, or toggling bold style on selected text in rich text or WYSIWYG editors.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        bold: "Bold"
      }
    });
    </script>

### messages.border `String` *(default: 'Border')*

The title of the tool that changes the border of tables.


<div class="meta-api-description">
How do I customize the border tool label in Kendo UI Editor? Customize, set, or configure the label, title, or localization text for the table border tool in the editor interface, enabling translation, internationalization, or adaptation of the border editing option for different languages, user preferences, or regional settings. Adjust or define the displayed name for the border feature used to modify table edges, outlines, or frames inside rich text or content editors.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        border: "Border"
      }
    });
    </script>

### messages.borderColor `String` *(default: 'Border color')*

The title of the tool that changes the border color of tables.


<div class="meta-api-description">
How to localize the "Border Color" message in a Kendo UI Editor? Customize, configure, or set the title text and label that appear when changing or adjusting the color of table borders within the editor interface, enabling localization, renaming, or translation of the border color control prompt, caption, or tooltip to match different languages, user preferences, or UI branding, supporting flexible display of the border color adjustment option in tables inside editing tools or rich text environments.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        borderColor: "Border color"
      }
    });
    </script>

### messages.borderWidth `String` *(default: 'Border width')*

The title of the tool that changes the border width of tables.


<div class="meta-api-description">
How do I customize the border width label in Kendo UI Editor? Customize, set, or control the label and title text for the table border width adjustment tool in the editor interface, enabling localization and tailored naming for the border size control, border thickness selector, or table border styling option within the editor’s message or UI elements.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        borderWidth: "Border width"
      }
    });
    </script>

### messages.style `String` *(default: 'Styles')*

The title of the tool that applies styling to elements. Deprecated.


<div class="meta-api-description">
How to customize the styling toolbar label in Kendo UI Editor? Configure or customize the label, caption, or title text shown for the styling toolbar, styling panel, or style editing tool within an editor interface. Control or change the displayed name, heading, or message related to style, format, or design options in content editors. Adjust localization, translation, or alternative text for style customization tools, style dialog titles, formatting tool labels, or CSS editing features within rich text or code editors. Enable setting, renaming, or overriding the style tool’s display text to fit different languages, user preferences, or UI terminology in editor environments.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        style: "Styles"
      }
    });
    </script>

### messages.caption `String` *(default: 'Caption')*

The title of the tool that adds caption to tables.


<div class="meta-api-description">
How to customize the caption button label in Kendo UI Editor? Customize or translate the caption button label in the Editor toolbar, enabling developers to localize, configure, rename, or set the text shown for the table caption tool in rich text or WYSIWYG editors. This includes adjusting the caption tool’s title, altering interface language, modifying UI strings, changing captions button wording, or supporting internationalization and accessibility by controlling how the caption action appears in editor messages and prompts.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        caption: "Caption"
      }
    });
    </script>

### messages.captionAlignment `String` *(default: 'Caption alignment')*

The title of the tool that sets the caption alignment of tables.


<div class="meta-api-description">
How do I customize caption alignment labels in Kendo UI editor? Configure and customize the text labels, prompts, or tooltips related to caption alignment features within a rich text or content editor, including localization and language-specific adjustments for caption positioning controls, enabling internationalization and personalized display of alignment options for captions, subtitles, or text overlays, supporting user interface customization for caption alignment settings and controls.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        captionAlignment: "Caption alignment"
      }
    });
    </script>

### messages.cellMargin `String` *(default: 'Cell Margin')*

The title of the tool that applies margin to table cells.


<div class="meta-api-description">
How do I customize the label for the table cell margin adjustment tool in Kendo UI Editor? Customize or configure the label, tooltip, or title displayed for the table cell margin adjustment tool within a text or HTML editor interface, enabling control over the description seen when applying, setting, or editing margins around individual cells in tables. This includes managing the visible name or message associated with cell spacing controls, margin editors, or table formatting features to match localization, UI clarity, or user guidance preferences. Adjust the text that appears for margin manipulation tools in tables during content editing, facilitating easier identification, accessibility, or customization of margin-related functions in structured grid or tabular layouts.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        cellMargin: "Cell Margin"
      }
    });
    </script>

### messages.cellPadding `String` *(default: 'Cell Padding')*

The title of the tool that applies padding to table cells.


<div class="meta-api-description">
How do I customize the label for adjusting cell padding in Kendo UI Editor? Configure or customize the label, heading, or title text displayed for the editor tool responsible for adjusting or setting the internal spacing, padding, or margin inside table cells, enabling control over the descriptive name or tooltip shown to users when working with cell padding features in tabular editing environments.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        cellPadding: "Cell Padding"
      }
    });
    </script>

### messages.cellSpacing `String` *(default: 'Cell Spacing')*

The title of the tool that applies spacing to table cells.


<div class="meta-api-description">
How to customize cell spacing message in Kendo UI Editor? Customize and translate the label or title associated with adjusting spacing between table cells, enabling control over the gap or padding in table layouts, configuring cell gap settings, localizing messages related to table cell padding, changing or setting the display text for cell spacing adjustments within editor tools, managing interface wording for cell margin controls in tables, modifying captions related to cell spacing features, adapting or customizing user interface text for spacing controls in tabular data, and handling localization strings that define how cell spacing options are described or presented.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        cellSpacing: "Cell Spacing"
      }
    });
    </script>

### messages.cellTab `String` *(default: 'Cell')*

The title of the Cell tab in Table Wizard dialog.


<div class="meta-api-description">
How do I customize the tab label in Kendo UI Editor's cell configuration? Customize or configure the label, heading, or title text displayed on the cell configuration tab within the table editing interface or wizard, enabling control over the tab name, cell section heading, or contextual message shown during table cell modifications and adjustments in the editor environment.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        cellTab: "Cell"
      }
    });
    </script>

### messages.cleanFormatting `String` *(default: 'Clean formatting')*

The title of the Clean Formatting tool.


<div class="meta-api-description">
How to customize clean formatting message in Kendo UI Editor? Configure or customize the text label, title, or tooltip for the editor's clean formatting feature, enabling localization, translation, or adjustment of messaging related to clearing, removing, or resetting text styles, formats, and rich content within a text editor interface; control how the clean or clear formatting button, command, or option is presented in different languages or user interface contexts for better user understanding and internationalization support.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        cleanFormatting: "Clean formatting"
      }
    });
    </script>

### messages.collapseBorders `String` *(default: 'Collapse borders')*

The title of the Collapse borders option in Table Wizard.


<div class="meta-api-description">
How to customize the "collapse borders" option in Kendo UI Editor? Configure or customize the label, title, or text displayed for the table borders collapsing feature in the editor’s table tools, enabling you to set or change the user-facing wording for collapsing or merging borders in table editing interfaces, control how the collapse borders option is named, adjust the caption or prompt related to border merging, and personalize the interface element that toggles border collapse behavior in table layouts.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        collapseBorders: "Collapse borders"
      }
    });
    </script>

### messages.columns `String` *(default: 'Columns')*

The title of the Columns tool in Table Wizard.


<div class="meta-api-description">
How do I customize column headers in Kendo UI table editor? Set or customize the column headers, labels, or titles displayed in the table editor interface, including options to define, translate, localize, or configure the names of columns shown in the table editing or wizard tools, allowing control over how column names appear within table management, data grid editing, or spreadsheet-like user interfaces.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        columns: "Columns"
      }
    });
    </script>

### messages.copyFormat `String` *(default: 'Copy format')*

The title of the format painter tool button that copies format.


<div class="meta-api-description">
How do I change the label for the format painter copy button in Kendo UI Editor? Set or customize the text label, caption, or title for the format painter copy button in the editor, enabling localization, renaming, or configuring the copy format action’s display name to better suit language preferences, UI customization, tooltips, accessibility labels, or internationalization needs in user interfaces.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        copyFormat: "Copy format from selected range"
      }
    });
    </script>

### messages.createLink `String` *(default: "Insert hyperlink")*

The title of the tool that creates hyperlinks.


<div class="meta-api-description">
How do I customize the tooltip for creating links in Kendo UI Editor? Customize or configure the tooltip text, label, or title for the hyperlink creation feature in the editor toolbar, enabling users to identify, enable, set, or control the link insertion tool’s display name or description during content editing, link adding, or hyperlink generation interactions.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        createLink: "Insert hyperlink"
      }
    });
    </script>

### messages.createTable `String` *(default: "Create table")*

The title of the tool that inserts tables.


<div class="meta-api-description">
How do I change the table creation button text in Kendo UI Editor? Set or customize the title, label, or display text for the table insertion tool in the editor interface, enabling control over the naming or prompt users see when choosing to create or add tables, including configuring or changing the caption or heading shown for the add table feature or dialog within the editor’s toolbar or menu.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        createTable: "Create table"
      }
    });
    </script>

### messages.createTableHint `String` *(default: "Create a {0} x {1} table")*

The status text of the tool that inserts tables, which indicates the dimensions of the inserted table.


<div class="meta-api-description">
How to customize the table size hint in Kendo UI Editor? Customize, localize, or configure the status message displaying the dimensions of a newly inserted table, including language translations, display text, and contextual hints for table creation feedback, enabling control over how table size information is presented during insertion, such as rows and columns count notifications or user interface prompts for table setup guidance.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        createTableHint: "Create a {0} x {1} table"
      }
    });
    </script>

### messages.cssClass `String` *(default: 'CSS Class')*

The title of the CSS Class dropdown tool.


<div class="meta-api-description">
How do I change the label for the CSS class selector in a Kendo UI Editor? Customize, set, or localize the label, title, or heading text for the CSS class selector dropdown within a content editor interface, enabling control over the displayed prompt or name users see when choosing CSS classes, including options to translate, rename, or configure the dropdown title for different languages or branding in web editing environments.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        cssClass: "CSS Class"
      }
    });
    </script>

### messages.deleteColumn `String` *(default: "Delete column")*

The title of the tool that deletes selected table columns.


<div class="meta-api-description">
How can I customize the delete column button label in a Kendo UI table editor? Configure the toolbar command label for removing selected columns in table editors, customize the button title or tooltip for deleting one or multiple columns, change the displayed text for column deletion actions in table editing interfaces, adjust the language or localization of commands that allow users to erase or remove columns within tables, set the descriptive name or message for the control that lets users delete table columns during content editing, specify how the delete column option is shown in different languages or regional settings, control the prompt or label that triggers column removal in table editors, and modify or localize the interface text associated with deleting table columns in data grids or document editors.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        deleteColumn: "Delete column"
      }
    });
    </script>

### messages.deleteRow `String` *(default: "Delete row")*

The title of the tool that deletes selected table rows.


<div class="meta-api-description">
How to change the delete row button text in Kendo UI editor? Configure the label or title for the button or tool that removes selected rows from a table, customize the text displayed for deleting rows in an editor interface, rename or set the prompt for the action that deletes one or multiple table rows, change or localize the messaging for row deletion commands, and control how the delete row function is presented in different languages or contexts within table editing tools.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        deleteRow: "Delete row"
      }
    });
    </script>

### messages.dialogCancel `String` *(default: "Cancel")*

The label of the cancel button in all editor dialogs.


<div class="meta-api-description">
How to change the default cancel button caption in Kendo UI Editor dialog windows? Customize or configure the text label for cancel buttons in dialog windows within an editor interface, enabling localization, changing default cancel button captions, setting alternative cancel text strings, controlling cancel action wording in pop-up dialogs, adjusting cancel button prompts for different languages or contexts, overriding default cancel labels, and tailoring dialog cancellation messages to match user interface language preferences or branding requirements.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        dialogCancel: "Cancel"
      }
    });
    </script>

### messages.dialogInsert `String` *(default: "Insert")*

The label of the insert button in all editor dialogs.


<div class="meta-api-description">
How do I customize the insert button label in Kendo UI Editor dialog windows? Customize or localize the text label for the insert button shown in editor dialog windows, enabling control over button captions, prompts, or calls to action during content insertion processes; adjust the dialog confirmation button wording, translation, or display name to match different languages, user interfaces, or branding requirements within rich text or code editors.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        dialogInsert: "Insert"
      }
    });
    </script>

### messages.dialogOk `String` *(default: 'Confirm')*

The title of the OK buttons in editor's dialogs.


<div class="meta-api-description">
How do I change the text of the OK button in a Kendo UI editor dialog? Customize the confirmation button label, set or change the text for the OK button in dialog boxes, control the confirmation button wording displayed in editor popup windows, configure the accept, confirm, or submit button text in modal dialogs, adjust dialog button captions, specify the text shown on confirmation buttons within editing interfaces, modify or translate the OK button string in editor alerts or prompts, set custom labels for dialog acceptance buttons, manage the displayed text for dialog submission controls, and localize or personalize the dialog confirmation button text for improved user interaction.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        dialogOk: "Confirm"
      }
    });
    </script>

### messages.dialogUpdate `String` *(default: "Update")*

The label of the update button in all editor dialogs.


<div class="meta-api-description">
How do I customize the "Update" button label in Kendo UI Editor dialog? Set, customize, or configure the text label displayed on the update button within editor dialog interfaces, enabling control over button captions, dialog prompts, confirmation labels, or action button text for updating content or settings, useful for localization, UI personalization, modifying call-to-action phrasing, or adjusting user interface elements related to saving or confirming changes inside editor pop-up windows.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        dialogUpdate: "Update"
      }
    });
    </script>

### messages.editAreaTitle `String` *(default: "Editable area. Press F10 for toolbar.")*

The title of the iframe editing area when a sandboxed editor is used. Used as a hint for screen readers.


<div class="meta-api-description">
How do I set the title of an editable iframe area in Kendo UI Editor for screen reader accessibility? Configure the descriptive title or label for the editable iframe area to enhance screen reader accessibility, set or customize the accessible name for the editing space in sandboxed environments, define or update the iframe’s title attribute to aid assistive technologies, enable clear and meaningful identification of the content editing frame for users relying on screen readers, control the accessibility text that describes the editor’s editing area within isolated or sandboxed iframes.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        editAreaTitle: "Write your comments here. Press F10 for toolbar."
      }
    });
    </script>

### messages.fileTitle `String` *(default: "Title")*

The caption for the file title in the insertFile dialog.


<div class="meta-api-description">
How to customize the file title label in Kendo UI Editor? Customize or configure the label, caption, or heading text displayed as the file title in the file upload or insert file dialog within an editor interface, enabling control over how the file name prompt or title appears during file selection or insertion processes, including modifying the text shown to users when adding files, setting descriptive captions for file inputs, or changing the default title text to match UI terminology or localization preferences.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        fileTitle: "Title"
      }
    });
    </script>

### messages.fileWebAddress `String` *(default: "Web address")*

The caption for the file URL in the insertFile dialog.


<div class="meta-api-description">
How do I customize the label for the file URL input field in Kendo UI Editor's file upload dialog? Set or customize the label, caption, or placeholder text for the file URL input field in file upload or insert dialogs, enabling control over the display text for web address or link fields when adding files, attachments, or resources in editors, content management systems, or WYSIWYG interfaces. Adjust or localize the text that prompts users to enter or paste the file’s web address, link, URL, or online path during file insertion or linking operations.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        fileWebAddress: "Web address"
      }
    });
    </script>

### messages.fitToCell `String` *(default: 'Fit to cell')*

The text of the fit to cell option in the WrapText dropdown in Table Wizard.


<div class="meta-api-description">
How do I customize the "Fit to Cell" label in a Kendo UI Editor? Customize, translate, or localize the label for fitting text within table cells, controlling how the wrap text option is displayed in editing interfaces or table wizards, enabling configuration of cell content fitting, adjusting the wording for fit-to-cell functionality, setting user-facing text for automatic cell size adaptation, and managing label presentation related to wrapping or fitting text inside table cells during editing or formatting tasks.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        fitToCell: "Fit to cell"
      }
    });
    </script>

### messages.fontName `String` *(default: "Select font family")*

The title of the tool that changes the text font.


<div class="meta-api-description">
How to customize font dropdown caption in Kendo UI Editor? Customize, translate, or adapt the font selector label, font toolbar text, or font tool title in text editors, rich text fields, or content editing interfaces; modify, rename, or localize the font dropdown caption, font style name, or font family label shown in the editing toolbar to match different languages, regional settings, or user preferences for UI text related to font naming.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        fontName: "Select font family"
      }
    });
    </script>

### messages.fontNameInherit `String` *(default: "(inherited font)")*

The text that is shown when the text font will be inherited from the surrounding page.


<div class="meta-api-description">
How do I customize the font inheritance message in Kendo UI Editor? Customize or translate the text label that appears when the editor inherits the font style from the surrounding webpage, enabling control over the displayed font name message for different languages or localization needs, adjusting font inheritance notifications, setting custom messages for inherited fonts, and managing how font-related information is presented in the editor interface.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        fontNameInherit: "(inherited font)"
      }
    });
    </script>

### messages.fontSize `String` *(default: "Select font size")*

The title of the tool that changes the text size.


<div class="meta-api-description">
How do I change the font size label in the Kendo UI editor? Customize or configure the label, title, or tooltip text for the font size control in the text editor interface, enabling localization, translation, or adjustment of the font size tool’s display name, caption, or message shown to users when interacting with font size settings or controls, supporting multiple languages, UI customization, and interface text modification related to font size elements in rich text editors or content editing environments.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: ["fontSize"],
      messages: {
        fontSize: "Select font size"
      }
    });
    </script>

### messages.fontSizeInherit `String` *(default: "(inherited size)")*

The text that is shown when the text size will be inherited from the surrounding page.


<div class="meta-api-description">
How do I customize the message displayed when font size inherits from parent elements in Kendo UI Editor? Customize or adjust the notification, alert, or message displayed when the text size inherits styling from its parent or surrounding elements, controlling how font size inheritance is indicated or communicated within an editor environment. Enable, set, or localize this message to reflect inherited font sizes, manage font scaling notifications, handle cases where text size is not explicitly set but derived from the container, and tailor the wording for user prompts about inherited font dimensions or cascading font size behavior in text editing interfaces.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        fontSizeInherit: "(inherited size)"
      }
    });
    </script>

### messages.foreColor `String` *(default: "Color")*

The title of the tool that changes the text color.


<div class="meta-api-description">
How do I customize the text color option label in Kendo UI Editor? Configure or customize the text color option label, control the toolbar button title for changing font or foreground color, set localized strings for color selection in editors, enable renaming or translating the color picker control, modify or localize the color formatting button name, update the label used for text color adjustments, adjust the user interface text for foreground color selection, change or set the title shown on the color change toolbar command, customize the color tool's title for different languages or contexts, and manage display names related to text color modification features.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        foreColor: "Color"
      }
    });
    </script>

### messages.formatBlock `String` *(default: "Format")*

The title of the tool that lets users choose block formats. Deprecated.


<div class="meta-api-description">
How do I customize the block formatting dropdown menu label in Kendo UI Editor? Customize or configure the label, display name, or title text for the block formatting dropdown menu, block style selector, paragraph format chooser, or heading format tool within the editor interface, controlling how the block formatting option appears in different languages, locales, or translations; modify the localized string or user-facing wording for selecting block elements like paragraphs, headings, or block quotes in the text editor’s formatting toolbar or menu.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        formatBlock: "Format"
      }
    });
    </script>

### messages.formatting `String` *(default: "Format")*

The title of the tool that lets users choose block formats.


<div class="meta-api-description">
How to customize the block formatting tool label in Kendo UI Editor? Customize, configure, or change the label, heading, or title text displayed on the block formatting tool or block style menu within the editor interface, enabling control over how formatting options are presented to users, affecting the naming, description, or display text for block format selections and making it clearer or personalized in the toolbar or dropdown for applying block-level styles and structure.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        formatting: "Format"
      }
    });
    </script>

### messages.height `String` *(default: 'Height')*

The title of the height fields.


<div class="meta-api-description">
How do I customize the label for height input fields in Kendo UI Editor? Customize or set the label text, title, or caption for height input fields, controlling how height values are described, displayed, or presented in forms and interfaces, including options to localize, rename, or configure height field titles and labels across different languages or UI components.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        height: "Height"
      }
    });
    </script>

### messages.id `String` *(default: 'ID')*

The title of the id fields.


<div class="meta-api-description">
How do I change the label for the id field in Kendo UI Editor? Customize, translate, or rename the identifier field label in the editor interface by configuring the display name, title text, or caption for the unique id attribute. This enables localization, user-friendly naming, and control over how the id field appears across different languages and contexts, supporting adjustments to the field label to meet interface customization, internationalization, and clarity requirements.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        id: "ID"
      }
    });
    </script>

### messages.imageAltText `String` *(default: "Alternate text")*

The caption for the image alternate text in the insertImage dialog.


<div class="meta-api-description">
How to customize alt text for images inserted into Kendo UI Editor? Customize and control the alternate text or alt attribute for images during the insertion process, enabling you to set descriptive captions, labels, or accessibility text that improve screen reader compatibility, SEO descriptions, and user guidance; configure, provide, edit, or define alternative text or image descriptions within content editors or rich text environments.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        imageAltText: "Alternate text"
      }
    });
    </script>

### messages.imageHeight `String` *(default: "Height (px)")*

The caption for the image height in the insertImage dialog.


<div class="meta-api-description">
How do I change the label for the image height field in Kendo UI Editor? Customize or configure the label, text, or caption associated with the image height input in an image insertion or editing dialog, controlling how the height field is described, displayed, or presented to users when adjusting image dimensions. Adjust or set the descriptive text for image height to improve clarity or localization in image insert dialogs, enabling different phrasing, translations, or wording that help indicate the height parameter for images within editors or content management tools.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        imageHeight: "Height (px)"
      }
    });
    </script>

### messages.imageWebAddress `String` *(default: "Web address")*

The caption for the image URL in the insertImage dialog.


<div class="meta-api-description">
How do I customize the label text for image URL input fields in an image insertion dialog using Kendo UI Editor? Control and customize the label text or caption shown for image URL input fields in an image insertion dialog, enabling users to set, change, configure, or rename how the web address of an image is presented or referenced while inserting pictures. Adjust descriptions or prompts for image link fields, modify placeholder or caption text related to image source URLs, and tailor user interface language for image URL entry within content or rich text editors. Enable different phrases, synonyms, or terminology for the web address of an image to match diverse workflows, user preferences, or localization needs during image insertion tasks.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        imageWebAddress: "Web address"
      }
    });
    </script>

### messages.imageWidth `String` *(default: "Width (px)")*

The caption for the image width in the insertImage dialog.


<div class="meta-api-description">
How do I change the label for specifying image width in Kendo UI Editor's image insertion dialog? Customize or translate the label for specifying image width in image insertion dialogs, configure localized captions or prompts for image dimension inputs, control the text displayed for image width fields during image upload or insertion, adjust or set the width label in user interfaces that manage image sizing, enable multi-language support and customization of labels related to image width in rich text editor dialogs.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        imageWidth: "Width (px)"
      }
    });
    </script>

### messages.indent `String` *(default: "Indent")*

The title of the tool that indents the content.


<div class="meta-api-description">
How do I customize the label for the indent button in Kendo UI Editor? Customize or configure the text label, caption, or name shown for the indentation feature or indent button within the editor interface, including localization and translation of the indent command or tool tip, enabling developers to set or change how the indent action is described or labeled in different languages or custom UI configurations.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        indent: "Indent"
      }
    });
    </script>

### messages.insertFile `String` *(default: "Insert file")*

The title of the tool that inserts links to files.


<div class="meta-api-description">
How do I customize the file insertion label in Kendo UI Editor? Set or customize the text label, tooltip, or prompt shown when adding or inserting file links, enabling control over how the file insertion option appears in the editor interface, including modifying the title, caption, or description for file attachment actions during content editing or link embedding processes.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        insertFile: "Insert file"
      }
    });
    </script>

### messages.insertHtml `String` *(default: "Insert HTML")*

The title of the tool that inserts HTML snippets.


<div class="meta-api-description">
How do I customize the insert HTML button in Kendo UI Editor? Customize, configure, or localize the text label, tooltip, caption, or title for the insert HTML function, customize the toolbar button name, control the display text shown when inserting HTML content, set or translate the insert HTML command label, modify the UI string for embedding HTML snippets, change the button title for adding raw HTML, and adapt the insertion tool’s caption to fit different languages or contexts within a rich text editor environment.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        insertHtml: "Insert HTML"
      }
    });
    </script>

### messages.insertImage `String` *(default: "Insert image")*

The title of the tool that inserts images.


<div class="meta-api-description">
How do I customize the image insertion tool tooltip in Kendo UI Editor? Configure and customize the tooltip, label, or title text displayed for the image insertion tool within the text editor toolbar to provide localization, rename the insert image button, change the tooltip wording, adjust the accessible name, set the prompt text for adding pictures, control the language or phrasing of the image upload command, and tailor the insert image interface text to match different languages, user preferences, or UI contexts.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        insertImage: "Insert image"
      }
    });
    </script>

### messages.insertOrderedList `String` *(default: "Insert ordered list")*

The title of the tool that inserts an ordered list.


<div class="meta-api-description">
How do I change the text for inserting an ordered list in Kendo UI editor? Set or customize the tooltip, label, or button text for adding numbered or ordered lists in the rich text editor toolbar, enabling localization, translation, or renaming of the insert ordered list feature to match user language preferences or UI terminology conventions, supporting multi-language interfaces and adaptable editor controls for list formatting functions.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        insertOrderedList: "Insert ordered list"
      }
    });
    </script>

### messages.insertUnorderedList `String` *(default: "Insert unordered list")*

The title of the tool that inserts an unordered list.


<div class="meta-api-description">
How do I customize the insert unordered list button in Kendo UI Editor? Configure or customize the tooltip, label, or title text for the toolbar button that adds bulleted lists, unordered lists, or bullet point formatting in the editor interface, enabling localization, translation, or modification of the insert unordered list control’s display name to improve user understanding, accessibility, or internationalization of list insertion features within rich text editing environments.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        insertUnorderedList: "Insert unordered list"
      }
    });
    </script>

### messages.insertUpperRomanList `String` *(default: "Insert upper roman list")*

The title of the tool that inserts an upper roman list.


<div class="meta-api-description">
How to customize the label for inserting an ordered list with uppercase Roman numerals in a Kendo UI rich text editor? Customize or set the toolbar button label, tooltip, or title for adding an ordered list with uppercase Roman numerals in a rich text editor, enabling localization, translation, or renaming of the "insert upper Roman list" command for different languages, user interfaces, or accessibility purposes; control the display text for the list style selector that inserts Roman numeral lists in uppercase format, configure the naming or description shown on the formatting toolbar related to ordered lists using capital Roman numerals, and adapt the label used to trigger the insertion of an uppercase Roman numeral list in the editor’s UI.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        insertUpperRomanList: "Insert upper roman list"
      }
    });
    </script>

### messages.insertLowerRomanList `String` *(default: "Insert lower roman list")*

The title of the tool that inserts an lower roman list.


<div class="meta-api-description">
How do I customize the label for inserting a lowercase Roman numeral ordered list in Kendo UI Editor? Customize or localize the label, tooltip, or title text displayed for inserting a lowercase Roman numeral ordered list within a text editor, enabling control over how the insertion option for lowercase Roman lists appears in menus, toolbars, or UI elements during content editing, and supporting multi-language environments where you need to configure, rename, or translate the action name related to adding lower-case Roman numbered lists.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        insertLowerRomanList: "Insert lower roman list"
      }
    });
    </script>

### messages.italic `String` *(default: "Italic")*

The title of the tool that makes text italicized.


<div class="meta-api-description">
How do I customize the tooltip for the italic button in Kendo UI Editor? Customize or translate the tooltip, label, or title text displayed on the italic formatting button or control within a rich text or code editor, enabling localization, accessibility improvements, or modification of the hover text shown for italic style functionality. This includes setting the descriptive message, caption, or UI text for italic styling features in editors, content management systems, and user interfaces, allowing developers to configure, override, or provide custom phrases, tooltips, hints, or localized strings associated with toggling italic font style.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        italic: "Italic"
      }
    });
    </script>

### messages.overflowAnchor `String` *(default: "More tools")*

The title of the tool that shows the overflow tools.


<div class="meta-api-description">
How to customize tooltip text for overflow tool anchors in Kendo UI Editor? Set, customize, or translate the tooltip text that appears on overflow tool anchors in the editor interface, enabling control over localized messages, labels, hints, or descriptions for overflow menu anchors, toolbar overflow tips, and related UI elements, so users can change or configure the anchor’s title, overflow anchor tooltip text, or help message in different languages or contexts for enhanced clarity and accessibility.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        overflowAnchor: "More tools"
      }
    });
    </script>

### messages.justifyCenter `String` *(default: "Center text")*

The title of the tool that aligns text in the center.


<div class="meta-api-description">
How do I customize the label for the center alignment button in a Kendo UI Editor? Customize, configure, or set the label, tooltip, or title text for the center alignment button, control the display name for center justify commands, enable localization or translation of center text alignment messages, update or override UI strings related to centering text, modify center alignment tooltips to match language or branding, define custom messages for center justify features, and handle internationalization or i18n for center align controls within text editors or content editing interfaces.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        justifyCenter: "Center text"
      }
    });
    </script>

### messages.justifyFull `String` *(default: "Justify")*

The title of the tool that justifies text both left and right.


<div class="meta-api-description">
How do I change the label for full justification in a Kendo UI editor? Set or customize the text alignment control label for fully justified text that aligns content evenly on both left and right edges, enabling users to modify or localize the interface label for the full justification toolbar button in rich text editors, ensuring clear descriptions for controls that adjust text justification to spread lines across the entire width of a container for balanced block alignment in content editing environments.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        justifyFull: "Justify"
      }
    });
    </script>

### messages.justifyLeft `String` *(default: "Align text left")*

The title of the tool that aligns text on the left.


<div class="meta-api-description">
How do I change the label for the left justify button in a Kendo UI rich text editor? Set or customize the label, tooltip, or title for the text align left command in rich text editors, adjusting the description or name displayed for the left justification control. Configure or localize the left alignment button’s text, modify the prompt or message shown when enabling left-aligned text formatting, and control how the interface references the left justify option for different languages or user preferences, covering phrases like "align text left," "justify left alignment," and translations or synonyms related to left text alignment commands.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        justifyLeft: "Align text left"
      }
    });
    </script>

### messages.justifyRight `String` *(default: "Align text right")*

The title of the tool that aligns text on the right.


<div class="meta-api-description">
How to customize the "Justify Right" button text in Kendo UI editor? Control the text alignment option to set or customize the label, title, or tooltip for the right-align or right-justification button in an editor interface, enabling localization, translation, internationalization, or display adjustments for the right-aligned text tool, align text to the right side, configure UI messages, and tailor user interface language for right justification features in text editing environments.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        justifyRight: "Align text right"
      }
    });
    </script>

### messages.linkOpenInNewWindow `String` *(default: "Open link in new window")*

The caption for the checkbox for opening the link in a new window in the createLink dialog.


<div class="meta-api-description">
How to customize the "open in new window" checkbox label in Kendo UI Editor? Customize or configure the label, caption, or text for the option that enables opening links in a new browser tab or window within the link creation or editing dialog, controlling how the "open in new window" checkbox is presented or described in the user interface when adding hyperlinks in a content editor environment.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        linkOpenInNewWindow: "Open link in new window"
      }
    });
    </script>

### messages.linkText `String` *(default: "Text")*

The caption for the link text in the createLink dialog.


<div class="meta-api-description">
How do I customize the link button text in Kendo UI editor? Configure or customize the text label, caption, or wording displayed for links within a create link dialog or hyperlink input in an editor interface, enabling developers to set, control, or define the link button text, link description, or anchor text prompt shown to users when inserting or editing hyperlinks, with options to tailor link-related UI messages, link field placeholders, or link text captions according to localization, user experience, or interface customization needs.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        linkText: "Text"
      }
    });
    </script>

### messages.linkToolTip `String` *(default: "ToolTip")*

The caption for the link Tooltip in the createLink dialog.


<div class="meta-api-description">
How do I customize the tooltip text that appears when hovering over a link in Kendo UI's editor? Customize, translate, or set the text that appears as a tooltip or hint when hovering over link input fields or link creation dialogs within a text editor interface. Control the localization, caption, label, message, or prompt displayed in link tooltips during link insertion or editing, enabling tailored user guidance, internationalized link help text, hover descriptions, and contextual link instructions across different languages and regions. Adjust or configure the on-hover link helper text shown when adding or modifying hyperlinks to improve usability and accessibility in rich text editing environments.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        linkToolTip: "ToolTip"
      }
    });
    </script>

### messages.linkWebAddress `String` *(default: "Web address")*

The caption for the URL in the createLink dialog.


<div class="meta-api-description">
How do I customize the link URL input field label in a Kendo UI Editor? Set or configure the label, caption, or prompt text for the URL input field in link creation dialogs, modify the text that appears when users add or edit hyperlinks within the content editor, customize or change the displayed name for website address fields, update or localize the wording used for entering web addresses or URLs during link insertion, control or adjust the descriptive text for the input where users specify link destinations in rich text editors.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        linkWebAddress: "Web address"
      }
    });
    </script>

### messages.outdent `String` *(default: "Outdent")*

The title of the tool that outdents the content.


<div class="meta-api-description">
How do I customize the "Outdent" button label in a Kendo UI editor? Customize, configure, or localize the label, tooltip, or title text for the outdent button, control, or command within a text editor or rich content editing interface, enabling translation, internationalization, and adjusting the displayed string for the decrease indent or shift left formatting feature.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        outdent: "Outdent"
      }
    });
    </script>

### messages.print `String` *(default: 'Print')*

The title of the Print tool.


<div class="meta-api-description">
How to change the print button label in Kendo UI Editor? Customize or localize the label and title text shown for the print functionality within the editor interface, enabling modification of the print tool’s displayed name, caption, or heading to match different languages, user preferences, or branding requirements, allowing developers to set, configure, or override the print command label visible to end users in the editor environment.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        print: "Print"
      }
    });
    </script>

### messages.redo `String` *(default: "Redo")*

The title of the redo tool.


<div class="meta-api-description">
How do I customize the redo action label in Kendo UI Editor? Customize, configure, or set the redo action label, tooltip, or title in an editor’s user interface to support localization, translation, internationalization, or multi-language display. Control how the redo function is named, described, or presented in different languages, enabling developers to adjust or override the default redo text, button title, command name, or UI string for improved user experience across diverse regions or language settings.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        redo: "Redo task"
      }
    });
    </script>

### messages.rows `String` *(default: 'Rows')*

The title of the Rows field in Table Wizard.


<div class="meta-api-description">
How do I customize the label for the number of rows in a Kendo UI table editor interface? Customize or translate the label for the number of rows in a table editor interface, control the displayed text for row count fields, set or modify the row heading or title in table configuration dialogs, localize row-related labels for different languages, adjust how the interface describes rows in table wizards or data grids, enable tailored naming for row indicators, change or override default row captions in table editing tools, configure UI text related to table rows, set custom terminology or phrases for rows in spreadsheet or grid editors, and manage the presentation of row labels in form or table editors.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        rows: "Rows"
      }
    });
    </script>

### messages.selectAllCells `String` *(default: 'Apply to all cells')*

The title of the Apply to all cells tool.


<div class="meta-api-description">
How to customize the "select all cells" label in Kendo UI Editor? Customize or configure the label, tooltip, or title text displayed for the action that selects or applies changes to every cell in an editor interface, enabling localization, translation, or adjustment of the description shown when activating a bulk cell selection or applying edits across all cells; control naming, wording, or messaging for the "select all cells" command to support multilingual support, interface customization, and clarity in spreadsheet-like or grid cell editing environments.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        selectAllCells: "Apply to all cells"
      }
    });
    </script>

### messages.strikethrough `String` *(default: "Strikethrough")*

The title of the tool that strikes through text.


<div class="meta-api-description">
How do I change the tooltip for the strikethrough button in the Kendo UI Editor toolbar? Customize or configure the tooltip, title, or label text for the strikethrough formatting button in the rich text or content editor toolbar, enabling localization, translation, or adjustment of the description displayed when hovering over or focusing on the strikethrough option, controlling how the strikethrough tool is presented to users across different languages or UI settings.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        strikethrough: "Strikethrough"
      }
    });
    </script>

### messages.subscript `String` *(default: "Subscript")*

The title of the tool that makes text subscript.


<div class="meta-api-description">
How do I customize the subscript button label in Kendo UI Editor? Customize, configure, or localize the subscript button label, tooltip, or title in the text editor interface to control how the subscript formatting option appears to users, including setting or changing the displayed text for subscript tools, enabling different language translations, modifying hover text for superscript and subscript features, adjusting UI messages related to subscript insertion, and tailoring user prompts or tooltips for subscripting characters in rich text editors.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        subscript: "Subscript"
      }
    });
    </script>

### messages.summary `String` *(default: 'Summary')*

The title of the Summary field in Table Wizard.


<div class="meta-api-description">
How do I customize the label for the summary section in a Kendo UI editor? Customize, configure, or rename the label, heading, or title displayed for the summary section or summary field within table or data editors, enabling control over how the summary information is presented, shown, or identified in user interfaces or wizard setups; useful for setting descriptive text that clarifies the summary area in table editing tools or editor components that aggregate or encapsulate data summaries.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        summary: "Summary"
      }
    });
    </script>

### messages.superscript `String` *(default: "Superscript")*

The title of the tool that makes text superscript.


<div class="meta-api-description">
How do I customize the "Superscript" label in Kendo UI's rich text editor? Customize or configure the label, tooltip, or title text displayed for the superscript formatting option in the rich text editor toolbar, enabling localization or translation of the superscript tool name across different languages and regions, controlling the user interface text that appears when enabling or selecting superscript text styling features within an editor environment.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        superscript: "Superscript"
      }
    });
    </script>

### messages.tableBackground `String` *(default: 'Table background')*

The title of the Table background Wizard tool.


<div class="meta-api-description">
How do I change the table background label in the Kendo UI editor? Customize or configure the title text label for the table background tool or wizard in the editor interface, enabling localization, translation, or modification of the displayed heading for table background settings, captions, or labels in different languages or contexts, supporting internationalization and adaptation of UI text related to table background features and controls within the editor environment.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        tableBackground: "Table background"
      }
    });
    </script>

### messages.tableCellProperties `String` *(default: 'Cell Properties')*

The title of the Table Cell properties Wizard tool.


<div class="meta-api-description">
How to customize table cell properties dialog title in Kendo UI Editor? Customize, translate, or override the title text shown in the table cell properties dialog or popup within the editor interface, enabling configuration of localized labels, names, or headings for table cell settings, properties, or attributes wizard, supporting internationalization and message customization to change or set the displayed prompt, heading, or interface string related to editing table cell characteristics, formatting, or options.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        tableCellProperties: "Cell Properties"
      }
    });
    </script>

### messages.tableProperties `String` *(default: 'Table Properties')*

The title of the Table properties Wizard tool.


<div class="meta-api-description">
How do I change the title of the table properties dialog in Kendo UI Editor? Customize or configure the title text displayed in the table properties dialog or wizard within the editor interface, enabling localization or renaming of the table properties prompt, label, or heading to match specific language preferences, user interface terminology, or custom workflow needs; adapt the display text for table settings prompts, captions, or modal headers to provide clearer, localized, or branded messaging in the editor's table configuration tools.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        tableProperties: "Table Properties"
      }
    });
    </script>

### messages.tableTab `String` *(default: 'General')*

The title of the main Table tab in Table Wizard.


<div class="meta-api-description">
How do I customize the label of the main table tab in Kendo UI Editor for different languages? Configure or customize the label, name, or title of the primary table tab within the editor’s table wizard interface to support localization, internationalization, translation, or multilingual UI adjustments. Enable setting or changing the main tab caption, heading, or display text for tables in the editor to accommodate different languages, user preferences, or regional settings in the UI. Adjust the localized string or message that appears as the title of the table tab for better clarity, accessibility, or user experience across global or localized versions of the editing tool.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        tableTab: "General"
      }
    });
    </script>

### messages.tableWizard `String` *(default: 'Table Wizard')*

The title of the Table Wizard tool.


<div class="meta-api-description">
How do I customize the title of the table creation wizard in Kendo UI Editor? Configure the title text, label, or heading for the table creation or editing assistant within the editor interface, allowing customization or localization of the table wizard’s prompt, tooltip, or dialog header to match different languages, display contexts, or user preferences for table-building tools.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        tableWizard: "Table Wizard"
      }
    });
    </script>

### messages.underline `String` *(default: "Underline")*

The title of the tool that underlines text.


<div class="meta-api-description">
How can I customize the tooltip for the underline button in a Kendo UI editor? Configure the text or label that appears as the tooltip or hover message for the underline formatting button in a text editor, allowing customization of the underline tool’s name, title, or descriptive hint shown to users, useful for localization, translation, or adjusting accessibility labels related to underlining text content.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        underline: "Underline"
      }
    });
    </script>

### messages.undo `String` *(default: "Undo")*

The title of the undo tool.


<div class="meta-api-description">
How do I customize the undo button description in Kendo UI for jQuery? Control and customize the label or tooltip text for the undo action in a text editor interface, enabling localization and translation to different languages or phrases, modify the undo button description, set or configure the undo tool’s accessible name, change the user-facing undo message, adapt the undo functionality text for internationalization, update the string displayed on the undo control for UI consistency, and tailor the undo label to specific language or cultural contexts.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        undo: "Undo task"
      }
    });
    </script>

### messages.units `String` *(default: "Units")*

The label of the Units dropdowns in TableWizard dialog.


<div class="meta-api-description">
How do I customize the unit labels in the Kendo UI Editor dropdown menus? Control, customize, or configure the text labels displayed in unit selection dropdown menus within editor interfaces or table wizards, enabling modification of unit names, measurement options, or unit descriptors shown in selection lists, dropdown controls, or unit fields, allowing developers to set, change, localize, or personalize the unit labels for measurements, quantities, or values in data entry dialogs or editor components.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        units: "Units"
      }
    });
    </script>

### messages.unlink `String` *(default: "Remove hyperlink")*

The title of the tool that removes hyperlinks.


<div class="meta-api-description">
How do I change the "unlink" button label in the Kendo UI Editor? Customize, configure, or set the title, label, tooltip, or text displayed on the toolbar button used for removing, unlinking, or deleting hyperlinks within the editor interface. Enable control over the unlink button’s description, modify the displayed message for clarity, accessibility, or localization, and adjust how the hyperlink removal action is presented to users during editing or content management. Adjust the unlink command label or title for better UX or multi-language support across different editor configurations.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        unlink: "Remove hyperlink"
      }
    });
    </script>

### messages.viewHtml `String` *(default: "View HTML")*

The title of the tool that shows the editor value as HTML.


<div class="meta-api-description">
How can I change the tooltip for the HTML view button in Kendo UI Editor? Configure or customize the tooltip, label, or title text that appears for the HTML view button or toggle within the content editor interface, enabling localization, translation, or modification of the descriptive text shown when switching or previewing source code or raw HTML source in the editor, so developers can control how the HTML view option is presented and labeled across different languages and contexts.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        viewHtml: "View HTML"
      }
    });
    </script>

### messages.width `String` *(default: 'Width')*

The title of the Width fields.


<div class="meta-api-description">
How do I customize the width input field label in Kendo UI Editor? Customize, configure, or set the display label and title text for width input fields in the user interface to control how width is presented or named, including localization and adapting UI messages for better clarity, branding, or user experience when adjusting or specifying dimensions, sizes, or width properties within editor components or design tools.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        width: "Width"
      }
    });
    </script>

### messages.wrapText `String` *(default: 'Wrap text')*

The title of the Wrap Text option in Table Wizard.


<div class="meta-api-description">
How to customize wrap text option wording in Kendo UI Editor tables? Configure or customize the label text for wrapping content inside table cells, control how wrap text options appear or are displayed within table editing interfaces, set or change the prompt or message associated with enabling text wrapping in tables, modify the UI wording related to wrap text functionality in table cells, adjust or localize the wrap text option wording to suit different languages or preferences within table editing contexts, enable seamless integration of wrap text instructions or labels in editor table tools, manage the phrasing and terminology shown to users for wrapping cell content inside tables, tailor the user interface messaging for toggling text wrap inside tables, set the descriptive label for table cell text wrapping controls, handle the display of wrap text instructions or labels in table editing features.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      messages: {
        wrapText: "Wrap text"
      }
    });
    </script>

### nonce `String`

When strict CSP is enabled a `nonce` can be provided for the inline styles. The passed value would be used as the nonce attribute for the inline styles in the content area iframe, the placeholder inline style and the link tags loading external stylesheets in the content area.


<div class="meta-api-description">
How to set a custom nonce for inline styles in Kendo UI Editor under strict CSP? Set or customize the security nonce token to control and enable inline style execution under strict Content Security Policy (CSP) environments, ensuring secure application of inline CSS within editable areas, style placeholders, and linked external CSS in embedded iframes. This involves configuring unique cryptographic nonces to authorize inline style blocks and stylesheet links, allowing safe styling while maintaining compliance with CSP restrictions, preventing unauthorized script or style injection during content editing. Adjust or specify the nonce attribute to manage CSP adherence, inline style permissions, and secure stylesheet loading within rich text editors or iframe-based content zones.
</div>

#### Example

    <textarea id="editor"></textarea>

    <script>
        $(document).ready(function() {
            $("#editor").kendoEditor({
                nonce: "kendoNonce"
            });
        });
    </script>

### navigateOnTab `Boolean` *(default: false)*

If set to `true` this configuration option would enable Tab-based navigation among Editor ToolBar items. By default navigation is arrow-based.


<div class="meta-api-description">
How to enable tab navigation in Kendo UI Editor toolbar? Control keyboard navigation within the editor toolbar by enabling or disabling the use of the Tab key and Shift+Tab to move focus between toolbar buttons, allowing users to configure whether tabbing cycles through controls instead of relying on arrow keys for navigation. This setting impacts keyboard accessibility and user workflows for moving focus across editor interface elements, letting developers tailor keyboard behavior to support tab-based navigation of toolbar items, switch between buttons intuitively using Tab or Shift+Tab, and improve usability by adjusting focus movement methods within rich text or code editor toolbars.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
      $("#editor").kendoEditor({
          navigateOnTab: true
      });
    </script>

### nonSplittableTagsOnPaste `Array` *(default: [])*

When pasting a block element inside an element such as a list `ul`, the list gets split in half and the block element is inserted between the two `ul` elements.

This configuration enables you to specify elements for which the above behavior will be ignored.


<div class="meta-api-description">
How to prevent splitting of lists when pasting content into a Kendo UI Editor? Control how pasted content interacts with existing list structures by specifying tags that prevent splitting or breaking lists and block elements during paste operations. Enable or configure behavior to avoid unwanted fragmentation of nested lists, block elements, or paragraphs when inserting clipboard content, ensuring continuous list items or block elements remain intact without division. Set or customize which HTML tags or elements should be treated as indivisible on paste, maintaining proper document flow and avoiding insertions that break or split ordered or unordered lists, nested structures, or block-level containers during clipboard insertions. Adjust paste handling to preserve list continuity, prevent insertion interruptions within list elements, and manage block element paste behavior for consistent formatting and seamless content integration.
</div>

#### Example

    <h4>Create a list using the editor toolbar command and then click the paste button.</h4>
    <button id="paste">Paste</button>
    <textarea id="editor"></textarea>
    <script>
      var editor = $("#editor").kendoEditor({
        nonSplittableTagsOnPaste: ["ul"],
        tools: [
          "insertUnorderedList"
        ]
      }).data("kendoEditor");

      $("#paste").on("click", () => {
        var editor = $("#editor").data("kendoEditor");
        editor.paste("<p>New content</p>");
      });
    </script>

### nonSplittableTagsOnPaste.tag `String`

An extension of the `nonSplittableTagsOnPaste` configuration. You can specify an array of objects instead of array of strings if you want to configure additional settings.


<div class="meta-api-description">
How to prevent specific HTML tags from being split when pasting content into a Kendo UI Editor? Control how pasted content handles specific HTML or custom tags to prevent them from being broken apart or split during paste operations, enabling configuration of paste behavior per tag with options to preserve tag structure, manage splitting rules, customize handling of inline or block elements when pasting, and set tag-specific paste preservation or merging policies. This feature supports fine-tuning paste interaction by specifying tags that must remain intact, customizing how individual elements are treated during content insertion from clipboard, and ensuring consistent tag integrity across different paste scenarios. Adjust or configure tag-based paste rules to avoid unwanted tag fragmentation and maintain semantic or formatting consistency when inserting external or copied content into the editor.
</div>

#### Example

    <h4>Create a list using the editor toolbar command and then click the paste button.</h4>
    <button id="paste">Paste</button>
    <textarea id="editor"></textarea>
    <script>
      var editor = $("#editor").kendoEditor({
        nonSplittableTagsOnPaste: [{
          tag: "ul",
          unwrap: false
        }],
        tools: [
          "insertUnorderedList"
        ]
      }).data("kendoEditor");

      $("#paste").on("click", () => {
        var editor = $("#editor").data("kendoEditor");
        editor.paste("<p>New content</p>");
      });
    </script>

### nonSplittableTagsOnPaste.unwrap `Boolean` *(default: true)*

By default the pasted content will be unwrapped from its parent elements when the `nonSplittableTagsOnPaste` configuration is enabled. This property enables you to stop that behavior.


<div class="meta-api-description">
How to configure Kendo UI Editor to preserve parent elements when pasting rich text? Control how pasted content handles non-splittable HTML tags by configuring whether to unwrap or preserve parent elements and surrounding tags when pasting rich text into the editor, enabling you to maintain the original nested structure, prevent splitting of elements like images or embeds, preserve formatting and wrappers during paste operations, and customize paste behavior to either break apart or keep intact complex tag hierarchies within the editor’s content.
</div>

#### Example

    <h4>Create a list using the editor toolbar command and then click the paste button.</h4>
    <button id="paste">Paste</button>
    <textarea id="editor"></textarea>
    <script>
      var editor = $("#editor").kendoEditor({
        nonSplittableTagsOnPaste: [{
          tag: "ul",
          unwrap: false
        }],
        tools: [
          "insertUnorderedList"
        ]
      }).data("kendoEditor");

      $("#paste").on("click", () => {
        var editor = $("#editor").data("kendoEditor");
        editor.paste("<p>New content</p>");
      });
    </script>

### pasteCleanup `Object`

Options for controlling how the pasting content is modified before it is added in the editor.


<div class="meta-api-description">
How to sanitize pasted HTML content in Kendo UI Editor to prevent inline scripts? Control and customize how content pasted from the clipboard is sanitized, cleaned, or transformed prior to insertion, including options to strip unwanted formatting, remove unsafe or disallowed HTML tags and attributes, normalize or standardize markup, filter out malicious or extraneous code, and enforce consistent styling and structure when inserting copied content into the text editor or rich text component. This covers scenarios like cleaning up pasted HTML, enabling safe pasting without carrying over inline styles or scripts, configuring automatic normalization of pasted markup, and setting rules to remove embedded code or unwanted elements from clipboard data before it appears in the editor.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            all: false,
            css: false,
            custom: null,
            keepNewLines: false,
            msAllFormatting: false,
            msConvertLists: true,
            msTags: true,
            none: false,
            span: false
        }
    });
    </script>

### pasteCleanup.all `Boolean` *(default: false)*

All HTML tags are stripped leaving only the text in the content.


<div class="meta-api-description">
How to remove HTML tags when pasting content into Kendo UI Editor? Control removing all formatting and HTML tags from pasted content to ensure only clean plain text is inserted, enabling stripping of styles, markup, and any embedded tags when pasting rich text or HTML; configure paste cleanup to sanitize and enforce unformatted text input, disable unwanted formatting carryover, and manage content pasted from web pages, word processors, or other styled sources for consistent plain text insertion and text-only pasting behavior.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            all: true
        }
    });
    </script>

### pasteCleanup.css `Boolean` *(default: false)*

Remove `style` and `class` attributes from the pasting content.


<div class="meta-api-description">
How to prevent pasting of inline CSS styles with Kendo UI Editor? Control removal of inline CSS styles and class attributes during HTML paste operations by configuring paste cleanup settings to sanitize content, strip embedded style tags, omit inline styling, eliminate CSS classes, and prevent unwanted formatting when inserting rich text. Enable cleaning of pasted HTML from style and class attributes to produce plain, consistent, and unstyled content, ensuring that pasted data matches desired format by filtering out embedded CSS and inline style declarations. This configuration helps maintain clean editor content by disabling automatic retention of style elements, inline CSS, and class names during paste.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            css: true
        }
    });
    </script>

### pasteCleanup.custom `Function`

Use a callback function to integrate a custom implementation for cleaning up the paste content. Make sure the callback function always returns the result.


<div class="meta-api-description">
How to customize paste cleanup in Kendo UI Editor? Customize clipboard content handling during paste operations by providing a user-defined function to clean, sanitize, filter, or transform pasted data including HTML, inline styles, and plain text fragments. Configure the paste behavior to modify, strip unwanted elements, apply filters, or restructure content programmatically before insertion, enabling control over how pasted text or markup is processed and integrated into the editor. This setup supports use cases such as removing inline CSS, filtering scripts, normalizing text formatting, or applying complex transformations to clipboard data when content is pasted.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            custom: function(html) {
                return html.replace(/<img[^>]*>/, "");
            }
        }
    });
    </script>

### pasteCleanup.keepNewLines `Boolean` *(default: false)*

Strip all HTML tags but keep new lines in the pasted content.


<div class="meta-api-description">
What happens to line breaks when pasting content into a Kendo UI Editor with keepNewLines set to true? Control how pasted content is sanitized by removing HTML tags while preserving original line breaks, newlines, and paragraph spacing to maintain the text’s structure during paste operations. Enable or configure cleaning of pasted input that strips formatting but keeps carriage returns, line feeds, and newline characters intact for readable, well-structured plain text pastes. Adjust paste behavior to sanitize content while retaining line separation, paragraph breaks, and multiline spacing when inserting text from external sources. Manage paste cleanup to preserve the natural line layout, ensuring pasted text stays separated by newlines without embedded HTML or styling tags, useful for maintaining readability and text flow.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            keepNewLines: true
        }
    });
    </script>

### pasteCleanup.msAllFormatting `Boolean` *(default: false)*

Remove all special formatting from MS Word content like font-name, font-size and MS Word specific tags.


<div class="meta-api-description">
How do I remove Microsoft Word formatting when pasting into Kendo UI Editor? Configure paste options to remove all Microsoft Word-specific formatting, styles, tags, font names, and font sizes when pasting content into the editor; control cleanup behavior to strip Word markup and convert clipboard content into clean, plain HTML free of proprietary Word styles, ensuring that pasted text is sanitized and consistent regardless of source formatting or complex Word artifacts.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            msAllFormatting: true
        }
    });
    </script>

### pasteCleanup.msConvertLists `Boolean` *(default: true)*

Converts MS Word pasted content into HTML lists.


<div class="meta-api-description">
How to convert Microsoft Word lists to HTML in Kendo UI Editor? Transform pasted content from Microsoft Word into clean, semantic HTML lists by enabling or configuring the conversion of Word list formats into proper ordered and unordered list elements. Control how nested lists, bullet points, and numbered lists from pasted Word documents are parsed, cleaned, and normalized into standard HTML ordered list and unordered list structures, ensuring consistent list formatting and markup after copy-pasting. Adjust or enable list recognition and conversion during paste operations to manage list markers, nested hierarchy, and overall cleanup of list content originating from Word or similar rich text sources.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            msConvertLists: false
        }
    });
    </script>

### pasteCleanup.msTags `Boolean` *(default: true)*

Removes all MS Word specific tags and cleans up the extra metadata.


<div class="meta-api-description">
How to remove Microsoft Word tags from pasted content in Kendo UI Editor? Clean and sanitize pasted content by stripping Microsoft Word-specific tags, removing extra metadata, and eliminating Word markup, styles, and comments to ensure clean HTML output when copying and pasting from Office documents or Word files. Control how pasted text from Word or other Office programs is processed to prevent lingering formatting, unwanted styles, and embedded comments, enabling consistent, clean content insertion and smooth integration within editors or content management systems. Configure paste sanitization to handle Office clipboard data, clean Word HTML, remove proprietary tags, and ensure unpolluted, standardized content after copy-paste actions from Word documents.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            msTags: false
        }
    });
    </script>

### pasteCleanup.none `Boolean` *(default: false)*

Prevent any cleaning up of the content.


<div class="meta-api-description">
How do I prevent automatic sanitization of pasted content in Kendo UI Editor? Control how pasted content is handled by disabling all automatic sanitization, filtering, normalization, and cleanup to retain the original HTML markup and formatting exactly as it was copied, ensuring no modifications, stripping, or transformations occur during paste operations in the editor; configure paste behavior to keep raw source code, prevent content alteration, and maintain original tags, styles, and structure when inserting HTML from external sources or clipboard input.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            none: true
        }
    });
    </script>

### pasteCleanup.span `Boolean` *(default: false)*

Remove all span elements from the content, ensuring much of the inline formatting is removed.


<div class="meta-api-description">
How to remove span tags from pasted content in Kendo UI Editor? Control and configure paste handling to clean and sanitize HTML content by removing unwanted inline elements, specifically targeting and stripping out all span tags and their associated styles, classes, and inline formatting from pasted material; this setup helps eliminate messy or redundant formatting from content copied from sources like Microsoft Word, external editors, or rich text inputs, enabling consistent, clean paste behavior by removing span elements and simplifying HTML structure after copy-paste operations.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        pasteCleanup: {
            span: false
        }
    });
    </script>

### pdf `Object`

Configures the Kendo UI Editor PDF export settings.


<div class="meta-api-description">
How to customize PDF export settings in Kendo UI Editor? Configure and customize exporting rich text or editor content as PDF files, including setting page dimensions like paper size, adjusting margins, scaling content for fitting, specifying output file names, and managing proxy or server options for rendering and serializing content into PDF format. Control PDF generation parameters, enable fine-tuned layout settings, format export output, and handle rendering behaviors to produce printable or shareable documents from editor data, covering scenarios such as batch exporting, file naming conventions, content scaling, print-ready formatting, and network proxy considerations during PDF creation.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["pdf"],
        pdf: {
            paperSize: "A4",
            margin: { top: "2cm", left: "1cm", right: "1cm", bottom: "1cm" }
        }
    });
    </script>

### pdf.author `String` *(default: null)*

The author of the PDF document.


<div class="meta-api-description">
How do I set the author of a PDF file generated from a Kendo UI Editor? Configure or specify the creator or author name embedded in the metadata of exported PDF files from an editor or content creation tool, enabling control over the document’s author information seen in PDF viewers, metadata properties, or file details; set, customize, or update the author tag to reflect the originating user, organization, or application when generating PDF documents programmatically or through export settings.
</div>

#### Example - set the author

    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                author: "John Doe"
            }
        });
    </script>


### pdf.autoPrint `Boolean` *(default: false)*
Specifies if the Print dialog should be opened immediately after loading the document.

> **Note:** Some PDF Readers/Viewers will not allow opening the Print Preview by default, it might be necessary to configure the corresponding add-on or application.


<div class="meta-api-description">
How to automatically print a PDF in Kendo UI Editor? Control automatic triggering of the print dialog or print preview immediately after loading a PDF within the editor, enabling seamless printing workflows, instant print setup, or quick print-preview display without manual interaction; supports use cases like auto print prompting, immediate print dialog activation, setting print preview on load, and enabling rapid document printing, though some PDF viewers or browser extensions may restrict automatic print dialog opening requiring additional configuration or permissions.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["pdf"],
        pdf: {
            autoPrint: true
        }
    });
    </script>

### pdf.avoidLinks `Boolean|String` *(default: false)*
A flag indicating whether to produce actual hyperlinks in the exported PDF file.

It's also possible to pass a CSS selector as argument. All matching links will be ignored.

> Available in versions 2015.3.1020 and later


<div class="meta-api-description">
How to prevent links from being clickable in Kendo UI Editor PDF export? Control whether clickable hyperlinks are included or disabled when converting editor content to PDF by preventing active links, disabling actual PDF hyperlinks entirely, or selectively ignoring links that match specific CSS selectors to avoid creating interactive link elements in the exported PDF file, useful for customizing PDF output to exclude or manage link behavior during export.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["pdf"],
        pdf: {
            avoidLinks: true
        }
    });
    </script>

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*

The creator of the PDF document.


<div class="meta-api-description">
How to set creator metadata in Kendo UI Editor's exported PDFs? Configure or set the author, creator name, or identifier metadata embedded in exported PDF documents from the editor, controlling the PDF Creator field for purposes such as document attribution, metadata tagging, compliance auditing, tracking source or origin, and enabling searchable identification of generated PDF files. This setting helps specify who or what system created the PDF, supporting use cases like PDF metadata customization, document provenance, automated reporting, content management, and digital signature workflows.
</div>

#### Example - set the creator

    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                creator: "John Doe"
            }
        });
    </script>

### pdf.date `Date`

The date when the PDF document is created. Defaults to `new Date()`.


<div class="meta-api-description">
How can I set the creation date of PDF files generated by the Kendo UI Editor? Configure, specify, or set the creation timestamp embedded in PDF files generated by the editor, including controlling the PDF metadata date, creation time, or document timestamp with a custom JavaScript Date object or system current date, enabling precise adjustment of the PDF’s creation date for tracking, versioning, or audit purposes across various generation scenarios.
</div>

#### Example - set the date

    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                date: new Date("2015/1/31")
            }
        });
    </script>

### pdf.fileName `String` *(default: "Export.pdf")*

Specifies the file name of the exported PDF file.


<div class="meta-api-description">
How to set custom filename for PDF export from Kendo UI Editor? Specify or configure the exported PDF file name, set the desired filename for PDF downloads when saving or exporting content, control the output document name during PDF export from the editor, customize or override default PDF file naming upon download, set the saved PDF file identifier, configure export filename for organizational or user-specific naming, enable precise control over PDF export naming conventions, assign custom or dynamic file names for PDFs generated from editor content, manage how exported PDF documents are labeled for easier identification after download.
</div>

#### Example - set the default PDF file name

    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                fileName: "Document.pdf"
            }
        });
    </script>

### pdf.forceProxy `Boolean` *(default: false)*
If set to true, the content will be forwarded to [proxyURL](/api/javascript/ui/editor#configuration-pdf.proxyURL) even if the browser supports saving files locally.


<div class="meta-api-description">
How to force upload generated PDFs in Kendo UI Editor instead of saving locally? Control whether PDF output from the editor is sent through a server proxy instead of saving files locally, enabling forced upload or server-side processing of generated PDFs regardless of browser capabilities, configuring the component to post PDF data to a designated proxy URL for centralized handling, ensuring consistent server-based PDF generation, forwarding PDF content to remote endpoints, and overriding default client-side file saving behavior by enabling proxy routing for PDF documents.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["pdf"],
        pdf: {
            forceProxy: true,
            proxyURL: "/save"
        }
    });
    </script>

### pdf.jpegQuality  `Number` *(default: 0.92)*

Specifies the quality of the images within the exported file, from 0 to 1.


<div class="meta-api-description">
How do I set the quality of JPEG images in exported PDF files using the Kendo UI Editor? Control and adjust the compression quality of JPEG images embedded in exported PDF files by setting a value between 0 and 1 to balance image clarity and file size, optimize export quality, configure image fidelity, enable higher or lower resolution outputs, set compression levels for PDF exports, manage the trade-off between visual detail and reduced file size when saving editor content as PDFs, customize export image quality, and fine-tune how sharp or compressed the images appear within the resulting PDF document.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["pdf"],
        pdf: {
            jpegQuality: 0.8
        }
    });
    </script>

### pdf.keepPNG `Boolean` *(default: false)*

If set to true all PNG images contained in the exported file will be kept in PNG format.


<div class="meta-api-description">
How to preserve original PNG images when exporting PDF from Kendo UI Editor? Control how images are handled during PDF export from an editor, specifically enabling preservation of original PNG images without automatic conversion to other formats; configure export settings to keep embedded PNG graphics intact, maintain image quality and transparency, avoid rasterization or format changes, and ensure PNG files remain as PNGs in the final PDF output, useful for workflows requiring exact image fidelity, seamless integration of PNG visuals, or preventing loss of image detail during document generation.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["pdf"],
        pdf: {
            keepPNG: true
        }
    });
    </script>

### pdf.keywords `String` *(default: null)*

Specifies the keywords of the exported PDF file.


<div class="meta-api-description">
How can I configure metadata keywords for PDFs exported from the Kendo UI editor? Set or configure searchable metadata keywords, tags, or descriptive phrases embedded in PDF files generated from the editor to enhance document indexing, searchability, and organization within PDF readers and document management systems. Enable or customize export metadata keywords to improve keyword-based search results, content discoverability, and file categorization in PDFs created during editor export processes.
</div>

#### Example - set the keywords

    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                keywords: "Kendo UI Editor PDF export"
            }
        });
    </script>

### pdf.landscape `Boolean` *(default: false)*

Set to `true` to reverse the paper dimensions if needed such that width is the larger edge.


<div class="meta-api-description">
How do I set the page orientation to landscape when exporting PDF from Kendo UI Editor? Control page orientation for PDF exports from the editor by enabling landscape mode, which switches the page layout so the width becomes the longer side instead of height, allowing you to set, configure, or toggle horizontal versus vertical page direction for output documents, print previews, or PDF formatting when you need widescreen or flipped page dimensions.
</div>

#### Example - enable landscape mode

    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                landscape: true
            }
        });
    </script>

### pdf.margin `Object`

Specifies the margins of the page (numbers or strings with units). Supported
units are "mm", "cm", "in" and "pt" (default).


<div class="meta-api-description">
How do I set custom margins for PDF exports in Kendo UI Editor? Set and customize PDF page margins for editor exports or printing by defining top, right, bottom, and left spacing using numeric values or strings with units such as points, millimeters, centimeters, or inches. Adjust margins to control PDF layout, page borders, printable area, whitespace around content, and page formatting for better presentation or compliance with print requirements. Enable precision page margin configuration for PDF output, fine-tune printable regions, and specify units for accurate spacing on exported PDF documents from editor content.
</div>

#### Example - set the margins

    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                margin: {
                    bottom: 20,
                    left: 20,
                    right: 20,
                    top: 20
                }
            }
        });
    </script>

### pdf.margin.bottom `Number|String` *(default: 0)*

The bottom margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
How do I adjust the bottom margin in PDF exports from Kendo UI Editor? Configure or set the bottom page margin spacing when exporting content to PDF, adjusting the space at the lower edge of each PDF page to customize document layout, define padding, control page boundaries, and manage whitespace below the content in PDF exports from the editor, using numeric values typically interpreted as points (pt) to increase or decrease bottom margin size for better formatting and presentation.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["pdf"],
        pdf: {
            margin: {
                bottom: "1cm"
            }
        }
    });
    </script>

### pdf.margin.left `Number|String` *(default: 0)*

The left margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
How to adjust the left margin in Kendo UI Editor when exporting as PDF? Adjust or configure the left page margin size, indentation, or whitespace when exporting or saving rich text, HTML, or editor content as a PDF file, controlling the distance from the left page edge in points or units, setting custom spacing for layout, formatting, or print-ready outputs, modifying document padding or margins during PDF generation to ensure proper alignment and visual structure on the left side of the page.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["pdf"],
        pdf: {
            margin: {
                left: 20
            }
        }
    });
    </script>

### pdf.margin.right `Number|String` *(default: 0)*

The right margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
How do I adjust the right margin size for PDF exports in Kendo UI Editor? Adjust the right page margin size for PDF exports to control the spacing between content and the right edge of the page, set or configure numeric margin measurements in points for precise layout adjustments, customize page layout by specifying the right margin width, control element positioning on the PDF page edge, and define how far content is inset from the right border during PDF generation.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["pdf"],
        pdf: {
            margin: {
                right: "2cm"
            }
        }
    });
    </script>

### pdf.margin.top `Number|String` *(default: 0)*

The top margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
How to adjust the top margin when exporting content as a PDF with Kendo UI Editor? Adjust the top page margin or whitespace when exporting content to PDF by setting the distance between the page's top edge and the content area, controlling vertical alignment and layout spacing in PDF exports. Enable configuring, customizing, or setting the upper margin size with numeric values for precise page formatting, padding, or buffer space at the top of PDF pages, which helps to control page layout, printing margins, and content positioning in generated documents.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["pdf"],
        pdf: {
            margin: {
                top: 25
            }
        }
    });
    </script>

### pdf.paperSize `String|Array` *(default: "auto")*

Specifies the paper size of the PDF document.
The default "auto" means paper size is determined by content.

> The size of the content in pixels will match the size of the output in points (1 pixel = 1/72 inch).

Supported values:

* A predefined size: "A4", "A3" etc
* An array of two numbers specifying the width and height in points (1pt = 1/72in)
* An array of two strings specifying the width and height in units.
  Supported units are "mm", "cm", "in" and "pt".


<div class="meta-api-description">
How do I set the paper size for PDF exports from Kendo UI Editor? Configure or set the page dimensions and size for PDF exports from the editor, specifying custom or standard paper formats like A4 or A3, or defining exact width and height measurements in various units such as points, millimeters, centimeters, or inches to control output layout and scale. Enable precise adjustment of PDF page size by providing fixed dimensions, predefined paper sizes, or letting the system automatically determine size based on content, ensuring accurate correspondence between on-screen pixels and exported PDF points for professional document formatting, printing, scaling, and layout consistency.
</div>

#### Example - set custom paper size

    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                paperSize : "A4"
            }
        });
    </script>

### pdf.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user.

A proxy will be used when the browser is not capable of saving files locally, for example, Internet Explorer 9 and Safari.

The developer is responsible for implementing the server-side proxy.

The proxy will receive a POST request with the following parameters in the request body:

* contentType: The MIME type of the file
* base64: The base-64 encoded file content
* fileName: The file name, as requested by the caller.

The proxy should return the decoded file with the "Content-Disposition" header set to
`attachment; filename="<fileName.pdf>"`.


<div class="meta-api-description">
How do I enable PDF downloads in older browsers using Kendo UI for jQuery? Control how PDF exports are streamed through a server-side proxy URL to enable downloading in browsers that lack local file saving capabilities, such as older Internet Explorer and Safari versions. Configure or set an intermediary upload endpoint that receives the generated PDF file encoded as base64 along with its MIME type and filename, enabling the server to decode and serve the file with the correct content disposition headers for attachment download. This proxy-based solution ensures compatibility with restricted environments by allowing you to specify, enable, or implement a backend URL that handles POST requests containing file data, facilitating seamless PDF delivery and download when direct browser saving is not supported.
</div>

#### Example - set the server proxy URL
    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                proxyURL: "/save"
            }
        });
    </script>

### pdf.proxyTarget `String` *(default: "_self")*

A name or keyword indicating where to display the document returned from the proxy.

If you want to display the document in a new window or iframe,
the proxy should set the "Content-Disposition" header to `inline; filename="<fileName.pdf>"`.


<div class="meta-api-description">
How to specify the target for PDF documents generated by Kendo UI Editor? Set or configure the display destination for PDF documents delivered through a proxy, enabling precise control over where the PDF opens such as in a new browser tab, specific iframe, embedded frame, or named window target; adjust or specify the browsing context name or keyword to direct the PDF output correctly, ensuring it appears inline within the chosen view or container, with support for setting content disposition headers to manage inline rendering or file naming for opened or embedded PDF files across different browsing environments and setups.
</div>

#### Example - open the generated document in a new window

    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                forceProxy: true,
                proxyURL: "/save",
                proxyTarget: "_blank"
            }
        });
    </script>

### pdf.subject `String` *(default: null)*

Sets the subject of the PDF file.


<div class="meta-api-description">
How do I set the subject metadata for PDFs generated from Kendo UI Editor content? Configure or set the subject metadata for PDF documents generated from editor content, controlling the descriptive subject line embedded in PDFs to improve document identification, indexing, searching, and information display in PDF readers, content management systems, or search engines, allowing specification of the PDF’s topic or theme metadata when exporting or saving files as PDF format.
</div>

#### Example - set the subject
    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf:{
                subject : "Kendo UI Editor overview"
            }
        });
    </script>

### pdf.title `String` *(default: null)*

Sets the title of the PDF file.


<div class="meta-api-description">
How do I set a custom title for the PDF exported from Kendo UI Editor? Control and set the title metadata of exported PDF files, enabling customization of the document's displayed title and default filename during download. Configure the PDF file heading, adjust export naming conventions, specify the document title embedded within the PDF metadata, and manage how the saved file name appears to users. This functionality supports defining, labeling, or customizing the exported PDF’s identification for user downloads and PDF viewers, including setting descriptive titles or filenames for generated PDF documents from editor content.
</div>

#### Example - set the title
    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            tools: ["pdf"],
            pdf: {
                title : "Overview"
            }
        });
    </script>

### placeholder `String` *(default: "")*

The hint displayed by the widget when it is empty. Not set by default.

> **Important**
>
> The options is only available in [Classic Mode](/controls/editor/overview#classic-mode).


<div class="meta-api-description">
How to set default placeholder text in Kendo UI Editor? Configure inline hint text, placeholder content, or muted guidance inside the editor area to display when no user content is present, enabling contextual help, empty state messages, or subtle prompts within the text editor interface. Control or set ghost text, default instructions, or visual cues in classic editing mode to improve usability by showing faint or inline placeholder text until users begin typing. Enable or customize the empty editor placeholder for workflows requiring inline support text, user focus hints, or subtle typed input encouragement within a classic-mode text component.
</div>

#### Example - specify the placeholder option
    <textarea id="editor"></textarea>
    <script>
        $("#editor").kendoEditor({
            placeholder: "Type here..."
        });
    </script>

### resizable `Boolean|Object` *(default: false)*

If enabled, the editor renders a resize handle to allow users to resize it.


<div class="meta-api-description">
How do I enable resizing in a Kendo UI Editor? control the ability to dynamically resize the text editor interface by enabling or disabling interactive drag handles that let users adjust width and height; configure resizable editor settings to allow flexible UI dimensions, customize editor size adjustments during initialization, activate or deactivate user-driven resizing functionality, support responsive design by permitting manual editor scaling, set editor to be modifiable in size via mouse drag operations, allow end-users to control editor layout by resizing, manage editor component flexibility for adaptable interfaces, enable or prevent editor window scaling in real time, toggle resize handles for user interface element adjustment.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      resizable: true
    });
    </script>

### resizable.content `Boolean`

If enabled, the editor renders a resize handle to allow users to resize it.


<div class="meta-api-description">
How to enable interactive resizing of Kendo UI Editor content area? Enable interactive resizing of the editor content area by configuring a visible, draggable resize handle or grip that allows users to adjust the editor panel’s width and height dynamically through click-and-drag actions; this setting supports customization of resizable editor content boundaries, user control over editing space, flexible layout adjustments, and intuitive UI resizing behavior during runtime or initialization.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      resizable: {
          content: true
      }
    });
    </script>

### resizable.min `Number|Object`

The minimum height that the editor can be resized to. If set to an object the user can restrict both min width and height values.


<div class="meta-api-description">
How to set minimum height limit for Kendo UI Editor component? Control and configure the smallest allowable dimensions when resizing the editor component, including setting minimum height limits or defining minimum width and height constraints together, enabling customization of resize boundaries, enforcing minimum size limits during initialization, adjusting resizable boundaries, restricting how far users can shrink the editor, managing resize handle limitations, setting size thresholds, and controlling dynamic resizing behavior to prevent the editor from becoming too small either by height only or by width and height simultaneously.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      resizable: {
        min: 100
      }
    });
    </script>

### resizable.min.minWidth `Number`

The minimum width that the editor can be resized to.


<div class="meta-api-description">
How do I prevent an editor from shrinking below a minimum width when resized? Control the minimum allowed width when resizing an editor or component to prevent it from shrinking below a specified size; set, configure, or enforce the smallest width limit to maintain usability, avoid layout issues, ensure a consistent minimum horizontal dimension during dynamic resizing, and customize how narrow the interface or panel can become when users drag or adjust its size.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      resizable: {
        min: {
          minWidth: 500
        }
      }
    });
    </script>

### resizable.min.minHeight `Number`

The minimum height that the editor can be resized to.


<div class="meta-api-description">
How do I prevent my Kendo UI Editor from shrinking below a certain height? Set or configure the minimum height limit for vertical resizing of an editable text area or code editor to prevent it from becoming too small or collapsing, enabling control over the editor’s smallest allowable height. This helps enforce a minimum vertical size constraint, restrict shrinking beyond a certain point during user-driven or programmatic resizing, and ensures the interface remains legible and functional by avoiding excessively short editor dimensions. Adjust or define the lowest height threshold for the editor’s resizable property to maintain usability and consistent layout appearance across different window sizes or screen configurations.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      resizable: {
        min: {
          minHeight: 500
        }
      }
    });
    </script>

### resizable.max `Number|Object`

The maximum height that the editor can be resized to. If set to an object the user can restrict both max width and height values.


<div class="meta-api-description">
How can I set a maximum height for my Kendo UI editor component? Control and configure the maximum height or size limits for resizable editor components, enabling you to set upper bounds on how large the editor window or panel can grow when users drag to resize, including options to restrict both maximum height and width dimensions. Set constraints to prevent the editor area from expanding beyond certain pixel limits or customizable size thresholds, useful for maintaining layout consistency, avoiding oversized editing interfaces, and managing responsive or dynamic user interface resizing behavior. Adjust maximum dimension settings via single values or parameter objects for granular control over editor resizing boundaries in various UI scenarios and application layouts.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      resizable: {
        max: 600
      }
    });
    </script>

### resizable.max.maxWidth `Number`

The maximum width that the editor can be resized to.


<div class="meta-api-description">
How to limit the maximum width of a resizable Kendo UI Editor? Control and limit the maximum width of a resizable editor or component to prevent it from expanding too large during drag or resize actions, ensuring the layout does not exceed a specified width threshold. Configure maximum width constraints for resizable elements to restrict horizontal growth, enforce size boundaries, set upper limits on resizing, and maintain consistent interface proportions, especially when enabling or disabling width adjustments through user interactions. Adjust maximum width parameters to govern resizing behavior, constrain element expansion, and optimize responsive design by defining width caps for editor or UI components.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      resizable: {
        max: {
          maxWidth: 500
        }
      }
    });
    </script>

### resizable.max.maxHeight `Number`

The maximum height that the editor can be resized to.


<div class="meta-api-description">
How do I set the maximum height of an editor in Kendo UI for jQuery? Control and configure the upper limit for vertical resizing of the editor area to restrict how tall the editor can grow when users drag to expand it, setting a cap on maximum height to prevent oversized layouts. Enable, set, or adjust the maximum vertical dimension so the editing space cannot exceed a specified height, managing user interface scaling, limiting vertical expansion during drag or resize actions, and ensuring content areas stay within defined boundaries without surpassing set maximum height constraints.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      resizable: {
        max: {
          maxHeight: 500
        }
      }
    });
    </script>

### resizable.toolbar `Boolean|Object` *(default: false)*

If `resizable` is set to `true` the widget will detect changes in the viewport width and will hide the overflowing controls in the tool overflow popup.

If `resizable.toolbar` is assigned an object, it will propagate the [`Toolbar.overflow`](/api/javascript/ui/toolbar/configuration/overflow) configuration to the Editor's toolbar.

> Tools are shown/hidden on tool group level. Tools with popup such as `fontName`, `fontSize`, `fontColor`, `backColor`, `formatting` and `createTable` will **not** be moved to the tool overflow popup and will be always visible.


<div class="meta-api-description">
How to make Kendo UI editor toolbar responsive and resize automatically? Control and configure adaptive toolbar resizing in a rich text editor by enabling automatic detection of viewport width changes to dynamically hide or show toolbar controls based on available space. Customize overflow behavior and tool group visibility to manage which buttons appear directly on the toolbar versus inside an overflow popup, ensuring critical functions like font styling, colors, formatting options, and table creation remain persistently accessible and never hidden. Adjust toolbar responsiveness to optimize user interface layout, handle tool overflow gracefully, and maintain consistent access to essential editing features across different screen sizes or window resizes.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      resizable: {
          toolbar: true
      }
    });
    </script>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      resizable: {
        toolbar: {
            mode: "section"
        }
      }
    });
    </script>

### resizable.toolbar.mode `String` *(default: "menu")*

Defines the overflow mode. The available options are:
- `"menu"` — Moves overflowing items into a dropdown menu.
- `"scroll"` — Keeps items visible and enables horizontal scrolling.
- `"section"` — Groups items into collapsible sections.
- `"none"` — Disables overflow handling; items may be cut off.


<div class="meta-api-description">
How to configure overflow handling for the Kendo UI Editor toolbar? Control how a toolbar manages excess items when the interface resizes or the available width is limited by configuring overflow handling modes such as consolidating hidden commands into dropdown menus, enabling horizontal scrollbars or swipe gestures to navigate through all toolbar buttons, grouping controls into expandable or collapsible sections for organized access, or disabling any overflow behavior which may result in clipped or hidden toolbar elements beyond the visible area. Adjust, set, or enable different overflow strategies including menu-based overflow, scrollable toolbars, sectional folding, or no overflow management to customize interaction patterns for toolbars adapting dynamically to container size changes or responsive layouts.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        resizable: {
            toolbar: {
                mode: "scroll"
            }
        }
    });
    </script>


### resizable.toolbar.scrollButtons `String` *(default: "auto")*

Defines the visibility of scroll buttons when `mode` is `"scroll"`. The available options are:
- `"auto"` — Displays scroll buttons only when needed.
- `"hidden"` — Hides the scroll buttons at all times.
- `"visible"` — Always shows the scroll buttons.


<div class="meta-api-description">
How to hide or show toolbar scroll buttons in Kendo UI Editor? Configure toolbar scroll button visibility for horizontal scrolling toolbars by setting options to always show, always hide, or automatically display scroll controls based on content overflow, enabling control over when toolbar navigation arrows appear in scrollable editor toolbars, managing user interaction with toolbar overflow, toggling scroll button presence dynamically or statically, and adjusting toolbar scroll behavior for improved accessibility and usability in scroll mode.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        resizable: {
            toolbar: {
                mode: "scroll",
                scrollButtons: "visible"
            }
        }
    });
    </script>


### resizable.toolbar.scrollButtonsPosition `String` *(default: "split")*

Defines the placement of scroll buttons. The available options are:
- `"split"` — Scroll buttons appear at both ends of the toolbar.
- `"start"` — Scroll buttons appear only at the start of the toolbar.
- `"end"` — Scroll buttons appear only at the end of the toolbar.


<div class="meta-api-description">
How to customize scroll button position in Kendo UI editor toolbar? Control and customize the location of scroll buttons or navigation arrows on a toolbar to manage overflow scrolling, enabling placement of scroll controls at the beginning, end, or both ends of the toolbar for better user interface navigation and enhanced toolbar scrolling behavior in rich text or code editors.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        resizable: {
            toolbar: {
                mode: "scroll",
                scrollButtonsPosition: "end"
            }
        }
    });
    </script>


### resizable.toolbar.scrollDistance `Number` *(default: 50)*

Specifies the distance (in pixels) the toolbar scrolls when a scroll button is clicked.


<div class="meta-api-description">
How do I adjust the scroll step size for the Kendo UI Editor's toolbar? Adjust the horizontal scroll step size for toolbar navigation, determining how many pixels the toolbar moves when scroll buttons are activated; configure, set, or control the distance per click to fine-tune toolbar scrolling behavior, manage overflow navigation, customize scroll increments, enable smooth or incremental toolbar shifts, and optimize the scrolling responsiveness during user interactions with toolbar overflow controls.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        resizable: {
            toolbar: {
                mode: "scroll",
                scrollDistance: 100
            }
        }
    });
    </script>

### serialization `Object`

Allows setting of serialization options.


<div class="meta-api-description">
How can I customize serialization settings in the Kendo UI Editor to export content as HTML? Control and customize how content is encoded, converted, or transformed for saving, submitting, or exporting by configuring serialization settings, including format selection such as HTML, JSON, or plain text, enabling custom serialization functions, adjusting how data is read from or written to the editor, managing content output formats, setting serialization behavior during initialization, tailoring content encoding and decoding processes, and specifying how the editor processes content representation for storage or transmission to adapt parsing, conversion, and data handling workflows.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        serialization: {
            custom: function(html) {
                return html.replace(/(<\/?)strong(\s?)/, "$1b$2");
            }
        }
    });
    </script>

### serialization.custom `Function`

Define custom serialization for the editable content. The method accepts a single parameter as a string and is expected to return a string.


<div class="meta-api-description">
How to serialize Kendo UI Editor content into different formats such as HTML, Markdown, or custom markup? Customize serialization by defining a function that transforms editor content strings into tailored formats, enabling conversion between HTML, Markdown, or other markup types, sanitizing or stripping unwanted tags, encoding content for security, or formatting text for backend submission and storage. This flexible content serialization approach supports configuring how editable text is converted into strings, allowing control over output format, tag handling, encoding, and preparation for different use cases such as API payloads, data sanitization, or custom markup generation.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        serialization: {
            custom: function(html) {
                return html.replace(/(<\/?)b(\s?)/, "$1strong$2");
            }
        }
    });
    </script>

### serialization.entities `Boolean` *(default: true)*

Indicates whether the characters outside the ASCII range will be encoded as HTML entities. By default, they are encoded.


<div class="meta-api-description">
How do I prevent special characters from being encoded in Kendo UI Editor when saving content? Control how text beyond standard ASCII characters is encoded during content serialization by configuring the option that enables or disables transforming non-ASCII characters into HTML entities when saving, exporting, or transmitting HTML content. Adjust settings to manage encoding of special characters, Unicode symbols, accented letters, and other extended characters to ensure compatibility, proper display, or specific encoding requirements in serialized output. Enable or disable automatic replacement of characters outside the basic ASCII range with numeric or named HTML entities for scenarios involving HTML data storage, export, or transmission across different platforms or systems.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      value: "The character ä is an umlaut",
      serialization: {
        entities: true
      }
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log($("#editor").data("kendoEditor").value()); // logs "The character &auml; is an umlaut"
    </script>

### serialization.optimizeTags `Boolean` *(default: false)*

Indicates whether optizable tags should be removed from the DOM. Currently, optimizable tags are `span` and `font` elements with no attributes and no decoration or formatting applied (via inline styles/attributes).


<div class="meta-api-description">
How do I remove unnecessary tags from serialized HTML output in Kendo UI Editor? Control cleaning and simplifying serialized HTML output by removing unnecessary or redundant inline tags such as empty span and font elements lacking attributes, styles, or formatting; configure serialization to strip out these superfluous markup tags to reduce DOM complexity, minimize HTML bloat, enable cleaner code export from rich text editors, optimize tag usage, and produce streamlined, minimal markup that excludes default or empty inline wrappers during content serialization processes.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      value: "<p><span>non-decorated text</span></p><p><span style=\"text-decoration: underline;\">underline text</span></p>",
      serialization: {
        optimizeTags: true
      }
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log($("#editor").data("kendoEditor").value()); // logs "The character &auml; is an umlaut"
    </script>

### serialization.scripts `Boolean` *(default: false)*

Indicates whether inline scripts will be serialized and posted to the server.

> Setting this option does not prevent cross-site scripting (XSS) attacks; you need server sanitization, too.
> See the [preventing cross-site-scripting](/web/editor/preventing-xss) help topic for more information.


<div class="meta-api-description">
How to prevent inline JavaScript from being posted when using the Kendo Editor? Enable or disable the inclusion and serialization of inline script tags and JavaScript code within the editor content when saving or submitting data, controlling whether embedded script elements are preserved or stripped out during content processing and posting to the server, with implications for managing embedded scripting, code injection, and security considerations such as cross-site scripting prevention requiring additional server-side sanitization and content filtering measures to safely handle scripts embedded in editor input.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      value: "before script <script>alert(1);<\/script> after script",
      serialization: {
        scripts: true
      }
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log($("#editor").data("kendoEditor").value()); // log will contain the script tag
    </script>

### serialization.semantic `Boolean` *(default: true)*

Indicates whether the font styles will be saved as semantic (strong / em / span) tags,
or as presentational (b / i / u / font) tags. Used for outputting content for legacy systems.


<div class="meta-api-description">
How to make Kendo UI Editor export bold and italic text using semantic HTML instead of presentational tags? Configure the serialization of font styles to control whether the output HTML uses semantic elements like strong, em, and span for modern web standards or legacy presentational tags such as b, i, u, and font for backward compatibility; adjust the encoding of text styling in saved content to switch between semantic markup for accessibility and SEO optimization or traditional formatting tags for older browsers or systems that require non-semantic tags, enabling fine-grained control over how bold, italic, underline, and font styling are represented in exported HTML.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      value: "Check out <em>this</em> <strong>kata</strong>.",
      serialization: {
        semantic: false
      }
    });
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log($("#editor").data("kendoEditor").value()); // logs "Check out <i>this</i> <b>kata</b>.",
    </script>

### stylesheets `Array`

Allows custom stylesheets to be included within the editing area. This setting is applicable only when the [Editor is initialized from a `textarea`](/web/editor/overview)
and a contenteditable iframe is generated.


<div class="meta-api-description">
How to customize styles in Kendo UI Editor using its stylesheets property? Configure, enable, or set custom CSS stylesheets to inject and apply specific styling within the rich text editing area or contenteditable iframe, ensuring the editor content visually matches your application's design by controlling how text and elements are rendered inside the editing frame, especially when initializing from a textarea. Customize, override, or extend default editor styles dynamically by loading external or inline style rules, allowing seamless integration of proprietary themes, branding, or design systems in the editable content region without affecting the outer interface. This feature supports fine-tuning presentation, formatting consistency, and visual coherence for WYSIWYG content editing environments using embedded stylesheets.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      stylesheets: [
          "https://demos.telerik.com/kendo-ui/content/web/editor/editorStyles.css"
      ]
    });
    </script>

### tools `Array`

A collection of tools that are used to interact with the Editor.
Tools may be switched on by specifying their name.
Custom tools and tools that require configuration are defined as objects.
The tools property can be a matrix - array of arrays. When defined in this manner, the tools in each internal array are grouped together.

> The matrix approach (grouping of tools) works only with tools that are of type button. It does not work for the 'Font and color' tools.

The available editor commands are:

*   Basic text formatting
        - **bold**, **italic**, **underline**, **strikethrough**, **subscript**, **superscript**
*   Font and color
        - **fontName**, **fontSize**, **foreColor**, **backColor**
*   Alignment
        - **justifyLeft**, **justifyCenter**, **justifyRight**, **justifyFull**
*   Spacing
        - **lineHeight**
*   Lists
        - **insertUnorderedList**, **insertOrderedList**, **indent**, **outdent**
*   Links, images and files
        - **createLink**, **unlink**, **insertImage**, **insertFile**
*   Table editing
        - **tableWizard**, **createTable**, **addColumnLeft**, **addColumnRight**, **addRowAbove**, **addRowBelow**, **deleteRow**, **deleteColumn**
*   Structural markup and styles
        - **formatting**, **cleanFormatting**
*   Snippets
        - **insertHtml**
*   HTML code view
        - **viewHtml**
*   Print edited page
        - **print**
*   Export to PDF
        - **pdf**
*   Format painter
        - **copyFormat**, **applyFormat**
*   Formatting marks
        - **formattingMarks**


<div class="meta-api-description">
How do I customize the tools available in the Kendo UI Editor? Configure and customize the interactive editing tools available within the editor, controlling which commands like bold, italic, underline, font adjustments, color changes, alignment options, lists, indentation, links, image and file insertion, table creation and modification, formatting styles, HTML snippets, code view, printing, PDF export, format painting, and visibility of formatting marks are enabled or disabled. Enable or disable default editing features, add or define custom toolbar buttons, set tool availability and behavior, toggle structural markup controls, manage text styling functions, control list and spacing options, and adjust link and media insertion capabilities, providing full control over the editor’s command palette and user interaction elements.
</div>

#### Example - add built-in and custom buttons to the tools collection

    <textarea id="editor"></textarea>
    <script>
      $("#editor").kendoEditor({
        tools: [
          {
            name: "bold",
          },
          {
            name: "italic"
          },
          {
            name: "underline"
          },
          {
            name: "custom",
            template: '<button id="custom">Custom</button>'
          }
        ]
      });

      $("#custom").kendoButton({
        click: function() {
          console.log("custom hanler")
        }
      })
    </script>

#### Example - add grouped tools collection using multi array

    <textarea id="editor"></textarea>
    <script>
      $("#editor").kendoEditor({
        tools: [
          [
            "bold",
            "italic",
            "underline",
            "strikethrough"
          ],
          [
            "justifyLeft",
            "justifyCenter",
            "justifyRight",
            "justifyFull"
          ],
          [
            "insertUnorderedList",
            "insertOrderedList",
            "indent",
            "outdent"
          ],
        ]
      });
    </script>

#### Example - add an `insertHtml` dropdown tool for inserting snippets

	<textarea id="editor" rows="10" cols="30">
	    Put the cursor after this text and use the "Insert HTML" tool.
	</textarea>
    <script>
        $(document).ready(function() {
            $("#editor").kendoEditor({
                tools: [
                    { name: "insertHtml",
                      items: [
                          { text: "Signature", value: "<p>Regards,<br /> John Doe,<br /><a href='mailto:john.doe@example.com'>john.doe@example.com</a></p>" },
                          { text: "Kendo online demos", value: " <a href='//demos.telerik.com/kendo-ui'>Kendo online demos</a> " }
                      ]
                    }
                ]
            });
        });
    </script>

### tools.name `String`

When specifying a tool as an object, a tool name is required. **Please note that "undo" and "redo" are reserved tool names.**


<div class="meta-api-description">
How do I set a unique identifier for a custom editor toolbar tool in Kendo UI? Set or configure the unique identifier or key for a custom editor toolbar tool, enabling references, command bindings, event handling, and programmatic targeting within the editor interface; this required name ensures tools defined as objects can be addressed in code, integrated with functionalities like undo or redo commands (which use reserved names), and supports managing, enabling, disabling, or customizing specific toolbar actions through consistent naming conventions and identifiers.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        { name: "custom" }
      ]
    });
    </script>

### tools.tooltip `String`

The text which will be displayed when the end-user hovers the tool button with the mouse.


<div class="meta-api-description">
How do I add custom tooltips to toolbar buttons in a Kendo UI editor? Customize or configure hover text, mouseover hints, or tooltip labels for toolbar buttons or controls in an editor interface to enhance user guidance, improve icon recognition, and reveal brief help messages when users position the cursor over toolbar tools, enabling contextual assistance, quick explanations, or descriptive text that clarifies button functionality and supports discoverability across editor toolbars and interactive UI elements.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        { name: "bold", tooltip: "Bold the selected text" }
      ]
    });
    </script>

### tools.exec `Function`

The JavaScript function which will be executed when the end-user clicks the tool button.


<div class="meta-api-description">
How can I customize the action of specific tools in a Kendo UI Editor? Configure custom toolbar button actions by assigning JavaScript functions that execute whenever a user clicks a specific tool in the editor interface, enabling developers to run custom commands, manipulate content, apply formatting, trigger dialogs, or implement bespoke click behaviors within text editors. This functionality supports defining interactive tool behaviors, setting up event-driven code execution on tool button clicks, and customizing editor tool responses to user interactions through programmable callbacks or handlers.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        {
          name: "custom",
          exec: function(e) {
            var editor = this;
            // ...
          }
        }
      ]
    });
    </script>

### tools.items `Array`

For tools that display a list of items (fontName, fontSize, formatting), this option specifies the items in the shown list.


<div class="meta-api-description">
How can I customize the font options in Kendo UI Editor tools? Customize and control the selectable options for list-based editor tools such as font names, font sizes, and text formatting by configuring the dropdown menu entries, including setting or modifying the available choices, adjusting item labels, defining values, rearranging order, grouping related options, and supplying specific collections for styling controls. Users can set, customize, or update the list items that appear in font and formatting dropdowns to tailor the selection experience, manage option groups, override defaults, and precisely define which fonts, sizes, or format styles are available for rich text editing interfaces. This property supports configuring option sets for toolbar selectors, specifying choices shown in UI pickers, and enabling flexible control over editor tool dropdown contents.
</div>

#### Example - specify custom font families

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        {
          name: "fontName",
          items: [
            { text: "Arial/Verdana", value: "Arial,Verdana,sans-serif" }
          ]
        }
      ]
    });
    </script>

### tools.items.text `String`

The string that the popup item will show.


<div class="meta-api-description">
How to customize the text on editor tool items in Kendo UI? Control, configure, or customize the visible label, caption, or display text for popup tools, toolbar menus, and editor tool items by setting the string that appears on these UI elements, enabling you to specify tool names, menu item texts, button labels, or popup captions for better clarity, localization, or user guidance within the editor interface.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        {
          name: "fontName",
          items: [
            { text: "Default site font", value: "Arial,Verdana,sans-serif" },
            { text: "Monospaced font", value: "monospace" }
          ]
        }
      ]
    });
    </script>

### tools.items.value `String`

The value that will be applied by the tool when this item is selected.


<div class="meta-api-description">
How do I configure the value of a selected toolbar button in Kendo UI for jQuery Editor? Configure the specific content, command, or payload triggered by selecting a toolbar button in a text editor, enabling setting or controlling the inserted text, formatting markers, command parameters, or tool action arguments applied during editing. This setting defines the action, content insertion, or modification value assigned to toolbar options to customize editor behavior, control input commands, or specify output tokens linked to editor tool controls and their effects on document content.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        {
          name: "fontSize",
          items: [
            { text: "12px", value: "12px" },
            { text: "24px", value: "24px" }
          ]
        }
      ]
    });
    </script>

### tools.items.context `String`

Only applicable for the formatting tool. Specifies the context in which the option will be available.


<div class="meta-api-description">
How do I dynamically show/hide formatting tools in a Kendo UI editor based on user actions? Configure and control the visibility or availability of formatting options within an editor based on specific editing contexts or conditions, enabling dynamic display, enabling, disabling, showing, or hiding of text styling tools depending on user actions, selection states, content types, or environment settings during editing sessions, allowing granular control over when formatting controls appear or are accessible in rich text editors, content management systems, or WYSIWYG interfaces.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        {
          name: "formatting",
          items: [
            { text: "Title", value: "h1" },

            // will be shown only when selection is in H1
            { text: "Note", value: "span.note", context: "h1" }
          ]
        }
      ]
    });
    </script>

### tools.palette `String|Array` *(default: "websafe")*

Specifies the [color palette](/api/javascript/ui/colorpicker/configuration/palette) for "foreColor" and "backColor" tools. If you need to use the [color gradient](api/javascript/ui/colorgradient) view in the picker instead of the palette, set this value to null.


<div class="meta-api-description">
How to customize the color picker palette in Kendo UI Editor? Configure or customize the set of colors shown for text and background choices in the editor’s color picker, specifying which color swatches appear when selecting foreground or background colors, enabling control over available shades, predefined palettes, or disabling fixed swatches to show a gradient color spectrum instead, allowing adjustment of color options for styling text, backgrounds, or highlights with either specific color arrays or dynamic gradient views depending on design preference or user needs.
</div>

#### Example - "websafe" palette

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: [{
            name: "foreColor"
        }]
    });
    </script>

#### Example - list of colors

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: [{
            name: "backColor",
            palette: ["#f0d0c9", "#e2a293", "#d4735e", "#65281a"]
        }]
    });
    </script>

#### Example - use gradient

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: [{
            name: "backColor",
            palette: null
        }]
    });
    </script>

### tools.columns `Number`

Specifies the [colors columns](/api/javascript/ui/colorpicker/configuration/columns) for "foreColor" and "backColor" tools when list of colors are defined.


<div class="meta-api-description">
How do I customize the number of color swatches displayed in a Kendo UI editor's color selection tool? Configure and control the number and arrangement of color swatches or columns displayed in text or content editors’ color selection tools, including foreground and background color grids. Enable setting the layout, quantity, or organization of color blocks or palettes used in color pickers within editors, adjusting how many colors appear per row for easier selection and customization. Optimize the visual distribution and grid style of color choices in editing interfaces, managing how color lists are arranged for text formatting such as font colors and highlight backgrounds. Adjust columns in color tool palettes to enhance user interface color selection experiences, supporting customizable color grids for configuring both text foreground and background shades.
</div>

#### Example - specified columns of the colors

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: [{
            name: "foreColor",
            palette: ["#f0d0c9", "#e2a293", "#d4735e", "#65281a"],
            columns: 2
        }]
    });
    </script>

### tools.template `String|Function`

The kendo template that will be used for rendering the given tool.


<div class="meta-api-description">
How can I customize the appearance of toolbar buttons in Kendo UI Editor using a template? Configure and customize the rendering of toolbar buttons or tools within an editor interface by supplying custom markup templates, enabling the use of personalized HTML structures, icons, or dynamic content through template syntax. Control and set how each toolbar element appears and behaves by defining reusable template code, allowing developers to override default toolbar visuals, inject custom tool designs, modify tool appearance dynamically, and integrate tailored content or iconography in editor toolbars. Adjust tool presentation with flexible templating options to adapt the user interface according to specific styling or functional requirements.
</div>

#### Example using a simple string template

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        {
          name: "custom",
          template: "<button class='k-button'>Save draft</button>"
        }
      ]
    });
    </script>

The code below shows how to use a function template.

#### Example using a function template

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        {
          name: "custom",
          template: function() {
            return "<button class='k-button'>Save draft</button>"
          }
        }
      ]
    });
    </script>

### tools.ui `Object`

Apart from the built-in tools, the Editor fully exposes the [ToolBar.items API](/api/javascript/ui/toolbar/configuration/items). This way you can specify any custom tools in the widget using the components available in the ToolBar itself.

All tools must have their `name` specified. All custom tools with no name will have "custom" automatically assigned as their name. As a result only one of them will be placed in the Editor ToolBar.


<div class="meta-api-description">
How do I customize the toolbar in the Kendo UI Editor? Set up and customize the editor toolbar by adding, configuring, or reusing built-in and custom toolbar items such as buttons, dropdown menus, templates, and other controls through the available toolbar components API. Enable, configure, or extend the toolbar functionality by specifying individual tool names or integrating named and unnamed tools while ensuring proper identification to manage visibility and duplication in the editor interface. Adjust toolbar elements to include unique custom tools or reuse existing items, controlling layout, tool presence, and user interaction experience through flexible component addition and naming conventions.
</div>

#### Example - Custom tools via the ToolBar API

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
        {
            name: "text-btn",
            ui: {
                type: "button",
                text: "Button",
                showText: "always",
                icon: null
            }
        },
        {
            name: "toggle-btn",
            ui: {
                type: "button",
                text: "Toggle",
                togglable: true,
                icon: "cancel",
                showText: "always"
            }
        },
        {
            name: "split-btn",
            ui: {
                type: "splitButton",
                text: "SplitButton",
                showText: "always",
                icon: null,
                menuButtons: [{text: "Option 1"}, {text: "Option 2"}]
            }
        }
      ]
    });
    </script>

Note that all tools have their `showText` option set to `overflow` and their `icon` set to `gear`. If the default state does not cover your scenario requirements, you will need to override those options.

### imageBrowser `Object`

Configuration for image browser dialog.


<div class="meta-api-description">
How do I configure image upload endpoints in Kendo UI Editor? Configure and customize image browsing and management within the editor by setting options for image upload endpoints, transport methods, file paths, dialog behavior, file selection, upload handling, and user interface elements for browsing and selecting images in both initialization and runtime environments. This includes controlling how images are uploaded, accessed, displayed, and navigated, as well as specifying API URLs, request handling, and enabling or disabling features related to image management in the editing interface.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          read: "imagebrowser/read",
          destroy: "imagebrowser/destroy",
          create: "imagebrowser/createDirectory",
          uploadUrl: "imagebrowser/upload",
          thumbnailUrl: "imagebrowser/thumbnail",
          imageUrl: "/content/images/{0}",
        },
        path: "/myInitialPath/"
      }
    });
    </script>

### imageBrowser.fileTypes `String` *(default: "*.png,*.gif,*.jpg,*.jpeg")*

Defines the allowed file extensions.


<div class="meta-api-description">
How to restrict image file types in Kendo UI Editor using the `fileTypes` property? Control and customize which image file formats users can select or upload by specifying allowed file extensions, enabling filtering that restricts image types based on extensions such as JPG, PNG, GIF, or custom formats; configure accepted image uploads, limit valid file types, enforce extension-based selection in the image browser, set permitted media formats to ensure only specific image files appear or are accepted during content editing, and manage file format validation during image browsing and upload processes within the editor environment.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        /* omitted for brevity */
        fileTypes: "*.gif"
      }
    });
    </script>

### imageBrowser.path `String` *(default: "/")*

Defines the initial folder to display, relative to the root.


<div class="meta-api-description">
How do I set the default folder for image selection in the Kendo UI Editor's image browser? Configure the starting directory or default folder that the image browsing tool opens to within the editor, enabling control over which subfolder of the root directory is initially displayed when accessing images; set or specify the initial image folder path, configure default image directory, define the base folder for image selection, point to a particular subfolder, adjust image file navigation starting location, and establish folder context for image browsing upon editor launch.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        /* omitted for brevity */
        path: "/uploads/"
      }
    });
    </script>

### imageBrowser.transport `Object`

Specifies the settings for loading and saving data.


<div class="meta-api-description">
How to configure transport options for image browsing in Kendo UI Editor? Configure how image browsing in the editor handles loading, uploading, saving, and deleting files by setting transport options like server endpoints, HTTP methods, headers, authentication, and parameter mapping. Enable control over file management operations within the image browser, define custom upload URLs, configure API request options, specify read and write paths, manage headers for authorization or content type, and customize how images are retrieved or removed through RESTful calls or other protocols. Set up image loading and saving workflows, adjust network requests for image CRUD actions, and manage server communication aspects related to image file handling in the editor interface.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["insertImage"],
        imageBrowser: {
            transport: {
                read: "/imagebrowser/read",
                uploadUrl: "/imagebrowser/upload",
                imageUrl: "/imagebrowser/image"
            }
        }
    });
    </script>

### imageBrowser.transport.read `Object|String|Function`

Options or URL for remote image retrieval.

> **Important:** The value of `transport.read` is passed to [jQuery.ajax](https://api.jquery.com/jQuery.ajax).


<div class="meta-api-description">
How do I configure the image transport in Kendo UI Editor to fetch images from a remote server using GET requests? Configure how images are retrieved from remote servers in an image browser, including setting the URL for fetching images, customizing HTTP methods like GET or POST, adding custom headers for authentication or content type, specifying query parameters to filter or paginate image results, controlling AJAX request options such as timeouts or data formats, enabling integration with RESTful APIs or backend services, adjusting transport settings for image loading, and fine-tuning network requests to optimize performance and security when fetching image data dynamically from external endpoints.
</div>

#### Example - specify a read URL

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          read: "/imagebrowser/read"
        }
      }
    });
    </script>

#### Example - specify read as a function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          read: function(options) {
              // query async service, then call options.success or options.error
              options.success([
                { "name": "foo", "type": "d" },
                { "name": "bar.png", "type": "f", "size": 15289 }
              ]);
          }
        }
      }
    });
    </script>

### imageBrowser.transport.read.contentType `String` *(default: "application/x-www-form-urlencoded")*

The content-type HTTP header sent to the server. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
What is the default Content-Type header sent in the request for reading images using Kendo UI Editor's image browser? Control and configure the HTTP request Content-Type header sent during image browsing or reading operations in an editor, enabling specification of MIME types such as application/json, text/xml, or multipart/form-data to ensure correct data format handling by the server; adjust and set request headers for read operations to match expected payload formats, customize data transmission for API calls, control serialization type for image retrieval, and manage content negotiation and protocol compliance when fetching image resources or data from remote endpoints.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          read: {
            /* omitted for brevity */
            contentType: "application/json"
          }
        }
      }
    });
    </script>

### imageBrowser.transport.read.data `Object|String|Function`

Data to be send to the server.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
How to customize the data sent in Kendo UI Editor image browser read requests? Configure or customize the data payload sent during image browser read requests by setting additional parameters, static or dynamically computed, to control what information is transmitted to the server when fetching images. Enable passing custom query data, filters, or request parameters with flexible formats compatible with AJAX calls, adjusting request payloads for server-side processing, serialization control, and API integration during image retrieval. Support modifying or extending the read request data to tailor server responses, enhance filtering, or implement authorization and contextual information within image browsing features.
</div>

#### Example - specify Data As Object

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          read: {
            data: {
              id: 42,
              name: "John Doe"
            }
          }
        }
      }
    });
    </script>

#### Example - specify Data As Function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          read: {
            data: function() {
              return { id: 42, name: "John Doe" };
            }
          }
        }
      }
    });
    </script>

### imageBrowser.transport.read.dataType `String`

The type of data that you're expecting back from the server. Commonly used values are `"json"` and `"jsonp"`.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
How do I configure the data type for server responses in a Kendo UI Editor's image browser? Specify or customize the expected format for server responses when fetching images in an editor's image browser, including options like JSON, JSONP, or other data types to control parsing and interpretation of read transport results, enabling configuration of data handling, response formats, AJAX response parsing, and how the component processes remote image data during fetching or browsing operations.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          read: {
            dataType: "json"
          }
        }
      }
    });
    </script>

### imageBrowser.transport.read.type `String`

The type of request to make (`"POST"`, `"GET`", `"PUT"` or `"DELETE"`), default is "POST".
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
How do I set the HTTP method for reading images in Kendo UI Editor's image browser? Configure the HTTP method for retrieving images in the editor’s image browser by specifying the request type such as POST, GET, PUT, or DELETE, enabling control over how image data is fetched, queried, loaded, or accessed during read operations, with options to switch the transport method for server communication and API calls to suit different backend or integration requirements.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          read: {
            type: "POST"
          }
        }
      }
    });
    </script>


### imageBrowser.transport.read.url `String|Function`

The remote url to call when fetching list of items.


<div class="meta-api-description">
How do I configure the URL endpoint for fetching image browser content in Kendo UI Editor? Configure the URL endpoint to fetch or load image browser content from a remote server, specify where the editor requests image lists or media files, define the server address for retrieving image resources, set up the source URL for loading images in the editor’s browsing interface, control the remote API path that delivers image data for display, enable dynamic loading of images by connecting the image browser to a backend service URL, manage the URL used by the editor to access and list available image assets from a server, specify the path for image retrieval calls, integrate server-hosted images by directing editor requests to a specific endpoint, and customize the location from which the editor fetches image browser items in real time.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          read: {
            url: "/read"
          }
        }
      }
    });
    </script>

#### Example - specify Read URL As Function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          read: {
            url: function(params) {
              // build url
              return "/read?t=" + new Date().getTime();
            }
          }
        }
      }
    });
    </script>

### imageBrowser.transport.thumbnailUrl `String|Function`

The URL for retrieving the thumbnail version of the image. If not specified a default image icon will be shown.
If function is assigned, the current path and image name will be provided.


<div class="meta-api-description">
How to customize thumbnail preview in Kendo UI Editor image browser? Configure or set the thumbnail URL or function for image previews in the editor’s image browser, enabling control over how preview thumbnails are retrieved or displayed using a string path or dynamic function that accepts the image path and name; this setting supports customization of thumbnail sources, overrides default icons, and facilitates flexible preview generation depending on image location or naming, suitable for use cases involving custom image hosting, dynamic thumbnail creation, or fallback management when displaying image lists.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          thumbnailUrl: "/thumbnail"
        }
      }
    });
    </script>

#### Example - thumbnailUrl as a function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          thumbnailUrl: function(path, file) {
            return "/thumbnail?path=" + path + file;
          }
        }
      }
    });
    </script>

### imageBrowser.transport.uploadUrl `String`

The URL which will handle the upload of the new images. If not specified the Upload button will not be displayed.

The requirements for this handler are the same as for the [save handler](/web/upload/modes#save-handler) in the Upload widget.


<div class="meta-api-description">
How do I set the upload URL for image files in Kendo UI Editor's image browser? Configure the server endpoint URL to handle image file uploads directly from the editor's image browser, enabling users to upload new images via a designated upload service or API. Set or customize the upload destination URL to control where images are sent when using the upload button within the image selection interface, supporting scenarios for integrating file upload endpoints, REST APIs, or cloud storage services. Enable or disable image upload functionality by specifying a valid upload URL, ensuring that the backend endpoint processes multipart file submissions or compatible HTTP requests for saving new images from the editor interface. This setup supports developers seeking to connect image uploads seamlessly within their editor environment, with options for configuring server upload handlers and controlling upload workflows through the image browser UI.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          uploadUrl: "/thumbnail"
        }
      }
    });
    </script>

### imageBrowser.transport.imageUrl `String|Function`

The URL responsible for serving the original image. A file name placeholder should be specified. By default the placeholder value is URL encoded. If this is not desired, use a function.


<div class="meta-api-description">
How do I configure the image browser to fetch images from a custom URL in Kendo UI Editor? Configure the source URL or endpoint used to fetch original images in the image browser, enabling dynamic or static paths with support for file name placeholders, customizable encoding options, and programmable URL generation to control how image files are requested and loaded from the server or CDN, including scenarios requiring raw file names, custom string manipulation, or function-based URL construction for precise retrieval of images within interactive editors or content management tools.
</div>

#### Example - imageUrl as String

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          imageUrl: "/content/images/{0}" //the placeholder will be replaced with the current virtual path and selected file name
        }
      }
    });
    </script>

#### Example - imageUrl as Function (can be used to avoid automatic URL encoding)

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          imageUrl: function (e) {
            return "/content/images/" + e;
          }
        }
      }
    });
    </script>

### imageBrowser.transport.destroy `Object|String`

Options or URL which will handle the file and directory deletion. If not specified the delete button will not be present.

> **Important:** The value of `transport.destroy` is passed to [jQuery.ajax](https://api.jquery.com/jQuery.ajax).


<div class="meta-api-description">
How to configure delete operation transport settings in Kendo UI Editor image browser? Control how file and folder deletion requests are sent to the server by configuring server-side remove operations, set up the delete URL endpoint or provide options for handling file and directory removal actions, enable or disable the delete feature in file browsers, customize the AJAX request parameters for deleting files and folders remotely, manage backend removal via HTTP calls, specify transport settings for delete operations in image or asset managers, configure file system cleanup through HTTP requests, control deletion behavior in editor file explorers, set up server communication for delete commands, and handle deletion via customizable transport settings passed to AJAX calls.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          destroy: "/destroy"
        }
      }
    });
    </script>

### imageBrowser.transport.destroy.contentType `String`

The content-type HTTP header sent to the server. Default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
How to set HTTP Content-Type header for image browser destroy requests in Kendo UI Editor? Configure or specify the HTTP Content-Type header for delete or destroy requests sent by the image browser to the server, controlling the MIME type such as "application/x-www-form-urlencoded" or "application/json" depending on whether the request payload is URL-encoded form data or JSON; adjust, set, or override this header to match server expectations for content format in HTTP DELETE operations, enabling proper handling of data when removing images or resources via the editor’s browser interface.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          destroy: {
            contentType: "application/json"
          }
        }
      }
    });
    </script>

### imageBrowser.transport.destroy.data `Object|String|Function`

Data to be send to the server.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
How do I customize the data sent to the server when deleting an image in Kendo UI Editor's image browser? Configure the parameters or payload sent to the server during image deletion requests within the editor’s image browser, enabling customization of data as objects, strings, or dynamically returned values via functions for AJAX calls. Control or customize the information transmitted when deleting images, specifying request payloads, parameters, or data formats to tailor server interaction during destroy operations. Set or modify the content sent with image removal requests, supporting flexible data definitions to manage backend communication during delete actions. Adjust or define the data sent to the server on image delete commands from the editor, accommodating static or dynamic data inputs for HTTP requests related to image destruction.
</div>

#### Example - specify Data As Object

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          destroy: {
            data: {
              id: 42,
              name: "John Doe"
            }
          }
        }
      }
    });
    </script>

#### Example - specify Data As Function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          destroy: {
            data: function() {
              return {
                id: 42,
                name: "John Doe"
              };
            }
          }
        }
      }
    });
    </script>

### imageBrowser.transport.destroy.dataType `String`

The type of data that you're expecting back from the server. Commonly used values are `"json"` and `"jsonp"`.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
What is the default dataType for destroying image uploads in Kendo UI Editor's image browser transport? Set or configure the expected format of the server response when deleting images through an image browsing interface, specifying how the returned data is parsed and interpreted, such as JSON or JSONP, to ensure correct handling of deletion acknowledgments, customize response processing, control response parsing behavior for AJAX calls related to image removal, enable compatibility with various server response types, and adjust or define data formats received after image delete operations.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          destroy: {
            dataType: "json"
          }
        }
      }
    });
    </script>

### imageBrowser.transport.destroy.type `String`

The type of request to make (`"POST"`, `"GET`", `"PUT"` or `"DELETE"`), default is "POST".
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
How do I configure the HTTP method for deleting images in Kendo UI Editor's image browser? Configure or control the HTTP method used for deleting images through the editor’s image browser, specifying the AJAX request verb such as POST, GET, PUT, or DELETE to handle destroy or remove operations in RESTful or CRUD APIs. Enable setting or changing the request type for image deletion calls, customizing how the frontend interacts with backend endpoints when removing files, and managing transport methods for server communication during image cleanup tasks. Adjust the HTTP action for the destroy request to fit API requirements, ensuring compatibility with different server configurations or REST routes for deleting resources via AJAX.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          destroy: {
            type: "POST"
          }
        }
      }
    });
    </script>

### imageBrowser.transport.destroy.url `String|Function`

The remote url to call when creating a new record.


<div class="meta-api-description">
How do I configure the URL for deleting image browser items in Kendo UI Editor? Configure the endpoint URL for sending requests to create or remove image browser items, set or control the API route used by the editor to manage image resource creation and deletion, specify the remote service URL to handle image item lifecycle operations, enable connection to backend or cloud storage for uploading, deleting, or managing images within the editor’s image browser interface, set the transport URL for synchronizing image additions or removals with a server or database.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          destroy: {
            url: "/destroy"
          }
        }
      }
    });
    </script>

#### Example - specify Destroy URL As Function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          destroy: {
            url: function(params) {
              // build url
              return "/destroy?t=" + new Date().getTime();
            }
          }
        }
      }
    });
    </script>

### imageBrowser.transport.create `Object|String`

Options or URL which will handle the directory creation. If not specified that create new folder button will not be present.

> **Important:** The value of `transport.create` is passed to [jQuery.ajax](https://api.jquery.com/jQuery.ajax).


<div class="meta-api-description">
How to enable "Create New Folder" functionality in Kendo UI image browser? Configure remote folder creation for the image browser by setting a URL endpoint or AJAX options to enable the "Create New Folder" feature, allowing control over HTTP methods, headers, data payloads, and content types for server requests that handle directory creation; this setup supports RESTful APIs and custom server-side folder management, and without specifying these parameters, folder creation functionality and related UI buttons remain disabled.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          create: "/create"
        }
      }
    });
    </script>

### imageBrowser.transport.create.contentType `String`

The content-type HTTP header sent to the server. Default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
How do I set the content type for image uploads in Kendo UI Editor's image browser? Configure the content type header for upload requests to control how the server processes image uploads in the editor, enabling you to specify formats like application/json or application/x-www-form-urlencoded, set custom HTTP Content-Type values for create actions, adjust payload formatting for server compatibility, override default headers in AJAX transport to match API expectations, and ensure proper interpretation of image data during file upload operations within the editor’s image browser functionality.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          create: {
            contentType: "application/json"
          }
        }
      }
    });
    </script>

### imageBrowser.transport.create.data `Object|String|Function`

Data to be send to the server.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
How to configure data sent to server when creating image in Kendo UI editor? Configure the payload or parameters sent to the server during the creation process within an image upload or management feature, enabling customization of the data submitted via AJAX requests; control, set, or supply any relevant information, form fields, metadata, or custom key-value pairs that need to be included in the network call responsible for creating new images, with flexibility to match any data structures or formats supported by jQuery AJAX calls or equivalent HTTP request configurations in image handling workflows.
</div>

#### Example - specify data as object

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          create: {
            data: {
              id: 42,
              name: "John Doe"
            }
          }
        }
      }
    });
    </script>

#### Example - specify data as function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          create: {
            data: function() {
              return {
                id: 42,
                name: "John Doe"
              };
            }
          }
        }
      }
    });
    </script>

### imageBrowser.transport.create.dataType `String`

The type of data that you're expecting back from the server. Commonly used values are `"json"` and `"jsonp"`.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
How do I configure the dataType for image upload requests in Kendo UI Editor's transport? Configure or set the server response format for image upload requests, specifying how to parse and handle the returned data from the server when creating images in an editor interface; support response types like JSON, JSONP, or other AJAX-compatible formats to ensure proper communication and integration with backend APIs, enabling control over serialization, deserialization, data exchange, and handling cross-domain requests during image creation or upload processes within the editor's image browser transport.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          create: {
            dataType: "json"
          }
        }
      }
    });
    </script>

### imageBrowser.transport.create.type `String`

The type of request to make (`"POST"`, `"GET`", `"PUT"` or `"DELETE"`), default is "POST".
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
How to configure the HTTP method for creating images in Kendo UI Editor's file management system? configure or specify the HTTP method for creating resources during image upload or creation in the editor’s file management system, enabling selection between common request types like POST, GET, PUT, or DELETE to control how data is sent to the server when adding new images, defining the communication verb used in the create operation to suit RESTful API requirements or specific backend configurations for image handling and storage within the editor interface, adjusting the method used to initiate image creation requests to ensure compatibility with different server endpoints and integration patterns.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          create: {
            type: "POST"
          }
        }
      }
    });
    </script>

### imageBrowser.transport.create.url `String|Function`

The remote url to call when creating a new record.


<div class="meta-api-description">
How do I configure the Kendo UI Editor to upload images remotely via a specific URL? Configure the remote server URL or endpoint used by the image management tool to send requests for creating new image records, including setting the HTTP POST target for uploading or registering images via RESTful APIs, web services, or AJAX calls, enabling integration with backend systems to add images through the editor's browsing interface, specifying where the system should send create commands to store or register image metadata or files on the server side.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          create: {
            url: "/create"
          }
        }
      }
    });
    </script>

#### Example - specify create url as function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        transport: {
          create: {
            url: function(params) {
              // build url
              return "/create?t=" + new Date().getTime();
            }
          }
        }
      }
    });
    </script>


### imageBrowser.schema `Object`

Set the object responsible for describing the image raw data format.


<div class="meta-api-description">
How do I configure the image browser schema in Kendo UI Editor to handle different image metadata fields? Control how the image browser processes and interprets image data by defining parsing rules, schema configurations, and field mappings that handle image URLs, names, sizes, thumbnails, metadata, and total counts, enabling consistent reading, binding, and normalization of server or local image responses; supports configuring data structures, custom parsers, models, and response formats to adapt to various remote APIs or storage formats, simplifying how image assets are fetched, mapped, and displayed within the editor interface.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["insertImage"],
        imageBrowser: {
            transport: {
                read: "/imagebrowser/read"
            },
            schema: {
                type: "json",
                data: "data"
            }
        }
    });
    </script>

### imageBrowser.schema.model `Object`

Set the object which describes the image/directory entry fields. Note that a name, type and size fields should be set.


<div class="meta-api-description">
How do I configure the image browser schema in Kendo UI for jQuery? Configure or customize how image files and directories are represented by setting a data schema that defines field names, data types, and attributes like name, type, and size for each entry; this enables precise mapping, structuring, and interpretation of image browser content, supports handling metadata for images and folders, controls how image entries are modeled for retrieval and display, and allows developers to define or adjust the schema to suit different storage formats or integration requirements when initializing or configuring the image browsing component.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["insertImage"],
        imageBrowser: {
            schema: {
                model: {
                    id: "name",
                    fields: {
                        name: { field: "Name" },
                        type: { field: "Type" },
                        size: { field: "Size" }
                    }
                }
            }
        }
    });
    </script>

### imageBrowser.schema.model.id `String`

The name of the field which acts as an identifier.


<div class="meta-api-description">
What is the property used to identify individual image files in Kendo UI Editor's image browser? Specify or configure the unique identifier field name used to distinguish individual image files within an image browser or editor interface, enabling recognition, matching, update, or synchronization of images during loading, binding, CRUD operations, or data management in image browsing contexts. This identifier helps control how images are tracked, differentiated, or referenced when displaying, editing, or manipulating image assets programmatically or through UI components, ensuring consistent mapping and stable references for file selection, replacement, or updates within the image browser environment.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["insertImage"],
        imageBrowser: {
            schema: {
                model: {
                    id: "name"
                }
            }
        }
    });
    </script>

### imageBrowser.schema.model.fields `Object`

Defines the field mappings for the image browser data model. This configuration specifies which fields in the server response contain the name, type, and size information for files and directories. The fields object allows you to map the server data structure to the expected properties that the image browser uses to display and manage files. Each field can be configured as either a string (field name) or an object with additional parsing options.


<div class="meta-api-description">
How do I map server-side file attributes to the Kendo UI image browser data model using the "fields" property? Configure how file metadata from the server maps to the image browser’s data model by specifying which data properties represent file name, type, size, and folder path. This mapping lets you control how server-side file attributes are interpreted and displayed in the image browser, enabling customization of data structure alignment, field name overrides, and parsing options to ensure proper handling of files and directories. Set or customize data bindings to match your backend response format for seamless integration, allowing the editor to accurately identify, show, and organize images and folders based on server-provided metadata fields or paths. Adjust field mappings flexibly with strings or detailed objects to handle different API responses, file information schemas, and folder hierarchies when enabling browsing, managing, or rendering image files in the editor interface.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["insertImage"],
        imageBrowser: {
            schema: {
                model: {
                    fields: {
                        name: "Name",
                        type: "Type",
                        size: "Size"
                    }
                }
            }
        }
    });
    </script>

### imageBrowser.schema.model.fields.name `Object|String`

The field which contains the name of the image/directory


<div class="meta-api-description">
How to configure the display name for images and folders in Kendo UI Editor's image browser? Configure the field that controls the display name or label of images and folders within the image browsing interface by specifying which model attribute holds the filenames or directory titles; this setting enables customizing or renaming file and folder names shown in the browser by linking to the relevant string field in the data model, allowing control over the visible names users see for images and directories during browsing or editing.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["insertImage"],
        imageBrowser: {
            schema: {
                model: {
                    fields: {
                        name: { field: "FileName" }
                    }
                }
            }
        }
    });
    </script>

### imageBrowser.schema.model.fields.name.field `String`

The name of the field.


<div class="meta-api-description">
How do I specify the field that contains the file name in my image data model for Kendo UI Editor? Specify or configure the data field, key, or property that contains the file name within the image data model for use in an image browser or editor component, enabling control over which attribute holds the file name for image items, allowing developers to set, map, or define the exact field name that stores image filenames in their data schema or model mapping for image browsing, loading, or display purposes.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["insertImage"],
        imageBrowser: {
            schema: {
                model: {
                    fields: {
                        name: { field: "FileName" }
                    }
                }
            }
        }
    });
    </script>

### imageBrowser.schema.model.fields.name.parse `Function`

Specifies the function which will parse the field value. If not set default parsers will be used.


<div class="meta-api-description">
How to customize image file name parsing in Kendo UI Editor's schema model? Customize or configure a parsing function to convert, normalize, interpret, or transform raw input values for image file names within the image browsing model used in editor components. This enables controlling how names are read, processed, or handled inside the schema's model fields, allowing developers to define custom logic for extracting, cleaning, validating, or standardizing image metadata or identifiers during initialization or setup. The functionality supports overriding default parsing behavior, adapting to various naming conventions, formats, or use cases where image resource names need specific treatment before further processing or display.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["insertImage"],
        imageBrowser: {
            schema: {
                model: {
                    fields: {
                        name: { 
                            field: "FileName",
                            parse: function(value) {
                                return value.toString();
                            }
                        }
                    }
                }
            }
        }
    });
    </script>

### imageBrowser.schema.model.fields.type `Object|String`

The field which contains the type of the entry. Either *f* for image or *d* for directory.


<div class="meta-api-description">
How do I configure the item type in Kendo UI Editor's image browser schema to differentiate between image files and directories? Control and define the classification of items within an image browsing interface by specifying whether each entry is an image file or a directory through a type indicator in the data schema; set or configure the item type to differentiate files from folders, enabling filtering, rendering, binding, and organizing content based on whether the element represents an image or a folder, allowing developers to manage image versus directory handling effectively in their applications.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["insertImage"],
        imageBrowser: {
            schema: {
                model: {
                    fields: {
                        type: { field: "Type" }
                    }
                }
            }
        }
    });
    </script>

### imageBrowser.schema.model.fields.type.parse `Function`

Specifies the function which will parse the field value. If not set default parsers will be used.


<div class="meta-api-description">
How to customize data parsing for image browser fields in Kendo UI Editor? Customize or configure how image browser data fields are transformed or converted when loading or binding data by providing a custom parsing function to handle deserialization, type coercion, value transformation, or field interpretation within the editor’s image model schema. Control the conversion process of loaded image-related model values, override default parsing behavior, define how raw data is interpreted or cast into specific types, and enable tailored processing of model fields to ensure accurate data representation after loading or during data binding workflows. This is useful for developers needing to customize data parsing strategies for image browser fields, manipulate field values, handle complex types, or implement specialized deserialization logic in the model layer.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["insertImage"],
        imageBrowser: {
            schema: {
                model: {
                    fields: {
                        type: { 
                            field: "Type",
                            parse: function(value) {
                                return value === "directory" ? "d" : "f";
                            }
                        }
                    }
                }
            }
        }
    });
    </script>

### imageBrowser.schema.model.fields.type.field `String`

The name of the field.


<div class="meta-api-description">
How do I configure the image type field in Kendo UI Editor's schema model? Configure the mapping of image metadata by specifying the exact field name representing the image type in your data model, enabling correct binding of image type information within the editor's image browser schema. Control and set the property that identifies or labels the type classification of images from server responses or local datasets, ensuring accurate recognition and handling of image formats, categories, or types in image browsing and selection features. Enable precise designation of the field storing image type values to align editor interface behavior with backend data structures, supporting use cases involving image metadata integration, schema customization, and dynamic data field mapping for type attributes in image management workflows.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["insertImage"],
        imageBrowser: {
            schema: {
                model: {
                    fields: {
                        type: { field: "EntryType" }
                    }
                }
            }
        }
    });
    </script>

### imageBrowser.schema.model.fields.size `Object|String`

The field which contains the size of image.


<div class="meta-api-description">
How do I configure the size attribute in Kendo UI's image browser to display file dimensions or storage size? Configure image file size attributes, map and manage numeric values representing image dimensions or storage size in bytes, control how file size metadata is displayed, enable sorting or filtering based on picture size, handle file size information for uploads or data processing, detect and use image size statistics for organizing or managing image collections, support file size validation, display image weight details in file browsers, and integrate server-returned or data-included size parameters to optimize image handling and user interface interactions involving image dimension or storage metrics.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["insertImage"],
        imageBrowser: {
            schema: {
                model: {
                    fields: {
                        size: { field: "Size" }
                    }
                }
            }
        }
    });
    </script>

### imageBrowser.schema.model.fields.size.field `String`

The name of the field.


<div class="meta-api-description">
What is the field name for image size in Kendo UI Editor's image browser schema model? Configure the field name that represents the image file size within the data model used by the image browser, enabling the system to recognize, bind, and display image size information accurately when fetching or updating images; set or customize this identifier to match the exact key from the data source or server response, ensuring proper loading, metadata access, and image size tracking within the editor environment.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["insertImage"],
        imageBrowser: {
            schema: {
                model: {
                    fields: {
                        size: { field: "FileSize" }
                    }
                }
            }
        }
    });
    </script>

### imageBrowser.schema.model.fields.size.parse `Function`

Specifies the function which will parse the field value. If not set default parsers will be used.


<div class="meta-api-description">
How to customize file size parsing in Kendo UI Editor's image browser? Control and customize the parsing, interpretation, and transformation of file size attributes within image browsing or uploading workflows by defining a specific function to handle size values, enabling precise adjustment of how size information is read, converted, or processed before storage or display, supporting custom formats, unit conversions, error handling, and integration with different data models or schemas, and allowing overrides of default parsing behavior to tailor size handling in image management and editor environments.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["insertImage"],
        imageBrowser: {
            schema: {
                model: {
                    fields: {
                        size: { 
                            field: "FileSize",
                            parse: function(value) {
                                return parseInt(value);
                            }
                        }
                    }
                }
            }
        }
    });
    </script>

### imageBrowser.messages `Object`

Defines texts shown within the image browser.


<div class="meta-api-description">
How do I customize the image browsing interface in Kendo UI Editor with localized messages? Customize, localize, and configure the text, labels, buttons, prompts, notifications, and error messages within the image browsing interface of the editor, enabling control over language translations, user interface wording, button captions, alert messages, and interface feedback for image selection and management, including adjusting display text for errors, confirmations, and navigation elements to tailor the image browser experience in diverse localization and internationalization scenarios.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["insertImage"],
        imageBrowser: {
            messages: {
                uploadFile: "Upload Image",
                orderBy: "Sort by",
                orderByName: "Name",
                orderBySize: "Size"
            }
        }
    });
    </script>

### imageBrowser.messages.uploadFile `String` *(default: "Upload")*

Defines text for upload button.


<div class="meta-api-description">
How to customize the upload file button text in Kendo UI Editor's image browser? Customize or change the text label for the image upload button within the editor’s image browser, configure the displayed wording for uploading files, set or localize the button caption that triggers file upload in the image manager, control or translate the upload file prompt label in the image selection interface, and adjust the terminology shown on the interface element responsible for uploading images to match different languages or custom phrasing preferences.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        messages: {
          uploadFile: "Upload a file"
        }
      }
    });
    </script>

### imageBrowser.messages.orderBy `String` *(default: "Arrange by")*

Defines text for order by label.


<div class="meta-api-description">
How can I customize the "Order by" label in Kendo UI Editor's image browser? Customize or set the label text for the sorting option in the image browser interface, control or change the "Order by" prompt displayed when browsing or filtering images, modify the text that indicates how images are sorted or arranged, update the sorting criteria label shown in the editor’s image selection panel, configure or enable custom wording for the order or sort descriptor used in the image browser view.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        messages: {
          orderBy: "Order by"
        }
      }
    });
    </script>

### imageBrowser.messages.orderByName `String` *(default: "Name")*

Defines text for Name item of order by drop down list.


<div class="meta-api-description">
How can I customize the sorting option for images by file name in Kendo UI Editor's image browser? Customize or configure the text label, prompt, or display message for sorting images by file name within an image browsing or file selection interface, including adjusting the visible wording, changing the ordering option description, setting the name-based sort label, controlling the caption or tooltip for ordering images alphabetically, and managing how the "Name" sorting criterion is presented to users in image selection or file management contexts.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        messages: {
          orderByName: "Filename"
        }
      }
    });
    </script>

### imageBrowser.messages.orderBySize `String` *(default: "Size")*

Defines text for Size item of order by drop down list.


<div class="meta-api-description">
How do I customize the file size sorting option label in Kendo UI Editor's image browser? Customize or configure the display name, text label, or localized caption for the file size sorting option in the image browser’s order or sort dropdown menu, enabling control over how size-based ordering choices are presented in different languages or regions within an editor interface.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        messages: {
          orderBySize: "File size"
        }
      }
    });
    </script>

### imageBrowser.messages.directoryNotFound `String` *(default: "A directory with this name was not found.")*

Defines text for dialog shown when the directory not found error occurs.


<div class="meta-api-description">
How do I customize the "directory not found" error message in Kendo UI editor's image browser? Customize, configure, or set the error message, notification, alert, or warning displayed when an image folder, directory, or path is missing, not found, unavailable, or inaccessible in an editor’s image browser or media library. Control localization, language, or translation for the "directory not found" prompt, message text, popup, or feedback shown to users when browsing images or uploading files encounters a nonexistent or deleted directory path, helping improve user experience, error handling, and interface messaging in multilingual or localized environments.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        messages: {
          directoryNotFound: "Directory not found!"
        }
      }
    });
    </script>

### imageBrowser.messages.emptyFolder `String` *(default: "Empty Folder")*

Defines text displayed when folder does not contain items.


<div class="meta-api-description">
How to customize the message when an image browser folder is empty in Kendo UI Editor? Customize or configure the message displayed when an image browser or media folder contains no files or empty content, enabling control over empty state notifications, placeholders, or user prompts in file explorers, media managers, or image galleries within editors to improve user feedback, clarify empty directories, and guide users during browsing or uploading processes.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        messages: {
          emptyFolder: "Folder is empty"
        }
      }
    });
    </script>

### imageBrowser.messages.deleteFile `String` *(default: "Are you sure you want to delete {0}?")*

Defines text for dialog shown when the file or directory is deleted.


<div class="meta-api-description">
How do I customize the delete confirmation prompt in Kendo UI Editor's image browser? Set or customize the confirmation prompt, alert message, or notification text shown when deleting images, files, or folders in an editor’s image browsing or file management interface, including localization, translation, error handling, user prompts for file removal, delete confirmations, and dialogue messages associated with removing files or directories from a media library or asset manager.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        messages: {
          deleteFile: "Are you sure? This action cannot be undone."
        }
      }
    });
    </script>

### imageBrowser.messages.invalidFileType `String` *(default: "The selected file '{0}' is not valid. Supported file types are {1}.")*

Defines text for dialog shown when an invalid file is set for upload.


<div class="meta-api-description">
How to customize the error message when uploading an invalid file type in Kendo UI Editor? Customize or configure the error notification, alert, or warning text displayed when uploading or selecting unsupported, disallowed, or invalid image file formats in an editor’s picture or media browser interface. Control, set, or change the localized language message, prompt, or feedback that appears whenever users try to add images with file types that are blocked, incorrect, unrecognized, or not permitted by the image upload or file selection system. Adjust the invalid file type error wording, customize the file validation response, and localize user-facing messages related to image file compatibility and format restrictions during image browsing or media selection workflows.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        messages: {
          invalidFileType: "Supported file types are {1}. Please retry your upload."
        }
      }
    });
    </script>

### imageBrowser.messages.overwriteFile `String` *(default: "A file with name '{0}' already exists in the current directory. Do you want to overwrite it?")*

Defines text for dialog shown when an already existing file is set for upload.


<div class="meta-api-description">
How to customize the message when uploading an image that already exists in Kendo UI Editor? Control and customize the notification, alert, or prompt message displayed when uploading an image or file that has the same name as an existing one, including how to display warnings, confirmations, or overwrite prompts during file conflicts in the image browser or media uploader, enabling tailored user feedback for duplicate file uploads, collision handling, or overwrite decisions in content management or editor interfaces.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        messages: {
          overwriteFile: "Do you want to overwrite the file with name '{0}'?"
        }
      }
    });
    </script>

### imageBrowser.messages.search `String` *(default: "Search")*

Defines text for search box placeholder.


<div class="meta-api-description">
How to change the default message in Kendo UI Editor image browser search input? Customize or configure the placeholder text, prompt, hint, or default message displayed in the image browser search input, enabling localization, internationalization, or personalized search box labels to guide users when searching or filtering images within the editor’s image browsing interface.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      imageBrowser: {
        messages: {
          search: "Find"
        }
      }
    });
    </script>

### fileBrowser `Object`

Configuration for file browser dialog.


<div class="meta-api-description">
How to customize the file browsing experience in Kendo UI Editor? Control and customize the file browsing experience within the editor, including how dialogs open, how users navigate directories, select files, and upload content, while managing server communication endpoints. Adjust upload processes, define allowed file types and filters, set path navigation rules, customize dialog templates, and configure messages or prompts. Enable integration of file selection and upload workflows with backend services, supporting various transport protocols and seamless interaction for file management tasks. Configure browsing behavior, file filtering, upload settings, and server endpoints to tailor the file browser’s UX and data flow to your application’s needs.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          read: "https://demos.telerik.com/service/v2/core/FileBrowser/read",
          destroy: {
              url: "https://demos.telerik.com/service/v2/core/FileBrowser/Destroy",
              type: "POST"
          },
          create: {
              url: "https://demos.telerik.com/service/v2/core/FileBrowser/Create",
              type: "POST"
          },
          uploadUrl: "https://demos.telerik.com/service/v2/core/FileBrowser/upload",
          fileUrl: "https://demos.telerik.com/service/v2/core/FileBrowser/File?fileName={0}",
        }
      }
    });
    </script>

### fileBrowser.fileTypes `String` *(default: "*.*")*

Defines the allowed file extensions.


<div class="meta-api-description">
How do I restrict file types in Kendo UI Editor's file browser? Define, set, configure, or restrict allowed file extensions and formats for file selection or upload within an editor's file browser, including filtering by specific suffixes like .jpg, .png, .pdf, or other custom extensions to control which files users can browse, pick, or upload; specify and manage supported file type lists, enforce upload constraints, and customize file browsing behavior by controlling permissible document, image, video, or data file formats during editor setup or runtime.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        /* omitted for brevity */
        fileTypes: "*.zip"
      }
    });
    </script>

### fileBrowser.path `String` *(default: "/")*

Defines the initial folder to display, relative to the root.


<div class="meta-api-description">
How to set initial folder in Kendo UI Editor file browser? Configure the starting directory or initial folder displayed when opening the file browser or file explorer in the editor, specifying the root-relative or absolute path to control which files and folders are visible by default, set or bind the file browser’s starting location to limit or customize the displayed file hierarchy, define the initial navigation folder in the file browsing interface for quick access, and manage the default directory for the editor's file management system to optimize workflow and file visibility.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        /* omitted for brevity */
        path: "/uploads/"
      }
    });
    </script>

### fileBrowser.transport `Object`

Specifies the settings for loading and saving data.


<div class="meta-api-description">
How do I configure the file browser in Kendo UI to use a custom endpoint for uploading files? Set and customize the methods and endpoints for loading, uploading, creating, deleting, and managing files within the file browser, including configuring HTTP request URLs, methods like GET or POST, parameters, and AJAX options to control data transfer, file operations, server communication, asynchronous file retrieval, saving, and manipulation behaviors.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["createLink"],
        fileBrowser: {
            transport: {
                read: "/filebrowser/read",
                uploadUrl: "/filebrowser/upload"
            }
        }
    });
    </script>

### fileBrowser.transport.read `Object|String|Function`

Options or URL for remote file retrieval.

> **Important:** The value of `transport.read` is passed to [jQuery.ajax](https://api.jquery.com/jQuery.ajax).


<div class="meta-api-description">
How to configure remote file fetching for Kendo UI editor's file browser? Configure remote file fetching for the editor’s file browser by specifying a URL string or detailed AJAX options to control HTTP methods, headers, request data, and other network settings when retrieving files. Enable customizable remote file loading, including setting HTTP verbs like GET or POST, adding custom headers for authentication or content type, passing query parameters or payloads, and tuning AJAX requests for file browser integration. Adjust how file data is requested remotely, managing transport configurations to optimize file browsing via URL endpoints or complex request options, while supporting cross-origin requests, preflight configurations, and advanced AJAX controls for precise remote file access.
</div>

#### Example - specify a read URL

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          read: "/filebrowser/read"
        }
      }
    });
    </script>

#### Example - specify read as a function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          read: function(options) {
              // query async service, then call options.success or options.error
              options.success([
                { "name": "foo", "type": "d" },
                { "name": "bar.pdf", "type": "f", "size": 15289 }
              ]);
          }
        }
      }
    });
    </script>

### fileBrowser.transport.read.contentType `String` *(default: "application/x-www-form-urlencoded")*

The content-type HTTP header sent to the server. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
How do I set the content type for file browsing read requests in Kendo UI Editor? Configure or set the HTTP Content-Type header for file browsing read requests, specifying the MIME type such as application/json or other formats to control how data is sent during file retrieval operations, enabling customization of request headers for JSON, XML, or other content types when performing read actions in a file browser context; this setting is important for controlling data serialization, content negotiation, and ensuring proper server communication during file reading processes in web applications.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          read: {
            /* omitted for brevity */
            contentType: "application/json"
          }
        }
      }
    });
    </script>

### fileBrowser.transport.read.data `Object|String|Function`

Data to be send to the server.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
How to add custom data to file browser read requests in Kendo UI Editor? Configure additional query parameters or request payload data to be sent with file browser read requests, enabling customization of server requests by setting extra parameters, extending request data, adding custom fields, or modifying read operation inputs. Support for plain objects, serialized strings, or dynamic data functions is included to control how additional information is passed during file retrieval or directory listing operations, allowing developers to include authentication tokens, filters, flags, or any relevant parameters needed for server-side processing when loading files in the editor file browsing context.
</div>

#### Example - specify Data As Object

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          read: {
            data: {
              id: 42,
              name: "John Doe"
            }
          }
        }
      }
    });
    </script>

#### Example - specify Data As Function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          read: {
            data: function() {
              return { id: 42, name: "John Doe" };
            }
          }
        }
      }
    });
    </script>

### fileBrowser.transport.read.dataType `String`

The type of data that you're expecting back from the server. Commonly used values are `"json"` and `"jsonp"`.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
How to specify the expected response format for file browser responses in Kendo UI Editor? Adjust how file browser responses from the server are parsed and interpreted by specifying the expected response format, such as JSON, JSONP, or other data types, controlling how AJAX calls handle data retrieval, enabling configuration of response parsing for asynchronous loading, setting the format to properly decode server replies, managing response content type expectations, handling cross-domain request formats, and ensuring compatibility with different server-side data formats for file browsing operations.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          read: {
            dataType: "json"
          }
        }
      }
    });
    </script>

### fileBrowser.transport.read.type `String`

The type of request to make (`"POST"`, `"GET`", `"PUT"` or `"DELETE"`), default is "POST".
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
How do I configure the HTTP method for loading files in a Kendo UI Editor file browser? Configure or customize the HTTP method used for loading or retrieving files in the file browser, including options to send read or fetch requests via POST, GET, PUT, or DELETE methods for AJAX calls, enabling control over how file data is requested from the server. This setting supports specifying the desired request verb for server communication during file browsing, allowing developers to set the HTTP method type to match API requirements or backend constraints when accessing or reading file information.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          read: {
            type: "POST"
          }
        }
      }
    });
    </script>


### fileBrowser.transport.read.url `String|Function`

The remote url to call when fetching list of items.


<div class="meta-api-description">
How do I configure Kendo UI Editor to load file listings from a remote URL? Configure or set the URL endpoint for fetching or loading file and folder listings in the editor’s file browser from a remote server, enabling retrieval or refresh of directory contents via HTTP, REST API, or web service calls; control, specify, or define the read transport URI to request and obtain the file system structure, resources, or item list dynamically for browsing, syncing, or updating files and folders in the editor environment.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          read: {
            url: "/read"
          }
        }
      }
    });
    </script>

#### Example - specify Read URL As Function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          read: {
            url: function(params) {
              // build url
              return "/read?t=" + new Date().getTime();
            }
          }
        }
      }
    });
    </script>

### fileBrowser.transport.uploadUrl `String`

The URL which will handle the upload of the new files. If not specified the Upload button will not be displayed.


<div class="meta-api-description">
How do I configure the file upload endpoint URL in Kendo UI Editor's file browser? Configure the file upload endpoint URL to enable server-side handling of file uploads from the editor’s file browser, allowing users to send files via POST requests; set or update the upload destination URL to activate or disable the upload functionality, control the availability of the upload button for adding new files, and manage how files are submitted, sent, transferred, or stored through the editor interface by specifying the backend upload address or server API that processes incoming media or documents within the file browsing experience.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          uploadUrl: "/upload"
        }
      }
    });
    </script>

### fileBrowser.transport.fileUrl `String|Function`

The URL responsible for serving the original file. A file name placeholder should be specified. By default the placeholder value is URL encoded. If this is not desired, use a function.


<div class="meta-api-description">
How can I customize the file URL in Kendo UI Editor's file browser? Configure or customize the URL endpoint used to retrieve, serve, or download the original files within a file browser or editor interface, enabling setting or constructing the fetch URL including dynamic file name placeholders that can be URL-encoded by default or formatted using a custom function to handle encoding requirements, implement specific patterns, or support alternate URL structures for file access, download links, direct file retrieval, resource loading, or backend integration in file management workflows.
</div>

#### Example - fileUrl as String

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          fileUrl: "/content/files/{0}" //the placeholder will be replaced with the current virtual path and selected file name
        }
      }
    });
    </script>

#### Example - fileUrl as Function (can be used to avoid automatic URL encoding)

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      tools: [
      "insertFile"
      ],
      fileBrowser: {
        transport: {
          fileUrl: function (e) {
            return "/content/files/" + e;
          }
        }
      }
    });
    </script>

### fileBrowser.transport.destroy `Object|String`

Options or URL which will handle the file and directory deletion. If not specified the delete button will not be present.

> **Important:** The value of `transport.destroy` is passed to [jQuery.ajax](https://api.jquery.com/jQuery.ajax).


<div class="meta-api-description">
How to disable delete file capability in Kendo UI Editor's file browser? Control enabling or disabling file and folder removal capabilities within the editor’s file browser by configuring server-side deletion endpoints or AJAX requests; set or customize the URL, HTTP methods, headers, data formats, and other AJAX options to manage how files and directories are deleted through asynchronous calls, allowing full control over the delete functionality’s behavior and visibility in the UI, including the ability to disable or enable the delete action dynamically.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          destroy: "/destroy"
        }
      }
    });
    </script>

### fileBrowser.transport.destroy.contentType `String`

The content-type HTTP header sent to the server. Default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
How do I set the Content-Type header for file deletion requests in Kendo UI Editor? Control and configure the HTTP Content-Type header for file deletion or destroy requests sent from the editor’s file browser, enabling you to specify whether the payload is sent as "application/json" for JSON data or as the default "application/x-www-form-urlencoded" for form data; this header setting affects how the server interprets the incoming data during file removal operations and is essential for customizing request formats, ensuring compatibility with various backend APIs, and managing content-type negotiation in AJAX-based file management processes.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          destroy: {
            contentType: "application/json"
          }
        }
      }
    });
    </script>

### fileBrowser.transport.destroy.data `Object|String|Function`

Data to be send to the server.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
How to set data when deleting a file in Kendo UI Editor's file browser transport? Configure or set additional parameters, payload data, or custom fields sent along with the file deletion or destroy request in file management operations, enabling control over server communication during file removal actions, including specifying extra form data, query parameters, or request payload content when triggering file browser destroy transports, allowing you to customize and extend server-side handling, AJAX request data injection, and parameter passing during the file delete process.
</div>

#### Example - specify Data As Object

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          destroy: {
            data: {
              id: 42,
              name: "John Doe"
            }
          }
        }
      }
    });
    </script>

#### Example - specify Data As Function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          destroy: {
            data: function() {
              return {
                id: 42,
                name: "John Doe"
              };
            }
          }
        }
      }
    });
    </script>

### fileBrowser.transport.destroy.dataType `String`

The type of data that you're expecting back from the server. Commonly used values are `"json"` and `"jsonp"`.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
What is the dataType property used for in Kendo UI Editor's file browser transport when deleting files? Configure or set the expected format of the server response when deleting files through the file browser transport, controlling data types such as JSON, JSONP, or other response formats to ensure compatibility and proper handling of delete request results; adjust or specify the response parsing method for file removal operations, enable response type management for server-side file deletion calls, and control how returned data from file delete actions is interpreted and processed.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          destroy: {
            dataType: "json"
          }
        }
      }
    });
    </script>

### fileBrowser.transport.destroy.type `String`

The type of request to make (`"POST"`, `"GET`", `"PUT"` or `"DELETE"`), default is "POST".
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
How do I configure the HTTP method for deleting files in a Kendo UI file browser? Configure or set the HTTP method for delete or destroy actions within a file browser interface, controlling whether removal requests use POST, GET, PUT, or DELETE verbs to communicate with the server. Enable custom transport methods for deleting files by specifying the request type during initialization, tailoring how the system sends destroy commands through AJAX or HTTP calls. Adjust, switch, or override the HTTP method used for file deletion operations to fit backend requirements or API constraints, including common RESTful methods like POST or DELETE for removing resources via the file browsing component.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          destroy: {
            type: "POST"
          }
        }
      }
    });
    </script>

### fileBrowser.transport.destroy.url `String|Function`

The remote url to call when creating a new record.


<div class="meta-api-description">
How do I configure the file browser's create endpoint URL in Kendo UI Editor? Set or configure the remote API endpoint URL used by the file browser for creating, adding, or uploading new files or records, enabling the connection to a backend service that handles file or item creation requests, control the target server address for create actions within the editor’s file management system, specify or update the URL for the create operation in file browsing workflows, define or modify the endpoint to manage new file or record submissions, integrate and route creation requests to a remote service by setting the appropriate URL for the file browser’s create functionality, adjust the network path or address where create commands are sent for file or item addition processes within an editor environment.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          destroy: {
            url: "/destroy"
          }
        }
      }
    });
    </script>

#### Example - specify Destroy URL As Function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          destroy: {
            url: function(params) {
              // build url
              return "/destroy?t=" + new Date().getTime();
            }
          }
        }
      }
    });
    </script>

### fileBrowser.transport.create `Object|String`

Options or URL which will handle the directory creation. If not specified that create new folder button will not be present.

> **Important:** The value of `transport.create` is passed to [jQuery.ajax](https://api.jquery.com/jQuery.ajax).


<div class="meta-api-description">
How to configure Kendo UI Editor file browser to create new folders with custom endpoint or Ajax parameters? Configure creating new folders or directories within an editor’s file browser by setting up the endpoint or Ajax parameters that handle folder creation requests on the server. Control enabling or disabling the folder creation feature by specifying a URL or detailed options for server communication, allowing customization of how new directories are made remotely via HTTP calls. Adjust upload paths, server URLs, Ajax configurations, and request methods to manage directory creation workflows, ensuring users can add folders through the interface when supported by backend endpoints. Enable or disable new folder buttons based on the presence or absence of these settings, tailoring file management experiences in web editors.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          create: "/create"
        }
      }
    });
    </script>

### fileBrowser.transport.create.contentType `String`

The content-type HTTP header sent to the server. Default is `"application/x-www-form-urlencoded"`. Use `"application/json"` if the content is JSON.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
How do I configure the content type for file uploads in a Kendo UI Editor? Control and configure the HTTP Content-Type header used during file creation and upload processes, specifying how data is encoded and transmitted over the network. Enable customization of content encoding such as application/json for JSON payloads or application/x-www-form-urlencoded for form data, affecting how files are posted or created via AJAX requests or HTTP transport layers. Adjust settings to match API requirements, handle multipart uploads, or enforce specific data formats during file operations in web editors, ensuring compatibility and proper server-side parsing by setting or overriding default content type headers during file browser create actions.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          create: {
            contentType: "application/json"
          }
        }
      }
    });
    </script>

### fileBrowser.transport.create.data `Object|String|Function`

Data to be send to the server.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
How to customize data payload for creating new files in Kendo UI Editor file browser transport? Configure custom data payloads for create actions in file management interfaces, enabling you to set, send, or modify the information transmitted to the server when creating new files or folders. Supports dynamic data formats such as objects, strings, or functions that generate payload content at runtime, allowing fine control over request parameters during creation operations. Ideal for tailoring server communication, injecting metadata, customizing request bodies, and integrating additional fields or authentication details with file creation requests in asynchronous upload or file management workflows.
</div>

#### Example - specify data as object

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          create: {
            data: {
              id: 42,
              name: "John Doe"
            }
          }
        }
      }
    });
    </script>

#### Example - specify data as function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          create: {
            data: function() {
              return {
                id: 42,
                name: "John Doe"
              };
            }
          }
        }
      }
    });
    </script>

### fileBrowser.transport.create.dataType `String`

The type of data that you're expecting back from the server. Commonly used values are `"json"` and `"jsonp"`.
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
How do I configure the dataType property in Kendo UI Editor's file browser transport to correctly parse server responses? Specify or configure the expected response format for file creation requests in the editor's file browser transport to correctly parse and deserialize server responses, enabling control over AJAX response handling with options like JSON or JSONP, supporting cross-domain requests and proper callback processing, commonly used to set data types such as "json," "jsonp," or similar formats for seamless communication and response handling in file upload or creation operations.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          create: {
            dataType: "json"
          }
        }
      }
    });
    </script>

### fileBrowser.transport.create.type `String`

The type of request to make (`"POST"`, `"GET`", `"PUT"` or `"DELETE"`), default is "POST".
Refer to the [jQuery.ajax](https://api.jquery.com/jQuery.ajax) documentation for further info.


<div class="meta-api-description">
What is the default HTTP method for creating files in Kendo UI Editor's file browser? Set or configure the HTTP method or HTTP verb for creating files or resources within the file browser, including options like POST, GET, PUT, or DELETE, to control how the editor sends create requests over HTTP; choose the request type that fits RESTful API design or server requirements for file creation actions, enabling customization of HTTP transport behavior during create operations in the editor's file management system.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          create: {
            type: "POST"
          }
        }
      }
    });
    </script>

### fileBrowser.transport.create.url `String|Function`

The remote url to call when creating a new record.


<div class="meta-api-description">
How to set up the create URL for file browser in Kendo UI Editor? Set or customize the endpoint URL for creating new files or records within the file browser, configure the remote server address to handle creation requests via POST or REST API, specify where the editor sends data to create items in the file system, control and define the destination URL for file creation commands, enable integration with backend services by assigning the creation request target, adjust or change the network path for file creation operations, define the API endpoint that the component uses to add new files or entries, manage how and where the file browser initiates create actions, and connect to external services by specifying the create request URL for new resource generation.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          create: {
            url: "/create"
          }
        }
      }
    });
    </script>

#### Example - specify create url as function

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        transport: {
          create: {
            url: function(params) {
              // build url
              return "/create?t=" + new Date().getTime();
            }
          }
        }
      }
    });
    </script>


### fileBrowser.schema `Object`

Set the object responsible for describing the file raw data format.


<div class="meta-api-description">
How do I customize the file browser schema in Kendo UI Editor? Customize and control the parsing and mapping of raw file data in the Editor's file browser by defining how file entries received from the server are structured and interpreted, including setting schema definitions that specify data paths, field mappings, model fields, and parse functions to accurately extract file attributes such as file ID, filename, file size, and file type. This enables configuring or adjusting the file data format, transforming server responses, and instructing the system on how to recognize and process file metadata for display, filtering, or further handling.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["createLink"],
        fileBrowser: {
            transport: {
                read: "/filebrowser/read"
            },
            schema: {
                type: "json",
                data: "data"
            }
        }
    });
    </script>

### fileBrowser.schema.model `Object`

Set the object which describes the file/directory entry fields. Note that a name, type and size fields should be set.


<div class="meta-api-description">
How to customize file schema in Kendo UI Editor's file browser? Set up and customize the data structure or schema that represents files and directories within a file browser, enabling you to define how file and folder metadata like names, types, sizes, and other attributes are mapped, structured, and accessed. Control or configure the model to include required fields for entry properties such as filename, filetype, filesize, and extend it with custom metadata for more detailed file system representation, binding, or filtering. Enable flexible mapping of file system data to suit different file management, display, or processing needs by specifying the schema that governs how file and folder entries are described and handled within the file browser environment.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["createLink"],
        fileBrowser: {
            schema: {
                model: {
                    id: "name",
                    fields: {
                        name: { field: "Name" },
                        type: { field: "Type" },
                        size: { field: "Size" }
                    }
                }
            }
        }
    });
    </script>

### fileBrowser.schema.model.id `String`

The name of the field which acts as an identifier.


<div class="meta-api-description">
How do I configure the unique identifier field in Kendo UI Editor's file browser schema? Configure the unique identifier field name used to represent file entries within the file browser or file manager schema for consistent binding, CRUD (create, read, update, delete) operations, synchronization with backend or server data, and accurate mapping of file records. This setting defines which attribute or property, such as "id", "uid", or another custom field, serves as the primary key to track files uniquely across loading, updating, and syncing processes in file listing or directory navigation components. Enable specifying or customizing the field that acts as the main reference identifier for files in data schemas and server responses to ensure proper data handling, state management, and record correlation in file browser implementations.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["createLink"],
        fileBrowser: {
            schema: {
                model: {
                    id: "name"
                }
            }
        }
    });
    </script>

### fileBrowser.schema.model.fields `Object`

Defines the field mappings for the file browser data model. This configuration specifies which fields in the server response contain the name, type, and size information for files and directories. The fields object allows you to map the server data structure to the expected properties that the file browser uses to display and manage files. Each field can be configured as either a string (field name) or an object with additional parsing options.


<div class="meta-api-description">
How do I customize file attribute mappings in Kendo UI Editor's file browser? Configure and customize how server file and directory attributes such as name, type, size, and other metadata are matched, mapped, or linked to the editor's file browsing interface by defining flexible field mappings that interpret the server response structure. Enable precise control over connecting your backend file data properties to the front-end file browser's model, specifying exact server field names or complex parsing rules to seamlessly display, sort, filter, and manage files and folders within the editor UI. This mapping approach supports various data formats for file attributes, adapting your server responses to align with the file browsing component requirements for file system navigation, metadata extraction, and UI synchronization.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["createLink"],
        fileBrowser: {
            schema: {
                model: {
                    fields: {
                        name: "Name",
                        type: "Type",
                        size: "Size"
                    }
                }
            }
        }
    });
    </script>

### fileBrowser.schema.model.fields.name `Object|String`

The field which contains the name of the file/directory


<div class="meta-api-description">
How to configure the data model property for file names in Kendo UI Editor's file browser? Define or configure the data model property that stores file or directory names for file browsing, enabling binding between the file explorer and your data structure; specify the field used to identify, list, rename, and resolve paths of files or folders within a schema by mapping the key that holds file or directory name values, facilitating synchronization between UI file navigation and underlying data models, and supporting operations such as file name display, renaming, and path handling.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["createLink"],
        fileBrowser: {
            schema: {
                model: {
                    fields: {
                        name: { field: "FileName" }
                    }
                }
            }
        }
    });
    </script>

### fileBrowser.schema.model.fields.name.field `String`

The name of the field.


<div class="meta-api-description">
How do I map file names in Kendo UI Editor's schema model? Configure the file name mapping by specifying which schema field represents the file name within a file browser setup, enabling correct binding, serialization, reading, and writing of file entry names in file management or editor components. This setting supports mapping file names between data models and UI schema fields, controlling how file names are accessed, displayed, saved, or updated in the file browser's underlying data structure. It is useful for customizing file name handling, linking external file data properties to the editor schema, and ensuring synchronization between file entries and their corresponding name properties across different parts of the application or API.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["createLink"],
        fileBrowser: {
            schema: {
                model: {
                    fields: {
                        name: { field: "FileName" }
                    }
                }
            }
        }
    });
    </script>

### fileBrowser.schema.model.fields.name.parse `Function`

Specifies the function which will parse the field value. If not set default parsers will be used.


<div class="meta-api-description">
How to customize file name parsing in Kendo UI Editor's file browser? Customize or control the conversion and interpretation of file or item names within the editor’s file browser by defining a parsing function that transforms, normalizes, formats, or casts the name field during data reading or binding processes, enabling tailored handling of naming conventions, validation, or preprocessing for file lists, directory structures, or schema-driven models with options to override default parsing behavior for consistent or customized name processing across various development and data scenarios.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["createLink"],
        fileBrowser: {
            schema: {
                model: {
                    fields: {
                        name: { 
                            field: "FileName",
                            parse: function(value) {
                                return value.toString();
                            }
                        }
                    }
                }
            }
        }
    });
    </script>

### fileBrowser.schema.model.fields.type `Object|String`

The field which contains the type of the entry. Either *f* for file or *d* for directory.


<div class="meta-api-description">
How do I configure the Kendo UI Editor to distinguish between files and folders in its file browser? Determine and distinguish file system entries by configuring how the file browser interprets item types, enabling recognition of files versus directories through mapped type indicators such as 'f' for files and 'd' for directories; control or set schema fields that identify whether an entry is a folder or document, allowing filtering, classification, or behavior adjustments based on entry types within file browsing interfaces and editor components.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["createLink"],
        fileBrowser: {
            schema: {
                model: {
                    fields: {
                        type: { field: "Type" }
                    }
                }
            }
        }
    });
    </script>

### fileBrowser.schema.model.fields.type.parse `Function`

Specifies the function which will parse the field value. If not set default parsers will be used.


<div class="meta-api-description">
How to customize parsing for file browser model fields in Kendo UI Editor? Convert, normalize, or transform raw input values for file browser model fields to handle custom parsing, deserialization, type conversion, trimming, mapping, or preprocessing before storage; control how incoming field data is interpreted and converted by specifying custom functions to parse or process values, enabling tailored input handling, data normalization, or schema adaptation beyond default parsing mechanisms.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["createLink"],
        fileBrowser: {
            schema: {
                model: {
                    fields: {
                        type: { 
                            field: "Type",
                            parse: function(value) {
                                return value === "directory" ? "d" : "f";
                            }
                        }
                    }
                }
            }
        }
    });
    </script>

### fileBrowser.schema.model.fields.type.field `String`

The name of the field.


<div class="meta-api-description">
How to specify the file metadata field in Kendo UI Editor's schema model? Configure or specify the name of the model field to map file metadata in a file browser schema, enabling binding or linking of schema entries to data source properties such as file name, size, type, or other attributes by providing the exact string identifier. Control how file metadata fields correspond to underlying data model properties, set or assign field names during setup or initialization to ensure accurate data mapping and retrieval in file management or editor systems. Enable defining, matching, or customizing metadata attributes by referencing their property names to support dynamic file data handling, filtering, or display within the editor's file browser context.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["createLink"],
        fileBrowser: {
            schema: {
                model: {
                    fields: {
                        type: { field: "EntryType" }
                    }
                }
            }
        }
    });
    </script>

### fileBrowser.schema.model.fields.size `Object|String`

The field which contains the size of file.


<div class="meta-api-description">
How do I specify the file size field in Kendo UI Editor's file browser schema? Control and specify the data attribute representing file size within a file browser or file manager, enabling accurate display of file dimensions, sorting files by size, configuring upload limits, validating file sizes during upload processes, binding the file browser interface to the correct size field in the data model, and integrating file size information for filtering or organizing files effectively during browsing or management tasks.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["createLink"],
        fileBrowser: {
            schema: {
                model: {
                    fields: {
                        size: { field: "Size" }
                    }
                }
            }
        }
    });
    </script>

### fileBrowser.schema.model.fields.size.field `String`

The name of the field.


<div class="meta-api-description">
How do I specify the file size field in Kendo UI Editor's data schema? Specify or configure the attribute, property, or key representing file size within a data schema or model for file browsing and management, enabling mapping, binding, or linking of file size metadata from source data to user interface components or editor modules for correct display, sorting, filtering, or processing of file size information in file explorer, file manager, or content browser scenarios.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["createLink"],
        fileBrowser: {
            schema: {
                model: {
                    fields: {
                        size: { field: "FileSize" }
                    }
                }
            }
        }
    });
    </script>

### fileBrowser.schema.model.fields.size.parse `Function`

Specifies the function which will parse the field value. If not set default parsers will be used.


<div class="meta-api-description">
How do I customize file size parsing in Kendo UI Editor's file browser? Control and customize how file size data is interpreted, converted, or parsed within a file browsing interface by defining a custom parsing function for size fields, enabling transformation from strings to numbers or other formats, overriding default parsing behavior, and handling various input types or malformed data with flexible parsing logic to ensure accurate size representation and integration in file models.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["createLink"],
        fileBrowser: {
            schema: {
                model: {
                    fields: {
                        size: { 
                            field: "FileSize",
                            parse: function(value) {
                                return parseInt(value);
                            }
                        }
                    }
                }
            }
        }
    });
    </script>

### fileBrowser.messages `Object`

Defines texts shown within the file browser.


<div class="meta-api-description">
How to customize file browser messages in Kendo UI Editor? Customize and translate the text labels, prompts, notifications, alerts, error messages, and informational strings displayed in the file browser interface within the editor. Control and configure all user-facing messages related to file navigation, selection, uploads, warnings, and status updates, enabling localization, internationalization, and tailored wording to fit different languages, user preferences, or branding requirements. Adapt and override default file browser dialogues, captions, and hints to ensure clear communication and enhance user experience across diverse contexts and languages.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
        tools: ["createLink"],
        fileBrowser: {
            messages: {
                uploadFile: "Upload File",
                orderBy: "Sort by",
                orderByName: "Name",
                orderBySize: "Size"
            }
        }
    });
    </script>

### fileBrowser.messages.uploadFile `String` *(default: "Upload")*

Defines text for upload button.


<div class="meta-api-description">
How do I change the upload file button text in Kendo UI Editor's file browser? Customize the text label or caption shown on the file upload button within the editor’s file browser interface, control the wording for uploading files, set or change the displayed upload button message, configure the call-to-action text for file uploads, and modify the prompt or instruction text that appears when users interact with the upload functionality in the file browser component.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        messages: {
          uploadFile: "Upload a file"
        }
      }
    });
    </script>

### fileBrowser.messages.orderBy `String` *(default: "Arrange by")*

Defines text for order by label.


<div class="meta-api-description">
How do I customize the label for sorting options in a Kendo UI file browser? Customize or configure the label text that appears for sorting options in a file browser or file manager interface within an editor, including changing or setting the displayed text for ordering files by name, date, size, type, or custom criteria; this covers adjusting UI text for sort order selectors, controlling how sorting options are labeled, and tailoring messages related to sorting, ordering, or arranging files in the file explorer panel or file picker inside development environments or content management systems.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        messages: {
          orderBy: "Order by"
        }
      }
    });
    </script>

### fileBrowser.messages.orderByName `String` *(default: "Name")*

Defines text for Name item of order by drop down list.


<div class="meta-api-description">
How to change the label for sorting files by name in Kendo UI Editor's file browser? Customize or change the label text for sorting files by name in the file browser, control the display name for the order-by-name option, set or override the localized string used to represent sorting files alphabetically, configure the visible text for sorting or ordering files by their names, update or translate the "Name" label shown in file sorting dropdowns, adjust the naming or caption for the file browser's sorting criteria based on file names, provide custom wording or localization for the alphabetical order selection in file lists, modify, localize, or personalize how the file order-by-name choice appears in the interface.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        messages: {
          orderByName: "Filename"
        }
      }
    });
    </script>

### fileBrowser.messages.orderBySize `String` *(default: "Size")*

Defines text for Size item of order by drop down list.


<div class="meta-api-description">
How do I customize the "Order by size" label in a Kendo UI file browser? Customize the label or text displayed for sorting files by their size in a file browser's order-by dropdown menu, enabling control over how size-related sorting options appear in the interface, configuring the wording for ordering files from smallest to largest or largest to smallest, setting the presentation of size criteria within file manager sorting controls, adjusting the displayed phrase or term used to represent sorting files based on their file size attribute, and modifying the descriptor for size ranking in file lists or directory views.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        messages: {
          orderBySize: "File size"
        }
      }
    });
    </script>

### fileBrowser.messages.directoryNotFound `String` *(default: "A directory with this name was not found.")*

Defines text for dialog shown when the directory not found error occurs.


<div class="meta-api-description">
How to customize the "Directory not found" error message in Kendo UI Editor's file browser? Customize or configure the error message, notification, or alert text displayed when a folder, directory, or file path is missing, unavailable, or not found within the file explorer, file manager, or browser component of a code editor or development environment, enabling localization, language translation, and user-friendly prompts for handling missing directories during file navigation or file system browsing tasks.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        messages: {
          directoryNotFound: "Directory not found!"
        }
      }
    });
    </script>

### fileBrowser.messages.emptyFolder `String` *(default: "Empty Folder")*

Defines text displayed when folder does not contain items.


<div class="meta-api-description">
How to change the message displayed when a folder in Kendo UI Editor's file browser is empty? Customize or localize the message displayed when a file browser folder contains no files or subfolders, control the empty directory notification text, set the placeholder or prompt shown for blank or empty directories within the editor’s file browsing interface, configure the label or description that appears when a folder has no content, and modify the empty folder message to support different languages or user preferences in file navigation components.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        messages: {
          emptyFolder: "Folder is empty"
        }
      }
    });
    </script>

### fileBrowser.messages.deleteFile `String` *(default: "Are you sure you want to delete {0}?")*

Defines text for dialog shown when the file or directory is deleted.


<div class="meta-api-description">
How to customize the delete file prompt in Kendo UI Editor? Customize and configure the prompt or confirmation text, alert, or message displayed when removing, deleting, or erasing a file or folder within the file browser interface, supporting localization to show the notification in different languages or customized wording to confirm file or directory deletions, enabling control over the user-facing warning or dialog content that appears before file removal actions.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        messages: {
          deleteFile: "Are you sure? This action cannot be undone."
        }
      }
    });
    </script>

### fileBrowser.messages.invalidFileType `String` *(default: "The selected file '{0}' is not valid. Supported file types are {1}.")*

Defines text for dialog shown when an invalid file is set for upload.


<div class="meta-api-description">
How do I customize the error message for invalid file types in Kendo UI Editor's file browser? Configure or customize the error message, alert text, or notification shown when a file upload attempt fails due to unsupported, disallowed, restricted, or invalid file types in the file browser or uploader interface. Adjust or set the warning prompt, dialog wording, or user feedback for cases when users try to select or upload formats, extensions, or file types that are not permitted, blocked, or filtered out by the system or application. Enable control over validation messages, file type restrictions, and upload error responses to improve clarity and user guidance on unsupported file selection.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        messages: {
          invalidFileType: "Supported file types are {1}. Please retry your upload."
        }
      }
    });
    </script>

### fileBrowser.messages.overwriteFile `String` *(default: "A file with name '{0}' already exists in the current directory. Do you want to overwrite it?")*

Defines text for dialog shown when an already existing file is set for upload.


<div class="meta-api-description">
How to customize overwrite file confirmation message in Kendo UI Editor? Customize or configure the text prompt, warning message, alert, or notification that appears when uploading or saving a file with the same name as an existing file, enabling control over overwrite confirmation, duplicate file warnings, replacement notices, and localized overwrite dialogs in the file management or upload interface.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        messages: {
          overwriteFile: "Do you want to overwrite the file with name '{0}'?"
        }
      }
    });
    </script>

### fileBrowser.messages.search `String` *(default: "Search")*

Defines text for search box placeholder.


<div class="meta-api-description">
How do I change the default placeholder text in the file browser search input of a Kendo UI Editor? Customize, configure, or change the placeholder text shown inside the file browser search input to provide localized labels, custom prompts, or alternative search hints within the editor’s file navigation panel. Control or set the search box default message, placeholder wording, or input prompt to improve user experience and internationalization when filtering, finding, or searching files in the file explorer or directory browser section of the editor interface. Tailor the text that appears before users type in the search field in the file browser to support multiple languages, custom instructions, or specific search-related messaging affecting file lookup and quick access functionality.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	  tools: [
		"insertFile"
	  ],
      fileBrowser: {
        messages: {
          search: "Find"
        }
      }
    });
    </script>

### formattingMarksRefreshDelay `Number|Boolean` *(default: 250)*

The delay in milliseconds before the formatting marks are refreshed. This feature is useful for performance optimization as the formatting marks are re-rendered any time the user presses a key. If the user is typing very fast or holding down a key, the delay will prevent the re-rendering from being executed multiple times.

The visual effect from this configuration is that the marks will briefly disappear while the user is typing. You can set the value to `false` to fully turn off this behavior.


<div class="meta-api-description">
How do I prevent frequent re-renders of formatting marks in a Kendo UI Editor while typing? Control the delay interval for updating or refreshing visible formatting marks while typing or holding keys in a text editor to optimize performance and reduce frequent re-renders, enabling you to set a debounce time in milliseconds for how quickly formatting highlights or marks are recalculated and displayed, or disable delayed refresh entirely to maintain constant mark visibility without flicker, helping manage smooth input, prevent lag, and customize how formatting annotations appear and update dynamically during continuous text entry or rapid editing.
</div>

#### Example

    <textarea id="editor"><p>Some text with several spaces that demonstrates<br /> the re-rendering of the marks.</p></textarea>

    <script>
        $(document).ready(function() {
            $("#editor").kendoEditor({
                tools: ["formattingMarks"],
                formattingMarksRefreshDelay: false
            });
        });
    </script>

### unsafeInline `Boolean` *(default: true)*

When set to false, the decoration applied by the Formatting tool dropdown will be skipped and the values will appear as plain text options.


<div class="meta-api-description">
How to configure Kendo UI editor to show plain text instead of styled previews for formatting options? Configure inline formatting display behavior in rich text editors to enable or disable visual styling and decoration of text formatting options such as bold, italic, underline, and other inline styles. Adjust settings to control whether formatting choices in dropdown menus or toolbars appear with styled previews or as plain text labels, allowing customization of the user interface to show or hide inline formatting decorations, visual cues, or previews in editor toolbars. Manage inline style representation for text formatting tool dropdowns, controlling if formatting options render with visual styling or simplified plain text, supporting preferences for clarity, accessibility, or streamlined editing experiences within rich text editor components.
</div>

#### Example

    <textarea id="editor"></textarea>

    <script>
        $(document).ready(function() {
            $("#editor").kendoEditor({
                unsafeInline: false
            });
        });
    </script>

## Fields

### body `Element`

The HTML element which represents the editor content area. In the [classic Editor mode](/controls/editor/overview#classic-mode), this is the `<body>` element inside the `iframe`. In the [inline Editor mode](/controls/editor/overview#inline-mode), this is the [element, from which the Editor is initialized](/intro/widget-basics/wrapper-element).


<div class="meta-api-description">
How can I access and manipulate the editable content of a Kendo UI for jQuery rich text editor? Access or manipulate the main editable content container of a rich text editor, including reading or updating its HTML content, setting focus programmatically, attaching event listeners for input or interaction, or applying CSS styles directly to the editable area. Whether the editable region is an iframe’s body element in classic mode or the root element of an inline editor instance, this element represents where users type, format, and interact with the editor’s content. Useful for tasks like dynamically injecting HTML, monitoring changes, customizing behavior, or styling the editable zone in different editor configurations.
</div>

#### Example - set background color and font color to the editor content area

    <textarea id="editor"></textarea>
    <script>
      $("#editor").kendoEditor();
      var editor = $("#editor").data("kendoEditor");
      editor.body.style.backgroundColor = "#f00";
      editor.body.style.color = "#FFFFFF";
    </script>

### toolbar `Object`

The toolbar instance of the Kendo Editor.


<div class="meta-api-description">
How can I programmatically enable or disable toolbar buttons in the Kendo UI Editor? Control and customize the editing toolbar interface by accessing the toolbar instance tied to the editor, enabling you to programmatically manipulate toolbar elements, query toolbar buttons and controls, dynamically enable, disable, or toggle toolbar options, bind event handlers to toolbar actions, adjust toolbar behavior, and integrate toolbar modifications within your editor configuration or runtime environment for flexible UI management and responsive user interaction.
</div>

#### Example

    <button  id="open">Open</button>
    <div id="editor"></div>
    <script>
      $("#open").kendoButton();
      var editor = $("#editor").kendoEditor().data("kendoEditor");
      $("#open").click(function(){
        editor.windowInstance.open();
      })
    </script>

## Methods

### createRange

Creates a W3C-compatible **Range** object.


<div class="meta-api-description">
How can I get the current selection in a Kendo UI Editor using its range object? Generate or retrieve a standard W3C DOM Range object reflecting the current selection or specific boundaries within editable content to programmatically inspect, select, modify, insert, wrap, replace, or manipulate text and nodes; control cursor position and selection spans, compute character offsets, and integrate with DOM APIs for dynamic editing, content manipulation, range calculations, or custom selection handling in rich text environments.
</div>

#### Parameters

##### document `Document` *(optional)*

The document that the range is associated with. If omitted, the document of the editor editing area will be used.

#### Returns

`Range` The created **Range** object.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    var range = editor.createRange();
    </script>

### destroy
Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the Editor element from DOM.


<div class="meta-api-description">
How do I properly remove and destroy a Kendo UI Editor instance to prevent memory leaks? Teardown, cleanup, and safely remove an Editor instance by detaching event listeners, clearing data attributes to prevent memory leaks, and recursively destroying nested Kendo components to free resources without deleting the DOM element; control destruction lifecycle, release allocated resources, and ensure proper cleanup before removing or reinitializing editor elements.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.destroy();
    </script>

### encodedValue

Gets the HTML encoded value of the editor.


<div class="meta-api-description">
How to get the encoded editor content in Kendo UI? Access or obtain the HTML-encoded content from a text editor component, enabling retrieval of the current editor value as a safely encoded HTML string suitable for secure storage, transmission, display, or processing without altering the original editor data. This covers scenarios where you need to extract content with special characters like angle brackets converted into HTML entities, fetch the editor's raw encoded output, read or save sanitized editor content to avoid injection or formatting issues, and handle encoding for safe embedding in web pages or APIs while preserving the editor’s internal state. The functionality supports encoding conversion, safe content extraction, and obtaining the editor text value as an HTML-safe string for varied use cases including backend storage, frontend rendering, or data exchange.
</div>

#### Returns

`String` The value of the Editor as HTML encoded string.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({ value: "<p>foo</p>" });
    var editor = $("#editor").data("kendoEditor");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(editor.encodedValue()); // logs "&lt;p&gt;foo&lt;/p&gt;"
    </script>

### exec

Executes an editor command on the currently selected text.


<div class="meta-api-description">
How do I programmatically apply editing commands to selected text in a Kendo UI Editor? Run or apply editing commands, actions, or operations on the current text selection, controlling formatting, insertion, replacement, or custom manipulation within the editor. Enable programmatic execution of named commands targeting highlighted or selected content, allowing dynamic text editing, formatting changes, and command invocation on the active selection or cursor area. Configure command execution on selected ranges, invoke built-in or custom edit actions, apply style transformations, insert content, or trigger modifications directly on the user’s selected text segment.
</div>

#### Parameters

##### name `String`

The name of the command to be executed. The available names match the list of [tools](/api/javascript/ui/editor#configuration-tools), plus `"undo"` and `"redo"`.

##### params `String|Object` *(optional)*

The parameters for the executed command.

##### params.value `Object`

The arguments for commands that expect such

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({ value: "foo" });
    var editor = $("#editor").data("kendoEditor");
    editor.exec("foreColor", { value: "#f00" });
    </script>

### focus

Focuses the editable area.


<div class="meta-api-description">
How do I programmatically focus on the editable content area of a Kendo UI Editor? Set or programmatically move the keyboard focus into the editable content area, enable immediate typing by placing the text caret or selection inside the editor, control where user input begins after initialization, dialog openings, or interaction events, trigger focus to start editing or text entry, activate or shift cursor focus within the editor component dynamically, manage input readiness and selection placement in rich text or code editing environments, ensure keyboard focus is set without parameters on the editor instance, support user-driven focus changes or scripted UI workflows requiring text input.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.focus();
    </script>

### getRange

Gets a **Range** object form the editable area.


<div class="meta-api-description">
How can I get the current selected text from a Kendo UI Editor? Retrieve or access the current text selection, caret position, or highlighted area within an editable content region, enabling inspection and manipulation of selection boundaries, extracting selected content, modifying or inserting nodes at the cursor or selection, managing caret placement, creating bookmarks or markers inside an editor, and working with standard DOM Range objects for tasks like reading start and end points, adjusting selection ranges, or programmatically controlling user-selected text within editable fields or rich text editors.
</div>

#### Returns

`Range` A W3C-compatible **Range** object that represents the currently selected text in the editor area.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    var range = editor.getRange();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(range);
    </script>

### getSelection

Gets a W3C-compatible **Selection** object form the editable area.


<div class="meta-api-description">
How do I get the current selection in Kendo UI Editor? Retrieve the current text selection, highlighted ranges, or caret position within the editable content area to inspect, query, or manipulate user-selected text and cursor location, enabling operations like reading the selection, extracting ranges, controlling cursor placement, replacing highlighted text, applying DOM changes to modify content, or accessing detailed selection information compatible with standard web APIs for editing and interactive text handling.
</div>

#### Returns

`Selection` a W3C-compatible **Selection** object form the editable area.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    var selection = editor.getSelection();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(selection);
    </script>

### paste

Inserts HTML into the editable area. Cleans up MS Word formatting.


<div class="meta-api-description">
How do I control what HTML is inserted when pasting content into a Kendo UI editor? Control how HTML content is inserted or pasted into an editable text area, enabling programmatic insertion of HTML snippets, handling or cleaning up messy formatting from Microsoft Word or other rich text sources, normalizing pasted content for consistent and sanitized HTML output, automatically filtering out unwanted styles and markup from external copy/paste actions, configuring the editor to accept, process, or modify HTML input for cleaner, uniform, and well-structured editing environments, managing content insertion to prevent bloated or inconsistent HTML, and supporting scenarios where developers want to customize or automate inserting and sanitizing pasted or injected HTML content in rich text editors.
</div>

#### Parameters

##### html `String`

The HTML to be inserted.

##### options `Object`

Options that configure how the content is processed when pasting.

##### options.split `Boolean` *(default: true)*

Specifies whether the surrounding formatting should be split prior to inserting the HTML. If set to `false`, the inserted snippet will inherit styles from the surrounding content.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.paste("<p>New content</p>");
    </script>

#### Example - insert text content, preserving formatting

    <textarea id="editor">&lt;em&gt;foo&lt;/em&gt;</textarea>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");

    // set selection after 'f'
    var range = editor.getRange();
    range.setStart(editor.body.firstChild.firstChild, 1);
    range.collapse(true);
    editor.selectRange(range);

    // insert content
    editor.paste("bar", { split: false }); // <em>fbaroo</em>
    </script>

### selectedHtml

Serializes the currently selected text to a XHTML string.


<div class="meta-api-description">
How do I get the HTML of selected text in a Kendo UI Editor? Extract or retrieve the HTML markup or rich text currently highlighted or selected in an editor, capturing all inline styles, formatting, and nested elements as a clean, serialized XHTML or well-formed HTML string; use this method to get the exact HTML source of a user’s selection for purposes such as copying content, saving formatted text, sending serialized markup to servers or APIs, embedding selected sections into other documents or editors, preserving styling and structure when exporting or manipulating selected portions, and programmatically accessing the current rich text or DOM fragment representing the user’s selection within the editor environment.
</div>

#### Returns

`String` The selected text as valid XHTML.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    var html = editor.selectedHtml();
    </script>

### refresh

Reinitializes the editing area iframe. Should be used after moving the editor in the DOM.


<div class="meta-api-description">
How do I reinitialize the iframe environment after moving a Kendo UI editor? Trigger reinitialization of the editing iframe environment and update internal references to maintain full editor functionality after moving or repositioning the editor within the document object model, ensuring the iframe’s editing context is properly restored, refreshed, or reset; useful for cases when the editor is dynamically relocated, programmatically repositioned, or manipulated in the DOM to keep content editing seamless, stable, and uninterrupted.
</div>

#### Example

    <textarea id="editor"></textarea>
    <div id="container"></div>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.wrapper.appendTo("#container");
    editor.refresh();
    </script>

### saveAsPDF

Initiates the PDF export and returns a promise. Also triggers the [pdfExport](/api/javascript/ui/editor/events/pdfexport) event.

> Calling this method may trip the built-in browser pop-up blocker. To avoid that, call this method as a response to an end-user action, e.g. a button click.


<div class="meta-api-description">
How to save Kendo UI editor content as PDF programmatically? Trigger exporting the editor’s content to a PDF file, enable programmatic saving or downloading of documents, initiate PDF export processes that return promises for handling success or failure callbacks, control PDF generation flows with events, prevent pop-up blockers by invoking during user interactions like clicks, automate document conversion to PDF, integrate PDF export in workflows, manage asynchronous PDF creation tasks, and execute follow-up code after the PDF is saved or download completes.
</div>

#### Returns
`Promise` A promise that will be resolved when the export completes. The same promise is available in the [pdfExport](/api/javascript/ui/editor/events/pdfexport) event arguments.

#### Example - manually initiate PDF export

    <button id="export">Export to PDF</button>
    <textarea id="editor" rows="10" cols="30" style="height:440px">
            Kendo UI Editor allows your users to edit HTML in a familiar, user-friendly way.&lt;br /&gt;
            In this version, the Editor provides the core HTML editing engine, which includes basic text formatting, hyperlinks, lists,
            and image handling. The widget &lt;strong&gt;outputs identical HTML&lt;/strong&gt; across all major browsers, follows
            accessibility standards and provides API for content manipulation.
    </textarea>

    <script>
        $("#editor").kendoEditor();
        $("#export").click(function(e) {
            var editor = $("#editor").data("kendoEditor");
            editor.saveAsPDF();
        });
    </script>


### selectRange

Focuses the editable area and selects the range described by the range parameter.


<div class="meta-api-description">
How do I programmatically select a specific range of text in Kendo UI Editor? Programmatically highlight or set the cursor to a specific text segment by configuring selection ranges, controlling caret position, and focusing editable areas to enable text highlighting, cursor movement, user selections, text range manipulation, dynamic content focus, and automated selection for editing tasks such as formatting, clipboard operations, search and replace, or toolbar-triggered actions.
</div>

#### Parameters

##### range `Range`

The **Range** object that describes the new selection.

#### Example - select all

    <textarea id="editor"></textarea>
    <div id="container"></div>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    var range = editor.createRange();
    range.selectNodeContents(editor.body);
    editor.selectRange(range);
    </script>

### update

Serializes the current state of the editable area to the `<textarea>` element.
This method should be called after modifying the editor content through the DOM.


<div class="meta-api-description">
How do I update the Kendo UI Editor's content with changes made to the underlying textarea? Synchronize the editable content with the underlying form’s `<textarea>` by triggering an update of the current editor state to the form element, ensuring that any programmatic changes, contentEditable edits, or dynamic modifications to the editor are properly serialized and reflected before submitting the form or accessing the data externally; this method helps maintain consistency between the visible editor and the stored form value, enabling seamless integration with form submissions, external data processing, or manual DOM manipulations involving text area content synchronization.
</div>

#### Example

    <textarea id="editor"></textarea>
    <script>
    var textarea = $("#editor");
    textarea.kendoEditor({ value: "Hello, " });
    var editor = textarea.data("kendoEditor");
    editor.body.appendChild(editor.document.createTextNode("World"));
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(textarea.val()); // logs "Hello, "
    editor.update();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(textarea.val()); // logs "Hello, World"
    </script>

### state

Get the state of a given tool. Introduced in the 2013.2.923 internal build.


<div class="meta-api-description">
How do I check if the bold tool is enabled in a Kendo UI editor? Check the active status, enabled condition, toggled state, or current availability of editor tools, toolbar commands, formatting options, or selection controls by querying the operational state of these features. Determine if specific editing commands, plugins, buttons, or formatting tools are currently on, off, enabled, disabled, active, inactive, or applied, to dynamically control and respond to user interactions within the editor environment. This includes verifying toggle states for options like bold, italic, lists, or custom tool actions to reflect the real-time tool activation and readiness across different editing contexts.
</div>

#### Parameters

##### toolName `String`

The name of the tool that will be tested if formatted.

#### Returns

`Boolean` The state of the tool.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.value("<em>foo</em>");
    var range = editor.createRange();
    range.selectNodeContents(editor.body.firstChild);
    editor.selectRange(range);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(editor.state("italic")); // logs true
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(editor.state("bold")); // logs false
    </script>

### value

Gets or sets the editor value.


<div class="meta-api-description">
How do I dynamically update the content of a Kendo UI Editor in jQuery? Accessing or modifying the text, content, or data within a rich text or code editor component by retrieving the current content, reading the editor’s value, getting the existing input, updating or setting new content dynamically, programmatically changing the text, retrieving the editor's data, or injecting content directly into the editor after it has been initialized, supporting both read-only queries and content replacement calls for controlling, synchronizing, or managing the editor’s active value during runtime.
</div>

#### Parameters

##### value `String`

The value to set.

#### Returns

`String` The value of the Editor as HTML string.

#### Example

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.value("<p>New content</p>");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(editor.value()); // logs "<p>New content</p>"
    </script>

## Events

### change

Fires when Editor is blurred and its content has changed.


<div class="meta-api-description">
How can I detect when editing is completed in Kendo UI Editor? Detect when editing is completed by capturing when the editor loses focus after content modifications, enabling functionality to track content updates, trigger autosave actions, validate input, synchronize with data models, listen for changes upon blur events, and respond to user edits finishing within rich text or code editing environments.
</div>

#### Example - subscribe to the "change" event during initialization

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      change: function() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(this.value());
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <textarea id="editor"></textarea>
    <script>
    function editor_change() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(this.value());
    }
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.bind("change", editor_change);
    </script>

### execute

Fires when an Editor command is executed.


<div class="meta-api-description">
How to intercept command executions in Kendo UI Editor? Trigger custom functions or handle events whenever the editor runs any built-in or custom commands, intercepting command executions to monitor, respond, or extend behavior during command invocation. Enable, configure, or hook into editor command execution events to inspect command metadata, chain additional actions or side effects, execute custom logic on every command run, or integrate third-party workflows triggered by command usage. Control how commands are processed in the editing environment by listening to or reacting to command execution events, supporting use cases like logging, analytics, dynamic command response, or augmenting editor features programmatically.
</div>

#### Event Data

##### e.name `String`

The name of the command

##### e.command `Object`

The command instance

#### Example - subscribe to the "execute" event during initialization

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      execute: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("executing command", e.name, e.command);
      }
    });
    </script>

#### Example - subscribe to the "execute" event after initialization

    <textarea id="editor"></textarea>
    <script>
    function editor_execute(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("executing command", e.name, e.command);
    }
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.bind("execute", editor_execute);
    </script>

### keydown

Fires when the user depresses a keyboard key. Triggered multiple times if the user holds the key down.


<div class="meta-api-description">
How do I capture keyboard input events in Kendo UI Editor? Capture and respond to keyboard input events triggered by key presses in text editing environments, including detecting when keys are pressed down, repeated key actions from holding keys, intercepting and handling specific keyboard inputs, controlling or preventing default actions like shortcuts or typing behaviors, enabling custom reactions to user keystrokes, monitoring keydown events for real-time input processing, implementing keyboard shortcuts, handling key press detection in editors or input fields, and configuring event listeners for keyboard interactions during text editing or input scenarios.
</div>

#### Example - subscribe to the "keydown" event during initialization

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      keydown: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("keydown : keyCode=",e.keyCode);
      }
    });
    </script>

#### Example - subscribe to the "keydown" event after initialization

    <textarea id="editor"></textarea>
    <script>
    function editor_keydown(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("keydown : keyCode=", e.keyCode);
    }
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.bind("keydown", editor_keydown);
    </script>

### keyup

Fires when the user releases a keyboard key.


<div class="meta-api-description">
How to handle keyboard input in Kendo UI Editor? Detect keyboard key release actions and capture user input changes by handling events triggered when a key is lifted after being pressed. Enable custom responses to typing activity, implement keyboard shortcuts or hotkeys, perform input validation upon key release, control navigation flow with keyboard interactions, monitor real-time text input changes, configure accessibility features tied to key releases, and track user keyup events for dynamic behavior in interactive text fields or editor components.
</div>

#### Example - subscribe to the "keyup" event during initialization

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      keyup: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("keyup : keyCode=",e.keyCode);
      }
    });
    </script>

#### Example - subscribe to the "keyup" event after initialization

    <textarea id="editor"></textarea>
    <script>
    function editor_keyup(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("keyup : keyCode=",e.keyCode);
    }
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.bind("keyup", editor_keyup);
    </script>

#### Example - show word count

    <textarea id="editor"></textarea>
    <div id="words"></div>
    <script>
    function wordCount(value) {
      return $.trim(value.replace(/<.*?>/g, " "))
        .replace(/['";:,.?\-!]+/g, '')
        .match(/\S+/g).length;
    }

    $("#editor").kendoEditor({
      keyup: function(e) {
        $("#words").text(wordCount(this.value()) + " words");
      }
    });
    </script>

### paste

Fires before the content is pasted in the Editor.


<div class="meta-api-description">
How do I customize clipboard handling in Kendo UI Editor? Intercept and handle paste events before insertion to inspect, sanitize, modify, filter, or cancel clipboard content within the editor; control pasted text or HTML by intercepting the paste action, stripping unwanted formatting, cleaning input, altering data before insertion, preventing default paste behavior, customizing clipboard handling, or validating pasted content to ensure safe and consistent input.
</div>

#### Event Data

##### e.html `Object`

The pasted content

#### Example - subscribe to the "paste" event during initialization

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      paste: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.html);
      }
    });
    </script>

#### Example - subscribe to the "paste" event after initialization

    <textarea id="editor"></textarea>
    <script>
    function editor_paste(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.html);
    }
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.bind("paste", editor_paste);
    </script>

#### Example - process the pasted content

    <textarea id="editor"></textarea>
    <script>
    function onPaste(e) {
      // replace all <a> / </a> tags in the pasted content
      e.html = e.html.replace(/<\/?a[^>]*>/g, "");
    }
    $("#editor").kendoEditor({
      paste: onPaste
    });
    </script>

### pdfExport

Fired when the user clicks the "Export to PDF" toolbar button.


<div class="meta-api-description">
How do I customize PDF export from Kendo UI Editor? Capture and respond to user actions triggering PDF generation from the editor by detecting when the export to PDF command or button is activated, enabling developers to intercept and customize export workflows, execute custom scripts during PDF creation, track or log export events for analytics, modify or prepare the document content before saving or exporting as PDF, integrate external systems or APIs upon PDF export initiation, handle export button clicks programmatically, configure event listeners for PDF output processes, and control or extend the default PDF export behavior within the editing environment.
</div>

#### Event Data

##### e.sender `kendo.ui.Editor`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked the Editor will not save the generated file.

##### e.promise `Promise`

A promise that will be resolved when the export completes.

#### Example - subscribe to the "select" event during initialization

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
	    tools: ["pdf"],
      pdfExport: function(e) {
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <textarea id="editor"></textarea>
    <script>
    function onEditorExport(e) {
    }
    $("#editor").kendoEditor({
		   tools: ["pdf"]
	  });
    var editor = $("#editor").data("kendoEditor");
    editor.bind("pdfExport", onEditorExport);
    </script>

### select

Fires when the Editor selection has changed.


<div class="meta-api-description">
How to detect changes in text selection within Kendo UI editor? Detect and respond to changes in text selection or cursor position within a text editor by capturing selection events that trigger whenever the user modifies the highlighted range or moves the caret. Use event listeners to track selection updates, enable or disable toolbar commands based on the current selection state, refresh contextual interfaces dynamically, synchronize selections across multiple components or views, and implement custom behaviors sensitive to selection changes by accessing editor APIs. This functionality supports real-time reaction to user interactions like selecting text, adjusting cursor location, or modifying ranges, empowering developers to configure, monitor, and control selection-driven features and UI adjustments seamlessly.
</div>

#### Example - subscribe to the "select" event during initialization

    <textarea id="editor"></textarea>
    <script>
    $("#editor").kendoEditor({
      select: function(e) {
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <textarea id="editor"></textarea>
    <script>
    function editor_select(e) {
    }
    $("#editor").kendoEditor();
    var editor = $("#editor").data("kendoEditor");
    editor.bind("select", editor_select);
    </script>


## Class Fields

### defaultTools `Array`

An array of tool definitions that are used for initializing the default tools. Note: Editors that are already initialized will not be affected by changes to this array.


<div class="meta-api-description">
How to customize the default editing tools in Kendo UI for jQuery Editor control? Control and customize the initial set of editing tools available in the toolbar or toolset by configuring which tool definitions the editor initializes with, enabling you to specify, modify, or update the array of default tools that define the editor’s starting features and behaviors; adjust these tool settings to tailor the editing environment, set preferred or frequently used tools on startup, control which features appear by default, and manage the tool collection that new editor instances load, while noting that changes to this configuration affect only future editor initializations rather than currently running editors.
</div>

#### Example - insert paragraphs on Shift+Enter, line breaks on Enter

    <textarea id="editor"></textarea>
    <script>
    var defaultTools = kendo.ui.Editor.defaultTools;

    defaultTools["insertLineBreak"].options.shift = false;
    defaultTools["insertParagraph"].options.shift = true;

    $("#editor").kendoEditor();
    </script>
