---
title: Confirm
page_title: Configuration, methods and events of Kendo UI Confirm
description: How to initialize an Confirm UI widget, configure its properties and open it.
---

# kendo.ui.Confirm : kendo.ui.Dialog

Represents the Kendo UI Confirm.

## Configuration

### messages `Object`

Defines the text of the labels that are shown within the confirm dialog. Used primarily for localization.

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

`Promise` a [jQuery promise instance](http://api.jquery.com/Types/#Promise), which can be used for callbacks, or passed to [jQuery.when](http://api.jquery.com/jQuery.when/). The jQuery Deferred object resolves to:

* `done()` - when user has pressed the "OK" button;
* `fail()` - when user has pressed the "Cancel" button.

#### Example

    <div id="confirm"></div>
    <script>
    $("#confirm").kendoConfirm({
      content: "Do you accept?",
      messages:{
        okText: "OK"
      }
    }).data("kendoConfirm").result.done(function(){console.log("User accepted"); }).fail(function(){console.log("User rejected");});
    </script>