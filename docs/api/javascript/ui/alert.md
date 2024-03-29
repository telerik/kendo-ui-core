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

#### Example

    <div id="alert"></div>
    <script>
    $("#alert").kendoAlert({
      messages:{
        okText: "Custom OK text"
      }
    }).data("kendoAlert").open();
    </script>
