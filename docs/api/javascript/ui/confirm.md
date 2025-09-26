---
title: Confirm
page_title: Configuration, methods and events of Kendo UI Confirm
description: How to initialize an Confirm UI widget, configure its properties and open it.
res_type: api
---

# kendo.ui.Confirm : kendo.ui.Dialog

Represents the Kendo UI Confirm. Inherits from [Dialog](/api/javascript/ui/dialog).

## Configuration

### messages `Object`

Defines the text of the labels that are shown within the confirm dialog. Used primarily for localization.


<div class="meta-api-description">
Customize and localize confirmation dialog button labels, control the text displayed for confirm and cancel actions, set or override default messages in confirmation prompts, configure user-facing approval or dismissal text, and manage multi-language support for confirm dialog messages to tailor button captions and labels according to different languages or contexts.
</div>

#### Example

    <div id="confirm"></div>
    <script>
    $("#confirm").kendoConfirm({
      messages:{
        okText: "OK",
        cancel: "No"
      }
    }).data("kendoConfirm").open();
    </script>

### messages.okText `String` *(default: "OK")*

The title of the OK button.


<div class="meta-api-description">
Customize, configure, or set the confirmation dialog button label, accept button text, or positive action label to match different languages, locales, or user interface preferences, enabling localization, internationalization, and custom button wording in confirmation prompts, approval dialogs, or user acknowledgment interfaces.
</div>

#### Example

    <div id="confirm"></div>
    <script>
    $("#confirm").kendoConfirm({
      messages:{
        okText: "OK",
      }
    }).data("kendoConfirm").open();
    </script>

### messages.cancel `String` *(default: "Cancel")*

The title of the Cancel button.


<div class="meta-api-description">
Customize, configure, or change the text label, title, or caption of the Cancel button in confirmation dialogs, pop-ups, alerts, or prompts to support localization, translation, user interface personalization, or modifying default cancel messages for better user understanding and consistency across different languages, regions, and application settings.
</div>

#### Example

    <div id="confirm"></div>
    <script>
    $("#confirm").kendoConfirm({
      messages:{
        cancel: "No"
      }
    }).data("kendoConfirm").open();
    </script>

## Fields

### result `Promise`

`Promise` a [jQuery promise instance](https://api.jquery.com/Types/#Promise), which can be used for callbacks, or passed to [jQuery.when](https://api.jquery.com/jQuery.when/). The jQuery Deferred object resolves to:

* `done()` - when user has pressed the "OK" button;
* `fail()` - when user has pressed the "Cancel" button.


<div class="meta-api-description">
Await and handle the user's confirmation response as a promise or deferred object, capturing whether the user accepted or canceled via resolved or rejected outcomes. Enable processing of the confirm dialog result asynchronously by attaching success and failure callbacks, using promise chaining, or integrating with jQuery.when to control flow based on user approval or dismissal. Capture and respond to user confirmation, toggle actions, or dialog results programmatically with asynchronous event handling patterns, ensuring seamless integration with both success and cancellation scenarios in UI workflows.
</div>

#### Example

    <div id="confirm"></div>
    <script>
    $("#confirm").kendoConfirm({
      content: "Do you accept?",
      messages:{
        okText: "OK"
      }
	/* The result can be observed in the DevTools(F12) console of the browser. */
    }).data("kendoConfirm").result.done(function(){console.log("User accepted"); }).fail(function(){console.log("User rejected");});
    </script>
