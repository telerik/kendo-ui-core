---
title: Checkpoint
description: Configuration, methods and events of the Kendo UI Checkpoint
res_type: api
component: Checkpoint
---

# kendo.ui.Checkpoint

Represents the Kendo UI Checkpoint widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### state `String` *(default: null)*

The current action state of the checkpoint. Determines the button label and the action value emitted in the `action` event. Valid values are `"startOver"`, `"restore"`, and `"redo"`.

<div class="meta-api-description">
Set the current state of a checkpoint widget to control which action button is displayed, configure whether the checkpoint shows a start over, restore, or redo button, determine the action type emitted when the user clicks the checkpoint, control the label and behavior of the checkpoint action based on its processing phase, or set the interaction mode of a conversation checkpoint step.
</div>

#### Example - set the state to restore

    <div id="checkpoint"></div>
    <script>
    $("#checkpoint").kendoCheckpoint({
        state: "restore"
    });
    </script>

### displayMode `String` *(default: "hover")*

Controls when the checkpoint button is visible. When set to `"always"`, the button is always shown. When set to `"hover"`, the button appears only on hover.

<div class="meta-api-description">
Configure the visibility behavior of a checkpoint button, set whether the action button is always visible or only shown when the user hovers over the element, control the display mode of the checkpoint step to always show or hover-reveal the button, choose between persistent and on-hover visibility for the checkpoint action, or adjust the interaction style for showing and hiding the checkpoint control.
</div>

#### Example - always show the checkpoint button

    <div id="checkpoint"></div>
    <script>
    $("#checkpoint").kendoCheckpoint({
        state: "restore",
        displayMode: "always"
    });
    </script>

### template `Function` *(default: null)*

A function used to render the entire checkpoint body, replacing the default button layout. Called with an empty object and must return an HTML string.

<div class="meta-api-description">
Provide a custom Kendo template for the checkpoint body, replace the default button and label rendering with custom HTML, configure a bespoke layout for the checkpoint step using a function, fully control the inner markup of a checkpoint element, or supply custom content instead of the built-in restore, start over, or redo button.
</div>

#### Example - use a custom template

    <div id="checkpoint"></div>
    <script>
    $("#checkpoint").kendoCheckpoint({
        template: function() {
            return "<span>Custom checkpoint content</span>";
        }
    });
    </script>

### messages `Object`

Contains the localizable text strings used by the widget.

<div class="meta-api-description">
Localize or customize the text labels used in the Checkpoint widget, configure the button labels and stamp text for each checkpoint state, set translated strings for start over, restore, redo, and the restored confirmation text, or override default English text for internationalization of the checkpoint component.
</div>

#### Example - set messages

    <div id="checkpoint"></div>
    <script>
    $("#checkpoint").kendoCheckpoint({
        state: "restore",
        messages: {
            restore: "Revert to this point"
        }
    });
    </script>

### messages.startOver `String` *(default: "Start Over")*

The button label when `state` is `"startOver"`.

<div class="meta-api-description">
Set the label for the start over action button in a checkpoint, localize or customize the text shown when the checkpoint state is startOver, configure the button caption that allows users to restart from the beginning, or override the default "Start Over" text with a translated or custom value.
</div>

#### Example - set the start over label

    <div id="checkpoint"></div>
    <script>
    $("#checkpoint").kendoCheckpoint({
        state: "startOver",
        messages: {
            startOver: "Begin Again"
        }
    });
    </script>

### messages.restore `String` *(default: "Restore Checkpoint")*

The button label when `state` is `"restore"`.

<div class="meta-api-description">
Set the label for the restore action button in a checkpoint, localize or customize the text shown when the checkpoint state is restore, configure the button caption that allows users to revert to a saved state, or override the default "Restore Checkpoint" text with a translated or custom value.
</div>

#### Example - set the restore label

    <div id="checkpoint"></div>
    <script>
    $("#checkpoint").kendoCheckpoint({
        state: "restore",
        messages: {
            restore: "Go Back Here"
        }
    });
    </script>

