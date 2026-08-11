---
title: ChainOfThought
description: Configuration, methods and events of the Kendo UI ChainOfThought
res_type: api
component: ChainOfThought
---

# kendo.ui.ChainOfThought

Represents the Kendo UI ChainOfThought widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### label `String` *(default: null)*

The primary text label displayed in the step header.

<div class="meta-api-description">
Configure the main title or heading text shown in a chain-of-thought step header, set the display name or caption for an agent reasoning step, control what label is rendered next to the icon in the step header, enable a descriptive identifier for the current processing phase, adjust the visible text used to name a thought or step in an AI agent workflow, or specify the primary string label of a collapsible thought panel.
</div>

#### Example - set the label

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Analyzing request"
    });
    </script>

### secondaryLabel `String` *(default: null)*

A secondary text label displayed after the separator in the step header.

<div class="meta-api-description">
Add a secondary subtitle or supporting text to the step header of a chain-of-thought component, configure a supplemental caption shown next to the primary label, set an extra descriptor for the agent step such as a model name or context identifier, control the annotation in the reasoning step header, or display additional metadata after the separator dot.
</div>

#### Example - set the secondary label

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Searching",
        secondaryLabel: "web"
    });
    </script>

### svgIcon `String` *(default: "sparkles")*

The name of the SVG icon displayed in the step header.

<div class="meta-api-description">
Set or change the icon shown in the header of a chain-of-thought step, configure the SVG icon name for the reasoning step indicator, specify a Kendo UI icon to represent the type of thought being shown, customize the visual icon of an agent step component, choose which predefined theme icon identifies the step, or adjust the graphic symbol displayed next to the step label.
</div>

#### Example - set the icon

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Running tool",
        svgIcon: "wrench"
    });
    </script>

### completed `Boolean` *(default: false)*

Marks the step as completed, applying the `k-agent-completed` CSS class to the element.

<div class="meta-api-description">
Mark a chain-of-thought step as done or finished, set the completed state of an agent reasoning step, apply the completed visual style to indicate a finished processing phase, control whether the step appears in a completed or active state, toggle the done styling on an agent step, or configure whether a thought block should display as already resolved or finished.
</div>

#### Example - mark the step as completed

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Done",
        completed: true
    });
    </script>

### expanded `Boolean` *(default: false)*

Controls whether the thoughts body is visible when the widget initializes.

<div class="meta-api-description">
Show or hide the body content of a chain-of-thought step on initialization, configure whether the collapsible panel of an agent step starts open or closed, set the initial expanded state of a thought block, control the default visibility of the inner thoughts list, or specify whether the step content area is shown from the start.
</div>

#### Example - initialize the widget in expanded state

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Thinking",
        expandable: true,
        expanded: true,
        thoughts: [
            { label: "Checked knowledge base" }
        ]
    });
    </script>

### expandable `Boolean` *(default: false)*

Enables toggling the visibility of the thoughts body by clicking the header or using the keyboard.

<div class="meta-api-description">
Allow users to expand or collapse a chain-of-thought step, enable the toggle behavior for a reasoning step panel, configure whether the thought block can be opened and closed by clicking, make a step collapsible or expandable in an AI agent interface, control whether the expand chevron icon and click handler are attached to the step header, or enable keyboard-driven collapse and expand interactions.
</div>

#### Example - enable expand and collapse

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Reasoning",
        expandable: true,
        thoughts: [
            { label: "Step one" }
        ]
    });
    </script>

### thoughts `Array` *(default: [])*

An array of thought objects rendered inside the step body. Each item can include `label`, `secondaryLabel`, `svgIcon`, `linesAdded`, `linesRemoved`, `time`, `children`, and `completed` properties.

<div class="meta-api-description">
Provide a list of thought items or reasoning steps to display inside the chain-of-thought body, configure the inner thoughts rendered as sub-steps of an agent reasoning block, populate the expandable thought list with step data, set the collection of thought entries shown under the step header, bind thought objects containing labels, icons, and metadata to the inner content area, or supply the data array that drives the rendering of individual thought rows.
</div>

#### Example - set thoughts

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Researching",
        expandable: true,
        expanded: true,
        thoughts: [
            { label: "Searching web", svgIcon: "search" },
            { label: "Reading results", completed: true }
        ]
    });
    </script>

### thoughts.label `String`

The primary label text for the thought item.

<div class="meta-api-description">
Set the display text or title for an individual thought item inside a chain-of-thought body, configure the label shown next to a sub-step icon, control the name or description of a single inner thought entry, specify the text rendered in the thought row, or define the primary caption for a step within the reasoning body.
</div>

#### Example - set thought labels

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Reasoning",
        expanded: true,
        thoughts: [
            { label: "Checking database" }
        ]
    });
    </script>

### thoughts.secondaryLabel `String`

A secondary label displayed after the separator in the thought item.

