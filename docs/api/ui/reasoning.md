---
title: Reasoning
description: Configuration, methods and events of the Kendo UI Reasoning
res_type: api
component: Reasoning
---

# kendo.ui.Reasoning

Represents the Kendo UI Reasoning widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### label `String` *(default: "Reasoning")*

The primary text label displayed in the step header.

<div class="meta-api-description">
Set the heading text shown in the reasoning step header, configure the display name or caption for an agent reasoning block, control what label is rendered next to the icon in the step header, specify the primary string identifier of a collapsible reasoning panel, or adjust the visible title used to describe the current thinking phase in an AI agent workflow.
</div>

#### Example - set the label

    <div id="reasoning"></div>
    <script>
    $("#reasoning").kendoReasoning({
        label: "Thinking"
    });
    </script>

### secondaryLabel `String` *(default: null)*

A secondary text label displayed after the separator in the step header.

<div class="meta-api-description">
Add a secondary subtitle or supporting text to the reasoning step header, configure a supplemental caption shown next to the primary label, set an extra descriptor such as a model name or reasoning mode, control the annotation displayed in the step header after the separator dot, or display additional metadata alongside the main label.
</div>

#### Example - set the secondary label

    <div id="reasoning"></div>
    <script>
    $("#reasoning").kendoReasoning({
        label: "Reasoning",
        secondaryLabel: "extended"
    });
    </script>

### svgIcon `String` *(default: "sparkles")*

The name of the SVG icon displayed in the step header.

<div class="meta-api-description">
Set or change the icon shown in the header of a reasoning step, configure the SVG icon name for the step indicator, specify a Kendo UI icon to represent the type of reasoning being shown, customize the visual icon of an agent reasoning component, or adjust the graphic symbol displayed next to the step label.
</div>

#### Example - set the icon

    <div id="reasoning"></div>
    <script>
    $("#reasoning").kendoReasoning({
        label: "Processing",
        svgIcon: "gear"
    });
    </script>

### completed `Boolean` *(default: false)*

Marks the reasoning step as completed, applying the `k-agent-completed` CSS class to the element.

<div class="meta-api-description">
Mark a reasoning step as done or finished, set the completed state of an agent reasoning block, apply the completed visual style to indicate a finished thinking phase, control whether the step appears in a completed or active state, toggle the done styling, or configure whether the reasoning panel should display as already resolved.
</div>

#### Example - mark the step as completed

    <div id="reasoning"></div>
    <script>
    $("#reasoning").kendoReasoning({
        label: "Done thinking",
        completed: true
    });
    </script>

### expanded `Boolean` *(default: false)*

Controls whether the content body is visible when the widget initializes.

<div class="meta-api-description">
Show or hide the body content of a reasoning step on initialization, configure whether the collapsible panel starts open or closed, set the initial expanded state of a reasoning block, control the default visibility of the inner content area, or specify whether the step body is shown from the start.
</div>

#### Example - initialize the widget in expanded state

    <div id="reasoning"></div>
    <script>
    $("#reasoning").kendoReasoning({
        label: "Reasoning",
        expandable: true,
        expanded: true,
        content: "Evaluating all available options before responding."
    });
    </script>

### expandable `Boolean` *(default: false)*

Enables toggling the visibility of the content body by clicking the header or using the keyboard.

<div class="meta-api-description">
Allow users to expand or collapse a reasoning step, enable the toggle behavior for a reasoning panel, configure whether the block can be opened and closed by clicking, make a step collapsible or expandable in an AI agent interface, control whether the expand chevron icon and click handler are attached to the header, or enable keyboard-driven collapse and expand interactions.
</div>

#### Example - enable expand and collapse

    <div id="reasoning"></div>
    <script>
    $("#reasoning").kendoReasoning({
        label: "Reasoning",
        expandable: true,
        content: "Weighing multiple approaches."
    });
    </script>

### content `String` *(default: null)*

Plain text content rendered inside the step body.

<div class="meta-api-description">
Set the plain text displayed inside the reasoning step body, configure the inner text content of a collapsible reasoning block, provide the thinking or reasoning text shown when the step is expanded, populate the body of a reasoning panel with a string value, or supply the narrative content describing what the agent is processing.
</div>

#### Example - set the content

    <div id="reasoning"></div>
    <script>
    $("#reasoning").kendoReasoning({
        label: "Reasoning",
        expandable: true,
        expanded: true,
        content: "Considering multiple possible approaches to answer the question."
    });
    </script>

### contentTemplate `Function` *(default: null)*

A function used to render the content body. Called with an empty object and must return an HTML string.

<div class="meta-api-description">
Provide a custom Kendo template for rendering the body of a reasoning step, override the default text content with a custom HTML template, configure how the inner content of the reasoning block is displayed, use a function to control the layout and markup of the step body, or customize the HTML structure rendered inside the expandable reasoning panel.
</div>

