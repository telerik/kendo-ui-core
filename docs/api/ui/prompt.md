---
title: Prompt
page_title: Configuration, methods and events of Kendo UI Prompt
description: How to initialize an Prompt UI widget, configure its properties and open it.
res_type: api
---

# kendo.ui.Prompt : kendo.ui.Dialog

Represents the Kendo UI Prompt. Inherits from [Dialog](/api/javascript/ui/dialog).

## Configuration

### messages `Object`

Defines the text of the labels that are shown within the prompt dialog. Used primarily for localization.


<div class="meta-api-description">
How do I customize the text labels in the Kendo UI prompt dialog using the `messages` property? Configure and customize prompt dialog text labels, set or localize the displayed messages for prompts, control the wording of prompt interface elements, enable localized or translated prompt labels, adjust prompt text content for different languages or regions, define custom messages shown within prompt dialogs, update or override default prompt wording, tailor prompt label text for user interaction, modify prompt dialog strings, and manage prompt message customization for internationalization or user-specific language preferences.
</div>

#### Example

    <div id="prompt"></div>
    <script>
    $("#prompt").kendoPrompt({
      messages:{
        okText: "OK",
        cancel: "No"
      }
    }).data("kendoPrompt").open();
    </script>

### messages.okText `String` *(default: "OK")*

The title of the OK button.


<div class="meta-api-description">
How do I change the label on the OK button in a Kendo UI dialog? Customize or configure the confirmation button label text, adjust or set the affirmative button wording, modify the OK button caption, localize or translate the prompt confirmation text, change the default positive action button text, control the displayed label on the prompt’s confirm button, enable custom button text for localization purposes, specify the confirm button wording shown to users, update or override the standard OK label for prompts, tailor the prompt acceptance button text for multilingual or user-specific contexts.
</div>

#### Example

    <div id="prompt"></div>
    <script>
    $("#prompt").kendoPrompt({
      messages:{
        okText: "OK",
      }
    }).data("kendoPrompt").open();
    </script>

### messages.cancel `String` *(default: "Cancel")*

The title of the Cancel button.


<div class="meta-api-description">
How do I change the default cancel button label in a Kendo UI dialog? Customize, configure, or set the label, text, or caption of the cancel button in prompt dialogs, alerts, or input prompts to support localization, internationalization, or custom wording by changing or overriding the default cancel button title, cancel action text, or cancel prompt message in user interface components that display prompts with accept and cancel options.
</div>

#### Example

    <div id="prompt"></div>
    <script>
    $("#prompt").kendoPrompt({
      messages:{
        cancel: "No"
      }
    }).data("kendoPrompt").open();
    </script>

## Fields

### result `Promise`

`Promise` a [jQuery promise instance](https://api.jquery.com/Types/#Promise), which can be used for callbacks, or passed to [jQuery.when](https://api.jquery.com/jQuery.when/). The jQuery Deferred object resolves to:

* `done()` - when user has pressed the "OK" button and the **data** passed to the callback is the inputted text;
* `fail()` - when user has pressed the "Cancel" button and the **data** passed to the callback is the inputted text.


<div class="meta-api-description">
How do I handle user input with Kendo UI's Prompt component? Access and manage the asynchronous outcome of user input with the Prompt component's result promise field, enabling interaction handling through jQuery Deferred methods like done, fail, then, or callbacks for when users confirm or cancel prompts, retrieve entered text data, perform actions on prompt completion or cancellation, synchronize multiple prompt events using jQuery.when, chain handlers for success or failure of user input, configure responses to OK or Cancel button actions, and control flow based on user decisions within web interfaces.
</div>

#### Example

    <div id="prompt"></div>
    <script>
    $("#prompt").kendoPrompt({
    content: "Prompt text",
    value: "Default input text",
    messages:{
      okText: "OK"
    }
    }).data("kendoPrompt").result.done(function(data){
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("User accepted with text: " + data);
      })
      .fail(function(data){
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("User rejected with text: " + data);
      });
    </script>
