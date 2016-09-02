---
title: Dialog
page_title: Configuration, methods and events of Kendo UI Dialog
description: How to initialize a Dialog UI widget and configure its behaviors, center a dialog, set its content and toggle the state of the UI widget.
---

# kendo.ui.Dialog

Represents the Kendo UI Dialog. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### actions `Array`

A collection of objects containing text, action and primary attributes used to specify the dialog buttons.
#### Example

    <div id="dialog"></div>
    <script>
        $("#dialog").kendoDialog({
          actions: [{
              text: "OK",
              action: function(e){
                  // e.sender is a reference to the dialog widget object
                  // OK action was clicked
                  // Returning false will prevent the closing of the dialog
                  return false;
              },
              primary: true
          },{
              text: "Cancel"
          }]
        });
    </script>

### actions.text `String`

The text to be shown in the action's button.

#### Example

    <div id="dialog"></div>
    <script>
        $("#dialog").kendoDialog({
          actions: [{
              text: "OK",
          }]
        });
    </script>

### actions.action `Function`

The callback function to be called after pressing the action button.

#### Example

    <div id="dialog"></div>
    <script>
        $("#dialog").kendoDialog({
          actions: [{
              text: "OK",
              action: function(e){
                  // e.sender is a reference to the dialog widget object
                  alert("OK action was clicked");
                  // Returning false will prevent the closing of the dialog
                  return true;
              },
          }]
        });
    </script>

### actions.primary `Boolean`

A boolean property indicating whether the action button will be decorated as primary button or not. 

#### Example

    <div id="dialog"></div>
    <script>
        $("#dialog").kendoDialog({
          actions: [{
              text: "OK",
              primary: true
          }]
        });
    </script>

### animation `Boolean|Object`

A collection of {Animation} objects, used to change default animations. A value of `false` will disable all animations in the widget.

`animation:true` is not a valid configuration.

#### Example - disable animation

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      animation: false
    });
    </script>

### animation.close `Object`

The animation that will be used when a Dialog closes.

#### Example - disable close animation

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      animation: {
        close: false
      }
    });
    </script>

### animation.close.effects `String`

Effect to be used for closing of the popup.

#### Example - use only fade out animation when closing dialog

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      animation: {
        close: {
          effects: "fade:out"
        }
      }
    });
    </script>

### animation.close.duration `Number`

Defines the close animation duration.

#### Example - make the close animation 2 seconds long

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      animation: {
        close: {
          duration: 2000
        }
      }
    });
    </script>

### animation.open `Object`

The animation that will be used when a Dialog opens.

#### Example - disable open animation

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      animation: {
        open: false
      },
      visible: false
    });
    $("#dialog").data("kendoDialog").open();
    </script>

### animation.open.effects `String`

Effect to be used for opening of the popup.

#### Example - use only fade animation when opening dialog

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      animation: {
        open: {
          effects: "fade:in"
        }
      },
      visible: false
    });
    $("#dialog").data("kendoDialog").open();
    </script>

### animation.open.duration `Number`

Defines the open animation duration.

#### Example - make the open animation 100 milliseconds long

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      animation: {
        open: {
          duration: 100
        }
      },
      visible: false
    });
    $("#dialog").data("kendoDialog").open();
    </script>

### buttonLayout `String` *(default: "stretched")*

Specifies the possible layout of the action buttons in the **Dialog**.

Possible values are:

* normal
* stretched

#### Example

    <div id="dialog"></div>
    <script>
        $("#dialog").kendoDialog({
            buttonLayout: "normal"
        });
    </script>

### closable `Boolean` *(default: true)*

Specifies whether a close button should be rendered at the top corner of the dialog.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      closable: true
    });
    </script>

### content `String`

Specifies the content of a **Dialog**.

#### Example - fetch content from the server

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      content: "<em>Dialog content</em>"
    });
    </script>

### height `Number | String`

Specifies height of the dialog.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      height: 400
    });
    </script>

#### Example - specify dialog height in percent

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      height: "50%"
    });
    </script>

### maxHeight `Number` *(default: Infinity)*

The maximum height (in pixels) that may be achieved by resizing the dialog.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      maxHeight: 300
    });
    </script>

### maxWidth `Number` *(default: Infinity)*

The maximum width (in pixels) that may be achieved by resizing the dialog.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      maxWidth: 300
    });
    </script>

### messages `Object`

Defines the text of the labels that are shown within the dialog. Used primarily for localization.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      messages:{
        close: "Close Me!"
      }
    });
    </script>

### messages.close `String` *(default: "Close")*

The title of the close button.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      messages:{
        close: "Close Me!"
      }
    });
    </script>

### minHeight `Number` *(default: 50)*

The minimum height (in pixels) that may be achieved by resizing the dialog.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      minHeight: 100
    });
    </script>

### minWidth `Number` *(default: 50)*

The minimum width (in pixels) that may be achieved by resizing the dialog.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      minWidth: 100
    });
    </script>

### modal `Boolean` *(default: true)*

Specifies whether the dialog should show a modal overlay over the page.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      modal: true
    });
    </script>

### title `String|Boolean` *default: ""*

The text in the dialog title bar. If `false`, the dialog will be displayed without a title bar.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: "Customer details"
    });
    </script>

#### Example - create a dialog without a title

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      title: false
    });
    </script>

### visible `Boolean` *(default: true)*

Specifies whether the dialog will be initially visible.

#### Example - show a dialog after one second delay

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      visible: false
    });
    setTimeout(function() {
      $("#dialog").data("kendoDialog").open();
    }, 1000);
    </script>

