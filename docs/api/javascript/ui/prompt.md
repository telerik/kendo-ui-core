---
title: Prompt
page_title: Configuration, methods and events of Kendo UI Prompt
description: How to initialize an Prompt UI widget, configure its properties and open it.
---

# kendo.ui.Prompt

Represents the Kendo UI Prompt. Inherits from [Dialog](/api/javascript/ui/dialog).

## Configuration

### messages `Object`

Defines the text of the labels that are shown within the prompt dialog. Used primarily for localization.

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

#### Example

    <div id="prompt"></div>
    <script>
    $("#prompt").kendoPrompt({
      messages:{
        cancel: "No"
      }
    }).data("kendoPrompt").open();
    </script>