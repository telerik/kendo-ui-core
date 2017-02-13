---
title: Prompt
page_title: Configuration, methods and events of Kendo UI Prompt
description: How to initialize an Prompt UI widget, configure its properties and open it.
---

# kendo.ui.Prompt : kendo.ui.Dialog

Represents the Kendo UI Prompt.

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

## Fields

### result `Promise`

`Promise` a [jQuery promise instance](http://api.jquery.com/Types/#Promise), which can be used for callbacks, or passed to [jQuery.when](http://api.jquery.com/jQuery.when/). The jQuery Deferred object resolves to:

* `done()` - when user has pressed the "OK" button and the **data** passed to the callback is the inputted text;
* `fail()` - when user has pressed the "Cancel" button and the **data** passed to the callback is the inputted text.

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
          console.log("User accepted with text: " + data);
      })
      .fail(function(data){
          console.log("User rejected with text: " + data);
      });
    </script>