### messages.redo `String` *(default: "Redo")*

The button label when `state` is `"redo"`.

<div class="meta-api-description">
Set the label for the redo action button in a checkpoint, localize or customize the text shown when the checkpoint state is redo, configure the button caption that allows users to repeat a previously restored action, or override the default "Redo" text with a translated or custom value.
</div>

#### Example - set the redo label

    <div id="checkpoint"></div>
    <script>
    $("#checkpoint").kendoCheckpoint({
        state: "redo",
        messages: {
            redo: "Repeat"
        }
    });
    </script>

### messages.checkpointRestoredText `String` *(default: "Checkpoint Restored")*

The stamp text displayed alongside the redo button when `state` is `"redo"`, indicating that a checkpoint has previously been restored.

<div class="meta-api-description">
Set the confirmation stamp text shown next to the redo button when a checkpoint has been restored, localize or customize the label indicating a previous restore action, configure the text that confirms the checkpoint was reverted, display a custom restored confirmation message in the redo state, or override the default "Checkpoint Restored" text with a translated or custom value.
</div>

#### Example - set the checkpoint restored text

    <div id="checkpoint"></div>
    <script>
    $("#checkpoint").kendoCheckpoint({
        state: "redo",
        messages: {
            checkpointRestoredText: "Reverted"
        }
    });
    </script>

## Methods

### setState

Sets a new state for the checkpoint and re-renders the button.

<div class="meta-api-description">
Dynamically change the action state of a checkpoint widget after initialization, update the checkpoint to show a start over, restore, or redo button at runtime, trigger a re-render of the checkpoint button based on the new state, programmatically transition a checkpoint from one action phase to another, or update the visual and interactive representation of the checkpoint step at runtime.
</div>

#### Parameters

##### state `String`

The new state. Valid values are `"startOver"`, `"restore"`, and `"redo"`.

#### Example - set the state

    <div id="checkpoint"></div>
    <script>
    $("#checkpoint").kendoCheckpoint({
        state: "restore"
    });
    var checkpoint = $("#checkpoint").data("kendoCheckpoint");
    checkpoint.setState("redo");
    </script>

### destroy

Prepares the **Checkpoint** for safe removal from DOM. Detaches all event handlers, destroys the internal button, and removes jQuery.data attributes to avoid memory leaks.

> **Important:** This method does not remove the Checkpoint element from DOM.

<div class="meta-api-description">
Clean up and safely remove a checkpoint widget, detach all event listeners and internal handlers, destroy the internally created button component, prevent memory leaks when removing a checkpoint step from the page, or release all resources held by the checkpoint before DOM removal.
</div>

#### Example - destroy the widget

    <div id="checkpoint"></div>
    <script>
    $("#checkpoint").kendoCheckpoint({ state: "restore" });
    var checkpoint = $("#checkpoint").data("kendoCheckpoint");
    checkpoint.destroy();
    </script>

## Events

### action

Fired when the user clicks the checkpoint button.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

<div class="meta-api-description">
React when the user interacts with a checkpoint action button, handle the start over, restore, or redo button click, detect and respond to checkpoint state action events, execute logic such as restoring conversation history or resetting state when the checkpoint button is clicked, or determine which action was triggered by inspecting the action property.
</div>

#### Event Data

##### e.action `String`

The current `state` value of the widget at the time the button was clicked. Matches the `state` option.

##### e.sender `kendo.ui.Checkpoint`

The widget instance which fired the event.

#### Example - subscribe to the "action" event during initialization

    <div id="checkpoint"></div>
    <script>
    $("#checkpoint").kendoCheckpoint({
        state: "restore",
        displayMode: "always",
        action: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.action);
        }
    });
    </script>

#### Example - subscribe to the "action" event after initialization

    <div id="checkpoint"></div>
    <script>
    $("#checkpoint").kendoCheckpoint({
        state: "restore",
        displayMode: "always"
    });
    var checkpoint = $("#checkpoint").data("kendoCheckpoint");
    checkpoint.bind("action", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.action);
    });
    </script>
