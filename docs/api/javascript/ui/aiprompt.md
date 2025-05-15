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
        });
    </script>
### showOutputRating `Boolean` *(default: true)*

Specifies if the output rating should be displayed on the output card.

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

Adds a prompt output to the `promptOutputs` collection. If the active views is `OutputView`, calls the view's `addPromptOutput` method.

#### Parameters

##### promptOutput `Object`

The prompt output to add. The output should have the following properties:

- `output` - The output content generated from the prompt.
- `prompt` - The prompt text used to generate this output.
- `id` - *Optional* - The id of the prompt output. If none is provided, the id will be generated as a `kendo.guid()`. The ID is rendered as data-id attribute in the prompt output.

#### Example
    <div id="aiprompt"></div>
    <script>
    var aiprompt = $("#aiprompt").kendoAIPrompt({ activeView: 1 }).data("kendoAIPrompt");
    aiprompt.addPromptOutput({ prompt: "create object 1", output: "Description 1" });
    </script>

### getViews

Returns an array of views of the AIPrompt.

#### Returns

`Array` An array of views of the AIPrompt.

## Events

### commandExecute

Triggered when a command item from the Commands view is clicked. The panel bar dataItem of the selected item is available through the event argument.

### promptRequest

Triggered when the prompt view Generate output button is clicked. The prompt text is available through the event argument. Suitable to make a request to the AI service to receive an output. Use the `addPromptOutput` method to add the generated output to the `promptOutputs` collection.

The `prompt`, `output`, `history` and `isRetry` properties are available in the event argument. When the output is generated after clicking the retry button of an output, the `isRetry` property is `true` and the `output` property is the output content of the output card. The history property is an array of prompt outputs generated before the current output.

### promptResponse

Triggered when the AI service response is received. The response object is available through the event argument. Triggered only when the `serviceUrl` option is set.

The `output` property is availble in the event argument.

### outputRatingChange

Triggered when the rating of an output is changed through the rate buttons of an output. The output id and the new rating are available through the event argument.

### outputCopy

Triggered when the copy output button of an output is clicked. The `prompt` and the `output` object are available through the event argument.