<div class="meta-api-description">
Add supplemental text to an individual thought item displayed after the separator, configure additional metadata shown beside the thought label, set a qualifier or annotation for a sub-step within the reasoning body, or display a supporting description alongside the primary thought label.
</div>

#### Example - set a secondary label on a thought

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Reasoning",
        expanded: true,
        thoughts: [
            { label: "Querying", secondaryLabel: "database" }
        ]
    });
    </script>

### thoughts.svgIcon `String`

The name of the SVG icon displayed for the thought item.

<div class="meta-api-description">
Assign an icon to an individual thought item inside the chain-of-thought body, set the visual symbol displayed in a sub-step row, configure which Kendo UI theme icon appears next to a thought entry, or customize the graphic identifier for a specific reasoning step.
</div>

#### Example - set an icon on a thought

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Running",
        expanded: true,
        thoughts: [
            { label: "Searching", svgIcon: "search" }
        ]
    });
    </script>

### thoughts.linesAdded `Number`

The number of lines added, displayed as a green delta badge on the thought item.

<div class="meta-api-description">
Show a count of added lines as a green delta badge on a thought item, configure the lines-added indicator for a sub-step in a code or diff context, display a positive line change count on an individual thought entry, or annotate a thought row with how many lines were inserted during the represented operation.
</div>

#### Example - show a lines-added delta on a thought

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Editing file",
        expanded: true,
        thoughts: [
            { label: "utils.js", linesAdded: 12, linesRemoved: 3 }
        ]
    });
    </script>

### thoughts.linesRemoved `Number`

The number of lines removed, displayed as a red delta badge on the thought item.

<div class="meta-api-description">
Show a count of removed or deleted lines as a red delta badge on an individual thought item, configure the lines-removed indicator for a reasoning sub-step, display a negative line change count on a thought row, or annotate an entry with how many lines were deleted during the represented operation.
</div>

#### Example - show a lines-removed delta on a thought

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Editing",
        expanded: true,
        thoughts: [
            { label: "app.js", linesAdded: 5, linesRemoved: 10 }
        ]
    });
    </script>

### thoughts.time `String`

A time or duration string displayed after a separator in the thought item.

<div class="meta-api-description">
Show a timestamp or elapsed time on an individual thought item, configure the duration or time annotation for a reasoning sub-step, display execution time or a clock label alongside a thought entry, or annotate a step with when it occurred or how long it took.
</div>

#### Example - show time on a thought

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Running",
        expanded: true,
        thoughts: [
            { label: "API call", time: "1.2s" }
        ]
    });
    </script>

### thoughts.children `String`

An HTML string rendered as a nested body inside the thought item.

<div class="meta-api-description">
Embed nested HTML content inside an individual thought item, add child content or sub-details to a reasoning step, configure additional HTML rendered below the thought row, or display structured inner content such as code snippets or lists within a single thought entry.
</div>

#### Example - add nested content to a thought

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Analyzing",
        expanded: true,
        thoughts: [
            { label: "Result", children: "<pre>{ ok: true }</pre>" }
        ]
    });
    </script>

### thoughts.completed `Boolean`

Marks the individual thought item as completed by applying the `k-thought-completed` CSS class.

<div class="meta-api-description">
Mark an individual thought sub-step as done or completed, apply the completed CSS state to a thought item inside the reasoning body, control the finished visual appearance of a single thought entry, or indicate that a particular reasoning step has been resolved.
</div>

#### Example - mark a thought as completed

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Running",
        expanded: true,
        thoughts: [
            { label: "Step 1", completed: true },
            { label: "Step 2" }
        ]
    });
    </script>

### linesAdded `Number` *(default: null)*

The number of lines added, displayed as a green delta badge in the step header.

<div class="meta-api-description">
Display a count of added lines as a green badge in the chain-of-thought step header, configure the lines-added delta indicator at the step level, show how many lines were inserted during the represented operation in the header, or annotate the step header with a positive line change count.
</div>

#### Example - show lines added in the header

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Modified file.js",
        linesAdded: 15,
        linesRemoved: 4
    });
    </script>

### linesRemoved `Number` *(default: null)*

The number of lines removed, displayed as a red delta badge in the step header.

<div class="meta-api-description">
Display a count of removed lines as a red badge in the chain-of-thought step header, configure the lines-removed delta at the step level, show how many lines were deleted during the represented operation in the header, or annotate the step header with a negative line change count.
</div>

#### Example - show lines removed in the header

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Refactored module.js",
        linesAdded: 3,
        linesRemoved: 20
    });
    </script>

### thoughtTemplate `Function` *(default: null)*

A function used to render each thought item. Receives each item from the `thoughts` array as the first argument and must return an HTML string.

<div class="meta-api-description">
Provide a custom Kendo template for rendering thought items inside a chain-of-thought step, override the default thought row rendering with a custom HTML template, configure how individual thought objects are displayed in the step body, use a function to control the layout of each thought entry, or customize the HTML output for every item in the thoughts array.
</div>

