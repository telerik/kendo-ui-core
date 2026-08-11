---
title: ToolCall
description: Configuration, methods and events of the Kendo UI ToolCall
res_type: api
component: ToolCall
---

# kendo.ui.ToolCall

Represents the Kendo UI ToolCall widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### svgIcon `String` *(default: "wrench")*

The name of the SVG icon displayed in the step header.

<div class="meta-api-description">
Set or change the icon shown in the header of a tool call step, configure the SVG icon name for the tool indicator, specify a Kendo UI icon to represent the type of tool being invoked, customize the visual icon of an agent tool call component, or adjust the graphic symbol displayed next to the step label.
</div>

#### Example - set the icon

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "Search",
        svgIcon: "search"
    });
    </script>

### label `String` *(default: null)*

The primary text label displayed in the step header.

<div class="meta-api-description">
Configure the main title or name text shown in a tool call step header, set the display name of the tool being invoked, control what label is rendered next to the icon in the step header, specify the primary string identifier for the tool call, or adjust the visible text used to name the agent tool step.
</div>

#### Example - set the label

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "web_search"
    });
    </script>

### secondaryLabel `String` *(default: null)*

A secondary text label displayed after the separator in the step header.

<div class="meta-api-description">
Add a secondary subtitle or supporting text to the tool call step header, configure a supplemental caption shown next to the primary label, set an extra descriptor such as the tool version or context, or display additional metadata after the separator dot in the header.
</div>

#### Example - set the secondary label

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "read_file",
        secondaryLabel: "utils.js"
    });
    </script>

### state `String` *(default: "active")*

The current state of the tool call. Valid values are `"active"`, `"completed"`, `"awaitingApproval"`, and `"error"`.

<div class="meta-api-description">
Set the current status of a tool call step, configure whether a tool call is active, completed, waiting for user approval, or in an error state, control the visual badge and styling applied to the step based on its processing phase, change the tool call status to completed or error after it finishes, or set the step to awaiting approval to prompt the user before execution.
</div>

#### Example - set the state to completed

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "fetch_data",
        state: "completed"
    });
    </script>

### expandable `Boolean` *(default: false)*

Enables toggling the visibility of the step body by clicking the header or using the keyboard.

<div class="meta-api-description">
Allow users to expand or collapse a tool call step, enable the toggle behavior for the step body panel, configure whether the tool call block can be opened and closed by clicking, make the step collapsible or expandable in an AI agent interface, or enable keyboard-driven collapse and expand interactions on the step header.
</div>

#### Example - enable expand and collapse

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "run_query",
        expandable: true,
        parameters: { query: "SELECT * FROM orders" }
    });
    </script>

### expanded `Boolean` *(default: false)*

Controls whether the step body is visible when the widget initializes.

<div class="meta-api-description">
Show or hide the body content of a tool call step on initialization, configure whether the collapsible panel starts open or closed, set the initial expanded state of the tool call block, control the default visibility of the parameters and result areas, or specify whether the step body is shown from the start.
</div>

#### Example - initialize the widget in expanded state

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "run_query",
        expandable: true,
        expanded: true,
        parameters: { query: "SELECT * FROM orders" }
    });
    </script>

### parameters `Object` *(default: null)*

A plain JavaScript object rendered as formatted JSON in the step body under the parameters label.

<div class="meta-api-description">
Display the input parameters of a tool call as formatted JSON inside the step body, configure the arguments or inputs passed to the tool, show the request payload or input data of the tool invocation, provide a JavaScript object that will be serialized and rendered in the parameters section, or supply the tool arguments for display in the expandable step panel.
</div>

#### Example - show tool parameters

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "search_web",
        expandable: true,
        expanded: true,
        parameters: { query: "Kendo UI widgets", limit: 10 }
    });
    </script>

### result `Object` *(default: null)*

A plain JavaScript object rendered as formatted JSON in the step body under the result label.

<div class="meta-api-description">
Display the output or return value of a tool call as formatted JSON inside the step body, configure the response or result data produced by the tool, show the tool execution result or answer in the expandable step panel, provide a JavaScript object that will be serialized and rendered in the result section, or supply the tool output for display after execution completes.
</div>

#### Example - show a tool result

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "fetch_user",
        state: "completed",
        expandable: true,
        expanded: true,
        result: { id: 1, name: "Jane Doe" }
    });
    </script>

### approvalText `String` *(default: null)*

A text message displayed inside the approval card when `state` is `"awaitingApproval"`.

<div class="meta-api-description">
Set a description or confirmation message shown to the user when a tool call requires approval, configure the instructional text displayed in the approval prompt card, provide context explaining why user confirmation is needed before the tool runs, or customize the message shown alongside the approve and reject buttons.
</div>

#### Example - set the approval text

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "delete_record",
        state: "awaitingApproval",
        expandable: true,
        expanded: true,
        approvalText: "This action will permanently delete the record."
    });
    </script>

