---
title: Grid
page_title: jQuery Grid Documentation | Configuration, Methods, Events
description: Get started with code examples for the jQuery Grid by Kendo UI and learn how to use methods and which events to set once the widget detail is initialized.
res_type: api
component: grid
---

# kendo.ui.Grid

Represents the Kendo UI Grid widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### adaptiveMode `String` *(default: 'none')*

If set to `auto` and the grid will use adaptive rendering.


<div class="meta-api-description">
Control and configure responsive layout adaptation for grid components to automatically adjust column arrangement, sizing, and visibility based on screen size, device type, or viewport dimensions, enabling flexible presentation on mobile phones, tablets, and smaller screens. Enable or set adaptive rendering modes such as automatic or customized behaviors to ensure dynamic reflow, responsiveness, and usability across different display environments, improving user experience by tailoring grid structure for compact layouts, hiding or stacking columns, and optimizing for touch-friendly interfaces on constrained screens. This includes triggering fluid resizing, breakpoint-based layout changes, and conditional rendering logic to handle diverse device form factors seamlessly.
</div>

#### Example - enable adaptive rendering auto detect

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ],
       filterable: true,
       columnMenu: {
         componentType: "modern"
       },
       adaptiveMode: "auto",
       height: 550
    });
    </script>

### ai `Object`

Defines the configuration options for the AI tools in the Grid.


<div class="meta-api-description">
Enable and customize AI-driven capabilities within the data grid including intelligent suggestions, automated summaries, predictive analytics, and dynamic content generation by configuring model parameters, API endpoints, authentication keys, prompt templates, and behavior settings per column; adjust confidence levels, manage response updates, and control integration of machine learning outputs to enhance data interaction, automate insights, and tailor AI assistance across the grid interface for flexible, adaptive, and context-aware functionality.
</div>

#### Example - enable AI Assistant with basic configuration

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ],
       toolbar: ["aiAssistant"],
       filterable: true,
       columnMenu: {
         componentType: "modern"
       },
       ai: {
          service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       },
       height: 550
    });
    </script>

### ai.service `String|Object`

The URL or the configuration of the AI service to use for generating outputs.


<div class="meta-api-description">
Specify or customize the AI backend endpoint for output generation by configuring service URLs, authentication credentials, model selections, HTTP headers, or provider-specific parameters. Enable setting and switching between different AI providers, endpoints, or APIs during setup to control how outputs are generated, including configuring access tokens, service URIs, model names, and connection details. Adjust integration settings for external AI platforms, define service configuration objects, and manage request customization options for AI-driven content creation or inference within the environment.
</div>

#### Example - configure AI service as string

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.service.url `String`

The URL of the AI service to use for generating outputs.


<div class="meta-api-description">
Configure or set the endpoint URL for connecting to an AI service that generates content, suggestions, or results, allowing you to specify the full address of a custom or hosted AI API for integration. Enable the system to call a specific AI platform by providing its service URL, controlling where requests for AI-generated outputs are sent, and supporting customization or switching between different AI providers. This setting directs the AI-related calls to a designated URL for generating outputs, handling AI endpoint configuration for integration, deployment, or third-party services.
</div>

#### Example - configure AI service URL

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         service: {
           url: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
         }
       }
    });
    </script>

### ai.service.headers `Object`

The headers to send with the AI service request.


<div class="meta-api-description">
Configure custom HTTP headers for outgoing HTTP requests to an AI service, enabling the inclusion of authentication tokens, API keys, content-type specifications, authorization credentials, custom metadata, or any additional header information needed for secure and customized communication. This setup supports setting, modifying, or controlling header name/value pairs to manage request authentication, specify data formats, or pass extra contextual information when invoking AI endpoints from a grid or distributed system, ensuring flexible header management for varied integration and security requirements.
</div>

#### Example - configure AI service headers

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         service: {
           url: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
           headers: {
             "Content-Type": "application/json"
           }
         }
       }
    });
    </script>

### ai.service.data `Object|Function`

The data to send with the AI service request.


<div class="meta-api-description">
Customize and control the input payload sent to an AI service by setting or configuring the data content, enabling developers to provide serialized objects, JSON, or structured values that form the request body or query parameters; this covers supplying prompts, input context, parameters, metadata, or any required information needed to interact dynamically with AI endpoints, supporting various formats and flexible input structures to tailor AI service requests effectively.
</div>

#### Example - configure AI service data

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         service: {
           url: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
           data: (prompt) => ({
            "role": "user",
            "contents": [{
              "$type": "text",
              "text": prompt
            }],
            "columns": [{ field: "name" }],
          })
         }
       }
    });
    </script>

### ai.service.outputGetter `Function`

The function to get the output from the AI service response.


<div class="meta-api-description">
Configure how AI-generated responses are extracted, parsed, and transformed for display or further processing within a data grid, including mapping, normalizing, or selecting specific fields from AI outputs, customizing result presentation, enabling tailored data binding, controlling response formatting, shaping service outputs for rendering, and adapting AI responses to match grid requirements or user interface components.
</div>

#### Example - configure AI service output getter

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         service: {
           url: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
           outputGetter: function(response) {
             return response.messages.join("---");
           }
         }
       }
    });
    </script>

### ai.autoClose `Boolean` *(default: true)*

Configures if the AI Assistant Window should remain visible after the response.


<div class="meta-api-description">
Configure the behavior of an AI assistant interface to automatically close after delivering a response or stay open for continued interaction, enabling control over whether the assistant window disappears immediately once the answer is provided or remains visible for reviewing messages, follow-up questions, or further engagement. Adjust settings to enable automatic dismissal of the assistant popup after completion or keep it persistent for ongoing conversation and detailed examination, facilitating user preferences for session continuity or quick interaction closure. This impacts how the assistant’s visibility is managed post-response, supporting use cases needing instant hide, manual review, or extended dialog without reopening windows.
</div>

#### Example - configure AI service output getter

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         autoClose: false,
         service: {
           url: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
           outputGetter: function(response) {
             return response.messages.join("---");
           }
         }
       }
    });
    </script>

### ai.keepOutputHistory `Boolean` *(default: false)*

Configures if the AI Assistant output should be cleared after closing.


<div class="meta-api-description">
Manage retaining or clearing AI assistant responses in the interface after closing sessions, enabling configurations to save output history for future reference or automatically erase past results when the assistant window is closed; control persistence, output storage, session history retention, clearing or preserving assistant-generated results across uses, and setting preferences to keep or discard conversational outputs and analysis logs for subsequent review or immediate disposal.
</div>

#### Example - configure AI service output getter

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         autoClose: true,
         keepOutputHistory: false,
         service: {
           url: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
           outputGetter: function(response) {
             return response.messages.join("---");
           }
         }
       }
    });
    </script>

### ai.aiAssistant `Object`

Defines the configuration options for the AI Assistant tool in the Grid.


<div class="meta-api-description">
Control and customize AI-powered assistance within the grid environment by enabling or disabling conversational AI features, setting interface placement and activation methods, managing request routing and response handling, adjusting integration endpoints, and fine-tuning automated guidance behavior for in-application support, chatbot interactions, and contextual help triggers to optimize user engagement and workflow automation.
</div>

#### Example - configure AI Assistant tool

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "ProductName" },
         { field: "UnitPrice" },
         { field: "UnitsInStock" }
       ],
       dataSource: {
         transport: {
           read: {
             url: "https://demos.telerik.com/service/v2/core/detailproducts",
           },
         },
         pageSize: 5
       },
       sortable: true,
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistant: {
           promptSuggestions: ["Show me the most expensive products",],
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>


### ai.aiAssistant.promptSuggestions `Array`

Defines the suggestions for the AI Assistant tool. The suggestions are displayed in the AI Assistant tool.


<div class="meta-api-description">
Control and customize the set of predefined prompt recommendations, autocomplete options, suggested queries, example inputs, and starter phrases presented by an AI assistant interface to help users quickly select, compose, or refine prompts while interacting with AI tools, enabling configuration of default hints, sample questions, or guidance phrases that streamline prompt creation, accelerate input entry, and enhance user experience during AI-driven query formulation and natural language interaction.
</div>

#### Example - configure prompt suggestions

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "product" }, { field: "category" }],
       dataSource: [{ product: "Tea", category: "Beverages" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistant: {
           promptSuggestions: [
             "Show me the top selling products",
             "Which category has the highest revenue?",
             "Identify products with low stock",
             "Compare sales across regions"
           ]
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistant.promptOutputs `Array`

An array of prompt outputs to display in the AI Assistant output view.


<div class="meta-api-description">
Control and configure the presentation and handling of AI-generated response outputs within a grid or interface by supplying and managing an array of prompt response items, enabling dynamic rendering, updating, and iteration of assistant replies as they evolve. Manage, bind, or display AI assistant generated outputs such as chatbot answers, prompt replies, or conversational responses within structured layouts, dashboards, or UI components. Facilitate real-time updates and synchronization of multiple assistant output entries for seamless integration of AI conversational data into user interfaces, ensuring flexible control over how AI response lists appear, refresh, and are processed in your application. Support use cases involving tracking, displaying, or managing sequences of AI prompt results, responses, or messages dynamically in developer tools or user-facing grids.
</div>

#### Example - configure initial prompt outputs

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }, { field: "age" }],
       dataSource: [{ name: "Jane Doe", age: 30 }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistant: {
           promptOutputs: [
             { 
               prompt: "Analyze the grid data", 
               output: "This grid contains user information with 1 record showing Jane Doe, age 30." 
             }
           ]
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistant.promptOutputs.id `String`

The id of the prompt output. If none is provided, the id will be generated as a `kendo.guid()`.


<div class="meta-api-description">
Set, assign, or manage a unique identifier for prompt outputs to enable accurate referencing, tracking, updating, or matching of responses within AI assistant workflows or Grid AI environments. Control, configure, or specify output IDs to maintain consistency across sessions, link responses to prompts, or handle output elements programmatically. Generate or override default automatically created IDs for precise mapping, retrieval, and integration with components requiring distinct output identification. Use unique keys, identifiers, or labels to organize and reference generated content effectively across interactions and AI-driven processes.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          promptOutputs: [
            {
              id: "output-1",
              prompt: "Generate marketing text",
              output: "This is the generated marketing content."
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.promptOutputs.output `String`

The output content generated from the prompt.


<div class="meta-api-description">
Access, display, extract, or manipulate the content produced by an AI assistant in response to a specific prompt within a grid or tabular interface, enabling retrieval, rendering, storage, analysis, transformation, or inspection of generated text, structured data, or responses for use cases such as display in UI components, logging outputs, performing custom post-processing, or integrating AI-generated results programmatically during initialization or dynamic updates.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          promptOutputs: [
            {
              id: "marketing-output",
              prompt: "Create product description",
              output: "Delicious beverages perfect for any time of day. Our premium tea and coffee selections offer exceptional quality and taste."
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.promptOutputs.prompt `String`

The prompt text used to generate this output.


<div class="meta-api-description">
Configure or update the input text prompt that directs the AI assistant’s generated responses, enabling you to specify, change, or bind the exact wording used to produce output content; this includes setting, modifying, or controlling the prompt string to guide assistant replies, generate dynamic responses based on custom input, and programmatically influence assistant content creation.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          promptOutputs: [
            {
              id: "summary-output",
              prompt: "Summarize the product data in this grid and provide insights about the beverage category",
              output: "The grid contains beverage products including tea and coffee."
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.encodedPromptOutputs `Boolean` *(default: true)*

Specifies whether the prompt outputs are HTML-encoded before being displayed. When set to false, ensure output is properly sanitized to prevent XSS attacks.


<div class="meta-api-description">
Adjust how AI assistant prompt results are rendered by toggling between showing raw HTML or automatically HTML-encoded content, enabling configuration of safe display formats to prevent cross-site scripting vulnerabilities, controlling whether to output encoded markup or unescaped raw data, managing encoding settings for AI-generated prompts to ensure secure, sanitized rendering, setting and enabling automatic HTML-encoding of assistant responses or disabling it to handle raw output with manual sanitization, configuring display output modes to balance ease of use and security by encoding or bypassing encoding on AI prompt results.
</div>

#### Example - allow HTML in outputs

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistant: {
           encodedPromptOutputs: false
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistant.speechToText `Boolean|Object` *(default: true)*

Configures speech-to-text functionality for the AI Assistant prompt input.


<div class="meta-api-description">
Control voice recognition and live speech transcription for interactive AI assistant input within the grid interface by configuring language settings, starting and stopping speech capture, enabling continuous listening modes, handling partial or interim transcription results, and managing user microphone permissions and access. Set how audio is converted to text in real-time for prompt entry, including callbacks or events when transcripts update or complete, to optimize voice input workflows, accessibility features, and user interaction with the AI assistant prompt for various speech-to-text applications and voice command scenarios.
</div>

#### Example - enable speech-to-text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistant: {
           speechToText: {
             integrationMode: "webSpeech",
             lang: "en-US",
             continuous: false
           }
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistant.speechToText.integrationMode `String` *(default: "webSpeech")*

Specifies the integration mode for speech recognition. Available modes: `"webSpeech"`, `"none"`.


<div class="meta-api-description">
Configure speech-to-text integration modes to enable or disable voice recognition features, control the use of built-in voice capture, choose between leveraging browser-based speech recognition APIs such as Web Speech for capturing and transcribing spoken input, or completely turn off automatic speech processing and voice-to-text conversion capabilities within the system. This setting helps manage voice command processing, audio transcription, dictation features, and speech input handling by selecting appropriate recognition methods or disabling them for scenarios without voice interaction needs.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          speechToText: {
            integrationMode: "webSpeech"
          }
        }
      }
    });
    </script>

### ai.aiAssistant.speechToText.lang `String` *(default: "en-US")*

Specifies the language code for speech recognition.


<div class="meta-api-description">
Set or customize the spoken language for voice-to-text transcription, enabling the system to recognize, interpret, and convert speech accurately in various languages, dialects, or regional variants such as English US, French France, or other BCP-47 standard language tags. Control or specify the language code to enhance speech recognition precision, support multilingual audio inputs, enable localized voice commands, and ensure correct transcription for different spoken language settings, accents, or recognition models. Adjust the recognition language to match user speech patterns, optimize voice assistant understanding, enable multilingual support, or switch recognition targets seamlessly.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          speechToText: {
            lang: "en-GB"
          }
        }
      }
    });
    </script>

### ai.aiAssistant.speechToText.continuous `Boolean` *(default: false)*

Specifies whether to continue listening after a result is received.


<div class="meta-api-description">
Enable continuous automatic speech recognition that keeps the microphone active to capture ongoing spoken input, allowing real-time streaming of multiple speech results without needing to manually restart or pause, useful for voice commands, dictation, conversational AI interactions, live transcription, and uninterrupted audio processing where the system continuously listens, processes, and transcribes speech seamlessly in a single session.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          speechToText: {
            continuous: true
          }
        }
      }
    });
    </script>

### ai.aiAssistant.speechToText.interimResults `Boolean` *(default: false)*

Specifies whether to return interim results during speech recognition.


<div class="meta-api-description">
Control the live streaming of partial speech recognition results to receive real-time, interim transcripts during ongoing audio input, enabling dynamic captions, progressive speech-to-text conversion, continuous voice transcription, and immediate feedback for voice interfaces or applications. Configure or enable partial result updates, toggle real-time transcription snippets, and set boolean flags to determine whether temporary or incomplete recognition outputs are returned as the user speaks, facilitating smooth user experiences with streaming audio transcription, conversational AI, and live voice interaction scenarios.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          speechToText: {
            interimResults: true
          }
        }
      }
    });
    </script>

### ai.aiAssistant.speechToText.maxAlternatives `Number` *(default: 1)*

Specifies the maximum number of alternatives to return from speech recognition.


<div class="meta-api-description">
Control the number of alternative speech-to-text transcriptions generated, enabling retrieval of multiple candidate recognition results for comparison, confidence scoring, or further processing. Configure how many recognition hypotheses or n-best alternatives are returned from audio input, allowing selection among various transcription options, handling ambiguous speech recognition outputs, or improving accuracy by evaluating multiple possible interpretations. Adjust the setting to obtain a range of alternative text outputs from voice data to support use cases like confidence analysis, error correction, or advanced post-processing of speech recognition results.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          speechToText: {
            maxAlternatives: 3
          }
        }
      }
    });
    </script>

### ai.aiAssistant.promptTextArea `Object`

Configuration options for the TextArea component used in the AI Assistant prompt view.


<div class="meta-api-description">
Adjust and customize the input area for AI assistant prompts within a grid interface by setting options related to text input fields, including controlling the size, placeholder text, default or bound values, input event handling, and overall appearance. Tailor how the prompt text box behaves during user interaction, manage configurations for text area display and responsiveness, enable or disable input controls, bind prompt content dynamically, and fine-tune aspects like resizing and event callbacks to optimize user input experience in AI-driven grid environments.
</div>

#### Example - configure prompt textarea

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistant: {
           promptTextArea: {
             resize: "vertical",
             rows: 4,
             placeholder: "Ask AI about your grid data...",
             fillMode: "outline",
             rounded: "medium",
             size: "large",
             maxLength: 1000,
             label: {
               content: "Grid AI Prompt",
             }
           }
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistant.promptTextArea.fillMode `String`

Specifies the fill mode of the textarea. Available options: `"solid"`, `"outline"`, `"flat"`, `"none"`.


<div class="meta-api-description">
Adjust or customize the input field style for AI assistant prompts by configuring how the textarea is filled and bordered, including options to enable solid backgrounds, outlined borders, flat minimal styles, or no fill and border at all, controlling the visual presentation and user interface look of the prompt input area for clarity, accessibility, or aesthetic preferences.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          promptTextArea: {
            fillMode: "outline"
          }
        }
      }
    });
    </script>

### ai.aiAssistant.promptTextArea.inputMode `String`

Specifies the input mode attribute for mobile keyboards.


<div class="meta-api-description">
Set or customize the virtual keyboard type for text input areas to improve user typing experience on mobile devices by specifying input modes like text, search, email, telephone, numeric, or decimal, enabling optimized on-screen keyboards for prompts, chat inputs, or form fields to control input context and facilitate easier data entry, configuring how the mobile or tablet keyboard displays based on expected content during initialization or setup.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          promptTextArea: {
            inputMode: "text"
          }
        }
      }
    });
    </script>

### ai.aiAssistant.promptTextArea.label `Object`

Specifies the label configuration for the textarea.


<div class="meta-api-description">
Set or customize the label text, accessibility features like aria-label, visibility options, and styling of the input area where users type prompts in the AI assistant interface, enhancing clarity, user guidance, and screen reader compatibility for prompt input fields in Grid AI components.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          promptTextArea: {
            label: {
              content: "Enter your prompt",
              floating: true
            }
          }
        }
      }
    });
    </script>

### ai.aiAssistant.promptTextArea.label.content `String`

Specifies the label text content.


<div class="meta-api-description">
Customize the text label displayed for input fields where users type prompts, enabling setting, changing, or localizing the visible prompt area title, heading, or description to control what users see above or beside the prompt input box, including adjusting prompt area labels, field names, or interface captions to provide clear, contextual cues for user input in AI assistant or grid interfaces.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          promptTextArea: {
            label: {
              content: "AI Prompt Input"
            }
          }
        }
      }
    });
    </script>

### ai.aiAssistant.promptTextArea.label.floating `Boolean`

Specifies whether the label floats above the input.


<div class="meta-api-description">
Control the behavior of the prompt textarea label by enabling or disabling floating labels that move above the input field, configure the visual stacking or overlay of the label in forms, set whether the label stays inside the input area or floats when focused or filled, customize label positioning for better UX in input fields, adjust the label’s interaction style with input content, and manage floating placeholder text behavior in prompts or editable text areas.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          promptTextArea: {
            label: {
              content: "Prompt",
              floating: true
            }
          }
        }
      }
    });
    </script>

### ai.aiAssistant.promptTextArea.maxLength `Number`

Specifies the maximum number of characters allowed in the textarea.


<div class="meta-api-description">
Control the maximum number of characters or input length allowed in the AI assistant's text input area, configuring limits to enforce client-side validation, prevent overly long prompts, enable character count displays, or truncate user entries during initialization. Set or adjust the input size restrictions to manage user typing boundaries, input validation rules, and UI feedback for prompt length in interactive text fields.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          promptTextArea: {
            maxLength: 500
          }
        }
      }
    });
    </script>

### ai.aiAssistant.promptTextArea.overflow `String`

Specifies the overflow behavior. Available options: `"auto"`, `"hidden"`, `"visible"`, `"scroll"`.


<div class="meta-api-description">
Control the behavior of content that extends beyond the boundaries of a text input area in an AI assistant prompt, including options to enable or disable scrolling, clip overflowing text, always show scrollbars, or let content spill outside the visible area. Configure how long or large user input or generated text is displayed within a fixed-size prompt window by setting overflow handling to automatic scrollbar appearance, hidden overflow to prevent scrollbars and cut off excess content, visible overflow to expand beyond container limits, or persistent scrollbars for consistent navigation through lengthy text. Adjust, set, or manage overflow strategies for prompt text areas to improve user interaction with AI prompts, optimize text display, and control the visibility and navigability of extended text input or output within the interface.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          promptTextArea: {
            overflow: "auto"
          }
        }
      }
    });
    </script>

### ai.aiAssistant.promptTextArea.placeholder `String`

Specifies the placeholder text for the textarea.


<div class="meta-api-description">
Customize the placeholder or hint text shown inside the AI assistant's text input area to provide clear guidance, instructions, or example prompts when the input is empty, enhancing user experience, localization, accessibility, and clarity for various languages or contexts. Adjust, set, or configure this inline helper text to help users understand what to enter, offer context-aware tips, or improve form usability and accessibility standards for the AI prompt field in different applications or interfaces.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          promptTextArea: {
            placeholder: "Type your AI prompt here..."
          }
        }
      }
    });
    </script>

### ai.aiAssistant.promptTextArea.resize `String`

Specifies the resize behavior. Available options: `"none"`, `"both"`, `"horizontal"`, `"vertical"`.


<div class="meta-api-description">
Adjust and configure how the AI assistant's prompt input box can be resized by users, enabling or restricting the ability to change its size horizontally, vertically, in both directions, or disabling resizing entirely, controlling user interactions with the prompt area to customize UI flexibility, responsiveness, and layout behavior within the grid interface.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          promptTextArea: {
            resize: "vertical"
          }
        }
      }
    });
    </script>

### ai.aiAssistant.promptTextArea.rows `Number`

Specifies the number of visible text lines.


<div class="meta-api-description">
Adjust the visible height of a multi-line text input area by setting the number of text lines shown, enabling control over textarea size, layout spacing, and user input space for prompts or messages where more vertical room is needed; configure or customize textarea row count to optimize interface design, improve usability, and accommodate longer text entries or expandable input fields.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          promptTextArea: {
            rows: 4
          }
        }
      }
    });
    </script>

### ai.aiAssistant.promptTextArea.rounded `String`

Specifies the border radius. Available options: `"small"`, `"medium"`, `"large"`, `"full"`, `"none"`.


<div class="meta-api-description">
Adjust or customize the border radius, corner roundness, or curvature of the AI assistant prompt’s text input area within the Grid component, enabling developers to set styles like small, medium, large, full circular rounding, or no rounding at all. Control or configure the shape of the input field edges, manipulate the textarea’s visual softness or sharpness, tailor the UI appearance of the prompt box by modifying its rounded corners, and set these stylistic options during component setup or initialization for consistent design and user interface customization.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          promptTextArea: {
            rounded: "medium"
          }
        }
      }
    });
    </script>

### ai.aiAssistant.promptTextArea.size `String`

Specifies the size of the component. Available options: `"small"`, `"medium"`, `"large"`, `"none"`.


<div class="meta-api-description">
Adjust and configure the visible dimensions of the prompt input area in the AI assistant interface by setting predefined sizes like small, medium, large, or disabling fixed sizing altogether to allow dynamic resizing based on content or custom CSS styling. Enable control over the prompt box’s height and width to fit user preferences or layout requirements, including options to remove preset limits so the text area expands automatically as text grows, or to customize size programmatically or via style rules. This setting supports tailoring the input field’s size, scaling, and responsiveness in various user interface contexts, facilitating better input experience and flexible layout adaptation for prompting AI models.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          promptTextArea: {
            size: "large"
          }
        }
      }
    });
    </script>

### ai.aiAssistant.outputActions `Array` *(default: ["copy", "retry"])*

An array of action configurations for the output cards in the AI Assistant.


<div class="meta-api-description">
Set up and customize interactive buttons or menu items on AI assistant response cards within a grid interface by defining arrays of action configurations that specify labels, icons, visibility toggles, enabled or disabled states, event handlers, commands, and data bindings. Control how users can engage with assistant outputs by configuring clickable elements, contextual menus, action triggers, and dynamic parameters tied to each card. Enable, show, hide, or modify commands and callbacks on AI-generated cards to tailor interactions, workflow automation, or user input handling directly in assistant responses. Adjust and bind multiple output actions during initialization to manage response interface behavior, user commands, menu options, and interactive elements within assistant-generated grid components.
</div>

#### Example - configure output actions

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistant: {
           outputActions: [
             "copy",
             "retry",
             "rating",
             { command: "export", text: "Export", icon: "download" },
             { command: "share", text: "Share", icon: "share" }
           ]
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistant.outputActions.command `String`

The command identifier for the action.


<div class="meta-api-description">
Configure the action identifier or command name to specify and control which operation or function the AI output should trigger within a system or platform, enabling routing, execution, or binding of tasks, workflows, or handlers that respond to AI assistant outputs, whether built-in or custom-defined, supporting use cases like automating commands, linking AI responses to system actions, triggering workflows, or mapping output actions to preconfigured or programmable processes.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          outputActions: [
            {
              command: "copyOutput",
              text: "Copy",
              icon: "copy"
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.outputActions.text `String`

The text displayed on the action button.


<div class="meta-api-description">
Customize the text label displayed on an action button to control the call-to-action wording, enabling dynamic updates, localization, or binding of the button caption within a grid interface. Adjust, set, or configure the visible button text to reflect different prompts, labels, or commands that drive user interaction or trigger specific actions in a UI environment. Support changing the button wording at runtime for personalized, context-aware, or multi-language applications, ensuring flexible control over how action prompts appear to end users.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          outputActions: [
            {
              command: "export",
              text: "Export Results",
              icon: "download"
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.outputActions.icon `String`

The icon name for the action button.


<div class="meta-api-description">
Customize or configure the visual icon displayed on AI assistant action buttons within a grid interface by setting or changing the graphical symbol, image, or identifier that represents the output action control. Enable control over the appearance of interactive elements tied to AI-generated outputs, allowing developers to specify, select, or bind different icons for action triggers, buttons, or controls related to AI assistant responses in a grid layout. Adjust or set iconography to match desired UI design, user experience preferences, or functional needs when working with AI assistant features in grid components.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          outputActions: [
            {
              command: "share",
              text: "Share",
              icon: "share"
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.outputActions.fillMode `String`

Specifies the fill mode of the action button. Available options: `"solid"`, `"outline"`, `"flat"`, `"none"`.


<div class="meta-api-description">
Adjust or configure the button appearance for AI assistant outputs by selecting from various fill styles such as solid, outlined, flat, or no fill to customize emphasis, theme, or visual style of actionable elements; control how the button is rendered to match design preferences or UI requirements by enabling different fill modes that alter the background, border, or transparency, helping developers set, switch, or modify the visual presentation and prominence of interactive buttons in Grid AI assistant responses.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          outputActions: [
            {
              command: "save",
              text: "Save",
              fillMode: "outline"
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.outputActions.rounded `String`

Specifies the border radius of the action button. Available options: `"small"`, `"medium"`, `"large"`, `"full"`, `"none"`.


<div class="meta-api-description">
Control and customize the curvature of action button corners within grid layouts by setting the border radius to various levels such as small, medium, large, fully rounded, or no rounding, enabling developers to configure the visual style and appearance of buttons in interfaces, adjust corner roundness, set the shape from sharp edges to pill shapes, and fine-tune UI elements for consistent design aesthetics and user experience across applications.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          outputActions: [
            {
              command: "refresh",
              text: "Refresh",
              rounded: "large"
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.outputActions.themeColor `String`

Specifies the theme color of the action button.


<div class="meta-api-description">
Customize the action button color by configuring or setting its theme, allowing alignment with your application’s primary or secondary palettes, brand colors, custom CSS values, or any desired color scheme to ensure visual consistency and cohesive UI design in the Grid component’s output actions.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          outputActions: [
            {
              command: "approve",
              text: "Approve",
              themeColor: "success"
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.outputActions.title `String`

Specifies the title attribute (tooltip) for the action button.


<div class="meta-api-description">
Configure or customize the hover tooltip text displayed for the AI action button within the Grid interface, enabling control over the descriptive label or title shown when users mouse over or focus on the button. Adjust the hover information, tooltip content, or action button title attribute to improve user guidance, accessibility, and quick info display related to AI-generated outputs or assistant actions in grid layouts. Tailor what text appears on hover for interactive AI controls, ensuring clarity for users seeking contextual hints, labels, or descriptive tooltips on interface elements.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          outputActions: [
            {
              command: "help",
              text: "Help",
              title: "Get help about this output"
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.outputActions.type `String`

Specifies the type of the action. Available options: `"button"`, `"spacer"`.


<div class="meta-api-description">
Configure the rendering mode of AI assistant output actions to determine whether they appear as clickable interactive buttons for user engagement or as non-interactive layout spacers that affect spacing and alignment. Enable, set, or control how assistant responses are presented visually within the interface by specifying action display types such as button-like elements for triggering functionality or spacer elements for organizing layout structure, adjusting interaction and display behavior dynamically in conversational AI outputs or UI components.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          outputActions: [
            {
              command: "action1",
              text: "Action 1",
              type: "button"
            },
            {
              type: "spacer"
            },
            {
              command: "action2", 
              text: "Action 2",
              type: "button"
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.outputTemplate `Function`

A template function for customizing the display of output content in the AI Assistant.


<div class="meta-api-description">
Format and customize AI assistant responses in the grid by controlling how output is rendered, transformed, or presented using template functions that support conditional styling, dynamic content integration, and data-driven layouts. Enable flexible output customization to configure appearance, adjust response formatting, tailor assistant-generated content display, apply custom templates, and integrate with data bindings for enhanced visual rendering of results in various use cases or contexts.
</div>

#### Example - customize output template

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistant: {
           outputTemplate: function({ output, content }) {
             return `<div class="custom-grid-output">
               <h4>Grid Analysis</h4>
               <div class="content">${content}</div>
             </div>`;
           }
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistant.promptSuggestionItemTemplate `String|Function`

The template of the prompt suggestion item in the AI Assistant.


<div class="meta-api-description">
Customize or configure the display and rendering of prompt suggestions in the AI assistant by defining templates or markup that control the appearance, layout, icons, text formatting, and overall presentation of suggestion items in the list. Enable personalized or dynamic styling for each suggestion, adjust how suggestion content is shown, set custom structures for suggestions, and fine-tune the visual and functional elements of the prompt suggestions to enhance user interface and user experience in AI-driven assistance environments.
</div>

#### Example - customize suggestion template

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistant: {
           promptSuggestions: [
             "Analyze grid data",
             "Find patterns"
           ],
           promptSuggestionItemTemplate: function({ suggestion }) {
             return `<div class="k-prompt-suggestion custom-grid-suggestion">
               <i class="k-icon k-i-chart-line"></i>
               ${suggestion}
             </div>`;
           }
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistant.toolbarItems `Array`

An array of toolbar items to display in the AI Assistant header toolbar.


<div class="meta-api-description">
Customize the header toolbar for the AI Assistant by specifying an array of toolbar item definitions to add, remove, reorder, or modify buttons, icons, commands, or actions that appear in the Grid's AI Assistant interface. Enable control over which controls, shortcuts, or interactive elements show in the toolbar, how they are arranged, and how users can access different features or functions from the header area. Tailor the top toolbar area for AI Assistant with configurable items to fit specific workflows, integrate custom commands, or adjust displayed options and tools. Adjusting the header toolbar arrangement, content, and available toolbar actions ensures developers can optimize the UI and functionality for diverse usage scenarios and customization needs.
</div>

#### Example - add custom toolbar items

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistant: {
           toolbarItems: [
             { type: "spacer" },
             { 
               type: "button", 
               icon: "gear", 
               fillMode: "flat", 
               rounded: "full", 
               click: function(e) { 
                 console.log("Settings clicked"); 
               } 
             },
             { 
               type: "button", 
               icon: "x", 
               fillMode: "flat", 
               rounded: "full", 
               themeColor: "primary",
               click: function(e) { 
                 console.log("X clicked");
               } 
             }
           ]
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistant.toolbarItems.type `String`

The type of the toolbar item. Available options: `"button"`, `"spacer"`.


<div class="meta-api-description">
Define the display style and interactive behavior of toolbar elements within the AI assistant interface, enabling configuration of toolbar components as clickable buttons or non-interactive spacers to control layout and user interaction, customize toolbar item rendering modes, switch between actionable controls and visual separators, set toolbar element types for interface design, and manage spacing versus actionable elements in toolbar customization.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          toolbarItems: [
            {
              type: "button",
              text: "Custom Action"
            },
            {
              type: "spacer"
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.toolbarItems.icon `String`

The icon name of the toolbar item.


<div class="meta-api-description">
Customize or configure the graphical icon displayed on an AI assistant’s toolbar button within the Grid interface by specifying the icon name as a string, enabling the system to render the appropriate themed symbol or CSS-based icon class. Control the visual representation, set or change toolbar glyphs, assign custom icons by name, and adjust toolbar item imagery to match theme or design. Enable or change toolbar button icons, select icon fonts or CSS classes dynamically for toolbar entries, and modify the assistant interface’s visual elements to enhance user experience with specific iconography.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          toolbarItems: [
            {
              type: "button",
              icon: "gear",
              text: "Settings"
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.toolbarItems.fillMode `String`

The fill mode of the toolbar item. Available options: `"solid"`, `"outline"`, `"flat"`, `"none"`.


<div class="meta-api-description">
Customize the visual style and appearance of toolbar buttons by configuring background fill options such as solid color fills, outlined borders, flat designs without depth, or completely transparent backgrounds, enabling you to set, adjust, or toggle button styles for interface toolbars, control UI button backgrounds, or specify how toolbar items are rendered with filled, outlined, flat, or invisible modes.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          toolbarItems: [
            {
              type: "button",
              text: "Action",
              fillMode: "outline"
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.toolbarItems.rounded `String`

The rounded mode of the toolbar item. Available options: `"small"`, `"medium"`, `"large"`, `"full"`, `"none"`.


<div class="meta-api-description">
Set or customize the corner radius and shape of toolbar buttons in a grid interface by configuring border-radius options like small, medium, large, full pill-shaped edges, or sharp square corners. Control or adjust toolbar item rounding for visual style, button curvature, user interface rounding preferences, or design consistency by selecting from multiple predefined roundedness levels to create subtle curves, pronounced edges, fully rounded pill shapes, or completely square toolbar controls. Modify button corner styling, enable or disable rounded corners, and fine-tune toolbar aesthetics in application toolbars, user interfaces, or component libraries to achieve the desired button shape and feel.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          toolbarItems: [
            {
              type: "button",
              text: "Action",
              rounded: "large"
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.toolbarItems.themeColor `String`

The theme color of the toolbar item.


<div class="meta-api-description">
Customize and define the color scheme, accent, or background hues for AI assistant toolbar elements within the interface by setting or adjusting the theme color, enabling control over visual styling, appearance, and branding of toolbar buttons or icons to match user preferences or design requirements.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          toolbarItems: [
            {
              type: "button",
              text: "Primary Action",
              themeColor: "primary"
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.toolbarItems.click `Function`

The click event handler of the toolbar item.


<div class="meta-api-description">
Manage and customize actions triggered by clicking toolbar buttons in the AI assistant interface within the grid, including setting event handlers for toolbar item interactions, executing custom functions upon toolbar clicks, enabling or disabling default behaviors, controlling toolbar button responses, responding to user clicks with custom logic, integrating grid component method calls during toolbar interactions, capturing and handling click events on assistant tools, modifying toolbar button functionalities dynamically, and defining specific actions tied to user input on AI assistant toolbar controls.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          toolbarItems: [
            {
              type: "button",
              text: "Custom Action",
              click: function(e) {
                alert("Custom toolbar item clicked!");
              }
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.showOutputSubtitleTooltip `Boolean` *(default: false)*

Controls whether the subtitle of the card in the output view displays a tooltip containing the full content of the subtitle.


<div class="meta-api-description">
Configure displaying complete subtitle text as a tooltip on hovered cards within the Grid output view, enabling users to see full, potentially truncated or overflowing subtitles by activating tooltip popups on card subtitles; control whether subtitles show expanded text previews on mouse hover, toggle subtitle tooltip visibility for better readability of clipped or shortened card subtitles in grid layouts, and manage hover interactions that reveal entire subtitle content to improve accessibility and user experience with subtitle overflow handling.
</div>

#### Example - enable output subtitle tooltip

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistant: {
           showOutputSubtitleTooltip: true
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistant.views `Array`

An array of view configurations for the AI Assistant.


<div class="meta-api-description">
Set up and customize multiple AI assistant layouts by configuring an array of view settings that control how different assistant interfaces appear and behave within the grid environment. Enable switching between assistant perspectives, binding specific templates, commands, and data connections to tailor the assistant’s presentation and interactions. Manage various display options for the AI helper, specify distinct view configurations, define user interface layouts, and assign commands or data bindings for each view during the grid setup or initialization process to optimize assistant behavior and user experience.
</div>

#### Example - configure custom views

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistant: {
           views: [
             {
               type: "prompt",
               name: "ask",
               buttonText: "Ask AI",
               buttonIcon: "comment"
             },
             {
               type: "output", 
               name: "results",
               buttonText: "Results",
               buttonIcon: "chart-line"
             },
             {
               type: "custom",
               name: "insights",
               buttonText: "Insights",
               buttonIcon: "light-bulb",
               viewTemplate: "<div>Custom insights view for grid data</div>"
             }
           ]
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistant.views.buttonText `String`

The text of the toolbar button rendered for the view.


<div class="meta-api-description">
Customize or configure the text label, caption, or title displayed on toolbar buttons within a grid or table view interface, enabling control over button wording, call-to-action phrasing, or interactive element names; this includes setting, changing, or updating the text on buttons in grid layouts, data tables, or list views for clarity, localization, user interface personalization, or workflow optimization.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          views: [
            {
              type: "custom",
              name: "analytics",
              buttonText: "Analytics View"
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.views.buttonIcon `String`

The icon name of the toolbar button rendered for the view.


<div class="meta-api-description">
Set or change the icon displayed on a grid view's toolbar button to visually represent the view, configure or customize button icons for grid toolbars, assign specific icon names for toolbar or action buttons, control the visual appearance of grid buttons, and manage the icon used to identify or highlight particular views within a grid interface.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          views: [
            {
              type: "custom",
              name: "charts",
              buttonText: "Charts",
              buttonIcon: "chart-line"
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.views.type `String`

The type of the view. Available options: `"prompt"`, `"output"`, `"commands"`, `"custom"`.


<div class="meta-api-description">
Control or configure the display mode of an AI assistant interface within a grid layout by specifying the view variant such as prompt input for user queries, output view to show generated AI responses, a command list presenting available actions or controls, or a fully customizable custom renderer that defines unique interface behavior; enables setting, switching, or customizing the assistant’s presentation style to match use cases including user inputs, AI outputs, action commands, and bespoke visual components.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          views: [
            {
              type: "commands",
              name: "customCommands",
              buttonText: "Commands"
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.views.name `String`

The name of the view. Must be unique.


<div class="meta-api-description">
Set a distinct identifier or label to uniquely reference, select, switch, or manage a specific view within a collection or grid, enabling programmatic access, retrieval, storage, and customization of view-specific settings while ensuring no duplicates exist for seamless integration and control over multiple views or layouts.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          views: [
            {
              type: "custom",
              name: "dataInsights",
              buttonText: "Insights"
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.views.viewTemplate `String|Function`

The template of the view content.


<div class="meta-api-description">
Configure or customize the display and layout of AI assistant views within a grid by defining templates, markup strings, or rendering functions that control how content is structured and presented, enabling dynamic HTML generation, flexible bindings, personalized interface layouts, and tailored rendering logic to match specific UI requirements, view customization, template configuration, dynamic content rendering, and layout control.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          views: [
            {
              type: "custom",
              name: "summary",
              buttonText: "Summary",
              viewTemplate: "<div class='summary-view'><h3>Data Summary</h3><p>View data insights here.</p></div>"
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.views.footerTemplate `String|Function`

The template of the view footer.


<div class="meta-api-description">
Adjust or set the bottom section content of AI assistant interfaces within the grid layout by defining custom templates that control footer appearance, text, HTML elements, dynamic bindings, or markup injection; configure and customize how the footer area is rendered, displayed, or personalized in assistant views to match UI design, branding, or content requirements, enabling flexible footers with tailored text, links, status messages, or interactive elements at the base of the component.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          views: [
            {
              type: "custom",
              name: "report",
              buttonText: "Report",
              viewTemplate: "<div>Report content</div>",
              footerTemplate: "<div class='footer'>Generated at: #{new Date()}</div>"
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.views.initializeComponents `Function`

A function executed when the view is rendered to initialize components.


<div class="meta-api-description">
configure post-render setup for user interface elements by providing a function that executes once the view is rendered to initialize child components, set event listeners, bind data models, manipulate DOM structure, control widget initialization, handle dynamic UI updates, enable custom component configuration, and ensure proper setup of interactive grid elements after rendering completes.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          views: [
            {
              type: "custom",
              name: "dashboard",
              buttonText: "Dashboard",
              viewTemplate: "<div id='dashboard-content'></div>",
              initializeComponents: function(container) {
                container.find("#dashboard-content").html("Dashboard initialized!");
              }
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.views.promptCommands `Array`

The commands to display in the prompt view.


<div class="meta-api-description">
Customize and control the list of commands or action buttons displayed in the AI assistant’s prompt interface, allowing configuration and setup of which user interactions, shortcuts, or available features appear when the assistant is shown. Enable, set, or modify prompt commands to tailor the assistant’s response options, control visible functionality, configure command availability on initialization, and manage which controls users can access in conversational or interactive prompt environments. Adjust, filter, or specify the actionable commands in the assistant’s prompt view for personalized user experiences, command visibility management, and user interface customization.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          views: [
            {
              type: "prompt",
              name: "customPrompt",
              buttonText: "Custom Prompts",
              promptCommands: [
                {
                  id: "analyze",
                  text: "Analyze Data",
                  icon: "chart"
                }
              ]
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.views.promptCommands.id `String`

The id of the command item.


<div class="meta-api-description">
Identify, specify, or reference a unique command entry within an AI assistant's prompt command list by setting or matching its identifier key, enabling precise targeting, binding, lookup, or retrieval of individual prompt commands within a grid or component setup. This property supports scenarios where developers need to control, configure, access, or manipulate specific AI-driven prompt actions, commands, or operations by their distinct IDs for integration, customization, or dynamic invocation purposes.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          views: [
            {
              type: "prompt",
              name: "quickPrompts",
              promptCommands: [
                {
                  id: "summarize",
                  text: "Summarize Data",
                  icon: "list"
                }
              ]
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.views.promptCommands.text `String`

The text of the command item.


<div class="meta-api-description">
Set or customize the visible caption, label, or button text displayed for a command in an AI assistant prompt interface, enabling control over how command options appear in menus, buttons, or tooltips; configure or rename command titles, labels, or prompt command names to enhance user interface clarity, searchability, and accessibility within assistant interactions, chat commands, or prompt-driven workflows.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          views: [
            {
              type: "prompt",
              name: "analysis",
              promptCommands: [
                {
                  id: "trend",
                  text: "Find Trends",
                  icon: "trend-up"
                }
              ]
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.views.promptCommands.icon `String`

The icon name of the command item.


<div class="meta-api-description">
Configure or customize the visual symbol or icon representation displayed alongside AI Assistant prompt commands within Grid views, enabling control over which font icon or graphical identifier appears for each command item, supporting setup of command button icons, graphical labels, or symbolic markers during promptCommands configuration, to visually distinguish or enhance interface elements related to AI interaction commands with flexible icon naming and selection options.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          views: [
            {
              type: "prompt",
              name: "insights",
              promptCommands: [
                {
                  id: "insights",
                  text: "Generate Insights",
                  icon: "lightbulb"
                }
              ]
            }
          ]
        }
      }
    });
    </script>

### ai.aiAssistant.messages `Object`

The text messages displayed in the AI Assistant. Use this option to customize or localize the messages.


<div class="meta-api-description">
Customize, configure, or localize AI assistant text content, prompts, responses, chat messages, system notifications, or interaction text to tailor conversational language, wording, tone, or user-facing messages in the AI-driven interface; enable message overrides, text adjustments, translations, or personalized dialogue replacements to modify the assistant’s displayed communications within Grid or similar AI platforms.
</div>

#### Example - customize AI Assistant messages

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistant: {
           messages: {
             promptPlaceholder: "Ask AI about your grid data...",
             generateOutput: "Analyze",
             outputTitle: "Grid Analysis Result",
             promptView: "Ask Grid AI",
             outputView: "Analysis Results"
           }
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistant.messages.commandsView `String` *(default: "")*

The text of the commands view button.


<div class="meta-api-description">
Customize, modify, or localize the label or text of the button that opens or toggles the Grid commands view panel; set, update, or configure the user interface element's caption for better clarity, language adaptation, or branding purposes in command menus, control panels, or interactive toolbars related to Grid command access and display.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          messages: {
            commandsView: "Quick Commands"
          }
        }
      }
    });
    </script>

### ai.aiAssistant.messages.copyOutput `String` *(default: "Copy")*

The text of the copy output button.


<div class="meta-api-description">
Customize, set, or configure the text label for the copy output button in the AI assistant interface, enabling control over button wording, translation, localization, and language adjustment for user prompts, copy actions, or output sharing features within the Grid AI assistant environment.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          messages: {
            copyOutput: "Copy to Clipboard"
          }
        }
      }
    });
    </script>

### ai.aiAssistant.messages.customView `String` *(default: "Custom View")*

The text of the custom view button.


<div class="meta-api-description">
Control and customize the label text for a specialized button in a grid or data view interface, enabling you to set, configure, or localize the displayed wording for custom view options, tailor button captions for different languages or user preferences, modify interface elements that trigger custom layouts, and manage how the custom view feature is presented or described within user interfaces or dashboards.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          messages: {
            customView: "Analytics Dashboard"
          }
        }
      }
    });
    </script>

### ai.aiAssistant.messages.generateOutput `String` *(default: "Generate")*

The text of the generate output button.


<div class="meta-api-description">
Control and customize the text label for the generate output button within the AI assistant grid component, enabling localization, translation, or modification of the button wording to match different languages, user preferences, or branding requirements. Adjust, configure, or set the displayed text for the generate output action to tailor user interface prompts, enhance accessibility, and improve clarity in the AI assistant’s generation workflow. This supports use cases such as changing button captions, adapting to internationalization needs, or refining UI elements for diverse user scenarios.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          messages: {
            generateOutput: "Create Analysis"
          }
        }
      }
    });
    </script>

### ai.aiAssistant.messages.outputRetryTitle `String` *(default: "Generated with AI")*

The title of the output card when regenerated.


<div class="meta-api-description">
Customize, control, or configure the title text displayed when an AI assistant regenerates or retries output cards, enabling you to set or update the header or label shown during output retries, dynamic message updates, and repeated responses within AI-driven grid interfaces or chat assistants. This includes adjusting titles for retry attempts, output refreshes, or error recovery messages, allowing personalized or context-specific naming for AI assistant response elements to improve user interaction and clarity.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          messages: {
            outputRetryTitle: "AI Analysis (Regenerated)"
          }
        }
      }
    });
    </script>

### ai.aiAssistant.messages.outputTitle `String` *(default: "Generated with AI")*

The title of the output card.


<div class="meta-api-description">
Configure and customize the displayed title text for AI assistant output cards, enabling localization, setting custom headings, controlling the label shown on response cards, and modifying the output header to match different languages or personalized phrasing in conversational interfaces and AI response displays.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          messages: {
            outputTitle: "Grid Data Analysis"
          }
        }
      }
    });
    </script>

### ai.aiAssistant.messages.outputView `String` *(default: "Output")*

The text of the output view button.


<div class="meta-api-description">
Configure or customize the text label displayed on the AI assistant's output view button, enabling you to set, rename, or control the button caption that appears within the Grid AI interface for output actions, responses, or results. Adjust the output button wording, modify the label shown to users, set the call-to-action text, or define the visible output control button name to tailor user interaction and clarity in displaying AI-generated outputs.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          messages: {
            outputView: "Results"
          }
        }
      }
    });
    </script>

### ai.aiAssistant.messages.promptPlaceholder `String` *(default: "Ask or generate content with AI")*

The placeholder text of the textarea input.


<div class="meta-api-description">
Set or customize the placeholder text, hint text, or default prompt message shown inside an AI assistant’s input box, textarea, or chat prompt field within a grid or panel layout. Configure, change, or localize the initial text that guides users when typing commands, questions, or input for an AI assistant embedded in a UI grid. Control the placeholder string that appears in the assistant’s text input area to improve user guidance, UX clarity, or contextual hints before submitting queries or messages. Adjust the prompt placeholder text displayed in AI chat or assistant input components embedded in interfaces using grid structures.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          messages: {
            promptPlaceholder: "Ask AI to analyze your grid data..."
          }
        }
      }
    });
    </script>

### ai.aiAssistant.messages.promptSuggestions `String` *(default: "Prompt Suggestions")*

The text of the prompt suggestions toggle button.


<div class="meta-api-description">
Customize or configure the text labels and toggle controls for AI assistant prompt suggestions to support localization, translation, or changing the default wording of suggested prompts, enabling developers to tailor or enable/disable prompt recommendation displays in different languages or contexts.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          messages: {
            promptSuggestions: "Quick Ideas"
          }
        }
      }
    });
    </script>

### ai.aiAssistant.messages.promptView `String` *(default: "Ask AI")*

The text of the prompt view button.


<div class="meta-api-description">
Customize or localize the text displayed on the prompt view button within the AI assistant interface, enabling you to set, change, or translate the label that appears for user prompts, messages, or interactions; control the wording shown on prompt-related buttons for better user experience, multilingual support, or branding in conversational AI contexts.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          messages: {
            promptView: "Chat with AI"
          }
        }
      }
    });
    </script>

### ai.aiAssistant.messages.retryGeneration `String` *(default: "Retry")*

The text of the retry generation button.


<div class="meta-api-description">
Configure the text label for retrying content creation within the AI assistant interface, enabling customization, localization, and control over the retry generation button’s display text, allowing developers to set, modify, or translate the prompt users see when requesting a new AI-generated response or regenerating output after a failure or unsatisfactory result.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          messages: {
            retryGeneration: "Try Again"
          }
        }
      }
    });
    </script>

### ai.aiAssistant.messages.ratePositive `String` *(default: "")*

The text of the positive rating button.


<div class="meta-api-description">
Customize or configure the text label for the positive feedback or thumbs-up button in the AI assistant interface, enabling localization, translation, or setting a custom message for confirming satisfaction, approval, or positive rating responses from users, including modifying prompts, adjusting sentiment indicators, and tailoring user interaction wording to different languages or contexts.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          messages: {
            ratePositive: "Good"
          }
        }
      }
    });
    </script>

### ai.aiAssistant.messages.rateNegative `String` *(default: "")*

The text of the negative rating button.


<div class="meta-api-description">
Customize and set the text label for the negative feedback or dislike button within AI assistant message interactions, enabling localization and control over how users express dissatisfaction or negative ratings in the conversational interface. Configure or change the wording for negative response prompts, adjust the phrasing of rejection or downvote options, and tailor the language for user inputs that indicate unfavorable opinions or criticism in AI assistant dialogues. Control the display text that corresponds to negative user ratings, dislikes, or feedback buttons in AI chat or assistant message environments to optimize user experience across different languages and contexts.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          messages: {
            rateNegative: "Poor"
          }
        }
      }
    });
    </script>

### ai.aiAssistant.messages.stopGeneration `String` *(default: "Stop Generation")*

The aria-label and title of the stop generation button.


<div class="meta-api-description">
Control and customize the accessibility labels and tooltip text for the stop generation button, enabling you to set descriptive aria-labels and titles that improve screen reader support, user interface clarity, and button identification when halting or interrupting ongoing generation processes in a grid environment. Adjust, configure, or define accessible naming and descriptions for the stop action control to enhance usability, accessibility compliance, and user experience during content or data generation stoppage.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          messages: {
            stopGeneration: "Cancel Generation"
          }
        }
      }
    });
    </script>

### ai.aiAssistant.commandExecute

Triggered when a command item from the Commands view is clicked. The panel bar dataItem of the selected item is available through the event argument.


<div class="meta-api-description">
Configure command item click handling and execute custom logic when users interact with commands in the grid or panel bar. Enable event capturing on command selections to access detailed information about the clicked command item, inspect data fields, trigger navigations, perform updates, or run tailored actions based on the selected command. Control command execution flow during user interactions, respond dynamically to command clicks, and integrate custom behaviors, actions, or workflows tied to specific command items within grid commands or panel interfaces.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          commandExecute: function(e) {
            console.log("Command executed:", e.item.text);
          }
        }
      }
    });
    </script>

### ai.aiAssistant.promptRequest

Triggered when the prompt view Generate output button is clicked. The prompt text is available through the event argument. Suitable to make a request to the AI service to receive an output. Use the `addPromptOutput` method to add the generated output to the `promptOutputs` collection.

The `prompt`, `output`, `history`, `isRetry` and `response` properties are available in the event argument. When the output is generated after clicking the retry button of an output, the `isRetry` property is `true` and the `output` property is the output content of the output card. The history property is an array of prompt outputs generated before the current output.


<div class="meta-api-description">
Capture and handle user prompt submissions triggered by clicking the generate button in an AI interaction grid, including managing asynchronous results from AI services with access to the original prompt text, generated outputs, retry status indicating if the response is a repeated attempt, and the entire history of prior outputs; enable integration by intercepting prompt requests, processing generated content, appending new AI responses to output collections, tracking retries for error handling or regeneration, and maintaining conversational context through output history arrays for continuous or iterative AI prompt-response workflows.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          promptRequest: function(e) {
            console.log("Prompt request:", e.prompt);
            // Simulate AI response
            e.sender.addPromptOutput(e.prompt, "AI analysis result for: " + e.prompt);
          }
        }
      }
    });
    </script>

### promptResponse

Triggered when the AI service response is received. The response data is available through the event argument. Triggered only when the `serviceUrl` option is set.


<div class="meta-api-description">
Manage and customize reactions to AI-generated outputs within grid data structures by configuring event handlers that capture responses from external AI services, enabling retrieval of full response payloads to process model outputs, update grid rows dynamically, display messages, or record telemetry data; this interaction activates when external AI service endpoints are specified and supports real-time processing and integration of AI results into data grids for enhanced automation, monitoring, and user feedback workflows.
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

##### e.response `Object`

The original response object.

##### e.isRetry `Boolean`

Whether this is a retry operation.

#### Example
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "product" }, { field: "category" }],
       dataSource: [{ product: "Tea", category: "Beverages" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistant: {
           promptResponse: (e) => {
              console.log("Prompt respones:", e);
           } 
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>


### ai.aiAssistant.outputAction

Triggered when an action button on an output card is clicked. This event is fired for both built-in and custom actions.


<div class="meta-api-description">
Handle and respond to user interactions when clicking on buttons or action triggers within AI-generated output cards, including both default and customized action buttons, allowing you to capture and process clicks, manage action events, listen for card button presses, and enable interactive responses or workflows based on user engagement with AI output components inside a grid or interface environment.
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
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "product" }, { field: "category" }],
       dataSource: [{ product: "Tea", category: "Beverages" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistant: {
           outputAction: (e) => {
            console.log("outputAction:", e);
           }
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistant.promptRequestCancel

Triggered when a prompt request is cancelled, typically by clicking the stop generation button during streaming operations.


<div class="meta-api-description">
Detect and manage cancellation of ongoing AI prompt requests or generation streams by capturing user-initiated stop actions such as clicking a cancel or abort button during active response generation; control interruption of streaming data, halt further partial result processing, release allocated resources, synchronize UI updates to reflect stopped operations, and ensure seamless termination of asynchronous prompt handling workflows to maintain application responsiveness and user experience during interactive AI assistant sessions.
</div>

#### Event Data

##### e.output `Object` *(optional)*

The output object being generated when the cancellation occurred.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistant: {
          promptRequestCancel: function(e) {
            console.log("AI request cancelled");
            if (e.output) {
              console.log("Partial output was:", e.output);
            }
          }
        }
      }
    });
    </script>

### ai.aiAssistantWindow `Object`

Defines the configuration options for the AI AssistantWindow in the Grid.


<div class="meta-api-description">
Set up and customize the AI assistant interface within Grid to control its appearance, interaction behavior, data bindings, command handling, callback functions, prompt customization, user controls, and integration settings. Enable fine-tuning of runtime options to tailor the assistant’s responsiveness, context awareness, command execution, visual layout, user input processing, event handling, and workflow automation within the grid environment, ensuring seamless embedding, adaptive responses, and versatile control over AI-driven assistance features.
</div>

#### Example - configure AI AssistantWindow

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "productName" }, { field: "unitPrice" }],
       dataSource: [{ productName: "Coffee", unitPrice: 12.99 }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           promptRequestCancel: (e) => {
            console.log("Request canceled!");
           }
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.actions `Array`

The buttons for interacting with the AI AssistantWindow.

The predefined array values are:

* `Close`
* `Refresh`
* `Minimize`
* `Maximize`
* `Pin`


<div class="meta-api-description">
Control and customize the set of interactive buttons displayed in the AI assistant panel within the grid interface by specifying which actions such as closing, refreshing, minimizing, maximizing, or pinning are enabled, allowing developers to configure user interface controls, tailor button visibility, manage user interaction options, set available commands for the assistant window, and adjust which functionalities are accessible for efficient assistant window management and user experience optimization.
</div>

#### Example - configure AI AssistantWindow actions

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           actions: ["Minimize", "Maximize", "Close"]
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.animation `Boolean|Object`

A collection of `{Animation}` objects that is used to change the default animations for the AI AssistantWindow. When set to `false`, all animations will be disabled.


<div class="meta-api-description">
Control and customize the visual transitions, motion effects, and animation sequences for opening, closing, and switching states within the AI assistant window or popup in the grid interface. Enable, disable, or override default animations by configuring smooth entrance, exit, fade, slide, bounce, or any custom animation behaviors during grid initialization to tailor the assistant window’s dynamic appearance and responsiveness. Adjust animation settings to enhance user experience, optimize UI fluidity, or completely disable all animated transitions for the assistant interface panel.
</div>

#### Example - disable AI AssistantWindow animation

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           animation: false
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.animation.close `Object`

The animation that will be used when the AI AssistantWindow closes.


<div class="meta-api-description">
Control and customize the exit or closing animation for AI assistant windows, enabling you to set how the interface fades out, slides away, or transitions when dismissed, with options to configure animation type, duration, easing curves, timing functions, and smoothness of the closing effect. Optimize user interface exit behaviors by adjusting close transitions, specifying animated effects for window closure, and fine-tuning the visual experience when the assistant interface shuts down, ensuring seamless, polished, and responsive UI animations during close events. This includes controlling animation speed, style, and timing parameters to enhance user interaction feedback on termination or dismissal of assistant windows.
</div>

#### Example - configure AI AssistantWindow closing animation

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           animation: {
             close: {
               effects: "fade:out",
               duration: 300
             }
           }
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.animation.close.effects `String`

The effect that will be used when the AI AssistantWindow closes.


<div class="meta-api-description">
Configure or customize the exit animation, closing transition effects, or visual behavior that occurs when an AI assistant window or panel shuts, hides, or disappears within a grid interface; set or control how the assistant UI animates out on close, disable or enable specific close animations, adjust fade, slide, zoom, or other effects used during the assistant’s closing sequence, define the style or type of closure animations for smoother or more dynamic user experiences when dismissing the AI assistant window in grid layouts or component frameworks.
</div>

#### Example - configure AI AssistantWindow closing animation effects

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
         aiAssistantWindow: {
           animation: {
             close: {
               effects: "fadeOut"
             }
           }
         }
       }
    });
    </script>

### ai.aiAssistantWindow.animation.close.duration `Number`

Defines the duration of the closing animation.


<div class="meta-api-description">
Set or adjust the length of the closing animation for an AI assistant window, customize how quickly or slowly the window transition completes when dismissing or hiding the AI interface, control the timing and speed of the close effect for smoother user experience, configure animation duration to optimize responsiveness or visual feedback during window closure, or fine-tune how long the assistant window fade-out or slide-away animation takes when exiting or minimizing the AI assistant display.
</div>

#### Example - configure AI AssistantWindow closing animation duration

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
         aiAssistantWindow: {
           animation: {
             close: {
               duration: 300
             }
           }
         }
       }
    });
    </script>

### ai.aiAssistantWindow.animation.open `Object`

The animation that will be used when the AI AssistantWindow opens.


<div class="meta-api-description">
Configure and customize the opening animation, entrance transition, show effect, or reveal timing for the AI assistant window within the grid interface, enabling control over how the assistant panel appears, animates on open, fades in, slides, or unfolds when triggered, adjusting visual effects, transition speed, and animated entry styles to enhance user interaction and UI responsiveness.
</div>

#### Example - configure AI AssistantWindow opening animation

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           animation: {
             open: {
               effects: "fade:in",
               duration: 200
             }
           }
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.animation.open.effects `String`

The effect that will be used when the AI AssistantWindow opens.


<div class="meta-api-description">
Configure, customize, or control the visual transition and animation effect applied when a user interface assistant window or panel opens, including setting fade-ins, slides, zooms, or other dynamic reveal animations to enhance user experience and tailor how the assistant appears on screen. Enable smooth or distinct opening effects for the AI support window, adjusting timing, style, or type of animation to fit different design preferences or interaction flows. Optimize the display behavior by selecting, enabling, or modifying entrance animations that govern how the assistant component becomes visible during launch or activation stages in your application interface.
</div>

#### Example - configure AI AssistantWindow opening animation effects

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
         aiAssistantWindow: {
           animation: {
             open: {
               effects: "fadeIn"
             }
           }
         }
       }
    });
    </script>

### ai.aiAssistantWindow.animation.open.duration `Number`

Defines the duration of the opening animation.


<div class="meta-api-description">
Set or adjust the duration of the open animation for the AI assistant window to control how quickly it appears, customize transition speed for smoother or faster opening effects, synchronize opening animations with other interface elements, optimize user experience by tuning animation timing, manage animation delays or performance impacts, enable or configure opening transition length for accessibility considerations, control timing to match UI flow or visual consistency, modify animation speed for better responsiveness, and fine-tune how long the assistant panel takes to become visible when triggered.
</div>

#### Example - configure AI AssistantWindow opening animation duration

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
         aiAssistantWindow: {
           animation: {
             open: {
               duration: 400
             }
           }
         }
       }
    });
    </script>

### ai.aiAssistantWindow.appendTo `Object|String` *(default: document.body)*

The element to which the AI AssistantWindow will be appended.


<div class="meta-api-description">
Customize or configure the placement of the AI assistant interface by specifying a container element, DOM node, CSS selector, or jQuery object to control where the assistant window is embedded within the page or application layout; enabling developers to set, change, or target the exact parent element or wrapper that hosts the AI assistant component when integrating or initializing the Grid, offering flexibility for positioning, DOM insertion, and dynamic placement of the interactive assistant overlay or popup within a specified container or UI region.
</div>

#### Example - append AI AssistantWindow to specific container

    <div id="container">
      <div id="grid"></div>
    </div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           appendTo: "#container"
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.autoFocus `Boolean` *(default: true)*

Determines whether the AI AssistantWindow will be focused automatically when opened.


<div class="meta-api-description">
Control the automatic keyboard focus behavior when opening the AI Assistant window, enabling or disabling focus shift to the assistant interface for improved keyboard navigation, accessibility, or user interaction; configure whether the assistant window receives immediate input focus upon launch, set focus management preferences, adjust accessibility settings related to focus handling, and manage how focus transitions are handled during assistant activation to tailor user experience for keyboard users, screen readers, or workflows requiring manual focus control.
</div>

#### Example - disable AI AssistantWindow auto focus

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           autoFocus: false
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.draggable `Object|Boolean` *(default: true)*

Enables (`true`) or disables (`false`) the dragging of the AI AssistantWindow.


<div class="meta-api-description">
Enable or disable the ability to drag, move, reposition, or lock the AI Assistant window within the interface grid, controlling whether users can click and drag to adjust its placement or keep it fixed in one location, configuring mobility, interactivity, and user control over the assistant’s on-screen position.
</div>

#### Example - disable AI AssistantWindow dragging

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           draggable: false
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.draggable.containment `String|Element|jQuery` *default: ""*

Defines the element in which the AI AssistantWindow will be able to move.


<div class="meta-api-description">
Control and configure the draggable area of the AI assistant window by setting boundaries that restrict or confine its movement within a specified container, element, or grid area, enabling developers to limit how far users can drag or reposition the assistant on the interface for better layout management, containment, or interaction control. Whether adjusting drag constraints, limiting movement zones, enabling confined dragging, or setting bounding elements to prevent the assistant from moving outside desired regions, this feature supports flexible and precise control over draggable behavior within defined limits.
</div>

#### Example - contain AI AssistantWindow dragging

    <div id="container" style="position: relative; height: 600px; border: 1px solid #ccc;">
      <div id="grid"></div>
    </div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           draggable: {
             containment: "#container"
           }
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.height `Number | String`

Specifies the height of the AI AssistantWindow.


<div class="meta-api-description">
Adjust, configure, or set the vertical dimension, height, or size of an AI assistant window within a grid interface to control layout spacing, visual emphasis, or component appearance, including changing the assistant panel's tallness or vertical extent to optimize user interface design, responsiveness, or content fit during initialization or UI setup.
</div>

#### Example - set AI AssistantWindow height

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           height: 500
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.maxHeight `Number` *(default: Infinity)*

The maximum height (in pixels) that may be achieved by resizing the AI AssistantWindow.


<div class="meta-api-description">
Set or configure the vertical height limit for resizing the AI assistant window within the grid interface, controlling or restricting the maximum pixel height to prevent the panel from expanding beyond a designated size, enabling precise adjustment of the assistant’s display area, managing layout constraints, and ensuring the AI assistant panel does not exceed specified vertical boundaries.
</div>

#### Example - set AI AssistantWindow maximum height

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           maxHeight: 600,
           resizable: true
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.maxWidth `Number` *(default: Infinity)*

The maximum width (in pixels) that may be achieved by resizing the AI AssistantWindow.


<div class="meta-api-description">
Control the maximum width limit for resizing the AI assistant window by setting a pixel-based upper bound to restrict how wide the interface can expand during user adjustments, ensuring the assistant panel does not exceed a specified size. Enable or configure a fixed width cap to constrain the horizontal resizing behavior of the AI assistant display, set maximum pixel width to limit window growth, and manage layout boundaries for the assistant interface. Useful for enforcing maximum size constraints, preventing oversizing during manual or dynamic resizes, and controlling the assistant window’s horizontal expansion within pixel dimensions.
</div>

#### Example - set AI AssistantWindow maximum width

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           maxWidth: 800,
           resizable: true
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.minHeight `Number` *(default: 50)*

The minimum height (in pixels) that may be achieved by resizing the AI AssistantWindow.


<div class="meta-api-description">
Control the minimum vertical dimension or smallest height limit in pixels for resizing the AI Assistant or assistant window, ensuring it cannot be shrunk below a set pixel value during drag, resize, or user interface adjustment actions. Enable setting or configuring the least allowable height to maintain visibility and usability, preventing collapse or overly small display of the AI assistant panel or floating interface frame when users resize or drag to adjust window size. Adjust, configure, enforce, or lock the minimum height constraint in the user interface, guaranteeing consistent vertical space and preventing shrinkage below a specified pixel measurement for assistant or modal windows.
</div>

#### Example - set AI AssistantWindow minimum height

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           minHeight: 300,
           resizable: true
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.minWidth `Number` *(default: 50)*

The minimum width (in pixels) that may be achieved by resizing the AI AssistantWindow.


<div class="meta-api-description">
Set or configure the minimum width limit in pixels to control or restrict how narrow the AI assistant window or panel can become during manual or automated resizing, ensuring the interface, content readability, and overall layout are maintained without collapsing or becoming too small, useful for preventing UI elements from shrinking below a certain size in grid layouts or resizable components.
</div>

#### Example - set AI AssistantWindow minimum width

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           minWidth: 400,
           resizable: true
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.modal `Boolean|Object` *(default: false)*

Specifies whether the AI AssistantWindow will display a modal overlay over the page.


<div class="meta-api-description">
Configure or toggle a full-page blocking overlay behind the AI AssistantWindow to control whether the interface displays a modal that prevents interaction with the rest of the page when the assistant is active; set this option to enable or disable a screen-wide modal overlay that either focuses user attention by covering background content or allows seamless interaction without obstruction, useful for managing visibility, user experience, and interaction flow when the AI assistant panel is opened or closed.
</div>

#### Example - make AI AssistantWindow modal

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           modal: true
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.modal.preventScroll `Boolean` *(default: false)*

Specifies whether the document will stop scrolling when the modal AI AssistantWindow is opened.


<div class="meta-api-description">
Control or configure page scrolling behavior when an AI assistant modal window appears, enabling or disabling background scroll lock during modal display, managing whether the underlying document remains fixed or scrollable while the assistant overlay is active, preventing scroll behind modal dialogs, toggling scroll prevention for modals, setting scroll lock on modal open, controlling page scroll interaction with AI assistant windows, enabling modal focus without page movement, handling scroll blocking or allowing scroll retention during dialog visibility, and managing user experience by either freezing or maintaining the main page scroll when overlay modals are triggered.
</div>

#### Example - prevent scrolling when AI AssistantWindow is modal

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           modal: {
             preventScroll: true
           }
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.pinned `Boolean` *(default: false)*

Specifies whether the AI AssistantWindow will be pinned, that is, that it will not move together with the page content during scrolling.


<div class="meta-api-description">
Control whether the AI assistant panel remains fixed, sticky, or anchored within the viewport during page scrolling, enabling a persistent floating or pinned assistant window that does not move with the content. Configure the assistant panel to stay visible and accessible by enabling or disabling its fixed position, pinning it in place for continuous interaction without losing focus as users scroll through the page or app content. Set up a non-moving, locked, or docked AI help window that provides constant assistance regardless of scroll position or user navigation, optimizing user experience by keeping the assistant always on-screen and reachable.
</div>

#### Example - pin AI AssistantWindow

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           pinned: true,
           position: { top: 100, left: 200 }
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.position `Object`

A collection of one or two members which define the initial top and/or left position of the AI AssistantWindow.


<div class="meta-api-description">
Configure the initial placement and screen offset of the AI assistant window by specifying top and left coordinates or a combination of both to control where the assistant appears on launch; adjust starting position, set window location using horizontal and vertical values, or define the assistant’s offset on screen for customized alignment and layout in the grid interface.
</div>

#### Example - set AI AssistantWindow position

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           position: {
             top: 100,
             left: 150
           }
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.position.top `Number|String`

Specifies the initial top position of the AI AssistantWindow. Numeric values are treated as pixels.


<div class="meta-api-description">
Control and configure the vertical starting position, initial top offset, or y-coordinate placement of an AI assistant window within a grid or panel interface, enabling developers to set where the assistant appears vertically on screen upon opening, adjust the top boundary location in pixels or units, customize or align the assistant’s top edge for layout or UI alignment, specify vertical positioning or offset to control interface layout, and define where the assistant window’s top should be anchored for consistent or dynamic initial display placement in apps or dashboards.
</div>

#### Example - configure AI AssistantWindow top position

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
         aiAssistantWindow: {
           position: {
             top: 100
           }
         }
       }
    });
    </script>

### ai.aiAssistantWindow.position.left `Number|String`

Specifies the initial left position of the AI AssistantWindow. Numeric values are treated as pixels.


<div class="meta-api-description">
Control the initial horizontal placement, left margin, or starting x-coordinate of the AI assistant window within the Grid interface, enabling configuration of the assistant’s opening position on the screen, setting pixel-based offsets, adjusting the left-side alignment, specifying where the assistant appears from the left edge, or customizing horizontal positioning for UI layout and display preferences.
</div>

#### Example - configure AI AssistantWindow left position

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
         aiAssistantWindow: {
           position: {
             left: 200
           }
         }
       }
    });
    </script>

### ai.aiAssistantWindow.resizable `Boolean` *(default: true)*

Enables (`true`) or disables (`false`) the resizing of the AI AssistantWindow.


<div class="meta-api-description">
Adjust or configure the ability to resize the AI assistant window within the Grid interface by enabling or disabling user control over window dimensions, allowing developers to set fixed or flexible sizing behavior for the assistant pane during initialization, controlling whether users can drag to change the window size, managing layout adaptability, and customizing UI interaction to either lock or permit dynamic resizing of the assistant display area.
</div>

#### Example - disable AI AssistantWindow resizing

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           resizable: false
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.scrollable `Boolean` *(default: true)*

Enables (`true`) or disables (`false`) the scrolling of the AI AssistantWindow contents.


<div class="meta-api-description">
Control whether the assistant window content supports vertical or horizontal scrolling, manage overflow behavior when content exceeds the visible area, enable or disable scrollbars for easier navigation through large or lengthy responses, configure user interface scrolling functionality to allow smooth movement within the assistant panel, and set scrollability to handle dynamic content sizes or fixed viewport constraints.
</div>

#### Example - disable AI AssistantWindow scrolling

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           scrollable: false
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.themeColor `String` *default: ""*

The `themeColor` option controls the color that will be applied to the AI AssistantWindow.

The following values are available for the themeColor:

- `primary`
- `dark`
- `light`
- `none`


<div class="meta-api-description">
Adjust, configure, or set the accent color of an AI assistant interface to customize its visual style or appearance, including options for primary colors, dark mode, light themes, or disabling color accents entirely. This controls the theming or color scheme of an assistant window, enabling developers to tailor UI highlights, mood, or branding consistency through color customization, theming preferences, or user interface accent adjustments. Options to enable or disable color highlights and switch between contrasting color modes allow flexible visual presentation for AI assistant elements within a grid or panel environment.
</div>

#### Example - set AI AssistantWindow theme color

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           themeColor: "primary"
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.title `Object|String|Boolean` *default: "AI Assistant"*

The text in the title bar of the AI AssistantWindow. If set to `false`, the AI AssistantWindow will be displayed without a title bar.


<div class="meta-api-description">
Control the displayed header text or visibility of the AI assistant window title bar by configuring a custom title string or choosing to hide the title entirely, enabling you to set, customize, remove, or disable the window's title label for personalized UI appearance, header adjustment, display text modification, or maximizing screen space by toggling the presence of the assistant window's top text bar.
</div>

#### Example - set AI AssistantWindow title

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           title: "Grid AI Assistant"
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.title.text `String` *default: "AI Assistant"*

The text in the title bar of the AI AssistantWindow.


<div class="meta-api-description">
Configure and customize the display text or title string shown at the top of the AI assistant window, enabling control over the visible header or caption in the assistant interface; set, update, or localize the window’s title bar text to reflect specific names, labels, or descriptions that appear prominently in the AI assistant’s user interface, ensuring dynamic and clear presentation of the window title for user recognition or branding purposes.
</div>

#### Example - configure AI AssistantWindow title text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           title: {
             text: "Smart Grid Assistant"
           }
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.title.encoded `Boolean` *default: true*

Specifies whether the title text will be encoded.


<div class="meta-api-description">
Toggle the encoding of the AI assistant window title to either escape HTML characters for safe display without rendering tags or allow raw HTML markup to be rendered directly in the title, enabling control over whether titles show as plain text or formatted with HTML elements, useful for preventing injection issues or enabling styled, interactive title text by configuring encoding options during setup or runtime.
</div>

#### Example - disable AI AssistantWindow title encoding

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           title: {
             text: "<strong>AI Assistant</strong>",
             encoded: false
           }
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.visible `Boolean` *(default: false)*

Specifies whether the AI AssistantWindow will be initially visible.


<div class="meta-api-description">
Control the initial display state of the AI assistant interface when the grid component loads, enabling developers to configure whether the assistant window appears automatically or remains hidden on startup, manage visibility toggling of the embedded AI helper dialog, set default assistant panel display preferences during initialization, and decide if the AI interaction overlay should be shown or suppressed by default for user guidance or distraction-free experiences.
</div>

#### Example - show AI AssistantWindow initially

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           visible: true
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.width `Number | String`

Specifies the width of the AI AssistantWindow.


<div class="meta-api-description">
Adjust or configure the assistant window’s horizontal size, panel width, or layout dimensions to control how wide the AI assistant appears within the grid interface, including setting initial width, managing responsiveness, resizing behavior, alignment, and overall presentation of the assistant panel for optimal display across different screen sizes and user interface layouts.
</div>

#### Example - set AI AssistantWindow width

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           width: 600
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.size `String` *(default: "auto")*

Sets a predefined size to the AI AssistantWindow. The `width` and `height` configuration options override the predefined `size`.

The supported values are:

* `auto`
* `small`
* `medium`
* `large`


<div class="meta-api-description">
Adjust or configure the dimensions and layout of the AI assistant interface within the grid by setting predefined size options such as automatic, small, medium, or large, or override these defaults by specifying exact width and height values to control the assistant window’s display area, appearance, responsiveness, and spatial arrangement inside the grid container for better UI fitting, resizing behavior, and consistent visual design.
</div>

#### Example - set AI AssistantWindow size

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           size: "large"
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       }
    });
    </script>

### ai.aiAssistantWindow.content

Specifies a URL or request options from where the AI Assistant Window will load its content.

> For URLs which start with a protocol (for example, http://), a container `iframe` element is automatically created. As this behavior may change in future versions, try to always use the [iframe configuration option](#iframe).


<div class="meta-api-description">
Configure or control the source and loading behavior of assistant window content by specifying a URL, fetch request parameters, or request-like options to set where the assistant retrieves HTML or data at initialization; manage content origin through direct links, custom request configurations, or embedded iframes to enable flexible loading, rendering, or embedding of dynamic assistant interfaces, ensuring compatibility with protocol-based URLs and supporting future-proof containerization or frame-based display methods.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      ai: {
        aiAssistantWindow: {
          content: {
            url: "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent2.html",
            dataType: "html"
          }
        }
      }
    });
    </script>

### ai.aiAssistantWindow.content.url `String`

Specifies the url from which the content is fetched


<div class="meta-api-description">
Configure or specify the remote URL or endpoint that the AI assistant interface uses to retrieve or load dynamic content, enabling integration with APIs, web services, static files, or custom server routes; control the source location that the assistant queries to display relevant data or interactive elements, allowing developers to set, change, or direct content fetching for conversational UI, remote data loading, or embedded resource access.
</div>

#### Example - fetching JSON and displaying it through a template

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           content: {
              url: "https://demos.telerik.com/kendo-ui/content/web/tabstrip/ajax/ajaxContent2.html"
            }
          }
       }
    });
    </script>

### ai.aiAssistantWindow.content.dataType `String`

The type of result expected from the remote service. Used values are "html" and "json".


<div class="meta-api-description">
Control and configure the expected response format from the remote AI assistant service to properly handle, parse, and display retrieved content; specify whether the output is delivered as structured JSON data or rendered HTML markup, enabling seamless integration with rendering logic, content parsing workflows, or frontend display layers; manage how AI-generated responses are formatted, interpreted, and rendered by choosing between JSON objects, useful for data extraction and manipulation, or HTML strings, suitable for direct embedding and visual presentation, ensuring compatibility with diverse frontend frameworks and parsing strategies.
</div>

#### Example - fetching and displaying JSON content it in the Window

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           content: {
              url: "https://demos.telerik.com/kendo-ui/content/shared/js/products.js",
              dataType: "json"
            }
          }
       }
    });
    </script>

### ai.aiAssistantWindow.content.iframe `Boolean`

If the URL for the  AI Assistant Window content contains a protocol, the  AI Assistant Window creates an iframe for the content and assumes that the nested page resides in another domain.

If the URL does not contain a protocol, the URL is treated as a local URL which will load a partial view and the  AI Assistant Window does not create an iframe for the content.

To control the creation of iframe  AI Assistant Window content, you have to explicitly configure the option.


<div class="meta-api-description">
Configure iframe behavior for embedding external websites or local partial views within the assistant window content, managing how URLs with or without protocols load inside iframes, controlling cross-domain page integration, setting iframe sources for dynamic content display in the assistant, enabling loading of external URLs or internal components seamlessly, handling iframe creation rules based on URL format, adjusting embedded content rendering whether from remote domains or local partial views, and customizing how the assistant window presents framed web pages or partial content by setting iframe parameters.
</div>

#### Example - Explicitly configure an iframe

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           content: {
              url: "https://demos.telerik.com/kendo-ui/content/shared/js/products.js",
              dataType: "json",
              iframe: true
            }
          }
       }
    });
    </script>

### ai.aiAssistantWindow.content.template `String`

The template for the content of a AI Assistant Window. Returned data from the server will be given as the `data` of this template.

If the returned data is JSON, the [`dataType`](https://api.jquery.com/jQuery.ajax/) parameter has to be passed so that the data gets parsed by jQuery.

If the URL contains a protocol, set `iframe` to `false`. Otherwise, the JSON response will be injected in the content area of the AI Assistant Window as is.


<div class="meta-api-description">
Configure the content rendering template for the AI assistant window within a grid interface, enabling dynamic injection of server-provided data such as JSON payloads parsed through jQuery or other methods. Control how responses from external or internal URLs are processed, deciding between iframe embedding or direct content injection based on URL protocols, and customize the display using templates that receive data objects for flexible UI presentation. Adjust rendering logic to handle asynchronous server responses, parse JSON or plain text data accordingly, and set up content templates that enable seamless integration of AI assistant-generated information inside grid components, supporting scenarios like dynamic updates, remote content loading, and customizable user interface blocks.
</div>

#### Example - displaying a template

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           content: {
              template: "<div class='k-ai-assistant'></div>"
            },
            open: (e) => {
              const el = e.sender.element.find(".k-ai-assistant");
              el.kendoChat();
            }
          }
       }
    });
    </script>


### ai.aiAssistantWindow.activate

Triggered when a AI Assistant Window has finished its opening animation.


<div class="meta-api-description">
Detect or listen for the event signaling the completion of the AI assistant window’s opening animation, enabling execution of follow-up actions such as initiating user interactions, setting input focus, loading or refreshing data, updating the user interface, triggering animations, or running custom logic once the assistant interface is fully visible and ready. This activation event helps manage timing for workflows requiring the assistant window to be fully open before proceeding, supporting scenarios like UI state changes, loading dynamic content, preparing user inputs, or starting automated assistant responses after the window’s reveal animation finishes.
</div>

#### Example - subscribing to the activate event

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           activate: () => console.log("AI Assistant Window activated!")
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
       }
    });
    </script>

### ai.aiAssistantWindow.close

Triggered when a AI Assistant Window is closed either by the user or through the `close()` method.


<div class="meta-api-description">
Detect when the AI assistant panel or window is closed to enable handling tasks such as saving current state, canceling ongoing requests, stopping background processes, persisting user input or drafts, logging analytics events, cleaning up resources, or updating the interface dynamically upon user dismissal or programmatic closure. This event triggers on manual user close actions or via code invocation, allowing developers to configure responsive behavior for session management, data persistence, request termination, UI state refresh, and telemetry tracking whenever the assistant interface is closed.
</div>

#### Event Data

##### e.userTriggered `Boolean`

Indicates whether the close action was triggered by the user either by clicking the **Close** button or by pressing `Esc`. When the `close` method was called, this field is `false`.

##### e.preventDefault `Function`

If invoked prevents the Window from closing.

#### Example - subscribing to the close event

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           close: () => console.log("AI Assistant Window closed!")
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
       }
    });
    </script>

### ai.aiAssistantWindow.deactivate

Triggered when a AI Assistant Window has finished its closing animation.


<div class="meta-api-description">
Detect when an AI assistant interface or modal completes closing to perform tasks like cleaning up resources, restoring user input focus, re-enabling controls, triggering subsequent user interface actions, updating application state, logging analytics events, or initiating the next interaction flow; capture events signaling that the assistant window’s closing animation or transition has fully finished, enabling developers to handle UI state changes, manage event sequences, and coordinate follow-up behaviors upon the assistant’s deactivation or dismissal.
</div>

#### Example - subscribing to the deactivate event

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
           deactivate: () => console.log("AI Assistant Window deactivated!")
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
       }
    });
    </script>


### ai.aiAssistantWindow.dragend

Triggered when a AI Assistant Window has been moved by the user.


<div class="meta-api-description">
Configure or set a callback function triggered when the user finishes dragging or moving the AI Assistant Window within the grid interface, enabling detection of drag completion to capture and persist the new window position, update UI state accordingly, enforce layout or placement constraints, respond to user interactions after drag actions, manage state changes resulting from window movements, customize behavior upon drag end events, and implement logic to handle repositioning or drag-and-drop completion within dynamic grid layouts.
</div>

#### Example - subscribing to the dragend event

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
            dragend: () => console.log("AI Assistant Window dragend!")
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
       }
    });
    </script>


### ai.aiAssistantWindow.dragstart

Triggered when a AI Assistant Window has been moved by the user.


<div class="meta-api-description">
Detect when the AI Assistant Window begins being dragged or repositioned by the user to trigger custom behaviors such as updating location state, saving or persisting the new window coordinates, integrating with drag-and-drop workflows, handling mouse or touch interactions related to moving UI elements, configuring event listeners for window movement start, controlling drag initiation logic, responding to user-initiated window repositioning, or linking with UI state management during drag operations.
</div>

#### Example - subscribing to the dragstart event

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
            dragstart: () => console.log("AI Assistant Window dragstart!")
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
       }
    });
    </script>

### ai.aiAssistantWindow.maximize

Triggered when the user maximizes the AI Assistant Window.


<div class="meta-api-description">
Detect and respond to events when the AI Assistant Window is maximized to dynamically adjust interface layouts, resize or reflow content areas, save or restore UI state, trigger analytics or telemetry data collection, and implement custom behavior in response to window expansion. Enable handling of maximize actions to control adaptive layouts, maintain consistent user sessions, log user interactions, and optimize the user interface for full-screen or enlarged AI assistant views within grid-based applications. Facilitate seamless UI updates and event-driven controls tied to assistant window maximize events for enhanced user experience and monitoring.
</div>

#### Example - subscribing to the maximize event

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
            maximize: () => console.log("AI Assistant Window maximize!")
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
       }
    });
    </script>

### ai.aiAssistantWindow.minimize

Triggered when the user minimizes the AI Assistant Window.


<div class="meta-api-description">
Configure handling of the AI assistant window minimizing event by setting custom logic to trigger on user minimizing actions, enabling developers to save interface state, pause ongoing processes, send usage data, update related UI panels, adjust layout dynamically, or log user interaction with the assistant window, supporting scenarios like reacting to window minimize events, managing background tasks during minimization, preserving user context, capturing telemetry on minimize actions, and synchronizing application components after the assistant window is minimized.
</div>

#### Example - subscribing to the minimize event

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
            minimize: () => console.log("AI Assistant Window minimize!")
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
       }
    });
    </script>

### ai.aiAssistantWindow.open

Triggered when a AI Assistant Window is opened, that is, when the `open()` method is called.


<div class="meta-api-description">
Control and respond to the activation or opening of an AI assistant interface within a grid or data component, enabling detection of when the assistant window launches to execute custom code, intercept or prevent the default opening behavior, access contextual information at the moment of activation, trigger event tracking or analytics, customize user interactions when the assistant appears, or implement conditional logic tied to the assistant's visibility state.
</div>

#### Example - subscribing to the open event

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
            open: () => console.log("AI Assistant Window open!")
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
       }
    });
    </script>

### ai.aiAssistantWindow.resize

Triggered when the user resizes the AI Assistant Window.


<div class="meta-api-description">
Capture and respond to changes in the size of the AI assistant panel or chat window within the interface, enabling detection of user-initiated resizes to trigger custom handlers or callbacks for layout adjustments, dynamic UI updates, responsive design adaptations, saving or persisting new window or panel dimensions, recalculating or reflowing content, and maintaining consistent interaction flows when the assistant container is resized by the user or programmatically.
</div>

#### Example - subscribing to the resize event

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
            resize: () => console.log("AI Assistant Window resize!")
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
       }
    });
    </script>

### ai.aiAssistantWindow.error

Triggered when an Ajax request for content fails.


<div class="meta-api-description">
Manage and customize reactions to failed asynchronous content loading by detecting errors during Ajax requests in interactive grid interfaces, enabling developers to implement error handling workflows such as displaying user-friendly messages, retrying data fetches, analyzing HTTP status codes, logging network failures, monitoring server responses, and integrating fallback UI or diagnostic tools for resilient and responsive data-driven grids under network failure conditions.
</div>

#### Event Data

##### e.xhr `jqXHR`

The XHR request object as returned from [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax/).

##### e.status `String`

The status of the request as returned from [`jQuery.ajax`](https://api.jquery.com/jQuery.ajax/).

#### Example - subscribing to the error event

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
            error: () => console.log("AI Assistant Window error!")
         },
       }
    });
    </script>

### ai.aiAssistantWindow.restore

Triggered when the AI Assistant Window is restored to its previous state(maximized or minimized) by pressing the restore button, or when the [`restore()`](/api/javascript/ui/window/methods/restore) method is called.


<div class="meta-api-description">
Control and manage the behavior when the AI assistant window within the grid interface returns to its prior state, whether maximized or minimized, enabling execution of custom code upon restoration. This includes detecting when users manually restore the window or when restoration is triggered programmatically, allowing updating of layout configurations, resuming interactive sessions, refreshing displayed content, and logging state changes or restore events. Useful for handling user interface adjustments, reinitializing assistant workflows, or synchronizing data after the AI assistant is brought back from a minimized or collapsed view.
</div>

#### Example - subscribing to the restore event

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
            resize: () => console.log("AI Assistant Window resize!")
         },
         service: "https://demos.telerik.com/service/v2/ai/grid/smart-state",
       }
    });
    </script>

### ai.aiAssistantWindow.refresh

Triggered when the content of a AI Assistant Window has finished loading via Ajax, when the Window `iframe` has finished loading, or when the **Refresh** button has been clicked on a Window with static content.


<div class="meta-api-description">
Detect and respond to the completion of content loading or manual refresh actions in a dynamic window or iframe, including Ajax load finishes, iframe load events, or user-initiated refresh clicks, enabling the execution of post-load processing, UI updates, data rebinding, or custom event handling tied to dynamically reloading or refreshing embedded content or interfaces within an application.
</div>

#### Example - subscribing to the refresh event

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }],
       dataSource: [{ name: "Jane Doe" }],
       toolbar: ["aiAssistant"],
       ai: {
         aiAssistantWindow: {
            actions: ["Refresh"],
            refresh: () => console.log("AI Assistant Window refresh!")
         },
       }
    });
    </script>


### allowCopy `Boolean|Object` *(default: false)*

If set to `true` and selection of the Grid is enabled, the user could copy the selection into the clipboard and paste it into Excel or other similar programs that understand TSV/CSV formats. By default allowCopy is disabled and the default format is TSV.
Can be set to a JavaScript object which represents the allowCopy configuration.


<div class="meta-api-description">
Enable or configure the ability to copy selected grid data to the clipboard for easy pasting into Excel, spreadsheets, or other applications, controlling clipboard copy behavior, formatting options like TSV output, and customizing copy functionality when selection is active, including toggling copy permissions and setting detailed copy configurations through objects to handle data export or clipboard integration workflows.
</div>

#### Example - enable allowCopy

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        selectable: "multiple cell",
        allowCopy: true,
        columns: [
            { field: "productName" },
            { field: "category" }
        ],
        dataSource: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
        ]
    });
    </script>

### allowCopy.delimeter `String|Object` *(default: "\t")*

Changes the delimeter between the items on the same row. Use this option if you want to change the default TSV format to CSV - set the delimeter to comma ','.


<div class="meta-api-description">
Control or customize the character or symbol that separates or divides cell values when copying or exporting grid rows or table data to the clipboard or external applications, enabling formats like tab-separated values (TSV), comma-separated values (CSV), semicolon, pipe, or any custom delimiter to match various data import/export requirements, clipboard copying preferences, or integration needs, allowing developers to set, modify, or configure the delimiter or separator used between adjacent cell entries to ensure compatibility with spreadsheet software, text editors, or data processing tools.
</div>

#### Example - change the clipboard format from default TSV to CSV

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        selectable: "multiple cell",
        allowCopy: {
            delimeter: ",",
        },
        columns: [
            { field: "productName" },
            { field: "category" }
        ],
        dataSource: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
        ]
    });
    </script>

### allowPaste `Boolean` *(default: false)*

If set to `true` and the selection functionality of the Grid is enabled, the user can paste the current textual content of the clipboard into the Grid.


<div class="meta-api-description">
Control whether users can paste plain text from the clipboard into the grid when selection is enabled, supporting pasting of textual data directly into grid cells, enabling or disabling clipboard paste functionality, configuring paste behavior during grid setup, managing user input through copy-paste operations, allowing or restricting content insertion from external sources, handling plain-text clipboard input integration, setting permissions for pasting within grid selections, and facilitating bulk data entry by pasting plain text content into grid components.
</div>

#### Example - enable allowPaste

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["paste"], // Creates a dropdownlist that enables you to switch between replace and insert modes.
        selectable: "multiple cell",
        allowPaste: true,
        columns: [
            { field: "productName" },
            { field: "category" }
        ],
        dataSource: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" }
        ]
    });
    </script>

### altRowTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the alternating table rows. Be default the grid renders a table row (`<tr>`) for every data source item.

> The outermost HTML element in the template must be a table row (`<tr>`). That table row must have the `uid` data attribute set to `${uid}`. The grid uses the `uid` data attribute to determine the data to which a table row is bound to.
> Set the `class` of the table row to `k-alt` to get the default "alternating" look and feel.


<div class="meta-api-description">
Control and customize alternating or striped rows in a data grid by defining a template that specifies the table row markup, enabling you to include bound data fields and apply custom styling or CSS classes such as default alternating styles like k-alt. Enable flexible alternation design for grid rows, modify row presentation for every second row, set unique identifiers for data binding using uid attributes, and tailor the appearance, structure, and content of alternating rows within the grid. Configure how alternate rows render in terms of HTML structure and dynamic data association, support custom row markup for striped effects, and manage styling consistency for improved readability or UI theming in tabular data displays.
</div>

#### Example - specify alternating row template

    <div id="grid"></div>
    <script>
      let encode = kendo.htmlEncode;
      $("#grid").kendoGrid({
        dataSource: [ { name: "Jane Doe", age: 30 }, { name: "John Doe", age: 33 } ],
        altRowTemplate: ({ uid, name, age }) => `<tr data-uid="${uid}"><td colspan="2"><strong>${encode(name)} - </strong><strong>${encode(age)}</strong></td></tr>`
      });
    </script>

### autoBind `Boolean` *(default: true)*

If set to `false`, the Grid will not bind to the data source during initialization, i.e. it will not call the [`fetch`](/api/javascript/data/datasource/methods/fetch) method of the [dataSource](/api/javascript/ui/grid/fields/datasource) instance. In such scenarios data binding will occur when the [change](/api/javascript/data/datasource/events/change) event of the
dataSource instance is fired. By default, `autoBind` is set to `true` and the widget will bind to the data source specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same data source. Disabling automatic binding ensures that the shared data source doesn't make more than one request to the remote service.


<div class="meta-api-description">
Control automatic data binding for a grid or data table by enabling or disabling auto-fetch from the data source, configure the component to delay or prevent initial data retrieval, manage when the grid loads or refreshes data by toggling automatic binding, avoid redundant network requests or duplicate fetch actions when multiple views share the same data source, set whether data is fetched immediately on component initialization or only upon explicit triggers such as data source change events, customize data fetching behavior to optimize performance or update timing, enable manual control over when grid data populates from backend or local data collections, configure binding strategies for dynamic data loading and refresh scenarios, prevent premature or duplicate data loading in client-side UI grids, and handle scenarios requiring deferred or on-demand data retrieval for efficient resource usage.
</div>

#### Example - disable automatic binding

    <div id="grid"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [ { name: "Jane Doe" }, { name: "John Doe" }]
    });
    $("#grid").kendoGrid({
      autoBind: false,
      dataSource: dataSource
    });
    dataSource.read(); // "read()" will fire the "change" event of the dataSource and the widget will be bound
    </script>

### columnResizeHandleWidth `Number` *(default: 3)*

Defines the width of the column resize handle in pixels. Apply a larger value for easier grasping.


<div class="meta-api-description">
Adjust the width of the column resize handle to control the interactive area for dragging or touching column edges, enabling easier column resizing on touchscreens, improving accessibility, enhancing usability on mobile devices, setting the pixel size of the draggable border, customizing grab zones for grid column adjustments, increasing hit target size for better user interaction, configuring responsive touch-friendly column borders, scaling resize handles for comfort and precision, and optimizing grid manipulation for diverse input methods including mouse and touch inputs.
</div>

#### Example

    <div id="grid"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
      data: [ { name: "Jane Doe", age: 11 }, { name: "John Doe", age: 12 }]
    });
    $("#grid").kendoGrid({
      columnResizeHandleWidth:20,
      dataSource: dataSource,
      resizable:true
    });

    </script>

### columns `Array`

The configuration of the grid columns. An array of JavaScript objects or strings. JavaScript objects are interpreted as column configurations. Strings are interpreted as the
[field](columns.field) to which the column is bound. The grid will create a column for every item of the array.

> If this setting is **not** specified the grid will create a column for every field of the data item.


<div class="meta-api-description">
Configure and customize the number and layout of data grid columns by setting an array of column definitions using objects for detailed column settings or strings for simple field bindings, enabling control over which data fields appear as columns, how many columns are displayed, and their order. Adjust column visibility and structure by specifying columns explicitly or rely on automatic column generation for all data fields. This feature supports flexible grid column setups including defining headers, binding data fields, controlling column count, setting columns programmatically, managing display order, and customizing grid layout with static or dynamic column definitions.
</div>

#### Example - specify grid columns as array of strings

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: ["name", "age"], // two columns bound to the "name" and "age" fields
      dataSource: [ { name: "Jane", age: 31 }, { name: "John", age: 33 }]
    });
    </script>

#### Example - specify grid columns as array of objects

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [{
        field: "name",// create a column bound to the "name" field
        title: "Name" // set its title to "Name"
      }, {
        field: "age",// create a column bound to the "age" field
        title: "Age" // set its title to "Age"
      }],
      dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }]
    });
    </script>

### columns.aggregates `Array`

The aggregate(s) which are calculated when the grid is grouped by the columns [field](columns.field).
The supported aggregates are "average", "count", "max", "min" and "sum".


<div class="meta-api-description">
Configure per-column aggregate calculations such as sum, average, count, minimum, or maximum to enable group-level summaries when data is grouped by a specific column field. Set up or customize aggregation functions to control how numerical or categorical data is summarized within grouped grids, supporting use cases like computing totals, averages, counts, minimums, and maximums dynamically for each group. Enable aggregation metrics during grid setup to enhance grouped data analysis and summary display, facilitating quick insights through calculated values per group based on column-specific fields.
</div>

#### Example - set column aggregates

    <div id="grid"></div>
    <script>
      let encode = kendo.htmlEncode;

      $("#grid").kendoGrid({
        columns: [
          { field: "firstName", groupable: false },
          { field: "lastName" }, /* group by this column to see the footer template */
          { field: "age",
           groupable: false,
           aggregates: [ "count", "min", "max" ],
           groupFooterTemplate: ({ age }) => `age total: ${encode(age.count)}, min: ${encode(age.min)}, max: ${encode(age.max)}`
          }
        ],
        groupable: true,
        scrollable: false,
        dataSource: {
          data: [
            { firstName: "Jane", lastName: "Doe", age: 30 },
            { firstName: "John", lastName: "Doe", age: 33 }
          ]
        },
        groupable: true,
        scrollable: false,
        dataSource: {
          data: [
            { firstName: "Jane", lastName: "Doe", age: 30 },
            { firstName: "John", lastName: "Doe", age: 33 }
          ],
          group: {
            field: "age", aggregates: [
              { field: "age", aggregate: "count" },
              { field: "age", aggregate: "min"},
              { field: "age", aggregate: "max" }
            ]
          }
        }
      });
    </script>

> Check [Aggregates](https://demos.telerik.com/kendo-ui/grid/aggregates) for a live demo.

### columns.attributes `Object|Function`

[`HTML attributes`](https://www.w3schools.com/tags/ref_attributes.asp) of the table cell (`<td>`) rendered for the column.

> HTML attributes which are JavaScript keywords (e.g. *class*) must be quoted.


<div class="meta-api-description">
Set or customize HTML attributes on table cell elements of grid columns by specifying key-value pairs for classes, inline styles, data-* attributes, aria-* accessibility tags, or other custom attributes to control appearance, behavior, and metadata of column cells in data grids or tables, enabling fine-grained control over cell rendering, styling, accessibility, and dynamic content injection within grid columns.
</div>

#### Example - specify column HTML attributes

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        title: "Name",
        attributes: {
          "class": "table-cell !k-text-right",
          style: "font-size: 14px"
        }
      } ],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" }]
    });
    </script>

The table cells would look like this: `<td class="table-cell" style="text-align: right; font-size: 14px">...</td>`.

> Since R2 2023 attributes logic has changed due to Kendo templates evaluation rendering updates. Now we deliver a new attributes overload that accepts a single string parameter and the name of the JS handler that returns the attributes.

#### Example - set cells background color using a dynamic property value

    <div id="grid"></div>
    <script>
      let ageAttributes = (data) => {
        return { style: `background-color: ${data.color} ` }
      }

      $("#grid").kendoGrid({
        columns: [
          {
            field: "name",
            title: "Name",
            attributes: { "class": "table-cell !k-text-right" }
          },
          {
            field: "age",
            title: "Age",
            attributes: ageAttributes
          }
        ],
        dataSource: [
          { name: "Anne Smith", age: 30, color: "#FFD68A" },
          { name: "John Doe", age: 22, color: "#B2AC88" }
        ]
      });
    </script>

### columns.columnMenu `Boolean` *(default: true)*

If set to `false` the column menu will not be rendered for the specific column.


<div class="meta-api-description">
Control whether the column header menu is enabled or disabled for individual columns in a grid or table, allowing you to hide, disable, or prevent the display of the column menu on specific headers while keeping it available on others; configure per-column menu visibility, toggle the interactive header dropdown options, manage or restrict column-level context menus, and customize which columns show filtering, sorting, or configuration menus in grid interfaces.
</div>

#### Example - hide the column menu

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", columnMenu: false },
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: true,
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });
    </script>

### columns.columns `Array`

The columns which should be rendered as child columns under this group column header.

**Note that group column cannot be data bound and supports limited number of bound column settings - such as title, headerTemplate, locked


<div class="meta-api-description">
Configure and customize nested grid column structures by defining an array of child column definitions that appear under a grouped header, enabling the creation of multi-level column groups and complex header layouts. Control how columns are organized inside parent headers, set grouping relationships within the grid, and manage header formatting with options like titles and header templates while understanding that group columns primarily serve as containers without direct data binding. Enable grouping for better visual hierarchy in tables, arrange columns hierarchically, set locked or unlocked states for grouped columns, and customize header appearance to support advanced grid column arrangements and interactive data presentation.
</div>

#### Example - set column group column for displaying multicolumn headers

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        columns: [
        {
            title: "Personal Info",
            columns: [
                { field: "name" },
                { field: "birthdate" }
            ]
        },
        {
            title: "Location",
            columns: [
                { field: "city" },
                { field: "country" }
            ]
        },
        {
            field: "phone"
        }
      ],
      editable: true,
      dataSource: [ { name: "Jane Doe", birthdate: new Date("1995/05/04"), city: "London", country: "UK", phone: "555-444-333" } ]
    });
    </script>

### columns.command `String|Array`

The configuration of the column command(s). If set the column would display a button for every command. Commands can be custom or built-in ("edit" or "destroy").

The "edit" built-in command switches the current table row in edit mode.

The "destroy" built-in command removes the data item to which the current table row is bound.

Custom commands are supported by specifying the [click](columns.command.click) option.

> The built-in "edit" and "destroy" commands work *only* if editing is enabled via the [editable](/api/javascript/ui/grid/configuration/editable) option. The "edit" command supports "inline" and "popup" editing modes.


<div class="meta-api-description">
Configure and enable interactive action buttons within data grid columns to perform row-specific operations like editing, deleting, updating, or triggering custom functions on bound data items. Control command buttons for each row, including default built-in commands such as inline or popup edit modes and destroy to remove entries, or define custom click actions to customize behavior. Set up row-level command controls to switch rows into edit mode or delete data entries dynamically, ensuring integration with editable grid settings for full control over user interactions and table manipulation, supporting a wide range of use cases from inline data updates to popup forms and flexible command execution on grid rows.
</div>

#### Example - set command as a string

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: "destroy" } // displays the built-in "destroy" command
      ],
      editable: true,
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
    });
    </script>

#### Example - set command as array of strings

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: ["edit", "destroy"] } // displays the built-in "edit" and "destroy" commands
      ],
      editable: "inline",
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
    });
    </script>

#### Example - set command as array of objects

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [
            {
             name: "details",
             click: function(e) {
                // command button click handler
             }
            },
            { name: "destroy" } // built-in "destroy" command
          ]
        }
      ],
      editable: true,
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
    });
    </script>

### columns.command.className `String`

The CSS class applied to the command button.


<div class="meta-api-description">
Customize or assign CSS classes to buttons inside grid columns to control styling, theming, or targeting with selectors; configure class names on command buttons within table or grid columns to apply custom styles, adjust appearance, enable theming consistency, or connect with CSS rules for specific button elements in data-driven grids or tables, supporting flexible UI customization and design targeting through class assignment.
</div>

#### Example - set the CSS class of the command

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{ className: "btn-destroy", name: "destroy", text: "Remove" }] }
      ],
      editable: true,
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
    });
    </script>
    <style>
    .btn-destroy {
        color: red;
    }
    </style>

### columns.command.click `Function`

The JavaScript function executed when the user clicks the command button. The function receives a [jQuery Event](https://api.jquery.com/category/events/event-object/) as an argument.

The function context (available via the `this` keyword) will be set to the grid instance.

> Grid custom commands are rendered as anchors (`<a>`) with no `href` value. Prevent the click event in the click function in order to avoid shifting of the page scroll position.


<div class="meta-api-description">
Configure custom command button click handlers in a grid by assigning JavaScript functions that receive event objects for detailed inspection, enabling developers to manage user interactions, prevent default actions, control navigation, modify scroll behavior, and invoke grid methods within event callbacks. This setup supports handling clicks on command buttons rendered as anchor elements without href attributes, allowing prevention of default link behavior, manipulation of the event target, stopping event propagation, and integration with grid instance methods and properties. Use event handlers to customize command button responses, control user interface flow, intercept clicks, and enhance interaction logic within data grids.
</div>

#### Example - handle the click event of the custom command button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{
            name: "details",
            click: function(e) {
                // prevent page scroll position change
                e.preventDefault();
                // e.target is the DOM element representing the button
                var tr = $(e.target).closest("tr"); // get the current table row (tr)
                // get the data bound to the current table row
                var data = this.dataItem(tr);
	              /* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("Details for: " + data.name);
            }
          }]
       }
      ],
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
    });
    </script>

### columns.command.iconClass `String|Object`

The class for the [web font icon](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) of the button.
When it is defined as an object it allows to customize the web font icon for the "edit", "update" and "cancel" command buttons.

> Grid commands are rendered as anchors (`<a>`) with a `span` inside. The icon for the button depends on the **iconClass** which is rendered as a class for the inner span.
> Default commands have a predefined **iconClass** value.


<div class="meta-api-description">
Set or customize CSS classes for icons used in grid command buttons including edit, update, and cancel actions by specifying a single class string or an object mapping specific commands to different icon classes; control the appearance of button icons rendered inside anchor elements and spans, enabling configuration of web font icons, styling, theming, or replacing default icons with custom classes for command buttons in data grids or tables.
</div>

#### Example - provide an iconClass for the grid command column

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{
            name: "copy",
            iconClass: "k-icon k-i-copy"
            }]
       }
      ],
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
    });
    </script>

#### Example - provide an custom iconClass for the update and cancel command buttons

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{
            name: "edit",
            iconClass: {
                edit: "k-icon k-i-pencil",
                update: "k-icon k-i-copy",
                cancel: "k-icon k-i-cancel"
              }
            }]
       }
      ],
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      },
      editable: "inline"
    });
    </script>

### columns.command.iconClass.cancel `String`

The class for the [web font icon](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) of the cancel command button.


<div class="meta-api-description">
Configure the cancel button icon style by specifying one or multiple CSS class names to customize the appearance of the cancel command in a data grid or table interface, enabling control over which web font icons or custom icon fonts are displayed for cancel actions, adjusting the visual presentation of cancel commands, buttons, or controls in grid components, and tailoring the cancel icon’s styling for user interface consistency and branding by setting relevant CSS classes that define the icon’s design, look, and feel in various UI frameworks or front-end libraries.
</div>

#### Example - provide an custom iconClass for the cancel command button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{
            name: "edit",
            iconClass: {
                cancel: "k-icon k-i-copy"
              }
            }]
       }
      ],
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      },
      editable: "inline"
    });
    </script>

### columns.command.iconClass.edit `String`

The class for the [web font icon](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) of the edit command button.


<div class="meta-api-description">
Customize the edit button's icon in a data grid by specifying a CSS class that applies a web font icon, enabling control over the visual representation of the edit command with different icon sets, fonts, or styles; this is useful for developers who want to change, override, or configure the edit icon's appearance, switch icons for UX consistency, apply custom or third-party icon fonts, or enhance visual customization and branding in editable grid interfaces.
</div>

#### Example - provide an custom iconClass for the edit command button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{
            name: "edit",
            iconClass: {
                edit: "k-icon k-i-pencil"
              }
            }]
       }
      ],
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      },
      editable: "inline"
    });
    </script>

### columns.command.iconClass.update `String`

The class for the [web font icon](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) of the update command button.


<div class="meta-api-description">
Customize or control the appearance of the update button's icon in grid command columns by assigning specific CSS classes for font icons, enabling you to set, configure, or change the visual style of the update command icon with different icon fonts or custom styles. Adjust, style, or override the update button's symbol by specifying CSS class names, allowing for tailored icon designs, theming, or branding in data grids. Customize the update action button icon display through CSS class settings to enhance UI consistency, user interface control, and visual feedback across various grid implementations.
</div>

#### Example - provide an custom iconClass for the update command button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{
            name: "edit",
            iconClass: {
                update: "k-icon k-i-copy"
              }
            }]
       }
      ],
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      },
      editable: "inline"
    });
    </script>

### columns.command.name `String`

The name of the command. The built-in commands are "edit" and "destroy". Can be set to a custom value.


<div class="meta-api-description">
Configure or define the unique identifier or key for command buttons or actions within a grid’s command column, enabling detection and handling of built-in commands like edit or delete as well as custom commands using any string label or name. Set, assign, or map command names to associate specific grid commands with custom event handlers, templates, or behaviors during initialization. Control or customize command actions by specifying a command identifier that distinguishes between default operations such as editing and destroying and personalized commands created for specialized functionality within grid columns. Enable recognition and differentiation of commands inside grids by setting unique string identifiers that trigger the appropriate handlers, templates, or logic in interactive data tables.
</div>

#### Example - set the command name

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{ name: "edit" }] }
      ],
      editable: "popup",
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
    });
    </script>

### columns.command.template `String`

The template of the command column.

> Add the `k-grid-[command.name]` to any element in the template which requires the [`click`](#columns.command.click) handler to be called.


<div class="meta-api-description">
Customize the command column in a data grid by specifying your own HTML templates to render interactive buttons, icons, controls, or custom elements with tailored styles and behaviors. Enable dynamic binding and event handling such as click actions by including designated class names to trigger command handlers, allowing full control over layout, user interactions, and appearance of command cells within the grid. This supports configuring command cell content, managing event listeners for commands, embedding custom UI elements, and controlling how command buttons or icons are presented and respond inside grid columns.
</div>

#### Example - customize the template of the command column

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { command: [
            {
              // for click to work when there is template, add class "k-grid-[command.name]" to some element, otherwise the click handler will not be triggered
              name: "settings",
              template: "Some text in the command column <a class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-settings'><span class='k-icon k-i-settings'></span>Settings</a>",
              click(e){
                kendo.alert("Settings clicked!")
              }
            }
          ]
          }
        ],
        dataSource: [{ name: "Jane Doe" }]
      });
    </script>

### columns.command.text `String|Object`

The text displayed by the command button and the "cancel", "edit" and "update" texts of the edit command. If not set the [name](columns.command.name) option is used as the button text.


<div class="meta-api-description">
Customize or configure the labels and button text displayed on command buttons within grid columns, including edit workflow controls like cancel, edit, update, or other action buttons; control the visible captions, override default command names with specific text for clearer user interface prompts, set or change command button titles in grid layouts to match localization, user preferences, or application terminology, and manage how action buttons are labeled dynamically in data grid components or UI frameworks.
</div>

#### Example - customize the text of the command

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{ name: "destroy", text: "Remove" }] }
      ],
      editable: true,
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
    });
    </script>

#### Example - customize the "edit", "cancel" and "update" text of the edit command

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: [{ name: "edit",
                      text: { edit: "Custom edit", cancel: "Custom cancel", update: "Custom update" } }] }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: {
        mode: "inline"
      }
    });
    </script>

### columns.command.text.edit `String`

The "edit" text of the edit command.


<div class="meta-api-description">
Customize, set, or change the label text for the edit command button within grid columns, control the displayed edit button caption in data grids, configure the inline edit action name, adjust or override default edit button text in grid command cells, modify or localize the edit command label for grid rows, specify custom edit link or button wording, tailor the edit command display name for grids, enable personalized edit command text in column settings, edit or rename the grid’s inline editing trigger label, and manage how the edit action is labeled across grid UI components.
</div>

#### Example - customize the edit text of the edit command

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{ name: "edit", text: { edit: "Custom edit"} }] }
      ],
      editable: "inline",
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
    });
    </script>

### columns.command.text.cancel `String`

The "cancel" text of the edit command.


<div class="meta-api-description">
Adjust, modify, or set the cancel button text displayed during inline editing, popup editors, or batch updates in a grid’s command column, enabling customization of the cancel action label for better user experience, localization, or interface clarity when users want to discard changes, exit editing mode, or abort data input within editable grid layouts.
</div>

#### Example - customize the cancel text of the edit command

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{ name: "edit", text: { cancel: "Custom cancel"} }] }
      ],
      editable: "inline",
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
    });
    </script>

### columns.command.text.update `String`

The "update" text of the edit command.


<div class="meta-api-description">
Customize or configure the text label shown on the grid’s update button when editing entries, supporting localization, internationalization, or renaming of the default edit confirmation button; control how the update action is presented in data grids, tables, or editable lists by setting the command button’s display text, allowing developers to change, translate, or override the default "update" wording for a more tailored user interface and better user experience in editable grid components.
</div>

#### Example - customize the update text of the edit command

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{ name: "edit", text: { update: "Custom Update"} }] }
      ],
      editable: "inline",
      dataSource: {
        data: [ {Id: 1, name: "Jane Doe" } ],
        schema: {
          model: {
            id: "Id",
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
    });
    </script>

### columns.command.visible `Function`

The JavaScript function executed on initialization of the row which will determine whether the command button will be visible. The function receives a the data item object for the row as an argument.


<div class="meta-api-description">
Control the visibility of command buttons within each row of a data grid by configuring dynamic, per-row display logic through a JavaScript function that evaluates individual row data and returns boolean values to show or hide buttons conditionally; this supports scenarios like enabling or disabling actions based on user roles, data values, or custom business rules, allowing developers to set, toggle, or customize button visibility dynamically for each row during grid rendering or initialization, effectively managing command button presence depending on row-specific criteria or state.
</div>

#### Example - set the command name

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { command: [{ name: "edit", visible: function(dataItem) { return dataItem.name==="Jane" } }] }
      ],
      editable: "popup",
      dataSource: {
        data: [ { name: "Jane" }, { name: "Bill" } ],
        schema: {
          model: {
            fields: {
              name: { type: "string" }
            }
          }
        }
      }
    });
    </script>

### columns.dataSource `Object|kendo.data.DataSource`

The data source of the values for the foreign key columns. Can be a JavaScript object which represents a valid data source configuration or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

> **Note:** When the dataSource property is set one should also set the [dataTextField](/api/javascript/ui/grid/configuration/columns.datatextfield) and [dataValueField](/api/javascript/ui/grid/configuration/columns.datavaluefield).


<div class="meta-api-description">
Set or customize the source of data used for populating and displaying selectable options in a foreign-key column within a grid, enabling binding to arrays, remote APIs, or existing data source instances to fetch or load lookup values dynamically. Control how dropdown editors and display text are filled by specifying local or remote collections, configure data loading strategies, connect with backend endpoints, assign data objects or data source instances, and ensure linked text and value fields correspond to the lookup data when configuring grid columns. This supports scenarios like setting up filters, dropdown choices, editing options, and value mapping in grid foreign-key fields through versatile data binding and fetching methods.
</div>

#### Example - configure column data source for foreign key column

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { 
          field: "categoryId", 
          title: "Category",
          dataSource: {
            transport: {
              read: {
                url: "https://demos.telerik.com/service/v2/core/categories"
              }
            }
          },
          dataTextField: "categoryName",
          dataValueField: "categoryId"
        }
      ],
      dataSource: [
        { name: "Tea", categoryId: 1 },
        { name: "Coffee", categoryId: 1 },
        { name: "Ham", categoryId: 2 }
      ]
    });
    </script>

### columns.dataTextField `String`

The data text field of the foreign key item.


<div class="meta-api-description">
Configure how to display descriptive or user-friendly labels for foreign key or lookup fields in grid columns by specifying the name of the field containing the text to show instead of raw values; map stored foreign key identifiers to their display names using paired settings like text and value fields to enable clearer, readable data presentations, customize lookup displays, and control how relational or reference data is rendered within data grids or tables.
</div>

#### Example - configure column data text field

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { 
          field: "categoryId", 
          title: "Category",
          dataSource: [
            { id: 1, name: "Beverages" },
            { id: 2, name: "Food" }
          ],
          dataTextField: "name",
          dataValueField: "id"
        }
      ],
      dataSource: [
        { name: "Tea", categoryId: 1 },
        { name: "Coffee", categoryId: 1 },
        { name: "Ham", categoryId: 2 }
      ]
    });
    </script>

### columns.dataValueField `String`

The data value field of the foreign key item.


<div class="meta-api-description">
Configure the grid to link column values to related data by mapping each column's value to a key or identifier from an external data source, enabling display of descriptive text, filtering by foreign-key references, and editing based on associated lookup entries; this involves specifying which field in the related dataset holds the unique matching value to connect grid items with their corresponding foreign records, supporting scenarios like dropdown selections, label display instead of raw IDs, and relational data binding for seamless data lookup and interaction.
</div>

#### Example - configure column data value field

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { 
          field: "categoryId", 
          title: "Category",
          dataSource: [
            { categoryId: 1, categoryName: "Beverages" },
            { categoryId: 2, categoryName: "Food" }
          ],
          dataTextField: "categoryName",
          dataValueField: "categoryId"
        }
      ],
      dataSource: [
        { name: "Tea", categoryId: 1 },
        { name: "Coffee", categoryId: 1 },
        { name: "Ham", categoryId: 2 }
      ]
    });
    </script>

### columns.draggable `Boolean` *(default: false)*

If set to `true` a draghandle will be rendered and the user could reorder the rows by dragging the row via the drag handle. If the [selectable](/api/javascript/ui/grid/configuration/selectable) option is enabled for rows only selected rows will can be dragged and reordered.

> Note that the reordering operation is only a client-side operation and it does not reflect the order of any data that is bound to the server.


<div class="meta-api-description">
Control whether grid rows can be reordered by dragging with a drag handle on each row, enabling interactive drag-and-drop row rearrangement or sorting within the grid UI. Configure drag-to-reorder functionality to allow users to click and drag rows to new positions, supporting use cases like manual sorting lists or rearranging items visually. When enabling draggable rows, note that dragging affects only the client-side presentation order without modifying server-side or backend data order. This feature often integrates with row selection to restrict dragging to selected rows only, offering a flexible way to manage row reordering through user interaction, drag handles, and selection constraints in grid-based layouts.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { draggable: true },
        { field: "name" }
      ],
      dataSource: [
        { id:1, name: "Jane Doe" },
        { id:2, name: "John Doe" }
      ]
    });
    </script>

### columns.editable `Function`

The JavaScript function executed when the cell/row is about to be opened for edit. The result returned will determine whether an editor for the column will be created.


<div class="meta-api-description">
Configure dynamic, conditional editing for grid columns by supplying a function that runs when a cell or row enters edit mode, allowing control over whether editors are created based on custom logic. This enables per-cell or per-row editing conditions, supports toggling edit capabilities dynamically, and allows disabling editing for specific cells, rows, or columns through programmable rules. Set up fine-grained control over editable grid fields, implement runtime checks to allow or prevent editing, and customize user interactions with tabular data by determining editability on a case-by-case basis using JavaScript predicates or conditions.
</div>

#### Example - conditionally edit a cell

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name",
           editable: function (dataItem) {
             return dataItem.name === "Jane"; // Name editor is created only if dataItem name is Jane
           }
          },
          {
            field: "salary",
            editable: function (dataItem) {
              return dataItem.name === "Jane"; // Salary editor is created only if dataItem name is Jane
            }
          }
        ],
        editable: true,
        dataSource: [ { name: "Jane", salary: 2000 }, { name: "Bill", salary: 2000 } ]
      });
    </script>

### columns.editor `String|Function`

Provides a way to specify a custom editing UI for the column. Use the `container` parameter to create the editing UI.

> The editing UI should contain an element whose `name` HTML attribute is set as the column [field](columns.field).

> Validation settings defined in the `model.fields` configuration will **not** be applied automatically. In order the validation to work, **the developer is responsible for attaching the corresponding validation attributes to the editor input** the `data-bind` attribute is whitespace sensitive. In case the custom editor is a widget, the developer should [customize the validation warning tooltip position](/framework/validator/overview#customizing-the-tooltip-position) in order to avoid visual issues.

When used as `String`, defines the editor widget type. For further info check the Form API: [`field`](/api/javascript/ui/form/configuration/items#itemseditor)


<div class="meta-api-description">
Configure and customize grid column editing interfaces by defining custom input controls, widgets, or editors that replace default inline editors within data grids, enabling tailored editing experiences for specific columns with support for creating editor DOM elements identified by the column field name, handling custom validation attributes manually since automatic integration with model validation is not applied, adjusting data bindings precisely due to whitespace sensitivity, and managing widget-based editor behaviors including positioning of validation tooltips to prevent display issues, as well as specifying editor types by name for streamlined widget initialization and customized editing workflows in grid environments.
</div>

#### Parameters

##### container `jQuery`

The jQuery object representing the container element.

##### options `Object`

##### options.field `String`

The name of the field to which the column is bound.

##### options.label `String`

The column [title](columns.title).

##### options.model `kendo.data.Model`

The model instance to which the current table row is bound.

##### options.editorOptions `Object`

The object representing the editor options.

##### options.editorOptions.adaptiveMode `string`

Specifies the adaptive rendering of the editor component.

##### options.editorOptions.size `size`

The editor component size.

#### Example - create a custom column editor using the Kendo UI AutoComplete

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        editor: function(container, options) {
         // create an input element
         var input = $("<input/>");
         // set its name to the field to which the column is bound ('name' in this case)
         input.attr("name", options.field);
         // append it to the container
         input.appendTo(container);
         // initialize a Kendo UI AutoComplete
         input.kendoAutoComplete({
           dataTextField: "name",
           dataSource: [
             { name: "Jane Doe" },
             { name: "John Doe" }
           ]
         });
        }
      } ],
      editable: true,
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

#### Example - create a custom column editor with validation

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "num",
        editor: function(container, options) {
         //create input element and add the validation attribute
         var input = $('<input name="' + options.field + '" required="required" />');
         //append the editor
         input.appendTo(container);
         //enhance the input into NumericTextBox
         input.kendoNumericTextBox();

         //create tooltipElement element, NOTE: data-for attribute should match editor's name attribute
         var tooltipElement = $('<span class="k-invalid-msg" data-for="' + options.field + '"></span>');
         //append the tooltip element
         tooltipElement.appendTo(container);
       }
      } ],
      editable: true,
      scrollable: false,
      dataSource: {
        data: [ { num: 1 }, { num: 2 } ],
        schema: {
          model: {
            fields: {
              num: { type: "number", validation: { required: true } }
            }
          }
        }
      }
    });
    </script>

> Check [Editing custom editor](https://demos.telerik.com/kendo-ui/grid/editing-custom) for a live demo.

#### Example - create a custom column editor using String literal

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "num",
        editor: "NumericTextBox"
      } ],
      editable: true,
      scrollable: false,
      dataSource: {
        data: [ { num: 1 }, { num: 2 } ],
        schema: {
          model: {
            fields: {
              num: { type: "number", validation: { required: true } }
            }
          }
        }
      }
    });
    </script>

### columns.editorOptions `Object`

Defines the widget configuration when one is initialized as editor for the column (or the widget defined in `items.editor`). For further info check the Form API: [`field`](/api/javascript/ui/form/configuration/items#itemseditoroptions).


<div class="meta-api-description">
Configure and customize the input controls or editor widgets for table or grid columns by setting options that define behavior, appearance, validation, or interactivity when users edit cell values. Enable fine-tuning of editor components within grid cells, control initialization parameters, apply widget settings for inline editing, adjust editor features like dropdowns, textboxes, or custom input elements, and specify configurations that affect how data entry fields behave during editing sessions. Optimize user input by controlling editor widget properties, validation rules, and display options to create a tailored data editing experience within grid column cells.
</div>

#### Example - create a custom column editor using String literal

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "num",
        editor: "NumericTextBox",
        editorOptions: { step: 2 }
      } ],
      editable: true,
      scrollable: false,
      dataSource: {
        data: [ { num: 1 }, { num: 2 } ],
        schema: {
          model: {
            fields: {
              num: { type: "number", validation: { required: true } }
            }
          }
        }
      }
    });
    </script>

### columns.encoded `Boolean` *(default: true)*

If set to `true` the column value will be HTML-encoded before it is displayed. If set to `false` the column value will be displayed as is. By default the column value is HTML-encoded.


<div class="meta-api-description">
Control how tabular data cells handle HTML content by configuring whether columns encode values to safe HTML entities or render raw HTML directly, enabling customization of display output for preventing injection or allowing embedded HTML tags, deciding between sanitized text or rich HTML formatting, adjusting the grid’s column rendering to either escape special characters or interpret HTML code within cell data, and managing encoding settings to toggle between secure, encoded text and unescaped HTML presentation in grid columns.
</div>

#### Example - prevent HTML encoding

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name", encoded: false }
      ],
      dataSource: [ { name: "<strong>Jane Doe</strong>" } ]
    });
    </script>

### columns.exportable `Boolean|Object` *(default: true)*

> If the column isn't visible, the `exportable` property must be set to `true` explicitly.

If set to `false` the column will be excluded from the exported Excel/PDF files.

Can be set to a JavaScript object which specifies whether the column should be exported per format.


<div class="meta-api-description">
Control which grid table columns are included or excluded from exported files such as Excel spreadsheets and PDF documents, enabling selective export by toggling export inclusion, hiding columns from export, customizing export behavior per file format like enabling export to Excel but disabling for PDF, configuring export visibility independently of on-screen column display, setting export preferences using booleans or detailed configuration objects, managing data export outputs, and adjusting export settings for columns to tailor report generation, data sharing, and file exporting workflows.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["excel", "pdf"],
      columns: [
        { field: "productName", title: "Product" },
        { field: "unitPrice", title: "Price" },
        { field: "internalCode", title: "Code", exportable: false }
      ],
      dataSource: [
        { productName: "Tea", unitPrice: 2.5, internalCode: "TEA001" },
        { productName: "Coffee", unitPrice: 3.0, internalCode: "COF001" }
      ]
    });
    </script>

### columns.exportable.excel `Boolean` *(default: true)*

If set to `false` the column will be excluded from the exported Excel file.


<div class="meta-api-description">
Control which columns are included or excluded when exporting grid or table data to Excel spreadsheets, enabling you to omit sensitive, irrelevant, or formatting columns from the .xlsx export output. Configure, set, or disable export inclusion for individual columns to customize Excel data extraction, manage data privacy by excluding certain fields, and refine the exported dataset by filtering out unwanted columns programmatically or declaratively during the export process.
</div>

#### Example - Exclude UnitsInStock column from the exported Excel file.

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["excel"],
      dataSource: {
        type: "odata-v4",
        transport: {
          read: "https://demos.telerik.com/service/v2/odata/Products"
        },
        schema:{
          model: {
            fields: {
              UnitsInStock: { type: "number" },
              ProductName: { type: "string" },
              UnitPrice: { type: "number" },
              UnitsOnOrder: { type: "number" },
              UnitsInStock: { type: "number" }
            }
          }
        },
        pageSize: 20,
      },
      pageable: true,
      height: 550,
      columns: [
        { field: "ProductName", title: "Product Name" },
        { field: "UnitPrice", title: "Unit Price" },
        { field: "UnitsOnOrder", title: "Units On Order" },
        { field: "UnitsInStock", title: "Units In Stock", exportable: { excel: false} } //excluded from the export
      ]
    });
    </script>

### columns.exportable.pdf `Boolean` *(default: true)*

If set to `false` the column will be excluded from the exported PDF file.


<div class="meta-api-description">
Control or configure which columns appear in PDF exports by enabling or disabling PDF inclusion on a per-column basis, allowing you to exclude specific grid columns from the exported PDF output to hide sensitive data, filter out irrelevant information, or customize printable reports; set export flags or options to omit certain fields from PDF generation, manage visibility during PDF export, and tailor exported content by selectively disabling PDF output for individual columns within data grids or tables.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["pdf"],
      columns: [
        { field: "productName", title: "Product" },
        { field: "unitPrice", title: "Price" },
        { field: "description", title: "Description", exportable: { pdf: false } }
      ],
      dataSource: [
        { productName: "Tea", unitPrice: 2.5, description: "Premium green tea" },
        { productName: "Coffee", unitPrice: 3.0, description: "Organic coffee beans" }
      ]
    });
    </script>

### columns.field `String`

The field to which the column is bound. The value of this field is displayed in the column's cells during data binding.
Only columns that are bound to a field can be sortable or filterable.
**The field name should be a valid Javascript identifier and should contain only alphanumeric characters (or "$" or "_"), and may not start with a digit.**


<div class="meta-api-description">
Bind grid columns to specific data fields or object properties to display corresponding values in each cell, enabling sorting and filtering capabilities only on columns linked to these data keys; configure the column to connect with a valid field name or property identifier that follows standard JavaScript naming rules, including alphanumeric characters, underscores, or dollar signs, but not beginning with a digit, for dynamic data binding, column sorting, and filtering in tabular data presentations.
</div>

#### Example - specify the column field

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        // create a column bound to the "name" field
        { field: "name" },
        // create a column bound to the "age" field
        { field: "age" }
      ],
      dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }]
    });
    </script>

### columns.filterable `Boolean|Object` *(default: true)*

If set to `true` a filter menu will be displayed for this column when filtering is enabled. If set to `false` the filter menu will not be displayed. By default a filter menu is displayed
for all columns when filtering is enabled via the [filterable](/api/javascript/ui/grid/configuration/filterable) option.

Can be set to a JavaScript object which represents the filter menu configuration.


<div class="meta-api-description">
Enable or disable individual column filtering menus in a data grid by configuring filter controls per column, allowing you to show or hide the filter dropdown or customize filtering behavior using settings or objects, supporting use cases like toggling filter visibility, applying per-column filter options, controlling interactive filter UI elements, managing filter accessibility, and tailoring filter menus to specific data types or user preferences when working with tabular data presentations or dynamic filtering scenarios.
</div>

#### Example - disable filtering

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name", filterable: false },
        { field: "age" }
      ],
      filterable: true,
      dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }]
    });
    </script>

### columns.filterable.cell `Object`

Specifies options for the filter header cell when filter mode is set to 'row'.

Can be set to a JavaScript object which represents the filter cell configuration.


<div class="meta-api-description">
Customize the filtering interface for each column header cell in grid row filter mode by controlling the filter input type, UI elements, and filter operators available per column; configure, enable, set, or modify the filter cell settings such as dropdowns, text inputs, or custom components to tailor filtering behavior, criteria selection, and user interaction at the column level during grid initialization or dynamic updates.
</div>

#### Example - cell filtering options

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        {
            field: "name",
            filterable: {
                cell: {
                    enabled: true,
                    delay: 1500
                }
            },
        },
        { field: "age" }
      ],
      filterable: {
          mode: "row"
      },
      dataSource: {
      	data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
        schema:{
        	model:{
            	fields: {
                	age: { type: "number" }
                }
            }
        }
      }
    });
    </script>

### columns.filterable.cell.dataSource `Object|kendo.data.DataSource`

Specifies a custom dataSource for the AutoComplete when the type of the column is `string`. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array, or an existing [`kendo.data.DataSource`](/api/javascript/data/datasource) instance.

It is not recommended that you use the same `dataSource` instance for the Grid and the AutoComplete because it causes negative side effects.

If the `dataSource` options is missing, a new cloned instance of the Grid's dataSource will be used.

If the `dataSource` option is an existing [`kendo.data.DataSource`](/api/javascript/data/datasource) instance, the widget will use that instance and will _not_ initialize a new one.


<div class="meta-api-description">
Control and customize the source of suggestions for autocomplete inputs within grid column filters, especially for string-type columns, by providing various options like JavaScript objects, arrays, or dedicated data source instances. Configure how filter dropdowns load, bind, and respond to user input with customized or predefined data sources, optimize filtering behavior without sharing the same data source instance between the grid and filter to avoid conflicts, and manage isolated or shared datasets for dynamic, real-time filtering suggestions. This feature supports setting up distinct data pipelines for autocomplete filtering, enabling developers to tailor data retrieval, server-side or client-side filtering, and binding mechanisms for enhanced user experience in grid filtering scenarios.
</div>

#### Example - custom cell filter autocomplete dataSource

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        {
            field: "name",
            filterable: {
                cell: {
                    dataSource: new kendo.data.DataSource({
                        data: [
                            { someField: "Jane" },
                            { someField: "Jake" },
                            { someField: "John" }
                        ]
                    }),
                    dataTextField: "someField"
                }
            }
        },
        { field: "age" }
      ],
      filterable: {
          mode: "row"
      },
      dataSource: {
      	data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
        schema:{
        	model:{
            	fields: {
                	age: { type: "number" }
                }
            }
        }
      }
    });
    </script>

### columns.filterable.cell.dataTextField `String`

Specifies the name of the field which will provide the text representation for the AutoComplete suggestion (when using String type column) when CustomDataSource is provided. By default the name of the field bound to the column will be used.


<div class="meta-api-description">
Configure which data field appears as the visible suggestion text within filter cell autocomplete inputs on grid columns when using string values and custom data sources, enabling control over displayed filtering options, selectable text fields, or property names for dropdown suggestions, including specifying alternative object properties for filter criteria, customizing filter cell autocomplete display, setting the source field for filter suggestions, and determining the exact data attribute that shows in filter dropdowns when filtering grid data by string columns with dynamic or complex data bindings.
</div>

#### Example - Using custom dataSource and providing dataTextField option

    <div id="grid"></div>
    <script>
          $("#grid").kendoGrid({
            columns: [
              {
                  field: "name",
                  filterable: {
                      cell: {
                          dataSource: new kendo.data.DataSource({ data: [
                              { someField: "Jane" },
                              { someField: "Jake" },
                              { someField: "John" }
                          ] }),
                          dataTextField: "someField"
                      }
                  }
              },
              { field: "age" }
            ],
            filterable: { mode: "row" },
            dataSource: {
            	data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
              schema:{
              	model:{
                  	fields: {
                      	age: { type: "number" }
                      }
                  }
              }
            }
         });
    </script>

### columns.filterable.cell.delay `Number` *(default: 200)*

Specifies the delay of the AutoComplete widget which will provide the suggest functionality (when using String type column).


<div class="meta-api-description">
Configure the time delay before autocomplete suggestions appear when filtering text or string columns in a data grid, controlling how quickly the filter input triggers search suggestions or lookup results; adjust debounce intervals to manage rapid input, limit frequent requests, optimize performance by setting wait times for filter dropdowns with typeahead, autocomplete, or live search features in grid columns containing string data, ensuring smoother user input experience when searching or narrowing down string-based records.
</div>

#### Example - Specifying delay option for the AutoComplete widget used to make suggestions while filtering.

    <div id="grid"></div>
    <script>
          $("#grid").kendoGrid({
              columns: [
                {
                    field: "name",
                    filterable: {
                        cell: {
                            delay: 1500
                        }
                    }
                },
                { field: "age" } ],
            filterable: { mode: "row" },
            dataSource: {
            	data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
              schema:{
              	model:{
                  	fields: {
                      	age: { type: "number" }
                      }
                  }
              }
            }
          });
    </script>

### columns.filterable.cell.inputWidth `Number`

Specifies the width of the input before it is initialized or turned into a widget. Provides convenient way to set the width according to the column width.


<div class="meta-api-description">
Adjust or configure the initial width of filter inputs within grid column headers to align precisely with column sizes, enabling setting pixel values or CSS width styles to control filter cell input dimensions before rendering or widget initialization; useful for ensuring consistent alignment, customizing filter input sizing, matching filter boxes to column widths, and managing filter cell appearance in data grids or tables with customizable filter input widths.
</div>

#### Example - Specifying inputWidth option for the filter cell of a column

    <div id="grid"></div>
    <script>
          $("#grid").kendoGrid({
              columns: [
                {
                    field: "name",
                    filterable: {
                        cell: {
                            inputWidth: 333
                        }
                    }
                },
                { field: "age" } ],
            filterable: { mode: "row" },
            dataSource: {
            	data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
              schema:{
              	model:{
                  	fields: {
                      	age: { type: "number" }
                      }
                  }
              }
            }
          });
    </script>

### columns.filterable.cell.suggestionOperator `String` *(default: "startswith")*

Specifies the AutoComplete `filter` option. The possible values are the same as the ones for the AutoComplete `filter` option - `"startswith"`, `"endswith"`, `"contains"`. The `"contains"` operator performs a case-insensitive search. To perform a case-sensitive filtering, set a custom filtering function through the [`dataSource.filter.operator`](/api/javascript/data/datasource/configuration/filter#filteroperator) option.

> This operator is completely independent from the operator used for the filtering on this column. For more inforamtion, check [`operator`](columns.filterable.cell.operator).


<div class="meta-api-description">
Configure how autocomplete suggestions in grid columns filter results by specifying whether matches should start with, end with, or contain the query text, including options for case-insensitive substring matching. Enable control over filtering behavior for suggestion lists using terms like "startswith," "endswith," or "contains," or implement custom filter functions for case-sensitive matching scenarios. Adjust and customize the filtering logic applied to dropdown autocomplete suggestions independently from the main column filter operator, allowing flexible search behavior and precise control of suggestion matching in grid filtering interfaces.
</div>

#### Example - Specifying suggestionOperator option for the filter cell of a column

    <div id="grid"></div>
    <script>
          $("#grid").kendoGrid({
              columns: [
                {
                    field: "name",
                    filterable: {
                        cell: {
                            suggestionOperator: "contains"
                        }
                    }
                },
                { field: "age" } ],
            filterable: { mode: "row" },
            dataSource: {
            	data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
              schema:{
              	model:{
                  	fields: {
                      	age: { type: "number" }
                      }
                  }
              }
            }
          });
    </script>

### columns.filterable.cell.minLength `Number` *(default: 1)*

Specifies the minLength option of the AutoComplete widget when column is of type string.


<div class="meta-api-description">
Configure the minimum number of characters needed before the filter input triggers autocomplete suggestions or queries within a grid column's filter cell, specifically for string data types, controlling when search suggestions appear, setting thresholds for user input length, enabling or disabling early filtering prompts, adjusting autocomplete activation limits for typed characters, managing how the grid reacts to partial text entries, optimizing filtering responsiveness, customizing the minimum input length to start lookup or dropdown suggestion lists, and controlling the delay before filter options are displayed as users type in string columns.
</div>

#### Example - Specifying minLength of the AutoComplete widget when using filter cell.

    <div id="grid"></div>
    <script>
          $("#grid").kendoGrid({
              columns: [
                {
                    field: "name",
                    filterable: {
                        cell: {
                            minLength: 3
                        }
                    }
                },
                { field: "age" } ],
            filterable: { mode: "row" },
            dataSource: {
            	data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
              schema:{
              	model:{
                  	fields: {
                      	age: { type: "number" }
                      }
                  }
              }
            }
            });
    </script>


### columns.filterable.cell.enabled `Boolean` *(default: true)*

When set to false the Grid will not render the cell filtering widget for that specific column.


<div class="meta-api-description">
Control whether individual columns display cell-level filters by enabling or disabling the filter widget within each column of a data grid, allowing customization of per-column filtering interfaces, turning off inline filter inputs for specific table columns, configuring whether cell-based filter controls appear in grid columns, managing visibility of column filter UI elements, and setting options to suppress or activate embedded filter components inside column cells to tailor filtering behavior and user interaction within grid layouts.
</div>

#### Example - Disable the cell filtering for a specific column.

    <div id="grid"></div>
    <script>
          $("#grid").kendoGrid({
              columns: [
                {
                    field: "name",
                    filterable: {
                        cell: {
                            enabled: false
                        }
                    }
                },
                { field: "age" } ],
            filterable: { mode: "row" },
            dataSource: {
            	data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
              schema:{
              	model:{
                  	fields: {
                      	age: { type: "number" }
                      }
                  }
              }
            }
          });
    </script>

### columns.filterable.cell.operator `String` *(default: "eq")*

Specifies the default operator that will be used for the cell filtering.

> If you want to change how the AutoComplete suggestions are filtered use [suggestionOperator](columns.filterable.cell.suggestionoperator).


<div class="meta-api-description">
Set or customize the default comparison operator for filtering data in grid cells, enabling control over how filter expressions are constructed such as matching exact values, partial text matches like contains, or prefix matches like startsWith. Configure which operator to apply automatically when users enter filter criteria in grid columns, affecting search behavior and filtering logic at initialization. Modify or specify the default relational or string-based operators used for filtering individual grid cells to influence results shown, supporting common filter terms like equals, contains, starts with, or other comparison methods to refine data queries within the grid. Adjust or define how filtering inputs interpret user criteria by picking operators that shape filter matching behavior in column cells, improving search precision and customization.
</div>

#### Example - Specifying default operator for cell filtering.

    <div id="grid"></div>
    <script>
          $("#grid").kendoGrid({
              columns: [
                {
                    field: "name",
                    filterable: {
                        cell: {
                            operator: "neq"
                        }
                    }
                },
                { field: "age" } ],
            filterable: { mode: "row" },
            dataSource: {
            	data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
              schema:{
              	model:{
                  	fields: {
                      	age: { type: "number" },
                        name: {type: "string"}
                      }
                  }
              }
            }
         });
    </script>

### columns.filterable.cell.showOperators `Boolean` *(default: true)*

Specifies whether to show or hide the DropDownList with the operators.


<div class="meta-api-description">
Configure the display of filtering operator selectors within grid column filter cells, enabling or disabling the dropdown menu that lets users choose filter conditions like equals, contains, starts with, or greater than; control the visibility of comparison operators in filter inputs to customize how users interact with column filters, toggle operator visibility for simpler or advanced filtering interfaces, and set whether filtering options for columns include operator selectors during grid setup or runtime adjustments for tailored data filtering experiences.
</div>

#### Example - Hide the operators dropdownlist for cell filtering.

    <div id="grid"></div>
    <script>
          $("#grid").kendoGrid({
              columns: [
                {
                    field: "name",
                    filterable: {
                        cell: {
                            showOperators: false,
                            operator: "contains"
                        }
                    }
                },
                { field: "age" } ],
            filterable: { mode: "row" },
            dataSource: {
            	data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
              schema:{
              	model:{
                  	fields: {
                      	age: { type: "number" }
                      }
                  }
              }
            }
          });
    </script>

### columns.filterable.cell.template `Function`

JavaScript function which will customize how the input for the filter value is rendered.
The function receives an object argument with two fields:

* **`element`** - the default input inside the filter cell;
* **`dataSource`** - a Kendo UI DataSource instance, which has the same settings as the Grid dataSource, but will only contain data items with unique values for the current column.
This instance is also used by the default AutoComplete widget, which is used inside the filter cell if no template is set. Keep in mind that the passed dataSource instance may still not be
populated at the time the template function is called, if the Grid uses remote binding.


<div class="meta-api-description">
Control and customize the filter input rendering within grid filter cells by defining a JavaScript template function that modifies or replaces the default input element, enabling developers to implement custom filtering UI components like autocomplete or dropdowns tied to unique column values; this function receives parameters including the filter cell’s default input element and a data source instance pre-filtered to unique column entries, supporting scenarios for remote or local binding and allowing flexible filter input customization, dynamic data binding, and tailored user interaction for grid filtering across different columns.
</div>

#### Example - Using template for the filter cell

    <div id="grid"></div>
    <script>
          $("#grid").kendoGrid({
              columns: [
                {
                    field: "color",
                    filterable: {
                        cell: {
                            template: function (args) {
                                // create a DropDownList of unique values (colors)
                                args.element.kendoDropDownList({
                                    dataSource: args.dataSource,
                                    dataTextField: "color",
                                    dataValueField: "color",
                                    valuePrimitive: true
                                });

                                // or

                                // create a ColorPicker
                                // args.element.kendoColorPicker();
                            },
                            showOperators: false
                        }
                    }
                },
                { field: "size" } ],
            filterable: { mode: "row" },
            dataSource: [ { color: "#ff0000", size: 30 }, { color: "#000000", size: 33 }] });
    </script>

#### Example - use a Kendo UI DropDownList for a boolean column filter

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [ "name", {
          field: "employed",
          filterable:{
            cell:{
              template:function(args){
                args.element.kendoDropDownList({
                  dataSource: [{ value: true, text: "True" }, { value: false, text: "False" }],
                  optionLabel: "--Select--",
                  dataTextField: "text",
                  dataValueField: "value"
                });
              }
            }
          }
        }],
        filterable: { mode: "row"},
        dataSource: {
          data:[{ name: "John Doe" , employed: true }, { name: "Jane Doe", employed: true }, { name: "Tim Doe", employed: false} ],
          schema:{
            model:{
              fields:{
                employed: { type: "boolean" }
              }
            }
          }
        }
      });
    </script>

### columns.filterable.extra `Boolean` *(default: true)*

If set to `true` the filter menu of the column allows the user to input a second criterion.


<div class="meta-api-description">
Control multi-condition filtering in grid columns by enabling a second filter input that supports combining multiple criteria using logical operators like AND or OR, allowing users to refine data with more complex, multi-criteria queries and flexible filter menus where two separate conditions can be set and applied simultaneously to enhance data searching and filtering capabilities within table columns.
</div>

#### Example - disable the second filter criterion for the name field.

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" , filterable : { extra: false }},
          { field: "age" }
        ],
        filterable: true,
        dataSource: {
         data: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
          schema:{
          	model:{
              	fields: {
                  	age: { type: "number" }
                  }
              }
          }
        }
      });
    </script>

### columns.filterable.multi `Boolean` *(default: false)*

Use this option to enable the MultiCheck filtering support for that column.

> If you have enabled the columns.multi option and your Grid uses serverPaging (or ServerOperations(true) when using the MVC wrappers) you will need to provide columns.filterable.dataSource. Otherwise, a negative impact on the performance could be observed.


<div class="meta-api-description">
Configure a multi-select checkbox filter on a grid column to allow users to select and filter by multiple values simultaneously, supporting multi-value filtering with checkboxes for enhanced data querying. Enable or control multi-check filtering functionality on individual grid columns, ideal for scenarios requiring selection of multiple criteria or categories in dynamic data grids. Optimize filtering for multi-select options, ensuring compatibility with server-side paging or operations by providing a dedicated data source to maintain performance. Set up multi-value filtering controls that support complex queries, multiple selections, and efficient filtering experiences on grid columns with customizable data sources and server processing considerations.
</div>

#### Example - enable checkbox filtering support.

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "country",
        filterable: {
            multi:true
        }
      } ],
    filterable: true,
      dataSource: [ { country: "BG" }, { country: "USA" } ]
    });
    </script>

### columns.filterable.dataSource `Object|Array|kendo.data.DataSource`

The dataSource configuration for the items that will be used when [columns.filterable.multi](columns.filterable.multi) is enabled.


<div class="meta-api-description">
Set or customize the list of selectable filter options for a grid column using a configurable source for multi-select filtering, including local arrays, remote APIs, or dynamic data sources, enabling users to control, populate, and bind filter values for columns with multi-filter capabilities and manage how filter items are loaded, refreshed, or filtered in interactive data grids.
</div>

#### Example - provide custom DataSource for the checkbox filtering.

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "country",
        filterable: {
            multi:true,
            dataSource: [{country: "BG"},{country: "GRM"}, {country: "USA"}]
        }
      } ],
    filterable: true,
      dataSource: [ { country: "BG" }, { country: "USA" } ]
    });
    </script>

### columns.filterable.checkAll `Boolean` *(default: true)*

Controls whether to show or not the checkAll checkbox before the other checkboxes when using checkbox filtering.


<div class="meta-api-description">
Control the visibility and placement of the "Select All" checkbox within checkbox filters for grid columns, enabling or disabling a master toggle that allows users to quickly select or deselect all filter options; customize whether the select-all option appears before individual filters to streamline multi-select filtering, improve user interaction with bulk selection in column filters, or manage checkbox filtering behavior in data grids by toggling the check-all feature on or off.
</div>

#### Example - provide custom DataSource for the FilterMultiCheck filtering.

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "country",
        filterable: {
        multi:true,
          checkAll: false
        }
      }],
    filterable: true,
      dataSource: [ { country: "BG" }, { country: "USA" } ]
    });
    </script>

### columns.filterable.itemTemplate `Function`

Allows customization on the logic that renders the checkboxes when using checkbox filtering.


<div class="meta-api-description">
Customize the rendering and appearance of individual checkbox options in a grid column’s filter list by controlling the display template, enabling customization of labels, icons, styles, attributes, or conditional content within each checkbox filter item; configure how filter checkboxes are visually presented and dynamically generated in checkbox-based filtering interfaces to tailor the filtering UI, apply data bindings, or modify the filter option elements for enhanced interactivity and clarity in checkbox filter lists.
</div>

#### Example - provide custom DataSource for the FilterMultiCheck filtering.

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            columns: [ {
                field: "country",
                filterable: {
                    multi:true,
                    itemTemplate: function(e) {
                        return ({country, all}) => `<span><label><span>${country || all}</span><input type='checkbox' name='" + e.field + "' value='${country}'/></label></span>`
                    }
                }
            }],
            filterable: true,
            dataSource: [ { country: "BG" }, { country: "USA" } ]
        });
    </script>

### columns.filterable.operators `Object`

The property is identical to [`filterable.operators`](filterable.operators), but is used for a specific column.


<div class="meta-api-description">
Customize or set specific filter operators for each individual column in a data grid to override default or global filtering options, enabling tailored filtering behavior per column through configurable operator lists; control, adjust, or specify allowed comparison types such as equals, contains, starts with, greater than, or custom operators for more precise column-level filtering in grids, data tables, or tabular displays during setup or initialization.
</div>

#### Example - Set custom filterable operators

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          {
            field: "name",
            filterable:{
              operators:{
                string:{
                  eq: "custom equal",
                  neq: "custom not equal"
                }
              }
            }
          },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: {
              id: "id",
              fields: {
                name: { type: "string" },
                age: { type: "number" }
              }
            }
          }
        },
        filterable: {
          extra: false
        }
      });
    </script>

### columns.filterable.search `Boolean` *(default: false)*
Controls whether to show a search box when [checkbox filtering](columns.filterable.multi) is enabled.


<div class="meta-api-description">
Control and enable the display of a search input field above multi-select checkbox filters within grid columns, allowing users to quickly find and filter checkbox options by typing keywords or partial matches. Configure and set searchable filtering for column filters with multi-selection enabled to improve user interaction, support dynamic filtering of checkbox items, enhance findability in large filter lists, and customize the visibility and behavior of text-based searching inside checkbox filter dropdowns in data grids. This feature supports filtering checkbox options through a search box, enabling user-friendly, fast checkbox item lookup in column filters with multiple selections turned on.
</div>

#### Example - Enable checkbox filter search

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            columns: [{
                field: "country",
                filterable: {
                    multi: true,
                    search: true
                }
            }],
            filterable: true,
            dataSource: [{ country: "BG" }, { country: "USA" }]
        });
    </script>

### columns.filterable.ignoreCase `Boolean` *(default: true)*
Toggles between case-insensitive (default) and case-sensitive [searching](columns.filterable.search).


<div class="meta-api-description">
Configure the column filtering behavior to determine if text matching should be case-insensitive or case-sensitive, controlling whether filter searches distinguish between uppercase and lowercase letters when users input search terms or keywords. Adjust filter text comparison sensitivity to toggle ignoring letter case or enforcing exact letter casing in grid column searches, enabling more flexible or strict matching for developer queries about search filtering, filtering options, exact text filters, and how case affects filter results in data grids or tables.
</div>

#### Example - Enable checkbox filter search

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            columns: [{
                field: "country",
                filterable: {
                    multi: true,
                    search: true,
                    ignoreCase: true
                }
            }],
            filterable: true,
            dataSource: [{ country: "BG" }, { country: "USA" }]
        });
    </script>

### columns.filterable.ui `String|Function`

The role data attribute of the widget used in the filter menu or a JavaScript function which initializes that widget.

> This feature is not supported for columns which have their [values](columns.values) option set.

> If [filterable.mode](filterable.mode) is set to 'row', [columns.filterable.cell.template](columns.filterable.cell.template) should be used to customize the input.


<div class="meta-api-description">
Set or customize the filtering input element displayed in the grid’s filter menu by specifying the role attribute of a UI component or providing a JavaScript function to initialize and control the filter input behavior, enabling tailored filter controls, custom filter interfaces, or specialized input widgets for filtering column data; applicable when filtering is enabled in the filter menu mode (not in row filtering mode), offering flexible configuration of filter inputs, setting custom filter components, modifying filter UI elements, and integrating bespoke filter input logic for enhanced grid filtering capabilities.
</div>

#### Parameters

##### element `HTML Element`

An html input element that will be rendered in the filter menu.

#### Example - specify the filter UI as a string

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "date",
        filterable: {
          ui: "datetimepicker" // use Kendo UI DateTimePicker
        }
      } ],
      filterable: true,
      dataSource: {
          data:[ { date: new Date() }, { date: new Date() } ],
          schema: {
            model: {
              fields: {
                date: {
                  type: "date"
                }
              }
            }
          }
        }
    });
    </script>

#### Example - initialize the filter UI

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "date",
        filterable: {
          ui: function(element) {
            element.kendoDateTimePicker(); // initialize a Kendo UI DateTimePicker
          }
        }
      } ],
        filterable: true,
        dataSource: {
          data:[ { date: new Date() }, { date: new Date() } ],
          schema: {
            model: {
              fields: {
                date: {
                  type: "date"
                }
              }
            }
          }
        }
    });
    </script>

#### Example - Replace the default input with a textarea element

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        filterable: {
          extra: false,
          ui: function(element) {
            $(element).replaceWith("<textarea data-bind='value:filters[0].value'></textarea>"); // Replace the input element with an HTML textarea
          }
        }
      } ],
        filterable: true,
        dataSource: [ { name: "John" }, { name: "Mark" }, { name: "Tom" } ]
    });
    </script>

#### Example - use a Kendo UI DropDownList for a boolean column

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [ "name", {
          field: "employed",
          filterable:{
            ui: function(element){
              element.kendoDropDownList({
                dataSource: [{ value: true, text: "True" }, { value: false, text: "False" }],
                optionLabel: "--Select--",
                dataTextField: "text",
                dataValueField: "value"
              });
            }
          }
        } ],
        filterable: true,
        dataSource: {
          data:[{ name: "John Doe" , employed: true }, { name: "Jane Doe", employed: true }, { name: "Tim Doe", employed: false} ],
          schema:{
            model:{
              fields:{
                employed: { type: "boolean" } // defining the field provides filterable.extra false out of the box for the column
              }
            }
          }
        }
      });
    </script>

> Check [Filter menu customization](https://demos.telerik.com/kendo-ui/grid/filter-menu-customization) for a live demo.

### columns.footerAttributes `Object`

HTML attributes of the column footer. The `footerAttributes` option can be used to set the HTML attributes of that cell.

> HTML attributes which are JavaScript keywords (e.g. *class*) must be quoted.


<div class="meta-api-description">
Customize or set HTML attributes on the footer cell of a grid column by configuring attribute name and value pairs such as class, id, data attributes, or custom tags to control styling, identification, data hooks, or behavior at the column footer level. Enable adding or overriding attributes like CSS classes, element IDs, data-binding properties, or ARIA roles for accessibility in the footer area of grid columns. This supports applying HTML attributes dynamically or statically during grid setup to target footer cells for styling, scripting, or identification, including handling special attributes that require quoting such as class or JavaScript reserved keywords.
</div>

#### Example - set the column footer HTML attributes

    <div id="grid"></div>
    <script>
        let encode = kendo.htmlEncode;
        $("#grid").kendoGrid({
          columns: [
            { field: "name" },
            { field: "age",
              footerTemplate: ({ age }) => `Min: ${encode(age.min)} Max: ${encode(age.max)}`,
              footerAttributes: {
                  "class": "table-footer-cell k-text-right",
                  style: "font-size: 14px"
              }
            }
          ],
          dataSource: {
            data: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
            ],
            aggregate: [
                { field: "age", aggregate: "min" },
                { field: "age", aggregate: "max" }
            ]
          }
        });
    </script>

The table footer cell will look like this: `<td class="table-footer-cell" style="text-align: right; font-size: 14px">Min: 30 Max: 33</td>`.

### columns.footerTemplate `String|Function`
The [template](/api/javascript/kendo/methods/template) which renders the footer table cell for the column.

The fields which can be used in the template are:

* average - the value of the "average" aggregate (if specified)
* count - the value of the "count" aggregate (if specified)
* max - the value of the "max" aggregate (if specified)
* min - the value of the "min" aggregate (if specified)
* sum - the value of the "sum" aggregate (if specified)
* data - provides access to all available aggregates, e.g. `data.fieldName1.sum` or `data.fieldName2.average`

> If the grid is bound using [source binding](/framework/mvvm/bindings/source), it will initially be assigned with an empty [dataSource](/api/javascript/data/datasource) without any aggregates. In order to avoid a JavaScript error for an undefined aggregate when the footer is rendered with the empty dataSource, you should check if the field is defined in the template data before accessing the value. If no groups are specified for the actual dataSource, then you will also need to use the field name to access the aggregate value.


<div class="meta-api-description">
Control and customize the rendering of footer cells in grid columns by defining templates that display aggregate calculations such as sum, average, count, minimum, and maximum values or custom text. Enable dynamic footer content using template syntax accessing aggregates by field names or overall data keys, supporting cases with grouped or ungrouped data sources. Set conditional checks to handle empty data or uninitialized aggregates to prevent errors when the grid initially loads with no data. Configure footer templates to show calculated summaries, totals, counts, or any aggregated metric, adapting to different data aggregations and enabling flexible presentation of summary information at the bottom of grid columns.
</div>

#### Example - specify column footer template

    <div id="grid"></div>
    <script>
    let encode = kendo.htmlEncode;
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age",
          footerTemplate: ({ age }) => `Min: ${encode(age.min)} Max: ${encode(age.max)}`,
        }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        aggregate: [
            { field: "age", aggregate: "min" },
            { field: "age", aggregate: "max" }
        ]
      }
    });
    </script>

#### Example - specify footer template when using source binding

    <div data-role="grid" data-bind="source:dataSource"
         data-columns='["category", "name", {"field": "price", "footerTemplate": ({price}) => `Total: ${kendo.htmlEncode(price ? price.sum : 0)}`}]'></div>
    <script>
      $(function() {
        var viewModel = kendo.observable({
          dataSource: new kendo.data.DataSource({
            data: [
              { category: "Beverages", name: "Chai", price: 18 },
              { category: "Beverages", name: "Chang", price: 19 },
              { category: "Seafood", name: "Konbu", price: 6 }
            ],
            group: [{field: "category"}],
            aggregate: [
              { field: "price", aggregate: "sum" }
            ]
          })
        });
        kendo.bind($("body"), viewModel);
      });
    </script>

#### Example - specify footer template when using source binding and there are no groups

    <div data-role="grid" data-bind="source:dataSource"
         data-columns='["category", "name", {"field": "price", "footerTemplate": ({price}) => `Total: ${kendo.htmlEncode(price ? price.sum : 0)}`}]'></div>
    <script>
      $(function() {
        var viewModel = kendo.observable({
          dataSource: new kendo.data.DataSource({
            data: [
              { category: "Beverages", name: "Chai", price: 18 },
              { category: "Beverages", name: "Chang", price: 19 },
              { category: "Seafood", name: "Konbu", price: 6 }
            ],
            aggregate: [
              { field: "price", aggregate: "sum" }
            ]
          })
        });
        kendo.bind($("body"), viewModel);
      });
    </script>

### columns.format `String`

The format that is applied to the value before it is displayed.

Takes the form "{0:format}" where "format" can be a:

* [default number format](/globalization/intl/numberformatting#default-number-formats)
* [custom number format](/globalization/intl/numberformatting#custom-number-formats)
* [default date format](/globalization/intl/dateformatting#default-date-formats)
* [custom date format](/globalization/intl/dateformatting#custom-date-formats)

> The [kendo.format](/api/javascript/kendo/methods/format) function is used to format the value.


<div class="meta-api-description">
Control and customize how data appears in table columns by formatting numbers and dates before display, enabling precise adjustment of numeric precision, currency, percentages, date and time layouts, and localized formats using pattern strings or custom format specifiers. Configure column value presentation to handle default and advanced formatting scenarios, apply format strings similar to "{0:format}" for consistent visual output, and leverage formatting functions to transform raw data into readable, user-friendly strings that match regional or application-specific styles in grids or data tables. Adjust and set formatting options to ensure correct rendering of decimals, thousands separators, date formats like short, long, ISO, or custom-built patterns, enhancing clarity and usability in grid interfaces.
</div>

#### Example - specify default column format for a number field

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [ {
          field: "product",
        }, {
          field: "number",
          format: "{0:c}"
        } ],
        dataSource: [ { product: "Chai", number: 3.1415 } ]
      });
    </script>

#### Example - specify custom column format for a number field

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [ {
          field: "product",
        }, {
          field: "number",
          format: "{0:0.0000}"
        } ],
        dataSource: [ { product: "Chai", number: 94 } ]
      });
    </script>


#### Example - specify default format for a date field

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "date",
        format: "{0:g}"
      }, {
        field: "product"
      } ],
      dataSource: [ { date: new Date(), product: "Chai" } ]
    });
    </script>

#### Example - specify custom format for a date field

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "date",
        format: "{0: yyyy-MM-dd HH:mm:ss}"
      }, {
        field: "product"
      } ],
      dataSource: [ { date: new Date(), product: "Chai" } ]
    });
    </script>


### columns.groupable `Boolean|Object` *(default: true)*

If set to `false` the user will not be able to group the grid by this column (requires Grid [`groupable`](/api/javascript/ui/grid/configuration/groupable) property to be enabled). By default all columns are groupable.


<div class="meta-api-description">
Enable or disable the ability for users to group grid rows by a specific column, controlling whether a column supports grouping, grouping toggles, or row categorization based on column values, including options to configure, set, or restrict group-by functionality per column in data grids or tables where grouping features are available, affecting how users can organize, cluster, or aggregate data visually by particular fields, with default behavior allowing grouping unless explicitly turned off.
</div>

#### Example - disable grouping for individual column

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      groupable: true,
      columns: [
        { field: "name", groupable: false },
        { field: "age"}
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 30 }
        ]
      }
    });
    </script>

### columns.groupable.sort `Object`

Sets the sort configuration when grouping.


<div class="meta-api-description">
Configure and control the sorting behavior of grouped data within grid columns by setting criteria, ordering preferences, sort direction, or custom sorting logic that determines how grouped items are arranged and displayed when data is grouped. Enable sorting options for grouped datasets, adjust the initial sort order of groups, define sorting parameters during grouping, and specify how group data is prioritized or sequenced to influence the organized presentation of grouped elements in a grid layout. Manage and customize the order in which grouped rows appear by setting sorting rules, directions, or configurations that affect group hierarchy and visual sorting when grouping functionality is active.
</div>

#### Example - use a custom function to compare the groups

    <div id="grid"></div>

    <script>
        $("#grid").kendoGrid({
            dataSource: {
                data: [
                    { id: 1, name: "Salmon", category: "Seafood" },
                    { id: 3, name: "Ice cream", category: "Desserts" },
                    { id: 2, name: "Mackerel", category: "Seafood" },
                    { id: 4, name: "Cake", category: "Desserts" },
                    { id: 5, name: "Lemonade", category: "Beverages" },
                    { id: 6, name: "Tea", category: "Beverages" },
                    { id: 7, name: "Coffee", category: "Beverages" },
                ],
                pageSize: 10
            },
            pageable: true,
            height: 550,
            groupable: true,
            columns: [
                { field: "id", title: "Id", width: "120px" },
                { field: "name", title: "Name", width: "120px" },
                {
                    field: "category",
                    title: "Category",
                    width: "120px",
                    groupable: {
                        sort: {
                            compare: function(a, b) {
                                if (a.items.length === b.items.length) {
                                    return 0;
                                } else if (a.items.length > b.items.length) {
                                    return 1;
                                } else {
                                    return -1;
                                }
                            }
                        }
                    }
                }
            ]
        });
    </script>

### columns.groupable.sort.compare `Function`

A JavaScript function which is used to compare the groups (refer to [`sortable.compare`](/api/javascript/ui/grid/configuration/columns.sortable#columns.sortable.compare) for comparing the items of the groups). It has the same signature as the [compare function accepted by Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).



<div class="meta-api-description">
Control and customize the sorting order of grouped data by defining a custom comparison function that compares group keys, aggregated group values, or other group attributes to determine how groups are ordered in the grid or list view. Enable precise group sorting logic by setting a JavaScript comparator function similar to the standard array sort compare, allowing developers to configure, override, or fine-tune the grouping sequence based on custom criteria, numeric or string comparisons, or complex aggregation results. This sorting control focuses on groups rather than individual items, helping to adjust how grouped sections are arranged, sorted, or prioritized within user interfaces that support data grouping and aggregation.
</div>

#### Example - use a custom function to compare the groups

    <div id="grid"></div>

    <script>
        $("#grid").kendoGrid({
            dataSource: {
                data: [
                    { id: 1, name: "Salmon", category: "Seafood" },
                    { id: 3, name: "Ice cream", category: "Desserts" },
                    { id: 2, name: "Mackerel", category: "Seafood" },
                    { id: 4, name: "Cake", category: "Desserts" },
                    { id: 5, name: "Lemonade", category: "Beverages" },
                    { id: 6, name: "Tea", category: "Beverages" },
                    { id: 7, name: "Coffee", category: "Beverages" },
                ],
                pageSize: 10
            },
            pageable: true,
            height: 550,
            groupable: true,
            columns: [
                { field: "id", title: "Id", width: "120px" },
                { field: "name", title: "Name", width: "120px" },
                {
                    field: "category",
                    title: "Category",
                    width: "120px",
                    groupable: {
                        sort: {
                            compare: function(a, b) {
                                if (a.items.length === b.items.length) {
                                    return 0;
                                } else if (a.items.length > b.items.length) {
                                    return 1;
                                } else {
                                    return -1;
                                }
                            }
                        }
                    }
                }
            ]
        });
    </script>

### columns.groupable.sort.dir `String` *(default: asc)*

The sort order of the groups according to the group field.

The supported values are:

*  `"asc"` (ascending order)
* `"desc"` (descending order)


<div class="meta-api-description">
Control or configure the order in which grouped rows appear by setting the direction of sorting for grouped columns in a data grid or table, enabling ascending or descending group arrangement based on the grouped field, allowing you to specify whether grouped data clusters display from lowest to highest or highest to lowest, and adjusting the sorting behavior for grouped entries within grid views to organize grouped records systematically according to user preference or application logic.
</div>

#### Example - sort the groups in descending order

    <div id="grid"></div>

    <script>
        $("#grid").kendoGrid({
            dataSource: {
                data: [
                    { id: 1, name: "Salmon", category: "Seafood" },
                    { id: 3, name: "Ice cream", category: "Desserts" },
                    { id: 2, name: "Mackerel", category: "Seafood" },
                    { id: 4, name: "Cake", category: "Desserts" },
                    { id: 5, name: "Lemonade", category: "Beverages" },
                    { id: 6, name: "Tea", category: "Beverages" },
                    { id: 7, name: "Coffee", category: "Beverages" },
                ],
                pageSize: 10
            },
            pageable: true,
            height: 550,
            groupable: true,
            columns: [
                { field: "id", title: "Id", width: "120px" },
                { field: "name", title: "Name", width: "120px" },
                {
                    field: "category",
                    title: "Category",
                    width: "120px",
                    groupable: {
                        sort: {
                            dir: "desc"
                        }
                    }
                }
            ]
        });
    </script>

### columns.groupHeaderColumnTemplate `String|Function`

Introduced in the Kendo UI 2018 R3 release.

The [template](/api/javascript/kendo/methods/template) which renders the content for specific column in the group header when the grid is grouped by the column [field](columns.field).

> **Note:** The columns.groupHeaderTemplate has a higher priority than columns.groupHeaderColumnTemplate. If columns.groupHeaderTemplate is defined for the current group column it will take precedence over the columns.groupHeaderColumnTemplate setting of the currently first visible column. See [Group Templates](/web/grid/Templates/group-templates) for more details on how this can be useful.

The fields which can be used in the template are:

* average - the value of the "average" aggregate (if specified)
* count - the value of the "count" aggregate (if specified)
* max - the value of the "max" aggregate (if specified)
* min - the value of the "min" aggregate (if specified)
* sum - the value of the "sum" aggregate (if specified)
* data - provides access to all available aggregates, e.g. `data.fieldName1.sum` or `data.fieldName2.average`
* group - provides information for the current group. An object with three fields - `field`, `value` and `items`. `items` field contains the data items for current group. Returns groups if the data items are grouped (in case there are child groups)

> **Important**
>
> If the template is declared as a function the group field is accessible only through the data field,
> e.g. `data.fieldName1.group.value`.


<div class="meta-api-description">
Customize the group header content for each column when data is grouped by that column in a grid, enabling control over displayed labels, aggregated metrics like sum, count, average, min, max, and group-specific metadata including field names, group values, and nested grouped items; configure templates to show or format aggregation results, tailor group headers per column, override default group header displays, and dynamically access group data and aggregates for customized visualization in grouped grid views.
</div>

#### Example - set the group header column template

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age",
          groupHeaderColumnTemplate: ({ age }) => `Total: ${age.count}`
        }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 30 }
        ],
        group: { field: "age", aggregates: [ { field: "age", aggregate: "count" }] }
      }
    });
    </script>

#### Example - set the group header column template as function

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age",
          groupHeaderColumnTemplate: function(e) {
              return "Total: " + e.age.count;
          }
        }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 30 }
        ],
        group: { field: "age", aggregates: [ { field: "age", aggregate: "count" }] }
      }
    });
    </script>

### columns.groupHeaderTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the group header when the grid is grouped by the column [field](columns.field). By default the name of the field
and the current group value is displayed.

The fields which can be used in the template are:

* value - the current group value
* field - the current group field
* average - the value of the "average" aggregate (if specified)
* count - the value of the "count" aggregate (if specified)
* max - the value of the "max" aggregate (if specified)
* min - the value of the "min" aggregate (if specified)
* sum - the value of the "sum" aggregate (if specified)
* aggregates - provides access to all available aggregates, e.g. `aggregates.fieldName1.sum` or `aggregates.fieldName2.average`
* items - the data items for current group. Returns groups if the data items are grouped (in case there are child groups)

> **Important**
>
> To use aggregates from other fields in the `column.groupHeaderTemplate` add them to the **other** [`columns.aggregates`](#columns.aggregates).


<div class="meta-api-description">
Configure and customize the layout and content of grid group headers when data is grouped by a specific column field, enabling dynamic templating of group titles using placeholders like current group value, field name, and various aggregate metrics such as sum, average, count, minimum, maximum, or custom aggregates from related columns, allowing flexible control over grouping header display, formatting, and inclusion of nested group items or child groups, useful for tailoring group headers to display specific summary statistics, multiple aggregate data points, or customized text patterns based on grouped data properties.
</div>

#### Example - set the group header template

    <div id="grid"></div>
    <script>
     var grid = $("#grid").kendoGrid({
        groupable: true,
        columns: [
            { field: "name" },
            {
                field: "age",
                groupHeaderTemplate: ({ age, aggregates }) => `Age:${age.group.value} total: ${age.count} Max Year: ${aggregates.year.max}`,
                aggregates: ["count"]
            },
            { field: "year", aggregates: ["max"] }
        ],
        dataSource: {
            data: [
                { name: "Jane Doe", age: 30, year: 1978 },
                { name: "John Doe", age: 30, year: 1980 }
            ],
            group: {
                field: "age", aggregates: [{ field: "age", aggregate: "count" },
                { field: "age", aggregate: "max" }, { field: "year", aggregate: "max" }]
            }
        }
    }).data("kendoGrid");
    </script>

#### Example - use items field inside the group header template

    <div id="grid"></div>
    <script>
    var filterAdmins = function(item) {
      return item.role === "admin";
    };
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age",
          groupHeaderTemplate: ({ items }) => `Admin count: ${items.filter(filterAdmins).length}`
        },
        {field: "role" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30, role: "admin" },
          { name: "John Doe", age: 30, role: "guest" },
          { name: "Peter", age: 30, role: "admin" }
        ],
        group: { field: "age", aggregates: [ { field: "age", aggregate: "count" }] }
      }
    });
    </script>

#### Example - set the group header template as a function

    <div id="grid"></div>
    <script>
      var grid = $("#grid").kendoGrid({
        groupable: true,
        columns: [
          { field: "name" },
          {
            field: "age",
            groupHeaderTemplate: groupHeaderTemp,
            aggregates: ["count"]
          },
          { field: "year", aggregates: ["max"] }
        ],
        dataSource: {
          data: [
            { name: "Jane Doe", age: 30, year: 1978 },
            { name: "John Doe", age: 30, year: 1980 }
          ],
          group: {
            field: "age", aggregates: [
              { field: "age", aggregate: "count" },
              { field: "age", aggregate: "max" },
              { field: "year", aggregate: "max" }
            ]
          }
        }
      }).data("kendoGrid");

      function groupHeaderTemp(data) {
        return `Age: ${data.value} total: ${data.count} Max Year: ${data.aggregates.year.max}`;
      }
    </script>

### columns.groupFooterTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the group footer for the corresponding column. By default the group footer is not displayed. The group footer will always appear as long as at least one column has a defined groupFooterTemplate.

The fields which can be used in the template are:

* average - the value of the "average" aggregate (if specified)
* count - the value of the "count" aggregate (if specified)
* max - the value of the "max" aggregate (if specified)
* min - the value of the "min" aggregate (if specified)
* sum - the value of the "sum" aggregate (if specified)
* data - provides access to all available aggregates, e.g. `data.fieldName1.sum` or `data.fieldName2.average`
* group - provides information for the current group. An object with three fields - `field`, `value` and `items`. `items` field contains the data items for current group. Returns groups if the data items are grouped (in case there are child groups)

> **Important**
>
> If the template is declared as a function the group field is accessible only through the data field,
> e.g. `data.fieldName1.group.value`.


<div class="meta-api-description">
Customize and configure group footer cells in grid columns with flexible templates that enable rendering aggregate values such as sum, average, count, min, max, and other computed metrics for grouped data. Control and set up dynamic footers showing summaries per group, access detailed group information like the grouped field, group value, and underlying items, and define how aggregated results appear using both static templates and functions. Enable display of computed totals and statistics in grouped grid views, tailor footer content to match specific group aggregates, gauge group-level data insights, and manipulate output formatting for grouped collections of rows in data grids. Support complex grouping scenarios with nested groups and function-based templates accessing aggregates through data objects for precise customization.
</div>

#### Example - set the group footer template

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age",
          groupFooterTemplate: ({ age }) => `Total: ${age.count}`
        }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 30 }
        ],
        group: { field: "age", aggregates: [ { field: "age", aggregate: "count" }] }
      }
    });
    </script>

#### Example - set the group footer template as function

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age",
          groupFooterTemplate: function(e) {
              return "Total: " + e.age.count;
          }
        }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 30 }
        ],
        group: { field: "age", aggregates: [ { field: "age", aggregate: "count" }] }
      }
    });
    </script>

### columns.headerAttributes `Object`

HTML attributes of the column header. The grid renders a table header cell (`<th>`) for every column. The `headerAttributes` option can be used to set the HTML attributes of that `th`.

> HTML attributes which are JavaScript keywords (e.g. *class*) must be quoted.


<div class="meta-api-description">
Customize and configure HTML attributes on grid column headers, enabling addition of CSS classes, inline styles, data attributes, and other HTML properties to the header cells of each column. Control and set custom attributes like class, style, data-*, and other HTML properties for table header elements in a grid layout, allowing enhanced styling, identification, event targeting, and dynamic behavior for column headers. Configure header cell properties to modify appearance, attach data hooks, or apply accessibility features to each column title or header element in tabular data grids.
</div>

#### Example - set the column header HTML attributes

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [{
        field: "name",
        headerAttributes: {
          "class": "table-header-cell !k-justify-content-right",
          style: "font-size: 14px"
        }
      }],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

### columns.headerTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the column header content. By default the value of the [title](columns.title) column option
is displayed in the column header cell.

> If sorting is enabled, the column header content will be wrapped in a `<span>` element.


<div class="meta-api-description">
Customize and control the rendering of column header cells by defining templates that replace or enhance default header text with HTML, icons, data-bound elements, or custom markup; this enables injecting dynamic, styled, or interactive content into grid headers, supports integration with sorting indicators or clickable areas, and allows setting specific header visuals or structures to fit design or functional requirements for various data display scenarios.
</div>

#### Example - column header template as a string

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        headerTemplate: '<input type="checkbox" id="check-all" /><label for="check-all">Check All</label>'
      }],
      selectable: "multiple",
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });

    $("#check-all").change(function(e){
      var grid = $("#grid").data("kendoGrid");
      var selected = grid.select();

      if(selected.length > 0) {
        grid.clearSelection();
      } else {
        grid.select("tr:eq(0), tr:eq(1)");
      }
    });
    </script>

#### Example - column header template as a Kendo UI template function with conditional logic

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        headerTemplate: kendo.template('# if (true) { # <input type="checkbox" id="check-all" /><label for="check-all">Check All</label> # } else { # this will never be displayed # } #')
      }],
      selectable: "multiple",
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });

    $("#check-all").change(function(e){
      var grid = $("#grid").data("kendoGrid");
      var selected = grid.select();

      if(selected.length > 0) {
        grid.clearSelection();
      } else {
        grid.select("tr:eq(0), tr:eq(1)");
      }
    });
    </script>

### columns.hidden `Boolean` *(default: false)*

If set to `true` the column will not be displayed in the grid. By default all columns are displayed.


<div class="meta-api-description">
Control and configure the visibility of individual table or grid columns by enabling or disabling the display of specific columns, hiding columns dynamically or statically, managing which columns are shown or concealed in data grids or tables, toggling column visibility for better user interface customization, specifying columns to be invisible on load or during runtime, adjusting which columns appear to users, and setting columns to be hidden for cleaner layouts or conditional display in grid-based displays and tabular data presentations.
</div>

#### Example - hide columns

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { hidden: true, field: "id" },
        { field: "name" }
      ],
      dataSource: [ { id: 1, name: "Jane Doe" }, { id: 2, name: "John Doe" } ]
    });
    </script>

### columns.hideOnGroup `Boolean` *(default: false)*

If set to `true` the column will be hidden when the grid is groupd via user iteraction. The column will be displayed again if iteraction to ungroup by it is performed.


<div class="meta-api-description">
Manage column visibility dynamically based on grouping actions within a data grid by configuring whether specific columns should be automatically hidden when users group rows by those columns, enabling developers to control the display of grouped fields, toggle visibility in response to user-driven grouping and ungrouping events, customize which columns appear or disappear during grouping, and set options to streamline the interface by hiding grouped columns to reduce redundancy and improve user experience during data aggregation or pivot operations.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", hideOnGroup: true },
        { field: "name" }
      ],
      groupable: true,
      dataSource: [ { id: 1, name: "Jane Doe" }, { id: 2, name: "John Doe" } ]
    });
    </script>

### columns.locked `Boolean` *(default: false)*

If set to `true` the column will be displayed as locked (frozen) in the grid. Also see [Locked Columns](/controls/grid/columns/locked-columns) help section for additional information.

> **Important**: Row template and detail features are not supported in combination with column locking. If [multi-column headers](https://demos.telerik.com/kendo-ui/grid/multicolumnheaders) are used, it is possible to lock (freeze) a column at the topmost level only.


<div class="meta-api-description">
Control which columns stay fixed or frozen in place while horizontally scrolling through a grid or table, enabling pinning or locking specific columns to remain always visible during side-to-side navigation; configure columns to remain static or locked so users can view key data without losing context when scrolling other columns, support for freezing columns in multi-column header layouts at the top level, and how to enable or disable column locking to improve readability and usability while navigating wide datasets without affecting row templates or detailed views.
</div>

#### Example - locked columns

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { locked: true, field: "id", width:200 },
        { field: "name", width:800 }
      ],
      dataSource: [ { id: 1, name: "Jane Doe" }, { id: 2, name: "John Doe" } ]
    });
    </script>

### columns.lockable `Boolean` *(default: true)*

If set to `false` the column will remain in the side of the grid into which its own locked configuration placed it.

> This option is meaningful when the grid has columns which are configured with a [locked](columns.locked) value. Setting it explicitly to `false` will
prevent the user from locking or unlocking this column using the user interface.


<div class="meta-api-description">
Configure the ability to enable or disable user interaction for moving columns between locked (fixed) and unlocked (scrollable) sections of a grid, controlling whether columns can be locked, unlocked, repositioned across locked panes, or restricted from switching sides within the grid layout. This setting governs whether users can drag or toggle columns between fixed and flexible views, lock columns in place to prevent rearrangement, or keep columns consistently on one side, ensuring column positioning is maintained or restricted according to application needs and user permissions.
</div>

#### Example - lockable columns

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { locked: true, field: "id", lockable: false, width:250 },
        { locked: true, field: "age", width:250 },
        { field: "name", width:250 },
        { field: "city", lockable: false, width:250 }
      ],
      dataSource: [
          { id: 1, name: "Jane Doe", age: 31, city: "Boston" },
          { id: 2, name: "John Doe", age: 55, city: "New York" }
      ]
    });
    </script>

### columns.media `String`

Sets the condition that needs to be satisfied for a column to remain visible. The property accepts valid strings for the [`matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) browser API (assuming it is supported by the browser) and toggles the visibility of the columns based on the media queries.

The [`hidden`](/api/javascript/ui/grid/configuration/columns.hidden) option takes precedence over `media`. This option cannot be used with [`minScreenWidth`](/api/javascript/ui/grid/configuration/columns.minscreenwidth) at the same time.

Also accepts the device identifiers that are [available in Bootstrap 4](https://v4-alpha.getbootstrap.com/layout/grid/#grid-options):

* `xs` is equivalent to `"(max-width: 576px)"`
* `sm` is equivalent to `"(min-width: 576px)"`
* `md` is equivalent to `"(min-width: 768px)"`
* `lg` is equivalent to `"(min-width: 992px)"`
* `xl` is equivalent to `"(min-width: 1200px)"`


<div class="meta-api-description">
Configure responsive grid column visibility by setting media queries or predefined breakpoints to control when columns appear or hide based on browser viewport size or device width. Enable dynamic toggling of column display using standard CSS media queries, matchMedia API patterns, or Bootstrap 4 device identifiers such as xs, sm, md, lg, and xl for familiar responsive breakpoints. Adjust column visibility for different screen sizes, handle show/hide behavior on window resize, and implement breakpoint-driven layouts by specifying min-width or max-width conditions, ensuring columns adapt to mobile, tablet, and desktop views automatically. This functionality supports flexible, adaptive UI design by controlling columns based on responsive or conditional media rules, making it easy to optimize grid layouts for varying device dimensions and screen resolutions.
</div>

#### Example - set media

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
          { field: "id", width: 250, media: "(min-width: 576px)" }, // column will become hidden if the media query is evaluated to false
          { field: "age", width: 250, media: "sm" }, // use a Bootstrap media (equivalent to `"(min-width: 576px)"`)
          { field: "city", width: 250, media: "(max-width: 576px) and (min-width: 300px)" }, // column will be visible when the width of the screen is less than 576px and more than 300px
          { field: "name", width: 250 } // column will always be visible
      ],
      dataSource: [
          { id: 1, name: "Jane Doe", age: 31, city: "Boston" },
          { id: 2, name: "John Doe", age: 55, city: "New York" }
      ]
    });
    </script>

### columns.minResizableWidth `Number`

The pixel screen width below which the user will not be able to resize the column via the UI.

> This option is meaningful when the grid is set as [resizable](/api/javascript/ui/grid/configuration/resizable).


<div class="meta-api-description">
Set a minimum pixel width to restrict how narrow users can resize grid columns by dragging the headers, ensuring columns don’t shrink below a designated width during viewport resizing or manual adjustments; control, enforce, or configure the smallest allowed column width to maintain readability and layout integrity when enabling resizable columns or responsive grid behaviors.
</div>

#### Example - set the column width as a number

     <div id="grid"></div>
     <script>
     $("#grid").kendoGrid({
       resizable: true,
       columns: [
         { field: "name", minResizableWidth: 80 },
         { field: "age" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ]
     });
     </script>

### columns.minScreenWidth `Number`

The pixel screen width below which the column will be hidden. The setting takes precedence over the [`hidden`](/api/javascript/ui/grid/configuration/columns.hidden) setting,
so the two should not be used at the same time.


<div class="meta-api-description">
Control the visibility of grid columns by specifying the minimum screen width in pixels at which a column should appear, enabling responsive layouts that automatically hide columns on smaller or narrow viewports like mobile devices. Adjust or configure pixel-based breakpoints to manage column display depending on screen size, allowing dynamic show or hide behavior for columns below certain widths while overriding static hidden flags. Use this to set thresholds for when columns become invisible on compact screens, ensuring flexible responsive design and improved usability across various device sizes.
</div>

#### Example - lockable columns

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 250, minScreenWidth: 500 }, //column will become hidden if screen size is less than 500px
        { field: "name", width: 250 }, //column will always be visible
        { field: "age", width: 250, minScreenWidth: 750 } //column will become hidden if screen size is less than 750px
      ],
      dataSource: [
          { id: 1, name: "Jane Doe", age: 31, city: "Boston" },
          { id: 2, name: "John Doe", age: 55, city: "New York" }
      ]
    });
    </script>

### columns.resizable `Boolean` *(default: true)*

If set to `false` the column will become non-resizable, while all the other columns remaining resizable in the the grid component.
In order for this property to work, grid's `resizable` property must be set to `true`


<div class="meta-api-description">
Control whether specific table or grid columns can be resized by enabling or disabling individual column width adjustments, locking certain columns to fixed widths while allowing others to be dynamically resized by dragging or through configuration; set up resizable grids with customizable column flexibility, managing column size constraints, fixed or adjustable columns, user-driven resizing interactions, and column width locking within data tables, grids, or spreadsheet-like interfaces.
</div>

#### Example - non-resizable column

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      resizable: true,
      columns: [
        { field: "id", width: 250, resizable: false }, //column will not be resizable anymore
        { field: "name", width: 250 },
        { field: "age", width: 250 }
      ],
      dataSource: [
          { id: 1, name: "Jane Doe", age: 31, city: "Boston" },
          { id: 2, name: "John Doe", age: 55, city: "New York" }
      ]
    });
    </script>


### columns.selectable `Boolean` *(default: false)*

If set to `true` the grid will render a select column with checkboxes in each cell, thus enabling multi-row selection. The header checkbox allows users to select/deselect all the rows on the current page. The [`change`](/api/javascript/ui/grid/events/change) event is fired when a row is selected.

> Setting the [`columns.selectable`](/api/javascript/ui/grid/configuration/columns.selectable) to `true` overrides the [`selectable.mode`](/api/javascript/ui/grid/configuration/selectable.mode) configuration property if it is set to `"single"`.

More about the Grid Selection feature you can find in [this documentation article](/controls/grid/selection).


<div class="meta-api-description">
Enable or configure multi-row selection with checkbox columns in a grid or data table, allowing users to select or deselect multiple rows simultaneously via checkboxes in each row and a master checkbox in the header for selecting all rows on the current page. Control multi-selection behavior, override single-selection modes, and handle selection change events triggered when individual rows or all rows are toggled. Use cases include batch operations, bulk editing, and user-driven selection management where multi-row checkbox functionality and select-all capabilities are needed for efficient data handling and interactive grid interfaces.
</div>

#### Example - enable multi-row selection by adding a select column with checkboxes

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { selectable: true },
        { field: "name" }
      ],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

### columns.sortable `Boolean|Object` *(default: true)*

If set to `true` the user can click the column header and sort the grid by the column [field](columns.field) when sorting is enabled. If set to `false` sorting will
be disabled for this column. By default all columns are sortable if sorting is enabled via the [sortable](/api/javascript/ui/grid/configuration/sortable) option.


<div class="meta-api-description">
Control individual column sorting behavior in data grids by enabling or disabling clickable column headers that sort the table based on specific fields, allowing users to organize grid data ascending or descending, set sorting preferences per column for customized user interaction, toggle sort functionality on or off for selected columns, and manage how the grid responds to user-initiated sort actions with fine-grained sorting configurations.
</div>

#### Example - disable sorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { sortable: false, field: "id" },
        { field: "name" }
      ],
      sortable: true,
      dataSource: [ { id: 1, name: "Jane Doe" }, { id: 2, name: "John Doe" } ]
    });
    </script>

### columns.sortable.allowUnsort `Boolean` *(default: true)*

If set to `true` the user can get the grid in unsorted state by clicking the sorted column header. If set to `false` the user will not be able to unsort the column once sorted.


<div class="meta-api-description">
Enable or disable the ability to toggle column sorting off by clicking the column header, controlling whether users can remove sorting from a column after it’s been applied, set up to allow clearing, toggling, disabling, or locking sorted states in grid columns for flexible sorting behavior and user interaction with sortable tables or data grids.
</div>

#### Example - disable unsorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { sortable: { allowUnsort: false }, field: "id" },
        { field: "name" }
      ],
      sortable: true,
      dataSource: [ { id: 1, name: "Jane Doe" }, { id: 2, name: "John Doe" } ]
    });
    </script>

### columns.sortable.compare `Function`

A JavaScript function which is used to compare the values. It has the same signature as the [compare function accepted by Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).

> The compare function works only when [`serverSorting`](/api/javascript/data/datasource/configuration/serversorting) is set to **false**.

The basic function implementation is as follows (pseudo-code):
```pseudo
    function compare(a, b, descending) {
      if (a is less than b by some ordering criterion) {
        return -1;
      }

      if (a is greater than b by the ordering criterion) {
        return 1;
      }

      // a must be equal to b
      return 0;
    }
```

One notable exception is that we also supply a third parameter that indicates the sort direction (true for descending).
See [How-to: Stable Sort in Chrome](https://www.telerik.com/kendo-jquery-ui/documentation/knowledge-base/stable-sort-chrome) for more details on how this can be useful.


<div class="meta-api-description">
Configure custom sorting logic for grid columns by defining comparator functions that control order based on numbers, strings, dates, or complex objects, enabling locale-aware, case-sensitive, or custom criteria sorting. This includes setting up compare functions similar to those used in Array.sort with parameters for two values and sort direction, supporting ascending or descending order control while disabling server-side sorting. Use cases involve implementing specialized sorting behavior for different data types, fine-tuning order stability, or handling complex comparison needs within client-side grid sorting operations.
</div>

#### Example - define custom compare function

    <div id="grid"></div>
    <script>
        var numbers = {
            "one"  : 1,
            "two"  : 2,
            "three": 3
        };

        var dataSource = new kendo.data.DataSource({
            data: [
                { id: 1, item: "two" },
                { id: 2, item: "one" },
                { id: 3, item: "three" }
            ]
        });

        $("#grid").kendoGrid({
            dataSource: dataSource,
            sortable: true,
            columns: [{
                field: "item",
                sortable: {
                    compare: function(a, b) {
                        return numbers[a.item] - numbers[b.item];
                    }
                }
            }]
        });

    </script>

### columns.sortable.initialDirection `String` *(default: asc)*

Determines the inital (from un-sorted to sorted state) sort direction. The supported values are `asc` and `desc`.


<div class="meta-api-description">
Set or customize the starting order of column sorting in a data grid, determining whether the first sort applied is ascending or descending when a column shifts from no sorting to sorted state, enabling control over default sort direction, initial sorting preference, or default order direction for grid columns, useful for configuring table sorting behavior, adjusting how data is initially organized, or specifying if the first sort should rank values from smallest to largest or largest to smallest automatically.
</div>

#### Example - disable sorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        {
          field: "id",
          sortable: {
            initialDirection: "desc"
          }
        },
        { field: "name" }
      ],
      sortable: true,
      dataSource: [ { id: 1, name: "Jane Doe" }, { id: 2, name: "John Doe" } ]
    });
    </script>

### columns.sticky `Boolean` *(default: false)*

If set to `true` the column will be displayed as sticky in the grid. Also see [Sticky Columns](/controls/grid/columns/sticky-columns) help section for additional information.

> **Important**: Row template and detail features are not supported in combination with sticky columns. If [multi-column headers](https://demos.telerik.com/kendo-ui/grid/multicolumnheaders) are used, it is possible to stick a column at the topmost level only.


<div class="meta-api-description">
Enable pinning or locking of specific columns to keep them fixed and constantly visible during horizontal scrolling within a grid or table layout, allowing users to freeze columns for persistent context when navigating wide datasets. This feature supports setting certain key columns to remain in place, preventing them from scrolling out of view, which is helpful for comparing data across rows while scrolling sideways. It is commonly referred to as sticky, fixed, pinned, or locked columns, and is useful when you want to highlight or anchor important columns while allowing other columns to scroll freely. Note that using frozen or sticky columns may have limitations with advanced row templates, detail views, or multi-level column headers where only top-level columns can be pinned. This capability is essential for interfaces needing controlled column visibility and persistent reference points during horizontal navigation.
</div>

#### Example - sticky columns

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800 },
        { field: "name", width: 400, sticky: true },
        { field: "age", width: 800 }
      ],
      dataSource: [ { id: 1, name: "Jane Doe", age: 30 }, { id: 2, name: "John Doe", age: 33 } ]
    });
    </script>

### columns.stickable `Boolean` *(default: false)*

If set to `true` the user will be able to stick or unstick the column from the column menu.


<div class="meta-api-description">
Control the ability to pin or unpin individual columns in a grid or table interface by enabling or disabling stickable functionality, allowing users to fix columns in place for better data visibility and interaction through column menu options; configure whether columns can be made sticky to remain visible during scrolling or unstickable to freely move or hide, with settings applied during grid setup to manage fixed or floating column behavior and user-driven column locking, pinning, or toggling features for enhanced data management and custom view control.
</div>

#### Example - stickable columns

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800 },
        { field: "name", width: 400, sticky: true, stickable: true },
        { field: "age", width: 800 }
      ],
      columnMenu: true,
      dataSource: [ { id: 1, name: "Jane Doe", age: 30 }, { id: 2, name: "John Doe", age: 33 } ]
    });
    </script>

### columns.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the column content. The grid renders table rows (`<tr>`) which represent the data source items.
Each table row consists of table cells (`<td>`) which represent the grid columns. By default the HTML-encoded value of the [field](columns.field) is displayed in the column.

> Use the `template` to customize the way the column displays its value.

For additional and more complex examples that utilize column templates, visit the [`Knowledge Base`](https://docs.telerik.com/kendo-ui/knowledge-base) documentation, and use the following search terms:

- column template
- grid column template
- Column Template | Kendo UI Grid


<div class="meta-api-description">
Customize how each cell in a grid column displays its content by defining a rendering template that controls the output, allowing formatting of values, insertion of custom HTML, binding to nested or complex data structures, embedding interactive elements like buttons or controls, overriding default text or HTML encoding, modifying layout per cell, and tailoring cell appearance dynamically based on data or context to enable detailed, flexible, and personalized column content presentation in grid rows and columns.
</div>

#### Example - set the template as a string literal

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        template: ({ name }) => `<strong>${kendo.htmlEncode(name)}</strong>` //name is the field name
      }],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

#### Example - set the template as a function which returns a string

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ {
        field: "name",
        template: function(dataItem) {
          return "<strong>" + kendo.htmlEncode(dataItem.name) + "</strong>";
        }
      }],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

### columns.title `String`

The text that is displayed in the column header cell. If not set the [field](columns.field) is used.

> **Note:** Column titles should not contain HTML entities or tags. If such exist, they should be encoded.


<div class="meta-api-description">
Configure or customize the header text displayed in each grid column by setting a custom label or falling back to the underlying data field name if no title is specified. Control, define, or override the column header caption, title, or label shown at the top of grid columns in tables, lists, or data views. Adjust column heading text for clarity, formatting, or user interface presentation without including raw HTML tags, ensuring proper encoding of special characters. Enable developers to specify readable, meaningful headers, set column titles dynamically or statically, and improve usability by controlling what text appears above columns in grid or tabular data components.
</div>

#### Example - set the title of the column

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [ { field: "name", title: "Name" } ],
      dataSource: [ { name: "Jane Doe" }, { name: "John Doe" } ]
    });
    </script>

### columns.width `String|Number`

The width of the column. Numeric values are treated as pixels. The width option supports the fundamental measuring units. For instance:

* `px` sets the width in pixels
* `cm` sets the width in centimeters
* `mm` sets the width in millimeters
* `%` sets the width relative to the grid's element width
* `em` sets the width relative to the font-size of the grid's element width
* `rem` sets the width relative to font-size of the root element

**For more important information, please refer to [Column Widths](/controls/grid/columns/widths)**.

Grid options, including column widths, can be set programmatically after Grid initialization with the [`setOptions`](/api/javascript/ui/grid/methods/setoptions) method.


<div class="meta-api-description">
Configure and control the width of grid columns using numeric values or various CSS units such as pixels, percentages, centimeters, millimeters, em, and rem, enabling flexible sizing relative to the grid container or font size; adjust column dimensions dynamically, customize layout precision, manage responsive design by setting fixed or relative widths, and update column sizing after initialization to optimize grid appearance and usability.
</div>

#### Example - set the column width as a string

     <div id="grid"></div>
     <script>
     $("#grid").kendoGrid({
       columns: [
         { field: "name", width: "200px" },
         { field: "age" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ]
     });
     </script>

#### Example - set the column width as a number

     <div id="grid"></div>
     <script>
     $("#grid").kendoGrid({
       columns: [
         { field: "name", width: 200 },
         { field: "age" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ]
     });
     </script>

### columns.values `Array`

An array of values that will be displayed instead of the bound value. Each item in the array must have a `text` and `value` fields.

> Use the `values` option to display user-friendly text instead of database values.


<div class="meta-api-description">
Map data cell values to custom display labels by configuring arrays of items with text and value pairs to replace raw database or bound values in a grid or table. Control how underlying data keys or codes are translated into readable, user-friendly names or descriptions within grid columns, enabling label mapping, value substitution, or lookup-based rendering. Enable display mappings for enums, statuses, or identifiers by defining lists of text-to-value associations that convert internal data into understandable text in table cells. Set value-label pairs to customize cell output, support localization or aliases for data, and ensure that grid cells present meaningful information rather than raw numeric or coded values. Adjust and configure cell content display by assigning arrays that link stored data values with descriptive strings for clear visualization and improved user comprehension.
</div>

#### Example - specify column values

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
          { text: "Beverages", value: 1 },
          { text: "Food", value: 2 }
        ] }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ]
    });
    </script>

This example displays "Beverages" and "Food" in the "category" column instead of "1" and "2".

#### Example - specify column values using the MVVM design pattern

    <div id="example">
      <div data-role="grid"
           data-columns="[
                         { 'field': 'productName' },

                         { 'field': 'category', 'values': [

                         { 'text': 'Beverages', 'value': 1 },

                         { 'text': 'Food', 'value': 2 }

                         ]}

                         ]"
           data-bind="source: products" ></div>

      <script>
        var viewModel = kendo.observable({
          products: [
            { productName: "Tea", category: 1 },
            { productName: "Ham", category: 2 }
          ]
        });
        kendo.bind($("#example"), viewModel);
      </script>
    </div>

> Check [ForeignKey column](https://demos.telerik.com/kendo-ui/grid/foreignkeycolumn) for a live demo.

### columns.menu `Boolean`

If set to `true` the column will be visible in the grid column menu. By default the column menu includes all data-bound columns (ones that have their [field](columns.field) set).


<div class="meta-api-description">
Enable or disable the visibility of specific columns in the grid's column selection menu, controlling which columns users can include or exclude through the column menu interface; configure whether a column is listed for toggling display in the grid header menu by setting its inclusion state, managing menu appearance for bound or unbound columns, and customizing which fields appear in the column menu for user interactions, effectively controlling the dynamic selection and display options within the grid’s column menu feature.
</div>

#### Example - hide a column from the column menu

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", menu: false },
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: true,
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu `Boolean|Object` *(default: false)*

If set to `true` the grid will display the column menu when the user clicks the chevron icon in the column headers. The column menu allows the user to show and hide columns, filter and sort (if filtering and sorting are enabled).
By default the column menu is not enabled.

Can be set to a JavaScript object which represents the column menu configuration.


<div class="meta-api-description">
Control the display of an interactive menu in the grid's column headers that lets users toggle column visibility, apply sorting orders, and set filtering criteria directly from the header chevron; configure this menu with simple true/false toggles or detailed object settings to customize how sorting and filtering controls are presented based on grid capabilities, enabling or disabling quick access to column management features through a header dropdown interface.
</div>

#### Example - enable the column menu

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

> Check [Column menu](https://demos.telerik.com/kendo-ui/grid/column-menu) for a live demo.

### columnMenu.adaptiveMode `String` *(default: 'none')*

If set to `auto` and the filterMenu will use adaptive rendering.

> The Adaptive Rendering of the Column Menu is available only for `modern`[componentType](/api/javascript/ui/grid/configuration/columnmenu.componenttype)


<div class="meta-api-description">
Configure the column menu's filter interface to automatically adjust its layout and behavior based on screen size or device type, enabling responsive and dynamic filtering options that adapt fluidly to different contexts. Control whether filter menus render adaptively to optimize usability on mobile, tablet, or desktop views, providing seamless, device-aware interactions with column filters. Enable or set adaptive rendering modes that enhance the user experience by transforming filter menus for modern UI components, ensuring smooth transitions and accessibility across varying display environments. Tailor filter UI responsiveness by activating adaptive modes that intelligently reformat menus, improving navigation and functionality in grid column controls under diverse usage scenarios.
</div>

#### Example - enable adaptive rendering


    <div id="grid"></div>
    <script type="module">
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ],
       filterable: true,
       columnMenu: {
        componentType: "modern",
        adaptiveMode: "auto",
       },
       adaptiveMode: "none",
       height: 550
    });
    </script>


### columnMenu.autoSize `Boolean` *(default: false)*

If set to `true` the column menu would allow the user to fit one or all columns to the width of their content. This setting is available only when the `tabbed` [componentType](/api/javascript/ui/grid/configuration/columnmenu.componenttype) is used.


<div class="meta-api-description">
Configure automatic column width adjustment in the grid’s column menu to let users dynamically resize individual columns or all columns at once based on their content size. Enable or control auto-resizing behavior for columns in tables or data grids by activating options that optimize column widths automatically, fitting text, data, or cell content without manual dragging. This feature supports grid setups where the column menu uses a tabbed interface, allowing you to set, toggle, or enable auto-sizing of columns for improved readability and layout efficiency during grid initialization or runtime. Ideal for scenarios requiring adaptive column sizing, responsive data display, or convenient user control over column width adjustments in data-heavy tables.
</div>

#### Example - disable column selection

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        autoSize: true,
        componentType: "tabbed"
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.columns `Boolean|Object` *(default: true)*

If set to `true` the column menu would allow the user to select (show and hide) grid columns. By default the column menu allows column selection.


<div class="meta-api-description">
Control and configure the ability to show or hide individual columns within a grid or table interface through a column selection menu, enabling users to toggle column visibility dynamically, often using checkboxes or similar controls, to customize which columns are displayed or hidden. This feature supports enabling or disabling user interaction for column visibility management, allowing developers to determine whether end-users can adjust the columns they see, manage column visibility preferences, and optimize the grid layout by showing only relevant columns. It is commonly used to configure column visibility controls, customize the column menu behavior, enable column toggling options within grid menus, and improve user experience by making column selection interactive or static according to app requirements.
</div>

#### Example - disable column selection

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        columns: false
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.columns.sort `String` *(default: null)*

The sort order which will be applied over the columns list. By default, the columns menu items are in the same order as the columns in the grid.

The supported values are:

* `"asc"` (ascending order)
* `"desc"` (descending order)


<div class="meta-api-description">
Control and customize the ordering of items in a grid's column menu by setting sorting preferences, enabling ascending or descending arrangement of columns within the menu. Adjust the sequence of column menu entries for clearer navigation, organize columns alphabetically or reverse order, configure how columns appear in the dropdown list, and manage sorting behavior independently from the grid's default column order to optimize user interface and data presentation. Set, modify, or toggle the sorting direction of column menu listings to enhance usability, filtering, and accessibility.
</div>

#### Example - sort column menu columns list in descending order

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { field: "city" }
      ],
      columnMenu: {
        columns: {
          sort: "desc"
        }
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30, city: "London" },
        { name: "John Doe", age: 33, city: "Madrid" }
      ]
    });
    </script>

### columnMenu.columns.groups `Array` *(default: null)*

The user defined groups of the columns visibility list.


<div class="meta-api-description">
Control and customize the organization of column visibility menus by grouping columns into named categories, enabling users to manage and display column show/hide options in structured groups, simplify column selection interfaces, configure grouped column lists, and enhance column menu usability during grid setup or customization.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name", title: 'Name' },
        { field: "age", title: 'Age' }
      ],
      columnMenu: {
        columns: {
          groups: [
            { title: 'first group', columns: ['Age'] },
            { title: 'second group', columns: ['Name'] }
          ]
        }
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.columns.groups.columns `Array` *(default: null)*

The titles of the columns that are part of the group. In case some column does not have a specified title, you can use the field instead. Columns that don't have specified either a title or a field, are not displayed in the column menu.


<div class="meta-api-description">
Control and customize which grouped column titles or field names appear in a grid's column menu, enabling configuration of visible group headers and managing the display of columns in hierarchical or grouped data views. This includes setting, filtering, or excluding specific column titles for group menus, falling back to column field identifiers when titles are missing, and ensuring that columns without titles or fields are omitted from the group’s column selection list. Optimize presentation of grouped columns in user interfaces by specifying which attributes or labels to show in group menus, controlling visibility and accessibility of grouped data headers during interactive grid operations.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name", title: 'Name' },
        { field: "age" }
      ],
      columnMenu: {
        columns: {
          groups: [
            { title: 'first group', columns: ['age'] }, // field is used instead of title, as the age column does not have a specified title
            { title: 'second group', columns: ['Name'] }
          ]
        }
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.columns.groups.title `String` *(default: null)*

The text displayed in the header of the group.


<div class="meta-api-description">
Customize or configure the text label, heading, or title shown at the top of group sections within the grid column menu to control how grouped columns are named, displayed, or described in user interfaces, including setting or changing group header captions, customizing group titles, and managing the naming conventions for column grouping headers in grid menus.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName", title: "Product" },
        { field: "unitPrice", title: "Price" },
        { field: "category", title: "Category" }
      ],
      dataSource: [
        { productName: "Tea", unitPrice: 2.5, category: "Beverages" },
        { productName: "Coffee", unitPrice: 3.0, category: "Beverages" }
      ],
      columnMenu: {
        columns: {
          groups: [
            {
              title: "Product Information",
              columns: ["productName", "category"]
            },
            {
              title: "Pricing",
              columns: ["unitPrice"]
            }
          ]
        }
      }
    });
    </script>

### columnMenu.filterable `Boolean` *(default: true)*

If set to `true` the column menu would allow the user to filter the grid. By default the column menu allows the user to filter if filtering is enabled via the [filterable](/api/javascript/ui/grid/configuration/filterable).


<div class="meta-api-description">
Enable or disable filtering options directly within each column’s menu of a data grid, allowing users to set, customize, or configure column-specific filter controls and search criteria through the column header interface. Control the presence of filter input fields, filter operators, and filter logic accessible from the column dropdown, independently toggling filter UI elements for individual columns or globally when general filtering settings are turned on. Support interactive per-column filtering, column menu-based search customization, and dynamic filter activation in grids, enhancing user ability to refine, narrow down, search, or sort data by applying filters embedded in column menus.
</div>

#### Example - disable column menu filtering

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        filterable: false
      },
      filterable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.componentType `String`*(default: "classic")*

 Specifies the component type of the column menu.

* `"classic"` - Uses the standard rendering of the column menu.
* `"modern"` - Uses new rendering with a fresh and modern look and feel.
* `"tabbed"` - Uses the rendering of the `"modern"` menu, but splits its content into different tabs.


<div class="meta-api-description">
Configure and customize the appearance and layout of the grid's column menu by selecting among classic, modern, or tabbed rendering styles to control how column menu options are displayed and organized; choose a traditional straightforward menu, a sleek updated interface, or a tabbed design that segments menu content for improved navigation and usability, enabling you to set or enable different visual modes, switch between legacy and contemporary layouts, and tailor menu presentation to enhance user experience and fit various UI preferences or application themes.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName", title: "Product" },
        { field: "unitPrice", title: "Price" },
        { field: "category", title: "Category" }
      ],
      dataSource: [
        { productName: "Tea", unitPrice: 2.5, category: "Beverages" },
        { productName: "Coffee", unitPrice: 3.0, category: "Beverages" }
      ],
      columnMenu: {
        componentType: "modern"
      }
    });
    </script>

### columnMenu.clearAllFilters `Boolean` *(default: false)*

If set to `true`, the global column menu will render a button to allow the user to clear all filters applied to the grid.


<div class="meta-api-description">
Enable a single action to reset or remove all active column filters instantly from the grid interface, providing users with a quick way to clear every applied filter across all columns at once, allowing convenient toggling, disabling, or resetting of filter criteria in complex data tables, facilitating effortless filter management, global filter clearing, and streamlined user control over data views without needing to clear filters individually.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      toolbar: ["columns"],
      columnMenu: {
          componentType: "modern",
          clearAllFilters: true
      },
      filterable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.sortable `Boolean` *(default: true)*

If set to `true` the column menu would allow the user to sort the grid by the column field. By default the column menu allows the user to sort if sorting is enabled via the [sortable](/api/javascript/ui/grid/configuration/sortable) option.

> If this option is set to `false` the user could still sort by clicking the column header cell.


<div class="meta-api-description">
Control whether users can enable, activate, or configure sorting directly from a column’s context menu within the data grid, allowing sorting by that column’s field through the menu interface. This option governs if users can sort grid data using column menu commands rather than just header clicks, supporting scenarios where sorting might be enabled or disabled independently from the grid’s overall sortable setting, including use cases for toggling sorting in menus, customizing user interactions, or restricting sorting access via context menus while still allowing header-based sorting.
</div>

#### Example - disable column menu sorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        sortable: false
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages `Object`

The text messages displayed in the column menu. Use it to customize or localize the column menu messages.


<div class="meta-api-description">
Configure and customize the text, labels, and messages displayed in grid column menus to support localization, translation, or personalized wording; control and override default column menu prompts, captions, hints, and interface text to match different languages, user preferences, or branding requirements within grid headers and column sorting or filtering interfaces.
</div>

#### Example - customize column menu messages

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        messages: {
          columns: "Choose columns",
          filter: "Apply filter",
          sortAscending: "Sort (asc)",
          sortDescending: "Sort (desc)"
        }
      },
      sortable: true,
      filterable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.apply `String` *(default: "Apply")*

The text of the button which applies the columns filter.

> The button is visible when the column menu [componentType](/api/javascript/ui/grid/configuration/columnmenu.componenttype) is set to `modern` or `tabbed`.


<div class="meta-api-description">
Customize or configure the label text for the apply button in the grid's column menu, controlling the wording displayed when using modern or tabbed style column menus, enabling changes to button captions, apply action prompts, confirmation labels, or interaction texts for filtering, sorting, or other column menu operations within grid interfaces.
</div>

#### Example - column menu apply button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width:200 },
        { field: "name", width:400 },
        { field: "age", width:400 }
      ],
      columnMenu: {
        componentType: "modern",
        messages: {
          apply: "Apply Columns"
        }
      },
      sortable: true,
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.autoSizeColumn `String` *(default: "Autosize This Column")*

The text of the autosize single column option.

> The autosize option is visible when the column menu [componentType](/api/javascript/ui/grid/configuration/columnmenu.componenttype) is set to `tabbed`.


<div class="meta-api-description">
Control and customize the text label shown in the grid column menu option responsible for automatically resizing a single column to fit its content, especially when using a tabbed component interface; set, configure, or change the autosize column menu wording to match UI language preferences, support localization, modify the autosizing menu item description, or tailor the column sizing feature label within data grids for precise column width adjustment during user interaction with tabbed grid layouts.
</div>

#### Example - column menu apply button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width:200 },
        { field: "name", width:400 },
        { field: "age", width:400 }
      ],
      columnMenu: {
        componentType: "tabbed",
        autoSize: true,
        messages: {
          autoSizeColumn: "Custom Autosize this column"
        }
      },
      sortable: true,
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.autoSizeAllColumns `String` *(default: "Autosize All Columns")*

The text of the autosize single column option.

> The autosize option is visible when the column menu [componentType](/api/javascript/ui/grid/configuration/columnmenu.componenttype) is set to `tabbed`.


<div class="meta-api-description">
Customize the display text or label for the option that automatically resizes all columns in a grid or table, specifically controlling the wording shown in column menu settings related to adjusting column widths simultaneously; applicable when dealing with tabbed interfaces or multi-column auto-sizing features, enabling users to configure, rename, or localize the prompt for bulk column width adjustment in grid or table properties.
</div>

#### Example - column menu apply button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width:200 },
        { field: "name", width:400 },
        { field: "age", width:400 }
      ],
      columnMenu: {
        componentType: "tabbed",
        autoSize: true,
        messages: {
          autoSizeAllColumns: "Custom Autosize all columns"
        }
      },
      sortable: true,
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.buttonTitle `String` *(default: "{0} edit column settings")*

The title of the button that displays the ColumnMenu.

> The {0} argument represents the field name


<div class="meta-api-description">
Customize the label, tooltip, or accessibility title of the column menu button in data grids, enabling localized or dynamic text that can include the column or field name, configure or change the displayed button title for column menus, set descriptive or contextual names for column menu controls, support internationalization by providing translated button titles, control how the column menu button is announced or read by screen readers, modify the button text to reflect specific fields or customize UI labels for column interactions, adjust or override default column menu button titles for enhanced user experience and clarity across different languages or contexts.
</div>

#### Example - set the ColumnMenu "buttonTitle" message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name", width:400 },
        { field: "age", width:400 }
      ],
      columnMenu: {
        messages: {
          buttonTitle: "{0} Column Menu"
        }
      },
      sortable: true,
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.clear `String` *(default: "Clear")*

The text of the `Clear` button in the column menu in mobile Grid.


<div class="meta-api-description">
Customize the label or text for clearing filters or selections in the column menu on mobile devices, control the wording of the clear or reset button within grid column menus, set or modify the text displayed for clearing actions in mobile grid interfaces, change the prompt or caption for the clear option that resets filters or sorting in a column menu on handheld devices, enable localization or personalization of the clear command text in grid columns for responsive or mobile views, adjust the displayed phrasing for clearing selections or criteria in mobile column menus to fit different languages or user preferences.
</div>

#### Example - set the clear button in the mobile column menu

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        mobile: true,
        columns: [
          { field: "id", width:200 },
          { field: "name", width:400 },
          { field: "age", width:400 }
        ],
        toolbar: [
          { name: "columns" }
        ],
        columnMenu: {
          messages: {           
            clear: "Custom Clear Text"
          }
        },        
        dataSource: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ]
      });
    </script>


### columnMenu.messages.clearAllFilters `String` *(default: "Clear All Filters")*

The text of the `clearAllFilters` button in the global column menu.


<div class="meta-api-description">
Control and customize the text or label displayed on the button that clears all active filters in a grid’s column menu, allowing you to set, modify, translate, or localize the wording that resets or removes every applied filter across columns, filter clearing prompts, or bulk filter reset actions within tabular data interfaces.
</div>

#### Example - set the clear all filter button message

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "id", width:200 },
          { field: "name", width:400 },
          { field: "age", width:400 }
        ],
        toolbar: [
          { name: "columns" }
        ],
        columnMenu: {          
          clearAllFilters: true,
          messages: {           
            clearAllFilters: "Custom Clear All Filters Message"
          }
        },
        filterable: true,
        dataSource: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ]
      });
    </script>

### columnMenu.messages.column `String` *(default: "Column")*

The text of the column label in the column menu in mobile Grid.


<div class="meta-api-description">
Set or customize the text label of columns displayed in the mobile grid's column menu for localization, translation, or adapting user interface language; control and configure how column headers appear within mobile-friendly grid menus by specifying or overriding default column names, enabling developers to tailor column menu labels to different languages, dialects, or terminology preferences in responsive grid layouts on mobile devices.
</div>

#### Example - set the column label in the mobile column menu

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        mobile: true,
        columns: [
          { field: "id", width:200 },
          { field: "name", width:400 },
          { field: "age", width:400 }
        ],
        toolbar: [
          { name: "columns" }
        ],
        columnMenu: {
          messages: {           
            column: "Custom Column label"
          }
        },        
        dataSource: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ]
      });
    </script>
	

### columnMenu.messages.columns `String` *(default: "Columns")*

The text message displayed for the column selection menu item.


<div class="meta-api-description">
Customize or configure the label, text, or message displayed for selecting columns in grid menus, control the naming or wording shown in column selection dropdowns or context menus, adjust or set the prompts related to choosing or toggling visible columns in data grids, enable changing or localizing the column selector menu item text, and manage the display wording for columns in grid UI components to fit internationalization, user interface customization, or accessibility requirements.
</div>

#### Example - set the column selection message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        messages: {
          columns: "Choose columns"
        }
      },
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.columnVisibility `String` *(default: "Column Visibility")*

The text of the column visibility menu item in the global column menu.


<div class="meta-api-description">
Customize or configure the text label, caption, or message displayed for toggling column visibility in the grid’s global column menu, including setting translated, localized, or custom language strings to control how the option for showing, hiding, or managing visible columns appears in UI menus. Adjust or set the descriptive wording related to column visibility toggles, column show/hide controls, or column display menus for internationalization, user interface customization, or accessibility purposes within a data grid or table component.
</div>

#### Example - set the column visibility message

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "id", width:200 },
          { field: "name", width:400 },
          { field: "age", width:400 }
        ],
        toolbar: [
          { name: "columns" }
        ],
        columnMenu: {
          messages: {
            columnVisibility: "Custom Column Visbility Message"
          }
        },
        filterable: true,
        dataSource: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ]
      });
    </script>

### columnMenu.messages.filter `String` *(default: "Filter")*

The text message displayed for the filter menu item.


<div class="meta-api-description">
Customize or change the label, text, or wording displayed for the filtering option in a grid or table column menu, enabling control over how the filter action or filter prompt appears in user interfaces, adjusting filter menu item captions, names, or messages to match localization, language preferences, or specific terminology for filtering columns in data grids or tables.
</div>

#### Example - set the filter message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        messages: {
          filter: "Apply filter",
        }
      },
      filterable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.lock `String` *(default: "Lock Column")*

The text message displayed in the column menu for locking a column.


<div class="meta-api-description">
Set or customize the localized label, text, or message displayed for locking or freezing a column in the grid’s column menu, enabling control over the wording or translation shown when users activate the lock column feature to fix or freeze grid columns in place. This covers configuring the lock column menu text for various languages, adjusting the terminology for column locking options, or changing the interface string that appears when toggling column lock in data grid menus.
</div>

#### Example - column menu lock button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { locked: true, field: "id", width:200 },
        { field: "name", width:400 },
        { field: "age", width:400 }
      ],
      columnMenu: {
        messages: {
          lock: "Pin this column"
        }
      },
      sortable: true,
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.moveNext `String` *(default: "Move next")*

The text message that is displayed for the Move to next position column menu item.


<div class="meta-api-description">
Customize or localize the text label for advancing a grid column to the next position in the column menu, enabling control over the wording displayed for the action that moves a column forward in order, configure the string shown when rearranging columns by shifting one column to the next slot, adjust or translate the message for "move next" in the user interface menu handling column positioning, set or change the displayed prompt that lets users move grid columns sequentially rightward or down the list, tailor the terminology for navigating or repositioning columns to the next index within grid settings.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" },
        { field: "unitPrice" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages", unitPrice: 2.5 },
        { productName: "Coffee", category: "Beverages", unitPrice: 3.0 }
      ],
      columnMenu: {
        messages: {
          moveNext: "Move Right"
        }
      }
    });
    </script>

### columnMenu.messages.movePrev `String` *(default: "Move previous")*

The text message that is displayed for the Move to previous position column menu item.


<div class="meta-api-description">
Customize or configure the label, text, or caption displayed for the option that moves or shifts a column to the previous position in the grid column menu. Control, set, or change the wording for the action that repositions a column left or earlier in order, including renaming or translating the command that moves the column backward or prior within the grid headers or column arrangement options. Adjust the string shown for the menu item responsible for leftward or previous column movement in a grid setup.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" },
        { field: "unitPrice" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages", unitPrice: 2.5 },
        { productName: "Coffee", category: "Beverages", unitPrice: 3.0 }
      ],
      columnMenu: {
        messages: {
          movePrev: "Move Left"
        }
      }
    });
    </script>

### columnMenu.messages.groupColumn `String` *(default: "Group column")*

The text message that is displayed for the Group column menu item.


<div class="meta-api-description">
Configure the label or wording displayed for grouping options in grid column menus, enabling localization, text customization, translation, renaming, or altering the group column menu item to suit different languages, user preferences, or interface adjustments when managing data grouping features within the grid component.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" },
        { field: "unitPrice" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages", unitPrice: 2.5 },
        { productName: "Coffee", category: "Beverages", unitPrice: 3.0 }
      ],
      groupable: true,
      columnMenu: {
        messages: {
          groupColumn: "Group by this column"
        }
      }
    });
    </script>

### columnMenu.messages.ungroupColumn `String` *(default: "Ungroup column")*

The text message that is displayed for the Ungroup column menu item.


<div class="meta-api-description">
Customize or redefine the label, caption, or text shown for the option that removes columns from grouped views in a grid or table interface, enabling control over the wording for ungrouping columns, disabling grouping toggles, renaming the ungroup command in column menus, adjusting UI language for group removal actions, and setting user-facing strings related to collapsing or expanding grouped data columns within grids.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" },
        { field: "unitPrice" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages", unitPrice: 2.5 },
        { productName: "Coffee", category: "Beverages", unitPrice: 3.0 }
      ],
      groupable: true,
      columnMenu: {
        messages: {
          ungroupColumn: "Remove grouping"
        }
      }
    });
    </script>

### columnMenu.messages.reset `String` *(default: "Reset")*

The text of the button which resets the columns filter.

> The button is visible when the column menu [componentType](/api/javascript/ui/grid/configuration/columnmenu.componenttype) is set to `modern` or `tabbed`.


<div class="meta-api-description">
Customize or configure the text label for the reset button within the grid column menu, controlling the wording displayed when using modern or tabbed column menu layouts, enabling adjustment of button captions, resetting column menu settings, changing interface language, modifying user interface text, setting localization or translation for the reset action in column menus, tailoring visual elements for column controls, and managing button labels in customizable data grid columns.
</div>

#### Example - column menu reset button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width:200 },
        { field: "name", width:400 },
        { field: "age", width:400 }
      ],
      columnMenu: {
        componentType: "modern",
        messages: {
          reset: "Reset Columns"
        }
      },
      sortable: true,
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.sortAscending `String` *(default: "Sort Ascending")*

The text message displayed for the menu item which performs ascending sort.


<div class="meta-api-description">
Control or customize the label text, name, or caption displayed for sorting columns in ascending order within a grid's column menu, enabling the configuration of user interface language, menu item naming, sort direction indicators, or accessibility labels related to ascending sort commands found in grid or table column headers.
</div>

#### Example - set the sort ascending message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        messages: {
          sortAscending: "Sort (asc)",
        }
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.sortDescending `String` *(default: "Sort Descending")*

The text message displayed for the menu item which performs descending sort.


<div class="meta-api-description">
Control or customize the label text displayed in a grid's column menu for the option that applies descending order sorting, including setting or changing the menu item's caption, title, or description related to sorting data in descending sequence, configuring how the descending sort action is presented to users, adjusting the wording or language shown for sorting from highest to lowest, and modifying the interface element that triggers sorting items in reverse order within grid columns.
</div>

#### Example - set the sort descending message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        messages: {
          sortDescending: "Sort (desc)",
        }
      },
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.setColumnPosition `String` *(default: "Set Column Position")*

The text message displayed in the column menu for the column position item.


<div class="meta-api-description">
Adjust, configure, or customize the label and text displayed for the column position option within a grid's column menu, enabling changes to how users see or interact with the setting that controls where columns are placed, moved, or rearranged in a data grid. Control the wording, phrasing, and messaging related to column positioning in the grid menu to match UI preferences, localization needs, or specific application language, ensuring clarity when users look for options to set, change, or manage column order, placement, or arrangement in data tables or grid interfaces.
</div>

#### Example - column menu set column position text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800 },
        { field: "name", width: 400, sticky: true, stickable: true },
        { field: "age", width: 800 }
      ],
      columnMenu: {
        messages: {
          setColumnPosition: "Change Position"
        }
      },
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.settings `String` *(default: "Column Settings")*

The text message displayed in the menu header (available in mobile mode only).


<div class="meta-api-description">
Customize or configure the header label, title, or text shown at the top of a grid or table column menu specifically for mobile views, enabling control over the displayed settings name, menu heading, or interface caption for column options in responsive layouts. This allows setting or adjusting the mobile column menu header message or display text to improve usability, clarity, or localization when accessing column settings on smaller devices.
</div>

#### Example - mobile column menu header

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      columnMenu: {
        messages: {
          settings: "Column Options",
        }
      },
      mobile: "phone",
      height: 550,
      sortable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.stick `String` *(default: "Stick Column")*

The text message displayed in the column menu for sticking a column.


<div class="meta-api-description">
Customize or configure the text label, tooltip, or display message for the sticky column feature in a data grid’s column menu, enabling control over how the action to fix or pin a column in place is presented to users via the interface, including setting or changing the wording for sticky, pin, lock column, or freeze column commands within the column menu options.
</div>

#### Example - column menu stick button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800 },
        { field: "name", width: 400, sticky: true, stickable: true },
        { field: "age", width: 800 }
      ],
      columnMenu: {
        messages: {
          stick: "Stick this column"
        }
      },
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.unstick `String` *(default: "Unstick Column")*

The text message displayed in the column menu for unsticking a column.


<div class="meta-api-description">
Customize or configure the text label, tooltip, or message displayed when enabling or triggering the action to unfix, release, detach, or unfreeze a column from a sticky or fixed position within a grid or table interface. Adjust the wording, phrase, prompt, or notification related to removing a pinned or locked column, controlling the user interface text for toggling column stickiness or column position locking behaviors in data grids.
</div>

#### Example - column menu unstick button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800 },
        { field: "name", width: 400, sticky: true, stickable: true },
        { field: "age", width: 800 }
      ],
      columnMenu: {
        messages: {
          unstick: "Unstick this column"
        }
      },
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });
    </script>

### columnMenu.messages.unlock `String` *(default: "Unlock Column")*

The text message displayed in the column menu for unlocking a column.


<div class="meta-api-description">
Customize or localize the label, text, or wording used to represent the action of unlocking a column within a grid's column menu, enabling control over how the unlock function is displayed, named, configured, or presented in different languages or UI settings across data grids or table components.
</div>

#### Example - column menu unlock button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { locked: true, field: "id", width:200 },
        { field: "name", width:400 },
        { field: "age", width:400 }
      ],
      columnMenu: {
        messages: {
          unlock: "Unpin this column"
        }
      },
      sortable: true,
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });
    </script>

### contextMenu `Object|Boolean` *(default: false)*

Configures the ContextMenus of the Grid.


<div class="meta-api-description">
Configure and customize right-click context menus for grid components to control interactions with rows, cells, and headers, including enabling or disabling menus, defining custom menu items and commands, setting menu positioning and appearance, and attaching event handlers to execute actions when menu options are selected, supporting scenarios such as editing, deleting, copying, or performing custom operations with flexible control over context-sensitive user interface elements in data grids or tables.
</div>

#### Example

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            contextMenu: true,
            editable: true,
            sortable: true,
            draggable: true,
            reorderable: true,
            dataSource: new kendo.data.DataSource({
                schema: {
                    model: {
                        id: "foo",
                        fields: {
                            name: "name",
                            foo: "foo",
                        },
                    },
                },
                data: [
                    { foo: "bar", name: "tom" },
                    { foo: "baz", name: "jerry" },
                ],
            }),
        });
    </script>

### contextMenu.body `Array`

Configures the items of the ContextMenu for the table body element. Those are some valid predifined tools: "separator", "create", "edit", "destroy", "select", "copySelection",."copySelectionNoHeaders", "reorderRow", "exportPDF", "exportExcel", "sortAsc", "sortDesc".

You can also specify a custom item and accosiate it with a command.


<div class="meta-api-description">
Customize and control the right-click context menu options within the main table area, enabling commands like creating, editing, deleting, selecting rows, copying selections with or without headers, reordering rows, exporting data to PDF or Excel, and sorting ascending or descending; supports adding built-in separators and fully customizable menu entries tied to specific actions or commands for enhanced user interaction and workflow configuration within data grids.
</div>

#### Example

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            contextMenu: {
                body: [
                    "exportPDF",
                    "exportExcel",
                    { name: "MyCustomCommand", text: "My Custom Command", icon: "gear", command: "CustomCommand" }
                ]
                // You can also concat to the default tools
                // body: kendo.ui.grid.defaultBodyContextMenu.concat([
                //     { name: "MyCustomCommand", text: "My Custom Command", icon: "gear", command: "CustomCommand" }
                // ])
            },
            editable: true,
            sortable: true,
            draggable: true,
            reorderable: true,
            dataSource: new kendo.data.DataSource({
                schema: {
                    model: {
                        id: "foo",
                        fields: {
                            name: "name",
                            foo: "foo",
                        },
                    },
                },
                data: [
                    { foo: "bar", name: "tom" },
                    { foo: "baz", name: "jerry" },
                ],
            }),
        });

        kendo.ui.grid.commands["CustomCommand"] = kendo.ui.grid.GridCommand.extend({
            exec: function() {
                var that = this,
                    grid = that.grid;

                grid.saveAsPDF();
            }
        });
    </script>


### contextMenu.body.name `String`
Specifies the name of the item.


<div class="meta-api-description">
Set or configure the identifier name for a context menu item within a grid or table interface to reference, identify, or target specific menu entries programmatically, enabling binding of commands, capturing selection events, or differentiating menu options by unique keys or labels for precise control and interaction handling in code.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      contextMenu: {
        body: [
          {
            name: "customAction",
            text: "Custom Action",
            command: "CustomCommand"
          }
        ]
      }
    });
    </script>

### contextMenu.body.text `String`
Specifies the text of the item.


<div class="meta-api-description">
Configure the text label displayed for a grid’s context menu item body, enabling customization of the visible name or caption shown when users right-click or open context menus within the grid interface; set, modify, or define the menu item’s displayed string during grid setup to control what text appears, including adjusting labels, captions, menu item titles, and context menu entry names for improved clarity, localization, or user interface personalization.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      contextMenu: {
        body: [
          {
            text: "Analyze Row",
            command: "AnalyzeCommand"
          }
        ]
      }
    });
    </script>

### contextMenu.body.icon `String`
Specifies the icon of the item.


<div class="meta-api-description">
Specify or set an icon, image, or visual indicator alongside a context menu item to enhance user interface clarity, improve menu item recognition, customize menu appearance with symbols or graphics, enable icons next to right-click options, add visual cues for easier navigation, control which icon or glyph appears in contextual dropdown menus, configure symbols for interactive menu entries, display small images or icons adjacent to menu text, and tailor the context menu’s look by including representative icons for different actions or commands within the grid component.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      contextMenu: {
        body: [
          {
            text: "Settings",
            icon: "gear",
            command: "SettingsCommand"
          }
        ]
      }
    });
    </script>

### contextMenu.body.command `String`
Specifies the command of the item.


<div class="meta-api-description">
Configure or set the command identifier or name linked to a context menu item within a grid to trigger specific actions, functions, or handlers when the menu entry is selected, enabling customization of context menu behavior by associating menu items with predefined grid commands, custom commands, callbacks, event handlers, or custom logic to control grid interactions, execute operations, invoke functions, or respond to user selections dynamically within the application's data grid context menu system.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      contextMenu: {
        body: [
          {
            text: "Export Row",
            command: "ExportRowCommand"
          }
        ]
      }
    });
    </script>

### contextMenu.body.items `Array`
Specifies the items of the item.


<div class="meta-api-description">
Set or customize the list of menu entries that appear inside the grid's contextual menu body, defining an array of menu elements including labels, icons, clickable actions, separators, or nested submenu items to control what options users see and interact with when right-clicking or opening the grid menu, enabling full configuration of menu content, order, and behavior to suit different UI needs and workflows.
</div>

#### Example

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            contextMenu: {
                body: [
                    {
                        text: "Custom Command",
                        icon: "calendar",
                        items: [
                            { text: "Nested Custom Command", icon: "home", command: "NestedCustomCommand" }
                        ]
                    },
                    'select'
                ]
            },
            dataSource: new kendo.data.DataSource({
                schema: {
                    model: {
                        id: "foo",
                        fields: {
                            name: "name",
                            foo: "foo",
                        },
                    },
                },
                data: [
                    { foo: "bar", name: "tom" },
                    { foo: "baz", name: "jerry" },
                ],
            }),
        });

        kendo.ui.grid.commands["NestedCustomCommand"] = kendo.ui.grid.GridCommand.extend({
            exec: function(e) {
                 alert("Custom Command Executed")
            }
        });
    </script>

### contextMenu.body.items.name `String`
Specifies the name of the item.


<div class="meta-api-description">
Configure or assign the unique identifier for items within a grid's context menu body to enable precise recognition, programmatic access, command execution, event handling, or conditional logic based on specific menu entries, allowing developers to reference, bind actions, customize behavior, differentiate, or manage context menu options dynamically and effectively in grid interfaces.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      contextMenu: {
        body: [
          {
            text: "Actions",
            items: [
              {
                name: "subAction1",
                text: "Sub Action 1",
                command: "SubCommand1"
              }
            ]
          }
        ]
      }
    });
    </script>

### contextMenu.body.items.text `String`
Specifies the text of the item.


<div class="meta-api-description">
Configure the text label, caption, or visible string for individual context menu entries within a grid or data table interface, enabling precise control over menu item names, custom action labels, and user-visible descriptions in right-click or context-sensitive menus. This setting supports customizing menu item texts, defining exact phrases shown to users, altering context menu options’ wording, and managing label content for body menu items in interactive grid environments.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      contextMenu: {
        body: [
          {
            text: "More Options",
            items: [
              {
                text: "Copy Value",
                command: "CopyCommand"
              }
            ]
          }
        ]
      }
    });
    </script>

### contextMenu.body.items.icon `String`
Specifies the icon of the item.


<div class="meta-api-description">
Set or customize the visual icon displayed next to each menu item in the context menu body of a grid, including specifying icon names, CSS classes, or theme-compatible markup for consistent styling and appearance. Control how icons appear adjacent to menu entries, configure icon visuals for context menu options, enable inline icons by name or class, and tailor iconography to match design themes or user interface requirements within grid context menus. Adjust icon representation for clarity, branding, or usability in dropdown menus triggered on grid interactions.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      contextMenu: {
        body: [
          {
            text: "Tools",
            items: [
              {
                text: "Edit",
                icon: "edit",
                command: "EditCommand"
              }
            ]
          }
        ]
      }
    });
    </script>

### contextMenu.body.items.command `String`
Specifies the command of the item.


<div class="meta-api-description">
Configure or set the action, command, or identifier linked to a context menu item in a data grid to control what operation triggers when a user selects that menu entry, enabling customization of grid commands, menu behaviors, and action handlers within context menus, including assigning, enabling, or binding specific commands to menu items for executing grid functions or workflows.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      contextMenu: {
        body: [
          {
            text: "Advanced",
            items: [
              {
                text: "Process",
                command: "ProcessCommand"
              }
            ]
          }
        ]
      }
    });
    </script>

### contextMenu.groups `Array`

Configures the items of the ContextMenu for the group elements in the Grid header. Those are some valid predifined tools: "separator", "moveGroupPrevious", "moveGroupNext".

You can also specify a custom item and accociate it with a command.


<div class="meta-api-description">
Customize and control the context menu options available on group headers within a data grid, enabling configuration of built-in commands like separators and group reorder actions or adding your own custom menu items with specific commands. Adjust, set up, and tailor context menu items for grouped data views, including inserting predefined tools such as moving groups up or down, or defining unique commands to enhance user interaction with grid grouping features. Manage and enable context menu customization for grouped header rows, supporting both default actions and user-defined menu entries to optimize group header controls and improve usability in tabular data displays.
</div>

#### Example

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            contextMenu: {
                groups: [
                    "moveGroupPrevious",
                    "moveGroupNext",
                    { name: "MyCustomCommand", text: "My Custom Command", icon: "gear", command: "CustomCommand" }
                ]
                // You can also concat to the default tools
                // body: kendo.ui.grid.defaultGroupsContextMenu.concat([
                //     { name: "MyCustomCommand", text: "My Custom Command", icon: "gear", command: "CustomCommand" }
                // ])
            },
            groupable: true,
            dataSource: new kendo.data.DataSource({
                schema: {
                    model: {
                        id: "foo",
                        fields: {
                            name: "name",
                            foo: "foo",
                        },
                    },
                },
                data: [
                    { foo: "bar", name: "tom" },
                    { foo: "baz", name: "jerry" },
                ],
            }),
        });

        kendo.ui.grid.commands["CustomCommand"] = kendo.ui.grid.GridCommand.extend({
            exec: function() {
                var that = this,
                    grid = that.grid;

                // e.g., clear groups
                grid.dataSource.group([]);
            }
        });
    </script>


### contextMenu.groups.name `String`
Specifies the name of the item.


<div class="meta-api-description">
Configure or set the text label, identifier, or display name for a context menu group item within a grid or data table interface to control how the group appears in menus, target specific groups for event handling, command binding, or styling, and enable developers to customize, reference, or manipulate context menu sections by their assigned names or labels during user interactions or programmatic workflows.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      groupable: true,
      contextMenu: {
        groups: [
          {
            name: "groupAction",
            text: "Group Action",
            command: "GroupCommand"
          }
        ]
      }
    });
    </script>

### contextMenu.groups.text `String`
Specifies the text of the item.


<div class="meta-api-description">
Control, customize, or localize the display text and labels for grouped context menu items in a grid interface, including setting or configuring the visible captions, headers, or names that appear in right-click or contextual menus, enabling tailored, dynamic, or multilingual group titles for improved user interface clarity and usability during grid setup or runtime.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      groupable: true,
      contextMenu: {
        groups: [
          {
            text: "Manage Group",
            command: "ManageGroupCommand"
          }
        ]
      }
    });
    </script>

### contextMenu.groups.icon `String`
Specifies the icon of the item.


<div class="meta-api-description">
Customize or configure the symbol or visual indicator displayed alongside context menu group labels in a grid, including setting or changing the icon via class names or predefined icon identifiers, controlling appearance, styling, and representation of menu group items, enabling intuitive visual cues, adjusting the icon graphic for different groups within the grid’s contextual menu, and influencing how users recognize or interact with grouped menu options by specifying icon types or CSS-based icons.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      groupable: true,
      contextMenu: {
        groups: [
          {
            text: "Group Settings",
            icon: "gear",
            command: "GroupSettingsCommand"
          }
        ]
      }
    });
    </script>

### contextMenu.groups.command `String`
Specifies the command of the item.


<div class="meta-api-description">
Configure or set the action identifier for context menu items to link user clicks with specific commands or behaviors within a grid interface. Enable or define command strings to map menu selections to built-in functions or custom operations, supporting dynamic interaction handling, event mapping, and custom action triggering. This property supports naming and binding commands for contextual menu options to facilitate control over menu-driven workflows, automate responses to user choices, and extend functionality through command assignment and event association in grid components.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      groupable: true,
      contextMenu: {
        groups: [
          {
            text: "Export Group",
            command: "ExportGroupCommand"
          }
        ]
      }
    });
    </script>

### contextMenu.groups.items `Array`
Specifies the items of the item.


<div class="meta-api-description">
Configure and customize the entries within a grid context menu group by specifying a list or array of menu options, which can include simple labels, detailed menu item settings, nested sub-menus, separators for organizing items, executable commands, and display text. Enable control over the structure and content of contextual menu groups in grid interfaces by setting up various menu configurations, supporting both flat and hierarchical arrangements, customizable commands, and visual separators to enhance user interaction and navigation within grid context menus. Tailor group menu entries with flexible definitions for item labels, command bindings, and submenu nesting to fit complex UI requirements for grid context menu controls.
</div>

#### Example

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            contextMenu: {
                groups: [
                    {
                        text: "Custom Command",
                        icon: "calendar",
                        items: [
                            { text: "Nested Custom Command", icon: "home", command: "NestedCustomCommand" }
                        ]
                    },
                    'select'
                ]
            },
            dataSource: new kendo.data.DataSource({
                schema: {
                    model: {
                        id: "foo",
                        fields: {
                            name: "name",
                            foo: "foo",
                        },
                    },
                },
                data: [
                    { foo: "bar", name: "tom" },
                    { foo: "baz", name: "jerry" },
                ],
            }),
        });

        kendo.ui.grid.commands["NestedCustomCommand"] = kendo.ui.grid.GridCommand.extend({
            exec: function(e) {
                 alert("Custom Command Executed")
            }
        });
    </script>

### contextMenu.groups.items.name `String`
Specifies the name of the item.


<div class="meta-api-description">
Define or assign a unique identifier or label for context menu entries within a grid, enabling referencing and controlling specific menu items through names in event handling, command execution, conditional logic, localization support, or dynamic UI updates; set, configure, or specify string keys to manage menu item behaviors, trigger callbacks, localize content, or conditionally display options during grid setup or runtime adjustments.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      groupable: true,
      contextMenu: {
        groups: [
          {
            text: "Group Tools",
            items: [
              {
                name: "subGroupAction",
                text: "Sub Group Action",
                command: "SubGroupCommand"
              }
            ]
          }
        ]
      }
    });
    </script>

### contextMenu.groups.items.text `String`
Specifies the text of the item.


<div class="meta-api-description">
Configure or customize the label, caption, or visible text displayed on context menu items within grid groups, enabling dynamic setting, localization, binding, or updating of menu item names such as edit, delete, copy, or custom actions visible in the grid’s right-click or context menu interface to tailor the user experience or adapt to different languages and application states during initialization or runtime.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      groupable: true,
      contextMenu: {
        groups: [
          {
            text: "Group Operations",
            items: [
              {
                text: "Expand All",
                command: "ExpandAllCommand"
              }
            ]
          }
        ]
      }
    });
    </script>

### contextMenu.groups.items.icon `String`
Specifies the icon of the item.


<div class="meta-api-description">
Set or customize icons for context menu entries in grid components by specifying icon identifiers, CSS classes, or sprite images that appear alongside menu item labels; configure visual indicators, symbols, or glyphs to enhance menu usability and appearance during initialization, enabling control over icon types, styles, and how they visually represent specific menu actions or options within grid context menus.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      groupable: true,
      contextMenu: {
        groups: [
          {
            text: "Group Actions",
            items: [
              {
                text: "Collapse",
                icon: "minus",
                command: "CollapseCommand"
              }
            ]
          }
        ]
      }
    });
    </script>

### contextMenu.groups.items.command `String`
Specifies the command of the item.


<div class="meta-api-description">
Configure or set the action triggered when selecting an option from a grid context menu by specifying commands, such as built-in or custom command names linked to click handlers, enabling control over interactive behaviors in grid menus, handling custom or predefined operations upon user selection, mapping menu items to specific functions, and managing event-driven command execution within grid interfaces.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      groupable: true,
      contextMenu: {
        groups: [
          {
            text: "Advanced",
            items: [
              {
                text: "Custom Group Action",
                command: "CustomGroupCommand"
              }
            ]
          }
        ]
      }
    });
    </script>

### contextMenu.head `Array`

Configures the items of the ContextMenu for the table head element. Those are some valid predifined tools: "separator", "create", "edit", "destroy", "select", "copySelection",."copySelectionNoHeaders", "reorderRow", "exportPDF", "exportExcel", "sortAsc", "sortDesc".

You can also specify a custom item and accosiate it with a command.


<div class="meta-api-description">
Customize or configure the header context menu options in a data grid to include built-in actions like create, edit, delete, select, copy with or without headers, reorder rows, export to PDF or Excel, and sorting ascending or descending, as well as add custom commands and separators to tailor the table head menu for advanced user interactions, enabling fine control over which actions appear on right-click for column headers in grids or tables.
</div>

#### Example

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            contextMenu: {
                head: [
                    "sortAsc",
                    "sortDesc",
                    "exportExcel",
                    { name: "MyCustomCommand", text: "My Custom Command", icon: "gear", command: "CustomCommand" }
                ]
                // You can also concat to the default tools
                // head: kendo.ui.grid.defaultHeadContextMenu.concat([
                //     { name: "MyCustomCommand", text: "My Custom Command", icon: "gear", command: "CustomCommand" }
                // ])
            },
            editable: true,
            sortable: true,
            draggable: true,
            reorderable: true,
            dataSource: new kendo.data.DataSource({
                schema: {
                    model: {
                        id: "foo",
                        fields: {
                            name: "name",
                            foo: "foo",
                        },
                    },
                },
                data: [
                    { foo: "bar", name: "tom" },
                    { foo: "baz", name: "jerry" },
                ],
            }),
        });

        kendo.ui.grid.commands["CustomCommand"] = kendo.ui.grid.GridCommand.extend({
            exec: function() {
                var that = this,
                    grid = that.grid;

                grid.saveAsPDF();
            }
        });
    </script>


### contextMenu.head.name `String`
Specifies the name of the item.


<div class="meta-api-description">
Control, configure, or set the display text, label, or name for header context menu items in grid interfaces, enabling customization, localization, renaming, or modification of the text shown when users right-click or open header menus; useful for tailoring menu options, adapting language or terminology, and managing the visible names of context menu entries in tabular data grids or column headers.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" },
        { field: "unitPrice" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages", unitPrice: 2.5 },
        { productName: "Coffee", category: "Beverages", unitPrice: 3.0 }
      ],
      contextMenu: {
        head: [
          { 
            name: "editrow",
            text: "Edit Row",
            icon: "edit"
          }
        ]
      }
    });
    </script>

### contextMenu.head.text `String`
Specifies the text of the item.


<div class="meta-api-description">
Customize the label or caption displayed in the column header’s context menu within a grid or data table, enabling control over the text shown when users right-click or open the header menu. This setting supports configuring, renaming, or localizing the visible string for the header context menu item, allowing developers to set, update, or translate menu labels for column headers at initialization or runtime to match UI language preferences, enhance clarity, or tailor user interface elements in tabular data grids.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" },
        { field: "unitPrice" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages", unitPrice: 2.5 },
        { productName: "Coffee", category: "Beverages", unitPrice: 3.0 }
      ],
      contextMenu: {
        head: [
          { 
            name: "editrow",
            text: "Edit Current Row",
            icon: "edit"
          }
        ]
      }
    });
    </script>

### contextMenu.head.icon `String`
Specifies the icon of the item.


<div class="meta-api-description">
Configure or set an icon displayed alongside context menu header items in grid components, enabling control over header visuals with CSS classes, image URLs, or custom markup; customize, enable, or change icons next to context menu headers for grid interfaces, including specifying visual elements to enhance menu item appearance and support various formats and rendering methods for header icons within grid context menus.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" },
        { field: "unitPrice" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages", unitPrice: 2.5 },
        { productName: "Coffee", category: "Beverages", unitPrice: 3.0 }
      ],
      contextMenu: {
        head: [
          { 
            name: "editrow",
            text: "Edit Row",
            icon: "k-icon k-i-edit"
          }
        ]
      }
    });
    </script>

### contextMenu.head.command `String`
Specifies the command of the item.


<div class="meta-api-description">
Specify or customize the action triggered from a grid header’s right-click or context menu by setting the command name that matches built-in or custom handlers, enabling control over header menu commands, configuring which function runs upon selecting header menu items, mapping string identifiers to execute specific header context actions, and managing header item interactions through command assignments during component setup.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" },
        { field: "unitPrice" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages", unitPrice: 2.5 },
        { productName: "Coffee", category: "Beverages", unitPrice: 3.0 }
      ],
      editable: "inline",
      contextMenu: {
        head: [
          { 
            name: "editrow",
            text: "Edit Row",
            command: "edit"
          }
        ]
      }
    });
    </script>

### contextMenu.head.items `Array`
Specifies the items of the item.


<div class="meta-api-description">
Customize, configure, or control the context menu items displayed in the grid header by setting an array of entries that define which options appear when users right-click or interact with the header menu, allowing addition, removal, reordering, or modification of menu commands, options, or actions in the grid’s top section context menu.
</div>

#### Example

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            contextMenu: {
                head: [
                    {
                        text: "Custom Command",
                        icon: "calendar",
                        items: [
                            { text: "Nested Custom Command", icon: "home", command: "NestedCustomCommand" }
                        ]
                    },
                    'select'
                ]
            },
            dataSource: new kendo.data.DataSource({
                schema: {
                    model: {
                        id: "foo",
                        fields: {
                            name: "name",
                            foo: "foo",
                        },
                    },
                },
                data: [
                    { foo: "bar", name: "tom" },
                    { foo: "baz", name: "jerry" },
                ],
            }),
        });

        kendo.ui.grid.commands["NestedCustomCommand"] = kendo.ui.grid.GridCommand.extend({
            exec: function(e) {
                 alert("Custom Command Executed")
            }
        });
    </script>

### contextMenu.head.items.name `String`
Specifies the name of the item.


<div class="meta-api-description">
Configure or specify the identifier string used for header menu items in grid context menus to programmatically access, reference, enable event handling, trigger commands, customize, differentiate, or dynamically generate and control specific menu options within grid headers.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" },
        { field: "unitPrice" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages", unitPrice: 2.5 },
        { productName: "Coffee", category: "Beverages", unitPrice: 3.0 }
      ],
      contextMenu: {
        head: [
          { 
            name: "actions",
            text: "Row Actions",
            items: [
              { name: "edititem", text: "Edit", command: "edit" },
              { name: "deleteitem", text: "Delete", command: "destroy" }
            ]
          }
        ]
      }
    });
    </script>

### contextMenu.head.items.text `String`
Specifies the text of the item.


<div class="meta-api-description">
Configure or customize the label, caption, or display text for header context menu items in a grid or table component, enabling dynamic updates, localization, translation, or personalization of menu entries shown when users right-click or interact with column headers. Adjust, set, rename, or override the string value presented in the header’s contextual dropdown to reflect custom names, multilingual support, or updated descriptors at runtime or during setup, ensuring the header context menu accurately communicates available actions and enhances user experience through adaptable menu item text options.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" },
        { field: "unitPrice" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages", unitPrice: 2.5 },
        { productName: "Coffee", category: "Beverages", unitPrice: 3.0 }
      ],
      contextMenu: {
        head: [
          { 
            name: "actions",
            text: "Actions",
            items: [
              { name: "edititem", text: "Edit Row", command: "edit" },
              { name: "deleteitem", text: "Delete Row", command: "destroy" }
            ]
          }
        ]
      }
    });
    </script>

### contextMenu.head.items.icon `String`
Specifies the icon of the item.


<div class="meta-api-description">
Control or customize the visual icon, glyph, or symbol displayed next to header menu items in a grid context menu by setting or configuring icon classes, identifiers, or visual markers to enhance recognition, differentiate actions, or improve the user interface of header-related commands in data grids, tables, or interactive UI components.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" },
        { field: "unitPrice" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages", unitPrice: 2.5 },
        { productName: "Coffee", category: "Beverages", unitPrice: 3.0 }
      ],
      contextMenu: {
        head: [
          { 
            name: "actions",
            text: "Actions",
            items: [
              { name: "edititem", text: "Edit", icon: "k-icon k-i-edit", command: "edit" },
              { name: "deleteitem", text: "Delete", icon: "k-icon k-i-delete", command: "destroy" }
            ]
          }
        ]
      }
    });
    </script>

### contextMenu.head.items.command `String`
Specifies the command of the item.


<div class="meta-api-description">
Configure actions triggered by selecting items in the Grid header context menu by specifying command identifiers, command names, or event handlers to map menu selections to predefined functions, custom callbacks, or application logic; enable binding of header menu options to commands for executing specific tasks, integrating with command patterns, or customizing context menu behavior in grids for dynamic interaction, automated workflows, or conditional action execution when users click header menu entries.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" },
        { field: "unitPrice" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages", unitPrice: 2.5 },
        { productName: "Coffee", category: "Beverages", unitPrice: 3.0 }
      ],
      editable: "inline",
      contextMenu: {
        head: [
          { 
            name: "actions",
            text: "Actions",
            items: [
              { name: "edititem", text: "Edit", command: "edit" },
              { name: "deleteitem", text: "Delete", command: "destroy" }
            ]
          }
        ]
      }
    });
    </script>

### contextMenu.close `Function`

Fires before a sub menu or the ContextMenu gets closed. You can cancel this event to prevent closure.  [ContextMenu Events](/api/javascript/ui/contextmenu#events).


<div class="meta-api-description">
Control and manage the closing behavior of context menus and submenus within grid components, enabling developers to intercept, handle, or cancel the automatic closing actions triggered by user interactions or programmatic commands. Configure event handlers to prevent the menu or any submenu from closing prematurely, customize responses before closure events fire, and implement logic to keep context menus open or conditionally close them. This includes scenarios like disabling menu closure on clicks, managing nested submenu closure, handling close events for custom context menu workflows, and enabling or disabling automatic dismissal behavior to suit complex UI needs.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" },
        { field: "unitPrice" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages", unitPrice: 2.5 },
        { productName: "Coffee", category: "Beverages", unitPrice: 3.0 }
      ],
      contextMenu: {
        close: function(e) {
          console.log("Context menu is closing");
        }
      }
    });
    </script>

### contextMenu.open `Function`

Fires before a sub menu or the ContextMenu gets opened. You can cancel this event to prevent opening the sub menu. [ContextMenu Events](/api/javascript/ui/contextmenu#events).


<div class="meta-api-description">
Control or intercept the display of context menus and submenus on right-click or other triggers by enabling event handlers that fire before these menus open, allowing you to inspect event data, target elements, and conditionally prevent default behavior to block or modify menu appearance; configure handlers to customize, disable, or override the context menu opening process, supporting use cases like right-click suppression, conditional submenu display, dynamic context actions, and fine-grained control over context menu behavior or cancellation.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" },
        { field: "unitPrice" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages", unitPrice: 2.5 },
        { productName: "Coffee", category: "Beverages", unitPrice: 3.0 }
      ],
      contextMenu: {
        open: function(e) {
          console.log("Context menu is opening");
        }
      }
    });
    </script>

### contextMenu.activate `Function`

Fires when a sub menu or the ContextMenu gets opened and its animation finished. [ContextMenu Events](/api/javascript/ui/contextmenu#events).


<div class="meta-api-description">
Trigger custom actions or callbacks when the right-click or context menu within a grid fully opens or when any submenu appears and completes its opening animation, enabling developers to configure event handlers that respond precisely at the moment the menu is active and interactive. This includes detecting when context menus or submenus are displayed, controlling behavior upon menu activation, managing UI state after the menu is fully loaded, and hooking into events for dynamic responses during menu lifecycle in data grids or tables.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" },
        { field: "unitPrice" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages", unitPrice: 2.5 },
        { productName: "Coffee", category: "Beverages", unitPrice: 3.0 }
      ],
      contextMenu: {
        activate: function(e) {
          console.log("Context menu activated");
        }
      }
    });
    </script>

### contextMenu.deactivate `Function`

Fires when a sub menu or the ContextMenu gets closed and its animation finished. [ContextMenu Events](/api/javascript/ui/contextmenu#events).


<div class="meta-api-description">
Trigger functions or execute callbacks when the right-click context menu or any of its nested submenus finishes closing and the close animation ends, enabling developers to handle post-close actions, cleanup, state updates, or UI adjustments upon context menu dismissal, submenu exit, or after user interaction with hierarchical menus completes, supporting scenarios like disabling features after context menu closure, saving state on submenu close, or running custom logic when all menu elements are hidden and animations are fully done.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" },
        { field: "unitPrice" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages", unitPrice: 2.5 },
        { productName: "Coffee", category: "Beverages", unitPrice: 3.0 }
      ],
      contextMenu: {
        deactivate: function(e) {
          console.log("Context menu deactivated");
        }
      }
    });
    </script>

### contextMenu.select `Function`

Fires when a menu item gets selected. [ContextMenu Events](/api/javascript/ui/contextmenu#events).


<div class="meta-api-description">
Customize actions triggered by selecting items from a grid's right-click or context menu, enabling handling of user choices and executing custom code on menu item selection. Capture and respond to clicks on context menu options, manage event data for the selected entries, trigger specific logic when users pick commands from the grid menu, configure event listeners for context menu item activation, intercept and process context menu interactions, and implement tailored workflows based on user selection of grid commands or options within the contextual dropdown.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" },
        { field: "unitPrice" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages", unitPrice: 2.5 },
        { productName: "Coffee", category: "Beverages", unitPrice: 3.0 }
      ],
      contextMenu: {
        select: function(e) {
          console.log("Context menu item selected:", e.item.text);
        }
      }
    });
    </script>

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the Grid holds the items that will be rendered inside the widget. An item can be a JavaScript object which represents a valid data source configuration, a JavaScript array, or an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance.

If the `dataSource` option is set to a JavaScript object or array, the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance by using that value as a data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.

> For live demos and more complex configurations, refer to the article on [binding the Grid to local data](https://demos.telerik.com/kendo-ui/grid/local-data-binding) and [binding the Grid to remote data](https://demos.telerik.com/kendo-ui/grid/remote-data-binding).


<div class="meta-api-description">
Configure and control the grid’s data input by setting or binding various data sources such as local JavaScript arrays, plain objects with data configurations, or existing data source instances to render and manage the grid items dynamically; enable integration with custom data collections, remote or local datasets, live updates, and handle data management scenarios by assigning native arrays, structured data objects, or reusable data source instances for flexible and efficient grid content population and synchronization.
</div>

#### Example - set dataSource as a JavaScript object with data, page and pageSize properties

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        pageable: true,
        // The dataSource configuration is an object which contains some data and a couple of configurations.
        dataSource: {
          data: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 },
            { name: "Mike Doe", age: 31 },
            { name: "Tom Doe", age: 35 },
            { name: "Danny Doe", age: 37 }
          ],
          pageSize: 2, // The number of items displayed per page
          page: 2 // Page 2 will be opened by default when the Grid loads.
        }
      });
    </script>

#### Example - set dataSource as a JavaScript array

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      // The dataSource configuration is a simple array with no additional configurations.
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

#### Example - set dataSource as an existing kendo.data.DataSource instance

    <div id="grid"></div>
    <script>
    // The dataSource is initialized as a stand-alone widget that can be bound to the Grid.
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          // The remote endpoint from which the data is retrieved.
          url: "https://demos.telerik.com/service/v2/core/products"
        }
      },
      pageSize: 10
    });

    $("#grid").kendoGrid({
      // The dataSource configuration is set to an existing DataSource instance.
      dataSource: dataSource,
      pageable: true
    });
    </script>

### detailTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the detail rows.
Check [Detail Template](https://demos.telerik.com/kendo-ui/grid/detailtemplate) for a live demo.

> The detail template content cannot be wider than the total width of all master columns, unless the detail template is scrollable.


<div class="meta-api-description">
Render expandable detail rows with customizable HTML or JavaScript templates to display nested content, child records, or master-detail layouts within a grid. Enable or configure dynamic detail panels, set up collapsible row details, and control how additional information is shown inline or as expandable sections tied to each master row. Use templates to embed complex sub-records, hierarchical data views, drill-down interfaces, or linked details, ensuring responsive layout or scrollable containers when content exceeds the master row’s width. Support scenarios like nested data visualization, row expansion, detailed views, and interactive child elements inside grid rows.
</div>

#### Example - specify detail template as a string literal

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      detailTemplate: ({ name, age }) => `<div>Name: ${kendo.htmlEncode(name)}</div><div>Age: ${kendo.htmlEncode(age)}</div>`
    });
    </script>

### editable `Boolean|Object|String` *(default: false)*

If set to `true` the user would be able to edit the data to which the grid is bound. By default editing is disabled.

Can be set to a string ("inline", "incell" or "popup") to specify the editing mode. The default editing mode is "incell".

Can be set to a JavaScript object which represents the editing configuration.

> The "inline" and "popup" editing modes are triggered by the "edit" column command. Thus it is required to have a column with an "edit" command.
>
> The "incell" editing mode combined with DataSource `autoSync: true` setting is not supported when using server-side grouping in the Grid. To be able to save edited values on each change, you can disable server-side grouping or trigger a DataSource `sync()` manually inside the [`cellClose` event](/api/javascript/ui/grid/events/cellclose).


<div class="meta-api-description">
Control whether users can modify grid data interactively by enabling or disabling inline editing, in-cell edits, or popup editors for bound records, allowing customization of editing modes through simple true/false flags, string mode selectors like "inline," "incell," or "popup," or detailed JavaScript configuration objects; support for editing via commands tied to specific columns for inline and popup modes; compatibility considerations with features like server-side grouping and synchronization options to ensure changes persist, and options to automate or manually trigger data syncing during edit lifecycle events to tailor user experiences for modifying tabular data directly within cells or through overlay interfaces.
</div>

#### Example - enable editing

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        toolbar: ["save"],
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
         data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
         ],
         schema:{
          model: {
           id: "id",
           fields: {
             age: { type: "number"}
           }
          }
         }
        },
        editable: true
      });
    </script>

#### Example - enable popup editing

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      editable: "popup"
    });
    </script>

> Check [Batch editing](https://demos.telerik.com/kendo-ui/grid/editing), [Inline editing](https://demos.telerik.com/kendo-ui/grid/editing-inline) and [Popup editing](https://demos.telerik.com/kendo-ui/grid/editing-popup) for live demos.

### editable.confirmation `Boolean|String|Function` *(default: true)*

If set to `true` the grid will display a confirmation dialog when the user clicks the "destroy" command button.

Can be set to a string which will be used as the confirmation text.

Can be set to a function which will be called, passing the model instance, to return the confirmation text.

This and all Grid [`configuration properties`](/api/javascript/ui/grid#configuration) can be set (enabled/disabled) after the grid has been initialized with the [`setOptions`](/api/javascript/ui/grid/methods/setoptions) method.


<div class="meta-api-description">
Enable or control confirmation prompts when deleting rows in a grid, including options to configure default or custom dialog messages, specify dynamic confirmation text based on the data model, toggle delete confirmation dialogs on or off, and customize user prompts for row removal actions; this feature supports interaction patterns like asking for user approval before row deletion, configuring modal dialogs triggered by destroy commands, setting confirmation text as static strings or functions returning messages, and adjusting these settings dynamically after grid initialization to ensure safe editing and prevent accidental data loss.
</div>

#### Example - disable delete confirmation

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: {
        data: [
         { id: 1, name: "Jane Doe", age: 30 },
         { id: 2, name: "John Doe", age: 33 }
        ],
        schema:{
         model: {
          id: "id",
          fields: {
            age: { type: "number"}
          }
         }
        }
       },
       editable: {
         confirmation: false
       }
    });
    </script>

#### Example - set delete confirmation text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: {
        data: [
         { id: 1, name: "Jane Doe", age: 30 },
         { id: 2, name: "John Doe", age: 33 }
        ],
        schema:{
         model: {
          id: "id",
          fields: {
            age: { type: "number"}
          }
         }
        }
       },
       editable: {
         confirmation: "Are you sure that you want to delete this record?"
       }
    });
    </script>

#### Example - set delete confirmation as function

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: {
        data: [
         { id: 1, name: "Jane Doe", age: 30 },
         { id: 2, name: "John Doe", age: 33 }
        ],
        schema:{
         model: {
          id: "id",
          fields: {
            age: { type: "number"}
          }
         }
        }
       },
       editable: {
         confirmation: function(e) {
             return  "Are you sure that you want to delete record for " + e.name + "?";
         }
       }
    });
    </script>

### editable.cancelDelete `String` *(default: "Cancel")*

If confirmation is enabled the grid will display a confirmation dialog when the user clicks the "destroy" command button.
If the grid is in mobile mode this text will be used for the cancel button.


<div class="meta-api-description">
Configure or customize the text label displayed on the confirmation dialog when a delete action is initiated and the system prompts for cancellation, especially relevant for mobile interfaces, allowing you to set the cancel button text or message shown to users during delete confirmation workflows, manage how the cancel option appears when users attempt to remove data or records in grid components, and control the wording that appears for undoing or aborting a deletion action on touch devices or responsive layouts.
</div>

#### Example - change the cancel delete button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: {
        data: [
         { id: 1, name: "Jane Doe", age: 30 },
         { id: 2, name: "John Doe", age: 33 }
        ],
        schema:{
         model: {
          id: "id",
          fields: {
            age: { type: "number"}
          }
         }
        }
       },
       height: 550,
       mobile: "phone",
       editable: {
         confirmation: true,
         cancelDelete: "No"
       }
    });
    </script>

### editable.confirmDelete `String` *(default: "Delete")*

If confirmation is enabled the grid will display a confirmation dialog when the user clicks the "destroy" command button.
If the grid is in mobile mode this text will be used for the confirm button.


<div class="meta-api-description">
Configure or customize the deletion confirmation prompt, control the message text that appears when a user tries to remove or delete an item, enable or disable confirmation dialogs for delete actions, specify custom warning or alert messages before data removal, set the confirmation dialog label or button text shown in both desktop and mobile views when users trigger delete or destroy commands, manage user prompts that prevent accidental deletions, and adjust the interaction text for confirming record or grid item removals.
</div>

#### Example - change the confirm delete button text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: {
        data: [
         { id: 1, name: "Jane Doe", age: 30 },
         { id: 2, name: "John Doe", age: 33 }
        ],
        schema:{
         model: {
          id: "id",
          fields: {
            age: { type: "number"}
          }
         }
        }
       },
       mobile: "phone",
       height: 550,
       editable: {
         confirmation: true,
         confirmDelete: "Yes"
       }
    });
    </script>

### editable.createAt `String` *(default: "top")*

The position at which new data items are inserted in the grid. Must be set to either "top" or "bottom". By default new data items are inserted at the top.


<div class="meta-api-description">
Configure where new rows or entries appear in a data grid or table, choosing whether to insert newly added items at the beginning, top, start, or head of the list or at the end, bottom, or tail, enabling control over row insertion position during initialization or setup, useful for managing how new data is appended or prepended in grids, lists, or tables.
</div>

#### Example - insert new data items at the bottom

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      editable: {
        createAt: "bottom"
      },
      toolbar: ["create"]
    });
    </script>

### editable.destroy `Boolean` *(default: true)*

If set to `true` the user can delete data items from the grid by clicking the "destroy" command button. Deleting is enabled by default.


<div class="meta-api-description">
Control whether users can delete records using the built-in delete or destroy action within the grid interface, enabling or disabling the ability to remove data items through a delete button or command. Configure the grid to allow item removal by activating the deletion feature, toggle deletion permissions for user interactions, prevent accidental or intentional data deletions by disabling the delete command, set up user controls for editing and deleting rows, enable or restrict row removal via UI buttons, and manage permissions for destroy or delete operations in editable grids during setup or runtime.
</div>

#### Example - disable deleting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      editable: {
        destroy: false
      },
      toolbar: ["create"]
    });
    </script>

### editable.mode `String` *(default: "incell")*

The editing mode to use. The supported editing modes are "incell", "inline" and "popup".

> The "inline" and "popup" editing modes are triggered by the "edit" column command. Thus it is required to have a column with an "edit" command.

> As of Kendo UI version R3 2023, the `incell` editing of cells on mobile devices is activated on `double tap` of a Grid cell.



<div class="meta-api-description">
Control and configure the editing interface style for grid data with options to enable cell-level editing, inline row editing triggered by edit commands, or popup dialog editing, supporting seamless user interaction modes such as double-tap activation on mobile devices, customizable edit triggers via commands, and flexible setup during grid initialization to manage how users modify tabular information through in-cell edits, inline forms, or popup windows for efficient data entry, user-friendly update flows, and varied editing experiences across desktop and mobile environments.
</div>

#### Example - specify inline editing mode

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      editable: {
        mode: "inline"
      }
    });
    </script>

#### Example - specify popup editing mode

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      editable: {
        mode: "popup"
      }
    });
    </script>

#### Example - specify incell editing mode

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["save"],
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      editable: {
        mode: "incell"
      }
    });
    </script>

### editable.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders popup editor.

The template should contain elements whose `name` HTML attributes are set as the editable fields. This is how the grid will know
which field to update. The other option is to use [MVVM](/framework/mvvm/overview) bindings in order to bind HTML elements to data item fields.

> Use the `role` data attribute to initialize Kendo UI widgets in the template. Check [data attribute initialization](/framework/data-attribute-initialization) for more info.
> The validation that is set in [`schema.model`](/api/javascript/data/datasource/configuration/schema#schemamodel) is not mapped automatically. As a result, when you use the `editable.template` option, you have to add the validation for every element manually.

To change the size of the popup editor you can follow the approach outlined in [this article](/knowledge-base/grid-adjust-popup-size).


<div class="meta-api-description">
Enable full customization of popup editing interfaces in data grids by providing custom HTML templates that define the layout and form inputs, allowing developers to set or configure editable fields either by matching input element name attributes to data model fields or by applying MVVM bindings for dynamic data connections. Control and customize form inputs, validation rules, and widget integration within the popup editor, including initializing UI components via role data attributes to enhance interactivity. Adjust popup editor size and appearance through templates while manually adding validation logic consistent with underlying data schemas, supporting use cases such as customizing grid item editing dialogs, configuring form layouts, enabling advanced input controls, and ensuring data binding and validation within popup editors. This flexibility enables setting up customized, dynamic, and interactive popup editors in grid components exactly as needed for complex user input scenarios.
</div>

#### Example - customize the popup editor

    <script id="popup-editor" type="text/x-kendo-template">
      <h3>Edit Person</h3>
      <p>
        <label>Name:<input id="nameInput" name="name" /></label>
      </p>
      <p>
        <label>Age: <input data-role="numerictextbox" name="age" /></label>
      </p>
    </script>
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      editable: {
        mode: "popup",
        template: kendo.template($("#popup-editor").html())
      },
      edit: function (e) {
          //initialize Kendo UI TextBox for the name input
          $("#nameInput").kendoTextBox();
        }
    });
    </script>

#### Example - using MVVM in the popup editor template

    <script id="popup-editor" type="text/x-kendo-template">
      <h3>Edit Person</h3>
      <p>
        <label>Name:<input data-bind="value:name" /></label>
      </p>
      <p>
        <label>Age:<input data-role="numerictextbox" data-bind="value:age" /></label>
      </p>
    </script>
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      editable: {
        mode: "popup",
        template: kendo.template($("#popup-editor").html())
      }
    });
    </script>

### editable.update `Boolean` *(default: true)*

If set to `true` the user can edit data items when editing is enabled.


<div class="meta-api-description">
Control whether existing data entries in a grid or table can be modified during editing sessions, enabling or disabling user edits for rows, cells, or popup forms. Configure update permissions to allow saving changes, prevent overwriting data, toggle editable states dynamically, enforce read-only or write access, manage interaction workflows for inline or popup editing modes, set flags to accept or reject updates, and handle scenarios where users need to adjust, revise, or correct current records within data grids or tabular interfaces.
</div>

#### Example - enable only deleting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      editable: {
        mode: "incell",
        update: false
      }
    });
    </script>

### editable.readonly `Boolean` *(default: false)*

If set to `true` the Grid will be initialized in read only mode. Users won't be able to add, remove or update records. Clicking on the edit, delete or add buttons will have no effect. In `incell` mode, clicking on the cell will not open it for editing.

API methods are not affected by this configuration. Calling `editRow` and `editCell` will still put the cell/row in edit mode. Calling `addRow` and `removeRow` will add/remove the row.

This property is useful in combination with the `enableEditing` and `disableEditing` methods. You can initialize the Grid as read only and enable editing later on.


<div class="meta-api-description">
Configure the grid to disable all user-initiated modifications by setting it to read-only mode, preventing users from adding, deleting, or updating records through UI interactions such as edit, delete, or add buttons, and blocking in-cell editing on cell clicks; while user-driven edits are disabled, programmatic editing commands like editRow, editCell, addRow, and removeRow remain functional, enabling developers to control editing state dynamically through methods to enable or disable editing, enforce immutable views, lock grid data from direct manipulation, or implement controlled editing workflows.
</div>

#### Example - prevent the users from editing, removing and updating the data

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      editable: {
        mode: "incell",
        readonly: true
      }
    });
    </script>

### editable.window `Object`

Configures the Kendo UI Window instance, which is used when the Grid edit mode is `"popup"`. The configuration is optional.

For more information, please refer to the [Window configuration API](/api/javascript/ui/window).


<div class="meta-api-description">
Customize popup editor behavior in a data grid by configuring window settings such as title, modal state, size dimensions, position on screen, animation style, resizability, container attachment, and available actions when using popup editing mode. Control how edit dialogs appear and behave including modal popups, draggable or resizable windows, and custom placement or animation effects. Set options to tailor the editable window experience to user interface requirements, enabling control over popup editor configuration, appearance, and interaction parameters within grid editing scenarios. Adjust window features dynamically to enhance or restrict editing dialogs launched in popup mode.
</div>

#### Example - Grid popup Window configuration

    <div id="grid"></div>
    <script>

      function myOpenEventHandler(e) {
        var confirm =   window.confirm('Do you want to edit this record?');
        if(!confirm){
          e.preventDefault()
        }
      }

      var dataSource = new kendo.data.DataSource({
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      });

      $("#grid").kendoGrid({
        columns:['name','age', {command:'edit'}],
        dataSource:dataSource,
        editable: {
          mode: "popup",
          window: {
            title: "My Custom Title",
            animation: false,
            open: myOpenEventHandler
          }
        }
      });
    </script>

### encodeTitles `Boolean` *(default: false)*

If set to `true` the column title will be HTML-encoded before it is displayed. If set to `false` the column title will be displayed as is.


<div class="meta-api-description">
Configure the handling of column header text to either convert and display content as plain text by encoding HTML entities to prevent HTML tags from rendering or to allow raw HTML code within headers to be rendered and interpreted directly, enabling customization of title appearance using embedded HTML, controlling whether column titles are safely encoded to avoid injection risks or rendered with active HTML formatting for advanced styling, switching between escaping HTML characters and rendering them as actual markup in grid headers, adjusting the display mode of header text to either show literal HTML markup or processed HTML elements.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName", title: "<b>Product Name</b>" },
        { field: "category", title: "<i>Category</i>" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      encodeTitles: true // HTML in titles will be encoded and displayed as text
    });
    </script>

### excel `Object`

Configures the Kendo UI Grid Excel export settings.


<div class="meta-api-description">
Control and customize exporting data grids to Excel files, including setting the exported file name, choosing whether to export all data, only the current page, or selected rows, and managing large file handling through proxy or server settings. Configure workbook and sheet options, control which columns and filtered data are included, enable exporting with server-side proxy support, and adjust export scope and behavior to fit different use cases for Excel file generation from grid data.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" },
        { field: "unitPrice" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages", unitPrice: 2.5 },
        { productName: "Coffee", category: "Beverages", unitPrice: 3.0 }
      ],
      toolbar: ["excel"],
      excel: {
        fileName: "ProductData.xlsx",
        allPages: true,
        filterable: true
      }
    });
    </script>

### excel.allPages `Boolean` *(default: false)*

If set to `true` the grid will export all pages of data. By default the grid exports only the current page.

> If the grid is bound to remote data and `allPages` is set to `true` it will request **all** data items from the remote service. Be careful if you have a lot of data.


<div class="meta-api-description">
Control exporting of entire datasets to Excel, including all pages of grid data rather than just the visible or current page; this setting enables exporting full collections whether data is local or fetched from remote endpoints, supporting scenarios where users want to export complete records instead of partial views, configure bulk data export, enable full dataset downloads, handle multi-page data exports, and manage exporting large or paginated grid content seamlessly to Excel files.
</div>

#### Example - export all pages of data

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["excel"],
        excel: {
            allPages: true
        },
        dataSource: {
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/products"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### excel.fileName `String` *(default: "Export.xlsx")*

Specifies the file name of the exported Excel file. Must end with ".xlsx".


<div class="meta-api-description">
Set or customize the default filename for Excel exports, control the downloaded spreadsheet name, specify or change the export file title for grid data, define the output file name when saving or exporting to XLSX format, enable naming of exported Excel files to organize or identify reports, adjust the spreadsheet filename for export tasks, configure the download file label for grid data extraction, and manage how exported Excel documents are named by setting a desired .xlsx filename.
</div>

#### Example - set the default Excel file name

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["excel"],
        excel: {
            fileName: "Products.xlsx"
        },
        dataSource: {
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/products"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### excel.filterable `Boolean` *(default: false)*

Enables or disables column filtering in the Excel file. When set to true the exported Excel file comes with turned on filtering for the column headers. Not to be mistaken with the grid filtering feature.


<div class="meta-api-description">
Enable or disable filtering options in Excel exports from a data grid by configuring whether column header filters appear in the exported spreadsheet. Control the presence of interactive Excel filter dropdowns in exported .xlsx files to allow users to sort or filter data post-export. Manage how export-generated Excel files include or exclude built-in filtering capabilities on columns, separate from runtime grid filtering features. Set preferences to incorporate or omit Excel native filter controls on headers in exported workbooks, supporting customized Excel export output behavior for grids with tabular data. Adjust Excel export settings to embed or remove automatic column filter dropdowns so that exported spreadsheets enable or restrict data filtering once opened in Excel.
</div>

#### Example - enable filtering in the output Excel file

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["excel"],
        excel: {
            filterable: false
        },
        dataSource: {
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/products"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### excel.collapsible `Boolean` *(default: false)*

Enables or disables collapsible (grouped) rows, for grids with aggregates.


<div class="meta-api-description">
Control whether grouped rows with aggregates in exported Excel files from grid data can be expanded or collapsed, enabling or disabling hierarchical group structures in the Excel output, managing how grouped data with summaries or totals appear with expandable or collapsible sections, configuring the export to create interactive group outlines in spreadsheets, setting up Excel exports to preserve or remove collapsible group row functionality, handling export options for grouped grids to produce collapsible aggregates and hierarchies in the resulting Excel document, toggling expandable grouping behavior during data export to Excel formats, adjusting how grouped data and aggregate summaries are represented with collapsible outlines or flat structures in exported files.
</div>

#### Example - enable collapsible rows in the output Excel file

    <div id="grid"></div>
    <script>
     $("#grid").kendoGrid({
       toolbar: ["excel"],
       excel: {
         fileName: "excel-collapsible.xlsx",
         proxyURL: "https://demos.telerik.com/service/v2/core/export",
         filterable: true,
         collapsible: true
       },
       dataSource: {
         transport: {
           read: "https://demos.telerik.com/service/v2/core/Products"
         },
         schema:{
           model: {
             fields: {
               UnitsInStock: { type: "number" },
               ProductName: { type: "string" },
               UnitPrice: { type: "number" },
               UnitsOnOrder: { type: "number" },
               UnitsInStock: { type: "number" }
             }
           }
         },
         pageSize: 50,
         group: {
           field: "UnitsInStock", aggregates: [
             { field: "ProductName", aggregate: "count" },
             { field: "UnitPrice", aggregate: "sum"},
             { field: "UnitsOnOrder", aggregate: "average" },
             { field: "UnitsInStock", aggregate: "count" }
           ]
         },
         aggregate: [
           { field: "ProductName", aggregate: "count" },
           { field: "UnitPrice", aggregate: "sum" },
           { field: "UnitsOnOrder", aggregate: "average" },
           { field: "UnitsInStock", aggregate: "min" },
           { field: "UnitsInStock", aggregate: "max" }
         ]
       },
       sortable: true,
       pageable: true,
       groupable: true,
       filterable: true,
       columnMenu: true,
       reorderable: true,
       resizable: true,
       columns: [
         { field: "ProductName", title: "Product Name", aggregates: ["count"], footerTemplate: ({ ProductName }) => `Total Count: ${ProductName.count}`, groupFooterTemplate: ({ ProductName }) => `Count: ${ProductName.count}` },
         { field: "UnitPrice", title: "Unit Price", aggregates: ["sum"] },
         { field: "UnitsOnOrder", title: "Units On Order", aggregates: ["average"], footerTemplate: ({ UnitsOnOrder }) => `Average: ${UnitsOnOrder.average}`,
           groupFooterTemplate: ({ UnitsOnOrder }) => `Average: ${UnitsOnOrder.average}` },
         { field: "UnitsInStock", title: "Units In Stock", aggregates: ["min", "max", "count"], footerTemplate: ({ UnitsInStock }) => `Min: ${UnitsInStock.min} Max: ${UnitsInStock.max}`,
           groupHeaderTemplate: "Units In Stock: ${UnitsInStock.group.value} (Count: ${UnitsInStock.count})" }
       ]
     });
    </script>

### excel.forceProxy `Boolean` *(default: false)*
If set to true, the content will be forwarded to [proxyURL](excel.proxyurl) even if the browser supports saving files locally.


<div class="meta-api-description">
Control whether Excel exports from data grids are routed through a server-side proxy or downloaded directly by the browser, enabling configuration to force file exports through a proxy URL for environments requiring server mediation, bypassing local downloads to ensure compliance with network policies, firewalls, or centralized logging; toggle between enabling direct client-side saving of Excel files when supported by browsers and enforcing server-side forwarding of generated export content for consistent delivery, security constraints, or cross-origin handling, allowing developers to set export behaviors for Excel file generation, download management, proxy routing, and client versus server file handling preferences.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      toolbar: ["excel"],
      excel: {
        forceProxy: true,
        proxyURL: "/save"
      }
    });
    </script>

### excel.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user.

A proxy will be used when the browser isn't capable of saving files locally.
Such browsers are IE version 9 and lower and Safari.

The developer is responsible for implementing the server-side proxy.

The proxy will receive a POST request with the following parameters in the request body:

* contentType: The MIME type of the file
* base64: The base-64 encoded file content
* fileName: The file name, as requested by the caller.

The proxy should return the decoded file with the "Content-Disposition" header set to
`attachment; filename="<fileName.xslx>"`.


<div class="meta-api-description">
Configure a server-side proxy URL to enable seamless download of exported Excel files in browsers that lack native file-saving capabilities like Internet Explorer 9 and earlier versions, as well as Safari. This proxy endpoint handles POST requests containing file metadata such as MIME type, base64-encoded Excel content, and desired file name, ensuring streamed file delivery with proper content disposition headers for attachment downloads. Ideal for scenarios requiring workaround setups to support legacy or restrictive browser environments, facilitating controlled export delivery, remote file streaming, and enabling downloads where direct client-side saving is unsupported or blocked.
</div>

#### Example - set the server proxy URL

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["excel"],
        excel: {
            proxyURL: "/save"
        },
        dataSource: {
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/products"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### filterable `Boolean|Object` *(default: false)*

If set to `true` the user can filter the data source using the grid filter menu. Filtering is disabled by default.

Can be set to a JavaScript object which represents the filter menu configuration.


<div class="meta-api-description">
Control interactive data filtering in tabular interfaces by enabling or configuring column filter menus that let users dynamically search, narrow down, or customize visible grid data through filter options, search boxes, or dropdowns; set simple on/off flags or provide detailed settings to tailor filtering behavior, criteria, and UI elements, supporting use cases like live search, multi-column filtering, data refinement, and personalized data views within grid components.
</div>

#### Example - enable filtering

        <div id="grid"></div>
        <script>
            $("#grid").kendoGrid({
              columns: [
                  { field: "name" },
                  { field: "age" }
              ],
              filterable: true,
              dataSource: {
               data: [
                { id: 1, name: "Jane Doe", age: 30 },
                { id: 2, name: "John Doe", age: 33 }
               ],
               schema:{
                model: {
                 id: "id",
                 fields: {
                   age: { type: "number"}
                 }
                }
               }
              }
          });
        </script>

### filterable.extra `Boolean` *(default: true)*

If set to `true` the filter menu allows the user to input a second criterion.


<div class="meta-api-description">
Configure advanced filtering capabilities to allow compound or multi-criteria conditions within the Grid filter menu, enabling users to set multiple filters simultaneously, combine different filter rules, apply additional criteria for more precise data queries, and create complex filter expressions with logical operators, enhancing the ability to refine and narrow down displayed results by layering filters or using secondary filtering options.
</div>

#### Example - disable the extra filtering criteria

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      filterable: {
        extra: false
      },
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      }
    });
    </script>

### filterable.messages `Object`

The text messages displayed in the filter menu. Use it to customize or localize the filter menu messages.


<div class="meta-api-description">
Customize, localize, translate, or configure the filtering menu labels and messages displayed in a data grid or table interface, enabling support for multiple languages, tailoring filter prompts, input placeholders, button text, and informational messages shown during filter operations. Adjust or override default filter dialog text, headings, or user interface elements related to column filtering, search filters, conditional filters, or advanced filtering options to provide a tailored user experience that matches specific localization, internationalization, or UI customization requirements. Enable developers to set custom strings, translations, or localized vocabulary for filter menus, making filter functionality more accessible and contextually relevant across diverse user bases and language settings.
</div>

#### Example - customize filter menu messages

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      filterable: {
        messages: {
          and: "and",
          or: "or",
          filter: "Apply filter",
          clear: "Clear filter"
        }
      }
    });
    </script>

### filterable.messages.and `String` *(default: "And")*

The text of the option which represents the "and" logical operation.


<div class="meta-api-description">
Customize and configure the text label for the logical "and" operator in grid filter interfaces, enabling localization, internationalization, and user interface adjustments for filter conditions that combine multiple criteria conjunctively. Control the displayed conjunction wording within filter menus, search boxes, and conditional expressions to match language preferences, regional formats, or application-specific terminology when users apply multiple filters simultaneously using an "and" condition.
</div>

#### Example - set the "and" message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      filterable: {
        messages: {
          and: "and"
        }
      }
    });
    </script>

### filterable.messages.buttonTitle `String` *(default: "{0} filter column settings")*

The title of the button that displays the FilterMenu.

> The {0} argument represents the field name


<div class="meta-api-description">
Set or customize the label, title, or tooltip text displayed on the filter menu or filter button of a data grid or table, enabling localization, renaming, or tailoring of the button text that opens the filter options for a specific column or field. Control the visible text that helps users identify filtering actions, including dynamic placeholders like field names, to improve user interface clarity and adapt to different languages or naming conventions in grid filter menus or controls. Adjust the filtering button's caption, prompt, or accessibility label to match custom UI requirements or internationalization needs in interactive data grids.
</div>

#### Example - set the "buttonTitle" message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            { text: "Beverages", value: 1 },
            { text: "Food", value: 2 },
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      filterable: {
        messages: {
          buttonTitle: "{0} Filter Menu"
        }
      }
    });
    </script>

### filterable.messages.clear `String` *(default: "Clear")*

The text of the button which clears the filter.


<div class="meta-api-description">
Customize or configure the text label for the clear button in grid filtering interfaces, allowing localization and personalization of the filter reset or clear action button text, enabling users to set, change, translate, or control the wording that appears when clearing applied filters in data grids, tables, or lists, thus supporting multilingual or custom UI requirements for filter clearing controls.
</div>

#### Example - set the "clear" message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      filterable: {
        messages: {
          clear: "Clear filter"
        }
      }
    });
    </script>

### filterable.messages.filter `String` *(default: "Filter")*

The text of the button which applies the filter.


<div class="meta-api-description">
Customize or localize the text displayed on the apply button within the grid's filtering interface, enabling developers to set, configure, or change the filter button label for different languages, user interfaces, or accessibility needs. Adjust the filter apply button caption, modify the action text during data filtering, control the display text for filter confirmation, and ensure the filtering UI matches the desired wording or translations across diverse applications.
</div>

#### Example - set the "filter" message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      filterable: {
        messages: {
          filter: "Apply filter"
        }
      }
    });
    </script>

### filterable.messages.info `String` *(default: "Show items with value that: ")*

The text of the information message on the top of the filter menu.


<div class="meta-api-description">
Control the informational or helper text displayed at the top of the data grid’s filter menu to provide user guidance, customize prompts, set instructional messages, enable tailored filter hints, configure descriptive text for filtering choices, and adjust filter menu info labels to enhance user understanding when applying filters or search criteria within tabular data interfaces.
</div>

#### Example - set the "info" message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      filterable: {
        messages: {
          info: "Filter by: "
        }
      }
    });
    </script>

### filterable.messages.title `String` *(default: "Show items with value that: ")*

The text rendered for the title attribute of the filter menu form.


<div class="meta-api-description">
Configure customizable localized title text for the data grid’s filter menu input or form field, enabling setting, controlling, or modifying the tooltip or accessibility label that appears when users interact with filtering options, filter dialog headers, or filter UI components, supporting multiple languages and enhancing user experience by providing context-sensitive, translatable labels for filter prompts or filter input descriptions in data tables and grid interfaces.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" },
        { field: "unitPrice" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages", unitPrice: 2.5 },
        { productName: "Coffee", category: "Beverages", unitPrice: 3.0 }
      ],
      filterable: {
        messages: {
          title: "Filter items where value:"
        }
      }
    });
    </script>

### filterable.messages.isFalse `String` *(default: "is false")*

The text of the radio button for `false` values. Displayed when filtering `Boolean` fields.


<div class="meta-api-description">
Customize or configure the label, text, or caption for false Boolean filter options in data grids or tables, including setting or changing the wording shown next to radio buttons or filter selectors when filtering by false values, enabling clear indication or user-friendly display for false conditions, toggling or controlling filter UI text for false states, and adjusting how false filter choices are presented in grid filtering interfaces.
</div>

#### Example - set the "isFalse" message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "active" }
      ],
      dataSource: {
        data: [
          { active: true },
          { active: false }
        ],
        schema: {
          model: {
            fields: {
              active: { type: "boolean" }
            }
          }
        }
      },
      filterable: {
        messages: {
          isFalse: "False"
        }
      }
    });
    </script>

### filterable.messages.isTrue `String` *(default: "is true")*

The text of the radio button for `true` values. Displayed when filtering `Boolean` fields.


<div class="meta-api-description">
Customize or configure the text labels for Boolean filter options in data grids, specifically for the true value in checkbox or radio button filters, enabling clear, user-friendly display of true/false choices when filtering Boolean columns, controlling filter option wording, setting filter selection prompts, and adapting the visible text for Boolean true state filters in grid interfaces.
</div>

#### Example - set the "isTrue" message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "active" }
      ],
      dataSource: {
        data: [
          { active: true },
          { active: false }
        ],
        schema: {
          model: {
            fields: {
              active: { type: "boolean" }
            }
          }
        }
      },
      filterable: {
        messages: {
          isTrue: "True"
        }
      }
    });
    </script>

### filterable.messages.or `String` *(default: "Or")*

The text of the option which represents the "or" logical operation.


<div class="meta-api-description">
Customize or configure the text label for the filter’s logical OR condition in a data grid or table, enabling control over how the alternative filtering option is displayed, translated, or localized for different languages and user interfaces, supporting customization of filter operators, user prompts, filter logic labels, and UI text for OR-based multiple condition filters in grid components or data tables.
</div>

#### Example - set the "or" message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
       data: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
       ],
       schema:{
        model: {
         id: "id",
         fields: {
           age: { type: "number"}
         }
        }
       }
      },
      filterable: {
        messages: {
          or: "or"
        }
      }
    });
    </script>

### filterable.messages.search `String` *(default: "Search")*

The placeholder of the search input for columns with the [search](columns.filterable.search) option set to true.


<div class="meta-api-description">
Customize or configure the placeholder text, hint text, or input prompt displayed inside the search box used for filtering grid columns when search filtering is enabled, set or change the default search input placeholder for column filters, modify the text that appears in the search field within grid filter menus, control or update the search input’s placeholder for column-specific filter searches, define or localize the placeholder prompt text shown in searchable filter inputs within grid columns.
</div>

#### Example - set the "search" message

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          {
            field: "category",
            filterable: {
              multi: true,
              search: true
            }
          }
        ],
        dataSource: [
          { category: "Foo" },
          { category: "Boo" }
        ],
        filterable: {
          messages: {
            search: "Search category"
          }
        }
      });
    </script>

### filterable.messages.selectValue `String` *(default: "-Select value-")*

The text of the DropDownList displayed in the filter menu for columns whose [values](columns.values) option is set.


<div class="meta-api-description">
Configure or customize the placeholder text shown in dropdown filter menus within data grids, enabling localization and language-specific adaptations for filter dropdown prompts, select value placeholders, filter input hints, or default display text when filtering columns with predefined options, allowing control over user-facing messages in grid filtering dropdowns to improve usability and match regional or application-specific language preferences.
</div>

#### Example - set the "selectValue" message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            { text: "Beverages", value: 1 },
            { text: "Food", value: 2 },
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      filterable: {
        messages: {
          selectValue: "Select category"
        }
      }
    });
    </script>

### filterable.messages.selectedItemsFormat `String` *(default: "{0} items selected")*

The format string for selected items count in filter menu when [search](columns.filterable.multi) option set to true.


<div class="meta-api-description">
Customize the text format that displays the number of selected filter items in a grid’s filter menu when multi-selection is enabled, enabling control over how chosen filter counts appear in user interfaces, modify the message template for selected filter entries to communicate selections clearly during multi-filter operations, set or configure the wording and numeric representation of active filter selections in grids with multi-select filtering capabilities, tailor the feedback string that summarizes selected filter options for enhanced clarity in dynamic filtering contexts where multiple filters are applied simultaneously.
</div>

#### Example - set the "selectedItemsFormat" text

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          {
            field: "category",
            filterable: {
              multi: true,
              search: true
            }
          }
        ],
        dataSource: [
          { category: "Foo" },
          { category: "Boo" }
        ],
        filterable: {
          messages: {
            selectedItemsFormat: "There are {0} selected items"
          }
        }
      });
    </script>

### filterable.messages.operator `String` *(default: "Operator")*

The text displayed in the tooltip of the operator item in filter menu.


<div class="meta-api-description">
Customize or configure the tooltip text, hint, or help message that appears for filter operators in a grid or data table's filter menu, enabling control over filter option descriptions, operator labels, and contextual guidance shown when hovering or selecting filter logic such as equals, contains, greater than, or less than; tailor filtering tooltips to improve user interface clarity, enhance filter menu usability, and provide specific operator instructions or descriptions in searchable data grids or tables.
</div>

#### Example - set the text of operator item

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            { text: "Beverages", value: 1 },
            { text: "Food", value: 2 },
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      mobile: "phone",
      height: 550,
      filterable: {
        messages: {
          operator: "Choose operator"
        }
      }
    });
    </script>

### filterable.messages.additionalOperator `String` *(default: "Additional operator")*

The text displayed in the tooltip of the additional operator item in filter menu.


<div class="meta-api-description">
Customize, modify, or set the tooltip text, hint, label, or description for extra filter options, additional filter operators, or supplementary conditions in grid or table filtering menus to improve user guidance, interface clarity, and help messages for filtering controls or advanced filter settings.
</div>

#### Example - set the text of operator item

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            { text: "Beverages", value: 1 },
            { text: "Food", value: 2 },
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      mobile: "phone",
      height: 550,
      filterable: {
        messages: {
          additionalOperator: "Choose operator"
        }
      }
    });
    </script>

### filterable.messages.value `String` *(default: "Value")*

The text displayed in the tooltip of the value item in filter menu.


<div class="meta-api-description">
Adjust or set the tooltip text that appears for filter input values within grid filter menus, configure custom messages or hints for filter criteria entries, control the display text that guides users when entering filter values, enable personalized tooltip content for filter value fields, modify the helper text shown in filtering interfaces, customize the descriptive text shown on value inputs in grid filtering controls, tailor the prompt or informational text associated with filter value selectors, specify or override default tooltip messages for filter value areas, enhance user guidance in grid filtering by changing value field tooltips, and manage the informational overlay text presented for filtering value inputs.
</div>

#### Example - set the text of value item

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            { text: "Beverages", value: 1 },
            { text: "Food", value: 2 },
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      mobile: "phone",
      height: 550,
      filterable: {
        messages: {
          value: "Choose value"
        }
      }
    });
    </script>

### filterable.messages.additionalValue `String` *(default: "Additional value")*

The text displayed in the tooltip of the additional value item in filter menu.


<div class="meta-api-description">
Configure or customize the tooltip text that appears for secondary or extra filter criteria in data grid filter menus, enabling control over the descriptive label shown when multiple filter values are applied or selected, and allowing you to set or change the hover text for additional filter conditions in grid interfaces to improve clarity and user understanding of complex filtering options.
</div>

#### Example - set the text of value item

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            { text: "Beverages", value: 1 },
            { text: "Food", value: 2 },
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      mobile: "phone",
      height: 550,
      filterable: {
        messages: {
          additionalValue: "Choose value"
        }
      }
    });
    </script>

### filterable.messages.logic `String` *(default: "Logic")*

The text displayed in the tooltip of the logic item in filter menu.


<div class="meta-api-description">
Customize or configure the tooltip text, hint, or help message displayed for the logic or operator option within filter menus of grid components, enabling clear guidance on filter logic choices such as "and," "or," or other conditional operators used in advanced filtering setups, filter conditions, or query builders in data grids or tables.
</div>

#### Example - set the text of value item

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            { text: "Beverages", value: 1 },
            { text: "Food", value: 2 },
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      filterable: {
        messages: {
          logic: "Choose logic"
        }
      }
    });
    </script>

### filterable.messages.checkAll `String` *(default :"Select All")*

The label used for the check-all checkbox.


<div class="meta-api-description">
Customize or set the text label for the select-all or check-all checkbox within the filtering options of a data grid, enabling control over the display language, localization, or terminology of the checkbox that toggles all filter selections; adjust or configure the label shown in multi-select filter menus to better match user interface language preferences or accessibility needs.
</div>

#### Example - change the checkAll default message.

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [{
            field: "country",
            filterable: {
                multi:true,
                messages: {
                    checkAll: "Do select all"
                },
                itemTemplate: function(e) {
                    return ({ country, all }) => `<span><label><span>${country || all}</span><input type='checkbox' name='" + e.field + "' value='${country}'/></label></span>`
                }
            }
        }],
        filterable: true,
        dataSource: [ { country: "BG" }, { country: "USA" } ]
      });
    </script>

### filterable.mode `String` *(default: "menu")*

If set to `row` the user would be able to filter via extra row added below the headers. By default filtering is using the `menu` mode.

Can also be set to the following string values:

- "row" - the user can filter via extra row within the header.
- "menu" - the user can filter via the menu after clicking the filter icon.
- "menu, row" - the user can filter with both modes above enabled.

> When the `filterable.mode` property is set to `"row"` or `"menu, row"`, the Grid dataSource instance is copied and applied to the Kendo UI AutoComplete widgets used for string filtering.
This will cause one additional read request per string column. The AutoComplete dataSources do not perform paging and will use a collection of the unique column values only.


<div class="meta-api-description">
Configure how users apply filters to grid columns by enabling filtering through a filter row beneath headers, a filter menu accessed via icons, or both combined, allowing flexible data refinement, column search, or value filtering. Adjust filtering UI modes to set column-level filtering either inline with a dedicated filter row, within a dropdown menu filter interface, or mixed mode supporting both approaches for enhanced control over data narrowing and search operations. This includes activating interactive filter rows for direct input, filter menus for contextual filter options, or simultaneous use of row and menu filters for comprehensive filtering experiences. Enable column filtering that supports string matching, unique value listing, and seamless filter toggling tailored to different grid usage scenarios and user preferences without explicit paging. Optimize user-driven data queries, advanced filter configurations, and dynamic filtering interfaces to refine datasets effectively by column values, search terms, or custom filter criteria.
</div>

#### Example - set mode option to use both "menu" and "row" modes simultaneously

        <div id="grid"></div>
        <script>
            $("#grid").kendoGrid({
              columns: [
                  { field: "name" },
                  { field: "age" }
              ],
              filterable: {
                  mode: "menu, row"
              },
              dataSource: {
               data: [
                { id: 1, name: "Jane Doe", age: 30 },
                { id: 2, name: "John Doe", age: 33 }
               ],
               schema:{
                model: {
                 id: "id",
                 fields: {
                   age: { type: "number"}
                 }
                }
               }
              }
          });
        </script>

### filterable.operators `Object`

The text of the filter operators displayed in the filter menu.

> * If `operators` are defined manually, the default messages will be overridden too. To control the `operators` and still use the default messages, retrieve them from the `FilterCell` prototype - `kendo.ui.FilterCell.fn.options.operators.{type}`, where the type can be `"string"`, `"date"`, `"number"`, and `"enums"`.
> * If the same options are specific to a column, it is possible to use the [column filterable configuration of the Grid](/api/javascript/ui/grid/configuration/columns.filterable.operators).
> * In multiple Grids, it is possible to override the filterable options of the Kendo UI FilterMenu before the Grids are initialized. Then the new filter options will be available for all Grids without further configurations.


<div class="meta-api-description">
Configure, customize, or localize the filter operator labels shown in grid filter menus by setting text for string, date, number, or enum operators, override default filter operator names, provide custom operators, control operator display per grid or per column, alter global filter operator settings for multiple grids, replace or extend default filter options, and manage filter operator labels for user-friendly, localized, or application-specific filtering experiences across different grid implementations.
</div>

#### Example - override the filterable options in multiple Grids

     <h4>Grid One</h4>
     <div id="gridOne"></div>
     <h4>Grid Two</h4>
     <div id="gridTwo"></div>

     <script>
         kendo.ui.FilterMenu.fn.options.operators.string = {
           eq: "Equal to",
           neq: "Not equal to"
         };

         $("#gridOne").kendoGrid({
           columns: [
             { field: "name" },
             { field: "age" }
           ],
           dataSource: {
             data: [
               { id: 1, name: "Jane Doe", age: 30 },
               { id: 2, name: "John Doe", age: 33 }
             ],
             schema: {
               model: {
                 id: "id",
                 fields: {
                   name: { type: "string" },
                   age: { type: "number" }
                 }
               }
             }
           },
           filterable: {
             extra: false
           }
         });

         $("#gridTwo").kendoGrid({
           columns: [
             { field: "name" },
             { field: "age" }
           ],
           dataSource: {
             data: [
               { id: 1, name: "Jane Doe", age: 30 },
               { id: 2, name: "John Doe", age: 33 }
             ],
             schema: {
               model: {
                 id: "id",
                 fields: {
                   name: { type: "string" },
                   age: { type: "number" }
                 }
               }
             }
           },
           filterable: {
             extra: false
           }
         });
       </script>

### filterable.operators.string `Object`

The texts of the filter operators displayed for columns bound to string fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.


<div class="meta-api-description">
Customize, configure, or control the text labels for string filter operators in grid columns, including renaming, localizing, enabling, disabling, or hiding specific filter choices for string field filters; manage how filter operators appear in dropdown menus, tailor the available string filtering options, set which operators show or are removed, and adjust the user interface for filtering string data to match custom search terms, queries, or localization needs in data grids.
</div>

#### Example - set string operators

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            eq: "Equal to",
            neq: "Not equal to"
          }
        }
      }
    });
    </script>

In this example only two operators would be displayed in the DropDownList - "Equal to" and "Not equal to".

### filterable.operators.string.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.


<div class="meta-api-description">
Configure or customize the exact match filter label for string values in grids, enabling control over the text shown for equality filtering, setting or changing the case-sensitive or case-insensitive string comparison operator display, renaming or localizing the equals operator used in text filters, adjusting the filter’s equality condition wording for strings, modifying how exact string matches are represented in filter options, and tailoring the equality filter label to better describe precise string matching in user interfaces or data tables.
</div>

#### Example - set the string "equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            eq: "Equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.string.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.


<div class="meta-api-description">
Set or customize the text label for the "not equal" string comparison operator used in grid filtering interfaces, enabling developers to modify, localize, or personalize the wording shown in filter menus, filter rows, and filter dialogs. Control the display of the not equal operator’s name as part of string filter options to match custom language preferences, alternate terminologies, or UI design requirements in data grid filtering features. Adjust, configure, or translate the label representing string inequality comparisons in filtering controls to improve clarity, accessibility, or user experience across various contexts where "not equal" string filtering is needed.
</div>

#### Example - set the string "not equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            neq: "Not equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.string.isnull `String` *(default: "Is null")*

The text of the "isnull" filter operator.


<div class="meta-api-description">
Customize, configure, or set the label text displayed for string filters that check for null or empty values, control how "is null" or "is empty" options appear in filter dropdowns for text columns, modify the wording for string filter operators that identify missing, undefined, or blank string data, enable precise labeling for string filtering conditions detecting null states, and adjust user interface text related to string filter options testing for the absence of values or null strings in grid or data table components.
</div>

#### Example - set the string "isnull" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            isnull: "Null"
          }
        }
      }
    });
    </script>

### filterable.operators.string.isnotnull `String` *(default: "Is not null")*

The text of the "isnotnull" filter operator.


<div class="meta-api-description">
Configure or customize the label text displayed for the "is not null" string filter operator in data grids to localize or personalize the filter option that checks for non-empty, non-null string values, enabling control over filter UI text for string fields where you want to filter out null or empty entries in grid columns.
</div>

#### Example - set the string "isnotnull" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            isnotnull: "Not null"
          }
        }
      }
    });
    </script>

### filterable.operators.string.isempty `String` *(default: "Is empty")*

The text of the "isempty" filter operator.


<div class="meta-api-description">
Customize or set the display text for the string filter operator that checks for empty values, blank strings, or missing text in a data grid or table filter. Control how the "isempty" condition appears in filter dropdowns or menus, enabling localization, translation, or tailored labels for users filtering string fields by empty, null, or zero-length inputs. Adjust the wording for string filters that detect empty entries, blank fields, or no content cases in grid filters to match various languages or custom UI requirements.
</div>

#### Example - set the string "isempty" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            isempty: "Empty"
          }
        }
      }
    });
    </script>

### filterable.operators.string.isnotempty `String` *(default: "Is not empty")*

The text of the "isnotempty" filter operator.


<div class="meta-api-description">
Configure or customize the label text displayed for the filter operator that matches non-empty string values in data grids, enabling control over how "is not empty" conditions are presented, named, or described in filtering UI components, search fields, or query builders when users want to filter out blank, null, or empty text entries within string columns.
</div>

#### Example - set the string "isnotempty" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            isnotempty: "Not empty"
          }
        }
      }
    });
    </script>

### filterable.operators.string.isnullorempty `String` *(default: "Has no value")*

The text of the "isnullorempty" filter operator.


<div class="meta-api-description">
Customize, configure, or set the label text, display name, or localized string for the filter operator that matches empty, null, or missing string values in grid filtering controls, enabling tailored UI wording for conditions checking whether text fields are either null, empty, or have no content in string-based data filtering scenarios.
</div>

#### Example - set the string "isnullorempty" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            isnullorempty: "No text"
          }
        }
      }
    });
    </script>

### filterable.operators.string.isnotnullorempty `String` *(default: "Has value")*

The text of the "isnotnullorempty" filter operator.


<div class="meta-api-description">
Customize, configure, or localize the display label for the string filter operator that matches values which are neither null nor empty, enabling control over how this operator appears in filter menus or grid interfaces, supporting scenarios where developers want to set, change, or translate the text shown for filtering non-null, non-empty string entries in data grids, tables, or UI components.
</div>

#### Example - set the string "isnotnullorempty" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            isnotnullorempty: "Has text"
          }
        }
      }
    });
    </script>

### filterable.operators.string.startswith `String` *(default: "Starts with")*

The text of the "starts with" filter operator.


<div class="meta-api-description">
Control and customize the text label for filtering string values that begin with a specified substring in a data grid, enabling localization, changing the displayed operator name, modifying the filter UI's "starts with" condition label, adjusting filter operator wording for internationalization, tailoring filter controls to match user language preferences, configuring how prefix matching filters are labeled and presented in grid filtering options, setting descriptive text for initial substring filtering, and adapting the filter operator terminology shown to users when filtering string columns by starting characters.
</div>

#### Example - set the string "starts with" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            startswith: "Starts"
          }
        }
      }
    });
    </script>

### filterable.operators.string.doesnotstartwith `String` *(default: "Does not start with")*

The text of the "does not start with" filter operator.


<div class="meta-api-description">
Customize, set, or configure the label text for the string filter operator that excludes entries starting with specified characters, enabling control over how users apply "does not start with" conditions in grid filtering, string matching, search criteria, or data queries that filter out items based on prefix exclusion or negative string patterns.
</div>

#### Example - set the string "does not start with" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            doesnotstartwith: "Does not start"
          }
        }
      }
    });
    </script>

### filterable.operators.string.contains `String` *(default: "Contains")*

The text of the "contains" filter operator.


<div class="meta-api-description">
Set or customize the display label text for the string filter operator that checks if a value contains a specified substring, enabling control over the terminology shown in filtering interfaces, such as replacing default "contains" wording with alternative phrasing for string matching, substring searches, keyword includes, text filtering, or partial matches in grid or table filter options.
</div>

#### Example - set the string "contains" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            contains: "Contains"
          }
        }
      }
    });
    </script>

### filterable.operators.string.doesnotcontain `String` *(default: "Does not contain")*

The text of the "does not contain" filter operator.


<div class="meta-api-description">
Configure or customize the label and display text for the filter option that excludes items containing specific substrings in a data grid or table filter interface, enabling users to set or change the wording for the "does not contain" filtering condition, control how the negation of substring matching is presented in search filters, and adjust the terminology used when filtering string values to find entries that do not include certain text sequences.
</div>

#### Example - set the string "does not contain" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            doesnotcontain: "Doesn't contain"
          }
        }
      }
    });
    </script>


### filterable.operators.string.endswith `String` *(default: "Ends with")*

The text of the "ends with" filter operator.


<div class="meta-api-description">
Customize, configure, or localize the text label for string filters that match values ending with specific substrings, control or set the display name for "ends with" conditions in filtering options, modify the operator label used for detecting strings that conclude with certain characters, adjust the language or wording of suffix-based string filter operators, enable tailored filtering expressions based on string endings within grid components.
</div>

#### Example - set the string "ends with" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            endswith: "Ends"
          }
        }
      }
    });
    </script>

### filterable.operators.string.doesnotendwith `String` *(default: "Does not end with")*

The text of the "does not end with" filter operator.


<div class="meta-api-description">
Customize or localize the text label, wording, or display of the string filter operator that checks if values do not end with a specific substring; configure, set, or override the ending exclusion filter description for string-based filtering options in grids or tables, enabling tailored language or alternative phrases for "does not end with" filters when filtering text data or columns.
</div>

#### Example - set the string "does not end with" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe" },
        { name: "John Doe" }
      ],
      filterable: {
        operators: {
          string: {
            doesnotendwith: "Does not end"
          }
        }
      }
    });
    </script>

### filterable.operators.number `Object`

The texts of the filter operators displayed for columns bound to number fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.


<div class="meta-api-description">
Customize, configure, or set the filter operator labels used for numeric or number-based columns in a data grid, including how to rename, modify, show, hide, or exclude specific comparison operators (such as equals, not equals, greater than, less than) within filter dropdowns or menus, enabling precise control over the filter options displayed for columns with numerical data, supporting scenarios where users want to tailor the filtering interface for numbers by changing, localizing, or restricting the available numeric operators in grid column filters.
</div>

#### Example - set number operators

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            eq: "Equal to",
            neq: "Not equal to"
          }
        }
      }
    });
    </script>

In this example only two operators would be displayed in the DropDownList - "Equal to" and "Not equal to".

### filterable.operators.number.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.


<div class="meta-api-description">
Set or customize the label and text displayed for the numeric filter operator that checks for equality in data grids, allowing developers to change, localize, rename, or configure the "equal to" condition for number-based filtering in grid filter menus, controlling how the equals operator appears in filtering UIs for numeric columns, including adjusting operator names, modifying filter labels, and tailoring numeric equality filter wording for better user clarity and localization support.
</div>

#### Example - set the number "equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            eq: "Equal to"
          }
        }
      }
    });
    </script>


### filterable.operators.number.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.


<div class="meta-api-description">
Control or customize the label, text, or display string for numeric filters that exclude values equal to a specified number, enabling configuration of "not equal to," "does not equal," "not matching," or "inequality" operators in grid filtering for numbers, decimals, integers, or numeric data types, often used to set or override the operator text shown in filter dropdowns, options, or UI components when filtering out specific numeric values.
</div>

#### Example - set the number "not equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            neq: "Not equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.number.isnull `String` *(default: "Is null")*

The text of the "isnull" filter operator.


<div class="meta-api-description">
Customize, configure, or set the localized label, display text, or language-specific wording for numeric filter options that check for empty, missing, null, or undefined number values in data grids, tables, or grids with filtering capabilities, enabling users to search, filter, or query numeric columns to detect null or absent entries using appropriate operator names, alternatives, or synonyms in their preferred language or locale.
</div>

#### Example - set the number "isnull" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            isnull: "Null"
          }
        }
      }
    });
    </script>

### filterable.operators.number.isnotnull `String` *(default: "Is not null")*

The text of the "isnotnull" filter operator.


<div class="meta-api-description">
Customize or configure the label, text, or display name for the numeric filter operator that checks for non-null or non-empty values in grids, tables, or data components. Enable or set the wording for filtering numbers where the value is present and not missing, blank, or null, allowing users to search, filter, or query datasets by conditions that exclude null or undefined numeric fields with localized or translated operator names. Adjust the text for the condition that matches numbers which are not null, undefined, or empty within filtering interfaces or data grids.
</div>

#### Example - set the number "isnotnull" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            isnotnull: "Not null"
          }
        }
      }
    });
    </script>

### filterable.operators.number.gte `String` *(default: "Is greater than or equal to")*

The text of the "greater than or equal" filter operator.


<div class="meta-api-description">
Customize the label, text, or wording for the numeric "greater than or equal to" filter operator in grid or data table filter interfaces, enabling developers to set, change, localize, translate, or modify how the "gte" comparison option appears in filtering menus, user interfaces, or query builders by configuring this property with custom strings during initialization or setup to control filter operator display, support internationalization, adapt terminology, or ensure consistent user experience across numeric filtering features.
</div>

#### Example - set the number "greater than or equal to" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            gte: "Greater than or equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.number.gt `String` *(default: "Is greater than")*

The text of the "greater than" filter operator.


<div class="meta-api-description">
Adjust or define the label text for numeric filters that check if values are greater than a specified number, enabling customization of the "greater than" comparison wording in grid filtering interfaces, including configuring, renaming, setting, or localizing the greater-than filter operator to match specific user language, UI design, or terminology preferences when applying numeric range queries or conditional number filters within a data grid.
</div>

#### Example - set the number "greater than" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            gt: "Greater than"
          }
        }
      }
    });
    </script>

### filterable.operators.number.lte `String` *(default: "Is less than or equal to")*

The text of the "less than or equal" filter operator.


<div class="meta-api-description">
Set, customize, or configure the numeric filter operator for "less than or equal to" conditions within grid filtering, enabling users to apply, modify, or control numeric range filters, thresholds, and comparison operators to display data meeting criteria where values are equal to or below a specified number, supporting queries for filtering numbers less than or equal, numeric filtering operators, and adjusting filter labels or text for user interface components.
</div>

#### Example - set the number "less than or equal to" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            lte: "Less than or equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.number.lt `String` *(default: "Is less than")*

The text of the "less than" filter operator.


<div class="meta-api-description">
Customize, localize, or configure the label text for the numeric "less than" filter operator in grid controls, enabling tailored display of comparison operators, setting alternative phrases or keywords for less-than comparisons, adjusting filter operator names for different languages or contexts, defining how "less than" numeric filters appear in filter menus, and controlling user-facing labels for filtering number fields with values below a specified threshold.
</div>

#### Example - set the number "less than" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            fields: {
              age: { type: "number" }
            }
          }
        }
      },
      filterable: {
        operators: {
          number: {
            lt: "Less than"
          }
        }
      }
    });
    </script>

### filterable.operators.date `Object`

The texts of the filter operators displayed for columns bound to date fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.


<div class="meta-api-description">
Set or customize the labels and text for filtering operators specifically for date fields in a grid, controlling which date comparison options like equals, before, after, or between appear in the filter dropdown; enable, modify, or remove specific date filter options to tailor the filtering experience for date columns, adjust filter operator names, change available date comparisons, and configure how date filters are presented and applied in data grids.
</div>

#### Example - set date operators

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            gt: "After",
            lt: "Before"
          }
        }
      }
    });
    </script>

In this example only two operators would be displayed in the DropDownList - "Equal to" and "Not equal to".

### filterable.operators.date.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.


<div class="meta-api-description">
Customize or localize the label for the date equality operator used in grid filtering, enabling control over the text shown when setting filters that match specific dates exactly; configure, override, rename, or translate the equal operator text for date filters to adapt filter menus, search interfaces, or UI elements that compare dates for equality, supporting scenarios where users want to filter data by an exact date match with personalized or localized operator wording.
</div>

#### Example - set the date "equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            eq: "Equal"
          }
        }
      }
    });
    </script>

### filterable.operators.date.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.


<div class="meta-api-description">
Configure or customize the "not equal to" date filter criteria, set exclusion conditions for dates, apply filters that omit specific date values, adjust date filtering operators to exclude particular dates, control date comparison logic to filter out non-matching dates, enable date filters that select all dates except a given one, specify alternative text or labels for date inequality filters, modify how date exclusion is represented in filtering interfaces, set parameters for date filters that identify non-equal values, and tailor user-facing text or behavior for filtering grid data with date values that do not match a target date.
</div>

#### Example - set the date "not equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            neq: "Not equal"
          }
        }
      }
    });
    </script>

### filterable.operators.date.isnull `String` *(default: "Is null")*

The text of the "isnull" filter operator.


<div class="meta-api-description">
Customize or localize the text label for date filter operators that check for null or missing date values in grid or table filtering systems, enabling control over how "is null" or empty date conditions appear in filter dropdowns, search UI, or query configurations to match different languages, regional formats, or user preferences when filtering by dates with absent or undefined entries in a dataset.
</div>

#### Example - set the date "isnull" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            isnull: "Null"
          }
        }
      }
    });
    </script>

### filterable.operators.date.isnotnull `String` *(default: "Is not null")*

The text of the "isnotnull" filter operator.


<div class="meta-api-description">
Customize, configure, or set the display text, label, or naming for date filter options that exclude null or empty values, focusing on conditions where dates are present, not missing, or defined within grid or table filtering controls; control how the "is not null" operator appears in date filters, enabling clear identification of records with valid, existing, or non-null date entries, supporting filtering queries, conditional logic, and UI adjustments for dates that must have a value rather than be empty or undefined.
</div>

#### Example - set the date "isnotnull" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            isnotnull: "Null"
          }
        }
      }
    });
    </script>

### filterable.operators.date.gte `String` *(default: "Is after or equal to")*

The text of the "greater than or equal" filter operator.


<div class="meta-api-description">
Customize, define, or change the label, text, or wording shown for the "greater than or equal to" filter operator when filtering date values in data grids or tables. Control how the filter option for dates with criteria like "on or after," "from this date onward," "date is greater than or equal," or "starting at" appears in user interfaces that support date comparisons, range filtering, and advanced query conditions. Enable localization, translation, or custom naming for this date comparison operator to improve clarity or match specific application terminology, improving search relevance for date filtering, conditional operators, data querying, and UI filtering controls in tabular or grid components.
</div>

#### Example - set the date "greater than or equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            gte: "After or equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.date.gt `String` *(default: "Is after")*

The text of the "greater than" filter operator.


<div class="meta-api-description">
Set or customize the label text for the "greater than" date filter operator in data grids, enabling localization, renaming, or overriding default filter menu labels related to date comparisons. Control how the filter operator for dates that are after a specified value is displayed in filtering UIs, configure language-specific or user-preferred text for date-based "greater than" conditions, and manage how date filters indicate items occurring later than a given date, supporting flexible, user-friendly date filtering options in grid components.
</div>

#### Example - set the date "greater than" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            gt: "After"
          }
        }
      }
    });
    </script>

### filterable.operators.date.lte `String` *(default: "Is before or equal to")*

The text of the "less than or equal" filter operator.


<div class="meta-api-description">
Customize or modify the label, text, or wording shown for the date filter operator that checks if a date value is less than or equal to a specified date, enabling control over how "less than or equal to" date comparisons appear in filtering interfaces, date range selection filters, or date comparison conditions within data grids, tables, or UI components that support filtering by dates with operators reflecting "on or before," "up to," "not after," or "earlier than or equal" semantics.
</div>

#### Example - set the date "less than or equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            lte: "Before or equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.date.lt `String` *(default: "Is before")*

The text of the "less than" filter operator.


<div class="meta-api-description">
Adjust, set, or customize the label, text, or wording displayed for the date-based filter option that matches values occurring before a specified date, including localization or language-specific changes for the "less than" condition in date filters, controlling how the date comparison operator for earlier dates appears in user interfaces or filtering menus.
</div>

#### Example - set the date "less than" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "date", format: "{0:yyyy-MM-dd}" }
      ],
      dataSource: {
        data: [
          { date: kendo.parseDate("2000-10-10") },
          { date: new Date() }
        ],
        schema: {
          model: {
            fields: {
              date: { type: "date" }
            }
          }
        }
      },
      filterable: {
        operators: {
          date: {
            lt: "Before"
          }
        }
      }
    });
    </script>


### filterable.operators.enums `Object`

The texts of the filter operators displayed for columns which have their [values](columns.values) option set.

> Omitting an operator will exclude it from the DropDownList with the available operators.


<div class="meta-api-description">
Control and customize the display text and labels for filtering options when filtering grid columns with predefined enumeration values, enabling you to set, modify, or exclude specific filter operators from the available dropdown choices. Configure which filter operators appear in the filter interface by mapping operator keys to custom names, adjusting textual representations for operators like equals, not equals, contains, or any other comparison types, and tailor the operator list to suit specific data filtering needs with precise control over visible selections in filter menus. This functionality supports filtering behavior customization, user interface text localization, and selective enabling or disabling of filter operations for enumerated or fixed-value column filters.
</div>

#### Example - set enum operators

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            {text: "Beverages", value: 1 },
            {text: "Food", value: 2 }
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      filterable: {
        operators: {
          enums: {
            eq: "Equal to",
            neq: "Not equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.enums.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.


<div class="meta-api-description">
Customize or configure the display label and localized text for the equality filter operator in data grids, tables, or filtering components to match different languages, cultures, or user preferences when users want to filter or search for exact matches, set filter conditions using "equals," or apply equality comparisons within grid filtering operations.
</div>

#### Example - set the enum "equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            {text: "Beverages", value: 1 },
            {text: "Food", value: 2 }
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      filterable: {
        operators: {
          enums: {
            eq: "Equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.enums.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.


<div class="meta-api-description">
Customize or configure the label, text, or display string for the "not equal" filter condition or operator in a data grid or table filter; control how the inequality filter option is shown when users select filtering criteria that excludes matching values; set or change the terminology or wording representing "not equal to" in filter dropdowns, filter menus, or filter operator lists for grids, tables, or data views to ensure clear understanding of the exclusion or difference condition during data filtering operations.
</div>

#### Example - set the enum "not equal" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            {text: "Beverages", value: 1 },
            {text: "Food", value: 2 }
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      filterable: {
        operators: {
          enums: {
            neq: "Not equal to"
          }
        }
      }
    });
    </script>

### filterable.operators.enums.isnull `String` *(default: "Is null")*

The text of the "isnull" filter operator.


<div class="meta-api-description">
Configure or customize the label, description, or display text for the "is null" filter option in data grids, tables, or sortable columns. Control how the system presents the "empty value," "null check," or "no data" filtering criteria in user interfaces, search filters, or query builders. Enable precise wording or localized strings for filtering entries that are missing, null, undefined, or blank, ensuring consistent presentation in grid filter operators related to detecting absent or missing values.
</div>

#### Example - set the enum "isnull" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            {text: "Beverages", value: 1 },
            {text: "Food", value: 2 }
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      filterable: {
        operators: {
          enums: {
            isnull: "Null"
          }
        }
      }
    });
    </script>

### filterable.operators.enums.isnotnull `String` *(default: "Is not null")*

The text of the "isnotnull" filter operator.


<div class="meta-api-description">
Customize and localize the label or text shown for the "is not null" filter operator in data grids to control how non-empty or non-null values are filtered; adjust or set the display wording for filtering options that select records where fields have values present, enable language-specific or context-appropriate naming for filtering conditions excluding null or empty entries, and configure the user interface text that signals selecting all entries with existing data in columns, improving clarity and usability of not-null filters in tabular data searches and queries.
</div>

#### Example - set the enum "isnotnull" operator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category", values: [
            {text: "Beverages", value: 1 },
            {text: "Food", value: 2 }
          ]
        }
      ],
      dataSource: [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ],
      filterable: {
        operators: {
          enums: {
            isnotnull: "Not null"
          }
        }
      }
    });
    </script>

### groupable `Boolean|Object` *(default: false)*

If set to `true` the user could group the grid by dragging the column header cells. By default grouping is disabled.

Can be set to a JavaScript object which represents the grouping configuration.


<div class="meta-api-description">
Configure and enable interactive row grouping in tables or data grids by allowing users to group data through drag-and-drop of column headers, toggle grouping functionality on or off, customize grouping options with detailed settings, control grouping behavior programmatically, manage multi-level groupings, set whether group headers appear, and provide dynamic control over how data is aggregated or visually grouped based on user interactions or predefined configurations.
</div>

#### Example - enable grouping

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      groupable: true
    });
    </script>

> Check [Basic usage](https://demos.telerik.com/kendo-ui/grid/index) for a live demo.

### groupable.enabled `Boolean` *(default: true)*

When set to false grouping is considered disabled.


<div class="meta-api-description">
Control the ability to activate or deactivate interactive grouping features in data grids, allowing users to group or ungroup columns dynamically, toggle grouping options, enable or disable the grouping interface and behavior, set whether columns can be organized by grouping criteria, manage the visibility and functionality of grouping controls, configure user permissions to group data in tabular layouts, and determine if grouping interactions are permitted in the grid environment through a simple true or false setting.
</div>

#### Example - enable grouping

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      groupable: {
        enabled: false
      }
    });
    </script>

### groupable.showFooter `Boolean` *(default: false)*

When enabled the group footer rows will remain visible when the corresponding group is collapsed.


<div class="meta-api-description">
control visibility of summary or aggregate footer rows in grouped data grids when collapsing or expanding groups, enabling persistent display of group totals, subtotals, and footer aggregates regardless of group expansion state, configure grid to maintain footer rows for grouped datasets while toggling group visibility, retain summary information at group footers during group collapse actions, set options to keep group aggregate summaries visible within grid sections even if data rows are hidden, enable or disable footer row persistence for grouped data views to ensure key aggregate metrics remain accessible, manage display of group footer summaries dynamically in data grids with expandable and collapsible groupings, preserve footer aggregates for grouped items independent of their expanded or collapsed state, adjust settings to show or hide group footers that hold totals and summary statistics in hierarchical or grouped grid layouts.
</div>

#### Example - show footer when groups are collapsed

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName", groupFooterTemplate: "this is a footer" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Beer", category: "Beverages" },
        { productName: "Cheese", category: "Food" },
      ],
      groupable: {
        showFooter: true
      }
    });
    </script>

### groupable.sort `Object`

Sets the sort configuration when grouping.


<div class="meta-api-description">
Control, configure, or customize the order and sorting of grouped data within a grid or table by setting sorting descriptors, defining how groups are arranged, prioritizing group sequences, and managing group sorting behavior during data grouping operations, including sorting group keys ascending or descending, changing the order of groups, and adjusting how grouped rows are displayed based on group criteria or sort conditions.
</div>

#### Example - use a custom function to compare the groups

    <div id="grid"></div>

    <script>
        $("#grid").kendoGrid({
            dataSource: {
                data: [
                    { id: 1, name: "Salmon", category: "Seafood" },
                    { id: 3, name: "Ice cream", category: "Desserts" },
                    { id: 2, name: "Mackerel", category: "Seafood" },
                    { id: 4, name: "Cake", category: "Desserts" },
                    { id: 5, name: "Lemonade", category: "Beverages" },
                    { id: 6, name: "Tea", category: "Beverages" },
                    { id: 7, name: "Coffee", category: "Beverages" },
                ],
                pageSize: 10
            },
            pageable: true,
            groupable: {
                sort: {
                    dir: "desc",
                    compare: function(a, b) {
                        if (a.items.length === b.items.length) {
                            return 0;
                        } else if (a.items.length > b.items.length) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                }
            },
            height: 550,
            columns: [
                { field: "id", title: "Id", width: "120px" },
                { field: "name", title: "Name", width: "120px" },
                { field: "category", title: "Category", width: "120px" }
            ]
        });
    </script>

### groupable.sort.compare `Function`

A JavaScript function which is used to compare the groups (refer to [`sortable`](/api/javascript/ui/grid/configuration/sortable) for sorting the items of the groups). It has the same signature as the [compare function accepted by Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort).


<div class="meta-api-description">
Configure custom group sorting logic by providing a JavaScript comparison function that dictates the order of grouped data segments within a grid or table, enabling precise control over how grouped rows or categories are sorted beyond default alphabetical or numerical ordering. This feature supports defining comparison rules that return negative, zero, or positive values, aligning with standard JavaScript array sorting conventions to set priorities, order groups ascending or descending, and handle complex sorting scenarios within grouped collections, catering to use cases such as sorting by custom criteria, dates, hierarchical relationships, or calculated values in grouped datasets.
</div>

#### Example - use a custom function to compare the groups

    <div id="grid"></div>

    <script>
        $("#grid").kendoGrid({
            dataSource: {
                data: [
                    { id: 1, name: "Salmon", category: "Seafood" },
                    { id: 3, name: "Ice cream", category: "Desserts" },
                    { id: 2, name: "Mackerel", category: "Seafood" },
                    { id: 4, name: "Cake", category: "Desserts" },
                    { id: 5, name: "Lemonade", category: "Beverages" },
                    { id: 6, name: "Tea", category: "Beverages" },
                    { id: 7, name: "Coffee", category: "Beverages" },
                ],
                pageSize: 10
            },
            pageable: true,
            groupable: {
                sort: {
                    compare: function(a, b) {
                        if (a.items.length === b.items.length) {
                            return 0;
                        } else if (a.items.length > b.items.length) {
                            return 1;
                        } else {
                            return -1;
                        }
                    }
                }
            },
            height: 550,
            columns: [
                { field: "id", title: "Id", width: "120px" },
                { field: "name", title: "Name", width: "120px" },
                { field: "category", title: "Category", width: "120px" }
            ]
        });
    </script>

### groupable.sort.dir `String` *(default: asc)*

The sort order of the groups according to the group field.

The supported values are:

*  `"asc"` (ascending order)
* `"desc"` (descending order)


<div class="meta-api-description">
Control and configure the order of grouped data sorting by specifying ascending or descending direction when organizing items into groups within a grid or table view, enabling developers to set how grouped rows or sections are sorted, prioritize group display order in either forward or reverse sequence, adjust sorting preferences for grouped collections, manage grouping sort order settings for UI components, and determine grouping hierarchy sorting to display grouped elements from lowest to highest or highest to lowest during initialization or dynamic updates.
</div>

#### Example - sort the groups in descending order

    <div id="grid"></div>

    <script>
        $("#grid").kendoGrid({
            dataSource: {
                data: [
                    { id: 6, name: "Tea", category: "Beverages" },
                    { id: 7, name: "Coffee", category: "Beverages" },
                    { id: 1, name: "Salmon", category: "Seafood" },
                    { id: 3, name: "Ice cream", category: "Desserts" },
                    { id: 2, name: "Mackerel", category: "Seafood" },
                    { id: 4, name: "Cake", category: "Desserts" },
                    { id: 5, name: "Lemonade", category: "Beverages" }
                ],
                pageSize: 10
            },
            pageable: true,
            groupable: {
                sort: {
                    dir: "desc"
                }
            },
            height: 550,
            columns: [
                { field: "id", title: "Id", width: "120px" },
                { field: "name", title: "Name", width: "120px" },
                { field: "category", title: "Category", width: "120px" }
            ]
        });
    </script>

### groupable.messages `Object`

The text messages displayed during grouping.


<div class="meta-api-description">
Customize and configure the text prompts, labels, notifications, or messages shown when grouping data within a grid or table component, including setting, changing, or overriding default group-related display text, group headings, instructions, or status updates that appear during group actions, enabling you to control how grouping information is presented to users, modify grouping interface language, and tailor grouping messages to fit application needs or localization requirements.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" },
        { field: "unitPrice" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages", unitPrice: 2.5 },
        { productName: "Coffee", category: "Beverages", unitPrice: 3.0 },
        { productName: "Bread", category: "Food", unitPrice: 1.5 }
      ],
      groupable: {
        messages: {
          empty: "Drop column headers here to group your data"
        }
      }
    });
    </script>

### groupable.messages.empty `String` *(default: "Drag a column header and drop it here to group by that column")*

The text displayed in the grouping drop area.


<div class="meta-api-description">
Customize, set, or configure the displayed message or placeholder text in the grid’s grouping drop zone, control what users see when no groups are applied or available, modify empty state prompts in groupable grid areas, adjust information or instructions shown in group grouping spaces, tailor the notification or label that appears when the grid’s group-by feature has no current groups, update or change default empty grouping messages for improving user guidance during grouping actions.
</div>

#### Example - set the "empty" grouping message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      groupable: {
        messages: {
          empty: "Drop columns here"
        }
      }
    });
    </script>

### height `Number|String`

The height of the grid. Numeric values are treated as pixels.

When string is used the format can be "number" + "px" or "number" alone. For example: "100px" or "100".


<div class="meta-api-description">
Adjust or configure the vertical dimension of a grid or table container to define its height in pixels or string format, controlling how many rows are visible, managing scrolling behavior, setting fixed or dynamic vertical sizes, specifying pixel values with or without "px", and influencing layout boundaries and viewport display within data grids or tabular interfaces.
</div>

#### Example - set the height as a number

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      height: 100
    });
    </script>

#### Example - set the height as a string

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      height: "10em"
    });
    </script>

### loaderType `String` *(default: "loadingPanel")*

Defines what loader will be used while loading the data. Possible values are:

- "loadingPanel" - a panel with a circular loading indicator.
- "skeleton" - a skeleton enabled loader.

> A **pageSize** must be defined for the **skeleton** loader type to work properly.


<div class="meta-api-description">
Configure how the data fetching or refreshing state is visually indicated in a grid, enabling selection between a circular spinner loading panel or skeleton screen placeholders that mimic row structure during load times, useful for enhancing user experience while data is loading or refreshing. Control and customize the loading animation style, toggle between spinner indicators or skeleton placeholders that show temporary row shapes, optimize loading feedback for grid data operations, set loading UI preferences to improve perceived performance, choose between circular progress indicators or skeleton loaders to signal data retrieval or updates, manage visual cues during data fetch with panel or skeleton styles, ensure better loading transitions with configurable loaders while awaiting grid data, and support pagination-aware skeleton rendering when row placeholders are preferred during grid refresh processes.
</div>

#### Example - set the loaderType

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "ShipName" },
          { field: "ShipCity" }
        ],
        dataSource: {
          type: "odata-v4",
          transport: {
            read: "https://demos.telerik.com/service/v2/odata/Orders"
          },
          schema: {
            model: {
              fields: {
                ShipName: { type: "string" },
                ShipCity: { type: "string" }
              }
            }
          },
          pageSize: 20,
          serverPaging: true
        },
        loaderType: "skeleton"
      });
    </script>

### messages `Object`

Defines the text of the command buttons that are shown within the Grid. Used primarily for localization.


<div class="meta-api-description">
Customize, localize, and set the text labels or captions of command buttons within a grid interface, enabling tailored language support, translation, and personalized user messages for grid actions, commands, or controls. Configure button names, captions, or prompts to match locale-specific terminology, user preferences, or application-specific wording in grid UI elements to enhance clarity, usability, internationalization, and accessibility across different languages and regions.
</div>

#### Example - change the messages

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: ["create", "save", "cancel"],
      messages: {
        commands: {
          cancel: "Cancel changes",
          canceledit: "Cancel",
          create: "Add new record",
          destroy: "Delete",
          edit: "Edit",
          save: "Save changes",
          select: "Select",
          update: "Update"
        }
      }
    });
    </script>

### messages.ai `Object`

Defines the text configurations for the ai features. Used primarily for localization.


<div class="meta-api-description">
Customize and configure AI feature text localization within grid interfaces, enabling the setting and control of AI-related messages, prompts, labels, notifications, and user-facing text for artificial intelligence components in data grids or tabular displays. Adjust, translate, or override AI messages for personalized, localized, or context-specific wording in grid-based AI tools, ensuring clear communication of AI-driven hints, alerts, actions, or statuses in various languages or custom terminology environments.
</div>

#### Example - change the text configuration for the ai features

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ],
       toolbar: ["aiAssistant"],
       filterable: true,
       ai: {
          service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       },
       messages: {
        ai: {
          success: "Operation successful.",
          error: "Operation not successful.",
          outputPlaceholder: "Currently there is no output available"
        }
       },
       height: 550
    });
    </script>


### messages.ai.outputPlaceholder `String`

Defines the text to be displayed for the output placeholder when there are no other outputs available. Used primarily for localization.


<div class="meta-api-description">
Customize or configure the default placeholder text displayed in the grid interface whenever AI-generated outputs are absent or not yet available, enabling localization and personalized messages to indicate the lack of AI results, or to control the initial prompt text shown in AI output areas before any generated content appears.
</div>

#### Example - change the text configuration for the ai features

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ],
       toolbar: ["aiAssistant"],
       filterable: true,
       ai: {
          service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       },
       messages: {
        ai: {
          outputPlaceholder: "Currently there is no output available"
        }
       },
       height: 550
    });
    </script>

### messages.ai.success `String`

Defines the text to be displayed for the output text for a successful operation. Used primarily for localization.


<div class="meta-api-description">
Customize or configure the confirmation message, success notification, or completion text shown when an AI process finishes successfully within the grid interface. Enable localization, translation, or adjustment of the feedback text for AI-powered operations, results, or tasks to match different languages, regions, or user preferences. Control the display wording, success prompt, or positive outcome message after automated or machine learning features execute correctly in grid-based data presentations or UI components.
</div>

#### Example - change the text configuration for the ai features

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ],
       toolbar: ["aiAssistant"],
       filterable: true,
       ai: {
          service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       },
       messages: {
        ai: {
          success: "Operation is successful."
        }
       },
       height: 550
    });
    </script>

### messages.ai.error `String`

Defines the text to be displayed for the output text for a unsuccessful operation. Used primarily for localization.


<div class="meta-api-description">
Set or customize the error message text displayed when an AI-driven operation in a data grid or table fails, enabling localization, translation, or personalized feedback. Adjust the notification or alert shown to users upon AI processing errors, configure messages for failures during automated or intelligent grid actions, control the wording of AI-related error prompts, and tailor responses to suit different languages, user interfaces, or logging needs. Handle AI component failures by defining fallback text, error alerts, or system messages that inform users of problems with AI functionalities within grid systems.
</div>

#### Example - change the text configuration for the ai features

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ],
       toolbar: ["aiAssistant"],
       filterable: true,
       ai: {
          service: "https://demos.telerik.com/service/v2/ai/grid/smart-state"
       },
       messages: {
        ai: {
          error: "Operation is not successful."
        }
       },
       height: 550
    });
    </script>

### messages.commands `Object`

Defines the text of the command buttons that are shown within the Grid. Used primarily for localization.


<div class="meta-api-description">
Customize and translate command button text within the grid interface, enabling developers to configure, modify, or localize default action labels such as edit, delete, update, and cancel. This feature supports setting custom strings for built-in command controls, facilitating multilingual user interfaces, adjusting UI wording, and tailoring button captions to specific application requirements or user preferences. It helps control how command buttons are presented in the grid, allowing seamless override of default command labels for various locales and use cases involving dynamic or static UI text changes.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: ["create", "save", "cancel"],
      messages: {
        commands: {
          cancel: "Cancel changes",
          canceledit: "Cancel",
          create: "Add new record",
          destroy: "Delete",
          edit: "Edit",
          save: "Save changes",
          select: "Select",
          update: "Update"
        }
      }
    });
    </script>

### messages.commands.cancel `String`

Defines the text of the "Cancel Changes" button located in the toolbar of the widget.


<div class="meta-api-description">
Customize or localize the text label for the toolbar button that cancels or reverts changes in a data grid, including setting or configuring the "Cancel Changes" button caption, adjusting the cancel command text, controlling the prompt label for aborting edits, modifying the toolbar cancel action wording, and enabling different language versions or personalized messages for canceling grid modifications during data entry or editing sessions.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: ["create", "save", "cancel"],
      messages: {
        commands: {
          cancel: "Cancel changes"
        }
      }
    });
    </script>

### messages.commands.canceledit `String`

Defines the text of the "Cancel" button that is rendered in `inline` or `popup` editing mode.


<div class="meta-api-description">
Control or customize the text label shown on the cancel button during inline or popup editing within a grid, enabling you to configure, change, or localize the cancel action prompt, edit cancellation wording, or the button text that aborts or reverts ongoing edits in grid cells or rows.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: ["create", "save", "cancel"],
      messages: {
        commands: {
          canceledit: "Cancel"
        }
      }
    });
    </script>

### messages.commands.create `String`

Defines the text of the "Add new record" button located in the toolbar of the widget.


<div class="meta-api-description">
Configure, customize, or change the text label for the toolbar button that adds new entries, records, or items in a grid or data table interface. Adjust the button caption, create command wording, or modify the "Add new" prompt to match localization, user interface language, or specific application terminology. Control the displayed phrase that triggers creating a new record, row, or data entry within grid components, enhancing user clarity and interaction.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: ["create", "save", "cancel"],
      messages: {
        commands: {
          create: "Add new record"
        }
      }
    });
    </script>

### messages.commands.destroy `String`

Defines the text of the "Delete" button rendered in `inline` or `popup` editing mode.


<div class="meta-api-description">
Set or customize the label, text, or caption of the delete button in grid editing interfaces, including inline and popup editors, to control how the removal or deletion action is presented to users, change default button names, update command button text, or localize the delete command label for better user understanding and interface consistency.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: ["create", "save", "cancel"],
      messages: {
        commands: {
          destroy: "Delete"
        }
      }
    });
    </script>

### messages.commands.edit `String`

Defines the text of the "Edit" button that is rendered in `inline` or `popup` editing mode.


<div class="meta-api-description">
Control and customize the text label for the Edit button in data grid interfaces during inline or popup editing sessions, enabling localization, translation, or modification of the default button caption. Adjust, set, or configure the edit command label to match user language preferences, update UI wording for better clarity, or adapt to different internationalization requirements within grid editing contexts. Enable changing, renaming, or localizing the inline or popup edit button text to provide a tailored user experience that fits various language settings and customization needs in editable data tables.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: ["create", "save", "cancel"],
      messages: {
        commands: {
          edit: "Edit"
        }
      }
    });
    </script>

### messages.commands.excel `String`

Defines the text of the "Export to Excel" button of the grid toolbar.


<div class="meta-api-description">
Customize, configure, or localize the toolbar button label for exporting data to Excel in a grid interface, enabling control over the text shown for Excel export actions, adapting the export button caption, modifying the Excel export command name, setting the UI text for saving or downloading grid content as Excel files, and tailoring the spreadsheet export prompt to match different languages or user preferences.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: [ "excel" ],
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      messages: {
        commands: {
          excel: "Excel export"
        }
      }
    });
    </script>

### messages.commands.save `String`

Defines the text of the "Save Changes" button located in the toolbar of the widget.


<div class="meta-api-description">
Modify or configure the text label, caption, or title displayed on the save button within the grid toolbar to personalize, update, rename, or localize the message for saving changes, enabling control over the wording users see when triggering save actions, allowing customization for different languages, styles, or user interface preferences related to commit, apply, or persist operations in grid components.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: ["create", "save", "cancel"],
      messages: {
        commands: {
          save: "Save changes"
        }
      }
    });
    </script>

### messages.commands.search `String` *(default: "Search...")*

Allows the customization of the placeholder text in the grid search panel.


<div class="meta-api-description">
Customize and localize the search input placeholder text within grid search panels, enabling setting, configuring, or changing the default search prompt text displayed to users. Tailor or translate the search box placeholder string to match different languages, branding, or interface preferences, control the hint or example text shown inside search fields, and adjust the placeholder that guides user input in grid or table search functionalities. This is useful for making search input messages clear, context-specific, or user-friendly in diverse applications, enhancing internationalization and customization of embedded search components.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      messages: {
        commands: {
          search: "Look for..."
        }
      },
      dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
      toolbar:["search"]
    });
    </script>

### messages.commands.update `String`

Defines the text of the "Update" button that is rendered in `inline` or `popup` editing mode.


<div class="meta-api-description">
Customize or change the text, caption, or label displayed on the update button for grid editing modes, including inline or popup editors; control how the update action is named or shown when saving changes directly within the grid interface; configure the wording or button title for applying edits or committing updates in data grids, tables, or editable lists; adjust the command button text that triggers record modifications or data updates during grid editing workflows.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: ["create", "save", "cancel"],
      messages: {
        commands: {
          update: "Update"
        }
      }
    });
    </script>

### messages.commands.sort `String`

Defines the text of the "Sort" button.


<div class="meta-api-description">
Configure or customize the label text displayed on the sort command button within a grid or table interface. Enable localization or translation of the sorting button text to match different languages or regions. Control, set, or update the button caption, title, or display text used for sorting functionality in grid components, data tables, or sortable lists to improve user interface clarity and internationalization support. Adjust the word or phrase that appears on sort action triggers in UI elements for better accessibility, user feedback, or custom naming conventions.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: true,
      filterable: true,
      groupable: true,
      toolbar: ["sort"],
      messages: {
        commands: {
          sort: "Sorting"
        }
      }
    });
    </script>

### messages.commands.filter `String`

Defines the text of the "Filter" button.


<div class="meta-api-description">
Customize and control the text label displayed on the filter button within grid interfaces, enabling you to configure, rename, or localize the filter command prompt for better user experience and interface clarity, including settings to change or set the filter button caption, adjust filter command text, or modify the displayed filter action label in grid controls or data tables.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: true,
      filterable: true,
      groupable: true,
      toolbar: ["filter"],
      messages: {
        commands: {
          filter: "Filtering"
        }
      }
    });
    </script>

### messages.commands.group `String`

Defines the text of the "Group" button.


<div class="meta-api-description">
Customize or configure the label, caption, or text displayed for the grouping command or button in data grids, tables, or UI components that support grouping features. Control and change the localized wording, translations, or user-facing terminology used for grouping actions, group button labels, or group commands in grid interfaces to match different languages, custom UI vocabularies, accessibility needs, or specific terminology preferences in applications that organize data by grouping columns or rows. Adjust and set the text that appears for initiating, enabling, or managing data grouping in interactive grid or tabular components.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: true,
      filterable: true,
      groupable: true,
      toolbar: ["group"],
      messages: {
        commands: {
          group: "Grouping"
        }
      }
    });
    </script>

### messages.commands.columnchooser `String`

Defines the text of the "ColumnChooser" button.


<div class="meta-api-description">
Control the label or text displayed on the button that toggles the column selection or column chooser interface within a data grid, enabling customization, localization, translation, or configuration of the column chooser button text to match different languages, UI preferences, or user interfaces that allow users to show, hide, or select visible columns dynamically.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: true,
      filterable: true,
      groupable: true,
      toolbar: ["columnChooser"],
      messages: {
        commands: {
          columnchooser: "Choose column"
        }
      }
    });
    </script>

### messages.commands.selectall `String`

Defines the text of the label of the "SelectAll" checkbox.


<div class="meta-api-description">
Customize, translate, or configure the label text for selecting all items in a grid, controlling the displayed wording for "Select All" checkboxes, enabling localization and internationalization of selection commands, adjusting checkbox labels for bulk selection functionality, modifying or setting the text shown when users select every row or item, adapting multi-select checkbox prompts for different languages or contexts, and tailoring user interface messages related to selecting all entries within data grids or tables.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      dataLayoutMode: "stacked",
      columns: [
        { selectable: true },
        { field: "name" },
        { field: "age" },
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: true,
      filterable: true,
      groupable: true,
      toolbar: ["selectAll"],
      messages: {
        commands: {
          selectall: "Check All"
        }
      }
    });
    </script>

### messages.details `Object`

Defines the text of the detail expand and collapse buttons that are shown within the Grid with `stacked` layout and `detailTemplate` initialized.


<div class="meta-api-description">
Customize, configure, or set the text labels for expanding and collapsing detail sections in grid layouts, especially for stacked views using detail templates, enabling localization, internationalization, and adjusting button or link captions for reveal or hide details functionality in data grids. Adjust or control the message strings shown on detail expanders, toggles, or disclosure controls within grid components to fit different languages, UI conventions, or user preferences when managing nested or hierarchical row details.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        dataLayoutMode: "stacked",
        stackedLayoutSettings: {
          cols:[100, 200],
        },
        detailTemplate: ({ name, age }) => `<div>Name: ${name}</div><div>Age: ${age}</div>`,
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: {
              id: "id"
            }
          }
        },
        messages: {
          details: {
            expand: "Open",
            collapse: "Close"
          }
        }
      });
    </script>

### messages.details.expand `String`

Defines the text of the detail expand button that are shown within the Grid with `stacked` layout and `detailTemplate` initialized.


<div class="meta-api-description">
Customize or configure the label, caption, or text displayed on the expand button that appears on grid rows in stacked or detail view layouts, enabling control over the wording developers want for toggling detailed row expansion or collapse in data grids using detail templates. This setting helps change, override, or localize the prompt or UI element text that users interact with when expanding nested details within grid components, improving clarity and user experience for various interface languages and design requirements.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        dataLayoutMode: "stacked",
        stackedLayoutSettings: {
          cols:[100, 200],
        },
        detailTemplate: ({ name, age }) => `<div>Name: ${name}</div><div>Age: ${age}</div>`,
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: {
              id: "id"
            }
          }
        },
        messages: {
          details: {
            expand: "Open",
          }
        }
      });
    </script>

### messages.details.collapse `String`

Defines the text of the detail collapse button that are shown within the Grid with `stacked` layout and `detailTemplate` initialized.


<div class="meta-api-description">
Customize, translate, or set the label and text for the collapse button in grid details, detail views, or stacked layouts, enabling support for multiple languages, localization needs, user interface text adjustments, and control over the messaging displayed when collapsing detail sections inside data grids or detail templates.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        dataLayoutMode: "stacked",
        stackedLayoutSettings: {
          cols:[100, 200],
        },
        detailTemplate: ({ name, age }) => `<div>Name: ${name}</div><div>Age: ${age}</div>`,
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: {
              id: "id"
            }
          }
        },
        messages: {
          details: {
            collapse: "Close",
          }
        }
      });
    </script>

### messages.commands.cancel `String`

Defines the text of the "Cancel Changes" button located in the toolbar of the widget.


<div class="meta-api-description">
Customize or localize the text label for the toolbar button that cancels or reverts changes in a data grid, including setting or configuring the "Cancel Changes" button caption, adjusting the cancel command text, controlling the prompt label for aborting edits, modifying the toolbar cancel action wording, and enabling different language versions or personalized messages for canceling grid modifications during data entry or editing sessions.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: ["create", "save", "cancel"],
      messages: {
        commands: {
          cancel: "Cancel changes"
        }
      }
    });
    </script>

### messages.noRecords `String`

Defines the text of the "noRecords" option that is rendered when no records are available in current view. The "noRecords" options should be set to `true`.


<div class="meta-api-description">
Customize or configure the notification, alert, or text displayed when a data table, list, grid, or results view contains no entries, empty rows, or zero records, enabling users to see a specific message indicating no data is available, blank datasets, or empty content by setting or controlling the no-data, empty-state, or no-results prompt in the interface when the feature to show absence of records is activated or turned on.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        page: 2,
        pageSize: 10
      },
      noRecords: true,
      height: 200,
      messages: {
        noRecords: "There is no data on current page"
      }
    });
    </script>

### messages.expandCollapseColumnHeader `String` *(default: "")*

Allows the customization of the text in the column header for the expand or collapse columns. Sets the value to make the widget compliant with the web accessibility standards.


<div class="meta-api-description">
Customize, set, or change the text label and accessible name of the expandable and collapsible column header in grid or table components to improve user interface clarity, accessibility support, screen reader announcements, ARIA labels, and user-friendly descriptions for expand/collapse toggles, expand or collapse indicators, and column header captions in data grids or hierarchical table views.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { name: "Jane Doe", age: 30, city: "London" },
          { name: "John Doe", age: 33, city: "Berlin" }
        ]
      },
      detailInit: function (e) {
        e.detailCell.text("City: " + e.data.city);
      },
      height: 200,
      messages: {
        expandCollapseColumnHeader: "E/C"
      }
    });
    </script>

### messages.filterCellTitle `String` *(default: "filter cell")*

The text that will be used for the `title` attribute of all filter cells belonging to a filter row in the Grid.


<div class="meta-api-description">
Set or customize the tooltip text, hover text, or title attribute displayed on filter input cells inside a grid’s filter row to provide contextual hints, descriptions, or accessibility labels. Control or configure the small pop-up text shown when hovering over filtering inputs or filter controls within a data grid, enabling developers to specify user guidance, accessibility tooltips, or helpful messages for filter cells. Adjust the mouseover title text for filter inputs in tabular data views to enhance usability and clarify filter functions.
</div>

#### Example - configure filter cell title message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }, { field: "age" }],
       dataSource: [{ name: "Jane Doe", age: 30 }],
       filterable: {
         mode: "row"
       },
       messages: {
         filterCellTitle: "Filter this column"
       }
    });
    </script>

### messages.groupingHeaderLabel `String` *(default: "grid grouping header")*

The text that will be used for the `aria-lable` attribute of the grouping header of the Grid.


<div class="meta-api-description">
Customize or set the accessible label text for grouping headers in grid controls to improve screen reader support and accessibility; control, configure, or define the aria-label attribute for grouped columns or sections, enabling assistive technologies to announce grouping information clearly and accurately in data grids, tables, or lists where content is organized by groups or categories.
</div>

#### Example - configure grouping header label message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }, { field: "age" }],
       dataSource: [{ name: "Jane Doe", age: 30 }],
       groupable: true,
       messages: {
         groupingHeaderLabel: "Drag column headers here to group by column"
       }
    });
    </script>

### messages.toolbarLabel `String` *(default: "grid toolbar")*

The text that will be used for the `aria-lable` attribute of the ToolBar of the Grid.


<div class="meta-api-description">
Set or customize the accessible label text for the grid toolbar using localization, enabling screen reader-friendly `aria-label` descriptions, configuring descriptive tooltips, controlling toolbar accessibility naming, providing internationalized or translated toolbar labels, enhancing navigation clarity, and ensuring proper semantic labeling for assistive technologies.
</div>

#### Example - configure toolbar label message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [{ field: "name" }, { field: "age" }],
       dataSource: [{ name: "Jane Doe", age: 30 }],
       toolbar: ["create", "excel"],
       messages: {
         toolbarLabel: "Grid action toolbar"
       }
    });
    </script>

### messages.clearButtons `Object`

Defines the text of the clear buttons that are shown within the Grid Toolbar tools. Used primarily for localization.


<div class="meta-api-description">
Customize, translate, or set the text labels for clear buttons in grid or table toolbars, enabling control over the button captions that reset filters, clear selections, or remove applied settings. This includes configuring localized strings, modifying clear button titles, adjusting user interface elements for clearing actions, and tailoring clear/reset button text options within data grids or tabular UI components. Ideal for managing multilingual UI customization, editing default clear button wording, or changing button text for filtering and clearing user inputs in grids.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: ["sort", "filter", "group"],
      sortable: true,
      groupable: true,
      filterable: true,
      messages: {
        clearButtons: {
          clearFiltering: "Remove filters",
          clearSorting: "Unsort all",
          clearGrouping: "Ungroup all",
        }
      }
    });
    </script>

### messages.clearButtons.clearFiltering `String`

Defines the text of the "Filter" clear all button that is rendered in filter toolbar tool.


<div class="meta-api-description">
Define or customize the label, caption, or text displayed on the button that clears all active filters in a data grid's filter toolbar, enabling control over the wording for the filter reset or clear-all filtering action, so users can identify and interact with the button that removes all applied filters and restores the grid view to unfiltered state.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: true,
      groupable: true,
      filterable: true,
      toolbar: ["sort", "filter", "group"],
      messages: {
        clearButtons: {
          clearFiltering: "Remove filters",
        }
      }
    });
    </script>

### messages.clearButtons.clearSorting `String`

Defines the text of the "Sort" clear all button that is rendered in sort toolbar tool.


<div class="meta-api-description">
Set or customize the label text for the button that resets all sorting criteria in a grid or data table, often found in sorting toolbars or filter controls, enabling developers to change the default "Sort" button text to match localization, UI preferences, or to provide clearer instructions for clearing applied sorting filters, resetting ordered columns, or removing sort states in interactive data lists and grids.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: true,
      groupable: true,
      filterable: true,
      toolbar: ["sort", "filter", "group"],
      messages: {
        clearButtons: {
          clearSorting: "Unsort all",
        }
      }
    });
    </script>

### messages.clearButtons.clearGrouping `String`

Defines the text of the "Group" clear all button that is rendered in group toolbar tool.


<div class="meta-api-description">
Customize or localize the label text for the grid’s clear-all grouping button in the group-toolbar, control the wording displayed on the button that removes all grouping filters, set or change the button text for clearing grouped columns, adjust the clear grouping button caption to match different languages or UI preferences, modify the label for the toolbar button that resets or clears all active groupings within the data grid, configure the text shown on the button used to cancel or remove grouping in tabular data, specify the string for the clear grouping control to enhance accessibility or localization, adapt the clear grouping button title for regional or contextual terminology, define the label for the clear-all groups toolbar button to align with user interface vocabulary, and set the wording for the grid’s group clearing control to customize user experience across multiple locales.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: true,
      groupable: true,
      filterable: true,
      toolbar: ["sort", "filter", "group"],
      messages: {
        clearButtons: {
          clearGrouping: "Ungroup all",
        }
      }
    });
    </script>

### messages.clearButtons.columnChooserReset `String`

Defines the text of the "ColumnChooser" reset button that is rendered in columnChooser toolbar tool.


<div class="meta-api-description">
Set or customize the text label for the reset button in a grid’s column chooser toolbar, enabling localization, translation, or modification of the button caption to fit different languages, UI preferences, or accessibility requirements. Adjust or control the reset button display name that clears column selections or returns column visibility to default settings within a grid column chooser interface. Change or define the toolbar reset button wording for column chooser features to enhance user experience, support multilingual grids, and accommodate internationalization needs.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: true,
      groupable: true,
      filterable: true,
      toolbar: ["sort", "columnChooser"],
      messages: {
        clearButtons: {
          columnChooserReset: "Return",
        }
      }
    });
    </script>

### messages.applyButtons `Object`

Defines the text of the apply buttons that are shown within the Grid Toolbar tools. Used primarily for localization.


<div class="meta-api-description">
Set or customize the language and display text for apply buttons within grid toolbars, configure localized labels for action buttons, update or change button captions for filtering or selection confirmation, manage text strings shown on toolbar controls that finalize user inputs or selections, enable translation and modification of apply button names for internationalization and user interface customization in data grids.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: ["columnChooser"],
      sortable: true,
      groupable: true,
      filterable: true,
      messages: {
        applyButtons: {
          columnChooserApply: "Apply columns",
        }
      }
    });
    </script>

### messages.applyButtons.applyGrouping `String`

Defines the text of the "Group" apply button that is rendered in the adaptive mode of the group toolbar tool.


<div class="meta-api-description">
Customize or configure the text label displayed on the adaptive grouping apply button in grid toolbars, enabling localization or translation of the "Group" apply action to match different languages, user preferences, or interface requirements. This setting controls how the apply grouping button prompts users to confirm or execute grouping operations within grid components, supporting customization of UI button text for grouping functionality in data grids, tables, or adaptive layouts. Adjust or set the apply button messaging, grouping confirmation prompts, and toolbar action labels to enhance clarity and usability across various locales and internationalization scenarios.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      adaptiveMode: "auto",
      sortable: true,
      groupable: true,
      filterable: true,
      toolbar: ["group"],
      messages: {
        applyButtons: {
          applyGrouping: "Done grouping",
        }
      }
    });
    </script>

### messages.applyButtons.applySorting `String`

Defines the text of the "Sort" apply button that is rendered in the adaptive mode of the sort toolbar tool.


<div class="meta-api-description">
Customize, configure, or change the label text shown on the sorting apply button within a grid's adaptive sort toolbar, enabling you to set or replace the default "Sort" button wording with any preferred phrase, text, or caption. Modify, localize, or update the actionable sorting control label in the grid interface, tailoring how the sorting apply action is presented to users, including renaming or relabeling the button that triggers sorting application. Control the user-facing sorting button text to better fit UI language, workflow, or terminology preferences for applying sortable filters or order changes within grid toolbars on adaptive layouts.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      adaptiveMode: "auto",
      sortable: true,
      groupable: true,
      filterable: true,
      toolbar: ["sort"],
      messages: {
        applyButtons: {
          applySorting: "Done sorting",
        }
      }
    });
    </script>

### messages.applyButtons.columnChooserApply `String`

Defines the text of the "ColumnChooser" apply button that is rendered in columnChooser toolbar tool.


<div class="meta-api-description">
Customize, configure, or set the text label, caption, or wording for the apply button in the grid’s column chooser feature, including localizing, translating, or changing the apply action button text for column selection confirmation, applying chosen columns, enabling user control over grid column visibility confirmation, or modifying the button text that finalizes column chooser adjustments.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: ["edit", "destroy"] }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: true,
      groupable: true,
      filterable: true,
      toolbar: ["columnChooser"],
      messages: {
        applyButtons: {
          columnChooserApply: "Done",
        }
      }
    });
    </script>

### mobile `Boolean|String` *(default: false)*

If set to `true` and the grid is viewed on mobile browser it will use adaptive rendering.

Can be set to a string `phone` which will force the widget to use adaptive rendering regardless of browser type.

> Avoid using the `mobile` option as it will be deprecated. Use the [`adaptiveMode`](/api/javascript/ui/grid/configuration/adaptivemode) configuration option instead.

> Important: With the mobile rendering, we recommend to set up the `height` option as well. Without setting an explicit height, every view of the grid might have a different height.


<div class="meta-api-description">
Configure adaptive grid rendering to optimize layout and responsiveness on mobile devices and phone screens by enabling mobile-specific or phone-forced adaptive modes, controlling display behavior for different browsers, managing height settings to ensure consistent grid sizing and prevent fluctuating view heights, and adjusting rendering modes to support mobile-friendly interfaces, responsive grid layouts, and device-aware display adjustments while accommodating variations in viewport sizes and setting display modes that improve usability on smartphones and mobile browsers.
</div>

#### Example - enable adaptive rendering auto detect

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ],
       filterable: true,
       columnMenu: true,
       mobile: true,
       height: 550
    });
    </script>

#### Example - force adaptive rendering

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
       columns: [
         { field: "name" },
         { field: "age" },
         { command: "destroy" }
       ],
       dataSource: [
         { name: "Jane Doe", age: 30 },
         { name: "John Doe", age: 33 }
       ],
       filterable: true,
       columnMenu: true,
       mobile: "phone",
       height: 550
    });
    </script>

### navigatable `Boolean` *(default: false)*

If set to `true` the user could navigate the component using the keyboard navigation. By default keyboard navigation is disabled.


<div class="meta-api-description">
Control keyboard interaction and navigation within the grid interface by enabling or disabling keyboard-based focus movement, arrow key navigation, and keyboard-driven selection. Configure keyboard support to allow users to move between cells, rows, or columns using tab, arrow keys, or shortcut keys, supporting accessibility and efficient data interaction. Set options to activate or deactivate keyboard controls for enhanced usability in grid data entry, editing, or exploration scenarios. This setting governs whether the grid can respond to keyboard input for cell selection, focus management, and navigation commands.
</div>

#### Example - enable keyboard navigation

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      navigatable: true,
      selectable: true
    });
    </script>

> Check [Keyboard navigation](https://demos.telerik.com/kendo-ui/grid/keyboard-navigation) for a live demo.

### noRecords `Boolean|Object` *(default: false)*

If set to `true` and current view contains no records, message similar to "No records available" will be displayed. By default this option is disabled.


<div class="meta-api-description">
Control displaying empty-state messages or notifications when the data grid or table has no rows, records, or items to show, enabling or disabling placeholders like "No data available," "No records found," or "No matching entries"; configure visibility of these no-content messages during initialization or runtime to inform users when the dataset is empty, ensuring user-friendly feedback for empty views or filtered results with zero records, and customize how the grid or list handles and signals absence of data in varying contexts such as searches, filters, or initial loads.
</div>

#### Example - enable noRecords message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      noRecords: true,
      dataSource: []
    });
    </script>

### noRecords.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which is rendered when current view contains no records.


<div class="meta-api-description">
Customize the appearance and content shown when a data grid or table has no items by setting or controlling the empty state display using templates, markup, or custom rendering functions. Enable custom messages, static HTML, or dynamic templates that respond when data sets, lists, or grids are empty, ensuring user-friendly no-data views, placeholders, or informative feedback. Configure how blank or no-record scenarios appear in UI grids or tables through flexible templating options, including custom HTML snippets, templating languages, or functions to render tailored visuals and messages when there are zero rows or filtered results.
</div>

#### Example - customize the noRecords message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      pageable: true,
      noRecords: {
        template: () => `No data available on current page. Current page is: ${$("#grid").data("kendoGrid").dataSource.page()}`
      },
      dataSource: {
        data: [{name: "John", age: 29}],
        page: 2,
        pageSize: 10
      }
    });
    </script>

#### Example - specify noRecords message as a function

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        pageable: true,
        noRecords: {
          template: function(e){
            var page = $("#grid").getKendoGrid().dataSource.page();
            return "No data available on current page. Current page is: " + page;
          }
        },
        dataSource: {
          data: [{name: "John", age: 29}],
          page: 2,
          pageSize: 10
        }
      });
    </script>

### pageable `Boolean|Object` *(default: false)*

If set to `true` the grid will display a pager. By default paging is disabled.

Can be set to a JavaScript object which represents the pager configuration.

> Don't forget to set a [`pageSize`](/api/javascript/data/datasource/configuration/pagesize), no matter if paging is performed client-side or server-side. A `pageSize` can be defined in the `pageable` settings, or in the [`dataSource`](/api/javascript/ui/grid/configuration/datasource) settings. If an already existing datasource instance is passed to the grid, then the [`pagesize`](/api/javascript/data/datasource/configuration/pagesize) option should be set in the dataSource's settings and not in the `pageable` settings.


<div class="meta-api-description">
Control and enable pagination features in the data grid to display navigational UI elements like pagers, configure page sizes for dividing large datasets, manage client-side or server-side paging behavior, customize page navigation controls, set or adjust the number of records per page, toggle paging on or off, integrate existing data sources with specified page sizes, and tailor the paging experience through customizable settings to optimize data presentation and user interaction within tabular layouts and dynamic grid components.
</div>

#### Example - enable paging

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2
      }
    });
    </script>

### pageable.alwaysVisible `Boolean` *(default: true)*

By default the grid will show the pager even when total amount of items in the DataSource is less than the pageSize.

If set to `false` the grid will toggle the pager visibility as follows:

* when the total amount of items initially set in the DataSource is less than the pageSize number the pager will be hidden.
* when the total amount of items initially set in the DataSource is greater than or equal to the pageSize number the pager will be shown.
* when the total amount of items in the DataSource becomes less than the pageSize number (after delete, filter operation or pageSize change) the pager will be hidden.
* when the total amount of items in the DataSource becomes greater than or equal to the pageSize number (after an insert, filter operation or pageSize change) the pager will be shown.

Introduced in the Kendo UI 2017 R3 release.


<div class="meta-api-description">
Control whether the pagination controls are always visible or dynamically shown based on the number of items, enabling configuration to keep the pager permanently displayed or to automatically hide and show it depending on the data count relative to page size; manage pager visibility toggling during data operations like filtering, inserting, deleting, or changing page size to maintain an intuitive paging experience by setting, enabling, disabling, or configuring the pager display behavior in grids and data tables.
</div>

#### Example - hide the pager if total items are less than pageSize

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 5,
        alwaysVisible: false
      }
    });
    </script>

### pageable.adaptiveMode `String`*(default: "none")*
Specifies a value whether the page sizes dropdown will be adaptive. Possible values are:

* `none` - The current page.
* `auto` - The total number of pages.


<div class="meta-api-description">
Manage how pagination dropdown adapts to different page sizes and total pages, including options to configure dropdown behavior for displaying current page size, total page count, or automatic adjustment based on the number of pages; control whether the page size selector shows fixed values, dynamic counts, or disables adaptation to customize the pagination experience, enabling developers to set, enable, or control how page numbers and size options appear and respond for better navigation through grid data.
</div>

#### Example - configure adaptive mode for pager

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        adaptiveMode: "auto"
      }
    });
    </script>

### pageable.buttonCount `Number` *(default: 10)*

The maximum number of buttons displayed in the numeric pager. The pager will display ellipsis (...) if there are more pages than the specified number.


<div class="meta-api-description">
Control or configure the maximum number of visible numeric page buttons in a grid or data table pager, setting how many page links appear simultaneously for navigation, adjusting the pagination display to limit the count of page numbers shown, manage the pager’s button quantity to optimize user interface space, enable setting a cap on page indicators so additional pages trigger ellipsis or overflow representation, customize how many page navigation buttons are visible at once in a paginated grid or list, adjust the number of pagination controls for better usability and cleaner layout when dealing with large datasets, set, limit, or configure the count of page buttons displayed in a grid’s paging toolbar to control page selector visibility.
</div>

#### Example - set pager button count

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        buttonCount: 1
      }
    });
    </script>

### pageable.info `Boolean` *(default: true)*

If set to `true` the pager will display information about the current page and total number of data items. By default the paging information is displayed.


<div class="meta-api-description">
Control the display of paging summaries in data grids that show current page numbers, total item counts, record ranges, or page info in pagers. Configure, enable, or disable visible page indicators, paging info text, page count summaries, or pagination details within grid controls to inform users about data navigation status and item totals. Adjust settings to show or hide page-related information like page indexes, total items, and data count summaries in user interfaces with pageable grids or tables.
</div>

#### Example - hide the paging information

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        info: false
      }
    });
    </script>

### pageable.input `Boolean` *(default: false)*

If set to `true` the pager will display an input element which allows the user to type a specific page number. By default the page input is not displayed.

Using `pageable.input` and [`pageable.numeric`](pageable.numeric) at the same time is not recommended.


<div class="meta-api-description">
Control the ability for users to directly enter a page number to navigate within the grid, allowing quick jumping to specific pages via an input box in the pager. Enable or disable the page number text field for paging, configure whether a typed page value can be used to switch pages instantly, and avoid conflicts with numeric paging controls. This setting optimizes user navigation in paginated data grids by providing manual page selection through a typed input, facilitating faster access to desired data segments without relying solely on next/previous or numeric page buttons.
</div>

#### Example - show the pager input

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        input: true
      }
    });
    </script>

### pageable.messages `Object`

The text messages displayed in pager. Use this option to customize or localize the pager messages.


<div class="meta-api-description">
Control and customize pagination text, labels, and messages for grid navigation, including options to localize, override default pager strings, set custom button labels, configure page number formats, and tailor UI elements for previous, next, first, last, and page indicators to improve user experience in data grids and tables.
</div>

#### Example - configure pager messages

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        messages: {
          display: "Showing {0} to {1} of {2} entries",
          page: "Page",
          of: "of {0}",
          first: "First",
          last: "Last",
          next: "Next",
          previous: "Previous"
        }
      }
    });
    </script>

### pageable.messages.display `String` *(default: "{0} - {1} of {2} items")*,

The pager info text. Uses [kendo.format](/api/javascript/kendo/methods/format).

Contains three placeholders:
- {0} - the first data item index
- {1} - the last data item index
- {2} - the total number of data items


<div class="meta-api-description">
Customize and localize the grid pagination message text by formatting the displayed pager information with dynamic placeholders for the first item index, last item index, and total item count. Enable configuring or setting the paging info text with flexible templates, formats, or localization to show user-friendly page summaries, control how page ranges and totals appear, and support multilingual or customized pager labels in data grids. Adjust or override the default pager info display to match specific UI text, languages, or custom formatting needs for paginated grid views.
</div>

#### Example - set the "display" pager message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        messages: {
          display: "Showing {0}-{1} from {2} data items"
        }
      }
    });
    </script>

### pageable.messages.empty `String` *(default: "No items to display")*,

The text displayed when the grid is empty.


<div class="meta-api-description">
Customize the message or text that appears when a pageable data grid or table has no rows to display, allowing you to configure, set, or localize the empty state prompt or notification shown during pagination when there is no data available. Enable control over the placeholder or empty view label for grids, tables, or lists that support paging but currently contain no items, including defining custom, localized, or user-friendly messages for empty pageable content.
</div>

#### Example - set the "empty" pager message

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
      ],
      pageable: {
        pageSize: 2,
        messages: {
          empty: "No data"
        }
      }
    });
    </script>

### pageable.messages.page `String` *(default: "Page")*,

The label displayed before the pager input.


<div class="meta-api-description">
Customize or localize the text label displayed before the pagination input in a data grid, controlling the wording or phrase that appears adjacent to the page number input field for user navigation. Adjust or configure the prefix text for the pager control to support different languages, customize UI text, or change the prompt shown before users enter the desired page number in a grid or table component. Enable setting, updating, or overriding the page indicator label to suit localization, UX preferences, or accessibility needs across paginated grid interfaces.
</div>

#### Example - set the label before the pager input

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        input: true,
        messages: {
          page: "Enter page"
        }
      }
    });
    </script>

### pageable.messages.of `String` *(default: "of {0}")*,

The label displayed before the pager input. Uses [kendo.format](/api/javascript/kendo/methods/format). Contains one optional placeholder {0} which represents the total number of pages.


<div class="meta-api-description">
Control and customize the pagination label that appears before the page input field in a data grid or table, enabling localization and internationalization by setting the display text format for phrases like "Page X of Y" using placeholders for total page count. Configure, translate, or override the paging UI text to show contextually relevant messages before the page number, support dynamic insertion of total pages, and adapt the pager label to different languages or custom wording in pagination controls. Adjust the paging label template to enhance user interface clarity, improve accessibility, and match localized or branded terminology for page indicators shown prior to page input fields in grid or list components.
</div>

#### Example - set the label after the pager input

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        input: true,
        messages: {
          of: "from {0}"
        }
      }
    });
    </script>

### pageable.messages.itemsPerPage `String` *(default: "items per page")*,

The label displayed after the page size DropDownList.


<div class="meta-api-description">
Customize or configure the label that displays the number of items shown per page in a data grid or table pagination control, including adjusting, setting, or localizing the text shown next to the page size dropdown, changing page size descriptions, controlling pagination labels, updating items-per-page indicators, or modifying the wording that reflects how many entries are visible per page for better user interface clarity and multilingual support.
</div>

#### Example - set the label after the page size DropDownList

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        pageSizes: true,
        messages: {
          itemsPerPage: "data items per page"
        }
      }
    });
    </script>

### pageable.messages.first `String` *(default: "Go to the first page")*,

The tooltip of the button which goes to the first page.


<div class="meta-api-description">
Configure or customize the tooltip text, hover label, or accessibility title for the grid's first page navigation button to improve user guidance, interface clarity, and localization support when controlling pagination or enabling quick access to the initial page in data tables or lists.
</div>

#### Example - set the Tooltip of the first page button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        messages: {
          first: "First page"
        }
      }
    });
    </script>

### pageable.messages.last `String` *(default: "Go to the last page")*,

The tooltip of the button which goes to the last page.


<div class="meta-api-description">
Customize, configure, or set the tooltip text, label, or hover message shown on the Grid component’s button that navigates users directly to the last page. This includes controlling the displayed information or accessibility text for the pagination control’s last-page navigation element, enabling better user guidance, localization, or UI customization to clarify what the last-page button does in a pageable grid or data table interface. Adjust or override the default last-page button tooltip used in paginated data grids, tables, or lists to enhance user experience or internationalization.
</div>

#### Example - set the Tooltip of the last page button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        messages: {
          last: "Last page"
        }
      }
    });
    </script>

### pageable.messages.next `String` *(default: "Go to the next page")*,

The Tooltip of the button which goes to the next page.


<div class="meta-api-description">
Customize, configure, or set the tooltip, hover text, or label displayed on the pagination control's next page button in a grid or table interface, enabling localization, internationalization, or user-friendly navigation hints for moving forward through paged data; control the descriptive text users see when hovering over the next page arrow, button, or icon to improve clarity, accessibility, and user experience in data grids, lists, or paginated content components.
</div>

#### Example - set the Tooltip of the next page button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        messages: {
          next: "Next page"
        }
      }
    });
    </script>

### pageable.messages.previous `String` *(default: "Go to the previous page")*,

The Tooltip of the button which goes to the previous page.


<div class="meta-api-description">
Customize the text or tooltip for the pagination control's previous page button, configure the label or hover message for navigating to the prior page, set or enable descriptive tooltips on the pager's previous navigation arrow, control the wording shown when users hover over the back or earlier page button in a data grid, and adjust accessibility or UI hints related to moving one page backward in paginated data views.
</div>

#### Example - set the Tooltip of the previous page button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        messages: {
          previous: "Previous page"
        }
      }
    });
    </script>

### pageable.messages.refresh `String` *(default: "Refresh")*,

The Tooltip of the refresh button.


<div class="meta-api-description">
Set or customize the tooltip text for the refresh button in pageable grid components, enabling control over the label or message shown when users hover over the refresh icon, configure the refresh button description, modify or localize the refresh tooltip in pageable data grid interfaces, and adjust the user-facing message related to refreshing data pages or reloading grid content to improve accessibility and usability in pagination controls.
</div>

#### Example - set the Tooltip of the refresh button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        refresh: true,
        messages: {
          refresh: "Refresh the grid"
        }
      }
    });
    </script>

### pageable.messages.morePages `String` *(default: "More pages")*,

The Tooltip of the ellipsis ("...") button, which appears when the number of pages is greater than the `buttonCount`.


<div class="meta-api-description">
Configure or customize the tooltip text displayed on the pagination ellipsis button in data grids or tables that appear when there are additional pages beyond the visible page buttons, enabling control over user interface hints, accessibility labels, hover text, or descriptions for the "more pages" indicator in pagination controls.
</div>

#### Example - set the Tooltip of the ellipsis button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 1,
        buttonCount: 2,
        refresh: true,
        messages: {
          morePages: "More pages"
        }
      }
    });
    </script>

### pageable.numeric `Boolean` *(default: true)*

If set to `true` the pager will display buttons for navigating to specific pages. By default those buttons are displayed.

Using `pageable.numeric` and [`pageable.input`](pageable.input) at the same time is not recommended.


<div class="meta-api-description">
Control the display of numeric pagination buttons that let users jump directly to specific pages within a data grid, enabling or disabling visible page number links for quicker navigation, configuring paging controls to show clickable numeric buttons instead of or alongside other paging methods, setting pagination style to numbered page selectors, adjusting how users can quickly access particular pages by selecting page indices in grids or tables without typing inputs, managing pager behavior to include or exclude numeric page buttons for streamlined page switching, handling page navigation UI options to emphasize numeric page selection versus input fields, toggling direct page number navigation features in grid components, and customizing pager elements to improve user experience with numeric page indicators for efficient browsing through paged data.
</div>

#### Example - hide the numeric pager buttons

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        numeric: false
      }
    });
    </script>

### pageable.pageSize `Number`

The number of data items which will be displayed in the grid. **This setting will not work if the Grid is assigned an already existing Kendo UI DataSource instance.**


<div class="meta-api-description">
Set or adjust the number of entries, rows, or items displayed on each page within a data grid or table for pagination and client-side paging scenarios, enabling control over page length, data chunk size, and how many records users see per page while navigating through grid data; useful for configuring page item limits, customizing page content count, and managing the amount of data visible in each page view without server-side datasource dependencies.
</div>

#### Example - set page size

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2
      }
    });
    </script>

### pageable.pageSizes `Boolean|Array` *(default: false)*

If set to `true` the pager will display a drop-down which allows the user to pick a page size.
By default the page size drop-down is not displayed.

Can be set to an array of predefined page sizes to override the default list.
A special `all` value is supported. It sets the page size to the total number of records.

If a `pageSize` setting is provided for the data source then this value will be selected initially.


<div class="meta-api-description">
Control and configure the paging options by enabling or customizing a page size selector dropdown in the grid’s pagination controls, allowing users to set how many records or rows display per page; adjust or define specific preset page size values, include an option to show all records at once, and set the initial page size based on data source settings, providing flexible ways for users to choose, change, or control the number of visible entries per page in data grids, tables, or lists with paging functionality.
</div>

#### Example - show the page size DropDownList

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "productName" },
          { field: "category" }
        ],
        dataSource: {
          data: [
            { productName: "Tea", category: "Beverages" },
            { productName: "Coffee", category: "Beverages" },
            { productName: "Water", category: "Beverages" },
            { productName: "Juice", category: "Beverages" },
            { productName: "Decaffeinated Coffee", category: "Beverages" },
            { productName: "Iced Tea", category: "Beverages" },
            { productName: "Ham", category: "Food" },
            { productName: "Bread", category: "Food" },
            { productName: "Eggs", category: "Food" },
            { productName: "Bacon", category: "Food" },
            { productName: "Chips", category: "Food" },
            { productName: "Fish", category: "Food" }
          ],
          pageSize: 4
        },
        pageable: {
          pageSizes: true
        }
      });
    </script>

#### Example - specify the page sizes as array

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: {
        data: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
        ],
        pageSize: 1
      },
      pageable: {
        pageSizes: [2, 3, 4, "all"],
        numeric: false
      }
    });
    </script>

### pageable.position `String` *(default: "bottom")*

Specifies the position in which the grid pager will be rendered. Valid values are "top" and "bottom" (default).


<div class="meta-api-description">
Configure or control the placement of the pagination controls in a data grid by setting the position of the paging interface to appear either above the grid rows at the top or below them at the bottom. Enable paging UI positioning to adjust the layout and user experience by placing the pager interface on the top edge or bottom edge of tabular data views. Specify where the page navigation elements render within the grid container, choosing between top position or bottom position to meet design or interaction preferences for paged data displays.
</div>

#### Example - place grid pager on top of the grid

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        position: "top"
      }
    });
    </script>

### pageable.previousNext `Boolean` *(default: true)*

If set to `true` the pager will display buttons for going to the first, previous, next and last pages. By default those buttons are displayed.


<div class="meta-api-description">
Configure navigation controls in pageable grids to enable or disable first, previous, next, and last page buttons for easier paging and quick movement between data pages. Control visibility of navigation arrows or buttons in data grids or tables, toggling the presence of back, forward, start, and end page selectors to enhance user navigation. Set options to show or hide paging controls like prior, next, beginning, and final page navigation to customize user experience in pageable components. Adjust page navigation buttons’ display in grid or table views to allow or restrict jumping to adjacent or boundary pages efficiently during pagination setup.
</div>

#### Example - hide the first, previous, next, and last buttons

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        previousNext: false
      }
    });
    </script>

### pageable.refresh `Boolean` *(default: false)*

If set to `true` the pager will display the refresh button. Clicking the refresh button will [refresh](/api/javascript/ui/grid/methods/refresh) the grid. By default the refresh button is not displayed.


<div class="meta-api-description">
Enable or configure a refresh button within a grid or table pagination control to allow users to manually reload or update the displayed data on demand, providing a way to fetch the latest records without navigating away or triggering automatic refreshes. This feature supports user interaction for data refreshing, setting up a visible refresh control in the paging area so that when users click it, the grid data is re-fetched or reloaded, helping maintain up-to-date information dynamically, and it can be toggled on or off depending on whether a manual data reload option should be presented in the interface.
</div>

#### Example - show the refresh button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        refresh: true
      }
    });
    </script>

### pageable.responsive `Boolean` *(default: true)*

If set to `false` the pager will not be responsive. By default the pager is responsive.


<div class="meta-api-description">
Configure whether the pagination controls dynamically adjust or adapt their layout and appearance based on varying container sizes, screen widths, or device types, enabling or disabling responsive pager behavior for flexible or fixed layouts in grid interfaces. Manage adaptive paging display options to support mobile-friendly, fluid, or static pagination designs, control pager resizing, enable or disable automatic pager format changes on small or large screens, and tailor user experience by setting responsiveness on or off to optimize visibility and usability across different viewports and device resolutions.
</div>

#### Example - show the responsive button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      pageable: {
        pageSize: 2,
        responsive: false
      }
    });
    </script>

### pdf `Object`

Configures the Kendo UI Grid PDF export settings.


<div class="meta-api-description">
Set up exporting grid data to PDF files including configuring output options like file name, page size, layout orientation (portrait or landscape), margins, scaling, export proxies, and downloading capabilities for displayed data; customize and control PDF generation settings, paper formats, export workflows, and filename conventions to enable seamless PDF output from grid views with flexible formatting, print layout adjustments, and proxy configurations for optimized document export and distribution.
</div>

#### Example - configure PDF export settings

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      toolbar: ["pdf"],
      pdf: {
        fileName: "Products.pdf",
        title: "Product List",
        author: "Company Name",
        allPages: true
      }
    });
    </script>

### pdf.allPages `Boolean` *(default: false)*

Exports all grid pages, starting from the first one.

> **Note:** Chrome is known to crash when generating very large PDF-s.  A solution to this is to include the
> [Pako](http://nodeca.github.io/pako/) library.  Simply loading this library with a `<script>` tag will enable compression in PDF, e.g.:
>
> `<script src="https://unpkg.com/pako/dist/pako_deflate.min.js"></script>`
>
> The allPages export is not supported when virtual scrolling is enabled.


<div class="meta-api-description">
Enable exporting every paginated page of a grid or table into a single PDF document, capturing all data across multiple pages rather than just the visible portion. Configure the export to generate comprehensive PDFs that include full pagination content by setting the export option to include all pages, ensuring complete data snapshots for reports or downloads. This feature supports seamless multi-page PDF creation for grid data, ideal for users wanting to save, share, or print entire datasets, although it may be limited when virtual scrolling is active or when handling very large documents where compression libraries like Pako might be necessary to prevent browser crashes.
</div>

#### Example - export all pages

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["pdf"],
      columns: [
        { field: "name" }
      ],
      dataSource: {
        data: [{ name: "Jane Doe"},
               { name: "John Doe"},
               { name: "Tim Doe"},
               { name: "Alice Doe"}],
        pageSize: 2
      },
      pdf: {
        allPages: true
      }
    });
    var grid = $("#grid").data("kendoGrid");
    grid.saveAsPDF();
    </script>

### pdf.forcePageBreak `String` *(default: null)*

Forces the page to break before each element that matches the applied CSS selector.

> **Note:** Setting the paperSize to `auto` will override this configuration.


<div class="meta-api-description">
Control PDF export pagination by configuring forced page breaks before elements matching specified CSS selectors, enabling precise page start points during grid-to-PDF conversion; set CSS selector strings to insert break-before page breaks so each matched element begins on a new PDF page, useful for customizing PDF layout, controlling page flow, managing content partitions, enforcing section separations, and overriding default automatic page sizing behaviors.
</div>

#### Example - force page break

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["pdf"],
      columns: [
        { field: "name" }
      ],
      dataSource: {
        data: [{ name: "Jane Doe"},
               { name: "John Doe"},
               { name: "Tim Doe"},
               { name: "Alice Doe"}],
        pageSize: 2
      },
      pdf: {
        allPages: true,
        paperSize: "A4",
        repeatHeaders: true,
        forcePageBreak: ".k-master-row:nth-child(2n)",
      }
    });
    var grid = $("#grid").data("kendoGrid");
    grid.saveAsPDF();
    </script>

### pdf.author `String` *(default: null)*

The author of the PDF document.


<div class="meta-api-description">
Control and customize the author information embedded in PDF files generated from grid data exports, setting the document’s creator metadata that appears in PDF viewers and is accessed by indexing tools or metadata readers. Enable specifying the PDF author to manage file properties during PDF report generation, exporting, downloading, or printing workflows, ensuring consistent attribution, branding, or compliance for exported documents. Configure the author field metadata to influence how PDFs are identified or categorized by various PDF software, libraries, or search engines processing grid-exported reports.
</div>

#### Example - set the author

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            author: "John Doe"
        },
        dataSource: {
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/products"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>


### pdf.autoPrint `Boolean` *(default: false)*
Specifies if the Print dialog should be opened immediately after loading the document.

> **Note:** Some PDF Readers/Viewers will not allow opening the Print Preview by default, it might be necessary to configure the corresponding add-on or application.


<div class="meta-api-description">
Enable or disable automatic display of the print dialog or print preview when a generated PDF is loaded or exported from a grid, allowing immediate print workflows or prompting users to print right after exporting; configure settings to trigger automatic printing prompts, control auto print dialog launch, initiate print preview on PDF load, and manage user workflow for printing PDFs generated by grid data, while considering compatibility with different PDF viewer restrictions and the need for adjustments in PDF reader or add-on configurations.
</div>

#### Example - enable auto print for PDF export

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      toolbar: ["pdf"],
      pdf: {
        autoPrint: true,
        fileName: "Products.pdf"
      }
    });
    </script>

### pdf.avoidLinks `Boolean|String` *(default: false)*
A flag indicating whether to produce actual hyperlinks in the exported PDF file.

It's also possible to pass a CSS selector as argument. All matching links will be ignored.

> Available in versions 2015.3.1020 and later


<div class="meta-api-description">
Control whether hyperlinks are included or excluded when exporting grid or tabular data to PDF, with options to disable all links globally or selectively omit links matching specific CSS selectors, enabling customization of link rendering, link suppression, and hyperlink avoidance in PDF exports, useful for preventing clickable URLs or embedded links in printable or shareable PDF documents derived from grid content.
</div>

#### Example - skip hyperlinks

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            creator: "John Doe",
            avoidLinks: true
        },
        dataSource: {
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/products"
                }
            },
            pageSize: 10
        },
        columns: [
          { field: "ProductName",
            template: ({ ProductID, ProductName }) => `<a href='products/${ProductID}/'>${ProductName}</a>` }
        ],
        pageable: true
    });
    </script>

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*

The creator of the PDF document.


<div class="meta-api-description">
Configure or specify the author, creator, or metadata information embedded in exported PDF documents to control the PDF's creator field, enabling customization of document properties for identification, indexing, printing, and author attribution during PDF generation from grid or tabular data.
</div>

#### Example - set the creator

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            creator: "John Doe"
        },
        dataSource: {
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/products"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### pdf.date `Date`

The date when the PDF document is created. Defaults to `new Date()`.


<div class="meta-api-description">
Control or customize the timestamp embedded in PDF metadata and visible headers or footers when exporting grid data as a PDF file, specifying the creation or export date and time using a JavaScript Date object or equivalent. Enable setting or overriding the default export date value, adjust the PDF file’s date information for accurate record-keeping, auditing, or versioning, and configure how the creation date appears in the output PDF document metadata and printed sections to match desired timestamps or timezones during grid-to-PDF conversion.
</div>

#### Example - set the date

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            date: new Date("2014/10/10")
        },
        dataSource: {
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/products"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### pdf.fileName `String` *(default: "Export.pdf")*

Specifies the file name of the exported PDF file.


<div class="meta-api-description">
Control and customize the exported PDF file name for grid data exports by specifying the desired download filename with extension, enabling setting, configuring, or renaming the output PDF file when users save or download grid content, allowing developers to define or change the PDF export name programmatically, set default or dynamic file names for exported reports or documents, control how the PDF file is labeled upon export, and manage the naming convention for saved PDF exports from grids or tabular data views.
</div>

#### Example - set the default PDF file name

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            fileName: "Products.pdf"
        },
        dataSource: {
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/products"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### pdf.forceProxy `Boolean` *(default: false)*
If set to true, the content will be forwarded to [proxyURL](pdf.proxyurl) even if the browser supports saving files locally.


<div class="meta-api-description">
Control whether PDF export is routed through a server proxy regardless of browser support for direct file saving, enabling centralized handling of PDF generation, server-side processing, authentication enforcement, download fallback mechanisms, and forwarding exported grid data to a specified proxy URL for consistent export workflows or custom server integration during PDF creation.
</div>

#### Example - force proxy usage for PDF export

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      toolbar: ["pdf"],
      pdf: {
        forceProxy: true,
        proxyURL: "/proxy/pdf",
        fileName: "Products.pdf"
      }
    });
    </script>

### pdf.jpegQuality  `Number` *(default: 0.92)*

Specifies the quality of the images within the exported file, from 0 to 1.


<div class="meta-api-description">
Adjust the image compression level or set the quality factor for JPEG pictures embedded during PDF export to manage the trade-off between visual clarity and file size, enabling control over how sharp or compressed grid images appear in exported PDF files. This setting lets developers configure, optimize, or fine-tune the balance between image resolution and storage efficiency when saving or printing grid content as PDFs, influencing output fidelity, compression ratio, and bandwidth usage.
</div>

#### Example - configure JPEG quality for PDF export

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      toolbar: ["pdf"],
      pdf: {
        jpegQuality: 0.5,
        fileName: "Products.pdf"
      }
    });
    </script>

### pdf.keepPNG `Boolean` *(default: false)*

If set to true all PNG images contained in the exported file will be kept in PNG format.


<div class="meta-api-description">
Control whether PNG images remain in their original PNG format during exporting or saving grid content to PDF files, enabling preservation of image quality, fidelity, and transparency when generating PDFs from grid data. Configure, enable, or set options to keep embedded PNG graphics intact instead of converting or rasterizing them, supporting workflows that require maintaining the original image format while exporting, printing, or sharing grid visuals as PDF documents. Adjust export settings for image format retention, PNG export fidelity, and PDF generation with embedded images preserved as PNG rather than transformed into other formats or bitmaps.
</div>

#### Example - preserve PNG format in PDF export

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      toolbar: ["pdf"],
      pdf: {
        keepPNG: true,
        fileName: "Products.pdf"
      }
    });
    </script>

### pdf.keywords `String` *(default: null)*

Specifies the keywords of the exported PDF file.


<div class="meta-api-description">
Set or configure metadata keywords embedded in exported PDF files from grid data, controlling searchable, indexable, or taggable terms within the PDF to improve document discoverability and organization; enables customization of export properties by specifying relevant keywords, labels, or descriptors for PDFs generated from tabular or grid content, useful for managing metadata, improving search engine or internal search visibility, and setting document classification tags within PDF exports.
</div>

#### Example - set the keywords

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            keywords: "northwind products"
        },
        dataSource: {
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/products"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### pdf.landscape `Boolean` *(default: false)*

Set to `true` to reverse the paper dimensions if needed such that width is the larger edge.


<div class="meta-api-description">
Set or enable landscape orientation for PDF exports to switch page layout so the width is greater than height, control paper dimensions for horizontal page formatting, configure export settings to generate PDFs with wider layouts, adjust page orientation to landscape mode, reverse default portrait sizing for Grid or table data output, define export direction for better fitting wide content, customize PDF page setup, specify horizontal arrangement for exported documents, and toggle between portrait and landscape layouts during PDF generation.
</div>

#### Example - enable landscape mode

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            landscape: true
        },
        dataSource: {
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/products"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### pdf.margin `Object`

Specifies the margins of the page (numbers or strings with units). Supported
units are "mm", "cm", "in" and "pt" (default).


<div class="meta-api-description">
Set or customize printable page margins and spacing when exporting tabular data or grids to PDF, enabling control over top, right, bottom, and left page borders using various units like millimeters, centimeters, inches, or points. Adjust printable layout by specifying margin sizes as numbers or strings with unit suffixes to fit content within desired page boundaries, control whitespace around exported tables, and configure export formatting for professional, well-spaced PDF reports and documents. Manage page edges and padding during PDF generation from data grids by defining margin measurements that affect printable area and content alignment on the PDF pages.
</div>

#### Example - set the margins

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            margin: {
                left: 10,
                right: "10pt",
                top: "10mm",
                bottom: "1in"
            }
        },
        dataSource: {
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/products"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### pdf.margin.bottom `Number|String` *(default: 0)*

The bottom margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
Adjust or configure the space at the bottom edge of PDF pages when exporting grid data to PDF, controlling the lower margin size by setting numeric values representing points; customize page layout, bottom padding, or whitespace to ensure content is properly spaced and not cut off at the page bottom during PDF generation or print output.
</div>

#### Example - set bottom margin for PDF export

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      toolbar: ["pdf"],
      pdf: {
        margin: {
          bottom: "20mm"
        },
        fileName: "Products.pdf"
      }
    });
    </script>

### pdf.margin.left `Number|String` *(default: 0)*

The left margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
Adjust the left page margin or left spacing when exporting a grid or table layout to PDF format, control and configure the left boundary padding, set numeric values for left margin in points, customize how much blank space appears on the left side of each PDF page, modify and fine-tune the left edge margin during PDF export, specify the left offset to align the content properly within the PDF pages, ensure consistent left margin settings for print-ready grid exports, handle left margin size to avoid content cutoff or overflow on the left, manage left-side white space in PDF output for grids or tabular data, configure left page border spacing to meet layout or formatting requirements.
</div>

#### Example - set left margin for PDF export

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      toolbar: ["pdf"],
      pdf: {
        margin: {
          left: 15
        },
        fileName: "Products.pdf"
      }
    });
    </script>

### pdf.margin.right `Number|String` *(default: 0)*

The right margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
Configure the right page margin or spacing when exporting grid data to PDF, enabling precise adjustment of the right edge padding for page layout, setting the margin in points or other units, controlling the right-side whitespace or border area, customizing output PDF layout with right margin size, defining export page margins to fit content properly, adjusting right margin boundaries in PDF export, handling page edge spacing on the right side, setting or modifying exported document right padding, managing the right margin dimensions in PDF output from grid components.
</div>

#### Example - set right margin for PDF export

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      toolbar: ["pdf"],
      pdf: {
        margin: {
          right: "10pt"
        },
        fileName: "Products.pdf"
      }
    });
    </script>

### pdf.margin.top `Number|String` *(default: 0)*

The top margin. Numbers are considered as "pt" units.


<div class="meta-api-description">
Adjust or configure the top margin size, spacing, or whitespace for PDF page exports when generating grids or tabular data, allowing precise control over how much blank space appears at the top edge of each PDF page; set or modify the distance from the top border in points or units to customize page layout, padding, header offset, or top gutter in exported PDF documents containing grid content.
</div>

#### Example - set top margin for PDF export

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      toolbar: ["pdf"],
      pdf: {
        margin: {
          top: "5mm"
        },
        fileName: "Products.pdf"
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
Configure and control PDF export page dimensions and scaling by setting output size options including automatic sizing based on grid content, predefined standard paper formats like A4 or A3, or custom dimensions specified as width and height using numeric point values or measurement units such as millimeters, centimeters, inches, or points. Enable precise page layout by adjusting export paper size to fit content requirements, specify fixed or dynamic page sizes for PDF generation, and manage how pixel dimensions translate into printable points for accurate physical document scaling. This covers use cases for customizing page size in PDF export workflows, setting exact measurement units for layout consistency, and toggling between default automatic sizing and explicit size configurations.
</div>

#### Example - set custom paper size

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            paperSize: ["20mm", "20mm"]
        },
        dataSource: {
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/products"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

> As of Q2 2016, when `paperSize` is specified the Grid will use `drawDOM`'s [automatic page breaking](/framework/drawing/pdf-output/multi-page-content#automatic-page-breaking) algorithm.  This makes available a few new options: `template`, `repeatHeaders` and `scale`.

### pdf.template `String` *(default: null)*

A piece of HTML to be included in each page.  Can be used to display headers and footers.  See the documentation in [drawDOM](/framework/drawing/pdf-output/page-templates).

Available template variables include:
* pageNum
* totalPages

> **Important**
>
> Using a template requires setting [paper size](pdf.papersize)


<div class="meta-api-description">
Customize PDF exports by embedding HTML templates that inject headers, footers, page numbers, and dynamic content into every generated PDF page from the grid data. Control the layout and formatting of exported PDFs by configuring HTML snippets or templates that render on each page, leveraging variables like current page number and total page count. Enable and set page template content for PDF output, allowing developers to define consistent page elements such as headers, footers, or custom markup on every PDF page, ensuring professional, repeatable PDF layouts when exporting grid data. This feature supports dynamic per-page HTML rendering for fully customizable PDF exports, incorporating page numbering and total pages display, often used alongside paper size settings.
</div>

#### Example - add header template to PDF export

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      toolbar: ["pdf"],
      pdf: {
        paperSize: "A4",
        template: ({ pageNum, totalPages }) => `<div class="page-template">
          <h2>Product Catalog - Page ${kendo.htmlEncode(pageNum)} of ${kendo.htmlEncode(totalPages)}</h2>
          </div>`,
        fileName: "Products.pdf"
      }
    });
    </script>

### pdf.repeatHeaders `Boolean` *(default: false)*

Set this to `true` to repeat the grid headers on each page.

> **Important**
>
> Using a repeatHeaders requires setting [paper size](pdf.papersize)


<div class="meta-api-description">
Control the repetition of table or grid column headers on every page when exporting or printing multi-page PDF documents, enabling consistent visibility of headers for easier navigation and comprehension across paginated output. Configure, enable, or set header rows to repeat automatically on each PDF page to maintain table context during printing, PDF generation, report exports, or document pagination. This feature supports ensuring header visibility on all pages for large data tables or multi-page reports when outputting to PDF formats, optimizing readability and user experience in printed or digitally exported PDFs.
</div>

#### Example - repeat headers on each PDF page

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      toolbar: ["pdf"],
      pdf: {
        paperSize: "A4",
        repeatHeaders: true,
        fileName: "Products.pdf"
      }
    });
    </script>

### pdf.scale `Number` *(default: 1)*

A scale factor.  In many cases, text size on screen will be too big for print, so you can use this option to scale down the output in PDF.  See the [Scaling the Drawings](slug://scalingofcontent_drawing) article.


<div class="meta-api-description">
Adjust or configure the size and zoom level of grid content when exporting or printing to PDF by setting a scaling factor that increases or decreases the overall layout dimensions, enabling control over how large or small the grid elements and text appear on the final PDF output, useful for fitting content to page size, improving readability, customizing print resolution, or managing visual proportions for printed documents.
</div>

#### Example - scale PDF content

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" }
      ],
      toolbar: ["pdf"],
      pdf: {
        paperSize: "A4",
        scale: 0.8,
        fileName: "Products.pdf"
      }
    });
    </script>

> **Important**
>
> Using scale requires setting [paper size](pdf.papersize)

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
Configure or set a server-side endpoint URL to enable exporting or downloading PDF files through a proxy server, especially for browsers that restrict direct local file saving like older Safari or Internet Explorer versions. This involves sending a POST request with encoded PDF content, MIME type, and desired filename to the proxy, which then streams or delivers the decoded file back to the user with appropriate headers for file attachment and download. Use cases include enabling PDF export functionality behind firewalls, on restricted browsers, or when direct client-side saving is blocked, ensuring seamless streamed PDF file delivery, server-mediated file generation, and file transfer control for applications requiring reliable export or download handling via backend URLs.
</div>

#### Example - set the server proxy URL

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            proxyURL: "/save"
        },
        dataSource: {
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/products"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### pdf.proxyTarget `String` *(default: "_self")*

A name or keyword indicating where to display the document returned from the proxy.

If you want to display the document in a new window or iframe,
the proxy should set the "Content-Disposition" header to `inline; filename="<fileName.pdf>"`.


<div class="meta-api-description">
Control the display target for PDF exports through a proxy by specifying a window name, keyword like _blank, or an iframe target to determine where the returned PDF document opens, such as a new browser tab, popup, or embedded frame. Configure the output location for exported PDFs to appear in a specified window, named target, or iframe container, enabling flexible display options when using proxy-based PDF generation. Set or direct the exported PDF output destination for seamless integration in new windows, existing named windows, or inline frames, ensuring the correct content disposition and target behavior to present the document exactly where needed. Adjust the PDF display location during proxy export processes to either open in fresh tabs, reuse existing windows by name, or inject into embedded frames for in-app PDF viewing and handling.
</div>

#### Example - open the generated document in a new window

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            forceProxy: true,
            proxyURL: "/save",
            proxyTarget: "_blank"
        },
        dataSource: {
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/products"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### pdf.subject `String` *(default: null)*

Sets the subject of the PDF file.


<div class="meta-api-description">
Set or configure the PDF document subject metadata to define the topic, theme, or description embedded within exported PDF files from the grid, enabling better identification, indexing, searchability, and organization within PDF viewers and document management systems; control or specify the PDF subject field to improve document metadata, support automated categorization, enhance content discovery, and ensure proper labeling when outputting grid data as PDF during export or initialization.
</div>

#### Example - set the subject

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            subject: "Products"
        },
        dataSource: {
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/products"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### pdf.title `String` *(default: null)*

Sets the title of the PDF file.


<div class="meta-api-description">
Configure or set the title metadata for exported PDF documents generated from grid data, control the document’s title displayed in PDF viewers, specify or customize the PDF file’s metadata title during grid export, adjust or define the export document name for PDFs, manage how the PDF title appears in metadata and viewer interfaces when saving or exporting grid content to PDF format, enable setting a descriptive name for PDF outputs from grids to improve identification and searchability in PDF readers or file management systems.
</div>

#### Example - set the title

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            title: "Products"
        },
        dataSource: {
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/core/products"
                }
            },
            pageSize: 10
        },
        pageable: true
    });
    </script>

### persistSelection `Boolean` *(default:false)*

Sets a value indicating whether the selection will be persisted when sorting, paging, filtering and etc are performed.

> **Note:** Selection persistence works only for row selection.
>
> In order for selection persistence to work correctly, you need to define an ID field in [`schema.model`](/api/javascript/data/datasource/configuration/schema#schemamodel).
>
> Selection persistence does not work for new items when the Grid DataSource is in offline mode. In offline mode, newly added items do not have IDs, which are required for selection persistence to work.


<div class="meta-api-description">
Control whether selected rows stay highlighted and retained across data operations like sorting, paging, filtering, or refreshing in a grid or table view, ensuring persistent selection states by matching stable and unique item IDs defined in your data model schema. Maintain row selection consistency when users navigate or manipulate grid data, enabling selection to survive updates, reorders, and page changes, while noting this applies only to existing rows with defined IDs and does not preserve selections for newly added items without identifiers in offline or disconnected data scenarios. This functionality supports workflows requiring reliable tracking of chosen rows through various data transformations and interface changes.
</div>

#### Example - enables selection persistence

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33},
          { id: 3, name: "Jim Doe", age: 30 },
          { id: 4, name: "Jack Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      pageable: {
        pageSize: 2
      },
      selectable: "multiple, row",
      persistSelection: true
    });
    </script>

### reorderable `Object|Boolean` *(default:false)*

If set to `true` the user could reorder the columns by dragging their header cells. By default reordering is disabled.
Multi-level headers allow reordering only in same level.


<div class="meta-api-description">
Control the ability to drag and rearrange grid or table columns interactively by enabling or disabling column reordering, allowing users to customize column order through drag-and-drop of header cells. This setting manages whether columns can be repositioned within the same header level, preventing cross-level movement in multi-level headers, and provides options to activate or deactivate dynamic column rearrangement for enhanced table customization, layout adjustment, and user-driven organization of grid data presentations.
</div>

#### Example - enable column reordering

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      reorderable: true
    });
    </script>

> Check [Column reordering](https://demos.telerik.com/kendo-ui/grid/column-reordering) for a live demo.

### reorderable.columns `Boolean` *(default:false)*

If set to `true` the user could reorder the columns by dragging their header cells. By default reordering is disabled.
Multi-level headers allow reordering only in same level.


<div class="meta-api-description">
Enable dragging and dropping of grid column headers to reorder columns interactively within the same header level, allowing users to customize column order dynamically by moving or rearranging headers, controlling whether columns can be repositioned via drag-and-drop gestures in data grids with single or multi-level headers, supporting interactive column layout adjustments and customizable table views where columns can be shuffled or reorganized by user input.
</div>

#### Example - enable column reordering

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      reorderable: true
    });
    </script>

> Check [Column reordering](https://demos.telerik.com/kendo-ui/grid/column-reordering) for a live demo.

### reorderable.rows `Boolean|Object` *(default:false)*

If set to `true` the user could reorder the rows by dragging them. By default reordering for rows is disabled. If the [selectable](/api/javascript/ui/grid/configuration/selectable) option is enabled for rows only selected rows will can be dragged and reordered.

> Note that the reordering operation is only a client-side operation and it does not reflect the order of any data that is bound to the server.

More about the Grid Row Drag and Drop functionality you can read in [`this article`](/controls/grid/row-drag-drop#row-drag-and-drop).


<div class="meta-api-description">
Enable or disable drag-and-drop functionality for rearranging grid rows, allowing users to reorder or move rows interactively by dragging with support for selection-based dragging when row selection is active; configure row reorder behavior on the client side to customize user-driven layout changes without affecting underlying server data, supporting use cases like dynamic row sorting, manual reorganization, interactive table manipulation, and client-only visual reordering controls.
</div>

#### Example - enable column reordering

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { id:1, name: "Jane Doe", age: 30 },
        { id:2, name: "John Doe", age: 33 }
      ],
      reorderable: {
        rows: true
      }
    });
    </script>

### reorderable.rows.clickMoveClick `Boolean` *(default:true)*

If set to `true` (default), when there is a drag column for the items in the Grid, the user will be allowed to reorder rows via click move click interaction as an alternative of the drag and drop one.


<div class="meta-api-description">
Enable or configure interactive row reordering in a grid or table interface through click-based movement instead of traditional dragging, allowing users to select a row with one click, choose the desired target position with a second click, and confirm the move with a third click, facilitating easy reorganization without drag handles or continuous dragging gestures. This feature supports user interactions like click-to-move, click-select-reposition, row rearrangement using clicks, enabling click-based drag-and-drop alternatives, configuring grid row movement behavior with clicks, and controlling manual row order changes without dragging. It applies to scenarios requiring flexible row sorting, repositioning, or list item management through simple mouse clicks rather than drag operations.
</div>

#### Example - enable column reordering

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { draggable: true, width: "40px" },
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { id:1, name: "Jane Doe", age: 30 },
        { id:2, name: "John Doe", age: 33 }
      ],
      reorderable: {
        rows: {
          clickMoveClick: false
        }
      }
    });
    </script>

### resizable `Object|Boolean` *(default:false)*

If object is used, it allows configuration of `resizable.columns` and `resizable.rows`. If set to `true`, only column resizing will be enabled.

By default, column and row resizing is disabled.


<div class="meta-api-description">
Control and configure the ability to resize grid elements by enabling user interactions that allow dragging to adjust column widths and row heights, with options to toggle resizing for columns only, rows only, or both; customize resizable behavior through settings that specify whether columns, rows, or both are adjustable, supporting user-driven layout changes, drag-and-drop resizing, flexible grid dimensions, and dynamic adjustment of grid cells for responsive design and improved user experience in grid-based interfaces.
</div>

#### Example - enable column resizing

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      resizable: true
    });
    </script>

> Check [Column resizing](https://demos.telerik.com/kendo-ui/grid/column-resizing) for a live demo and
the [Column widths](/web/grid/appearance#column-widths) help section for additional relevant information.

### resizable.columns `Boolean` *(default:false)*

If set to `true`, users can resize columns by dragging the edges (resize handles) of their header cells. As of Kendo UI Q1 2015, users can also auto-fit a column by double-clicking its resize handle. In this case the column will assume the smallest possible width, which allows the column content to fit without wrapping.

By default, column resizing is disabled.


<div class="meta-api-description">
Control the ability to resize table or grid columns by dragging the edges of header cells, enabling dynamic adjustment of column widths; configure users to manually drag column borders or double-click resize handles to auto-fit columns to their content for optimal display without wrapping, allowing flexible, user-driven column sizing and responsive table layouts.
</div>

#### Example - enable column resizing

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      resizable: {
        columns: true
      }
    });
    </script>

> Check [Column resizing](https://demos.telerik.com/kendo-ui/grid/column-resizing) for a live demo and
the [Column widths](/web/grid/appearance#column-widths) help section for additional relevant information.

> For column resizing on mobile devices please refer to the [Grid Adaptive Rendering](https://demos.telerik.com/kendo-ui/grid/adaptive-rendering) official demo and the [Adaptive Rendering](https://docs.telerik.com/kendo-ui/controls/grid/appearance/adaptive) documentation article.

### resizable.rows `Boolean` *(default:false)*

If set to `true`, users can resize Grid rows by dragging their bottom edge. Users can also auto-fit a row by double-clicking its bottom edge. In this case the row will assume the smallest possible height, which allows the cells content to be fully displayed.

In scenario where row selection is enabled, users are allowed to resize all selected rows at once by performing the resize interaction on one of them.

By default, row resizing is disabled.


<div class="meta-api-description">
Control and configure dynamic row height adjustments within a grid by enabling or disabling the ability to resize rows manually through dragging or automatically by double-clicking to fit content optimally, including features to adjust multiple selected rows simultaneously when selection is active, allowing flexible, interactive control over vertical grid layout, row sizing, auto-fit functionality, user-driven height customization, and multi-row resizing behavior to enhance visual presentation and data accessibility.
</div>

#### Example - enable column resizing

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      resizable: {
        rows: true
      }
    });
    </script>

### rowTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders rows. Be default renders a table row (`<tr>`) for every data source item.

> There are a few important things to keep in mind when using `rowTemplate`.
>
>* The outermost HTML element in the template must be a table row (`<tr>`). That table row must have the `uid` data attribute set to `${uid}`. The grid uses the `uid` data attribute to determine the data to which a table row is bound to.
>* If `rowTemplate` is used alongside with `detailTemplate`, the row (`<tr>`) element needs to have class `k-master-row`. The first `<td>` element of the row needs to have class `k-hierarchy-cell`. Check the [`Row Templates documentation`](/controls/grid/templates/row-templates) for more information.


<div class="meta-api-description">
Configure and customize how each data row is rendered in a grid or table by providing a custom HTML template that defines the entire table row structure, enabling developers to replace default row markup with personalized row layouts. Control table row rendering to bind data items dynamically, specifying the outer row element as a `<tr>` with a unique identifier for precise data association, and manage complex scenarios like hierarchical or master-detail rows by setting appropriate CSS classes on rows and cells. Enable developers to set, override, or extend the way rows appear in data grids, supporting advanced rendering logic, dynamic content injection, and integration with detail or nested templates, allowing full control over row markup structure, styling, and data binding for each record in a dataset. Tailor row presentation in tabular data views by adjusting rendering templates, linking row elements to data items via identifiers, and coordinating with expanded detail views or nested child rows to create interactive, richly formatted grid rows.
</div>

#### Example - specify row template as a function

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        dataSource: [ { name: "Jane Doe", age: 30 }, { name: "John Doe", age: 33 } ],
        rowTemplate: function(dataItem){
          return "<tr data-uid=" + dataItem.uid + "><td colspan='1'><strong>" + dataItem.name + "</strong></td><td colspan='1'><strong>" + dataItem.age + "</strong></td></tr>";
        }
      });
    </script>

#### Example - specify row template as a string literal

    <div id="grid"></div>
    <script>
    let encode = kendo.htmlEncode;
    $("#grid").kendoGrid({
      dataSource: [ { name: "Jane Doe", age: 30 }, { name: "John Doe", age: 33 } ],
      rowTemplate: ({ uid, name, age }) => `<tr data-uid="${uid}"><td colspan="1"><strong>${encode(name)}</strong></td><td colspan="1"><strong>${encode(age)}</strong></td></tr>`
    });
    </script>

> Check [Row template](https://demos.telerik.com/kendo-ui/grid/rowtemplate) for a live demo.

### scrollable `Boolean|Object` *(default: true)*

If set to `true` the grid will display a scrollbar when the total row height (or width) exceeds the grid height (or width). By default scrolling is enabled.

Can be set to a JavaScript object which represents the scrolling configuration.


<div class="meta-api-description">
Control and configure scrolling behavior in data grids, enabling or disabling scrollbars for overflow in rows and columns, set automatic scrollbar visibility based on grid content size exceeding its container dimensions, adjust scrolling modes via true/false or detailed JavaScript object settings to customize vertical, horizontal, or both axis scroll handling, manage overflow presentation with flexible scroll controls, and fine-tune how large datasets are navigated within grid layouts to improve user interaction and display adaptability.
</div>

#### Example - disable scrolling

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      scrollable: false
    });
    </script>

### scrollable.virtual `Boolean|String` *(default: false)*

Configures the grid virtualization settings. If set to `true` the grid will enable row virtualization and display a single page of data. Scrolling would just change the data which is currently displayed.

Can also be set to the following string values:

- "rows" - enables virtualization of rows.
- "columns" - enables virtualization of columns.
- "rows, columns" - enables virtualization of both rows and columns.

> For columns virtualization to work, define [widths for the columns](/api/javascript/ui/grid/configuration/columns.width). For additional information about the configuration of this functionality, visit the [Virtual Scrolling]({% slug virtual_scrolling_kendoui_grid_widget %}) documentation article.

Check [Virtualization of local data](https://demos.telerik.com/kendo-ui/grid/virtualization-local-data), [Virtualization of remote data](https://demos.telerik.com/kendo-ui/grid/virtualization-remote-data) and [Colums Virtualization](https://demos.telerik.com/kendo-ui/grid/column-virtualization) for live demos.


<div class="meta-api-description">
Enable or configure smooth, efficient scrolling and rendering for very large datasets by controlling row and column virtualization behavior, including options to virtualize only rows, only columns, both rows and columns, or a single data page at a time; this allows dynamic data swapping during scroll events, requiring column width settings for horizontal virtualization, supporting toggling, selective activation, and optimizing performance in grids through virtual scrolling techniques.
</div>

#### Example - enable virtual scrolling for rows

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        loaderType:"skeleton",
        dataSource: {
            type: "odata-v4",
            serverPaging: true,
            serverSorting: true,
            pageSize: 100,
            transport: {
                read: "https://demos.telerik.com/service/v2/odata/Orders"
            }
        },
        height: 543,
        scrollable: {
            virtual: true
        },
        sortable: true,
        columns: [
            { field: "OrderID", title: "Order ID", width: 110 },
            { field: "CustomerID", title: "Customer ID", width: 130},
            { field: "ShipName", title: "Ship Name", width: 280 },
            { field: "ShipAddress", title: "Ship Address" },
            { field: "ShipCity", title: "Ship City", width: 160 },
            { field: "ShipCountry", title: "Ship Country", width: 160 }
        ]
    });
    </script>

### scrollable.endless `Boolean` *(default: false)*

If set to `true` the grid will always display a single page of data. Scrolling to the end will load more items untill all items are displayed.

> Check [Endless scrolling of local data](https://demos.telerik.com/kendo-ui/grid/endless-scrolling-local) and [Endless scrolling of remote data](https://demos.telerik.com/kendo-ui/grid/endless-scrolling-remote) for live demos.


<div class="meta-api-description">
Configure infinite scrolling or continuous content loading in a grid or list so that as users scroll to the bottom, additional items dynamically load and append without manual page changes, enabling seamless endless pagination for both local and remote data sources; control automatic fetching of the next batch of data when reaching the end of current content, supporting smooth user experiences where new rows or items appear continuously during scroll and preventing abrupt stops or manual load triggers in virtualized or paged data views.
</div>

#### Example - enable endless scrolling

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [{ field: "ProductName" }, { field: "UnitPrice" }],
        dataSource: {
          transport: {
            read: "https://demos.telerik.com/service/v2/core/Products",
          },
          pageSize: 20,
        },
        height: 400,
        scrollable: {
          endless: true,
        },
      });
    </script>

### search `Object`

Configures the Kendo UI Grid search bar settings.


<div class="meta-api-description">
Control and customize the search bar in a data grid to enable filtering and finding rows based on user input, including setting which columns or fields are searchable, adjusting debounce timing for input responsiveness, defining search operators like contains, equals, or starts with, and customizing placeholder text for guidance; this allows configuring flexible, efficient, and user-friendly search experiences to filter displayed data dynamically by keywords, partial matches, or exact criteria across multiple fields or columns in tabular data.
</div>

#### Example - configure search functionality

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      toolbar: ["search"],
      search: {
        fields: [
          { name: "productName", operator: "contains" },
          { name: "category", operator: "eq" }
        ]
      }
    });
    </script>

### search.fields `Array`

Defines a list of fields which will be included in the search. If values for the property are not defined the grid will search in all column fields.


<div class="meta-api-description">
Control which data columns or fields the grid search inspects by specifying a list or array of field names to narrow down search results, enabling focused queries on selected properties or attributes; configure searchable columns to optimize performance by excluding irrelevant fields, limit search to particular data points, restrict search scope within grid data entries, and customize which dataset properties are considered during search operations, ensuring that full or partial matches apply only within defined fields rather than across every column.
</div>

#### Example - specify which fields will be included in the search

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
      toolbar:["search"],
      search: {
        fields: ["name"] // Or, specify multiple fields by adding them to the array, e.g ["name", "age"]
      }
    });
    </script>

### search.fields.name `String`

Defines the name of the field to be included in the search


<div class="meta-api-description">
Configure searchable fields by specifying the exact data attribute or column key to include in search and filtering operations within a grid or table. Enable targeted queries by setting the identifier or name of the data property used for matching, controlling which dataset elements are indexed and searchable. Adjust search scope by defining field keys or names to refine filtering, sorting, and searching behaviors, ensuring precise inclusion of relevant data points for user input, query parsing, or search algorithms within grid interfaces.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
      toolbar:["search"],
      search: {
        fields: [ { name: "name" } ]
      }
    });
    </script>

### search.fields.operator `String`

Defines the operator for the field to be used in the filter expression: [filter](/api/javascript/data/datasource/configuration/filter).

<div class="meta-api-description">
Configure and customize the comparison operator applied when filtering data within grid search fields, enabling control over how search values are matched against dataset entries using operators like equals, contains, starts with, greater than, less than, or custom comparison logic. Adjust or set the filter operator to refine the search behavior, specify the type of matching or comparison criteria, and optimize filter expressions for data queries. This includes selecting or changing comparison modes during grid setup to influence filtering operations, search queries, and result matching, ensuring precise or broad data filtering based on the selected operator logic.
</div>

#### Example - specify which fields will be included in the search

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [ { name: "Jane", age: 30 }, { name: "John", age: 33 }],
      toolbar:["search"],
      search: {
        fields: ["name", { name: "age", operator: "eq" }]
      }
    });
    </script>



### selectable `Boolean|String|Object` *(default: false)*

If set to `true` the user would be able to select grid rows. By default selection is disabled.

Can also be set to the following string values:

- "row" - the user can select a single row.
- "cell" - the user can select a single cell.
- "multiple, row" - the user can select multiple rows.
- "multiple, cell" - the user can select multiple cells.

> When the selectable property is set to "multiple, row" or "multiple, cell" the Grid cannot be scrollable on mobile devices as both are listening on the same event.


<div class="meta-api-description">
Control the ability to enable or disable selecting grid elements with options to choose single or multiple selection modes for rows or individual cells. Configure whether users can select a single row, a single cell, multiple rows, or multiple cells within the grid, adjusting selection behavior for interactive data tables, spreadsheets, or UI grids. Manage selection modes to allow toggling, highlighting, or batch operations on rows or cells, and set selection compatibility with mobile devices considering potential scrolling and event conflicts. Enable, disable, or specify precise selection types to optimize user interaction patterns in tabular or grid-based interfaces.
</div>

#### Example - set selectable as a boolean

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      selectable: true
    });
    </script>

#### Example - set selectable as a string

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      selectable: "multiple, row"
    });
    </script>

> Check [Selection](https://demos.telerik.com/kendo-ui/grid/selection) for a live demo.

### selectable.cellAggregates `Boolean|Array`

If set to `true` all aggregates will be calculated and made available to the Status Bar. The cellAggregates property also accepts an array in case only some of the aggregates should be calculated.

The available aggregates are:

* `count` - the count of all selected cells(excluding command/selectable/draggable column) but including template columns without fields.
* `max` - for numeric cells - the biggest numeric value across all of the selected cells/rows.
* `min` - for numeric cells - the smallest numeric value across all of the selected cells/rows.
* `sum` - for numeric cells - the sum of all numeric values from the selected cells/rows.
* `average` - for numeric cells - the average of all numeric values from the selected cells/rows.
* `earliest` - for date cells.
* `latest` - for date cells.
* `isTrue` - for boolean cells - the count of all selected cells with value `true`.
* `isFalse` - for boolean cells - the count of all selected cells with value `false`.


<div class="meta-api-description">
Configure and enable calculation of various statistical and summary metrics such as count, sum, average, minimum, maximum, earliest and latest dates, as well as boolean true/false counts for the cells currently selected within a data grid, allowing you to analyze cell selections dynamically with options to compute all aggregates or a specified subset, expose these aggregate summaries to the status bar for real-time feedback on numeric, date, and boolean data selections, filter aggregate calculations to focus on particular metrics, and control how selected cell data is quantitatively or qualitatively summarized including counts across non-command columns and template columns without fields.
</div>

#### Example - enable cell aggregates

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
          data: [
              { id: 1, name: "Jane Doe", age: 30 },
              { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
              model: {
                  id: "id"
              }
          }
      },
      selectable: {
        mode: "multiple, row",
        cellAggregates: true
      },
      statusBarTemplate: ({aggregates}) => `Count: ${aggregates.count}, Max: ${aggregates.max}`
    });
    </script>

#### Example - customize the calculated cell aggregates

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
          data: [
              { id: 1, name: "Jane Doe", age: 30 },
              { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
              model: {
                  id: "id"
              }
          }
      },
      selectable: {
        mode: "multiple, row",
        cellAggregates: ["sum", "count", "earliest", "isTrue", "max"]
      },
      statusBarTemplate: ({aggregates}) => `Count: ${aggregates.count}, Max: ${aggregates.max}`
    });
    </script>


### selectable.checkboxSelection `Boolean` *(default: false)*

When set to `true`, the grid.selectable will not be initialized. Should be enabled when both checkbox selection for the Grid and cell aggregates are required.


<div class="meta-api-description">
Configure the grid to allow users to select rows using checkboxes while maintaining cell aggregation functionality, enabling combined row selection and aggregate displays without disabling selection features. This setting supports scenarios where interactive checkbox row selection is needed alongside summary calculations, totals, or grouped cell values in grids, providing control over selection modes that coexist with aggregated cell data. Enable or set checkbox-based multi-row selection that integrates smoothly with cell aggregates, ensuring you can control selection behavior and preserve calculated summaries or grouped aggregate states simultaneously in complex data grids.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { selectable: true },
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
          data: [
              { id: 1, name: "Jane Doe", age: 30 },
              { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
              model: {
                  id: "id"
              }
          }
      },
      selectable: {
        mode: "multiple, row",
        cellAggregates: true,
        checkboxSelection: true
      },
      statusBarTemplate: ({aggregates}) => `Count: ${aggregates.count}, Sum: ${aggregates.sum}`
    });
    </script>


### selectable.dragToSelect `Boolean` *(default: true)*

When set to `true`, the user can drag to select multiple Grid rows or cells.

> Applies only for [multiple row or multiple cell selection](/api/javascript/ui/grid/configuration/selectable.mode).


<div class="meta-api-description">
Enable or configure the ability to click and drag across the grid to select multiple rows or cells, allowing users to highlight and choose ranges interactively by dragging their cursor. This setting controls multi-selection behavior through drag gestures, supporting scenarios like bulk editing, batch operations, or highlighting contiguous items in tabular layouts. It is useful for enhancing user experience when selecting numerous grid entries at once, combining ease of use with precise control over row or cell selection via mouse or touch drag actions.
</div>

#### Example - disable dragging to select multiple Grid rows

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      selectable: {
        mode: "multiple, row",
        dragToSelect: false
      }
    });
    </script>

### selectable.mode `String`

Can be set to the following string values:

- "row" - the user can select a single row.
- "cell" - the user can select a single cell.
- "multiple, row" - the user can select multiple rows.
- "multiple, cell" - the user can select multiple cells.

> When the selectable property is set to "multiple, row" or "multiple, cell" the Grid cannot be scrollable on mobile devices as both are listening on the same event.


<div class="meta-api-description">
Control and configure selection behavior in a grid or table by enabling single or multiple selection modes for rows or individual cells, including options like selecting one row, one cell, multiple rows, or multiple cells simultaneously. Set or adjust selection modes to tailor how users interact with grid data, supporting both single-click and multi-select functionalities, with consideration for mobile device interaction limitations when enabling multiple selections. Enable selection patterns such as row-based selection for entire entries or cell-based selection for granular control, and manage user input methods that may affect scrolling or touch behavior on mobile platforms. Customize grid item selection styles for efficient data highlighting, toggling, or batch processing through flexible selectable modes that fit various use cases and user interface requirements.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      selectable: {
        mode: "multiple, row"
      }
    });
    </script>

### selectable.ignoreOverlapped `Boolean`

When set to true, visually hidden elements that match by the filter option criteria but are overlapped by other elements that also can be selected, are ignored.

> Applies only for multiple cell selection.


<div class="meta-api-description">
Control selection behavior to exclude cells or elements that are visually overlapped, hidden, or covered by other selectable items during multi-selection scenarios, enabling the configuration to ignore elements that match specific filter criteria but are obscured or layered beneath others, ensuring only fully visible, non-overlapping cells are included in group selections; useful for managing complex grid or table selections where avoiding hidden or blocked cells is necessary for accurate multi-cell operations.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      selectable: {
        mode: "multiple, cell",
        ignoreOverlapped: true
      }
    });
    </script>

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- `"small"`
- `"medium"`
- `"large"`


<div class="meta-api-description">
Adjust or control the overall dimensions, spacing, and visual density of the grid layout by setting the component’s size value, including options to configure compact, medium, or expanded scales; enable changes to the grid’s scale for tighter or more spacious layouts, customize the density to influence padding and element proportions, and set sizing using strings like small, medium, or large to achieve preferred visual weight and arrangement.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      size: "small",
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    </script>

### sortable `Boolean|Object` *(default: false)*

If set to `true` the user could sort the grid by clicking the column header cells. By default sorting is disabled.

Can be set to a JavaScript object which represents the sorting configuration.


<div class="meta-api-description">
Enable or configure interactive sorting of table columns by clicking on header cells, allowing users to dynamically reorder grid or table data based on column values. Control sortable behavior by setting it to true for basic click-to-sort functionality or customize sorting logic via configuration objects. Support for enabling or disabling column sorting, setting up multi-column sorting, toggling ascending or descending order through header interactions, and providing user-friendly sortable grid or data table interfaces that respond to header clicks enhances data manipulation and display. This feature applies to grids, data tables, or tabular views where sorting by columns is required to improve user experience and data organization.
</div>

#### Example - enable sorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: true
    });
    </script>

> Check [Sorting](https://demos.telerik.com/kendo-ui/grid/sorting) for a live demo.

### sortable.allowUnsort `Boolean` *(default: true)*

If set to `true` the user can get the grid in unsorted state by clicking the sorted column header.


<div class="meta-api-description">
Enable toggling of column sorting to allow users to clear or remove active sort orders by clicking on a sorted column header, supporting flexible control over data sorting, including turning sorting on and off, resetting sorted columns back to an unsorted or default state, disabling persistent sort locks, and configuring grid behaviors to let users easily switch between sorted and unsorted views through intuitive header interactions.
</div>

#### Example - do not allow unsorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: {
        allowUnsort: false
      }
    });
    </script>

### sortable.showIndexes `Boolean` *(default: true)*

If set to `true` the user will see sort sequence indicators for sorted columns.


<div class="meta-api-description">
enable or configure visible numeric indicators next to sorted column headers in multi-column sorting, display sort order numbers or priority markers to show the sequence of applied sorts, show numeric badges like 1, 2, or index labels for sorting precedence, control visual cues for sorting order in grid or table columns, activate sort index display for better user understanding of multi-column sort hierarchy, set or toggle sort order numbers to clarify sorting steps, highlight sorting priority with numeric markers in data grids or tables, reveal the order of sorted columns with numeric badges, enable visualization of the sorting sequence for multiple columns, configure display of numeric sorting indices for clearer multi-column sorting arrangement.
</div>

#### Example - do not allow unsorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: {
        showIndexes: true,
        mode: "multiple"
      }
    });
    </script>

### sortable.initialDirection `String` *(default: asc)*

Determines the inital (from un-sorted to sorted state) sort direction. The supported values are `asc` and `desc`.


<div class="meta-api-description">
Control the default sorting order when activating a column sort, specifying whether the initial sorting sequence starts ascending or descending, set the primary sort direction at the first user interaction or automatic grid refresh, customize initial column sort behavior, configure the sort toggle's default direction, define how data is arranged initially upon enabling sorting on any column, determine if the first applied sort arranges values from smallest to largest or largest to smallest, adjust starting sort sequence for grid data display, set default ascending or descending order for initial column sorting state, and manage how sort direction is initialized during grid setup or user-triggered sorts.
</div>

#### Example - disable sorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id" },
        { field: "name" }
      ],
      sortable: {
        initialDirection: "desc"
      },
      dataSource: [ { id: 1, name: "Jane Doe" }, { id: 2, name: "John Doe" } ]
    });
    </script>

### sortable.mode `String` *(default: "single")*

The sorting mode. If set to "single" the user can sort by one column. If set to "multiple" the user can sort by multiple columns. And the "mixed" mode enables you to sort in single mode when clicking and switch to multiple when holding **ctrl** key.


<div class="meta-api-description">
Set or configure sorting behavior for grid tables to enable sorting by a single column, multiple columns simultaneously, or a hybrid approach where single-click sorting applies by default and holding modifier keys like Ctrl triggers multi-column sorting; control how users can order data, toggle sort modes, prioritize sorting criteria, or manage interactive sorting features for grid views with options to switch between single, multiple, or combined sorting modes.
</div>

#### Example - allow multiple column sorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: {
        mode: "multiple"
      }
    });
    </script>

  #### Example - enable mixed mode sorting

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: {
        mode: "mixed",
        allowUnsort: true,
        showIndexes: true
      }
    });
    </script>


### dataLayoutMode `String`

Sets the Grid's data layout. Possible values are: `stacked`, `columns`.


<div class="meta-api-description">
Control the arrangement and organization of items within a grid or table, enabling the layout to be configured either as vertically stacked groups of fields per record or as traditional horizontal rows with columns, allowing developers to switch between a compact vertical stacking view and a classic column-based presentation to optimize data visibility, rendering style, and responsiveness based on user preference or device screen size, supporting scenarios where content needs to be displayed either in grouped sections or in standard tabular columns.
</div>

#### Example

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        dataLayoutMode: "stacked",
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: {
              id: "id"
            }
          }
        },
      });
    </script>

### stackedLayoutSettings `Object`

The `stacked` layout settings of the Grid.


<div class="meta-api-description">
Adjust the configuration for responsive or narrow screen layouts by enabling and customizing stacked views, controlling column stacking order and header behavior, managing visual appearance of collapsed grid columns, setting how grid elements reorder and display when switching from tabular to vertical stacking, and fine-tuning how data and headers adapt in compact or mobile views to optimize grid presentation under limited horizontal space.
</div>

#### Example - configure stacked layout settings

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { field: "city" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30, city: "New York" },
        { name: "John Doe", age: 33, city: "Boston" }
      ],
      dataLayoutMode: "stacked",
      stackedLayoutSettings: {
        cols: 2
      },
      height: 550
    });
    </script>

### stackedLayoutSettings.cols `Number|Array`

Sets the amount of columns in which the `stacked` cells will be displayed.
If set as `array`, the size of the array represents the number of columns, and the values represent the column widths. Possible values are: `string`, `number`, and `object`.


<div class="meta-api-description">
Configure the number of columns displayed in a stacked grid layout by setting their count and individual widths, allowing control over column sizing using single values or arrays with flexible formats like strings, numbers, or objects. Adjust, customize, define, or specify column widths and quantities for responsive, multi-column stack layouts, enabling precise layout management and column width assignments for grids that organize content vertically yet maintain horizontal column structures. This handles single or multiple column configurations with options to set fixed or dynamic widths, catering to various layout design needs and column-based content arrangements.
</div>

#### Example - cols set as number

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataLayoutMode: "stacked",
        stackedLayoutSettings: {
          cols: 2
        },
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: {
              id: "id"
            }
          }
        },
        selectable: {
          mode: "cell",
          cellAggregates: true
        },
        statusBarTemplate: ({ aggregates }) => `${aggregates.count}`
      });
    </script>

#### Example - cols set as array of strings

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataLayoutMode: "stacked",
        stackedLayoutSettings: {
          cols: ["1fr", "20px"]
        },
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: {
              id: "id"
            }
          }
        },
        selectable: {
          mode: "cell",
          cellAggregates: true
        },
        statusBarTemplate: ({ aggregates }) => `${aggregates.count}`
      });
    </script>

#### Example - cols set as array of numbers

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataLayoutMode: "stacked",
        stackedLayoutSettings: {
          cols: [100, 400]
        },
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: {
              id: "id"
            }
          }
        },
        selectable: {
          mode: "cell",
          cellAggregates: true
        },
        statusBarTemplate: ({ aggregates }) => `${aggregates.count}`
      });
    </script>

#### Example - cols set as array of objects

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataLayoutMode: "stacked",
        stackedLayoutSettings: {
          cols: [
            { width: 700 },
            { width: 300 }
          ]
        },
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: {
              id: "id"
            }
          }
        },
        selectable: {
          mode: "cell",
          cellAggregates: true
        },
        statusBarTemplate: ({ aggregates }) => `${aggregates.count}`
      });
    </script>


### statusBarTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the Status Bar/Aggregates Bar.


<div class="meta-api-description">
Control and customize the appearance and content of the grid’s status bar or aggregates bar by defining custom HTML or template code that dynamically renders totals, summaries, footers, and aggregate information. Enable tailored footer layouts, aggregate calculations, and display formats through templates that compile and inject custom content, allowing flexible presentation of grid summary data, roll-up values, and status indicators to meet specific formatting or business logic needs in your data grids.
</div>

#### Example

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: {
              id: "id"
            }
          }
        },
        selectable: {
          mode: "cell",
          cellAggregates: true
        },
        statusBarTemplate: ({ aggregates }) => `${aggregates.count}`
      });
    </script>

### toolbar `String|Function|Array|Object`

If a `String` value is assigned to the `toolbar` configuration option, it will be treated as a single string template for the whole grid Toolbar,
and the string value will be passed as an argument to a [`kendo.template()`](/api/javascript/kendo/methods/template) function.

If a `Function` value is assigned (it may be a kendo.template() function call or a generic function reference), then the return value of the function will be used to render the Grid Toolbar contents.

> If the grid is instantiated with MVVM, The template passed will not be bound to the grid view model context. You may bind the toolbar element manually afterwards, using `kendo.bind(gridWidgetInstance.element.find("k-grid-toolbar"))`

If an `Array` value is assigned, it will be treated as the list of commands displayed in the grid's Toolbar. Commands can be custom or built-in ("cancel", "create", "save", "excel", "pdf").

The "cancel" built-in command reverts any data changes done by the end user.

The "create" command adds an empty data item to the grid.

The "save" command persists any data changes done by the end user. When executed fires [`saveChanges`](/api/javascript/ui/grid/events/savechanges) grid event.

The "excel" command exports the grid data in MS Excel format. Fires [`excelExport`](/api/javascript/ui/grid/events/excelexport) grid event.

The "pdf" command exports the grid data in PDF format. Fires [`pdfExport`](/api/javascript/ui/grid/events/pdfexport) grid event.

The "search" command renders the built-in search panel for the grid.

The "columns" command renders a global column menu.

The "columns" command generates a button to open a [global columns menu]({% slug columnmenu_kendoui_grid_widget %}).

The "paste" command enables the user to switch between the "replace" and "insert" modes of the paste functionality. The [`allowPaste`](/api/javascript/ui/grid/configuration/allowpaste) configuration must enabled for the dropdown to appear.

The "sort" command enables the user to use the sorting functionallity of the grid.

The "filter" command enables the user to use the filtering functionallity of the grid.

The "columnChooser" command enables the user to change the visibillity of the grid's columns.

The "selectAll" command enables the user to select all rows if the grid is `selectable`. Requires enabled checkbox selection and multiple row selection.

* If an `Object` value is assigned, it will propagate these properties to the underlying Toolbar:
  * `items` - an array of commands as explained above
  * `overflow` - an object that configures the overflow behavior of the toolbar. The same as [`Toolbar.overflow`](/api/javascript/ui/toolbar/configuration/overflow) property


<div class="meta-api-description">
Configure and customize grid toolbar rendering and behavior flexibly by assigning templates, functions, arrays, or objects to define toolbar layout, commands, and overflow handling. Enable fine control over toolbar content using string templates processed by templating engines, function renderers for dynamic content generation, or arrays of built-in and custom commands like create, save, cancel, export to Excel/PDF, search, column menus, sorting, filtering, paste mode toggling, column visibility toggling, and multi-row selection commands. Adjust toolbar commands interactively, control overflow settings for responsive design, and support binding and MVVM scenarios manually when necessary. Optimize toolbar customization for various user interactions, event handling, export options, command configurations, and UI behavior in data grids.
</div>

#### Example - configure the Grid Toolbar as a string template

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: "<button class='k-button' onclick='myClick()'>My Button</button>",
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33},
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });

    function myClick() {
      kendo.alert("Clicked!")
    }
    </script>

#### Example - configure the Grid Toolbar template with a function

    <script type="x-kendo/template" id="template">
    	<button class='k-button' onclick='myClick()'>My Button</button>
    </script>

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: kendo.template($("#template").html()),
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33},
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });

    function myClick() {
      kendo.alert("Clicked!")
    }
    </script>

#### Example - configure the Grid Toolbar as an array of commands

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: [
        { name: "create" },
        { name: "save" },
        { name: "cancel" }
      ],
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33},
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    </script>

Apart from the built-in tools, the Grid fully exposes the [ToolBar.items API](/api/javascript/ui/toolbar/configuration/items). This way you can specify any custom tools in the widget using the components available in the ToolBar itself:

#### Example

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        toolbar: [ {
          type: "button",
          text: "Button"
        }, {
          type: "button",
          text: "Toggle",
          togglable: true,
          icon: "cancel"
        }, {
          type: "splitButton",
          text: "SplitButton",
          menuButtons: [{text: "Option 1"}, {text: "Option 2"}]
        },{
          name: "dropDownButton",
          type: "dropDownButton",
          text: "Country",
          menuButtons: [
            { id: "1", text: "Belgium" },
            { id: "2", text: "France" }
          ]
        },{
          name: "buttonGroup",
          type: "buttonGroup",
          buttons: [
            { text: "Option 1", togglable: true },
            { text: "Option 2", togglable: true },
            { text: "Option 3", togglable: true }
          ]
        }],
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33},
          ],
          schema: {
            model: { id: "id" }
          }
        },
        editable: true
      });
    </script>

### toolbar.items

An array collection of items to be rendered in the toolbar. Each item will be treated as the list of commands displayed in the grid's Toolbar. Commands can be custom or built-in ("cancel", "create", "save", "excel", "pdf").

- The "cancel" built-in command reverts any data changes done by the end user.

- The "create" command adds an empty data item to the grid.

- The "canceledit" command cancels the changes to the dataItem that is being currenly edited.

- The "update" command save the changes to the dataItem that is being currenly edited.

- The "destroy" command removes the selected item. To work as expected, the grid should be [selectable](/api/javascript/ui/grid/configuration/selectable). If multiple selection is enabled, the item which will be remoed is the last selected one.

- The "edit" command triggers the edit state of currently selected item. To work as expected, the grid should be [selectable](/api/javascript/ui/grid/configuration/selectable). If multiple selection is enabled, the item which will be edited is the last selected one.

- The "save" command persists any data changes done by the end user. When executed fires [`saveChanges`](/api/javascript/ui/grid/events/savechanges) grid event.

- The "excel" command exports the grid data in MS Excel format. Fires [`excelExport`](/api/javascript/ui/grid/events/excelexport) grid event.

- The "pdf" command exports the grid data in PDF format. Fires [`pdfExport`](/api/javascript/ui/grid/events/pdfexport) grid event.

- The "search" command renders the built-in search panel for the grid.

- The "columns" command renders a global column menu.

- The "columns" command generates a button to open a [global columns menu]({% slug columnmenu_kendoui_grid_widget %}).

- The "paste" command enables the user to switch between the "replace" and "insert" modes of the paste functionality. The [`allowPaste`](/api/javascript/ui/grid/configuration/allowpaste) configuration must enabled for the dropdown to appear.

- The "sort" command enables the user to use the sorting functionallity of the grid.

- The "filter" command enables the user to use the filtering functionallity of the grid.

- The "group" command enables the user to use the grouping functionallity of the grid.

- The "columnChooser" command enables the user to change the visibillity of the grid's columns.

- The "selectAll" command enables the user to select all rows if the grid is `selectable`.


<div class="meta-api-description">
Customize the grid toolbar by setting an array of commands and controls to add, remove, or modify built-in and custom buttons for actions like creating new rows, editing, canceling edits, saving changes, deleting selected items (with support for single or multiple selection), exporting data to Excel or PDF, searching within the grid, sorting, filtering, grouping, showing or hiding columns, toggling paste modes when paste is enabled, and selecting all rows. Control toolbar items to enable inline editing workflows, bulk actions, data export, dynamic column management, and enhanced user interaction within the grid interface through configurable commands such as create, edit, cancel, update, destroy, save, excel, pdf, search, columns, paste, sort, filter, group, columnChooser, and selectAll that respond to selection states and grid settings.
</div>

#### Example - configure toolbar items

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: {
        items: [
          { name: "create", text: "Add New" },
          { name: "excel", text: "Export to Excel" },
          { name: "pdf", iconClass: "k-icon k-i-file-pdf" },
          { name: "custom", text: "Custom Action", template: "<button class='k-button' onclick='customAction()'>Custom</button>" }
        ]
      },
      editable: true
    });
    
    function customAction() {
      alert("Custom action executed!");
    }
    </script>

### toolbar.items.iconClass `String`

The class for the [web font icon](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) of the button that will be rendered in the toolbar.

> Grid commands are rendered as anchors (`<a>`) with a `span` inside. The icon for the button depends on the **iconClass** which is rendered as a class for the inner span.
> Built-in commands have a predefined **iconClass** value.


<div class="meta-api-description">
Customize or configure the CSS class, style, or visual appearance of toolbar button icons within a data grid or table interface by specifying or setting the icon font class, enabling control over which icon is displayed on command buttons, action items, or toolbar controls using web font icons, icon fonts, or CSS classes applied to button elements or anchor tags. This covers how to change, override, or assign icon representations for toolbar commands, menu buttons, or grid toolbar actions through CSS class names that determine the icon graphics shown in the user interface.
</div>

#### Example - configure toolbar item icon class

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: {
        items: [
          { name: "create", iconClass: "k-icon k-i-plus", text: "Add" },
          { name: "excel", iconClass: "k-icon k-i-file-excel" }
        ]
      },
      editable: true
    });
    </script>

### toolbar.items.name `String`

The name of the toolbar command. Either a built-in ("cancel", "create", "save", "excel", "pdf") or custom. The `name` is reflected in one of the CSS classes, which is applied to the button - `k-grid-name`.
This class can be used to obtain reference to the button after Grid initialization and attach click handlers.


<div class="meta-api-description">
Configure or set custom and predefined toolbar command names such as cancel, create, save, excel, or pdf for data grids, enabling easy identification and styling of grid buttons through CSS classes like k-grid-name, allowing developers to select, customize, or attach event handlers and click actions after grid initialization, supporting scenarios for enabling or modifying toolbar button behavior, command binding, and UI interaction customization within grid components.
</div>

#### Example - configure toolbar item name

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: {
        items: [
          { name: "myCustomCommand", text: "My Command" }
        ]
      }
    });
    
    // Access button by CSS class derived from name
    $(".k-grid-myCustomCommand").click(function() {
      alert("Custom command clicked!");
    });
    </script>

### toolbar.items.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the command. By default renders a button.

> Check [Toolbar template](https://demos.telerik.com/kendo-ui/grid/toolbar-template) for a live demo.


<div class="meta-api-description">
Customize toolbar commands in a grid by configuring or setting custom templates that control how buttons, icons, HTML markup, or interactive elements appear within the toolbar area. Enable rendering of personalized toolbar items using template functions to replace default buttons with tailored content, including custom icons, links, or complex HTML. This supports styling, dynamic content, and advanced UI elements in grid toolbars, allowing developers to design and control toolbar commands beyond default behaviors or appearances through customizable templateization.
</div>

#### Example - configure toolbar item template

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: {
        items: [
          { 
            name: "customDropDown", 
            template: (data) => `<select class="k-dropdown">
                        <option>Option 1</option>
                        <option>Option 2</option>
                        <option>Option 3</option>
                      </select>`
          }
        ]
      }
    });
    </script>

### toolbar.items.text `String`

The text displayed by the command button. If not set the [name](toolbar.name) option would be used as the button text instead.


<div class="meta-api-description">
Set or customize the label, caption, or button text displayed on toolbar command buttons within a grid interface, allowing control over toolbar item names and captions, enabling configuration or modification of toolbar button texts, labels, or titles during initialization, supporting customization of interface elements for commands, actions, or controls in toolbars, and providing fallback behavior when specific texts are not set by using default or named toolbar identifiers as button labels.
</div>

#### Example - configure toolbar item text

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: {
        items: [
          { name: "create", text: "Add New Record" },
          { name: "excel", text: "Download Excel" }
        ]
      },
      editable: true
    });
    </script>

### toolbar.items.clearButton `boolean`

Show a clear all sorts or clear all filters button.

> Only applicable for Sort,Filter, and Group tools.


<div class="meta-api-description">
Control a toolbar option that lets users remove all current sorting, filtering, or grouping criteria applied to a data grid, providing a quick way to reset views and restore the default dataset order and visibility by adding a clear or reset button. This feature enables functionality to erase active filters, cancel sorts, or undo groups with one action, improving data exploration and manipulation workflows by allowing developers to configure, enable, or show a single button that clears all sorting, filtering, and grouping states simultaneously in grid interfaces using sorting, filtering, or grouping tools.
</div>

#### Example - configure clear button for toolbar items

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: true,
      filterable: true,
      groupable: true,
      toolbar: {
        items: [
          { name: "sort", clearButton: true },
          { name: "filter", clearButton: true },
          { name: "group", clearButton: true }
        ]
      }
    });
    </script>

### toolbar.iconClass `String`

The class for the [web font icon](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web) of the button that will be rendered in the toolbar.

> Grid commands are rendered as anchors (`<a>`) with a `span` inside. The icon for the button depends on the **iconClass** which is rendered as a class for the inner span.
> Built-in commands have a predefined **iconClass** value.


<div class="meta-api-description">
Adjust or configure the toolbar button icon in a grid interface by assigning a CSS class that applies a web font icon, enabling control over the visual appearance of command buttons. This includes setting or overriding icon styles for toolbar actions using class names that target inner span elements, allowing customization or replacement of default predefined icon classes for built-in commands. Users seeking to customize, style, or change toolbar icons, define icon fonts, or control visual button representation in grids will find this relevant for modifying how command icons are displayed in grid toolbars.
</div>

#### Example - provide an iconClass for a toolbar command

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: [
        { name: "copy", iconClass: "k-icon k-i-copy" },
        { name: "save" },
        { name: "custom" }
      ],
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    </script>

### toolbar.overflow `Object`
Specifies [`Toolbar.overflow`](/api/javascript/ui/toolbar/configuration/overflow) configuration for the toolbar.


<div class="meta-api-description">
Manage how toolbar items behave when space is limited by configuring overflow handling, enabling grouping or collapsing of extra buttons into an overflow menu, adjusting responsive layout for toolbar actions, controlling display and accessibility of toolbar commands when there isn’t enough room, setting options to show, hide, or wrap toolbar elements dynamically, and customizing interaction patterns for toolbar overflow in grid interfaces.
</div>

#### Example - configure toolbar overflow settings

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: {
        items: [
          { name: "create" },
          { name: "excel" },
          { name: "pdf" },
          { name: "custom1", text: "Action 1" },
          { name: "custom2", text: "Action 2" }
        ],
        overflow: {
          mode: "scroll",
          scrollButtons: "visible",
          scrollButtonsPosition: "split",
          scrollDistance: 100
        }
      },
      editable: true
    });
    </script>

### toolbar.overflow.mode `String` *(default: "menu")*

Defines the overflow mode. The available options are:
- `"menu"` — Moves overflowing items into a dropdown menu.
- `"scroll"` — Keeps items visible and enables horizontal scrolling.
- `"section"` — Groups items into collapsible sections.
- `"none"` — Disables overflow handling; items may be cut off.

> The new Sort, Filter, ColumnChooser tools will not work as expected with the `menu` option. Currently these tools are not supported by the overflow menu. It is recomended to use the `scroll` options when using any of these tools.


<div class="meta-api-description">
Control how toolbar items that exceed the available space are managed by configuring overflow behavior such as enabling a dropdown menu to group extra buttons, allowing horizontal scrolling to keep all items visible, organizing items into collapsible sections for compact display, or disabling overflow handling which may clip excess elements. Adjust settings to choose between menu-based overflow, scroll-enabled toolbar, sectioned grouping, or no overflow management, while considering compatibility issues like some tools not working with dropdown menus and preferring scroll mode for full functionality. Customize toolbar item overflow handling for a responsive, accessible, and user-friendly grid interface with options to set, configure, enable, or disable scrolling, grouping, or dropdown overflow solutions.
</div>

#### Example - configure toolbar overflow mode

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: {
        items: [
          { name: "create" },
          { name: "excel" },
          { name: "pdf" },
          { name: "custom", text: "Custom Action" }
        ],
        overflow: {
          mode: "scroll"
        }
      },
      editable: true
    });
    </script>

### toolbar.overflow.scrollButtons `String` *(default: "auto")*

Defines the visibility of scroll buttons when `mode` is `"scroll"`. The available options are:
- `"auto"` — Displays scroll buttons only when needed.
- `"hidden"` — Hides the scroll buttons at all times.
- `"visible"` — Always shows the scroll buttons.


<div class="meta-api-description">
Control the visibility and behavior of scroll buttons for toolbar overflow in a grid or data table when the toolbar scroll mode is enabled, allowing you to configure whether scroll arrows appear always, never, or only when necessary during horizontal toolbar overflow scenarios, enabling precise customization for enabling, disabling, showing, hiding, or auto-displaying navigation buttons to manage toolbar content that exceeds the available viewing area.
</div>

#### Example - configure toolbar overflow scroll buttons

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: {
        items: [
          { name: "create" },
          { name: "excel" },
          { name: "pdf" }
        ],
        overflow: {
          mode: "scroll",
          scrollButtons: "visible"
        }
      },
      editable: true
    });
    </script>

### toolbar.overflow.scrollButtonsPosition `String` *(default: "split")*

Defines the placement of scroll buttons. The available options are:
- `"split"` — Scroll buttons appear at both ends of the toolbar.
- `"start"` — Scroll buttons appear only at the start of the toolbar.
- `"end"` — Scroll buttons appear only at the end of the toolbar.


<div class="meta-api-description">
Customize or set the location of scroll buttons within toolbar overflow areas to align with different layout directions, responsive designs, or unique toolbar styles. Configure scroll control placement to appear at the beginning, the end, or split at both ends of the toolbar overflow to optimize user navigation experience. Enable, adjust, or control horizontal scroll button positioning for toolbars in grid components, ensuring smooth scrolling behavior and consistent interface alignment with left-to-right, right-to-left, or custom UI layouts. Determine scroll button placement to match toolbar design preferences, improve accessibility, or enhance interactive scrolling in overflow scenarios.
</div>

#### Example - configure toolbar overflow scroll buttons position

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: {
        items: [
          { name: "create" },
          { name: "excel" },
          { name: "pdf" }
        ],
        overflow: {
          mode: "scroll",
          scrollButtons: "visible",
          scrollButtonsPosition: "end"
        }
      },
      editable: true
    });
    </script>

### toolbar.overflow.scrollDistance `Number` *(default: 50)*

Specifies the distance (in pixels) the toolbar scrolls when a scroll button is clicked.


<div class="meta-api-description">
Adjust the horizontal scroll amount or step size when navigating toolbar overflow buttons in a grid interface, controlling how many pixels the toolbar shifts with each click to customize scrolling sensitivity, speed, or distance for overflow navigation. Configure scrolling increments, scrolling distance, step scroll values, or per-click movement for toolbar overflow controls to fine-tune user interaction with horizontal scrollable toolbars and manage how far the toolbar content moves on each scroll action. This setting enables customizing the toolbar’s overflow scroll step size, scroll jump distance, or scroll offset when scrolling through toolbar items that exceed the visible width, enhancing control over toolbar overflow navigation behavior and scroll responsiveness.
</div>

#### Example - configure toolbar overflow scroll distance

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      toolbar: {
        items: [
          { name: "create" },
          { name: "excel" },
          { name: "pdf" }
        ],
        overflow: {
          mode: "scroll",
          scrollDistance: 75
        }
      },
      editable: true
    });
    </script>


### toolbar.name `String`

The name of the toolbar command. Either a built-in ("cancel", "create", "save", "excel", "pdf") or custom. When a custom command is added the `name` is reflected in one of the CSS classes, which is applied to the button - `k-grid-name`.
This class can be used to obtain reference to the button after Grid initialization and attach click handlers.


<div class="meta-api-description">
Configure or specify toolbar command identifiers for grid interface buttons, including built-in actions like cancel, create, save, export to excel, and export to pdf, or define custom command names to uniquely identify buttons via CSS classes for styling and interaction purposes, enabling developers to target, customize, or programmatically control toolbar buttons, attach event handlers, and manage command behavior within grid toolbars using consistent naming conventions and selectors.
</div>

#### Example - specify the name of the command

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: [
        { name: "create" },
        { name: "save" },
        { name: "custom" }
      ],
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });

    $(".k-grid-custom").click(function(e){
        // handler body
    });
    </script>

### toolbar.showInactiveTools `Boolean`

If set to true, the toolbar will show the inactive tools in a disabled state. Otherwise the tools will be hidden.


<div class="meta-api-description">
Configure the visibility and appearance of inactive toolbar buttons within a grid interface by enabling or disabling the display of tools that are currently not active, allowing them to be shown as disabled or completely hidden based on user preference or interface requirements. This setting controls whether inactive or disabled toolbar options are visible for user reference or hidden to reduce clutter, supporting customization of toolbar behavior, appearance, and interactivity during setup or runtime. Adjust how inactive or inactive-state controls are presented, whether grayed out, disabled, or removed, to optimize user experience and interface clarity across different grid implementations.
</div>

#### Example - show inactive tools in disabled state

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      sortable: true,
      filterable: true,
      groupable: true,
      toolbar: {
        items: [
          { name: "sort" },
          { name: "filter" },
          { name: "group" }
        ],
        showInactiveTools: true
      }
    });
    </script>

### toolbar.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the command. By default renders a button.


<div class="meta-api-description">
Customize or configure the appearance and HTML structure of grid toolbar commands by setting or defining templates that control how toolbar buttons or commands render, enabling you to change default button layouts, insert custom markup, adjust command visuals, and tailor toolbar command elements for grids to suit different UI needs or branding. Control or set custom templates that enable modifying the rendering output of grid toolbar actions, allowing flexible customization of toolbar commands’ look and feel beyond standard buttons during grid setup or initialization.
</div>

#### Example - set the template as a function

    <div id="grid"></div>
    <script id="template" type="text/x-kendo-template">
    <a class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" href="\#" onclick="return toolbar_click()">Command</a>
    </script>
    <script>
    function toolbar_click() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Toolbar command is clicked!");
      return false;
    }
    $("#grid").kendoGrid({
      toolbar: [
        { template: kendo.template($("#template").html()) }
      ],
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    </script>

> Check [Toolbar template](https://demos.telerik.com/kendo-ui/grid/toolbar-template) for a live demo.

#### Example - set the template as a string

    <div id="grid"></div>
    <script>
    function toolbar_click() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Toolbar command is clicked!");
      return false;
    }
    $("#grid").kendoGrid({
      toolbar: [
        {
          template: '<a class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" href="\\#" onclick="return toolbar_click()">Command</a>'
        }
      ],
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    </script>

### toolbar.text `String`

The text displayed by the command button. If not set the [name](toolbar.name) option would be used as the button text instead.


<div class="meta-api-description">
Control, set, or customize the visible caption or label of toolbar buttons within a grid interface, enabling you to change command button text, override default button names, localize or translate toolbar captions, configure button labels for different commands or actions, and adjust the displayed text on grid toolbar buttons to match user language preferences or branding requirements.
</div>

#### Example - set the text of the toolbar button

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: [
        { name: "create", text: "Add new" }
      ],
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { id: 1, name: "Jane Doe", age: 30 },
        { id: 2, name: "John Doe", age: 33 }
      ],
      editable: true
    });
    </script>

### width `Number|String`

The width of the grid. Numeric values are treated as pixels.


<div class="meta-api-description">
Control and configure the horizontal dimension, width, or overall size of a grid or layout container to set fixed or responsive pixel-based widths, define column fitting behavior, adjust grid or container sizing during initialization or dynamically resize horizontally, manage layout constraints, set explicit pixel widths, and tailor the grid’s total horizontal span for precise alignment and responsive design.
</div>

#### Example - set the width as a number

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: [
        { productName: "Tea", category: "Beverages" },
        { productName: "Coffee", category: "Beverages" },
        { productName: "Ham", category: "Food" },
        { productName: "Bread", category: "Food" }
      ],
      width: 1000
    });
    </script>

## Fields

### columns `Array`

The columns of the grid initialized from the [columns](/api/javascript/ui/grid/configuration/columns) option. every item from the `columns` array has the same fields as the corresponding [columns](/api/javascript/ui/grid/configuration/columns) option.


<div class="meta-api-description">
Retrieve, inspect, or modify the set of column configurations used in a grid or table after it has been initialized, including accessing column properties, definitions, order, widths, data fields, and visibility states that were originally set during setup. This enables dynamic reading or updating of column settings such as headers, sorting options, filtering criteria, or layout adjustments at runtime, allowing developers to control, customize, or interact with the grid’s column structure programmatically after initial configuration.
</div>

#### Example - iterate the grid columns

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    for (var i = 0; i < grid.columns.length; i++) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(grid.columns[i].field); // displays "name" and then "age"
    }
    </script>

### dataSource `kendo.data.DataSource`

The [data source](/api/javascript/data/datasource) of the widget. Configured via the [dataSource](/api/javascript/ui/grid/configuration/datasource) option.

> Changes to the data source will be reflected in the widget.

> Assigning a new data source would have no effect. Use the [setDataSource](/api/javascript/ui/grid/methods/setdatasource) method instead.


<div class="meta-api-description">
Retrieve or manipulate the current data source instance bound to the grid, enabling access to the dataset, query items, check or update paging and sorting states, monitor data changes, or subscribe to data events dynamically at runtime. Developers often search for ways to get or inspect the underlying data collection, connect or hook into datasource updates, query filtered or sorted data, handle pagination programmatically, or track data mutations in the grid’s bound dataset without replacing the data source entirely. This is useful for reading dataset contents, synchronizing UI with data updates, customizing data handling, or integrating with external data operations, all while keeping the original data source object intact during user interactions or application logic.
</div>

#### Example - add a data item to the data source

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30}
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.dataSource.add({ name: "John Doe", age: 33 });
    </script>

#### Example - update a data item in the data source

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    var data = grid.dataSource.at(0);
    data.set("name", "John Doe");
    </script>

#### Example - remove a data item from the data source

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30},
        { name: "John Doe", age: 33},
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    var data = grid.dataSource.at(1);
    grid.dataSource.remove(data);
    </script>

### footer `jQuery`

The jQuery object which represents the grid footer element.


<div class="meta-api-description">
Obtain and control the footer section of a grid or table layout by retrieving the element that contains summary rows, totals, or aggregate data, enabling manipulation of footer content, styles, structure, and event handling; use this to dynamically update footer cells, apply custom formatting, respond to user interactions in the footer area, query specific footer elements, or refresh aggregate calculations after the grid has been rendered or updated.
</div>

#### Example - hightligh the cells within the footer of the grid

    <div id="grid"></div>
    <br />
    <button id="btn" class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base'>Highlight footer row's cells</button>

    <script>
      let encode = kendo.htmlEncode;
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age",
            footerTemplate: ({ age }) => `Min: ${encode(age.min)} Max: ${encode(age.max)}`
          }
        ],
        dataSource: {
          data: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 }
          ],
          aggregate: [
            { field: "age", aggregate: "min" },
            { field: "age", aggregate: "max" }
          ]
        }
      });

      $("#btn").click(function(e){
        var gridFooter = $("#grid").getKendoGrid().footer;
        var cells = gridFooter.find("td");
        cells.css("background-color", "#90EE90");
      });
    </script>


### pager `kendo.ui.Pager`

The [Pager widget](/api/javascript/ui/pager) attached to the Grid.


<div class="meta-api-description">
Configure and control data grid pagination controls, manage page navigation and page size settings, enable or customize page actions, access pager widget methods and state, update pagination behavior dynamically, set up paging UI elements, adjust navigation buttons, and manipulate paging parameters to control how users browse large datasets within a grid component.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: {
        data: [
          { productName: "Tea", category: "Beverages" },
          { productName: "Coffee", category: "Beverages" },
          { productName: "Ham", category: "Food" },
          { productName: "Bread", category: "Food" }
        ],
        pageSize: 2
      },
      pageable: true
    });

    var grid = $("#grid").data("kendoGrid");
    var pager = grid.pager;
    
    // Access the pager widget methods
    console.log("Current page:", pager.page());
    console.log("Total pages:", pager.totalPages());
    
    // Navigate to a specific page
    pager.page(2);
    </script>

### table `jQuery`

The jQuery object which represents the grid table element.


<div class="meta-api-description">
Access and control the underlying HTML table element of a grid component by retrieving its jQuery object reference after setup, enabling developers to query the DOM, attach event handlers, measure layout dimensions, perform custom manipulations, interact with native browser events, or apply jQuery methods for dynamic updates and advanced customization of the grid's table structure.
</div>

#### Example - get the Grid alternating rows

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { name: "Jane Doe", age: 30},
          { name: "John Doe", age: 33},
        ]
      });
      var grid = $("#grid").data("kendoGrid");
      var altRows = grid.table.find("tr.k-alt");
      altRows.css("background", "#afeeee");
    </script>

### tbody `jQuery`

The jQuery object which represents the table body. Contains all grid table rows.


<div class="meta-api-description">
Retrieve or manipulate the grid’s table body element using the jQuery object representing all rendered rows, enabling tasks such as selecting row elements, attaching event handlers to rows, modifying or appending table body content, performing DOM queries like find specific rows, dynamically updating or removing rows, measuring layout dimensions, and controlling row-level interactions within the grid’s body section.
</div>

#### Example - get the first table row

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30},
        { name: "John Doe", age: 33},
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    var row = grid.tbody.find("tr:eq(0)");
    var data = grid.dataItem(row);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(data.name); // displays "Jane Doe"
    </script>

### thead `jQuery`

The jQuery object which represents the grid table header element.


<div class="meta-api-description">
Access and manipulate the table's header element for dynamic customization, enabling reading or updating header HTML markup, styling or adding CSS classes, measuring header height or dimensions, querying individual header cells or columns, and attaching event listeners or custom handlers to enable interactive behavior, all through a manipulable DOM or jQuery-like object representing the grid's header row for advanced control over the grid's column headers and user interface elements.
</div>

#### Example - hightligh the cells within the header row of the grid

    <div id="grid"></div>
    <br />
    <button id="btn" class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base'>Highlight header row's cells</button>

    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age"}
        ],
        dataSource: {
          data: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 }
          ]
        }
      });

      $("#btn").click(function(e){
        var gridHead = $("#grid").getKendoGrid().thead;
        var cells = gridHead.find("th");
        cells.css("background-color", "#90EE90");
      });
    </script>

### content `jQuery`

The jQuery object which represents the grid content element, which holds the scrollable content. Available only when `scrollable` is set to `true`.


<div class="meta-api-description">
Accessing the scrollable content area of a grid enables retrieving the DOM element or jQuery object that contains all rows and cells, allowing developers to measure dimensions, perform programmatic scrolling, bind event listeners for user interactions, dynamically manipulate or update visible data, respond to scroll events, and control content rendering when scrolling is enabled. This interaction facilitates precise control over the grid’s viewport, scrolling behavior, and content layout adjustments during runtime, especially in scenarios requiring dynamic updates, custom scroll animations, or integration with external event handling in scrollable grid interfaces.
</div>

#### Example - hightligh the cells within the content of the grid

    <div id="grid"></div>
    <br />
    <button id="btn" class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base'>Highlight content's cells</button>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "id", width:200 },
          { field: "name", width:800 }
        ],
        scrollable: true,
        dataSource: [ { id: 1, name: "Jane Doe" }, { id: 2, name: "John Doe" } ]
      });

      $("#btn").click(function(e){
        var gridContent = $("#grid").getKendoGrid().content;
        var cells = gridContent.find("td");
      	cells.css("color", "green");
      });
    </script>


### lockedHeader `jQuery`

The jQuery object which represents the grid locked header element. Available only in a grid with locked columns.


<div class="meta-api-description">
Access or retrieve the locked header element of a data grid when columns are locked, enabling manipulation, customization, or interaction with the fixed header part of a grid layout; useful for developers looking to control, query, update, or style the header section that remains stationary during horizontal scrolling, accessible as a jQuery object after grid initialization only if locked columns exist, otherwise unavailable or undefined.
</div>

#### Example - get the header cells of the locked content

    <div id="grid"></div>
    <script>
      var grid = $("#grid").kendoGrid({
        columns: [
          { field: "name", locked: true, width: 640 },
          { field: "age", width: 450 }
        ],
        dataSource: {
          data: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 }
          ]
        }
      }).data("kendoGrid");

      var lockedHeaderElement = grid.lockedHeader;
      var lockedHeaderField = lockedHeaderElement.find("th").css("background-color", "#90EE90");
    </script>

### lockedTable `jQuery`

The jQuery object which represents the grid locked table element. Available only in a grid with locked columns.


<div class="meta-api-description">
Access or manipulate the locked columns section of a grid by obtaining the jQuery object representing the locked table to inspect DOM elements, measure column widths, apply custom styles, attach event handlers, or interact with fixed or frozen columns in grids that support column locking, enabling control over the locked panel’s structure and behavior once the grid with locked columns has been initialized.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", locked: true, width: 250 },
        { field: "name", locked: true, width: 250 },
        { field: "age", width: 250 }
      ],
      dataSource: [
        { id: 1, name: "Jane Doe", age: 31 },
        { id: 2, name: "John Doe", age: 33 }
      ]
    });

    var grid = $("#grid").data("kendoGrid");
    var lockedTable = grid.lockedTable;
    
    // Style the locked table
    lockedTable.css("border", "2px solid red");
    console.log("Locked table element:", lockedTable);
    </script>

### lockedContent `jQuery`

The jQuery object which represents the grid locked content element. Available only in a grid with locked columns.


<div class="meta-api-description">
Retrieve or interact with the section of a data grid that contains locked or frozen columns, enabling developers to measure dimensions, modify styles, attach event listeners, or manipulate the locked portion of the grid’s DOM. This feature provides access to a jQuery-wrapped element representing the grid’s locked content area, useful for customizing locked columns, handling scroll synchronization, dynamically updating locked sections, or applying specific behaviors and event handlers to fixed columns in tabular data displays once the grid is initialized and contains fixed or frozen columns.
</div>

#### Example - get the locked column field name

    <div id="grid"></div>
    <script>
      var grid = $("#grid").kendoGrid({
        columns: [
          { field: "name", locked: true, width: 640 },
          { field: "age", width: 450 }
        ],
        dataSource: {
          data: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 }
          ]
        }
      }).data("kendoGrid");

      var lockedHeaderElement = grid.lockedHeader;
      var lockedHeaderField = lockedHeaderElement.find("th").attr('data-field');
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(lockedHeaderField); // logs "name"
    </script>

## Methods

### addRow

Adds an empty data item to the grid. In "incell" and "inline" editing mode a table row will be appended. Popup window will be displayed in "popup" editing mode.

Fires the [edit](/api/javascript/ui/grid/events/edit) event.


<div class="meta-api-description">
Insert a new blank row or entry into a data grid and automatically enable editing for that row, supporting different editing modes such as inline, incell, or popup editor windows; enable adding fresh data items dynamically with the ability to trigger events for customizing, prefilling, or validating the new row's content before or during edit mode initiation, allowing seamless integration for adding, creating, or inserting rows programmatically while controlling how and where users input data in tabular interfaces.
</div>

#### Example - add a new data item

    <button id="add">Add a new row</button>
    <div id="grid"></div>
    <script>
      $("#add").kendoButton({
        themeColor: "success",
        click: function() {
          var grid = $("#grid").data("kendoGrid");
          grid.addRow();
        }
      });

      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: { id: "id" }
          }
        },
        editable: true,
        toolbar: ["save"]
      });
    </script>

### autoFitColumn

Applies the minimum possible width for the specified column, so that all text fits without wrapping.


<div class="meta-api-description">
automatically resize or auto-fit a grid column to match its content width, dynamically adjusting the column size so all cell text fits on a single line without wrapping or truncation, enabling content-based column width adjustment, controlling column sizing to prevent text overflow or wrapping, setting column width automatically based on cell data length or content size, optimizing grid layout by resizing columns to fit their displayed text, enabling autosizing or auto-resizing of specific columns to fit content perfectly in grids or tables.
</div>

#### Parameters

##### column `Number|String|Object`

The index of the column, or the [field](/api/javascript/ui/grid/configuration/columns.field) to which the columns is bound, or the column object obtained from the [columns](/api/javascript/ui/grid/fields/columns) collection.

When using multicolumn headers, using an index is not allowed. In such scenarios, please use a field name or a column object as a method argument.

> The method ignores and does not resize [hidden](/api/javascript/ui/grid/configuration/columns.hidden) columns.
>
> Auto-fitting all columns at once is a resource-intensive operation and is not recommended. A better option is to auto-fit only a few columns that have the most variable content in terms of length. Alternatively, disable scrolling and allow the [browser to adjust all column widths automatically](slug://width_kendoui_grid_widget), according to their content.
>
> Use `autoFitColumn` only after the Grid has been databound. Executing the method immediately after Grid initialization makes no sense and can lead to undesired behavior.

#### Example - autofit a column by index

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.autoFitColumn(1);
    </script>

#### Example - autofit a column by field

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.autoFitColumn("age");
    </script>

#### Example - autofit a column by column object reference

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        columns: [{
            title: "Person",
            columns: [
                { field: "fname", title: "First name"},
                { field: "lname", title: "Last name"}
            ]}, {
                field: "age"
            }
        ],
        dataSource: [
            { fname: "Jane", lname: "Smith", age: 30 },
            { fname: "John", lname: "Stevens", age: 33 }
        ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.autoFitColumn(grid.columns[0].columns[1]);
    </script>

### autoFitColumns

Applies the minimum possible width for all columns, so that all text fits without wrapping.

> The method ignores and does not resize [hidden](/api/javascript/ui/grid/configuration/columns.hidden) columns.
>
> Auto-fitting all columns at once is a resource-intensive operation and is not recommended. A better option is to auto-fit only a few columns ([autoFitColumn](/api/javascript/ui/grid/methods/autoFitColumn)) that have the most variable content in terms of length. Alternatively, disable scrolling and allow the [browser to adjust all column widths automatically](slug://width_kendoui_grid_widget), according to their content.
>
> Use `autoFitColumns` only after the Grid has been databound. Executing the method immediately after Grid initialization makes no sense and can lead to undesired behavior.


<div class="meta-api-description">
Automatically resize all visible grid columns to the smallest width that fully displays their content without text wrapping, excluding any hidden columns from adjustment; optimize column widths simultaneously to fit data, control dynamic sizing for variable columns, manage grid layout responsiveness, and trigger resizing only after data is loaded to avoid errors, helping with auto-adjusting, fitting, configuring, or recalibrating column widths while ignoring hidden elements and minimizing performance impact during bulk operations.
</div>

#### Parameters

##### columns `Array` *optional*

A set of column objects obtained from the [columns](/api/javascript/ui/grid/fields/columns) collection. If parameter is not provided all Grid columns will be auto-fitted.

#### Example - autofit all collumns

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        columns: [{
            title: "Person",
            columns: [
                { field: "fname", title: "First name"},
                { field: "lname", title: "Last name"}
            ]}, {
                field: "age"
            }
        ],
        dataSource: [
            { fname: "Jane", lname: "Smith", age: 30 },
            { fname: "John", lname: "Stevens", age: 33 }
        ],
        dataBound: function (e) {
            e.sender.autoFitColumns();
        },
    });
    </script>

#### Example - autofit set of columns

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        columns: [{
            title: "Person",
            columns: [
                { field: "fname", title: "First name"},
                { field: "lname", title: "Last name"}
            ]}, {
                field: "age"
            }
        ],
        dataSource: [
            { fname: "Jane", lname: "Smith", age: 30 },
            { fname: "John", lname: "Stevens", age: 33 }
        ],
        dataBound: function (e) {
            var grid = e.sender;
            grid.autoFitColumns(grid.columns[0].columns);
        },
    });
    </script>

### cancelChanges

Cancels any pending changes in the data source. Deleted data items are restored, new data items are removed and updated data items are restored to their initial state.


<div class="meta-api-description">
Undo all unsaved modifications in a data grid by reverting changes, discarding edits, restoring deleted entries, removing newly added rows, and resetting updated items to their original values. This functionality enables canceling pending updates, rolling back data source alterations, resetting changes before save or sync, and managing client-side edits to maintain consistent underlying data. Use to revert temporary edits, recover deleted data, undo insertions, and restore modified records to their last committed state without persisting changes.
</div>

#### Example

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: { id: "id" }
          }
        },
        editable: true
      });
      var grid = $("#grid").data("kendoGrid");
      grid.addRow();

      setTimeout(function(){
        grid.cancelChanges();
      }, 1000);
    </script>

### cancelRow

Cancels editing for the table row which is in edit mode. Reverts any changes made.


<div class="meta-api-description">
Stop or undo changes during inline editing of a table row, revert modified field values back to their original state before editing began, exit edit mode on rows currently being edited, discard unsaved edits in a grid or data table, programmatically cancel ongoing row edits, reset row data to its last saved version, interrupt or abort editing processes on a selected row, handle scenarios where users want to discard modifications without saving, roll back changes made during row edit sessions, control and manage editable row states to restore original content before committing updates.
</div>

#### Example - cancel editing

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: { id: "id" }
          }
        },
        editable: true
      });
      var grid = $("#grid").data("kendoGrid");
      grid.addRow();

      setTimeout(function(){
        grid.cancelRow();
      }, 1000);
    </script>

### cellIndex

Returns the index of the specified table cell. Skips group and detail table cells.


<div class="meta-api-description">
Find the zero-based position or index of a specific table cell within a rendered grid row while ignoring group rows or detail cells, enabling developers to identify, highlight, map, or manipulate data columns accurately during user interactions like clicks, edits, keyboard navigation, or dynamic rendering, supporting tasks such as cell location, selection management, event handling, and aligning DOM elements with underlying data structures in complex grid layouts.
</div>

#### Parameters

##### cell `String|Element|jQuery`

A string, DOM element or jQuery object which represents the table cell. A string is treated as a jQuery selector. If there are locked columns in the Grid, the jQuery object, representing the cell, must be passed as an argument.

#### Returns

`Number` the index of the specified table cell.

#### Example - find the cell index when the cell is a jQuery object

    <div id="grid"></div>
    <script>
    let encode = kendo.htmlEncode;
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 },
      ],
      detailTemplate: ({ name, age }) => `<div>Name: ${encode(name)}</div><div>Age: ${encode(age)}</div>`
    });
    var grid = $("#grid").data("kendoGrid");
    var cell = $("#grid td:eq(1)");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(grid.cellIndex(cell));
    </script>

#### Example - find the cell index when the cell is a string

    <div id="grid"></div>
    <script>
    let encode = kendo.htmlEncode;
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 },
      ],
      detailTemplate: ({ name, age }) => `<div>Name: ${encode(name)}</div><div>Age: ${encode(age)}</div>`
    });
    var grid = $("#grid").data("kendoGrid");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(grid.cellIndex("td:eq(1)"));
    </script>

### clearSelection

Clears the currently selected table rows or cells (depending on the current selection [mode](/api/javascript/ui/grid/configuration/selectable)).

> By default clearSelection will clear the selected rows on the current page only when [persistSelection](/api/javascript/ui/grid/configuration/persistselection) is enabled. In order to clear all selected rows follow the approach in [this Knowledge Base article](https://docs.telerik.com/kendo-ui/knowledge-base/clear-selection-all-pages-grid).


<div class="meta-api-description">
Clear or reset the currently selected rows or cells in a grid or table interface, remove highlighted or active selections, deselect all items whether limited to the current page or across multiple pages, disable selection highlights, reset selection state, clear checked or selected checkboxes, erase row or cell focus, control selection clearing behavior in different modes including persistSelection, and handle bulk deselection actions programmatically or interactively within data grids or tabular UI components.
</div>

#### Example - clear selection

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 },
      ],
      selectable: true
    });
    var grid = $("#grid").data("kendoGrid");
    // select the first table row
    grid.select("tr:eq(1)");
    grid.clearSelection();
    </script>

### closeCell

Stops editing the table cell which is in edit mode. Requires "incell" [edit mode](/api/javascript/ui/grid/configuration/editable.mode).

> When keyboard navigation is used, the Grid [`table`](/api/javascript/ui/grid/fields/table) must be focused programmatically after calling `closeCell`.


<div class="meta-api-description">
Stop or end the current in-cell editing session programmatically within a grid or table when in edit mode, enabling developers to exit cell editing on demand, cancel or save changes, control inline editing flow, handle keyboard navigation or focus after editing, programmatically close or commit edits within grid cells, and manage edit sessions without altering overall edit mode settings.
</div>

#### Parameters

##### isCancel `Boolean` *optional*

A flag specifying whether to fire the `cancel` event. By default the event is not fired.

#### Example - cancel cell editing

    <div id="grid"></div>

    <script>
    $("#grid").kendoGrid({
        columns: [
            { field: "name" },
            { field: "age" }
        ],
        dataSource: [
            { name: "Jane Doe", age: 30 },
            { name: "John Doe", age: 33 },
        ],
        editable: "incell",
        navigatable: true
    });

    var grid = $("#grid").data("kendoGrid");

    grid.editCell(grid.tbody.find("td").first());
    setTimeout(function(){
        grid.closeCell();
        grid.table.focus();
    }, 1500);
    </script>

### collapseGroup

Collapses the specified group. This hides the group items.


<div class="meta-api-description">
Programmatically close or fold a specific group in a data grid to hide its child rows and reduce visual clutter, enabling control over group expansion and collapse behavior, managing grouped sections by collapsing or minimizing them to streamline the user interface, and adjusting group visibility dynamically to improve readability and focus on other data blocks.
</div>

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the group table row. A string is treated as a jQuery selector.

#### Example - collapse the first group

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: {
        data: [
          { productName: "Tea", category: "Beverages" },
          { productName: "Coffee", category: "Beverages" },
          { productName: "Ham", category: "Food" },
          { productName: "Bread", category: "Food" }
        ],
        group: { field: "category" }
      },
      groupable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.collapseGroup(".k-grouping-row:contains(Beverages)");
    </script>

> How to collapse all Groups in Grid by Default you can find in [this article](/knowledge-base/grid-collapse-groups).

### collapseRow

Collapses the specified master table row. This hides its detail table row.


<div class="meta-api-description">
Control collapsing and hiding of master table rows and their associated detail panes or child rows within a grid layout, enabling programmatic toggling of expanded or open master-detail views, collapsing specific rows to hide nested content, dynamically managing row expansion states, and configuring how to programmatically close or minimize detail sections linked to master rows in data grids, tables, or hierarchical displays.
</div>

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the master table row. A string is treated as a jQuery selector.

##### omitAnimations `Boolean`

If set to false, the detail template is hidden without animations.

#### Example - collapse the first master table row

    <div id="grid"></div>
    <script>
    let encode = kendo.htmlEncode;
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ],
      detailTemplate: ({ name, age }) => `<div>Name: ${encode(name)}</div><div>Age: ${encode(age)}</div>`
    });
    var grid = $("#grid").data("kendoGrid");
    // first expand the first master table row
    grid.expandRow(".k-master-row:first");
    grid.collapseRow(".k-master-row:first");
    </script>

### copySelectionToClipboard

Copies the selected items to the clipboard.


<div class="meta-api-description">
Copy the currently selected rows, cells, or items from a data grid or table to the system clipboard in a text format suitable for exporting, sharing, or pasting into other applications such as spreadsheets, text editors, or external programs. Enable, trigger, or execute the action to capture user selections and place them on the clipboard for easy transfer, copy-pasting, or data extraction workflows following selection updates. Support copying grid selections programmatically or interactively to facilitate exporting, clipboard integration, bulk data transfer, or inter-application data sharing.
</div>

#### Parameters

##### includeHeaders `Boolean`

If set to true, the copied items will include the column headers.

#### Example

     <div id="grid"></div>
     <a class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="selectAndCopy()">Select and copy</a>
     <script>
            $("#grid").kendoGrid({
                columns: [
                    { field: "productName" },
                    { field: "category" }
                ],
                dataSource: {
                    data: [
                    { productName: "Tea", category: "Beverages" },
                    { productName: "Coffee", category: "Beverages" },
                    { productName: "Ham", category: "Food" },
                    { productName: "Bread", category: "Food" }
                    ]
                },
                selectable: "multiple, cell"
            });

        function selectAndCopy() {
            var grid = $("#grid").data("kendoGrid");
            grid.select('td');
            grid.copySelectionToClipboard(true);
        }

     </script>

### current

Gets or sets the current cell for keyboard navigation.

> The method will also automatically scroll to the newly set current cell, but this feature works with limited capabilities when virtual scrolling is used. In the latter case, `current` will scroll correctly only if the new current cell is adjacent or close to the currently visible portion of the Grid's data table.


<div class="meta-api-description">
Retrieve or update the active or focused cell within the grid to control keyboard navigation and programmatically move the selection, including setting the highlighted or current position for user interaction or automation. Adjust or query the grid’s focused cell to enable or detect which cell is active for input, navigation, or editing purposes, with automatic scrolling to bring the selected or focused cell into view. Manage keyboard focus and selection movement inside the grid to navigate or jump to a specific row and column, involving scroll adjustment that works best when the target cell is near the visible range due to virtual scrolling constraints, supporting use cases like setting the current cell programmatically, reading the focused cell for event handling, or controlling navigation flow within the grid interface.
</div>

#### Parameters

##### cell `jQuery`

DOM element or jQuery object which represents the navigatable cell.

#### Returns

`jQuery` the current cell.

#### Example - select last cell for keyboard navigation

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        columns: [
        { field: "name" },
        { field: "age" }
        ],
        dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
        ],
        navigatable: true
    });
    var grid = $("#grid").data("kendoGrid");

    //get the last cell of the Grid
    var lastCell = grid.tbody.find("tr:last td:last");
    //select the cell for navigation
    grid.current(lastCell);
    //optional: focus the grid table
    grid.table.focus();
    </script>

### dataItem

Returns the data item to which the specified table row is bound. The data item is a [Kendo UI Model](/api/javascript/data/model) instance.

> When using the **Grid's MVC wrapper**, the Grid must be **Ajax-bound** for the dataItem() method to work.
When using server binding, the dataSource instance does not contain the serialized data items.


<div class="meta-api-description">
Retrieve or access the underlying data record or model for a specific row in a grid, enabling reading, updating, or manipulating fields and properties tied to that row’s data. Developers often search for how to get the bound object or data context of a table row, extract the row’s data item for editing, fetch the current model instance from a UI grid row, or link row visuals to their data source representation. Common scenarios include querying the model behind a grid row, modifying data programmatically from a row selection, or invoking data object methods associated with the grid’s displayed rows, especially when working with Ajax-bound grids or handling differences between client-side data access versus server binding. This covers use cases like retrieving the data source object that a grid row is connected to, obtaining the data model instance for interactive grids, or reading/updating row data dynamically in UI frameworks that use complex data bindings.
</div>

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Returns

`kendo.data.ObservableObject` the data item to which the specified table row is bound. [More information about the ObservableObject type...](/api/javascript/data/observableobject)

#### Example - get the data item to which the first table row is bound

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    var dataItem = grid.dataItem("tbody tr:eq(0)");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(dataItem.name); // displays "Jane Doe"
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls the `destroy` method of any child Kendo widgets.

> This method does not remove the widget element from DOM.


<div class="meta-api-description">
Clean up and dismantle the grid by disabling all event listeners, clearing linked data attributes to prevent memory leaks, and triggering the teardown of nested or child components for thorough resource release, while leaving the actual DOM element intact so you can manually remove or manipulate it later. This process ensures complete disconnection and garbage collection readiness by detaching handlers, freeing data bindings, and cascading destruction commands through child widgets, ideal for scenarios requiring dynamic grid lifecycle management, component reset, or safe removal without immediate DOM removal.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.destroy();
    </script>

### disableEditing

Toggle off the Grid's editing capabilities. Requires [editable](/api/javascript/ui/grid/configuration/editable) to be enabled.


<div class="meta-api-description">
Control or disable runtime editing modes in the data grid dynamically to prevent users from creating, updating, or deleting records without reloading or reinitializing the grid component. Manage inline editing, popup editors, or batch edit modes by turning off user interaction capabilities related to editing, ensuring you can enable or restrict edits during application execution. Configure or toggle editing locks, block modifications, or temporarily freeze edit states programmatically when editable features are active, allowing precise control over data entry permissions and in-place edits without component refresh.
</div>

#### Example - Disable editing in the Grid

    <button id="toggle-edit">Toggle Edit</button>
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: "inline"
    });

    $("#toggle-edit").kendoButton({
      click: (e) => {
        $("#grid").data("kendoGrid").disableEditing();
      }
    });
    </script>

### editCell

Switches the specified table cell in edit mode. Requires "incell" [edit mode](/api/javascript/ui/grid/configuration/editable.mode).

Fires the [edit](/api/javascript/ui/grid/events/edit) event.


<div class="meta-api-description">
Activate or enable inline editing for a particular table or grid cell, programmatically switch a specific cell into edit mode, set or control cell value modification directly within the grid interface, open cells for user input or update, trigger editing behavior on a given cell, manage cell-level edit activation, handle cell focus for editing, and initiate in-cell editing workflows when the grid supports incell editing mode.
</div>

#### Parameters

##### cell `jQuery`

The jQuery object which represents the table cell.

#### Example - switch the first cell to edit mode

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: "incell"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.editCell($("#grid td:eq(0)"));
    </script>

### editRow

Switches the specified table row in edit mode. Requires "inline" or "popup" [edit mode](/api/javascript/ui/grid/configuration/editable.mode).

Fires the [edit](/api/javascript/ui/grid/events/edit) event.


<div class="meta-api-description">
Activate or enable editing for a specific row in a data grid or table by switching it into an editable mode where all fields become modifiable, supporting inline or popup editing styles. This method triggers an event that lets developers customize editor behavior, initialize data, prefill or update input controls, and programmatically set focus or validation before changes are made. Useful for configuring dynamic row editing, interactive cell updates, or implementing custom input workflows in grid components with programmatic control over editing states.
</div>

#### Parameters

##### row `jQuery`

The jQuery object which represents the table row.

#### Example - switch the first row in edit mode

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: "inline"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.editRow($("#grid tr:eq(1)"));
    </script>

### enableEditing

Toggle on the Grid's editing capabilities. Requires [editable](/api/javascript/ui/grid/configuration/editable) to be enabled.


<div class="meta-api-description">
Activate or switch on dynamic editing features in a data grid to let users add new entries, modify existing rows, or remove items directly within the grid interface using inline editors, popup dialogs, or cell-level controls, allowing programmatic enabling of these editing capabilities after the grid has already been set up without needing to reload or reset the grid; control, configure, or toggle editable states and runtime modifications, supporting user interactions such as updating data on the fly, editing cells in place, enabling or disabling editing modes, and managing editable content dynamically through code or user actions.
</div>

#### Example - Enable editing in the Grid

    <button id="toggle-edit">Toggle Edit</button>
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataBound: (e) => {
        // Disable editing by default.
        e.sender.disableEditing();
      },
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: "inline"
    });

    $("#toggle-edit").kendoButton({
      click: (e) => {
        $("#grid").data("kendoGrid").enableEditing();
      }
    });
    </script>

### expandGroup

Expands the specified group. This shows the group items.


<div class="meta-api-description">
Programmatically open or expand a collapsed group within a data grid or table to display its underlying rows, children, or items, enabling dynamic control over grouped data visibility, toggling sections to show hidden sub-items, revealing nested elements in grouped lists, and managing the expanded or collapsed state of grouped records for interactive user interfaces or automated UI updates.
</div>

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the group table row. A string is treated as a jQuery selector.
Expands specified group.

#### Example - expand the first group

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "productName" },
        { field: "category" }
      ],
      dataSource: {
        data: [
          { productName: "Tea", category: "Beverages" },
          { productName: "Coffee", category: "Beverages" },
          { productName: "Ham", category: "Food" },
          { productName: "Bread", category: "Food" }
        ],
        group: { field: "category" }
      },
      groupable: true
    });
    var grid = $("#grid").data("kendoGrid");
    // first collapse the group
    grid.collapseGroup(".k-grouping-row:contains(Beverages)");
    grid.expandGroup(".k-grouping-row:contains(Beverages)");
    </script>

### expandRow

Expands the specified master table row. This shows its detail table row.


<div class="meta-api-description">
Programmatically expand or open a master table row to show nested detail content and bring the detail row into view, enabling automated control over row expansion such as toggling detail views, revealing hidden sub-rows, triggering expansion from events or actions, and managing hierarchical or drill-down data presentations dynamically within a grid or table interface.
</div>

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the master table row. A string is treated as a jQuery selector.
Expands specified master row.

##### omitAnimations `Boolean`

If set to false, the detail template is displayed without animations.

#### Example - expand the first master table row

    <div id="grid"></div>
    <script>
    let encode = kendo.htmlEncode;
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ],
      detailTemplate: ({ name, age }) => `<div>Name: ${encode(name)}</div><div>Age: ${encode(age)}</div>`
    });
    var grid = $("#grid").data("kendoGrid");
    grid.expandRow(".k-master-row:first");
    </script>

### exportSelectedToExcel

Exports the selected items to an Excel file.


<div class="meta-api-description">
Export only the currently selected rows or items from a data grid to an Excel spreadsheet file in .xlsx format by triggering an export function that captures and downloads the selection; enable exporting filtered, highlighted, or programmatically chosen entries, integrate export actions with buttons or UI controls, customize or automate export workflows based on user selection, and control exporting subsets of grid data for reporting, saving, or sharing purposes while maintaining the current selection state when invoking the export operation.
</div>

#### Parameters

##### includeHeaders `Boolean`

If set to true, the exported items will include the column headers.

#### Example

     <div id="grid"></div>
     <a class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="selectAndExport()">Select and export</a>
     <script>
            $("#grid").kendoGrid({
                columns: [
                    { field: "productName" },
                    { field: "category" }
                ],
                dataSource: {
                    data: [
                    { productName: "Tea", category: "Beverages" },
                    { productName: "Coffee", category: "Beverages" },
                    { productName: "Ham", category: "Food" },
                    { productName: "Bread", category: "Food" }
                    ]
                },
                selectable: "multiple, cell"
            });

        function selectAndExport() {
            var grid = $("#grid").data("kendoGrid");
            grid.select($('#grid tbody td').slice(0,2).add($('#grid tbody td').slice(4,6)));

            grid.exportSelectedToExcel(true);
        }

     </script>

### getOptions

Retrieves the options that are currently enabled or disabled on the Grid, also gives the current state of the dataSource.
Use this method if you want to save the state of the Grid into a variable. It is also possible to extract and store only some of the Grid options.

> Please refer to the [`setOptions()`](/api/javascript/ui/grid/methods/setoptions) method documentation for more important information.


<div class="meta-api-description">
Retrieve the current configuration, active settings, enabled or disabled features, and the present data state of the grid or table component to export, save, serialize, snapshot, persist, capture, backup, inspect, or extract the full or partial grid options and data source state for purposes like restoring views, transferring configurations, debugging, or programmatically accessing the entire grid setup and dataset at runtime.
</div>

#### Parameters

#### Returns

`Object` The configuration options of the widget.

#### Example - expand the first master table row

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      sortable: true,
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    var options = grid.getOptions();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(options.sortable); //outputs true

    // get only the Grid column settings
    var columnOptionsForSaving = kendo.stringify(options.columns);
    </script>

### getSelectedData

Returns the selected elements mapped to objects.

<div class="meta-api-description">
Retrieve the data objects corresponding to the current selection within a grid, enabling access to the underlying selected records as an array for purposes such as iterating over chosen entries, modifying selected items’ properties, exporting data subsets, or sending selected records to backend services; useful when needing to obtain the selection mapped to JavaScript objects after grid initialization, supporting operations like extracting, processing, or manipulating selected rows programmatically and interacting with user-selected data from tabular interfaces.
</div>

#### Returns

`Array` The selected items.

#### Example

     <div id="grid"></div>
     <a class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="printSelected()">Select and print</a>
     <script>
            $("#grid").kendoGrid({
                columns: [
                    { field: "productName" },
                    { field: "category" }
                ],
                dataSource: {
                    data: [
                    { productName: "Tea", category: "Beverages" },
                    { productName: "Coffee", category: "Beverages" },
                    { productName: "Ham", category: "Food" },
                    { productName: "Bread", category: "Food" }
                    ]
                },
                groupable: true,
                selectable: "multiple, cell"
            });

        function printSelected() {
            var grid = $("#grid").data("kendoGrid");
            grid.select($('#grid tbody td').slice(0,2).add($('#grid tbody td').slice(4,6)));

            console.log(grid.getSelectedData());
        }

     </script>

### hideColumn

Hides the specified grid column.

> Check the [Column widths](/web/grid/appearance#column-widths) help section for additional relevant information.


<div class="meta-api-description">
Dynamically control column visibility within a data grid by programmatically hiding specific columns, enabling runtime adjustment of displayed fields and layout customization; configure which columns should be visible or hidden based on user interaction or application logic, manage column display to optimize user interface space, and trigger automatic recalculation of column widths when columns are shown or concealed to maintain a responsive grid layout.
</div>

#### Parameters

##### column `Number|String|Object|Array`

The index of the column, or the [field](/api/javascript/ui/grid/configuration/columns.field) to which the columns is bound, or the column object obtained from the [columns](/api/javascript/ui/grid/fields/columns) collection, or array of indexes, or array of fields, or array of column objects obtained from the collection of columns, or array of mixed values.

When using multicolumn headers, using an index will hide a top-level column together with all its "child columns". In such scenarios, using field names or column objects may be more appropriate.

#### Example - hide a column by index

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.hideColumn(1);
    </script>

#### Example - hide a column by field

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.hideColumn("age");
    </script>

#### Example - hide a column by column object reference

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        columns: [{
            title: "Person",
            columns: [
                { field: "fname", title: "First name"},
                { field: "lname", title: "Last name"}
            ]}, {
                field: "age"
            }
        ],
        dataSource: [
            { fname: "Jane", lname: "Smith", age: 30 },
            { fname: "John", lname: "Stevens", age: 33 }
        ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.hideColumn(grid.columns[0].columns[1]);
    </script>

#### Example - hide a column by array of mixed values

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { field: "height" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30, height: 1.75 },
          { name: "John Doe", age: 33, height: 1.82 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.hideColumn([0, 'age']);
    </script>

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource/methods/view) (e.g. the ones on the current page).


<div class="meta-api-description">
Retrieve or access the rendered HTML elements representing the current data set displayed in a grid or table, including rows, items, or cells tied to the active view or page from the underlying data source. This method provides a collection or array of DOM nodes for inspecting, manipulating, modifying styles or attributes, attaching event listeners, or performing direct queries on the visible data elements, enabling interaction with the grid’s displayed content regardless of pagination, filtering, or sorting state. Developers can use this to get live references to the UI elements corresponding to data records currently rendered on screen for custom updates or integrations.
</div>

#### Returns

`Array` The currently rendered data table rows (`<tr>` elements).

#### Example - use items method to access all Grid rows

    <button id="selectAll">Select All Rows</button>
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        selectable: "multiple, row"
      });

      $("#selectAll").on("click", function(){
        var grid = $("#grid").data("kendoGrid");
        var allRows = grid.items();

        grid.select(allRows);
      });
    </script>

### lockColumn

Locks (freezes) a column, allowing users to see it at all times when scrolling.


<div class="meta-api-description">
Control column locking to pin or freeze specific table columns so they remain fixed and visible during horizontal scrolling, ensuring critical data like IDs, row headers, or action buttons stay in view. Configure or enable sticky columns to programmatically lock columns in place, preventing them from moving off-screen, ideal for fixed left-most columns, persistent operation cells, or headers that must always display regardless of scroll position. Set up columns that stay static while users scroll horizontally through other data, supporting user interfaces requiring anchored columns, frozen grid sections, or locked table fields for easier navigation and interaction.
</div>

#### Parameters

##### column `Number|String`

The index of the column or the [field](/api/javascript/ui/grid/configuration/columns.field) to which the columns is bound.

> In order to use this method, the grid must be initialized with at least one locked column, and should have unlocked columns left after the target column is locked.

#### Example - lock a column

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name", width: 400, locked: true },
        { field: "age", width: 200 },
        { field: "hometown", width: 400 },
        { field: "siblings", width: 200 }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30, hometown: "Sofia, Bulgaria", siblings: 3 },
        { name: "John Doe", age: 33, hometown: "Boston, MA, USA", siblings: 1 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.lockColumn("age");
    </script>

### refresh

Renders all table rows using the current data items.


<div class="meta-api-description">
Trigger a complete redraw or update of all visible table rows to instantly reflect changes in data collections, re-render grid content after modifying or mutating in-memory data items, refresh displayed rows when underlying data source or bound fields have been altered, and synchronize the grid's DOM with current data state without full component reload or reinitialization.
</div>

#### Example - refresh the widget

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.refresh();
    </script>

#### Example - change the value of a dataItem and refresh the widget

    <button id="refresh" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base">Refresh</button>
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["save"],
      columns: [
        { field: "name" },
        { field: "age" },
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
      	],
        schema:{
        	model: {
        	 id: "id",
        	 fields: {
        	   age: { type: "number"}
        	 }
         }
       }
      },
      editable: true
    });

    $("#refresh").click(function(){
    var grid = $("#grid").data("kendoGrid");
    // Change the name of the first dataItem.
    grid.dataSource.data()[0].name = "Different John";
    // Call refresh in order to see the change.
    grid.refresh();
    });
    </script>

### removeRow

Removes the specified table row from the grid. Also removes the corresponding data item from the data source.

Executing of `removeRow` triggers the default execution of the Grid delete mechanism. If the Grid data source is configured with destroy remote data operation a delete request will be performed. If the `editable` configuration is set to `true`, a confirmation dialog will appear before removing the row. You can disable it from the [`editable.confirmation`](/api/javascript/ui/grid/configuration/editable.confirmation) setting.

Fires the [remove](/api/javascript/ui/grid/events/remove) event.


<div class="meta-api-description">
Remove a specific row or item from the grid programmatically by deleting a table entry or corresponding data record, trigger the grid’s built-in delete workflow, send a remote delete request if connected to a server-side data source with destroy operations, handle confirmation dialogs for editable grids, control or disable confirmation prompts, and listen for events emitted during the row removal process to manage callbacks, validations, or UI updates after deleting data from grids or tables.
</div>

#### Parameters

##### row `String|Element|jQuery`

A string, DOM element or jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Example - remove the first table row

    <button id="btn">Remove Row</button>
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [{ field: "name" }, { field: "age" }],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 },
          ],
          schema: {
            model: { id: "id" },
          },
        },
        editable: true,
      });

      $("#btn").on("click", function () {
        var grid = $("#grid").data("kendoGrid");
        grid.removeRow("tr:eq(1)");
      });
    </script>

#### Example - remove the selected table row

    <button class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onclick="remove()">Remove selected row</button>
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        selectable: true,
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 },
            { id: 3, name: "Angela Smith", age: 33 }
          ]
        }
      });

      function remove() {
        var grid = $("#grid").data("kendoGrid");
        grid.removeRow(grid.select());
      }
    </script>

### reorderColumn

Changes the position of the specified column.


<div class="meta-api-description">
Change or move a column’s position within a grid programmatically after the grid is initialized by setting or updating the column order dynamically, enabling rearrangement of columns in the data table or grid view based on user input, interactive drag-and-drop behavior, business rules, or automated workflows. Adjust column placement, shift columns left or right, update the columns collection, reorder grid columns on demand, control display layout by changing column indices, reorder grid headers, and manage the visual arrangement of columns to reflect new positions in real time.
</div>

#### Parameters

##### destIndex `Number`

The new position of the column. The destination index should be calculated with regard to all columns, including the hidden ones.

##### column `Object`

The column whose position should be changed.

#### Example - move a column

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.reorderColumn(1, grid.columns[0]);
    </script>

### resizeColumn

Changes the width of the specified column.

Introduced in the Kendo UI 2018 R3 release.


<div class="meta-api-description">
Dynamically change or set the width of a specific column in a data grid or table, programmatically adjust column sizing or resize individual columns at runtime, control column width for responsive layouts, update grid or table column dimensions without reloading or reinitializing the entire component, modify grid appearance after data changes or user interactions, enable precise column width customization, adjust or fix column sizes on the fly, maintain grid layout integrity while changing column widths, implement automatic or manual resizing of grid columns via code.
</div>

#### Parameters

##### column `Object`

The column whose width should be changed.

##### value `Number`

The new column width.

#### Example - resize a column

    <div id="grid" style="width:500px;"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name", width: 300 },
        { field: "age", width: 300 }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.resizeColumn(grid.columns[0], 200);
    </script>

### saveAsExcel

Initiates the Excel export. Also fires the [`excelExport`](/api/javascript/ui/grid/events/excelexport) event.

> This call requires JSZip library included.
	
> Calling this method could trigger the browser built-in popup blocker in some cases. To avoid that, always call it as a response to an end-user action e.g. button click.


<div class="meta-api-description">
Trigger or initiate on-demand exporting or downloading of the current grid or table data as an Excel file using a method to programmatically generate and save Excel spreadsheets, enabling export of grid content, data state, or filtered views in response to user actions or events. This includes functionality to automatically start Excel file creation, handle or customize the export payload through event hooks before finalizing the file, and support user-triggered workflows such as button clicks to avoid browser popup blockers when saving or exporting grid data to Excel format.
</div>

#### Example - manually initiate Excel export

    <button id="export">Export to Excel</button>
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ],
    });
    $("#export").click(function(e) {
        var grid = $("#grid").data("kendoGrid");
        grid.saveAsExcel();
    });
    </script>

### saveAsPDF

Initiates the PDF export and returns a promise. Also triggers the [pdfExport](/api/javascript/ui/grid/events/pdfexport) event.

> Calling this method may trip the built-in browser pop-up blocker. To avoid that, call this method as a response to an end-user action, e.g. a button click.

> The [pdfExport](/api/javascript/ui/grid/events/pdfexport) event handler could be used to dynamically modify the to-be-exported PDF file.


<div class="meta-api-description">
Export, generate, or download the grid content or table data as a PDF file, enabling programmatic control of PDF creation workflows with asynchronous handling using Promises, supporting integration with UI updates, event-driven customization during export, and ensuring execution in response to user interactions like button clicks to prevent browser pop-up blockers; includes triggering export events that allow dynamic modification or customization of the exported PDF document before saving, covering use cases for automated PDF saving, on-demand PDF generation, event-based export handling, and interaction-safe invocation of PDF exports from data grids or tabular displays.
</div>

#### Returns

`Promise` A promise that will be resolved when the export completes. The same promise is available in the [pdfExport](/api/javascript/ui/grid/events/pdfexport) event arguments.

#### Example - manually initiate PDF export

    <button id="export">Export to PDF</button>
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ],
    });
    $("#export").click(function(e) {
        var grid = $("#grid").data("kendoGrid");
        grid.saveAsPDF();
    });
    </script>


### saveChanges

Saves any pending changes by calling the [sync](/api/javascript/data/datasource/methods/sync) method.

Fires the [saveChanges](/api/javascript/ui/grid/events/savechanges) event.


<div class="meta-api-description">
Persist pending edits, apply create, update, and delete modifications, commit changes from the data grid or table, synchronize in-memory edits to the data source, trigger save or data synchronization events, ensure data integrity after user modifications, handle post-save logic including UI refresh or notifications, confirm and finalize user input changes, enable explicit saving of grid or table data changes, and manage transactional updates within editable tabular interfaces.
</div>

#### Example - save changes

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.addRow();
    grid.saveChanges();
    </script>

### saveRow

Switches the table row which is in edit mode and saves any changes made by the user.


<div class="meta-api-description">
Complete editing of a currently active table row by triggering the save action that applies all user modifications, commits inline changes, stops editing mode, and updates the underlying data item to reflect the edited values, enabling seamless synchronization, data persistence, and integration with data sources or API updates for grids, tables, or editable lists where row-level modifications must be finalized and saved programmatically or through user interaction.
</div>

#### Example - save row

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: "inline"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.editRow($("#grid tr:eq(1)"));
    grid.saveRow();
    </script>

### scrollToItem

Scrolls the table to the provided item.


<div class="meta-api-description">
Scroll or navigate programmatically to a specific row, record, or data item within a scrollable grid or table view, enabling automatic focusing, scrolling, or bringing that item into visible range inside the container; use to set or control which row appears on screen after filtering, sorting, updates, or user interaction, ensuring smooth row visibility, positioning, or highlighting dynamically by specifying target data or index.
</div>

#### Parameters

`id` - the id of the data item
`callback` - optional parameter, a function to be executed when virtual scrolling is enabled and the item to scroll is not loaded yet. Must return the index of the item.

> In order for this method to work as expected, you must configure the `dataSource.Schema.model.id`

#### Example - scrollToItem

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 100 },
        { field: "name", width: 100 },
        { field: "age", width: 50 }
      ],
      dataSource:
        {
        data: [
            { name: "Jane Doe", age: 30, id: 1 },
            { name: "John Doe", age: 33, id: 2 },
            { name: "Jane Doe", age: 30, id: 3 },
            { name: "John Doe", age: 33, id: 4 },
            { name: "Jane Doe", age: 30, id: 5 },
            { name: "John Doe", age: 33, id: 6 },
            { name: "Jane Doe", age: 30, id: 7 },
            { name: "John Doe", age: 33, id: 8 },
            { name: "Jane Doe", age: 30, id: 9 },
            { name: "John Doe", age: 33, id: 10 },
          ],
        schema: {
        model: {
                  id: "id"
          }
        }
      },
      height: 200
    });
    var grid = $("#grid").data("kendoGrid");
      grid.scrollToItem(8);
    </script>

### select

Gets or sets the table rows (or cells) which are selected.

If the Grid is using frozen (locked) columns and multiple cell selection with string selector, the `select` method will select and return **two** table cell elements. This is because the frozen columns feature works with the separate tables for the frozen and non-frozen columns. Each cell element corresponds to the jQuery selector applied for each table. One of the table cells will be a descendant of `div.k-grid-content-locked` and the other one will be a descendant of `div.k-grid-content`. The two `div`s are siblings in the Grid DOM structure. To select just one table cell please use jQuery selector to find the exact one cell from the specific table element and set `k-selected` class instead of using the `select` method.


<div class="meta-api-description">
Control or retrieve selected row or cell elements in a grid or table interface by configuring selection methods that support single or multiple selections, managing highlighted or active cells and rows programmatically, handling cases with frozen or locked columns where selections may span distinct sections or sub-tables, distinguishing between selecting entire rows versus individual cells using various selector strategies or CSS classes, enabling precise control over selection state, toggling selection programmatically, adjusting for grid structures that split content areas, and implementing custom selection logic for dynamic or complex grid layouts.
</div>

#### Parameters

##### rows `String|Element|jQuery`

A string, DOM element or jQuery object which represents the table row(s) or cell(s). A string is treated as a jQuery selector.

#### Returns

`jQuery` the selected table rows or cells.

> The `select` method will not trigger the [`change event`](/api/javascript/ui/grid/events/change). In older versions of Kendo UI, the select method would trigger the [`change event`](/api/javascript/ui/grid/events/change), however this behavior was not intended. Refer to the second example for a workaround.

> In case of using frozen (locked) columns and row selection, the `select` method will return **two** table row elements for each selected item. Each pair of table row elements that correspond to the same data item, will have the same `data-uid` attribute value. One of the table rows will be a descendant of `div.k-grid-content-locked` and the other one will be a descendant of `div.k-grid-content`.

> In order to clear the currently selected row, use the [clearSelection() method](/api/javascript/ui/grid/methods/clearselection).

#### Example - select the first and second table rows

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        selectable: "multiple, row"
      });
      var grid = $("#grid").data("kendoGrid");
      grid.select("tr:eq(0), tr:eq(1)");
    </script>

#### Example - trigger the change event when a row is selected programmatically.

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        selectable: "multiple, row",
        change: function(e) {kendo.alert("Change triggered")}
      });
      var grid = $("#grid").data("kendoGrid");
      grid.select("tr:eq(0), tr:eq(1)");
      grid.trigger("change");
    </script>

#### Example - get the selected table rows

    <div id="grid"></div>
    <button class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' id="btn">Get selected rows</button>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        selectable: "multiple, row"
      });
      var grid = $("#grid").data("kendoGrid");
      grid.select("tr:eq(0), tr:eq(1)");

      $("#btn").on("click", function(e){
        var rows = grid.select();
        var selectedIds = [];

        $(rows).each(function(){
          selectedIds.push($(this).attr("data-uid"))
        });

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Selected row Ids: " + selectedIds.join(", "));
      })
    </script>

### selectedKeyNames

Gets an array that holds the id field values of the selected rows.

> There are a few important things to keep in mind when using `selectedKeyNames`.
>
> * **In order for the method to return the selected IDs you need to define an ID field in [`schema.model`](/api/javascript/data/datasource/configuration/schema#schemamodel).**
> * **The selected IDs are sorted in ascending order inside the `selectedKeyNames` array.**



<div class="meta-api-description">
Retrieve or obtain the identifiers, keys, or unique IDs of currently selected rows or items within a grid, table, or data list by calling a method that returns an array or list of selected row IDs or keys. Find the selection state by extracting selected row keys, row identifiers, or item IDs to track which rows are selected, synchronize selection across components, maintain persistent selected records, get selected primary keys, retrieve selection data for processing, capture selected entries in sorted order, and manage multi-row or single-row selections using configured ID fields or unique keys defined in the data schema or model.
</div>

#### Returns

`Array` of the id field values of the selected rows.

#### Example - select the second table row and displays it's dataItem id value

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33},
          { id: 3, name: "Jim Doe", age: 30 },
          { id: 4, name: "Jack Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      selectable: "multiple, row",
      persistSelection: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.select("tr:eq(2)");
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(grid.selectedKeyNames()); // displays the id field value for the selected row
    </script>

#### Example - select a row by Model UID

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ],
      selectable: "multiple, row"
    });
    var grid = $("#grid").data("kendoGrid");
    var uid = grid.dataSource.at(1).uid;
    grid.select("tr[data-uid='" + uid + "']");
    </script>

#### Example - select the first table cell

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ],
      selectable: "cell"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.select("td:eq(0)");
    </script>

#### Example - get the selected table row

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ],
      selectable: "row"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.select("tr:eq(1)");
    var row = grid.select();
    var data = grid.dataItem(row);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(data.name); // displays "Jane Doe"
    </script>

### setDataSource

Sets the data source of the widget. The new dataSource will override the configurations and data of the old one.


<div class="meta-api-description">
Change, update, or replace the data feeding a grid dynamically at runtime by configuring or setting a new data source that can be an array, JavaScript object, existing data source instance, or a fresh data source setup, enabling runtime data refresh, swapping datasets, reloading grid content, or switching data bindings on the fly after initialization to immediately override prior data configurations and refresh grid items with new collections or structures.
</div>

#### Parameters

##### dataSource `kendo.data.DataSource`

The data source to which the widget should be bound.

#### Example - set the data source

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 }
      ]
    });
    var dataSource = new kendo.data.DataSource({
      data: [
        { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.setDataSource(dataSource);
    </script>

### highlight

Gets or sets the table rows (or cells) which are highlighted.


<div class="meta-api-description">
Control, retrieve, update, or clear selected or emphasized rows and cells within a data grid by programmatically managing which elements are visually marked or highlighted; enable or set specific row or cell highlights, synchronize highlighted items with other UI components, query current selections, dynamically adjust emphasis for user interaction, and handle selection state changes across table data for clear identification and editing workflows.
</div>

#### Parameters

##### elements `jQuery|Array`

A jQuery object or array of jQuery objects which represents the table row(s) or cell(s).


#### Returns

`jQuery` the selected table rows or cells.

> The `highlight` method will not trigger the [`change event`](/api/javascript/ui/grid/events/change).

> In case of using frozen (locked) columns, the `highlight` method will return **two** table row elements for each highlighted item. Each pair of table row elements that correspond to the same data item, will have the same `data-uid` attribute value. One of the table rows will be a descendant of `div.k-grid-content-locked` and the other one will be a descendant of `div.k-grid-content`.

> In order to clear the currently selected row, use the [clearHighlight() method](/api/javascript/ui/grid/methods/clearhighlight).

#### Example - highlight the first table row

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
      });
      var grid = $("#grid").data("kendoGrid");
      const row = grid.tbody.find("tr:eq(0)");
      grid.highlight(row);
    </script>

#### Example - get the selected table rows

    <div id="grid"></div>
    <button class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base' id="btn">Get selected rows</button>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        selectable: "multiple, row"
      });
      var grid = $("#grid").data("kendoGrid");
      const row = grid.tbody.find("tr:eq(0)");
      grid.highlight(row);

      $("#btn").on("click", function(e){
        var rows = grid.highlight();
        var highlightedIds = [];

        $(rows).each(function(){
          highlightedIds.push($(this).attr("data-uid"))
        });

	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Highlighted row id: " + highlightedIds.join(", "));
      })
    </script>

### clearHighlight

Clears the currently selected table rows or cells.


<div class="meta-api-description">
Remove or reset any current row or cell selections, clear visual highlights or focus indicators, deselect highlighted table elements programmatically after user interaction, navigation changes, data updates, or custom workflows, control and revert the grid or table selection state back to none without altering underlying data, eliminate active or focused grid items, disable current selection markers, and clear user-focused highlights to restore the grid to a neutral, unselected condition.
</div>

#### Example - highlight the first table row

    <button id="clearHighlight" class='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base'>Clear Highlight</button>
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
      });
      var grid = $("#grid").data("kendoGrid");
      const row = grid.tbody.find("tr:eq(0)");
      grid.highlight(row);

      $("#clearHighlight").click(() => grid.clearHighlight());
    </script>

### setOptions

Sets the [`options`](/api/javascript/ui/grid#configuration) of the Grid. Use this method if you want to enable/disable a particular feature/option or to load
the complete state obtained previously with the [`getOptions`](/api/javascript/ui/grid/methods/getoptions) method.

When `setOptions` is called, the Grid widget will be destroyed and recreated. If the widget is bound to remote data, a new read request will be made.

> There are a few important things to keep in mind when using `getOptions` and `setOptions`.
>
> * **calling `setOptions()` in a Grid event handler is not possible.**
> * **calling `setOptions()` in a function, which is related to the Grid's databinding mechanism may cause an endless loop.**
> * `JSON.stringify()` cannot serialize function references (e.g. event handlers), so if stringification is used for the retrieved Grid state,
> all configuration fields, which represent function references, will be lost. You have two options to avoid this limitation:
> use a [custom implementation](https://github.com/tarruda/super-json) to serialize JavaScript functions, or
> add the function references back to the deserialized configuration object before passing it to the `setOptions` method.
> * When using the Grid MVC wrapper, any server templates will not be retrieved by the `getOptions` method (e.g. toolbar or header templates with `@<text></text>` razor syntax).
> This is because the server templates are rendered server-side and do not have corresponding configuration options included in the JavaScript initialization statement that creates the
> Grid object client-side. As a result, the templates will be lost once the `setOptions()` method is invoked.
> There are two options to avoid the issue - use JavaScript initialization instead of an MVC wrapper, or add template configuration to the retrieved Grid state with the JavaScript
> equivalent syntax (e.g. [`headerTemplate`](/api/javascript/ui/grid/configuration/columns.headertemplate) and [`toolbar`](/api/javascript/ui/grid/configuration/toolbar)).


<div class="meta-api-description">
Configure or update the grid’s complete runtime settings by dynamically applying new options, replacing or restoring feature sets, toggling capabilities, loading saved configurations, or resetting initialization parameters, including updating columns, sorting, filtering, paging, templates, and toolbar settings. Enable seamless state restoration, feature enablement, or disablement by reapplying previously extracted or custom option objects while handling scenarios with remote data binding that triggers fresh data reads. Manage changes to layout, behavior, appearance, and event handlers carefully to avoid recursive update loops, limitations in serializing function callbacks, and loss of server-rendered templates, especially when switching between MVC wrappers and client-side JavaScript initializations. This method supports comprehensive control over grid configuration updates, resetting grid states, customizing UI components, and adapting grid behavior dynamically during runtime through declarative or programmatic options application.
</div>

#### Parameters

##### options `Object`

The configuration options to be set.

#### Example - set sortable feature of the Grid to true

    <div id="grid"></div>
    <script>
        $("#grid").kendoGrid({
            columns: [
              { field: "name" },
              { field: "age" }
            ],
            dataSource: [
                { name: "Jane Doe", age: 30 },
                { name: "John Doe", age: 33 }
            ]
        });
        var grid = $("#grid").data("kendoGrid");
        grid.setOptions({
              sortable: true
        });
    </script>


When used for AngularJS, the `$scope` should be passed to the Grid options. By default, the Grid when initialized expects such logic.

```
$scope.grid.setOptions($.extend({}, options, {
                        $angular: [$scope]
                    }));
```

### showColumn

Shows the specified column.

> Check the [Column widths](/web/grid/appearance#column-widths) help section for additional relevant information.


<div class="meta-api-description">
Enable displaying hidden columns by dynamically revealing or unhiding specific columns in a grid or table layout, restore visibility to previously concealed columns, programmatically control column display to adjust grid content presentation, trigger layout updates or refreshes to accommodate newly shown columns, manage column visibility state through methods to toggle, show, or reveal columns for responsive interfaces, adjust table or grid column configurations by making columns visible on demand, control the visibility of individual columns in complex data grids or UI tables, dynamically manipulate column display for improved data access and presentation without full reloads.
</div>

#### Parameters

##### column `Number|String|Object|Array`

The index of the column, or the [field](/api/javascript/ui/grid/configuration/columns.field) to which the columns is bound, or the column object obtained from the [columns](/api/javascript/ui/grid/fields/columns) collection, or array of indexes, or array of fields, or array of column objects obtained from the collection of columns, or array of mixed values.

When using multicolumn headers, using an index will hide a top-level column together with all its "child columns". In such scenarios, using field names or column objects may be more appropriate.

#### Example - show a hidden column by index

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age", hidden: true }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.showColumn(1);
    </script>

#### Example - show a hidden column by field

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age", hidden: true }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.showColumn("age");
    </script>

#### Example - show a column by column object reference

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        columns: [{
            title: "Person",
            columns: [
                { field: "fname", title: "First name"},
                { field: "lname", title: "Last name", hidden: true}
            ]}, {
                field: "age"
            }
        ],
        dataSource: [
            { fname: "Jane", lname: "Smith", age: 30 },
            { fname: "John", lname: "Stevens", age: 33 }
        ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.hideColumn(grid.columns[0].columns[1]);
    </script>

#### Example - show a hidden columns by array of mixed values

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name", hidden: true },
        { field: "age", hidden: true },
        { field: "height" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30, height: 1.75 },
          { name: "John Doe", age: 33, height: 1.78 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.showColumn([1, "age"]);
    </script>


### stickColumn

Sticks a column.


<div class="meta-api-description">
Pin or freeze a column in a grid or table to keep it fixed and always visible during horizontal scrolling, locking specific columns in place so they do not scroll out of view, enabling column locking, pinning, or sticking functionality dynamically at runtime after initialization, controlling which columns remain static when users scroll horizontally, securing important data columns by setting them as fixed or frozen, configuring sticky or locked columns to improve readability and navigation in wide datasets or tables.
</div>

#### Parameters

##### column `Number|String`

The index of the column or the [field](/api/javascript/ui/grid/configuration/columns.field) to which the columns is bound.

#### Example - stick a column

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800 },
        { field: "name", width: 400 },
        { field: "age", width: 800 }
      ],
      dataSource: [ { id: 1, name: "Jane Doe", age: 30 }, { id: 2, name: "John Doe", age: 33 } ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.stickColumn("name");
    </script>

### unlockColumn

Unlocks (unfreezes) a column.


<div class="meta-api-description">
Enable dynamic column unfreezing or unlocking in a grid or table layout to allow previously fixed or pinned columns to scroll horizontally with the rest of the content, supporting runtime changes to column locking state, rearranging sortable columns, programmatically toggling pinned or locked columns, adjusting layouts after initialization, and responding to user interaction that enables or disables column freeze or pin features.
</div>

#### Parameters

##### column `Number|String`

The index of the column or the [field](/api/javascript/ui/grid/configuration/columns.field) to which the columns is bound.

> In order to use this method, the grid must be initialized with at least one locked column, and there should be locked columns left after the target column is unlocked.

#### Example - unlock a column

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name", width: 400, locked: true },
        { field: "age", width: 200, locked: true },
        { field: "hometown", width: 400 },
        { field: "siblings", width: 200 }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30, hometown: "Sofia, Bulgaria", siblings: 3 },
        { name: "John Doe", age: 33, hometown: "Boston, MA, USA", siblings: 1 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.unlockColumn("name");
    </script>

To unlock a column when it is the only one locked use the [`setOptions`](/api/javascript/ui/grid/methods/setoptions) method of the Grid.

#### Example - unlock the last locked column

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name", width: 400, locked: true },
          { field: "age", width: 200 },
          { field: "hometown", width: 400 },
          { field: "siblings", width: 200 }
        ],
        dataSource: [
          { name: "Jane Doe", age: 30, hometown: "Sofia, Bulgaria", siblings: 3 },
          { name: "John Doe", age: 33, hometown: "Boston, MA, USA", siblings: 1 }
        ]
      });

      var grid = $("#grid").data("kendoGrid");
      var columns = grid.getOptions().columns;
      columns[0].locked = false;

      grid.setOptions({
        columns: columns
      })
    </script>

### unstickColumn

Unsticks a column.


<div class="meta-api-description">
Enable developers to unpin, unfreeze, or release a previously fixed or stuck grid column, restoring its normal horizontal scroll behavior and standard column ordering. Configure the grid to transition columns from pinned, frozen, or locked states back to unfixed, dynamic positioning, allowing smooth horizontal scrolling and reordering. Control the behavior of individual columns by unsticking or detaching them from fixed positions, ensuring columns no longer remain static or sticky during grid navigation. This method supports scenarios involving toggling column fixation states, reversing pinned or frozen columns for flexible layouts, and managing grid column scrolling dynamics post-initialization.
</div>

#### Parameters

##### column `Number|String`

The index of the column or the [field](/api/javascript/ui/grid/configuration/columns.field) to which the columns is bound.

#### Example - unstick a column

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800 },
        { field: "name", width: 400, sticky: true },
        { field: "age", width: 800 }
      ],
      dataSource: [ { id: 1, name: "Jane Doe", age: 30 }, { id: 2, name: "John Doe", age: 33 } ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.unstickColumn("name");
    </script>

## Events

### beforeEdit

Fired when the user tries to edit or create a data item, before the editor is created. Can be used to preventing editing according to any custom logic.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Handle or intercept the process of initiating edits or adding new data entries in a grid or data table by capturing events that trigger before editing starts, enabling custom validation, preventing edits conditionally, modifying or preparing data prior to showing editors, controlling whether editing or creation of items proceeds, stopping editing workflows early through event cancellation, hooking into pre-edit actions to enforce business rules, or customizing behavior when users attempt to modify grid records.
</div>

#### Event Data

##### e.model `kendo.data.Model`

The data item which is going to be edited. Use its [isNew](/api/javascript/data/model/methods/isnew) method to check if the data item is new (created) or not (edited).

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "beforeEdit" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id" },
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            id: "id",
            fields: {
              "id": { type: "number" }
            }
          }
        }
      },
      editable: "popup",
      toolbar:["create"],
      beforeEdit: function(e) {
        if (!e.model.isNew()) {
          e.preventDefault();
        }
      }
    });
    </script>

#### Example - subscribe to the "beforeEdit" after initialization

    <div id="grid"></div>
    <script>
      function grid_beforeEdit(e) {
          if (!e.model.isNew()) {
            e.preventDefault();
          }
      }
      $("#grid").kendoGrid({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" },
          { command: "edit" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: {
              id: "id",
              fields: {
                "id": { type: "number" }
              }
            }
          }
        },
        editable: "popup",
        toolbar:["create"],
        beforeEdit: function(e) {
          if (!e.model.isNew()) {
            e.preventDefault();
          }
        }
      });

      var grid = $("#grid").data("kendoGrid");
      grid.bind("beforeEdit", grid_beforeEdit);
    </script>

### cancel

Fired when the user clicks the "cancel" button (in inline or popup [editing mode](/api/javascript/ui/grid/configuration/editable.mode)) or closes the popup window.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect user actions that abort or cancel editing within a grid interface, including clicking cancel buttons during inline or popup editing, closing popup editors, or discarding edits before saving. Capture and respond to edit cancellations by reverting changes, resetting or rolling back user interface states, handling cleanup tasks, preventing unintended data modifications, and controlling edit life cycles. Enable monitoring of abort or cancel events to manage edit interruptions, undo operations, or user-triggered discard actions within grid cells or popup forms. Support scenarios where users back out of edits, close dialogs without saving, or trigger cancellation workflows for grid-based editing sessions.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object that represents the edit container element. More information is available in the [edit event arguments' description](/api/javascript/ui/grid/events/edit).

##### e.model `kendo.data.Model`

The data item to which the table row is bound.

##### e.preventDefault `Function`

If invoked prevents the cancel action. The table row remains in edit mode.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "cancel" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: "popup",
      cancel: function(e) {
        e.preventDefault()
      }
    });
    var grid = $("#grid").data("kendoGrid");
    grid.editRow($("#grid tr:eq(1)"));
    </script>

#### Example - subscribe to the "cancel" event after initialization

    <div id="grid"></div>
    <script>
    function grid_cancel(e) {
      e.preventDefault()
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: "popup"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("cancel", grid_cancel);
    grid.editRow($("#grid tr:eq(1)"));
    </script>

### cellClose

Fired when "incell" edit mode is used and the cell is going to be closed. The event is triggerd after saving or canceling the changes, but before the cell is closed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when a grid cell’s inline edit session is ending to perform actions like input validation, cleanup, saving data, canceling edits, or updating the user interface just before the cell closes during incell editing mode; useful for hooking into events triggered after editing completes or is canceled but prior to finalizing the cell state, enabling control over grid behavior, managing edit lifecycle events, handling form submission or rollback, and interacting programmatically within the grid instance context.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object that represents the edit container element. More information is available in the [edit event arguments' description](/api/javascript/ui/grid/events/edit).

##### e.model `kendo.data.Model`

The data item to which the table row is bound.

##### e.type `String`

The type of the cell close action - can be either "save" or "cancel". The "cancel" type is triggered when the grid keyboard navigation is enabled by "navigatable: true" and Esc key is used for cell close action.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "cellClose" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: "incell",
      cellClose:  function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.type);
      }
    });
    var grid = $("#grid").data("kendoGrid");
    grid.editCell($("#grid td:eq(1)"));
    </script>

#### Example - subscribe to the "cellClose" event during initialization

    <div id="grid"></div>
    <script>
    function grid_cellClose(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.type);
    }

    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: "incell",
    });

    var grid = $("#grid").data("kendoGrid");
    grid.bind("cellClose", grid_cellClose);

    grid.editCell($("#grid td:eq(1)"));
    </script>

### change

Fired when the user selects or deselects a table row or cell in the grid. To retrieve the selected elements, use the [`select`](/api/javascript/ui/grid/methods/select) method.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

The event will be fired only when the Grid is [`selectable`](/api/javascript/ui/grid/configuration/selectable).


<div class="meta-api-description">
Detect changes in grid selection, track when users select or deselect rows or cells, trigger custom actions or event handlers upon selection updates, implement logic for monitoring selected or highlighted grid items, listen for selection state changes within selectable data grids or tables, retrieve currently selected rows or cells during selection events, respond to user interactions with grid elements related to selection toggling, control and observe selection behavior programmatically in data grids, handle selection change notifications for updating UI or processing data based on user choices, and integrate responsive event-driven workflows tied to grid item selection or deselection.
</div>

#### Event Data

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

##### e.cellAggregates

The calculated cell aggregates. Available if `selectable.cellAggregates` is enabled.

#### Example - get the selected data item(s) when using row selection

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
            data: [
                { id: 1, name: "Jane Doe", age: 30 },
                { id: 2, name: "John Doe", age: 33 }
            ],
            schema: {
                model: {
                    id: "id"
                }
            }
        },
        selectable: "multiple, row",
        change: function(e) {
          var selectedRows = this.select();
          var selectedDataItems = [];
          for (var i = 0; i < selectedRows.length; i++) {
            var dataItem = this.dataItem(selectedRows[i]);
            selectedDataItems.push(dataItem);
          }

          // selectedDataItems contains all selected data items
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("Selected data items' name: " + selectedDataItems.map(e => e.name).join(", "));
        }
      });
    </script>

#### Example - get the selected data item(s) when using cell selection

    <div id="grid"></div>
    <script>
    function grid_change(e) {
      var selectedCells = this.select();
      var selectedDataItems = [];
      for (var i = 0; i < selectedCells.length; i++) {
        var dataItem = this.dataItem(selectedCells[i].parentNode);
        if ($.inArray(dataItem, selectedDataItems) < 0) {
          selectedDataItems.push(dataItem);
        }
      }
      // selectedDataItems contains all selected data items
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      selectable: "multiple, cell"
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("change", grid_change);
    </script>

#### Example - disable the selected rows

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          {selectable: true},
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "James Doe", age: 34 },
          { name: "John Doe", age: 37 },
          { name: "Mark Doe", age: 23 },
          { name: "Mike Doe", age: 63 }
        ],
        change: function(e) {
          var grid = e.sender;
          var selectedRows = this.select();
          $("td").removeClass("k-disabled");

          selectedRows.each(function(i, x) {
            $(x).find("td:not(:first)").addClass("k-disabled");
          });
        }
      });
    </script>

### changing

Fired when the user is about to select a table row or cell.

The event will be fired only when the Grid is [`selectable`](/api/javascript/ui/grid/configuration/selectable).


<div class="meta-api-description">
Intercept or handle user attempts to select rows or cells within a selectable grid by triggering logic before the selection finalizes, enabling validation, conditional checks, or cancellation of pending selections during interactive table or data grid operations, detecting when selections are about to change, responding to pre-selection events, and hooking into the selection process to examine or control user input for table row or cell selection behaviors and selection state updates.
</div>

#### Event Data

##### e.sender `kendo.ui.Grid`

The component instance which fired the event.

##### e.target `jQuery`

The target row that is about to be selected. If the Grid has checkbox selection enabled and the Select All checkbox in the header is clicked, the target is set to the checkbox element instead.

##### e.originalEvent `event`

The original JavaScript event that was fired.

#### Example - prevent the selection of a row

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ],
        selectable: "multiple, row",
        changing: function(e) {
          let dataItem = e.sender.dataItem(e.target);
          // Prevent the selection if the row with age = 33 is about to be selected.
          if (dataItem && dataItem.age === 33) {
              e.preventDefault();
          }
        }
      });
    </script>

### columnHide

Fired when the user hides a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when a grid column is hidden or toggled off by the user, trigger updates on column visibility changes, listen for events indicating columns are collapsed or removed from view, handle user actions hiding columns to refresh UI state or save preferences, respond programmatically to dynamic column hiding for layout recalculations or state management, capture notifications when specific columns vanish from the grid display, configure event listeners for column visibility toggling, monitor and react to user-driven or code-triggered column concealment in data tables, enable callbacks for grid column hide actions to maintain synchronization with application logic and user settings.
</div>

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](/api/javascript/ui/grid/configuration/columns) configuration.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnHide" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      columnMenu: true,
      columnHide: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.column.field); // displays the field of the hidden column
      }
    });
    </script>

#### Example - subscribe to the "columnHide" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnHide(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.column.field); // displays the field of the hidden column
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      columnMenu: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnHide", grid_columnHide);
    </script>

### columnLock

Fired when the user lock a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when a column is locked or pinned in a data grid and trigger custom actions such as updating the interface, saving layout changes, applying user preferences, handling column locking events, listening for column lock state changes, controlling locked columns programmatically, responding to pin or lock interactions, binding event handlers to column lock events, managing column locking behaviors, and implementing custom logic on column lock or unlock events within grid components or table layouts.
</div>

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](/api/javascript/ui/grid/configuration/columns) configuration.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnLock" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 100, locked: true },
        { field: "name", width: 100 },
        { field: "age", width: 50 }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30, id: 1 },
        { name: "John Doe", age: 33, id: 2 }
      ],
      columnMenu: true,
      columnLock: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.column.field); // displays the field of the just locked column
      }
    });
    </script>

#### Example - subscribe to the "columnLock" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnLock(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.column.field); // displays the field of the just locked column
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 100, locked: true },
        { field: "name", width: 100 },
        { field: "age", width: 50 }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30, id: 1 },
        { name: "John Doe", age: 33, id: 2 }
      ],
      columnMenu: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnLock", grid_columnLock);
    </script>

### columnMenuInit

Fired when the column menu is initialized.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Trigger actions when a data grid’s column menu is created or opened, enabling customization of menu options, dynamic modification of menu items, addition of event handlers for menu interactions, or direct manipulation of menu elements at initialization; useful for configuring context menus, controlling menu behavior on column headers, reacting to menu lifecycle events, extending default menu features, setting up additional commands, and tailoring user interface elements related to column menus during grid setup or user interaction.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object representing column menu form element.

##### e.field `String`

The field of the column for which the column menu is initialized.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnMenuInit" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
      ],
      dataSource: [
        { name: "Jane Doe", age: 30},
        { name: "John Doe", age: 33}
      ],
      columnMenu: true,
      columnMenuInit: function(e) {
        var menu = e.container.find(".k-menu").data("kendoMenu");
        var field = e.field;
        menu.append({ text: "Custom" });
        menu.bind("select", function(e) {
          if ($(e.item).text() == "Custom") {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("Custom button for", field);
          }
        });
      }
    });
    </script>

#### Example - subscribe to the "columnMenuInit" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnMenuInit(e) {
      var menu = e.container.find(".k-menu").data("kendoMenu");
      var field = e.field;
      menu.append({ text: "Custom" });
      menu.bind("select", function(e) {
        if ($(e.item).text() == "Custom") {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("Custom button for", field);
        }
      });
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
      ],
      dataSource: [
        { name: "Jane Doe", age: 30},
        { name: "John Doe", age: 33}
      ],
      columnMenu: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnMenuInit", grid_columnMenuInit);
    </script>

### columnMenuOpen

Fired when the grid column menu is opened, after the animations are completed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when a column menu in a grid finishes opening including animation completion to trigger custom logic such as dynamically loading menu items, manipulating the menu DOM, setting focus within the menu, measuring layout or UI dimensions post-animation, and performing actions immediately after the menu becomes visible. Enable handling or responding to column menu open events, listening for menu readiness, customizing interactive menu contents upon display, and integrating event callbacks tied to the fully expanded state of the grid’s column menu interface.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object representing column menu element.

##### e.field `String`

The field of the column for which the column menu is opened.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnMenuOpen" event and open "columns" submenu

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id" },
        { field: "name" },
        { field: "phone" }
      ],
      dataSource: [
        { name: "Jane Doe", id: 1, phone: "88443558741" },
        { name: "John Doe", id: 2, phone: "88443558751" }
      ],
      filterable: true,
      columnMenu: true,
      columnMenuOpen: function(e) {
        var menu = e.container.children().data("kendoMenu");
        menu.open(menu.element.find("li:first"));
      },
    });
    </script>

#### Example - subscribe to the "columnMenuOpen" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnMenuOpen(e) {
        var menu = e.container.children().data("kendoMenu");
        menu.open(menu.element.find("li:first"));
    }

    $("#grid").kendoGrid({
      columns: [
        { field: "id" },
        { field: "name" },
        { field: "phone" }
      ],
      dataSource: [
        { name: "Jane Doe", id: 1, phone: "88443558741" },
        { name: "John Doe", id: 2, phone: "88443558751" }
      ],
      filterable: true,
      columnMenu: true
    });

    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnMenuOpen", grid_columnMenuOpen);
    </script>

### columnReorder

Fired when the user changes the order of a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect, handle, or respond to changes in column order when users drag and move columns within a grid or table component, enabling you to listen for column rearrangement events to update application state, save the new layout or preferences, trigger custom functions on column position changes, synchronize UI elements, or implement custom logic for dynamic reordering and layout adjustments when columns are reordered by user interaction or programmatically.
</div>

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](/api/javascript/ui/grid/configuration/columns) configuration.

##### e.newIndex `Number`

The new column index.

##### e.oldIndex `Number`

The previous column index.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnReorder" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      reorderable: true,
      columnReorder: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.column.field, e.newIndex, e.oldIndex);
      }
    });
    </script>

#### Example - subscribe to the "columnReorder" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnReorder(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.column.field, e.newIndex, e.oldIndex);
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      reorderable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnReorder", grid_columnReorder);
    </script>

### columnResize

Fired when the user resizes a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect changes in table or grid column widths triggered by user resizing actions, capturing and responding to dynamic adjustments in column size to update layouts, save new column dimensions, synchronize related interface elements, or reapply calculations dependent on column width. Listen for column resize events or handlers that activate when users drag column edges, enabling developers to track, control, modify, or persist changes in grid layouts, handle responsive design needs, manage UI updates based on column width modifications, and ensure consistent behavior following interactive column resizing.
</div>

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](/api/javascript/ui/grid/configuration/columns) configuration.

##### e.newWidth `Number`

The new column width.

##### e.oldWidth `Number`

The previous column width.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnResize" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      resizable: true,
      columnResize: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.column.field, e.newWidth, e.oldWidth);
      }
    });
    </script>

#### Example - subscribe to the "columnResize" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnResize(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.column.field, e.newWidth, e.oldWidth);
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      resizable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnResize", grid_columnResize);
    </script>

### columnShow

Fired when the user shows a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when a column becomes visible in a data grid, triggering custom behavior such as updating the user interface, saving or restoring column visibility preferences, refreshing grid content, or tracking visibility changes for analytics and logging. This event fires whenever a user shows a hidden column through any interaction like column menus, choosers, or programmatic changes, enabling dynamic responses like recalculating layout, syncing visibility state, or executing callbacks on visibility state changes within the grid component.
</div>

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](/api/javascript/ui/grid/configuration/columns) configuration.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnShow" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      columnMenu: true,
      columnShow: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.column.field); // displays the field of the hidden column
      }
    });
    </script>

#### Example - subscribe to the "columnShow" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnShow(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.column.field); // displays the field of the hidden column
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      columnMenu: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnShow", grid_columnShow);
    </script>

### columnStick

Fired when the user sticks a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when a user pins, sticks, or fixes a column in a data grid or table to trigger custom actions such as updating the interface, saving the pinned column state, modifying layout, or responding to user interactions with column locking features. Capture events related to column sticking, column pinning, or fixed columns to control UI behavior dynamically, persist user preferences on column positions, or integrate with grid API functions for state management and interface adjustments when columns become fixed or anchored during grid interactions.
</div>

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](/api/javascript/ui/grid/configuration/columns) configuration.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnStick" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800, stickable: true },
        { field: "name", width: 400, sticky: true, stickable: true },
        { field: "age", width: 800, stickable: true }
      ],
      columnMenu: true,
      columnStick: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.column.field); // displays the field of the just sticked column
      },
      dataSource: [ { id: 1, name: "Jane Doe", age: 30 }, { id: 2, name: "John Doe", age: 33 } ]
    });
    </script>

#### Example - subscribe to the "columnStick" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnStick(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.column.field); // displays the field of the just sticked column
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800, stickable: true },
        { field: "name", width: 400, sticky: true, stickable: true },
        { field: "age", width: 800, stickable: true }
      ],
      columnMenu: true,
      dataSource: [ { id: 1, name: "Jane Doe", age: 30 }, { id: 2, name: "John Doe", age: 33 } ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnStick", grid_columnStick);
    </script>

### columnUnlock

Fired when the user unlock a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when a grid column is unlocked, triggered by user actions that remove column locking, enabling developers to handle events for updating application state, saving user layout changes, refreshing interfaces, or running custom logic upon unlocking columns in a data grid. Capture and respond to column unlock interactions, listen for unlock events to trigger dynamic UI updates, manage state changes related to unlocking columns, and configure event handlers within the component context to customize behavior when grid columns become unlocked through user input or programmatic controls.
</div>

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](/api/javascript/ui/grid/configuration/columns) configuration.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnUnlock" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 100, locked: true },
        { field: "name", width: 100 },
        { field: "age", width: 50 }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30, id: 1 },
        { name: "John Doe", age: 33, id: 2 }
      ],
      columnMenu: true,
      columnUnlock: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.column.field); // displays the field of the just unlocked column
      }
    });
    </script>

#### Example - subscribe to the "columnUnlock" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnUnlock(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.column.field); // displays the field of the just unlocked column
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 100, locked: true },
        { field: "name", width: 100 },
        { field: "age", width: 50 }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30, id: 1 },
        { name: "John Doe", age: 33, id: 2 }
      ],
      columnMenu: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnUnlock", grid_columnUnlock);
    </script>

### columnUnstick

Fired when the user unsticks a column.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Capture and respond to user interactions that release or unpin columns previously fixed or frozen in the grid interface, enabling detection of when a column stops being sticky or pinned; utilize event listeners to trigger custom actions such as updating the user interface, saving column state, managing dynamic layout adjustments, handling column reordering or unlocking, synchronizing settings, or executing logic when columns switch from fixed to unfixed status.
</div>

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [column](/api/javascript/ui/grid/configuration/columns) configuration.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "columnUnstick" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800, stickable: true },
        { field: "name", width: 400, sticky: true, stickable: true },
        { field: "age", width: 800, stickable: true }
      ],
      columnMenu: true,
      columnUnstick: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.column.field); // displays the field of the just unsticked column
      },
      dataSource: [ { id: 1, name: "Jane Doe", age: 30 }, { id: 2, name: "John Doe", age: 33 } ]
    });
    </script>

#### Example - subscribe to the "columnUnstick" event after initialization

    <div id="grid"></div>
    <script>
    function grid_columnUnstick(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.column.field); // displays the field of the just unsticked column
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 800, stickable: true },
        { field: "name", width: 400, sticky: true, stickable: true },
        { field: "age", width: 800, stickable: true }
      ],
      columnMenu: true,
      dataSource: [ { id: 1, name: "Jane Doe", age: 30 }, { id: 2, name: "John Doe", age: 33 } ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("columnUnstick", grid_columnUnstick);
    </script>

### dataBinding

Fired before the widget binds to its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
capture or handle events triggered immediately before dataset loading or refreshing in a grid interface, enabling developers to intercept the moment right before data is fetched or displayed, modify query parameters or request options, display or hide loading animations, validate or transform data inputs, implement conditional logic prior to data rendering, control execution flow before data bind occurs, and access the grid instance context for state inspection or dynamic adjustments during the pre-binding phase of data updates or refreshes.
</div>

#### Event Data

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked prevents the data bind action. The table rows will remain unchanged and `dataBound` event will not fire.

##### e.action `String`

The action that caused the dataBinding event. Possible values: `rebind`, `sync`, `add`, `remove`.

##### e.index `Number`

Available if the action is add or remove. Shows the index of the added/removed element.

##### e.items `Array`

The array of items that shows the elements that are going to be added/removed from the widget dataSource.


#### Example - subscribe to the "dataBinding" event before initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      dataBinding: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("dataBinding");
      }
    });
    </script>

#### Example - subscribe to the "dataBinding" event after initialization

    <div id="grid"></div>
    <script>
    function grid_dataBinding(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("dataBinding");
    }
    $("#grid").kendoGrid({
      autoBind: false,
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("dataBinding", grid_dataBinding);
    grid.dataSource.fetch();
    </script>

### dataBound

Fired when the widget is bound to data from its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Execute custom logic or trigger functions immediately after the grid finishes loading or binding data, enabling updates to the user interface, attaching event handlers to individual rows, recalculating layouts dynamically, handling post-data-fetch processing, refreshing visible content, running callbacks on data load completion, managing follow-up actions after data rendering, responding to data source changes, and performing UI updates once the data is fully synchronized, with access to the component instance context for handling state or invoking methods within the data-bound event lifecycle.
</div>

#### Event Data

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "dataBound" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      dataBound: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("dataBound");
      }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization

    <div id="grid"></div>
    <script>
    function grid_dataBound(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("dataBound");
    }
    $("#grid").kendoGrid({
      autoBind: false,
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("dataBound", grid_dataBound);
    grid.dataSource.fetch();
    </script>

#### Example - apply custom cell styling in the dataBound event handler

    <style>
      .k-grid {
        width: 500px;
      }

      .critical {
        background-color: #fdd;
      }

      .warning {
        background-color: #fda;
      }

      .ok {
        background-color: #ced;
      }

    </style>

    <div id="grid-databound-dataitems"></div>
    <script>
      // sample datasource
      var products = [
        { ID: 1, ProductName: "Foo", UnitsInStock: 9, Discontinued: false },
        { ID: 2, ProductName: "Bar", UnitsInStock: 16, Discontinued: false },
        { ID: 3, ProductName: "Baz", UnitsInStock: 3, Discontinued: true }
      ];

      function getUnitsInStockClass(units) {
        if (units < 5) {
          return "critical";
        } else if (units < 10) {
          return "warning";
        } else {
          return "ok";
        }
      }

      $(document).ready(function () {
        $("#grid-databound-dataitems").kendoGrid({
          dataSource: {
            data: products,
            schema: {
              model: {
                id: "ID",
                fields: {
                  ID: { type: "number" },
                  ProductName: { },
                  UnitsInStock: { type: "number" },
                  Discontinued: { type: "boolean" }
                }
              }
            }
          },
          sortable: true,
          columns: [
            { field: "ProductName", title: "Product Name" },
            { field: "UnitsInStock", title:"Units In Stock", width: "120px" },
            { field: "Discontinued", width: "120px" }
          ],
          dataBound: function(e) {
            // get the index of the UnitsInStock cell
            var columns = e.sender.columns;
            var columnIndex = this.wrapper.find(".k-grid-header [data-field=" + "UnitsInStock" + "]").index();

            // iterate the table rows and apply custom cell styling
            var rows = e.sender.tbody.children();
            for (var j = 0; j < rows.length; j++) {
              var row = $(rows[j]);
              var dataItem = e.sender.dataItem(row);
              var units = dataItem.get("UnitsInStock");

              var cell = row.children().eq(columnIndex);
              cell.addClass(getUnitsInStockClass(units));
            }
          }
        });
      });
    </script>

### detailCollapse

Fired when the user collapses a detail table row.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when a user closes or collapses a master-detail row or nested detail section in a data grid, capturing the event triggered as detail rows fold away, enabling execution of cleanup tasks, UI state updates, event tracking, or analytics logging at the moment a detail view is hidden or compressed. This event can be used to respond to detail panel contractions, toggling visibility, managing dynamic content removal, or handling user interactions involving collapsing expandable grid sections within complex data presentations.
</div>

#### Event Data

##### e.detailRow `jQuery`

The jQuery object which represents the detail table row.

##### e.masterRow `jQuery`

The jQuery object which represents the master table row.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "detailCollapse" event during initialization

    <div id="grid"></div>
    <script>
    let encode = kendo.htmlEncode;
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      detailTemplate: ({ name, age }) => `<div>Name: ${encode(name)}</div><div>Age: ${encode(age)}</div>`,
      detailCollapse: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.masterRow, e.detailRow);
      }
    });
    </script>

#### Example - subscribe to the "detailCollapse" event after initialization

    <div id="grid"></div>
    <script>
    let encode = kendo.htmlEncode;
    function grid_detailCollapse(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.masterRow, e.detailRow);
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      detailTemplate: ({ name, age }) => `<div>Name: ${encode(name)}</div><div>Age: ${encode(age)}</div>`
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("detailCollapse", grid_detailCollapse);
    </script>

### detailExpand

Fired when the user expands a detail table row.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect and respond to when a data grid row is expanded to show detailed information, enabling event-driven handling to trigger custom logic, load additional or related data, bind dynamic content, or modify the displayed expanded details. Track user interactions that open or toggle row detail views, configure event listeners for detail expansion actions, and control behaviors when extra row content is revealed. Capture detail expand events to customize UI updates, refresh nested data, or execute functions in response to users expanding grid row details or sub-rows.
</div>

#### Event Data

##### e.detailRow `jQuery`

The jQuery object which represents the detail table row.

##### e.masterRow `jQuery`

The jQuery object which represents the master table row.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "detailExpand" event during initialization

    <div id="grid"></div>
    <script>
    let encode = kendo.htmlEncode;
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      detailTemplate: ({ name, age }) => `<div>Name: ${encode(name)}</div><div>Age: ${encode(age)}</div>`,
      detailExpand: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.masterRow, e.detailRow);
      }
    });
    </script>

#### Example - get the data items of the expanded master and detail rows

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        dataSource: {
          data: [
            { EmployeeID: 1, FirstName: "Nancy", LastName: "Davolio", Country: "USA"},
            { EmployeeID: 2, FirstName: "Andrew", LastName: "Fuller", Country: "USA"},
            { EmployeeID: 3, FirstName: "Janet", LastName: "Leverling", Country: "Germany"}
          ]
        },
        pageable: true,
        detailInit: detailInit,
        dataBound: function() {
          this.expandRow(this.tbody.find("tr.k-master-row").first());
        },
        columns: [
          {
            field: "FirstName",
            title: "First Name",
            width: "110px"
          },
          {
            field: "LastName",
            title: "Last Name",
            width: "110px"
          },
          {
            field: "Country",
            width: "110px"
          }
        ],
        detailExpand: function(e) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          var masterDataItem = e.sender.dataItem(e.masterRow);
          // get detail Grid data
          //var detailDataItems = e.detailRow.find(".k-grid").data("kendoGrid").dataSource.data();

          //get detail grid data items using dataItem()
          var detailGridRows = e.detailRow.find(".k-master-row");
          var detailGrid = e.detailRow.find(".k-grid").data("kendoGrid");
          var detailDataItems = [];
          detailGridRows.each(function(idx, row){
            detailDataItems.push(detailGrid.dataItem(row))
          });

          console.log("master row dataItem", masterDataItem);
          console.log("detail row dataItem", detailDataItems);
        }
      });

      function detailInit(e) {
        $("<div/>").appendTo(e.detailCell).kendoGrid({
          dataSource: {
            data: [
              {EmployeeID: 1, OrderID: 10258, ShipCountry: "Austria" },
              {EmployeeID: 2, OrderID: 10558, ShipCountry: "Spain" },
              {EmployeeID: 1, OrderID: 10256, ShipCountry: "France" },
              {EmployeeID: 3, OrderID: 11005, ShipCountry: "Spain" }
            ],
            filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
          },
          pageable: true,
          columns: [
            { field: "OrderID", width: "110px" },
            { field: "ShipCountry", title:"Ship Country", width: "110px" }
          ]
        });
      }
    </script>

#### Example - subscribe to the "detailExpand" event after initialization

    <div id="grid"></div>
    <script>
    let encode = kendo.htmlEncode;
    function grid_detailExpand(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.masterRow, e.detailRow);
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      detailTemplate: ({ name, age }) => `<div>Name: ${encode(name)}</div><div>Age: ${encode(age)}</div>`
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("detailExpand", grid_detailExpand);
    </script>

### detailInit

Fired when a detail table row is initialized.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Trigger or listen for initialization events when expanding or creating detail rows in a grid or table, enabling custom setup, dynamic content loading, attaching event listeners, embedding nested components, or manipulating the DOM of detail sections upon row expansion. Capture and handle the moment when a detail row is rendered or added, allowing customization of detail templates, configuring child elements, initializing sub-grids or widgets inside parent grid rows, and controlling behavior at the point of detail row creation or expansion in tabular data interfaces.
</div>

#### Event Data

##### e.data `kendo.data.ObservableObject`

The data item to which the master table row is bound.

##### e.detailCell `jQuery`

The jQuery object which represents the detail table cell.

##### e.detailRow `jQuery`

The jQuery object which represents the detail table row.

##### e.masterRow `jQuery`

The jQuery object which represents the master table row.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "detailInit" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        {
          name: "Beverages",
          products: [
            { name: "Tea" },
            { name: "Coffee" }
          ]
        },
        {
          name: "Food",
          products: [
            { name: "Ham" },
            { name: "Bread" }
          ]
        }
      ],
      detailTemplate: 'Products: <div class="grid"></div>',
      detailInit: function(e) {
        e.detailRow.find(".grid").kendoGrid({
          dataSource: e.data.products
        });
      }
    });
    </script>

#### Example - subscribe to the "detailInit" event after initialization

    <div id="grid"></div>
    <script>
    function grid_detailInit(e) {
      e.detailRow.find(".grid").kendoGrid({
        dataSource: e.data.products
      });
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        {
          name: "Beverages",
          products: [
            { name: "Tea" },
            { name: "Coffee" }
          ]
        },
        {
          name: "Food",
          products: [
            { name: "Ham" },
            { name: "Bread" }
          ]
        }
      ],
      detailTemplate: 'Products: <div class="grid"></div>'
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("detailInit", grid_detailInit);
    </script>

### edit

Fired when the user edits or creates a data item.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Capture and respond to user actions when modifying or adding data entries in a grid or table environment, including initiating edits, updating existing items, or creating new records. Enable interception of save and create operations, validate user input in real time, customize or replace default editing interfaces, and implement conditional logic during data entry phases. Support triggering callbacks or event handlers during editing start, data changes, or form submissions within grid components, enhancing control over editing workflows, data validation, and dynamic UI adjustments during inline or popup editing scenarios.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object of the edit container element, which wraps the editing UI. Depending on the [Grid edit mode](/api/javascript/ui/grid/configuration/editable.mode), the container is different:

* "incell" edit mode - the container element is a table cell
* "inline" edit mode - the container is a table row
* "popup" edit mode - the container is a Kendo UI Window [element](/framework/widgets/wrapper-element), which provides an easy way to obtain a reference to the Window widget object,
e.g. to [attach additional events](/intro/installation/events-and-methods#bind-to-events-after-widget-initialization).

##### e.model `kendo.data.Model`

The data item which is going to be edited. Use its [isNew](/api/javascript/data/model/methods/isnew) method to check if the data item is new (created) or not (edited).

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "edit" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id" },
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            id: "id",
            fields: {
              "id": { type: "number" }
            }
          }
        }
      },
      editable: "popup",
      toolbar:["create"],
      edit: function(e) {
        if (!e.model.isNew()) {
          // Disable the editor of the "id" column when editing data items
          var numeric = e.container.find("input[name=id]").data("kendoNumericTextBox");
          numeric.enable(false);
        }
      }
    });
    </script>

#### Example - subscribe to the "edit" event after initialization

    <div id="grid"></div>
    <script>
    function grid_edit(e) {
      if (!e.model.isNew()) {
        // Disable the editor of the "id" column when editing data items
        var numeric = e.container.find("input[name=id]").data("kendoNumericTextBox");
        numeric.enable(false);
      }
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "id" },
        { field: "name" },
        { field: "age" },
        { command: "edit" }
      ],
      dataSource: {
        data: [
          { id: 1, name: "Jane Doe", age: 30 },
          { id: 2, name: "John Doe", age: 33 }
        ],
        schema: {
          model: {
            id: "id",
            fields: {
              "id": { type: "number" }
            }
          }
        }
      },
      editable: "popup",
      toolbar:["create"]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("edit", grid_edit);
    </script>

#### Example - container element when the edit mode is set to "incell"

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: {
              id: "id",
              fields: {
                "id": { type: "number" }
              }
            }
          }
        },
        editable: "incell",
        toolbar:["create"],
        edit: function(e) {
          var container = e.container;
          container.css("background-color", "#90EE90");
        }
      });
    </script>

#### Example - container element when the edit mode is set to "inline"

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" },
          { command: "edit" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: {
              id: "id",
              fields: {
                "id": { type: "number" }
              }
            }
          }
        },
        editable: "inline",
        toolbar:["create"],
        edit: function(e) {
          var container = e.container;
          container.css("background-color", "#90EE90");
        }
      });
    </script>

#### Example - container element when the edit mode is set to "popup"

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" },
          { command: "edit" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: {
              id: "id",
              fields: {
                "id": { type: "number" }
              }
            }
          }
        },
        editable: "popup",
        toolbar:["create"],
        edit: function(e) {
          var container = e.container;
          container.css("background-color", "#90EE90");
        }
      });
    </script>

### excelExport

Fired when the user clicks the "Export to Excel" toolbar button.


<div class="meta-api-description">
Listen for export to Excel actions from grid data, capture events triggered by user interactions with the export button, customize or intercept Excel file generation, modify export settings, apply filters or formatting before export, run custom export logic or alternative workflows, respond to data extraction requests, control export behavior dynamically, and handle user-initiated Excel downloads from grid interfaces.
</div>

#### Event Data

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

##### e.data `Array`

The array of data items used to create the Excel workbook. Available since version 2014.3.1205.

##### e.workbook `kendo.ooxml.Workbook`

The Excel [workbook configuration object](/api/javascript/ooxml/workbook#configuration). Used to initialize a `kendo.ooxml.Workbook` class. Modifications of the workbook will reflect in the output Excel document.

> When the Kendo UI Grid is configured for excel export, the workbook is extended internally with a `fileName` property which is used when the file is saved. The default name is "Export.xlsx". See the example below which shows how to change the name of the exported document.

##### e.preventDefault `Function`

If invoked the grid will not save the generated file.

#### Example - subscribe to the "excelExport" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["excel"],
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe"},
        { name: "John Doe"}
      ],
      excelExport: function(e) {
        e.workbook.fileName = "Grid.xlsx";
      }
    });
    var grid = $("#grid").data("kendoGrid");
    grid.saveAsExcel();
    </script>

#### Example - subscribe to the "excelExport" event after initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["excel"],
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe"},
        { name: "John Doe"}
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("excelExport", function(e) {
        e.workbook.fileName = "Grid.xlsx";
    });
    grid.saveAsExcel();
    </script>

### filter

Fired when the user is about to filter the DataSource via the filter UI.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

Introduced in the Kendo UI 2016 R3 (2016.3.914) release.


<div class="meta-api-description">
Intercept user filtering actions, customize or validate pending filter conditions before data updates, trigger logic when filtering UI inputs activate, control or modify filter operations prior to applying them on the dataset, detect and manage user-initiated filter events within the grid interface, enable pre-filtering hooks for asynchronous checks or conditional filtering, handle and inspect filter parameters before the DataSource refresh, respond to filter changes initiated via UI controls, listen for filter interaction events to dynamically adjust or prevent filtering, integrate event-driven filter customization within data grid components.
</div>

#### Event Data

##### e.filter `Object`

The selected filter descriptor. If `null` the filter has been cleared for example by click on the `clear` button.

##### e.field `String`

The field for which the filter is constructed.

##### e.preventDefault `Function`

If invoked prevents adding the filter descriptor to the DataSource.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "filter" event during initialization

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: { id: "id" }
          }
        },
        filterable: true,
        filter: function(e) {
          if (e.filter == null) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("filter has been cleared");
          } else {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.filter.logic);
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.filter.filters[0].field);
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.filter.filters[0].operator);
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.filter.filters[0].value);
          }
        }
      });
    </script>

#### Example - subscribe to the "filter" event after initialization

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: { id: "id" }
          }
        },
        filterable: true
      });
      var grid = $("#grid").data("kendoGrid");
      grid.bind("filter", function(e) {
        if (e.filter == null) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("filter has been cleared");
        } else {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.filter.logic);
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.filter.filters[0].field);
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.filter.filters[0].operator);
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.filter.filters[0].value);
        }
      });
    </script>

### filterMenuInit

Fired when the grid filter menu is initialized, when it is opened for the first time.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Control and customize the initialization of column filter menus in data grids by intercepting the event triggered when filter UIs open for the first time, enabling developers to modify filter menu elements, inject custom filter operators, preset filter values, enhance user interface components, and dynamically adjust filter behavior before display. This includes hooking into event handlers that provide access to the grid component instance for configuring or extending default filtering controls, adapting filter panels on demand, and tailoring filtering interactions in real-time as the filter menu is created and rendered. Optimize filter menu customization, setup initial filter states, and extend filter options through event-driven modification of filtering interfaces at first launch or initialization.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object representing filter menu form element.

##### e.field `String`

The field of the column for which the filter menu is initialized.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "filterMenuInit" event during initialization and change the default operators

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe"},
        { name: "John Doe"}
      ],
      filterable: true,
      filterMenuInit: function(e) {
        if (e.field == "name") {
          var firstValueDropDown = e.container.find("select:eq(0)").data("kendoDropDownList");
          firstValueDropDown.value("contains");
          firstValueDropDown.trigger("change");

          var logicDropDown = e.container.find("select:eq(1)").data("kendoDropDownList");
          logicDropDown.value("or");
          logicDropDown.trigger("change");

          var secondValueDropDown = e.container.find("select:eq(2)").data("kendoDropDownList");
          secondValueDropDown.value("contains");
          secondValueDropDown.trigger("change");
        }
      }
    });
    </script>

#### Example - subscribe to the "filterMenuInit" event after initialization

    <div id="grid"></div>
    <script>
    function grid_filterMenuInit(e) {
      if (e.field == "name") {
        var firstValueDropDown = e.container.find("select:eq(0)").data("kendoDropDownList");
        firstValueDropDown.value("contains");
        var logicDropDown = e.container.find("select:eq(1)").data("kendoDropDownList");
        logicDropDown.value("or");
        var secondValueDropDown = e.container.find("select:eq(2)").data("kendoDropDownList");
        secondValueDropDown.value("contains");
      }
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe"},
        { name: "John Doe"}
      ],
      filterable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("filterMenuInit", grid_filterMenuInit);
    </script>

### filterMenuOpen

Fired when the grid filter menu is opened, after the animations are completed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when a grid’s filter dropdown or filter menu finishes opening and the opening animations are fully completed to trigger actions such as setting focus, loading dynamic or asynchronous filter options, running post-animation scripts, or initializing UI elements after the filter controls become visible and interactive. Capture the moment when filter panels appear and become ready to interact, enabling reactive behavior, custom logic execution after filter menus expand, or dynamic content injection once the grid filtering interface is fully displayed and user-ready.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object representing filter menu form element.

##### e.field `String`

The field of the column for which the filter menu is opened.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "filterMenuOpen" event and focus second input

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe"},
        { name: "John Doe"}
      ],
      filterable: true,
      filterMenuOpen: function(e) {
        if (e.field == "name") {
          e.container.find(".k-textbox:last").focus();
        }
      },
    });
    </script>

#### Example - subscribe to the "filterMenuOpen" after initialization and focus second input

    <div id="grid"></div>
    <script>
    function grid_filterMenuOpen(e) {
      if (e.field == "name") {
        e.container.find(".k-textbox:last").focus();
      }
    }

    $("#grid").kendoGrid({
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe"},
        { name: "John Doe"}
      ],
      filterable: true,
    });

    var grid = $("#grid").data("kendoGrid");
    grid.bind("filterMenuOpen", grid_filterMenuOpen);
    </script>

### group

Fired when the user is about to group the DataSource or modify the group descriptors state via the Grid group panel.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

Introduced in the Kendo UI 2016 R3 (2016.3.914) release.


<div class="meta-api-description">
Capture and manage user interactions that modify data grouping in a grid interface, detect when grouping criteria are added, removed, or changed through the group panel or programmatic updates, intercept events triggered before grouping state updates to enable dynamic UI refreshes or custom logic execution, control and respond to adjustments in grouped data sets, handle group descriptor changes efficiently, and implement real-time reactions to user-driven or code-driven grouping actions within tabular data displays.
</div>

#### Event Data

##### e.groups `Array`

The selected group descriptors.

##### e.preventDefault `Function`

If invoked prevents applying the group descriptors changes to the DataSource and to the group panel UI.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "group" event during initialization

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: { id: "id" }
          }
        },
        groupable: true,
        group: function(e) {
          if (e.groups.length) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.groups[0].field);
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.groups[0].dir);
          }
        }
      });
    </script>

#### Example - subscribe to the "group" event after initialization

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: { id: "id" }
          }
        },
        groupable: true
      });
      var grid = $("#grid").data("kendoGrid");
      grid.bind("group", function(e) {
        if (e.groups.length) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.groups[0].field);
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.groups[0].dir);
        }
      });
    </script>

### groupCollapse

Fired when the user collapses a group row.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

Introduced in the Kendo UI 2017 R3 (2017.3.913) release.


<div class="meta-api-description">
Detect when a grouped row in a data grid is collapsed to trigger custom actions such as updating user interface elements, managing selection states, synchronizing or loading data dynamically, or modifying application state based on group collapse events. Capture and handle events fired upon user interaction that closes or hides grouped rows, enabling developers to configure event listeners, execute callback functions, or run code linked to group expand/collapse behavior, and respond effectively to changes in data grouping or UI structure within grid components.
</div>

#### Event Data

##### e.element `jQuery`

The jQuery object which represents the group row.

##### e.group `Object`

The group object associated with group row.

##### e.preventDefault `Function`

If invoked prevents collapsing of the group.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "groupCollapse" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
	  groupable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      groupCollapse: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.element, e.group);
      }
    });
    </script>

#### Example - subscribe to the "groupCollapse" event after initialization

    <div id="grid"></div>
    <script>
    function grid_groupCollapse(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.element, e.group);
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      groupable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("groupCollapse", grid_groupCollapse);
    </script>

### groupExpand

Fired when the user expands a group row.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

Introduced in the Kendo UI 2017 R3 (2017.3.913) release.


<div class="meta-api-description">
Detect and respond when a user expands or opens a grouped row in a data grid, trigger custom actions on group expansion such as updating the user interface, loading additional or related data dynamically, executing code in reaction to the expand event, tracking user interactions for analytics, monitoring group expand behavior in grids, handling events fired upon expanding group headers, reacting to group toggling or unfolding in tabular data displays, controlling or customizing responses when grouped items are revealed, and integrating callbacks that run when grouped sections become visible, typically with event handler functions bound to the grid component instance.
</div>

#### Event Data

##### e.element `jQuery`

The jQuery object which represents the group row.

##### e.group `Object`

The group object associated with group row.

##### e.preventDefault `Function`

If invoked prevents expanding of the group.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "groupExpand" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
	  groupable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      groupExpand: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.element, e.group);
      }
    });
    </script>

#### Example - subscribe to the "groupExpand" event after initialization

    <div id="grid"></div>
    <script>
    function grid_groupExpand(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log(e.element, e.group);
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      groupable: true,
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("groupExpand", grid_groupExpand);
    </script>

### navigate

> Important: This event is available with the Q3 2015 SP1 release.

Fired when [navigatable](/api/javascript/ui/grid/configuration/navigatable) is enabled and the user change current item with either
mouse or keyboard interaction.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect changes in the current selection or focused item within a data grid when users navigate using keyboard arrows, mouse clicks, or other input methods. Capture and respond to user-driven movement across rows or cells by handling navigation events that trigger on item focus shifts, enabling updating of selection states, dynamic loading of related data, managing focus management, or implementing custom navigation workflows and interaction patterns. Useful for tracking item changes during keyboard or mouse navigation to synchronize UI components, trigger actions on selection changes, or handle cursor movement within grid interfaces.
</div>

#### Event Data

##### e.element `jQuery`

A jQuery object of the new hightlighted cell.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "navigate" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 100, locked: true },
        { field: "name", width: 100 },
        { field: "age", width: 50 }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30, id: 1 },
        { name: "John Doe", age: 33, id: 2 }
      ],
      navigatable: true,
      navigate: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.element); // displays the newly highlighted cell
      }
    });
    </script>

#### Example - subscribe to the "navigate" event after initialization

    <div id="grid"></div>
    <script>
    function grid_navigate(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.element); // displays the newly highlighted cell
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "id", width: 100, locked: true },
        { field: "name", width: 100 },
        { field: "age", width: 50 }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30, id: 1 },
        { name: "John Doe", age: 33, id: 2 }
      ],
      navigatable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("navigate", grid_navigate);
    </script>

### page

Fired when the user is about change the current page index of DataSource via the pager UI.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

Introduced in the Kendo UI 2016 R3 (2016.3.914) release.


<div class="meta-api-description">
Intercept or respond to user-triggered pagination events in a data grid to detect, control, or customize behavior when a user navigates between pages using the pager interface. Capture page change actions, monitor or override the current page index update, handle page navigation events emitted by grid components, and manage page transitions programmatically or via UI interactions. Enable event-driven pagination control to react to, prevent, or log user-initiated page navigation in tabular data displays, including hooking into page change callbacks, configuring event handlers for page shifts, and integrating with data source paging mechanisms. Support scenarios where developers need to hook into pager clicks, track page changes, or control paged data loading dynamically in client-side or server-driven grids.
</div>

#### Event Data

##### e.page `Number`

The selected page index.

##### e.preventDefault `Function`

If invoked prevents applying the changes to the DataSource.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "page" event during initialization

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          pageSize: 1,
          schema: {
            model: { id: "id" }
          }
        },
        pageable: true,
        page: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.page);
        }
      });
    </script>

#### Example - subscribe to the "page" event after initialization

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          pageSize: 1,
          schema: {
            model: { id: "id" }
          }
        },
        pageable: true
      });
      var grid = $("#grid").data("kendoGrid");
      grid.bind("page", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.page);
      });
    </script>

### paste

Fired when the user pastes data using the Grid's built-in paste mechanism.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect and handle clipboard paste actions within the data grid by responding to paste events triggered when users insert content via keyboard shortcuts or context menu pasting. Capture, validate, transform, or modify pasted data dynamically as it enters the grid, enabling custom processing, filtering, or triggering updates and side effects based on the clipboard content. Utilize event listeners to control or customize paste behavior, intercept user input from the clipboard, and integrate with grid data editing workflows, ensuring seamless data validation, sanitization, or augmentation during paste operations.
</div>

#### Event Data

##### e.items `Array`

The updated or added rows from the paste operation.

##### e.type `String`

The type of the paste operation—`replace` or `insert`.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["paste"], // Creates a dropdownlist that enables you to switch between replace and insert modes.
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { id:1, name: "Jane Doe", age: 30 },
        { id:2, name: "John Doe", age: 33 }
      ],
      allowPaste: true,
      navigatable: true,
      selectable: {
        mode: "multiple cell"
      },
      paste: function(e) {
	      /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.items, e.type);
      }
    });
    </script>

### pdfExport

Fired when the user clicks the "Export to PDF" toolbar button.


<div class="meta-api-description">
Capture and respond to clicks on the export to PDF button in a data grid, enabling customization or interception of PDF generation workflows, handling export triggers, modifying or extending default PDF export actions, prompting users for export options, controlling export initiation, overriding automatic PDF creation, integrating custom logic before PDF output, and managing toolbar export commands for grids.
</div>

#### Event Data

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked the grid will not save the generated file.

##### e.promise `Promise`

A promise that will be resolved when the export completes.

The promise [progress handler](https://api.jquery.com/deferred.progress/) will be called periodically with the following arguments:
* page - The current page content. An instance of [drawing.Group](/api/javascript/drawing/group)
* pageNumber - The current page number
* progress - Number if the range 0 to 1, indicating the progress of the current export operation
* totalPages - The total number of pages

Any changes to the page content group will be applied, including PDF page options.
This allows you to change paper size, orientation and apply transformations on each individual page.

#### Example - Monitor export progress

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["pdf"],
      columns: [
        { field: "name" }
      ],
      dataSource: {
        data: [{ name: "Jane Doe"},
               { name: "John Doe"},
               { name: "Tim Doe"},
               { name: "Alice Doe"}],
        pageSize: 2
      },
      pageable: true,
      pdf: {
          allPages: true
      },
      pdfExport: function(e) {
        e.promise
        .progress(function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(kendo.format("{0:P} complete", e.progress));
        })
        .done(function() {
            alert("Export completed!");
        });
      }
    });
    var grid = $("#grid").data("kendoGrid");
    grid.saveAsPDF();
    </script>

#### Example - Change page orientation on the fly

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["pdf"],
      columns: [
        { field: "name" }
      ],
      dataSource: {
        data: [{ name: "Jane Doe"},
               { name: "John Doe"},
               { name: "Tim Doe"},
               { name: "Alice Doe"}],
        pageSize: 2
      },
      pdf: {
        allPages: true,
        paperSize: "A3",
        landscape: false
      },
      pdfExport: function(e) {
        e.promise
        .progress(function(e) {
            if (e.pageNumber > 1) {
                e.page.options.pdf = {
                    landscape: true
                };
            }
        });
      }
    });
    var grid = $("#grid").data("kendoGrid");
    grid.saveAsPDF();
    </script>

### remove

Fired when the user clicks the "destroy" command button and delete operation is confirmed in the confirmation window, if the cancel button in the window is clicked the event will not be fired.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Handle actions triggered when an item is deleted from the grid by detecting confirmed removals, responding to user-initiated delete commands, running custom functions on successful deletions, managing post-delete logic only after confirmation windows are accepted, ignoring canceled delete attempts, binding event handlers to the grid instance for access to component methods and internal state updates, controlling workflows after confirmed grid item removal, and integrating cleanup, notifications, or data refresh tasks following user-confirmed record deletion events.
</div>

#### Event Data

##### e.model `kendo.data.Model`

The data item to which the table row is bound.

##### e.row `jQuery`

The jQuery object representing the current table row.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "remove" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: {
        data:[
          { id: 1, name: "Jane Doe", age: 30},
          { id: 2, name: "John Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true,
      remove: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("Removing", e.model.name);
      }
    });
    </script>

#### Example - subscribe to the "remove" event after initialization

    <div id="grid"></div>
    <script>
    function grid_remove(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Removing", e.model.name);
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: {
        data:[
          { id: 1, name: "Jane Doe", age: 30},
          { id: 2, name: "John Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("remove", grid_remove);
    </script>


### rowReorder

Fired when the user changes the order of a row.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect and respond to user-driven row reordering actions in data grids, capturing events triggered when rows are moved or repositioned by drag-and-drop or other interactions, enabling developers to execute custom logic for updating datasets, syncing changes, persisting new row sequences, managing state after row rearrangement, and integrating with event handlers that provide contextual access to the grid component instance during reorder operations.
</div>

#### Event Data

##### e.row `jQuery`

The jQuery object representing the table row being reordered.

##### e.rows `jQuery`

Available when multiple rows are dragged - the jQuery object representing the selected and dragged rows.

> When you Drap and Drop multiple items from one instance of the Grid to another the selected and dragged rows are available by the selected rows of the external Grid via the [`select`](/api/javascript/ui/grid/methods/select) method.

`selectedRows = externalGrid.select();`

##### e.newIndex `Number`

The new row index.

##### e.oldIndex `Number`

The previous row index.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked prevents the rowReorder action - prevents the client-side reordering.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { id:1, name: "Jane Doe", age: 30 },
        { id:2, name: "John Doe", age: 33 }
      ],
      reorderable: {
        rows: true
      },
      rowReorder: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.row, e.newIndex, e.oldIndex);
      }
    });
    </script>

#### Example - reordering with multiple selection

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { id:1, name: "Jane Doe", age: 30 },
        { id:2, name: "John Doe", age: 33 }
      ],
      reorderable: {
        rows: true
      },
      selectable: "multiple, row",
      rowReorder: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.row, e.rows, e.newIndex, e.oldIndex);
      }
    });
    </script>

### rowResize

Fired when the user resizes a row (rows).

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect and handle user actions when rows in a data grid or table are resized, enabling you to listen for row height changes caused by drag, pointer, or manual resizing gestures. Capture resize events on grid rows to trigger custom callbacks for updating layout, saving new row dimensions, dynamically adjusting UI components, or syncing row heights with external data. Respond programmatically to interactive row resizing in grids, tables, or lists, allowing developers to configure event listeners and run custom logic whenever a user modifies row dimensions through pointer or touch input. Track and manage row resizing interactions to enhance user interface behavior, persist size preferences, or reflow content based on updated row sizes to maintain responsive, flexible, and user-driven layouts.
</div>

#### Event Data

##### e.row `jQuery`

A jQuery object holding a reference to the resized row element.

##### e.rows `jQuery`

A jQuery object holding a reference to all row elements that would be affected by the resizing. In scenario where row selection is enabled, users are allowed to resize all selected rows at once by performing the resize on one of them.

##### e.newHeight `Number`

The new row height.

##### e.oldHeight `Number`

The previous row height.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 }
      ],
      resizable: { rows: true },
      rowResize: function(e) {
	      /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.row, e.newHeight, e.oldHeight);
      }
    });
    </script>

### save

Fired when a data item is saved.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Detect when a data entry or record is successfully saved in a data grid or table component, enabling execution of custom logic immediately after saving such as updating the display, refreshing or reloading data sources, triggering user notifications, or performing post-save validation and side effects. Capture save completion events to hook into processes that require synchronized UI updates, data consistency checks, or chained operations following a save action. Configure event listeners that respond to save confirmations, commit events, or data persistence success, accessing grid methods and properties within the event context for advanced control and extension. This facilitates handling asynchronous save workflows, implementing custom save callbacks, and ensuring smooth user interaction after dataset modifications.
</div>

#### Event Data

##### e.model `kendo.data.Model`

The data item to which the table row is bound. If `e.model.id` is null, then a newly created row is being saved.

##### e.container `jQuery`

The jQuery object representing the current edit container element. More information is available in the [edit event arguments' description](/api/javascript/ui/grid/events/edit).

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

##### e.values `Object`

The values entered by the user. **Available only when the [editable.mode](/api/javascript/ui/grid/configuration/editable.mode) option is set to "incell".**

##### e.preventDefault `Function`

If invoked, prevents the save action. In "incell" [editable.mode](/api/javascript/ui/grid/configuration/editable.mode) the edited table cell will exit edit mode. In "inline" and "popup" edit modes, the edit form will remain open.

#### Example - subscribe to the "save" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: {
        data:[
          { id: 1, name: "Jane Doe", age: 30},
          { id: 2, name: "John Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true,
      save: function(e) {
        if (e.values.name !== "") {
          // the user changed the name field
          if (e.values.name !== e.model.name) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("name is modified");
          }
        } else {
            e.preventDefault();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("name cannot be empty");
        }
      }
    });
    </script>

#### Example - subscribe to the "save" event after initialization

    <div id="grid"></div>
    <script>
    function grid_save(e) {
        if (e.values.name !== "") {
          // the user changed the name field
          if (e.values.name !== e.model.name) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("name is modified");
          }
        } else {
            e.preventDefault();
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("name cannot be empty");
        }
    }
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: {
        data:[
          { id: 1, name: "Jane Doe", age: 30},
          { id: 2, name: "John Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true
    });
    var grid = $("#grid").data("kendoGrid");
    grid.bind("save", grid_save);
    </script>

### saveChanges

Fired when the user clicks the "Save changes" command button in the toolbar.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
Capture and respond to user actions that commit multiple edits or updates within a data grid, such as clicking a save button to trigger batch validation, input checking, saving modified records, or finalizing changes made through an editing interface; manage events related to persisting or submitting edited data sets, handling toolbar save commands, and coordinating user-triggered save operations in tabular or grid components.
</div>

#### Event Data

##### e.preventDefault `Function`

If invoked the grid will not call the [sync](/api/javascript/data/datasource/methods/sync) method of the data source.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "saveChanges" event during initialization

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      columns: [
        { field: "name" },
        { field: "age" },
        { command: "destroy" }
      ],
      dataSource: {
        data:[
          { id: 1, name: "Jane Doe", age: 30},
          { id: 2, name: "John Doe", age: 33}
        ],
        schema: {
          model: { id: "id" }
        }
      },
      editable: true,
      saveChanges: function(e) {
        if (!confirm("Are you sure you want to save all changes?")) {
           e.preventDefault();
        }
      },
      toolbar: ["save"]
    });
    </script>

#### Example - subscribe to the "saveChanges" event after initialization

    <div id="grid"></div>
    <script>
      function grid_saveChanges(e) {
        if (!confirm("Are you sure you want to save all changes?")) {
          e.preventDefault();
        }
      }
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" },
          { command: "destroy" }
        ],
        dataSource: {
          data:[
            { id: 1, name: "Jane Doe", age: 30},
            { id: 2, name: "John Doe", age: 33}
          ],
          schema: {
            model: { id: "id" }
          }
        },
        editable: true,
        toolbar: ["save"]
      });
      var grid = $("#grid").data("kendoGrid");
      grid.bind("saveChanges", grid_saveChanges);
    </script>

### sort

Fired when the user is about to modify the current state of sort descriptors of DataSource via the sort UI.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

Introduced in the Kendo UI 2016 R3 (2016.3.914) release.


<div class="meta-api-description">
Handle or listen for sorting actions initiated by users through the grid’s interface to detect when the order or priority of columns is about to change, enabling inspection, custom validation, cancellation, or modification of the upcoming sort criteria before they apply to the underlying data source; capture user-driven reorder attempts, adjust or override sort parameters dynamically, intercept column header clicks, manage multi-column sort sequences, respond to sorting events programmatically, control the sort behavior during interactive UI operations, and integrate custom logic triggered when sorting preferences are modified within the grid component.
</div>

#### Event Data

##### e.sort `Object`

The selected sort descriptors.

##### e.preventDefault `Function`

If invoked prevents applying the changes to the DataSource.

##### e.sender `kendo.ui.Grid`

The widget instance which fired the event.

#### Example - subscribe to the "sort" event during initialization

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: { id: "id" }
          }
        },
        sortable: true,
        sort: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.sort.field);
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.sort.dir);
        }
      });
    </script>

#### Example - subscribe to the "sort" event after initialization

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, name: "Jane Doe", age: 30 },
            { id: 2, name: "John Doe", age: 33 }
          ],
          schema: {
            model: { id: "id" }
          }
        },
        sortable: true
      });
      var grid = $("#grid").data("kendoGrid");
      grid.bind("sort", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.sort.field);
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.sort.dir);
      });
    </script>
