---
title: Alert
page_title: Configuration, methods and events of Kendo UI Alert
description: How to initialize an Alert UI widget, configure its properties and open it.
res_type: api
---

# kendo.ui.Alert : kendo.ui.Dialog

Represents the Kendo UI Alert. Inherits from [Dialog](/api/javascript/ui/dialog).

## Configuration

### messages `Object`

Defines the text of the labels that are shown within the alert dialog. Used primarily for localization.


<div class="meta-api-description">
How do I customize alert messages in Kendo UI for jQuery? Adjust, configure, or set custom text, labels, prompts, or messages displayed in alert dialogs to support localization, translation, or internationalization, enabling modification of user-facing alert content, dialog box wording, notification phrases, error messages, warning prompts, confirmation texts, and interface strings to suit different languages, regional formats, or application-specific terminology.
</div>

#### Example

    <div id="alert"></div>
    <script>
    $("#alert").kendoAlert({
      messages:{
        okText: "Custom OK text"
      }
    }).data("kendoAlert").open();
    </script>

### messages.okText `String` *(default: "OK")*

The title of the OK button.


<div class="meta-api-description">
How do I change the OK button text in Kendo UI alerts? Configure or customize the confirmation button label, set the text displayed on alert dialogs’ OK or confirm buttons, localize or translate the primary action button text, control the confirmation prompt wording, modify the accept or acknowledge button caption, override default OK button messages for internationalization, define the displayed string on alert confirmation controls, and tailor the button text for user interface prompts or dialog boxes requiring acknowledgment or user approval.
</div>

#### Example

    <div id="alert"></div>
    <script>
    $("#alert").kendoAlert({
      messages:{
        okText: "Custom OK text"
      }
    }).data("kendoAlert").open();
    </script>