### errorText `String` *(default: null)*

An error message displayed when `state` is `"error"`.

<div class="meta-api-description">
Set an error message or failure description shown when a tool call encounters an error, configure the text displayed in the error message box, provide a human-readable explanation of why the tool call failed, or customize the error notification shown inside the step body when the state is error.
</div>

#### Example - show an error message

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "fetch_data",
        state: "error",
        expandable: true,
        expanded: true,
        errorText: "Connection timed out."
    });
    </script>

### statusSVGIcon `String` *(default: null)*

Overrides the default SVG icon used inside the state badge. When `null`, a built-in icon is chosen based on the current `state`.

<div class="meta-api-description">
Override or customize the icon shown in the tool call state badge, replace the default completed, error, or awaiting-approval badge icon with a different Kendo UI SVG icon, configure a custom status indicator symbol for the step header badge, or set a specific icon name to use in the state badge instead of the automatically chosen one.
</div>

#### Example - set a custom status icon

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "process_data",
        state: "completed",
        statusSVGIcon: "star"
    });
    </script>

### parametersTemplate `Function` *(default: null)*

A function used to render the parameters section body. Receives the widget options object as the first argument and must return an HTML string.

<div class="meta-api-description">
Provide a custom Kendo template for rendering the parameters section of a tool call, override the default JSON pre-formatted output with custom HTML, configure how tool call input arguments are displayed in the step body, use a function to control the layout of the parameters area, or customize the markup rendered for the tool invocation inputs.
</div>

#### Example - use a custom parameters template

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "search_web",
        expandable: true,
        expanded: true,
        parameters: { query: "Kendo UI" },
        parametersTemplate: function(opts) {
            return "<span>" + kendo.htmlEncode(opts.parameters.query) + "</span>";
        }
    });
    </script>

### approvalTemplate `Function` *(default: null)*

A function used to render the entire approval section when `state` is `"awaitingApproval"`. Receives the widget options object as the first argument and must return an HTML string. When set, the built-in approve and reject buttons are not rendered.

<div class="meta-api-description">
Provide a fully custom Kendo template for the approval UI of a tool call, replace the built-in approve and reject card with custom HTML, configure a bespoke confirmation UI for tool calls requiring user authorization, use a function to control the complete layout of the approval section, or supply custom action controls for approving or rejecting a pending tool invocation.
</div>

#### Example - use a custom approval template

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "send_email",
        state: "awaitingApproval",
        expandable: true,
        expanded: true,
        approvalTemplate: function() {
            return "<div>Confirm sending the email?</div>";
        }
    });
    </script>

### resultTemplate `Function` *(default: null)*

A function used to render the result section body. Receives the widget options object as the first argument and must return an HTML string.

<div class="meta-api-description">
Provide a custom Kendo template for rendering the result section of a tool call, override the default JSON pre-formatted output with custom HTML, configure how the tool response or output is displayed in the step body, use a function to control the layout of the result area, or customize the markup rendered for the tool execution output.
</div>

#### Example - use a custom result template

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "fetch_user",
        state: "completed",
        expandable: true,
        expanded: true,
        result: { name: "Jane Doe" },
        resultTemplate: function(opts) {
            return "<strong>" + kendo.htmlEncode(opts.result.name) + "</strong>";
        }
    });
    </script>

### errorTemplate `Function` *(default: null)*

A function used to render the entire error section when `state` is `"error"`. Receives the widget options object as the first argument and must return an HTML string. When set, the built-in error message box is not rendered.

<div class="meta-api-description">
Provide a custom Kendo template for the error display of a tool call, replace the default error message box with custom HTML, configure a bespoke error presentation for failed tool calls, use a function to control the complete layout of the error section, or supply custom markup for rendering tool execution failures.
</div>

#### Example - use a custom error template

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "fetch_data",
        state: "error",
        expandable: true,
        expanded: true,
        errorTemplate: function() {
            return "<div class='custom-error'>An error occurred.</div>";
        }
    });
    </script>

### messages `Object`

Contains the localizable text strings used by the widget.

<div class="meta-api-description">
Localize or customize the text labels used in the ToolCall widget, configure state display names, button labels, and section headings, set translated strings for the approve and reject buttons and state badges, override default English text for internationalization, or supply custom labels for the parameters and result sections.
</div>

#### Example - set messages

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "fetch_data",
        state: "awaitingApproval",
        expandable: true,
        expanded: true,
        messages: {
            approve: "Allow",
            reject: "Deny"
        }
    });
    </script>

### messages.states `Object`

Contains the display names for each `state` value shown in the step header badge.

<div class="meta-api-description">
Customize the state badge label text for each tool call state, localize the status names displayed in the step header, configure display text for the active, completed, awaiting approval, and error states, override the default English state strings, or provide translated state labels for the tool call status badge.
</div>