#### Example - use a custom thought template

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Reasoning",
        expandable: true,
        expanded: true,
        thoughts: [
            { label: "Step one" },
            { label: "Step two" }
        ],
        thoughtTemplate: function(thought) {
            return "<div class='k-thought'><span class='k-agent-step-content'><span class='k-agent-step-label'>" + kendo.htmlEncode(thought.label) + "</span></span></div>";
        }
    });
    </script>

## Methods

### toggle

Toggles the expanded state of the step body. If no argument is provided, the current state is reversed.

<div class="meta-api-description">
Programmatically expand or collapse a chain-of-thought step, toggle the visibility of the inner thoughts body, switch between open and closed states on an agent step panel, control the expanded or collapsed display of a reasoning block, call toggle without arguments to flip the current state, or pass a boolean to explicitly set the expanded state of the step.
</div>

#### Parameters

##### expand `Boolean`

If `true`, the step body is shown. If `false`, the step body is hidden. If omitted, the state is reversed.

#### Example - toggle the step

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Thinking",
        expandable: true,
        thoughts: [{ label: "Step 1" }]
    });
    var chain = $("#chain").data("kendoChainOfThought");
    chain.toggle(true);
    </script>

### expand

Expands the step body, showing the thoughts list. Has no effect if `expandable` is `false`.

<div class="meta-api-description">
Programmatically open or show the body of a chain-of-thought step, expand the collapsible panel to reveal inner thought items, trigger the open state of an agent reasoning block, display the hidden content of a step by calling expand, or show a previously collapsed thought body from code.
</div>

#### Example - expand the step

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Analyzing",
        expandable: true,
        thoughts: [{ label: "Checking sources" }]
    });
    var chain = $("#chain").data("kendoChainOfThought");
    chain.expand();
    </script>

### collapse

Collapses the step body, hiding the thoughts list.

<div class="meta-api-description">
Programmatically hide or close the body of a chain-of-thought step, collapse the expandable panel to conceal inner thought items, trigger the closed state of an agent reasoning block, hide the visible content of a step by calling collapse, or fold a previously opened thought body from code.
</div>

#### Example - collapse the step

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Analyzing",
        expandable: true,
        expanded: true,
        thoughts: [{ label: "Checking sources" }]
    });
    var chain = $("#chain").data("kendoChainOfThought");
    chain.collapse();
    </script>

### setThoughts

Replaces the current thoughts array and re-renders the step body.

<div class="meta-api-description">
Dynamically update the list of thought items displayed inside a chain-of-thought step, replace or refresh the thoughts rendered in the step body, programmatically change the inner content of a reasoning step, set new thought data after the widget has been initialized, or update the step body content with a new collection of thought objects.
</div>

#### Parameters

##### thoughts `Array`

The new array of thought objects to render.

#### Example - update the thoughts

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Thinking",
        expanded: true,
        thoughts: [{ label: "Initial thought" }]
    });
    var chain = $("#chain").data("kendoChainOfThought");
    chain.setThoughts([
        { label: "Updated thought one" },
        { label: "Updated thought two" }
    ]);
    </script>

### destroy

Prepares the **ChainOfThought** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks.

> **Important:** This method does not remove the ChainOfThought element from DOM.

<div class="meta-api-description">
Clean up and safely remove a chain-of-thought widget, detach all event listeners and internal handlers, prevent memory leaks when removing an agent step from the page, dispose of the widget before DOM removal, or release resources held by a reasoning step component.
</div>

#### Example - destroy the widget

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({ label: "Thinking" });
    var chain = $("#chain").data("kendoChainOfThought");
    chain.destroy();
    </script>

## Events

### expandedChange

Fired when the user clicks the header to toggle the expanded state. Calling `e.preventDefault()` prevents the toggle from taking effect.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

<div class="meta-api-description">
React when a chain-of-thought step is about to expand or collapse, detect user clicks that toggle the body visibility, intercept and cancel the expand or collapse action by calling preventDefault, handle the open and close transition of a reasoning block, respond to changes in the expanded state of an agent step, or execute custom logic whenever the step panel is toggled by the user.
</div>

#### Event Data

##### e.expanded `Boolean`

The new expanded state. `true` when expanding, `false` when collapsing.

##### e.preventDefault `Function`

If invoked, prevents the step body from being shown or hidden.

##### e.sender `kendo.ui.ChainOfThought`

The widget instance which fired the event.

#### Example - subscribe to the "expandedChange" event during initialization

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Thinking",
        expandable: true,
        thoughts: [{ label: "Step 1" }],
        expandedChange: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.expanded);
        }
    });
    </script>

#### Example - subscribe to the "expandedChange" event after initialization

    <div id="chain"></div>
    <script>
    $("#chain").kendoChainOfThought({
        label: "Thinking",
        expandable: true,
        thoughts: [{ label: "Step 1" }]
    });
    var chain = $("#chain").data("kendoChainOfThought");
    chain.bind("expandedChange", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.expanded);
    });
    </script>
