---
title: Confirm
page_title: Configuration, methods and events of Kendo UI Confirm
description: How to initialize an Confirm UI widget, configure its properties and open it.
---

# kendo.ui.Confirm

Represents the Kendo UI Confirm. Inherits from [Dialog](/api/javascript/ui/dialog).

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