#### Example - set state display names

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "run_task",
        state: "completed",
        messages: {
            states: {
                completed: "Done"
            }
        }
    });
    </script>

### messages.states.active `String` *(default: "Active")*

The display name for the `"active"` state.

<div class="meta-api-description">
Set the label shown in the status badge when a tool call is in the active state, localize or customize the active state text, configure the displayed string for a currently running tool invocation, or override the default "Active" text with a translated or custom value.
</div>

#### Example - set the active state label

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "run_task",
        messages: {
            states: { active: "Running" }
        }
    });
    </script>

### messages.states.completed `String` *(default: "Completed")*

The display name for the `"completed"` state.

<div class="meta-api-description">
Set the label shown in the status badge when a tool call has finished, localize or customize the completed state text, configure the displayed string for a successfully finished tool invocation, or override the default "Completed" text with a translated or custom value.
</div>

#### Example - set the completed state label

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "run_task",
        state: "completed",
        messages: {
            states: { completed: "Done" }
        }
    });
    </script>

### messages.states.awaitingApproval `String` *(default: "Awaiting Approval")*

The display name for the `"awaitingApproval"` state.

<div class="meta-api-description">
Set the label shown in the status badge when a tool call is waiting for user authorization, localize or customize the awaiting approval state text, configure the displayed string for a pending tool invocation that requires confirmation, or override the default "Awaiting Approval" text.
</div>

#### Example - set the awaiting approval state label

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "send_email",
        state: "awaitingApproval",
        messages: {
            states: { awaitingApproval: "Needs Confirmation" }
        }
    });
    </script>

### messages.states.error `String` *(default: "Error")*

The display name for the `"error"` state.

<div class="meta-api-description">
Set the label shown in the status badge when a tool call has failed, localize or customize the error state text, configure the displayed string for a tool invocation that encountered a failure, or override the default "Error" text with a translated or custom value.
</div>

#### Example - set the error state label

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "fetch_data",
        state: "error",
        messages: {
            states: { error: "Failed" }
        }
    });
    </script>

### messages.approve `String` *(default: "Approve")*

The label for the approve button shown when `state` is `"awaitingApproval"`.

<div class="meta-api-description">
Set the text on the approve button in the tool call approval UI, localize or customize the label for the confirmation action, configure the displayed string for the button that allows the user to authorize a pending tool invocation, or override the default "Approve" text.
</div>

#### Example - set the approve button label

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "run_script",
        state: "awaitingApproval",
        expandable: true,
        expanded: true,
        messages: {
            approve: "Allow",
            reject: "Deny"
        }
    });
    </script>

### messages.reject `String` *(default: "Reject")*

The label for the reject button shown when `state` is `"awaitingApproval"`.

<div class="meta-api-description">
Set the text on the reject button in the tool call approval UI, localize or customize the label for the cancellation action, configure the displayed string for the button that allows the user to deny a pending tool invocation, or override the default "Reject" text.
</div>

#### Example - set the reject button label

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "run_script",
        state: "awaitingApproval",
        expandable: true,
        expanded: true,
        messages: {
            approve: "Allow",
            reject: "Deny"
        }
    });
    </script>

### messages.parametersLabel `String` *(default: "Parameters")*

The heading label rendered above the parameters JSON block in the step body.

<div class="meta-api-description">
Set the section heading shown above the parameters JSON display in the tool call body, localize or customize the parameters section title, configure the label that identifies the input arguments area, or override the default "Parameters" text with a translated or custom value.
</div>

#### Example - set the parameters section label

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "run_query",
        expandable: true,
        expanded: true,
        parameters: { q: "test" },
        messages: {
            parametersLabel: "Inputs"
        }
    });
    </script>

### messages.resultLabel `String` *(default: "Result")*

The heading label rendered above the result JSON block in the step body.

<div class="meta-api-description">
Set the section heading shown above the result JSON display in the tool call body, localize or customize the result section title, configure the label that identifies the output area, or override the default "Result" text with a translated or custom value.
</div>

#### Example - set the result section label

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "fetch_user",
        state: "completed",
        expandable: true,
        expanded: true,
        result: { name: "Jane" },
        messages: {
            resultLabel: "Output"
        }
    });
    </script>

## Methods

### toggle

Toggles the expanded state of the step body. If no argument is provided, the current state is reversed.

<div class="meta-api-description">
Programmatically expand or collapse a tool call step, toggle the visibility of the step body, switch between open and closed states on the panel, control the expanded or collapsed display of parameters and results, call toggle without arguments to flip the current state, or pass a boolean to explicitly set the expanded state.
</div>

#### Parameters

##### expand `Boolean`

If `true`, the step body is shown. If `false`, the step body is hidden. If omitted, the state is reversed.

