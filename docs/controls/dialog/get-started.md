---
title: Getting Started
page_title: jQuery Dialog Documentation - Getting Started with the Dialog
description: "Get started with the jQuery Dialog by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_dialog_widget
position: 1
---

# Getting Started with the Dialog

This guide demonstrates how to get up and running with the Kendo UI for jQuery Dialog.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <button id="open">Open Dialog</button>
    <div id="dialog"></div>
    <script>
      $("#dialog").kendoDialog({
        title: "Kendo Dialog Component",
        content: "This is your Kendo Dialog.",
        actions: [{
          text: "OK",
          primary: true
        }, {
          text: "Cancel"
        }],
        animation: {
          open: {
            effects: "fade:in"
          },
          close: {
            effects: "fade:out"
          }
        }
      });
      $("#dialog").data("kendoDialog").open();

      $("#open").on("click", () => $("#dialog").data("kendoDialog").open());
    </script>
```

## 1. Create a div Element

First, create a `<div>` element on the page from which the Dialog component will be initialized.

```html
    <div id="dialog"></div>
```

## 2. Initialize the Dialog

In this step, you will initialize the Dialog from the `<div>` element. When you initialize the component, all settings of the Dialog will be provided in the script statement. You have to describe its layout, configuration and event handlers in JavaScript.

```html
    <div id="dialog"></div>
    <script>
      $("#dialog").kendoDialog({
        title: "Kendo Dialog Component",
        content: "This is your Kendo Dialog."
      });
    </script>
```

## 3. Render Action Buttons

The Dialog enables you to render action buttons for the user under its content by setting its [`action`](/api/javascript/ui/dialog/configuration/actions) configuration.

```html
    <div id="dialog"></div>
    <script>
      $("#dialog").kendoDialog({
        title: "Kendo Dialog Component",
        content: "This is your Kendo Dialog.",
        actions: [{
          text: "OK",
          primary: true
        }, {
          text: "Cancel"
        }]
      });
    </script>
```

## 4. Add Open and Close Animations

The Dialog enables you to change the default open and close [`animations`](/api/javascript/ui/dialog/configuration/animation) of the component.

```html
    <div id="dialog"></div>
    <script>
      $("#dialog").kendoDialog({
        title: "Kendo Dialog Component",
        content: "This is your Kendo Dialog.",
        actions: [{
          text: "OK",
          primary: true
        }, {
          text: "Cancel"
        }],
        animation: {
          open: {
            effects: "fade:in"
          },
          close: {
            effects: "fade:out"
          }
        }
      });
    </script>
```

## 5. Show the Dialog on Button Click

You can use the [`open`](/api/javascript/ui/dialog/methods/open) method of the Dialog to programmatically show the component.

```javascript
    $("#dialog").data("kendoDialog").open();
```

## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the jQuery Dialog](https://demos.telerik.com/kendo-ui/dialog/index)

## See Also 

* [JavaScript API Reference of the jQuery Dialog](/api/javascript/ui/dialog)
* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>