### width `Number | String`

Specifies width of the dialog.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      width: 400
    });
    </script>

#### Example - specify dialog width in percent

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      width: "50%"
    });
    </script>

## Methods

### close

Closes a Dialog.

#### Returns

`kendo.ui.Dialog` Returns the dialog object to support chaining.

#### Example - close a dialog after one second

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog();
    var dialog = $("#dialog").data("kendoDialog");
    setTimeout(function() {
      dialog.close();
    }, 1000);
    </script>

### content

Gets or set the content of a dialog. Supports chaining when used as a setter.

#### Parameters

##### content `String|jQuery` *(optional)*

The content of the Dialog. Can be an HTML string or jQuery object.

#### Returns

`String` The current dialog content, if used as a getter. If used as a setter, the method will return the dialog object to support chaining.

#### Example - get the dialog content

    <div id="dialog">foo</div>
    <script>
    $("#dialog").kendoDialog();
    var dialog = $("#dialog").data("kendoDialog");
    console.log(dialog.content()); // logs "foo"
    </script>

#### Example - set the dialog content

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog();
    var dialog = $("#dialog").data("kendoDialog");
    dialog.content("Kendo UI all the things!");
    </script>

### destroy

Destroys the dialog and its modal overlay, if necessary. Removes the widget HTML elements from the DOM.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog();
    var dialog = $("#dialog").data("kendoDialog");
    dialog.destroy();
    </script>

### open

Opens a Dialog and brings it on top of any other open Dialog or Window instances by calling [`toFront`](#methods-tofront) internally.

#### Returns

`kendo.ui.Dialog` Returns the dialog object to support chaining.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      visible: false
    });
    var dialog = $("#dialog").data("kendoDialog");
    dialog.open();
    </script>

### title `String|jQuery` *(optional)*

Gets or sets the title of a Dialog. Can be an HTML string or jQuery object. Supports chaining when used as a setter.

#### Parameters

##### text `String` *(optional)*

The title of the Dialog.

#### Returns

`String` The current dialog title, if used as a getter. If used as a setter, the method will return the dialog object to support chaining.

#### Example - get the title of the dialog

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog();
    var dialog = $("#dialog").data("kendoDialog");
    var title = dialog.title();
    </script>

#### Example - set the title of a dialog

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog();
    var dialog = $("#dialog").data("kendoDialog");
    dialog.title("<em>Hello</em>");
    </script>

### toFront

Increases the `z-index` style of a Dialog [`wrapper`](/intro/widget-basics/wrapper-element) to bring the instance on top of other open Dialogs. This method is executed automatically when the [`open`](#methods-open) method is used.

#### Returns

`kendo.ui.Dialog` Returns the dialog object to support chaining.

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog();
    var dialog = $("#dialog").data("kendoDialog");
    dialog.toFront();
    </script>

## Events

### close

Triggered when a Dialog is closed (by a user or through the close() method).

#### Event Data

##### e.userTriggered `Boolean`

Indicates whether the close action has been triggered by the user (by clicking the close button or hitting the escape key). When the close method has been called, this field is **false**.

#### Example - subscribe to the "close" event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      close: function(e) {
        // close animation has finished playing
      }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <div id="dialog"></div>
    <script>
    function dialog_close(e) {
      // close animation has finished playing
    }
    $("#dialog").kendoDialog();
    var dialog = $("#dialog").data("kendoDialog");
    dialog.bind("close", dialog_close);
    </script>

### hide

Triggered when a Dialog has finished its closing animation.

#### Example - subscribe to the "hide" event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      hide: function() {
        // close animation is about to finish
      }
    });
    </script>

#### Example - subscribe to the "hide" event after initialization

    <div id="dialog"></div>
    <script>
    function dialog_hide() {
      // close animation will start soon
    }
    $("#dialog").kendoDialog();
    var dialog = $("#dialog").data("kendoDialog");
    dialog.bind("hide", dialog_hide);
    </script>

### initOpen

Triggered when a Dialog is opened for the first time (i.e. the open() method is called).

#### Example - subscribe to the "initOpen" event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      initOpen: function() {
        // open animation will start soon
      }
    });
    </script>

#### Example - subscribe to the "initOpen" event after initialization

    <div id="dialog" style="display: none;"></div>
    <script>
    function dialog_initOpen() {
      // open animation will start soon
    }
    $("#dialog").kendoDialog();
    var dialog = $("#dialog").data("kendoDialog");
    dialog.bind("initOpen", dialog_initOpen);
    dialog.open();
    </script>

### open

Triggered when a Dialog is opened (i.e. the open() method is called).

#### Example - subscribe to the "open" event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      open: function() {
        // open animation will start soon
      }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <div id="dialog"></div>
    <script>
    function dialog_open() {
      // open animation will start soon
    }
    $("#dialog").kendoDialog();
    var dialog = $("#dialog").data("kendoDialog");
    dialog.bind("open", dialog_open);
    </script>

### show

Triggered when a Dialog has finished its opening animation.

#### Example - subscribe to the "show" event during initialization

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
      show: function() {
        // open animation has finished playing
      }
    });
    </script>

#### Example - subscribe to the "show" event after initialization

    <div id="dialog"></div>
    <script>
    function dialog_show() {
      // open animation has finished playing
    }
    $("#dialog").kendoDialog();
    var dialog = $("#dialog").data("kendoDialog");
    dialog.bind("show", dialog_show);
    </script>