#### Example - toggle the step

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "run_query",
        expandable: true,
        parameters: { q: "test" }
    });
    var toolCall = $("#toolcall").data("kendoToolCall");
    toolCall.toggle(true);
    </script>

### expand

Expands the step body. Has no effect if `expandable` is `false`.

<div class="meta-api-description">
Programmatically open or show the body of a tool call step, expand the collapsible panel to reveal parameters, result, or approval content, trigger the open state of a tool call block, or show a previously collapsed step body from code.
</div>

#### Example - expand the step

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "run_query",
        expandable: true,
        parameters: { q: "test" }
    });
    var toolCall = $("#toolcall").data("kendoToolCall");
    toolCall.expand();
    </script>

### collapse

Collapses the step body.

<div class="meta-api-description">
Programmatically hide or close the body of a tool call step, collapse the expandable panel to conceal parameters and results, trigger the closed state of the panel, or fold a previously opened step body from code.
</div>

#### Example - collapse the step

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "run_query",
        expandable: true,
        expanded: true,
        parameters: { q: "test" }
    });
    var toolCall = $("#toolcall").data("kendoToolCall");
    toolCall.collapse();
    </script>

### setState

Sets a new state for the tool call, re-renders the header badge and body content, and resets `expanded` to `false`.

<div class="meta-api-description">
Dynamically change the status of a tool call widget after initialization, update the tool call state to active, completed, awaiting approval, or error, trigger a re-render of the step badge and body based on the new status, programmatically transition a tool call from pending to completed or from active to error, or update the visual and structural representation of the step state at runtime.
</div>

#### Parameters

##### state `String`

The new state. Valid values are `"active"`, `"completed"`, `"awaitingApproval"`, and `"error"`.

#### Example - set the state to completed

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "run_query",
        state: "active"
    });
    var toolCall = $("#toolcall").data("kendoToolCall");
    toolCall.setState("completed");
    </script>

### destroy

Prepares the **ToolCall** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks.

> **Important:** This method does not remove the ToolCall element from DOM.

<div class="meta-api-description">
Clean up and safely remove a tool call widget, detach all event listeners and internal handlers, destroy any internally created button widgets, prevent memory leaks when removing the step from the page, or release resources held by a tool call component before DOM removal.
</div>

#### Example - destroy the widget

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({ label: "run_query" });
    var toolCall = $("#toolcall").data("kendoToolCall");
    toolCall.destroy();
    </script>

## Events

### expandedChange

Fired when the user clicks the header to toggle the expanded state. Calling `e.preventDefault()` prevents the toggle from taking effect.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

<div class="meta-api-description">
React when a tool call step is about to expand or collapse, detect user clicks that toggle the body visibility, intercept and cancel the expand or collapse action by calling preventDefault, handle the open and close transition of the step panel, respond to changes in the expanded state, or execute custom logic whenever the panel is toggled by the user.
</div>

#### Event Data

##### e.expanded `Boolean`

The new expanded state. `true` when expanding, `false` when collapsing.

##### e.preventDefault `Function`

If invoked, prevents the step body from being shown or hidden.

##### e.sender `kendo.ui.ToolCall`

The widget instance which fired the event.

#### Example - subscribe to the "expandedChange" event during initialization

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "run_query",
        expandable: true,
        parameters: { q: "test" },
        expandedChange: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.expanded);
        }
    });
    </script>

#### Example - subscribe to the "expandedChange" event after initialization

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "run_query",
        expandable: true,
        parameters: { q: "test" }
    });
    var toolCall = $("#toolcall").data("kendoToolCall");
    toolCall.bind("expandedChange", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.expanded);
    });
    </script>

### action

Fired when the user clicks the approve or reject button in the approval UI. Only fires when `state` is `"awaitingApproval"`.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

<div class="meta-api-description">
React when a user approves or rejects a tool call that requires authorization, handle the result of the approve or deny button click in the awaiting approval state, detect and respond to user confirmation or cancellation of a pending tool invocation, execute custom logic for approve and reject actions such as calling an API or updating state, or determine which action button was pressed by inspecting the action property.
</div>

#### Event Data

##### e.action `String`

The action that was taken. Either `"approve"` or `"reject"`.

##### e.sender `kendo.ui.ToolCall`

The widget instance which fired the event.

#### Example - subscribe to the "action" event during initialization

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "send_email",
        state: "awaitingApproval",
        expandable: true,
        expanded: true,
        action: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.action);
        }
    });
    </script>

#### Example - subscribe to the "action" event after initialization

    <div id="toolcall"></div>
    <script>
    $("#toolcall").kendoToolCall({
        label: "send_email",
        state: "awaitingApproval",
        expandable: true,
        expanded: true
    });
    var toolCall = $("#toolcall").data("kendoToolCall");
    toolCall.bind("action", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.action);
    });
    </script>
