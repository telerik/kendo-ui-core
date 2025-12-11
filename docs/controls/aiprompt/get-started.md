---
title: Getting Started
page_title: jQuery AIPrompt Documentation - Getting Started with the AIPrompt
description: "Get started with the jQuery AIPrompt by Kendo UI and learn how to create the component."
components: ["aiprompt"]
slug: getting_started_kendoui_aiprompt_component
position: 1
---

# Getting Started with the AIPrompt

This guide demonstrates how to get up and running with the Kendo UI for jQuery AIPrompt.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
  <div id="aiprompt"></div>
  <script>
      var promptCommands = [
        {
          id: "1",
          text: "Simplify",
          icon: "min-width",
        },
        {
          id: "2",
          text: "Extend",
          icon: "arrows-left-right",
        },
      ];
      var promptData = [
        {
          suggestion: "Out of office (contact colleague)",

          simplify: `Simplified Out of Office response`,
          extend: `Extended Out of Office response`,
        },       
        {
          suggestion: "LinkedIn post for work/life balance and well-being",

          simplify: `Simplifed LinkedIn response`,
          extend: `Extended LinkedIn response`
        }]

      $("#aiprompt").kendoAIPrompt({ 
        commandExecute: function(e) {
          var output = this.promptOutputs[0].prompt;
          const response = promptData.find((s) => s.suggestion === output);
          var result = {
            id: kendo.guid(),
            output: response[ev.text.toLowerCase()],
            prompt: output,
            isRetry: ev.isRetry
          }
          this.addOutput(result);
        },
        promptRequest: function(ev) {

          //mocked response from AI service
          const response = promptData.find((s) => s.suggestion === ev.prompt);

          const output = {
            id: kendo.guid(),
            output: response,
            prompt: ev.prompt,
            isRetry: ev.isRetry,
          };

          this.addPromptOutput(output);
          this.activeView(1);
        },
        views: [
          {
            type: 'prompt',
            promptSuggestions: promptData.map(x => x.suggestion)

          },
          {
            type: 'output',
          },
          {
            type: 'commands',
            promptCommands: promptCommands 
          }
        ],
      });
    </script>
```

## 1. Create an Empty Div Element

First, create an empty`<div>` element on the page that will be used to initialize the component.

```html
<div id="aiprompt"></div>
```

## 2. Initialize the AIPrompt 

In this step, you will initialize the AIPrompt from the `<div>` element. When you initialize the component, all settings of the AIPrompt will be provided in the script statement. You have to describe its configuration and event handlers in JavaScript.

```html
<div id="aiprompt"></div>

<script>
    // Target the div element by using jQuery and then call the kendoAIPrompt() method.
    $("#aiprompt").kendoAIPrompt();
</script>
```

## 3. Configure the Views 

Here, you will specify which [`views`](/api/javascript/ui/aiprompt/configuration/views) will be displayed in the component. For the purposes of this guide, we will include two item collections for the prompt suggestions and the items in the command view.

```html
  <div id="aiprompt"></div>

  <script>
    var promptCommands = [
        {
          id: "1",
          text: "Simplify",
          icon: "min-width",
        },
        {
          id: "2",
          text: "Extend",
          icon: "arrows-left-right",
        },
      ];
      var promptData = [
        {
          suggestion: "Out of office (contact colleague)",

          simplify: `Simplified Out of Office response`,
          extend: `Extended Out of Office response`,
        },       
        {
          suggestion: "LinkedIn post for work/life balance and well-being",

          simplify: `Simplifed LinkedIn response`,
          extend: `Extended LinkedIn response`
        }];

    $("#aiprompt").kendoAIPrompt({    
        views: [
            {
                type: 'prompt',
                promptSuggestions: promptData.map(x => x.suggestion)

            },
            {
                type: 'output',
            },
            {
                type: 'commands',
                promptCommands: promptCommands 
            }
        ]
    });
</script>
```

## 4. Handle the PromptRequest Event

In order to generate a response for the prompts suggestions, you will need to first send a request to your service through the `promptRequest` event. For this guide, we will use a mocked response.

```html
<div id="aiprompt"></div>
  <script>
        var promptCommands = [
            {
                id: "1",
                text: "Simplify",
                icon: "min-width",
            },
            {
                id: "2",
                text: "Extend",
                icon: "arrows-left-right",
            },
        ];
        var promptData = [
            {
                suggestion: "Out of office (contact colleague)",

                simplify: `Simplified Out of Office response`,
                extend: `Extended Out of Office response`,
            },       
            {
                suggestion: "LinkedIn post for work/life balance and well-being",

                simplify: `Simplifed LinkedIn response`,
                extend: `Extended LinkedIn response`
        }]

        $("#aiprompt").kendoAIPrompt({         
            promptRequest: function(ev) {

                //mocked response from AI service
                const response = promptData.find((s) => s.suggestion === ev.prompt);

                const output = {
                    id: kendo.guid(),
                    output: response,
                    prompt: ev.prompt,
                    isRetry: ev.isRetry,
                };

                this.addPromptOutput(output);
                this.activeView(1);
            },
            views: [
                {
                    type: 'prompt',
                    promptSuggestions: promptData.map(x => x.suggestion)

                },
                {
                    type: 'output',
                },
                {
                    type: 'commands',
                    promptCommands: promptCommands 
                }
            ]
        });
    </script>
```

## 5. Handle the CommandExecute Event

In a similar fashion, if you wish to execute a command to process the generated request, you can handle the `commandExecute` event.

```html
  <div id="aiprompt"></div>
  <script>
        var promptCommands = [
            {
                id: "1",
                text: "Simplify",
                icon: "min-width",
            },
            {
                id: "2",
                text: "Extend",
                icon: "arrows-left-right",
            },
        ];
        var promptData = [
            {
                suggestion: "Out of office (contact colleague)",

                simplify: `Simplified Out of Office response`,
                extend: `Extended Out of Office response`,
            },       
            {
                suggestion: "LinkedIn post for work/life balance and well-being",

                simplify: `Simplifed LinkedIn response`,
                extend: `Extended LinkedIn response`
        }]

        $("#aiprompt").kendoAIPrompt({ 
            commandExecute: function(e) {
                var output = this.promptOutputs[0].prompt;
                const response = promptData.find((s) => s.suggestion === output);
                var result = {
                    id: kendo.guid(),
                    output: response[ev.text.toLowerCase()],
                    prompt: output,
                    isRetry: ev.isRetry
                }
                this.addOutput(result);
                this.activeView(1);
            },        
            promptRequest: function(ev) {

                //mocked response from AI service
                const response = promptData.find((s) => s.suggestion === ev.prompt);

                const output = {
                    id: kendo.guid(),
                    output: response,
                    prompt: ev.prompt,
                    isRetry: ev.isRetry,
                };

                this.addPromptOutput(output);
                this.activeView(1);
            },
            views: [
                {
                    type: 'prompt',
                    promptSuggestions: promptData.map(x => x.suggestion)

                },
                {
                    type: 'output',
                },
                {
                    type: 'commands',
                    promptCommands: promptCommands 
                }
            ]
        });
    </script>
```

## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Templates in the Kendo AIPrompt]({% slug templates_aiprompt_component %})
* [Demo Page for the Kendo UI for jQuery AIPrompt](https://demos.telerik.com/kendo-ui/aiprompt/index)

## See Also 

* [JavaScript API Reference of the jQuery AIPrompt](/api/javascript/ui/aiprompt)
* [Knowledge Base Section](/knowledge-base)