#### Example - use a content template

    <div id="reasoning"></div>
    <script>
    $("#reasoning").kendoReasoning({
        label: "Reasoning",
        expandable: true,
        expanded: true,
        contentTemplate: function() {
            return "<ul><li>Approach A</li><li>Approach B</li></ul>";
        }
    });
    </script>

### time `String` *(default: null)*

A time or duration string displayed after a separator in the step header.

<div class="meta-api-description">
Show elapsed time or a duration alongside the reasoning step label, configure a timestamp or clock annotation in the step header, display how long the reasoning phase took, set a time string shown next to the primary label in the header, or annotate a reasoning step with a duration value such as "2.3s".
</div>

#### Example - show the elapsed time

    <div id="reasoning"></div>
    <script>
    $("#reasoning").kendoReasoning({
        label: "Reasoning",
        time: "3.1s"
    });
    </script>

## Methods

### toggle

Toggles the expanded state of the content body. If no argument is provided, the current state is reversed.

<div class="meta-api-description">
Programmatically expand or collapse a reasoning step, toggle the visibility of the inner content body, switch between open and closed states on a reasoning panel, control the expanded or collapsed display of the block, call toggle without arguments to flip the current state, or pass a boolean to explicitly set the expanded state.
</div>

#### Parameters

##### expand `Boolean`

If `true`, the body is shown. If `false`, the body is hidden. If omitted, the state is reversed.

#### Example - toggle the step

    <div id="reasoning"></div>
    <script>
    $("#reasoning").kendoReasoning({
        label: "Thinking",
        expandable: true,
        content: "Evaluating options."
    });
    var reasoning = $("#reasoning").data("kendoReasoning");
    reasoning.toggle(true);
    </script>

### expand

Expands the content body. Has no effect if `expandable` is `false`.

<div class="meta-api-description">
Programmatically open or show the body of a reasoning step, expand the collapsible panel to reveal inner content, trigger the open state of a reasoning block, display the hidden content by calling expand, or show a previously collapsed reasoning body from code.
</div>

#### Example - expand the step

    <div id="reasoning"></div>
    <script>
    $("#reasoning").kendoReasoning({
        label: "Thinking",
        expandable: true,
        content: "Evaluating options."
    });
    var reasoning = $("#reasoning").data("kendoReasoning");
    reasoning.expand();
    </script>

### collapse

Collapses the content body.

<div class="meta-api-description">
Programmatically hide or close the body of a reasoning step, collapse the expandable panel to conceal inner content, trigger the closed state of a reasoning block, hide the visible content by calling collapse, or fold a previously opened reasoning body from code.
</div>

#### Example - collapse the step

    <div id="reasoning"></div>
    <script>
    $("#reasoning").kendoReasoning({
        label: "Thinking",
        expandable: true,
        expanded: true,
        content: "Evaluating options."
    });
    var reasoning = $("#reasoning").data("kendoReasoning");
    reasoning.collapse();
    </script>

### destroy

Prepares the **Reasoning** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks.

> **Important:** This method does not remove the Reasoning element from DOM.

<div class="meta-api-description">
Clean up and safely remove a reasoning widget, detach all event listeners and internal handlers, prevent memory leaks when removing an agent step from the page, dispose of the widget before DOM removal, or release resources held by a reasoning step component.
</div>

#### Example - destroy the widget

    <div id="reasoning"></div>
    <script>
    $("#reasoning").kendoReasoning({ label: "Thinking" });
    var reasoning = $("#reasoning").data("kendoReasoning");
    reasoning.destroy();
    </script>

## Events

### expandedChange

Fired when the user clicks the header to toggle the expanded state. Calling `e.preventDefault()` prevents the toggle from taking effect.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

<div class="meta-api-description">
React when a reasoning step is about to expand or collapse, detect user clicks that toggle the body visibility, intercept and cancel the expand or collapse action by calling preventDefault, handle the open and close transition of a reasoning block, respond to changes in the expanded state of the panel, or execute custom logic whenever the reasoning step is toggled by the user.
</div>

#### Event Data

##### e.expanded `Boolean`

The new expanded state. `true` when expanding, `false` when collapsing.

##### e.preventDefault `Function`

If invoked, prevents the content body from being shown or hidden.

##### e.sender `kendo.ui.Reasoning`

The widget instance which fired the event.

#### Example - subscribe to the "expandedChange" event during initialization

    <div id="reasoning"></div>
    <script>
    $("#reasoning").kendoReasoning({
        label: "Thinking",
        expandable: true,
        content: "Evaluating options.",
        expandedChange: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.expanded);
        }
    });
    </script>

#### Example - subscribe to the "expandedChange" event after initialization

    <div id="reasoning"></div>
    <script>
    $("#reasoning").kendoReasoning({
        label: "Thinking",
        expandable: true,
        content: "Evaluating options."
    });
    var reasoning = $("#reasoning").data("kendoReasoning");
    reasoning.bind("expandedChange", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.expanded);
    });
    </script>
